// ==UserScript==
// @name           Kipsipää Laskuri
// @namespace      Kulttuurisopimus laskuri
// @description    Laskee museosta halutun liittouman kanssa olevat sopimukset.
// @include        http://*.ikariam.*/index.php?view=museum*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LUODAAN SEARCH-BOXI /////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var element = document.getElementById("buildingUpgrade");
var box = document.createElement('div');
var innerHTML = '<div class="dynamic" id="ctCounter">';
innerHTML += '<h3 class="header">Kipsipää Laskuri</h3>';
innerHTML += '<div class="content">';
innerHTML += '<center><br>Laske kulttuurisopimukset liittouman tagin perusteella:<br><br><input type="text" size="20" style="text-align:center;" id="allyTag"><br><br><a class="button" id="getNumber">Laske</a><br><div id="tulos"></div><br></center>';
innerHTML += '</div><div class="footer"></div></div>';
box.innerHTML = innerHTML;
element.parentNode.insertBefore(box, element.nextSibling);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOXIN TOIMINNOT /////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById("getNumber").addEventListener('click',
	function() 
		{
		var allyTag = document.getElementById("allyTag").value;
		if (allyTag == "") { var allyTag = "-"; }
		var allyLower3 = allyTag.toLowerCase();
		if (allyTag == "-") { var allyTag = "liitottomien"; }
		var allyLower2 = '<td class="ally">'+allyLower3+'</td>';
		var allyLower = allyLower2.toLowerCase();
		var ctCount = parseFloat(countCT(allyLower));
		var ctProsent = getProsents(ctCount);
		if (allyTag != "liitottomien")
		{ document.getElementById("tulos").innerHTML='<br><font size="4"><b>'+ctCount+'</b></font> sopimusta '+allyTag+':n kanssa.<br>('+ctProsent+'% kaikista)'; }
		else
		{ document.getElementById("tulos").innerHTML='<br><font size="4"><b>'+ctCount+'</b></font> sopimusta '+allyTag+' kanssa.<br>('+ctProsent+'% kaikista)'; }
		}, true);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SOPIMUKSIEN LASKEMINEN //////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function countCT(ally)
	{
	var mainview = document.getElementById("mainview").innerHTML.split('<span class="textLabel">Sopimuskumppani</span>')[1].toLowerCase();
	var searchAlly = new RegExp(ally,"g");
	var foundArray = mainview.match(searchAlly);
	if (foundArray == null) { return 0; }
	else { return foundArray.length; }
	}
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PROSENTTIEN LASKEMINEN //////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getProsents(amount)
	{
	var ctTotal = parseFloat(document.getElementById("museum").innerHTML.split('<span class="textLabel">Kulttuuriesineitä yhteensä: </span>')[1].split("</div>")[0]);
	
	var prosents1 = amount / ctTotal * 100;
	var prosents = prosents1+"";
	if (prosents.length >= 5)
		{
		var prosents = "n. "+prosents.substr(0,4)
		}
	return prosents;
	}