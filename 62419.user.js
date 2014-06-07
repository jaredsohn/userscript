// ==UserScript==
// @name           Drexel Term Master Schedule Readability
// @namespace      http://roryokane.com/
// @description	   Expands needless abbreviations in Drexel University’s online Term Master Schedule.
// @include        *://duapp*.drexel.edu/webtms_du/*
// @grant          none
// @tabwidth       4
// ==/UserScript==

var findAndReplacePairs = [
	[ /\b()M([TWRF]*)\b/,       "$1Mo$2" ],
	[ /\b([Mo]*)T([WRF]*)\b/,   "$1Tu$2" ],
	[ /\b([MoTu]*)W([RF]*)\b/,  "$1We$2" ],
	[ /\b([MoTuWe]*)R([F]*)\b/, "$1Th$2" ],
	[ /\b([MoTuWeTh]*)F()\b/,   "$1Fr$2" ],
	[ /\bSubj\b/,       "Subject"            ],
	[ /\bCrse\b/,       "Course"             ],
	[ /\bSec\b/,        "Section"            ],
	[ /\bBldg\b/,       "Building"           ],
	[ /\bMax Enroll\b/, "Max Enrollment"     ],
	[ /\bEnroll\b/,     "Current Enrollment" ],
	[ /\bInstr Type\b/, "Instruction Type"   ]
]

/* note: this only replaces in text, so text with, for instance,
   <BR>s in the middle, won't be found with this */
for (var i=0; i < findAndReplacePairs.length; i++) {
	pair = findAndReplacePairs[i]
	findAndReplace( pair[0], pair[1] )
}

/* following function is right from
   http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/ */
function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}