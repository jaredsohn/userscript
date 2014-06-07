// ==UserScript==
// @name       Snizzlator
// @namespace  http://wilsonhut.com/
// @version    1.0
// @description  Makes yo sheezy.
// @include    http://*/*
// @exclude http://www.wilsonhut.com-a.googlepages.com/
// @exclude http*://*.google.com/*
// @exclude http*://*.amazon.com/*
// @copyright  2011+, You
// ==/UserScript==

var q = 'How greazzy do you want yo sheezzy?';
var shizzleHeavyKey = 'shizzleHeavy';
var shizzleHeavy = 10000;
var izzleIzzleKey = 'izzleIzzle';
var izzleIzzle = 500;
var autoSnizzleKey = "autoSnizzle";
var autoSnizzle = 1;
shizzleHeavy = GM_getValue(shizzleHeavyKey, shizzleHeavy);
izzleIzzle = GM_getValue(izzleIzzleKey, izzleIzzle);
autoSnizzle = GM_getValue(autoSnizzleKey, autoSnizzle);
GM_registerMenuCommand(q + '... (at ' + shizzleHeavy/100 + '%)', function(){
	shizzleHeavy = Math.round(parseFloat(prompt(q + ' (0-100 (or more!))', shizzleHeavy/100), 10) * 100);
	GM_setValue(shizzleHeavyKey, shizzleHeavy);
	document.location.reload();
});
GM_registerMenuCommand('Izzle izznizzle izzle??... (at ' + izzleIzzle/100 + '%)', function(){
	izzleIzzle = Math.round(parseFloat(prompt('Dis be the how much izznizzle they is n\' stuff (0-100)', izzleIzzle/100), 10) * 100);
	GM_setValue(izzleIzzleKey, izzleIzzle);
	document.location.reload();
});

GM_registerMenuCommand("Upgrizzle. Know what I'm sayin'?", function(){
	try{
		alert("Greasemonkey caches dis sucka.  Maybe dis will work fo' you though.");
		document.location = "http://www.wilsonhut.com-a.googlepages.com/snizzlator.user.js";
	}catch(ex){}
});
GM_registerMenuCommand((autoSnizzle? "* " : "") + "Auto-snizzle every page", function(){
	try{
		autoSnizzle = autoSnizzle? 0 : 1;
		GM_setValue(autoSnizzleKey, autoSnizzle);
		document.location.reload();
	}catch(ex){}
});
GM_registerMenuCommand("Snizzlate, fool!", function(){
	try{
		doYoThang();
	}catch(ex){}
});

var zzl = izzleIzzle/100;
// End Preferences

