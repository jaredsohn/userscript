// ==UserScript==
// @name           KOC Power Tools
// @namespace    OmensRevenge
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @description    Enhancements and bug fixes for Kingdoms of Camelot
// @require        http://tomchapin.me/auto-updater.php?id=103659
// ==/UserScript==
TD align=left class=ptentry><B>Build Traps:</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i 
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=ptentry></td>';
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Cost: <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("SET DEFENSES", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Gold: <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
      } else {
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';
      }         
    }
    document.getElementById('wildContent').innerHTML = m + '</table></div>';
    document.getElementById('ptwref').addEventListener ('click', t.show, false);
    t.updateGold ();
  },
    
  e_butWildSet : function (c){
    var t = Tabs.Wilds;
    var totTraps = 0;  
    var cid = Cities.cities[c].id;
    t.buildList = {cityId:cid, list:[]};
          
    for (var w=0; w<t.wildList[c].length; w++){
      var wild = Seed.wilderness['city'+cid]['t'+t.wildList[c][w][0]]; 
      var wildDef = Seed.wildDef['t'+t.wildList[c][w][0]];
// TODO: Seed.wildDef is null if just aquired 
if (wildDef==undefined || !wildDef)
  wildDef = {fort60Count:0, mercLevel:0};
    
      var numTraps = parseInt(document.getElementById('ptwt_'+ c +'_'+ w).value, 10);
      if (isNaN(numTraps))
        numTraps = 0;
      totTraps += numTraps;
      if (numTraps > 0)
        t.buildList.list.push (['T', wild.tileId, numTraps]);
      var mercId =document.getElementById('ptwm_'+ c +'_'+ w).value; 
      if (wildDef.mercLevel != mercId)
        t.buildList.list.push (['M', wild.tileId, mercId, wildDef.mercLevel]);
    }

    var totCost = totTraps * 200; 
    if (totCost > parseInt(Seed.citystats['city'+cid].gold[0])){
      document.getElementById('ptwgc_'+ c).innerHTML = '<SPAN class=boldRed>'+ addCommasInt(totCost) +'</span>';
      return; 
    }
    if (t.buildList.list.length == 0)
      return;
    t.setCurtain (true);
    var popDiv = t.setPopup (true);
    popDiv.innerHTML = '<TABLE class=ptTab width=100% height=100%><TR><TD>\
          <DIV class=ptstat>Setting Wilderness Defenses</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('CANCEL', 'id=ptWildCancel') +'</td></tr></table>';
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);
    t.processQue(null);  
  },
  
  e_buildCancel : function (){
    var t = Tabs.Wilds;
    t.setCurtain(false);
    t.setPopup(false);
    t.show();
  },
  
  processQue : function (errMsg){
    var t = Tabs.Wilds;
    var what = t.buildList.list.shift();
    var div = document.getElementById('ptWildBuildDiv');
    if (what==null || errMsg){
      if (errMsg)
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERROR: '+ errMsg +'</span>';
      else
        div.innerHTML += 'Done.<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'CLOSE'; 
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += 'Done.<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Building '+ what[2] +' traps for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Setting Mercenaries to '+ mercNames[what[2]] +' for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);
    }
  },
  
  setPopup : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var div = document.createElement('div');
      div.id = 'ptWildPop';
      div.style.backgroundColor = '#fff';
      div.style.zindex = mainPop.div.zIndex+2;
      div.style.opacity = '1';
      div.style.border = '3px outset red';
      div.style.width = '550px';
      div.style.height = '300px';
      div.style.display = 'block';
      div.style.position = 'absolute';
      div.style.top = '100px';
      div.style.left = '100px';
      t.cont.appendChild (div);
      return div;
    } else {
      t.cont.removeChild (document.getElementById('ptWildPop'));
    }
  },

  setCurtain : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var off = getAbsoluteOffsets (t.cont);
      var curtain = document.createElement('div');
      curtain.id = 'ptWildCurtain';
      curtain.style.zindex = mainPop.div.zIndex+1;
      curtain.style.backgroundColor = "#000000";
      curtain.style.opacity = '0.5';
      curtain.style.width = t.cont.clientWidth +'px';
      curtain.style.height = t.cont.clientHeight +'px';
      curtain.style.display = 'block';
      curtain.style.position = 'absolute';
      curtain.style.top = off.top + 'px';
      curtain.style.left = off.left + 'px';
      t.cont.appendChild (curtain);
    } else {
      t.cont.removeChild (document.getElementById('ptWildCurtain'));
    }
  },
  
  e_butMaxTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr(7);
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);
    inp.value = t.wildList[c][w][1];
    t.e_inpTraps (inp);
  },
  
  e_inpTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr (7);
    var tot = 0;
    for (var i=0; i<t.wildList[c].length; i++) {
      var val = parseInt(document.getElementById('ptwt_'+ c +'_'+ i).value, 10);
      if (isNaN(val))
        val = 0;
      tot += val;
    }  
    document.getElementById('ptwgc_'+ c).innerHTML = addCommasInt(tot * 200);
    if (isNaN(e.value) || e.value<0 || e.value>t.wildList[c][w][1]){
      e.value = '';
      e.style.backgroundColor = '#ffaaaa'; 
    } else
      e.style.backgroundColor = null; 
  },

  updateGold : function (){
    var t = Tabs.Wilds;
    for (var c=0; c<Cities.numCities; c++){
      var e = document.getElementById('ptwgt_'+ c +'');
      if (e)
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);
    }
    t.upGoldTimer = setTimeout (t.updateGold, 2000);
  },
  
  postBuyTraps : function (cid, tid, quant, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify(null)}, 1500);
      return;
    }
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.quant = quant;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/buyWildTraps.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].fort60Count = parseInt(Seed.wildDef["t"+ tid].fort60Count) + parseInt(quant);
        }  
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

  postHireMercs : function (cid, tid, newLevel, oldLevel, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify('OK, so it\'s not really an error, it\'s just George playing around to see how the error message looks. It\'s a long one, how does it fit? Is it OK? Are you sure? JANE! Get me off of this thing!')}, 1500);
      return;
    }
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.lv = newLevel;
    params.olv = oldLevel;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/hireWildMerc.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].mercLevel = newLevel;
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },
          
}    
 
   
/*************** KNIGHTS TAB *********************/
Tabs.Knights = {
  tabOrder : 30,
  tabLabel : uW.g_js_strings.commonstr.knight,
  cont : null,
  displayTimer : null,

  init : function (div){
    var t = Tabs.Knights;
    t.cont = div;
    uW.ptAssignSkill = t.clickedAssignPoints;
    t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad {background-color:#ffffff; padding-left:15px}</style>\
       <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
  },

  hide : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
    
    function _dispKnight (roleId, knight){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';  
      if (row++ % 2)
        sty = 'class=ptOddrow ';        
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += '--------</td><TD colspan=4></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=ptentry align=left colspan=4>Marching</td>';
        } else {  
          if (unpoints > 0){
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';
          for (var i=0; i<4; i++){
            var sty = 'padding-left:1px;';
            if (i == rid)   // bold it
              sty += 'font-weight:bold;color:#116654';
            ass += '<TD class=ptentry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>'; 
          }
          } 
          else
            ass = '<TD class=ptentry colspan=4></td>';
        }  
        var skills = [];
        for (var i=0; i<4; i++){
          if (i == rid)
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>'; 
          else
            skills[i] = knight[knightRoles[i][1]]; 
        }          
        m += knight.knightName + '</td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<TD>'+ addCommas(salary) 
          +'</td><TD>'+ level +'</td></tr>';
      }
      return m;
    }          
    
    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=13><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=160 align=center>Name</td><TD width=26>Pol</td><TD width=26>Com</td>\
          <TD width=26>Int</td><TD width=26>Res</td><TD width=90 align=center colspan=5>--- Unassigned ---</td><TD width=40 align=right> Salary </td><TD width=35>Level</td></tr>';
      totSalary = 0;
      var did = {}; 
      var row = 0;
      for (var i=0; i<knightRoles.length; i++){
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];
        if (leader == 0)
          m += _dispKnight (i, null);
        else {
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader]);
          did['knt'+leader] = true;
        }
      }
      var list = [];
      for (k in Seed.knights['city'+cid]){
        if (!did[k])
          list.push (Seed.knights['city'+cid][k]);
      }
      list.sort (function (a,b){return parseInt(b.combat)-parseInt(a.combat)});
      for (i=0; i<list.length; i++)
        m += _dispKnight (null, list[i]);
      m += '<TR align=right><TD colspan=11><B>Total Salary:</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';        
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
    t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
      
    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){
      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Marching';
      return; 
    }
    sk = [];
    var unassigned = parseInt(Math.sqrt(parseInt(knight.experience)/75)) + 1  - parseInt(knight.skillPointsApplied);        
    for (var i=0; i<4; i++){
      sk[i] = parseInt(knight[knightRoles[i][1]]);
      if (i == rid)
        sk[i] += unassigned;
    }
    var row = e.parentNode.parentNode;
    for (i=row.cells.length-1; i>=1; i--)
      row.deleteCell (i);
    var newCell=row.insertCell(-1);
    newCell.colSpan = 12;
    newCell.align= 'left';
    newCell.style.padding='1px 5px 1px 10px';
    var div = document.createElement ('div');
    div.style.backgroundColor = '#ffffff';
    div.style.textAlign = 'center';
    div.style.border = '1px solid';
    div.style.width = '98%';
    div.style.whiteSpace = 'normal';
    newCell.appendChild (div);
    div.innerHTML = 'Assigning '+ unassigned +' skill points to '+ knightRoles[rid][1] +' ... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});  
  },
  
  postDone : function (rslt, div){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Done.</b>';
      t.displayTimer = setTimeout (t.show, 5000);
    } else {
      div.innerHTML += '<BR><SPAN class=boldRed>ERROR: '+ rslt.errorMsg +'</span>';
      t.displayTimer = setTimeout (t.show, 10000);
    }
  },
  
  postSkillPoints : function (cid, kid, pol, com, int, res, notify){  
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.cid = cid;
    params.kid = kid;
    params.p = pol;
    params.c = com;
    params.i = int;
    params.r = res;
    if (DISABLE_POST_KNIGHT_SKILLS){   
      setTimeout (function (){notify({ok:true})}, 1500);    
//      setTimeout (  function (){notify({ok:false, errorMsg:"FAKE ERROR message, a long one, to test how it will fit and overflow! Perhaps you'll need to retry?"})}  , 2000);    
      return;  
    }
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/skillupKnight.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          var knight = Seed.knights["city" + cid]["knt" + kid];
          var up = pol + com + int + res - knight.politics - knight.combat - knight.intelligence - knight.resourcefulness;
          knight.politics = pol;
          knight.combat = com;
          knight.intelligence = int;
          knight.resourcefulness = res;
          knight.skillPointsApplied = (parseInt(knight.skillPointsApplied) + up).toString();
        } 
        if (notify)
          notify (rslt);
      },
      onFailure: function () {
        if (notify)
          notify (rslt);
      },
    });
  },
};


/**************/

var messageNav = {
  mmFunc : null,
  mmsFunc : null,
  
  init : function (){
    t = messageNav;
    t.mmFunc = new CalterUwFunc ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
    t.mmsFunc = new CalterUwFunc ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
    uW.messageNav_hook = messageNav.hook;
    uW.modal_messages_send_hook = messageNav.msgSendHook;
    t.mmFunc.setEnable (true);
    t.mmsFunc.setEnable (true);
  },

  setEnable : function (tf){
  },

  isAvailable : function (){
    t = messageNav;
    return t.mmFunc.isAvailable();
  },
  
  hook : function (){
    if (!Options.enhanceMsging)
      return;
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
    uW.modal_messages_compose();
  },

  msgSendHook : function (){
    if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)
      return false;
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Sent to all officers]';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new AjaxRequest(uW.g_ajaxpath + "ajax/sendMessage.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
                uW.Modal.showAlert(uW.g_js_strings.modal_messages_send.msgsent);
                document.getElementById('modal_msg_write_to').value = "";
                document.getElementById('modal_msg_write_subj').value = "";
                document.getElementById('modal_msg_write_txt').value = ""
            } else {
                uW.Modal.showAlert(uW.g_js_strings.modal_messages_send.enterexistingname)
            }
        },
        onFailure: function () {
          uW.Modal.showAlert(uW.g_js_strings.modal_messages_send.oopscompose)
        },
    });
    return true;
  },
}


var AttackDialog = {
  init : function (){
    var t = AttackDialog;
    t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/}\s*$/, 'attackDialog_hook(); }']]);
    uW.attackDialog_hook = t.modalAttackHook;
    t.modal_attackFunc.setEnable (true);
  },
  
  setEnable : function (){
  },

  isKnightSelectAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
  isAttackCityPickerAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
    
  modalAttackHook : function (){
    var t = AttackDialog;
    if (Options.fixKnightSelect || Options.attackCityPicker){
      for (var i=1; i<6; i++)
        document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);
    }
    if (Options.attackCityPicker){
      setTimeout (t.initCityPicker, 0);
    }      
  },
  
  initCityPicker : function (){
    var t = AttackDialog;
    var div = document.getElementById('modal_attack_target_numflag'); // as of KofC version 96;
    var mySpan;
    if (div) {
      div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    } else {
      var span = document.getElementById('modal_attack_target_coords');   // KofC version 116+;
      span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    }
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);
    var cityIdx = Cities.byID[uW.currentcityid].idx;
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);
    thisCityBut.style.opacity = '0.5';
    thisCityBut.disabled = true;
    if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected')   // don't do for attack or scout
      document.getElementById('modal_attack_citybuts').style.display = 'none';
  },
  
  e_CityButton : function (city){
    document.getElementById('modal_attack_target_coords_x').value = city.x;
    document.getElementById('modal_attack_target_coords_y').value = city.y;
    uW.modal_attack_update_time();
  },
      
  e_changeMarchType : function (evt){
    var t = AttackDialog;
    var marchType = parseInt(evt.target.id.substr(17));  
    if (Options.attackCityPicker){
      if (marchType==3 || marchType==4)
        document.getElementById('modal_attack_citybuts').style.display = 'none';
      else
        document.getElementById('modal_attack_citybuts').style.display = 'inline';
    }
    if (Options.fixKnightSelect){
      var knightVal = 0;
      var selector = document.getElementById('modal_attack_knight'); 
      if (selector.length>1 && (marchType==4 || marchType==2))   // if 'attack' or 'reinforce'
        knightVal = 1;
      selector.selectedIndex = knightVal;
    }
  },  
}


var AllianceReports = {
  checkPeriod : 300,
  allianceNames : [],
  saveArfunc : uW.allianceReports,

  init : function (){
    t = AllianceReports;
    t.enable (Options.enhanceARpts);
    t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);
    uW.getReportDisplay_hook2 = t.getReportDisplayHook;
    t.marvFunc.setEnable (true);
  },
   
  getReportDisplayHook : function (a, b){
    var x = '';
    try {
      x = uW.getReportDisplay(a,b);  
    } catch (e){
      x = 'Error formatting report: '+ e;
    }
    return x;
  },
  
  enable : function (tf){
    t = AllianceReports;
    if (tf)
      uW.allianceReports = t.myAllianceReports;
    else
      uW.allianceReports = t.saveArfunc;
  },
  
  myAllianceReports : function (pageNum){
    var params = uW.Object.clone(uW.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/listReports.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
//logit (inspect (rslt, 1, 1));        
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'>");
      var rptkeys = uW.Object.keys(ar);
      if (matTypeof(ar) != 'array') {
//logit ('displayReports: '+ Options.allowAlterAR);        
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td></tr></thead><tbody>");
        for (var i = 0; i < rptkeys.length; i++) {
          var rpt = ar[rptkeys[i]];
          var colClass = '"myCol"';
          rpt.marchType = parseInt(rpt.marchType);
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
          if (rpt.marchType == 2){
            colClass = '"myCol myRein"';
          } else if (rpt.side1AllianceId != myAllianceId){
            colClass = '"myCol myHostile"';
          } else {
            if (parseInt(rpt.side0TileType) < 50){          // if wild
              if (parseInt(rpt.side0PlayerId) == 0)
                colClass = '"myCol myGray"';
              else
                colClass = '"myCol myWarn"';
            } else if (parseInt(rpt.side0PlayerId) == 0) {   // barb
              colClass = '"myCol myGray"';
            } else {
              if (targetDiplomacy == 'friendly')
                colClass = '"myCol myWarn"';
            }
          }
//logit (inspect (ar, 3, 1));
          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(uW.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId);          
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          if (rpt.marchType == 1)
            msg.push (uW.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (uW.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Reinf');
          else
            msg.push (uW.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]))
          else
            msg.push ('?Unknown?');
            msg.push (' ');
            msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));
            msg.push ('<BR>');
          
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // target ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // wild
            msg.push(uW.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(uW.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          msg.push (' ');
          msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));
          if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }

          
/***
        
MY reports, reins works ...
<div><a href="#" onclick="jQuery('#modal_msg_body').trigger('viewReinforcedReport', ['6076798','67674','Elroy','IV','13412958','Duke_Swan','6329','Erisvil',662,477]);return false;">View Report</a></div>

    
OK: <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6044155&quot;,0,51,9,2282354,&quot;Jetson&quot;,&quot;M&quot;,&quot;Joe7z6bq&quot;,&quot;M&quot;,4,668,437,1299747584,0,643,407);return false;">View</a></div>           
ERROR (Reinf): <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View</a>
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;'>View</a>                        
modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
***/          
          
          
          // 'view report' link ...
          if (Options.allowAlterAR)
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\"");   // ONCLICK ???
          else
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\"");   // ONCLICK ???
          msg.push(rpt.reportId);
          msg.push('",');
          if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))
            msg.push(1);
          else
            msg.push(0);
          msg.push(",");
          msg.push(rpt.side0TileType);
          msg.push(",");
          msg.push(rpt.side0TileLevel);
          msg.push(",");
          msg.push(rpt.side0PlayerId);
          msg.push(',"');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side0PlayerId]));
          else
            msg.push(uW.g_js_strings.commonstr.enemy);
          msg.push('","');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side0PlayerId]));
          else
            msg.push(0)
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) > 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]));
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side1PlayerId]));
          msg.push('",');
          msg.push(rpt.marchType);
          msg.push(",");
          msg.push(rpt.side0XCoord);
          msg.push(",");
          msg.push(rpt.side0YCoord);
          msg.push(",");
          msg.push(rpt.reportUnixTime);
          msg.push(",");
          if (parseInt(rpt.reportStatus) == 2)
            msg.push(1);
          else
            msg.push(0);
          if (rpt.side1XCoord) {
            msg.push(",");
            msg.push(rpt.side1XCoord);
            msg.push(",");
            msg.push(rpt.side1YCoord)
          } else {
            msg.push(",,");
          }
          msg.push(");return false;'>View</a></div></td></tr>");
        }
        msg.push("</tbody></table></div>");
      }
      msg.push("</div><div id='modal_report_list_pagination'></div>");
      document.getElementById('allianceContent').innerHTML = msg.join("");
      if (pageNum) {
        uW.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
      } else {
        uW.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")
      }
    }
  },

}   // end AllianceReports singleton



/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){  
    var f = FoodAlerts;
    var now = unixTime();
      row = [];

      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        if (usage < 0) { 
    if (Options.enableFoodTower && timeLeft<(6*3600)) {
                msg += 'My city ' + Cities.cities[i].name.substring(0,10) + ' (' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += ' is low on food. Remaining: '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') Upkeep: '+addCommas(usage);
                sendChat ("/a " + msg);
          }
    }
      } 
  f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
  }, 
}



/************************ Tower Alerts ************************/
var TowerAlerts = {
  viewImpendingFunc : null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  towerMarches : {},    // track all marches that have been posted to alliance chat
  
  init : function (){
    var t = TowerAlerts; 
    var s = GM_getValue ('towerMarches_'+GetServerId());
    if (s != null)
      t.towerMarches = JSON2.parse (s);
 
    t.viewImpendingFunc = new CalterUwFunc ('attack_viewimpending_view', [[/Modal.showModal\((.*)\)/im, 'Modal.showModal\($1\); ptViewImpending_hook(a);']]);
    uW.ptViewImpending_hook = t.viewImpending_hook;
    t.viewImpendingFunc.setEnable (true);

    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    uW.ptGenerateIncoming_hook = t.generateIncoming_hook;
  },
    
  // fix 'target', add button  
  viewImpending_hook : function (atkinc){    
    var t = TowerAlerts;  
    var div = document.getElementById('modal_attackimpending_view');
    var isFalse = false;
    if (t.fixTargetEnabled){ 
      var city = Cities.byID[atkinc.toCityId];
      var target = '';
      if (!city || (atkinc.marchType!=3 && atkinc.marchType!=4)){  
        target = '<B>FALSE REPORT!</b>';
        isFalse = true;
      } else if (city.tileId == atkinc.toTileId){
        target = city.name + ' ('+ city.x + ','+ city.y +')';
      } else {
        wilds = Seed.wilderness['city'+atkinc.toCityId];
        m = '';
        for (k in wilds){
          if (wilds[k].tileId == atkinc.toTileId){
            m = 'at '+ wilds[k].xCoord + ','+ wilds[k].yCoord;
            break;
          }
        }
        target = city.name + ', <B>WILD '+ m +'</b>';
      }
      div.childNodes[0].innerHTML = '<B>Target: </b>'+ target;
    }
    if (!isFalse){
      var d = document.createElement ('div');
      d.innerHTML = '<BR><TABLE><TR><TD><a id=towerPostToChat class=button20><span>Post to Alliance Chat</span></a></td></tr></table>';
      div.appendChild (d);
      document.getElementById('towerPostToChat').addEventListener('click', function (){t.e_buttonPostToChat(atkinc)}, false);
    }
  },

  // fix false reports  
  generateIncoming_hook : function (){    
    return false;
  },
  
  enableFixFalseReports : function (tf){
    var t = TowerAlerts;  
    t.generateIncomingFunc.setEnable (tf);
  },
  enableFixTarget : function (tf){
    var t = TowerAlerts;  
    t.fixTargetEnabled = tf;
  },
  
  isFixTargetAvailable : function (){
    var t = TowerAlerts;  
    return t.viewImpendingFunc.isAvailable();
  },
  isFixFalseReportsAvailable : function (){
    var t = TowerAlerts;  
    return t.generateIncomingFunc.isAvailable();
  },
  
  
  postToChatOptions : {aChat:false},

  setPostToChatOptions : function (obj){
    var t = TowerAlerts;
    t.postToChatOptions = obj;
    clearTimeout(t.secondTimer);
  },

  e_buttonPostToChat : function (march){
    var t = TowerAlerts;
    t.postToChat (march, true);
    uW.Modal.hideModal();
  },
  
  postToChat : function (m, force){
    var t = TowerAlerts;
    
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    if (m.marchType == 3){
      if (!t.postToChatOptions.scouting && !force)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!t.postToChatOptions.wilds && !force)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Unknown';
  
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = '';
    if (!force)
      msg = t.postToChatOptions.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +'. Incoming Troops (arriving in '+
        uW.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ uW.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if ((totTroops < t.postToChatOptions.minTroops) && !force)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){ 
 //         if (Seed.queue_atkinc[k].marchType==2 && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
      }
    }
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
  },
  
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x; 
}
function parseIntZero (n){
  if (n == '')
    return 0;
  return parseInt(n, 10);
}

/*********************************** Players TAB ***********************************/



function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3) 	
    return uW.allianceOfficerTypeMapping[3];
  else if (oid==2)
    return uW.allianceOfficerTypeMapping[2];
  else if (oid==1)
    return uW.allianceOfficerTypeMapping[1];
    else if (oid==4)
    return uW.allianceOfficerTypeMapping[4];
  return '';
}

Tabs.AllianceList = {
  tabOrder : 25,
  tabLabel : uW.g_js_strings.commonstr.player,
  cont : null,
  dat : [],
  

/***
ajax/viewCourt.php:
  (boolean) ok = true
  (array) courtItems = 

  (string) dailyActionFlag = 0
  (object) playerInfo = [object Object]
    (string) datejoinUnixTime = 1294440708
    (string) truceExpireUnixTime = 0
    (string) userId = 4394121
    (string) displayName = Vakasade
    (string) email = 
    (string) fbuid = 100000977751880
    (string) playerSex = F
    (string) usertype = 1
    (string) status = 1
    (string) dateJoined = 2011-01-07 14:51:48
    (string) lastLogin = 2011-03-13 13:11:34
    (string) eventTimestamp = 0000-00-00 00:00:00
    (string) eventStatus = 1
    (string) warStatus = 1
    (string) allianceId = 85
    (number) might = 1192710
    (string) title = 57
    (string) truceExpireTimestamp = 0000-00-00 00:00:00
    (string) fogExpireTimestamp = 0000-00-00 00:00:00
    (string) cnt_newmsg = 0
    (string) cnt_friendreq = 0
    (string) cnt_logins = 3910
    (string) cnt_passreset = 0
    (string) cnt_connections = 0
    (string) avatarId = 11
    (undefined) photo_host: null = null
    (undefined) photo_dir: null = null
    (undefined) photo_subdir: null = null
    (undefined) photo_name: null = null
    (string) allianceName = The Flying Circus

  (number) cityCount = 2
  (undefined) errorMsg: null = null
***/
fetchPlayerCourt : function (uid, notify){
  var params = uW.Object.clone(uW.g_ajaxparams);
  params.pid = uid;
  new MyAjaxRequest(uW.g_ajaxpath + "ajax/viewCourt.php" + uW.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/viewCourt.php\n"+ inspect (rslt, 3, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify (rslt);
    },
  });
},


