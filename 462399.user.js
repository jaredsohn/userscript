// ==UserScript==
// @name        Howrse Swap all v4 >> v3 Default Coats
// @namespace   myHowrse
// @description Swaps all of the v4 default coats for the v3 default coats
// @namespace   myHowrse
// @include     http://*.howrse.com/elevage/fiche/*
// @include     http://*.howrse.com/elevage/chevaux/cheval*
// @include     http://*.howrse.com/elevage/chevaux/?elevage=*
// @include     http://*.howrse.com/elevage/chevaux/rechercher*
// @include     http://*.howrse.com/dossiers/race?id=*
// @include     http://*.howrse.com/elevage/bureau/?type=havre
// @include     http://*.howrse.com/elevage/bureau/?type=pardis
// @include     http://*.howrse.com/centre/fiche?id=*
// @include     http://*.howrse.com/joueur/fiche/?id=*
// @include     http://*.howrse.com/marche/vente/*
// @version     8
// ==/UserScript==

if(document.URL.indexOf("/?elevage=") > 0 || document.URL.indexOf("/centre/fiche?id=") > 0 || document.URL.indexOf("joueur/fiche/?id=") > 0)
{
	setTimeout(changeBreedingFarmIcons,2000);
	setInterval(changeBreedingFarmIcons,5000);
}
else if(document.URL.indexOf("/rechercher") > 0 || document.URL.indexOf("bureau/?type") >0 || document.URL.indexOf("/affixe?id") > 0 || document.URL.indexOf("/race?id") > 0 || document.URL.indexOf("/marche/vente") > 0)
{
	changeBreedingFarmIcons();
}
else
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
		if(tmpStyle.indexOf("poulain") > 0 && document.URL.indexOf("/cheval?id=") > 0) changeBreedingFarmIcons();
		howrseImg.setAttribute("Id","cheval-robe-");
		howrseImg.setAttribute("style","");
		newImg = document.createElement("img");
	//	Until Owlient decides to delete the old coats, we can continue to use their copy of the old coat here.
		if(document.body.textContent.indexOf("Breed: Akhal-Teke") > 0)
			subDir = "akhal-teke";
		else if(document.body.textContent.indexOf("Breed: Appaloosa") > 0)
			subDir = "americain";
		else if(document.body.textContent.indexOf("Breed: Arabian Horse") > 0)
			subDir = "arabe";
		else if(document.body.textContent.indexOf("Breed: Argentinean Criollo") > 0)
			subDir = "americain";
		else if(document.body.textContent.indexOf("Breed: Australian Pony") > 0)
			subDir = "poney-sport";
		else if(document.body.textContent.indexOf("Breed: Barb") > 0)
			subDir = "iberique";
		else if(document.body.textContent.indexOf("Breed: Brumby") > 0)
			subDir = "primitif";
		else if(document.body.textContent.indexOf("Breed: Canadian horse") > 0)
			subDir = "iberique";
		else if(document.body.textContent.indexOf("Breed: Chincoteague Pony") > 0)
			subDir = "poney-lourd";
		else if(document.body.textContent.indexOf("Breed: Connemara") > 0)
			subDir = "poney-leger";
		else if(document.body.textContent.indexOf("Breed: Curly") > 0)
			subDir = "curly";
		else if(document.body.textContent.indexOf("Breed: Fjord") > 0)
			subDir = "fjord";
		else if(document.body.textContent.indexOf("Breed: Friesian") > 0)
			subDir = "frison";
		else if(document.body.textContent.indexOf("Breed: Gypsy Vanner") > 0)
			subDir = "tinker";
		else if(document.body.textContent.indexOf("Breed: Hackney") > 0)
			subDir = "trotteur";
		else if(document.body.textContent.indexOf("Breed: Hanoverian") > 0)
			subDir = "sport-massif";
		else if(document.body.textContent.indexOf("Breed: Highland Pony") > 0)
			subDir = "highland-pony";
		else if(document.body.textContent.indexOf("Breed: Holsteiner") > 0)
			subDir = "sport-massif";
		else if(document.body.textContent.indexOf("Breed: Icelandic horse") > 0)
			subDir = "primitif";
		else if(document.body.textContent.indexOf("Breed: Irish Hunter") > 0)
			subDir = "sport-massif";
		else if(document.body.textContent.indexOf("Breed: Knabstrupper") > 0)
			subDir = "knabstrup";
		else if(document.body.textContent.indexOf("Breed: KWPN") > 0)
			subDir = "sport-massif";
		else if(document.body.textContent.indexOf("Breed: Lusitano") > 0)
			subDir = "iberique";
		else if(document.body.textContent.indexOf("Breed: Marwari") > 0)
			subDir = "marwari";
		else if(document.body.textContent.indexOf("Breed: Morgan") > 0)
			subDir = "trotteur";
		else if(document.body.textContent.indexOf("Breed: Mustang") > 0)
			subDir = "mustang";
		else if(document.body.textContent.indexOf("Breed: Newfoundland Pony") > 0)
			subDir = "poney-primitif";
		else if(document.body.textContent.indexOf("Breed: Nokota") > 0)
			subDir = "nokota";
		else if(document.body.textContent.indexOf("Breed: Paint Horse") > 0)
			subDir = "americain";
		else if(document.body.textContent.indexOf("Breed: Peruvian Paso") > 0)
			subDir = "iberique";
		else if(document.body.textContent.indexOf("Breed: Purebred Spanish Horse") > 0)
			subDir = "iberique";
		else if(document.body.textContent.indexOf("Breed: Quarter Horse") > 0)
			subDir = "americain";
		else if(document.body.textContent.indexOf("Breed: Quarter Pony") > 0)
			subDir = "sport-leger";
		else if(document.body.textContent.indexOf("Breed: Russian Don Horse") > 0)
			subDir = "sport-massif";
		else if(document.body.textContent.indexOf("Breed: Shagya Arabian") > 0)
			subDir = "arabe";
		else if(document.body.textContent.indexOf("Breed: Shetland") > 0)
			subDir = "shetland";
		else if(document.body.textContent.indexOf("Breed: Standardbred") > 0)
			subDir = "trotteur";
		else if(document.body.textContent.indexOf("Breed: Tennessee Walker") > 0)
			subDir = "trotteur";
		else if(document.body.textContent.indexOf("Breed: Thoroughbred") > 0)
			subDir = "thoroughbred";
		else if(document.body.textContent.indexOf("Breed: Trakehner") > 0)
			subDir = "sport-leger";
		else if(document.body.textContent.indexOf("Breed: Welsh") > 0)
			subDir = "poney-sport";

		if(tmpStyle.indexOf("adulte") < 0) subDir = subDir + "-small/";
		else subDir = subDir + "/";
		
		if(document.body.textContent.indexOf("Species: Unicorn") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/licornes/" + subDir;
		else if(document.body.textContent.indexOf("Species: Winged unicorn") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/licornes-ailees/" + subDir;
		else if(document.body.textContent.indexOf("Species: Pegasus") > 0)
			subDir = "http://www.howrse.com/media/equideo/image/chevaux/pegase/" + subDir;
		else subDir = "http://www.howrse.com/media/equideo/image/chevaux/normaux/" + subDir;
		
		if(document.body.textContent.indexOf("Coat: Ulsblakk") > 0)
			newSrc = subDir + "ubk-grand.png";
		else if(document.body.textContent.indexOf("Coat: Strawberry roan") > 0)
			newSrc = subDir + "aub-grand.png";
		else if(document.body.textContent.indexOf("Coat: Rodblakk") > 0)
			newSrc = subDir + "rbk-grand.png";
		else if(document.body.textContent.indexOf("Coat: Roan") > 0)
			newSrc = subDir + "rn-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino Tovero") > 0)
			newSrc = subDir + "pie-tv-plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino Tobiano") > 0)
			newSrc = subDir + "pie-tb-plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino Spotted Blanket ") > 0)
			newSrc = subDir + "spt-plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino Overo") > 0)
			newSrc = subDir + "pie-tv-plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino Blanket ") > 0)
			newSrc = subDir + "bkt-plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Palomino") > 0)
			newSrc = subDir + "plm-grand.png";
		else if(document.body.textContent.indexOf("Coat: Mouse gray Tobiano") > 0)
			newSrc = subDir + "pie-tb-gr-s-grand.png";
		else if(document.body.textContent.indexOf("Coat: Mouse Gray") > 0)
			newSrc = subDir + "gr-s-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Tovero") > 0)
			newSrc = subDir + "pie-tv-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Tobiano") > 0)
			newSrc = subDir + "pie-tb-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Spotted Blanket") > 0)
			newSrc = subDir + "spt-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Overo") > 0)
			newSrc = subDir + "pie-ov-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut Blanket") > 0)
			newSrc = subDir + "bkt-alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Liver chestnut") > 0)
			newSrc = subDir + "alz-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Light Gray") > 0)
			newSrc = subDir + "gr-c-grand.png";
		else if(document.body.textContent.indexOf("Coat: Gulblakk") > 0)
			newSrc = subDir + "gbk-grand.png";
		else if(document.body.textContent.indexOf("Coat: Gra") > 0)
			newSrc = subDir + "gra-grand.png";
		else if(document.body.textContent.indexOf("Coat: Fleabitten Gray") > 0)
			newSrc = subDir + "gr-t-grand.png";
		else if(document.body.textContent.indexOf("Coat: Flaxen Liver chestnut") > 0)
			newSrc = subDir + "alz-b-cl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Flaxen Chestnut") > 0)
			newSrc = subDir + "alz-cl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Few Spots") > 0)
			newSrc = subDir + "fs-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Tobiano") > 0)
			newSrc = subDir + "pie-tb-sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Spotted Blanket") > 0)
			newSrc = subDir + "spt-sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Overo") > 0)
			newSrc = subDir + "pie-ov-sb-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Blanket ") > 0)
			newSrc = subDir + "bkt-sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun Blanket") > 0)
			newSrc = subDir + "bkt-sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dun") > 0)
			newSrc = subDir + "sbl-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dark bay Tovero") > 0)
			newSrc = subDir + "pie-tv-bai-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dark bay Tobiano") > 0)
			newSrc = subDir + "pie-tb-bai-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dark bay Overo") > 0)
			newSrc = subDir + "pie-ov-bai-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dark Bay") > 0)
			newSrc = subDir + "bai-b-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dapple gray Tobiano") > 0)
			newSrc = subDir + "pie-tb-gr-pml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Dapple Gray") > 0)
			newSrc = subDir + "gr-pml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cremello Tobiano") > 0)
			newSrc = subDir + "pie-tb-cml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cremello") > 0)
			newSrc = subDir + "cml-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Tovero") > 0)
			newSrc = subDir + "pie-tv-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Tobiano") > 0)
			newSrc = subDir + "pie-tb-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Spotted Blanket") > 0)
			newSrc = subDir + "spt-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Snowflake ") > 0)
			newSrc = subDir + "sfk-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Snowflake") > 0)
			newSrc = subDir + "sfk-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Overo") > 0)
			newSrc = subDir + "pie-ov-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Leopard ") > 0)
			newSrc = subDir + "leo-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Leopard") > 0)
			newSrc = subDir + "leo-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Few Spots") > 0)
			newSrc = subDir + "fs-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Blanket ") > 0)
			newSrc = subDir + "bkt-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut Blanket") > 0)
			newSrc = subDir + "bkt-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Chestnut") > 0)
			newSrc = subDir + "alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry Spotted Blanket") > 0)
			newSrc = subDir + "spt-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry bay Tobiano") > 0)
			newSrc = subDir + "pie-tb-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry Bay Overo") > 0)
			newSrc = subDir + "pie-ov-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry bay Blanket") > 0)
			newSrc = subDir + "bkt-bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Cherry bay") > 0)
			newSrc = subDir + "bai-cer-grand.png";
		else if(document.body.textContent.indexOf("Coat: Brunblakk") > 0)
			newSrc = subDir + "bbk-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Tovero") > 0)
			newSrc = subDir + "pie-tv-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Tobiano") > 0)
			newSrc = subDir + "pie-tb-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Spotted Blanket ") > 0)
			newSrc = subDir + "spt-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Spotted Blanket") > 0)
			newSrc = subDir + "spt-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Snowflake ") > 0)
			newSrc = subDir + "sfk-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Snowflake") > 0)
			newSrc = subDir + "sfk-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Overo") > 0)
			newSrc = subDir + "pie-ov-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Leopard ") > 0)
			newSrc = subDir + "leo-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Leopard") > 0)
			newSrc = subDir + "leo-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Blanket ") > 0)
			newSrc = subDir + "bkt-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black Blanket") > 0)
			newSrc = subDir + "bkt-nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Black") > 0)
			newSrc = subDir + "nr-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Tovero") > 0)
			newSrc = subDir + "pie-tv-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Tobiano") > 0)
			newSrc = subDir + "pie-tb-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Spotted Blanket ") > 0)
			newSrc = subDir + "spt-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Spotted Blanket") > 0)
			newSrc = subDir + "spt-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Snowflake ") > 0)
			newSrc = subDir + "sfk-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Snowflake") > 0)
			newSrc = subDir + "sfk.bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Overo") > 0)
			newSrc = subDir + "pie-ov-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Leopard") > 0)
			newSrc = subDir + "leo-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Few Spots") > 0)
			newSrc = subDir + "fs-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Blanket ") > 0)
			newSrc = subDir + "bkt-bai-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay Blanket") > 0)
			newSrc = subDir + "bkt-alz-grand.png";
		else if(document.body.textContent.indexOf("Coat: Bay") > 0)
			newSrc = subDir + "bai-grand.png";
			
		newImg.setAttribute("src",newSrc);
		newImg.setAttribute("style",tmpStyle.substring(0,tmpStyle.indexOf("background-image:")) + tmpStyle.substring(tmpStyle.indexOf(";background-position")+1,tmpStyle.length));
	//	This sets the ID of the new element to what the div tag was so the game will correctly update the tag.  If this isn't set, the game won't do anything with the image.
		newImg.setAttribute("id","cheval-robe-"+chevalId);
		howrseImg.appendChild(newImg);
	}
}

