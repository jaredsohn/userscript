// ==UserScript==
// @name           My own tribalwars skin 
// @namespace      This script was made using El-Bartos tutorial and source.
// @description    Skin for TribalWars.  
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
	



'http://www4.picturepush.com/photo/a/510627/480/Press-Kit/background.jpg',
	

'http://sketchup.google.com/3dwarehouse/download?mid=d34646a8a86b0303810143628f0f0209&rtyp=lt&ctyp=other&ts=1209697655000',
	

'                Put your URL or URI for the barracks here            ',
	

'                Put your URL or URI for the stable here             ',
	

'                Put your URL or URI for the garage here              ',
	

'                Put your URL or URI for the smith here                ',
	

'                Put your URL or URI for the place here                 ',
	

'                Put your URL or URI for the statue                     ',
	

'                Put your URL or URI for the market here                 ',
	

'                Put your URL or URI for the wood here                  ',
	

'                Put your URL or URI for the stone here                 ',
	

'                Put your URL or URI for the iron here                  ',
	

'                Put your URL or URI for the farm here                   ',
	

'                Put your URL or URI for the storage here                ',
	

'                Put your URL or URI for the hide here                   ',
	

'                Put your URL or URI for the wall here                     ',
	

'                Put your URL or URI for the snob here                     '
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