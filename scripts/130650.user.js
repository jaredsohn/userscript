// ==UserScript==
// @id             156B18AB-4B0F-44D0-82A0-4154394E8B0D
// @name           fb-at-android-market
// @namespace      wtrx005
// @author         wtrx005
// @copyright      2012+, wtrx005 (http://userscripts.org/users/370514)
// @description    This script views a HTML5 facebook sharing box in den app detail view in the android market
// @version        2012.04.11
// @website        http://userscripts.org/scripts/show/130650
// @include        https://market.android.com/details?id=*
// @include        https://play.google.com/store/apps/details?id=*
// ==/UserScript==

//-- base init  --------------------------------------------------------
var lQueryID = '';

//-- method to split url query string -> http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

//-- get base objects and app id ---------------------------------------
lFBRootTag = document.getElementById('fb-root');
lShareWidgetTag = document.getElementsByClassName('doc-sharing-widget');
lQueryID = qs['id'];

if ((lFBRootTag == null) && (lShareWidgetTag != null) && (lQueryID != '')){
	lFBRootTag = document.createElement('div');
	lFBRootTag.id = 'fb-root';
	document.body.insertBefore(lFBRootTag, document.body.firstChild);
	
	lScriptTag = document.createElement('script');
	lScriptTag.innerHTML = '(function(d, s, id) {';
	lScriptTag.innerHTML += '  var js, fjs = d.getElementsByTagName(s)[0];';
	lScriptTag.innerHTML += '  if (d.getElementById(id)) return;';
	lScriptTag.innerHTML += '  js = d.createElement(s); js.id = id;';
	lScriptTag.innerHTML += '  js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";';
	lScriptTag.innerHTML += '  fjs.parentNode.insertBefore(js, fjs);';
	lScriptTag.innerHTML += "}(document, 'script', 'facebook-jssdk'));";
	document.body.insertBefore(lScriptTag, document.body.firstChild);

	var lLink = 'https://market.android.com/details?id=' + lQueryID;
	lShareWidgetTag[0].innerHTML += '<fb:like href="' + lLink + '" send="false" layout="button_count" width="450" show_faces="true" font="arial"></fb:like>';
}