function randizzle(){
	return Math.random()*100;
}
String.prototype.left = function(num){
	return this.substr(0,num);
}
String.prototype.right = function(num){
	return this.substr(this.length-num);
}
String.prototype.mid = function(start,length){
	return this.substr(start,length);
}
String.prototype.trim = function(){
	return this.replizzle(/\s*$|^\s*/g,"");
}
String.prototype.indizznexOf = function(strizznizzle){
	return this.indexOf(strizznizzle);
}
String.prototype.splizzle = function(splizznitOn){
	return this.split(splizznitOn);
}
String.prototype.replizzle = function(izzle,izznizzle){
	return this.replace(izzle,izznizzle);
}
String.prototype._ToThe_ = function(){
	var wizzle = this;
	if(randizzle() < zzl && !wizzle.match(exprizzles.notUpperLizznetter) && wizzle.trim().length < 5 && wizzle.trim().length > 1){
		// make 3 or 4 letter acronyms funny.
		if(wizzle.match(exprizzles.doubleLetter)){
			wizzle = wizzle.replizzle(exprizzles.doubleLetter, " double-$1");
		}else{
			if(wizzle.length > 3){
				wizzle = wizzle.split("").join("-");
				wizzle = wizzle.left(5) + "-and-to-tha" + wizzle.right(wizzle.length - 5);
			}else if(wizzle.match(/\b\w[^aeiou]\b/gi)){
				wizzle = wizzle.split("").join("-to-tha-") + "izzo";
			}else{
				wizzle = wizzle.split("").join("-to-tha-");
			}
		}
	}
	return wizzle;
}
String.prototype.snizzle = function(percnizzle, conntext){
	var wizzle = this;
	var excezzle;
	if(wizzle.trim().length > 0){
		percnizzle = percnizzle || 0;
		var wordArrizzle = wizzle.splizzle(/\b/g);
		if(wordArrizzle.length > 1){ // split the words out
			var len = wordArrizzle.length;
			for(var iz = 0; iz < len; iz++){
				wordArrizzle[iz] = wordArrizzle[iz].snizzle(percnizzle, new Conntext(iz, wordArrizzle));
			}
			wizzle = wordArrizzle.join("").replace("''","'");
		}else if((excezzle = snizzleExcezzles[wizzle.toLowerCase()]) !== undefined && (excezzle.match || excezzle.push)){ // try the replacements
			if(randizzle() <= percnizzle){
				var newWizzle = getchuOne(excezzle);
				if(wizzle == wizzle.toUpperCase()){
					newWizzle = newWizzle.toUpperCase();
				}else{
					var firstLizzle = wizzle.left(1);
					if(firstLizzle.toUpperCase() == firstLizzle){
						wizzle = newWizzle.left(1).toUpperCase() + newWizzle.substr(1,newWizzle.length);
					}else{
						wizzle = newWizzle;
					}
				}			
			}
		}else if(randizzle() <= percnizzle){ //snizzlate!
			if(this == (wizzle = wizzle._ToThe_())){// make 2 to 4 letter acronyms funny.
				var allBustaCaps = !wizzle.match(exprizzles.notUpperLizznetter);
				var changed = false;
				for(var i = 0; i < replizzlers.length; i++){
				    if(!changed || !replizzlers[i].exclusive){
					    wizzle = replizzlers[i].wordUp(wizzle, conntext);
					    if(this != wizzle){
					        changed = true;
						    if(allBustaCaps){
							    wizzle = wizzle.toUpperCase();		
						    }
						    if(replizzlers[i].exclusive){
						        break;
						    }
					    }
					}
				}
			}
		}
	}
	return wizzle;
}

function getchuOne(){
	args = arguments;
	if(args[0] && args[0].push){
		args = args[0];
	}
	return args[Math.round(randizzle()) % args.length];
}

function Conntext(index, array){
	this.index = index;
	this.array = array;
	this.nextWordBeSompm = function(sompm){
		var nextWord;
		return (this.conntextAight()	&& (nextWord = this.array[this.index + 2]) && (nextWord.toString().trim().toLowerCase() == sompm));
	};
	this.lasWordBeSompm = function(sompm){
		var lasWord;
		return (this.conntextAight()	&& this.array.length > 2 && (lasWord = this.array[this.index - 2]) && (lasWord.toString().trim().toLowerCase() == sompm));
	};
	this.conntextAight = function(){
		return(this.array && this.index !== undefined);
	};
}

function Replizzler(minLength, gamblin, exclusive, regizzle, fizzle, isInContext){
	this.regizzle = regizzle;
	this.fizzle = fizzle;
	this.exclusive = exclusive;
	this.gamblin = gamblin;
	this.minLength = minLength;
	this.isInContext = isInContext || function(){return true;};
	this.wordUp = function(word, conntext){
		return (word.trim().length >= minLength && randizzle() < this.gamblin && word.match(this.regizzle) && this.isInContext(conntext))? word.replizzle(this.regizzle, this.fizzle) : word;
	}
}

