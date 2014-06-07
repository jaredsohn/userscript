// ==UserScript==
// @name           Travian: Autofarm
// @author         FuJis & Mars
// @description    Travian auto-farm_script_By_Fuji
// @include        http://*.travian.*/* 
// @exclude        http://forum.travian.*
// @email          djfujis@gmail.com
// @version        V 1.7
// ==/UserScript==




var eigenCoords;
if(false)
{
//names can differ per race and server


troepen = new Array();

	
};


function getNumber(tekst)
{
	var terug;
	//alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));
	if((tekst.indexOf("=")+1 ) == 0 &&  tekst.lastIndexOf(";") == -1)
	{
		return 0;
	}else
	{
		return tekst.substring(tekst.indexOf("=")+1, tekst.indexOf(";"));
	}
};


function Random(minimum, maximum)
{	
	if(minimum == null && maximum == null )
	{
		minimum = 1000;
		maximum = 10000;
	}
	return Math.random()*(maximum-minimum+1);
		
};

function sendtroops() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var aantal = GM_getValue("teller"+tekst+getEigen(),0);
	var pagina = document.getElementById("lmid2").innerHTML;	
	if(pagina.indexOf("There isn't a Village on these coördinates.") > -1)
	{
		setTimeout( 'window.location.replace( "a2b.php")', Random(1000, 5000));
	}else{
	if( pagina.indexOf("kid") > -1)
	{ /*
		var code = document.getElementById('lmid2').innerHTML;
		var type1 = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
		var type2 = getNumber(code.substr(code.lastIndexOf("t2.value"), 20));
		var type3 = getNumber(code.substr(code.lastIndexOf("t3.value"), 20));
		var type4 = getNumber(code.substr(code.lastIndexOf("t4.value"), 20));
		var type5 = getNumber(code.substr(code.lastIndexOf("t5.value"), 20));
		var type6 = getNumber(code.substr(code.lastIndexOf("t6.value"), 20));
		var type7 = getNumber(code.substr(code.lastIndexOf("t7.value"), 20));
		var type8 = getNumber(code.substr(code.lastIndexOf("t8.value"), 20));
		var type9 = getNumber(code.substr(code.lastIndexOf("t9.value"), 20));
		var type10 = getNumber(code.substr(code.lastIndexOf("t10.value"), 20));
		
		intevullen = new Array();
		//alert("fermos"+tekst+''+getEigen());
		intevullen = GM_getValue("fermos"+tekst+''+getEigen(),"").split("\n");
		
		if(aantal > intevullen.length-1)
		{
			aantal=1;
		}
		
		intevullen[aantal] = intevullen[aantal].split("|");
			intevullen[aantal][0] = intevullen[aantal][0].split(",");
			intevullen[aantal][1] = intevullen[aantal][1].split(","); 		
			//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
			if(		parseInt(intevullen[aantal][1][0]) > parseInt(type1) ||
					parseInt(intevullen[aantal][1][1]) > parseInt(type2) ||
					parseInt(intevullen[aantal][1][2]) > parseInt(type3) ||
					parseInt(intevullen[aantal][1][3]) > parseInt(type4) ||
					parseInt(intevullen[aantal][1][4]) > parseInt(type5) ||
					parseInt(intevullen[aantal][1][5]) > parseInt(type6) ||
					parseInt(intevullen[aantal][1][6]) > parseInt(type7) ||
					parseInt(intevullen[aantal][1][7]) > parseInt(type8) ||
					parseInt(intevullen[aantal][1][8]) > parseInt(type9) ||
					parseInt(intevullen[aantal][1][9]) > parseInt(type10) )
			{
				veranderDorp();
			}else{ */
				
					var e = document.getElementsByTagName('form');
					e[0].submit();
			//}

	}else{
		var code = document.getElementById('lmid2').innerHTML;
		//alert (code.substr(code.lastIndexOf("t1.value"), 20));
		var type1 = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
		var type2 = getNumber(code.substr(code.lastIndexOf("t2.value"), 20));
		var type3 = getNumber(code.substr(code.lastIndexOf("t3.value"), 20));
		var type4 = getNumber(code.substr(code.lastIndexOf("t4.value"), 20));
		var type5 = getNumber(code.substr(code.lastIndexOf("t5.value"), 20));
		var type6 = getNumber(code.substr(code.lastIndexOf("t6.value"), 20));
		var type7 = getNumber(code.substr(code.lastIndexOf("t7.value"), 20));
		var type8 = getNumber(code.substr(code.lastIndexOf("t8.value"), 20));
		var type9 = getNumber(code.substr(code.lastIndexOf("t9.value"), 20));
		var type10 = getNumber(code.substr(code.lastIndexOf("t10.value"), 20));
		var type11 = getNumber(code.substr(code.lastIndexOf("t11.value"), 20));
		//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
		
		intevullen = new Array();
		//alert("fermos"+tekst+''+getEigen());
		intevullen = GM_getValue("fermos"+tekst+''+getEigen(),"").split("\n");
		//alert(GM_getValue("fermos"+tekst+''+getEigen(),""));
		if(intevullen == "")	{
			
			veranderDorp();
		}else{
		
		
			if(aantal < intevullen.length-1)
			{
				aantal = aantal+1;
			}else
			{
				aantal = 1;
			}
						
			intevullen[aantal] = intevullen[aantal].split("|");
			intevullen[aantal][0] = intevullen[aantal][0].split(",");
			intevullen[aantal][1] = intevullen[aantal][1].split(",");
			if (!intevullen[aantal][1][10]) {
				intevullen[aantal][1][10] = 0;
			}
			 		
			//alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
			if(		parseInt(intevullen[aantal][1][0]) > parseInt(type1) ||
					parseInt(intevullen[aantal][1][1]) > parseInt(type2) ||
					parseInt(intevullen[aantal][1][2]) > parseInt(type3) ||
					parseInt(intevullen[aantal][1][3]) > parseInt(type4) ||
					parseInt(intevullen[aantal][1][4]) > parseInt(type5) ||
					parseInt(intevullen[aantal][1][5]) > parseInt(type6) ||
					parseInt(intevullen[aantal][1][6]) > parseInt(type7) ||
					parseInt(intevullen[aantal][1][7]) > parseInt(type8) ||
					parseInt(intevullen[aantal][1][8]) > parseInt(type9) ||
					parseInt(intevullen[aantal][1][9]) > parseInt(type10) ||
					parseInt(intevullen[aantal][1][10]) > parseInt(type11) )
			{
				//alert ("Not enough troops!");
				/*alert(type1+","+type2+","+type3+","+type4+","+type5+","+type6+","+type7+","+type8+","+type9+","+type10);
				alert(intevullen[aantal][1][0]+","+intevullen[aantal][1][1]+","+intevullen[aantal][1][2]+","+intevullen[aantal][1][3]+","+intevullen[aantal][1][4]+","+intevullen[aantal][1][5]+","+intevullen[aantal][1][6]+","+intevullen[aantal][1][7]+","+intevullen[aantal][1][8]+","+intevullen[aantal][1][9]);*/
				veranderDorp();
			}else{
				
				//alert ("vul in");
				

				
				document.forms.namedItem("snd").elements.namedItem('t1').value= intevullen[aantal][1][0];
				document.forms.namedItem("snd").elements.namedItem('t2').value= intevullen[aantal][1][1];
				document.forms.namedItem("snd").elements.namedItem('t3').value= intevullen[aantal][1][2];
				document.forms.namedItem("snd").elements.namedItem('t4').value= intevullen[aantal][1][3];
				document.forms.namedItem("snd").elements.namedItem('t5').value= intevullen[aantal][1][4];
				document.forms.namedItem("snd").elements.namedItem('t6').value= intevullen[aantal][1][5];
				document.forms.namedItem("snd").elements.namedItem('t7').value= intevullen[aantal][1][6];
				document.forms.namedItem("snd").elements.namedItem('t8').value= intevullen[aantal][1][7];
				document.forms.namedItem("snd").elements.namedItem('t9').value= intevullen[aantal][1][8];
				document.forms.namedItem("snd").elements.namedItem('t10').value= intevullen[aantal][1][9];
				if (document.forms.namedItem("snd").elements.namedItem('t11')) {
					document.forms.namedItem("snd").elements.namedItem('t11').value= intevullen[aantal][1][10];
				}
				//held  document.forms.namedItem("snd").elements.namedItem('t1').value= "10";
				
				document.forms.namedItem("snd").elements.namedItem('c').value = 3;
				document.forms.namedItem("snd").elements.namedItem('x').value = intevullen[aantal][0][0];
				document.forms.namedItem("snd").elements.namedItem('y').value = intevullen[aantal][0][1];
				GM_setValue("teller"+tekst+getEigen(),aantal);
				document.forms.namedItem("snd").submit();
				//	document.namedItem("s1").submit();
			}
		}
	}
	}
};

