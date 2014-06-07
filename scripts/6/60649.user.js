// ==UserScript==
// @name           faccine
// @namespace      http://www.erepublik.com/en/article/*
// @include        http://www.erepublik.com/en/article/*
// ==/UserScript==


var faccine = new Array();
var smiles = new Array();

//faccine varie
faccine[0]=":)";
smiles[0]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/icon_smile.gif>";

faccine[1]=":asd:";
smiles[1]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/asd.gif>";

faccine[2]=":sisi:";
smiles[2]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/sisi1xy.gif>";

faccine[3]=":nono:";
smiles[3]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/nono.gif>";

faccine[4]=":look:";
smiles[4]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/lookaround.gif>";

faccine[5]=":fag:";
smiles[5]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/fag.gif>";

faccine[6]=":rotfl:";
smiles[6]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/rotfl.gif>";

faccine[7]=":facepalm:";
smiles[7]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/facepalmsmiley1ti3.gif>";

faccine[8]=":|";
smiles[8]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/icon_neutral.gif>";

faccine[9]=":rulez:";
smiles[9]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/metal.gif>";

faccine[10]=":snob:";
smiles[10]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/snob.gif>";

faccine[11]=":pippotto:";
smiles[11]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/pippotto.gif>";

faccine[12]=":bua:";
smiles[12]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/crasd.gif>";

faccine[13]=":S";
smiles[13]="<img src=http://forumtgmonline.futuregamer.it/images/smilies/icon_dead.gif>";

faccine[14]="[quote=";
smiles[14]="<b>";

faccine[15]="]";
smiles[15]=" ha scritto:</b><br><font size=1>&nbsp ";


faccine[16]="[/quote]";
smiles[16]="</font><br>";







//article_comment



function modify( commento )
	{
	
	testo=commento.getElementsByTagName("p")[0].innerHTML;
	testo = testo.replace(/'/gi,"`");
	var name = commento.getElementsByTagName("a")[0].getAttribute("title");
	var quote = "'[quote="+name+"]"+testo+"[/quote]'";
	quote = quote.replace(/\n/gi," ");
	quote = quote.replace(/<br>/gi," ");
	
	var j = 0;
	for (j=0; j< faccine.length; j++)
		{
		testo=testo.replace(faccine[j],smiles[j]);
		}
	
	
	var cit = document.createElement("div");
	var img = document.createElement("img");
	img.setAttribute("src","http://forumtgmonline.futuregamer.it/images/buttons/quote.gif");
	cit.appendChild(img);
	commento.getElementsByTagName("div")[0].appendChild(cit);
	
	cit.setAttribute("onclick","document.getElementById('article_comment').innerHTML= "+quote+";");

	
	commento.getElementsByTagName("p")[0].innerHTML=testo;
		

	}




var div = document.getElementsByTagName("div");
for (i=0; i< div.length; i++)
	{
		if (div[i].getAttribute("class") == "commentscontent") 
			{
				var commento = div[i];
				modify(div[i]);
				
				
				



			}
	}
//http://forumtgmonline.futuregamer.it/images/buttons/quote.gif
