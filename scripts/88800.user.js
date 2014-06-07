// ==UserScript==
// @name           hifiregex
// @require    http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @namespace      hifiregex
// @description    hifi regex piecemeal analyzer
// @include        http://www.gethifi.com/*
// ==/UserScript==

// HiFiRegex Piecemeal Analyzer 1.0
// Sat Oct 23 2010
//
// Copyright 2010 Nitin Karthy. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
// 1. Redistributions of source code must retain the above
// copyright notice, this list of conditions and the following
// disclaimer.
//
// 2. Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following
// disclaimer in the documentation and/or other materials
// provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// TESTED ON
// Firefox 3.6.11 (Win XP)

function getSelected(){
	var textArea = $('#regexori').get(0);
	if (typeof(textArea.selectionStart) != "undefined") { 
		var begin = textArea.value.substr(0, textArea.selectionStart); 
		var selection = textArea.value.substr(textArea.selectionStart, textArea.selectionEnd - textArea.selectionStart); 
		var end = textArea.value.substr(textArea.selectionEnd); 
		return selection; 
	}
	return "";
}

function onSelect(){
  var st = getSelected();
  if(st!=''){
	var e = document.createEvent('UIEvents');
	e.initUIEvent('keyup', true, true, window, 1);
	$('#regex').val(st).get(0).dispatchEvent(e);;
  }
}
	
function addInput(){
	var divEl = $("<div><textarea id='regexori' cols='50' rows='1' style='border:2px solid #2DC800; -moz-border-radius:3px 3px 3px 3px; font-size:20px;'></textarea></div><br/>");
	$('#regexPane').before(divEl);
}

addInput();
$('#regexori').bind("mouseup", onSelect);