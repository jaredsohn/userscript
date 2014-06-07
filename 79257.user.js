// ==UserScript==
// @name           Ogame - 1.x - Fleet
// @author         Sherbrow
// @namespace      Ogame
// @include        http://*.ogame.*/game/index.php?page=fleet*
//
// @version        v0.3.2b
// ==/UserScript==

var DEBUG = false; // set to true if you want to see the errors (alert nagging) --> will be handled by the Config Panel when implemented
var OFH = new Object(); // global object (window.OFH)
	OFH.errors = new Array(); // errors are stored there if you want to see / report

try { // Global exception handler, because we never know =)

var universe,lang,sublang,fleetLocation,fleetLocationActual;

var t_array = /http:\/\/uni([0-9]+)\.(?:([a-z]+)\.)?ogame\.([a-z]+)\/game\/index\.php\?page=fleet([0-9]+)/.exec(document.location.href);

universe = t_array[1];
sublang = t_array[2];
lang = t_array[3];
fleetLocation = t_array[4];
fleetLocationActual = /fleet([0-9])/.exec(document.getElementsByTagName("body")[0].getAttribute("id"))[1];

if(!fleetLocationActual) { // who kows ... may be deleted in a future version
	if(fleetLocation=="2" && document.getElementById("allornone")) // Cuz' when you switch from fleet2 to another planet, you don't automatically return to fleet 1 ><
		fleetLocation = "1";
	fleetLocationActual = fleetLocation;
}

if(fleetLocationActual == "1") {

try { // SC/LC buttons
	var fleetIsAvailable = true;
	var AoN; // All or none buttons container (original)
	try {
		AoN = document.getElementById("allornone").firstElementChild.firstElementChild;
	} catch (e) {
		fleetIsAvailable = false;
	}
	if(fleetIsAvailable) {
		var RSB; // Ressources shrorcut buttons
			var LC_available,SC_available,LC_required,SC_required;
		var a,img,div,span,span2,span3,t_class;

		//-- Compute cargos for ressources (not dynamic)
		LC_required = Math.ceil((unsafeWindow.resourceTickerMetal.available+unsafeWindow.resourceTickerCrystal.available+unsafeWindow.resourceTickerDeuterium.available)/25000);
		LC_available = parseInt(document.getElementById("button203").firstElementChild.firstElementChild.firstElementChild.firstElementChild.childNodes[1].nodeValue.replace(/[.,]/,""));
		SC_required = Math.ceil((unsafeWindow.resourceTickerMetal.available+unsafeWindow.resourceTickerCrystal.available+unsafeWindow.resourceTickerDeuterium.available)/5000);
		SC_available = parseInt(document.getElementById("button202").firstElementChild.firstElementChild.firstElementChild.firstElementChild.childNodes[1].nodeValue.replace(/[.,]/,""));

		RSB = document.createElement("DIV");
			RSB.setAttribute("class",AoN.getAttribute("class")+" OFH");
			
			a = document.createElement("A"); // Small Cargos
				a.setAttribute("title","|"+addDotsToInt(SC_required));
				a.setAttribute("href","#SC_ressources");
				t_class = (SC_available>0)?"on":"off";
				(SC_required>SC_available)?a.setAttribute("class","tipsStandard RSB SC less "+t_class):a.setAttribute("class","tipsStandard RSB SC enough "+t_class);
				a.setAttribute("onclick",'shipsChosen.am202.value='+SC_required+'; checkIntInput("ship_202", 0, '+SC_required+'); checkShips("shipsChosen");event.preventDefault();');
				
				span = document.createElement("span");
					span.setAttribute("class","ecke");
				a.appendChild(span);
				
				span = document.createElement("span");
					span.setAttribute("class","number");
					span.appendChild(document.createTextNode(addDotsToInt(SC_required)));
				a.appendChild(span);
			RSB.appendChild(a);
			
			a = document.createElement("A"); // Large Cargos
				a.setAttribute("title","|"+addDotsToInt(LC_required));
				a.setAttribute("href","#LC_ressources");
				t_class = (LC_available>0)?"on":"off";
				(LC_required>LC_available)?a.setAttribute("class","tipsStandard RSB LC less "+t_class):a.setAttribute("class","tipsStandard RSB LC enough "+t_class);
				a.setAttribute("onclick",'shipsChosen.am203.value='+LC_required+'; checkIntInput("ship_203", 0, '+LC_required+'); checkShips("shipsChosen");event.preventDefault();');
				
				span1 = document.createElement("span");
					span1.setAttribute("class","ecke");
				a.appendChild(span1);
				
				span2 = document.createElement("span");
					span2.setAttribute("class","number");
					span2.appendChild(document.createTextNode(addDotsToInt(LC_required)));
				a.appendChild(span2);
			RSB.appendChild(a);

			div = document.createElement("DIV"); // Clear
				div.setAttribute("class","clearfloat");
			RSB.appendChild(div);
			
		AoN.parentNode.insertBefore(RSB,AoN.nextElementSibling);
		
		GM_addStyle(".OFH a.RSB {display:block;position:relative;width:76px;height:32px;cursor:pointer;float:left;margin:0px 1px;}");
			GM_addStyle(".OFH a.RSB.SC.on {background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/navigation/ships-on.png\") no-repeat scroll -2px -36px transparent;}");
			GM_addStyle(".OFH a.RSB.SC.off {background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/navigation/ships-off.png\") no-repeat scroll -2px -36px transparent;}");
			GM_addStyle(".OFH a.RSB.LC.on {background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/navigation/ships-on.png\") no-repeat scroll -82px -17px transparent;}");
			GM_addStyle(".OFH a.RSB.LC.off {background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/navigation/ships-off.png\") no-repeat scroll -82px -17px transparent;}");
			
			GM_addStyle(".OFH a.RSB .ecke {display:block;opacity:0.8;width:100%;height:100%;background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/navigation/ecke_neu_80.gif\") no-repeat scroll left bottom transparent;}");
			GM_addStyle(".OFH a.RSB .number {position:absolute;bottom:0px;right:0px;margin-right:2px;}");
				GM_addStyle(".OFH a.RSB.enough .number {color:#FF9600}");
				GM_addStyle(".OFH a.RSB.less .number {color:#FF0000}");
	} // If fleet is available

	
} catch(e){if(DEBUG) alert("OFH Error(LC/SC)\n"+e.toString());OFH.errors.push("OFH Error(LC/SC)\n"+e.toString());}
	
} // fleet 1
else if(fleetLocationActual == "2") {

try{ // First of all, transform the planet on the right

	var planets = document.getElementById("myPlanets").getElementsByClassName("smallplanet");
	var i,target,planet,moon,koord,name;
	for(i=0;i<planets.length;++i) {
		planet = planets[i].firstElementChild;
			koord = planet.children[2].firstChild.nodeValue;
			koord=/\[([0-9]+):([0-9]+):([0-9]+)\]/.exec(koord); // Switch [x:xxx:xx] to array
		target=koord[1]+"#"+koord[2]+"#"+koord[3]+"#1#"; //the 1 is for planet
		name = planet.children[1].firstChild.nodeValue;
		target+=name;
		
		planet.setAttribute("onclick","document.getElementById(\"slbox\").value = \""+target+"\";shortLinkChange();updateVariables();event.preventDefault();");
		planet.setAttribute("ondblclick","document.location.href=this.href;"); // A lil' bit ugly, but it works ^-^
		planet.setAttribute("title","|Change destination to:<BR /><B>"+name+" "+koord[0]+"</B>");
		planet.setAttribute("onmouseover","this.firstElementChild._src=this.firstElementChild.src;this.firstElementChild.src=\"img/navigation/icon-fleet-movement.gif\";this.firstElementChild.style.width='16px';this.firstElementChild.style.padding='7px';");
		planet.setAttribute("onmouseout","this.firstElementChild.src=this.firstElementChild._src;this.firstElementChild.style.width='30px';this.firstElementChild.style.padding='0px';");
		
		moon = planet.nextElementSibling;
		if(moon) { // If there is a sibling (moon or construction)
			if(/moonlink/.test(moon.getAttribute("class"))) {
				target=koord[1]+"#"+koord[2]+"#"+koord[3]+"#3#"; //the 3 is for moon
				try { // Some traduction may have problems, in case, let's just forget the moon =S
					name = /\|<B>[^\ ]+ [^\ ]+ ([^<]+)<\/B>/.exec(moon.getAttribute("title"))[1]; // Because "<" are forbidden in planet/moon 's name
				} catch (e) {
					name = "Shortcut does not work";
				}
				target+=name;
				
				moon.setAttribute("onclick","document.getElementById(\"slbox\").value = \""+target+"\";shortLinkChange();updateVariables();event.preventDefault();");
				moon.setAttribute("ondblclick","document.location.href=this.href;"); // A lil' bit ugly, but it works ^-^
				moon.setAttribute("title","|Change destination to:<BR /><B>"+name+" "+koord[0]+" (moon)</B>");
				moon.setAttribute("onmouseover","this.firstElementChild._src=this.firstElementChild.src;this.firstElementChild.src=\"img/navigation/icon-fleet-movement.gif\"");
				moon.setAttribute("onmouseout","this.firstElementChild.src=this.firstElementChild._src");
			}
		}
	}
	
	GM_addStyle("#myPlanets .planetPic {width:30px;}");
	
} catch(e) {if(DEBUG) alert("OFH Error(planet shortcuts)\n"+e.toString());OFH.errors.push("OFH Error(planet shortcuts)\n"+e.toString());}

try{ // Then speed slider (that sounds awesome !)

	OFH.slider = new Object();
	var speedSelect = document.getElementById("speed");
	
	OFH.slider.updatePosition = function() {
		var speed = speedSelect.value;
		document.getElementById("OFH_speedSlider").style.left = (2+(16*(speed-1)))+"px";
	}
	OFH.slider.updateSpeed = function(e) {
		speedSelect.value = Math.round(((parseInt(document.getElementById("OFH_speedSlider").style.left)-2)/16))+1; // I know, I know ...
		unsafeWindow.updateVariables();
		if(e)
			e.stopPropagation();
	}
	OFH.slider.moveCursor = function(e) {
		var t_object=slider,positionSlider = 0;
		var positionCursor = e.clientX;
		while(t_object.offsetParent) {
			positionSlider += t_object.offsetLeft;
			t_object = t_object.offsetParent;
		}
		
		speedSelect.value=Math.floor(parseInt((positionCursor-positionSlider)/16))+1;
		OFH.slider.updatePosition();
		unsafeWindow.updateVariables();
		e.preventDefault();
	}
	OFH.slider.startSliding = function(e) {
		document.getElementsByTagName("body")[0].addEventListener("mousemove",OFH.slider.moveCursor,false);
		document.getElementsByTagName("body")[0].addEventListener("mouseup",OFH.slider.stopSliding,false);
		e.preventDefault();
	}
	OFH.slider.stopSliding = function(e) {
		document.getElementsByTagName("body")[0].removeEventListener("mousemove",OFH.slider.moveCursor,false);
		document.getElementsByTagName("body")[0].removeEventListener("mouseup",OFH.slider.stopSliding,false);
		e.preventDefault();
	}
	
	var speedLine = document.getElementById("fleetBriefingPart1").children[0];
	var i,slider,pointer;
	
	speedLine.parentNode.parentNode.removeChild(speedLine.parentNode.nextElementSibling.nextElementSibling); // remove the BE clearfloat which mess the view
	
	speedLine.appendChild(document.createElement("br"));
	slider = document.createElement("span");
		slider.setAttribute("class","OFH slider");
		slider.addEventListener("click",OFH.slider.moveCursor,false);
		slider.addEventListener("mousedown",OFH.slider.startSliding,false)
		
		pointer = document.createElement("img");
			pointer.setAttribute("class","sliderPointer");
			pointer.setAttribute("id","OFH_speedSlider");
			pointer.setAttribute("alt","|");
			pointer.setAttribute("src","http://uni"+universe+".ogame."+lang+"/game/img/navigation/icon-fleet-movement.gif");
			pointer.addEventListener("click",OFH.slider.updateSpeed,false);
		slider.appendChild(pointer);
	speedLine.appendChild(slider);
	
	speedSelect.addEventListener("change",OFH.slider.updatePosition,false);
	speedSelect.addEventListener("keyup",OFH.slider.updatePosition,false);
	
	GM_addStyle(".OFH.slider {display:block;margin-top:1px;height:20px;width:160px;position:relative;border:1px solid #DDD;-moz-border-radius:5px;-khtml-border-radius:5px;background:url(\"http://uni"+universe+".ogame."+lang+"/game/img/layout/starstreak410.gif\") no-repeat scroll -108px -11px transparent;}");
	GM_addStyle(".OFH.slider .sliderPointer {position:absolute;top:2px;left:146px;width:11px;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);}"); // -webkit & -moz for compatibility FF,Chrome,Safari,Opera (I think)
	
	try { // In case of a "back" action, we should update at the current speed
		OFH.slider.updatePosition();
		document.getElementsByTagName("body")[0].addEventListener("load",function(e){alert('load');OFH.slider.updatePosition();},false);
	} catch(e) {}
	
} catch(e) {if(DEBUG) alert("OFH Error(speed slider)\n"+e.toString());OFH.errors.push("OFH Error(speed slider)\n"+e.toString());}

try{ // Then Last target shortcut

	var lastTarCode = GM_getValue("OFH_"+universe+"."+lang+"_lastDestination");
	
	if(lastTarCode) {
		var select = document.getElementById("slbox"), lastTar,tarButtonText,option;
		var lastTarValues = /([^#]+)#([^#]+)#([^#]+)#([^#]+)#([^#]+)/.exec(lastTarCode);
		var fullName = lastTarValues[5]+" ["+lastTarValues[1]+":"+lastTarValues[2]+":"+lastTarValues[3]+"]"+((lastTarValues[4]=="3")?" (moon)":"");
		
		option = document.createElement("option");
			option.setAttribute("value",lastTarCode);
			
			option.appendChild(document.createTextNode(fullName));
		select.appendChild(option);
		
		lastTar = document.createElement("button");
			lastTar.setAttribute("type","button");
			lastTar.setAttribute("class","lastTar OFH tipsStandard");
			lastTar.setAttribute("onclick","document.getElementById(\"slbox\").value = \""+lastTarCode+"\";shortLinkChange();updateVariables();event.preventDefault();");
			lastTar.setAttribute("title","|Change destination to:<BR /><B>"+fullName+"</B>");
			
			tarButtonText = document.createElement("marquee");
				tarButtonText.setAttribute("behavior","alternate");
				tarButtonText.setAttribute("scrolldelay","150");
				tarButtonText.setAttribute("scrollamount","1");
				tarButtonText.setAttribute("style","width:100%;display:block;overflow:hidden;");
				
				tarButtonText.appendChild(document.createTextNode(fullName));
			lastTar.appendChild(tarButtonText);
		select.parentNode.appendChild(lastTar);
		
		GM_addStyle(".OFH.lastTar {position:relative;padding: 0 0 2px;font-size:1em;overflow:hidden;margin:17px 0 0;height:17px;border:1px solid #191E23;width:144px;background:black;color:white;cursor:pointer;}");
		GM_addStyle(".OFH.lastTar:hover {background:#000011;color:white;}");
		GM_addStyle(".OFH.lastTar:active {background:#848484;color:white;}");
		
		select.style.display = "none";
	}
	
} catch(e) {if(DEBUG) alert("OFH Error(Last target shortcut)\n"+e.toString());OFH.errors.push("OFH Error(Last target shortcut)\n"+e.toString());}
	
} // fleet 2

else if(fleetLocationActual == "3") {

try { // Last Target Save

	var save,t_res;
	t_res = /\[([0-9]+):([0-9]+):([0-9]+)\] (.*)/.exec(document.getElementById("roundup").children[1].firstElementChild.firstElementChild.firstChild.nodeValue);
	save=t_res[1]+"#"; // Galaxy
	save+=t_res[2]+"#"; // System
	save+=t_res[3]+"#"; // Position
	save+=document.getElementsByName("type")[0].value+"#"; // Type
	save+=t_res[4]; // Name
	GM_setValue("OFH_"+universe+"."+lang+"_lastDestination",save);
	
} catch(e) {if(DEBUG) alert("OFH Error(Last target save)\n"+e.toString());OFH.errors.push("OFH Error(Last target save)\n"+e.toString());}

} // fleet 3


} catch(e) { // Global exception handler
	if(DEBUG)
		alert("OFH Error\n"+e.toString());
	OFH.errors.push("OFH Error\n"+e.toString());
}

unsafeWindow.OFH = OFH;

//-- Utils (if anyone want to use this part for a "utils" script, feel free to do so)--//

function addDotsToInt(num) {
	var str = new String(num);
	var res = new String;
	var count = 0;
	for(i=str.length-1;i>=0;--i && ++count) {
		res = str[i].concat(res);
		if(count==2) { count=0;res = String(".").concat(res);}
	}
	return res;
}