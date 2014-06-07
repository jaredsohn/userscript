// ==UserScript==
// @name           Django Default Admin
// @namespace      http://bradjasper.com/django_admin
// @description    Script fot setting default values in the Django Admin
// @include        http://hosting-choice.com/admin/catalog/host/add/
// @include        http://hosting-choice.com/admin/catalog/host/*/
// ==/UserScript==
// Attach jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}

GM_wait();

function letsJQuery() {

    defaults = {
        'Price': 6.95,
        'Bandwidth': -1,
        'Space': -1,
        'Django': 0,
        'PHP': 1,
        'PHPmyAdmin': 1,
        'MySQL': 1,
        'Python': 0,
        'Ruby': 0,
        'Ruby on Rails': 0,
        'Perl': 1,
        'Free Domain': 0,
        'Backups': 0,
        'Control Panel': 1,
        'POP3': 1,
        'IMAP': 1,
        'Webmail': 1,
        'SPAM Filter': 1,
        'Mail Forwarders': 1,
        'Mail Autoresponders': 1,
        'Addon Domains': 1,
        'Sub-Domains': 1,
        'Databases': 1,
        'FTP': 1,
        'Email': 1,
        'Wordpress': 0,
        'Phone Support': '24/7',
        'Online Support': '24/7',
        'Email Support': '24/7',
        'Money Back Guarantee': '30 days',
        'Uptime Guarantee': '99%',
        'Google AdWords Credit': 0,
        'Yahoo! Ad Credit': 0,
        'Microsoft adCenter Credit': 0,
        'Agora': 0,
        'b2evolution': 0,
        'bbPress': 0,
        'Blog': 1,
        'Coppermine': 0,
        'Drupal': 0,
        'Joomla': 0,
        'Mambo': 0,
        'OS Commerce': 0,
        'PHP Nuke': 0,
        'Zen Cart': 0
    };

    var i = 0
    for (name in defaults) {
        var type = "#id_feature_set-"+i+"-type";
        var value = "#id_feature_set-"+i+"-value";

        if (!$(type).val()) {
            $(type).val(name);
        }

        if (!$(value).val()) {
            $(value).val(defaults[name]);
        }

        i++;
    }

}
