//var GMSU_meta_116353 = <><![CDATA[
// ==UserScript==
// @name                TestScript
// @namespace           Test
// @version             1.0.0.6
// @author              phoenix
// @description         testing 
// @include             http://www.spiegel.de/
// @include             www.spiegel.de/
// @include             */TestPage.htm
// @require             http://userscripts.org/scripts/source/116461.user.js
// @require             http://userscripts.org/scripts/source/51832.user.js
// @require             http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==
//]]></>;

DEBUG = true;
debug('start');



GM_config.init('Configurable Options Script' /* Script title */,
/* Settings object */ 
{
	'Name': // This would be accessed using GM_config.get('Name')
	{
		'label': 'Name', // Appears next to field
		'type': 'text', // Makes this setting a text field
		'default': 'Joe Simmons' // Default value if user doesn't change it
	}
});

debug('aaa');

GM_config.open();

debug('ende');
//GMSU.init(116353, true, true);




