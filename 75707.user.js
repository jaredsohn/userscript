// ==UserScript==
// @name           BvS Mahjong
// @namespace      Garyzx
// @description    Selects discards according to the "Level Two Strat" for Mahjong
// @include        http://www.animecubed.com/billy/bvs/partyhouse-mahjongplay.html
// @include        http://animecubed.com/billy/bvs/partyhouse-mahjongplay.html
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        1.06
// @history        1.06 Works again (McM changed the Dora mouseover)
// @history        1.05 Hotkey now works for "Go to Next Round"
// @history        1.04 Add hotkey ('d')
// @history        1.03 Detect winds, dora, reach
// @history        1.02 Added script updater
// @history        1.01 Less fail
// @history        1.00 Initial version
// ==/UserScript==

var version="1.06";

var tiles=[], amount={};
var yWind, tWind, dora=[];

function Tile(string){
	var matches=string.match(/<label for="(tile[0-9a-z]+)"><img src="\/billy\/layout\/mjtiles\/tileset\/[A-Z0-9]+.gif"><br>([a-zA-Z0-9\-]+)<\/label>/);
	this.id=matches[1];
	this.name=matches[2];
	if(this.name[1]=="-"){
		this.value=Number(this.name[0]);
		this.suit=this.name.substr(2);
	}
	else{
		this.value=this.name;
		if(this.value=="Red" || this.value=="White" || this.value=="Green")
			this.suit="dragon";
		else
			this.suit="wind";
	}
	this.amount=function(offset){
		if(offset==0)
			return amount[this.name];
		if(this.suit=="dragon" || this.suit=="wind")
			return 0;
		var n=this.value+offset;
		if(n<1 || n>9)
			return 0;
		if(!amount[n+"-"+this.suit])
			amount[n+"-"+this.suit]=0;
		return amount[n+"-"+this.suit];
	}
}

