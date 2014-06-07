// ==UserScript==

// @name          collapsedk
// @namespace 	  collapsedk
// @include       http://search.digikey.com/scripts/DkSearch/dksus.dll*
// @include       http://www.digikey.com/product-search/*
// @include       http://www.digikey.com/scripts/dksearch/dksus.dll*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js

// ==/UserScript==


resultsID = 'items';
contdiv = document.getElementById('content');

//GM_registerMenuCommand("Toggle Auto Expand", toggleAutoExpand);
//GM_registerMenuCommand("Hide Most Likely Box", hideMostLikelyfunc);
GM_addStyle(".highlight {background-color: #F2E6E9; text-decoration: underline;}");
GM_addStyle("#resultbox {font-size:25px;}");

//GM_deleteValue('hideMostLikely');
//GM_deleteValue('autoexpand');

var stylevar = 'red';
function _log(somestring){
		try{unsafeWindow.console.log('[collapsedk]  '+somestring);}
	catch(err){}
}

if(doesExist(resultsID,contdiv.innerHTML)){
 _log(resultsID + ' does exist');

	if(GM_getValue('hideMostLikely', 'notset') == 'notset' ){
		GM_setValue('hideMostLikely', false);
	}
	if(GM_getValue('autoexpand', 'notset') == 'notset'){
		GM_setValue('autoexpand', true);
	}
	if(GM_getValue('subCompact', 'notset') == 'notset'){
		GM_setValue('subCompact', true);
	}

	$(document).ready(function(){
		/*Changing the default jQuery behavior of the contains function*/
		jQuery.expr[':'].contains = function(a, i, m) { 
			return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
		};
		jQuery.fn.highlight = function (str, className) {
			var regex = new RegExp(str, "gi");
			return this.each(function () {
				$(this).contents().filter(function() {
					return this.nodeType == 3 && regex.test(this.nodeValue);
				}).replaceWith(function() {
					return (this.nodeValue || "").replace(regex, function(match) {
						return "<span class=\"" + className + "\">" + match + "</span>";
					});
				});
			});
		};

		$('#content').after('<div id=picPrev>hi</div>')
		$('#picPrev').css({'position':'absolute','z-index':'50','left':'800px','background-color':'white','padding':'10px', 'border':'2px solid blue', 'min-width':200});
		$('#picPrev').hide();
		
		 $('.catfilterlink').each(function(){
			_log($(this).attr('href'));
			var mylink = $(this).attr('href');
			$(this).hoverIntent(showPicsPrev, hidePicPrev);
		 });
		
		var qstring = getQuerystring('keywords');
		var qarray = qstring.split("+");
		for(var k=0; k<qarray.length; k++){
			if(qarray[k].length<=1){
			qarray.length = 0
			qarray[0] = qstring.replace('+', ' ');
			break;
			}
		}
		
		var autoexpandinit = GM_getValue('autoexpand') ? 'checked':'' ;
		var hideMostLikelyinit = GM_getValue('hideMostLikely') ? 'checked':'' ;
		var subCompact = GM_getValue('subCompact') ? 'checked':'' ;
		$('#content>form').after('<div id="uiDiv"><form id="uiForm"><table><td><input type="checkbox" class="uicheckbox" name="autoexpand" title="Check this if you want the categories to always load expanded\"'+ (GM_getValue('autoexpand') ? 'checked':'') +'>Auto Expand </td><br><td><input type="checkbox" class="uicheckbox" name="hideMostLikely" title="Check this if you don\'t want to see the Most ikely results box."'+ (GM_getValue('hideMostLikely') ? 'checked':'') +'>Disable the Most Likely Box</input><br></td><td><input type="checkbox" class="uicheckbox" name="subCompact" title="ultra compaction"'+ (GM_getValue('subCompact') ? 'checked':'') +'>compact subcategories</input><br></td></table></form></div>');
		$('#uiForm').css({"float":"right", "padding-right":"20px"});
		//var uiDiv = document.createElement('div');
		//uiDiv.id = "uiDiv";
		//$('#uiDiv').css("border","solid 5px black");
		//var uiForm = document.createElement('form');
		
		//uiForm.id = 'uiForm';
		
		//uiForm.innerHTML = "<table><td><input type='checkbox' class='uicheckbox' name='autoexpand' title=\"Check this if you want the categories to always load expanded\""+ (GM_getValue('autoexpand') ? 'checked':'') +">Auto Expand </td><br><td><input type='checkbox' class='uicheckbox' name='hideMostLikely' title=\"Check this if you don't want to see the Most ikely results box.\""+ (GM_getValue('hideMostLikely') ? 'checked':'') +">Disable the Most Likely Box</input><br></td></table>";
		
		//var expandAllDiv = document.createElement('div');
		//expandAllDiv.id = "expandall";
		//expandAllDiv.innerHTML = '<br/>+ <u>Expand All</u>';
		//if (GM_getValue("autoexpand")){
		//	expandAllDiv.innerHTML +=  ' (autoexpand enabled)';
		//}
		//expandAllDiv.style.color = 'red';
		
		$('#uiDiv').after('<div id="resultbox"><strong>Most likely results:</strong></div>');
		$('#resultbox').after('<div id="expandall"><br/>+ <u>Expand All</u></div>');
		$('#expandall').css({"color":"red", "cursor":"pointer"});
		
		/*Hide all of the subcatagory links*/
		$("ul.catfiltersub").css("display","none");
		$("span.catfiltertopitem").prepend("<span id='plus' style='color:red;font-weight:bold;font-size:22px;'> + </span>");
	 
		
		/*Insert the expandall element*/
		//contdiv.insertBefore(expandAllDiv,contdiv.getElementsByTagName('br')[6]);
		//contdiv.insertBefore(uiForm,document.getElementById('expandall'));
		
		
		/*Attach and show the resultbox element, don't display if there are less than 10 items*/
		//if(!GM_getValue('hideMostLikely') && ($("ul.catfiltersub").children().size() > 10) && (qstring != '') && ($("span.catfiltertopitem").children().size()>1)){
			//$('#content>form:first').append($('#resultbox'));
			$('#resultbox').css("border","solid 3px black");
			$('#resultbox').css("border-radius", "2px 50px 50px 50px");
			$('#resultbox').css("padding","25px");
			$('#resultbox').css("background","#FFFAFB");
			//$('#resultbox').css("float","left");
			//$('#resultbox').after("<hr />");
		//}

		var myval = Array();
		for(var x=0;x<qarray.length;x++){
			//_log('alt add ' +commonWordAltAdd(qarray[x]).join(', '));
				if(commonWordAltAdd(qarray[x]) != null){
				myval = myval.concat(commonWordAltAdd(qarray[x]));
				}
		}
		_log('logging myval '+ myval);
		if(myval != null){
				qarray = myval.concat(qarray);
		}
		
		_log('the search terms in qarray[] are ' + qarray);
		
		for(var x=0;x<qarray.length;x++){
			if(qstring || qarray[x]){
			_log('Checking if "'+commonWordReplace(qarray[x]) +'" needs to be replaced. ');

			qarray[x] = commonWordReplace(qarray[x]);
				$('*:contains('+qarray[x]+')').each(function(){
																if($(this).children().length < 1) {
																
																	$(this).css("font-weight", 'bold');
																	this.parentNode.parentNode.style.display = "block";
																	
																	//this.parentNode.parentNode.previousElementSibling.childNodes[0].innerHTML = " - ";
																	//$(this).parent().parent().prev().children().html(" - ");
																	//$(this).parent().parent().prev().children().html(" - ");
																	//$(this).parent().parent().css("display","block");
																	//$(this).parent().parent().innerHTML = " - ";
																	var stemp = $(this).clone().val('');
																	var myFontSize = parseInt($(this).css("fontSize"));
																	if($(this).parent().parent().hasClass('catfiltersub') && (myFontSize==13)){
																		stemp.appendTo($('#resultbox'));
																		stemp.prepend($(this).parent().parent().prev().text()+' - ');
																		stemp.css("border","none");
																		stemp.css("padding","10px");
																		
																		//_log(stemp.text()+' has an extra value of ' +stemp.val());
																	}
																	//if($(this).parent().parent().hasClass('catfiltertopitem'))){
																	//this.parentNode.parentNode.style.display
																	//}
																	
																	
																	if(myFontSize <20){
																		$(this).css("fontSize", myFontSize+4);
																		stemp.val(myFontSize + 4);
																	}
																	//_log(stemp.text()+' has an extra value of ' +stemp.val());
																} });
				// $('ul.catfiltersub:contains('+qarray[x]+')').each(function(){
																					// this.nextElementSibling.style.display = "block";
																					// this.childNodes[0].innerHTML=" - ";
				// });
			}	  
		}
		$("span.catfiltertopitem").css({"color":"black","cursor":"pointer","font-weight":"600","margin-top":"6px"}); 

		

		$("ul.catfiltersub").after("<br/>");
	  
		$("span.catfiltertopitem").click(function(){expandCollapseOnClick(this)});
		
		$('.uicheckbox').click(function(){rememberPreferences(this)});
		$('#expandall').click(function(){expandAllOnClick()});
		$('#resultbox').children().each(function(){ _log( this.text+' '+$(this).val());});
			$('#resultbox>.a').tsort('',{useVal:true,order:'desc'});
			_log('sortingtest '+ $('#resultbox').children().val());
			$('#resultbox').children().after("<br />");
			$('#resultbox').children().css('border','');
			$('#resultbox').children().css('font-size','');
			$('#resultbox').children().css("font-weight", '');
			for(x=0;x<qarray.length;x++){
				$('#resultbox').children().highlight( qarray[x], "highlight");
			}
			
			// if there are less than 10 lines categories to display, expand all
			if(GM_getValue("autoexpand") | ($("ul.catfiltersub").children().size() <= 10) | (qstring = '') ){
				$("ul.catfiltersub").css("display","block");
				$("span.catfiltertopitem").children().html(' - ');
				
			}
			//$("span.catfiltertopitem:has(display*=block)").prepend("<span id='plus' style='color:red;font-weight:bold;font-size:22px;'> - </span>");
				//$("span.catfiltertopitem").prepend("<span id='plus' style='color:red;font-weight:bold;font-size:22px;'> + </span>");
			
	});

	for (var i=0; i<document.forms.length ;i++){
		document.forms[i].method="get";
    }
	
	// if(!GM_getValue('hideMostLikely') && ($("ul.catfiltersub").children().size() > 10) && (qstring != '') && ($("span.catfiltertopitem").children().size()>1)){
		// $('#resultbox').hide();
	// }
	if(GM_getValue("subCompact")){ getListElements();}
}


