// ==UserScript==
// @name         onemangahelper
// @namespace    http://www.onemanga.com
// @description  onemangahelper script by samliew
// Documentation http://userscripts.org/scripts/show/27618
// Last updated: 17 July 2010
// 
// What this script does:
//    This script removes almost everything from the comics view page including ads and the header/footer bar,
//    and puts direct links to the page images so you can use an external plugin like FlashGot to download all the images in the chapter.
//    An option is also included to display all images in order for easier reading.
//    This script also works on onemanga.com's sister site, 1000manga.com
// 
// @include    *onemanga.com/*
// @exclude    *onemanga.com/
// @exclude    *onemanga.com/directory/*
// @exclude    *onemanga.com/recent/*
// @exclude    forum.onemanga.com/*
// @exclude    *onemanga.com/chat/*
// @exclude    *onemanga.com/supportus/*
// @exclude    *onemanga.com/shop/*
// @exclude    *onemanga.com/contactus/*
// @exclude    *beta.onemanga.com/account/*
// 
// @include    *1000manga.com/*
// @exclude    *1000manga.com/
// @exclude    *1000manga.com/directory/*
// @exclude    *1000manga.com/recent/*
// @exclude    forum.1000manga.com/*
// @exclude    *1000manga.com/chat/*
// @exclude    *1000manga.com/supportus/*
// @exclude    *1000manga.com/shop/*
// @exclude    *1000manga.com/contactus/*
// @exclude    *beta.1000manga.com/account/*
// ==/UserScript==
// 
//
// OPTIONS:
// - To change options, go to any page in onemanga.com
// - Right-click on the GM (greasemonkey) icon at the bottom-right corner of the Firefox statusbar.
// - In the GM menu, under "User Script Commands...", you will see the following options.
// - When you select the option, a prompt will ask you whether you want to enable or disable it. (OK=Enable, Cancel=Disable)
// - The options will take effect the next page you open (or refresh the current page)
// 
//   CURRENT AVAILABLE OPTIONS:
//   1) Auto Show All
//   2) [Load 5 Chapters] Button
//   3) Change Background Color
//   4) Load Last Page
// 
// - Other options displayed but not listed here are for other scripts that you have installed.
// - See description for options at http://userscripts.org/scripts/show/27618
//___________________________________________________________________________



// ===== Start main script ===== 
var opt= Array();
var body= document.getElementsByTagName("body")[0];
var head= document.getElementsByTagName("head")[0];

// ===== Useful functions ===== 
function getElementsByClassName(className, tag, elm){
	var testClass= new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag= tag || "*"; var elm= elm || document;
	var elements= (tag=="*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements= []; var current; var length= elements.length;
	for(var i=0; i<length; i++){ current= elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
	}}
	return returnElements;
}
function $(){
	var elements= new Array();
	for (var i=0; i<arguments.length; i++){
		var element= arguments[i];
		if(typeof element=='string') element= document.getElementById(element);
		if(arguments.length==1) return element;
		elements.push(element);
	}
	return elements;
}
function stripHTML(text){
	var re= /(<([^>]+)>)/gi;
	return text.replace(re, "");
}
function documentSrcReplace(find, replace){
	var re= new RegExp(find, "gi");
	head.innerHTML= (head.innerHTML).replace(re, replace);
	body.innerHTML= (body.innerHTML).replace(re, replace);
}
function getDirLength() {
   var myloc = window.location.href;
   var locarray = myloc.split("/");
   return locarray.length;
}
function removeHTMLComments(html) {
   return html.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g,'');
}
// Browser detect script by http://javascriptly.com/2008/09/javascript-to-detect-google-chrome/
var isChrome = /chrome/.test( navigator.userAgent.toLowerCase() );

// ===== Get current directory ===== 
var chapter="";
var dir="";
try{
	var myloc= window.location.href;
	var locarray= myloc.split("/");
	chapter= locarray[locarray.length-3];
	locarray.pop(); locarray.pop();
	locarray[locarray.length-1]="";
	dir= locarray.join("/");
}catch(e){}

