// ==UserScript==
// @name        CKEditor4POEditor
// @namespace   http://www.greenweez.com/
// @description CKEditor4POEditor
// @include     /https?://poeditor.com/projects/po_edit.*/
// @include     /https?://www.poeditor.com/projects/po_edit.*/
// @include     /https?://poeditor.com/projects/interactive.*/
// @include     /https?://www.poeditor.com/projects/interactive.*/
// @version     1.4
// @grant       none
// ==/UserScript==

$(function() {
	var script = document.createElement("script");
	
	script.type = "text/javascript";
	script.src = '//cdnjs.cloudflare.com/ajax/libs/ckeditor/4.3.2/ckeditor.js';
	
	document.body.appendChild(script);
	
	
	var style = document.createElement("style");
	
	style.textContent = "\
	#main_list iframe {\
		display: none;\
	}\
	body.html-editor #main_list iframe {\
		display: block;\
	}\
	body.html-editor #main_list .no-html-editor {\
		display: none;\
	}";
	
	document.body.appendChild(style);
	
	script.onload = function() {
		var project_id = Number.parseInt(location.search.match(/id=(\d+)/)[1]);
		
		if(project_id === 5926) {
			return;
		}
		var mode = localStorage.getItem('mode-' + project_id) || 'text'
		var definitionText = po.edit.definition;
		var hideTextareaText = po.edit.hideTextarea;
		var start = po.edit.start;
		var end = po.edit.end;
		var editor = null;
		var hasChanged = false;
		
		$(window).bind("beforeunload", function() {
			if(hasChanged) {
				return "You have unsaved changes";
			}
		});
		
		po.edit.start = function(elem) {
			if(mode === 'html') {
				return po.edit.definition.call(this, elem);
			}
			start.call(this, elem);
		};
		
		po.edit.end = function() {
			if(mode === 'html' && editor !== null) {
				return;
			}
			//return end.call(this);
		};
		
		var submitData = po.edit.submitData;
		po.edit.submitData = function(force) {
			if(editor !== null) {
				po.el.val(editor.getData());
			}
			
			if(editor !== null && force) {
				$(po.el).show(); 
			}
			submitData.call(this, force);
		};
		
		var definitionHTML = function(elem) {
			var id = $(elem).attr('id').replace('textonly', 'den_edit');
			var textarea = "#" + id;
			hasChanged = true;
			if(editor !== null) {
				po.edit.submitData(true);
				po.edit.hideTextarea();
			}
			$(elem).show();
			var box = elem.getBoundingClientRect();
			editor = CKEDITOR.replace(id, {
				removeButtons: '', 
				height: (box.height*1.25) + 'px'
			});
			editor.on('blur', function() {
				if(editor.commands.maximize.state === CKEDITOR.TRISTATE_OFF) {
					end.call(po.edit);
				}
			});
			editor.on('instanceReady', function() {
				this.focus();
			})
			$(elem).hide();
			$(elem.iframe).hide();
			start.call(po.edit, textarea);
			editor.focus();
		};
		
		var hideTextareaHTML = function() {
			if(editor !== null) {
				$(editor.element.$).show();
				editor.destroy();
				editor = null;
				hasChanged = false;
				var el = po.el;
				var content = el ? el.val() : '';
				if(content.length == 0){
					$(el).show();
					return false;
				} 
			}
			hideTextareaText();
			updateTextaras();
		};
		
		function setEditor() {
			po.edit.end();
			if(mode === 'html') {
				toggleHTML.text('Switch to Text editor');
				po.edit.definition = definitionHTML;
				po.edit.hideTextarea = hideTextareaHTML;
				
				document.body.classList.add('html-editor');
			}
			else {
				toggleHTML.text('Switch to HTML editor');
				po.edit.definition = definitionText;
				po.edit.hideTextarea = hideTextareaText;
				
				document.body.classList.remove('html-editor');
			}
			
			updateTextaras();
		}
		
		CKEDITOR.config.toolbar = [
			{name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']}, 
			{name: 'links', items: ['Link', 'Unlink']}, 
			{name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent']}, 
			{name: 'tools', items: ['Maximize', 'Source']}, 
		];
		CKEDITOR.config.enterMode      = CKEDITOR.ENTER_BR;
		CKEDITOR.config.entities       = false;
		CKEDITOR.config.basicEntities  = false;
		CKEDITOR.config.entities_greek = false;
		CKEDITOR.config.entities_latin = false;
                CKEDITOR.config.allowedContent = true;
		
        var interactive = document.querySelector('.row-fluid .link-only') === null;
		var toggleHTML = $('<a class="btn btn-nav-narrow btn-default btn-lg">HTML editor</a>')[interactive ? 'insertBefore' : 'insertAfter']
           ($(document.querySelector('.btn')));
		
		if(!interactive)
			toggleHTML.addClass('pull-right');
		
		toggleHTML.on('click', function CKPO_Click() {
			mode = mode === 'text' ? 'html' : 'text';
			
			setEditor();
			
			localStorage.setItem('mode-' + project_id, mode);
		});
		
		var references = document.querySelectorAll('.reference_translation');
		if(references.length === 0) {
			references = document.querySelectorAll('#main_list tr td:first-child + td > span');
		}
		[].forEach.call(references, function(el) {

			var iframe = document.createElement('iframe');
			var html = $("<div />").html(el.textContent).text();
			
			el.classList.add('no-html-editor');
			iframe.classList.add('reference_translation', 'pre', 'pull-left');
			
			var box = el.getBoundingClientRect();
			iframe.style.height = box.height + 'px';
			iframe.style.width  = '100%';
			
			iframe.style.padding = 0;
			iframe.style.border = 0;
			
			iframe.id = el.id+'ifr';
			iframe.src = 'data:text/html;charset=utf-8, <style>html, body {margin: 0; padding: 0 2px;font-size: 13px; font-size: 14px; background-color: F8FFE2; color: 727F92;}</style>'
				+'<script>window.onload = function() {parent.iframe_resize(\''+iframe.id+'\', document.body.offsetHeight);}</script>'
				+encodeURIComponent(el.textContent);
			el.parentNode.appendChild(iframe);
		});
		
		window.iframe_resize = function(id, height) {
			document.getElementById(id).style.height = (height+70)+'px';
		}
		function updateTextaras() {
			var els = document.querySelectorAll('.edit-definition');
			[].forEach.call(els, function(el) {
				el.classList.add('no-html-editor');
				
				if(el.iframe === undefined) {
					el.iframe = document.createElement('iframe');
					el.parentNode.appendChild(el.iframe);
				}
				
				el.iframe.style.padding = 0;
				el.iframe.style.border = 0;
				
				var display = el.style.display;
				el.style.display = 'block';
				var box = el.getBoundingClientRect();
				el.style.display = display;
				el.iframe.style.height = Math.max(box.height, 60) + 'px';
				el.iframe.style.width  = '100%';
				
				window.iframe_click = function(id) {
					document.getElementById(id).onclick();
				}
				el.iframe.id = el.id+'iframe';
				el.iframe.src = 'data:text/html;charset=utf-8, <script>window.onload = function() {document.body.onclick = function() {parent.iframe_click("'+el.id+'");}; parent.iframe_resize(\''+el.iframe.id+'\', document.body.offsetHeight);};</script><style>html, body {margin: 0; padding: 0 2px; font-size: 14px; background-color: F8FFE2; color: 727F92;}</style>' + encodeURIComponent(el.textContent);
				
				el.style.display = '';
				el.iframe.style.display = '';
			});
		}
		
		setTimeout(setEditor, 0);
	};
});