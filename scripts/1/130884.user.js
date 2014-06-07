// ==UserScript==
// @name           	DramaFever Subtitle Downloader
// @description    	Adds option to download subtitles from DramaFever
// @version        	0.9
// @author         	little-vince
// @namespace      	http://little-vince.tumblr.com/
// @source			http://userscripts.org/scripts/show/130884
// @identifier		http://userscripts.org/scripts/source/130884.user.js
// @include        	*www.dramafever.com/*
// ==/UserScript==

// Last edited 31 August 2012

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

DramaFever Subtitle Downloader is Copyright (c) 2012, little-vince
DramaFever Subtitle Downloader is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

DramaFever is a registered trademark of DramaFever Corp.
DramaFever Subtitle Downloader is not related to or endorsed by DramaFever Corp. in any way.

*/

/*

Changelog:
0.9 (2012-008-31)
	[!] Dramafever made major changes to their website. Updated script to accommodate changes.
0.8 (2012-06-27)
	[+] You no longer need to right-click, just click the button normally to download the subtitles.
	[!] Dramafever changed things again.
0.7 (2012-05-10)
	[!] Dramafever changed stuff things again.
	[!] Significantly improved code
0.6 (2012-05-09)
	[!] Dramafever changed some internal stuff which caused some things to screw up.
0.5 (2012-04-27)
	[-] Removed download link under title (it was too ugly)
	[+] Added subtitle availability status
	[!] Default download link is now from tab
0.4 (2012-04-26)
	[+] Added option to download subs from tab
	[!] Optimised code
0.3 (2012-04-26)
	[+] Added tab for version information and update checks
0.2 (2012-04-18)
	[+] Added fallback if no subtitles are available
0.1 (2012-04-14)
	[+] Added subtitles download link

*/

var version="0.9",
	check=0;

function addstyle() {
	var a=document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
	a.type="text/css";
	a.innerHTML="#hiddenblock{width:640px;left:-310px;display:none}h4{padding-bottom:5px;color:#B92026}#mainleft{width:295px;float:left}#mainright{margin-top:10px;width:310px;float:right}#vince{position:absolute;bottom:20px;width:inherit}.space p a{color:#B92026;font-style:italic;display:inline;line-height:normal;padding:0}#hiddenblock:after{left:310px;width:145px}#notify{font-size:10px;font-weight:normal;color:white;position:absolute;right:0;top:25px}#hiddenblock p,h4{line-height:16px}"
}
function initiate() {
	var a=document.getElementsByClassName("nav")[0].appendChild(document.createElement("li"));
    a.onmouseover=function() {
        document.getElementById("hiddenblock").style.display="block"
    };
    a.onmouseout=function() {
        document.getElementById("hiddenblock").style.display="none"
    };
	a.className="dropdown";
	a.innerHTML="<a class='dropdown-toggle' data-toggle='dropdown' target='_blank' href='http://www.facebook.com/DramaFeverSubtitleDownloader'>Subtitle Downloader</a><div class='dropdown-menu' id='hiddenblock'><div id='mainleft'><iframe src='http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FDramaFeverSubtitleDownloader&amp;width=295&amp;height=358&amp;colorscheme=light&amp;show_faces=true&amp;;border_color&amp;stream=false&amp;header=false' scrolling='no' frameborder='0' style='border:0;overflow:hidden;width:295px;height:360px' allowtransparency='true'></iframe></div><div id='mainright' class='space'><a class='btn btn-inverse pull-right btn-viewall' target='_blank' href='http://userscripts.org/scripts/show/130884'>Check For Updates</a><h4>Current Version</h4><p>"+version+"</p><div id='vince'><h4>Questions, Queries, Comments, Criticisms, Complaints, Diatribes</h4><p>Leave a message on the <a href='http://www.facebook.com/DramaFeverSubtitleDownloader' target='_blank'>facebook page</a> or contact me <a href='http://twitter.com/littlevince09' target='_blank'>here</a>.<br><br>Plugin by <a href='http://little-vince.tumblr.com' target='_blank'>little-vince</a></p></div></div><div class='clearfix'></div></div>"
}
function geturl() {
	var xmlHttp=new XMLHttpRequest();
	xmlHttp.open("GET",location.href,false);
	xmlHttp.send();
	var str=xmlHttp.responseText;
	str=str.slice(str.lastIndexOf("captionUrl:")+11,str.lastIndexOf(".srt")+4);
	str=str.slice(str.lastIndexOf("'")+1);
	return str
}
function loadsub() {
	if (window.location.pathname.split('/')[1]==="drama") {
		var f=document.getElementsByClassName("video-wrap")[0].appendChild(document.createElement("span"));
		f.id="notify";
		var g=document.getElementById("cb_medrect1_div");
		check=(document.getElementById("dfsubtitlebox").outerHTML.search(".srt")>0)?1:2
	}
    var a=document.getElementById("mainright").appendChild(document.createElement("div"));
    var b=a.appendChild(document.createElement("h4"));
    var c=a.appendChild(document.createElement("p"));
	switch(check) {
		case 1:
			f.innerHTML=b.innerHTML="Subtitles: Available";
			c.innerHTML="Click 'Download' to save the current subtitles to your computer.";
			var d=a.appendChild(document.createElement("div"));
			d.className="dfdramatitleright";
			var e=d.appendChild(document.createElement("a"));
			e.className="btn btn-inverse pull-right btn-viewall";
			e.href=geturl();
			e.innerHTML="Download";
			g.parentNode.removeChild(g);
			break;
		case 2:
			f.innerHTML=b.innerHTML="Subtitles: Unavailable";
			c.innerHTML="There are no subtitles available for download.<br><br>You can click the 'Subtitles' tab, next to the 'Episodes' tab to ensure this is true.<br><br>If you think this is a mistake, try refreshing the page, checking for updates via the button above or try downloading the subtitles <a href='http://little-vince.tumblr.com/post/20960461275/' target='_blank'>manually.</a>";
			g.parentNode.removeChild(g);
			break;
		default:
			b.innerHTML="Subtitles";
			c.innerHTML="Please navigate to a drama that you would like to download the subtitles for."
	}
}
addstyle();
initiate();
loadsub();