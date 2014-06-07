// ==UserScript==
// @name          GM-Trans
// @author        Parashuram
// @namespace     http://gmtrans.parash.says.it
// @description   Allows transliteration of your script to an Indian Language
// @include		  *

// ==/UserScript==


/**
 * A generic Logger utility. Writes to a DIV that is created, 
 * or to GM_log / FireBug Console
 */
var Logger = 
{
	DEBUG : 3,
	INFO  : 2,
	ERROR : 1,
	NONE  : 0,

	logLevel : 3,
	logOnFirebug : true,
	loggerDiv : null,
	className : null,
	
	/**
	 * Used to initialise the Logger Dialog
	 */
	init : function(className)
	{
		if (typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.clear) != "undefined")
		{
			unsafeWindow.console.clear();
		}
		Logger.console = unsafeWindow.console;
		Logger.className = className;
	},
	
	/**
	 * Shows a message to the user.
	 */
	log : function(message,level)
	{
		if (typeof(level) == "undefined")
		{
			level = Logger.DEBUG;
		}

		message = "[" + Logger.className + "] " + level  + " : " + message;
		// write the debug message to the unsafeWindow.console
		if (Logger.logLevel >= level)
		{
			if (typeof(unsafeWindow.console) != "undefined" && Logger.logOnFirebug == true)
			{
				Logger.console.log(message)	
			}
			if (typeof(GM_log) != "undefined")
			{
				GM_log(message);
			}
		}
	}
}
Logger.init();
/**
 * Provides a drag and drop utility
 */

var DragUtil = 
{
	elemTable : new Object(),
	/**
	 * Used by the external functions,
	 */
	setAsDraggable : function(elem, handle)
	{
		Logger.log("Setting " + elem + " as draggable with handle " + handle);		
		if (typeof(handle) == "undefined")
		{
			handle = elem;
		}
		elem = document.getElementById(elem);
		handle = document.getElementById(handle);

		handle = handle.wrappedJSObject || handle;
		elem   = elem.wrappedJSObject || elem;
		handle.addEventListener("mousedown", DragUtil.startDrag ,true);
		DragUtil.elemTable[handle] = elem;
		handle.style.cursor = "move";
	},

	/**
	 * Marks the starting of the dragging
	 */
	startDrag : function(e)
	{
		var elem = e.target;
		elem = elem.wrappedJSObject || elem;
		DragUtil.elementDragged = DragUtil.elemTable[elem];
		Logger.log("Starting drag of " + DragUtil.elementDragged);
		if (typeof(DragUtil.elementDragged) != "undefined")
		{
			window.addEventListener("mousemove",DragUtil.doDrag,false);
			window.addEventListener("mouseup",DragUtil.stopDrag,false);
			DragUtil.offsetLeft = e.clientX - parseInt("0" + DragUtil.elementDragged.style.left,10);
			DragUtil.offsetTop  = e.clientY - parseInt("0" + DragUtil.elementDragged.style.top,10);
		}
	},
	
	/**
	 * Marks the end of dragging
	 */
	stopDrag : function(e)
	{
		//Logger.log("Stopping drag of " + DragUtil.elementDragged);
		window.removeEventListener("mousemove",DragUtil.doDrag,false);
		window.removeEventListener("mouseup",DragUtil.stopDrag,false);
		DragUtil.elementDragged = null;
	},
	
	/**
	 * Actually moving the mouse
	 */
	doDrag : function(e)
	{
		//Logger.log("-----------------" + e.clientX + " - "  +  DragUtil.offsetTop);
		DragUtil.elementDragged.style.left = (e.clientX - DragUtil.offsetLeft)  + "px";
		DragUtil.elementDragged.style.top = (e.clientY - DragUtil.offsetTop) + "px";
	},
}
/**
 * This class is responsible for handling the configuration
 * of the transliteration langauge etc.
 */
var ConfigManager = 
{
}
/**
 * This class is responsible for starting the quilpad on text fields
 * Also starts the transliteration part
 */
