// ==UserScript==
// @name            Cyrillic transliteration British Standard
// @description     Full-page Romanization of Cyrillic according to British Standard. Converts Cyrillic letters on web sites to Latin transliteration
// @source          http://userscripts.org./scripts/show/89933
// @identifier      http://userscripts.org./scripts/source/89933.user.js
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
	obstring +=	'A:"A", a:"a", Б:"B", б:"b", В:"V", в:"v", Г:"G", г:"g", Ґ:"G", ґ:"g", Д:"D", д:"d", Е:"E", е:"e", Є:"Ye", є:"ye", Ж:"Zh",'
	+		'Ї:"Ï", ї:"ï", з:"z", Ѕ:"Dz", ѕ:"dz", И:"I", и:"i", І:"I", і:"i", Й:"Ĭ", й:"ĭ", К:"K", к:"k", Ќ:"Ḱ", ќ:"ḱ",'
	+		'Л:"L", л:"l", Љ:"Lj", љ:"lj", Н:"N", н:"n", Њ:"Nj", њ:"nj", О:"O", о:"o", П:"P", п:"p", Р:"R", р:"r", С:"S", с:"s", Т:"T", т:"t",'
	+		'Ћ:"Ć", ћ:"ć", ж:"zh", Ѓ:"Ǵ", ѓ:"ǵ", Ђ:"Đ", ђ:"đ", З:"Z", Ј:"J", ј:"j", М:"M", м:"m", У:"u", у:"u", Ў:"Ŭ", ў:"ŭ",'
	+		'Џ:"Dž", џ:"dž", Ф:"F", ф:"f", Х:"Kh", х:"kh", Ц:"Ts", ц:"ts", Ч:"Ch", ч:"ch", Ш:"Sh", ш:"sh", Щ:"Shch", Ъ:"’’", ъ:"’’", Ы:"Ȳ", ы:"ȳ", ь:"’", Ѣ:"Ye", ѣ:"ye", Ѫ:"Ŭ", ѫ:"ŭ", Ѳ:"F", ѳ:"f", Ѵ:"Y", ѵ:"y",';
	}

if(transliterate_rus2 == true)	
	{	
	obstring +=	'Ь:"’", Э:"E", э:"e", Ю:"Yu", ю:"yu", Я:"Ya", я:"ya", щ:"shch",'
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