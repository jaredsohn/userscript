// ==UserScript==
// @name           Seldar Ikariam General Alerter
// @version        0.0.1
// @namespace      seldar_ikariam
// @description    Seldar Ikariam General Alerter, based on Ikariam General Helper from krwq

// @include        http://s*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include        http://s*.ikariam.*/?view=embassyGeneralAttacksToAlly*
// @include        http://s*.*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly*
// @include        http://s*.*.ikariam.*/?view=embassyGeneralAttacksToAlly*

// @history        0.0.1 Starting from Ikariam General Helper 0.40.6 from krwq
// @history	   	   0.0.1 Adding Growl Feature, By PhasmaExMachina



// @require        http://userscripts.org/scripts/source/57756.user.js
// @require 	   http://userscripts.org/scripts/source/58203.user.js

// ==/UserScript==


Growler.addNoticeType("general_alert", "Atac Alianta");
Growler.register("Seldar Ikariam General Alerter", "http://i907.photobucket.com/albums/ac280/seldar/ik/Earth-Alert-icon.png");


GM_registerMenuCommand('IGH::Delete settings',menu_delete_settings);

// zwiekszane przy kazdej zmianie wymagajacej resetowania ustawien
const currversion = 1;

// rzeczywista wersja gry
ScriptUpdater.check(80403, '0.0.1');
//ScriptUpdater.forceCheck(80403, '0.0.0');

/*
  thank to guy who wrote this :)
  http://joanpiedra.com/jquery/greasemonkey/
  I've changed function name a bit
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Wait until jQuery is loaded
GM_JQWait(onJQLoaded);

/*************************************************************************************************/
/******************************************* LANGUAGES *******************************************/
/*************************************************************************************************/

const LANGS =
{
  "org": // krwq
   {
    /* Options */
    options:               "Options",
    lastrefresh1:          "Last refresh",
    lastrefresh2:          "seconds ago",
    alarminlastingbattles: "Notify lasting battles",
    alarmonendofbattle:    "Notify end of battle",
    alarmonabort:          "Notify aborted attack",
    optionpos:             "Options position",
    refreshinterval:       "Refresh interval (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Tested alarm type (1-5)",
    sound:                 "Sound",
    on:                    "on",
    off:                   "off",
    top:                   "top",
    bottom:                "bottom",
    change:                "change",
    enterinterval:         "Enter refresh interval time (in seconds)",
    enteralarmtype:        "Enter type of attack (1-5)",
    badvalue1:             "Bad value!",
    badvalue2:             "Bad value (1-5)!",

    /* Attacks messages - errors in translating allowed */
    title:        "General! Open the tab!",
    nochanges:    "Site did not change.",
    warning:      "WARNING!",
    newattack:    "NEW ATTACK!",
    changes1:     "ATTACK CHANGED!",
    changes2:     "Attack changed!",
    abortattack:  "Attack aborted!",
    endofbattle:  "End of battle!",

    /* Report - errors in translating allowed */
    report:            "Report",
    sumofenemiesunits: "Sum of enemies' units",
    nomembersattacked: "No members of your alliance are being attacked at the moment.",

    /* ACTIONS - WARNING! ERRORS NOT ALLOWED! IT MUST BE TRANSLATED EXACTLY AS IT IS IN THIS LANGUAGE. CASE SENSITIVE */
    /* BAD TRANSLATION OF THIS CAUSE SCRIPT DOES NOT WORK */
    occupytown:    "Occupy town!",
    pillage:       "Pillage",
    ontheway:      "underway",
    blockharbour:  "Block port!"
   },
 "ro": // Seldar
   {
    /* Options */
    options:               "Optiuni",
    lastrefresh1:          "Ultimul refresh",
    lastrefresh2:          "secunde in urma",
    alarminlastingbattles: "Arata durata luptei",
    alarmonendofbattle:    "Arata sfarsitul luptei",
    alarmonabort:          "Arata atacuri abandonate",
    optionpos:             "IGH pozitie",
    refreshinterval:       "Interval de refresh (0 - off)",
    testmode:              "Test mode",
    testedalarmtype:       "Tipul alarmei (1-5)",
    sound:                 "sunet",
    growl:		   "Growl",
    on:                    "on",
    off:                   "off",
    top:                   "sus",
    bottom:                "jos",
    change:                "schimba",
    enterinterval:         "Introdu intervalul de refresh (in secunde)",
    enteralarmtype:        "Introdu tipul de atac (1-5)",
    badvalue1:             "Valoare necorespunzatoare !",
    badvalue2:             "Valoare necorespunzatoare (1-5)!",

    /* Attacks messages */
    title:        "General! Prima pagina!",
    nochanges:    "Nu s-a schimbat nimic.",
    warning:      "ATENTIE!",
    newattack:    "ATAC NOU!",
    changes1:     "ATAC SCHIMBAT!",
    changes2:     "ATAC SCHIMBAT!",
    abortattack:  "ATAC ANULAT!",
    endofbattle:  "Sfarsitul luptei!",

    /* Report */
    report:            "Raportare",
    sumofenemiesunits: "Suma dusmanilor' unitati",
    nomembersattacked: "Nici un membru al aliantei tale nu este atacat momentan.",

    /* Actions */
    occupytown:    "Ocupa orasul!",
    pillage:       "Jefuire",
    ontheway:      "pe drum",
    blockharbour:  "Blocheaza portul!"
   }
};
// aliasy
LANGS["com"] = LANGS["org"];
LANGS["us"]  = LANGS["org"];
LANGS["en"]  = LANGS["org"];
LANGS["ro"]  = LANGS["ro"];

  LANG = LANGS["ro"];
