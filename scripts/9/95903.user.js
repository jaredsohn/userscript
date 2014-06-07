// ==UserScript==
// @name           BvS_FAIL_Oracle
// @namespace      SirDuck36
// @description    Ask the Oracle for advice during a game of SUPERFAIL
// @include        http://*animecubed.com/billy/bvs/partyhouse-superfail*
// ==/UserScript==

var strList = [
    "Memes", "The Oracle declares victory.",
    "Pancakes", "The Oracle recommends pancakes be served hot, with butter and a small amount of syrup.",
    "being an Oracle", "The Oracle recommends that you just make crap up when people ask you things.",
    "Trombones", "The Oracle reminds you that Troms only have cartilage, no bones.",
    "Badges", "The Oracle needs no stinking badges.",
    "SUPERFAIL", "The Oracle is in the share.  Please do not join the Oracle.",
    "Plates Vs. Platters", "The Oracle doesn't understand the question, and won't respond to it.",
    "Bananas", "Hey Mr. Oracle, Oracle me banana...",
    "Cheating", "The Oracle is ashamed that you would even ask such a thing.",
    "Fortune Cookies", "Help me! I have been captured and forced to answer questions nobody actually asked!",
    "Sandwiches", "Reuben on rye, half sauerkraut, extra dressing.  No pickle on the side, what is the oracle, a barbarian?",
    "Movies", "The Oracle recommends anything which doesn't contain Paulie Shore.",
    "Oracles", "The Oracle loves Oracles.  Oracles.  Oracles.  It doesn't even sound like a word anymore does it?  Oracles.",
    "Ralph Fiennes",  "If you want to be called \"Ray\", spell your name like \"Ray\".",
    "The Baldwins", "The Oracle believes the Baldwins may be taking over Washington with great hair.  Be advised.",
    "Apples", "Rhymes with dapples.",
    "Stonehenge", "The Oracle did not build Stonehenge.  His brother Tito did.",
    "Mister Tea", "He pities the fool who sides with Strawberry.",
    "TACOs", "The oracle only believes in consumables that end in \"Ultra Potion\".",
    "Seafood", "The Oracle asks why you would eat it if you COULDN'T see it?",
    "Squirrels", "The Oracle does not believe in vegetables.",
    "BvS", "When is houses coming out? +5 drama XP, -2 cool.",
    "Billycon", "The Oracle STRONGLY RECOMMENDS you attend Learn 2 Laundry. STRONGLY.",
    "The Battle", "If knowledge is half the battle, and you never know, you're pretty much screwed.",
    "The RNG", "Stop whining and start weighting the dice.",
    "RNG", "Actually refers to the power RaNGers.  Now you feel silly for getting all upset, huh?",
    "RNG", "The Oracle reminds you that score would have been AWESOME in golf.",
    "Stalkergirl", "... ... (The Oracle appears distracted.)",
    "Mr. Sandman", "... ... (The Oracle appears distracted.)",
    "The Flash", "The Oracle does not like visiting *anyone* in \"the pan\".",
    "bats with GIANT BUG EYES!", "Where?!? O_O",
    "Burritos", "The Oracle prefers Enchiladas.",
    "Enchiladas", "The Oracle prefers Burritos.",
    "Airline Travel", "The Oracle giggles, and checks your bag for a nominal fee.",
    "The Axiom of Choice", "The Oracle will choose its own axiom, tyvm.",
    "Linear Algebra", "The Oracle invites you into the 12th dimension...<br> and ATTACKS from [-1 7 9 -3 5 -2 0.3 11 5 2 -6.7 9 9 3].",
    "Topology", "The Oracle has been advised not to respond to talking donuts.",
    "Calculus", "The Oracle sends epsilon to zero... and you converge!",
    "Algebra", "The Oracle takes away your number system... for your own safety.",
    "Differential Geometry", "The Oracle mumbles something unintelligible about the pullback of a skew-symmetric covariant tensor field.",
    "Kangaroos", "Don't exist.",
    "Ice Cream", "Doesn't exist.",
    "Themes", "The Oracle prefers the Calling theme.",
    "The Future", "The Oracle sees the future, and it's getting better, all the time.",
    "Tech Support", "Did you try switching it on and off again?",
    "Losing", "The Oracle feels you do not require further assistance at this time.",
    "Hot Chocolate", "Once, the Oracle left a candy bar on the dashboard.",
    "Cereal", "Silly Oracle, advice is for kids.",
    "Waffles", "Waffles make an odd hat.",
    "Pizza", "The Oracle wonders... if a pepperoni pizza has pepperoni on it, what does a vegetarian pizza have on it?",
    "Your Mother", "Please do not hate the Oracle.",

    "Mathematicians", "The Oracle believes mathematicians wish they were Oracles.",
    "Physicists", "The Oracle believes physicists wish they were mathematicians.",
    "Chemists", "The Oracle believes chemists wish wish they were physicists.",
    "Biologists", "The Oracle believes biologists wish they were chemists.",
    "Psychologists", "The Oracle believes psychologists wish they were biologists.",
    "Anthropologists", "The Oracle believes anthropologists wish they were psychologists.",
    
    "David Hilbert", '(1862-1943) Prussia, Germany<br><br>' +
    'Hilbert was preeminent in many fields of mathematics, including axiomatic theory, invariant theory, algebraic number theory, class field theory and functional analysis. His examination of calculus led him to the invention of "Hilbert space," considered one of the key concepts of functional analysis and modern mathematical physics. He was a founder of fields like metamathematics and modern logic. He was also the founder of the "Formalist" school which opposed the "Intuitionism" of Kronecker and Brouwer. He developed a new system of definitions and axioms for geometry, replacing the 2200 year-old system of Euclid. As a young Professor he proved his "Finiteness Theorem," now regarded as one of the most important results of general algebra. The methods he used were so novel that, at first, the "Finiteness Theorem" was rejected for publication as being "theology" rather than mathematics! In number theory, he proved Waring\'s famous conjecture which is now known as the Hilbert-Waring theorem.<br><br>' +
    'Any one man can only do so much, so the greatest mathematicians should help nurture their colleagues. Hilbert provided a famous List of 23 Unsolved Problems, which inspired and directed the development of 20th-century mathematics. Hilbert was warmly regarded by his colleagues and students, and contributed to the careers of several great mathematicians and physicists including Georg Cantor, Hermann Minkowski, Hermann Weyl, John von Neumann, Emmy Noether, Alonzo Church, and Albert Einstein.<br><br>' +
    'Eventually Hilbert turned to physics and made key contributions to classical and quantum physics and to general relativity. He may have published the "Einstein Field Equations" independently of Einstein. (Since he had already learned of the theory\'s intuition from personal lectures by Einstein, it is wrong, as some do, to claim Hilbert\'s publication diminishes Einstein\'s greatness.)<br><br>' +
    '<a href="http://fabpedigree.com/james/mathmen.htm#Hilbert" target="_blank">(source)</a>'
];


