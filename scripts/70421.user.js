// ==UserScript==
// @name          Download from YouTube
// @description   Adds FLV, MP4, 3GP, and 720p download links to YouTube.
// @include       http://*.youtube.com/watch*v=*
// @include       http://youtube.com/watch*v=*
// @copyright     Charly Foulkes
// @version       1.1.4
// @license       Creative Commons Attribution-Noncommercial 3.0 United States License
// @require       http://sizzlemctwizzle.com/updater.php?id=33836
// ==/UserScript==

// Get ID
function $(ID) {return document.getElementById(ID);}

// Created by Charly Foulkes
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

if(typeof unsafeWindow!="object") {
unsafeWindow = window;
}

function updateDL(e, url) {
var link = $("dfy_link");
switch(e.options[e.selectedIndex].value) {
case "flv": link.href = url; break;
case "hqflv": link.href = url+"%26fmt%3D35"; break; // High Quality FLV Added by Charly Foulkes (fmt 35)
case "mp4": link.href = url+"%26fmt%3D18"; break;
case "720p": link.href = url+"%26fmt%3D22"; break;
case "1080p": link.href = url+"%26fmt%3D37"; break;
case "3gp": link.href = url+"%26fmt%3D17"; break;
default: link.href = url;
}
}

if(unsafeWindow.yt) {
var args = unsafeWindow.yt["config_"]["SWF_ARGS"],
	id = escape(args["video_id"]),
	t = escape(args["t"]),
	fmt_map = unescape(args["fmt_map"]),
	url = "http://youtube.com/get_video%3Fvideo_id%3D"+id+"%26t%3D"+t;

$("watch-player-div").appendChild(create("div", {id:"downloadfromyoutube",style:"padding:.3em 0 0 0; text-align:left; font-size:.9em; font-family:tahoma,arial,sans; font-weight:bold;"}, new Array(
	create("span", {innerHTML:"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI9SURBVDiNhZNNaBNBGIbfmezmD2vAYNJD/MGq9SIaj0m04MGL8SIULx4q4kEU6qFV8SoI0hU8qVCEnBQholJTW3Kx1lUItS0Ue6hVtFTNmq79C+kms7Ofh9Yamxjf4zffPPO+880wIkK14t1qHoQw6onB0HtEc3VJqWkihG9dSMN2BGxHYMkqYMkyAQB3H92oAdcCADDGkJt5jrJdQqE4g49zY2g/eLWuKV6vWB3Ko/jrbmwIABGIHBARFO5uCFASl1WdHMTW7btgOSS9kmxIsrFcNlG9Fu9S1w0yjjcKOUhFQi3Riyev+xSXCiLHK0mCmAS4RFEWoHo5uMJw/tQ1LwgQooJ0NlWaX5xLMSJColtNt0WPJ49Ek573+VeQXECijBV7EdPzORBoLRZH2/bTGJ0YKU9Ojfe97hHtfC1yx8uxjPHFmKJIcC+IVwCXjUJlGqqPwe3jUH0uRCNHYS6YNPlh3CDCmfVL1DVRBCH5cPCe5eVNCPiDKNFPlF2LcHs53D4Xtm3Zg5CvBdmhjEUOkromin9NQdfEREWsdD4YvFPaETgAm5WgelZP3rwpgP2hY+jLPi4JUenUNTFRd4y6JnpnjU8vhscGRGswAa4wKG6OQ+ETyL17W/lhfuvXNdHb8B2Qg46hkYHvprFAu5ti2OWPwfy6TLlRPe/I1dwNAbomiiSRzGSfWVuxD0GnFU/7n1iO/JO7Wmzjb/yteJd6LtK88zYAzOY/X9po/b8AADh8Rb0PAMM3xdl/9fwCc0oSKoZoHMsAAAAASUVORK5CYII=\" style=\"margin-top:2px;\"> Download: "}),
	create("select", {id:"dfy_select",onchange:function(e){updateDL(e.currentTarget,url);}}, new Array(
		create("option", {value:"flv",textContent:"Normal Quality (FLV)"}),
		create("option", {value:"hqflv",textContent:"High Quality (FLV)",style:((fmt_map.indexOf("35/640000/9/0/115")==-1)?'display:none;':'')}), // Added by Charly Foulkes (fmt 35)
		create("option", {value:"mp4",textContent:"High Quality (MP4)",selected:"selected"}),
		create("option", {value:"720p",textContent:"True High Def (720p)",style:((fmt_map.indexOf("22/2000000/9/0/115")==-1)?"display:none;":"")}),
		create("option", {value:"1080p",textContent:"True High Def (1080p)",style:((fmt_map.indexOf("37/4000000/9/0/115")==-1)?"display:none;":"")}),
		create("option", {value:"3gp",textContent:"Cellphone Format (3GP)"})
		)),
	create("span", {style:"color:#939393;",innerHTML:" (Right click <a class=\"actionLink\" id=\"dfy_link\" style=\"color:#222222;text-decoration:underline;\" href=\""+url+"%26fmt%3D18\">here</a> and <font style=\"color:#666666\"><i>Save Link As</i></font>)"})
)));
}