
// CutSpel: simplify english spelling Basd on DumbQuotes by Mark Pilgrim
// Copyright 2007 Joseph Huang

/* This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */

// 
//
// ==UserScript==
// @name          CutSpel
// @description   convrt text to cut speling
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------
//

var replacements, regex, key, textnodes, node, s;

String.prototype.capitalize = function(){
   return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.substr(1);
    });
};

replacements = {
    "although":"altho",
    "alphabet":"alfabet",
    "asthma":"asma",
    "phonics":"fonics",
    "phonetic":"fonetic",
    "phonetics":"fonetics",
    "phoneme":"foneme",
    "phonemes":"fonemes",
    "grapheme":"grafeme",
    "orthography":"orthografy",
    "orthographic":"orthografic",
    "phase":"fase",
    "phonographic":"fonografic",
    "doubt":"dout",
    "eval":"eval",
    "ever":"evr",
    "marketable":"marketbl",
    "marketed":"marketd",
    "offer":"ofr",
    "offers":"ofrs",
    "often":"ofn",
    "ought":"ouht",
    "toString":"toString",
    "object":"object",
    "constructor":"constructr",
    "offered":"ofrd",
    "offering":"ofrng",
    "marketer":"marketr",
    "master":"mastr",
    "plus":"+",
    "government":"state",
    "governments":"states",
    "really":"realy",
    "ideology":"ideolojy",
    "oppressed":"opresd",
    "flavour":"flavr",
    "flavor":"flavr",
    "thorough":"thoro",
    "telephone":"telefone",
    "phones":"fones",
    "phoned":"foned",
    "laugh":"laf",
    "cough":"cof",
    "though":"tho",
    "through":"thoro",
    "thought":"thout",
    "thoroughfare":"thorofare",
    "rough":"ruf",
    "trough":"trof",
    "printer":"printr",
    "enough":"enuf",
    "does":"doz",
    "well":"wel",
    "tough":"tuf",
    "light":"lite",
    "bright":"brite",
    "flight":"flite",
    "night":"nite",
    "power":"powr",
    "tonight":"tonite",
    "overnight":"overnite",
    "never":"nevr",
    "be":"b",
    "you": "u",
    "because":"bcuz",
    "are": "r",
    "and": "&",
    "your": "ur",
    "through": "thru",
    "throughway":"thruway",
    "would": "wud",
    "which": "wich",
    "good":"gud",
    "there": "ther",
    "all": "al",
    "their":"ther",
    "what":"wot",
    "could": "cud",
    "beautiful": "butiful",
    "head": "hed",
    "before":"b4",
    "learn": "lern",
    "lesson":"lessn",
    "lessons":"lessns",
    "small":"smal",
    "organ":"orgn",
    "there": "ther",
    "were": "wer",
    "of":"ov",
    "over":"ovr",
    "leaving":"levng",
    "building":"buildng",
    "where": "wher",
    "when":"wen",
    "friend": "frend",
    "have":"hav",
    "one": "1",
    "other":"othr",
    "centre":"centr",
    "physics":"fysics",
    "center":"centr",
    "little":"litl",
    "will":"wil",
    "who":"hu",
    "more":"mor",
    "two":"2",
    "phone":"fone",
    "phonic":"fonic",
    "not":"¬",
    "interest":"intrest",
    "interested":"intrestd",
    "interestng":"intrestng",
    "pi":"\u03C0",
    "infinity":"\u221E",
    "see":"c",
    "1-half":"\u00BD",
    "a half":"\u00BD",
    "a Half":"\u00BD",
    "should":"shud",
    "why":"y",
    "other":"othr",
    "people":"ppl",
    "usually":"usuly",
    "welcome":"welcm",
    "personal":"persnl",
    "snow":"sno",
    "temperature":"tempratur",
    "clock":"clok",
    "calendar":"calendr",
    "equals": "=",
    "equal":"=",
    "debt":"det",
    "friend":"frend",
    "phony":"fony",
    "three":"3",
    "or":"|",
    "love":"lov",
    "at":"@",
    "four":"4",
    "fourth":"4th",
    "better":"betr",
    "and":"&",
    "watch":"watch",
    "recommend":"recomend",
    "write":"rite",
    "wrist":"rist",
    "writ":"rit",
    "writs":"rits",
    "know":"no",
    "knows":"noz",
    "knowed":"noed",
    "knowing":"noing",
    "knowable":"noabl",
    "knowledge":"nolej",
    "knowledgeable":"nolejbl",
    "differing":"difring",
    "difficult":"dificlt",
    "difficulty":"dificlty",
    "right":"rite",
    "righted":"rytd",
    "righteous":"ryteus",
    "change":"chanje",
    "phonemic":"fonemic",
    "with":"wth",
    "anyone":"any1",
    "someone":"sum1",
    "photo":"foto",
    "photograph":"fotograf",
    "photographs":"fotografs",
    "photographer":"fotografr",
    "into":"in2",
    "information":"info",
    "professional":"professnl",
    "okay":"k",
    "other":"othr",
    "office":"ofice",
    "phony":"fony",
    "phonies":"fonies",
    "pornography":"pornografy",
    "puzzle":"puzl",
    "the":"th",
    "was":"wuz",
    "known":"noen",
    "read":"reed",
    "too":"2",
    "has":"haz",
    "to":"2",
    "is":"iz",
    "copyright":"copyrite",
    "even":"evn",
    "hacker":"hackr",
    "selling":"selng",
    "microsoft":"MS",
    "as":"az",
    "technology":"technlgy",
    "first":"1st",
    "introduction":"intro",
    "programmer":"programr",
    "programming":"programng",
    "full":"ful",
    "level":"levl",
    "after":"aftr",
    "computer":"computr",
    "computers":"computrs",
    "department":"departmnt",
    "professor":"profesr",
    "advanced":"advancd",
    "common":"comn",
    "follow":"folo",
    "following":"folong",
    "that":"tht",
    "accommodate":"acomodat",
    "became":"bcame",
    "events":"evnts",
    "labeling":"lablng",
    "horror":"horr",
    "understand":"undrstnd",
    "summer":"sumr",
    "year":"yr",
    "occur":"ocr",
    "college":"colej",
    "cheap":"cheep",
    "cannot":"can¬",
    "above":"abov",
    "peeve":"peev",
    "major":"majr",
    "leave":"leev",
    "some":"sum",
    "error":"eror",
    "reader":"reedr",
    "message":"mesej",
    "another":"anothr",
    "seller":"selr",
    "mean":"meen",
    "means":"meens",
    "memorize":"memorize",
    "might":"mite",
    "each":"eech",
    "problem":"problm",
    "different":"difrnt",
    "for":"4",
    "zero":"0",
    "search":"seerch",
    "reason":"reesn",
    "operate":"opr8",
    "control":"contrl",
    "popular":"populr",
    "admission":"admissn",
    "happens":"hapns",
    "dream":"dreem",
    "paperless":"paprless",
    "dismal":"disml",
    "experience":"xperince",
    "model":"modl"
    };
regex = {
//"Þ":/th/gi,
" r ":/'re\b/g,
//"¬ ":/n't\b/g
};
//regex["not"] = new RegExp("\\banti", 'gi')


textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    var words = new Array();
    words = s.split(/\b/g);
    for (var ind = 0; ind < words.length; ind++ ) {
	word = words[ind]
	if(replacements[word] )
		words[ind] = replacements[word];
	else if (replacements[word.charAt(0).toLowerCase() + word.substr(1)])
		words[ind] = replacements[word.charAt(0).toLowerCase() + word.substr(1)].capitalize();
    }
    s = words.join('')
    for ( key in regex) {
    	s = s.replace(regex[key], key)
    }
    node.data = s;
}