var exprizzles = {
	doubleLetter: /([a-z])\1\b/ig,
	notUpperLizznetter: /[^A-Z]/g,
	colon: /:/g,
	consonantVowelWord: /^([^aeiou]+)([aeiou]\w*)/ig,
	consonantsVowelsConsonants: /\b(([^aeiouy]+)[aeiou]+[^aeiouy]+)\b/ig,
	consonantVowelConsonants: /\b(([^aeiouy])([aeiou][^aeiouy]+))\b/ig,
	word: /([^aeiou])[aeiouy]+[^aeiouy]*?e?(s?)\b/gi, 
	ack: /\b(([^aeiouy])ack)(ing)?\b/gi,
	punkedchewashun: /^(\.|!|\?|\:)\s*$/g,
	wordWithEndingPasted: /([^aeiou][aeiouy]+[^aeiouy]*)(ist\b|able\b)/gi,
	wordWithEndingPersisted: /(([^aeiou])[aeiouy]+[^aeiouy]*)(ed\b|es\b|ing\b|ings\b|ingly\b|tion\b)/gi,
	specialEnding: /([^aeiou]+)(ispy|ered|er|ers|or|ors|ore|ores|oor|oors)\b/gi,
	specialEnding2: /([aeiouy]+[^aeiou]+)(ing|ings|ingly)\b/gi,
	mister: /\b(mr|mrs)\b/gi,
	gotsta: /\b(has|have|wants)\b/gi,
	wit: /(th\b|t\b|d\b)/gi,
	ing: /([aeiouy]+[^aeiouy]*)(ing)\b/gi,
	endings: {
	    "ispy":"ipzy", 
	    "er":"a'", 
	    "er":"a'", 
	    "ers":"a's", 
	    "ered":"a'd", 
	    "or":"a'", 
	    "ors":"a's", 
	    "ore":"o'", 
	    "ores":"o's", 
	    "oor":"o'", 
	    "oors":"o's",
	    "es":"e's", 
	    "ed":"'d", 
	    "ing":"in'", 
	    "ings":"in's", 
	    "ingly":"in'ly",
	    "tion":"eshun"
    },
   gots: {"got":"got", "have":"has", "has":"have", "want":"wants", "wants":"want"},
   gotstas:{"have":"gots'ta", "has":"gots'ta", "wants":"wants'ta"},
   wits: {"th":"t'ch", "t":"t'ch", "d":"d'j"}
};

function Izznending(flava, end, chances){
	this.flava = flava || "";
	this.end = end || "";
	this.enchilada = this.flava + this.end;
	this.chances = chances;
}

var izznendings = {
	izzles : [
		new Izznending("eezy", "", 8),
		new Izznending("izzay", "", 16),
		new Izznending("iggity", "", 20),
		new Izznending("izznizzl", "e", 25),
		new Izznending("izzl", "e", 100)
	],
	getchoText : function(addEnd, fromTha, toTha){
		var izznending;
		var gamble = randizzle();
		var i;
		for(i = 0; i < izznendings.izzles.length; i++){
			if(gamble <= izznendings.izzles[i].chances){
				if(toTha && !izznendings.izzles[i].end){
					continue;
				}else{
					izznending = izznendings.izzles[i];
					break;
				}
			}
		}
		return fromTha + ((addEnd)? izznending.enchilada : izznending.flava) + toTha;
	}
} 

var mizzidles = {
	getchoText : function(shabang, fromTha, toTha){
		return fromTha + getchuOne("izzn", "izz", "izz", "izz") + toTha;
	}
}

