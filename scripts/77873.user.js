// ==UserScript==
// @name          Last.fm Scrobbler
// @description   скроблит песни с ласт.фм
// @include       http://vkontakte.ru/audio.php*
// @include       http://vkontakte.ru/gsearch.php?*section=audio*
// @include       http://vkontakte.ru/id*
// @include       http://vkontakte.ru/club*
// ==/UserScript==


//The Animated Gif files: YOU CAN CHANGE TOU YOUR OWN ============

//NEW:
var scrobble_gif = "http://img517.imageshack.us/img517/9498/iconeqxx0.gif";
var scrobble_padding = "3px 7px 0px 7px";

//OLD:
//var scrobble_gif = "http://www.ajaxload.info/download.php?img=cache/ff/ff/ff/45/68/8e/2-0.gif";
//var scrobble_padding = "0px 7px 0px 7px";

//NEW:
var done_gif = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAK7gAACu4BrzForAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAOZJREFUOE9jYBhywCqxtQuIq8lyOFDjZP+S6f9BGMhuIckQoIaZII2Z/Wv/p3QuhxnShWIIUJEouqlAMWYgng/TDDIgrmXRf59CsCty4OqBHHUgfgKyCSYI1bw0sGwm2GY0zWnImrWAip+HV8+GOW0+kM8JxKtxaE5Gd/qukHKELSBNIAPRNQPF/gBxAkbggfwOxOeDkJwKCii4s5sXgQwEaY7CGfJASSEgPoNsCMzPQPGfQBxCMNqAiviRDYmsnQuyGaTZj6BmpJAHGXIM5BIg/Q2IPYjWjGQID1DjXiB2JVkz3TUAALYovtB4suniAAAAAElFTkSuQmCC" ;
var done_padding = "0px 7px";

//OLD: 
//var done_gif = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAANbY1E9YMgAAAwBQTFRFAAAAX32Ykq7JlbHJm7fOnrfOorrRo7vTo73TqL7VqsDVr8TY2uv+9f//+f///v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2hnoXgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABlSURBVChTjY/hDoAgCIS5IjO17v2f1k5rbfZLNhG+wQFWMVi1MQemgF8kHfDuDRuZc1FM93MVIJtuIZhaIJDbv9Dz2/IAKbTnX8sBhk4NO5miJJQE6WmxqKksfayqpjYdz7P/+TctKgfn7z/oZgAAAABJRU5ErkJggg==";
//var done_padding = "0px 7px";


var loadgif = '<div class="us_loadgif"><img alt="loading" src="http://crosbow.peterpedia.org/lastfm/web_img/progress_active_opt.gif" /></div>';

var CDcover = 'http://img132.imageshack.us/img132/1406/jewelcasemegamy2ne2.png';


//=================================================================

document.onLoad = us_addButton();


function us_refresh()
 {
	us_addCover('','');
	var oldimg =document.getElementById("scrobbling"+GM_getValue('us_mid'))
		if(oldimg){
			oldimg.style.display = "none";
		}
	
	window.setTimeout(function() { us_refresh2() }, 1000);
	}

function us_refresh2()
{
	var parent = document.getElementById("audios");   
        if (!parent) {
	    parent = document.getElementById("bigResult");
        
        }
        
  	if(parent){
	  	var audios = parent.getElementsByTagName("img");
	  	 	  	for (var i=0;i<audios.length;i++) {
		
			   var str = 	audios[i].getAttribute("onclick");
			   if(str) {
		 
			   audios[i].addEventListener('load', us_playstatus, false);
	  		}
		  }
	  }	
	    var pages = document.getElementById('audioBar').getElementsByTagName("li");
    if (pages){
        for (var i=0;i<pages.length;i++) {
		   	   pages[i].childNodes[0].addEventListener('click', us_refresh, false);
			  }
	  }
//	  GM_setValue('us_mid',0);
	   GM_setValue('us_title','');
		  GM_setValue('us_artist',''); 
	us_addCover('');
}

function makeFrame(col){

 

var doc = window.content.document;
var s = doc.getElementById("audioBar");

if(s) {
var bod = doc.getElementById("pageBody");
var user = GM_getValue('user');


bod.style.width = "642px";

s.getElementsByClassName("column mainPanel")[0].style.width = "449px";


var str = '<tr class="lfmHead"><td><a title="userid: Недавно прослушанные композиции" href="http://www.lastfm.ru/user/userid" target="_blank" style="display:block;overflow:hidden;height:20px;width:184px;background:url(http://cdn.last.fm/widgets/images/ru/header/chart/recenttracks_regular_red.png) no-repeat 0 -20px;text-decoration:none;border:0;"></a></td></tr><tr class="lfmEmbed"><td><object type="application/x-shockwave-flash" data="http://cdn.last.fm/widgets/chart/friends_6.swf" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="lfmEmbed_1514814214" width="184" height="199"> <param name="movie" value="http://cdn.last.fm/widgets/chart/friends_6.swf" /> <param name="flashvars" value="type=recenttracks&amp;user=userid&amp;theme=red&amp;lang=ru&amp;widget_id=chart_7" /> <param name="allowScriptAccess" value="always" /> <param name="allowNetworking" value="all" /> <param name="allowFullScreen" value="true" /> <param name="quality" value="high" /> <param name="bgcolor" value="d01f3c" /> <param name="wmode" value="transparent" /> <param name="menu" value="true" /> </object></td></tr>';


str = str.replace(/userid/g, user);


var tbl = doc.getElementById("lastfmcharts");

if (!tbl){

divv = doc.createElement("div");
tbl = doc.createElement("table");
divv.setAttribute("style"," width: 188px; height: 231px; float:right");
tbl.setAttribute("id","lastfmcharts");

divv.appendChild(tbl);
s.appendChild(divv);

}

if(col!="none"){
tbl.innerHTML = str.replace(/red/g, col)

} else {tbl.innerHTML = "" }
//s.getElementById("audios").style ="padding: 5px 28px;");

}
}	

