// ==UserScript==
// @name           Tw153
// @namespace      http://iss.oy.ne.ro/tw153
// @description    Lets you write up to 153 characters in one tweet!  
// @include        http://twitter.com/
// ==/UserScript==
// Firefox XPI GUID: e21bfbda-6a34-489c-b589-31ad62b17324
// Tw153 is Copyright 2009 by Yossi Oren
// (with help from @m5rammy)
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 
// 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 
//
// Check that there's a tweet entry form on this page and modify it.
// twitter is really cool, but I can't truly express myself in 140 characters...  If only there was some magical way to fit more characters into every tweet...
function modifyUI() {
    // Only 1-character replacements work right now, unless you add another .split("").reverse().join("") 
    // To match dots, type in ".\\".  To match backslashes, type in "\\\\"
    var replacements = {"facebook" : "╒",
    "twitter" : "✔",
    "youtube" : "으",
    ".\\.\\.\\" : "…",
    "10.\\" : "⒑",
    "11.\\" : "⒒",
    "12.\\" : "⒓",
    "13.\\" : "⒔",
    "14.\\" : "⒕",
    "15.\\" : "⒖",
    "16.\\" : "⒗",
    "17.\\" : "⒘",
    "18.\\" : "⒙",
    "19.\\" : "⒚",
    "20.\\" : "⒛",
    "1.\\" : "⒈",
    "2.\\" : "⒉",
    "3.\\" : "⒊",
    "4.\\" : "⒋",
    "5.\\" : "⒌",
    "6.\\" : "⒍",
    "7.\\" : "⒎",
    "8.\\" : "⒏",
    "9.\\" : "⒐",
    "http:\/\/www\." : "\.www",
    "http:\/\/" : "\.www",
    "a.\\m.\\" : "㏂",
    "p.\\m.\\" : "㏘",
    "the " : " Θ",
    "bar" : "㍴",
    "cal" : "㎈",
    "ffi" : "ﬃ",
    "log" : "㏒",
    "mil" : "㏕",
    "mol" : "㏖",
    "rad" : "㎭",
    "tel" : "℡",
    "ac" : "ᇨ",
    "ae" : "ӕ",
    "AU" : "㍳",
    "cc" : "㏄",
    "cd" : "㏅",
    "cm" : "㎝",
    "da" : "㍲",
    "el" : "ઘ",
    "ff" : "ﬀ",
    "fi" : "ﬁ",
    "fl" : "ﬂ",
    "fm" : "㎙",
    "Gy" : "㏉",
    "ha" : "㏊",
    "hu" : "ƕ",
    "ii" : "ⅱ",
    "Im" : "㏐",
    "in" : "㏌",
    "Is" : "ʪ",
    "iv" : "ⅳ",
    "kt" : "㏏",
    "ll" : "∥",
    "lm" : "㏐",
    "ln" : "㏑",
    "ls" : "ʪ",
    "mg" : "㎎",
    "mm" : "㎜",
    "ms" : "㎳",
    "nj" : "ǌ" , // might come in handy when discussing Benjamin, the banjoist, injured by punjabi ninjas? (how unjust)
    "nm" : "㎚",
    "no" : "№",
    "ns" : "㎱",
    "oe" : "œ",
    "oh" : "애",
    "oo" : "ᅇ",
    "00" : "ᅇ", // Korea: not just for zerglings anymore
    "Pa" : "㎩",
    "pc" : "㍶",
    "ps" : "㎰",
    "sr" : "㏛", 
    "st" : "ﬆ",
    "ts" : "ʦ",
    "tt" : "比", 
    "ue" : "ᵫ",
    "vi" : "ⅵ",
    "!!" : "‼"
    };
    //":-\\)" : "☹",
    //":-\\(" : "☹" Unicode smileys are too small... bummer

    // Here's the code!
    // steal Twitter's jQuery;
    if ($) {} else {
        var $ = null;
        if (typeof unsafeWindow != "undefined")
            $ = unsafeWindow.$
        else 
            $ = window.$;
    }

    var compress = function(input) {
        // we match the regexes in reverse, since javascript has no negative lookbehind
        // One strange side-effect is that to match a "." you need to type in ".\\"
        // http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
        var output = input.split("").reverse().join("");
        // For each replacement we know how to make,
        for (var ex in replacements)
            // Block DMs, mentions and URLs from being replaced
            output = new String(output.replace(new RegExp(ex.split("").reverse().join("") +"(?![^ ]*(www|[@#]))", "g"), replacements[ex]));

        return output.split("").reverse().join("");
    };

    var addCompressionFactor  = function() {
        // Find out how much we can save
        var statusText = $("textarea#status").val();
        var compressedText = compress(statusText);
        var compressionFactor = statusText.length - compressedText.length;    

        // Check for the "140" textbox
        var statusFieldCharCounter = document.getElementById("status-field-char-counter");
        if (typeof(statusFieldCharCounter) != "object")
            return false;
        
        // Add a bonus UI elemnt to its right
        statusFieldCharCounter.innerHTML += '<label style="color: rgb(140, 230, 140);">+' + compressionFactor + '</label>';
        
        // Ungray the "update" button if the compressed char count is less than 140
        if (statusText.length > 140 && compressedText.length <= 140) {
            $("#update-submit").removeAttr("disabled").removeClass("disabled");
// my twitter is different -m5r
            $("#tweeting_button").removeAttr("disabled").removeClass("btn-disabled");
        }
        // TODO - emphasize the fact that we're doing some tricks.
    }
    
    var txtStatus = $("textarea#status");
    
    // Add a custom function to changes in the status box.
    txtStatus.bind("blur focus change" + ($.browser.mozilla ? "paste input" : "keyup"), function () {addCompressionFactor()});
    
    // Save the shift state so we don't compress tweets if shift is down
    var shiftIsPressed = false;
    $('body').mouseup(function(e) {shiftIsPressed = e.shiftKey;});

    // 15/05/2010
    // Subclass the JQuery Ajax handler
    var oldJQueryAjax = $.ajax;
    newAjax = function(params) {
        // Are we updating the status?
        if (params.url == '/status/update') {
            // Compress the tweet
            var compressedText = compress(params.data.status);

            // compress the original tweet (unless the shift key is pressed)
            if (shiftIsPressed == false)
                params.data.status = compressedText;
        }
        
        // Fall back to the original Ajax handler
        ret = oldJQueryAjax(params);
        return ret;
    };
    $.ajax = newAjax;
}

if (window.addEventListener) {
    // Everybody-else support
    window.addEventListener('load', function() {modifyUI();}, true);
} else {
    // IE support 
    window.setTimeout(function() {modifyUI();}, 100);
}
    