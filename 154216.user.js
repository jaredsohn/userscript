// ==UserScript==
// @name        ex.ua new design
// @namespace   EX_UA_NEW_DESIGN
// @include     *.ex.ua/*
// @version     1
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}


$(document).ready(function(){
	init();
});

function setClickEvents(){
	$('span.r_button_small a').click(function(){
		url = $(this).attr('href');
		parent_td = $(this).closest('td');
		top_ = parent_td.offset().top;
		parent_td.remove();

		$.get(url);

		newTwoColumnsDesign();
		$('html, body').animate({
         	scrollTop: top_
     	}, 500);
		return false;
	});
}

function init(){
	if (location.href.match('buffer'))
		newTwoColumnsDesign();
    if (location.href.match('view')){
		buttonsToUp();
        flvPlayList();
    }
}

function flvPlayList(){
    q=document.body.textContent.match(/{ ["\w:\s,\/\/\.]+}/gi);
    for(var i in q){
        w = JSON.parse(q[i]);
        $('table.list').prepend(
            $('<tr>').append(
                $('<td>').append($('<div>').html(w.url))
            )
        );
    }
}

function buttonsToUp(){
	bttn_list=$('p span.r_button');
	div = $('<div>').attr('id','UP_BUTTON_LIST').css('margin','5px');
	$.each(bttn_list,function(i,data){
		div.append($(data));
	});
	$('td#body_element').prepend(div);
}

function newTwoColumnsDesign(){
	var newTdList = $('table.panel td');
	$('table.panel').empty();
	for (var i=0; i < newTdList.length-2; i=i+2){
		$('table.panel').append(
			$('<tr>').append($(newTdList[i]).attr('width','50%'),$(newTdList[i+1]).attr('width','50%'))
		);
	}
	setClickEvents();
}
