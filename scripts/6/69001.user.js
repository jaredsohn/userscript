
// ==UserScript==
// @name           Calculette
// @namespace      vulca
// @version        0.3
// @author         Vulca
// @description    Calculatrice pour le commerce 
// @include       http://*.ogame.*/game/index.php*
// ==/UserScript==
if (document.getElementById('playerName')) // Si c'est un univers Redesign
{		
		function addPoints(nombre)
		{
			if (nombre<1000) {return nombre;} 
			else 
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
		}
		
		
	function ResEchange(numResVente)
	{
		if(numResVente==0) var resEchange = 'Cristal/Deut';
		else if(numResVente==1) var resEchange = 'Metal/Deut';
		else if(numResVente==2) var resEchange = 'Metal/Cristal';	
		
		return resEchange;
	}

function affclaculatrice(res)
{
	var affi = '<div style="text-align:center;">Taux : <input class="tauxCalc" value="2" size="1" style="border: solid black 1px;" type="text" > <input size="1"  class="tauxCalc" value="1.5" style="border: solid black 1px;" type="text" ><input size="1" class="tauxCalc" value="1" style="border: solid black 1px;" type="text" >';
	affi+= '<br/><br/>Quantité<br/> <input class="tauxCalc" style="border: solid black 1px;"  type="text" >' 
	affi+= '<input class="tauxCalc" value="'+res+'" style="border: solid black 1px; display:none;"  type="text" >' 
	
	var resEchange = ResEchange(res); 
	
	affi+= '<br/><br/>Pourcentage '+resEchange+'<br/><input class="tauxCalc" value="50" style="border: solid black 1px;" type="text" >' 
	affi+='<input id="ClickCalc" value="Calculez" style="border: solid black 1px;" type="button" ></div>' 
	
	document.getElementById('inhalt').innerHTML = affi;
	document.getElementById('ClickCalc').addEventListener("click", function(event) 
	{
		claculatrice();
	}, true);

}

function claculatrice()
{
	var ressourceName = new Array('Métal','Cristal', 'Deut');
	var taux = new Array(document.getElementsByClassName('tauxCalc')[0].value,document.getElementsByClassName('tauxCalc')[1].value, document.getElementsByClassName('tauxCalc')[2].value);
	var pourcent = new Array(document.getElementsByClassName('tauxCalc')[5].value/100, 1-document.getElementsByClassName('tauxCalc')[5].value/100);
	var Ressource = new Array(0,0,0);
	var numResVente = parseInt(document.getElementsByClassName('tauxCalc')[4].value);
	
	var resEchange = ResEchange(numResVente);
	
	Ressource[numResVente] = document.getElementsByClassName('tauxCalc')[3].value * 1;
	var f=0;
	var affichage = '<br/><div>Taux d\'échange : '+taux.join('/')+'<br/>Pourcentage '+resEchange + ' : '+pourcent[0]+'<br/><br/><br/>Vous vendez : <strong>'+ addPoints(parseInt(Ressource[numResVente])) +'</strong> de '+ressourceName[numResVente]+ ' ( '+Math.ceil(Ressource[numResVente]/25000) +' GT ou ' +Math.ceil(Ressource[numResVente]/5000)+' PT) <br/><br/>';
	affichage+= 'Vous recevez : <br/>'
	
	var GT=0;
	var PT = 0;
	var resTot = 0;
	
	for(var i=0; i<3; i++)
	{
		if(i != numResVente)
		{
			Ressource[i] = Ressource[numResVente]*pourcent[f]*taux[i]/taux[numResVente];
			f++;
			affichage +=  '<strong> '+addPoints(parseInt(Ressource[i]))+ ' </strong>de '+ ' de '+ressourceName[i]+ ' ( '+Math.ceil(Ressource[i]/25000) +' GT ou ' +Math.ceil(Ressource[i]/5000)+' PT) <br/>';
			GT+=Ressource[i]/25000;
			PT+=Ressource[i]/5000;
			resTot+=Ressource[i];
		}
		
	}
	affichage +=  '<br/>Total : <strong> '+addPoints(parseInt(resTot))+ ' </strong> ( '+Math.ceil(GT) +' GT ou ' +Math.ceil(PT)+' PT) <br/>';
			
	document.getElementById('inhalt').innerHTML +=affichage+'</div>' ;
}



	var aff_bouton ='<li><span class="menu_icon"><img class="mouseSwitch" src="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" rel="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" height="29" width="38"></span><a id="Calculette" class="menubutton " href="#" accesskey="" target="_self">';

	aff_bouton += '<span class="textlabel">Calculette</span></a></li>';
				
	var sp1 = document.createElement("span");
	sp1.setAttribute("id", "Calc");
	var sp1_content = document.createTextNode('');
	sp1.appendChild(sp1_content);				
	
	var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
	var parentDiv = sp2.parentNode;
	parentDiv.insertBefore(sp1, sp2.nextSibling);
	var tableau = document.createElement("span");
	tableau.innerHTML = aff_bouton;
	document.getElementById('Calc').insertBefore(tableau, document.getElementById('Calc').firstChild);
	
	document.getElementById('Calculette').addEventListener("click", function(event) 
	{
		var aff=' <div style="text-align:center;"><br/> <br/> <br/> <br/> <br/>que veux tu échanger ?  <br/><br/> <br/> <br/><input value="Métal" style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" id="CalcMetal">  <input style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" value="Cristal" id="CalcCristal">  <input value="Deut" style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" id="CalcDeut"></div> ';
		
		document.getElementById('inhalt').innerHTML = aff ;
		
		document.getElementById('CalcMetal').addEventListener("click", function(event) 
		{
			affclaculatrice(0);
		}, true);
		document.getElementById('CalcCristal').addEventListener("click", function(event) 
		{
			affclaculatrice(1);
		}, true);
		document.getElementById('CalcDeut').addEventListener("click", function(event) 
		{
			affclaculatrice(2);
		}, true);

		
		
	}, true);
	
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	