// ==UserScript==
// @name           EEHelper
// @namespace      http://www.experts-exchange.com
// @description    Helps you to answer EE questions!
//
// @include        http://www.experts-exchange.com/*/viewOpenZoneQuestions.jsp*
// @include        http://www.experts-exchange.com/expertsZone.jsp*
// @include        http://www.experts-exchange.com/*/Q_*.html*
// @include        http://www.experts-exchange.com/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Get current page location
var url = window.location.href;
var url_clean = (url.split('?'))[0];
var isList = /(viewOpenZoneQuestions.jsp|expertsZone.jsp)/;
var isExpert = /expertsZone.jsp/;
var isQn   = /Q(_)+(\d)+\.html/;
var isMember = /M(_)+(\d)+\.html/;

// Variables
var pos = $(window).height();
var posDefault = pos;
var posShade   = 26;
var isMouseDown = false;
var timerTimeout = null;
var closeBtnImg = "http://www.samliew.com/Resources/Pictures/close-button.gif";
var refreshBtnImg = "http://www.samliew.com/Resources/Pictures/refresh.gif";
var profileURL = $('.compMyActC').find('a[href^=/M_]:first').attr("href");
var qnURL = "";

// Remove ads/banners
$('div[class*=banner]').remove();
$('div[class*=crumbHeader]').remove();
$('.outerBodyWrap:first').css("background", "url('')");
$('#outerWrap:first').css("background", "url('')");

