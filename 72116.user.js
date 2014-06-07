// ==UserScript==
// @name           Reddit NSFW Nanny
// @namespace      http://userscript.org/user/citricsquid
// @include        http://*reddit.com*
// @description    Hides all NSFW links on reddit.com pages!
// @license        Creative Commons -  Creative Commons Attribution-Noncommercial-Share Alike 2.0 UK: England & Wales License ( http://creativecommons.org/licenses/by-nc-sa/2.0/uk/ )
// ==/UserScript==

var cont = document.getElementById("siteTable");
var subs = cont.getElementsByClassName('thing');
var nsfw = 0;

function display(opt){
	for (i = 0; i < subs.length; i++){
	
		var labels = subs[i].getElementsByClassName('flat-list buttons')[0];
		var firstlabel = labels.getElementsByTagName('li')[0].className;
		if(firstlabel == "rounded nsfw-stamp"){
			nsfw++;
			if(opt == "hide"){
				subs[i].style.display='none';
			}else if(opt == "show"){
				subs[i].style.display='';
			}
		}
	}
}

display("hide");

var sidebar = document.getElementsByClassName('side')[0];
sidebar.innerHTML = '<div class="spacer"><div class="sidebox" style="background-image:url(http://m00d.net/greasemonkey/nsfwnanny/nsfw.png); background-repeat:no-repeat; height:40px; padding:5px 0 0 44px;"><div class="subtitle">'+nsfw+' links marked as <span style="font-size:0.9em; opacity:0.6;">nsfw</span> have been hidden</div></div>'+sidebar.innerHTML;