function changeBreedingFarmIcons()
{
	if(document.URL.indexOf("/?elevage=") > 0 || document.URL.indexOf("/centre/fiche?id=") > 0 || document.URL.indexOf("/rechercher") > 0 || document.URL.indexOf("/marche/vente") > 0) size = "40";
	else if(document.URL.indexOf("/race?id") > 0) size = "300";
	else size = "120";
	
	chevalList = document.getElementsByClassName("cheval-icone");
	for(i=0;i<chevalList.length;++i)
	{
		iconSrc = chevalList[i].getAttribute("src");
		if(iconSrc.indexOf("chevaux/") < 0 && iconSrc.indexOf("generique") < 0 && iconSrc.indexOf("/poney/") < 0 && iconSrc.indexOf("amazonaws") < 0)
		{
			if(iconSrc.indexOf("/licorne/") > 0)species = "licorne";
			else if(iconSrc.indexOf("ailee") > 0) species = "licorne-ailee";
			else if(iconSrc.indexOf("pegase") > 0) species = "pegase";
			else species = "normal";
			
			if(iconSrc.indexOf("adulte/") > 0)
			{
				chevalBreed = iconSrc.substring(iconSrc.indexOf("adulte/") + 7,iconSrc.indexOf(species + "/" + size));
				if(chevalBreed == "tennessee-walker/") chevalBreed = "trotteur/";
			}
			else
			{
				chevalBreed = iconSrc.substring(iconSrc.indexOf("poulain/") + 8,iconSrc.indexOf(species + "/" + size)-1);
				if(chevalBreed == "tennessee-walker") chevalBreed = "trotteur-small/";
				else chevalBreed = chevalBreed + "-small/";
			}
			chevalCoat = iconSrc.substring(iconSrc.indexOf(size + "/") + 3,iconSrc.indexOf(".png"));
			
			if(species == "licorne") species = "licornes/";
			else if(species == "licorne-ailee") species = "licornes-ailees/";
			else if (species == "normal") species = "normaux/";
			else species = "pegase/";
			
			if(size == "40") iconSrc = "http://www.howrse.com/media/equideo/image/chevaux/" + species + chevalBreed + chevalCoat + "-miniature.png";
			else iconSrc = "http://www.howrse.com/media/equideo/image/chevaux/" + species + chevalBreed + chevalCoat + "-grand.png";
			chevalList[i].setAttribute("src",iconSrc);
		}
	}
}
