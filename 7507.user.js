// Created by SW   [nex=speshull]
//
// This script:
// Removes frames. Adds functional menu bar.
//
/**********************************************************************/
//
// ==UserScript==
// @name           Nexopia Fix
// @namespace	   http://www.okyup.com/
// @description    Removes frames from Nexopia
// @include        http://www.nexopia.com/*
// ==/UserScript==

/**********************************************************************/
////////////////////////////////////////////////////////
//////// This script uses the Azure banner and  ////////
//////// menubar by default. Change them here:  ////////
////////////////////////////////////////////////////////
var headergfx="http://img354.imageshack.us/img354/2931/headerbigot5.jpg";
var header_h="90";
var menubkgnd="http://static.nexopia.com/20552/files/Legacy/skins/azure/menubg.gif";
/**********************************************************************/

(function(){
 var nfm=document.createElement("div");
 nfm.id="nexfix_freeze";
 document.body.appendChild(nfm);
 var b=window.location.href.indexOf("cachekey");
 if (window.location.href.indexOf("cachekey",b+1)!=-1)
  window.location.href=window.location.href.substring(0,b-2);
 var c=document.getElementsByTagName("script");
 for (var psf=0;psf<c.length;psf++){
  var p=c[psf].innerHTML.indexOf('updateStats(');
  if(p!=-1){
   GM_setValue("nst",c[psf].innerHTML.substring(p+12,c[psf].innerHTML.indexOf(')',p)),365);
   break;
  }
 }
 var a,f,n,l=null;
 a=document.evaluate("//frame",document,null,XPathResult.ANY_TYPE,null);
 while(f=a.iterateNext()){
  if (l!=null) break;
  if(f.name.length==8)
   l=f.src;}
 if (l!=null)
  document.location.replace(l);
 else
  nexfix();
})();

function nexfix(){
 document.body.removeChild(document.getElementById("nexfix_freeze"));
 if (document.cookie.indexOf("sessionkey")==-1)
  GM_setValue("nui","");
 else if (GM_getValue("nui","")==""||GM_getValue("nui","").length>16){
  var x=new XMLHttpRequest();
  x.open("GET","http://www.nexopia.com/logout.php",false);
  x.send(null);
  g=x.responseText;
  GM_setValue("nui",g.substring(g.indexOf("/users/")+7,g.indexOf("/friends")));
  GM_setValue("nlk",g.substr(g.indexOf("k=")+2,10));
 }
 var ui=GM_getValue("nui","");
 var lk=GM_getValue("nlk","");
 var s=new Array();
 s=GM_getValue("nst","-,-,-,-,-,-").split(',');
 var n=document.createElement("div");
 n.setAttribute("id","nexmenu");
 var ni="<table cellspacing=0 cellpadding=0 width=100%><tr><td bgcolor=#000000 background='"+headergfx+"' align=right height="+header_h+" 

valign=top></td></tr><tr><td height=23 background='"+menubkgnd+"'><table cellspacing=0 cellpadding=0 width=100%><tr><td class=menu 

align=left>&nbsp;&nbsp;&nbsp;&nbsp;<a href='/'>Home</a> | <a href='/profile.php'>Users</a> | <a href='/forums.php'>Forums</a> | <a 

href='/articlelist.php'>Articles</a> | <a href='/my/friends/find'>Invite a Friend</a> | <a href='/music'>Music</a> | <a href='/plus.php'>Plus</a> | <a 

href='/help/'>Help</a>"
 if(ui==""){
  ni=ni+" | <a href='/login.php' target='_top'>Login</a> | <a href='/create.php' target='_top'>Join</a></td><td class=menu align=right>Online: <a 

href='/profile.php?requestType=onlineByPrefs'>Users U_</a> | Guests G_ &nbsp;</td></tr></table></td></tr>";
  ni=ni.replace('U_',s[1]);
  ni=ni.replace('G_',s[2]);
 }
 else{
  ni=ni+" | <a href='/logout.php?k=K_' target='_top'>Logout</a></td><td class=menu align=right>Online: <a href='/friends.php'>Friends F_</a> | <a 

href='/profile.php?requestType=onlineByPrefs'>Users U_</a> | Guests G_ &nbsp;</td></tr></table></td></tr><tr><td height=23 

background='"+menubkgnd+"'><table cellspacing=0 cellpadding=0 width=100%><tr><td class=menu align=left>&nbsp;&nbsp;&nbsp;&nbsp;<a 

href='/prefs.php'>Preferences</a> | <a href='/managesubscriptions.php'>Subscriptions</a> | <a href='/my/gallery'>Gallery Manager</a> | <a 

href='/my/profile/edit'>Edit Profile</a> | <a href='/my/profile'>My Page</a></td><td class=menu align=right><a href='/messages.php'>Messages</a><a 

href=/messages.php?action=viewnew> N_ New</a> | <a href='/users/I_/blog'>Blog</a> <a href='/weblog.php?uid=3305416&newreplies=1'><span 

id=replies></span></a> | <a href='/users/I_/comments'>Comments C_</a> &nbsp;</td></tr></table></td></tr><tr>";
  ni=ni.replace('I_',ui);
  ni=ni.replace('I_',ui);
  ni=ni.replace('K_',lk);
  ni=ni.replace('U_',s[1]);
  ni=ni.replace('G_',s[2]);
  ni=ni.replace('F_',s[0]);
  ni=ni.replace('N_',s[3]);
  ni=ni.replace('C_',s[5]);
 }
 n.innerHTML=ni;
 document.body.insertBefore(n,document.body.firstChild);
}