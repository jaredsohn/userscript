// ==UserScript==
// @name        Better Shabdkosh
// @namespace   Pi
// @include     http://www.shabdkosh.com/forums/*
// @version     3.1
// ==/UserScript==

injection = function()
{
    var url = new String(window.location.href).toLowerCase();
    var transliterateKey = 71; //G
    var boldKey = 66; //B
    var italicsKey = 73; //I
    var quoteKey = 81; //Q
    var strikeKey = 75; //K (remember, it's not S)
    var isTransliterationLoaded = false;
    var googleTransliterationControl = null;
   
    var mapKeyHandlers = [
							[boldKey, ["b"]], 
							[italicsKey, ["i"]],
							[quoteKey, ["quote"]],
							[strikeKey, ["strike"]]
						];

    function onAPILoaded()
    {
        var options = {
            sourceLanguage:
                google.elements.transliteration.LanguageCode.ENGLISH,
            destinationLanguage:
                [google.elements.transliteration.LanguageCode.HINDI],
            // shortcutKey: 'ctrl+g',
            transliterationEnabled: false
        };

        // Create an instance on TransliterationControl with the required options.
        googleTransliterationControl =  new google.elements.transliteration.TransliterationControl(options);

        // Enable transliteration in the textbox with id
        // 'transliterateTextarea'.
        var textAreas = document.getElementsByTagName("textarea");
        var i;
        for(i = 0; i < textAreas.length; ++i)
        {
            if(typeof textAreas[i].id == "undefined" || textAreas[i].id == "")
                textAreas[i].id = 'textArea' + i;
            googleTransliterationControl.makeTransliteratable([textAreas[i].id]);
        }
    }
	
	
	
    function handleKeyPress(e)
    {       
        var shiftPressed = e.shiftKey;
        var altPressed = e.altKey;
        var ctrlPressed = e.ctrlKey;

        //log((shiftPressed ? " shift ":"") + (ctrlPressed ? " control" : "") + (altPressed ? " alt " : "") + " Key " + e.keyCode + " pressed.");
       
        var doCancel = false;
        if(ctrlPressed)
        {
            if(e.keyCode == transliterateKey)
            {
                ToggleTransliteration();
                doCancel = true;
            }
            else if(e.target.tagName.toLowerCase() == 'textarea')
            {
                var txt = e.target;
                var val = txt.value;
                var newText = "";
				
				var i = 0;
				for(;i < mapKeyHandlers.length; ++i)
				{
					if(e.keyCode == mapKeyHandlers[i][0])
						newText = '['+ mapKeyHandlers[i][1] +']' + val.substring(txt.selectionStart, txt.selectionEnd) + '[/' + mapKeyHandlers[i][1] +']';
                }
				 
                if(newText.length > 0)
                {
					var pos = txt.selectionStart + newText.length;
                    txt.value = val.substring(0,txt.selectionStart) + newText + val.substring(txt.selectionEnd,val.length);
					
					e.target.setSelectionRange(pos, pos);
                    doCancel = true;
                }
            }
			
            //Tell the browser these keys are already handled. 
			if(doCancel)
            {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    }
	
    //Add key press handlers to make text formatting a bit more convenient.
    window.addEventListener('keydown', handleKeyPress, false);
	
	function LoadScript(source, isAddedToBodyNotHead, loadEventIfAny)
	{
		var scriptNode = document.createElement('script');
		var parentElement = isAddedToBodyNotHead ? "body" : "head";
		scriptNode.setAttribute("type","text/javascript");
		scriptNode.setAttribute("src", source);
		if(loadEventIfAny)
			scriptNode.addEventListener('load', loadEventIfAny, false);
		if (typeof scriptNode != "undefined")
			document.getElementsByTagName(parentElement)[0].appendChild(scriptNode);
	}
	
	var APPEND_MODE_NONE = 0;
	var APPEND_MODE_END = 1;
	var APPEND_MODE_BEGINNING = 2;
	function create(elementType, attributes, parent, appendMode)
	{
		var newEl = document.createElement(elementType);
		for(i in attributes)
		{
			if(attributes[i][0] == 'innerHTML')
				newEl.innerHTML = attributes[i][1];
			else if(attributes[i][0] == 'click')
				newEl.addEventListener('click', attributes[i][1], false);
			else
				newEl.setAttribute(attributes[i][0], attributes[i][1]);
		}
		if(!parent || appendMode == APPEND_MODE_NONE)
			return newEl;
		if(!appendMode || appendMode == APPEND_MODE_END)
			parent.appendChild(newEl);
		else if(appendMode == APPEND_MODE_BEGINNING)
			parent.insertBefore(newEl, parent.firstChild);
		
		return newEl;
	}
	
	function getChildrenByXPath(currentNode, xpath, CallBack, evaluationDoc, secondArgument, returnOnlyOne)
	{
		var returnArray = new Array();
		var doc = evaluationDoc ? evaluationDoc : document;
		var nodesSnapshot = doc.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		if(returnOnlyOne)
		{
			if(nodesSnapshot && nodesSnapshot.snapshotLength > 0)
				return nodesSnapshot.snapshotItem(0);
			else
				return null;
		}
		
		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
			returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i), (secondArgument ? secondArgument : i)) : nodesSnapshot.snapshotItem(i));

		return returnArray;
	}	
	
	function LoadTransliteration()
	{
		if(typeof google != "undefined")
		{	
			google.load("elements", "1", 
			{
				// packages: "inputtools",
				packages: "transliteration",
				callback: onAPILoaded
			});
			//google.setOnLoadCallback(onAPILoaded);
		}
	}
	
	function ToggleTransliteration()
	{
		if(googleTransliterationControl)
			googleTransliterationControl.toggleTransliteration();
		var link = document.getElementById('idLinkTransliterateButton');
		if(!link)
			return;
		if(link.innerHTML == 'Hindi')
			link.innerHTML = 'English';
		else
			link.innerHTML = 'Hindi';
		var tts = document.getElementsByTagName('textarea');
		if(tts && tts.length > 0)
			tts[0].focus();
	}
	
	document.ToggleTransliteration = ToggleTransliteration;
	
	LoadScript("http://www.google.com/jsapi", false, LoadTransliteration);
	
	//Create a button to let the user toggle transliteration through the UI. 
	create('a', [['id','idLinkTransliterateButton'],['innerHTML','Hindi'],['title','Enable/Disable Typing in Hindi'],['href','javascript:document.ToggleTransliteration();']], create('div', [['id','divTransliterateButton'],['class','htmlButtonInner htmlButtonOff']],create('td',[['id','idTDTransliterateButton'],['class','htmlButtonOuter']], getChildrenByXPath(document, "//div[@class='itempadbig']/table/tbody/tr", null, null, null, true))));
	
};

//Inject the script into the page. 
document.body.appendChild(document.createElement("script")).innerHTML = "("+injection+")()";
