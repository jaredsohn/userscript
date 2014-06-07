// ==UserScript==
// @name       Auto-hotkey.com tweaks
// @namespace  http://userscripts.org/scripts/show/178963
// @version    1.2
// @description  This adds a Select All, a Popup and a Expand/Retract Feature and a Spoiler feature to the newly formed to AHK forums.
// @match     http://auto-hotkey.com/boards/viewtopic.php*
// @match     http://auto-hotkey.com/boards/posting.php?*
// @updateURL http://userscripts.org/scripts/source/178963.user.js
// @run-at document-end
// @copyright  2013+, Menixator
// ==/UserScript==

AddSpoilers();
var count = document.getElementsByClassName("codetitle").length;

if (count !== 0){
    // Adding the function
    scr=document.createElement("script");
	scr.setAttribute("type","text/javascript");;
	scr.src="http://menixator.pancakeapps.com/AHK-forums.js";
	document.head.appendChild(scr);
    
    //Adding the links
    for(var i=0;i<count;i++){
        document.getElementsByClassName("codecontent")[i].style.maxHeight = "240px";
        codetitleAdd("b","code_select(this.parentNode.nextSibling)","code_select","Select All",i);
        codetitleAdd("b","code_toggleHeight(this,this.parentNode.nextSibling)","code_height","Expand",i);
        codetitleAdd("b","code_popup(this.parentNode.nextSibling)","code_popup","Popup",i);
        document.getElementsByClassName("codecontent")[i].style.overflow="auto";
    }
}
function get_theme(){
    for (var i=0;i<document.getElementsByTagName("link").length;i++){
        if(document.getElementsByTagName("link")[i].href.match(/prosilver|subsilver/gi) !== null)
            return document.getElementsByTagName("link")[i].href.match(/prosilver|subsilver/gi)
    }
}
function codetitleAdd(name,onclick,className,text,index){
	var b=document.createElement(name);
	b.setAttribute("onclick",onclick);
	b.setAttribute("class",className);
	b.style.cursor="pointer";
	b.style.marginLeft="20px";
	b.innerHTML=text;
	document.getElementsByClassName("codetitle")[index].appendChild(b);
}

function AddSpoilers () {
	var count=document.getElementsByClassName("postbody").length
	for (i=0;i<count;i++){
	elem = document.getElementsByClassName("postbody")[i]
	document.getElementsByClassName("postbody")[i].innerHTML = elem.innerHTML.replace(/\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi,"<div class=\"post_spoiler\"><span class=\"spoiler_title\">Spoiler<\/span><input type=\"button\" class=\"post_spoiler_show\" style=\"padding: 3px;font-size: 12px;margin-left: 10px;\"value=\"Show\" onclick=\"spoil(this)\"><div class=\"bbc_spoiler_wrapper\"><div class=\"bbc_spoiler_content\" style=\"display:none;\"><p>$1<\/p><\/div><\/div><\/div>")
	}
}