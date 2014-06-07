// ==UserScript==
// @name           Film Critic Hulk Footnotes
// @description    Makes footnotes on filmcrithulk.wordpress.com easier to read
// @author         Chris Maffin
// @include        http://filmcrithulk.wordpress.com/*
// @include        *filmcrithulk.wordpress.com/*
// @include        http://badassdigest.com/*
// @include        *badassdigest.com/*
// @namespace      http://ascentdg.com/filmcritichulk
// @version        1.4
// ==/UserScript==


var footnotes = new Array(), footnoteRegex = /\((\d\w*)\)/g;

        function linkifyThis(element) {

            var childNodes = element.childNodes, i = childNodes.length, id = (Closest(element, "post") || ClosestType(element, "article")).id;
            while (i--) {
                var n = childNodes[i];
                if (n.nodeType == 3 ) {
                    var html = n.nodeValue;
                    if (html) {
                        html = html.trim();
                        var matches = html.match(footnoteRegex);
                        if (!matches)
                            continue;

                        for (var j = 0; j < matches.length; j++) {
                            var match = matches[j], num = match.substring(1, match.length - 1);
                            if (num > 999) //It's probably a year in Parenthesis
                                continue;
                            if (!footnotes[id])
                                footnotes[id] = new Array();

                            if (footnotes[id].indexOf(num) > -1) {
                                n.parentNode.innerHTML = n.parentNode.innerHTML.replace(match, '<sup><a href="#' + id + '-footnote-' + num + '" id="' + id + '-' + num + '" class="footnote">' + num + '</a></sup>');
                            } else {
                                n.parentNode.innerHTML = n.parentNode.innerHTML.replace(match, '<a href="#' + id + '-' + num + '" id="' + id + '-footnote-' + num + '" class="footnote-return">^' + num + '</a>');
                                footnotes[id].push(num);
                            }
                        }
                        //n = html;
                    }
                }
                else if (n.nodeType == 1 && !/^(a|button|textarea|image)$/i.test(n.tagName)) {
                    linkifyThis(n);
                }
            }
        }

        var elements = document.getElementsByClassName("entrybody");

        if (elements.length == 0)
            elements = document.getElementsByClassName("entry");

        for (var i = 0; i < elements.length; i++) {
            linkifyThis(elements[i]);
        }

        //Some helpers so we don't have to include jQuery
        if (document.getElementsByClassName == undefined) { document.getElementsByClassName = function (className) { var allElements = document.getElementsByTagName(tagName); var results = []; var element; for (var i = 0; (element = allElements[i]) != null; i++) { if (HasClass(element, className)) results.push(element) } return results } } function HasClass(element, className) { var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)"); var elementClass = element.className; if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) return true; return false } function Closest(element, className) { if (element.parentNode.nodeType == 9) return; if (HasClass(element, className)) return element; return Closest(element.parentNode, className) } if (!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '') } } if (!Array.prototype.indexOf) { Array.prototype.indexOf = function (searchElement) { "use strict"; if (this === void 0 || this === null) { throw new TypeError() } var t = Object(this); var len = t.length >>> 0; if (len === 0) { return -1 } var n = 0; if (arguments.length > 0) { n = Number(arguments[1]); if (n !== n) { n = 0 } else if (n !== 0 && n !== Infinity && n !== -Infinity) { n = (n > 0 || -1) * Math.floor(Math.abs(n)) } } if (n >= len) { return -1 } var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); for (; k < len; k++) { if (k in t && t[k] === searchElement) { return k } } return -1 } } function ClosestType(element, type) { if (element.parentNode.nodeType == 9) return; if (element.localName == type) return element; return ClosestType(element.parentNode, type); }