fetchTEST : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
  var params = uW.Object.clone(uW.g_ajaxparams);
  params.pageNo = 1;
  params.numPerPage = 100;
  params.perPage = 100;
  params.results = 100;
  params.numResults = 100;
  new MyAjaxRequest(uW.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + uW.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
    },
  });
},

  
   init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;

    uW.PTgetMembers = t.eventGetMembers;
    uW.PTPaintMembers = t.GetDataForMap;
    uW.PTpd = t.clickedPlayerDetail;
    uW.PTpl = t.clickedPlayerLeaderboard;
    uW.PTpl2 = t.clickedPlayerLeaderboard2;
    uW.PTalClickPrev = t.eventListPrev;
    uW.PTalClickNext = t.eventListNext;
    uW.PCplo = t.clickedPlayerGetLastLogin;
    Lastlogin=0;
    t.show();
  },
 
  hide : function (){
  },

  show : function (){
    var t = Tabs.AllianceList;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.membersInfo.youmustbelong+'</center>';
        t.state = 1;
        return;
      }
      
       var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>';
       m+='<TR><TD class=xtab align=right></td><TD class=xtab>'+uW.g_js_strings.modal_fow_leaderboard.searchuser+': &nbsp; </td>';
       m+=' <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text/> &nbsp;'; 
       m+='<INPUT id=playSubmit type=submit value="'+uW.g_js_strings.modal_fow_leaderboard.finduser+'" /> &nbsp; <INPUT id=ffbuidsubmit type=submit value="UID" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab></td><TD class=xtab>'+uW.g_js_strings.setDiplomacyWindow.srchalli+': &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="'+uW.g_js_strings.modal_fow_leaderboard.findalli+'" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
           <TR><TD class=xtab><INPUT align=left id=allListSubmit type=submit value="'+uW.g_js_strings.commonstr.alliances+'" /></td>\
            <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
             <TD class=xtab></td><TD class=xtab><span align=right <b>'+uW.g_js_strings.attack_generateincoming.estimatedarrival+': </b></span>\
            <div><select id="idFindETASelect">\
        <option value="0,0" > -- Select -- </option>\
        <option value="0,180" >'+uW.unitcost["unt1"][0]+'</option>\
        <option value="0,200" > '+uW.unitcost["unt2"][0]+' </option>\
        <option value="0,3000" > '+uW.unitcost["unt3"][0]+' </option>\
        <option value="0,300" > '+uW.unitcost["unt4"][0]+' </option>\
        <option value="0,275" > '+uW.unitcost["unt5"][0]+' </option>\
        <option value="0,250" > '+uW.unitcost["unt6"][0]+' </option>\
        <option value="1,1000" > '+uW.unitcost["unt7"][0]+' </option>\
        <option value="1,750" > '+uW.unitcost["unt8"][0]+' </option>\
        <option value="1,150" > '+uW.unitcost["unt9"][0]+' </option>\
        <option value="1,100" > '+uW.unitcost["unt10"][0]+' </option>\
        <option value="1,120" > '+uW.unitcost["unt11"][0]+' </option>\
        <option value="1,80" > '+uW.unitcost["unt12"][0]+' </option>\
        </select></div>\
        </td></tr>\
         </table><span style="vertical-align:middle;" id=altInput></span></div><SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      document.getElementById('allPlayName').addEventListener ('keypress', function(e) {if ( e.which == 13)  document.getElementById('playSubmit').click();}, false);
      document.getElementById('allAllName').addEventListener ('keypress', function(e) {if ( e.which == 13)  document.getElementById('allSubmit').click();}, false);
      
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('ffbuidsubmit').addEventListener ('click', t.eventPlayerUIDSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('idFindETASelect').addEventListener ('click', t.handleEtaSelect, false);
      document.getElementById('idFindETASelect').disabled = true;
      t.ModelCity=Cities.cities[0];
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
  },
   	
  pName : '',
  eventPlayerSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    name = name.replace(/\'/g,"_");
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = uW.g_js_strings.getAllianceSearchResults.entryatleast3;
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
    var uList = [];
    for (k in rslt.matchedUsers)
      uList.push (rslt.matchedUsers[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotPlayerOnlineList(r)});    
  },    
    
  eventGotPlayerOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>'+uW.g_js_strings.recommendSelectedFriends.playersrch+': <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD>'+uW.g_js_strings.commonstr.nametx+' &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</td>\
      <TD align=right>UID &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</td><TD>'+uW.g_js_strings.commonstr.might+' &nbsp &nbsp</td><TD> &nbsp; '+uW.g_js_strings.commonstr.online+'</td><TD> &nbsp;Facebook &nbsp; </td><TD width=75%>'+uW.g_js_strings.commonstr.search+' </td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
      m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'</td><TD><A target="_tab" href="http://koc.dunno.com/index.sjs?f=ServersByUser&user_id='+ u.userId +'">' + u.userId + '</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed>"+uW.g_js_strings.commonstr.online+"</span>":"") +'</td>\
          <TD align=center><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">'+uW.g_js_strings.commonstr.profile+'</a></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>'+uW.g_js_strings.modaltitles.memberdetails+'</a> &nbsp; <BR></span><SPAN onclick="PTpl2(this,'+ u.userId+','+rslt.data[u.userId]+')"><A>'+uW.g_js_strings.modaltitles.leaderboard+'</a><BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A>'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+'</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  asName : '',
  
  
    eventPlayerUIDSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var uid = document.getElementById('allPlayName').value;

	var params = uW.Object.clone(uW.g_ajaxparams);
    params.uid = uid;
    AjaxRequest(uW.g_ajaxpath + "ajax/getUserGeneralInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (transport) {
      var rslt = eval("(" + transport.responseText + ")");
	  if (rslt.ok) test = rslt.userInfo[0].name;
	  else document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.barbarian.erroroccured+'</center>';
      },
      onFailure: function (rslt) {
           document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.errorcode.err_602+'</center>';
		   return;
      },
    });
    t.pName = t.asName;
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    setTimeout(t.fetchPlayerList,500, test, t.eventGotPlayerList);
  },
	
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = uW.g_js_strings.commonstr.search +': '+ uW.g_js_strings.modaltitles.memberdetails + " ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = uW.g_js_strings.commonstr.search +': '+ uW.g_js_strings.modaltitles.leaderboard + " ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },

  clickedPlayerLeaderboard2 : function (span, uid,status){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = uW.g_js_strings.commonstr.search +': '+ uW.g_js_strings.modaltitles.leaderboard + " ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard2(r, span,uid,status)});
  },
  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.AllianceList;
     span.onclick = '';
     span.innerHTML = uW.g_js_strings.commonstr.search +': '+ uW.g_js_strings.modal_messages_viewreports_view.lastlogin + " ...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },

  gotPlayerLeaderboard2 : function (rslt,span,uid,status){
   // alert(uid+'/'+status);
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>'+uW.g_js_strings.commonstr.leaderboard+': </b>'+uW.itemlist.i10021.name+'?<BR>';
      return;
    }
    var myA = getMyAlliance ();
    t.dat = [];
    //logit ("gotPlayerLeaderboard2 -1 "+JSON2.stringify(rslt));
    var p = rslt.results[0];
        if ( myA[0] == p.allianceId)
           t.friendEta = true;
        else
           t.friendEta = false;
        for (var c=0; c<p.cities.length; c++){
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, status,0,p.userId]);
        }
        t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
        t.ModelCity=Cities.cities[0];
        t.setEta();
        t.fetchPlayerLastLogin (uid, function (r) {t.displayPlayer(p.allianceName,r)});
        //t.fetchPlayerLastLogin();
        //t.displayPlayer (p.allianceId);
  },
  
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
       span.innerHTML = '<B>'+uW.g_js_strings.commonstr.leaderboard+': </b>'+uW.itemlist.i10021.name+'?<BR>';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'none';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    pStr = JSON2.stringify(p);
    logit (pStr);
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>'+uW.g_js_strings.commonstr.leaderboard+': </b></td><TD colspan=2>'+uW.g_js_strings.commonstr.might +': '+ p.might  +' &nbsp; '+uW.g_js_strings.commonstr.alliance+': '+ an +'</td></tr>'; 
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; created: ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName 
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; level: '
        + c.tileLevel +' &nbsp; status: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
    }  
    span.innerHTML = m + '</table>';
  },
    
  gotPlayerDetail : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'None';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>'+uW.g_js_strings.commonstr.alliance+': '+ a +' &nbsp; '+uW.g_js_strings.commonstr.cities+': '
          + u.cities +' &nbsp; '+uW.g_js_strings.commonstr.population+': '+ u.population +'</td></tr><TR><TD></td><TD>'+uW.g_js_strings.commonstr.province+': ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(uW.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = uW.g_js_strings.getAllianceSearchResults.entryatleast3;
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  eventListSubmit : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
       //document.getElementById('allGotoPage').disabled = false;
    }
    else {
       document.getElementById('allListOut').innerHTML = uW.g_js_strings.membersInfo.youmustbelong;
    }
  },

  eventGotAllianceList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>'+uW.g_js_strings.commonstr.alliances+'<B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>'+uW.g_js_strings.commonstr.alliance+'</td><TD class=xtab>'+uW.g_js_strings.commonstr.rank+'</td><TD class=xtab>'+uW.g_js_strings.commonstr.members+'</td>\
        <TD align=right class=xtab>'+uW.g_js_strings.commonstr.might+'</td><TD class=xtab>'+uW.g_js_strings.getAllianceSearchResults.currdiplo+'</td><TD class=xtab>'+uW.g_js_strings.commonstr.members+'</td><TD class=xtab>'+uW.g_js_strings.commonstr.viewmap+'</td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = uW.g_js_strings.commonstr.friendly;
      else if (all.relation && all.relation==2)
        dip = uW.g_js_strings.commonstr.hostile;
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">'+uW.g_js_strings.commonstr.members+'</a></td>\
        <TD class=xtab><a onclick="PTPaintMembers('+ all.allianceId +')">'+uW.g_js_strings.commonstr.viewmap+'</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },


  showMyAlliance : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0],false);
    }
    else {
       document.getElementById('allListOut').innerHTML = uW.g_js_strings.membersInfo.youmustbelong;
    }
  },

  curPage : 0,
  MaxPage : 0,

  eventListNext : function (amt){
    var t = Tabs.AllianceList;
    if( parseInt(amt) >= 9999 )
       t.curPage = t.MaxPage;
    else {
	    t.curPage = parseInt(t.curPage) + parseInt(amt);
	    if ( t.curPage > t.MaxPage) {
	      t.curPage = t.MaxPage;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventListPrev : function (amt){
    var t = Tabs.AllianceList;
    if(amt <= -1)
       t.curPage = 1;
    else {
	    t.curPage-=amt;
	    if ( t.curPage < 1 ) {
	      t.curPage = 1;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

   eventGotOtherAlliancePage : function (rslt){
    var t = Tabs.AllianceList;

    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }

    //	document.getElementById('idPageNum').value = t.curPage;

    t.MaxPage=rslt.noOfPages;
    //document.getElementById('idMaxPageNum').innerHTML = 'of ' + t.MaxPage;

    var m = '<div style="overflow:auto; height:556px;width:650px;"><TABLE><thead><TR style="font-weight:bold"> \
        <th class=xtab>'+uW.g_js_strings.modaltitles.alliance+'</th><th class=xtab>'+uW.g_js_strings.commonstr.rank+'</th><th class=xtab>'+uW.g_js_strings.commonstr.members+'</th>\
        <th align=right class=xtab>'+uW.g_js_strings.commonstr.might+'</th><th class=xtab>'+uW.g_js_strings.getAllianceSearchResults.currdiplo+'</th><th class=xtab>'+uW.g_js_strings.commonstr.members+'</th><th class=xtab>'+uW.g_js_strings.commonstr.viewmap+'</th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy(alliance.allianceId);

      m += '<TR class="'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">'+uW.g_js_strings.commonstr.members+'</a></td>\
	       <TD class=xtab><a onclick="PTPaintMembers('+ alliance.allianceId +')">'+uW.g_js_strings.commonstr.viewmap+'</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold"; height:20px;width:560px; ><span> <a onclick="PTalClickPrev(-1)"> [|<] </a><a onclick="PTalClickPrev(10)"> [-10] </a><a onclick="PTalClickPrev(5)"> [-5] </a><a onclick="PTalClickPrev(1)"> [<] </a> \
          <a onclick="PTalClickNext(1)"> [>] </a><a onclick="PTalClickNext(5)"> [+5] </a><a onclick="PTalClickNext(10)"> [+10] </a><a onclick="PTalClickNext(9999)"> [>|] </a> </span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
 },

  showCurrentPage : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

  },

  eventGotMemberList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.memberListRslt = rslt;
    var uList = [];
    for (k in rslt.results)
      uList.push (rslt.results[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotMemberOnlineList(r)});    
  },    
    
  eventGotMemberOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    var numInvalid = 0;
    var numPlayers = 0;
    var myA = getMyAlliance ();
    t.dat = [];
    for (var i=0; i<t.memberListRslt.results.length; i++){
      p = t.memberListRslt.results[i];
      if (p.userId == 0){
        ++numInvalid;
      } else {
        ++numPlayers;
        if ( myA[0] == p.allianceId)
           t.friendEta = true;
        else
           t.friendEta = false;
        for (var c=0; c<p.cities.length; c++){
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, rslt.data[p.userId]?1:0,'--',p.userId]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.ModelCity=Cities.cities[0];
    t.setEta();
    t.displayMembers (t.memberListRslt.allianceName, numPlayers);
  },

  // sort and display
  reDisp : function (){
    var t = Tabs.AllianceList;
    function sortFunc (a, b){
      var t = Tabs.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else if (typeof(a[t.sortColNum]) == 'boolean'){
// TODO !!        
return 0;        
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    for (var i=0; i<t.dat.length; i++){
      m += '<TR style="max-height:30px"><TD class=xxtab>'+ t.dat[i][0] +'</td><TD align=right class=xxtab>'+ addCommasInt(t.dat[i][1]) 
         +'</td><TD align=center class=xxtab>'+ t.dat[i][3] +'</td><TD class=xxtab>'+ officerId2String(t.dat[i][2])                       
         +'</td><TD class=xxtab>'+ (t.dat[i][9]?'<SPAN class=boldDarkRed>ONLINE</span>':'') +'</td><TD class=xxtab>'+ t.dat[i][7] +'</td><TD align=right class=xxtab>'+ t.dat[i][4] 
         +'</td><TD align=center class=xxtab><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td>\
            <TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>\
         </td><TD  nowrap class=xxtab>'+ (t.dat[i][10]?'<SPAN>'+ (t.dat[i][10]>0?timestr(t.dat[i][10],1):'--') +'</span>':'<SPAN>--</span>') +'<td class=xxtab><SPAN onclick="PCplo(this, \''+ t.dat[i][11] +'\')"><A>'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+'</a></span><td></tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;


    if (parseInt(tbody.clientHeight) > 470){
      tbody.style.height = '470px';
      tbody.style.maxHeight = '470px';
    }
//new CtableToText('tabAllMembers').toText();
  },


  setDistances : function (x, y){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
  },

  friendEta:false,

  setEta : function (){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++) {
      if (t.dat[i][8]) {
        var eta = t.estETA(parseFloat(t.dat[i][8]));
        if (t.friendEta)
           t.dat[i][10] = eta.friendETA;
        else
           t.dat[i][10] = eta.ETA;
      }
    }
  },



  handleEtaSelect : function (){
    var t = Tabs.AllianceList;
    t.setEta();
    t.reDisp();
  },

  sortColNum : 8,
  sortDir : 1,

  displayMembers : function (allName, numPlayers){
    var t = Tabs.AllianceList;
    function alClickSort (e){
      var t = Tabs.AllianceList;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    uW.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#ffffcc;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
      <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
        <TD class=xtab width=80% align=center>'+uW.g_js_strings.commonstr.distance+ uW.g_js_strings.commonstr.from+' <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers + uW.g_js_strings.commonstr.members+'&nbsp; </td></tr></table></div>\
      <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.commonstr.player+'</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>'+uW.g_js_strings.commonstr.might+'</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.commonstr.cities+'</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>'+uW.g_js_strings.commonstr.rank+'</a></div></td>\
        <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>'+uW.g_js_strings.commonstr.online+'</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.MapObject.cityname+'</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.commonstr.lvl+'</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.commonstr.coordinates+'</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.commonstr.distance+'</a></div></td>\
        <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>'+uW.g_js_strings.attack_generateincoming.estimatedarrival+'</a></div></td>\
        <TD class=clickable><A><DIV>'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+'</a></div></td></tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>';
      
    document.getElementById('allListOut').innerHTML = m; //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';

    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
    
    document.getElementById('dmcoords').addEventListener ('click', function(){ 
    	//alert(t.eventCoords);
    	//t.clickCity(CdispCityPicker);
    },false);	
    document.getElementById('idFindETASelect').disabled = false;
  },
  
  displayPlayer : function (allName,rslt){
    var t = Tabs.AllianceList;
    function alClickSort (e){
      var t = Tabs.AllianceList;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    uW.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#ffffcc;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alliance: '+ allName +'</td>\
              <TD class=xtab width=80% align=center>'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+': <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
      <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Might</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Rank</a></div></td>\
        <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Lvl</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
        <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Eta</a></div></td>\
		<TD class=clickable><A><DIV>'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+'</a></div></td></tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
      <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';

    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
    document.getElementById('idFindETASelect').disabled = false;
    
  },
  
  eventCoords : function (city, x, y){
    var t = Tabs.AllianceList;
    var m = '';
    if (city != null)
      m = city.name +' ('+ city.x +','+ city.y +')';
    else
      m = x +','+ y;
    var distFrom = document.getElementById('distFrom');
    if (distFrom)
        distFrom.innerHTML = m;
    t.ModelCity=city;
    if (city !=null) t.JumpCity(city.name);
    t.setDistances(x,y);
    t.setEta();
    t.reDisp();
  },

  eventGetMembers : function (aid){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>'+uW.g_js_strings.commonstr.loadingddd+'</center>';
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },

  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
    var t = Tabs.AllianceList;
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.perPage = 100;
    if (allianceName)
      params.allianceName = allianceName;
    if (allianceId && allianceId != 0)
      params.allianceId = allianceId;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getUserLeaderboard.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  GetDataForMap : function (allianceId) {
    var t = Tabs.AllianceList;
    var params = uW.Object.clone(uW.g_ajaxparams);
    var Data=[];
    params.perPage = 100;
    params.allianceId = allianceId;
    
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getUserLeaderboard.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
      	var city = '';
      	for (var i=0; i<rslt.results.length; i++) {
      		//alert(rslt.results[i].toSource());
      	    if (rslt.results[i]['userId'] !=0){
	      	    player = rslt.results[i]['cities'];
	      	    for (var ii=0; ii<player.length; ii++) 
	      			Data.push ({X:player[ii]['xCoord'],Y:player[ii]['yCoord']});
	    	}  	
        }
        if (Data != []) t.PaintDataOnMap(Data);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  PaintDataOnMap : function(Data){
  		var provMapCoordsA = {imgWidth:710, imgHeight:708, mapWidth:670, mapHeight:670, leftMargin:31, topMargin:19};  
  		var map = '<DIV id=ptAlliProvMap style="height:'+ provMapCoordsA.imgHeight +'px; width:'+ provMapCoordsA.imgWidth +'px; background-repeat:no-repeat; background-image:url(\''+ URL_PROVINCE_MAP +'\')"></div>';
  	    
		//alert(Data.toSource());
		//Data = [{X:"700", Y:"700"}, {X:"600", Y:"600"}, {X:"500", Y:"500"},{X:"400", Y:"400"},{X:"300", Y:"300"},{X:"200", Y:"200"},{X:"100", Y:"100"},{X:"0", Y:"0"},{X:"750", Y:"750"}, {X:"650", Y:"650"}, {X:"550", Y:"550"},{X:"450", Y:"450"},{X:"350", Y:"350"},{X:"250", Y:"250"},{X:"150", Y:"150"},{X:"50", Y:"50"}];
  	    			
		document.getElementById('allListOut').innerHTML = map;
		var eMap =  document.getElementById('ptAlliProvMap');
		
		
		
		
		
		for (var cc=0; cc<Seed.cities.length; cc++) {
		    var city = Seed.cities;
		    var Xplot = parseInt((provMapCoordsA.mapWidth * parseInt(city[cc][2])) / 750);
		    var Yplot = parseInt((provMapCoordsA.mapHeight * parseInt(city[cc][3])) / 750);
		    var cf = document.createElement ('div');
		    cf.style.background = 'black';
		    cf.style.opacity = '1.0';
		    cf.style.position='relative';
		    cf.style.display='block';
		    cf.style.width='14px';
		    cf.style.height='16px';
		    cf.style.border='1px solid #fff';
		    cf.style.color = 'white';
		    cf.style.textAlign = 'center';
		    cf.style.top = (Yplot+provMapCoordsA.topMargin-(cc*16)-8) +'px';      
		    cf.style.left = (Xplot+provMapCoordsA.leftMargin-7) +'px';
		    cf.innerHTML = (cc+1) +'';
		    eMap.appendChild(cf);
		    
		}

		for (var i=0;i<Data.length;i++) {
			var x = parseInt(Data[i]['X']);
			var y = parseInt(Data[i]['Y']);
  	        var xplot = parseInt((provMapCoordsA.mapWidth * x) / 750);
  	        var yplot = parseInt((provMapCoordsA.mapHeight * y) / 750);
  	    	var ce= document.createElement ('div');
  	    		ce.style.background = 'red';
  	    		ce.style.opacity = '1.0';
  	    		ce.style.position='relative';
  	    		ce.style.display='block';
  	    		ce.style.width='4px';
  	    		ce.style.height='4px';
  	    		ce.style.color = 'white';
  	    		ce.style.textAlign = 'center';
  	    	ce.style.top = (yplot+provMapCoordsA.topMargin -(4*i)-((Seed.cities.length)*18)) +'px';      
  	    	ce.style.left = (xplot+provMapCoordsA.leftMargin -2) +'px';
  	    	//ce.innerHTML = '<span onmouseover="this.innerText='+x+','+y+'" onclick="">A</span>';
  	    	ce.innerHTML = '<DIV onclick="ptGotoMap('+ x +','+ y +')">&nbsp;</div>';
  	        eMap.appendChild(ce);
  	   }
  	   
  	   
  },
  
  fetchLeaderboard : function (uid, notify) {
    var t = Tabs.AllianceList;
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getUserLeaderboard.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = Tabs.AllianceList;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("No alliance found under")!=0 || !rsltM.ok){
          notify (rsltA);
          return;
        }
        rsltA.ok = true;
        rsltA.count = 0;
        rsltA.alliancesMatched = {};
      }
      if (rsltM.ok){
        rsltA.alliancesMatched['a'+rsltM.allianceInfo.allianceId] = {allianceId: rsltM.allianceInfo.allianceId, allianceName: rsltM.allianceInfo.allianceName,
              membersCount: rsltM.allianceInfo.members, relation: null, might: rsltM.allianceInfo.might, ranking: rsltM.allianceInfo.ranking};
        ++rsltA.count;
      }
      notify (rsltA);
    }
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.allianceName = allianceName;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/allianceGetSearchResults.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (myAid!=null && myAid>0)
          t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});

        else
          notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchOtherAllianceInfo : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.pageNo = pageNum;
    params.cityId = uW.currentcityid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchMyAllianceInfo : function (notify){
    var params = uW.Object.clone(uW.g_ajaxparams);
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/allianceGetInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!! 
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/searchPlayers.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },


  
  fetchPlayerInfo : function (uid, notify){
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getUserGeneralInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
/***
ajax/getOnline.php:
  (string) ok = true
  (object) data = [object Object]
    (boolean) 4394121 = false
  (undefined) errorMsg: null = null
***/
  fetchPlayerStatus : function (uidArray, notify){
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getOnline.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  fetchPlayerLastLogin : function (uid, notify){
      var params = uW.Object.clone(uW.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(uW.g_ajaxpath + "ajax/viewCourt.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          notify (rslt);
        },
        onFailure: function (rslt) {
          notify ({errorMsg:'AJAX error'});
        },
      });
    },
    
    gotPlayerLastLogin : function (rslt, span){
        var t = Tabs.AllianceList;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
    
        if (lastLogin) {
          m = '<span style="color:black">'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+': '+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">No login date found: '+lastLogin+'</span>';
        }
        span.innerHTML = m + '';
      },

  ModelCity : {},

  estETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times. 
    var t = Tabs.AllianceList;
    var ret={ETA:0,etaStr:'NA',friendETA:0,friendEtaStr:'NA'};    
    var cityID;
    if (dist <= 0) return ret;
    var EtaType = document.getElementById('idFindETASelect');
    var baseSpeedSel = EtaType.options[EtaType.selectedIndex].value;
    var m = baseSpeedSel.split(',');
    var horse = 0;
    var baseSpeed = 0;
    if(m) {
      horse = parseInt(m[0]);
      baseSpeed = parseInt(m[1]);
    }
    if (baseSpeed == 0) return ret;
    var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
    var Speed = 0;
    if (horse){
   //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20) 
      var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
      Speed = baseSpeed * (1 + mmLvl/10.0) * (1 + hsLvl/20.0);
    }
    else {
    //FootSpeed = Base * (1 + MM/10)
      Speed = baseSpeed * (1 + mmLvl/10.0);
    }
    //Grid Speed (tiles/second) = Speed (100ths/min) / 6000 
    var gSpeed = 0;
    var estSec;
    if (Speed>0) {
      gSpeed = Speed/6000.0;//0.48333 mm=10, hs=9
      estSec = (parseFloat(dist)/gSpeed).toFixed(0);
    }
    ret.ETA = (parseInt((estSec+''))+30); 
    ret.etaStr = timestr (ret.ETA,1);
    //ret.etaStr = ret.ETA + ', ' + timestr (ret.ETA,1);
    //RS - Cities Relief Station Level
    //Friendly Speed = Speed * (1 + RS/2)
    if (t.ModelCity) {
      cityID = t.ModelCity.id;
      var building = getCityBuilding (cityID, 18);
      if (building) {
        fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
        gSpeed = fSpeed/6000;
        estSec = (dist/gSpeed).toFixed(0);
        ret.friendETA = parseInt((estSec+''))+30; 
        ret.friendEtaStr = timestr ((ret.friendETA+''),1);
      }
   }
    return ret;
  },
  
     JumpCity:function(city) {
   		var t = Tabs.AllianceList;
   		for (i=0;i<Seed.cities.length;i++) {
   			if (Seed.cities[i][1]==city) var cityNum=i;
   		}
   		cityNum++;
   		var obj = document.getElementById('citysel_'+cityNum);
	   	return t.ClickWin(window,obj,'click');
   },
   
   ClickWin:function(win,obj,evtName) {
   	var evt = win.document.createEvent("MouseEvents");
   	evt.initMouseEvent(evtName, true, true, win,
   		0, 0, 0, 0, 0, false, false, false, false, 0, null);
   	return !obj.dispatchEvent(evt);
   },
   
   
};




/*********************************** Test TAB ***********************************/

Tabs.Test = {
  tabOrder : 100,
  tabDisabled : !ENABLE_TEST_TAB,
  cont : null,

  init : function (div){
    var t = Tabs.Test;
    t.cont = div;
	var citySelect = '   <SELECT id=fakeCity>';
	    for (var c=0; c<Cities.numCities; c++) {
		 	 aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
	         citySelect += '<option value=\''+c+'\'>'+aCity+'</option>';
	    }
	    citySelect += '</select>';
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=fakeIsScout></td></tr>\
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=fakeIsWild></td></tr>\
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox disabled id=fakeFalse></td></tr>\
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=fakeSeconds></td></tr>\
        <TR><TD align=right># of Supply: </td><TD><INPUT type=text size=6 value=0 id=faketroop0></td></tr>\
		<TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=0 id=faketroop1></td></tr>\
		<TR><TD align=right># of Scouts: </td><TD><INPUT type=text size=6 value=0 id=faketroop2></td></tr>\
		  <TR><TD align=right># of Pikes: </td><TD><INPUT type=text size=6 value=0 id=faketroop3></td></tr>\
		  <TR><TD align=right># of Swords: </td><TD><INPUT type=text size=6 value=0 id=faketroop4></td></tr>\
		  <TR><TD align=right># of Archers: </td><TD><INPUT type=text size=6 value=0 id=faketroop5></td></tr>\
		  <TR><TD align=right># of Calvary: </td><TD><INPUT type=text size=6 value=0 id=faketroop6></td></tr>\
		  <TR><TD align=right># of Heavy Cav: </td><TD><INPUT type=text size=6 value=0 id=faketroop7></td></tr>\
		  <TR><TD align=right># of Wagons: </td><TD><INPUT type=text size=6 value=0 id=faketroop8></td></tr>\
		  <TR><TD align=right># of Ballistas: </td><TD><INPUT type=text size=6 value=0 id=faketroop9></td></tr>\
		  <TR><TD align=right># of Battering Ram: </td><TD><INPUT type=text size=6 value=0 id=faketroop10></td></tr>\
		  <TR><TD align=right># of Catapults: </td><TD><INPUT type=text size=6 value=0 id=faketroop11></td></tr>\
		  <TR><TD align=right>Fake name to use: </td><TD><INPUT type=text size=13 value=oftheNOOBS id=fakeName></td></tr>\
		  <TR><TD align=right>Target city: </td><TD>'+citySelect+'</td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=testSendMarch type=submit value="Fake Attack" \></td></tr></table>\
        <INPUT id=ptReloadKOC type=submit value="Reload KOC" \>\
        <BR><DIV id=testDiv style="background-color:#fffff0; maxwidth:675; max-height:430px; height:430px; overflow-y:auto;"></div>';
    t.cont.innerHTML = m;
    document.getElementById('testSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('ptReloadKOC').addEventListener ('click', t.reloadKOC, false);
    function xyNotify(city, x, y){
      var m = '[ Notified: '+ (city?city.name:'null') +', x='+ x +', y='+ y +' ]';
      document.getElementById('testNotify').innerHTML = m;
    }
  },

  hide : function (){
  },

  show : function (){
  },

  reloadKOC : function (){
    var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+GetServerId();
    var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxptButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ GetServerId() +'"</form>';
    var e = document.createElement ('div');
    e.innerHTML = t;
    document.body.appendChild (e);
    setTimeout (function (){document.getElementById('xxptButReload').click();}, 0);
  },

  writeDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
    document.getElementById('testDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
    document.getElementById('testDiv').innerHTML += msg;
  },

  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, troops, name){
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    if (isFalse)
      march.marchType = 0;
    else if (isScout)
      march.marchType = 3;
    else
      march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (isWild) {
      keys = uW.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
     march.unts = {}
	for(i=0; i<12; i++){
	  if(troops[i] > 0)
		march.unts["u"+(i+1)] = addCommas(troops[i]);
	}
    march.pid = 1234567;
    march.score = 9;
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = name;
    march.players.u1234567.t = 60;
    march.players.u1234567.m = 5441192;
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1;
    march.players.u1234567.a = 1;
    march.players.u1234567.i = 5;
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = Tabs.Test;
    var isScout = document.getElementById('fakeIsScout').checked;
    var isWild = document.getElementById('fakeIsWild').checked;
    var isFalse = document.getElementById('fakeFalse').checked;
	var troops = [];
	for(i=0; i<12; i++)
		troops[i] = parseInt(document.getElementById('faketroop'+i).value);
    var secs = parseInt(document.getElementById('fakeSeconds').value);
	var name = document.getElementById('fakeName').value;
	var city = document.getElementById('fakeCity').value;
    t.createFakeAttack (city, isScout, isWild, isFalse, secs, troops ,name);
  },
}

/*********************************** Info tab ***********************************/

Tabs.Info = {
  tabOrder : 20,
  tabLabel : document.getElementById('mod_views_map').innerHTML,
  cont : null,

  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    var t = Tabs.Info;
    
    var m = '<DIV class=ptstat>PROVINCE MAP</div><DIV id=ptProvMap style="height:'+ provMapCoords.imgHeight +'px; width:'+ provMapCoords.imgWidth +'px; background-repeat:no-repeat; background-image:url(\''+ URL_PROVINCE_MAP +'\')"></div>';
    m+= '<BR><DIV class=ptstat>DISTANCE CALCULATOR</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR><TD class=xtab align=left><INPUT id=plot type=checkbox>Plot coords on map.</td></tr>\
      <TR><TD class=xtab align=left><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\
      <TR><TD class=xtab align=left><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\
      <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div></div>\
      <BR></center>';
    t.cont.innerHTML = m +'</div>';
    
    for (var c=0; c<Cities.numCities; c++)      
      t.makeCityImg (c, document.getElementById('ptProvMap'));
	new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));
    new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
    t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);
    document.getElementById('plot').addEventListener('change', function(){
       t.plotCityImg(0, document.getElementById('ptProvMap'), document.getElementById('calcX').value, document.getElementById('calcY').value);
	     t.plotCityImg(1, document.getElementById('ptProvMap'), document.getElementById('calcX2').value, document.getElementById('calcY2').value);
    }, false);
  },

  hide : function (){
  },

  show : function (){
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};  
  makeCityImg : function (cityNum, eMap){
//logit ('makeCityImg: '+ cityNum);    
    var t = Tabs.Info;
    var city = Cities.cities[cityNum];
//    var off = getAbsoluteOffsets (eMap);
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);
    var ce = document.createElement ('div');
    ce.style.background = 'black';
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'white';
    ce.style.textAlign = 'center';
    ce.style.top = (y+provMapCoords.topMargin-(cityNum*16)-8) +'px';      
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  
  plotCityImg : function (cityNum, eMap, x, y){
//logit ('makeCityImg: '+ cityNum);    
    var t = Tabs.Info;
    var xplot = parseInt((provMapCoords.mapWidth * x) / 750);
    var yplot = parseInt((provMapCoords.mapHeight * y) / 750);
	if(document.getElementById('plotmap_'+cityNum) == null){
		var ce = document.createElement ('div');
		ce.style.background = 'white';
		ce.id = 'plotmap_'+cityNum;
		ce.style.opacity = '1.0';
		ce.style.position='relative';
		ce.style.display='block';
		ce.style.width='14px';
		ce.style.height='16px';
		ce.style.border='1px solid #fff';
		ce.style.color = 'black';
		ce.style.textAlign = 'center';
	} else {
		ce = document.getElementById('plotmap_'+cityNum);
	}
    ce.style.top = (yplot+provMapCoords.topMargin-((Cities.numCities+cityNum)*16)-8) +'px';      
    ce.style.left = (xplot+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  
  eventLocChanged : function (city, x, y){
    var t = Tabs.Info;
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
    if (document.getElementById('plot').checked){
	       t.plotCityImg(0, document.getElementById('ptProvMap'), x1, y1);
	       t.plotCityImg(1, document.getElementById('ptProvMap'), x2, y2);
	  }
  },
}


/*********************************** Options Tab ***********************************/

Tabs.Options = {
  tabOrder : 40,
  tabLabel : 'Options',
  cont : null,
  curTabBut : null,
  curTabName : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.cont = div;
    
    var main = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubU type=submit value="Options"></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubV type=submit value="Layout"></td></tr></table><HR class=ptThin>';
    main +='<DIV id=ptOptOutput style="margin-top:10px; background-color:white; height:680px; overflow:scroll;"></div>';

    t.cont.innerHTML = main;
    t.Overv = document.getElementById('ptOptOutput');
    
    document.getElementById('ptmrchSubU').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubV').addEventListener('click', e_butSubtab, false);

    
    changeSubtab (document.getElementById('ptmrchSubU'));
    
    function e_butSubtab (evt){            
      changeSubtab (evt.target);   
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab'; 
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel'; 
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      Options.curMarchTab = t.curTabName;
      t.show ();
    }
    },
    
    Options : function (){ 
    var t = Tabs.Options; 
    try {      
      m = '<TABLE class=ptTab>';
	  m+='<TR><TD colspan=2><B>Config:</b></td></tr>';
	  m+='<TR><TD><INPUT id=ptAllowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>';
	  m+='<TR><TD><INPUT id=ptHideOnGoto type=checkbox /></td><TD>Hide window when clicking on map coordinates.</td></tr>';
	  m+='<TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Show \'food left\' in RED if food will run out in less than';
	  m+='<INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> hours, does NOT affect the food alert anymore!</td></tr>';
	  m+='<TR><TD><INPUT id=ptEnableFoodTower type=checkbox /></td><TD>Enable Tower food alert. (Warning set to 6 hours, checked every 30min.)</td></tr>';
	  m+='<TR><TD><INPUT id=ptEnableWisperAlert type=checkbox /></td><TD>Enable sound alert on whisper<SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>';
	  m+='<TR><TD><INPUT id=ptEnableTowerAlert type=checkbox /></td><TD>Enable sound alert on tower alert in chat<SPAN class=boldRed>&nbsp;(NEW)</span></td></tr>';
	  m+='<TR><TD colspan=2><B>KofC Features:</b></td></tr>';
	  m+='<TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>Change message icons place(Msg/Reports) and allign them.</td></tr>';
	  m+='<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Enable enhanced Alliance Reports.</td></tr>';
	  m+='<TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Allow other scripts to change format of Alliance Reports.</td></tr>';
	  m+='<TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Enable enhanced messaging ("forward" and "all officers" buttons).</td></tr>';
	  m+='<TR><TD><INPUT id=togPageNav type=checkbox /></td><TD>Enhanced page navigation for messages and reports.</td></tr>';
	  m+='<TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warn if attempting to march to location 0,0.</td></tr>';
	  m+='<TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Enable GMT clock next to "Camelot Time" </td></tr>';
	  m+='<TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Enable target city picker in attack dialog (reinforce, reassign and transport)</td></tr>';
	  m+='<TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Display # of rounds in battle reports</td></tr>';
	  m+='<TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Enable delete button when displaying battle report</td></tr>';
	  m+='<TR><TD colspan=2><BR><BR><B>KofC Bug Fixes:</b></td></tr>';
	  m+='<TR><TD><INPUT id=togTowerFix type=checkbox /></td><TD>Fix tower report to show exact target (city, wild or invalid)</td></tr>';
	  m+='<TR><TD><INPUT id=togMapDistFix type=checkbox /></td><TD>Fix map to show distances from currently selected city, instead of always the first city.</td></tr>';
	  m+='<TR><TD><INPUT id=togTowerFix2 type=checkbox /></td><TD>Fix false attack alerts created from scouting missions.</td></tr>';
	  m+='<TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>Do not automatically select a knight when changing march type to scout, transport or reassign</td></tr>';
	  m+='<TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Keep map coordinate box/bookmarks on top of troop activity</td></tr>';
	  m+='</table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.';
      t.Overv.innerHTML = m;
      
      t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
      t.togOpt ('ptEnableFoodTower', 'enableFoodTower');
      t.togOpt ('ptEnableWisperAlert', 'enableWhisperAlert');
      t.togOpt ('ptEnableTowerAlert', 'enableTowerAlert');
      
      t.togOpt ('ptHideOnGoto', 'hideOnGoto');
      t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
      t.togOpt ('togAllowAlter', 'allowAlterAR');
      t.togOpt ('togTowerFix', 'fixTower', TowerAlerts.enableFixTarget, TowerAlerts.isFixTargetAvailable);
      t.togOpt ('togTowerFix2', 'fixTower2', TowerAlerts.enableFixFalseReports, TowerAlerts.isFixFalseReportsAvailable);
      t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.init);
      t.togOpt ('togMapDistFix', 'fixMapDistance', MapDistanceFix.enable, MapDistanceFix.isAvailable);
      t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.setEnable, WarnZeroAttack.isAvailable);
      t.togOpt ('togPageNav', 'fixPageNav', PageNavigator.enable, PageNavigator.isAvailable);
      t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
      t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
      t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
      t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);
      t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
      t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
      t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);
                  
      document.getElementById('optFoodHours').addEventListener ('change', function () {
          var x = document.getElementById('optFoodHours').value; 
          if (isNaN(x) || x<0.01 || x>99999){
            document.getElementById('optFoodHours').value = Options.foodWarnHours;
            return;
          }
          Options.foodWarnHours = x; 
          saveOptions();
        }, false);

      var checkbox = document.getElementById('togAllRpts');
       if (Options.enhanceARpts)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);}, false);
      
    } catch (e) {
      t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },
  
  Layout :function (){
    var t = Tabs.Options;  
    try {      
      m= '<TABLE class=ptTab>';
	  m+='<TR><TD colspan=2><U><B>Chat Layout:</b></u></td></tr>';
	  m+='<TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Enable Chat Enable Chat enhancements (clickable coords, click on icon to whisper, colors).</td></tr>';
      m+='<TR><TD><INPUT id=togChatGlobal type=checkbox /></td><TD>Enable Global background color.</td></tr>';
	  m+='<TR><TD><INPUT id=togChatWhisper type=checkbox /></td><TD>Enable Whisper in Red Font.</td></tr>';
	  m+='<TR><TD><INPUT id=togChatBold type=checkbox /></td><TD>Enable Chat in Bold Font.</td></tr>';
	  m+='<TR><TD><INPUT id=togChatAttack type=checkbox /></td><TD>Enable Red background on tower alert.</td></tr>';
	  m+='<TR><TD><INPUT id=togChatLead type=checkbox /></td><TD>Enable background for alliance Leaders.<SPAN class=boldRed>&nbsp;(NEW)</span></td></tr></table>';
	  
	  m+='<TABLE class=ptTab><BR><TR><TD colspan=2><U><B>Colors:</b></u></td></tr>';
      m+='<TR><TD>Chat Color - Global: </td><TD><INPUT id=togGlobal type=text size=7 maxlength=7 value="'+Colors.ChatGlobal+'"></td>&nbsp;<TD style="background-color:'+Colors.ChatGlobal+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>Chat Color - Leaders: </td><TD><INPUT id=togChatLeaders type=text size=7 maxlength=7 value="'+Colors.ChatLeaders+'"></td>&nbsp;<TD style="background-color:'+Colors.ChatLeaders+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>General - Title: </td><TD><INPUT id=togChatMainTiltle type=text size=7 maxlength=7 value="'+Colors.MainTitle+'"></td>&nbsp;<TD style="background-color:'+Colors.MainTitle+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>General - Dark Row: </td><TD><INPUT id=togDarkRow type=text size=7 maxlength=7 value="'+Colors.DarkRow+'"></td>&nbsp;<TD style="background-color:'+Colors.DarkRow+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>General - Button Selected: </td><TD><INPUT id=togButClick type=text size=7 maxlength=7 value="'+Colors.ButtonSelected+'"></td>&nbsp;<TD style="background-color:'+Colors.ButtonSelected+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>General - Tab Clicked: </td><TD><INPUT id=togTabClick type=text size=7 maxlength=7 value="'+Colors.TabClicked+'"></td>&nbsp;<TD style="background-color:'+Colors.TabClicked+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>General - Tabs: </td><TD><INPUT id=togTab type=text size=7 maxlength=7 value="'+Colors.Tabs+'"></td>&nbsp;<TD style="background-color:'+Colors.Tabs+'" width=30px>&nbsp;</td></tr>';
      m+='<TR><TD>Overview - Dark Rows:</td><TD><INPUT id=togOverDarkRow type=text size=7 maxlength=7 value="'+Colors.OverviewDarkRow+'"></td>&nbsp;<TD style="background-color:'+Colors.OverviewDarkRow+'" width=30px>&nbsp;</td></tr>';
      m+='</table><BR><BR><DIV>HTML colors:&nbsp;&nbsp;&nbsp;';
      m+='<a href="http://www.colorpicker.com/" target="_blank">Color Picker</a>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;';
      m+='<a href="http://www.w3schools.com/html/html_colors.asp" target="_blank">Colors</a>';
      m+='<HR>To apply colors you need to REFRESH!<BR>';
      m+= strButton20('Reset Colors', 'id=ResetALL');
      t.Overv.innerHTML = m;
            
      t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);
      t.togOpt ('togChatGlobal', 'chatglobal');
      t.togOpt ('togChatWhisper', 'chatwhisper');	
      t.togOpt ('togChatBold', 'chatbold');
      t.togOpt ('togChatAttack', 'chatAttack');
      t.togOpt ('togChatLead', 'chatLeaders');
      
      document.getElementById('togGlobal').addEventListener('change', function(){Colors.ChatGlobal = document.getElementById('togGlobal').value;t.Layout()}, false);
      document.getElementById('togChatLeaders').addEventListener('change', function(){Colors.ChatLeaders = document.getElementById('togChatLeaders').value;t.Layout()}, false);
      document.getElementById('togChatMainTiltle').addEventListener('change', function(){Colors.MainTitle = document.getElementById('togChatMainTiltle').value;t.Layout()}, false);
      document.getElementById('togDarkRow').addEventListener('change', function(){Colors.DarkRow = document.getElementById('togDarkRow').value;t.Layout()}, false);
      document.getElementById('togButClick').addEventListener('change', function(){Colors.ButtonSelected = document.getElementById('togButClick').value;t.Layout()}, false);
      document.getElementById('togTabClick').addEventListener('change', function(){Colors.TabClicked = document.getElementById('togTabClick').value;t.Layout()}, false);
      document.getElementById('togTab').addEventListener('change', function(){Colors.Tabs = document.getElementById('togTab').value;t.Layout()}, false);
      document.getElementById('togOverDarkRow').addEventListener('change', function(){Colors.OverviewDarkRow = document.getElementById('togOverDarkRow').value;t.Layout()}, false);
      
      document.getElementById('ResetALL').addEventListener ('click', function(){
      		RemoveList = (GM_listValues());
      		for (i=0;i<RemoveList.length;i++){
      			if (RemoveList[i] == "Colors") GM_deleteValue(RemoveList[i]);
      		}
      		ResetColors=true;
      		reloadKOC();
      },false);	
      
    } catch (e) {
      t.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }
  },
  

  
  hide : function (){
  },

  show : function (){
        var t = Tabs.Options;
    if (t.curTabName == 'U') 
         t.Options();
    else if (t.curTabName == 'V')
      t.Layout();
  },
  
  togOpt : function (checkboxId, optionName, callEnable, callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    
    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, callEnable).handler, false);
    function eventToggle (checkboxId, optionName, callOnChange){
      this.handler = handler;
      var optName = optionName;
      var callback = callOnChange;
      function handler(event){
        Options[optionName] = this.checked;
        saveOptions();
        if (callback != null)
          callback (this.checked);
      }
    }
  },
}






