// ==UserScript==
// @name           UMKIS - BBCODE
// @namespace      254118@...
// @description    ...
// @include        http://umkis.pl/*
// @include        http://www.umkis.pl/*
// ==/UserScript== 

// Input - BB-Code

  newInp = document.createElement("input");
  newInp.type = "button";
  newInp.className = "post"
  newInp.value = "BB-Code";
  newInp.id = "bbcodesh";
  newInp.onclick = function() { ShowBB("bbcodeshdiv"); ShowBB("bbcodedivhelp"); };
  var ref = document.getElementById("refresh12");
  ref.parentNode.insertBefore(newInp,ref);

	// DIV - Ukryty - HelpLine

  newDivh = document.createElement("div");
  newDivh.id = "bbcodedivhelp";
  newDivh.style.display = "none";
  newDivh.style.border = "1px solid black";
  newDivh.style.position = "absolute";
  newDivh.style.padding = "5px 5px 5px 5px";
  newDivh.style.margin = "20px 0px 0 -20px";
  newDivh.style.width = "400px";
	newDivh.style.height = "15px";
  newDivh.style.background = "#C7D0D7";
	newDivh.style.verticalAlign = "middle";
  var bbh = document.getElementById("bbcodesh");
  bbh.parentNode.insertBefore(newDivh,bbh);
	var text = document.createTextNode(" Pomoc! ");
  newDivh.appendChild(text);
// DIV - Ukryty - BB-Code

  newDiv = document.createElement("div");
  newDiv.id = "bbcodeshdiv";
  newDiv.style.display = "none";
  newDiv.style.border = "1px solid black";
  newDiv.style.position = "absolute";
  newDiv.style.padding = "10px 5px 5px 5px";
  newDiv.style.margin = "46px 0px 0 -20px";
  newDiv.style.width = "400px";
  newDiv.style.background = "#C7D0D7";
	newDiv.style.verticalAlign = "middle";
  var bb = document.getElementById("bbcodesh");
  bb.parentNode.insertBefore(newDiv,bb);


// Input - B

  newDivInpB = document.createElement("input");
  newDivInpB.type = "button";
  newDivInpB.className = "button"
  newDivInpB.value = " B ";
  newDivInpB.name = "addb";
  newDivInpB.onclick = function() { insertTag("b", false,"", true); };
  newDivInpB.acceskey = "b";
  newDivInpB.style.fontWeight = 'bold';
  newDivInpB.style.width = "30px";
	newDivInpB.onmouseover = function() { HelpLineB(0, "bbcodedivhelp"); };
  newDiv.appendChild(newDivInpB);
  AddC();

// Input - I

  newDivInpI = document.createElement("input");
  newDivInpI.type = "button";
  newDivInpI.className = "button"
  newDivInpI.value = " i ";
  newDivInpI.name = "addi";
  newDivInpI.onclick = function() { insertTag("i", false,"", true); };
  newDivInpI.acceskey = "i";
  newDivInpI.style.width = "30px";
	newDivInpI.onmouseover = function() { HelpLineB(1, "bbcodedivhelp"); };
  newDiv.appendChild(newDivInpI);
  AddC();

// Input - U

  newDivInpU = document.createElement("input");
  newDivInpU.type = "button";
  newDivInpU.className = "button"
  newDivInpU.value = " u ";
  newDivInpU.name = "addu";
  newDivInpU.onclick = function() { insertTag("u", false,"", true); };
  newDivInpU.acceskey = "u";
  newDivInpU.style.width = "30px";
	newDivInpU.onmouseover = function() { HelpLineB(2, "bbcodedivhelp"); };
  newDiv.appendChild(newDivInpU);
  AddC();

