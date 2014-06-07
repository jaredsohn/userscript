// ==UserScript==
// @name           [WOD]Rapport_Combat
// @namespace      world-of-dungeons.fr
// @include        *.world-of-dungeons.fr/wod/spiel//dungeon/report.php*
// ==/UserScript==


function DelSpace(pstring)
	{if (pstring.indexOf(' ') == 0 || pstring.charCodeAt(0) == 10) {return pstring.substring(1,pstring.length);}
	else {return pstring;}}

function AddZero(pint)
	{var lstring = pint.toString();
	if (lstring.length == 1) {return '0'+ lstring;}
	else {return lstring;}}

	
var updateButton;
var liToSkip;
if (document.getElementsByName('level[1]')[0]) {updateButton = document.getElementsByName('level[1]')[0]; liToSkip = 1;}
else {if (document.getElementsByName('disabled')[0].value == 'Rapport') {updateButton = document.getElementsByName('disabled')[1]; liToSkip = 0;}}

var newButton;
newButton = document.createElement('input');
newButton.setAttribute('type', 'button');
newButton.setAttribute('class', 'button');
newButton.setAttribute('name', 'vueHeros');
newButton.setAttribute('value', 'Vue Héros');
newButton.addEventListener('click',SelectHeros,false);
updateButton.parentNode.insertBefore(newButton, updateButton.previousSibling);

function SelectHeros()
	{
	var tableList = document.getElementsByTagName('table'); 
	//alert(tableList.length);
	var trList = document.getElementsByTagName('tr');
	
	for(var i = 0; i < trList.length; i++ )
		{if (trList[i].getElementsByTagName('td')[0] && trList[i].getElementsByTagName('td')[0].className != 'number' && trList[i].getElementsByTagName('td')[1])
			{
			if (trList[i].getElementsByTagName('td')[0].className == 'rep_initiative') // || trList[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].className.substring(0,3) == 'rep_'
				{
				var tmpNode0 = trList[i].getElementsByTagName('td')[0];
				var tmpNode1 = trList[i].getElementsByTagName('td')[1];
				var tmpNode2 = trList[i].getElementsByTagName('td')[2];
				
				//vérification que les infos existent et que ne sont pas des infos attaquant ou défenseur
				if (tmpNode0 && tmpNode1 && tmpNode1.getElementsByTagName('a')[0])
					{var tmpA = tmpNode1.getElementsByTagName('a')[0];
					
					//identification des lignes correspondant au héro
					if (tmpA.className == 'rep_monster' || tmpA.className == 'rep_hero')
						{var effectOnHero = false;
						
						if (tmpNode2)
							{//ne masque pas les lignes avec effet sur le héro
							for(var j = 0; j < tmpNode2.getElementsByTagName('a').length; j++ )
								{
								if (tmpNode2.getElementsByTagName('a')[j].className == 'rep_myhero')
									{effectOnHero = true}
								}
							}
						if (effectOnHero == false)
							{
							trList[i].setAttribute('style', 'display:none;');
							trList[i+1].setAttribute('style', 'display:none;');
							}
						}
					//masque de la ligne des familiers
					if (tmpNode1.getElementsByTagName('span')[0] && tmpNode1.getElementsByTagName('span')[0].getAttribute('onmouseover'))
						{if (tmpNode1.getElementsByTagName('span')[0].getAttribute('onmouseover').indexOf('appartient') != -1)
							{
							trList[i].setAttribute('style', 'display:none;');
							trList[i-1].setAttribute('style', 'display:none;');
							}
						}
					}
				}
			}
		}
	}