function getVilLink ()
{
var ex = "//a[contains(@href,'newdid')][not(@class='active_vl')]";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	var link = new Array();
	if (tag.snapshotLength)
	{
	for(var i=1; i<=tag.snapshotLength;i++)
	 {
	 temp = tag.snapshotItem(i-1).href.split("?");
	 link[i-1] = temp[1];


	 }
	}
	link.sort(function() {return 0.5 - Math.random()});
	return link;
	
}

function veranderDorp()
{

	setTimeout( 'window.location.replace( "a2b.php?'+getVilLink()+'")', Random(15000,50000));
	
};

function getActiveVillage(doc, a)
{
var ex = ".//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	if (tag.snapshotLength)
    	{
    	if(a)
    	{
      return '<a href="'+tag.snapshotItem(0)+'">'+tag.snapshotItem(0).innerHTML+"</a>";
      }else{
      return tag.snapshotItem(0).innerHTML;
      }
	     
	    }else{
      return "Single village";
      }
	
}

function getActiveVillageCoords(doc, a)
{
var ex = ".//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    	if (tag.snapshotLength)
    	{
    	if(a)
    	{
      return '<a href="'+tag.snapshotItem(0)+'">'+tag.snapshotItem(0).innerHTML+"</a>";
      }else{
	ex = ".//td[@class='right dlist1']";      	
	rightc = document.evaluate( 
  	ex,
    	tag.snapshotItem(0).parentNode.nextSibling.firstChild,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);      	
    ex = ".//td[@class='left dlist3']"; 
	leftc = document.evaluate( 
  	ex,
    	tag.snapshotItem(0).parentNode.nextSibling.firstChild,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);      	
      	
      	coords=(rightc.snapshotItem(0).innerHTML+'|'+leftc.snapshotItem(0).innerHTML).replace('(','').replace(')','');
      	
      return coords;
      }
	     
	    }else{
      return GM_getValue("singlevillage");
      }
	
}

