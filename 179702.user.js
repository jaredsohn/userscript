// ==UserScript==
// @name       D3 Filter
// @namespace  http://shmidt.in/
// @version    1.0
// @description  Allows to filter unwanted posts in common feed.
// @match      http*://d3.ru/*
// @copyright  2013, Sergey Shmidt
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).bind("ready", function(event){
    cleanAllShit();
    
    //$('.b-load_more_button, .b-ads').remove();
    
    $( ".b-post_domain" ).each(function(){
		bPostDomain = $(this).text();
        removeButton = $('<span title="'+bPostDomain+'" class="removeme"> x</span>').click(function(){
            var siteToRemove = $(this).attr('title');
            if (confirm("Are you sure that you wanna hide \""+ siteToRemove +"\" from your feed?")) {
	        	$.cookie("d3filter",$.cookie("d3filter") + "," + siteToRemove, { expires: 365 });
                cleanAllShit();
            }
        });
        
        $(this).after(removeButton);
    });  
});
    
   

function cleanAllShit(){
    $( ".post" ).each(function( index ) {
        bPostDomain = $(this).find('.b-post_domain').text();
        
        if (!$.cookie("d3filter")) $.cookie("d3filter", "politota", { expires: 365 });
        
        filters = $.cookie("d3filter").split(",");
        
        for (i = 0; i < filters.length; i++) {
          if (filters[i] === bPostDomain) {
  			 $(this).hide();
          }
        }
    });
    showFilters();
}

function showFilters(){
    $('.filtered').remove();
    
    var filteredCookies = $.cookie("d3filter").split(',');
    console.log(filteredCookies);
    
    var filtered = "<span>"+filteredCookies.join("</span>, <span>")+"</span>";
    
    $('.l-footer').append("<div class='b-top_panel filtered'>Filtered: "+filtered+"</div>");
    
    $('.filtered span').click(function(){
        if (confirm("Are you sure that you turn back \""+ $(this).text() +"\"?")) {
			var finalCookie = $.cookie("d3filter").replace($(this).text(), '');
            finalCookie = finalCookie.split(',');
            finalCookie = finalCookie.filter(function(n){return n});
            console.log( finalCookie);
            
			$.cookie("d3filter",finalCookie, { expires: 365 });
            
			cleanAllShit();
        }
    });
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.b-top_panel.filtered span:hover { text-decoration: line-through; cursor: pointer; }');
addGlobalStyle('.b-top_panel.filtered { color:#ccc; padding:3px 3px 3px 38px; }');

//fnctns
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function r(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function s(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{e=decodeURIComponent(e.replace(t," "))}catch(n){return}try{return u.json?JSON.parse(e):e}catch(n){}}function o(t,n){var r=u.raw?t:s(t);return e.isFunction(n)?n(r):r}var t=/\+/g;var u=e.cookie=function(t,s,a){if(s!==undefined&&!e.isFunction(s)){a=e.extend({},u.defaults,a);if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}return document.cookie=[n(t),"=",i(s),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=t?undefined:{};var h=document.cookie?document.cookie.split("; "):[];for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");var m=r(v.shift());var g=v.join("=");if(t&&t===m){c=o(g,s);break}if(!t&&(g=o(g))!==undefined){c[m]=g}}return c};u.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend({},n,{expires:-1}));return true}return false}})