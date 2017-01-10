<?php

/* themes/wilmap/templates/blocks/header/block--wilmap-branding.html.twig */
class __TwigTemplate_5c4df8776cdc77d47325a888defcb28431a77b813e736d69abf74519f88d7d7a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array();
        $filters = array();
        $functions = array("path" => 2);

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array(),
                array(),
                array('path')
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 1
        echo "<header class=\"b-menu\">
  <a class=\"logo\" href=\"";
        // line 2
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar($this->env->getExtension('drupal_core')->getPath("<front>")));
        echo "\" rel=\"home\">
    <img src=\"themes/wilmap/images/logo.png\" alt=\"logo\">
  </a>
  <div class=\"contain-navigation\">
    <nav>
      <ul>
        <li>
          <a href=\"\">Map</a>
        </li>
        <li>
          <a href=\"\">Explore</a>
        </li>
        <li>
          <a href=\"\">Topics</a>
        </li>
        <li>
          <a href=\"\">News</a>
        </li>
        <li>
          <a href=\"\">About</a>
        </li>
      </ul>
    </nav>
    <form class=\"search-form\">
      <input type=\"text\" placeholder=\"Search\">
    </form>
  </div>
</header>
";
    }

    public function getTemplateName()
    {
        return "themes/wilmap/templates/blocks/header/block--wilmap-branding.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  46 => 2,  43 => 1,);
    }
}
/* <header class="b-menu">*/
/*   <a class="logo" href="{{ path('<front>') }}" rel="home">*/
/*     <img src="themes/wilmap/images/logo.png" alt="logo">*/
/*   </a>*/
/*   <div class="contain-navigation">*/
/*     <nav>*/
/*       <ul>*/
/*         <li>*/
/*           <a href="">Map</a>*/
/*         </li>*/
/*         <li>*/
/*           <a href="">Explore</a>*/
/*         </li>*/
/*         <li>*/
/*           <a href="">Topics</a>*/
/*         </li>*/
/*         <li>*/
/*           <a href="">News</a>*/
/*         </li>*/
/*         <li>*/
/*           <a href="">About</a>*/
/*         </li>*/
/*       </ul>*/
/*     </nav>*/
/*     <form class="search-form">*/
/*       <input type="text" placeholder="Search">*/
/*     </form>*/
/*   </div>*/
/* </header>*/
/* */
