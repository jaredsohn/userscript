// ==UserScript==
// @name 				Scotsman headline generator
// @namespace 	qwghlm
// @description 	Struggles to be as ridiculous as the ones they DID print.
// @include 	http://www.scotsman.com/*
// ==/UserScript==
// Scotsman headline generator script
// Original Code developed for a Daily Mail headline generator by
// Author: Chris Applegate (www.qwghlm.co.uk) (Crappy Greasemonkey wrapper by EH)
// Version: 1.1 January 7, 2009
// License: GNU GPL v2 or later
// 
// Changelog:
// 
//   1.1 [Jan 2009]
//     - Added past/present tenses
//     - Updated with 2009-relevant terms
//     - Added sarcastic comments to code
//   1.0 [2003]
//     - Original version
// (shamelessly plagiarised by @abigdoob)

// A more random random generator
function getRandom(a) {

	var n = new Array(50);

	for (var i=0; i<n.length; i++) {
		n[i] = Math.random();
	}

	var m = n[Math.floor(Math.random() * n.length)];
	var o = Math.floor(m * a.length);

	return a[o];

}

// Objects for nouns, modifier verbs and phrases
function Verb(plural, singular, tense) {
	this.singular = singular;
	this.plural = plural;
	this.tense = tense;
}

function Noun(word,person,number) {
	this.word = word;
	this.person = person;
	this.number = number;
}

function Phrase(present, past, active, object) {
	this.present = present;
	this.past = past;
	this.active = active;
	this.object = object;
}

// Auxiliary verbs (the first word in the sentence)
auxiliary_verbs = [
	new Verb("will", "will", "present"), 
	new Verb("could", "could", "present"),
	new Verb("are", "is", "active"),
	new Verb("have", "has", "past")
];


// Subjects (i.e. bad things)
subjects = [

	new Noun("SNP",3,1),
	new Noun("separatists",3,1),
	new Noun("the referendum",3,1),
	new Noun("the e.u.",3,1),
	new Noun("the euro",3,1),
	new Noun("the loony nationalist party",3,1),
	new Noun("yes scotland",3,2),       // 
	new Noun("separatism",3,1),
	new Noun("holyrood",3,1),


	new Noun("the separatists",3,2),
	new Noun("holyrood bureaucrats",3,2),
	new Noun("cybernats",3,2),
	new Noun("nats",3,2),        // 
	new Noun("the nats",3,2),
	new Noun("feral nats",3,2),    // 
	new Noun("the separation brigade",3,2),

	
	new Noun("separatists",3,2),    // 
	new Noun("nats",3,2),
	new Noun("separation",3,2),
	

	new Noun("salmond",3,1),
	new Noun("sturgeon",3,1),
	new Noun("swinney",3,1),	
	new Noun("a random nat",3,1),     // 
	
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),    // 
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),             // 
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),
	new Noun("separation",3,1),               // 
	new Noun("separation",3,1),
	new Noun("separation",3,1) // 
];

// Transitive phrases (i.e. bad thing they do)
transitive_phrases = [
	new Phrase("give", "given", "giving", "cancer"),
	new Phrase("give", "given", "giving", "cancer"), // Have it twice as they're so bloody obsessed by it
	new Phrase("infect", "infected", "infecting", "with AIDS"),
	new Phrase("make", "made", "making", "extinct"),
	new Phrase("give", "given", "giving", "the fear"),
	new Phrase("make", "made", "making", "bankrupt"),

	new Phrase("turn","turned","turning","gay"),    // Cunts

	new Phrase("scrounge off","scrounged off","scrounging off",""),
	new Phrase("tax", "taxed", "taxing", ""),
	new Phrase("cheat", "cheated", "cheating", ""),
	new Phrase("defraud", "defrauded", "defrauding", ""),
	new Phrase("steal from","stolen from","stealing from",""),
	new Phrase("bugger","buggered","buggering",""),
	new Phrase("deceive","deceived","deceiving",""),
	new Phrase("rip off","ripped off","ripping off",""),
	
	new Phrase("molest","molested","molesting",""),
	new Phrase("have sex with","had sex with","having sex with",""),
	new Phrase("eliminate", "eliminated", "eliminating", ""),
	
	new Phrase("steal the identity of","stolen the identity of","stealing the identity of",""),	

	new Phrase("destroy","destroyed","destroying",""),
	new Phrase("kill","killed", "killing",""),
	new Phrase("ruin","ruined","ruining",""),
	new Phrase("hurt","hurt", "hurting","")
];

