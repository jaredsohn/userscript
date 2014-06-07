// ==UserScript==
// @name        WaniKani Phonetic-Semantic Composition
// @namespace   wk_phonetic_sem_comp
// @include     http://www.wanikani.com/kanji/*
// @include     http://www.wanikani.com/review/session*
// @include     http://www.wanikani.com/lesson/session*
// @include     https://www.wanikani.com/kanji/*
// @include     https://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/lesson/session*
// @author      ruipgpinheiro
// @description Adds information to Wanikani about kanji that use Phonetic-Semantic Composition.
// @version     1.0.5
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @downloadURL https://userscripts.org/scripts/source/184072.user.js
// @updateURL   https://userscripts.org/scripts/source/184072.meta.js
// ==/UserScript==

/*
 *  ====  Wanikani  Phonetic-Semantic Composition  ====
 *    ==             by ruipgpinheiro              ==
 *
 *  It seems that many kanji were created using a process called phonetic-semantic
 *  composition. This process joins two (or more) kanji (radicals), one (or more of them)
 *  usually called the bushu or dictionary section header establishes the meaning of the
 *  kanji, and another one, the phonetic component that establishes the (on'yomi) sound.
 *
 *  This means that a lot of kanji have a built-in mnemonic that I haven't seen being
 *  referred to in Wanikani, and so it's quite useful to know some of them, especially
 *  when having trouble with a specific reading!
 *
 *
 *
 *  For example (using non-Wanikani kanji names):
 *
 *  反・はん "to rebel" ("anti" by Wanikani mnemonics)
 *
 *  飯・はん "rice"
 *  版・はん "print"
 *  板・はん "a board"
 *  坂・はん "slope"
 *  販・はん "sale"
 *  叛・はん "to betray"
 *
 *  As you can notice, these kanji all use the first one as a phonetic component, placing it
 *  to the right of the semantic component (mostly, phonetic components are drawn right-most).
 *  Due to the evolution of the language, many such kanji have since then slightly changed
 *  pronunciation (仮・か "temporary"), but knowing this information can be a major help.
 *
 *  This script imports a database of over 100 phonetic components with over 400 regular Kanji
 *  that use their on'yomi reading onto Wanikani. This means that over a fourth of Wanikani's
 *  Kanji should be included in here somewhere and have a "built-in mnemonic" of sorts.
 *  Depending on how you study, it could be a huge help (or no help at all - you decide what's
 *  best for your brain). The information will be shown on the Kanji info page, during reviews
 *  (if you check the details for a Kanji) and during lessons, provided the relevant Kanji is
 *  included in the database.
 *
 *  Note that the database used in this script was automatically generated from a PDF file,
 *  and even though I tried to check it for mistakes, it is possible that it contains an error or two.
 *  This userscript contains the whole Kanji table from Hiroko Townsend's Thesis about phonetic
 *  components, which means the script's database includes 143 different phonetic components
 *  encompassing 417 regular kanji (kanji that use the on'yomi reading from the phonetic component)
 *  and 210 irregular ones (kanji that use a different reading, though with - supposedly - similar
 *  roots). Some of these Kanji aren't available on Wanikani, though, even though they'll be shown
 *  by the userscript as they are part of its database.
 *
 */
 
/*
 *  ====  LICENSE INFORMATION  ====
 *
 *  This script contains a database of phonetic components adapted under Fair Use
 *  (for nonprofit educational purposes) from 
 *    Phonetic Components in Japanese Characters 
 *      by Hiroko Townsend 
 *      Master of Arts in Linguistics, San Diego State University, 2011
 *  Obtain a complete copy of the Thesis at http://sdsu-dspace.calstate.edu/bitstream/handle/10211.10/1203/Townsend_Hiroko.pdf
 *  Thank you Hiroko for the very useful thesis!
 *
 *
 *
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
 
/*
 *	=== Changelog ===
 *
 *  1.0.5 (11 March 2014)
 *  - Relicensed under the GPLv3.
 *
 *  1.0.4 (23 January 2014)
 *  - Now supports the HTTPS protocol.
 *
 *  1.0.3 (24 November 2013)
 *  - Corrected 症, which has the wrong reading in the thesis used for creating the DB.
 *    It's now listed as irregular with the reading しょう, even though its phonetic component can also (rarely) be read the same way.
 *
 *  1.0.2 (24 November 2013)
 *  - Fixed a bug in the code that automatically generated the DB, which would misread phonetic components with a single,
 *    irregular kanji, like 刃, and put them inside the DB entry of the previous phonetic component.
 *    Therefore, the DB was regenerated from scratch. Updated the DB count in the description accordingly.
 *
 *  1.0.1 (23 November 2013)
 *  - Kanji links now open in a new tab, to fix a bug where clicking them would just restart the current reviews/lessons session.
 *
 *  1.0.0 (22 November 2013)
 *  - First release.
 */

/*
 * Debug Settings
 */
