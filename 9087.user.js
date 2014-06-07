//
// ==UserScript==
// @name          DOMClipper
// @namespace     http://codebox.no-ip.net/DOMClipper
// @description   Delete unwanted items from web pages with a simple mouse-click.
// @include       *
// ==/UserScript==

if (CODEBOX==undefined){
    var CODEBOX={};
}
CODEBOX.domClipper = {
    name      : 'DOMClipper',
    msgBoxId  : 'CODEBOX.domClipper.msgBox', 
    zoomBoxId : 'CODEBOX.domClipper.zoomBox',
    togBoxTimeout : 1000,
    style   : {
       defHilightColour : '#FFFF99',
        imgHilightBorder : '1px solid red',
        zoomBoxIndent    : '2px',
        zoomBoxBorder    : '1px solid black',
        zoomBoxBackCol   : 'white',
        togBoxTxtCol     : 'green',
        togBoxBorder     : '1px solid green',
        togBoxBackCol    : '#DDFFDD',
        togBoxFont       : 'sans-serif',
        togBoxFontSize   : '0.8em',
        togBoxTop        : '0.5em',
        togBoxLeft       : '0.5em',
        togBoxPadding    : '0.2em'
    },
    keys : {
        undo   : 'z',
        toggle : 'x'
    }
}

CODEBOX.domClipper.msgs = {
    activated   : CODEBOX.domClipper.name + ' has been activated.',
    deactivated : CODEBOX.domClipper.name + ' has been deactivated.',
    menuToggle  : 'Toggle ' + CODEBOX.domClipper.name
}
    
