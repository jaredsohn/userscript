// ==UserScript==
// @name      Calling a Spade a Spade
// @version	1.0
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

  replacements = { 
    "President George W. Bush": "Lord Voldemort",
    "President George Bush": "Lord Voldemort",
    "President Bush": "Lord Voldemort",
    "Mr. President": "Voldemort",
    "Dubya": "Voldemort",
    "George W. Bush": "Voldemort",
    "George Walker Bush": "Voldemort",
    "George Bush": "Voldemort",
    "President Voldemort": "Lord Voldemort",
    "Mr. Bush": "Lord Voldemort",
    "Bush": "Voldemort",
    "Vice President Dick Cheney": "The Dark Lord of Mordor",
    "Vice President Cheney": "The Dark Lord of Mordor",
    "Richard Bruce Cheney": "Sauron",
    "Vice President Richard Bruce Cheney": "The Dark Lord of Mordor",
    "Dick Cheney": "Sauron",
    "Cheney": "Sauron",
    "VP Cheney": "Sauron",
    "No Child Left Behind": "Every Child Left Behind",
    "NCLB": "Death of the Public Schools",
    "abortion opponent": "misogynist",
    "Abortion opponent": "Misogynist",
    "Abortion Opponent": "Misogynist",
    "Lieberman": "Warmonger",
    "Pro-life": "Anti-choice",
    "Pro life": "Anti-choice",
    "pro-life": "anti-choice",
    "pro life": "anti-choice",
    "republican": "fascist",
    "Republican": "Fascist",
    "conservative": "fascist",
    "Conservative": "Fascist",
    "War in Iraq": "Civil War in Iraq",
    "insurgents": "insurgents",
    "insurgent": "insurgent",
    "Insurgents": "Insurgents",
    "Insurgent": "Insurgent",
    "surge": "death of more troops",
    "Surge": "Death of More Troops",
    "Firefox": "Firefox",
    "firefox": "firefox",
    "Fox News": "Faux Propaganda",
    "FoxNews": "FauxPropaganda",
    "FOXNews": "Faux Propaganda",
    "FOX": "FAUX",
    "Press Secretary": "Propaganda Minister",
    "Press secretary": "Propaganda Minister",
    "press secretary": "Propaganda Minister",
    "press briefing": "Propaganda briefing",
    "Press briefing": "Propaganda briefing",
    "Press Briefing": "Propaganda Briefing",
    "White House Spokeswoman": "Assistant Propaganda Minister",
    "White House spokeswoman": "Assistant Propaganda Minister",
    "insists on a surrender date, handcuffs our generals and contains billions of dollars in spending unrelated to the war": "because it would save the lives of U.S. troops",
    "White House": "Jail House",
    "White House officials": "Jail House criminals",
    "National Riffle Association": "National Death Association",
    "NRA": "National Death Association",
    "John McCain": "John Flipfloper Warmonger Condoms Don't Prevent AIDS McCain",
    "NRA": "National Death Association",
    "Impeachment": "Justice",
    "impeachment": "justice",
    "Department of Defense": "Department of War",
    "Secretary of Defense": "Secretary of War",
    "Defense Department": "War Department",
    "Department of Justice": "Department of Oppression",
    "Justice Department": "Oppression Department",
    "impeachment": "justice",
    "fight identity theft": "suppress the black vote",
    "Fight Identity Theft": "Suppress the Black Vote",
    "Signing Statement": "Royal Decree",
    "Signing statement": "Royal decree",
    "signing statement": "royal decree",
    "President's Statement on Signing of": "Lord Voldemort's Royal Decree disregarding",
    "President's statement on signing of": "Lord Voldemort's royal decree disregarding",
    "President's Statement on": "Lord Voldemort's royal decree disregarding",
    "President's statement on": "Lord Voldemort's royal decree disregarding",
    "a troop buildup": "the death of more troops",
    "troop buildup": "the death of more troops",
    "Troop Buildup": "The Death of More Troops",
    "A Troop Buildup": "The Death of More Troops",
    "A troop buildup": "The death of more troops",
    "contains a timetable for withdrawal of U.S. troops": "saves the lives of U.S. troops",
    "R-": "F-",
    "Homeland Security": "Fascist Government Surveillance",
    "Identity Theft Task Force": "Voter Suppression Task Force, which will work to disenfranchise voters, ",
    "God": "the Flying Spaghetti Monster",
    "Intelligent Design": "Creationalism"};


regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();