var debugLogEnabled = false;
var debugAlwaysUseFirstDBEntry = false;
var scriptShortName = "WKPSC";

scriptLog = debugLogEnabled ? function(msg) { if(typeof msg === 'string'){ console.log(scriptShortName + ": " + msg); }else{ console.log(msg); } } : function() {};

/*
 * Global Variables/Objects/Classes
 */
// Stores the current Wanikani page we're on
var PageEnum = Object.freeze({ unknown:0, kanji:1, reviews:2, lessons:3 });
var curPage = PageEnum.unknown;

/*
 * Database Functions
 *
 * Searches the DB for a Kanji
 * If found, returns an object of the form {entry, regular, irregular}, where:
 *   entry - reference to the DB entry containing the Kanji
 *   type - 'regular' or 'irregular', specifies in which DB sub-array the kanji was found
 *   kanji - Kanji found (same as the input kanji)
 * If not found, returns null
 */
function searchDBForKanji(kanji)
{
	for (var i = 0; i < database.length; i++)
	{
		var cur = database[i];
		
		if(kanji == cur.phonetic)
			return {entry:cur, type:"phonetic", kanji:cur.phonetic};
		
		if("regular" in cur)
		{
			for(var i2 = 0; i2 < cur.regular.length; i2++)
			{
				if(kanji == cur.regular[i2])
					return {entry:cur, type:"regular", kanji:cur.regular[i2]};
			}
		}
		
		if("irregular" in cur)
		{
			for(var i2 = 0; i2 < cur.irregular.length; i2++)
			{
				if(kanji == cur.irregular[i2][0])
					return {entry:cur, type:"irregular", kanji:cur.irregular[i2][0], irregular:cur.irregular[i2]};
			}
		}
	}
	
	return null;
}

/*
 * Injected Elements and Related Functions
 */
// Toggles the "More Information" button
unsafeWindow.WKPSC_moreInformation_onClick = function (obj)
{
	elem = obj.nextSibling;
	
	if(elem.getAttribute('class') == "WKPSC-more-information-hidden")
	{
		obj.innerHTML = 'Less Information <i class="icon-chevron-up">';
		elem.setAttribute('class', "WKPSC-more-information-show");
	}
	else
	{
		obj.innerHTML = 'More Information <i class="icon-chevron-down">';
		elem.setAttribute('class', "WKPSC-more-information-hidden");
	}
}

