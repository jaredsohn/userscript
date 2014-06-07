// ==UserScript==
// @name           MyanmarFontTagger
// @namespace      thantthetkz.mmfonttagger
// @description    Fill the gap between Zawgyi and Unicode
// @include        http://*
// @include        https://*
// @include        file://*
// @version        2.0.2
// @uso:version    2.0.2
// @copyright  2013, ttkz
// ==/UserScript==

(function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var list = document.querySelector('body');

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == 'childList') {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node.nodeType == Node.TEXT_NODE) {} else {
                        // console.log(node, node.textContent);
                        tagNode(node);
                    }
                }
            } else if (mutation.type == 'characterData') {
                tagNode(mutation.target);
            }
                });
    });
    
    observer.observe(list, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
    
    /*
    The following detection pattern is based on the script by Ko Ravi
    Font Busters - http://userscripts.org/scripts/show/42941
    */
    var regexMM = new RegExp("[\u1000-\u109f\uaa60-\uaa7f]+");
    var regexUni = new RegExp("[ဃငဆဇဈဉညဋဌဍဎဏဒဓနဘရဝဟဠအ]်|ျ[က-အ]ါ|ျ[ါ-း]|[^\1031]စ်|\u103e|\u103f|\u1031[^\u1000-\u1021\u103b\u1040\u106a\u106b\u107e-\u1084\u108f\u1090]|\u1031$|\u1031[က-အ]\u1032|\u1025\u102f|\u103c\u103d[\u1000-\u1001]|ည်း|ျင်း|င်|န်း|ျာ|[ာ်ါ]တ်|ြို");
    var regexZG = new RegExp("\s\u1031| ေ[က-အ]်|[က-အ]း");
    var timerID = undefined;
    var mmFonts = new RegExp("Zawgyi-One|Masterpiece Uni Sans|Myanmar3|Yunghkio|Parabaik|WinUni Innwa|Win Uni Innwa|Padauk|MyMyanmar|Panglong|Ayar|TharLon|Myanmar Sangam");
    var unicodeFonts = new RegExp("Masterpiece Uni Sans|Myanmar3|Yunghkio|Parabaik|WinUni Innwa|Win Uni Innwa|Padauk|MyMyanmar|Panglong|TharLon|Myanmar Sangam");
    var useUnicodeFont = "Masterpiece Uni Sans, TharLon, Myanmar3, Yunghkio, Padauk, Parabaik, WinUni Innwa, Win Uni Innwa, MyMyanmar Unicode, Panglong, Myanmar Sangam MN, Myanmar MN";
    
    var facebook_wordbreaking_classes = ['tlActorText', 'messageBody', 'commentBody', 'uiAttachmentTitle', 'uiAttachmentDesc', 'ministoryInlineMessage', 'msg'];
    var unicode_word_breaker = /[\u1000-\u102A\u1040-\u1049\u103F](?!\u103A)/g;
    var classNameUnicode = "__ft_unicode";
    var classNameZawgyi = "__ft_zawgyi";
    
    var tagNode = function(node) {
        if (node.className && node.className.indexOf('_tt_t_') !== -1) {
            return;
        }
        if (node.nodeType == Node.TEXT_NODE) {
            var text = node.textContent;
            if (!regexMM.test(text)) {
                return;
            }
            if (text) {
                var prNode = node.parentNode;
                text = prNode.textContent;
                if (regexUni.test(text) && !regexZG.test(text)) {
                    if (prNode.style) prNode.style.fontFamily = useUnicodeFont;
                } else {
                    if (prNode.style) prNode.style.fontFamily = "Zawgyi-One";
                }
                prNode.className += ' _tt_t_';
            }
        } else {
            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                tagNode(child);
            }
        }
    }
    
    if (document && document.body) tagNode(document.body);
})();