var punkedchewashuns = {
	"." : [
		" - know what I'm sayin'? ", 
		" - know what I'm sayin'? ", 
		" n' stuff. ", 
		" cuz we keeps it real. ", 
		" cuz we creepin' up on ya. ", 
		".  Ahh Yeah! ", 
		" - fo' real. ", 
		".  Sup wit dat? ", 
		" - you dig, fool? ", 
		". Word. ", 
		" - so chill. ", 
		". It's like dat. ", 
		". Do anybody know my name? ", 
		", yo. Dis is how we flow. ",
		", yo. We in tha house, yo. ",
		". Holla! ",
		" - so why you trippin'? ",
		". Dat's how we tryna roll. ",
		". Jus' roll wit it. ",
		" - so why you gots'ta be a playa' hata'? ",
		". Dis is MY house! ",
		" up in here. ",
		" cuz I'm chillin' like a villain. ",
		". N' I ain't tryna hear dat. ",
		". Holla up in yo face. ",
		". We out like sauerkraut. ",
		" cuz we ain't got nuttin' to prove. We smooov. ",
		" - so don't be fakin'. Dat's greazy like bacon. ",
		". You gots'ta listen to dis. ",
		". Ain't nuttin' butta thang baby. ",
		", G.  All the otha' brotha's wanna be me, see? ",
		" straight trippin'.  Dat's tha grease dis monkey sippin'. "
		],
	"?" : [" - fool? ", " - dawg? ", " - sucka? ", "? Represent. ", "?  Don't believe the hype. ","? Can we rock? ", "? Shuttup so I can tell ya. ", "? Ax somebody. "],
	"!" : ["! Here we go! Here we go! ", "! Bla-DOW! ", "! You know dat's right! ", "! Let me hear ya say... ", "! Oh snap! "],
	":" : ["... Here we go: ", "... Check out dis stuff: ", "... Check baby, check baby: ", "... It's like dis n' like dat: ", "... Are you ready fo' dis?: ","... Lemme here say: "],
	getchoText : function(thang){
		return getchuOne(punkedchewashuns[thang.trim()]) || thang;
	}
}

var propa = {
	mr : ["Mr. G Funk", "Mr. G Money", "Yo baby daddy", "Mr. D-to-tha-izzawg", "Mr. Holmes Yo", "Mr. Home Skillet"],
	mrs: ["Miss Sweet Thang", "Yo mamma", "Miss Honey Sweet"],
	getchoText : function(thang){
		return getchuOne(propa[thang.trim().toLowerCase()]) || thang;
	}
}

function nextWordBeTo(conntext){
	if(conntext && conntext.nextWordBeSompm("to")){
	  conntext.array[conntext.index + 1] = "";
		conntext.array[conntext.index + 2] = "";
		return true;
	}else{
		return false;
	}
}

function seeYaNextWordBeYa(conntext){
	if(conntext){
		if(conntext.nextWordBeSompm("your")){
			conntext.array[conntext.index + 1] = "o";
			conntext.array[conntext.index + 2] = "";
			return true;
		}else if(conntext.nextWordBeSompm("you")){
			conntext.array[conntext.index + 1] = getchuOne("a", "u");
			conntext.array[conntext.index + 2] = "";
			return true;
		}
	}
	return false;
}

// replizzlers!!!
var replizzlers = new Array();
replizzlers.add = function(minLength, gamblin, exclusive, regizzle){
	return (replizzlers[replizzlers.length] = new Replizzler(minLength, gamblin, exclusive, regizzle));
}
var rep;

// Here we go!
rep = replizzlers.add(4, 100,true, /([^aeiou])th\b/gi);
rep.fizzle = function($0, $1){return $1 + "'f";};

rep = replizzlers.add(3, 100,true, /\b(o)ut\b/gi);
rep.fizzle = function($0, $1){return $1 + "ut da";};
rep.isInContext = function(conntext){
	if(conntext && conntext.conntextAight() && conntext.array.length > conntext.index + 4){
		if(conntext.array[conntext.index + 2] == "of" && conntext.array[conntext.index + 4] == "the"){
			conntext.array[conntext.index + 2] = "";
			conntext.array[conntext.index + 4] = "";
			return true;
		}
	}
	return false;
};

