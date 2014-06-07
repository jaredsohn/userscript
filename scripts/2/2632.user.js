/**
 * Scripturizer for GreaseMonkey.
 *
 * Link scripture references to ESV at Good News Publisher or Bible Gateway.
 *
 * For more information, see
 *
 *   http://fucoder.com/code/scripturizer-js/#toc-gm
 *
 * @author Scott Yang <scotty@yang.id.au>
 * @version 1.0
 */

// ==UserScript==
// @name Scripturizer
// @namespace http://fucoder.com
// @description Scripturize the web page! Create links to Bible references.
// @include *
// ==/UserScript==

(function() {
    var ScripturizerGM = {
        /**
         * Maximum number of DOM text nodes to process before handing the
         * event thread back to GUI and wait for the next round. Smaller value
         * leaders to more responsive UI, but slower to finish parsing.
         */
        max_nodes: 500,

        /*********************************************************************
         * Code section - No need to modify the code below this point.
         *********************************************************************/

        translationmap: {
            'AMP':     ['45', 'Amplified Bible'],
            'ASV':     ['8"', 'American Standard Version'],
            'CEV':     ['46', 'Contemporary English Version'],
            'DARBY':   ['16', 'Darby Translation'],
            'ESV':     ['47', 'English Standard Version'],
            'HCSB':    ['77', 'Holman Christian Standard Bible'],
            'KJ21':    ['48', '21st Century King James Version'],
            'KJV':     ['9',  'King James Version'],
            'MSG':     ['65', 'The Message'],
            'NASB':    ['49', 'New American Standard Bible'],
            'NIRV':    ['76', 'New International Reader\'s Version'],
            'NIV':     ['31', 'New International Version'],
            'NIV-UK':  ['64', 'New International Version - UK'],
            'NKJV':    ['50', 'New King James Version'],
            'NLT':     ['51', 'New Living Translation'],
            'NLV':     ['74', 'New Life Version'],
            'WE':      ['73', 'Worldwide English (New Testament)'],
            'WNT':     ['53', 'Wycliffe New Testament'],
            'YLT':     ['15', 'Young\'s Literal Translation']
        },

        do_element: function(elm) {
            var vol = 'I+|1st|2nd|3rd|First|Second|Third|1|2|3';
            var bok = 'Genesis|Gen|Exodus|Exod?|Leviticus|Lev|Levit?|Numbers|'+
                'Nmb|Numb?|Deuteronomy|Deut?|Joshua|Josh?|Judges|Jdg|Judg?|Ruth|Ru|'+
                'Samuel|Sam|Sml|Kings|Kngs?|Kin?|Chronicles|Chr|Chron|Ezra|Ez|'+
                'Nehemiah|Nehem?|Esther|Esth?|Job|Jb|Psalms?|Psa?|Proverbs?|Prov?|'+
                'Ecclesiastes|Eccl?|Songs?ofSolomon|Song?|Songs|Isaiah|Isa|Jeremiah|'+
                'Jer|Jerem|Lamentations|Lam|Lament?|Ezekiel|Ezek?|Daniel|Dan|Hosea|'+
                'Hos|Joel|Jo|Amos|Am|Obadiah|Obad?|Jonah|Jon|Micah|Mic|Nahum|Nah|'+
                'Habakkuk|Hab|Habak|Zephaniah|Zeph|Haggai|Hag|Hagg|Zechariah|Zech?|'+
                'Malachi|Malac?|Mal|Mat{1,2}hew|Mat?|Mark|Mrk|Luke|Lu?k|John|Jhn|Jo|'+
                'Acts?|Ac|Romans|Rom|Corinthians|Cor|Corin|Galatians|Gal|Galat|'+
                'Ephesians|Eph|Ephes|Philippians|Phili?|Colossians|Col|Colos|'+
                'Thessalonians|Thes?|Timothy|Tim|Titus|Tts|Tit|Philemon|Phil?|'+
                'Hebrews|Hebr?|James|Jam|Jms|Peter|Pete?|Jude|Ju|Revelations?|Rev|'+
                'Revel';
            var ver = '\\d+(:\\d+)?(?:\\s?[-&]\\s?\\d+)?';
            var regex = '(?:('+vol+')\\s+)?('+bok+')\\s+('+ver+'(?:\\s?,\\s?'+ver+')*)';

            regex = new RegExp(regex, "m");

            var trans = GM_getValue('translation');
            if (!trans) {
                GM_setValue('translation', 'esv');
                trans = 'esv';
            }
            var bgver = ScripturizerGM.translationmap[trans.toUpperCase()];
            var textproc = function(node) {
                var match = regex.exec(node.data);
                if (match) {
                    var verse = match[0];
                    var node2 = node.splitText(match.index);
                    var node3 = node2.splitText(verse.length);
                    var anchor = node.ownerDocument.createElement('A');

                    var link = verse.replace(/ +/g, '+');
                    var title = verse;
                    link = link.replace(/[,&;]/g, '%2C');
                    link = link.replace(/:]/g, '%3A');
                    title += ' - '+bgver[1];

                    if (trans == 'esv') {
                        link = 'http://www.gnpcb.org/esv/search/?go=Go&q='+link;
                    } else {
                        link = 'http://www.biblegateway.com/passage/index.php?version='+bgver[0]+'&search='+link;
                        title += ' via Bible Gateway';
                    }

                    anchor.setAttribute('href', link);
                    anchor.setAttribute('title', title);

                    node.parentNode.replaceChild(anchor, node2);
                    anchor.className = 'scripturized';
                    anchor.appendChild(node2);
                    return anchor;
                } else {
                    return node;
                }
            }

            ScripturizerGM.travese_dom(elm.childNodes[0], 1, textproc);
        },

        travese_dom: function(node, depth, textproc) {
            var skipre = /^(a|script|style|textarea)/i;
            var count = 0;
            while (node && depth > 0) {
                count ++;
                if (count >= ScripturizerGM.max_nodes) {
                    setTimeout(function() {ScripturizerGM.traverse_dom(node, depth, textproc);}, 50);
                    return;
                }
                switch (node.nodeType) {
                    case 1: // ELEMENT_NODE
                        if (!skipre.test(node.tagName) && 
                            node.childNodes.length > 0) 
                        {
                            node = node.childNodes[0];
                            depth ++;
                            continue;
                        }
                        break;
                    case 3: // TEXT_NODE
                    case 4: // CDATA_SECTION_NODE
                        node = textproc(node);
                        break;
                }

                if (node.nextSibling) {
                    node = node.nextSibling;
                } else {
                    while (depth > 0) {
                        node = node.parentNode;
                        depth --;
                        if (node.nextSibling) {
                            node = node.nextSibling;
                            break;
                        }
                    }
                }
            }
        }
    };
    window.addEventListener('load', function() {ScripturizerGM.do_element(document.body);}, false);
})();
