// ==UserScript==
// @name           man mobile's PuzzleHelper
// @description    Records configuration of the mysterious puzzle
// @include        http://www.metroplexity.com/*
// ==/UserScript==

function getCharName() {
	var charName="";

	var upNods = document.evaluate(
			'.//a[@target="main" and @href="charsheet.php"]',
			document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null
	);
	var j;

	for ( j = 0; j < upNods.snapshotLength; j++ ) {
		var pNod        = upNods.snapshotItem(j);
		return (pNod.innerHTML);
	};
	return "default";
}

var charName = GM_getValue("currentCharName", "default");
if (window.location.href.indexOf("character.php") != -1) {
	charName = getCharName();
	GM_setValue("currentCharName", charName);
}


var dusts = {};
dusts["organic"]   = "Organic dust (2 Body, ~3 energy, 25 energy of Living Blood)";
dusts["stimulant"] = "Stimulant dust (2 Body, 8 - 10 energy, 25 energy of Sparkling Blood)";
dusts["acidic"]    = "Acidic dust (2 Body, 3 energy, 25 energy of Acidic Blood)";
dusts["crystal"]   = "Crystal dust (2 Body, 3 - 4 energy, 25 energy of Crystal Blood)";
dusts["eyedrop"]   = "Eyedrop dust (2 Body, 20 energy of Clear Eyes, 20 energy of puzzle-sight";
dusts["memory"]    = "Ashes of memory (3 Body, 10 XP in Reflexes)";
dusts["red"]       = "*Red dust (3 Hunger, 11 energy, 20 energy of Ancient Resilience)";

var tmp = {}
tmp["Stop and listen"]         = "Gain 10 energy of Music of the Cube (+20% Reflexes)";
tmp["Stare into the eye"]      = "Gain 10 energy of Puzzle's Gaze (+20% Perception)";
tmp["Read the tablet"]         = "Gain 10 energy of Runic Puzzle (+20% Will)";
tmp["Pull apart the segments"] = "Gain 10 energy of Black Metal Strength (+20% Strength)";
tmp["Leave it be"]  = "Leave"
tmp["No"]           = "Leave"
 
var pos = {}
pos[-999] = "XX";
var data = eval(GM_getValue(charName + ".data", tmp))
var positions = eval(GM_getValue(charName + ".posit", pos))
var lastchoice = GM_getValue(charName + ".lastchoice")
var lastid =GM_getValue(charName + ".lastid")
var lastimage =GM_getValue(charName + ".lastimage")

// always reset grind data
data["Agar powder"]         = dusts["organic"];
data["Black spores"]        = dusts["organic"];
data["Caffeine powder"]     = dusts["stimulant"];
data["Cut nova"]            = dusts["stimulant"];
data["Dehydrated eyedrops"] = dusts["eyedrop"];
data["Hound dust"]          = dusts["crystal"];
data["Metallic powder"]     = dusts["crystal"];
data["Mottled crystals"]    = dusts["acidic"];
data["Nova"]                = dusts["stimulant"];
data["Processed sugar"]     = dusts["organic"];
data["Shaman's dust"]       = dusts["memory"];
data["Red flakes"]          = dusts["red"];
data["Sparkling Spores"]    = dusts["organic"];
data["Sulfur"]              = dusts["acidic"];
data["White flakes"]        = dusts["acidic"];
data["Tiny squid eyes"]     = dusts["organic"];
data["Rinsed squid eyes"]   = dusts["organic"];
data["Toxical squid eyes"]  = dusts["organic"];

var mesg = {}