rep = replizzlers.add(3, 100,true, /\b(are)\b/g);
rep.fizzle = function($0, $1){return "'s";};
rep.isInContext = function(conntext){
	if(conntext && conntext.conntextAight() && conntext.index > 1){
		conntext.array[conntext.index - 1] = "";
		return true;
	}
	return false;
};

rep = replizzlers.add(2, 100,true, /\b(am)\b/g);
rep.fizzle = function($0, $1){return "roll";};
rep.isInContext = function(conntext){
	return(conntext && conntext.conntextAight()
		&& conntext.array.length > conntext.index + 1
		&& conntext.array[conntext.index + 1].toString().trim().match(exprizzles.punkedchewashun));
};

rep = replizzlers.add(2, 75,true, /\b(m)y\b/g);
rep.fizzle = function($0, $1){return $1 + "ah";};

rep = replizzlers.add(2, 100,true, /\bm(e|y)\b/g);
rep.fizzle = function($0, $1){return "a brotha'" + {"e":"", "y":"z"}[$1.toLowerCase()];};
rep.isInContext = function(conntext){return (!conntext || !conntext.lasWordBeSompm("a"));};

rep = replizzlers.add(4, 100,true, /(s|f)t\b/ig);
rep.fizzle = function($0, $1){return $1 + "'";};

rep = replizzlers.add(6, 100,true, /\b(c)redit\b/ig);
rep.fizzle = function($0, $1){return {"C":"P", "c":"p"}[$1] + "rops";};
rep.isInContext = function(conntext){
	return (!conntext || !conntext.conntextAight()
		|| conntext.array.length <= conntext.index + 2
		|| !conntext.array[conntext.index + 2].toString().match(/\bcard/gi));
};

rep = replizzlers.add(5, 100,true, /\b(a|p)(bout|reparing)\b/ig);
rep.fizzle = function($0, $1){return {"A":"F", "a":"f", "P":"F", "p":"f"}[$1] + "ittina";};
rep.isInContext = nextWordBeTo;

rep = replizzlers.add(5, 100,true, /\b(g)etting\b/ig);
rep.fizzle = function($0, $1){return {"G":"F", "g":"f"}[$1] + "ittina";};
rep.isInContext = function(conntext){
	var nextNextWord;
	if(conntext && (conntext.nextWordBeSompm("ready") || conntext.nextWordBeSompm("prepared"))
		&& (nextNextWord = conntext.array[conntext.index + 4]) && (nextNextWord.toString().trim().toLowerCase() == "to")
		){
	  conntext.array[conntext.index + 1] = "";
		conntext.array[conntext.index + 2] = "";
		conntext.array[conntext.index + 3] = "";
		conntext.array[conntext.index + 4] = "";
		return true;
	}else{
		return false;
}	};

rep = replizzlers.add(5, 100,true, /\b(g)oing\b/ig);
rep.fizzle = function($0, $1){return $1 + "on'";};
rep.isInContext = nextWordBeTo;

rep = replizzlers.add(4, 100,true, /\b(w)ill\b/ig);
rep.fizzle = function($0, $1){return {"W":"F", "w":"f"}[$1] + "ittina";};
rep.isInContext = function(conntext){return conntext && conntext.nextWordBeSompm("be");};

rep = replizzlers.add(3, 100,true, /\b(w)on\b/ig);
rep.fizzle = function($0, $1){return {"W":"A", "w":"a"}[$1] + "in't gon'";};
rep.isInContext = function(conntext){
	if(conntext && conntext.nextWordBeSompm("t")){
		conntext.array[conntext.index + 1] = "";
		conntext.array[conntext.index + 2] = "";
		return true;
	}else{
		return false;
}	};

rep = replizzlers.add(3, 100,true, /\b(t)here\b/ig);
rep.fizzle = function($0, $1){return $1 + "hey";};
rep.isInContext = function(conntext){return conntext && (conntext.nextWordBeSompm("is") || conntext.nextWordBeSompm("are"));};