// If question page
if(url.match(isList) && !window.opener) {
	
	if(!url.match(isExpert)) {
		
		// Stop body scroll
		$('body').css("overflow", "hidden");
		window.scrollTo(0,0);
		
		// Cleanup
		$('#compMyFav .bc').css("padding", "0px");
		$('#compMyAct .bc').css("padding", "0px");
		$('#compMyFav .b').css("padding", "5px 10px");
		$('#compMyFav p').remove();
		$('#compMyFav ul').css("margin-bottom", "0px");
		$('#compMyFav .favButtons').remove();
		
		// Set question links to open in qnExplorer
		$('td[class=title column4] a').each(function() {
			$(this)
			 .attr("target", "qnExplorer")
			 .html($(this).attr("title"))
			 .attr("title", "")
			 .click(function() {
				 	qnURL = $(this).attr("href");
			 		posDefault = 200;
			 		shade();
			 	});
		 });
		
		// Show questions
		$('div[class*=openQuestions]')
		 .attr("id", "qnList")
		 .css("position", "fixed")
		 .css("top", "0px")
		 .css("left", "0px")
		 .css("height", pos + "px")
		 .css("width", ($(window).width() - 189) + "px")
		 .css("margin", "0px")
		 .css("z-index", "999")
		 .css("background-color", "white")
		 .css("overflow-y", "hidden")
		 .css("overflow-x", "hidden");
		$('#qnList .h')
		 .css("cursor", "pointer")
		 .dblclick(function() {
		 		return false;
			})
		 .click(function() {
				shadeToggle();
			})
			.hover(function() {
				unshade();
			});
		$('#qnList .bc')
		 .css("position", "fixed")
		 .css("top", "31px")
		 .css("left", "0px")
		 .css("height", pos - 28 - 10 + "px")
		 .css("width", ($(window).width() - 199) + "px")
		 .css("margin", "0px 0px 0px 0px")
		 .css("padding", "7px 5px 0px 5px")
		 .css("z-index", "1000")
		 .css("background-color", "white")
		 .css("overflow-y", "scroll")
		 .css("overflow-x", "hidden")
			.hover(function() {
				unshade();
			});
		
		// Show favs
		var fav = $('#compMyFav')
		 .css("position", "fixed")
		 .css("top", "0px")
		 .css("right", "0px")
		 .css("height", pos + "px")
		 .css("width", "187px")
		 .css("margin", "0px")
		 .css("z-index", "999")
		 .css("overflow-y", "scroll")
		 .css("overflow-x", "hidden")
		 .css("border-left", "3px solid gray")
		 .css("background-color", "white");
		$('#compMyFav .h')
		 .css("cursor", "pointer")
		 .dblclick(function() {
		 		return false;
			})
		 .click(function() {
		 		var div = $('#compMyFav .bc:first');
		 		if(div.is(':visible')) {
		 			if(pos < posShade + 20) { unshade(); return; }
		 			div.slideUp();
		 		} else {
		 			if(pos < posShade + 20) { unshade(); }
		 			$('#compMyFav').animate({ scrollTop: $('#compMyFav').offset().top }, { duration: 'slow', easing: 'swing'});
		 			div.slideDown();
		 		}
			});
		
		// Show account below favs
		var act = $('#compMyAct')
		 .css("width", "173px")
		 .css("overflow-y", "hidden")
		 .css("overflow-x", "hidden")
		 .css("margin", "0px");
		$('#compMyAct .h')
		 .css("cursor", "pointer")
		 .dblclick(function() {
		 		return false;
			})
		 .click(function() {
		 		var div = $('#compMyAct .bc:first');
		 		if(div.is(':visible')) {
		 			$('#compMyFav').animate({ scrollTop: $('#compMyFav').offset().top }, { duration: 0, easing: 'swing'});
		 			div.slideUp();
		 		} else {
		 			$('#compMyFav').animate({ scrollTop: $('#compMyAct').offset().top }, { duration: 'slow', easing: 'swing'});
		 			div.slideDown();
		 		}
			});
		//$('#compMyAct .bc').slideUp();
		$('#compMyFav').append(act);
		
		// Make question preview pane
		var qnFrame = $('<iframe></iframe>')
		 .attr("id", "qnExplorer")
		 .attr("name", "qnExplorer")
		 .css("position", "fixed")
		 .css("top", pos + "px")
		 .css("left", "0px")
		 .css("height", ($(window).height() - 205) + "px")
		 .css("width", "100%")
		 .css("margin", "0px")
		 .css("z-index", "999")
		 .css("overflow-y", "auto")
		 .css("border", "none")
		 .css("border-top", "5px solid gray")
		 .css("background-color", "white");
		$('body').append(qnFrame);
		$('#qnExplorer').attr("src", "about:blank");
		
		// Make timer
		var timerDisplay = $('<div></div>')
		 .attr("id", "timerDisplay")
		 .attr("title", "Seconds since last refresh")
		 .css("position", "fixed")
		 .css("top", "7px")
		 .css("font-size", "12px")
		 .css("right", 222 + "px")
		 .css("height", "20px")
		 .css("width", "")
		 .css("color", "#666")
		 .css("z-index", "1000")
		 .css("border", "none")
		 .css("cursor", "help")
		 .css("text-align", "right")
		 .css("font-weight", "bold");
		$('#qnList').prepend(timerDisplay);
		updateTimer();
		
		// Make close button
		var closeBtn = $('<img />')
		 .attr("id", "closeBtn")
		 .attr("src", closeBtnImg)
		 .attr("title", "Exit")
		 .css("position", "absolute")
		 .css("top", "4px")
		 .css("right", (18 + 2) + "px")
		 .css("height", "20px")
		 .css("width", "20px")
		 .css("z-index", "1000")
		 .css("border", "none")
		 .css("cursor", "pointer")/*
		 .mouseover(function(e) {
		 		$(this)
		 		 .css("height", "20px")
		 		 .css("width", "20px")
		 		 .css("top", "3px");
			})
		 .mouseout(function(e) {
		 		$(this)
		 		 .css("height", "20px")
		 		 .css("width", "20px")
		 		 .css("top", "4px");
			})*/
		 .click(function() {
		 		window.location = "http://www.experts-exchange.com" + profileURL;
			});
		$('body').append(closeBtn);
		
		// Make refresh button
		var refreshBtn = $('<img />')
		 .attr("id", "refreshBtn")
		 .attr("src", refreshBtnImg)
		 .attr("title", "Refresh")
		 .css("position", "absolute")
		 .css("top", "5px")
		 .css("right", 195 + "px")
		 .css("height", "21px")
		 .css("width", "21px")
		 .css("z-index", "1000")
		 .css("border", "none")
		 .css("cursor", "pointer")/*
		 .mouseover(function(e) {
		 		$(this)
		 		 .css("height", "22px")
		 		 .css("width", "22px")
		 		 .css("top", "4px");
			})
		 .mouseout(function(e) {
		 		$(this)
		 		 .css("height", "21px")
		 		 .css("width", "21px")
		 		 .css("top", "5px");
			})*/
		 .click(function() {
				$('#qnExplorer').attr("src", "about:blank");
		 		location.reload(true);
			});
		$('body').append(refreshBtn);
		
		// Make preview pane resizer
		var qnFrame = $('<hr />')
		 .attr("id", "resizer")
		 .css("position", "fixed")
		 .css("top", pos + "px")
		 .css("left", "0px")
		 .css("height", "5px")
		 .css("width", "100%")
		 .css("margin", "0px")
		 .css("padding", "0px")
		 .css("z-index", "1000")
		 .css("overflow", "hidden")
		 .css("cursor", "ns-resize")
		 .mouseover(function(e) {
		 		$(this)
		 		 .css("background-color", "#333")
		 		 .css("border-color", "#666");
			})
		 .mouseout(function(e) {
		 		$(this)
		 		 .css("background-color", "")
		 		 .css("border-color", "");
			})
		 .dblclick(function(e) {
		 		shadeToggle();
			})
		 .mousedown(function(e) {
		 		isMouseDown = true;
		 		
		 		$(this)
		 		 .css("background-color", "red")
		 		 .css("border-color", "red");
			})
		 .mousemove(function(e) {
		 		if(isMouseDown) {
			 		$(this).css("top", e.pageY - 2);
			 	}
			})
		 .mouseup(function(e) {
		 		isMouseDown = false;
		 		
		 		$(this)
		 		 .css("background-color", "")
		 		 .css("border-color", "");
		 		
		 		pos = e.pageY - 2;
		 		if(pos < posShade) pos = posShade;
		 		
		 		redrawPane();
			});
		$('body').append(qnFrame);
		
		$(window).resize(function() {
			/*
		  $('#qnList').css("width", ($(window).width() - 189) + "px");
		  $('#qnList .bc')
			 .css("height", pos - 31 + "px")
			 .css("width", ($(window).width() - 194) + "px");
		  $('#qnExplorer').css("height", ($(window).height() - pos - 5) + "px");
		  */
		  redrawPane();
		});
	
	// Is expert
	} else {
		
		// Cleanup
		$('#pageMainHeader:first').remove();
		$('#pageHeader:first').remove();
		$('#expertPremiumMemWelcome:first').remove();
		$('#corpAdBannerLI:first').remove();
		$('#breadCrumb:first').remove();
		$('#pageFooter:first').remove();
		
		// Show account below
		var act = $('#compMyAct').clone()
			.css("float", "right")
			.css("margin-top", "17px")
			.css("width", "189px");
		$('#compMyAct').remove();
		$('div[class*=filtersContainer]')
			.attr("id", "filters")
			.append(act);
		
		$('#compMyAct .bc')
			.css("width", "auto")
			.css("background", "url('')");
		$('#compMyAct .h')
		 .css("cursor", "pointer")
		 .dblclick(function() {
		 		return false;
			})
		 .click(function() {
		 		var div = $('#compMyAct .bc:last');
		 		if(div.is(':visible')) {
		 			div.slideUp("slow");
		 		} else {
		 			div.slideDown("slow");
		 		}
			});
		$('#compMyFav').append(act);
		
		
		// Add shade to filters
		$('#filters .h:first')
		 .css("cursor", "pointer")
		 .dblclick(function() {
		 		return false;
			})
		 .click(function() {
		 		var div = $('#filters .bc:first');
		 		if(div.is(':visible')) {
		 			div.slideUp("slow");
		 		} else {
		 			div.slideDown("slow");
		 		}
			});
		
		$('#bodyContentWrap').css("height", "160px");
		
		$('#pageMain')
			.css("width", "")
			.css("margin", "10px auto 0px 16px");
		
		window.scrollTo(0,0);
		
		reposExpert();
	}
	
} else if(url.match(isQn)) {
	
	if(window != top) {
		
		// Stop body scroll
		$('body').css("overflow-x", "hidden");
		window.scrollTo(0,0);
		
		// Cleanup
		$('#compTE').remove();
		$('.qTagRow').remove();
		$('.qAuthorRow').remove();
		$('.qAuthorRowExtra').remove();
		$('.qPointsRow').remove();
		$('.qTimeZoneRow').remove();
		$('#actionBoxDiv').remove();
		$('.questionScoreLI').remove();
		$('.formName').remove();
		$('.qCodeSnippetButtons, .toggleHighlighting, .openInNewWindow, .selectAll').remove();
		$('answerRating, .commentAnswerRating').remove();
		$('#commentBox div[class*=formRow]:first').remove();
		$('.tinyReportButton')
		 .css("position", "absolute")
		 .css("top", "10px")
		 .css("left", "8em");
		$('.formValue, .formValue textarea').css("width", "90%");
		$('.codeSnippet').css("width", ($(window).width() - 250) + "px");
		
		// Show only question div
		var q = $('div[class*=question]:first');
		q.css("position", "absolute")
		 .css("top", "0px")
		 .css("left", "0px")
		 .css("width", "100%")
		 .css("margin", "0px")
		 .css("z-index", "999");
		
		$('.codeSnippet pre').click(function() {
			unsafeWindow.selectElementById($(this).attr("id"));
		});
		
		$(window).resize(function() {
		  $('.codeSnippet').css("width", ($(window).width() - 250) + "px");
		});
		
	}
	
	$('#pageMain .qBody').css("min-height", "").css("margin-bottom", "");

} else if(!url.match(isMember)) {
	
	// Find if page has link to qnList
	var loc = $('div.questionListMoreSolutions a:first').attr("href");
	if(loc != "" && loc != null) {
		window.location = url_clean + loc;
	}
}

