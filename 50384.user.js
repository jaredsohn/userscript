// ==UserScript==
// @name           Team Skill Page Update
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/teamSkillTree.php*
// @description   Adds a Clear Team Skills button to the Team Skills page. The button only clears the skills and does NOT reset them. To save the skills the user still has to click the Save Team Skills button. It also adds the number of skills applied toward each line in parentheses.
// ==/UserScript==

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var x, y;
for(var c = 0; c < cells.snapshotLength; c++)
{
	if(cells.snapshotItem(c).innerHTML == '<div align="center"><span class="tableHeader">Starters</span></div>')
	{
		x = c;
	}
	else if(cells.snapshotItem(c).innerHTML == '<div align="center">Bench</div>')
	{
		y = c;
	}
}

var skills = document.evaluate(
	'//input',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var j = 0, i = 1, k = 19;
if(skills.snapshotItem(0).id == "PlayerScan")
{
	j = 1;
	i = 2;
	k += j;
}

var a = i, b = i + 9, startercount = 0, benchcount = 0, d = i;
for(a; a < b; a++)
{
	startercount += skills.snapshotItem(a).value * 1;
}

for(a; a < b + 9; a++)
{
	benchcount += skills.snapshotItem(a).value * 1;
}

cells.snapshotItem(x).innerHTML = '<div align="center"><span class="tableHeader">Starters (' + startercount + ')</span></div>';
cells.snapshotItem(y).innerHTML = '<div align="center"><span class="tableHeader">Bench (' + benchcount + ')</span></div>';

var total = document.getElementById('totalPoints');
var clearbutton = document.createElement('div');
clearbutton.innerHTML = '<input type="button" id="clear" value="Clear Team Skills"></input>';
total.parentNode.insertBefore(clearbutton, total.nextSibling);
document.getElementById('clear').addEventListener('click', function()
{
	for(i; i < k; i++)
	{
		skills.snapshotItem(j).value = skills.snapshotItem(j).value * 1 + skills.snapshotItem(i).value * 1;
		skills.snapshotItem(i).value = 0;
	}
}, false);

document.addEventListener('click', function()
{
	var a = d, b = d + 9, startercount = 0, benchcount = 0;
	for(a; a < b; a++)
	{
		startercount += skills.snapshotItem(a).value * 1;
	}

	for(a; a < b + 9; a++)
	{
		benchcount += skills.snapshotItem(a).value * 1;
	}

	cells.snapshotItem(x).innerHTML = '<div align="center"><span class="tableHeader">Starters (' + startercount + ')</span></div>';
	cells.snapshotItem(y).innerHTML = '<div align="center"><span class="tableHeader">Bench (' + benchcount + ')</span></div>';
}, false);