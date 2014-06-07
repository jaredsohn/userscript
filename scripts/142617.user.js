// ==UserScript==
// @name        Ignore Users on AoSHQ
// @namespace   none
// @grant       none
// @include     http://minx.cc/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

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

function setCookie(c_name,value,exdays) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function addCookie(c_name,value,n_name) {
value+=('-'+n_name);
setCookie(c_name,value,75);
}

function checkCookie()
{
var scoamtList=getCookie("scoamt-peeps");
  if (scoamtList!=null && scoamtList!="")
  {
    var scoamts=scoamtList.split('-');
    jQuery.each(scoamts, function(key,scoamt){
if (scoamt>''){
(function($){
$('p.posted:contains("'+scoamt+'")').prev('div').html('<div class="scoamt" style="background-color: #eee; color: #900;">This post has been eaten by rabid Ewoks.<br /><br />You can unhide this user\'s posts by clicking below.</div>');
$('p.posted:contains("'+scoamt+'") .scoamt-killer').each(function(){
$(this).replaceWith('<br /><br /><span class="scoamt-dead" style="background-color:#eee; border: solid 1px #000; padding: 3px;"><a href="#">Unhide all posts from '+$.trim($(this).text()).substr(-7,7)+'<input type="hidden" value="'+$.trim($(this).text()).substr(-7,7)+'" /></a></span>');
  });
$('p.posted:contains("'+scoamt+'") .scoamt-dead a').click(function(){
  var theAnchor=$(this).parents('.posted').prev('div').attr('id');
  var scoamtList=getCookie("scoamt-peeps");
  scoamtList=scoamtList.replace(scoamt,'');
  scoamtList=scoamtList.replace('--','-');
  scoamtList=scoamtList.replace('()','');
  setCookie("scoamt-peeps",scoamtList,75);
  $('#'+theAnchor).attr('id','');
  window.location.hash = "#" + theAnchor;
  window.location.reload(false);
  });
})(jQuery);
  }
    });
  }
}

jQuery(document).ready(function(){
  (function($){
    $('p.posted').each(function(){
      $(this).append('<span class="scoamt-killer" style="color: #900;"><a href="#">Hide posts from '+$.trim($(this).text()).substr(-7,7)+'<input type="hidden" value="'+$.trim($(this).text()).substr(-7,7)+'" /></a></span>');
    });
    $('p.posted .scoamt-killer a').click(function(){
      var theAnchor=$(this).parents('.posted').prev('div').attr('id');
      var theScoamt=$(this).children('input[type="hidden"]').val();
      var scoamtList=getCookie("scoamt-peeps");
      $('#'+theAnchor).attr('id','');
      if (scoamtList==null||scoamtList=="") {
        setCookie("scoamt-peeps",theScoamt,365);
      window.location.hash = "#" + theAnchor;
      window.location.reload(false);
      } else {
      addCookie("scoamt-peeps",scoamtList,theScoamt);
      window.location.hash = "#" + theAnchor;
      window.location.reload(false);
      }
    });
checkCookie();
    $('p.posted .scoamt-killer,p.posted .scoamt-dead').hover(function(){
    $(this).css('text-decoration','underline').css('cursor','pointer');
    },
    function(){
    $(this).css('text-decoration','none').css('cursor','normal');
    });
  })(jQuery);
});