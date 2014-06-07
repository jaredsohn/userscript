// ==UserScript==
// @name            [WOD]Prix_par_charge
// @namespace      *.world-of-dungeons.fr*
// @description    Indique le prix pour une charge
// @include        *.world-of-dungeons.fr/wod/spiel/trade/trade.php?session_hero_id=*
// ==/UserScript==

//var RefFilePath = "d:\games\WOD\ClaudiusPriceList.xml";

var oitemList = document.getElementsByTagName('tr'); 
//alert(oitemList.length);


var lpage = ''; var lrow; var lcell; var header = true;
for(var i = 0; i < oitemList.length; i++ ) //oitemList.length
//eviter les répétitions d'items
	{
		if (oitemList[i].className=='row0' || oitemList[i].className=='row1')
			{
			lcell = oitemList[i].getElementsByTagName('td');
		//charges
			var tmpchg = ''; var lnbcharge = ''; var lmaxcharge = ''; var litemname= "";
			var bcellvide=true;
			if (header == true) {header = false;}
			else
				{
				
				for(var j = 0; j < lcell[1].childNodes.length; j++ )
					{
					if (typeof(lcell[1].childNodes[j].data) =='string')
						{if (lcell[1].childNodes[j].data.indexOf('(')!=-1)
							{tmpchg = DelSpace(lcell[1].childNodes[j].data);
							lnbcharge = tmpchg.substring(1,tmpchg.indexOf('/'))
							lmaxcharge = tmpchg.substring(tmpchg.indexOf('/')+1,tmpchg.length-1)
							bcellvide=false;
							litemname = lcell[1].childNodes[j-1].textContent;}
							if (j==20) {alert(lnbcharge);}
						}
					}
								
				
				if (bcellvide==true) 
					{lnbcharge = '1'
					lmaxcharge = '1'}
					
				if (lnbcharge != '1')
					{var tmpPrix; var PrixCharge;
					tmpPrix = lcell[3].childNodes[0].data;
					tmpPrix = tmpPrix.substring(1,tmpPrix.length)
					PrixCharge = parseInt(tmpPrix) / parseInt(lnbcharge);
					
					var InsertHere; var fontToInsert;
					InsertHere = lcell[3].childNodes[1]
					fontToInsert = document.createElement('font');
					fontToInsert.setAttribute('color', 'cyan');
					fontToInsert.setAttribute('size', '1');
					fontToInsert.textContent= " ("+ PrixCharge.toFixed(2) +")";
					InsertHere.parentNode.insertBefore(fontToInsert, InsertHere.nextSibling);
					//lcell[3].childNodes[0].data = lcell[3].childNodes[0].data +' ('+ PrixCharge.toFixed(2) +')';
					}
				}
			}
	}

function DelSpace(pstring)
	{if (pstring.indexOf(' ') == 0 || pstring.charCodeAt(0) == 10) {return pstring.substring(1,pstring.length);}
	else {return pstring;}
	}