CODEBOX.domClipper.process = function(){
    var elementInFocus  = null;
    var removedElements = [];
    var isActive        = false;
    var isZoomed        = false;
    
    TARGET_ELEMENTS  = ['div', 'table', 'tr', 'td', 'span', 'p', 'img', 'form', 'hr', 'ol', 'ul', 'li', 'object', 'applet', 'map', 'iframe', 'embed'];
    
    SPECIAL_HANDLERS = { 
        img : { 
            mouseover : function(e){
                e.target.style.border = CODEBOX.domClipper.style.imgHilightBorder;
            }, 
            mouseout :  function(e){
                e.target.style.border='';
            } 
        } 
    };
    
    DEFAULT_HANDLERS = { 
        mouseover : function (e){
            highlightElement(e.target);
        }, 
        
        mouseout : function (e){
            unhighlightElement(e.target);
        }, 

        mousedown : function (e){
            if (e.button==0){
                removeElement(e.target);
            } else {
                zoomElement(e.target);
            }
        },
        
        contextmenu : function (e){
            e.stopPropagation();
            return false;
        } 
    };    
    
    function prepareMouseOverHandler(customHandler){
        return function(e){
            if (isActive && ! isZoomed){
                if (elementInFocus){
                    getHandler(elementInFocus, 'mouseout');
                }
                customHandler(e);
                elementInFocus = e.target;                    
                e.stopPropagation();
            }
        };
    }        
    function prepareMouseOutHandler(customHandler){
        return function(e){
            if (isActive && ! isZoomed){
                customHandler(e);
            }
        };
    }
    function prepareMouseDownHandler(customHandler){
        return function(e){
            if (isActive && ! isZoomed){
                customHandler(e);
            }
            e.stopPropagation();
            return false;
        };
    }            
    
    function getHandler(element, event){
        var handler;
        var elementName = element.tagName.toLowerCase();
        if (SPECIAL_HANDLERS[elementName] && SPECIAL_HANDLERS[elementName][event]){
            handler = SPECIAL_HANDLERS[elementName][event];

        } else {
            handler = DEFAULT_HANDLERS[event]
        }
        switch (event){
            case 'mouseover':
                handler = prepareMouseOverHandler(handler);
                break;    
            case 'mouseout':
                handler = prepareMouseOutHandler(handler);
                break;
            case 'mousedown':
                handler = prepareMouseDownHandler(handler);
                break;
        }
        
        return handler;            
    }        
    
    function attachHandlers(element){
        attachHandler(element, 'mouseover');
        attachHandler(element, 'mouseout' );
        attachHandler(element, 'mousedown');
        attachHandler(element, 'contextmenu');
    }
    function attachHandler(element, event){
        var handler = getHandler(element, event);
        if (handler){
            element.addEventListener(event, handler, false);
        }
    }
    
    function removeHandlers(element){
        removeHandler(element, 'mouseover');
        removeHandler(element, 'mouseout' );
        removeHandler(element, 'mousedown');
        removeHandler(element, 'contextmenu');
    }    
    function removeHandler(element, event){
        var handler = getHandler(element, event);
        if (handler){
            element.removeEventListener(event, handler, false);
        }
    }    
    
    function highlightElement(element){
        element.style.backgroundColor = CODEBOX.domClipper.style.defHilightColour;
    }
    function unhighlightElement(element){
        element.style.backgroundColor = '';
    }    
    function removeElement(element){
        element.style.display = 'none';
        removedElements.push(element);
    }
    function restoreElement(element){
        element.style.display = '';
    }

    function zoomElement(element){
        var newDiv = document.createElement('div');
        newDiv.style.position = 'fixed';
        newDiv.style.top    = CODEBOX.domClipper.style.zoomBoxIndent;
        newDiv.style.left   = CODEBOX.domClipper.style.zoomBoxIndent;
        newDiv.style.bottom = CODEBOX.domClipper.style.zoomBoxIndent;
        newDiv.style.right  = CODEBOX.domClipper.style.zoomBoxIndent;
        newDiv.style.border = CODEBOX.domClipper.style.zoomBoxBorder;
        newDiv.style.backgroundColor = CODEBOX.domClipper.style.zoomBoxBackCol;
        newDiv.style.overflow = 'auto';
        newDiv.zindex = '100';
        newDiv.id= CODEBOX.domClipper.zoomDivId;
        
        newDiv.addEventListener('contextmenu', DEFAULT_HANDLERS.contextmenu, false);        
        newDiv.addEventListener('mousedown', unZoomElement, false);                    
        
        window.document.documentElement.appendChild(newDiv);
        newDiv.innerHTML = element.innerHTML;
        newDiv.focus();
        isZoomed = true;
        
        if (elementInFocus){
            unhighlightElement(elementInFocus);
            elementInFocus = null;
        }
    }
    function unZoomElement(e){
        if (e.button==2){
            var div = document.getElementById(CODEBOX.domClipper.zoomDivId);
            window.document.documentElement.removeChild(div);

            isZoomed = false;
        }
    }
    
    function undeletePrevious(){
        var l = removedElements.length;
        var elementToRestore = removedElements.pop();
        if (elementToRestore){
            restoreElement(elementToRestore);
        }    
    }
    
    function handleKeyPress(event){
        if (event.ctrlKey) {
            var key = String.fromCharCode(event.which);
            if ( key == CODEBOX.domClipper.keys.toggle && event.altKey ){
                toggle();
                                        
            } else if ( key == CODEBOX.domClipper.keys.undo ) {
                if (isActive && ! isZoomed){
                    undeletePrevious();
                }
            }
        }
    }
    
    function toggle(){
        if (isActive){
            forEachElement(removeHandlers);
            if (elementInFocus){
                unhighlightElement(elementInFocus);
                elementInFocus = null;
            }                        
            showMsg(CODEBOX.domClipper.msgs.deactivated);
                    
        } else {
            forEachElement(attachHandlers);
            showMsg(CODEBOX.domClipper.msgs.activated);
        }                    
        isActive = !isActive;         
    }        
    
    function showMsg(msg){
        var boxDiv = document.getElementById(CODEBOX.domClipper.msgBoxId);
        var hideMsg = function(){
            if (boxDiv){
    			try{
					window.document.documentElement.removeChild(boxDiv);
				} catch (e){
					//ignore - the box is gone already
				}
				boxDiv = null;
			}
		}
		if (!boxDiv){
			boxDiv = document.createElement('div');
			boxDiv.setAttribute('id', CODEBOX.domClipper.msgBoxId);
			boxDiv.style.color           = CODEBOX.domClipper.style.togBoxTxtCol;
			boxDiv.style.border          = CODEBOX.domClipper.style.togBoxBorder;
			boxDiv.style.backgroundColor = CODEBOX.domClipper.style.togBoxBackCol; 
			boxDiv.style.fontFamily      = CODEBOX.domClipper.style.togBoxFont;
			boxDiv.style.fontSize        = CODEBOX.domClipper.style.togBoxFontSize;
			boxDiv.style.top             = CODEBOX.domClipper.style.togBoxTop;
			boxDiv.style.left            = CODEBOX.domClipper.style.togBoxLeft;
			boxDiv.style.padding         = CODEBOX.domClipper.style.togBoxPadding;
			boxDiv.style.position = 'fixed';
			window.document.documentElement.appendChild(boxDiv);
			window.setTimeout(hideMsg, CODEBOX.domClipper.togBoxTimeout);	
		} else {
			window.clearTimeout(hideMsg);
			window.setTimeout(hideMsg, CODEBOX.domClipper.togBoxTimeout);
		}
		boxDiv.innerHTML = msg;
	}		
	
	function forEachElement(fnDoThis){
		var tagName, tags;
		for(var i=0; i<TARGET_ELEMENTS.length; i++){
			tagName = TARGET_ELEMENTS[i];
			tags = document.getElementsByTagName(tagName);
			for(var j=0; j<tags.length; j++){
				try{
					fnDoThis(tags[j]);
				} catch (e){
					//ignore
				}
			}
		}		
	}

	document.addEventListener('keypress', handleKeyPress, true);		
	GM_registerMenuCommand(CODEBOX.domClipper.msgs.menuToggle);
}

CODEBOX.domClipper.process();			
