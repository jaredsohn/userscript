// ==UserScript==
// @name           bulubulubulu
// @description    ek$i sozluk gunun basliklari bulutu
// @author         jnothing
// @version        1.0
// @include        http://www.eksisozluk.com/index.asp?a=td*
// @include        http://eksisozluk.com/index.asp?a=td*
// @include        http://sozluk.sourtimes.org/index.asp?a=td*
// @include        http://sourtimes.org/index.asp?a=td*
// @include        http://www.sourtimes.org/index.asp?a=td*
// @include        http://84.44.114.44/index.asp?a=td*

// ==/UserScript==

	

	
	
	var icerik=document.body.innerHTML;
	document.body.innerHTML='<a href=# onClick="if (document.getElementById(\'bulut\').style.display==\'inline\' ) document.getElementById(\'bulut\').style.display=\'none\'; else document.getElementById(\'bulut\').style.display=\'inline\';"><strong>bulubulubulu</strong><br></a><div id=bulut  style="display:none;"></div>'+document.body.innerHTML;
	var parca=new Array();
	parca=icerik.split('><a');
parca.sort();
	var selcenSayisi;
	var enBuyuk=0;
	var enKucuk=0;
	var baslik;
	var eklenecek;



	for(var i=2;i<53;i++)
	{
	
		
		if(obj=parca[i]!=null)
		{
			if(parca[i].indexOf('&nbsp;(')>0)
			 selcenSayisi=parseInt(parca[i].substring( parca[i].indexOf('&nbsp;(')+7, parca[i].indexOf(')&nbsp;') ));
			else
			selcenSayisi=0;
			
			if(enBuyuk<=selcenSayisi)
				enBuyuk=selcenSayisi;
				
			if(enKucuk>=selcenSayisi)
				enKucuk=selcenSayisi;
		}
	}
	
	var fark=enBuyuk-enKucuk;

	if(fark<3)
	fark=fark*3;
	
	for(var ke=2;ke<53;ke++)
	{
		if(obj=parca[ke]!=null)
		{
			if(parca[ke].indexOf('&nbsp;(')>0)
				selcenSayisi=parseInt(parca[ke].substring( parca[ke].indexOf('&nbsp;(')+7, parca[ke].indexOf(')&nbsp;') ));
				else
			selcenSayisi=1;
		
			eklenecek=parseInt((20/fark)+selcenSayisi)+5;

			

			baslik=parca[ke].substring( parca[ke].indexOf('in">')+4, parca[ke].indexOf('</a>') );
			document.getElementById('bulut').innerHTML+='<span style="font: '+eklenecek+'pt Verdana, sans-serif; "><a style=" text-decoration:none" target="sozmain" href="http://sozluk.sourtimes.org/show.asp?t='+baslik+'&a=td">'+baslik+'</a> </span>';

		}	
		
		
	}	
			
	

		
			
			
	
	