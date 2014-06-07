// ==UserScript==
// @name           Die Staemme Berater
// @namespace      http://userscripts.org/scripts/show/86517
// @date           09.10.2010
// @include        http://*die-staemme.de/*
// ==/UserScript==

window.addEventListener("load",function(){
const scriptUrl = "http://userscripts.org/scripts/show/86517";
const lng = "de";

// Umlaute
const ae = "\u00E4";	const oe = "\u00F6";	const ue = "\u00FC";
const Ae = "\u00C4";	const Oe = "\u00D6";	const Ue = "\u00DC";
const sz = "\u00DF";

const delimThou = ".";
const delimDeci = ",";
	
var texte = new Object();
texte["berater"] = "Berater";
texte["autoLogin"] = "Automatischer Login";
texte["autologin1"] = "Ermittle aktive Sessions.<br>Bitte %1% Sekunden warten<br>...";
texte["autologin2"] = "Alle Accounts eingeloggt.";
texte["accountAktiv"] = "Account aktiv";
texte["server"] = "Server";
texte["ungueltigerServer"] = "Ungueltiger Server";
texte["name"] = "Name";
texte["passwort"] = "Passwort";
texte["speichern"] = "speichern";
texte["loeschen"] = "l"+oe+"schen";
texte["msgUpdate"] = "Es liegt eine neue Script-Version vor. Diese installieren?";
texte["zeigePasswoerter"] = "zeige Passw"+oe+"rter";
texte["valAutoLogin"] = "Automatisch einloggen";
texte["scriptHomepage"] = "Scripthomepage";
texte["startPage"] = "Startseite";
texte["diese"] = "diese";

// **************************************************************************

function $(ID) {return document.getElementById(ID)}
function $top(ID) {return top.document.getElementById(ID)}
function removeElement(node){node.parentNode.removeChild(node)}
function createElement(type, attributes, append, inner){
	var node = document.createElement(type);
	for (var attr in attributes) {
		if (attr=="checked") node.checked=attributes[attr];
		else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
	}
	if (append) append.appendChild(node);
	if (inner) node.innerHTML = inner;
	return node;
}
function getChildElementById(parent,tag,value){
	var result=null;
	var cand = parent.getElementsByTagName(tag);
	for(var v=0;v<cand.length;v++){
		if(cand[v].id==value){
			result=cand[v];
			break;
		}
	}
	cand=null;
	return result;
}
function click(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("click", true, true);
	A.dispatchEvent(B);
	if (A.href){ document.location.href = A.href; }
}
function change(A) {
	var B = document.createEvent("MouseEvents");
	B.initEvent("change", true, true);
	A.dispatchEvent(B);
	if (A.href){ document.location.href = A.href; }
}

function explode(str){
//GM_log("Begin explode "+ str);
if (str == "") throw("Explode error Argument empty");
if (str=="undefined") throw ("Explode error Argument is undefined");
if (typeof str != "string") throw ("Explode error Argument not a String");

try{
	return eval('(' + str + ')');
} catch(err){
	GM_log("Explode error : " + err);
	throw ("Explode error : " + err);
}
}

function implode(arr){//--- function written by Jan-Hans
	try{
		var line = new String();
		var InternalCounter = -1;
		var NoKey = new Boolean(false);
		if (typeof arr != "object") throw("Argument not a Object or Array" + typeof arr +"<br>");
		var type = (arr instanceof Array); //true->array | false->object
		
		line = (type)?"[":"{";
		for(var i in arr ){
			if (typeof arr[i] == "function") continue;
			InternalCounter++;
			if (type){
				while (i>InternalCounter){
					line += ",";
					InternalCounter++;
				}
			}else{ //arr == object
				line += "\"" + i + "\"";
				line += ":";
			}
			if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
				line +=  arr[i];
			} else if (typeof arr[i] == "string"){
				line +=  "\"" + arr[i] + "\"";
			} else if(typeof arr[i] == "undefined"){
				line += '';
			} else {
				line += implode(arr[i]);
			}
			line += ",";
		}
		var endChar = line.substring(line.length-1,line.length);
		return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
	} catch (err){
		GM_log("Implode error : " + err);
		throw ("Implode error : " + err);
	}
}

function number_format(number,decimals,dec_point,thousands_sep){
	// http://kevin.vanzonneveld.net
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +     bugfix by: Michael White (http://getsprink.com)
	// +     bugfix by: Benjamin Lupton
	// +     bugfix by: Allan Jensen (http://www.winternet.no)
	// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +     bugfix by: Howard Yeend
	// +    revised by: Luke Smith (http://lucassmith.name)
	// +     bugfix by: Diogo Resende
	// +     bugfix by: Rival
	// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
	// *     example 1: number_format(1234.56);
	// *     returns 1: '1,235'
	// *     example 2: number_format(1234.56, 2, ',', ' ');
	// *     returns 2: '1 234,56'
	// *     example 3: number_format(1234.5678, 2, '.', '');
	// *     returns 3: '1234.57'
	// *     example 4: number_format(67, 2, ',', '.');
	// *     returns 4: '67,00'
	// *     example 5: number_format(1000);
	// *     returns 5: '1,000'
	// *     example 6: number_format(67.311, 2);
	// *     returns 6: '67.31'

	var n = number, prec = decimals;
	n = !isFinite(+n) ? 0 : +n;
	prec = !isFinite(+prec) ? 0 : Math.abs(prec);
	var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
	var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

	var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

	var abs = Math.abs(n).toFixed(prec);
	var _, i;

	if (abs >= 1000) {
		_ = abs.split(/\D/);
		i = _[0].length % 3 || 3;

		_[0] = s.slice(0,i + (n < 0)) +
			  _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		s = _.join(dec);
	} else {
		s = s.replace('.', dec);
	}
	return s;
}

// **************************************************************************

function do_game(){
	if(document.getElementsByName("sid_refresh_password").length>0){
		//Session lost
		var logindata = new Array();
		try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		var lastUser = GM_getValue(lng+"_"+server+"_lastUser","");
		var lastUserNr = -1;
		for(var v=0;v<logindata.length;v++)if(logindata[v][2].toLowerCase()==lastUser){lastUserNr=v;break;}
		if(lastUserNr>-1){
			document.getElementsByName("sid_refresh_password")[0].value = logindata[lastUserNr][3];
			var cand = document.getElementsByTagName("input");
			for(var v=0;v<cand.length;v++)if(cand[v].type=="submit"){ click(cand[v]); }
		} else {
			var gamepages = {"de":"http://www.die-staemme.de"};
			document.location.href = gamepages[lng];
		}
	} else {
		const username = unsafeWindow.game_data["player"]["name"];
		GM_setValue(lng+"_"+server+"_lastUser",username.toLowerCase());
		window.setInterval(function(){
			GM_setValue(lng+"_"+server+"_sessionlost",false);
		},500);
		var newtable = createElement("table",{"width":"840","cellspacing":"0","align":"center","style":"padding:0pt;margin-bottom:4px;"},all);
		var newtr = createElement("tr",{},newtable);
		var newtd = createElement("td",{},newtr);
		newtable = createElement("table",{"class":"navi-border","style":"border-collapse:collapse;"},newtd);
		newtr = createElement("tr",{},newtable);
		newtd = createElement("td",{},newtr);
		newtable = createElement("table",{"id":"table_berater","class":"menu nowrap","style":"width:100%;"},newtable);
		newtr = createElement("tr",{},newtable);
		newtd = createElement("td",{},newtr);
		var newa = createElement("a",{"href":"#"},newtd,texte["berater"]);
		newa.addEventListener("click",function(){
			//AutoLogin
			var gamepages = {"de":"http://www.die-staemme.de"};
			$("content_value").innerHTML = "";
			createElement("div",{"align":"center","style":"line-height:30px;font-weight:bold;"},$("content_value"),texte["autoLogin"]);
			createElement("table",{"id":"tableAutologin","align":"center"},$("content_value"));
			function buildLoginTable(showPW) {
				var logindata = new Array();
				try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
			
				function saveLogin(){
					GM_setValue("logindata",implode(logindata));
				}
				var newtable = createElement("table",{"align":"center"});
				$("tableAutologin").parentNode.replaceChild(newtable,$("tableAutologin"));
				newtable.id = "tableAutologin";
				newtable.addEventListener("change",saveLogin,false);
				var newtr = createElement("tr",{},newtable);
				createElement("th",{},newtr,texte["server"]);
				createElement("th",{},newtr,texte["name"]);
				createElement("th",{},newtr,texte["passwort"]);
				var newtd,newinput,newselect,newdiv
				for (var v=0;v<logindata.length;v++){
					newtr = createElement("tr",{},newtable);
					newtd = createElement("td",{},newtr);
					newinput = createElement("input",{"id":"loginActive"+v,"type":"checkbox","title":texte["accountAktiv"],"checked":logindata[v][4]},newtd);
					newinput.addEventListener("change",function(){ logindata[this.id.replace("loginActive","")][4] = this.checked; },false);				
					newinput = createElement("input",{"id":"loginServer"+v,"style":"width:20px","maxlength":"2"},newtd);
					if (isNaN(logindata[v][1])){ logindata[v][1]="0";}
					if (logindata[v][1]!="0"){ newinput.value = logindata[v][1]; }
					newinput.addEventListener("change",function(){
						var readin = parseInt(this.value,10);
						if (isNaN(readin) || (readin<1)) {alert(texte["ungueltigerServer"]); this.value="";}
						else { 
							this.value = readin; 
							logindata[this.id.replace("loginServer","")][1] = readin;
						}
					},false);
					newselect = createElement("select",{"id":"loginLng"+v},newtd);
					for(var w in gamepages)	createElement("option",{"value":w},newselect,w);
					newselect.value = logindata[v][0];
					newselect.addEventListener("change",function(){ logindata[this.id.replace("loginLng","")][0] = this.value; },false);				
			
					newtd = createElement("td",{},newtr);
					newinput = createElement("input",{"id":"loginName"+v,"style":"width:150px","value":logindata[v][2],"maxlength":"20"},newtd);
					newinput.addEventListener("change",function(){ logindata[this.id.replace("loginName","")][2] = this.value; },false);				
					
					newtd = createElement("td",{},newtr);
					newinput = createElement("input",{"id":"loginPW"+v,"style":"width:150px","value":logindata[v][3],"maxlength":"20"},newtd);
					if (!showPW){ newinput.type = "password"; }
					newinput.addEventListener("change",function(){ logindata[this.id.replace("loginPW","")][3] = this.value; },false);				
			
					newtd=createElement("td",{},newtr);
					if (v>0) {
						newdiv = createElement("div",{"id":"loginUp"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
						createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_up.gif","style":"width:14px;height:10px;"},newdiv);
						newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newdiv.addEventListener("click",function(){
							var currLine=parseInt(this.id.replace("loginUp",""),10);
							logindata.splice(currLine-1,2,logindata[currLine],logindata[currLine-1]);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					if (v<logindata.length-1) {
						newdiv = createElement("div",{"id":"loginDown"+v,"class":"link2","style":"width:14px;height:10px;"},newtd);
						createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/quest_down.gif","style":"width:14px;height:10px;"},newdiv);
						newdiv.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
						newdiv.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
						newdiv.addEventListener("click",function(){
							var currLine=parseInt(this.id.replace("loginDown",""),10);
							logindata.splice(currLine,2,logindata[currLine+1],logindata[currLine]);
							saveLogin();
							buildLoginTable(showPW);
						},false);
					}
					
					newtd=createElement("td",{"title":texte["loeschen"],"id":"loginDelete"+v},newtr);
					createElement("img",{"src":"http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif","class":"link2","style":"width: 16px;height: 16px;"},newtd);
					newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
					newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
					newtd.addEventListener("click",function(){
						var currLine=this.id.replace("loginDelete","");
						logindata.splice(currLine,1);
						saveLogin();
						buildLoginTable(showPW);
					},false);
				}
				
				newtr = createElement("tr",{},newtable);
				newtd = createElement("td",{colspan:"5","class":"link","style":"font-weight:bold;font-size:16px;text-align:right;"},newtr,"+");
				newtd.addEventListener("mouseover",function(){this.style.backgroundColor="blue"},false);
				newtd.addEventListener("mouseout",function(){this.style.backgroundColor="transparent"},false);
				newtd.addEventListener("click",function(){
					logindata.push([lng,"0","","","false"]); // neue leere zeile
					saveLogin();
					buildLoginTable(showPW);
				},false);
				newtable=null;newtr=null;newtd=null;newinput=null;newselect=null;newdiv=null;
			}
			buildLoginTable(false);
	
			var newdiv = createElement("div",{"align":"center"},$("content_value"));
			var newinput = createElement("input",{"type":"checkbox","class":"link","checked":false},newdiv);
			newinput.addEventListener("click",function(){buildLoginTable(this.checked);},false);
			createElement("span",{},newdiv,texte["zeigePasswoerter"]);
	
			newdiv = createElement("div",{"align":"center"},$("content_value"));
			newinput = createElement("input",{"type":"checkbox","class":"link","checked":GM_getValue("valAutoLogin",false)},newdiv);
			newinput.addEventListener("click",function(){
				GM_setValue("valAutoLogin",this.checked);
			},false);
			createElement("span",{},newdiv,texte["valAutoLogin"]);
			
			newdiv = createElement("div",{"align":"center"},$("content_value"));
			createElement("span",{},newdiv,texte["startPage"]+": ");	
			newinput = createElement("input",{"id":"inputStartPage","value":GM_getValue(lng+"_"+server+"_"+username+"_startScreen","screen=overview"),"style":"width:200px;"},newdiv);	
			newinput.addEventListener("change",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_startScreen",this.value);
			},false);
			newinput = createElement("a",{"href":"#"},newdiv,texte["diese"]+"!");	
			newinput.addEventListener("click",function(){
				$("inputStartPage").value = pageZusatz.replace(/\?/,"");
				change($("inputStartPage"));
			},false);
			
			newdiv = createElement("div",{"align":"center"},$("content_value"));
			createElement("a",{"href":scriptUrl,"target":"_blank"},newdiv,texte["scriptHomepage"]);	
	
			newdiv=null;newinput=null;
		},false);
	
		var dataUnits = {"spear":{"cost":[50,30,10,1],"att":10,"def":[15,45,20],"speed":18,"carry":25},"sword":{"cost":[30,30,70,1],"att":25,"def":[50,15,40],"speed":22,"carry":15},"axe":{"cost":[60,30,40,1],"att":40,"def":[10,5,10],"speed":18,"carry":10},"archer":{"cost":[100,30,60,1],"att":15,"def":[50,40,5],"speed":18,"carry":10},"spy":{"cost":[50,50,20,2],"att":0,"def":[2,1,2],"speed":9,"carry":0},"light":{"cost":[125,100,250,4],"att":130,"def":[30,40,30],"speed":10,"carry":80},"marcher":{"cost":[250,100,150,5],"att":120,"def":[40,30,50],"speed":10,"carry":50},"heavy":{"cost":[200,150,600,6],"att":150,"def":[200,80,180],"speed":11,"carry":50},"ram":{"cost":[300,200,200,5],"att":2,"def":[20,50,20],"speed":30,"carry":0},"catapult":{"cost":[320,400,100,8],"att":100,"def":[100,50,100],"speed":30,"carry":0},"knight":{"cost":[20,20,40,10],"att":150,"def":[250,400,150],"speed":10,"carry":100},"snob":{"cost":[40000,50000,50000,100],"att":30,"def":[100,50,100],"speed":35,"carry":0}};
		// unterschiede der welten?
		const unitname = {"spear":"Speertr&auml;ger","sword":"Schwertk&auml;mpfer","axe":"Axtk&auml;mpfer","archer":"Bogensch&uuml;tze","spy":"Sp&auml;her","light":"Leichte Kavallerie","marcher":"Berittener Bogensch&uuml;tze","heavy":"Schwere Kavallerie","ram":"Rammbock","catapult":"Katapult","knight":"Paladin","snob":"Adelsgeschlecht"};
		var newdiv,cand;
		var screen = /screen=(.+?)\&/.exec(pageZusatz+"&");
		screen = screen?screen[1]:"";
		switch(screen){
		case "barracks":{
			// Kaserne
		break;}
		case "overview":{
			// Dorf
		break;}
		case "place":{
			// Versammlungsplatz
			// carryamount
			newdiv = createElement("div");
			$("units_form").parentNode.insertBefore(newdiv,$("units_form").nextSibling);
			createElement("span",{},newdiv,"Beute tragen:&nbsp;");
			createElement("span",{"id":"carryAmount"},newdiv,"0");
			function calc_units_form(){
				var c=0;
				for(var unit in dataUnits){
					c += parseInt("0"+$("unit_input_"+unit).value,10)*dataUnits[unit]["carry"];
				}
				$("carryAmount").innerHTML = number_format(c);
			}
			$("units_form").addEventListener("keyup",calc_units_form,false);
			$("units_form").addEventListener("click",function(){window.setTimeout(calc_units_form,100)},false);
			
			//movement type
			var oldmovements = new Object();
			try{ oldmovements = explode(GM_getValue(lng+"_"+server+"_"+username+"_movements","{}")); }catch(err){}
			var movements = new Object();
			cand = $("content_value").getElementsByClassName("vis")[5].getElementsByTagName("tr");
			for(var v=cand.length-1;v>0;v--){
				newtd = cand[v].getElementsByTagName("td")[0];
				var moveId = /(\d+)/.exec(newtd.getElementsByTagName("span")[0].id)[1];
				var way = /\/([^\/]*?)\./.exec(newtd.getElementsByTagName("img")[0].getAttribute("src"))[1];
				if(oldmovements[moveId] && (way==oldmovements[moveId][0])){
					movements[moveId] = oldmovements[moveId];
				} else {
					movements[moveId] = [way,"",""];
				}
				if(movements[moveId][1]==""){
					GM_xmlhttpRequest({
						method: "GET",
						url: newtd.getElementsByTagName("a")[0].href,
						onload: function(response) {
							var moveId = /id=(\d+)/.exec(response.finalUrl)[1];
							//GM_log("read "+moveId);
							newstr = "";
							var help = response.responseText.replace(/\s+/g," ").replace(/"/g,"'").split(/<table class='vis'>/);
							var help2 = help[1].split(/<\/table>/)[0];
							var help3 = help2.split(/<tr>/);
							help2 = help3[2].split(/<\/td>/);
							help2.splice(-1,1);
							help3 = help3[1].split(/<\/th>/);
							var help4;
							for(var v=0;v<help2.length;v++){
								help4 = /(\d+)/.exec(help2[v])[1];
								if(help4!="0"){
									newstr += (help3[v].replace(/<th.*?>/,"").replace(/src/g,"style='width:12px;height:12px;' src"))+help4+"&nbsp;";
								}
							}
							movements[moveId][1] = newstr;
							//if(help[2]){ newstr += ('<table class="vis">'+help[2].slice(0,help[2].search('</table>')+8).replace(/src/g,'style="width:11px;height:11px;" src')).replace(/"/g,"\'"); }
							movements[moveId][2] = help[2]?("<table class='vis'>"+help[2].slice(0,help[2].search("</table>")+8).replace(/<td.*?<\/td>/,"").replace(/src/g,"style='width:12px;height:12px;' src")):"";
							GM_setValue(lng+"_"+server+"_"+username+"_movements",implode(movements));
							$("movementinfoArmy"+moveId).innerHTML = movements[moveId][1];
							$("movementinfoCarry"+moveId).innerHTML = movements[moveId][2];
						}
					});
				}
				createElement("div",{"id":"movementinfoArmy"+moveId},newtd,movements[moveId][1]);
				createElement("div",{"id":"movementinfoCarry"+moveId},cand[v].getElementsByTagName("td")[1],movements[moveId][2]);
			}
			GM_setValue(lng+"_"+server+"_"+username+"_movements",implode(movements));
		break;}
		}
		if(GM_getValue(lng+"_"+server+"_"+username+"_goToStartScreen",false)){
			GM_setValue(lng+"_"+server+"_"+username+"_goToStartScreen",false);
			document.location.href = "game.php?"+GM_getValue(lng+"_"+server+"_"+username+"_startScreen","screen=overview");
		}
	}
	newtable=null;newtr=null;newtd=null;newa=null;newdiv=null;cand=null;
}

function do_login(){
	//if(top.document.location!=document.location) return;
	var gamepages = {"de":"http://www.die-staemme.de"};
	var loc = (/http:\/\/(.*)die-staemme\.de\/(.*)/i).exec(document.location.href);
	if(loc){
		if((loc[2].search(/logout\.php/i)!=-1)||(loc[2].search(/sid_wrong\.php/i)!=-1)){
			document.location.href = gamepages[lng];
		}
	}
	if ($("login_form")){
		//paypal
		var newform = createElement("form",{"id":"paypalForm","action":"https://www.paypal.com/cgi-bin/webscr","method":"post","style":"position:absolute;top:30px;left:10px;z-index:99;"},all);
		createElement("input",{"type":"hidden","name":"cmd","value":"_donations"},newform);
		createElement("input",{"type":"hidden","name":"business","value":"jessica_holtkamp@web.de"},newform);
		createElement("input",{"type":"hidden","name":"lc","value":((lng=="de")?"DE":"US")},newform);
		createElement("input",{"type":"hidden","name":"item_name","value":"MyFreeFarm Script"},newform);
		createElement("input",{"type":"hidden","name":"no_note","value":"0"},newform);
		createElement("input",{"type":"hidden","name":"currency_code","value":"EUR"},newform);
		createElement("input",{"type":"hidden","name":"bn","value":"PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"},newform);
		createElement("input",{"type":"image","border":"0","src":"https://www.paypal.com/"+((lng=="de")?"de_DE/DE":"en_US")+"/i/btn/btn_donate_LG.gif","name":"submit",alt:"PayPal"},newform);
		createElement("img",{"alt":"","border":"0","src":"https://www.paypal.com/en_US/i/scr/pixel.gif","width":"1","height":"1"},newform);
		newform=null;

		//login
		var Now = Math.floor((new Date()).getTime()/1000);
		var keydologin = /dologin=(\d+)/;
		var keydoserver = /doserver=(\d+)/;
		var logindata = new Array();
		try{ logindata = explode(GM_getValue("logindata","[]")); }catch(err){}
		var c=0;
		var servers = new Object();
		for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
			c++;
			if(!servers[logindata[v][0]+"_"+logindata[v][1]]){ servers[logindata[v][0]+"_"+logindata[v][1]]=new Array(); }
			servers[logindata[v][0]+"_"+logindata[v][1]].push(v);
		}
		
		function submit_login(accNr){
			if(logindata[accNr][0]==lng){
				getChildElementById($("login_form"),"input","user").value=logindata[accNr][2];
				getChildElementById($("login_form"),"input","password").value=logindata[accNr][3];
				click($("login_form").getElementsByClassName("login_button")[0]);
				//server click
				function doWorldSelection(currServ){
					if($("world_selection").style.display!="none"){
						GM_setValue(lng+"_"+currServ+"_"+logindata[accNr][2]+"_goToStartScreen",true);
						click(createElement("a",{"onclick":"return Index.submit_login('server_de"+currServ+"');","href":"#"},$("world_selection")));
					} else {
						window.setTimeout(function(){doWorldSelection(currServ)},100);
					}
				}
				doWorldSelection(logindata[accNr][1]);
			} else {
				document.location.href = gamepages[logindata[accNr][0]]+"/login.php?start=1&ref=&wid=&dologin="+accNr;
			}
		}
		var currDoLogin = keydologin.exec(document.location.href);
		var currDoServer = keydoserver.exec(document.location.href);
		if(currDoServer){
			var help = GM_getValue(lng+"_"+currDoServer[1]+"_username","");
			for (var v=0;v<logindata.length;v++){
				if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])&&(logindata[v][2].toLowerCase()==help)){ 
					currDoLogin = [,v]; 
					break;
				}
			}
			if(!currDoLogin){
				for (var v=0;v<logindata.length;v++){
					if((logindata[v][4])&&(logindata[v][0]==lng)&&(logindata[v][1]==currDoServer[1])){ 
						currDoLogin = [,v]; 
						break;
					}
				}				
			}
		}
		if(currDoLogin){
			submit_login(currDoLogin[1]);
		} else {
			var newdiv = createElement("div",{"style":"position:absolute;top:0px;left:840px;width:300px;"},$("login_form").parentNode.parentNode);
			var newbutton;
			for (var v=0;v<logindata.length;v++) if(logindata[v][4]){
				newbutton = createElement("div",{"style":"height:32px;"},newdiv);
				newbutton = createElement("a",{"id":"autologin"+v,"href":"#"},newbutton);
				createElement("span",{"class":"button_left"},newbutton);
				createElement("span",{"id":"autologinSpan"+v,"class":"button_middle"},newbutton,texte["server"]+" "+logindata[v][1]+"."+logindata[v][0]+": "+logindata[v][2]);
				createElement("span",{"class":"button_right"},newbutton);
				newbutton.addEventListener("click",function(){
					submit_login(this.id.replace("autologin",""));
				},false);
			}
		
			//Autologin
			var lastbusy = GM_getValue("loginbusy",0);
			if (isNaN(lastbusy) || Now<lastbusy) { lastbusy = 0; }
			if (GM_getValue("valAutoLogin",false) && (c>0) && (Now-lastbusy>15)){
				GM_setValue("loginbusy",Now);
				if (c==1) {
					//Soloaccount
					for (var v=0;v<logindata.length;v++) if(logindata[v][4]){ 
						submit_login(v);
					}
				} else {
					//Multiaccount
					createElement("div",{"id":"divInfo","style":"position:absolute;top:-110px;left:700px;height:100px;width:280px;background-color:#842;border:4px solid black;z-index:99;"},$("login_form").parentNode.parentNode);
					$("divInfo").innerHTML = "<h2>"+texte["autologin1"].replace(/%1%/,"5")+"</h2>";
		
					for (var v in servers) {
						GM_setValue(v+"_sessionlost",true);
					}
					var counter = 5;
					function autologinLoop(){
						counter-=0.5;
						if(counter>0){
							$("divInfo").innerHTML = "<h2>"+texte["autologin1"].replace(/%1%/,Math.ceil(counter))+"</h2>";
							var c = 0;
							for (var v in servers) {
								if (!GM_getValue(v+"_sessionlost",true)) {
									var help = GM_getValue(v+"_username","");
									for(var w=0;w<servers[v].length;w++){
										$("autologinSpan"+servers[v][w]).style.color = (logindata[servers[v][w]][2].toLowerCase()==help?"#00ff00":"#008800");
									}
									delete servers[v];
								} else {
									c++;
								}
							}
							if(c==0){ counter = 0; }
							window.setTimeout(autologinLoop,500);
						} else {
							var c = -1;
							for (var v in servers) {
								if (GM_getValue(v+"_sessionlost",true)) {
									if (c==-1) {c=servers[v][0];}
									else {window.open(gamepages[logindata[servers[v][0]][0]]+"/login.php?start=1&ref=&wid=&dologin="+servers[v][0]);}
								}
							}
							GM_setValue("loginbusy",0);
							if (c==-1) {
								//window.close(); <-- funzt nicht :(
								$("divInfo").innerHTML = "<h2>"+texte["autologin2"]+"</h2>";
								window.setTimeout(function(){document.location=document.location},5000);
							} else { submit_login(c); }
						}
					}
					window.setTimeout(autologinLoop,500);
				}
			}
			newdiv=null;newbutton=null;
		}
	}
}

// **************************************************************************

var all = document.getElementsByTagName("body")[0];
var reg = /http:\/\/de(\d+)\.die-staemme\.de\/(.*?)\.php(.*)/i;
//GM_log("site: "+document.location.href);
var loc = reg.exec(document.location.href);
if(loc){
	const server = loc[1];
	const page = loc[2];
	const pageZusatz = loc[3];
	switch (page) {
		case "game": do_game();break;
	}
} else do_login();
},false);