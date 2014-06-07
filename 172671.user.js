// ==UserScript==
// @name			Trello : Sorted cards
// @author			konjoot
// @version			0.5.1
// @include			https://trello.com/*
// @include			http://trello.com/*
// @grant				none
// ==/UserScript==

var TAG_NAME = 'sorted-cards-0.5-css'

//Allowed labels: red, purple, orange, yellow, blue, green, other(for cards without any label)

//for these json you must define css styles (class names in CSS must be same as keys in this json), like that:
var cards_tree = {
	red: {orange: [], yellow: [], blue: [], green: [], other: []}, 
	purple: {orange: [], yellow: [], blue: [], green: [], other: []}, 
	other: {orange: [], yellow: [], blue: [], green: [], other: []}
};

var cards_containers = {
	red: [],
	purple: [],
	other: []
};

var CSS_STRING = '\
.red{\
	background: none repeat scroll 0 0 rgba(244, 78, 78, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.purple{\
	background: none repeat scroll 0 0 rgba(153, 51, 204, 0.1);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.other{\
	background: none repeat scroll 0 0 rgba(82, 121, 214, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}';


function addJavascript(pos, funct) {
	$.get( "https://rawgithub.com/konjoot/trello_scripts/master/libs/mutation_summary_min.js", function( data, callback ) {
		$(pos).append('<script type="text/javascript">' + data + '</script>');
		funct();
	});
}

function sortCards(cards_tree, cards_containers){

	$('.js-cards-content div.float-cards').each(function(){
		var cards_tree_copy = JSON.parse(JSON.stringify(cards_tree));
		var cards_containers_copy = JSON.parse(JSON.stringify(cards_containers));
		var container = $(this);

		$.each(cards_tree_copy, function(key, val){
			$.each(val, function(k, v){
				if(key == 'other'){
					if(k == 'other'){
						v.push($(container).find('div.list-card-container').detach());
					}else{
						v.push($(container).find('.' + k + '-label').parents('div.list-card-container').detach());
					}
				}else{
					if(k == 'other'){
						v.push($(container).find('.' + key + '-label').parents('div.list-card-container').detach());
					}else{
						v.push($(container).find('.' + key + '-label').parents('div.js-card-labels').find('.' + k + '-label').parents('div.list-card-container').detach());
					}
				}
			});
		});

		$.each(cards_tree_copy, function(key, val){
			$.each(val, function(k, v){
				v[0].each(function(){
					cards_containers_copy[key].push($(this));
				});
			});
		});

		$.each(cards_containers_copy, function(key, val){
			if($(val).length > 0){
				if($(container).find('.' + key).length < 1){
					$('<div class="' + key + '"></div>').appendTo($(container));
				}
				$.each(val, function(){
					$(container).find('div.' + key).append($(this));
				});
			}
		});
	});
}

function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
			return;
	var style=document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.setAttribute('id', TAG_NAME);
	style.appendChild(document.createTextNode(cssToInsert));
	var old_style = document.getElementById(TAG_NAME);
	if(old_style){
			head.replaceChild(style, old_style);
	}else{
			head.appendChild(style);
	}
}

function initSort(){
	var observer = new MutationSummary({
		callback: function(){sortCards(cards_tree, cards_containers);},
		queries: [{
			element: '.window-module'
		}]
	});
}

$(insertCSS(CSS_STRING));
$(sortCards(cards_tree, cards_containers));
addJavascript('head', initSort);
