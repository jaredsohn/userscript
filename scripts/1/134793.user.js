// ==UserScript==
// @name           def
// @namespace      benneb
// @include        http://*.ogame.fr/game/index.php?page=defense*
// @include        http://*.ogame.fr/game/index.php?page=overview*
// @updateURL      http://userscripts.org/scripts/source/134793.meta.js
// @downloadURL    https://userscripts.org/scripts/source/134793.user.js
// @grant		   GM_getValue
// @grant		   GM_setValue
// ==/UserScript==
function getNB(id)
{
	var details = document.getElementById("details"+id);
	var cl = details.getElementsByClassName("level");
	var clsplit = cl[0].innerHTML.split("span>");
	if( clsplit.length > 1 )
	{
		return clsplit[1].replace(".","");
	}
	else
	{
		return cl[0].innerHTML.replace(".","");
	}
}

function setNB(id, nb)
{
	nb = nb <= 0 ? 0 : nb;
	if(document.getElementById("details"+id))
	{
		var details = document.getElementById("details"+id).getElementsByClassName("ago_items_textCount ago_items_text ago_text_background")[0];
		if(details)
		{
			details.innerHTML  =  "<span style='color:lime'>"+nb+"</span>#"+details.innerHTML;
		}
	}
}
function getNBsatMajore(nb)
{
	return nb+nb*((1-(nb/nbSatmax))*0.5);
}
function getNBresult(major, nbDef, maxSat)
{
	return Math.round(major*nbDef/maxSat);
}

if (document.location.href.indexOf("page=overview") != -1) {
	var DATA = unsafeWindow.ifcDATA;
	
	if(document.getElementsByName('ogame-planet-type')[0].content == "planet" )
	{
		for (i=0 ; i<DATA.planet.length ; i++)
		{ 
			if( DATA.planet[i].moon == "false")
			{
				GM_setValue(DATA.planet[i].name,DATA.planet[i].fleet.sat);
			}
		}
	}
}
if (document.location.href.indexOf("page=defense") != -1) {
		
	var planetname = document.getElementsByName('ogame-planet-name')[0].content;
	var coord = "["+document.getElementsByName('ogame-planet-coordinates')[0].content+"]";
	
	var nbSatmax = 2000;
	var ddd = GM_getValue(planetname+" "+coord,0);
	var nbSat = parseInt(ddd);
	
	var major = getNBsatMajore(nbSat);

	var nbMissile    = getNB(401);
	var nbLaserleger = getNB(402);
	var nbLaserlourd = getNB(403);
	var nbGauss      = getNB(404);
	var nbPlasma     = getNB(406);

	var  maxMissile    = 6000;
	var  maxLaserLeger = 1000;
	var  maxLaserLourd = 500;
	var  maxGauss      = 120;
	var  maxPlasma     = 70;

	setNB(401,getNBresult(major, maxMissile, nbSatmax)    - nbMissile);   
	setNB(402,getNBresult(major, maxLaserLeger, nbSatmax) - nbLaserleger);
	setNB(403,getNBresult(major, maxLaserLourd, nbSatmax) - nbLaserlourd);
	setNB(404,getNBresult(major, maxGauss, nbSatmax)      - nbGauss);     
	setNB(406,getNBresult(major, maxPlasma, nbSatmax)     - nbPlasma);  
}