/*******************   KOC Map interface ****************/
Map = {
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

  callback : null,
  request : function (left, top, width, cb) {
if (DEBUG_TRACE) logit (" 1 Map.request(): "+ left +' , '+ top +' , '+ width);
    left = parseInt(left / 5) * 5;
    top = parseInt(top / 5) * 5;
    width = parseInt((width+4) / 5) * 5;
    var blockString = this.generateBlockList(left, top, width);
    Map.callback = cb;
    if (uW.SANDBOX)
      return RequestMAPTEST(left, top, width, callback);
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/fetchMapTiles.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
if (DEBUG_TRACE) logit (" 2 Map.request  Map = "+ inspect (Map, 2, 1, 2));
        Map.callback(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        Map.callback(left, top, width, rslt);
      }
    });
  },
};


/*************************************** Train Tab ***********************************************/

Tabs.Train = {
  tabOrder : 15,
  cont : null,
  timer : null,
  stats : {},
  selectedCity : {},
  trainTimer : null,
  running : false,
  
  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
    s = "<DIV id=trainTopSelect>\
      <DIV class=ptstat>Train troops and build wall/field defenses</div><DIV style='height:5px'></div><DIV class=ptentry>\
      <DIV style='text-align:center; margin-bottom:5px;'>Select City: &nbsp; <span id=ptspeedcity></span></div>\
      <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
      <TABLE align=center><TR><TD align=right>Troop Type: </td><TD colspan=2>\
      <SELECT id=ptttType>\
        <option value='1'>Supply Troop</option>\
        <option value='2'>Militiaman</option>\
        <option value='3'>Scout</option>\
        <option value='4'>Pikeman</option>\
        <option value='5'>Swordsman</option>\
        <option value='6'>Archer</option>\
        <option value='7'>Cavalry</option>\
        <option value='8'>Heavy Cavalry</option>\
        <option value='9'>Supply Wagon</option>\
        <option value='10'>Ballista</option>\
        <option value='11'>Battering Ram</option>\
        <option value='12'>Catapult</option>\
      </select> &nbsp; (max <span id=ptttSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
      <TR><TD align=right valign=top>Set Workers idle: </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"> \
        <SPAN style='white-space:normal;'>Allows you to train more troops. May temporarily set idle population negative.</span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Train Troops'\></td></tr>\
      </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
      <TABLE align=center><TR><TD align=right>Defense Type: </td><TD colspan=2>\
      <SELECT id=pttdType>\
        <option value='53'>Crossbow</option>\
        <option value='55'>Trebuchet</option>\
        <option value='60'>Trap</option>\
        <option value='61'>Caltrop</option>\
        <option value='62'>Spiked Barrier</option>\
      </select> &nbsp; (<span id=pttdSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
      <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Build Defenses'\></td></tr></table>\
      </td></tr></table></div></div>\
      <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
      <div style='height: 330px; background: #e8ffe8'>\
      <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
      <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Troop Queue &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
        <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Defense Queue &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
      </div>";
    t.cont.innerHTML = s;

    var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);
    t.TTspMax = document.getElementById ('ptttSpMax');
    t.TTspMaxPS = document.getElementById ('ptttSpMaxPS');
    t.TTspMaxSlots = document.getElementById ('ptttSpMaxSlots');
    t.TTbutMaxSlots = document.getElementById ('ptttButMaxSlots');
    t.TTbutMaxPerSlot = document.getElementById ('ptttButMaxPS');
    t.TTinpPerSlot = document.getElementById ('ptttInpPS');
    t.TTinpSlots = document.getElementById ('ptttInpSlots');
    t.TTselType = document.getElementById ('ptttType');
    t.TTbutDo = document.getElementById ('ptttButDo');
    t.TDspMax = document.getElementById ('pttdSpMax');
    t.TDspMaxPS = document.getElementById ('pttdSpMaxPS');
    t.TDspMaxSlots = document.getElementById ('pttdSpMaxSlots');
    t.TDbutMaxSlots = document.getElementById ('pttdButMaxSlots');
    t.TDbutMaxPerSlot = document.getElementById ('pttdButMaxPS');
    t.TDinpPerSlot = document.getElementById ('pttdInpPS');
    t.TDinpSlots = document.getElementById ('pttdInpSlots');
    t.TDselType = document.getElementById ('pttdType');
    t.TDbutDo = document.getElementById ('pttdButDo');
    t.TDspSpace = document.getElementById ('pttdSpace');
    t.divTrainStatus = document.getElementById ('ptTrainStatus');
          
    t.TTinpSlots.addEventListener ('change', t.updateTopTroops, false);
    t.TTbutMaxPerSlot.addEventListener ('click', t.clickTroopMaxPS, false);
    t.TTbutMaxSlots.addEventListener ('click', t.clickTroopMaxSlots, false);
    t.TTselType.addEventListener ('change', t.changeTroopSelect, false);
    t.TTbutDo.addEventListener ('click', t.clickTroopDo, false);
    t.TDinpSlots.addEventListener ('change', t.updateTopDef, false);
    t.TDselType.addEventListener ('change', t.changeDefSelect, false);
    t.TDbutMaxPerSlot.addEventListener ('click', t.clickDefMaxPS, false);
    t.TDbutMaxSlots.addEventListener ('click', t.clickDefMaxSlots, false);
    t.TDbutDo.addEventListener ('click', t.clickDefDo, false);
    
    document.getElementById ('chkPop').addEventListener ('change', t.clickCheckIdlePop, false);
    t.changeTroopSelect();
    t.changeDefSelect();
  },


  hide : function (){
    var t = Tabs.Train;
    clearTimeout (t.timer);
  },
  
  show : function (){
    var t = Tabs.Train;
    clearTimeout (t.timer);
    t.displayCityStats();
    t.changeTroopSelect();
    t.changeDefSelect();
    t.timer = setTimeout (t.show, 2000);
  },

/*******  TROOPS  ******/  
  
  updateTopTroops : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },
      
  
  clickTroopMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = Tabs.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },
  
  clickCitySelect : function (city){
    var t = Tabs.Train;
    t.selectedCity = city;
    t.lastQueString = null;   
    t.lastDQueString = null;   
    t.displayCityStats ();
    t.changeTroopSelect();
    t.changeDefSelect();
  },
  
  clickCheckIdlePop : function (){
    var t = Tabs.Train;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.changeTroopSelect ();
  },

  limitingFactor : null,
    
  changeTroopSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    t.limitingFactor = null;
    var uc = unsafeWindow.unitcost['unt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max){
      max = t.stats.food / uc[1];
      t.limitingFactor = 'food';
    }
    if ( (t.stats.wood / uc[2]) < max){
      max = t.stats.wood / uc[2];
      t.limitingFactor = 'wood';
    }
    if ( (t.stats.stone / uc[3]) < max){
      max = t.stats.stone / uc[3];
      t.limitingFactor = 'stone';
    }
    if ( (t.stats.ore / uc[4]) < max){
      max = t.stats.ore / uc[4];
      t.limitingFactor = 'ore';
    }
    if ( (t.stats.idlePop / uc[6]) < max){
      max = t.stats.idlePop / uc[6];
      t.limitingFactor = 'pop';
    }
    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
if (t.limitingFactor){
  document.getElementById('ptttr_'+ t.limitingFactor).className = 'boldRed';
}    
    t.updateTopTroops();
  },

    
  clickTroopDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);
    
    t.displayCityStats ();
    if (t.running){
      t.stopTraining('<SPAN class=boldRed>Training cancelled by user</span>');
      return; 
    }    
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of troops per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\'t train that many troops (max is '+ t.stats.MaxTrain +' total)</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';
      return;
    }
    
    t.TDbutDo.disabled = true;
    t.TTbutDo.className = 'ptButCancel';
    t.TTbutDo.value = 'CANCEL';
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.running = true;
    t.doQueue (cityId, que);
  },

  
