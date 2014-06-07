// ==UserScript==
// @name           BvS Candyween Helper
// @namespace      Garyzx
// @description    Calculates probabilities of each choice in Candyween houses
// @include        http://www.animecubed.com/billy/bvs/villagecandyween.html
// @include        http://animecubed.com/billy/bvs/villagecandyween.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.04
// @history        1.04 Display data at the end, even if ads are turned off (thanks Thosha!)
// @history        1.04 Update probabilities
// @history        1.03 Replace eval() with closures to satisfy Greasemonkey restrictions (thanks to portwizard for finding the problem)
// @history        1.02 Remove debugging output (oops)
// @history        1.01 Auto-select first unvisited house
// @history        1.01 Log Party/Psycho data and format data for forums
// @history        1.01 Allow Candying at Party houses
// @history        1.00 Initial version
// ==/UserScript==

try{
    ScriptUpdater.check(93520, "1.04");
} catch(e){}

var exts={};
exts["Decrepit"]="decrepit mansion";
exts["Creepy"]="creepy door";
exts["Typical"]="typical house";
exts["Spooky"]="spooky house";
exts["Bright"]="brightly lit";

var ints={};
ints["Candy"]=["big handfuls", "just giving", "tasty candy"];
ints["Party"]=["rocking party", "Come on in", "new dance"];
ints["Psycho"]=["wangly eye", "claw your way", "trigger a trapdoor"];

var cond={};
cond["Candy"]={Decrepit: 678, Creepy: 766, Typical: 700, Spooky: 691, Bright: 763};
cond["Party"]={Decrepit: 517, Creepy: 476, Typical: 478, Spooky: 444, Bright: 0};
cond["Psycho"]={Decrepit: 0, Creepy: 173, Typical: 165, Spooky: 141, Bright: 167};

var actions={};
actions["Party"]=["Hit On Somebody", "Rock Out", "Mope", "Tell Funny Stories"];
actions["Psycho"]=["Hide In The Closet", "Get An Axe", "Burn the Place Down", "Scream and Cower"];

function normalize(obj){
	var total=0;
	for(var i in obj)
		total+=obj[i];
	for(var i in obj)
		obj[i]/=total;
}

function get(key, def){
	var val;
	if(val=localStorage.getItem("candyween."+key))
		return val;
	return def;
}

function set(key, val){
	localStorage.setItem("candyween."+key, val)
}

var data=get("data", ",;,;,;,;,;,;,;,;,;,").split(";");
for(var n=0; n<10; n++)
	data[n]=data[n].split(",");

