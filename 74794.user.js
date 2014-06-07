// ==UserScript==
// @name        Idiot Filter
// @namespace   
// @description Filter SMS-like abbreviations and incorrect spellings in posts created by your friends on Facebook etc
// @include     http://userscripts.org/scripts/show/74794
// @include     http://facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://*.facebook.com/*
// @include     https://mail.google.com/*
// @include     http://*.myspace.com/*
// @include     http://forums.*
// @copyright   2010 BurgersnChips
// @license     GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @version     0.4 - Beta release
// ==/UserScript==

/*

DESCRIPTION:

Idiot Filter is a greasemonkey script that filters away a range
of errors, punctuation marks used improperly and SMS-like
abbreviations. Currently Idiot Filter has these functionalities:

*) Support for English
*) Corrects multiple punctuation marks in a row
*) Corrects multiple vocals in a row
*) Corrects most common spelling mistakes
*) Unicode-aware
*) AJAX-aware

INTERFACE:

The script adds two items to greasemonkey menu:

Idiot Filter statistics: it shows the worst page ever scanned and the
total number of errors corrected

Idiot Filter status: it shows the number of strings scanned and how many
errors has been fixed related to the current page.

The informations are displayed in a box injected in the current
page that remains on the top-left corner for 5 seconds.

TECHNICAL INFORMATIONS:

Basically Idiot Filter enumerates all text nodes of the document's DOM
tree and does some regexp replacements.  The base routine consists
of these passes:

1) It makes an XPath call and enumerates every single text node
2) For all nodes it detects the language attribute
3) Language specific regex replacements are applied to the node
4) Global regex replacements are applied to the node
5) Statistics are updated given new values
6) It intercepts 'DOMNodeInserted' event and applies 1), 2), 3),
4) and 5) given the event's target as root node

Idiot Filter skips 'script', 'pre', 'style', 'code', 'var', 'samp' and
'kbd' nodes by design.

CAVEATS:

There are some caveats with 'DOMNodeInserted'.  Idiot Filter uses
GM_setValue in order to save its statistics and all GM_*
functions belong to chrome world.  Given this we cannot update
statistics in a function spawned by 'document.addEventListener'.

If you use a plugin that blocks javascript like 'NoScript' or if
you have javascript disabled then the information panel created
by selecting one of Idiot Filter's menus will not disappear.  I use the
function 'setTimeout' in order to erase the panel and the
function will not run.  There is no way, as far as I know, to
correct this problem.

HISTORY:

0.4 BurgersnChips modifies "Glord" script adding many definitions.
    Returns to English only.

0.3 Added check for runtime DOM tree's changes.

0.2 Added support for italian

0.1 Initial release. Support for english

THANKS:

Idiot Filter has been inspired by the script 'Glord', which in turn was
inspired by 'Rllmuk Tidy'. Thanks to Francesco Bigiarini, Mark Pilgrim
and Danny Goodman.

*/

var locale =
{
    "en-US" :
    [
        "Idiot Filter statistics",
        "Idiot Filter has fixed %u errors so far. Worst page ever: %s with %u errors",
        "Idiot Filter status",
        "%u string(s) scanned, fixed %u errors"
    ],
/*
    "it-IT" :
    [
        "Statistiche di Idiot Filter",
        "Idiot Filter ha corretto un totale di %u errori. La peggiore pagina di\
 sempre: %s con %u errori",
        "Stato di Idiot Filter",
        "Scansionate %u stringhe, corretti %u errori"
    ],

    "fr-FR" :
    [
        "Statistique de Idiot Filter",
        "Idiot Filter a fixé un total de %u erreurs. Le pire jamais page: $s\
 avec %u erreurs",
        "Situation de Idiot Filter",
        "%u chaînes de caractères numérisés, fixé au %u erreurs"
    ]
*/
}