mesg["all it seems to do is turn back into a cube"] = "No effect (or not yet spaded effect)"
mesg["staring at you like a baleful red eye"] = "Becomes a mysterious puzzle pyramid"
mesg["it folds down into a strange prism or rod"] = "Becomes a mysterious puzzle rod"
mesg["it hinges open and folds out into a tablet"] = "Becomes a mysterious puzzle tablet"
mesg["you start to sway along"] = "Gain 10 energy of Music of the Cube (+20% Reflexes)"
mesg["red glow within the cube grows more pronounced"] = "Allows 5 more uses of Puzzle's Gaze (Pyramid buff)"
mesg["faint red glow seeps through the cracks in the puzzle box"] = "Unlocks 5 uses of Puzzle's Gaze (Pyramid buff)"
mesg["A tiny section of black metal"] = "Powder Pouring chamber"
mesg["The gemstone eye glares at you"] = "No effect (or not yet spaded effect)"
mesg["turn the pyramid back into its original form"] = "Becomes a mysterious puzzle box"
mesg["methodically folding the pyramid into a long prism"] = "Becomes a mysterious puzzle rod"
mesg["creating a flat tablet"] = "Becomes a mysterious puzzle tablet"
mesg["your vision is completely consumed by red light"] = "Gain 10 energy of Puzzle's Gaze (+20% Perception)"
mesg["The runes slide into a different configuration."] = "??? (unknown effect)"
mesg["at the base of the pyramid"] = "Chamber with red flakes (1/day)"
mesg["Eventually your muscles and your brain both give up"] = "No effect (or not yet spaded effect)"
mesg["it collapses back into its original shape"] = "Becomes a mysterious puzzle box"
mesg["you find a gem hidden among the many moving pieces"] = "Becomes a mysterious puzzle pyramid"
mesg["letting you roll the prism out into a strange tablet"] = "Becomes a mysterious puzzle tablet"
mesg["a crackle of energy"] = "Gain 10 energy of Black Metal Strength (+20% Strength)"
mesg["a clink from somewhere within the rod"] = "Unlocks 5 uses of Music of the Cube (Box buff)"
mesg["the more metallic tinks you can hear"] = "Allows 5 more uses of Music of the Cube (Box buff)"
mesg["grinding"] = "Grinds powder"
mesg["you can't find anyway to turn it into anything but a tablet"] = "No effect (or not yet spaded effect)"
mesg["returning the box to its original shape"] = "Becomes a mysterious puzzle box"
mesg["you fold in the rest of the pyramid underneath it"] = "Becomes a mysterious puzzle pyramid"
mesg["you realize the tablet has segmented enough to roll it into a prism"] = "Becomes a mysterious puzzle rod"
mesg["an inner strength you weren't aware you had"] = "Gain 10 energy of Runic Puzzle (+20% Will)"
mesg["several segments of the tablet seperate"] = "Unlocks 5 uses of Black Metal Strength (Rod buff)"
mesg["allowing the segments to separate further"] = "Allows 5 more uses of Black Metal Strength (Rod buff)"
mesg["Sounds like a small plate moved a short distance within the box"] = "Switches lock positions (currently in powder pouring position)"
mesg["Sounds like that plate slid back to its original position"] = "Switches lock positions (currently in red flakes position)"





function resetInfo() {
    GM_deleteValue(charName + ".data")
    GM_deleteValue(charName + ".posit")
    GM_deleteValue(charName + ".lastchoice")
    GM_deleteValue(charName + ".lastid")
    alert("Information reset.")
}

function choiceclick(e) {
    lastchoice=val[this.id]
    lastid = this.id
    lastimage = document.getElementsByTagName("img")[0].src
    GM_setValue(charName + ".lastchoice", lastchoice)
    GM_setValue(charName + ".lastid", lastid)
    GM_setValue(charName + ".lastimage", lastimage)
    }


if ((window.location.href) == "http://www.metroplexity.com/accountpref.php") {
    newspan = document.createElement("span")
    newspan.innerHTML='</br> <hr> </br> <b> man mobile\'s PuzzleHelper Options </b> </br> Use this to reset the script\'s information about your puzzle configuration. You should reset this information after you reset your character as your mysterious puzzle configuration will have changed. </br> <button type="button" id="resetbutton"> Reset Information </button> </br> </br>'
    document.getElementsByName("change")[0].parentNode.insertBefore(newspan, document.getElementsByName("change")[0].nextSibling);

    document.getElementById('resetbutton').addEventListener('click', resetInfo, false);
}

