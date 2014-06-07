// ==UserScript==
// @author         @@@	
// @name           Link
// @namespace      MSL
// @description    Link duank - indo vers
// @version        1.2.0
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// ==/UserScript==

        var el = document.getElementById('menu');
        var f1= document.createElement('a');
        f1.setAttribute('href', 'http://economy.erepublik.com/en/market/49/1/1/citizen/0/price_asc/1');
        f1.innerHTML = 'Fq1 &nbsp &nbsp';
        el.appendChild(f1);
		
		var f5= document.createElement('a');
        f5.setAttribute('href', 'http://economy.erepublik.com/en/market/49/1/5/citizen/0/price_asc/1');
        f5.innerHTML = 'Fq5 &nbsp &nbsp';
        el.appendChild(f5);

		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://economy.erepublik.com/en/market/job/49');
        storage.innerHTML = 'Job Market &nbsp &nbsp';
        el.appendChild(storage);
	
		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/inventory');
        storage.innerHTML = 'Storage &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://economy.erepublik.com/en/market/49/7/1/citizen/0/price_asc/1');
        storage.innerHTML = 'FRM &nbsp &nbsp';
        el.appendChild(storage);
   
        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://economy.erepublik.com/en/market/49/12/1/citizen/0/price_asc/1');
        storage.innerHTML = 'WRM &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://economy.erepublik.com/en/market/49/2/5/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q5 &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://economy.erepublik.com/en/market/49/2/6/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q6 &nbsp &nbsp';
        el.appendChild(storage);