// Other functions
function shadeToggle() {
	if(pos < posShade+20) pos = posDefault;
	else pos = posShade;
	redrawPane();
}
function shade() {
	pos = posShade;
	redrawPane();
}
function unshade() {
	if(pos < posShade+20) pos = posDefault;
	redrawPane();
}
function redrawPane() {
	
	if(pos > $(window).height() || qnURL == "") { pos = $(window).height(); }
	
	$('#resizer').css("top", pos);
	$('#qnList, #compMyFav').css("height", pos);
	$('#qnList')
	 .css("height", pos + "px")
	 .css("width", ($(window).width() - 189) + "px")
  $('#qnList .bc')
	 .css("height", (pos - 28 - 10 < 0 ? 0 : pos - 28 - 10) + "px")
	 .css("width", ($(window).width() - 199) + "px");
	$('#qnExplorer')
	 .css("top", pos)
	 .css("height", ($(window).height() - pos - 3) + "px");
	
	if(pos < 24) { $('#closeBtn, #refreshBtn').hide(); }
	else { $('#closeBtn, #refreshBtn').show(); }
}
function reposExpert() {
		$('.questionListTitle:first')
			.css("position", "relative")
			.css("width", "200px")
			.css("top", "-41px")
			.css("left", "70px");
		$('div.questionLisExtraFeatures:first')
			.css("position", "relative")
			.css("top", "-41px")
			.css("left", "-20px");
		$('.negInclude').css('margin-top', '-50px');
		$('.questionListNavigationBarContainer:first').remove();
		setTimeout(reposExpert, 3000);
}