// Objects (i.e. saintly, saintly things)
objects = [
	"the british people",
	"wonderful westminster",
	"the beneficent union", // 
	"england",

	"hard-working families",
	"homeowners",
	"pensioners",
	"drivers",
	"scots",
	"scottish taxpayers",
	"taxpayers' money",

	"house prices",
	"business", // 
	
	"the union subsidy",
	"the subsidy from england",
	"the union",
	"devolution",

	"british justice",
	"british dignity",
	"british sovereignty",
	"common sense and decency",

	"the queen",    // 
	"the royal family",
	"the armed forces",
	"the navy",
	"the army",
	"the air force",
	"the BBC",
	"the church",
	"the barnett formula",

	"you",
	"your passport",
	"your driving licence",
	"your daughters",
	"your children",
	"your house",
	"your pets",
	"your maw",
	"your job",
	"your benefits",
	"your buckie",

	"the union flag",  // 
	"the city",           // 
	"the memory of diana",
	"Britain's swans"          // This always stays
];

// Matches an auxiliary verb with the subject
function match_verb_and_subject(subject, verb) {
	if (subject.number == 1 && subject.person == 3) {
		 return(verb.singular);
	}
	else {
		 return(verb.plural);
	}
}

// Matchs the transitive verb's tense with that of the verb
function match_verb_and_tense(verb, phrase) {
	if (verb.tense == "present") {
		return phrase.present;
	}
	else if (verb.tense == "past") {
		return phrase.past;
	}
	else if (verb.tense  == "active") {
		return phrase.active;
	}
}

// Returns a Daily Mail Headline as a string
function getHeadline() {
	var sentence = [];

	var subject = getRandom(subjects);
	var phrase = getRandom(transitive_phrases);
	var verb = getRandom(auxiliary_verbs);
	var object = getRandom(objects);

	sentence[0] = match_verb_and_subject(subject, verb);
	sentence[1] = subject.word;
	sentence[2] = match_verb_and_tense(verb, phrase);
	sentence[3] = object;
	if (phrase.object != "") sentence[4] = phrase.object;

	var s = sentence.join(" ").toUpperCase();
	s += "?";

	return s;
}
function headlineThis(xpathQuery,img){
	allDivs = document.evaluate(
	    xpathQuery,
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
	    thisDiv = allDivs.snapshotItem(i);
			if (img == false){
				thisDiv.innerHTML = getHeadline();
			} else {
			  thisDiv.alt = getHeadline();
			}
	    // do something with thisDiv
	}
	
}

if (document.title == "Scotsman.com"){
	headlineThis("//a/img[@alt]",true);
	headlineThis("//ul[@class='cleared']/li/a",false);
	headlineThis('//h3/a',false);
	headlineThis("//span[@class='pufftext']/strong",false);
	headlineThis("//span[@class='newsArticleHeadline']",false);
	headlineThis("//span[@class='mainNewsArticleHeadline']/strong",false);
	headlineThis("//ul[contains(@class,'newsArticleHeadline')]/li/a",false);
	
	
} else {	headlineThis("//a/img[@alt]",true);

	var newBetterTitle = getHeadline();
	document.getElementsByTagName("h1")[1].innerHTML = newBetterTitle;
	document.title = newBetterTitle+' | Know Your Place';
}