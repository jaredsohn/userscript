// ==UserScript==
// @name           SHOW PHP TIME
// @namespace      http://userscripts.org/scripts/show/56549
// @description    Show PHP time.
// @include        *
// ==/UserScript==

function formatDate(date)
{
	return date.getDate() + '/' + (date.getMonth()+1) + '/' + (1900+date.getYear()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

function isNum(str)
{
	var i=0;
	for (i=0; i<str.length; i++)
		if (str[i] < '0' || str[i] > '9')
			return false;
	return (str.length > 0);
}

if ( document.location.href.indexOf('test.php') > -1)
{
	var lines = document.body.innerHTML.split('\n');

	var newdoc = '';

	var i=0;
	for (line in lines) {
		var tokens = lines[i].split(' ');
		var lasttoken = tokens[tokens.length-1];
		//alert(lasttoken + " " + isNum(lasttoken));
		if (lasttoken.length == 10 && isNum(lasttoken) && parseInt(lasttoken)>1000000000)
		{
			newdoc += lines[i] + ' [' + formatDate(new Date(lasttoken*1000)) + ']\n';
		}
		else
			newdoc += lines[i] + '\n';
		i++;
	}
	document.body.innerHTML = newdoc;
}