function getEigen() {
	if (getActiveVillage(document, false)!='Single village') {
		return getActiveVillageCoords(document, false);
	}
	else {
	
	return GM_getValue("singlevillage"); 
	
	}
};

function voegToe() {
	var code = document.getElementById('lmid2').firstChild.innerHTML;
	//alert(code);
	var x = code.substring(code.lastIndexOf("(")+1,code.lastIndexOf("|"));
	var y = code.substring(code.lastIndexOf("|")+1,code.lastIndexOf(")"));
	var dorpnaam = code.substring(code.indexOf("<h1>")+4+17,code.indexOf("</div>"));
	
  
  t1 = parseInt(document.getElementById('t1').value)
  t2 = parseInt(document.getElementById('t2').value)
  t3 = parseInt(document.getElementById('t3').value)
  t4 = parseInt(document.getElementById('t4').value)
  t5 = parseInt(document.getElementById('t5').value)
  t6 = parseInt(document.getElementById('t6').value)
  t7 = parseInt(document.getElementById('t7').value)
  t8 = parseInt(document.getElementById('t8').value)
  t9 = parseInt(document.getElementById('t9').value)
  t10 = parseInt(document.getElementById('t10').value)
  					
	addList(x+","+y+"|"+t1+","+t2+","+t3+","+t4+","+t5+","+t6+","+t7+","+t8+","+t9+","+t10+"|"+dorpnaam);
	alert('Added: '+dorpnaam+"("+x+"|"+y+")"); //opslaan moet nog gemaakt worden. afhankelijk van coordinatan van geselecteerd dorp -> eerst coordinaten ophalen.
};

