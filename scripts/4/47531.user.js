// GMC Topic Preview
// Version 1.0
// April 29, 2009
// Copyright (C) 2009, Caleb Helbling
//
// Bugs:
//		None (for now)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GMC Topic Preview", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMC Topic Preview
// @description   Shows topic tooltips containing the posts in the thread
// @include       http://www.gmc.yoyogames.com/*
// @include       http://gmc.yoyogames.com/*
// ==/UserScript==

var allDivs, thisDiv;

// Find all post links using XPath
allDivs = document.evaluate("//a[starts-with(@title,'This topic was started: ')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// Because functions cannot be called by GreaseMonkey after the GM script is done,
// we append it to the end of the body so they can be called at any time
tt_string = '\
navigation_p1 = \'<div width="500px;" style="text-align:center;border-bottom:thin solid black;"><a onclick="prev_post()">&lt;Prev</a>&nbsp;\';\
navigation_p2 = \'&nbsp;<a onclick="next_post()">Next&gt;</a></div>\';\
function state_change() {\
	if (xmlhttp.readyState==4) {\
		if (xmlhttp.status==200) {\
			the_response = xmlhttp.responseText;\
			posts = new Array();\
			start_index = 1;\
			first_post = true;\
			first_index = -5;\
			while (start_index!=first_index) {\
				start_index = the_response.indexOf(\'<div class="postcolor" id=\',start_index);\
				start_index = the_response.indexOf(\'>\',start_index)+1;\
				end_index = the_response.indexOf("<!--IBF.ATTACHMENT_",start_index);\
				end_index = the_response.indexOf(\'</div>\',end_index);\
				posts[posts.length] = the_response.substring(start_index,end_index);\
				if (first_post==true) {\
					first_post = false;\
					first_index = start_index;\
					start_index += 1;\
				}\
			}\
			posts.length = posts.length-2;\
			window.tooltip.innerHTML = navigation_p1+"1/"+posts.length+navigation_p2+posts[0];\
			current_post = 0;\
		}\
	}\
}\
function show_tooltip(x,y,link) {\
	window.tooltip.style.top = (y-10)+"px";\
	window.tooltip.style.left = (x-10)+"px";\
	window.tooltip.style.visibility = "visible";\
	xmlhttp=new XMLHttpRequest();\
	xmlhttp.onreadystatechange=state_change;\
	xmlhttp.open("GET",link,true);\
	xmlhttp.send(null);\
	window.tooltip.innerHTML = "Loading...";\
}\
function show_tooltip_gateway(event,the_link) {\
	the_link = "\'"+the_link+"\'";\
	mouse_x=event.clientX+document.documentElement.scrollLeft;\
	mouse_y=event.clientY+document.documentElement.scrollTop;\
	mouse_timer = setTimeout("show_tooltip("+mouse_x+","+mouse_y+","+the_link+")",1000);\
}\
function mouseReallyOut(oThis, e) {\
	if (e.relatedTarget) {\
		return(e.relatedTarget != oThis && e.relatedTarget.parentNode != oThis && e.relatedTarget.parentNode.parentNode != oThis && e.relatedTarget.parentNode.parentNode.parentNode != oThis && e.relatedTarget.parentNode.parentNode.parentNode.parentNode != oThis && e.relatedTarget.parentNode.parentNode.parentNode.parentNode.parentNode != oThis);\
	}\
	return(e.toElement != oThis && e.toElement.parentNode != oThis);\
}\
function next_post() {\
	current_post += 1;\
	if (current_post>=posts.length) {\
		current_post=posts.length-1;\
	}\
	window.tooltip.innerHTML = navigation_p1+(current_post+1)+"/"+posts.length+navigation_p2+posts[current_post]+"</div>";\
}\
function prev_post() {\
	current_post -= 1;\
	if (current_post<0) {\
		current_post=0;\
	}\
	window.tooltip.innerHTML = navigation_p1+(current_post+1)+"/"+posts.length+navigation_p2+posts[current_post]+"</div>";\
}\
';
// Append the above string to the body
document.body.appendChild(document.createElement("script")).innerHTML=tt_string;

// Setting what to do when moused over
dq = '"';
sq = "'";
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.removeAttribute("title");
	href = sq+thisDiv.getAttribute("href")+sq;
	inner_html = '<span onMouseover="show_tooltip_gateway(event,'+href+')" onMouseout="if (window.tooltip.style.visibility==\'hidden\'){ clearTimeout(mouse_timer) }">';
	thisDiv.innerHTML = inner_html + thisDiv.innerHTML + '</span>';
}

// This function also needs to be appended to the body so we can use
// window.tooltip at any time, but because we only need it once, we can append
// it by an easier method
function init() {
	logopos = document.getElementById('logostrip');
	window.tooltip = document.createElement('div');
	logopos.parentNode.insertBefore(tooltip, logopos.nextSibling);
	
	window.tooltip.setAttribute("style","-moz-border-radius:10px;");
	window.tooltip.style.position = "absolute";
	window.tooltip.style.top = "0";
	window.tooltip.style.left = "0";
	window.tooltip.style.zIndex = "10";
	window.tooltip.style.visibility = "hidden";
	window.tooltip.style.backgroundColor = "#EFF1F3";
	window.tooltip.style.width = "500px";
	window.tooltip.style.borderWidth = "1px";
	window.tooltip.style.borderStyle = "solid";
	window.tooltip.innerHTML = "Loading...";
	window.tooltip.style.textAlign = "left";
	window.tooltip.style.maxHeight = "300px";
	window.tooltip.style.overflow = "scroll";
	window.tooltip.style.padding = "5px";
	window.tooltip.setAttribute("onMouseOut","if (mouseReallyOut(this, event)) { window.tooltip.style.visibility='hidden';}");
	
}
// Append the init function
document.body.appendChild(document.createElement("script")).innerHTML="(" + init + ")()";