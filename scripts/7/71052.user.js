// ==UserScript==
// @name           prettypretty
// @namespace      stackoverflow
// @description    Give the user the choice which language to use for syntax highlighting
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js
// @require        http://google-code-prettify.googlecode.com/svn/trunk/src/lang-vb.js
// @require        http://google-code-prettify.googlecode.com/svn/trunk/src/lang-css.js
// @require        http://google-code-prettify.googlecode.com/svn/trunk/src/lang-sql.js
// @require        http://google-code-prettify.googlecode.com/svn/trunk/src/lang-hs.js
// @author         Benjamin Dumke
// ==/UserScript==

languages = {
    "automatic": "",
    "no highlighting": -1,
    "CSS": "css",
    "HTML": "html",
    "Haskell": "hs",
    "Java": "java",
    "Perl": "pl",
    "Python": "py",
    "SQL": "sql",
    "VisualBasic": "vb" };

(function(){

    function uglify(code) {
        code.text($(code.html().replace(/<br>/g, "\n").replace(/&nbsp;/g, " ")).text());
        code.removeClass("prettyprint").addClass("uglyprint");
    }
    function prettify(code, lang) {
        if (lang == -1) {uglify(code); return}
        if (lang != "") {lang = "lang-" + lang;}
        code.removeClass()
        code.addClass("prettyprint " + lang);
        prettyPrint();
    }

    function prettify_callback(code, lang, all)
    {
        if (all) {
            return function(){
                $(".prettyprint, .uglyprint").each(
                    function() {
                        prettify($(this), lang);
                        code.prev().find(".language-menu").slideToggle();  
                    })
                }
        }
        
        return function(){
            prettify(code, lang);
            code.prev().find(".language-menu").slideToggle();
            }
    }
    function make_menu(code) {
        s = $("<div/>").addClass("language-menu").css(
            { "position": "absolute",
              "background-color": "#ccc",
              "padding": "10px",
              "left": "670px",
              "top": "-10px",
              "z-index": "777",
              "width": "150px",
              "font-size": "small",
              "text-align": "left"}
            ).hide()

        
        for (var l in languages)
        {
            item = $("<a>" + l + "</a>").click(prettify_callback(code, languages[l]));
            allitem = $("<a>(all)</a>").click(prettify_callback(code, languages[l], true));
            item.appendTo(s);
            $("<span> </span>").appendTo(s);
            allitem.appendTo(s);
            $("<br>").appendTo(s);
        }
        return s;
        
    }
    function add_language_menu() {
        d = $("<div class='language' style='text-align:right; position:relative;'/>");
        a = $("<a style='color:#aaa; font-size:small;'>select language</a>").appendTo(d);
        menu = make_menu($(this));
        menu.appendTo(d);
        a.click(function(){;$(this).closest(".language").find(".language-menu").slideToggle();});
        d.insertBefore($(this));
    }
    
    $(".prettyprint").each(add_language_menu);
    

})()