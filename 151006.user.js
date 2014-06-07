// ==UserScript==
// @name        FFsng Autocomment + Autolike
// @description It allows you to auto comment + likess
// @namespace   FFSNG-autocomment
// @include      *://ffsng.com/?uid=*&h=*
// @include      *://www.ffsng.com/?uid=*&h=*
// @version     1.0
// ==/UserScript==
// ren alcantara
var renside,settings;
renside = document.createElement('div');
renside.setAttribute('id','rensidediv');
renside.setAttribute('style','width: 50px; box-shadow: 0 0 5px #1E1E1E; color: white; font-size: 12px;margin-right: 0; margin-top: -50px; padding: 0; position: fixed;left: 50px;  top:40%; z-index: 999999;');
settings = document.createElement('div');
settings.setAttribute('id','setsidediv');
settings.setAttribute('style','width: 50px; box-shadow: 0 0 5px #1E1E1E; color: white; font-size: 12px;margin-right: 0; margin-top: -20px; padding: 0; position: fixed;left: 50px;  top:40%; z-index: 999999;');
document.body.appendChild(renside);
document.body.appendChild(settings);
$("#doren143").live("click", function() {
var parent = $(this);
$(this).fadeIn(200).html('<img src="https://s-static.ak.facebook.com/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif">');
localStorage["msgren143"] = $("#renmsg").val();
var str = $("#likes_count").text();
var msgren = $("#renmsg").val();
var trimmed = str.replace(/^s+|s+$/g, "") ;
var trimmed = str.replace(",", "") ;
var akootot = "ren was here";
trimmed = parseInt(trimmed);
trimmed = trimmed + 1;
msgren = msgren.replace("[name]", uid_fname);
msgren = msgren.replace("[likes]", trimmed);
doLike(1);
setTimeout(ren1431,3500);
function ren1431(){
$('#doren143').html('done!');
doSendMessage(d(akootot), this, uid, msgren, 0, d("private_cb").checked?1:0); 
}

});
$('#rensidediv').html('<div class="ac rendiv" id="like_button"><a class="dark" id="doren143">AutoIt</a></div>');
$('#setsidediv').html('<script>$(document).ready(function(){ $("#renmsg").val(localStorage["msgren143"]); });</script><textarea id="renmsg"> hello [name] <Br>Liked #[likes] <br> Hope you do the same (dnc) </textarea>');