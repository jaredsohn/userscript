// version 1.0
// 23/11/2008
// ==UserScript==
// @name GW Inattivi
// @author Raze[ITA]
// @descrizione: Tool Inattivi per GW powered by Raze
// @include      http://s*.galaxywars.*/space/*
// ==/UserScript==

(function(){
        if (location.pathname.search('highscore.php') != -1)
        {
		var celleth = document.getElementsByTagName("td");
		if(celleth[9].innerHTML.search("value=\"s\" selected") != -1) {
			var pagina = document.getElementsByTagName("a");
	                var celleth = document.getElementsByTagName("th");
			var player, data, conta, classifica, riferimento, saved, salva; 
			var pos, nome, pttot;
			var pos_s, nome_s, pttot_s;
			var gg, mm, aaaa, ore, min, sec, orario;
			var tmp1, tmp2;
	                data = new Date();
	                gg = data.getDate();
	                mm = data.getMonth() + 1;
	                aaaa = data.getFullYear();
			if (gg < 10){
		                gg = "0" + gg;
	                }
		        if (mm < 10){
	        	        mm = "0" + mm;
	                }
			ore = data.getHours();
			min = data.getMinutes();
			sec = data.getSeconds();
			if (ore < 10){ 
				ore = "0" + ore; 
			}
			if (min < 10){
				min = "0" + min;
			}
			if (sec < 10){
				sec = "0" + sec;
			}
			orario = ore  + ":" + min  + ":" + sec;
			data = gg + "/" + mm + "/" + aaaa;
			var serverID = document.location.href;
			tmp1 = serverID.indexOf("http://")+7;
			tmp2 = serverID.indexOf("/space/", tmp1);
			serverID = serverID.substring(tmp1,tmp2);
	                conta = GM_getValue(serverID + 'conta');
			riferimento = GM_getValue(serverID + 'hs_rif');
			if(conta) {
		                var page = document.getElementsByTagName("table").item(0);
		                var parentDiv = page.parentNode;
		                newDiv = document.createElement("div");
				var valore = GM_getValue(serverID + 'delta')?GM_getValue(serverID + 'delta'):'0';
		                newDiv.innerHTML += '<hr><p align=left><font color=white style=Courier size=2>&nbsp;Calcolo Inattivi by <font color=green>Raze</font></p><p align=left>&nbsp;Classifica di riferimento selezionata : ' + riferimento + '&nbsp;&nbsp;<button type=button STYLE=\'font-size:8pt;font-family:Courier;\' id=DISATTIVA>Disattiva</button>&nbsp;&nbsp;<br>&nbsp;Delta semi-attivi&nbsp;&nbsp;<input type=text name=delta_box value=' + valore + ' maxlength=20 size=6>&nbsp;&nbsp;<button type=button STYLE=\'font-size:8pt;font-family:Courier;\' id=DELTA>Save</button></p><hr>'; 
		                for(i = 1; i<=conta; i++){
	        	                classifica = GM_getValue(serverID + 'conta' + i);
		                        newDiv.innerHTML += '<p align=left><font color=white size=2 style=Courier>&nbsp;Classifica del ' + classifica + '</font>&nbsp;&nbsp;<button type=button STYLE=\'font-size:8pt;font-family:Courier;\' id=ATTIVA' + i + '>Attiva</button>&nbsp;&nbsp;<button type=button STYLE=\'font-size:8pt;font-family:Courier;\' id=CANCELLA' + i + '>Cancella</button></p>';
					classifica = classifica.substring(0, classifica.indexOf(" ", 0));
		                }
		                newDiv.innerHTML += '<hr>';

        		        parentDiv.appendChild(newDiv);
				for(i = 1; i<=conta; i++){
					var btCancella = document.getElementById('CANCELLA'+i);
		                        var btAttiva = document.getElementById('ATTIVA'+i);
					btCancella.addEventListener("click", function () {
					var hs = GM_getValue(serverID + this.id.replace('CANCELLA','conta'));
					if( confirm( 'Confermi cancellazione classifica ' + hs + '?' ) ) {
					        hs_del(hs, serverID, this.id.replace('CANCELLA',''));
				        }
	                                }, false);
		                        btAttiva.addEventListener("click", function () {
	        	                valore = this.id.replace('ATTIVA','conta');
		                        GM_setValue(serverID + 'hs_rif' , GM_getValue(serverID + valore));
		                        }, false);
	        	        }
		                var btDisattiva = document.getElementById('DISATTIVA');
		                btDisattiva.addEventListener("click", function () {
		                GM_setValue(serverID + 'hs_rif' , 0);
	        	        }, false);
				var btDelta = document.getElementById('DELTA');
				btDelta.addEventListener("click", function () {
				GM_setValue(serverID + 'delta' , document.getElementsByName('delta_box').item(0).value);
				}, false);
	                        if (GM_getValue(serverID + 'conta'+GM_getValue(serverID + 'conta'))) {
        	                        saved = GM_getValue(serverID + 'conta'+GM_getValue(serverID + 'conta'));
                	                saved = saved.substring(0, saved.indexOf(" ", 0));
                        	}
			} // endif conta
			if (riferimento) { 
                                var ora_rif = riferimento.substring(riferimento.indexOf(" ", 0)+1);
                                riferimento = riferimento.substring(0, riferimento.indexOf(" ", 0));
                                //alert('rif = ' + riferimento + ' ora_rif = ' + ora_rif);
				var tabella = document.getElementsByTagName("table");
				tabella[3].border='1';
				var html_new = tabella[3].innerHTML.replace(/th>/g,"td>");
				html_new = tabella[3].innerHTML.replace(/<th/g,"<td");
				tabella[3].innerHTML = html_new;
				var pagina = document.getElementsByTagName("a");
		                var celleth = document.getElementsByTagName("td");
		                for (i = 5, h = 20; i <= pagina.length; i+=1, h+=7)
	        	        {
	                	        player = celleth[h+1].innerHTML;
	                        	tmp1 = player.indexOf("p=",0)+2;
		                        if (tmp1) {
	        		                tmp2 = player.indexOf("\">",tmp1);
			                        player = player.substring(tmp1,tmp2);
						nome = celleth[h+1].innerHTML;
						tmp1 = nome.indexOf("\">",0)+2;
	                                        tmp2 = nome.indexOf("<", tmp1);
	                                        nome = nome.substring(tmp1,tmp2);
	                                        pos = celleth[h].innerHTML;
	                                        pttot = celleth[h+5].innerHTML.replace(/\./g,"");
						var stringa = GM_getValue(serverID + riferimento + '/' + player);
						if (!stringa) {
							stringa =  pos + '/' + nome + '/' + celleth[h+2].innerHTML + '/' + celleth[h+3].innerHTML + '/' + celleth[h+4].innerHTML + '/' + celleth[h+5].innerHTML + '/' + celleth[h+6].innerHTML + '/';
						}
						var valori = stringa.split('/');
						pos_s = valori[0];
						nome_s = valori[1];
						pttot_s = valori[5].replace(/\./g,"");
						var diff = pos_s;
						var html = celleth[h].innerHTML + '<div><span name=' + nome + ' id=det_' + player + '>';
						if (pttot_s == pttot) {
							html += '<b><font color=orange STYLE=\'font-size:8pt;font-family:Verdana;cursor:pointer;\'>&nbsp;INATTIVO</font></b></span>';
			                        } else if (parseInt(pttot_s) < parseInt(pttot)) {
							if ((parseInt(pttot) - parseInt(pttot_s)) <= document.getElementsByName('delta_box').item(0).value) {
								html += '<b><font color=blue STYLE=\'font-size:8pt;font-family:Verdana;cursor:pointer;\'>&nbsp;SEMI-ATTIVO</font></b></span>';
							} else {
								html += '<font color=#31e024 STYLE=\'font-size:8pt;font-family:Verdana;cursor:pointer;\'>&nbsp;INCREMENTO</font></span>';
							}
						} else if (parseInt(pttot_s) > parseInt(pttot)) {
        	                                        html += '<font color=red STYLE=\'font-size:8pt;font-family:Verdana;cursor:pointer;\'>&nbsp;DECREMENTO</font></span>';
						}

						if (pos != pos_s) {
							var res = check_val(pos_s, pos)
							var colore = res.colore;
							html += '<br><font color=' + colore + ' STYLE=\'font-size:9pt;font-family:Verdana;\'>[' + diff + ']</font>';
						}
						html += '</div>';
						var diff = nome_s;
						celleth[h+1].innerHTML = celleth[h+1].innerHTML.replace(/\">/g, "\"><font color=yellow STYLE=\'font-size:10pt;font-family:Verdana;\'>");
						celleth[h+1].innerHTML = celleth[h+1].innerHTML.replace(/<\/a>/g, "<\/font><\/a>");
						if (diff && diff != nome.replace(/\//g,'')) {

		      	                                celleth[h+1].innerHTML += '<div><font color=#31e024 STYLE=\'font-size:9pt;font-family:Verdana;\'>&nbsp;[' + diff + ']</font></div>';
						}

						for (v = 2; v < 7; v++) {
							var diff = parseInt(celleth[h+v].innerHTML.replace(/\./g,"")) - parseInt(valori[v].replace(/\./g,""));
							if (diff != 0) {
                	                	                var res = check_val(celleth[h+v].innerHTML, valori[v]);
								colore = res.colore;
								diff = res.delta;
                                        		        celleth[h+v].innerHTML += '<div><font color=' + colore + ' STYLE=\'font-size:9pt;font-family:Verdana;\'>&nbsp;[' + diff + ']</font></div>';
							}
						}

	                                        celleth[h].innerHTML = html; 
						var dettaglio = document.getElementById('det_' + player);
						dettaglio.addEventListener("click", function () {
						var pl_id = this.id.replace('det_', '');
						var pl_name = this.getAttribute("name");
						pl_det(pl_id, pl_name, conta, serverID);
						}, false);

                        		} // endif tmp1
	                	} // fine ciclo for
	                } // endif riferimento
			if (saved == data && !(riferimento)) {
				//alert('Update Classifica del ' + saved);
				var stato = 'Update Classifica del ' + saved + ' ore ' + orario;
				conta = GM_getValue(serverID + 'conta');
				salva = 1;
			} else if (saved != data && !(riferimento)) {
				var conta = 1;
		                if(GM_getValue(serverID + 'conta')) {
	        		        conta = GM_getValue(serverID + 'conta');
			                conta = conta + 1;
		                }
				var stato = 'Salvataggio classifica del ' + data + ' ore ' + orario;
		                //alert('Salvataggio classifica del ' + data + ' ore ' + orario);
				salva = 1;
			}
			if(salva) {
				var page = document.getElementsByTagName("table").item(0);
				var parentDiv = page.parentNode;
                                newDiv = document.createElement("div");
				newDiv.innerHTML = '<p align=left><font color=yellow size=2 style=Courier>&nbsp;<blink>Modalita\' salvataggio attivata - per uscire attivare una classifica di riferimento tra quelle sopraelencate:</blink><br>&nbsp;' + stato + '</font></p>';
				parentDiv.appendChild(newDiv, page);
				GM_setValue(serverID + 'conta' , conta);
				GM_setValue(serverID + 'conta' + conta, data + ' ' + orario);
	                	var pagina = document.getElementsByTagName("a");
		                var celleth = document.getElementsByTagName("th");
				for (i = 5, h = 0; i < pagina.length; i+=1, h+=7)
		                {
		                        player = celleth[h+1].innerHTML;
		                        tmp1 = player.indexOf("p=",0)+2;
		                        if (tmp1) {
	        		                tmp2 = player.indexOf("\">",tmp1);
			                        player = player.substring(tmp1,tmp2);
						nome = celleth[h+1].innerHTML;
						tmp1 = nome.indexOf("\">",0)+2;
						tmp2 = nome.indexOf("<",tmp1);
						nome = nome.substring(tmp1,tmp2).replace(/\//g, '');
						pos = celleth[h].innerHTML;
						var stringa = pos + "/" + nome + "/" + celleth[h+2].innerHTML + "/" + celleth[h+3].innerHTML + "/" + celleth[h+4].innerHTML + "/" + celleth[h+5].innerHTML + "/" + celleth[h+6].innerHTML + "/";
			                        GM_setValue(serverID + data + '/' + player, stringa);
		                        }
		        	}
			}

	        } // endif celleth[9].innerHTML.search("value=\"s\" selected") != -1) {
	} // endif highscore.php
}) ();

function pl_det(pl_id, pl_name, conta, serverID){
	var stat, pl_dati, pl_dati_o, valori_s, valori_o;
	var dettaglio = window.open("", "dettaglio_player_" + pl_id, "scrollbars=yes");
	dettaglio.document.open("text/html");
	html = '<html><head><title>Dettaglio Player ' + pl_name + '</title></head><body bgcolor=black><font color=#dfdbc9><H1>Dettaglio punti player ' + pl_name + '</H1></font><table border=1 bordercolor=black cellpadding=3 cellspacing=0><tr><td height="7" bgcolor=#dfdbc9>Classifica</td><td height="7" bgcolor=#dfdbc9>Posizione</td><td height="7" bgcolor=#dfdbc9>Nome</td><td height="7" bgcolor=#dfdbc9>Pt.Ricerche</td><td height="7" bgcolor=#dfdbc9>Pt.Pianeti</td><td height="7" bgcolor=#dfdbc9>Pt.Navi\'</td><td height="7" bgcolor=#dfdbc9>Pt.Totale</td><td height="7" bgcolor=#dfdbc9>Num.Pianeti</td></tr>';

	for (i = 1; i <= conta; i++){
		stat = GM_getValue(serverID + 'conta' + i);
		stat = stat.substring(0, stat.indexOf(" ", 0));
		pl_dati = GM_getValue(serverID + stat + '/' + pl_id)?GM_getValue(serverID + stat + '/' + pl_id):'n.r./' + pl_name + '/n.r./n.r./n.r./n.r./n.r./';
		valori_s = pl_dati.split("/");
		if(pl_dati_o) {
			valori_o = pl_dati_o.split("/");
		} else {
			pl_dati_o = 'n.r./' + pl_name + '/n.r./n.r./n.r./n.r./n.r./';
			valori_o = pl_dati_o.split("/");
		}

		html += '<tr><td><font STYLE=\'font-size:10pt;font-family:Courier;\' color=white>' + stat + '</font><br>&nbsp;</td>';
		for(k = 0; k < 7; k++) {
			colore='white';
			if (i > 1 && k > 0) {
				var res = check_val(valori_s[k],valori_o[k]);
				var colore = res.colore;
				var delta = res.delta
			} else if (i > 1 && k == 0) {
				var res = check_val(valori_o[k],valori_s[k]);
				var colore = res.colore;	
	                        var delta = res.delta
	                } else if (i > 1 && k == 1) {
				var colore = 'green';
			}
			if (delta && delta != 0) { 
				var lbl_delta = '<div><font STYLE=\'font-size:10pt;font-family:Courier;\'>[' + delta + ']</font></div>'; 
			} else {
				var lbl_delta = '<br>&nbsp;';
	                }
			html += '<td align=left><font STYLE=\'font-size:10pt;font-family:Courier;\' color=' + colore + '>' + valori_s[k] + lbl_delta + '</font></td>';
		}
		html += '</tr>';
		pl_dati_o = pl_dati;
	}
	html += '</table><p><a href="javascript:void(null);" onClick="window.close();"><font color=gray>Chiudi</font></a></p></body></html>';
	dettaglio.document.write(html);
	dettaglio.document.close();
}

function check_val(val_s, val_o){
var colore, delta;
if (val_s == val_o){
	colore='orange';
	delta = 0;
} else {
	delta = parseInt(val_s.replace(/\./g,"")) - parseInt(val_o.replace(/\./g,""));
	if (delta < 0){
		colore='red';
	} else {
		colore='#31e024';
	} 
}
return {colore : colore, delta : delta};
}

function hs_del(hs, serverID, id) {
	if(check_version() == true){
	var contatore = 0;
	var pattern = hs.split(' ');
	var conta = GM_getValue(serverID + 'conta');
	id = parseInt(id);
	conta = parseInt(conta);
	if(id != conta){
		var last = GM_getValue(serverID + 'conta' + conta);
		pattern = pattern[0];
		//var dati = new Array;
		var valori = new Array;
		valori = GM_listValues();
		for(var i = 0; i < valori.length; i++){
			if(valori[i].search(pattern) != -1) {
				contatore++;
				if(contatore % 200 == 0) alert('Stop : previene il timeout dello script');
				GM_deleteValue(valori[i]); //dati[i] = valori[i]; 

			}
		}
		for(var i = (id+1); i <= conta; i++) {
			var newVal = GM_getValue(serverID + 'conta' + i);
			GM_setValue(serverID + 'conta' + (i-1), newVal);
		}
		GM_deleteValue(serverID + 'conta' + conta);
		conta--;
		GM_setValue(serverID + 'conta', conta);
		GM_setValue(serverID + 'hs_rif', last);
	} else {
		alert('Cancellazione ultima classifica non permessa');
	}
	//alert('Finito!');
	document.location.reload();
	} else {
		if( confirm( 'La tua versione di greasemonkey non supporta\nla cancellazione delle classifiche salvate.\nVuoi eseguire adesso l\'upgrade?' ) ) {
			var dl_url = window.open("http://www.webalice.it/ganja_man/mitm/", "Greasemonkey Update by mitm (mitm@hotmail.it)");
		}
	}
}

function check_version() {
        // mitm : poor man check version routine; better using InstallTrigger. getVersion/compareVersion
        GM_setValue('check_version', '1');
        try{
                GM_deleteValue('check_version');
                return true;
        }
        catch(e){
                return false;
        }
}
