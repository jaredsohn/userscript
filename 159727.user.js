// ==UserScript==
// @name         Default Textbox
// @version		6
// @namespace    defaultTexbox
// @include      *
// @exclude		 http://*.google.com/*
// @exclude		 https://*.google.com/*
// @author       Charlie Hayes
// @description  Allow a default texbox to be set for any webpage. This script tries to identify sites (like google) that already have defaults set and does not run on those pages.
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


//TODO
//handle webkit-speech overlay
//detect google instead of block
//detect user-focused text boxes at start and ignore them


function createXPathFromElement(elm) { 
    var allNodes = document.getElementsByTagName('*'); 
    for (segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) { 
                 if (elm.hasAttribute('id')) { 
                 var uniqueIdCount = 0; 
                 for (var n=0;n < allNodes.length;n++) { 
                 if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
    if (uniqueIdCount > 1)
        break; 
    }
    if ( uniqueIdCount == 1) { 
        segs.unshift('id("' + elm.getAttribute('id') + '")'); 
        return segs.join('/'); 
    } else { 
        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
    } 
    } else if (elm.hasAttribute('class')) { 
        segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
    } else { 
        for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
            if (sib.localName == elm.localName)  i++;
        }
        segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
    }
    }
    return segs.length ? '/' + segs.join('/') : null; 
}
function getElementFromXPath(xpath){
    return document.evaluate( xpath ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}
function select(element){
    $(function(){
        element.focus();
    });
}

var defaultControl = GM_getValue('defaultControlFor' + document.location);

start = function(){
    
    var textBoxes = $('input[type="text"],input[type="password"],input:not([type]),textarea');
    
    textBoxes.each(function(){
        var textBox = this;
        
            
        var parent = $(this).parent();       
        var path = createXPathFromElement(this);
        var setter = $('<div>').get(0);
        $(textBox).after(setter);
        
        $(setter).append("d");
        $(setter).addClass("defaultSetter");
        $(setter).css("-webkit-user-select", "none");
        
        setter.style.position = "absolute";
        setter.style.fontSize = "xx-small";
        setter.style.cursor = "pointer";
        setter.style.paddingLeft = "2px";
        setter.style.paddingRight = "2px";
        setter.style.color = "white";
        setter.style.display = "none";
        setter.style.margin="1px";
        setter.style.lineHeight="1.4em";
        setter.style.textShadow = "none";
        setter.style.border="none";
        setter.style.width="auto";
        
        
        var show = function(){
            
        	$(setter).attr('title',(defaultControl == path) ? 'Remove default focus' : 'Make default focus');
            setter.style.backgroundColor = (defaultControl == path) ? 'green' : 'darkred'
            setter.style.top =  (
                parseInt($(textBox).position().top) +
                parseInt($(textBox).css('margin-top'))) + "px";
            setter.style.left =  (
                parseInt($(textBox).position().left) + 
                parseInt($(textBox).css('margin-left')) + 
                parseInt($(textBox).css('padding-left')) + 
                parseInt($(textBox).width())- 
                parseInt($(setter).width())-4) + "px";
            $(setter).css('display','inline-block');
        };
        
        $(setter).click(function(){
            var path = createXPathFromElement(textBox);
            if (defaultControl == path){
                GM_deleteValue('defaultControlFor' + document.location);
                defaultControl = null;
            }else{
                GM_setValue('defaultControlFor' + document.location, path);
                defaultControl = path;
                select(textBox);
            }
            show();
        });
        
        
        

        var hide = function(){$(setter).hide();};
        $(textBox).mouseenter(show);
        $(textBox).mousemove(show);
        $(textBox).mouseleave(hide);
        $(setter).mouseenter(show);
        $(setter).mouseleave(hide);
        $(textBox).keydown(hide);
    });
    if (defaultControl){
        var element =  getElementFromXPath(defaultControl);
        if (element)
            select(element);
    }
};

var element;
if (defaultControl){
    //console.log("found stored default: " + defaultControl);
    element = getElementFromXPath(defaultControl);
}
if (element){
    select(element);
    start();
}else{
    $(function(){
        //console.log("searching");
        var i = 0;
        var found = false;
        var pollId = setInterval(function(){
            var e = document.activeElement;
            if (e != document.body){
                found = true;
                //console.log("found");
                clearInterval(pollId);
                $('.defaultSetter').remove();
                return;
            }
            
            i++;
            if (i==10 && !found)
                start();
            if (i>10 || found){
                clearInterval(pollId);
            }
        },10);
    });
}