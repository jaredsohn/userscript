// ==UserScript==
// @name           chaturbate
// @version 4.3
// @namespace      chaturbate_goes_droopy
// @description    chaturbate-add free
// @include        http://chaturbate.com/*
// @include        http://*.chaturbate.com/*
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// ==/UserScript==

	version = 4.3;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// removes all advertisements
// inserts a new video box if your banned or blocked
// fullscreen does not work in a protectected room so i made a zoom function
// external links are no longer redirected
// it should be google chrome compatible 
// full suppoter profile , PM , font color etc.
// v3.5 several bug fix (banned rooms) , mute tip sound , remove floating images, zoom in banned room video
// v3.6 better removal of floating images, skip age confirm should now work on chrome too
// v3.7 better removal of add's
// v3.8 add removal at first load, better cleaning of profiles with floating images
// v3.9 No more supporter options, rooms filter options on tab bar
// v4.0 skipped due to comatibility problem
// v4.1 fixed no access room video , improved sub-selection
// v4.2 temp fix
// v4.3 fix auto refresh in no access rooms, tested with firefox (with chrome it may or may not work)
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	createCookie("agreeterms","1",30);
	if (!readCookie("noads")){createCookie("noads","1",30);window.location.reload()}

function do_script() {

// check for updates once per session
	if (!readCookie("updatecheck")){update()}

// use unused add space
	ad = document.getElementsByClassName('ad');
	verstr='<strong>Made add free by Ladroop </strong><br>V '+version;
	if(document.getElementById("player")){verstr=verstr+'<br><label> Mute tip sound: </label><input type="checkbox" id="tipmute">'}
	if (ad[0]){ad[0].innerHTML=verstr}

// advert options on menu bars
	bar=document.getElementById("nav");
	if (bar){
	barl=bar.getElementsByTagName('li');
	i=barl.length-1;
	while (i != -1){
	d=barl[i].innerHTML;
	if ((d.indexOf('/login') != -1)||(d.indexOf('href="/"') != -1)||(d.indexOf('href="/b/') != -1)||(d.indexOf('/my_') != -1)){i--}
	else{barl[i].parentNode.removeChild(barl[i]);i--}
	}}

// blog spam
	ad = document.getElementsByClassName('featured_blog_posts')[0];
	if (ad){ad.parentNode.removeChild(ad)}

// footer spam
	ad = document.getElementsByClassName('featured_text')[0];
	if (ad){ad.parentNode.removeChild(ad)}

// announcement banner (if present)
	ad = document.getElementsByClassName('top-section')[0];
	if (ad){
	ad = ad.getElementsByTagName('img')[0];
	if (ad){ad.parentNode.removeChild(ad)}}

// advanced search
	if((document.location.href.indexOf("spy-on-cams")==-1)&&(document.location.href.indexOf("followed-cams")==-1)){
	if (document.getElementsByClassName('c-1 endless_page_template')[0]){
		if (document.getElementsByClassName('sub-nav')[0]){
		newli=document.createElement('li');
		data='<form><select onchange=\'loc=document.location.href.split("/");pos=loc[0]+"/"+loc[1]+"/"+loc[2]+this.options[this.selectedIndex].value;document.location.href=pos;\' style="margin: 0px 0px 0px 0px; background: #DDE9F5; color:#5E81A4; border-radius: 4px 4px 0px 0px;padding: 5px 11px 2px;">'
		+'<option value="/">--------------SELECT--------------</option>'
		+'<option value="/XX-cams">ALL CAMS IN CATEGORY</option>'
		+'<option value="/exhibitionist-cams/XX">EXHIBITIONIST CAMS</option>'
		+'<option value="/hd-cams/XX">HD CAMS</option>'
		+'<option value="/teen-cams/XX">TEEN CAMS (18+)</option>'
		+'<option value="/18to21-cams/XX">18 TO 21 CAMS</option>'
		+'<option value="/21to35-cams/XX">21 TO 35 CAMS</option>'
		+'<option value="/30to50-cams/XX">30 TO 50 CAMS</option>'
		+'<option value="/mature-cams/XX">MATURE CAMS (50+)</option>'
		+'<option value="/north-american-cams/XX">NORTH AMERICAN CAMS</option>'
		+'<option value="/euro-russian-cams/XX">EURO RUSSIAN CAMS</option>'
		+'<option value="/south-american-cams/XX">SOUTH AMERICAN CAMS</option>'
		+'<option value="/philippines-cams/XX">PHILIPPINES CAMS</option>'
		+'<option value="/asian-cams/XX">ASIAN CAMS</option>'
		+'<option value="/other-region-cams/XX">OTHER REGION CAMS</option>'
		+'<option value="/6-tokens-per-minute-private-cams/XX">6 TOKENS PER MINUTE</option>'
		+'<option value="/12-tokens-per-minute-private-cams/XX">12 TOKENS PER MINUTE</option>'
		+'<option value="/18-tokens-per-minute-private-cams/XX">18 TOKENS PER MINUTE</option>'
		+'<option value="/30-tokens-per-minute-private-cams/XX">30 TOKENS PER MINUTE</option>'
		+'<option value="/60-tokens-per-minute-private-cams/XX">60 TOKENS PER MINUTE</option>'
		+'<option value="/90-tokens-per-minute-private-cams/XX">90 TOKENS PER MINUTE</option>'
		+'</select></form>';
		uloc=document.location.href+"//////";
		loc=uloc.split("/");
		check=loc[3]+loc[4];
		gen="";
		if(check.indexOf("male") != -1){gen="male"}
		if(check.indexOf("female") != -1){gen="female"}
		if(check.indexOf("couple") != -1){gen="couple"}
		if(check.indexOf("transsexual") != -1){gen="transsexual"}
		re=/XX/gi
		data=data.replace(re,gen);
		if (gen == ""){data=data.replace("-cams","")}
		newli.innerHTML=data;
		document.getElementsByClassName('sub-nav')[0].appendChild(newli);
	}}}


// remove out of position images
	container = document.getElementById("tabs_content_container")
	if (container){
	var taglist=new Array("a","p","i","strong","b","u","ul","ol","li","h1","h2","h3","img","font","br");
	for (n=0; n<taglist.length-1; n++){
	blockelm (taglist[n]);
	}}

	function blockelm(tag){
	var image = container.getElementsByTagName(tag);
	for (i=0; i<image.length; i++){
	if (image[i].style.position){
	if ((image[i].style.position.indexOf("absolute")!=-1)||(image[i].style.position.indexOf("fixed")!=-1)){
	image[i].style.display="none"}
	}}}

// remove lock picture from thumb
	pictures = document.getElementsByClassName('preview');
	if (pictures){
	for (i=0; i<pictures.length; i++){
	if(pictures[i].getAttribute("alt") =="Locked"){
	pictures[i].parentNode.removeChild(pictures[i])}}}

// if we are on a player page, mute tip sound if checked, set interval timer
	play=document.getElementById("player");
	if (play){
	scrip=document.createElement('script');
	scriptstring="if(document.getElementById('tipmute')){"
	+"var oldbeep = PlayBeep;PlayBeep = function(text) {if(document.getElementById('tipmute').checked==true){return}else{return oldbeep(text)}}};";
	scrip.innerHTML=scriptstring;
	document.getElementsByTagName('body')[0].appendChild(scrip);

	
// read non-broadcast flash player version, every 5 sec. if not yet read
	if (!readCookie("CBversion")){
	if (document.location.href.split("/")[3]!="b"){
	t=setInterval(function(){version=document.getElementsByTagName('object')[0];
	if (version){createCookie("CBversion",version.getAttribute("data"),1,"chaturbate.com");clearInterval(t)}
	},5000)
	}}
	}

// if you have no access then create a new video box
	area = document.getElementsByClassName('block')[0];
	if (area){
	if (area.innerHTML.length < 600){
	loc=document.location.href.split("/");
	preformer=loc[3];if(preformer=="p"){preformer=loc[4]}
	document.title = preformer+"'s No Access Room";
	makevid (preformer)}}

//fix external links redirection
	var link = document.getElementsByTagName('a');
	for (i=0; i<link.length; i++){
	if (link[i].href.indexOf('?url=') != -1){
	linkhref=unescape(link[i].href);
	newlinkhref=linkhref.substring(linkhref.indexOf("?url=")+5,linkhref.indexOf("&domain"));
	link[i].href=newlinkhref}}

}


