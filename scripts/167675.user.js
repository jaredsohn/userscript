// ==UserScript==
// @name       Anglophile
// @version    0.2
// @description  Traslates all text into British English
// @match      http://*/*
// @match      https://*/*
// @copyright  2013, Wynne Plaga(krimin_killr21)
// @updateURL   https://userscripts.org/scripts/source/167675.meta.js
// @installURL  https://userscripts.org/scripts/source/167675.user.js
// @downloadURL https://userscripts.org/scripts/source/167675.user.js
// ==/UserScript==

var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    function(node) {
        var matches = node.textContent.match("i");
        
        if(matches) { 
            return NodeFilter.FILTER_ACCEPT;
        } else {
            return NodeFilter.FILTER_SKIP;
        }
    },
    false);

var nodes = [];

while(walker.nextNode()) {
    nodes.push(walker.currentNode);
}

var changes = [];
var changes1 = [];
var changes2 = [];

function cfl(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function add(current, toAdd){
    changes.push(current);
    changes.push(toAdd);
    changes1.push(cfl(current));
    changes1.push(cfl(toAdd));
    changes2.push(current.toUpperCase());
    changes2.push(toAdd.toUpperCase());
}

add("center", "centre");
add("meter", "metre");
add("favor", "favour");
add("soda", "fizzy drink");
add("aluminum", "aluminium");
add("cart", "trolly");
add("gram", "gramme");
add("grammeme", "gramme");
add("grammememar", "grammar");
add("gasoline", "petrol");
add("gas", "petrol");
add("run for office", "stand for election");
add("running for office", "standing for election");
add("revenue", "turnover");
add("transportation", "transport");
add("highway", "carriageway");
add("expressway", "carriageway");
add("overpass", "flyover");
add("sidewalk", "pavement");
add("transmission", "gearbox");
add("windscreen", "windsheild");
add("counter-clockwise", "anti-clockwise");
add("counterclockwise", "anticlockwise");
add("elevator", "lift");
add("math", "maths");
add("mathsematics", "mathematics");
add("mathss", "maths");
add("color", "colour");
add("chips", "crisps");
add("poker crisps", "poker chips");
add("attorney", "barrister");
add("cookie", "biscut");
add("trunk", "boot");
add("parking lot", "car park");
add("the movies", "the cinema");
add("theater", "theatre");
add("driver's lisence", "driving lisence");
add("lisence", "licence");
add("garbage", "rubbish");
add("trash", "rubbish");
add("rubbish can", "rubbish bin");
add("apartment", "flat");
add("girl scout", "girl guide");
add("boy scout", "boy guide");
add("purse", "handbag");
add("crazy", "mad");
add("insaine", "mad");
add("corn", "maize");
add("motorcycle", "motorbike");
add("diaper", "nappy");
add("pet peeve", "pet hate");
add("mail", "post");
add("bar ", "pub ");
add("bathroom", "toilet");
add("restroom", "toilet");
add("railroad", "railway");
add("eraser", "rubber");
add("wrench", "spanner");
add("candy", "sweets");
add("dish towel", "tea towel");
add("the hospital", "hospital");
add("soccer", "football");
add("fires", "crisps");
add("gray", "grey");
add("epost", "email");
add("gpost", "gmail");
add("drunk driving", "drink driving");
add("honor", "honour");
add(" tire", " tyre");
add("organize", "organise");
add("petrolps", "gasps");
add("programmememing", "programming");
add("maizer", "corner");
add("e-post", "e-mail");
add("noble petrol", "noble gas");
add("honor", "honour");
add("mathsematical", "mathematical");
add("behavior", "behaviour");
add("armor", "armour");
add("petroleous", "gaseous");
add("color", "colour");

var measure = new Array();
measure[0] = [/([0-9,.]+\s+\bfoot)|([0-9,.]+\s+\bfeet)|([0-9,.]+\s+\bft)/igm, 'metres', 0.3048, 1, 10];
measure[1] = [/([0-9,.]+\s+\bmile(s)?)/igm, 'kilometres', 1.609344, 1, 10];

////
////
////
////commas!!!!!!!!!!!!!
////

function compute(String, value, round2, round1){
    var out = parseFloat(String) * value;
    if(out > round1 || out < parseFloat(round1) * -1){
        out = Math.round(out);
    } else if((out > round2 && out <= round1) || (out < parseFloat(round2) * -1 && out >= parseFloat(round1))){
        out = Math.round(out*100)/100;
    } else {
        out = Math.round(out*1000)/1000;
    }
    return out;
}

function convert(inS){
    for(var i = 0; i < measure.length; i++){
        if(inS.match(measure[i][0]) !== null){
            inS = inS.replace(measure[i][0], compute(inS.match(measure[i][0])[0].match(/[0-9,.]/g).toString().replace(/,/g, ""), measure[i][2], measure[i][3], measure[i][4]) + " " + measure[i][1]);
        }
    }
    return inS;
}

for(var i = 0; node=nodes[i] ; i++) {
    if(node.parentNode != null){
        var text = node.parentNode.innerHTML;
        for(var i1 = 0; i1 < changes.length; i1 = i1 + 2){
            text = convert(text.replace(new RegExp(changes[i1], "gm"), changes[i1 + 1]).replace(new RegExp(changes1[i1], "gm"), changes1[i1 + 1]).replace(new RegExp(changes2[i1], "gm"), changes2[i1 + 1]));
        }
        node.parentNode.innerHTML = text;
    }
}

var measure = new Array();
measure[0] = [/([0-9,.]+\s+\bfoot)|([0-9,.]+\s+\bfeet)|([0-9,.]+\s+\bft)/igm, 'metres', 0.3048, 1, 10];
measure[1] = [/([0-9,.]+\s+\bmile(s)?)/igm, 'kilometres', 1.609344, 1, 10];

////
////
////
////commas!!!!!!!!!!!!!
////

function compute(String, value, round2, round1){
    var out = parseFloat(String) * value;
    if(out > round1 || out < parseFloat(round1) * -1){
        out = Math.round(out);
    } else if((out > round2 && out <= round1) || (out < parseFloat(round2) * -1 && out >= parseFloat(round1))){
        out = Math.round(out*100)/100;
    } else {
        out = Math.round(out*1000)/1000;
    }
    return out;
}

function convert(inS){
    for(var i = 0; i < measure.length; i++){
        if(inS.match(measure[i][0]) !== null){
            inS = inS.replace(measure[i][0], compute(inS.match(measure[i][0])[0].match(/[0-9,.]/g).toString().replace(/,/g, ""), measure[i][2], measure[i][3], measure[i][4]) + " " + measure[i][1]);
        }
    }
    return inS;
}

for(var i = 0; node=nodes[i] ; i++) {
    if(node.parentNode != null){
        var text = node.parentNode.innerHTML;
        for(var i1 = 0; i1 < changes.length; i1 = i1 + 2){
            text = convert(text.replace(new RegExp(changes[i1], "gm"), changes[i1 + 1]).replace(new RegExp(changes1[i1], "gm"), changes1[i1 + 1]).replace(new RegExp(changes2[i1], "gm"), changes2[i1 + 1]));
        }
        node.parentNode.innerHTML = text;
    }
}