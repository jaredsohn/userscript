// ==UserScript==
// @name           My Life Is Not An Annoying Cliche
// @namespace      http://userscripts.org/users/renegade
// @description    This script attempts the Sisyphean task of ridding MLIA posts from tired cliches and similarly annoying stuff.
// @include        http://mylifeisaverage.com/*
// @include        http://www.mylifeisaverage.com/*
// @include        https://mylifeisaverage.com/*
// @include        https://www.mylifeisaverage.com/*
// @version        16.02.10
// @author         Renegade
// ==/UserScript==

// Constants
const DEBUG_STRING = "[SCRIPT RECOGNIZED: $&]";
const MLIA_REPLACE_STRING = "";

// global variables
var storyContainer = document.getElementById("stories");
if(!storyContainer) {
	var pageIsDead = document.getElementsByTagName("td");
	
	if(pageIsDead.length == 1) {
		var tempNode = pageIsDead[0];
		if((tempNode.getAttribute("align") == "center") && (tempNode.getAttribute("valign") == "middle")) {
			// we're getting the stupid "page unavailable" message, refresh!
			window.setTimeout("location.reload()", 1000);
		}
	} else {
		return; // if there's no "stories" element, and the page isn't dead, we're likely on a single-story-page, so we do nothing
	}
}
var footer = document.getElementById("ftr");
var header = document.getElementById("brand");

function cCliche(rxp, identifier, bList) {
	this.pattern = rxp;
	this.text = identifier;
	this.blacklist = ((typeof bList === 'undefined') || (typeof bList === 'null')) ? false : bList; // this makes bList optional, with false as default
	this.appliesTo = function(stringToTest) {
		return this.pattern.test(stringToTest);
	}
}

