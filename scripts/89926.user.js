// ==UserScript==
// @name            Cyrillic transliteration GOST 7.79B
// @description     Full-page Romanization of Cyrillic according to GOST 7.79B standards. Converts Cyrillic letters on web sites to Latin transliteration
// @source          http://userscripts.org./scripts/show/89926
// @identifier      http://userscripts.org./scripts/source/89926.user.js
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
	obstring +=	'A:"A", a:"a", Б:"B", б:"b", В:"V", в:"v", Г:"G", г:"g", Ґ:"G`", ґ:"g`", Д:"D", д:"d", Е:"E", е:"e", Є:"Ye", є:"ye", Ж:"Zh",'
	+		'Yi:"Ï", ї:"yi", з:"z", Ѕ:"Z`", ѕ:"z`", И:"I", и:"i", І:"I", і:"i", Й:"J", й:"j", К:"K", к:"k", Ќ:"K`", ќ:"k`",'
	+		'Л:"L", л:"l", Љ:"L`", љ:"l`", Н:"N", н:"n", Њ:"N`", њ:"n`", О:"O", о:"o", П:"P", п:"p", Р:"R", р:"r", С:"S", с:"s", Т:"T", т:"t",'
	+		'Ћ:"C`", ћ:"c`", ж:"zh", Ѓ:"G`", ѓ:"g`", D:"D`", ђ:"d`", З:"Z", Ј:"J", ј:"j", М:"M", м:"m", У:"U", у:"u", Ў:"U`", ў:"u`",'
	+		'Џ:"Dh", џ:"dh", Ф:"F", ф:"f", Х:"X", х:"x", Ц:"C", ц:"c", Ч:"Ch", ч:"ch", Ш:"Sh", ш:"sh", Щ:"Shh", Ъ:"``", ъ:"``", Ы:"Y`", ы:"y`", ь:"`", Ѣ:"Ye", ѣ:"ye", Ѫ:"O`", ѫ:"o`", Ѳ:"Fh", ѳ:"fh", Ѵ:"Yh", ѵ:"yh",';
	}

if(transliterate_rus2 == true)	
	{	
	obstring +=	'Ь:"`", Э:"E`", э:"e`", Ю:"Yu", ю:"yu", Я:"Ya", я:"ya", щ:"shh",'
	+		'Ё:"Yo", ё:"yo" ,';
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