var pic = document.getElementsByTagName("img");
if(pic[0]) {
    var ps = pic[0].src;
    var isPuzzleBox = (ps.indexOf("Puzzle-Box-100.jpg") != -1);
    var isPuzzleRod = (ps.indexOf("Puzzle-Rod.jpg") != -1);
    var isPuzzleTablet = (ps.indexOf("Puzzle-Tablet.jpg") != -1);
    var isPuzzlePyramid = (ps.indexOf("Gemmed-Puzzle-Box.jpg") != -1);
    if(isPuzzleBox || isPuzzleRod || isPuzzleTablet || isPuzzlePyramid)
    {
        var choices = document.getElementsByName("submit");
        var val = new Array();
        for (var i = 0; i < choices.length; ++i) {
            if(choices[i].value=="Rotate the top") {
                    if(isPuzzleBox) val[i] = "Rotate the topB";
                    else if (isPuzzlePyramid) val[i] = "Rotate the topP";
            }
            else val[i] = choices[i].value;
            choices[i].id=i;
            var txt = data[val[i]];
            
            if(txt == undefined) {
                txt = "unknown";
                if(positions[i] != undefined) {
                    if(positions[i] == 7) txt = "No effect (or not yet spaded effect)"
                    if(positions[i] == 1) {
                        if(isPuzzlePyramid) txt = "Becomes a mysterious puzzle box";
                        if(isPuzzleBox) txt = "Becomes a mysterious puzzle pyramid";
                    }
                    if(positions[i] == 2) {
                        if(isPuzzleRod) txt = "Becomes a mysterious puzzle box";
                        if(isPuzzleBox) txt = "Becomes a mysterious puzzle rod";
                    }
                    if(positions[i] == 3) {
                        if(isPuzzleTablet) txt = "Becomes a mysterious puzzle box";
                        if(isPuzzleBox) txt = "Becomes a mysterious puzzle tablet";
                    }
                    if(positions[i] == 4) {
                        if(isPuzzlePyramid) txt = "Becomes a mysterious puzzle rod";
                        if(isPuzzleRod) txt = "Becomes a mysterious puzzle pyramid";
                    }
                    if(positions[i] == 5) {
                        if(isPuzzlePyramid) txt = "Becomes a mysterious puzzle tablet";
                        if(isPuzzleTablet) txt = "Becomes a mysterious puzzle pyramid";
                    }
                    if(positions[i] == 6) {
                        if(isPuzzleRod) txt = "Becomes a mysterious puzzle tablet";
                        if(isPuzzleTablet) txt = "Becomes a mysterious puzzle rod";
                    }
                }
               
            }
            if(choices[i].value != "Continue On" && choices[i].value != "Back to the Streets") {
                newElement = document.createTextNode(" -- "+txt)
                choices[i].parentNode.insertBefore(newElement, choices[i].nextSibling)
                choices[i].addEventListener('click', choiceclick, false)
            
            }
        }
        if ((window.location.href) == "http://www.metroplexity.com/location.php") {
            for(asdf in mesg) {
                if(asdf != "each" && document.body.innerHTML.indexOf(asdf) != -1 && lastchoice!="Leave it be") {
                    if(lastchoice == "Rotate the top") {
                        if(lastimage == "http://www.metroplexity.com/images/Puzzle-Box-100.jpg") lastchoice = "Rotate the topB"
                        else if(lastimage == "http://www.metroplexity.com/images/Gemmed-Puzzle-Box.jpg") lastchoice = "Rotate the topP"
                    }
                    data[lastchoice] = mesg[asdf]
                    
                    GM_setValue(charName + ".data", uneval(data))
                    if(mesg[asdf] == "No effect (or not yet spaded effect)") { positions[lastid] = 7 }
		    var ih = document.body.innerHTML;
		    // if the move switches form, determine which pairing of forms it is
                    if(ih.indexOf('desc("?i=650-mysterious puzzle box")') != -1) {
                        if(isPuzzlePyramid) { positions[lastid] = 1 };
                        if(isPuzzleRod) { positions[lastid] = 2 };
                        if(isPuzzleTablet) { positions[lastid] = 3 };
                    }
                    if(ih.indexOf('desc("?i=653-mysterious puzzle pyramid")') != -1) {
                        if(isPuzzleRod) { positions[lastid] = 4 };
                        if(isPuzzleTablet) { positions[lastid] = 5 };
                        if(isPuzzleBox) { positions[lastid] = 1 };
                    }
                    if(ih.indexOf('desc("?i=651-mysterious puzzle rod")') != -1) {
                        if(isPuzzleTablet) { positions[lastid] = 6 };
                        if(isPuzzleBox) { positions[lastid] = 2 };
                        if(isPuzzlePyramid) { positions[lastid] = 4 };
                    }
                    if(ih.indexOf('desc("?i=652-mysterious puzzle tablet")') != -1) {
                        if(isPuzzleRod) { positions[lastid] = 6 };
                        if(isPuzzleBox) { positions[lastid] = 3 };
                        if(isPuzzlePyramid) { positions[lastid] = 5 };
                    }
                    GM_setValue(charName + ".posit", uneval(positions))
                } // != each, != -1,  != Leave it be
            } // for asdf in mesg
        } // location
    } // know pic[0]
    

    
} // pic[0]

