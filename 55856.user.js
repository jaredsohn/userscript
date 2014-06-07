// ==UserScript==
// @name                CC H4CKS P4CK 1
// @namespace	        Coolperson1414, zarato
// @description	        Exploit hidden elements of the CC!
// @include             http://www.casualcollective.com/*
// ==/UserScript==

logInCheck = document.getElementById('sb-selectors');
if(logInCheck) 
{


	function runCCPlus_page() 
        {
                var onPage = window.location.hash.replace('#', '').split('?')[0].split('/')

		if (onPage[0] == 'teams' && onPage[1] == 'create')
                {
                   //THIS ADDS EXTRA TEAM OPTIONS
                    alert('Press OK to unlock hidden teams! -CP1414 and zarato')
                     document.getElementById('createteam').firstChild.firstChild.childNodes[2].childNodes[1].innerHTML = '<label><input type="radio" value="8" name="game"/> <b>Attack of the Buggles</b><br/></label><label><input type="radio" value="3" name="game"/> <b>Buggle Connect</b><br/></label><label><input type="radio" value="9" name="game"/> <b>Buggle Stars</b><br/></label><label><input type="radio" value="2" name="game"/> <b>Desktop Armada</b><br/></label><label><input type="radio" value="13" name="game"/> <b>Desktop TD Pro</b><br/></label><label><input type="radio" value="5" name="game"/> <b>Farragomate</b><br/></label><label><input type="radio" value="7" name="game"/> <b>Flash Element TD 2</b><br/></label><label><input type="radio" checked="checked" value="4" name="game"/> <b>Minions</b><br/></label><label><input type="radio" value="11" name="game"/> <b>Minions on Ice</b><br/></label><label><input type="radio" value="15" name="game"/> <b>Push</b><br/></label><label><input type="radio" value="14" name="game"/> <b>Splitter 2</b><br/></label><label><input type="radio" value="10" name="game"/> <b>The Space Game</b><br/></label><label><input type="radio" value="16" name="game"/> <b>TSG Missions</b><br/></label><label><input type="radio" value="17" name="game"/> <b>TSG: MJ (Hidden!)</b><br/></label><label><input type="radio" value="12" name="game"/><b>dummygame (Hidden!)</b><br/></label><label><input type="radio" value="18" name="game"/><b>Kong Test (Hidden!)</b><br/></label><label><input type="radio" value="19" name="game"/><b>Desktop Creatures (Hidden!)</b><br/></label><label><input type="radio" value="20" name="game"/><b>The Pirate Game (Hidden!)</b><br/></label><br/><p>Brought to you by <a href="http://www.casualcollective.com/#profiles/Coolperson1414">Coolperson1414</a> and <a href="http://www.casualcollective.com/#profiles/zarato>zarato</a>!</p>'

      

                }


   if (onPage[0] == 'account' && onPage[1] == 'messages')    {

var name = document.getElementById('userbox').firstChild.childNodes[1].innerHTML;

var youreSelf = document.createElement('option');

youreSelf.value = name;youreSelf.innerHTML = name;

document.getElementById('am_send_to').appendChild(youreSelf);}



	}




var ajaxloadHide = unsafeWindow.ccHistory.hideLoad

unsafeWindow.ccHistory.hideLoad = function() {
		window.setTimeout(function() {runCCPlus_page()}, 50) // Give enough time for page to update
		return ajaxloadHide.apply(unsafeWindow.ccHistory)
	}
}