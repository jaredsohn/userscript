// ==UserScript==
// @name           Topcoder
// @namespace      http://www.alagu.net/
// @include        http://www.topcoder.com/stat*
// ==/UserScript==

var sp = document.location.search;
var finaltitle;


if(sp.search('problem_statement') != -1) {
	var title = document.getElementsByTagName('h3')[1].parentNode.parentNode.parentNode.childNodes[4].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerHTML ;
	finaltitle = title + ' :: TPS :: TopCoder Problem Statement'; 
}
else if(sp.search('round_overview') != -1) {
	var options = document.getElementsByTagName('select')[0].getElementsByTagName('option');
	var selectedoption = null;
	for(i=0;i<options.length; i++)
	{
		if(options[i].hasAttribute('selected')) {
			selectedoption = options[i];
			break;
		}
	}
	var text = selectedoption.innerHTML;
	var title = 'Unknown :: TCM :: Topcoder Match Overview';
	if(text.search('Single Round Match') != -1) {
	var SRM  = text.substr(19,3);
	title = 'SRM'+SRM+' :: TCM :: Topcoder Match Overview';
	}
	finaltitle = title;
}
document.title = finaltitle;
