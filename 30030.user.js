// ==UserScript==
// @name           StockMonkeyMod
// @namespace      http://www.lapsedatheist.com/scripts/StockMonkey
// @description    Archives the stock information from StarPirates; hackjob UI modding of Jon's version (jonthegm)
// @include        http://*starpirates.net/brokerage.php
// ==/UserScript==
//
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    var LastUpdateTime = GM_getValue('LastUpdateTime', 0);

    var MovingAvgString = GM_getValue('MovingAvgs', 0);
    var LastSeenString = GM_getValue('LastSeen', 0);
    var CurrPriceString = GM_getValue('CurrPrices', 0);
    var MinPriceString = GM_getValue('MinPrices', 0);
    var MaxPriceString = GM_getValue('MaxPrices', 0);
	
    if(MovingAvgString == 0) {
	    MovingAvgString = "0,0,0,0,0,0,0,0,0,0,0,";
    }
    if(LastSeenString == 0) {
	    LastSeenString = "0,0,0,0,0,0,0,0,0,0,0,";
    }
    if(CurrPriceString == 0) {
	    CurrPriceString = "0,0,0,0,0,0,0,0,0,0,0,";
    }
    if(MinPriceString == 0) {
	    MinPriceString = "0,0,0,0,0,0,0,0,0,0,0,";
    }
    if(MaxPriceString == 0) {
	    MaxPriceString = "0,0,0,0,0,0,0,0,0,0,0,";
    }
    var lastSeen = LastSeenString.split(',');
    var movingAvgs = MovingAvgString.split(',');
    var currPrices = CurrPriceString.split(',');
    var minPrices = MinPriceString.split(',');
    var maxPrices = MaxPriceString.split(',');

