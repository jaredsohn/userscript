// ==UserScript==
// @name           Auto-EI
// @author         4121F
// @description    Auto builds Equites Imperatoris
// @include        http://*.travian.*/* 
// @exclude        http://forum.travian.*
// @exclude        http://speed.travian.co.id/build.php?gid=16
// @exclude        http://speed.travian.co.id/build.php?id=39
// @exclude        http://speed.travian.co.id/a2b*
// @email          black_lotus_id@yahoo.com
// @version        1.01 
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
		minimum = 2000;
		maximum = 1500;
	}
	var rand=Math.round(Math.random()*maximum);
	rand = rand<minimum ? (rand+minimum):rand;
	return rand;
		
};
function buildtroops() 
{
		var code = document.getElementById('content').innerHTML;
		var maxaant = getNumber(code.substr(code.lastIndexOf("t1.value"), 20));
		if(maxaant > 0) 
		{
			document.forms.namedItem("snd").elements.namedItem('t2').value= maxaant;
			document.forms.namedItem("snd").submit();
			setTimeout( 'window.location.replace( "spieler.php?uid=6078")', Random());
		}
		else 
		{
			setTimeout( 'window.location.replace( "spieler.php?uid=6078")', Random());
		}
};
function startenstop() {

	if(GM_getValue("script",0) == 0) {
		GM_setValue("script",1);
		
		//alert("start");
	}else{
		GM_setValue("script",0);
		GM_addStyle("body { color:green; }");
		//alert("stop");
	}
	window.location.reload(); 
	
};
function hoofdfunctie() {
  var mtop = document.getElementById('mtop');
	var div = document.createElement ('div'); 
	div.style.position = 'relative';
	div.style.top = '-50px' ;
	div.style.left = '800px';
	//div.style.width = '500px';
	div.style.zIndex = '999';
	div.addEventListener('click',startenstop,true);
	if(GM_getValue("script") == 1) 
	{
		GM_addStyle("body { color:red; }");
		div.innerHTML = '<h2>Auto build EI START</h2>';
		insertAfter(div, mtop);
		tekst = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
		if(tekst.indexOf(" <!-- ERROR ITEM CONTAINER") != -1)
  	{
  		window.location.reload();
  	}
  	var urrl = document.URL;
  	urrl = urrl.substring(urrl.lastIndexOf("/")+1);
  	//alert (url);
    if(urrl.indexOf("id=28") > -1 || urrl.indexOf("gid=20") > -1)
    {
  		setTimeout( buildtroops, Random());
  		return;
  	}
  	else
  	{
  		setTimeout( 'window.location.replace( "build.php?gid=20")', Random());
  	}
  }
  else
  {
  	div.innerHTML = '<h2>Autotrain EI (status: STOP)</h2>';
		insertAfter(div, mtop);
  }
};

window.addEventListener('DOMContentLoaded', hoofdfunctie, false);
if (document.body) hoofdfunctie();