// recognition patterns
var patterns = [ 
	// blacklisted clichés
	new cCliche(/g[eo]t(?:ing)? (?:an? )?(?:story|this|stories|MLIA) (?:published|posted)/i, "story published", true),
	new cCliche(/(?:story|something) (?:publish|post)ed on MLIA/, "story published", true),
	new cCliche(/(?:R\.?I\.?P\.?|[rR]est [iI]n [pP]eace)/, "rest in peace", true),
	new cCliche(/died (?:from|in)/i, "died from", true),
	new cCliche(/this(?: one)? is for you/i, "this is for you", true),
	new cCliche(/passed away/i, "passed away", true),
	new cCliche(/waldo/i, "Waldo", true),
	new cCliche(/batman/i, "Batman", true),
	new cCliche(/ninja/i, "ninjas", true),
	new cCliche(/twilight/i, "Twilight", true),
	new cCliche(/new moon/i, "Twilight", true),
	new cCliche(/bella/i, "Twilight", true),
	new cCliche(/(?:team )?(?:jacob|edward)/i, "Twilight", true),
	new cCliche(/harry potter/i, "Harry Potter", true),
	new cCliche(/granger/i, "Harry Potter", true),
	new cCliche(/weasley/i, "Harry Potter", true),
	new cCliche(/hogwarts/i, "Harry Potter", true),
	new cCliche(/dumbledore/i, "Harry Potter", true),
	new cCliche(/Gryffindor/i, "Harry Potter", true),
	new cCliche(/Hufflepuff/i, "Harry Potter", true),
	new cCliche(/Ravenclaw/i, "Harry Potter", true),
	new cCliche(/Slytherin/i, "Harry Potter", true),
	new cCliche(/Voldemort/i, "Harry Potter", true),
	new cCliche(/Snape/i, "Harry Potter", true),
	new cCliche(/Chamber of Secrets/i, "Harry Potter", true),
	new cCliche(/tom riddle/i, "Harry Potter", true),
	new cCliche(/Quidditch/i, "Harry Potter", true),
	new cCliche(/(?:yahoo vs|vs\.? yahoo)/i, "Yahoo vs. Google", true),
	new cCliche(/mystery\s?google/i, "Mystery Google", true),
	new cCliche(/high[\s-]five/i, "high fives", true),
	new cCliche(/snuggie/i, "snuggies", true),
	new cCliche(/miley cyrus/i, "Miley Cyrus", true),
	new cCliche(/Hannah Montana/i, "Hannah Montana", true),
	new cCliche(/bubble[\s-]?wrap/i, "bubble wrap", true),
	new cCliche(/Party in the USA/i, "Party in the USA", true),
	new cCliche(/light\s?saber/i, "light sabers", true),
	new cCliche(/disney song/i, "Disney songs", true),
	new cCliche(/Lion King/i, "Lion King", true),
	new cCliche(/Simba/i, "Lion King", true),
	new cCliche(/mulan/i, "Mulan", true),
	new cCliche(/glow[\s-]in[\s-]the[\s-]dark/i, "glow in the dark", true),
	new cCliche(/colou?ring book/i, "coloring book", true),
	new cCliche(/crayo(?:ns|la)?/i, "crayons", true),
	new cCliche(/nerf guns?/i, "nerf guns", true),
	new cCliche(/(?:English|British|Australian) accent/i, "Accents of English", true),
	new cCliche(/11.?11/i, "11:11", true),
	new cCliche(/initials/i, "initials", true),
	new cCliche(/that\'?s what she said/i, "that's what she said", true),
	new cCliche(/dinosaurs?/i, "dinosaurs", true),
	new cCliche(/\bfort\b/i, "forts", true),
	new cCliche(/full credit/i, "full credit", true),
	new cCliche(/narnia/i, "Narnia", true),
	new cCliche(/pok.mon/i, "Pokémon", true),
	new cCliche(/transformers?/i, "Transformers", true),
	new cCliche(/autobots?/i, "Transformers", true),
	new cCliche(/decepticons?/i, "Transformers", true),
	new cCliche(/Optimus/i, "Transformers", true),
	new cCliche(/Megatron/i, "Transformers", true),
	new cCliche(/wal[\s-]?mart/i, "Wal-Mart", true),
	new cCliche(/\beggo(?: waffle)?/i, "eggo waffles", true),
	new cCliche(/crunchy.*?lea(?:f|ves)/i, "crunchy leaves", true),
	new cCliche(/mylifeisaverage/i, "MLIA-themed", true),
	new cCliche(/I fee?lt? like I beat the system/i, "beating the system", true),
	new cCliche(/\$6?6\.66/i, "$666", true),
	new cCliche(/\$69\.69/i, "$69", true),
	new cCliche(/\b69\b/i, "69", true),
	new cCliche(/I\'m \d\d/i, "I'm [age]", true),
	new cCliche(/S?he\'s \d\d/i, "S/he's [age]", true),
	new cCliche(/I['\s]?a?m a \d\d year old/i, "I am a XX old", true),
	new cCliche(/I read a(?:n| story on)? MLIA/i, "I read an MLIA", true),
	new cCliche(/201[23]/i, "2012/2013", true),
	new cCliche(/got an A\b/i, "got an A", true),
	new cCliche(/\b3\.?14\b/i, "Pi", true),
	new cCliche(/I live alone/i, "I live alone", true),
	new cCliche(/gullible.*?(?:ceiling|dictionary)/i, "gullible", true),
	new cCliche(/cool\.\s*$/i, "I wish I was that cool", true),
	new cCliche(/I fee?lt? like a s(?:ecret agent|py)\./i, "feeling like a secret agent", true),
	new cCliche(/facebook group/i, "facebook group", true),
	new cCliche(/found the one/i, "found the one", true),
	new cCliche(/(?:school.*ipod|ipod.*school)/i, "iPod in school", true),
	new cCliche(/Facebook.*?pirate/i, "Facebook pirate language", true),
	new cCliche(/vending machine/i, "vending machine", true),
	new cCliche(/your mom/i, "your mom", true),
	new cCliche(/lockdown drill/i, "lockdown drill", true),
	new cCliche(/look[^\.!"]*?face.*?priceless/i, "priceless face", true),
	new cCliche(/(?:crush|g(?:uy|irl) I like)/i, "crush", true),
	new cCliche(/chicken[^\.!"]*?(?:road|street)/i, "chicken on the road", true),
	new cCliche(/was (?:on|reading) MLIA/i, "self-referential", true),
	new cCliche(/look[^\.!"]*?(?:stupid|silly|dumb|weird) laws?/i, "stupid laws", true),
	new cCliche(/ringtone/i, "ringtone", true),
	new cCliche(/accept[^\.!"]*legitimate/i, "accept as legitimate", true),
	new cCliche(/MLIA[\s-]?story/i, "MLIA story", true),
	new cCliche(/(?:read mind|mind read)/i, "mind reading", true),
	new cCliche(/(?:store|juice).*naked/i, "naked juice", true),
	new cCliche(/chicken.*?cross the road/i, "chicken crossing", true),
	new cCliche(/www\.free/i, "spam", true),
	new cCliche(/thriller dance/i, "thriller dance", true),
	new cCliche(/jump[^\.!"]*?puddle/i, "puddle jumpers", true),
	new cCliche(/1234/i, "1234", true),
	new cCliche(/dog ate (?:my|his|her) homework/i, "dog ate my homework", true),
	new cCliche(/(?:shower.*sing|sing.*shower)/i, "shower-singing", true),

	// writing clichés
	new cCliche(/\s*MLIA\.?\s*$/i, "MLIA"),
	new cCliche(/needless to say[^\.!"]*?\./i, "needless to say"),
	new cCliche(/(?:it|this|you)? [\w\s]*made (?:my|our) (?:day|night|week|month|life)[\.$]/ig, "made my X"),
	new cCliche(/(?:b|great|cool)est\.? [^\.!"]*?\.? ever[\.\\?]/ig, "Best Thing Ever"),
	new cCliche(/I\.? love\.? [^\.!"]*?\.$/i, "I love Someone"),
	new cCliche(/guess wh.*?[\.\\?]/i, "guess who"),
	new cCliche(/[^\.!"]*?(?:ve|s) never been (?:more|so)[^\.!"]*?\./i, "never been more"),
	new cCliche(/never have I been [^\.!"]*?\./i, "never been more"),
	new cCliche(/never in my life[^\.!"]*?\./i, "never in my life"),
	new cCliche(/[^\.!"]*?in my life\.$/i, "never in my life"),
	new cCliche(/[^\.!"]*?(?:so\.?)? many\.? questions\./i, "so many questions"),
	new cCliche(/[^\.!"]*?we have a date [^\.!"]*?\./i, "we have a date"),
	new cCliche(/I(?: have|\'ve)? (?:taught|trained) (?:them|him|her) well\./i, "I taught them well"),
	new cCliche(/you go,?[^\.!"]*?,? you go\.?/i, "you go"),
	new cCliche(/well played,?[^\.!"]*?,? well played\.?/i, "well played"),
	new cCliche(/(?:I think )?I\'m (?:even more )?in love\./i, "even more in love"),
	new cCliche(/[^\.!"]*?s going places\./i, "going places"),
	new cCliche(/[^\.!"]*?(?:Good|Glad|nice) to know [^\.!"]*\./i, "glad to know"),
	new cCliche(/I\'?m glad [^\.!"]*?\./i, "I'm glad"),
	new cCliche(/[^\.!"]*?(?:chose|picked) the right[^\.!"]*?\./i, "chose the right one"),
	new cCliche(/I\'m on\s?to you[^\.!"]*?\./i, "I'm on to you"),
	new cCliche(/I[^\.!"]*?confused\./i, "I'm so confused"),
	new cCliche(/I\'m\.? So\.? Confused\.?/i, "I'm so confused"),
	new cCliche(/I have high hopes for [^\.!"]*?\./i, "high hopes"),
	new cCliche(/I\'m so proud of [^\.!"]*?\./i, "so proud"),
	new cCliche(/I think I\'ll [^\.!"]*? more often now\./i, "I'll do that more often now"),
	new cCliche(/I think i'm going to [^\.!"]*? from now on\./i, "I'll do that more often now"),
	new cCliche(/[^\.!"]*? well spent\./i, "X well spent"),
	new cCliche(/Thank you,? (?:Mrs?\. )?[^\.!"]*?\./i, "thank you, X"),
	new cCliche(/I (?:am|shall) never [^\.!"]*? again\./i, "I shall never again"),
	new cCliche(/I(?:\'| a)m never saying "?[^\.!"]*?"?\s?(?:ever)? again\./i, "I am never saying X again"),
	new cCliche(/I(?:\'| wi)ll never call it "?[^\.!"]*?"?\s?(?:ever)? again\./i, "I'll never call it X again"),
	new cCliche(/Never again (?:wi|sha)ll I[^\.!"]*?\./i, "never again will I"),
	new cCliche(/[^\.!"]*? new best friends?\./i, "new best friend"),
	new cCliche(/[^\.!"]*?faith[^\.!"]*?generation[^\.!"]*?\./i, "faith in our generation"),
	new cCliche(/My faith [^\.!"]*? is restored\./i, "faith restored"),
	new cCliche(/I have new faith in [^\.!"]*/i, "new faith in"),
	new cCliche(/Mind\.? Blown\.?/i, "mind blown"),
	new cCliche(/Thanks for clearing that up,? [^\.!"]*?\./i, "thanks for clearing that up"),
	new cCliche(/[^\.!"]*?\\? I think so\.?/i, "X? I think so"),
	new cCliche(/without missing a beat,?/i, "missing beats"),
	new cCliche(/I\'m still laughing[^\.!"]*?\./i, "still laughing"),
	new cCliche(/It\'s always the [^\.!"]*?\./i, "always the quiet ones"),
	new cCliche(/[^\.!"]*? quiet (?:ones|kids)\./i, "the quiet ones"),
	new cCliche(/[^\.!"]*?soul\s?mate[^\.!"]*?\./i, "soul mates"),
	new cCliche(/[^\.!"]*?s?he(?:\'| i)s a keeper\./i, "s/he's a keeper"),
	new cCliche(/[^\.!"]*?cool[^\.!"]*?\.?\s*$/i, "coolness"),
	new cCliche(/\w?\s\w*\s\w*\? I \w* so\.\s*$/i, "I X so"),
	new cCliche(/[^\.!"]*?laughing so hard\./i, "hard laughing"),
	new cCliche(/[^\.!"]*?favou?rite teacher[^\.!"]*\./i, "favorite teacher"),
	new cCliche(/Touch[eé],? [^\.!"]*?, touch[eé]\.?/i, "touché abuse"),
];
var wrongEndPunct = /[,;]\s*$/; // after we're done, it's possible we're ending on a half-sentence, so we have to fix that

if(storyContainer) {
	var allStories = document.getElementsByClassName("sc");
	
	for(var i = 0; i < allStories.length; ++i) {
		var postContent = allStories[i].firstChild.nodeValue;
		var tagList = allStories[i].parentNode.getElementsByClassName("right")[0];
		var disabled = false;
		
		for(var j = 0; j < patterns.length; ++j) {
			// this.pattern / this.text / this.blacklist / this.appliesTo
			if(patterns[j].appliesTo(postContent)) {
				if(patterns[j].blacklist) {
					allStories[i].style.visibility = "hidden";
					allStories[i].style.cursor = "pointer";
					allStories[i].parentNode.style.cursor = "pointer";
					allStories[i].parentNode.title = "This story has been hidden because it is about a blacklisted cliche topic. Click on it to see it.";
					allStories[i].id = allStories[i].parentNode.id + "_post";
					allStories[i].parentNode.addEventListener("click", function(event) {
						if(/^s_\d+$/.test(event.target.id)) {
							document.getElementById(event.target.id + "_post").style.visibility = "visible";
							event.target.style.cursor = "default";
						} else if(/^s_\d+_post$/.test(event.target.id)) {
							document.getElementById(event.target.id).style.visibility = "hidden";
							event.target.parentNode.style.cursor = "pointer";
						}
					}, false);
					
					disabled = true;
				} else {
					postContent = postContent.replace(patterns[j].pattern,MLIA_REPLACE_STRING);
					postContent = postContent.replace(/procee?ded/ig,"continued"); // the overuse of that word just annoys me
				}
				
				if(patterns[j].text !== "MLIA") { // applies to 99.999% of all posts, and we're trying to get that thing OFF, not elsewhere.
					if(/\S/.test(tagList.firstChild.nodeValue)) {
						tagList.firstChild.nodeValue += " \u00AB\u00BB ";
					}
					tagList.firstChild.nodeValue += patterns[j].text;
				}
				
				if(disabled) {
					break;
				}
			}
		}
		
		if(!disabled) {
			postContent = postContent.replace(wrongEndPunct,".");
			allStories[i].firstChild.nodeValue = postContent;
		}
		
		if(tagList.firstChild.nodeValue.length > 3) {
			tagList.style.color = "#CCCCCC";
			tagList.title = "List of recognized clichés in this post";
		}
	}
}

if(header) {
	var h1 = header.getElementsByTagName("h1")[0];
	if(h1) {
		h1.innerHTML = "<a href=\"/\" style=\"color: inherit; text-decoration: none;\">" + h1.innerHTML + "</a>";
	}
}

if(footer) {
	var link = document.createElement("a");
	link.appendChild(document.createTextNode("MLINAAC running."));
	link.href = "http://userscripts.org/scripts/show/65273";
	link.style.display = "block";
	link.style.textAlign = "center";
	footer.appendChild(link);
}

function generateClicheList() { // yeah, I'm lazy. Sue me.
	var listBlack = document.createElement("ul");
	var listWrite = document.createElement("ul");
	var listItem = document.createElement("li");
	listItem.appendChild(document.createTextNode(""));
	
	for(var i = 0; i < patterns.length; ++i) {
		var curListItem = listItem.cloneNode(true);
		curListItem.firstChild.nodeValue = patterns[i].text;
		if(patterns[i].blacklist) {
			listBlack.appendChild(curListItem);
		} else {
			listWrite.appendChild(curListItem);
		}
	}
	
	document.body.innerHTML = "";
	document.body.appendChild(listBlack);
	document.body.appendChild(listWrite);
}
//generateClicheList();
// EOF