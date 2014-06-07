// ==UserScript==
// @name           Locate Keywords in Search Engine Results
// @filename       locate-keywords.user.js
// @author         Alex Hall
// @homepage       http://www.devseo.co.uk/
// @namespace      http://www.devseo.co.uk/blog/view/locate-keywords-in-search-engine-results
// @version        1.0.1
// @description    Locate specific keywofds easily within the business description of results in a Google, Yahoo!, or Bing Search
// @include        http://www.google.com/search*
// @include        http://google.com/search*
// @include        http://www.google.co.uk/search*
// @include        http://google.co.uk/search*
// @include        http://uk.search.yahoo.com/search*
// @include        http://search.yahoo.com/*
// @include        http://bing.com/search*
// @include        http://www.bing.com/search*
// ==/UserScript==


//***********************BEGIN CONFIGURATION**********************//
// Set the array of keyphrases you wish to locate
// syntax [['a keyword', 'acolor'], ['keyword number 2', 'acolor'], ['keyword 3', 'acolor']];
// Set the color variable to the background color you wish to use to highlight your keyphrase (defaults to yellow)
var keywords = [
	['website', '#F00'],
	['development', '#CCC'],
	['devseo', '#5090D0']
];
var keywordLen = keywords.length;

//************************END CONFIGURATION***********************//

//*******************DO NOT EDIT PAST THIS LINE*******************//
//****************UNLESS YOU KNOW WHAT YOU'RE DOING***************//
var all_divs = document.getElementsByTagName('div');
var divLen = all_divs.length;

if (location.hostname.indexOf("google.com")!=-1) {
    for (i=0; i<divLen; i++) {
    	if (all_divs[i].className!='s') { continue; }
    	var descText = all_divs[i].innerHTML;
    	descText = str_replace('<em>', '', descText);
    	descText = str_replace('</em>', '', descText);
    	var textSplit = descText.split('<br>');
    	descText = textSplit[0];

		var j=0;
    	while(j<keywordLen){
    		if(strstr(descText.toLowerCase(), keywords[j][0].toLowerCase())){
    			descText = str_replace(keywords[j][0].toLowerCase(), '<strong style="background-color:'+keywords[j][1]+'">'+keywords[j][0].toLowerCase()+'</strong>', descText.toLowerCase());
    		}
    		j++;
    	}
    	var newDiv = document.createElement('span');
    	newDiv.innerHTML = descText;
    	all_divs[i].replaceChild(newDiv, all_divs[i].childNodes[0]);
    }
} else if (location.hostname.indexOf("google.co.uk")!=-1) {
    for (i=0; i<divLen; i++) {
    	if (all_divs[i].className!='s') { continue; }
    	var descText = all_divs[i].innerHTML;
    	descText = str_replace('<em>', '', descText);
    	descText = str_replace('</em>', '', descText);
    	descText = str_replace('<b>', '', descText);
    	descText = str_replace('</b>', '', descText);

    	all_divs[i].innerHTML = descText;

    	var textSplit = descText.split('<br>');
    	descText = textSplit[0];

		var j=0;
    	while(j<keywordLen){
    		if(strstr(descText.toLowerCase(), keywords[j][0].toLowerCase())){
    			descText = str_replace(keywords[j][0].toLowerCase(), '<strong style="background-color:'+keywords[j][1]+'">'+keywords[j][0].toLowerCase()+'</strong>', descText.toLowerCase());
    		}
    		j++;
    	}
    	var newDiv = document.createElement('span');
    	newDiv.innerHTML = descText;
    	all_divs[i].replaceChild(newDiv, all_divs[i].childNodes[0]);
    }
} else if (location.hostname.indexOf("yahoo.com")!=-1) {
    for (i=0; i<divLen; i++) {
    	if (all_divs[i].className!='abstr') { continue; }
    	var descText = all_divs[i].innerHTML;
    	descText = str_replace('<b>', '', descText);
    	descText = str_replace('</b>', '', descText);

		var j=0;
    	while(j<keywordLen){
    		if(strstr(descText.toLowerCase(), keywords[j][0].toLowerCase())){
    			descText = str_replace(keywords[j][0].toLowerCase(), '<strong style="background-color:'+keywords[j][1]+'">'+keywords[j][0].toLowerCase()+'</strong>', descText.toLowerCase());
    		}
    		j++;
    	}
    	all_divs[i].innerHTML = descText;
    }
} else if (location.hostname.indexOf("bing.com")!=-1) {
	var all_uls=document.getElementsByTagName('ul');
	var ulsLen = all_uls.length;
	for (i=0; i<ulsLen; i++) {
        if (all_uls[i].className!='sb_meta') { continue; }
        var pNode = all_uls[i].previousSibling
        var descText = pNode.innerHTML;
    	descText = str_replace('<strong>', '', descText);
    	descText = str_replace('</strong>', '', descText);

		var j=0;
    	while(j<keywordLen){
    		if(strstr(descText.toLowerCase(), keywords[j][0].toLowerCase())){
    			descText = str_replace(keywords[j][0].toLowerCase(), '<strong style="background-color:'+keywords[j][1]+'">'+keywords[j][0].toLowerCase()+'</strong>', descText.toLowerCase());
    		}
    		j++;
    	}
    	pNode.innerHTML = descText;
    }
}

function str_replace (search, replace, subject, count) {
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i=0, sl=s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j=0, fl=f.length; j < fl; j++) {
            temp = s[i]+'';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length-s[i].length)/f[j].length;}
        }
    }
    return sa ? s : s[0];
}
function strstr (haystack, needle, bool) {
    var pos = 0;

    haystack += '';
    pos = haystack.indexOf( needle );
    if (pos == -1) {
        return false;
    } else{
        if (bool){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}