// ===== Remove <script>, <noscript> and buttons ===== 
try{
	elems= document.getElementsByTagName("script");
	for(i=elems.length;i>= 0;i--){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}

	elems= document.getElementsByTagName("noscript");
	for(i=elems.length;i>= 0;i--){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}

	elems= document.getElementsByTagName("form");
	for(i=elems.length;i>= 0;i--){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}

	elems= document.getElementsByTagName("iframe");
	for(i=elems.length;i>= 0;i--){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}
	
	elems= document.getElementsByTagName("input");
	for(i=elems.length-1;i>=0;i--){ try{
		if(elems[i].type=="button") elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}
	
	head.innerHTML = removeHTMLComments(head.innerHTML);
	body.innerHTML = removeHTMLComments(body.innerHTML);
}catch(e){}

// ===== Remove Ads ===== 
try{
	elems= getElementsByClassName("banner-chapter");
	for(i=0;i<elems.length;i++){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}

	elems= getElementsByClassName("ad-section");
	for(i=0;i<elems.length;i++){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}

	elems= getElementsByClassName("note");
	for(i=0;i<elems.length;i++){ try{
		elems[i].parentNode.removeChild(elems[i]);
	}catch(e){continue;}}
}catch(e){}


if(getDirLength()==7) { // script works for manga pages only

// ===== Get value of last page =====
var lastPageURL = "";
try{ lastPageURL = $("id_page_select").options[$("id_page_select").options.length-1].value; }catch(e){ }

// ===== Remove header & footer ===== 
try{
	$("header").parentNode.removeChild($("header"));
	$("footer").parentNode.removeChild($("footer"));
}catch(e){}

// ===== Remove Other Stuff =====
try{
	elems= getElementsByClassName("clear")[0];
	elems.parentNode.removeChild(elems);
	
	elem= getElementsByClassName("note")[0];
	elem.parentNode.removeChild(elem);
	
	elem= getElementsByClassName("chapter-navigation")[0];
	elem.innerHTML= (elem.innerHTML).replace(/Page/,'');
	
	elems= getElementsByClassName("chapter-navigation");
	try{elems[elems.length-1].parentNode.removeChild(elems[elems.length-1]);} catch(e){}
}catch(e){}

// ===== Change body style ===== 
try{
	var s= document.createElement('style'); s.type= "text/css"; s.innerHTML= "\
body { background-image:none; cursor:default; font-size:16px; font-family:Arial; }";
	
	opt[3]= GM_getValue('bgColour', true);
	window.changeBGColour= function(){
		s.innerHTML+="body { background-color:"+(opt[3]?'white':'black')+"; }\
body, p, font, div, span, h1,h2,h3, #page-content { color: "+(opt[3]?'black':'white')+"; }";
	}
	changeBGColour();
	head.appendChild(s);
}catch(e){}

// ===== Strip links from header ===== 
try{
	e= document.getElementsByTagName("h1")[0];
	e.innerHTML= stripHTML(e.innerHTML)// + " Chapter "+chapter;
}catch(e){}

// ===== Get image url ===== 
try{
	var imgurl= getElementsByClassName("manga-page")[0].src;
	var locarray= imgurl.split("/");
	locarray.pop();
	var imgdir= locarray.join("/");
	getElementsByClassName("one-page")[0].innerHTML="";
	getElementsByClassName("one-page")[0].id= "showall";
}catch(e){}

// ===== Hide reading instructions ===== 
try{
	find=    "&lt;&lt;&lt;&lt;&lt;  &nbsp;&nbsp;This series is read from right to left&nbsp;&nbsp;  &lt;&lt;&lt;&lt;&lt;";
	replace= "<span id='readinstr' style='display:none'>"+find+"</span>";

	var re= new RegExp(find, "gi");
	$('content').innerHTML= ($('content').innerHTML).replace(re, replace);
}catch(e){}

// ===== Remove comments and whitespace in code ===== 
try{
	find= "\\<!--.*--\\>"; documentSrcReplace(find, '');
	find= "  "; documentSrcReplace(find, '');
	find= "\\s\\n"; documentSrcReplace(find, '');
//	find= "\\n\\s"; documentSrcReplace(find, '');
}catch(e){}

// ===== Create previous/next chapter button ===== 
var btn_str="", btn_str_e="";

try{
	// ===== Load last page first:Get value ===== 
	opt[4]= GM_getValue('lastPage', false);
	
	// ===== Make prev chapter button ===== 
	btn_str=   "<input type='button' value='&lt;&lt; Prev Chapter' onclick=\"try{window.location=\'"+dir+"\'+document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex+1].value;}catch(e){this.disabled=true;this.blur();this.value='First Chapter!';}\" id=\"prevchp\" />";
	
	// ===== Load last page first:Yes ===== 
	if(opt[4]){
			btn_str+=  "&nbsp;<input type='button' value='Next Chapter &gt;&gt;' onclick=\"try{window.focus();window.location=\'../"+lastPageURL+"\';}catch(e){this.disabled=true;this.blur();this.value='Last Chapter!';}\" id=\"nextchp\" />";
	}
	// ===== Load last page first:No =====
	else {
			btn_str+=  "&nbsp;<input type='button' value='Next Chapter &gt;&gt;' onclick=\"try{window.focus();window.location=\'"+dir+"\'+document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex-1].value;}catch(e){this.disabled=true;this.blur();this.value='Last Chapter!';}\" id=\"nextchp\" />";
	}
	
	btn_str_e= escape(btn_str);
}catch(e){}

// ===== Create load next 5 chapters button ===== 
var btn_str_next5="", btn_str_next5_e="";
try{
	opt[2]= GM_getValue('next5', false);
	window.doNext5Button= function(){
		if(opt[2]){ try{ 
			btn_str_next5=   "&nbsp;<input type='button' value='Load 5 Chapters &gt;&gt;' onclick=\"try{for(i=2;i<=5;i++){window.open(\'"+dir+"\'+document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex-i].value);}document.getElementById('nextchp').click();}catch(e){this.disabled=true;this.blur();this.value='Last Chapter!';}\" id=\"next5chp\" />";
			btn_str_next5_e= escape(btn_str_next5);
		}catch(e){}}
	}
	doNext5Button();
}catch(e){}

// ===== List out pages instead ===== 
try{
	var option= getElementsByClassName("page-select")[0].childNodes;
	var string="";
	var pagesurl= Array();
	for(i=0;i<option.length;i++){
		if(option[i].value!=undefined){
			string+= "<a style='font-size:16px;' href="+imgdir+"/"+option[i].value+".jpg>"+option[i].value+"</a> &nbsp;";
			pagesurl[i]= imgdir+"/"+option[i].value;
		}
	}
	e= getElementsByClassName("page-select")[0];
	p= e.parentNode;
	p.removeChild(e);
	
	if(isChrome) {
		p.innerHTML= p.innerHTML+" "+btn_str;
	}
	else {
		p.innerHTML= p.innerHTML+" "+btn_str+"&nbsp;<input type='button' id='showAllLink' value='SHOW ALL' onclick='this.blur();showall();document.getElementById(\"imglinks\").style.display=\"none\";this.parentNode.removeChild(this);' /><br><br><div id='imglinks' style='margin-left:15%;margin-right:15%;padding-left:4px;padding-right:4px;border:1px dashed #cccccc;border-collapse:collapse;text-align:left;color:#666666;display:auto;'><p>Images: "+string+"</p></div>";
	}
}catch(e){}

// ===== Focus Current Chapter in select ===== 
var fc= false, lc= false;
try {
	var chpSelector = getElementsByClassName("chapter-select")[0];
	chpSelector.id= "chpt_sel";
	chpSelector.style.width= "500px";
	for(i=0;i<chpSelector.options.length;i++){ if(chpSelector.options[i].value.substr(0,chapter.length)==chapter){chpSelector.selectedIndex=i;} }
}catch(e){}

// ===== Check if last page of chapter, and redirect to next chapter =====
try{
	var currentURL = dir + chapter + "/" + lastPageURL + "/";
	if(currentURL == window.location) {
		window.location=dir+document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex-1].value;
	}
} catch(e){
	document.getElementById('nextchp').disabled=true;
	document.getElementById('nextchp').value='Last Chapter!';
}

// ===== Disable onemanga keyboard shortcuts if Chrome =====
if(isChrome){
	try{
		e= document.createElement('script');
		e.type= "text/javascript";
		temp= "document.onkeydown= new function(e){return false;}";
		e.innerHTML= temp;
		head.appendChild(e);
	}catch(e){}
}
// ===== Change onemanga keyboard shortcuts =====
else {
	try{
		var prevlink="#", nextlink="#";
		if(document.getElementById('chpt_sel').options.selectedIndex+1 < document.getElementById('chpt_sel').options.length) {
			prevlink = ""+ dir + document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex+1].value;
		}
		if(document.getElementById('chpt_sel').options.selectedIndex-1 >= 0) {
			nextlink = ""+ dir + document.getElementById('chpt_sel').options[document.getElementById('chpt_sel').options.selectedIndex-1].value;
		}
		unsafeWindow.init_events(prevlink, nextlink, true, true);
	}catch(e){}
}

