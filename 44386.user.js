// ==UserScript==
// @name           Auto-Calevarie
// @author         USSR
// @description    Auto builds Calevarie
// @include        http://*.travian.*/* 
// @exclude        http://forum.travian.*
// @email          Mark_Nijboer_91@hotmail.com
// @version        1.00 
// ==/UserScript==

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}


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
		maximum = 2300;
	}
	var rand=Math.round(Math.random()*maximum);
	rand = rand<minimum ? (rand+minimum):rand;
	return rand;
		
};
function buildtroops() 
{
		var code = document.getElementById('lmid2').innerHTML;
		var maxaant = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
		if(maxaant > 0) 
		{
			document.forms.namedItem("snd").elements.namedItem('t1').value= maxaant;
			document.forms.namedItem("snd").submit();
			setTimeout( 'window.location.replace( "dorf1.php?newdid=82216")', Random(1000, 2300));
		}
		else 
		{
			setTimeout( 'window.location.replace( "dorf1.php?newdid=82216")', Random(1000, 2300));
		}
};
function startenstop() {

	if(GM_getValue("script",0) == 0) {
		GM_setValue("script",1);
		
		//alert("start");
	}else{
		GM_setValue("script",0);
		GM_addStyle("body { color:black; }");
		//alert("stop");
	}
	window.location.reload(); 
	
};
function hoofdfunctie() {
  var ltop = document.getElementById('ltop5');
	var div = document.createElement ('div'); 
	div.style.position = 'absolute';
	div.style.top = '40px' ;
	div.style.left = '700px';
	//div.style.width = '500px';
	div.style.zIndex = '999';
	div.addEventListener('click',startenstop,true);
	if(GM_getValue("script") == 1) 
	{
		GM_addStyle("body { color:Purple; }");
		div.innerHTML = '<h2>AutoToetter staat AAN</h2>';
		insertAfter(div, ltop);
		tekst = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
		if(tekst.indexOf(" <!-- ERROR ITEM CONTAINER") != -1)
  	{
  		window.location.reload();
  	}
  	var urrl = document.URL;
  	urrl = urrl.substring(urrl.lastIndexOf("/")+1);
  	//alert (url);
    if(urrl.indexOf("id=32") > -1 || urrl.indexOf("gid=19") > -1)
    {
  		setTimeout( buildtroops, Random(1000, 2300));
  		return;
  	}
  	else
  	{
  		setTimeout( 'window.location.replace( "build.php?newdid=82216&gid=20")', Random(1000, 2300));
  	}
  }
  else
  {
  	div.innerHTML = '<h2>AutoToetter  staat UIT</h2>';
		insertAfter(div, ltop);
  }
};

window.addEventListener('DOMContentLoaded', hoofdfunctie, false);
if (document.body) hoofdfunctie();