/*******  DEF  ******/  
  
  updateTopDef : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = uW.g_js_strings.commonstr.max+':'+ t.stats.MaxDefTrain +'&nbsp; '+uW.g_js_strings.commonstr.owned+':'+ t.stats.defOwned;   
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = uW.buildingcost.bdg19[0]+' ('+uW.g_js_strings.guardian.cl1+'): <B>'+ t.stats.wallLevel +'\
    </b><BR>'+uW.g_js_strings.modal_openWalls.walldef+': \
    '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        '+uW.g_js_strings.modal_openWalls.fielddef+': '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);    
    var uc = uW.fortcost['frt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.wood / uc[2]) < max)
      max = t.stats.wood / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.ore / uc[4]) < max)
      max = t.stats.ore / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }

    var spaceEach = parseInt(uW.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);
    
    t.updateTopDef();
  },
  
  clickDefMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = Tabs.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },
    
  clickDefDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);
    
    t.displayCityStats ();
    if (t.running){
      t.stopTraining('<SPAN class=boldRed>'+uW.g_js_strings.commonstr.cancelled+'</span>');
      return; 
    }    
    if (perSlot<1){
      //t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of units per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+ uW.g_js_strings.modal_attack.maxtroops +': '+ t.stats.MaxDefTrain +'</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
        t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>'+uW.g_js_strings.commonstr.invalid+' ()</font>';
      return;
    }
    var siege = document.getElementById ('siege').value;
    t.TTbutDo.disabled = true;
    t.TDbutDo.className = 'ptButCancel';
    t.TDbutDo.value = 'CANCEL';
    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.running = true;
    t.doDefQueue (cityId, siege, que);
  },

  doDefQueue : function (cityId, siege, que, errMsg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    try {
      t.displayCityStats();
      if (errMsg){
        t.stopTraining ('<SPAN class=boldRed>ERROR: '+ errMsg +'</span>');
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.stopTraining ('<B>Done queueing defenses.</b>');
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');
        doDefTrain ( cityId, siege, cmd[1], cmd[2], 
          function(errMsg){
            t.trainTimer = setTimeout(function (){Tabs.Train.doDefQueue(cityId, siege, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.stopTraining ('<SPAN class=boldRed>PROGRAM ERROR: '+ err.message +'</span>');
    }
  },
  

  // fix KofC bugs ....
  // if first start time > now, make it now
  // if any end time != next start time, fix it
  fixQueTimes : function (q){
    var now = unixTime();
    if (q[0][2] > now)
      q[0][2] = now;
    for (var i=0; i<q.length; i++){
      if (q[i+1]!=null && q[i+1][2]!=q[i][3])
        q[i][3] = q[i+1][2];
    }        
  },

  expireTheQueue : function (q){
    if (q==null)
      return;
    var now = unixTime();
    while (q.length>0 && (q[0][3] - now) < 1)
      q.shift();
  },
    
  displayCityStats : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);
    t.stats.wood = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);
    t.stats.ore = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);
    t.stats.gold = Seed.citystats['city'+cityId].gold[0];
    if (Options.maxIdlePop)
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);
    else
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    t.stats.barracks = getCityBuilding (cityId, 13).count;
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';

    m += '<TABLE class=ptTab width=100%><TR align=center>';
    for(i=1;i<=6;i++){
    	m += '<TR><TD width=75px>'+uW.unitcost['unt'+i][0]+'</td><TD width=60px>'+addCommas(parseInt(Seed.units['city'+cityId]['unt'+i]))+'</td>';
    	m += '<TD width=75px>'+uW.unitcost['unt'+(i+6)][0]+'</td><TD width=60px>'+addCommas(parseInt(Seed.units['city'+cityId]['unt'+(i+6)]))+'</td>';
    	if (i<=4) m += '<TD width=75px><SPAN id=ptttr_'+uW.resourceinfo['rec'+i]+'>'+uW.resourceinfo['rec'+i]+'</span></td><TD width=60px><SPAN id=ptttr2_'+uW.resourceinfo['rec'+i]+'>'+addCommas(parseInt(Seed.resources['city'+cityId]['rec'+i][0]/3600))+'</span></td>';
    	if (i==5) m += '<TD width=75px><SPAN id=ptttr_gold>'+uW.resourceinfo['rec0']+'</span></td><TD width=60px><SPAN id=ptttr2_gold>'+addCommas(Seed.citystats['city'+cityId].gold[0])+'</span></td>';
    	if (i==6) m += '<TD width=75px><SPAN id=ptttr_pop>'+uW.g_js_strings.showPopTooltip.idlepop+'</td><TD width=60px><SPAN id=ptttr2_pop>'+addCommas(t.stats.idlePop)+'</td>';
    	m+='</tr>';
    }
    m+='</table>';
    document.getElementById ('divSTtop').innerHTML = m;
    
// troop queue .... 
    var totTime = 0;
    var q = Seed.queue_unt['city'+cityId];
    t.expireTheQueue(q);
    var qs = q.toString();
    var now = unixTime();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        document.getElementById ('ptttfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastQueString = qs;
      t.stats.queued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length>0 ){
        t.fixQueTimes (q);
        t.stats.queued = q.length;
        first = true;
        for (var i=0; i<q.length; i++){
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
          q[i][6] = cityId;
          m += '<TR align=right><TD width="5px"><A><DIV onclick="cancelTrain('+ q[i][0]+','+q[i][1]+','+q[i][2]+','+q[i][3]+','+q[i][5]+','+q[i][6]+','+i +')">X</div></a></td>';
          m += '<TD>'+ q[i][1] +' </td><TD align=left> '+ uW.unitcost['unt'+q[i][0]][0];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>'; 
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTleft').innerHTML = m;
    }
    m = t.stats.queued +' ' + uW.g_js_strings.commonstr.oftx +' ';
    if (t.stats.queued >= 0)
      m += t.stats.barracks;
    if (totTime > 0)
      m += ' - '+ uW.g_js_strings.commonstr.time + ': '+ uW.timestr(totTime);
    document.getElementById ('statTTtot').innerHTML = m;
    
// defense queue ....
    getWallInfo (cityId, t.stats);    
    var totTime = 0;
    var q = Seed.queue_fort['city'+cityId];
    t.expireTheQueue(q);
    var qs = q.toString();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastDQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        document.getElementById ('pttdfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastDQueString = qs;
      t.stats.Dqueued = 0;
      t.stats.wallSpaceQueued = 0;
      t.stats.fieldSpaceQueued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length > 0 ){
        t.fixQueTimes (q);
        t.stats.Dqueued = q.length;
        first = true;
        for (i=0; i<q.length; i++){
          if (q[i][0] < 60)          
            t.stats.wallSpaceQueued += parseInt(uW.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          else          
            t.stats.fieldSpaceQueued += parseInt(uW.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
		  q[i][7]=cityId;
          m += '<TR align=right><TD width="5px"><A><DIV onclick="cancelFort('+ q[i][0]+','+q[i][1]+','+q[i][2]+','+q[i][3]+','+q[i][5]+','+q[i][6]+','+q[i][7] +','+ i +')">X</div></a></td>'
          m += '<TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=pttdfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>'; 
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTright').innerHTML = m;
    }
    m = t.stats.Dqueued +' slots';
    if (totTime > 0)
      m += ', '+ uW.timestr(totTime);
    document.getElementById ('statDTtot').innerHTML = m;
  },
  
  
  dispTrainStatus : function (msg){
    var t = Tabs.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },

  butcancelTrain : function (typetrn, numtrptrn, trnTmp, trnETA, trnNeeded, cityId, trainingId){
    var t = Tabs.Train;
    var params = uW.Object.clone(uW.g_ajaxparams);
    
    params.pf =0;
    params.requestType = "CANCEL_TRAINING";
    params.cityId = cityId;
    params.typetrn = typetrn;
    params.numtrptrn =  numtrptrn;
    params.trnETA = trnETA;
    params.trnTmp = trnTmp;
    params.trnNeeded = trnNeeded;
    
    new AjaxRequest(uW.g_ajaxpath + "ajax/cancelTraining.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
        var rslt=eval("("+message.responseText+")");
        if (rslt.ok) {
					var k=0;
					for(var j=0;j<Seed.queue_unt["city"+cityId].length;j++){
						if(j>trainingId){
							Seed.queue_unt["city"+cityId][j][2]=parseInt(rslt.dateTraining[k]["start"]);
							Seed.queue_unt["city"+cityId][j][3]=parseInt(rslt.dateTraining[k]["end"]);
							k++;
						}
					}
			
			Seed.queue_unt["city"+cityId].splice(trainingId,1);
			for(var i=1;i<5;i++){
				var totalReturn=parseInt(uW.unitcost["unt"+typetrn][i])*parseInt(numtrptrn)*3600/2;
				Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
			}
        } 
        },
        onFailure: function () {
        },
    });
  },
  
 butcancelFort : function (typefrt, numtrpfrt, frtTmp, frtETA, frtNeeded, frtid, cityId, queueId){
   var t = Tabs.Train;
   var params = uW.Object.clone(uW.g_ajaxparams);
   
   params.pf =0;
   params.requestType = "CANCEL_FORTIFICATIONS";
   params.cityId = cityId;
   params.typefrt = typefrt;
   params.numtrpfrt =  numtrpfrt;
   params.frtETA = frtETA;
   params.frtTmp = frtTmp;
   params.frtNeeded = frtNeeded;
   params.frtid = frtid;
   
   new AjaxRequest(uW.g_ajaxpath + "ajax/cancelFortifications.php" + uW.g_ajaxsuffix, {
       method: "post",
       parameters: params,
       onSuccess: function (message) {
       var rslt=eval("("+message.responseText+")");
       if (rslt.ok) {
 			var k=0;
 			for(var j=0;j<Seed.queue_fort["city"+cityId].length;j++){
 				if(j>queueId){
 					Seed.queue_fort["city"+cityId][j][2]=parseInt(rslt.dateFortifications[k]["start"]);
 					Seed.queue_fort["city"+cityId][j][3]=parseInt(rslt.dateFortifications[k]["end"]);
 					k++;
 				}
 			}
			uW.update_seed(rslt.updateSeed);
 			Seed.queue_fort["city"+cityId].splice(queueId,1);
 			for(var i=1;i<5;i++){
 				Seed.resources["city"+cityId]["rec"+i][0]=parseInt(Seed.resources["city"+cityId]["rec"+i][0])+totalReturn;
 			}
 		}
       },
       onFailure: function () {
       },
   });
 },
 
  
  stopTraining : function (msg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    t.trainTimer = null;
    t.dispTrainStatus (msg +'<BR>');
    t.TDbutDo.disabled = false;
    t.TTbutDo.disabled = false;
    t.TTbutDo.value = uW.g_js_strings.modal_openBarracks.trainttl;
    t.TDbutDo.value = uW.g_js_strings.modal_openWalls.builddefenses;
    t.TTbutDo.className = '';
    t.TDbutDo.className = '';
    t.running = false;
  },
  
  
  doQueue : function (cityId, tut, que, errMsg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    try {
      t.displayCityStats();
      if (errMsg){
        t.stopTraining ('<SPAN class=boldRed>'+ errMsg +'</span>');
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.stopTraining ('<B>'+uW.g_js_strings.update_queue.troopqueue+'</b>');
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus (uW.g_js_strings.modal_barracks_train.starttraining+': '+ cmd[2] +' '+  uW.unitcost['unt'+cmd[1]][0] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');
        doTrain (cityId, tut, cmd[1], cmd[2], 
          function(errMsg){
            if (t.running)
              t.trainTimer = setTimeout(function (){Tabs.Train.doQueue(cityId, tut, que, errMsg);}, (Math.random()*2500)+1000 );
          }
        );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.stopTraining  ('<SPAN class=boldRed>'+uW.g_js_strings.barbarian.erroroccured +' '+ err.message +'</span>');
    }
  },
}


/*************************************** OVERVIEW TAB ************************************************/
var GMTclock = {
  span : null,
  timer : null,
  
  init : function (){
    this.span = document.createElement ('span');
    this.span.style.fontWeight = 'bold';
    document.getElementById('kochead_time').parentNode.appendChild (this.span);
    this.setEnable (Options.gmtClock);
  },

  setEnable : function (tf){
    var t = GMTclock;
    clearInterval (t.timer);
    if (tf){
      t.timer = setInterval (t.everySecond, 900);
    } else {
      t.span.innerHTML = '';
    }
  },
    
  everySecond : function (){
    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
    GMTclock.span.innerHTML = ' &nbsp; ('+ now.toLocaleFormat('%H:%M:%S') +' GMT)';
  },
}


function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  var search='type==10 || type==11';
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);

    if (type==10 || type==11)
	      wilds[1] += parseInt(w[k].tileLevel);
	    else 
	      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

function getWallInfo (cityId, objOut){
  objOut.wallSpaceUsed = 0;
  objOut.fieldSpaceUsed = 0;
  objOut.wallLevel = 0;  
  objOut.wallSpace = 0;     
  objOut.fieldSpace = 0;  
  var b = Seed.buildings["city" + cityId];
  if (b.pos1==null)
    return;  
  objOut.wallLevel = parseInt(b.pos1[1]);
  var spots = 0;
  for (var i=1; i<(objOut.wallLevel+1); i++)
    spots += (i * 500);
  objOut.wallSpace = spots;     
  objOut.fieldSpace = spots;  
     
  var fort = Seed.fortifications["city" + cityId];
  for (k in fort){
    var id = parseInt(k.substr(4));
    if (id<60)
      objOut.wallSpaceUsed += parseInt(uW.fortstats["unt"+ id][5]) * parseInt(fort[k]);
    else
      objOut.fieldSpaceUsed += parseInt(uW.fortstats["unt"+ id][5]) * parseInt(fort[k]);
  }
}    


Tabs.OverView = {
  tabOrder : 1,
  tabLabel : uW.g_js_strings.commonstr.overview,
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  	
  init : function (div){
    var t = Tabs.OverView;
    dt = new Date ();
    dt.setTime (Seed.player.datejoinUnixTime * 1000);
    t.cont = div;
    
    var main = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>';
    main +='<TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>';
    main +='<TD><SPAN class=ptStatLight>Might:</span> ' + addCommas(Seed.player.might) +'</td>';
    main +='<TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>';
    main +='<TD align=right><SPAN class=ptStatLight>Domain:</span> ' + uW.domainName +'</td></tr></table></div>';      
    main +='<TABLE class=ptTab align=left><TR>';
    main +='<TD width=125px><SELECT id="ShowExtra"><option value="maximum">'+uW.g_js_strings.commonstr.maximum+'</options>';
    main +='<option value="normal">'+uW.g_js_strings.commonstr.normal+'</options></select></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit value='+uW.g_js_strings.commonstr.resources+'></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubB type=submit value='+uW.g_js_strings.commonstr.troops+'></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubC type=submit value='+uW.g_js_strings.modaltitles.buildings+'></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubD type=submit value='+uW.g_js_strings.commonstr.info+'></td></tr></table><BR><BR>';
    main +='<DIV id=ptOverOutput align=left style="margin-top:10px; background-color:"#F8F8F8"; height:680px; overflow:scroll;"></div>';
            
    t.cont.innerHTML = main;
    t.Overv = document.getElementById('ptOverOutput');
    
    document.getElementById('ShowExtra').value = Options.OverViewShowExtra; 
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubB').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubC').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubD').addEventListener('click', e_butSubtab, false);
    document.getElementById('ShowExtra').addEventListener('change', function(){
           Options.OverViewShowExtra = document.getElementById('ShowExtra').value;
           saveOptions();
           clearTimeout (t.displayTimer);
           t.init(div); 
    }, false);
    changeSubtab (document.getElementById('ptmrchSubA'));
    
    function e_butSubtab (evt){            
      changeSubtab (evt.target);   
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab'; 
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel'; 
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      Options.curMarchTab = t.curTabName;
      t.show ();
    }    
  },

  hide : function (){
    var t = Tabs.OverView;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){
    var t = Tabs.OverView;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'A') 
    	if (Options.OverViewShowExtra == "maximum") t.showResources(); 
    		else t.paintOld();
    else if (t.curTabName == 'B')
      t.showTroops();
    else if (t.curTabName == 'C')
      t.showBuilds();
    else if (t.curTabName == 'D')
      t.showInfo();
  },
  
      showResources : function (){
        var t = Tabs.OverView;
        t.Overv.innerHTML = null;
        t.Overv.style.maxHeight = '700px';
        t.Overv.style.overflowY = 'scroll';
        clearTimeout (t.displayTimer);	
         var z = "<DIV id=overMain><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right><TD style='background: #FFFFFF; border:none;'></td>";
              for(i=0; i<Cities.numCities; i++) {
                z += "<TD width=81 style='background: #FFFFFF'><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>"+ uW.provincenames['p'+ Cities.cities[i].provId];
                cityID = 'city'+Cities.cities[i].id;
                Gate = parseInt(Seed.citystats[cityID].gate);
                if(Gate == 0)
                  z+= '<BR>Hiding</td>';
                else
                  z+= '<BR><SPAN class=boldRed>Defending</span></td>';
              }
        	  for (a=1;a<=4;a++){
        	  		var total = 0;
        	  		z+='<TR><TD colspan="8" style="background: #FFFFFF"><B>'+uW.resourceinfo['rec'+a]+': </b></td></tr><TR>';
        	  		for(b=0; b<Cities.numCities; b++) total += parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0]/3600);
        	  		z+='<TD>'+ addCommas(total) +'</td>';
        	  		for(b=0; b<Cities.numCities; b++) z+='<TD align=right ">'+ addCommas( parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0]/3600)) +'</font></td>';
        	  		z+='</tr><TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.showResourceTooltip.caplimit+':</font></td>';
        	  		for(b=0; b<Cities.numCities; b++) {
        	  			    z+='<TD align=right style="background: #FFFFFF">';
        	  				if (parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][1]/3600) > parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0]/3600)) z+='<FONT COLOR= "669900">';
        	  				else z+='<FONT COLOR="686868">';
        	  				z+= addCommas( parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][1]/3600));
        	  				z+='</font></td>';
        	  		}
        	  		z+='</tr><TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.showResourceTooltip.hrprod+':</font></td>';
        	  		for(b=0; b<Cities.numCities; b++) {
        	  				var rp = getResourceProduction (Seed.cities[b][0]);
        	  				var usage = parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][3]);
        	  				z+='<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">'+ addCommas(rp[a] - usage)  +'</font></td>';
        	  		}
        	  		z+='</tr>';
        	  		if (a==1){
        	  			z+='<TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.commonstr.upkeep+':</font></td>';
        	  			for(b=0; b<Cities.numCities; b++){
        	  				 var rp = getResourceProduction (Seed.cities[b][0]);
        	  				 var usage = parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][3]);
        	  				 var prod = rp[a] - usage;
        	  				 var timeLeft = parseInt(Seed.resources["city" + Seed.cities[b][0]]['rec'+a][0]) / 3600 / (0-prod) * 3600;
        				 	 if (prod > 0) z+='<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">----</font></td>';
        	  				 else {
        		  				 if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600)) z+='<TD align=right style="background: #FFFFFF"><FONT COLOR=RED>';
        		  				 else  z+='<TD align=right style="background: #FFFFFF"> <FONT COLOR="686868">';
        		  				 z+= timestrShort(timeLeft) +'</font></td>';
        		  				 
        	  				}
        	  		   }
        	  	  }
        	  	  var totalmarching = 0;
        	  	  for(b=0; b<Cities.numCities; b++) {
        	  	  	   var march = Seed.queue_atkp['city' + Seed.cities[b][0]];
        	  	  	   if (march != []) for (c in march) 
        	  	  	   		if (march[c]['resource'+a] != undefined && march[c]['marchType'] != 9) totalmarching += parseInt(march[c]['resource'+a]);
        	  	  } 
        	  	  if (totalmarching > 0){
		        	  	  z+='</tr><TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.commonstr.marching+':</font></td>';
		        	  	  for(b=0; b<Cities.numCities; b++) {
		        	  	  	   var recmarching = 0;
		        	  	  	   var march = Seed.queue_atkp['city' + Seed.cities[b][0]];
		        	  	  	   if (march != []) for (c in march) 
		        	  	  	   		if (march[c]['resource'+a] != undefined && march[c]['marchType'] != 9) recmarching += (parseInt(march[c]['resource'+a]));
		        	  	       if (recmarching !=0)	z+= '<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">'+addCommas(recmarching)+'</font></td>';
		        	  	       else z+= '<TD align=right style="background: #FFFFFF"></td>';
		        	  	  }	
		       	  }
        	  }
        	  z+='</tr><TR><TD colspan="8" style="background: #FFFFFF; border:none">&nbsp;</td><TR><TD colspan="8" style="background: #FFFFFF"><B>'+uW.g_js_strings.commonstr.gold+':</b></td></tr><TR>';
        	  var goldtotal = 0;
        	  for(b=0; b<Cities.numCities; b++) goldtotal += parseInt(Seed.citystats["city" + Seed.cities[b][0]]['gold'][0]);
        	  z+='<TD>'+addCommas(goldtotal)+'</td>';
        	  for(b=0; b<Cities.numCities; b++) {
        	  		z+='<TD align=right >'+ addCommas(Seed.citystats["city" + Seed.cities[b][0]]['gold'][0])  +'</td>';
        	  }
        	  z+='<TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.showGoldTooltip.netincome+':</font></td>';
        	  for(b=0; b<Cities.numCities; b++) {
        	  		var f = 1;
        	  		if (parseInt(Seed.playerEffects.r0BstExp) > unixTime()) f = 2;
        	  		var g = parseInt(parseInt(Seed.citystats["city" + Seed.cities[b][0]]['gold'][1] * Seed.citystats["city" + Seed.cities[b][0]]['pop'][0]) * 0.01) * f;
        	  		var h = parseInt(Seed.citystats["city" + Seed.cities[b][0]]["gold"][2] * 10 * -1);
        	  		z+='<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">'+ addCommas(g+h)  +'</font></td>';
        	  }
        	  z+='</tr><TR><TD colspan="8" style="background: #FFFFFF">&nbsp;</td> </tr><TR><TD style="background: #F8F8F8"><B>'+uW.g_js_strings.showPopTooltip.idlepop+':</b></td>';
        	  for(b=0; b<Cities.numCities; b++) {
    	  			var i = Seed.citystats["city" + Seed.cities[b][0]]['pop'][0];
    	  			var j = Seed.citystats["city" + Seed.cities[b][0]]['pop'][3];
    	  			var k = i - j;
    	  			if (k > 0) z+='<TD align=right style="background: #FFFFFF">'+ addCommas(k)  +'</td>'; 
    	  			 else z+='<TD align=right style="background: #FFFFFF"><FONT COLOR=red>'+ addCommas(k)  +'</font></td>';
        	  }  
        	 z+='</tr><TR><TD colspan="8" style="background: #FFFFFF">&nbsp;</td> </tr><TR><TD style="background: #F8F8F8"><B>'+uW.g_js_strings.showMyWilderness.conqueredwild+':</b></td>';
        		for(b=0; b<Cities.numCities; b++) {
        		      var totWilds = 0;
        			  dat = Seed.wilderness['city'+ Seed.cities[b][0]];
        			  if (dat!=null && matTypeof(dat)=='object')
        		  			for (k in dat)
        		    			++totWilds;
        			 var castle = parseInt(Seed.buildings['city'+ Seed.cities[b][0]].pos0[1]);
        			 if(castle == 11) castle = 12;
        			 else if(castle == 12) castle = 14;
        			 if (totWilds < castle)
        		  	z+=  '<TD align=right "><FONT COLOR=RED>'+ totWilds +'/'+ castle +'</font></span>';
        			else
        		  		z+=  '<TD align=right>'+ totWilds +'/'+ castle +'</span>';
        		}
        		z+='</tr>';
              for (c in uW.cm.WILDERNESS_TYPES){
              		var wildtype ='';
              		switch (c) {
              		  case 'GRASSLAND' : wildtype = uW.g_js_strings.commonstr.grassland;break;
              		  case 'LAKE' : wildtype = uW.g_js_strings.commonstr.lake;break;
              		  case 'WOODS' : wildtype = uW.g_js_strings.commonstr.woods;break;
              		  case 'HILLS' : wildtype = uW.g_js_strings.commonstr.hills;break;
              		  case 'MOUNTAIN' : wildtype = uW.g_js_strings.commonstr.mountain;break;
              		  case 'PLAIN' : wildtype = uW.g_js_strings.commonstr.plain;break;
              		}
              		var grandtotal = 0;
              		for(b=0; b<Cities.numCities; b++) {
              			dat = Seed.wilderness['city'+ Seed.cities[b][0]];
              			if (dat!=null && matTypeof(dat)=='object') for (k in dat) if (dat[k]['tileType'] == uW.cm.WILDERNESS_TYPES[c]) grandtotal++; 
              		}
              		if (grandtotal >0) {
		              		z+='<TR><TD style="background: #FFFFFF">'+wildtype+'</td>';
		              		for(b=0; b<Cities.numCities; b++) {		
		              			var total =0;
		              			dat = Seed.wilderness['city'+ Seed.cities[b][0]];
		              			if (dat!=null && matTypeof(dat)=='object')
		              					for (k in dat)
		              						if (dat[k]['tileType'] == uW.cm.WILDERNESS_TYPES[c])
		              							++total;  
		        				if (total >0) z+='<TD align=right style="background: #FFFFFF">'+total+'</td>';
		        				else z+='<TD style="background: #FFFFFF"></td>';
		        					
		              		}
		              		z+='</tr>';
		      	    }       
              }
             
        var totboosts = false;
        	  var l = Seed.playerEffects;
            for (p in l) if (l[p] > unixTime()) totboosts =true;               
            if (totboosts) {
                z+='</tr><TR><TD colspan="8" style="background: #FFFFFF; border:none">&nbsp;</td> </tr><TR><TD style="background: #F8F8F8"><B>'+uW.g_js_strings.commonstr.boost+':</b></td>';
                for (p in l) {
                   if (p =='r0BstExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.resourceinfo['rec'+0]+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='r1BstExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.resourceinfo['rec'+1]+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='r2BstExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.resourceinfo['rec'+2]+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='r3BstExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.resourceinfo['rec'+3]+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='r4BstExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.resourceinfo['rec'+4]+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='atkExpire' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.g_js_strings.commonstr.attack+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='defExpire' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.g_js_strings.commonstr.defend+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='loadExpire' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.g_js_strings.modal_barracks_train.load+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='returnExpire' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.g_js_strings.commonstr.returning+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='troopUpkeepReductExp' && l[p] > unixTime()) z+='<TR><TD style="background: #FFFFFF">'+uW.g_js_strings.commonstr.upkeep+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
                   if (p =='fogExpire' && l[p] > unixTime()) z+='<TR ><TD style="background: #FFFFFF">'+uW.itemlist.i10021.name+'</td><TD align=right style="background: #FFFFFF">'+ timestr((l[p] - unixTime())) +'</td></tr>';
               }
            }      
        z+='</table></div>';
      t.Overv.innerHTML = z;
     	t.displayTimer = setTimeout (t.showResources, 1000);  
   },   
      
        
    showTroops : function (){
      var t = Tabs.OverView;
      t.Overv.innerHTML =null;
      t.Overv.style.maxHeight = '700px';
      t.Overv.style.overflowY = 'scroll';
      var n = "<TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right></td><TD colspan='2' id=update align=center style='background: #FFFFFF; border:none; vertical-align:middle'><INPUT id=TEST type=submit value="+uW.g_js_strings.modal_progress_actions.updatestatus+"></td></td>";
           for(i=0; i<Cities.numCities; i++) {
             n += "<TD width=81 style='background: #FFFFFF'><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>"+ uW.provincenames['p'+ Cities.cities[i].provId] +"</td>";
           }
   	  for(a=1;a<13;a++) {
   	        var total=0;
   	        var marching = 0;
   	        var raiding = 0;
   	        var tottraining = 0;
   	        
   	        for(b=0; b<Cities.numCities; b++) {
   	        	   var train = Seed.queue_unt['city' + Seed.cities[b][0]];
   	        	   if (train != []) for (c in train) if (train[c][0] == a) tottraining += parseInt(train[c][1]);
   	        }
   	        if (tottraining > 0) var rowsp = 3; 
   	        else var rowsp = 2; 
   	        n+='<TR><TD rowspan="'+rowsp+'" style="background: #FFFFFF; vertical-align:top;"><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_'+a+'_30.jpg></td>';
   	        for(b=0; b<Cities.numCities; b++) total += parseInt(Seed.units['city' + Seed.cities[b][0]]['unt'+a]);
   	        if (total >0) n+='<TD align=right >'+addCommas(total)+'</td>';
   	        else n+='<TD align=right >&nbsp;</td>';
   	        for(b=0; b<Cities.numCities; b++) {
   	        	if (Seed.units['city' + Seed.cities[b][0]]['unt'+a] > 0) n+= '<TD align=right >'+addCommas(Seed.units['city' + Seed.cities[b][0]]['unt'+a])+'</td>';
   	        	else n+='<TD ></td>';
   	        }
   	        n+='</tr><TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.commonstr.marching+'</font></td>';
   	        for(b=0; b<Cities.numCities; b++) {
   	        	   marching = 0;
   	        	   raiding = 0;
   	        	   var atkp = Seed.queue_atkp['city' + Seed.cities[b][0]];
   	        	   if (atkp != []){
	   	        	   for (c in atkp){
	   	        	   		if (atkp[c]['marchType'] == 9) raiding += (parseInt(atkp[c]['unit'+a+'Count']) + parseInt(atkp[c]['unit'+a+'Return']));
	   	        	   		else if (atkp[c]['marchType'] != undefined)marching += parseInt(atkp[c]['unit'+a+'Count']);
	   	        	   }
	   	        	   if (marching >0 || raiding > 0) {
	   	        	   		n+= '<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">'+addCommas(marching)+' / ';
	   	        	   		n+= addCommas(raiding)+'</font></td>';
   	        	   	   }
   	        	   	   else n+='<TD style="background: #FFFFFF"></td>';	
   	        	   }
   	        }
   	      if (tottraining >0){
   	        n+='</tr><TR><TD style="background: #FFFFFF"><FONT COLOR="686868">'+uW.g_js_strings.modal_openBarracks.trainingttl+'</font></td>';
   	        for(b=0; b<Cities.numCities; b++) {
   	        	   training = 0;
   	        	   var train = Seed.queue_unt['city' + Seed.cities[b][0]];
   	        	   if (train != []){
	   	        	   for (c in train) if (train[c][0] == a) training += parseInt(train[c][1]);
	   	        	   if (training >0) {
	   	        	   		n+= '<TD align=right style="background: #FFFFFF"><FONT COLOR="686868">'+addCommas(training)+'</font></td>';
   	        	   	   }
   	        	   	   else n+='<TD style="background: #FFFFFF"></td>';	
   	        	   }
   	      }
   	  		n+='</tr>';
   	  	}
   	  }
   	  n+='<TR><TD colspan="8" style="background: #FFFFFF; border:none;">&nbsp;</td> </tr>';
      n+='<TR><TD colspan="2" style="border=solid">'+uW.g_js_strings.openKnights.myknights+':</td>';
      for(b=0; b<Cities.numCities; b++) {
           var knights=0;
           var knightscity = Seed.knights['city' + Seed.cities[b][0]];
           if (knightscity != []) for (c in knightscity) if (knightscity[c]['knightId'] > 0) knights++;
        	 n+= '<TD align=right >'+knights+'</td>';	
      }
      n+='</tr><TR><TD colspan="2" >'+uW.g_js_strings.commonstr.combat+':</td>';
      for(b=0; b<Cities.numCities; b++) {
           var combat=0;
           var knightscity = Seed.knights['city' + Seed.cities[b][0]];
           if (knightscity != []) for (c in knightscity) if (knightscity[c]['combat'] > combat) 
               if (Seed.leaders['city' + Seed.cities[b][0]]['combatKnightId'] != knightscity[c]['knightId'])  combat = knightscity[c]['combat'];
        	 n+= '<TD align=right style="background: #FFFFFF">'+combat+'</td>';	
      }
      
      n+='<TR><TD colspan="8" style="background: #FFFFFF; border:none;">&nbsp;</td> </tr>';
      n+='<TR><TD colspan="2" style="border=solid">'+uW.g_js_strings.modal_barracks_trainingtab.totaltraintime+':</td>';
      for(b=0; b<Cities.numCities; b++) {
           var time=0;
           now = unixTime();
           var  unt = Seed.queue_unt['city' + Seed.cities[b][0]];
           //alert(unt.length);
           if (unt != null && unt.length > 0) time = (unt[unt.length-1][3] - now);
           if (time < 0) time=0;
           if (time < 3600) n+= '<TD align=right ><FONT COLOR=red>'+timestr(time)+'</font></td>';	
           else n+= '<TD align=right >'+timestr(time)+'</td>';	
      }
      
      
      
   	  n+='</tr></table>';
   	  t.Overv.innerHTML = n;
   	  
   	  document.getElementById('TEST').addEventListener('click', function(){
   	  		var params = uW.Object.clone(uW.g_ajaxparams);
   	    			new AjaxRequest(uW.g_ajaxpath + "/fb/e2/src/main_src.php?g=&y=0&n=nan001&l=nl_NL&messagebox=&standalone=0&res=1&iframe=1&lang=en&ts=1304248288.7067&s=250&appBar=" + uW.g_ajaxsuffix, {
   	    			    method: "POST",
   	    			    parameters: params,
   	    			    onSuccess: function (rslt) {
   	    			        var mainSrcHTMLCode = rslt.responseText;
   	    			    	var myregexp = /var seed=\{.*?\};/;
   	    			    	var match = myregexp.exec(mainSrcHTMLCode);
   	    			    	if (match != null) {
   	    			    		result = match[0];
   	    			    		result = result.substr(4);
   	    			    		var seed = eval(result);
   	  	  			    		uW.document.seed = seed;
   	  	  			    		Seed = seed;
   	  	  			    		uW.seed = seed;
   	  	  			    		document.getElementById('update').style.background ='#99FF99';
   	  	  			    		setTimeout(function(){ (document.getElementById('update').style.background ='#FFFFF'); }, 1000);
   	    			    	}
   	    			    },
   	    			    onFailure: function () {
   	    			      if (notify != null)
   	    			        notify(rslt.errorMsg);
   	    			    },
   	    			});
   	  	
   	  }, false);
   	    	
      t.displayTimer = setTimeout (t.showTroops, 1000);  
    },
	
	
  showBuilds : function (){
    var t = Tabs.OverView;
    clearTimeout (t.displayTimer);
    t.Overv.innerHTML =null;
    t.Overv.style.maxHeight = '700px';
    t.Overv.style.overflowY = 'scroll';	
    var wall=0;
    var blacksmith=0;
    var fletching=0;
    var geometry = 0;
    var metalalloys = 0;
    var logging = 0;
    var poisonededge = 0;
    var WallSpace = {1:1000,
    			  2:3000,
    			  3:6000,
    			  4:10000,
    			  5:15000,
    			  6:21000,
    			  7:28000,
    			  8:36000,
    			  9:45000,
    			  10:55000,
    			  11:66000};
    var FieldSpace = {1:13,
    			  2:16,
    			  3:19,
    			  4:22,
    			  5:25,
    			  6:28,
    			  7:31,
    			  8:34,
    			  9:37,
    			  10:40,
    			  11:40};
    			  		   
    fertilizer = Seed.tech['tch1'];
    logging = Seed.tech['tch2'];
    stoneworking = Seed.tech['tch3'];
    mining = Seed.tech['tch4'];
    geometry = Seed.tech['tch5'];
    eagleeyes = Seed.tech['tch6'];
    poisonededge = Seed.tech['tch8'];
    metalalloys = Seed.tech['tch9'];
    featherweightpowder = Seed.tech['tch10'];
    magicalmapping = Seed.tech['tch11'];
    alloyhorseshoes = Seed.tech['tch12'];
    fletching = Seed.tech['tch13'];
    shrinkingpowder = Seed.tech['tch14'];
    healingpotions = Seed.tech['tch15'];
    giantsstrength = Seed.tech['tch16'];			  		       
    
    var m = '<DIV id=BuildsDiv style="font-size:12px"><TABLE cellpadding=5 cellspacing=0 border="1" style="border: 1px solid; border-style: none none none none;"><TR valign=top align=right>';
    m += "<TD align=left width=85 style='background-color:"+Colors.OverviewDarkRow+";'><INPUT id=showReq type=checkbox " + (t.showReq?'CHECKED ':'') +">Show missing req.</td>";
    for(i=0; i<Cities.numCities; i++) {
      m += "<TD width=79 style='background-color:"+Colors.OverviewDarkRow+"'><B>"+ Cities.cities[i].name.substring(0,11) +"</b><BR>"+ coordLink(Cities.cities[i].x, Cities.cities[i].y) +"<BR></td>";
    }
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Building</td>';	
    for(i=0; i<Seed.cities.length; i++) {
    	city = 'city'+Seed.cities[i][0];
    	m+='<TD width=79 style="background:#FFFFFF">';
    	if (Seed.queue_con[city][0] != undefined) {
    		m+=uW.buildingcost['bdg' + Seed.queue_con[city][0][0]][0];
    		m+=' ('+Seed.queue_con[city][0][1]+')';
    		m+='<br>'+ timestr((Seed.queue_con[city][0][4] - unixTime()),true);
    	}
    	m+='</td>';	
    }
    m+='</tr>';
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Researching</td>';	
    for(i=0; i<Seed.cities.length; i++) {
    	city = 'city'+Seed.cities[i][0];
    	m+='<TD width=79 style="background:#FFFFFF">';
    	if (Seed.queue_tch[city][0] != undefined) {
    		m+=uW.techcost['tch' + Seed.queue_tch[city][0][0]][0];
    		m+=' ('+Seed.queue_tch[city][0][1]+')';
    		m+='<br>'+ timestr((Seed.queue_tch[city][0][3] - unixTime()),true);
    	}
    	m+='</td>';		
    }
    m+='</tr><TR><TD colspan="8" style="background: #FFFFFF; border:none">&nbsp;</td></tr>';
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">'+uW.fortcost['frt53'][0]+'</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/2 - parseInt(Seed.fortifications[city]["fort53"]) - parseInt(Seed.fortifications[city]["fort55"]);
    	m+= '<TD width=79 style="background:#FFFFFF">' + Seed.fortifications[city]["fort53"];
    	if (wall >=6 && blacksmith >=6 && fletching >=5 && max > 0) m+= '<br>Left: ' + max +'</td>';
    	else if (t.showReq){
    			if (wall < 6) m+= '<br><FONT COLOR= "CC0000">Wall: ' + wall + '(6)</font>';
    			if (blacksmith < 6) m+= '<br><FONT COLOR= "CC0000">BlackS.: ' + blacksmith + '(6)</font>';
    			if (fletching < 5) m+= '<br><FONT COLOR= "CC0000">Fletch.: ' + fletching + '(5)</font>';
    			m+='</td>';
    		} 		
    }
    m+='</tr><TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">'+uW.fortcost['frt55'][0]+'</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/4 - parseInt(Seed.fortifications[city]["fort53"]) - parseInt(Seed.fortifications[city]["fort55"]);
    	m+=  '<TD width=79 style="background:#FFFFFF">' +Seed.fortifications[city]["fort55"];
    	if (wall >=8 && blacksmith >=8 && fletching >=7 && geometry>=7 && max > 0) m+= '<br>Left: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 8) m+= '<br><FONT COLOR= "CC0000">Wall: ' + wall + '(8)</font>';
    			if (blacksmith < 8) m+= '<br><FONT COLOR= "CC0000">BlackS.: ' + blacksmith + '(8)</font>';
    			if (fletching < 7) m+= '<br><FONT COLOR= "CC0000">Fletch.: ' + fletching + '(7)</font>';
    			if (geometry < 7) m+= '<br><FONT COLOR= "CC0000">Geomet.: ' + geometry + '(7)</font>';
    			m+='</td>';
    	} 	
    }
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Wall defences</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    	}
    	build = (parseInt(Seed.fortifications[city]["fort53"])*2)+ (parseInt(Seed.fortifications[city]["fort55"])*4);
    	max = WallSpace[wall]/2;
    	if (build < max) m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "CC0000">';
    	else m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "669900">';
    	m+= build+'</font>';
    	m+= '/' + max +'</td>';
    }
    m+='</tr><TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">'+uW.fortcost['frt60'][0]+'</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/4 - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+=  '<TD width=79 style="background:#FFFFFF">'+Seed.fortifications[city]["fort60"];
    	if (wall >=4 && blacksmith >=4 && poisonededge>=4 && max>0) m+= '<br>Left: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 4) m+= '<br><FONT COLOR= "CC0000">Wall: ' + wall + '(4)</font>';
    			if (blacksmith < 4) m+= '<br><FONT COLOR= "CC0000">BlackS.: ' + blacksmith + '(4)</font>';
    			if (poisonededge < 4) m+= '<br><FONT COLOR= "CC0000">Poison.: ' + poisonededge + '(4)</font>';
    			m+='</td>';
    	} 	
    }
    m+='</tr><TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">'+uW.fortcost['frt61'][0]+'</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = WallSpace[wall]/2/1 - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+= '<TD width=79 style="background:#FFFFFF">'+Seed.fortifications[city]["fort61"];
    	if (wall >=1 && metalalloys >=1 && max>0) m+= '<br>Left: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 1) m+= '<br><FONT COLOR= "CC0000">Wall: ' + wall + '(1)</font>';
    			if (metalalloys < 1) m+= '<br><FONT COLOR= "CC0000">Metal.: ' + metalalloys + '(1)</font>';
    			m+='</td>';
    	} 	
    }
    m+='</tr><TR valign=top align=right><TD style="background-color:'+Colors.OverviewDarkRow+';">'+uW.fortcost['frt62'][0]+'</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1]; 
    	}
    	max = (WallSpace[wall]/2/3).toFixed(0) - (parseInt(Seed.fortifications[city]["fort60"])*4) - (parseInt(Seed.fortifications[city]["fort61"])*1) - (parseInt(Seed.fortifications[city]["fort62"])*3);
    	m+=  '<TD width=79 style="background:#FFFFFF">'+Seed.fortifications[city]["fort62"];
    	if (wall >=2 && blacksmith>=2 && logging>=2 && max>0) m+= '<br>Left: ' + max+'</td>';
    	else if (t.showReq){
    			if (wall < 2) m+= '<br><FONT COLOR= "CC0000">Wall: ' + wall + '(2)</font>';
    			if (blacksmith < 2) m+= '<br><FONT COLOR= "CC0000">BlackS.: ' + blacksmith + '(2)</font>';
    			if (logging < 2) m+= '<br><FONT COLOR= "CC0000">Logg.: ' + logging + '(2)</font>';
    			m+='</td>';
    	} 	
    }
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Field defences</td>';
    for (i=0;i<Seed.cities.length;i++){
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 19) wall = Seed.buildings[city][y][1];
    	}
    	build = (parseInt(Seed.fortifications[city]["fort60"])*4)+ (parseInt(Seed.fortifications[city]["fort61"])*1) + (parseInt(Seed.fortifications[city]["fort62"])*3);
    	max = WallSpace[wall]/2;
    	if (build < max) m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "CC0000">';
    	else m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "669900">';
    	m+= build+'</font>';
    	m+= '/' + max +'</td>';
    }
    m+='</tr><TR><TD colspan="8" style="background: #FFFFFF; border:none">&nbsp;</td></tr>';
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">City space</td>';
    
    for(i=0; i<Seed.cities.length; i++) {
    	var count=0;
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] >=5 && Seed.buildings[city][y][0] <19) count++;
    	}
    	if (count == 31) m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "669900">';
    	else m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "CC0000">';
    	m+= count + '</font> (31)</td>';
    }
    m+='</tr>';
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Field space</td>';
    
    for(i=0; i<Seed.cities.length; i++) {
    	var count=0;
    	var castle=0;
    	city = 'city'+Seed.cities[i][0];
    	for (y in Seed.buildings[city]) {
    		if (Seed.buildings[city][y][0] == 0) castle = Seed.buildings[city][y][1];
    		if (Seed.buildings[city][y][0] >=1 && Seed.buildings[city][y][0] <=4) count++;
    	}
    	if (count == FieldSpace[castle]) m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "669900">';
    	else m+='<TD width=79 style="background:#FFFFFF"><FONT COLOR= "CC0000">';
    	m+= count + '</font> ('+FieldSpace[castle]+')</td>';
    }
    m+='</tr>';
    for (b=0;b<20;b++){
    	m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">'+uW.buildingcost['bdg' + b][0]+'</td>';
        for (c=0;c<Seed.cities.length;c++){
        	m+='<TD style="width:79px; max-width:79px; word-wrap: break-word; background:#FFFFFF">';
        		city= 'city'+Seed.cities[c][0];
        		var count =0;
        		for (y in Seed.buildings[city]) {
        			if (Seed.buildings[city][y][0] == b) {
        				count++;
        				if (count > 1) m+=",";
        				if (Seed.buildings[city][y][1] >= 9) m+='<FONT COLOR= "669900">';
        				m+=Seed.buildings[city][y][1];
        				if (Seed.buildings[city][y][1] >= 9) m+='</font>';
        				
        			}
        		}
        		if (count == 0) {
        			m+='<FONT COLOR= "CC0000">0</font>';
        		}
        	m+='</td>';		
        }
        m+='</tr>';
    } 
    m+='</tr><TR><TD colspan="8" style="background: #FFFFFF; border:none">&nbsp;</td></tr>';
    for(i=0; i<Cities.numCities; i++) {
    }
    m+='<TR valign=top align=right><TD width=85 style="background-color:'+Colors.OverviewDarkRow+';">Guardians</td>';
    for(i=0; i<Seed.cities.length; i++) {
     	for(g=0;g<Seed.guardian.length;g++) {
     		if (Seed.guardian[g]['cityId'] == Seed.cities[i][0] && Seed.guardian[g]['level']!=0) {
     			m += '<TD width=79 style="background:#FFFFFF">';
     			if (Seed.guardian[g]['level'] >=9) m+='<FONT COLOR= "669900">'; 
     			m+=Seed.guardian[g]['level']+"("+Seed.guardian[g]['type']+")</td>";
     			if (Seed.guardian[g]['level'] >=9) m+='</font>'; 
     		}
     		else {if (Seed.guardian[g]['cityId'] == Seed.cities[i][0] && Seed.guardian[g]['level']==0) m += '<TD width=79 style="background:#FFFFFF"><FONT COLOR= "CC0000">0</font></td>'};
    	}
    }
    m+='</tr></table><BR></table><BR><TABLE class=ptBuilds  border=1px cellpadding=2 cellspacing=0><TR valign=top align=left>';
    for (i in uW.techcost) {
    	m+='<TD border=1px style="width:150px; background:#FFFFFF">'+uW.techcost[i][0]+'</td><TD align=center style="width:50px max-width:150px; background:#FFFFFF;">';
    	if (Seed.tech[i] >=9) m+='<FONT COLOR= "669900">';
    	if (Seed.tech[i] ==0) m+='<FONT COLOR= "CC0000">';
    	m+=Seed.tech[i];
    	if (Seed.tech[i] >=9 || Seed.tech[i] ==0) m+='</font>';
    	if (t.showReq) {
    		for(z=0; z<Seed.cities.length; z++) {
        		city = 'city'+Seed.cities[z][0];
        		for (y in Seed.buildings[city]) {
        			var farm,sawmill,quarry,mine,alchemylab,workshop,blacksmith,stable,storehouse,barracks = 0;
        			if (Seed.buildings[city][y][0] == 1 && Seed.buildings[city][y][0] > farm) farm = Seed.buildings[city][y][1]; 
        			if (Seed.buildings[city][y][0] == 2 && Seed.buildings[city][y][0] > sawmill) sawmill = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 3 && Seed.buildings[city][y][0] > quarry) quarry = Seed.buildings[city][y][1]; 
        			if (Seed.buildings[city][y][0] == 4 && Seed.buildings[city][y][0] > mine) mine = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 9) storehouse = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 11) alchemylab = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 13 && Seed.buildings[city][y][0] > barracks) barracks = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 15) blacksmith = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 16) workshop = Seed.buildings[city][y][1];
        			if (Seed.buildings[city][y][0] == 17) stable = Seed.buildings[city][y][1];
        		}
        	}
        	m+='<FONT COLOR= "CC0000">';
    		switch (i) {
    			case '1': 
    				if (alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab+ '('+ (Seed.tech[i]) +')';
    				if (farm < Seed.tech[i]) m+='<BR>Farm '+ farm +'('+ (Seed.tech[i]+1) +')</td>';
    				break;
    			case '2': 
    				if (alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab+ '('+ (Seed.tech[i]) +')';
    				if (sawmill < Seed.tech[i]) m+='<BR>Sawmill '+ sawmill +'('+ (Seed.tech[i]) +')';
    				break;
    			case '3': 
    				if (alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab+ '('+ (Seed.tech[i]) +')';
    				if (quarry < Seed.tech[i]) m+='<BR>Quarry '+ quarry +'('+ (Seed.tech[i]) +')</td>';
    				break;
    			case '4': 
    				if (alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab+ '('+ (Seed.tech[i]) +')';
    				if (mine < Seed.tech[i]) m+='<BR>Mine '+ mine +'('+ (Seed.tech[i]) +')';
    				break;
    			case '5': 
    				if (alchemylab < 3) m+='<BR>Alchemy Lab '+ alchemylab +'(3)';
    				if (alchemylab >= 3 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (workshop < Seed.tech[i]) m+='<BR>Workshop ' + workshop +'('+ (Seed.tech[i]) +')';
    				if (stoneworking < 2) m+='<BR>Stoneworking '+ stoneworking +'(2)';
    				break;
    			case '6': 
    				if (alchemylab < 3) m+='<BR>Alchemy Lab '+ alchemylab +'(3)';
    				if (alchemylab >= 3 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				break;	
    			case '8': 
    				if (alchemylab < 2) m+='<BR>Alchemy Lab '+ alchemylab +'(2)';
    				if (alchemylab >= 2 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (barracks < 2) m+='<BR>Barracks '+ barracks +'(2)';
    				break;		
    			case '9': 
    				if (alchemylab < 3) m+='<BR>Alchemy Lab '+ alchemylab +'(3)';
    				if (alchemylab >= 3 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (blacksmith < Seed.tech[i]) m+='<BR>Blacksmith '+ blacksmith+'('+ (Seed.tech[i]) +')';
    				if (mining < Seed.tech[i]) m+='<BR>Mining '+ mining +'('+ (Seed.tech[i]) +')';
    				break;
    			case '10': 
    				if (alchemylab < 4) m+='<BR>Alchemy Lab '+ alchemylab +'(4)';
    				if (alchemylab >= 4 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				break;
    			case '11': 
    				if (alchemylab < 4) m+='<BR>Alchemy Lab '+ alchemylab +'(4)';
    				if (alchemylab >= 4 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				break;
    			case '12': 
    				if (alchemylab < 5) m+='<BR>Alchemy Lab '+ alchemylab +'(5)';
    				if (alchemylab >= 5 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (stable < Seed.tech[i]) m+='<BR>Stable '+ stable +'('+ (Seed.tech[i]+1) +')';
    				if (metalalloys < Seed.tech[i]) m+='<BR>Metal Alloys '+ metalalloys +'('+ (Seed.tech[i]+1) +')';
    				break;
    			case '13': 
    				if (alchemylab < 4) m+='<BR>Alchemy Lab '+ alchemylab +'(4)';
    				if (alchemylab >= 4 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (logging < 4) m+='<BR>Logging '+ logging +'(4)';
    				break;
    			case '14': 
    				if (alchemylab < 6) m+='<BR>Alchemy Lab '+ alchemylab +'(6)';
    				if (alchemylab >= 6 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (storehouse < Seed.tech[i]) m+='<BR>Storehouse '+ storehouse +'('+ (Seed.tech[i]) +')';
    				if (logging < 3) m+='<BR>Logging '+ logging+'(3)';
    				break;
    			case '15': 
    				if (alchemylab < 6) m+='<BR>Alchemy Lab '+ alchemylab +'(6)';
    				if (alchemylab >= 6 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (featherweightpowder  < 3) m+='<BR>Featherweight Powder  '+ featherweightpowder +'(3)';
    				break;
    			case '16': 
    				if (alchemylab < 5) m+='<BR>Alchemy Lab '+ alchemylab +'(5)';
    				if (alchemylab >= 5 && alchemylab < Seed.tech[i]) m+='<BR>Alchemy Lab '+ alchemylab +'('+ (Seed.tech[i]) +')';
    				if (logging  < 5) m+='<BR>Logging '+ logging +'(5)';
    				if (geometry  < 2) m+='<BR>Geometry  '+ geometry +'(2)';
    				break;
    		}
    		m+='</font>';
    	}
    	m+='</td></tr>';
    }	
    m+='</table></div>';
    t.Overv.innerHTML = m;
    document.getElementById('showReq').addEventListener ('change', function (){
    	t.showReq = document.getElementById('showReq').checked;
    	t.showBuilds();
    },false);	
    t.displayTimer = setTimeout (t.showBuilds, 1000);
  },
  
  showInfo : function (){
      var t = Tabs.OverView;
      t.Overv.innerHTML = null;
      t.Overv.style.maxHeight = '700px';
      t.Overv.style.overflowY = 'scroll';
      clearTimeout (t.displayTimer);	
      
	  var u='<DIV class=ptstat>USEFULL LINKS</div><DIV id=ptLinks><TABLE align=center cellpadding=1 cellspacing=0><TR>';
	  u+='<TD width="300px" ; border:none">Scripts</td><TD width="300px" ; border:none">Information sites</td></tr>';
	  u+='<TR><TD width="300px" ; border:none"><a href="http://userscripts.org/scripts/show/103659" target="_blank">Power Tools (Koc Scripters)</a></td>';
	  u+='<TD width="300px" ; border:none"><a href="http://koctools.com/index.php?pageid=servers" target="_blank">KOCTools</a></td></tr>';
	  u+='<TR><TD width="100px" ; border:none"><a href="http://code.google.com/p/koc-power-tools/wiki/Home?tm=6" target="_blank">Power Tools WIKI</a></td>';
	  u+='<TD width="300px" ; border:none"><a href="http://koc.dunno.com/index.sjs?f=ListServers" target="_blank">KOC Mapper</a></td></tr>';
	  u+='<TR><TD width="100px" ; border:none"><a href="http://userscripts.org/scripts/show/101052" target="_blank">Power Bot (Koc Scripters)</a></td>';
	  u+='<TD width="300px" ; border:none"><a href="http://kocmon.com/" target="_blank">KoC Monitor</a></td></tr>';
	  u+='<TR><TD width="100px" ; border:none"><a href="http://code.google.com/p/koc-power-bot/wiki/Home?tm=6" target="_blank">Power Bot WIKI</a></td>';
	  u+='<TD width="300px" ; border:none"><a href="http://koc.wikia.com/wiki/" target="_blank">Koc Wikia</a></td></tr>';
	  u+='<TR><TD width="100px" ; border:none"><a href="https://addons.mozilla.org/en/firefox/addon/greasemonkey/" target="_blank">Greasemonkey</a></td><TD width="100px" ; border:none"></td>';
	  u+='<TR><TD width="100px" ; border:none"><a href="https://addons.mozilla.org/en/firefox/addon/scriptish/" target="_blank">Scriptish</a></td><TD width="100px" ; border:none"></td>';
	  u+='</tr></table></div><BR>';
	  
	  var crestreq = { 3:{1101:4, 1102:2, 1103:1},
	  				 4:{1103:4, 1104:3, 1105:1},
	  				 5:{1106:4, 1107:3, 1108:2},
	  				 6:{1109:4, 1110:3, 1111:2},
	  				 7:{1112:4, 1113:3, 1114:2}
	  				};
	  				
	  u+='<DIV class=ptstat>CREST INFO</div><DIV id=ptLinks><TABLE align=center cellpadding=1 cellspacing=0><TR>';
	  for (city in crestreq){
	  		deed = 'q800' + city;
        if (Seed.quests[deed] ==1) u+='<TD width=75px style="background:#CCFFCC">';
        else  u+='<TD width=75px ">';
        u+= uW.g_js_strings.commonstr.city+' '+city+'</td>';
	  		for (crest in crestreq[city]){
	  			owned = Seed.items['i'+crest];
	  			if (Seed.quests[deed] ==1) u+='<TD 200px style="background:#CCFFCC">';
          else  u+='<TD 200px ">';
	  			if (owned == undefined) owned=0;
	  			if (owned < crestreq[city][crest]) u+='<FONT color=red>'+owned+'/'+crestreq[city][crest]+'</font> '+uW.itemlist['i'+crest]['name']+'</td>';
	  				else  u+='<FONT color=green>'+owned+'/'+crestreq[city][crest]+'</font> '+uW.itemlist['i'+crest]['name']+'</td>'; 
	  		}
	  		u+='</tr>';
	  }
	  u+='</table><BR>';
	  fortmight = {
	        u53: "4",
	        u55: "7",
	        u60: "1",
	        u61: "2",
	        u62: "3",
	      };
	      rownum = 0;
	      u += '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
	              .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
	              .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
	              .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
	          <DIV style="overflow-y:auto; overflow-x:hidden"><DIV class=ptstat>UNIT INFORMATION</div><TABLE align=center cellpadding=1 cellspacing=0>\
	          <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COST TO BUILD</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Upkeep</b></td></tr>\
	          <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Food</td><TD class=xtabH>Wood</td><TD class=xtabH>Stone</td>\
	          <TD class=xtabH>Ore</td><TD class=xtabH>Pop</td><TD class=xtabHL>Might</td><TD class=xtabH>Life</td><TD class=xtabH>Atk</td><TD class=xtabH>Def</td><TD class=xtabH>Speed</td><TD class=xtabH>Range</td><TD class=xtabH>Load</td>\
	          <TD class=xtabHL>Food</td></tr>\
	          <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';
	      for (ui=1; ui<13; ui++){
	        if (++rownum % 2)
	          rsty = '';
	        else
	          rsty = ' style="background: #e8e8e8" ';
	        cost = uW.unitcost['unt'+ui];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
	        stats = uW.unitstats['unt'+ui];   //  Life, Attack, Defense, Speed, Range, Load
	        food = uW.unitupkeeps[ui];
	        might = uW.unitmight['u'+ui];
	        u += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0].substr(0,16) +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
	            <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
	            <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
	            <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';
	  
	      }
	      u += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
	      for (k in uW.fortcost){
	        if (++rownum % 2)
	          rsty = '';
	        else
	          rsty = ' style="background: #e8e8e8" ';
	        cost = unsafeWindow.fortcost[k];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
	        fi = k.substring(3);
	        stats = unsafeWindow.fortstats['unt'+fi];   //  Life, Attack, Defense, Speed, Range, Load
	        food = 0;
	        might = fortmight['u'+fi];
	        name = cost[0].replace ('Defensive','');
	        name = name.replace ('Wall-Mounted','');
	        u+= '<TR '+ rsty +'align=right><TD align=left class=xtab><B>'+ name +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
	            <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
	            <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
	            <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';
	      }
	      u += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
	      u += '</table></div><BR>';
	      
	      u += '<DIV class=ptstat>MISC INFO</div><TABLE><TD width="200px" style="background-color:#FFFFFF; border:none">KofC client version: '+ KOCversion +'</td>';
	      u += '<TD style="background-color:#FFFFFF; border:none"><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG"></td></table></div>';
      
      t.Overv.innerHTML = u;   
      document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);  
  },      

  paintOld : function (){
    var rownum = 0;
    var t = Tabs.OverView;
    
    clearTimeout (Tabs.OverView.displayTimer);
    t.Overv.innerHTML = null;
    t.Overv.style.maxHeight = '700px';
    t.Overv.style.overflowY = 'scroll';

    function _row (name, row, noTotal){
      var t = Tabs.OverView;
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
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('> &nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ffc">');
      if (TEST_WIDE)
          m.push ('X,');        
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
      if (TEST_WIDE)
         m.push ('X,');        
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }
    
    //DebugTimer.start(); 
    try {
      if (Options.includeMarching)
        march = getMarchInfo ();

      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
              
      str = "<DIV id=overMainDiv style='font-size:"+ Options.overviewFontSize +"px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=88 style='background: #ffc'><B>TOTAL</b></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";
      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marching</b></td>';
      str += "</tr>";
  
    str += '<TR valign=top align=right><TD></td><TD style=\'background: #ffc\'></td>';
    for(i=0; i<Cities.numCities; i++){
      cityID = 'city'+Cities.cities[i].id;
      Gate = parseInt(Seed.citystats[cityID].gate);
    if(Gate == 0)
      str += '<TD>Hiding</td>';
    else
      str += '<TD><SPAN class=boldRed>Defending</span></td>';
    }

      rows = [];
      rows[0] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      }
      for (r=1; r<5; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
        }
      }
  
      if (Options.includeMarching){
        for (var i=0; i<5; i++)
          rows[i][Cities.numCities] = march.resources[i];
      }
      str += _row ('Gold', rows[0]);
      str += _row ('Food', rows[1]);
      str += _row ('Wood', rows[2]);
      str += _row ('Stone', rows[3]);
      str += _row ('Ore', rows[4]);
      str += '<TR><TD colspan=10><BR></td></tr>';
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }
      if (Options.includeTraining){
        var q = Seed.queue_unt;
        for(i=0; i<Cities.numCities; i++) {
          q = Seed.queue_unt['city'+ Cities.cities[i].id];
          if (q && q.length>0){
            for (qi=0; qi<q.length; qi++)
              rows[q[qi][0]][i] += parseInt(q[qi][1]);
          }    
        }
      }
      rownum = 0;
      str += _row ('SupTrp', rows[1]);
      str += _row ('Militia', rows[2]);
      str += _row ('Scout', rows[3]);
      str += _row ('Pike', rows[4]);
      str += _row ('Sword', rows[5]);
      str += _row ('Archer', rows[6]);
      str += _row ('Cavalry', rows[7]);
      str += _row ('Heavy', rows[8]);
      str += _row ('Wagon', rows[9]);
      str += _row ('Ballista', rows[10]);
      str += _row ('Ram', rows[11]);
      str += _row ('Catapult', rows[12]);
      str += '<TR><TD colspan=10><BR></td></tr>';
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
      }
     
      str += _row ('Food +/-', row, true);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '----';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600)
            row[i] = '----';
          else {
            if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600))
              row[i] = '<SPAN class=whiteOnRed>'+ timestrShort(timeLeft) +'</span>';
            else
              row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('Food left', row, true);
      str += '<TR><TD><BR></td></tr>';
      
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
       if(castle == 11) castle = 12;
       else if(castle == 12) castle = 14;
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('#Wilds', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('#Knights', row, true);
  
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_unt['city'+Cities.cities[i].id]; 
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime < 3600)
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }
      str += _row ('TroopQ', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
        var totTime = 0;
        var q = Seed.queue_fort['city'+Cities.cities[i].id]; 
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime<1 && (wall.wallSpaceUsed < wall.wallSpace-4 || wall.fieldSpaceUsed < wall.fieldSpace-4))
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }    
      str += _row ('WallQue', row, true);
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Include Marching Troops/Resources</td></tr>';
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptoverIncTraining'+ (Options.includeTraining?' CHECKED':'') +'>Include troops in training</td></tr>';
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><INPUT type=CHECKBOX id=ptOverOver'+ (Options.overviewAllowOverflow?' CHECKED':'') +'>Allow width overflow \
         &nbsp; &nbsp; FONT SIZE: '+ htmlSelector ({9:9, 10:10, 11:11, 12:12}, Options.overviewFontSize, 'id=ptoverfont') +'</td></tr><BR>';
      str += "</table></div>";
      str+= 'Koc Power Tools Version:' + Version;
      t.Overv.innerHTML = str;
      document.getElementById('idCheck').addEventListener('click', e_clickEnableMarch, false);
      document.getElementById('ptoverIncTraining').addEventListener('click', e_clickEnableTraining, false);
      document.getElementById('ptOverOver').addEventListener('click', e_allowWidthOverflow, false);
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
    //DebugTimer.display ('Draw Overview');    
    } catch (e){
      t.Overv.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.paintOld, 5000);	

    function e_clickEnableMarch (){
      var t = Tabs.OverView;
      Options.includeMarching = document.getElementById('idCheck').checked;
      t.paintOld ();
    }
    function e_clickEnableTraining (){
      var t = Tabs.OverView;
      Options.includeTraining = document.getElementById('ptoverIncTraining').checked;
      t.paintOld ();
    }

    function e_fontSize(evt){
      document.getElementById('ptOverOutput').style.fontSize = evt.target.value +'px'; 
      Options.overviewFontSize = evt.target.value;
      t.paintOld ();
    }

    function e_allowWidthOverflow (evt){
      var t = Tabs.OverView;
      var tf = document.getElementById('ptOverOver').checked;
      Options.overviewAllowOverflow = tf;
      if (tf)
        t.Overv.style.overflowX = 'visible';
      else
        t.Overv.style.overflowX = 'auto';
      t.paintOld ();
    }
  },
};


