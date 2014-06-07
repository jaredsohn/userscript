// ==UserScript==
// @name          OKCupid Bullshit2English filter
// @version       1.1
// @namespace     none
// @description   Makes OKCupid honest.
// @updateURL     https://userscripts.org/scripts/source/125481.meta.js
// @include       http://www.okcupid.com/profile/*
// ==/UserScript==

// This script uses the Brennus License, which goes like this: "Vae victis."

var okc_word_filter = {

  // Ave, Cupidians. Vos morituros saluto. 

  // let's start with some simple translations.
  "laid[- ]back": "boring",
  "down[- ]to[\- ]earth": "boring as fuck",
  "love to laugh": "could bore a hole through a bank vault",
  "easy[- ]?going": "apathetic",

  // fun-loving girls who like to have fun are SCREWED
  "have fun": "have institutionalized racism", 
  "having fun": "having institutionalized racism", 
  "fun-loving": "racism-loving", 

  // show, don't tell
  "(I'm|I am) smart(?:(?!er))": "I am not in any way smart",
  "(I'm|I am) intelligent": "I am the opposite of intelligent",
  "(I'm|I am) funny": "I am so far from funny that I actually make nearby milk crawl up\
 people's noses",
  // syntax for the first of the above is obtuse if you don't program--
  // it matches "I'm/I am smart," provided that "smart" is not the beginning of "smarter"


  // when people self-identify this way, the opening is always a leak
  // "open[- ]minded": "vacant-minded",
  // new in 1.5: alternative meaning!
  "open[- ]minded": randomItemFromArray(["vacant-minded", 
					 "certain that my non-hatred of gays and other races constitutes a noteworthy achievement, as opposed to being part of the bare minimum for a vaguely acceptable person"]),






  // i have NO typical friday night!
  "no typical": "injudicious numbers of dicks in and around my mouth",

  // my friday nights are NEVER typical!
  "never typical": "full of so many dicks that my mouth has developed maximum occupancy\
 concerns, which when disregarded present a fire hazard",
  // if you ask an okcupid user what their blood type is, they will say "I HAVE NO TYPICAL BLOOD!" 

  // by the way, coming up with dick situations so over the
  // top as to be similarly embarrassing for men and women, straight
  // and gay? not easy. i hope you appreciate my hard work.

  // God does not play dice, MOTHERFUCKER.
  "random": "banal",

  // do not reverse causality.
  "if you can make me laugh, i'm yours": "If I think you're hot, I'll laugh at your jokes",
  // I like nerdy guys!
  "nerdy guys": "guys who look good in glasses",
  "I'm (such )?a (huge |big )?(nerd|geek)": "One time, I used an Internet machine so that I could Internet",
  
  // use your words.
  "I'm selfish, impatient and a little insecure. I make mistakes, I am\
 out of control and at times hard to handle. But if you can't handle\
 me at my worst, then you sure as hell don't deserve me at my best": 
  "I will expect you to treat me like Marilyn Monroe, though I am at best\
 a 6 physically and apparently even have to copy her wit",  

  "I'm a bitch(,.)?\s*I'm a lover(,.)?\s*I'm a child(,.)?\s*I'm a\
 mother(,.)?\s*I'm a sinner(,.)?\s*I'm a saint": "I'm a bitch",

  // seriously, use your words.
  "my friends (would )?say": "I think but lack the confidence to own up to thinking",
  "I consider myself": "I am both verbose and insecure, as well as",

  // if you use others' words, i will turn them against you.
  "i'm kind of a big deal": "My life is so lacking in anything noteworthy that I still\
 characterize it with throwaway 2004 cinema.",

  // the most private thing i'm willing to admit here is:
  // IF I MENTIONED IT HERE IT WOULDN'T BE PRIVATE LOL
  "wouldn't be private": "would reveal my utter ignorance of the meaning of\
 the word 'here.' Also, 'most.' If I could find a way to get\
 'thing' wrong, I would fuck that up, too. Somehow.",

  // lord, lift up my arm with righteousness,
  // that i may tear in twain all the Deceiver's works of lies,
  // and throw lollerskates into his roflcopter blades.
  //   --Leeroy 3:16
  "lol": "LAUGHING OUT LOUD, HEE HAW",
  

  // The most private thing I'm willing to admit here is: "too private to admit here!
  // You should write me if you're intelligent!"
  "too private": ". . . you know what? Since you've made it this far, I think you\
 deserve to know the truth about me. I have a condition, and have for\
 as long as I can remember. My earliest memories are colored by it. I\
 don't know what it's like to be anything else. It's been the root of\
 most of my problems and has played a part in all my previous\
 relationships, so I'm just going to tell you now: my condition is that\
 I'm really dumb.",
  
  // the most private thing i'm willing to admit is that i'm on okcupid!!!
  "I'm on a dating site": "I am disgusted by the very fact that I am forced to evaluate a\
 gutter turd like yourself for romantic suitability",
  "I'm on OKCupid": "I think only scum try to butt-peddle on the Internet",
  "I have an OKCupid account": "Due to a redistricting error, my comfort zone no longer exists",

  // what i'm doing with my life: LIVING IT!
  "living it[.!?]": "sucking off hobos for money, which doesn't work,\
 because everyone knows that hobos don't have money.\
 Except for me, because I've spent my life 'living it' and thus know nothing,\
 aside from various trivia about hobodick.",
  // i kinda feel bad about this one because after i wrote that, my buddy started dating a dude she calls a hobo.
  // and he's apparently a legitimately great guy. anyway, uh, apologies to any actual hobos.
  // i'm not trying to contribute to hobophobia or whatever. 
  
  // I spend a lot of time thinking about life, the universe, and everything!
  "life,? the universe,? and everything": "NERDY REFERENCES. I JUST LOVE MAKING NERDY REFERENCES, YOU GUYS.",


  // I am a GENTLEMAN, a WARRIOR, and a SCHOLAR
  "(I'm|I am) an? \w+, an? \w+, (and )?an? \w+": "I'm a masturbator, a butt-googler, and \
   narcissistically fond of preconstructed identities",

  // set your standards carefully
  "You (understand|know) the difference between (there|their|they're|you're|your|to|too) and\
(your|you're|to|too|there|their|they're)": "OKCupid has effectively broken me, to the extent that I will fuck\
 anyone with a second grade education",
  
  //I tell it like it is!
  "tell it like it is": "deny the Holocaust",
  "tells it like it is": "denies the Holocaust",
  
  // curvy girls cannot self-identify as curvy anymore. Speaking as a
  // dude who appreciates a legit curvy girl: YOU HAVE RUINED THEIR
  // WORD, EUPHEMIZERS, AND SO I SHALL RUIN YOU.
  // "curvy": "kind of fat",
  // hm that was less satisfying than i thought it would be

  // update: now that they added that as a "body type" classification, i run into all these ridic gorgeous
  // girls who my script calls "kind of fat." 
  // that's dumb. deprecated until i figure out a way to exclude that.

  // updated update: found it.
  "real women have curves": "real women have appalling amounts of fatness",


  // bay area women's studies majors, you brought this on yourselves.
  "cis-?gendered": "cis-speciesed (dogfucker ally) (stop fursecution!) (juggalo 4lyfe!!) (DEATH TO THE NEUROTYPICALS!!!) ",

  // The first thing people notice about me is my eyes!
  "my eyes": "the howling void where anything remotely noticeable might have been",

  // I spend a lot of time thinking about the zombie apocalypse!
  "zombie apocalypse": "the deaths of almost every single living human not directly connected to me, without a shred of empathy",
  
  // I'm looking for a partner in crime!
  "partner in crime": randomItemFromArray(["literal criminal, ideally a swindler or convicted horse rapist",
 "roommate in the coma ward"]),

  // Ivy Leaguers are the worst people. 
  "went to (a small )?(private )?(college|school) (on the East Coast|in Cambridge|in Connecticut)": "am probably an\
 Ivy Leaguer and want you to know that, without wanting to admit that I want you to know that.\
 I mean, I wouldn't want your pathetic untermensch brain to shrink back in uncomprehending awe as you\
 behold the slightest glimmer of my unveiled brilliance. Fear not, however, as I may lower myself\
 to take a break from controlling our civilization with the power of my mind so that I can get my bone on.",
 
  //TODO: i should add some lines about the lesser ivies, because those are funnier. e.g.:
  "went to (a small )?(private )?(college|school) in New Hampshire": "am under the mistaken impression that anyone\
 gives a shit about Dartmouth",


  // changes for v. 1.2 begin here
  // Igne natura renovatur integra. 

  // you should message me if you're over X'Y"!
  "(you\'re|you are) over [0-9]'([0-9]\")?": "egregious shallowness gives you a boner",
  // i mean god damn, hooker, i don't go around being all "you should message me if your cup size is at least 8 fluid ounces"

  // lists of demands are best restricted to armed insurrections against the state.
  "(don\'t|do not) message me if(:)?": "Don't. Just don't fucking do it. I know what you're thinking:\
  'surely that's not meant this for me,\
 I am--' No, whoredog, I meant that especially for you. You see, I am so broken by my\
 experiences, either here or in real life, that even when asked for a single interesting\
 thing about myself, a single reason for anyone to talk to me, the only thing I can\
 think to do is to catalogue what I hate. Because I'm not interested in being interesting.\
 I'm interested in projecting my self-image, my exclusivity, even if I can only see myself in terms\
 of what disgusts me. On the other hand, you should totally message me if:",

  // this is proving to be one of the more cathartic programs i've ever written, surpassing even the formidable noob.exe.
  // (noob.exe was written for an ex-business partner.
  // it outputted "noob" one million times and then deleted itself.)

  // "you should message me if you want to!"
  // (HO HO, THE HUMANS WILL BE TAKEN IN BY MY MASTERY OF THEIR WORD-SPEECH)
  "you (want|would like)( to)?[.!]": "HUMAN! YOUR SOCIAL STATUS AND FACE ARE SEEN TO BE PLEASURE BY ME.\
 I INTEND TO MAKE TACTILE INTERFACE WITH YOU! IT IS WITHIN MY WILL TO ENGAGE IN FREE-MARKET COMMERCE TO OBTAIN\
 FERMENTED POTATO BEVERAGE AND SO TO OPTIMIZE OUR JOINT EFFORT. GREETINGS!",
  
  "nice (guy|girl)": "mumbling milquetoast",
  "normal (guy|girl)": "insipid fuck",
  
  // fact: no man with a shred of swashbuckling in him will ever self-identify as a swashbuckler, pirate, or anything similar, unless he literally makes his living by attacking and boarding ships for fun and profit
  "(I'm|I am) a (swashbuckler|pirate)": "mincing lickspittle",


  // i love my friends!
  // "i love": "I for the most part tolerate",
  // deprecated because it's annoying in practice

  // Self summary: "if i told you that would ruin the mystery! lol!"
  // hey Nancy Drew, see if you can crack the Case of the Vapid Profile.
  "the mystery[.!]": "my ability to conceal the fact that I become less interesting with every word I say",
  // or: "i prefer to remain a mystery!"
  "remain a mystery[.!,]": "suck. I have indeed filled out this profile solely that you may bear witness to how craven I am",


  // "i don't know how to summarize myself"
  // "i guess if i were to summarize myself, i would say..."
  "summarize": "shit",

  // 1.3
  // Thought for the day: Only the drowned have seen the end of bullshit. 

  // "I FUCKING HATE STUPID PEOPLE"
  "stupid people": "myself",
  // hint: everyone in your species is fucking retarded.
  // isaac newton, arguably the greatest genius ever, ingested mercury because he thought it would make him smarter. 
  // get over yourself.

  // i'm just as comfortable in a cocktail dress as in hiking gear!
  // MY ABILITY TO WEAR DIFFERENT TYPES OF CLOTHES IS BORDERLINE HEROIC
  "just as comfortable [^.!?,;]* as [^.!?,;]*": 
  randomItemFromArray(["just as comfortable in a fursuit as I am at a cuddle party",
		       "just as comfortable breathing through my mouth as I am wearing velcro shoes",
		       "just as comfortable herping as I am derping"]),

  "I'm not into games": "I lose at Boggle",
  "I don't want to play games" : "I have never gotten a Yahtzee in my entire life",

  // Lol I don't like 2 make the 1st move so holla if you liek what u see!
  // (one week later) DON'T MESSAGE ME IF YOU'RE A DOUCHEBAG JUST LOOKING FOR A BOOTY CALL
  "you like what you see": "you want to touch my face, because it looks . . . so soft",

  // ========================================
  //       ANTI NERD-CLICHE SECTION
  // ========================================
 // "I do epic sh*t!"
  // "Firefly is a religion! It's so full of win!"
  // "You should mesage me if you're awesome, for the win!"
  // "XKCD is so insightful! It explains my life!"

  // ...there is so much nerdslang in want of silencing...
  "for the win": "for the Fuhrer",

  // ... crush ... crush the nerd-speakers ...
  "full of win": "full of centipedes, much like my anal cavity", 

  // ... once roused, Nerdsbane rests only over the wedgied bodies of his enemies ...
  "epic win": "much like the time when Achilles stabbed his spear through the craven throat of Hector,\
 and ground his skull to paste beneath his heel, then dragged his defeated corpse through the dirt to leave a \
 testament of blood and maggots, telling the folly of opposing the peerless son of Peleus",

  // ...only the tears of smug pseudointellectuals can douse the flame of the Nerdsbane's wrath...
  "epic fail": "an act as vain as the wretch Turnus' worthless struggle against divine Aeneas, and equally worthy of anger at\
 the gutless gods who let one live so long in such a wretched life", 

  // ... i must ... destroy ...
  "epic": "prosaic",  
  // hope you were wearing absestos underpants, cuz you just got BURNED

  // ...while the unfunny technohipsters still attempt jokes, there can be no peace...
  // this one catches any bracketed expression that starts with "insert" or "joke"
  // this "meta-joke" is to comedy what garden shears are to testicles. 
  "[\[\*](insert|joke|funny joke)[^\[\*]*[\[\*]": "[insert comment about how I'm an unfunny pee-pants who seeks to mask\
 my unfunny pants-peeing ways with HILARIOUS meta-comments! The cake is a lie!]",

  "you only live once": "yolo",
  "yolo": "sheer impulsive stupidity has been the driving force in my life, which is a shame, because you only live once",

  // did i mention I really like quotes? and women's studies majors?
  "Well(-| )behaved women seldom make history": "Neither I nor Laurel Thatcher Ulrich will ever make history. \
 But if I cheat on you, it's a political statement",

  // "a witty saying proves nothing" --voltaire
  // that does not mean a stupid saying proves anything, you filthy cocks.
  "The only people for me are the mad ones": "The only people for me make no sense whatsoever. If you're wondering why\
 that is, it's because I mistake incomprehensible nonsense for unfathomable depth, and if you're wondering why I do that, it's because\
 I'm completely fucking retarded",

  // the last time i saw a "male," i cleaned out his litter box. 
  "(fe)?males": "filthy lesser-gendered gutter trash",
  "(fe)?male": "ORGANIC PERSON-HUMAN OF EARTH",

  // credits to jfg3 and, uh, zl-d (zr) for the next two. let me know if either of you want actual names. 
  "try not to take (anything|things) too seriously": "try not to do anything with my life",
  "don't take (things|anything) too seriously": "only pretend to understand what's going on, most of the time",

  "unique,? like everyone else": "so bankrupt of anything interesting that I even use unfunny cliches\
 to disclaim my own pathetic unoriginality",
  "I'm an open book": "I forget to zip up my pants",

  // so many wannabe epicureans, none of whom would recognize ataraxia if they were elbow-deep in its vagina
  "living life to the fullest": "doing meth while being gangbanged by the fattest midgets possible, because that makes me more\
 enlightened than you",
  "live life to the fullest": "believe that all my years of aimlessly stuffing my butt with any\
 available drug or dick has 'filled' me with some vaguely-defined sort of wisdom, and not\
 just with Butt Herpes",

  // i like all music except for rap and country!!!
  "except (rap|country|hip hop) (and|or) (rap|country|hip hop)": "except music for poors or lesser races",

  "I'm a (kind|nice|good) person at heart": "Anywhere other than at heart, I am the worst fucking person who has ever lived",
  "I can be shy": "I can be redundant",

  // 1.4 
  // Thought for the day: The profile that shows nothing can still show contempt. 

  "a lot to give": "a passable blowjob to give",

  // syntax here is obtuse. this translates "making people laugh" to "making people laugh politely"
  "making people laugh(?:(?! politely))": "making people laugh politely",

  // public service announcement: if your notion of courage involves anything short of standing up in a hail of bullets and yelling,
  // "COME ON YOU DOGS, DO YOU WANT TO LIVE FOREVER?",
  // and then leading a charge to tear the enemy apart with your bare hands, then you may want to keep quiet about it. 
  // or you may not. it's really your call.
  // but if it centers around posting tepid nonsense on your OKCupid profile and then congratulating yourself about it,
  // well--that, i can do something about. 
  "There, I said it": "I'm such a pussy that my last sentence required what passes for courage among pussykind,\
 and now I am going to draw attention to it, because even that tiny bit of bravery has left me quivering and in need of validation",
  "did I say that out loud\??": "My name is Benito Pussolini. If elected, I pledge to make the trains\
 run on a timely basis and also to bleed on a monthly basis.",


  //"passionate." experimental. consistent with a lot of uses:
  // "I am passionate about my job as a faceless cubicle drone."
  // "I am passionate about my career as a patent lawyer. Stomping on the face of innovation makes my nipples hard."
  // "I am passionate about the 60 hours per week I spend on indirect efforts to get people to click on my company's ads
  //     and not on other ads."
  "(I'm|I am) passionate about": "I am willing to maintain the pretense that my life is more than a forced march into the grave,\
 at least with regard to",
  // collateral damage seems likely.
  // ...Caedite eos. Novit enim deus ex machina qui sunt eius...


  //sometimes the things you choose to brag about say things about where you are setting the bar.
  //and some people set the bar on the floor. the floor of a ditch, at the bottom of the grand canyon. 
  "(I'm|I am) smarter than I look": "I look like the absolute nadir of stupidity, and consider it an accomplishment to put on my\
 underpants in the correct direction after only three tries",

  "(I don't know|I'm not sure|I'm not really sure) what to (write|say)": "I am confident that my lack of self-awareness will make you want to touch my pink parts",
  //I think it's impossible to get to know someone until you meet!
  "impossible to (get to know|connect with|know how you'll match with) someone until you (actually )?meet( in person| in real life)?": 
    "impossible for me to be remotely interesting unless I am physically close enough for you to put things in my pooper",

  // v. 1.5
  // Thought for the day: Mockery is nothing to be afraid of. 

  // my profile's been set to friends only for a while, for which purpose dudes are as good as girls.
  // however, it turns out that dudes' profiles are also as bad as girls'. well, okay, not quite that bad, but close. 
  // anyway, adding some entries. 

  // correlation for this one appears to be about 1.0 in dude-profiles
  "have strong morals": "despise broads and darkeys",

  //  DONT MESSAGE ME IF YOU HAVE BAGGAGE
  //  (credit for concept for the next two to clz; blame for vulgarity to me)
  "you have baggage": "you are a human being and not a good-looking fuckdoll",

  // MESSAGE ME IF YOU CAN LOOK PAST THIS CRAPPY PROFILE
  "you can (see|look) past this (\w+ )?profile": 
  "you can look past this crappy profile and focus on all the information you\
 have about me that ISN'T in my profile, such as the amount of semen that it would take to\
 completely cover my face",

  // suffer not the pseudoscientist to preen.
  "[IE][SN][TF][PJ]": randomItemFromArray(["believer in witches", "9/11 truther", "flat earther", "level 17 chaotic evil hafling cockgobbler"]),
  // Myers-Briggs personality typing has approximately the same construct validity as astrology.
  // http://en.wikipedia.org/wiki/Myers-Briggs_Type_Indicator#Criticism
  
  // every time i see a hypercorrecting prick stress how very, very much they care about the oxford comma,
  // i want to jam my foot into their american colon. 
  // speaking as a guy who used to make up rules of grammar for a living, this is a stupid thing to pretend to care about. 
  //
  // let's rededicate some zeal.
  "use the Oxford comma": "purge the weak, the hesitant and the trusting, in the name of the Dark Gods",  
  
  // fail to plan, plan to fail, motherfucker.
  "take (life|each day|every day) as it comes": "get dizzy when I think about next Tuesday, let alone my whole life",
  "taking (life|each day|every day) as it comes": "demonstrating my utter inability to think beyond the end of the next dick I'm gonna suck",
  // i wanted to make that "the end of my own dick," since the people who say that seem to mostly be
  // lame straight duders, but i suppose i'm stuck with broadly insulting genital usage once again.
  // TODO: store and use gender info.

  // what i'm doing with my life: MAKING THE MOST OF IT! YOLO!
  "making the most of it": "determinedly pursuing selfish goals that ultimately fail to make me happy.\
 So most nights, crying myself to sleep beneath a patina of pizza grease and jizz",
  // accuracy appears high, but the mean:funny ratio is, too. may deprecate. 

  // "IM A RENAISSANCE MAN"
  // i'm going to let history decide that.
  "renaissance man": randomItemFromArray(["skeptic of \"gravity\": a dangerous new idea", "witch-hunter", 
					  "Jew-hater", "Native rapist", "murderous daughter-fucker"]),
  // references are to the following rennaisance men, respectively: pope urban viii, christian iv of denmark, 
  // grand inquisitor torquemada and the inquisition in general, nearly every major conquisitador, and cesare borgia

  // Bonus points if you like music!
  "bonus points": "anal on the first date" 
  

  // author's personal mode: uncomment to unlock
  // includes corrections for Bay Area geography and some additional fuckery
  /*
  ,

  // okcupid needs more archaic misunderstandings. 
  // I'M LOOKING FOR A NICE GUY, etc.
  "nice": "precise",

  // DUDE!
  "chill": "DUDE! Whoa! Like, dude!",  

  // why is everyone here so bad at geography?
  "the city": "the city that's smaller than San Jose",
  "the peninsula": "the region to the south of the peninsula",
  "Oaktown|Oakland": "North Korea", 

  // I LOVE EXPLORING MY CITY!!!!!!
  "SF": "San Francisco", 
  "my city": "San Francisco",
  "San Francisco": "my butt",

  //swap Berkeley and Stanford
  "Berkeley": "UCB",
  "Stanford": "Berkeley",
  "UCB": "Stanford",
  "rock-climbing": "standing under a waterfall made of dicks",

  "CEO": "head cheerleader",

  // applies to all self-identifying bay area poets. even the dudes. no exceptions!
  "poet": "lesbian",

  // let's work toward a colorblind society
  "Asian": "white",

  
  // i really like XKCD because it's so insightful!
  "XKCD": randomItemFromArray(["masturbating",
  "I SURE DO LIKE NERDY REFERENCES! They are epic win! The cake is a lie!"])



  */

};