const LANGNOTSUPPORTED =  (typeof LANG)=='undefined';

/*************************************************************************************************/

const igh_plus  = "http://img715.imageshack.us/img715/5381/plus.gif";
const igh_minus = "http://img64.imageshack.us/img64/1738/minusq.gif";
const flashurl  = "http://img534.imageshack.us/img534/6408/alarm.swf";

const IMG_BLOCKADE = '<img src="/skin/interface/mission_blockade.gif">';
const IMG_PLUNDER  = '<img src="/skin/interface/mission_plunder.gif">';
const IMG_OCCUPY   = '<img src="/skin/interface/mission_occupy.jpg">';
const IMG_TIME     = '<img src="/skin/resources/icon_time.gif">';
const IMG_ATTACK   = '<img src="/skin/unitdesc/unit_attack.gif">';

const LINK_CITY    = "/index.php?view=island&cityId=";

const IGH_ALARM_TITLE = LANG.title;

const HTML_FLASH =
'<br>\
<input type="button" id="igh_embassy_button" value="'+LANG.lastrefresh1+' 0 '+LANG.lastrefresh2+'" onclick="location.href= document.URL" width="200">\n<br>\
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="50" height="50" id="alarm" align="middle">\n\
  <param name="allowScriptAccess" value="sameDomain" />\n\
  <param name="movie" value="'+flashurl+'" />\n\
  <param name="quality" value="high" />\n\
  <param name="bgcolor" value="#f6ebba" />\n\
  <embed src="'+flashurl+'" quality="high" bgcolor="#f6ebba" width="50" height="50" name="alarm" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />\n\
</object>';

const HTML_ADDCONTENT_1 =
'\n<div id="igh_embassy" style="display: none">\n\
<table style="table-layout: fixed" cellpadding="0" cellspacing="0" class="table01">\n\
  <thead>\n\
    <tr>\n\
      <th colspan="2">Ikariam General Helper <i>by krwq</i> Updated By Seldar to have growl feature</th>\n\
    </tr>\n\
  </thead>\n\
  <tbody>\
  <tr>\n\
    <td colspan="2">';

const HTML_ADDCONTENT_2 =
'  </td>\n\
  </tr>\n\
  </tbody>\
  <tbody>\
  <tr>\n\
    <th colspan="2"><img id="igh_report_img" style="cursor: pointer"/> '+ LANG.report +'</th>\n\
  </tr>\n\
  </tbody>\n\
  <tbody id="igh_embassy_report_content">\
  <tr class="igh_embassy_report">\
    <td colspan="2">\
    <input id="igh_embassy_report_content_type" type="button" value="Text only">\
    <textarea style="overflow: scroll;" rows="3" cols="80" readonly="true" id="igh_report_textarea" onClick="this.focus(); this.select();"></textarea></td>\
  </tr>\n\
  </tbody>\
  <tbody>\
  <tr>\n\
    <th colspan="2"><img id="igh_option_img" style="cursor: pointer"/> '+ LANG.options +'</th>\n\
  </tr>\n\
  </tbody>\n\
  <tbody id="igh_embassy_options_content">';

const HTML_ADDCONTENT_3 =
'  <tr>\n\
    <td align="right"><b>';

const HTML_ADDCONTENT_4 =
'</b></td>\n\
    <td align="left"><text style="cursor: pointer" id="igh_option_';

const HTML_ADDCONTENT_5 =
'">';

const HTML_ADDCONTENT_6 =
'</text></td>\
  </tr>\n';

