// ==UserScript==
// @name            Tribe layout rework
// @namespace       http://gdorn.nudio.net/greasemonkey
// @description     Reworks tribe.net's layout.  Removes ads, uses more screenspace, un-truncates stupidly truncated strings.  For post 9/06 revision.
// @include         http://*.tribe.net/*
// ==/UserScript==

(function() {

//change main div to 90%
		var resize = document.getElementById('main');
		resize.style.width = "100%";
		var resize = document.getElementById('tribeThread');
		if (resize) {
			resize.style.width = "100%";
		}
		var resize = document.getElementById('ad1');
		if (resize) {
			resize.style.width = "0%";
		}
		var resize = document.getElementById('right');
		if (resize) {
			resize.style.width = "0%";
		}


addGlobalStyle('.mcMugshot { white-space: normal ! important; width: 65px ! important; height: 100px; line-height: 1.1; vertical-align: bottom;}');
addGlobalStyle('.three-column #col-a {	width: 95% ! important;}');
addGlobalStyle('.three-column #col-b {	width: 80% ! important;}');
addGlobalStyle('.three-column #col-c {	width: 80% ! important;}');
addGlobalStyle('#tribeThread .parent .OAS, #tribeThread .first .OAS {  width: 0px;  display: hidden;}');
addGlobalStyle('#tribeThread li.ad { display: hidden; width: 0px;}');
addGlobalStyle('#tribeThread li.ad .OAS, #tribeThread li.ad .googleAd {	display: hidden;	width: 0px;	}');



    var divs = document.getElementsByTagName('div');

    for (var i = 0; i < divs.length; i++)
    {
    	var currdiv = divs[i];
    	if (currdiv.className.indexOf("OAS") !== -1 || currdiv.className == "adHeadline")
    	{
    		currdiv.parentNode.removeChild(currdiv);
    	}
//undo username truncation in 'my friends'
		//can re-use "divs"

    	if (currdiv.className == "name")
    	{
				var innerlink = currdiv.getElementsByTagName('a')[0];
    		if (innerlink){
    			var actualname = innerlink.title;
    			actualname = actualname.replace("view ", "");
    			actualname = actualname.replace("'s profile", "");

    			innerlink.innerHTML = actualname;
    		}
    	}
    }

		var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++)
    {
    	var currframe = iframes[i];
    	if (currframe.className.indexOf("Right") !== -1)
    	{
    		currframe.parentNode.removeChild(currframe);
    	}
    }

// undo tribe and poster name truncation
    var posters = document.getElementsByTagName('span');
    for (var i=0; i<posters.length; i++)
    {
    	var currposter = posters[i];
    	if (currposter.className == "name" || currposter.className == "tribeName"){
    		var innerlink = currposter.getElementsByTagName('a')[0];
    		if (innerlink){
    			var actualname = innerlink.title;
    			innerlink.innerHTML = actualname;
    		}

    	}

    }
})();


//shamelessly stolen from diveintogreasemonkey.  highly suggested.
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



