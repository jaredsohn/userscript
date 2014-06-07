/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            InHolland SignIn
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/15445
// @description     Automatic sign in at InHolland.
// @description     InHolland SignIn v2.0 Alpha
// @copyright       2007 - 2011 Jerone
// @version         v2.0 Alpha
// @versiontext     Complete rewrite.
// @browser         FF3
// @include         http://*.inholland.nl/*
// @include         https://*.inholland.nl/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
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
03-12-2007 15:00 [v1.0 Alpha]:
	[+] initial release;
21-01-2008 23:00 [v1.1 Beta]:
	[*] cleaned up code;
	[+] added prive login;
	[+] added US_functions;
04-05-2008 23:00 [v1.2]:
	[+] added framework check;
	[+] added US_language;
	[+] added US_update;
27-05-2008 23:00 [v1.3 Beta]:
	[+] added Blackboard;
	[+] added Weblogin login
	[+] added auto submit;
	[+] added timed login for normal login;
28-05-2008 20:00 [v1.4 Beta]:
	[+] added StudentenPortal login;
30-05-2008 19:00 [v1.5 Beta]:
	[/] fixed framework check;
03-09-2008 16:00 [v1.6 Beta]:
	[*] updated latest US_framework;
	[+] added cancel button;
	[*] cleaned up code;
02-11-2008 23:00 [v1.7 Beta]:
	[/] fixed Blackboard inlog problem;
	[/] fixed WebLogin inlog problem;
	[+] added timed login for BlackBoard login;
	[+] added timed login for WebLogin login;
	[+] added timed login for StudentenPortal login;
	[*] cleaned up code;
21-11-2008 21:15 [v1.7.1 Beta];
	[/] fixed small bug in framework check;
23-01-2011 23:00 [v2.0 Alpha]:
	[*] complete rewrite;
	[+] added jQuery framework;
	[+] added login insite & timetables & webdata;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - settings window;
////////////////////////////////////////////////////////////////////////////
// Note:
// - 
/*//////////////////////////////////////////////////////////////////////////



//*** USER SETTINGS ***//
var accountName = [					// [Array [name, password]];
	['123456', 'P@ssw0rd'], 			// password	[String] password of your account;
	['123456', 'P@ssw0rd']]; 			// name		[String] name of your account;
var accountNumber	= 0;	 		// [Number] reflects the accountName above;
 
var loginPrive		= true;			// [Boolean] login as private computer (default: false = public);
var autoSubmit		= true;			// [Boolean] automatic login;
var submitTimer		= 3000;			// [Integer] milliseconds to auto submit;
 
var loadingImage	= "data:image/gif;base64,R0lGODlhEgASALMPAKysqpWVk1RUUmJiYIqKiW9vbqCgnomJh35+faGhnnBwb39/fqGhn3FxcYCAgP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAPACwAAAAAEgASAAAEV/DJSautzt29+toTQTxIiTxNc4kieSqwYh30QRV4cdEWbgUB0GMwmACBGyJRcgxelEWmMxmlMBgWgeCS6CYoWq3FQDY8AIBHeDs2o9FqNuidFlLg9rwkAgAh+QQFAAAPACwBAAEAEAAQAAAEUvDJ+QihmFqbZwjPIR6P42DfF5JLu1ApOCE0gsoUTTFMNzWNR2KY8CmOCoPS4Cs4Cw+lT+KkAACZwQBzvVK0Wmv3IRA8wFsxuWwO+9jm6aTciQAAIfkEBQAADwAsAQABABAAEAAABFHwyflCoJhamydj1fYQBJacSTiS5WS8BnXMB/ZmMwUA3eQ4j92utyguhLwOYokIJntLikCQaTQw0ylFwVVIs4/B4FEoF7BUsZh87qnHPco6EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfkYo5imnfIEwGOMxhMEGAiK5XlSaji5KCxT7yQI3kQQj92u9/sJeZ6D8hBE9pSUwSDjcGCkUspiu4hiH43GA0FGXKeKtGJs7hXehR7m7YkAACH5BAUAAA8ALAEAAQAQABAAAART8Mn5AKCYWpunENX2MAz2feGTrAl1gpMhGyZMydQwdFMQPDodz+cL7jrEn5D38FEajQyBgFFYFZTplFLoFh4Ox+NAPmC6j4V6MTbzEHAEkwLvRAAAIfkEBQAADwAsAQABABAAEAAABFHwyfmEoJham+cY1fYAAPZ94UiW3kmtbJuRVNN0E8M8Sq/giWCiQCzgDEjDg4iTICkORyYQwCyuCwqVSkF4EQ8C4bGtdsFiMdncObgPTYq7EwEAIfkEBQAADwAsAQABABAAEAAABFLwyfnGoJham2dr1fYIAqacSjiS5VS8BcW2boyRlON0EwA8i+CC5/Mhjghi8XHkSXwUAiHDYGCkUkpim6AcvodHIPAwmA2Yr3hMNjvZZOdk3IkAACH5BAUAAA8ALAEAAQAQABAAAARS8Mn5WqOYqq3ydM5TjMUzDNiiLmJ5nhQiI9SLxjQGTwThTQLBo9f7BYOH5MF4fCR/kiAlEMgAABgqlXK9TrUPBuPRxX4fiXSCbPYY3gYo5e2JAAA7";



