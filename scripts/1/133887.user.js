// ==UserScript==
// @name           Simulateur v 4.1
// @namespace      vulca && Coshikipix for V4.0
// @include        http://websim.speedsim.net/*
// @include        http://drago-sim.com*
// ==/UserScript==


// 43 : pas inscrit assez tot, truc invalide
// 108 laro ?

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
		
var cout= new Array(	4 , 	12, 	4, 	10, 	29, 	60, 	40, 	18, 	0, 	90 , 	0, 	125, 	10000, 	85 , 	0,	0, 	0, 	0, 	0, 	0, 	0, 	0);
var ratio = new Array(	 0.25, 	0.25, 	1,	1,		1	,	1,		0.25,	0.25,	0.25,	1,	0,		1,		1	,	1, 		1,	1,	1,	1,		1,	1,		1,		1 );
	
function speedsim3()
{
	var coutDef = 0;
	var coutAtt = 0;
	var nb=0;
	
	
	for (var i =0 ; i<21 ; i++)
	{
		nb= document.getElementsByName('ship_d_'+i+'_b')[0].value;
		
		nb = nb=='' ? 0 : parseInt(nb) ;
		coutDef+= nb*cout[i] *ratio[i];
		
		if(document.getElementsByName('ship_a_'+i+'_b')[0])
		{
			nb= document.getElementsByName('ship_a_'+i+'_b')[0].value;
			
			nb = nb=='' ? 0 : parseInt(nb) ;
			coutAtt+= nb*cout[i] *ratio[i];
		}
		
		
		var taux = (coutDef ==0 ? 0 : parseInt(coutAtt/  coutDef*100)/100);
		var couleur = 'FF9900';
		
		if(taux<3) couleur = '00FF00';
		else if(taux>5) couleur = 'FF0000';
		
		
		
		document.getElementById('shiptable').getElementsByTagName('th')[0].innerHTML = '<span float:"left" style="color:#'+couleur+';" > A: '+addPoints(coutAtt) +' <br/> D: '+ addPoints(coutDef) + '</br> => '+ taux+"</span>";
		
	}
	//alert(coutDef)
}


function dragoSim3()
{
	var coutDef = 0;
	var coutAtt = 0;
	var nb=0;
	var n=0;
	
	var input=document.getElementsByClassName('maintable')[0].getElementsByClassName('number')
	var attaquant =  true;
	for (var i =6 ; i<41 ; i++)
	{
		nb= input[i].value;
		nb = nb=='' ? 0 : parseInt(nb) ;
		
		if(i<26) attaquant = (i%2==0)
		else if(i<33) attaquant = (i%2==1)
		else attaquant = false;
		
		if(attaquant) coutAtt+= nb*cout[n] *ratio[n];
		else 
		{	
			coutDef+= nb*cout[n] *ratio[n];
			n++;
		}
		
	//	if(attaquant) input[i].style.backgroundColor="#00FFFF"
		//else input[i].style.backgroundColor="#FFFF00"
		
	
	}
		
		var taux = (coutDef ==0 ? 0 : parseInt(coutAtt/  coutDef*1000)/1000);
		var couleur = 'FF9900';
		
		if(taux<3) couleur = '00FF00';
		else if(taux>5) couleur = 'FF0000';
		
		var tr = document.getElementsByClassName('maintable')[0].getElementsByTagName('tr');
		tr[7].getElementsByTagName('td')[0].innerHTML = '<b>Flotte <br/><span float:"left" style="color:#'+couleur+';" > A: '+addPoints(coutAtt) +' <br/> D: '+ addPoints(coutDef) + '</br> => '+ taux+"</span></b>";
		
	
	
	
	
}

if(/drago-sim/.test(location.href)) setInterval(dragoSim3, 500);
if(/speedsim/.test(location.href))setInterval(speedsim3, 500);