// ==UserScript==
// @name           CalcUnits
// @namespace      mat
// @version        20140123
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @description    Calcular Unidades
// @icon  http://www.gravatar.com/avatar/f9c545f386b902b6fe8ec3c73a62c524?r=PG&s=60&default=identicon
    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);

// ==/UserScript==
//Fixed weird bug with koc game
if(window.self.location != window.top.location){
	if(window.self.location.href == window.parent.location.href){
		return; //If iframe source is same as the parent don't load script
	}
}

var Version = '20140112c';

var Title = 'KOC Power Tools';
var DEBUG_BUTTON = true;
var DEBUG_TRACE = false;
var DEBUG_TRACE_DRAG = false;
var DEBUG_TRACE_AJAX = false;
var MAP_DELAY = 1500;
var DISABLE_POST_KNIGHT_SKILLS = false;
var DISABLE_POST_DEFENSES = false;
var ENABLE_TEST_TAB = false;
var SEND_ALERT_AS_WHISPER = false;
var TEST_WIDE = false;
var TEST_WIDE_CITIES = 7;
var ENABLE_ALERT_TO_CHAT = true;
var History=[];
var throttle=10;
var TimeOffset = parseInt(new Date().getTimezoneOffset()*(-1))+480-getDST(); // difference between local time and PST/PDT in mins. All KoC TimeStamps appear to be in PST or PDT...
var FFVersion = getFirefoxVersion();

//Simple method, as if it were typed in thru DOM
function sendChat (msg){
    $(document.querySelector("#mod_comm_input")).val(msg);
    uW.Chat.sendChat ();
}

