// ==UserScript==
// @name       XKCD Text Replacer
// @version    1.0
// @description  Replaces text (mostly) according to http://xkcd.com/1288/
// @match      http://*/*
// @require		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

GM_addStyle(".xkcd_replaced:hover { text-decoration:underline; }");

var array = {
    "witnesses": "dudes I know",
    "allegedly": "kinda probably",
    "new study": "Tumblr post",
    "rebuild": "avenge",
    "space": "spaaace",
    "Google Glass": "Virtual Boy",
    "smartphone": "Pokédex",
    "electric": "atomic",
    "senator": "elf-lord",
    "car": "cat",
    "election": "eating contest",
    "congressional leaders": "river spirits",
    "Homeland Security": "Homestar Runner",
    "could not be reached for comment": "is guilty and everyone knows it"
};
$(function(){
    $("body")
    	.find("*")
        .contents()
        .filter(function() {
            return this.nodeType === 3; //Node.TEXT_NODE
        })
        .each(function(){
            var text = $(this).text();
            for (var val in array){
            	text = text.replace(new RegExp("\\b" + val + "\\b", "gi"), "<span class='xkcd_replaced' title='" + val + "'>" + array[val] + "</span>");
            }
            $(this).replaceWith(text);
    });
});
    