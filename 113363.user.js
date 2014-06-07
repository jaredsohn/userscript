// ==UserScript==
// @name			Liens moteurs ng sur BinnewZ + nommage auto Binsearch
// @description		Ajoute des liens vers les moteurs nzb sur le site BinnewZ et renomme automatiquement.
// @namespace		http://userscripts.org/scripts/show/113363
// @downloadURL		https://userscripts.org/scripts/source/113363.user.js
// @updateURL		https://userscripts.org/scripts/source/113363.meta.js
// @author			Guile93, Nox
// @version			2.41naming4
// @grant			none
// @include http://*binnews.in/_bin/liste.php*
// @include http://*binnews.in/_bin/lastrefs.php*
// @include http://*binnews.in/_bin/search.php*
// @include http://*binnews.in/_bin/search2.php*
// @include https://*binnews.in/_bin/liste.php*
// @include https://*binnews.in/_bin/lastrefs.php*
// @include https://*binnews.in/_bin/search.php*
// @include https://*binnews.in/_bin/search2.php*
// @include http://www.yabsearch.nl/index.php*
// @include http://www.binsearch.info/*
// @include https://www.binsearch.info/*
// @icon           data:image/png;base64,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
// ==/UserScript==

// Passe les moteurs de recherche nzb en HTTPS si BinnewZ est en HTTPS (comportement logique)
var https = ('https:' == document.location.protocol);

function make_link(elem,cible,title,img){
	var newLink = document.createElement("a");
	newLink.href=cible;
	newLink.target="_blank";
	var new_img = document.createElement("img");
	new_img.src=img;
	new_img.title="Chercher sur "+title;
	new_img.alt="Chercher sur "+title;
	newLink.appendChild(new_img);
	elem.appendChild(newLink);
}

function myescape(str) { // Proper escape
	return escape(str).replace(/\+/g,"%2B").replace(/%20/g,"+");
}

function decodeEntities(s){ // Convert &***; to corresponding char
    var str, temp= document.createElement('p');
    temp.innerHTML= s;
    str= temp.textContent || temp.innerText;
    temp=null;
    return str;
}

