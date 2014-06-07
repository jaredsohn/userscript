// ==UserScript==
// @name Radio blog club download
// @description download music from radlioblogclub.com
// @include http://radioblogclub.com/search/*
// @include http://www.radioblogclub.com/search/*
// ==/UserScript==


// variables...
var dow_link, dow_html, parent_node;
var dow_img = "data:image/gif;base64," +
    "R0lGODlhDgAOAKEAAP///wAAAACZ/////ywAAAAADgAOAAACJoyP" +
    "Kcu95qKAAthrX2A464Y1FAc4o/RVnTeuzBm+G1iKM6olulEAADs=";
var songs = document.getElementsByTagName("input");

for(var i = 0; i < songs.length ; i++) {
    if (songs[i].getAttribute("src")=="http://stat.radioblogclub.com/images/play.gif"){
        
        dow_link = /(http.*?)\'/(songs[i].getAttribute("onclick"))[1];

        dow_html = "<td width=15>" +
	        "<a target='_blank' href='" + dow_link + "&k=657ecb3231ac0b275497d4d6f00b61a1'>" +
		    "<img src='" + dow_img + "'/>" +
	        "</a>" +
        "</td>";
	
	parent_node = songs[i].parentNode.parentNode;

	parent_node.innerHTML = dow_html + parent_node.innerHTML;
    }
}