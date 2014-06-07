// ==UserScript==
// @name        Bible selector
// @description Choose which bibles appear in the dropdown menu, unclutters the menu
// @namespace   http://userscripts.org/users/lorriman
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require  https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require http://userscripts.org/scripts/source/50018.user.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_log
// @grant 	       GM_registerMenuCommand
// @include     http://www.biblegateway.com*
// @include     http://biblegateway.com*
// @match     http://www.biblegateway.com/*
// @match     http://biblegateway.com/*
// @version     .1

// ==/UserScript==


console.debug('Bible gateway bible selector : LOADED');


//debug functions
function var_dump() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Zahlii
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // %        note 1: For returning a string, use var_export() with the second argument set to true
    // *     example 1: var_dump(1);
    // *     returns 1: 'int(1)'
    
    var output = '',
        pad_char = ' ',
        pad_val = 4,
        lgth = 0,
        i = 0,
        d = this.window.document;
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    
    var _repeat_char = function (len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };
    var _getInnerVal = function (val, thick_pad) {
        var ret = '';
        if (val === null) {
            ret = 'NULL';
        } else if (typeof val === 'boolean') {
            ret = 'bool(' + val + ')';
        } else if (typeof val === 'string') {
            ret = 'string(' + val.length + ') "' + val + '"';
        } else if (typeof val === 'number') {
            if (parseFloat(val) == parseInt(val, 10)) {
                ret = 'int(' + val + ')';
            } else {
                ret = 'float(' + val + ')';
            }
        }
            // The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
            else if (typeof val === 'undefined') {
                ret = 'undefined';
            } else if (typeof val === 'function') {
                var funcLines = val.toString().split('\n');
                ret = '';
                for (var i = 0, fll = funcLines.length; i < fll; i++) {
                    ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
                }
            } else if (val instanceof Date) {
                ret = 'Date(' + val + ')';
            } else if (val instanceof RegExp) {
                ret = 'RegExp(' + val + ')';
            } else if (val.nodeName) { // Different than PHP's DOMElement
                switch (val.nodeType) {
                    case 1:
                        if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
                            ret = 'HTMLElement("' + val.nodeName + '")';
                        } else {
                            ret = 'XML Element("' + val.nodeName + '")';
                        }
                        break;
                    case 2:
                        ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
                        break;
                    case 3:
                        ret = 'TEXT_NODE(' + val.nodeValue + ')';
                        break;
                    case 4:
                        ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
                        break;
                    case 5:
                        ret = 'ENTITY_REFERENCE_NODE';
                        break;
                    case 6:
                        ret = 'ENTITY_NODE';
                        break;
                    case 7:
                        ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
                        break;
                    case 8:
                        ret = 'COMMENT_NODE(' + val.nodeValue + ')';
                        break;
                    case 9:
                        ret = 'DOCUMENT_NODE';
                        break;
                    case 10:
                        ret = 'DOCUMENT_TYPE_NODE';
                        break;
                    case 11:
                        ret = 'DOCUMENT_FRAGMENT_NODE';
                        break;
                    case 12:
                        ret = 'NOTATION_NODE';
                        break;
                }
            }
                return ret;
    };
    
    var _formatArray = function (obj, cur_depth, pad_val, pad_char) {
        var someProp = '';
        if (cur_depth > 0) {
            cur_depth++;
        }
        
        var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
        var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';
        var val = '';
        
        if (typeof obj === 'object' && obj !== null) {
            if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
                return obj.var_dump();
            }
            lgth = 0;
            for (someProp in obj) {
                lgth++;
            }
            str += 'array(' + lgth + ') {\n';
            for (var key in obj) {
                var objVal = obj[key];
                if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !objVal.nodeName) {
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val, pad_char);
                } else {
                    val = _getInnerVal(objVal, thick_pad);
                    str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
                }
            }
            str += base_pad + '}\n';
        } else {
            str = _getInnerVal(obj, thick_pad);
        }
        return str;
    };
    
    output = _formatArray(arguments[0], 0, pad_val, pad_char);
    for (i = 1; i < arguments.length; i++) {
        output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
    }
    
    return '<pre>'+output+'</pre>';
}

function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
} //endfunc