// Select - Color

  newDivSelectC = document.createElement("select");
  newDivSelectC.id = "bbcoldecolors";
  newDivSelectC.className = "post";
	newDivSelectC.onmouseover = function() { HelpLineB(3, "bbcodedivhelp"); };
  newDiv.appendChild(newDivSelectC);

  // Default
  newDivSelectCRed = document.createElement("option");
  newDivSelectCRed.className = "genmed";
  newDivSelectCRed.value = "444444";
  newDivSelectCRed.text = "Domyślny";
  newDivSelectCRed.style.color = "#444444";
  newDivSelectC.appendChild(newDivSelectCRed);


  // DarkRed
  newDivSelectCDarkRed = document.createElement("option");
  newDivSelectCDarkRed.className = "genmed";
  newDivSelectCDarkRed.value = "darkred";
  newDivSelectCDarkRed.text = "Ciemnoczerwony";
  newDivSelectCDarkRed.style.color = "darkred";
	newDivSelectCDarkRed.onclick = function() { insertTag("color", true,"darkred", true); };
  newDivSelectC.appendChild(newDivSelectCDarkRed);

	// Red
  newDivSelectCRed = document.createElement("option");
  newDivSelectCRed.className = "genmed";
  newDivSelectCRed.value = "red";
  newDivSelectCRed.text = "Czerwony";
  newDivSelectCRed.style.color = "red";
	newDivSelectCRed.onclick = function() { insertTag("color", true,"red", true); };
  newDivSelectC.appendChild(newDivSelectCRed);
	
  // Orange
  newDivSelectCOrange = document.createElement("option");
  newDivSelectCOrange.className = "genmed";
  newDivSelectCOrange.value = "orange";
  newDivSelectCOrange.text = "Pomarańczowy";
  newDivSelectCOrange.style.color = "orange";
	newDivSelectCOrange.onclick = function() { insertTag("color", true,"orange", true); };
  newDivSelectC.appendChild(newDivSelectCOrange);

  // Brown
  newDivSelectCBrown = document.createElement("option");
  newDivSelectCBrown.className = "genmed";
  newDivSelectCBrown.value = "brown";
  newDivSelectCBrown.text = "Brązowy";
  newDivSelectCBrown.style.color = "brown";
	newDivSelectCBrown.onclick = function() { insertTag("color", true,"brown", true); };
  newDivSelectC.appendChild(newDivSelectCBrown);

  // Yellow
  newDivSelectCYellow = document.createElement("option");
  newDivSelectCYellow.className = "genmed";
  newDivSelectCYellow.value = "yellow";
  newDivSelectCYellow.text = "Żółty";
  newDivSelectCYellow.style.color = "yellow";
  newDivSelectCYellow.onclick = function() { insertTag("color", true,"yellow", true); };
  newDivSelectC.appendChild(newDivSelectCYellow);

  // Green
  newDivSelectCGreen = document.createElement("option");
  newDivSelectCGreen.className = "genmed";
  newDivSelectCGreen.value = "green";
  newDivSelectCGreen.text = "Zielony";
  newDivSelectCGreen.style.color = "green";
  newDivSelectCGreen.onclick = function() { insertTag("color", true,"green", true); };
  newDivSelectC.appendChild(newDivSelectCGreen);

  // Olive
  newDivSelectCOlive = document.createElement("option");
  newDivSelectCOlive.className = "genmed";
  newDivSelectCOlive.value = "olive";
  newDivSelectCOlive.text = "Oliwkowy";
  newDivSelectCOlive.style.color = "olive";
  newDivSelectCOlive.onclick = function() { insertTag("color", true,"olive", true); };
  newDivSelectC.appendChild(newDivSelectCOlive);

  // Cyan
  newDivSelectCCyan = document.createElement("option");
  newDivSelectCCyan.className = "genmed";
  newDivSelectCCyan.value = "cyan";
  newDivSelectCCyan.text = "Błękitny";
  newDivSelectCCyan.style.color = "cyan";
	newDivSelectCCyan.onclick = function() { insertTag("color", true,"cyan", true); };
  newDivSelectC.appendChild(newDivSelectCCyan);

  // Blue
  newDivSelectCBlue = document.createElement("option");
  newDivSelectCBlue.className = "genmed";
  newDivSelectCBlue.value = "blue";
  newDivSelectCBlue.text = "Niebieski";
  newDivSelectCBlue.style.color = "blue";
	newDivSelectCBlue.onclick = function() { insertTag("color", true,"blue", true); };
  newDivSelectC.appendChild(newDivSelectCBlue);

  // DarkBlue
  newDivSelectCDarkBlue = document.createElement("option");
  newDivSelectCDarkBlue.className = "genmed";
  newDivSelectCDarkBlue.value = "darkblue";
  newDivSelectCDarkBlue.text = "Ciemnoniebieski";
  newDivSelectCDarkBlue.style.color = "darkblue";
	newDivSelectCDarkBlue.onclick = function() { insertTag("color", true,"darkblue", true); };
  newDivSelectC.appendChild(newDivSelectCDarkBlue);

  // Indigo
  newDivSelectCIndigo = document.createElement("option");
  newDivSelectCIndigo.className = "genmed";
  newDivSelectCIndigo.value = "indigo";
  newDivSelectCIndigo.text = "Purpurowy";
  newDivSelectCIndigo.style.color = "indigo";
	newDivSelectCIndigo.onclick = function() { insertTag("color", true,"indigo", true); };
  newDivSelectC.appendChild(newDivSelectCIndigo);

  // Violet
  newDivSelectCViolet = document.createElement("option");
  newDivSelectCViolet.className = "genmed";
  newDivSelectCViolet.value = "violet";
  newDivSelectCViolet.text = "Fioletowy";
  newDivSelectCViolet.style.color = "violet";
	newDivSelectCViolet.onclick = function() { insertTag("color", true,"violet", true); };
  newDivSelectC.appendChild(newDivSelectCViolet);

  // White
  newDivSelectCWhite = document.createElement("option");
  newDivSelectCWhite.className = "genmed";
  newDivSelectCWhite.value = "white";
  newDivSelectCWhite.text = "Biały";
  newDivSelectCWhite.style.color = "white";
	newDivSelectCWhite.onclick = function() { insertTag("color", true,"white", true); };
  newDivSelectC.appendChild(newDivSelectCWhite);

  // Black
  newDivSelectCBlack = document.createElement("option");
  newDivSelectCBlack.className = "genmed";
  newDivSelectCBlack.value = "black";
  newDivSelectCBlack.text = "Czarny";
  newDivSelectCBlack.style.color = "black";
	newDivSelectCBlack.onclick = function() { insertTag("color", true,"black", true); };
  newDivSelectC.appendChild(newDivSelectCBlack);
  AddC();
	
