// ==UserScript==
// @name           YouTube JW Player
// @namespace      http://userscripts.org/users/23652
// @description    Uses the JW Player for youtube. Has options in the user script commands
// @include        http://*.youtube.com/watch?*v=*
// @include        http://youtube.com/watch?*v=*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=49366
// ==/UserScript==

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,type,target,width,height,allowfullscreen,allowscriptaccess,flashvars".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(let i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

GM_config.init("YouTube JW Player Options", {
	autoplay  : {
	label : "Autoplay?",
	type : "checkbox",
	_def : true
	},
	hd  : {
	label : "High Definition?",
	type : "checkbox",
	_def : true
	},
	width : {
	label : "Width",
	type : "text",
	_def : "854"
	},
	height : {
	label : "Height",
	type : "text",
	_def : "505"
	},
	playerSrc : {
	label : "Player source",
	type : "text",
	_def : "http://tomhess.net/VideoPayer/mediaplayer.swf"
	}
});

GM_registerMenuCommand("YouTube JW Player Options", GM_config.open);

var mp = $("movie_player");
if(!mp) return;
var	args = unsafeWindow.yt["config_"]["SWF_ARGS"],
	id = escape(args["video_id"]),
	t = escape(args["t"]),
	fmt_map = unescape(args["fmt_map"]),
	qual="";
	if(fmt_map.indexOf("37/4000000/9/0/115")!=-1) qual="37";
	else if(fmt_map.indexOf("22/2000000/9/0/115")!=-1) qual="22";
	else if(fmt_map.indexOf("35/640000/9/0/115")!=-1) qual="35";
	else if(fmt_map.indexOf("34/0/9/0/115")!=-1) qual="34";
	else if(fmt_map.indexOf("18/512000/9/0/115")!=-1) qual="18";
var file = "http://youtube.com/get_video%3Fvideo_id%3D"+id+"%26t%3D"+t+(qual!=""&&GM_config.get("hd")==true?"%26fmt%3D"+qual:"")+"%26dbsgdh%3Dvideo.flv",
	image = "http://i1.ytimg.com/vi/"+id+"/0.jpg",
	newmp = create("object", {id:"movie_player", width:"100%", height:"100%"}, new Array(
	create("param", {name:"movie", value:GM_config.get("playerSrc")}),
	create("param", {name:"allowfullscreen", value:"true"}),
	create("param", {name:"allowscriptaccess", value:"always"}),
	create("embed", {type:"application/x-shockwave-flash", src:GM_config.get("playerSrc"), width:GM_config.get("width"), height:GM_config.get("height"), allowfullscreen:"true", allowscriptaccess:"always", flashvars:"width="+GM_config.get("width")+"&height="+GM_config.get("height")+"&file="+file+"&image="+image+"&autostart="+(GM_config.get("autoplay")==true?"true":"false")})
	));
mp.parentNode.replaceChild(newmp, mp);