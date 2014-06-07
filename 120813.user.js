// ==UserScript==
// @name          Tema Natalino
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description   Tema natalino pro 73chan.
// @version	  0.41
// @namespace     anon
// @include       http://new.73chan.org/*
// ==/UserScript==
var style_cookie;var style_cookie_txt;var style_cookie_site;var kumod_set=false;var quick_reply=false;var ispage;function getCookie(a){with(document.cookie){var b=new RegExp("(^|;\\s+)"+a+"=(.*?)(;|$)");var c=b.exec(document.cookie);if(c&&c.length>2)return Utf8.decode(unescape(replaceAll(c[2],'+','%20')));else return''}}function set_cookie(a,b,c){if(c){var d=new Date();d.setTime(d.getTime()+(c*24*60*60*1000));var e="; expires="+d.toGMTString()}else e="";document.cookie=a+"="+b+e+"; path=/"}function del_cookie(a){document.cookie=a+'=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/'}function set_stylesheet(a,b,c){if(b){if(a==get_default_stylesheet())del_cookie("kustyle_txt");else set_cookie("kustyle_txt",a,365)}else if(c){if(a==get_default_stylesheet())del_cookie("kustyle_site");else set_cookie("kustyle_site",a,365)}else{if(a==get_default_stylesheet())del_cookie("kustyle");else set_cookie("kustyle",a,365)}var d=document.getElementsByTagName("link");var e=false;for(var i=0;i<d.length;i++){var f=d[i].getAttribute("rel");var g=d[i].getAttribute("title");if(f.indexOf("style")!=-1&&g){d[i].disabled=true;if(a==g){d[i].disabled=false;e=true}}}if(!e)set_preferred_stylesheet()}function set_preferred_stylesheet(){var a=document.getElementsByTagName("link");for(var i=0;i<a.length;i++){var b=a[i].getAttribute("rel");var c=a[i].getAttribute("title");if(b.indexOf("style")!=-1&&c)a[i].disabled=(b.indexOf("alt")!=-1)}}function get_active_stylesheet(){var a=document.getElementsByTagName("link");for(var i=0;i<a.length;i++){var b=a[i].getAttribute("rel");var c=a[i].getAttribute("title");if(b.indexOf("style")!=-1&&c&&!a[i].disabled)return c}return null}function get_preferred_stylesheet(){var a=document.getElementsByTagName("link");for(var i=0;i<a.length;i++){var b=a[i].getAttribute("rel");var c=a[i].getAttribute("title");if(b.indexOf("style")!=-1&&b.indexOf("alt")==-1&&c)return c}return null}function get_default_stylesheet(){var a=document.getElementsByTagName("link");for(var i=0;i<a.length;i++){var b=a[i].getAttribute("rel");var c=a[i].getAttribute("title");if(b.indexOf("style")!=-1&&c&&b!='alternate stylesheet')return c}return null}

function addStyle() {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement('link'));
ele.setAttribute('title', 'Natal');
ele.setAttribute('rel', 'alternate stylesheet');
ele.setAttribute('type', 'text/css');
ele.setAttribute('href','http://dl.dropbox.com/u/30943987/chan/style.css');
return ele;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
addStyle();
$(document).ready(function(){
		var cookie = getCookie("kustyle");		
		if(cookie == 'Natal'){
		set_stylesheet('Natal', true, true);
		}
		var temp = get_active_stylesheet();
        $('.adminbar').prepend('<span>[</span><a class="irmao" onclick="javascript:set_stylesheet(\'Natal\');return false;" href="#">Natal</a><span>]&nbsp;</span>');
$('.irmao').click(function(){
if(temp != 'Natal'){
$('.thumb').wrap('<div class="new" />');
}
if (!$('.new').hasClass('um')){
$('.new').prepend('<img src="http://i.imgur.com/PSYHc.gif" class="chapeuzinho" />');
$('.new').addClass('um'); }
});
$('.irmao ~ a').click(function(){
$('.new').removeClass('um');
$('.chapeuzinho').remove();
});
		if (temp == 'Natal'){
		$('.thumb').wrap('<div class="new um" />');
		$('.new').prepend('<img src="http://i.imgur.com/PSYHc.gif" class="chapeuzinho" />');}
});