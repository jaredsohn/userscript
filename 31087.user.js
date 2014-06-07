// ==UserScript==
// @name           PolyRatings Quicklinks
// @namespace      calpoly
// @author         Hans-Peter Klett
// @license        Public Domain
// @description    Creates links out of professor labels in PASS
// @include        http://pass.calpoly.edu/workflow.do?dispatch=next&current=0&next=1
// ==/UserScript==
(function () {
window.addEventListener ('load', function () {
	var profs = [];

	var tables = document.getElementsByClassName ('main-content-table');
	for (var i = 0; i < tables.length; i++)
	{
		if (tables [i].id.match (/courses-list-\d+-\d+/))
		{
			var trs = tables [i].getElementsByTagName ('tr');
			for (var j = 0; j < trs.length; j++)
			{
				var tds = trs [j].getElementsByClassName ('table-cell-normal');
				if (tds.length)
				{
					profs.push (
						tds [4].getElementsByTagName ('span') [0]
					);
				}
				var tds = trs [j].getElementsByClassName ('table-cell-alt');
				if (tds.length)
				{
					profs.push (
						tds [4].getElementsByTagName ('span') [0]
					);
				}
			}
		}
	}

	var polyRatingsForm = document.createElement ('form');
	polyRatingsForm.action = 'http://www.polyratings.com/search.phtml';
	polyRatingsForm.method = 'post';
	polyRatingsForm.target = '_blank';

	var typeInput = document.createElement ('input');
	typeInput.type = 'hidden';
	typeInput.name = 'type';
	typeInput.value = 'ProfName';
	polyRatingsForm.appendChild (typeInput);

	var sortInput = document.createElement ('input');
	sortInput.type = 'hidden';
	sortInput.name = 'sort';
	sortInput.value = 'name';
	polyRatingsForm.appendChild (sortInput);

	var formatInput = document.createElement ('input');
	formatInput.type = 'hidden';
	formatInput.name = 'format';
	formatInput.value = 'long';
	polyRatingsForm.appendChild (formatInput);

	for (var i = 0; i < profs.length; i++)
	{
		if (profs [i].innerHTML != 'STAFF')
		{
			var profContainer = profs [i];
			var profName = profContainer.innerHTML;
			profName = profName.split (',');
			var profLastName = profName [0];
			var profFirstName = profName [1];
			profContainer.innerHTML = profFirstName;

			var thisProfForm = polyRatingsForm.cloneNode (true);

			var termsInput = document.createElement ('input');
			termsInput.type = 'submit';
			termsInput.name = 'terms';
			termsInput.id = 'terms';
			termsInput.value = profLastName;
			thisProfForm.appendChild (termsInput);

			profContainer.appendChild (thisProfForm);
		}
	}
}, false);
}) ();