var FormHandler = 
{
	
	TEXT_ID : "_text",
	
	quillBox 	: null,
	
	/**
	 * Starts the capturing of the elements and initialises other variables
	 */
	init : function()
	{
		Logger.log("Starting Quiller", Logger.INFO);
		document.addEventListener("dblclick", FormHandler.startQuill, true);
	},
	
	/**
	 * Starts the quillpad transliteration on the specified filed
	 */
	startQuill : function(mouseEvent)
	{
		var elem = mouseEvent.target;
		elem = elem.wrappedJSObject || elem;
		unsafeWindow.axe = elem;
		if (FormHandler.isTextElement(elem) && Transformer.isActive() == false)
		{		
			Logger.log("Activating Quill on "  + elem, Logger.INFO);
			FormHandler.showQuilBox();
			Transformer.init(elem, FormHandler.quillBox);
		}
	},
	
	/**
	 * Returns whether an element can act for input text or not
	 */
	isTextElement : function(elem)
	{
		if (typeof(elem.nodeName) != "undefined" && (elem.nodeName.toUpperCase() == "INPUT" || elem.nodeName.toUpperCase() == "TEXTAREA"))
		{
			return true;
		}
		else 
		{
			return false;
		}
	},
	
	/**
	 * pops up the quil box where the text is to be typed
	 */
	showQuilBox : function()
	{
		if (FormHandler.quillBox == null)
		{
			// creating a new quill box
			Logger.log("Creating a new quil box");
			var newDiv = document.createElement("DIV");
			newDiv.id = "_gmscript_quill_box";
			newDiv.naem = newDiv.id;
			newDiv.style.position = 'absolute';
			newDiv.style.backgroundColor = "#EFE8DD";
			newDiv.style.border = "SOLID #CFB997 3px";
			newDiv.style.width = "265px";
			newDiv.style.padding = "5px";
			newDiv.style.height = "75px";
			newDiv.style.zIndex = 999999;

			newDiv.style.top = (window.innerHeight - parseInt(newDiv.style.height,10) - 20) + "px";
			newDiv.style.left = (window.innerWidth - parseInt(newDiv.style.width,10) -20) + "px";
			
			newDiv.innerHTML = '' +
					"			<form>" +
					"				<textarea id = '" + newDiv.id+ FormHandler.TEXT_ID + "' cols = '30' rows = '3'></textarea>" +
					"			</form>";
					
			
			document.body.appendChild(newDiv);
			
			FormHandler.quillBox = document.getElementById(newDiv.id);
			DragUtil.setAsDraggable(newDiv.id);
		}
		
		// showing the DIv
		FormHandler.quillBox.style.display = "";
	}
	
}

FormHandler.init();
/**
 * Talks to the quilpad backend. 
 */
