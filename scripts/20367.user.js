/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Windows Live Messenger Web Extended
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/20367
// @description     Windows Live Messenger Web Extended v1.7 Beta
// @copyright       2007 - 2008 Jerone
// @version         v1.7 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         *
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Info
// - Note
// - Framework Check
// - User Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 16-01-2008 15:00 [v1 Alpha]:
//   [+] initial release;
// - 16-01-2008 16:00 [v1.1 Beta]:
//   [*] cleaned up code;
// - 20-01-2008 14:00 [v1.2 Beta]:
//   [*] cleaned up code;
// - 30-05-2008 19:00 [v1.3 Beta]:
//   [/] fixed framework check;
// - 27-07-2008 13:00 [v1.4 Beta]:
//   [/] fixed bug with url and emoticons;
// - 27-07-2008 17:00 [v1.4.1 Beta]:
//   [/] fixed multiple mailto;
// - 27-07-2008 19:00 [v1.5 Beta]:
//   [+] added strike through (s);
// - 28-07-2008 12:00 [v1.5.1 Beta]:
//   [*] updated to latest US_functions;
// - 10-08-2008 13:00 [v1.5.2 Beta]:
//   [*] cleaned up code;
// - 24-11-2008 01:30 [v1.6 Alpha]:
//   [+] added settings window;
//   [/] fixed small bug in framework check;
// - 10-01-2009 19:30 [v1.7 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - problem with inheritens of multiple ubbcode;
// - closing of defined colors first, e.g.: [/c=4];
// - submit() visitor name;
// - style links possible;
// - convert button also (+ title);
// - www and mail have to have their own loop;
// - bug with closing DP;
////////////////////////////////////////////////////////////////////////////
// Info:
// - BBcode converter: http://www.msghelp.net/showthread.php?tid=65950&pid=726552#pid726552
// - Test page: http://settings.messenger.live.com/Conversation/IMMe.aspx?invitee=65013641c1f7ceaf%40apps.messenger.live.com
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work with it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm("Something went wrong with the US Framework. \nMake sure it is installed correctly or reinstall the script. \n\nDo you want to go to the scripts homepage?"))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

