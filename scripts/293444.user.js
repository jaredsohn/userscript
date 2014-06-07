// ==UserScript==
// @name        HD02
// @namespace   imtavhomer
// @description adq hackday 2014
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include     http://www.imdb.com/*
// @include     http://www.yourtango.com/*
// @include     http://www.indiatimes.com/*
// @include     http://www.hindustantimes.com/*
// @include     http://www.fhm.com/*
// @version     1
// @grant       none
// ==/UserScript==
var debug = false;

var impWords = ['xxx', 'gay', 'sex', 'cock', 'sexual', 'affair', 'lingerie', 'penis', 'vagina', 'pussy', 'bondage', 'dominatrix', 'suck', 'fuck', ' ass ', 'breast', 'boob', 'dating', 'bunny', 'playmate', 'nude', 'girl', 'erotic', 'wild', 'babe', 'porn', 'blonde', 'bdsm', 'exotic', 'roleplay', 'lesbian', 'milf', 'dick', 'orgasm'];
var validTypes = ["header", "p", "span", "div"];
var elements = [];

function llHighlight(original, word) {
    return original.replace(new RegExp(word, 'gi'), function (val) {
        return '<span style="background-color:yellow; font-weight:bold">' + val + '</span>';
    });
}

jQuery.fn.highlight = function (word) {
    this.html(llHighlight(this.html(), word));
};

jQuery.fn.isLeaf = function () {
    if (debug)
        alert($(this).text() + ' //called with isLeaf');
    return $(this).children().length == 0;
};

jQuery.fn.recurse = function () {
    var objs = [];
    if ($(this).isLeaf()) {
        if ($(this).text().length >= 3)
            objs.push($(this));
    } else {
        $(this).children().each(function () {
            objs.push.apply(objs, $(this).recurse());
        });
    }
    return objs;
};

for (var i = 0; i < validTypes.length; i++) {
    $(validTypes[i]).each(function () {
        elements.push.apply(elements, $(this).recurse());
    });
}

var step = 20;
for (var i = 0; i < impWords.length; i += step) {
    var x = i + step;
    if (x > impWords.length)
        x = impWords.length;
    var str = impWords.slice(i, x).join("|");
    str = "(".concat(str, ")");
    for (var j = 0; j < elements.length; j++) {
        elements[j].highlight(str);
    }
}

//=====
function occurrences(string, subString) {
    string = string + '';
    subString = subString + '';
    string = string.toLowerCase();
    subString = subString.toLowerCase();
    if (string.length <= 0 || subString.length <= 0)
        return 0;
    else {
        var i = 0;
        var count = 0;
        while (i <= string.length) {
            var index = string.indexOf(subString, i);
            if (index >= 0) {
                ++count;
                i = index + subString.length;
            }
            else break;
        }
        return count;
    }
}

var frequency = [];

for (var i = 0; i <= impWords.length; i++) {
    if (frequency[i] > 0)
        break;
    if (debug)
        alert('Counting occurences of ' + impWords[i]);
    //var count = 0;
    //for (var j = 0; j <= elements.length; j++) {
    //    var x = occurrences(elements[j].text(), impWords[i]);
    //    count = count + x;
    //    if (x > 0)
    //        alert('Occurences of ' + impWords[i] + ' in ' + elements[j].text() + ' = ' + x);
    //}
    //alert(impWords[i] + ' ' + count);
    var count = occurrences(document.body.innerHTML, impWords[i]);
    //alert(count);
    frequency.push(count);
}

debug = true;
if (debug) {
    // alert(document.body.innerHTML.substr(0, 50));
    //alert('Occurences of-\n' + impWords.join('\t') + '\n' + frequency.join('\t'));
}

//==
var compareWeights = function (a, b) {
    return a - b;
};

// Converts hex to an RGB array
var toRGB = function (code) {
    if (code.length === 4) {
        code = code.replace(/(\w)(\w)(\w)/gi, "\$1\$1\$2\$2\$3\$3");
    }
    var hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
    return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
};

// Converts an RGB array to hex
var toHex = function (ary) {
    return "#" + jQuery.map(ary, function (i) {
        var hex = i.toString(16);
        hex = (hex.length === 1) ? "0" + hex : hex;
        return hex;
    }).join("");
};

var colorIncrement = function (color, range) {
    return jQuery.map(toRGB(color.end), function (n, i) {
        return (n - toRGB(color.start)[i]) / range;
    });
};

var tagColor = function (color, increment, weighting) {
    var rgb = jQuery.map(toRGB(color.start), function (n, i) {
        var ref = Math.round(n + (increment[i] * weighting));
        if (ref > 255) {
            ref = 255;
        } else {
            if (ref < 0) {
                ref = 0;
            }
        }
        return ref;
    });
    return toHex(rgb);
};

$.fn.tagcloud = function (options) {

    var opts = $.extend({}, $.fn.tagcloud.defaults, options);
    var tagWeights = this.map(function () {
        return $(this).attr("rel");
    });
    tagWeights = jQuery.makeArray(tagWeights).sort(compareWeights);
    var lowest = tagWeights[0];
    var highest = tagWeights.pop();
    var range = highest - lowest;
    if (range === 0) { range = 1; }
    // Sizes
    var fontIncr, colorIncr;
    if (opts.size) {
        fontIncr = (opts.size.end - opts.size.start) / range;
    }
    // Colors
    if (opts.color) {
        colorIncr = colorIncrement(opts.color, range);
    }
    return this.each(function () {
        var weighting = $(this).attr("rel") - lowest;
        if (opts.size) {
            $(this).css({ "font-size": opts.size.start + (weighting * fontIncr) + opts.size.unit });
        }
        if (opts.color) {
            $(this).css({ "color": tagColor(opts.color, colorIncr, weighting) });
        }
    });
};

$.fn.tagcloud.defaults = {
    size: { start: 8, end: 36, unit: "pt" }
};
//==

//alert("called this far");

function createUI() {
    var panel = document.createElement("div");
    panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:2px solid #000; padding:5px; position:fixed; top:0px; left:0px; text-align:left;");
    document.body.appendChild(panel);
    //    var str = "<input type=\"text\" id=\"createCloud\" value=\"Tag Cloud\" style=\"height:27px\" readonly=\"readonly\" />" + "      <div id=\"tagcloud\">";
    var str = "<div id=\"tagcloud\">";
    //alert(str);
    var charsPrinted = 0;
    for (var i = 0; i < impWords.length; i++) {
        if (frequency[i] > 0) {
            charsPrinted += impWords[i].length;
            var padding = Math.round(Math.random() * 8);
            var padCount = 0;
            var padStr = "&#160;";
            while (padCount++ < padding) {
                padStr = padStr + "&#160;";
            }
            charsPrinted += (2 * padCount);
            str = str + (padStr + '<a href=\"#\" rel=\"' + frequency[i] + '\">' + impWords[i] + '</a>' + padStr);
            var ran = Math.random();
            if (charsPrinted > 30 || ran > 0.5) {
                str = str + '<br>';
                charsPrinted = 0;
            }
        }
        //alert(str);
    }
    str = str + "</div>";
    panel.innerHTML = str;
}

createUI();
$("#tagcloud a").tagcloud();