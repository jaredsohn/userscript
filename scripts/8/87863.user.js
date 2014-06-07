// ==UserScript==
// @name           Ogame_Suma
// @namespace      vulca / modifié par la faucille
// @include        http://*ogame*
// ==/UserScript==


if ((document.location.href.indexOf('overview')!= -1) || (document.location.href.indexOf('movement2')!= -1))
{ var start_time = (new Date()).getTime();
	var tmp=0, tmp2=0, totMet2 = 0, totCry2 = 0, totDeut2 = 0, luna=0;
	url = location.href;
	var DATA = unsafeWindow.ifcDATA;
	var serveur = DATA.info.serveur;
	var numPla = DATA.info.numeroPlanete;
	var newElement = document.createElement("div"); 
	newElement.setAttribute("id","OgResVie");	
	document.getElementById('newDivIFC').appendChild(newElement);
	
function getElementsByClass(searchClass,node,tag) {
var classElements = new Array();
    if (node == null) 
        node = document;
    if (tag == null) 
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    for (var i = 0, j = 0; i < elsLen; i++) {
        var sep = els[i].className.split(" ");
        var content = false;
        for(var k = 0; k < sep.length; k++){
            if(sep[k] == searchClass) 
                content = true;        }
        if (els[i].className == searchClass || content) {
            classElements[j] = els[i];
            j++;
        }   }   return classElements;}

	function addPoints(nombre)
		{ 	var signe = '';
				if (nombre<0)
				{ 	nombre = Math.abs(nombre);
					signe = '-';	}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 	{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + ',' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join(','));				}	}
					
function getPosActual () {
    var planets = getElementsByClass("smallplanet");
    var numPlanets = planets.length;
    if(numPlanets==1) {
        var cord = getElementsByClass("planet-koords", planets[0]);
        return(cord[0].innerHTML);    }
    else {
        var planets = getElementsByClass("active");
        for (var i=0; i<planets.length; i++ ) {
            var cord = getElementsByClass("planet-koords", planets[i]);
            return cord[0].innerHTML   
        }    }}	