function addList(add) {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	//var doel = readList();
	doel = doel+"\n"+add;
	//alert(doel);
	GM_setValue("fermos"+tekst,doel);

};

function upddeffarms() {
	var frms = document.getElementById("manualfarms").value;
	if (frms=="") {
		alert('Com\'on you must have some farm...');
		return;
	}
	
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	if (frms.indexOf('\n')!=0) {
		frms = '\n' + frms;
	}
	GM_setValue("fermos"+tekst,frms);
	
	document.getElementById("manualinput").style.display = 'none';
	window.location.reload();
}

function deffarms() {

	if (document.getElementById("manualinput").style.display == 'none') {
		document.getElementById("manualinput").style.display = '';
	} else {
		document.getElementById("manualinput").style.display = 'none';
	};
	
	return;
	alert('Not yet implemented!');
	return;
		var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	GM_setValue("fermos"+tekst,"");
	var doel = "-60,11|10,0,0,0,0,0,0,0,0,0+|grad svijetla#-73,19|4,0,0,0,0,0,0,0,0,0+|Circus#-72,18|3,0,0,0,0,0,0,0,0,0+|sporo naselje#-76,15|4,0,0,0,0,0,0,0,0,0+|Bunny Land#-72,13|4,0,0,0,0,0,0,0,0,0+|boy#-71,13|3,0,0,0,0,0,0,0,0,0+|Tulek#-70,16|4,0,0,0,0,0,0,0,0,0+|hulk#-70,11|5,0,0,0,0,0,0,0,0,0+|HoLlyWood#-70,12|4,0,0,0,0,0,0,0,0,0+|one#-75,11|4,0,0,0,0,0,0,0,0,0+|Zlatna Dolina#-76,11|4,0,0,0,0,0,0,0,0,0+|1.Sabac#-76,12|4,0,0,0,0,0,0,0,0,0+|aaa#-77,12|6,0,0,0,0,0,0,0,0,0+|Žeravac#-77,11|5,0,0,0,0,0,0,0,0,0+|Rimonel#-78,11|5,0,0,0,0,0,0,0,0,0+|CLEVELAND#-73,10|5,0,0,0,0,0,0,0,0,0+|Ford#-74,9|4,0,0,0,0,0,0,0,0,0+|Dümtektek#-72,23|5,0,0,0,0,0,0,0,0,0+|Sumashi 00#-72,25|5,0,0,0,0,0,0,0,0,0+|Ciglane#-74,25|5,0,0,0,0,0,0,0,0,0+|SPLIT#-75,25|4,0,0,0,0,0,0,0,0,0+|Gourdinator#-75,24|5,0,0,0,0,0,0,0,0,0+|Lino#-70,26|5,0,0,0,0,0,0,0,0,0+|Borovo#-76,20|5,0,0,0,0,0,0,0,0,0+|Dark_village#-80,21|4,0,0,0,0,0,0,0,0,0+|shadow#-81,21|4,0,0,0,0,0,0,0,0,0+|Europa#-82,20|5,0,0,0,0,0,0,0,0,0+|☆GAZIJE-W♡4EVER☆#-79,19|5,0,0,0,0,0,0,0,0,0+|Maribor Ghetto#-79,17|4,0,0,0,0,0,0,0,0,0+|hangar#-80,15|5,0,0,0,0,0,0,0,0,0+|----______----#-78,11|5,0,0,0,0,0,0,0,0,0+|CLEVELAND#-79,11|5,0,0,0,0,0,0,0,0,0+|knox 1#-79,10|5,0,0,0,0,0,0,0,0,0+|Rocket queen#-77,9|5,0,0,0,0,0,0,0,0,0+|nefer#-78,7|5,0,0,0,0,0,0,0,0,0+|perograd#-79,8|5,0,0,0,0,0,0,0,0,0+|black city#-80,9|4,0,0,0,0,0,0,0,0,0+|maticna ploca#-75,8|5,0,0,0,0,0,0,0,0,0+|01.#-70,6|5,0,0,0,0,0,0,0,0,0+|eagles#-71,10|4,0,0,0,0,0,0,0,0,0+|styx#-70,10|4,0,0,0,0,0,0,0,0,0+|Luka#-69,15|3,0,0,0,0,0,0,0,0,0+|AdMiR_1#-65,15|4,0,0,0,0,0,0,0,0,0+|sky#-65,13|5,0,0,0,0,0,0,0,0,0+|Athens#-65,11|3,0,0,0,0,0,0,0,0,0+|TvORnicA ČučLeKa#-63,13|4,0,0,0,0,0,0,0,0,0+|Dubrava#-75,9|15,0,0,0,0,0,0,0,0,0+|DX New Revolution#-73,18|10,0,0,0,0,0,0,0,0,0+|zaselak";
	var doels = doel.split("#");
	for (cnt=0;cnt<doels.length;cnt++) {
		   if (doels[cnt]!="") {
				addList(doels[cnt]);
			}
	}
	//GM_setValue("fermos"+tekst,doel);
	return;
	//var doel = readList();
	var deffrm = '\n62,14|4,0,0,0,0,0,0,0,0,0+|Krstine\n81,12|4,0,0,0,0,0,0,0,0,0+|Eiffel\n58,31|4,0,0,0,0,0,0,0,0,0+|Israel\n88,21|3,0,0,0,0,0,0,0,0,0+|roninium\n76,11|4,0,0,0,0,0,0,0,0,0+|Crveno\n70,11|2,0,0,0,0,0,0,0,0,0+|.::JDemon::.\n65,13|4,0,0,0,0,0,0,0,0,0+|ZORA1\n88,28|4,0,0,0,0,0,0,0,0,0+|1\n82,38|3,0,0,0,0,0,0,0,0,0+|Primo\n82,14|3,0,0,0,0,0,0,0,0,0+|fuck off\n84,34|3,0,0,0,0,0,0,0,0,0+|teaAaA naselje\n60,29|2,0,0,0,0,0,0,0,0,0+|HQ. Rome\n86,25|3,0,0,0,0,0,0,0,0,0+|city\n65,36|3,0,0,0,0,0,0,0,0,0+|galaxy\n61,30|4,0,0,0,0,0,0,0,0,0+|Terazije\n85,27|5,0,0,0,0,0,0,0,0,0+|Grad sreće\n79,16|4,0,0,0,0,0,0,0,0,0+|WATERDEEP\n62,23|3,0,0,0,0,0,0,0,0,0+|Orgrimmar\n81,18|4,0,0,0,0,0,0,0,0,0+|EPETION\n83,27|3,0,0,0,0,0,0,0,0,0+|Korčula\n72,16|4,0,0,0,0,0,0,0,0,0+|CCM\n65,31|4,0,0,0,0,0,0,0,0,0+|hipotalamus\n80,20|2,0,0,0,0,0,0,0,0,0+|Zagreb\n82,27|3,0,0,0,0,0,0,0,0,0+|Antunovac\n73,17|3,0,0,0,0,0,0,0,0,0+|Detroit Rock City\n80,29|2,0,0,0,0,0,0,0,0,0+|Benetton\n66,27|2,0,0,0,0,0,0,0,0,0+|Araus\n66,26|2,0,0,0,0,0,0,0,0,0+|Moj svemir\n78,27|3,0,0,0,0,0,0,0,0,0+|Rim1x\n69,29|4,0,0,0,0,0,0,0,0,0+|SKYLINE\n77,24|5,0,0,0,0,0,0,0,0,0+|tinho\n76,29|4,0,0,0,0,0,0,0,0,0+|utopija\n74,30|3,0,0,0,0,0,0,0,0,0+|VENERA\n81,39|2,0,0,0,0,0,0,0,0,0+|BRAZIL\n61,35|4,0,0,0,0,0,0,0,0,0+|Boo';
	var answer = prompt ("Input your farms",deffrm);
	doel = deffrm;
	alert(doel);
	GM_setValue("fermos"+tekst,doel);
	
};


