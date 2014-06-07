// ==UserScript==
// @name        Record Sales Value for Popmundo
// @namespace   http://popmundo.psicofrenia.com/
// @description Adds the sales value to your record page
// @include     http://*.popmundo.com/World/Popmundo.aspx/Artist/Record/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @downloadURL    https://userscripts.org/scripts/source/161930.user.js
// @updateURL      https://userscripts.org/scripts/source/161930.meta.js
// @version     1.0
// ==/UserScript==

var costSingle = 3.5;
var costFull = 15;
var total = 0;
var isFull = false;

var $table = jQuery(".data :first");

var $row = $table.children(":eq(1)");
$row.each(function()
{
	var htmlValue = $row.children(":eq(1)").html().trim();
	if(	(htmlValue == 'Full Length Album') || (htmlValue == 'Álbum Completo') ||(htmlValue == 'Álbum')) { isFull = true; }
});

var $link = jQuery("#ctl00_cphLeftColumn_ctl01_lnkUnitsSold");

var linkArray = $link.html().trim().split(' ');
var salesValue = 0;
if(isFull) { salesValue = linkArray[0] * costFull; }
else { salesValue = linkArray[0] * costSingle; }

Number.prototype.gexFormatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

salesValue = '$'+salesValue.gexFormatMoney(2,'.',',');

$link.html(linkArray[0] + ' ('+ salesValue + ') ' +linkArray[1]);

