// ==UserScript==
// @name           Pace auto-calculator
// @namespace      jime1955
// @description    Calculate and convert paces
// @version        0.3
// @include        http://community.runnersworld.com/*
// @include        https://community.runnersworld.com/*
// @match          http://community.runnersworld.com/*
// @match          https://community.runnersworld.com/*
// @grant          metadata
// ==/UserScript==

var KM_PER_MILE = 1.609344;
var MILE_PER_KM = (1 / KM_PER_MILE);

function pad(num, size) {
    // left zero padding
    var s = num.toString();
    while (s.length < size) {
	s = '0' + s;
    }
    return s;
}

function sss2MinSec(sss) {
    // turn seconds into a dict with mm and ss ints, and a string
    var mm = Math.floor(sss / 60),
    ss = Math.floor(sss % 60);
    return ({'mm': mm.toFixed(), 'ss': pad(ss.toFixed(), 2),
	     'str': mm.toFixed() + ':' + pad(ss.toFixed(), 2)});
}

function hrMinSec2sss(hh, mm, ss) {
    // string hh, mm and ss to integer seconds
    var hhi, mmi, ssi;
    hhi = parseInt(hh, 10);
    if (!hhi) { hhi = 0; }
    mmi = parseInt(mm, 10);
    ssi = parseInt(ss, 10);
    return ((hhi * 3600) + (mmi * 60) + ssi);
}

function timeconv(hit) {
    // convert a bare time both ways
    var sssi, sssm, sssf;
    sssi = hrMinSec2sss('0', hit[1], hit[2]);
    sssm = sssi * MILE_PER_KM;
    sssf = sssi * KM_PER_MILE;
    return (sss2MinSec(sssi).str + ' min/mile = '
	   + sss2MinSec(sssm).str + " min/km\n"
	   + sss2MinSec(sssi).str + ' min/km = '
	   + sss2MinSec(sssf).str + " min/mile");
}

function milesInTimeConv(hit) {
    // convert "x miles in y" to a pace with conversion
    var sss, sssPerMile, mileMinSec, kmMinSec, dist;
    if (hit.length === 4) {
	sss = hrMinSec2sss('0', hit[2], hit[3]);
    }
    else {
	sss = hrMinSec2sss(hit[2], hit[3], hit[4]);
    }
    sssPerMile = (sss / parseFloat(hit[1])).toFixed();
    mileMinSec = sss2MinSec(sssPerMile);
    kmMinSec = sss2MinSec(sssPerMile * MILE_PER_KM);
    return ('Pace: ' + mileMinSec.str + ' per Mile\n'
	    + '   or: ' + kmMinSec.str + ' per Km');
}

function halfInTimeConv(hit) {
    // special case for half marathons
    var newHit = [hit[0], '13.11', hit[2], hit[3], hit[4]];
    return milesInTimeConv(newHit);
}

function fullInTimeConv(hit) {
    // special case for full marathons
    var newHit = [hit[0], '26.22', hit[2], hit[3], hit[4]];
    return milesInTimeConv(newHit);
}

function kmsInTimeConv(hit) {
    // convert "x km in y" to a pace with conversion
    var sss, sssPerKm, kmMinSec, mileMinSec;
    if (hit.length === 4) {
	sss = hrMinSec2sss('0', hit[2], hit[3]);
    }
    else {
	sss = hrMinSec2sss(hit[2], hit[3], hit[4]);
    }
    sssPerKm = (sss / parseFloat(hit[1])).toFixed();
    kmMinSec = sss2MinSec(sssPerKm);
    mileMinSec = sss2MinSec(sssPerKm * KM_PER_MILE);
    return ('Pace: ' + kmMinSec.str + ' per Km\n'
	    + '   or: ' + mileMinSec.str + ' per Mile');
}

function bothInTimeConv(hit) {
    // no units, so calculate pace both ways
    return ('If ' + hit[1] + ' miles:\n'
	    + milesInTimeConv(hit) + '\n'
	    + 'If ' + hit[1] + ' Km:\n'
	    + kmsInTimeConv(hit));
}

function alwaysSane(hit) {return true;}

function sanePace(hit) {
    // sane if not too large
    return (hit[1] < 16); 
}

function saneHalf(hit) {
    // half marathon sane if between 1 and 4 hours
    var hours = parseInt(hit[2]);
    return (hours >= 1 && hours < 4); 
}

function saneMarathon(hit) {
    // full marathon sane if between 2 and 8 hours
    var hours = parseInt(hit[2]);
    return (hours >= 2 && hours < 8); 
}

