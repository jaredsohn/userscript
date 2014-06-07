// ==UserScript==
// @name         Speakable Textareas
// @namespace    speakable
// @include      *
// @author       Josh Mandel
// @description  Allow speech input in any textarea (Google Chrome). super quick and dirty because I broke my arm, so don't mind the awful hacked-together javascript.
// ==/UserScript==


function jq(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
    script.addEventListener('load', function () {

        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);

    }, false);
    document.body.appendChild(script);
}

function main() {
    jQuery.noConflict();

    var lastblur = {
        ss: 0,
        se: 0
    };

    setInterval(function () {

        jQuery("input").each(function (i) {

            if (!jQuery(this).attr("taed")) {
                jQuery(this).attr("taed", "true");
                jQuery(this).attr("x-webkit-speech", "true");
            }

        });

        jQuery("textarea:visible, *[g_editable='true']").each(function (i) {

            if (!jQuery(this).attr("taed") ) {
                var t = jQuery(this);

                t.blur(function () {
                    lastblur = {
                        time: new Date().getTime(),
                        elt: t[0],
                        ss: t[0].selectionStart,
                        se: t[0].selectionEnd
                    };
                });

                t.attr("taed", "true");
                var b = jQuery("<input type='text' size='1' x-webkit-speech>.</input>");
                b.css({
                    "position": "absolute",
                    "left": t.offset().left + t.width() - 30,
                    "top": t.offset().top,
                    "width": 15, border: "0px"
                });


                jQuery('body').append(b);
                b.click(function () {
                    if (t[0] != lastblur.elt || (new Date().getTime() - t.time > 100)) {
                        lastblur.ss = lastblur.se = t.val().length;
                    }
                });

                setInterval(function () {

                    b.css({
                        "left": t.offset().left + t.width() - 30,
                        "top": t.offset().top
                    });

                    if (b.val() == "") return;
                    b.val(b.val()+" ");
                     if (t[0].tagName.toLowerCase()==="textarea") {
                    var ot = t.val();
                    t.val(ot.substr(0, lastblur.ss) + b.val() + ot.substr(lastblur.se));

                    t.focus();
                    var bl = b.val().length;

                    if (lastblur.se == lastblur.ss) {
                        t[0].selectionStart = t[0].selectionEnd = lastblur.ss + bl;
                    } else {

                        t[0].selectionStart = lastblur.ss;
                        t[0].selectionEnd = lastblur.ss + bl;
                    }

                    } else if (t.attr("g_editable")) {
                      t.html(t.html() + b.val());     
                    }
                    b.val("");


                }, 100);
            }
        });

    }, 1000);
}

// load jQuery and execute the main function
jq(main);