const HTML_LANGNOTSUPP =
'Language not supported! Unfortunately, script cannot work without it!<br>\
If you want to help with translation, please write a topic <a href="http://userscripts.org/topics/80403">here</a>.<br>\
You can only test it.<br><hr></td></tr>\n\
  <tr>\n\
    <td colspan="2">';


/*************************************************************************************************/
 
const settings_prefix = "IGH::" + location.hostname + "::";

/*************************************************************************************************/
/* Czyszczenie zmian po starej wersji */

var version = IGH_getValue("version", 0);
if (version!=currversion)
  delete_settings();
IGH_setValue("version", currversion);

/*************************************************************************************************/
/* stale odpowiedzialne za opcje */

const opt_switch    = 1;
const opt_intval    = 2;
const opt_alarmtype = 3;

const op_name    = 0;
const op_type    = 1;
const op_value   = 2;
const op_label   = 3;
const op_text1   = 4;
const op_text2   = 5;

// pozycja danej opcji na liscie opcji (igh_options)
const o_sound            = 0;
const o_onactbttlalarm   = 1;
const o_endbattlealarm   = 2;
const o_abortattackalarm = 3;
const o_positiontop      = 4;
const o_refreshtime      = 5;
const o_alarmtest        = 6;
const o_alarmtesttyp     = 7;
const o_growl			 = 8;

/*************************************************************************************************/

// stale
const at_noattack    = 0;
const at_newattack   = 1;
const at_changes     = 2; // zmiany z dodatkowym atakiem
const at_battleend   = 3;
const at_abortattack = 4;
const at_changesnd   = 5; // zmiany: koniec bitwy i anulowany atak

/*************************************************************************************************/

// czy opcje sa rozwiniete
var expanded_options = IGH_getValue('expanded_options', true);
var expanded_report  = IGH_getValue('expanded_report', true);

var igh_options =
  //nazwa               typ             value             label                       text1        text2
  [
   ["sound",            opt_switch,     true,             LANG.sound,                 LANG.on,     LANG.off],
   ["onactbttlalarm",   opt_switch,     false,            LANG.alarminlastingbattles, LANG.on,     LANG.off],
   ["endbattlealarm",   opt_switch,     false,            LANG.alarmonendofbattle,    LANG.on,     LANG.off],
   ["abortattackalarm", opt_switch,     false,            LANG.alarmonabort,          LANG.on,     LANG.off],
   ["positiontop",      opt_switch,     true,             LANG.optionpos,             LANG.top,    LANG.bottom],
   ["refreshtime",      opt_intval,     60,               LANG.refreshinterval,       LANG.change, LANG.enterinterval],
   ["alarmtest",        opt_switch,     LANGNOTSUPPORTED, LANG.testmode,              LANG.on,     LANG.off],
   ["alarmtesttyp",     opt_alarmtype,  1,                LANG.testedalarmtype,       LANG.change, LANG.enteralarmtype],
   ["growl",            opt_switch,     true,             LANG.growl,                    LANG.on,     LANG.off]   
  ];

// zczytywanie zapisanych opcji
for (var i=0; i<igh_options.length; i++)
  igh_options[i][op_value] =  IGH_getValue(igh_options[i][op_name],igh_options[i][op_value]);

/*************************************************************************************************/
var sheetdebug;

function onJQLoaded() { /* czesc glówna skryptu */

// mozliwosc rozwijania/zwijania opcji

sheetdebug = document.createElement('style');
sheetdebug.innerHTML = "div.igh_debug_window { display: none }";
document.body.appendChild(sheetdebug);

/*************************************************************************************************/

/* glówna tresc skryptu */

var content;

var attacks;
if (!LANGNOTSUPPORTED)
  attacks = getAttacks(document.getElementById("mainview").innerHTML); else
  attacks = [];

var lastattacks = IGH_getArray('attacks',attacks);
IGH_setArray('attacks',attacks);

var attack_type;

if (igh_options[o_alarmtest][op_value])
 {
  attack_type = igh_options[o_alarmtesttyp][op_value];
 } else
  attack_type = getAttackType(attacks, lastattacks);

if (((attack_type == at_changesnd) && !igh_options[o_endbattlealarm][op_value] && !igh_options[o_abortattackalarm][op_value]) ||
    ((attack_type == at_battleend) && (!igh_options[o_endbattlealarm][op_value])) ||
    ((attack_type == at_abortattack) && (!igh_options[o_abortattackalarm][op_value])))
  attack_type = at_noattack;
var brief_content;
brief_content="";
switch(attack_type)
 {
  case at_noattack:
   {
    content = LANG.nochanges;
    if (igh_options[o_refreshtime][op_value]>0)
      setTimeout("location.href= document.URL", igh_options[o_refreshtime][op_value]*1000);
    break;
   }
  case at_newattack:
   {
    content = '<font color="red" size="7"><b>'+LANG.warning+'<br>'+LANG.newattack+'</b></font>';
brief_content=LANG.newattack;
    break;
   }
  case at_changes:
   {
    content = '<font color="red" size="7"><b>'+LANG.warning+'<br>'+LANG.changes1+'</b></font>';
brief_content=LANG.changes1;
    break;
   }
  case at_battleend:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.endofbattle+'</b></font>';
brief_content=LANG.endofbattle;
    break;
   }
  case at_abortattack:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.abortattack+'</b></font>';
brief_content=LANG.abortattack;
    break;
   }
  case at_changesnd:
   {
    content = '<font color="green" size="7"><b>'+LANG.warning+'<br>'+LANG.changes2+'</b></font>';
brief_content=LANG.changes2;
    break;
   }
 }

