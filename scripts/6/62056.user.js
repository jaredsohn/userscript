// ==UserScript==
// (c) 2008
// @name          Advanced Functions
// @namespace     http://mig.local.pp.ru
// @include       http://mig.local*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function qr_form(href,whatret) {
  var reg = /topic=(\d+)&forum=(\d+)/;
  var res=reg.exec(href);
  if(whatret==1) return res[1]; if(whatret==2) return res[2];
  form='  <div id=abzreply style="display:none;z-index:777;position:absolute;background-color:pink;">Write text here! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" onclick="document.getElementById(\'abzreply\').style.display=\'none\';return false;">X</a> ';
  form=form+'<form  id=abzreplyform name=abzreply action="modules.php" method="post"   onsubmit="abzsend();return true;" >  <input type="hidden" name="name" value="phpBB_14">  ';
  form=form+'  <input type="hidden" name="file" value="index">  <input type="hidden" name="op" value="modload"> ';
  form=form+'  <input type="hidden" name="action" value="reply">   <TEXTAREA NAME="message" ROWS=10 COLS=65 WRAP="soft" id=messagetext></TEXTAREA> ';
  form=form+'    <br> <INPUT TYPE="SUBMIT" NAME="submit" VALUE="Send">      ';
  form=form+'  <INPUT TYPE="HIDDEN" NAME="forum" VALUE="'+res[2]+'">   <INPUT TYPE="HIDDEN" NAME="topic" VALUE="'+res[1]+'">  </FORM> </div>';
  return form;
}
function letsJQuery() {
    $('textarea').after('<br>Delete post: <input type="checkbox" name="delete">');
    a=$("img[src='modules/phpBB_14/images/reply.gif']").parent();
    href=a[0];
    qr=qr_form(href,0);
    a.before('<a href="#"  onclick="qr_form_show(this);return false;">[+]</a>');
    $("body").append(qr);
    scr='<script> function qr_form_show(id) { document.getElementById("abzreply").style.display="";x=$(id).offset(); ';
    scr=scr+' $("#abzreply").css("left",x.left-100).css("top",x.top+20).css("display",""); } '
    scr=scr+' function abzafter(data) { document.getElementById("messagetext").value=""; document.getElementById("abzreply").style.display="none"; } ';
    scr=scr+'  </script>';
    $("body").append(scr);
}
