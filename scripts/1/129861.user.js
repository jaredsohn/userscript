// ==UserScript==
// @author         laom32
// @version        0.1
// @name           Remover Timeline
// @namespace      laom_32_@_hotmail_._com
// @description    Remove timeline from Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @scriptsource   http://userscripts.org/scripts/show/8228
// ==/UserScript==

/*
++++++++++++++++++++++++++++
Version: 1.6  			   |
++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
This is youlikehits.com iMacros script. Script is fully automated, so it will not freeze   |
when FB page was liked before (and there is no like button) etc. It counts liked and       |
skipped pages (it automaticly skips page when ylh has problem veryfing like, or when       |
page was liked on that FB account before), and displays it in real time. It also counts    |
errors. You can tune max_errors variable. If max_errors is reached then script stops.      |
Script also recognizes captchas using my own ylh captcha recognition system. To recognize  |
captchas using my system you need to have KEY. You can get it from me for some $, just     |
send me an email. 																		   |
																						|
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++
Script written by b1czu	 	 |
email: b1czuu@gmail.com 	 |
jabber/gtalk: b1czu@chrome.pl|
skype: biczu1014			 |
							|
++++++++++++++++++++++++++++++

*/



/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Here are user-configurable options. Tune them to your need.  |
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

//This var sets the amount of errors, when script should stop.
//Default: 100
var max_errors = 1000

//This var sets how many seconds to wait between clicks, when starting script or recovering
//from error by opening ylh site, and clicking facebook and then like.
//Default: 3
var ylh_start_wait = 3

//This var sets how many seconds to wait before clicking "Like ..." on youlikehits.
//Default: 3
var ylh_before_like_wait = 2


//This var sets how many seconds to wait bafter clicking "Like" button on FB.
//Default: 0.5
var fb_after_like_wait = 0.5

//This var sets if script should try to recognize captchas. IF SET TO 1 YOU NEED TO HAVE SET
//KEY IN NAXT VAR! If you dont have key and dont wanna to buy it set it to 0, and likes with
//captcha will be skipped.
//Default: 0
var captcha_recognize = 1

//Paste here your captcha recognition key. It makes effect only if previous var is set to 1.
//Default: ''
var captcha_recognize_key = ''


//Enter your temporary directory where captchas will be saved. Firefox must have rights to save in 
//this dir! You can test it by opening any  site in FF and select Save As from menu and point to
//this dir. Try to avoid dirs with spaces in their names! You need to provide path with the ending
// / or \ depending on your system, or it won't work! WINDOWS USERS NEED TO USE BACKSLASHES TWICE!!! 
//I will show you some examples
// Windows user: 'C:\\imacros\\bot_1\\ylh_temp\\'
// MAC user: '/Users/XXX/Documents/ylhbot/'
// Linux user: '/home/XXX/ylhbot/'
var captcha_temporary_directory_path = ''


/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
DO NOT MODIFY ANYTHING BELOW THAT LINE UNTIL YOU KNOW WHAT YOU'RE DOING!!!  |
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/




var error_count = 0
var error = false
var master_error = false
var likes = 0
var captchas = 0
var skipped = 0
var lsr = 0
var last_link
var actual_link

//This var sets if script should redirect to m.facebook (a lot of fanpages are overloaded with
// shit, and mobile version loads faster). DO NOT CHANGE THIS
//Default: 1
var fb_redirect_to_mobile = 1


