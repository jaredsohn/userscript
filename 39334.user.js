// ==UserScript==
// @name          Download A Video from YouTube
// @namespace     http://userscripts.org/users/76284
// @description   adds a link to download flv from You Tube
// @source        http://userscripts.org/scripts/show/21774
// @identifier    http://userscripts.org./scripts/source/21774.user.js
// @version     4
// @date          2008-04-12
// @creator       Just a Secret <@gmail.com>
// @include       *youtube.com/*v=*
// ==/UserScript==



 var download_url = 'http://howto-freewebhost.co.cc/link.php?link=http://www.youtube.com/watch?v=';
 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_url = download_url + video_id;

       function getEl(w){
               return document.getElementById(w);
       }



autoupdate();
       desc = getEl("watch-views-div");
       descP = desc.parentNode;
       dv = document.createElement("a");
       dv.innerHTML="<span class='actionText'> Download MP4 </span>";
       dv.setAttribute("rel", "nofollow");
       dv.setAttribute("class", "actionLink");
       dv.href=video_url;
       descP.insertBefore(dv, desc);

       function autoupdate() {


var day = GM_getValue('day');

if(day == undefined){
	GM_setValue('day',new Date().getDay());
}else{

if(day != new Date().getDay()){

	GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org./scripts/source/21774.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version     4') == -1) {
                var div = document.createElement("div");
		div.setAttribute("style", "background-color: #00FF00;");
                div.appendChild(document.createTextNode('There is a new version of the "Download ANY Video from YouTube" userscript.'));
                div.appendChild(document.createElement("br"));

                var a1 = document.createElement("a");
                a1.setAttribute("href", "http://userscripts.org/scripts/source/21774.user.js");
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
