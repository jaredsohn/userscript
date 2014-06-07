// ==UserScript==

// @name          resultifier3
// @namespace 	  resultifier3
// @include       http://search.digikey.com/scripts/DkSearch/dksus.dll*
// @include       http://search.digikey.com/us/en/cat/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var DATETIMEREGEX = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
$(document).ready(function(){
	_log('document ready');
	$('#content>form>br').replaceWith(' ');
	$('#content>p:eq(1)').replaceWith(' ');
	$('#content>p:contains("Click RoHS icon next to part number")').replaceWith(' ');

	$('#content>form:first').after('<div id="updateme">Resultifier3 was last updated on October 13, 2011. There might be updates, please check <a href ="">Here</a></div>');
	
	//$('#content>p:first').load('http://search.digikey.com/us/en/cat/battery-products/batteries-non-rechargeable-primary/394467?k=battery #content>p:first>*');
	$('#content>p:first').css('color','red');
	$('#content>p:first').css('font-size','25px');
	$('#content>p:first').attr('id', 'pidd');
	$('#content>p:first').after('<div id="SingleResultInfo"></div>');
	$('#content>table:first').insertBefore('#content>form>hr:first').css('float','right');
	_log('set css');
	$('#SingleResultInfo').css({
    'position':'absolute',
    'z-index':'50',
	'left':'800px',
    'background-color':'white',
    //'border':'',
    'padding':'10px'
	});
	
	
	var pf = $('#content>p:first');
	
	$('option').click(function(e){
		if(!e.ctrlKey)
		{
			_log('option changed by click');
			getRecordsMatching();
		}
	});
	$('form').keyup(function(e){
		if(e.keyCode==17)
		{
			_log('ctrlUP');
			getRecordsMatching();
		}
	});

	_log('doc done');
});

function showSingleResultTable(e){	
	_log('showSingleResultTable '+parseInt($('#content>p:first').text().split(':')[1])+' Results Parsed');
	if(parseInt($('#content>p:first').text().split(':')[1])==1){		//only load the part detail table if there is 1 result
		var mystuff = $('form').eq(2).serialize();
		$('#SingleResultInfo').load(
			'http://search.digikey.com/scripts/DkSearch/dksus.dll?'+ mystuff + ' table:first:contains("All prices")',
			function(){
				$('#SingleResultInfo').show();
				_log("mouseover Loaded ");
				$(this).css({left:e.pageX+'px', top:e.pageY+'px'});
		});
	}
}
function hideSingleResultTable(e){
_log("hideSingleResultTable");
$('#SingleResultInfo').hide();
}


