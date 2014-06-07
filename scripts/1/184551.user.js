// ==UserScript==
// @name           my-chaturbate
// @version 0.1
// @namespace      chaturbate_clean
// @description    Totally clean video
// @include        http://chaturbate.com/*
// @include        http://*.chaturbate.com/*
// @grant          GM_xmlhttpRequest
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require  http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// ==/UserScript==

version = 3.7;

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
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

createCookie("agreeterms","1",1);
createCookie("noads","1",1);

var x_pos = 0;
var y_pos = 0;
var popup_width = parseInt($.cookie('clean-chaturbate-width'));
var popup_height = parseInt($.cookie('clean-chaturbate-height'));
if(popup_width == undefined) popup_width = 500;
if(popup_height == undefined) popup_height = 400;

$(function(){
  if ($('title').text().match(/^Chat with/) != null) makePageClean();
  else setAsList();
})


function setAsList(){
  var plugin_options_form = '<div id="clean-chaturbate-options"><input type="text" id="popup_width" size="4" value="' + popup_width + '"><input type="text" id="popup_height" size="4" value="' + popup_height + '">';
  $('#header .ad').append(plugin_options_form);
  $('#popup_width').live('change', function() {
    popup_width = parseInt($(this).val());
    $.cookie('clean-chaturbate-width', popup_width);
  });
  $('#popup_height').live('change', function() {
    popup_height = parseInt($(this).val());
    $.cookie('clean-chaturbate-height', popup_height);
  });
  var linkSelector = '.details .title a';
  $(linkSelector).live('click', function() {
    var params = "menubar=no,location=no,resizable=yes,scrollbars=no,status=no,width="+popup_width+",height="+popup_height+",toolbar=no,directories=no,top="+y_pos+",left="+x_pos;
    window.open($(this).attr('href'), $(this).text(), params);
    x_pos = x_pos + popup_width;
    if(x_pos > window.screen.width){
      y_pos = y_pos + popup_height;
      x_pos = 0;
    }
    if(y_pos + popup_height > window.screen.height) y_pos = 0;
    return false;
  });
  $('.genderm').parent().parent().parent().hide();
  $('.genders').parent().parent().parent().hide();
  $('.details .subject').hide();
  $('.details .sub-info').hide();
};

function makePageClean() {
  var to_hide = '.footer-holder;#header;.top-section;.banner;h1;form;.info-user;.dismissable_notice;.chat-holder;.title;.tip_shell;.recorded'.split(';');
  $.each(to_hide, function(i, selector){ $(selector).hide() });
  $('.content .c-1').css({'margin': 0, 'pagging': 0});
  $('.block').css({'padding': 0});
  $('.content').css({'padding': 0});
  $('.section').css({'height': '100%', 'margin': 0});
  $('body').css({
    'min-width': 0,
    'width': '100%',
    'height': '100%',
    'min-height': 0,
    'margin': 0,
    'padding': 0
  })
  // $('#player').removeAttr('style');
  $('#player').css({
    'width': (popup_width-2) + 'px',
    'height': (popup_height) + 'px'
  });
  $('.video-box').removeAttr('style');
  // $('#movie').width(popup_width-2);
  // $('#movie').height(popup_height+26);
  window.scrollTo(0, 0);
};


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

// remove out of position images
var image = document.getElementsByTagName('img');
for (i=0; i<image.length; i++){
  if (image[i].style.position){
    if ((image[i].style.position.indexOf("absolute")!=-1)||(image[i].style.position.indexOf("fixed")!=-1)){
      image[i].style.display="none";
    }}}

// remove lock picture from thumb
pictures = document.getElementsByClassName('preview');
if (pictures){
  for (i=0; i<pictures.length; i++){
    if(pictures[i].getAttribute("alt") =="Locked"){
      pictures[i].parentNode.removeChild(pictures[i])}}}

// if we are on a player page, unlock features, mute tip sound if checked, set interval timer
play=document.getElementById("player");
if (play){
  scrip=document.createElement('script');
  scrip.innerHTML="var oldFunction1 = features_unlocked;features_unlocked = function() {return true}";
  document.getElementsByTagName('body')[0].appendChild(scrip);
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
  if (area.innerHTML.length < 100){
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

// kill all timeouts
scrip=document.createElement('script');
scrip.innerHTML='var highestTimeoutId = setTimeout(function(){for (var i = 0 ; i < highestTimeoutId ; i++) {clearTimeout(i);}},2000)';
document.getElementsByTagName('body')[0].appendChild(scrip);

// image
prefimg='<img class="png" width="180" height="148" src="http://cdn-i.highwebmedia.com/roomimage/'+preformer+'.jpg" img style="float:right;margin-right:100px;margin-top:10px;border-width:5px;border-style:double; ">';
Fversion=readCookie("CBversion")
if(!Fversion){Fversion="http://ccstatic.highwebmedia.com/static/flash/CBV_2p640.swf"}
  videodata2 = videodata2.replace("ladroop",preformer);
newvid=document.createElement('div');
newvid.innerHTML=videodata1+Fversion+videodata2;
document.getElementsByClassName('block')[0].appendChild(newvid)
makePageClean()
}


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
videodata1='<div id="defchat2" style="float:left;resize:both;overflow:hidden;width: ' + (popup_width - 2) + 'px; height: ' + (popup_height + 26) + 'px;">'
+'<object id="movie2" type="application/x-shockwave-flash" data="';

videodata2='" style="visibility: visible;margin-top:0px;margin-bottom:0px;width:100%;height:95%">'
+'<param name="allowScriptAccess" value="always">'
+'<param name="allowFullScreen" value="true">'
+'<param name="quality" value="high">'
+'<param name="wmode" value="opaque">'
+'<param name="id" value="movie">'
+'<param name="FlashVars" value="pid=ladroop&address=edge2-a.stream.highwebmedia.com&language=/xml/viewer.xml&mute=0&uid=AnonymousUser&dom=chaturbate.com&pw=anonymous">'
+'</object></div>'

// some cookies

createCookie("np3","0",1);
createCookie("dsmn29","1",1);
createCookie("dsmn26","1",1);
createCookie("dsmn27","1",1);
createCookie("dsmn28","1",1);
if (!readCookie("show_emoticon_icons")){createCookie("show_emoticon_icons","no",1)}

  do_script();  
//.user.js