/********************************* Messages Tab *************************************/
Tabs.msg = {
  tabOrder : 110,
  tabLabel : uW.g_js_strings.modaltitles.messages,
  maxPages:9999,
  totalPages:0,
  content:"",

  init : function (div){
    var t = Tabs.msg;
    t.cont=div;
    uW.getmsg = t.getEmailBody;
	uW.getReport = t.getReportBody;
	    
    var m = '<DIV class=ptstat>Search inbox or alliance reports</div>';
    m += '<DIV class=ptentry style="height:30px"><table>';
    m += '<TABLE width=95% class=ptTab><TD>Search in: <select id="searchSelect"><option value="Reports">Reports</option>';
    m += '<option value="inbox">Inbox</option>';
    m += '<option value="outbox">Outbox</option></select></td>';
    
    m += '<TD>Pages: <select id="pagesSelect">';
    m += '<option value=1> 1 </option>'
    m += '<option value=5> 5 </option>'
    m += '<option value=10> 10 </option>'
    m += '<option value=20> 20 </option>'
    m += '<option value=30> 30 </option>'
    m += '<option value=40> 40 </option>'
    m += '<option value=50> 50 </option>'
    m += '<option value=60> 60 </option>'
    m += '<option value=70> 70 </option>'
    m += '<option value=80> 80 </option>'
    m += '<option value=90> 90 </option>'
    m += '<option value=100> 100 </option>'
    m += '<option value=101> All </option></select></td>'
    
    m += '<TD>Search in: <select disabled=true id="searchForSelect"><option value="Subject">Subject</option>';
    m += '<option value="User">User</option></select></td>';
    
    m += '<TD>Search for:<INPUT id=searchString disabled=true type=text size=10 maxlength=25 value=""</td>';
    m += '<TD><INPUT id=StartSearch type=submit value="Start Search"></td>';
    m += '<TD><DIV id="searchStatus"></div></td></table>';
    m += '<BR><DIV id="ReportResults" style="height:470px; max-height:470px; width=100%;"></div>';
    
    t.cont.innerHTML = m;
        
    document.getElementById('StartSearch').addEventListener ('click', function(){ 
        	 if (document.getElementById('searchSelect').value == "Reports") {
        	 		t.totalPages = 0;
        	 		t.content = '<center><table><thead><th>Click</th><th>Page#</th><th>Date</th><th>Attacker</th><th>From</th><th>Alliance</th><th>Action</th><th>Target</th><th>Type</th><th>At</th></thead><tbody>';
        	 		t.searchReports("",1); 
        	 }
        	 else {
        	 	t.totalPages = 0;
        	 	t.content = '<center><table><thead><th>Click</th><th>Page#</th><th>Date</th><th>From</th><th>Subject</th></thead><tbody>';
        	 	t.searchMail("",1); 
        	 }
        }, false);
    document.getElementById('searchSelect').addEventListener ('change', function(){ 
        	if (document.getElementById('searchSelect').value == "Reports")  {
              document.getElementById('searchString').disabled=true;
              document.getElementById('searchForSelect').disabled=true;
          }
        	else {
              document.getElementById('searchString').disabled=false;
              document.getElementById('searchForSelect').disabled=false;
          }
        }, false);
        
    return this.cont;
  },

 
  searchReports : function(rslt, pageNum) {
    var t = Tabs.msg;
    t.maxPages=document.getElementById("pagesSelect").value;
    
    if (t.totalPages==0){
  		    var params = uW.Object.clone(uW.g_ajaxparams);
  		      params.pf=0;
  		      params.group="a";
  		      params.pageNo = 1;
  		         
  		      new MyAjaxRequest(uW.g_ajaxpath + "ajax/listReports.php" + uW.g_ajaxsuffix, {
  		      method: "post",
  		      parameters: params,
  		      onSuccess: function (rslt) {
  		          if (rslt.ok)
  		          t.totalPages = parseInt(rslt['totalPages']);
  		      },
  		      onFailure: function () {
  		      },
  		    }, false);
    }
    
    if ( t.maxPages==101 && t.totalPages > 0)
       t.maxPages=t.totalPages;
       
       
    if (parseInt(pageNum) <= t.maxPages) {
          document.getElementById('searchStatus').innerHTML = pageNum;
          t.getReports(pageNum);
       }
       else {
          document.getElementById('searchStatus').innerHTML = "DONE";
       } 
  },
  
  getReports : function (pageNum){
    var t = Tabs.msg;
    var params = uW.Object.clone(uW.g_ajaxparams);
      params.pf=0;
      params.group="a";
      params.pageNo = pageNum;
         
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/listReports.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          if (rslt.ok)
          t.searchInReports(rslt, pageNum);     
      },
      onFailure: function () {
      },
    }, false);
  },
  
  
  searchInReports: function(rslt,pageNum){
  	   var t = Tabs.msg;  
  	   var myarray = rslt['arReports'];
  	   var results=document.getElementById("ReportResults");
  	   
  	   for (k in myarray) {
  	   	if (getMyAlliance()[0] != myarray[k]['side1AllianceId'] || myarray[k]['marchType'] == 2) {
	  	        t.content += '<TR><TD><A><SPAN onclick="getReport('+ myarray[k]['reportId']+','+myarray[k]['side0TileType']	 +')">OPEN</span></a></td>';
	  	    	t.content +='<TD>'+ pageNum +'</td>';
	  	    	t.content +='<TD>'+ uW.formatDateByUnixTime(myarray[k]['reportUnixTime']) +'</td>';
	  	    	t.content +='<TD>';
	  	    	if ( rslt['arPlayerNames']['g'+myarray[k]['side1PlayerId']] == "M") t.content +='Lord ';
	  	    	if ( rslt['arPlayerNames']['g'+myarray[k]['side1PlayerId']] == "F") t.content +='Lady ';
	  	    	t.content += rslt['arPlayerNames']['p'+myarray[k]['side1PlayerId']]+'</td>'
	  	    	t.content +='<TD>'+ coordLink(myarray[k]['side1XCoord'],myarray[k]['side1YCoord']) +'</td>';
	  	   		t.content +='<TD>'+ rslt['arAllianceNames']['a'+myarray[k]['side1AllianceId']] +'</td>';
	  	   		if (myarray[k]['marchType'] == 2) t.content +='<TD><FONT color="00CC33">Reinf</font></td>';
	  	   		if (myarray[k]['marchType'] == 3) t.content +='<TD><FONT color="FF9933">Scout</font></td>';
	  	   		if (myarray[k]['marchType'] == 4) t.content +='<TD><FONT color="FF0033">Attack</font></td>';
				t.content +='<TD>';
				if ( rslt['arPlayerNames']['g'+myarray[k]['side0PlayerId']] == "M") t.content +='Lord ';
				if ( rslt['arPlayerNames']['g'+myarray[k]['side0PlayerId']] == "F") t.content +='Lady ';
				t.content += rslt['arPlayerNames']['p'+myarray[k]['side0PlayerId']]+'</td>'
				
				if ( myarray[k]['side0TileType'] == 51 ) t.content += '<TD>City (' + myarray[k]['side0TileLevel'] + ')</td>';
				else t.content += '<TD><FONT color="#909090"> Wild (' + myarray[k]['side0TileLevel'] + ')</font></td>';
	  	    	t.content +='<TD>'+ coordLink(myarray[k]['side0XCoord'],myarray[k]['side0YCoord']) +'</td>';
  	   	  }	
       }
       results.innerHTML = t.content;
       pageNum++;
       t.searchReports(rslt, pageNum); 
  },
  
  
  searchMail : function(rslt, pageNum) {
    var t = Tabs.msg;
    t.maxPages=document.getElementById("pagesSelect").value;
    
    if (t.totalPages==0){
		    var params = uW.Object.clone(uW.g_ajaxparams);
		      params.pf=0;
		      params.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
		      params.boxType = document.getElementById('searchSelect').value;
		      params.pageNo = 1;
		         
		      new MyAjaxRequest(uW.g_ajaxpath + "ajax/getEmail.php" + uW.g_ajaxsuffix, {
		      method: "post",
		      parameters: params,
		      onSuccess: function (rslt) {
		          if (rslt.ok)
		          t.totalPages = parseInt(rslt['noOfPages']);
		      },
		      onFailure: function () {
		      },
		    }, false);
    }
    
    if ( t.maxPages==101 && t.totalPages > 0)
       t.maxPages=t.totalPages;
       
    if (parseInt(pageNum) <= t.maxPages) {
          document.getElementById('searchStatus').innerHTML = pageNum;
          t.getMail(pageNum);
       }
       else {
          document.getElementById('searchStatus').innerHTML = "DONE";
       } 
  },
  
  getMail : function (pageNum){
    var t = Tabs.msg;
    var params = uW.Object.clone(uW.g_ajaxparams);
      params.pf=0;
      params.requestType="GET_MESSAGE_HEADERS_FOR_USER_INBOX";
      params.boxType = document.getElementById('searchSelect').value;
      params.pageNo = pageNum;
         
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getEmail.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          if (rslt.ok)
          t.searchInMail(rslt, pageNum);     
      },
      onFailure: function () {
      },
    }, false);
  },
  
  getReportBody : function(ID,TileId){
    var t = Tabs.msg;
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.pf=0;
    params.rid=ID;
    params.side=0;
     
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/fetchReport.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          	t.showReportBody(rslt,TileId);
      },
      onFailure: function () {
      },
    }, false);
  },
  
  showReportBody: function (rslt,TileId) {
  	var t = Tabs.msg;
  	var popReport = null;
  	t.popReport = new CPopup('pbShowBarbs', 0, 0, 500, 300, true, function() {clearTimeout (1000);});
  	t.popReport.centerMe (mainPop.getMainDiv());  
  	var m = '<DIV style="max-height:275px; height:275px; overflow-y:scroll">'; 
  	
  	m+='<TABLE class=ptTab>';
  	if (TileId < 51) m+='<TD><FONT size="3px">Wild Lvl.'+ rslt['tileLevel'] +'</font></td>';
  	if (rslt['conquered']==1) m+='<TD><FONT color="#CC0000" size="3px">Conquered</font></td></tr>';
  	if (rslt['winner']==1) m+='<TR><TD><FONT color="#CC0000" size="3px">Defeat</font></td></tr><TR><TD></TD></TR><TR><TD></TD></TR><TR><TD></TD></TR></table>';
  	if (rslt['winner']==0) m+='<TR><TD><FONT color="#66CC33" size="3px">Victory</font></td></tr><TR><TD></TD></TR><TR><TD></TD></TR><TR><TD></TD></TR></table>';
  	
		
	
	if (rslt['fght'] != undefined){
			m+='<TABLE style="float:left;width:45%;" class=ptTab><TR><TD align="center">Troops</td><TD align="center">Fought</td><TD align="center">Survived</td></tr>'; 
			if (rslt['fght']["s1"] != undefined) {
					for (var i=1;i<=12;i++) {
						if (rslt['fght']["s1"]['u'+i] != undefined) {
							if (rslt['fght']["s1"]['u'+i][0] > rslt['fght']["s1"]['u'+i][1]) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.png></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s1"]['u'+i][1]+'</font></td></tr>';
							else m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.png></td><TD align="center">'+rslt['fght']["s1"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s1"]['u'+i][1]+'</td></tr>';
						}
					}
			}
				  	
		  	if (rslt['fght']["s0"] != undefined) {
 				  	m+='</table><TABLE style="float:right;width:45%;" class=ptTab><TR><TD align="center">Troops</td><TD align="center">Fought</td><TD align="center">Survived</td></tr>';
				  	for (var i=1;i<=12;i++) {
				  		if (rslt['fght']["s0"]['u'+i] != undefined) {
				  			if (rslt['fght']["s0"]['u'+i][0] > rslt['fght']["s0"]['u'+i][1]) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.png></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['u'+i][1]+'</font></td></tr>';
				  			else m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.png></td><TD align="center">'+rslt['fght']["s0"]['u'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['u'+i][1]+'</td></tr>';
				  		}
				  	}
				  	
				  	for (var i=53;i<=55;i++) {
				  		if (rslt['fght']["s0"]['f'+i] != undefined) {
				  			if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.jpg></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
				  			else m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.jpg></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
				  		}
				  	}
				  	for (var i=60;i<=63;i++) {
				  		if (rslt['fght']["s0"]['f'+i] != undefined) {
				  			if (rslt['fght']["s0"]['f'+i][0] > rslt['fght']["s0"]['f'+i][1]) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.jpg></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center"><FONT color="#CC0000">'+rslt['fght']["s0"]['f'+i][1]+'</font></td></tr>';
				  			else m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.jpg></td><TD align="center">'+rslt['fght']["s0"]['f'+i][0]+'</td><TD align="center">'+rslt['fght']["s0"]['f'+i][1]+'</td></tr>';
				  		}
				  	}
		  	}
		  	m+='<TR><TD></TD></TR></table>';
	}
  	
  	if (rslt['unts']!= undefined) {
  		  	m+='<TABLE class=ptTab><TR><TD align="center">Troops</td><TD align="center">Reinforced</td></tr>';
  		  	for (var i=1;i<=12;i++) {
  		  		if (rslt['unts']['u'+i] != undefined) m+='<TR><TD align="center"><img src=http://koc.god-like.info/img/unit_'+i+'_30.png></td><TD align="center">'+rslt['unts']['u'+i]+'</td></tr>';
  		  	}
  	}
  	m+='<TR><TD></TD></TR><TR><TD></TD></TR></table>';
  	
  	if (rslt['loot'] != undefined) {
		  	m+='<TABLE class=ptTab><TR><TD><img src=http://koc.god-like.info/img/gold_30.png></td><TD>'+addCommas(rslt['loot'][0])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/food_30.png></td><TD>'+addCommas(rslt['loot'][1])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/wood_30.png></td><TD>'+addCommas(rslt['loot'][2])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/stone_30.png></td><TD>'+addCommas(rslt['loot'][3])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/iron_30.png></td><TD>'+addCommas(rslt['loot'][4])+'</td></table>';
	}	
	
	
	if (rslt['rsc'] != undefined) {
		  	m+='<TABLE class=ptTab><TR><TD><img src=http://koc.god-like.info/img/food_30.png></td><TD>'+addCommas(rslt['rsc']['r1'])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/wood_30.png></td><TD>'+addCommas(rslt['rsc']['r2'])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/stone_30.png></td><TD>'+addCommas(rslt['rsc']['r3'])+'</td>';
		  	m+='<TD><img src=http://koc.god-like.info/img/iron_30.png></td><TD>'+addCommas(rslt['rsc']['r4'])+'</td></table>';
	}	
	
	m+='</div>';
  	t.popReport.getMainDiv().innerHTML = m;
  	t.popReport.getTopDiv().innerHTML = '<TD><CENTER><B>BATTLE REPORT</center></td>';
  	t.popReport.show(true)	;
   },
   
  
  getEmailBody : function(ID){
    var t = Tabs.msg;
    var params = uW.Object.clone(uW.g_ajaxparams);
      params.messageId=ID;
      params.requestType="GET_MESSAGE_FOR_ID";
     
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/getEmail.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          if (rslt.ok)
          t.showEmailBody(rslt['messageBody'])
      },
      onFailure: function () {
      },
    }, false);
  },
  
  showEmailBody: function (messageBody) {
  	var t = Tabs.msg;
  	var popMsg = null;
  	t.popMsg = new CPopup('pbShowBarbs', 0, 0, 550, 300, true, function() {clearTimeout (1000);});
  	t.popMsg.centerMe (mainPop.getMainDiv());  
  	var m = '<DIV style="max-height:265px; height:265px; overflow-y:scroll">';  
  	m+= messageBody + '</div>';
  	t.popMsg.getMainDiv().innerHTML = m;
  	t.popMsg.getTopDiv().innerHTML = '<TD><CENTER><B>MESSAGES</center></td>';
  	t.popMsg.show(true)	;
   },
   
  
  searchInMail: function(rslt,pageNum){
	   var t = Tabs.msg;  
	   var myarray = rslt['message'];
	   var results=document.getElementById("ReportResults");
	   
	   for (k in myarray) {
	      if (document.getElementById('searchForSelect').value == "Subject") var lookup = myarray[k]['subject'];
	      else var lookup = myarray[k]['displayName'];
	      var what = document.getElementById('searchString').value;
	      if (lookup.search(what, "i") != -1){
	        t.content += '<TR><TD><A><SPAN onclick="getmsg('+ myarray[k]['messageId'] +')">OPEN</span></a></td>'
  	    	t.content +='<TD>'+ rslt['pageNo'] +'</td>';
  	    	t.content +='<TD>'+myarray[k]['dateSent']+'</td>';
  	    	t.content +='<TD>'+myarray[k]['displayName']+'</td>';
  	    	t.content +='<TD>'+myarray[k]['subject']+'</td>';
	   	  }	
       }
       results.innerHTML = t.content;
       pageNum++;
       t.searchMail(rslt, pageNum); 
  },
  
  show : function (){
  },

  hide : function (){
  },
};

