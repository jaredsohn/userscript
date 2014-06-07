// ==UserScript==
// @name       Utah Legislative Code Indent
// @namespace  http://www.mstuttle.com/
// @version    0.1.3
// @description  Indent the legislative code on le.utah.gov/code so that it's easier to read
// @match      http://le.utah.gov/code/*
// @copyright  2013+, Michael Tuttle
// ==/UserScript==

var paragraphs = $("table.maintable").find('p');

jQuery.each(paragraphs, function() {
    var $this = $(this);
    $this.find("span").remove();
    $this.append("&nbsp;");
});

jQuery.each(paragraphs, function() {
    var $this = $(this);
    if (/^\(\d+\)/i.test($this.text())) {
        $this.css("margin-left", '20px');
    }
    // Lower Case a-h, j-u, w, y-z
    if (/^\([a-h|j-u|w|y-z]+\)/.test($this.text())) {
        $this.css("margin-left", '40px');
    }
    // Roman Numerals 1-39
    if (/^\((x{0,3})(ix|iv|v?i{0,3})\)/.test($this.text())) {
        // Roman Numerals 1-39
        $this.css("margin-left", '60px');
        // don't do it for (i) if it follows (h)
        if (/^\(h\)/.test($this.prev().text()) && /^\(ii\)/.test($this.next().text()) == false) {
            $this.css("margin-left", '40px');
        }

    }
    // Upper Case A-Z
    if (/^\([A-Z]+\)/.test($this.text())) {
        $this.css("margin-left", '80px');
    }    
});