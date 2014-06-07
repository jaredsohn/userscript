// ==UserScript==
// @name                Nukezone Bank Final Interest
// @namespace           noes
// @description         Adds a column that shows you the total future value of your moneys
// @include             http://www.nukezone.nu/bank.asp*
// ==/UserScript==


var trs = document.getElementsByTagName('tr');
var headercheck = 0;
var baseinterest;

var bs = document.getElementsByTagName('b');
for (var j=0;j<bs.length;j++)
{
	var b = bs[j];
	if (b.innerHTML.search('%') != -1)
	{
		baseinterest = b.innerHTML;
		baseinterest = baseinterest.replace('%', '');
		baseinterest = baseinterest.replace('.', '');
		baseinterest /= 100;
	}
}
for (var i=0;i<trs.length;i++)
{
	var tr = trs[i];
	if (tr.getAttribute('class') == 'header' && headercheck == 0)
	{
		headercheck++;
		var tds = tr.getElementsByTagName('td');
		var expectedvalueheader = document.createElement('td');
		expectedvalueheader.innerHTML = 'Expected';
		expectedvalueheader.setAttribute('align', 'center');
		tr.insertBefore(expectedvalueheader, tds[3]);
		i++;
		tr = trs[i];
		var newAttribute;
		var deposit;
		var interest;
		var days;
		var totalvalue;
		while (tr.getAttribute('class') != 'header')
		{
			tds = tr.getElementsByTagName('td');
			newAttribute  = document.createElement('td');
			newAttribute.setAttribute('align', 'center');
			
			interest = tds[3].innerHTML;
			deposit = tds[1].innerHTML;

			interest = interest.replace('%', '');
			interest = interest.replace('.', '');
			interest /= 100;
			
			deposit = deposit.replace('&nbsp;', '');
			deposit = deposit.replace('&nbsp;', '');
			deposit = deposit.replace('&nbsp;', '');
			deposit = deposit.replace('$', '');

			days = Math.round((interest - baseinterest) * 10 + 4);
			
			totalvalue = Math.round(deposit * Math.pow(((100 + interest) / 100), days));
			totalvalue = totalvalue.toString();
			var valuelength = totalvalue.length;
			valuelength -= 3;
			while (valuelength > 0)
			{
				totalvalue = totalvalue.substring(0, valuelength) + " " + totalvalue.substring(valuelength);
				valuelength -= 3;
			}
			totalvalue = '$' + totalvalue;
			newAttribute.innerHTML = totalvalue;
			tr.insertBefore(newAttribute, tds[3]);
			i++;
			tr = trs[i];
		}
		tds = tr.getElementsByTagName('td')[0];
		tds.setAttribute('colspan', '7');
	}
}