if (attack_type!=at_noattack)
 {
  if (igh_options[o_sound][op_value])
    content += HTML_FLASH;
////// NOW THE GROWLER, forced.
Growler.growl('general_alert', 'Notificare General!', brief_content);

   var timer = setTimeout(refreshButton, 1000);
  for (var i = 0; i<timer; i++)
    window.clearTimeout(i);
  setInterval("updateServerTime()", 500);
  top.document.title = IGH_ALARM_TITLE;
 }

AddContent(content);
$("#igh_report_textarea").text(AttacksToReport(attacks));
var button = $("#igh_embassy_report_content_type");
button.toggle(
  function()
   {
    button.val("Circular message");
    $("#igh_report_textarea").text(AttacksToTextReport(attacks));
   },
  function()
   {
     button.val("Text only");
     $("#igh_report_textarea").text(AttacksToReport(attacks));
   });
GM_registerMenuCommand('IGH::Debug',show_debug);

} /* koniec czesci glównej skryptu */

/*************************************************************************************************/

// TODO: generowanie tablicy zmian
function getChanges(att, lastatt)
{
  for (var i=0; i<att.length; i++)
   {

   }
}

/*************************************************************************************************/

// TODO: zamienic to na generowanie tablicy zmian
function getAttackType(att, lastatt)
{
  // wiecej atakow
  if (att.length>lastatt.length)
    return at_newattack;

  // sprawdzanie po kolei wszystkich
  if (att.length==lastatt.length)
   {
    for (var i=0; i<att.length; i++)
     {
      if ((att[i].cityid!=lastatt[i].cityid) || (att[i].land!=lastatt[i].land))
        return at_changes; // co najmniej 1 atak doszedl i tyle samo ataków cofnietych
     }
   }

  var aborted   = false;
  var endbattle = false;

  for (var i=0; i<att.length; i++)
   {
    var lastattid;
    if ((att[i].cityid==lastatt[i].cityid) && (att[i].land==lastatt[i].land))
      lastattid = i; else
      lastattid = attacksIndexOf(lastatt,att[i].cityid,att[i].land);

    //if (lastattid==-1)
      //console.log("ERROR: getAttackType, lastattid==-1");

    if (!igh_options[o_onactbttlalarm][op_value] && att[i].active)
      continue;

    if (att[i].attacks.length>lastatt[lastattid].attacks.length)
      return at_newattack;

    // mniej atakow na dane miasto - ktos anulowal // TODO: poprawic dokladnosc tego sprawdzenia
    if (att[i].attacks.length<lastatt[lastattid].attacks.length)
     {
      aborted = true;
      continue;
     }

    for (var j=0; j<att[i].attacks.length; j++)
     {
      if (att[i].attacks[j].cityid!=lastatt[lastattid].attacks[j].cityid)
        return at_newattack;
     }
   }

  // ocenianie brakujacych atakow
  for (var i=0; i<lastatt.length; i++)
   {
    attid = attacksIndexOf(att,lastatt[i].cityid,lastatt[i].land);
    if (attid==-1)
     {
      if (lastatt[i].active)
        endbattle = true; else
        aborted   = true;
     }
   }

  if (aborted && endbattle)
    return at_changesnd;

  if (aborted)
    return at_abortattack;

  if (endbattle)
    return at_battleend;

  return at_noattack;
}

/*************************************************************************************************/

