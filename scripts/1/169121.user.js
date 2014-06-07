// ==UserScript==
// @name       Imager
// @namespace  http://example.com/*
// @version    0.3
// @description  Imager Script
// @include      *
// @copyright  2013+, k-soft
// @require http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

var List = {};
var ShowTimer = 0, HideTimer = 0;
var Lock = false;

function UTS() {
	return (Math.round((new Date()).getTime() / 1000) - 1369690000);

}

$.fn.highlight = function(words, id) {
    console.log("Highlighting "+words);
    $(".ksoft_preview").replaceWith(function() {
                                                  return $(this).contents();
                                                });
    function wordsHighlight(node, words) {
        if (node.nodeType == 3) {
            var regexp = new RegExp(words,"gi"),
                str = $('<div></div>').text(node.data).html();
            $(node).replaceWith(str.replace(regexp, '<span class="ksoft_preview" ksoft_id="' + id + '">'+ words +'</span>'));
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; i++) {
                wordsHighlight(node.childNodes[i], words);
            }
        }
            }
    
    return this.each(function() {
        wordsHighlight(this, words);
    });
};

(function($) {
    $.event.special.textselect = {
        setup: function(data, namespaces) {
            $(this).data("textselected",false);
            $(this).bind('mouseup', $.event.special.textselect.handler);
        },
        teardown: function(data) {
            $(this).unbind('mouseup', $.event.special.textselect.handler);
        },
        handler: function(event) { 
            var text = $.event.special.textselect.getSelectedText().toString(); 
            if(text!='') {
                $(this).data("textselected",true);
                event.type = "textselect";
                event.text = text;
                $.event.handle.apply(this, arguments);
            }
        },
        getSelectedText: function() {
            var text = '';
            if (window.getSelection) {
                text = window.getSelection();
            } else if (document.getSelection) {
                text = document.getSelection();
            } else if (document.selection) {
                text = document.selection.createRange().text;
            }
                return text;
        }
    };
    
    $.event.special.textunselect = {
        setup: function(data, namespaces) {
            $(this).data("textselected",false);
            $(this).bind('mouseup', $.event.special.textunselect.handler);
            $(this).bind('keyup', $.event.special.textunselect.handlerKey);
        },
        teardown: function(data) {
            $(this).unbind('mouseup', $.event.special.textunselect.handler);
        },
        handler: function(event) {  
            if($(this).data("textselected")) {
                var text = $.event.special.textselect.getSelectedText().toString();
                if(text=='') {
                    $(this).data("textselected",false);
                    event.type = "textunselect";
                    $.event.handle.apply(this, arguments);
                }
            }
        },
        handlerKey: function(event) {
            if($(this).data("textselected")) {
                var text = $.event.special.textselect.getSelectedText().toString();
                if((event.keyCode == 27) && (text=='')) { 
                    $(this).data("textselected",false);
                    event.type = "textunselect";
                    $.event.handle.apply(this, arguments);
                }
            }
        }
    }
})($);

$.extend({"selectedText":	function () {
    var txt = "";
    if(window.getSelection)
        txt = window.getSelection().toString();
    else if(document.getSelection)
        txt = document.getSelection();                
        else if(document.selection)
            txt = document.selection.createRange().text;
        
        return txt;
}
         });

function storage_get(key) {
    var val = GM_getValue(key);
    try {
        var v = JSON.parse(val);
        if(v) return v;
        return val;
    } catch(e) {
        return val;
    }
}

function storage_set(key, value) {
    var val = value;
    if((typeof val) == "object") {
        console.log(val);
        val = JSON.stringify(val);
    }
    GM_setValue(key, val);
}

function storage_unset(key) {
    GM_deleteValue(key);
}

function show_block(e, k) {
    console.log(k);
    e.stopPropagation();
    var el = $("<div class='ksoft_pimg'></div>"),
        x = e.clientX + document.body.scrollLeft,
        y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
    el.appendTo("body");
    el.mouseover(function(){clearTimeout(HideTimer);}).mouseout(handle_out);
    var data = List[k];
    el.css("visibility","hidden");
    
    el.html("<a href='"+data.link+"'><img src='"+data.image+"'><br>"+data.text+"</a>");
    
    if(x < document.body.clientWidth / 2)
        el.css("left",x); 
    else
        el.css("right", document.body.clientWidth - x + 1);
    
    if(e.clientY < 3 * window.innerHeight / 4)
        el.css("top",y); 
    else
        el.css("top", y - el.height() +1);
    el.css("visibility","visible");
}

function hide_block(e) {
    e.stopPropagation();
    $(".ksoft_pimg").remove();
}

function handle_in(e) {
    clearTimeout(ShowTimer);
    clearTimeout(HideTimer);
    var id  = parseInt($(this).attr("ksoft_id"),10);
    ShowTimer = setTimeout(function(){show_block(e,id);},500);
} 

function handle_out(e) {
    clearTimeout(ShowTimer);
    clearTimeout(HideTimer);
    HideTimer = setTimeout(function(){hide_block(e);},500);
} 

function add_do(e) {
    e.preventDefault();
    List[UTS()] = {
        link:$("#ksoft_add_url").val(), 
        image:$("#ksoft_add_image").val(),
        text:$("#ksoft_add_text").val(), 
        word:$("#ksoft_add_word").val()
    };
    storage_set("link_list", List);
}

function addMenu(e) {
    var el = $(".ksoft_menu");
    el.html("<h3 id='ksoft_head'>Добавить описание ("+e.text+")</h3>\
			<input id='ksoft_add_url' placeholder='URL ссылки'><br>\
			<input id='ksoft_add_image' placeholder='Картинка (url)'><br>\
			<input id='ksoft_add_text' placeholder='Описание'><br>\
			<input type='hidden' id='ksoft_add_word' value='"+e.text+"'>\
			<a href='#' id='ksoft_add'>Добавить</a>");
    $('#ksoft_add').click(add_do);
    $("<a href='#'>X</a>").click(function(e){el.hide();e.preventDefault();}).insertBefore("#ksoft_head");
    el.show();
}

function highlight_all() {
    if(Lock) return;
    Lock = true;
    console.log("starting highlight");
    for(var i in List)
            if(List.hasOwnProperty(i))
                $("body").highlight(List[i].word, i);
    console.log("We are done. Restoring handler.");
    Lock = false;
}

$(document).ready(function(){
    
    $("body").append("<div class='ksoft_menu'></div>");
    List = storage_get("link_list") || {};
    
   // List = {};
    highlight_all();
    $("body").ajaxStop(setTimeout(highlight_all,2000));
        
    $("body").on("mouseover",".ksoft_preview",handle_in);
    $("body").on("mouseout",".ksoft_preview",handle_out);
    $("body").on("textselect",addMenu);
    $("body").append("<style id='ksoft_style'></style>");
    $("#ksoft_style").append(".ksoft_pimg {position:absolute;z-index:975;display:block;background:#ddd}");
    $("#ksoft_style").append(".ksoft_menu{position:fixed;bottom:0;right:0;background:#ddd}");
});
