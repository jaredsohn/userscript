// ==UserScript==
// @name       Dragonbar Debug
// @namespace  DT PoWaaaa
// @version    0.1
// @description  Barre qui met a jour la BDD
// @include    *ogame.fr/game/index.php?page=*
// @copyright  2011+, Chandragon
// ==/UserScript==

window.addEventListener("load", function(e) {
  alert('test1');
var nb=/[0-9]/gi;
var coo_reg = /\[([0-9]):([0-9]+):([0-9]+)\]/gi;
var pseudo = document.evaluate("//div[@id='playerName']/span[@class='textBeefy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
    alert('test2: '+pseudo);
    var test = document.getElementById("myPlanets");
    alert('test3: '+test);
    var coord = "";
if(test)
    coord = document.evaluate("//div[@id='myPlanets']/div[@class='smallplanet']/a[@class='planetlink active tipsStandard']/span[@class='planet-koords']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
    else
    coord = document.evaluate("//div[@id='myWorlds']/div[@class='smallplanet']/a[@class='planetlink active tipsStandard']/span[@class='planet-koords']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
    coord = coord.replace(coo_reg,"$1:$2:$3");
    alert('test4: '+coord);
//GM_deleteValue('mdp');
if(!GM_getValue('mdp'))
{
    alert('test5');
    GM_setValue('mdp',prompt("Choisissez un mot de passe (il vous sera demandé pour voir et lancer des alertes)"));
    send("joueur="+pseudo+"&mdp="+GM_getValue('mdp'));
}
if (window.location.href.indexOf('station') >= 0)
{
var lvl = levels(6);
    send("joueur="+pseudo+"&mdp="+GM_getValue('mdp')+"&coord="+coord+"&chantier="+lvl[1]+"&silo="+lvl[4]+"&nanite="+lvl[5]);
}
else
    if (window.location.href.indexOf('research') >= 0)
{
var lvl = levels(16);
  send("joueur="+pseudo+"&mdp="+GM_getValue('mdp')+"&ri="+lvl[6]+"&armes="+lvl[13]+"&bouclier="+lvl[14]+"&coque="+lvl[15]);
}
else
    if (window.location.href.indexOf('defense') >= 0)
{
var lvl = levels(10);
  send("joueur="+pseudo+"&mdp="+GM_getValue('mdp')+"&coord="+coord+"&lm="+lvl[0]+"&lleg="+lvl[1]+"&llourd="+lvl[2]+"&gauss="+lvl[3]+"&ions="+lvl[4]+"&plasmas="+lvl[5]+"&mip="+lvl[8]+"&mi="+lvl[9]);
}
else
    if (window.location.href.indexOf('fleet1') >= 0)
{
var lvl = levels(13);
  send("joueur="+pseudo+"&mdp="+GM_getValue('mdp')+"&coord="+coord+"&cle="+lvl[0]+"&clo="+lvl[1]+"&cr="+lvl[2]+"&vb="+lvl[3]+"&tr="+lvl[4]+"&bb="+lvl[5]+"&destr="+lvl[6]+"&edlm="+lvl[7]+"&pt="+lvl[8]+"&gt="+lvl[9]+"&colo="+lvl[10]+"&rec="+lvl[11]+"&sonde="+lvl[12]);
}
alert('test6');
GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://dragonspy.webou.net/mips/check_alert.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "*/*"
			},
			data: "joueur="+pseudo+"&mdp="+GM_getValue('mdp'),
			onload: function(response) {
                            //alert("reponse: "+response.responseText);
                            if(response.responseText!='')
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
                                    GM_deleteValue('mdp');
                                    GM_setValue('mdp',prompt("Resaisissez votre mot de passe"));
                                }
                            }
			}
		}
	);
}