rep = replizzlers.add(2, 100,true, /\b(o)f\b/ig);
rep.fizzle = function($0, $1){return {"O":"U","o":"u"}[$1] + "h";};
rep.isInContext = function(conntext){
	if(conntext && conntext.nextWordBeSompm("the")){
		conntext.array[conntext.index + 1] = "'";
		conntext.array[conntext.index + 2] = "da";
		return true;
	}else{
		return false;
}	};

rep = replizzlers.add(3, 100,true, /\b(t)he\b/ig);
rep.fizzle = function($0, $1){return $1 + "ha";};

rep = replizzlers.add(2, 100,true, exprizzles.mister);
rep.fizzle = function($0, $1){return propa.getchoText($1);};
rep.isInContext = function(conntext){
	if(conntext && conntext.conntextAight() && conntext.array.length > conntext.index+2 && conntext.array[conntext.index + 1] == ". "){
		conntext.array[conntext.index + 1] = "";
		conntext.array[conntext.index + 2] = "";
		return true;
	}else{
		return false;
}	};

rep = replizzlers.add(3, 100,true, exprizzles.gotsta);
rep.fizzle = function($0, $1){return exprizzles.gotstas[$1.toLowerCase()];};
rep.isInContext = nextWordBeTo;

rep = replizzlers.add(3, 100,true, exprizzles.gotsta);
rep.fizzle = function($0, $1){return exprizzles.gots[$1.toLowerCase()];}

rep = replizzlers.add(5, 100,true, /.*ing\b/gi);
rep.fizzle = function($0, $1){return getchuOne("perpetratin'", "sippin'", "pimpin'", "frontin'", "posin'", "perpatratin' on the live tip", "smoovin' up", "crimpin'", "playa' hatin'");};
rep.isInContext = function(conntext){
	return (conntext && conntext.conntextAight() && conntext.array.length > conntext.index+1 && conntext.array[conntext.index + 1].left(1) == ".");
};

rep = replizzlers.add(5, 100,true, exprizzles.ing);
rep.fizzle = function($0, $1){return $1 + "in";};
rep.isInContext = function(conntext){
	if(nextWordBeTo(conntext)){
		var nextNextWord;
		if((!(nextNextWord = conntext.array[conntext.index + 4]) || nextNextWord.toLowerCase() != "a")){
			conntext.array[conntext.index + 2] = "'a";
		}else{
			conntext.array[conntext.index + 3] = "'tu";
		}
		return true;
	}else{
		return false;
}	};

rep = replizzlers.add(5, 100,false,exprizzles.ing);
rep.fizzle = function($0, $1){return $1 + "iny";};
rep.isInContext = seeYaNextWordBeYa;

rep = replizzlers.add(2, 100,false,exprizzles.wit);
rep.fizzle = function($0, $1){return $1 + "s'ta";};
rep.isInContext = nextWordBeTo;

rep = replizzlers.add(2, 100,false,exprizzles.wit);
rep.fizzle = function($0, $1){return exprizzles.wits[$1.toLowerCase()];};
rep.isInContext = seeYaNextWordBeYa;

rep = replizzlers.add(4, 30, true, exprizzles.ack);
rep.fizzle = function($0, $1, $2, $3){return ($1 + "-a-lack" + ($3? "in'" : "a"));};

rep = replizzlers.add(4, 100,false,exprizzles.specialEnding);
rep.fizzle = function($0, $1, $2){return ($1 + exprizzles.endings[$2.toLowerCase()]);};

rep = replizzlers.add(3, zzl/7,true, exprizzles.consonantVowelConsonants);
rep.fizzle = function($0, $1, $2, $3){return ($2.toUpperCase() + "-to-tha-izz" + $3);};

rep = replizzlers.add(3, zzl/4,true, exprizzles.consonantsVowelsConsonants);
rep.fizzle = function($0, $1, $2){return ($2 + "iggity-" + $1);};

