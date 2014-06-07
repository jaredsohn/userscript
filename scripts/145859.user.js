// ==UserScript==
// @name        Player Shortcuts
// @namespace   bazetts
// @include     https://dotabuff.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

// JQuery fix for chrome
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	// GM_getValue for chrome
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		this.GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
	
	// Shortcut-div
	function updateShortcuts()
	{
		$('#shortcuts').remove();
		var text = '<div id="shortcuts">';
		$.each(shortcuts, function(index, value){
			text += '<a href="/players/' + index + '/">' + value + '</a> - ';
		});
		text += '</div>';
		$(text).css('margin-top', '10px').insertBefore('#content-header');
	}
	
	var pathname = window.location.pathname.split('/');
	var shortcuts = JSON.parse(GM_getValue('shortcuts', '{}'));
	
	updateShortcuts();
	
	// Add Shortcut-button on player pages
	if (pathname[1] == "players")
	{
		var add = (pathname[2] in shortcuts ? false : true);
		$('<div id="shortcut-add"><a href="#">' + (add ? 'Add' : 'Remove') + ' shortcut</a></div>').insertAfter('#content-header-primary > .content-header-title > h1');
		$('#shortcut-add').click(function(){
			if(add)
				shortcuts[pathname[2]] = $('.image-avatar').attr('alt');
			else
				delete shortcuts[pathname[2]];
			
			add = !add;
			$('#shortcut-add > a').html((add ? 'Add' : 'Remove') + ' shortcut');
			GM_setValue('shortcuts', JSON.stringify(shortcuts));
			updateShortcuts();
		});
	}
});