// ==UserScript==
// @name        Warlocks Spell Monitor
// @namespace   http://userscripts.org/users/nomoon
// @include     http://games.ravenblack.net/warlocks?*
// @version     1.4
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

// Here is a stable mergesort so that we can sort by multiple properties in all
// browsers without fucking shit up.
(function() {

  // expose to Array and jQuery
  Array.prototype.msort = jQuery.fn.msort = msort;

  function msort(compare) {

    var length = this.length,
        middle = Math.floor(length / 2);

    if (!compare) {
      compare = function(left, right) {
        if (left < right) 
          return -1;
        if (left == right)
          return 0;
        else
          return 1;
      };
    }

    if (length < 2)
      return this;

    return merge(
      this.slice(0, middle).msort(compare),
      this.slice(middle, length).msort(compare),
      compare
    );
  }

  function merge(left, right, compare) {

    var result = [];

    while (left.length > 0 || right.length > 0) {
      if (left.length > 0 && right.length > 0) {
        if (compare(left[0], right[0]) <= 0) {
          result.push(left[0]);
          left = left.slice(1);
        }
        else {
          result.push(right[0]);
          right = right.slice(1);
        }
      }
      else if (left.length > 0) {
        result.push(left[0]);
        left = left.slice(1);
      }
      else if (right.length > 0) {
        result.push(right[0]);
        right = right.slice(1);
      }
    }
    return result;
  }
})();

var spells = [
    [">", "Stab"],
    ["cDPW", "Dispel Magic"],
    ["cSWWS", "Summon Ice Elemental"],
    ["cWSSW", "Summon Fire Elemental"],
    ["cw", "Magic Mirror"],
    ["DFFDD", "Lightning Bolt"],
    ["DFPW", "Cure Heavy Wounds"],
    ["DFW", "Cure Light Wounds"],
    ["DFWFd", "Blindness"],
    ["DPP", "Amnesia"],
    ["DSF", "Confusion/Maladroitness"],
    ["DSFFFc", "Disease"],
    ["DWFFd", "Blindness"],
    ["DWSSSP", "Delay Effect"],
    ["DWWFWD", "Poison"],
    ["FPSFW", "Summon Troll"],
    ["FSSDD", "Fireball"],
    ["P", "Shield"],
    ["PDWP", "Remove Enchantment"],
    ["PPws", "Invisibility"],
    ["PSDD", "Charm Monster"],
    ["PSDF", "Charm Person"],
    ["PSFW", "Summon Ogre"],
    ["PWPFSSSD", "Finger of Death"],
    ["PWPWWc", "Haste"],
    ["SD", "Magic Missile"],
    ["SFW", "Summon Goblin"],
    ["SPFP", "Anti-spell"],
    ["SPFPSDW", "Permanency"],
    ["SPPc", "Time Stop"],
    ["SPPFD", "Time Stop"],
    ["SSFP", "Resist Cold"],
    ["SWD", "Fear (No CFDS)"],
    ["SWWc", "Fire Storm"],
    ["WDDc", "+ Clap of Lightning"],
    ["WFP", "Cause Light Wounds"],
    ["WFPSFW", "Summon Giant"],
    ["WPFD", "Cause Heavy Wounds"],
    ["WPP", "Counter Spell"],
    ["WSSc", "Ice Storm"],
    ["WWFP", "Resist Heat"],
    ["WWP", "Protection"],
    ["WWS", "Counter Spell"]
];

var bodyText = $("body").text();

//Add the proper Paralysis spell per game type.
if($("h2").text().match("(ParaFDF)")){
    spells.push(["FDF", "Paralysis"]);
}else{
    spells.push(["FFF", "Paralysis"]);
} 

//Get gesture information.
var chunks = $("font.monoturn").map(function(){
    return $(this).text().replace(/[\s\d]/gi, '');
});

var opLH = chunks[2],
    opRH = chunks[4],
    meLH = chunks[7],
    meRH = chunks[9];

//Add gestures that you've submitted on this turn if waiting.
var waitingOrders = bodyText.match(/Your orders are in for this turn\.[^\:]*\:\s*([cdfpsw\>])[^\:]*\:\s*([cdfpsw\>])/i);
if (waitingOrders){
    if(waitingOrders[1] !== "X"){
        meLH += waitingOrders[1];
    }else{
        meLH += waitingOrders[2];
    }
    if(waitingOrders[2] !== "X"){
        meRH += waitingOrders[2];
    }else{
        meRH += waitingOrders[1];
    }
}

opLH = prepHandStr(opLH);
opRH = prepHandStr(opRH);
meLH = prepHandStr(meLH);
meRH = prepHandStr(meRH);

//Comparison functions for sorting spells.
var spellComplComp = function(a, b){
    if (a[3] > b[3]){
        return -1;
    } else if (a[3] == b[3]){
        return 0;
    }else{
        return 1;
    }
};

var spellLengthComp = function(a, b){
    if (a[0].length < b[0]){
        return -1;
    } else if (a[0] == b[0]){
        return 0;
    }else{
        return 1;
    }
};

var spellTurnComp = function(a, b){
    if (a[2] < b[2]){
        return -1;
    } else if (a[2] == b[2]){
        return 0;
    }else{
        return 1;
    }
};

var spellGestureComp = function(a, b){
    if (a[0] > b[0]){
        return -1;
    } else if (a[0] == b[0]){
        return 0;
    }else{
        return 1;
    }
};

//De-duplicate list of upcoming spells

function deduplicateArray(spells){
    var existingSpells = {}, outArray = [];
    for(var i = 0; i < spells.length; i++){
        if(!existingSpells.hasOwnProperty(spells[i][0])) {
            outArray.push(spells[i]);
            existingSpells[spells[i][0]] = true;
        }
    }
    return outArray;
}