function start_over() {
	var ylh_start = "CODE:";
	ylh_start += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_start += "TAB CLOSEALLOTHERS" + "\n";
	ylh_start += "TAB OPEN" + "\n";
	ylh_start += "TAB OPEN" + "\n";
	ylh_start += "TAB T=3" + "\n";
	ylh_start += "URL GOTO=http://www.youlikehits.com/" + "\n";
	ylh_start += "SET !TIMEOUT_STEP 15" + "\n";
	//ylh_start += "WAIT SECONDS=" + ylh_start_wait + "\n";
	ylh_start += "TAG POS=1 TYPE=A ATTR=TXT:Facebook" + "\n";
	ylh_start += "SET !TIMEOUT_STEP 25" + "\n";
	ylh_start += "WAIT SECONDS=" + ylh_start_wait + "\n";
	ylh_start += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
	ylh_start += "SET !TIMEOUT_STEP 25" + "\n";
	ylh_start += "WAIT SECONDS=0.2" + "\n";
	

	var ret = iimPlay(ylh_start)
	if (ret == 1) {
		return true
	}
	else {
		return false
	}

}

function click_fb_like_on_ylh() {
	var ylh_like = "CODE:";
	ylh_like += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_like += "TAB T=1" + "\n";
	ylh_like += "SET !TIMEOUT_STEP 55" + "\n";
	ylh_like += "WAIT SECONDS=" + ylh_before_like_wait + "\n";
	ylh_like += "FRAME F=5" + "\n";
	ylh_like += "TAG POS=1 TYPE=SPAN ATTR=CLASS:liketext" + "\n";
	ylh_like += "WAIT SECONDS=2" + "\n";
	ylh_like += "FRAME F=0" + "\n";
	

	var ret = iimPlay(ylh_like)
	if (ret == 1) {
		return true
		}
		else {
			return false
		}

}
	
function problems_check()
{

	var windowObject = window.content;
	var zaw = content.document.body.innerHTML;
	var keywords=new Array();
	keywords[0]="Make sure your account is completely open to the Public and no Privacy settings set";
	keywords[1]="is wrong with the page";
	keywords[2]="took longer than 90 seconds to finish";
	var zapRE = /\<[a-z][^\>]*\>/ig;
	zaw = zaw.replace(zapRE,"");
	zaw = zaw.toLowerCase();
	//alert(zaw);
	// now search for you key strings:
	for ( var k = 0; k < 3; k++ )
	{
		var kwRE = /\<[a-z][^\>]*\>/ig;
		var kw = keywords[k];
		kw = kw.replace(zapRE,"");
		kw = kw.toLowerCase();
		//alert(kw);
		if ( zaw.indexOf(kw) >= 0 )
		{
			return true;
		}
		
	}
	return false;

}
	
/*function goto_fb_mobile(murl) {
	var fb_goto_url = "CODE:";
	fb_goto_url += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	fb_goto_url += "TAB T=1" + "\n";
	fb_goto_url += "SET !TIMEOUT_STEP 55" + "\n";
	fb_goto_url += "URL GOTO={{MURL}}" + "\n";
	if (fb_redirect_to_mobile == 1) {
		iimSet("MURL",murl)
		var ret = iimPlay(fb_goto_url)
		if (ret == 1) {
			return true
		}
		else {
			return false
		}
	}
	else {
		return true
	}
}
*/
/*function click_fb_like() {
	if (fb_redirect_to_mobile ==1){
		var fb_click_like = "CODE:";
		fb_click_like += "TAB T=1" + "\n";
		fb_click_like += "SET !TIMEOUT_STEP 20" + "\n";
		fb_click_like += "TAG POS=1 TYPE=A ATTR=SRC:http://static.ak.fbcdn.net/rsrc.php/v1/yj/r/frl7jyXL3H9.png" + "\n";
		fb_click_like += "WAIT SECONDS=" + fb_after_like_wait + "\n";
		fb_click_like += "TAB CLOSE" + "\n";

		var ret = iimPlay(fb_click_like)
		if (ret == 1) {
			return true
		}
		else {
			return false
		}
	}

	else{
		var fb_click_like = "CODE:";
		fb_click_like += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
		fb_click_like += "TAB T=1" + "\n";
		fb_click_like += "SET !TIMEOUT_STEP 5" + "\n";
		fb_click_like += "TAG POS=1 TYPE=I ATTR=CLASS:mrs<SP>img<SP>sp_4m1rvz<SP>sx_e62320" + "\n";
		fb_click_like += "WAIT SECONDS=" + fb_after_like_wait + "\n";
		fb_click_like += "TAB CLOSE" + "\n";

		var ret = iimPlay(fb_click_like)
		if (ret == 1) {
			return true
		}
		else {
			return false
		}
	}
} */

 function click_ylh_confirm() {
	var ylh_click_liked = "CODE:";
	ylh_click_liked += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_click_liked += "TAB T=1" + "\n";
	ylh_click_liked += "SET !TIMEOUT_STEP 3" + "\n";
	ylh_click_liked += "TAG POS=1 TYPE=A ATTR=ONCLICK:checkDoesLike();" + "\n";
	ylh_click_liked += "WAIT SECONDS=3" + "\n";

	var ret = iimPlay(ylh_click_liked)
	if (ret == 1) {
		likes = likes +1
		return true
	}
	else if (ret == -921) {
		//ylh ma mula albo captcha detected!
		return ret
		// CODE RED CODE RED!
	}
	else {
		return false
	}

} 

