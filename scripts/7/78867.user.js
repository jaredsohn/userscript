// ==UserScript==
// @name          Navigation Panel
// @namespace     navpanel 
// @description   Navigate top, bottom, back, forward, refresh page and add scroll position bookmarks
// @include       *
// @exclude       http://iphone-news.com.ua/*
// @exclude       http://alx.iphone-news.com.ua/*
// @exclude       http://alllx.x10hosting.com/*
// @resource      nav_darr http://alllx.x10hosting.com/templates/img/nav_pan/nav_darr.png
// @resource      nav_uarr http://alllx.x10hosting.com/templates/img/nav_pan/nav_uarr.png
// @resource      nav_larr http://alllx.x10hosting.com/templates/img/nav_pan/nav_larr.png
// @resource      nav_rarr http://alllx.x10hosting.com/templates/img/nav_pan/nav_rarr.png
// @resource      nav_home http://alllx.x10hosting.com/templates/img/nav_pan/nav_home.png
// @resource      nav_refresh http://alllx.x10hosting.com/templates/img/nav_pan/nav_refresh.png
// ==/UserScript==

if(window.top != window.self) return;
var d = document;
function getCookie(c_name){
if (d.cookie.length>0){
  c_start=d.cookie.indexOf(c_name + "=");
  if (c_start!=-1){ 
    c_start=c_start + c_name.length+1; 
    c_end=d.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=d.cookie.length;
    return unescape(d.cookie.substring(c_start,c_end));
    } 
  }
return "";
}
function setCookie(c_name,value,expiredays, path){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  d.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path="+path;
}
function checkCookieNavs(){
var navs=getCookie('hideNavs');
  if(!navs || navs==1){
    nav_box.style.right = 0;
  } 
}
var styleEl = d.createElement('style');
  styleEl.type = 'text/css';
  styleEl.innerHTML = '.alx_nav_box{width:35px;position:fixed;-moz-border-radius:8px 0 0 8px;-moz-box-shadow:0 0 5px #555;-webkit-border-top-left-radius:8px;-webkit-border-bottom-left-radius:8px;-webkit-box-shadow:0 0 5px #555;background:#7B8FAA;right:-30px;top:50%;margin-top:-87px;z-index:101010}.alx_nav_box a{width:25px;height:18px;display:block;font:bold 16px arial;color:#fff !important;border-top:1px solid #98A7BD;text-align:center;padding:5px;text-decoration:none;cursor:pointer;position:relative;}.alx_nav_box a:hover{background-color:#98A7BD;text-decoration:none !important;}.alx_nav_box a.nav_marker{font-size:11px;padding-top:2px;height:21px;}.alx_nav_box a.nav_marker span{font:normal 9px arial;position:absolute;bottom:0;left:3px;}.alx_nav_box .nav_uarr{border:0;-moz-border-radius:8px 0 0 0;-webkit-border-top-left-radius:8px;background:url('+GM_getResourceURL("nav_uarr")+') no-repeat 12px center}.alx_nav_box .nav_home{background:url('+GM_getResourceURL("nav_home")+') no-repeat 11px center}.alx_nav_box .nav_rarr{background:url('+GM_getResourceURL("nav_rarr")+') no-repeat 15px center}.alx_nav_box .nav_larr{background:url('+GM_getResourceURL("nav_larr")+') no-repeat center}.alx_nav_box .nav_refresh{background:url('+GM_getResourceURL("nav_refresh")+') no-repeat 9px center}.alx_nav_box .nav_darr{-moz-border-radius:0 0 0 8px;-webkit-border-bottom-left-radius:8px;background:url('+GM_getResourceURL("nav_darr")+') no-repeat 12px center}.alx_nav_box div:hover{color:red;background:#98A7BD}.alx_nav_box div{-moz-border-radius:0 5px 0 8px;-webkit-border-top-right-radius:5px;-webkit-border-bottom-left-radius:8px;height:10px;color:#fff;font:normal 12px Trebuchet MS;line-height:10px;position:absolute;bottom:0;left:0;padding:1px 3px 3px 4px;cursor:pointer}.disp_but:hover{background-color:#98A7BD}.disp_but{height:28px;width:11px;font:bold 20px arial;position:fixed;top:50%;right:4px;background:url('+GM_getResourceURL("nav_larr")+') no-repeat center #7B8FAA;-moz-border-radius:5px 0 0 5px;-webkit-border-top-left-radius:5px;-webkit-border-bottom-left-radius:5px;padding-left:1px;cursor:pointer;color:#fff;z-index:101009;}';
var navPanel = d.createElement('div');
  navPanel.id = 'alx_nav_box';
  navPanel.className = 'alx_nav_box';
  navPanel.innerHTML = '\
      <a class="nav_uarr" href="#up" title="up" onclick="window.scrollTo(0, 0);return false;"></a> \
      <a class="nav_home" href="/" title="home"></a> \
      <a id="nav_add" class="nav_add" title="add bookmark">+</a> \
      <a class="nav_rarr" href="#" title="go forward" onclick="history.forward();return false"></a> \
      <a class="nav_larr" href="#" title="go back" onclick="history.back();return false"></a> \
      <a class="nav_refresh" href="#" title="refresh page" onclick="location.reload();return false"></a> \
      <a class="nav_darr" title="down" href="#down" onclick="window.scrollTo(0,document.documentElement.scrollHeight);return false;"></a> \
      <div id="nav_close" class="nav_close" title="hide">x</div> \
';
var dispBut = d.createElement('div');
dispBut.id = 'disp_but';
dispBut.className = 'disp_but';
dispBut.title = 'show';
var d_body = d.getElementsByTagName('body')[0];
  d_body.appendChild(styleEl);
  d_body.appendChild(navPanel);
  d_body.appendChild(dispBut);
  
nav_box = d.getElementById('alx_nav_box');

var marker_num = 1;
function addBookmark(){
  var marker_el = d.createElement('a');
  marker_el.className = 'nav_marker';
  marker_el.scrlPos = window.scrollY;
  marker_el.innerHTML = '* '+marker_num+'<span>'+marker_el.scrlPos+'</span>';
  marker_el.title = 'bookmark '+marker_num;
  nav_box.insertBefore(marker_el, d.getElementById('nav_add'));
  marker_el.addEventListener('click', function(){window.scrollTo(0, marker_el.scrlPos);return false;}, true);
  marker_num++;
}
function hideNavs(){
  nav_box.style.right = parseInt(nav_box.style.right.slice(0,-2)) - 2+'px';
  if(parseInt(nav_box.style.right.slice(0,-2))>-30){
    setTimeout(hideNavs, 30);
  }
}
function dispNavs(){
  nav_box.style.right = parseInt(nav_box.style.right.slice(0,-2)) + 2+'px';          
  if(parseInt(nav_box.style.right.slice(0,-2))<0){
    setTimeout(dispNavs, 30);
  }
}
checkCookieNavs();
d.getElementById('disp_but').addEventListener('click', function(){dispNavs(nav_box.style.right = -30+'px');setCookie('hideNavs', 1,365,'/');return false;}, true);
d.getElementById('nav_close').addEventListener('click', function(){hideNavs(nav_box.style.right = 0);setCookie('hideNavs', 2,365,'/');return false;}, true);
d.getElementById('nav_add').addEventListener('click', function(){addBookmark();return false;}, true);
