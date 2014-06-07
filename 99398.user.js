// ==UserScript==
// @name           KoC Flower Tools
// @namespace      TS
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @include        http://localhost/gmscript/mat/*
// ==/UserScript==

var DEBUG_BUTTON = true;
var DEBUG_TRACE = false;
var DEBUG_TRACE_CTRAIN = false;
var Version = '20101123a';
var MAP_DELAY = 1500;
var CANCEL_TRAINING_DELAY = 1500;   // without a delay, some (recoverable) 'something has gone wrong' errors occur. The server is probably delaying SQL updates on cancels.
var ENABLE_TEST_TAB = false;

var Options = {
  includeMarching:true,
  encRemaining : true,
  maxIdlePop   : false,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  fixTower     : true,
  fixTower2    : true,
  fixMapDistance: true,
  fixMsgCount  : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  alertConfig  : {aChat:false, aPrefix:'*** Automated message: TOWER ALERT! ***', scouting:false, wilds:false, minTroops:10000, spamLimit:10 },
};
unsafeWindow.pt_Options=Options;  


var Cities = {};
var Seed = unsafeWindow.seed;
var my = {};
var mainDiv;
var Tabs = [
  ['Search', 'Search'],
];

if (ENABLE_TEST_TAB)
  Tabs.push (['Test', 'Test']);  
  
  
setTimeout (startup, 500);

function startup (){
//logit ('g_timeoff: '+ unsafeWindow.g_timeoff);
  Seed = unsafeWindow.seed;
  window.name = 'GMSCRIPT';
  logit ("* KOCpowerTools v"+ Version +" Loaded");
  readOptions();
  AddMainTabLink('FLOWER', function(){
  //  alert("Flower button clicked");
    my.Search.StartAuto();
  });
  setCities();
}

function eachSecond (){
  if (Options.alertConfig.aChat)
    checkTower ();  
  setTimeout (eachSecond, 1000);  
}

/****************************************************************************************/
// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};



var messageNav = {
  old_modal_messages : unsafeWindow.modal_messages,
  old_modal_messages_send : unsafeWindow.modal_messages_send,
  
  init : function (){  
    alterUwFunction ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]); 
    alterUwFunction ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]); 
    unsafeWindow.messageNav_hook = messageNav.hook;
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
  },

  enable : function (tf){
    t = messageNav;
    Options.enhanceMsging = tf;
    saveOptions();
    unsafeWindow.modal_messages = t.old_modal_messages;
    unsafeWindow.modal_messages_send = t.old_modal_messages_send;
    if (tf){
      alterUwFunction ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]); 
      alterUwFunction ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]); 
    }
  },
    
  hook : function (){
    var div = document.getElementById('modal_msg_view_actions');
    var but = makeButton20('Forward');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>To:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
    var button = makeButton20('All Officers');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officers>"}, false);
  },  
  
  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "fwd: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Original message from '+ from +' follows:]\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)
      return false;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0]; 
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Sent to all officers]';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';  
    new Ajax.Request(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);
                document.getElementById('modal_msg_write_to').value = "";
                document.getElementById('modal_msg_write_subj').value = "";
                document.getElementById('modal_msg_write_txt').value = ""
            } else {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)
            }
        },
        onFailure: function () {
          unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)
        },
    });
    return true;  
  }
}

function makeButtonXX (label){
  var but = document.createElement('input');
  but.type='submit';
  but.value=label;
  but.style.width='inherit';
  return but;
}

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

// TODO: Make all tower alert stuff a JSON object



function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

my.Search = {
  cont:null,
  state : null,

  opt : {},

  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,
  wildowners : 0,

  normalizeCoord : function (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  },

getMarchTroops : function (cityid){
  var ret = [];

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }

 // for( i = 0; i < Cities.numCities; i++) {   // each city
    cityID = 'city'+ cityid;
    for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if (typeof (march) == 'object'){
        for (ii=0; ii<13; ii++){
          ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
          ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
        }
      }

// TODO: fixup completed marches
// TODO: Assume transport is complete ?

    }
 // }
  return ret;
},

GetKnights : function()
{
my.Search.ks = [];



var indcit = 0;
    while (indcit < Cities.numCities)
    {
    var cit = Cities.cities[indcit];//Math.floor(Math.random() * Cities.numCities)];
var rks = [];
var ldrs = Seed.leaders["city" + cit.id];
var ks = Seed.knights["city" + cit.id];

 //               document.getElementById("srcResults").innerHTML = "GetKnights cit = " + indcit + ", knights = " + ks + "<br/>" + document.getElementById("srcResults").innerHTML;
 var dbg = "";
        var kcnt = 0;

var lastk = null;
for (ik in ks)
{
    var k = ks[ik];
   if (k.knightId != ldrs.resourcefulnessKnightId
                && k.knightId != ldrs.politicsKnightId
                && k.knightId != ldrs.combatKnightId
                && k.knightId != ldrs.intelligenceKnightId
                ) //&& k.knightStatus + "" == "1")
                {
              //             document.getElementById("srcResults").innerHTML = "ADDING KNIGHT, tot = " + rks.length + ", isbarcit = " + cit.isbarbcit + "<br/>" + document.getElementById("srcResults").innerHTML;
              
              kcnt++;
                    if (cit.isbarbcit || cit.isbugcit)
                    {
                        dbg += k.knightName + ",";
                        rks.push(k);
                //           document.getElementById("srcResults").innerHTML = "ADDED KNIGHT, tot = " + rks.length + ", isbarcit = " + cit.isbarbcit + "<br/>" + document.getElementById("srcResults").innerHTML;

                    }
                    if (cit.iscrestcit)
                    {
                        if (lastk == null)
                            lastk = k;
                        else{
                            k.swk = lastk;
                            rks.push(k);
                            dbg += k.knightName;
                            dbg += "(" + lastk.knightName + "),";
                                //  document.getElementById("srcResults").innerHTML = "found knight in city " + indcit + "<br/>" + document.getElementById("srcResults").innerHTML;

                            lastk = null;
                        }
                    }

                   
                }  

                     
}
  //   document.getElementById("srcResults").innerHTML = "found " + kcnt + " knights in city " + indcit + ", " + dbg + "<br/>" + document.getElementById("srcResults").innerHTML;
                

my.Search.ks[cit.id] = rks;
indcit++;
}
},

GetFreeKnight : function(cit) {
        var curtime = (new Date()).getTime();
var bestknight = null;
        //   document.getElementById("srcResults").innerHTML = "in getfreeknight, ksarr length = " + my.Search.ks[cit.id].length + "<br/>" + document.getElementById("srcResults").innerHTML;

for (var i = 0; i < my.Search.ks[cit.id].length; i++)
{
          // document.getElementById("srcResults").innerHTML = "in getfreeknight<br/>" + document.getElementById("srcResults").innerHTML;

    var k = my.Search.ks[cit.id][i];
            if (!k.lastActivity || typeof(k.lastActivity)=="undefined" || (k.lastActivity < curtime))
                    {
       //                 kcntr[0]++;
                        bestknight = k;
                        break;
                    }
 }               
            
    return bestknight;

},

crestlvl:8,