function us_options() {

  
 col = GM_getValue('charts_col');

switch (col)
{
case 1:
  makeFrame("red");
  break;
case 2:
  makeFrame("grey");
  break;
case 3:
  makeFrame("blue");
  break;
case 4:
 makeFrame("black");
  break;
case 5:
  makeFrame("none");    
  col = 0;
  break;
default:
  col = 0;
}

GM_setValue('charts_col',col+1);

  
 //        us_boxcontent('Options: select charts colour',cont);


/*
//document.getElementById('profile_name').href = "http://www.last.fm/user/"+GM_getValue('user');
  
    document.getElementById('us_red').addEventListener('click', makeFrame("red"), false);
    document.getElementById('us_blue').addEventListener('click', makeFrame("blue"), false);
    document.getElementById('us_grey').addEventListener('click', makeFrame("grey"), false);
    document.getElementById('us_black').addEventListener('click', makeFrame("black"), false);
 
*/
}

function us_playstatus(){
 
 	
 
 
   var bla = document.getElementsByTagName('embed')[0];
    if (bla){
    bla.setAttribute('wmode', 'transparent');
  //  bla.style.display = 'block';
	  }
 
 
 
 
 
 
  var glob_mid = GM_getValue('us_mid') ;
 
 
 
 
  if(!glob_mid  && (this.src.indexOf('pause')<0)) {
    	return;
  	}

  var mid;
  
  if(this.id.indexOf('Wall')<0) {
  mid  = this.id.substr(9);	 
  GM_setValue('Wall','');
  	
  }else{
			  	mid  = this.id.substr(9+4)
			  	GM_setValue('Wall','Wall');
    	}
 
  
  if (mid!=  glob_mid ){
  us_addCover('','');	
  var durat = document.getElementById('audio'+GM_getValue('Wall')+mid).getElementsByTagName("div")[1].innerHTML.replace(/<[^>]+>/g,"");
  var duratnum = parseInt(durat.split(':')[0])*60+parseInt(durat.split(':')[1]);
	var oldimg =document.getElementById("scrobbling"+glob_mid)
		if(oldimg){
			oldimg.style.display = "none";
		}
	
	if (duratnum > 30){
	  
	  us_changeOpac(100,'us_scrobblebutton');
	
		GM_setValue('secs',duratnum);		
  
 
  
  	var time = new Date();
  	var t = Math.round(time.getTime()/1000);
  	var m = time.getUTCMonth()+1;
  	var d = time.getUTCDate();
  	if (m.toString().length == 1) {
   	  m='0'+m;
  	}
  	if (d.toString().length == 1) {
   	  d='0'+d;
  	}
  	GM_setValue('playstart_s',t);
 	  GM_setValue('playstart',time.getUTCFullYear()+'%2d'+m+'%2d'+d+'%20'+time.getUTCHours()+'%3a'+time.getUTCMinutes()+'%3a'+time.getUTCSeconds());
	  GM_setValue('us_mid',mid);		 
    us_showBox();
   // window.setTimeout(function() {
    	var d = document.getElementById('us_submit'); if (d){ d.click(); } 
   // 	}, 10);
    } else {
	 		us_changeOpac(50,'us_scrobblebutton');
		
		  GM_setValue('us_title','');
		  GM_setValue('us_artist',''); 
		  GM_setValue('us_mid',0);
  	}
  }
  else { 
  	/*
  	 var bla = document.getElementsByTagName('embed')[0];
    if (bla){
    bla.setAttribute('wmode', 'transparent');
    bla.style.display = 'inline';
	  }
    alert('!');
  	*/
  	}
}



//GM_setValue('secs',0);

