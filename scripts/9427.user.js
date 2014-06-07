// ==UserScript==
// @name           tBoM Blogs: Incoming Links
// @namespace      tbomblogsincoming
// @description    Track the latest incoming links to your tBoM blog.
// @include        http://*.blogs.tbomonline.com/wp-admin/
// ==/UserScript==

var js = "var update2 = new Ajax.Updater( 'incominglinks', 'index-extra.php?jax=incominglinks' );";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("script");
	node.type = "text/javascript";
	node.innerHTML = js;
	heads[0].appendChild(node); 
}