numscoutstickle:0,
nummmtickle:1,

 TrySendAttack : function (x) {
// alert("in trysendattackx " + Cities.numCities + ":" + my.Search.mapDat.length + ":" + my.Search.citiessearched);
    //              document.getElementById("srcResults").innerHTML = "begin loop, nu cit = " + Cities.numCities + "<br/>" + document.getElementById("srcResults").innerHTML;

    
    var indcit = 0;
    //for (i = 0; i < Cities.numCities; i++)
    dela = 10;
    while (indcit < Cities.numCities)
    {
      //               document.getElementById("srcResults").innerHTML = "trying cit = " + indcit + "<br/>" + document.getElementById("srcResults").innerHTML;

        var cit = Cities.cities[indcit];//Math.floor(Math.random() * Cities.numCities)];
    //    var march = this.getMarchTroops(cit.id);
        
     //   alert("tryin to send attack: " + cit.isbugcit);
        
   //     document.getElementById("srcResults").innerHTML = "numcav is now " + numcav + ", marching: " + (march.marchUnits[8] + march.returnUnits[8]) + "<br/>" + document.getElementById("srcResults").innerHTML;
        //[map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, getTime(), tileId];
        var bestdist = 0;
        var bestel = null;
        var bestelind = -1;
        var curtime = (new Date()).getTime();
        ind = 0;

        var bugels = [];
        for (ind = 0; ind < my.Search.mapDat.length; ind++) //while (ind < 15)
        {
            var elind = ind; //Math.floor(Math.random() * my.Search.mapDat.length);



            if (!my.Search || !my.Search.mapDat || elind > my.Search.mapDat.length)
                continue;

            var el = my.Search.mapDat[elind];

            var numcavmarch = el.tileLevel == 3 ? 2250 : (el.tileLevel == 2 ? 1500 : 1000);

            if (((el.isbarbel && cit.isbarbcit) || (el.iscrestel && cit.iscrestcit)) && curtime - el.lastTime > 60 * 60 * 750)// && numcavmarch <= numcav)// &&*/ ((el[4] == 2 && numcav >= 1500) || (el[4] == 3 && numcav >= 2250)))
            {
    //            alert("found barb camp " + distance);
            //     document.getElementById("srcResults").innerHTML = "in loop" + el + ", " + cit + "<br/>" + document.getElementById("srcResults").innerHTML;

                var dist = distance(el.x, el.y, cit.x, cit.y);
                
                if (el.tileLevel /** (curtime - lasttime)*/ / dist > bestdist)
                {
               //     document.getElementById("srcResults").innerHTML = "bestel found at (" + el[0] + "," + el[1] + "), lv" + el[4] + ", dist = " + dist + ", lasthit " + (curtime - lasttime) + "<br/>" + document.getElementById("srcResults").innerHTML;
                    bestel = el;
                    bestelind = ind;
                    bestdist = el.tileLevel /** (curtime - lasttime)*/ / dist;
//                    if (Math.random() > 0.8)
//                        break;
                }
            }
            if (el.isbugel && cit.isbugcit)
            {
       //     alert("pushing bugel");
                bugels.push(el);
            }
            //ind++;
        }
 
        if (bugels.length > 0)
        {
         //   alert("bugel found!");
            bestel = bugels[Math.floor(Math.random() * bugels.length)];
        }
        if (bestel != null)
        {

     //       document.getElementById("srcResults").innerHTML = "bestel found vor city " + indcit + " at " + bestel.x+ "," + bestel.y + ", isbarb = " + bestel.isbarbel + ", iscrest = " + bestel.iscrestel + "<br/>" + document.getElementById("srcResults").innerHTML;

            var bestknight = this.GetFreeKnight(cit);
       
       //    document.getElementById("srcResults").innerHTML = "After GetFreeKnight<br/>" + document.getElementById("srcResults").innerHTML;

         //   alert(dbg);
            if (bestknight != null)
            {
   //             document.getElementById("srcResults").innerHTML = "knight " + bestknight.knightName + " found<br/>" + document.getElementById("srcResults").innerHTML;

                var curtime = (new Date()).getTime();
            //    alert(curtime + (20 * 1000));
                bestknight.lastActivity = curtime + (100 * 1000); // time out this knight for 100s


            //    document.getElementById("srcResults").innerHTML = "trying to sendarmy from city " + indcit + " with knight " + bestknight.knightName + "<br/>" + document.getElementById("srcResults").innerHTML;
    //        document.getElementById("srcResults").innerHTML = "found bestel " + bestel.x + "," + bestel.y + ", mssinceprev: " + (curtime - bestel.lastTime) + ", pos = " + bestelind + "<br/>" + document.getElementById("srcResults").innerHTML;

       //         document.getElementById("srcResults").innerHTML = "found bestel2 " + bestel.x + "," + bestel.y + ", mssinceprev: " + (curtime - bestel.lastTime) + ", pos = " + bestelind + "<br/>" + document.getElementById("srcResults").innerHTML;

                bestel.city = cit;
                bestel.knight = bestknight;
              //  alert(bestel.knight.lastActivity);
              if (bestel.isbarbel)
              {                
                this.setTileTime(bestel.x, bestel.y, bestel.lastTime + 0.35 * 60 * 1000); // move lasttime
                var numcavmarch = bestel.tileLevel == 3 ? 2250 : (bestel.tileLevel == 2 ? 1500 : 1000);
                my.Search.doMarch(cit.id, bestknight.knightId, bestel[0], bestel[1], 0, 0, numcavmarch, 0, 0, dela, my.Search.marchNotify);
              }
              if (bestel.iscrestel)// && my.Search.searchdone)
              {
                this.setTileTime(bestel.x, bestel.y, bestel.lastTime + 0.35 * 60 * 1000); // move lasttime

          //      if (bestel.fw && (curtime - bestel.lastTime > 60000))
          //          setFw(bestel.x, bestel.y, false);
                if (false)//bestel.fw)
                {
                  //  this.setTileTime(bestel.x, bestel.y, bestel.lastTime + 0.35 * 60 * 1000); // move lasttime
                    my.Search.doMarch(cit.id, bestknight.knightId, bestel.x, bestel.y, 0, 8000, 0, 800, 0, dela, my.Search.marchNotify);
                }
                else
                {
                    if (my.Search.crestlvl == 6)
                        my.Search.doMarch(cit.id, bestknight.knightId, bestel.x, bestel.y, 100, 0, 0, 0, 0, dela, my.Search.marchNotify);
                    else
                        my.Search.doMarch(cit.id, bestknight.knightId, bestel.x, bestel.y, 299, 0, 0, 1, 0,dela, my.Search.marchNotify);            
                }
              }
              if (bestel.isbugel)
              {
            //  alert("sending tickle");
                        my.Search.doMarch(cit.id, bestknight.knightId, bestel.x, bestel.y, my.Search.nummmtickle, 0, 0, 0, my.Search.numscoutstickle,dela, my.Search.marchNotify);              
              }
              
                dela += Math.random() * 10000;
            //    return;
             //   bestknight
            }
        
        }
        indcit++;
    }

//alert("trysendattack end");   
         //       document.getElementById("srcResults").innerHTML = "end loop<br/>" + document.getElementById("srcResults").innerHTML;
 
    
 },

 setTileTime : function (x, y, time)
 {
        for (ind = 0; ind < my.Search.mapDat.length; ind++) //while (ind < 15)
        {
            var el = my.Search.mapDat[ind];

            if (el.x == x && el.y == y)
            {
                el.lastTime = time;
            }
        } 
 },

 callTrySendAttack : function()
 {
 try
  {
    my.Search.TrySendAttack();
  }
catch(err)
  {
  alert(err);
  throw err;
  //Handle errors here
  }
  setTimeout(my.Search.callTrySendAttack, 10000);
 },



 marchNotify : function(rslt)
 {
 var dbg = "";
 if (!rslt.ok)
 {
 for(k in rslt)
    dbg += k + ":" + rslt[k];

    dbg = "ERROR:" + dbg;
  //  document.getElementById("srcResults").innerHTML = dbg + "<br/>" + document.getElementById("srcResults").innerHTML;
    
    return;
 }
  var curtime = (new Date()).getTime();
  
  //document.getElementById("srcResults").innerHTML = "in marchnotify<br/>" + document.getElementById("srcResults").innerHTML;
 
        for (ind = 0; ind < my.Search.mapDat.length; ind++) //while (ind < 15)
        {
            var elind = ind; //Math.floor(Math.random() * my.Search.mapDat.length);
            if (!my.Search || !my.Search.mapDat || elind > my.Search.mapDat.length)
                continue;
            var el = my.Search.mapDat[elind];
            
           // dbg += el.tileId + ":" + rslt.tileId + "\r\n";
            if (el.tileId + "" == rslt.tileId + "")
            {
            dbg += "YES";// + Seed.units['city' + el.city]['unt'+8] + "\r\n";
               // var curtime = (new Date()).getTime() - (60 * 60 * 1000);
                
                var numcavmarch = el.tileLevel == 3 ? 2250 : (el.tileLevel == 2 ? 1500 : 1000);
               // if (!el.iscrestel || el.fw)
                    this.setTileTime(el.x, el.y, (new Date()).getTime());
                if (el.city != null && typeof(el.city) != "undefined")
                {
                 //   Seed.units['city' + el.city.id]['unt'+8] -= numcavmarch;
                    
                 //   alert("before fakeattack");
                //    dbg += rslt.eta + ":" + curtime + ":" + el.knight.lastActivity + ":" + ((curtime - rslt.eta * 1000) * 2) + "<br/>";
                    var timeout = (rslt.eta * 1000 - curtime) * 2.1;
                    dbg += ", " + el.knight.knightName + " timed out for " + timeout + "ms";
                    el.knight.lastActivity = curtime + timeout;
                    if (el.iscrestel)
                    {
                            var bestel = el;
                            var bestknight = el.knight.swk;
                             dbg += "SW";

                             if (my.Search.crestlvl == 6)
                                my.Search.doMarch(el.city.id, bestknight.knightId, bestel.x, bestel.y, 1, 3000, 0, 0, 0, 10, function(rslt){});
                             else
                                my.Search.doMarch(el.city.id, bestknight.knightId, bestel.x, bestel.y, 0, 8000, 0, 800, 0, 10, function(rslt){});

                    //    el.fw = !el.fw;
                    }
                    el.city = null;
                  //  dbg += ":" + (rslt.eta * 1000 - curtime) * 2.1 + ":";

                  //  this.createFakeAttack (0, false, false, 1000, 10000);
                    break;
                }
     //           Seed.queue_atkp[el.city][8] += numcavmarch;
                
            }
        } 

 // document.getElementById("srcResults").innerHTML = dbg + document.getElementById("srcResults").innerHTML;


 },


 doMarch2 : function (params)
 {
  makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
            my.Search.marchNotify(rslt);
        }
    );
 },

 getReports : function (notify)
 {
 var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
 params.pageNo = "";
  makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
            notify(rslt);
        }
    );
 },

 callGetReports : function()
 {
 try
  {
    my.Search.getReports(my.Search.getReportsNotify);
  }
catch(err)
  {
  //Handle errors here
  }
  setTimeout(my.Search.callGetReports, 20000);
 },

 getReportsNotify : function(rslt)
 {
 //alert("in reports notify");
 if (!rslt || !rslt.ok)
    return;
 
 //var torem = [];
 for (k in rslt.arReports)
 {
    var rpt = rslt.arReports[k];

    var type = parseInt(rpt.side0TileType);
                    
    if (type >= 50 && parseInt(rpt.side0PlayerId) == 0) { // barb camp
  
                  getReport(rpt.marchReportId, function(rslt) {
              document.getElementById("srcResults").innerHTML = "found report" + rslt + "<br/>" + document.getElementById("srcResults").innerHTML;

        
                  //  alert("new report details  " + rslt);
      document.getElementById("srcResults").innerHTML = "found report" + rslt.loot[1] + "<br/>" + document.getElementById("srcResults").innerHTML;


        });
    }

   // torem.push(rep);
       
 }
 
 //   alert(dbg);
 
 },

 getReport : function(rid, notify)
 {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.rid = rid;
    params.side = 1;
    makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
            notify(rslt);
        }
    ); 
 },

 deleteReports : function(arr, notify)
 {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    var srids1 = "";
    for (i = 0; i < arr.length; i++)
    {
        if (i != 0)
            srids1 += ",";
        srids1 += arr[k];
    }
    params.srids1 = srids1;
    params.srids0 = "";
    makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
//            notify(rslt);
        }
    ); 
 },


 generateBlockList : function(left, top, width) {
    var width5 = parseInt(width / 5);
    var bl = [];

    for (x=0; x<width5; x++){
      xx = left + (x*5);
      if (xx > 745)
        xx -= 750;
      for (y=0; y<width5; y++){
        yy = top + (y*5);
        if (yy > 745)
          yy -= 750;
        bl.push ('bl_'+ xx +'_bt_'+ yy);
      }
    }
    return bl.join(",");
  },

 MapRequest : function(left, top, width, cb) {
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
 //   Map.callback = cb;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;

    makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
         //   alert("notify maprequest " + rslt);
            cb(left, top, width, rslt);
        }
    );
 },


