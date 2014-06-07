// ==UserScript==
// @name       Expand Apex Editor
// @namespace  http://flipxfx.com
// @version    2.0
// @description  Expands the Apex editor to make it easier to program within the browser.
// @match      https://*.salesforce.com/setup/build/editApexClass.apexp*
// @match      https://*.salesforce.com/*/e*viewApexClass.apexp*
// @include      https://*.salesforce.com/setup/build/editApexClass.apexp*
// @include      https://*.salesforce.com/*/e*viewApexClass.apexp*
// @copyright  2013+, flipxfx
// ==/UserScript==
setTimeout(function () {
	//Position error messages
	var style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = '.pbBody div div { position: fixed; top: 90px; z-index: 100; width: 100%; font-size: 120%; padding: 5px;}';
	document.getElementsByTagName('head')[0].appendChild(style);

	//Editor Element
	var editor = document.getElementById("frame_ApexClassEditPage:theTemplate:theForm:thePageBlock:editor:codeeditor:buffer");

	//Hide sidebar
	document.getElementsByClassName("oLeft")[0].style.display = "none";

	//Set default height
	var defaultEditorHeight = "3000";
		var editorHeight = document.getElementById('frame_ApexClassEditPage:theTemplate:theForm:thePageBlock:editor:codeeditor:buffer').contentWindow.document.getElementById('container').style.height;
	if (editorHeight != null) defaultEditorHeight = (Math.round((parseInt(editorHeight) + 500) * (1 / 100)) * 100).toString();
	editor.style.height = defaultEditorHeight + "px";

	//Set default width
	var defaultEditorWidth = Math.round(editor.contentDocument.body.offsetWidth * (1 / 100)) * 100;

	//Input to update height
	document.getElementsByClassName('pbHeader')[0].innerHTML += "<br/><label style='color: rgb(74, 74, 86); font-weight: bold;'>Editor Height:&nbsp;&nbsp;&nbsp;</label><input type='number' value='" + defaultEditorHeight + "' min='500' step='100' max='99999' onchange='javascript:var editor=document.getElementById(&#39;frame_ApexClassEditPage:theTemplate:theForm:thePageBlock:editor:codeeditor:buffer&#39;);if(parseInt(this.value) > 500)editor.style.height = this.value + &#39;px&#39;;'/>";

	//Input to update width
	document.getElementsByClassName('pbHeader')[0].innerHTML += "<label style='color: rgb(74, 74, 86); font-weight: bold;'>&nbsp;&nbsp;&nbsp;&nbsp;Width:&nbsp;&nbsp;&nbsp;</label><input type='number' value='" + defaultEditorWidth + "' min='500' step='100' max='99999' onchange='javascript:var editor=document.getElementById(&#39;frame_ApexClassEditPage:theTemplate:theForm:thePageBlock:editor:codeeditor:buffer&#39;);if(parseInt(this.value) > 500)editor.style.width = this.value + &#39;px&#39;;'/>";
}, 500);
