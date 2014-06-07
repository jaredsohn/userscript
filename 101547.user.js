// ==UserScript==
// @author Gunz
// @name Go to the first tribalwars
// @namespace http://www.tw-ar.com/
// @include http://ae*.tribalwars.ae/game.php?*screen=ranking*
// @include http://ae*.tribalwars.ae/guest.php?*screen=ranking*
// ==/UserScript==

function gotofirst() {

	var tdata = document.createElement('td');
	var a = document.createElement('a');
	var tdata2 = document.createElement('td');
	var a2 = document.createElement('a');

	if (document.URL.indexOf('from=') == -1) 
	{
		a.setAttribute('href',document.URL+'&from=1');
	}
	else
	{
		a.setAttribute('href',document.URL.substr(0,document.URL.indexOf('from='))+'from=1');
	}
	
	a.appendChild(document.createTextNode("إذهب الى الاول بالترتيب"));
	a2.appendChild(document.createTextNode("Www.TW-Ar.com"));
	a2.setAttribute('href',document.URL.substr(0,document.URL.indexOf('ae/g')+3)+'redir.php?url=http%3A%2F%2FWWW.TW-Ar.com');
	tdata.appendChild(a);
	tdata.setAttribute('style', 'white-space:nowrap; text-align:center; width:50%;');
	tdata2.appendChild(a2);
	tdata2.setAttribute('style', 'white-space:nowrap; text-align:center; ');
	var x = 0;
	var y = 0;
	if (document.URL.indexOf('mode=kill') == -1) x = 0; else x = 1;
	if (document.URL.indexOf('guest.php') == -1) y = 0; else y = 1;
	var tab = document.getElementsByClassName('vis')[2+x+y];
	var tr = document.createElement('tr');
	tr.appendChild(tdata);
	tr.appendChild(tdata2);
	tab.appendChild(tr);
	

};
gotofirst();