SearchAlliance : function (allianceName)
{
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.allianceName = allianceName;

    makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
           // alert("notify SearchAlliance " + rslt);

            for (k in rslt.alliancesMatched){
                var all = rslt.alliancesMatched[k];
                var dip = '';
                if (all.relation && all.relation==1)
                    dip = 'Friendly';
                else if (all.relation && all.relation==2)
                    dip = 'Hostile';

              //  alert(all.allianceName + " " + dip);
                if (dip != "Hostile")
                    continue;
                my.Search.SearchAllianceMembers(all.allianceId, all.allianceName);
            }

          //  cb(left, top, width, rslt);
        }
    );
},

minmighttotickle : 1000000,

 SearchAllianceMembers : function (allianceId, allianceName) {
  //  var t = my.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.perPage = 100;
    if (allianceName)
      params.allianceName = allianceName;
    if (allianceId && allianceId != 0)
      params.allianceId = allianceId;

    makeJSONRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, params, 
        function (rslt) {
        alert("Flower Tools now active, keep an eye on the reports ;)");

       for (var i=0; i<rslt.results.length; i++){
            p = rslt.results[i];
          //  for (var pp in p)
          //      alert(pp + ":" + p[pp]);

            if (p.userId == 0)
                continue;
            for (var c=0; c<p.cities.length; c++){

                 var newel = [p.cities[c].xCoord, p.cities[c].yCoord, 0, 80, 1, true, (new Date()).getTime() - (60 * 60 * 1000), 0];
   newel.x = p.cities[c].xCoord;
   newel.y = p.cities[c].yCoord;
   newel.type = 80;
   newel.tileLevel = p.cities[c].tileLevel;
   newel.isOwned = true;
   newel.lastTime = (new Date()).getTime() - (60 * 60 * 1000);
   newel.tileId = p.cities[c].tileId;
   newel.isbarbel = false;
   newel.iscrestel = false;
   newel.isbugel = true;
 //  if (newel.iscrestel)
 //        document.getElementById("srcResults").innerHTML = "lv8 wild found at " + newel.x + "," + newel.y + "<br/>" + document.getElementById("srcResults").innerHTML
   //     alert("adding newel");
        if (p.might >= my.Search.minmighttotickle)
            my.Search.mapDat.push (newel);
            //    alert("added city " + p.cities[c].xCoord + ":" + p.cities[c].yCoord);
               }
        }


    });

    
  },



 doMarch : function(cid, kid, x, y, nummil, numarch, numcav, numbal, numscouts, dela, notify) {
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.xcoord = x;
    params.ycoord = y;
    params.r1 = params.r2 = params.r3 = params.r4 = params.gold = 0;
    params.standalone = 0;
    params.items = "";
    params.type = 4;
    params.u2 = nummil;
    params.u3 = numscouts;
    params.u6 = numarch;
    params.u8 = numcav;
    params.u10 = numbal;
  //  params.tvuid = 	11037632;
    params.lang = "en";
    params.kid = kid;
    params.notify = notify;
   // params.notify = notify;

//    my.Search.doMarch2(params);
    setTimeout(my.Search.doMarch2,dela,params);
 },

 lasthelp : "",
 rempwd : "XistanceLikesBoys",

 AutoHelp : function () {
  //  my.Search.AutoFriendHelp2();
  //  return;
    
    var torem = [];

    var el= document.getElementById('mod_comm_list2');
    var firsthelp = null;
    for (var i = 0; i < el.childNodes.length; i++)
    {
        var el2 = el.childNodes[i];
        var str= el2.innerHTML;
        var patt1=/claimAllianceChatHelp[^\)]*?\);/gi;
        var arr = patt1.exec(str);
        if (arr == null)
        {
            if (false && str.indexOf(my.Search.rempwd) >= 0)
            {
                var rr = str.split("#");
                try { eval(rr[1]); } catch (err){}
                torem.push(el2);
            }
            continue;
        }
        if (arr[0] == my.Search.lasthelp) break;
        if (firsthelp == null) firsthelp = arr[0];
        torem.push(el2);
        eval("unsafeWindow." + arr[0]);
    //    my.Search.AutoFriendHelp(arr[0]);
    }
    if (firsthelp != null)
        my.Search.lasthelp = firsthelp;

    for (var i = 0; i < torem.length; i++)
    {
        el.removeChild(torem[i]);
    }
  //  return;
    setTimeout(my.Search.AutoHelp,2000);
 },

 AutoFriendHelp2 : function(command)
 {
    alert("autofriendhelp2");
    pth = "http://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=1&sid=12163381&lid=4&gid=419235&cid=1277&s=250&in=12163381&si=95&go=next";
    /*
var head = unsafeWindow.document.getElementsByTagName("head")[0];
        var escripts = head.getElementsByTagName("script");
        var script = document.createElement("script");
        script.type = 'text/javascript';
        var scriptsrc = pth;
        script.src = scriptsrc;
        head.appendChild(script);
        alert("added script to " + pth);
        */

//        http_request = new XMLHttpRequest();
//    http_request.open('GET', pth, true);
//    http_request.send();

//var html = '<iframe  id="Iframe1"  frameborder="0"  vspace="0"  hspace="0"  marginwidth="0"  marginheight="0" width="100"  scrolling="yes"  height="100"  src="' + pth + '"></iframe>';
//document.getElementById("srcResults").innerHTML = html + document.getElementById("srcResults").innerHTML;

//window.open(pth, 'popie'); 

   alert("autofriendhelp2 done");
 },

 afcnt : 0,

 winPop : [],

 openWindow : function(url){
  var wp = my.Search.winPop;
  if(wp.length > 0){
    wp = window.open(wp[0], "popie");
    wp.remove(0);
  }
    setTimeout(my.Search.openWindow,5000);

},

 AutoFriendHelp : function(command)
 {
// alert("in autofriendhelp");
 //claimAllianceChatHelp(1,418621,4,12163381,1277,"Lady","Donny");

 var pstr = command.substr(22, command.length);
 pstr = pstr.split(",");

 // http://www250.kingdomsofcamelot.com/fb/e2/src/helpFriend_src.php?sid=12163381&gid=418621&tid=1&lid=4&cid=1277&standalone=0&res=1&iframe=1&lang=en&in=12163381&si=95page=helpfriend&s=250&go=next
 // ?page=helpfriend&tid=1&sid=12163381&lid=3&gid=11890&cid=1277&s=250&in=12163381&si=95&go=next
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.sid = pstr[3];
    params.gid = pstr[1];
    params.lid = pstr[2];
    params.cid = pstr[4];
    params.in = pstr[3];
    params.tid = pstr[0];
    params.lang = "en";
    params.iframe = 1;
    params.go = "next";
    var pth = unsafeWindow.g_ajaxpath;

    pth += "http://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=1&sid=" + params.sid + "&lid=" + params.lid + "&gid=" + params.gid + "&cid=" + params.cid + "&s=250&in=" + params.in + "&si=95&go=next";
   // alert(pth);
   my.Search.winPop.push(pth);
//    window.open(pth, 'popie'); 
// if (!my.Search.fram)
//   my.Search.createIframe("ifmain", 10,10);
//my.Search.fram.src = pth;

   // pth = "http://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=1&sid=12163381&lid=3&gid=419235&cid=1277&s=250&in=12163381&si=95&go=next";
  
    /*    http_request = new XMLHttpRequest();
    http_request.open('GET', pth, true);
    http_request.send();
    

     var head = unsafeWindow.document.getElementsByTagName("head")[0];
        var escripts = head.getElementsByTagName("script");
        var script = document.createElement("script");
        script.type = 'text/javascript';
        var scriptsrc = pth;
        script.src = scriptsrc;
        unsafeWindow.head.appendChild(script);
        alert("added script to " + pth);
   /*
    makeJSONRequest(pth, {}, 
        function (rslt) {
            
        }
    );*/
   // alert("done");
    
     
 },

 
