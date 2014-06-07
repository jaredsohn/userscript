// ==UserScript==
// @name           Kaskus Livebeta Redirect Helper
// @namespace      http://www.andresusanto.com
// @author         Andre
// @version        0.3
// @description    Bypass the Livebeta URL, redirect it to old kaskus. Useful for not logged members.
// @include        http://livebeta.kaskus.us/*
// @include        http://livebeta.kaskus.us/
// @include        http://livebeta.kaskus.com/*
// @include        http://livebeta.kaskus.com/
// @include        http://livebeta.kaskus.co.id/*
// @include        http://livebeta.kaskus.co.id/
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

/*======================================================================================================================================
    :::     ::::    ::: :::::::::  :::::::::  ::::::::::   ::::::::  :::    :::  ::::::::      :::     ::::    ::: ::::::::::: ::::::::  
  :+: :+:   :+:+:   :+: :+:    :+: :+:    :+: :+:         :+:    :+: :+:    :+: :+:    :+:   :+: :+:   :+:+:   :+:     :+:    :+:    :+: 
 +:+   +:+  :+:+:+  +:+ +:+    +:+ +:+    +:+ +:+         +:+        +:+    +:+ +:+         +:+   +:+  :+:+:+  +:+     +:+    +:+    +:+ 
+#++:++#++: +#+ +:+ +#+ +#+    +:+ +#++:++#:  +#++:++#    +#++:++#++ +#+    +:+ +#++:++#++ +#++:++#++: +#+ +:+ +#+     +#+    +#+    +:+ 
+#+     +#+ +#+  +#+#+# +#+    +#+ +#+    +#+ +#+                +#+ +#+    +#+        +#+ +#+     +#+ +#+  +#+#+#     +#+    +#+    +#+ 
#+#     #+# #+#   #+#+# #+#    #+# #+#    #+# #+#         #+#    #+# #+#    #+# #+#    #+# #+#     #+# #+#   #+#+#     #+#    #+#    #+# 
###     ### ###    #### #########  ###    ### ##########   ########   ########   ########  ###     ### ###    ####     ###     ########  

	Home Page	:	www.andresusanto.com
	Email		:	admin@andresusanto.com
	
	This script is open source script. You can use this script for educational purposes.
	This script is released under GNU General Public License. Please read it before doing any changes to this script
	

========================================================================================================================================*/

/* KASKUS.US REDIRECTION (REDIRECT ALL URL FROM KASKUS.US --> KASKUS.CO.ID
   ------------------------------------------------------------------------
   
   AUTOMATIC WAY
   -------------
   IF YOU DON'T WANT TO DO THOSE MANUAL STEPS, YOU CAN DOWNLOAD KASKUS.US REDIRECT HELPER AT : www.andresusanto.com/kushelper.bat
   
   
   MANUAL STEPS: 
   -------------
 To use this feature you must do the following step:
 1.	Open Notepad, run it as Administrator (right click -> run as administrator)
 2.	Open file : C:\Windows\System32\drivers\etc\hosts (to see this file, you must change the filter in
	open dialog to all files *.*)
 3.	Add this line in the end of file:
 
	+----------copy below------------+
210.247.249.194	kaskus.us
210.247.249.194	www.kaskus.us
	+----------copy above------------+
	
 4.	Save the file and close notepad. (If there's an error, your notepad must be runned not as admin.
	You must run it as administrator to be able to save the file).
 5. Clear your browser's cache and history. And then, restart the browser.
 6.	You should now redirected to new kaskus :)
 


+-------------------------------------------------------------------------------+
|   Livebeta trapper buster														|
|   DONT EDIT ANY LINE IF YOU DON'T UNDERSTAND WHAT ARE YOU EDITING ABOUT!!!! 	|
+-------------------------------------------------------------------------------+			

*/$(document).ready(function() {
	if($("#howto").html().indexOf('Not Set')==-1) {
		var hdr = window.location.href;
		var nhd = hdr.split('#')[0];
		var nostp = nhd.split('//')[1];
		var stes = nostp.split('/')[1];
		try{
			var value = nostp.split('/')[2];
		}
		catch(e){
			var value = 0;
		}
		if (value){
			document.title = 'Kaskus Livebeta Redirect Helper';
			document.body.innerHTML = '<center><img src="http://www.andresusanto.com/kred.png"><br/>Please wait while we redirect you to old kaskus ...<br/><br/><br/><br/><small><a href="http://www.andresusanto.com/" target="_blank">Visit Andre\'s Web Page!</a></small></center>';
			var tid = parseInt(value,10);
			setTimeout(function() {
				switch (stes) {
					case "thread"		: window.location.href = "http://www.kaskus.co.id/showthread.php?t=" + tid; break;
					case "post"			: window.location.href = "http://www.kaskus.co.id/showthread.php?p=" + tid; break;
					case "show_post"	: window.location.href = "http://www.kaskus.co.id/showpost.php?p=" + tid; break;
					case "forum"		: window.location.href = "http://www.kaskus.co.id/forumdisplay.php?f=" + tid; break;
					case "group"		: 
						if (value == "discussion") {
							var gid = parseInt(nostp.split('/')[4],10);
							window.location.href = "http://www.kaskus.co.id/group.php?do=discuss&discussionid=" + gid;
						}else{ 	window.location.href = "http://www.kaskus.co.id/group.php?groupid=" + tid;	}break;
					case "reputation"	: window.location.href = "http://www.kaskus.co.id/reputation.php?p=" + tid; break;
					case "profile"		: 
						if (tid){ window.location.href = "http://www.kaskus.co.id/member.php?u=" + tid;
						}else{
							var gid = parseInt(nostp.split('/')[3],10);
							window.location.href = "http://www.kaskus.co.id/member.php?u=" + gid;
						}break;
				}
			}, 1500);
		}

	}
});

// copyLEFT (c) 2012 Andre Susanto