function getListElements(){
	_log('made it to getListElements');
	var mylist = $('.catfiltersub>li');
	mylist.each(function(){
		if(doesExist(' - ', $(this).text())){
			var subfam = $(this).text().split(' - ')[0];
			if(doesExist( subfam, $(this).prev().text())){	
				$(this).prev().find('a').insertBefore($(this).find('a') );
			}
		}	
	});
	$('.catfiltersub>li').each(function(){
		if ($(this).children().length == 0){
			$(this).remove();
		}
	});
	$('.catfiltersub>li').each(function(){
		if($(this).children().length >1){
			$(this).find('a').after(' _ >> ');
			//$(this).find('a:odd').css({'background':'lightgray'});
			$(this).css({'margin-left':'0', 'padding-left': '20em', 'text-indent':'-20em'})
		}
	});
	_log('done with getListElements');
}

function showPicsPrev(thislink){
	_log('link hovered');
	$('#picPrev').text('** loading pictures**');
	$('#picPrev').css({'left':40 , 'top':$(this).position().top+66});
	$('#picPrev').load($(this).attr('href')+'&stock=1'+ ' img[src*="tmb"]', function(){
		$('#picPrev').prepend('limited example pictures');
		$('#picPrev').append('----no pics exist?');
	});
	$('#picPrev').show();
	//$('#picPrev').prepend('limited example pictures');
}