if(document.body.innerHTML.match(/>House #[0-9]+<\/font>/)){
	var houseNum=parseInt(document.body.innerHTML.match(/>House #([0-9]+)<\/font>/)[1])-1;
	for(var n in exts)
		if(document.body.innerHTML.match(exts[n]))
			data[houseNum][0]=n;
	if(document.body.innerHTML.match("think"))
		for(var i in ints){
			if(document.body.innerHTML.match("IS a "+i))
				data[houseNum][1]=i;
			else if(document.body.innerHTML.match("a "+i))
				data[houseNum][1]="Not "+i;
		}
	for(var i in ints)
		for(var j in ints[i])
			if(document.body.innerHTML.match(ints[i][j]))
				data[houseNum][1]=i;
	set("lastHouse", houseNum);
	set("lastAct", "");
}

if(document.body.innerHTML.match("Pick an Action")){
	for(var n=1; n<=4; n++)
		document.getElementById("spact"+n).addEventListener("focus", function(){
			set("lastAct", this.value);
		}, false);
}

if(get("lastAct")){
	var n=parseInt(get("lastAct"));
	var result="";
	if(document.body.innerHTML.match(/That choice's result:<br><b>[^<]+</))
		result=document.body.innerHTML.match(/That choice's result:<br><b>([^<]+)</)[1];
	else if(document.body.innerHTML.match(/You Got [^!]+!/))
		result=document.body.innerHTML.match(/You Got ([^!]+)!/)[1];
	else if(document.body.innerHTML.match(/4 Time/))
		result="-4 Time";
	if(result){
		set("lastAct", "");
		var games=JSON.parse(get("minigames", "[]"));
		games.push([parseInt(get("lastHouse")), n-1, result]);
		set("minigames", JSON.stringify(games));
	}
}

for(var i in cond)
	normalize(cond[i]);

var probs=[];
for(var n=0; n<10; n++){
	probs[n]={};
	for(var i in ints)
		probs[n][i]=0;
}

var notCandy=[];
for(notCandy[0]=0; notCandy[0]<7; notCandy[0]++)
for(notCandy[1]=notCandy[0]+1; notCandy[1]<8; notCandy[1]++)
for(notCandy[2]=notCandy[1]+1; notCandy[2]<9; notCandy[2]++)
for(notCandy[3]=notCandy[2]+1; notCandy[3]<10; notCandy[3]++)
for(var psycho=0; psycho<4; psycho++){
	var houses=[];
	for(var n=0; n<10; n++)
		houses[n]="Candy";
	for(var n=0; n<4; n++)
		houses[notCandy[n]]="Party";
	houses[notCandy[psycho]]="Psycho";
	var prob=1;
	for(var n=0; n<10; n++){
		if(data[n][0])
			prob*=cond[houses[n]][data[n][0]];
		if(data[n][1]){
			if(data[n][1].match("Not")){
				if(data[n][1].match(houses[n])){
					prob=0;
					break;
				}
			}
			else
				if(!data[n][1].match(houses[n])){
					prob=0;
					break;
				}
		}
	}
	for(var n=0; n<10; n++)
		probs[n][houses[n]]+=prob;
}

for(var n=0; n<10; n++){
	normalize(probs[n]);
	for(var i in probs[n])
		if(probs[n][i]>0.9999)
			data[n][1]=i;
	var body="";
	for(var i in probs[n])
		if(probs[n][i]>0.0001)
			body+=Math.round(probs[n][i]*1000)/10+"% "+i+", ";
	body=body.substr(0, body.length-2);
	var header="?", color="redswitch=[1]";
	if(data[n][0]){
		header=data[n][0];
		color="";
	}
	if(data[n][1]){
		header+=", "+data[n][1];
		if(!data[n][1].match("Not"))
			color="greenswitch=[1]";
	}
	if(document.body.innerHTML.match("Visit a House"))
		document.evaluate("//label[@for='house"+(n+1)+"']", document, null, XPathResult.ANY_TYPE, null).iterateNext().title
				="header=["+header+"] body=["+body+"] "+color;
}

var maximized="";
function maximize(int){
	if(avoiding==int){
		maximized=int;
		avoid(avoiding);
		return;
	}
	var max=0;
	for(var n=0; n<10; n++)
		if(!document.getElementById("house"+(n+1)).disabled && probs[n][int]>max){
			max=probs[n][int];
			document.getElementById("house"+(n+1)).click();
		}
	if(max==0){
		if(avoiding)
			alert("All "+int+" houses are "+avoiding+" houses!");
		else
			alert("No more "+int+" houses!");
	}
	else
		maximized=int;
}

function minimize(int){
	var min=1;
	for(var n=0; n<10; n++)
		if(!document.getElementById("house"+(n+1)).disabled && probs[n][int]<min){
			min=probs[n][int];
			document.getElementById("house"+(n+1)).click();
		}
	if(min==1)
		alert("All remaining houses are "+int+"houses!");
}

var avoiding="";
function avoid(int){
	if(avoiding==int){
		for(var n=0; n<10; n++)
			document.getElementById("house"+(n+1)).disabled=visited[n];
		avoiding="";
		if(maximized)
			window.setTimeout(function() {maximize(maximized);}, 100);
		document.getElementById("avoid"+int).value="Avoid "+int+" houses";
	}
	else{
		avoiding=int;
		for(var n=0; n<10; n++)
			if(probs[n][int]>0.0001){
				document.getElementById("house"+(n+1)).disabled=true;
				document.getElementById("house"+(n+1)).checked=false;
			}
			else
				document.getElementById("house"+(n+1)).disabled=visited[n];
		if(maximized && maximized!=int)
			window.setTimeout(function() {maximize(maximized);}, 100);
		for(var i in ints)
			if(document.getElementById("avoid"+i))
				document.getElementById("avoid"+i).value="Avoid "+i+" houses";
		document.getElementById("avoid"+int).value="Unavoid "+int+" houses";
	}
}

if(document.body.innerHTML.match("Perform")){
	var houseNum=parseInt(document.body.innerHTML.match(/>House #([0-9]+)<\/font>/)[1])-1;
	var results=["Candy", "Party", "Psycho"];
	for(var n=0; n<3; n++){
		document.evaluate("//*[@for='ha"+(n+1)+"']", document, null, XPathResult.ANY_TYPE, null)
				.iterateNext().innerHTML+=" ("+Math.round(probs[houseNum][results[n]]*1000)/10+"%)";
		if(probs[houseNum][results[n]]<0.0001 && !(results[n]=="Candy" && probs[houseNum]["Party"]>0.9999))
			document.getElementById("ha"+(n+1)).disabled=true;
		else if(probs[houseNum][results[n]]>0.9999)
			document.getElementById("ha"+(n+1)).click();
	}
}
else if(document.body.innerHTML.match("Visit")){
	var visited=[];
	for(var n=0; n<10; n++)
		visited[n]=document.getElementById("house"+(n+1)).disabled;
	var div=document.createElement("div");
	document.forms.namedItem("cw1").appendChild(div);
	div.appendChild(document.createElement("br"));
	var table=document.createElement("table");
	for(var n=0; n<2; n++){
		var tr=document.createElement("tr");
		for(var i in ints){
			var td=document.createElement("td");
			var a=document.createElement("input");
			a.type="button";
			if(n==0){
				a.value="Maximize "+i+" chance";
				(function(j){a.addEventListener("click", function(){maximize(j);}, true)})(i);
			}
			else{
				var avoidable=false;
				for(var j=0; j<10; j++)
					if(!document.getElementById("house"+(j+1)).disabled && probs[j][i]<0.0001)
						avoidable=true;
				if(avoidable){
					a.value="Avoid "+i+" houses";
					a.id="avoid"+i;
					(function(j){a.addEventListener("click", function(){avoid(j);}, true)})(i);
				}
				else{
					a.value="Minimize "+i+" chance";
					(function(j){a.addEventListener("click", function(){minimize(j);}, true)})(i);
				}
			}
			td.appendChild(a);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	div.appendChild(table);
	var complete=true, next=-1;
	for(var i=0; i<10; i++)
		if(!data[i][0]){
			complete=false;
			if(next==-1)
				next=i+1;
		}
	if(!complete){
		div.appendChild(document.createElement("br"));
		var note=document.createElement("div");
		note.innerHTML="For optimal results, visit all houses once first.";
		note.style.fontWeight="bold";
		note.style.fontVariant="small-caps";
		note.style.fontStyle="italic";
		div.appendChild(note);
		document.getElementById("house"+next).click();
	}
	div.appendChild(document.createElement("br"));
	var a=document.createElement("a");
	a.innerHTML="Clear data";
	a.href="#";
	a.addEventListener("click", function(){
		if(confirm("Are you sure you want to clear all data?\nThis cannot be undone.")){
			for(var i in data)
				for(var j in data[i])
					data[i][j]="";
			set("data", ",;,;,;,;,;,;,;,;,;,");
			set("minigames", "[]");
			alert("Data cleared.");
		}
	}, true);
	a.style.fontSize="12px";
	a.style.color="black";
	a.style.fontWeight="bold";
	div.appendChild(a);
}
else if(document.body.innerHTML.match("See you")){
	var div=document.createElement("div");
	var area=document.createElement("textarea");
	var minigames=JSON.parse(get("minigames", "[]"));
	var output=[];
	for(var n=0; n<10; n++){
		output[n]=(n+1)+". ";
		if(data[n][0])
			output[n]+=data[n][0];
		if(data[n][1])
			output[n]+=" - "+data[n][1];
	}
	for(var n in minigames)
		output[minigames[n][0]]+=" ("+actions[data[minigames[n][0]][1]][minigames[n][1]]+": "+minigames[n][2]+")";
	area.value="Ally: "+get("ally")+"\n\n";
	for(var n=0; n<10; n++)
		area.value+=output[n]+"\n";
	area.rows=14;
	area.cols=60;
	area.addEventListener("focus", function(){this.select()}, false);
	div.innerHTML="Please <a href='/billy/forum/posting.php?mode=reply&f=36&t=16645' target='_blank'>post</a>"+
			" the below into <a href='/billy/forum/viewtopic.php?f=36&t=16645' target='_blank'>this thread</a>.<br><br>";
	div.appendChild(area);
	document.evaluate("//table[@width=510]/tbody/tr/td",
			document, null, XPathResult.ANY_TYPE, null ).iterateNext().appendChild(div);
}
else if(document.body.innerHTML.match("Choose Partner") || document.body.innerHTML.match("You chose")){
	for(var i in data)
		for(var j in data[i])
			data[i][j]="";
	set("minigames", "[]");
	if(document.body.innerHTML.match("You chose")){
		set("ally", document.body.innerHTML.match(/You chose ([^!]+)!/)[1]);
	}
}

for(var n=0; n<10; n++)
	data[n]=data[n].join(",");
set("data", data.join(";"));
