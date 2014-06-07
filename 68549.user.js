// ==UserScript==
// @name           EntrySlideRLSLOG
// @namespace      http://userscripts.org/scripts/show/68549
// @author         hach22
// @include        http://www.rlslog.net/*
// @include        http://rlslog.net/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var GM_JQ = document.createElement('script');
GM_JQ.src = "http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.2-min.js";
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined'){
			window.setTimeout(GM_wait,100);
		}
		else{
			$ = unsafeWindow.jQuery;
			letsJQuery();
		}
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	oSlideAllDiv = document.createElement("div");
	oSlideAllDiv.id = "sa_div";
	oSlideAllDiv.style.position = "fixed";
	oSlideAllDiv.style.left = "20px";
	oSlideAllDiv.style.top = "20px";
	oSlideAllDiv.style.fontWeight = "bold";
	oSlideAllDiv.style.border = "3px solid #b4f2ff";
	oSlideAllDiv.style.padding = "5px 20px 5px";
	document.getElementsByTagName('body')[0].appendChild(oSlideAllDiv);
	
	oSlideDownAll = document.createElement("a");
	oSlideDownAll.id = "sda";
	oSlideDownAll.innerHTML = "Slide Down All";
	oSlideDownAll.style.cursor = "pointer";
	oSlideAllDiv.appendChild(oSlideDownAll);
	$(oSlideDownAll).click(
		function() {
			$(".entrybody").slideDown(500);
		});

	oSlideUpAll = document.createElement("a");
	oSlideUpAll.id = "sda";
	oSlideUpAll.innerHTML = "<br>Slide Up All";
	oSlideUpAll.style.cursor = "pointer";
	oSlideAllDiv.appendChild(oSlideUpAll);
	$(oSlideUpAll).click(
		function() {
			$(".entrybody").slideUp(1000);
			$.scrollTo(0,500);
		});
	

	
	$(".entry").css('padding','0px 0px 0px 10px ');
	$(".entrybody").
		each(function(index){
			$(this).slideUp(3000);
			$(this).attr('id','entrybody_n' + index);
		});

	$(".entry").
		each(function(index){
			$(this).attr('id','entry_n' + index);
			
			oSlideToogle = document.createElement("a");
			$(this).append($(oSlideToogle));
			oSlideToogle.id = "st" + index;
			oSlideToogle.style.cursor = "pointer";
			oSlideToogle.innerHTML = "Slide Toggle";
			$(oSlideToogle).click(
				function() {
					$('#entrybody_n' + index ).
					slideToggle(1000,function(){
									$.scrollTo('#entry_n' + index, {duration:500} );
									}
								);
				});
			
		});
}