function getRecordsMatching(){
	$('#content>p:first').css('color','gray');
	$('#content>p:first').children().css('font-size','18px');
	$('#content>p:first').html('looking');
	var mystuff = $('form').eq(2).serialize();
	$('#content>p:first').load('http://search.digikey.com/scripts/DkSearch/dksus.dll?'+ mystuff + ' #content>p:first', 
		function(){
			var numberofresults = parseInt($('#content>p:first').text().split(':')[1].replace(',',''));
			$('#content>p:first').css('color','red');
			$('#content>p:first').children().css('font-size','25px'); 
			$('#content>p:first').hoverIntent( showSingleResultTable, hideSingleResultTable );
			$('#pidd:empty').html('Records matching criteria: 1 -- Hover or click <a href="http://search.digikey.com/scripts/DkSearch/dksus.dll?'+ mystuff +'">Here</a> to see it.');
			$('#content>p:first:contains("/")').text('There are 0 Results.');	
			_log(parseInt($('#content>p:first').text().split(':')[1]));
			if(parseInt($('#content>p:first').text().split(':')[1])==1){
			_log('loading product details page');
				$('#content>table:eq(0)').load('http://search.digikey.com/scripts/DkSearch/dksus.dll?'+ mystuff + ' #content>*');
			}
			else if(1<numberofresults && numberofresults<=25){
				_log(numberofresults + ' is 25 items or less, no other pages to load');
				$('#content>table:eq(0)').load('http://search.digikey.com/scripts/DkSearch/dksus.dll?ColumnSort=1000011&quantity=1&'+ mystuff + ' #content>table:eq(1)>*');
			}
			else{
			_log('loading first page of results');
			 $('#content>table:eq(0)').load('http://search.digikey.com/scripts/DkSearch/dksus.dll?ColumnSort=1000011&quantity=1&'+ mystuff + ' #content>table:eq(1)>*',
					//getNextPages()
					// function(){
					// _log($('#productTable>tbody>tr:last').html());
						// var hello = $('<tr>Hello</tr>').insertAfter( $('#productTable>tbody>tr:last'));
						 // $('#productTable>tbody>tr:last').load('http://search.digikey.com/scripts/DkSearch/dksus.dll?ColumnSort=1000011&quantity=1&page=2&'+ mystuff + ' #productTable>tbody>*',
							// function(){
							// $('#productTable>tbody>tr:last').replaceWith( $('#productTable>tbody>tr:last').contents() ); 
						 // });
						 
						// _log(parseInt($('tr:contains("Page"):first').text().split('/')[1]));
					// }
					function(){getNextPages();}
				);
				
			}
	});	
	

}

 function getNextPages(){
	var mystuff = $('form').eq(2).serialize();
	var numberofpages = parseInt($('tr:contains("Page"):first').text().split('/')[1].replace(',',''));
	_log('number of pages = '+ numberofpages);
	var limit = (numberofpages <=10) ? numberofpages : 10;
	_log('limit = '+ limit);
	var pcnt = 2;
	for( pcnt=2; pcnt<=limit; pcnt++){
		_log(pcnt);
		$('#productTable>tbody>tr:last').after('<tr class=\'trtemp\' id=\'pload'+pcnt+'\'>Hello</tr>');
	}
	for( pcnt=2; pcnt<=limit; pcnt++){
		var myurl = 'http://search.digikey.com/scripts/DkSearch/dksus.dll?ColumnSort=1000011&quantity=1&page='+pcnt+'&'+ mystuff + ' #productTable>tbody>*';
		$('#pload'+pcnt+'').load(myurl ,
			function(){
				$(this).replaceWith( $(this).contents()); 
			}
		);
	}
	$('tr:contains("Page"):first').after("<b>Now displaying first "+ ((numberofpages <=10) ? numberofpages : 10) +" pages sorted by price at quantity 1.</b>");
	_log('im here');
 }

function _log(somestring){
	unsafeWindow.console.log('[resultifier3] '+somestring);
}
// doesExist pass it any substring and the innerHTML of the element you are looking in.
function doesExist(astring, inelement){
    return (inelement.indexOf(astring) != -1);
}

function get_results(partialurl, calledby){
	var url = 'http://search.digikey.com/scripts/DkSearch/dksus.dll?'+partialurl;
	//alert(calledby);
	if(contdiv.getElementsByTagName('table')[0].rows.length==2){
	contdiv.getElementsByTagName('table')[0].rows[0].textContent = 'wait....';}
	
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
			var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
			html.innerHTML = responseDetails.responseText;
			doc.appendChild(html);
			
			result_handler(doc,url,calledby);
        }
    });
}

/**
* hoverIntent is similar to jQuery's built-in "hover" function except that
* instead of firing the onMouseOver event immediately, hoverIntent checks
* to see if the user's mouse has slowed down (beneath the sensitivity
* threshold) before firing the onMouseOver event.
* 
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* hoverIntent is currently available for use in all personal or commercial 
* projects under both MIT and GPL licenses. This means that you can choose 
* the license that best suits your project, and use it accordingly.
* 
* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
* $("ul li").hoverIntent( showNav , hideNav );
* 
* // advanced usage receives configuration object only
* $("ul li").hoverIntent({
*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
*	interval: 100,   // number = milliseconds of polling interval
*	over: showNav,  // function = onMouseOver callback (required)
*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
*	out: hideNav    // function = onMouseOut callback (required)
* });
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($) {
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 1000
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};
})(jQuery);
//hoverIntent