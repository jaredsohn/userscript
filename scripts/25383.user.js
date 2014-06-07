//
// ==UserScript==
// @name          ScrabuCheck
// @namespace     http://codebox.no-ip.net/ScrabuCheck
// @description   Adds a floating dictionary lookup box for the game of Lexulous
// @include       http://apps.facebook.com/lexulous/*
// @include       http://www.lexulous.com/*
// ==/UserScript==

/*
A Greasemonkey script that adds a handy floating dictionary-lookup box onto the Lexulous web page.

ScrabuCheck allows you to quickly check whether a word is allowable in a game of Scrabble/Lexulous,
just type one or more words in the input box and click Enter. The validity of the words are checked 
online against the selected dictionary (either TWL or SOWPODS) and the results are displayed in a list
below the box.

To check multiple words at once just type them all in the box separated by spaces. Select the 
dictionary you wish to use by clicking either the 'TWL' or 'SWP' links, and to close the lookup box 
click the 'X' button. The results of previous lookups remain on the screen for reference, to remove 
a result from the list just click it with the mouse. The box can be dragged around the screen and left
in a convenient place, and this placement will be remembered the next time you use it.
*/

if (CODEBOX===undefined){
    var CODEBOX={};
}

CODEBOX.scrab = {
    'dom' : {},
    'dict' : {
        'key'     : 'dict',
        'default' : 'twl',
        'get' : function(){
            return GM_getValue(CODEBOX.scrab.dict.key, CODEBOX.scrab.dict.default);
        },
        'set' : function(val){
            GM_setValue(CODEBOX.scrab.dict.key, val);
        }   
    },
    'location' : {
    	'defaultTop'  : '0.2em',
    	'defaultLeft' : '0.2em',
    	'topKey'      : 'top',
    	'leftKey'     : 'left',
    	'getTop' : function(){
    		return GM_getValue(CODEBOX.scrab.location.topKey, CODEBOX.scrab.location.defaultTop);
    	},
    	'getLeft' : function(){
    		return GM_getValue(CODEBOX.scrab.location.leftKey, CODEBOX.scrab.location.defaultLeft);
    	},
    	'setTop' : function(topValue){
    		GM_setValue(CODEBOX.scrab.location.topKey, topValue);
    	},
    	'setLeft' : function(leftValue){
    		GM_setValue(CODEBOX.scrab.location.leftKey, leftValue);
    	},
    },
    'setUp' : function(){
     // Draw the outer box
        var outerDiv = document.createElement('div');
        outerDiv.id                    = 'outerDiv';
        outerDiv.style.color           = 'gray';
        outerDiv.style.border          = '1px solid gray';
        outerDiv.style.backgroundColor = '#EEEEEE'; 
        outerDiv.style.fontFamily      = 'sans-serif';
        outerDiv.style.fontSize        = '1em';
        outerDiv.style.position        = 'fixed';
        outerDiv.style.top             = CODEBOX.scrab.location.getTop();
        outerDiv.style.left            = CODEBOX.scrab.location.getLeft();
        outerDiv.style.zIndex          = '500';
        outerDiv.style.padding         = '0.2em';
        outerDiv.style.cursor          = 'move';
        outerDiv.addEventListener('mousedown', function(event){
				var dragObj = {}
				
				dragObj.elNode = event.target;
			
				if (dragObj.elNode.id != 'outerDiv'){
					return;
				}
				dragObj.cursorStartX = event.clientX + window.scrollX;
				dragObj.cursorStartY = event.clientY + window.scrollY;
			
				dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
				dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
			
				if (isNaN(dragObj.elStartLeft)){
					dragObj.elStartLeft = 0;
				}
				if (isNaN(dragObj.elStartTop)){
					dragObj.elStartTop  = 0; 
				}
			
				dragGoListener = function(event){
			        var x, y;
			        x = event.clientX + window.scrollX;
			        y = event.clientY + window.scrollY;        
			    
			        dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
			        dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";    
			        
			        event.preventDefault();
			    };
				dragStopListener = function(event){
				        document.removeEventListener("mousemove", dragGoListener, true);
				        document.removeEventListener("mouseup",   dragStopListener, true);
				        CODEBOX.scrab.location.setTop(outerDiv.style.top);
				        CODEBOX.scrab.location.setLeft(outerDiv.style.left);
			    };
			
				document.addEventListener("mousemove", dragGoListener,   true);
				document.addEventListener("mouseup",   dragStopListener, true);
			
				event.preventDefault();
			}, true);

     // Draw the text box
        var inputBox = document.createElement('input');
        inputBox.type           = 'text';
        inputBox.style.cssFloat = 'left';
        inputBox.title          = 'Type words here and press \'Enter\'. To check multiple words, separate with spaces';
        inputBox.addEventListener('keyup', 
                function(e){
                    if (e.keyCode==13){
                     // Words separated by spaces are sent separately
                        var words = inputBox.value.split(' ');
                        for(var i=0; i<words.length; i++){
                            CODEBOX.scrab.checkWord(words[i]);
                        }
                        inputBox.value = '';
                        inputBox.focus();
                    }
                }, 
            false);


     // Draw the 'Dictionary Links' box
        var dictLinkBox= document.createElement('div');
        dictLinkBox.style.color           = 'gray';
        dictLinkBox.style.cssFloat        = 'left';
        dictLinkBox.style.backgroundColor = '#EEEEEE'; 
        dictLinkBox.style.fontSize        = '0.5em';
        
     // Draw the 'TWL' link
        var linkTwl = document.createElement('span');
        linkTwl.innerHTML = 'TWL';
        linkTwl.addEventListener('click',
            function(e){
                CODEBOX.scrab.dict.set('twl');
                refreshLinkStyles();
            }, false);
            
        var br = document.createElement('br');
        
     // Draw the 'SWP' link
        var linkSwp = document.createElement('span');
        linkSwp.innerHTML = 'SWP';
        linkSwp.addEventListener('click',
            function(e){
                CODEBOX.scrab.dict.set('sow');
                refreshLinkStyles();
            }, false);
            
     // Add the links into the box
        dictLinkBox.appendChild(linkTwl);
        dictLinkBox.appendChild(br);
        dictLinkBox.appendChild(linkSwp);
        
        
     // Draw the 'Close' button
        var closeSpan = document.createElement('div');
        closeSpan.style.color           = 'gray';
        closeSpan.style.cssFloat        = 'left';
        closeSpan.style.border          = '1px solid gray';
        closeSpan.style.backgroundColor = '#EEEEEE'; 
        closeSpan.style.fontFamily      = 'sans-serif';
        closeSpan.style.zIndex          = '5';
        closeSpan.style.paddingLeft     = '0.2em';
        closeSpan.style.paddingRight    = '0.2em';
        closeSpan.style.paddingTop      = '0em';
        closeSpan.style.paddingBottom   = '0em';
        closeSpan.style.marginLeft      = '0.2em';
        closeSpan.style.height          = '1.1em';
        closeSpan.style.lineHeight      = '1.0em';
        closeSpan.style.fontSize        = '0.7em';
        closeSpan.style.cursor          = 'pointer';
        closeSpan.title                 = 'Close';
        closeSpan.innerHTML             = 'x';
        closeSpan.addEventListener('click',
            function(e){
                CODEBOX.scrab.removeBox();
            }, false);
        
        
     // Build up the DOM tree using the elements we just created
        outerDiv.appendChild(inputBox);
        outerDiv.appendChild(dictLinkBox);
        outerDiv.appendChild(closeSpan);
        window.document.documentElement.appendChild(outerDiv);
        
     // Save references to the DOM elements we will need to refer to elsewhere
        CODEBOX.scrab.dom.div = outerDiv;
        CODEBOX.scrab.dom.txt = inputBox;
        
        function refreshLinkStyles(){
         // Reads the current dictionary and adjusts the links appropriately
            var isTwl = (CODEBOX.scrab.dict.get() === 'twl');
            linkTwl.style.color  =  isTwl ? '#444444' : '#BBBBBB';
            linkSwp.style.color  = !isTwl ? '#444444' : '#BBBBBB';
            linkTwl.style.cursor = !isTwl ? 'pointer' : 'default';
            linkSwp.style.cursor =  isTwl ? 'pointer' : 'default';
            linkTwl.title =  isTwl ? '' : 'Use TWL Dictionary';
            linkSwp.title = !isTwl ? '' : 'Use SOWPODS Dictionary';
        }

        refreshLinkStyles();
    },
    'removeBox' : function(){
     // Removes the whole thing from the screen
        window.document.documentElement.removeChild(CODEBOX.scrab.dom.div);
    },
    'processReply' : function(reply){
     // Parses the reply from Lexulous, which is expected in the form: 'err=0&result=BORK is a word'
        var result = {};
        
        var parts = reply.split('&');
        var subParts;
        var subPartName, subPartValue;
        for(var i=0; i<parts.length; i++){
            subParts = parts[i].split('=');
            if (subParts.length==2){
                subPartName  = subParts[0];
                subPartValue = subParts[1];
                result[subPartName] = subPartValue;
            }
        }
        
        return result;  
    },
    'checkWord' : function(word){
     // Draw a box to show the status of the request
        var statusDiv = document.createElement('div');
        statusDiv.style.fontSize    = '0.7em';
        statusDiv.style.border      = '0';
        statusDiv.style.paddingLeft = '0.2em';
        statusDiv.style.paddingTop  = '0.1em';
        statusDiv.style.clear       = 'left';
        statusDiv.style.cssFloat    = 'left';
        statusDiv.style.cursor      = 'pointer';
        statusDiv.title             = 'Click to remove';
        CODEBOX.scrab.dom.div.appendChild(statusDiv);
        
        statusDiv.innerHTML = 'Checking ' + word + '...';
        statusDiv.addEventListener('click',
                function(e){
                    CODEBOX.scrab.dom.div.removeChild(statusDiv);
                }, false);
                
     // Send the request
        GM_xmlhttpRequest(
            {'url'     : 'http://play.paltua.com/lexulous/dictionary_search.php?word=&dic=' + CODEBOX.scrab.dict.get() + '&word=' + word,
             'method'  : 'GET',
             'onload'  : function(reply){
                    var msg;
                    var responseText = reply.responseText;
                    if (responseText){
                        var result = CODEBOX.scrab.processReply(responseText);
                        if (result.err==0){
                            msg = '<spam style="color: green; font-weight: bold; padding-top: 0.2em">' + result.result + '</span>';
                        } else if (result.err==1){
                            msg = '<spam style="color: red; font-weight: bold; padding-top: 0.2em">' + result.result + '</span>';
                        } else {
                            msg = 'Unable to access the Lexulous website';
                        }
                    }
                    statusDiv.innerHTML = msg;
                 },
             'onerror' : function(reply){
                    statusDiv.innerHTML = 'ERROR: [' + reply.status + '] ' + reply.statusText
                }
            }
        );
    }
}

CODEBOX.scrab.setUp();