function initialise(){
    fields = {};
    translation_ids = [];
    translation_lang={};
    var lang='no lang';
    var selector;
    selectors=["select.translation-dropdown > option",
               'select[data-prefname="default_version"] > option',
               'select[data-prefname="pslookup_version2"] > option'
              ];
    //the selector is also used later in the script
    //search for a usable dropdown menu
    for(i=0;i<selectors.length;i++){
        if((selector=$(selectors[i])).length>0){ console.debug('matched selector: '+selectors[i]); break;  }
    }

    $(selector).each(function (idx, el) {
        e = $(el);

        if (!($.inArray(e.attr('class'), ['lang', 'spacer']) > -1)) {
            value= e.attr('value');
            translation_ids.push({'value' : value,'lang' : lang});
            translation_lang[value]=lang;
        }else if(e.attr('class')=='lang'){
            lang=e.text();
        }
            
            });
    
    fields['disable'] = {
        'label' : 'DISABLE',
        'type' : 'checkbox',
        'size' : 100
    };
    
    fields['select all'] = {        
        'label' : 'select all',
        'type' : 'button',
        'size' : 100,
        'click' : function () {
            for (i = 0; i < translation_ids.length; i++) {         
                
                GM_config.fields[translation_ids[i].value].value = true;
                GM_config.fields[translation_ids[i].value].reload();
            }
            GM_config.close();
            GM_config.open();
        }
    };
    
    
    fields['unselect all'] = {        
        'label' : 'unselect all',
        'type' : 'button',
        'size' : 100,
        'click' : function () {
            for (i = 0; i < translation_ids.length; i++) {
                
                GM_config.fields[translation_ids[i].value].value = false;
                GM_config.fields[translation_ids[i].value].reload();            
            }                     
            GM_config.close();
            GM_config.open();              
        }
    };

    used_lang={};//because a section must only be mentioned once
    $(selector).each(function (idx, el) {
        e = $(el);

        try{
            if (!($.inArray(e.attr('class'), ['lang', 'spacer']) > -1)) {
                index=e.attr('value');
                fields[index] = {			
                    'type' : 'checkbox',
                    'label' : e.text(),            
                    'default' : true
                };
                section=null;
                thislang=translation_lang[e.attr('value')];
                if(used_lang[thislang]){
                    section= undefined;
                }else{
                    used_lang[thislang]=true;
                    section=translation_lang[e.attr('value')];
                }                
                if(section){
                    fields[index]['section']=thislang;
                }
                
            }
        }catch(err){
            console.debug(var_dump(translation_ids[e.attr('value')]));
        }
    });
    
    function dump_stats(caller){
        return; //this is a debug function. disabled.
        time=  new Date();
        time.setTime(Date.now());
        time=time.toTimeString().substring(1,8);
        var count_true=0;
        var count_false=0;
        var count_null=0;
        var fields=GM_config['fields'];
        
        if(fields){
            for (var id in fields) {
                if(field=fields[id]){                
                    ( fields[id].value ? count_true++ : count_false++);
                    
                }else{
                    count_null++;
                }
            }
        }
        console.debug(time+' '+caller +'- true: '+count_true+' false: '+count_false+' null: '+count_null); 
    }
    
    //avoid refresh on saving flag
    GM_config.save_no_refresh=false;
    GM_config.init( { 'id': 'GM_config', 'title':'Select bibles for dropdown menu', // The id used for this instance of GM_config
                     'fields' : fields,
                     
                     'events': // Callback functions object
                     {
                         'init': function(){ dump_stats('init'); },
                         'open':  function(){ dump_stats('open'); $('#GM_config_closeBtn').text('Cancel'); },
                         'save':  function(){ GM_config.close(); 
                                             dump_stats('save');     
                                            },
                         'close':   function(){ dump_stats('close'); },
                         'reset':   function(){ console.debug('reset pressed'); },
                     } 
                    });
    
    
    
}

//closure, needed for registered menu command and to keep GM_config instance around for the 'config' link
function openconfig(){
    initialise();
    GM_config.open();
}

GM_registerMenuCommand("Configure bible list",openconfig , "c");

initialise();

if(GM_config.fields['disable'].value==false){
    for(i=0;i<selectors.length;i++){
        s=selectors[i];
        $(s).each(function (idx, el) {
            e = $(el);       
            if('lang'==e.attr('class')){
                lang=e;
                e.attr('style','display:none');
                
            }else{                
                field=GM_config.fields[e.val()];   
                if(field && !field.value){
                    e.remove();        
                }else{
                    if(lang){ lang.attr('style',''); lang=null; }              
                }
            }
        });
    };
}

//add a config link
$('form#quick-search-form').append('<a id="showbibles_link" style="font-size:12px; ">config</a>');
$('#showbibles_link').click(function(){
    GM_config.open();
});