// ===== Add showall function ===== 
try{
	var str="";
	for(i=0;i<pagesurl.length;i++){ 
		if(pagesurl[i]!=undefined) str+="<img src= \""+pagesurl[i]+".jpg\" /><br>&nbsp;<hr><br>";
	}
	
	if(isChrome){
		document.getElementById('showall').innerHTML="<div align='center' id='all' style='text-align:center; font-size:15px; font-family:Calibri, Arial;'>"+str+"<p>"+unescape(btn_str_e)+unescape(btn_str_next5_e)+"<br><input type='button' onclick='javascript:window.scrollTo(0,0);' value='Back To Top' style='margin-top:5px;' /><br><br></p><p>Project by: <a href='http://www.samliew.com' target='_blank'>Samuel Liew</a> | <a href='http://www.userscripts.org/scripts/show/27618' target='_blank'>Script Comments/Feedback & Updates</a><br><a href='http://www.onemanga.com'>OneManga.com</a></p></div>";
		try{document.getElementById('readinstr').style.display='block';}catch(e){}
	}
	else {
		e= document.createElement('script');
		e.type= "text/javascript";
		var temp= "<br><br><br>";
		
		var temp= "var string='"+str+"'; var btn_str_e2='"+btn_str_e+"'; var btn_str_next5_e2='"+btn_str_next5_e+"'; var run=true; function showall(){if(run){document.getElementById('showall').innerHTML=\"<div align='center' id='all' style='text-align:center; font-size:15px; font-family:Calibri, Arial;'>\"+string+\"<p>\"+unescape(btn_str_e2)+unescape(btn_str_next5_e2)+\"<br><input type='button' onclick='javascript:window.scrollTo(0,0);' value='Back To Top' style='margin-top:5px;' /><br><br></p><p>Project by: <a href='http://www.samliew.com' target='_blank'>Samuel Liew</a> | <a href='http://www.userscripts.org/scripts/show/27618' target='_blank'>Script Comments/Feedback & Updates</a><br><a href='http://www.onemanga.com'>OneManga.com</a></p></div>\";try{document.getElementById('readinstr').style.display='block';}catch(e){}run=false;}}";
		e.innerHTML= temp;
		head.appendChild(e);
	}
}catch(e){}

