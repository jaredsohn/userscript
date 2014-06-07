// ==UserScript==
// @name        iburst.co.za Network Status Enhancer
// @namespace   http://nerve.org.za/
// @description Adds base station information to the iburst.co.za Network Status page
// @grant		none
// @include     http://www.iburst.co.za/neuvo.aspx?link=service_support_network
// @version     1.1
// ==/UserScript==
(function() {

var basestations, allrows, thisrow;

basestations = [['Goodwood ', 'http://goo.gl/maps/l31M2', 'Mark Heights, Townsend Estate', '3'],
['Tokai ', 'http://goo.gl/maps/sV99g', 'Telkom Technical Services, Steenberg', '24'],
['Ashwood ', 'http://goo.gl/maps/TJHbD', 'Ashwood Centre, Parklands', ' '],
['Table View ', 'http://goo.gl/maps/3A5Gi', 'Blouberg Heights, Bloubergstrand', ' '],
['Melkbosstrand ', 'http://goo.gl/maps/PTrWM', 'Telkom, Melkbosstrand', ' '],
['Milnerton ', 'http://goo.gl/maps/Wp5Cs', 'PPC Cement, Montague Gardens', '16'],
['Parow North ', 'http://goo.gl/maps/IK5wx', 'Protea Park, Parow North', '17'],
['Parow ', 'http://goo.gl/maps/utyrn', 'Tygerberg Park, Parow', '10'],
['Plumstead ', 'http://goo.gl/maps/fQHmy', 'Culmwood Gardens, Plumstead', ' '],
['Pinelands ', 'http://goo.gl/maps/G2v2q', 'Garden City Heights, Pinelands', '15']];

allrows = document.getElementsByTagName('tr');
for (var i = 0; i < allrows.length; i++) {
	thisrow = allrows[i];
	for (var j = 0; j < basestations.length; j++) {
		if (thisrow.childNodes[0].textContent == basestations[j][0]) {
			thisrow.childNodes[2].innerHTML =
				'<a target="_blank" href="' + basestations[j][1] +'">' + basestations[j][2] + '</a>';
			thisrow.childNodes[3].textContent = basestations[j][3];
		}
	}
}

})();
