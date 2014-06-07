// ==UserScript==
// @name                MP Game Totaller
// @namespace	        Coolperson1414
// @description	        Adds an MP game total to your Game History page.
// @include             http://www.casualcollective.com/*
// ==/UserScript==


logInCheck = document.getElementById('sb-selectors');
if(logInCheck) 
{


function runCCPlus_page() 
{


var onPage = window.location.hash.replace('#', '').split('?')[0].split('/')


if (onPage[0] == 'profiles' && onPage[2] == 'games')
{

//LOCATE HISTORY TABLE
var TableLocation = document.getElementById('gamegraph').parentNode.childNodes[2].firstChild.firstChild

//ESTABLISH GRAND TOTALS
var TOgcount = parseFloat(TableLocation.childNodes[12].childNodes[1].childNodes[0].innerHTML)
var TOpts = parseFloat(TableLocation.childNodes[12].childNodes[3].childNodes[0].innerHTML);

//GRAB MP GAME TOTALS
var BCgcount = parseFloat(TableLocation.childNodes[1].childNodes[1].innerHTML);
var DAgcount = parseFloat(TableLocation.childNodes[2].childNodes[1].innerHTML);
var TDgcount = parseFloat(TableLocation.childNodes[3].childNodes[1].innerHTML);
var MIgcount = parseFloat(TableLocation.childNodes[4].childNodes[1].innerHTML);
var MOgcount = parseFloat(TableLocation.childNodes[5].childNodes[1].innerHTML);

//GRAB MP PPM
var BCppm = parseFloat(TableLocation.childNodes[1].childNodes[4].innerHTML);
var DAppm = parseFloat(TableLocation.childNodes[2].childNodes[4].innerHTML);
var TDppm = parseFloat(TableLocation.childNodes[3].childNodes[4].innerHTML);
var MIppm = parseFloat(TableLocation.childNodes[4].childNodes[4].innerHTML);
var MOppm = parseFloat(TableLocation.childNodes[5].childNodes[4].innerHTML);

//GRAB MP POINTS TOTALS
var BCpts = parseFloat(TableLocation.childNodes[1].childNodes[3].innerHTML);
var DApts = parseFloat(TableLocation.childNodes[2].childNodes[3].innerHTML);
var TDpts = parseFloat(TableLocation.childNodes[3].childNodes[3].innerHTML);
var MIpts = parseFloat(TableLocation.childNodes[4].childNodes[3].innerHTML);
var MOpts = parseFloat(TableLocation.childNodes[5].childNodes[3].innerHTML);

//GRAB SP PPM
var ABppm = parseFloat(TableLocation.childNodes[6].childNodes[4].innerHTML);
var BSppm = parseFloat(TableLocation.childNodes[7].childNodes[4].innerHTML);
var FTppm = parseFloat(TableLocation.childNodes[8].childNodes[4].innerHTML);
var PUppm = parseFloat(TableLocation.childNodes[9].childNodes[4].innerHTML);
var SGppm = parseFloat(TableLocation.childNodes[10].childNodes[4].innerHTML);
var SMppm = parseFloat(TableLocation.childNodes[11].childNodes[4].innerHTML);

//CALCULATE MP SUBTOTALS
var MPgtotal = BCgcount+DAgcount+TDgcount+MIgcount+MOgcount;
var MPppmtotal = (BCppm+DAppm+TDppm+MIppm+MOppm)/5;
var MPptstotal = BCpts+DApts+TDpts+MIpts+MOpts;

//CALCULATE SP SUBTOTALS
var SPgtotal = TOgcount-MPgtotal;
var SPppmtotal = (ABppm+BSppm+FTppm+PUppm+SGppm+SMppm)/5;
var SPptstotal = TOpts-MPptstotal;

//ADD TABLE SPOTS
TableLocation.innerHTML += '<tr class="gs-totals"><td class="row2"><b>MP Subtotals</b></td><td class="row2"><b>'+MPgtotal+'</b></td><td class="row2"><b>---</b></td><td class="row2"><b>'+MPptstotal+'</b></td><td class="row2"><b>'+MPppmtotal+'</b></td></tr><tr><td class="row1"><b>SP Subtotals</b></td><td class="row1"><b>'+SPgtotal+'</b></td><td class="row1"><b>---</b></td><td class="row1"><b>'+SPptstotal+'</b></td><td class="row1"><b>'+SPppmtotal+'</b></td></tr>'




}


}




	var ajaxloadHide = unsafeWindow.ccHistory.hideLoad

	unsafeWindow.ccHistory.hideLoad = function()
	{
		window.setTimeout(function() {runCCPlus_page()}, 50) // Give enough time for page to update
		return ajaxloadHide.apply(unsafeWindow.ccHistory)
	}
}