function readList() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	var tekst = tekst+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	//alert(doel);
	return doel;

};

addHover();
function addForm() {
	
	var addButton = document.createElement('a');
	addButton.href = 'javascript:void(0)';
	addButton.innerHTML = "» Add to AutoFarm";
	addButton.addEventListener('click',function(){showHoverPopup(this)},true);
	
	var cont = document.getElementById("lmid2");	

	var tbody = cont.getElementsByTagName("tbody")[2];
	var row = document.createElement("TR");
	var cell1 = document.createElement("TD");
	cell1.appendChild(addButton);
	row.appendChild(cell1);
	tbody.appendChild(row);

};

function geefOverzicht() {


	//button ON or OFF
	var onoffButton = document.createElement('a');
	onoffButton.href = 'javascript:void(0)';
	if(GM_getValue("valaan"+document.domain,0) == 0)	onoffButton.innerHTML = "AutoFarm is [OFF]";	//http://s3.travian.lt/img/un/a/del.gif
	else onoffButton.innerHTML = "AutoFarm is [ON]";
	onoffButton.addEventListener('click',startenstop,true);

	var defButton = document.createElement('a');
	defButton.href = 'javascript:void(0)';
	defButton.innerHTML = "Manually edit farm list ...";
	defButton.addEventListener('click',deffarms,true);
		
	var tekst = document.domain+''+getEigen();
	var doel = GM_getValue("fermos"+tekst,"");
	var farms = new Array;
	farms = doel.split("\n");
	
	var cont = document.getElementById("lmid2");	

	var table = cont.getElementsByTagName("table")[0];
	
	var ntable = document.createElement("table");
	ntable.className = "tbg";
	ntable.setAttribute('cellpadding', 2);	//cellpadding="2"
	ntable.setAttribute('cellspacing', 1);	//cellspacing="1"
	ntable.style.marginBottom = "14px";
	
	var ntbody = document.createElement("tbody");
	ntable.appendChild(ntbody);
	
	var ntr = document.createElement("tr");
	ntr.className = "cbg1";
	
	var ntrtop = document.createElement("tr");
	ntrtop.className = "cbg1";
		
	var ntd = document.createElement("td");
	ntd.width = "20%";
	ntd.appendChild(onoffButton);
	
	var ntd1 = document.createElement("td");
	ntd1.width = "20%";
	ntd1.setAttribute('colspan', 11);
	ntd1.innerHTML = "<span class='c0'><a href='http://userscripts.org/scripts/source/42721.user.js'>Update AutoFarm script</a></span>";
	
	var ntd2 = document.createElement("td");
	ntd2.setAttribute('colspan', 12);
	ntd2.appendChild(defButton);

	var manf = document.createElement("div");
	manf.innerHTML = 'Format:<br>- each farm per line<br>- line format: X,Y|unt1,unt2,unt3,unt4,unt5,unt6,unt7,unt8,unt9,unt10|Cityname<br>';
	manf.id = "manualinput";
	manf.style.width = "100%";
	manf.style.display = 'none';
	var manfb = document.createElement("textarea");
	manfb.id = "manualfarms";
	manfb.value=readList();
	manfb.style.width = "100%";
	manfb.style.height = "200px";
	manf.appendChild(manfb);
	
	var manButton = document.createElement('a');
	manButton.href = 'javascript:void(0)';
	manButton.innerHTML = "Save";
	manButton.addEventListener('click',upddeffarms,true);
	
	manf.appendChild(manButton);
	
	ntd2.appendChild(manf);
	
	ntr.appendChild(ntd);
	ntr.appendChild(ntd1);
	ntrtop.appendChild(ntd2);
	ntbody.appendChild(ntr);
	ntbody.appendChild(ntrtop);
	
	if (farms.length > 0) {
		for (b=1;b<farms.length;b++) {
			if (farms[b]=="") continue;
			var ntr = document.createElement("tr");
			ntr.className = "unit";
			
			//alert(farms[b].split("|")[2]);
			//Button for removing farm
			var addButton = document.createElement('a');
			addButton.href = 'javascript:void(0)';
			// addButton.addEventListener('click',removeFarm,true);
			
			var img = document.createElement('img');
			//img.addEventListener('click',removeFarm, true);
			img.src = 'http://'+document.domain+'/img/un/a/del.gif';
			img.setAttribute('height','12'); img.setAttribute('width','12');	img.style.height = '12px';img.style.width = '12px';

			addButton.appendChild(img);
			
			
			var ntd = document.createElement("td");
			ntd.classname = 'r7';
			ntd.appendChild(addButton);
			//Vilage
			ntd.innerHTML += farms[b].split("|")[2]+' ('+(farms[b].split("|")[0]).replace(',','|')+')';
			ntr.appendChild(ntd);
			
			//ntd.addAttribute('target', b);
			ntd.farmSequence = b;
			// ntd.addEventListener('click', removeFarm, false);
			var display = farms[b];
			ntd.addEventListener('click', createRemoveFarmCallback(b), 0);
			
			for (i=0;i<=10;i++) {
				var ntd = document.createElement("td");
				var troops = farms[b].split("|")[1];
				if (farms.length > 1) {
					troops = troops.split(',');
					if (i<troops.length) {
					 ntd.innerHTML = parseInt(troops[i]);
					}
						else {
							ntd.innerHTML = "0";
					}
				}
				ntr.appendChild(ntd);
			}
			
			ntbody.appendChild(ntr);
		}
	}
	
	cont.insertBefore(ntable,table);
	
};

