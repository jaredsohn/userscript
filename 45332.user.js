// ==UserScript==
// @name	GaiaOnline Link Fixer V2
// @description Searches for links on GaiaOnline, then makes them open in the same window for on-site links and then alerts you based on the settings. This applies to user post.
// @include	http://gaiaonline.com/*
// @include	http://www.gaiaonline.com/*
// ==/UserScript==
///////////////////SETTINGS//////////////////////
var cl="off" // alerts to leaving site with confirm box
var wf="off" // alerts to leaving site with Gaia's warning frame
/////////////////////////////////////////////////
if ( !(cl == "off") && !(cl == "on") || !(wf == "off") && !(wf == "on") ) {
	alert('GaiaOnline Link Fixer V2 says:\nInvalid setting you must use "on" or "off".');
}
else {
	var redirect = "http://www.gaiaonline.com/gaia/redirect.php";
	var atags = document.getElementsByTagName('a');
	for (var x = 0; x < atags.length; x=x+1) {
		var atag = atags[x];
		for (var y = 0; y < 2; y=y+1) {
			if (atag.href.substr(0,43) == redirect) {
			  var url = atag.href.substr(46)
				if (url.substr(0,4)!='http'){
					url='http://'+url;
				}
				atag.href = unescape(url);
				var gaia=atag.hostname
				for (i=0;i<=i+1;i++){
					if(gaia.indexOf('.')!=gaia.lastIndexOf('.')){
						gaia=document.domain.slice(document.domain.indexOf('.')+1)
					}
					else{
						break;
					}
				}
				if (gaia == 'gaiaonline.com') {
					atag.removeAttribute('target');
				}
				else {
					if (wf=="on") {
						atag.href = redirect + "?r=" + atag.href;
					}
					if (cl=="on") {
						atag.setAttribute('onclick',"if (confirm('Go to:\\n" + atag.href + "')==true) {return true;} else {return false;}");
					}
				}
			}
		}
	}
}