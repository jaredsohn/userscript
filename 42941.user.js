// --------------------------------------------------------------------

//

// This is a Greasemonkey user script.

//

// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.

//

// To uninstall, go to Tools/Manage User Scripts,

// select "Font Busters", and click Uninstall.

//

// --------------------------------------------------------------------



// --------------------------------------------------------------------

//

//  This script is not throughly tested. Please send feedbacks and suggestions to ravichhabra/AT/GeeeeeeeeMail.com

// 

// --------------------------------------------------------------------



// ==UserScript==

// @name			Font Busters

// @namespace	    http://getthefonts.com

// @description	    Checks for presence of Myanmar Unicode strings and applies appropriate fonts based on patterns.

// @version		0.3.2009-02-25

// @include		http://*

// @include		https://*

// @include		file:///*

// ==/UserScript==



var IS_MYANMAR_RANGE = "[က-အ]+";

var IS_UNICODE_MY = "[ဃငဆဇဈဉညတဋဌဍဎဏဒဓနဘရဝဟဠအ]်|ျ[က-အ]ါ|ျ[ါ-း]|[^\1031]စ် |\u103e|\u103f|\u1031[^\u1000-\u1021\u103b\u1040\u106a\u106b\u107e-\u1084\u108f\u1090]|\u1031$|\u100b\u1039|\u1031[က-အ]\u1032|\u1025\u102f|\u103c\u103d[\u1000-\u1001]";
var IS_UNICODE_MY_2 = "[]";
var IS_UNICODE_OLD_MY = "[]";
var IS_UNICODE_SHA = "[]";
var IS_ZAWGYI = "\u0020[\u103b\u107e-\u1084][က-အ]|\u0020\u1031[က-အ\u1040]|\u1031\u1005\u103A";



var reMyanmar = [new RegExp(IS_MYANMAR_RANGE)];

var reUnicode_my = [new RegExp(IS_UNICODE_MY)];

var reUnicode_old_my = [new RegExp(IS_UNICODE_OLD_MY)];

var reUnicode_sha = [new RegExp(IS_UNICODE_SHA)];
var reZawgyi = [new RegExp(IS_ZAWGYI)];



var fixedObjects = new Array();

var fixedStyles = new Array();
var myanmarFonts = ["Padauk", "Myanmar3", "Parabaik", "MyMyanmar Unicode", "WinUni Innwa", "Win Uni Innwa", "Masterpiece Uni Sans", "Myanmar2", "Zawgyi1", "Zawgyi-One"];
var default_font = " ";

var bToggled = false;



function isMyanmar (obj) {

	for(var i=0; i < reMyanmar.length; i++){

		if(reMyanmar[i].test(obj.innerHTML)) return true	;

	}

	return false;

}



function isUnicode_my(obj) {

	for(var i=0; i<reUnicode_my.length; i++){

		if(reUnicode_my[i].test(obj.innerHTML)) return true;

	}
	return;

}



function isUnicode_old_my() {

	//  TODO;

	return false;

}



function isUnicode_sha() {

	// TODO;

	return false;

}


function isZawgyi(obj){
    for(var i=0; i<reZawgyi.length; i++){
        if(reZawgyi[i].test(obj.innerHTML)) return true;
    }
    return false;
}


function isDeclared(obj){
    declared_fonts = obj.style.fontFamily.split(",");
    for(var i = 0; i < myanmarFonts.length; i++){
        if(declared_fonts[0] == myanmarFonts[i]) return true;
    }
     if(isArial_Zawgyi()) return true;

	return false;
}

function isArial_Zawgyi(){
    //TODO
    return false;
}


function fixFont(obj){

	if(!obj) return;

	if(!isMyanmar(obj)) return;

   	if(isDeclared(obj)) return;

	fixedObjects[fixedObjects.length] = obj;

	fixedStyles[fixedStyles.length] = obj.style.fontFamily;

	obj.style.fontFamily = default_font;

    
    if(!isUnicode_my(obj) || isZawgyi(obj)){
    obj.style.fontFamily = "Zawgyi1, 'Zawgyi-One'";
    }
    

	if(isUnicode_my(obj)){

	obj.style.fontFamily = "  Myanmar3, Parabaik, Padauk, 'WinUni Innwa', 'Win Uni Innwa', 'MyMyanmar Unicode', 'Masterpiece Uni Sans', Myanmar2";

	}



	if(isUnicode_old_my(obj)){

	obj.style.fontFamily = "Myanmar1";

	}



	if(isUnicode_sha(obj)){

	obj.style.fontFamily = "Myanmar3sh";

	}





	var kids = obj.childNodes;

	if(!kids) return;



	for(var i=0; i < kids.length; i++)

	fixFont(kids[i]);

}



function undoFix(){

	if(bToggled) fixFont(document.body);

	else{

		for (var i = 0; i <fixedObjects.length; i++){

			fixedObjects[i].style.fontFamily = fixedStyles[i];

		}

	}

	

	bToggled = !bToggled;



}



function setMenu() {

	if(fixedObjects.length == 0) return;

	if(GM_registerMenuCommand)	GM_registerMenuCommand("Font Busters - Undo", undoFix, "G", "control alt", "f");

}


function fb_preferences(){
    default_font = GM_getValue('default.font');
    if(default_font != 'undefined') return;
    if(default_font == 'undefined') default_font = GM_getValue('font.name.serif.x-unicode');
    else if(default_font == 'undefined') default_font = GM_getValue('font.name.sans-serif.x-unicode');
    else if(default_font == 'undefined') default_font = GM_getValue('font.name.serif.western');
    else if(default_font == 'undefined') default_font = GM_getValue('font.name.sans-serif.western');
    else default_font = "Myanmar3, Padauk, Parabaik, 'MyMyanmar Unicode', Myanmar2";
}


function runScript(){
    if(!GM_getValue('default.font')) GM_setValue('default.font', 'define_me');
    default_font = GM_getValue('default.font');
    fb_preferences();

	obj = document.body;

	if(!isMyanmar(obj)) return;

	fixFont(document.body);

	setMenu();

}



runScript();