function removeFarm(itemToRemove) {

	//alert(itemToRemove);
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	
	var farmKey = "fermos"+tekst+getEigen();
	var fullList = GM_getValue(farmKey);
	var farms = new Array;
	farms = fullList.split("\n");
	
	var newFarmList = '';
	if (itemToRemove < farms.length) {
		if (confirm('Removing: ' + farms[itemToRemove])) {
			for (iter = 1; iter < farms.length; iter++) {
				if (iter != itemToRemove) {
					newFarmList = newFarmList + '\n' + farms[iter];
				}
			}
		}
		else {
			return;
		}
	}

	//alert(newFarmList);
	
	GM_setValue("fermos" +tekst + getEigen(), newFarmList);
	GM_setValue("valaan"+tekst,0);

	alert('List modified! And autofarm Turned OFF');
	window.location.reload();
	//return;
};

function createRemoveFarmCallback(sequence) 
{

	return function() {
		removeFarm(sequence);
	}

}

function startenstop() {
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );

	if(GM_getValue("valaan"+tekst,0) == 0) {
		GM_setValue("valaan"+tekst,1);
		GM_addStyle("body { color:red; }");
		//alert("start");
	}else{
		GM_setValue("valaan"+tekst,0);
		GM_addStyle("body { color:black; }");
		//alert("stop");
	}
	window.location.reload(); 
	
};


