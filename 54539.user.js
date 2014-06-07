// ==UserScript==
// @name OGame: Cargos necessary
// @namespace http://userscripts.org/users/36331
// @description OGame: Number of cargos necessary to transport all resources
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=fleet1*
// ==/UserScript==

(function(){

	function addDots(nb) {
		nb = nb + "";
		while (/\d{4}/.test(nb)) {
			nb = nb.replace(/(\d+)(\d{3})/,"$1.$2");
		}
		return nb;
	}

	function hasClass (element, className) {
		return ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
	}

	var language = document.querySelector("meta[name=ogame-language]").getAttribute("content");
	var strSc, strLc, strTitleSc, strTitleLc;
	switch (language) {
		case "fr":
			strSc = "PT";
			strLc = "GT";
			strTitleSc = "Petits transporteurs nécessaires pour vider la colonie";
			strTitleLc = "Grands transporteurs nécessaires pour vider la colonie";
			break;
		default:
			strSc = "SC";
			strLc = "LC";
			strTitleSc = "Small cargos necessary to empty the colony";
			strTitleLc = "Large cargos necessary to empty the colony";
			break;
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

	var max_sc = 0;
	var button202 = document.getElementById("button202");
	if (button202 && hasClass(button202, "on")) {
		max_sc = parseInt(button202.getElementsByClassName("level")[0].innerHTML.replace(/<span[^<]*<\/span>/g,""));
	}

	var max_lc = 0;
	var button203 = document.getElementById("button203");
	if (button203 && hasClass(button203, "on")) {
		max_lc = parseInt(button203.getElementsByClassName("level")[0].innerHTML.replace(/<span[^<]*<\/span>/g,""));
	}

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
	div1.className = "fleft";
//	.fleft {    float:left;}
	div1.style.paddingLeft = "7px";
	div1.innerHTML = 
		"<a class='tooltip js_hideTipOnMobile' " +
		"title='" + strTitleSc + "'" +
		"href='javascript:void(0);'" +
		"onclick='toggleMaxShips(\"#shipsChosen\",202," + (sc>max_sc?max_sc:sc) + "); checkShips(\"shipsChosen\"); return false;'>" +
		addDots(sc) + " " + strSc + "</a>";
	div_parent.appendChild(div1);

	var div2 = document.createElement("div");
	div2.className = "fright";
//	.fright {   float:right;}
	div2.style.paddingRight = "21px";
	div2.innerHTML = 
		"<a class='tooltip js_hideTipOnMobile' " +
		"title='" + strTitleLc + "'" +
		"href='javascript:void(0);'" +
		"onclick='toggleMaxShips(\"#shipsChosen\",203," + (lc>max_lc?max_lc:lc) + "); checkShips(\"shipsChosen\"); return false;'>" +
		addDots(lc) + " " + strLc + "</a>";
	div_parent.appendChild(div2);

	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.text = 
	'$(document).ready(function() {' +
		'$("#planet .slot").unbind("mouseenter mouseleave").hover(function(){$(this).addClass("slot-hover")},function(){$(this).removeClass("slot-hover")});' +
	'});';
	div_parent.appendChild(script);
})();