// cookie functions
	function createCookie(name,value,days,domain){
	if (domain){
	var domain=";domain=."+domain;
	}else var domain = "";
	if (days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	}else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/"+domain;
	}

	function eraseCookie(name,domain){
	createCookie(name,"",-1,domain);
	}

	function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
	}

// create video box with image
	function makevid(preformer){

// image
	prefimg='<img class="png" width="180" height="148" src="http://cdn-i.highwebmedia.com/roomimage/'+preformer+'.jpg" img style="float:right;margin-right:100px;margin-top:10px;border-width:5px;border-style:double; ">';
	Fversion=readCookie("CBversion")
	if(!Fversion){Fversion="http://ccstatic.highwebmedia.com/static/flash/CBV_2p644.swf"}
	videodata2 = videodata2.replace("ladroop",preformer);
	newvid=document.createElement('div');
	newvid.style.clear="both";
	newvid.innerHTML=prefimg+videodata1+Fversion+videodata2;
	document.getElementsByClassName('block')[0].appendChild(newvid)}


//update check
	function update(){
	metalink = "http://userscripts.org/scripts/source/119247.meta.js";
	scriptlink = "http://userscripts.org/scripts/source/119247.user.js";
	GM_xmlhttpRequest({
	method: 'GET',
	url: metalink,
	onload: function(response) {
	data = response.responseText;
	createCookie("updatecheck","1",1,"chaturbate.com");
	revp = data.indexOf("@version");
	rev = data.substring(revp+9 , revp+12);
	if (rev > version){if (confirm('There is a new version of the chaturbate script available.\n Do you wish to install it ?')){window.open(scriptlink, '_blank')}}}})
	}

