// ==UserScript==
// @name           KoC Power Bot It
// @version        20120775i
// @namespace      matteo7
// @homepage       http://userscripts.org/scripts/show/131152
// @homepage       http://userscripts.org/scripts/show/101052
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/kingdoms-of-camelot/play*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @description    Automated features for Kingdoms of Camelot
// ==/UserScript==


/*************************** Auto Craft Tab *************************************/
Tabs.AutoCraft = {
    tabOrder: 20, //CHECKTHIS ?
    tabLabel: "Auto Craft",
    myDiv: null,
    timer: null,
    craftIntervall  : TrainOptions.CraftIntervallMin,
    crafting: [],
    myDiv: null,
    timer: null,
    timerStat: null,
    numcity :-1,
    craftinfo : {},
    retrycount : 0,

    init: function(div){
        var t = Tabs.AutoCraft;
        t.myDiv = div;   
        t.crafting = {
                running: TrainOptions.CraftingRunning,
        };
        var m = '<DIV id=pbCraftingDiv class=pbStat>AUTO CRAFTING - SETTINGS</div><TABLE id=pbcraftingfunc width=100% height=0% class=pbTab><TR><TD width="10%">Intervall: <input type=text value="'+TrainOptions.CraftIntervallMin+'" size=2  maxlength=2 id=pbCraftIntervall> Minute(s)<span class=boldRed><sup>*Refresh Required</sup></span></td>';
        if (t.crafting.running == false) {
                m += '<TD  width="33%"><INPUT id=pbCraftRunning type=submit value="Crafting = OFF"></td>';
     }            else {
                m += '<TD width="33%"><INPUT id=pbCraftRunning type=submit value="Crafting = ON"></td>';
                t.timer=setInterval(t.Start,parseInt(t.craftIntervall*60000));
        }
        m += '<td width="17%"><input type=button value="Save Settings" id="Crafting_Save"></td></tr></table></div>';
        m += '<DIV id=pbCraftingList class=pbStat>AUTO CRAFTING - LIST</div><TABLE id=pbcraftingqueues width=100% height=0% class=pbTabLined><TR>';

        m += "<td colspan=2><center><b>Items</b></center></td><td><center><b>Inventar</b></center></td><td><b>Amount</b></td>"; 
        m += "<td colspan=2><center><b>Items</b></center></td><td><center><b>Inventar</b></center></td><td><b>Amount</b></td>"; 
        m += "</tr><tr>";
        var count = 0;
        for(var i=0; i < unsafeWindow.recipelist[1].length; i++){
            var h = parseInt(unsafeWindow.recipelist[1][i].output_item_id);
            t.craftinfo[h] = {};
            t.craftinfo[h].recipe_id = unsafeWindow.recipelist[1][i].recipe_id;
            t.craftinfo[h].category = unsafeWindow.recipelist[1][i].category;
            t.craftinfo[h].input = unsafeWindow.recipelist[1][i].input;
            t.craftinfo[h].requirements = unsafeWindow.recipelist[1][i].requirements;
            t.craftinfo[h].inputItems = unsafeWindow.recipelist[1][i].input.items;
            m += "<td ><center><img src='http://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+ h + ".jpg' width=25></center></td><td><center>"+unsafeWindow.itemlist["i"+h].name+"</center></td><td><center><span class=boldGreen>"+parseIntNan(Seed.items["i"+h])+"</span></center></td>";
            m += "<td><input type=text size=4 id='Craft_nb_"+h+"' value='"+ parseIntNan(TrainOptions.CraftingNb[h]) +"'></td>";
            if ((count+1)%2 == 0) m += "</tr><tr>";
            count++;
        }
        for(var i=0; i < unsafeWindow.recipelist[3].length; i++){
            var h = parseInt(unsafeWindow.recipelist[3][i].output_item_id);
            t.craftinfo[h] = {};
            t.craftinfo[h].recipe_id = unsafeWindow.recipelist[3][i].recipe_id;
            t.craftinfo[h].category = unsafeWindow.recipelist[3][i].category;
            t.craftinfo[h].input = unsafeWindow.recipelist[3][i].input;
            t.craftinfo[h].requirements = unsafeWindow.recipelist[3][i].requirements;
            t.craftinfo[h].inputItems = unsafeWindow.recipelist[3][i].input.items;
            m += "<td ><center><img src='http://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+ h + ".jpg' width=25></center></td><td><center>"+unsafeWindow.itemlist["i"+h].name+"</center></td><td><center><span class=boldGreen>"+parseIntNan(Seed.items["i"+h])+"</span></center></td>";
            m += "<td><input type=text size=4 id='Craft_nb_"+h+"' value='"+ parseIntNan(TrainOptions.CraftingNb[h]) +"'></td>";
            if ((count+1)%2 == 0) m += "</tr><tr>";
            count++;
        }
        
        m+="</table><b>Note:</b> If you complete more than one Item, the creation will be done randomly. <BR> <b>Important: Min. 50 000 Aethestones and Refresh to Update the Inventar!</b> ";
          m += '<DIV id=pbCraftingStats class=pbStat>AEHTERSTONES AND CRAFTING TIME</div><span id="CraftStat"></span>';

       t.myDiv.innerHTML = m;


       window.addEventListener('unload', t.onUnload, false);
       
    document.getElementById("Crafting_Save").addEventListener ('click', function (){t.saveCraftState()}, false);
    document.getElementById("pbCraftRunning").addEventListener ('click', function (){t.toggleStateRunning(this)}, false);     
    t.changeCraft ('pbCraftIntervall', 'CraftIntervallMin')
  }, 
      changeCraft : function (valueId, optionName, callOnChange){
    var t = Tabs.AutoCraft;
    var e = document.getElementById(valueId);
    e.value = TrainOptions[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      TrainOptions[optionName] = this.value;
      saveTrainOptions();
      if (callOnChange)
        callOnChange (this.value);
      }
    },
  updateStat: function() {
   var t = Tabs.AutoCraft;
   var rownum = 0;
   function _row (name, row, noTotal, typee){
         if (rownum++ % 2)
           style = '';
         else
           style = ' style = "background: #e8e8e8"';
         var tot = 0;
         var m = [];
         m.push ('<TR style="background: #fff" align=right');
         m.push (style);
         m.push ('><TD');
         m.push (style);
         m.push ('><B>');
         m.push (name);
         m.push ('</td>');
         if (noTotal){
           m.push ('<TD');
           m.push (style);
           m.push ('>&nbsp;</td>');
         } else {
           for (i=0; i<row.length; i++)
             tot += row[i];
           m.push ('<TD style="background: #ffc">');
            if (tot<0) {
             m.push ("<SPAN class=boldRed>"+addCommas(tot)+"</span>");
            } else {
             m.push (addCommas(tot));
            }
           //}
           m.push ('</td>');
         }
         for (i=0; i<row.length; i++){
           m.push ('<TD');
           m.push (style);
           m.push ('>');
           if (row[i]<50000) {
                    m.push ("<SPAN class=boldRed>"+addCommas(row[i])+"</span>");
       } else {
                    m.push (addCommas(row[i]));
           }
           m.push ('</td>');
         }
   
         m.push ('</tr>');
         return m.join('');
       }

   clearTimeout(t.timerStat);
   var str="<TABLE class=pbTabOverview cellpadding=0 cellspacing=0><TR  align=center><TD width=55 align=center></td><TD width=88 style='background: #ffc; font-size:150%' align=center><SPAN class=oohfancy>TOTAL</SPAN></td>";
   for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
         
            str += "<TD width=81><SPAN class=oohfancy>"+ Cities.cities[i].name.substring(0,10) +"</SPAN></td>";
          
   }
   rows = [];
   var now = unixTime();
   rows[0] = [];
   for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
        }
        for (r=1; r<6; r++){
          rows[r] = [];
          for(i=0; i<Cities.numCities; i++) {
            cityID = 'city'+ Cities.cities[i].id;
            if (r==5)
             rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0]);
            else
             rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
            
          }
         
      }
      str += _row ('<img height=18 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/aetherstone_30.png>', rows[5], false, 0);
      str +='<tr style="background: #e8e8e8" align=right><td><img height=20 src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/items/70/3.jpg title="Crafting"></b></td><td>&nbsp;</td>';
                for(i=0; i<Cities.numCities; i++) {
                 var totTime = 0;
                 if (Seed.queue_craft["city" + Cities.cities[i].id].length > 0) {
                  var q=Seed.queue_craft["city" + Cities.cities[i].id][0];
                  var totTime = 0;
                  totTime = q.craftingEtaUnixTime - now;
                  if (totTime < 0)
                    totTime = 0;
                  if (getCityBuilding(Cities.cities[i].id,20).count>0 && totTime == 0)
                    affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
                  else
                    affuichage = timestr(totTime);
                  
                  str +="<td><span onclick='Crafting("+Cities.cities[i].id+");'>"+ affuichage + "</span></td>";  
           
                 } else {
                 affuichage = timestr(totTime);
                 if (getCityBuilding(Cities.cities[i].id,20).count>0)
                    affuichage = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
                    
                 str +="<td><span onclick='Crafting("+Cities.cities[i].id+");'>"+affuichage+"</span></td>";
                 }
                }    
             str +="</tr>";    
             
         document.getElementById("CraftStat").innerHTML=str;
         t.timerStat = setTimeout(function() { t.updateStat(); }, 2000);
         
         
  },
  updateCraftnb : function() {
   var t = Tabs.AutoCraft;
   for(var h in t.craftinfo) {
        if (document.getElementById("Craft_nb_" +h)) document.getElementById("Craft_nb_"+h).value=parseInt(TrainOptions.CraftingNb[h]) ;
     }
  },
  saveCraftState : function() {
   var t = Tabs.AutoCraft;
   TrainOptions.CraftingRunning =  t.crafting.running;
   for(var h in t.craftinfo) {
        if (document.getElementById("Craft_nb_" +h)) TrainOptions.CraftingNb[h] = document.getElementById("Craft_nb_"+h).value;
     }
    saveTrainOptions();
  },
  toggleStateRunning: function(obj){
      var t = Tabs.AutoCraft;
      obj = document.getElementById('pbCraftRunning');
          if (t.crafting.running == true) {
              t.crafting.running = false;
              t.saveCraftState();
              if (obj) obj.value = "Crafting = OFF";
              clearInterval(t.timer);
          }
          else {
              t.crafting.running = true;
              t.saveCraftState();
              if (obj) obj.value  = "Crafting = ON";
              t.timer=setInterval(t.Start,parseInt(t.craftIntervall*60000));
              t.Start();
          }
          t.updateCraftnb();
    },
    Start: function() {
     var t = Tabs.AutoCraft;
     if(!TrainOptions.CraftingRunning) {
      clearInterval(t.timer);
      return;
     }
     if (t.numcity<Cities.numCities-1) {
           t.numcity++;
         } else {
          t.numcity=-1; 
          return;
     }
     var c=t.numcity;
     var cityId=Cities.cities[c].id;
     
     var ret=getCityBuilding(cityId,20).count;
     if (ret==0) {
       t.Start();
       return;
     }
     if (parseInt(Seed.resources["city" + cityId]['rec5'][0])<5000) {
       t.Start();
       return;
     }
     var tableau = [];
     for(var d in TrainOptions.CraftingNb) {
           if (parseInt(TrainOptions.CraftingNb[d])>0) {
			if(t.craftinfo[d].inputItems == "") {
				tableau.push (d);
			} else {
				for(var i in t.craftinfo[d].inputItems) {
					if(unsafeWindow.seed.items["i"+i] >= t.craftinfo[d].inputItems[i])
						tableau.push (d);
				}
			}
           }
     }
     var itemId = tableau[Math.floor(Math.random()*tableau.length)];
     var recipeId = t.craftinfo[itemId].recipe_id;
     var category = t.craftinfo[itemId].category;
     var i=Seed.queue_craft["city"+cityId];
     if(i.length>0) {
          var q=i[0];
           var totTime = 0;
           var now = unixTime();
          totTime = q.craftingEtaUnixTime - now;
          if (totTime > 0) {
			  t.Start();
           return;
          }
     } 
     t.CraftingItem(cityId,  itemId, recipeId, category);
    },
    CraftingItem: function (currentcity, itemId, recipeId, category) {
      var t = Tabs.AutoCraft;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.action="craft";
          params.ctrl="Crafting";
          params.cityId=currentcity;
          params.insurance=false;
           params.itemId=itemId;
           params.recipeId=recipeId;
           params.categoryId=category;
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, { method: "post", parameters: params,loading: true,
          onSuccess: function (transport) {
              var o=eval("("+transport.responseText+")");
              if(o.ok===true){
               if (o.status=="error") {
				if (o.errorCode == 2)
					t.numcity--;
				t.retrycount++;
				if(t.retrycount > 10)
					return;
                t.Start();
                return;
               } else if(o.status=="failure"){
                setTimeout(function() {
                 t.CraftingItem(currentcity,  itemId, recipeId);
                }, 5000);
                } else if (o.status=="success"){
					t.retrycount == 0;
                //actionLog ('<b>'+culang.auto+' '+culang.crafting+'</b>:  <span class=boldGreen>OK</span> #'+ (TrainOptions.CraftingNb[itemId] -1)+' ');
                 TrainOptions.CraftingNb[itemId] =  TrainOptions.CraftingNb[itemId] -1;
                 saveTrainOptions();
                 t.updateCraftnb();
               if(!Seed.queue_craft["city"+currentcity]) {
             Seed.queue_craft["city"+currentcity]=[];
            }
             var n={};
             n.recipeId=recipeId;
             n.craftingUnixTime=o.time.startTime;
             n.craftingEtaUnixTime=o.time.endTime;
             n.craftingId=o.craftingId;
             n.categoryId=null;
             n.recipeIndex=null;
             unsafeWindow.seed.queue_craft["city"+currentcity].push(n);
             t.Start();
               }
              }
            },
            onFailure: function () {  t.Start();  }
       });
 },

    show : function (){
        var t = Tabs.AutoCraft;
        clearTimeout(t.timerStat);
        t.updateStat();
    },
    hide: function(){
        var t = Tabs.AutoCraft;
        clearTimeout(t.timerStat);
      },
      onUnload: function(){
          var t = Tabs.AutoCraft;
           t.saveCraftState();
    },
};

 
  
 /*********************************  Barbing Tab - now the Dark Forest Tab ***********************************/