function getAttacks(content)
{
  var attacks = new Array();
  var t = content;
  var p2=0;
  var n=0;
  do
   {
     n++;
     var p = posB(t,'<tr class="rowRanks">',p2);
     if (p!=-1)
      {
       var elem = new TCityAttack();
       elem.attacks.push(new TAttack());
       var at = elem.attacks[0];
       var a;

       // okres czasu
       a=getCol(t,p);
       if (a[0]=="")
        {
         p2=a[1];
         continue;
        }

       at.time=trim(getBetween('>','<',getBetween('<div class="time"','div>',a[0])));

       // aktywne akcje
       a=getCol(t,a[1]);
       at.type=deleteBetween(" (", ")",a[0]);
       elem.land = (a[0].indexOf(LANG.pillage)!=-1) || (a[0].indexOf(LANG.occupytown)!=-1);
       elem.active = (a[0].indexOf(LANG.ontheway)==-1);

       // liczba jednostek
       a=getCol(t,a[1]);
       at.units=parseInt(a[0]);

       // miasto atakujacego
       a=getCol(t,a[1]);
       at.cityid=parseInt(getBetween("cityId=","\">",a[0]));

       // atakujacy
       at.player=getBetween("\">","</a>",a[0]);

       // czlonkowie sojuszu
       a=getCol(t,a[1]);
       elem.cityid=parseInt(getBetween("cityId=","\">",a[0]));
       elem.player=getBetween("\">","</a>",a[0]);

       p2=a[1];
       if (!at.verify() || !elem.verify())
         continue;

       var pos = attacksIndexOf(attacks,elem.cityid,elem.land);
       if (pos==-1)
        {
         attacks.push(elem);
         attacks.sort(cityattackcompfunc); // TODO: nie sortowac co chwile - ?jakos inaczej wrzucac - cos w stylu funkcji insert?
        } else
        {
         attacks[pos].active=attacks[pos].active || elem.active;
         attacks[pos].attacks.push(at);
        }
      }
   } while (p!=-1);

  for (var i=0; i<attacks.length; i++)
    attacks[i].attacks.sort(attackcompfunc);

  return attacks;
}

/*************************************************************************************************/

function AttacksToString(att)
{
  var t = "[begin]\n";
  for (var i=0; i<att.length; i++)
   {
    t+="\t[attack -"+i+"-]\n";
    t+="\t\tcityid=\t\t"    +att[i].cityid  +"\n";
    t+="\t\tplayername=\t"  +att[i].player  +"\n";
    t+="\t\tland=\t\t"      +att[i].land    +"\n";
    t+="\t\tactive=\t\t"    +att[i].active  +"\n";
    t+="\t\t[from]\n";
    for (var j=0; j<att[i].attacks.length; j++)
     {
      t+="\t\t\t[attack -"+j+"-]\n";
      t+="\t\t\t\tcityid=\t\t"    +att[i].attacks[j].cityid  +"\n";
      t+="\t\t\t\tplayername=\t"  +att[i].attacks[j].player  +"\n";
      t+="\t\t\t\ttype=\t\t"      +att[i].attacks[j].type    +"\n";
      t+="\t\t\t\tunits=\t\t"     +att[i].attacks[j].units   +"\n";
      t+="\t\t\t\ttime=\t\t"      +att[i].attacks[j].time    +"\n";
      t+="\t\t\t[attack end]\n";
     }
    t+="\t\t[from end]\n";
    t+="\t[attack end]\n";
   }
  t+="[end]";
  return t;
}

/*************************************************************************************************/

function AttacksToTextReport(att)
{
  var t = "";
  if (att.length==0)
    t+=LANG.nomembersattacked; else
   {
    for (var i=0; i<att.length; i++)
     {
      if (att[i].active)
       {
        var suma = 0;
        var czas = "";
        for (var j=0; j<att[i].attacks.length; j++)
         {
          if (att[i].attacks[j].time!="-")
            czas = att[i].attacks[j].time;
          suma+=att[i].attacks[j].units;
         }
         
        if (czas!="")
         {
          t+=czas+" ";
          if (att[i].land)
            t+="(o|--<) "; else
            t+="(~~~) ";
         }

        t+=att[i].player+' ('+LINK_CITY+att[i].cityid+')\n'+LANG.sumofenemiesunits+": " + suma + "\n\n";
       } else
        for (var j=0; j<att[i].attacks.length; j++)
         {
          t+=att[i].attacks[j].time+" ("+att[i].attacks[j].type+") - ";
          t+=att[i].player+' ('+LINK_CITY+att[i].cityid+')\n';
          t+=att[i].attacks[j].player+' ('+LINK_CITY+att[i].attacks[j].cityid+') - '+att[i].attacks[j].units;
          t+="\n\n";
         }
     }
   }
  return t;
}

/*************************************************************************************************/