function captcha_type_recognize(){

	var windowObject = window.content;
	var zaw = content.document.body.innerHTML;
	var keywords=new Array();
	keywords[0]="Verify Your Like By Clicking The Correct Color!";
	keywords[1]="Verify Your Like By Clicking The Matching Code!";
	var zapRE = /\<[a-z][^\>]*\>/ig;
	zaw = zaw.replace(zapRE,"");
	zaw = zaw.toLowerCase();

	// now search for you key strings:
	for ( var k = 0; k < keywords.length; ++k )
	{
		var kw = keywords[k].toLowerCase();
		if ( zaw.indexOf(kw) >= 0 )
		{
			return k;
		}
		else {
			return false;
		}
	}


}

function anty_ylh_loop(){
var ylh_loop = "CODE:";
ylh_loop += "TAB T=1" + "\n";
ylh_loop += "TAG POS=1 TYPE=IFRAME ATTR=SRC:http://www.nullrefer.com* EXTRACT=HREF" + "\n";

	var ret = iimPlay(ylh_loop)
	if (ret == 1) {
			actual_link = iimGetLastExtract(1)
			if (actual_link == last_link) {
				last_link = actual_link;
				return true;
				//zwroc prawde jeżeli aktualny link jest identyczny jak poprzedni
			}
			else {
				last_link = actual_link;
				return false;
				//w przeciwnym wypadku zwroc falsz
			}
	}
	else {
			
			return false
		}

}