createIframe : function (iframeName, width, height) {
var iframe;
if (unsafeWindow.document.createElement && (iframe =
unsafeWindow.document.createElement('iframe'))) {
iframe.name = iframe.id = iframeName;
iframe.width = width;
iframe.height = height;
iframe.src = 'about:blank';
unsafeWindow.document.body.appendChild(iframe);
}
my.Search.fram = iframe;
return iframe;
},



 StartAuto : function (){

  //  alert("StartAuto");
  //  my.Search.FindBarbs();


  

    for (i = 0; i < Cities.numCities; i++)
    {
        var cit = Cities.cities[i];
        my.Search.numarch = parseInt(Seed.units['city' + cit.id]['unt'+6]);
        my.Search.numbal = parseInt(Seed.units['city' + cit.id]['unt'+10]);
        my.Search.nummil = parseInt(Seed.units['city' + cit.id]['unt'+2]);
        my.Search.numcav = parseInt(Seed.units['city' + cit.id]['unt'+8]);
        cit.isbarbcit = my.Search.numcav > 0;
        cit.iscrestcit = !cit.isbarbcit && my.Search.numarch > 0 && my.Search.numbal > 0 && my.Search.nummil > 0;
        cit.isbugcit = !cit.isbarbcit && !cit.iscrestcit && my.Search.nummil > 0 && my.Search.numbal == 0 && my.Search.numarch == 0;
      //  alert("city " + i + ":" + cit.isbugcit);
        var numcav = parseInt(Seed.units['city' + cit.id]['unt'+8]);

       // var parseInt(Seed.resources[cit.id]['rec'+i][0] / 3600);
    }
    cit = Cities.cities[0];
  
  this.GetKnights();
            my.Search.citiessearched = 0;
        my.Search.mapDat = [];
        my.Search.FindBarbs(cit.x, cit.y, 30, function() { alert("notify called"); });

 //   alert("before trysendattack");

    setTimeout(my.Search.callTrySendAttack, 60000);
    my.Search.SearchAlliance("Eternal");
    setTimeout(my.Search.openWindow, 60000);
    
   // setTimeout(my.Search.callGetReports, 20000);
 

    return;
    my.playerinfodone = function (rslt) {
    //alert(rslt.userInfo[0].name);

  //  alert(AllianceList);
    var my = rslt.adinfo;
    
    var diplo = "unknown";
    if (rslt.userInfo[0].allianceId)
    {
        diplo = getDiplomacy (rslt.userInfo[0].allianceId);
     //   alert(rslt.userInfo[0].allianceName + ":" + diplo);
        if (true)//diplo != "friendly")
        {
            var okies = true;
            for (i = 0; i < my.unfriendlyalliances.length; i++)
            {
                if (my.unfriendlyalliances[i] == rslt.userInfo[0].allianceId)
                    okies = false;
            }

            if (okies && rslt.userInfo[0].allianceName != "Eternal")
            {
             
    
                my.unfriendlyalliances.push(rslt.userInfo[0].allianceId);
            }
        }
    }
    
      
    var tran = my.AllianceList;
    my.daqry += "&uid_" + my.daqrycnt + "=" + my.urlencode(my.wildowners[my.curid]);
    my.daqry += "&name_" + my.daqrycnt + "=" + my.urlencode(rslt.userInfo[0].name);
  //  my.daqry += "&name_" + my.daqrycnt + "=" + my.urlencode(rslt.userInfo[0].name);
    my.daqry += "&alliance_" + my.daqrycnt + "=" + my.urlencode(rslt.userInfo[0].allianceName ? rslt.userInfo[0].allianceName : "");
  //  alert(rslt.userInfo[0].allianceId);
  //  alert(getDiplomacy);
    my.daqry += "&diplomacy_" + my.daqrycnt + "=" + (diplo);

    my.daqrycnt++;


    my.curid++;
    while (my.wildowners[my.curid] && typeof(my.wildowners[my.curid]) != "undefined" && my.wildowners[my.curid] == my.wildowners[my.curid - 1])
        my.curid++;
     if (my.daqrycnt == 100 || my.curid >= my.wildowners.length)
    {
        var head = document.getElementsByTagName("head")[0];
        var escripts = head.getElementsByTagName("script");
        var script = document.createElement("script");
        script.type = 'text/javascript';
        var scriptsrc = "http://localhost:31674/test.aspx" + "?dummy=" + escripts.length + my.daqry;
        script.src = scriptsrc;
     //   head.appendChild(script);

        my.daqry = "";
        my.daqrycnt = 0;
    }
    if (my.curid < my.wildowners.length)
    {
        tran.fetchPlayerInfo(my.wildowners[my.curid], my, my.playerinfodone);
    }
    else
    {
      //  alert("done");
    }

   


  };

 
 
    my.urlencode = function(str) {
str = escape(str);
str = str.replace('+', '%2B');
str = str.replace('%20', '+');
str = str.replace('*', '%2A');
str = str.replace('/', '%2F');
str = str.replace('@', '%40');
return str;
};
 
 my.setDiplomacy = function(aid, notify) {
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.diplomacyStatus = 1;

    params.allianceSelected = aid;

    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceSetDiplomacies.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      }
    });


 };
 
 my.sendMsg = function(name, subject, msg, notify) {
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = name;

    params.subject = subject;
    params.message = msg;
    params.requestType = "COMPOSED_MAIL";
    params.lang = "en";
    params.standalone = 0;
    params.tvuid = 3273557;

    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      }
    });


 };

 my.sendAllianceMsg = function(aid, subject, msg, notify) {
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = aid;

    params.subject = subject;
    params.message = msg;
    params.type = "alliance";
    params.lang = "en";
    params.standalone = 0;
    params.tvuid = 11037632;// 3273557;

    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      }
    });


 };

    
    my.wildowners = [3273557];
   /// my.wildowners = [10077475,12251919,892819,573187,6827487,8472783,10422951,1834887,8222875,6881950,1267219,10499038,2850382,967078,3524614,12220942,2902798,9118787,7538974,12264670,5161019,1985003,2534374,1162894,12157342,8183374,1989334,12260134,4527910,6525181,6243269,11706090,12317693,7332848,2834933,9928949,2850666,10838490,6487397,7980413,12348210,1165493,6275765,1205741,8396874,10771685,10264218,3418469,2468573,11378213,3387186,5040710,2533037,9474258,9106033,922441,7624033,8650321,8017585,1781436,2240864,9516344,6078992,1085628,12260316,12177420,11386980,11232396,2910228,11524616,11037632,12227772,12264228,7491187,1518327,12202843,11570539,11786823,12228087,12204211,9556531,7542619,11875003,8999227,2353195,5957278,853990,6680542,10328302,12259198,4917155,2924158,696094,12155789,5811146,12160157,2583365,2541893,12164021,10818725,2137932,5391348,8968812,9167892,8563092,7363572,4522332,8736300,3678103,10857163,4498153,10184827,3471019,9696907,1430107,10555243,3474691,9122179,1203619,3553723,6665251,7757841,11089099,148891,11542411,12204955,9594574,12204475,8640742,12240691,4391913,8306422,11400502,12208366,7524430,12177022,12194830,7927558,9613006,8806438,12232061,5112677,8186789,5082677,12282941,12225437,9898085,3273557,8413650,12182658,3521816,6739709,11264381,10252338,3958157,11492117,12252036,12275124,5356284,10605540,2475084,1213212,7197276,2871355,7269835,12179635,2406091,7677523,12170563,8139379,9414331,1926571,12215875,6617443,8951110,9853918,1797694,12189766,12216982,12164422,12232774,487692,8954717,717245,7680605,6675605,11669309,9708533,8185421,8858381,6092433,8765110,12260885,1858781,6190037,507252,8950548,9469308,8919372,7708764,7699884,1545756,7552815,4306812,11165868,9348235,12181339,1571803,7414987,702763,9248899,12229555,12193291,977587,1353286,7361446,11162662,3151414,11643550,12098422,12220102,3800357,9093557,9467549,10587869,6755700,1020972,3508140,2284404,6487948,10905900,2021675,12161964,8478924,8421108,12158196,1887900,12270187,12232795,12256243,9865171,10556563,12182323,9467371,5227003,7183558,12175966,5173510,12324118,12181342,8476774,3068158,12198574,6260285,1482869,12288389,8044373,472181,8278685,11885477,687677,1483877,8796797,1522493,12202349,1987853,12156228,2724060,3015032,2426196,12205092,1063908,12195636,7763827,12262411,2907667,12254779,3075403,9898723,1547731,12225427,12247483,12227251,12157603,9947035,1460275,12287515,2033611,1900435,11302819,6983614,8972830,5973166,10239742,9459214,12259990,7769206,569542,12294365,983165,3508589,1007501,6103085,9589620,3546180,4819644,664884,2386428,9728772,891612,6034116,2034019,1758595,1455709,1756813,11036779,10257091,9738283,9417451,10675675,12254011,2236246,11827726,11860486,4829542,12289534,8224473,6531965,11948669,2541223,7105301,12279077,6700133,11440288,2614421,11715941,12261533,8279109,11465412,7735212,12032628,11391948,7606836,3545004,7517316,9259332,12201379,12242635,1116043,903475,9049023,6106987,9861091,12220963,12237499,2915086,1575190,1847254,8814166,7368982,7328926,5203438,12195886,7728742,6264129,12264382,3800885,12254189,3520757,2089901,7751525,12184037,842054,11207093,12207372,12253020,12075396,11140186,5909388,12288060,685236,11272668,4944839,11068134,9604531,6666139,10743595,1816387,544195,1414963,5839710,10904965,1319118,12260899,7407126,2897330,6313543,9942070,8064358,7287574,3787750,3619222,248409,11397005,3702608,9877401,10111329,5041829,11080408,8615778,11361725,2014637,8464161,11725229,12249660,9056484,6040003,5992998,7738854,8547355,534259,8174910,12254334,491094,10904443,12244734,7276178,6590954,12167522,8441258,12224138,9666766,1729250,12203834,10720514,12294818,9453290,12181030,5253485,12254193,7425849,12430305,2018553,10115869,4535145,10124145,7614369,9192585,3699081,8403537,3241457,12288173,5866857,9359404,1162696,6595936,12168760,10492185,10503160,6624784,1384000,7696991,8826618,599320,10994807,12230207,5435351,9894743,12176279,5299847,11999646,12281875,437707,12286230,5412966,12157182,2583630,10134870,12230286,485742,12251982,12285390,11212202,12289826,12180851,5990282,73490,11618786,12241514,1070234,12258746,5236761,5210042,5690601,9831249,9795249,7681780,12224015,8006673,8634513,16689,6003873,11442633,12070792,12190408,532264,12260152,906520,7699504,1456480,9016262,9136753,586288,5168279,8010647,12159047,12301895,7601279,10311695,6762815,1821143,9613655,4000326,5874558,10238886,524958,8424486,12216270,10754166,8469798,9629694,7950678,12231774,6506550,7756158,11244798,4721042,447078,5893706,12201314,12238706,7361426,7189730,12180050,967929,1938009,9611505,5428065,335416,12100766,12248104,12202816,12204616,6697648,12282904,10589824,8333776,12176824,12229576,8701432,8858375,584272,7280290,7211375,6665783,979218,6228335,9290519,11853191,5469008,12193007,4739550,12231311,11284686,12199182,3437598,12243150,427734,8567862,1850238,5410614,12248598,7568886,7836006,8211986,9050832,4298666,12155666,12216914,12263018,6855410,12212522,12156554,6235682,2406434,7762682,10513562,1938273,5807601,12260889,12022449,5628969,12202569,2147097,9076833,12134385,12220336,8876505,9614505,12200320,12200416,9794464,3266368,11312272,12159112,12259552,6062776,7844464,5581487,8307815,6394367,9987191,12164207,5493767,2449775,931626,12244629,11989487,11483351,7041071,12268439,11432214,9057918,1985945,584838,11199414,12213078,2930838,6561582,12200705,12171318,12260354,7722578,10988498,11459762,10120514,2030810,7985474,3967898,8037602,12199010,2212298,10571961,9287553,12245649,8217753,10491221,2595441,6416697,6519760,8525871,1669768,3131704,11161072,5604040,2244040,766000,917903,12253439,10290477,10972055,12159167,12218519,11908847,3031559,934775,1051199,10393007,9038831,12156222,12157326,3493302,12185238,12251670,2235842,1294850,12254018,5014802,6838298,6914857,9432002,9932337,8988537,7667337,472449,3341985,6365560,9106624,7751392,8315944,2971127,6247024,10903216,12229727,9379631,1518647,11386103,8350823,762095,2324471,11440319,12277751,4952949,344327,1312919,11086511,5967023,12172926,7358598,12037566,12252846,5409750,1013838,11104994,7958910,4943450,12042386,2728610,7725002,8320994,9819410,4982049,6673521,8423361,12187124,8721794,12260481,12244113,12226209,9599481,1772217,1398729,4138137,10574800,6849184,12220936,6982792,4476832,10963888,9157792,889480,6622096,9249928,12045328,8368703,12289727,5473463,2377991,2051327,11734295,10517063,7559567,3161567,8782511,8912838,12278694,12157638,8091462,7546926,1634550,12243222,12260694,760782,10286550,3024386,6571994,8050922,11135474,187850,3987146,11555642,9753074,6703226,871634,10640066,12282602,7382282,6691857,8950737,7555089,8721481,5619945,12232545,1767129,7833009,7739865,9658745,12282993,5198817,3872313,7462480,1370073,4064800,12276376,9896536,7723888,7512040,9104872,8608552,3424744,12167344,854800,1272040,12247679,1808057,12286511,4624943,1897919,11188354,12209639,8474997,8492351,5253942,12197406,4492086,1371846,12241902,5755919,8161446,12205182,12200094,7048254,2019510,2907314,9799950,12227670,12270890,11724050,12137834,4919234,8363162,12252897,12290913,12269673,11492025,9491553,3188697,12206025,518553,2214897,7204425,6429153,1699233,2369416,7322824,12155056,12261976,10616667,10590863,6752152,1369583,6971351,12258359,10873991,12245399,8257834,8052095,11927063,10736783,1941479,443214,1883694,929617,10314246,10151622,6300270,12267990,10609494,3146609,9142261,5954934,8492849,10021586,11728370,6033722,10393693,9049621,10628725,12164858,10297082,12271545,401084,12193425,5182089,4608153,311169,12213321,1000425,11187681,6019425,7743201,4811512,3000472,3902968,12271768,2422864,6456856,11220760,12211312,12278848,7879035,12181360,6963424,6414016,11396619,10653287,11144183,12203039,5365775,8354855,3262031,12162479,5379839,8503350,6428310,1577705,8862726,12159750,10231625,12232782,12183798,5507245,7176325,7521041,12012809,145477,12206485,11206117,12195805,12189692,12222301,12080965,8740069,3499837,12161773,9274261,12254402,9881077,1061911,1861556,9309705,10754036,9511364,7218644,9652172,5054017,12248420,8431220,12032571,4536548,11827563,12222507,12245979,6109803,9748659,12262419,7666827,12247899,5415160,12262395,12229203,7050435,8993403,7905727,12282768,12033515,11433441,9040474,7882514,8983546,9356903,11244911,3870202,7118434,2990770,1618448,9040282,12210442,1587222,6855953,12272345,1986977,2198129,12231977,10174385,12220361,7358321,10905305,814357,8097853,12246233,8113477,11121181,12218581,28909,12225253,12201637,12203605,8431964,4072628,1865540,12259556,3533420,12232124,2842220,2307548,2915348,4634804,4023219,12212835,6943827,7560963,11843283,137451,1394465,11721058,12233794,5911450,12081946,11811058,8240506,1396978,8926841,10024097,9353993,8090057,2098577,12169889,12191825,8222057,4155641,8207921,5970589,12182317,9566797,8853709,590173,7235341,12269653,12247333,12172045,7015885,2020765,12214213,8346709,7618220,11736956,12222500,4498244,12254420,11026388,9545228,11936396,12205412,7928235,7026531,12284883,7408215,1005531,2104323,12202539,1726179,3005307,8177571,4915971,9688786,9564418,4920994,1883410,10708354,5123811,12257602,5215978,12257626,12276874,7884418,6736786,11967545,12258761,3560465,8738681,9351209,10726021,12229165,7273141,9006668,10986901,12192188,6422564,9176252,10329884,9014300,2899172,5336948,11480708,12291860,5999811,2694195,12238515,5573859,12216483,2665131,6834939,9871330,12202930,8630242,12203530,12156946,5875474,12201802,12276473,2059865,8447273,10565897,11325185,11593481,12177545,7548737,10366745,12258353,6965081,11212279,12162233,11062889,11170597,6163429,6856237,10662181,7933429,7838125,7728925,12202573,10638013,12205045,12213325,7706653,1371205,12325731,11598397,11711084,2237732,5754836,1276196,11964452,7893764,11942935,750236,3997652,8247147,12202011,2694686,4261419,12268203,11976819,1454283,7827411,6032619,9432051,1378971,7751067,730323,10719298,4280602,170026,12182458,12339778,11420513,9053777,1618097,425297,6796217,4679345,4724417,2490089,1638896,12201785,9003425,8783153,12167585,9141997,1080277,11072461,12243133,12267637,9282548,10246580,9090303,12239636,12243860,11916260,2160644,11085164,12267116,6589988,8859891,9987644,12310515,12027555,4675467,9605427,9300795,304371,10190739,421162,1493170,745714,12201346,9511306,6891922,2264530,878722,4998634,6486778,12158362,3457193,6148409,12260709,12245297,7709105,12023369,10471529,2601209,11538296,1481681,9612929,6890485,3748213,7559917,1139557,12258589,12281005,12263677,9995653,1431421,10237916,12169748,1097420,10175084,4212236,10847588,10577204,9319220,8557868,12220683,9969363,9957651,1963491,12212523,1262451,11835363,4188243,8775987,12261370,896170,6725986,12178882,12226498,7347058,4205458,7973938,654394,1259993,5909585,4736033,11640726,2319353,12157204,1629641,10641977,5130809,12174805,9248701,12275269,428701,1494740,12227132,1855988,12255740,10056284,34683,9874635,555051,12165051,11099811,9101859,2286003,3263403,9745714,6867003,12305115,12287626,2524594,9813802,12206194,12261058,4292002,12287986,12208162,9239050,12197866,6347421,12162706,12224266,12216401,6616265,9118193,12200177,4747601,12187289,12257633,4186673,4901945,419893,6003949,12158101,12157549,12216325,11346037,8759773,12421165,5620453,10231724,12261548,12245396,7593212,10645244,1198388,9049989,5277524,2371100,9451100,9754539,7686123,12252459,10480587,6538827,10483083,1280811,12248235,6495754,12315010,11868154,12199618,5308714,10139122,12265666,11464389,3463474,9544714,12164729,551057,10785737,12234857,10348505,12150569,5956193,9306473,8278193,12253673,12284345,1753981,11586925,5400709,12287701,12208165,10616551,11280013,3013992,1522776,1808256,7801704,12273013,5575861,9817364,6286076,12227732,12260684,8316020,1773884,4534807,7594231,12155283,12020595,11127915,6968403,12212955,7950411,2170330,8226250,12159802,12185074,2588098,578314,1750234,10956610,9923818,1372625,2558681,7122977,7655548,11396164,5960777,8856473,6262276,6846892,11392405,2058443,2067465,11621472,5430048,1200628,2351280,6636960,1104048,1660111,9438295,4555452,10203415,3746983,1605823,6442399,5885671,6311396,5797406,1368614,5798955,121694,6149438,12272966,12203414,12258003,8355374,9295454,5397446,12335109,1024210,9200877,9568197,3365733,1417725,8221882,11215341,5190587,8857749,2855613,8846181,12281589,12285429,7794604,12285844,11244580,12271937,1037609,7608388,11633380,12227980,11197800,7068412,625900,9931780,11149445,11273112,906000,7701888,6812976,12156792,7586352,12257215,1048351,12182143,8882119,1307599,11370463,12287215,3503527,3695383,1827991,9156415,12221671,9108878,12211646,666878,1960262,12250334,7289486,8597678,11964206,11047221,7987629,12263013,8481789,7564269,9368277,4520092,6803164,8424076,1385956,10321660,7484932,12160084,11151484,12275696,12178708,1605316,7351852,10997304,610248,9080400,12188369,3128520,12210063,11143872,12246840,12218832,4865575,890359,9983551,7069231,1257031,4672807,9469303,12201155,3081919,12277927,12220166,10422494,2324966,9937358,3153830,6984302,11964861,12190749,3001749,12258957,11352933,12208845,1721277,12301005,4141341,11725125,12126237,8699637,6850204,3333580,3684556,3687028,6267772,1135156,6747076,12244372,9156552,12162120,12181128,7416720,11099484,9896040,12161616,6784728,12231960,12146616,1371888,12168288,12220176,12204576,1718904,6427495,8053560,32407,11450047,12199615,8721415,5699671,10585543,418951,2392567,3663542,10078766,12276758,4994486,8087798,5022326,10738382,12261806,12160646,1899686,591542,6739622,9281757,8819181,8196957,10942893,10797549,12225885,11680869,7386117,8060812,6126004,5880268,11934340,5399788,9192148,8004748,2389420,5178028,7596768,12269304,6363024,12160656,10677528,12180216,12298104,7140648,12204744,12258607,9489655,11589535,910903,12226759,10927807,913495,1952839,12246919,971366,3432110,1385815,12183614,11540198,1093190,12259886,349286,4673342,11306757,8868056,5703165,6988797,4525125,12181629,7286901,12195621,10194837,2357301,4983933,8847237,8758533,3313389,2462925,12256245,10604236,8793436,12225988,10752340,11460508,1437580,12241324,6524044,4420564,12112104,12237888,12343008,9238728,1186800,7450896,12158232,10938648,12314184,8053152,12157464,12196080,10606800,11688288,12032503,12187927,5580535,64759,10419655,4618351,10267423,2722807,11169655,12259351,12215143,1331935,8250175,11043755,9479839,12195415,6963079,12282566,7070486,8011910,8521670,12268118,12283046,3452833,4778630,7463685,12289005,93381,9136317,9170157,2157837,12354093,7952253,12309117,385557,11108360,4498588,6695788,6886900,8762620,6088368,12168436,12266668,12223752,12163584,10209360,7091664,9943176,6203040,10308768,5757120,5205864,850992,6489072,5595607,3497647,12201703,2552863,945415,12180535,11654095,12216391,11471287,1355826,360649,1794350,4773350,7325774,12203174,8721926,11438414,12204206,8559326,10411046,5052045,963189,10771965,2669085,8998005,6817629,2947029,9495244,1509268,9120004,5872708,12229876,10575820,351868,8388700,8406604,2934292,597916,12256924,9294984,2664480,2848368,10101481,12180744,10714320,12169200,12235872,6177816,9509953,6470863,934708,2039143,10117183,11245543,10572751,4780639,9724735,12244783,2571823,12227863,10224710,7461374,6835862,4595222,742958,2050454,6550046,8940710,12288254,6776318,8632094,1496030,12167582,5025470,11308142,7454949,714117,6785997,6446373,8687589,12179325,10348629,90117,12203133,9296277,8452365,2634549,2536677,596205,11554311,12187228,12314764,12161548,11063136,12169276,9539764,7689984,11322600,11123280,553440,12258840,12218712,6358560,11215368,12210744,12186408,12195432,12258295,9895879,8481657,2717551,957247,7552471,12168511,12227407,7777423,11802991,10644758,12189686,12175406,8281622,714110,12189758,8571542,12265029,10900269,10674669,5713989,5145189,10741749,217485,6836109,901317,3142876,8592028,7877092,735988,12258916,12200308,12224140,7547572,12284860,958128,9404895,7023971,10365432,11165099,7003632,8451456,4293271,761959,12217135,10854943,11042071,11537911,7246303,10667778,7764631,1534567,8584567,10456482,5772511,5537689,628262,8135318,5870870,12311030,12285926,831470,12164702,9138097,12204429,282669,426567,12186837,11402517,12269973,12002061,10182992,10398525,6422013,12339508,928612,12246124,11501596,8572540,6564892,8330223,8277028,12286479,8325611,12216995,936227,8841395,12203099,8031491,11536571,7762362,8645538,12157482,457914,12170154,12183158,12196982,12158497,12294350,9083545,9332017,8134009,10433545,12208561,12191809,6861385,7046137,8424320,6409842,11627439,12235197,10548861,2062112,9201337,12251240,12185349,7483400,1457055,4664696,12186279,8117463,3695199,9609303,12165543,10949919,6069807,6644943,2753223,9751691,2380407,653771,7103987,3963803,12156443,8220803,7520339,12204875,6737795,1808754,12191538,12223434,9506922,448386,12166770,12165066,11317146,12219073,5466073,4735249,12239209,12259393,378625,7749601,10767625,11083016,1129393,2054048,10975352,11752832,12173927,9097215,5462367,5969991,12169503,9471015,12259023,12227967,12275631,10287903,7065807,3013455,370863,5571039,8128283,3911295,1183931,2108219,2825699,7815899,7056491,12178331,10794755,7601411,7225955,9060443,10794762,857178,8702682,2976306,5312562,9301753,3639858,8180065,9905761,9971809,12339289,8857777,12250496,12190928,9597632,35720,11238632,12198440,8550488,9332696,11731811,11227112,1574624,12262959,2956527,12258159,12212823,7582623,12288999,12109911,10922895,12248363,12271427,12219371,9390827,4523627,553787,12244211,12228011,1382754,4338906,6976074,12244434,3158922,12230946,9668562,12263970,563329,11108449,4267345,1542001,11182681,5130385,5833321,883688,6997784,10344464,12180776,3950864,11458736,3318392,12293504,12069368,12248792,1505984,10271600,5792888,12242096,332696,7557824,11075336,7730271,6333279,9241407,12189903,1373895,13695,12217167,10836615,7931319,6688787,12176312,12365843,709859,845531,11329763,12174515,8031587,12199619,12206034,11904954,11969106,3575034,10702386,12243138,10533618,8432778,10991850,9448218,12277945,10876729,12271129,9121777,9323449,12241153,11860345,1006945,7205377,5864041,10125152,12292184,6099656,4521344,12225272,8998208,4423448,11934128,8411600,12255591,9825495,8906463,1939743,5773695,12225255,8206023,1697943,12129471,12285779,910955,12074771,12250115,3392051,10787010,12182682,10700857,3530034,1855074,12160218,1031346,10943545,12284617,6077641,1268497,1732825,633865,3697585,12161209,927001,4775521,6329737,8648353,1839889,8360137,10515289,12232465,1296001,10007473,12201817,8522216,12249536,8198168,12294344,10747568,11666504,12276512,9633368,12253664,12180896,12249032,1784031,12251271,7729071,5918579,12232959,12231015,10370031,7494135,12325067,10911875,11456099,12271187,10341059,11982995,12261803,6482163,12338363,4128090,1237626,11566938,10992618,478026,3508722,11649618,12168474,7239090,7050042,7046737,12273697,9609961,3311209,2356596,2940937,12201361,12183224,11735432,8328128,12230233,12200312,10410224,12201008,10570496,243608,12293336,1964360,7882716,4640367,517575,8011575,7354527,12221007,12179807,6441999,10922583,10716443,11020691,2904683,7623659,2905691,12293819,12269363,12295530,2996010,12167346,6458394,12257586,9007681,12176065,5074897,6106225,1028089,7970521,11811512,11373176,12228464,10236248,12205040,12185984,2308760,8802663,12214335,5872119,10119231,4862703,12240687,12180903,12326175,9025527,9809535,6912951,12201159,12243299,9210515,12273851,10300091,647387,12329651,12236123,9153762,12168882,12157201,12272370,12204762,6318834,10881402,12277386,5034234,8387689,7536793,12225841,6767017,12249697,12178801,5412265,11524280,3573896,12280935,6841215,12228591,84423,12273011,1527371,12182579,12000035,12227891,12290226,11288283,12239401,11170153,10480105,12131473,12269456,1080176,12259040,12172503,12261231,9141779,12267763,1877933];
    if (my.wildowners && typeof(my.wildowners) != "undefined" && my.wildowners.length > 0)
    {
        my.wildowners = my.wildowners.sort();
      //  alert(my.wildowners);
        my.curid = 0;
        my.daqry = "";
        my.daqrycnt = 0;
        my.unfriendlyalliances = [];
        var tran = my.AllianceList;
        //my.uid = my.wildowners[0];
        tran.fetchPlayerInfo (my.wildowners[0] + "", my, my.playerinfodone);
        return;
    }

    my.wildowners = [];

},





 FindBarbs : function (x, y, maxdist, notify){
// alert("in FindBarbs");
    var t = my.Search;
 //   alert(document.getElementById ('srcType').value);
  //  return;
  t.searchdone = false;
    t.opt.searchType = 0;//document.getElementById ('srcType').value;
    t.opt.startX = x;//parseInt(document.getElementById ('srchX').value);
    t.opt.startY = y;//parseInt(document.getElementById ('srchY').value);
    t.opt.maxDistance =  maxdist; //parseInt(document.getElementById ('srcDist').value);
    errMsg = '';
      t.searchRunning = true;
  //alert(Options);
      Options.srcMinLevel = 2;//document.getElementById('filMinLvl').value;
//      saveOptions();
//      t.dispMapTable ();

      Options.srcMaxLevel = 3;//document.getElementById('filMaxLvl').value;
//      saveOptions();
//      t.dispMapTable ();

    
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX - (-1) * t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY - (-1) * t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.normalizeCoord(t.curX);
    var yyy = t.normalizeCoord(t.curY);
    //alert("beforemaprequest");
  //  alert("before calline mapresuest");


    setTimeout (function(){my.Search.MapRequest(xxx, yyy, 30, t.mapCallback2)}, MAP_DELAY);
  },

 