rep = replizzlers.add(3, zzl/2,false,exprizzles.consonantVowelWord);
rep.fizzle = function($0, $1, $2){return mizzidles.getchoText($0, $1, $2);};

rep = replizzlers.add(6, zzl, true, exprizzles.wordWithEndingPasted);
rep.fizzle = function($0, $1, $2){return izznendings.getchoText(false, $1, $2);};

rep = replizzlers.add(5, zzl, true, exprizzles.wordWithEndingPersisted);
rep.fizzle = function($0, $1, $2, $3){return izznendings.getchoText(false, $2, exprizzles.endings[$3.toLowerCase()]);};

rep = replizzlers.add(6, 100,false,exprizzles.specialEnding2);
rep.fizzle = function($0, $1, $2){return ($1 + exprizzles.endings[$2.toLowerCase()]);};

rep = replizzlers.add(4, 100,false,/\b([^aeiouy]+)ing\b/gi);
rep.fizzle = function($0, $1){return $1 + "ang";};

rep = replizzlers.add(3, zzl, true, exprizzles.word);
rep.fizzle = function($0, $1, $2){return izznendings.getchoText(true, $1, $2);};

rep = replizzlers.add(1, 16, true, exprizzles.punkedchewashun);
rep.fizzle = function($0, $1){return punkedchewashuns.getchoText($1);};
rep.isInContext = function(conntext){
	var goot = false;
	do{
		if(!conntext || !conntext.conntextAight()){break;}
		var previousWord = conntext.array[conntext.index - 1];
		if(previousWord && previousWord.toString().length < 4){break;}
		var nextWord = conntext.array[conntext.index + 1];
		var thisWord = conntext.array[conntext.index];
		if(nextWord && nextWord.trim().length > 0 && thisWord.length < 2){
			break;
		}
		goot = true;
	}while(false);
	return goot;
};


