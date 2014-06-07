// ==UserScript==
// @name        WW-Lieferungen
// @namespace   RippaTools
// @description Tooltip für die WW Übersicht
// @include     http://*.grepolis.*/game*
// @version     1
// @copyright   2014 MacBath
// @updateURL   http://userscripts.org/scripts/show/293260
// @downloadURL   http://userscripts.org/scripts/show/293260
// ==/UserScript==



/*******************************************************************************************************************************
 *  HTTP-Requests
 *******************************************************************************************************************************/
$(document).ajaxComplete(function (e, xhr, opt) {
    var url = opt.url.split("?");
    var action = url[0].substr(5) + "/" + url[1].split(/&/)[1].substr(7);

    switch (action) {  
		case "/wonders/index":
			WW_Overall_Tooltip();
            break;
        case "/wonders/send_resources":
            WW_Overall_Tooltip();
            break;
    };
});

/*******************************************************************************************************************************
 *  Funktionen
 *******************************************************************************************************************************/

 
function WW_Overall_Tooltip()
{
var wws = { ort: "Vor Ort", weg: "Unterwegs", tot: "Summe", sol: "Soll",  mis: "Differenz" };

var ww_overall = {cin: {wood:0, stone:0, iron:0, sum:0}, way:{wood:0, stone:0, iron:0, sum:0}, ges:{wood:0, stone:0, iron:0, sum:0},
	sol:{res:0, sum:0}, mis: {wood:0, stone:0, iron:0, sum:0}};
ww_overall.cin.wood = parseInt($("div#ww_town_capacity_wood .amounts .curr:first").text());
ww_overall.cin.stone = parseInt($("div#ww_town_capacity_stone .amounts .curr:first").text());
ww_overall.cin.iron = parseInt($("div#ww_town_capacity_iron .amounts .curr:first").text());
ww_overall.cin.sum += ww_overall.cin.wood;
ww_overall.cin.sum += ww_overall.cin.stone;
ww_overall.cin.sum += ww_overall.cin.iron;

var ww_overall_rgx = /(\d+)/;
ww_overall_rgx.exec($("div#ww_town_capacity_wood .amounts .curr2:first").text());
ww_overall.way.wood = parseInt(RegExp.$1);
ww_overall_rgx.exec($("div#ww_town_capacity_stone .amounts .curr2:first").text());
ww_overall.way.stone = parseInt(RegExp.$1);
ww_overall_rgx.exec($("div#ww_town_capacity_iron .amounts .curr2:first").text());
ww_overall.way.iron = parseInt(RegExp.$1);
ww_overall.way.sum += ww_overall.way.wood;
ww_overall.way.sum += ww_overall.way.stone;
ww_overall.way.sum += ww_overall.way.iron;

ww_overall.ges.wood += ww_overall.cin.wood;
ww_overall.ges.wood += ww_overall.way.wood;
ww_overall.ges.stone += ww_overall.cin.stone;
ww_overall.ges.stone += ww_overall.way.stone;
ww_overall.ges.iron += ww_overall.cin.iron;
ww_overall.ges.iron += ww_overall.way.iron;
ww_overall.ges.sum += ww_overall.cin.sum;
ww_overall.ges.sum += ww_overall.way.sum;

ww_overall.sol.res = parseInt($("div#ww_town_capacity_wood .amounts .max:first").text());
ww_overall.sol.sum = 3 * ww_overall.sol.res;

ww_overall.mis.wood = ww_overall.ges.wood - ww_overall.sol.res;
ww_overall.mis.stone = ww_overall.ges.stone - ww_overall.sol.res;
ww_overall.mis.iron = ww_overall.ges.iron - ww_overall.sol.res;
ww_overall.mis.sum = ww_overall.ges.sum - ww_overall.sol.sum;


var ww_missing = {wood:pointNumber(ww_overall.mis.wood), stone:pointNumber(ww_overall.mis.stone), iron:pointNumber(ww_overall.mis.iron), sum:pointNumber(ww_overall.mis.sum)};


if(ww_overall.mis.wood > 0)
{
	ww_missing.wood = ww_missing.wood + "(" + pointNumber(ww_overall.sol.res - ww_overall.cin.wood) + ")";
}
else
{
	ww_missing.wood = "<span style='color:red'>" + ww_missing.wood + "</span>";
}
	
if(ww_overall.mis.stone > 0)
{
	ww_missing.stone = ww_missing.stone + "(" + pointNumber(ww_overall.sol.res - ww_overall.cin.stone) + ")";
}
else
{
	ww_missing.stone = "<span style='color:red'>" + ww_missing.stone + "</span>";
}
	
if(ww_overall.mis.iron > 0)
{
	ww_missing.iron = ww_missing.iron + "(" + pointNumber(ww_overall.sol.res - ww_overall.cin.iron) + ")";
}
else
{
	ww_missing.iron = "<span style='color:red'>" + ww_missing.iron + "</span>";
}
	
if(ww_overall.mis.sum > 0)
{
	ww_missing.sum = ww_missing.sum + "(" + pointNumber(ww_overall.sol.sum - ww_overall.cin.sum) + ")";
}
else
{
	ww_missing.sum = "<span style='color:red'>" + ww_missing.sum + "</span>";
}


$('.next_level_res').tooltip("<table style='border-spacing:0px; text-align:right' cellpadding='5px'><tr>"+
                                   "<td align='right' style='border-right: 1px solid;border-bottom: 1px solid'></td>"+
                                   "<td style='border-right: 1px solid; border-bottom: 1px solid'>"+
								   "<div class='icon all_res' style='background: url(\"http://de.cdn.grepolis.com/images/game/layout/resources_2.32.png\") no-repeat scroll 0px 0px transparent; width: 30px; height: 30px; margin: 0px auto 0px 5px;'></div>"+
								   "</td><td style='border-right: 1px solid; border-bottom: 1px solid'>"+
								   "<div class='icon all_res' style='background: url(\"http://de.cdn.grepolis.com/images/game/layout/resources_2.32.png\") no-repeat scroll 0px -30px transparent; width: 30px; height: 30px; margin: 0px auto 0px 5px;'></div>"+
								   "</td><td style='border-right: 1px solid; border-bottom: 1px solid'>"+
								   "<div class='icon all_res' style='background: url(\"http://de.cdn.grepolis.com/images/game/layout/resources_2.32.png\") no-repeat scroll 0px -60px transparent; width: 30px; height: 30px; margin: 0px auto 0px 5px;'></div>"+
								   "</td><td style='border-bottom: 1px solid'>"+
								   "<div class='icon all_res' style='background: url(\"http://de.cdn.grepolis.com/images/game/layout/resources_2.32.png\") no-repeat scroll 0px -90px transparent; width: 30px; height: 30px; margin: 0px auto 0px 5px;'></div>"+
								   "</td></tr>"+
                                   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ wws.ort + "</td>"+
                                   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.cin.wood) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.cin.stone) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.cin.iron) +"</td>"+
								   "<td>"+ pointNumber(ww_overall.cin.sum) +"</td></tr>"+
								   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ wws.weg + "</td>"+
                                   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.way.wood) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.way.stone) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.way.iron) +"</td>"+
								   "<td>"+ pointNumber(ww_overall.way.sum) +"</td></tr>"+
								   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ wws.tot + "</td>"+
                                   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.ges.wood) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.ges.stone) +"</td>"+
								   "<td style='border-right: 1px solid'>"+ pointNumber(ww_overall.ges.iron) +"</td>"+
								   "<td>"+ pointNumber(ww_overall.ges.sum) +"</td></tr>"+
								   "<tr><td class='bold' style='border-right:1px solid; border-bottom: 1px solid;text-align:center'>"+ wws.sol + "</td>"+
                                   "<td style='border-right: 1px solid; border-bottom: 1px solid;'>"+ pointNumber(ww_overall.sol.res) +"</td>"+
								   "<td style='border-right: 1px solid; border-bottom: 1px solid;'>"+ pointNumber(ww_overall.sol.res) +"</td>"+
								   "<td style='border-right: 1px solid; border-bottom: 1px solid;'>"+ pointNumber(ww_overall.sol.res) +"</td>"+
								   "<td style='border-bottom: 1px solid;'>"+ pointNumber(ww_overall.sol.sum) +"</td></tr>"+
								   "<tr><td class='bold' style='border-right:1px solid;text-align:center'>"+ wws.mis + "</td>"+
                                   "<td style='border-right: 1px solid'>"+ ww_missing.wood + "</td>"+
								   "<td style='border-right: 1px solid'>"+ ww_missing.stone + "</td>"+
								   "<td style='border-right: 1px solid'>"+ ww_missing.iron +  "</td>"+
								   "<td>"+ ww_missing.sum + "</td></tr>"+
								   "</table>");
}

// Adds points to numbers
//Vielen Dank an DIONY hierfür.
function pointNumber(number) {
    var sep = ".";
    
    number = number.toString();
    if (number.length > 3) { 
        var mod = number.length % 3; 
        var output = (mod > 0 ? (number.substring(0,mod)) : '');
        
        for (var i=0 ; i < Math.floor(number.length / 3); i++) { 
            if ((mod == 0) && (i == 0)) {
                output += number.substring(mod+ 3 * i, mod + 3 * i + 3); 
            } else {
                output+= sep + number.substring(mod + 3 * i, mod + 3 * i + 3); 
            }
        } 
        number = output;
    }
    return number;
}