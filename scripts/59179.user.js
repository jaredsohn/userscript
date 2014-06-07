// ==UserScript==
// @name OGame Redesign : Total Cargos necessary (Greek Edition)
// @namespace http://userscripts.org/users/36331
// @description OGame : Number of cargos necessary to transport all resources at Greek
// @date 2009-09-21
// @First_creator Black Cat - Editor Dahakaa
// @include http://*.ogame.*/game/index.php?page=fleet1*
// @exclude
// ==/UserScript==

(function(){

	// fonction format sur http://www.toutjavascript.com
	function format(valeur,decimal,separateur) {
	// formate un chiffre avec 'decimal' chiffres aprΓ¨s la virgule et un separateur
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	}

	var metal = document.getElementById("resources_metal").innerHTML;
	metal = parseInt(metal.replace(/\D/g, ''));

	var cristal = document.getElementById("resources_crystal").innerHTML;
	cristal = parseInt(cristal.replace(/\D/g, ''));

	var deuterium = document.getElementById("resources_deuterium").innerHTML;
	deuterium = parseInt(deuterium.replace(/\D/g, ''));
	
	var total = metal + cristal + deuterium;

	var sc = Math.ceil(total/5000);
	var lc = Math.ceil(total/25000);

	var childs = document.getElementById("planet").childNodes;
	var nb_divs = 0;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].nodeName.toLowerCase() == "div") nb_divs++;
	}

	var div_parent = document.createElement("div");
	div_parent.className = "slot";
/*	#planet .slot {
		background:url(../img/layout/slots-bg.gif) no-repeat 0px 0px; 
		height:25px;
		font-size:11px;
		line-height:25px;
		text-align:center;
		text-decoration:none;
		overflow:hidden;
		padding:0px;
		position:absolute;
		width:231px;
		z-index:10;
	}*/
	div_parent.style.right = "3px";
	div_parent.style.bottom = (9 + 27*nb_divs) + "px";
	document.getElementById("planet").appendChild(div_parent);

	var div1 = document.createElement("div");
	div1.className = "fleft tips";
//	.fleft {    float:left;}
	div1.style.paddingLeft = "7px";
	div1.title = "|Μικρά Μεταγωγικά που χρειάζονται για να αδειάσουν τον πλανήτη";
	div1.innerHTML = format(sc, 0, '.') + " Μικρά";// + " Μικρά Μεταγωγικά" + (sc>1?"s":"");
	div_parent.appendChild(div1);

	var div2 = document.createElement("div");
	div2.className = "fright tips";
//	.fright {   float:right;}
	div2.style.paddingRight = "21px";
	div2.title = "|Μεγάλλο Μεταγωγικό που χρειάζονται για να αδειάσουν τον πλανήτη";
	div2.innerHTML = format(lc, 0, '.') + " Μεγάλλα";// + " Μεγάλλα Μεταγωγικά" + (lc>1?"s":"");
	div_parent.appendChild(div2);

	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = "$('#planet .slot .tips').cluetip({splitTitle:'|',showTitle:false,width:150,positionBy:'auto',leftOffset:20,topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:250,timeout:400}});";
	div_parent.appendChild(script);
})();
