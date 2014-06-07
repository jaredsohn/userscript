// ==UserScript==
// @name			Hide Selected Craigslist Listings
// @namespace		www.vertigofx.com
// @include			http*://*.craigslist.*/*
// @exclude			http*://*.craigslist.*/cgi-bin/*
// @exclude			http*://*.craigslist.*/about/*
// @exclude			http*://forums.craigslist.*/*
// @exclude			http*://accounts.craigslist.*/*
// ==/UserScript==

ShowHideToggle = 1;

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

function letsJQuery() {
	//alert($); // check if the dollar (jquery) function works
	//alert($().jquery); // check jQuery version
	
	

	
	IDlistArray = String(GM_getValue("IDlist")).split("|");
	IDlistCount = IDlistArray.length - 1;
	
	
	$('span#ef').append('<input type="button" id="UnhideButton" onclick="unhideAll();" value="Unhide All" style="font-size:11px;margin-left:10px;">');
	$('span#ef').append('<input type="button" id="ShowHideButton" onclick="ShowHidden();" value="Show Hidden" style="font-size:11px;margin-left:10px;">');
	$('span#ef').append('<span style="margin-left:5px;" id="HiddenCount">[Hidden: '+IDlistCount+']</span>');
	
	$('blockquote > p:not(p[align="center"])').prepend(function(i, html) { return '<input title="Hide this listing" type="button" id="hide_'+String(html.match("[0-9]*\.html")).replace(".html","")+'" onclick="hideListing('+String(html.match("[0-9]*\.html")).replace(".html","")+');" value="X" style="position:relative;top:-2px;margin-right:10px;width:20px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">'; });
	
	if (IDlistCount < 1) {
		$('#ShowHideButton').attr('disabled','true');
		$('#UnhideButton').attr('disabled','true');
	}	
	
	

	for (x in IDlistArray)
	{
		if (IDlistArray[x])
		{
			someID = IDlistArray[x];
			$('a[href*="'+someID+'"]').parent().css('display','none');
			$('#hide_'+someID+'').parent().attr('id','hidden');
			$('p#hidden > input#hide_'+someID).css('display','none');
			$('p#hidden > input#hide_'+someID).parent().prepend('<input title="Unhide this listing" type="button" id="unhide_'+someID+'" onclick="unhideListing('+someID+');" value="Unhide" style="position:relative;top:-2px;margin-right:10px;width:70px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">');
		}
	}
	
	unsafeWindow.hideListing = function(someID) {
	  setTimeout(function() {
		listingID = "|"+someID;
		if (!GM_getValue("IDlist")) {
			IDlist = "";
			var checkID = "";
			GM_setValue("IDlist", String(listingID));
		} else {
			IDlist = GM_getValue("IDlist");
			var checkID = IDlist.indexOf(listingID);
			if (checkID == -1) {
				newIDlist = listingID+GM_getValue("IDlist");
				GM_setValue("IDlist", String(newIDlist));
			}
		}
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;
		$('#HiddenCount').html('[Hidden: '+IDlistCount+']');
		if (ShowHideToggle == 0){
			$('#hide_'+someID+'').parent().css('opacity','0.3');
		} else if (ShowHideToggle == 1){
			$('#hide_'+someID+'').parent().css('display','none');
		}
		$('#hide_'+someID+'').parent().attr('id','hidden');
		$('p#hidden > input#hide_'+someID).css('display','none');
		$('p#hidden > input#hide_'+someID).parent().prepend('<input title="Unhide this listing" type="button" id="unhide_'+someID+'" onclick="unhideListing('+someID+');" value="Unhide" style="position:relative;top:-2px;margin-right:10px;width:70px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">');
		$('#ShowHideButton').removeAttr('disabled');
		$('#UnhideButton').removeAttr('disabled');
	  }, 0);
	  


	};

	
	unsafeWindow.unhideListing = function(someID) {
	  setTimeout(function() {
			remlistingID = "|"+someID;
			IDlist = GM_getValue("IDlist");
			var checkID = IDlist.indexOf(remlistingID);
			if (checkID != -1) 
			{
				newIDlist = IDlist.replace(remlistingID,'');
				GM_setValue("IDlist", String(newIDlist));
			}
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;
		$('#HiddenCount').html('[Hidden: '+IDlistCount+']');
		$('#hide_'+someID+'').parent().css('display','block');
		$('#hide_'+someID+'').parent().css('opacity','1');
		$('#unhide_'+someID+'').remove();
		$('#hide_'+someID+'').css('display','inline');
		$('#hide_'+someID+'').parent().removeAttr('id');
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;		
		if (IDlistCount < 1) {
			$('#ShowHideButton').attr('disabled','true');
			$('#UnhideButton').attr('disabled','true');
		}	
	  }, 0);
	};

	unsafeWindow.unhideAll = function() {
	  setTimeout(function() {
		GM_deleteValue("IDlist");
		location.reload();
	  }, 0);
	};

	unsafeWindow.ShowHidden = function() {
	  setTimeout(function() {	
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		if (ShowHideToggle == 1) {
			for (x in IDlistArray)
			{
				if (IDlistArray[x])
				{
					$('a[href*="'+IDlistArray[x]+'"]').parent().css('display','block');
					$('a[href*="'+IDlistArray[x]+'"]').parent().css('opacity','0.3');
				}
			}
			$('#ShowHideButton').attr('value','Hide Again');
			ShowHideToggle = 0;
		} else if (ShowHideToggle == 0) {
			for (x in IDlistArray)
			{
				if (IDlistArray[x])
				{
					$('a[href*="'+IDlistArray[x]+'"]').parent().css('display','none');
				}
			}
			$('#ShowHideButton').attr('value','Show Hidden');
			ShowHideToggle = 1;
		}
				
		
	  }, 0);		
	}
	
	
}


