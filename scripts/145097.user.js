// ==UserScript==
// @name  favicon
// @description  add favicon to sites that are missing one
// @include *
// ==/UserScript==
var sites=new Array();
var uris=new Array();
var types=new Array();

// add icon to a particular uri
uris["https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/"]="https://addons.cdn.mozilla.net/img/uploads/addon_icons/0/748-64.png";

// add icon to a domain
sites["escrow.aliexpress.com"]="http://i02.i.aliimg.com/images/cms/upload/aliexpress/protection/escrow_buyer_protection_768x88_1.png";
sites['cubieboard.org']="http://cubieboard.org/wp-content/uploads/2012/09/cubieboard.jpg";

var extensions=new Array(".png",".gif",".jpg",".jpeg");
types['.png']='image/png';
types['.jpg']='image/jpeg';
types['.jpeg']='image/jpeg';
types['.gif']='image/gif';

site=window.location.host;
uri=window.location.href;
icon=null;
if(sites[site]) icon=sites[site];
if(uris[uri]) icon=uris[uri];

// fixme get requests and anchors - perhaps prefix?
if (icon){
  var head, nl;
  head = document.getElementsByTagName('head')[0];
  if (head) {
    nl = document.createElement('link');
    //<link rel="shortcut icon" href="http://example.com/favicon.ico" type="image/vnd.microsoft.icon">
    nl.rel="shotcut icon"; nl.href=icon;
    for (ext in extensions ) {
	if(icon.substring(icon.length - ext.length).toLowerCase() == ext)
	    nl.type = types[ext];
    }

    head.insertBefore(nl, null);
  }
}
