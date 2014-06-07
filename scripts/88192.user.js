// ==UserScript==
// @name          Unicode Auto Complete
// @namespace     http://userscripts.org/scripts/show/88192
// @description   Converts shortcut text as you type
// @include        *
// ==/UserScript==

// Version 0.4
// Change the keys variable below to add new shortcuts.
// Based on original script by Remy Sharp http://userscripts.org/scripts/show/34248
// Jon Connelly

function autoComplete() {
    var keys = { 
	"<3" : "♥",
	"fstop" : "ƒ",
	"heart!" : "♥",
        ":-)" : "☺",
        ":)" : "☺",
	"smile!" : "☺",
  	"2/3" : "⅔",
	      ":-(" : "☹",
        ":(" : "☹",
	"sad!" : "☹",
        "peace" : "☮",
        "copyright" : "©",
        "tm" : "™",
        "euro" : "€",
        "<<" : "«",
        ">>" : "»",
        "yen" : "¥",    "music1" : "♪",
	"music2" : "♬",
	"music3" : "♫",
	"spade" : "♠",
	"star2" : "✩",
	"star1" : "★",
	"star3" : "✮",
	"star4" : "✯",
	"king" : "♛",
	"flower1" : "❁",
	"flower2" : "❀",
	"flower3" : "✿",
	"sun!" : "☼",
	"fleur" : "✾",
	"ying" : "☯",
	"snowflake1" : "✺",
	"snowflake2" : "✵",
	"radioactive" : "☢",
	"crossbones" : "☠",
	"biohazard" : "☣",
	"diamond" : "♦", 	
	"diamond2" : "❖",
	"bigheart" : "❤",
	"whiteheart" : "♡",
	"club" : "♣",
	"whitediamond" : "♢",
	"whiteclub" : "♧",
	"northstar1" : "✦",
	"northstar2" : "✧",
	"farenheit" : "℉",
	"celsius" : "℃",
	"1/4" : "¼",
	"1/2" : "½",
		"1/3" : "⅓"
    },
    status = document.getElementById('status'),
    text, i, word, timer, autoComplete,
    // massive nasty array conversion and concatination
    inputs = [].slice.apply(document.getElementsByTagName('input')).concat([].slice.apply(document.getElementsByTagName('textarea')));
        
    // create a fast lookup regexp of all the terms used in a .test() later on
    var keyMatch = [];
    for (i in keys) {
        keyMatch.push(i.replace(/[\(\)\-]/g, function (m) {
            return '\\' + m;
        }));
    }
    
    keyMatch = new RegExp('(\\s*|^)' + keyMatch.join('|') + '(\\s+)');
	
    autoComplete = function (event) {
        var el = event ? event.target : this;
        clearTimeout(timer); // we do it twice, but it's because we might be called via the blur
        // do a fast .test to see if we need to run
        if (keyMatch.test(el.value.toLowerCase())) {
            el.value = el.value.replace(/(\s*|^)([\S]*)(\s+)/g, function (m, c1, c2, c3) {
                return (c2 && keys[c2.toLowerCase()]) ? keys[c2.toLowerCase()] + c3 : m;
            });
        }
    };
    
    var autoCompleteDelayed = function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            autoComplete(event);
        }, 100);
    };
    
    inputs.forEach(function (element, index, array) {
        element.addEventListener('keydown', autoCompleteDelayed, true);
        element.addEventListener('blur', autoComplete, true);
    });
}

autoComplete();