function hidePicPrev(){
	_log('link left');
	$('#picPrev').empty();
	$('#picPrev').hide();

}




// doesExist pass it any substring and the innerHTML of the element you are looking in.
function doesExist(astring, inelement){
    return (inelement.indexOf(astring) != -1);
}

function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)", 'i');
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
function expandAllOnClick(){
			$("ul.catfiltersub").css("display","block");
			$("span.catfiltertopitem").children().html(' - ');
			
}
function rememberPreferences(elem){
var myvalll = $(elem).attr('checked')
			alert(myvalll +' ' + $(elem).attr('name'));
			if(!GM_getValue($(elem).attr('name'))){
				GM_setValue($(elem).attr('name'), true)
				
			}
			else{
				GM_setValue($(elem).attr('name'), false)
				$(elem).removeAttr('checked');
			}
			window.location.href=window.location.href;
}
function expandCollapseOnClick(elem){

	elem.style.color="black";
	if (elem.nextElementSibling.style.display=="none")
	{
		elem.nextElementSibling.style.display="block";
		elem.childNodes[0].innerHTML=" - ";
	}
	else
	{
		elem.nextElementSibling.style.display="none";
		elem.childNodes[0].innerHTML=" + ";
	}
}

function commonWordReplace(someword){
	_log('commonWordReplace someword = ' + someword);
	var altArray = [
				['capacitors', 'capacitor'],
				['resistors', 'resistor'],
				['capacitors', 'capacitor'],
				['connectors', 'connector'],
				['diodes', 'diode'],
				['leds', 'led'],
				['transformers', 'transformer'],
				['enclosures', 'enclosure'],
				['headers', 'header'],
				['dsub', 'd-sub'],
				['potentiometers', 'potentiometer'],
				['blocks', 'block'],
				['dcdc', 'dc dc'],
				['dc-dc', 'dc dc'],
				['dc/dc', 'dc dc'],
				['fans', 'fan'],
				['regulators', 'regulator'],
				['crystals', 'crystal'],
				['oscillators', 'oscillator'],
				['circuits', 'circuit'],
				['microcontrollers', 'microcontroller'],
				['converters', 'converter'],
				['soldering', 'solder'],
				['supports', 'support'],
				['mosfet', 'fet'],
				['mosfets', 'fet']	
			];
			
	for(var p=0; p<altArray.length; p++){
		if(someword != null && (someword.toLowerCase() == altArray[p][0])){
			_log(someword+' was changed to '+ altArray[p][1]);
			return altArray[p][1];
		}
	}
	_log('commonWordReplace nothing returned returning "' + someword+'"');
	return someword;
}

