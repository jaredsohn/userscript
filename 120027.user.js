// ==UserScript==
// @name            Macedonian/Serbian Latin to Cyrillic
// @description     Web site conversion of Macedonian/Serbian from Latin to Cyrillic
// @source          http://userscripts.org./scripts/show/120027
// @identifier      http://userscripts.org./scripts/source/120027.user.js
// @version         1.2
// @date            2010-12-09
// @author          Jove Bocevski
// @namespace       http://fambo.50webs.com/earn
// @include         *
// ==/UserScript==


/*
Based on serbianmacedonian_cyrill + (http://userscripts.org./scripts/show/89938)
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
	obstring +=	'Gј:"Ѓ", gј:"ѓ", Dz:"Ѕ", dz:"ѕ", lj:"љ", Lj:"Љ", Nj:"Њ", nj:"њ", Dž:"Џ", dž:"џ", дж:"џ", A:"A", a:"a", B:"Б", b:"б", V:"В", v:"в", G:"Г", g:"г",'
	+		'D:"Д", d:"д", Е:"E", е:"e", Є:"Je", є:"je", Ž:"Ж", Ї:"Ï", ї:"ï", z:"з", I:"И", i:"и", І:"I", і:"i", Й:"J", й:"j", j:"Ј", j:"ј",'
	+		'К:"K", k:"к", Ḱ:"Ќ", ḱ:"ќ", L:"Л", l:"л", N:"Н", n:"н", О:"O", о:"o", P:"П", p:"п", R:"Р", r:"р", S:"С", s:"с", Т:"T", t:"т",'
	+		'Ћ:"Ч", ћ:"ч", ž:"ж", Ǵ:"Ѓ", ǵ:"ѓ", Đ:"Џ", đ:"џ", Z:"З", Ј:"J", ј:"j", М:"M", m:"м", U:"У", u:"у", Ŭ:"Ў", ŭ:"ў", ć:"ч",'
	+		'F:"Ф", f:"ф", H:"Х", h:"х", C:"Ц", c:"ц", Č:"Ч", č:"ч", Š:"Ш", š:"ш", Щ:"ШЧ", Ъ:"’’", ъ:"’’", Ы:"Y", ы:"y", ь:"’", Ѣ:"Ě", ѣ:"ě", Ѫ:"Ȧ", ѫ:"ȧ", Ѳ:"Ḟ", ѳ:"ḟ", Ѵ:"Ẏ", ѵ:"ẏ",';
	}

if(transliterate_rus2 == true)	
	{	
	obstring +=	'Ь:"’", Э:"Ė", э:"ė", Ю:"Ju", ю:"ju", Я:"Ja", я:"ja", щ:"ШЧ",'
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