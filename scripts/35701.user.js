// ==UserScript==
// @name Kolorowanie sojuszy i graczy w OGame
// @namespace http://potwor.vot.pl/prj/greasemonkey/ogame/kolorowanie/
// @description Skrypt koloruje wybrane sojusze w podglądzie galaktyki, dzieki czemu nie zaatakujemy tych, których nie chcemy
// @include http://*.ogame.onet.pl/game/*
// ==/UserScript==
// (c) by potwor, www.potwor.vot.pl
Array.prototype.inArray = function(v){
  for(var i in this){
    if(this[i] == v){
      return true;}
    }
  return false;
}
	var uni = document.location.href.substring(7,document.location.href.search('.ogame.onet.pl'));
	function zapiszUstawienia()
	{
		GM_setValue(uni+'-1',document.getElementById('kolorowaniesojuszy1').value);
		GM_setValue(uni+'-2',document.getElementById('kolorowaniesojuszy2').value);
		alert('Zapisano!');
	}
	if (document.location.href.search('page=options')>-1)
	{
		var table = document.getElementsByTagName('table');
		var i = 0;
		while (i<table.length)
		{
			if (table[i].getElementsByTagName('form').length>0)
			{
				table = table[i];
				break;
			}
			i++
		}
		var tr = document.createElement('tr');
		table.appendChild(tr);
		tr.innerHTML = '<td class="c" colspan="2">Kolorowanie sojuszy i graczy / (c) by potwor, v 0.1b</td>';
		var tr = document.createElement('tr');
		table.appendChild(tr);
		tr.innerHTML = '<th>Wypisz przyjacielskie sojusze<br><u>oddziel znakiem <b>;</b></u></th>'
			+'<th><input id="kolorowaniesojuszy1" value="'+GM_getValue(uni+'-1','')+'"></input></th>';
		var tr = document.createElement('tr');
		table.appendChild(tr);
		tr.innerHTML = '<th>Wypisz wrogie sojusze<br><u>oddziel znakiem <b>;</b></u></th>'
			+'<th><input id="kolorowaniesojuszy2" value="'+GM_getValue(uni+'-2','')+'"></input></th>';
		var tr = document.createElement('tr');
		table.appendChild(tr);
		tr.innerHTML = '<th colspan="2"><input id="kolorowaniesojuszysubmit" type="submit" value="Zapisz zmiany"></input></th>';
		
		document.getElementById('kolorowaniesojuszysubmit').addEventListener("click", zapiszUstawienia, true);
	} else if (document.location.href.search('page=galaxy')>-1)
	{
		var table = document.getElementsByTagName('table');
		var i = 0;
		while (i<table.length)
		{
			if ((table[i].innerHTML.search('Układ Słoneczny')>-1)&&(table[i].innerHTML.search('Planeta')>-1)&&(table[i].innerHTML.search('Sojusz')>-1))
			{
				table = table[i];
				break;
			}
			i++
		}
		i = 6;
		var th = table.getElementsByTagName('th');
	//	alert(th[21].innerHTML);
		while (i<th.length)
		{
			try
			{
				x = th[i].getElementsByTagName('a')[0].innerHTML.replace('\n','');
				x = x.substring(3,x.length-1);
				if (GM_getValue(uni+'-1','').split(';').inArray(x))
				{
					th[i].style.setProperty('border-color','green',null);
					th[i].style.setProperty('border-width','2px',null);
					th[i].style.setProperty('border-style','solid',null);
				}
				if (GM_getValue(uni+'-2','').split(';').inArray(x))
				{
					th[i].style.setProperty('border-color','red',null);
					th[i].style.setProperty('border-width','2px',null);
					th[i].style.setProperty('border-style','solid',null);
				}
			} catch (e) {}
			i=i+8;
		}
	}