// ==UserScript==
// @name         liveleak.com video download link
// @namespace     http://www.digivill.net/~joykillr
// @description   Adds a download link to liveleak.com so videos can be downloaded.
// @version       5.2
// @grant         none
// @include       http://liveleak.com/view*
// @include       http://*.liveleak.com/view*
// @include       http://*.liveleak.com/player.swf?*
// @include       http://liveleak.com/player.swf?*
// @include       https://*liveleak.com/view*
// ==/UserScript==
//
//v 5.2

var fa = new Array();
var fvar, fdsc, Div;
var divs = document.getElementsByTagName("div"), scrhead = document.getElementsByTagName("script");

function insertTable() {
	var URLDLbox = document.createElement("div");
	URLDLbox.innerHTML="<table><tr><td id='tdgm'></td></tr></table><br />"
	URLDLbox.style = "display: block; visibility: visible;";
	try { document.getElementById("wrapper").insertBefore(URLDLbox, document.getElementById("wrapper").firstChild); }
	catch(err) { document.getElementById("leftcol").insertBefore(URLDLbox, document.getElementById("body_text").nextSibling); }
}

function addBox(strR,D) {
if (!document.getElementById("tdgm")) {insertTable();}

if (strR.match(/^rtmp\:\/\//i)) {fdsc="RTMP Encrypted"}
else if (strR.indexOf("h264_")!=-1) {fdsc = strR.split("h264_")[1].split(".mp4")[0];} 
else {fdsc = ""}

if (strR!=null&&strR!=0) {
	var URLDLbox2 = document.createElement("a");
	URLDLbox2.innerHTML="<span>D/L "+fdsc+" Video</span>"
	URLDLbox2.style = "z-index: 10000; visibility: visible;";
	URLDLbox2.className="form_button";
	URLDLbox2.href=strR;
	document.getElementById("tdgm").appendChild(URLDLbox2);
	}
}

function isolateURL(f) {
	var file1="", file2="";
	return {
        //file1: f.split("file=")[1].split("&")[0],
        file1: f.split("&file_url=")[1].split("&")[0],
        file2: f.indexOf("&hd_file_url=")!=-1 ? f.split("&hd_file_url=")[1].split("&")[0] : 0
    }
}

function isolate2(f) {
	var file1="", file2="";
	return {
		file1: unescape(f[0].file),
		file2: f[1] ? unescape(f[1].file) : 0
    }
}

function execWithJS() {
for (var x=0; x<divs.length; x++) {
	fvar = "", Div = "";
	if (divs[x].id.match(/^wrapper$/gi)) {
		var Div = divs[x].getElementsByTagName("div")[0];
		if (Div.id.match(/^player/gi)||Div.id.match(/^file_/gi)) {
			var node = Div.getElementsByTagName("object")[0].getElementsByTagName("param");
			for (var y=0; y<node.length; y++) {
				if (node[y].name=="flashvars") {
					fvar = node[y].value;
					break;
				}
			}
			if (fvar!=null&&fvar!="") {
				var fs = isolateURL(unescape(fvar));
				prepareData(fs, Div);
			}
		}
	}
}
}

function prepareData(fs, Div) {
	fa.push(fs.file1, fs.file2);
	if (fa!=null&&fa!="") {
		while (fa!=""&&fa!=null) {
			addBox(unescape(fa[0]),Div);
			fa.splice(0,1);
		}
	}
}


if (scrhead!=null&&scrhead!="") {
	for (var b=0; b<scrhead.length; b++) {
		var scrb = scrhead[b].innerHTML.toString();
		if (scrb.indexOf("jwplayer")!=-1) {
			var jsn = scrb.split("jwplayer")[1].split("setup")[1].split(").")[0];
			jsn = jsn.replace(/\n/gm,"\ ").replace(/\s/gm,"").replace("+encodeURIComponent(document.URL)","");
			while (!jsn.charAt(jsn.length-1).match(/\}/)) {jsn = jsn.substring(0,jsn.length-2);}
			if (jsn.charAt(0)!="{") {jsn = jsn.substring(jsn.indexOf('{'));}
			
			try {
				var jdata = eval(JSON.parse(jsn)); 
			} catch(err) {
				var jsn2 = jsn.match(/(?=(\,|\{))*\w*\:(?!\/\/)/gi);
				for (jx=0;jx<jsn2.length;jx++) {
					var rep = jsn2[jx].substring(0,jsn2[jx].length-1);
					jsn = jsn.replace(jsn2[jx],'"'+rep+'":');
				}
				try {
					var jdata = eval(JSON.parse(jsn));
				} catch(err){
					jsn = jsn.match(/\"sources\"\:.[^\]]*/gi);
					jsn = "{"+jsn+"]}";
					try {
						var jdata = eval(JSON.parse(jsn));
					} catch(err) {
						//nothing else
					}
				}
			}
			

			if (jdata) {
				var dat = jdata.config;
				if (!dat||dat==null||dat=="") {
					var dat = jdata.sources;
					var fs = isolate2(dat);
				} else {
					var fs = isolateURL(unescape(dat));
				}
				prepareData(fs, Div);
			} else {execWithJS();}
			break;
		}
	}
}
else {
	execWithJS();
}

