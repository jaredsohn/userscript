// ==UserScript==
// @name 	Download YouTube Videos as MP4 , 3gp OR Flv
// @namespace 	EasyYouTube
// @description 	adds a link to download YouTube as MP4 , 3gp OR Flv
// @version 	5
// @date 	2009-1-5
// @creator 	easyyoutube@gmail.com
// @include 	http://*youtube.com/*v=*
// ==/UserScript==

 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_url = 'http://www.easyyoutube.com/download/' + video_id + '/' ;
	function getEl(w){
		return document.getElementById(w);
	}
update();
	desc = getEl("watch-views-div");
	descP = desc.parentNode;
	dv = document.createElement("a");
	dv.innerHTML="<span class='actionText' style='font-size: large; font-weight:bold;'> Download MP4 3gp or Flv </span>";
	dv.setAttribute("rel", "nofollow");
	dv.setAttribute("class", "actionLink");
	dv.href=video_url;
	descP.insertBefore(dv, desc);

function update() {

var day = GM_getValue('day');
if(day == undefined){
	GM_setValue('day',new Date().getDay());
}else{

if(day != new Date().getDay()){

	GM_xmlhttpRequest({
        method:"GET",url:'http://userscripts.org/scripts/source/39788.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version     5') == -1) {
                var div = document.createElement("div");
		div.setAttribute("style", "background-color: #00FF00;");
                div.appendChild(document.createTextNode('There is a new version of the "Download YouTube Videos as MP4 3gp OR Flv" userscript.'));
                div.appendChild(document.createElement("br"));

                var a1 = document.createElement("a");
                a1.setAttribute("href", "http://userscripts.org/scripts/source/39788.user.js");
                a1.appendChild(document.createTextNode('Click here to install the script update'));
                div.appendChild(a1);

                document.body.insertBefore(div, document.body.firstChild);
		GM_setValue('version',version + 1);
            }
        }
    });

	GM_setValue('day',new Date().getDay());
}else{

}

	

}


    }