function AddMainTabLink(text, eventListener, mouseListener) {
    var label = "Champion Hall";

    var a=document.createElement('a');
    a.className='button20';
    a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
    a.id = 'chtab';
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
            if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
                gmTabs = ee;
                break;
            }
        }
        if (gmTabs == null){
            gmTabs = document.createElement('div');

/****************************  Unit Stats Calculator Tab  ******************************/
Tabs.UnitCalc = {
    tabOrder : 1100,                    // order to place tab in top bar
    tabLabel : 'UnitCalc',            // label to show in main window tabs
    myDiv : null,
    timer : null,

    init : function (div){    // called once, upon script startup
        var t = Tabs.UnitCalc;
        t.myDiv = div;
        div.innerHTML = '<div><table><tr><td><input id=unitStatsCalcButton style="font-size:'+ Options.overviewFontSize +'px" type="submit" value="Unit Stats"></td>\
                                         <td><input id=unitStatsMaxButton style="font-size:'+ Options.overviewFontSize +'px" type="submit" value="Max Stats" disabled></td>\
                         </tr></table></div>';
        div.innerHTML += '<div id=unitStatsDiv style="maxheight:710px; height:710px; overflow-y:scroll;"></div>';
        t.paintUnitStatsCalc();
    },

    hide : function (){         // called whenever the main window is hidden, or another tab is selected
        var t = Tabs.UnitCalc;
    },

    show : function (){         // called whenever this tab is shown
        var t = Tabs.UnitCalc;
    },

    paintUnitStatsCalc : function (){
        var t = Tabs.UnitCalc;
        var msg = '<table>';
        msg += '<tr style="vertical-align:top"><td>\
                <div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgResearchHdr class=ptdivLink >Research&nbsp;<img id=cfgResearchArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgResearch align=left class="">';
        msg += '<table border=1>\
                <tr><td>Healing Potions </td><td><input id=ptucResHP type=text value=12 size=4></tr>\
                <tr><td>Poisoned Edge   </td><td><input id=ptucResPE type=text value=12 size=4></tr>\
                <tr><td>Metal Alloys    </td><td><input id=ptucResMA type=text value=12 size=4></tr>\
                <tr><td>Alloy Horseshoes</td><td><input id=ptucResAH type=text value=12 size=4></tr>\
                <tr><td>Fletching       </td><td><input id=ptucResFL type=text value=12 size=4></tr></table></div>';
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgGuardianHdr class=ptdivLink >Guardian&nbsp;<img id=cfgGuardianArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgGuardian align=left class="">';
        msg += '<table border=1><tr><td>Guardians</td><td>Levels</td><td>Active</td></tr>\
                       <tr><td>Wood          </td><td><input id=ptucWood  type=text value=9 size=4></td><td><input id=ptucWoodAct type=radio name=ptucGuard checked></td></tr>\
                       <tr><td>Ore<sup>*<sup></td><td><input id=ptucOre   type=text value=9 size=4></td><td><input id=ptucOreAct type=radio name=ptucGuard></td></tr>\
                       <tr><td>Food          </td><td><input id=ptucFood  type=text value=9 size=4></td><td><input id=ptucFoodAct type=radio name=ptucGuard></td></tr>\
                       <tr><td>Stone         </td><td><input id=ptucStone type=text value=9 size=4></td><td><input id=ptucStoneAct type=radio name=ptucGuard></td></tr></table>';
        msg += 'Set Bonus<input id=ptucGuardSet type=checkbox unchecked></div>';
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgItemsHdr class=ptdivLink >Items&nbsp;<img id=cfgItemsArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgItems align=left class="">';
        msg += '<table border=1>\
                <tr><td>+20atk</td><td><input id=ptucItemAtk20 type=checkbox unchecked></td>\
                    <td>+50atk</td><td><input id=ptucItemAtk50 type=checkbox unchecked></td></tr>\
                <tr><td>+20def</td><td><input id=ptucItemDef20 type=checkbox unchecked></td>\
                    <td>+50def</td><td><input id=ptucItemDef50 type=checkbox unchecked></td></tr></table></div>';              
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgFeyHdr class=ptdivLink >Fey&nbsp;<img id=cfgFeyArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgFey align=left class="">';
        msg += '<table border=1><tr><td>Fey Altar Active: <input id=ptucFeyAltarActive type=checkbox unchecked></td></tr>\
                <td>Bonus Amount <input id=ptucFeyAltarBonus type=text value=40 size=4></td></tr></table>\
                <input id=ptucOreBless type=checkbox unchecked> Empowered Iron Blessing<br>\
                <input id=ptucBloodBless type=checkbox unchecked>Blood Lust<sup>*<sup></div>';
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgBritonHdr class=ptdivLink >Briton&nbsp;<img id=cfgBritonArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgBriton align=left class="">';
        msg += '<table border=1>\
                <tr><td>Strengthen Ranks  </td><td><input id=ptucResSR type=text value=10 size=4></tr>\
                <tr><td>Improved Fletching</td><td><input id=ptucResIF type=text value=10 size=4></tr></table></div>';
        msg += '</td>';
        
        msg += '<td style="vertical-align:top">'
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgKnightHdr class=ptdivLink >Knight&nbsp;<img id=cfgKnightArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgKnight align=left class="">';
        msg += 'Combat Points<input id="ptucKnightLevel" type=text value=300 size=4></div>';
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgOrderHdr class=ptdivLink >Order of the Round&nbsp;<img id=cfgOrderArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgOrder align=left class="">';
        msg += '<input id=ptucOrder type=checkbox unchecked>Subscriber</div>';
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left>Defender Stats</div>\
                Troops on Defense<input id=ptucDefending type=checkbox unchecked><br><sup>*</sup>Active only when attacking';

        msg += '</td>';
        
        msg += '<td style="vertical-align:top">'
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgThroneHdr class=ptdivLink >Throne&nbsp;<img id=cfgThroneArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgThrone align=left class="">';
        msg += '<table border=1>\
                <tr><td><b>TR Stats</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Spd</b></td><td><b>Rng</b></td></tr>\
                <tr><td>TR All Buff</td>        <td><input id=ptucLifeMod    type=text value=0 size=4></td><td><input id=ptucAtkMod    type=text value=0 size=4></td><td><input id=ptucDefMod    type=text value=0 size=4></td><td><input id=ptucSpdMod    type=text value=0 size=4></td><td><input id=ptucRngMod    type=text value=0 size=4></td></tr>\
                <tr><td>TR Infantry Buff</td>   <td><input id=ptucLifeModInf type=text value=0 size=4></td><td><input id=ptucAtkModInf type=text value=0 size=4></td><td><input id=ptucDefModInf type=text value=0 size=4></td><td><input id=ptucSpdModInf type=text value=0 size=4></td><td><input id=ptucRngModInf type=text value=0 size=4></td></tr>\
                <tr><td>TR Ranged Buff</td>     <td><input id=ptucLifeModRng type=text value=0 size=4></td><td><input id=ptucAtkModRng type=text value=0 size=4></td><td><input id=ptucDefModRng type=text value=0 size=4></td><td><input id=ptucSpdModRng type=text value=0 size=4></td><td><input id=ptucRngModRng type=text value=0 size=4></td></tr>\
                <tr><td>TR Siege Buff</td>      <td><input id=ptucLifeModSig type=text value=0 size=4></td><td><input id=ptucAtkModSig type=text value=0 size=4></td><td><input id=ptucDefModSig type=text value=0 size=4></td><td><input id=ptucSpdModSig type=text value=0 size=4></td><td><input id=ptucRngModSig type=text value=0 size=4></td></tr>\
                <tr><td>TR Horsed Buff</td>     <td><input id=ptucLifeModHor type=text value=0 size=4></td><td><input id=ptucAtkModHor type=text value=0 size=4></td><td><input id=ptucDefModHor type=text value=0 size=4></td><td><input id=ptucSpdModHor type=text value=0 size=4></td><td><input id=ptucRngModHor type=text value=0 size=4></td></tr></table></div>'
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left><a id=cfgChampHdr class=ptdivLink >Champion&nbsp;<img id=cfgChampArrow height="10" src="'+GameIcons.DownArrow+'"></a></div>';
        msg += '<div id=cfgChamp align=left class="">';
        msg += '<table border=1>\
                <tr><td><b>Champ Stats</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Spd</b></td><td><b>Rng</b></td></tr>\
                <tr><td></td>        <td><input id=ptucLifeChampMod    type=text value=0 size=4></td><td><input id=ptucAtkChampMod    type=text value=0 size=4></td><td><input id=ptucDefChampMod    type=text value=0 size=4></td><td><input id=ptucSpdChampMod    type=text value=0 size=4></td><td><input id=ptucRngChampMod    type=text value=0 size=4></td></tr>\
                </table></div>'
        msg += '<div class="ptdivHeader" style="background: #99CCFF;" align=left>Unit Stat</div>';
        msg += '<div>';
        msg += '<table border=1><tr><td><b>Unit</b></td><td><b>Life</b></td><td><b>Atk</b></td><td><b>Def</b></td><td><b>Speed</b></td><td><b>Range</b></td></tr>'
        for (ui=1; ui<nTroopType+1; ui++){
            cost = uW.unitcost['unt'+ui];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
            stats = uW.unitstats['unt'+ui];   //  Attack, Defense, Speed, Range, Life
            msg += '<tr><td>'+ cost[0].substr(0,16) +'</td><td id=ptucTrp'+(ui)+'Life>'+ stats[0] +'</td>\
                                                           <td id=ptucTrp'+(ui)+'Atk>'+ stats[1] +'</td>\
                                                           <td id=ptucTrp'+(ui)+'Def>'+ stats[2] +'</td>\
                                                           <td id=ptucTrp'+(ui)+'Spd>'+ stats[3] +'</td>\
                                                           <td id=ptucTrp'+(ui)+'Rng>'+ stats[4] +'</td></tr>';
        }
        msg += '</table></div>';


                
        msg += '</td></tr></table>';

        document.getElementById('unitStatsDiv').innerHTML = msg;
        document.getElementById('cfgResearchHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgResearch");}, false);
        document.getElementById('cfgGuardianHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgGuardian");}, false);
        document.getElementById('cfgItemsHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgItems");}, false);
        document.getElementById('cfgFeyHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgFey");}, false);
        document.getElementById('cfgBritonHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgBriton");}, false);
        document.getElementById('cfgThroneHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgThrone");}, false);
        document.getElementById('cfgChampHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgChamp");}, false);
        document.getElementById('cfgKnightHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgKnight");}, false);
        document.getElementById('cfgOrderHdr').addEventListener ('click', function () {ToggleDivDisplay(500,500,"cfgOrder");}, false);

        // Event listener Order of the Round Table
        document.getElementById('ptucOrder').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);

        // Event listener Knight Level
        document.getElementById('ptucKnightLevel').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1) alert('Enter positive numbers!');
            t.modifyUnitResearch();
        }, false);

        // Event listener Fey Altar
        document.getElementById('ptucFeyAltarActive').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucFeyAltarBonus').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=1 ;
            if (e.target.value < 1 || e.target.value > 40) alert('Enter a numbers between 1-40!');
            t.modifyUnitResearch();
        }, false);
		
		
        // Event listener Guardian
        document.getElementById('ptucWood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucOre').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucFood').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucStone').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucWoodAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucOreAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucFoodAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucStoneAct').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucGuardSet').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefending').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucOreBless').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucBloodBless').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        
        //Event listener Item Boosts
        document.getElementById('ptucItemAtk20').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucItemAtk50').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucItemDef20').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucItemDef50').addEventListener('change', function(e){
            t.modifyUnitResearch();
        }, false);
                
        // Event listener Research Level
        document.getElementById('ptucResHP').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResPE').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResMA').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResAH').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResFL').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 12 ) alert('Enter a number between 0-12!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResSR').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 10 ) alert('Enter a number between 0-10!');
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucResIF').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            if (e.target.value < 0 || e.target.vale > 10 ) alert('Enter a number between 0-10!');
            t.modifyUnitResearch();
        }, false);

        // Event listener Throne
        document.getElementById('ptucLifeMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucLifeModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucLifeModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucLifeModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucLifeModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ptucAtkMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucAtkModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucAtkModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucAtkModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucAtkModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ptucDefMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ptucSpdMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucSpdModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucSpdModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucSpdModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucSpdModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);

        document.getElementById('ptucRngMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucRngModInf').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucRngModRng').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucRngModSig').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucRngModHor').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        
        // Event listener Champ
        document.getElementById('ptucLifeChampMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucAtkChampMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucDefChampMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucSpdChampMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        document.getElementById('ptucRngChampMod').addEventListener('change', function(e){
            if (isNaN(e.target.value)) e.target.value=0 ;
            t.modifyUnitResearch();
        }, false);
        
        
        t.modifyUnitResearch();
    },

    modifyUnitResearch : function (){
        var t = Tabs.UnitCalc;
        var resLife = (5 * parseInt(document.getElementById('ptucResHP').value)/100);
        var resAtk  = (5 * parseInt(document.getElementById('ptucResPE').value)/100);
        var resDef  = (5 * parseInt(document.getElementById('ptucResMA').value)/100);
        var resSpd  = (5 * parseInt(document.getElementById('ptucResAH').value)/100);
        var resRng  = (5 * parseInt(document.getElementById('ptucResFL').value)/100);
        resRng  += (2 * parseInt(document.getElementById('ptucResIF').value)/100);
        var knight = parseFloat(document.getElementById('ptucKnightLevel').value)/200;
        var guardLife = t.woodGuardTable(parseInt(document.getElementById('ptucWood').value));
        var guardAtk = t.oreGuardTable(parseInt(document.getElementById('ptucOre').value));
        var guardLifeAct =  document.getElementById('ptucWoodAct').checked ? 1 : 0;
        var guardAtkAct = document.getElementById('ptucOreAct').checked ? 1 : 0;
        var guardSetAct = document.getElementById('ptucGuardSet').checked ? 1 : 0;
        var guardOreBless = document.getElementById('ptucOreBless').checked ? 1 : 0;
        var bloodLustBlessLife = document.getElementById('ptucBloodBless').checked ? 0.75 : 1;
        var bloodLustBlessAtkSpd = document.getElementById('ptucBloodBless').checked ? 1.5 : 1;
        var defending = document.getElementById('ptucDefending').checked ? 1 : 0;
        var itemAtk = 0;
        var itemDef = 0;
        var feyAltarAct = document.getElementById('ptucFeyAltarActive').checked ? 1 : 0;
        var feyAltar = parseFloat(document.getElementById('ptucFeyAltarBonus').value)/100;
        var orderDef = 0;
        
        var champLife = parseFloat(document.getElementById('ptucLifeChampMod').value);
        var champAtk = parseFloat(document.getElementById('ptucAtkChampMod').value);
        var champDef = parseFloat(document.getElementById('ptucDefChampMod').value);
        var champSpd = parseFloat(document.getElementById('ptucSpdChampMod').value);
        var champRng = parseFloat(document.getElementById('ptucRngChampMod').value);
        
        if (document.getElementById('ptucOrder').checked)
            orderDef = 0.15;
        if (document.getElementById('ptucItemAtk20').checked)
            itemAtk = 0.2 + itemAtk;
        if (document.getElementById('ptucItemAtk50').checked)
            itemAtk = 0.5 + itemAtk;
        if (document.getElementById('ptucItemDef20').checked)
            itemDef = 0.2 + itemDef;
        if (document.getElementById('ptucItemDef50').checked)
            itemDef = 0.5 + itemDef;           
        if (defending)
            bloodLustBlessAtkSpd = 1;
            
        // calculate guardian
        if (guardSetAct) { //if you have set bonus
            if (guardLifeAct && defending) { //if your want defending troop stats
                guardLife = (guardLife/2 + guardLife) / 100;
                guardAtk = 0;
            }
            else if (guardAtkAct) {
                if(defending) {
                    guardAtk = 0;
                    guardLife = guardLife/200;
                }
                else {
                    guardAtk = (1.5*guardAtk/100) + guardOreBless*0.15 + guardOreBless*(1.5*guardAtk/100);
                    guardLife = 0;
                }
            }
            else {
                if(defending) {
                    guardAtk = 0;
                    guardLife = guardLife/200;
                }
                else {
                    guardAtk = (guardAtk/200) + guardOreBless*0.15 + guardOreBless*0.15*(guardAtk/200);
                    guardLife = 0;
                }
            }
        } else { // don't have set bonus
           if (guardLifeAct && defending) {
                guardLife = guardLife / 100;
                guardAtk = 0;
            }
            else if (guardAtkAct && !defending) {
                guardAtk = (guardAtk/100) + guardOreBless*0.15 + guardOreBless*0.15*(guardAtk/100);
                guardLife = 0;
            }
            else {
                guardAtk = 0;
                guardLife = 0;
            }            
        }

        for (ui=1; ui<nTroopType+1; ui++){
            switch(unsafeWindow.cm.unitFrontendType[ui]) {
                case "infantry" :
                    if(ui < 10) {
                        document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModInf').value))/100)));
                        document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModInf' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModInf' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        * (                                        t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModInf' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        * (                                        t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModInf' ).value))/100)));
                    } else {
                        //Trp13 - blood
                        //verified on 11/30 that bloods don't use infantry buff for atk/def. other stats unknown
                        //Trp14 - exec
                        //verified on 11/30 that exec don't use infantry buff for atk/def. other stats unknown
                        document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),0)/100)));
                        document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),0)/100)));
                        document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),0)/100)));
                        document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        * (                                        t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),0)/100)));
                        document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        * (                                        t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),0)/100)));
                    }
                    break;
                case "ranged" :
                    document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * bloodLustBlessLife   * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModRng').value))/100)));
                    document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * bloodLustBlessAtkSpd * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModRng' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2])                        * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModRng' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3])                        * (                                        t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModRng' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4])                        * (resRng                                + t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModRng' ).value))/100)));
                    break;
                case "horsed" :
                    document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModHor').value))/100)));
                    document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModHor' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModHor' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) * (resSpd                                + t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModHor' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) * (                                        t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModHor' ).value))/100)));
                    break;
                case "specialist" :
                    //Trp9 - wagons
                    //Trp15 - siege wall
                    document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModSig').value))/100)));
                    document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModSig' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModSig' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) * (                                      + t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModSig' ).value))/100)));
                    document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) * (                                      + t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModSig' ).value))/100)));
                    break;
                case "siege" :
                    if (ui == 10) {
                        //Trp10 - ball
                        document.getElementById('ptucTrp10Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt10'][0]) + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt10'][0]) * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModSig').value))/100)));
                        document.getElementById('ptucTrp10Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt10'][1]) + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt10'][1]) * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModSig' ).value))/100)));
                        document.getElementById('ptucTrp10Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt10'][2]) + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt10'][2]) * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModSig' ).value))/100)));
                        document.getElementById('ptucTrp10Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt10'][3]) + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt10'][3]) * (resSpd                                + t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModSig' ).value))/100)));
                        document.getElementById('ptucTrp10Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt10'][4]) + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt10'][4]) * (resRng                                + t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModSig' ).value))/100)));
                    } else {
                        document.getElementById('ptucTrp'+ui+'Life').innerHTML = t.round1decimals( (1 + guardLife) * ( (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) + (1 + feyAltar*feyAltarAct) * (champLife + uW.unitstats['unt'+ui][0]) * (resLife                               + t.maxBuff('Life',parseFloat(document.getElementById('ptucLifeMod').value),parseFloat(document.getElementById('ptucLifeModSig').value))/100)));
                        document.getElementById('ptucTrp'+ui+'Atk').innerHTML  = t.round1decimals( (1 + guardAtk)  * ( (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) + (1 + feyAltar*feyAltarAct) * (champAtk  + uW.unitstats['unt'+ui][1]) * (resAtk  + knight + itemAtk            + t.maxBuff('Attack', parseFloat(document.getElementById('ptucAtkMod' ).value),parseFloat(document.getElementById('ptucAtkModSig' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Def').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) + (1 + feyAltar*feyAltarAct) * (champDef  + uW.unitstats['unt'+ui][2]) * (resDef  + knight + itemDef + orderDef + t.maxBuff('Defense', parseFloat(document.getElementById('ptucDefMod' ).value),parseFloat(document.getElementById('ptucDefModSig' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Spd').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) + (1 + feyAltar*feyAltarAct) * (champSpd  + uW.unitstats['unt'+ui][3]) * (resSpd                                + t.maxBuff('Speed', parseFloat(document.getElementById('ptucSpdMod' ).value),parseFloat(document.getElementById('ptucSpdModSig' ).value))/100)));
                        document.getElementById('ptucTrp'+ui+'Rng').innerHTML  = t.round1decimals(                   ( (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) + (1 + feyAltar*feyAltarAct) * (champRng  + uW.unitstats['unt'+ui][4]) * (resRng                                + t.maxBuff('Range', parseFloat(document.getElementById('ptucRngMod' ).value),parseFloat(document.getElementById('ptucRngModSig' ).value))/100)));
                    }
                    break;
            }
        }
    },

    maxBuff : function (stat,a,b) {
        if (a+b > unsafeWindow.cm.thronestats.boosts[stat].Max)
            return unsafeWindow.cm.thronestats.boosts[stat].Max;
        else if (a+b < unsafeWindow.cm.thronestats.boosts[stat].Min)
            return unsafeWindow.cm.thronestats.boosts[stat].Min;
        else
            return a+b;
    },

    round1decimals : function (number) {
        return Math.round(number * 10) / 10;
    },
    
    woodGuardTable : function (number) {
        if (number == '1')
            return 1;
        else if (number == '2')
            return 2;
        else if (number == '3')
            return 3;
        else if (number == '4')
            return 4;
        else if (number == '5')
            return 6;
        else if (number == '6')
            return 8;
        else if (number == '7')
            return 10;
        else if (number == '8')
            return 13;
        else if (number == '9')
            return 16;
        else if (number == '10')
            return 20;
        else if (number == '11')
            return 25;
        else if (number == '12')
            return 35;
        else
            return 0;
    },

    oreGuardTable : function (number) {
        if (number == '1')
            return 2;
        else if (number == '2')
            return 4;
        else if (number == '3')
            return 6;
        else if (number == '4')
            return 8;
        else if (number == '5')
            return 12;
        else if (number == '6')
            return 16;
        else if (number == '7')
            return 20;
        else if (number == '8')
            return 26;
        else if (number == '9')
            return 32;
        else if (number == '10')
            return 40;
        else if (number == '11')
            return 50;
        else if (number == '12')
            return 65;
        else
            return 0;
    },

