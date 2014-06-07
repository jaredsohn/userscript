// ==UserScript==
// @name           Tribalwars Skin Old  
// @namespace      El-Barto 
// @description    Skin for TribalWars 
// @include        *screen=overview*

// ==/UserScript==


//Delete if you dont want the Stoppa FRA link



var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 0px solid ; margin-bottom: 5px; ' +
    'font-size: small; background-color: ; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    '<div style="float: right; clear: right;"><font size="1"><a href="http://stoppafralagen.nu/">Stoppa FRA</a></font></div> ' +
    '</p></div>';
document.body.insertBefore(logo, document.body.secondChild);



//stop deleting



var imgs = [
	'back_none.jpg',
	'p_main',
	'p_barracks',
	'p_stable',
	'p_garage',
	'p_smith',
	'p_place',
	'p_statue',
	'p_market',
	'p_wood',
	'p_stone',
	'p_iron',
	'p_farm',
	'p_storage',
	'p_hide',
	'p_wall',
	'p_snob'
];
var rpls = [
	



'http://rant.se/img/images/31cfe6.jpg',	

'http://home.deds.nl/~fazant/classic/visual/main3.gif',
	

'http://home.deds.nl/~fazant/classic/visual/barracks2.gif',
	

'http://rant.se/img/images/20589.png',
	

'http://home.deds.nl/~fazant/classic/visual/garage2.png',
	

'http://home.deds.nl/~fazant/classic/visual/smith3.gif',
	

'http://home.deds.nl/~fazant/classic/visual/place1.png',
	

'http://home.deds.nl/~fazant/classic/visual/statue1.png',
	

'http://home.deds.nl/~fazant/classic/visual/market3.png',
	

'http://home.deds.nl/~fazant/classic/visual/wood2.png',
	

'http://home.deds.nl/~fazant/classic/visual/stone3.png',
	

'http://home.deds.nl/~fazant/classic/visual/iron1.png',
	

'http://home.deds.nl/~fazant/classic/visual/farm1.png',
	

'http://home.deds.nl/~fazant/classic/visual/storage1.png',
	

'http://home.deds.nl/~fazant/classic/visual/hide1.png',
	

'http://home.deds.nl/~fazant/classic/visual/wall2.png',
	

'http://home.deds.nl/~fazant/classic/visual/snob1.gif'
]

var imgs_obj = document.getElementsByTagName('IMG');
var back_replaced = false;

for(kk=0; kk<imgs_obj.length; kk++){
	var img_obj = imgs_obj[kk];
	var img_class = img_obj.getAttribute("class");
	if(img_class == "") continue;

	if(!back_replaced && img_obj.getAttribute("height") == 418){
		img_obj.src = rpls[0];
		back_replaced = true;
	}

	for(jj=1; jj<imgs.length; jj++){
		if(img_class == imgs[jj]){
			img_obj.src = rpls[jj];
			break;
		}
	}
}