// Add the Button 
function us_addButton() {
/*	
		var parent = document.getElementById("audios");   
        if (!parent) {
	    parent = document.getElementById("bigResult");
          } 
  */        
    parent = document.getElementById("content");
    
    if(parent){
	  	var audios = parent.getElementsByTagName("img");
	    	  	for (var i=0;i<audios.length;i++) {
			   if(audios[i].id.toString().indexOf("imgb")>=0) {
		 
			    audios[i].addEventListener('load', us_playstatus, false);
	  		}
		  }
	  }
	  
	  	

		var secs = 70;
    GM_setValue('us_mid',0);
    GM_setValue('secs',secs);
  //  GM_getValue('charts_col');

    var el = document.createElement("style");
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(el);
    el.innerHTML = // '.us_box { -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 5px solid #333; background: #fff;'+
             //      'z-index:1000000; position: fixed; left: 75%; top: 50%; width: 300px; margin-left: -150px; }'+
                   '.us_box h3 { padding: 4px 8px 4px 10px; margin: 0px; border-bottom: 1px solid #AAA }'+
                   '#us_box_close { background-image: url(data:image/gif;base64,R0lGODlhDQANALMPAKurq7S0tOzs7MrKytfX14qKir6%2BvqWlpf7%2B%2Fnt7e5OTk56enpmZmYWFhYCAgP%2F%2F%2FyH5BAEAAA8ALAAAAAANAA0AAARd8EkxTDBDSIlI%2BGBAIBIBAMeJnsQjnEugMEqwnNRxGF0xGroBYEEcCTrEG2OpKBwFhdlyoWgae9VYoRDojQDbgKBBDhTIAHJDE3C43%2B8Ax5Co2xO8jevQSDQOGhIRADs%3D); width: 13px; height: 13px; float: right; margin-top: -15px; }'+
                   '#us_box_help { background-image: url(data:image/gif;base64,R0lGODlhDQANAKIAALKysomJisfHx%2F%2F%2F%2F5WWlujo6H5%2BfqOjoyH5BAAAAAAALAAAAAANAA0AAANCOFoi0EXJAqoFUbnDexUD1UWFx3QNkXJCRxBBkBLc%2B8ZMYNN37Os0wA8wEPowvySuaGg6nUQF4AmVLA4BQ%2BCQGSQAADs%3D); width: 13px; height: 13px; float: right; margin: -15px 15px 0 0; }'+
                   '#us_loginbox_form { text-align: right; padding: 10px; }'+
                   '.us_box input[type=text], input[type=password] { height: 15px; border: 1px solid #bbb; margin: 2px; padding: 3px 0 4px 0; width: 180px; }'+
                   '.us_box input[type=submit] { margin: 0 0 0 5px; padding: 0 4px 3px 4px; -moz-border-radius: 2px; -webkit-border-radius: 2px; font-size: 11px; font-weight: bold; color: white; height: 17px; border: 1px solid #3e3e3e; background-image: url(data:image/gif;base64,R0lGODlhAQAQAKIAAH5%2BflRUVFxcXGNjY2tra3Nzc3p6eoKCgiH5BAAAAAAALAAAAAABABAAAAMKeAdmVYSMIUS4CQA7); }'+
                   '.hidden { visibility: hidden; overflow: hidden; height: 0px; }'+
                   '#us_hiddenform { margin: 0; }'+
                   '.us_loadgif { text-align: center; padding: 10px 0; }'+
                   '.us_loadgif img { -moz-border-radius: 5px; -webkit-border-radius: 5px; border:3px solid #91998E; }'+
                   '#us_more { font: normal normal bold 12pt/12pt Arial; color: #999; text-decoration: none; margin-right: 3px; }'+
                   '.us_submitbuttons { background-color: #EEE; border-top: 1px solid #AAA; padding: 5px; width: 290px; margin-left: -10px; margin-bottom: -10px; margin-top: 5px; }'+
                   '.us_error { background-color: #F6D8D8; border: 1px solid #f28494; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
                   '.us_done { background-color: #CCFF99; border: 1px solid #99CC00; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
                   '.us_infobox { z-index:1000000; background-color: #EEE; -moz-border-radius: 5px; -webkit-border-radius: 5px; top: 5px; padding: 10px; position: fixed; left: 5px; border: 1px solid #666; font-size: 8pt; }'+
                   '.us_infobox div { margin: 1px 5px 0 0; float: left; }'+
                   '.us_box .us_center { padding: 10px; text-align: center; }'+
                   '.red  {background: #D51007 url(http://cdn.last.fm/widgets/config/choice_red.gif) no-repeat scroll left top; width:70px} '+
                   '.blue  {background:#6598CD url(http://cdn.last.fm/widgets/config/choice_blue.gif) no-repeat scroll left top; width:70px}'+    
    							 '.black  {background:#000000 url(http://cdn.last.fm/widgets/config/choice_black.gif) no-repeat scroll left top; width:70px}'+
									 '.grey  {background:#999999 url(http://cdn.last.fm/widgets/config/choice_grey.gif) no-repeat scroll left top; width:70px}'+
   								 '.colourChoice {float:left; margin:0 0px 0 0; padding:0; width:250px; background:#000000}'	; 
    if(window.location.toString().indexOf('audio')>0) 
    {  el.innerHTML = '.us_box { -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 5px solid #333; background: #fff;' +
                   'z-index:1000000; position: fixed; left: 21%; top: 50%; width: 300px; margin-left: -150px; }' +
                   el.innerHTML;
    	
    	}else {
    		el.innerHTML = '.us_box { -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 5px solid #333; background: #fff;' +
                   'z-index:1000000; position: fixed; left: 35%; top: 30%; width: 300px; margin-left: -150px; }' +
                   el.innerHTML;
    	}
    
    var ii;
    if(document.getElementById('audioBar')){ ii = document.getElementById('bigSummary');}       
    else if(window.location.toString().indexOf('audio')>0) 
    {//ii =  document.getElementById('wrapHI');
   	ii =  document.getElementsByClassName('summaryBar')[0];
   // ii.style.height = '22px';
  //  ii..style.padding = '10px 10px';
    	}
  
    
    var button = createIdElement("a","us_scrobblebutton");
    var classatr = document.createAttribute("class");
 //   classatr.nodeValue = 'yt-dropdown yt-dropdown-urgent';
 //   button.setAttributeNode(classatr);
    button.style.cssFloat = 'right';
//  button.style.margin = '2px 0px 7px';
    button.style.padding = '0px 20px 5px 0px';
    button.innerHTML =  '<span>' + // class="yt-dropdown-btn yt-button yt-button-urgent">'+
                       '<span><img src="data:image/gif;base64,R0lGODlhEAAQAKIAAPNHLdYzINJbTN2rp%2FHSztCBerIRC%2Ff39yH5BAAAAAAALAAAAAAQABAAAANQSAXczoW8Sau9LwShA9AC52nFYR6ccKLgMWxmMBxwoc2dWsy2YQSGmc93IAQIppdPOMT9SgOfKioLFIHWqK9kIhhUK%2BDwN%2F5pyui0eq1dNxMAOw%3D%3D" alt="audioscrobbler.com" /></span>'+
                       '<span> </span>'+
                      '</span>';

    button.firstChild.firstChild.firstChild.style.height = '16px';
    button.firstChild.firstChild.firstChild.style.width = '16px';
    button.firstChild.firstChild.firstChild.style.marginTop = '4px';
   if(ii) {	ii.appendChild(button)
    document.getElementById('us_scrobblebutton').addEventListener('click', us_showBox, false);
  };
   var ab = document.getElementById('audioBar');
    if (ab){
    	  pages = ab.getElementsByTagName("li");
        for (var i=0;i<pages.length;i++) {
		   	   pages[i].childNodes[0].addEventListener('click', us_refresh, false);
			  }
	  }
//  GM_setValue('charts_col','');
    us_handshake_old();
    if  (GM_getValue('user')&&(document.getElementById("audioBar"))) {
    	if( GM_getValue('charts_col')){
    	GM_setValue('charts_col',GM_getValue('charts_col')-1); 
    	
      }else {GM_setValue('charts_col',1)}
    	us_options();
    	}
}

