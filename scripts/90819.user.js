// ==UserScript==
// @name           eRepublik Helper
// @namespace      eRep
// @include        http://www.erepublik.com/en/military/battlefield/*
// @include			http://economy.erepublik.com/en/market/*
// ==/UserScript==

var napad; 
var obrana;
var bitka;
var naziv;
var tecaj;
naziv = '';

bitka = window.location.pathname
bitka = bitka.split('/')

function glavna() {
    			var dombar = document.getElementById("pvp_header")
				if (dombar) {
					if(naziv == '') {naziv = dombar.childNodes[5].innerHTML }
					var domr = document.getElementById("domination_bar")
					var dom = domr.style.width
					dom = dom.replace('%','')
					
					dom = Math.round(dom*100000)/100000
					dom = dom.toFixed(4);
					
					dom2 = (100-dom)
					dom2 = Math.round(dom2*100000)/100000
					dom2 = dom2.toFixed(4);
						
					dombar.childNodes[5].innerHTML = dom + '% ' + naziv + ' ' + dom2 + '%';
					window.setTimeout(glavna, 1000);
				}
				var bodi = document.getElementById('marketplace')
				if (bodi){
					var cur = document.getElementById('countryId').options[document.getElementById('countryId').selectedIndex].value
					
					var i = 0
					while (i < bodi.childNodes[13].childNodes[3].childNodes.length-1)
					{
						i++;
						gdje = bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7]
						if (gdje){
						
							var stariIHTML = 	bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7].innerHTML 
							bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7].innerHTML = stariIHTML + '<br><font style="font-size:80%">Loading...</font>'			
						}
					}
									
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://www.erepublik.com/en/exchange/listOffers?select_page=select&buy_currency_history_id=buy_currencies%3D'+cur+'&sell_currency_history_id=sell_currencies%3D62&account_type=citizen-&action_path=listOffers&page=page%3D1',
						onload: function(response) {
							recvalue = response.responseText;
							//alert(recvalue)
							recvalue = recvalue.split('class="special" id="exchange_value_amount_')
							recvalue2 = recvalue[1].split('</')
							recvalue3 = recvalue2[0].split('>')
							/*for (x = 0; x < recvalue.length; x++){
								alert (recvalue[x])
							}*/
							//recvalue = JSON.parse(recvalue)
							//tecaj = recvalue[0].exchange_rate;
							tecaj = recvalue3[1]
							//alert(tecaj)
													
							market();
						}
					});
				
				}

}

function market(){
				var bodi = document.getElementById('marketplace')
				if (bodi){
				var i = 0
				while (i < 20)
					{
					i++;
					gdje = bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7]
					if (gdje){
						var cijena = bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7].innerHTML;
						
						cijena = cijena.replace(/<\//g,'');
						cijena = cijena.replace(/</g,'');
						cijena = cijena.replace(/>/g,'');
						cijena = cijena.replace(/sup/g,'');
						cijena = cijena.replace(/strong/g,'');
						cijena = parseFloat(cijena)
						
						novacijena = cijena * tecaj;
						novacijena = Math.round(novacijena*100000)/100000
						novacijena = novacijena.toFixed(5);
						
						var stariIHTML = 	bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7].innerHTML 
						bodi.childNodes[13].childNodes[3].childNodes[i].childNodes[7].innerHTML = stariIHTML.replace('Loading...', novacijena + ' GOLD');			
						//alert (cijena + ' * ' +  tecaj + ' = ' + novacijena );
						
					}
				  
				  }
				}
}


window.addEventListener('load', function() {
    var checker = setInterval(function() {
        clearInterval(checker);
        window.setTimeout(glavna, 1000);
    }, 1000);
}, false);



function fireEvent(obj, evt) {

    var fireOnThis = obj;
    if (document.createEvent) {
        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent(evt, true, false);
        fireOnThis.dispatchEvent(evObj);
    } else if (document.createEventObject) {
        fireOnThis.fireEvent('on' + evt);
    }
}