/** mapdata.userInfo:
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/
  mapCallback2 : function (left, top, width, rslt){
 //   alert("mapcallback2");
  //  for (k in rslt)
  //      alert(rslt[k]);
    
    var t = my.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      return;
    }

    map = rslt.data;
    my.daqry = "";
   my.daqrycnt = 0;
   // var cntr = 0;
    for (k in map){
/***
 0: bog
10: grassland
11: lake
20: woods
30: hills
40: mountain
50: plain
51: city / barb
53: misted city
***/  
  
      if (map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } 
      else if (map[k].tileType>=10 &&  map[k].tileType<=50) {
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      }
      else
      {
        continue;
      }
      dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
  //    if (dist > t.opt.maxDistance)
  //    {
//      alert("distance not ok " + dist + ":" + t.opt.maxDistance);
  //       continue;
  //    }

      var tlvl = map[k].tileLevel + "";
    //  if (tlvl != "1" && tlvl != "2" && tlvl != "3")
    //    continue;

        isOwned = map[k].tileUserId>0 || map[k].misted;
	
   // var uname = "";
 //  alert("before adding newel");
 
    var newel = [map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (new Date()).getTime() - (60 * 60 * 1000), map[k].tileId];
   newel.x = map[k].xCoord;
   newel.y = map[k].yCoord;
   newel.type = type;
   newel.tileLevel = map[k].tileLevel;
   newel.isOwned = isOwned;
   newel.lastTime = (new Date()).getTime() - (60 * 60 * 1000);
   newel.tileId = map[k].tileId;
   newel.isbarbel = newel.type == 0 && (newel.tileLevel == 1 || newel.tileLevel == 2 || newel.tileLevel == 3);
   newel.iscrestel =  newel.tileLevel == my.Search.crestlvl && newel.type != 0 && !newel.isOwned;
   newel.isbugel = false;
 //  if (newel.iscrestel)
 //        document.getElementById("srcResults").innerHTML = "lv8 wild found at " + newel.x + "," + newel.y + "<br/>" + document.getElementById("srcResults").innerHTML
   //     alert("adding newel");
        t.mapDat.push (newel);
        ++t.tilesFound;
    }

     //   alert("okay");
    
  //  alert("mapcallback2 b");
    t.tilesSearched += (15*15);
        //  document.getElementById("srcResults").innerHTML = "before sort<br/>" + document.getElementById("srcResults").innerHTML;

    t.RemoveDoubles();
         //    document.getElementById("srcResults").innerHTML = "after sort<br/>" + document.getElementById("srcResults").innerHTML;

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        //t.stopSearch ('Done!');
  //    alert("done");
      t.citiessearched++;
      if (t.citiessearched < Cities.numCities)
      {
   //   document.getElementById("srcResults").innerHTML = "about to search city " + t.citiessearched + "<br/>" + document.getElementById("srcResults").innerHTML;
            
            var cit = Cities.cities[t.citiessearched];

            t.FindBarbs(cit.x, cit.y, 30, function() { alert("notify called"); });
      }
      else
      {
      t.searchdone = true;
        
   //   document.getElementById("srcResults").innerHTML = "searched " + t.citiessearched + " cities<br/>" + document.getElementById("srcResults").innerHTML;
      
      }
        return;
      }
    }
    
    var x = t.normalizeCoord(t.curX);
    var y = t.normalizeCoord(t.curY);
