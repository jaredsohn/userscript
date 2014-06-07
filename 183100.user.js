// ==UserScript==
// @name        keeplinks
// @namespace   catapusMonkey
// @include     http://www.keeplinks.me/p/*
// @version     1
// @grant       none

// ==/UserScript==


var lastPart = document.URL.split("/").pop();
var cname = "flag[" + lastPart + "]";

if (getCookie(cname) != 1){
    setCookie(cname , 1 , 2);
    location.reload();
}

$(".live").each(function(i,d){
    var durl = $(d).attr('href');
    if (durl.indexOf('putlocker.com') != -1){
        window.location.href = durl;
    }
});

function setCookie(c_name,value,exdays)

{

var exdate=new Date();

exdate.setDate(exdate.getDate() + exdays);

var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());

document.cookie=c_name + "=" + c_value;

}

function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
    {
    c_end = c_value.length;
    }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
return c_value;
}