// All your GM code must be inside this function
    function letsJQuery() {
	 var regex = /and own ([0-9]*) shares \(of ([0-9]*) allowed\)\./i;
	 var text = $('.contenthead').text();

	 var regarr = regex.exec(text);

	 var stocksOwned = regarr[1];
	 var totalCanOwn = regarr[2];
	 var canOwn = totalCanOwn - stocksOwned;

	 var resetAll = function() {
		if(confirm("Really reset StockMonkey Data?")) {
	 		setV('LastUpdateTime',0); 
			setV('MovingAvgs',0);
			setV('LastSeen',0);
			setV('CurrPrices',0);
			setV('MinPrices',0);
			setV('MaxPrices',0);
			window.setTimeout(function() {
				alert("StockMonkey Data has been reset.");
				location.href=unescape(window.location.pathname);
			}, 1);
		}
	 };

	 var fillInValue = function() {
		var which = $($(this).parent().parent().siblings()[0]).text();
		$("input[name='stocks_id'][value="+which+"]").prev().val($(this).children('span').text());
		return false;
	 };
	    
	 var newMAString = "";
	 var newLSString = "";
	 var newCPString = "";
	 var newMinString = "";
	 var newMaxString = "";
	 
	 $(document).ready(function(){}); 
	    
	   var dataString = "";
	// $(document).ready(function() {
	var cargo = $('a[title="Cargo Value"] > div.text_a').text().replace('$', '').replace(/,/g,'');	
	var bank = $('a[title="Galactic Credit"] > div.text_a').text().replace('$', '').replace(/,/g,'');	
	cargo = parseInt(cargo);	
	bank = parseInt(bank) + cargo;
	var changed = false;
	var currTime = new Date().getTime();
	var shouldUpdate = (LastUpdateTime == 0 || currTime - LastUpdateTime > 5 * 60 * 1000 );

	    $('input[type="text"]').parent().prev().each(function(i){
		    		var innerText = $(this).text();
				var price = innerText.split('+')[0];
				price = price.replace('$','');
				price = price.replace(',','');
				price = parseFloat(price);

				var last = lastSeen[i];
				var lastPrice = currPrices[i];
				var avg = movingAvgs[i];
				var min = minPrices[i];
				var max = maxPrices[i];
				
				var HTMLString = "";

				lastPrice = parseFloat(lastPrice);
				last = parseFloat(last);
				avg = parseFloat(avg);

				if ( avg == 0  || shouldUpdate ) {
					modTime = currTime % 300000;
					currTime = (currTime - modTime);
					currTime = currTime + 30000;
					if (avg == 0) {
					  avg = price;
					} else {
					  avg = avg + ((price - avg) * 0.1);
					}

					if (price < min || min == 0) {
						min = price;
					} 
					if (price > max) {
						max = price;
					}

 					LastUpdateTime = currTime;
					newMAString += avg.toFixed(2)+ ",";
					newLSString += lastPrice+","; 
					newMinString += min + ",";
					newMaxString += max + ",";					
					last = lastPrice;
					newCPString += Math.round(price) + ",";
					changed = true;
				}
				
				dataString += "&var"+i+"="+String(price);	
				
				var percent = 100*(price-min)/(max-min);
				
				if(avg > price * 1.1) {
					$(this).addClass('buyMe');
				} else if (avg * 1.1 < price ) {
					$(this).addClass('sellMe');
				} else {
					$(this).addClass('holdMe');
				}
								
				if ( price > last ) {
					HTMLString = '<div style="font-size:20px; text-align:center; color:#FFFF00"><b>$'+Math.round(price)+', &Delta;$'+Math.abs(price-last)+'&uArr;</b></div>';
				} else if ( price < last ) {
					HTMLString = '<div style="font-size:20px; text-align:center; color:#80FF00"><b>$'+Math.round(price)+', &Delta;$'+Math.abs(price-last)+'&dArr;</b></div>';
				} else {
					HTMLString = '<div style="font-size:20px; text-align:center; color:#00FFFF"><b>$'+Math.round(price)+', &Delta;$'+Math.abs(price-last)+'</b></div>';
				}
				
				//$(this).append('<div style="font-size:11px;">Min: $'+min+"</div>");
				//$(this).append('<div style="font-size:11px;">Avg: $'+avg.toFixed(2)+"</div>");
				//$(this).append('<div style="font-size:11px;">Max: $'+max+"</div>");
				//$(this).append('<div style="font-size:11px;">Last: $'+Math.floor(last)+"</div>");
				
				var amount = 0;
				var currDollar = 0;
				while (amount < canOwn && currDollar < cargo) {
					amount++;
					currDollar = price * amount + Math.ceil(price * amount * .10);
				}

				var amountBank = 0;
				currDollar = 0;
				while (amountBank < canOwn && currDollar < bank) {
					amountBank++;
					currDollar = price * amountBank + Math.ceil(price * amountBank * .10);
				}

				var amountPull = ((amountBank) * price  + Math.ceil(price * (amountBank) * .10)) - cargo;
				if (amountPull < 0) {
					amountPull = 0;
				}

                HTMLString += '<table style="width:100%"><tr><td style="font-size:12px; text-align:left">$' + min + '</td><td style="font-size:12px; text-align:center">~ $' + Math.round(avg) + '</td><td style="font-size:12px; text-align:right">$' + max + '</td></tr></table>';
                
				HTMLString += '<table style="width:100%"><tr style="height:15px;background-color:#404040;"><td style="width:'+Math.round(percent)+'%;background-color:#C0C0C0;"></td><td></td></tr></table>';

				HTMLString += '<div style="font-size:12px;text-align:center">Max. '+Math.floor(amountBank) + " ($"+Math.floor(amountPull)+")</div>";

				$(this).empty().append(HTMLString);
	    		});
	    	if (changed) {
			setV('LastUpdateTime', currTime+"");
			setV('MovingAvgs',newMAString);
			setV('LastSeen',newLSString);
			setV('CurrPrices',newCPString);
			setV('MinPrices',newMinString);
			setV('MaxPrices',newMaxString);
			dataString += "&timestamp="+String(LastUpdateTime);
			// This is the xHTTP request to store the data on lapsedatheist.com
			// the php script accepts the prices seen and a timestamp.  It then writes them in a flat text file for future processing.	
			window.setTimeout(function() {GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://www.lapsedatheist.com/scripts/monkeyDataWriter.php',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: dataString
			})}, 500);
		}

	    		var lut = new Date();
			lut.setTime(LastUpdateTime);
			var tableNode = $('input[type="text"]').parent().parent().parent().parent();
			$(tableNode).prepend('<tr><td colspan="5" align="center"><input class="button" type="button" value="Reset Tracking Data" id="resetButton"/></td></tr>');
			$(tableNode).prepend('<tr><td colspan="5" align="center"><a href="/portfolio.php">Jump to View/Sell Stocks</a></td></tr>');
			$(tableNode).prepend('<tr><td colspan="5" align="center">Last Updated: '+lut.toString()+'</td></tr>');
			


			$('.buyMe').css('background-color', '#358811');
			$('.sellMe').css('background-color', '#882211');
			$('.holdMe').css('background-color', '#116288');
			var allNodes = '.buyMe, .sellMe, .holdMe';
			$(allNodes).attr('align', 'left');
			$(allNodes).css('padding', '.5em');
			$(allNodes).prev().attr('valign', 'top').css('padding','.5em');
			$(allNodes).prev().prev().attr('valign', 'top').css('padding','.5em');
			$(allNodes).next().attr('valign', 'top').css('padding','.5em');
			$(allNodes).next().next().attr('valign', 'top').css('padding','.5em');

			$("#resetButton").click(resetAll);
			$(".fillInLink").click(fillInValue);
			
	   // });},1000);

	    		//reset code
			//setV('LastUpdateTime',0); 
			//setV('MovingAvgs',0);
			//setV('LastSeen',0);
			//setV('CurrPrices',0);
			//setV('MinPrices',0);
			//setV('MaxPrices',0);

    }

  function setV(key, value) {
	  window.setTimeout(function() {
	  GM_setValue(key,value);
	  },2);
  }


