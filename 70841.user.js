// ==UserScript==
// @name			Gang Generosity
// @version			0.1
// @author			ApxA
// @description		Ajout du taux de générosité envers le compte de la bande dans les stats /financial/
// @include			http://www.bumrise.com/financial/
// @include			http://www.clodogame.fr/financial/
// ==/UserScript==

var str_host = 'http://'+window.location.hostname;
var str_version = '0.1';

// Game filter
if(str_host.indexOf('clodogame')>=0) {
	var str_expenses = 'Dépenses:';
	var str_gangdonation = 'Recettes de la bande:';
	var str_ganggenerosity = 'Taux de générosité:';
} else if (str_host.indexOf('bumrise')>=0) {
	var str_expenses = 'Expenses:';
	var str_gangdonation = 'Gang Donation:';
	var str_ganggenerosity = 'Gang generosity:';
}

var dec_expenses = 0.00;
var dec_gangdonation = 0.00;
var dec_ganggenerosity = 0.00;

function round(num,dec) {
	var dec_result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return dec_result;
}

function getFinancial(){
	// Clodogame Ajax method
	GM_xmlhttpRequest({
		method: 'GET',
		url: str_host+'/financial/',
		onload: function (obj_response){
			var arr_table = obj_response.responseText.match(/<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\'show cbox(\s|.)*?table>/g);
			for(var int_cnt1=0;int_cnt1<arr_table.length;int_cnt1++){
				var arr_tr = arr_table[int_cnt1].match(/<tr(\s|.)*?tr>/g);
				for(var int_cnt2=0;int_cnt2<arr_tr.length;int_cnt2++){
					var arr_td = arr_tr[int_cnt2].match(/<td(\s|.)*?td>/g);
					var str_td = arr_td[(arr_td.length-1)];
					// Get Expenses
					if(arr_tr[int_cnt2].search(str_expenses)>-1){
						//<td valign="middle" align="right" nowrap="nowrap" width="451">$21.000,00</td>
						var int_start = str_td.indexOf('>');
						var int_end = str_td.indexOf('</td>');
						var str_value = str_td.substring((int_start+1),int_end);
						var str_value = str_value.replace(/([^0-9,]*)/g,'').replace(',','.');
						dec_expenses = parseFloat(str_value);
						//alert('expenses:'+dec_expenses);
					}
					// Get Gang Donation
					if(arr_tr[int_cnt2].search(str_gangdonation)>-1){
						var int_start = str_td.indexOf('>');
						var int_end = str_td.indexOf('</td>');
						var str_value = str_td.substring((int_start+1),int_end);
						var str_value = str_value.replace(/([^0-9,]*)/g,'').replace(',','.');
						dec_gangdonation = parseFloat(str_value);
						//alert('gang donation:'+dec_gangdonation);
					}
				}
			}
			if(dec_expenses>0)dec_ganggenerosity = ((dec_gangdonation/dec_expenses)*100);

			// Create HTML TR Object for Gang Generosity Information
			var obj_tr = document.createElement("tr");
			var obj_td = document.createElement("td");
			obj_td.setAttribute('height','15');
			obj_td.setAttribute('width','11');
			obj_tr.appendChild(obj_td);
			var obj_td = document.createElement("td");
			obj_td.setAttribute('valign','middle');
			obj_td.setAttribute('nowrap','nowrap');
			obj_td.setAttribute('width','100');
			obj_td.setAttribute('style','font-weight:bolder');
			var obj_text = document.createTextNode(str_ganggenerosity);
			obj_td.appendChild(obj_text);
			obj_tr.appendChild(obj_td);
			var obj_td = document.createElement("td");
			obj_td.setAttribute('height','15');
			obj_td.setAttribute('width','11');
			obj_tr.appendChild(obj_td);
			var obj_td = document.createElement("td");
			obj_td.setAttribute('valign','middle');
			obj_td.setAttribute('nowrap','nowrap');
			obj_td.setAttribute('width','451');
			obj_td.setAttribute('style','align:right');
			var obj_text = document.createTextNode(round(dec_ganggenerosity,2)+' %');
			obj_td.appendChild(obj_text);
			obj_tr.appendChild(obj_td);

			// Insert new information
			var obj_table = document.getElementsByTagName("table");
			for(var int_cnt1=0;int_cnt1<obj_table.length;int_cnt1++){
				if(obj_table[int_cnt1].className=='show cbox'){
					obj_table[int_cnt1].appendChild(obj_tr);
					break;
				}
			}
		}
	});
}

getFinancial();