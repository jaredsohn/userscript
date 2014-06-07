/* -*-mode:JavaScript;coding:latin-1;-*-
## $Id$
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply Live Compose/Preview
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Live Compose/Preview for Multiply posts/replies
// @version	  0.1
// @include	  http://multiply.com/mail/message/*
// @include	  http://multiply.com/compose/*
// @include	  http://multiply.com/item/edit/*
// @include	  http://*.multiply.com/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

/*------ BEGIN MINIFIED creole.js -------------*/
if(!Parse){var Parse={};}
if(!Parse.Simple){Parse.Simple={};}
Parse.Simple.Base=function(grammar,options){if(!arguments.length){return;}
this.grammar=grammar;this.grammar.root=new this.ruleConstructor(this.grammar.root);this.options=options;};Parse.Simple.Base.prototype={ruleConstructor:null,grammar:null,options:null,parse:function(node,data,options){if(options){for(i in this.options){if(typeof options[i]=='undefined'){options[i]=this.options[i];}}}
else{options=this.options;}
if(options.forIE){data=data.replace(/\r/g,'');}
this.grammar.root.apply(node,data,options);if(options.forIE){node.innerHTML=node.innerHTML.replace(/\n/g,'\r\n');}}};Parse.Simple.Base.prototype.constructor=Parse.Simple.Base;Parse.Simple.Base.Rule=function(params){if(!arguments.length){return;}
for(var p in params){this[p]=params[p];}
if(!this.children){this.children=[];}};Parse.Simple.Base.prototype.ruleConstructor=Parse.Simple.Base.Rule;Parse.Simple.Base.Rule.prototype={regex:null,capture:null,replaceRegex:null,replaceString:null,tag:null,attrs:null,children:null,match:function(data,options){return data.match(this.regex);},build:function(node,r,options){var data;if(this.capture!==null){data=r[this.capture];}
var target;if(this.tag){target=document.createElement(this.tag);node.appendChild(target);}
else{target=node;}
if(data){if(this.replaceRegex){data=data.replace(this.replaceRegex,this.replaceString);}
this.apply(target,data,options);}
if(this.attrs){for(var i in this.attrs){target.setAttribute(i,this.attrs[i]);if(options.forIE&&i=='class'){target.className=this.attrs[i];}}}
return this;},apply:function(node,data,options){var tail=''+data;var matches=[];if(!this.fallback.apply){this.fallback=new this.constructor(this.fallback);}
while(true){var best=false;var rule=false;for(var i=0;i<this.children.length;i++){if(typeof matches[i]=='undefined'){if(!this.children[i].match){this.children[i]=new this.constructor(this.children[i]);}
matches[i]=this.children[i].match(tail,options);}
if(matches[i]&&(!best||best.index>matches[i].index)){best=matches[i];rule=this.children[i];if(best.index==0){break;}}}
var pos=best?best.index:tail.length;if(pos>0){this.fallback.apply(node,tail.substring(0,pos),options);}
if(!best){break;}
if(!rule.build){rule=new this.constructor(rule);}
rule.build(node,best,options);var chopped=best.index+best[0].length;tail=tail.substring(chopped);for(var i=0;i<this.children.length;i++){if(matches[i]){if(matches[i].index>=chopped){matches[i].index-=chopped;}
else{matches[i]=void 0;}}}}
return this;},fallback:{apply:function(node,data,options){node.appendChild(document.createTextNode(data));}}};Parse.Simple.Base.Rule.prototype.constructor=Parse.Simple.Base.Rule;Parse.Simple.Creole=function(options){var rx={};rx.link='[^\\]|~\\n]*(?:(?:\\](?!\\])|~.)[^\\]|~\\n]*)*';rx.linkText='[^\\]~\\n]*(?:(?:\\](?!\\])|~.)[^\\]~\\n]*)*';rx.uriPrefix='\\b(?:(?:https?|ftp)://|mailto:)';rx.uri=rx.uriPrefix+rx.link;rx.rawUri=rx.uriPrefix+'\\S*[^\\s!"\',.:;?]';rx.interwikiPrefix='[\\w.]+:';rx.interwikiLink=rx.interwikiPrefix+rx.link;var formatLink=function(link,format){if(format instanceof Function){return format(link);}
format=format instanceof Array?format:[format];if(typeof format[1]=='undefined'){format[1]='';}
return format[0]+link+format[1];};var g={hr:{tag:'hr',regex:/(^|\n)\s*----\s*(\n|$)/},br:{tag:'br',regex:/\\\\/},preBlock:{tag:'pre',capture:2,regex:/(^|\n)\{\{\{\n((.*\n)*?)\}\}\}(\n|$)/,replaceRegex:/^ ([ \t]*\}\}\})/gm,replaceString:'$1'},tt:{tag:'tt',regex:/\{\{\{(.*?\}\}\}+)/,capture:1,replaceRegex:/\}\}\}$/,replaceString:''},ulist:{tag:'ul',capture:0,regex:/(^|\n)([ \t]*\*[^*#].*(\n|$)([ \t]*[^\s*#].*(\n|$))*([ \t]*[*#]{2}.*(\n|$))*)+/},olist:{tag:'ol',capture:0,regex:/(^|\n)([ \t]*#[^*#].*(\n|$)([ \t]*[^\s*#].*(\n|$))*([ \t]*[*#]{2}.*(\n|$))*)+/},li:{tag:'li',capture:0,regex:/[ \t]*([*#]).+(\n[ \t]*[^*#\s].*)*(\n[ \t]*\1[*#].+)*/,replaceRegex:/(^|\n)[ \t]*[*#]/g,replaceString:'$1'},table:{tag:'table',capture:0,regex:/(^|\n)(\|.*?[ \t]*(\n|$))+/},tr:{tag:'tr',capture:2,regex:/(^|\n)(\|.*?)\|?[ \t]*(\n|$)/},th:{tag:'th',regex:/\|+=([^|]*)/,capture:1},td:{tag:'td',capture:1,regex:/\|+([^|~]*(~(.|(?=\n)|$)[^|~]*)*)/},singleLine:{regex:/.+/,capture:0},paragraph:{tag:'p',capture:0,regex:/(^|\n)([ \t]*\S.*(\n|$))+/},text:{capture:0,regex:/(^|\n)([ \t]*[^\s].*(\n|$))+/},strong:{tag:'strong',capture:1,regex:/\*\*([^*~]*((\*(?!\*)|~(.|(?=\n)|$))[^*~]*)*)(\*\*|\n|$)/},em:{tag:'em',capture:1,regex:'\\/\\/(((?!'+rx.uriPrefix+')[^\\/~])*'+
'(('+rx.rawUri+'|\\/(?!\\/)|~(.|(?=\\n)|$))'+
'((?!'+rx.uriPrefix+')[^\\/~])*)*)(\\/\\/|\\n|$)'},img:{regex:'\\{\\{((?!\\{)[^|}\\n]*(?:}(?!})[^|}\\n]*)*)\\|'+
'([^}~\\n]*((}(?!})|~.)[^}~\\n]*)*)}}',build:function(node,r,options){var img=document.createElement('img');img.src=r[1];img.alt=r[2].replace(/~(.)/g,'$1');node.appendChild(img);}},namedUri:{regex:'\\[\\[('+rx.uri+')\\|('+rx.linkText+')\\]\\]',build:function(node,r,options){var link=document.createElement('a');link.href=r[1];if(options&&options.isPlainUri){link.appendChild(document.createTextNode(r[2]));}
else{this.apply(link,r[2],options);}
node.appendChild(link);}},namedLink:{regex:'\\[\\[('+rx.link+')\\|('+rx.linkText+')\\]\\]',build:function(node,r,options){var link=document.createElement('a');link.href=options&&options.linkFormat?formatLink(r[1].replace(/~(.)/g,'$1'),options.linkFormat):r[1].replace(/~(.)/g,'$1');this.apply(link,r[2],options);node.appendChild(link);}},unnamedUri:{regex:'\\[\\[('+rx.uri+')\\]\\]',build:'dummy'},unnamedLink:{regex:'\\[\\[('+rx.link+')\\]\\]',build:'dummy'},unnamedInterwikiLink:{regex:'\\[\\[('+rx.interwikiLink+')\\]\\]',build:'dummy'},rawUri:{regex:'('+rx.rawUri+')',build:'dummy'},escapedSequence:{regex:'~('+rx.rawUri+'|.)',capture:1,tag:'span',attrs:{'class':'escaped'}},escapedSymbol:{regex:/~(.)/,capture:1,tag:'span',attrs:{'class':'escaped'}}};g.unnamedUri.build=g.rawUri.build=function(node,r,options){if(!options){options={};}
options.isPlainUri=true;g.namedUri.build.call(this,node,Array(r[0],r[1],r[1]),options);};g.unnamedLink.build=function(node,r,options){g.namedLink.build.call(this,node,Array(r[0],r[1],r[1]),options);};g.namedInterwikiLink={regex:'\\[\\[('+rx.interwikiLink+')\\|('+rx.linkText+')\\]\\]',build:function(node,r,options){var link=document.createElement('a');var m,f;if(options&&options.interwiki){m=r[1].match(/(.*?):(.*)/);f=options.interwiki[m[1]];}
if(typeof f=='undefined'){if(!g.namedLink.apply){g.namedLink=new this.constructor(g.namedLink);}
return g.namedLink.build.call(g.namedLink,node,r,options);}
link.href=formatLink(m[2].replace(/~(.)/g,'$1'),f);this.apply(link,r[2],options);node.appendChild(link);}};g.unnamedInterwikiLink.build=function(node,r,options){g.namedInterwikiLink.build.call(this,node,Array(r[0],r[1],r[1]),options);};g.namedUri.children=g.unnamedUri.children=g.rawUri.children=g.namedLink.children=g.unnamedLink.children=g.namedInterwikiLink.children=g.unnamedInterwikiLink.children=[g.escapedSymbol,g.img];for(var i=1;i<=6;i++){g['h'+i]={tag:'h'+i,capture:2,regex:'(^|\\n)[ \\t]*={'+i+'}[ \\t]'+
'([^~]*?(~(.|(?=\\n)|$))*)[ \\t]*=*\\s*(\\n|$)'};}
g.ulist.children=g.olist.children=[g.li];g.li.children=[g.ulist,g.olist];g.li.fallback=g.text;g.table.children=[g.tr];g.tr.children=[g.th,g.td];g.td.children=[g.singleLine];g.th.children=[g.singleLine];g.h1.children=g.h2.children=g.h3.children=g.h4.children=g.h5.children=g.h6.children=g.singleLine.children=g.paragraph.children=g.text.children=g.strong.children=g.em.children=[g.escapedSequence,g.strong,g.em,g.br,g.rawUri,g.namedUri,g.namedInterwikiLink,g.namedLink,g.unnamedUri,g.unnamedInterwikiLink,g.unnamedLink,g.tt,g.img];g.root={children:[g.h1,g.h2,g.h3,g.h4,g.h5,g.h6,g.hr,g.ulist,g.olist,g.preBlock,g.table],fallback:{children:[g.paragraph]}};Parse.Simple.Base.call(this,g,options);};Parse.Simple.Creole.prototype=new Parse.Simple.Base();Parse.Simple.Creole.prototype.constructor=Parse.Simple.Creole;
/*------ END MINIFIED creole.js -------------*/

