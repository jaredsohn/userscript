// ==UserScript==
// @name          LTM 1.5
// @namespace     http://airrivalspl.comastuff.com/
// @description   checking MH
// @include       http://logtool.airrivals.de/logs/memhack
// @include       http://logtool.airrivals.de/logs/memhack/*
// ==/UserScript==

	function color()
	{
		var arTableRows = document.getElementsByTagName('tr');
		var bHighlight = true;
		for (var j = arTableRows.length - 1; j >= 0; j--) {
			var elmRow = arTableRows[j];
			elmRow.style.backgroundColor = bHighlight ? '#ddd' : '#fff';
			elmRow.style.color = '#000';
			bHighlight = !bHighlight;
		}
		
		return(arTableRows.length - 1);
	} 
	function check (e)
	{
	
	var end = e;
	//alert(end);
	var hax = 0;
	var nick = new Array();
	var hnick;
	for ( var i=2; i<end; i++ )
	{
		var chec = document.evaluate( '(//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[10])', document, null, XPathResult.ANY_TYPE, null ); 
		var thischec = chec.iterateNext();
		while (thischec) {
		if( (parseFloat(thischec.textContent)===3) ||(parseFloat(thischec.textContent)===4) ||(parseFloat(thischec.textContent)===9)||(parseFloat(thischec.textContent)===14))
		{
			var org = document.evaluate( '(//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[11])', document, null, XPathResult.ANY_TYPE, null );  
			var thisorg = org.iterateNext();
			var usr = document.evaluate( '(//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[12])', document, null, XPathResult.ANY_TYPE, null ); 
			var thisusr = usr.iterateNext();
			while (thisorg && thisusr) {
			if( thisorg.textContent>thisusr.textContent)
			{
				var j=0;
				if (nick.length-1<0)
				{
					nick[j] = (i); 
				}
				else
				{
					j = nick.length;
					nick[j] = (i);
				}
				hax=hax+1;
			}		
		thisorg = org.iterateNext();
		thisusr = usr.iterateNext();
		}
	}
	else if( (thischec.textContent===1) ||(thischec.textContent===2) ||(parseFloat(thischec.textContent)===5)||(parseFloat(thischec.textContent)===6)||(parseFloat(thischec.textContent)===7)||(parseFloat(thischec.textContent)===8)||(parseFloat(thischec.textContent)===10)||(parseFloat(thischec.textContent)===11)||(parseFloat(thischec.textContent)===12)||(parseFloat(thischec.textContent)===13))
	{
		var org = document.evaluate( '(//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[11])', document, null, XPathResult.ANY_TYPE, null );  
		var thisorg = org.iterateNext();
		var usr = document.evaluate( '(//html/body/div[2]/div[2]/div[2]/table/tbody/tr['+i+']/td[12])', document, null, XPathResult.ANY_TYPE, null ); 
		var thisusr = usr.iterateNext();
		while (thisorg && thisusr) {
		if( thisorg.textContent<thisusr.textContent)
		{	
				var j=0;
				if (nick.length-1<0)
				{
					nick[j] = (i); 
				}
				else
				{
					j = nick.length;
					nick[j] = (i);
				}
			hax=hax+1;
		}		
		thisorg = org.iterateNext();
		thisusr = usr.iterateNext();
		}	
	}
	thischec = chec.iterateNext();
	}
	}	 
	if(hax==0)
	{
		alert('Brak hackerow');
	}
	else
	{
	//for (i=0; i<nick.length;i++)
	{
		alert('Znaleziono podejrzanych wpisów: '+hax+'\n');
		//+nick[i]+'\n');
	}
	}
	
	hnick = document.getElementsByTagName('tr');
	for (j=0; j<nick.length-1;j++)
	{
	
		var ehnick = hnick[nick[j]+1];
		ehnick.style.backgroundColor = 'red';
		//ehnick.style.color = 'red';
	}
	
	}
//////
//hatetepe://host.domena/skrypt.php?number=wartosc
var e = color();
check(e);