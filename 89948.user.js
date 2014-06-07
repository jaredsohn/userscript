// ==UserScript==
// @name            Serbian Latin to Cyrillic
// @description     Web site conversion of Serbian Latin to Cyrillic
// @source          http://userscripts.org./scripts/show/89948
// @identifier      http://userscripts.org./scripts/source/89948.user.js
// @version         1.0
// @date            2010-11-07
// @author          Martin Podolak
// @namespace       http://podolak.net/translit
// @include         *
// ==/UserScript==


/*
Based on Pridelands.ru - Polsko Rosyjska transliteracja (transkrypcja) + Tłumaczenie menu 0.7 BETA by Nitrol (http://userscripts.org./scripts/show/80413)
*/

var words = {};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}

transliterate_rus1 = true;

transliterate_rus2 = true;

var obstring = 'var transliterations = {';
if(transliterate_rus1 == true)
	{
	obstring +=	'"Dz":"Ѕ", "dz":"ѕ", "Lj":"Љ", "lj":"љ", "Nj":"Њ", "nj":"њ", "Dž":"Џ", "dž":"џ", A:"A", a:"a", B:"Б", b:"б", V:"В", v:"в", G:"Г", g:"г", D:"Д", d:"д", E:"Е", e:"е", Ž:"Ж",'
	+		'z:"з", I:"И", i:"и", I:"І", i:"і", J:"Й", j:"й", J:"Ј", j:"ј", K:"К", k:"к", Ḱ:"Ќ", ḱ:"ќ",'
	+		'L:"Л", l:"л", N:"Н", n:"н", O:"О", o:"о", P:"П", p:"п", R:"Р", r:"р", S:"С", s:"с", T:"Т", t:"т",'
	+		'Ć:"Ћ", ć:"ћ", ž:"ж", Ǵ:"Ѓ", ǵ:"ѓ", Đ:"Ђ", đ:"ђ", Z:"З", M:"М", m:"м", U:"У", u:"у", Ŭ:"Ў", ŭ:"ў",'
	+		'F:"Ф", f:"ф", H:"Х", h:"х", C:"Ц", c:"ц", Č:"Ч", č:"ч", Š:"Ш", š:"ш",';
	}

if(transliterate_rus2 == true)	
	{	
	obstring +=	'Э:"E", э:"e", Ю:"Ju", ю:"ju", Я:"Ja", я:"ja",'
	+		'Ё:"Ë", ё:"ë" ,';
	}

obstring += '};';
eval(obstring);

function defined(v)
	{
	return v != undefined;
	}

function translate(text)
	{
	if(!defined(text) || !text.match) 
		return undefined;
	
//	text = text.replace(/^\s*/, "").replace(/\s*$/, "");

	if(text == "")
		return undefined;

	var translation = "";

	for(var i = 0; i < text.length; i++)
		{
		rus1 = text.charAt(i);

		transliteration = transliterations[rus1];

		if(defined(transliteration))
			translation += transliteration;

		else
			translation += rus1;
		}
	
	return translation;
	}

function translateTree(a)
	{
	var items = document.evaluate("descendant::*", a, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(var i = 0; i < items.snapshotLength; i++)
		{
		var e = items.snapshotItem(i);
		
		for(var j = 0; j < e.childNodes.length; j++)
			{
			var elem = e.childNodes[j];

			if(elem.nodeType == 3)
				{
				var text = translate(elem.wholeText);
				if(defined(text))
					elem.replaceWholeText(text);
				} 

			else
				{
				var text = translate(elem.value);
				if(defined(text))
					elem.value = text;
				}
			}
		}
	}

translateTree(document.body);