var Transformer = 
{
		KEY_ESC	: 27,

		TRANSFORMER_URL : "http://quillpad.in/quillpad_backend/processWordJSON?",
//		TRANSFORMER_URL : "quil.jsp?",

		TRANSLATION_DELAY : 1000,
		WORD_SEPARATOR : " ",

		timerHandle	: null,
		translatedText : "",
		oldSourceText  : "",
		language : 'hindi',

		source : null,
		sourceTextArea : null,
		target : null,

		wordStart : 0,
		wordEnd   : 0,
		
		init : function(target, source)
		{
			Logger.log("Starting Quil with "+ target + " from " + source);
			Transformer.target = target;
			Transformer.source = source;
			Transformer.sourceTextArea = document.getElementById(source.id + FormHandler.TEXT_ID);
			Transformer.sourceTextArea = Transformer.sourceTextArea.wrappedJSObject || Transformer.sourceTextArea;

			Transformer.target.oldBackGround = target.style.backgroundColor;
			Transformer.target.style.backgroundColor = "#EFE8DD";
			Transformer.target.value = "";
			Transformer.target.oldCursor = target.style.cursor;
			Transformer.target.style.cursor = "not-allowed";
			
			Transformer.sourceTextArea.value = "";
			Transformer.sourceTextArea.focus();
			Transformer.sourceTextArea.addEventListener("keypress", Transformer.handleSourceKeyPress, true);
			//Transformer.sourceTextArea.addEventListener("blur", Transformer.quitTransform, true);
			
			Transformer.timerHandle =  window.setInterval(Transformer.transformTimer, Transformer.TRANSLATION_DELAY);
		},
		/**
		 * Stops the transformation of the text
		 * and hides the DIV
		 */
		quitTransform : function()
		{
			window.clearInterval(Transformer.timerHandle);
			Transformer.sourceTextArea.removeEventListener("keypress", Transformer.handleSourceKeyPress, true);
			Transformer.source.style.display = "none";

			Transformer.target.style.backgroundColor = Transformer.target.oldBackGround;
			Transformer.target.style.cursor = Transformer.target.oldCursor;
			Transformer.target.focus();

			Transformer.source  = null;
			Transformer.target = null;
			Transformer.sourceTextArea = null;
		},
		
		/**
		 * Handles the key press for Source Text Box
		 */
		handleSourceKeyPress : function(e)
		{
			if (e.keyCode ==  Transformer.KEY_ESC)
			{
				Transformer.quitTransform();
			}
		},
		
		/**
		 * Checks the data on the source and decides whether or not to make the server call
		 */
		transformTimer : function()
		{
			var newText = Transformer.sourceTextArea.value;
			var oldText = Transformer.translatedText;
	
			if (newText == Transformer.translatedText || Transformer.translatedText == null)
			{
				return;
			}
			Transformer.translatedText = null;
			Transformer.oldSourceText = Transformer.sourceTextArea.value;
			// locating the change since the previous transliteration
			
			var startIndex = -1; // to allow the initial character to be picked up
			Transformer.wordStart = 0;
			for (var i = 0, j = 0;newText.charAt(i) == oldText.charAt(j) && i < newText.length && j < oldText.length;i++, j++)
			{
				// setting this space as the start, as the text may be different after this !!
				if (newText.charAt(i) == Transformer.WORD_SEPARATOR)
				{
					startIndex = i;
					Transformer.wordStart++;
				}
			}

			// reaching to the end of the diff
			var endIndex = newText.length;
			Transformer.wordEnd = 0;
			for (var i = newText.length, j = oldText.length; newText.charAt(i) == oldText.charAt(j) && i >= startIndex && j >= 0;i--, j--)
			{
				if (newText.charAt(i) == Transformer.WORD_SEPARATOR)
				{
					endIndex = i;			
					Transformer.wordEnd++;
				}
			}
			
			newText = newText.substring(startIndex+1,endIndex  + 1);
			Transformer.doRequest(newText);
		},
		
		/**
		 * Makes the quill request
		 */
		doRequest : function(word)
		{
			var urlString = Transformer.TRANSFORMER_URL + 
						"&lang=" + Transformer.language + 
						"&rand=" + Math.random() +
						"&inString=" + escape(word);
							
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: urlString,
			    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/atom+xml,application/xml,text/xml',},
			    onload: Transformer.responseHandler
			});
			
			// indicating Loading
			Transformer.target.style.backgroundImage = "url(http://www.andrewdavidson.com/articles/spinning-wait-icons/wait30trans.gif)";
			Transformer.target.style.backgroundPosition = "50%";
			Transformer.target.style.backgroundRepeat = "no-repeat";
		},
		
		/**
		 * Gets the quill response
		 */
		responseHandler : function(o)
		{
			var transObject = eval("(" + o.responseText  + ")");
			if (Transformer.target != null)
			{
				Transformer.target.style.backgroundImage = "url()";
			}
			Logger.log("Got translation for " + transObject.inString + " = " + transObject.itrans + " :: " + Transformer.wordStart + " - " + Transformer.wordEnd);
			
			var newText = transObject.itrans;
			var oldText = Transformer.target.value;
			
			// Locating the place where we must place this new Text
			var startIndex = 0;
			for (startIndex = 0; Transformer.wordStart > 0 && startIndex < oldText.length ; startIndex++)
			{
				if (oldText.charAt(startIndex) == Transformer.WORD_SEPARATOR)
				{
					Transformer.wordStart--;
				}
			}
			var endIndex = 0;
			for (endIndex = oldText.length ; Transformer.wordEnd > 0 && endIndex >= 0; endIndex--)
			{
				if (oldText.charAt(endIndex) == Transformer.WORD_SEPARATOR)
				{
					Transformer.wordEnd--;
				}
			}			
			
			//Logger.log(oldText.substring(0,startIndex) +","+ newText +","+ oldText.substring(endIndex + 2, oldText.length));
			Transformer.target.value = oldText.substring(0,startIndex) + newText + oldText.substring(endIndex + 2, oldText.length);
			Transformer.translatedText = Transformer.oldSourceText;
		},
		
		
		/**
		 * Returns if a the transformer is already active for a fof a field
		 */
		isActive : function()
		{
			if (Transformer.target == null)
			{
				return false
			}
			else 
			{
				return true;
			}
		}
}
