// ==UserScript==
// @name           phpmyadmin todoyu tables
// @author         kstenschke
// @namespace      http://userscripts.org/scripts/show/120020
// @description    Groups todoyu DB table links in phpMyAdmin by extensions
// @include        */phpmyadmin/left.php*
// @include        */phpmyadmin/navigation.php*
// ==/UserScript==

	// Collect extension names from table items
var as = document.querySelectorAll('ul li a');
var extNames = new Array();
for(var i=0; i<as.length; i++){
    if( ! as[i].querySelector('img') ) {
        var tableName	= as[i].innerHTML;
        var parts		= tableName.split('_');

        var extName	= ( parts[0] === 'ext' ) ? parts[1] : parts[0];       
        extNames.push(extName);
    }
}

	// Iterate all tables, mark start of each extension group
var imgs = document.querySelectorAll('ul a img');
var prevTableName    = '';
for(var i=0; i<imgs.length; i++){
	var curTableName    = extNames[i];
	if( curTableName != prevTableName ) {
		imgs[i].parentNode.parentNode.style.borderTop="1px solid #000";
	}
	prevTableName    = curTableName;
}