function sortSpellList(list){
  return list.msort(spellGestureComp).msort(spellLengthComp).msort(spellComplComp).msort(spellTurnComp);
}

function prepHandStr(hand){
    //Remove whitespace
    hand = hand.replace(/[\s]*/i,"");
    //Remove bowing.
    hand = hand.replace(/^b/i,"");
    //Clear everything before antispell
    hand = hand.replace(/.*\-/i,"");
    //Turn "X" from Maladroit into last gesture.
    hand = hand.replace(/(.)X/i,"$1$1");
    return hand;
}

function matchSpell(gesture){

    //Match gestures exactly.
    var gestureMatch = new RegExp("^" + gesture.replace(/\?/g,"."));
    //Allows two-hand gestures to match one-hand spells.
    var gestureMatchU = new RegExp("^" + gesture.replace(/\?/g,".").toUpperCase());
    return spells.filter(function(e, i, a){
        if (gesture === "" || e[0].match(gestureMatch) || e[0].match(gestureMatchU)){
            return true;
        } else {
            return false;
        }         
    }).map(function(e, i, a){
        var turnsLeft = e[0].length - gesture.length;
        return [e[0], e[1], turnsLeft, (gesture.length / e[0].length)];
    });
}

function mungeHands(left, right){
    if (left.length !== right.length){
        return false;
    }
    var lh = left.split("");
    var rh = right.split("");
    for (var i = 0; i < lh.length; i++){
        if (lh[i] === rh[i]){
            lh[i] = lh[i].toLowerCase();
            rh[i] = rh[i].toLowerCase();
        }
    }
    return [lh.join(""), rh.join("")];
}

function scanHand(hand, minSpellLength){
    var results = [];
    for(var i = -1; i > -8; i--){
        results = results.concat(matchSpell(hand.slice(i)));
        if (Math.abs(i) > hand.length){
            break;
        }
    }

    results = results.filter(function(e, i, a){
        return (e[2] >= minSpellLength);
    });

    //Sort by turns left, completion (stable), then Length
    results = sortSpellList(results);

    results.push(["-", "-", 0, 0.0]);

    results = results.concat(sortSpellList(matchSpell("")));

    results = deduplicateArray(results);

    return formatSpells(results);
}

function formatSpell(spell, percent){
    var length = Math.round(spell.length * percent);
    return "<u>" +  spell.substr(0, length) + "</u>" + spell.substr(length);
}

function formatSpells(array){
    return array.map(function(e, i, a){
        if (e[0] !== "-"){
          return "<i>(" + e[2] + ")</i> <b>"+ formatSpell(e[0], e[3]) +"</b> " + e[1] + " <i>(" + Math.round(e[3] * 100) + "%)</i>";
        }else{
          return "<br><hr>";
        }
    });
}

function scanPlayer(player){
    var minSpellLength = 1;
    if (player === "me") {
        mungedHand = (mungeHands(meLH, meRH));
    } else if (player == "op") {
        mungedHand = (mungeHands(opLH, opRH));
    } else {
        return false;
    } 
    //Don't filter out already-cast spells for me if waiting for a turn.
    if(waitingOrders && player === "me"){
        minSpellLength = 0;
    }
    return { lh: scanHand(mungedHand[0], minSpellLength),
             rh: scanHand(mungedHand[1], minSpellLength) };
}

var op = scanPlayer("op");
var me = scanPlayer("me");
var names = $("td.lightbg a").slice(-2);

var table = "<table>\n"
table += "<tr><th colspan=\"2\"><h2 id=\"op_name\">Op</h2><th>&nbsp;</th><th colspan=\"2\"><h2 id=\"me_name\">Me</h2></th></tr>\n";
table += "<tr class=\"lightbg\"><th><h2>LH</h2></th><th><h2>RH</h2></th><th>&nbsp;</th><th><h2>LH</h2></th><th><h2>RH</h2></th></tr>\n";
table += "<tr class=\"lightbg\" style=\"text-align: center;\"><td id=\"op_lhG\"></td><td id=\"op_rhG\"></td><td>&nbsp;</td><td id=\"me_lhG\"></td><td id=\"me_rhG\"></td></tr>\n";
table += "<tr>\n";
table += "<td id=\"op_lhP\" valign=\"top\"></td><td id=\"op_rhP\" valign=\"top\"></td>\n";
table += "<th>&nbsp;&nbsp;&nbsp;</th>\n";
table += "<td id=\"me_lhP\" valign=\"top\"></td><td id=\"me_rhP\" valign=\"top\"></td>\n";
table += "</tr>\n";
//table += "<tr><th colspan=\"3\">&nbsp;</th><td colspan=\"2\" id=\"spell_list\"></td></tr>\n";
table += "</table>";

$("body").append(table);
$("#op_name").html(names[0].text);
$("#me_name").html(names[1].text);
$("#op_lhG").html("(…" + opLH.substr(-7) + ")");
$("#op_rhG").html("(…" + opRH.substr(-7) + ")");
$("#me_lhG").html("(…" + meLH.substr(-7) + ")");
$("#me_rhG").html("(…" + meRH.substr(-7) + ")");
$("#op_lhP").append(op["lh"].join("<br>\n"));
$("#op_rhP").append(op["rh"].join("<br>\n"));
$("#me_lhP").append(me["lh"].join("<br>\n"));
$("#me_rhP").append(me["rh"].join("<br>\n"));
//$("#spell_list").append(formatSpells(matchSpell("").msort(spellLengthComp).msort(spellComplComp).msort(spellTurnComp)).join("<br>\n"));