Tabs.Barb = {
  tabLabel: 'AutoDF',
  tabOrder : 125,
  myDiv : null,
  MapAjax : new CMapAjax(),
  popFirst : true,
  opt : {},
  nextattack : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,
  rallypointlevel:0,
  knt:{},
  barbArray:{},
  lookup:1,
  city:0,
  deleting:false,
  
    
  init : function (div){
    var t = Tabs.Barb;
    t.myDiv = div;
 
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED FOREST FUNCTION</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (AttackOptions.Running == false) {
           m += '<TD><INPUT id=AttSearch type=submit value="Attack = OFF"></td>';
           //updatebotbutton("BOT");
       } else {
           m += '<TD><INPUT id=AttSearch type=submit value="Attack = ON"></td>';
           //updatebotbutton("BOT (AA)");
       }
      m += '<TD><INPUT id=troopselect type=submit value="Select troops"></td>';
      m += '<TD><INPUT id=Options type=submit value="Options"></td>';
      m += '</tr></table></div>';
      
      m += '<DIV id=pbTraderDivD class=pbStat>FOREST STATS</div>';
    
      m += '<TABLE id=pbbarbstats width=95% height=0% class=pbTab><TR align="left"><TR>';
      for(i=0;i<Seed.cities.length;i++){
              m += '<TD>' + Seed.cities[i][1] +'</td>';
      }
      m+='</tr><TR>';
      for(i=0;i<Seed.cities.length;i++){
              m += '<TD><DIV><span id='+ 'pdtotalcity' + i +'></span></div></td>';
      }
      m+='</tr><TR>';
      for(i=0;i<Seed.cities.length;i++){
              m += '<TD><DIV><span id='+ 'pddatacity' + i +'></span></div></td>';
      }
      m+='</tr><TR>'
       for(i=0;i<Seed.cities.length;i++){
              m += '<TD><DIV><span id='+ 'pddataarray' + i +'></span></div></td>';
     }
     m+='</tr></table><TABLE id=pbbarbstats width=95% height=0% class=pbTab><TR align="left"><TR>';
     for (i=0;i<=6;i++) {
         m+='<TD><DIV><span id='+ 'pberror' + i +'></span></div></td>';
     }
     m+='</tr></table>';
     m += '<DIV id=pbTraderDivD class=pbStat>FOREST OPTIONS</div>';
     m += '<TABLE width=95% height=0% class=ptTab><TR align="left">';
     for(i=0;i<Seed.cities.length;i++){
        m += '<TR><TD>' + Seed.cities[i][1] +'</td>';
        for (w=1;w<=10;w++){
           m += '<TD class=pblevelopt><INPUT id=pbcity'+i+'level'+w+' type=checkbox unchecked=true>Lvl:'+w+'</td>';
        }
     }
    
     t.myDiv.innerHTML = m;

     saveAttackOptions();
     t.checkBarbData();

     for(i=0;i<Seed.cities.length;i++){
        var element = 'pdtotalcity'+i;
        if (t.barbArray[i+1] == undefined) document.getElementById(element).innerHTML = 'No Data';
        else document.getElementById(element).innerHTML =  'Forests:' + t.barbArray[i+1].length;
     }
    
    for(i=0;i<Seed.cities.length;i++){
        for (w=1;w<=10;w++){
            document.getElementById('pbcity'+i+'level'+w).checked = AttackOptions.Levels[i+1][w]; 
        }
    }
    
    document.getElementById('AttSearch').addEventListener('click', function(){t.toggleBarbState(this)} , false);
    document.getElementById('Options').addEventListener('click', t.barbOptions , false);
    document.getElementById('troopselect').addEventListener('click', t.troopOptions , false);
    var element_class = document.getElementsByClassName('pblevelopt');
    for (k=0;k<element_class.length;k++){
        element_class[k].addEventListener('click', t.saveLevelOptions , false);
    }
   },
  
  saveLevelOptions : function(){
        for(i=0;i<Seed.cities.length;i++){
            AttackOptions.Levels[i+1][0]=false;
            for (w=1;w<=10;w++){
                var ele = document.getElementById('pbcity'+i+'level'+w);
                AttackOptions.Levels[i+1][w]=ele.checked;
                if (ele.checked)                    
                    AttackOptions.Levels[i+1][0]=true;
            }        
        }
        saveAttackOptions();
   },
   
  troopOptions: function(){
       var t = Tabs.Barb;
     var troopDef = [
      ['Supply', 1],
      ['Miltia', 2],
      ['Scout', 3],
      ['Pikes', 4],
      ['Swords', 5],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Wagons', 9],
      ['Ballista', 10],
      ['Rams', 11],
      ['Cats', 12],
     ];
       if(t.troopselect == null)    
        t.troopselect = new pbPopup ('pbtroopselect', 0, 0, 850, 450, true, function(){t.saveTroops();});
       t.troopselect.centerMe (mainPop.getMainDiv());  
       var z= '<DIV id=pbTraderDivD class=pbStat>TROOP SELECTION</div><TABLE width=100%><TR>';
     z+='<TD></td>';
     for(var i=0; i<troopDef.length; i++)
        z+='<TD>'+troopDef[i][0]+'</td>';
     z+='<TD>MIN dist</td><TD>MAX dist</td>';
     for(i=0;i<10;i++){
         z += '<TR><TD>Level '+(i+1)+': </td>';
         for(var j=0; j<troopDef.length; j++){
             z += '<TD><INPUT id="level'+i+'troop'+j+'" type=text size=4 maxlength=6 value="'+AttackOptions.Troops[i+1][j+1]+'" /></td>';
         }
        z+='<TD align=left><INPUT id=Mindist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.MinDistance[i+1]+'"</td>';
         z+='<TD align=right><INPUT id=dist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.Distance[i+1]+'"</td>';
         z+='</tr>';                 
     }
     z+='</table>';
      t.troopselect.getMainDiv().innerHTML = z;
      t.troopselect.show(true);
  },
  
  barbOptions: function(){
       var t = Tabs.Barb;
       if(t.barboptions == null)    
        t.barboptions = new pbPopup ('pbbarboptions', 0,0, 375,350, true);
       t.barboptions.centerMe (mainPop.getMainDiv());  
     t.barboptions.getTopDiv().innerHTML = '<CENTER><b>Dark Forest Options for server '+getServerId()+'</b></CENTER>';
      var y = '<DIV style="max-height:400px; overflow-y:auto;"><DIV class=pbStat>RESET FORESTS</div><TABLE width=100%>';
       y +='<TR><TD style="margin-top:5px; text-align:center;"><INPUT id=pbresetbarbs type=submit value="Reset Forests"></td>';
       y +='<TD style="margin-top:5px; text-align:center;"><INPUT id=pbpaintbarbs type=submit value="Show forests"></td>';
       y += '<TD><SELECT id=pbcity type=list></td></tr></table>';
       y +='<table width=100%><TD colspan=2 style="margin-top:5px; text-align:center;"><DIV class=pbStat> OPTIONS </div></td>';
     y +='<TR><TD>Attack interval: </td><td><INPUT id=pbsendint type=text size=4 maxlength=3 value='+ AttackOptions.SendInterval +' \> seconds</td></tr>';
     y +='<TR><TD>Max search distance: </td><td><INPUT id=pbmaxdist type=text size=4 maxlength=3 value='+ AttackOptions.MaxDistance +' \></td></tr>';
     y +='<TR><TD>Keep rallypoint slot(s) free: </td><Td><INPUT id=rallyclip type=text size=3 maxlength=2 value="'+AttackOptions.RallyClip+'" \> </td></tr>';
     y +='<TR><TD><INPUT id=pbreport type=checkbox '+(AttackOptions.UpdateEnabled?'CHECKED':'')+'\> Reset search every </td><td><INPUT id=pbmsgint type=text size=3 maxlength=2 value='+AttackOptions.UpdateInterval+' \>minutes</td></tr>';
     y +='<TR><TD> Skip city after </td><td><INPUT id=barbstopsearch type=text size=3 value='+AttackOptions.stopsearch+' \> tries.</td></tr>';
     y +='<TR><TD>Method : </td><Td> '+htmlSelector({distance:'Closest first', level:'Highest level first', lowlevel:'Lowest level first'}, AttackOptions.Method, 'id=pbmethod')+'</td></tr>';
     y +='<TR><TD>Knight priority : </td><td>'+htmlSelector({0:'Lowest combat skill', 1:'Highest combat skill'}, AttackOptions.knightselector, 'id=barbknight')+'</td></tr>';
     y +='<tr><td>Minimum knight Combat level to send: </td><td><input id=barbMinKnight type=text size=3 value='+AttackOptions.barbMinKnight+' \></td></tr>';
     y +='<tr><td>Maximum knight Combat level to send: </td><td><input id=barbMaxKnight type=text size=3 value='+AttackOptions.barbMaxKnight+' \></td></tr>';
     y+='</table></td></tr></table>';
       t.barboptions.getMainDiv().innerHTML = y;
       t.barboptions.show(true);
    
    document.getElementById('pbcity').options.length=0;
    for (i=0;i<Seed.cities.length;i++){
        var o = document.createElement("option");
        o.text = Seed.cities[i][1]
        o.value = i+1;
        document.getElementById("pbcity").options.add(o);
    }
       
    document.getElementById('pbpaintbarbs').addEventListener('click', function(){
            t.showBarbs(document.getElementById("pbcity").value,Seed.cities[document.getElementById("pbcity").value -1][1]);
            
    },false);
    document.getElementById('pbresetbarbs').addEventListener('click', t.deletebarbs,false);
    document.getElementById('pbmethod').addEventListener('change', function(){
        AttackOptions.Method=document.getElementById('pbmethod').value;
        saveAttackOptions();
        t.checkBarbData();
    },false);
    document.getElementById('barbknight').addEventListener('change', function(){
        AttackOptions.knightselector=document.getElementById('barbknight').value;
        saveAttackOptions();
    },false);
    document.getElementById('pbreport').addEventListener('change', function(){
        AttackOptions.UpdateEnabled=document.getElementById('pbreport').checked;
        saveAttackOptions();
    },false);
    document.getElementById('pbmsgint').addEventListener('change', function(){
        AttackOptions.UpdateInterval=parseInt(document.getElementById('pbmsgint').value);
        saveAttackOptions();
    },false);
    document.getElementById('pbsendint').addEventListener('change', function(){
        if(parseInt(document.getElementById('pbsendint').value) <5) //Set minimum attack interval to 5 seconds
            document.getElementById('pbsendint').value = 5;
        AttackOptions.SendInterval=parseInt(document.getElementById('pbsendint').value);
        saveAttackOptions();
    },false);
    document.getElementById('pbmaxdist').addEventListener('change', function(){
        if(parseInt(document.getElementById('pbmaxdist').value) > 75)
            document.getElementById('pbmaxdist').value = 75;
        AttackOptions.MaxDistance=parseInt(document.getElementById('pbmaxdist').value);
        saveAttackOptions();
    },false);
    document.getElementById('rallyclip').addEventListener('change', function(){
        AttackOptions.RallyClip=parseInt(document.getElementById('rallyclip').value);
        saveAttackOptions();
    },false);
    
    document.getElementById('barbMinKnight').addEventListener('change', function(){
        AttackOptions.barbMinKnight=parseInt(document.getElementById('barbMinKnight').value);
        saveAttackOptions();
    },false);
    document.getElementById('barbMaxKnight').addEventListener('change', function(){
        AttackOptions.barbMaxKnight=parseInt(document.getElementById('barbMaxKnight').value);
        saveAttackOptions();
    },false);
    document.getElementById('barbstopsearch').addEventListener('change', function(){
        document.getElementById('barbstopsearch').value = parseInt(document.getElementById('barbstopsearch').value)>0?document.getElementById('barbstopsearch').value:1
        AttackOptions.stopsearch=parseInt(document.getElementById('barbstopsearch').value);
        saveAttackOptions();
    },false);    
  },
  
    showBarbs: function (citynumber,cityname) {
        var t = Tabs.Barb;
        var popTradeRoutes = null;
        t.popTradeRoutes = new pbPopup('pbShowBarbs', 0, 0, 500, 500, true, function() {clearTimeout (1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowBarbs" id="pbBars">';       
        t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Dark Forests for city: '+cityname+'</td>';
        t.paintBarbs(citynumber,cityname);
        t._addTabHeader(citynumber,cityname);
        t.popTradeRoutes.show(true)    ;
     },
      paintBarbs: function(i,cityname){
            var t = Tabs.Barb;
                for (k=(t.barbArray[i].length-1);k>=0;k--){t._addTab(i,cityname,k+1,t.barbArray[i][k]['x'], t.barbArray[i][k]['y'],t.barbArray[i][k]['dist'], t.barbArray[i][k]['level']);}
        },
      
  _addTab: function(citynumber,cityname,queueId,X,Y,dist,level){
     var t = Tabs.Barb;
     var row = document.getElementById('pbBars').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = queueId;
     row.insertCell(1).innerHTML = X;
     row.insertCell(2).innerHTML = Y;
     row.insertCell(3).innerHTML = dist;
     row.insertCell(4).innerHTML = level;
     row.insertCell(5).innerHTML = '<a class="button20" id="barbdel_' + queueId + '"><span>Delete</span></a>';
     document.getElementById('barbdel_' + queueId).addEventListener('click', function(){
        t.deleteBarbElement(citynumber,queueId,cityname, true);
     }, false);
  },
     
  _addTabHeader: function(citynumber,cityname) {
     var t = Tabs.Barb;
     var row = document.getElementById('pbBars').insertRow(0);
     row.vAlign = 'top';
     row.insertCell(0).innerHTML = "City";
     row.insertCell(1).innerHTML = "X";
     row.insertCell(2).innerHTML = "Y";
     row.insertCell(3).innerHTML = "Dist.";
     row.insertCell(4).innerHTML = "Level";
     row.insertCell(5).innerHTML = '<a class="button20" id="barbdelAll"><span>Delete ALL</span></a>';
     document.getElementById('barbdelAll').addEventListener('click', function(){
        t.deleteBarbsCity(citynumber,cityname);
     }, false);
  },   
       
  deleteBarbElement: function(citynumber,queueId,cityname,showFlag){
      var t = Tabs.Barb;
      var queueId = parseInt(queueId);
      var myarray = t.barbArray[citynumber];
      if (myarray) {
        myarray.splice((queueId-1), 1);
        GM_setValue('DF_' + Seed.player['name'] + '_city_' + citynumber + '_' + getServerId(), JSON2.stringify(myarray));
        t.checkBarbData();
        if (showFlag) t.showBarbs(citynumber,cityname);
      }
      else 
      {
          //logit("not found");
      }
  },
      
  deleteBarbsCity: function(citynumber,cityname){
      var t = Tabs.Barb;
      var queueId = parseInt(queueId);
      AttackOptions.Update[citynumber][1] = 0;
      GM_deleteValue('DF_' + Seed.player['name'] + '_city_' + citynumber + '_' + getServerId())
      t.checkBarbData();
      t.showBarbs(citynumber,cityname);
      reloadKOC();
  },  
  
  saveTroops: function(){
    for(i=0;i<10;i++){
           for (w=0;w<12;w++){
               AttackOptions.Troops[i+1][w+1] = parseIntNan(document.getElementById('level'+i+'troop'+w).value);
           }
        if(parseIntNan(document.getElementById('dist'+i).value) > AttackOptions.MaxDistance)
            document.getElementById('dist'+i).value = AttackOptions.MaxDistance;
        AttackOptions.MinDistance[i+1] = parseIntNan(document.getElementById('Mindist'+i).value);
           AttackOptions.Distance[i+1] = parseIntNan(document.getElementById('dist'+i).value);             
     }
     saveAttackOptions();
  },
  
   deletebarbs: function(){
    for (i=1;i<=Seed.cities.length;i++){
        AttackOptions.Update[i][1] = 0;
        GM_deleteValue('DF_' + Seed.player['name'] + '_city_' + i + '_' + getServerId())
    }
    reloadKOC();
   },

  checkBarbData: function(){
      var t = Tabs.Barb;
    if(!AttackOptions.Running) return;
      for (i=1;i<=Seed.cities.length;i++){
      
        // if(GM_getValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId())) //Remove old auto barb data
            // GM_deleteValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId());
      
        if (!AttackOptions.Levels[i][0]) continue; //Skip city if not selected
        
        t.barbArray[i] = [];
          var myarray = JSON2.parse(GM_getValue('DF_' + Seed.player['name'] + '_city_' + i + '_' + getServerId(),"[]"));
        
        if ((myarray == undefined || myarray.length == 0) && t.searchRunning==false) {
              t.lookup=i;
            if(parseInt(AttackOptions.Update[t.lookup][1]) >= parseInt(AttackOptions.stopsearch)) continue; //Skip if search results are empty more than X times
            t.searchRunning = true;
              t.opt.startX = parseInt(Seed.cities[(i-1)][2]);
              t.opt.startY = parseInt(Seed.cities[(i-1)][3]);  
              t.clickedSearch();
            break;
          }
        if (myarray){
            if(AttackOptions.Method == 'distance') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
            if(AttackOptions.Method == 'level') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a > b ? -1 : 1);});
            if(AttackOptions.Method == 'lowlevel') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
              GM_setValue('DF_' + Seed.player['name'] + '_city_' + i + '_' + getServerId(), JSON2.stringify(t.barbArray[i]));
          }
        AttackOptions.Update[i][1] = 0;
        saveAttackOptions();
      }
      t.nextattack = setTimeout(t.getnextCity, parseInt((Math.random()*3000)+2000));
  },
  
  toggleBarbState: function(obj){
    var t = Tabs.Barb;
    if (AttackOptions.Running == true) {
        AttackOptions.Running = false;
        obj.value = "Attack = OFF";
        saveAttackOptions();
        t.nextattack = null;
    } else {
        AttackOptions.Running = true;
        obj.value = "Attack = ON";
        saveAttackOptions();
        t.checkBarbData();
        t.nextattack = setTimeout(t.getnextCity, parseInt((Math.random()*3000)+2000));
    }
  },
  
  barbing : function(){
         var t = Tabs.Barb;
       var city = t.city;
       
       citynumber = Seed.cities[city-1][0];
       cityID = 'city' + citynumber; 
       
       t.getAtkKnight(cityID);
       t.getRallypointLevel(cityID);
       if (t.rallypointlevel > 11 ) t.rallypointlevel = 11;
       var slots=0;
       if (Seed.queue_atkp[cityID] != undefined){
           for(var k in Seed.queue_atkp[cityID])
            slots++;
           if(Seed.queue_atkp[cityID].toSource() == "[]")
            slots = 0;
        } else
            slots=0; 
       
       var element1 = 'pddatacity'+(city-1);
       document.getElementById(element1).innerHTML = 'Sent: ' + AttackOptions.BarbsDone[city]; 
       var element2 = 'pddataarray'+(city-1); 
       document.getElementById(element2).innerHTML =  'RP: (' + slots + '/' + t.rallypointlevel +')';
       
       if ((t.rallypointlevel-AttackOptions.RallyClip) <= slots) return;
       if (t.knt.toSource() == "[]") return; 
       var kid = t.knt[0].ID;
       
       if(t.barbArray[city].length > 0)
        var barbinfo = t.barbArray[city].shift();
       else if(!t.searchRunning){
        t.checkBarbData();
        return;
       } else {
        return;
       }
       var check=0;
       var barblevel = parseInt(barbinfo.level);
        
        if (AttackOptions.Levels[city][barbinfo.level])
            check=1;
        
        if (barbinfo.dist < AttackOptions.MinDistance[barblevel] || barbinfo.dist > AttackOptions.Distance[barblevel]){
            check=0;
            GM_setValue('DF_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(t.barbArray[city]));
            return;
        }

         // check troop levels in city
         var trps = AttackOptions.Troops[barblevel];
         var num_troops = 0;
         for (var ii=1; ii<13; ii++) {
            if (parseInt(trps[ii]) > Seed.units[cityID]['unt'+ii]) check = 0;
            num_troops += trps[ii];
         }
         if (num_troops == 0) check = 0;
         
       if (check == 0){
        t.barbArray[city].push(barbinfo);
        GM_setValue('DF_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(t.barbArray[city]));
        return;
       }
       
       var element = 'pdtotalcity'+(city-1);
        if (t.barbArray[city] == undefined) document.getElementById(element).innerHTML = 'No Data';
        else document.getElementById(element).innerHTML =  'Forests:' + t.barbArray[city].length;
       
       var xcoord = barbinfo['x'];
       var ycoord = barbinfo['y'];
       t.doBarb(citynumber,city,xcoord,ycoord,barblevel,kid,trps);
       saveAttackOptions();
  },

  getnextCity: function(){
    var t = Tabs.Barb;
    if(t.searchRunning || !AttackOptions.Running) return;
    
    var city = t.city+1;
    if (city>Seed.cities.length){
        city=1;
    }
    t.city = city;
    if(AttackOptions.UpdateEnabled){
        var now = unixTime();
        if(now > parseInt(AttackOptions.Update[city][0] + (AttackOptions.UpdateInterval*60))){
            AttackOptions.Update[city][1]=0;
            t.barbArray[city] = []; //Clears data if last update was more than X minutes
            GM_setValue('DF_' + Seed.player['name'] + '_city_' + city + '_' + getServerId(), JSON2.stringify(t.barbArray[city]));
        }
    }
    
    if(AttackOptions.Levels[city][0]){
        t.barbing();
        t.nextattack = setTimeout(t.getnextCity, parseInt((Math.random()*3)+AttackOptions.SendInterval)*1000);
    } else {
        t.getnextCity();
    }
        
  },
  
  getRallypointLevel: function(cityId){
    var t = Tabs.Barb;
    for (var o in Seed.buildings[cityId]){
      var buildingType = parseInt(Seed.buildings[cityId][o][0]);
      var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
      if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
     }
  }, 
  
  getAtkKnight : function(cityID){
     var t = Tabs.Barb;
     t.knt = new Array();
     t.getRallypointLevel(cityID);
     for (k in Seed.knights[cityID]){
             if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.knights[cityID][k]["combat"] >= AttackOptions.barbMinKnight && Seed.knights[cityID][k]["combat"] <= AttackOptions.barbMaxKnight){
                 t.knt.push ({
                     Name:   Seed.knights[cityID][k]["knightName"],
                     Combat:    Seed.knights[cityID][k]["combat"],
                     ID:        Seed.knights[cityID][k]["knightId"],
                 });
             }
     }
     t.knt = t.knt.sort(function sort(a,b) {
                            a = parseInt(a['Combat']);
                            b = parseInt(b['Combat']);
                            if(parseInt(AttackOptions.knightselector) > 0)
                                return a == b ? 0 : (a > b ? -1 : 1);
                            else
                                return a == b ? 0 : (a < b ? -1 : 1);
                            });
  },
    
  doBarb: function(cityID,counter,xcoord,ycoord,level,kid,trps){
          var t = Tabs.Barb;
          
          var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
          params.cid=cityID;
          params.type=4;
          params.kid=kid;
          params.xcoord = xcoord;
          params.ycoord = ycoord;
        for (ii=1; ii<13; ii++) {
            if(parseInt(trps[ii]) > 0)
                params['u'+ii]=trps[ii];
        }
          
          AttackOptions.BarbsTried++;
          document.getElementById('pberror1').innerHTML = 'Tries:'+ AttackOptions.BarbsTried; 
          new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   loading: true,
                   onSuccess: function (transport) {
                   var rslt = eval("(" + transport.responseText + ")");
                   if (rslt.ok) {
                     var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                     var ut = unsafeWindow.unixtime();
                     var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                     var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                     for(i = 0; i <= unitsarr.length; i++){
                        if(params["u"+i]){
                        unitsarr[i] = params["u"+i];
                        }
                     }
                     var currentcityid = params.cid;
                     unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                     unsafeWindow.update_seed(rslt.updateSeed)
                     if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                     var slots=0;
                     for(var k in Seed.queue_atkp['city'+cityID])
                      slots++;
                     if(Seed.queue_atkp['city'+cityID].toSource() == "[]")
                      slots = 0;
                     AttackOptions.BarbsDone[counter]++;
                     var element1 = 'pddatacity'+(counter-1);
                     document.getElementById(element1).innerHTML = 'Sent: ' + AttackOptions.BarbsDone[counter]; 
                     var element2 = 'pddataarray'+(counter-1); 
                     document.getElementById(element2).innerHTML =  'RP: (' + slots + '/' + t.rallypointlevel +')';
                     var now = new Date().getTime()/1000.0;
                     now = now.toFixed(0);
                     GM_setValue('DF_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.barbArray[counter]));
                     saveAttackOptions();
                   } else {
                     //logit( inspect(rslt,3,1));
                     if (rslt.error_code != 8 && rslt.error_code != 213 && rslt.error_code == 210) AttackOptions.BarbsFailedVaria++;
                     if (rslt.error_code == 213)AttackOptions.BarbsFailedKnight++;
                     if (rslt.error_code == 210) AttackOptions.BarbsFailedRP++;
                     if (rslt.error_code == 8) AttackOptions.BarbsFailedTraffic++;
                     if (rslt.error_code == 104) {
                       AttackOptions.BarbsFailedBog++;
                       GM_setValue('DF_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.barbArray[counter]));
                       saveAttackOptions();
                     }
                     document.getElementById('pberror2').innerHTML = 'Excess Traffic errors:' + AttackOptions.BarbsFailedTraffic; 
                     document.getElementById('pberror3').innerHTML = 'Rally Point errors: '+ AttackOptions.BarbsFailedRP;
                     document.getElementById('pberror4').innerHTML = 'Knight errors:' + AttackOptions.BarbsFailedKnight;
                     document.getElementById('pberror5').innerHTML = 'Other errors:' + AttackOptions.BarbsFailedVaria;
                     document.getElementById('pberror6').innerHTML = 'Bog errors:' + AttackOptions.BarbsFailedBog;
                     //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                     }
                   },
                   onFailure: function () {}
           });
       saveAttackOptions();
  },
  
  sendreport: function(){
      var t = Tabs.Barb;
      var total = 0;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = Seed.player['name'];
    params.subject = "Barb Overview";
    var message = 'Barbing Stats: (Sent/Total)' + '%0A';
    for (x=1;x<=Seed.cities.length;x++){     
        message+= Seed.cities[x-1][1] + ': (' + AttackOptions.BarbsDone[x] + '/' + t.barbArray[x].length +')' + '%0A';
    }
    message += '%0A'+ 'Excess traffic errors: ' + AttackOptions.BarbsFailedTraffic +'%0A';
    message += 'Rallypoint errors: ' + AttackOptions.BarbsFailedRP +'%0A';
    message += 'Knight errors: ' + AttackOptions.BarbsFailedKnight +'%0A';
    message += 'Other errors: ' + AttackOptions.BarbsFailedVaria +'%0A';
    message += 'Actual sent attacks: ' + (AttackOptions.BarbsTried - AttackOptions.BarbsFailedTraffic - AttackOptions.BarbsFailedRP - AttackOptions.BarbsFailedKnight -  AttackOptions.BarbsFailedVaria) +'%0A';
    message += '%0A'+'%0A' + 'Food Gain (for '+AttackOptions.MsgInterval+' hour of barbing)' +'%0A';
    for (q=1;q<=Seed.cities.length;q++){
        var cityID = 'city' + Seed.cities[q-1][0];
        var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - AttackOptions.Foodstatus[q];
        message+= Seed.cities[q-1][1] + ': Start: ' + addCommas(AttackOptions.Foodstatus[q]) + ' End :' + addCommas(parseInt(Seed.resources[cityID]['rec1'][0] / 3600)) + ' Gain: ';
        message += addCommas(gain)  + '%0A';
        total += gain;
    }
    message += '%0A Total food gain : '+addCommas(total)+'%0A';
    params.message = message;
    params.requestType = "COMPOSED_MAIL";
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
            } else {
            }
        },
        onFailure: function () {
        },
    });  
  },
  
  clickedSearch : function (){
    var t = Tabs.Barb;
    
    t.opt.maxDistance = parseInt(AttackOptions.MaxDistance); 
    t.opt.searchDistance = (t.opt.maxDistance*2);
    if(t.opt.maxDistance > 40){
        t.opt.searchDistance = 40;
    }
    t.opt.searchShape = 'circle'; 
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    var element = 'pddatacity'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ xxx +','+ yyy;
   
    setTimeout (function(){t.MapAjax.request (xxx, yyy, t.opt.searchDistance, t.mapCallback)}, MAP_DELAY);
  },
  
  mapCallback : function (left, top, width, rslt){
    var t = Tabs.Barb;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }
    map = rslt.data;
    
    for (k in map){
      if (map[k].tileType==54 && AttackOptions.Levels[t.lookup][map[k].tileLevel]){
         var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
         if(dist <= parseInt(AttackOptions.MaxDistance))
            if(dist <= parseInt(AttackOptions.Distance[map[k].tileLevel]))
                t.mapDat.push ({time:0,x:map[k].xCoord,y:map[k].yCoord,dist:dist,level:map[k].tileLevel});
      }
    }
    
    t.tilesSearched += (t.opt.searchDistance*t.opt.searchDistance);

    t.curX += t.opt.searchDistance;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += t.opt.searchDistance;
      if (t.curY > t.lastY){
        t.stopSearch('Found: ' + t.mapDat.length);
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    var element = 'pddatacity'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, t.opt.searchDistance, t.mapCallback)}, MAP_DELAY);
  },
  
  stopSearch : function (msg){
    var t = Tabs.Barb;
    var element = 'pddatacity'+(t.lookup-1);
        document.getElementById(element).innerHTML = msg;
    GM_setValue('DF_' + Seed.player['name'] + '_city_' + t.lookup + '_' + getServerId(), JSON2.stringify(t.mapDat));
    AttackOptions.Update[t.lookup][0] = unixTime();
    AttackOptions.Update[t.lookup][1]++;
    t.searchRunning = false;
    saveAttackOptions();
    t.checkBarbData();
    return;
  },
  
  hide : function (){
  
  },

  show : function (){
  
  },

}; 