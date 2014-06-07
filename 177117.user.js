// ==UserScript==
// @name        	cookieclickerprice
// @namespace   	marshen
// @description		Shows how much you have to pay for one CpS. Amortisation of production units is refreshed once you buy something new.
// @include     	http://orteil.dashnet.org/cookieclicker/
// @version     	1.0.5
// @updateURL		http://userscripts.org/scripts/source/177117.meta.js
// @downloadURL		http://userscripts.org/scripts/source/177117.user.js
// ==/UserScript==

(function()
{
	// Config
	var updateInterval = 50; // milliseconds
	var checkGold = false; // set to 'false' to disable gold cookie features or to 'true' to auto click colored cookies.
	var autoAcceptGold = true; // set to 'true' auto accepts gold cookie; 'false' shows an alert each time a golden one spawns.
	var cookieTime = { min : 1000, max : 3000 }; // time for autoAccept
	// Config End
	
	// Don't change
	var cookieVisible = true;
	function update()
	{
		// Check Golden Cookie
		elm = document.getElementById('goldenCookie');
		if (checkGold && elm && elm.style)
		{
			// onCookieShow
			if (!cookieVisible && elm.style.display != 'none')
			{
				cookieVisible = true;
				
				if (!autoAcceptGold)
				{
					alert('Cookies?');
				}
				else
				{
					var a = function () { clickElement.apply(this, [elm]); };
					setTimeout(a, cookieTime.min + Math.random() * (cookieTime.max - cookieTime.min));
				}
			}
			// onCookieHide
			if (cookieVisible && elm.style.display == 'none')
			{
				cookieVisible = false;
			}
		}
		
		setTimeout(update, updateInterval);
	}
	
	function updatePrice(mutation)
	{
		var count = Array(10);
		var income = Array(10);
		var cost = Array(10);
		var costPerGain = Array(10);
		
		var countIncomeReg = /(\d+)\D+(\d+(\.\d+)?)/;
		
		var elm, elms, txt, res;
		for (var i = 0; i < count.length; i++)
		{
			elm = document.getElementById('rowInfoContent' + i);
			
			if (elm && elm.firstChild)
			{
				txt = elm.innerHTML;
				txt = txt.replace(/[,]/g, '');
				
				res = countIncomeReg.exec(txt);
				
				if (res)
				{
					count[i] = parseInt(res[1]);
					income[i] = parseFloat(res[2]);
				}
			}
		}
		
		elms = document.getElementById('products');
		elms = elms.getElementsByClassName('price');
		
		for (var i = 0; i < count.length; i++)
		{
			if (elms[i] && elms[i].firstChild)
			{
				txt = elms[i].firstChild.nodeValue;
				txt = txt.replace(/[,]/g, '');
				cost[i] = parseInt(txt);
			}
		}
		
		for (var i = 0; i < count.length; i++)
		{
			if (!isNaN(income[i]) && !isNaN(count[i]))
			{
				costPerGain[i] = cost[i] / (income[i] / count[i]);
				
				if (isNaN(costPerGain[i]))
				{
					continue;
				}
				
				costPerGain[i] = Math.round(costPerGain[i] * 100) / 100;
				
				if (!elms[i].nextSibling || elms[i].nextSibling.nodeName != 'SPAN')
				{
					elm = document.createElement('span');
					elm.appendChild(document.createTextNode(''));
					
					if (elms[i].nextSibling)
					{
						elms[i].parentNode.insertBefore(elm, elms[i].nextSibling);
					}
					else
					{
						elms[i].parentNode.appendChild(elm);
					}
				}
				else
				{
					elm = elms[i].nextSibling;
					continue;
				}
				
				elm.firstChild.nodeValue = ' ' + formatNumber(costPerGain[i]) + ' cost/inc.';
			}
		}
	}
	
	function clickElement(elm)
	{
		if (elm.style.display != 'none')
		{
			var event = new MouseEvent('click', {
				'view': window,
				'bubbles': true,
				'cancelable': true
			});
			elm.dispatchEvent(event);
		}
	}
	
	function addSeperator(s)
	{
		var seperator = ',';
		var mark = '.';
	 
		s = s.toString();
		// Separate number and fraction.
		var a = s.split('.');
		var neg = (a[0][0] == '-' ? '-' : '');
		var num = a[0].substr(neg.length); // Number w/o negative sign.
		var frac = a[1];
		var res = '';
		var len = num.length;
		while (len > 3){
			res = seperator + num.substr(len - 3, 3) + res;
			len -= 3;
		}
		res = neg + num.substr(0, len) + res;
	 
		if (frac)
			res = res + mark + frac;
		return res;
	}
	
	function formatNumber(n)
	{
		var div = 1;
		var suffix = '';
		if (n < 1000)
		{
			n = n * 100;
			div = 100;
		}
		else if (n > 999999 && n < 1000000000)
		{
			n = n / 1000;
			suffix = 'k';
		}
		else if (n >= 1000000000 && n < 1000000000000)
		{
			n = n / 1000000;
			suffix = 'm';
		}
		else if (n >= 1000000000000)
		{
			n = n / 1000000000;
			suffix = 'bn';
		}
		
		n = Math.round(n) / div;
		
		return addSeperator(n) + suffix;
	}
	
	window.toggleAlert = function()
	{
		checkGold = !checkGold;
	}
	
	var childListConfig = { childList: true };
	
	var products = document.getElementById('products');
	var productsObserver = new MutationObserver( function (mutations) { mutations.forEach(function() { updatePrice(); setTimeout(updatePrice, 1000);}); } );
	productsObserver.observe(products, childListConfig);
	
	var upgrades = document.getElementById('upgrades');
	var upgradesObserver = new MutationObserver( function (mutations) { mutations.forEach(function() { updatePrice(); setTimeout(updatePrice, 1000);}); } );
	upgradesObserver.observe(upgrades, childListConfig);
	
	var rows = document.getElementById('rows');
	var rowsObserver = new MutationObserver( function (mutations) { mutations.forEach(function() { setTimeout(updatePrice, 1000);}); });
	rowsObserver.observe(rows, { attributes : true, subtree : true });
	
	update();
})();