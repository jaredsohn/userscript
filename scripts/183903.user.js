// ==UserScript==
// @name			YouTube Green & Red like/dislike bar
// @match			http://www.youtube.com/*
// @copyright			2013 GavoTrav
//@author			GavoTrav
// @version       1.0
// @authorURL			http://youtube.com/zinctunes
// @homepage			http://youtube.com/zinctunes
// @description			Changes the youtube like/dislike bar back to green and red.
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".video-extras-sparkbar-likes {background: green;} .video-extras-sparkbar-dislikes {background: red;}" ;
document.body.appendChild(css);