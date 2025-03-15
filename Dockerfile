FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    python3
RUN ln -s /usr/bin/python3 /usr/bin/python

COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY docker/start-apache /usr/local/bin
RUN a2enmod rewrite

# Copy application source
COPY src /var/www/src
RUN chown -R www-data:www-data /var/www

CMD ["start-apache"]