// Generates HTML for the injected Element
function generateHTML(dbEntry)
{	
	var html;
	var regularText;
	
	// Detect whether mostly regular or not
	var regularCount = 0;
	var irregularCount = 0;
	if("regular" in dbEntry.entry)
		regularCount = dbEntry.entry.regular.length;
	if("irregular" in dbEntry.entry)
		irregularCount = dbEntry.entry.irregular.length;
		
	if(regularCount >= irregularCount)
	{
		if(irregularCount == 0)
			regularText = "completely regular";
		else
			regularText = "mostly regular";
	}
	else
	{
		if(regularCount == 0)
			regularText = "completely irregular";
		else
			regularText = "mostly irregular";
	}
	
	var totalCount = regularCount + irregularCount;

	// Generate correct HTML from templates
	var htmlTemplateThisKanji = '<span rel="tooltip" class="kanji-highlight" data-original-title="This Kanji" lang="ja">{0}</span>';
	html = htmlTemplateThisKanji.format(dbEntry.kanji);
	
	if(dbEntry.type == "phonetic")
	{
		var htmlTemplatePhonetic = ' is a <b>{1}</b> phonetic component used in {2} Kanji to represent the <i>on\'yomi</i> reading <text class="WKPSC-hiragana">{3}</text>.';
		html += htmlTemplatePhonetic.format(dbEntry.entry.phonetic, regularText, totalCount, dbEntry.entry.reading);
	}
	else
	{
		if(dbEntry.entry.phonetic == "obsolete")
			var htmlTemplateNonPhonetic = ' was formed using phonetic-semantic composition. However, with the passing of time, the phonetic component used became obsolete as a Kanji, so the radical cannot be shown here. Nevertheless, this kanji contains a <b>{1}</b> phonetic component, also used in {2} other Kanji to represent the <i>on\'yomi</i> reading <text class="WKPSC-hiragana">{3}</text>. You should be able to compare Kanji beloging to the same set to figure out what it looks like.';
		else
			var htmlTemplateNonPhonetic = ' was formed using phonetic-semantic composition. Therefore it contains the <b>{1}</b> phonetic component <a href="http://www.wanikani.com/kanji/{0}" target="_blank"><span rel="tooltip" class="kanji-highlight" data-original-title="Phonetic Component" lang="ja">{0}</span></a>, also used in {2} other Kanji to represent the <i>on\'yomi</i> reading <text class="WKPSC-hiragana">{3}</text>.';
		
		html += htmlTemplateNonPhonetic.format(dbEntry.entry.phonetic, regularText, totalCount-1, dbEntry.entry.reading);
	}
	
	if(dbEntry.type == "irregular")
		html += ' <u>Make sure to note that this Kanji is irregular!</u>';
	
	var htmlTemplateMoreInformation = '</p><span class="WKPSC-more-information-button WKPSC-more-information-button-margin" onclick="WKPSC_moreInformation_onClick(this)">More Information <i class="icon-chevron-down"></i></span><span class="WKPSC-more-information-hidden">This series of phonetic-semantically composed Kanji consists of the ';
	html += htmlTemplateMoreInformation;

	// Generate the list of 'regular' Kanji from templates, if any exist
	if("regular" in dbEntry.entry)
	{
		var regularKanjiTemplate = '<a href="http://www.wanikani.com/kanji/{0}" target="_blank"><span rel="tooltip" class="kanji-highlight" data-original-title="Kanji" lang="ja">{0}</span></a>';
		var regIrregKanjiJoiningTemplate = '<br> There are also the following ';
		var regularTemplate = '<span rel="tooltip" class="reading-highlight" data-original-title="Same On\'yomi Reading">regular</span> Kanji ';
		
		html += regularTemplate;
		
		var entryLength = dbEntry.entry.regular.length;
		for(var i = 0; i < entryLength; i++)
		{
			var cur = dbEntry.entry.regular[i];
			
			if(i > 0 && i < entryLength-1)
				html += ", ";
			else if(i == entryLength-1 && i > 0)
				html += " and ";
			
			html += regularKanjiTemplate.format(cur);
		}
		html += '.';
	
		if("irregular" in dbEntry.entry)
			html += regIrregKanjiJoiningTemplate;
	}
	
	// Generate the table of 'irregular' Kanji from templates, if any exist
	if("irregular" in dbEntry.entry)
	{
		var irregularKanjiTemplate = '<span rel="tooltip" class="reading-highlight" data-original-title="Similar On\'yomi Reading (shared historical roots)">irregular</span> Kanji:<table style="text-align:center; line-height:1.7" align="center" width="200px"><td class="span6"><h3>Kanji</h3></td><td class="span6"><h3>Reading</h3></td></tr>{0}</table>';
		var rowTemplate = '<tr><td><a href="http://www.wanikani.com/kanji/{0}" target="_blank"><span class="kanji-highlight" lang="ja">{0}</span></a></td><td class="WKPSC-hiragana" lang="ja">{1}</td></tr>';
		
		var tableHTML = "";		
		
		var entryLength = dbEntry.entry.irregular.length;
		for(var i = 0; i < entryLength; i++)
		{
			var cur = dbEntry.entry.irregular[i];
			
			tableHTML += rowTemplate.format(cur[0], cur[1]);
		}
		
		html += irregularKanjiTemplate.format(tableHTML);
	}
	
	// Close the remaining tag and return
	html += '</span>';
	
	return html;
}

// Create the element to be injected, set its id, class and HTML content
function createHTMLElement(dbEntry)
{
	var elmnt;
	if(curPage == PageEnum.kanji)
		 elmnt = document.createElement('aside');
	else
		 elmnt = document.createElement('blockquote');
	
	elmnt.setAttribute('id', 'WKPSC-extra-information');
	elmnt.setAttribute('class', 'additional-info');
	elmnt.innerHTML = '<h3><i class="icon-info-sign"></i> Phonetic-Semantic Composition</h3><p>' + generateHTML(dbEntry) + '</p>';

	return elmnt;
}

// Stores the old element, since we might have to clean it up when in the lessons module
var oldElement = null;
// Detects current Kanji, searches DB, and if a match is found, creates and injects the corresponding HTML Element
function addElement(node)
{
	// If required (lessons module), clean up the previously created element
	if(!isEmpty(oldElement) && !isEmpty(oldElement.parentNode))
		oldElement.parentNode.removeChild(oldElement);
	oldElement = null;
	
	// Find the current kanji
	
	var kanji;
	
	if(debugAlwaysUseFirstDBEntry)
		kanji = database[0].phonetic;
	else
	{
		switch(curPage)
		{
			case PageEnum.kanji:
				kanji = getCurrentKanji_Kanji(); break;
			case PageEnum.reviews:
				kanji = getCurrentKanji_Reviews(); break;
			case PageEnum.lessons:
				kanji = getCurrentKanji_Lessons(); break;
			default:
				throw Error("Unknown page!");
		}
	}
	scriptLog(kanji);
	
	// Check whether the current kanji is in the database
	var dbEntry = searchDBForKanji(kanji);
	if(isEmpty(dbEntry)) { scriptLog("Kanji not in DB. Ignoring."); return; }
	scriptLog(dbEntry);
	
	// Create custom element
	var newElmnt = createHTMLElement(dbEntry);
	
	// Insert element
	switch(curPage)
	{
		case PageEnum.kanji:
			$('section#note-reading').before(newElmnt); break;
		case PageEnum.reviews:
			$('section#item-info-reading-mnemonic').append(newElmnt); break;
		case PageEnum.lessons:
			$('div#supplement-kan-reading div:contains("Reading Mnemonic") blockquote:last').after(newElmnt);
			oldElement = newElmnt;
	}
}

