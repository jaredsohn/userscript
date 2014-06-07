// ==UserScript==
// @name           galaxyRank
// @namespace      Ogame
// @description	Affiche le rang dans la galaxie, ajoute un lien ogame stats, change les couleurs
// @include        *.ogame.fr*
// ==/UserScript==

var url = window.location.href;
if(url.indexOf('page=galaxy')==-1 && url.indexOf('page=statistics')==-1 ) return;

var ColorsGR= {
	inactive : "yellow",
	longinactive : "yellow",
	noob : "green",
	vacation : "skyblue"
}

var a=document.getElementsByTagName("a");
var b;
function colorize(node,color)
{
	node.style.color=color;
	for(var k=0;k<node.childNodes.length;k++)
		if(node.childNodes[k].style)
			node.childNodes[k].style.color=color;
}
function register(elt, evt, fx)
{
	if (elt.addEventListener) 
		elt.addEventListener(evt, fx, false); 
	else if (elt.attachEvent) 
		elt.attachEvent('on'+evt, fx);
}

function getStats()
{
	if(this.nodeName.toLowerCase()!="img"||!this.name)return;
window.open('http://ogame.gamestats.org/?lang=fr&uni=4&page=search&post=1&type=player&name='+this.name.replace(/\s/g,"+")+'#graph-2',target='stats');
}
function createStatsLink(name)
{
	var img=document.createElement("IMG");
	img.src="http://ogame.gamestats.org/img/favicon.ico";
	img.name=name;
	register(img, "click", getStats);
	img.width="15";
	return img;
}

function getName(b)
{
	var name="";
	var d=b.childNodes;
	for(var j=0;j<d.length;j++)
		if(d[j].nodeName.toLowerCase()=="span")
		{
		  name=d[j].innerHTML;
		  if(name.indexOf("(")!=-1)
		  {
			name=name.substr(0,name.indexOf("("));
		  }
		}
	return name;
}
function getRank(mouseOver)
{
	var c=mouseOver.substr(mouseOver.indexOf(", classé ")+8);
	c=c.substr(0,c.indexOf("ème"))
	return parseInt(c);
}
function addRank(b,rank)
{
		b.lastChild.innerHTML+=" ("+rank+"ème)";
}

if(url.indexOf('page=galaxy')!=-1 )
{
	for(var i=0;i<a.length;i++)
	{
		b=a[i];
		mouseOver=b.getAttribute("onmouseover");
		if(mouseOver&& mouseOver.indexOf(", classé ")!=-1)
		{
			var name=getName(b);
			
			// region classement
			var rank=getRank(mouseOver);
			addRank(b,rank);
			if(rank>1800)colorize(b,"blue");
			
			for(var j=0;j<b.childNodes.length;j++)
				switch(b.childNodes[j].className)
				{
					case "inactive":
						colorize(b,ColorsGR.inactive);
						break;
					case "longinactive":
						colorize(b,ColorsGR.longinactive);
						break;
					case "noob":
						colorize(b,ColorsGR.noob);
						break;
					case "vacation":
						colorize(b,ColorsGR.vacation);
						break;
					default:
						break;
				}
			
			// region stats 2
			b.parentNode.insertBefore(createStatsLink(name),b);
		}
		else if (mouseOver && 
			mouseOver.indexOf('Propriétés')!=-1 && 
			mouseOver.indexOf("'Lune")!=-1 &&
			mouseOver.indexOf("Espionner")!=-1)
		{
			function sub(str,debut,fin,avec)
			{
				return str.substr(str.indexOf(debut)+(avec?0:debut.length),
							str.indexOf(fin)+fin.length-(avec?str.indexOf(debut):0));
			}
			var link=sub(mouseOver,"index.php?","target_mission=", true);
			var galax=parseInt(sub(link,"galaxy=","&system"), false);
			var syst=parseInt(sub(link,"&system=","&planet"), false);
			var planet=parseInt(sub(link,"&planet=","&planettype"), false);
			var planettype=parseInt(sub(link,"&planettype=", "&target"), false);
			var target=3;
			var mO=mouseOver.split("Espionner");
			var newMO=mO[0]+'<a onclick="javascript:doit(6,'+galax+','+syst+','+planet+','+planettype+','+target+')">Espionner</a>'+mO[1];
			b.setAttribute("onmouseover", newMO);
			
		}

	}

	// Elargissement du tableau
	var a=document.getElementsByTagName("table");
	var b;
	for(var i=0;i<a.length;i++)
	{
	b=a[i];
	  width=b.getAttribute("width");
		if(width&&width==569)
		{
			b.setAttribute("width",619);
		}
	}

	// Agrandit la colone après avoir ajouté les places.
	var a=document.getElementsByTagName("th");
	var b;
	for(var i=0;i<a.length;i++)
	{
		b=a[i];
		width=b.getAttribute("width");
		if(width&&width==150)
		{
			b.setAttribute("width",200);
		}
	}

	// Ajouter chercher stats
	var a=document.getElementsByTagName("img");
	for(var i=0;i<a.length;i++)
	{
		b=a[i];
	    atribut=b.getAttribute("title");
		if(attribut&& attribut.indexOf("Espionner")!=-1)
		{
			var th=b.parentNode.parentNode;
			th.insertBefore(node, th.childNodes[1]);
		}
	}
}
else if(url.indexOf('page=statistics')!=-1 )
{
var j=0;
	for(var i=0;i<a.length;i++)
	{
		b=a[i];
		var ref=b.getAttribute("href");
//if(j++<65)alert((ref.indexOf('/game/index.php?page=galaxy&no_header=1&')!=-1?"yes ":"no ")+ref);
		
		if(ref.indexOf('/game/index.php?page=galaxy&no_header=1&')!=-1)
		{
		var th=b.parentNode;
		var tr=th.parentNode;
		for(var j=0;j<tr.childNodes.length;j++)
		{
			if(tr.childNodes[j]==th) break;
		}
		// recherche de la cellule suivante
		do {
			j++;
		} while(tr.childNodes[j].nodeName.toLowerCase()!="th")
		
			tr.childNodes[j].insertBefore(createStatsLink(b.innerHTML),tr.childNodes[j].firstChild);
		}
	}
}