//    document.getElementById ('statStatus').innerHTML = 'Searching at '+ x +','+ y;
  //  alert("mapcallback2 end");
    setTimeout (function(){my.Search.MapRequest(x, y, 30, t.mapCallback2)}, MAP_DELAY);
  },



  mapDat : [],

  RemoveDoubles : function() {
  this.mapDat.sort(function(a, b) { return ((a[0] << 10) + a[1]) + ((b[0] << 10) + b[1]);  });
    if (!this.mapDat || this.mapDat.length == 0) return;
      var newmapdat = [this.mapDat[0]];
      for (var r = 1; r < this.mapDat.length; r++)
      {
        var elp = this.mapDat[r - 1];
        var el = this.mapDat[r];
        if (elp[0] != el[0] || elp[1] != el[1])
            newmapdat.push(el);
      }
      this.mapDat = newmapdat;
  
  }

};







function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}




function eventHideShow (){
  if (mainDiv.style.display == 'block'){
    mainDiv.style.display = 'none';
    my[currentName].hide();
  } else {
    mainDiv.style.display = 'block';
    my[currentName].show();
  }
}

function hideMe (){
  mainDiv.style.display = 'none';
  my[currentName].hide();
}


function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  scr = document.createElement('script');
	scr.innerHTML = func.toString();
	document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
  	var scr=document.createElement('script');
  	scr.innerHTML=js;
  	document.body.appendChild(scr);
  	return true;
  } catch (err) {
    return false;
  }
}


