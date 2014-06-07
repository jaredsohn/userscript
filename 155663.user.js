// ==UserScript==                                                                                                                                                   
// @name           transposeMe
// @namespace      http://gakufu.gakki.me/m/data/                                                                                                                   
// @include        http://gakufu.gakki.me/m/data/*                                                                                                                  
// @version        0.7
// @license        The MIT License
// ==/UserScript==                                                                                                                                                  
//
// Copyright (c) 2013 oscdis765@gmail.com
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
(function () {
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main() {
        function createForm() {
            var sel = jQ("<select></select>");

            for (var i = 6; i > -6; i--) {
                var opt = jQ("<option>").attr("value", i).text(i);
                opt.attr("selected", i == 0);
                opt.appendTo(sel);
            }

            return sel;
        }

        function transpose(nodes, qnt) {
            nodes.each(function () {
                var text = jQ(this).text(); {
                    flist = ["A♭", "B♭", "D♭", "E♭", "G♭"];
                    slist = ["G＃", "A＃", "C＃", "D＃", "F＃"];
                    for (var i = 0; i < flist.length; i++) {
                        text = text.split(flist[i]).join(slist[i]);
                    }
                }

                function replace(target, ary) {
                    var ret = "";

                    for (var pos = 0; pos < text.length; pos++) {
                        function search() {
                            for (var i = 0; i < target.length; i++) {
                                if (text.indexOf(target[i], pos) == pos) return target[i];
                            }
                        }
                        var note = search();
                        if (note) {
                            var n = (ary.indexOf(note) + qnt + ary.length) % ary.length;
                            ret += ary[n];
                            pos += note.length - 1;
                        }
                        else {
                            ret += text.charAt(pos);
                        }
                    }

                    return ret;
                }

                var target = ["A＃", "C＃", "D＃", "F＃", "G＃", "A", "B", "C", "D", "E", "F", "G"];
                text = replace(target, ["A", "A＃", "B", "C", "C＃", "D", "D＃", "E", "F", "F＃", "G", "G＃"]);

                jQ(this).text(text);
            });
        }

        var sel = createForm();
        sel.appendTo(jQ('.mBtm20:first'));

        var prev = 0;
        sel.change(function (arg) {
            transpose(jQ('span.blue'), arg.target.value - prev);
            prev = arg.target.value;
        });
    }

    addJQuery(main);
})();