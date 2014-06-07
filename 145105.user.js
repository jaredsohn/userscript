// ==UserScript==
// @name        Entries and Comments
// @namespace   bazetts
// @description derp
// @version     1
// @grant none
// @include     http://www.steamgifts.com/giveaway/*
// ==/UserScript==
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
$('.wrapper > .content').prepend('<div id="baz"><input type="button" value="FIND THOSE LEECHERS" name="bazwillfindyou"/></div>');
$('input[name=bazwillfindyou]').click(function() {
	var entered = getList(1, true);
	var commented = getList(1, false);

	var hunt = new Array();
	$(entered).each(function(i, val){
		if ($.inArray(val, commented) < 0)
			hunt.push(val);
	});
	
	$('#baz p').remove();
	$('#baz').append('<p>')
	$('#baz p').append('Total: ' + hunt.length + '<br />');
	$.each(hunt, function(i, val) { $('#baz p').append(val + ', '); });
});

var getList = function(page, entries) {
	var url = '/giveaway/' + window.location.pathname.split('/')[2] + '/derp/';
	url += (entries == true ? 'entries/' : '');
	url += 'page/' + page;
	
	var list = new Array();
	
	$.ajax({
		url: url,
		async: false,
		success: function(data) {
			var $data = $(data);
			
			if (entries)
				$('.entry > .details > .username', $data).each(function(){ list.push($(this).text()); });
			else
				$('.comment', $data).each(function() { if($(this).attr('id')) list.push($('.author_name > a', this).text()); });
			
			var pages = 1;
			var p = $('.pagination > .numbers > a', $data).eq(-2).text();
			if (p)
				pages = p;
			
			if (pages > page)
				$.merge(list, getList(page + 1, entries));
		}
	});
	
	return list;
}
});