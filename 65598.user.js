// ==UserScript==
// @name           Estiah - Charm requirements
// @namespace      SwataScripts
// @description    Shows how many attribute points are you missing to fullfill charm's requirements
// @include        http://www.estiah.com/character/card
// @include        http://www.estiah.com/shop/3*
// @include        http://www.estiah.com/shop/4*
// @include        http://www.estiah.com/shop/6*
// @include        http://www.estiah.com/market/craft/shop/id*
// @include        http://www.estiah.com/market/auction
// @include        http://www.estiah.com/guild/showcase
// @author         swata
// @version        1.1.2
// ==/UserScript==

const levelPrefix = 'Requires Level ';
const hlPrefix = '<font color="white">+';
const hlPostfix = '</font>';

var temp = document.getElementsByClassName('right c2 PT_update_level');
var myLev = 1;
for (var ml = 0; ml < temp.length; ml++)
	myLev = parseInt(temp[ml].innerHTML);
temp = document.getElementsByClassName('right pow PT_update_pow');
var myPow = 1;
for (var mp = 0; mp < temp.length; mp++)
	myPow = parseInt(temp[mp].innerHTML);
temp = document.getElementsByClassName('right int PT_update_int');
var myInt = 1;
for (var mi = 0; mi < temp.length; mi++)
	myInt = parseInt(temp[mi].innerHTML);
temp = document.getElementsByClassName('right dex PT_update_dex');
var myDex = 1;
for (var md = 0; md < temp.length; md++)
	myDex = parseInt(temp[md].innerHTML);
temp = document.getElementsByClassName('right con PT_update_con');
var myCon = 1;
for (var mc = 0; mc < temp.length; mc++)
	myCon = parseInt(temp[mc].innerHTML);

SkillsSite();	// Fetch the list skills

function SkillsSite() {
GM_xmlhttpRequest({
	method: 'GET',
	url: "http://www.estiah.com/character/skill/index/filter/all",
	headers: {
	'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.0.7) Gecko/20060909 Firefox/1.5.0.7",
		'Accept': "text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
		'Referer': "http://www.estiah.com/",
		'Language': "en-us,en;q=0.5",
		'Encoding': "gzip,deflate",
		'Charset': "ISO-8859-1,utf-8;q=0.7,*;q=0.7",
		},
		
	 onload: function(responseDetails) {
		var skills = document.createElement('div');
		skills.innerHTML = responseDetails.responseText;

		var cards = document.getElementsByClassName('cardframe_lr cardbg_ld_common')	// charm you cannot have - 3* shop and character/card
		if (cards.length == 0)
			cards = document.getElementsByClassName('card_lr cardbg_ld_common');		// charm you cannot have - 4* (craft) shop and event shop
		//GM_log(cards.length + ' cards to work on');
		for (var i = 0; i < cards.length; i++) {
			var card = cards[i];
			
			var descriptions = card.getElementsByClassName('description');
			if (descriptions.length == 0) 
				{
				GM_log('description not found in:' + card.innerHTML);
				continue;
				}
			var description = descriptions[0];
			var copy = description.cloneNode(true);
			description.parentNode.insertBefore(copy, description.nextSibling);
			description.setAttribute('style', 'display:none');
			copy.addEventListener("click", switchMode, true);
			description.addEventListener("click", switchMode, true);
			
			// level
			var level = copy.getElementsByClassName('lhp');
			for (var l = 0; l < level.length; l++)
				{
				if (level[l].innerHTML.indexOf(levelPrefix)>=0)
					{
					var lev = parseInt(level[l].innerHTML.substring(15));
					//GM_log('level ' + lev);
					if (lev > myLev)
						level[l].innerHTML = levelPrefix + hlPrefix + (lev-myLev) + hlPostfix;
					}
				}
			
			// attributes
			var prereq = copy.getElementsByClassName('data lhp');
			for (var p = 0; p < prereq.length; p++)
				{
				//GM_log(prereq[p].innerHTML) ;
				HighlightLowAttrib(prereq[p],'Dex',myDex);
				HighlightLowAttrib(prereq[p],'Pow',myPow);
				HighlightLowAttrib(prereq[p],'Int',myInt);
				HighlightLowAttrib(prereq[p],'Con',myCon);
				HighlightRequiredSkill(prereq[p], skills);
				}
			}
 		}
	});
}

function HighlightLowAttrib( findIn, attrib, myValue )
{
	const endText = '</strong> ' + attrib;
	const startText = '<strong>';
    var end = findIn.innerHTML.indexOf(endText);
    if (end > -1)
    {
        var findStart = end - 12;
        if (findStart < 0)
            findStart = 0;
        var start = findIn.innerHTML.indexOf(startText, findStart);
        if (start > -1)
        {
            var valueText = findIn.innerHTML.substring(start + 8, end);
			var value = parseInt(valueText);
            //GM_log(attrib + ' ' + value);
            if (value > myValue)
                findIn.innerHTML = findIn.innerHTML.replace( 
					startText            + valueText                   + endText, 
					startText + hlPrefix + (value-myValue) + hlPostfix + endText ) ;
        }
    }
}

function HighlightRequiredSkill( findIn, skills )
{
	const startText = ' (R<strong>';
	const endText = '</strong>)';
    var start = findIn.innerHTML.indexOf(startText);
	if (start > -1)
	{
		var skillName = findIn.innerHTML.substring(0, start);
		//GM_log(skillName);
		var end = findIn.innerHTML.indexOf(endText);
		if (end > -1)
		{
			var charmSkillRankText = findIn.innerHTML.substring(start + 11, end);
			var charmSkillRank = parseInt(charmSkillRankText);
			var skillRank = 0;
			
			var skillNameEl = document.evaluate(
				'//div[@class="skill"]/div[@class="name"]/a/strong[. = "' + skillName + '"]', 
				skills, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (skillNameEl != null)
			{
				var skill = skillNameEl.parentNode.parentNode.parentNode;	// div class="skill"
				//GM_log(skill.innerHTML);
				var skillRankEl = skill.getElementsByClassName('rank');
				for (var i=0; i<skillRankEl.length; i++)
				{
					skillRank = parseInt(skillRankEl[i].innerHTML);
					//GM_log(skillName + ": " + skillRank);
					if (skill.getElementsByClassName('progress inprogress').length > 0)
						skillRank--;	// level is not finished					
				}
			}
			//else GM_log(skillName + " not found!");
			if (charmSkillRank > skillRank)
				findIn.innerHTML = findIn.innerHTML.replace( 
					startText            + charmSkillRankText                     + endText, 
					startText + hlPrefix + (charmSkillRank-skillRank) + hlPostfix + endText ) ;
		}
	}
}

function switchMode()
{
	var descriptions = this.parentNode.getElementsByClassName('description');
	for (var d = 0; d < descriptions.length; d++)
		descriptions[d].setAttribute('style', '');
	this.setAttribute('style', 'display:none');
}