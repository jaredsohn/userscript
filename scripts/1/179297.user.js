// ==UserScript==
// @name           Hide eztv header elements and programmes I don't like
// @author   	   d4005
// @namespace      http://userscripts.org/users/169438
// @description    Hide eztv.it site's way-too-big headers that push the real stuff down the page and programmes I don't like
// @include        *eztv*
// @run-at         document-end
// @grant          none
// @version        3.85
// ==/UserScript==

(function(){
	var timeout = 250, scrollToTarget = 80, scrollPos = 0, searchFixed = false, footerLinksHidden = false, scrollAttempts = 0;
	var cucky = "", cookiename = "alreadyseenshows", mygreen = "#DDFFEE", myred = "#FFDDDD", newcookie = "";
	var elementsToHideById = [ "header_logo", "site_menu", "gap", "divider" ];
	var elementsToHideByTagAndTextContent = [
		{tagName:"center",	className:null,				parents: 0, textContents:[ "Want to help us out" ] },
		{tagName:"td",		className:null,				parents: 1, textContents:[ "Announcement", "Do you want to help seed", "Television Show Releases", "Episode Name" ] },
		{tagName:"td",		className:null,				parents: 3, textContents:[ "Airs today", "Select Theme", "Featured Release" ] },
		{tagName:null,		className:"featured_border",parents: 0, textContents:[ "Featured Release" ] },
		{tagName:null,		className:"epinfo", parents: 2, textContents:[
		"QI",
		"The Smoke S0",
		"Mind Games S0",
		"Legit S0",
		"Fat Tony",
		"Fake or Fortune",
		"The Originals S0",
		"Mixology",
		"Doll And Em",
		"Specks",
		"Rudy Maxa",
		"Blandings",
		"Enlisted S0",
		"Intelligence US S0",
		"Line Of Duty",
		"Babylon S0",
		"Banshee S0",
		"Bletchley Circle",
		"Partners 2012",
		"Helix S0",
		"Egalite",
		"Thrones",
		"Jamie Private School Girl",
		"Bitten S0",
		"Rake US",
		"Men at Work",
		"Justified S0",
		"The Best Laid Plans",
		"Killer Women",
		"Suburgatory",
		"Cougar Town",
		"Hinterland",
		"King Of The Nerds",
		"Culture Show",
		"Klondike",
		"Workaholics",
		"Broad City",
		"Mr Selfridge",
		"The Musketeers",
		"Looking S0",
		"MVGroup",
		"Inside RAF",
		"Black Sails",
		"Sherlock Holmes",  //this won't hide the show "Sherlock" though
		"Secret Lives",
		"Biggest Bomb",
		"Wild Winter",
		"Wild Brazil",
		"Half Ton",
		"Frontline 20",
		"Animal Odd Couple",
		"Golden Globe",
		"Oscars",
		"Academy Awards",
		"Gramm",
		"Operation Grand Canyon",
		"Chozen",
		"Eiger",
		"Icebound",
		"Immigra",
		"Kroll",
		"Jesus",
		"Forgotten Kingdom",
		"Warship",
		"Naked and Afraid",
		"Sacred Wonders",
		"House of Lies",
		"Saving Hope",
		"S4C",
		"Our World",
		"Being Human",
		"Our World 2011",
		"Forces of Nature",
		"Krakatoa",
		"Archer 2009",
		"Nova 2",
		"Midsomer",
		"The Fosters",
		"Lost Girl",
		"See Dad Run",
		"Girls S0",
		"Betrayal S0",
		"Revenge S0",
		"Silent Witness",
		"Dolphins Spy",
		"Battered Britain",
		"Birds Of A Feather",
		"Kirstie S0",
		"NOVA Secrets",
		"Nature 20",
		"Century of the Self",
		"Arctic Air",
		"Chicago PD",
		"Being Mary Jane",
		"Pemberley",
		"Earth From Above",
		"Single Ladies",
		"Shocking Facts",
		"Spider",
		"Secret Treasure",
		"Monkeys",
		"Seasick",
		"Machiavelli",
		"Ice Diamonds",
		"Cinema Hong Kong",
		"Typhoon",
		"Britain and",
		"Refuge",
		"Cold Case",
		"Soillse",
		"Mandela",
		"Adventure Show",
		"Surgery",
		"Nature 2013",
		"Rockefeller",
		"Bonnie",
		"Getting On US",
		"Pickers",
		"Goodall",
		"Voyages",
		"Elephants",
		"Hellbound",
		"Treme S0",
		"Mob City",
		"Starga",
		"60 Minutes",
		"Giants",
		"Railway",
		"Journeys",
		"Great Ships",
		"NFB",
		"Narnia",
		"Bostons Finest",
		"Marco Polo",
		"BBC Light and Dark",
		"Wildest Islands",
		"Ch4 Secret",
		"Lucas Bros",
		"Cosby",
		"Yonderland",
		"Wizard",
		"Nikita",
		"Discover",
		"Young Doctor",
		"High School",
		"Greatest Monsters",
		"Villains",
		"Cambodia",
		"Africa",
		"Poirot",
		"Agatha",
		"BBC Dreaming",
		"Almost Human",
		"DC Planet",
		"Gauguin",
		"Raising Hope",
		"TimeScapes",
		"Harlan",
		"Cold War",
		"History of",
		"Ark Raider",
		"Hello Quo",
		"Bluray",
		"JFK",
		"Speeches",
		"Wissen",
		"Lumley",
		"Terroris",
		"Ultimate Airport",
		"Richard Hammond Builds",
		"Biodiversity",
		"Lost Girl",
		"Remembrance",
		"Military",
		"Amazing Ocean",
		"Modern Art",
		"Fifth Estate",
		"Monumental Challenge",
		"Elvis",
		"Shackleton",
		"Charles Bradley",
		"Drifters S0",
		"Salvation",
		"Cruel Cut",
		"Forbidden History",
		"BBC Pink Floyd",
		"Bigfoot",
		"Himalaya",
		"Swastika",
		"My Goat",
		"Mike and Molly",
		"Fresh Meat",
		"Ripper Street",
		"Ravi Shankar",
		"BBC Disowned",
		"American Visions",
		"Twitchers",
		"Talking Dead",
		"Extinction",
		"Music of Man",
		"The Dark Matter of Love",
		"Shakespear",
		"Galapagos",
		"BBC The Art",
		"The Red Chapel",
		"Ambassadors",
		"Played S0",
		"The Michael J Fox Show",
		"BBC Imagine",
		"Orange Witness",
		"Embarrassing Bodies",
		"NG Elizabeth",
		"Megantic",
		"Flying Scotsman",
		"Russia",
		"Mad Minutes",
		"Stringbag",
		"WWII",
		"WW2",
		"BBC Belle",
		"Double Your House",
		"Grimm S",
		"The Carrie",
		"Dracula",
		"BBC Fox Wars",
		"Arte War",
		"NG Generals",
		"Great British",
		"Bestiaire",
		"Horizon Guide",
		"Stan Lees",
		"Star Trek Continues",
		"BBC The House",
		"The Tunnel",
		"Family Portrait",
		"Agatha Christie",
		"BBC Storyville",
		"Under Our Skin",
		"Wikileaks",
		"Super Girls",
		"Dambusters",
		"Was It Something I Said",
		"Olympi",
		"Great White",
		"Awkward S0",
		"Ch4 Date My",
		"CBC The Nature of Things",
		"Ravenswood",
		"RAI The Life of Leonardo",
		"Rick Stein",
		"Final Frontier",
		"New Shock",
		"Freda",
		"The Psychopath Next Door",
		"Street Life",
		"BBC House of Surrogates",
		"BBC Ego",
		"The Last Witch",
		"Euronews",
		"Comic Book Men",
		"Conquest of America",
		"Ottomans",
		"Yangtze",
		"NHK",
		"BBC Frost",
		"The Paradise",
		"Truckers",
		"BBC Impact",
		"Wrong Mans",
		"DC World's",
		"Ch4 Kevin",
		"Extraordinary People",
		"Vociferous",
		"IMAX",
		"Ch4 Dispatches",
		"Vikings",
		"Exploration",
		"Secret Knowledge",
		"Masters of Sex",
		"Moses",
		"White Collar",
		"Mythbusters",
		"Sean Saves the World",
		"The Millers",
		"Ch4 Restoration",
		"Breathless UK",
		"Reign S",
		"The Tunnel S",
		"The Walking Dead",
		"Discovery Nerve",
		"Ch4 World's",
		"Bible",
		"Congo",
		"Once Upon a Time in Wonderland",
		"Tattoo",
		"Key and Peele",
		"American Horror Story",
		"BBC American Master",
		"Glee",
		"Lucky 7",
		"Web Therapy",
		"Supernatural S",
		"Talking Landscapes",
		"Hart of Dixie",
		"Crane Gang",
		"Sky at Night",
		"Warriors",
		"Living Landscapes",
		"Ancient Discover",
		"The Listener S",
		"Wilfred US",
		"Rewind S0",
		"The Glades",
		"Get Out Alive",
		"Twisted 2",
		"Longmire",
		"Pretty Little Liars",
		"Flamenco",
		"BBC Horizon",
		"Hairy Bikers",
		"Archbishop",
		"BBC Exploring",
		"BBC Requiem",
		"S4C Operation",
		"Mistresses US",
		"Futurama",
		"Guge",
		"American Underworld",
		"Deserts",
		"Earth Change",
		"Suits S",
		"Swansea Market",
		"Asian Corridor",
		"Blood Sweat",
		"Ironside",
		"Welcome to the Family",
		"The Newsroom",
		"Graceland",
		"Rookie Blue",
		"Camp S0",
		"What Remains",
		"Southcliffe",
		"The Call Centre S",
		"MasterChef",
		"Covert Affairs",
		"Hot In Cleveland",
		"Ancient Greece",
		"A&E",
		"Siberia S",
		"Stacey Dooley",
		"NewGamePlus",
		"Lost Civili",
		"History Ch",
		"Devious Maids",
		"Got Talent",
		"National Geographic",
		"Discovery Ch",
		"The Soup",
		"Aqua Teen",
		"Ray Donovan",
		"Copper S0",
		"Kung Fu",
		"Totally Biased",
		"So You Think You Can Dance",
		"Big School",
		"The Goldbergs",
		"Witches of East End",
		"Betrayal S",
		"Grand Designs",
		"Chickens",
		"Ultimate Fighter",
		"Key Peele",
		"Capture S",
		"Smithsonian",
		"BBC The Enigma",
		"BBC Science",
		"Deep Blue Dive",
		"War Child",
		"The Bridge US",
		"Nashville",
		"The Middle S",
		"CSI",
		"The League S",
		"Law and Order",
		"Super Fun Night",
		"Survivor S",
		"Back in the Game",
		"Two and a Half Men",
		"Revolution 2012",
		"Criminal Minds",
		"Vampire Diaries",
		"Drop Dead Diva",
		"Beauty and the Beast",
		"Once Upon a Time S",
		"Bionic Revolution",
		"MAD S",
		"The Amazing Race",
		"Coral Reef",
		"Saturday Night Live",
		"Top Chef",
		"Unreported World",
		"BBC The Shock of the New",
		"BBC Natural World",
		"STV Appeal",
		"Citizen Khan",
		"Greys Anatomy",
		"Scandal US",
		"Parenthood",
		"Peaky",
		"NCIS",
		"BBC Kill It Cut It Use It",
		"Acquainted with the Night",
		"Played CA",
		"Terms and Conditions May Apply",
		"Discovery Waterfront",
		"The Originals S",
		"ITV Women Behind Bars",
		"Mindy",
		"Brickleberry",
		"Trophy Wife",
		"Sons of Anarchy",
		"Face Off",
		"New Girl",
		"Bad Education",
		"Brooklyn Nine",
		"Dancing With the Stars",
		"American Idol",
		"See Dad Run",
		"Chicago Fire",
		"Sleepy Hollow",
		"Adventure Time",
		"2 Broke Girls",
		"BBC Panorama",
		"SBS",
		"New Tricks",
		"Anthony Bourdain",
		"The Voice S",
		"Cracked S0",
		"BBC The Story of the Jews",
		"Mom S0",
		"BBC The Culture Show",
		"Bones S",
		"Monsters Vs Aliens",
		"Boardwalk Empire",
		"Revenge S",
		"Castle 2009",
		"Bobs Burgers",
		"Cops S",
		"The Good Wife",
		"Downton",
		"Eastbound and Down",
		"Player Attack",
		"Jazeera",
		"Atlantis 2013",
		"Ch4 Double Your House",
		"Top Model",
		"Blue Bloods",
		"Strike Back",
		"Haven S",
		"Hawaii Five",
		"Hell on Wheels",
		"X Factor",
		"Trust The Bitch",
		"Undercover Boss",
		"The Neighbors",
		"PBS",
		"Last Man Standing",
		"SAF3",
		"Rise of Animals",
		"How I Met Your Mother",
		"Low Winter Sun",
		"Once Upon A Time S",
		"Serangoon Road",
		"Oxyana",
		"This Way of Life",
		"Nazi",
		"Rizzoli",
		"A Touch Of Cloth",
		"Stalin",
		"Hitler",
		"Unforgettable S0",
		"The Wipers Times",
		"Royal Pains",
		"Blackout",
		"Do No Harm",
		"History Classics",
		"Baby Daddy",
		"Melissa and Joey",
		"World War",
		"Iran",
		"Iraq",
		"Afghanistan",
		"The Game S0",
		"The Haves",
		"Underbelly Squizzy",
		"Borrowers",
		"Bugs Bites",
		"Axe Cop",
		"The Zoo",
		"Ken Foll",
		"King Alfred",
		"The Soul Man S",
		"The Exes",
		"Putin",
		"Silk Road",
		"Necessary Roughness",
		"How Its Made",
		"Perception S",
		"Drunk History",
		"Kyrgyzstan",
		"Roman War",
		"Switched at Birth",
		"Teen Wolf",
		"Crossing Lines",
		"Major Crimes",
		"Switched at Birth",
		"Cedar Cove"
		] }
	];

	function remove(elem,parents) {
		timeout = 100; //keep the timeout low while we're still actively removing
		try{
			if(elem) {
				for(var i=0;i<parents;i++)if(elem && elem.parentNode)elem = elem.parentNode;
				if(elem && elem.parentNode) { elem.parentNode.removeChild(elem); return true; }
			}
		} catch(e) {}
		return false;
	}

	function writeCookie(name,value) {
		var ex=new Date();
		ex.setTime(ex.getTime()+5*24*60*60*1000);//5 days expiry for the cookie
		document.cookie = name+"="+escape(value)+"; path=/;"+" expires="+ex.toGMTString();		//save file cookie
	}

	function readCookie(name) {
		var start = document.cookie.indexOf(name);
		if(start>-1) {
			var cuk = document.cookie.substring(start+1+name.length);
			var end = cuk.indexOf(";");
			if(end>-1) {
				cuk = cuk.substring(0,end);
console.log("readCookie:successful");
			}
			cuk=unescape(cuk);
			return cuk.split("&&");
		}
		else console.log("readCookie:cookie not found");
                return "";
	}

	function executeEztv() {
		timeout+=250;		//once we stop removing things, this will climb

		//loop through the sections we want to hide directly by their element id
		for(var i=0;i<elementsToHideById.length;i++) {
			var elem = document.getElementById(elementsToHideById[i]);
			if(elem)
				remove(elem,0);
		}

		//loop through by tagName and textContent and remove n parent tags up
		for(var rows=0;rows<elementsToHideByTagAndTextContent.length;rows++) {

			//get a row from the elementsToHideByTagAndTextContent array object
			var row = elementsToHideByTagAndTextContent[rows];

			//now get all of the tagName types that row specifies
			var tags = row.className ? document.getElementsByClassName(row.className) : document.getElementsByTagName(row.tagName);

			//loop through all of the tags of that type to see if any have the textContent we're looking for
			for(var tag=0;tag<tags.length;tag++) {
				//get a tag
				var elem = tags[tag];
				var text = elem.textContent.toLowerCase();

                if(elem.tagName && elem.tagName.toLowerCase()=="a" && elem.className && elem.className=="epinfo" && !elem.getAttribute("thisonewascoloured")) {
                    var col = mygreen;
                    if(cucky.indexOf(text)>-1)
                        col = myred;
                    else
                        console.log("text:["+text+"] not found in cookie:["+cucky+"]");
                    elem.parentNode.style.backgroundColor = col;
                    elem.setAttribute("thisonewascoloured","true");
                    newcookie += ("&&"+text);
                }
				//loop through the textContent that we're looking to match
				for(var texts=0;texts<row.textContents.length;texts++) {
                    var found = text.indexOf(row.textContents[texts].toLowerCase())>-1;

					//if we found one of them
					if(found) {

                        console.log("Removing "+row.textContents[texts]);

						//then remove it from the DOM
						remove(elem,row.parents);
					}
				}
			}
		}
		//after removing all the things above, we're left with a bunch of br tags that need removing too
		var brs = document.getElementsByTagName("br");
		for(var br=0;br<brs.length;br++) {
			var elem = brs[br];
			if(elem)remove(elem,0);
		}

		//fix the length of the search box from 47 to 45, because at 47 the search button can wrap to the next line
		if(!searchFixed) {
			var inputs = document.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++) {
				if(inputs[i].size && inputs[i].size == "47") {
					inputs[i].size = "45";
					searchFixed=true;
					console.log("eztv GreaseMonkey Script finished fixing the search box!");
					break;
				}
			}
		}

		//hide the links at the bottom
		if(!footerLinksHidden) {
			var as = document.getElementsByTagName("a");
			for(var i=0;i<as.length;i++) {
				if(as[i].href && as[i].href.indexOf("/forum/11061") > -1) {
					remove(as[i],1);
					footerLinksHidden = true;
					console.log("eztv GreaseMonkey Script finished hiding the footer links!");
					break;
				}
			}
		}

		if(timeout<1000)      //keep coming back until timeout manages to climb to 1000 due to lack of remove activity
			setTimeout(executeEztv,timeout);
		else {
		    if(newcookie.length>2) {
                writeCookie(cookiename,newcookie.substring(2));
            }
			console.log("eztv GreaseMonkey Script finished processing the HTML!");
		}
	}
	function animateScroll() {
		if(scrollPos < scrollToTarget && ++scrollAttempts < scrollToTarget) {
			scrollPos += 20;
			window.scrollTo(0,scrollPos);
			setTimeout(animateScroll,50);
		}
		else console.log("eztv GreaseMonkey Script finished animating to Scroll!");
	}
	if(self.location.href.indexOf("/shows")==-1) { //don't run the script on a show link
    	cucky = readCookie(cookiename);
		setTimeout(animateScroll,250);
		setTimeout(executeEztv,timeout);
	}
})();
