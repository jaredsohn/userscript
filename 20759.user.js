// Job Rank
// version 0.1 BETA!
// 2008-01-20
// Copyright (c) 2008, Craige Thomas
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// 0.1 - Basic functionality is in. Code is in *very*
//       rough shape and has not been extensively tested. For that
//       matter, it has barely been tested at all.
//       However, it works on a few sites pretty well.
//       Please suggest improvements!
// 
// --------------------------------------------------------------------
// Description:
// This scripts learns to recognize job postings that will interest you
//
// Using a Naive Bayes Classifier as described in "A Plan for Spam" by 
// Paul Graham (http://www.paulgraham.com/spam.html), it builds a model
// of keyword frequencies in job descriptions you "like" and "dislike".
// After a bit of training, it can rank all the (job) links on a page
// so you don't waste time following ones you won't care about.
//
// Usage:
// The script adds a few links to the upper-right corner of the screen.
//
// There are 4 buttons, 3 of them are important:
// [+] - Click once for a job posting you "like"
// [-] - Click once for a job posting you "dislike"
// [rank] - Rank all the job links on the page
//
// Also, 1 more button you will not need very often:  
// [clear] - Resets everything, use with caution
//
// Notes:
// - It doesn't start working until you've voted several (10 or so)
//   pages both "up" and "down".
//
// - If you use it with tabs, hit "reload" before clicking (+) or (-) or
//   it will "forget" what it learned in the other open tabs. It's a
//   bug and will be fixed in the future (hopefully)
//
// - Remember to train on jobs you like AND jobs you dislike. If you only
//   give it jobs you like, it won't learn properly.
//
// - If there are frames or ads on the page, they will get their own
//   version of the script. Ugly, I know. I'll try to fix it.
//
// - It only ranks the first 30 links.
//
// - The code is kind of a mess. If people find this useful, I will
//   work on cleaning it up and expanding the functionality.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Job Rank
// @description   Learns your interests to rank job postings.
// @include       http://*.dice.com/*
// @include       http://*.craigslist.org/*
// @include       http://*.monster.com/*
// @include       http://www.careerbuilder.com/*
// @include       http://www.simplyhired.com/*
// @include       http://www.indeed.com/*
// ==/UserScript==



//add a convenience function to String class
String.prototype.replaceAll = function(s1, s2) { 
    return this.replace(new RegExp(s1,"g"), s2);
}
//remove some garbage characters
window.clean_words = function(words) {
    var result = "";
    words = words.toLowerCase();
    words = words.replaceAll(':', '');
    words = words.replaceAll('_', '');
    words = words.replaceAll('\n', '');
    words = words.replaceAll('\t', '');
    return words;
};
//serialize {} into string
window.join_words = function(words) {
    var result = "";
    for(word in words) {
        if(word == null || word == "" || word == " " || words[word] <= 0 || isNaN(words[word]))
            continue;
        result += word + ":" + words[word] + "_";
    }
    return result;
};
//deserialize string into {}
window.unjoin_words = function(words) {
    var result = {};
    var ws = words.split('_');
    for(var i=0; i<ws.length; i++) {
        var word = ws[i].split(':')[0];
        var score = parseInt(ws[i].split(':')[1]);
        if(word == null || word == "" || word == " " || score <= 0 || isNaN(score))
            continue;
        result[word] = score;
 
    }
    return result;
};
//create PRO {}, from Paul Graham's "A Plan for Spam"
window.setup_bayes = function() {
    var PRO_t = {};
    for(word in POS) { PRO_t[word] = 1.0; }
    for(word in NEG) { PRO_t[word] = 1.0; }
    for(word in PRO_t) {
        var g = (POS[word] != null) ? (2.0*POS[word]) : 0.0;
        var b = (NEG[word] != null) ? (NEG[word]) : 0.0;
        if(g+b < 5)
            continue;
        var min_b = (1 < b/N_NEG) ? 1 : (b/N_NEG);
        var min_g = (1 < g/N_POS) ? 1 : (g/N_POS);
        var sum_bg = min_b + min_g;
        var div_bg = min_b / sum_bg;
        var min_99 = (0.99 < div_bg) ? 0.99 : div_bg;
        var max_01 = (0.01 > min_99) ? 0.01 : min_99;
        PRO[word] = max_01;
    }
};

//deserialize POSitive and NEGative examples from strings
window.POS = unjoin_words(GM_getValue('POS', ""));
window.NEG = unjoin_words(GM_getValue('NEG', ""));
window.N_POS = GM_getValue('N_POS', 1);
window.N_NEG = GM_getValue('N_NEG', 1);
window.PRO = {};
setup_bayes();

