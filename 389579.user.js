// ==UserScript==
// @name       Ogame tools
// @namespace  http://use.i.E.your.homepage/
// @version    0.01
// @description  some multi-account tools for OGame
// @match      http://s116-us.ogame.gameforge.com/game/index.php?page=resources*
// @copyright  2014+, Brian Mason
// ==/UserScript==

var updateO = new Object();



updateO.met = parseInt($("#resources_metal").html().replace(".",""));
updateO.crys = parseInt($("#resources_crystal").html().replace(".",""));
updateO.deut = parseInt($("#resources_deuterium").html().replace(".",""));
updateO.metp = parseInt($("span.res_heading").next().children().eq(2).html().replace(".",""))+120;
updateO.crysp = parseInt($("span.res_heading").eq(1).next().children().eq(2).html().replace(".",""))+60;
updateO.deutp = parseInt($("span.res_heading").eq(2).next().children().eq(2).html().replace(".",""));

//alert($("#selectedPlanetName").html() + JSON.stringify(updateO));

   $.ajax({
        url: 'http://mooyai.com/ogameTools/resources/'+$("#selectedPlanetName").html()+'/'+JSON.stringify(updateO),
        success: function(response) {
//           alert($("#selectedPlanetName").html()+response);
           $("h2:contains('Resource')").replaceWith($("#selectedPlanetName").html() );
           
        }
    });
