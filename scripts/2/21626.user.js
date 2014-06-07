// ==UserScript==
// @name           Youtube Video Download Linker
// @namespace      http://www.digivill.net/~joykillr
// @description    A video download linker for youtube.  Provides download links on youtube video pages.  Does not need javascript enabled for youtube.com (NoScript compatible), does not use a third-party website, and does not use unsafeWindow.
// @version        2.3b3
// @grant          GM_addStyle
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @include        https://youtube.com/watch*
// ==/UserScript==

//v 2.3b3

var nasp, spec, fmtvar, titlevar, newa2 = "", scrhead = document.getElementsByTagName("script");

var acceptargs = new Array("algorithm", "burst", "clen", "codecs", "cp", "dur", "expire", "factor", "fallback_host", "fexp", "fmt", "fmt_map", "gcr", "gir", "id", "ipbits", "ip", "itag", "iv_load_policy", "key", "lmt", "ms", "mv", "mt", "newshard", "pcm2fr", "pltype", "quality", "ratebypass", "requiressl", "s", "sparams", "source", "sig", "signature", "sver", "title", "type", "upn" );

var formats = {
	5:  { itag: 5, quality: 5, description: "Low Quality, 240p", format: "FLV", fres: "240p", 	mres: { width:  400, height:  240 }, acodec: "MP3", vcodec: "SVQ"},
	17: { itag: 17, quality: 4, description: "Low Quality, 144p", format: "3GP", fres: "144p", mres: { width:  0, height: 0  }, acodec: "AAC", vcodec: ""},
	18: { itag: 18, quality: 15, description: "Low Definition, 360p", format: "MP4", fres: "360p", mres: { width:  480, height:  360 }, acodec: "AAC", vcodec: "H.264"},
	22: { itag: 22, quality: 35, description: "High Definition, 720p", format: "MP4", fres: "720p",	mres: { width: 1280, height:  720 }, acodec: "AAC", vcodec: "H.264"},
	34: { itag: 34, quality: 10, description: "Low Definition, 360p", format: "FLV", fres: "360p", 	mres: { width:  640, height:  360 }, acodec: "AAC", vcodec: "H.264"},
	35: { itag: 35, quality: 25, description: "Standard Definition, 480p", format: "FLV" , fres: "480p", mres: { width:  854, height:  480 }, acodec: "AAC", vcodec: "H.264"},
	36: { itag: 36, quality: 6, description: "Low Quality, 240p", format: "3GP", fres: "240p", 	mres: { width:  0, height:  0 }, acodec: "AAC", vcodec: ""},
	37: { itag: 37, quality: 45, description: "Full High Definition, 1080p", format: "MP4", fres: "1080p", mres: {width: 1920, height: 1080}, acodec: "AAC", vcodec: "H.264"},
	38: { itag: 38, quality: 55, description: "Original Definition", format: "MP4" , fres: "Orig",	mres: { width: 4096, height: 3072 }, acodec: "AAC", vcodec: "H.264"},
	43: { itag: 43, quality: 20, description: "Low Definition, 360p", format: "WebM", fres: "360p",	mres: { width:  640, height:  360 }, acodec: "Vorbis", vcodec: "VP8"},
	44: { itag: 44, quality: 30, description: "Standard Definition, 480p", format: "WebM", fres: "480p", mres: { width:  854, height:  480 }, acodec: "Vorbis", vcodec: "VP8"},
	45: { itag: 45, quality: 40, description: "High Definition, 720p", format: "WebM", fres: "720p", mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"},
	46: { itag: 46, quality: 50, description: "Full High Definition, 1080p", format: "WebM", fres: "1080p",	mres: {width: 1280, height: 720}, acodec: "Vorbis", vcodec: "VP8"},
	82: { itag: 82, quality: 16, description: "Low Definition 3D, 360p", format: "MP4",  fres: "360p", mres: { width: 640,  height:  360 }, acodec: "AAC", vcodec: "H.264"},
	84: { itag: 84, quality: 41, description: "High Definition 3D, 720p", format: "MP4",  fres: "720p",	mres: { width: 1280, height:  720 }, acodec: "AAC", vcodec: "H.264"},
	100: { itag: 100, quality: 17, description: "Low Definition 3D, 360p", format: "WebM", fres: "360p", mres: { width: 640,  height:  360 }, acodec: "Vorbis", vcodec: "VP8"},
	102: { itag: 102, quality: 42, description: "High Definition 3D, 720p", format: "WebM", fres: "720p", mres: {width: 1280, height: 720}, acodec: "Vorbis", vcodec: "VP8"},
	133: { itag: 133, description: "", format: "", fres: "240p", acodec: "", vcodec: ""},
	134: { itag: 134,  description: "", format: "", fres: "360p", acodec: "", vcodec: ""},
	135: { itag: 135, description: "", format: "", fres: "480p", acodec: "", vcodec: ""},
	136: { itag: 136,  description: "", format: "", fres: "720p", acodec: "", vcodec: ""},
	137: { itag: 137, description: "", format: "", fres: "1080p", acodec: "", vcodec: ""},
	138: { itag: 138,  description: "", format: "", fres: "4096p", acodec: "", vcodec: ""},
	140: { itag: 140, description: "Audio Stream", format: "", fres: "", acodec: "", vcodec: ""},
	160: { itag: 160, description: "", format: "", fres: "",  acodec: "", vcodec: ""}
	
	}
	
var wclh = window.content.location.href.toString();

var newstyle = "#yt-masthead-content {max-width:150%!important;} #browser-upgrade-box, #browser-upgrade-outer-box {display: none !important; visibility: hidden !important;}";

if (document.getElementById("eow-title")) {
	titlevar = parseTV(document.getElementById("eow-title").textContent.toString());
} else if (document.getElementById("watch-headline-title")&&document.getElementById("watch-headline-title").childNodes[1].innerHTML.toString()) {
	titlevar = parseTV(document.getElementById("watch-headline-title").childNodes[1].textContent.toString());
} else {
	titlevar = "Download_Video_Link";
}
	
function addBox(strR) {
	var ac = "", vc = "", qtype = "", qual = "", spec = "";
	if (strR.split("itag=")) {
		spec = parseInt(strR.split("itag=")[1].split("&")[0]);
		if (spec&&formats[spec]&&formats[spec].description!=""&&formats[spec].description!=null) {
			ac = formats[spec].acodec;
			vc = formats[spec].vcodec;
			spec = formats[spec].description;
		}
	}
	if (strR.indexOf("quality=")!=-1) {qual = strR.split("quality=")[1].split("&")[0];}
	if (strR.indexOf("type=video/")!=-1) {qtype = strR.split("type=video/")[1].split("&")[0];}
	else if (strR.indexOf("type=")!=-1) {qtype = strR.split("type=")[1].split("&")[0];}
	if (qtype&&qtype.indexOf(";")!=-1) {qtype = qtype.split(";")[0];}
	var NewDLBox = document.createElement("span");
	var NewDLHref = document.createElement("a");
	var NewDLLabel = document.createElement("span");
	NewDLLabel.className="yt-uix-button-content";
	NewDLLabel.textContent="Download";
	NewDLHref.className='yt-uix-button yt-uix-sessionlink yt-uix-button-hh-default yt-uix-button-default';
	NewDLHref.href = strR+"&title="+titlevar;
	NewDLHref.setAttribute("title", "Download "+ spec + " " + qual + " " + vc + "\/" + ac + " " + qtype);
	NewDLBox.className = "";
	NewDLBox.id='masthead-download-button-group';
	NewDLHref.appendChild(NewDLLabel);
	NewDLBox.appendChild(NewDLHref);
	document.getElementById("yt-masthead-content").appendChild(NewDLBox);
}

function parseTV(h) {
	h = unescape(h);
	h = h.replace(/\W/g,"_").replace(/\_+/g,"_").replace("_amp_", "_and_");
	while (!h.charAt(0).match(/[a-zA-Z0-9]/i)&&h.length>1) {h = h.substr(1);}
	while (h.length>1&&!h.charAt(h.length-1).match(/[a-zA-Z0-9]/i)) {h = h.substring(0,h.length-1);}
	return(h);
}

function getSType(spec) {
	return formats[spec].quality;
}

function procURLS(nasp) {
	nasp = cleanArray(nasp);
	for (x=0;x<nasp.length;x++) {
		var newalink = unescape(nasp[x]);
		if (newalink.indexOf("http")==-1) { nasp.splice(x,1); }
	}
	for (x=0;x<nasp.length;x++) {
		var nchkend = "", nlink = "", nchk = "", ny = "", narray = new Array();
		nasp[x] = unescape(unescape(nasp[x]));
		narray = nasp[x].split("&");
		narray = cleanArray(narray);
		for (y=0;y<narray.length;y++) {
			ny = narray[y];
			if (ny!=null&&ny!=""&&ny.match(/url\=/i)!=-1&&ny.indexOf("?")!=-1) {
				nlink = unescape(ny.split("url=")[1]);
				narray.splice(y,1);
				break;
			}
			ny = ""; 
		}
		for (var nx=0; nx<narray.length; nx++) {
		nchk = "", nchkend = "";
			if (narray[nx].split("=")) {
				nchk = narray[nx].split("=")[0];
				var specific = "";
				nchkend = narray[nx].indexOf("=");
				nchkend = narray[nx].substr(nchkend+1);
				if (acceptargs.indexOf(nchk)!=-1 && nlink.indexOf("&"+nchk+"=")==-1 && nlink.indexOf("?"+nchk+"=")==-1) {
					if (nchk.match(/fallback_host$/i)) {
						var nrxp = new RegExp("^(http|https)\:\/\/.{0,}\.(com|net)","i");
						if (nlink.indexOf("videoplayback")==-1&&nlink.match(nrxp)) {
							//
						}
					}
					else if (nchk.match(/signature$/i)&&nlink.indexOf("?signature=")==-1&&nlink.indexOf("&signature=")==-1) {
						nlink+="&signature=" + nchkend; 
					}
					else if (nchk.match(/sig$/i)&&nlink.indexOf("?signature=")==-1&&nlink.indexOf("&signature=")==-1) {
						nlink+="&signature=" + nchkend; 
					}
					else if (nchk.length==1&&nchk.match(/s$/i)&&nlink.indexOf("?signature=")&&nlink.indexOf("&signature=")==-1) {
						nlink+="&signature=" + static_decrypt_signature(nchkend);
					}
					else if (nchk.match(/type$/i)||nchk.match(/quality$/i)) {
						nlink = nlink+"&"+nchk+"="+encodeURIComponent(nchkend);
					} else {
						nlink+="&"+nchk+"="+nchkend;
					}
				}
			}
		}
		if (nlink!=null&&nlink!="") {
			addBox(decodeURIComponent(nlink));}
	}
}

function cleanArray(act){
	var newAr = new Array();
	for(var x = 0; x<act.length; x++){
		if (act[x]){
			newAr.push(act[x].toString());
		}
	}
	return newAr;
}

function cleanJSON(jsn) {
	if (jsn.charAt(0)!="{") {jsn = jsn.substring(jsn.indexOf('{'));}
	while (jsn.charAt(jsn.length-1).match(/\s/)) {jsn = jsn.substring(0,jsn.length-2);}
	if (jsn.indexOf("},")!=-1) {jsn = jsn.split('},')[0] + '}'}
	try {var jda = eval(JSON.parse(jsn))}
		catch(err) {
		while (!jsn.charAt(jsn.length-1).match(/\}/)) {jsn = jsn.substring(0,jsn.length-2);}
		var jda = eval(JSON.parse(jsn));
	}
	return jda;
}