// Script de création des liens moteurs nzb sur BinnewZ
function add_links(){
	var search_array = document.getElementsByTagName("TD");
	for (var n=0; n < search_array.length; ++n){
		var Td = search_array[n];
		if(Td.innerHTML.match(/flag/)){
						var z=1;
						do{
						++z;
					}while(search_array[n+z].innerHTML.match(/ng_id/));
				var newelem=search_array[n+z];
                var div = document.createElement("div");
                var cont=newelem.innerHTML;
				var req=cont.replace(/ /g,"+").split("*").join(" ").replace(/&lt;/,"<").replace(/&gt;/,">").replace(/#/,"%23");
                var method1=decodeEntities(req); 
            	var method2=encodeURIComponent(cont.replace(/&amp;/," "));
                var method3=encodeURIComponent(cont);
                var method4=escape(cont.replace(/&amp;/,"%26"));
				
				// Variable du nom de fichier souhaité
				// Avec pas mal de nettoyage...
				var dstdirname = search_array[n-1].innerHTML;
				dstdirname = dstdirname.replace(/(<([^>]+)>)/ig,""); // Replace HTML tags (text styles)
				dstdirname = decodeEntities(dstdirname); // Convert HTML codes to characters
				dstdirname = dstdirname.replace(/ +\(\+? ?a\.b\.[^\)]+\)/g,"");  // Replace useless group references (+a.b.whatever) in title
				dstdirname = dstdirname.replace(/ +\([0-9]{2,2}\/[0-9]{2,2}\/[0-9]{2,4}\)/g,"");  // Replace full dates in title (but not production years)
				dstdirname = dstdirname.replace(/ \[HD DVD-Rip\]/,"").replace(/ \[Blu Ray-Rip\]/,"").replace(/ \[HDTV-Rip\]/,"");  // Replace HD source types (redundant info with 1080p/720p)
				dstdirname = dstdirname.replace(/\s+/g," ").replace(/^\s/g,"").replace(/\s$/g,""); // Replace spaces
				dstdirname = dstdirname.replace(/[<>|\\\/?*:"\r\n]/g,""); // Replace part of the special characters unsupported by binsearch
				
				method1 += "&name=" + myescape(dstdirname);
				
				make_link(div,"http"+((https)?"s":"")+"://www.binsearch.info/?max=250&adv_age=&server=1&q="+method1,"Binsearch","data:image/png;base64,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");
                make_link(div,"http"+((https)?"s":"")+"://www.binsearch.info/?max=250&adv_age=&server=2&q="+method1,"Binsearch \"other groups\"","data:image/png;base64,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");
                make_link(div,"http://www.yabsearch.nl/index.php#req="+method2,"Yabsearch","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAAGkkcxkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQpJREFUeNpi/P//P4OlpaUaAxBcunTpMQNI4MGDB/9/T2b5z8vLW8AEkpGRkWF46nsHLAkQQIwODg5yP3784ABJMFy5cuUiSOmrV6/+M3379o3h75Z/DKKiogwAAQRWe+rUqYufP3/+//Xr1/8gGqjgPw8PD8RQfn5+sBGs5XwMj84fZGBhYWFgZWVlYATp1NDQKGFiYjL98+cPCyMj438g+++dO3eWAAQQI7KDQQDEB0oyHDt27BZY8tevX/+BzmNgY2MDsRm4ubkZmJmZGcF2ggS4FgkzvNldyfBvRyTDv3//EMb8/fv3/927d///ymH+//Lly/9QwADWCbID5OJ/t/8zAL0Asx7iWh0dnVVAlzICjWMC2vUX6GKGa9euhQEEENhYED537tw1oOR/kBUgDGIj82FiAgICKSD1LDDjgYHyGxh6DOybFRiY/nxkeKc9heGXhC+D+F55sPxH+xMMPBK6DL9//+YFq0fSCA7Nt45XGH6cX8ogvTkbKJrNAPLvo5ibDKICoqBgAfsd7D9kjezs7AxCQkIM7AZRDP9vMIDx3fAr4IgFJgqwRlCAoNj47t07JpgBoBB62XWfARgoDMJANgcHBwMoUKBBDWYABGCb/FUahqIwfqwWTUAqBukiLoIOQiA4uXZw8xHyJH0FJx18C8HZTddQcAqoQwetDg2hOqiouZ7faW+obQOXnPvnO3++7xxjLkmSRhiGe1WtxIRWfcy9t7nOsuweh3YRRVF7EYOzLOd5juO1mlXC441WUNasDlLmDO/s6Z2yLEmzqeuzrlG9ysfoRVrX+7Z/7fSlWdxKdJdKtdKSr5N+Tcw/Vqnhd3ld3lePxY00i96pbN6kZj8fZZ6Ypzkg3pCjODwTVzhp987tP9jpGqtorG+254BoFASB6fXQuRIZiq3vg9TkAUj9te7T9EMI3htbu+KG4zOVyYghI4ZqIZA6ARPZlWP9AE1aTZjMWeDSdFSiDC4ezd5QoO8asvFvDfimXxzHlyrJj2pns+dbS1OsFGgdxVyiHPafAHVWu05CQRAd4MpLxaCxgEITEzFS+qDTgpBAYsEXWPgBVvyCnYWlhaVUxgY7CyujREqNpZqIiIECBDQQHtc5y92bda9uMtndO7tzZnbODLgkpTBisZgvlUplw+FwlMnQl0j/DakHUSDY4y2s2cX+mPl8/oLnso0jGwCEKyrCHfEB1GSvTHSqXq+HbiUEa86IEOgx63rcgQ42isWiyYnIMUxIYhia03BjBNYKapd2yagWbGV/dos6G+c2YxGV/zFHvkrePjOIZGmQOLVLhKMdyp7hyD6GyDx7AsBu/JjMQIrm7vfHrb5zTcHaOr0mLsV+oZSmia5NemqsHtBoeY8CfBeM4aR/6/YdgPAegguQr8gOPQXWaPEqQ55+iy+UaakQp4ExTcagLVwfToTobfuMvPMrNMmRyYYGHjjs6x8kEHiNaFFNwXCUXjK31PAnRcFAPB9tMbfcm/ScvhmDceHgjqwJXs/oxHP/xTyICgpDkFryyC5tKe/pE+EURAWDDRSgLMZ/nxSEkcA4jHzCCBoRChENSM85dOgpEBUANtQ+4wCEcf7tcEQsoxWAn78dxDfowEr9+cSfFO2bHqGbi9RbqVSEZ7gAamONyDFXD+/sV4AjRr1OzWZTAMqiF4zmaOE87w21lf3qNNZhHJhSD1lrl5Vzt6ITdWuJqdabou9BGEe0uR97bcmzgU5TlgAAAABJRU5ErkJggg==");
				make_link(div,"http"+((https)?"s":"")+"://www.nzbindex.nl/index.php?go=search&age=&results=250&sort=age_desc&searchitem="+method3,"NZBindex.nl","data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAAGkkcxkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABMlJREFUeNpi+P//P4OgoKAsCDOAAEiAwWze/3v37gMZDBxggfcfv/z//v07WAAggBi5ubmF2NjYuMHKp06duuvajTv/GXRm/Wfi5+dnUFeWZXh/NIoBIIAYQfr6+vp2eXh4uIINBQJGRkYGbW1tThYQR0BAgEE7/CgDAzszw+sd/gyiDmshikCqra2ti2RlZZ0YkMDKlStDAAIILCkkJCSLLAEy9u3bt4/Bxh45cuQRSBFIEAR4eHjAaphA5NK9bxiCG64xaEcdY5i55SWDhCgfWBFYkp2dg6E6ThPIY2RgY2djYOPkRzjo69fv/1lYGBm+//zLwMLMxMDDzQmWA9uZnJy4lQEVMK1YsYIBIIAYYR6fMmXKIU9PT1sGPADkUAkJCXagnl9MMMG/f//+2HP2DUN+7xUGTjZGhq/ffzPk910FiTNsPf6SIb/nCgMbC8IPcI2cnJwMT98CFZ19xyAdsJ/h/N2fDFuPvGLg5uZhePDyD8PWw6+AEc8Ht50FxuDg4GBg/cXGwPDxJ8P/G0kMEm5rQKmCgZeXl4GZhZWB4c9foDWcCHeD/AjCQA/v+vPnz398+D8kQDhAFEAAPqpdJWIgit68x6yPL5D8gx/hB2yVQvIXSmprOxt7G7WzkIVlt1UIW0oaK3crQSWanZCAm3hmyAwjKxkIcznh3DPcc2Ys5ZLO3sDinBdN05TmUXfyPF/ixyAxTdNbbLFJtJBlQjd9fJUVsxYT1maqYn+X0dnlC90/flLg+3R+/UoXdys66PHpotAN/kx1FDI5/oendzo5PqTZ4gMkD3gg8SjCdB1nW1GoyE6hQ9F4TiFzpYIPm8QSJNu2t4mWx6RvV6dH1CG0q7dKEploCFwQ/1VET5jcUon7vpyOiUDetECDQOIWrpKpSH3IQ2GueCnWvJKvRfHNuy98dV1LvFxXXZIkNyowrunT3ojp2vMM3O3TbSgq4k8cxxPs7VAAsix7VvWvAKVVTUsbYRB+kt133+xiSOIXxJqLCZQee/MWVMSDBoIEvJlD6Un7J3rw4KE9Fe89pE2P9aTgR7RUD/6EqKCCoifRBtnNhzNvNjHZ1BDIuwy7O/vsDPPxzDT56E4NXzKZzMTj8Xfcm+jjCCF8hULhsFgs7rX60D04M5VKfUyn07OlUqkff2pY0Mj7RQ6P6PXpNYeqxDrl0DINSFHPYblSozlWdbNAzRnQ1L1araFEeo6AsYaLt52qskE16MiS36tg4HDEwsbva8RmdhBb2Edi6Q/Ob2wMhU08lf14u/wXsbldTK6cEF5gdNDCev6yjidZy11ghGy0tVk3h4YhEZAUvEm9a+moUDjzn47x+fuZMmTxN9ozzB7aXRCteBJTCmWjZ4eCyKC7rQm7gtXMBEbeDODbj1O8/3CgUsx/+uiShGXRNL1BmDptDdnGwK4O4XPB3F3EwsR4CLdbi1iYjuHu6hH3/xxVTK4jR8hzo4l3+4D6tPcI+YQGJKLDJqJDJhFUki0/Nr9MI/91CmNBQ+lHIwHlsKYZCAddPEmInr3E7dgZjdGRy+W2eXw4jk17wlHCz7b9Ig192XGaOi+eTzab/dnYMf8dNS5/ZD1S0RPftC7fqLYdRryTRm1W3gMcPPo7bIyKjYdai5NneQAnEnLrIpsAAAAASUVORK5CYII=");
				make_link(div,"http"+((https)?"s":"")+"://www.nzbclub.com/nzbsearch.aspx?ss="+method3+"&rpp=200&rs=1&sa=1","NZBClub","data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+lJREFUeNqsVc9vG0UU/vaXvdSJ4/iHaEISUey2UAGNoa7iW6CAkIpKDz0gQBx6QIoQqsQxEtf+ASBUiUMvlIIQBxRASIS2EarUCA4g0pIgJW1K2roiztqxY8fr9WaZN/ZsN2vH6aFP2p03b2be9+a9b2Ykx3EgJJ1Oy5FIZKher+/ZYoJdRJIkiPXUUl/YScjF3Nzcimmam41Gg9tUr4NKpaJls9mx/v7+QQZqiYXdAIVj+qgvy7JopVKp5MzPz09Vq9UVd413h/F4/PHp6ekrAweefQaPQIorSw7bwPvFYvECw6mRTfZOYEaZbd3GIxIGJFmW1cfUgLCpvjm0XV670xev4XBUxZnXMzh/5Q8sGTUkozqu5mrbFkxkhnDu9ztuP9UjYfLEmLeudssv2nbolbzaj5mCjsV7q7hfNpEzgeFoL3c4EGyOF6QeFKsm14V9thbhAQpAv7QB6rru6rai4ezMott/9XCKR2/Um44mj0Q6BkuBkSiKQqBSV0BiWFRrOnxOKfDob5QfTDs7NYu7ShQnE5vI7B927YsbDpZrChTbwvqmyW2aplWZP2dXQMNqBjWeSiDeKKCshXmfUkUpS8HA6ZfS29adfzuLL985Cs2xcOnWOrexo2X4j5a609kSMjmewkdX17jOCaM+hkVEceKbBW4b04vsH3H7UPfg2EhQLO/113FHwA8Pqnhh3wBi4RA+ThMzQ02qV81t8/clksisrnv6fUgNJprpk+W+XQHpphAEEeKtVScRAH4JBoOuv4dK6deXruHp4QGMHniS6+OjB7E3FsX9NQPXl+7glaPP45ff/kI8EsbCSs5d99axLG83Njagqmp3QCHHP/8VksVSeTeA43/fxE/1QeDPf7izGdZ+dSPPAT+dvY2RgIXb0UPYWv0XjqZj6vq3uHjmFAfzp7QjS899d5nrP3zwGt59oo7soace6ioLN0o8yFhQdlNq23Z3QPGMCCmUN5Evltqc24rLRAyGH1wWeqOCW3aPOBbwv3JtgJT3iZMvQ9JDeOOzn/FjqQ/5coWPXVgo481PvudByIkRrjt79yOTGuLjJTWMmhpih990n62u55DyTVHxdL73Yos0MU4aMB0xurJ6OXmyayVGlDjivXVey3xZjLMLY/RIxzPdBsgmSKzQsp9tfp2E2MoD2WFc1JDctr6OO5QMw1CHiv+BvWN8x5QW0qn41FKNBRHociYmsjuTt+K1b92jyOVy1Fe2bcpLWzYplEwmJwKBQJYB2U5TeCDez5cVR3zed4+yRQEuLy9/wYK8zNZV2gBb0dGue7xp8KRFbn2S78HeaulOhwedGGQyHE7X/wUYAMQwvzKmQ3f/AAAAAElFTkSuQmCC");
				make_link(div,"http://www.yubse.com/index.htm?q="+method4,"Yubse","data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QTg1RDg3RjM3QkMxMUUyQkIwNTk3RjBEOUMyNTI4NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QTg1RDg4MDM3QkMxMUUyQkIwNTk3RjBEOUMyNTI4NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZBODVEODdEMzdCQzExRTJCQjA1OTdGMEQ5QzI1Mjg3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZBODVEODdFMzdCQzExRTJCQjA1OTdGMEQ5QzI1Mjg3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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");
				div.style.display="none";
				newelem.addEventListener("mouseover",make_visible,false);
				newelem.appendChild(div);
		}
	}
}

function make_visible(e){
	var div=e.target.getElementsByTagName("div")[0];
	if(div){
		if(olddiv){
			olddiv.style.display="none";
		}
		olddiv=div;
		div.style.display="block";
	}
}

var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];

// Converts unsupported accentuated characters to non-accentuated (for binsearch)
var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
}