function valAan()
{
	var tekst = document.URL;
	tekst = tekst.substring(tekst.indexOf("://")+3, tekst.lastIndexOf("/") );
	
	if(GM_getValue("valaan"+tekst,0) == 1)
	{
		GM_addStyle("body { color:red; }");
		
		addButton = document.createElement('input');
		addButton.type = "button"; // type bepalen
		addButton.value = "Script running\nPress to stop!";
	
		addButton.addEventListener('click',startenstop,true);
		addButton.style.position = "absolute";
		addButton.style.top = "80px";
		addButton.style.left = "5px";
		addButton.style.zIndex = "999";
		addButton.style.width = "120px";
		addButton.style.height = "70px";
		addButton.style.background = "#FF0000";
	
		document.body.appendChild(addButton);
		
		var url = document.URL;
		url = url.substring(url.lastIndexOf("/")+1);
		
		switch(url)
		{
				case "a2b.php":
				setTimeout( sendtroops, Random());
	 				 break;
				default:
					 setTimeout( 'window.location.replace( "a2b.php" )', Random());
	
		}

		
	}
	//else GM_addStyle("body { color:red; }");
	
};


function hoofdfunctie() {
	tekst = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
	if(tekst.indexOf(" <!-- ERROR ITEM CONTAINER") != -1)
	{
		window.location.reload();
	}

	getEigen()
	var url = document.URL;
	url = url.substring(url.lastIndexOf("/")+1);
	//alert (url);
	switch(url)
	{
	case "build.php?gid=16":
	case "build.php?id=39":
	 	geefOverzicht();  
	default:
		valAan();
	  break;
	}
	if (url.indexOf('karte.php?d=') > -1) {
	addForm();
	}
};