/*********************************** Alliance TAB ***********************************/
Tabs.Alliance = {
  tabOrder : 120,
  tabLabel : uW.g_js_strings.commonstr.alliance,
  myDiv : null,
  alliancemembers:[],
  number:0,
  totalmembers:0,
  error:false,
  
  init : function (div){    
    var t = Tabs.Alliance;      
    t.myDiv = div;
     t.myDiv.style.overflowY = 'scroll';
     t.myDiv.style.maxHeight = '750px';
     t.totalmembers=0;
     t.alliancemembers=[];	
     
     uW.getdetails = t.getMemberDetails;
    
    var m =  '<DIV class=ptstat>ALLIANCE FUNCTIONS</div><TABLE align=center cellpadding=1 cellspacing=0></table>';
    
    m +='<TABLE class=ptTab><TD width=200px>List Alliance Members</td><TD>Sort by: <select id="searchAlli"><option value="name">Name</option>';
    m += '<option value="might">Might</option>';
    m += '<option value="login">'+uW.g_js_strings.modal_messages_viewreports_view.lastlogin+'</option>';
    m += '<option value="cities">Cities</option>';
    m += '<option value="position">Position</option>';
    m += '<option value="dip">Days in position (dip)</option></select></td>';
    m += '<TD><INPUT id=alList type=submit value="List"></td>';
    m += '<TD id=progress></td>';
    m += '<TR><TD width=200px>Show alliance diplomaties</td><TD><INPUT id=aldiplo type=submit value="List diplomaties"></td></tr></table>';
    
    m+='<DIV class=ptstat>OVERVIEW</div><TABLE align=center cellpadding=1 cellspacing=0></table>';
    m += '<TABLE id=alOverviewTab class=alTab><TR align="center"></tr></table>';
    
    
    t.myDiv.innerHTML = m;
    
    document.getElementById('alList').addEventListener('click', function(){
    	if (!t.searching){
	    	t.totalmembers=0;
	    	t.alliancemembers=[];	
		    document.getElementById('alOverviewTab').innerHTML ="";
		    document.getElementById('progress').innerHTML ="";
		    document.getElementById('progress').innerHTML = uW.g_js_strings.commonstr.loadingddd;
		    document.getElementById('alList').disabled = true;
		    t.error=false;
		    t.fetchAllianceMemberPage();
		} 
    }, false);
    
    document.getElementById('searchAlli').addEventListener('click', function(){
        if (t.alliancemembers!="") {
        	document.getElementById('alOverviewTab').innerHTML ="";
        	t.paintMembers(); 
        }
    }, false);
    document.getElementById('aldiplo').addEventListener('click', function(){t.paintDiplomacy();}, false);  
    
     
  //window.addEventListener('unload', t.onUnload, false);
  },
  
  
  paintMembers: function(){
  var t = Tabs.Alliance; 
	  		  if (document.getElementById('searchAlli').value == "name") {
				  var sortmembers = t.alliancemembers.sort(function(a, b){
				         var sortA=a.Name.toLowerCase(), sortB=b.Name.toLowerCase()
				         if (sortA < sortB) 
				          return -1
				         if (sortA > sortB)
				          return 1
				         return 0 
				        });
			  }     
			  if (document.getElementById('searchAlli').value == "might") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=parseInt(a.Might),sortB=parseInt(b.Might)
			  	         if (sortA > sortB) 
			  	          return -1
			  	         if (sortA < sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (document.getElementById('searchAlli').value == "login") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.LastLogin,sortB=b.LastLogin
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (document.getElementById('searchAlli').value == "cities") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.Cities,sortB=b.Cities
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (document.getElementById('searchAlli').value == "dip") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.dip,sortB=b.dip
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }     
			  if (document.getElementById('searchAlli').value == "position") {
			  	  var sortmembers = t.alliancemembers.sort(function(a, b){
			  	         var sortA=a.Position,sortB=b.Position
			  	         if (sortA < sortB) 
			  	          return -1
			  	         if (sortA > sortB)
			  	          return 1
			  	         return 0 
			  	        });
			  }      
			  for (var y = (sortmembers.length-1); y >=0; y--) {
			                      t._addTab(sortmembers[y].Name,sortmembers[y].Might,sortmembers[y].LastLogin,sortmembers[y].Position,sortmembers[y].dip,sortmembers[y].uid,sortmembers[y].fbuid,sortmembers[y].Cities);
			                      t.myDiv.style.overflowY = 'scroll';
			  }
			 t._addTabHeader();
   },
  
    _addTab: function(Name,Might,LastLogin,Position,dip,uid,fbuid,Cities){
             var t = Tabs.Alliance;
             var row = document.getElementById('alOverviewTab').insertRow(0);
             row.vAlign = 'top';
             row.insertCell(0).innerHTML ='<A target="_tab" href="http://www.facebook.com/profile.php?id='+ fbuid +'">profile</a>';
             row.insertCell(1).innerHTML = Name;
             var cell2 = row.insertCell(2);
       		 cell2.width = "60" ;
       		 cell2.align = "right" ;
       		 cell2.vAlign = "top";
       		 cell2.innerHTML = addCommas(Might);
       		 row.insertCell(3).innerHTML = Cities;
       		 row.insertCell(4).innerHTML = officerId2String (Position);
       		 row.insertCell(5).innerHTML = dip;
       		 row.insertCell(6).innerHTML = LastLogin;
          }, 
          
    _addTabHeader: function() {
    var t = Tabs.Alliance;
        var row = document.getElementById('alOverviewTab').insertRow(0);
        row.vAlign = 'top';
         row.insertCell(0).innerHTML = "Facebook";
        row.insertCell(1).innerHTML = "Name";
        row.insertCell(2).innerHTML = "Might";
        row.insertCell(3).innerHTML = "Cities";
        row.insertCell(4).innerHTML = "Position";
        row.insertCell(5).innerHTML = "DIP";
        row.insertCell(6).innerHTML = "LastLogin";
      },   
    
    
    paintDiplomacy : function () {
    	document.getElementById('alOverviewTab').innerHTML ="";
    	document.getElementById('progress').innerHTML ="";
    	var m= '<TR><TD colspan=4 style=\'background: #33CC66;\' align=center><B>Friendly: </b></td></tr>';
    	if (Seed.allianceDiplomacies['friendly'] == null) m+='<TR><TD>No Friendlies found...</td>';
    	else m += '<TABLE class=xtab><TR><TD>Alliance Name</td><TD>Members</td></tr>';
    	for (k in Seed.allianceDiplomacies['friendly']){
				m+='<TR><TD>'+Seed.allianceDiplomacies['friendly'][k]['allianceName']+'</td>';
				m+='<TD align=center>'+Seed.allianceDiplomacies['friendly'][k]['membersCount']+'</td>';
    	}
    	m+='<TR></tr></table>';
    	m+= '<TR><TD colspan=4 style=\'background: #CC0033;\' align=center><B>Hostile: </b></td></tr>';
    	if (Seed.allianceDiplomacies['hostile'] == null) m+='<TR><TD>No Hostiles found...</td>';
    	else m += '<TABLE class=xtab><TR><TD>Alliance Name</td><TD>Members</td></tr>';
    	for (k in Seed.allianceDiplomacies["hostile"]){
    		m+='<TR><TD>'+Seed.allianceDiplomacies["hostile"][k]['allianceName']+'</td>';
    		m+='<TD align=center>'+Seed.allianceDiplomacies["hostile"][k]['membersCount']+'</td>';
    	}
    	m+='<TR></tr></table>';
    	m+= '<TR><TD colspan=4 style=\'background: #FF6633;\' align=center><B>Friendly towards us: </b></td></tr>';
    	if (Seed.allianceDiplomacies['friendlyToYou'] == null) m+='<TR><TD>No Friendlies towards us found...</td>';
    	else m += '<TABLE class=xtab><TR><TD>Alliance Name</td><TD>Members</td></tr>';
    	for (k in Seed.allianceDiplomacies["friendlyToYou"]){
    		m+='<TR><TD>'+Seed.allianceDiplomacies["friendlyToYou"][k]['allianceName']+'</td>';
    		m+='<TD align=center>'+Seed.allianceDiplomacies["friendlyToYou"][k]['membersCount']+'</td>';
    	}
    	m+='<TR></tr></table>';
    	document.getElementById('alOverviewTab').innerHTML = m;
    },
    
  
    fetchAllianceMemberPage : function () {
    var t = Tabs.Alliance;
    document.getElementById('alList').disabled = true;
    var params = uW.Object.clone(uW.g_ajaxparams);
    
    params.pf = 0;
    
    new AjaxRequest(uW.g_ajaxpath + "ajax/allianceGetInfo.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (transport) {
      	  var rslt = eval("(" + transport.responseText + ")");
          t.totalmembers = (rslt["allianceInfo"]["members"]);
          for (var i=1;i<=10;i++) {
                 params.pageNo = i;
                 params.pf = 0;
                 new AjaxRequest(uW.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + uW.g_ajaxsuffix, {
                   method: "post",
                   parameters: params,
                   onSuccess: function (transport) {
                    var info = eval("(" + transport.responseText + ")");
                    if (info.ok) {  
                       for (var k in info["memberInfo"]){
                         if ( info["memberInfo"][k]["might"] != undefined && !t.error){  
                           t.alliancemembers.push ({
                               Name: info["memberInfo"][k]["name"],
                               Might: info["memberInfo"][k]["might"],
                               Cities: info["memberInfo"][k]["cities"],
                               Position : info["memberInfo"][k]["positionType"],
                               dip : info["memberInfo"][k]["daysInPosition"],
                               LastLogin : info["memberInfo"][k]["lastLogin"],
                               uid : info["memberInfo"][k]["userId"],
                               fbuid : info["memberInfo"][k]["fbuid"],	
                           });
                          }
                           document.getElementById('alOverviewTab').innerHTML ="";
                           t.paintMembers();
                   		}
                       if (!t.error) document.getElementById('progress').innerHTML	 = '(' + (t.alliancemembers.length) +'/'+ t.totalmembers +')';
                       if ( t.alliancemembers.length >= t.totalmembers) document.getElementById('alList').disabled = false;
                    } else  if (info.error) {
                    	document.getElementById('alList').disabled = false;
                    	document.getElementById('progress').innerHTML = "ERROR!";
                    	t.error=true;
                   	}
                   },
                   onFailure: function (rslt) {;
                     notify ({errorMsg:'AJAX error'});
                   },
                   
           });
          }
      },
      onFailure: function (rslt) {;
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  
  hide : function (){         
    mainPop.div.style.width = 750 + 'px';
  },

  show : function (){         
  		var t = Tabs.Alliance;
        mainPop.div.style.width = 750 + 'px';
  },
};

/*************************************** MARCHES TAB ************************************************/

Tabs.Marches = {
  tabOrder : 5,
  tabLabel : uW.g_js_strings.commonstr.marching,
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  widescreen:true,
  	
  init : function (div){
    var t = Tabs.Marches;
    uW.pr56Recall = t.butRecall;
    uW.r8x6Home = t.butSendHome;
    uW.cancelMarch = t.butcancelmarch;
    
    t.cont = div;
    var main = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubN type=submit value='+uW.g_js_strings.attack_viewimpending_view.incomingtroops+'></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value='+uW.g_js_strings.commonstr.marching+'></td>';
    main +='<TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value='+uW.g_js_strings.commonstr.reinforced+'></td></tr></table><HR class=ptThin>';
    main +='<DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:680px; overflow:scroll;"></div>';
    
    t.cont.innerHTML = main;       
    t.marchDiv = document.getElementById('ptMarchOutput');
    document.getElementById('ptmrchSubN').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSub'+Options.curMarchTab));
    
    function e_butSubtab (evt){
      changeSubtab (evt.target);   
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab'; 
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel'; 
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      Options.curMarchTab = t.curTabName;
      t.show ();
    }    
  },

  hide : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
  },
  
  show : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches();
    else 
      t.showIncoming();
  },
  
  /***   Incoming SUBTAB  ***/
      showIncoming : function (){
        var t = Tabs.Marches;
        t.marchDiv.innerHTML = null;	

        var z = '<TABLE id=pdincoming cellSpacing=10 width=100% height=0% class=pbTab>';
       
        for (k in Seed.queue_atkinc) {
          if(Seed.queue_atkinc.length !=0){
				var now = unixTime();
				var icon, status, FROM, cityname, FROMmight, marchdir, marchtime;
				var marchType = parseInt(Seed.queue_atkinc[k]["marchType"]);
				var marchStatus = parseInt(Seed.queue_atkinc[k]["marchStatus"]);
				
				for (var i=0; i<Seed.cities.length;i++) {
					if (Seed.cities[i][0] == Seed.queue_atkinc[k]["toCityId"]) cityname = Seed.cities[i][1];
				}   
			
				if (Seed.queue_atkinc[k]["destinationUnixTime"] < now || marchStatus == 8)
					marchdir = "returning";
				else
					marchdir = "going";	
				
				var destinationUnixTime = Seed.queue_atkinc[k]["arrivalTime"] - now;
				if(destinationUnixTime > 0)
					marchtime = timestr(destinationUnixTime, true)
				else
					marchtime = 'Arrived';
				
				if (marchType != 3 && marchType !=4){
					var player = Seed.players['u'+Seed.queue_atkinc[k]["fromPlayerId"]]
					FROM = player.n;
					FROMmight = player.m;
				}
				else {
					for (players in Seed.players){
						if (marchType == 3 || marchType == 4){ 
							if (('u'+Seed.queue_atkinc[k]["pid"]) == players){ 
							  FROM = Seed.players[players]["n"];
							  FROMmight = Seed.players[players]["m"];
							}
						}
					}
				}
				
				if (marchType == 2 && marchStatus == 2) marchType = 102;
				
				switch (marchType) {
					case 1: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status=uW.g_js_strings.commonstr.transport;break;
					case 2: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status=uW.g_js_strings.commonstr.reinforce	;break;
					case 3: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg";status=uW.g_js_strings.commonstr.scout;break;
					case 4: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status=uW.g_js_strings.commonstr.attack;break;
					case 9: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status=uW.g_js_strings.commonstr.attack;break;
					case 5: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status=uW.g_js_strings.commonstr.reassign;break;
					case 100: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg";status=uW.g_js_strings.commonstr.returning;break;
					case 102: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status=uW.g_js_strings.commonstr.encamped;break;
				} 
				
				if(status == uW.g_js_strings.commonstr.encamped)
					z += '<TD width="10px"><A onclick="r8x6Home('+ Seed.queue_atkinc[k].marchId +')"><img src='+ icon +'></a></td>';
				else
					z += '<TD width="10px"><img src='+ icon +'></td>';
				z += '<TD width="40px">'+ status +'</td>';
				z += '<TD>' + cityname + '</td>';
				z += '<TD>'+ marchtime +'</td>';
				z +='<TD>'+uW.g_js_strings.commonstr.from+': ' + FROM + '</td>';
				z +='<TD>'+uW.g_js_strings.commonstr.might+': ' + addCommas(FROMmight) + '</td>';
				if (Seed.queue_atkinc[k]["knt"] != undefined) z +='<TD>'+uW.g_js_strings.commonstr.knight+': '+ Seed.queue_atkinc[k]["knt"]["cbt"]+'</td>';
				
				if (Seed.queue_atkinc[k]["gold"] > 0) z += '<TD>'+uW.resourceinfo.rec0 +': '+ addCommas(Seed.queue_atkinc[k]["gold"]) +'</td>';
				if (Seed.queue_atkinc[k]["resource1"] > 0) z += '<TD>'+uW.resourceinfo.rec1 +': '+ addCommas(Seed.queue_atkinc[k]["resource1"]) +'</td>';
				if (Seed.queue_atkinc[k]["resource2"] > 0) z += '<TD>'+uW.resourceinfo.rec2 +': '+ addCommas(Seed.queue_atkinc[k]["resource2"]) +'</td>';
				if (Seed.queue_atkinc[k]["resource3"] > 0) z += '<TD>'+uW.resourceinfo.rec3 +': '+ addCommas(Seed.queue_atkinc[k]["resource3"]) +'</td>';
				if (Seed.queue_atkinc[k]["resource4"] > 0) z += '<TD>'+uW.resourceinfo.rec4 +': '+ addCommas(Seed.queue_atkinc[k]["resource4"]) +'</td>';
        		    
				for(i=1; i<13; i++){
					if(Seed.queue_atkinc[k]["unit"+i+"Count"] > 0 && marchdir == "going") z += '<TD>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkinc[k]["unit"+i+"Count"]) +'</td>';
					if(Seed.queue_atkinc[k]["unit"+i+"Return"] > 0 && marchdir == "returning") z += '<TD>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkinc[k]["unit"+i+"Return"]) +'</td>';
				}
        		
				if (marchType == 3)
					if (Seed.queue_atkinc[k]["unts"]["u3"] > 0) z += '<TD>'+uW.unitcost.unt3[0]+': '+ addCommas(Seed.queue_atkinc[k]["unts"]["u3"]) +'</td>';
				if (marchType == 4){
					for(ui=1; ui<13; ui++){
						if (Seed.queue_atkinc[k]["unts"]["u"+ui] > 0) z += '<TD>'+ uW.unitcost['unt'+ui][0] +': '+ addCommas(Seed.queue_atkinc[k]["unts"]["u"+ui]) +'</td>';
					}
				}
				
				z += '</tr>';
          } 
		}
     z += '</table>';
     t.marchDiv.innerHTML = z;
    
     t.displayTimer = setTimeout (t.showIncoming, 500);  
   },   
      
        
  /***   MARCHES SUBTAB  ***/
    showMarches : function (){
      var t = Tabs.Marches;
      t.marchDiv.innerHTML =null;	
      var updatemarch = Seed.queue_atkp;
     
     var  m = '<TABLE id=pdmarches cellSpacing=10 width=200px height=0% class=pbTab>';
     if (t.widescreen) m += '<TR><TD><INPUT id=Wide type=checkbox checked=true>Widescreen</td>';
     else  m += '<TR><TD><INPUT id=Wide type=checkbox unchecked=true>Widescreen</td></tr></table>';
     m+='<TABLE id=pdmarches cellSpacing=10 width=100% height=0% class=pbTab>';
     for (var c=0; c< Seed.cities.length;c++) {
     		cityname = Seed.cities[c][1];
     		cityID = 'city' + Seed.cities[c][0];    
    		number=0;	
    		
    		if (Seed.queue_atkp[cityID].length !=0) m+= '<TR><TD colspan=5 style=\'background: #99CCFF;\' align=center><B>' + cityname +': </b></td></tr>';
  		    for (k in Seed.queue_atkp[cityID]){
  				if (Seed.queue_atkp[cityID].length !=0) {
  				    var marchID = new String(k);
  				    marchID = marchID.substr(1);
  				    var marchType = parseInt(Seed.queue_atkp[cityID][k]["marchType"]);
  				    var marchStatus = parseInt(Seed.queue_atkp[cityID][k]["marchStatus"]);
  				    var now = unixTime();
  				    cityTo = null;
  				    number++;
					var icon, status, type, cityTo, knight, marchtime;
  				    
  				    for (var i=0; i<Seed.cities.length;i++) {
  				    		if (Seed.cities[i][2] == Seed.queue_atkp[cityID][k]["toXCoord"] && Seed.cities[i][3] == Seed.queue_atkp[cityID][k]["toYCoord"]) cityTo = Seed.cities[i][1];
  				    }
  				    
  				    //for (var i=0; i<Seed.cities.length;i++) {
					//	if (Seed.cities[i][2] == Seed.queue_atkp[cityID][k]["toCityId"]) cityTo = Seed.cities[i][1];
  				    //}
  				    
  				    var destinationUnixTime = Seed.queue_atkp[cityID][k]["destinationUnixTime"] - now;
  				    var returnUnixTime = Seed.queue_atkp[cityID][k]["returnUnixTime"] - now;
  				    var encampedUnixTime = now - Seed.queue_atkp[cityID][k]["destinationUnixTime"];
					var restingUnixTime = now - Seed.queue_atkp[cityID][k]["returnUnixTime"];
					
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] > now)
						marchtime = timestr(destinationUnixTime, true);
  				    else
						marchtime = timestr(returnUnixTime, true);
  				    
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now && marchType == 2)
						marchtime = timestr(encampedUnixTime, true);
					if (Seed.queue_atkp[cityID][k]["returnUnixTime"] < now && marchType == 9)
						marchtime = timestr(restingUnixTime, true);
  				  
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now || marchStatus == 8)
						type = "returning";
  				    else
						type = "going";
  				   
					if(Seed.queue_atkp[cityID][k]["destinationUnixTime"] < now){
						if (marchStatus == 8)
							marchtime = timestr(returnUnixTime, true);
						if (type =="returning" && marchType == 2 && marchStatus != 2)
							marchtime = timestr(returnUnixTime, true);
						if (type =="returning" && marchType == 4 && marchStatus == 2)
							marchtime = timestr(returnUnixTime, true);
						if (marchStatus == 2 && marchType !=2)
							marchtime = timestr(returnUnixTime, true);
					}
  				    if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2)
						marchtime = timestr(destinationUnixTime, true);;
  				    
					
					if (type =="returning" && marchType != 2)
						marchType = 8;
  				    if (type =="returning" && marchType == 2 && marchStatus == 2)
						marchType = 102;
  				    if (type =="returning" && marchType == 2 && marchStatus != 2)
						marchType = 8;
  				    if (marchStatus == 3)
							marchType = 103;
					if (marchStatus == 4)
							marchType = 104;
					
					
  				    if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2) {
  						marchType = 102;
  						marchtime = timestr(encampedUnixTime, true)
  				    }
  
  				    switch (marchType) {
  					    case 1: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status=uW.g_js_strings.commonstr.transport;break;
  					    case 2: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status=uW.g_js_strings.commonstr.reinforce;break;
  					    case 3: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg";status=uW.g_js_strings.commonstr.scout;break;
  					    case 4: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status=uW.g_js_strings.commonstr.attack;break;
  					    case 5: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status=uW.g_js_strings.commonstr.reassign;break;
  					    case 8: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg";status=uW.g_js_strings.commonstr.returning;break;
  					    case 9: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status=uW.g_js_strings.commonstr.raid;break;
  					    case 102: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status=uW.g_js_strings.commonstr.encamped;break;
						case 103: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png";status=unsafeWindowg_js_strings.attack_generatequeue.raidstopped;break;
						case 104: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png";status=uW.g_js_strings.attack_generatequeue.raidresting;break;
  				    } 
  				      				    
  				    if (Seed.queue_atkp[cityID][k]["knightId"] !=0){
  				    	for (i in Seed.knights[cityID]) {
  				    			if (i == ("knt" + Seed.queue_atkp[cityID][k]["knightId"]) ) knight = Seed.knights[cityID][i]["combat"];
  				    	}
  				    } else knight = null;
  				    
  				    m += '<TR><TD>'+ number +'</td>';
  				   if (status=="Encamped" && !t.isMyself(Seed.queue_atkp[cityID][k].fromPlayerId))
						m += '<TD><A onclick="r8x6Home('+ marchID +')"><img src='+ icon +'></a></td>';
  				    else if(status=='Encamped' && t.isMyself(Seed.queue_atkp[cityID][k].fromPlayerId))
						m += '<TD><A onclick="pr56Recall('+ marchID +')"><img src='+ icon +'></a></td>';
					else if(status=='Returning' || status=="Stopped" || status=="Resting")
						m += '<TD><img src='+ icon +'></td>';
					else
						m += '<TD><A onclick="cancelMarch('+ marchID +')"><img src='+ icon +'></a></td>';
  				    m += '<TD width="40px">'+ status +'</td>';
  				    m += '<TD>'+ marchtime +'</td>';
  				    
  				    if (cityTo == null)
						m += '<TD style="padding-right:10px;">'+ coordLink(Seed.queue_atkp[cityID][k]["toXCoord"],Seed.queue_atkp[cityID][k]["toYCoord"]) + '</td>';
  				    else
						m += '<TD style="padding-right:10px;">'+ cityTo +'</td>';
  				    
  				    if (knight != null)  m += '<TD>'+uW.g_js_strings.commonstr.knight+': '+ knight +'</td>';
  				    
  				    if (Seed.queue_atkp[cityID][k]["toTileType"] == 11) m+='<TD>Lake Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 20) m+='<TD>Grassland Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 30) m+='<TD>Hills Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 40) m+='<TD>Mountain Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 50) m+='<TD>Plain Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  					else if (Seed.queue_atkp[cityID][k]["toCityId"] ==0) m +='<TD>'+uW.g_js_strings.commonstr.barbariancamp+' '+uW.g_js_strings.commonstr.lvl+': '+Seed.queue_atkp[cityID][k]["toTileLevel"]+'</td>';
  		
  				    if (Seed.queue_atkp[cityID][k]["gold"] > 0) m += '<TD>'+uW.resourceinfo.rec0 +': '+ Seed.queue_atkp[cityID][k]["gold"] +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource1"] > 0) m += '<TD>'+uW.resourceinfo.rec1 +': '+ addCommas(Seed.queue_atkp[cityID][k]["resource1"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource2"] > 0) m += '<TD>'+uW.resourceinfo.rec2 +': '+ addCommas(Seed.queue_atkp[cityID][k]["resource2"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource3"] > 0) m += '<TD>'+uW.resourceinfo.rec3 +': '+ addCommas(Seed.queue_atkp[cityID][k]["resource3"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource4"] > 0) m += '<TD>'+uW.resourceinfo.rec4 +': '+ addCommas(Seed.queue_atkp[cityID][k]["resource4"]) +'</td>';
  				    
  				    for(i=1; i<13; i++){
						if(Seed.queue_atkp[cityID][k]["unit"+i+"Count"] > 0 && type == "going") m += '<TD>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkp[cityID][k]["unit"+i+"Count"]) +'</td>';
						if(Seed.queue_atkp[cityID][k]["unit"+i+"Return"] > 0 && type == "returning") m += '<TD>'+ uW.unitcost['unt'+i][0] +': '+ addCommas(Seed.queue_atkp[cityID][k]["unit"+i+"Return"]) +'</td>';
					}
					m += '</tr>';
				}
  		    }
  	}
  	m += '</table>';
  	t.marchDiv.innerHTML = m;
  	
  	if (t.widescreen==false) document.getElementById('ptMarchOutput').style.maxWidth = '740px';
  	else document.getElementById('ptMarchOutput').style.maxWidth = '1100px';
  	
  	document.getElementById('Wide').addEventListener('click', function(){
  		t.widescreen=document.getElementById('Wide').checked;	
  	}, false);
  	
    t.displayTimer = setTimeout (t.showMarches, 500);  
    },
	
	isMyself: function(userID){
		if(!Seed.players["u"+userID])
			return false;
		if(Seed.players["u"+userID].n == Seed.player.name)
			return true;
		else
			return false;
		return false;
	},
    
    butcancelmarch: function(marchID){
    	 var t = Tabs.Marches;
    	 	 var params = uW.Object.clone(uW.g_ajaxparams);
    	 	 params.mid = marchID;
     	 	 for (var c=0; c<Cities.numCities; c++){
    	 	   var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
    	 	   if (matTypeof(que)=='array')
    	 	     continue;
    	 	   for (k in que){
    	 	     if (k == 'm'+marchID){
    	 	       params.cid = Cities.cities[c].id;
    	 	       break;
    	 	     }
    	 	   }    
    	 	 }    
    	 	 
    	 	 new AjaxRequest(uW.g_ajaxpath + "ajax/cancelMarch.php" + uW.g_ajaxsuffix, {
    	 	     method: "post",
    	 	     parameters: params,
    	 	     onSuccess: function (rslt) {
    	 	     var march = uW.seed.queue_atkp["city" + params.cid]["m" + params.mid];
    	 	     march.marchStatus = 8;
    	 	      var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
    	 	      var ut = unixTime();
    	 	      if (uW.seed.playerEffects.returnExpire > unixtime())
    	 	        marchtime *= 0.5
    	 	       march.returnUnixTime = ut + marchtime;
    	 	       march.destinationUnixTime = ut;
    	 	       march.marchUnixTime = ut - marchtime;
    	 	       if (notify != null)
    	 	         notify(rslt.errorMsg);
    	 	     },
    	 	     onFailure: function () {
    	 	       if (notify != null)
    	 	         notify(rslt.errorMsg);
    	 	     },
    	 	 });
    	 	 
    	 },    
    	 
    	     
      
  /***  REINFORCEMENTS SUBTAB  ***/
  showReinforcements : function (){
    var rownum = 0;
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
    
// TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)

/***    
var s = 'OUTGOING:<BR>'; 
for (var c=0; c<Cities.numCities; c++){
  var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
  if (matTypeof(que)=='array')
    continue;

s += 'City: '+  Cities.cities[c].name + ': <BR>'; 

  for (k in que){
    march = que[k];
    var mid = k.substr(1);
    s += mid +' DEST: '+ march.toXCoord +','+ march.toYCoord + '  <INPUT type=submit value="Recall" onclick="pr56Recall('+ mid +')"><BR>'
  }      
} 
t.cont.innerHTML = s;
t.displayTimer = setTimeout (t.show, 10000);
return;
***/
    
    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show ();
    }
        
    enc = {};
    numSlots = 0;
    
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (k in Seed.queue_atkinc){
        march = Seed.queue_atkinc[k];
        if (march.marchType == 2){
          ++numSlots;
          city = march.toCityId;
          from = march.fromPlayerId;
          if (!enc[city])
            enc[city] = {};
          if (!enc[city][from])
            enc[city][from] = [];
          s = {};
          s.knight = parseInt (march.knightCombat);
          s.marchId = k.substr(1);
          s.troops = [];
          for (i=1; i<13; i++){
            if (Options.encRemaining)
              s.troops[i] = parseInt (march['unit'+ i +'Return']);
            else
              s.troops[i] = parseInt (march['unit'+ i +'Count']);
          }
          enc[city][from].push (s);
        }
      }
    }