function ylh_captcha() {
	var ylh_captcha = "CODE:";
	ylh_captcha += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_captcha += "TAB T=1" + "\n";
	ylh_captcha += "SET !ERRORIGNORE YES" + "\n";
	ylh_captcha += "SET !ERRORIGNORE NO" + "\n";
	ylh_captcha += "ONDOWNLOAD FOLDER=" + captcha_temporary_directory_path + " FILE={{TS}}.jpg" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=IMG ATTR=SRC:http://www.youlikehits.com/fbcaptcha.php* CONTENT=EVENT:SAVEITEM" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=BUTTON ATTR=TXT:* EXTRACT=TXT" + "\n";
	ylh_captcha += "SET !VAR1 {{!EXTRACT}} " + "\n";
	ylh_captcha += "SET !EXTRACT NULL" + "\n";
	ylh_captcha += "TAG POS=2 TYPE=BUTTON ATTR=TXT:* EXTRACT=TXT" + "\n";
	ylh_captcha += "SET !VAR2 {{!EXTRACT}} " + "\n";
	ylh_captcha += "SET !EXTRACT NULL" + "\n";
	ylh_captcha += "TAG POS=3 TYPE=BUTTON ATTR=TXT:* EXTRACT=TXT" + "\n";
	ylh_captcha += "SET !VAR3 {{!EXTRACT}} " + "\n";
	ylh_captcha += "SET !EXTRACT NULL" + "\n";
	ylh_captcha += "TAB OPEN" + "\n";
	ylh_captcha += "TAB T=2" + "\n";
	ylh_captcha += "URL GOTO=http://kasprzakownia.pl/captcha/captcha.php" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:TEXT ATTR=NAME:key1 CONTENT={{!VAR1}}" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:TEXT ATTR=NAME:key2 CONTENT={{!VAR2}}" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:TEXT ATTR=NAME:key3 CONTENT={{!VAR3}}" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:HIDDEN ATTR=NAME:pass CONTENT=" + captcha_recognize_key + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:FILE ATTR=NAME:uploadedfile CONTENT=" + captcha_temporary_directory_path + "{{TS}}.jpg" + "\n";
	ylh_captcha += "WAIT SECONDS=1" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=NAME:submit" + "\n";
	ylh_captcha += "WAIT SECONDS=1" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=BODY ATTR=TXT:* EXTRACT=TXT" + "\n";
	ylh_captcha += "SET !ERRORIGNORE YES" + "\n";
	ylh_captcha += "FILEDELETE NAME=" + captcha_temporary_directory_path + "{{TS}}.jpg" + "\n";
	ylh_captcha += "SET !ERRORIGNORE NO" + "\n";
	ylh_captcha += "TAB CLOSE" + "\n";
	ylh_captcha += "TAB T=1" + "\n";
	ylh_captcha += "SET !TIMEOUT_STEP 6" + "\n";
	ylh_captcha += "WAIT SECONDS=1" + "\n";
	ylh_captcha += "TAG POS=1 TYPE=BUTTON ATTR=TXT:{{!EXTRACT}}" + "\n";
	ylh_captcha += "WAIT SECONDS=2" + "\n";


	iimSet("TS",Math.round((new Date()).getTime() / 1000))
	var ret = iimPlay(ylh_captcha)
	if (ret == 1) {
		likes = likes +1
		captchas = captchas + 1
		
		return true
	}
	else {
		return false
	}
}

function ylh_color_captcha() {
	var ylh_color_captcha = "CODE:";
	ylh_color_captcha += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_color_captcha += "TAB T=1" + "\n";
	ylh_color_captcha += "SET !ERRORIGNORE YES" + "\n";
	ylh_color_captcha += "SET !ERRORIGNORE NO" + "\n";
	ylh_color_captcha += "ONDOWNLOAD FOLDER=" + captcha_temporary_directory_path + " FILE={{TS}}.jpg" + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=IMG ATTR=SRC:http://www.youlikehits.com/fbcaptcha.php* CONTENT=EVENT:SAVEITEM" + "\n";
	ylh_color_captcha += "TAB OPEN" + "\n";
	ylh_color_captcha += "TAB T=2" + "\n";
	ylh_color_captcha += "URL GOTO=http://kasprzakownia.pl/captcha/color_captcha.php" + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=INPUT:HIDDEN ATTR=NAME:pass CONTENT=" + captcha_recognize_key + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=INPUT:FILE ATTR=NAME:uploadedfile CONTENT=" + captcha_temporary_directory_path + "{{TS}}.jpg" + "\n";
	ylh_color_captcha += "WAIT SECONDS=1" + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=NAME:submit" + "\n";
	ylh_color_captcha += "WAIT SECONDS=1" + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=BODY ATTR=TXT:* EXTRACT=TXT" + "\n";
	ylh_color_captcha += "SET !ERRORIGNORE YES" + "\n";
	ylh_color_captcha += "FILEDELETE NAME=" + captcha_temporary_directory_path + "{{TS}}.jpg" + "\n";
	ylh_color_captcha += "SET !ERRORIGNORE NO" + "\n";
	ylh_color_captcha += "TAB CLOSE" + "\n";
	ylh_color_captcha += "TAB T=1" + "\n";
	ylh_color_captcha += "SET !TIMEOUT_STEP 6" + "\n";
	ylh_color_captcha += "TAG POS=1 TYPE=A ATTR=TXT:{{!EXTRACT}}" + "\n";
	ylh_color_captcha += "WAIT SECONDS=2" + "\n";


	iimSet("TS",Math.round((new Date()).getTime() / 1000))
	var ret = iimPlay(ylh_color_captcha)
	if (ret == 1) {
		likes = likes +1
		captchas = captchas + 1
		
		return true
	}
	else {
		return false
	}

}

