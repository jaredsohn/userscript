// ==UserScript==
// @name           blenderartists.org code highlighting
// @namespace      http://userscripts.org/scripts/show/102922
// @description    Code Highlighting for blenderartists.org
// @include        http://blenderartists.org/forum/showthread.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://yandex.st/highlightjs/5.16/highlight.min.js

// ==/UserScript==

css_common = "pre.bbcode_code span, pre.bbcode_code .title{display:inline !important; font: 12px monospace !important; padding: 0!important}pre.bbcode_code{line-height: 15px !important}";
css_vs = "pre.bbcode_code.vs{display:block !important;padding:.5em}pre.bbcode_code.vs .comment,pre.bbcode_code.vs .annotation,pre.bbcode_code.vs .template_comment,pre.bbcode_code.vs .diff .header,pre.bbcode_code.vs .chunk,pre.bbcode_code.vs .apache .cbracket{color:#008000}pre.bbcode_code.vs .keyword,pre.bbcode_code.vs .id,pre.bbcode_code.vs .title,pre.bbcode_code.vs .built_in,pre.bbcode_code.vs .aggregate,pre.bbcode_code.vs .smalltalk .class,pre.bbcode_code.vs .winutils,pre.bbcode_code.vs .bash .variable,pre.bbcode_code.vs .tex .command{color:#00f}pre.bbcode_code.vs .string,pre.bbcode_code.vs .title,pre.bbcode_code.vs .parent,pre.bbcode_code.vs .tag .value,pre.bbcode_code.vs .rules .value,pre.bbcode_code.vs .rules .value .number,pre.bbcode_code.vs .ruby .symbol,pre.bbcode_code.vs .ruby .symbol .string,pre.bbcode_code.vs .ruby .symbol .keyword,pre.bbcode_code.vs .ruby .symbol .keymethods,pre.bbcode_code.vs .instancevar,pre.bbcode_code.vs .aggregate,pre.bbcode_code.vs .template_tag,pre.bbcode_code.vs .django .variable,pre.bbcode_code.vs .addition,pre.bbcode_code.vs .flow,pre.bbcode_code.vs .stream,pre.bbcode_code.vs .apache .tag,pre.bbcode_code.vs .date,pre.bbcode_code.vs .tex .formula{color:#a31515}pre.bbcode_code.vs .ruby .string,pre.bbcode_code.vs .decorator,pre.bbcode_code.vs .filter .argument,pre.bbcode_code.vs .localvars,pre.bbcode_code.vs .array,pre.bbcode_code.vs .attr_selector,pre.bbcode_code.vs .pseudo,pre.bbcode_code.vs .pi,pre.bbcode_code.vs .doctype,pre.bbcode_code.vs .deletion,pre.bbcode_code.vs .envvar,pre.bbcode_code.vs .shebang,pre.bbcode_code.vs .preprocessor,pre.bbcode_code.vs .userType,pre.bbcode_code.vs .apache .sqbracket,pre.bbcode_code.vs .nginx .built_in,pre.bbcode_code.vs .tex .special{color:#2b91af}pre.bbcode_code.vs .phpdoc,pre.bbcode_code.vs .javadoc,pre.bbcode_code.vs .xmlDocTag{color:#808080}";
css_ir_black = "pre.bbcode_code.ir_black{display:block !important;padding:.5em;background:#000 !important;color:#f8f8f8}pre.bbcode_code.ir_black .shebang,pre.bbcode_code.ir_black .comment,pre.bbcode_code.ir_black .template_comment,pre.bbcode_code.ir_black .javadoc{color:#7c7c7c}pre.bbcode_code.ir_black .keyword,pre.bbcode_code.ir_black .tag,pre.bbcode_code.ir_black .ruby .function .keyword,pre.bbcode_code.ir_black .tex .command{color:#96cbfe}pre.bbcode_code.ir_black .function .keyword,pre.bbcode_code.ir_black .sub .keyword,pre.bbcode_code.ir_black .method,pre.bbcode_code.ir_black .list .title{color:#ffffb6}pre.bbcode_code.ir_black .string,pre.bbcode_code.ir_black .tag .value,pre.bbcode_code.ir_black .cdata,pre.bbcode_code.ir_black .filter .argument,pre.bbcode_code.ir_black .attr_selector,pre.bbcode_code.ir_black .apache .cbracket,pre.bbcode_code.ir_black .date{color:#a8ff60}pre.bbcode_code.ir_black .subst{color:#daefa3}pre.bbcode_code.ir_black .regexp{color:#e9c062}pre.bbcode_code.ir_black .function .title,pre.bbcode_code.ir_black .sub .identifier,pre.bbcode_code.ir_black .pi,pre.bbcode_code.ir_black .decorator,pre.bbcode_code.ir_black .ini .title,pre.bbcode_code.ir_black .tex .special{color:#ffffb6;display:inline}pre.bbcode_code.ir_black .class .title,pre.bbcode_code.ir_black .constant,pre.bbcode_code.ir_black .smalltalk .class,pre.bbcode_code.ir_black .javadoctag,pre.bbcode_code.ir_black .yardoctag,pre.bbcode_code.ir_black .phpdoc,pre.bbcode_code.ir_black .nginx .built_in{color:#ffffb6}pre.bbcode_code.ir_black .symbol,pre.bbcode_code.ir_black .ruby .symbol .string,pre.bbcode_code.ir_black .ruby .symbol .keyword,pre.bbcode_code.ir_black .ruby .symbol .keymethods,pre.bbcode_code.ir_black .number,pre.bbcode_code.ir_black .variable,pre.bbcode_code.ir_black .vbscript,pre.bbcode_code.ir_black .literal{color:#c6c5fe}pre.bbcode_code.ir_black .css .keyword{color:#96cbfe}pre.bbcode_code.ir_black .css .rule .keyword,pre.bbcode_code.ir_black .css .id{color:#ffffb6}pre.bbcode_code.ir_black .css .class{color:#FFF}pre.bbcode_code.ir_black .hexcolor{color:#c6c5fe}pre.bbcode_code.ir_black .number{color:#ff73fd}pre.bbcode_code.ir_black .tex .formula{opacity:.7}";    
css_zenburn = "pre.bbcode_code.zenburn{display:block;padding:.5em;background:#3f3f3f !important;line-height: 15px !important;color:#dcdcdc}pre.bbcode_code.zenburn .keyword,pre.bbcode_code.zenburn .tag,pre.bbcode_code.zenburn .django .tag,pre.bbcode_code.zenburn .django .keyword,pre.bbcode_code.zenburn .css .class,pre.bbcode_code.zenburn .css .id,pre.bbcode_code.zenburn .lisp .title{color:#e3ceab;}pre.bbcode_code.zenburn .django .template_tag,pre.bbcode_code.zenburn .django .variable,pre.bbcode_code.zenburn .django .filter .argument{color:#dcdcdc}pre.bbcode_code.zenburn .number,pre.bbcode_code.zenburn .date{color:#8cd0d3}pre.bbcode_code.zenburn .dos .envvar,pre.bbcode_code.zenburn .dos .stream,pre.bbcode_code.zenburn .variable,pre.bbcode_code.zenburn .apache .sqbracket{color:#efdcbc}pre.bbcode_code.zenburn .dos .flow,pre.bbcode_code.zenburn .diff .change,pre.bbcode_code.zenburn .python .exception,pre.bbcode_code.zenburn .python .built_in,pre.bbcode_code.zenburn .literal,pre.bbcode_code.zenburn .tex .special{color:#efefaf}pre.bbcode_code.zenburn .diff .chunk,pre.bbcode_code.zenburn .ruby .subst{color:#8f8f8f}pre.bbcode_code.zenburn .dos .keyword,pre.bbcode_code.zenburn .python .decorator,pre.bbcode_code.zenburn .class .title,pre.bbcode_code.zenburn .function .title,pre.bbcode_code.zenburn .ini .title,pre.bbcode_code.zenburn .diff .header,pre.bbcode_code.zenburn .ruby .class .parent,pre.bbcode_code.zenburn .apache .tag,pre.bbcode_code.zenburn .nginx .built_in,pre.bbcode_code.zenburn .tex .command{color:#efef8f}pre.bbcode_code.zenburn .dos .winutils,pre.bbcode_code.zenburn .ruby .symbol,pre.bbcode_code.zenburn .ruby .symbol .string,pre.bbcode_code.zenburn .ruby .symbol .keyword,pre.bbcode_code.zenburn .ruby .symbol .keymethods,pre.bbcode_code.zenburn .ruby .string,pre.bbcode_code.zenburn .ruby .instancevar{color:#dca3a3}pre.bbcode_code.zenburn .diff .deletion,pre.bbcode_code.zenburn .string,pre.bbcode_code.zenburn .tag .value,pre.bbcode_code.zenburn .preprocessor,pre.bbcode_code.zenburn .built_in,pre.bbcode_code.zenburn .sql .aggregate,pre.bbcode_code.zenburn .javadoc,pre.bbcode_code.zenburn .smalltalk .class,pre.bbcode_code.zenburn .smalltalk .localvars,pre.bbcode_code.zenburn .smalltalk .array,pre.bbcode_code.zenburn .css .rules .value,pre.bbcode_code.zenburn .attr_selector,pre.bbcode_code.zenburn .pseudo,pre.bbcode_code.zenburn .apache .cbracket,pre.bbcode_code.zenburn .tex .formula{color:#cc9393}pre.bbcode_code.zenburn .shebang,pre.bbcode_code.zenburn .diff .addition,pre.bbcode_code.zenburn .comment,pre.bbcode_code.zenburn .java .annotation,pre.bbcode_code.zenburn .template_comment,pre.bbcode_code.zenburn .pi,pre.bbcode_code.zenburn .doctype{color:#7f9f7f}pre.bbcode_code.zenburn .html .css,pre.bbcode_code.zenburn .html .javascript,pre.bbcode_code.zenburn .tex .formula{opacity:.5}";
 