function commonWordAltAdd(someword){
_log('commonWordAltAdd start someword = '+ someword);
	 var altArray = [
				 ['battery', 'batteries'],
				['batteries', 'battery'],
				['supply', 'supplies'],
				['supplies', 'supply'],
				['heatsink', 'heat', 'sink'],
				['heatshrink', 'heat', 'shrink'],
				['ssl', 'solid state lighting', 'led'],
				['tube', 'tubing'],
				['suppression', 'tvs'],
				['capacitor', 'capacitance'],	
				['epoxy', 'epoxies', 'glue']
			 ];
	var retval = Array();
	for(var p=0; p<altArray.length; p++){
		if(someword.toLowerCase() == altArray[p][0]){	
			for ( u=1; u<altArray[p].length; u++){
				retval[u-1] = altArray[p][u];
			}
				_log('commonWordAltAdd returning retval= '+ retval);
				return retval;	
		}
	}
			_log('commonWordAltAdd returning nothing');
			return null;	
  }

// function toggleAutoExpand(){
	// if(GM_getValue("autoexpand")){
		// GM_setValue("autoexpand", false);
	// }
	// else {
		// GM_setValue("autoexpand", true);
	// }
// }
// function hideMostLikelyfunc(){
	// if(GM_getValue("hideMostLikely")){
		// GM_setValue("hideMostLikely", false);
	// }
	// else {
		// GM_setValue("hideMostLikely", true);
	// }
// }
//------------------------------------------------

