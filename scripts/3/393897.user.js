// ==UserScript==
// @name	books24x7_readable
// @namespace	http://zhangtai.me
// @description	Change fonts on books24x7
// @author	Zhang Tai
// @version	1.3
// @require jquery.js
// @include	http://www.books24x7.com/assetviewer.aspx*
// ==/UserScript==

$(document).ready(function(){
    
    progressRaw = $(".b24-chunknavigate img[title]").attr("title");
    progressDig = $(".b24-chunknavigate img[title]").attr("title").match(/\d+/g);
    bookTitle = $("div#FullText2 span").contents().text();

    
    (function(font) {
	var	head = document.getElementsByTagName('head')[0],
		link = document.createElement('link'),
		style = document.createElement('style'),
		rules = document.createTextNode('#ctl00_ContentPlaceHolder1_ContentPanel * { font-family: "' + font.family + '", arial, sans-serif !important }');

    link.rel  = 'stylesheet';
	link.href = '//fonts.googleapis.com/css?family=' + font.family + ':' + (font.style || []) + '&subset=' + (font.subset || ['latin']);
	head.appendChild(link);
	
	style.styleSheet ? style.styleSheet.cssText = rules.nodeValue : style.appendChild(rules);
	head.appendChild(style);
    
})({ family:'Antic Slab', style:['400','700'] });
    
$("#download").after("<a id='newPrevPage' href='#'><img src='//icons.iconarchive.com/icons/visualpharm/ios7v2/32/Arrows-Back-icon.png' /></a><a id='newNextPage' href='#'><img src='//icons.iconarchive.com/icons/visualpharm/ios7v2/32/Arrows-Forward-icon.png' /></a>");
    
    $("#newPrevPage").click(function() {
        $( "#ctl00_ContentPlaceHolder1_TopProgressControl_PreviousSection" ).click();
    });
    $("#newNextPage").click(function() {
        $( "#ctl00_ContentPlaceHolder1_TopProgressControl_NextSection" ).click();
    });
    
$( "#FullText1" ).before( "<a href='http://www.books24x7.com/bookshelf.asp'><img src='//png-1.findicons.com/files/icons/1580/devine_icons_part_2/24/home.png' /></a>" );
$( "#UnattachedAnnotationsHere" ).after("<div class='progress'><div id='progress-bar' class='progress-bar' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: " + progressDig + "%;'>" + progressRaw + "</div></div>");
$( "#FullText1" ).before('<a href="#" id="goodreadProgress" title"Find in Goodread" alt"Goodread"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAACkiHGkiHGkiHGkiHGkiHGkiHGkiHGpj3jt7N7k3tDy8uXGt6TQxLPVy7q4o46znIeulYDLvavBsJ3f2Mjp5de8qZVgnfm3AAAAB3RSTlMAYNAQ8LDAThnSHAAAAHhJREFUeF5lz0mugzAAA9AkQF4GZvr%2F%2FY9aobKoVC%2Ffxna4EyeYYvhkSABpuGEYsZ1z2RhvSVjqsrSOFELE0XfmDjFkzA2lQw5wvqCDAFfF9gWlro72BfZX%2F7seyCgb9gr5qZ2VtkL8DPtvva4F6ZkOMA6%2F537uvwGpugbVLOx6dAAAAABJRU5ErkJggg%3D%3D" /></a>');
    
$( ".progress" ).click(function() {
  $( "#MenuTD" ).toggle( "slow", function() {
    // Animation complete.
  });
  $( "#ctl00_ContentPlaceHolder1_AssetMetaControl_bookseparator" ).toggle( "slow", function() {
    // Animation complete.
  });
  $( "#ctl00_ContentPlaceHolder1_AssetMetaUpdatePanel" ).toggle( "slow", function() {
    // Animation complete.
  });
});

    $( "#goodreadProgress" ).click(function(){
        window.open('https://www.goodreads.com/search?utf8=✓&query=' + bookTitle );
    });
            
    
    // [MiniMap]

	var miniMapScript=document.createElement("script"); 
    miniMapScript.src="http://dropthebit.com/demos/mini_page_nav/miniPageNav.js"; 
    document.body.appendChild(miniMapScript);

    
    $('.progress').hover(function() {
        $('.canvasPaneHandler').parent().toggle();
    });
   
});