// ==UserScript==
// @name        Howrse Coat Image Swap - Marwari
// @namespace   myHowrse
// @description Swaps the v4 default Marwari coats out for the v3 default coats
// @include     http://*.howrse.com/elevage/fiche/*
// @include     http://*.howrse.com/elevage/chevaux/cheval*
// @version     1
// ==/UserScript==

if(document.body.textContent.indexOf("Breed: Marwari") > 0)
{
//	find the game id of the horse
	if(document.URL.indexOf("&") < 0)
		if(document.URL.indexOf("#") < 0) chevalId = document.URL.substring(document.URL.indexOf("=")+1,document.URL.length);
		else chevalId = document.URL.substring(document.URL.indexOf("=")+1,document.URL.indexOf("#"));
	else
	{
		scipts = document.getElementsByTagName("script");
		i=0;
		while(scipts[i].text.indexOf("chevalId") < 0 && i < scipts.length) ++i;
		horseVars = scipts[i].text;
		firstEqual = horseVars.indexOf("=");
		firstSemi = horseVars.indexOf(";");
		chevalId = horseVars.substring(firstEqual+2,firstSemi);
	}
	howrseImg = document.getElementById("cheval-robe-"+chevalId);
//	find if the horse is a default coat or not.  Horse's with a GA (or a non-updated default coat) will have an IMG tag and use a src attribute, horse's with a default coat will use a DIV tag and a style attribute.  Since we only care about the default updated coat here, we can ignore the coat for any horse using an IMG tag for the coat.
	if(howrseImg.hasAttribute("style"))
	{	
		tmpStyle = howrseImg.getAttribute("style");
		howrseImg.setAttribute("Id","cheval-robe-");
		howrseImg.setAttribute("style","");
		newImg = document.createElement("img");
//	Until Owlient decides to delete the old coats, we can continue to use their copy of the old coat here.
		if(tmpStyle.indexOf("adulte") < 0)
		{
			subDir = "marwari-small/";
		}
		else subDir = "marwari/";
		
		if(document.body.textContent.indexOf("Species: Unicorn") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/licornes/" + subDir;
		else if(document.body.textContent.indexOf("Species: Winged unicorn") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/licornes-ailees/" + subDir;
		else if(document.body.textContent.indexOf("Species: Pegasus") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/pegase/" + subDir;
		else subDir = "http://www.howrse.com/media/equideo/image/chevaux/normaux/" + subDir;
		
		if(document.body.textContent.indexOf("Coat: Bay") > 0)
			newSrc = subDir + "bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino") > 0)
			newSrc = subDir + "plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Mouse gray Tobiano") > 0)
			newSrc = subDir + "pie-tb-gr-s-grand.png";
		else if(document.body.textContent.indexOf("Coat: Mouse Gray") > 0)
			newSrc = subDir + "gr-s-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Tobiano") > 0)
			newSrc = subDir + "pie-tb-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut") > 0)
			newSrc = subDir + "alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Light Gray") > 0)
			newSrc = subDir + "gr-c-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Tobiano") > 0)
			newSrc = subDir + "pie-tb-sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Overo") > 0)
			newSrc = subDir + "pie-ov-sb-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun") > 0)
			newSrc = subDir + "sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dark Bay") > 0)
			newSrc = subDir + "bai-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dapple Gray") > 0)
			newSrc = subDir + "gr-pml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cremello Tobiano") > 0)
			newSrc = subDir + "pie-tb-cml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cremello") > 0)
			newSrc = subDir + "cml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Tobiano") > 0)
			newSrc = subDir + "pie-tb-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Overo") > 0)
			newSrc = subDir + "pie-ov-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut") > 0)
			newSrc = subDir + "alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry bay Tobiano") > 0)
			newSrc = subDir + "pie-tb-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry Bay Overo") > 0)
			newSrc = subDir + "pie-ov-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry bay") > 0)
			newSrc = subDir + "bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Tobiano") > 0)
			newSrc = subDir + "pie-tb-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Overo") > 0)
			newSrc = subDir + "pie-ov-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black") > 0)
			newSrc = subDir + "nr-grand.png";

		newImg.setAttribute("src",newSrc);
		newImg.setAttribute("style",tmpStyle.substring(0,tmpStyle.indexOf("background-image:")) + tmpStyle.substring(tmpStyle.indexOf(";background-position")+1,tmpStyle.length));
//	This sets the ID of the new element to what the div tag was so the game will correctly update the tag.  If this isn't set, the game won't do anything with the image.
		newImg.setAttribute("id","cheval-robe-"+chevalId);
		howrseImg.appendChild(newImg);
	}
}