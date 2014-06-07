// ==UserScript==
// @name           Facebook - MouseHunt Simple Journal
// @namespace      Zwee
// @include        http://apps.facebook.com/mousehunt/
// @include        http://apps.facebook.com/mousehunt/soundthehorn.php
// @include        http://apps.facebook.com/mousehunt/index.php
// ==/UserScript==



if (document.title != "MouseHunt on Facebook | Claim a King's Reward!"){

/*
document.body.innerHTML= document.body.innerHTML.replace(/I purchased/g,"B:");
	document.body.innerHTML= document.body.innerHTML.replace(/cheese for /g," - ");
		document.body.innerHTML= document.body.innerHTML.replace(/from the Cheese Shoppe in the/g,"-");
document.body.innerHTML= document.body.innerHTML.replace(/I sold/g,"S:");
	document.body.innerHTML= document.body.innerHTML.replace(/to the Cheese Shoppe of/g,"-");
		document.body.innerHTML= document.body.innerHTML.replace(/for /g," - ");
*/

document.body.innerHTML= document.body.innerHTML.replace(/I traveled from the/g,"");
	document.body.innerHTML= document.body.innerHTML.replace(/and have arrived at the/g," - ");
document.body.innerHTML= document.body.innerHTML.replace(/. The cost of the journey was/g,"<br>Cost: ");

document.body.innerHTML= document.body.innerHTML.replace(/sounded the Hunter's Horn.<br>/g,"-");
document.body.innerHTML= document.body.innerHTML.replace(/sounded the Party Horn.<br>/g,"- Party -");
	document.body.innerHTML= document.body.innerHTML.replace(/I was successful in my hunt! I caught/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/I checked my trap and found that I had caught a mouse! I caught/g,"♥ -");
	document.body.innerHTML= document.body.innerHTML.replace(/from the/g,"<br>");
		document.body.innerHTML= document.body.innerHTML.replace(/worth/g,"<br>");
		document.body.innerHTML= document.body.innerHTML.replace(/points and/g,"points -");
document.body.innerHTML= document.body.innerHTML.replace(/The mouse also dropped the following loot:<\/strong><br>/g,"Loot:</strong><br>");
document.body.innerHTML= document.body.innerHTML.replace(/My weapon was very effective against this mouse./g,"Very effective");

document.body.innerHTML= document.body.innerHTML.replace(/sounded the Hunter's Horn, but my/g,"-");
document.body.innerHTML= document.body.innerHTML.replace(/sounded the Party Horn, but my/g,"- Party -");
	document.body.innerHTML= document.body.innerHTML.replace(/cheese failed to attract a mouse./g,"- FTA");
  document.body.innerHTML= document.body.innerHTML.replace(/efforts were fruitless./g,"");
	document.body.innerHTML= document.body.innerHTML.replace(/ate a piece of cheese without setting off my trap./g,"- FTC");
document.body.innerHTML= document.body.innerHTML.replace(/I returned to check my trap, but it appeared my/g,"♠ -");
	document.body.innerHTML= document.body.innerHTML.replace(/cheese had failed to attract a mouse./g,"- FTA");
document.body.innerHTML= document.body.innerHTML.replace(/I returned to check my trap, but it appeared/g,"♠ -");
	document.body.innerHTML= document.body.innerHTML.replace(/had eaten a piece of cheese without setting it off./g,"- FTC");

		document.body.innerHTML= document.body.innerHTML.replace(/I replaced my bait since it seemed to be stale./g,"- Stale");

document.body.innerHTML= document.body.innerHTML.replace(/My weapon was less effective against this mouse./g,"Less effective");
document.body.innerHTML= document.body.innerHTML.replace(/Additionally, the fiend pillaged/g,"<strong>Looted:</strong><br>");
document.body.innerHTML= document.body.innerHTML.replace(/from me!/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/The power of this mouse crippled my courage, setting me back/g,"<strong>Looted:</strong><br>");

document.body.innerHTML= document.body.innerHTML.replace(/I claimed a King's Reward <br>/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/pieces of /g,"");
document.body.innerHTML= document.body.innerHTML.replace(/piece of /g,"");
}


document.body.innerHTML= document.body.innerHTML.replace(/Title:<\/span>&nbsp;&nbsp;/g,"Title:</span>&nbsp;&nbsp;"+document.getElementById("app10337532241_titlebar").title.replace('complete','')+" ");