// Show dialog window
// Contains either login form, or scrobble form
function us_showBox() {
/*
	  var bla = document.getElementsByTagName('embed')[0];
    if (bla){
    bla.setAttribute('wmode', 'transparent');
    bla.style.display = 'block';
	  }
  */
   if (!document.getElementById('us_loginbox')) {
      var loginbox = createIdElement("div","us_loginbox");
      var classatr = document.createAttribute("class");
      classatr.nodeValue = 'us_box';
      loginbox.setAttributeNode(classatr);
      loginbox.style.opacity = 0;
      loginbox.style.MozOpacity = 0;
      loginbox.style.KhtmlOpacity = 0;
      loginbox.style.filter = "alpha(opacity=0)";
      document.body.insertBefore(loginbox, document.body.firstChild);
      opacity(loginbox.id, 0, 100, 500);
   }
   else if (document.getElementById('us_loginbox').style.display == 'none') {
      var loginbox = document.getElementById('us_loginbox');
      loginbox.style.display = "block";
      opacity(loginbox.id, 0, 100, 500);
   }
   if (!GM_getValue('user') || !GM_getValue('pass')) {
      
      var cont = '<div id="us_loginbox_form"><form name="us_loginform" onSubmit="return'+
      ' false"><span>Username: <input type="text" name="user" /></span><br />'+
      '<span>Password: <input type="password" name="pass" /></span><br /><div class="us_submitbuttons"><input id="us_submit" value="Login" type="submit" /></div></form></div>';
      us_boxcontent('Login to last.fm',cont);

      document.getElementById('us_submit').addEventListener('click', us_setlogin, false);

   }
   else {
      us_scrobbleform();
   }
}

//little box to notify scrobble status
function us_infoBox(cont) {
   if (!document.getElementById('us_infobox')) {
      var inbox = createIdElement("div","us_infobox");
      var classatr = document.createAttribute("class");
      classatr.nodeValue = 'us_infobox';
      inbox.setAttributeNode(classatr);
      inbox.style.opacity = 0;
      inbox.style.MozOpacity = 0;
      inbox.style.KhtmlOpacity = 0;
      inbox.style.filter = "alpha(opacity=0)";
      document.body.insertBefore(inbox, document.body.firstChild);
      opacity(inbox.id, 0, 100, 500);
   }
   else { //if (document.getElementById('us_infobox').style.display == 'none') {
      var inbox = document.getElementById('us_infobox');
      inbox.style.display = "block";
      opacity(inbox.id, 0, 100, 500);
   }
   inbox.innerHTML = cont;
}


// Creates a <type id="id">
function createIdElement(type, id) {
   var el = document.createElement(type);
   var idatr = document.createAttribute("id");
   idatr.nodeValue = id;
   el.setAttributeNode(idatr);
   return el;
}

