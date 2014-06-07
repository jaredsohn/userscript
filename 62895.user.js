// ==UserScript==
// @name           tribalwars-plapl-buildings
// @version        1.2
// @namespace      Die Stämme
// @description    Zeigt an wie viele Stufen noch gebaut bzw abgerissen werden müssen. Bauschleife wird beachtet.
// @include        http://ae*.tribalwars.ae/*
// @author 	   Lukas R. (LudwigXXXXXV)
// ==/UserScript==
doc=document;
function Speichern (Event)
	{
	var v="stufen"
	var n=location.href.split(".")[0].replace("http://","");
	if(GM_getValue(n)!=undefined)
		{
		GM_deleteValue(n);
		}
	for(var a=1;a<=gebäude;a++)
		{
		var b=doc.getElementById(a).value;
		v+=" "+b;
		}
	GM_setValue(n,v);
	}
if(doc.URL.match("mode=buildings"))
	{
	var an1="<span class='grey'>(";
	var an2="(";
	var en=")</span>";
	var en2=")"
	var tabelle=doc.getElementsByTagName("table")[doc.getElementsByTagName("table").length-2];
	var zeile=tabelle.getElementsByTagName("tr")[0];
	var spalten=zeile.getElementsByTagName("th");
	var gebäude=spalten.length-3;
	var n=location.href.split(".")[0].replace("http://","");
	if(GM_getValue(n)==undefined)
		{
		var v="stufen 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
		}
	else
		{
		var v=GM_getValue(n);
		}
	v=v.split(" ");
	for(var x=1;x<=gebäude;x++)
		{
		var spalte=zeile.getElementsByTagName("th")[x+1];
		var feld=doc.createElement("input");
		feld.id=x;
		feld.size="2";
		feld.value=v[x];
		spalte.appendChild(feld);
		}
	var knopf=doc.createElement("button");
	knopf.innerHTML="<img src=\"http://www.juris.de/jportal/jp_js1_p/content_fpanwalt/Hilfe/Hilfesystem/Screenshots_neu/SpeichernSymbolHJR.gif\">";
	knopf.addEventListener("click", Speichern, false);
	spalte.appendChild(knopf);
	var dörfer=tabelle.getElementsByTagName("tr").length-1;
	for(var y=1;y<=dörfer;y++)
		{
		var dorf=tabelle.getElementsByTagName("tr")[y];
		for(var z=1;z<=gebäude;z++)
			{
			var kasten=dorf.getElementsByTagName("td")[z+1].innerHTML;
			if(kasten.match("span"))
				{
				kasten=dorf.getElementsByTagName("td")[z+1];
				var span=kasten.getElementsByTagName("span")[0];
				span.className="";
				var stufe="0";
				}
			else
				{
				var stufe=kasten;
				}
			var stufebald=stufe;
			var stufesoll=doc.getElementById(z).value;
			var tdcon=dorf.getElementsByTagName("td")[dorf.getElementsByTagName("td").length-1];
			var bau=tdcon.getElementsByTagName("img");
			if(bau!=undefined)
				{
				var 

akgebäude=tabelle.getElementsByTagName("th")[z+1].getElementsByTagName("a")[0].getElementsByTagName("img")[0].title;
				for(var c=0;c<bau.length;c++)
					{
					var construct=bau[c].title.split(" ")[0];
					if(construct!="Abriss")
						{
						if(akgebäude==construct)
							{
							stufebald++;
							}
						}
					else
						{
						c++;
						construct=bau[c].title.split(" ")[0];
						if(akgebäude==construct)
							{
							stufebald--;
							}
						}
					}
				}
			if(stufe==stufesoll)
				{
				dorf.getElementsByTagName("td")[z+1].innerHTML="-";
				}
			else
				{
				var difer=stufesoll-stufebald;
				if(difer<0)
					{
					var neu=stufe+an1+difer+en;
					}
				else
					{
					var neu=stufe+an2+difer+en2;
					}
				dorf.getElementsByTagName("td")[z+1].innerHTML=neu;
				}
			}
		}
	}