// Insert the oracle's reply
function funOracleReply(indCookie)
{
    var newDiv = document.getElementById("OracleDiv");
    newDiv.innerHTML += "<b>" + strList[indCookie*2+1] + "</b><br><br>";
}


// Page load runtime
var elem = document.evaluate("//form[@name='scoredice']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (elem)
{
    var numCookies = strList.length/2;
    var indCookie = Math.floor(numCookies * Math.random());

    var newDiv = document.createElement("div");
    newDiv.id = "OracleDiv";	
    newDiv.style.width = 500;
    newDiv.style.color = "#ffff00";
    
    newDiv.innerHTML = 
	'<b><a href="javascript:void(0)" id="AskOracleButton" style="color:white">'+
	'Get Advice: Ask the Oracle about ' + strList[indCookie*2] + ' &gt;</a></b><br><br>';

    if (indCookie == 0)
    {
	// Set link for Meme case
	newDiv.innerHTML = 
	    '<b><a href="http://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" id="AskOracleButton" style="color:white">'+
	    'Get Advice: Ask the Oracle about ' + strList[indCookie*2] + ' &gt;</a></b><br><br>';
    }

    elem.parentNode.insertBefore(newDiv, elem);

    document.getElementById("AskOracleButton").addEventListener("click", function() {funOracleReply(indCookie)}, true);
}