var pageLoad = new Date();
function updateTimer() {
	
	var timer = Math.round((new Date() - pageLoad) / 1000);
	if(timer%5==0) {
		
		// Display timer
		timerString = Math.floor(timer/60) + ":" + (timer%60<10?"0"+timer%60:timer%60);
		$('#timerDisplay').html(timerString);
		
		// Set color of timer
		if(timer/20 >= 6) {
			
			// Auto-refresh if no question loaded
			if(qnURL == "") {
				location.reload(false);
			}
			
			$('#timerDisplay')
			 .css("color", "red")
			 .css("cursor", "pointer")
	 		 .css("top", "5px")
			 .css("font-size", "14px")
			 .html("Refresh Page")
			 .attr("title", "Refresh")
			 .click(function() {
				location.reload(false);
			});
			//clearTimeout(timerTimeout);
			//return;
		}
		else if(timer/20 >= 5) {
			$('#timerDisplay').css("color", "#C00");
		}
		else if(timer/20 >= 4) {
			$('#timerDisplay').css("color", "#900");
		}
		else if(timer/20 >= 3) {
			$('#timerDisplay').css("color", "#600");
		}
		else if(timer/20 >= 2) {
			$('#timerDisplay').css("color", "#300");
		}
	}
	
	timerTimeout = setTimeout(updateTimer, 1000);
}