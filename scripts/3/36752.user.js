/* This greasemonkey script adds 'Unlabelled' at the end of the labels list to search for unlabelled conversations
 * 
 *  $Id: gmailUnlabelled2.user.js,v 1.2.1 2008/11/08 22:06:33 Forest Exp Forest $
 *  $Author: jaidev, Forest $
 *  $Date: 2008/02/08 22:06:33 $
 *  Copyright (c) 2007, Jaidev Krishna Sridhar, Forest Gregg
 *  Released under the GPL license
 *  http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript==
// @name          Gmail Unlabelled 2.1
// @namespace     http://jaidev.info/home/hacks/gmailUnlabelled
// @description   Updates Jaidev's Gmail Unlabeled 2.0 so that it works with Gmail 2.0, as of November 8, 2008.
// @include       http*://mail.google.com/*
// ==/UserScript==


var LABELS_TABLE_DIV_CLASS = "pvSW6e";
var SEARCH_INPUT_ID = ":ra";
var SEARCH_DIV_CLASS = "tYBwhe";

window.addEventListener('load', function() {
    // if the gmonkey api is available, load it.
    if (unsafeWindow.gmonkey) {	
        unsafeWindow.gmonkey.load("1.0", function(gmail) {
           
            function gmailUnlabelled () {
	       //assign the root DOM for the letfthand navigation pane
               var root = gmail.getNavPaneElement().ownerDocument;
               if (!root.getElementById("label_none")) {
                    var expression = ".//div[contains(concat(' ', @class, ' '), ' " + LABELS_TABLE_DIV_CLASS + " ')]";
                    var table_div= root.evaluate(expression, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
                    table_div.setAttribute ("id", "label_table_div");

		    //Make Unlabeled Link
                    var label_none = table_div.nextSibling.cloneNode (true);
                    label_none.setAttribute ("id", "label_none");
                    label_none.innerHTML = "Unlabelled";
                    label_none.addEventListener ("click", function(event) {
                        event.cancelBubble = true;
                        var table_div = this.ownerDocument.getElementById("label_table_div");
                        var tr = table_div.firstChild.firstChild.firstChild;
                        var QUERY_STR = "";
                        while (tr) {
                            var label = tr.firstChild.nextSibling.firstChild.firstChild.getAttribute('name');
                            QUERY_STR = QUERY_STR + ' -label:' + label.replace(/[/\ &]/g, '-');
                            tr = tr.nextSibling;
                        }
                        var search_div = this.ownerDocument.getElementById(":ra");
                        search_div.value = QUERY_STR;
                        var search_div = this.ownerDocument.getElementById("search_div");
                        search_div.firstChild.click ();
                        }, true);
                    table_div.parentNode.insertBefore(label_none, table_div.nextSibling);
                    expression = ".//div[contains(concat(' ', @class, ' '), ' " + SEARCH_DIV_CLASS + " ')]";
                    var search_div = root.evaluate(expression, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
                    search_div.setAttribute ("id", "search_div");
                    search_div.firstChild.addEventListener ("change", function (event) {
                        if ("-label" == this.value) { 
                            var table_div = this.ownerDocument.getElementById("label_table_div");
                            var tr = table_div.firstChild.firstChild.firstChild;
                            var QUERY_STR = "";
                            while (tr) {
                                var label = tr.firstChild.nextSibling.firstChild.firstChild.getAttribute('name');
                                QUERY_STR = QUERY_STR + ' -label:' + label.replace(/[/\ &]/g, '-');
                                tr = tr.nextSibling;
                            }
                            this.value=QUERY_STR;
                            //this.nextSibling.click ();
                        }
                    }, true);
                }
            }
            gmailUnlabelled ();
            gmail.registerViewChangeCallback (gmailUnlabelled);
        });
    }
}, true);