/*// Size

  newDivSelectS = document.createElement("select");
  newDivSelectS.id = "bbcoldesize";
  newDivSelectS.className = "post";
  newDiv.appendChild(newDivSelectS);

  // Min
  newDivSelectSMin = document.createElement("option");
  newDivSelectSMin.className = "genmed";
  newDivSelectSMin.value = "7";
  newDivSelectSMin.text = "Minimalny";
	newDivSelectSMin.onclick = function() { insertTag("size", true,"7", true); };
  newDivSelectS.appendChild(newDivSelectSMin);

	// Lit
  newDivSelectSLit = document.createElement("option");
  newDivSelectSLit.className = "genmed";
  newDivSelectSLit.value = "red";
  newDivSelectSLit.text = "Mały";
	newDivSelectSLit.onclick = function() { insertTag("size", true,"9", true); };
  newDivSelectS.appendChild(newDivSelectSLit);
	
	// Normall
  newDivSelectSNormall = document.createElement("option");
  newDivSelectSNormall.className = "genmed";
  newDivSelectSNormall.value = "444444";
  newDivSelectSNormall.text = "Normalny";
	newDivSelectSNormall.onclick = function() { insertTag("size", true,"12", true); };
  newDivSelectS.appendChild(newDivSelectSNormall);
	
  // Big
  newDivSelectSBig = document.createElement("option");
  newDivSelectSBig.className = "genmed";
  newDivSelectSBig.value = "18";
  newDivSelectSBig.text = "Duży";
	newDivSelectSBig.onclick = function() { insertTag("size", true,"18", true); };
  newDivSelectS.appendChild(newDivSelectSBig);

  // Eno
  newDivSelectSEno = document.createElement("option");
  newDivSelectSEno.className = "genmed";
  newDivSelectSEno.value = "24";
  newDivSelectSEno.text = "Ogromny";
	newDivSelectSEno.onclick = function() { insertTag("size", true,"24", true); };
  newDivSelectS.appendChild(newDivSelectSEno);
*/

// Emotikony - BB-Code

  newBBEMOT = document.createElement("img");
  newBBEMOT.src = "http://umkis.pl/images/smiles/icon_smile.gif";
  newBBEMOT.title = "Emotikony";
  newBBEMOT.alt = "Emotikony";
  newBBEMOT.id = "bbcodeemot";
  newBBEMOT.onclick = function() { ShowBB("bbcodeshdivemot"); };
	newBBEMOT.onmouseover = function() { HelpLineB(4, "bbcodedivhelp"); };
  newDiv.appendChild(newBBEMOT);

