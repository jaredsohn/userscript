// ==UserScript==
// @name           BetterThanks
// @namespace      myscripts
// @description    improve thanks for this post section UX
// @include        http://forums.white-wolf.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==


divs = $("[id*=dvThanksInfo]");
divs.each(function(index, item){format_link(item)});

function format_link(item){    
    id = item.id.substring(12);    
    $(item).wrap('<a href=""/>');    
    item.addEventListener('click', genTog(id), true);      
    $(item).click(function(event){
    event.preventDefault();
    });
    toggle_block(id);
}

/**
*Yay scoping!
*/
function genTog(id) {
    return function(){
        thanks = $("#dvThanks"+id);
        if(thanks.attr('style') == 'display:none'){
            thanks.attr('style', '');
        }else{
            thanks.attr('style', 'display:none');
        }
    };
}

function toggle_block(id){
    thanks = $("#dvThanks"+id);
    if(thanks.attr('style') == 'display:none'){
        thanks.attr('style', '');
    }else{
        thanks.attr('style', 'display:none');
    }
}