//*** USER SCRIPT ***//
(function (win, doc, und) {

	var $;
	if (!(window.jQuery || unsafeWindow.jQuery)) {
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = "http://userscripts.org/scripts/source/90232.user.js";
		doc.getElementsByTagName("head")[0].appendChild(script);
		var checker = win.setInterval(function () {
			if ((window.jQuery || unsafeWindow.jQuery)) {
				win.clearInterval(checker);
				$ = window.jQuery || unsafeWindow.jQuery;
				$ = $.noConflict();
				try {
					$(function () {
						hijack(INHSI.init, INHSI);
					})
				} catch (e) {
					((unsafeWindow && unsafeWindow.console) || window.console).log("error", e);
				}
			}
		}, 100);
		win.setTimeout(function () {
			if (!(window.jQuery || unsafeWindow.jQuery)) {
				win.clearInterval(checker);
				win.alert("Something went wrong with importing a script!\nPlease uninstall this script and download it again.\nIf this error persists, please contact the author.");
				return;
			}
		}, 10000);
		function hijack(fn, that, args) {
			win.setTimeout(function () {
				fn.apply(that || this, args || []);
			}, 0);
		}
	} else {
		$ = jQuery.noConflict();
		$(function () {
			INHSI.init();
		});
	}

	var INHSI = {
		init: function(){
			if(autoSubmit){
				INHSI._cancel = $("<button/>", {
						"class": "btnOnFcs button-1",
						text: "Cancel",
						style: "padding-right: 20px;",
						click: function(){
							win.clearTimeout(INHSI._loginTimer);
							$(this).remove();
							return false;
						}
					}).append($("<img/>", {
						src: loadingImage,
						style: "margin-top: -2px; position: absolute;"
					}));
			}

			if(win.location.host.indexOf("webmail")>-1){
				INHSI.webmail();
			} else if(win.location.host.indexOf("insite")>-1){
				INHSI.insite();
			} else if(win.location.host.indexOf("webdata")>-1){
				INHSI.webdata();
			} else if(win.location.host.indexOf("weblogin")>-1){
				INHSI.weblogin();
			} else if(win.location.host.indexOf("timetables")>-1){
				INHSI.timetables();
			} else if(win.location.host.indexOf("blackboard")>-1){
				INHSI.blackboard();
			} else if(win.location.host.indexOf("studentportal")>-1){
				INHSI.studentportal();
			}
		},

		_LOGIN: function(){
			if(loginPrive){
				$("#rdoPrvt").click().length > 0 && unsafeWindow.clkSec();  // onclick;
			}

			var correct = $("#username").val(accountName[accountNumber][0]).length>0
					   && $("#password").val(accountName[accountNumber][1]).length>0;

			if(correct && autoSubmit && ($(".wrng").html()||"").length==0){
				INHSI._loginTimer = win.setTimeout(function(){
					$("#logonForm").submit();
				}, submitTimer);
			
				$("#SubmitCreds").before(INHSI._cancel);
			}
		},

		weblogin: function(){
			var correct = $("#user").val(accountName[accountNumber][0]).length>0
					   && $("#password").val(accountName[accountNumber][1]).length>0;

			if(correct && autoSubmit && ($(".feedbackStyleError").html()||"").length==0){
				INHSI._loginTimer = setTimeout(function(){
					(win.submitForm || unsafeWindow.submitForm)();
				}, submitTimer);
			
				$("#graphic_LoginButton").before(INHSI._cancel).parent().css("text-align", "right");
			}
		},

		blackboard: function(){
			var correct = $("#user_id").val(accountName[accountNumber][0]).length>0
					   && $("#password").val(accountName[accountNumber][1]).length>0;

			if(correct && autoSubmit && ($("#loginErrorMessage").html()||"").length==0){
				INHSI._loginTimer = win.setTimeout(function(){
					$(".submit.button-1").click();
				}, submitTimer);

				$(".submit.button-1").after(INHSI._cancel);
			}
		}
	};

	INHSI.webdata = INHSI.studentportal = INHSI.insite = INHSI.timetables = INHSI.webmail = INHSI._LOGIN;

	INHSI.init();  // execute;

})(this, document);



//*** STATISTICS ***//
// Chars (exclude spaces): 7.486
// Chars (include spaces): 8.610
// Chars (Chinese): 0
// Words: 771
// Lines: 233