// DIV - Ukryty - BB-Code

  newDivEmo = document.createElement("div");
  newDivEmo.id = "bbcodeshdivemot";
  newDivEmo.style.display = "none";
  newDivEmo.style.border = "1px solid black";
  newDivEmo.style.position = "absolute";
  newDivEmo.style.padding = "10px 5px 5px 5px";
  newDivEmo.style.margin = "83px 0px 0 -20px";
  newDivEmo.style.width = "400px";
  newDivEmo.style.background = "#C7D0D7";
	newDivEmo.style.vAlign = "middle";
  var bbEmo = document.getElementById("bbcodesh");
  bbEmo.parentNode.insertBefore(newDivEmo,bbEmo);

	// Img - Emot :-)

  newDivImgSmile = document.createElement("img");
	newDivImgSmile.src = "http://umkis.pl/images/smiles/icon_smile.gif";
  newDivImgSmile.onclick = function() { insertTag(" :-) ", false,"", false); };
	newDivImgSmile.title = ":-)";
  newDivImgSmile.alt = ":-)";
  newDivImgSmile.style.width = "15px";
	newDivImgSmile.style.height = "15px";
	newDivImgSmile.style.border = "0px";
	newDivImgSmile.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmile);
	
	// Img - Emot ;-)

  newDivImgSmileE = document.createElement("img");
	newDivImgSmileE.src = "http://umkis.pl/images/smiles/icon_wink.gif";
  newDivImgSmileE.onclick = function() { insertTag(" ;-) ", false,"", false); };
	newDivImgSmileE.title = ";-)";
  newDivImgSmileE.alt = ";-)";
  newDivImgSmileE.style.width = "15px";
	newDivImgSmileE.style.height = "15px";
	newDivImgSmileE.style.border = "0px";
	newDivImgSmileE.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE);
	
	// Img - Emot :->

  newDivImgSmileE2 = document.createElement("img");
	newDivImgSmileE2.src = "http://umkis.pl/images/smiles/icon_smile2.gif";
  newDivImgSmileE2.onclick = function() { insertTag(" :-> ", false,"", false); };
	newDivImgSmileE2.title = ";-)";
  newDivImgSmileE2.alt = ";-)";
  newDivImgSmileE2.style.width = "15px";
	newDivImgSmileE2.style.height = "15px";
	newDivImgSmileE2.style.border = "0px";
	newDivImgSmileE2.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE2);
	
	// Img - Emot :-D

  newDivImgSmileE3 = document.createElement("img");
	newDivImgSmileE3.src = "http://umkis.pl/images/smiles/icon_biggrin.gif";
  newDivImgSmileE3.onclick = function() { insertTag(" :-D ", false,"", false); };
	newDivImgSmileE3.title = ":-D";
  newDivImgSmileE3.alt = ":-D";
  newDivImgSmileE3.style.width = "15px";
	newDivImgSmileE3.style.height = "15px";
	newDivImgSmileE3.style.border = "0px";
	newDivImgSmileE3.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE3);
	
	// Img - Emot :-P

	newDivImgSmileE4 = document.createElement("img");
	newDivImgSmileE4.src = "http://umkis.pl/images/smiles/icon_razz.gif";
  newDivImgSmileE4.onclick = function() { insertTag(" :-P ", false,"", false); };
	newDivImgSmileE4.title = ":-P";
  newDivImgSmileE4.alt = ":-P";
  newDivImgSmileE4.style.width = "15px";
	newDivImgSmileE4.style.height = "15px";
	newDivImgSmileE4.style.border = "0px";
	newDivImgSmileE4.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE4);
	
	// Img - Emot :-o

	newDivImgSmileE5 = document.createElement("img");
	newDivImgSmileE5.src = "http://umkis.pl/images/smiles/icon_surprised.gif";
  newDivImgSmileE5.onclick = function() { insertTag(" :-o ", false,"", false); };
	newDivImgSmileE5.title = ":-o";
  newDivImgSmileE5.alt = ":-o";
  newDivImgSmileE5.style.width = "15px";
	newDivImgSmileE5.style.height = "15px";
	newDivImgSmileE5.style.border = "0px";
	newDivImgSmileE5.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE5);
	
	// Img - Emot :mrgreen:

	newDivImgSmileE6 = document.createElement("img");
	newDivImgSmileE6.src = "http://umkis.pl/images/smiles/icon_mrgreen.gif";
  newDivImgSmileE6.onclick = function() { insertTag(" :mrgreen: ", false,"", false); };
	newDivImgSmileE6.title = ":mrgreen:";
  newDivImgSmileE6.alt = ":mrgreen:";
  newDivImgSmileE6.style.width = "15px";
	newDivImgSmileE6.style.height = "15px";
	newDivImgSmileE6.style.border = "0px";
	newDivImgSmileE6.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE6);
	
	// Img - Emot :lol:

	newDivImgSmileE7 = document.createElement("img");
	newDivImgSmileE7.src = "http://umkis.pl/images/smiles/icon_lol.gif";
  newDivImgSmileE7.onclick = function() { insertTag(" :lol: ", false,"", false); };
	newDivImgSmileE7.title = ":lol:";
  newDivImgSmileE7.alt = ":lol:";
  newDivImgSmileE7.style.width = "15px";
	newDivImgSmileE7.style.height = "15px";
	newDivImgSmileE7.style.border = "0px";
	newDivImgSmileE7.style.padding = "5px 5px 5px 0px";
  newDivEmo.appendChild(newDivImgSmileE7);
	
	// Img - Emot :-(

	newDivImgSmileE8 = document.createElement("img");
	newDivImgSmileE8.src = "http://umkis.pl/images/smiles/icon_sad.gif";
  newDivImgSmileE8.onclick = function() { insertTag(" :-( ", false,"", false); };
	newDivImgSmileE8.title = ":-(";
  newDivImgSmileE8.alt = ":-(";
  newDivImgSmileE8.style.width = "15px";
	newDivImgSmileE8.style.height = "15px";
	newDivImgSmileE8.style.border = "0px";
	newDivImgSmileE8.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE8);
	
	// Img - Emot :-|

	newDivImgSmileE9 = document.createElement("img");
	newDivImgSmileE9.src = "http://umkis.pl/images/smiles/icon_neutral.gif";
  newDivImgSmileE9.onclick = function() { insertTag(" :-| ", false,"", false); };
	newDivImgSmileE9.title = ":-|";
  newDivImgSmileE9.alt = ":-|";
  newDivImgSmileE9.style.width = "15px";
	newDivImgSmileE9.style.height = "15px";
	newDivImgSmileE9.style.border = "0px";
	newDivImgSmileE9.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE9);
	
	// Img - Emot :-/

	newDivImgSmileE9 = document.createElement("img");
	newDivImgSmileE9.src = "http://umkis.pl/images/smiles/icon_curve.gif";
  newDivImgSmileE9.onclick = function() { insertTag(" :-/ ", false,"", false); };
	newDivImgSmileE9.title = ":-/";
  newDivImgSmileE9.alt = ":-/";
  newDivImgSmileE9.style.width = "15px";
	newDivImgSmileE9.style.height = "15px";
	newDivImgSmileE9.style.border = "0px";
	newDivImgSmileE9.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE9);
	
	// Img - Emot :-?

	newDivImgSmileE10 = document.createElement("img");
	newDivImgSmileE10.src = "http://umkis.pl/images/smiles/icon_confused.gif";
  newDivImgSmileE10.onclick = function() { insertTag(" :-? ", false,"", false); };
	newDivImgSmileE10.title = ":-?";
  newDivImgSmileE10.alt = ":-?";
  newDivImgSmileE10.style.width = "15px";
	newDivImgSmileE10.style.height = "15px";
	newDivImgSmileE10.style.border = "0px";
	newDivImgSmileE10.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE10);
	
	//New Lane
	addbr = document.createElement('br')
	newDivEmo.appendChild(addbr);
	
	// Img - Emot :-x

	newDivImgSmileE11 = document.createElement("img");
	newDivImgSmileE11.src = "http://umkis.pl/images/smiles/icon_mad.gif";
  newDivImgSmileE11.onclick = function() { insertTag(" :-x ", false,"", false); };
	newDivImgSmileE11.title = ":-x";
  newDivImgSmileE11.alt = ":-x";
  newDivImgSmileE11.style.width = "15px";
	newDivImgSmileE11.style.height = "15px";
	newDivImgSmileE11.style.border = "0px";
	newDivImgSmileE11.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE11);
	
	// Img - Emot :shock:

	newDivImgSmileE12 = document.createElement("img");
	newDivImgSmileE12.src = "http://umkis.pl/images/smiles/icon_eek.gif";
  newDivImgSmileE12.onclick = function() { insertTag(" :shock: ", false,"", false); };
	newDivImgSmileE12.title = ":shock:";
  newDivImgSmileE12.alt = ":shock:";
  newDivImgSmileE12.style.width = "15px";
	newDivImgSmileE12.style.height = "15px";
	newDivImgSmileE12.style.border = "0px";
	newDivImgSmileE12.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE12);
	
	// Img - Emot :cry:

	newDivImgSmileE13 = document.createElement("img");
	newDivImgSmileE13.src = "http://umkis.pl/images/smiles/icon_cry.gif";
  newDivImgSmileE13.onclick = function() { insertTag(" :cry: ", false,"", false); };
	newDivImgSmileE13.title = ":cry:";
  newDivImgSmileE13.alt = ":cry:";
  newDivImgSmileE13.style.width = "15px";
	newDivImgSmileE13.style.height = "15px";
	newDivImgSmileE13.style.border = "0px";
	newDivImgSmileE13.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE13);
	
	// Img - Emot :oops:

	newDivImgSmileE14 = document.createElement("img");
	newDivImgSmileE14.src = "http://umkis.pl/images/smiles/icon_redface.gif";
  newDivImgSmileE14.onclick = function() { insertTag(" :oops: ", false,"", false); };
	newDivImgSmileE14.title = ":cry:";
  newDivImgSmileE14.alt = ":cry:";
  newDivImgSmileE14.style.width = "15px";
	newDivImgSmileE14.style.height = "15px";
	newDivImgSmileE14.style.border = "0px";
	newDivImgSmileE14.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE14);
	
	// Img - Emot 8-)

	newDivImgSmileE15 = document.createElement("img");
	newDivImgSmileE15.src = "http://umkis.pl/images/smiles/icon_cool.gif";
  newDivImgSmileE15.onclick = function() { insertTag(" 8-) ", false,"", false); };
	newDivImgSmileE15.title = "8-)";
  newDivImgSmileE15.alt = "8-)";
  newDivImgSmileE15.style.width = "15px";
	newDivImgSmileE15.style.height = "15px";
	newDivImgSmileE15.style.border = "0px";
	newDivImgSmileE15.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE15);
	
	// Img - Emot :evil:

	newDivImgSmileE16 = document.createElement("img");
	newDivImgSmileE16.src = "http://umkis.pl/images/smiles/icon_evil.gif";
  newDivImgSmileE16.onclick = function() { insertTag(" :evil: ", false,"", false); };
	newDivImgSmileE16.title = ":evil:";
  newDivImgSmileE16.alt = ":evil:";
  newDivImgSmileE16.style.width = "15px";
	newDivImgSmileE16.style.height = "15px";
	newDivImgSmileE16.style.border = "0px";
	newDivImgSmileE16.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE16);
	
	// Img - Emot :evil:

	newDivImgSmileE17 = document.createElement("img");
	newDivImgSmileE17.src = "http://umkis.pl/images/smiles/icon_rolleyes.gif";
  newDivImgSmileE17.onclick = function() { insertTag(" :roll: ", false,"", false); };
	newDivImgSmileE17.title = ":roll:";
  newDivImgSmileE17.alt = ":roll:";
  newDivImgSmileE17.style.width = "15px";
	newDivImgSmileE17.style.height = "15px";
	newDivImgSmileE17.style.border = "0px";
	newDivImgSmileE17.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE17);
	
	// Img - Emot :!:

	newDivImgSmileE18 = document.createElement("img");
	newDivImgSmileE18.src = "http://umkis.pl/images/smiles/icon_exclaim.gif";
  newDivImgSmileE18.onclick = function() { insertTag(" :!: ", false,"", false); };
	newDivImgSmileE18.title = ":!:";
  newDivImgSmileE18.alt = ":!:";
  newDivImgSmileE18.style.width = "15px";
	newDivImgSmileE18.style.height = "15px";
	newDivImgSmileE18.style.border = "0px";
	newDivImgSmileE18.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE18);
	
	// Img - Emot :?:

	newDivImgSmileE19 = document.createElement("img");
	newDivImgSmileE19.src = "http://umkis.pl/images/smiles/icon_question.gif";
  newDivImgSmileE19.onclick = function() { insertTag(" :?: ", false,"", false); };
	newDivImgSmileE19.title = ":?:";
  newDivImgSmileE19.alt = ":?:";
  newDivImgSmileE19.style.width = "15px";
	newDivImgSmileE19.style.height = "15px";
	newDivImgSmileE19.style.border = "0px";
	newDivImgSmileE19.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE19);
	
	// Img - Emot :idea:

	newDivImgSmileE20 = document.createElement("img");
	newDivImgSmileE20.src = "http://umkis.pl/images/smiles/icon_idea.gif";
  newDivImgSmileE20.onclick = function() { insertTag(" :idea: ", false,"", false); };
	newDivImgSmileE20.title = ":idea:";
  newDivImgSmileE20.alt = ":idea:";
  newDivImgSmileE20.style.width = "15px";
	newDivImgSmileE20.style.height = "15px";
	newDivImgSmileE20.style.border = "0px";
	newDivImgSmileE20.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE20);
	
	// Img - Emot :arrow:

	newDivImgSmileE21 = document.createElement("img");
	newDivImgSmileE21.src = "http://umkis.pl/images/smiles/icon_arrow.gif";
  newDivImgSmileE21.onclick = function() { insertTag(" :arrow: ", false,"", false); };
	newDivImgSmileE21.title = ":arrow:";
  newDivImgSmileE21.alt = ":arrow:";
  newDivImgSmileE21.style.width = "15px";
	newDivImgSmileE21.style.height = "15px";
	newDivImgSmileE21.style.border = "0px";
	newDivImgSmileE21.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE21);
	
	// Img - Emot :arrow:

	newDivImgSmileE22 = document.createElement("img");
	newDivImgSmileE22.src = "http://umkis.pl/images/smiles/icon_twisted.gif";
  newDivImgSmileE22.onclick = function() { insertTag(" :twisted: ", false,"", false); };
	newDivImgSmileE22.title = ":twisted:";
  newDivImgSmileE22.alt = ":twisted:";
  newDivImgSmileE22.style.width = "15px";
	newDivImgSmileE22.style.height = "15px";
	newDivImgSmileE22.style.border = "0px";
	newDivImgSmileE22.style.padding = "5px 5px 5px 0px";	
  newDivEmo.appendChild(newDivImgSmileE22);
	
