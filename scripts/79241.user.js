// ==UserScript==
// @name           BvS Ally Drop Counter
// @namespace      Garyzx
// @description    Counts the number of times that TACOS, Sue, Billy, Emo, and Proof drop their drops, and uploads the results to Gary's server
// @include        http://www.animecubed.com/billy/bvs/missions/mission1.html
// @include        http://animecubed.com/billy/bvs/missions/mission1.html
// @include        http://www.animecubed.com/billy/bvs/missionstart.html
// @include        http://animecubed.com/billy/bvs/missionstart.html
// @include        http://www.animecubed.com/billy/bvs/pages/main.html
// @include        http://animecubed.com/billy/bvs/pages/main.html
// @include        http://www.animecubed.com/billy/bvs/sponsoritems.html
// @include        http://animecubed.com/billy/bvs/sponsoritems.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        2.01
// @history        2.01 Fixed SBYN (hopefully)
// @history        2.00 Record ally drop chance bonus, any team can be used, counts more drops
// @history        1.00 Initial version
// ==/UserScript==

var version="2.01";

var div;

var allies=[];
allies.push(["TACOS",           "TACO",               "<br>TACOS hands you an extra TACO!<br>"]);
allies.push(["Sue",             "Ash-Covered Tile",   "<br>Sue makes a mess while fashioning a new Stealth Suit..<br>"]);
allies.push(["Billy Lvl. 2",    "Smoke Bombs",        "Billy giggles, and pockets a Smoke Bomb!"]);
allies.push(["Billy Lvl. 3",    "Smoke Bombs",        "Billy giggles, and pockets a Smoke Bomb!"]);
allies.push(["Billy Lvl. 3",    "Billy Bucket",       "You catch Billy playing in a big, magic bucket. Weird."]);
allies.push(["Proof Reader",    "Storybook Page",     "Proof flips through his manuscripts, and a single page flutters away.."]);
allies.push(["Emosuke Lvl. 3",  "Emo Rock CDs",       "Where does Emo get all of these?"]);
allies.push(["Emosuke Lvl. 3",  "Emo Rock CDs2",      "Emosuke is so emo, he bleeds Emo CDs!"]);
allies.push(["Emosuke Lvl. 3",  "Razor Blades",       "Emo coughs up a.. Razor Blade?!"]);
allies.push(["Emosuke Lvl. 2",  "Emo Rock CDs",       "Emosuke mumbles, and drops one of his emo CDs!"]);
allies.push(["Emosuke Lvl. 2",  "Emo Rock CDs2",      "Emosuke is so emo, he bleeds Emo CDs!"]);
allies.push(["Emosuke Lvl. 2",  "Razor Blades",       "A razor blade slips out from Emosuke's wrist-sweater thingies.."]);

//Firefox doesn't implement http://www.w3.org/TR/webstorage/ properly? Time for ugly workarounds!
function get(key, def){
	var val;
	if(val=localStorage.getItem("allyDrop."+key)){
		if(val[0]=='d')
			return new Date(parseInt(val.substr(1)));
		if(val[0]=='a'){
			val=val.substr(1).split(',');
			for(var n=0; n<val.length; n++)
				val[n]=parseInt(val[n]);
			return val;
		}
		return parseInt(val);
	}
	return def;
}

function set(key, val){
	if(val.length)
		val="a"+val;
	if(val.getTime)
		val="d"+val.getTime();
	localStorage.setItem("allyDrop."+key, val);
}

function uploadData(){
	var str="";
	str+=document.body.innerHTML.match(/name="player" value="([^"]+)"/)[1]+",";
	str+=get("start", new Date()).getTime()+","+get("end", new Date()).getTime()+",";
	str+=get("bonus", 0)+"\n";
	var lines=0;
	for(var n=0; n<allies.length; n++){
		var count=get(n, [0,0]);
		if(count[0]>0){
			lines++;
			str+=allies[n][0]+","+allies[n][1]+","+count+"\n";
		}
	}
	str=version+"\n"+lines+","+str;
	div.innerHTML="Uploading...";
	div.style.border="2px solid fuchsia";
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://bvs-garyzx.appspot.com/bvs/dropcounter",
		data: str,
		
		onload: function(response){
			div.innerHTML=response.responseText;
			if(response.responseText.indexOf("Data uploaded")!=-1){
				set("start", 0);
				set("end", 0);
				set("missions", 0);
				set("total", 0);
				set("hide", 0);
				for(var n=0; n<allies.length; n++){
					set(n, [0,0]);
				}
				div.style.border="2px solid forestgreen";			
			}
			else
				div.style.border="2px solid red";
		}
	});
}