// Save the login info (password only hashed ofcourse :)
function us_setlogin() {
  var i = document.getElementsByName("us_loginform")[0].elements;
  i[0].style.background = "";
  i[1].style.background = "";
  var user = i[0].value;
  var pass = i[1].value;
  if (user && pass) {
     GM_setValue('user',user);
     GM_setValue('pass',MD5(pass));
     us_handshake_old(0);
  		if  (document.getElementById("audioBar")) {
    	if( GM_getValue('charts_col')){
    	GM_setValue('charts_col',GM_getValue('charts_col')-1); 
    	
      }else {GM_setValue('charts_col',1)}
    	us_options();
    	}
  }
  else {
     if (!user) {i[0].style.background = "#F6D8D8";}
     if (!pass) {i[1].style.background = "#F6D8D8";}
  }
}

//closes the box with fadeout effect
function us_closebox() {
   opacity('us_loginbox', 100, 0, 500);
   window.setTimeout(function() { document.getElementById('us_loginbox').style.display = "none" }, 500);
}

//handshake with audioscrobbler servers protocol version 1.1
function us_handshake_old(qeued) {
    var time = new Date();
    var t = Math.round(time.getTime()/1000);

    if (qeued == 0) { us_boxcontent('Logging in...',loadgif); }
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://post.audioscrobbler.com/?hs=true&p=1.1&c=vkf&v=1.0&u='+GM_getValue('user'), //+'&t='+t+'&a='+MD5(GM_getValue('pass') + t),
    headers: {
        'Host': 'post.audioscrobbler.com',
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var loginbox = document.getElementById('us_loginbox');
        if (responseDetails.statusText == 'OK') {
           var res = responseDetails.responseText.split('\n');
           if (res[0] == 'UPTODATE') {
               GM_setValue('sid',res[1]);
               GM_setValue('suburl',res[2]);
               GM_setValue('interval',res[3].split(" ")[1]);
               if (qeued == 0) { us_scrobbleform(); }
           }
           else if (res[0] == 'BADUSER') {
               us_resetlogin('Username was not found.');
           }
           else {
                us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
           }
        }
        else {
             us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
        }
        /*alert(responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'data:\n' + responseDetails.responseText);*/
    }
});
}

function us_get_trackinfo(artist,track) {

   	var requesturl = 'http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=1a6b6d0fee9e87f61fa7d0af7f09388c&artist='+artist+'&track='+track;
   // alert(requesturl);
    GM_xmlhttpRequest({
    method: 'GET',
    url: requesturl,
    headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        
 
        if (responseDetails.statusText == 'OK') {
           var parser = new DOMParser();
	         var dom = parser.parseFromString(responseDetails.responseText,
	            "application/xml");
					 var entries = dom.getElementsByTagName('image');
			  	 var alb= dom.getElementsByTagName('album');
			  	if (entries[2]) {
			  		
			  		var alburl = alb[0].getElementsByTagName('url')[0].textContent
          	
          	us_addCover(entries[2].textContent,alburl);
     //    		alert(alburl);
          } else {
          	us_addCover('');
          	
          	}
        }
        else {
        us_addCover('');
       	}
   /*
     alert(responseDetails.status +
              ' SSSSSSSSSSSSSSSS ' + responseDetails.statusText + '\n\n' +
              'data:\n' + responseDetails.responseText);
   
   */
    }
});
}


function us_addCover(cover,alburl){
	
var doc = window.content.document;
var s = doc.getElementById("audioBar");
if (s) {
var bod = doc.getElementById("pageBody");
//doc.getElementById("pageBody").style.width

//bod.style.width = "650px";

//s.getElementsByClassName("column mainPanel")[0].style.width = "449px";


var img = doc.getElementById("CoverArt");
//alert('start!');
if (!img){

divv = doc.createElement("div");
divv.setAttribute("style"," width: 186px; height: 176px; float:right;"); // margin:0 0 0 215px;
divv.setAttribute("id","CoverArt div")


span1 = doc.createElement("span");
span1.setAttribute("style"," width: 186px; height: 176px; display:block; position:absolute;");
//183px × 174px

//span2 = doc.createElement("span");
//span2.setAttribute("style"," width: 161px; height: 170px; left:12px; top:2px; overflow:hidden;");

span3 = doc.createElement("span");
span3.setAttribute("style"," width: 186px; height: 176px; left:0px; background-image:url("+CDcover+"); background-position:left top; background-repeat:no-repeat; display:block;");

img = doc.createElement("img");
img.setAttribute("id","CoverArt");
img.setAttribute("style"," width: 167px; top:5px; left:14px; display:block;  position:absolute;");
img.setAttribute("onclick","window.open('" +alburl+"');");


span3.appendChild(img);
//span1.appendChild(span2);
span1.appendChild(span3);

divv.appendChild(span1);
s.appendChild(divv);
//alert('cover!');	
	
} 
if (cover == '') {
	doc.getElementById("CoverArt div").style.display = "none";
	}
	else {
		doc.getElementById("CoverArt div").style.display = "block";
		img.setAttribute("onclick","window.open('" +alburl+"');");
		}
img.src = cover;

}
}