// Script selector depending on website
var page=window.location.href;
//var oForm = document.forms["submit_bookmark"];
if(page.match("yabsearch.nl(.*?)#req=")){
	document.getElementById("q").value=page.split("req=")[1];
	document.getElementsByName("commit")[0].click();
}else if(page.match("binsearch.info")){
	// Triggers binsearch filename script only after real full page load
	window.addEventListener ("load", LocalMain, false);
	var mainform=0;
} else {
	var olddiv;
	add_links();
}


// Binsearch filename script
function LocalMain ()
{

	// Parser les arguments de l'URI sous forme de tableau
	var options = window.location.search.slice(1)
				  .split('&')
				  .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
					b = b.split('=');
					a[b[0]] = b[1];
					return a;
				  }, {});

	// Récupérer le paramètre name
	// console.log(document.location.href);
	// console.log("Name before: "+options["name"]);
	if(options["name"]) options["name"] = unescape(options["name"].replace(/\+/g," "));
	// console.log("Name after: "+options["name"]);	
			
	// Récupérer le formulaire d'envoi
	var forms = document.forms; // console.log(forms);
	
	for (var i=0; i<forms.length; i++) {
	// console.log("Form "+i+" is... (strikes only if name setup)");
		
		// Appliquer le nom de fichier au formulaire de création nzb
		if(forms[i].getAttribute('name') == "r" && options["name"]) {
			// console.log("Form "+i+" is r");
			options["name"] = removeDiacritics(options["name"]);
			// console.log(options["name"]);	
			// console.log("Before: "+document.forms["r"].getAttribute('action'));	
			var targeturl = document.forms["r"].getAttribute('action').replace(/q=*[^&]*/ig,"q="
			+ encodeURIComponent(options["name"]).replace(/%20/g,'+')
			).replace(/&name=*[^&]*/ig,"");
			// console.log("After: "+targeturl);	
			document.forms["r"].setAttribute('action', targeturl);
			
		// Sauvegarder le nom de fichier dans le formulaire de recherche en cas de changement du groupe de recherche (main / other groups)
		// Supprimer la sauvegarde du nom de fichier en cas de changement du champs texte de recherche
		} else if (forms[i].getAttribute('adv_age') !== undefined && options["name"]){
			// console.log("Form "+i+" is main");
			var input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", "name");
			input.setAttribute("value", unescape(options["name"]));
			forms[i].appendChild(input);
			// console.log("Attribute "+options["name"]+" applied on main form");
			mainform=i;
			forms[i].elements["q"].onchange = function(){ document.forms[mainform].name.value="";}
			// console.log("Search will now reset name");
		
		}
	}
}