function luna_es(xxx)
{	
	var unsafe = window;
	try
	{		unsafe = unsafeWindow	}
	catch (e)
	{	}
	var theTitle = document.getElementById ("energy_box").title
	if (theTitle.indexOf ("(0/0)") >= 0)
		document.getElementById ("energy_box").title = theTitle.replace ("'overmark'", "''");
	var energy = document.getElementById ("antires_energy");
	if ((energy != null) && (energy.parentNode.textContent.indexOf ("0 / 0") >= 0))
		energy.parentNode.className = "";
	if (unsafe.resourceTickerMetal ["production"] > 0)
		return;
		return 1;
}

		
function aa()
	{	tmp++;
	var start_time = (new Date()).getTime();
	var DATA = unsafeWindow.ifcDATA;
	var totMet=0, totCry=0, totDeut=0, f=0;
	if (tmp==1)
	{		totMet2 = GM_getValue("totMet22");
			totCry2 = GM_getValue("totCry22");
			totDeut2 = GM_getValue("totDeut22");
	}
	var table = '<table style=" margin-left:auto; margin-right:auto;"><tr><td style="border:solid DodgerBlue 1px;"align="center">Luna<img border="0" src="/game/img/planets/moon/moon_2_small.gif"><->Planetas<img border="0" src="/game/img/planets/dry_4_1.gif"></td><td style="border:solid gray 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_metall.gif"><br> '+addPoints(totMet2)+' </td><td style="border:solid DodgerBlue 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_kristal.gif"><br> '+addPoints(totCry2)+' </td><td style="border:solid Aquamarine 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_deuterium.gif"><br> '+addPoints(totDeut2)+' </td><td style="border:solid Aquamarine 1px;"align="center""><img border="0" src="/game/img/layout/ressourcen_energie.gif">   <br> '+addPoints(totDeut2+totCry2+totMet2)+' </td></tr>';
	for ( var i=0; i< DATA.planet.length; i++) 
	{	var coord = document.getElementsByClassName('planet-koords')[f].innerHTML;
	if(i < DATA.planet.length -1) {if (DATA.planet[i+1].moon == 'false') f++;}

		if (DATA.planet[i].moon == 'false') 
		{	var res = GM_getValue('resPla'+coord, start_time+'|0|0|0' ).split('|');
			var nivCEF = DATA.planet[i].building['cef'] ;
			var Met = parseInt(res[1]) + (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.m ;
			var Cry = parseInt(res[2]) + (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.c ;
			var Deut = parseInt(res[3]) + (start_time-res[0])/(1000*3600)*(DATA.planet[i].resource.prod.d - 10*nivCEF*Math.pow(1,1,nivCEF)) ;
			var tot = Met+Cry+Deut;
			if (tmp==1) { 
			
			if (luna_es(0)==1)
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""> <font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot)+'</td></tr>';
			else
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""> ' + (getPosActual() == coord?'<font color="red"><b> >> </b></font>':'') +  ' <font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot)+'</td></tr>';						
			//table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""> ' + (getPosActual() == coord?'<font color="red"><b> >> </b></font>':'') +  ' <font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot)+'</td></tr>';
			tmp2=getPosActual();			}
			else
			if (luna_es(0)==1)
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""> <font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot)+'</td></tr>';	
				else
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""> ' + (tmp2 == coord?'<font color="red"><b> >> </b></font>':'') +  ' <font size="2" face="arial" color="gold">'+DATA.planet[i].name+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(Met)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(Cry)+'</td><td style="border:solid Aquamarine 1px;"align="right"">'+addPoints(Deut)+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot)+'</td></tr>';	
			totMet += Met;
			totCry += Cry ;
			totDeut += Deut;			}
		else 
		{ 	coord = 'L'+coord;
			var res = GM_getValue('resPla'+coord, start_time+'|0|0|0' ).split('|');
			totMet += parseInt(res[1]);
			totCry += parseInt(res[2]);
			totDeut += parseInt(res[3]);
			var tot2=parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]);
			var sin=DATA.planet[i].name.substring(DATA.planet[i].name.indexOf("Cambiar")+9, DATA.planet[i].name.length);
			if (luna_es(0)==1)
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""><img border="0" src="/game/img/planets/moon/moon_2_small.gif"> ' + ('L'+getPosActual() == coord?'<font color="red"><b> >> </b></font>':'') +  ' <font size="2" face="arial" color="gold">'+sin+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(res[1])+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(res[2])+'</td><td style="border:solid aquamarine 1px;"align="right"">'+addPoints(res[3])+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot2)+'</td></tr>';
			else
			table +='<tr><td style="border:solid DodgerBlue 1px;"align="right""><img border="0" src="/game/img/planets/moon/moon_2_small.gif">  <font size="2" face="arial" color="gold">'+sin+'</td><td style="border:solid gray 1px;"align="right"">'+addPoints(res[1])+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(res[2])+'</td><td style="border:solid aquamarine 1px;"align="right"">'+addPoints(res[3])+'</td><td style="border:solid DodgerBlue 1px;"align="right"">'+addPoints(tot2)+'</td></tr>';
		}	}
			totMet2=totMet;
			totCry2=totCry;
			totDeut2=totDeut;
			if (tmp % 5 == 0)
			{ 	GM_setValue('totMet22',parseInt(totMet2));
			GM_setValue('totCry22',parseInt(totCry2));
			GM_setValue('totDeut22',parseInt(totDeut2)); }
			document.getElementById('OgResVie').innerHTML = table;	}
	setInterval(aa, 2600);		
		
	var metal = document.getElementById('resources_metal').innerHTML.replace( /[^0-9-]/g, "") ;
	var cristal = document.getElementById('resources_crystal').innerHTML.replace( /[^0-9-]/g, "") ;
	var deut = document.getElementById('resources_deuterium').innerHTML.replace( /[^0-9-]/g, "");
	var f=0	;
	for ( var i=0; i< DATA.planet.length ; i++) 
	{	if (DATA.planet[i].moon == 'false')
		{	if (i== numPla) var coord = document.getElementsByClassName('planet-koords')[f].innerHTML; 		}
		else if (i== numPla)
				var coord = 'L'+document.getElementsByClassName('planet-koords')[f-1].innerHTML;
			if (DATA.planet[i].moon == 'false')
			{f++;} 	}
	GM_setValue('resPla'+coord, start_time+'|'+metal+'|'+cristal+'|'+deut ); }