/* script starts here */

const DEBUG = false;

function now() {
    var now = new Date();
    return now.toLocaleTimeString().replace(/ [AP]M/, (now.getMilliseconds()/1000).toFixed(3).replace(/^0/, ''));
}
function debug(str) {
    if (DEBUG)
        GM_log(now() + ": " + str + "\n");
}
function require(src) {
    var scr = document.createElement('script');
    scr.src = src;
    src.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scr);
    debug('require: ' + src + ' -- done.');
}
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;

        // start doing something now
        setup_live_preview();
        setup_quote_and_reply();
    }
}

// require('http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js');
require('http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js');
GM_wait();

function setup_live_preview() {
    if ($('textarea#body').length < 1) {
        debug('No compose area found. returning.');
        return;
    }

    // insert preview area before the compose textarea
    var preview_none = '<input id="preview-none" type="radio" name="preview-type"><label for="preview-none">No preview</label></input>';
    var preview_html = '<input id="preview-html" type="radio" name="preview-type"><label for="preview-html">HTML</label></input>';
    var preview_creole = '<input id="preview-creole" type="radio" name="preview-type"><label for="preview-creole">Creole</label></input>';
    var creole_help = '<span id="creole-help"><a href="http://www.wikicreole.org/wiki/CheatSheet" target="_blank"><img src="http://images.multiply.com/multiply/icons/clean/16x16/help2.gif" border="0"></a></span>';

    $('textarea#body').before('<div id="preview-box"></div><div id="preview-control"><p id="preview-type">'
                              + [preview_none, preview_html, preview_creole, creole_help].join(' ')
                              + '</p></div>');
    $('#preview-box').width($('textarea#body').width() - 10);
    $('#preview-box').css(
        {
            'background-color': '#fff9d1',
            'padding': '1px 5px',
            '-moz-border-radius': '5px'
        }
    ).hide();
    $('#preview-type').css(
        {
            // 'font-size': '80%',
            'font-style': 'italic',
            'margin': '0',
            'text-align': 'right',
            'vertical-align': 'middle',
        }
    );
    $('#preview-creole').get(0).checked = true;
    $('#creole-help').css(
        {
            'font-style': 'normal',
            'font-size': '1em',
        }
    );

    $('#preview-control').css('position', 'relative');
    $('#preview-control').prepend('<a id="creole-it" title="Convert to HTML">Convert Creole to HTML</a>');
    // $('#cell_submit').prepend('<button id="creole-it" title="Convert to HTML"> Creole to HTML </button>');

    $('#creole-it').css(
        {
            'font-weight': 'bold',
            'padding-left': '5px',
            // 'margin-left': '5px',
            // 'margin-right': '5px',
            'cursor': 'pointer',
            'position': 'absolute',
            'left': '0', 'top': '5px',
        })
        .click(creole_it)
        .hide();

    // hide preview upon submission
    $('#cell_submit input.submit').eq(0).click(function() { $('#preview-box').empty().hide(); });

    // set up live preview
    var creole = new Parse.Simple.Creole({});

    var input = $('textarea#body').get(0);
    var preview = $('#preview-box').get(0);

    var preview_it = function() {
        var preview_type = get_preview_type();
        // debug('preview_type |' + preview_type + '|');
        if (input.value.length > 0) {
            // preview.innerHTML = '';
            $('#preview-box').empty().show();
            if (preview_type == 'creole') {
                creole.parse(preview, input.value);
                $('#creole-it').show();
                // $('#creole-help').show();
            }
            else if (preview_type == 'html') {
                $('#preview-box').html(input.value);
                $('#creole-it').hide();
                // $('#creole-help').hide();
            }
            else {
                $('#preview-box').empty().hide();
                $('#creole-it').hide();
                // $('#creole-help').hide();
            }
        }
        else {
            $('#preview-box').empty().hide();
            if (preview_type != 'creole') {
                $('#creole-it').hide();
                // $('#creole-help').hide();
            }
            // else {
            //     $('#creole-help').show();
            // }
        }
    }

    $('textarea#body').keyup(preview_it)
    		      .mouseup(preview_it)
    		      .change(preview_it);

    $('#preview-type').click(preview_it);

    preview_it();
}

