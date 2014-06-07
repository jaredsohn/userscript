// Login to GMail with bookmark
// version 0.1 BETA
// 24.10.2009
// Copyright (c) 2009, Cabhage
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Create bookmark: https://www.google.com/accounts/ServiceLogin?service=mail&AutoLog=yes&Log=YOUR_LOGIN&Pas=YOUR_PASSWORD
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMail bookmark login
// @namespace     http://diveintogreasemonkey.org/download/
// @description   This allow use bookmarks for logging to google mail
// @include       https://www.google.com/accounts/ServiceLogin?service=mail&AutoLog=yes*
// ==/UserScript==


function ParseURL(AName, AUrl)
{
  AName = AName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+AName+"=([^&#]*)";
  var regex = new RegExp (regexS);
  var results = regex.exec(AUrl);
  if (results == null)
    return "";
  else
    return results[1];
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

Login = ParseURL('Log',window.location);
Pass  = ParseURL('Pas',window.location);

window.location.href = "https://www.google.com/accounts/ServiceLoginAuth?continue=http://mail.google.com/gmail&service=mail&Email="+Login+"&Passwd="+Pass+"&null=Sign+in&GALX="+getCookie('GALX');
