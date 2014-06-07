 // ==UserScript==
 // @name           KOC Power Bot
-// @version 20110521b
+// @version 20110522a
 // @namespace      blank
 // @homepage       
 // @include        http://*.kingdomsofcamelot.com/*main_src.php*
@@ -10,7 +10,7 @@
 // ==/UserScript==
 
 
 // These switches are for testing, all should be set to false for released version:
 var DEBUG_TRACE = true;
@@ -25,8 +25,9 @@
 
 var MAP_DELAY = 400;
 
-var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
-var SWF_PLAYER_URL = 'http://koc.god-like.info/alarmplayer.swf';
+var DEFAULT_ALERT_SOUND_URL = 'http://media.freesound.org/data/25/previews/25032__sirplus__extreme_alarm_preview.mp3';
+//var SWF_PLAYER_URL = 'http://www.fileden.com/files/2011/2/25/3086757/matSimpleSound01aXD.swf';
+var SWF_PLAYER_URL = 'http://www.saylortribe.com/KOC/matSimpleSound01aXD.swf';
 
 var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
 var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
@@ -184,6 +185,7 @@
   pbWideScreen : true,
 };
 
+
 var AttackOptions = {
   LastReport    		: 0,
   MsgEnabled          	: true,
@@ -191,7 +193,7 @@
   Method			    : "distance",
   SendInterval			: 1,
   MaxDistance           : 80,
- RallyClip : 0,
+ RallyClip :0,
   Running       		: false,
   BarbsFailedKnight		: 0,
   BarbsFailedRP 		: 0,
@@ -199,15 +201,18 @@
   BarbsFailedVaria		: 0,
   BarbsTried    		: 0,
   DeleteMsg             :true,
+ DeleteMsgs0 : true,
   Foodstatus			: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
   MsgLevel			    : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
   BarbsDone     		: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
   BarbNumber    		: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
   Levels    			: {1:{1:true,2:true,3:true,4:false,5:false,6:false,7:false,8:true,9:true,10:false},2:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
   Troops    			: {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},
+ MinDistance : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},
   Distance              : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750}	
 };
 
+
 var Cities = {};
 var Seed = unsafeWindow.seed;
 var Tabs = {};
@@ -483,7 +488,8 @@
         105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" },
         106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" },
         107: { 'country': "BELGIUM", 'provider': "mobistar" },
