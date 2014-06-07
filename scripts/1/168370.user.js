// ==UserScript==
// @id             kaskusjquery
// @name           Yet Another Kaskus jQuery
// @version        4.7g
// @namespace      amzma@deviantart.com
// @author         AMZMA
// @description    jQery plugin for Kaskus
// @updateURL      http://userscripts.org/scripts/source/168370.meta.js
// @icon           http://puu.sh/VWPL
// @include        *.kaskus.co.id/*
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @homepage	   Teras
// ==/UserScript==


$(document).ready(function() {
	
//
//	Force Caching .js File
//	201304xx
//

	$("meta[content='no-cache']").remove();
	$("meta[content='-1']").remove();
	$('meta[charset="utf-8"]').after('<meta http-equiv="Cache-Control" content="public" />');
	$('meta[charset="utf-8"]').before('<meta http-equiv="Date" content="Sat, 26 Jul 1997 05:00:00 GMT" />');
	$('meta[charset="utf-8"]').before('<meta http-equiv="Expires" content="Sat, 26 Jul 2997 05:00:00 GMT" />');
	var isCtrl = false;

//	
//	---SHORTCUT---
//	201303xx
//	
	
	$(document).keyup(function (e) {
		if(e.which == 17) isCtrl=false; //CTRL
		}).keydown(function (e) {
			if(e.which == 17) isCtrl=true;
			if(e.which == 220 && isCtrl == true) //backsslash"\". Spoiler
			{
//				$("div[class*='content_spoiler_']").slideToggle('fast');
				$("input[class^='spoiler_']").click();
				return false;
			}
			else if(e.which == 192 && isCtrl == true) //"`"`. Emot
			{
				$(".ev_smiley").get(0).click();
				return false;
			}
//Container
			else if(e.which == 188 && isCtrl == true) //",". Small
			{
				$("#tkecil").get(0).click();
				return false;
			}
			else if(e.which == 190 && isCtrl == true) //".". Big
			{
				$("#tbesar").get(0).click();
				return false;
			}
			else if(e.which == 191 && isCtrl == true) //"/". Custom
			{
				$("#tcustom").get(0).click();
				return false;
			}
//SideBar
			else if(e.which == 49 && isCtrl == true) //"1". chibi
			{
				$("#tbgrup_0").get(0).click();
				return false;
			}
			else if(e.which == 50 && isCtrl == true) //"2". Spartan
			{
				$("#tbgrup_1").get(0).click();
				return false;
			}
			else if(e.which == 51 && isCtrl == true) //"3". Plz
			{
				$("#tbgrup_2").get(0).click();
				return false;
			}
			else if(e.which == 52 && isCtrl == true) //"4". twitter
			{
				$("#tbgrup_3").get(0).click();
				return false;
			}
	});

//	
//	---POLLING---
//	20130525 Initial Released
//	20130529 Scroll to Top
//	20130601 Fix Chromium
//
	GM_addStyle('.polling-swap, #pollling-button {display:none; text-align: center;} .icon-arrow-down:before {content: "";} .icon-arrow-up:before {content: "";}');
	$(".polling-swap").before('<center><div id="polling-button" class="turqoise button" title="Toggle Poliing"><i class="icon-arrow-down"></i></div></center>');
	$(".polling-swap").after('<div id="pollling-button" class="grey button" title="Toggle Poliing"><i class="icon-arrow-up"></i></div>');
	$("#polling-button").click(function(){
		$("#polling-button > i").toggleClass('icon-arrow-down', 2000).toggleClass('icon-arrow-up', 2000);
		$('html, body').animate({ scrollTop: $('.polling-wrapper').offset().top }, 'slow');
		$(".polling-swap").slideToggle('slow');
		$("#pollling-button").slideToggle('slow');
	});	
	$("#pollling-button").click(function(){
		$("#polling-button > i").toggleClass('icon-arrow-down', 2000).toggleClass('icon-arrow-up', 2000);
		$('html, body').animate({ scrollTop: $('.polling-wrapper').offset().top }, 'slow');
		$(".polling-swap").slideToggle('slow');
		$("#pollling-button").slideToggle(2000);
	});	
	
//
//	---Cuma Semacam Sampah---
//	20130529 Orange Edit Button 
//	20130529 Special BG Own Post
//	20130529 UpDown Arrow Fixed
//
var _0x72da=["\x61\x5B\x68\x72\x65\x66\x2A\x3D\x22\x2F\x65\x64\x69\x74\x5F\x70\x6F\x73\x74\x2F\x22\x5D","\x2E\x72\x67\x62\x61\x20\x7B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x20\x72\x67\x62\x61\x28\x32\x32\x37\x2C\x20\x32\x33\x36\x2C\x20\x32\x34\x31\x2C\x2E\x37\x29\x3B\x20\x7D","\x6F\x72\x61\x6E\x67\x65","\x61\x64\x64\x43\x6C\x61\x73\x73","\x77\x68\x69\x74\x65","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x72\x67\x62\x61","\x2E\x65\x6E\x74\x72\x79","\x66\x69\x6E\x64","\x2E\x72\x6F\x77","\x63\x6C\x6F\x73\x65\x73\x74","\x2E\x75\x73\x65\x72\x2D\x64\x65\x74\x61\x69\x6C\x73\x20\x61\x5B\x68\x72\x65\x66\x3D\x22\x2F\x70\x72\x6F\x66\x69\x6C\x65\x2F\x38\x30\x37\x36\x31\x37\x22\x5D","\x2E\x6E\x6F\x6E\x65\x20\x7B\x20\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65\x20\x21\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x3B\x20\x7D","\x6E\x6F\x6E\x65","\x2E\x68\x66\x65\x65\x64\x20"];var ep=$(_0x72da[0]);GM_addStyle(_0x72da[1]);ep[_0x72da[5]](_0x72da[4])[_0x72da[3]](_0x72da[2]);ep[_0x72da[10]](_0x72da[9])[_0x72da[8]](_0x72da[7])[_0x72da[3]](_0x72da[6]);var ep=$(_0x72da[11]);GM_addStyle(_0x72da[12]);ep[_0x72da[10]](_0x72da[14])[_0x72da[8]](_0x72da[7])[_0x72da[3]](_0x72da[13]);

//
//	---HIDE DELETED-VM---
//	20130702 Deleted VM
//	20130703 Deleted VM Button
//	
	var funcVM = function () { $('.deleted-vm').closest('[id^=vm_]').attr('style', 'display: none');}
	setTimeout(funcVM, 5000);
	GM_addStyle('#vm-button-s {margin-right: 1%;}  #vm-button-h {margin-right: 29%;} .vm-show:before {content: "Show";} .vm-hide:before {content: "Hide"}');
	$('input[value="Post VM"]').before('<div id="vm-button-s" class="button micro red vm-show" title="Toggle VM"></div><div id="vm-button-h" class="button micro turqoise vm-hide" title="Toggle VM"></div>');
	$('#profile-content').after('<center><div id="vm-button-h1" class="button micro turqoise vm-hide" title="Toggle VM"></div></center>');
	$('#vm-button-s').click(function(){
		$('.deleted-vm').closest('[id^=vm_]').slideDown();
	});
	$('#vm-button-h').click(function(){
		$('.deleted-vm').closest('[id^=vm_]').slideUp('fast');
		$('#vm-button-h').focus();
	});
	$('#vm-button-h1').click(function(){
		$('.deleted-vm').closest('[id^=vm_]').slideUp('fast');
	});

//	
//	---SubFORUM---
//	20130721 Ngeeeenngg
//
	GM_addStyle('.subforum-table tbody{display:none; position:absolute; width:auto; z-index:4;} .subforum-table:hover tbody{display:block !important; margin-right: 21px !important; border-right: 1px solid #555 !important; border-left: 1px solid #555 !important; border-bottom: 2px solid #555 !important; background-color: #efefef;} .span10:before{content: "↓ Show SubForum ↓"; color: #C01717; position: absolute; z-index: 4; left: 45%;} .span10:hover:before{color: #390;}#site-header{z-index: 5 !important;}');
	

});



// AMZMA //

