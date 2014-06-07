// ==UserScript==
// @name           Bloomberg article expander
// @namespace      com.sweetleon
// @description    Make Bloomberg articles use the full width of the screen, hides sidebar ads, and sets background to black and text to green for readability.
// @include        http://www.bloomberg.com/apps/news?pid=*
// ==/UserScript==

document.getElementById('content').style.display = 'inline-block';
document.getElementById('content').style.background = '';

document.getElementById('rightcol').style.display = 'none';

document.getElementById('article').style.width = '100%';

for (var i=0; i<100; i++) {
	if (x = document.getElementById('ext-gen'+i)) {
		x.style.width = '100%';
		x.style.backgroundColor = 'black';
	}
}

document.getElementById('ext-comp-1001').style.width = '100%';

document.getElementById('tabs1').style.width = '';//?????
document.getElementById('tabs1').firstElementChild.style.width = '100%';

//document.getElementById('tabs1').style.margin = 0;
//document.getElementById('tabs1').style.padding = '0.5em';
document.getElementById('article').style.background = 'black';
document.getElementById('article').style.color = '#00FF00';

document.getElementById('content').style.width = '100%';

document.getElementById('primarystructure').width = '';
document.getElementById('primarystructure').style.width = '99%';

document.getElementById('pe').style.display = 'none';

// why is it so hard to change a CSS style rule? all this does is
// .news_story_title{color:;}
for (var iSS=0; iSS < document.styleSheets.length; iSS++) {
	var rules = document.styleSheets[iSS].rules || document.styleSheets[iSS].cssRules;
	for (var iSSR=0; iSSR < rules.length; iSSR++) {
		var rule = rules[iSSR];
		if (rule.selectorText.toLowerCase().indexOf('.news_story_title')!=-1) {
			rule.style.color = '';
		}
	}
}

// .leaderboard{display:none;}
for (var iSS=0; iSS < document.styleSheets.length; iSS++) {
	var rules = document.styleSheets[iSS].rules || document.styleSheets[iSS].cssRules;
	for (var iSSR=0; iSSR < rules.length; iSSR++) {
		var rule = rules[iSSR];
		if (rule.selectorText.toLowerCase().indexOf('.leaderboard')!=-1) {
			rule.style.display = 'none';
		}
	}
}

// .sponsorbox{display:none;}
for (var iSS=0; iSS < document.styleSheets.length; iSS++) {
	var rules = document.styleSheets[iSS].rules || document.styleSheets[iSS].cssRules;
	for (var iSSR=0; iSSR < rules.length; iSSR++) {
		var rule = rules[iSSR];
		if (rule.selectorText.toLowerCase().indexOf('.sponsorbox')!=-1) {
			rule.style.display = 'none';
		}
	}
}
