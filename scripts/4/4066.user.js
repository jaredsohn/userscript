// ==UserScript==
// @author         Phillip Berndt
// @name           TabArea
// @namespace      http://www.pberndt.com/
// @description    Add tabstop, autoindention, resizing and template capabilities to textAreas
// @include        *
// ==/UserScript==

TabArea = {
	load: function()
	{
		// Create menu item for template editing
		TabArea.loadTemplates();
		GM_registerMenuCommand("Edit textarea templates", TabArea.showTemplateEditor);

		// Bind forms for template usage
		if(TabArea.templates)
		{
			forms = document.getElementsByTagName("form");
			for(n=0; n<forms.length; n++)
			{
				TabArea.enhanceForm(forms[n]);
			}
		}
		
		// document.evaluate does not work well with textareas for text/xml content
		textAreas = document.getElementsByTagName("textarea");
		for(n=0; n<textAreas.length; n++)
		{
			TabArea.enhanceTextArea(textAreas[n]);
		}
	},

	loadTemplates: function()
	{
		templates = GM_getValue("textAreaTemplates", false);
		TabArea.templates = new Object();
		if(templates)
		{
			for(templateString in templates.split("|"))
			{
				template = templates.split("|")[templateString].split(";")
				if(template.length < 2)
					continue;
				TabArea.templates[template[0]] = template[1];
			}
		}
	},

	saveTemplates: function()
	{
		templateString = "";
		for(template in TabArea.templates)
			templateString += template + ";" + TabArea.templates[template] + "|";
		GM_setValue("textAreaTemplates", templateString);
	},

	showTemplateEditor: function()
	{
		editorWindow = window.open("about:blank", "gmTextareaTemplateEditor", "dependent=yes,height=300,width=370,resizable=no,menubar=no,status=no,toolbar=no");
		// Create a basic document
		editorWindow.document.open();
		editorWindow.document.write("<title>Textarea template editor</title><style type='text/css'>html,body{padding: 2px;margin:0;font-family:sans-serif;font-size:11px;}input[type=text]{width:175px;border:1px solid #000;padding:1px;}</style><body><h1>Template editor</h1><table id='tpl'><tr><th>Tag</th><th>Value</th></tr></table><button id='add'>Add new</button><button id='save'>Save</button><p>Remove tag to remove an entry. Characters ; and | are not allowed. You <em>may</em> use JS in values by prepending 'js:' to the value.</p><p>For using templates, put <strong>{{tag}}</strong> into any textarea and submit the form.</body>");
		editorWindow.document.close();
		table = editorWindow.document.getElementById("tpl");

		// Create an editor form
		for(template in TabArea.templates)
		{
			tr = editorWindow.document.createElement("tr");
			td = editorWindow.document.createElement("td");
			te = editorWindow.document.createElement("input");
			te.setAttribute("type", "text");
			te.value = template;
			td.appendChild(te);
			tr.appendChild(td);
			td = editorWindow.document.createElement("td");
			te = editorWindow.document.createElement("input");
			te.setAttribute("type", "text");
			te.value = TabArea.templates[template];
			td.appendChild(te);
			tr.appendChild(td);
			table.appendChild(tr);
		}
		
		// Generate button functions
		editorWindow.document.getElementById("add").addEventListener("click",
			function()
			{
				tr = editorWindow.document.createElement("tr");
				td = editorWindow.document.createElement("td");
				te = editorWindow.document.createElement("input");
				te.setAttribute("type", "text");
				td.appendChild(te);
				tr.appendChild(td);
				tr.appendChild(td.cloneNode(true));
				table.appendChild(tr);
			textArea.addEventListener("keydown", TabArea.keyPressCallback, false);
			}, false);
		editorWindow.document.getElementById("save").addEventListener("click",
			function()
			{
				TabArea.templates = new Object();
				inputs = editorWindow.document.getElementsByTagName("input");
				for(i=0; i<inputs.length; i+=2)
				{
					if(inputs[i].value.match(/(\||;)/) || inputs[i+1].value.match(/(\||;)/))
					{
						alert("Illegal characters in '" + inputs[i].value + "'. Skipping.");
						continue;
					}
					if(inputs[i].value == "")
						continue;
					
					TabArea.templates[inputs[i].value] = inputs[i+1].value;
				}
				TabArea.saveTemplates();
				alert("Templates for current page saved");
			}, false);
	},

	enhanceForm: function(form)
	{
		form.textAreas = form.getElementsByTagName("textarea");
		form.addEventListener("submit",
			function()
			{
				for(template in TabArea.templates)
				{
					value = TabArea.templates[template];
					search = new RegExp("{{" + template.replace(/(\W)/g, "\\$1") + "}}", "gi");
					if(value.substring(0, 3) == "js:")
						value = eval(value.substring(3));
					else
						value = eval('"' + value.replace(/"/g, "\\\"") + '"');
					for(textarea=0; textarea<form.textAreas.length; textarea++)
						form.textAreas[textarea].value = form.textAreas[textarea].value.replace(search, value);
				}
			}, false);

	},
	
	enhanceTextArea: function(textArea)
	{
		textArea.addEventListener("dblclick", TabArea.sizeChange, false);
		textArea.addEventListener("keydown", TabArea.keyPressCallback, false);
		textArea.addEventListener("blur", TabArea.blurCallback, false);
	},
	
	blurCallback: function(e)
	{
		element = e.target;
		if(!element.preventBlur)
			return;
		element.preventBlur = null;
		
		currentArea = element;
		window.setTimeout(function()
			{
				currentArea.focus();
			}, 1);
		return false;
	},

	sizeChange: function(e)
	{
		if(!e.ctrlKey) return;
		element = e.target;
		if(typeof element.resized == "undefined" || element.resized == null)
		{
			element.resized = new Array(element.style.width, element.style.height, element.style.fontSize);
			element.style.height	= "500px";
			element.style.width 	= "800px";
			element.style.fontSize 	= "9px";
		}
		else
		{
			element.style.width    = element.resized[0];
			element.style.height   = element.resized[1];
			element.style.fontSize = element.resized[2];
			element.resized = null;
		}
	},
	
	insertText: function(element, insertText)
	{
		if(element.selectionStart != null)
		{
			var savedScrollTop = element.scrollTop;
			var begin = element.selectionStart;
			var end = element.selectionEnd;
			if(end > begin + 1)
				element.value = element.value.substr(0, begin) + insertText + element.value.substr(end);
			else
				element.value = element.value.substr(0, begin) + insertText + element.value.substr(begin);
	
			element.selectionStart  = begin + insertText.length;
			element.selectionEnd	= begin + insertText.length;
			element.scrollTop = savedScrollTop;
		}
		else(element.value += insertText);
		
		element.focus();
	},
		
	keyPressCallback: function(e)
	{
		element = e.target;
		if(element.selectionStart == null)
			return;
		
		switch(e.keyCode)
		{
			// Tabstopp
			case 9:
				element.preventBlur = true;
				
				if(element.selectionEnd != element.selectionStart)
				{			
					selectionText = element.value.substring(element.selectionStart, element.selectionEnd);
					if(e.shiftKey)
						selectionText = selectionText.replace(/\n\t/g, "\n").replace(/^\t/, "");
					else
						selectionText = "\t" + selectionText.split("\n").join("\n\t");
					begin = element.selectionStart;
					TabArea.insertText(element, selectionText);
					element.selectionStart = begin;
				}
				else
					TabArea.insertText(element, String.fromCharCode(9));
				break;
		
			// Enter
			case 13:
				currPos = element.selectionStart;
				lastLine = "";
				for(i=currPos-1;i>=0;i--)
				{
					if(e.target.value.substring(i, i + 1) == '\n') break;
				}
				lastLine = e.target.value.substring(i + 1, currPos);
				whiteSpace = "";
				for(i=0;i<lastLine.length;i++)
					if(lastLine.substring(i, i + 1) == '\t') whiteSpace += "\t";
					else if(lastLine.substring(i, i + 1) == ' ') whiteSpace += " ";
					else break;
				
				currentArea = e.target;
				window.setTimeout(function()
				{
					TabArea.insertText(currentArea, whiteSpace);
				}, 1);
				break;
		}
		
		return true;
	}
 };
 TabArea.load();


