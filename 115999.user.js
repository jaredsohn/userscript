// ==UserScript==
// @name       Dragonbar
// @namespace  DT PoWaaaa
// @version    0.3
// @description  Barre qui met a jour la BDD
// @include    *ogame.fr/game/index.php?page=*
// @copyright  2011+, Chandragon
// ==/UserScript==

window.addEventListener("load", function(e) {
  
var nb=/[0-9]/gi;
var pseudo = document.evaluate("//div[@id='playerName']/span[@class='textBeefy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
    
//GM_deleteValue(pseudo);
    
    var coord = coords();
    var is_lune = lune();
    
    
if(!GM_getValue(pseudo))
{
    GM_setValue(pseudo,prompt("Choisissez un mot de passe (il vous sera demandé pour voir et lancer des alertes)"));
    send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo));
}
if (window.location.href.indexOf('station') >= 0)
{
    if(is_lune=='&lune=false')
    {
var lvl = levels(6);
    send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo)+"&coord="+coord+"&chantier="+lvl[1]+"&silo="+lvl[4]+"&nanite="+lvl[5]+is_lune);
    }
    else
    {
        var lvl = levels(5);
    send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo)+"&coord="+coord+"&phalange="+lvl[3]+"&porte="+lvl[4]+is_lune);
    }
}
else
    if (window.location.href.indexOf('research') >= 0)
{
var lvl = levels(16);
  send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo)+"&ri="+lvl[6]+"&armes="+lvl[13]+"&bouclier="+lvl[14]+"&coque="+lvl[15]);
}
else
    if (window.location.href.indexOf('defense') >= 0)
{
var lvl = levels(10);
  send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo)+"&coord="+coord+"&lm="+lvl[0]+"&lleg="+lvl[1]+"&llourd="+lvl[2]+"&gauss="+lvl[3]+"&ions="+lvl[4]+"&plasmas="+lvl[5]+"&mi="+lvl[8]+"&mip="+lvl[9]+is_lune);
}
else
    if (window.location.href.indexOf('fleet1') >= 0)
{
var lvl = levels(13);
  send("joueur="+pseudo+"&mdp="+GM_getValue(pseudo)+"&coord="+coord+"&cle="+lvl[0]+"&clo="+lvl[1]+"&cr="+lvl[2]+"&vb="+lvl[3]+"&tr="+lvl[4]+"&bb="+lvl[5]+"&destr="+lvl[6]+"&edlm="+lvl[7]+"&pt="+lvl[8]+"&gt="+lvl[9]+"&colo="+lvl[10]+"&rec="+lvl[11]+"&sonde="+lvl[12]+is_lune);
}

GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://dragonspy.webou.net/mips/check_alert.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "*/*"
			},
			data: "joueur="+pseudo+"&mdp="+GM_getValue(pseudo),
			onload: function(response) {
                            //alert("reponse: "+response.responseText);
                            if(response.responseText!='' && response.responseText.indexOf("L'URL demandée n'a pu être chargée")<0)
                            {
				var barre = document.createElement("li");
var element = document.evaluate("//ul[@id='menuTable']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
                                var rep = response.responseText.replace(/<br\/>/g,"\n");
	barre.innerHTML = '<img src="http://img707.imageshack.us/img707/4049/iconeyo.png" height="32" width="176">';
	barre.id = 'dragonbar';
barre.className = "menubutton_table";
barre.heigth=30;
                                barre.addEventListener('click',function(){alert(rep);},false);
	element.insertBefore(barre,element.firstChild);
                        }
			}
		}
	);
    
    var link = document.createElement("li");
var elem = document.evaluate("//ul[@id='menuTable']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    link.innerHTML = '<span class="menu_icon"><a href="http://dragontribe.actifforum.com/"><img src="http://i20.servimg.com/u/f20/11/10/41/92/nonew_10.png" height="29" width="29"></a></span><a class="menubutton premiumHighligt" href="http://dragonspy.webou.net/mips/alert.php" accesskey="" target="_self"><span class="textlabel">Lancer une alerte</span></a>';
	elem.appendChild(link);

}, false);



function levels(nombre)
{
    var niv = new Array();
    var niveaux = document.getElementsByClassName('level');
    var niveau='';
    var bati='';
	
		for (var f=0; f<nombre ; f++)
		{
			if(typeof(niveaux[f].getElementsByClassName('textlabel')[0])=="undefined") 
			{ 
				niveau = niveaux[f].innerHTML; 
			}
			else 
			{
				niveau = niveaux[f].innerHTML;
				bati = niveaux[f].getElementsByClassName('textlabel')[0].innerHTML;				
				niveau = niveau.replace(bati, '').replace(/<span class="textlabel"><\/span>/i, '');
			}							
			niv[f]=parseInt(niveau.replace( /[^0-9-]/g, ""));			
		}
    return niv;
}

function coords()
{
    var coo_reg = /\[([0-9]):([0-9]+):([0-9]+)\]/gi;
    
    var planets = document.getElementById("rechts").getElementsByClassName("smallplanet");
    var numeroplanete = 0;
    
    if ( planets.length >1 )
		{
			numeroplanete=-1;
			nbPlanet = 0;
			
			for ( var i=0; i<planets.length ; i++)
			{	//alert(planets[i].split('class="planetPic"')[0].split('')[0].indexOf('planetlink active tipsStandard' ) > -1))
				
				//idPlanete[nbPlanet] = planets[i].innerHTML.split('moonlink')[0].slice(planets[i].innerHTML.split('moonlink')[0].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[0].indexOf('" title')).replace( /[^0-9-]/g, "");

				if( planets[i].innerHTML.split('class="planetPic"')[0].indexOf('planetlink active tipsStandard' ) > -1 ) // Si planete active
				{
				
					numeroplanete = i;
					
				}
				
				
                        }
                }
    
    var coord = planets[numeroplanete].getElementsByClassName('planet-koords')[0].innerHTML;
    coord = coord.replace(coo_reg,"$1:$2:$3");
    return coord;
}

function lune()
{
    var IsMoon = '';
	
			var scriptNode = document.getElementsByTagName('script')
			for(var i=scriptNode.length-1 ; i>0 ; i--)
			{
				if(/var resourceTickerMetal =/.test(scriptNode[i].textContent))
				{
					IsMoon = (parseFloat(scriptNode[i].textContent.split('production:')[1].split(',')[0]) >0 ? false : true);
					break;
				}
			
			}
    var Islune = '&lune=false';
    if(IsMoon)
        Islune = '&lune=true';
    return Islune;
}

function send(data)
{
    
    GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://dragonspy.webou.net/mips/update.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "*/*"
			},
			data: data,
			onload: function(response) {
                            if(response.responseText!='')
                            {
                            alert(response.responseText);
                                if(response.responseText=='Un autre mot de passe est enregistré pour ce compte, contactez un administrateur DT!'||response.responseText=='wrong password')
                                {
                                    GM_deleteValue(pseudo);
                                    GM_setValue(pseudo,prompt("Resaisissez votre mot de passe"));
                                }
                            }
			}
		}
	);
}