//scrobbles the track
function us_scrobble_old(artist,track,album,mbid,retry,queued) {
	 
	  if	((GM_getValue('us_title') != track)||(GM_getValue('us_artist') != artist) ) {
	//		alert(GM_getValue('us_title'));
	  	return};
    var time = new Date();
    var t = Math.round(time.getTime()/100); //now in ctime
    var s = parseInt(GM_getValue('secs'));   //length of song
    var songend = parseInt(GM_getValue('playstart_s'))+s; //end of the song in ctime
    var left = songend-t;                    //seconds left to play
    var n = t-parseInt(GM_getValue('playstart_s')); // seconds played
    if (parseInt(GM_getValue('secs'))-left < s/2) {
       //alert('lenght: '+s+'\nhalf: '+s/2+'\nnow: '+n+'\nleft: '+left+'\nscrobble in: '+(s/2-n));
       window.setTimeout(function() { us_scrobble_old(artist,track,album,mbid,0,1) }, (s/2-n+1)*1000);
       us_boxcontent('Queued...','<div class="us_done">This will be scrobbled in '+(s/2-n+1)+' seconds.</div>');
       window.setTimeout(function() { us_closebox() }, 2000);
    	 us_get_trackinfo(artist,track);
    }
    else {
         if (queued != 1) {
            us_boxcontent('Scrobbling...',loadgif);
         }

         var md5resp = MD5(GM_getValue('pass')+GM_getValue('sid'));
    
         var poststring = 'u='+GM_getValue('user')+'&s='+md5resp+'&a[0]='+encodeURI(artist)+'&t[0]='+encodeURI(track)+'&b[0]='+encodeURI(album)+'&m[0]='+mbid+'&l[0]='+GM_getValue('secs')+'&i[0]='+GM_getValue('playstart');
         GM_xmlhttpRequest({
         method: 'POST',
         url: GM_getValue('suburl'),
         headers: {
                  //'Host': 'post.audioscrobbler.com',
                  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                  'Accept': 'application/atom+xml,application/xml,text/xml',
                  'Content-Length': poststring.length,
                  'Content-Type': 'application/x-www-form-urlencoded'
         },
         data: poststring,
         onload: function(responseDetails) {
                 var loginbox = document.getElementById('us_loginbox');
                 //alert(responseDetails.responseText);
                 if (responseDetails.statusText == 'OK' && responseDetails.responseText.split('\n')[0] == 'OK') {
                    GM_setValue('interval',responseDetails.responseText.split('\n')[1].split(" ")[1]);
                    if (queued != 1) {
                       us_boxcontent('OK!','<div class="us_done">'+track+' by '+artist+' scrobbled.</div>');
                       window.setTimeout(function() { us_closebox() }, 2000);
                        var img =  document.getElementById("scrobbling"+GM_getValue('us_mid')); 
                  			if(img){ img.src = done_gif; 
                  				       img.alt = "Successfuly scrobbled to Last.fm!"; 
                  				       img.style.padding = done_padding	};
             					 
                    }
                    else {
                       
                       var img =  document.getElementById("scrobbling"+GM_getValue('us_mid')); 
                  			if(img){ img.src = done_gif; 
                  				       img.alt = "Successfuly scrobbled to Last.fm!"; 
                  				       img.style.padding = done_padding	};
             					 us_infoBox('<div>'+track+' by '+artist+' scrobbled. <img src="data:image/gif;base64,R0lGODlhEAAQAKIAAO7w7qrZnHXGZnC6WJLJhE%2BpODGCLbrfsyH5BAAAAAAALAAAAAAQABAAAANhCLrcHmKUEZw6g4YtT8PEERBEcBCFtwyh4L5nsQTD8cLCURCKducKkgxQgACBAIIgYFAUXQ3CYNkkjgS8YIZUpdlYyQxlt9jRxBla9WLIKVlq1eJgMI8KBnnUwDdkLYAMCQA7" alt="done" /></div>');
                       window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 3000);                     
                   
                    }
                 }
                 else if (responseDetails.responseText.split('\n')[0] == 'BADAUTH') {
                      if (retry != 1) {
                         var bla_blubb_queue = 0;
                         if (queued == 1) { bla_blubb_queue = 1; }
                         us_handshake_old(bla_blubb_queue);
                         window.setTimeout(function() { us_scrobble_old(artist,track,album,mbid,1,queued); }, 1000);
                      }
                      else {
                           if (queued != 1) {
                              us_resetlogin('wrong password.');
                           }
                           else {
                           var img =  document.getElementById("scrobbling"+GM_getValue('us_mid')); 
                           if(img){img.src ="_blank";
                           	      ;	img.alt = "Error"	; img.style.display = "none";};
                                us_infoBox('<div class="us_error">Error: Authentification failed.<br />check password or try again later.</div>');
                                window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 3000);
                           
                           }
                      }
                 }
                 else {
                      if (queued != 1) {
                         us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
                      }
                      else {
                         us_infoBox('<div class="us_error">Error: '+responseDetails.responseText+'</div>');
                         window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 2000);
                      }
                 }
               // alert(responseDetails.responseText);
                 }
         });
    }
}