function addHover()
{

if(GM_getValue('singlevillage' ,false))
{
singlevillage = GM_getValue('singlevillage', false)
}else{
singlevillage = prompt('Coordinates if you have a single village (or else coordinates of your capital)?: Format: X|Y ')
GM_setValue('singlevillage', singlevillage);
}

if(GM_getValue('race' ,false))
{
startvalue = GM_getValue('race', false)
}else{
startvalue = 1+ 10*prompt('race?: roman=0, Teuton=1, Gauls=2 ')
GM_setValue('race', startvalue);
}
div = document.createElement ('div'); 
div.id = "hoverpopup";
div.class = 'handle ttq_draghandle'
div.style.visibility = 'hidden';
div.style.position = 'absolute';
div.style.borderStyle = 'solid';
div.style.borderWidth = '1px';
div.style.top = '600px' 
div.style.left = '80px'
div.innerHTML = '<form><img src="/img/un/u/'+startvalue+'.gif">:<input type="text" size="1" value="0" id="t1"><img src="/img/un/u/'+(startvalue+1)+'.gif">:<input type="text" size="1" value="0" id="t2"><img src="/img/un/u/'+(startvalue+2)+'.gif">:<input type="text" size="1" value="0" id="t3"><img src="/img/un/u/'+(startvalue+3)+'.gif">:<input type="text" size="1" value="0" id="t4"><img src="/img/un/u/'+(startvalue+4)+'.gif">:<input type="text" size="1" value="0" id="t5"><img src="/img/un/u/'+(startvalue+5)+'.gif">:<input type="text" size="1" value="0" id="t6"><img src="/img/un/u/'+(startvalue+6)+'.gif">:<input type="text" size="1" value="0" id="t7"><img src="/img/un/u/'+(startvalue+7)+'.gif">:<input type="text" size="1" value="0" id="t8"><img src="/img/un/u/'+(startvalue+8)+'.gif">:<input type="text" size="1" value="0" id="t9"><img src="/img/un/u/'+(startvalue+9)+'.gif">:<input type="text" size="1" value="0" id="t10"><img src=\"/img/un/u/hero.gif\">:<input type="text" size="1" value="0" id="t11"><input id="submitButton" type="submit" value="Add></form>'
document.body.appendChild(div);
var allLinks, thisLink;
allLinks = document.evaluate(
    "//input[@name='m1[]']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  if (allLinks.snapshotLength!=4) { // not on NPC page
		document.getElementById('submitButton').addEventListener('click',voegToe,true);
	}
}

function showHoverPopup(hoveritem)
{
hover = document.getElementById('hoverpopup');
hover.style.visibility = "Visible";
}


window.addEventListener('DOMContentLoaded', hoofdfunctie, false);
if (document.body) hoofdfunctie();