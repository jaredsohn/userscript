// ==UserScript==
// @name       		Amazon Quick Price Compare with Pricenoia
// @version    		0.4
// @description 	Get the Pricenoia compare price list quickly !
// @require    		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include      	http://www.amazon.*/*
// @include      	https://www.amazon.*/*
// @copyright  		2013+, bNj
// ==/UserScript==

var productURL = '';
var $span;
var $img;
var $img_attr = {
    static:'http://i.imgur.com/SN911tY.png',
    loading:'http://i.imgur.com/VphHiTf.gif'    
};
var $iframe_wrapper;
var $iframe;

$(document).ready(function() {
    productURL = $('link[rel=canonical]').attr('href');
    if(productURL){
        $span = $('<span>');
        $span.css({
            padding:'4px',
            backgroundColor:'#f1f1f1',
            borderRadius:'5px'
        });
        $img = $('<img>');
        $img.attr({
            id:'pricenoia_icon',
            align:'absmiddle',
            src:$img_attr.static
        }).css({
            marginRight:'4px'
        }).appendTo($span);
        $('<a>').attr({
            href:'javascript:;',
            id:'pricenoia_link',
            text:'Compare on Pricenoia'
        }).html('Compare on Pricenoia').appendTo($span);
        $iframe_wrapper = $('<div>');
        $iframe_wrapper.attr({
            id:'frame_wrapper'
        })
        $iframe_wrapper.css({
            display:'none',
            position:'absolute',
            zIndex:'999999',
            backgroundColor:'#f1f1f1',
            padding:'4px',
            margin:'-1px 0 0 -38px',
            borderRadius:'5px' 
        });
       	$iframe = $('<iframe>');
        $iframe.attr({
            id:'frame',
            width:'1070',
            height:'600',
            frameBorder:'0',
            src:''
        }).appendTo($iframe_wrapper);
        $iframe_wrapper.appendTo($span);
        var $price_line = $('b.priceLarge').parents('td:first');
        $span.appendTo($price_line);
        $('#pricenoia_link').click(function(){
            load_pricenoia();
        });
    }
})

function load_pricenoia(){
    if(!$iframe.attr('src')){
        $img.attr('src',$img_attr.loading);
    	$iframe.attr('src', 'https://pricenoia.com/search/All/'+encodeURIComponent(productURL));
        $iframe.load(function(){
            $iframe_wrapper.fadeIn('fast');
            $img.attr('src',$img_attr.static);
        });
    } else {
        ($iframe_wrapper.is(':visible'))?$iframe_wrapper.fadeOut('fast'):$iframe_wrapper.fadeIn('fast');
    }
}