function addTab (label, id){
  var buts=document.getElementById('idButs');
  var a=document.createElement('a');
  a.className='matTabNotSel';
  a.id = 'aa'+id;
  a.innerHTML='<span id="sp'+ id +'" class="matTab">'+label+'</span>';
  buts.appendChild(a);
  a.addEventListener('click', clickedTab, false);
  return a;
}

function setCities(){
  Cities.numCities = Seed.cities.length;
//  Cities.curCityID = unsafeWindow.currentcityid;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = Seed.cities[i][0];
    city.name = Seed.cities[i][1];
    city.x = Seed.cities[i][2];
    city.y = Seed.cities[i][3];
    city.tileId = Seed.cities[i][5];
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}


function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}


/***
marchtype:  1: transport
            2: reinforce
            3: scout
            4: attack
            5: reassign

marchstatus 1: marching
            2: defending
            8: returning
            9: aborting

***/

// TODO: Check times for expired marches !?!?!
// note: unselected city has outdated info

function getMarchInfo (){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }

  var now = unixTime();

  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'city'+ Cities.cities[i].id;
    for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if (typeof (march) == 'object'){
        for (ii = 0; ii<13; ii++){
          ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
          ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
        }
        for (ii=1; ii<5; ii++){
          ret.resources[ii] += parseInt (march['resource'+ ii]);
        }
          ret.resources[0] += parseInt (march['gold']);
      }