function discardData(){
	set("start", 0);
	set("end", 0);
	set("missions", 0);
	set("total", 0);
	set("hide", 0);
	for(var n=0; n<allies.length; n++){
		set(n, [0,0]);
	}
	div.innerHTML="Data discarded";
	div.style.border="2px solid darkslateblue";
}

function getBonus(){
	var bonus=get("sponsor", 0);
	var matches=document.body.innerHTML.match(/([0-9]+)%? ally drop/ig);
	for(var n=0; n<matches.length; n++)
		bonus+=parseInt(matches[n].match(/([0-9]+)%? ally drop/i)[1]);
	if(document.body.innerHTML.indexOf("Stand By Your Ninja")!=-1)
		bonus+=100;
	return bonus;
}

if(document.body.innerHTML.indexOf('<font color="#0000a1">Success!</font>')!=-1){
	if(get("sponsor", -1)==-1){
		alert("Please go to the main page so the script can determine your current sponsor item.");
	}
	else if(getBonus()!=get("bonus", getBonus()) && get("missions", 0)>0){
		alert("Your ally drop chance bonus changed! Please go to the mission selection page to upload your old data.");
	}
	else{
		set("bonus", getBonus());
		var good=false;
		for(var n=0; n<allies.length; n++){
			if(document.body.innerHTML.indexOf(allies[n][0])!=-1){
				var count=get(n, [0,0]);
				count[0]=count[0]+1;
				if(document.body.innerHTML.indexOf(allies[n][2])!=-1){
					count[1]++;
					set("total", get("total", 0)+1);
				}
				set(n, count);
				good=true;
			}
		}
		if(good){
			set("missions", get("missions", 0)+1);
			if(get("start", 0)==0)
				set("start", new Date());
			set("end", new Date());
		}
	}
}

if(document.body.innerHTML.indexOf('Attempt a Ninja Mission!')!=-1){
	try{
		ScriptUpdater.check(79241, version);
	} catch(e) {}
	var td=document.evaluate("/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td",
			document, null, XPathResult.ANY_TYPE, null).iterateNext();
	div=document.createElement("div");
	div.style.width="496";
	td.insertBefore(div, td.children[0]);
	if(get("missions", 0)>0){
		if(new Date()-get("start", 0)>20*60*60*1000){
			div.innerHTML="<h1>You have unuploaded data from yesterday!</h1>";
			div.style.border="2px solid tomato";
		}
		else{
			div.innerHTML="You have unuploaded data:<br>";
			div.style.border="2px solid maroon";
		}
		div.innerHTML+=get("missions", 0)+" missions, "+
				get("total", 0)+" total drops "+
				"between<br>"+get("start")+
				" and<br>"+get("end")+
				"<br>";
		var button=document.createElement('input');
		button.type="button";
		button.value="Upload data!";
		button.addEventListener("click", uploadData, true);
		div.appendChild(button);
		if(get("missions", 0)<3){
			var button2=document.createElement('input');
			button2.type="button";
			button2.value="Discard data";
			button2.addEventListener("click", discardData, true);
			div.appendChild(button2);
		}
	}
	else{
		if(get("sponsor", -1)==-1){
			div.style.border="2px solid aqua";
			div.innerHTML="Please go to the main page so the script can determine your current sponsor item.";
		}
		else if(!get("hide", 0)){
			div.style.border="2px solid grey";
			div.innerHTML="No data!";
			set("hide", 1);
		}
	}
}

if(document.body.innerHTML.indexOf("Item: <b>")!=-1){
	if(document.body.innerHTML.indexOf("Item: <b>Dresden's File")!=-1)
		set("sponsor", 11);
	else
		set("sponsor", 0);
}