//return [] of 15 "most interesting" words (best discriminators)
window.top15 = function(words) {
    var top = {};
    for(var i=0; i<words.length; i++) {
        var word = words[i];
        var score = (PRO[word] != null) ? PRO[word] : 0.4;
        top[word] = (score > 0.5) ? (score-0.5) : (0.5-score);
    }
    //find 15th best score
    var result = [];
    var max = 1.0;
    var best = 0.0;
    var bestw = "";
    for(var i=0; i<15; i++) {
        for(word in top) {
            if(top[word] < max && top[word] > best) {
                best = top[word];
                bestw = word;
            }
        }
        max = best;
        best = 0.0;
        result.push(bestw);
    }
    return result;
};

//compute rank of input text from "A Plan for Spam"
window.rank = function(text) {
    var words = text.split(' ');
    var best15 = top15(words);
    var prod = 1.0;
    var inv_prod = 1.0;
    for(var i=0; i<best15.length; i++) {
        var word = best15[i];
        var prod_temp = ((PRO[word] != null) ? PRO[word] : 0.4)
        var inv_prod_temp  = 1 - prod_temp;
        prod = prod * prod_temp;
        inv_prod = inv_prod * inv_prod_temp;
    }
    return prod / (prod + inv_prod);    
};

//put keywords of this text into the POSitive class
window.vote_up = function(text) {
    text = clean_words(text).split(' ');
    for(var i=0; i<text.length; i++) {
        var word = text[i];
        if(POS[word] == null) 
            POS[word] = 0;        
        POS[word] += 1;
    }
    GM_setValue('POS', join_words(POS));
    N_POS += 1;
    GM_setValue('N_POS', N_POS);
};

//put keywords of this text into NEGative class
window.vote_down = function(text) {
    text = clean_words(text).split(' ');
    for(var i=0; i<text.length; i++) {
        var word = text[i];
        if(NEG[word] == null) 
            NEG[word] = 0;        
        NEG[word] += 1;
    }
    GM_setValue('NEG', join_words(NEG));
    N_NEG += 1;
    GM_setValue('N_NEG', N_NEG);
};

//recursively walk DOM to get all TEXT nodes below input node (don't call directly, use postwalk)
window.walkdom = function(node) {
    if(node == null)
        return "";
    if(node.nodeType == 1 && node.tagName.toLowerCase() == 'script')
        return "";        
    if(node.nodeType == 3)
        return node.nodeValue;
    var result = "";
    for(var i=0; i<node.childNodes.length; i++) {
        result += walkdom(node.childNodes[i]);
    }
    return result;
};

//return cleaned-up dom-text
window.postwalk = function(node) {
    var result = "";    
    var text = walkdom(node).toLowerCase();
    text = clean_words(text).split(" ");
    for(var i=0; i<text.length; i++) {
        if(text[i] in stop_words)
            continue;
        result += text[i] + " ";
    }
    return result;
}

//words to remove before computing anything
window.stop_words = 
{"the":1,"a":1,"an":1,"me":1,"you":1,"i":1,"in":1,"who":1,"which":1,"where":1,"why":1,"then":1,
"how":1,"that":1,"of":1,"for":1,"is":1,"are":1,"as":1,"include":1,"let":1,"if":1,"and":1,"on":2,"to":3,"this":1,"there":1,
"will":1,"not":1,"work":1,"so":1,"can":1,"more":1,"or":1,"email":1,"see":1,"date":2,"border":1,"width":1,"height":1,"with":1,
"job":1,"apply":1,"click":1,"see":1,"description":1,"href":1,"results":1,"title:":1,"date:":1,"title":1,"id":1,"position":1,"your":1,
"do":1,"from":1,"must":1,"be":1,"other":1,"*":1,"-":1,"and/or":1,"such":1,"location":1,"locations:":1,"posting":1,"through":1,"candidate":1,
"here":1, "no":1,"back":1,"results":1,"help":1,"terms":1,"conditions":1,"&":1,"copyright":1,"term:":1,"pay":1,"area:":1,"code:":1,"many":1};