var setVS = function(){
	code = $("pre.bbcode_code");
	code.removeClass("ir_black zenburn");
	code.addClass("vs");
	GM_setValue("cssStyle", "VS");
};

var setIrBlack = function(){
	code = $("pre.bbcode_code");
	code.removeClass("vs zenburn");
	code.addClass("ir_black");
	GM_setValue("cssStyle", "IR_BLACK");
};
var setZenburn = function(){
	code = $("pre.bbcode_code");
	code.removeClass("vs ir_black");
	code.addClass("zenburn");
	GM_setValue("cssStyle", "ZENBURN");
};

var setCssStyle = function(){
    style = GM_getValue("cssStyle", "ZENBURN");
    switch(style){
        case "VS":
        	setVS();
        case "IR_BLACK":
        	setIrBlack();
        case "ZENBURN":
        	setZenburn();
    };
};


GM_registerMenuCommand("Visual Studio", setVS);
GM_registerMenuCommand("IR Black", setIrBlack);
GM_registerMenuCommand("Zenburn", setZenburn);

GM_addStyle(css_common + css_vs + css_ir_black + css_zenburn);
code_blocks = $('pre.bbcode_code');
code_blocks.addClass("python");
setCssStyle();
code_blocks.each(function(i, e) {hljs.highlightBlock(e, '    ');});