// convert textarea text to HTML, ready for submission
function creole_it() {
    $('textarea#body').get(0).value = remove_newlines($('#preview-box').html());
    $('#preview-box').slideUp();
    $('#creole-it').hide();
    return false;
}

function get_preview_type() {
    if ($('#preview-creole').get(0).checked)
        return 'creole';
    else if ($('#preview-html').get(0).checked)
        return 'html';
    else
        return 'none';
}

// remove newlines that would be translated to <br>s when submitted
// need to take care of excluding newlines within <pre> blocks here
function remove_newlines(html) {
    return html.split(/(<pre>[^<>]*<\/pre>)/)
               .map(
                   function(part) {
                       return part.match(/<pre>/) ? part : part.replace(/\n/g, ' ');
                   })
               .join('');
}

// select text while reading and reply immediately

function setup_quote_and_reply() {
    var sel_start = {};
    $(document).mousedown(
        function(e) {
            sel_start.x = e.pageX;
            sel_start.y = e.pageY;
            debug('mousedown: start = [' + [e.pageX, e.pageY].join(', ') + ']');
        }
    );
    $(document).mouseup(
        function(e) {
            // debug('e.target.id |' + e.target.id + '|');
            var selection = window.getSelection();
            if (!is_valid_selection(selection)) {
                if (e.target.id != 'quote-and-reply-button')
                    $('#quote-and-reply-button').remove();
                return;
            }

            // show_quote_reply_button(selection);
            var reply_link_id = get_reply_link(selection);
            debug('setup_quote_and_reply: reply_link_id |' + reply_link_id + '|');

            var quote_and_reply_button = get_quote_reply_button();
            debug('mouseup: end = [' + [e.pageX, e.pageY].join(', ') + ']');
            $(quote_and_reply_button).css(get_button_position(e, selection, sel_start))
            	.mouseover(
                    function() {
                        $(this).css(
                            {
                                'font-weight': 'bold',
                                color: '#fff',
                                cursor: 'pointer'
                            }
                        );
                        unsafeWindow.get_sel();
                        debug('selected text copied; reply_link_id |' + reply_link_id + '|');
                    }
                )
            	.click(
                    function() {
                        // alert('quote button clicked; reply_link_id |' + reply_link_id + '|');
                        $('a[id$="' + reply_link_id + '"]').trigger('click');
                        $('input#cite').trigger('click');
                        $(this).fadeOut(1000);
                        debug('reply link triggered.');
                    })
            	.show();

            debug('setup_live_quote: done');
        }
    );
}