function find(id){
	return document.evaluate("//img[@height='32'][contains(@src,'"+id+".gif')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
}

function match(array, arrays){
	for(var i=0; i<arrays.length; i++){
		var good=true;
		for(var j=0; j<arrays[i].length; j++)
			if(array[j]!=arrays[i][j] && arrays[i][j]!=-1 && !(arrays[i][j]==1.5 && array[j]>0))
				good=false;
		if(good)
			return true;
	}
	return false;
}

function init(){
	var matches=document.body.innerHTML.match(/<label for="tile[0-9a-z]+"><img src="\/billy\/layout\/mjtiles\/tileset\/[A-Z0-9]+.gif"><br>[a-zA-Z0-9\-]+<\/label>/g);
	if(!matches)
		return false;
	for(var i=0; i<matches.length; i++){
		tiles[i]=new Tile(matches[i]);
		if(amount[tiles[i].name]>0)
			amount[tiles[i].name]++;
		else
			amount[tiles[i].name]=1;
	}
	yWind=document.body.innerHTML.match(/<b>You \(([a-zA-Z]+)\): /)[1];
	tWind=document.body.innerHTML.match(/<i>([a-zA-Z]+) [1-4]<\/i>/)[1];
	doras=document.body.innerHTML.match(/Dora list:&nbsp;&lt;br&gt; ([1-9A-Za-z\-& ;]+)&nbsp;/)[1];
	while(doras.indexOf("&nbsp;")!=-1)
		doras=doras.replace("&nbsp;"," ");
	doras=doras.split(" ");
	return true;
}

function selectTiles(){
	var results=[];
	if(document.body.innerHTML.match(/one of the following:<br><i>[1-9A-Za-z\-, ]+<\/i><\/b>/)){
		var reaches=document.body.innerHTML.match(/one of the following:<br><i>([1-9A-Za-z\-, ]+)<\/i><\/b>/)[1];
		while(reaches.indexOf(" ")!=-1)
			reaches=reaches.replace(" ","");
		reaches=reaches.split(",");
		for(var i=0; i<tiles.length; i++)
			for(var n=0; n<reaches.length; n++)
				if(tiles[i].name==reaches[n])
					results.push(tiles[i]);
		return results;
	}
	for(var i=0; i<tiles.length; i++)
		if((tiles[i].suit=="dragon" || tiles[i].suit=="wind") && tiles[i].amount(0)==1)
			results.push(tiles[i]);
	if(results.length>0)
		return results;
	var pairs=0;
	for(var i=0; i<tiles.length; i++){
		var iso=true;
		for(var n=-2; n<=2; n++)
			if(n!=0 && tiles[i].amount(n)>0)
				iso=false;
		if(tiles[i].amount(0)>1)
			iso=false;
		if(tiles[i].amount(0)==2)
			pairs++;
		if(iso)
			results.push(tiles[i]);
	}
	if(results.length>0)
		return results;
	pairs/=2;
	for(var i=0; i<tiles.length; i++){
		var neighbors=[];
		for(var n=-4; n<=4; n++)
			neighbors[n+4]=tiles[i].amount(n);
		if(match(neighbors, [ [-1,-1,0,0,1,0,1,1,-1], [-1,1,1,0,1,0,0,-1,-1],
						[-1,-1,0,0,2,1,1,0,-1], [-1,0,1,1,2,0,0,-1,-1],
						[-1,-1,0,1,2,1,0,0,-1], [-1,0,0,1,2,1,0,-1,-1],
						[0,0,3,0,1,0,0,-1,-1], [-1,-1,0,0,1,0,3,0,0],
						[-1,-1,0,0,1,1,1,1,0], [0,1,1,1,1,0,0,-1,-1] ]))
			results.push(tiles[i]);
	}
	if(results.length>0)
		return results;
	if(pairs>=3)
		for(var i=0; i<tiles.length; i++){
			if(tiles[i].amount(0)==2)
				results.push(tiles[i]);
		}
	if(pairs==1)
		for(var i=0; i<tiles.length; i++){
			var neighbors=[];
			for(var n=-2; n<=2; n++)
				neighbors[n+2]=tiles[i].amount(n);
			if(match(neighbors, [ [0,0,1,2,0], [0,2,1,0,0] ]))
				results.push(tiles[i]);
		}
	if(results.length>0)
		return results;
	for(var i=0; i<tiles.length; i++){
		var neighbors=[];
		for(var n=-2; n<=2; n++)
			neighbors[n+2]=tiles[i].amount(n);
		if(match(neighbors, [ [0,0,1,0,1.5], [1.5,0,1,0,0] ]))
			results.push(tiles[i]);
		else if(tiles[i].value==1 && match(neighbors, [[0,0,1,1,0]]))
			results.push(tiles[i]);
		else if(tiles[i].value==9 && match(neighbors, [[0,1,1,0,0]]))
			results.push(tiles[i]);
	}
	if(results.length>0)
		return results;
	for(var i=0; i<tiles.length; i++){
		var neighbors=[];
		for(var n=-2; n<=2; n++)
			neighbors[n+2]=tiles[i].amount(n);
		if(!match(neighbors, [ [1.5,1.5,1.5,-1,-1], [-1,1.5,1.5,1.5,-1], [-1,-1,1.5,1.5,1.5], [-1,-1,3,-1,-1], [-1,-1,4,-1,-1] ]))
			results.push(tiles[i]);
	}
	if(results.length>0)
		return results;
	return tiles;
}

function process_event(event) {
	if(event.keyCode==68){
		if(document.forms.namedItem("tsumo"))
			document.forms.namedItem("tsumo").wrappedJSObject.submit();
		else if(document.forms.namedItem("takeron"))
			document.forms.namedItem("takeron").wrappedJSObject.submit();
		else if(document.forms.namedItem("startmj"))
			document.forms.namedItem("startmj").wrappedJSObject.submit();
		else if(document.forms.namedItem("reshuffle"))
			document.forms.namedItem("reshuffle").wrappedJSObject.submit();
		else if(document.forms.namedItem("discard"))
			document.forms.namedItem("discard").wrappedJSObject.submit();
		else if(document.forms.namedItem("passontake"))
			document.forms.namedItem("passontake").wrappedJSObject.submit();
		else if(document.forms.namedItem("backtohome2"))
			document.forms.namedItem("backtohome2").wrappedJSObject.submit();
	}
}

if(init()){

tiles=selectTiles();
var maxScore=-9001, bestTile, log="";
for(var n=0; n<tiles.length; n++){
	log+=tiles[n].name+", ";
	var id=document.evaluate("//*[@for='"+tiles[n].id+"']/img", document, null, XPathResult.ANY_TYPE, null).iterateNext().src.split("/")[7].split(".")[0];
	var score=find(id);
	if(tiles[n].value>1)
		score+=find(id[0]+(Number(id.substr(1))-1))/2;
	if(tiles[n].value<9)
		score+=find(id[0]+(Number(id.substr(1))+1))/2;
	if(tiles[n].name==tWind)
		score-=0.6;
	if(tiles[n].name==yWind)
		score-=0.6;
	if(tiles[n].suit=="dragon")
		score-=0.6;
	for(var i=0; i<doras.length; i++)
		if(tiles[n].name==doras[i])
			score-=0.6;
	if(score>maxScore){
		maxScore=score;
		bestTile=tiles[n];
	}
}
log=log.substr(0, log.length-2);
GM_log(log);
var input=document.getElementById(bestTile.id);
if(input)
	input.click();
input=document.getElementById("reachbutton");
if(input)
	input.click();

}
else
	try{
		ScriptUpdater.check(75707, version);
	} catch(e) {}
window.addEventListener("keyup", process_event, false);
