// ==UserScript==
// @name           PH 1.0
// @namespace      Virtuoz
// @include        http://websim.speedsim.net*
// ==/UserScript==

function addRow(tableID) 
{
  var tableRef = document.getElementById(tableID);
  
  var newRow = tableRef.insertRow(R);

  var newCell  = newRow.insertCell(0);
  newRow.insertCell(1)
  newRow.insertCell(2)
  newRow.insertCell(3)


  var newText  = document.createTextNode('top row')
  newCell.appendChild(newText);
}

function arrondir(nombre)
		{
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '- ';
				}
				else if (nombre>0)
				{
					nombre = Math.abs(nombre);
					signe = '+ ';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			
		}
		
var cout_D  = new Array(	4000 , 	12000, 	4000, 	10000, 	29000, 	60000, 	40000, 	18000, 	1000, 	90000, 	2500, 	125000, 	10000000, 	85000, 	2000,	2000, 	8000, 	37000, 	8000, 	130000, 	20000,  100000);
var ratio_D = new Array(	 0, 	0, 	1,	1,		1	,	1,		0,	0,	0,	1,	0,		1,		1	,	1, 		0.3,	0.3,	0.3,	0.3,		0.3,	0.3,		0.3,		0.3 );

var cout_A  = new Array(	4000 , 	12000, 	4000, 	10000, 	29000, 	60000, 	40000, 	18000, 	1000, 	90000, 	2500, 	125000, 	10000000, 	85000);
var ratio_A = new Array(	 0.5, 	0.5, 	1,	1,		1	,	1,		0.5,	0.5,	0.5,	1,	0,		1,		1	,	1);

var R = 1;
	
	addRow('shiptable');
	R=2;
    addRow('shiptable');
    document.getElementById('shiptable').rows[1].style.height="25px";
    document.getElementById('shiptable').rows[2].style.height="25px";
    document.getElementById('shiptable').rows[1].cells[1].style.textAlign="center";
    document.getElementById('shiptable').rows[1].cells[3].style.textAlign="center";
    document.getElementById('shiptable').rows[2].cells[1].style.textAlign="center";
    document.getElementById('shiptable').rows[2].cells[3].style.textAlign="center";
    document.getElementById('shiptable').rows[1].cells[0].innerHTML = '<span style="padding: 15px 0px;">Combat honorable</span>';
    document.getElementById('shiptable').rows[1].cells[1].innerHTML = '<input id="check_00" type="checkbox">';
	document.getElementById('shiptable').rows[1].cells[3].innerHTML = '<input id="check_01" type="checkbox">';
	document.getElementById('shiptable').rows[2].cells[0].innerHTML = '<span style="padding: 15px 0px;">Combat inégal</span>';
    document.getElementById('shiptable').rows[2].cells[1].innerHTML = '<input id="check_02" type="checkbox">';
	document.getElementById('shiptable').rows[2].cells[3].innerHTML = '<input id="check_03" type="checkbox">';
	
	
	
