// ==UserScript==
// @name        Github Commits on iceScrum
// @namespace   test
// @description Adds a "Commits" tab to the ticket page
// @include     http://*/icescrum/p/ACFP#story/*
// @version     1
// @grant       all
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$.noConflict(); // not sure if this is necessary 
jQuery(document).ready(function($) {

  waitUntilExists("panel-box-1", function(){
    //192.168.0.111:8080
    $('#panel-box-1 a').click(function(){
      $('#panel-commits').hide();
    });
    
    // Add Commits Tab
    $('#panel-box-1').append('<a id="tab-commits" class="" href="../" rel="#commits">Commits</a>');
    // Add Click event
    $('a#tab-commits').click(function(){
      $('#panel-commits').show();
    });
    
  });
  
  waitUntilExists("panel-tab-contents-1", function(){
    // Add Commits content pane
    $('#panel-tab-contents-1').append('<div class="panel-tab-content" id="panel-commits" style="display: none;"><div class="panel-box-empty">There is no commits associated with this element.');
  });
  
});



/*
 * Wait Until Exists Version v0.2 - http://javascriptisawesome.blogspot.com/
 *
 *
 * TERMS OF USE - Wait Until Exists
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2011 Ivan Castellanos
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/


(function(){
	var _waitUntilExists = {
		pending_functions : [],
		loop_and_call : function()
		{
			if(!_waitUntilExists.pending_functions.length){return}
			for(var i=0;i<_waitUntilExists.pending_functions.length;i++)
			{	
				var obj = _waitUntilExists.pending_functions[i];
				var resolution = document.getElementById(obj.id);
				if(obj.id == document){
					resolution = document.body;
				}
				if(resolution){
					var _f = obj.f;
					_waitUntilExists.pending_functions.splice(i, 1)
					if(obj.c == "itself"){obj.c = resolution}
					_f.call(obj.c)							
					i--					
				}
			}
		},
		global_interval : setInterval(function(){_waitUntilExists.loop_and_call()},5)
	}
	if(document.addEventListener){
		document.addEventListener("DOMNodeInserted", _waitUntilExists.loop_and_call, false);
		clearInterval(_waitUntilExists.global_interval);
	}
	window.waitUntilExists = function(id,the_function,context){
		context = context || window
		if(typeof id == "function"){context = the_function;the_function = id;id=document}
		_waitUntilExists.pending_functions.push({f:the_function,id:id,c:context})
	}
	waitUntilExists.stop = function(id,f){
		for(var i=0;i<_waitUntilExists.pending_functions.length;i++){
			if(_waitUntilExists.pending_functions[i].id==id && (typeof f == "undefined" || _waitUntilExists.pending_functions[i].f == f))
			{
				_waitUntilExists.pending_functions.splice(i, 1)
			}
		}
	}
	waitUntilExists.stopAll = function(){
		_waitUntilExists.pending_functions = []
	}
})()