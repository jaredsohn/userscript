// ==UserScript==
// @name           Osadnici - karty
// @namespace      Osadnici - karty
// @include        http://osadnici.happz.cz/game/settlers/
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



function contains(kde, co){
	return (kde.indexOf(co)>=0);
}

addGlobalStyle('.actioncard { border: solid 1px black; padding-left: 3px; padding-right: 3px; }');
addGlobalStyle('#monopol { background: #ddddbb; }');
addGlobalStyle('#dvecesty { background: #ddddbb; }');
addGlobalStyle('#rytir { background: #8470FF; }');
addGlobalStyle('#bod { background: Grey; color: white}');
addGlobalStyle('#dvesuroviny { background: green; color: white}');

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://osadnici.happz.cz/game/settlers/cards/',
	onload: function(responseDetails) {
		var holder = document.createElement('div');
		holder.innerHTML = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
			var allFieldset = holder.getElementsByTagName("fieldset");
			var allTD;
			for(var j=0;j<allFieldset.length;j++){
					if(contains(allFieldset[j].innerHTML,"Karta")){
						allTD = allFieldset[j].getElementsByTagName("td");
					}
			}
			
			var text = '';
		for(var i=0;i<allTD.length;i++){	
				if(allTD){
					if(contains(allTD[i].innerHTML,'Monopol') && contains(allTD[i+2].innerHTML,'Nepou')){
						text += '<tr"><td id="monopol" class="actioncard"><b>Monopol</td></tr></b>';
					}
					if(contains(allTD[i].innerHTML,'cesty') && contains(allTD[i+2].innerHTML,'Nepou')){
						text += '<tr"><td id="dvecesty" class="actioncard"><b>Dve cesty</td></tr></b>';
					}
					if(contains(allTD[i].innerHTML,'Ryt') && contains(allTD[i+2].innerHTML,'Nepou')){
						text += '<tr"><td id="rytir" class="actioncard"><b style="color: white">Rytir</td></tr></b>';
					}
					if(contains(allTD[i].innerHTML,'Bod') && contains(allTD[i+2].innerHTML,'Nepou')){
						text += '<tr"><td id="bod" class="actioncard"><b>Bod +1</td></tr></b>';
					}
					if(contains(allTD[i].innerHTML,'suroviny') && contains(allTD[i+2].innerHTML,'Nepou')){
						text += '<tr"><td id="dvesuroviny" class="actioncard"><b>Dve suroviny</td></tr></b>';
					}
				}
			}	
			

		//window.alert(text);
		//
		
		var karty = document.getElementsByClassName('current_player')[0];
		//window.alert(karty.innerHTML);
		
		if (karty) {
			newElement = document.createElement('table');
			newElement.innerHTML = '<table>'+text+'</table>';
			karty.appendChild(newElement, karty);
		}
		
	}
});