/*
 * Kanji Info Pages
 */
function getCurrentKanji_Kanji()
{
	var kanjiNode = document.getElementsByClassName("kanji-icon")[0].childNodes[0];
	var kanji = kanjiNode.innerHTML.trim();
	if(kanji.length == 1)
		return kanji;
	else
		throw new Error("Wrong 'kanji' length (" + kanji.length + "). kanji='"+ kanji +"'");
}

function kanjiInfo_init()
{
	GM_addStyle('.WKPSC-hiragana { font-weight: bold; }');
	GM_addStyle('.WKPSC-more-information-button-margin { margin-bottom: -10px !important; display:block; }');
	GM_addStyle('.WKPSC-more-information-show { margin-top: 40px; margin-bottom: -10px !important; display:block; }');
}

/*
 * Reviews page
 */
function reviews_init()
{
	GM_addStyle('.WKPSC-hiragana { font-weight: normal; }');
	GM_addStyle('.WKPSC-more-information-button-margin { margin-bottom: 0 !important; display:block; }');
	GM_addStyle('span.reading-highlight { background-color: #474747; } span.kanji-highlight { background-color: #FF00AA; };');
	GM_addStyle('span.reading-highlight, span.kanji-highlight {-moz-box-sizing: border-box; border-radius: 3px; box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.2) inset, 0 0 10px rgba(255, 255, 255, 0.5); color: #FFFFFF; display: inline-block; height: 1.8em; line-height: 1.7em; text-align: center; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3); padding-left: 3px; padding-right: 3px; }');
	
	GM_addStyle('.WKPSC-more-information-show { margin-top: 20px; margin-bottom: -10px !important; display:block; }');
}

function getCurrentKanji_Reviews()
{
	var curItem = $.jStorage.get("currentItem");
	if("kan" in curItem)
		return curItem.kan.trim();
	else
		return null;
}

/*
 * Lessons page
 */
lessons_init = reviews_init;
 
function getCurrentKanji_Lessons()
{
	var kanjiNode = document.getElementById("character");
	
	if(isEmpty(kanjiNode))
		return null;
	
	var kanji = kanjiNode.innerHTML.trim();
	if(kanji.length == 1)
		return kanji;
	else
		throw new Error("Wrong 'kanji' length (" + kanji.length + "). kanji='"+ kanji +"'");
}

/*
 * Init Functions
 * Set up the hooks needed.
 */
function scriptEventFired(node)
{
	try
	{
		scriptLog("Event fired!");
		addElement(node);
	}
	catch(err) { logError(err); }
}

function scriptInit()
{
	// Add global CSS styles
	GM_addStyle('.WKPSC-more-information-button { color: #888888; cursor: pointer; text-align: center; background-image: url("/assets/default-v2/top-inset-shadow-290f5bd0a4f35ec34dd42c6c1f56a2f3.png"); background-position: center top; background-repeat: no-repeat; margin-top: 15px;} }');
	GM_addStyle('.WKPSC-more-information-hidden { display:block; visibility:hidden; height:0; }');
	
	scriptLog("loaded");
	
	// Set up hooks
	try
	{
		if (/\/kanji\/./.test(document.URL)) /* Kanji Pages */
		{
			scriptLog("Kanji Page");
			curPage = PageEnum.kanji;
			
			kanjiInfo_init();
			addElement();
		}
		else if (/\/review/.test(document.URL)) /* Reviews Pages */
		{
			scriptLog("Reviews page");
			curPage = PageEnum.reviews;
			
			reviews_init();
			waitForKeyElements("section[id=item-info-reading-mnemonic]", scriptEventFired, false);
		}
		else if (/\/lesson/.test(document.URL)) /* Lessons Pages */
		{
			scriptLog("Lessons page");
			curPage = PageEnum.lessons;
			
			lessons_init();
			waitForKeyElements("li.active", scriptEventFired, false);
		}
	}
	catch(err) { logError(err); }
}

/*
 * Helper Functions/Variables
 */
$ = unsafeWindow.$;
 
function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
				? args[number]
				: match;
		});
	};
}

/*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
function logError(error)
{
	var stackMessage = "";
	if("stack" in error)
		stackMessage = "\n\tStack: " + error.stack;
		
	console.error(scriptShortName + " Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
}

/*
 * Database
 *
 * Adapted from
 *  Phonetic Components in Japanese Characters 
 *   by Hiroko Townsend 
 *   Master of Arts in Linguistics, San Diego State University, 2011 
 *
 * Obtain a complete copy of the Thesis at http://sdsu-dspace.calstate.edu/bitstream/handle/10211.10/1203/Townsend_Hiroko.pdf
 * This database adapts the tables starting at page 38
 */
