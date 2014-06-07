// ==UserScript==
// @name           HCI SMB/EMB Enhancer V3
// @namespace      HCI SMB EMB Hehe
// @description    This script enhances the user's experience when using the SMB
// @include        http://smb.chs.edu.sg/*
// ==/UserScript==

//--------------------------------------------------------------------------------
var userid=''; // Enter your username in between the inverted commas
var password=''; // Enter your password in between the inverted commas
var highschoolorcollege=0; // 0=High School, 1=College
//--------------------------------------------------------------------------------

// Start: Load jQuery Library
var GM_Head = document.getElementsByTagName('head')[0];
GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JQ.type = 'text/javascript';
GM_JQ.async = true;
GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
// End: Load jQuery Library

// Start: Pre-loading Images
var preload_image = new Image(32,32); 
preload_image.src="http://www.hostanypic.com/out.php/i14782_favicon.ico";
// End: Pre-loading Images 

// Start: Re-design pages
if (highschoolorcollege==1) var url='http://smb.chs.edu.sg/smb/college_student/';
else var url='http://smb.chs.edu.sg/smb/hs_student/';
if (window.location==url) { // Login Page
	var icon = document.createElement('link');
	icon.setAttribute('rel', 'shortcut icon');
	icon.href = 'http://www.hostanypic.com/out.php/i14782_favicon.ico';
	document.head.appendChild(icon);
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.type = 'text/css';
	css.href = 'http://www2.hci.edu.sg/y08hci0128/smb/theme.css';
	document.head.appendChild(css);
	var x = "http://"+location.hostname+"/cgi-bin/smb/login.pl";
	document.title="Electronic Message Board v3.0";
	document.body.innerHTML="<div class='container'><div class='toolbar'><h1>EMB v3.0</h1></div>"+
	"<br><center><form action="+x+" method=post onsubmit=\'return Validator(this)\' name=theForm>"+
	"username: <input type='text' id='userid' size='16' maxlength='16' name='userid' autocomplete='on'><br>"+
	"<div class='separator'><!----></div>"+
	"password: <input type='password' id='pass' size='16' maxlength='16' name='password' autocomplete='on'>"+
	"<br><br><input type='submit' value='Login' name='login' id='login' class='bluebutton'></form>"+
	"<div class='credits'>v3.0 by Ng Yi Yang , v2.0 by Wong Jun Ming, v1.0 by Mr Koh Kim Tian </div>"+
	"</center></div>";
} else if (window.location.pathname=='/cgi-bin/smb/menu.pl') { // Menu
	if (document.body.innerHTML=="<p></p><h3><font color=\"red\">Cannot open dbuser</font></h3><p></p><br><hr><br><a href=\"\"> Go to Login</a>") {
		window.location=url;
	} else {
		var icon = document.createElement('link');
		icon.setAttribute('rel', 'shortcut icon');
		icon.href = 'http://www2.hci.edu.sg/y08hci0128/smb/favicon.ico';
		document.head.appendChild(icon);
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.type = 'text/css';
		css.href = 'http://www2.hci.edu.sg/y08hci0128/smb/theme.css';
		document.head.appendChild(css);
		document.body.innerHTML="<div class='menucontainer'><div class='toolbar'><h1>Menu</h1></div>"+
		"<ul><li class='arrow'><a href='login_emb.pl?chs_student'>Student</a></li><li class='arrow'><a href='login_emb.pl?chs_psb'>Public Speaking Board</a></li><li class='arrow'><a href='login_emb.pl?hs_lost'>Lost & Found</a></li><li class='arrow'><a href='login_emb.pl?hs_life'>Art, Health & Sports</a></li></ul>"+
		"<a href='menu_util.pl' class='bluebutton'>Utilities</a> <a href='logout.pl' class='bluebutton'>Logout</a><br></div>";
	}
} else if (window.location.pathname=='/cgi-bin/smb/menu_util.pl') { // Utilties
	if (document.body.innerHTML=="<p></p><h3><font color=\"red\">Cannot open dbuser</font></h3><p></p><br><hr><br><a href=\"\"> Go to Login</a>") {
		window.location=url;
	} else {
		var icon = document.createElement('link');
		icon.setAttribute('rel', 'shortcut icon');
		icon.href = 'http://www.hostanypic.com/out.php/i14782_favicon.ico';
		document.head.appendChild(icon);
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.type = 'text/css';
		css.href = 'http://www2.hci.edu.sg/y08hci0128/smb/theme.css';
		document.head.appendChild(css);
		document.body.innerHTML="<div class='container'><div class='toolbar'><a href='menu.pl' class='back'>Menu</a><h1>Utilities</h1></div>"+
		"<ul><li class='arrow'><a href='util_acc_update.pl'>Update Account</a></li><li class='arrow'><a href='util_acc_psw.pl'>Change Password</a></li></ul>"+
		"</div>";
	}
} else if (window.location.pathname=='/cgi-bin/emb/menu_htm.pl') { // Menu Bar
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.type = 'text/css';
	css.href = 'http://www2.hci.edu.sg/y08hci0128/smb/theme.css';
	document.head.appendChild(css);
	var nr = new RegExp("<table align=\"top\" border=\"0\">", "ig");
	var tmp = document.body.innerHTML.replace(nr, ""); 
	var nr = new RegExp("&nbsp;", "ig");
	var tmp = tmp.replace(nr, "");
	var nr = new RegExp("><img src=\"http://smb.chs.edu.sg/emb/view.gif\" alt=\"View Messages\" height=\"28\"><", "ig");
	var tmp = tmp.replace(nr, " class='bluebutton'>View<");
	var nr = new RegExp("<a href=\"http://smb.chs.edu.sg/cgi-bin/emb/add_htm1.pl?273063\" target=\"content\"><", "ig");
	var tmp = tmp.replace(nr, " target=\"content\"><");
	var nr = new RegExp("><img src=\"http://smb.chs.edu.sg/emb/archive.gif\" alt=\"View Archived Messages\" height=\"28\"><", "ig");
	var tmp = tmp.replace(nr, " class='bluebutton'>Archive<");
	var nr = new RegExp("><img src=\"http://smb.chs.edu.sg/emb/util.gif\" alt=\"Utility\" height=\"28\"><", "ig");
	var tmp = tmp.replace(nr, " class='bluebutton'>Utilities<");
	var nr = new RegExp(" target=\"_top\">EMBs</a>", "ig");
	var tmp = tmp.replace(nr, " target=\"_top\" class='bluebutton'>EMB</a>");
	var nr = new RegExp(" target=\"_blank\">Help</a>", "ig");
	var tmp = tmp.replace(nr, " target=\"_blank\" class='bluebutton'>Help</a>");
	document.body.innerHTML = "<div class='menubar'>"+tmp+"</div>";
	document.body.getElementsByTagName('font')[0].parentNode.removeChild(document.body.getElementsByTagName('font')[0]);
	document.body.getElementsByTagName('font')[0].parentNode.removeChild(document.body.getElementsByTagName('font')[0]);
}
// End: Re-design pages

// Start: Auto Login
if (userid!='' && password!='') {
	document.getElementById('userid').value=userid;
	document.getElementById('pass').value=password;
	document.getElementById('login').click();
}
// End: Auto Login