//either follow or discard link (return 1 if followed, or 0 if discarded)
window.handle_anchor = function (anchor) {
    if(site_rules[site] == null)
        return 0;
    if(anchor.href == null || anchor.href.indexOf('http:\/\/') < 0 || anchor.innerHTML.indexOf('img src') > 0)
        return 0;
    var useful = 0;
    for(var i=0; i< site_rules[site].length; i++) {
        if(anchor.href.indexOf(site_rules[site][i]) > 0) {
            useful = 1;
        }
    }
    if(useful == 0)
        return 0;
    GM_xmlhttpRequest({method: 'GET', url: anchor.href, onload: function(responseDetails) {
        var div = document.createElement('div');
        div.innerHTML = responseDetails.responseText;
        var score = rank(postwalk(div));
        var count = 0;
        if(count > 9) count = 9;
        //small scores are good, high counts are good, count = # of zeros after decimal
        while(count < 9) {
            score = score * 10;
            if(score > 1)
                break;
            count++;
        }
        anchor.innerHTML = "["+count+"] " + anchor.innerHTML;
    }});
    return 1;
};

//for each domain, only follow links matching one of its rules
var site_rules = {'dice.com'            : ["op=302"],
                  'craigslist.org'      : ["/sof/", "/eng/", "/sad/", "/tch/", "/web/", "/cpg/", "/acc/", "ofc", "/egr/", "/med/", "/sci/", "/bus/", "/csr/", "/edu/", "/fbh/", "/lab/", "/gov/", "/hum/", "/lgl/", "/mnu/", "/mar/", "/hea/", "/npo/", "/rej/", "/ret/","/sls/", "/spa/", "/sec/", "/trd/", "/trp/", "/tfr/", "/wri/", "/etc/", "/crg/", "/cwg/", "/dmg/", "/evg/", "/lbg/", "/wrg/", "/tlg/"],
                  'indeed.com'          : ["/rc/clk"],
                  'simplyhired.com'     : ["/a/jobs/view/"],
                  'monster.com'         : ["getjob.asp?JobID"],
                  'careerbuilder.com'   : ["JobDetails.aspx"]};

//limits maximum links followed on each page (keep it small, don't be a jerk)
var max_followed_links = 30;         

//run
var site = window.location.href.split('/')[2];
var button = document.createElement('div');
button.setAttribute("style", "position: absolute; top: 0px; right: 0px;");
button.innerHTML = ("<div style='background: #666; padding: 5px; text-align: center;'"
                    +" <a href='#' style='color: white;' id='up' >[+]</a><br/>"
                    +" <a href='#' style='color: white;' id='rank'>rank</a><br/>"
                    +" <a href='#' style='color: white;' id='clearcache'>clear</a><br/>"
                    //+" <a href='#' style='color: white;' id='showme'>show</a><br/>"
                    //+" <a href='#' style='color: white;' id='walkdom'>walk</a><br/>"
                    +" <a href='#' style='color: white;' id='down'>[-]</a>"
                    +"</div>");
var body = document.getElementsByTagName('body')[0];
body.parentNode.insertBefore(button, body.nextSibling);
document.title = '['+rank(postwalk(document.body))+']' + document.title;

document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
    if(event.target.id == 'up') {
        //mod-up current document's text
        vote_up(postwalk(document.body));
        event.stopPropagation();
        event.preventDefault();
    } else if(event.target.id == 'down') {
        //mod-down current document's text
        vote_down(postwalk(document.body));
        event.stopPropagation();
        event.preventDefault();
    } else if(event.target.id == 'rank') {
        //rewrite all links with a rank
        site = site.split('.')[site.split('.').length-2] + '.' + site.split('.')[site.split('.').length-1];
        var links = document.getElementsByTagName('a');
        var followed_links = 0;             
        for(var i=0; i<links.length; i++) {
            if(followed_links > max_followed_links)
                break;
            followed_links += handle_anchor(links[i]);    
        }
        event.stopPropagation();
        event.preventDefault();
    } else if(event.target.id == 'clearcache') {
        //reset all stored values
        POS = {}; GM_setValue('POS', "");
        NEG = {}; GM_setValue('NEG', "");
        N_POS = 1; GM_setValue('N_POS', N_POS);
        N_NEG = 1; GM_setValue('N_NEG', N_NEG);
        PRO = {};
        setup_bayes();
        event.stopPropagation();
        event.preventDefault();
    } else if(event.target.id == 'showme') {
        //show the top-15 words used to classify this text
        var text = postwalk(document.body);
        var words = text.split(' ');
        var best15 = top15(words);
        var text = "";
        for(var i=0; i<best15.length; i++) {
            text += best15[i] + "\n";
        }
        alert(text);
        event.stopPropagation();
        event.preventDefault();
    } else if(event.target.id == 'walkdom') {
        //show all text used to classify
        var text = postwalk(document.body);
        alert(text);
        event.stopPropagation();
        event.preventDefault();
    }
}, true);






