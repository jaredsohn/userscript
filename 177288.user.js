// ==UserScript==
// @name       Download episode link on watchop.com
// @namespace  http://www.stasj.com
// @version    0.1
// @description  enter something useful
// @match      *.watchop.com/watch/*
// @copyright  2013+, IntrceptR
// ==/UserScript==
var video_id = document.getElementById("embedcode").getElementsByTagName("iframe")[0].getAttribute("src").substring(38).split('&')[0];
var url = "http://video.at.directvid.com/dl/video.php?url="+video_id+".mp4"
var a = document.createElement('a');
var linkText = document.createTextNode("Click here to download .mp4");
a.appendChild(linkText);
a.title = "Download episode";
a.href = url;
var element = "<tr><td><strong>Download:</strong></td><td>"+a.outerHTML+"</td></tr>";
document.getElementsByClassName("content")[0].getElementsByTagName("tbody")[0].innerHTML = document.getElementsByClassName("content")[0].getElementsByTagName("tbody")[0].innerHTML+element;