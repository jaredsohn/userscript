// ==UserScript==
// @name Wishlist Buddy
// @namespace http://www.wishlistbuddy.com/
// @description Adds Wishlist Buddy tagging to Amazon's Wish List pages
// @include http://*.amazon.*/gp/registry/wishlist/*
// @include http://amazon.*/gp/registry/wishlist/*
// @include http://wishlistbuddy.com/*
// @include http://*.wishlistbuddy.com/*
// @include http://wishlistmonitor.com/*
// @include http://*.wishlistmonitor.com/*
// @include http://wishlistwatchdog.com/*
// @include http://*.wishlistwatchdog.com/*
// ==/UserScript==
/*
	Wishlist Buddy 
	(C) 2006 Thom Wetzel
				www.lmnopc.com
				www.wishlistbuddy.com
*/
(function() {

	// standard functions
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	function addGlobalStyle(string){ if(/microsoft/i.test(navigator.appName) && !/opera/i.test(navigator.userAgent)){ document.createStyleSheet().cssText=string; } else { var ele=document.createElement('link'); ele.rel='stylesheet'; ele.type='text/css'; ele.href='data:text/css;charset=utf-8,'+escape(string); document.getElementsByTagName('head')[0].appendChild(ele); }}
	var $ = function(id) { return document.getElementById(id); }

	// grab start time of script
	var benchmarkTimer = null;
	var scriptStartTime = getTime();

function doAmazon()
{
	// don't run in IE (disables Turnabout) 
	if (document.all) {
		return false;
	}

	// add custom style rules to page
	addGlobalStyle('tr.wlbtag td { background: #ccffcc; padding: 5px 10px; border: 1px solid #66ff66; width: 450px; } tr.wlbtag a img { cursor: pointer; } tr.wlbtag td input, tr.wlbtag td, tr.wlbtag td select { font-size: 12px; } tr.wlbtag td img { border: none; float: left; margin: 0 10px 0 0; } tr.wlbtag td a img {padding: 0 10px; margin: 0; } tr.wlbtag td span { line-height: 20px; float: left; } div#wbThrobber { background-color: #aaffaa; color: #000000; position:fixed; _position:absolute; top:0; _top:expression(eval(document.body.scrollTop)); right:0; margin:0; padding: 1px 20px; overflow: auto; }	div#wbThrobber img { padding-top: 4px; float: left; } div#wbThrobber span { padding: 1px 4px; line-height: 30px; float: left; } ');
		
	// don't do anything unless the page is a wish list
	if (String(document.title).indexOf('Your Wish List') == -1)
	{
		return;
	}
	
	var wbUserId = GM_getValue('wbUserId', '');
	var wbWishlistId = GM_getValue('wbWishlistId', '');
	
	if ((wbUserId == '') || (wbWishlistId == ''))
	{
		alert('You must have an account at www.wishlistbuddy.com before using the Wishlist Buddy Greasemonkey Script.');
		return false;
	}

	// keep list of asins on the page
	var asinList = new String('');
	
	// add ajax loading throbber to page
	var throbber = document.createElement('div');
	throbber.setAttribute('id', 'wbThrobber');
	throbber.innerHTML = '<img src="http://www.wishlistbuddy.com/greasemonkey/wait22trans.gif" width="22" height="22" /> <span id="wbThrobberText">Working</span>';
	document.getElementsByTagName('body')[0].appendChild(throbber);
	
	// find all the items on the page
	var xpath = '//html/body/table[3]/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/form/table/tbody/tr/td[2]';
	var items = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (item = null, i = 0; item = items.snapshotItem(i); i++)
	{
		// find ASIN in the price span
		var asin = item.getElementsByTagName('a');
		if (typeof(asin) != 'object') continue; 
		asin = asin[0];							// grab the first anchor 
		if (!asin) continue;
		asin = asin.getAttribute('href');		// get the value of the href attribute
		if (!asin) continue;
		asin = String(asin).split('/');			// split the contents of the name attribute into array elements
		if (!asin) continue;
		asin = asin[5];							// grab the ASIN from the array
		
		// add the new asin to asinList
		if (asinList.length) { asinList += ','; }
		asinList += asin;
		
		// setup row
		var row = document.createElement('tr');
		row.setAttribute('class', 'wlbtag');
		
		// setup cell
		var cell = document.createElement('td');
		cell.innerHTML = '<img src="http://www.wishlistbuddy.com/img/alerticon.gif" alt="WishlistBuddy Icon" /><span>Alert me when this item <select id="' + asin + '_condition"><option value="0" selected>new or used</option><option value="1">new</option></select> hits $ <input type="text" size="8" id="' + asin + '_price" class="curr" value="" /></span><a id="' + asin + '_update"><img src="http://www.wishlistbuddy.com/img/update_button.gif" width="53" height="20" /></a>';
		
		// add cell to row
		row.appendChild(cell);
		
		// add row to table
		item.appendChild(row);
		
		// plug in event handler for clicking update button
		$(asin + '_update').addEventListener('click', function(event) {
			
			$('wbThrobberText').innerHTML = 'Saving';
			$('wbThrobber').style.display = 'block';
			
			// parse target id to get the asin 
			var asin = String(event.currentTarget.getAttribute('id')).split('_');
			asin = asin[0];
			
   		// grab the price and condition of the selected item
   		var price = $(asin + '_price').value;
   		var condition = $(asin + '_condition').selectedIndex;
   		
			// grab asin, price, condition and transmit them back to wb
			var wbUrl = 'http://www.wishlistbuddy.com/greasemonkey/transmit.php?user=' + escape(wbUserId) + '&wishlist=' + escape(wbWishlistId) + '&asin=' + escape(asin) + '&price=' + escape(price) + '&condition=' + escape(condition);
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: wbUrl,
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			        'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {

			    		if (responseDetails.responseText == '1')
			    		{
			    			// alert('Saved!');
			    		}
			    		else
			    		{
			    			alert(responseDetails.responseText);
			    		}
		    			$('wbThrobber').style.display = 'none';
		    			return false;
			    }
			});	
			
			return false;
      		
      	}, true);
      	
	}
	
	// AJAX communication - fetch your tags for this page
	var wbUrl = 'http://www.wishlistbuddy.com/greasemonkey/fetch.php?user=' + escape(wbUserId) + '&asin=' + escape(asinList);
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText,
	            "application/xml");
	        var items = dom.getElementsByTagName('item');
	        for (var i = 0; i < items.length; i++) 
	        {
	            var asin = items[i].getElementsByTagName('asin')[0].textContent;
					var condition = items[i].getElementsByTagName('new')[0].textContent;
					var price = items[i].getElementsByTagName('price')[0].textContent;
	            
	            $(asin + '_price').value = price;
	            
            	$(asin + '_condition').options[0].selected = (condition == '0');
            	$(asin + '_condition').options[1].selected = (condition == '1');
	        }
	        
	        // hide throbber
	        $('wbThrobber').style.display = 'none';
	    }
	});	

}


function doWishlistBuddy()
{
	/* this function just grabs the user's user_id and wishlist_id for 
		use in the doAmazon() function
	*/
	
	var wbUserId = $('user-id').innerHTML;
	var wbWishlistId = $('wishlist-id').innerHTML;
	
	if (wbUserId != '') 
	{ 
		GM_setValue('wbUserId', wbUserId); 
	}
	
	if (wbWishlistId != '')
	{
		GM_setValue('wbWishlistId', wbWishlistId);
	}
}


	// call function based on what site we're on 
	var href = window.location.host;
	if (String(href).indexOf('wishlistbuddy') > -1)
	{
		doWishlistBuddy();
	}
	else if (String(href).indexOf('amazon') > -1)
	{
		doAmazon();
	}

	// log execution time
	GM_log((getTime() - scriptStartTime) + 'ms');
	
})();