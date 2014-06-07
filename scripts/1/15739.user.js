// ==UserScript==
// @name           Gmail and Google Apps Sidebar Remover
// @description	Removes the ads from the right side of the screen in the conversation view and moves the thread links from the top of that pane over to the left side, so they are still useable. Works with both the old Gmail and Google Apps, as well as the new Gmail.
// @namespace      http://www.jtulloch.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var logPanel = (function() {
  var panel;
  function skin(obj,styles) {
    for(var element in styles) {
      obj.style[element] = styles[element];
    }    
  }
  
  return {
    init:function(parentNode,height,width){
      if(panel == null || panel == undefined) {
        panel = document.createElement("textarea");
        parentNode.appendChild(panel);
        panel.setAttribute("id","logger");
        skin(panel,{
          "position":"fixed",
          "left":"10px",
          "bottom":"10px",
          "height":height || "100px",
          "width":width || "400px",
          "fontSize":"10px",
          "padding":"15px",
          "margin":"-2px",
          "border":"2px solid #cccccc"
        });      
      }
    },
    log:function(text) {
      if(panel) {
        var time = new Date(); 
        var timeStamp = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        panel.value = timeStamp + " -- " + text + "\n" + panel.value;     
      } else {
        throw {name:"NotInitialized",message:"logger not initialized, please call logger.init() before logger.log()"};
      }
    }  
  }
})();

var GSRInit = function(debug) {
	var logger,view,gmailVar,sBar,threadLinks,navPane,chatPane,threadLinksBox,navTest = false,safeLoadTimerId;	
	var $id = function(id) {
		return document.getElementById(id);
	};
	var log = function(message) {
	  if(debug && logger.log) {
	    try  {
        logger.log("Gmail Sidebar Remover: " + message);		      
  	  } catch(err) {
  	    alert("error");
  	  }       
	  }
	};
	var makeBreak = function() {
		return document.createElement('br');
	};
	var methods = {
		startDebug: function() {
		  var elementParent = window.frames.top.document;
		  var logElement = elementParent.getElementById("logger");
	    if(!logElement){
        logger.init(elementParent.body); 
	    } else {
	      logElement.parent.removeChild(logElement);
	      methods.startDebug();
	    }
		},
	  loadCallback: function() {
		    if(!gmailVar && unsafeWindow.gmonkey.isLoaded('1.0')) {
		      gmailVar = unsafeWindow.gmonkey.get('1.0');
    			gmailVar.registerViewChangeCallback(methods.onViewChange);
    			log("viewchange callback registered");
    			clearInterval(safeLoadTimerId);
    			log("interval cleared");
		    }
		},
		onViewChange: function() {
			view = gmailVar.getActiveViewType();
			log("View Type: " + view);
			// If in conversation pane, remove the right hand sBar and move the thread links over to the navigation pane.
			// Otherwise, remove the thread links if they have been created.
			if(view == "cv"){
				if(navTest)
				{
					threadLinksBox.setContent("");
					threadLinksBox.getElement().parentNode.removeChild(threadLinksBox.getElement());
					navTest = false;
				}
				// Get the right sBar, as well as the thread links, the navigation pane, and the chat pane for reference.
				sBar = gmailVar.getConvRhsElement();
				threadLinks = sBar.firstChild.firstChild;
				navPane = gmailVar.getNavPaneElement().firstChild;
				
				// Increase or decrease this number to change the location of the thread toolbox.
				chatPane = navPane.childNodes[2]; 
												  
				// Add a box to the left navigation pane.
				threadLinksBox = gmailVar.addNavModule("Thread Toolbox");
				
				// Make the links look a bit better, and insert them into the new tool box
				threadLinks.style.padding = '10px';
				threadLinksBox.appendChild(threadLinks);
				threadLinksBox.getElement().style.marginBottom = '10px';
				
				// Insert the new toolbox before the chat box.
				navPane.insertBefore(threadLinksBox.getElement(), chatPane);
				sBar.parentNode.parentNode.removeChild(sBar.parentNode.previousSibling);
				sBar.parentNode.parentNode.parentNode.style.width="100%";
				sBar.parentNode.parentNode.removeChild(sBar.parentNode);
				

				// Set test variable to true, so we know that the toolbox has been created.
				navTest = true;
			} else{
				if(navTest) {
					// The thread toolbox has been created, we now remove it.
					threadLinksBox.setContent("");
					threadLinksBox.getElement().parentNode.removeChild(threadLinksBox.getElement());
					navTest = false;
				}
			}
		}
	};
	return function verTest() {
		if(unsafeWindow.gmonkey) { // New-School Gmail
		    logger = logPanel;
		    debug && methods.startDebug();
		    gmailVar = null;
		    safeLoadTimerId = setInterval(methods.loadCallback,1000);
			  unsafeWindow.gmonkey.load('1.0', methods.loadCallback);
		} else if($id('rh')){     //Old-School Gmail. 
		    var idDelete = $id('rh'),idParent = $id('fi'),impLinks = $id('ap'),labelBox = $id('nb_0');		
			if(idDelete){
				if(labelBox){
					var navBox = document.getElementById('nav');	
					navBox.insertBefore(makeBreak(), labelBox);
					navBox.insertBefore(impLinks, labelBox);
					navBox.insertBefore(makeBreak(), labelBox);
				} else{
					$id('nav').appendChild(impLinks);
				}
				impLinks.style.backgroundColor = '#c3d9ff';
				impLinks.style.marginLeft = '15px';
				impLinks.style.paddingLeft = '5px';
				idDelete.style.display = 'none';
				$id('fic').style.marginRight = '0px';
			}
		} 
	};
}(false);

GSRInit();