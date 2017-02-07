<?php

namespace Drupal\Tests\restui\Functional;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests Rest UI functionality.
 *
 * @group restui
 */
class RestUITest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  public static $modules = array('node', 'restui');

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    // Create a user with permissions to manage.
    $permissions = array('administer site configuration', 'administer rest resources');
    $account = $this->drupalCreateUser($permissions);

    // Initiate user session.
    $this->drupalLogin($account);
  }

  /**
   * Tests enabling a resource and accessing it.
   */
  public function testConsumers() {
    // Check that user can access the administration interface.
    $this->drupalGet('admin/config/services/rest');
    $this->assertEquals(200, $this->getSession()->getStatusCode());

    // Adjust the node resource so it allows GET method, JSON format and
    // Cookie authentication.
    $this->drupalGet('admin/config/services/rest/resource/entity%3Anode/edit');

    $page = $this->getSession()->getPage();
    $page->findField('methods[GET][GET]')->check();
    $page->findField('methods[GET][settings][formats][json]')->check();
    $page->findField('methods[GET][settings][auth][cookie]')->check();

    $page->pressButton('Save configuration');
    $this->assertSession()->pageTextContains('The resource has been updated.');
  }

}
