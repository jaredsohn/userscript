// ==UserScript==
// @name           VDM
// @include        http://www.viedemerde.fr/*
// ==/UserScript==


try
{

// Pour supprimer plein de cadres
posts = [];
posts = document.getElementsByClassName("post");
for (i=0; i<posts.length; i++)
{
	liens = [];
	liens = posts[i].getElementsByTagName("a")
	if (liens.length>0)
	{
//		var str = liens[0].innerHTML;
		var strbis = liens[0].name;

		// Supprime la VDM people
		if (posts[i].innerHTML.indexOf("VDM people")>-1)
		{
			posts[i].style.display="none";
			continue;
		}
		// Supprime les commentaires
		if (strbis.indexOf("c_")>-1)
		{
			posts[i].style.display="none";
			continue;
		}
		// Supprime le cadre « plus de VDM ? »
		if (posts[i].innerHTML.indexOf("Plus de VDM")>-1)
		{
			posts[i].style.display="none";
			continue;
		}
		// Supprime les cadres « suivre les commentaires »
		if (posts[i].innerHTML.indexOf("Suivre les commentaires")>-1)
		{
			posts[i].style.display="none";
			continue;
		}
		// Supprime le cadre d'inscription
		if (posts[i].innerHTML.indexOf("Pour pouvoir commenter")>-1)
		{
			posts[i].style.display="none";
			continue;
		}
	}
}

// Pour supprimer les boîtes sur le côté droit
boxes = [];
boxes = document.getElementsByClassName("box");
for (i=0; i<boxes.length; i++)
{
	titres = [];
	titres = boxes[i].getElementsByClassName("titretop");
	if (titres.length==0)
	{
		boxes[i].style.display="none";
	}
	else
	{
		var titre = titres[0].innerHTML;
		if (titre.indexOf("Catégories")<0)
		{
			boxes[i].style.display="none";
		}
	}
}


// Pour supprimer les commentaires au survol
dates = [];
dates = document.getElementsByClassName("date");

for(i=0;i<dates.length;i++)
{
	var numero = dates[i].getElementsByClassName("jTip")[0];
	var date = dates[i].innerHTML;
//	Pour cacher le nombre de commentaires et le nombre de votes et ainsi s'épargner l'irrésistible
//	envie d'aller apprendre la vie aux milliers de connards qui ont toujours raison
//	(reste un petit détail à régler : quand on clique le nombre s'affiche. Pas le temps de voir ça maintenant.)
	dates[i].innerHTML = date.replace(/\([0-9]*\)/g,"");
//	Pour cacher seulement le nombre de commentaires, mais laisser le nombre de votes :
//	dates[i].innerHTML = date.substr(0,date.indexOf("(")) + date.substr(date.indexOf(")")+1,500);
	numero.style.display="none";
	
}


}
catch(e)
{
	alert(e);
}
