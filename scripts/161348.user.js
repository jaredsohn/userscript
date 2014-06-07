// ==UserScript==
// @name        qdb.us rate percentage
// @namespace   http://userscripts.org/users/478178
// @include     http://qdb.us/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// ==/UserScript==
var colors=fillColorArray();
$("a.ql").each(function(){
    var quoteNumber = $(this).attr("href").replace("/", "");
    var noemer = $( jq("qvc[" + quoteNumber + "]")).text().replace("/", "");
    var teller = $( jq("qs[" + quoteNumber + "]")).text();
    var percentage = Math.round((teller/noemer)*100);
    var color = colors[0];
    if (percentage > 0)
    {
        color = colors[percentage];
    }
    $( jq("qvc[" + quoteNumber + "]")).after("<span> =</span><span style='background: "+color+"'> " + percentage + "% </span>");
});

function jq( myid ) {
    return "#" + myid.replace( /(:|\.|\[|\])/g, "\\$1" );
}

function fillColorArray()
{
    var colors = new Array();
    colors[0] = "rgb(255, 5, 0)";
	colors[1] = "rgb(255, 10, 0)";
	colors[2] = "rgb(255, 15, 0)";
	colors[3] = "rgb(255, 20, 0)";
	colors[4] = "rgb(255, 25, 0)";
	colors[5] = "rgb(255, 30, 0)";
	colors[6] = "rgb(255, 35, 0)";
	colors[7] = "rgb(255, 40, 0)";
	colors[8] = "rgb(255, 45, 0)";
	colors[9] = "rgb(255, 50, 0)";
	colors[10] = "rgb(255, 55, 0)";
	colors[11] = "rgb(255, 60, 0)";
	colors[12] = "rgb(255, 65, 0)";
	colors[13] = "rgb(255, 70, 0)";
	colors[14] = "rgb(255, 75, 0)";
	colors[15] = "rgb(255, 80, 0)";
	colors[16] = "rgb(255, 85, 0)";
	colors[17] = "rgb(255, 90, 0)";
	colors[18] = "rgb(255, 95, 0)";
	colors[19] = "rgb(255, 100, 0)";
	colors[20] = "rgb(255, 105, 0)";
	colors[21] = "rgb(255, 110, 0)";
	colors[22] = "rgb(255, 115, 0)";
	colors[23] = "rgb(255, 120, 0)";
	colors[24] = "rgb(255, 125, 0)";
	colors[25] = "rgb(255, 130, 0)";
	colors[26] = "rgb(255, 135, 0)";
	colors[27] = "rgb(255, 140, 0)";
	colors[28] = "rgb(255, 145, 0)";
	colors[29] = "rgb(255, 150, 0)";
	colors[30] = "rgb(255, 155, 0)";
	colors[31] = "rgb(255, 160, 0)";
	colors[32] = "rgb(255, 165, 0)";
	colors[33] = "rgb(255, 170, 0)";
	colors[34] = "rgb(255, 175, 0)";
	colors[35] = "rgb(255, 180, 0)";
	colors[36] = "rgb(255, 185, 0)";
	colors[37] = "rgb(255, 190, 0)";
	colors[38] = "rgb(255, 195, 0)";
	colors[39] = "rgb(255, 200, 0)";
	colors[40] = "rgb(255, 205, 0)";
	colors[41] = "rgb(255, 210, 0)";
	colors[42] = "rgb(255, 215, 0)";
	colors[43] = "rgb(255, 220, 0)";
	colors[44] = "rgb(255, 225, 0)";
	colors[45] = "rgb(255, 230, 0)";
	colors[46] = "rgb(255, 235, 0)";
	colors[47] = "rgb(255, 240, 0)";
	colors[48] = "rgb(255, 245, 0)";
	colors[49] = "rgb(255, 250, 0)";
	colors[50] = "rgb(255, 255, 0)";
	colors[51] = "rgb(250, 255, 0)";
	colors[52] = "rgb(245, 255, 0)";
	colors[53] = "rgb(240, 255, 0)";
	colors[54] = "rgb(235, 255, 0)";
	colors[55] = "rgb(230, 255, 0)";
	colors[56] = "rgb(225, 255, 0)";
	colors[57] = "rgb(220, 255, 0)";
	colors[58] = "rgb(215, 255, 0)";
	colors[59] = "rgb(210, 255, 0)";
	colors[60] = "rgb(205, 255, 0)";
	colors[61] = "rgb(200, 255, 0)";
	colors[62] = "rgb(195, 255, 0)";
	colors[63] = "rgb(190, 255, 0)";
	colors[64] = "rgb(185, 255, 0)";
	colors[65] = "rgb(180, 255, 0)";
	colors[66] = "rgb(175, 255, 0)";
	colors[67] = "rgb(170, 255, 0)";
	colors[68] = "rgb(165, 255, 0)";
	colors[69] = "rgb(160, 255, 0)";
	colors[70] = "rgb(155, 255, 0)";
	colors[71] = "rgb(150, 255, 0)";
	colors[72] = "rgb(145, 255, 0)";
	colors[73] = "rgb(140, 255, 0)";
	colors[74] = "rgb(135, 255, 0)";
	colors[75] = "rgb(130, 255, 0)";
	colors[76] = "rgb(125, 255, 0)";
	colors[77] = "rgb(120, 255, 0)";
	colors[78] = "rgb(115, 255, 0)";
	colors[79] = "rgb(110, 255, 0)";
	colors[80] = "rgb(105, 255, 0)";
	colors[81] = "rgb(100, 255, 0)";
	colors[82] = "rgb(95, 255, 0)";
	colors[83] = "rgb(90, 255, 0)";
	colors[84] = "rgb(85, 255, 0)";
	colors[85] = "rgb(80, 255, 0)";
	colors[86] = "rgb(75, 255, 0)";
	colors[87] = "rgb(70, 255, 0)";
	colors[88] = "rgb(65, 255, 0)";
	colors[89] = "rgb(60, 255, 0)";
	colors[90] = "rgb(55, 255, 0)";
	colors[91] = "rgb(50, 255, 0)";
	colors[92] = "rgb(45, 255, 0)";
	colors[93] = "rgb(40, 255, 0)";
	colors[94] = "rgb(35, 255, 0)";
	colors[95] = "rgb(30, 255, 0)";
	colors[96] = "rgb(25, 255, 0)";
	colors[97] = "rgb(20, 255, 0)";
	colors[98] = "rgb(15, 255, 0)";
	colors[99] = "rgb(10, 255, 0)";
	colors[100] = "rgb(5, 255, 0)";
	return colors;
}