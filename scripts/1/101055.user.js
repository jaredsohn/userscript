// ==UserScript==
// @name           Dominion Scores
// @namespace      http://jamessw.com
// @include			http://dominion.isotropic.org/play
// @description		Get a rough estimate of Dominion Scores. Takes Colonies, Provinces, Duchies, Dukes, Victory Points, Curses, Harems, Islands, and Nobles into account.
// ==/UserScript==

//set up scoring strings
myColS = 'buy a Colony';
myProvS = 'buy a Province';
myDuchyS = 'buy a Duchy';
myEstateS = 'buy an Estate';
myDukeS = 'buy a Duke';
myVpS = 'get \\+1 ▼';
myCurseS = 'gain a Curse';
myHaremS = 'buy a Harem';
myNobleS = 'buy a Noble';
myIslandS = 'buy an Island';

thColS = 'buys a Colony';
thProvS = 'buys a Province';
thDuchyS = 'buys a Duchy';
thEstateS = 'buys an Estate';
thDukeS = 'buys a Duke';
thVpS = 'getting \\+1 ▼';
thCurseS = 'gains a Curse';
thHaremS = 'buys a Harem';
thNobleS = 'buys a Noble';
thIslandS = 'buys an Island';


function CalcScores(player){
	var score = 0;
	score += player.Colony*10;
	score += player.Province *6;
	score += player.Duchy *3;
	score += player.Estate * 1;
	score += player.Duke*player.Duchy;
	score += player.VP;
	score -= player.Curse;
	score += player.Harem*2;
	score += player.Noble*2;
	score += player.Island*2;
	return score;
}

function TextDescription(player){
	var description = "";
	description += player.title + ": ";
	if (player.Colony > 0){description += player.Colony + " Colonies, ";}
	if (player.Province > 0){description += player.Province + " Provinces, ";}
	if (player.Duchy > 0){description += player.Duchy + " Duchies, ";}
	if (player.Estate > 0){description += player.Estate + " Estates, ";}
	if (player.Duke > 0){description += player.Duke + " Dukes, ";}
	if (player.VP > 0){description += player.VP + " VPs, ";}
	if (player.Curse > 0){description += player.Curse + " Curses, ";}
	if (player.Harem > 0){description += player.Harem + " Harems, ";}
	if (player.Noble > 0){description += player.Noble + " Nobles";}
	if (player.Island > 0){description += player.Island + " Islands";}
	description += "=" + player.Score;
	return description;
}

function countOcc(w){
	var r = new RegExp (w, 'gi');
	if (t.match(r)) {
	var count = t.match(r).length;
	}
	else { var count = 0;}
	return count;
}



window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
 var buttonElems = document.getElementsByTagName('body');
 buttonElems[0].innerHTML =  buttonElems[0].innerHTML + '<input style="z-index:2000; position:absolute; right: 0px;" id="greasemonkeyButton" type="button" value="Approx. Scores" />';
addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
t = document.body.innerHTML;
t = t.replace(/\<span class=\"card-victory\"\>/gi,"");
t = t.replace(/\<span class=\"card-curse\"\>/gi,"");
t = t.replace(/\<span class=\"card-victory-action\"\>/gi,"");

function Player(name) {
	this.name = name;
	this.title = "";
	this.Colony = 0;
	this.Province = 0;
	this.Duchy = 0;
	this.Estate = 3;
	this.Duke = 0;
	this.VP = 0;
	this.Curse = 0;
	this.Harem = 0;
	this.Noble = 0;
	this.Island = 0;
	this.Score = 0;
	this.Description = "";
}

var myself = new Player("myself");
myself.title = "Me";
myself.Colony = countOcc(myColS);
myself.Province = countOcc(myProvS);
myself.Duchy = countOcc(myDuchyS);
myself.Estate = countOcc(myEstateS)+3;
myself.Duke = countOcc(myDukeS);
myself.VP = countOcc(myVpS);
myself.Curse = countOcc(myCurseS);
myself.Harem = countOcc(myHaremS);
myself.Noble = countOcc(myNobleS);
myself.Island = countOcc(myIslandS);

myself.Score = CalcScores(myself);
myself.Description = TextDescription(myself);

var other = new Player("other");
other.title = "Them";
other.Colony = countOcc(thColS);
other.Province = countOcc(thProvS);
other.Duchy = countOcc(thDuchyS);
other.Estate = countOcc(thEstateS)+3;
other.Duke = countOcc(thDukeS);
other.VP = countOcc(thVpS);
other.Curse = countOcc(thCurseS);
other.Harem = countOcc(thHaremS);
other.Noble = countOcc(thNobleS);
other.Island = countOcc(thIslandS);

other.Score = CalcScores(other);
other.Description = TextDescription(other);

alert(myself.Description + "\n" + other.Description);
}