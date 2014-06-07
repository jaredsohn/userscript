// Provide quick documentation links in Stackoverflow editor
//
// ==UserScript==
// @name           SO doc shortcuts+
// @description    Adds extra buttons to turn selected text into online manual links
// @version        0.6
// @namespace      data:,00000000000010000000000000000000e3272d8553c99672fa541449b491dd05
// @include        *
// ==/UserScript==
(function () {
    function exec(fn) {
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + fn + ')();';
        document.body.appendChild(script); // run the script
    }

    exec(function () {

        // configured online manuals and functionname->link rewrite code
        var manual_links = {

            php: {
                always: 0,
                icon: "http://static.php.net/www.php.net/favicon.ico",
                raw: 0,
                rewrite: function (text) {
                    return "http://php.net/" + encodeURI(text);
                }
            },
            javascript: {
                icon: "http://developer.mozilla.org/favicon.ico",
                rewrite: function (text) {
                    return "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/" + encodeURI(text);
                    //return "http://www.w3schools.com/ಠ_ಠ/"+text;
                }
            },
            jquery: {
                icon: "http://static.jquery.com/favicon.ico",
                rewrite: function (text) {
                    text = text.replace(/^[$]?[.]/, "jQuery.");
                    text = text.replace(/[.]/, "");
                    var map = {
                        "ajax": "jQuery.ajax",
                        "browser": "jQuery.browser",
                        "contains": "jQuery.contains"
                    }
                    text = map[text] ? map[text] : text;
                    return "http://api.jquery.com/" + encodeURI(text) + "/";
                }
            },
            mysql: {
                icon: "http://dev.mysql.com/common/themes/sakila/favicon.ico",
                rewrite: function (text) {
                    return "http://search.mysql.com/search/query/search?group=refman-55&q=" + text;
                }
            },
            wordpress: {
                icon: "http://codex.wordpress.org/favicon.ico",
                rewrite: function (text) {
                    return "http://codex.wordpress.org/Function_Reference/" + text;
                }
            },
            google: {
                always: 1,
                icon: "http://www.google.com/favicon.ico",
                raw: 1,
                rewrite: function (text) {
                    return "http://www.google.com/search?q=" + encodeURI(text);
                }
            },
            magic_service_yet_to_be_created: {
                always: 0,
                icon: "http://sstatic.net/stackoverflow/img/favicon.ico",
                raw: 1,
                rewrite: function (text) {
                    var wait = 0;
                    $.ajax({
                        url: "http://magic/get_manual_links",
                        data: {
                            q: text
                        },
                        dataType: "html",
                        success: function (data) {
                            wait = data
                        },
                        async: false
                    });
                    return wait;
                }
            }

        }

        // collect current tags
        var question_tags = {};
        jQuery(".post-taglist .post-tag[rel=tag]").each(function (i) {
            question_tags[this.text] = 1
        });

        // iterate over configured links
        var pos = 400; // hacket-y-hack
        for (var i in manual_links) {
      
            // insert button
            if (manual_links[i].always || question_tags[i]) {
//alert('y'+ i);
                jQuery('<li class="wmd-button" ' + 'style="left:' + (pos += 25) + 'px" ' + 'onclick="wmd_doc_link(\'' + i + '\')" title="' + i + ' manual link">' + '<img src="' + manual_links[i].icon + '" alt="'+i+'" title="'+i+'">' + '</li>').insertAfter("#wmd-link-button");
            }
        }



        document.wmd_doc_link = function (tag) {

            // get selection
            var area = jQuery("#wmd-input");
            var text = area.getSelection().text;

            // rewrite
            var link = manual_links[tag].rewrite(!manual_links[tag].raw ? text.replace(/[^-.\w]+/, "") : text, tag);
            // into link
            if (!link.match(/\]\(/)) {
                link = "[`" + text + "`](" + link + ")";
            }

            // update textarea
            area.replaceSelection(link);
            area.change(); // Damn you WMD, why you ignore that?!
            area.trigger('keyup');
        }

        /*
         * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
         * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
         */
        var fieldSelection = {
            getSelection: function () {
                var e = this.jquery ? this[0] : this;
                return ( /* mozilla / dom 3.0 */ ('selectionStart' in e &&
                function () {
                    var l = e.selectionEnd - e.selectionStart;
                    return {
                        start: e.selectionStart,
                        end: e.selectionEnd,
                        length: l,
                        text: e.value.substr(e.selectionStart, l)
                    };
                }) || /* exploder */ (document.selection &&
                function () {
                    e.focus();
                    var r = document.selection.createRange();
                    if (r == null) {
                        return {
                            start: 0,
                            end: e.value.length,
                            length: 0
                        }
                    }
                    var re = e.createTextRange();
                    var rc = re.duplicate();
                    re.moveToBookmark(r.getBookmark());
                    rc.setEndPoint('EndToStart', re);
                    return {
                        start: rc.text.length,
                        end: rc.text.length + r.text.length,
                        length: r.text.length,
                        text: r.text
                    };
                }) || /* browser not supported */

                function () {
                    return {
                        start: 0,
                        end: e.value.length,
                        length: 0
                    };
                })();
            },
            replaceSelection: function () {
                var e = this.jquery ? this[0] : this;
                var text = arguments[0] || '';
                return ( /* mozilla / dom 3.0 */ ('selectionStart' in e &&
                function () {
                    e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
                    return this;
                }) || /* exploder */ (document.selection &&
                function () {
                    e.focus();
                    document.selection.createRange().text = text;
                    return this;
                }) || /* browser not supported */

                function () {
                    e.value += text;
                    return this;
                })();
            }
        };
        jQuery.each(fieldSelection, function (i) {
            jQuery.fn[i] = this;
        });
        /*
         * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
         * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
         */



    });

})();