function AttacksToReport(att)
{
  var t = "";
  if (att.length==0)
    t+=LANG.nomembersattacked; else
   {
    t+='<MessageFormatter><table>';
    for (var i=0; i<att.length; i++)
     {
      if (att[i].active)
       {
        t+="<tr><td>"+IMG_ATTACK+"</td>";
        var suma = 0;
        for (var j=0; j<att[i].attacks.length; j++)
          suma+=att[i].attacks[j].units;
        t+="<td>"+LANG.sumofenemiesunits+": <b>" + suma + "</b></td>";
        t+='<td><a href="'+LINK_CITY+att[i].cityid+'"><b>'+att[i].player+' ('+att[i].cityid+')</b></a></td></tr>';
       } else
        for (var j=0; j<att[i].attacks.length; j++)
         {
          t+='<tr><td>';
          if (att[i].attacks[j].type==LANG.blockharbour)
            t+=IMG_BLOCKADE; else
          if (att[i].attacks[j].type==LANG.pillage)
            t+=IMG_PLUNDER; else
          if (att[i].attacks[j].type==LANG.occupytown)
            t+=IMG_OCCUPY; else // ???
          t+="</td>";
          t+='<td><a href="'+LINK_CITY+att[i].attacks[j].cityid+'"><b><u>'+att[i].attacks[j].player+'</u></b></a> ('+att[i].attacks[j].units+')</td>';
          t+='<td><a href="'+LINK_CITY+att[i].cityid+'"><b>'+att[i].player+' ('+att[i].cityid+')</b></a></td>';
          t+="<td>"+IMG_TIME+"</td>";
          t+="<td>"+att[i].attacks[j].time+"</td>";
          t+="</tr>";
         }
      if (i!=(att.length-1))
        t+='<tr><td colspan="5"><hr></td></tr>';
      //dark = !dark;
     }
    t+="</table></MessageFormatter>";
   }
  return t;
}

/*************************************************************************************************/

function deleteBetween(from, to, t)
{
  var p;
  do
   {
    p = t.indexOf(from);
    if (p!=-1)
     {
      var p2 = t.indexOf(to,p);
      if (p2!=-1)
        t=t.substr(0,p)+t.substr(p2+to.length); else
        return t;
     } else
      return t;
   } while (p!=-1);
  return t;
}

/*************************************************************************************************/

// zwraca tekst znajdujacy sie miedzy from i to, z tekstu t
// dziala tylko na pierwsze wystapienie from/to
function getBetween(from, to, t)
{
  var p = t.indexOf(from);
  var p2 = t.indexOf(to,p);
  if ((p==-1) || (p2==-1))
    return "";
  p+=from.length;
  return t.substr(p,p2-p);
}

/*************************************************************************************************/

//dziala tak jak indexOf, z tym ze zwraca pozycje za tekstem jesli znaleziono
function posB(t,s,a)
{
  var p = t.indexOf(s,a);
  if (p==-1)
    return -1; else
    return p+s.length;
}

/*************************************************************************************************/

// zwraca zawartosc najblizszej kolumny w teksie t, zaczynajac wyszukiwanie od pos
function getCol(t,pos)
{
  var p = t.indexOf("<td>",pos);
  var p2;
  if (p!=-1)
   {
    p2 = t.indexOf("</td>",p);
    if (p2!=-1)
      return [t.substr(p+4,p2-p-4),p2+5]; else
      return ["",pos+4];
   } else
    return ["",pos];
}

/*************************************************************************************************/

// potrzebne do odliczania sekund w funkcji refreshButton
var n = 0;

function refreshButton()
{
  n++;
  document.getElementById("igh_embassy_button").value=LANG.lastrefresh1+" "+n+" "+LANG.lastrefresh2;
  setTimeout(refreshButton, 1000);
}

/*************************************************************************************************/

function toggleexpanded_options()
{
  expanded_options=!expanded_options;
  IGH_setValue('expanded_options', expanded_options);
  document.getElementById("igh_option_img").src=expanded_options?igh_minus:igh_plus;
  if (expanded_options)
//    $("#igh_embassy_options_content").slideDown("slow"); else
//    $("#igh_embassy_options_content").slideUp();
    $("#igh_embassy_options_content").fadeIn("slow"); else
    $("#igh_embassy_options_content").fadeOut("slow");
}

/*************************************************************************************************/

function toggleexpanded_report()
{
  expanded_report=!expanded_report;
  IGH_setValue('expanded_report', expanded_report);
  document.getElementById("igh_report_img").src=expanded_report?igh_minus:igh_plus;
  if (expanded_report)
    $("#igh_embassy_report_content").fadeIn("slow"); else
    $("#igh_embassy_report_content").fadeOut("slow");
}