//artifact of protocol 1.2 ;) (which didnt work, and is actually not needed..) his leftovers get form data
function us_scrobblenp(retry) {
    var artist = document.forms[0].elements[0].value;
    var track = document.forms[0].elements[1].value;
    var album = document.forms[0].elements[2].value;
   
    if (!album) { var album = ''; }
    var mbid = document.forms[0].elements[3].value;
    if (!mbid) { var mbid = ''; }
 
 
 //=my=  
    GM_setValue('us_title',track);
		GM_setValue('us_artist',artist); 
    
    var mid =	GM_getValue('us_mid');
    
    var play = document.getElementById("performer"+ GM_getValue('Wall')+mid);
    
    var img = document.getElementById("scrobbling"+mid);
		if(!img){
		img = document.createElement("img");
		img.setAttribute("id","scrobbling"+mid);
		img.setAttribute("src", scrobble_gif ); 
//		play.parentNode.parentNode.insertBefore(img,play.parentNode.nextSibling.nextSibling.nextSibling);
  	img.style.cssFloat = "right";
  	img.style.padding = scrobble_padding;
    img.alt = "Scrobbling...";
    play.parentNode.parentNode.appendChild(img);

    } else {
    	img.src = scrobble_gif; 
    	img.style.display = "inline";
    	img.style.padding = scrobble_padding;
      img.alt = "Scrobbling...";
}
    
    us_scrobble_old(artist,track,album,mbid);

}

// Unset the saved login info + show login form, and maybe show errors
function us_resetlogin(error) {
  GM_setValue('user','');
  GM_setValue('pass','');
  var cont = '';
  if (error != '[object XPCNativeWrapper [object MouseEvent]]') { cont = '<p class="us_error">Error: '+error+'</p>'; }
  cont = cont+'<div id="us_loginbox_form"><form name="us_loginform" onSubmit="return'+
      ' false"><span>Username: <input type="text" name="user" /></span><br />'+
      '<span>Password: <input type="password" name="pass" /></span><br /><div class="us_submitbuttons"><input id="us_submit" value="Login" type="submit" /></div></form></div>';
  us_boxcontent('Login to last.fm',cont);
  var i = document.getElementsByName("us_loginform")[0].elements;
  i[0].style.background = "#F6D8D8";
  i[1].style.background = "#F6D8D8";
  document.getElementById('us_submit').addEventListener('click', us_setlogin, false);
}

//inserts the scrobbleform into the window
function us_scrobbleform() {
    var loginbox = document.getElementById('us_loginbox');
 
	
  var mid =	GM_getValue('us_mid');

  if (mid > 0){ 
	  var span = document.getElementById("title"+GM_getValue('Wall')+mid);
    var musicdata=span.innerHTML.replace(/<[^>]+>/g,"");
    var artb=document.getElementById("performer"+GM_getValue('Wall')+mid);
    var musicdata_artist=artb.innerHTML.replace(/<[^>]+>/g,"");    
		
		GM_setValue('us_title',musicdata);
		GM_setValue('us_artist',musicdata_artist); 
    
		
    var cont = '<div id="us_loginbox_form"><form name="us_scrobbleform" onSubmit="return'+
                         ' false">Artist: <input type="text" name="artist" value="'+musicdata_artist+'" /><br />' +
                         'Track: <input type="text" name="track" value="'+musicdata+'" /><br /><a href="#" id="us_more" title="more options">+</a>'+
                         '<p id="us_hiddenform" class="hidden">Album: <input type="text" name="album" value="" /><br />'+
                         '<a href="http://musicbrainz.org/doc/MusicBrainzIdentifier" title="MusicBrainz Track ID">MBID</a>: <input type="text" name="MBID" value="" /></p>'+
                        // ''+
                         '<div class="us_submitbuttons"><input id="us_options" value="Charts Colour" type="submit"/><input id="us_submit" value="Scrobble" type="submit" /><input type="submit" id="us_resetlogin" value="reset login" /></div></form></div>';
  //  var us_href = "http://www.lastfm.ru/user/" + GM_getValue("user");
    us_boxcontent('Scrobble to last.fm - <a href= "http://www.last.fm/"  id="profile_name" target="_blank">'+GM_getValue('user')+'</a>',cont);
		document.getElementById('profile_name').href = "http://www.last.fm/user/"+GM_getValue('user');
    document.getElementById('us_resetlogin').addEventListener('click', us_resetlogin, false);
    document.getElementById('us_submit').addEventListener('click', us_scrobblenp, false);
    document.getElementById('us_more').addEventListener('click', us_showmoreform, false);
    document.getElementById('us_options').addEventListener('click', us_options, false);
   
    }
    else{
    	var cont = 
              	'<div class="us_done">  Please, press PLAY on any track,to start Scrobbling. </div>'+
    	          '<div id="us_loginbox_form"><form name="us_scrobbleform" onSubmit="return '+
    	          'false" /><div class="us_submitbuttons"><input id="us_options" value="Charts Colour" type="submit"/><input id="us_OK" value="OK" type="submit" /><input type="submit" id="us_resetlogin" value="reset login" /></div></form></div>';

    	    	us_boxcontent('Select your music!',cont);
    	    	
    	    	document.getElementById('us_resetlogin').addEventListener('click', us_resetlogin, false);
           document.getElementById('us_OK').addEventListener('click', us_closebox, false);
   				document.getElementById('us_options').addEventListener('click', us_options, false);
    	}
    	
}

