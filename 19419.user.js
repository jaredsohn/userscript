// ==UserScript==
// @name           AppJet: EditArea
// @namespace      AppJet
// @include        http://appjet.com/*/ide
// ==/UserScript==

var codeWindow = document.getElementById('appjet_code_window');

if (codeWindow) {
	var textareas = codeWindow.getElementsByTagName('textarea');
	var textarea = textareas[0];
	
	if (textarea) {
		textarea.id = 'appjet_code_textarea';
	
		var full = document.createElement('script');
		codeWindow.appendChild(full);
		full.type = "text/javascript";
		full.src = 'http://www.cdolivet.net/editarea/editarea/edit_area/edit_area_full.js';
		
		var transform = document.createElement('script');
		codeWindow.appendChild(transform);
		transform.type = "text/javascript";
		transform.innerHTML = "try { EDITAREA_LOADED; } catch(e) { EDITAREA_LOADED = true; " +
			"editAreaLoader.init({" + 
				"id: 'appjet_code_textarea'," + 
				"start_highlight: true," +
				"allow_resize: 'no'," +
				"allow_toggle: true," +
				"language: 'en'," +
				"syntax: 'php'," + 
				"toolbar: 'save, |, search, go_to_line, |, undo, redo, |, select_font, |, change_smooth_selection, highlight, reset_highlight, |, help'," +
				"save_callback: 'edit_area_save'," +
				"EA_load_callback: 'edit_area_loaded'" +
			"});" +
			
			"function edit_area_loaded(id) {" +
				"var frame = document.getElementById('frame_' + id);" +
				
				"var script = document.createElement('script');" +
				"frame.contentDocument.body.appendChild(script);" + 
				"script.innerHTML = \"document.onkeydown = function(e) {" +
					"if (e.ctrlKey && String.fromCharCode(e.which) == 'S') {" +
						"editArea.execCommand('save');" +
						"return false;" +
					"}" +
				"}\";" +
				
				
			"}" +
			
			"function edit_area_save(id, content) {" +
				"var textarea = document.getElementById('appjet_code_textarea');" +
				"textarea.value = content;" +
				"Appjet.IDE.doSave(true);" +
			"}" +
		"};";
		
		var saveButton = document.getElementById('savebutton');
		saveButton.style.display = "none";
	}
}