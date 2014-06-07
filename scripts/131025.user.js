// ==UserScript==
// @name           	BatheoBot
// @require        	https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @description    	Bot for Batheo
// @version        	7.1
// @include     	/http://b\d+\.clapalong\.com/$/
// @include        	/http://batheo\.clapalong\.com/\?action=gameapi!authlogin&sid=\d+$/
// @include     	/http://eub\d+\.clapalong\.com/$/
// @include        	/http://www\.clapalong\.com/\?action=gameapi!authlogin&gid=5&sid=\d+$/
// @include     	/http://s\d+\.ath\.\w+\.koramgame\.com/$/
// @include        	/http://game\.\w+\.ath\.koramgame\.com/\?sid=s\d+$/

// Script Auto Update
// @require http://usocheckup.redirectme.net/131025.js
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest

// ==/UserScript==

var newplayername="Peter107";
//alert("Running");

//Uniform.js
(function(a){a.uniform={options:{selectClass:"selector",radioClass:"radio",checkboxClass:"checker",fileClass:"uploader",filenameClass:"filename",fileBtnClass:"action",fileDefaultText:"No file selected",fileBtnText:"Choose File",checkedClass:"checked",focusClass:"focus",disabledClass:"disabled",buttonClass:"button",activeClass:"active",hoverClass:"hover",useID:true,idPrefix:"uniform",resetSelector:false,autoHide:true},elements:[]};if(a.browser.msie&&a.browser.version<7){a.support.selectOpacity=false}else{a.support.selectOpacity=true}a.fn.uniform=function(k){k=a.extend(a.uniform.options,k);var d=this;if(k.resetSelector!=false){a(k.resetSelector).mouseup(function(){function l(){a.uniform.update(d)}setTimeout(l,10)})}function j(l){$el=a(l);$el.addClass($el.attr("type"));b(l)}function g(l){a(l).addClass("uniform");b(l)}function i(o){var m=a(o);var p=a("<div>"),l=a("<span>");p.addClass(k.buttonClass);if(k.useID&&m.attr("id")!=""){p.attr("id",k.idPrefix+"-"+m.attr("id"))}var n;if(m.is("a")||m.is("button")){n=m.text()}else{if(m.is(":submit")||m.is(":reset")||m.is("input[type=button]")){n=m.attr("value")}}n=n==""?m.is(":reset")?"Reset":"Submit":n;l.html(n);m.css("opacity",0);m.wrap(p);m.wrap(l);p=m.closest("div");l=m.closest("span");if(m.is(":disabled")){p.addClass(k.disabledClass)}p.bind({"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(r){if(a(r.target).is("span")||a(r.target).is("div")){if(o[0].dispatchEvent){var q=document.createEvent("MouseEvents");q.initEvent("click",true,true);o[0].dispatchEvent(q)}else{o[0].click()}}}});o.bind({"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass)}});a.uniform.noSelect(p);b(o)}function e(o){var m=a(o);var p=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){p.hide()}p.addClass(k.selectClass);if(k.useID&&o.attr("id")!=""){p.attr("id",k.idPrefix+"-"+o.attr("id"))}var n=o.find(":selected:first");if(n.length==0){n=o.find("option:first")}l.html(n.html());o.css("opacity",0);o.wrap(p);o.before(l);p=o.parent("div");l=o.siblings("span");o.bind({"change.uniform":function(){l.text(o.find(":selected").html());p.removeClass(k.activeClass)},"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"keyup.uniform":function(){l.text(o.find(":selected").html())}});if(a(o).attr("disabled")){p.addClass(k.disabledClass)}a.uniform.noSelect(l);b(o)}function f(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.checkboxClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{l.addClass(k.checkedClass)}},"mousedown.uniform touchbegin.uniform":function(){o.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function c(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.radioClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{var p=k.radioClass.split(" ")[0];a("."+p+" span."+k.checkedClass+":has([name='"+a(n).attr("name")+"'])").removeClass(k.checkedClass);l.addClass(k.checkedClass)}},"mousedown.uniform touchend.uniform":function(){if(!a(n).is(":disabled")){o.addClass(k.activeClass)}},"mouseup.uniform touchbegin.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform touchend.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function h(q){var o=a(q);var r=a("<div />"),p=a("<span>"+k.fileDefaultText+"</span>"),m=a("<span>"+k.fileBtnText+"</span>");if(!o.css("display")=="none"&&k.autoHide){r.hide()}r.addClass(k.fileClass);p.addClass(k.filenameClass);m.addClass(k.fileBtnClass);if(k.useID&&o.attr("id")!=""){r.attr("id",k.idPrefix+"-"+o.attr("id"))}o.wrap(r);o.after(m);o.after(p);r=o.closest("div");p=o.siblings("."+k.filenameClass);m=o.siblings("."+k.fileBtnClass);if(!o.attr("size")){var l=r.width();o.attr("size",l/10)}var n=function(){var s=o.val();if(s===""){s=k.fileDefaultText}else{s=s.split(/[\/\\]+/);s=s[(s.length-1)]}p.text(s)};n();o.css("opacity",0).bind({"focus.uniform":function(){r.addClass(k.focusClass)},"blur.uniform":function(){r.removeClass(k.focusClass)},"mousedown.uniform":function(){if(!a(q).is(":disabled")){r.addClass(k.activeClass)}},"mouseup.uniform":function(){r.removeClass(k.activeClass)},"mouseenter.uniform":function(){r.addClass(k.hoverClass)},"mouseleave.uniform":function(){r.removeClass(k.hoverClass);r.removeClass(k.activeClass)}});if(a.browser.msie){o.bind("click.uniform.ie7",function(){setTimeout(n,0)})}else{o.bind("change.uniform",n)}if(o.attr("disabled")){r.addClass(k.disabledClass)}a.uniform.noSelect(p);a.uniform.noSelect(m);b(q)}a.uniform.restore=function(l){if(l==undefined){l=a(a.uniform.elements)}a(l).each(function(){if(a(this).is(":checkbox")){a(this).unwrap().unwrap()}else{if(a(this).is("select")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is(":radio")){a(this).unwrap().unwrap()}else{if(a(this).is(":file")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is("button, :submit, :reset, a, input[type='button']")){a(this).unwrap().unwrap()}}}}}a(this).unbind(".uniform");a(this).css("opacity","1");var m=a.inArray(a(l),a.uniform.elements);a.uniform.elements.splice(m,1)})};function b(l){l=a(l).get();if(l.length>1){a.each(l,function(m,n){a.uniform.elements.push(n)})}else{a.uniform.elements.push(l)}}a.uniform.noSelect=function(l){function m(){return false}a(l).each(function(){this.onselectstart=this.ondragstart=m;a(this).mousedown(m).css({MozUserSelect:"none"})})};a.uniform.update=function(l){if(l==undefined){l=a(a.uniform.elements)}l=a(l);l.each(function(){var n=a(this);if(n.is("select")){var m=n.siblings("span");var p=n.parent("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.html(n.find(":selected").html());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":checkbox")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":radio")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":file")){var p=n.parent("div");var o=n.siblings(k.filenameClass);btnTag=n.siblings(k.fileBtnClass);p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);o.text(n.val());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":submit")||n.is(":reset")||n.is("button")||n.is("a")||l.is("input[type=button]")){var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}}}}}})};return this.each(function(){if(a.support.selectOpacity){var l=a(this);if(l.is("select")){if(l.attr("multiple")!=true){if(l.attr("size")==undefined||l.attr("size")<=1){e(l)}}}else{if(l.is(":checkbox")){f(l)}else{if(l.is(":radio")){c(l)}else{if(l.is(":file")){h(l)}else{if(l.is(":text, :password, input[type='email']")){j(l)}else{if(l.is("textarea")){g(l)}else{if(l.is("a")||l.is(":submit")||l.is(":reset")||l.is("button")||l.is("input[type=button]")){i(l)}}}}}}}}})}})(jQuery);

//scrap
var clapurl;
var task;
var temptext;
/////////////////////////////////////////////////////////////
//Global Variables
var server;
var gameReferer;
var postReferer;
var gameurl;

var headers_get;
var headers_post;

var currenturl = document.URL;
var startdomain = location.host;//document.domain

var direction=new Array();
direction[0]="";
direction[1]="&darr;";
direction[2]="&uarr;";


//UI//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}
function removeoffer()
{
	//Get rid of Offerwall and remove junk
	$(".lpay").remove();
	$(".converter").remove();
	$(".offer").remove();
	$("#slides").remove();
	$("#publish_state").remove();
	$("#invite_state").remove();
	//$("#invite_state").html("&larr; Unlike?");
}
function createbot()
{
	var botx = getOffset( document.getElementById('page') ).left;
	var ele = document.getElementById('page');
	var box = document.createElement("div");
	document.body.appendChild(box);
	box.className = "ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable";
	box.id = "win";

	box.innerHTML = '<style type="text/css">#win { left:'+botx+'px;}</style>\
	<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>\
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>\
	<div id="botmain"></div>\
	<ul><li><a href="#tab1"><span>Bot</span></a></li><li><a href="#tab2"><span>2</span></a></li><li><a href="#tab3"><span>3</span></a></li><li><a href="#tab4"><span>4</span></a></li><li><a href="#tab5"><span>5</span></a></li><li><a href="#tab6"><span>6</span></a></li><li><a href="#tab7"><span>7</span></a></li></ul>';
	
	getbotui();
}
function createlog()
{
	var botx = getOffset( document.getElementById('page') ).left;
	var logx = getOffset( document.getElementById('page') ).left+1000+6;
	var log = document.createElement("div");
	$('#page').before(log);
	log.id = "botlog";
	log.className = "ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable";
	log.innerHTML='<style type="text/css">#botlog { left:'+logx+'px;}</style>\
	<style type="text/css">#win { left:'+botx+'px;}</style>\
	<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" id="logtitle">\
	<span class="ui-dialog-title" id="ui-dialog-title-dialog">Batheo Bot Log</span>\
	<span id="clearlog" style="float:right">Clear</span></div>\
	<div id="logtext"></div>';
	$('#botlog').draggable({handle:"#logtitle"}).resizable();
}
/*
 * //Basic Dialog var test = document.createElement("div");
 * $('#page').before(test); test.id = "test"; test.innerHTML='<div id="dialog"
 * title="Basic dialog"> <p>This is the default dialog which is useful for
 * displaying information. The dialog window can be moved, resized and closed
 * with the x icon.</p></div>'; $( "#dialog" ).dialog();
 */


//Functions/////////////////////////////////////////////////////////////////////////////////////////////////////////
function status(string)
{
	//document.getElementById("logtext").innerHTML += string+"<br>";
	//$("#logtext").html(string+"<br>"+$("#logtext").html());
	$('#logtext').prepend(string+'<br>');
}
function clearlog()
{
	$("#logtext").html("");
}
function printarray(string)
{
	document.getElementById("tab7").innerHTML = string;
}
function getServer()
{
	currenturl = document.URL;
	
	var match = currenturl.match(/action=gameapi!authlogin&sid=(\d+)/i);
	if (!match)
	{
		match = currenturl.match(/action=gameapi!authlogin&gid=5&sid=(\d+)/i);
		server = "eub"+match[1];
	}
	else server = "b"+match[1];
	return server;
}
function calcServerTime()
{
	var time = new Date();
	return (time.getTime() - 8*3600*1000 + (time.getTimezoneOffset()*60000));
}

function getGameSwfReferer()
{
	headers_get = {
		"Host":server,
		"User-agent":navigator.userAgent, 
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
		"Accept-Language":"en-us,en;q=0.5",
		"Accept-Encoding":"gzip,deflate",
		"Connection": "keep-alive",
		"Referer": gameReferer
	};
	
	GM_xmlhttpRequest(
			{
				method: "GET",
				headers:headers_get,
				url: gameurl, // PLAIN BROWSER CALL
				onerror: function(response) { status("GET testspeed.js="+response);},
				onload: function(response) 
				{
					//var match = "testSpeed.js?version=";
					var match = response.responseText.match((/testSpeed.js\?version=(\d+\.\d+)/i));
					if(match!=null)
					{
						var testSpeedjs = match[0];
						//status(""+testSpeedjs);
						GM_xmlhttpRequest(
								{
									method: "GET",
									headers:headers_get,
									url: gameurl+"/"+testSpeedjs,
									onerror: function(response) { status("GET resus="+response.responseText);},
									onload: function(response) 
									{
										//urlList[1] = "http://static.koramgame.com/as/resus_en_84/";
										match = response.responseText.match((/"http:\/\/static\.koramgame\.com\/as\/(\w+)\/";/i));
										if(match!=null)
										{
											var resus = "http://static.koramgame.com/as/"+match[1];
											var ver = new Date().getTime().toString() + Math.random();
											//status("Resus = "+match[1]);
											GM_xmlhttpRequest(
													{
														method: "GET",
														headers:headers_get,
														url: gameurl+"/Config.xml?version=v"+ver,   // HEADER
														// CHECKED
														onerror: function(response) { status("GET lang="+response);},
														onload: function(response) 
														{
															//language content="zs_EN"
															match = response.responseText.match((/language content="(\w+)"/i));
															if(match!=null)
															{
																var lang = match[1];
																//status("Language = "+lang);
																//http://static.koramgame.com/as/resus_en_84/assets/zs_EN/xml/ResConfig.xml?version=v13405914087750.8487367988564074
																ver = new Date().getTime().toString() + Math.random();
																var refurl = resus+"/assets/"+lang+"/xml/ResConfig.xml?version=v"+ver;  // HEADER
																// CHECKED
																var headers_get_koramgame = {
																		"Host":"static.koramgame.com",
																		"User-agent":navigator.userAgent, 
																		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
																		"Accept-Language":"en",
																		"Accept-Encoding":"gzip,deflate",
																		"Accept-Charset":"ISO-8859-1,utf-8;q=0.7,*;q=0.7",
																		"Keep-Alive":"115" };
																GM_xmlhttpRequest(
																		{
																			method: "GET",
																			headers:headers_get_koramgame,
																			url: refurl,
																			onerror: function(response) { status("GET swf version="+response);},
																			onload: function(response) 
																			{
																				//<version>06.18.17.15.00_zhanglingfang</version>
																				match = response.responseText.match((/<version>([a-zA-Z0-9_\.]+)<\/version>/i));
																				if(match!=null)
																				{
																					var refererVersion = match[1];
																					//http://static.koramgame.com/as/resus_en_84/game/module/core/Game.swf?version=06.18.17.15.00_zhanglingfangv1
																					postReferer=resus+"game/module/core/Game.swf?version="+refererVersion+"v1";
																					//status(postReferer);
																					setGameReferer();
																				}
																				else
																				{
																					// jPrompt("Fatal error!\n\nresponse\n\nTry Again?",
																					status("GET swf ver="+refurl);
																					status("Trying again");
																					//setTimeout(function(){ getGameSwfReferer(); }, 3000);
																				}
																			}
																		});
															}
															else
															{
																// jPrompt("Fatal error!\n\n\n\nTry Again?",
																status("GET lang="+response);
																status("Trying again");
																//setTimeout(function(){ getGameSwfReferer(); }, 3000);
															}
														}
													});
										}
										else
										{
											// jPrompt("Fatal error!\n\n\n\nTry Again?",
											status("GET resus="+response);
											status("Trying again");
											//setTimeout(function(){ getGameSwfReferer(); }, 3000);
										}
									}
								});
					}
					else
					{
						// jPrompt("Fatal error!\n\n\n\nTry Again?",
						status("GET testSpeed.js="+response);
						status("Trying again");
						//setTimeout(function(){ getGameSwfReferer(); }, 3000);
					}
				}
			});
}
function setGameReferer()
{
	setheaders();
	document.getElementById("ServerField").innerHTML=server;
	document.getElementById("RefererField").title=gameReferer;
	document.getElementById("RefererField").innerHTML="Referer";
	getinfo();
}
function setheaders()
{
	headers_get = {
		"Host":server,
		"User-agent":navigator.userAgent,
		"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
		"Accept-Language":navigator.language,
		"Accept-Encoding":"gzip,deflate",
		"Connection": "keep-alive",
		"Referer": gameReferer
	};
	
	headers_post = {
			"Host":server,
			"User-agent":navigator.userAgent,
			"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language":navigator.language,
			"Accept-Encoding":"gzip,deflate",
			"Connection": "keep-alive",
			"Content-Type": "application/x-www-form-urlencoded"
	};
}
function buttonlisterner()
{
	document.getElementById("get").addEventListener('click', function(){getbutton();}, false);
	document.getElementById("post").addEventListener('click', function(){postbutton();}, false);
	document.getElementById("getmap").addEventListener('click', function(){getmap();}, false);
	document.getElementById("getequip").addEventListener('click', function(){getequip();}, false);
	document.getElementById("logstock").addEventListener('click', function(){logstock();}, false);
	document.getElementById("getrefine").addEventListener('click', function(){getrefine();}, false);
	document.getElementById("getcaravans").addEventListener('click', function(){getcaravans();}, false);
	document.getElementById("getinfo").addEventListener('click', function(){getinfo();}, false);
	document.getElementById("getaide").addEventListener('click', function(){getaide();}, false);
	document.getElementById("AttackButton").addEventListener('click', function(){attackButton();}, false);
	document.getElementById("ctab2").addEventListener('click', function(){getmap();}, false);
	document.getElementById("ctab3").addEventListener('click', function(){getequip();}, false);
	document.getElementById("ctab4").addEventListener('click', function(){logstock();}, false);
	
	document.getElementById("autovancheck").addEventListener('click', function(){autovancheck();}, false);
	document.getElementById("autotradecheck").addEventListener('click', function(){autotradecheck();}, false);
	document.getElementById("autorefinecheck").addEventListener('click', function(){autorefinecheck();}, false);
	document.getElementById("autoaidedivcheck").addEventListener('click', function(){autoaidedivcheck();}, false);
	document.getElementById("autogetsalarycheck").addEventListener('click', function(){autogetsalarycheck();}, false);
	document.getElementById("autoharvestcheck").addEventListener('click', function(){autoharvestcheck();}, false);
	document.getElementById("autovolunteercheck").addEventListener('click', function(){getvolunteerconscript();}, false);
	document.getElementById("getcampaignstate").addEventListener('click', function(){getcampaignstate();}, false);
	document.getElementById("stopcampaign").addEventListener('click', function(){stopcampaign();}, false);
	document.getElementById("campaigntest").addEventListener('click', function(){campaigntest();}, false);
	document.getElementById("uploadmap").addEventListener('click', function(){uploadmap();}, false);
	document.getElementById("autoactivitycheck").addEventListener('click', function(){getactivity();}, false);
	document.getElementById("autosellcropcheck").addEventListener('click', function(){getcrop();}, false);
	document.getElementById("autobuycropcheck").addEventListener('click', function(){getcrop();}, false);
	document.getElementById("autoorecheck").addEventListener('click', function(){getorecheckbox();}, false);
	document.getElementById("uploadallmap").addEventListener('click', function(){uploadallmap();}, false);
	document.getElementById("mailsend").addEventListener('click', function(){getmaillist();}, false);
	document.getElementById("getlegion").addEventListener('click', function(){getlegion();}, false);
	
	document.getElementById("clearlog").addEventListener('click', function(){clearlog();}, false);
	document.getElementById("runscript").addEventListener('click', function(){runscript();}, false);
	
	$("#refineareaprice").change(validaterefineareaprice);
	$("#sellcropprice").change(validatetradecrop);
	$("#buycropprice").change(validatetradecrop);
	$("#volunteerpercent").change(validatevolunteerpercent);
	
}

function responseaction(obj,task)
{
	if (task=="None") return;

	if (task=="getmap") getmap2(obj);
	if (task=="movemap") getmap2(obj);
	if (task=="uploadmap") uploadmap2(obj);
	if (task=="getreport") getreport2(obj);

	if (task=="attack") attack2(obj);
	if (task=="attackqueue") attackqueue2(obj);
	
	if (task=="sendmail") sendmail2(obj);
	
	if (task=="getequip") getequip2(obj);
	if (task=="upgrade") getequip2(obj);

	if (task=="getstock") getstock2(obj);
	if (task=="logstock") logstock2(obj);

	if (task=="trade") trade2(obj);

	if (task=="getrefine") gethelper1(obj);
	if (task=="gethelper1") getrefine1(obj);
	if (task=="getrefine1") gethelper2(obj);
	if (task=="gethelper2") getrefine2(obj);
	if (task=="getrefine2") dorefine(obj);
	if (task=="dorefine") dorefine2(obj);

	if (task=="getcaravans") sortcaravans(obj);
	if (task=="sendcaravan") sendcaravan2(obj);
	
	if (task=="getoremine") getoremine2(obj);
	if (task=="gatherore") gatherore2(obj);
	
	
	
	if (task=="getinfo") getinfo2(obj);
		
	if (task=="getaide") getaide2(obj);
	if (task=="getaidediv") getaidediv2(obj);
	
	if (task=="getsalary") getsalary2(obj);
	if (task=="harvestcrop") harvestcrop2(obj);
	
	if (task=="getvolunteerconscript") volunteerconscript(obj);
	if (task=="volunteerconscript") volunteerconscript2(obj);
	
	if (task=="getcrop") getcrop2(obj);
	
	if (task=="getcity") getcity2(obj);
	
	if (task=="getlegion") getlegion2(obj);
	if (task=="getlegiondetail") getlegiondetail2(obj);
	
	if (task=="getareaprice") getareaprice2(obj);
	
	if (task=="getcampaignstate") getcampaignstate2(obj);
	if (task=="startWar") startWar2(obj);
	if (task=="campaignready") campaignready2(obj);
	if (task=="getTeamInfo") getTeamInfo2(obj);
	if (task=="createTeam") createTeam2(obj);
	if (task=="createTeam2") createTeam3(obj);
	if (task=="campaignaction") campaignaction2(obj);
	if (task=="campaignreplenish") getTeamInfo("init=0&campaignId="+campaignid);
	
	if (task=="getactivity") getactivity2(obj);
	if (task=="getactivitysalary") getactivitysalary2(obj);
	
	if (task=="campaigntest") campaigntest2(obj);
	
	if (task=="createcharacter") createcharacter2(obj);
	
	
	
}

function getbutton()
{
	geturl = document.getElementById("geturl").value;
	getdata(geturl,"GET");
}

function postbutton()
{
	posturl = document.getElementById("posturl").value;
	data = document.getElementById("postdata").value;
	postdata(posturl,data,"POST");
}

//Clockwork///////////////////////////////////////////////////////////////////////////////////////////////////////
var time = new Date();
var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000) - 4*60*60000;
var gmtTime = new Date(gmtMS);

var hr = gmtTime.getHours();
var min = gmtTime.getMinutes();
var sec = gmtTime.getSeconds();

var remainseconds;
var remainminutes;
var secondbuffer = 15;
var secondrange = 15;

function stamp(delay)
{
	if (!delay) delay=0;

	time = new Date();
	gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000) - 4*60*60*1000 + delay;
	gmtTime = new Date(gmtMS);

	hr = gmtTime.getHours();
	min = gmtTime.getMinutes();
	sec = gmtTime.getSeconds();

	if (hr < 10) hr = " " + hr;
	if (min < 10) min = "0" + min;
	if (sec < 10) sec = "0" + sec;

	return hr+":"+min+":"+sec;
}

function firstcycle()
{
	
}

function secondcycle()
{
	document.getElementById("clockarea").innerHTML = stamp(0);
	setTimeout(secondcycle, 1000-gmtTime.getMilliseconds());
}

var loggedout=false;
var halfhourcd;
function halfhourcycle()
{
	if (loggedout)
	{
		status("Logged out. Please refresh your page.");
		alert("Logged out. Please refresh your page.");
		return;
	}
	
	if(hr=="08" && min == "00") autotradecheck(); //warehouse open
	
	setTimeout(getcrop,100);
	setTimeout(getareaprice,1000);
	//setTimeout(getequip,2000);
	setTimeout(logstock,3000);
	
	remainminutes = ((60-min)%30);
	if (remainminutes==0) remainminutes=30;
	remainseconds = remainminutes*60-sec+secondbuffer+(secondrange*Math.random());
	status("Next refresh at: "+stamp(remainseconds*1000));
	halfhourcd = setTimeout(halfhourcycle, remainseconds*1000);
}

/*
function ()
{
	clapurl = gameurl+"/root/.action?";
	task = "";
	getdata(clapurl,task);
}
*/

//Crop/////////////////////////////////////////////////////////////////////////////////////////////////////
var cropprice;
var maxtradecrop;

function getcrop()
{
	if ($("#playerlevel").html()<12) return;
	clapurl = gameurl+"/root/mainCity!preFoodBandC.action?";//http://b5.clapalong.com/root/mainCity!preFoodBandC.action?
	task = "getcrop";
	getdata(clapurl,task);
}
function getcrop2(param)
{
	setcrop(param.price,param.isup);
	document.getElementById("maxtrade").innerHTML = param.maxtrade;
	document.getElementById("crutrade").innerHTML = param.crutrade;
	
	if (param.maxtrade==param.crutrade)
	{
		$("#cropstatus").html(imgdone);
		return;
	}
	else $("#cropstatus").html(imgnotdone);
	
	//Auto sell crop
	if ($("#autosellcropcheck").is(':checked') && param.price>=$("#sellcropprice").val())
	{
		maxtradecrop = param.maxtrade-param.crutrade;
		if (param.playerupdateinfo.food < maxtradecrop) maxtradecrop = param.playerupdateinfo.food;
		//drachmas storage cap
		maxtradecrop = Math.floor(maxtradecrop / 100) * 100;
		if (maxtradecrop==0)
		{
			status("Cannot sell crop.");
			return;
		}
		tradecrop("sell",maxtradecrop);
	}
	//Auto buy crop
	if ($("#autobuycropcheck").is(':checked') && param.price<=$("#buycropprice").val())
	{
		maxtradecrop = param.maxtrade-param.crutrade;
		if (param.bsmax < maxtradecrop) maxtradecrop = param.bsmax;
		//drachmas cap
		maxtradecrop = Math.floor(maxtradecrop / 100) * 100;
		if (maxtradecrop==0)
		{
			status("Cannot buy crop.");
			return;
		}
		tradecrop("buy",maxtradecrop);
	}
}
function tradecrop(type,amount)
{
	clapurl = gameurl+"/root/mainCity!foodBandC.action?";//http://b5.clapalong.com/root/mainCity!foodBandC.action?
	data = type+"="+amount;//buy or sell
	task = "tradecrop";
	status(type+" "+amount+" crops");
	postdata(clapurl,data,task);
}
function tradecrop2(param)
{
	document.getElementById("crutrade").innerHTML = param.cde;
}
function setcrop(param, param2)
{
	cropprice = param;
	document.getElementById("cropprice").innerHTML = cropprice;
	if (param2=="false") document.getElementById("cropprice").innerHTML += "&darr;";
	else document.getElementById("cropprice").innerHTML += "&uarr;";
}

function validatetradecrop()
{
	if (isNaN($("#sellcropprice").val())) $("#sellcropprice").val(1.95);
	if (isNaN($("#buycropprice").val())) $("#buycropprice").val(0.55);
	if ($("#sellcropprice").val()<1) $("#sellcropprice").val(1);
	if ($("#sellcropprice").val()>2) $("#sellcropprice").val(2);
	if ($("#buycropprice").val()<0.5) $("#buycropprice").val(0.5);
	if ($("#buycropprice").val()>1) $("#buycropprice").val(1);
}

//Ore field////////////////////////////////////////////////////////////////////////////////////////////////
function getoremine()
{
	clapurl = gameurl+"/root/bowlderRes!getNationBowlderResInfo.action?";
	task = "getoremine";
	getdata(clapurl,task);
}
function getoremine2(param)
{
	$("#oremineharvest").html(param.remainharvesttime);
	
	if (param.remainharvesttime>0 && param.isself==1) $("#oreminestatus").html(imgnotdone);
	else $("#oreminestatus").html(imgdone);
	
	if (param.isself==1 && param.remainharvesttime>0 && $("#autoorecheck").is(':checked')) gatherore();
}

function gatherore()
{
	clapurl = gameurl+"/root/bowlderRes!HarvestNationBowlderRes.action?";
	task = "gatherore";
	getdata(clapurl,task);
}
function gatherore2(param)
{
	$("#oremineharvest").html(param.remainharvesttime);
	if ("bowlderadd" in param) status("Gained <b>"+param.bowlderadd+" ores</b> Remaining: "+param.remainharvesttime);
	
	if (param.remainharvesttime>0) gatherore();
	else $("#oreminestatus").html(imgdone);
}
function getorecheckbox()
{
	if ($("#autoorecheck").is(':checked')) getoremine();
}

//Main City////////////////////////////////////////////////////////////////////////////////////////////////
var buildings;
var canalchemy=false;

function getcity()
{
	clapurl = gameurl+"/root/mainCity.action?";//http://b5.clapalong.com/root/mainCity.action?
	task = "getcity";
	getdata(clapurl,task);
}
function getcity2(param)
{
	//volunteer
	$("#rightnum").html(param.rightnum);
	if (param.rightnum==0) $("#volunteerstatus").html(imgdone);
	else $("#volunteerstatus").html(imgnotdone);
	
	buildings = param.maincitydto;
	
	//TODO
	if (buildings[24] && buildings[24].buildlevel>=82) canalchemy=true;
	else $("#refinestatus").html(imgdisabled);
	
	//first run
	secondloop = setTimeout(secondcycle, 100);
	halfhourloop = setTimeout(halfhourcycle, 3000);
	buttonlisterner();
}

function upgradebuilding(bid)
{
	clapurl = gameurl+"/root/mainCity!upgradeLevel.action?";
	data="player%5FBuildingId="+bid;
	task = "upgradebuilding";
	postdata(clapurl,data,task);
}

//Aide/////////////////////////////////////////////////////////////////////////////////////////////////////
var aidelv;
var refineleft;
var aidedivinity;
var aidedivinitycd;
var farmharvest;
var freecommission;
var aidedivleft;

function autoaidedivcheck()
{
	if (document.getElementById("autoaidedivcheck").checked == true)
	{
		getaide();
	}
	else 
	{
		clearTimeout(getaidedivloop);
		status("Auto Get Aide Divinity stopped.");
	}
}

function getaide()
{
	if ($("#playerlevel").html()<30) return;
	
	clapurl = gameurl+"/root/secretary.action?";// http://b5.clapalong.com/root/secretary.action?1338651417543
	task = "getaide";
	getdata(clapurl,task);
}
var getaidedivloop;
function getaide2(param)
{
	aidelv = param.lv;
	farmharvest = param.lin;
	freecommission = param.freer;
	
	//AideSalary
	if (param.ss==1) 
	{
		$("#salarystatus").html(imgnotdone);
		$("#salaryleft").html(1);
		autogetsalarycheck();
	}
	else 
	{
		$("#salaryleft").html(0);
		$("#salarystatus").html(imgdone);
	}
	
	//Aidefarm
	leaguefarmid = param.liid;
	$("#lin").html(param.lin);
	if (param.lin>0)
	{
		$("#harveststatus").html(imgnotdone);
		autoharvestcheck();
	}
	else $("#harveststatus").html(imgdone);
	
	/*/AideDivinity
	aidedivleft=param.maxtokennum-param.tokennum;
	$("#aidedivleft").html(aidedivleft);
	if (aidedivleft==0) $("#aidedivstatus").html(imgdone);
	else $("#aidedivstatus").html(imgnotdone);
	if (param.tokennum<param.maxtokennum && document.getElementById("autoaidedivcheck").checked == true) 
	{
		if (param.cd==0)
		{
			getaidediv();
		}
		else
		{
			clearTimeout(getaidedivloop);
			getaidedivloop=setTimeout(getaidediv, param.cd+2000);
			status("Getting next aide divinity at "+stamp(param.cd+2000));
			$("#aidedivstatus").html("CD: Next div at "+stamp(param.cd+2000));
		}
	}
	*/
}
function getaidediv()
{
	clapurl = gameurl+"/root/secretary!applyToken.action?";// http://b5.clapalong.com/root/secretary!applyToken.action?1338333180873
	task = "getaidediv";
	getdata(clapurl,task);
}
function getaidediv2(param)
{
	aidedivleft=param.maxtokennum-param.tokennum;
	$("#aidedivleft").html(aidedivleft);
	if (aidedivleft==0) $("#aidedivstatus").html(imgdone);
	
	if (param.tokennum<param.maxtokennum && document.getElementById("autoaidedivcheck").checked == true) 
	{
		clearTimeout(getaidedivloop);
		getaidedivloop=setTimeout(getaidediv, param.cd+2000);
		status("Getting next aide divinity at "+stamp(param.cd+2000));
		$("#aidedivstatus").html("CD: Next div at "+stamp(param.cd+2000));
	}
}

//Conscript////////////////////////////////////////////////////////////////////////////////////////////////////////
function getvolunteerconscript()
{
	if ($("#rightnum").val!=0 && $("#autovolunteercheck").is(':checked'))
	{
		clapurl = gameurl+"/root/mainCity.action?";
		task = "getvolunteerconscript";
		getdata(clapurl,task);
	}
}
var volunteerloop;
function volunteerconscript(param)
{
	$("#rightnum").html(param.rightnum);
	if (param.rightnum==0)
	{
		status("No volunteer conscript quota left!");
		$("#volunteerstatus").html(imgdone);
		return;
	}
	if ( ($("#forces").html()/$("#maxforce").html()*100) > $("#volunteerpercent").val())
	{
		status("Troops not low enough to conscript");
		return;
	}
	if (param.rightcd!=0)
	{
		clearTimeout(volunteerloop);
		volunteerloop=setTimeout(getvolunteerconscript, param.rightcd+2000);
		status("Getting next volunteer conscript at "+stamp(param.rightcd+2000));
		$("#volunteerstatus").html("CD: Next conscript at "+stamp(param.rightcd+2000));
		return;
	}
	
	clapurl = gameurl+"/root/mainCity!rightArmy.action?";// http://b5.clapalong.com/root/mainCity!rightArmy.action?
	task = "volunteerconscript";
	getdata(clapurl,task);
}
function volunteerconscript2(param)
{
	
}

function validatevolunteerpercent()
{
	if (isNaN($("#volunteerpercent").val())) $("#volunteerpercent").val(84);
	if ($("#volunteerpercent").val()<0) $("#volunteerpercent").val(0);
	if ($("#volunteerpercent").val()>84) $("#volunteerpercent").val(84);
}

function conscript()
{
	clapurl = gameurl+"/root/mainCity!preDraught.action?";//http://b5.clapalong.com/root/mainCity!preDraught.action?
	task = "volunteerconscript";
	getdata(clapurl,task);
}
function conscript2(param)
{
	//param.forcemax
}



//Daily Salary//////////////////////////////////////////////////////////////////////////////////////////////////////
function autogetsalarycheck()
{
	if (document.getElementById("autogetsalarycheck").checked == true)
	{
		getsalary();
	}
	else 
	{
		
	}
}

function getsalary()
{
	if ($("#salaryleft").html()==0) 
	{
		return;
	}
	clapurl = gameurl+"/root/officer!saveSalary.action?";// http://b5.clapalong.com/root/officer!saveSalary.action?1338655069085
	task = "getsalary";
	getdata(clapurl,task);
}
function getsalary2(param)
{
	if ("message" in param) $("#salarystatus").html(param.message);
	else 
	{
		status("Daily Salary Received.");
		$("#salaryleft").html(0);
		$("#salarystatus").html(imgdone);
	}
}

//League Farm///////////////////////////////////////////////////////////////////////////////////////////////////////
var leaguefarmid=-2;

function autoharvestcheck()
{
	if (document.getElementById("autoharvestcheck").checked == true)
	{
		harvestcrop();
	}
	else 
	{
		
	}
}

function harvestcrop()
{
	if (leaguefarmid==-2)
	{
		getaide();
		setTimeout(harvestcrop, 2000);
		return;
	}
	if (leaguefarmid==-1)
	{
		status("No League Farm to harvest");
		return;
	}
	clapurl = gameurl+"/root/world!impose.action?";// http://b5.clapalong.com/root/world!impose.action? resId=10
	data = "resId="+leaguefarmid;
	task = "harvestcrop";
	postdata(clapurl,data,task);
}
function harvestcrop2(param)
{
	if ("message" in param) $("#harveststatus").html(param.message);
	else
	{
		status("League Farm Harvested Crop: "+param.gains);
		getaide();
	}
	if (leaguefarmid==-1)
	{
		status("No League Farm");
	}
	
}

//Expedition///////////////////////////////////////////////////////////////////////////////////////////////
var army;
var npcdrop;

function getmap()
{
	clapurl = gameurl+"/root/battle.action?";// http://b47.clapalong.com/root/battle.action?1338071513169
	task = "getmap";
	getdata(clapurl,task);
}

function getmap2(param)
{
	$("#mapname").html(param.power.powername);
	$("#pmap").html("");
	$("#nmap").html("");
	if ("prepower" in param.power && "property" in param.power.prepower)
	{
		if("powerid" in param.power.prepower.property) $("#pmap").html("<input powerid='"+param.power.prepower.property.powerid+"' value='"+param.power.prepower.property.powername+"' class='maps' type='button'>");
		else 
		{
			$("#pmap").html("<input powerid='"+param.power.prepower.property[0].powerid+"' value='"+param.power.prepower.property[0].powername+"' class='maps' type='button'>");
			$("#pmap").append("<br><input powerid='"+param.power.prepower.property[1].powerid+"' value='"+param.power.prepower.property[1].powername+"' class='maps' type='button'>");
		}
	}
	if ("nextpower" in param.power && "property" in param.power.nextpower)
	{
		if("powerid" in param.power.nextpower.property) $("#nmap").html("<input powerid='"+param.power.nextpower.property.powerid+"' value='"+param.power.nextpower.property.powername+"' class='maps' type='button'>");
		else 
		{
			$("#nmap").html("<input powerid='"+param.power.nextpower.property[0].powerid+"' value='"+param.power.nextpower.property[0].powername+"' class='maps' type='button'>");
			$("#nmap").append("<br><input powerid='"+param.power.nextpower.property[1].powerid+"' value='"+param.power.nextpower.property[1].powername+"' class='maps' type='button'>");
		}
	}
	$('.maps').click(function () {
		movemap($(this).attr("powerid"));
    });
	
	$("#npclist").html("");
	var npc;
	for(var key in param.army)
	{
		npc = param.army[key];
		if (npc.attackable=="1")
		{
			if ("itemname" in npc) npcdrop = npc.itemname;
			else npcdrop = "";
			$("#npclist").append("\
			<tr><td><input armyid='"+npc.armyid+"'  class='attackbutton' type='button' value='Attack'/>\
			<input armyid='"+npc.armyid+"' class='attacktimes' type='text' value='1' maxlength='3' size='2'/>times</td>\
			<td class='npctype"+npc.type+" npccomplete"+npc.complete+"'>"+npc.armyname+"</td><td>"+npc.armylevel+"</td><td>"+npc.jyungong+"</td>\
			<td class='npcdrop'>"+npcdrop+"</td></tr>");
		}
	}
	$('.attackbutton').click(function () {
		addattack($(this).attr("armyid"),$('.attacktimes[armyid="'+$(this).attr("armyid")+'"]').val());
    });
}

function attackButton()
{
	army = document.getElementById("ArmyID").value;
	attack(army);
}

function attack(ArmyID)
{
	if(ArmyID>900000) 
	{
		status("Cannot Attack Legion");
		return;
	}
	if(ArmyID=="") return;
	
	status("Attacking NPC:"+ArmyID);
	clapurl = gameurl+"/root/battle!battleArmy.action?";
	data = "armyId="+ArmyID;
	task = "attack";
	postdata(clapurl,data,task);
}
function attack2(param)
{
	status(param.battlereport.message);
	if (param.items.list.value) status("Gained "+param.items.list.value);
	if (param.playerbattleinfo) updateplayerinfo(param.playerbattleinfo);
}
function movemap(mid)
{
	clapurl = gameurl+"/root/battle!getPowerInfo.action?";
	data = "powerId="+mid;
	task = "movemap";
	postdata(clapurl,data,task);
}

function uploadmap()
{
	clapurl = gameurl+"/root/battle.action?";// http://b47.clapalong.com/root/battle.action?1338071513169
	task = "uploadmap";
	getdata(clapurl,task);
}
function uploadmap2(param)
{
	for(var key in param.army)
	{
		if (param.army[key].attackable=="1" && param.army[key].armyid<900000)
		{
			uploadqueue.push(param.army[key].armyid);
		}
	}
	sort_and_unique(uploadqueue);
	getnextreport();
}

function uploadallmap()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: botserver+"loadallnpc.php?min="+$("#minmap").val()+"&max="+$("#maxmap").val()+"",
		onerror: function(e) { status("No Internet?"); },
		onload: function(e) 
		{
			uploadqueue=uploadqueue.concat(e.responseText.split(","));
			uploadqueue=sort_and_unique(uploadqueue);
			getnextreport();
		}
	});
}

function sort_and_unique( my_array ) {
    my_array.sort();
    for ( var i = 1; i < my_array.length; i++ ) {
        if ( my_array[i] === my_array[ i - 1 ] ) {
                    my_array.splice( i--, 1 );
        }
    }
    return my_array;
};

var getreportcd;
var maxreportid=10000;
var currentbrid;
var uploadqueue=new Array();
function getnextreport()
{
	clearTimeout(getreportcd);
	if (uploadqueue.length>=1)
	{
		currentbrid = uploadqueue[0];
		
		if (currentbrid>maxreportid)
		{
			status("Skip BR for (NPC:"+currentbrid+">"+maxreportid+")");
			uploadqueue.shift();
			$("#reportqueue").html(uploadqueue.join(','));
			getreportcd=setTimeout(getnextreport,100);
			return;
		}
		else status("Get BR for (NPC:"+currentbrid+") Remaining: "+(uploadqueue.length-1));
		
		uploadqueue.shift();
		$("#reportqueue").html(uploadqueue.join(','));
		
		getreport(currentbrid);
	}
}
function getreport(ArmyID)
{
	if(ArmyID>900000 || ArmyID=="") return;
	
	clapurl = gameurl+"/root/battleReport!getBattleReport.action?";
	data = "armyId="+ArmyID;
	task = "getreport";
	postdata(clapurl,data,task);
}
function getreport2(param)
{
	if (!("reportid" in param)) 
	{
		maxreportid=currentbrid;
		status("No Battle Report for (NPC: >"+currentbrid);
	}
	getreportcd=setTimeout(getnextreport,100);
}

var getattackcd;
var currentattackarmy;
var aattackqueue=new Array();
function addattack(armyid,atimes)
{
	for (var i=1;i<=atimes;i++) aattackqueue.push(armyid);
	getnextattack();
}

function getnextattack()
{
	clearTimeout(getattackcd);
	if (aattackqueue.length>=1)
	{
		currentattackarmy=aattackqueue[0];
		status("Attacking (NPC:"+currentattackarmy+") Remaining: "+(aattackqueue.length-1));
		
		aattackqueue.shift();
		$("#attackqueue").html(aattackqueue.join(','));
		
		attackqueue(currentattackarmy);
	}
	else $("#attackstatus").html("-");
}
function attackqueue(ArmyID)
{
	if(ArmyID>900000) 
	{
		status("Cannot Attack Legion");
		return;
	}
	if(ArmyID=="") return;
	
	if(isNaN(ArmyID))
	{
		eval(ArmyID);
		return;
	}
	
	clapurl = gameurl+"/root/battle!battleArmy.action?";
	data = "armyId="+ArmyID;
	task = "attackqueue";
	postdata(clapurl,data,task);
}
var attackdelay=1500;
function attackqueue2(param)
{
	status(param.battlereport.message);
	if ("value" in param.items.list) status("Gained "+param.items.list.value);
	if (param.playerbattleinfo) updateplayerinfo(param.playerbattleinfo);
	
	if(param.playerbattleinfo.token<$('#minattackdiv').val())
	{
		status("Auto attack: Not enough divinity!");
		$("#attackstatus").html("Not enough divinity!");
		return;
	}
	
	if(param.playerbattleinfo.tokencdflag==1) attackdelay=param.playerbattleinfo.tokencd+3000;
	else attackdelay=param.playerbattleinfo.tokencd-1000*60*15;//15min
	
	if (attackdelay<1500) attackdelay=1500;
	else 
	{
		status("Attack CD: Next attack at "+stamp(attackdelay));
		$("#attackstatus").html("CD: Next attack at "+stamp(attackdelay));
	}
	
	if(param.battlereport.winside==1)
	{	
		getmap();
		getattackcd=setTimeout(getnextattack,attackdelay+500);
	}
}

//Equipments//////////////////////////////////////////////////////////////////////////////////////////////////
var pg;
var equiptype=new Array();
equiptype[1]="Valor Hit";
equiptype[2]="Valor Shield";
equiptype[3]="Spirit Hit";
equiptype[4]="Spirit Shield";
equiptype[5]="Element Hit";
equiptype[6]="Faculty";
equiptype[7]="Element Shield";
var costmultiplier=1;
var tempprice;
var temphero;
var itemdisable;
var pgdirection=new Array();
pgdirection[-1]="&darr;";
pgdirection[1]="&uarr;";

function getequip()
{
	clapurl = gameurl+"/root/equip!getUpgradeInfo.action?";
	task = "getequip";
	getdata(clapurl,task);
}
var ehelpers;
var reduceratio=0;
function getequip2(param)
{
	if ("flag" in param)
	{	
		alert(param.msg); //You don't have enough Drachmas.
		return;
	}
	
	document.getElementById("itemlist").innerHTML = "";
	var besthelper = "";
	if ("officer" in param.officerlist) // ehelpers
	{
		ehelpers = param.officerlist.officer;
		ehelpers.sort(function(a,b){return b.ratio-a.ratio;}); // sort ehelpers
		besthelper = ehelpers[0].playerid;
		document.getElementById("besthelper").innerHTML = "\
		<b>"+ehelpers[0].playername+"</b> Reduces by <b>"+ehelpers[0].ratio+"%</b>";
		costmultiplier = (100-ehelpers[0].ratio)/100;
	}
	
	setpg(param.magic,param.magicstate);
	param.equip.sort(function(a,b){return b.hp-a.hp;});
	param.equip.sort(function(a,b){return a.equiptype-b.equiptype;});
	param.equip.sort(function(a,b){return b.quality-a.quality;});
	
	for(var key in param.equip)
	{
		item = param.equip[key];
		tempprice = parseInt(item.coppercost*costmultiplier);
		if ("generalname" in item) temphero = item.generalname;
		else temphero="";
		document.getElementById("itemlist").innerHTML += "<tr>\
		<td>"+item.storeid+"</td><td>"+temphero+"</td>\
		<td class='coloredlist'><b class='equipcolor"+item.quality+"'>"+item.equipname+"</b><br>"+item.equipstagename+item.equiplevel+"</td>\
		<td><b>"+equiptype[item.equiptype]+" +"+item.attribute+"</b><br>Faculty +"+item.hp+"</td>\
		<td><b>"+equiptype[item.equiptype]+" +"+item.nextattribute+"</b><br>Faculty +"+item.nexthp+"</td>\
		<td>"+tempprice+"<br>Drachmas</td>\
		<td><input id='item"+item.storeid+"' type='button' value='Enhance'/></td></tr>";
	}
	for(var key in param.equip)
	{
		item = param.equip[key];
		if (item.upgradeable=="1")
		{
			document.getElementById("item"+item.storeid).addEventListener('click',(function(i){return function(){
				upgradeitem(i,besthelper);
			};})(item.storeid),false);
		}
	}
}
function upgradeitem(i,helper)
{
	if (!pg) pg=100;
	clapurl = gameurl+"/root/equip!upgradeMyEquip.action?";
	data = "gold=0&magic="+pg+"&storeId="+i+"&assPlayerId=%2D1";
	if (helper!="") data="gold=0&magic="+pg+"&storeId="+i+"&assPlayerId="+helper;//gold=0&magic=95&storeId=3332389&assPlayerId=31991
	task = "upgrade";
	//alert(data);
	postdata(clapurl,data,task);
}

function setpg(param, param2)
{
	pg=param;
	document.getElementById("magic").innerHTML=param+"%"+pgdirection[param2];
}


//Refine//////////////////////////////////////////////////////////////////////////////////////////////////
var helpers;
var helper1;
var helper2;
var diamonds; // filtered refine list to be sorted
function autorefinecheck()
{
	if (document.getElementById("autorefinecheck").checked == true)
	{
		status("Auto refine started.");
		getrefine();
	}
	else 
	{
		clearTimeout(getrefineloop);
		status("Auto refine stopped.");
		$("#refinestatus").html(imgstopped);
	}
}

function getareaprice()
{
	if (!canalchemy) return;
	
	clapurl = gameurl+"/root/make.action?";// http://b5.clapalong.com/root/make.action?
	task = "getareaprice";
	getdata(clapurl,task);
}
function getareaprice2(param)
{
	document.getElementById("makenum").innerHTML=param.makenum;
	document.getElementById("areaprice").innerHTML=param.price;
	if (param.makenum==0) $("#refinestatus").html(imgdone);
	else $("#refinestatus").html(imgnotdone);
}

function getrefine()
{
	if (!canalchemy) return;
	clapurl = gameurl+"/root/make.action?";// http://b5.clapalong.com/root/make.action?
	task = "getrefine";
	getdata(clapurl,task);
}
var getrefineloop;
function gethelper1(param)
{
	document.getElementById("makenum").innerHTML=param.makenum;
	document.getElementById("areaprice").innerHTML=param.price;
	if (param.makenum==0) 
	{
		status("No refine quota");
		$("#refinestatus").html(imgdone);
		return;
	}
	if (param.price < $("#refineareaprice").val())
	{
		clearTimeout(getrefineloop);
			remainminutes = ((60-min)%30);
			if (remainminutes==0) remainminutes=30;
			remainseconds = remainminutes*60-sec+secondbuffer+(secondrange*Math.random());
		getrefineloop=setTimeout(getrefine, remainseconds*1000);
		status("Area Price too low! Next refine will be at "+stamp(remainseconds*1000));
		$("#refinestatus").html("Low Price: Next refine at "+stamp(remainseconds*1000));
		return;
	}
	
	if (param.cdflag==1 && param.mcd > 0) 
	{
		clearTimeout(getrefineloop);
		getrefineloop=setTimeout(getrefine, param.mcd+3000);
		status("Red CD! Next refine at "+stamp(param.mcd+3000));
		$("#refinestatus").html("CD: Next refine at "+stamp(param.mcd+3000));
		return;
	}
	if (param.mcd > 880000)
	{
		clearTimeout(getrefineloop);
		getrefineloop=setTimeout(getrefine, param.mcd-880000);
		status("Next refine at "+stamp(param.mcd-880000));
		$("#refinestatus").html("CD: Next refine at "+stamp(param.mcd-880000));
		return;
	}

	clapurl = gameurl+"/root/make!getWeaverAssInfo.action?";// http://b5.clapalong.com/root/make!getWeaverAssInfo.action?1338416758585
	task = "gethelper1";
	getdata(clapurl,task);
}
function getrefine1(param)
{
	helpers = param.assplayer;
	helpers.sort(function(a,b){return b.weaversuc+b.weavercri-a.weaversuc-a.weavercri;}); // sort
	// helpers
	helper1 = helpers[0].playerid;
	clapurl = gameurl+"/root/make.action?";// http://b5.clapalong.com/root/make.action?
	data = "firstAssPId="+helper1;
	task = "getrefine1";
	postdata(clapurl,data,task);
}
function gethelper2(param)
{
	clapurl = gameurl+"/root/make!getWeaverAssInfo.action?";// http://b5.clapalong.com/root/make!getWeaverAssInfo.action?1338416758585
	task = "gethelper2";
	data = "firstAssPId="+helper1;
	postdata(clapurl,data,task);
}
function getrefine2(param)
{
	helpers = param.assplayer;
	helpers.sort(function(a,b){return b.weaversuc+b.weavercri-a.weaversuc-a.weavercri;}); // sort
	// helpers
	helper2 = helpers[0].playerid;
	clapurl = gameurl+"/root/make.action?";// http://b5.clapalong.com/root/make.action?
	data = "firstAssPId="+helper1+"&secondAssPId="+helper2; // firstAssPId=32117&secondAssPId=24537
	task = "getrefine2";
	postdata(clapurl,data,task);
}
/*
 * function gethelper3(param) { clapurl =
 * gameurl+"/root/make!getWeaverAssInfo.action?";//http://b5.clapalong.com/root/make!getWeaverAssInfo.action?1338416758585
 * task = "gethelper2"; data = "firstAssPId="+helper1+"&secondAssPId="+helper2;
 * postdata(clapurl,data,task); }//
 */
function dorefine(param)
{
	//document.getElementById("refinelist").innerHTML = (dump(param.make));
	
	diamonds = param.make.filter(isDiamond);
	diamonds.sort(function(a,b){return b.lv-a.lv;}); // Choose highest level
	// Diamond or Quartz
	// printarray(dump(diamonds));
	clapurl = gameurl+"/root/make!make.action?";// http://b5.clapalong.com/root/make!make.action?1338418538619
	task = "dorefine";
	data = "firstAssPId="+helper1+"&secondAssPId="+helper2+"&makeId="+diamonds[0].id;
	// alert(data);
	status("Refining <b>Lv"+diamonds[0].lv+" "+diamonds[0].name+"</b> ("+diamonds[0].s+"%/"+diamonds[0].c+"%)");
	postdata(clapurl,data,task);
}
//diamonds = obj.make.filter(isDiamond);
function isDiamond(element, index, array) {
	return (element.type >= 3);
}
function dorefine2(param)
{
	status("Refine: Gained <b>"+param.playerupdateinfo.makeresult.makeresult.profit+" Drachmas.</b>\
			("+param.playerupdateinfo.makeresult.makeresult.firstresult+"&times;"+param.playerupdateinfo.makeresult.makeresult.result+")");
	if (param.playerupdateinfo.makeresult.makeresult.addmaketimes) status("Gained <b>1 extra refine quota.</b>");
	//document.getElementById("refinelog").innerHTML += dump(param)+"<hr>";
	
	if (document.getElementById("autorefinecheck").checked == true)	getrefine();
	else getareaprice();
}

function validaterefineareaprice()
{
	if (isNaN($("#refineareaprice").val())) $("#refineareaprice").val(120);
	if ($("#refineareaprice").val()<0) $("#refineareaprice").val(0);
	if ($("#refineareaprice").val()>135) $("#refineareaprice").val(135);
}

//Caravans//////////////////////////////////////////////////////////////////////////////////////////////
function getcaravans()
{
	if ($("#playerlevel").html()<41) return;
	
	clapurl = gameurl+"/root/caravan!getTradeInfo.action?";
	task = "getcaravans";
	getdata(clapurl,task);
}
var vans;
var vanvalue=new Array();
vanvalue[1]=2;
vanvalue[2]=7;
vanvalue[3]=5;
vanvalue[4]=10;
vanvalue[5]=3;
vanvalue[6]=8;
vanvalue[7]=11;
vanvalue[8]=12;
vanvalue[9]=4;
vanvalue[10]=9;
vanvalue[11]=1;
vanvalue[12]=6;

function sortcaravans(param)
{
	$("#tradetimes").html(param.tradetimes);
	if (param.tradetimes == 0)
	{
		status("No more caravans");
		$("#caravanstatus").html(imgdone);
		return;
	}
	vans = param.refresh.filter(vanMissing);
	if (!vans[0]) 
	{
		vans = param.refresh;
		// status("No missing caravans in choices");
	}
	vans.sort(function(a,b){return vanvalue[b.textilemerchantid]-vanvalue[a.textilemerchantid];});
	// printarray(dump(vans));
	sendcaravan(vans[0].textilemerchantid);
}
function vanMissing(element, index, array) {
	return (element.state == 0);
}
function sendcaravan(id)
{
	clapurl = gameurl+"/root/caravan!trade.action?";
	data = "caravanId="+id;
	task = "sendcaravan";
	// alert(data);
	postdata(clapurl,data,task);
}
function sendcaravan2(param)
{
	temptext = "Caravan: Gained <b>"+param.gold+"</b> Drachmas";
	if (param.goldcombo) temptext+= " Trader Combo "+param.comboid+" Gained <b>"+param.goldcombo+" extra</b> Drachmas";
	if (param.newtextilemerchantname) temptext+= " Obtained <b>"+param.newtextilemerchantname+"</b>";
	status(temptext);
	
	if (document.getElementById("autovancheck").checked == true) getcaravans();
}

function autovancheck()
{
	if (document.getElementById("autovancheck").checked == true)
	{
		//status("Auto trade stock started.");
		getcaravans();
	}
	else 
	{
		status("Auto send caravans stopped.");
	}
}

//Warehouse/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var stock = new Array();
var stockkey;
var capacity;
var storage;
var remainingcapacity;
var stockrange = new Array(7);
stockrange[1] = [45,135,"Bean"];
stockrange[2] = [50,150,"Apple"];
stockrange[3] = [60,180,"Wood"];
stockrange[4] = [75,225,"Iron"];
stockrange[5] = [400,1200,"Gold"];
stockrange[6] = [1500,4500,"Pearl"];
stockrange[7] = [4000,12000,"Diamond"];
for(var key in stockrange)
{
	stockrange[key]["mid"] = (stockrange[key][0]+stockrange[key][1])/2; // middle
	// point
	stockrange[key]["span"] = (stockrange[key][1]-stockrange[key][0]);
}

function autotradecheck()
{
	if (document.getElementById("autotradecheck").checked == true)
	{
		status("Auto trade stock started.");
		getstock();
	}
	else 
	{
		clearTimeout(getstockloop);
		status("Auto trade stock stopped.");
	}
}

function getstock()
{
	if(innewarea!=1) return;
	
	clapurl = gameurl+"/root/stock.action?";// http://b5.clapalong.com/root/stock.action?
	task = "getstock";
	getdata(clapurl,task);
}
var getstockloop;
function getstock2(param)
{
	capacity = param.postion;
	storage = param.currentpositon;
	remainingcapacity = capacity - storage;
	document.getElementById("stockstorage").innerHTML = "<b>Storage: "+storage+"/"+capacity+"("+remainingcapacity+")</b>";

	for(var i=1;i<=7;i++)
	{
		stockkey = "g"+i;
		stock[i] = param[stockkey];
		stock[i]["position"] = parseInt((stock[i]["price"]-stockrange[i]["mid"])/stockrange[i]["span"]*200);
	}
	stock.sort(function(a,b){return a.cd-b.cd;}); //lowest cd first
	printstock(stock);
	
	//stock = stock.filter(removestock);
	//stock.sort(function(a,b){return Math.abs(b.position)-Math.abs(a.position);});
	printarray(dump(stock));
	
	if (param.cd > 0)
	{
		clearTimeout(getstockloop);
		getstockloop=setTimeout(getstock, param.cd+2000);
		status("Trading CD. Next trade at "+stamp(param.cd+2000));
		$("#stockstatus").html("CD: Next trade at "+stamp(param.cd+2000));
		return;
	}
	
	//sell first
	for(var i=1;i<=7;i++)
	{
		if (stock[i].price>=$(".sellstockprice"+stock[i].goodid).val() && stock[i].storage>0)
		{
			trade("sell",stock[i].goodid);
			return;
		}
	}
	//buy
	for(var i=1;i<=7;i++)
	{
		if (stock[i].price<=$(".buystockprice"+stock[i].goodid).val() && stock[i].num<=remainingcapacity)
		{
			trade("buy",stock[i].goodid);
			return;
		}
	}
	
	//if didn't sell or buy
	remainminutes = ((60-min)%30);
	if (remainminutes==0) remainminutes=30;
	remainseconds = remainminutes*60-sec+secondbuffer+(secondrange*Math.random());
	
	clearTimeout(getstockloop);
	getstockloop=setTimeout(getstock, remainseconds*1000);
	status("No stock to trade. Next trade at "+stamp(remainseconds*1000));
	$("#stockstatus").html("No stock: Next trade at "+stamp(remainseconds*1000));
	return;
}
function removestock(element, index, array) {
	return ((element.position > 0 && element.storage > 0 )||(element.num<remainingcapacity && element.position<0));
}
function printstock(param)
{
	//printarray(dump(stockrange));
	$("#stocklist").html("");
	for(var i=1;i<=7;i++)
	{
		item = param[i];
		document.getElementById("stocklist").innerHTML += "\
		<tr><td><b>"+item.name+"</b></td><td>"+item.price+direction[item.alter]+"</td><td>"+item.position+"%</td>\
		<td>"+item.buyprice+"</td><td>"+item.cd+"</td><td>"+item.num+"</td><td>"+item.storage+"</td>\
		<td><input id='buystock"+item.goodid+"' type='button' value='Buy'/></td>\
		<td><input id='sellstock"+item.goodid+"' type='button' value='Sell'/></td></tr>";
	}
	for(var i=1;i<=7;i++)
	{
		item = param[i];
		{
			document.getElementById("buystock"+item.goodid).addEventListener('click',(function(i){return function(){
				trade(0,i);
			};})(item.goodid),false);
			document.getElementById("sellstock"+item.goodid).addEventListener('click',(function(i){return function(){
				trade(1,i);
			};})(item.goodid),false);
		}
	}
}
function trade(type,stockid)
{
	if(type=="buy") type=0;
	if(type=="sell") type=1;

	clapurl = gameurl+"/root/stock!tradeStock.action?";// http://b5.clapalong.com/root/stock!tradeStock.action?1338329801531
	data = "tradeType="+type+"&goodId="+stockid+"&num=1";
	task = "trade";
	// alert(data);
	postdata(clapurl,data,task);
}
function trade2(param)
{
	status(param.message);
	if (param.state==0)
	{
		status("Warehouse closed.");
		return;
	}
	getstock();
}

function logstock()
{
	if(innewarea!=1) return;
	
	clapurl = gameurl+"/root/stock.action?";// http://b5.clapalong.com/root/stock.action?
	task = "logstock";
	getdata(clapurl,task);
}
function logstock2(param)
{
	capacity = param.postion;
	storage = param.currentpositon;
	remainingcapacity = capacity - storage;
	document.getElementById("stockstorage").innerHTML = "<b>Storage: "+storage+"/"+capacity+"("+remainingcapacity+")</b>";

	for(var i=1;i<=7;i++)
	{
		stockkey = "g"+i;
		stock[i] = param[stockkey];
		stock[i]["position"] = parseInt((stock[i]["price"]-stockrange[i]["mid"])/stockrange[i]["span"]*200);
	}
	stock.sort(function(a,b){return a.cd-b.cd;});
	printstock(stock);
}


//Other///////////////////////////////////////////////////////////////////////////////////////////////////////
function getinfo()
{
	clapurl = gameurl+"/root/server!getPlayerInfoByUserId.action?";// http://b5.clapalong.com/root/server!getPlayerInfoByUserId.action?
	task = "getinfo";
	getdata(clapurl,task);
}
var looping=0;
var userid;
var innewarea;


function getinfo2(param)
{
	if ("player" in param && param.player.length>1)
	{
		status("Please select your player. Bot restart in 15 sec.");
		setTimeout(getinfo,15000);
		return;
	}
	if (version != param.botversion) 
	{
		var updatetext = "<b>Batheo Bot Update available!</b><br><br>Please update to the latest version at:<br> <a target='blank' href='http://userscripts.org/scripts/show/131025'>http://userscripts.org/scripts/show/131025</a>!";
		if ($("#updatetext")[0]) updatetext=$("#updatetext").html();
		var $dialog = $('<div></div>')
		.html(updatetext)
		.dialog({
			autoOpen: false,
			title: 'Batheo Bot Update',
			zIndex: 1100000
		});
		$dialog.dialog('open');
	}
	else if(param.state==0 && "message" in param)
	{
		createcharacter();
	}
	else
	{
		if ("message" in param) param=param.message;
		
		innewarea = param.player.innewarea;
		if (innewarea!=1) 
		{
			$("#stockstatus").html(imgdisabled);
			$("#oreminestatus").html(imgdisabled);
		}
		
		document.getElementById("VersionField").innerHTML=version;
		if (param.limitvalue.maxfood) document.getElementById("maxfood").innerHTML=param.limitvalue.maxfood;
		if (param.limitvalue.maxcoin) document.getElementById("maxcoin").innerHTML=param.limitvalue.maxcoin;
		if (param.limitvalue.maxforce) document.getElementById("maxforce").innerHTML=param.limitvalue.maxforce;
		updateplayerinfo(param.player);
		
		if (param.player.playerlevel<41) $("#caravanstatus").html(imgdisabled);
		if (param.player.playerlevel<12) $("#cropstatus").html(imgdisabled);
		
		
		if (looping==0)
		{
			looping=1;
			if (innewarea==1) getoremine();
			getactivity();
			if (param.player.playerlevel>=30) setTimeout(getaide,500);
			setTimeout(getcity,1000);
		}
	}
}

function updateplayerinfo(param)
{
	if ("copper" in param)	setdrachmas(param.copper);
	if ("token" in param)	setdivinity(param.token);
	if ("playerid" in param) setuserid(param.playerid);
	
	if ("jyungong" in param) document.getElementById("jyungong").innerHTML=param.jyungong;
	if ("prestige" in param) document.getElementById("prestige").innerHTML=param.prestige;
	if ("forces" in param) 
	{
		document.getElementById("forces").innerHTML=param.forces;
		getvolunteerconscript();
	}
	
	if ("playerlevel" in param) document.getElementById("playerlevel").innerHTML=param.playerlevel;
	if ("playername" in param) document.getElementById("playername").innerHTML=param.playername;
	if ("sys_gold" in param) document.getElementById("sys_gold").innerHTML=param.sys_gold;
	
	if (param.maxtoken) document.getElementById("maxtoken").innerHTML=param.maxtoken;
	if (param.atttoken) document.getElementById("atttoken").innerHTML=param.atttoken;
	if (param.maxattacktoken) document.getElementById("maxattacktoken").innerHTML=param.maxattacktoken;
	if ("food" in param) document.getElementById("food").innerHTML=param.food;
	if ("tradetimes" in param) 
	{
		document.getElementById("tradetimes").innerHTML=param.tradetimes;
		if (param.tradetimes!=0) $("#caravanstatus").html(imgnotdone);
		else $("#caravanstatus").html(imgdone);
	}
	
}
var drachmas;
function setdrachmas(copper)
{
	drachmas = copper;
	document.getElementById("copper").innerHTML=copper;
}
var divinity;
function setdivinity(token)
{
	divinity = token;
	document.getElementById("token").innerHTML=token;
}
function setuserid(id)
{
	userid=id;
	document.getElementById("playerid").innerHTML=id;
}

//Get Activity reward/////////////////////////////////////////////////////////////////
//http://b5.clapalong.com/root/event!saveSalary.action?1338411259302
function getactivity()
{
	clapurl = gameurl+"/root/event.action?";
	task = "getactivity";
	getdata(clapurl,task);
}
function getactivity2(param)
{
	if (param.curreventdto.cd==0)
	{
		if($("#autoactivitycheck").is(':checked')) getactivitysalary();
		else 
		{
			$("#activitystatus").html(imgnotdone);
			$("#activityreward").html("1");
			
		}
	}
	else 
	{
		$("#activitystatus").html(imgdone);
		$("#activityreward").html("0");
	}
}
function getactivitysalary()
{
	clapurl = gameurl+"/root/event!saveSalary.action?";
	task = "getactivitysalary";
	getdata(clapurl,task);
}
function getactivitysalary2(param)
{
	if("salary" in param) 
	{
		status("Gained from activity: "+param.salary+" Drachmas");
		$("#activitystatus").html(imgdone);
		$("#activityreward").html("0");
	}
}



//SMW/////////////////////////////////////////////////////////////////////////////////
/*
refreshmine()
http://b5.clapalong.com/root/miner!refresh.action?

mine()
http://b5.clapalong.com/root/miner!mining.action?

smwmove
http://b5.clapalong.com/root/miner!move.action? 
data = y=5&useToken=0&x=5

getconscript
http://b5.clapalong.com/root/mainCity!preDraught.action?

conscript
http://b5.clapalong.com/root/mainCity!draught.action? forceNum=10000

inspire
http://b5.clapalong.com/root/inspire!silver.action? inspireType=1

attack
http://b5.clapalong.com/root/miner!attack.action? y=3&useToken=0&x=2

replenishtoken
http://b5.clapalong.com/root/miner!repopulation.action?

*/



function data_string(data) // Generates binary data string from character /
//multibyte data
{
	console.log(data);
	var data_string='';
	for(var i=0,il=data.length;i<il;i++) 
	{ 
		data_string+=String.fromCharCode(data[i].charCodeAt(0)&0xff);
	}
		
	console.log(data_string);
	
	return data_string;
}
function postdata(clapurl,data,task)
{
	if (!task) task="None";
	
	GM_xmlhttpRequest(
			{
				method: "POST",
				url: clapurl+calcServerTime(),
				headers:headers_post,
				data:data,
				overrideMimeType: 'text/plain; charset=x-user-defined',
				onerror: function(e) { status("No Internet?"); }, 
				onload: function(response) 
				{
					decode(btoa(data_string(response.responseText)), task, clapurl);
				}
			});
}
function getdata(clapurl,task)
{
	if (!task) task="None";

	GM_xmlhttpRequest(
			{
				method: "GET",
				url: clapurl+calcServerTime(),
				headers: headers_get,
				overrideMimeType: 'text/plain; charset=x-user-defined',
				onerror: function (e) { status("No Internet?"); },
				onload: function (response)
				{
					console.log(response);
					decode(btoa(data_string(response.responseText)), task, clapurl);
				}
			});
}

var version = 7;
var imgdone = "Done";
var imgnotdone = "Not done";
var imgunknown = "Unknown";
var imgstopped = "Stopped";
var imgdisabled = "Disabled";
var botserver = atob("aHR0cDovLzE5OC4yMy4yMjguMTQzL2JhdGhlby9Cb3Qv");
var botuiserver = "https://dl.dropbox.com/u/4238242/Batheo/Bot/";
var boturl = botserver+"decode.php?task=";
function decode(base64_data, task, clapurl)
{
	var stamp1 = new Date().getTime();
	GM_xmlhttpRequest({
		method: "POST",
		headers:{'Content-type':'application/x-www-form-urlencoded',"Referer": clapurl+userid},
		url: boturl+task,
		data: base64_data,
		onerror: function(e) { status("No Internet?"); }, 
		onload: function(e) 
		{ 
			//status("<span class='pale'>"+task+"</span>");
			//document.getElementById("tab7").innerHTML = e.responseText;
			try
			{
				var obj = jQuery.parseJSON(e.responseText);
			}
			catch(err)
			{
				status("Error or bot server down");
				return;
			}
			obj.botlag=new Date().getTime()-stamp1;
			//printarray(dump(obj));
			
			if(obj.state==-1) 
			{
				status(obj.message);
				return;
			}
			
			if(obj.state==0) alert(obj.message);
			else if(obj.state==2) alert(obj.exception);
			else if(obj.state!=1)
			{
				if ("message" in obj) alert(obj.message);
				else if ("exception" in obj)
				{
					alert("Error "+obj.state+": "+obj.message);
					loggedout=true;
					return;
				}
				else alert(e.responseText);
			}
			if (obj.playerupdateinfo) updateplayerinfo(obj.playerupdateinfo);
			responseaction(obj,task);
		}
	});
}

function getbotui()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: botuiserver+"botui5",
		onerror: function(e) { status("No Internet?"); }, 
		onload: function(ui) 
		{
			document.getElementById("win").innerHTML=ui.responseText;
			$('#win').draggable({handle:"#bottitle"}).resizable().tabs();
			$("select, input:checkbox, input:radio, input:file").uniform();
			
			imgdone = $("#imgdone").html();
			imgnotdone = $("#imgnotdone").html();
			imgunknown = $("#imgunknown").html();
			imgstopped = $("#imgstopped").html();
			imgdisabled = $("#imgdisabled").html();
			
			//getGameSwfReferer();
			setGameReferer();
		}
	});
}

