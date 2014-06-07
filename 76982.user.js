// ==UserScript==
// @name           GLB Roster CSV
// @namespace      GLB
// @author  	   DDCUnderground
// @description    Builds HTML with CSV for Roster with stats
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require        http://userscripts.org/scripts/source/74204.user.js
// ==/UserScript==
// 
// 
// 
// 


$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};
	
	function getElementsByClassName(classname, par){
		
		var a=[];  
	   var re = new RegExp('\\b' + classname + '\\b'); 
	   var els = par.getElementsByTagName("*");
	   for(var m=0,j=els.length; m<j; m++){      
		  if(re.test(els[m].className)){
			 a.push(els[m]);
		  }
	   }
	   return a;
	};
	function getElementsByClassNameMulti(classname, classname1, par){
		
		var a=[];  
	   var re = new RegExp('\\b' + classname + '\\b'); 
	   var re1 = new RegExp('\\b' + classname1 + '\\b'); 
	   var els = par.getElementsByTagName("*");
	   for(var m=0,j=els.length; m<j; m++){      
		  if(re.test(els[m].className) || re1.test(els[m].className)){
			 a.push(els[m]);
		  }
	   }
	   return a;
	};
	function getElementsByClassNameWC(classname, par){
		
		var a=[];  
	   var re = new RegExp(classname); 
	   var els = par.getElementsByTagName("*");
	   for(var m=0,j=els.length; m<j; m++){      
		  if(re.test(els[m].className)){
			 a.push(els[m]);
		  }
	   }
	   return a;
	};
	
	var playerinfo = new Array();
	var newwindow ='';
	var totalcount = $('tr[class="alternating_color1"], tr[class="alternating_color2"]').length;
	// name (big_head subhead_head)
	
	function makePrint(){
		
		newwindow=window.open('',"DDC Roster CSV", "width=600,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!newwindow.opener) newwindow.opener = self;
		newwindow.document.writeln('<b>Name,Level/Eff Lvl,Position,Height,Weight,Str,Spe,Agi,Jmp,Sta,Vis,Con,Blk,Tak,Thr,Cat,Car,Kck,Pun,SA,VA</b><br>');
		$('#DDCCSVBut').attr('value','Working...');
		$('#DDCCSVBut').attr('disabled',true);
		newwindow.resizeTo(10,10);
		newwindow.blur();
		var finaldoc = '';
		$('tr[class="alternating_color1"], tr[class="alternating_color2"]').each(function(z){
			getIndPlayer('http://goallineblitz.com' + $('a[href*="/game/player.pl?player_id="]:first',$(this)).attr('href'));
		})
		
		
	}
	function getIndPlayer(linkstr){
		$.ajax({
				 //async: false,
				 type: 'GET',
				 url: linkstr,
			     success: function(returned_data) {
						// name
						var nameclass = $('div[class*="big_head"]:first', returned_data).html();
	
						if (nameclass.indexOf('<li style="font-weight:700;">') != -1) {
							playerinfo[0] = nameclass.substring(nameclass.indexOf(':5px;">')+7,nameclass.indexOf('</span>'));
						}else{
							playerinfo[0] = nameclass;
						}
						// level 
						playerinfo[1] = $('td[class="current_stats_value"]:first', returned_data).text();
						// position 
						playerinfo[2] = $('div[class*="position"]:first', returned_data).text();
						// height 
						playerinfo[3] = $('td[class="vital_data"]:first', returned_data).text();
						// weight
						playerinfo[4] = $('td[class="vital_data"]:eq(1)', returned_data).text();
						if (returned_data.indexOf('Money:')!=-1) {
							// money 
					
							var moneyclass = $('td[class="player_money"]:first', returned_data).text();
							moneysplit = moneyclass.split('$');
							playerinfo[5] = '$' + moneysplit[1].substring(0,moneysplit[1].indexOf(' '));
							// salary (class="player_money" substring end
							playerinfo[6] = '$' + moneysplit[2].substring(0,moneysplit[2].indexOf(' '));
					
							// skill points (class="player_points_value" td split [1]
							var spendpoints = $('tr[class="player_points_value"]:first', returned_data).html();
							var spendsplit = spendpoints.split('<td>');
							// training points
							playerinfo[7] = spendsplit[2].substring(0,spendsplit[2].indexOf('</td>'));
							// bonus points
							playerinfo[8] = spendsplit[3].substring(0,spendsplit[3].indexOf('</td>'));
							// shopping tokens
							playerinfo[9] = spendsplit[4].substring(0,spendsplit[4].indexOf('</td>'));
					
							playerinfo[10] = spendsplit[5].substring(0,spendsplit[5].indexOf('</td>'));
							// xp (class="player_level_progress" substring
							if (returned_data.indexOf('Next Level:')>-1) {
								var xpclass = $('td[class="player_level_progress"]', returned_data).html();
								var spansplit = xpclass.split('</span>');
						
								playerinfo[11] = spansplit[1].substring(0, spansplit[1].indexOf('/'));
								
							}else{
								playerinfo[11] = "N/A";
							}
							// vet points 
							if (returned_data.indexOf('Vet Pts:') > -1) {
								playerinfo[12] = $('a[href*="/game/vet_skills.pl?player_id="]', returned_data).text();
							}else{
								playerinfo[12] = 0;
							}
						}else{
							playerinfo[5] = -1;
							playerinfo[6] = -1;
							playerinfo[7] = -1;
							playerinfo[8] = -1;
							playerinfo[9] = -1;
							playerinfo[10] = -1;
							playerinfo[11] = -1;
							playerinfo[12] = -1;
						}
						
						var skills = $('div[class*="stat_value_tall"]:eq(0)', returned_data).text();
						// strength (class="stat_value_tall***_boosted" [0]
						playerinfo[13] = $('div[class*="stat_value_tall"]:eq(0)', returned_data).text();
						// blocking (class="stat_value_tall***_boosted" [1]
						playerinfo[14] = $('div[class*="stat_value_tall"]:eq(1)', returned_data).text();
						// speed (class="stat_value_tall***_boosted" [2]
						playerinfo[15] = $('div[class*="stat_value_tall"]:eq(2)', returned_data).text();
						// tackling (class="stat_value_tall***_boosted" [3]
						playerinfo[16] = $('div[class*="stat_value_tall"]:eq(3)', returned_data).text();
						// agility (class="stat_value_tall***_boosted" [4]
						playerinfo[17] = $('div[class*="stat_value_tall"]:eq(4)', returned_data).text();
						// throwing (class="stat_value_tall***_boosted" [5]
						playerinfo[18] = $('div[class*="stat_value_tall"]:eq(5)', returned_data).text();
						// jumping (class="stat_value_tall***_boosted" [6]
						playerinfo[19] = $('div[class*="stat_value_tall"]:eq(6)', returned_data).text();
						// catching (class="stat_value_tall***_boosted" [7]
						playerinfo[20] = $('div[class*="stat_value_tall"]:eq(7)', returned_data).text();
						// stamina (class="stat_value_tall***_boosted" [8]
						playerinfo[21] = $('div[class*="stat_value_tall"]:eq(8)', returned_data).text();
						// carrying (class="stat_value_tall***_boosted" [9]
						playerinfo[22] = $('div[class*="stat_value_tall"]:eq(9)', returned_data).text();
						// vision (class="stat_value_tall***_boosted" [10]
						playerinfo[23] = $('div[class*="stat_value_tall"]:eq(10)', returned_data).text();
						// kicking (class="stat_value_tall***_boosted" [11]
						playerinfo[24] = $('div[class*="stat_value_tall"]:eq(11)', returned_data).text();
						// confidence (class="stat_value_tall***_boosted" [12]
						playerinfo[25] = $('div[class*="stat_value_tall"]:eq(12)', returned_data).text();
						// punting (class="stat_value_tall***_boosted" [13]
						playerinfo[26] = $('div[class*="stat_value_tall"]:eq(13)', returned_data).text();
					
					
						// sa  (<div id="skill_trees_content">    class="skill_button" onmouseover substring <span class=\'skill_name\'>   div class="skill_level boosted_skill_level"
						var fullskilltrees = $('#skill_trees_content', returned_data).html();
						var satree = $.makeArray($('.skill_button',$('#skill_trees_content', returned_data)));
						var insertnum = 27;
						var skillname = '';
						var skillvalue = 0;
					
						var skillheadlist = $.makeArray($('.subhead', $('#skill_trees_content', returned_data)));
						//alert(skillheadlist.length);
						var skillheads = new Array;
						var tempskillhold = '';
					
						for (var skillloop = 0; skillloop<skillheadlist.length;skillloop++) {
							skillheads[skillloop] = new Array;
							skillheads[skillloop][0] = skillheadlist[skillloop].innerHTML.substring(skillheadlist[skillloop].innerHTML.indexOf('">') + 2, skillheadlist[skillloop].innerHTML.indexOf('</span'));
							tempskillhold = fullskilltrees.substring(fullskilltrees.indexOf(skillheadlist[skillloop].innerHTML), fullskilltrees.indexOf('<div style="clear: both;', fullskilltrees.indexOf(skillheadlist[skillloop].innerHTML)));
							tempskillcount = tempskillhold.split('<div class="skill_button"');
							if (skillloop>0) {
								skillheads[skillloop][1] = skillheads[skillloop-1][1] + tempskillcount.length -1;
							}else{
								skillheads[skillloop][1] = tempskillcount.length -1;
							}
					
						}
						for (var q=0;q<satree.length;q++) {
							skillnamehold = satree[q].getAttribute("onmouseover");
							skillname = skillnamehold.substring(skillnamehold.indexOf("'>", skillnamehold.indexOf('span class='))+2,skillnamehold.indexOf('</span'));
							skillvalue = $('div[class*="skill_level"]', satree[q]);
							playerinfo[insertnum] = skillname.substring(0, 5) + ':' + skillvalue[0].innerHTML;
							insertnum++;
						}
						var vastart = insertnum;
						// va  (<div id="vet_skills_content">   class="skill_button" <span class=\'skill_name\' substring> <div class="skill_level"
					
						if (returned_data.indexOf('vet_skills_content')!= -1) {
						
							var vatree = $.makeArray($('.skill_button', $('#vet_skills_content', returned_data)));
							var vaskillname = '';
							var vaskillvalue = 0;
							for (var q=0;q<vatree.length;q++) {
								vaskillnamehold = vatree[q].getAttribute("onmouseover");
								vaskillname = vaskillnamehold.substring(vaskillnamehold.indexOf("'>", vaskillnamehold.indexOf('span class='))+2,vaskillnamehold.indexOf('</span'));
								vaskillvalue = $('div[class*="skill_level"]', vatree[q]);
								playerinfo[insertnum] = vaskillname.substring(0, 5) + ':' + vaskillvalue[0].innerHTML;
								insertnum++;
							}
						}
					
						var dochtml = playerinfo[0]+ ',' + playerinfo[1] + ',' + playerinfo[2] +',';
						dochtml+= playerinfo[3] + ',' + playerinfo[4] + ',';
						if(playerinfo[8] != -1){
							//dochtml+= '<i><u>Experience, Skill and Cash</u></i><br>';
							//dochtml+= 'Cash:' + playerinfo[5] + ', ' + playerinfo[6] + '/day<br>';
							//dochtml+= 'TP:' + playerinfo[8] + ', BT:' + playerinfo[9] + ', ST:' + playerinfo[10] + ', XP: ' + playerinfo[11] + '<br>';
							//dochtml+= '<br>';
							//dochtml+= '<i><u>Attributes</u></i>(' + playerinfo[7] +' SP)<br>';
						}else{
							//dochtml+= '<i><u>Attributes</u></i><br>';
						}
						dochtml+= '' + playerinfo[13] +',' + playerinfo[15] +',' + playerinfo[17] +',' + playerinfo[19] +',' + playerinfo[21] +',' + playerinfo[23] +',' + playerinfo[25] +',';
						dochtml+= '' + playerinfo[14] +',' + playerinfo[16] +',' + playerinfo[18] +',' + playerinfo[20] +',' + playerinfo[22] +',' + playerinfo[24] +',' + playerinfo[26] +',';
//						dochtml+= '<i><u>Special Abilities</u></i><br>';
						dochtml+= '<i>' + skillheads[0][0] + '</i> ';
						var skillcount = 0;
						for (var ts=27;ts < vastart;ts++) {
							if (ts-27 == skillheads[skillcount][1]) {
								skillcount++;
								dochtml = dochtml.substring(0, dochtml.length -1);
								dochtml+= '<i>' + skillheads[skillcount][0] + '</i> ';
							}
							dochtml+= ' '+playerinfo[ts] + ',';
						}
						dochtml = dochtml.substring(0, dochtml.length-1);
						if(returned_data.indexOf('vet_skills_content')!= -1) {
							if(playerinfo[8] != -1) {
								//dochtml+= '<br><br><i><u>Veterans Abilities</u></i> (' + + playerinfo[12] +' VP)<br>';
							}else{
							
								//dochtml+= '<br><br><i><u>Veterans Abilities</u></i><br>';
							}
							for(var valooping = vastart;valooping<playerinfo.length;valooping++) {
								dochtml+= ' '+playerinfo[valooping]+',';
							}
							dochtml = dochtml.substring(0, dochtml.length -1);
						}
						newwindow.document.writeln(dochtml);
						newwindow.document.writeln('<br>');
						totalcount = totalcount -1;
						if (totalcount ==0) {
							$('#DDCCSVBut').attr('value','CSV Format');
							$('#DDCCSVBut').attr('disabled',false);
							newwindow.resizeTo(600,640);
							newwindow.focus();
						}
				 }
			})
		
	}
	
	var linkitems = buildobj('input', 'type', 'button','id','DDCCSVBut', 'value','CSV Format');
	var linebreak = buildobj('br');
	$('div[class="medium_head"]:first').append(linebreak);
	$('div[class="medium_head"]:first').append(linkitems);
	$('#DDCCSVBut').bind('click', makePrint, false);


})
