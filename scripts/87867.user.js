// ==UserScript==
// @name           OGame Redesign : Cargos necessary2;
// @description	   OGame Redesign : Cargos necessary2
// @include	   http://*ogame*
// ==/UserScript==

if (document.location.href.indexOf('fleet1')!= -1)
{ 	function format(valeur,decimal,separateur) {
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;	}

	var metal = document.getElementById("resources_metal").innerHTML;
	metal = parseInt(metal.replace(/\D/g, ''));
	var cristal = document.getElementById("resources_crystal").innerHTML;
	cristal = parseInt(cristal.replace(/\D/g, ''));
	var deuterium = document.getElementById("resources_deuterium").innerHTML;
	deuterium = parseInt(deuterium.replace(/\D/g, ''));
	var total = metal + cristal;
	var totalmetal = Math.ceil(metal/25000);
	var totalcristal = Math.ceil(cristal/25000);
	var totaldeuterio = Math.ceil(deuterium/25000);
	var totalmc = Math.ceil(total/25000);
	var sc = Math.ceil(total/5000);
	var lc = Math.ceil(total/25000);
	var todo=totaldeuterio+totalmc;	

	var max_sc = 0;
	var button202 = document.getElementById("button202");
	if (button202 && button202.className == "on") {
		max_sc = button202.innerHTML.replace(/\n/g,"").replace(/^.*am202.value=(\d*).*$/,"$1");	}

	var max_lc = 0;
	var button203 = document.getElementById("button203");
	if (button203 && button203.className == "on") {
		max_lc = button203.innerHTML.replace(/\n/g,"").replace(/^.*am203.value=(\d*).*$/,"$1");	}

	var childs = document.getElementById("planet").childNodes;
	var nb_divs = 0;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].nodeName.toLowerCase() == "div") nb_divs++;	}

	var div_parent = document.createElement("div");
	div_parent.className = "slot";
	div_parent.style.right = "1px";
	div_parent.style.bottom = (9 + 27*nb_divs) + "px";
	document.getElementById("planet").appendChild(div_parent);

	var div1 = document.createElement("div");
	div1.className = "fleft tips";
	div1.style.paddingLeft = "1px";
	div1.title = "|Naves TransPortar Metal";
	div1.innerHTML = format(totalmetal, 0, '.') + "M || ";// + " small cargo" + (totalmetal>1?"s":"");
	div1.setAttribute("onClick","document.shipsChosen.am203.value=" + totalmetal + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); document.getElementById('continue').onclick(); return false;");
	div_parent.appendChild(div1);

	var div2 = document.createElement("div");
	div2.className = "fleft tips";
	div2.style.paddingcenter = "1px";
	div2.title = "|Naves TransPortar Cristal";
	div2.innerHTML = format(totalcristal, 0, '.') + "C || ";// + " large cargo" + (totalcristal>1?"s":"");
	div2.setAttribute("onClick","document.shipsChosen.am203.value=" + totalcristal + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); document.getElementById('continue').onclick(); return false;");
	div_parent.appendChild(div2);
	
	var div3 = document.createElement("div");
	div3.className = "fleft tips";
	div3.style.paddingRight = "1px";
	div3.title = "|Naves TransPortar Deuterio";
	div3.innerHTML = format(totaldeuterio, 0, '.') + "D || ";// + " large cargo" + (totaldeuterio>1?"s":"");
	div3.setAttribute("onClick","document.shipsChosen.am203.value=" + totaldeuterio + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); document.getElementById('continue').onclick(); return false;");
	div_parent.appendChild(div3);

	var div4 = document.createElement("div");
	div4.className = "fleft tips";
	div4.style.paddingRight = "1px";
	div4.title = "|Naves TransPortar Metal+Cristal";
	div4.innerHTML = format(totalmc, 0, '.') + "MC || ";// + " large cargo" + (totalmc>1?"s":"");
	div4.setAttribute("onClick","document.shipsChosen.am203.value=" + totalmc + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); document.getElementById('continue').onclick(); return false;");
	div_parent.appendChild(div4);

	var div5 = document.createElement("div");
	div5.className = "fleft tips";
	div5.style.paddingRight = "6px";
	div5.title = "|Naves TransPortar Todo";
	div5.innerHTML = format(todo, 0, '.') + "T ";// + " large cargo" + (totalmc>1?"s":"");
	div5.setAttribute("onClick","document.shipsChosen.am203.value=" + todo + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); document.getElementById('continue').onclick(); return false;");
	div_parent.appendChild(div5);
	
	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = "$('#planet .slot .tips').cluetip({splitTitle:'|',showTitle:false,width:150,positionBy:'auto',leftOffset:20,topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:250,timeout:400}});";
	div_parent.appendChild(script);}
