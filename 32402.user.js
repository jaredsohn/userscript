// ==UserScript==
// @name           Object Finder
// @namespace      ~dkhal~
// @include        *
// @description    Want a flash game so bad that you'd do anything to get your hands on it? Do you want images or flash but the website blocked all sorts of ways to show you the file location? This script gives you what you need in seconds.
// Copyrighted (C) 2008 ~ dkhal
// ==/UserScript==

// Set this shortcut to whatever you want to type after click inside a page to show/hide the download form 
shortcut="display";

// Show Function
function show_o(){
form="<p align=center><b><u><font size=5>Object Finder:</font></b></u></p>";
form+="<p align=center><font size=4>Select object type: </font><select id=objt>";
form+="<option value=img>Image</option>";
form+="<option value=swf>Flash</option>";
form+="<option value=snd>Sound</option>";
form+="</select>&nbsp;&nbsp;<input type=button value=Catch onclick=javascript:seek(document.getElementById(\'objt\').value)></p>";
form+="<span id=res><b></b></span></div>";
document.getElementById("objf").innerHTML=form;
}
// Hide Function
function hide_o(){
document.getElementById("objf").innerHTML="";
}
// Decide wether to hide or show the captcher object
// Main setting
stat=true;
check_o=function(){
if(stat==true){
stat=false;
show_o();
}
else{
stat=true;
hide_o();
}
}

// Add the invisible division on top of each page
target=xpathGetFirst("//body");
target.innerHTML="<div id=objf></div>"+target.innerHTML;

// Add functions to command menu
GM_registerMenuCommand( "Show/Hide Object Finder", check_o , "", "", "" );

// Function set
function setFunc(func, new_func) {
	if (typeof unsafeWindow == "object") {
		unsafeWindow[func] = new_func;
	} else if(TW_Is_Opera) {
		window[func] = new_func;
	}
}

// The object seeker
// last searched obj (for no double searches
last="";
setFunc('seek', function(objt){
if(last!=objt){
var ot="";
if(objt=="img"){  // Images lookup
res=document.getElementsByTagName('img');
for(i=0; i<res.length; i++){
ot+="<img src="+res[i].src+" height=50 width=50 border=0>&nbsp;&nbsp;<a href="+res[i].src+" title='Click here and save it when it opens in full screen.'>Download</a><br>";
}
}
if(objt=="swf"){  // Flash lookup
res=document.getElementsByTagName('embed');
for(i=0; i<res.length; i++){
if(res[i].src.indexOf(".swf")>"-1" || res[i].src.indexOf(".dcr")>"-1")
ot+="<img 'src=http:/www.tugo.com/wp-content/flash-logo.png' width=50 height=50 border=0>&nbsp;&nbsp;<a href="+res[i].src+" title='Click here and save it when it opens in full screen or copy its url to a download manager.'>Download</a><br>";
}
}
if(objt=="snd"){  // Sound lookup
res1=document.getElementsByTagName('bgsound');    // Search for background sound
res2=document.getElementsByTagName('embed');      // Search for embedded sounds
for(i=0; i<res1.length; i++){
ot+="<img src='http://abhishek.tiwari.com/wp-content/uploads/2007/09/itunes-logo.jpg' width=50 height=50 border=0>&nbsp;&nbsp;<a href="+res1[i].src+" title='Click here and save it when it opens in full screen or copy its url to a download manager.'>Download</a><br>";
}
for(j=0; j<res2.length; j++){
ot+="<img src='http://abhishek.tiwari.com/wp-content/uploads/2007/09/itunes-logo.jpg' width=50 height=50 border=0>&nbsp;&nbsp;<a href="+res2[j].src+" title='Click here and save it when it opens in full screen or copy its url to a download manager.'>Download</a><br>";
}
}
out= ot ? ot : "Sorry no results found";
out+="</p>";
he="<p align=center><b><u><font size=4>Results found:</b></u> "+i+"</font><br><br>";
document.getElementById('res').innerHTML=he+out;
last=objt;
}
});

// Shortcut
nb = 0;
function follow(key)
	{
	e = (!document.all) ? key.which : event.keyCode;
	w = String.fromCharCode(e).toLowerCase();
	if(shortcut.charAt(nb) == w)
		nb++;
	else
		nb=0;
	if(nb == shortcut.length)
		{
		check_o();
		nb = 0;
		}
	}
if (document.addEventListener) {
window.addEventListener("keypress", follow, false);
}
else {
window.document.onkeypress = follow();
}

// Xpath
function xpathGetFirst(xpath) {
	return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}