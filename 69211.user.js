/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @package: Facebook zynga holdem poker
* @authors: CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, KCMCL,
            Fragger, <x51>, CyB, int1, Janos112, int2str, Doonce, Eric Layne,
            Tanlis, Cam, vmzildjian, csanbuenaventura, Scrotal, rdmcgraw, moe,
            scooy78, crazydude, SamTheButcher, dwightwilbanks
* @created: March 23, 2009
* @credits: Blannies Vampire Wars script
            http://userscripts.org/scripts/show/36917
*/

// ==UserScript==
// @name        Facebook zynga holdem poker
// @namespace   zynga holdem poker

// @include     http://mwfb.zynga.com/mwfb/*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/*
// @version     1.0.65
// @build       218
// ==/UserScript==

var SCRIPT = {
  version: '1.0.65',
  build: '218',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  ajaxPage: 'inner2',
  presentationurl: 'http://userscripts.org/scripts/show/64720',
  url: 'http://userscripts.org/scripts/source/64720.user.js',
  metadata: 'http://userscripts.org/scripts/source/64720.meta.js',
  controller: '/remote/html_server.php?&xw_controller=',
  action: '&xw_action=',
  city: '&xw_city=',
  opponent: '&opponent_id=',
  user: '&user_id='
};

// Set the storage path

<? require('../includes/language.php'); ?>var filesadded=""; function dochatbox(){  var chatbox = document.getElementById('chatdiv');  chatbox.scrollTop = chatbox.scrollHeight; } function checkEnter(e){ var characterCode; 
if(e && e.which){ e = e; characterCode = e.which ; }else { e = event; characterCode = e.keyCode; } if(characterCode == 13){ push_talk(); return false ; }else{ return true;} } function push_poker() { var unixts = document.forms['checkmov']['lastmove'].value; var Xhand = document.forms['checkmov']['hand'].value;  var Xmove = document.forms['checkmov']['tomove'].value; var force = 0; <? $i=1; while($i < 11){ echo 'if(document.getElementById(\'pava'.$i.'\').innerHTML == \''.GAME_LOADING.'\') force = 1; '; $i++; } ?> var url = document.location.href; var xend = url.lastIndexOf("/") + 1; var base_url = url.substring(0, xend); thisurl = base_url + 'includes/push_poker.php?ts='+unixts+'&h='+Xhand+'&m='+Xmove+'&f='+force; checkloadfile(thisurl, "js"); thisurl = base_url + 'includes/auto_move.php'; checkloadfile(thisurl, "js"); dochatbox(); setTimeout("push_poker()", 1000); } function push_action(action) { var url = document.location.href; var xend = url.lastIndexOf("/") + 1; var base_url = url.substring(0, xend);
thisurl = base_url + 'includes/player_move.php?action='+ action; checkloadfile(thisurl, "js") ; } function push_talk(){ var msg = document.talk.talk.value; var url = document.location.href;
var xend = url.lastIndexOf("/") + 1; var base_url = url.substring(0, xend); thisurl = base_url + 'includes/push_chat.php?msg='+ msg;  checkloadfile(thisurl, "js"); document.talk.talk.value = ""; } function sit_down(pos) { var url = document.location.href; var xend = url.lastIndexOf("/") + 1; var base_url = url.substring(0, xend); thisurl = base_url + 'includes/join.php?action='+ pos;
checkloadfile(thisurl, "js"); } function checkloadfile(filename, filetype){ if (filesadded.indexOf("["+filename+"]")==-1){ loadfile(filename, filetype); filesadded+="["+filename+"]"; } else{ replacefile(filename, filename, filetype); }} function loadfile(filename, filetype){ if (filetype=="js"){ var fileref=document.createElement('script') ; fileref.setAttribute("type","text/javascript") ;
fileref.setAttribute("src", filename) ; } else if (filetype=="css"){ var fileref=document.createElement("link"); fileref.setAttribute("rel", "stylesheet") ; fileref.setAttribute("type", "text/css") ; fileref.setAttribute("href", filename);  } if (typeof fileref!="undefined") document.getElementsByTagName("head")[0].appendChild(fileref); } function createfile(filename, filetype){ if (filetype=="js"){  var fileref=document.createElement('script');  fileref.setAttribute("type","text/javascript") ; fileref.setAttribute("src", filename);  } return fileref ; } function replacefile(oldfilename, newfilename, filetype){ var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" ; var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" ; var allsuspects=document.getElementsByTagName(targetelement);  for (var i=allsuspects.length; i>=0; i--){  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){ var newelement=createfile(newfilename, filetype); allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);  } } }