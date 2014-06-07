// ==UserScript==
// @name          Simple Face Icons for Facebook 2
// @namespace     eopin-js
// @description   Implementation of Simple Face Icons in Facebook
// @author        Saïd Dermoumi <sdermoumi@gmail.com>
// @homepage      http://twitter.com/eopin
// @run-at        document-start
// ==/UserScript==

(function() {
if (document.domain.indexOf('facebook.com') == -1 || window['SplSetup']) return;

window['SplSetup'] = true;

var rules = [];

// A utility function for making escaped emoticon RegExps
function makeRegExp(str) {
    str = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    return RegExp('^'+str+'$|^'+ str +'([ !?,\.\'"])|([ !?,\.\'"])'+ str +'([ !?,\.\'"])|([ !?,\.\'"])'+ str +'$', 'gm');
}

// Adds a emoticon rule to the file
function addRule(emote, profileId) {
    if (typeof emote == "object") {
        for (n in emote) {
            if (typeof emote[n] != "string") continue;
            rules.push({
                reg: makeRegExp(emote[n]),
                rep: '$4$2[['+ profileId +']]$1$3'
            });
        }
    }
    else if (typeof emote == "string") {
        rules.push({
            reg: makeRegExp(emote),
            rep: '$4$2[['+ profileId +']]$1$3'
        });
    }
}

// Applies rules to a string
function process(str) {
    if (typeof str != 'string') return;
    for (n in rules) {
        str = str.replace(rules[n].reg, rules[n].rep);
    }
    return str;
}

// Watch for when user clicks on "Send" button on message mode
document.addEventListener('mousedown', function(e) {
    var targets = [],
        parent = e.target.parentNode;
    if (!parent) return;
    var parentId = parent.getAttribute('id');
    var parentClass = parent.getAttribute('class');
    if (parentId == 'MessagingSendReplyButton') {
        targets = parent.parentNode.parentNode.getElementsByClassName('MessagingComposerBody');
    }
    else if (parentClass.indexOf('uiButton') >= 0 && parentClass.indexOf('uiButtonConfirm') >= 0) {
        targets = parent.parentNode.parentNode.parentNode.getElementsByClassName('MessagingComposerBody');
    }
    else {
        return;
    }

    for (n in targets) {
        targets[n].value = process(targets[n].value);
    }
}, true);

// Watch for when user clicks on Enter and is focusing a message textarea
document.addEventListener('keydown', function(e) {
    if (e.keyCode != 13 || e.shiftKey) return;

    var elem = document.activeElement;
    var elemClass = elem.getAttribute('class');
    if ((elemClass.indexOf('MessagingComposerBody') >= 0
        && document.getElementById('MessagingSendOnEnterCheckbox').checked)
        || (elemClass.indexOf('uiTextareaAutogrow') >= 0 && elem.parentNode && elem.parentNode.getElementsByClassName('inputIcon')[0])
    ) {
        elem.value = process(elem.value);
    }

}, true);

// Edit these if you want to customize emoticons
addRule([":Megusta:"], '293955833972970]][[293955850639635]][[293955873972966]][[293955920639628]][[293956017306285]]
[[293956043972949]][[293956060639614]][[293956087306278]][[293956100639610]][[293956107306276]] 
[[293956117306275]][[293956127306274]][[293956147306272]][[293956220639598]][[293956283972925]] 
[[293956303972923]][[293956327306254]][[293956350639585]][[293956370639583]][[293956450639575]] 
[[293956570639563]][[293956620639558]][[293956677306219]][[293956710639549]][[293956767306210');


})();