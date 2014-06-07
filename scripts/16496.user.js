// verperfil
// version 0.0
// 20071215
// Copyplease (c) 2007, anonymous
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.7 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "verperfil", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          verperfil
// @namespace     http://contactos
// @description   ¿Quieres ver más fotos de...
// @include       */_ver_perfil.php?de=*
// ==/UserScript==


( function() {

var first_img = buxca('//tbody/tr/td/center/img[@width="300"]');

first_img = first_img.snapshotItem(0);
first_img.removeAttribute("width");

var targets = buxca('//a[contains(text(),"Foto ")]');

for (var i = 0; i < targets.snapshotLength; i ++) {
    var item = targets.snapshotItem(i);
    var new_img = document.createElement("img"); 
    new_img.src = first_img.src.replace(/.jpg|_\d.jpg/,"_"
		+( String("aeiouqwxr").match(item.href.substr(-1,1)).index+1 )
		+".jpg");
    item.appendChild(new_img); 
}

var targets = buxca('//a[contains(@href,"javascript:void(window.open")]');

for (var i = 0; i < targets.snapshotLength; i ++) {
    var item = targets.snapshotItem(i);
    item.href = item.href.replace(/.*de=(\d+).*/g,"_ver_perfil.php?de=$1"); 
}


function buxca(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}


})();
