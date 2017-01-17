FROM drupal:8.2.5-apache


RUN php -r "readfile('https://s3.amazonaws.com/files.drush.org/drush.phar');" > drush \
&& chmod +x drush \
&& mv drush /usr/local/bin
