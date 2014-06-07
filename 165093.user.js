// ==UserScript==
// @name       	FB Hide suggestion panel and home video/image
// @namespace  	www.codelit.com
// @version    	0.1
// @description It hide the div that contain video/image(from:index-page) & right sidebar(from:home-page)
// @include		http*://*.facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @run-at		document-body
// @copyright  	rony2k6 @ 2013+
// ==/UserScript==


$(document).ready(function(){
var selectedDiv = $('div.pvl div:first');
var suggestionPanel = $('div#pagelet_ego_pane_w');
var bluebar = $('div.fixed_elem div.rfloat');

selectedDiv.css('background-color', '#000');
selectedDiv.children().css('visibility', 'hidden');

suggestionPanel.hide();
bluebar.append('<style type="text/css"> #suggestHideButton{float:right;color:#526DA4;} #pagelet_ego_pane_w, #pagelet_ego_pane, #pagelet_friend_list_suggestions, #pagelet_ego_pane{display:none;}  </style>');
/*<button id="suggestHideButton">SHOW</button>*/
/*suggestionPanel.before('<button id="suggestHideButton">SHOW</button>');*/
/*if($('button#suggestHideButton')){
    $('button#suggestHideButton').live("click", function(event){
        event.preventDefault();
        if($('button#suggestHideButton').html() == 'SHOW'){
            $('button#suggestHideButton').html('HIDE');
            suggestionPanel.show();
        }else{
            $('button#suggestHideButton').html('SHOW');
            suggestionPanel.hide();
        }
    });
}*/
});