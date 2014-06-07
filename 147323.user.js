// ==UserScript==
// @name          CrackHackForum - Upload Files
// @namespace     Pl0xd/Upload
// @description   Upload files.
// @author        Pl0xd
// @include       http://crackhackforum.com/newreply.php*
// @include       http://www.crackhackforum.com/newreply.php*
// @include       http://crackhackforum.com/newthread.php*
// @include       http://www.crackhackforum.com/newthread.php*
// @include       http://crackhackforum.com/editpost.php*
// @include       http://www.crackhackforum.com/editpost.php*
// @version 	  1.0
// ==/UserScript==

var regex = /\Your Message:/;
var revised = "Your Message: <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href='#register-box' class='register-window'>&raquo; Upload Images & Files</a><div id='register-box' class='register-popup'><iframe src='http://skidpoints.net' scrolling='no' height='500' width='500' frameborder='0'></iframe> </div>";
document.getElementById('content').innerHTML= document.getElementById('content').innerHTML.replace(regex,revised);