//logit ("enc: "+ inspect (enc, 6, 1));    
    s = '<div class=ptstat>Showing troops encamped at each of your embassies.</div><BR>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>No troops encamped.</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%><B>Player (knight)</b></td>';

      for (k=0; k<names.length; k++)
        s += '<TD width=7%><B>' + names[k] + '</b></td>';
      s += '</tr>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class=xtab><BR></td></tr>';
          s+= '<TR><TD class="city" colspan=13 align=center><B>'+ Cities.cities[c].name +'</b></td></tr>';
          for (p in enc[dest]){
            try {
              player = Seed.players['u'+p].n;
            } catch (err){
              player = '???';
            }
            for (m=0; m<enc[dest][p].length; m++){
              var march = enc[dest][p][m];
              knight = '';
              if (march.knight > 0)
                knight = ' ('+ march.knight +')';
// TODO: Only allow 'send home' if troops are here now  (marchStatus = ?)              
              s += '<TR align=right><TD align=left>'+ player + knight +' <A><SPAN onclick="r8x6Home('+ march.marchId +')">X</span></a></td>'
              for (i=1; i<13; i++){
                s += '<TD>'+ march.troops[i]  +'</td>';
                tot[i] += march.troops[i];
              }
              s += '</tr>';

            }
          }
        }
      }
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>TOTALS:</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE: You will need to refresh KofC to show new encampments or remaining troops after a battle.</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show, 10000);
  },

  
  butRecall : function (marchId){
    var t = Tabs.Marches;
    logit ("CANCELLING: "+ marchId); 
    t.ajaxRecall (marchId); 
  },

  butSendHome : function (marchId){
    var t = Tabs.Marches;
    //alert("Sent Home march#"+marchId);
    logit ("SEND HOME: "+ marchId); 
    t.ajaxSendHome (marchId, function(r){t.show(); logit("AJAX RESULT: "+ r)}); 
  },


  /***  
  // not working, returns 'invalid parameters' :(  
  ajaxCancelMarch : function (marchId, notify){
    var params = uW.Object.clone(uW.g_ajaxparams);
logit ('ajaxCancelMarch: '+ marchId);    
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          params.cityId = Cities.cities[c].id;
          break;
        }
      }    
    }    
    params.marchId = marchId;
    params.mid = 'm'+ marchId;
    params.requestType = "CANCEL_MARCH";
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/cancelMarch.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },
***/  
 




  ajaxSendHome : function (marchId, notify){
logit ('ajaxSendHome: '+ marchId);    
    var march = Seed.queue_atkinc['m'+ marchId];
    if (march == null){
      notify ('March not found!'); 
      return;
    }    
    var params = uW.Object.clone(uW.g_ajaxparams);
    params.mid = marchId;
    params.cid = march.toCityId;
    params.fromUid = march.fromPlayerId;
    params.fromCid = march.fromCityId;
   
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/kickoutReinforcements.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (rslt.ok){
            var upkeep = 0;
            for (var i=1; i<13; i++)
              upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(uW.unitupkeeps[i])
            uW.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;
            if (parseInt(march.fromPlayerId) == parseInt(uW.tvuid)) {
//logit ('FROM ME!'); 
              var mymarch = uW.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];
              var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
              mymarch.returnUnixTime = unixTime() + marchtime;
              mymarch.marchStatus = 8;
            }
            delete uW.seed.queue_atkinc["m" + marchId];
            if (notify != null)
              notify(null);
          } else {
            if (notify != null)
              notify(rslt.errorMsg);
          }
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },

/*****

      for (var b = 1; b < 13; b++) {
        g += parseInt(e["unit" + b + "Return"]) * parseInt(unitupkeeps[b])
      }

function kickout_allies(mid, cid, fromUid, fromCid, upkeep) {
  var params = Object.clone(g_ajaxparams);
  params.mid = mid;
  params.cid = cid;
  params.fromUid = fromUid;
  params.fromCid = fromCid;
  new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(transport) {
      var rslt = eval("(" + transport.responseText + ")");
      if (rslt.ok) {
        Modal.showAlert(g_js_strings.kickout_allies.troopshome);
        seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
        Modal.hideModalAll();
        if (parseInt(fromUid) == parseInt(tvuid)) {
          var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
          var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
          curmarch.returnUnixTime = unixtime() + marchtime;
          curmarch.marchStatus = 8
        }
        delete seed.queue_atkinc["m" + mid]
      } else {
        Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
      }
    },
    onFailure: function() {}
  })
};
***/




 
  ajaxRecall : function (marchId, notify){
    var params = uW.Object.clone(uW.g_ajaxparams);
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          break;
        }
      }    
    }    
    params.mid = marchId;
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/undefend.php" + uW.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          var march = uW.seed.queue_atkp["city" + params.cid]["m" + params.mid];
          march.marchStatus = 8;
          var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
          var ut = unixTime();
          if (uW.seed.playerEffects.returnExpire > unixTime())
            marchtime *= 0.5
          march.returnUnixTime = ut + marchtime;
          march.destinationUnixTime = ut;
          march.marchUnixTime = ut - marchtime;
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },
  
};


/*******************************************/

var PageNavigator = {
  modalMessagesFunc : null,
  ctrlPaginationOld : null,
  loadPage_paginationOld : null,
  cpPager : null,
  
  init : function (){
    var t = PageNavigator;
    t.modalMessagesFunc = new CalterUwFunc ('modal_messages', [
        [/pageNavigatorModel =.*$/im, 'var pager = new ptPagerHook(0,5); pageNavigatorModel=pager'],
        [/pageNavigatorView =.*$/im, 'pageNavigatorView=pager'],
        [/pageNavigatorController =.*$/im, 'pageNavigatorController=pager']
        ]);
    uW.ptPagerHook = t.Cpager;
    t.ctrlPaginationOld = uW.ctrlPagination;
    t.loadPage_paginationOld = uW.loadPage_pagination;
    t.cpPager = new t.Cpager (0,0);
    t.cpPager.oldStyle = true;
    t.enable(Options.fixPageNav);
  },

  // called on 'back' ...
  loadPage_pagination : function (divId, currentPage, callbackFunction, totalPages) {
    var t = PageNavigator;
    var curPage = parseInt(currentPage);
//logit ('loadPage_pagination: '+  divId +','+ t.cpPager.divId +','+ currentPage +','+ callbackFunction +','+ totalPages +','+ t.cpPager.getCurrentPage()); 
    if (divId == t.cpPager.divId) // if 'old' style ...  
      unsafeWindow[callbackFunction] (t.cpPager.getCurrentPage());
    else
      unsafeWindow[callbackFunction] (currentPage);
  },
    
  ctrlPagination : function (navDivId, numPages, notify, curPage){
    var t = PageNavigator;
//logit ('ctrlPagination (divid:'+ navDivId +')');    
    if (document.getElementById(navDivId).firstChild == null)
      document.getElementById(navDivId).appendChild (t.cpPager.getHtmlElement());   
    t.cpPager.setPageCount(numPages);
    t.cpPager.divId = navDivId;
    if (!curPage)
      curPage = 1;
    t.cpPager.gotoPage(curPage);
    t.cpPager.onClick = unsafeWindow[notify];
    uW.pageNavigatorView = t.cpPager;
  },  
  
  enable : function (tf){
    var t = PageNavigator;
    t.modalMessagesFunc.setEnable(tf);
    if (tf){
      uW.ctrlPagination = t.ctrlPagination;
      uW.loadPage_pagination = t.loadPage_pagination;
    } else {
      uW.ctrlPagination = t.ctrlPaginationOld;
      uW.loadPage_pagination = t.loadPage_paginationOld;
    }
  },
  
  isAvailable : function (){
    var t = PageNavigator;
    return t.modalMessagesFunc.isAvailable();
  },
  
  Cpager : function (a, b){
    // public function protos ...
    this.getHtmlElement = getHtmlElement;    
    this.setPageCount = setPageCount;    
    this.getPageCount = getPageCount;    
    this.getCurrentPage = getCurrentPage;    
    this.gotoPage = gotoPage;    
    this.e_but = e_but;    
    this.e_inp = e_inp; 
    //    
    var t = this;
    this.onClick = null;
    this.numPages = b;
    this.curPage = a;
    this.oldStyle = false;
    
    function getHtmlElement (){
      function aButton (msg, evtPage){
        return '<A class=ptPageNav onclick="pageNavigatorView.e_but(\''+ evtPage +'\')"><SPAN class=ptPageNav>'+ msg +'</span></a>';
      }
      var div = document.createElement ('div');
      div.id = 'ptPageNavBar';
      div.innerHTML = '<STYLE>table.ptPageNav tr td  {border:none; text-align:center; padding:0px 1px;}\
        span.ptPageNav {font-size:12px; background:inherit; line-height:135%}\
        A.ptPageNav {background-color:#44e; color:#ff4; display:block; border:1px solid #666666; height:18px; width:18px;}\
        A.ptPageNav:hover {background-color:#66f;}\
        A.ptPageNav:active {background-color:#186}\
        </style>\
        <TABLE class=ptPageNav><TR valign=middle>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:0.8em; letter-spacing:-0.99em;">&#x258f;&#x258f;&#x25c4;</span>', 'F') +'</td>\
        <TD>'+ aButton('&#x25c4', '-') +'</td>\
        <TD>'+ aButton('&#x25ba', '+') +'</td>\
        <TD style="margin-right:15px">'+ aButton('<SPAN style="padding-right:1.05em; letter-spacing:-0.99em;">&#x25ba;&#x2595;&#x2595;</span>', 'L') +'</td>\
        <TD width=20></td><TD>Page <INPUT id=ptPagerPageNum onChange="pageNavigatorView.e_inp()" type=text size=1> OF <span id=ptPagerNumPages>?</span></td>\
        </tr></table>';
      var mml = document.getElementById('modal_msg_list');
      if (mml != null)
        mml.style.minHeight = '320px';
      return div;
    }

    function getPageCount(){    // koc needs for 'back'
      return t.numPages;
    }    
    function getCurrentPage(){    // koc needs for 'back'
      return t.curPage;
    }    
    function setPageCount(c){
      t.numPages = c;
      document.getElementById('ptPagerNumPages').innerHTML = c;
      var mml = document.getElementById('modal_msg_list');
      if (mml != null){
        if (document.getElementById('modal_msg_tabs_report').className.indexOf('selected') >= 0)
          mml.style.minHeight = '460px';
        else
          mml.style.minHeight = '320px';
      }
    }
    function gotoPage(p){
      t.curPage = parseIntZero(p);
      document.getElementById('ptPagerPageNum').value = t.curPage;
    }
    function e_but (p){
      if (p=='F' && t.curPage!=1)
        loadPage(1);
      else if (p=='-' && t.curPage>1)
        loadPage(t.curPage-1);
      else if (p=='+' && t.curPage<t.numPages)
        loadPage(t.curPage+1);
      else if (p=='L' && t.curPage!=t.numPages)
        loadPage(t.numPages);
      function loadPage (p){
        if (t.oldStyle)
      t.gotoPage(p);
        t.onClick (p);
      }
    }
    function e_inp (p){
      var pageNum = parseIntZero(document.getElementById('ptPagerPageNum').value);
      t.onClick(pageNum);
    }
  },
}


function addScript (scriptText){
	var scr = document.createElement('script');   
	scr.innerHTML = scriptText;
	document.body.appendChild(scr);
//    setTimeout ( function (){document.body.removeChild(scr);}, 500);
}
addScript ('uwuwuwFunc = function (text){ eval (text);  }');  



// TODO: Handle multiple instances altering same function!!   ****************************
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcOld = null;  
  this.funcNew = null;
  try {
    var x = funcName.split('.');
    var f = unsafeWindow;
    for (var i=0; i<x.length; i++)
      f = f[x[i]];
    ft = f.toString();
    this.funcOld = f;
    var rt = ft.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)  // if not found
        return;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
//      	var scr = document.createElement('script');   
//      	scr.innerHTML = funcName +' = '+ t.funcNew;
//      	document.body.appendChild(scr);
//        setTimeout ( function (){document.body.removeChild(scr);}, 500);
uW.uwuwuwFunc(funcName +' = '+ t.funcNew);
      	t.isEnabled = true;
      } else {
      var x = funcName.split('.');
      var f = unsafeWindow;
      for (var i=0; i<x.length-1; i++)
        f = f[x[i]];
      f[x[x.length-1]] = this.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};


var MessageCounts = {
  messagesNotifyFunc : null,
  
  init : function (){ 
	var t = MessageCounts; 
	if (Options.fixMsgCount){ 
		document.getElementById('chrome_messages_report').style.margin = '10px 0 0 65px'; 
		document.getElementById('chrome_messages_notify').style.margin = '10px 0 0 10px'; 		
	}
  },
}

function ShowExtraInfo(){
  alert('ineter');
  content = document.getElementById('mod_citylist').innerHTML
  content += "O";
	document.getElementById('mod_citylist').innerHTML = content; 
}

var WarnZeroAttack = {
  modalAttackFunc : null,  
  
  init : function (){
    var t = WarnZeroAttack;
    t.modalAttackFunc = new CalterUwFunc ('modal_attack', [['modal_attack_check()', 'modalAttack_hook()']]);
    uW.modalAttack_hook = t.hook;
    t.modalAttackFunc.setEnable(Options.fixWarnZero);
  },
   
  setEnable : function (tf){
    var t = WarnZeroAttack;
    t.modalAttackFunc.setEnable (tf);
  },
  
  isAvailable : function (){
    var t = WarnZeroAttack;
    return t.modalAttackFunc.isAvailable();
  },
    
  hook : function (){
    var t = WarnZeroAttack;
    if (parseIntZero(document.getElementById('modal_attack_target_coords_x').value) == 0
    && parseIntZero(document.getElementById('modal_attack_target_coords_y').value) == 0){
      new CdialogCancelContinue ('<SPAN class=boldRed>You are about to march to location 0,0!</span>', null, uW.modal_attack_check, document.getElementById('modalInner1'));      
    } else {
      uW.modal_attack_check();
    }
  },
  
}

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

var MapDistanceFix = {
  popSlotsFunc : null,
  init : function (){
    var t = MapDistanceFix;
    t.popSlotsFunc = new CalterUwFunc ('MapObject.prototype.populateSlots', [['this.distance', 'fixMapDistance_hook']]);
    if (t.popSlotsFunc.isAvailable()){
      uW.fixMapDistance_hook = t.fixMapDistance_hook;
      if (Options.fixMapDistance)
        t.enable (true);

    }
  },
  fixMapDistance_hook : function (cityX, cityY, tileX, tileY){
    var city = Cities.byID[uW.currentcityid];
    return distance (city.x, city.y, tileX, tileY);
  },
  enable : function (tf){
    var t = MapDistanceFix;
    t.popSlotsFunc.setEnable (tf);
  },
  isAvailable : function (){
    var t = MapDistanceFix;
    return t.popSlotsFunc.isAvailable();
  },
}


var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=0 class=ptMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pttc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;
    
    t.currentTab = null;
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div; 
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = '1200px';
      div.style.overflowX = 'auto';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}


function setTabStyle (e, selected){
  if (selected){
    e.className = 'matTabSel';
  } else {
    e.className = 'matTabNotSel';
  }
}

function clickedTab (e){
  who = e.target.id.substring(2);
  newObj = my[who];
  currentObj = my[currentName];
  if (currentName != who){
    setTabStyle (document.getElementById ('aa'+currentName), false);
    setTabStyle (document.getElementById ('aa'+who), true);
    if (currentObj){
      currentObj.hide ();
      currentObj.getContent().style.display = 'none';
    }
    currentName = who;
    cont = newObj.getContent();
    newObj.getContent().style.display = 'block';
  }
  newObj.show();
}

function mouseMainTab (me){
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.ptWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  if (!Options.ptWinIsOpen)
    return;
  mainPop.show (false);
  tabManager.showTab();
  Options.ptWinIsOpen = false;
  saveOptions();
}
function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.ptWinIsOpen = true;
  saveOptions();
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

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3) 	
    return uW.allianceOfficerTypeMapping[3];
  else if (oid==2)
    return uW.allianceOfficerTypeMapping[2];
  else if (oid==1)
    return uW.allianceOfficerTypeMapping[1];
  else if (oid==4)
      return uW.allianceOfficerTypeMapping[4];
  return '';
}


// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "ptcastleBut ptcastleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "ptcastleBut ptcastleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
			var xValue=that.coordBoxX.value.trim();
			var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue); 		
			if(xI) {
				that.coordBoxX.value=xI[1]
				that.coordBoxY.value=xI[2]
			}
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="ptcastleBut ptcastleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};


function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Tools</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="CANCEL" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUE" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}


// TODO: make class (multiple instances needed)
function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('ptretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Tools</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}



function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));  
    
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }  
    
  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   



function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = uW.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        uW.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = uW.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    /*if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);*/
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}





// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return uW.g_js_strings.commonstr.neutral;
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return uW.g_js_strings.commonstr.friendly;
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return uW.g_js_strings.commonstr.hostile;
  if (aid == Seed.allianceDiplomacies.allianceId)
    return uW.g_js_strings.modaltitles.alliance;
  return uW.g_js_strings.commonstr.neutral;
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}



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
        for (ii=0; ii<13; ii++){
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

function getTrainInfo (){
  var ret = {};

  ret.trainUnts = [];
  for (i=0; i<13; i++){
    ret.trainUnts[i] = 0;
  }
  
  var q = Seed.queue_unt;
  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'city'+ Cities.cities[i].id;
	q = Seed.queue_unt[cityID];
	if (q && q.length>0){
	  for (qi=0; qi<q.length; qi++)
          ret.trainUnts[q[qi][0]] += parseInt(q[qi][1]);
	  }
    }
  return ret;
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
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



/************ DEBUG WIN *************/
var debugWin = {
	popDebug:			null,
	dbDefaultNot:	'tech,tutorial,items,quests,wilderness,wildDef,buildings,knights,allianceDiplomacies,appFriends,players',
	dbSelect:			{},
	sortSeed:			[],
	sortNonSeed:	[],

	doit: function (){
		var t = debugWin;

		function syncBoxes (){
			for (var i=0; i<t.sortSeed.length; i++){
				var name = t.sortSeed[i];
				var box = document.getElementById('dbpop_'+name);
				box.checked = t.dbSelect[name];
			}
		}
		function clickedAll (){
			for (var k in t.dbSelect)
				t.dbSelect[k] = true;
			syncBoxes();
		}
		function clickedNone (){
			for (var k in t.dbSelect)
				t.dbSelect[k] = false;
			syncBoxes();
		}
		function clickedDefaults (){
			for (k in t.dbSelect)
				t.dbSelect[k] = true;
			var not = t.dbDefaultNot.split(',');
			for (var i=0; i<not.length; i++)
				t.dbSelect[not[i]] = false;
			syncBoxes();
		}
		function clickedShow (){
			var resultsDiv = document.getElementById('idDebugResultsDiv')
			var s = '<PRE>';
			for (var i=0; i<t.sortSeed.length; i++){
				var name = t.sortSeed[i];
				var box = document.getElementById('dbpop_'+name);
				if (box.checked)
					s += name + " =\n" + inspect (Seed[name], 10, 1);
			}
			resultsDiv.innerHTML = s + '</PRE>';
		}

		function clickedShowNonSeed (){
			var resultsDiv = document.getElementById('idDebugResultsDiv');
			nsvalue = document.getElementById('dbnonseed').value;
			if (nsvalue != '') {
				val = unsafeWindow[nsvalue];
				valtype = typeof(val);
				resultsDiv.innerHTML = '<PRE>(' + valtype + ') ' + nsvalue + ((valtype == 'string')?(" = " + val):(" =\n" + inspect (val, 10, 1))) + '</PRE>';
			}
		}

		function clickedShowScripts (){
			var resultsDiv = document.getElementById('idDebugResultsDiv')
			var scripts = document.getElementsByTagName('script');
			var s = '';
			for (var i=0; i<scripts.length; i++)
				if (scripts[i].src!=null && scripts[i].src!='')
					s+='<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</A><BR />';
			resultsDiv.innerHTML = s;
		}

		if (t.popDebug == null){
			t.popDebug = new CPopup ('db', 0, 45, 749, 900, true);
			t.popDebug.getTopDiv().innerHTML = '<DIV align=center><B>DEBUG</B></DIV>';
			var sl = 0;
			for (var k in Seed) {
				t.dbSelect[k] = true;
				t.sortSeed[sl] = k;
				sl++;
			}
			t.sortSeed.sort();
			sl = 0;
			for (var k in unsafeWindow) {
				kType = typeof(unsafeWindow[k]);
				if ((k.indexOf('actionlink_data') != 0) && (k != 'content') && (k != 'document') && (k.indexOf('feed') != 0) && (k.indexOf('frame') != 0) && (k != 'globalStorage') &&
					(k != 'g_mapObject') && (k != 'history') && (k != 'Modal') && (k != 'navigator') && (k != 'parent') && (k.indexOf('pb') != 0) && (k.indexOf('pt') != 0) && (k != 'seed') &&
					(k != 'self') && (k.indexOf('template_data') != 0) && (k != 'that') && (k != 'window') && (k != '_htmlElement') && (kType != 'function') && (kType != 'undefined')) {
					t.sortNonSeed[sl] = k;
					sl++;
				}
			}
			t.sortNonSeed.sort(function(x,y) {var a = String(x).toUpperCase(); var b = String(y).toUpperCase(); if (a > b) return 1; else if (a < b) return -1; else return 0;});
			var nsSelect = '<SELECT id="dbnonseed"><OPTION value="" ></option>';
			for (var i=0; i<t.sortNonSeed.length; i++)
				nsSelect += '<OPTION value="' + t.sortNonSeed[i] + '" >' + t.sortNonSeed[i] + '</option>';
			nsSelect += '</SELECT>';
			var not = t.dbDefaultNot.split(',');
			for (var i=0; i<not.length; i++)
				t.dbSelect[not[i]] = false;
			var m = '<DIV class=ptentry><B>Seed: </B><INPUT type=submit id=dbsuball value=ALL>&nbsp;<INPUT type=submit id=dbsubnone value=NONE>&nbsp;' +
				'<INPUT type=submit id=dbdefaults value=DEFAULTS>&nbsp;<INPUT type=submit id=dbsubdo value=SHOW>&nbsp;<INPUT type=submit id=dbsubscripts value=SCRIPTS><BR /><TABLE width=100%>';
			var cols = 5;
			var entries = t.sortSeed.length;
			var rows = parseInt (0.99 + entries / cols);
			for (var rowno=1; rowno<=rows; rowno++) {
				m += '<TR>';
				for (colno=1; colno<=cols; colno++) {
					var slvalue = rows*(colno-1)+rowno-1;
					m += ((slvalue < entries)?('<TD class=xtab><INPUT type=checkbox id="dbpop_'+t.sortSeed[slvalue]+'">&nbsp;'+t.sortSeed[slvalue]+'</TD>'):'<TD class=xtab></TD>');
				}
				m += '</TR>';
			}
			m += '</TABLE><B>Non-Seed: </B>' + nsSelect + '</DIV><DIV id="idDebugResultsDiv" style="width:738px; height:600px; max-height:600px; overflow-y:auto; white-space:pre-wrap;"></DIV>';
			t.popDebug.getMainDiv().innerHTML = m;
			document.getElementById('dbsuball').addEventListener('click', clickedAll, false);
			document.getElementById('dbsubnone').addEventListener('click', clickedNone, false);
			document.getElementById('dbdefaults').addEventListener('click', clickedDefaults, false);
			document.getElementById('dbsubdo').addEventListener('click', clickedShow, false);
			document.getElementById('dbsubscripts').addEventListener('click', clickedShowScripts, false);
			document.getElementById('dbnonseed').addEventListener('change', clickedShowNonSeed, false);
			syncBoxes();
		}
		t.popDebug.show (true);
	},
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

function saveColors (){
  var serverID = GetServerId();
  GM_setValue ('Colors', JSON2.stringify(Colors));
}

function readColors (){
  var serverID = GetServerId();
  s = GM_getValue ('Colors');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts)
      Colors[k] = opts[k];
  }
}


/***
***/
var myServers = {   // incomplete, untested
  serverlist : null,
  
  get : function (notify){
    if (myServers.serverlist){
      notify (myServers.serverlist);
      return;
    }
    var params = uW.Object.clone(uW.g_ajaxparams);
    
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/myServers.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function(rslt) {
logit (inspect (rslt, 3, 1));  
        if (notify)      
          notify (myServers.serverlist);
      },
      onFailure: function(rslt) {
      }
    });
  },
};


function createButton (label){
  var a=document.createElement('a');
  a.className='button20';
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text);
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
//if (ee.tagName=='DIV') logit ("CHILD: "+  ee.tagName +' : '+ ee.className+' : '+ ee.id);      
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' &&  ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PT';
    }
    if (gmTabs.firstChild)
      gmTabs.insertBefore (a, gmTabs.firstChild);
    else
      gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}

function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="ptGotoMapHide (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}


uW.ptGotoMapHide = function (x, y){
  try {
    uW.Modal.hideModal();
  } catch (e){ }
  try {
    Modal.hideModal();
  } catch (e){ }
  uW.ptGotoMap (x, y);  
}



uW.ptGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
  setTimeout (function (){ 
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    uW.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    uW.tutorialClear()
  }, 0);
};


/**********************************************************************************/

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function strButton14 (label, tags){
  if (tags == null)
    tags = '';
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
}

function cityStatusString (cs){
  if (cs==4)
    return 'V';
  if (cs==3)
    return 'T';
  if (cs==2)
    return 'BP';
  return 'N';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  uW.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = uW.Object.clone(uW.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = uW.Object.clone(uW.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = uW.Object.clone(uW.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(uW.g_ajaxpath + "ajax/sendChat.php" + uW.g_ajaxsuffix, {
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

function doDefTrain (cityId, siege, unitId, num, notify){
  var time = uW.modal_walls_traintime(unitId, num);
  var params = uW.Object.clone(uW.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = siege;
  new MyAjaxRequest(uW.g_ajaxpath + "ajax/fortify.php" + uW.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          uW.seed.queue_fort["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, rslt.fortifyId]);
          if (notify != null)
            setTimeout (function (){notify(null);}, 500);
        } else {
          if (notify != null)
            setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      },
      onFailure: function () {
        if (notify != null)
          notify(rslt.errorMsg);
      },
  });
}


function doTrain (cityId, tut, unitId, num, notify){
  var time = uW.modal_barracks_traintime(unitId, num);
  var params = uW.Object.clone(uW.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = tut;

  new MyAjaxRequest(uW.g_ajaxpath + "ajax/train.php" + uW.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(rslt) {
      if (rslt.ok) {
        for (var i = 1; i < 5; i++) {
          uW.seed.resources["city" + cityId]["rec" + i][0] = parseInt(uW.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(uW.unitcost["unt" + unitId][i]) * 3600 * parseInt(num)
        }
        uW.seed.citystats["city" + cityId].gold[0] = parseInt(uW.seed.citystats["city" + cityId].gold[0]) - parseInt(uW.unitcost["unt" + unitId][5]) * parseInt(num);
        uW.seed.citystats["city" + cityId].pop[0] = parseInt(uW.seed.citystats["city" + cityId].pop[0]) - parseInt(uW.unitcost["unt" + unitId][6]) * parseInt(num);
        uW.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
        if (notify != null)
          setTimeout (function (){notify(null);}, 500);
      } else {
        if (notify != null){
          setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      }
    },
    onFailure: function(o) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  });
}



/************  LIB classes/functions .... **************/
function getAbsoluteOffsets (e){
  ret = {left:0, top:0};
  while (e.offsetParent){
    if (e.style.position == 'absolute')
      break;
    ret.left += e.offsetLeft;
    ret.top += e.offsetTop;
    e = e.offsetParent;
  }      
  return ret;  
}

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return 'client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function debugElement  (e){
  var x = uW.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}     

function searchDOM (node, condition, maxLevel, doMult){
  var found = [];
  eval ('var compFunc = function (node) { return ('+ condition +') }');
  doOne(node, 1);
  if(!doMult){
    if (found.length==0)
      return null;
    return found[0];
  }
  return found;
  function doOne (node, curLevel){
    try {
      if (compFunc(node))
        found.push(node);
    } catch (e){
    }      
    if (!doMult && found.length>0)
      return; 
    if (++curLevel<maxLevel && node.childNodes!=undefined)
      for (var c=0; c<node.childNodes.length; c++)
        doOne (node.childNodes[c], curLevel);
  }
}

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}


function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';  
}


var WinManager = {
  wins : {},    // prefix : CPopup obj

  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (uW.cpopupWins == null)
      uW.cpopupWins = {};
    uW.cpopupWins[prefix] = pop;
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete uW.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;
    
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }

  function focusMe (){
    t.setLayer(5);
    for (k in uW.cpopupWins){
      if (k != t.prefix)
        uW.cpopupWins[k].unfocusMe(); 
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventDOWN', me);
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
if (DEBUG_TRACE_DRAG) logit ('Clickable rect: '+ inspect (t.clickableRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Body rect: '+ inspect (t.bodyRect, 3, 1));
if (DEBUG_TRACE_DRAG) logit ('Bound rect: '+ inspect (t.boundRect, 3, 1));
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
if (DEBUG_TRACE_DRAG) logit ("BOUNDS: "+ inspect (t.bounds, 8, 10));
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
if (DEBUG_TRACE_DRAG) t.dispEvent ('eventUP', me);
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
if (DEBUG_TRACE_DRAG) logit ('doneMoving');
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
//t.dispEvent ('eventOUT', me);
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
//t.dispEvent ('eventMOVE', me);
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;' };
String.prototype.htmlEntities = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.stripTags = function(){ 
  return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

String.prototype.capitalize = function(){ 
  return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
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


function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}


function htmlSelector (valNameObj, curVal, tags){
  m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');

}


function unixTime (){
  return parseInt (new Date().getTime() / 1000) + uW.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}


/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24)); 
    m.push ('d ');
    m.push (parseInt(time%24)); 
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400)); 
    m.push ('d ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600)); 
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60)); 
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

/************  LIB singletons .... **************/
// TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    
    if (!t.win || t.win.closed){
t.isOpening = true;  
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window
      //t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
	  t.win = new CPopup('ptwinlog', 0, 0, 500, 800, true, function(){t.win.destroy(); t.win=null; t.win.closed=true;});
	  t.win.show(true);
t.isOpening = false; 
t.state = null; 
    }
    
    if (t.state == null){
      t.win.getMainDiv().innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; overflow-x:auto; height:750px; max-height:800px; width:600px"></div></body>';
      document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    WinLog.write (msg.htmlEntities()); 
  },
  
  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');

    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },
};

function reloadKOC (){
  var serverId = GetServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
function formatUnixTime (unixTimeString,format){
	var rtn = unsafeWindow.formatDateByUnixTime (unixTimeString);
/*if (format=='24hour') {
		if (rtn.substr(14,2)=='AM')
			rtn = rtn.substr(0,13);
		else
			rtn = rtn.substr(8,2)+' '+rtn.substr(0,8)+(parseInt(rtn.substr(8,2))+12)+rtn.substr(10,3);
	} */
	return rtn;
}

function getAllianceLeaders (){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetLeaders.php" + unsafeWindow.g_ajaxsuffix, {
		 method: "post",
		 parameters: params,
		 loading: true,
		 onSuccess: function (rslt) {
		 rslt = eval("(" + rslt.responseText + ")");
		 if (rslt.officers) {
			 Options.AllianceLeaders = [];
      		 for (add in rslt.officers) Options.AllianceLeaders.push(rslt.officers[add]['userId']);
       
     } 
     else {
			  setTimeout(function(){getAllianceLeaders;}, 1500);
		  }
		},
		onFailure: function () {}
  		});
};


ptStartup ();