- 108: { 'country': "GERMANY", 'provider': "1und1" }
+ 108: { 'country': "GERMANY", 'provider': "1und1" },
+ 109: { 'country': "UNITED STATES", 'provider': "MyCricket" }
     },
 
   init: function(div){
@@ -509,7 +515,7 @@
     m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Stop Sound Alert"></center></div><DIV id=pbSwfPlayer></div>';
     m += '<BR><DIV class=pbStat>CONFIGURATION</div><TABLE class=pbTab>\
     <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
- <td align=left>Text message incoming attack to: <INPUT id=pbnum1 type=text size=3 maxlength=3 value="'+ Options.celltext.num1 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
+ <td align=left>Text message incoming attack to: <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'" '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
 &nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
 &nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold">(Please note that standard text messaging charges may apply)</span></td></tr><tr><td></td>\
     <TD align=left>Country: <select id="pbfrmcountry">';
@@ -3350,13 +3356,14 @@
 
 
 /*********************************  Barbing Tab ***********************************/
+
+
 Tabs.Barb = {
   tabOrder : 1,
   myDiv : null,
   MapAjax : new CMapAjax(),
   popFirst : true,
   opt : {},
- nextattack : null,
   searchRunning : false,
   tilesSearched : 0,
   tilesFound : 0,
@@ -3370,16 +3377,16 @@
   knt:{},
   barbArray:{},
   lookup:1,
- city:0,
+ init:0,
   foodstart:{},
- deleting:false,
   
     
   init : function (div){
     var t = Tabs.Barb;
     t.myDiv = div;
     saveAttackOptions();
- t.getnextCity();
+ setInterval(t.barbing,(1500));
+ setInterval(t.startdeletereports,(120000));
     
     var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED BARBING FUNCTION</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
 	 if (AttackOptions.Running == false) {
@@ -3389,6 +3396,7 @@
 	       m += '<TD><INPUT id=AttSearch type=submit value="Barb = ON"></td>';
 	       updatebotbutton("BOT (AA)");
 	   }
+
 	  m += '<TD><INPUT id=troopselect type=submit value="Select troops"></td>';
 	  m += '<TD><INPUT id=Options type=submit value="Options"></td>';
 	  m += '</tr></table></div>';
@@ -3397,7 +3405,7 @@
 	
 	  m += '<TABLE id=pbbarbstats width=95% height=0% class=pbTab><TR align="left"><TR>';
 	  for(i=0;i<Seed.cities.length;i++){
- m += '<TD>' + Seed.cities[i][1] +'</td>';
+ m += '<TD>' + Seed.cities[i][1] +'<DIV><span id=ptcity></span></div></td>';
 	  }
 	  m+='</tr><TR>';
 	  for(i=0;i<Seed.cities.length;i++){
@@ -3415,7 +3423,7 @@
      m += '<DIV id=pbTraderDivD class=pbStat>BARBING OPTIONS</div>';
      m += '<TABLE width=95% height=0% class=ptTab><TR align="left">';
      for(i=0;i<Seed.cities.length;i++){
- m += '<TR><TD>' + Seed.cities[i][1] +'</td>';
+ m += '<TR><TD>' + Seed.cities[i][1] +'<DIV><span id=ptcity></span></div></td>';
 		for (w=1;w<=10;w++){
 			m += '<TD class=pblevelopt><INPUT id=pbcity'+i+'level'+w+' type=checkbox unchecked=true>Lvl:'+w+'</td>';
 		}		
@@ -3424,6 +3432,7 @@
     
      t.myDiv.innerHTML = m;
      t.checkBarbData();
+ t.init=0;
      for(i=0;i<Seed.cities.length;i++){
     		var element = 'pddatacity'+i;
     		if (t.barbArray[i+1] == undefined) document.getElementById(element).innerHTML = 'No Data';
@@ -3461,29 +3470,18 @@
    
   troopOptions: function(){
   	 var t = Tabs.Barb;
- var troopDef = [
- ['STroop', 1],
- ['Wagon', 9],
- ['Archers', 6],
- ['Cavalry', 7],
- ['Heavies', 8],
- ['Ballista', 10],
- ['Cats', 12],
- ];
- if(t.troopselect == null)
- t.troopselect = new CPopup ('pbtroopselect', 0, 0, 600, 345, true, function(){t.saveTroops();});
+ t.troopselect = null;
+ t.troopselect = new CPopup ('pbtroopselect', 0,0, 700,380, true, function(){t.saveTroops();});
   	 t.troopselect.centerMe (mainPop.getMainDiv());  
- var z= '<DIV id=pbTraderDivD class=pbStat>TROOP SELECTION</div><TABLE width=100%><TR>';
- z+='<TD></td>';
- for(var i=0; i<troopDef.length; i++)
- z+='<TD>'+troopDef[i][0]+'</td>';
- z+='<TD>MAX dist</td>';
+ var z= '<DIV id=pbTraderDivD class=pbStat>TROOP SELECTION</div><TABLE width=100%>';
+ z+='<TD></td><TD>Sup.Troops</td><TD>Wagons</td><TD>Archers</td><TD>Cavalry</td><TD>HC</td><TD>Ballista</td><TD>Catapults</td><TD>Distance</td>'
 	 for(i=0;i<10;i++){
- z += '<TR><TD>Level '+(i+1)+': </td>';
- for(var j=0; j<troopDef.length; j++){
- z += '<TD><INPUT id="level'+i+'troop'+j+'" type=text size=4 maxlength=6 value="'+AttackOptions.Troops[i+1][j+1]+'" /></td>';
+ z += '<TR><TD>Level ' +(i+1)+ ': '+'<DIV><span id=pbStat></span></div></td>';
+ for (w=0;w<7;w++){
+ z += '<TD><INPUT id=level'+i+'troop'+w+' type=text size=6 maxlength=6 value="'+AttackOptions.Troops[i+1][w+1]+'"</td>';
 	 	}
- z+='<TD align=right><INPUT id=dist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.Distance[i+1]+'"</td>';
+ z+='<TD align=left><INPUT id=Mindist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.MinDistance[i+1]+'"</td>';
+ z+='<TD align=right><INPUT id=Maxdist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.Distance[i+1]+'"</td>';
 	 	z+='</tr>';		 		
 	 }
 	 z+='</table>';
@@ -3494,18 +3492,19 @@
   barbOptions: function(){
   	 var t = Tabs.Barb;
   	 if(t.barboptions == null)	
- t.barboptions = new CPopup ('pbbarboptions', 0,0, 375,320, true);
+ t.barboptions = new CPopup ('pbbarboptions', 0,0, 375,350, true);
   	 t.barboptions.centerMe (mainPop.getMainDiv());  
 	 t.barboptions.getTopDiv().innerHTML = '<CENTER><b> Barbing Options for server '+getServerId()+'</b></CENTER>';
   	var y = '<DIV style="max-height:400px; overflow-y:auto;"><DIV class=pbStat>RESET BARBS</div><TABLE width=100%>';
 	 y +='<TR><TD style="margin-top:5px; text-align:center;"><INPUT id=pbresetbarbs type=submit value="Reset barbs"></td></tr></table>';
 	 y +='<DIV class=pbStat> OPTIONS </div><TABLE>';
- y +='<TR><TD>Attack interval: <INPUT id=pbsendint type=text size=4 maxlength=4 value='+ AttackOptions.SendInterval +' \> seconds</td></tr>';
+ //y +='<TR><TD>Attack interval: <INPUT id=pbsendint type=text size=4 maxlength=4 value='+ AttackOptions.SendInterval +' \> seconds</td></tr>';
      y +='<TR><TD>Max search distance: <INPUT id=pbmaxdist type=text size=4 maxlength=4 value='+ AttackOptions.MaxDistance +' \></td></tr>';
      y +='<TR><TD>Keep <INPUT id=rallyclip type=text size=1 maxlength=2 value="'+AttackOptions.RallyClip+'" \> rallypoint slot(s) free</td></tr>';
      y +='<TR><TD><INPUT id=pbreport type=checkbox '+(AttackOptions.MsgEnabled?'CHECKED':'')+'\> Send barb report msg every<INPUT id=pbmsgint type=text size=2 maxlength=2 value='+AttackOptions.MsgInterval+' \>hour(s)</td></tr>';
      y +='<TR><TD>Method : '+htmlSelector({distance:'Closest first', level:'Highest level first', lowlevel:'Lowest level first'}, AttackOptions.Method, 'id=pbmethod')+'</td></tr>';
- y +='<TR><TD><INPUT id=deletetoggle type=checkbox '+(AttackOptions.DeleteMsg?'CHECKED':'')+' /> Auto delete barb and transport reports</td></tr>';
+ y +='<TR><TD><INPUT id=deletetoggle type=checkbox '+(AttackOptions.DeleteMsg?'CHECKED':'')+' /> Auto delete barb/transport reports from you</td></tr>';
+ y +='<TR><TD><INPUT id=deletes0toggle type=checkbox '+(AttackOptions.DeleteMsgs0?'CHECKED':'')+' /> Auto delete transport reports to you</td></tr>';
      y +='<TR><TD>Select barbreport levels to delete: <BR>';
 	 y +='<TABLE><TR>';
      for (w=1;w<=10;w++){
@@ -3529,10 +3528,10 @@
 		AttackOptions.MsgInterval=parseInt(document.getElementById('pbmsgint').value);
 		saveAttackOptions();
 	},false);
- document.getElementById('pbsendint').addEventListener('change', function(){
- AttackOptions.SendInterval=parseInt(document.getElementById('pbsendint').value);
- saveAttackOptions();
- },false);
+ // document.getElementById('pbsendint').addEventListener('change', function(){
+ // AttackOptions.SendInterval=parseInt(document.getElementById('pbsendint').value);
+ // saveAttackOptions();
+ // },false);
     document.getElementById('pbmaxdist').addEventListener('change', function(){
 		if(parseInt(document.getElementById('pbmaxdist').value) > 75)
 			document.getElementById('pbmaxdist').value = 75;
@@ -3543,8 +3542,12 @@
 		AttackOptions.DeleteMsg=document.getElementById('deletetoggle').checked;
 		saveAttackOptions();
 	},false);
+ document.getElementById('deletes0toggle').addEventListener('change', function(){
+ AttackOptions.DeleteMsgs0=document.getElementById('deletes0toggle').checked;
+ saveAttackOptions();
+ },false);
     document.getElementById('rallyclip').addEventListener('change', function(){
- AttackOptions.RallyClip=document.getElementById('rallyclip').value;
+ AttackOptions.RallyClip=parseInt(document.getElementById('rallyclip').value);
 		saveAttackOptions();
 	},false);
     var lvl = document.getElementsByClassName('msglvl')
@@ -3562,11 +3565,10 @@
   saveTroops: function(){
     for(i=0;i<10;i++){
   	 	for (w=0;w<7;w++){
- AttackOptions.Troops[i+1][w+1] = parseIntNan(document.getElementById('level'+i+'troop'+w).value);
+ AttackOptions.Troops[i+1][w+1] = document.getElementById('level'+i+'troop'+w).value;
   	 	}
- if(parseIntNan(document.getElementById('dist'+i).value) > AttackOptions.MaxDistance)
- document.getElementById('dist'+i).value = AttackOptions.MaxDistance;
- AttackOptions.Distance[i+1] = parseIntNan(document.getElementById('dist'+i).value);
+ AttackOptions.MinDistance[i+1] = document.getElementById('Mindist'+i).value;
+ AttackOptions.Distance[i+1] = document.getElementById('Maxdist'+i).value;
 	 }
 	 saveAttackOptions();
   },
@@ -3580,6 +3582,7 @@
   
   startdeletereports : function (){
 	var t = Tabs.Barb;
+ if (!AttackOptions.DeleteMsg && !AttackOptions.DeleteMsgs0) return;
 	if(!t.deleting){
 		t.deleting = true;
 		t.fetchbarbreports(0, t.checkbarbreports);
@@ -3610,32 +3613,38 @@
 	}
 	var reports = rslt.arReports;
 	var totalPages = rslt.totalPages;
- var deletes = new Array();
+ var deletes1 = new Array();
+ var deletes0 = new Array();
 		for(k in reports){
+ if(AttackOptions.DeleteMsg){
 			if(reports[k].marchType==4 && reports[k].side0PlayerId==0 && AttackOptions.MsgLevel[reports[k].side0TileLevel])
- deletes.push(k.substr(2));
+ deletes1.push(k.substr(2));
 			else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
- deletes.push(k.substr(2));
+ deletes1.push(k.substr(2));
+ } else if (AttackOptions.DeleteMsgs0){
+ if(reports[k].marchType==1 && !t.isMyself(reports[k].side1PlayerId))
+ deletes0.push(k.substr(2));
+ }
 		}
- if(deletes.length > 0){
- t.deletereports(deletes);
+ if(deletes1.length > 0 || deletes0.length > 0){
+ t.deletereports(deletes1, deletes0);
 		} else {
 			t.deleting = false;
 			return;
 		}
   },
- deletereports : function (deletes){
+
+ deletereports : function (deletes1, deletes0){
 	var t = Tabs.Barb;
- var msgs = deletes.join(",");
 	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
- params.s1rids = msgs;
- params.s0rids = '';
+ params.s1rids = deletes1.join(",");
+ params.s0rids = deletes0.join(",");
 	params.cityrids = '';
 	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
 		method: "post",
 		parameters: params,
 		onSuccess: function (rslt) {
- Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes.length);
+ Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes1.length) - parseInt(deletes0.length);
 			t.fetchbarbreports(0, t.checkbarbreports);
 		},
 		onFailure: function () {
@@ -3652,13 +3661,13 @@
 	return false;
   },
 
+
   checkBarbData: function(){
   	var t = Tabs.Barb;
- if (!AttackOptions.Running) return;
 	  for (i=1;i<=Seed.cities.length;i++){
- t.barbArray[i] = [];
+ t.barbArray[i] = 0;
 	  	var myarray = (GM_getValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId()));
-
+ t.barbArray[i] = (GM_getValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId()));
 		if (myarray == undefined && t.searchRunning==false) {
 	  		t.lookup=i;
 	  		t.opt.startX=parseInt(Seed.cities[(i-1)][2]);
@@ -3666,7 +3675,7 @@
 	  		t.clickedSearch();
 	  	}
 		if (myarray != undefined){
- myarray = JSON2.parse(myarray);
+ myarray = JSON2.parse(GM_getValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId()));
 			if(AttackOptions.Method == 'distance') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
 			if(AttackOptions.Method == 'level') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a > b ? -1 : 1);});
 			if(AttackOptions.Method == 'lowlevel') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
@@ -3675,29 +3684,40 @@
 	  	}
   },
   
+
+
   toggleBarbState: function(obj){
 	var t = Tabs.Barb;
 	if (AttackOptions.Running == true) {
 		AttackOptions.Running = false;
 		obj.value = "Barb = OFF";
+
 		updatebotbutton("BOT");
 		saveAttackOptions();
- t.nextattack = null;
- t.init(t.myDiv);
- } else {
+ }
+ else {
 		AttackOptions.Running = true;
 		obj.value = "Barb = ON";
 		updatebotbutton("BOT");
 		saveAttackOptions();
- t.checkBarbData();
- t.getnextCity();
 	}
   },
   
   barbing : function(){
   	   var t = Tabs.Barb;
- t.nextattack = null;
- var city = t.city;
+ if (AttackOptions.Running == false) return;
+ if (t.searchRunning == true) return;
+ if (t.init ==0) city=1;
+ if (city>Seed.cities.length) city=1;
+
+ if (AttackOptions.Levels[city][1] == false && AttackOptions.Levels[city][2] == false && AttackOptions.Levels[city][3] == false && AttackOptions.Levels[city][4] == false && AttackOptions.Levels[city][5] == false && AttackOptions.Levels[city][6] == false && AttackOptions.Levels[city][7] == false && AttackOptions.Levels[city][8] == false && AttackOptions.Levels[city][9] == false && AttackOptions.Levels[city][10] == false ){
+ if (city<=Seed.cities.length) {
+ city++;
+ t.init=1;
+ }
+ if (city>Seed.cities.length) city=1;
+ return;
+ }
 
        var now = new Date().getTime()/1000.0;
        now = now.toFixed(0);
@@ -3718,13 +3738,17 @@
        cityID = 'city' + citynumber; 
        
        t.getAtkKnight(cityID);
- if (t.knt.toSource() == "[]") {t.getnextCity(); return;}
+ if (t.knt.toSource() == "[]") {city++; return;}
        var kid = t.knt[0].ID;
        
        AttackOptions.BarbNumber[city]=0;
        var check=0;
        
        while (check == 0){
+ if (city>Seed.cities.length) {
+ city=1;
+ }
+
          for (h=1;h<=10;h++){
             if ( AttackOptions.Levels[city][h] == true && (parseInt(t.barbArray[city][AttackOptions.BarbNumber[city]]['level'])) == h ) check=1; 
          }
@@ -3737,26 +3761,30 @@
          var u8 = AttackOptions.Troops[barblevel][5];
          var u10 = AttackOptions.Troops[barblevel][6];
          var u12 = AttackOptions.Troops[barblevel][7];
- if (t.barbArray[city][AttackOptions.BarbNumber[city]]['dist'] > AttackOptions.Distance[barblevel]) check=0;
+ if (t.barbArray[city][AttackOptions.BarbNumber[city]]['dist'] < AttackOptions.MinDistance[barblevel] || t.barbArray[city][AttackOptions.BarbNumber[city]]['dist'] > AttackOptions.Distance[barblevel]) check=0;
                            
          if (u1 > parseInt(Seed.units[cityID]['unt1']) || u9 > parseInt(Seed.units[cityID]['unt9']) || u6 > parseInt(Seed.units[cityID]['unt6']) || u7 > parseInt(Seed.units[cityID]['unt7']) || u8 > parseInt(Seed.units[cityID]['unt8']) || u10 > parseInt(Seed.units[cityID]['unt10']) || u12 > parseInt(Seed.units[cityID]['unt12'])) check=0;
           
          if (AttackOptions.Troops[barblevel][1] == 0 && AttackOptions.Troops[barblevel][2] == 0 && AttackOptions.Troops[barblevel][3] == 0 && AttackOptions.Troops[barblevel][4] == 0 && AttackOptions.Troops[barblevel][5] == 0 && AttackOptions.Troops[barblevel][6] == 0 && AttackOptions.Troops[barblevel][7] == 0) check=0;
          if (check ==0) AttackOptions.BarbNumber[city]++;
          if (AttackOptions.BarbNumber[city]>=t.barbArray[city].length) {
- break;
+ city++;
+ if (city > Seed.cities.length) city=1;
+ return;
          }
+
        }
- if(check == 0){t.getnextCity(); return;}
 	   
        var xcoord = t.barbArray[city][AttackOptions.BarbNumber[city]]['x'];
        var ycoord = t.barbArray[city][AttackOptions.BarbNumber[city]]['y'];
        
- var slots=0;
- if(Seed.queue_atkp[cityID].length > 0)
- slots = Seed.queue_atkp[cityID].length;
+ slots=0;
+ for (z in Seed.queue_atkp[cityID]){
+ slots++;
+ }
+ if (Seed.queue_atkp[cityID].toSource() == "[]") slots=0;
        t.getRallypointLevel(cityID);
- if ((t.rallypointlevel-AttackOptions.RallyClip) <= slots){t.getnextCity(); return;}
+ if ((t.rallypointlevel-AttackOptions.RallyClip) <= slots){city++; return;}
        
        if ((t.rallypointlevel - AttackOptions.RallyClip) > slots) t.doBarb(citynumber,city,AttackOptions.BarbNumber[city],xcoord,ycoord,kid,u1,u9,u6,u7,u8,u10,u12);
        var element1 = 'pddatacity'+(city-1);
@@ -3764,36 +3792,13 @@
        var element2 = 'pddataarray'+(city-1); 
        document.getElementById(element2).innerHTML =  '(' + AttackOptions.BarbNumber[city] + '/' + t.barbArray[city].length +')';
        saveAttackOptions();
- t.getnextCity();
- },
-
- getnextCity: function(){
- var t = Tabs.Barb;
- if (!AttackOptions.Running) return;
- if (t.searchRunning){
- t.nextattack = setTimeout(t.getnextCity,(AttackOptions.SendInterval*100));
- return;
+ if (city<=Seed.cities.length) {
+ city++;
+ t.init=1;
 	}
- var city = t.city+1;
 	if (city>Seed.cities.length){
 		city=1;
- t.startdeletereports();
- }
- var found = false;
- for(var i=1; i<=10; i++){
- if(AttackOptions.Levels[city][i]){
- found = true;
- break;
- }
- }
- if(!found){
- t.city = city;
- t.getnextCity();
- return;
 	}
- t.city = city;
- t.nextattack = setTimeout(t.barbing,(AttackOptions.SendInterval*100));
- return;
   },
   
   getRallypointLevel: function(cityId){
@@ -3846,6 +3851,7 @@
   		         onSuccess: function (transport) {
   		         var rslt = eval("(" + transport.responseText + ")");
   		         if (rslt.ok) {
+ //unsafeWindow.Modal.hideModalAll();
   		         var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
   		         var ut = unsafeWindow.unixtime();
   		         var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
@@ -3867,7 +3873,7 @@
   		         GM_setValue('Barbs_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.barbArray[counter]));
   		         saveAttackOptions();
                } else {
- if (rslt.error_code != 8 && rslt.error_code != 213 && rslt.error_code == 210) AttackOptions.BarbsFailedVaria++;
+ if (rslt.error_code != 8 && rslt.error_code != 213 && rslt.error_code != 210) AttackOptions.BarbsFailedVaria++;
   		         if (rslt.error_code == 213)AttackOptions.BarbsFailedKnight++;
   		         if (rslt.error_code == 210) AttackOptions.BarbsFailedRP++;
   		         if (rslt.error_code == 8) AttackOptions.BarbsFailedTraffic++;
@@ -3903,7 +3909,7 @@
     message += 'Knight errors: ' + AttackOptions.BarbsFailedKnight +'%0A';
     message += 'Other errors: ' + AttackOptions.BarbsFailedVaria +'%0A';
     message += 'Extra check: ' + (AttackOptions.BarbsTried - number - AttackOptions.BarbsFailedTraffic - AttackOptions.BarbsFailedRP - AttackOptions.BarbsFailedKnight -  AttackOptions.BarbsFailedVaria) +'%0A';
- message += '%0A'+'%0A' + 'Food Gain (for 1 hour of baring)' +'%0A';
+ message += '%0A'+'%0A' + 'Food Gain (for '+AttackOptions.MsgInterval+' hour(s) of baring)' +'%0A';
     for (q=1;q<=Seed.cities.length;q++){
     	var cityID = 'city' + Seed.cities[q-1][0];
     	var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - AttackOptions.Foodstatus[q];
@@ -3952,6 +3958,8 @@
     setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
   },
   
+
+
   mapCallback : function (left, top, width, rslt){
     var t = Tabs.Barb;
     if (!t.searchRunning)
@@ -4006,21 +4014,13 @@
     setTimeout (function(){t.MapAjax.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
   },
   
- stopSearch : function (msg){
- var t = Tabs.Barb;
- var element = 'pddatacity'+(t.lookup-1);
- document.getElementById(element).innerHTML = msg;
- t.searchRunning = false;
- },
-
   hide : function (){
-
   },
 
   show : function (){
-
   },
 
+
 }; 
 
 
@@ -4759,6 +4759,7 @@
 		params.r4 = carry_Ore;
 		params.gold = carry_Gold;
 		params.u9 = wagons_needed;	
+ //params.u7= 5000;
 		
    		if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
                  
@@ -4770,6 +4771,7 @@
                   var rslt = eval("(" + transport.responseText + ")");
                   if (rslt.ok) {
                   actionLog('Trade   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Wagons: " + wagons_needed);
+ //unsafeWindow.Modal.hideModalAll();
                   var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                   var ut = unsafeWindow.unixtime();
                   var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
@@ -4936,6 +4938,7 @@
       }, false);
       
       document.getElementById('pbReassignState').addEventListener('click', function(){
+ //t.doReassign(0);
       	t.toggleReassignState(this);
       }, false);
       document.getElementById('pbSaveRouteReassign').addEventListener('click', function(){
@@ -5436,6 +5439,7 @@
                   var rslt = eval("(" + transport.responseText + ")");
                   if (rslt.ok) {
                   actionLog('Reassign   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Troops: " + totalsend);
+ //unsafeWindow.Modal.hideModalAll();
                   var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                   var ut = unsafeWindow.unixtime();
                   var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
@@ -6192,6 +6196,7 @@
                   onSuccess: function (transport) {
                   var rslt = eval("(" + transport.responseText + ")");
                   if (rslt.ok) {
+ unsafeWindow.Modal.hideModalAll();
                   var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                   var ut = unsafeWindow.unixtime();
                   var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
@@ -7105,6 +7110,7 @@
         Options[k] = opts[k];
     }
   }
+ if (Options.alertSound.soundUrl == 'http://www.falli.org/app/download/3780510256/fliegeralarmsire.mp3?t=1263916531') {Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL; saveOptions () }
 }
 
 function readGlobalOptions (){
@@ -7126,8 +7132,10 @@
   }
 }
 
+
 function createButton (label,id){
   var a=document.createElement('a');
+
   a.className='button20';
   a.id = id;
   a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
@@ -8631,13 +8639,11 @@
       if (page == null)
         notify ({ajaxErr:'COMM Error - page 1'});
       progress ('1');
- var m = /window.location.replace\(\"(.*?)\"/im.exec (page);
- if (m == null)
- m = /ngoURI\(\'(.*?)\'/im.exec (page);
+ var m = /ngoURI\(\'(.*?)\'/im.exec (page);
       if (m == null)
         notify ({ajaxErr:'PARSE Error - page 1'});
       var url = m[1].replace ('\\/', '/', 'g');
- url = url.replace ('\\\\x26', '&', 'g');
+ var url = url.replace ('\\\\x26', '&', 'g');
       GM_AjaxGet (url, '', got2, 'Page 2');        
     }
     
@@ -8955,6 +8961,7 @@
     doneMoving();
   }
   
+
   function mouseDown(me){
     var e = self.slider;
     self.divLeft = 0;