/*************************************************************************************************/

function IGH_setValue(name, val)
{
  GM_setValue(settings_prefix+name,val);
}

/*************************************************************************************************/

function IGH_getValue(name, val)
{
  return GM_getValue(settings_prefix+name,val);
}

/*************************************************************************************************/

function IGH_setArray(name, val)
{
  GM_setValue(settings_prefix+name,uneval(val));
}

/*************************************************************************************************/

function IGH_getArray(name, val)
{
  return eval(GM_getValue(settings_prefix+name,uneval(val)));
}

/*************************************************************************************************/
// todo: zamienic na CreateContent, AddContent
function AddContent(content)
{
  var t;
  if (LANGNOTSUPPORTED)
    t = HTML_ADDCONTENT_1 + HTML_LANGNOTSUPP + content + HTML_ADDCONTENT_2; else
    t = HTML_ADDCONTENT_1 + content + HTML_ADDCONTENT_2;

  for (var i=0; i<igh_options.length; i++)
   {
    var val = "";
    if (igh_options[i][op_type]==opt_switch)
     {
      if (igh_options[i][op_value])
        val = "<b>"+ igh_options[i][op_text1] +"</b> | "+ igh_options[i][op_text2]; else
        val = igh_options[i][op_text1] +" | <b>"+ igh_options[i][op_text2] +"</b>";
     } else
    if (igh_options[i][op_type]==opt_intval)
     {
      val = "<b>"+igh_options[i][op_value]+"</b> - <b><i>"+igh_options[i][op_text1]+"</i></b>";
     } else
    if (igh_options[i][op_type]==opt_alarmtype) // TODO
     {
      val = "<b>"+igh_options[i][op_value]+"</b> - <b><i>"+igh_options[i][op_text1]+"</i></b>";
     }
    t+= HTML_ADDCONTENT_3 + igh_options[i][op_label] + HTML_ADDCONTENT_4 + i + HTML_ADDCONTENT_5 + val + 

HTML_ADDCONTENT_6;
   }

  /* przycisk debug */
  t+=
    "  <tr class=\"igh_embassy_options\">\n" +
    "    <td colspan=\"2\">" +
    "      <div id=\"igh_debug_window\" class=\"igh_debug_window\">\n" +
    "        <br><b><font color=\"red\">Debug data:</font></b><br>\n" +
	"        <textarea rows=\"10\" cols=\"80\" readonly=\"true\" id=\"igh_debug_textarea\" onClick=\"this.focus();this.select();\"></textarea>\n" +
    "      </div>\n" +
    "    </td>\n" +
    "  </tr>\n";

  t+=
    "</tbody></table>\n" +
    "</div>\n";

  // miejsce wstawienia ramki
  if (igh_options[o_positiontop][op_value]) // nad atakami
    $("#mainview>.contentBox01h>.content>br").after(t); else
    $("#mainview>.contentBox01h>.content>table").after(t);

  if (!expanded_options)
    $("#igh_embassy_options_content").hide();

  if (!expanded_report)
    $("#igh_embassy_report_content").hide();

  $("#igh_embassy").fadeIn();

  for (var i=0; i<igh_options.length; i++)
   {
    document.getElementById("igh_option_"+i).addEventListener('click',changeOption, true);
   }

  document.getElementById("igh_option_img").addEventListener('click',toggleexpanded_options,true);
  document.getElementById("igh_option_img").src=expanded_options?igh_minus:igh_plus;
  
  document.getElementById("igh_report_img").addEventListener('click',toggleexpanded_report,true);
  document.getElementById("igh_report_img").src=expanded_report?igh_minus:igh_plus;
}

/*************************************************************************************************/

function show_debug()
{
  if (sheetdebug.innerHTML=="div.igh_debug_window { display: inline }")
    sheetdebug.innerHTML = "div.igh_debug_window { display: none }"; else
    sheetdebug.innerHTML = "div.igh_debug_window { display: inline }";
  document.getElementById("igh_debug_textarea").innerHTML = AttacksToString(attacks);
}
/*************************************************************************************************/

function delete_settings()
{
  var vals = GM_listValues();
  for (var i=0; i < vals.length; i++)
    GM_deleteValue(vals[i]);
}

/*************************************************************************************************/

function menu_delete_settings()
{
  delete_settings();
  location.href = document.URL;
}