function is_valid_selection(sel) {
    if (!sel || sel.isCollapsed)
        return false;

    var start_item = sel.anchorNode ? $(sel.anchorNode).parents('div.replybodytext, div.bodytext').get(0) : null;
    if (start_item.wrappedJSObject)
        start_item = start_item.wrappedJSObject;
    var end_item = sel.focusNode ? $(sel.focusNode).parents('div.replybodytext, div.bodytext').get(0) : null;
    if (end_item.wrappedJSObject)
        end_item = end_item.wrappedJSObject;

    return start_item && start_item.id && start_item.id.match(/^(item_body|reply_body_)/)
        && end_item && end_item.id && end_item.id.match(/^(item_body|reply_body_)/)
        && start_item.id == end_item.id;
}

function get_quote_reply_button(sel) {
    $('#quote-and-reply-button').remove();

    $('<div id="quote-and-reply-button"> quote </div>').appendTo('body')
        .hide()
        .css(
            {
                opacity: '.75',
                padding: '5px 10px',
                'font-weight': 'bold',
                'background-color': '#302E2B',
                'color': '#ddd',
                '-moz-border-radius': '5px',
                position: 'absolute'
            }
        );
    debug('get_quote_reply_button: quote-and-reply-button created.');

    return $('#quote-and-reply-button');
}

function get_reply_link(sel) {
    var reply_node = sel.anchorNode ? $(sel.anchorNode).parents('div.replybodytext, div.bodytext').get(0) : null;
    if (!reply_node)
        return null;

    var reply_link_id;
    if (reply_node.id == 'item_body') {	// replying to item
        var reply_item = $('#maincontent').find('div[id^="item_"]').get(0);
        reply_link_id = reply_item.id.replace(/^item_/, 'reply_link_');
    }
    else {	// replying to a comment
        reply_link_id = reply_node.id.replace(/^reply_body_/, 'reply_link_');
    }
    debug('get_reply_link: reply_link_id |' + reply_link_id + '|');

    if (!reply_link_id)
        return null;

    return reply_link_id;
}

function get_button_position(e, sel, start_pos) {
    var button_position = {};
    if (start_pos.y < e.pageY || start_pos.x < e.pageX) {
        debug('get_button_position: start is before end');
        button_position.top = e.pageY + 5;
        button_position.left = e.pageX + 5;
    }
    else {
        debug('get_button_position: start is after end');
        button_position.top = e.pageY - $('#quote-and-reply-button').height() - 15;
        button_position.left = e.pageX - $('#quote-and-reply-button').width() - 25;
    }

    return button_position;
}