function click_ylh_skip() {
	var ylh_click_skip = "CODE:";
	ylh_click_skip += "VERSION BUILD=7401110 RECORDER=FX" + "\n";
	ylh_click_skip += "TAB t=1" + "\n";
	//ylh_click_skip += "TAB CLOSE" + "\n";
	ylh_click_skip += "SET !TIMEOUT_STEP 15" + "\n";
	ylh_click_skip += "TAG POS=1 TYPE=A ATTR=TXT:Skip<SP>this<SP>Page" + "\n";
	ylh_click_skip += "WAIT SECONDS=3" + "\n";
	
	//alert('SKIP!');
	var ret = iimPlay(ylh_click_skip)
	if (ret == 1) {
		skipped = skipped + 1
		return true
	}
	else {
		return false
	}
}


function like_skip_ratio(l,s) {
	if (s == 0) {
		return 0
	}
	else {
		ls = l / s
		ls = ls.toPrecision(2)
		return ls
		
	}
}



while(!master_error){

	iimDisplay('Starting...\nErrors: ' + error_count + ' / '+ max_errors + '\nLiked: ' + likes + '\nSkipped: ' + skipped + '\nL/S Ratio: ' + lsr + '\nCaptchas: ' + captchas)
	if (start_over()) {
		error = false

		while(!error){
	lsr = like_skip_ratio(likes,skipped)
	iimDisplay('Working...\nErrors: ' + error_count + ' / '+ max_errors + '\nLiked: ' + likes + '\nSkipped: ' + skipped + '\nL/S Ratio: ' + lsr + '\nCaptchas: ' + captchas)
	//murl = click_ylh_like_export_fb_murl()
	
	if (click_fb_like_on_ylh() ) {
				

					var ctr = captcha_type_recognize()
					//alert(ctr);
						if (ctr == false)
								{
								// jedziemy dalej
								if(anty_ylh_loop()==false){
								if(!click_ylh_confirm()){
								//alert('Skip ylh confirm');
								if (!click_ylh_skip()){
											error = true
										}
										
								}
								var pc = problems_check();
								//alert(pc);
								if(pc==true){
								//alert('Skip problems_check');
								likes = likes-1;
								if (!click_ylh_skip()){
											
											error = true
										}
										
								}
								//likes = likes +1
								}
								else {
								//alert('anti loop zadzialal wlasnie teraz')
								if (!click_ylh_skip()){
											
											error = true
										}
								}
								}
						else if (ctr == 1){
									//text-captcha
									
									if (ylh_captcha()) {
										// jedziemy dalej
									}
									
									else {
										if (!click_ylh_skip()){
											error = true
										}
									}
								}
								else if (ctr == 0){
									//color-captcha
									if (ylh_color_captcha()) {
										// jedziemy dalej
									}
									
									else {
										if (!click_ylh_skip()){
											error = true
										}
									}
								}
								
								
								else {
									error = true
								}
								
						

			
		}
		else {
		if (!click_ylh_skip()){
				error = true
			}
		}
	}

			error_count = error_count + 1

			if (error_count >= max_errors) {
				master_error = true
			}
		}

	}
	iimDisplay('Stopped...\nErrors: ' + error_count + ' / '+ max_errors + '\nLiked: ' + likes + '\nSkipped: ' + skipped + '\nL/S Ratio: ' + lsr + '\nCaptchas: ' + captchas)
	alert('Stopped...: ' + error_count + ' errors / ' + max_errors + ' max errors.');