function runIt(a1) {
	for (var b3=0; b3<a1.length; b3++) {
		if (a1[b3].innerHTML.match(/yt.playerConfig\ \=/gi)||a1[b3].innerHTML.match(/ytplayer.config\ \=/gi)) {
			var jsn = a1[b3].innerHTML.toString();
			if (jsn.match(/ytplayer.config\ \=/gmi)) {
				jsn = jsn.split('ytplayer.config\ =')[1];
				jsnaf = '{"adaptive_fmts' + jsn.split("adaptive_fmts")[1];
				jsnsm = '{"url_encoded_fmt_stream_map' + jsn.split("url_encoded_fmt_stream_map")[1];
			}
			var dat ="";
			jdata = cleanJSON(jsnsm);
			try { var dat = jdata.args.url_encoded_fmt_stream_map }
			catch(err) {try { var dat = jdata.url_encoded_fmt_stream_map } catch(err){}}
			dat = dat.replace(/\"/g,"\%22").replace(/\,\+/g,"%2C%2B");
			if (dat.indexOf(",")!=-1) {dat = dat.split(",")}
			procURLS(dat);
			
			var dat ="";
			jdata = cleanJSON(jsnaf);
			try { var dat = jdata.args.adaptive_fmts }
			catch(err) {try { var dat = jdata.adaptive_fmts } catch(err){}}
			
			dat = dat.replace(/\"/g,"\%22").replace(/\,\+/g,"%2C%2B");
			if (dat.indexOf(",")!=-1) {dat = dat.split(",")}
			procURLS(dat);
		}
	}
}

if (typeof GM_addStyle === 'function') {
	GM_addStyle(newstyle);
} else if (document.getElementsByTagName("style")[0]) {
	document.getElementsByTagName("style")[0]+=newstyle;
}

function setCook() {
	if (window.navigator.cookieEnabled) {
		document.cookie = "GEO=;domain=.youtube.com;path=/"; 
		//document.cookie = "use_hitbox=;"; 
		document.cookie = "VISITOR_INFO1_LIVE=;domain=.youtube.com;path=/"; 
		//document.cookie = "recently_watched_video_id_list=;"
		document.cookie = "YSC=;domain=.youtube.com;path=/";
	}
}

function reverse(s){
    return s.split("").reverse().join("");
}

function static_decrypt_signature(s, age_gate) {
	if (age_gate) {
		if (s.length==86) {
		//	return s[2:63] + s[82] + s[64:82] + s[63];
		return s.substring(2,63) + s.substr(82,1) + s.substring(64,82) + s.substr(63,1);
		}
	}
	if (s.length==93) {
		s = reverse(s);
		//return s[86:29:-1] + s[88] + s[28:5:-1];
		return s.substring(7,64) + s.substr(5,1) + s.substring(65,88);
	} else if(s.length==92) {
	//	return s[25] + s[3:25] + s[0] + s[26:42] + s[79] + s[43:79] + s[91] + s[80:83];
		return s.substr(25,1) + s.substring(3,25) + s.substr(0,1) + s.substring(26,42) + s.substr(79,1) + s.substring(43,79) + s.substr(91,1) + s.substring(80,83);
	} else if(s.length==91) {
		s = reverse(s);
	//return s;
	//	return s[84:27:-1] + s[86] + s[26:5:-1];
		return s.substring(7,64) + s.substr(5,1) + s.substring(65,86);
	} else if(s.length==90) {
	//	return s[25] + s[3:25] + s[2] + s[26:40] + s[77] + s[41:77] + s[89] + s[78:81];
		return s.substr(25,1) + s.substring(3,25) + s.substr(2,1) + s.substring(26,40) + s.substr(77,1) + s.substring(41,77) + s.substr(89,1) + s.substring(78,81);
	} else if(s.length==89) {
		s = reverse(s);
	//	return s[84:78:-1] + s[87] + s[77:60:-1] + s[0] + s[59:3:-1];
		return s.substring(5,11) + s.substr(2,1) + s.substring(12,29) + s.substr(89,1) + s.substring(30,86);
	} else if(s.length==88) {
	//	return s[7:28] + s[87] + s[29:45] + s[55] + s[46:55] + s[2] + s[56:87] + s[28];
		return s.substring(7,28) + s.substr(87,1) + s.substring(29,45) + s.substr(55,1) + s.substring(46,55) + s.substr(2,1) + s.substring(56,87) + s.substr(28,1);
	} else if(s.length==87) {
	//	return s[6:27] + s[4] + s[28:39] + s[27] + s[40:59] + s[2] + s[60:];
		return s.substring(6,27) + s.substr(4,1) + s.substring(28,39) + s.substr(27,1) + s.substring(40,59) + s.substr(2,1) + s.substring(60);
	} else if(s.length==86) {
		s = reverse(s);
	//	return s[80:72:-1] + s[16] + s[71:39:-1] + s[72] + s[38:16:-1] + s[82] + s[15::-1];
		return s.substring(6,14)+s.substr(70,1)+s.substring(15,47)+s.substr(14,1)+s.substring(48,70)+s.substr(4,1)+s.substring(71);
	} else if(s.length==85) {
		//return s[3:11] + s[0] + s[12:55] + s[84] + s[56:84];
		return s.substring(3,11)+s.subtr(0,1)+s.substring(12,55)+s.subtr(84,1)+s.substring(56,84);
	} else if(s.length==84) {
		//return s[78:70:-1] + s[14] + s[69:37:-1] + s[70] + s[36:14:-1] + s[80] + s[:14][::-1];
		s = reverse(s);
		return s.substring(6,14)+s.substr(70,1)+s.substring(15,47)+s.substr(14,1)+s.substring(48,70)+s.substr(4,1)+s.substring(70)+s.substr(0,1);
	} else if(s.length==83) {
		s = reverse(s);
	//	return s[80:63:-1] + s[0] + s[62:0:-1] + s[63];
		return s.substring(3,20)+s.substr(83,1)+s.substring(21,83)+s.substr(20,1);
	} else if(s.length==82) {
		s = reverse(s);
	//	return s[80:37:-1] + s[7] + s[36:7:-1] + s[0] + s[6:0:-1] + s[37];
		return s.substring(2,45)+s.substr(75,1)+s.substring(46,75)+s.substr(82,1)+s.substring(76,82)+s.substr(45,1);
	} else if(s.length==81) {
		s = reverse(s);
	//	return s[56] + s[79:56:-1] + s[41] + s[55:41:-1] + s[80] + s[40:34:-1] + s[0] + s[33:29:-1] + s[34] + s[28:9:-1] + s[29] + s[8:0:-1] + s[9];
		return s.substr(25,1)+s.substring(2,25)+s.substr(40,1)+s.substring(26,40)+s.substr(1,1)+s.substring(41,47)+s.substr(81,1)+s.substring(48,52)+s.substr(47,1)+s.substring(53,72)+s.substr(52,1)+s.substring(73,81)+s.substr(72,1);
		//return s;
	} else if(s.length==80) {
	//	return s[1:19] + s[0] + s[20:68] + s[19] + s[69:80];
		return s.substring(1,19)+s.substr(0,1)+s.substring(20,68)+s.substr(19,1)+s.substring(69,80);
	} else if(s.length==79) {
		s = reverse(s);
	//	return s[54] + s[77:54:-1] + s[39] + s[53:39:-1] + s[78] + s[38:34:-1] + s[0] + s[33:29:-1] + s[34] + s[28:9:-1] + s[29] + s[8:0:-1] + s[9];	
		return s.substr(25,1)+s.substring(2,25)+s.substr(40,1)+s.substring(26,40)+s.substr(1,1)+s.substring(41,45)+s.substr(79,1)+s.substring(46,50)+s.substr(45,1)+s.substring(51,70)+s.substr(50,1)+s.substring(71,79)+s.substr(70,1);
	}
}
	
if (scrhead!=null&&scrhead!=""&&(wclh.indexOf("/watch?")!=-1)) {
	setCook();
	var dldiv = document.createElement("div");
	dldiv.setAttribute("style","text-align: center!important; margin-left: auto!important; margin-right: auto!important; width:auto; height:auto;");
	var dltable = document.createElement("table");
	dltable.innerHTML = '<tbody style="text-align: center!important; margin-left: auto!important; margin-right: auto!important;"><tr><td id="gmdltd" style="margin-left: auto!important; margin-right: auto!important; text-align: center!important;"></td></tr></tbody>';
	dltable.id  = "gmdltable";
	dltable.setAttribute("style","text-align: center!important; display: none; visibility: hidden;");
	dldiv.appendChild(dltable);
	if (document.getElementById("pagetop")) {document.getElementById("pagetop").appendChild(dldiv); } else {document.body.insertBefore(dldiv, document.body.firstChild);}
	runIt(scrhead);
	setCook();
}

