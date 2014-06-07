// ==UserScript==
// @name        My ❤ Rue89
// @version     0.1
// @description My Rue89
// @include     http://rue89.nouvelobs.com/*
// @include     http://www.rue89.com/*
// @exclude     http://rue89.nouvelobs.com/sites/news/files/*
// @copyright   2013+, Romain
// @grant       none
// @require     http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var rue89HeaderLogo = "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";
var rue89Favicon    = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAADu7exR7u3s8O7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7PDu7exR7u3s5PTz8//29fX/9vX1//r6+v/8/Pz//Pz8//r5+f/29fX/9vX1//r5+f/8/Pz/+/v7//j39//08/P/7u3s7e7t7P/29vb/6Ojx/1dX1f8UFNP/HBzT/3Fx2f/39/v/9vb4/2dn1v8REdP/NDTT/7u76P/8/Pz/9/f3/+7u7f/u7ez/9/f2/2tr1/8GBtf/VFTY/z8/1f8GBtf/goLd/6Ki4/8GBtf/OjrW/xcX1/8UFNb/6en2//r6+f/v7u3/7u3s//j39/8oKNj/Dw/a//r6/P/q6fL/CQna/zEx2f9cW9r/CQna/8PC6P9/ftz/CQna/4+P4P/8+/v/7+7t/+7t7P/4+Pj/Ly/c/xER3v/09Pr/09Pu/w4O3/8nJ93/+/v7/87O7P/z8/f/oKDj/w4O3/9WVt3//Pz8/+/u7f/u7ez/+fn5/5GR4v8SEuP/o6Ll/0ND4P8SEuP/Z2bg//n5+f/Fxev/qann/6ys6P8SEuP/NTXg//39/f/v7u3/7u3s//r6+v/6+vr/fn7i/xcX6P8XF+j/Kirl/+Li9P+8u+r/Ghrn/xcX6P8tLeX/Fxfo/y8v5f/+/v7/7+7t/+7t7P/7+/r/+/v6/1dX5v8cHO3/HBzt/6+v6//+/v3/Wlrl/xwc7f9wb+b/iYnm/xwc7f8pKev//v79/+/u7f/u7ez//Pv7/7Kx6/8gIPH/JSXw/1VV6f88POv/6ej4/z4+7P8gIPH/vr7v/7u67f8gIPH/Nzft//79/f/v7u3/7u3s//z8/P+BgOr/JSX2/5GR6//W1vP/JSX2/5aW7P9PT+7/JSX2/7+/8P+8vO//JSX2/01M7//9/f3/7+7t/+7t7P/9/f3/iIjs/ygo+f+4uPD/5+b4/ygo+f+BgO3/cXHt/ygo+f+sq+7/pqbu/ygo+f90dO3//f39/+/u7f/u7ez//v79/83N8/8sLP3/SUn2/1VV9P8sLP3/ubnx/8bG8f8sLP3/UlL0/0ZG9v8sLP3/w8Py//7+/f/v7u3/7u3s//7+/v/+/v7/qajw/0tL9/8+Pvr/i4vv//7+/v/+/v7/pKPw/0ZG+f9DQ/r/lZXv//7+/v/+/v7/7+7t/+7t7Of5+fn/////////////////////////////////////////////////////////////////+vr5/+7t7O3u7ew/7u3sye7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7P/u7ez/7u3s/+7t7Mzu7exLgAH//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//gAH//w==";

var rue89Helper = {
    
    // Remove evil and replace with your ❤ logo
    fixLogo: function(){
        var $imgRue89HeaderLogo = $('<img />', {
            'src' : 'data:image/png;base64,' + rue89HeaderLogo,
            'style': 'margin-bottom:10px;'
        });
        $('#header .logos').empty().append($imgRue89HeaderLogo); //.insertBefore($('.quicklinks'));
    },
    
    // Clean up "rubriques" menu
    fixMenu: function(){
        var $menu =  $('.rubriques');
        
        $('li a', $menu).css({
            'font-size': '14px',
            'font-weight': 'lighter',
            'font-family': 'FranklinGothicStdExtraCondens',
            'line-height': '12px',
            'color': '#35363F',
            'border-left': '2px solid #CCC',
            'padding-left': '5px'
        });
        $('li', $menu).css({ 'padding': '4px 5px 20px 4px' }); 
        $('li.rue89 a', $menu).attr('data-icon', '').css({ 'border-left': 'none' });
        $('li.rue89', $menu).css({ 'padding-top': '2px' });
    },
    
    // Restore your ❤ favicon
    fixFavicon: function(){
        $('link[rel="shortcut icon"]').remove();
        var $imgRue89Favicon = $('<link />', {
            'href': 'data:image/x-icon;base64,' + rue89Favicon,
            'type': 'image/x-icon',
            'rel' : 'shortcut icon'
        });
        $('head').append($imgRue89Favicon);
    }
    
};

$(document).ready(function() {
    rue89Helper.fixLogo();
    rue89Helper.fixMenu();
    rue89Helper.fixFavicon();
});
