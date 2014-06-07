// ==UserScript==
// @name           nickchild's TFFO Revamp
// @namespace      N/A
// @description    Fixes/improvements for TFFO
// @include        http://tffo.telegraph.co.uk/team?event*
// @include        http://tffo.telegraph.co.uk/team/
// @include        http://tffo.telegraph.co.uk/current_team*
// @include        http://tffo.telegraph.co.uk/team_selections*
// @include        http://tffo.telegraph.co.uk/current_squad*
// ==/UserScript==

function oc(a) {
	var o = {};
	for(var p=0;p<a.length;p++) {
		o[a[p]]='';
	}
	return o;
}
function arr_diff(a1, a2) {
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

if (document.URL.indexOf("http://tffo.telegraph.co.uk/team_selections") == 0) {
	doc_tables=document.getElementsByTagName("table");
	flange_bg_colour="#EFEFEF";
	for(dt=0;dt<doc_tables.length;dt++) {
		if(doc_tables[dt].className=="data") {
			data_cells=doc_tables[dt].getElementsByTagName("td");
			for(dc=0;dc<data_cells.length;dc++) {
				if(data_cells[dc].className=="first event") {
					if(flange_bg_colour=="#EFEFEF") {
						flange_bg_colour="white";
					} else {
						flange_bg_colour="#EFEFEF";
					}
				}
				data_cells[dc].style.backgroundColor="transparent";
				data_cells[dc].style.border="0px solid white";
				data_cells[dc].parentNode.style.backgroundColor=flange_bg_colour;
			}
		}
	}
}

if (document.URL.indexOf("http://tffo.telegraph.co.uk/current_team") == 0 || document.URL.indexOf("http://tffo.telegraph.co.uk/current_squad") == 0) {
	eleven_price=0;
	subs_price=0;
	players_pitch_div=document.getElementById("player-pitch");
	pitch_values=players_pitch_div.getElementsByTagName("p");
	for(g=0;g<pitch_values.length;g++) {
		if(pitch_values[g].className=="p-value") {
			eleven_price+=parseFloat(pitch_values[g].innerHTML.split("£")[1].split("m")[0]);
		}
	}
	eleven_price=roundNumber(eleven_price,1);
	document.getElementById("off-top").innerHTML+="<div id='curr_val' style='left:5px; top:65px;'><p class='label'>Current Value</p><p class='value' id='curr_val_value' style='width:50px; left:140px; top:5px'>&pound;"+eleven_price+"m</p></div>";
}

if (document.URL.indexOf("http://tffo.telegraph.co.uk/team") == 0) {

	all_teams=new Array("ARS","AVL","BIR","BLR","BOL","BUR","CHE","EVE","FUL","HUL","LIV","MCY","MUN","POR","STO","SUN","TOT","WHM","WIG","WLV");
	flange_matches_table=document.getElementById("effect_events");
	flange_matches_cells=flange_matches_table.getElementsByTagName("td");
	flange_teams=new Array();
	times_arr=new Array();
	for(i=0;i<flange_matches_cells.length;i++) {
		val=flange_matches_cells[i].innerHTML;
		if(val=="Arsenal") {
			flange_teams.push("ARS");
		} else if(val=="Aston Villa") {
			flange_teams.push("AVL");
		} else if(val=="Birmingham City") {
			flange_teams.push("BIR");
		} else if(val=="Blackburn Rovers") {
			flange_teams.push("BLR");
		} else if(val=="Bolton Wanderers") {
			flange_teams.push("BOL");
		} else if(val=="Burnley") {
			flange_teams.push("BUR");
		} else if(val=="Chelsea") {
			flange_teams.push("CHE");
		} else if(val=="Everton") {
			flange_teams.push("EVE");
		} else if(val=="Fulham") {
			flange_teams.push("FUL");
		} else if(val=="Hull City") {
			flange_teams.push("HUL");
		} else if(val=="Liverpool") {
			flange_teams.push("LIV");
		} else if(val=="Manchester City") {
			flange_teams.push("MCY");
		} else if(val=="Manchester United") {
			flange_teams.push("MUN");
		} else if(val=="Portsmouth") {
			flange_teams.push("POR");
		} else if(val=="Stoke City") {
			flange_teams.push("STO");
		} else if(val=="Sunderland") {
			flange_teams.push("SUN");
		} else if(val=="Tottenham Hotspur") {
			flange_teams.push("TOT");
		} else if(val=="West Ham United") {
			flange_teams.push("WHM");
		} else if(val=="Wigan Athletic") {
			flange_teams.push("WIG");
		} else if(val=="Wolverhampton Wndrs") {
			flange_teams.push("WLV");
		} else if(val=="Wolverhampton Wanderers") {
			flange_teams.push("WLV");
		} else {
			val_arr=val.split(":");
			if(val_arr.length==2) {
				val_num=val_arr[0]+val_arr[1]
				times_arr.push(val_num);
			}
		}
	}
	times_arr.sort();
	earliest_time=times_arr[0];
	earliest_time_string=earliest_time[0]+earliest_time[1]+":"+earliest_time[2]+earliest_time[3];
	team_sel_div=document.getElementById("team-sel");
	team_sel_div_divs=team_sel_div.getElementsByTagName("div");
	for(d=0;d<team_sel_div_divs.length;d++) {
		if(team_sel_div_divs[d].className=="transfer_effect_date") {
			team_sel_div_divs[d].innerHTML+=" @ " + earliest_time_string;
		}
	}
	document.getElementById("team_name").style.width="144px";

	non_playing_teams=arr_diff(all_teams,flange_teams);

	player_lists_div=document.getElementById("player-lists");
	player_rows=player_lists_div.getElementsByTagName("tr");
	player_teams=new Array();

	orig_captain=document.getElementById("captain").value;

	for(i=0;i<player_rows.length;i++) {
		teams_cells=player_rows[i].getElementsByTagName("td");
		for(n=0;n<teams_cells.length;n++) {
			if(teams_cells[n].className=="team") {
				if(teams_cells[n].innerHTML in oc(flange_teams)) {
					teams_cells[n].parentNode.style.fontWeight="bold";
				} else if(teams_cells[n].innerHTML in oc(non_playing_teams)) {
					teams_cells[n].parentNode.style.color="gray";
				}
				player_teams.push(teams_cells[n].innerHTML);
			}
		}
		row_id=player_rows[i].id;
		player_id=row_id.split("-")[1];
		if(player_id == orig_captain) {
//			player_rows[i].style.color="red";
			teams_cells=player_rows[i].getElementsByTagName("td");
			for(n=0;n<teams_cells.length;n++) {
				if(teams_cells[n].className=="name") {
					teams_cells[n].innerHTML+=" (c)";
				}
			}
		}
	}
	
	page_imgs=team_sel_div.getElementsByTagName("img");
	for(l=0;l<page_imgs.length;l++) {
		if(page_imgs[l].className=="p-capt") {
			page_imgs[l].addEventListener('click', function(ev) {
				player_paras=this.parentNode.getElementsByTagName("p");
				for(pp=0;pp<player_paras.length;pp++) {
					if(player_paras[pp].className=="p-name") {
						new_captain=player_paras[pp].innerHTML.split(" (c)")[0];
					}
				}

				player_lists_div=document.getElementById("player-lists");
				player_rows=player_lists_div.getElementsByTagName("tr");
				for(i=0;i<player_rows.length;i++) {
					teams_cells=player_rows[i].getElementsByTagName("td");
					for(n=0;n<teams_cells.length;n++) {
						if(teams_cells[n].className=="name") {
							if(teams_cells[n].innerHTML.split(" (c)")[0] == new_captain) {
//								teams_cells[n].parentNode.style.color="red";
								teams_cells[n].innerHTML=teams_cells[n].innerHTML.split(" (c)")[0] + " (c)";
							} else {
								teams_cells[n].innerHTML=teams_cells[n].innerHTML.split(" (c)")[0];
/*
								if(teams_cells[n+4].innerHTML in oc(flange_teams)) {
									teams_cells[n+4].parentNode.style.fontWeight="bold";
									teams_cells[n+4].parentNode.style.color="black";
								} else if(teams_cells[n+4].innerHTML in oc(non_playing_teams)) {
									teams_cells[n+4].parentNode.style.fontWeight="normal";
									teams_cells[n+4].parentNode.style.color="gray";
								}
*/
							}
						}
					}
				}
				for (tn in unsafeWindow.aPlayers) {
					unsafeWindow.aPlayers[tn].name = unsafeWindow.aPlayers[tn].name.split(" (c)")[0];
				}
			}, true);
		}
	}
}