function getbotser()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: botuiserver+"ser",
		onerror: function(e) { status("No Internet?"); }, 
		onload: function(e) 
		{
			$(".gameg:first").html(e.responseText);
		}
	});
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	// The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "&nbsp;&nbsp;&nbsp;";

	if(typeof(arr) == 'object') { // Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { // If it is an array,
				dumped_text += level_padding + "'" + item + "' ...<br>";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"<br>";
			}
		}
	} else { // Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}


if (top.location!=self.location) 
{
	setswfref();
}
else
{
	getswfref();
	getbotser();
	removeoffer();
	createlog();
}
function setswfref()
{
	if ($("#Main param[name=movie]")[0])
	{
		GM_setValue("server",location.host);
		GM_setValue("swfReferer",$("#Main param[name=movie]").attr("value")+"");
	}
	else setTimeout(setswfref, 500);
}
function getswfref()
{
	if (GM_getValue("swfReferer")==undefined || GM_getValue("swfReferer")=="")
	{
		setTimeout(getswfref, 1000);
	}
	else
	{
		server = GM_getValue("server");
		gameurl = "http://"+server;
		gameReferer = GM_getValue("swfReferer");
		//alert(gameurl);
		
		GM_setValue("server","");
		GM_setValue("swfReferer","");
		createbot();
	}
}

//Auto create character///////////////////////////////////////////////////////////////////////////////////////////////
function createcharacter()
{
	newplayername=prompt("Please enter your nickname",newplayername);
	if (newplayername==null) return;
	
	clapurl = gameurl+"/root/createRole!setPlayerName.action?";
	data="playerName="+newplayername;
	task = "createcharacter";
	postdata(clapurl,data,task);
}
function createcharacter2(param)
{
	if (param.state==0) createcharacter();
	else choosenewrole();
}
function choosenewrole()
{
	clapurl = gameurl+"/root/createRole!chooseGeneral.action?";
	data="generalId=10004";//Kratos
	task = "choosenewrole";
	postdata(clapurl,data,task);
	getmap();
	
	var autotrial=confirm("Auto finish Trial of Perseus?");
	if (autotrial==true) passtrial();
}

function passtrial()
{
	tutorial(10001);
	
	//Version 6
	aattackqueue = new Array(1101,1102,1110,1111,1118,1113,1114,1115,1116,1117,1119,1120,"trialfinished()");
	
	//Version 5
	aattackqueue = new Array(1101,1102,1110,"getinfo()");
	
	getnextattack();
}
function trialfinished()
{
	postdata(gameurl+"/root/battle!getRewards.action?","powerId=1","getRewards");
	tutorial(10510);
	getdata(gameurl+"/root/world!getArea.action?","getRewards");
	postdata(gameurl+"/root/world!transferArea.action?","areaId=2","transferArea");
	getcity();
	skiptutorial(10515);
	postdata(gameurl+"/root/battle!getPowerInfo.action?","powerId=2","getPowerInfo");
	
	setTimeout(passtroy,2000);
}
function passtroy()
{
	aattackqueue = new Array(1201,1202,1203,1217,1227,"passtroy2()");
	getnextattack();
	//skiptutorial(10520);
}
function passtroy2()
{
	getcity();
	getdata(gameurl+"/root/mainCity!addC.action?","addC");
	getdata(gameurl+"/root/general!buyTrainPosition.action?","buyTrainPosition");
	postdata(gameurl+"/root/general!recruitmentGeneral.action?","generalId=10","recruitmentGeneral");
	postdata(gameurl+"/root/task!getXinshouTaskReward.action?","xinshouTaskId=0","getXinshouTaskReward");
	setTimeout(passtroy3,2000);
}
function passtroy3()
{
	postdata(gameurl+"/root/general!trainGeneral.action?","hourModel=2&generalId=10","trainGeneral");
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
	upgradebuilding(buildings[5].id);
}

function skiptutorial(step)
{
	clapurl = gameurl+"/root/server!updateGuideStepSkip.action?";
	data = "guideStepSkip="+step;// guideStepSkip=10399 = bello
	postdata(clapurl,data,"skiptutorial");
}
function tutorial(step)
{
	clapurl = gameurl+"/root/server!updateGuideStep.action?";
	data = "guideStep="+step;// guideStepSkip=10399 = bello
	postdata(clapurl,data,"tutorial");
}

//Legion////////////////////////////////////////////////////////////////////////////////////////////////////////
function getlegion()
{
	armyleaders.length = 0;
	clapurl = gameurl+"/root/legion.action?";
	data = "count=20&begin=0";
	postdata(clapurl,data,"getlegion");
}
function getlegion2(param)
{
	if("legionbadagedto" in param)
	{
		for(var key in param.legionbadagedto)
		{
			getlegiondetail(param.legionbadagedto[key].legionid);
		}
	}
}
var armyleaders = new Array();
function getlegiondetail(lid)
{
	clapurl = gameurl+"/root/legion!getLegionDetail.action?";
	data = "legionId="+lid;
	postdata(clapurl,data,"getlegiondetail");
}
function getlegiondetail2(param)
{
	if("armyleader" in param.legiondto && param.legiondto.armyleader!= "null") armyleaders.push(param.legiondto.armyleader);
	$('#mailreceipient').val(armyleaders.join(" "));
}

var sendmailqueue = new Array();
var tempmailtarget;
function getmaillist()
{
	sendmailqueue = $('#mailreceipient').val().split(/[\s\n]+/);
	sendmailqueue = sort_and_unique(sendmailqueue);
	if (sendmailqueue.length>0) getnextmail();
}
function getnextmail()
{
	tempmailtarget = sendmailqueue[0];
	sendmailqueue.shift();
	$('#mailreceipient').val(sendmailqueue.join(" "));
	status("Mail to <b>"+tempmailtarget+"</b> Remaining: "+sendmailqueue.length);
	sendmail(tempmailtarget);
}

function sendmail(target)
{
	if (target=="") return;
	
	clapurl = gameurl+"/root/mail!write.action?";
	data = "toUser="+target+"&content="+($("#mailmessage").val())+"&title="+$("#mailtitle").val();
	postdata(clapurl,data,"sendmail");
}
function sendmail2(param)
{
	if ("message" in param) status(param.message);
	if (sendmailqueue.length>0) getnextmail();
}

function runscript()
{
	eval($('#testscript').val());
}

//Garden of Hesperides////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
http://b5.clapalong.com/root/campaign!createTeam.action? rule=4%3A0%3B2&campaignId=1
http://b5.clapalong.com/root/campaign!getTeamInfo.action? campaignId=1

http://b5.clapalong.com/root/campaign!startWar.action?
http://b5.clapalong.com/root/campaign!ready.action?
http://b5.clapalong.com/root/campaign!getTeamInfo.action? init=1&campaignId=1
http://b5.clapalong.com/root/campaign!getTeamInfo.action? init=0&campaignId=1

http://b5.clapalong.com/root/campaign!move.action? y=4&x=1
http://b5.clapalong.com/root/campaign!attack.action? y=3&x=3
http://b5.clapalong.com/root/campaign!useToken.action? index=0

http://b5.clapalong.com/root/campaign!repopulation.action?

http://b5.clapalong.com/root/campaign!dismiss.action?
http://b5.clapalong.com/root/campaign!quitCampaign.action?
*/
function createTeam(campaignID)
{
	if (campaignID==1) data="rule=4%3A0%3B2&campaignId=1";
	
	clapurl = gameurl+"/root/campaign!createTeam.action?";
	task = "createTeam";
	postdata(clapurl,data,task);
}
function createTeam2(param)
{
	if (param.state==0)
	{
		status(param.message);
		return;
	}
	clapurl = gameurl+"/root/campaign!getTeamInfo.action?";
	task = "createTeam2";
	postdata(clapurl,"campaignId="+campaignid,task);
}
function createTeam3(param)
{
	if ("campaigndto" in param)
	{
		$("#campaigntoken").html(param.campaigndto.token);
		if (param.campaigndto.token>$("#maxcampaigndiv").val())
		{
			status("Campaign divinity cost exceeded set limit. Auto Garden stopped.");
			dissolvecampaign();
			return;
		}
	}
	startWar();
}

function getTeamInfo(data)
{
	clapurl = gameurl+"/root/campaign!getTeamInfo.action?";
	task = "getTeamInfo";
	postdata(clapurl,data,task);
}

var blocks=new Array();
var tokens=new Array();
tokens[-1]="-1";
tokens[0]="0";
tokens[1]="Inspire";
tokens[2]="Faster";
tokens[3]="3";
tokens[4]="Sweep";
tokens[5]="5";
tokens[6]="Storm";
tokens[7]="7";
tokens[8]="8";
tokens[9]="9";
tokens[10]="10";
var tokenid;
var myblock;
function printmap(blocks)
{
	//status("Gathering information from the campaign map.");
		for(var key in blocks)
		{
			myblock = blocks[key];
			$("#block"+myblock.x+myblock.y).html("");
			$("#block"+myblock.x+myblock.y).addClass("visibleblock");
			if (myblock.dx==6) $("#block"+myblock.x+myblock.y).addClass("greyblock");
			if ("solider" in myblock)
			{
				$("#block"+myblock.x+myblock.y).html(myblock.solider.name);
				if (myblock.solider.name == $("#playername").html())
				{
					posx=myblock.x;
					posy=myblock.y;
					$("#block"+myblock.x+myblock.y).addClass("yellowblock");
					if ("currforcesnum" in myblock.solider && myblock.solider.currforcesnum==0)
					{
						campaignreplenish();
						return;
					}
				}
			}
			if (myblock.token>0) $("#block"+myblock.x+myblock.y).html(tokens[myblock.token]);
		}
	//status("Finished gathering information from the map.");
}

function getTeamInfo2(param)
{
	if ("campaignstate" in param) campaignstate=param.campaignstate;
	
	if ("playerupdateinfo" in param && "campaignresult" in param.playerupdateinfo)
	{
		campaignresult(param.playerupdateinfo);
		return;
	}
	
	//gather map info
	if ("block" in param.campaign)
	{
		printmap(param.campaign.block);
	}
	
	//in campaign
	if (param.campaignstate==2)
	{
		if ("campaign" in param)
		{
			if (!($.isEmptyObject(param.campaign.self.token)))
			{
				campaigntoken("useToken","index=0");//use token
				//tokenid = 
				status("Token used: <b>"+tokens[parseInt(param.campaign.self.token)]+"</b>");
			}
			
			if (param.campaign.self.canmove == 1)
			{
				setTimeout(campaignnextaction,10);
			}
			else
			{
				status("Campaign CD: Delay "+(param.campaign.self.nextactiontime-5000)+" ms.");
				campaigncd=setTimeout(campaignnextaction,(param.campaign.self.nextactiontime-5000-param.botlag));
			}
		}
		else
		{
			status("No info from Campaign")
			setTimeout(campaignready, 1000);
			return;
		}
	}
	else if (param.campaignstate==1)
	{
		status("Not in campaign.");
	}
	else alert("Campaign State: "+param.campaignstate);
}
function startWar()
{
	clapurl = gameurl+"/root/campaign!startWar.action?";
	task = "startWar";
	getdata(clapurl,task);
}
function startWar2(param)
{
	$("#gardenrunleft").val($("#gardenrunleft").val()-1);
	status("Campaign launched.");
	campaignready();
}

function campaignready()
{
	clapurl = gameurl+"/root/campaign!ready.action?";
	task = "campaignready";
	getdata(clapurl,task);
}
function campaignready2(param)
{
	if ("cd" in param && param.cd >= 0)
	{
		if (param.cd>0)
		{
			status("Battle starting in "+(param.cd)+" ms.");
			campaigncd=setTimeout(campaignready,param.cd);
		}
		else if (param.cd==0)	getTeamInfo("init=1&campaignId="+campaignid);
	}
	else campaigncd=setTimeout(campaignready,1111);
}
function campaignaction(move,data)
{
	if (move=="move" || move=="attack")
	{
		$("#block"+posx+posy).html("");
		$("#block"+posx+posy).removeClass("yellowblock");
		var match = data.match(/y=(\d+)&x=(\d+)/i);
		posy=match[1];
		posx=match[2];
		$("#block"+posx+posy).html($("#playername").html());
		$("#block"+posx+posy).addClass("yellowblock");
	}
	status("Campaign ("+campaignid+"): "+move+": "+data);
	clapurl = gameurl+"/root/campaign!"+move+".action?";
	task = "campaignaction";
	postdata(clapurl,data,task);
}
function campaignaction2(param)
{
	if ("reporturl" in param) status(param.reporturl);
	if ("playerupdateinfo" in param) 
	{
		campaignresult(param.playerupdateinfo);
		return;
	}
	if (param.state==1) getTeamInfo("init=0&campaignId="+campaignid);
	else
	{
		status(param.message);
		getcampaignstate();
	}
}
function campaigntoken(move,data)
{
	clapurl = gameurl+"/root/campaign!"+move+".action?";
	task = "campaigntoken";
	postdata(clapurl,data,task);
}

var campaigncd;
var gardenstep=new Array();
gardenstep["40"]="move|y=4&x=1";
gardenstep["41"]="move|y=4&x=2";
gardenstep["42"]="move|y=3&x=2";
gardenstep["32"]="attack|y=3&x=3";//1.Erytheis
gardenstep["33"]="move|y=3&x=4";
gardenstep["34"]="move|y=3&x=5";
gardenstep["35"]="attack|y=2&x=5";//2.Hespera
gardenstep["25"]="attack|y=2&x=6";//3.Mesembria
gardenstep["26"]="move|y=2&x=7";
gardenstep["27"]="attack|y=2&x=8";//4.Hesperides
gardenstep["28"]="move|y=1&x=8";
gardenstep["18"]="attack|y=0&x=8";//5.Hesperis
var posx;
var posy;
var token=0;
var campaignid=1;
var campaignstate;
var nextaction;

function campaignnextaction()
{
	if (stopcampaign) return;
	if(gardenstep[posy+""+posx] == undefined)
	{
		status("Campaign path not detected: ("+posx+","+posy+")");
		return;
	}
	nextaction = gardenstep[posy+""+posx].split("|");
	campaignaction(nextaction[0],nextaction[1]);
}

function getcampaignstate()
{
	clearTimeout(campaigncd);
	clapurl = gameurl+"/root/server!getPlayerInfoByUserId.action?";
	task = "getcampaignstate";
	getdata(clapurl,task);
}
function getcampaignstate2(param)
{
	campaignstate=-1;
	campaignid=-1;
	if ("campaignid" in param.player) campaignid=param.player.campaignid;
	if ("campaignstate" in param.player) campaignstate=param.player.campaignstate;
	
	if (param.player.forces == 0)
	{
		alert("No enough troops! Please replenish your troops.")
		return;
	}
	
	if (campaignid==-1) status("No campaign created or launched.");
	else if (campaignid==1)
	{
		if (campaignstate==1)	startWar();
		else if (campaignstate==2)	
		{
			$("#gardenrunleft").val($("#gardenrunleft").val()-1);
			campaignready();
		}
		else alert("Campaign State: "+campaignstate);
	}
	else
	{
		status("This campaign (id:"+campaignid+") is not implemented.");
	}
	
}
function campaignresult(param)
{
	$("#block"+posx+posy).removeClass("yellowblock");
	status(param.campaignresult);
	if ($("#gardenrunleft").val()>0)
	{
		createTeam(1);
	}
	else
	{
		status("Auto Garden runs done.");
	}
}

function campaignreplenish()
{
	status("Campaign: Replenished troops");
	clapurl = gameurl+"/root/campaign!repopulation.action?";
	task = "campaignreplenish";
	getdata(clapurl,task);
}
function quitcampaign()
{
	clapurl = gameurl+"/root/campaign!quitCampaign.action?";
	task = "quitcampaign";
	getdata(clapurl,task);
}
function dissolvecampaign()
{
	clapurl = gameurl+"/root/campaign!dismiss.action?";
	task = "dissolvecampaign";
	getdata(clapurl,task);
}
var stopcampaign=false;
function stopcampaign()
{
	if (stopcampaign) //resume
	{
		stopcampaign=false;
		$("#stopcampaign").value("Stop");
	}
	else //stop
	{
		stopcampaign=true;
		status("Auto campaign stopped");
		$("#stopcampaign").value("Resume");
		clearTimeout(campaigncd);
	}
}

function campaigntest()
{
	var tempattackarray = new Array(1101,1102,1110,1103,1104,1105,1111,1112);
	$("#attackqueue").append(tempattackarray.join(',')+",");
	getnextattack();

	return;
	
	clapurl = gameurl+"/root/campaign!getTeamInfo.action?";
	task = "campaigntest";
	postdata(clapurl,"init=1&campaignId=17",task);
}
function campaigntest2(param)
{
	return;
	
	if ("block" in param.campaign)
	{
		printmap(param.campaign.block);
	}
}
//End
