// ==UserScript==
// @name           bandenkaassen autoeinzahlung auser 25 euro
// @namespace basti1012(www.pennerhack.fore-city.de)
// @description    Nach den login wird das ganze geld bis auf 25 euro in der bandenkasse eingezahlt
// @include        http://*pennergame.de/overview/
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennergame.de/stock/bottle/',
	onload: function(responseDetails) {
		var side = responseDetails.responseText;
		user(side)}});

function user(side){
	var side_split = side.split('<td align="left" width="250"><span>');
	var geld1 = side.split('<li class="cash">&euro;')[1];
	var geld2 = geld1.split('</li>')[0];
	var side_split_2 = side_split[1].split('Pfandflaschen');

    if (geld2.length > 6)
	{

	var geld_split1 = geld2.split('.')[0];
	var geld_split2 = geld2.split('.')[1];
	var geld_split3 = geld_split2.split(',')[0];
	var geld_split4 = geld_split2.split(',')[1];

    var geld = (geld_split1+geld_split3+'.'+geld_split4);
    }
	else
	{
	var geld_split1 = geld2.split(',')[0];	
	var geld_split2 = geld2.split(',')[1];
	var geld = (geld_split1+'.'+geld_split2);
	};

	var bandengeld = (geld - 25);

	
alert(""+bandengeld+""");
}