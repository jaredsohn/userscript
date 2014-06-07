// ==UserScript==
// @name           Animated GIF All the GMail
// @namespace      http://www.fivesided.com/
// @description    Whenever the user selects a word or words within GMail, a pop-up will appear displaying the first animated GIF returned by Google Images when querying it.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

/*********************** BEGIN: Wrapper for GM_xmlhttpRequest *********************************/
function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };

    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };

    this.abort = function() {
        this.readyState = 0;
    };

    this.getResponseHeader = function(name) {
        return this.headers[name];
    };

    this.send = function(data) {
        this.data = data;
        var that = this;
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with returned data
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onerror: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onreadystatechange: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};

$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});
/*********************** END: Wrapper for GM_xmlhttpRequest *********************************/

/*************************** BEGIN: Kolich text selector ************************************/
		       /**
			 * Copyright (c) 2009 Mark S. Kolich
			 * http://mark.kolich.com
			 *
			 * Permission is hereby granted, free of charge, to any person
			 * obtaining a copy of this software and associated documentation
			 * files (the "Software"), to deal in the Software without
			 * restriction, including without limitation the rights to use,
			 * copy, modify, merge, publish, distribute, sublicense, and/or sell
			 * copies of the Software, and to permit persons to whom the
			 * Software is furnished to do so, subject to the following
			 * conditions:
			 *
			 * The above copyright notice and this permission notice shall be
			 * included in all copies or substantial portions of the Software.
			 *
			 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
			 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
			 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
			 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
			 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
			 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
			 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
			 * OTHER DEALINGS IN THE SOFTWARE.
			*/
			
			if(!window.Kolich){
				Kolich = {};
			}
			
			Kolich.Selector = {};
			// getSelected() was borrowed from CodeToad at
			// http://www.codetoad.com/javascript_get_selected_text.asp
			Kolich.Selector.getSelected = function(){
				var t = '';
				if(window.getSelection){
					t = window.getSelection();
				}else if(document.getSelection){
					t = document.getSelection();
				}else if(document.selection){
					t = document.selection.createRange().text;
				}
				return t;
			}
			
			Kolich.Selector.mouseup = function(){
				var st = Kolich.Selector.getSelected();
				if(st!=''){
					alert("You selected:\n"+st);
				}
			}
			
			$(document).ready(function(){
				$(document).bind("mouseup", wasTextSelected);
			});
/**************************** END: Kolich text selector *************************************/

showBox = document.createElement('div');
showBox.setAttribute("id", "showBox");
$(showBox).css({
		'position': 'absolute',
		'z-index': '10000',
		'border': '2px solid #000',
		'padding': '5px',
		'margin': '5px',
		'background-color': 'rgba(255,255,255,0.65)'
	}).hide();
$("body").after(showBox);

var lastE = null;
function wasTextSelected(e) {
	lastE = e;
	var st = Kolich.Selector.getSelected();
	if (st != '') {
		startDisplay(st);
	} else {
		$(showBox).fadeOut(600);
	}
}

function startDisplay(what) {
	$(showBox).fadeOut(600, function() { changeDisplay(what) });
}

function changeDisplay(what) {
	$.get(
			'http://ajax.googleapis.com/ajax/services/search/images', 
			{ v: '1.0', rsz: '1', format: 'json', q: what + ' "animated gif"', imgsz: 'medium', as_filetype: 'gif' }, 
			function (data) { 
				if (typeof data.responseData.results[0] != 'undefined') {
					$(showBox).html('<img src="' + data.responseData.results[0].unescapedUrl + '" width="' + data.responseData.results[0].width + '" height="' + data.responseData.results[0].height + '" />');
					finishDisplay();
				} else {
					$(showBox).html('<strong>not found</strong>');
				}
			}, 
			'json'
		);
}

function finishDisplay() {
	var e = lastE;

	var mousex = e.pageX + 10; //Get X coordinates
	var mousey = e.pageY + 10; //Get Y coordinates

	var tipWidth = $(showBox).width(); //Find width of tooltip
	var tipHeight = $(showBox).height(); //Find height of tooltip

	var tipVisX = window.outerWidth - (mousex + tipWidth);	//Distance of element from the right edge of viewport
	var tipVisY = window.outerHeight - (mousey + tipHeight);	//Distance of element from the bottom of viewport

	if (tipVisX < 20) { //If tooltip exceeds the X coordinate of viewport
		if (tipWidth > e.pageX - 10) 	mousex = 0;
		else 				mousex = e.pageX - tipWidth - 10;
	} 
	if ( tipVisY < 150 ) { //If tooltip exceeds the Y coordinate of viewport
		if (tipHeight > e.pageY - 30)	mousey = 0;
		else				mousey = e.pageY - tipHeight - 30;
	}

	//Absolute position the tooltip according to mouse position
	$(showBox).css({ top: mousey, left: mousex }).fadeIn(600);
}