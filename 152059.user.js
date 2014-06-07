// ==UserScript==
// @name        Google Image Direct Link
// @namespace   http://userscripts.org/users/192333
// @include     http*://*.google.co.in/search*
// @version     1
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// ==/UserScript==
si = window.setInterval(clearanchors, 2000);
function clearanchors(){
    anchors = document.getElementsByClassName('rg_l')
    for(i=0;i<anchors.length;i++){
        url = anchors[i].getAttribute('href');
	var patt = /imgurl\=[^&]*/g;
	regstr = patt.exec(url);
	if(regstr != null && regstr.length > 0){
		str = regstr[0].replace("imgurl=", "");
		anchors[i].setAttribute('href', str);
	}
    }
}