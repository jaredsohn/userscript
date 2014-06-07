// ==UserScript==
// @name           What.cd Quickquote
// @description    PM Ananke for more info
// @include        http://what.cd/*
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @grant          GM_info
// @version        0.2.5
// @author         Etheryte
// ==/UserScript==
(function() {
    //GM cross-browser jQuery by Brock Adams, Erik Vergobbi Vold & Tyler G. Hicks-Wright.
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // The guts of this userscript
    function main() {
        //Mind blowing manipulation of functions attached to the window
        var org_quote = window.Quote;
        window.Quote = function(args){
            return false;
        };
        //Catch clicks of the [Quote] button
        jQ('a[onclick^="Quote("]').click(function(event) {
            //Get required arguments
            var arguments = jQ(this).attr("onclick");
            var username = arguments.replace(/Quote\(\'[0-9]*\',\'/,"").replace(/\'.*/,""); /*'*/
            var postid = arguments.replace(/Quote\(\'/,"").replace(/\'.*/,""); /*'*/
            //Move the reply box and scroll to it
            jQ(this).parent().parent().parent().parent().parent().after(jQ('div#reply_box'));
            var targetHeight = jQ("div#reply_box").offset().top-jQ(window).height()+30;
            jQ('html, body').scrollTop(targetHeight+jQ("div#reply_box").height());
            //If text is selected, quote that...
            if(window.getSelection().toString().length != 0 ){
                if (jQ('#quickpost').val() !== '') jQ('#quickpost').val(jQ('#quickpost').val() + "\n\n");
                    jQ('#quickpost').val(jQ('#quickpost').val() + "[quote="+username + "|" + postid + "]" + window.getSelection().toString().replace(/^[\n\r\s]*/,"").replace(/$[\n\r\s]*/,"") + "[/quote]");
                    resize('quickpost');
            //...Otherwise proceed with a regular full-post quote
            } else {
                org_quote(postid, username, true);
            }
            //Overwrite the usual reply box resize function for cool rice
            var org_resize = window.resize;
            window.resize = function(args){
                org_resize(args);
                //The height of the reply box changes now, rescroll.
                jQ('html, body').scrollTop(targetHeight+jQ("div#reply_box").height());
            };
            //Because who needs truth anyways?
            return false;
        });
    }

    // Load jQuery and execute the main function
    addJQuery(main);
})();