function Calcul()
{
    var Attaquant = 0;
    var Defenseur = 0;
    var nbLignes = document.getElementById('anti_result_table').rows.length;
    var j=0;
	var PH_A = 0;
	var PH_D = 0;
    
	if (nbLignes<12)
	{
	document.getElementById('anti_result_table').insertRow(-1).insertCell(0);
	document.getElementById('anti_result_table').rows[11].insertCell(1);
	}
	document.getElementById('anti_result_table').rows[11].cells[0].innerHTML = '<span style="padding: 2px 15px 2px 5px; white-space: nowrap;"> Points honorifiques </span>'; 
	document.getElementById('anti_result_table').rows[11].cells[1].colSpan = 6;
	
for (var i =0 ; i<21 ; i++)
	{
	    if (i==10)
	    i=i+1;
	    
	    if (i<14)
	    {
	    var nb2= document.getElementsByName('ship_a_'+i+'_b')[0].value;
        Attaquant+= nb2*cout_A[i] *ratio_A[i];
        }

	    var nb= document.getElementsByName('ship_d_'+i+'_b')[0].value;
        Defenseur+= nb*cout_D[i] *ratio_D[i]; 
        
        var c0= document.getElementById('ship_d_0_e').innerHTML;
        var c1= document.getElementById('ship_d_1_e').innerHTML;
        var c2= document.getElementById('ship_d_6_e').innerHTML;
        var c3= document.getElementById('ship_d_7_e').innerHTML;
        var c4= document.getElementById('ship_d_8_e').innerHTML;
        var c5= document.getElementById('ship_d_10_e').innerHTML;
	    
	    var v0= document.getElementById('ship_d_2_e').innerHTML;
	    var v1= document.getElementById('ship_d_3_e').innerHTML;
	    var v2= document.getElementById('ship_d_4_e').innerHTML;
	    var v3= document.getElementById('ship_d_5_e').innerHTML;
	    var v4= document.getElementById('ship_d_9_e').innerHTML;
	    var v5= document.getElementById('ship_d_11_e').innerHTML;
	    var v6= document.getElementById('ship_d_12_e').innerHTML;
	    var v7= document.getElementById('ship_d_13_e').innerHTML;
	    
	    var d0= document.getElementById('ship_d_14_e').innerHTML;
	    var d1= document.getElementById('ship_d_15_e').innerHTML;
	    var d2= document.getElementById('ship_d_16_e').innerHTML;
	    var d3= document.getElementById('ship_d_17_e').innerHTML;
	    var d4= document.getElementById('ship_d_18_e').innerHTML;
	    var d5= document.getElementById('ship_d_19_e').innerHTML;
	    var d6= document.getElementById('ship_d_20_e').innerHTML;
	    var d7= document.getElementById('ship_d_21_e').innerHTML;
	    
	    var ca0= document.getElementById('ship_a_0_e').innerHTML;
        var ca1= document.getElementById('ship_a_1_e').innerHTML;
        var ca2= document.getElementById('ship_a_6_e').innerHTML;
        var ca3= document.getElementById('ship_a_7_e').innerHTML;
        var ca4= document.getElementById('ship_a_8_e').innerHTML;
	    
	    var va0= document.getElementById('ship_a_2_e').innerHTML;
	    var va1= document.getElementById('ship_a_3_e').innerHTML;
	    var va2= document.getElementById('ship_a_4_e').innerHTML;
	    var va3= document.getElementById('ship_a_5_e').innerHTML;
	    var va4= document.getElementById('ship_a_9_e').innerHTML;
	    var va5= document.getElementById('ship_a_11_e').innerHTML;
	    var va6= document.getElementById('ship_a_12_e').innerHTML;
	    var va7= document.getElementById('ship_a_13_e').innerHTML;
	    
	    var DefenseurRestant=((v0*4000)+(v1*10000)+(v2*29000)+(v3*60000)+(v4*90000)+(v5*125000)+(v6*10000000)+(v7*85000)+(d0*0.3*2000)+(d1*0.3*2000)+(d2*0.3*8000)+(d3*0.3*37000)+(d4*0.3*8000)+(d5*0.3*130000)+(d6*0.3*20000)+(d7*0.3*100000));
		
	    var AttaquantRestant=((va0*4000)+(va1*10000)+(va2*29000)+(va3*60000)+(va4*90000)+(va5*125000)+(va6*10000000)+(va7*85000)+(ca0*0.5*4000)+(ca1*0.5*12000)+(ca2*0.5*40000)+(ca3*0.5*18000)+(ca4*0.5*1000));
			    
		var Pertes_D=(Defenseur-DefenseurRestant);
		
		var Pertes_A=(Attaquant-AttaquantRestant);
		
		if (document.getElementById('check_00').checked == true && document.getElementById('check_02').checked == true)
		{
		document.getElementById('check_00').checked = false;
		document.getElementById('check_02').checked = false;
		}
		
		if (document.getElementById('check_01').checked == true && document.getElementById('check_03').checked == true)
		{
		document.getElementById('check_01').checked = false;
		document.getElementById('check_03').checked = false;
		}
		
		if (document.getElementById('check_00').checked == false)
		PH_A = 0-(((Math.pow(Pertes_D,0.9))/1000));
		
		else if (document.getElementById('check_00').checked == true)
		PH_A = ((Math.pow(Pertes_D,0.9))/1000);
		
		if (document.getElementById('check_01').checked == false)
		PH_D = 0-(((Math.pow(Pertes_A,0.9))/1000));
		
		else if (document.getElementById('check_01').checked == true)
		PH_D = ((Math.pow(Pertes_A,0.9))/1000);
		
		if (document.getElementById('check_02').checked == false && document.getElementById('check_00').checked == false )
		{
		PH_A = 0;
		PH_D = 0;
		}
		
		var couleur_A = 0;
		var couleur_D = 0;
		
		if(PH_A>0) couleur_A = '008000';
		else if(PH_A<0) couleur_A = 'FF0000';
		
		if(PH_D>0) couleur_D = '008000';
		else if(PH_D<0) couleur_D = 'FF0000';
	       
	    if (c0!='' || c1!='' || c2!='' || c3!='' || c4!='' || c5!='' || v0!='' || v1!='' || v2!='' || v3!='' || v4!='' || v5!='' || v6!='' || v7!='' || d0!='' || d1!='' || d2!='' || d3!='' || d4!='' || d5!='' || d6!='' || d7!='' || ca0!='' || ca1!='' || ca2!='' || ca3!='' || ca4!='' || va0!='' || va1!='' || va2!='' || va3!='' || va4!='' || va5!='' || va6!='' || va7!='')
        {
        document.getElementById('anti_result_table').rows[11].cells[1].innerHTML = '<span>| Assaillant : </span><span style="color:#'+couleur_A+'; white-space: nowrap;" > '+arrondir(PH_A)+'</span><span> | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Défenseur : </span><span style="color:#'+couleur_D+'; white-space: nowrap;" > '+arrondir(PH_D)+'</span><span> |</span>';
	    }
	}
}
if(/speedsim/.test(location.href))setInterval(Calcul, 250);