// ===== Show all images on page load ===== 
try{
	opt[1]= GM_getValue('showAll', false);
	window.autoShowAll= function(){
		if(opt[1]){
			try{ $('showAllLink').click(); }catch(e){}
			document.getElementsByTagName('img')[0].focus();
		}
		// Focus showall button if not auto
		else { $('showAllLink').focus(); }
	}
	autoShowAll();
}catch(e){}

// ===== Disable buttons if start or end of series =====
try {
	var chpSelector = document.getElementById('chpt_sel');
	var inputs = document.getElementsByTagName('input');
	
	if(chpSelector.options.selectedIndex+1 >= chpSelector.options.length)
	{
		for(i=0;i<inputs.length;i++) { if(inputs[i].id=="prevchp") {
			inputs[i].disabled=true;
			inputs[i].value='First Chapter!';
		}}
	}
	else if(chpSelector.options.selectedIndex-1 < 0 && !opt[4]) // Stop if need load last page
	{
		for(i=0;i<inputs.length;i++) { if(inputs[i].id=="nextchp") {
			inputs[i].disabled=true;
			inputs[i].value='Last Chapter!';
		}}
	}
}catch(e){}


} // script works for manga pages only END


// ===== Create GM menu items ===== 
try{
	// Auto Show All
	window.autoShowAll_menu= function(){
		opt[1]= confirm('Enable \"Auto Show All\"?\n\nOK=Yes, Cancel=No');
		GM_setValue('showAll', opt[1]);
		//alert('Auto Show All is now: '+(opt[1]?'ENABLED':'DISABLED'));
		opt[1]?autoShowAll():void(0);
	}
	GM_registerMenuCommand('Auto Show All', autoShowAll_menu);
	
	// [Load 5 Chapters] Button
	window.doNext5Button_menu= function(){
		opt[2]= confirm('Enable \"[Load 5 Chapters] Button\"?\n\nOK=Yes, Cancel=No');
		GM_setValue('next5', opt[2]);
		//alert('[Load 5 Chapters] button is now: '+(opt[2]?'ENABLED':'DISABLED'));
	}
	GM_registerMenuCommand('[Load 5 Chapters] Button', doNext5Button_menu);
	
	// Change Background Colour
	window.changeBGColour_menu= function(){
		opt[3]= confirm('Change Background Colour?\n\nOK=White, Cancel=Black');
		GM_setValue('bgColour', opt[3]);
		//alert('Background Colour is now: '+(opt[3]?'White':'Black'));
	}
	GM_registerMenuCommand('Change Background Colour', changeBGColour_menu);
	
	// Next button jumps to last page first before going to next chapter, if exists
	// http://userscripts.org/topics/48553
	window.loadLastPage_menu= function(){
		opt[4]= confirm('Load last page in chapter?\n\nOK=Yes, Cancel=No');
		GM_setValue('lastPage', opt[4]);
		//alert('Load Last Page is now: '+(opt[4]?'ENABLED':'DISABLED'));
	}
	GM_registerMenuCommand('Load Last Page', loadLastPage_menu);
}catch(e){}

// End