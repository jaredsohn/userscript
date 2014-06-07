// ==UserScript==
// @name        GrepoToolSupport
// @description Support for the Grepo-Tool (http://sourceforge.net/projects/grepo-tool/)
// @namespace   de.diabhoil
// @include     http://*.grepolis.com/game*
// @version     1.2.2
// @grant       unsafeWindow
// @grant		GM_setClipboard
// ==/UserScript==

/*

Copyright (C) 2013 H. Stürmann

This file is a free utility for the browsergame
Grepolis which is the intellectual property of InnoGames GmbH.

GrepoToolSupport is free Software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation, either version 3 of the
License, or any later version. Alternatively, you may use it under
the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or any later
version.

GrepoToolSupport is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var uw = unsafeWindow || window;
var $ = uw.jQuery;

var GrepoToolSupportGM = {
    DEBUG : false,
    log : function (quelle, text) {
		if (this.DEBUG) {
			console.debug(quelle + " - " + text);
		}
	},
    GT_VERSION : "2.0",
    GT_ICON : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGHUlEQVRYw81Xa0xTZxh%2BzqF3WwUtCLVsKI1TAsrm3UUh27xsmsk0XiFKIsuWMS8bRlw0i7c5IzMzUbM455xTMxdnouCmMuaFqaBiJsxhJ4"
			 + "UiVqC0QC%2B0nHN6zvn2o7ZUbulmjPuS8%2BOc9%2Fve6%2FM%2B73eA%2F%2BtavXp18nN1ID4%2BfkNubm7ks7YT0ZdAFMU32tvbE2w2W8WzdIDuT%2Bh2u1c%2B6wz064DVah2fl5f3TLEg6U%2FIcRwuXbqU%2FcrFjyO9AjvPyX"
			 + "u0ds6NSMkAaCTKDpVEVjFYqjlQOn3HiXCM7Th8Uetoa03flbfwpyccMBgMa1mWfQJwTqczDQCam5sX06zTaGFatQGZjXPBxrnUoJBOgUofU7Imc2tS5sIM3USmL%2BMf7Smae%2BHm%2FYM6DS4AeNIBi8WyhmGYhN4ONjU16dNq6POW%"
			 + "2BF6EBCAgqHI%2FmLv13g97AbzbfUtRabXi0M8Vm6%2FfbcjneB7DNIrwMQAAhBBYD17XREWoGHSwQBsDeDmAEL8HFAAKuNfxKCfn1t7U0LPfF11T7ztZWvbA6sjneAEg%2FxKEgWWpb5g13C4vwW0rUNEEVLYA9k6%2FwsdPp8DicnPV"
			 + "%2B916WWttdab%2BZxCGtGNk9GVn7aKx01bpo%2BNMN81%2FTq5ssGx0q6USRNAAywMeH9qZxnkAupygpaDoEKqhKJhb3PWhuikAUCgU5r4wEFiJiYkltbW1MwLvkz5bln2DMx%2BGIAIuDjIWiFZE1m98M2fCB7Mz7QvWfztboVIlV5ut"
			 + "BaCooB61Qno6aqDqTAREfPHe9GNhO6DRaLBp06b4%2FPx8CwDUNTZIZhbklEWpBj2S0RGnV83IKl8yfa4xsH9i5ueXfdIBaSCBMLtRMM%2Fix63zh0vCJQy3243S0tIMAPsAYITuBR7AhID82rY%2BqIDq2TkB4IIKE4QAIJfLkZKSUhI2x"
			 + "YkCIPAIQj%2FQAUQEBB%2BIwANimCAEAJ1OV7Fz505j7PHFGYhUZITWNaRnIWvlv2lYfvyqt70RIiWDfIgekMj8ERMC0esA67SBggCn0xm%2BA7GxsUfMZjOaPe2pUCpXgKZ69rUoQu7hLwO4OkTOnpfKI%2Bx2gV9ASWTBLdEaicnjcV0jA"
			 + "FwuV0dYJVCpVExWVtaJHrXsZ105c2jn8sxF67pjICY6%2BlrZuaPZ5eeOZqenp9vDyoBSqTyVm5trBwAwPODhAIoCaApQSPxIIlSvmHuqcRxY48aNCw4P1LTBz4jNQHUr4BODxsNITO9MqNfrT7Esq%2B02Dce6XK7UmJgYx7Zt284XFxf"
			 + "7Bax4GgJfDwBDI7Vaq0gK%2FAB7ivuAyWRaFwTJ%2FnlnbXFQGzbfv%2BGqcqUaUkZd2c4XpwM4DwD4uuoOgDsA8MmdLQlra44UhGWJhFkCeSciwItpMqVcQdM01Jmp7lvO2oKTD39Xd9%2F7B%2F8wFRK6%2F%2BgJ6SIkioLZ6qrvdxi9K"
			 + "A46Y2lvmg0AcXFxJqPOa2hmHMn51cd%2Bzas8tOWtuPHG31qq9EXWiuwTj66u8CsnfhwQfysGET9YgwiKghhCgQM0A9X9OvDh%2BAUnasq%2B%2BhIigWHqmBvlnCMTBKjzWifvNhed211X6A8nYDQ0UgcD2LouRSP0MQ4pTcCG9AcrkAVvr"
			 + "z9SHz9YOXn%2FhkVZPUqw9LV5jhQ6brdCKuPZJQaeFfiu3iL%2BNAYJPfDdRwCrB0qjm59GJ1oCukYO1zlkNN8RLAOAjk424WGLc299U1tmn224ftLS7eOTXz5W2%2FjgVXg4QBBDuPxxNIQAvAh0cIDZAW0Ny7wzZMLSkk8PPzEvZGLnXcJ6"
			 + "%2FftJl5KOTh9MJpO2VyKa9dpMprqmprz8YB5jb7CBxKgAjQyQ0f4MiARgBcDFgrJ5kUTHmeYkTlm6K3djj5%2BYaDV94GFN3WT5wKGgpXIAFIjgQ5vPi%2Fsmc2y%2FxPXLxWLFd2WFG%2F5qM6%2B0MK16D%2BHAQ4AMEkTRKuiUg42joxIO"
			 + "rZw2f9%2Fr09L6vBHPWbZqj6XFucbt5QBQkEkpDIsexMycmjQlbOY8VXh6VFWDMbbe1ogJI1KQoNUZ586Z0xzu%2BcKzZ%2FW3K%2F82%2BHgfxo0Z5Rj90khjUlIS89z%2Fwv8Bj%2FeoZpa%2BSGIAAAAASUVORK5CYII%3D",
    player_server : "",
    player_language : "",
    player : "",
    UNIT_TYPES : ["militia", "sword", "slinger", "archer", "hoplite", "rider", "chariot", "catapult", "minotaur", "manticore", "zyklop", "harpy", "medusa", "centaur", "pegasus", "cerberus", "fury", "griffin", "calydonian_boar", "godsent", "big_transporter", "bireme", "attack_ship", "demolition_ship", "small_transporter", "trireme", "colonize_ship", "sea_monster"],
    BUILDING_TYPES: ["academy", "barracks", "docks", "farm", "hide", "ironer", "library",
        "lighthouse", "lumber", "main", "market", "oracle", "place", "statue", "stoner", "storage", "temple", "theatre", "thermal", "tower", "trade_office", "wall"
    ],
    BUFFS: ["captain", "commander", "high_priest", "luck",
"moral","ram","phalanx","tower","wall","night_bonus","strength_of_heros","fair_wind", "desire", "trojan_defense","myrmidion_attack","longterm_attack_boost","longterm_defense_boost","attack_boost","defense_boost"],
    GTS_BUTTON_CSS: "background-image:url(chrome://grepotoolsupport/content/images/gt32.png);" + "background-repeat:no-repeat;background-size:22px;width:22px;height:22px;display:block;",
    GTS_BUTTON_DIV_CSS: "float:right; height: 22px; width: 22px; padding:2px 2px 2px 5px;",
    GTS_BUTTON_DIV_CSS_REPORT: "float:left; height: 22px; width: 22px; padding:2px 2px 2px 10px;",
    GTS_BUTTON_SPION_DIV_CSS: "height: 22px; width: 100%; padding:2px 0px;text-align:right",
    GTS_BUTTON_SPION_LINK_CSS: "margin-right: 5px; display:inline-block;",
    GTS_BUTTON_LINK_CSS: "float:left; display:inline-block;",
    insertafter: function (a, toInsert) {
        return a.parentNode.insertBefore(toInsert, a.nextSibling);
    },
    getattackerunits: function (resultArray) {

        var reportDiv = resultArray.reportDiv;

        var attackerUnitsDiv = reportDiv.getElementsByClassName("report_side_attacker");
        var units = attackerUnitsDiv[0].getElementsByClassName("report_side_attacker_unit");

        GrepoToolSupportGM.log("Parser.getattackerunits", "Anzahl Angreifereinheiten: " + units.length);

        for (var i = 0; i < units.length; i++) {
            var unit_name_a = units[i].getElementsByTagName("div")[0].className;
            unit_name_a = unit_name_a.trim().split(" ");
            var tmp = 1;
            var unit_name = unit_name_a[unit_name_a.length - tmp];
            while (GrepoToolSupportGM.UNIT_TYPES.indexOf(unit_name) == -1 && tmp <= unit_name_a.length)
                unit_name = unit_name_a[unit_name_a.length - tmp++];
            var unit_count = units[i].getElementsByTagName("div")[0].getElementsByTagName("span")[0].textContent;
            var unit_lost = units[i].getElementsByClassName("report_losts");
            if(unit_lost)
                unit_lost = unit_lost[0].textContent.trim().substring(1);
            else
                unit_lost = "0";

            resultArray.attacker_units[i] = {};
            resultArray.attacker_units[i]["unit_name"] = unit_name;
            resultArray.attacker_units[i]["count"] = unit_count;
            resultArray.attacker_units[i]["lost"] = unit_lost;
        }

        return resultArray;
    },
    getdefenderunits: function (resultArray) {

        var reportDiv = resultArray.reportDiv;

        var defenderUnitsDiv = reportDiv.getElementsByClassName("report_side_defender");
        var units = defenderUnitsDiv[0].getElementsByClassName("report_side_defender_unit");

        GrepoToolSupportGM.log("Parser.getdefenderunits", "Anzahl Verteidigereinheiten: " + units.length);

        for (var i = 0; i < units.length; i++) {
            var unit_name_d = units[i].getElementsByTagName("div")[0].className;
            unit_name_d = unit_name_d.trim().split(" ");
            var tmp = 1;
            var unit_name = unit_name_d[unit_name_d.length - tmp];
            while (GrepoToolSupportGM.UNIT_TYPES.indexOf(unit_name) == -1 && tmp <= unit_name_d.length)
                unit_name = unit_name_d[unit_name_d.length - tmp++];
            var unit_count = units[i].getElementsByTagName("div")[0].getElementsByTagName("span")[0].textContent;
            var unit_lost = units[i].getElementsByClassName("report_losts");
            if(unit_lost)
                unit_lost = unit_lost[0].textContent.trim().substring(1);
            else
                unit_lost = "0";

            resultArray.defender_units[i] = {};
            resultArray.defender_units[i]["unit_name"] = unit_name;
            resultArray.defender_units[i]["count"] = unit_count;
            resultArray.defender_units[i]["lost"] = unit_lost;
        }

        return resultArray;
    },
    getBuffWallLuck : function (resultArray) {

        var reportBody = resultArray.reportDiv;
        var list2 = reportBody.getElementsByClassName("report_side_defender");
        if(list2.length > 0) {

            /* ***************** buffs aus dem Verteidigerbereich ***************** */            
            
            var buffDiv = list2[0].getElementsByClassName("power_holder");
            if(buffDiv.length > 0)
            {
                var buffList = buffDiv[0].getElementsByTagName("div");
                for(var j = 0; j < buffList.length; j++)
                {
                
                    resultArray.defender_buffs[j] = {};
                    if(buffList[j].getAttribute("data-power-id"))
		                resultArray.defender_buffs[j].buff = buffList[j].getAttribute("data-power-id");
                    else
                        resultArray.defender_buffs[j].buff = buffList[j].id;
                    
                    var buffValue = false;
                    try {
                        buffValue = JSON.parse(buffList[j].getAttribute("data-power-configuration"));
                    } catch (e)
                    {
                        buffValue = false;
                    }

                    if(buffValue)
                    {
                        if(buffValue.percent)
                            resultArray.defender_buffs[j].buff_value = buffValue.percent + "%";
                        else
                           resultArray.defender_buffs[j].buff_value = true; 
                            
                    }
                    else
                    {
                        resultArray.buffs[j].buff_value = true;
                    }
                    
                    
                }
            } 
            
            /* ***************** Mauer aus dem Verteidigerbereich ***************** */ 

            var wallSpan = list2[0].getElementsByClassName("oldwall");
            if(wallSpan.length > 0)
            {
                var value = wallSpan[0].textContent.trim();
                var wall = value.substring(value.indexOf(":")+1,value.indexOf("(")).trim();
                var oldwall = value.substring(value.indexOf("(")+1,value.indexOf(")")).trim();
                resultArray.wall = wall;
                resultArray.oldwall = oldwall.substring(1);
            }
            else
            {
		        resultArray.wall = "0";
                resultArray.oldwall = "0";
            }
            
            /* ***************** NB aus dem Verteidigerbereich ***************** */ 
            var nbSpan = list2[0].getElementsByClassName("nightbonus");
            if(nbSpan.length > 0)
            {
                var nbText = nbSpan[0].textContent.trim();
                var nb = nbText.substring(nbText.indexOf(":")+1,nbText.indexOf("%")).trim();
                nb = nb.substring(1);
                resultArray.nb = nb;
            }
            else
                resultArray.nb = "0";
        }

        

        var list3 = reportBody.getElementsByClassName("report_side_attacker");
        if(list3.length > 0)
        {

            /* ***************** Moral aus dem Angreiferbereich ***************** */
            var moralSpan = list3[0].getElementsByClassName("morale");
            if(moralSpan.length > 0)
            {
                var morale = moralSpan[0].textContent.trim();
                morale = morale.substring(morale.indexOf(":")+1, morale.indexOf("%")).trim();
                resultArray.morale = morale;
            }
            else
                resultArray.morale = "-1";
            
            /* ***************** Glück aus dem Angreiferbereich ***************** */                
            
            var luckSpan = list3[0].getElementsByClassName("luck");
            if(luckSpan.length > 0)
            {
                var value = luckSpan[0].textContent.trim();
                value = value.substring(value.indexOf(":")+1,value.indexOf("%")).trim();
                resultArray.luck = value;
            
            }
            else
		        resultArray.luck = "0";

            /* ***************** buffs aus dem Angreiferbereich ***************** */

            var buffDiv = list3[0].getElementsByClassName("power_holder");
            if(buffDiv.length > 0)
            {
                var buffList = buffDiv[0].getElementsByTagName("div");
                for(var j = 0; j < buffList.length; j++)
                {
                
                    resultArray.attacker_buffs[j] = {};
                    if(buffList[j].getAttribute("data-power-id"))
		                resultArray.attacker_buffs[j].buff = buffList[j].getAttribute("data-power-id");
                    else
                        resultArray.attacker_buffs[j].buff = buffList[j].id;
                    
                    var buffValue = false;
                    try {
                        buffValue = JSON.parse(buffList[j].getAttribute("data-power-configuration"));
                    } catch (e)
                    {
                        buffValue = false;
                    }

                    if(buffValue)
                    {
                        if(buffValue.percent)
                            resultArray.attacker_buffs[j].buff_value = buffValue.percent + "%";
                        else
                           resultArray.attacker_buffs[j].buff_value = true; 
                            
                    }
                    else
                    {
                        resultArray.attacker_buffs[j].buff_value = true;
                    }
                    
                    
                }
            }  

        }

        return resultArray; 
    },
    getPubBuffWallLuck : function (resultArray) {

       /* ***************** buffs aus dem Verteidigerbereich ***************** */
        var reportBody = resultArray.reportDiv;
        var list2 = reportBody.getElementsByClassName("report_side_defender");
        if(list2.length > 0) {

            
                var buffList = list2[0].getElementsByClassName("report_power");
                for(var j = 0; j < buffList.length; j++)
                {
                
                    resultArray.defender_buffs[j] = {};
                    if(buffList[j].getAttribute("data-power-id"))
		                resultArray.defender_buffs[j].buff = buffList[j].getAttribute("data-power-id");
                    else
                        resultArray.defender_buffs[j].buff = buffList[j].id;
                    
                    var buffValue = false;
                    try {
                        buffValue = JSON.parse(buffList[j].getAttribute("data-power-configuration"));
                    } catch (e)
                    {
                        buffValue = false;
                    }

                    if(buffValue)
                    {
                        if(buffValue.percent)
                            resultArray.defender_buffs[j].buff_value = buffValue.percent + "%";
                        else
                           resultArray.defender_buffs[j].buff_value = true; 
                            
                    }
                    else
                    {
                        resultArray.defender_buffs[j].buff_value = true;
                    }
                    
                    
                }
            

        }

        /* ***************** Mauer, Moral, NB und Glück aus dem Mittelbereich ***************** */
        var list1 = reportBody.getElementsByClassName("report_details");
        if(list1.length > 0)
        {
            var inner_table_spans = list1[0].getElementsByTagName("span");
            if(inner_table_spans.length > 0)
            {
                var morale = inner_table_spans[0].nextSibling.textContent.trim();
                morale = morale.substring(morale.indexOf(":")+1, morale.indexOf("%")).trim();
                var luck = inner_table_spans[1].nextSibling.textContent.trim();
                luck = luck.substring(luck.indexOf(":")+1,luck.indexOf("%")).trim();
                
                var wall = "0", wall_loss = "-0",nb = "0";
                if(inner_table_spans.length >= 3) //NB oder Wall oder beides
                {
                    if(inner_table_spans[2].className.indexOf("oldwall") != -1) //3. span == mauer
                    {
                        var walltext = inner_table_spans[2].nextSibling.textContent.trim();
                        wall = walltext.substring(walltext.indexOf(":")+1,walltext.indexOf("(")).trim();
                        wall_loss = walltext.substring(walltext.indexOf("(")+1,walltext.indexOf(")")).trim();
                    } else if(inner_table_spans[2].className.indexof("nightbonus") != -1) //3. span == nb => Mauer = 0
                    {
                        var nbtext = inner_table_spans[2].nextSibling.textContent.trim();
                        nb = nbtext.substring(nbtext.indexOf(":")+1,nbtext.indexOf("%")).trim();
                        nb = nb.substring(1); //ohne '+'
                    }

                    if(inner_table_spans.length == 4)
                    {
                        if(inner_table_spans[3].className.indexOf("nightbonus") != -1)
                        {
                            var nbtext = inner_table_spans[3].nextSibling.textContent.trim();
                            nb = nbtext.substring(nbtext.indexOf(":")+1,nbtext.indexOf("%")).trim();
                            nb = nb.substring(1); //ohne '+'
                        }
                    }
                }



                resultArray.wall = wall;
                resultArray.oldwall = wall_loss.substring(1);
                resultArray.luck = luck;
                resultArray.morale = morale;
                resultArray.nb = nb;
            }
        }

        /* ***************** buffs aus dem Angreiferbereich ***************** */
        var list3 = reportBody.getElementsByClassName("report_side_attacker");
        if(list3.length > 0)
        {
            
           
                var buffList = list3[0].getElementsByClassName("report_power");
                for(var j = 0; j < buffList.length; j++)
                {
                
                    resultArray.attacker_buffs[j] = {};
                    if(buffList[j].getAttribute("data-power-id"))
		                resultArray.attacker_buffs[j].buff = buffList[j].getAttribute("data-power-id");
                    else
                        resultArray.attacker_buffs[j].buff = buffList[j].id;
                    
                    var buffValue = false;
                    try {
                        buffValue = JSON.parse(buffList[j].getAttribute("data-power-configuration"));
                    } catch (e)
                    {
                        buffValue = false;
                    }

                    if(buffValue)
                    {
                        if(buffValue.percent)
                            resultArray.attacker_buffs[j].buff_value = buffValue.percent + "%";
                        else
                           resultArray.attacker_buffs[j].buff_value = true; 
                            
                    }
                    else
                    {
                        resultArray.attacker_buffs[j].buff_value = true;
                    }
                    
                    
                }
            

        }

        return resultArray; 
    },
    getSpionDetails: function (resultArray) {

        var reportDiv = resultArray.reportDiv;

        var einheitenDiv = reportDiv.getElementsByClassName("spy_units");
        if (einheitenDiv.length > 0) {
            var einheiten = einheitenDiv[0].getElementsByClassName("report_unit");

            GrepoToolSupportGM.log("Parser.getSpionDetails", "Anzahl Einheiten: " + einheiten.length);

            for (var i = 0; i < einheiten.length; i++) {
                var einheiten_name = einheiten[i].className;
                einheiten_name = einheiten_name.trim().split(" ");
                var tmp = 1;
                var unit_name = einheiten_name[einheiten_name.length - tmp];
                while (GrepoToolSupportGM.UNIT_TYPES.indexOf(unit_name) == -1 && tmp <= einheiten_name.length)
                    unit_name = einheiten_name[einheiten_name.length - tmp++];
                var unit_count = einheiten[i].getElementsByTagName("span")[0].textContent;

                resultArray.einheiten[i] = {};
                resultArray.einheiten[i]["unit_name"] = unit_name;
                resultArray.einheiten[i]["count"] = unit_count;
            }
        }
        else
        {
            var ls = resultArray.doc.getElementById("left_side");
            if(ls)
            {
                var einheiten = ls.getElementsByClassName("report_unit");
                for (var i = 0; i < einheiten.length; i++) {
                    if(einheiten[i].parentNode.id == "spy_buildings")
                        break;
                    var einheiten_name = einheiten[i].className;
                    einheiten_name = einheiten_name.trim().split(" ");
                    var tmp = 1;
                    var unit_name = einheiten_name[einheiten_name.length - tmp];

                    while (GrepoToolSupportGM.UNIT_TYPES.indexOf(unit_name) == -1 && tmp <= einheiten_name.length)
                        unit_name = einheiten_name[einheiten_name.length - tmp++];
                    var unit_count = einheiten[i].getElementsByTagName("span")[0].textContent;

                    resultArray.einheiten[i] = {};
                    resultArray.einheiten[i]["unit_name"] = unit_name;
                    resultArray.einheiten[i]["count"] = unit_count;
                }
            }
        }

        var gebaeudeDiv = reportDiv.getElementsByClassName("spy_buildings");
        if (gebaeudeDiv.length > 0) {
            var gebaeude = gebaeudeDiv[0].getElementsByClassName("report_unit");
        } else {
            if (resultArray.doc) {
                gebaeudeDiv = resultArray.doc.getElementById("spy_buildings");
                var gebaeude = gebaeudeDiv.getElementsByClassName("report_unit");
            } else { //Dann können wir nichts machen..
                return resultArray;
            }
        }

        var payedDiv = reportDiv.getElementsByClassName("spy_payed");
        if(payedDiv.length > 0) {
            var spans = payedDiv[0].getElementsByTagName("span");
            if(spans.length > 0)
            {
                var goldUsed = spans[1].textContent.trim();
                resultArray.goldUsed = goldUsed;
            }
        }
        else
        {
            var payedIron = resultArray.doc.getElementById("payed_iron");
            if(payedIron)
            {
                var num = payedIron.getElementsByClassName("bold");
                if(num.length == 1)
                {
                    resultArray.goldUsed = num[0].textContent.trim();
                }
            }
        }

        GrepoToolSupportGM.log("Parser.getSpionDetails", "Anzahl Gebäude: " + gebaeude.length);

        for (var i = 0; i < gebaeude.length; i++) {
            var gebaeude_name = gebaeude[i].className;
            gebaeude_name = gebaeude_name.trim().split(" ");

            var geb = "";
            if (gebaeude_name.length > 0) {
                geb = gebaeude_name[gebaeude_name.length - 1];
                if (geb.indexOf("building_") == 0) {
                    geb = geb.substring(9);
                    if (GrepoToolSupportGM.BUILDING_TYPES.indexOf(geb) == -1) {
                        geb = "?";
                    }
                } else
                    geb = "";
            }
            var level = gebaeude[i].getElementsByTagName("span")[0].textContent;

            resultArray.gebaeude[i] = {};
            resultArray.gebaeude[i]["building"] = geb;
            resultArray.gebaeude[i]["level"] = level;
        }

        return resultArray;
    },
    getWall: function(resultArray) {

    
        var wallWindow = resultArray.doc.getElementById("building_wall");
	    var list = wallWindow.getElementsByClassName("game_list");
	    if(list.length == 1) {
		    var le = list[0].getElementsByTagName("li");
		    if(le.length != 6) {
			    return resultArray;
		    }

            var UT = GrepoToolSupportGM.UNIT_TYPES;

            /* ***************** killed As Attacker ***************** */

		    var myUnitContainer = le[3].getElementsByClassName("wall_unit_container");
		    if(myUnitContainer.length != 2) {
			    return resultArray;
		    }
		    var myUnits = myUnitContainer[0].getElementsByClassName("wall_report_unit");
		    if(myUnits.length > 0) {
			    for (var i = 0; i < myUnits.length; i++) {
                    var unit_name_a = myUnits[i].className;
                    unit_name_a = unit_name_a.trim().split(" ");
                    var tmp = 1;
                    var unit_name = unit_name_a[unit_name_a.length - tmp];
                    while (UT.indexOf(unit_name) == -1 && tmp <= unit_name_a.length)
                        unit_name = unit_name_a[unit_name_a.length - tmp++];
                    var unit_count = myUnits[i].getElementsByTagName("span")[0].textContent;

			        resultArray.killedAsAttacker[unit_name] = unit_count;
                }
		    }

            
        /* ***************** Lost As Attacker ***************** */
        
		    myUnits = myUnitContainer[1].getElementsByClassName("wall_report_unit");
		    if(myUnits.length > 0) {
			    for (var i = 0; i < myUnits.length; i++) {
                    var unit_name_a = myUnits[i].className;
                    unit_name_a = unit_name_a.trim().split(" ");
                    var tmp = 1;
                    var unit_name = unit_name_a[unit_name_a.length - tmp];
                    while (UT.indexOf(unit_name) == -1 && tmp <= unit_name_a.length)
                        unit_name = unit_name_a[unit_name_a.length - tmp++];
                    var unit_count = myUnits[i].getElementsByTagName("span")[0].textContent;

			        resultArray.lostAsAttacker[unit_name] = unit_count;
                }
		    }

		    

        /* ***************** killed As Defender ***************** */
		    myUnitContainer = le[5].getElementsByClassName("wall_unit_container");
		    if(myUnitContainer.length != 2) {
			    return resultArray;
		    }
		    myUnits = myUnitContainer[0].getElementsByClassName("wall_report_unit");
		    if(myUnits.length > 0) {
			    for (var i = 0; i < myUnits.length; i++) {
                    var unit_name_a = myUnits[i].className;
                    unit_name_a = unit_name_a.trim().split(" ");
                    var tmp = 1;
                    var unit_name = unit_name_a[unit_name_a.length - tmp];
                    while (UT.indexOf(unit_name) == -1 && tmp <= unit_name_a.length)
                        unit_name = unit_name_a[unit_name_a.length - tmp++];
                    var unit_count = myUnits[i].getElementsByTagName("span")[0].textContent;

			        resultArray.killedAsDefender[unit_name] = unit_count;
                }
		    }

		    
        /* ***************** Lost As Defender ***************** */

		    myUnits = myUnitContainer[1].getElementsByClassName("wall_report_unit");
		    if(myUnits.length > 0) {
			    for (var i = 0; i < myUnits.length; i++) {
                    var unit_name_a = myUnits[i].className;
                    unit_name_a = unit_name_a.trim().split(" ");
                    var tmp = 1;
                    var unit_name = unit_name_a[unit_name_a.length - tmp];
                    while (UT.indexOf(unit_name) == -1 && tmp <= unit_name_a.length)
                        unit_name = unit_name_a[unit_name_a.length - tmp++];
                    var unit_count = myUnits[i].getElementsByTagName("span")[0].textContent;

			        resultArray.lostAsDefender[unit_name] = unit_count;
                }
		    }
 
	    }
        return resultArray;
    },
    sizeObj: function (array) {
        return Object.keys(array).length;
    },
    copyWallArrayToClipboard: function (resultArray) {
        GrepoToolSupportGM.log("Parser.copyWallArrayToClipboard", "kopiere Ergebnis in den Zwischenspeicher");

        var resultString = "[GrepoTool=" + GrepoToolSupportGM.GT_VERSION + ";";
        resultString += "server=" + resultArray.server + ";";
        resultString += "language=" + resultArray.language + ";";
        resultString += "source=wall;";
        resultString += "player=" + resultArray.spieler + ";";
        resultString += "killed_as_attacker=(";
        for(var i = 0; i < GrepoToolSupportGM.UNIT_TYPES.length; i++)
        {    
            if(resultArray.killedAsAttacker[GrepoToolSupportGM.UNIT_TYPES[i]])
            {
                resultString += GrepoToolSupportGM.UNIT_TYPES[i] + ":" +
                        resultArray.killedAsAttacker[GrepoToolSupportGM.UNIT_TYPES[i]]+ ";";
            }
        }
        resultString += ");";
        resultString += "killed_as_defender=(";
        for(var i = 0; i < GrepoToolSupportGM.UNIT_TYPES.length; i++)
        {    
            if(resultArray.killedAsDefender[GrepoToolSupportGM.UNIT_TYPES[i]])
            {
                resultString += GrepoToolSupportGM.UNIT_TYPES[i] + ":" +
                        resultArray.killedAsDefender[GrepoToolSupportGM.UNIT_TYPES[i]]+ ";";
            }
        }
        resultString += ");";
        resultString += "lost_as_attacker=(";
        for(var i = 0; i < GrepoToolSupportGM.UNIT_TYPES.length; i++)
        {    
            if(resultArray.lostAsAttacker[GrepoToolSupportGM.UNIT_TYPES[i]])
            {
                resultString += GrepoToolSupportGM.UNIT_TYPES[i] + ":" +
                        resultArray.lostAsAttacker[GrepoToolSupportGM.UNIT_TYPES[i]]+ ";";
            }
        }
        resultString += ");";
        resultString += "lost_as_defender=(";
        for(var i = 0; i < GrepoToolSupportGM.UNIT_TYPES.length; i++)
        {    
            if(resultArray.lostAsDefender[GrepoToolSupportGM.UNIT_TYPES[i]])
            {
                resultString += GrepoToolSupportGM.UNIT_TYPES[i] + ":" +
                        resultArray.lostAsDefender[GrepoToolSupportGM.UNIT_TYPES[i]]+ ";";
            }
        }
        resultString += ")]";

        GrepoToolSupportGM.log("Parser.copyArrayToClipboard", "resultString: " + resultString);

        GM_setClipboard(resultString);
        if(resultArray.language == "de_DE")
        {
            uw.HumanMessage.success("Die Daten wurden kopiert!");
        }
        else
        {
            uw.HumanMessage.success("The Data has been copied!");
        }
    },
    copyArrayToClipboard: function (resultArray) {
        //Grepo-Tool liest es aus dem Zwischenspeicher aus, erkennt das Format und wertet es entsprechend aus
        GrepoToolSupportGM.log("Parser.copyArrayToClipboard", "kopiere Ergebnis in den Zwischenspeicher");

        var resultString = "[GrepoTool=" + GrepoToolSupportGM.GT_VERSION + ";";
        resultString += "server=" + resultArray.server + ";";
        resultString += "language=" + resultArray.language + ";";
        resultString += "date=" + resultArray.attack_date + ";";
        resultString += "source=" + resultArray.source + ";";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.attacker_buffs); i++) {
            resultString += resultArray.attacker_buffs[i].buff + "=" + resultArray.attacker_buffs[i].buff_value + ";";
        }
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.defender_buffs); i++) {
            resultString += resultArray.defender_buffs[i].buff + "=" + resultArray.defender_buffs[i].buff_value + ";";
        }
        resultString += "morale=" + resultArray.morale + ";";
        resultString += "luck=" + resultArray.luck + ";";
        resultString += "wall=" + resultArray.wall + ";";
        resultString += "wall_loss=" + resultArray.oldwall + ";";
        resultString += "nightbonus=" + resultArray.nb + ";";
        resultString += "attacker_name=" + resultArray.attacker_name + ";";
        resultString += "attacker_town=" + resultArray.attacker_town + ";";

        resultString += "attacker_units=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.attacker_units); i++) {
            resultString += resultArray.attacker_units[i]["unit_name"] + ":" + resultArray.attacker_units[i]["count"] + ";";
        }
        resultString += ");";

        resultString += "attacker_losses=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.attacker_units); i++) {
            resultString += resultArray.attacker_units[i]["unit_name"] + ":" + resultArray.attacker_units[i]["lost"] + ";";
        }
        resultString += ");";

        resultString += "defender_name=" + resultArray.defender_name + ";";
        resultString += "defender_town=" + resultArray.defender_town + ";";

        resultString += "defender_units=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.defender_units); i++) {
            resultString += resultArray.defender_units[i]["unit_name"] + ":" + resultArray.defender_units[i]["count"] + ";";
        }
        resultString += ");";

        resultString += "defender_losses=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.defender_units); i++) {
            resultString += resultArray.defender_units[i]["unit_name"] + ":" + resultArray.defender_units[i]["lost"] + ";";
        }
        resultString += ")]";

        GrepoToolSupportGM.log("Parser.copyArrayToClipboard", "resultString: " + resultString);

        GM_setClipboard(resultString);
        if(resultArray.language == "de_DE")
        {
            uw.HumanMessage.success("Die Daten wurden kopiert!");
        }
        else
        {
            uw.HumanMessage.success("The Data has been copied!");
        }
    },
    copySpionArrayToClipboard: function (resultArray) {
        //Grepo-Tool liest es aus dem Zwischenspeicher aus, erkennt das Format und wertet es entsprechend aus
        GrepoToolSupportGM.log("Parser.copySpionArrayToClipboard", "kopiere Ergebnis in den Zwischenspeicher");

        var resultString = "[GrepoTool=" + GrepoToolSupportGM.GT_VERSION + ";";
        resultString += "server=" + resultArray.server + ";";
        resultString += "language=" + resultArray.language + ";";
        resultString += "date=" + resultArray.spion_datum + ";";
        resultString += "source=spy;";
        resultString += "gold_used=" + resultArray.goldUsed + ";";
        resultString += "player=" + resultArray.spieler + ";";
        resultString += "town=" + resultArray.stadt + ";";
        resultString += "units=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.einheiten); i++) {
            resultString += resultArray.einheiten[i]["unit_name"] + ":" + resultArray.einheiten[i]["count"] + ";";
        }
        resultString += ");";
        resultString += "buildings=(";
        for (var i = 0; i < GrepoToolSupportGM.sizeObj(resultArray.gebaeude); i++) {
            resultString += resultArray.gebaeude[i]["building"] + ":" + resultArray.gebaeude[i]["level"] + ";";
        }
        resultString += ")]";

        GrepoToolSupportGM.log("Parser.copySpionArrayToClipboard", "resultString: " + resultString);

        GM_setClipboard(resultString);
        if(resultArray.language == "de_DE")
        {
            uw.HumanMessage.success("Die Daten wurden kopiert!");
        }
        else
        {
            uw.HumanMessage.success("The Data has been copied!");
        }
    },
    processReport: function (report, source, doc) {
        var spion = false;
        if (doc.getElementById("spy_buildings") != null) {
            spion = true;
        } else {
            if (report.getElementsByClassName("fight_report_classic").length == 0)
                return;
            if (report.getElementsByClassName("farm_town_attack_report").length > 0)
                return;
            if (report.getElementsByClassName("island_quests").length > 0)
                return;
            if (report.getElementsByClassName("report_town_bg_quest").length > 0)
                return;
            if (report.getElementsByClassName("report_side_attacker_empty").length > 0)
                return;
            if (doc.getElementById("report_header") == null)
                return;
        }

        if (spion) {
            var copyToClipboard = function (event) {
                var rID = event.target.id;
                var rDiv = doc.getElementById("report_report");
                GrepoToolSupportGM.log("Parser.processReport - copyToClipboard", "ReportID " + rID);
                var date = doc.getElementById("report_date").textContent;
                date = date.trim();

                var spieler = "";
                var stadt = "";

                var receivingTown = doc.getElementById("report_receiving_town");

                try {

                    var stadtDiv = receivingTown.getElementsByClassName("gp_town_link");
                    if(stadtDiv.length > 0)
                    {
                        stadt = stadtDiv[0].href.split("#");
                        stadt = JSON.parse(atob(stadt[stadt.length - 1])).id;
                    }

                    var name = receivingTown.getElementsByClassName("gp_player_link");
                    if (name.length > 0) { //ghosts
                        spieler = receivingTown.getElementsByClassName("gp_player_link")[0].href.split("#");
                        spieler = JSON.parse(atob(spieler[spieler.length - 1])).id;
                    }
                } catch (e) {
                    var stadtDiv = receivingTown.getElementsByClassName("gp_town_link");
                    if(stadtDiv.length > 0)
                        stadt = stadtDiv[0].textContent;

                    var name = receivingTown.getElementsByClassName("gp_player_link");
                    if (name.length > 0)
                        spieler = receivingTown.getElementsByClassName("gp_player_link")[0].textContent;
                }

                var resultArray = {};

                resultArray.einheiten = {};
                resultArray.gebaeude = {};
                resultArray.reportDiv = rDiv;
                resultArray.doc = doc;
                resultArray.stadt = encodeURIComponent(stadt);
                resultArray.spieler = encodeURIComponent(spieler);
                resultArray.server = GrepoToolSupportGM.player_server;
                resultArray.language = GrepoToolSupportGM.player_language;
                resultArray.spion_datum = date;

                resultArray = GrepoToolSupportGM.getSpionDetails(resultArray);
                GrepoToolSupportGM.copySpionArrayToClipboard(resultArray);
            };
        } else {
            var copyToClipboard = function (event) {
                var rID = event.target.id;
                var rDiv = doc.getElementById("report_report");
                GrepoToolSupportGM.log("Parser.processReport - copyToClipboard", "ReportID " + rID);
                var date = doc.getElementById("report_date").textContent;
                date = date.trim();

                var attacker_name = "";
                var attacker_town = "";
                var defender_name = "";
                var defender_town = "";

                var sendingTown = doc.getElementById("report_sending_town");
                var receivingTown = doc.getElementById("report_receiving_town");

                try {

                    // bsp: #eyJpZCI6NTEwNDIsIml4IjoyOTAsIml5Ijo1MDIsInRwIjoidG93biIsIm5hbWUiOiIyNSBGYXN0Zm9vZCJ9
                    var attackTownDiv = sendingTown.getElementsByClassName("gp_town_link");
                    if(attackTownDiv.length > 0)
                    {
                        attacker_town = attackTownDiv[0].href.split("#");
                        attacker_town = JSON.parse(atob(attacker_town[attacker_town.length - 1])).id;
                    }


                    var attName = sendingTown.getElementsByClassName("gp_player_link");
                    if(attName.length > 0) { //player does not exists anymore
                        attacker_name = attName[0].href.split("#");
                        attacker_name = JSON.parse(atob(attacker_name[attacker_name.length - 1])).id;
                    }
                    else {
                        attacker_name_div = "";
                        attacker_name_div = sendingTown.getElementsByClassName("town_owner");
                        if(attacker_name_div.length > 0)
                        {
                            attacker_name = attacker_name_div.textContent.trim();
                        }
                    }

                    var defendTownDiv = receivingTown.getElementsByClassName("gp_town_link");
                    if(defendTownDiv.length > 0)
                    {
                        defender_town = defendTownDiv[0].href.split("#");
                        defender_town = JSON.parse(atob(defender_town[defender_town.length - 1])).id;
                    }

                    var defName = receivingTown.getElementsByClassName("gp_player_link");
                    if (defName.length > 0) { //ghosts
                        defender_name = receivingTown.getElementsByClassName("gp_player_link")[0].href.split("#");
                        defender_name = JSON.parse(atob(defender_name[defender_name.length - 1])).id;
                    }
                } catch (e) {
                    var attackTownDiv = sendingTown.getElementsByClassName("gp_town_link");
                    if(attackTownDiv.length > 0)
                        attacker_town = attackTownDiv[0].textContent;

                    var attName = sendingTown.getElementsByClassName("gp_town_link");
                    if (attName.length > 0)
                        attacker_name = attName[0].textContent;

                    var defendTownDiv = receivingTown.getElementsByClassName("gp_town_link");
                    if(defendTownDiv.length > 0)
                        defender_town = defendTownDiv[0].textContent;

                    var defName = receivingTown.getElementsByClassName("gp_player_link");
                    if (defName.length > 0)
                        defender_name = defName[0].textContent;
                }

                var resultArray = {};

                resultArray.defender_units = {};
                resultArray.attacker_units = {};
                resultArray.reportDiv = rDiv;
                resultArray.attacker_name = encodeURIComponent(attacker_name);
                resultArray.attacker_town = encodeURIComponent(attacker_town);
                resultArray.defender_name = encodeURIComponent(defender_name);
                resultArray.defender_town = encodeURIComponent(defender_town);
                resultArray.server = GrepoToolSupportGM.player_server;
                resultArray.language = GrepoToolSupportGM.player_language;
                resultArray.attack_date = date;
                resultArray.source = source;

                    
                resultArray.defender_buffs = {};
                resultArray.attacker_buffs = {};
                resultArray = GrepoToolSupportGM.getBuffWallLuck(resultArray);
                resultArray = GrepoToolSupportGM.getattackerunits(resultArray);
                resultArray = GrepoToolSupportGM.getdefenderunits(resultArray);
                GrepoToolSupportGM.copyArrayToClipboard(resultArray);
            };
        }

        var lastA = doc.getElementById("report_date");

        var buttonDiv = doc.createElement("div");
        buttonDiv.id = "myGMButton_report";
        buttonDiv.style.cssText = GrepoToolSupportGM.GTS_BUTTON_DIV_CSS_REPORT;

        var button = doc.createElement('a');
        button.style.cssText = GrepoToolSupportGM.GTS_BUTTON_LINK_CSS;
        button.href = "#";
        button.onclick = copyToClipboard;
/*
        var mousemove = function (event) {
            var top = event.clientY + 10;
            var left = event.clientX + 10;
            var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: block; left: " + left + "px; opacity: 100; position: absolute;";
            doc.getElementById("popup_div").style.cssText = styleText;
            doc.getElementById("popup_content").innerHTML = "Exportiere ins Grepo-Tool"; // Element ist vorgesehen für Popups..
        };
        button.onmouseover = mousemove;
        button.onmousemove = mousemove;
        button.onmouseout = function (event) {
            var top = event.clientY + 10;
            var left = event.clientX + 10;
            var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: none; left: " + left + "px; opacity: 0; position: absolute;";
            doc.getElementById("popup_div").style.cssText = styleText;
        }; */

        var button_span = doc.createElement('img');
		button_span.style.cssText = "width:22px;height:22px;display:block;";
		button_span.id = "gtsGM_report";
		button_span.src = this.GT_ICON;
		button.appendChild(button_span);

        buttonDiv.appendChild(button);

        GrepoToolSupportGM.insertafter(lastA, buttonDiv);


    },
    processPubReport: function (reports, source, doc) {
        for (var i = 0; i < reports.length; i++) {

            var spion = false;
            if (reports[i].getElementsByClassName("surv").length == 0 || reports[i].getElementsByClassName("fight_report_classic").length == 0) {

                if (reports[i].getElementsByClassName("espionage_report").length > 0) { //Spion
                    spion = true;
                } else {
                    continue;
                }

            }

            var report = reports[i];
            var reportID = reports[i].id;

            if (spion) {
                //Funktion wenn man den Button drückt!
                var copyToClipboard = function (event) {
                    var rID = event.target.id;
                    var what = rID.substring(0, 5);
                    rID = rID.substring(6);

                    var rDiv = doc.getElementById(rID);

                    GrepoToolSupportGM.log("Parser.processPubReport - copyToClipboard", "ReportID: " + rID);
                    var date = rDiv.getElementsByClassName("reports_date")[0].textContent;
                    date = date.trim();

                    var spieler = "";
                    var stadt = "";

                    var header = rDiv.getElementsByClassName("published_report_header")[0];
                    var spans = header.getElementsByTagName("span");
                    //enthält die spans: span_1 = Stadt und Spieler, span_2 = Datum
                    if (spans.length == 2) {
                        var links = spans[0].getElementsByTagName("a");
                        if (links.length == 3) { // alles ok   
                            try {
                                stadt = links[1].href.split("#");
                                stadt = JSON.parse(atob(stadt[stadt.length - 1])).id;
                                spieler = links[2].href.split("#");
                                spieler = JSON.parse(atob(spieler[spieler.length - 1])).id;
                            } catch (e) {
                                stadt = links[1].textContent;
                                spieler = links[2].textContent;
                            }
                        }
                        else
                        { //Geisterstadt? Spieler existiert nicht mehr? Stadt existiert nicht mehr?
                            //behandele nur den Fall GS.. == 2 Stadtlinks!
                            if(links.length == 2)
                                if(links[0].className == "gp_town_link" && 
                                     links[1].className == "gp_town_link") {
                                    try {
                                        stadt = links[1].href.split("#");
                                        stadt = JSON.parse(atob(stadt[stadt.length - 1])).id;
                                    } catch (e) {
                                        stadt = links[1].textContent;
                                    }
                                }
                            

                        }
                    }

                    var resultArray = {};

                    resultArray.einheiten = {};
                    resultArray.gebaeude = {};
                    resultArray.reportDiv = rDiv;
                    resultArray.spieler = encodeURIComponent(spieler);
                    resultArray.stadt = encodeURIComponent(stadt);
                    resultArray.server = GrepoToolSupportGM.player_server;
                    resultArray.language = GrepoToolSupportGM.player_language;
                    resultArray.spion_datum = date;


                    resultArray = GrepoToolSupportGM.getSpionDetails(resultArray);
                    GrepoToolSupportGM.copySpionArrayToClipboard(resultArray);

                };


                var buttonDiv = doc.createElement("div");
                buttonDiv.id = "myGMButton" + i;
                buttonDiv.style.cssText = GrepoToolSupportGM.GTS_BUTTON_SPION_DIV_CSS;

                var button = doc.createElement('a');
                button.style.cssText = GrepoToolSupportGM.GTS_BUTTON_SPION_LINK_CSS;
                button.href = "#";
                button.onclick = copyToClipboard;
/*
                var mousemove = function (event) {
                    var top = event.clientY + 10;
                    var left = event.clientX + 10;
                    var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: block; left: " + left + "px; opacity: 100; position: absolute;";
                    doc.getElementById("popup_div").style.cssText = styleText;
                    doc.getElementById("popup_content").innerHTML = "Exportiere ins Grepo-Tool"; // Element ist vorgesehen für Popups..
                };
                button.onmouseover = mousemove;
                button.onmousemove = mousemove;
                button.onmouseout = function (event) {
                    var top = event.clientY + 10;
                    var left = event.clientX + 10;
                    var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: none; left: " + left + "px; opacity: 0; position: absolute;";
                    doc.getElementById("popup_div").style.cssText = styleText;
                }; */

                var button_span = doc.createElement('img');
		        button_span.style.cssText = "width:22px;height:22px;display:block;";
		        button_span.id = "gtsGM_" + reportID;
		        button_span.src = this.GT_ICON;
		        button.appendChild(button_span);

                buttonDiv.appendChild(button);
                report.appendChild(buttonDiv);
            } else {

                var copyToClipboard = function (event) {
                    var rID = event.target.id;
                    var what = rID.substring(0, 5);
                    rID = rID.substring(6);

                    var rDiv = doc.getElementById(rID);
                    GrepoToolSupportGM.log("Parser.processPubReport - copyToClipboard", "ReportID: " + rID);
                    var date = rDiv.getElementsByClassName("reports_date")[0].textContent;
                    date = date.trim();

                    var attacker_name = "";
                    var attacker_town = "";
                    var defender_name = "";
                    var defender_town = "";

                    var header = rDiv.getElementsByClassName("published_report_header")[0];
                    var spans = header.getElementsByTagName("span"); //enthält die spans
                    if (spans.length == 2) {
                        var links = spans[0].getElementsByTagName("a");
                        if (links.length == 3) {

                            try {

                                attacker_town = links[0].href.split("#");
                                attacker_town = JSON.parse(atob(attacker_town[attacker_town.length - 1])).id;

                                if (links[1].className == "gp_player_link") { //jemand greift mich an
                                    defender_town = links[2].href.split("#");
                                    defender_town = JSON.parse(atob(defender_town[defender_town.length - 1])).id;
                                    attacker_name = links[1].href.split("#");
                                    attacker_name = JSON.parse(atob(attacker_name[attacker_name.length - 1])).id;
                                } else if (links[1].className == "gp_town_link") { //ich greife jemanden an
                                    defender_town = links[1].href.split("#");
                                    defender_town = JSON.parse(atob(defender_town[defender_town.length - 1])).id;
                                    
                                    defender_name = links[2].href.split("#");
                                    defender_name = JSON.parse(atob(defender_name[defender_name.length - 1])).id;
                                    
                                }

                            } catch (e) {
                                //der erste a ist immer Angreiferstadt!
                                attacker_town = links[0].textContent;

                                //entweder das zweite a ist der Spielername oder wieder eine Stadt!
                                if (links[1].className == "gp_player_link") {
                                    defender_town = links[2].textContent;
                                    attacker_name = links[1].textContent;
                                } else if (links[1].className == "gp_town_link") {
                                    defender_town = links[1].textContent;
                                    defender_name = links[2].textContent;
                                }

                            }

                        } else if(links.length == 2) {
                        //Fall einer GS die ich angreife...sollte es den Fall geben dass eine GS mich angreift dann liefert das hier Müll...
                        GrepoToolSupportGM.log("Parser.processPubReport", "-------GSSSSSSS------");
                        if(links[0].className == "gp_town_link" && links[1].className == "gp_town_link") {
                            try {
                                attacker_town = links[0].href.split("#");
                                attacker_town = JSON.parse(atob(attacker_town[attacker_town.length - 1])).id;
                                defender_town = links[1].href.split("#");
                                defender_town = JSON.parse(atob(defender_town[defender_town.length - 1])).id;
                            } catch (e) {
                                attacker_town = links[0].textContent;
                                defender_town = links[1].textContent;
                            }
                        }
                        } else
                        {
                            GrepoToolSupportGM.log("Parser.processPubReport", "-------GSSSSSSS------");
                        }
                    } 

                    var resultArray = {};

                    resultArray.defender_units = {};
                    resultArray.attacker_units = {};
                    resultArray.reportDiv = rDiv;
                    resultArray.attacker_name = encodeURIComponent(attacker_name);
                    resultArray.attacker_town = encodeURIComponent(attacker_town);
                    resultArray.defender_name = encodeURIComponent(defender_name);
                    resultArray.defender_town = encodeURIComponent(defender_town);
                    resultArray.server = GrepoToolSupportGM.player_server;
                    resultArray.language = GrepoToolSupportGM.player_language;
                    resultArray.attack_date = date;
                    resultArray.source = source;

                    
                    resultArray.defender_buffs = {};
                    resultArray.attacker_buffs = {};
                    resultArray = GrepoToolSupportGM.getPubBuffWallLuck(resultArray);
                    resultArray = GrepoToolSupportGM.getattackerunits(resultArray);
                    resultArray = GrepoToolSupportGM.getdefenderunits(resultArray);
                    GrepoToolSupportGM.copyArrayToClipboard(resultArray);
                };

                var report = reports[i];
                var reportID = reports[i].id;

                GrepoToolSupportGM.log("Parser.processPubReport", "ReportID: " + reportID);
                var lastA = report.getElementsByClassName("surv")[0];

                var buttonDiv = doc.createElement("div");
                buttonDiv.id = "myGTSButton" + i;
                buttonDiv.style.cssText = GrepoToolSupportGM.GTS_BUTTON_DIV_CSS;

                var button = doc.createElement('a');
                button.style.cssText = GrepoToolSupportGM.GTS_BUTTON_LINK_CSS;
                button.href = "#";
                button.onclick = copyToClipboard;
/*
                var mousemove = function (event) {
                    var top = event.clientY + 10;
                    var left = event.clientX + 10;
                    var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: block; left: " + left + "px; opacity: 100; position: absolute;";
                    doc.getElementById("popup_div").style.cssText = styleText;
                    doc.getElementById("popup_content").innerHTML = "Exportiere ins Grepo-Tool"; // Element ist vorgesehen für Popups..
                };
                button.onmouseover = mousemove;
                button.onmousemove = mousemove;
                button.onmouseout = function (event) {
                    var top = event.clientY + 10;
                    var left = event.clientX + 10;
                    var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: none; left: " + left + "px; opacity: 0; position: absolute;";
                    doc.getElementById("popup_div").style.cssText = styleText;
                }; */

                var button_span = doc.createElement('img');
		        button_span.style.cssText = "width:22px;height:22px;display:block;";
		        button_span.id = "gtsGM_" + reportID;
		        button_span.src = this.GT_ICON;
		        button.appendChild(button_span);

                buttonDiv.appendChild(button);
                GrepoToolSupportGM.insertafter(lastA, buttonDiv);

            }

        }
    },
    processWall : function(wall, type, doc) {

/* *********************** Funktionen *********************** */
        var save = function (event) {
            
	        var source = event.target || event.srcElement;
	        var type = source.id;
            GrepoToolSupportGM.log("Parser.processWall - save", source);        

            var resultArray = {};
            resultArray.doc = doc;
            resultArray.lostAsAttacker  = {};
            resultArray.lostAsDefender = {};
            resultArray.killedAsAttacker = {};
            resultArray.killedAsDefender = {};
            resultArray.server = GrepoToolSupportGM.player_server;
            resultArray.language = GrepoToolSupportGM.player_language;
            resultArray.spieler = GrepoToolSupportGM.player;
	        resultArray = GrepoToolSupportGM.getWall(resultArray);
	
            GrepoToolSupportGM.copyWallArrayToClipboard(resultArray);
	        GrepoToolSupportGM.log("Parser.processWall - save", resultArray);
        };

      

/* *********************** SaveButton *********************** */ 

         var buttonDiv = doc.createElement("div");
         buttonDiv.id = "myGTSWallButton";
         buttonDiv.style.cssText = "float: right;";

         var button = doc.createElement('a');
         button.style.cssText = "display: inline-block;";
         button.href = "#";
         button.onclick = save;
/*
         var mousemove = function (event) {
            var top = event.clientY + 10;
            var left = event.clientX + 10;
            var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: block; left: " + left + "px; opacity: 100; position: absolute;";
            doc.getElementById("popup_div").style.cssText = styleText;
            doc.getElementById("popup_content").innerHTML = "Exportiere ins Grepo-Tool"; // Element ist vorgesehen für Popups..
         };
         button.onmouseover = mousemove;
         button.onmousemove = mousemove;
         button.onmouseout = function (event) {
            var top = event.clientY + 10;
            var left = event.clientX + 10;
            var styleText = "z-index: 6001; width: auto; top: " + top + "px; display: none; left: " + left + "px; opacity: 0; position: absolute;";
            doc.getElementById("popup_div").style.cssText = styleText;
         }; */

            var button_span = doc.createElement('img');
		    button_span.style.cssText = "width:22px;height:22px;display:block;";
		    button_span.id = "gtsGM_wall_export";
		    button_span.src = this.GT_ICON;
		    button.appendChild(button_span);

         buttonDiv.appendChild(button);
         wall.getElementsByClassName("game_border")[0].appendChild(buttonDiv);



        var oldCssTextArray = wall.parentNode.parentNode.style.cssText.split(";");
        for(var i = 0; i<oldCssTextArray.length; i++)
        {
            if(oldCssTextArray[i] == "")
                continue;
            var tmpSplit = oldCssTextArray[i].split(":");
            if(tmpSplit.length != 2)
                continue;
            if(tmpSplit[0].trim().length != 6)
                continue;
            if(tmpSplit[0].indexOf("height") == -1)
                continue;
        
            tmpSplit[1] = "580px";
            oldCssTextArray[i] = tmpSplit[0].trim() + ":" + tmpSplit[1];
        }

        var newCssString = "";
        for(var j = 0; j < oldCssTextArray.length;j++)
        {
            newCssString += oldCssTextArray[j];
            newCssString += ";";
        }
   
        wall.parentNode.parentNode.style.cssText = newCssString;

    },
    notesProcess: function (doc) {
        GrepoToolSupportGM.log("Parser.notesProcess", "processing Note");
        var reports = doc.getElementById("memo_preview_text").getElementsByClassName("published_report");
        GrepoToolSupportGM.processPubReport(reports, "note", doc);

        GrepoToolSupportGM.markthediv(doc, doc.getElementById("memo_preview_text"), "note");

    },
    pnProcess: function (doc) {
        GrepoToolSupportGM.log("Parser.pnProcess", "processing PN");
        var reports = doc.getElementById("message_post_container").getElementsByClassName("published_report");
        GrepoToolSupportGM.processPubReport(reports, "pn", doc);

        GrepoToolSupportGM.markthediv(doc, doc.getElementById("message_post_container"), "pn");
    },
    threadProcess: function (doc) {
        GrepoToolSupportGM.log("Parser.threadProcess", "processing Thread");
        var reports = doc.getElementById("postlist");
        if (reports == null)
            return;
        reports = reports.getElementsByClassName("published_report");
        GrepoToolSupportGM.processPubReport(reports, "forum", doc);

        GrepoToolSupportGM.markthediv(doc, doc.getElementById("forum"), "thread");
    },
    reportProcess: function (doc) {
        GrepoToolSupportGM.log("Parser.reportProcess", "processing Report");
        var report = doc.getElementById("report_report");
        GrepoToolSupportGM.processReport(report, "report", doc);

        GrepoToolSupportGM.markthediv(doc, doc.getElementById("report_game_body"), "report");
    },
    wallProcess : function (doc) {
        GrepoToolSupportGM.log("Parser.wallProcess", "processing Wall");
        var wall = doc.getElementById("building_wall");
        GrepoToolSupportGM.processWall(wall, "wall", doc);
        GrepoToolSupportGM.markthediv(doc, doc.getElementById("building_wall"), "wall");
    },
    markthediv: function (doc, div, id) {
        var markDiv = doc.createElement("div");
        markDiv.setAttribute('id', 'gtsGM_' + id);
        div.appendChild(markDiv);
        this.log("markthediv","marked: " + id);
    },
    init : function(event, xhr, settings) {

        var url = settings.url;
        this.log("init",url);

        var urlParts = url.split("?");
    
        this.player_server = uw.Game.world_id;
        this.player_language = uw.Game.locale_lang;
        this.player = uw.Game.player_id;
        
        if(urlParts[0] == "/game/building_wall" && urlParts[1].indexOf("action=index") != -1) {
            if(document.getElementById("building_wall"))  
                if (!document.getElementById("gtsGM_wall"))
                    this.wallProcess(document);
        } else if (urlParts[0] == "/game/message" && urlParts[1].indexOf("action=view") != -1) {
            if(document.getElementById("message_post_container"))  
                if (!document.getElementById("gtsGM_pn"))
                    this.pnProcess(document);
        } else if (urlParts[0] == "/game/alliance_forum" && urlParts[1].indexOf("action=forum") != -1) {
            if(document.getElementById("postlist")) 
                if (!document.getElementById("gtsGM_thread"))
                    this.threadProcess(document);
        } else if (urlParts[0] == "/game/player_memo" && (urlParts[1].indexOf("action=load_memo_content") != -1 || urlParts[1].indexOf("action=save_memo_content") != -1)) {
            if(document.getElementById("memo_text_form"))            
                if (!document.getElementById("gtsGM_note"))
                    this.notesProcess(document);
        } else if (urlParts[0] == "/game/report" && urlParts[1].indexOf("action=view") != -1) {
            if(document.getElementById("report_game_body"))            
                if (!document.getElementById("gtsGM_report"))
                    this.reportProcess(document);
        }

    }
};

$("body").ajaxComplete(function () {});

$(document).ajaxSuccess(function (event, xhr, settings) {
	GrepoToolSupportGM.init(event, xhr, settings);
});