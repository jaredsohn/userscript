// ==UserScript==
// @name                Addons Crap Remover
// @namespace      	http://addons.mozilla.org/userscript
// @description       	Removes crap, like conduit toolbars and other useless extensions
// @include		https://addons.mozilla.org/*/browse*
// ==/UserScript==
var BAD_TITLES=new Array("Reel New Media Toolbar","CallingID Link Advisor");
//Add ,"has:Toolbar" if you want to hide all extensions with "Toolbar" in the title
//This will hide some non-spam extensions, thats why its not in by default
var BAD_AUTHORS=new Array("Guy Levy", "Arvi","Playful","Terry Ballantini");
var BAD_PHRASES=new Array(
		"collects anonymous usage data", 
		"radio-toolbar.com",
		"conduit",
		"communitytoolbars.com",
		"ourtoolbar.com",
		"DOES NOT spy on your browsing habits",
		//^Ironic how that seems to be a sign its a bad extension :\
		"toolbar.com/privacy",
		//"dictionary",   I like to hide dictionary and spellcheck extensions because I
		//"Spellchecker",  have no use for them...
		"radio"
);
var RED_X="data:image/gif;base64,R0lGODlhEAAQAJEAAP8AAP%2F%2F%2F%2F%2F%2F%2FwAAACH5BAEAAAIALAAAAAAQABAAAAIdjI%2Bpy%2B1vAECSyRluu9px%2BHkctnSdUh0pxLYuVAAAOw%3D%3D";
var removed;
function insertStyle(){
	var CSS_RULES = new Array(
	  ".highlightRegion {",
	  "border-color: red !important;",
	  "border-style: solid !important;",
	  "}",
	  "img.redx {border: 1px solid #ccc; vertical-align: bottom; padding: 1px; margin-left: 3px;}"
	);
	GM_addStyle(CSS_RULES.join("\n"));
}
insertStyle();
function loadMoreRules(){
	var saved=GM_getValue("bad_titles");
	//GM_log("Saved:\n"+saved);
	if (saved!=null){
		saved=saved.split("\n");
		BAD_TITLES=BAD_TITLES.concat(saved);
	}
}
loadMoreRules();
function deCrapify(removeListener){
	//GM_log("decrappify");
	var entry;
	removed=new Array();
	//var results=document.getElementById("search-results");
	var content=document.getElementById("content");
	var results=getElementsByClassName(content,"div","addon-listitem");	
	for (var i=0;i<results.length;i++){
		entry=results[i];
		//GM_log(entry);
		//if (entry.className=="addon-feature clearfix"){
			if (isCrap(entry)){
				entry.childNodes[1].className+=" highlightRegion";
				//GM_log("Entry hidden - "+entry.className);
				entry.setAttribute("style","display: none !important;");
			}
			else{
				var redx = document.createElement("img");
				redx.src=RED_X;
				redx.className="redx";
				redx.addEventListener("click", removeExt, false);
				getElementsByClassName(entry,"div","addon-titleby")[0].childNodes[1].appendChild(redx);
			}
		//}
	} //while(entry=entry.nextSibling);
	adjustMessage(removeListener,content);
}
function reCrapify(){
		var content=document.getElementById("content");
	var results=getElementsByClassName(content,"div","addon-listitem");	
	for (var i=0;i<results.length;i++){
		entry=results[i];
		if (isCrap(entry)){
			entry.removeAttribute("style");
		}
	}
	var message=document.getElementById("badextension-message");
	message.innerHTML="Hide bad extensions";
	message.removeEventListener("click",reCrapify,false);	
	message.addEventListener("click",deCrapify,false);
}
function adjustMessage(removeListener,content){
	content=content?content:document.getElementById("content");
	var span;
	var needToInsert=false;
	span=document.getElementById("badextension-message");
	if (!span){
		span=document.createElement("span");
		span.setAttribute("id","badextension-message");
		needToInsert=true;
	}
	if (removed.length>1)
		span.innerHTML=removed.length+" extensions removed ("+removed+")";
	else if (removed.length==1)
		span.innerHTML=removed.length+" extension removed ("+removed+")";
	else
		span.innerHTML="No bad extensions here";
	span.setAttribute("style","color: red;");
	try{
		if (removeListener) span.removeEventListener("click",deCrapify,false);
	}catch(e){}
	span.addEventListener("click",reCrapify,false);
	if (needToInsert) 
		content.insertBefore(span,content.firstChild);
}
function containsTitle(title){
	for (var i=0;i<BAD_TITLES.length;i++){
		if (BAD_TITLES[i]==title)
			return true;
		else if (BAD_TITLES[i].substring(0,5)=="has:"){
			if (new RegExP(BAD_TITLES[i].substring(6),"i").exec(title))
				return true;
		}
	}
	return false;
}
function isCrap(entry){
	//GM_log("Entry: "+entry);
	var title=getTitle(entry);
	var author=getAuthor(entry);
	var description=getDescription(entry);
	//GM_log("Title: "+title);
	//GM_log("Author: "+author);
	//GM_log("Description: "+description);
	if (hasBadTitle(title)){
		removed.push(title);
		return true;
	}
	else if (BAD_AUTHORS.indexOf(author)>-1){
		removed.push(title);
		return true;
	}
	else{
		for (var i=0;i<BAD_PHRASES.length;i++){
			if (description.indexOf(BAD_PHRASES[i])>-1){
				removed.push(title);
				return true;
			}
		}
	}
	return false;
}
function hasBadTitle(title){
	for (var i=0;i<BAD_TITLES.length;i++){
		var bTitle=BAD_TITLES[i];
		if (bTitle.substring(0,4)=="has:"){
			bTitle=bTitle.substring(4);
			GM_log(bTitle);
			if (title.match(new RegExp(bTitle)))
				return true;
		}
		else if (bTitle==title)
			return true;
	}
}
function getTitle(entry){
	return getElementsByClassName(entry,"div","addon-titleby")[0].childNodes[1].firstChild.innerHTML;
}
function getAuthor(entry){
	return getElementsByClassName(entry,"div","addon-titleby")[0].childNodes[3].childNodes[1].innerHTML;
}
function getDescription(entry){
	return getElementsByClassName(entry,"div","addon-desc")[0].childNodes[1].innerHTML.replace(/<br>/g," ");
}
function removeExt(event){
	var entry=event.target.parentNode.parentNode.parentNode;
	var title=getTitle(entry);
	removed.push(title);
	var saved=GM_getValue("bad_titles");
	if (saved==null || saved.length==0)
		saved=title;
	else
		saved+="\n"+title;
	GM_setValue("bad_titles",saved);
	BAD_TITLES.push(title);
	var message=document.getElementById("badextension-message");
	entry.childNodes[1].className+=" highlightRegion";
	if (message.innerHTML!="Hide bad extensions"){
		entry.setAttribute("style","display: none !important;");
	}
	adjustMessage(true);
}
deCrapify();

/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}
