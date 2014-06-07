// ==UserScript==
// @name            Ghost  
// @namespace       http://*ruinsofchaos.com/*
// @description     Logs recons, sabs and gold.
// @version         1
// @include         http://*ruinsofchaos.com/*
// ==/UserScript==
 
// Author : Nabil
 
//================================================================
// CODE THAT IS EXECUTED ON EVERY PAGE
//================================================================
 
// Check what part of the script should be executed
//-------------------------------------------------
 
(function () {
    page = document.URL.split(".com/");
    page = page[1].split(".php");
       
        switch(page[0]) {
                case 'base':
                        Basepage();
                Version();
                break;
                case 'inteldetail':
                        IntelPage();
                break;
                case 'armory':
                        Armorypage();
                break;
                case 'train':
                        Trainpage();
                break;
                case 'battlefield':
                        Battlefieldpage();
                break;
                case 'attacklog':
                        Attacklogpage();
                break;
                case 'stats':
                        Statspage();
                break;
                case 'writemail':
         Writemailpage();
        break;
        }
 
    CheckAllowed();
 
})();
 
 
// Put the user-ID in a GMvalue for later use
//-------------------------------------------
 
if((GM_getValue('myID') == undefined) || (isNaN(GM_getValue('myID'))))
{
    var myLink = document.getElementsByClassName('mtop vm c')[0].firstChild.href;
       
        if (myLink.charAt(7) == 'w')
        var myID = myLink.replace(/http:\/\/www\.ruinsofchaos.com\/stats\.php\?id\=/gi, '');
        else
                var myID = myLink.replace(/http:\/\/ruinsofchaos.com\/stats\.php\?id\=/gi, '');
               
    GM_setValue('myID', myID);
}
 
  
// Go to the gold ordered battlefield (Startpage 1 or not)
//--------------------------------------------------------
 
var BF_href = '';
var button = document.getElementsByClassName('menu3');
 
if (GM_getValue('OrderBattlefield','Yes') == 'Yes')
{
    if (GM_getValue('Startpage1','Yes') == 'Yes')
    {
        var href = button[0].href;
        BF_href = href.replace(/do=mypage/gi, 'order=gold');
    }
    else
    {
        var href = button[0].href;
        var rank_str = document.getElementById("s_rank").innerHTML;
        var rank = parseInt(rank_str.slice(1, rank_str.length));
 
        var start = 0;
        if (rank % 50 == 0)
        {
            start = rank - 50;
        }
        else
        {
            for (var i = 0; i <= rank; i = i + 50)
            {
                if (rank - 50 <= i)
                {
                    start = i;
                }
            }
        }
        BF_href = href.replace(/do=mypage/gi, 'start=' + start + '&order=gold');
    }
}
else
{
        if (GM_getValue('Startpage1','Yes') == 'Yes')
        {
                BF_href = 'http://www.ruinsofchaos.com/battlefield.php?start=0';       
        }
        else
        {
                BF_href = 'http://www.ruinsofchaos.com/battlefield.php?do=mypage';
        }
}
 
button[0].href = BF_href;
 
 
//================================================================
// CODE THAT IS EXECUTED ON THE STATS PAGE
//================================================================
 
// Put the users race in a GMvalue for later use
//----------------------------------------------
 
function Statspage()
{
    if ((document.URL.replace(/http:\/\/www\.ruinsofchaos.com\/stats\.php\?id\=/gi, "") == GM_getValue("myID")) ||
                (document.URL.replace(/http:\/\/ruinsofchaos.com\/stats\.php\?id\=/gi, "") == GM_getValue("myID")) )
        {
        var army = document.getElementsByClassName("lg")[2].innerHTML;
 
        if (army.match(/Humans/gi)) {
            GM_setValue("myRace", "Humans");
        }
        if (army.match(/Dwarves/gi)) {
            GM_setValue("myRace", "Dwarves");
        }
        if (army.match(/Orcs/gi)) {
            GM_setValue("myRace", "Orcs");
        }
        if (army.match(/Elves/gi)) {
            GM_setValue("myRace", "Elves");
        }
    }
}
 
 
 

 
 
//================================================================
// CODE THAT IS EXECUTED ON THE ATTACKLOG PAGE
//================================================================
 
function Attacklogpage()
    {
       // Show a window with the totals in it
       //------------------------------------
       
       var soldiersLostDefending = 0;
       var soldiersKilledDefending = 0;
       var soldiersLostAttacking = 0;
       var soldiersKilledAttacking = 0;
       var goldLost = 0;
       var goldStolen = 0;
       
       // Get totals from Defenses table
       var index = findTableIndex('Defenses');
       var rows = document.getElementsByTagName('table')[index].rows;
       for(var i = 2; i < rows.length-2; i++)
       {
          var gold = 0;
          if(removeComma(FindText(rows[i].cells[4].innerHTML,'>',' Gold</a>')))
          {
             gold = parseInt(removeComma(FindText(rows[i].cells[4].innerHTML,'>',' Gold</a>')));
          }
          goldLost += gold;
          if (rows[i].cells[5].innerHTML == '??? ') addSoldiersKilledDefending = 0;
          else addSoldiersKilledDefending = parseInt(removeComma(rows[i].cells[5].innerHTML));
          soldiersKilledDefending += addSoldiersKilledDefending;
          soldiersLostDefending += parseInt(removeComma(rows[i].cells[6].innerHTML));
       }
       
       // Get totals from Attacks table
       var index = findTableIndex('Attacks');
       var rows = document.getElementsByTagName('table')[index].rows;
       for(var i = 2; i < rows.length-2; i++)
       {
          var gold = 0;
          if(removeComma(FindText(rows[i].cells[4].innerHTML,'>',' Gold</a>')))
          {
             gold = parseInt(removeComma(FindText(rows[i].cells[4].innerHTML,'>',' Gold</a>')));
          }
          goldStolen += gold;
          soldiersKilledAttacking += parseInt(removeComma(rows[i].cells[5].innerHTML));
          soldiersLostAttacking += parseInt(removeComma(rows[i].cells[6].innerHTML));
       }
       
       // Make the new content
       var n = '<table cellspacing="0" class="sep f" style="width: 49%; float: left;"><tr class="topcap"><th colspan="2">Defenses</th></tr>';
       n += '<tr class="odd"><td>Gold stolen from you:</td><td class="r">'+ addCommas(goldLost) +' Gold</td></tr>';
       n += '<tr class="even"><td>Soldiers lost:</td><td class="r">'+ addCommas(soldiersLostDefending) +'</td></tr>';
       n += '<tr class="odd"><td>Soldiers killed:</td><td class="r">'+ addCommas(soldiersKilledDefending) +'</td></tr>';
       n += '<tr></td colspan="2">&nbsp;</td></tr>'
       n += '</table>';
       
       n += '<table cellspacing="0" class="sep f" style="width: 49%; float: right;"><tr class="topcap"><th colspan="2">Attacks</th></tr>';
       n += '<tr class="odd"><td>Gold stolen by you:</td><td class="r">'+ addCommas(goldStolen) +' Gold</td></tr>';
       n += '<tr class="even"><td>Soldiers lost:</td><td class="r">'+ addCommas(soldiersLostAttacking) +'</td></tr>';
       n += '<tr class="odd"><td>Soldiers killed:</td><td class="r">'+ addCommas(soldiersKilledAttacking) +'</td></tr>';
       n += '<tr></td colspan="2">&nbsp;</td></tr>'
       n += '</table>';
       
       // Add the new content to the page
       table = document.getElementsByTagName('table')[4];
       row = table.insertRow(0);
       cell = row.insertCell(0);
       
       cell.innerHTML = n;
       cell.style.border = 'none';
       cell.style.margin = 0;
       cell.colSpan = 10;
 
    }
 
 
 
 
