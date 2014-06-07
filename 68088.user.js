// ==UserScript==
// @name           Thread Preview
// @namespace      www.bungie.net
// @description    Lets you preview a first post in a thread from the forum.
// @include        http://*bungie.net/forums/topics.aspx?forumID=*
// @include        http://*bungie.net/fanclub/*/Forums/topics.aspx?forumID=*
// @version        2.1.2
// ==/UserScript==
// Thanks Duardo for the idea <3

var i=1;
while (i<56)
{
var thread = document.getElementsByClassName('list-h').item(i);
var h5_title = thread.getElementsByTagName('h5').item(0);
h5_title.innerHTML += '<a href="#" style="padding-left:7px;">Preview</a>';
var preview_button = thread.getElementsByTagName('a').item(1);
preview_button.setAttribute('onclick', 'var thread = document.getElementsByClassName("list-h").item('+i+');thread.innerHTML += "<div id=\'prebox\'></div>";var preview_button = thread.getElementsByTagName("a").item(1);var thread_link=preview_button.parentNode;var thread_href=thread_link.getElementsByTagName("a").item(0).href;xmlhttp=new XMLHttpRequest();xmlhttp.open("GET", thread_href, false);xmlhttp.send(null);var doc_thread = document.implementation.createDocument ("", "", null);var html = document.createElement ("html");html.innerHTML = xmlhttp.responseText;doc_thread.appendChild (html);var text = doc_thread.getElementById("ctl00_mainContent_postRepeater1_ctl01_ctl00_postControl_skin_PostBlock").innerHTML;var preview = text.slice(0,300)+"...";thread.getElementsByTagName("div").item(0).innerHTML = preview;');
i++;
i++;
}