// TODO: fixup completed marches
// TODO: Assume transport is complete ?

    }
  }
  return ret;
}


// returns {count, maxlevel}  
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};  
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

function clickDebug(){
  debugWin();
  var myseed = unsafeWindow.Object.clone (Seed);
  delete myseed.tech;
  delete myseed.tutorial;
  delete myseed.items;
  delete myseed.quests;
  delete myseed.wilderness;
  delete myseed.wildDef;
  delete myseed.buildings;
  delete myseed.knights;
  delete myseed.allianceDiplomacies;
  delete myseed.appFriends;
  delete myseed.players;
  debugTA.innerHTML = "seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (myseed, 8, 1);
  myseed=null;
}


function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function createPopup (content){
  div = document.createElement('div');
  var kochead = unsafeWindow.document.getElementById('kochead');
  kochead.appendChild(div);
  div.style.background = "#ffc";
  div.style.border = "3px ridge #666";
  div.style.zIndex = "200000";        // KOC modal is 100210 ?
  div.style.display = 'none';
  div.style.width = '720px';
  div.style.height = '700px';
  div.style.position = "relative";
  div.style.top = "0px";
  div.style.left = "15px";
  div.innerHTML = content;
  return div;
}


function createPopup2 (content, width, height, zIndex){
  div = document.createElement('div');
  var kochead = unsafeWindow.document.getElementById('kochead');
  kochead.appendChild(div);
  div.style.background = "#ffc";
  div.style.border = "3px ridge #666";
  div.style.zIndex = zIndex+'';
  div.style.display = 'none';
  div.style.width = width+'px';
  div.style.height = height+'px';
  div.innerHTML = content;
  return div;
}


// example: http://www150.kingdomsofcamelot.com
function GetServerId() {
  var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
  if(m)
    return m[1];
  return '';
}

function logit (msg){
  var serverID = GetServerId();
  var now = new Date();
  GM_log (serverID +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

function createWindow (url, name, width, height) {
  w = window.open(url, name, 'width='+width+',height='+height);
  return w;
}

var winDebug = null;
var debugTA = null;
function debugWin(){
  if (!winDebug || winDebug.closed){
    winDebug = createWindow ('', 'debug', 900, 700);
    winDebug.document.write ('<BR><TEXTAREA readonly id=debugTA cols=100 rows=40></textarea><BR>');
    debugTA = winDebug.document.getElementById ('debugTA');
  }
  winDebug.focus();
}

function saveOptions (){
  var serverID = GetServerId();
  GM_setValue ('Options_'+serverID, JSON2.stringify(Options));
}

function readOptions (){
  var serverID = GetServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Options[k] = opts[k];
  }
}



function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a; 
}

function AddMainTabLink(text, eventListener) {
  var a = createButton (text);
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs) 
      tabs=tabs.parentNode;
  }
// TODO: Fit 'POW' button in main div if there's room (make room by shortening 'Invite Friends' to 'Invite' ?)
  if(tabs) {
    var eNew = document.getElementById('gmTabs');
    if (eNew == null){
      eNew = document.createElement('div');
      eNew.className='tabs_engagement';
      eNew.style.background='#ca5';
      tabs.parentNode.insertBefore (eNew, tabs);
      eNew.id = 'gmTabs';
      eNew.style.whiteSpace='nowrap';
      eNew.style.width='735px';
    }
    eNew.appendChild(a);
    a.addEventListener('click',eventListener, false);
    return a;
  }
  window.setTimeout ( function (){AddMainTabLink (text, eventListener)}, 2000);
  return null;
}



/**********************************************************************************/

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,
      
  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },
  
  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },
  
  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },
  
  _sendit : function (msg, notify){  
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },  
      onFailure: function(transport) {
        if (notify)
          notify ();
      }  
    });
  },
}










function makePOSTRequest(url, parameters, cbf) {
    var http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // set type accordingly to anticipated content type
            //http_request.overrideMimeType('text/xml');
            http_request.overrideMimeType('text/html');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    }
    if (!http_request) {
        alert('Cannot create XMLHTTP instance');
        return false;
    }

    http_request.onreadystatechange = function() { 
        if (http_request.readyState == 4) {
            if (http_request.status == 200) { cbf(http_request.responseText); 
            }
        } 
    };

    http_request.open('POST', url, true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.setRequestHeader("Content-length", parameters.length);
    http_request.setRequestHeader("Connection", "close");
    http_request.send(parameters);
}

function makeJSONRequest(url, parameters, cbfOK) {
    var strparams = "";
    for (k in parameters)
    {
        if (strparams != "")
            strparams += "&";
        strparams += k + "=" + urlencode(parameters[k]);
    }
    makePOSTRequest(url, strparams, function (str) {

                var resp = str;
                cbfOK(eval("(" + resp + ")"));

    });
}

function urlencode(str) {
    var ret = escape(str).replace(/\+/g, '%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
    return ret;
}



    setTimeout(my.Search.AutoHelp, 1000);

    

//fram = my.Search.createIframe("ifmain", 10,10);
//frm.src = "http://www.google.com";





