// ==UserScript==
// @name           Reddit link QR
// @namespace      http://www.defproc.co.uk/redditqr
// @description    Adds a QR code to reddit's comment page
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

// by defproc for ladfrombrad
// http://www.reddit.com/r/ideasfortheadmins/comments/gdz8j/qr_code_on_the_comments_page/

var toggle_reddit_qr = function(){
 img = document.getElementById("reddit_qr");
 if (img.style.display == "none")
 {
  img.src = "http://chart.googleapis.com/chart?chs=320x320&cht=qr&chl=" + window.location.href + "&choe=UTF-8";
  img.style.display = "block";
 }
 else
 { img.style.display = "none"; }
 return false;
}

a = document.createElement("a");
a.href = '#';
a.innerHTML = "QR";
a.style.marginLeft = "8px";
a.addEventListener("click",toggle_reddit_qr,false);

span = document.getElementsByClassName("shortlink")[0];
span.appendChild(a);

img = document.createElement("img");
img.style.display = "none";
img.id = "reddit_qr";
img.style.position = "absolute";
img.style.top = "22px";
img.style.right = "22px";
img.style.zIndex = "10000";
img.style.border = "1px #000000 solid";
img.style.cursor = "pointer";
img.style.width = '320px';
img.style.height = '320px';
img.style.backgroundColor = '#ffffff';
img.addEventListener("click",toggle_reddit_qr,false);
document.body.appendChild(img);



