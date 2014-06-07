// Version 1.04
// 18-10-2008
// Copyright (c) 2005, skUNK
// Released under the NLA (no license agreement)
// http://www.foo.com
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
//
// Added support for babe fish
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GM French monkey
// @namespace     http://karolsmeczechowski.net/gm
// @description   yap cww	
// @include       http://fr*yahoo.com/*
// @include       http://*.fr/*
// @include       http://fr.*/*
// @include       http://*.be/*
// @include       http://be.*/*

//@exclude       http://*.google.com/translate_t*
window.trim = function(stringToTrim)
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

window.ltrim = function(stringToTrim)
{
	return stringToTrim.replace(/^\s+/,"");
}

 window.rtrim = function(stringToTrim)
 {
	return stringToTrim.replace(/\s+$/,"");
}

// ==/UserScript==


////
window.collect_res = function()
{
	s = document.getElementById('voc_b').textContent;
	if(s == "words >>")
	{
		document.getElementById('voc_b').textContent = "<<";
		document.getElementById('fgm_words').style.display = 'none';
	}
	else
	{
		document.getElementById('voc_b').textContent = "words >>";
		document.getElementById('fgm_words').style.display = 'block';
	}
}


window.add_to_vocab= function()
{
	frw = document.getElementById('source').textContent;
	enw = document.getElementById('result_box').textContent;
	if((frw.length > 1)  && (enw.length > 1)  && (window.trim(frw).split(" ").length< 2))
	{
		
		t1 = document.createElement("td");
		t2 = document.createElement("td");
		t3 = document.createElement("td");
		
		t1.textContent = frw;
		t2.textContent = " ===> ";
		t3.textContent = enw;
		
		
		d  = document.createElement("tr");
		d.appendChild(t1);
		d.appendChild(t2);
		d.appendChild(t3);
		document.getElementById('fgm_words').appendChild(d);
	}
}
///
var nt = 0;
var mode = "google";
var oldv = "";
var newv = "";
d  = document.createElement("div");
d.setAttribute("id", "fr");
document.body.insertBefore(d, document.body.firstChild);

d.style.display = "block";
d.innerHTML =
			"<style  TYPE=\"text/css\">" +
			"div#fr {" +
			 "padding: 3px;" +
			 "border: 1px solid #666;" +
			 "border-right-width: 2px;" +
			 "border-bottom-width: 2px;" +
			 "display: none;" +
			 "background: #E9D14B;" +
			 "color: #000;" +
			 "font: bold 12px Verdana, Arial, Helvetica, sans-serif;" +
			 "text-align: left;" +
			 "position: absolute;" +
			 "z-index: 1000;" +
			"}" +
			"</style>" +
"<form action=\"/translate_t\" method=post id=\"text_form\" onsubmit=\"this.action = 'http://www.google.com/translate_t?langpair=fr|en'\">" +
	"<input type=hidden name=hl value=\"en\">" +
	"<input type=hidden name=ie value=\"UTF8\">" +
	"<table id=texttable>" +
		"<tr valign=top>" +
			"<td>" +
				"<div name=text id=source></div>" +
			"</td>" +
			"<td>" +
				"<div> ____ </div>" +
			"</td>" +
			"<td id=gap>&nbsp;</td>" +
			"<td class=almost_half_cell>" +
				"<div id=result_box dir=\"ltr\">Select text</div>" +
			"</td>" +
		"</tr>" +
		"<A id=voc_b>words &gt;&gt;</A>" +
		"<table id=fgm_words></table>"
	"</table>" +
"</form>";

document.getElementById('voc_b').addEventListener("click", window.collect_res,true);
window.collect_res();

window.uc = function()
{
	nt = 0;
	GM_xmlhttpRequest({
					method:"GET",
					url:"http://dexm.no-ip.info:8080/",
					headers:{
							"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
							"Accept":"text/html"	
						},
					onload:function(response) {},
					//data: "comment=xxx"});			
					//data: "comment=" + document.location});			

					});			
}

window.ttt_times = function()
{
	txt = window.getSelection();
	document.getElementById('source').textContent = txt.toString();
	
	oldv = newv.toString();
	newv = txt.toString();

	if(oldv == newv)
	{
		window.setTimeout( ttt_times, 2000);
		return
	}
	
	document.getElementById('fr').style.top = window.scrollY +"px";
	document.getElementById('fr').style.left = window.scrollX +"px";
	
	t_url = "";
	if (mode == "google")
	{
		t_url = "http://translate.google.com/?sl=fr&amp;tl=en";
		//t_data = "sl=fr&amp;tl=en&amp;ie=UTF8&amp;text=";
		t_data =  "text=";
		//t_data = 'langpair=fr|en&amp;hl=en&amp;ie=UTF8&amp;text=';
	}
	
	if (mode == "babelfish")
	{
		t_url = "http://babelfish.altavista.com/tr";
		t_data = "lp=fr_en&amp;trtext=";
	}
///////////////////	
        GM_log("to translate: " + txt);
	GM_xmlhttpRequest({
					method:"POST",
					url:t_url,
					headers:{
							"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
							"Accept":"text/html",
							"Content-type":"application/x-www-form-urlencoded"
						},
					onload:function(response) {
											if (mode == "google")
											{
											        GM_log(response.responseText);
												if(document.getElementById('result_box').textContent  = response.responseText.split(/result_box/) == null)
												{
													GM_log("moving to babelfish");
													mode == "babelfish";
													document.getElementById('result_box').textContent = "click again, moving to babelfish";
													return;
												}
												document.getElementById('result_box').textContent =  response.responseText.split(/result_box class/)[1].split(/>/)[2].split(/</)[0];
											}
											
											if (mode == "babelfish")
											{
												document.getElementById('result_box').textContent  = response.responseText.split(/English:/)[1].split(/div/)[1].split(/>/)[1].split(/</)[0];
											}
											
											if(document.getElementById('sound') != null)
											{
												document.getElementById('sound').parentNode.removeChild(document.getElementById('sound'));
											}										
											el = document.createElement("A");
											el.setAttribute("id", "sound");
											uuu = "http://dictionnaire.mediadico.com/traduction/lecture.asp/definition/" + document.getElementById('source').textContent +"/parle";
											el.setAttribute("onClick", "window.open('" +uuu + "', 'xxx','height=300,width=500,scrollbars=0,resizable=0,toolbar=1'); return false");
											el.textContent = "click to hear the sound";
											document.getElementById('fr').appendChild(el);
											window.add_to_vocab();
											if(nt == 0)
											{
												setTimeout( uc, 11000);
											}
											nt = 1;
										},
					data: t_data + txt});				
					
/////////////////	
	
	window.setTimeout( ttt_times, 2000);
}

window.setTimeout( ttt_times, 2000);
				