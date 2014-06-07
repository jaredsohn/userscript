
// ==UserScript==
// @name           Calculadora
// @namespace      vulca
// @version        0.2
// @author         Vulca
// @description    Calculatrice pour le commerce 
// @include       http://*.ogame.*/game/index.php*
// ==/UserScript==
  
 
 
 ////anotaciones
 
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

function hacecalculo(res)
{
	
	var div = document.createElement("div");
	div.className = "content-box-s";
	var divHeader = document.createElement("div");
	divHeader.className = "header"
	divHeader.innerHTML = "<h3>calculator</h3>";
	var divContent = document.createElement("div");
	divContent.className = "content";
	divContent.style.textAlign = "center";
	divContent.innerHTML = '<form name="myform" onSubmit="return false;" 			onkeypress="if(event.keyCode==13){myform.display.value=eval(myform.display.value);}"><input type="text" name="display" size="20"><font 	color="#FFFFFF"> <input type="button" value="   =   " onClick="myform.display.value=eval(myform.display.value)"></font></form>';
	var divFooter = document.createElement("div");
	divFooter.className = "footer";
	div.appendChild(divHeader);
	div.appendChild(divContent);
	div.appendChild(divFooter);
	document.getElementById("star").parentNode.replaceChild(div,document.getElementById("star"));
	div.setAttribute("style","position:relative; left:0px; top:7px");

	var affi = '<div style="text-align:center;">Ratio de Cambio : <input class="RatioCalc" value="2" size="1" style="border: solid black 1px;" type="text" > <input size="1"  class="RatioCalc" value="1.5" style="border: solid black 1px;" type="text" ><input size="1" class="RatioCalc" value="1" style="border: solid black 1px;" type="text" >';
	affi+= '<br/><br/>Cantidad<br/> <input class="RatioCalc" style="border: solid black 1px;"  type="text" >' 
	affi+= '<input class="RatioCalc" value="'+res+'" style="border: solid black 1px; display:none;"  type="text" >' 
	
	var resEchange = ResEchange(res); 
	
	affi+= '<br/><br/>Porcentaje de pago '+resEchange+'<br/><input class="RatioCalc" value="50" style="border: solid black 1px;" type="text" >' 
	affi+='<input id="ClickCalc" value="Calcular" style="border: solid black 1px;" type="button" ></div>' 
	
	document.getElementById('inhalt').innerHTML = affi;
	document.getElementById('ClickCalc').addEventListener("click", function(event) 
	{
		calcular();
	}, true);

}

function calcular()
{
	var ressourceName = new Array('Métal','Cristal', 'Deut');
	var ratio = new Array(document.getElementsByClassName('RatioCalc')[0].value,document.getElementsByClassName('RatioCalc')[1].value, document.getElementsByClassName('RatioCalc')[2].value);
	var pourcent = new Array(document.getElementsByClassName('RatioCalc')[5].value/100, 1-document.getElementsByClassName('RatioCalc')[5].value/100);
	var Ressource = new Array(0,0,0);
	var numResVente = parseInt(document.getElementsByClassName('RatioCalc')[4].value);
	
	var resEchange = ResEchange(numResVente);
	
	Ressource[numResVente] = document.getElementsByClassName('RatioCalc')[3].value * 1;
	var f=0;
	var affichage = '<br/><div>Ratio de cambio : '+ratio.join('/')+'<br/>Porcentaje de Pago '+resEchange + ' : '+pourcent[0]+'<br/><br/><br/>Usted Vende : <strong>'+ addPoints(parseInt(Ressource[numResVente])) +'</strong> de '+ressourceName[numResVente]+ ' ( '+Math.ceil(Ressource[numResVente]/25000) +' GT ou ' +Math.ceil(Ressource[numResVente]/5000)+' PT) <br/><br/>';
	affichage+= 'Usted recibe : <br/>'
	
	var GT=0;
	var PT = 0;
	var resTot = 0;
	
	for(var i=0; i<3; i++)
	{
		if(i != numResVente)
		{
			Ressource[i] = Ressource[numResVente]*pourcent[f]*ratio[i]/ratio[numResVente];
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



if (document.getElementsByClassName('menubutton_table')[10] ) var aff_bouton ='<li class="menubutton_table"><span class="menu_icon"></span><a id="Calculadora" class="menubutton " href="#" accesskey="" target="_self">';
else var aff_bouton ='<li><span class="menu_icon"></span><a id="Calculadora" class="menubutton " href="#" accesskey="" target="_self">';

	aff_bouton += '<span class="textlabel">Calculadora</span></a></li>';
				
	var sp1 = document.createElement("span");
	sp1.setAttribute("id", "Calc");
	var sp1_content = document.createTextNode('');
	sp1.appendChild(sp1_content);				
		// V1.1 ou 1.2
		if ( document.getElementsByClassName('menubutton_table')[10] ) var sp2 = document.getElementsByClassName('menubutton_table')[10] ;
		else var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
	var parentDiv = sp2.parentNode;
	parentDiv.insertBefore(sp1, sp2.nextSibling);
	var tableau = document.createElement("span");
	tableau.innerHTML = aff_bouton;
	document.getElementById('Calc').insertBefore(tableau, document.getElementById('Calc').firstChild);
	
	document.getElementById('Calculadora').addEventListener("click", function(event) 
	{
		var aff=' <div style="text-align:center;"><br/> <br/> <br/> <br/> <br/>Que recurso quieres cambiar ?  <br/><br/> <br/> <br/><input value="Métal" style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" id="CalcMetal">  <input style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" value="Cristal" id="CalcCristal">  <input value="Deut" style="cursor:pointer; size:100px; background-color:transparent; border: solid black 1px; color:#CCCCCC;" id="CalcDeut"></div> ';
		
		document.getElementById('inhalt').innerHTML = aff ;
		
		document.getElementById('CalcMetal').addEventListener("click", function(event) 
		{
			hacecalculo(0);
		}, true);
		document.getElementById('CalcCristal').addEventListener("click", function(event) 
		{
			hacecalculo(1);
		}, true);
		document.getElementById('CalcDeut').addEventListener("click", function(event) 
		{
			hacecalculo(2);
		}, true);

		
		
	}, true);
	
}
//
	