var language=new US.Language({langMod:"browser",locals:{
	'en':{
		'WLMW':{
			'convertUBB'	: 'Convert all UBB-code to real HTML.',
			'convertLink'	: 'Make links clickable.',
			'convertMail'	: 'Make e-mails clickable.',
			'showDPimg'		: 'Show DisplayPictures.',
			'showDPimgHelp'	: 'To show DisplayPictures, the window must be at least 380px high and 280px width.',
			'showDPbtn'		: 'Show a button to hide/show the DisplayPictures.',
			'showToolBar'	: 'Show toolbar with emoticons, buzzer and font change buttons.',
			'showBlockBtn'	: 'Show block contact button.',
			'showBlockHelp'	: 'Doesn\'t do anything usefull yet and couses some problems.',
			'visitorName'	: 'Name for signing in anonymous:',

			'resetConfirm'	: "This will reset all settings you\'ve made on all tabs!\n\nAre you sure you want to reset all settings?",
			'pagerefresh'	: 'Changes take only place after a page <a href="javascript:top.window.location.reload(true)">refresh</a>!',
			'help'			: 'Help'}},
	'nl':{'WLMW':{'convertUBB':'Converteer alle UBB-code naar HTML.','convertLink':'Maak links klikbaar.','convertMail':'Maak e-mails klikbaar.','showDPimg':'DisplayPictures weergeven.','showDPimgHelp':'Om DisplayPictures weer te geven, moet het venster minimaal 380px hoog en 280px breed zijn.','showDPbtn':'Een knop om DisplayPictures weer te geven/verbergen toevoegen.','showToolBar':'Toolbar met emoticons, buzzer en font veranderen knoppen weergeven.','showBlockBtn':'Blokkeer contact knop weergeven.','showBlockHelp':'Doet nog niets zinnigs en zorgt voor problemen.','visitorName':'Naam om anoniem in te loggen:','resetConfirm':"Dit zal alle instellingen op alle tabbladen herstellen!\n\nWeet u zeker dat u alle instellingen wilt herstellen?",'pagerefresh':'Veranderingen zullen alleen plaats vinden na het <a href="javascript:top.window.location.reload(true)">vernieuwen</a> van de pagina!','help':'Help'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"Windows Live Messenger Web Extended",thisVersion:'v1.7 Beta',versionUrl:20367,updateUrl:20367,});



//*** USER SETTINGS ***//
const convertUBBDefault		= true;			// [Boolean] converts all UBBcode to real HTML;
const convertLinkDefault	= true;			// [Boolean] make links clickable;
const convertMailDefault	= true;			// [Boolean] make e-mails clickable
	
const showDPimgDefault		= true;			// [Boolean] shows DisplayPictures;
											// Note: to show DisplayPictures, the window must be at least 380px high and 280px width;
const showDPbtnDefault		= true;			// [Boolean] show a button to hide/show the DisplayPictures;
	
const showToolBarDefault	= true;			// [Boolean] show toolbar with emoticons, buzzer and font change buttons;
const showBlockBtnDefault	= false;		// [Boolean] show block contact button;
											// Note: Doesn't do anything usefull yet and couses some problems;

const visitorNameDefault	= "MyName";		// [String][^false] name for signing in anonymous;
 


//*** USER SCRIPT ***//
var WLMW={
	msgPlusColors: ["ffffff","000000","00007f","009300","ff0000","7f0000","9c009c","fc7f00","ffff00","00fc00","009393","00ffff","0000fc","ff00ff","7f7f7f","d2d2d2","e7e6e4","cfcdd0","ffdea4","ffaeb9","ffa8ff","b4b4fc","bafbe5","c1ffa3","fafda2","b6b4b7","a2a0a1","f9c152","ff6d66","ff62ff","6c6cff","68ffc3","8eff67","f9ff57","858482","6e6d7b","ffa01e","f92611","ff20ff","202bff","1effa5","60f913","fff813","5e6464","4b494c","d98812","eb0505","de00de","0000d3","03cc88","59d80d","d4c804","333335","18171c","944e00","9b0008","980299","01038c","01885f","389600","9a9e15","473400","4d0000","5f0162","000047","06502f","1c5300","544d05"],
	UBBlbls: ["pnlStatusBar","pnlConversation","lblDisplayName"],
	notYetDone1: true,
	notYetDone2: true,

	init: function(){
		WLMW.loadSettings();
		if($xs("//iframe[contains(@src,'http://settings.messenger.live.com/Conversation/IMMe.aspx')]")  // settings window can't be opened from an iframe :(
				 || location.href.match("http://settings.messenger.live.com/Conversation/IMMe.aspx")){  // or when WLMW is full screen opened;
			WLMW.loadSettingsWindow();
		}

		if($gi("pnlHeader") && $gi("pnlOptions") && $gi("pnlBody") && $gi("pnlUserTiles")){
			if(copyM=$xs("/html/body/div[11]/div[3]")){
				var copyJ = $ce("DIV");
				$ih(copyJ,'&copy; <a href="http://jervw.freehostia.com">Jerone</a> [<a href="http://userscripts.org/scripts/show/20367">v1.6 Alpha</a>]');
				$sa(copyJ,"class","WLM_Menu_Element");
				$sa(copyJ,"id","copyJ");
				$ac(copyM,copyJ);
			}
			WLMW.doUBB();
	}	},

	doUBB: function(){
		$w.setTimeout(function(){
			if(WLMW.convertUBB){
				WLMW.changeUBB();
			}
			$w.setInterval(function(){
				if($gi("btnHideUserTiles") && $gi("pnlUserTiles") && $gi("pnlBody") && WLMW.showDPbtn){
					if(Window.$height(true)>=380 && Window.$width(true)>=280){
						$hs($gi("btnHideUserTiles"),1);  // show dp-button
						if(WLMW.showDPimg){
							$hs($gi("pnlUserTiles"),1);  // show dp
							$sa($gi("pnlBody"),"style","display: block; margin-right: 145px;");
						}
						WLMW.notYetDone2 = true;
					}
					else if(WLMW.notYetDone2){  // window is too small!
						$hs($gi("btnHideUserTiles"),0);  // hide dp-button
						$hs($gi("pnlUserTiles"),0);  // hide dp
						WLMW.notYetDone2 = false;
				}	}
				if($gi("pnlToolBar") && $gi("pnlHistory") && WLMW.showToolBar){
					$hs($gi("pnlToolBar"),1);  // show paneltoolbar
					if(WLMW.notYetDone1){
						var oldStyle = $ga($gi("pnlHistory"),"style").toString().replace(/height:\s*\d+px;/,"");
						var oldHeight = parseInt($getStyle($gi("pnlHistory"),"height")) - 26;
						$sa($gi("pnlHistory"),"style",oldStyle + "height:" + oldHeight.toString() + "px;");
						WLMW.notYetDone1 = false;
				}	}
				if($gi("btnBlockBuddy") && $gi("pnlBody") && WLMW.showBlockBtn){
					if($hs($gi("btnBlockBuddy"),0,true)){
						$hs($gi("btnBlockBuddy"),1);  // show block contact
					}
					var oldStyle = $ga($gi("pnlBody"),"style").toString().replace(/margin-right:\s*\d+px;/,"");
					var oldMarginR = parseInt($getStyle($gi("pnlBody"),"margin-right")) - 45;
					$sa($gi("pnlBody"),"style",oldStyle + "margin-right: 100px;");
				}
				if($gi("tbSetUserName") && WLMW.visitorName && $hs($gi("tbSetUserName"),1,true)){
					$gi("tbSetUserName").value = WLMW.visitorName;  // fill in name
				}
				if(WLMW.convertUBB){
					WLMW.changeUBB();
				}
			},1000);
		},1000);
	},

	changeUBB: function(){
		for(var i=0; i<WLMW.UBBlbls.length;i++){
			if($gi(WLMW.UBBlbls[i])){
				while(/\[[abcisu](=.*)?\]/.test($gi(WLMW.UBBlbls[i]).innerHTML)){
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(/\[b\](.*?)\[\/b\]/i,'<strong style="color:inherit;background-color:inherit;">$1</strong>');
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(/\[i\](.*?)\[\/i\]/i,'<em style="color:inherit;background-color:inherit;">$1</em>');
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(/\[u\](.*?)\[\/u\]/i,'<u style="color:inherit;background-color:inherit;">$1</u>');
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(/\[s\](.*?)\[\/s\]/i,'<strike style="color:inherit;background-color:inherit;">$1</strike>');
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(
						/(((mailto:)?|(title=['"])?)([\w.-]+@[\w.-]+\.\w+))/g,  // mailto
						function(m0, m1, m2, m3, m4, m5, m6){
							if(!(m0.match("mailto:")) && !(m0.match("title="))){
								return '<a href="mailto:' + m5 + '" title="' + m5 + '">' + m5 + '</a>';
							}
							else return m0;
					}	);
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(
						/(((src=['"])?|(href=['"])?|(title=['"])?)(http:\/\/+[\w\/\-%&#=.,?+$]+))/g,  // www
						function(m0, m1, m2, m3, m4, m5, m6){
							if(!(m0.match("src=")) && !(m0.match("href=")) && !(m0.match("title="))){
								return '<a href=\"' + m6 + '\" title=\"' + m6 + '\">' + m6 + '</a>';
							}
							else return m0;
					}	);
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(
						/\[c=(\d{1,2}|#[0-9a-fA-F]{6}(?=.{0,53}))\](.*?)\[\/c(?:=(\d{1,2}|#[0-9A-F]{6}(?=.{0,53})))?\]/gi,  // color
						function(m0, m1, m2, m3, m4, m5){
							// m0 = the complete substring that matched;
							// m1 = capture 1: color value in the opening tag ([c=?]);
							// m2 = capture 2: text between the color tags;
							// m3 = capture 3: color value in the closing tag ([/c=?]);
							// m4 = the offset where the match (m0) occured;
							// m5 = entire string object;
							// console.log([m0,m1,m2,m3,m4,m5.length].join('\n'));
							var regExp1 = /#[0-9a-fA-F]{6}/i;
							var regExp2 = /^\d$/i;
							if(regExp1.test(m1)){
								m1 = m1;
							}
							else if(regExp2.test(m1)){
								m1 = "#"+WLMW.msgPlusColors[m1];
							}
							else {
								m1 = "red";
							}
							return '<span style="color:' + m1 + ';background-color:inherit;">' + m2 + '</span>';
					}	);
					$gi(WLMW.UBBlbls[i]).innerHTML = $gi(WLMW.UBBlbls[i]).innerHTML.replace(
						/\[a=(\d{1,2}|#[0-9a-fA-F]{6}(?=.{0,53}))\](.*?)\[\/a(?:=(\d{1,2}|#[0-9A-F]{6}(?=.{0,53})))?\]/gi,  // background color
						function(m0, m1, m2, m3, m4, m5){
							var regExp1 = /#[0-9a-fA-F]{6}/i;
							var regExp2 = /^\d$/i;
							if(regExp1.test(m1)){
								m1 = m1;
							}
							else if(regExp2.test(m1)){
								m1 = "#"+WLMW.msgPlusColors[m1];
							}
							else {
								m1 = "red";
							}
							return '<span style="color:inherit;background-color:' + m1 + ';">' + m2 + '</span>';
				}	);	}
				$sa($gi(WLMW.UBBlbls[i]),"style",'font-weight:normal; color:black; background-color:transparent;');
	}	}	},

	helpImg: "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCCAA==",

	// SETTINGS
	settingsWindowName: "WLMW",
	settingsWindowNode: function(){return $gi("USOwindow_"+WLMW.settingsWindowName,top.document).contentDocument},
	loadSettingsWindow: function(){
		var settingsContent=<><![CDATA[
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><title>WLMweb Settings Window</title>
									<style type="text/css">
									/* common */ body{color:CaptionText;font-family:Tahoma,Verdana,Arial;font-size:10pt;}input[type=checkbox]{margin:0px;}fieldset{border:1px solid ThreeDShadow;padding:5px 8px 10px 8px;}select option{height:16px;}a{color:#0088FF;}input[type=text],input[type=number]{border:1px solid ThreeDShadow;padding:2px 1px;}.USOinp{}.USObtn{}.required{background:Menu top right no-repeat url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHklEQVQImWP4z8DwHx0DSSDGKogmgRBEkkAVhEoAAKhbO8Uz7uXSAAAAAElFTkSuQmCCAA==")}
									/*   tabs */ #USOtabs{display:table;width:100%;min-width:444px;height:24px;}.USOtab{display:inline;background:none;padding:5px 15px;border:1px solid ThreeDShadow;border-bottom:1px solid ThreeDShadow;margin-right:-1px;margin-bottom:-1px;float:left;font-size:8pt;font-weight:normal;font-style:normal;text-decoration:none;color:CaptionText;cursor:pointer;}.USOtab:hover{background:Highlight;color:HighlightText;}.USOtabActive{background:ActiveCaption;color:CaptionText;border-bottom:1px solid transparent;float:left;font-weight:bold;}
									/* fields */ #USOfields{padding:15px 10px 12px 10px;border:1px solid ThreeDShadow;border-bottom:0px none;min-width:422px;}
									/*   note */ #USOnote{border-left:1px solid ThreeDShadow;border-right:1px solid ThreeDShadow;background:none;padding:0px 11px 11px 11px;}
									/* submit */ #USOsubmit{border:1px solid ThreeDShadow;border-top:0px none;background:none;text-align:right;padding:0px 11px 11px 11px;min-width:420px;}#USOsubmit input{width:67px;font-size:11px;padding:2px;}</style></head></style></head>
								<body>
									<div id="USOtabs"></div>
									<div id="USOfields">
										<fieldset id="USOfield1">
											<legend>]]></>.toString()+language.localise(["common","options"])+<><![CDATA[</legend>
											<table width="400px" border="0" cellspacing="0" cellpadding="2"><tr><td colspan="2"><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle" width="20px">
												<input name="WLMWconvertUBB" type="checkbox" id="WLMWconvertUBB" class="USOinp" value="WLMWconvertUBB" /></td><td valign="middle" width="100%" colspan="2"><label for="WLMWconvertUBB">]]></>.toString()+language.localise(["WLMW","convertUBB"])+<><![CDATA[</label></td></tr><tr><td valign="middle" width="20px">
												<input name="WLMWconvertLink" type="checkbox" id="WLMWconvertLink" class="USOinp" value="WLMWconvertLink" /></td><td valign="middle" width="100%" colspan="2"><label for="WLMWconvertLink">]]></>.toString()+language.localise(["WLMW","convertLink"])+<><![CDATA[</label></td></tr><tr><td valign="middle" width="20px">
												<input name="WLMWconvertMail" type="checkbox" id="WLMWconvertMail" class="USOinp" value="WLMWconvertMail" /></td><td valign="middle" width="100%" colspan="2"><label for="WLMWconvertMail">]]></>.toString()+language.localise(["WLMW","convertMail"])+<><![CDATA[</label></td></tr><tr><td valign="middle" colspan="3"><hr /></td></tr><tr><td valign="middle">
												<input name="WLMWshowDPimg" type="checkbox" id="WLMWshowDPimg" class="USOinp" value="WLMWshowDPimg" /></td><td valign="middle" width="100%" colspan="2"><label for="WLMWshowDPimg">]]></>.toString()+language.localise(["WLMW","showDPimg"])+<><![CDATA[&nbsp;<img src="]]></>.toString()+WLMW.helpImg+<><![CDATA[" class="help" alt="help" name="helpImg1" width="16" height="16" title="]]></>.toString()+language.localise(["WLMW","showDPimgHelp"])+<><![CDATA[" /></label></td></tr><tr><td valign="middle" colspan="3"><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle" style="padding-left:10px;">
												<input name="WLMWshowDPbtn" type="checkbox" id="WLMWshowDPbtn" class="USOinp" value="WLMWshowDPbtn" /></td><td valign="middle" width="100%"><label for="WLMWshowDPbtn">]]></>.toString()+language.localise(["WLMW","showDPbtn"])+<><![CDATA[</label></td><td valign="middle" align="right"><img src="http://www.wlmessenger.net/static/2008r1/Conversation/img/Hide_button_down.gif" alt="WLMWshowDPbtn" /></td></tr></table></td></tr><tr><td valign="middle" colspan="3"><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle">
												<input name="WLMWshowToolBar" type="checkbox" id="WLMWshowToolBar" class="USOinp" value="WLMWshowToolBar" /></td><td valign="middle" width="100%"><label for="WLMWshowToolBar">]]></>.toString()+language.localise(["WLMW","showToolBar"])+<><![CDATA[</label></td><td valign="middle" align="right" nowrap="nowrap"><img src="http://www.wlmessenger.net/static/2008r1/Conversation/img/Emoticons_button_down.gif" alt="WLMWemo" /><img src="http://www.wlmessenger.net/static/2008r1/Conversation/img/Nudge_button_down.gif" alt="WLMWnudge" /><img src="http://www.wlmessenger.net/static/2008r1/Conversation/img/Font_button_down.gif" alt="WLMWfont" /></td></tr></table></td></tr><tr><td valign="middle" colspan="3"><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle">
												<input name="WLMWshowBlockBtn" type="checkbox" id="WLMWshowBlockBtn" class="USOinp" value="WLMWshowBlockBtn" /></td><td valign="middle" width="100%"><label for="WLMWshowBlockBtn">]]></>.toString()+language.localise(["WLMW","showBlockBtn"])+<><![CDATA[&nbsp;<img src="]]></>.toString()+WLMW.helpImg+<><![CDATA[" class="help" alt="help" name="helpImg2" width="16" height="16" title="]]></>.toString()+language.localise(["WLMW","showBlockHelp"])+<><![CDATA[" /></label></td><td valign="middle" align="right" nowrap="nowrap"><img src="http://www.wlmessenger.net/static/2008r1/Conversation/img/Block_button_down.gif" alt="WLMWshowBlockBtn" /></td></tr></table></td></tr><tr><td valign="middle" colspan="3"><hr /></td></tr><tr><td valign="middle" colspan="3"><table width="100%" border="0" cellspacing="0" cellpadding="2"><tr><td valign="middle" width="75%">
												<label for="WLMWvisitorName">]]></>.toString()+language.localise(["WLMW","visitorName"])+<><![CDATA[</label></td><td valign="middle" width="25%" align="right"><input name="WLMWvisitorName" type="text" class="USOinp" id="WLMWvisitorName" value="guest0001" style="text-align:right;" /></td></tr></table></td></tr></table></td></tr></table></fieldset></div>
									<div id="USOnote"><small>]]></>.toString()+language.localise(["WLMW","pagerefresh"])+<><![CDATA[</small></div>
									<div id="USOsubmit"><input name="WLMWreset" type="submit" class="USObtn" id="WLMWreset" value="]]></>.toString()+language.localise(["common","reset"])+<><![CDATA[" style="float:left;" />&nbsp;&nbsp;&nbsp;<input name="WLMWok" type="submit" class="USObtn" id="WLMWok" value="]]></>.toString()+language.localise(["common","ok"])+<><![CDATA[" />&nbsp;&nbsp;&nbsp;<input name="WLMWcancel" type="submit" class="USObtn" id="WLMWcancel" value="]]></>.toString()+language.localise(["common","cancel"])+<><![CDATA[" />&nbsp;&nbsp;&nbsp;<input name="WLMWapply" type="submit" class="USObtn" id="WLMWapply" value="]]></>.toString()+language.localise(["common","apply"])+<><![CDATA[" /></div></body></html>
							]]></>.toString();
		 US_optionsWLMW = new US.Options({
				   name : WLMW.settingsWindowName,
				content : settingsContent,
				addFade : true,
				addTabs : true,
			activeTabNr : 0,
			showAtStart : false,
			endFunction : function(){
							WLMW.loadSettingsWindowButtons();
							WLMW.loadSettingsWindowValues();
						  }
		});
	},
	closeSettingsWindow: function(){
		if($gi("settings_btn")){
			$gi("settings_btn").className="default";
			$sa($gi("settings_btn"),"WLMW:clikked","false");
		}
		US_optionsWLMW.close();
	},
	loadSettingsWindowButtons: function(){
		$addEvent($gi("WLMWok",    WLMW.settingsWindowNode()),"click",function(){WLMW.applySettings();WLMW.closeSettingsWindow();});
		$addEvent($gi("WLMWapply", WLMW.settingsWindowNode()),"click",function(){WLMW.applySettings();});
		$addEvent($gi("WLMWcancel",WLMW.settingsWindowNode()),"click",function(){WLMW.closeSettingsWindow();WLMW.loadSettings();WLMW.loadSettingsWindowValues();});
		$addEvent($gi("WLMWreset", WLMW.settingsWindowNode()),"click",function(){WLMW.resetSettings();});
		
		if((frames=$x("//iframe[contains(@src,'http://settings.messenger.live.com/Conversation/IMMe.aspx')]"))){
			$addCSS(<style><![CDATA[
				button{position:relative;bottom:0.5em;right:8em;border:0.1em solid #00156e;color:#00156E;height:2em;width:8em;text-align:center;font-family:Verdana;font-size:95%;background:#F1F1F1 url('http://www.wlmessenger.net/static/2008r1/Conversation/css/images/HigButton_Rest.gif') center repeat-x;}
				button.pressed{background-image:url('http://www.wlmessenger.net/static/2008r1/Conversation/css/images/HigButton_Pressed.gif');background-color:#B7D8ED;}
				button.default{background-image:url('http://www.wlmessenger.net/static/2008r1/Conversation/css/images/HigButton_Default.gif');}
				button.hover{background-image:url('http://www.wlmessenger.net/static/2008r1/Conversation/css/images/HigButton_Hot.gif');}
				button.focus/*,button:focus*/{background-image:url('http://www.wlmessenger.net/static/2008r1/Conversation/css/images/HigButton_Hot.gif');}
				button.disabled{border-color:#c7c7c7;background-image:none;background-color:#F1F1F1;color:#C7C7C7;}
			]]></style>.toString());
			frames.forEach(function(frame){
				var btn=$ce("BUTTON");
				$sa(btn,"id","settings_btn");
				$sa(btn,"class","default");
				$ih(btn,language.localise(["common","settings"]));
				$ia(frame,btn);
				$addEvent(btn,"mouseover",function(){
					if($ga(this,"WLMW:clikked")!="true"){
						this.className="hover";
				}	});
				$addEvent(btn,"mouseout",function(){
					if($ga(this,"WLMW:clikked")!="true"){
						this.className="default";
				}	});
				$addEvent(btn,"mousedown",function(){
					this.className="pressed";
				});
				$addEvent(btn,"click",function(){
					this.className="focus";
					$sa(this,"WLMW:clikked","true");
					US_optionsWLMW.open();
					this.className="disabled";
				});
			});
			$addEvent($gi("USOoverlayGray_"+WLMW.settingsWindowName,top.document),"dblclick",function(){WLMW.closeSettingsWindow();});
	}	},
	loadSettingsWindowValues: function(){
		$gi("WLMWconvertUBB",  WLMW.settingsWindowNode()).checked = WLMW.convertUBB;
		$gi("WLMWconvertLink", WLMW.settingsWindowNode()).checked = WLMW.convertLink;
		$gi("WLMWconvertMail", WLMW.settingsWindowNode()).checked = WLMW.convertMail;
		$gi("WLMWshowDPimg",   WLMW.settingsWindowNode()).checked = WLMW.showDPimg;
		$gi("WLMWshowDPbtn",   WLMW.settingsWindowNode()).checked = WLMW.showDPbtn;
		$gi("WLMWshowToolBar", WLMW.settingsWindowNode()).checked = WLMW.showToolBar;
		$gi("WLMWshowBlockBtn",WLMW.settingsWindowNode()).checked = WLMW.showBlockBtn;
		$gi("WLMWvisitorName", WLMW.settingsWindowNode()).value =   WLMW.visitorName;
	},

	loadSettings: function(){
		WLMW.convertUBB=  GM_getValue("WLMW.convertUBB",  convertUBBDefault);
		WLMW.convertLink= GM_getValue("WLMW.convertLink", convertLinkDefault);
		WLMW.convertMail= GM_getValue("WLMW.convertMail", convertMailDefault);
		WLMW.showDPimg=   GM_getValue("WLMW.showDPimg",   showDPimgDefault);
		WLMW.showDPbtn=   GM_getValue("WLMW.showDPbtn",   showDPbtnDefault);
		WLMW.showToolBar= GM_getValue("WLMW.showToolBar", showToolBarDefault);
		WLMW.showBlockBtn=GM_getValue("WLMW.showBlockBtn",showBlockBtnDefault);
		WLMW.visitorName= GM_getValue("WLMW.visitorName", visitorNameDefault);
	},
	applySettings: function(){
		WLMW.convertUBB=  $gi("WLMWconvertUBB",  WLMW.settingsWindowNode()).checked;
		WLMW.convertLink= $gi("WLMWconvertLink", WLMW.settingsWindowNode()).checked;
		WLMW.convertMail= $gi("WLMWconvertMail", WLMW.settingsWindowNode()).checked;
		WLMW.showDPimg=   $gi("WLMWshowDPimg",   WLMW.settingsWindowNode()).checked;
		WLMW.showDPbtn=   $gi("WLMWshowDPbtn",   WLMW.settingsWindowNode()).checked;
		WLMW.showToolBar= $gi("WLMWshowToolBar", WLMW.settingsWindowNode()).checked;
		WLMW.showBlockBtn=$gi("WLMWshowBlockBtn",WLMW.settingsWindowNode()).checked;
		WLMW.visitorName= $gi("WLMWvisitorName", WLMW.settingsWindowNode()).value;

		WLMW.saveSettings();
		WLMW.executeSettings();
	},
	resetSettings: function(){
		if(confirm(language.localise(["WLMW","resetConfirm"]))===true){
			WLMW.convertUBB=  convertUBBDefault;
			WLMW.convertLink= convertLinkDefault;
			WLMW.convertMail= convertMailDefault;
			WLMW.showDPimg=   showDPimgDefault;
			WLMW.showDPbtn=   showDPbtnDefault;
			WLMW.showToolBar= showToolBarDefault;
			WLMW.showBlockBtn=showBlockBtnDefault;
			WLMW.visitorName= visitorNameDefault;
		
			WLMW.saveSettings();
			WLMW.loadSettingsWindowValues();
			WLMW.executeSettings();
	}	},
	saveSettings: function(){
		GM_setValue("WLMW.convertUBB",  WLMW.convertUBB);
		GM_setValue("WLMW.convertLink", WLMW.convertLink);
		GM_setValue("WLMW.convertMail", WLMW.convertMail);
		GM_setValue("WLMW.showDPimg",   WLMW.showDPimg);
		GM_setValue("WLMW.showDPbtn",   WLMW.showDPbtn);
		GM_setValue("WLMW.showToolBar", WLMW.showToolBar);
		GM_setValue("WLMW.showBlockBtn",WLMW.showBlockBtn);
		GM_setValue("WLMW.visitorName", WLMW.visitorName);
	},
	executeSettings: function(){
}	}

WLMW.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 25.309
// Chars (include spaces): 28.277
// Chars (Chinese): 0
// Words: 1.834
// Lines: 431