function ShowBB(div){
var OldDiv = document.getElementById(div);
	if(OldDiv.style.display=='inline'){
		OldDiv.style.display = "none";
	}
	else{
	OldDiv.style.display = "inline";
	}
}

function HelpLineB(number,div){
var HelpLineTab=new Array();
HelpLineTab[0] = "Tekst pogrubiony: [b]tekst[/b] - zaznacz tekst i kliknij";
HelpLineTab[1] = "Tekst kursywą: [i]tekst[/i] - zaznacz tekst i kliknij";
HelpLineTab[2] = "Tekst podkreślony: [u]tekst[/u] - zaznacz tekst i kliknij";
HelpLineTab[3] = "Kolor czcionki: [color=red]tekst[/color] - zaznacz tekst, wybierz kolor";
HelpLineTab[4] = "Emotikony: :-) - Wybierz miejsce, a nastepnie użyj emotki";
var OldDiv = document.getElementById(div);
OldDiv.innerHTML = HelpLineTab[number];

}

function AddC(){
  var text = document.createTextNode(" ");
  var OldDiv = document.getElementById("bbcodeshdiv");
  OldDiv.appendChild(text);
}

function insertTag(tagName, hasAttribute, ifhasAttribute, isDouble) {

    var inp = document.getElementById("messageBox");

    if(document.selection)
    {
        var Selection = document.selection.createRange();
        var SelectionlLength = Selection.text.length;
        Selection.moveStart("character", -inp.value.length);
        inp.selectionStart = Selection.text.length - SelectionlLength;
        inp.selectionEnd = inp.selectionStart + SelectionlLength;
    }

    var openTag = '';
    if(hasAttribute == true)
        openTag = '[' + tagName + '=' + ifhasAttribute + ']';
    else if(hasAttribute == false && isDouble == false) {
		 openTag = tagName;
		} else {
		openTag = '[' + tagName + ']';
		}
    var closeTag = '[/' + tagName + ']';

    var txt = new Array();
    if(typeof(inp.selectionStart) == 'number' && typeof(inp.selectionEnd) == 'number')
    {
        txt[0] = inp.value.substring(0, inp.selectionStart);
        txt[1] = openTag + inp.value.substring(inp.selectionStart, inp.selectionEnd) + ((isDouble == true) ? closeTag : '');
        txt[2] = inp.value.substring(inp.selectionEnd);
        inp.value = txt[0] + txt[1] + txt[2];
    }

    textarea.focus();

}