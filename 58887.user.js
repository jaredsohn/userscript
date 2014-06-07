// ==UserScript==
// @name           pwnKingsage
// @namespace      KA
// @description    Visit Overview, Script saves missing Resources in Cookie, visit Marketplace and select your "small" Town and get the missing resources filled!
// @include        http://s*.kingsage.de/*
// ==/UserScript==

function pwnKingsage() {
	var missingCookie = new Hash.Cookie('missingResources');

	var missingHash = new Hash();
	
	if($$('.borderlist').getElements('th')[0][0].get('html')=='Siedlung') {
		$$('.borderlist').getElements('tr').each(function(tr){
			
			tr.getElements('td').each(function(td, i){
				var pattern = /<\s*([a-oq-z]|p\w|\!)[^>]*>|<\s*\/\s*([a-oq-z]|p\w)[^>]*>/gi;
				var pattern2 = /\./gi;
				var pattern3 = /.*?\(([0-9]{1,4})\|([0-9]{1,4})\).*/gi;
				var tds = td.get('html');
				if(tds.length==7 && td[0].get('class')!='marked_sum') {
					var village	= td[0].get('title').replace(pattern3, "$1|$2");
					var points	= parseInt(tds[1].replace(pattern, "").replace(pattern2, ""));
					var stein	= parseInt(tds[2].replace(pattern, "").replace(pattern2, ""));
					var holz	= parseInt(tds[3].replace(pattern, "").replace(pattern2, ""));
					var erz		= parseInt(tds[4].replace(pattern, "").replace(pattern2, ""));
					var lager	= parseInt(tds[5].replace(pattern, "").replace(pattern2, ""));
					
					if(village!='Summe') {
						var missingSet = new Array(lager-stein, lager-holz, lager-erz);
						missingHash.set(village, missingSet);
					}
				}
				
			})
		})
		missingCookie.extend(missingHash);
	}else{
		document.getElement('select[name=village_name]').addEvent('change', function(e) {
			var obj = missingCookie.get(this.value);
			document.getElement('input[name=send_res2]').set('value', obj[0]);
			document.getElement('input[name=send_res1]').set('value', obj[1]);
			document.getElement('input[name=send_res3]').set('value', obj[2]);
		})
	}
};

// We have to inject and execute the kingsage function in a script tag in the page so it can acces the mootols lib'
document.body.appendChild(document.createElement('script')).innerHTML = pwnKingsage.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2')+'pwnKingsage();';
