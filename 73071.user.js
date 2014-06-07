// ==UserScript==
// @name           NG BBS Last Post Link
// @namespace      http://userscripts.org/users/vitaminp
// @description    Adds a link to your last post at the bottom of the Newgrounds BBS
// @include        http://*newgrounds.com/bbs/*
// ==/UserScript==

if(document.getElementById("loginbox_username") != null){
var username = document.getElementById("loginbox_username").textContent
var notice = document.getElementsByClassName("notice")[0]

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.newgrounds.com/bbs/search/author/' + username,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
         var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var entry = dom.getElementsByClassName('box title post nostats')[0].getElementsByClassName('heading')[0];
	forum = entry.getElementsByTagName('p')[1].innerHTML;
	time = entry.getElementsByTagName('p')[0].innerHTML;
	title = entry.getElementsByTagName('h3')[0].innerHTML;
	text = dom.getElementsByClassName('box title post nostats')[0].getElementsByClassName('message')[0].getElementsByTagName('p')[0].textContent;
	if(text.length>40){
	text = text.substring(0,40)
	text += "..."
	}
	notice.innerHTML = forum + "<br/>" + time + "<br/>" + title + "<br/>" + "Content: " + text;
    }
});
}
