// ==UserScript==
// @name           StumbleUpon Thumb Bubbles
// @namespace      thlayli.detrave.net
// @description    Moves site thumbnails to a tooltip.
// @include        http://*.stumbleupon.com/*
// @exclude        http://www.stumbleupon.com/*
// @exclude        http://*.stumbleupon.com/home/
// @version        2.0
// ==/UserScript==
//
// Inspired by Stumbleupon Avatar Bubbles script by Daddy-sk
//
// Using (many) parts of bubble Tooltips by Alessandro Fulciniti  
//		http://web-graphics.com/mtarchive/001717.php
//		http://web-graphics.com/mtarchive/BtJsCode.html

// define css
addGlobalStyle(".thumb_tooltip{ color:#000; font:lighter 11px/1.3 Arial,sans-serif; color:white; background-color: #CCC; padding: 1px;}");
addGlobalStyle("div.listBlogs dt,div.listBlogs dd {margin-left: 0px;}");

// auto-update variables
var script_title = 'StumbleUpon Thumb Bubbles';
var source_location = 'http://thlayli.detrave.net/su-thumbbubbles.user.js';
var version_holder = 'http://thlayli.detrave.net/su-thumbbubbles.version.txt';
var current_version = '2.0';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function showTooltipPic(e){
	var content;
	if (e==null) {
		e = window.event;
	}
	var content = storedThumbs[e.target.getAttribute('thumb_index')]
	content.src = content.src.replace('/altmthumb','/mthumb');
	content.src = content.src.replace('/thumb','/mthumb');
	// tooltip generation
	var tooltip = document.createElement("span");
	tooltip.className = "thumb_tooltip";
	tooltip.style.display = "block";
	tooltip.appendChild(content);
	tooltip.style.MozOpacity= "0.95";
	document.getElementById("btc").appendChild(tooltip);
}

function hideTooltipPic(e){
	var d=document.getElementById("btc");
	if(d.childNodes.length>0) d.removeChild(d.firstChild);
}

function locate(e) {
	var posx=0, posy=0;
	var clientW, clientH;
	var tooltipW = 0, tooltipH = 0;

	if (e==null) {
		e=window.event;
	}
	
	if (document.documentElement.scrollTop){
		posx=e.clientX+document.documentElement.scrollLeft;
		posy=e.clientY+document.documentElement.scrollTop;
		clientW = window.innerWidth + document.documentElement.scrollLeft;
		clientH = window.innerHeight + document.documentElement.scrollTop;
	} else {
		posx=e.clientX+document.body.scrollLeft;
		posy=e.clientY+document.body.scrollTop;
		clientW = window.innerWidth;
		clientH = window.innerHeight;	
	}		
	var tooltipImg = document.getElementById("tooltipImg");
	if (tooltipImg != null) {
		tooltipW = tooltipImg.width;
		tooltipH = tooltipImg.height;
	}	
	if (posx + tooltipW + 20 > clientW) {
		posx -= tooltipW + 35;
	}
	if (posy + tooltipH + 20 > clientH) {
		posy -= tooltipH + 35;
	}
	
	document.getElementById("btc").style.top=(posy+10)+"px";
	document.getElementById("btc").style.left=(posx+10)+"px";
}

// Create tooltip dummy
var dummy = document.createElement("span");
dummy.id = "btc";
dummy.setAttribute("id","btc");
dummy.style.position = "absolute";
document.getElementsByTagName("body")[0].appendChild(dummy);

var thumbs = xpath("//img[contains(@src, 'stumble-upon.com/mthumb/' ) or contains(@src, 'stumble-upon.com/altmthumb/' ) or contains(@src, 'stumble-upon.com/thumb/' ) or contains(@src, 'stumble-upon.com/images/nomthumb.png' )]");
var storedThumbs = new Array();
var whatsNew = (document.location.href.indexOf('/home/') != -1) ? true : false;

for(i=0;i<thumbs.snapshotLength;i++){
		// clone node
		storedThumbs.push(thumbs.snapshotItem(i).cloneNode('true'));
		var nextD = thumbs.snapshotItem(i).parentNode.parentNode.nextSibling.nextSibling;
		// unwrap lines
		var bullet = document.createElement('span');
		bullet.innerHTML = '&bull;';
		bullet.className = 'bullet';
		nextD.nextSibling.nextSibling.removeChild(nextD.nextSibling.nextSibling.lastChild.previousSibling.previousSibling);
		nextD.nextSibling.nextSibling.insertBefore(bullet, nextD.nextSibling.nextSibling.lastChild.previousSibling);
		nextD.nextSibling.nextSibling.lastChild.previousSibling.className = '';
		// remove node
		thumbs.snapshotItem(i).parentNode.parentNode.parentNode.removeChild(thumbs.snapshotItem(i).parentNode.parentNode);
		// set handler
		var nextA = (whatsNew) ? nextD.firstChild : nextD.firstChild.nextSibling
		nextA.setAttribute('thumb_index',i);
		nextA.wrappedJSObject.addEventListener("mouseover", showTooltipPic, true);
		nextA.wrappedJSObject.addEventListener("mouseout", hideTooltipPic, true);
		nextA.wrappedJSObject.addEventListener("mousemove", locate, true);
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9].[0-9])/);               
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						if(current_version == latest_version[1] && manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                    SkipWeeklyUpdateCheck();
                }
                   
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}

GM_registerMenuCommand('Update - '+script_title, CheckVersion);
CheckForUpdate();