var database = [
/* AUTOMATICALLY GENERATED ENTRIES */
/* PART 1 - Phonetic Components That are Mostly or Completely Regular */
{
	phonetic:  "几", reading:"き",
	regular:   ["机","肌","飢"],
	irregular: [["役","えき"],["疫","えき"],["投","とう"],["穀","こく"],["秀","しゅう"]]
},{
	phonetic:  "亡", reading:"ぼう",
	regular:   ["忙","忘","盲","荒","望","妄"]
},{
	phonetic:  "干", reading:"かん",
	regular:   ["汗","肝","奸","刊"],
	irregular: [["岸","がん"]]
},{
	phonetic:  "己", reading:"き",
	regular:   ["起","記","紀","忌"],
	irregular: [["改","かい"],["配","はい"]]
},{
	phonetic:  "工", reading:"こう",
	regular:   ["紅","空","虹","江","攻","功","肛"]
},{
	phonetic:  "及", reading:"きゅう",
	regular:   ["吸","級","扱"]
},{
	phonetic:  "士", reading:"し",
	regular:   ["仕","志","誌"]
},{
	phonetic:  "方", reading:"ぼう",
	regular:   ["肪","紡","防","妨","房","謗","傍","放"],
	irregular: [["芳","ほう"],["訪","ほう"],["施","し"],["旅","りょ"],["族","ぞく"],["旋","せん"]]
},{
	phonetic:  "中", reading:"ちゅう",
	regular:   ["忠","沖","仲","虫","狆"],
	irregular: [["風","ふう"]]
},{
	phonetic:  "化", reading:"か",
	regular:   ["花","貸","靴"]
},{
	phonetic:  "反", reading:"はん",
	regular:   ["版","板","坂","飯","販","叛"],
	irregular: [["仮","か"]]
},{
	phonetic:  "分", reading:"ふん",
	regular:   ["粉","紛","雰"],
	irregular: [["盆","ぼん"]]
},{
	phonetic:  "半", reading:"はん",
	regular:   ["絆","拌"],
	irregular: [["伴","はん/ばん"],["判","ばん"]]
},{
	phonetic:  "白", reading:"はく",
	regular:   ["伯","拍","泊","迫","舶","狛","柏","箔","珀"]
},{
	phonetic:  "皮", reading:"ひ",
	regular:   ["彼","被","疲","被","披"],
	irregular: [["破","は"],["波","は"]]
},{
	phonetic:  "付", reading:"ふ",
	regular:   ["府","符","附","俯"]
},{
	phonetic:  "包", reading:"ほう",
	regular:   ["抱","泡","胞","砲","飽","咆"]
},{
	phonetic:  "可", reading:"か",
	regular:   ["河","何","荷","苛","呵","歌"],
	irregular: [["阿","あ"],["婀","あ"]]
},{
	phonetic:  "古", reading:"こ",
	regular:   ["居","固","故","枯","個","湖","箇","沽","苦"]
},{
	phonetic:  "生", reading:"せい",
	regular:   ["姓","性","星","牲","惺"]
},{
	phonetic:  "正", reading:"せい",
	regular:   ["征","政","整","性","牲"],
	irregular: [["症","しょう"]]
},{
	phonetic:  "司", reading:"し",
	regular:   ["伺","詞","嗣","飼"]
},{
	phonetic:  "且", reading:"しょ",
	irregular: [["粗","そ"],["祖","そ"],["狙","そ"],["阻","そ"],["組","そ"],["助","じょ"]]
},{
	phonetic:  "旦", reading:"たん",
	regular:   ["但","胆","担"],
	irregular: [["疸","だん"],["垣","えん"],["宣","せん"]]
},{
	phonetic:  "令", reading:"れい",
	regular:   ["冷","鈴","零","領","齢"]
},{
	phonetic:  "立", reading:"りゅう",
	regular:   ["竜","滝","粒","笠","龍"],
	irregular: [["端","たん"]]
},{
	phonetic:  "申", reading:"しん",
	regular:   ["伸","呻","押","紳"]
},{
	phonetic:  "召", reading:"しょう",
	regular:   ["招","沼","昭","紹","詔","照"],
	irregular: [["超","ちょう"]]
},{
	phonetic:  "安", reading:"あん",
	regular:   ["案","按","鞍","鮟"],
	irregular: [["宴","えん"]]
},{
	phonetic:  "同", reading:"どう",
	regular:   ["洞","胴","恫","銅","洞"],
	irregular: [["筒","とう"]]
},{
	phonetic:  "寺", reading:"じ",
	regular:   ["侍","持","時","塒","峙","待"]
},{
	phonetic:  "旬", reading:"じゅん",
	regular:   ["洵","殉","恂"]
},{
	phonetic:  "各", reading:"かく",
	regular:   ["格","喀","閣"],
	irregular: [["額","がく"],["客","きゃく"],["略","りゃく"],["落","らく"],["路","ろ"]]
},{
	phonetic:  "圭", reading:"けい",
	regular:   ["掛","畦","珪","罫","鮭","硅"]
},{
	phonetic:  "糸", reading:"けい",
	regular:   ["系","係","繋"],
	irregular: [["結","けつ"],["潔","けつ"],["緊","きん"],["繁","はん"]]
},{
	phonetic:  "縣", reading:"けん",
	irregular: [["紫","し"]]
},{
	phonetic:  "光", reading:"こう",
	regular:   ["恍","幌","胱","晃"]
},{
	phonetic:  "交", reading:"こう",
	regular:   ["校","絞","狡","較","郊","効","咬"]
},{
	phonetic:  "共", reading:"きょう",
	regular:   ["供","恭"],
	irregular: [["洪","こう"],["哄","こう"]]
},{
	phonetic:  "次", reading:"し",
	regular:   ["姿","諮","資"],
	irregular: [["盗","とう"]]
},{
	phonetic:  "成", reading:"せい",
	regular:   ["盛","誠","筬","城"]
},{
	phonetic:  "朱", reading:"しゅ",
	regular:   ["株","珠","殊","蛛"]
},{
	phonetic:  "我", reading:"が",
	regular:   ["峨","蛾","餓","俄","鵞"]
},{
	phonetic:  "甫", reading:"ほ",
	regular:   ["捕","哺","匍","補","蒲","輔","舗"]
},{
	phonetic:  "見", reading:"けん",
	regular:   ["硯","蜆"],
	irregular: [["現","げん"],["規","き"],["窺","き"],["覗","し"],["視","し"],["親","しん"]]
},{
	phonetic:  "谷", reading:"こく",
	irregular: [["欲","よく"],["浴","よく"],["俗","ぞく"],["裕","ゆう"]]
},{
	phonetic:  "辰", reading:"しん",
	regular:   ["唇","振","賑","震","娠"],
	irregular: [["辱","じょく"]]
},{
	phonetic:  "肖", reading:"しょう",
	regular:   ["宵","消","硝"],
	irregular: [["削","さく"]]
},{
	phonetic:  "弟", reading:"てい",
	regular:   ["第","剃","涕"]
},{
	phonetic:  "廷", reading:"てい",
	regular:   ["庭","挺","艇"]
},{
	phonetic:  "良", reading:"りょう",
	irregular: [["郎","ろう"],["浪","ろう"],["朗","ろう"],["狼","ろう"],["廊","ろう"],["娘","じょう"]]
},{
	phonetic:  "直", reading:"ちょく",
	regular:   ["植","稙"],
	irregular: [["埴","しょく"],["殖","しょく"],["置","ち"],["値","ち"]]
},{
	phonetic:  "長", reading:"ちょう",
	regular:   ["張","帳","脹"]
},{
	phonetic:  "非", reading:"ひ",
	regular:   ["悲","緋","誹","鯡","琲","扉"]
},{
	phonetic:  "朋", reading:"ほう",
	regular:   ["崩","棚","硼"]
},{
	phonetic:  "果", reading:"か",
	regular:   ["課","菓","踝","顆"]
},{
	phonetic:  "官", reading:"かん",
	regular:   ["棺","管","館"]
},{
	phonetic:  "奇", reading:"き",
	regular:   ["崎","埼","椅"]
},{
	phonetic:  "其", reading:"き",
	regular:   ["期","欺","棋","基","旗"]
},{
	phonetic:  "金", reading:"きん",
	regular:   ["欽","錦"],
	irregular: [["銀","ぎん"],["鈴","れい"]]
},{
	phonetic:  "采", reading:"さい",
	regular:   ["菜","採"]
},{
	phonetic:  "青", reading:"せい",
	regular:   ["清","靖","精","晴","請","情","鯖","静"]
},{
	phonetic:  "昔", reading:"しゃく",
	regular:   ["借","惜","錯"]
},{
	phonetic:  "尚", reading:"しょう",
	regular:   ["常","裳","掌"],
	irregular: [["党","とう"]]
},{
	phonetic:  "昌", reading:"しょう",
	regular:   ["娼","唱","菖","晶"]
},{
	phonetic:  "禺", reading:"ぐう",
	regular:   ["遇","寓","隅","偶"],
	irregular: [["愚","ぐ"]]
},{
	phonetic:  "扁", reading:"へん",
	regular:   ["編","偏","篇","蝙"]
},{
	phonetic:  "則", reading:"そく",
	regular:   ["側","測","惻"]
},{
	phonetic:  "相", reading:"そう",
	regular:   ["想","箱","霜"],
	irregular: [["湘","しょう"],["廂","しょう"]]
},{
	phonetic:  "莫", reading:"ばく",
	regular:   ["摸","膜","漠","博","縛","幕"],
	irregular: [["模","ぼ"],["慕","ぼ"],["墓","ぼ"],["暮","ぼ"],["募","ぼ"]]
},{
	phonetic:  "高", reading:"こう",
	regular:   ["縞","稿","藁"]
},{
	phonetic:  "曹", reading:"そう",
	regular:   ["遭","槽","糟"]
},{
	phonetic:  "曽", reading:"そう",
	regular:   ["贈","僧","憎","増"]
},{
	phonetic:  "童", reading:"どう",
	regular:   ["撞","憧","瞳"]
},{
	phonetic:  "義", reading:"ぎ",
	regular:   ["儀","議","犠","蟻","艤"]
}
,/* PART 2 - Phonetic Components That are Mostly Irregular */
{
	phonetic:  "丁", reading:"ちょう",
	regular:   ["町"],
	irregular: [["汀","てい"],["灯","ひ"],["打","だ"],["亭","てい"]]
},{
	phonetic:  "才", reading:"さい",
	irregular: [["材","ざい"],["財","ざい"]]
},{
	phonetic:  "元", reading:"がん",
	regular:   ["玩"],
	irregular: [["完","かん"],["院","いん"]]
},{
	phonetic:  "少", reading:"しょう",
	regular:   ["省","抄"],
	irregular: [["秒","びょう"],["妙","みょう"],["劣","れつ"],["砂","しゃ"]]
},{
	phonetic:  "台", reading:"だい",
	irregular: [["胎","たい"],["怠","たい"],["治","ち"],["始","し"],["殆","たい"]]
},{
	phonetic:  "永", reading:"えい",
	regular:   ["泳","詠"]
},{
	phonetic:  "牙", reading:"が",
	regular:   ["雅","芽"],
	irregular: [["邪","じゃ"]]
},{
	phonetic:  "必", reading:"ひ",
	regular:   ["泌","秘"],
	irregular: [["蜜","みつ"],["密","みつ"]]
},{
	phonetic:  "句", reading:"く",
	regular:   ["駒"]
},{
	phonetic:  "区", reading:"く",
	regular:   ["駆"],
	irregular: [["欧","おう"],["殴","おう"],["枢","すう"]]
},{
	phonetic:  "巨", reading:"きょ",
	regular:   ["距","拒"]
},{
	phonetic:  "毎", reading:"ばい",
	regular:   ["梅"],
	irregular: [["海","かい"],["晦","かい"],["悔","かい"],["敏","びん"]]
},{
	phonetic:  "兆", reading:"ちょう",
	regular:   ["眺","跳"],
	irregular: [["逃","とう"],["桃","とう"]]
},{
	phonetic:  "亥", reading:"がい",
	regular:   ["咳","骸"],
	irregular: [["核","かく"],["刻","こく"]]
},{
	phonetic:  "舟", reading:"せん",
	regular:   ["船"],
	irregular: [["航","こう"],["舶","はく"],["艇","てい"]]
},{
	phonetic:  "朱", reading:"しゅ",
	regular:   ["珠","殊"]
},{
	phonetic:  "周", reading:"しゅう",
	regular:   ["週"]
},{
	phonetic:  "羊", reading:"よう",
	regular:   ["洋","痒"],
	irregular: [["鮮","せん"],["群","ぐん"],["羨","せん"]]
},{
	phonetic:  "宛", reading:"えん",
	regular:   ["婉","苑"],
	irregular: [["腕","わん"],["碗","わん"]]
},{
	phonetic:  "京", reading:"けい",
	regular:   ["景","鯨"],
	irregular: [["影","えい"],["涼","りょう"],["就","しゅう"]]
},{
	phonetic:  "奇", reading:"き",
	regular:   ["寄"]
},{
	phonetic:  "居", reading:"きょ",
	regular:   ["裾"]
},{
	phonetic:  "者", reading:"しゃ",
	regular:   ["煮"],
	irregular: [["猪","ちょ"],["著","ちょ"],["暑","しょ"],["都","と"],["賭","と"]]
},{
	phonetic:  "冒", reading:"ぼう",
	regular:   ["帽"]
},{
	phonetic:  "盾", reading:"じゅん",
	regular:   ["循","楯"]
},{
	phonetic:  "胡", reading:"こ",
	regular:   ["糊","湖"]
},{
	phonetic:  "皇", reading:"こう",
	irregular: [["凰","ほう"]]
},{
	phonetic:  "単", reading:"たん",
	regular:   ["弾"]
},{
	phonetic:  "然", reading:"ねん",
	regular:   ["燃"]
}
,/* PART 3 - Phonetic Components That are Completely Irregular */
{
	phonetic:  "乙", reading:"おつ",
	irregular: [["迄","まで"]]
},{
	phonetic:  "了", reading:"りょう",
	irregular: [["好","こう"],["承","しょう"],["蒸","じょう"],["乳","にゅう"],["浮","ふ"]]
},{
	phonetic:  "刀", reading:"とう",
	irregular: [["辺","へん"],["分","ふん"],["切","せつ"]]
},{
	phonetic:  "又", reading:"ゆう",
	irregular: [["双","そう"],["怒","ど"],["努","ど"],["最","さい"],["受","じゅ"],["叔","しゅく"],["淑","しゅく"]]
},{
	phonetic:  "凡", reading:"ぼん",
	irregular: [["帆","ほ"]]
},{
	phonetic:  "土", reading:"ど",
	irregular: [["社","しゃ"]]
},{
	phonetic:  "丸", reading:"がん",
	irregular: [["熱","ねつ"],["勢","せい"]]
},{
	phonetic:  "刃", reading:"じん",
	irregular: [["忍","にん"]]
},{
	phonetic:  "子", reading:"し",
	irregular: [["好","こう"],["孔","こう"],["孝","こう"],["吼","こう"]]
},{
	phonetic:  "也", reading:"や",
	irregular: [["地","ち"],["池","ち"],["馳","ち"],["他","た"]]
},{
	phonetic:  "云", reading:"うん",
	irregular: [["転","てん"],["伝","でん"],["芸","げい"]]
},{
	phonetic:  "田", reading:"でん",
	irregular: [["思","し"],["累","るい"],["塁","るい"],["異","い"],["翼","よく"],["畑","はた"]]
},{
	phonetic:  "占", reading:"せん",
	irregular: [["店","てん"],["点","てん"],["粘","ねん"]]
},{
	phonetic:  "主", reading:"しゅ",
	irregular: [["住","じゅう"],["注","ちゅう"],["駐","ちゅう"],["柱","ちゅう"],["往","おう"]]
},{
	phonetic:  "臣", reading:"じん",
	irregular: [["臨","りん"]]
},{
	phonetic:  "車", reading:"しゃ",
	irregular: [["軍","ぐん"],["運","うん"],["連","れん"],["漣","れん"]]
},{
	phonetic:  "走", reading:"そう",
	irregular: [["徒","と"]]
},{
	phonetic:  "雨", reading:"う",
	irregular: [["雲","うん"],["曇","どん"],["雪","せつ"],["霞","か"],["霰","さん"],["霜","そう"],["雹","はく"],["雷","らい"],["霧","む"],["電","でん"],["霊","れい"],["零","れい"]]
},{
	phonetic:  "首", reading:"しゅ",
	irregular: [["道","どう"],["導","どう"]]
},{
	phonetic:  "頁", reading:"よう",
	irregular: [["順","じゅん"],["頌","しょう"]]
},{
	phonetic:  "恵", reading:"けい",
	irregular: [["穂","ほ"]]
}
,/* MANUALLY ADDED KANJI START HERE (obsolete Kanji) */
{
	phonetic:  "obsolete", reading:"こう",
	regular:   ["孝","老","考"]
},{
	phonetic:  "obsolete", reading:"けい",
	regular:   ["径","経","軽","怪","茎"]
},{
	phonetic:  "乍", reading:"さく",
	regular:   ["作","昨","窄","酢","搾"]
},{
	phonetic:  "obsolete", reading:"てい",
	regular:   ["低","底","抵","邸","抵"]
},{
	phonetic:  "obsolete", reading:"けん",
	regular:   ["券","巻","圏","拳"]
},{
	phonetic:  "obsolete", reading:"こん",
	regular:   ["根","痕","恨","懇","墾"],
	irregular: [["眼","がん"],["退","たい"],["腿","たい"]]
},{
	phonetic:  "obsolete", reading:"きょう",
	regular:   ["峡","狭","挟"]
},{
	phonetic:  "obsolete", reading:"せん",
	regular:   ["浅","銭","践"],
	irregular: [["桟","さん"]]
},{
	phonetic:  "obsolete", reading:"しん",
	regular:   ["診","疹","参"],
	irregular: [["惨","さん"],["珍","ちん"]]
},{
	phonetic:  "obsolete", reading:"ほう",
	regular:   ["峰","逢","縫","蜂","蓬"]
},{
	phonetic:  "obsolete", reading:"しゅん",
	regular:   ["俊","峻","悛","逡","竣","浚"]
},{
	phonetic:  "obsolete", reading:"つう",
	regular:   ["通","桶","痛"],
	irregular: [["踊","よう"],["涌","よう"],["勇","ゆう"]]
},{
	phonetic:  "obsolete", reading:"けん",
	regular:   ["険","験","検"]
},{
	phonetic:  "obsolete", reading:"か",
	regular:   ["渦","堝","鍋","蝸","窩","禍"]
},{
	phonetic:  "obsolete", reading:"ふく",
	regular:   ["福","副","複","幅","富","蝠"],
	irregular: [["搏","はく"]]
},{
	phonetic:  "obsolete", reading:"てき",
	regular:   ["滴","適","敵"]
},{
	phonetic:  "obsolete", reading:"へき",
	regular:   ["壁","癖"],
	irregular: [["避","ひ"]]
},{
	phonetic:  "obsolete", reading:"そう",
	regular:   ["燥","操","藻"]
}
/* END OF DATABASE */
];


/*
 * Code by BrockA, thanks!
 * Taken from https://gist.github.com/BrockA/2625891
 */
 
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
/* End of Code by BrockA */

/*
 * Start the script
 */
scriptInit();