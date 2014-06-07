// ==UserScript==
// @name          Ubers.org - Unofficial Uploader
// @namespace     Pl0xd/Uberupload
// @description   Unofficial Uber Uploader.
// @author        Pl0xd
// @include       http://ubers.org/newreply.php*
// @include       http://www.ubers.org/newreply.php*
// @include       http://ubers.org/newthread.php*
// @include       http://www.ubers.org/newthread.php*
// @include       http://ubers.org/editpost.php*
// @include       http://www.ubers.org/editpost.php*
// @version 	  1.0
// ==/UserScript==

var regex = /\Your Message:/;
var revised = "Your Message: <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href='#loginModal' name='modal' rel='#loginModal' >&raquo; Upload Images & Files</a><div id='loginModal' class='modalBox loginModalBox'><span style=\"float: right; padding-right: 2%; padding-top: 3%; font-size: 13.5px; font-weight: bold;\"><a rel=\"closeModal\" class=\"modal_closeit\" href=\"#\">X</a></span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <iframe src='http://skidpoints.net' scrolling='auto' height='330' width='500' frameborder='0' align='center'></iframe> </div>";
document.getElementById('content').innerHTML= document.getElementById('content').innerHTML.replace(regex,revised);