//shows the optional datafiels
function us_showmoreform() {
    var i1 = document.getElementById('us_hiddenform');
    var a = document.getElementById('us_more');
    
    if (i1.getAttribute('class')) {
       i1.setAttribute('class','');
       a.innerHTML = '&#8722;';
    }
    else {
       i1.setAttribute('class','hidden');
       a.innerHTML = '+';
    }
}

//fills the window with content and title
function us_boxcontent(title,content) {
         var loginbox = document.getElementById('us_loginbox');
         if (loginbox.style.display == 'none') {
            loginbox.style.display = "block";
            opacity(loginbox.id, 0, 100, 500);
         }
         var loginbox = document.getElementById('us_loginbox');
         if (!loginbox) { return false; }
         loginbox.innerHTML = '<h3>'+title+'<a href="#" id="us_box_help"></a><a href="#" id="us_box_close"></a></h3>'+
         '<div>'+content+'</div>';
         document.getElementById('us_box_close').addEventListener('click', us_closebox, false);
         document.getElementById('us_box_help').addEventListener('click', us_help, false);
}

//show the help
function us_help() {
         var cont = '<p class="us_center">powered by:<br /><a href="http://www.audioscrobbler.net" target="_blank"><img src="http://crosbow.peterpedia.org/lastfm/web_img/badge_black_rev.gif" '+
         'alt="audioscrobbler.net" /></a><br /><br /><a href="http://www.last.fm" target="_blank"><img src="http://crosbow.peterpedia.org/lastfm/web_img/badge_red_rev.gif" '+
         'alt="last.fm" /></a><br /><br />Visit <a href="http://userscripts.org/scripts/show/" title="userscripts page" target="_blank">this page</a> for some more information.</p>';
         us_boxcontent('Help',cont);
}
/*
 *  Third party functions
 */

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
                return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
                var lX4,lY4,lX8,lY8,lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                } else {
                        return (lResult ^ lX8 ^ lY8);
                }
         }

         function F(x,y,z) { return (x & y) | ((~x) & z); }
         function G(x,y,z) { return (x & z) | (y & (~z)); }
         function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }

        function FF(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1=lMessageLength + 8;
                var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                var lWordArray=Array(lNumberOfWords-1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while ( lByteCount < lMessageLength ) {
                        lWordCount = (lByteCount-(lByteCount % 4))/4;
                        lBytePosition = (lByteCount % 4)*8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                        lByteCount++;
                }
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                return lWordArray;
        };

        function WordToHex(lValue) {
                var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                for (lCount = 0;lCount<=3;lCount++) {
                        lByte = (lValue>>>(lCount*8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                }
                return WordToHexValue;
        };

        function Utf8Encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }
                        else if((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);

                        }

                }

                return utftext;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
                AA=a; BB=b; CC=c; DD=d;
                a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
                b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
                b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
                a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
                d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
                d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
                c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
                b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
                a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
                c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                d=GG(d,a,b,c,x[k+10],S22,0x2441453);
                c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
                c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
                a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                a=II(a,b,c,d,x[k+0], S41,0xF4292244);
                d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
                c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
                a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
                d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
                a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                c=II(c,d,a,b,x[k+6], S43,0xA3014314);

                b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
                d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
                a=AddUnsigned(a,AA);
                b=AddUnsigned(b,BB);
                c=AddUnsigned(c,CC);
                d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
}

//change the opacity for different browsers
function us_changeOpac(opacity, id) {
         var object = document.getElementById(id);
         if (object){
         object.style.opacity = (opacity / 100);
         object.style.MozOpacity = (opacity / 100);
         object.style.KhtmlOpacity = (opacity / 100);
         object.style.filter = "alpha(opacity=" + opacity + ")";
	}
}
window.us_changeOpac = function(opacity, id) {
         var object = document.getElementById(id).style;
         object.opacity = (opacity / 100);
         object.MozOpacity = (opacity / 100);
         object.KhtmlOpacity = (opacity / 100);
         object.filter = "alpha(opacity=" + opacity + ")";
}

function opacity(id, opacStart, opacEnd, millisec) {
         //speed for each frame
         var speed = Math.round(millisec / 100);
         var timer = 0;

         //determine the direction for the blending, if start and end are the same nothing happens
         if(opacStart > opacEnd) {
              for(i = opacStart; i >= opacEnd; i--) {
                    window.setTimeout(function() { var object = document.getElementById(id).style; object.opacity = (i / 100); object.MozOpacity = (i / 100); object.KhtmlOpacity = (i / 100); object.filter = "alpha(opacity=" + i + ")"; },(timer * speed));
                    timer++;

               }
         }
         else if(opacStart < opacEnd) {
              for(i = opacStart; i <= opacEnd; i++) {
                    window.setTimeout(function() { var object = document.getElementById(id).style;
                                                  object.opacity = (i / 100);
                                                  object.MozOpacity = (i / 100);
                                                  object.KhtmlOpacity = (i / 100);
                                                  object.filter = "alpha(opacity=" + i + ")"; },(timer * speed));
                    timer++;
              }
         }
}