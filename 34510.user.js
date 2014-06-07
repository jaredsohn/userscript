// ==UserScript==
// @name           FreeRice Hacked: ajax++
// @namespace      #aVg
// @include        http://*freerice.com/*
// @description    Makes playing FreeRice a breeze. Solves almost every game mode now. Future support for other modes coming soon.
// @version        0.1.2
// ==/UserScript==
(function() {
try{
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function $(A) {return document.getElementById(A);}

var info=single("//input[@name='INFO3']");
if(!info) return;
info = info.value.split("|");

document.addEventListener("keydown", function(E) {
	switch(E.keyCode) {
		case 49:
		case 50:
		case 51:
		case 52:
			unsafeWindow.submitForm(E.keyCode - 48);
			return;
		case 97:
		case 98:
		case 99:
		case 100:
			unsafeWindow.submitForm(E.keyCode - 96);
	}
}, false);

var choices = single(".//ol", $("questionDisplay")), choice;
if(choices)
for(var i = 4; i > 0 ; --i) {
	choice = choices.children[i].children[1];
	choice.textContent = "(" +i+ ") " + choice.textContent;
}

var staticData = {};

const countries =["Belgium","Brazil","Canada","China","France","Germany","Greece","Guatemala","India","Italy","Japan","Kuwait","Mexico","Netherlands","Panama","Russia","United Kingdom","United States","Andorra","Australia","Austria","Czech Republic","Finland","Guinea-Bissau","Iraq","Ireland","Israel","Norway","Poland","Portugal","Spain","Sweden","Switzerland","Afghanistan","Algeria","Argentina","Bosnia and Herzegovina","Bulgaria","Cambodia","Chile","Cuba","Denmark","Georgia","Hungary","Iceland","Iran","Jamaica","Lebanon","Libya","Malaysia","New Zealand","North Korea","Philippines","South Korea","Vietnam","Albania","","Belarus","Colombia","Croatia","Cyprus","Ecuador","Egypt","El Salvador","Haiti","Indonesia","Jordan","Kenya","Latvia","Liberia","Liechtenstein","Mongolia","Myanmar (Burma)","Nepal","Pakistan","Papua New Guinea","Paraguay","Peru","Qatar","Romania","Saudi Arabia","Senegal","Serbia","Seychelles","Slovakia","Somalia","South Africa","Syria","Thailand","The Bahamas","Trinidad and Tobago","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","Uruguay","Venezuela","Angola","Armenia","Azerbaijan","Bahrain","Bangladesh","","Belize","Benin","Bhutan","Bolivia","Botswana","Brunei","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Republic","Chad","","Congo-Democratic Republic","Congo-Republic","Costa Rica","Cote d'Ivoire","","Dominican Republic","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Gabon","Ghana","","Guinea","Guyana","Honduras","Kazakhstan","","Kyrgyzstan","Laos","Lesotho","Lithuania","Macedonia","Madagascar","Malawi","","Mali","Malta","","Mauritania","Mauritius","","Moldova","Montenegro","Morocco","Mozambique","Namibia","Nicaragua","Niger","Nigeria","Oman","","Rwanda","","","","","Sierra Leone","Slovenia","Solomon Islands","Sri Lanka","Sudan","Suriname","Swaziland","Tajikistan","Tanzania","The Gambia","Timor-Leste","Togo","","Turkmenistan","","Uzbekistan","","Yemen","Zambia","Zimbabwe","Dijbouti","Luxembourg","Monaco","","","Singapore"];
const which = ["PAST", "INFO", "INFO3", "SUBJECT"];
const elements = {
	Actinium : "Ac",
	Aluminum : "Al",
	Americium : "Am",
	Antimony : "Sb",
	Argon : "Ar",
	Arsenic : "As",
	Astatine : "At",
	Barium : "Ba",
	Berkelium : "Bk",
	Beryllium : "Be",
	Bismuth : "Bi",
	Bohrium : "Bh",
	Boron : "B",
	Bromine : "Br",
	Cadmium : "Cd",
	Calcium : "Ca",
	Californium : "Cf",
	Carbon : "C",
	Cerium : "Ce",
	Cesium : "Cs",
	Chlorine : "Cl",
	Chromium : "Cr",
	Cobalt : "Co",
	Copper : "Cu",
	Curium : "Cm",
	Darmstadtium : "Ds",
	Dubnium : "Db",
	Dysprosium : "Dy",
	Einsteinium : "Es",
	Erbium : "Er",
	Europium : "Eu",
	Fermium : "Fm",
	Fluorine : "F",
	Francium : "Fr",
	Gadolinium : "Gd",
	Gallium : "Ga",
	Germanium : "Ge",
	Gold : "Au",
	Hafnium : "Hf",
	Hassium : "Hs",
	Helium : "He",
	Holmium : "Ho",
	Hydrogen : "H",
	Indium : "In",
	Iodine : "I",
	Iridium : "Ir",
	Iron : "Fe",
	Krypton : "Kr",
	Lanthanum : "La",
	Lawrencium : "Lr",
	Lead : "Pb",
	Lithium : "Li",
	Lutetium : "Lu",
	Magnesium : "Mg",
	Manganese : "Mn",
	Meitnerium : "Mt",
	Mendelevium : "Md",
	Mercury : "Hg",
	Molybdenum : "Mo",
	Neodymium : "Nd",
	Neon : "Ne",
	Neptunium : "Np",
	Nickel : "Ni",
	Niobium : "Nb",
	Nitrogen : "N",
	Nobelium : "No",
	Osmium : "Os",
	Oxygen : "O",
	Palladium : "Pd",
	Phosphorus : "P",
	Platinum : "Pt",
	Plutonium : "Pu",
	Polonium : "Po",
	Potassium : "K",
	Praseodymium : "Pr",
	Promethium : "Pm",
	Protactinium : "Pa",
	Radium : "Ra",
	Radon : "Rn",
	Rhenium : "Re",
	Rhodium : "Rh",
	Roentgenium : "Rg",
	Rubidium : "Rb",
	Ruthenium : "Ru",
	Rutherfordium : "Rf",
	Samarium : "Sm",
	Scandium : "Sc",
	Seaborgium : "Sg",
	Selenium : "Se",
	Silicon : "Si",
	Silver : "Ag",
	Sodium : "Na",
	Strontium : "Sr",
	Sulfur : "S",
	Tantalum : "Ta",
	Technetium : "Tc",
	Tellurium : "Te",
	Terbium : "Tb",
	Thallium : "Tl",
	Thorium : "Th",
	Thulium : "Tm",
	Tin : "Sn",
	Titanium : "Ti",
	Tungsten : "W",
	Uranium : "U",
	Ununbium : "Uub",
	Ununtrium : "Uut",
	Ununquadium : "Uuq",
	Ununpentium : "Uup",
	Ununhexium : "Uuh",
	Ununseptium : "Uus",
	Ununoctium : "Uuo",
	Ununennium : "Uue",
	Unbinilium : "Ubn",
	Unbiunium :"Ubu",
	Unbibium : "Ubb",
	Unbitrium : "Ubt",
	Unbiquadium : "Ubq",
	Unbipentium : "Ubp",
	Vanadium : "V",
	Xenon : "Xe",
	Ytterbium : "Yb",
	Yttrium : "Y",
	Zinc : "Zn",
	Zirconium : "Zr"
};
function solveAgain(data) {
	data = data.replace(/%20| /g, "+");
	GM_xmlhttpRequest({
		url : "http://freerice.com/index.php",
		method : "POST",
		data : data,
		onload : function(A) {
			var d = $("contentSecRight") || $("yesterdayDonated");
			d.innerHTML = A.responseText.match(/contentSecRight">([\s\S]+)<\/div> <!-- end contentSecRight/)[1];
			data = "";
			function getParam(o) {return A.responseText.match(new RegExp(o+"\" value=\"?([^\"/]+)")) ? RegExp.$1.replace(/^\s+|\s+$/g,"") : "";}
			info = getParam("INFO3").split("|");
			var ans;
			if(staticData.SUBJECT.value.indexOf("Countr")!=-1)
				ans = solveCount(Number(A.responseText.match(/x_(\d+)/)[1]));
			else
				ans = staticData.SUBJECT.value.indexOf("Chemical")==0 ? solveChem() : solveMath();
			if(ans == null) return;
			for(var i = which.length - 1; i>=0; --i)
				data += which[i] + "=" +(staticData[which[i]].value=getParam(which[i])) + "&";
			solveAgain(data + "SELECTED=" +ans);
		},
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded",
			Referer : "http://freerice.com/index.php"
		}
	});
}

function solveChem() {
	var an=elements[info[0]];
	for(var i = info.length - 1; i > 0; --i)
		if(an==info[i])
			return i;
	return null;
}

function solveCount(which) {
	var an=countries[which-101];
	for(var i = info.length - 1; i > 0; --i)
		if(an==info[i])
			return i;
	return null;
}

function solveMath() {
	if(info[0].indexOf("sup") != -1)
	{
		info[0] = info[0].replace(/A|<\/?sup>/g, "").replace(/&#247;|÷/g,"-").replace(/&#120;|x/g,"+");
		for(var i = info.length - 1; i > 0; --i)
			info[i] = info[i].replace(/A|<\/?sup>/g, "");
	}
	try{
	var ans = eval(info[0].replace(/&#120;|x/g,"*").replace(/&#247;|÷/g,"/"));
	}catch(e){return null;}
	for(var i = info.length - 1; i > 0; --i) {
		if(info[i].indexOf("/") != -1)
			info[i]=eval(info[i]);
		if(info[i]==ans)
			return i;
			//unsafeWindow.submitForm(i);
	}
	return null;
}

GM_addStyle("#sponsorList, #homeWhiteSpace{padding: 22px!important}");
var type = single("//input[@name='SUBJECT']");
switch(type.value) {
	case "English Vocabulary" :
	GM_xmlhttpRequest({
		url : "http://ninjawords.com/definitions/getdef/"+info[0]+"/",
		method : "POST",
		data :"?123=",
		onload : function(A) {
		try{
			($("homeWhiteSpace") || $("sponsorList")).innerHTML=A.responseText.match(/"(.+)", query/)[1].replace(/\\"/g,"\"").replace(/\\n/g,"\n").replace(/\\t/g,"\t").replace(/\\074/g,"<").replace(/\\076/g,">");
			}catch(e){alert(e)}
		},
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		}
	});
	return;
	case "Basic Math" :
	case "Multiplication Table" :
		var ans=solveMath();
		if(ans != null) {
			var w = "";
			for(var i = which.length - 1; i>=0; --i)
				w += which[i] + "=" + encodeURI( (staticData[which[i]]=single("//input[@name='" + which[i] + "']")).value ) + "&";
			solveAgain(w + "SELECTED=" +ans);
		}
	return;
	case "Chemical Symbols" :
	case "Chemical Symbols (Basic)" :
		var ans = solveChem();
		if (ans != null) {
			var w = "";
			for(var i = which.length - 1; i>=0; --i)
				w += which[i] + "=" + encodeURI( (staticData[which[i]]=single("//input[@name='" + which[i] + "']")).value ) + "&";
			solveAgain(w + "SELECTED=" +ans);
		}
	return;
	case "Identify Countries on the Map" :
		if($("pictureImg").src.match(/x_(\d+)/))
		{
			var ans = solveCount(Number(RegExp.$1));
			var w = "";
			for(var i = which.length - 1; i>=0; --i)
				w += which[i] + "=" + encodeURI( (staticData[which[i]]=single("//input[@name='" + which[i] + "']")).value ) + "&";
			solveAgain(w + "SELECTED=" +ans);
		};
}
}catch(e){alert(e)}
})();