//================================================================
// CODE THAT IS EXECUTED ON THE ARMORY PAGE
//================================================================
 
    function Armorypage()
        {
 
 
        // Add upgrade calculations to the armory page
        //--------------------------------------------
 
            if (GM_getValue('ShowUpgradehelper', 'Yes') == 'Yes')
           {
              // Show a message if the race is unknown, we need the race for calculations
                if (GM_getValue('myRace') == undefined)
              {
                    content = document.getElementById('table_body').innerHTML;
                    warning = '<div style="border: 1px solid #FF0000; color: #FF0000; background: #2B0000; padding: 10px; text-align: center;"><b>'
                 warning += 'To make sure the upgrade calculations are right, the script needs to know what race you are.<br />Please go to your stats'
                 warning += ' page to allow the script to save your race.<br /><br /></b><a href="http://www.ruinsofchaos.com/stats.php?id'
                 warning += '=' + GM_getValue('myID') + '" style="color: #AA0000; ">Go to my stats page!</a></div>';
 
                    document.getElementById('table_body').innerHTML = warning + content;
                }
 
              // Make the multipliers for the racebonusses
                if (GM_getValue("myRace") == 'Orcs') {
                    var racebonus_strike = 1.20;
                    var racebonus_defense = 1;
                }
                else if (GM_getValue("myRace") == 'Dwarves') {
                    var racebonus_strike = 1;
                    var racebonus_defense = 1.20;
                }
              else if (GM_getValue("myRace") == 'Humans') {
                    var racebonus_strike = 1.10;
                    var racebonus_defense = 1.10;
                }
                else {
                    var racebonus_strike = 1;
                    var racebonus_defense = 1;
                }
 
                // make the multiplier for strike-bonuspoints
                var str = document.getElementsByClassName('l')[3].innerHTML;
             
                if (str.match(/\%/gi)) // if there are bonuspoints
                {
                    var number = FindText(str, '<b>Strike: (+', '%) </b>');
                    if (number.length == 1) // bonus is 1 digit
                    {
                        var bonus_strike = parseFloat('0.0' + number);
                    }
                    else // bonus is 2 digits
                    {
                        var bonus_strike = parseFloat('0.' + number);
                    }
                }
                else {
                    var bonus_strike = 0; // no bonus
                }
             
 
                // make the multiplier for defense-bonuspoints
                var str = document.getElementsByClassName('l')[4].innerHTML;
                if (str.match(/\%/gi)) // if there are bonuspoints
                {
                    var number = FindText(str, '<b>Defense: (+', '%) </b>');
                    if (number.length == 1) // bonus is 1 digit
                    {
                        var bonus_defense = parseFloat('0.0' + number);
                    }
                    else // bonus is 2 digits
                    {
                        var bonus_defense = parseFloat('0.' + number);
                    }
                }
                else {
                    var bonus_defense = 0; // no bonus
                }
 
                // Get prices for next upgrades
                var price_next_siege = document.getElementsByName('upgrade[siege]')[0].value;
                price_next_siege = parseInt(removeComma(price_next_siege.slice(0, price_next_siege.length - 5)));
                var price_next_fort = document.getElementsByName('upgrade[fort]')[0].value;
                price_next_fort = parseInt(removeComma(price_next_fort.slice(0, price_next_fort.length - 5)));
                var current_gold = parseInt(removeComma(document.getElementById('s_gold').innerHTML));
 
                // Get current upgrade-multipliers
                siege = document.getElementsByClassName('sep f')[1].rows[2].cells[0].innerHTML;
                siege_mult = parseFloat(siege.slice(siege.indexOf("(") + 1, siege.length - 2));
                fort = document.getElementsByClassName('sep f')[2].rows[2].cells[0].innerHTML; ;
                fort_mult = parseFloat(fort.slice(fort.indexOf("(") + 1, fort.length - 2));
 
                // Get amounts of soldiers
              var str_soldiers = document.getElementsByTagName('table')[10].rows[2].cells[2].innerHTML;
                var usoldiers = parseInt(removeComma(FindText(str_soldiers, " (+", " Untrained)")));
                index_ta = str_soldiers.indexOf("+");
                var asoldiers = parseInt(removeComma(document.getElementsByTagName('table')[10].rows[2].cells[2].innerHTML.substr(0, index_ta - 2)));
                index_td = str_soldiers.indexOf("+");
                var dsoldiers = parseInt(removeComma(document.getElementsByTagName('table')[10].rows[3].cells[2].innerHTML.substr(0, index_td - 2)));
 
                // Get the amounts of weapons
                weapons = document.getElementsByClassName('amount');
                var daggers = parseInt(removeComma(weapons[0].innerHTML));
                var mauls = parseInt(removeComma(weapons[1].innerHTML));
                var blades = parseInt(removeComma(weapons[2].innerHTML));
                var excals = parseInt(removeComma(weapons[3].innerHTML));
                var sais = parseInt(removeComma(weapons[4].innerHTML));
                var shields = parseInt(removeComma(weapons[5].innerHTML));
                var mithrils = parseInt(removeComma(weapons[6].innerHTML));
                var dragonskins = parseInt(removeComma(weapons[7].innerHTML));
 
              // Strike action formula !!!
                function calc_SA(daggers, mauls, blades, excals, siege_mult, bonus_strike, racebonus_strike)
              {
                    var currentSA = 0;
                    var asoldiers_rest = 0;
                    var usoldiers_rest = 0;
 
                    //--- Excaliburs
                    if (excals <= asoldiers) // If there are enough trained soldiers to hold all the excaliburs
                    {
                        asoldiers_rest = asoldiers - excals;
                        usoldiers_rest = usoldiers;
                        currentSA += (excals * 12000 * 6);
                        if ((daggers == 0) && (mauls == 0) && (blades == 0)) {
                            currentSA += (asoldiers_rest * 6) + (usoldiers_rest * 4);
                       asoldiers_rest = 0;
                       usoldiers_rest = 0;
                        }
                    }
                    else // If there are not enough trained soldiers to hold all the excaliburs
                    {
                        excals_rest = excals - asoldiers;
                        currentSA += asoldiers * 12000 * 6;
                        if (excals_rest <= usoldiers) // If there are enough untrained soldiers to hold all excaliburs
                        {
                            usoldiers_rest = usoldiers - excals_rest;
                            currentSA += excals_rest * 12000 * 4;
                       asoldiers_rest = 0;
                            if ((daggers == 0) && (mauls == 0) && (blades == 0)) {
                                currentSA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all excaliburs
                        {
                            excals_rest = excals_rest - usoldiers;
                            currentSA += (usoldiers * 12000 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Blades
                    if (blades <= asoldiers_rest) //If there are enough trained soldiers to hold all the blades
                    {
                        asoldiers_rest -= blades;
                        currentSA += (blades * 3000 * 6);
                        if ((daggers == 0) && (mauls == 0)) {
                            currentSA += (asoldiers_rest * 6) + (usoldiers_rest * 4);
                       asoldiers_rest = 0;
                       usoldiers_rest = 0;
                        }
                    }
                    else //If there are not enough trained soldiers to hold all the blades
                    {
                        blades_rest = blades - asoldiers_rest;
                        currentSA += asoldiers_rest * 3000 * 6;
                    asoldiers_rest = 0;
                        if (blades_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all blades
                        {
                            usoldiers_rest -= blades_rest;
                            currentSA += (blades_rest * 3000 * 4);
                            if ((daggers == 0) && (mauls == 0)) {
                                currentSA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all blades
                        {
                            blades_rest -= usoldiers_rest;
                            currentSA += (usoldiers_rest * 3000 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Mauls
                    if (mauls <= asoldiers_rest) //If there are enough trained soldiers to hold all the mauls
                    {
                        asoldiers_rest -= mauls;
                        currentSA += (mauls * 300 * 6);
                        if (daggers == 0) {
                            currentSA += (asoldiers_rest * 6) + (usoldiers_rest * 4);
                       asoldiers_rest = 0;
                       usoldiers_rest = 0;
                        }
                    }
                    else //If there are not enough trained soldiers to hold all the mauls
                    {
                        mauls_rest = mauls - asoldiers_rest;
                        currentSA += asoldiers_rest * 300 * 6;
                    asoldiers_rest = 0;
                        if (mauls_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all mauls
                        {
                            usoldiers_rest -= mauls_rest;
                            currentSA += (mauls_rest * 300 * 4);
                            if (daggers == 0) {
                                currentSA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all mauls
                        {
                            mauls_rest -= usoldiers_rest;
                            currentSA += (usoldiers_rest * 300 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Daggers
                    if (daggers <= asoldiers_rest) //If there are enough trained soldiers to hold all the daggers
                    {
                        asoldiers_rest -= daggers;
                        currentSA += (daggers * 30 * 6) + (asoldiers_rest * 6) + (usoldiers_rest * 4);
                    asoldiers_rest = 0;
                    usoldiers_rest = 0;
                    }
                    else //If there are not enough trained soldiers to hold all the daggers
                    {
                        daggers_rest = daggers - asoldiers_rest;
                        currentSA += (asoldiers_rest * 30 * 6);
                    asoldiers_rest = 0;
                        if (daggers_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all daggers
                        {
                            usoldiers_rest -= daggers_rest;
                            currentSA += (daggers_rest * 30 * 4) + (usoldiers_rest * 4);
                       usoldiers_rest = 0;
                        }
                        else // If there are not enough untrained soldiers to hold all daggers
                        {
                            daggers_rest -= usoldiers_rest;
                            currentSA += (usoldiers_rest * 30 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    currentSA = Math.round((currentSA * (bonus_strike + racebonus_strike) * siege_mult));
                    return currentSA;
                }
             
                // Defensive action formula !!!
                function calc_DA(sais, shields, mithrils, dragonskins, fort_mult, bonus_defense, racebonus_defense)
              {
                    var currentDA = 0;
                    var dsoldiers_rest = 0;
                    var usoldiers_rest = 0;
 
                    //--- Dragonskins
                    if (dragonskins <= dsoldiers) // If there are enough trained soldiers to hold all the dragonskins
                    {
                        dsoldiers_rest = dsoldiers - dragonskins;
                        usoldiers_rest = usoldiers;
                        currentDA += (dragonskins * 12000 * 6);
                        if ((sais == 0) && (shields == 0) && (mithrils == 0)) {
                            currentDA += (dsoldiers_rest * 6)+(usoldiers_rest * 4);
                       usoldiers_rest = 0;
                        }
                    }
                    else // If there are not enough trained soldiers to hold all the dragonskins
                    {
                        dragonskins_rest = dragonskins - dsoldiers;
                        currentDA += dsoldiers * 12000 * 6;
                    dsoldiers_rest = 0;
                        if (dragonskins_rest <= usoldiers) // If there are enough untrained soldiers to hold all dragonskins
                        {
                            usoldiers_rest = usoldiers - dragonskins_rest;
                            currentDA += dragonskins_rest * 12000 * 4;
                            if ((sais == 0) && (shields == 0) && (mithrils == 0)) {
                                currentDA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all dragonskins
                        {
                            dragonskins_rest = dragonskins_rest - usoldiers;
                            currentDA += (usoldiers * 12000 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Mithrils
                    if (mithrils <= dsoldiers_rest) //If there are enough trained soldiers to hold all the mithrils
                    {
                        dsoldiers_rest -= mithrils;
                        currentDA += (mithrils * 3000 * 6);
                        if ((sais == 0) && (shields == 0)) {
                            currentDA += (dsoldiers_rest * 6)+(usoldiers_rest * 4);
                       dsoldiers_rest = 0;
                       usoldiers_rest = 0;
                        }
                    }
                    else //If there are not enough trained soldiers to hold all the mithrils
                    {
                        mithrils_rest = mithrils - dsoldiers_rest;
                        currentDA += (dsoldiers_rest * 3000 * 6);
                    dsoldiers_rest = 0;
                        if (mithrils_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all mithrils
                        {
                            usoldiers_rest -= mithrils_rest;
                            currentDA += (mithrils_rest * 3000 * 4);
                            if ((sais == 0) && (shields == 0)) {
                                currentDA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all mithrils
                        {
                            mithrils_rest -= usoldiers_rest;
                            currentDA += (usoldiers_rest * 3000 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Shields
                    if (shields <= dsoldiers_rest) //If there are enough trained soldiers to hold all the shields
                    {
                        dsoldiers_rest -= shields;
                        currentDA += (shields * 300 * 6);
                        if (sais == 0) {
                            currentDA += (dsoldiers_rest * 6)+(usoldiers_rest * 4);
                       dsoldiers_rest = 0;
                       usoldiers_rest = 0;
                        }
                    }
                    else //If there are not enough trained soldiers to hold all the shields
                    {
                        shields_rest = shields - dsoldiers_rest;
                        currentDA += dsoldiers_rest * 300 * 6;
                    dsoldiers_rest = 0;
                        if (shields_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all shields
                        {
                            usoldiers_rest -= shields_rest;
                            currentDA += (shields_rest * 300 * 4);
                            if (sais == 0) {
                                currentDA += (usoldiers_rest * 4);
                          usoldiers_rest = 0;
                            }
                        }
                        else // If there are not enough untrained soldiers to hold all shields
                        {
                            shields_rest -= usoldiers_rest;
                            currentDA += (usoldiers_rest * 300 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    //--- Sais
                    if (sais <= dsoldiers_rest) //If there are enough trained soldiers to hold all the sais
                    {
                        dsoldiers_rest -= sais;
                        currentDA += (sais * 30 * 6) + (dsoldiers_rest * 6) + (usoldiers_rest * 4);
                    }
                    else //If there are not enough trained soldiers to hold all the sais
                    {
                        sais_rest = sais - dsoldiers_rest;
                        currentDA += (dsoldiers_rest * 30 * 6);
                    dsoldiers_rest = 0;
                        if (sais_rest <= usoldiers_rest) // If there are enough untrained soldiers to hold all sais
                        {
                            usoldiers_rest -= sais_rest;
                            currentDA += (sais_rest * 30 * 4) + (usoldiers_rest * 4);
                       usoldiers_rest = 0;
                        }
                        else // If there are not enough untrained soldiers to hold all sais
                        {
                            sais_rest -= usoldiers_rest;
                            currentDA += (usoldiers_rest * 30 * 4);
 
                            // Show warning about the unheld weapons???
                        }
                    }
 
                    currentDA = Math.round((currentDA * fort_mult * (bonus_defense + racebonus_defense)));
                    return currentDA;
                }
             
               
             
 
                // Other variables for the calculations
                var strike_weapons = new Array('daggers', 'mauls', 'blades', 'excaliburs');
                var defense_weapons = new Array('sais', 'shields', 'mithrils', 'dragonskins')
                var strike_price = new Array(1000, 15000, 200000, 1000000);
                var defense_price = new Array(1000, 15000, 200000, 1000000);
              var strike_sov = new Array(800,12000,160000,800000);
              var defense_sov = new Array(800,12000,160000,800000);
                var strInt = 0.2;
                var defInt = 0.2;
             
              var sell_str_weapons = Math.ceil((price_next_siege-current_gold)/strike_sov[GM_getValue('strike_weapon',0)]);
              var sell_def_weapons = Math.ceil((price_next_fort-current_gold)/defense_sov[GM_getValue('defense_weapon',0)]);
                var buy_str_weapons = Math.floor(price_next_siege/strike_price[GM_getValue('strike_weapon',0)]);
              var buy_def_weapons = Math.floor(price_next_fort/defense_price[GM_getValue('defense_weapon',0)]);
             
              var SAupgrade = 0;
              var SAweapons = 0;
              var DAupgrade = 0;
              var DAweapons = 0;
             
                var message_str = '';
              var message_def = '';
           
             var currentStr = calc_SA(daggers, mauls, blades, excals, siege_mult, bonus_strike, racebonus_strike);
             var currentDef = calc_DA(sais, shields, mithrils, dragonskins, fort_mult, bonus_defense, racebonus_defense);
             
             
             
             
              // Check if siege is worth to upgrade
              if(GM_getValue('strike_weapon','0') == 0)
              {
                 SAupgrade = calc_SA(daggers, mauls, blades, excals, siege_mult+strInt, bonus_strike, racebonus_strike);
                 SAweapons = calc_SA(daggers+buy_str_weapons, mauls, blades, excals, siege_mult, bonus_strike, racebonus_strike);
                 if (SAupgrade > SAweapons) message_str = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
                 else message_str = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (SAweapons == currentStr) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
              }
              if(GM_getValue('strike_weapon','0') == 1)
              {
                 SAupgrade = calc_SA(daggers, mauls, blades, excals, siege_mult+strInt, bonus_strike, racebonus_strike);
                 SAweapons = calc_SA(daggers, mauls+buy_str_weapons, blades, excals, siege_mult, bonus_strike, racebonus_strike);
                 if (SAupgrade > SAweapons) message_str = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
                 else message_str = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (SAweapons == currentStr) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
              }
              if(GM_getValue('strike_weapon','0') == 2)
              {
                 SAupgrade = calc_SA(daggers, mauls, blades, excals, siege_mult+strInt, bonus_strike, racebonus_strike);
                 SAweapons = calc_SA(daggers, mauls, blades+buy_str_weapons, excals, siege_mult, bonus_strike, racebonus_strike);
                 if (SAupgrade > SAweapons) message_str = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
                 else message_str = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (SAweapons == currentStr) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
              }
              if(GM_getValue('strike_weapon','0') == 3)
              {
                 SAupgrade = calc_SA(daggers, mauls, blades, excals, siege_mult+strInt, bonus_strike, racebonus_strike);
                 SAweapons = calc_SA(daggers, mauls, blades, excals+buy_str_weapons, siege_mult, bonus_strike, racebonus_strike);
                 if (SAupgrade > SAweapons) message_str = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
                 else message_str = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (SAweapons == currentStr) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
              }
             
              if(GM_getValue('defense_weapon','0') == 0)
              {
                 DAupgrade = calc_DA(sais, shields, mithrils, dragonskins, fort_mult+defInt, bonus_defense, racebonus_defense);
                 DAweapons = calc_DA(sais+buy_def_weapons, shields, mithrils, dragonskins, fort_mult, bonus_defense, racebonus_defense);
                 if (DAupgrade > DAweapons) message_def = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
              else message_def = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (DAweapons == currentDef) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
                 
              }
              if(GM_getValue('defense_weapon','0') == 1)
              {
                 DAupgrade = calc_DA(sais, shields, mithrils, dragonskins, fort_mult+defInt, bonus_defense, racebonus_defense);
                 DAweapons = calc_DA(sais, shields+buy_def_weapons, mithrils, dragonskins, fort_mult, bonus_defense, racebonus_defense);
                 if (DAupgrade > DAweapons) message_def = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
              else message_def = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (DAweapons == currentDef) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
                 
              }
              if(GM_getValue('defense_weapon','0') == 2)
              {
                 DAupgrade = calc_DA(sais, shields, mithrils, dragonskins, fort_mult+defInt, bonus_defense, racebonus_defense);
                 DAweapons = calc_DA(sais, shields, mithrils+buy_def_weapons, dragonskins, fort_mult, bonus_defense, racebonus_defense);
                 if (DAupgrade > DAweapons) message_def = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
              else message_def = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (DAweapons == currentDef) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
                 
              }
              if(GM_getValue('defense_weapon','0') == 3)
              {
                 DAupgrade = calc_DA(sais, shields, mithrils, dragonskins, fort_mult+defInt, bonus_defense, racebonus_defense);
                 DAweapons = calc_DA(sais, shields, mithrils, dragonskins+buy_def_weapons, fort_mult, bonus_defense, racebonus_defense);
                 if (DAupgrade > DAweapons) message_def = '<span style="color: #00BB00; font-weight: bold;">Upgrade-time!</span>';
              else message_def = '<span style="color: #BB0000;">You need to buy more weapons before upgrading...</span>';
              if (DAweapons == currentDef) message_def = '<span style="color: #BB0000;">First train some soldiers to hold weapons!</span>';
                 
              }
             
            //document.forms[0].elements[0].value = dsoldiers;
           
                // Add row for siege technology help
                row_str = document.getElementsByClassName('sep f')[1].innerHTML;
                extra = '<tr><th class="subh" colspan="3">Upgrade calculation</th></tr>';
                extra += '<tr><td><select id="select_strike_weapon"><option value"0">Daggers</option><option value"1">Mauls</option>';
                extra += '<option value"2">Blades</option><option value"3">Excaliburs</option></select>';
                extra += '</td><td style="text-align:right;" colspan="2">' + message_str + '</td></tr>';
                extra += '</tbody>';
                document.getElementsByClassName('sep f')[1].innerHTML = row_str.replace('</tbody>', extra);
 
                // Add row for fortification help
                row_def = document.getElementsByClassName('sep f')[2].innerHTML;
                extra = '<tr><th class="subh" colspan="3">Upgrade calculation</th></tr>';
                extra += '<tr><td><select id="select_defense_weapon"><option value"0">Sais</option><option value"1">Shields</option>';
                extra += '<option value"2">Mithrils</option><option value"3">Dragonskins</option></select>';
                extra += '</td><td style="text-align:right;" colspan="2">' + message_def + '</td></tr>';
                extra += '</tbody>';
                document.getElementsByClassName('sep f')[2].innerHTML = row_def.replace('</tbody>', extra);
 
              // Functions to put chosen weapon in GMvalue and reload page
                function calc_siege()
              {
                    var index = document.getElementById('select_strike_weapon').selectedIndex;
                    GM_setValue("strike_weapon", index);
                    window.location.reload();
                }
 
                function calc_fort()
              {
                    var index = document.getElementById('select_defense_weapon').selectedIndex;
                    GM_setValue("defense_weapon", index);
                    window.location.reload();
                }
 
              // Add eventlisteners and put comboboxes on chosen weapon
                document.getElementById('select_strike_weapon').addEventListener('change', calc_siege, true);
                document.getElementById('select_strike_weapon').selectedIndex = GM_getValue("strike_weapon");
                document.getElementById('select_defense_weapon').addEventListener('change', calc_fort, true);
                document.getElementById('select_defense_weapon').selectedIndex = GM_getValue("defense_weapon");
            }
 
 
        // Add the AAT values on the armory page
        //--------------------------------------
 
            var strHTML = document.body.innerHTML;
            var alltables = document.getElementsByTagName('table');
            var me = alltables[1].rows[0].cells[0].getElementsByTagName("a")[0].innerHTML;
 
            if (GM_getValue("ShowAAT", "Yes") == "Yes")
           {
                for (a = 0; a < 4; a++) {
                    document.getElementsByTagName('h2')[a].innerHTML += '<span style="font-size:10px;"> (AAT: 25 spies / 1 spy)</span>';
                }
            }
 
            var SOV = parseInt(document.getElementsByClassName('subh c')[0].innerHTML.replace("Total sell value: ", "").replace(/,/g, ""));
 
           // Variables for the old formula
            //var aatSaSp = 0.0017857199778481665246452158005;
            //var aatDaSe = 0.00107140369266678321343730073563;
 
           var aatSa = 0.0017859015236018
           var aatDa = 0.001428640229215
           var aatSp = 0.001428640229215
           var aatSe = 0.0010722289351341
           
            var Sa = aatSa * SOV;
            var Da = aatDa * SOV;
            var Sp = aatSp * SOV;
            var Se = aatSe * SOV;
 
                //SA
            var aatw1 = Math.ceil(Sa / 1000);
            var aatw1b = Math.ceil(aatw1 / 2);
            var aatw2 = Math.ceil(Sa / 15000);
            var aatw2b = Math.ceil(aatw2 / 2);
            var aatw3 = Math.ceil(Sa / 200000);
            var aatw3b = Math.ceil(aatw3 / 2);
            var aatw4 = Math.ceil(Sa / 1000000);
            var aatw4b = Math.ceil(aatw4 / 2);
       
        //DA
                var aatw5 = Math.ceil(Da / 1000);
            var aatw5b = Math.ceil(aatw5 / 2);
            var aatw6 = Math.ceil(Da / 15000);
            var aatw6b = Math.ceil(aatw6 / 2);
            var aatw7 = Math.ceil(Da / 200000);
            var aatw7b = Math.ceil(aatw7 / 2);
            var aatw8 = Math.ceil(Da / 1000000);
            var aatw8b = Math.ceil(aatw8 / 2);
           
        //Spy
            var aatt1 = Math.ceil(Sp / 15000);
            var aatt1b = Math.ceil(aatt1 / 2);
            var aatt2 = Math.ceil(Sp / 30000);
            var aatt2b = Math.ceil(aatt2 / 2);
            var aatt3 = Math.ceil(Sp / 90000);
            var aatt3b = Math.ceil(aatt3 / 2);
           
        //Sentry
            var aatt4 = Math.ceil(Se / 15000);
            var aatt4b = Math.ceil(aatt4 / 2);
            var aatt5 = Math.ceil(Se / 30000);
            var aatt5b = Math.ceil(aatt5 / 2);
            var aatt6 = Math.ceil(Se / 90000);
            var aatt6b = Math.ceil(aatt6 / 2);        
   
 
 
            var allLi = document.getElementsByTagName('li');
            for (i = 1; i < 18; i++)
           {
              var weapon = allLi[i].getElementsByTagName('span');
                if (i == 1) {
                    var daggers = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw1) + ' / ' + addCommas(aatw1b) + ' ';
                    }
                }
                if (i == 2) {
                    var mauls = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw2) + ' / ' + addCommas(aatw2b) + ' ';
                    }
                }
                if (i == 3) {
                    var blades = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw3) + ' / ' + addCommas(aatw3b) + ' ';
                    }
                }
                if (i == 4) {
                    var excals = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw4) + ' / ' + addCommas(aatw4b) + ' ';
                    }
                }
                if (i == 6) {
                    var sais = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw5) + ' / ' + addCommas(aatw5b) + ' ';
                    }
                }
                if (i == 7) {
                    var shields = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw6) + ' / ' + addCommas(aatw6b) + ' ';
                    }
                }
                if (i == 8) {
                    var mithrils = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw7) + ' / ' + addCommas(aatw7b) + ' ';
                    }
                }
                if (i == 9) {
                    var skins = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatw8) + ' / ' + addCommas(aatw8b) + ' ';
                    }
                }
                if (i == 11) {
                    var cloaks = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt1) + ' / ' + addCommas(aatt1b) + '';
                    }
                }
                if (i == 12) {
                    var hooks = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt2) + ' / ' + addCommas(aatt3b) + '';
                    }
                }
                if (i == 13) {
                    var pickaxes = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt3) + ' / ' + addCommas(aatt3b) + ' ';
                    }
                }
                if (i == 15) {
                    var horns = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt4) + ' / ' + addCommas(aatt4b) + ' ';
                    }
                }
                if (i == 16) {
                    var dogs = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt5) + ' / ' + addCommas(aatt5b) + ' ';
                    }
                }
                if (i == 17) {
                    var torches = weapon[0].innerHTML.replace(/,/g, "");
                    if (GM_getValue("ShowAAT", "Yes") == "Yes") {
                        weapon[0].innerHTML = weapon[0].innerHTML + ' <br /><b>AAT:</b> ' + addCommas(aatt6) + ' / ' + addCommas(aatt6b) + ' ';
                    }
                }
            }
           
           
        
           
    }
 
 
//================================================================
// CODE THAT IS EXECUTED ON THE INTELDETAIL PAGE
//================================================================
 
function IntelPage()
{
        // Looks if it's a recon or a sab
    var strHTML = document.body.innerHTML;
    if (InStr(strHTML, '<td>Strike: </td>') == true)
        {
 
        // Put an attacklink and the TFF on the copy-paste part
                //-----------------------------------------------------
               
        var alltables = document.getElementsByTagName('TABLE');
        for (var e = 0; e < alltables.length; e++)
                {
            var correct = alltables[e].rows[0].cells[0].innerHTML;
            if (correct == "Treasury")
                        {
                var number = e + 1;
            }
        }
 
        var link = alltables[number].rows[0].cells[0].innerHTML;
        var details = alltables[number].rows[1].cells[0].innerHTML;
 
        // get tff
        var as = parseInt(removeComma(alltables[6].rows[3].cells[1].innerHTML));
        var am = parseInt(removeComma(alltables[6].rows[4].cells[1].innerHTML));
        var ds = parseInt(removeComma(alltables[6].rows[5].cells[1].innerHTML));
        var dm = parseInt(removeComma(alltables[6].rows[6].cells[1].innerHTML));
        var us = parseInt(removeComma(alltables[6].rows[7].cells[1].innerHTML));
        var um = parseInt(removeComma(alltables[6].rows[8].cells[1].innerHTML));
 
        if ((isNaN(as) == true)||(isNaN(am) == true)||(isNaN(ds) == true)||(isNaN(dm) == true)||(isNaN(us) == true)||(isNaN(um) == true))
                {
            var TFF = "??? TFF";
        }
        else
                {
            var TFF = addCommas(as + am + ds + dm + us + um) + " TFF";
        }
        // end get tff      
 
 
        var new_link = link.replace(/stats/gi, "attack");
        alltables[number].rows[0].cells[0].innerHTML = new_link;
        alltables[number].rows[1].cells[0].innerHTML = details + ", " + TFF;
 
 
        // Send the info from your recon/sab to the 43rd server
                //-------------------------------------------------
 
        if (GM_getValue('SendRecons', 'Yes') == 'Yes')
                {    
            var ReportID = document.URL.split("id=");
            var alltables = document.getElementsByTagName('table');
            var Me = alltables[1].rows[0].cells[0].getElementsByTagName("a")[0].innerHTML;
            var Username = FindText(FindText(strHTML, " into ", " base to"), ">", "<");
 
            if (InStr(strHTML, '<a class="online"') == true)
                        {
                var StatsID = FindText(strHTML, 'into <a class="online" href="stats.php?id=', '">');
            }
            else
                        {
                var StatsID = FindText(strHTML, 'into <a href="stats.php?id=', '">');
            }
 
            var strike = FindText(FindText(strHTML, "Strike: </td>", "/td>"), ">", "<").replace(/,/g, "");
            var defense = FindText(FindText(strHTML, "Defense: </td>", "/td>"), ">", "<").replace(/,/g, "");
            var spy = FindText(FindText(strHTML, "Spy: </td>", "/td>"), ">", "<").replace(/,/g, "");
            var sentry = FindText(FindText(strHTML, "Sentry: </td>", "/td>"), ">", "<").replace(/,/g, "");
 
            var spies = FindText(FindText(strHTML, "<td><b>Spies: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
            var sentries = FindText(FindText(strHTML, "<td><b>Sentries: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
 
            var siege = FindText(FindText(strHTML, "Siege Technology </td>", "/td>"), ">", "<");
            var UP = FindText(FindText(strHTML, "Unit Production </td>", "/td>"), ">", "<").replace(/,/g, "");
            var covert = FindText(FindText(strHTML, "Covert Skill </td>", "/td>"), ">", "<");
            var gold = FindText(FindText(strHTML, "Treasury</th>", "/td>"), '">', "Gold").replace(' ', '').replace(/,/g, "");
 
            var asoldiers = FindText(FindText(strHTML, "<td><b>Attack Soldiers: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
            var amercs = FindText(FindText(strHTML, "<td><b>Attack Mercenaries: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
 
            var dsoldiers = FindText(FindText(strHTML, "<td><b>Defense Soldiers: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
            var dmercs = FindText(FindText(strHTML, "<td><b>Defense Mercenaries: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
 
            var usoldiers = FindText(FindText(strHTML, "<td><b>Untrained Soldiers: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
            var umercs = FindText(FindText(strHTML, "<td><b>Untrained Mercenaries: </b></td>", "/td>"), ">", "<").replace(/,/g, "");
 
            var daggers = "???";
            var mauls = "???";
            var blades = "???";
            var excals = "???";
            var sais = "???";
            var shields = "???";
            var mithrils = "???";
            var skins = "???";
            var cloaks = "???";
            var hooks = "???";
            var pickaxes = "???";
            var horns = "???";
            var dogs = "???";
            var torches = "???";
                       
            var tables = document.getElementsByTagName("table");
            var tablenum = 0;
            var error = 0;
 
            for (i = 0; i < tables.length; i++)
                        {
                if (tables[i].className == "sep")
                                {
                    if (tables[i].border == "0")
                                        {
                        var num = 2;
                        var sov = 0;
 
                        while (tables[i].rows[num])
                                                {
                            if (tables[i].rows[num].cells[2].innerHTML == "???" || tables[i].rows[num].cells[0].innerHTML == "???")
                                                        {
                                // Do nothing.  Don't have amount of weapons!  Claim an error at the end.
                                var error = 1;
                            }
                            else
                                                        {
                                var weaponType = tables[i].rows[num].cells[0].getElementsByTagName("a")[0].innerHTML;
 
                                if (weaponType == "Dagger")
                                                                {
                                    var daggers = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Sai")
                                                                {
                                    var sais = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Maul")
                                                                {
                                    var mauls = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Shield")
                                                                {
                                    var shields = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Blade")
                                                                {
                                    var blades = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Mithril")
                                                                {
                                    var mithrils = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Excalibur")
                                                                {
                                    var excals = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Dragonskin")
                                                                {
                                    var skins = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Cloak")
                                                                {
                                    var cloaks = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Horn")
                                                                {
                                    var horns = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Hook")
                                                                {
                                    var hooks = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Guard Dog")
                                                                {
                                    var dogs = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Pickaxe")
                                                                {
                                    var pickaxes = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                                else if (weaponType == "Torch")
                                                                {
                                    var torches = tables[i].rows[num].cells[2].innerHTML.replace(/,/g, "");
                                }
                            }
                            var num = num + 1;
                        }
                    }
                }
            }
 
            url = "reconlogger.php?me=" + Me + "&rid=" + ReportID[1] + "&id=" + StatsID + "&name=" + Username + "&strike=" + strike +
                        "&defense=" + defense + "&spy=" + spy + "&sentry=" + sentry + "&spies=" + spies + "&sentries=" + sentries + "&siege=" + siege +
                        "&up=" + UP + "&covert=" + covert + "&gold=" + gold + "&daggers=" + daggers + "&mauls=" + mauls + "&blades=" + blades + "&excals=" +
                        excals + "&sais=" + sais + "&shields=" + shields + "&mithrils=" + mithrils + "&skins=" + skins + "&cloaks=" + cloaks + "&hooks=" +
                        hooks + "&picks=" + pickaxes + "&horns=" + horns + "&dogs=" + dogs + "&torches=" + torches + "&error=" + error + "&asoldiers=" +
                        asoldiers + "&amercs=" + amercs + "&dsoldiers=" + dsoldiers + "&dmercs=" + dmercs + "&usoldiers=" + usoldiers + "&umercs=" +
                        umercs + "&sov=???";
                       
            MakeRequest(url);
        }
    }
    else // not a recon but a sab
        {
        if (GM_getValue("SendSabs", "Yes") == "Yes")
                {
            var ReportID = document.URL.split("id=");
            var alltables = document.getElementsByTagName('table');
            var Me = alltables[1].rows[0].cells[0].getElementsByTagName("a")[0].innerHTML;
            var Amount = FindText(strHTML, '</a> to recover:', 'Gold');
            var Weapons = FindText(strHTML, 's command center, and sabotage', '.');
 
            if (InStr(strHTML, '<a class="online"') == true)
                        {
                var StatsID = FindText(strHTML, 'into <a class="online" href="stats.php?id=', '">');
            }
            else
                        {
                var StatsID = FindText(strHTML, 'into <a href="stats.php?id=', '">');
            }
 
            MakeRequest("sablogger.php?user=" + Me + "&url=" + ReportID[1] + "&amount=" + encodeURIComponent(Amount) + "&weps=" +
                        encodeURIComponent(Weapons) + "&enemy=" + StatsID);
        }
    }
}
 
//================================================================
// CODE THAT IS EXECUTED ON THE TRAINING PAGE
//================================================================
 
function Trainpage()
{
        // Send the amount of soldiers to the 43rd server
        //-----------------------------------------------
       
    if (GM_getValue('SendTrain', 'Yes') == 'Yes')
        {
        var strHTML = document.body.innerHTML;
        var alltables = document.getElementsByTagName('table');
 
        for (var e = 0; e < alltables.length; e++) {
            var correct = alltables[e].rows[0].cells[0].innerHTML;
            if (correct == "Troops")
                        {
                var i = e;
            }
        }
 
        var me = alltables[1].rows[0].cells[0].getElementsByTagName("a")[0].innerHTML;
        var asoldiers = alltables[i].rows[1].cells[1].innerHTML.replace(/,/g, "");
        var amercs = alltables[i].rows[2].cells[1].innerHTML.replace(/,/g, "");
        var dsoldiers = alltables[i].rows[3].cells[1].innerHTML.replace(/,/g, "");
        var dmercs = alltables[i].rows[4].cells[1].innerHTML.replace(/,/g, "");
        var usoldiers = alltables[i].rows[5].cells[1].innerHTML.replace(/,/g, "");
        var umercs = alltables[i].rows[6].cells[1].innerHTML.replace(/,/g, "");
        var spies = alltables[i].rows[7].cells[1].innerHTML.replace(/,/g, "");
        var sentries = alltables[i].rows[8].cells[1].innerHTML.replace(/,/g, "");
 
        MakeRequest("trainpage.php?me=" + me + "&asoldiers=" + asoldiers + "&amercs=" + amercs + "&dsoldiers=" + dsoldiers + "&dmercs=" +
                dmercs + "&usoldiers=" + usoldiers + "&umercs=" + umercs + "&spies=" + spies + "&sentries=" + sentries);
    }
       
}
 
//================================================================
// CODE THAT IS EXECUTED ON THE BATTLEFIELD PAGE
//================================================================
 
function Battlefieldpage() {
 
    
        //------------------------------------------
   
    ;
 
    // SMALL SETTINGS
    function ShowSettingsBF_Small(event) {
        var settings = document.getElementById('_bf_settings');
        if (!settings)
                {
            addCSS(
             '#_bf_settings {position:fixed;top:10px;right:10px;background-color:#121212;border:2px solid #000000;padding:5px;text-align:center;}'
                );
                       
            var settings = document.createElement("div");
            settings.id = "_bf_settings";
            document.body.appendChild(settings);
        }
               
        var s = '<div>';
        s += '&nbsp;<input type="button" id="expand" value="Battlefield Settings" /><div style="float:left; width: 15%;"></div>';
               
        settings.innerHTML = s;
        document.getElementById('expand').addEventListener('click', ShowSettingsBF_Big, true);
        settings.style.display = '';
    }
 
    // BIG SETTINGS
    function ShowSettingsBF_Big(event) {
        var settings = document.getElementById("_bf_settings");
        if (!settings)
                {
            addCSS(
             '#_bf_settings {position:fixed;top:10px;right:10px;background-color:#121212;border:2px solid #000000;padding:5px;text-align:center;}'
                );
                       
            var settings = document.createElement('div');
            settings.id = '_bf_settings';
            document.body.appendChild(settings);
        }
               
        var s = '<div>';
        s += '<table border="2">';
        s += '<tr>';
        s += '<th colspan="2">Battlefield Settings</th>';
        s += '</tr>';
 
        var option_yes = '';
        var option_no = '';
        if (GM_getValue('HighlightAlliances', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('HighlightAlliances', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Highlight alliances given below" style="cursor: help;">Highlight Alliances? </td>';
        s += '<td><select><option id="highlight_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
        s += '<tr>';
        s += '<td title="Use EXACT same tag as on the BF" style="cursor: help;">Alliance 1:</td>';
        s += '<td><input type="text" id="alliance1" size="15" name="alliance1" value="' + GM_getValue('Alliance1', '') + '" /></td>';
        s += '</tr>';
 
        s += '<tr>';
        s += '<td title="Use EXACT same tag as on the BF" style="cursor: help;">Alliance 2:</td>';
        s += '<td><input type="text" id="alliance2" size="15" name="alliance2" value="' + GM_getValue('Alliance2', '') + '" /></td>';
        s += '</tr>';
 
        s += '<tr>';
        s += '<td title="Use EXACT same tag as on the BF" style="cursor: help;">Alliance 3:</td>';
        s += '<td><input type="text" id="alliance3" size="15" name="alliance3" value="' + GM_getValue('Alliance3', '') + '" /></td>';
        s += '</tr>';
               
                var option_yes = '';
        var option_no = '';
        if (GM_getValue('ShowBattlefield', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('ShowBattlefield', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Add fast links on the BF" style="cursor: help;">Show Battlefieldhelp? </td>';
        s += '<td><select><option id="Battlefield_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
        var option_yes = '';
        var option_no = '';
        if (GM_getValue('ShowGoldscan', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('ShowGoldscan', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Highlights people above given TFF and Gold" style="cursor: help;">Show Goldscan? </td>';
        s += '<td><select><option id="Goldscan_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
        s += '<tr>';
        s += '<td title="The minimum amount of gold" style="cursor: help;">Minimum Gold: </td>';
        s += '<td><input type="text" id="gold" size="15" name="gold" value="' + addCommas(GM_getValue('wishgold',1000000)) + '" /></td>';
        s += '</tr>';
 
        s += '<tr>';
        s += '<td title="The minimum amount of tff" style="cursor: help;">Minimum TFF: </td>';
        s += '<td><input type="text" id="tff" size="15" name="tff" value="' + addCommas(GM_getValue('wishtff',100000)) + '" /></td>';
        s += '</tr>';
               
                var option_yes = '';
        var option_no = '';
        if (GM_getValue('ShowGold', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('ShowGold', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Shows last seen gold from the database" style="cursor: help;">Show Last Seen Gold?</td>';
        s += '<td><select><option id="ShowGold_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
                var option_yes = '';
        var option_no = '';
        if (GM_getValue('SendGold', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('SendGold', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Send the Gold from battlefield to database" style="cursor: help;">Send Gold?</td>';
        s += '<td><select><option id="SendGold_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
                var option_yes = '';
        var option_no = '';
        if (GM_getValue('ShowDefense', 'Yes') == 'Yes') option_yes = 'selected="selected"';
        if (GM_getValue('ShowDefense', 'Yes') == 'No') option_no = 'selected="selected"';
 
        s += '<tr>';
        s += '<td title="Show last known defense on battlefield" style="cursor: help;">Show Defense? </td>';
        s += '<td><select><option id="ShowDefense_Yes"' + option_yes + 'value="Yes">Yes</option>';
                s += '<option ' + option_no + ' value="No">No</option></select></td>';
        s += '</tr>';
 
        s += "</table>";
        s += "&nbsp;<input type='button' id='expand' value='Save' /><div style='float:left; width: 15%;'></div>";
               
        settings.innerHTML = s;
        document.getElementById('expand').addEventListener('click', Save_SettingsBF, true);
        document.getElementById('expand').addEventListener('click', ShowSettingsBF_Small, true);
        settings.style.display = '';
    }
 
 
    //SAVE SETTINGS BATTLEFIELD
    function Save_SettingsBF(event) {
 
        var allselected = $(':selected');
        var highlightAlliances = allselected[1].innerHTML;
        var battlefieldhelp = allselected[2].innerHTML;
        var goldscan = allselected[3].innerHTML;
        var showgold = allselected[4].innerHTML;
        var sendgold = allselected[5].innerHTML;
        var showdefense = allselected[6].innerHTML;
 
        GM_setValue('HighlightAlliances', highlightAlliances);
        GM_setValue('ShowBattlefield', battlefieldhelp);
        GM_setValue('ShowGoldscan', goldscan);
        GM_setValue('ShowGold', showgold);
        GM_setValue('SendGold', sendgold);
        GM_setValue('ShowDefense', showdefense);
 
        var alliance1 = $('#alliance1');
        var alliance2 = $('#alliance2');
        var alliance3 = $('#alliance3');
        alliance1 = alliance1[0].value;
        alliance2 = alliance2[0].value;
        alliance3 = alliance3[0].value;
 
        var gold = $('#gold');
        var realgold = removeComma(gold[0].value);
        var tff = $('#tff');
        var realtff = removeComma(tff[0].value);
 
        GM_setValue('Alliance1', alliance1);
        GM_setValue('Alliance2', alliance2);
        GM_setValue('Alliance3', alliance3);
        GM_setValue('wishgold', realgold);
        GM_setValue('wishtff', realtff);
 
        window.location.reload();
    }
 
 
    // Highlight the chosen alliances
    //-------------------------------
       
    if (GM_getValue("HighlightAlliances", "Yes") == "Yes")
        {
        var alliances = document.getElementsByClassName('c');
        var alliance1 = GM_getValue('Alliance1', '');
        var alliance2 = GM_getValue('Alliance2', '');
        var alliance3 = GM_getValue('Alliance3', '');
 
        var numAlliances = alliances.length;
        for (var i = 0; i < numAlliances; i++)
                {
            if (alliances[i].nodeName == 'TD')
                        {
                if (alliances[i].firstChild.innerHTML == alliance1)
                                {
                    alliances[i].parentNode.style.backgroundColor = '#2B0000';
                }
                if (alliances[i].firstChild.innerHTML == alliance2)
                                {
                    alliances[i].parentNode.style.backgroundColor = '#2B0000';
                }
                if (alliances[i].firstChild.innerHTML == alliance3)
                                {
                    alliances[i].parentNode.style.backgroundColor = '#2B0000';
                }
            }
        }
    }
 
 
    // Show the quick attack links
    //----------------------------
 
    if (GM_getValue("ShowBattlefield", "Yes") == "Yes")
        {
        var correcttable = document.getElementsByClassName('sep f')[0];
               
        var rows = correcttable.rows;
        for (i = 2; i < rows.length - 1; i++)
                {
            rows[i].cells[3].width = "150px";
            rows[i].cells[4].width = "100px";
 
            var anchor = rows[i].cells[1].firstChild.href;
            if (document.URL.match("ruinsofchaos.com"))
                        {
                var step_two = anchor.substr(37);
            }
            if (document.URL.match("www.ruinsofchaos"))
                        {
                var step_two = anchor.substr(41);
            }
            var ID = parseInt(step_two);
 
            var user_name = rows[i].cells[1].firstChild.innerHTML;
            var buddy_icon_source = rows[i].cells[2].firstChild.src;
            var buddy_icon = "<img src=\"" + buddy_icon_source + "\" alt=\"\" title=\"your enemy: " + user_name;
                        buddy_icon += "\" style=\"vertical-align: middle;\" \/>";
 
            var fast_link = "<a href=\"attack.php?id=" + ID + "\">Attack<\/a> - <a href=\"attack.php?mission_type=probe&amp;id=";
                        fast_link += ID + "\">Probe<\/a> - <a href=\"attack.php?mission_type=spy&amp;id=" + ID + "\">Spy<\/a> - ";
                        fast_link += "<a href=\"attack.php?mission_type=sabotage&amp;id=" + ID + "\">Sabotage<\/a>";
                       
            if (rows[i].cells[2].firstChild.nodeName == ('IMG'))
                        {
                var fast_link = buddy_icon + fast_link;
            }
                       
            rows[i].cells[2].innerHTML = fast_link;
        }
    }
 
   
    // Highlight people with enough gold and good tff
    //-----------------------------------------------
 
    if (GM_getValue("ShowGoldscan", "Yes") == "Yes")
        {
        var correcttable = document.getElementsByClassName('sep f')[0];
        var rows = correcttable.rows;
 
        for (i = 2; i < rows.length - 1; i++)
                {
            var gold_str = rows[i].cells[5].innerHTML;
            var split = gold_str.split(" ", 2);
            var gold_num = parseInt(split[0].replace(/,/g, ""));
 
            var tff_str = rows[i].cells[3].innerHTML;
            var tff_num = parseInt(tff_str.replace(/,/g, ""));
 
            if ((gold_num >= parseInt(GM_getValue("wishgold", ""))) && (parseInt(GM_getValue("wishtff", "")) <= tff_num))
                        {
                rows[i].style.backgroundColor = '#001936';
            }
        }
    }
 
 
    // Show gold & defense from other people from database
    //----------------------------------------------------
 
    var correcttable = document.getElementsByClassName('sep f')[0];
    var rows = correcttable.rows;
               
        // Defense header
    if (GM_getValue("ShowDefense", "Yes") == "Yes")
        {
        header = rows[0].insertCell(4);
        navbartop = rows[1].insertCell(2);
        navbarbot = rows[rows.length - 1].insertCell(2);
        header.className = 'subh ';
                header.style.textAlign = 'right';
        header.style.backgroundColor = '#111111';
        header.style.borderBottom = '1px solid #444444';
                header.style.width = '250px';
 
        header.innerHTML = "Defense";
 
        var res = 2;
    }
 
    for (i = 2; i < rows.length - 1; i++)
        {
        // insert gold where there are ???
        var gold_str = rows[i].cells[5].innerHTML;
        var anchor = rows[i].cells[1].firstChild.href;
        if (document.URL.match("ruinsofchaos.com"))
                {
            var step_two = anchor.substr(37);
        }
        if (document.URL.match("www.ruinsofchaos"))
                {
            var step_two = anchor.substr(41);
        }
        var ID = parseInt(step_two);
 
        if (GM_getValue("ShowGold", "Yes") == "Yes")
                {
            if (gold_str == '???')
                        {
                
            }
        }
 
        if (GM_getValue("SendGold", "Yes") == "Yes")
                {
            if (gold_str != '???')
                        {
                //GOT GOLD
                var split = gold_str.split(" ", 2);
                var gold_num = parseInt(split[0].replace(/,/g, ""));
                if (isNaN(gold_num) == true)
                                {
                    //Image    
                }
                else
                                {
                    sendgold(ID, gold_num);
                }
            }
        }
       
        // insert defense
        if (GM_getValue("ShowDefense", "Yes") == "Yes")
                {
            showdefense(ID, res);
            res++;
        }
    }
       
}
 
 
 
    //================================================================
    // CODE THAT IS EXECUTED ON THE WRITEMAIL PAGE
    //================================================================
 
function Writemailpage()
{
       // Put the settings in the top-right corner
       //-----------------------------------------
       
       ShowSettingsMessage_Small();
 
        // SMALL SETTINGS
        function ShowSettingsMessage_Small(event) {
            var settings = document.getElementById('_message_settings');
            if (!settings)
          {
                addCSS(
                 '#_message_settings {position:fixed;top:10px;right:10px;background-color:#121212;border:2px solid #000000;padding:5px;text-align:center;}'
                 );
             
                var settings = document.createElement("div");
                settings.id = "_message_settings";
                document.body.appendChild(settings);
            }
         
            var s = '<div>';
            s += '&nbsp;<input type="button" id="expand" value="Message Settings" /><div style="float:left; width: 15%;"></div>';
         
            settings.innerHTML = s;
            document.getElementById('expand').addEventListener('click', ShowSettingsMessage_Big, true);
            settings.style.display = '';
        }
 
        // BIG SETTINGS
        function ShowSettingsMessage_Big(event) {
            var settings = document.getElementById("_message_settings");
            if (!settings)
          {
                addCSS(
                 '#_bf_settings {position:fixed;top:10px;right:10px;background-color:#121212;border:2px solid #000000;padding:5px;text-align:center;}'
                 );
             
                var settings = document.createElement('div');
                settings.id = '_message_settings';
                document.body.appendChild(settings);
            }
         
            var s = '<div>';
            s += '<table border="2">';
            s += '<tr>';
            s += '<th colspan="2">Message Settings</th>';
            s += '</tr>';
 
            var option_yes = '';
            var option_no = '';
            if (GM_getValue('Autofillmessage', 'Yes') == 'Yes') option_yes = 'selected="selected"';
            if (GM_getValue('Autofillmessage', 'Yes') == 'No') option_no = 'selected="selected"';
 
            s += '<tr>';
            s += '<td class="r" colspan="2"><span title="Automatically fill in the preset message" style="cursor: help; text-align: left; float: left;">Autofill the message? </span><select><option id="message_Yes"' + option_yes + 'value="Yes">Yes</option>';
          s += '<option ' + option_no + ' value="No">No</option></select></td>';
            s += '</tr>';
 
            s += '<tr>';
            s += '<td title="Type the subject here" style="cursor: help; width:80px;">Subject:</td>';
            s += '<td><input type="text" id="gmsubject" style="width: 400px; border: none;" name="gmsubject" value="' + GM_getValue('msg_subject', '') + '" /></td>';
            s += '</tr>';
         
          s += '<tr>';
            s += '<td title="Type the message here" style="cursor: help;">Message:</td>';
            s += '<td><textarea id="gmmessage" name="gmmessage" style="width: 400px; height: 250px; border: none;">'+ GM_getValue('msg_message', '') + '</textarea></td>';
            s += '</tr>';
         
          s += '<tr>';
          s += '<td>&nbsp;</td>';
          s += '<td><span style="font-size: 0.7em; text-align: left; float: left"><b>VARIABLES:</b><br />$name - Will be replaced by the name of the receiver<br />$me - Will be replaced by your own name</b></span></td>';
          s += '</tr>';
 
            s += "</table>";
            s += "&nbsp;<input type='button' id='expand' value='Save' /><div style='float:left; width: 15%;'></div>";
         
            settings.innerHTML = s;
            document.getElementById('expand').addEventListener('click', Save_SettingsMessage, true);
            document.getElementById('expand').addEventListener('click', ShowSettingsMessage_Small, true);
            settings.style.display = '';
        }
 
//    document.forms[0].elements[0].value = GM_getValue('Autofillmessage', '');
        //SAVE SETTINGS BATTLEFIELD
        function Save_SettingsMessage(event) {
 
            var allselected = $(':selected');
            var autofillmessage = allselected[0].innerHTML;
 
            GM_setValue('Autofillmessage', autofillmessage);
 
            var subject = $('#gmsubject');
            var message = $('#gmmessage');
            subject = subject[0].value;
            message = message[0].value;
 
            GM_setValue('msg_subject', subject);
            GM_setValue('msg_message', message);
         
          document.getElementsByName('subject')[0].value = '';
          document.getElementsByName('message')[0].value = '';
            window.location.reload();
        }
       
       
       // Show the message
       //-----------------
       if(GM_getValue('Autofillmessage') == 'Yes')
       {
          index = findTableIndex('Subject');
          hisname = document.getElementsByTagName('table')[index].rows[0].cells[0].innerHTML;
          hisname = FindText(hisname,'">','</a>');
          index = findTableIndex('Top Players');
          me = document.getElementsByTagName('table')[index].rows[0].cells[0].innerHTML;
          me = FindText(me,'">','</a>');
         
          var subject = GM_getValue('msg_subject','');
          var message = GM_getValue('msg_message','');
         
          subject = subject.replace(/\$name/gi,hisname);
          message = message.replace(/\$name/gi,hisname);
          subject = subject.replace(/\$me/gi,me);
          message = message.replace(/\$me/gi,me);
         
          document.getElementsByName('subject')[0].value = subject;
          document.getElementsByName('message')[0].value = message;
       }
}
 
 
 
//================================================================
// SERVER LOGGING FUNCTIONS !
//================================================================
 
function MakeRequest(url)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ruinsofchaos.com/' + url,
        onload: function (responseDetails) {
            DisplayMessage("Data Collected");
        },
        onerror: function (responseDetails) {
            alert("Request for contact resulted in error code: " + responseDetails.status);
        }
    });
}
 
function newgold(tempURL, i)
{
    tempURL = String(tempURL);
    var number = String(i);
    var correcttable = document.getElementsByClassName('sep f')[0];
    var rows = correcttable.rows;
 
    GM_xmlhttpRequest({
        method: 'GET',
        url: tempURL,
 
        onload: function (responseDetails) {
            var response = "";
            response = responseDetails.responseText;
 
            rows[number].cells[5].innerHTML = response;
            rows[number].cells[5].style.color = "red";
        },
        onerror: function (responseDetails) {
            alert("Request for contact resulted in error code: " + responseDetails.status);
        }
 
    });
}
 
function sendgold(ID, gold_num)
{
    var ID = String(ID);
    var gold_num = String(gold_num);
 
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ruinsofchaos.com/sendgold.php?id=' + ID + '&gold=' + gold_num,
        onload: function (responseDetails) {
        },
        onerror: function (responseDetails) {
            alert("Request for contact resulted in error code: " + responseDetails.status);
        }
    });
 
}
 
function showdefense(ID, res)
{
    var ID = String(ID);
    var num = String(res);
    var correcttable = document.getElementsByClassName('sep f')[0];
    var rows = correcttable.rows;
 
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ruinsofchaos.com/defense.php?id=' + ID,
        onload: function (responseDetails) {
            var response = "";
            response = responseDetails.responseText;
 
            insert = rows[num].insertCell(6);
            insert.className = "r np vm";
            insert.style.color = "green";
            insert.innerHTML = response;
 
        },
        onerror: function (responseDetails) {
            alert("Request for contact resulted in error code: " + responseDetails.status);
        }
    });
}
 
//================================================================
// EXTRA FUNCTIONS
//================================================================
 
// String Funcs.
function InStr(strSearch, strFind)
{
    strSearch = String(strSearch);
    strFind = String(strFind);
    for (ix = 0; ix < strSearch.length; ix++) {
        if (strFind == Mid(strSearch, ix, strFind.length)) {
            return true;
        }
    }
    return false;
}
 
function Mid(str, start, len)
{
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
        iEnd = iLen;
    else
        iEnd = start + len;
    return String(str).substring(start, iEnd);
}
 
function FindText(str, first, second)
{
    var x = str.indexOf(first) + first.length
    var z = str.substring(x);
    var y = z.indexOf(second);
    return z.substring(z, y)
}
 
function addCommas(nStr)
{
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
 
function removeComma(num)
{
    var num = "" + num + "";
    return num.replace(/,/g, "");
}
 
 
function findTableIndex(content)
{
       var index;
       var alltables = document.getElementsByTagName('TABLE');
       for(var i = 0; i < alltables.length; i++)
       {
          strHTML = alltables[i].innerHTML;
          if (InStr(strHTML,content))
          {
             index = i;  
          }
       }
       return index;
}
 
 
//Display Funcs.
function DisplayMessage(message)
{
    var gm_button = document.createElement('div');
    gm_button.setAttribute('name', 'gm-button');
    gm_button.setAttribute('id', 'gm-button');
    gm_button.setAttribute('style', 'position:fixed;bottom:10px;right:10px;background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:center;');
    var gm_paragraph = document.createElement('p');
    gm_paragraph.setAttribute('id', 'GM_Message');
    gm_paragraph.setAttribute('style', 'font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
    gm_paragraph.innerHTML = message;
 
    var gm_span_1 = document.createElement('span');
    gm_span_1.setAttribute('id', 'gm-span-1');
    gm_span_1.setAttribute('style', 'cursor:pointer;');
 
    document.getElementsByTagName('body')[0].appendChild(gm_button);
    gm_button.appendChild(gm_paragraph);
    gm_paragraph.appendChild(gm_span_1);
}
 
function addCSS(css)
{
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