function randomItemFromArray(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

var okc_decode_array = new Array();
for (word in okc_word_filter) {
  // attempt to deal with variable capitalization, badly.
  okc_decode_array.push([new RegExp(word.charAt(0).toUpperCase() + word.slice(1), 'g'), okc_word_filter[word].charAt(0).toUpperCase() + okc_word_filter[word].slice(1)]);
  okc_decode_array.push([new RegExp(word, 'gi'), okc_word_filter[word]]);
}

function okc_decode(evt) {
	var textNodes = document.evaluate(
					  "//text()",
					  document,
					  null,
					  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					  null);
	
	// function for image replacement -- add later
	// imageReplacement(textNodes);

	for (var i = 0; i < textNodes.snapshotLength; i++) {
	  node = textNodes.snapshotItem(i);
	  for (x in okc_decode_array) {
	    //deal with wordwrap
	    node.data = node.data.replace("\n", " ");

	    node.data = node.data.replace(okc_decode_array[x][0], okc_decode_array[x][1]);
	  }
	}
}

// Experimental function to turn some words into images. 
// If you're reading this, feel free to suggest some.

function imageReplacement(textNodes){
  var imageRegex = /test/gi;

  for(var i=textNodes.snapshotLength - 1; i>=0 ; i--) {
    var elm = textNodes.snapshotItem(i);
    if(imageRegex.test(elm.nodeValue)) {
      var elmSpan = document.createElement("span");
      elm.parentNode.replaceChild(elmSpan, elm);
      var text = elm.nodeValue;
      imageRegex.lastIndex = 0;
      for(var match = null, lastLastIndex = 0; (match = imageRegex.exec(text)); ) {
	elmSpan.appendChild(document.createTextNode(text.substring(lastLastIndex, match.index)));
	var image = document.createElement("img");
	image.setAttribute("src", "imageURL");
	image.setAttribute("height", "100");
	image.setAttribute("width", "100");
	elmSpan.appendChild(image);
	lastLastIndex = imageRegex.lastIndex;
      }
      elmSpan.appendChild(document.createTextNode(text.substring(lastLastIndex)));
      elmSpan.normalize();
    }
  }
  

}



document.addEventListener("AutoPagerAfterInsert", okc_decode, true);
okc_decode();