function get_text_nodes(root)
{
    return document.evaluate(".//text()[not(ancestor::script) and not(ancestor::pre)\
 and not(ancestor::style) and not(ancestor::code) and not(ancestor::var) and\
 not(ancestor::samp) and not(ancestor::kbd)]", root, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Get all text nodes. We skip (by design) 'pre', 'script', 'style', 'code', 'var',
// 'samp' and 'kbd' tags
var text_nodes = get_text_nodes(document);

var len = text_nodes.snapshotLength;
if(len == 0) return;

var lang = refresh_language(null);
var scanned = 0;
var fixed = 0;

// These are the regular expressions used, grouped by language
var regex =
{
    "en-US" :
    [
		// need to figure out how to avoid changing urls 
		// single letter corrections etc need more careful handling

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EXCEL GENERATED CODE

        [/\b(accordin|acordin|acording)\b/gi, "according"],
        [/\bacros\b/gi, "across"],
        [/\b(actuly|actualy)\b/gi, "actually"],
        [/\b(addy|adress|addres|adres)\b/gi, "address"],
        [/\baftrnoon\b/gi, "afternoon"],
        [/\bagen\b/gi, "again"],
        [/\bagenst\b/gi, "against"],
        [/\bal\b/gi, "all"],
        [/\ballright\b/gi, "alright"],
        [/\baltho\b/gi, "although"],
        [/\b(allways|akways)\b/gi, "always"],
        [/\bn\b/g, "and"],
        [/\b(neone|ne1|any1|ny1|anyonee)\b/gi, "anyone"],
        [/\b(nething|owt|nethin)\b/gi, "anything"],
        [/\br\b/g, "are"],
        [/\b(arnt|arent|rnt)\b/gi, "aren't"],
        [/\b(awsome|awsum|awesum)\b/gi, "awesome"],
        [/\bbby\b/gi, "baby"],
        [/\bbk\b/gi, "back"],
        [/\bb\b/g, "be"],
        [/\b(cos|cuz|bc|coz)\b/gi, "because"],
        [/\bbecomin\b/gi, "becoming"],
        [/\b(be4|b4)\b/gi, "before"],
        [/\b(beginin|beginnin|begining)\b/gi, "beginning"],
        [/\bbein\b/gi, "being"],
        [/\b(beter|betr)\b/gi, "better"],
        [/\bbf\b/gi, "boyfriend"],
        [/\bbreathin\b/gi, "breathing"],
        [/\b(brill|briliant)\b/gi, "brilliant"],
        [/\bbritish\b/gi, "British"],
        [/\bbrok\b/gi, "broke"],
        [/\b(bro|bruva)\b/gi, "brother"],
        [/\bbuildin\b/gi, "building"],
        [/\b(bt|Bt)\b/g, "but"],
        [/\b(buter|buta)\b/gi, "butter"],
        [/\bbyee\b/gi, "bye"],
        [/\bcamra\b/gi, "camera"],
        [/\bcanceled\b/gi, "cancelled"],
        [/\bcanot\b/gi, "cannot"],
        [/\b(carnt|cant|crnt|cnt|carn't|crn't)\b/gi, "can't"],
        [/\bcarefull\b/gi, "careful"],
        [/\bcarefuly\b/gi, "carefully"],
        [/\bchangin\b/gi, "changing"],
        [/\bcolor\b/gi, "colour"],
        [/\b(comin|cumin)\b/gi, "coming"],
        [/\bcud\b/gi, "could"],
        [/\b(cudt|cudnt|couldnt)\b/gi, "couldn't"],
        [/\b(cuttin|cutin)\b/gi, "cutting"],
        [/\bd8\b/gi, "date"],
        [/\bdeprest\b/gi, "depressed"],
        [/\b(dint|didnt)\b/gi, "didn't"],
        [/\bdiff\b/gi, "different"],
        [/\b(dina|dnr|dinr)\b/gi, "dinner"],
        [/\bdoesnt\b/gi, "doesn't"],
        [/\bdoin\b/gi, "doing"],
        [/\bdun\b/gi, "done"],
        [/\b(dont|dnt)\b/gi, "don't"],
        [/\bdrivin\b/gi, "driving"],
        [/\bdurin\b/gi, "during"],
        [/\b(leccy|leky|lekky)\b/gi, "electricity"],
        [/\bengland\b/gi, "England"],
        [/\b(enuf|inuf)\b/gi, "enough"],
        [/\bect\b/gi, "etc."],
        [/\bevenin\b/gi, "evening"],
        [/\b(eva|evar|evr)\b/gi, "ever"],
        [/\b(everythin|evrythin)\b/gi, "everything"],
        [/\bexcitin\b/gi, "exciting"],
        [/\bf8\b/g, "fate"],
        [/\b(fav|favorite|favorit|favourit)\b/gi, "favourite"],
        [/\b(fightin|f8in)\b/gi, "fighting"],
        [/\b(forgoten|forgetten|forgeton|forgeten)\b/gi, "forgotten"],
        [/\b(forwould|4ward)\b/gi, "forward"],
        [/\b(freind|frend)\b/gi, "friend"],
        [/\b(frens|frends)\b/gi, "friends"],
        [/\b(freindly|frendly)\b/gi, "friendly"],
        [/\bfuny\b/gi, "funny"],
        [/\b(gettin|getin)\b/gi, "getting"],
        [/\bgf\b/gi, "girlfriend"],
        [/\bgivin\b/gi, "giving"],
        [/\bgoin\b/gi, "going"],
        [/\b(gd|gud)\b/gi, "good"],
        [/\b(gr8|grate|gret)\b/gi, "great"],
        [/\bad\b/gi, "had"],
        [/\bhadnt\b/gi, "hadn't"],
        [/\b(ant|asnt|hasnt)\b/gi, "hasn't"],
        [/\b(av|ave|hav|hv)\b/gi, "have"],
        [/\b(havent|avent|avnt|havnt|havn't)\b/gi, "haven't"],
        [/\b(havin|avin|aving|haveing|havein|avein|aveing)\b/gi, "having"],
        [/\bed\b/gi, "head"],
        [/\bheadin\b/gi, "heading"],
        [/\bhe'l\b/gi, "he'll"],
        [/\bhelo\b/gi, "hello"],
        [/\bhes\b/gi, "he's"],
        [/\b(hols|hol|vacation)\b/gi, "holiday"],
        [/\bhows\b/gi, "how's"],
        [/\bi\b/g, "I"],
        [/\b(id|Id)\b/g, "I'd"],
        [/\b(i'll|Ill)\b/g, "I'll"],
        [/\b(im|Im)\b/g, "I'm"],
        [/\bin2\b/gi, "into"],
        [/\b(ive|i've|iv)\b/gi, "I've"],
        [/\b(jus|jst)\b/gi, "just"],
        [/\bl8\b/gi, "late"],
        [/\bl8r\b/gi, "later"],
        [/\bleavin\b/gi, "leaving"],
        [/\blets\b/gi, "let's"],
        [/\blyk\b/gi, "like"],
        [/\b(litle|litul)\b/gi, "little"],
        [/\blivin\b/gi, "living"],
        [/\bluv\b/gi, "love"],
        [/\b(lovin|luvin)\b/gi, "loving"],
        [/\b(lyin|liein|lieing)\b/gi, "lying"],
        [/\bmakin\b/gi, "making"],
        [/\b(m8|mayt|mte)\b/gi, "mate"],
        [/\bmater\b/gi, "matter"],
        [/\bmite\b/gi, "might"],
        [/\b(missin|misin|mising)\b/gi, "missing"],
        [/\bmo\b/gi, "moment"],
        [/\b(mornin|morn)\b/gi, "morning"],
        [/\bmovin\b/gi, "moving"],
        [/\bma\b/gi, "my"],
        [/\b(nite|nyt)\b/gi, "night"],
        [/\b(nothin|nowt)\b/gi, "nothing"],
        [/\bpwn\b/gi, "own"],
        [/\b(pwned|pwnd|ownd)\b/gi, "owned"],
        [/\bppl\b/gi, "people"],
        [/\b(pland|planed|plannd)\b/gi, "planned"],
        [/\b(plannin|planin|planing)\b/gi, "planning"],
        [/\b(pls|plz)\b/gi, "please"],
        [/\bprety\b/gi, "pretty"],
        [/\bputtin\b/gi, "putting"],
        [/\bridin\b/gi, "riding"],
        [/\b(runnin|runin|runing)\b/gi, "running"],
        [/\bsed\b/gi, "said"],
        [/\bskool\b/gi, "school"],
        [/\bc\b/g, "see"],
        [/\b(seein|cin)\b/gi, "seeing"],
        [/\b(settin|setin|seting)\b/gi, "setting"],
        [/\b(shakin|shackin|shacking)\b/gi, "shaking"],
        [/\b(shinin|shinnin|shining)\b/gi, "shinning"],
        [/\b(shud|shuld)\b/gi, "should"],
        [/\bsimples\b/gi, "simple"],
        [/\bsis\b/gi, "sister"],
        [/\b(sitin|siting|sittin)\b/gi, "sitting"],
        [/\bsoo\b/gi, "so"],
        [/\b(sum|soem)\b/gi, "some"],
        [/\b(sum1|some1|sumone)\b/gi, "someone"],
        [/\b(summat|sumat|summot|sumot|sumthin|sumthing|somethin|sumthn|sum8)\b/gi, "something"],
        [/\b(sumwere|somewere|sumwhere)\b/gi, "somewhere"],
        [/\b(soz|sowi|sory)\b/gi, "sorry"],
        [/\bstudyin\b/gi, "studying"],
        [/\bsunday\b/gi, "Sunday"],
        [/\bsupose\b/gi, "suppose"],
        [/\b(swimin|swimmin|swiming)\b/gi, "swimming"],
        [/\b(fone|phone)\b/gi, "telephone"],
        [/\btht\b/gi, "that"],
        [/\b(thats|thts)\b/gi, "that's"],
        [/\b(de|v|da|th)\b/gi, "the"],
        [/\b(em|thm|dem)\b/gi, "them"],
        [/\bthn\b/gi, "then"],
        [/\bder\b/gi, "there"],
        [/\btheres\b/gi, "there's"],
        [/\bdey\b/gi, "they"],
        [/\b(fing|ting)\b/gi, "thing"],
        [/\b(fink|tink)\b/gi, "think"],
        [/\bdis\b/gi, "this"],
        [/\bthort\b/gi, "thought"],
        [/\bthru\b/gi, "through"],
        [/\b(tidyed|tidyd)\b/gi, "tidied"],
        [/\b(2day|2dy)\b/gi, "today"],
        [/\b(tomoro|2moro|tomoz|2moz|'moro|tomo)\b/gi, "tomorrow"],
        [/\b(tonite|2nite|2nit|2nyt)\b/gi, "tonight"],
        [/\btryed\b/gi, "tried"],
        [/\buni\b/gi, "University"],
        [/\b(til|untill)\b/gi, "until"],
        [/\busefull\b/gi, "useful"],
        [/\busin\b/gi, "using"],
        [/\bw8\b/gi, "wait"],
        [/\bwasnt\b/gi, "wasn't"],
        [/\b(wernt|wern't)\b/gi, "weren't"],
        [/\bweve\b/gi, "we've"],
        [/\b(wot|wat|whaat)\b/gi, "what"],
        [/\b(woteva|wateva|watever)\b/gi, "whatever"],
        [/\b(wats|wots|watz|wotz)\b/gi, "what's"],
        [/\bwen\b/gi, "when"],
        [/\bhu\b/gi, "who"],
        [/\by\b/g, "why"],
        [/\b(wit|wiv|wid|wi)\b/gi, "with"],
        [/\bwivin\b/gi, "within"],
        [/\bwont\b/gi, "won't"],
        [/\bwud\b/gi, "would"],
        [/\b(wudnt|wudn't|wud'nt|wunt)\b/gi, "wouldn't"],
        [/\bwritin\b/gi, "writing"],
        [/\bwriten\b/gi, "written"],
        [/\brong\b/gi, "wrong"],
        [/\brote\b/gi, "wrote"],
        [/\b(yh|yeh)\b/gi, "yeah"],
        [/\byr\b/gi, "year"],
        [/\byrs\b/gi, "years"],
        [/\bu\b/g, "you"],
        [/\b(ya|yu)\b/gi, "you"],
        [/\b(youd|ud|u'd)\b/gi, "you'd"],
        [/\b(ul|ull|u'l|u'll|you'l)\b/gi, "you'll"],
        [/\b(urself|uself|yrself|yself)\b/gi, "yourself"],

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END OF EXCEL GENERATED CODE

		//multi-word outputs
		[/\bomg\b/gi, "oh my cod"],	// rather than oh my god since we can't know god exists but we do know cod does. to avoid religious debate.
		[/\bofcourse\b/gi, "of course"],
        [/\b(wanna|wana)\b/gi, "want to"],		
        [/\balot\b/gi, "a lot"],
		[/\b(n\x2fa)\b/gi, "N/A"],
		[/\btbh\b/gi, "to be honest"],
		[/\b(could|should|would|couldn't|wouldn't|shouldn't) of\b/gi, "$1 have"],
		[/\btis\b/gi, "it is"],

		// corrections in context (eg prob being short for probably or problem, you and you're, to too and two)
		//coming soon

		// correct for badly structured sentence endings and capital letters - this is a bad method...
		[/(\x2e|\x3f|\x21)\W*a/gi, "$1 A"],
		[/(\x2e|\x3f|\x21)\W*b/gi, "$1 B"],
		[/(\x2e|\x3f|\x21)\W*c/gi, "$1 C"],
		[/(\x2e|\x3f|\x21)\W*d/gi, "$1 D"],
		[/(\x2e|\x3f|\x21)\W*e/gi, "$1 E"],
		[/(\x2e|\x3f|\x21)\W*f/gi, "$1 F"],
		[/(\x2e|\x3f|\x21)\W*g/gi, "$1 G"],
		[/(\x2e|\x3f|\x21)\W*h/gi, "$1 H"],
		[/(\x2e|\x3f|\x21)\W*i/gi, "$1 I"],
		[/(\x2e|\x3f|\x21)\W*j/gi, "$1 J"],
		[/(\x2e|\x3f|\x21)\W*k/gi, "$1 K"],
		[/(\x2e|\x3f|\x21)\W*l/gi, "$1 L"],
		[/(\x2e|\x3f|\x21)\W*m/gi, "$1 M"],
		[/(\x2e|\x3f|\x21)\W*n/gi, "$1 N"],
		[/(\x2e|\x3f|\x21)\W*o/gi, "$1 O"],
		[/(\x2e|\x3f|\x21)\W*p/gi, "$1 P"],
		[/(\x2e|\x3f|\x21)\W*q/gi, "$1 Q"],
		[/(\x2e|\x3f|\x21)\W*r/gi, "$1 R"],
		[/(\x2e|\x3f|\x21)\W*s/gi, "$1 S"],
		[/(\x2e|\x3f|\x21)\W*t/gi, "$1 T"],
		[/(\x2e|\x3f|\x21)\W*u/gi, "$1 U"],
		[/(\x2e|\x3f|\x21)\W*v/gi, "$1 V"],
		[/(\x2e|\x3f|\x21)\W*w/gi, "$1 W"],
		[/(\x2e|\x3f|\x21)\W*x/gi, "$1 X"],
		[/(\x2e|\x3f|\x21)\W*y/gi, "$1 Y"],
		[/(\x2e|\x3f|\x21)\W*z/gi, "$1 Z"],
		

		
		[/\s+/g, " "] //multiple spaces
    ],
/*
    "it-IT" :
    [
        // SMS
        [/\b(ke|k)\b/gi, "che"],
        [/\bsn\b/gi, "sono"],
        [/\bqll(o|a)\b/gi, "quell$1"],
        [/\bnn\b/gi, "non"],
        [/\bx\b/gi, "per"],
        [/\bcmq\b/gi, "comunque"],
        [/\bcn\b/gi, "con"],
        [/\banke\b/gi, "anche"],
        [/\bpok(a|o)\b/gi, "poc$1"],
        [/\bpok(e|i)\b/gi, "poch$1"],
        [/\bqnd\b/gi, "quando"],
        [/\bsn\b/gi, "sono"],
        [/\bspt\b/gi, "soprattutto"],
        [/\bnnt\b/gi, "niente"],
        [/\bqlk1\b/gi, "qualcuno"],
        [/\b(?:perch|xch|xk|x)(?:è|é)(\W|$)/gi, "perché$1"],

        // Common errors
        [/\b(sicch|acciocch)\u00E8(\W|$)/gi, "$1é$2"],
        [/\bpropi(o|a)?\b/gi, "propri$1"],
        [/\bp\u00F2(\W|$)/gi, "po'$1"],
        [/\b(?:e'|é)/g, "è"],
        [/\bE'/g, "È"]
    ],

    "fr-FR" :
    [
        // SMS
        [/\b(A|@)\+\b/gi, "À plus"],
        [/\bA12C4\b/gi, "À un de ces quatres"],
        [/\b(a|@)m1+\b/gi, "À demain"],
        [/\bALP\b/gi, "À la prochaine"],
        [/\bAMHA\b/gi, "À mon humble avis"],
        [/\bALP\b/gi, "À la prochaine"]
    ],
*/
    "var" :
    [
        [/!(?:[!1]|one)+/gmi, "! "],
        [/\.\.\.(?:\.)+/gmi, "... "],
        [/\?\?+(\)|\]|\})/gmi, "?$1"],
        [/\?\?+/gmi, "? "],
        [/(a{2})[a]+/gmi, "$1"],														// these lines prevent words having
		[/(b{2})[b]+/gmi, "$1"],														// excessive continuous characters
		[/(c{2})[c]+/gmi, "$1"],														// eg helloooooooooooooo
		[/(d{2})[d]+/gmi, "$1"],
		[/(e{2})[e]+/gmi, "$1"],
		[/(f{2})[f]+/gmi, "$1"],
		[/(g{2})[g]+/gmi, "$1"],
		[/(h{1})[h]+/gmi, "$1"],
		[/(i{1})[i]+/gmi, "$1"],
		[/(j{1})[j]+/gmi, "$1"],
		[/(k{1})[k]+/gmi, "$1"],
		[/(l{2})[l]+/gmi, "$1"],
		[/(m{2})[m]+/gmi, "$1"],
		[/(n{2})[n]+/gmi, "$1"],
		[/(o{2})[o]+/gmi, "$1"],
		[/(p{2})[p]+/gmi, "$1"],
		[/(q{1})[q]+/gmi, "$1"],
		[/(r{2})[r]+/gmi, "$1"],
		[/(s{2})[s]+/gmi, "$1"],
		[/(t{2})[t]+/gmi, "$1"],
		[/(u{1})[u]+/gmi, "$1"],
		[/(v{1})[v]+/gmi, "$1"],
		[/(w{3})[w]+/gmi, "$1"],
		[/(x{2})[x]+/gmi, "$1"],
		[/(y{1})[y]+/gmi, "$1"],
		[/(z{2})[z]+/gmi, "$1"],
    ]
};

// The information is shown in a panel at the top-left corner of the page
function info_panel(message)
{
    if(!message) return;

    var ne = document.getElementById("Idiot_Filter_popup");

    if(!ne) ne = document.createElement('div');
    else ne.innerHTML = "";

    ne.id = "Idiot_Filter_popup";
    ne.style.position = "fixed";
    ne.style.width = "30%";
    ne.style.top = "1em";
    ne.style.left = "1em";
    ne.style.zIndex = "100";
    ne.style.padding = "6px";
    ne.style.backgroundColor = "black";
    ne.style.color = "white";
    ne.style.fontSize = "12px";
    ne.style.fontFamily = "Verdana, Helvetica, Arial, sans-serif";
    ne.style.opacity = "0.95";
    ne.style.MozBorderRadius = "4px";

    var t = document.createElement('p');
    var b = document.createElement('p');

    t.style.margin = b.style.margin = "0";
    t.style.fontWeight = "bold";
    t.style.width = "auto";
    b.style.marginTop = "4px";
    b.style.width = "auto";

    t.innerHTML = "Idiot Filter";
    b.innerHTML = message;

    ne.appendChild(t);
    ne.appendChild(b);

    document.body.appendChild(ne);

    // The dialog disappears after 5 seconds.
    setTimeout(function()
    {
     var del = document.getElementById("Idiot_Filter_popup");
       del.parentNode.removeChild(del);
    }, 5000);
}

// Transform ISO 639 code to default ISO 639 and ISO 3166.
function transform_language_tag(language, force)
{
    var ret = "";

    if(!language || language == "") ret = "en-US";
    else if(language == "en") ret = "en-US";
    else if(language == "it") ret = "it-IT";
    else if(language == "fr") ret = "fr-FR";
    else if(force && locale[language] == undefined)
        ret = "en-US";
    else ret = language;

    return ret;
}

// Refresh current language if the DOM node has the 'lang' attribute.
function refresh_language(tag)
{
    var ret = "";
    var node = tag;

    if(tag == null) ret = document.documentElement.lang;
    else
    {
        do
        {
            node = node.parentNode;

            if(node.lang != "")
            {
                ret = node.lang;
                break;
            }
        } while(node);
    }

    return transform_language_tag(ret, false);
}

// Detected DOM tree's modifications
function doc_changed(node)
{
    text_nodes = get_text_nodes(node);

    len = text_nodes.snapshotLength;
    if(len == 0) return;

    fix(false);
}

// Fix errors
function fix(update_values)
{
    for(var i = 0; i < len; ++i)
    {
        var node = text_nodes.snapshotItem(i);
        var name = node.parentNode.nodeName;
        var llen = 0;
        var j = 0;
        var data = node.data;
        var ts = "";
        var ifixed = fixed;

        // If node is empty we skip it (spaces between html tags are considered text nodes)
        if(data.length == 0 || data.match(/^\s+$/)) continue;

        lang = refresh_language(node);
        ++scanned;

		// Punctuation and other oddities
        for(j = 0, llen = regex["var"].length; j < llen; ++j)
        {
            ts = data.replace(regex["var"][j][0], regex["var"][j][1])
			ts = ts[0].toUpperCase() + ts.substr(1);

/*		var bNextUpper = false;
        for (var z=0; z<ts.length; z++) {
        	
        	if (bNextUpper && ts[z] != ' ') {
        	
        		var repChar = ts[z].toUpperCase();
        		bNextUpper = false;	
        		
        		if (repChar != ts[z]) {
        			
        			ts = ts.substr(0, z) + repChar + ts.substr(z+1);
        			z = 0;
        		}
        	}
        
        	if (ts[z] == '.' || ts[z] == '!' || ts[z] == '?') {
      			bNextUpper = true;
        	}
        }
*/
			
            if(ts != data)
            {
                ++fixed;
                data = ts;
            }
        }
		
        // Language specific fixes
        if(lang && regex[lang] != undefined)
        {
            for(j = 0, llen = regex[lang].length; j < llen; ++j)
            {
                ts = data.replace(regex[lang][j][0], regex[lang][j][1]);

                if(ts != data)
                {
                    ++fixed;
                    data = ts;
                }
            }
	    }

        if(fixed > ifixed) node.data = data;
    }

    if(fixed > 0)
    {
        var blang = transform_language_tag(navigator.language, true);

        // We can't update statistics when we intercept DOM tree's changes. GM_* functions
        // belong to chrome world
        if(update_values == true)
        {
            var all_fixed = GM_getValue('fixedErrors');
            var worst_page = GM_getValue('worstPage');
            var worst_count = GM_getValue('worstCount');

            if(all_fixed) all_fixed += fixed;
            else all_fixed = fixed;

            if(!worst_page || !worst_count || (worst_page && worst_count && fixed >
                worst_count))
            {
                worst_count = fixed;
                worst_page = window.location.href;
                GM_setValue('worstPage', worst_page);
                GM_setValue('worstCount', worst_count);
            }

            GM_setValue('fixedErrors', all_fixed);

            var url_short = worst_page.replace(/^(?:http|https|ftp|file):\/\//, "");
            var url_len = url_short.length;

            if(url_len > 45) url_short = url_short.substr(0, 21) + '...' +
                url_short.substr(url_len - 22);

            var str = locale[blang][1].replace(/%u/i, all_fixed);
            str = str.replace(/%s/i, '<a href="' + worst_page + '">' + url_short +
                "</a>");
            str = str.replace(/%u/i, worst_count);

            GM_registerMenuCommand(locale[blang][0], function() { info_panel(str) });
    }

        var str2 = locale[blang][3].replace(/%u/i, scanned);
        str2 = str2.replace(/%u/i, fixed);

        // Insert a menu item that show how many errors have been fixed
        GM_registerMenuCommand(locale[blang][2], function() { info_panel(str2) });
    }
}

// Fix errors
fix(true);

// Intercept runtime changes
document.addEventListener("DOMNodeInserted", function(event) {
    doc_changed(event.target); }, false);