var snizzleExcezzles = {
	"aren":"ain",
	"isn":"ain",
	"and":"n'",
	"for":"fo'",
	"their":["they","they's"],
	"your":"yo'",
	"yours":"yo's",
	"this":"dis",
	"that":"dat",
	"woman":["sista'","honey", "lady friend"],
	"women":["sistas","honeys"],
	"womens":["sistas'","honeys'"],
	"lady":["sista'","honey"],
	"ladies":["sistas","honeys"],
	"people":["peeps","thugs"],
	"persons":["peeps","thugs"],
	"those":"them",
	"them":"'em",
	"ask":"ax",
	"asking":"axin'",
	"asked":"ax'd",
	"something":["a lil sum-sumpm'","sumpm"],
	"thing":["stuff","thang"],
	"problem":["prollem","thang"],
	"sure":["fo' sho'","sho'"],
	"things":["pieces a stuff","thangs"],
	"yes":["fo' snizzle my nizzle","ah yeah"],
	"gotta":"gots'ta",
	"thinks":"thank",
	"think":"thanks",
	"get":"gets",
	"face":"grill",
	"mouth":"grill",
	"mouths":"grills",
	"party":"bang",
	"parties":"bangs",
	"steal":"boost",
	"happening":"crack-a-lackin'",
	"house":"crib",
	"houses":"cribs",
	"homes":"cribs",
	"money":"cheddar",
	"insult":"dis",
	"lying":"frontin'",
	"gun":"gat",
	"guns":"gats",
	"wait":"hold up",
	"shoes":"kicks",
	"exciting":"krunk",
	"imitate":"perpetrate",
	"imitating":"perpetratin'",
	"car":"ride",
	"cars":"rides",
	"honest":"straight up",
	"stealing":"thievin'",
	"neighborhood":"hood",
	"neighbourhood":"hood",
	"neighborhoods":"hoods",
	"neighbourhoods":"hoods",
	"ripped":"to' up",
	"torn":"to' up",
	"broken":"to' up",
	"destroyed":"to' up",
	"deal":"dealio",
	"deals":"dealios",
	"haven":"ain",
	"hasn":"ain",
	"his":"his",
	"were":"wuz",
	"weren":"wuzn",
	"was":"wuz",
	"wasn":"wuzn",
	"said":["be sayin'","sez"],
	"says":["be sayin'","say"],
	"they":"they",
	"hey":"yo",
	"re":"",
	"ve":"",
	"one":"one",
	"didn":"din",
	"does":"do",
	"doesn":"don",
	"don":"don",
	"can":"can",
	"guy":["brotha'","homie","sucka","homeslice","homeskillet"],
	"guys":["brothas","homeslices","homeskillets"],
	"boy":["brotha'","homie","sucka","homeslice","homeskillet"],
	"boys":["homies","homeslices","homeskillets"],
	"men":["brothas","homies","suckas"],
	"mens":["brothas'","homies'","suckas'"],
	"two":"two",
	"because":"cuz",
	"business":"bih'ness",
	"smooth":"smooov",
	"is":["be","is"],
	"keep":"keeps",
	"keeps":"keep",
	"sell":"sling",
	"sold":"slang",
	"kid":"shorty",
	"kids":"shorties",
	"information":["flava'","fo'-one-one","stinkin' info","sumpm","stuff n' junk","funky junk"],
	"info":["flava'","fo'-one-one","stinkin' info","sumpm","stuff n' junk","funky junk"],
	"answer":"ansa'",
	"large":["large (like I'm livin')","phat","heavy"],
	"big":["kickin'","slammin'","stinkin' big","heavy"],
	"with":"wit",
	"four":"fo'",
	"color":"culla'",
	"colors":"culla's",
	"colour":"culla'",
	"colours":"culla's",
	"tooth":"toof",
	"sandwich":"sammitch",
	"sandwiches":"sammitches",
	"christmas":"krimmas",
	"everything":"er'thang",
	"everybody":"er'body",
	"every":["e'ry","e'ry stinkin'"],
	"anything":"anythang",
	"nothing":"nuttin'",
	"probably":"prolly",
	"prefer":"likes",
	"refer":"refer",
	"refers":"refers",
	"very":"hella",
	"relax":["chill","chillax"],
	"good":["tight","kickin'","sick","wicked","funky"],
	"great":["tight","kickin'","sick","wicked","funky"],
	"excellent":["tight","kickin'","sick","wicked","funky"],
	"gang":"posse",
	"group":"posse",
	"little":"lil'",
	"allright":"a'ight",
	"alright":"a'ight",
	"phone":"foam",
	"telephone":"foam",
	"themselves":"theysef's",
	"both":"bo'f"
};

function doYoThang(){
	var nodesWithText = document.evaluate(
		"//body//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
		);

	var shizzleHeavyPercent = shizzleHeavy/100;
	while(shizzleHeavyPercent > 0){
		for(var i = 0; i < nodesWithText.snapshotLength; i++) {
			var node = nodesWithText.snapshotItem(i);
			if(!node.parentNode.title)node.parentNode.title = node.textContent;
			node.textContent = node.textContent.snizzle(shizzleHeavyPercent);
		}
		shizzleHeavyPercent -= 100;
	}
}

if(autoSnizzle){
	doYoThang();
}else{
	var htmlDiv = document.createElement("div");
	htmlDiv.id = "GetBizzay";
	htmlDiv.style.position = "absolute";
	htmlDiv.style.padding = "3px";
	htmlDiv.style.cursor = "pointer";
	htmlDiv.style.border = "1px outset";
	htmlDiv.style.backgroundColor = "black";
	htmlDiv.style.color = "red";
	htmlDiv.innerHTML = 'Snizzlate!';
	document.body.insertBefore(htmlDiv, document.body.firstChild);
	htmlDiv.style.left = window.innerWidth - htmlDiv.clientWidth - 20;

	document.getElementById("GetBizzay").addEventListener('click', doYoThang, true);
}
