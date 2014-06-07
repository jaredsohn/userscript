(function (unsafeWindow) {
// ==UserScript==
// @name           GitHub hide tickets by label
// @description    Adds a button to hide tickets on specific label
// @author         artyfarty
// @version        1.0c
// @namespace      artyfarty
// @include        https://github.com/*
// ==/UserScript==

var main = function() {
	var st = JSON.parse(localStorage.getItem('exclude_labels'));
	if (!st)
		st = {};
	
	var workz = function() {
		var ex = $('<span class="exclude-link">(exclude)</span>');
		var rst = false;
		
		ex.click(function(e){
				e.stopPropagation();
				e.preventDefault();
				var n = $(e.target).siblings('.name').html()
				if (!rst) st[n] = !st[n];
				localStorage.setItem('exclude_labels', JSON.stringify(st));
				if (st[n]) {
					$('.issues-list tr').has('span.label[data-name="' + n + '"]').fadeOut();
					$(e.target).closest('li').addClass('exclude-active');
				}
				else {
					$('.issues-list tr').has('span.label[data-name="' + n + '"]').fadeIn();
					$(e.target).closest('li').removeClass('exclude-active');
				}
				
			});
		
        $('.js-editable-labels-container li > a:not(.selected)')
			.not('.with-exclude-link')
			.addClass('with-exclude-link')
			.append(ex);
			
		rst = true;
        $('.js-editable-labels-container li > a:not(.selected) span.name')
			.filter(function(i, item){ return st[$(item).html()]})
			.siblings('.exclude-link')
			.click();
		rst = false;
	}
	$(document).on('ajaxComplete', workz);
    $(document).ready(workz);
}

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

function addCSS_Node (text) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('style');
    scriptNode.type                         = "text/css";
    if (text)       scriptNode.textContent  = text;

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node (null, null, main);
    addCSS_Node('.exclude-active > a span.name { -webkit-transition: all 0.5s; -webkit-filter: blur(1px) opacity(0.5); }' + 
                '.exclude-link:hover { color: #DA6; }' + 
                '.exclude-link { color: #963; }');
})(window);