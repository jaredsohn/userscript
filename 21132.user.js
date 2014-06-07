// ==UserScript==
// @name           I-am-bored.com Video Download
// @namespace      http://www.dusus.com
// @description    Download I am bored videos
// @include        http://www.i-am-bored.com/bored*
// ==/UserScript==

//Gorkem Goknar
//Modifies "Youtube to me" script 
//original by http://www.joshkinberg.com/

//I Am Bored URL http://www.i-am-bored.com/bored_link.cfm?link_id=[linkname]

var a1=document.getElementsByName("flashvars").item(0).value
a1=a1.replace("&clicktext= &autoplay=false&image=http://cdn-www.i-am-bored.com/iabvideosplash.jpg","")
video_url=a1.replace("file=","")

// add banner with download link

var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #FF0000; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">"Save As" to download Flash video</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';
