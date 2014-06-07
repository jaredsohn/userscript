// ==UserScript==
// @name           Ogame_ResViewer
// @namespace      vulca / modifié par la faucille
// @include        http://*/game/*
// ==/UserScript==

var start_time = (new Date()).getTime();

var url = location.href;
	var DATA = unsafeWindow.ifcDATA;
	var serveur = DATA.info.serveur;
	var numPla = DATA.info.numeroPlanete;

var newElement = document.createElement("div"); 
		newElement.setAttribute("id","OgResVie");	
	document.getElementById('newDivIFC').appendChild(newElement);
	
	setInterval(aa, 3000);
		
	function addPoints(nombre)
		{
			
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			
		}
	
	var metal = document.getElementById('resources_metal').innerHTML.replace( /[^0-9-]/g, "") ;
	var cristal = document.getElementById('resources_crystal').innerHTML.replace( /[^0-9-]/g, "") ;
	var deut = document.getElementById('resources_deuterium').innerHTML.replace( /[^0-9-]/g, "");

	var f=0	;
	for ( var i=0; i< DATA.planet.length ; i++) 
	{				
		if (DATA.planet[i].moon == 'false')
		{
			if (i== numPla) var coord = document.getElementsByClassName('planet-koords')[f].innerHTML;
		}
		else if (i== numPla)
					var coord = 'L'+document.getElementsByClassName('planet-koords')[f-1].innerHTML;
		
			if (DATA.planet[i].moon == 'false')
			{f++;}

	}
		
	GM_setValue('resPla'+coord, start_time+'|'+metal+'|'+cristal+'|'+deut );
		
var background2 = 'data:image/gif;base64,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';

	
	function aa()
	{var start_time = (new Date()).getTime();
		var DATA = unsafeWindow.ifcDATA;
	var totMet = 0;
	var totCry = 0;
	var totDeut = 0;
	var table = '<table style=" margin-left:auto; margin-right:auto;" background="'+background2+'" ><tr><td style="border:solid gold 1px;"align="center">Lune<img border="0" src="/game/img/planets/moon/moon_2_small.gif"><->Planètes<img border="0" src="/game/img/planets/dry_4_1.gif">[coords]</td><td style="border:solid gray 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_metall.gif">-----Métal</td><td style="border:solid DodgerBlue 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_kristal.gif">----Cristal</td><td style="border:solid Aquamarine 1px;""align="center"><img border="0" src="/game/img/layout/ressourcen_deuterium.gif">Deutérium</td></tr>';
	
	//<img border="0" src="/game/img/planets/moon/moon_3_small.gif">
	//<img border="0" src="/game/img/planets/normal_1_1.gif">
	
	var f=0	;
	for ( var i=0; i< DATA.planet.length; i++) 
	{		

		var coord = document.getElementsByClassName('planet-koords')[f].innerHTML;
	if(i < DATA.planet.length -1) {if (DATA.planet[i+1].moon == 'false') f++;}
	
		if (DATA.planet[i].moon == 'false') 
		{
			
			var res = GM_getValue('resPla'+coord, start_time+'|0|0|0' ).split('|');
			var nivCEF = DATA.planet[i].building['cef'] ;
			
			//alert(res);
			var Met = parseInt(res[1]) + (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.m ;
			var Cry = parseInt(res[2]) + (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.c ;
			var Deut = parseInt(res[3]) + (start_time-res[0])/(1000*3600)*(DATA.planet[i].resource.prod.d - 10*nivCEF*Math.pow(1,1,nivCEF)) ;
			
			table +='<tr><td style="border:solid darkblue 1px;"align="right""><font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;""align="right">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td></tr>';
			
			totMet += Met;
			totCry += Cry ;
			totDeut += Deut;
			
		//	alert(parseInt(res[1]) +'  '+ (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.m );
		}
		else 
		{
			
			coord = 'L'+coord;
			var res = GM_getValue('resPla'+coord, start_time+'|0|0|0' ).split('|');
			
			totMet += parseInt(res[1]);
			totCry += parseInt(res[2]);
			totDeut += parseInt(res[3]);
			
			table +='<tr><td style="border:solid DodgerBlue 1px;">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;">'+addPoints(res[1])+'</td><td style="border:solid DodgerBlue 1px;">'+addPoints(res[2])+'</td><td style="border:solid aquamarine 1px;">'+addPoints(res[3])+'</td></tr>';
			
		}
	}
			
		
			document.getElementById('OgResVie').innerHTML = '<center><font size="3" face="arial" color="gold"><img border="0" src="/game/img/planets/moon/moon_3_small.gif"><img border="0" src="/game/img/planets/normal_1_1.gif">  ---> Totaux à quai : </font><img border="0" src="/game/img/layout/ressourcen_metall.gif"><font size="2" face="arial" color="gray">  '+addPoints(totMet)+'  |  </font><img border="0" src="/game/img/layout/ressourcen_kristal.gif"><font size="2" face="arial" color="DodgerBlue">  '+addPoints(totCry)+'  |  </font><img border="0"src="/game/img/layout/ressourcen_deuterium.gif"><font size="2" face="arial" color="Aquamarine">  '+addPoints(totDeut )+'  | </font></center>'+'<br/>'+table+'</table>';
	
	
	}
	
	