// videobox data 
	var servers=new Array("","-a","-b");
	var server = servers[Math.floor(Math.random()*3)];//0-1-2
	var servnr=Math.floor(Math.random()*13)+1;// 1 - 13

	videodata1='<div id ="defchat2" style="float:left;margin-left:10px;margin-top:10px;margin-bottom:10px;border-width:5px;border-style:double;resize:both;overflow:hidden;width: 498px; height: 426px; ">'
	+'<object id="movie2" type="application/x-shockwave-flash" data="';

	videodata2='" style="visibility: visible;margin-top:0px;margin-bottom:0px;width:100%;height:95%">'
	+'<param name="allowScriptAccess" value="always">'
	+'<param name="allowFullScreen" value="true">'
	+'<param name="quality" value="high">'
	+'<param name="wmode" value="opaque">'
	+'<param name="id" value="movie">'
	+'<param name="FlashVars" value="pid=ladroop&address=edge'
	+ servnr+server
	+'.stream.highwebmedia.com&language=/xml/viewer.xml&mute=0&uid=AnonymousUser&dom=chaturbate.com&pw=anonymous">'
	+'</object></div>'

// some cookies

	createCookie("np3","0",1);
	createCookie("dsmn29","1",1);
	createCookie("dsmn30","1",1);
	createCookie("dsmn31","1",1);
	createCookie("dsmn28","1",1);


//----------------------------------------------------------------------------------------------------------------------------------
// executes !everytime! before a script executes
	function do_script2(e) {

	if(e.target.innerHTML.indexOf("window.location.reload()")!= -1){
	if(!e.target.id){

	script=e.target.innerHTML;
	e.preventDefault();
	e.stopPropagation();
	e.target.parentNode.removeChild(e.target);

	scrip=document.createElement('script');
	scrip.id="done";

	script=script.replace("window.location.reload()","return");

	scrip.innerHTML=script;
	document.getElementsByTagName('body')[0].appendChild(scrip);
	}
	}}

window.addEventListener("DOMContentLoaded", function() { do_script() }, false);


window.addEventListener('beforescriptexecute', function(e) {do_script2(e) }, false);

//.user.js