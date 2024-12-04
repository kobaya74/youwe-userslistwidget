# Module Youwe UserListWidget

    ``youwe/module-userslistwidget``

 - [Main Functionalities](#markdown-header-main-functionalities)
 - [Installation](#markdown-header-installation)
 - [Configuration](#markdown-header-configuration)


## Main Functionalities
Youwe UserListWidget

## Installation
\* = in production please use the `--keep-generated` option

### Type 1: Zip file

 - Unzip the zip file somewhere on local machine.
 - Copy folder "Youwe" in `app/code/`.
 - Enable the module by running `php bin/magento module:enable Youwe_UsersListWidget`
 - Apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`

### Type 2: Composer (not available at the moment)

 - Make the module available in a composer repository for example:
    - private repository `repo.magento.com`
    - public repository `packagist.org`
    - public GitHub repository as vcs
 - Add the composer repository to the configuration by running `composer config repositories.repo.magento.com composer https://repo.magento.com/`
 - Install the module composer by running `composer require youwe/module-userslistwidget`
 - enable the module by running `php bin/magento module:enable Youwe_UsersListWidget`
 - apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`


## Configuration
- Under Stores > Configuration > Youwe > User List Widget set module to "Enabled".
- Add test API  https://reqres.in/api/users.
- Add widget using Content > Widgets > Add Widget.
- Under widget options add:
    * Widget Title (optional)
    * Provide API for users data (optional). Use API https://reqres.in/api/users as test API.
      * If not defined here, API will come from the Stores > Configuration > Youwe > User List Widget > General Configuration >  API for users data.
      * This setting overrides the Stores > Configuration > Youwe > User List Widget > General Configuration >  API for users data setting.