var paceRegexps = [
    // nn.nn miles in hh:mm:ss
    {'regex': /\b([0-9]{1,2}\.?[0-9]{0,2})\s+miles?\s+in\s+([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': milesInTimeConv,
     'sanity': alwaysSane},

    // nn.nn miles in mm:ss
    {'regex': /\b([0-9]{1,2}\.?[0-9]{0,2})\s*(?:miles?|m|mi)?\s+in\s+([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': milesInTimeConv,
     'sanity': alwaysSane},

    // nn.nn in hh:mm:ss
    {'regex': /\b([0-9]{1,2}\.?[0-9]{0,2})\s+in\s+([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': bothInTimeConv,
     'sanity': alwaysSane},

    // nn.nn in mm:ss
    {'regex': /\b([0-9]{1,2}\.?[0-9]{0,2})\s+in\s+([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': bothInTimeConv,
    'sanity': alwaysSane},

    // nn.nn km in hh:mm:ss
    {'regex': /\b([0-9]{1,2}\.?[0-9]{0,2})\s*(?:k|kms?|kilometers?|kilometres?)\s+in\s+([0-9]{1,2}(?:\:))?([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': kmsInTimeConv,
     'sanity': alwaysSane},

    // nn.nnK in mm:ss
    {'regex': /\b([0-9]{1,2})[k]m?[:\s]+([0-9]{1,2}(?:\:))?([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': kmsInTimeConv,
     'sanity': alwaysSane},

    // half hh:mm:ss (and synonyms)
    {'regex': /\b(half|13.1|1\/2|hm)[mi:\s]+([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': halfInTimeConv,
     'sanity': saneHalf},

    // marathon hh:mm:ss (and synonyms)
    {'regex': /\b(full|26.2|marathon|fm)[mi:\s]+([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})\b/i,
     'converter': fullInTimeConv,
     'sanity': saneMarathon},

    // bare mm:ss pace without units or distance
    {'regex': /(?:\s|^|\()([0-9]{1,2}):([0-9]{1,2})(?:[^:0-9]|$)/, 
     'converter': timeconv,
     'sanity': sanePace}
];

function nodeFilter(element) {
    // Suitable text nodes contain numbers and have the right parents
    var excluded = { option: 1, script: 1, textarea: 1 };
    try {
	if (element.parentNode) {
	    return ((!excluded[element.parentNode.tagName.toLowerCase()])
		    && (element.nodeValue.match(/[0-9]/) !== null));
	}
    }
    catch(e) {console.log("no parentnode: " + e.name)}
}

function Find(text, regex, index, firstTextLen) {
    // A text 'hit' with relevant info
    var hit, newindex;
    newindex = text.slice(index).search(regex.regex);
    if (newindex !== -1) {
	hit = regex.regex.exec(text.slice(newindex + index));
	if(! regex.sanity(hit)) { return }
	this.index = newindex + index;
	this.len = Math.min(hit[0].length,
			    firstTextLen - this.index);
	this.text = text;
	this.hitText = hit[0].substring(0,this.len);
	this.hitLength = hit[0].length
	this.title = regex.converter(hit);
	this.offset = newindex;
    }
}
Find.sortFunc = function(a, b) {
    if (a.index === b.index) {
	return(b.hitLength - a.hitLength);
    }
    else {
	return(a.index - b.index);
    }
}
Find.prototype.toString = function() {
    return ("Found -" 
	    + " hittext: " + this.hitText
	    + ", length: " + this.len 
	    + ", index: " + this.index
	    + ", offset: " + this.offset);
}


function sortFunc (a, b) {
    // sort hits according to start point
    return(a.index - b.index);
}


function finds(nodepair, paceRegexps) {
    // make an array of all relevant hits for one text node
    var i, reIndex, textIndex = 0, found, result=[];
    var text = nodepair[0].nodeValue;
    var nextText = nodepair[1].nodeValue;

    // loop over regexps
    for (reIndex=0; reIndex < paceRegexps.length; reIndex++) {
	textIndex = 0;
	// loop over hits
	do {
	    found = new Find(text, paceRegexps[reIndex], textIndex, text.length);
	    if (found.hitText) {
		result.push(found);
		textIndex = found.index + found.len;
	    }
	    else { // try again with the next node visible
		found = new Find(text + nextText, paceRegexps[reIndex], textIndex, text.length);
		if (found.index < text.length) { 
		    result.push(found);
		    textIndex = Math.min(found.index + found.len, text.length)
		}
	    }

	} while (found.hitText && (found.index < text.length));

	if (result.length > 1) {
	    result.sort(Find.sortFunc);
	    // Get rid of overlapping hits
	    for (i = 1; i < result.length; i++) {
		if (result[i].index < (result[i - 1].index 
				       + result[i - 1].len)) {
		    result.splice(i, 1);
		}
		else {
		    // update the offset from the previous hit
		    result[i].offset = (result[i].index 
					- result[i-1].index 
					- result[i-1].len); 
		}
	    }
	} 
    }
    return (result);
}
       
function alter(node, founds) {
    // apply the found items to the text node
    for (var i = 0; i < founds.length; i++) {
	node = updateNode(node, founds[i]);
    }
}

function updateNode(node, found) {
    // add a title text to the node
    var parent, span, text, pre, post;
    text = node.nodeValue;
    // make 2 new text nodes: string to the left and right of the hit 
    pre = document.createTextNode(text.slice(0, found.offset));
    post = document.createTextNode(text.slice(found.offset
					      + found.len));

    // make a span with converted title and original text
    span = document.createElement('span');
    span.appendChild(document.createTextNode(found.hitText));
    // set the title to the converted text
    span.setAttribute('title', found.title);
    span.className = 'pacerunner';
    span.style.cursor = 'pointer';
    span.style.color = 'inherit';
    span.style.fontSize = 'inherit';
    span.style.fontWeight = 'inherit';

    if (typeof(node.parentNode) !== undefined) {
	parent = node.parentNode;
	// replace the text node with pre,span,post (working backwards)
	parent.replaceChild(post, node);
	parent.insertBefore(span, post);
	parent.insertBefore(pre, span);
    }
    return(post);
}

function paceConvert() {
    var nodes, node, found, founds, nodeIndex;
    console.log("-------------- Pace Starting ----------------");

    nodes = document.evaluate('//body//text()', document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    // loop over nodes
    for (nodeIndex = 0; nodeIndex < nodes.snapshotLength; nodeIndex++) { 
	if (nodeFilter(nodes.snapshotItem(nodeIndex))) {
	    founds = finds([nodes.snapshotItem(nodeIndex), 
			    nodes.snapshotItem(nodeIndex + 1)], paceRegexps);
	    if (founds.length > 0) {
		alter(nodes.snapshotItem(nodeIndex), founds);
	    }
	}
    }
    console.log("-------------- Pace Done ----------------");
}


paceConvert();
