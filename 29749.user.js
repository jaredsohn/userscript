// ==UserScript==
// @name Ogame SpyCargoPlusConverter v0.2 new 10x speed uni www.game.danubis.net
// @author Karamba.
// @description: Inserting cargo no. forom spy repotr
// @include      http://*/game/index.php?page=messages*
// ==/UserScript==


	
	var spycargo_resource = "";
	var spycargo_metal = 0;
	var spycargo_crist = 0;
	var spycargo_deute = 0;
	var spycargo_tot_res = 0;
	var spycargo_stiva = 0;
	var spycargo_temp_num = 0;
	var spycargo_temp_met = 0;
	var spycargo_CP_num = 0;
	var spycargo_CL_num = 0;
	var spycargo_nome = new Array('Lille Transporter', 'Stor Transporter', 'Lille Jæger' , 'Stor Jæger', 'Krydser', 'Slagskib', 'Koloniskib', 'Recycler', 'Spionagesonde', 'Bomber', 'Solarsatellit', 'Destroyer'  , 'Dødsstjerne'      , 'Interceptor');
	var spycargo_detr = new Array('600 600'              , '1800 1800'     , '900 300'  , '1800 1200', '6000 2100', '13500 4500', '3000 6000', '3000 1800'  , '0 300'    , '15000 7500' , '0 600'  , '18000 15000', '1500000 1200000'  , '9000 12000'   );
	var spycargo_recy_met = 0;
	var spycargo_recy_cri = 0;
	var spycargo_spionaggio = 0;
	var spycargoremtr;
	
	var spycargo_tr = document.getElementsByTagName('tr'); 
	for (i = 9; i < spycargo_tr.length; i++) { 
		// --- Cerchiamo riga per riga se troviamo spy report ---
		if (spycargo_tr[i].getElementsByTagName('th')[3] && spycargo_tr[i].getElementsByTagName('th')[3].getElementsByTagName('span')[0]) {
			if (spycargo_tr[i].getElementsByTagName('span')[0].className == 'espionagereport'){
				// --- Dividiamo per celle ---
				spycargo_td = spycargo_tr[i + 3].getElementsByTagName('td');
				spycargo_metal = Number(spycargo_td[1].innerHTML.replace(/\./g ,"").replace(/\<(.*?)\>/g ,""));
				spycargo_crist = Number(spycargo_td[3].innerHTML.replace(/\./g ,"").replace(/\<(.*?)\>/g ,""));
				spycargo_td = spycargo_tr[i + 4].getElementsByTagName('td');
				spycargo_deute = Number(spycargo_td[1].innerHTML.replace(/\./g ,"").replace(/\<(.*?)\>/g ,""));
				spycargo_tot_res = spycargo_metal + spycargo_crist + spycargo_deute;
				spycargo_metal = Math.round(spycargo_metal / 2);
				spycargo_crist = Math.round(spycargo_crist / 2);
				spycargo_deute = Math.round(spycargo_deute / 2);
				
				if (spycargo_metal <= (spycargo_crist + spycargo_deute)){
					spycargo_CP_num = Math.floor((spycargo_metal + spycargo_crist + spycargo_deute + 24999) / 25000);
					spycargo_CL_num = Math.floor((spycargo_metal + spycargo_crist + spycargo_deute + 4999) / 5000);
				}else{
					spycargo_CP_num = Math.floor(((spycargo_crist + spycargo_deute) * 3) / 50000);
					spycargo_temp_met = spycargo_metal - Math.floor(spycargo_CP_num * (25000 / 3));
					spycargo_temp_met -= Math.min(16667 - Math.floor((spycargo_crist + spycargo_deute - (spycargo_CP_num * (50000 / 3))) / 2), Math.floor(50000 / 3));
					spycargo_CP_num += Math.floor((spycargo_temp_met + 33333) / (50000 / 3));
	
					spycargo_CL_num = Math.floor(((spycargo_crist + spycargo_deute) * 3) / 10000);
					spycargo_temp_met = spycargo_metal - Math.floor(spycargo_CL_num * (5000 / 3));
					spycargo_temp_met -= Math.min(3333 - Math.floor(spycargo_crist + spycargo_deute - (spycargo_CL_num * (10000 / 3))), Math.floor(10000 / 3));
					spycargo_CL_num += Math.floor((spycargo_temp_met + 6666) / (10000 / 3));
				}
				
				spycargo_resource = spycargo_tr[i + 1].innerHTML;
				for (j = 0; j < 14; j++) { 
					spycargo_resource = spycargo_resource.replace(spycargo_nome[j], spycargo_detr[j]);
				}
				var spycargo_td = spycargo_resource.replace(/<.*?td.*?>/g ,"<td>").split(/<td>/g); 
				spycargo_temp_num = "";
				spycargo_spionaggio = 1;
				for (j = 5; j < spycargo_td.length ; j++) { 
					if (spycargo_td[j].search("Fleets") != -1) {
						spycargo_temp_num = (j + 2) + "a";
						spycargo_spionaggio = 2;
					}
					if (spycargo_td[j].search("Defense") != -1) {
						spycargo_temp_num += j;
						spycargo_spionaggio = 3;
					}
					if (spycargo_td[j].search("Buildings") != -1) spycargo_spionaggio = 5;
					if (spycargo_td[j].search("Research") != -1) spycargo_spionaggio = 7;
					if (spycargo_td[j].search("counter-espionage") != -1) {
						if (spycargo_temp_num.split("a")[1] == "") spycargo_temp_num += j;
						j = spycargo_td.length;
					}
				}
				spycargo_recy_met = 0;
				spycargo_recy_cri = 0;
				if (spycargo_temp_num.search("a") != -1) {
					for (j = Number(spycargo_temp_num.split("a")[0]); j < Number(spycargo_temp_num.split("a")[1]) ; j += 4) { 
						spycargo_recy_met += Number(spycargo_td[j].replace(/<.*?>/g ,"").split(" ")[0]) * Number(spycargo_td[j + 2].replace(/\<(.*?)\>/g ,"").replace(/\./g ,""));
						spycargo_recy_cri += Number(spycargo_td[j].replace(/<.*?>/g ,"").split(" ")[1]) * Number(spycargo_td[j + 2].replace(/\<(.*?)\>/g ,"").replace(/\./g ,""));
					}
				}
				var Nodo = document.getElementsByTagName('tr')[i + 3].parentNode.parentNode.parentNode;
				//Nodo.innerHTML = Nodo.innerHTML.replace('</center>', ' &nbsp; <input name="Submit_v" type="button" onClick="spyreport(this.parentNode.parentNode.innerHTML); document.getElementById('+ "'select_forum').focus(); document.getElementById('spy_tr').style.visibility = 'visible'" + '" value="Converti"></center>');
				
				spycargo_resource = '<br><table width="400"><tbody><tr><td class="c" colspan="4">Maximum Resourcer</td></tr><tr><td>Resourcer ialt:</td><td>' + spycargo_adddot(spycargo_tot_res) + '</td><td>Raid:</td><td>' + spycargo_adddot(spycargo_metal + spycargo_crist + spycargo_deute) + '</td></tr><tr><td>Stor Transporter:</td><td>' + spycargo_adddot(spycargo_CP_num) + '</td><td>Lille Transporter:</td><td>' + spycargo_adddot(spycargo_CL_num) + '</td></tr>';
				if ((spycargo_recy_met + spycargo_recy_cri) > 0) spycargo_resource += '<tr><td class="c" colspan="4">Ruinmark</td></tr><tr><td>Metal:</td><td>' + spycargo_adddot(spycargo_recy_met) + '</td><td>Krystal:</td><td>' + spycargo_adddot(spycargo_recy_cri) + '</td></tr><tr><td>Total:</td><td>' + spycargo_adddot(spycargo_recy_met + spycargo_recy_cri) + '</td><td>Recyclere:</td><td>' + spycargo_adddot(Math.floor((spycargo_recy_met + spycargo_recy_cri + 19999)/20000)) + '</td></tr>';
				if (spycargo_spionaggio > 1 && spycargo_spionaggio < 7) spycargo_resource += '<tr><td class="c" colspan="4">Spionagesonde behov</td></tr><tr><td>Spionagesonder brugt:</td><td><input type="text" id="spycargo' + i + '" onKeyUp="if (this.value != ' + "''" + ') document.getElementById(' + "'spycargo_sond" + i + "'" + ').innerHTML = Math.max(7 + ( ((Number(this.value) - ' + spycargo_spionaggio + ' + 0.1) / Math.abs(Number(this.value) - ' + spycargo_spionaggio + ' + 0.1)) * Math.pow(Math.ceil(Math.sqrt(Math.abs(Number(this.value) - ' + spycargo_spionaggio + '))), 2)), 1)' + '" size="3" maxlength="2" style="text-align:center"></td><td>Spionagesonde behov:</td><td id="spycargo_sond' + i + '>&nbsp;</td></tr>';
				spycargo_resource += '</tbody></table>';
				
				Nodo.innerHTML += spycargo_resource;
			}
		}
	}
	
	/*spycargo_resource = '<tr><td class="c" colspan="2"><a href="javascript:document.getElementById(' + "'spy_tr').style.visibility = 'visible'; document.getElementById('select_forum').focus()" + '">Conversione Spy Report</a></td></tr><tr id="spy_tr" style="visibility:collapse"><th><textarea name="spy_code" cols="" rows="" readonly="readonly" id="spy_code" style="width:380px; height:150px; background-color:transparent; color:#FFFFFF"></textarea></th><th>' + "\n";
	spycargo_resource += 'Tag [QUOTE]&nbsp; <input name="spy_quote" type="checkbox" id="spy_quote" checked onClick="spyreport(' + "''" + ')"><br>Coordinate&nbsp;<input name="spy_coord" type="checkbox" id="spy_coord" checked onClick="spyreport(' + "''" + ')"><br>Flotta&nbsp;<input name="spy_fleet" type="checkbox" id="spy_fleet" checked onClick="spyreport(' + "''" + ')"><br>Difese&nbsp;<input name="spy_dife" type="checkbox" id="spy_dife" checked onClick="spyreport(' + "''" + ')"><br>Costruzioni&nbsp;<input name="spy_cost" type="checkbox" id="spy_cost" checked onClick="spyreport(' + "''" + ')"><br>Ricerche&nbsp;<input name="spy_rice" type="checkbox" id="spy_rice" checked onClick="spyreport(' + "''" + ')"><br>' + "\n";
	spycargo_resource += '<select name="select_forum" id="select_forum"  style="text-align:center" onChange="spyreport(' + "''" + ')"><option value="for_og_for">Ogame Forum</option><option value="for_fr_zon">Free Forum Zone</option><option value="for_fr_net">Free Forum Net</option><option value="for_html">HTML</option></select></th></tr>';
	var spycargo_table = document.createElement('table');
	spycargo_table.setAttribute("width","519");
	spycargo_table.setAttribute("align","center");
	
	spycargo_table.innerHTML = spycargo_resource;
	
	document.getElementById('content').getElementsByTagName('table')[0].appendChild(spycargo_table);
	
	var spycargo_script = document.createElement('script');
	spycargo_script.setAttribute("type","text/javascript");
	spycargo_script.setAttribute("src", "http://xoomer.alice.it/zibibbo84_home_page/SpyCargoConverter.js");
	document.getElementsByTagName("head")[0].appendChild(spycargo_script);*/
		
	function spycargo_adddot(spycargo_numnotdott){
	spycargo_numnotdott = String(spycargo_numnotdott);
	var spycargo_pointer;
		for(spycargo_pointer = 3; spycargo_pointer < spycargo_numnotdott.length; spycargo_pointer += 4){
			spycargo_numnotdott = spycargo_numnotdott.substr(0, spycargo_numnotdott.length - spycargo_pointer) + "." + spycargo_numnotdott.substr(spycargo_numnotdott.length - spycargo_pointer);
		}
	return spycargo_numnotdott;
	};