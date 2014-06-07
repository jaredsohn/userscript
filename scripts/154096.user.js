// ==UserScript==
// @name        Planets.nu - improved Planet List View v0.1
// @namespace   http://schnietz.eu/planets
// @description Adds additional views to the planet dashboard
// @include     http://planets.nu/home
// @include     http://planets.nu/games/*
// @include     http://play.planets.nu/*
// @include     http://*.planets.nu/*
// @version     0.1
// ==/UserScript==
// 0.1 - Added Production View, Right align for all numbers, Total numbers for resources & production

function wrapper() { // wrapper for injection

    oldShowPlanets = vgapDashboard.prototype.showPlanets;

    vgaPlanets.prototype.miningPreview = function (d, a, c) {
        if (d.mines == 0) {
            return 0
        }
        var b = this.miningRate(d, c); if (a < b) {
            b = a
        }
        return b
    };

    vgaPlanets.prototype.suppliesPreview = function (planet) {
        var supplies = Math.round(planet.factories);

        if (planet.nativetype == 2)
        {
            var clans = planet.nativeclans
            if (clans > planet.clans)
            {
                clans = planet.clans;
            }

            supplies += clans;
        }

        return supplies;
    };

    vgaPlanets.prototype.taxAmountPreview = function (planet)
    {
        var colonistsTax = Math.round(planet.colonisttaxrate * planet.clans / 1000);

        var colonistsBonus = 1;

        if (this.advActive(2))
        {
            colonistsBonus = 2
        }

        colonistsTax = colonistsTax * colonistsBonus;

        if (colonistsTax > 5000)
        {
            colonistsTax = 5000
        }
        
        var nativeTaxRate = planet.nativetaxrate;
        var owner = this.getPlayer(planet.ownerid);

        if (owner != null)
        {
            if (owner.raceid == 6 && nativeTaxRate > 20)
            {
                nativeTaxRate = 20
            }
        }

        var nativeTax = Math.round(nativeTaxRate * planet.nativetaxvalue / 100 * planet.nativeclans / 1000);

        if (nativeTax > planet.clans)
        {
            nativeTax = planet.clans
        }

        var nativeBonus = 1;
        if (this.advActive(2))
        {
            nativeBonus = 2
        }
        nativeTax = nativeTax * nativeBonus;

        if (planet.nativetype == 6)
        {
            nativeTax = nativeTax * 2
        }

        if (nativeTax > 5000)
        {
            nativeTax = 5000
        }

        return colonistsTax + nativeTax;
    };
    
    vgapDashboard.prototype.showPlanets = function (e) {
        vgap.playSound("button");
        vgap.closeSecond();
        this.pane.remove();
        var b = "";

        b += "<style>td.number, th.number { text-align: right; padding-right: 6px; } td.text, th.text { text-align: left; padding-right: 6px; } tr.total { background-color: white; color: black; }</style>";

        if (!e) { e = 0 }

        b += "<ul class='FilterMenu'>";
        b += "<li " + (e == 0 ? "class='SelectedFilter'" : "") + " onclick='vgap.dash.showPlanets(0);'>Colony View</li>";
        b += "<li " + (e == 1 ? "class='SelectedFilter'" : "") + " onclick='vgap.dash.showPlanets(1);'>Resource View</li>";
        b += "<li " + (e == 2 ? "class='SelectedFilter'" : "") + " onclick='vgap.dash.showPlanets(2);'>Production View</li>";
        b += "</ul>";

        b += "<div class='DashPane' style='height:" + ($("#DashboardContent").height() - 30) + "px;'>";
        b += "<table id='PlanetTable' border='1' frame='void'  rules='rows' align='left' width='100%' style='cursor:pointer;'><thead>";

        if (e == 0)
        {
            b += "<th width='5'></th><th class='number' width='5'>Id</th><th class='text'>Name</th><th title='Starbase' class='text'>SB</th><th class='text'>FC</th><th title='Temperature' class='number'>T</th><th title='Colonists' class='number'>Cols</th><th title='Colonist Tax Rate' class='number'>Tx</th><th title='Colonist Happiness' class='number'>Hp</th><th title='Colonist Happiness Change' class='number'>+/-</th><th title='Natives' class='text'>Natives</th><th title='Native Government' class='text'>Gov</th><th title='Native Population' class='number'>Pop</th><th title='Native Tax Rate' class='number'>Tx</th><th title='Native Happiness' class='number'>Hp</th><th title='Native Happiness Change' class='number'>+/-</th><th title='Ready Checkbox Status' class='number'>R</th>"
        }
        if (e == 1)
        {
            b += "<th width='5'></th><th class='number' width='5'>Id</th><th class='text'>Name</th><th title='Megacredits' class='number'>MC</th><th title='Supplies' class='number'>S</th><th title='Neutronium' class='number'>N</th><th title='Duranium' class='number'>D</th><th title='Tritanium' class='number'>T</th><th title='Molybdenum' class='number'>M</th><th title='Ground Neutronium (unmined)' class='number'>GN</th><th title='Ground Duranium (unmined)' class='number'>GD</th><th title='Ground Tritanium (unmined)' class='number'>GT</th><th title='Ground Molybdenum (unmined)' class='number'>GM</th><th title='Neutronium Density' class='number'>DN</th><th title='Duranium Density' class='number'>DD</th><th title='Tritanium Density' class='number'>DT</th><th title='Molybdenum Density' class='number'>DM</th>"
        }
        if (e == 2)
        {
            b += "<th width='5'></th>";
            b += "<th class='number' width='5'>Id</th>";
            b += "<th class='text'>Name</th>";
            b += "<th title='Megacredits' class='number'>MC</th>";
            b += "<th title='Megacredits Production' class='number'>+MC</th>";
            b += "<th title='Supplies' class='number'>S</th>";
            b += "<th title='Supplies Production' class='number'>+S</th>";
            b += "<th title='Neutronium' class='number'>N</th>";
            b += "<th title='Neutronium Production' class='number'>+N</th>";
            b += "<th title='Duranium' class='number'>D</th>";
            b += "<th title='Duranium Production' class='number'>+D</th>";
            b += "<th title='Tritanium' class='number'>T</th>";
            b += "<th title='Tritanium Production' class='number'>+T</th>";
            b += "<th title='Molybdenum' class='number'>M</th>";
            b += "<th title='Molybdenum Production' class='number'>+M</th>";
        }
        b += "</thead><tbody>";

        var totalMegacredits = 0;
        var totalSupplies = 0;
        var totalNeutronium = 0;
        var totalDuranium = 0;
        var totalTritanium = 0;
        var totalMolybdenum = 0;
        var totalGroundNeutronium = 0;
        var totalGroundDuranium = 0;
        var totalGroundTritanium = 0;
        var totalGroundMolybdenum = 0;
        var totalProdMegacredits = 0;
        var totalProdSupplies = 0;
        var totalProdNeutronium = 0;
        var totalProdDuranium = 0;
        var totalProdTritanium = 0;
        var totalProdMolybdenum = 0;

        for (var c = 0; c < vgap.myplanets.length; c++)
        {
            var d = vgap.myplanets[c];
            var a = vgap.getStarbase(d.id) != null ? "X" : "";

            b += "<tr class='RowSelect' onclick='vgap.map.selectPlanet(" + d.id + ");'><td><img class='TinyIcon' src='" + d.img + "'/></td>";

            if (e == 0)
            {
                b += "<td class='number'>" + d.id + "</td><td class='text'>" + d.name + "</td>";
                b += "<td class='text'>" + a + "</td><td class='text'>" + d.friendlycode + "</td><td class='number'>" + d.temp + "</td><td class='number'>" + d.clans * 100 + "</td><td class='number'>" + d.colonisttaxrate + "</td><td class='number'>" + d.colonisthappypoints + "</td><td" + (d.colhappychange < 0 ? " class='WarnText number' " : " class='number'") + " >" + d.colhappychange + "</td>";
                if (d.nativeclans > 0) {
                    b += "<td class='text'>" + d.nativeracename + "</td><td class='text'>" + d.nativegovernmentname + "</td><td class='number'>" + d.nativeclans * 100 + "</td><td class='number'>" + d.nativetaxrate + "</td><td class='number'>" + d.nativehappypoints + "</td><td" + (d.nativehappychange < 0 ? " class='WarnText number' " : " class='number'") + " >" + d.nativehappychange + "</td>"
                }
                else {
                    b += "<td></td><td></td><td></td><td></td><td></td><td></td>"
                }
                b += "<td>" + (d.readystatus > 0 ? (d.readystatus == 1 ? "-" : "+") : "") + "</td></tr>"
            }

            if (e == 1)
            {
                var megacredits = d.megacredits;
                totalMegacredits += megacredits;

                var supplies = d.supplies;
                totalSupplies += supplies;

                var neutronium = d.neutronium;
                totalNeutronium += neutronium;

                var duranium = d.duranium;
                totalDuranium += duranium;

                var tritanium = d.tritanium;
                totalTritanium += tritanium;

                var molybdenum = d.molybdenum;
                totalMolybdenum += molybdenum;

                var groundneutronium = d.groundneutronium;
                totalGroundNeutronium += groundneutronium;

                var groundduranium = d.groundduranium;
                totalGroundDuranium += groundduranium;

                var groundtritanium = d.groundtritanium;
                totalGroundTritanium += groundtritanium;

                var groundmolybdenum = d.groundmolybdenum;
                totalGroundMolybdenum += groundmolybdenum;

                b += "<td class='number'>" + d.id + "</td>";
                b += "<td class='text'>" + d.name + "</td>";
                b += "<td class='number'>" + megacredits + "</td>";
                b += "<td class='number'>" + supplies + "</td>";
                b += "<td class='number'>" + neutronium + "</td>";
                b += "<td class='number'>" + duranium + "</td>";
                b += "<td class='number'>" + tritanium + "</td>";
                b += "<td class='number'>" + molybdenum + "</td>";
                b += "<td class='number'>" + groundneutronium + "</td>";
                b += "<td class='number'>" + groundduranium + "</td>";
                b += "<td class='number'>" + groundtritanium + "</td>";
                b += "<td class='number'>" + groundmolybdenum + "</td>";
                b += "<td class='number'>" + d.densityneutronium + "</td>";
                b += "<td class='number'>" + d.densityduranium + "</td>";
                b += "<td class='number'>" + d.densitytritanium + "</td>";
                b += "<td class='number'>" + d.densitymolybdenum + "</td>";
                b += "</tr>"
            }

            if (e == 2)
            {
                var megacredits = d.megacredits;
                totalMegacredits += megacredits;

                var supplies = d.supplies;
                totalSupplies += supplies;

                var neutronium = d.neutronium;
                totalNeutronium += neutronium;

                var duranium = d.duranium;
                totalDuranium += duranium;

                var tritanium = d.tritanium;
                totalTritanium += tritanium;

                var molybdenum = d.molybdenum;
                totalMolybdenum += molybdenum;

                var prodMegacredits = vgap.taxAmountPreview(d);
                totalProdMegacredits += prodMegacredits;

                var prodSupplies = vgap.suppliesPreview(d);
                totalProdSupplies += prodSupplies;

                var prodNeutronium = vgap.miningPreview(d, d.groundneutronium, d.densityneutronium);
                totalProdNeutronium += prodNeutronium;

                var prodDuranium = vgap.miningPreview(d, d.groundduranium, d.densityduranium);
                totalProdDuranium += prodDuranium;

                var prodTritanium = vgap.miningPreview(d, d.groundtritanium, d.densitytritanium);
                totalProdTritanium += prodTritanium;

                var prodMolybdenum = vgap.miningPreview(d, d.groundmolybdenum, d.densitymolybdenum);
                totalProdMolybdenum += prodMolybdenum;

                b += "<td class='number'>" + d.id + "</td>";
                b += "<td class='text'>" + d.name + "</td>";
                b += "<td class='number'>" + megacredits + "</td>";
                b += "<td class='number'>" + prodMegacredits + "</td>";
                b += "<td class='number'>" + supplies + "</td>";
                b += "<td class='number'>" + prodSupplies + "</td>";
                b += "<td class='number'>" + neutronium + "</td>";
                b += "<td class='number'>" + prodNeutronium + "</td>";
                b += "<td class='number'>" + duranium + "</td>";
                b += "<td class='number'>" + prodDuranium + "</td>";
                b += "<td class='number'>" + tritanium + "</td>";
                b += "<td class='number'>" + prodTritanium + "</td>";
                b += "<td class='number'>" + molybdenum + "</td>";
                b += "<td class='number'>" + prodMolybdenum + "</td>";
                b += "</tr>";
            }

        }

        b += "</tbody>";

        if (e == 1)
        {
            b += "<tfooter><tr class='total'>";
            b += "<th>&nbsp;</th>";
            b += "<th>&nbsp;</th>";
            b += "<th class='text'>Total</th>";
            b += "<th class='number'>" + totalMegacredits + "</th>";
            b += "<th class='number'>" + totalSupplies + "</th>";
            b += "<th class='number'>" + totalNeutronium + "</th>";
            b += "<th class='number'>" + totalDuranium + "</th>";
            b += "<th class='number'>" + totalTritanium + "</th>";
            b += "<th class='number'>" + totalMolybdenum + "</th>";
            b += "<th class='number'>" + totalGroundNeutronium + "</th>";
            b += "<th class='number'>" + totalGroundDuranium + "</th>";
            b += "<th class='number'>" + totalGroundTritanium + "</th>";
            b += "<th class='number'>" + totalGroundMolybdenum + "</th>";
            b += "<th class='number'>&nbsp;</th>";
            b += "<th class='number'>&nbsp;</th>";
            b += "<th class='number'>&nbsp;</th>";
            b += "<th class='number'>&nbsp;</th>";
            b += "</tr></tfooter>"
        }

        if (e == 2)
        {
            b += "<tfooter><tr class='total'>";
            b += "<th>&nbsp;</th>";
            b += "<th>&nbsp;</th>";
            b += "<th class='text'>Total</th>";
            b += "<th class='number'>" + totalMegacredits + "</th>";
            b += "<th class='number'>" + totalProdMegacredits + "</th>";
            b += "<th class='number'>" + totalSupplies + "</th>";
            b += "<th class='number'>" + totalProdSupplies + "</th>";
            b += "<th class='number'>" + totalNeutronium + "</th>";
            b += "<th class='number'>" + totalProdNeutronium + "</th>";
            b += "<th class='number'>" + totalDuranium + "</th>";
            b += "<th class='number'>" + totalProdDuranium + "</th>";
            b += "<th class='number'>" + totalTritanium + "</th>";
            b += "<th class='number'>" + totalProdTritanium + "</th>";
            b += "<th class='number'>" + totalMolybdenum + "</th>";
            b += "<th class='number'>" + totalProdMolybdenum + "</th>";
            b += "</tr></tfooter>"
        }

        b += "</table>";
        b += "</div>";

        this.pane = $(b).appendTo(this.content);
        $("#PlanetTable").tablesorter();
        this.pane.jScrollPane();
        vgap.CurrentView = "showPlanets";
        vgap.showPlanetsViewed = 1;
        vgap.action();
    };

}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);