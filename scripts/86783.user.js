// ==UserScript==
// @name                LJ indented comments
// @description         enables indentation in LiveJournal comments
// @include     http://*.livejournal.com/*
// ==/UserScript==

function insert_script(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = [
        "if(typeof(sendForm) != 'undefined'){",
            "sendForm = function(handler){",
                "function new_handler(arg1, arg2){",
                    "var post = document.getElementsByTagName('textarea')[0];",
                    "post.value = post.value.replace(/^( +)/gm, function(str, a) {return a.replace(/ /g, '\u00a0');});",
                    "handler(arg1, arg2);",
                "}",
                "return new_handler;",
            "}(sendForm);}"
    ].join('');
    script.innerHTML += [
        "if(typeof(QuickReply) != 'undefined'){",
            "QuickReply.submit = function(handler){",
                "function new_handler(){",
                    "var post = document.getElementsByTagName('textarea')[0];",
                    "post.value = post.value.replace(/^( +)/gm, function(str, a) {return a.replace(/ /g, '\u00a0');});",
                    "handler();",
                "}",
                "return new_handler;",
            "}(QuickReply.submit);}"
    ].join('');
    document.body.appendChild(script);
}

window.addEventListener('load', insert_script, false);
