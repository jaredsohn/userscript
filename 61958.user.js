// ==UserScript==
// @name        Improve spelling and grammar in Reddit comments
// Original     http://userscripts.org/scripts/discuss/11275
// Improved by  monogram on reddit.com
//              ax on stackoverflow.com
// @description Replaces poor spelling and grammar and capitalises the first letter of sentences.
// @include     http://www.reddit.com/*
// ==/UserScript==

// Although this is written to alter comments on Reddit, it would be trivial
// to modify it to work on other forums, Facebook etc.

// Select all comment text, but exclude bold/italic/link text
// as those will otherwise have the first letter capitalised
var textnodes = document.evaluate(
    "//div[@class='md']//*[not(self::em or self::code or self::strong or self::a)]/text()",
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

// If post text was found, attempt to tidy it up
if (textnodes.snapshotLength > 0)
{
    var ciReplacements, csReplacements, nonWordReplacements, regex, key, node, s;

    regex = {};

    // Case insensitive replacements
    ciReplacements =
    {
        // Mis-spellings
        "absense":"absence",
        "absolutly":"absolutely",
        "accomodat(ion|e|ed|es|ing)":"accommodat$1",
        "acomodat(ion|e|ed|es|ing)":"accommodat$1",
        "acommodat(ion|e|ed|es|ing)":"accommodat$1",
        "adminstration":"administration",
        "adress(|es|ed)":"address$1",
        "amatuer(|s)":"amateur$1",
        "antartica":"Antarctica",
        "any1":"anyone",
        "aparently":"apparently",
        "arguement(|s)":"argument$1",
        "arnt":"aren't",
        "athiesm":"atheism",
        "athiest":"atheist",
        "(coz|becasue)":"because",
        "beastiality":"bestiality",
        "beautifull":"beautiful",
        "belei(f|fs|ve|ves)":"belie$1",
        "calender":"calendar",
        "cancelation":"cancellation",
        "catagory":"category",
        "commision":"commission",
        "congradulations":"congratulations",
        "congrats":"congratulations",
        "consistant":"consistent",
        "definate":"definite",
        "definately":"definitely",
        "developement":"development",
        "(D|d)idnt":"$1idn't",
        "(D|d)ont":"$1on't",
        "enviroment":"environment",
        "explaination":"explanation",
        "embaras+(ment|ed|ing)":"embarrass$1",
        "embras+(ment|ed|ing)":"embarrass$1",
        "febuary":"February",
        "februry":"February",
        "foriegn":"foreign",
        "freind":"friend",
        "gonna":"going to",
        "gotta":"got to",
        "grammer":"grammar",
        "har+as(|ed|ing|ment)":"harass$1",
        "harras(|ed|ing|ment)":"harass$1",
        "harrass(|ed|ing|ment)":"harass$1",
        "irregardless":"regardless",
        "independant":"independent",
        "indispensible":"indispensable",
        "inteligent":"intelligent",
        "intrest":"interest",
        "jewelry":"jewellery",
        "jsut":"just",
        "lazer":"laser",
        "lesbain":"lesbian",
        "maintainance":"maintenance",
        "maintenence":"maintenance",
        "millenium":"millennium",
        "miniscule":"minuscule",
        "moniter":"monitor",
        "necces+(a|e)r(y|ily)":"necessar$2",
        "neces(a|e)r(y|ily)":"necessar$2",
        "necesser(y|ily)":"necessar$1",
        "noticable":"noticeable",
        "nucular":"nuclear",
        "oc+ur(|ence|ed|ing|ed|s)":"occurr$1",
        "offical":"official",
        "omelet":"omelette",
        "omelete":"omelette",
        "oml(ete|ette)":"omelette",
        "perscription":"prescription",
        "perseverence":"perseverance",
        "pissin":"pissing",
        "pls":"please",
        "ppl":"people",
        "prefered":"preferred",
        "prolly":"probably",
        "psuedo":"pseudo",
        "recieve":"receive",
        "reciept":"receipt",
        "reccom+end(|ed|s)":"recommend$1",
        "recomend(|ed|s)":"recommend$1",
        "rediculous":"ridiculous",
        "relise":"realise",
        "remeber":"remember",
        "rythm":"rhythm",
        "sentance":"sentence",
        "seperate":"separate",
        "seperete":"separate",
        "sequal":"sequel",
        "suces+(|ful)":"success$1",
        "succes(|ful)":"success$1",
        "suceed":"succeed",
        "supercede":"supersede",
        "stoopid":"stupid",
        "teh":"the",
        "thro":"through",
        "tehm":"them",
        "thier":"their",
        "(t|T)hats":"$1hat's",
        "tho":"though",
        "un+ecces+(a|e)r(y|ily)":"unnecessar$2",
        "un+eces(a|e)r(y|ily)":"unnecessar$2",
        "unecess(a|e)r(y|ily)":"unnecessar$2",
        "unfortunatly":"unfortunately",
        "unoticable":"unnoticeable",
        "unnoticable":"unnoticeable",
        "untill":"until",
        "wana":"want to",
        "wanna":"want to",
        "wd":"would",
        "wdnt":"wouldn't",
        "wensday":"Wednesday",
        "wouldnt":"wouldn't",
        "wid":"with",
        "wierd":"weird",
        "(christmas|xmas)":"Christmas",
        "xian":"Christian",
        "youre":"you're",

        "imho":"IMHO",
        "imo":"IMO",
        "lol":"LOL",
        "lmao":"LMAO",
        "tbh":"TBH",

        // Grammar and punctuation
        "would of":"would have",
        "could of":"could have",
        "should of":"should have",
        "wouldnt of":"wouldn't have",
        "couldnt of":"couldn't have",
        "shouldnt of":"shouldn't have",
        "wouldn't of":"wouldn't have",
        "couldn't of":"couldn't have",
        "shouldn't of":"shouldn't have",
        "must of":"must have",
        "\\sive":" I've",

        "off it's":"off its",
        "through it's":"through its",
        "past it's":"past its",
        "over it's":"over its",
        "by it's":"by its",
        "gets it's":"gets its",
        "opposite it's":"opposite its",
        "under it's":"under its",
        "behind it's":"behind its",

        "\\su\\s":" you ",
        "\\bu\\s":"You ",
        "(H|h)avent":"$1aven't",
        "(D|d)oesnt":"$1oesn't",
        "(H|h)es":"$1e's",
        "(S|s)hes":"$1he's",
        "alot":"a lot",
        "alright":"all right",
        "aswell":"as well",
        "infact":"in fact",
        "could care less":"couldn't care less",
        "thankyou":"thank you"
    };
    for (key in ciReplacements)
    {
        regex[key] = new RegExp("\\b" + key + "\\b", 'ig');
    }

    // Case sensitive replacements
    csReplacements =
    {
        // Grammar and punctuation
        "i":"I",
        "i'":"I'",
        "(i|I)m":"I'm",
        "(i|I)v(e|)":"I've",
        "(i|I)d":"I'd",
        "monday":"Monday",
        "tuesday":"Tuesday",
        "wednesday":"Wednesday",
        "thursday":"Thursday",
        "friday":"Friday",
        "saturday":"Saturday",
        "sunday":"Sunday",
        "hitler":"Hitler",
        "obama":"Obama",
        "americ(a|an)":"Americ$1",
        "brit(ish|ain)":"Brit$1",
        "canad(a|ian)":"Canad$1",
        "chin(a|ese)":"Chin$1",
        "danish":"Danish",
        "engl(ish|and)":"Engl$1",
        "fr(ance|ench)":"Fr$1",
        "ir(ish|eland)":"Ir$1",
        "german(|y)":"German$1",
        "mexic(o|an)":"Mexic$1",
        "norwegian":"Norwegian",
        "scot(tish|land)":"Scot$1",
        "w(ales|elsh)":"W$1",
        "rspca":"RSPCA"
    };
    for (key in csReplacements)
    {
        regex[key] = new RegExp("\\b" + key + "\\b", 'g');
    }

    // Non-word replacements
    nonWordReplacements =
    {
        "!(?:[!1]|one)+":"!" // Replaces !!11one style exclamations with a single !
    };
    for (key in nonWordReplacements)
    {
        regex[key] = new RegExp(key, "i");
    }

    for (var i = 0; i < textnodes.snapshotLength; i++)
    {
        node = textnodes.snapshotItem(i);
        s = node.data;

        // remove multiple spaces
        s = s.replace(/\s+/g, ' ');
        
        // remove prepending spaces
        // s = s.replace(/^\s+/g, '');
        
        // remove spaces before punctuation
 		s = s.replace(/ (\.|,|!|\?)/g, '$1');
        	
        // uppercase the first character
        if (s.length > 1)
        	s = s[0].toUpperCase() + s.substr(1);
        	
        // uppercase after some types of punctuation
        var bNextUpper = false;
        for (var j=0; j<s.length; j++) {
        	
        	if (bNextUpper && s[j] != ' ') {
        	
        		var repChar = s[j].toUpperCase();
        		bNextUpper = false;	
        		
        		if (repChar != s[j]) {
        			
        			s = s.substr(0, j) + repChar + s.substr(j+1);
        			j = 0;
        		}
        	}
        
        	if (s[j] == '.' || s[j] == '!' || s[j] == '?') {
      			bNextUpper = true;
        	}
        }

        for (key in ciReplacements)
        {
            s = s.replace(regex[key], ciReplacements[key]);
        }
        for (key in csReplacements)
        {
            s = s.replace(regex[key], csReplacements[key]);
        }
        for (key in nonWordReplacements)
        {
            s = s.replace(regex[key], nonWordReplacements[key]);
        }
        node.data = s;
    }
}