// ==UserScript==
// @name           OpenLinkinNewTab for *z
// @namespace      http://www.somethingselse.com
// @description    Open All link in forum thread in New Tab for *z 
// @include        *.org:88/forums.php?action=viewtopic*
// @include        *.org:88/markets.php?action=viewtopic*
// ==/UserScript==

function count_a_Tags(html) {
    var matches = html.match(new RegExp("<a", "ig"));
    return matches ? matches.length : 0;
}

function openlink(elem_no) {
	return function () {
		var descnode = document.getElementsByClassName('comment')[elem_no];
      	targetnode = descnode.getElementsByTagName('a');
      	var sigpos = descnode.innerHTML.indexOf("------------------------");
		if(sigpos>0){
			var sigcontent = descnode.innerHTML.substring(sigpos,descnode.innerHTML.length);
			var looptime = targetnode.length-count_a_Tags(sigcontent);
		}
		else 
			var looptime = targetnode.length;
			
			for(i=0;i<looptime;i++){
				urlvar=targetnode[i].href;
				GM_openInTab(urlvar);
			}
   }
}

var comment_length = document.getElementsByClassName('comment').length;
var a=1;
for(var i=0;i<comment_length;i++){
	elem_tools = document.getElementsByClassName('embedded')[a];
	elem = document.getElementsByClassName('sub')[i];
	elem_tools.innerHTML += ' ';
	var openToolsTag = document.createElement("a");
	openToolsTag.href = "#";
	openToolsTag.id = "openallss_" + i;
	openToolsTag.innerHTML = "<img src='http://img.ihere.org/uploads/bedd76d4a9.png' style='border:none;'>";
	elem_tools.appendChild(openToolsTag);
	openToolsTag.addEventListener("click",openlink(i), true);
	a+=2;
}