/*!
* jQuery TinySort - A plugin to sort child nodes by (sub) contents or attributes.
*
* Version: 1.1.0
*
* Copyright (c) 2008-2011 Ron Valstar http://www.sjeiti.com/
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*//*
* contributors:
*	brian.gibson@gmail.com
*
* Usage:
*   $("ul#people>li").tsort();
*   $("ul#people>li").tsort("span.surname");
*   $("ul#people>li").tsort("span.surname",{order:"desc"});
*   $("ul#people>li").tsort({place:"end"});
*
* Change default like so:
*   $.tinysort.defaults.order = "desc";
*
* in this update:
*   - if the first char in the _find parameter is a : we'll use $.filter instead of $.find
*   - added caseSensitive sorting
*   - added custom sort function
*	- added data-attribute support
*	- tiny speed increase
*	- tested with jQuery 1.6.2
*
* in last update:
*	- applied patch to sort by .val() instead of .text()  (thanks to brian.gibson@gmail.com)
*
* Todos
*   - fix mixed literal/numeral values
*
*/
;(function($) {
	// default settings
	$.tinysort = {
		 id: "TinySort"
		,version: "1.1.0"
		,copyright: "Copyright (c) 2008-2011 Ron Valstar"
		,uri: "http://tinysort.sjeiti.com/"
		,defaults: {
			 order: "asc"	// order: asc, desc or rand
			,attr: null		// order by attribute value
			,useVal: false	// use element value instead of text
			,data: null		// use the data attribute for sorting
			,place: "start"	// place ordered elements at position: start, end, org (original position), first
			,returns: false	// return all elements or only the sorted ones (true/false)
			,cases: false	// a case sensitive sort orders [aB,aa,ab,bb]
			,sortFunction: null // override the default sort function
		}
	};
	$.fn.extend({
		tinysort: function(_find,_settings) {
			if (_find&&typeof(_find)!="string") {
				_settings = _find;
				_find = null;
			}

			var oSettings = $.extend({}, $.tinysort.defaults, _settings);

			if (!oSettings.sortFunction) oSettings.sortFunction = oSettings.order=='rand'?function() {
				return Math.random()<.5?1:-1;
			}:function(a,b) {
				var x = !oSettings.cases&&a.s&&a.s.toLowerCase?a.s.toLowerCase():a.s;
				var y = !oSettings.cases&&b.s&&b.s.toLowerCase?b.s.toLowerCase():b.s;
				if (isNum(a.s)&&isNum(b.s)) {
					x = parseFloat(a.s);
					y = parseFloat(b.s);
				}
				return (oSettings.order=="asc"?1:-1)*(x<y?-1:(x>y?1:0));
			};

			var oElements = {}; // contains sortable- and non-sortable list per parent

			var bFind = !(!_find||_find=='');
			var bAttr = !(oSettings.attr===null||oSettings.attr=="");
			var bData = oSettings.data!==null;

			// since jQuery's filter within each works on array index and not actual index we have to create the filter in advance
			var bFilter = bFind&&_find[0]==':';
			var $Filter = bFilter?this.filter(_find):this; 

			this.each(function(i) {
			_log('tinysort '+ this.innerHTML);
				var $This = $(this);
				// element or sub selection
				var mElm = bFind?(bFilter?$Filter.filter(this):$This.find(_find)):$This;

				// text or attribute value
				var sSort = bData?mElm.data(oSettings.data):(bAttr?mElm.attr(oSettings.attr):(oSettings.useVal?mElm.val():mElm.text()));
 				// to sort or not to sort
				var mParent = $This.parent();
				if (!oElements[mParent]) oElements[mParent] = {s:[],n:[]};	// s: sort, n: not sort
				if (mElm.length>0)	oElements[mParent].s.push({s:sSort,e:$This,n:i}); // s:string, e:element, n:number
				else				oElements[mParent].n.push({e:$This,n:i});
			});
			//
			// sort
			for (var sParent in oElements) {
				var oParent = oElements[sParent];
				oParent.s.sort(oSettings.sortFunction);
			}
			//
			// order elements and fill new order
			var aNewOrder = [];
			for (var sParent in oElements) {
				var oParent = oElements[sParent];
				var aOrg = []; // list for original position
				var iLow = $(this).length;
				switch (oSettings.place) {
					case "first": $.each(oParent.s,function(i,obj) { iLow = Math.min(iLow,obj.n) }); break;
					case "org": $.each(oParent.s,function(i,obj) { aOrg.push(obj.n) }); break;
					case "end": iLow = oParent.n.length; break;
					default: iLow = 0;
				}
				var aCnt = [0,0]; // count how much we've sorted for retreival from either the sort list or the non-sort list (oParent.s/oParent.n)
				for (var i=0;i<$(this).length;i++) {
					var bSList = i>=iLow&&i<iLow+oParent.s.length;
					if (contains(aOrg,i)) bSList = true;
					var mEl = (bSList?oParent.s:oParent.n)[aCnt[bSList?0:1]].e;
					mEl.parent().append(mEl);
					if (bSList||!oSettings.returns) aNewOrder.push(mEl.get(0));
					aCnt[bSList?0:1]++;
				}
			}
			return this.pushStack(aNewOrder);
		}
	});
	// is numeric
	function isNum(n) {
		var x = /^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(n);
		return x&&x.length>0?x[1]:false;
	};
	// array contains
	function contains(a,n) {
		var bInside = false;
		$.each(a,function(i,m) {
			if (!bInside) bInside = m==n;
		});
		return bInside;
	};
	// set functions
	$.fn.TinySort = $.fn.Tinysort = $.fn.tsort = $.fn.tinysort;
})(jQuery);

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
			timeout: 15		};
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
