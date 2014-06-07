// ==UserScript==
// @name           AskFlushr
// @namespace      www.aldercass.com
// @include        http://www.tumblr.com/tumblelog/*/messages
// @include        http://www.tumblr.com/tumblelog/*/messages/*
// @include        http://www.tumblr.com/inbox
// @include        http://www.tumblr.com/inbox/*
// ==/UserScript==

askflushr_posts = [];

function addcheckboxes(){
	var askflushr_divs = document.getElementById("left_column").getElementsByTagName("div");
	for(i = 0; i < askflushr_divs.length; i++){
		if(askflushr_divs[i].className == "post_controls" && askflushr_posts.indexOf(askflushr_divs[i].parentNode.getAttribute("id")) == -1){
			askflushr_checkbox = document.createElement("input");
			askflushr_checkbox.setAttribute("type","checkbox");
			askflushr_checkbox.style.verticalAlign = "baseline";
			askflushr_divs[i].appendChild(askflushr_checkbox);
			askflushr_posts.push(askflushr_divs[i].parentNode.getAttribute("id"));
		}
	}
}
addcheckboxes();
setInterval(addcheckboxes,100);

var askflushr_css = document.createElement("style");
askflushr_css.setAttribute("type","text/css");
askflushr_css.innerHTML = "#flushcontrols{margin-top: -1px; line-height: 23px; color: white; padding: 7px 15px; background: rgba(255,255,255,0.05); border-radius: 7px; -moz-border-radius: 7px; -webkit-border-radius: 7px; border: 1px rgba(0,0,0,0.2) solid; box-shadow: inset 0px 1px 0px rgba(255,255,255,0.1); -moz-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.1); -webkit-box-shadow: inset 0px 1px 0px rgba(255,255,255,0.1); font-weight: bold; font-size: 12px;} #flushcontrols a:link, #flushcontrols a:visited{color: white; text-decoration: none; opacity: 0.7;}  #flushcontrols a:hover, #flushcontrols a:active{opacity: 1;} #flush div{padding-left: 30px; opacity: 0.7} #flush, #select {opacity: 0.7;} #flushcontrols img {vertical-align: middle; margin-right: 5px;}";
document.getElementsByTagName("head")[0].appendChild(askflushr_css);

if(document.getElementById("posts")){
	var askflushr_controls = document.createElement("div");
	askflushr_controls.setAttribute("id","flushcontrols");
	askflushr_controls.innerHTML += '<img src="http://f.aldercass.com/4kWCq.png" alt="" /> <span id="flush">Delete: <a href="#" onclick="deleteall(); return false;">All</a> | <a href="#" onclick="deleteselected(); return false;">Selected</a> <div>Select: <a href="#" onclick="allasks(true); return false;">All</a> | <a href="#" onclick="allasks(false); return false;">None</a></div></span>';
	document.getElementById("right_column").insertBefore(askflushr_controls,document.getElementById("right_column").firstChild);
}


var askflushr_script = document.createElement("script");
askflushr_script.setAttribute("type","text/javascript");
askflushr_script.innerHTML = 'function deleteall(){if(confirm("Are you sure?")){var anchors = document.getElementsByTagName("a");for(var i = 0; i < anchors.length; i++){if(anchors[i].id.indexOf("post_delete") != -1 && anchors[i].parentNode.className == "post_controls"){onclickstr = anchors[i].getAttribute("onClick");startpos = onclickstr.indexOf("deny");endpos = onclickstr.indexOf(";");onclickstr = onclickstr.substring(startpos,endpos+1);setTimeout(onclickstr,0);}}}} function deleteselected(){if(confirm("Are you sure?")){var anchors = document.getElementsByTagName("a");for(var i = 0; i < anchors.length; i++){if(anchors[i].id.indexOf("post_delete") != -1 && anchors[i].parentNode.className == "post_controls" && anchors[i].parentNode.getElementsByTagName("input")[0].checked){onclickstr = anchors[i].getAttribute("onClick");startpos = onclickstr.indexOf("deny");endpos = onclickstr.indexOf(";");onclickstr = onclickstr.substring(startpos,endpos+1);setTimeout(onclickstr,0);}}}}function allasks(bool){checks=document.getElementsByTagName("input");for(i=0;i<checks.length;i++){if(checks[i].getAttribute("type")=="checkbox"){checks[i].checked = bool;}}}reload=false;setInterval(function(){if(document.getElementById("posts") && document.getElementById("posts").getElementsByTagName("li").length == 0 && reload == false){reload = true; location = location;}},50)';
document.getElementsByTagName("body")[0].appendChild(askflushr_script);