/*************************************************************************************************/
// todo: dodac do opcji callbacki - dodatkowe wywolanie funkcji
function changeOption(event)
{
  var nr = parseInt(this.id.substring(11));

  if (igh_options[nr][op_type]==opt_switch)
   {
    igh_options[nr][op_value]=!igh_options[nr][op_value];
    IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
    if (nr==o_positiontop)
      moveIGHWindow(); else
      location.href = document.URL;
   }
  if (igh_options[nr][op_type]==opt_intval)
   {
    var value = prompt(igh_options[nr][op_text2],igh_options[nr][op_value]);
    if (value!=null)
     {
      value = parseInt(value);
      if (value>=0)
       {
        igh_options[nr][op_value]=value;
        IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
        location.href = document.URL;
       } else
        alert(LANG.badvalue1);
     }
   }
  if (igh_options[nr][op_type]==opt_alarmtype)
   {
    var value = prompt(igh_options[nr][op_text2],igh_options[nr][op_value]);
    if (value!=null)
     {
      value = parseInt(value);
      if ((value>=1) && (value<=5))
       {
        igh_options[nr][op_value]=value;
        IGH_setValue(igh_options[nr][op_name], igh_options[nr][op_value]);
        location.href = document.URL;
       } else
        alert(LANG.badvalue2);
     }
   }
}

/*************************************************************************************************/

// stara wersja
/*function attacksIndexOf(att,elem,land)
{
  for (var i=0; i<att.length; i++)
   {
    if ((att[i].cityid==elem) && (att[i].land==land))
      return i;
   }
  return -1;
}*/


// wyszukiwanie binarne O(lgn)
function attacksIndexOf(att,cityid,land)
{
  var a = 0;
  var b = att.length-1;
 
  while (a<=b)
   {
     var c = Math.floor((a+b)/2); // todo: przesuniecie bitowe

     if (att[c].cityid == cityid)
      {
       if (att[c].land == land)
         return c; else
        {
         //if ()
         c=c+ (att[c].land?-1:1);
         if ((c<0) || (c>=att.length) || (att[c].cityid != cityid))
           return -1; else
           return c;
        }
      } else
      {
       if (cityid<att[c].cityid)
         b = c-1; else
         a = c+1;
      }
   }

  return -1;
}

/*************************************************************************************************/

function TCityAttack()
{
  this.cityid  = 0;
  this.player  = "";
  this.land    = false;
  this.active  = false;
  this.attacks = [];
  this.verify = function()
   {
    return !isNaN(this.cityid) && (this.player!="");
   }
}

/*************************************************************************************************/

function TAttack()
{
  this.cityid  = 0;
  this.player  = "";
  this.type    = "";
  this.units   = 0;
  this.time    = "";
  this.verify = function()
   {
    return !isNaN(this.cityid) && !isNaN(this.units) && (this.player!="");
   }
}

/*************************************************************************************************/

function cityattackcompfunc(a, b)
{
 if (a.cityid==b.cityid)
  {
   if (a.land)
     return 1; else
     return -1;
  } else
   return a.cityid-b.cityid; // rosnaco
}

/*************************************************************************************************/

function attackcompfunc(a, b)
{
  return a.cityid-b.cityid; // rosnaco
}

/*************************************************************************************************/

function getLanguage()
{
  var ikahost = location.host;
    
  var p = posB(ikahost,".ikariam.",0);
  if (p==-1)
   {
    // error
    return "";
   } else
   {
    var S = ikahost.substr(p);

    // sprawdzanie czy domena ma typ
    // s*.*.ikariam.com    
    if (S=="com")
     {
      var p1 = ikahost.indexOf(".ikariam.");
      var p2 = ikahost.indexOf(".");
      if (p1!=p2)
        S = ikahost.substr(p2+1,p1-p2-1);
     }
    return S;
   }
}

/*************************************************************************************************/

function moveIGHWindow()
{
  var obj = $("#igh_embassy");
  obj.slideUp("slow",
    function()
     {
      // miejsce wstawienia ramki - jQuery
      if (igh_options[o_positiontop][op_value]) // nad atakami
        $("#mainview>.contentBox01h>.content>br").after(obj); else
        $("#mainview>.contentBox01h>.content>table").after(obj);
      obj.slideDown("slow");
     });
}

/*************************************************************************************************/
/*                                           NIE MOJE                                            */
/*************************************************************************************************/

/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/
 
function trim(str, chars) {
  return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
  chars = chars || "\\s";
  return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/*************************************************************************************************/

// Checks if jQuery's loaded - based on tutorial
function GM_JQWait(onjqloaded)
{
  if (typeof unsafeWindow.jQuery == 'undefined')
   { 
    window.setTimeout(function() { GM_JQWait(onjqloaded); },100);
   } else
   {
    $ = unsafeWindow.jQuery;
    onjqloaded();
   }
}

/*************************************************************************************************/