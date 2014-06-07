// ==UserScript==
// @name					Berichthernoemer
// @author				Grote Smurf / De Goede Fee
// @namespace			
// @description			
// @include			http://ae*.tribalwars.ae/game.php?*screen=report*
// @include			http://ae*.tribalwars.ae/game.php?*screen=info_village*&id=*
// ==/UserScript==

// Versie 1.9

function executeScript()
{
    var replaceStringAttackWin = "{att xy} - {def xy} ({def naam}): Populatie: {def popBegin}. {buitBegin}{buitEind}{muurEind}{catapult}";
    var replaceStringAttackFarmAll = "{att xy} - {def xy} ({def naam}): LEEG! {buitBegin}{buitEind}{farm}{att troopsDood}{muurEind}{catapult}";
    var replaceStringAttackFarmSome = "{att xy} - {def xy} ({def naam}): VOL! {buitBegin}{buitEind}{farm}{att troopsDood}{muurEind}{catapult}";
    var replaceStringAttackLose = "{att xy} - {def xy} ({def naam}): Aanval dood: {att troopsBegin}{muurEind}{catapult}";
    var replaceStringAttackLoseScout = "{att xy} - {def xy} ({def naam}): Def over: {def troopsEind}{muurEind}{catapult}";

    var replaceStringEdelWin = "{att xy} - {def xy} ({def naam}): Toestemming van {toestBegin} naar {toestEind}";
    var replaceStringEdelLose = "{att xy} - {def xy} ({def naam}): Defender {def troopsBegin}";
    var replaceStringConquer = "{att xy} - {def xy} ({def naam}) verovert {def dorp}!";

    var replaceStringScoutLose = "{att xy} - {def xy} ({def naam}): Verlies = {att scout} verk";
    var replaceStringScoutTroops = "{att xy} - {def xy} ({def naam}): {def troopsBegin}! {res}{farm}";
    var replaceStringScoutBuildings = "{att xy} - {def xy} ({def naam}): {def troopsBegin}! {res}{farm}{muurEind}{buildings}";
    var replaceStringScoutOutside = "{att xy} - {def xy} ({def naam}): {def troopsBegin}! {res}{farm}{muurEind}, Buiten: {def outside}{buildings}";

    var replaceStringScoutDef = "{att xy} - {def xy} ({att naam}) met {att scout} tegen {def scout} verk";
    var replaceStringDefenseWin = "{att xy} - {def xy} ({att naam}) doodt {att %}%. Populatie: {def popEind}{muurEind}{catapult}";
    var replaceStringDefenseLose = "{att xy} - {def xy} ({att naam}) doodt alle {def popBegin}{muurEind}{catapult}";

    var korteNamen = { spear: 'sp', sword: 'zw', axe: 'bijl', archer: "boog", spy: "ver", light: "lc", marcher: "bb", heavy: "zc", ram: "ram", catapult: "kata", knight: "ridder", snob: "edel", militia: "mil" };
    var unitSizes = { spear: 1, sword: 1, axe: 1, archer: 1, spy: 2, light: 4, marcher: 4, heavy: 6, ram: 5, catapult: 6, knight: 1, snob: 100, militia: 1 };
    var unitIndexes = {};
    var buildingNames = { Kerk: 'KERK', Muur: 'muur', Boerderij: 'boerderij', Verzamelplaats: 'plaats', Houthakkers: 'hout', Leemgroeve: 'leem', IJzermijn: 'ijzer', Opslagplaats: 'opslag', Hoofdplaats: 'hoofd', Adelshoeve: 'AH', Schuilplaats: 'schuil' };
    var unitsSpeed = [['spear', 18], ['sword', 22], ['axe', 18], ['archer', 18], ['spy', 9], ['light', 10], ['marcher', 10], ['heavy', 11], ['ram', 30], ['catapult', 30], ['knight', 10], ['snob', 35]];
    var resBuildingProduction = [30, 35, 41, 47, 55, 64, 74, 86, 100, 117, 136, 158, 184, 214, 249, 289, 337, 391, 455, 530, 616, 717, 833, 969, 1127, 1311, 1525, 1774, 2063, 2400];
    var opslagplaats = [1000, 1229, 1512, 1859, 2285, 2810, 3454, 4247, 5222, 6420, 7893, 9705, 11932, 14670, 18037, 22177, 33523, 33523, 41217, 50675, 62305, 76604, 94184, 115798, 142373, 175047, 215219, 264611, 325337, 400000];
    var schuilplaats = [150, 200, 267, 356, 474, 632, 843, 1125, 1500, 2000];

    // Wereld snelheden zijn niet correct geconfigureerd.
    // Je kan dat doen onder volgende code: "switch (game_data.world)" (op moment van schrijven op lijn 82)
    var worldSpeed = 1;
    var worldBuildSpeed = 1;

    //return;

    var DEBUG = false;
    var settings =
	{
	    excludeWorlds: ['nl'], // Uitschakelen voor bepaalde werelden
	    farmWorlds: ['nlc1', 'nl21', 'nl22'], 		// Get specific farm details
	    fakeMaxPop: 1000, 			  // Meer dan dit is geen farm/fake aanval meer
	    zerowall: { requiredPop: 15000, requiredRam: 100 }, // Geen muur informatie maar toch veel popultatie/rams = ga er van uit dat de muur op 0 staat
	    alternatingRows: true,

	    descSeperator: ", ", 		// elementen in lijsten worden hierdoor gescheiden (gebouwen, troepen, ...)
	    descEqualizer: "=", 		  // in die lijst tussen de naam en het aantal wordt dit geplaatst
	    hout: "hout", 						// Scout: hout
	    leem: "leem", 						// Scout: Leem
	    ijzer: "ijzer",
	    verkenner: "Scout:", 		// Voor oplijsting van de scout lijsten
	    muur: ", Muur: ", 			  // voor het eind muur level
	    dood: ". Dood: ", 			  // Je veeg dood
	    gs: ". GS=", 						// GS gescout
	    lcFarm: "lc",  					  // farmen met lc prefix
	    buit: "Buit: "
	};
    var proStyle =
	{
	    active: true,
	    cleanReport: true,
	    attackAgain: true,
	    selectLastUsedBerichtGroup: true,
	    alertLaatsteGelezen: true // op false zetten voor geen alert bij zetten gemarkeerd bericht
	};

    function q() { alert("yaye"); }

        // Configureer hier je speelwerelden:
        switch (game_data.world)
        {
            case 'nl5':
                worldSpeed = 1;
                worldBuildSpeed = 1;
                break;
            case 'nl6':
                worldSpeed = 1;
                worldBuildSpeed = 1;
                break;
        }

        function isActiveHere(property)
        {
            var found = false;
            $.each(property,
			function (index, val)
			{
			    if (game_data.world == val)
			        found = true;
			});
            return found;
        }
        settings.doFarming = isActiveHere(settings.farmWorlds);

        if (worldSpeed != 1) $.each(unitsSpeed, function (val) { val /= worldSpeed * worldBuildSpeed; });
        if (worldBuildSpeed != 1)
        {
            $.each(resBuildingProduction, function (val) { val *= worldBuildSpeed });
        }

        function img(url, tag)
        {
            if (tag == undefined) tag = "";
            return '<img src="' + url + '" title="' + tag + '" alt="' + tag + '" class="">';
        }

        function setCookie2(name, value, expireMinutes, doNotAddWorld)
        {
            var date_obj = new Date();
            time = date_obj.getTime();
            if (expireMinutes == undefined)
            {
                time += 1 * 60 * 1000 * 24 * 356;
            }
            else
            {
                time += expireMinutes * 1000 * 60;
            }
            date_obj.setTime(time);

            var expires = "expires=" + date_obj.toGMTString() + ";";

            document.cookie = (doNotAddWorld ? "" : game_data.world) + name + "=" + value + ";" + expires;
        }

        function getCookie2(name)
        {
            name = game_data.world + name;
            if (document.cookie.match(/;/))
            {
                var cooks = document.cookie.split("; ");
                for (var x = 0; x < cooks.length; x++)
                {
                    var cookie = cooks[x];
                    if (cookie.match(name + "="))
                        return cookie.replace(name + "=", "");
                }
            }
            else
            {
                if (document.cookie.match(name + "="))
                    return document.cookie.replace(name + "=", "");
            }

            return '';
        }

        function getVillageFromCoords(str, isExactCoord)
        {
            //alert("'" + str + "'");
            if (isExactCoord == undefined || !isExactCoord)
            {
                var doelMatch = str.match(/(.*)\s\((\d+)\|(\d+)\)\s.(\d+)/);
                if (doelMatch != null && doelMatch.length > 1)
                {
                    var village = { "isValid": true, "coord": doelMatch[2] + '|' + doelMatch[3], "x": doelMatch[2], "y": doelMatch[3], "name": doelMatch[1] };
                    //alert(village.name + ":");
                    return village;
                }
            }
            else
            {
                var doelMatch = str.match(/^(\d+)\|(\d+)$/);
                if (doelMatch != null && doelMatch.length > 0)
                {
                    var village = { "isValid": true, "coord": doelMatch[0], "x": doelMatch[1], "y": doelMatch[2], "name": "???" };
                    //alert(village.name + ":");
                    return village;
                }
            }
            return { "isValid": false };
        }

        function formatNumber(nStr)
        {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1))
            {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
            }
            return x1 + x2;
        }

        if (location.href.indexOf('screen=report') > -1 && location.href.indexOf('&view=') > -1)
        {
            function buildReplaceString(newName, defender, attacker, side)
            {
                // resources:
                newName = newName.replace("{res}", settings.doFarming && defender.res != undefined ? settings.verkenner + defender.res.desc : "");
                newName = newName.replace("{farm}", settings.doFarming && attacker.farmInfo != undefined ? attacker.farmInfo : "");

                if (defender.buit != undefined && settings.doFarming)
                {
                    newName = newName.replace("{buitBegin}", settings.buit + formatNumber(defender.buit.begin) + "/");
                    newName = newName.replace("{buitEind}", formatNumber(defender.buit.eind));
                }
                else
                {
                    newName = newName.replace("{buitBegin}", "");
                    newName = newName.replace("{buitEind}", "");
                }

                newName = newName.replace("{def dorp}", defender.village.name);
                newName = newName.replace("{def xy}", defender.village.coord);
                newName = newName.replace("{def naam}", defender.name);

                newName = newName.replace("{att dorp}", attacker.village.name);
                newName = newName.replace("{att xy}", attacker.village.coord);
                newName = newName.replace("{att naam}", attacker.name);

                newName = newName.replace("{toestBegin}", side.toestemmingBegin);
                newName = newName.replace("{toestEind}", side.toestemmingEind);
                newName = newName.replace("{muurBegin}", side.muurBegin == undefined ? "??" : side.muurBegin);
                newName = newName.replace("{muurEind}", side.muurEind == undefined ? "" : settings.muur + side.muurEind);

                //alert(defender.buildingsDesc);
                newName = newName.replace("{buildings}", defender.buildingsDesc != undefined && defender.buildingsDesc.length != 0 ? " (" + defender.buildingsDesc + ")" : "");
                newName = newName.replace("{def outside}", defender.outsideDesc);
                newName = newName.replace("{def troopsBegin}", defender.beginDesc);
                newName = newName.replace("{def troopsEind}", defender.eindDesc);
                newName = newName.replace("{def troopsDood}", defender.doodDesc);
                newName = newName.replace("{def popEind}", formatNumber(defender.totalEind));
                newName = newName.replace("{def popBegin}", formatNumber(defender.totalBegin));

                newName = newName.replace("{att troopsBegin}", attacker.beginDesc);
                newName = newName.replace("{att troopsEind}", attacker.eindDesc);
                newName = newName.replace("{att troopsDood}", attacker.doodDesc.length > 0 ? settings.dood + attacker.doodDesc : "");

                newName = newName.replace("{att %}", defender.perKilled);
                if (newName.indexOf("{catapult}") > -1)
                {
                    if (side.cata == undefined) newName = newName.replace("{catapult}", "");
                    else newName = newName.replace("{catapult}", ", " + side.cata + " van " + side.cataBegin + " naar " + side.cataEind);
                }

                newName = newName.replace("{att scout}", attacker.units.spy.begin);
                newName = newName.replace("{att scoutEind}", attacker.units.spy.eind);
                if (defender.units.spy != undefined)
                    newName = newName.replace("{def scout}", defender.units.spy.begin);
                else
                    newName = newName.replace("{def scout}", "");

                return newName;
            }

            // Herpositionering van elementen voor 2klik
            if (proStyle.active)
            {
                // Vorige knop toevoegen zodat je niet op delete klikt:
                //if (location.href.indexOf('mode=all&view=') > -1)
                var headerCells = $("#content_value table.vis:eq(2) tr:first td");
                if (headerCells.size() == 4)
                {
                    if (headerCells.last().text() == ">>")
                        headerCells.last().before("<td align='center' width='20%'><b>XX</b></td>");
                    else
                        headerCells.last().after("<td align='center' width='20%'><b>XX</b></td>");
                }

                if (proStyle.cleanReport)
                {
                    //$("#content_value table.vis[width='450']").width("100%");

                    var geluk = $("#attack_luck");
                    var isNewPictures = geluk.parent().hasClass("report_transparent_overlay");
                    var moraal = geluk.next();
                    geluk.prev().remove();
                    newMoraalCell = $("<td class=nobg></td>");
                    newMoraalCell.append(moraal);
                    geluk.find("td:last").after(newMoraalCell);

                    var nachtbonus = geluk.next();
                    if (nachtbonus.text() == "Nachtbonus voor de verdediger")
                    {
                        nachtbonus.remove();
                        var uitslag = isNewPictures ? geluk.parent().parent().prev() : geluk.prev();
                        uitslag.text(uitslag.text() + " (nachtbonus)");
                        uitslag.css("background-color", "tomato");
                    }
                }

                if (proStyle.attackAgain)
                {
                    function addLink(menu, link, text)
                    {
                        if (link.size() == 0)
                            return;

                        link.next().remove();
                        var newRow = $("<tr></tr>");
                        var newCell = $("<td></td>");
                        newCell.append(link);
                        link.attr("tag", link.text().substr(2));
                        link.attr("title", link.attr("tag"));
                        link.html("&raquo; " + text);
                        newRow.append(newCell);
                        menu.append(newRow)
                    }

                    var table = $("#attack_luck").parent();
                    if (isNewPictures)
                    {
                        table = table.parent().parent();
                    }
                    var modemenu = $("#content_value table.modemenu");

                    var opnieuwLink = table.find("a[href*='&screen=place&try=confirm&type=same&report_id=']");
                    if (opnieuwLink.size() == 1)
                    {
                        modemenu.append("<tr><td style='background-color: #ebd6ab'>&nbsp;</td></tr><tr><th>Aanvallen</th></tr>");
                        addLink(modemenu, opnieuwLink, "Opnieuw");
                        addLink(modemenu, table.find("a[href*='&screen=place&try=confirm&type=all&report_id=']"), "Alles");
                    }

                    opnieuwLink = table.find("a[href*='&screen=place&mode=sim&report_id=']");
                    if (opnieuwLink.size() == 1)
                    {
                        modemenu.append("<tr><td style='background-color: #ebd6ab'>&nbsp;</td></tr><tr><th>Simulator</th></tr>");
                        addLink(modemenu, opnieuwLink, "Invullen");
                        addLink(modemenu, table.find("a[href*='&screen=place&mode=sim&only_survive=&report_id=']"), "Overlevend");
                    }
                }
            }

            if (isActiveHere(settings.excludeWorlds))
                return;

            var content_value = $("#content_value");
            var atTable = $("#attack_info_att");
            if (atTable == null || atTable.size() == 0)
            {
                // Claim / OS
                //alert($("h4", content_value).text());

                return;
            }

            var newName = "";
            var inputName = $("#editInput");

            // begin berichthernoemer
            function getPlayer(side, table)
            {
                side.name = $("th:eq(1)", table);
                if (side.name.find("a").size() != 0)
                {
                    side.name = side.name.text();
                    side.id = $("th:eq(1)", table).html().match(/id=(\d+)/)[1];
                }
                else
                {
                    side.name = side.name.text();
                    side.id = -1;
                }
                side.village = getVillageFromCoords($("td:eq(1)", table).text());
                side.isYou = side.id == game_data.player.id;
            }

            function getUnits(table, side)
            {
                // defender/attacker
                // .seen, .isYou
                // .totalBegin, .totalEind, .perKilled, .beginDesc, .eindDesc, .totalDood
                // .units.ram/spear : .begin, .dood, .eind

                var unitName;
                $("tr:first td:gt(0)", table).each(function (index, value)
                {
                    var unitName = $("img", this).attr("src");
                    unitName = unitName.substr(unitName.indexOf("_") + 1);
                    unitName = unitName.substr(0, unitName.indexOf("."));
                    side.units[unitName] = {};
                    unitIndexes[index] = unitName;
                    //alert(index + ":" + unitName);
                });

                side.beginDesc = "";
                var total = 0;
                var unitCells = $("tr:eq(1) td:gt(0)", table);
                if (unitCells.size() == 0)
                {
                    side.seen = false;
                    side.totalBegin = 0;
                    side.beginDesc = "GEEN INFO";
                }
                else
                {
                    side.seen = true;
                    unitCells.each(function (index, value)
                    {
                        var begin = $(this).text() * 1;
                        side.units[unitIndexes[index]].begin = begin;
                        if (begin > 0)
                            side.beginDesc += settings.descSeperator + korteNamen[unitIndexes[index]] + settings.descEqualizer + begin;
                        total += begin * unitSizes[unitIndexes[index]];
                    });
                    side.totalBegin = total;
                    if (side.beginDesc.length > 1) side.beginDesc = side.beginDesc.substr(2);
                    else side.beginDesc = "LEEG";
                }

                side.eindDesc = "";
                side.doodDesc = "";
                total = 0;
                $("tr:eq(2) td:gt(0)", table).each(function (index, value)
                {
                    var dood = $(this).text() * 1;
                    side.units[unitIndexes[index]].dood = dood;
                    var eind = side.units[unitIndexes[index]].begin - dood;
                    side.units[unitIndexes[index]].eind = eind;
                    if (eind > 0) side.eindDesc += settings.descSeperator + korteNamen[unitIndexes[index]] + settings.descEqualizer + eind;
                    if (dood > 0) side.doodDesc += settings.descSeperator + korteNamen[unitIndexes[index]] + settings.descEqualizer + dood;
                    total += dood * unitSizes[unitIndexes[index]];
                });
                side.totalDood = total;
                side.totalEind = side.totalBegin - total;
                if (side.eindDesc.length > 1) side.eindDesc = side.eindDesc.substr(2);
                if (side.doodDesc.length > 1) side.doodDesc = side.doodDesc.substr(2);
                side.perKilled = parseInt(side.totalDood / side.totalBegin * 100);

                //alert(side.units[2].unit + ":" + side.units[2].begin + " to " + side.units[2].eind);
            }

            // aanvaller
            var attacker = { units: [] };
            getPlayer(attacker, atTable);

            // verdediger
            var defTable = $("#attack_info_def");
            var defender = { units: [] };
            getPlayer(defender, defTable);

            // units
            getUnits($("#attack_info_att_units"), attacker);

            // Verstuurtijd bepalen
            function getDistance(x1, x2, y1, y2, arrivalTime, slowestUnit)
            {
                var dist = {};
                dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                dist.travelTime = dist.fields * slowestUnit;
                dist.sendAt = new Date();
                dist.sendAt.setTime(arrivalTime - (dist.travelTime * 60 * 1000));

                //alert('arrived: ' + arrivalTime + '\nsent at: ' + dist.sendAt);
                return dist;
            }

            function getDateFromTW(str)
            {
                //13.02.11 17:51:31
                var parts = str.split(" ");
                var dateParts = parts[0].split(".");
                var timeParts = parts[1].split(":");
                var seconds = timeParts[2];
                var millis = 0;
                if (seconds.length > 2)
                {
                    var temp = seconds.split(".");
                    seconds = temp[0];
                    millis = temp[1];
                }
                if (dateParts[2].length == 2)
                {
                    dateParts[2] = (new Date().getFullYear() + '').substr(0, 2) + dateParts[2];
                }

                return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], timeParts[0], timeParts[1], seconds, millis);
            }

            function pad(number, length)
            {
                var str = '' + number;
                while (str.length < length)
                {
                    str = '0' + str;
                }
                return str;
            }

            function twDateFormat(dat, alwaysPrintFullDate)
            {
                var day = dat.getDate();
                var cur = new Date().getDate();

                if (!alwaysPrintFullDate && day == cur)
                    return "vandaag om " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
                else if (!alwaysPrintFullDate && day == cur + 1)
                    return "morgen om " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
                else
                    return pad(dat.getDate(), 2) + "." + pad(dat.getMonth() + 1, 2) + "." + dat.getFullYear().toString().substr(2) + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
            }

            var verzondenCell = inputName.parent().parent().parent().next();
            attacker.verzonden = verzondenCell.find("td:eq(1)").text();
            var arrivalTime = getDateFromTW(attacker.verzonden);
            var slowestUnit = 0;
            $.each(unitsSpeed,
			function (index, val)
			{
			    if (val[1] > slowestUnit && attacker.units[val[0]] != undefined && attacker.units[val[0]].begin > 0)
			        slowestUnit = val[1];
			});
			attacker.looptijd = getDistance(attacker.village.x, defender.village.x, attacker.village.y, defender.village.y, arrivalTime, slowestUnit);
			//verzondenCell.find("td:first").text("Aangekomen");
            verzondenCell.after("<tr><td>Verstuurd</td><td>" + twDateFormat(attacker.looptijd.sendAt, true) + " <b>(F" + parseInt(attacker.looptijd.fields) + ")</b> <a href=# id=sendStats>" + img('graphic/rename.png') + "</a>&nbsp;&nbsp;<a href=# id=deleteStats>" + img("graphic/delete.png") + "</a></td></tr>");

            $("#deleteStats").click(
			function ()
			{
			    if (confirm("Alle statistieken verwijderen?"))
			    {
			        setCookie2("playerStats", "");
			        $("playerStats").val("");
			    }
			});

            $("#sendStats").click(
			function ()
			{
			    if ($("#playerStats").size() != 0)
			    {
			        $("#playerStats").parent().parent().toggle();
			    }
			    else
			        $(this).parent().parent().after("<tr><td colspan=2><textarea id=playerStats cols=51 rows=20 /></td></tr>");

			    $("#playerStats").val(getCookie2("playerStats"));
			});

            // Niks doen als hernoemen al gebeurd is:
            /*if (inputName.val().indexOf("{") == 0)
            {
            $("#labelText").text("DONE");
            if (!DEBUG) return;
            }*/

            //alert(attacker.isYou + "&&" + attacker.id);
            if (!attacker.isYou && attacker.id > 0)
            {
                // Verstuurtijden bijhouden
                var verstuurdString = "";
                var verstuurd = getCookie2("playerStats").split("|");
                var playerFound = false;
                $.each(verstuurd,
				function (index, value)
				{
				    if (verstuurdString.length != 0) verstuurdString += '|';
				    if (value.substr(0, value.indexOf("^")) == attacker.name)
				    {
				        playerFound = true;
				        verstuurdString += value + "," + attacker.looptijd.sendAt.getTime();
				    }
				    else
				        verstuurdString += value;
				});

                if (!playerFound)
                {
                    if (verstuurdString.length != 0) verstuurdString += '|';
                    verstuurdString += attacker.name + "^" + attacker.looptijd.sendAt.getTime();
                }

                //alert(verstuurdString);
                if (!DEBUG)
                    setCookie2("playerStats", verstuurdString);
            }

            getUnits($("#attack_info_def_units"), defender);

            // Extra dingen
            var table = $("#attack_results");
            var side = {};

            // Muur
            var ram = $("th:contains('Schade door rammen:')", table);
            if (ram.size() > 0)
            {
                var match = ram.next().text().match(/level (\d+) naar level (\d+)/);
                side.muurBegin = match[1];
                side.muurEind = match[2];
                //alert("muur" + side.muurBegin + " naar " + side.muurEind);
            }

            // Katapulten
            var cata = $("th:contains('Schade door katapultbeschietingen:')", table);
            if (cata.size() > 0)
            {
                //Verzamelplaats is beschadigd van 
                var match = cata.next().text().match(/(.*) is beschadigd van level (\d+) naar level (\d+)/);
                side.cata = match[1];
                side.cataBegin = match[2];
                side.cataEind = match[3];
                if (side.cata == 'Muur')
                {
                    if (side.muurBegin == undefined) side.muurBegin = side.cataBegin;
                    else side.cata = undefined;
                    side.muurEind = side.cataEind;
                }
                //alert(match[1] + " van " + side.cataBegin + " naar " + side.cataEind);
            }

            // Buit
            if ($("th:contains('Buit:')", table).size() > 0)
            {
                var buit = $("td:eq(1)", table).text().replace(/\./ig, "");
                defender.buit = { begin: buit.substr(0, buit.indexOf("/")) * 1, eind: buit.substr(buit.indexOf("/") + 1) * 1 };
            }

            // edels
            var modemenu = $("#content_value table.modemenu");
            side.toestemmingBegin = "";
            side.toestemmingEind = -1;
            var toestTable = $("th:contains('Toestemming:')", table);
            if (toestTable.size() > 0)
            {
                var toest = toestTable.next().html().match(/\<b\>(\d+)\<.b\> naar \<b\>(-?\d+)\<.b\>/);
                side.toestemmingBegin = toest[1];
                side.toestemmingEind = toest[2] * 1;
                //alert(side.toestemmingBegin + " to " + side.toestemmingEind);

                // Huidige toestemming?
                modemenu.append("<tr><td style='background-color: #ebd6ab'>&nbsp;</td></tr><tr><th>Toestemming</th></tr>");
                if (side.toestemmingEind > 0)
                {
                    var timeElapsed = (new Date() - arrivalTime) / 1000 / 60 / 60;
                    var extraToest = Math.floor(timeElapsed * worldSpeed);
                    var currentEind = side.toestemmingEind + extraToest;
                    if (currentEind * 1 > 100) currentEind = 100;
                    modemenu.append("<tr><td align=center>" + side.toestemmingEind + " + " + extraToest + " = <b>" + currentEind + "</b></td></tr>");
                }
                else
                {
                    var silly;
                    if (attacker.name == game_data.player.name)
                    {
                        var sillies = ["Zo wil ik het zien!", "Bwhoehahaha", "*evil laughter*", "Feest!", "Verovering!", "w00t w00t!", "Sterk bezig!", "Another one bites the dust", "#" + game_data.player.villages + "!", "And another one...", "To the rim with him!"];
                        silly = sillies[Math.floor(Math.random() * sillies.length)];
                    }
                    else
                    {
                        var sillies = ["Oepsie!?", "Dorpverlies :(", "WAT!?", "Laten we de co de schuld geven :)", "Is die ooit *niet* online!?", "Our revenge will be gruesome", "Als dit maar goed afloopt..", "Welke noob!?", "Wat een no-lifer!"];
                        silly = sillies[Math.floor(Math.random() * sillies.length)];
                    }
                    modemenu.append("<tr><td align=center><b>" + silly + "</b></td></tr>");
                }
            }

            // last selected / markeren zetten
            modemenu.append("<tr><td style='background-color: #ebd6ab'>&nbsp;</td></tr><tr><th>Markeren</th></tr>");
            var berichtOpties =
			"<tr><td>"
				+ "<table width='100%' cellpadding=0 cellspacing=0 border=0><tr><td width='1%' style='border-right: 1px solid black'>"
				+ "<span class='icon header new_post' id=extraSelect title='Bericht in de lijst markeren'>"
				+ "</td><td width='99%'>";

            if (attacker.isYou && (defender.totalEind == 0 || attacker.units['spy'].begin * 1.2 * unitSizes.spy > attacker.totalBegin))
                berichtOpties += "<img src='graphic/buildings/farm.png' class=extraMarkering extraCode=':' title='Bericht markeren om met dezelfde troepen opnieuw aan te vallen'>"

            berichtOpties += "&nbsp;<img src='graphic/unit/unit_ram.png' class=extraMarkering extraCode='!' title='Bericht markeren als te vegen'>"
            //berichtOpties	+= "&nbsp;<img src='graphic/unit/unit_snob.png' class=extraMarkering extraCode='$' title='Bericht markeren als te edelen '>"
            berichtOpties += "&nbsp;<img src='graphic/unit/unit_spy.png' class=extraMarkering extraCode='*' title='Bericht markeren als te verkennen '>"
            berichtOpties += "</td></tr></table>" + "</td></tr>";

            modemenu.append(berichtOpties);

            $("#extraSelect").click(
			function ()
			{
			    var match = location.href.match(/&view=(\d+)/);
			    //alert(match[1]);
			    //var berichtDate = attacker.verzonden.substr(0, attacker.verzonden.lastIndexOf(":"));
			    //alert(berichtDate);
			    setCookie2("berichtLaatstGelezen", match[1], 2880);
			    if (!proStyle.alertLaatsteGelezen) alert("Dit bericht wordt nu gemarkeerd in de berichtenlijst!");
			});

            $("img.extraMarkering", modemenu).click(
			function ()
			{
			    var extraCode = $(this).attr("extraCode");
			    var originalName = inputName.val();
			    if (originalName.indexOf("}") > 1)
			    {
			        var newCode = originalName.substr(0, originalName.indexOf("}"));
			        switch (newCode[newCode.length - 1])
			        {
			            case ":":
			            case "!":
			            case "*":
			                newCode = newCode.substr(0, newCode.length - 1);
			                break;
			        }

			        inputName.val(newCode + extraCode + "}" + originalName.substr(originalName.indexOf("}") + 1));
			        inputName.next().click();
			        //alert(inputName.val());
			    }
			});

            // Scouts
            var spyTable = $("#attack_spy");
            if (spyTable.size() != 0)
            {
                var infos = $("tbody:first tr", spyTable);
                var aantalRows = infos.size();
                //alert("rows:" + aantalRows);

                // grondstoffen
                if (aantalRows >= 1)
                {
                    var spyrescell = $(infos[0]).find("td:first");
                    var spyres = spyrescell.text().split(" ");
                    defender.res = { total: 0, holz: 0, lehm: 0, eisen: 0 };
                    $("img", spyrescell).each(
					function (gsIndex, gsImg)
					{
					    var gs = $(gsImg).attr("src").replace("graphic/", "");
					    gs = gs.substr(0, gs.indexOf("."));
					    defender.res[gs] = spyres[gsIndex].toString().replace(".", "").replace(".", "") * 1;
					    defender.res.total += defender.res[gs];
					});
                }

                if (aantalRows >= 2)
                {
                    defender.buildings = {};
                    defender.buildingsDesc = "";
                    //alert($(infos[1]).html());
                    //alert("'"+$(infos[1]).find("td:first").text()+"'");
                    var buildings = $.trim($(infos[1]).find("td:first").text()).split("\n");
                    $.each(buildings,
					function (i, v)
					{
					    var match = $.trim(v).match(/(.*)\s\(Level\s(\d+)\)/);
					    if (match != null && match.length > 1)
					    {
					        if (buildingNames[match[1]] != undefined)
					        {
					            var naam = match[1];
					            var level = match[2];
					            //alert(naam + ': ' + level);
					            defender.buildings[naam] = level;

					            switch (naam)
					            {
					                case "Verzamelplaats":
					                case "Schuilplaats":
					                    break;
					                case "Muur":
					                    if (side.muurBegin == undefined) side.muurBegin = level;
					                    side.muurEind = level;

					                    //defender.buildingsDesc += settings.descSeperator + buildingNames[match[1]] + settings.descEqualizer + level;
					                    break;
					                case "Boerderij":
					                    if (level != 30) defender.buildingsDesc += settings.descSeperator + buildingNames[match[1]] + settings.descEqualizer + level;
					                    break;
					                case "Hoofdgebouw":
					                    if (settings.doFarming && level >= 15) defender.buildingsDesc += settings.descSeperator + buildingNames[match[1]] + settings.descEqualizer + level;
					                    break;
					                case "Kerk":
					                    defender.buildingsDesc += "__________________" + buildingNames[match[1]] + " (LvL) " + level;
					                    break;
					                default:
					                    if (settings.doFarming) defender.buildingsDesc += settings.descSeperator + buildingNames[match[1]] + settings.descEqualizer + level;
					                    break;
					            }

					            if (defender.buildings.Verzamelplaats == undefined)
					                defender.buildingsDesc += settings.descSeperator + 'Geen verzamelplaats';
					        }
					    }
					});
                    if (defender.buildingsDesc.length > 1) defender.buildingsDesc = defender.buildingsDesc.substr(2);

                    if (aantalRows >= 6)
                    {
                        defender.outside = {};
                        defender.outsideDesc = "";
                        var outside = $(infos[3]).find("tr:eq(1) td");
                        outside.each(
						function (i, v)
						{
						    defender.outside[i] = $(v).text() * 1;
						    if (defender.outside[i] > 0)
						        defender.outsideDesc += settings.descSeperator + korteNamen[unitIndexes[i]] + settings.descEqualizer + defender.outside[i];
						});

                        if (defender.outsideDesc.length > 1) defender.outsideDesc = defender.outsideDesc.substr(1);
                    }
                }
            }

            if (side.muurEind == undefined && ((defender.buildings != undefined && defender.buildings.Muur == undefined) || (attacker.totalBegin > settings.zerowall.requiredPop && attacker.units.ram.begin > settings.zerowall.requiredRam)))
            {
                side.muurBegin = 0;
                side.muurEind = 0;
            }

            // farming berekening
            if (settings.doFarming && defender.res != undefined)
            {
                var total = defender.res.total;
                var res = "";
                if (defender.res.holz == defender.res.lehm && defender.res.lehm == defender.res.eisen)
                {
                    res = "3x" + formatNumber(defender.res.holz);
                }
                else
                {
                    if (defender.res.holz != undefined) { res += settings.descSeperator + settings.hout + settings.descEqualizer + formatNumber(defender.res.holz); }
                    if (defender.res.lehm != undefined) { res += settings.descSeperator + settings.leem + settings.descEqualizer + formatNumber(defender.res.lehm); }
                    if (defender.res.eisen != undefined) { res += settings.descSeperator + settings.ijzer + settings.descEqualizer + formatNumber(defender.res.eisen); }
                    if (res.length > 0) res = res.substr(2);
                }

                defender.res.desc = res;

                var extra = "";
                var lc;
                var lcHout = defender.res.holz;
                var lcLeem = defender.res.lehm;
                var lcYser = defender.res.lehm;

                if (defender.buildings != undefined)
                {
                    var timeElapsed = (new Date() - attacker.looptijd.sendAt) / 1000 / 60; // verstreken tijd + looptijd lc
                    timeElapsed += attacker.looptijd.fields * 10 * worldSpeed; // = LC Minuten = 10

                    if (defender.buildings.Houthakkers != undefined) lcHout += timeElapsed * resBuildingProduction[defender.buildings.Houthakkers - 1] / 60;
                    if (defender.buildings.Leemgroeve != undefined) lcLeem += timeElapsed * resBuildingProduction[defender.buildings.Leemgroeve - 1] / 60;
                    if (defender.buildings.IJzermijn != undefined) lcYser += timeElapsed * resBuildingProduction[defender.buildings.IJzermijn - 1] / 60;

                    // check dat we niet over de opslagplaats gaan
                    if (defender.buildings.Opslagplaats != undefined)
                    {
                        var opgeslagen = opslagplaats[defender.buildings.Opslagplaats - 1];
                        var verborgen = 0;
                        if (defender.buildings.Schuilplaats != undefined)
                            verborgen = schuilplaats[defender.buildings.Schuilplaats - 1];

                        if (lcHout > opgeslagen - verborgen) lcHout = opgeslagen - verborgen;
                        if (lcLeem > opgeslagen - verborgen) lcLeem = opgeslagen - verborgen;
                        if (lcYser > opgeslagen - verborgen) lcYser = opgeslagen - verborgen;

                        // lc om overgebleven + gemaakte gs op te halen
                        lc = lcHout + lcLeem + lcYser;

                        // lc voor alles op te halen
                        //alert(parseInt(lc / 80) +"!="+ parseInt((opgeslagen - verborgen) * 3 / 80));
                        if (defender.buit == undefined || parseInt(lc / 80) != parseInt((opgeslagen - verborgen) * 3 / 80))
                        {
                            if ((defender.buit != undefined && defender.buit.begin == defender.buit.eind) || defender.res != undefined) extra += "/";
                            else extra += settings.descSeperator + settings.lcFarm + settings.descEqualizer;
                            attacker.farmAll = parseInt((opgeslagen - verborgen) * 3 / 80) + 1;
                            extra += formatNumber(attacker.farmAll);
                        }
                    }
                }
                else
                {
                    lc = lcHout + lcLeem + lcYser;
                }

                if ((defender.buit != undefined && defender.buit.begin == defender.buit.eind) || defender.res != undefined)
                {
                    attacker.farmGuess = parseInt(lc / 80) + 1;
                    extra = settings.gs + formatNumber(total) + " (" + settings.lcFarm + settings.descEqualizer + formatNumber(attacker.farmGuess) + extra + ")";
                }

                attacker.farmInfo = extra;

                // farming info
                var plaatsLink = "<a id=toThePlace dorpX=" + defender.village.x + " dorpY=" + defender.village.y + " href='game.php?village=" + game_data.village.id + "&screen=place&lc=" + attacker.farmGuess + "&dorp=" + defender.village.coord + "'><img src=graphic/command/attack.png title='Naar de verzamelplaats!'></a>";
                modemenu.append("<tr><td style='background-color: #ebd6ab'>&nbsp;</td></tr><tr><th>Farmen</th></tr>");
                modemenu.append("<tr><td align=center>" + plaatsLink + "<b>Lc: " + (attacker.farmAll == undefined ? attacker.farmGuess : attacker.farmGuess + " / " + attacker.farmAll) + "</b></td></tr>");

                //alert($("#toThePlace").size());
                $("#toThePlace").click(
				function ()
				{
				    setCookie2("doelwit", $(this).attr("dorpX") + "|" + $(this).attr("dorpY"), 5, true);
				    setCookie2("doelwitSpeed", "light", 5, true);
				});
            }

            // Bepalen van de code / icons
            if (attacker.units.snob.begin > 0)
            {
                // Nobles
                newName = "{E";
                if (attacker.isYou) newName += "A";
                else if (defender.isYou) newName += "D";

                if (toestTable.size() > 0 && side.toestemmingEind * 1 <= 0) newName += "V}" + replaceStringConquer;
                else
                {
                    if (attacker.units['snob'].dood == 0 && attacker.isYou) newName += "W}" + replaceStringEdelWin;
                    else newName += "L}" + replaceStringEdelLose;
                }
            }
            else if (attacker.units['spy'].begin * 1.2 * unitSizes.spy > attacker.totalBegin) // verkenner is 2 populatie
            {
                // Scouts
                newName = "{S";
                if (defender.isYou)
                {
                    // Verdedigen tegen scouts
                    newName += "D";
                    if (attacker.units['spy'].begin == attacker.units['spy'].dood) newName += "V"; // ScoutDefenseWin SDW
                    else newName += "L"; // ScoutDefenseLose SDL
                    newName += "}" + replaceStringScoutDef;
                }
                else
                {
                    newName += "A";
                    if (spyTable.size() == 0 && !defender.seen)
                    {
                        newName += "L}" + replaceStringScoutLose; // Scout attack failed: SAL
                    }
                    else
                    {
                        newName += "W";
                        if (defender.outside != undefined)
                        {
                            // Seen troups outside SAWO
                            newName += "O";
                            //if (defender.res != undefined && defender.res.total > 0) newName += ":";
                            newName += "}" + replaceStringScoutOutside;
                            if (defender.outsideDesc.length <= 1) defender.outsideDesc = "Geen";
                        }
                        else if (defender.buildings != undefined)
                        {
                            newName += "B"; // Seen buildings SAWB
                            //if (defender.res != undefined && defender.res.total > 0) newName += ":";
                            newName += "}";
                            newName += replaceStringScoutBuildings;
                        }
                        else
                        {
                            newName += "T"; // Seen troups in village SAWT
                            //if (defender.res != undefined && defender.res.total > 0) newName += ":";
                            newName += "}";
                            newName += replaceStringScoutTroops;
                        }
                    }
                }
            }
            else
            {
                // Aanval zonder edels
                newName = "{";
                if (attacker.totalBegin < attacker.units.light.begin * unitSizes.light * 1.1)
                {
                    newName += "F";
                }
                else if (attacker.totalBegin < settings.fakeMaxPop)
                {
                    newName += "0"; // Fake
                }
                else if (side.cata != undefined)
                {
                    newName += "C"; // Catapult
                }
                else
                {
                    newName += "R"; // Ram
                }

                if (defender.isYou)
                {
                    // Defense
                    newName += "D";
                    if (defender.totalEind > 0)
                    {
                        newName += "W}" + replaceStringDefenseWin;
                    }
                    else
                    {
                        newName += "L}" + replaceStringDefenseLose;
                    }
                }
                else
                {
                    newName += "A"; // Attack
                    if (defender.seen && defender.totalEind == 0)
                    {
                        // Gewonnen
                        if (defender.totalBegin == 0)
                        {
                            // Farm - geen verdediger
                            if (defender.buit.begin < defender.buit.eind) newName += "FM" + (attacker.units.spy.eind > 0 ? "S" : "") + "}" + replaceStringAttackFarmAll; // Farm Max
                            else newName += "FS" + (attacker.units.spy.eind > 0 ? "S" : "") + "}" + replaceStringAttackFarmSome; // Farm Some
                        }
                        else if (attacker.perKilled < 5)
                        {
                            newName += "W"; // Groen icon - weinig verloren (<5%)
                            if (defender.buit.begin == defender.buit.eind) newName += ":";
                            newName += "}" + replaceStringAttackWin;
                        }
                        else if (attacker.perKilled < 30)
                        {
                            newName += "M"; // Blauw icon - meer verloren (<20%)
                            if (defender.buit.begin == defender.buit.eind) newName += ":";
                            newName += "}" + replaceStringAttackWin;
                        }
                        else
                        {
                            newName += "V"; // Geel icon - veel verloren
                            newName += "}" + replaceStringAttackWin;
                        }
                    }
                    else
                    {
                        // Verloren
                        newName += "L";
                        if (defender.seen || attacker.units.spy.eind > 0)
                        {
                            newName += "S}" + replaceStringAttackLoseScout; // Scouted
                        }
                        else
                            newName += "}" + replaceStringAttackLose;
                    }
                }
                //else newName = ""; // Forwarded
            }


            //alert(defender.village.coord);
            //alert(newName);
            if (game_data.player.premium && newName.length > 0 && (inputName.val().indexOf("{") != 0 || DEBUG))
            {
                newName = buildReplaceString(newName, defender, attacker, side);
                inputName.val(newName).next().click();
            }
            $("#labelText").text(game_data.player.premium ? "DONE" : "NO PREMIUM"); // 2 click behavior: inputname string is x aantal lijnen
        }












        // berichtenlijsten code hieronder :)
        else if (location.href.indexOf('screen=report') > -1 &&
		(location.href.indexOf('&mode=') == -1
		|| location.href.indexOf('&mode=all') > -1
		|| location.href.indexOf('&mode=attack') > -1
		|| location.href.indexOf('&mode=defense') > -1)
		|| location.href.indexOf('screen=info_village') > -1)
        {
            if (proStyle.active)
            {
                if (proStyle.selectLastUsedBerichtGroup)
                {
                    var select = $("#content_value select[name='group_id']");
                    var lastSelected = getCookie2("lastBerichtGroup");
                    if (lastSelected)
                    {
                        select.val(lastSelected)
                    }

                    select.change(
					function ()
					{
					    setCookie2("lastBerichtGroup", $(this).val());
					});
                }
            }

            if (isActiveHere(settings.excludeWorlds))
                return;

            // De lijst opnieuw opbouwen
            var table = null;
            if (location.href.indexOf('screen=info_village') > -1)
                table = $("#report_table table:first");
            else if (location.href.indexOf('&mode=defense') > -1)
            {
                table = $("#report_list");
            }
            else
            {
                table = $("#report_list");
            }

            $("tr:first th:last", table).css("width", "1%");
            $("tr:first", table).append("<th width='1%'>&nbsp;</th><th width='1%'>&nbsp;</th>");
            $("tr:last", table).append("<th>&nbsp;</th><th>&nbsp;</th>");

            var laatstGelezen = getCookie2("berichtLaatstGelezen");
            table.parent().addClass("overview_table");

            var lijnMod = 0;
            $("tr:gt(0)", table).not(":last").each(
			function (index, value)
			{
			    var td = $("td:first", value);
			    var span = $("span:eq(1)", td);
			    var newCells = "";

			    td.next().attr("nowrap", "nowrap");

			    var reportId = td.find("a:first").attr("href").match(/view=(\d*)/)[1];
			    if (laatstGelezen == reportId) { td.parent().addClass("selected"); }
			    if (settings.alternatingRows)
			    {
			        if (++lijnMod % 2 == 0) td.parent().addClass("row_b");
			        else td.parent().addClass("row_a");
			    }

			    var dorp = null;
			    var contextLink = "";
			    var contextImage = img("graphic/command/attack.png", "Naar de verzamelplaats!");
			    //link = "<a href=" + link + ">" + img("graphic/command/attack.png", "") + "</a>";
			    var match = $.trim(span.text()).match(/^\{(.{2,6})\}(.*)$/);
			    if (match != null && match.length > 1)
			    {
			        span.text(match[2]);
			        var code = match[1];

			        var villageCoords = match[2].match(/^(\d{1,3}\|\d{1,3}) - (\d{1,3}\|\d{1,3})(\s\((.*)\))?/);
			        if (villageCoords != null)
			        {
			            dorp = getVillageFromCoords(villageCoords[1], true);
			            //alert(game_data.player.name +"!="+ villageCoords[4]);
			            var tag = code.substr(1, 1) == "A" ? "eigen dorp" : villageCoords[4] == undefined || villageCoords[4] == "---" ? "de aanvaller" : "dorp van " + villageCoords[4];
			            newCells += "<td nowrap><a href=game.php?village=" + game_data.village.id + "&screen=map&x=" + dorp.x + "&y=" + dorp.y + ">" + img("graphic/buildings/barracks.png", "Centreer op " + tag + " (" + dorp.coord + ")") + "</a>";

			            var dorp2 = getVillageFromCoords(villageCoords[2], true);
			            tag = code.substr(1, 1) == "D" ? "eigen dorp" : villageCoords[4] == undefined || villageCoords[4] == "---" ? "de verdediger" : "dorp van " + villageCoords[4];
			            newCells += "&nbsp;<a href=game.php?village=" + game_data.village.id + "&screen=map&x=" + dorp2.x + "&y=" + dorp2.y + ">" + img("graphic/unit/def.png", "Centreer op " + tag + " (" + dorp2.coord + ")") + "</a>";

			            newCells += "&nbsp;F" + parseInt(Math.sqrt(Math.pow(dorp.x - dorp2.x, 2) + Math.pow(dorp.y - dorp2.y, 2)));
			            newCells += "</td>";

			            if (code.substr(1, 1) == "A") { dorp = dorp2; }
			        }
			        else
			        {
			            newCells += "<td>&nbsp;</td>";
			        }

			        switch (code.substr(code.length - 1, 1))
			        {
			            case ":": // met dezelfde troepen opnieuw aanvallen
			                contextLink = "game.php?village=" + game_data.village.id + "&screen=place&try=confirm&type=same&report_id=" + reportId;
			                contextImage = img("graphic/buildings/farm.png", "Met dezelfde troepen opnieuw aanvallen");
			                code = code.replace(":", "");
			                break;

			            case "!": // Bericht markeren als te vegen
			                contextImage = img("graphic/unit/unit_ram.png", "Dorp moet nog geveegd worden!");
			                code = code.replace("!", "");
			                break;

			            case "*": // verkennen
			                contextImage = img("graphic/unit/unit_spy.png", "Dorp moet nog verkend worden!");
			                code = code.replace("*", "");
			                break;
			        }
			        //alert(code);

			        var replaceImg = "";
			        code = "%" + code.split("").join("%");

			        switch (code[1])
			        {
			            case 'E':
			                replaceImg = code
								.replace('%E', img('graphic/unit/unit_snob.png', 'Edelen! (E)'))
								.replace('%V', img('graphic/dots/blue.png', 'Dorp verovert! (V)'))
								.replace('%L', img('graphic/dots/red.png', 'Edel gestorven! (L)'))
								.replace('%W', img('graphic/dots/green.png', 'Toestemming verlaagd (W)'))
								.replace('%A', img('graphic/command/attack.png', 'Aanval (A)'))
								.replace('%D', img('graphic/unit/def.png', 'Verdediging (D)'));
			                break;
			            case 'S':
			                replaceImg = code
								.replace('%S', img('graphic/unit/unit_spy.png', 'Verkennen (S)'))
								.replace('%O', img('graphic/dots/blue.png', 'Troepen buitenhuis gezien (O)'))
								.replace('%B', img('graphic/dots/yellow.png', 'Gebouwen gezien (B)'))
								.replace('%T', img('graphic/dots/green.png', 'Troepen gezien (T)'))
								.replace('%L', img('graphic/dots/red.png', 'Verloren (L)'))
								.replace('%W', "")
								.replace('%V', img('graphic/dots/green.png', 'Verkenners afgeslagen (V)'))
								.replace('%A', img('graphic/command/attack.png', 'Aanval (A)'))
								.replace('%D', img('graphic/unit/def.png', 'Verdediging (D)'));
			                break;

			            default:
			                replaceImg = code
								.replace('%0', img('graphic/face.png', 'Faken (0)'))
								.replace("%F%M", img("graphic/max_loot/0.png", 'Alle grondstoffen meegenomen (FM)'))
								.replace("%F%S", img("graphic/max_loot/1.png", 'Nog grondstoffen aanwezig (FS)'))
								.replace('%F', img('graphic/unit/unit_light.png', 'Farmen (F)'))
								.replace('%S', img('graphic/dots/blue.png', 'Verkenners (S)'))
								.replace('%R', img('graphic/unit/unit_ram.png', 'Rammen (R)'))
								.replace('%C', img('graphic/unit/unit_catapult.png', 'Katapulten (C)'))
								.replace('%M', img('graphic/dots/yellow.png', 'Meer verloren (M)'))
								.replace('%V', img('graphic/dots/blue.png', 'Veel verloren (V)'))
								.replace('%W', img('graphic/dots/green.png', 'Weinig verloren (W)'))
								.replace('%L', img('graphic/dots/red.png', 'Verloren (L)'))
								.replace('%A', img('graphic/command/attack.png', 'Aanval (A)'))
								.replace('%D', img('graphic/unit/def.png', 'Verdediging (D)'));
			        }

			        //if (code.indexOf("RAFM") >-1) alert(code + ": " + replaceImg);
			        $("img:not(:last)", td).remove()
			        $("input:first", td).after(replaceImg);
			    }
			    else
			    {
			        var villageCoords = span.text().match(/\((\d{1,3}\|\d{1,3})\)/);
			        if (villageCoords == null) newCells += "<td>&nbsp;</td>";
			        else
			        {
			            dorp = getVillageFromCoords(villageCoords[1], true);
			            if (!dorp.isValid) newCells += "<td>&nbsp;</td>";
			            else
			            {
			                newCells += "<td><a href=game.php?village=" + game_data.village.id + "&screen=map&x=" + dorp.x + "&y=" + dorp.y + ">" + img("graphic/buildings/barracks.png", "Centreer op dorp (" + dorp.coord + ")") + "</a></td>";
			            }
			        }
			    }

			    if (contextLink.length == 0)
			    {
			        if (dorp != null && dorp.isValid)
			        {
			            // Link naar verzamelplaats
			            newCells += "<td nowrap><a dorpX=" + dorp.x + " dorpY=" + dorp.y + " href='game.php?village=" + game_data.village.id + "&screen=place&dorp=" + dorp.x + "|" + dorp.y + "' class=toThePlace>";
			            newCells += contextImage;
			            newCells += "</a></td>";
			            td.parent().append(newCells);
			        }
			        else
			        {
			            // os, claims etc = no links
			            newCells += "<td>&nbsp;</td>";
			            td.parent().append(newCells);
			        }
			    }
			    else
			    {
			        // Special link
			        newCells += "<td nowrap><a href=" + contextLink + ">" + contextImage + "</a></td>";
			        td.parent().append(newCells);
			    }
			});

            $("a.toThePlace").click(
			function ()
			{
			    setCookie2("doelwit", $(this).attr("dorpX") + "|" + $(this).attr("dorpY"), 5, true);

			    if (settings.doFarming) //$(this).find("img").attr("src") == "graphic/buildings/farm.png")
			        setCookie2("doelwitSpeed", "light", 5, true);
			});

            // tabel filteren
            if (location.href.indexOf('screen=info_village') == -1)
            {
                var filters = [
				{ img: "graphic/unit/unit_snob.png", title: "Toon edelberichten" },
				{ img: "graphic/unit/unit_spy.png", title: "Toon verkenners" },
				{ img: 'graphic/command/attack.png', title: "Toon aanvalsberichten" },
				{ img: 'graphic/unit/def.png', title: "Toon verdedigingsberichten", seperator: true },
				{ img: 'graphic/new_report.png', title: "Toon nieuwe berichten" }
				];
                if (settings.doFarming) filters[filters.length] = { img: 'graphic/max_loot/1.png', title: 'Toon niet leeggeroofde dorpen' };

                var filter = "Filter: ";
                $.each(
				filters,
				function (imgIndex, imgVal)
				{
				    filter += "&nbsp;<a href=# onclick='return false;' class=filterLink><img style='border-style: solid; border-color: black; border-width: 0' src='" + imgVal.img + "' title='" + imgVal.title + "'></a>";
				    if (imgVal.seperator) filter += " |";
				});

                //<input type=button id=filterButton value=Zoeken>
                table.prepend("<tr><th colspan=4 id=filterMenu>" + filter + " | Zoek naar tekst: <input type=text size=20 id=filterText></td></tr>");
                var menu = $("#filterMenu");
                var images = $(".filterLink", menu);

                var lastEntry = "";
                $("#filterText").bind("keyup",
				function ()
				{
				    var needle = $("#filterText").val().toLowerCase();
				    if (needle == "")
				    {
				        images.each(function () { $(this).find("img").css("background-color", ""); });
				        $("tr:gt(1)", table).show();
				    }
				    else if (lastEntry != "" && needle.indexOf(lastEntry) == 0)
				    {
				        var hiders = $();
				        $("tr:gt(1)", table).each(
							function ()
							{
							    var row = $(this);
							    if (row.find("td:first").text().toLowerCase().indexOf(needle) == -1) hiders = hiders.add(row);
							});
				        hiders.hide();
				    }
				    else
				    {
				        images.each(function () { $(this).find("img").css("background-color", ""); });
				        var showers = $();
				        var hiders = $();
				        $("tr:gt(1)", table).each(
							function ()
							{
							    var row = $(this);
							    if (row.find("td:first").text().toLowerCase().indexOf(needle) > -1) showers = showers.add(row);
							    else hiders = hiders.add(row);
							});
				        showers.show();
				        hiders.hide();
				    }

				    lastEntry = needle;
				});

                images.click(
				function ()
				{
				    var link = $(this);
				    var img = $("img", link);
				    //alert(img.css("background-color"));
				    if (img.css("background-color") != "rgb(0, 0, 0)")
				    {
				        images.each(function () { $(this).find("img").css("background-color", ""); });
				        img.css("background-color", "black");

				        lastEntry = "";
				        $("#filterText").val("");

				        var searchNeedle = img.attr("src");
				        var showers = $();
				        var hiders = $();

				        switch (searchNeedle)
				        {
				            case "graphic/new_report.png":
				                $("tr:gt(1)", table).each(
									function ()
									{
									    var row = $(this);
									    //alert(row.find("td:first").text());
									    if (row.find("td:first").text().indexOf("(nieuw)") > -1) showers = showers.add(row);
									    else hiders = hiders.add(row);
									});
				                break;
				            default:
				                $("tr:gt(1)", table).each(
									function ()
									{
									    var row = $(this);
									    if (row.find("td:first img[src^='" + searchNeedle + "']").size() > 0) showers = showers.add(row);
									    else
									    {
									        if (searchNeedle == 'graphic/unit/unit_snob.png' && row.find("td:first").text().indexOf("verovert") > -1) showers = showers.add(row);
									        else hiders = hiders.add(row);
									    }
									});
				                break;
				        }

				        showers.show();
				        hiders.hide();
				    }
				    else
				    {
				        img.css("background-color", "");
				        $("tr:gt(0)", table).show();
				    }
				    return false;
				});

            }
        }
    }


// Inject script in the page
(
 function ()
 {
     var script = document.createElement("script");
     script.textContent = "(" + executeScript + ")()";
     document.body.appendChild(script);
 }
)();

/*
Eerste:
Edel - 3de: Verover (Blauw) / Win (Groen) / Lose (Rood)
	
Scout
- Defense: SDL / SDW
- Attack: SAWO (Blauw), SAWB (Geel), SAWT (Groen)
	
Ram / Catapult / Fake
- Defense: RDW Win / RDL Lose
- Attack: 
- Win: 
- RAF (0 def / Farm icon)
- RAW (<5% losses / Groen)
- RAM (<30% losses / Blauw)
- RAV (>30% losses / Geel)
- Verlies: RAL (Lose) / RALS (Lose but See/Scout)
RA (+Scout)

Tweede: (A Bijl of D Schild)
*/