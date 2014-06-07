// ==UserScript==
// @name          Gmail attachment reminder v3.0b
// @namespace     http://www.norcimo.com/fun/greasmonkey/
// @description   Reminds you to attach a file to your email if it appears that you have not.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// December 2007
// Version 3.0 beta
// Updated for the new Gmail interface

var wordTrigger = 'attach';
var sendBtnText = 'Send';

if (!GM_getValue("attach_trigger")) {
	GM_setValue("attach_trigger", wordTrigger);
}

if (!GM_getValue("send_button_text")) {
		GM_setValue("send_button_text", sendBtnText);
}

GM_registerMenuCommand('Set word trigger', setWordTrigger);

function setWordTrigger(){
	wordTrigger = prompt('Enter word trigger (like "attach"). Separate multiple triggers with |', wordTrigger);
    if (wordTrigger) {
		GM_setValue('attach_trigger', wordTrigger );
	}
}

function setSendBtnText() {
	sendBtnText=prompt('Enter the text on the "Send" button',sendBtnText);
	if (sendBtnText) {
		GM_setValue('send_button_text', sendBtnText);
	}
}


window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
	  
	GM_registerMenuCommand('Set send button text', setSendBtnText);
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
	    	    
	    var activeView=gmail.getCanvasElement();
	    var buttons=activeView.getElementsByTagName("button");
	    activeView.addEventListener('click',checkAttach,true);
	        
	    function checkAttach(e) {
		    if (e.target.nodeName=="BUTTON") {
			    if (e.target.textContent==GM_getValue('send_button_text')) {
				    var msg="";
				    var subject="";
					if (getLastiframe()) {
					    var grabContent=activeView.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].cloneNode(true);
					    var contentQuotes=grabContent.getElementsByTagName("blockquote");
						if (contentQuotes) {
							for (var i=0; i<contentQuotes.length; i++) {
								contentQuotes[i].innerHTML="";
							}
						}
						msg=grabContent.innerHTML;
						var fixupReg=new RegExp(/<br>/gi);
						msg=msg.replace(fixupReg,"\n");
					} else {
						msg=getLastTextArea().value;
					}
					subjectBox=evaluateXPath(activeView,"//input[@name='subject']")[0];
					if (subjectBox.parentNode.parentNode.style.display!="none") {
						subject=subjectBox.value;
					}
					var attach_word_trigger = GM_getValue("attach_trigger");
					var myTest=new RegExp("^(?!>).*("+attach_word_trigger+")[a-z-]+","mi");
					if (msg.match(myTest) || subject.match(myTest)) {
						var fileAttached=false;
						var fileBoxes=evaluateXPath(activeView,"//input[@type='file']");
						if (fileBoxes.length) {
							for (fb=0; fb<fileBoxes.length; fb++) {
								if (fileBoxes[db].value!="") {
									fileAttached=true;
									break;
								}
							}
						}
						if (!fileAttached) {
							var attachChecks=evaluateXPath(activeView,"//input[@name='attach']");
							if (attachChecks.length) {
								for (ac=0; ac<attachChecks.length; ac++) {
									if (attachChecks[ac].checked) {
										fileAttached=true;
										break;
									}
								}
							}
						}
						if (!fileAttached) {
							if(!confirm('It appears that you wanted to attach a file to this email.\n Send anyway?')){
								e.stopPropagation();
							    e.preventDefault();
							}
						}
					}
			    }
		    }
	    }
	    
	    function getLastiframe() {
		    iframes=activeView.getElementsByTagName("iframe");
		    if (!iframes.length)
		    	return null;
		    else
		    	return iframes[iframes.length-1];
	    }
	    
	    function getLastTextArea() {
		    textAreas=activeView.getElementsByTagName("textarea");
		    return textAreas[textAreas.length-1];
	    }
	    
	    function evaluateXPath(aNode, aExpr) {
			var xpe = new XPathEvaluator();
			var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ? aNode.documentElement : aNode.ownerDocument.documentElement);
			var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
			var found = [];
			var res;
		    while (res = result.iterateNext())
			    found.push(res);
			return found;
		}
    });
  } else {
	  document.addEventListener('click',function(event) {
 	if (event.target.id=='snd') {
		// About to send the message	 	
		var msg;
		var subj="";
		if (document.getElementsByTagName("iframe").length>1) {
			// Silly rich format form
			// Grab the HTML content of the message by cloning the body of the iframe
			var grabContent=document.getElementsByTagName("iframe")[1].contentDocument.getElementsByTagName("body")[0].cloneNode(true);
			// We don't want false positives on quoted text. Assume anything quoted isn't going to refer
			// to an attachment we meant to add, so get rid of the content the quick and dirty way
			// This will of course remove user inserted quotes from the checks but what are the odds of
			// finding an attachment reference there anyway?
			var contentQuotes=grabContent.getElementsByTagName("blockquote");
			if (contentQuotes) {
				for (var i=0; i<contentQuotes.length; i++) {
					contentQuotes[i].innerHTML="";
				}
			}
			// Grab everything, tags included. Then replace the <br>'s with new lines.
			// This means we should still hit > text being recognised at as a quoted line
			// later (maybe, anyway)
			msg=grabContent.innerHTML;
			var fixupReg=new RegExp(/<br>/gi);
			msg=msg.replace(fixupReg,"\n");
		} else {
			// Normal plain text -- so much simpler!
			msg=document.getElementsByName('msgbody')[0].value;
		}	
		var subjBox=document.getElementsByName('subject')[0];
		//Only check the subject when it's visible (prevents checking when just replying etc)
		if (subjBox.parentNode.parentNode.style.display!="none")
			subj=subjBox.value;
//-----------------------------------------------------------
// Check for references to attachments etc
//-----------------------------------------------------------
		
				/*
				 To add further checks change the regular expression below.
				 You're mainly interested in the (...) after .*
				 e.g. (attach|adjunt) will match words beginning
				 attach or adjunt (i.e. attachment, attached,
				 adjunto, adjuntado (but not attach). You can of course use a more complex regex if
				 you want to! 
				 The first part of the regex ^(?!>) is necessary to avoid matching
				 against any quoted text				
				 */

				var attach_word_trigger = GM_getValue("attach_trigger");
				var myTest=new RegExp("^(?!>).*("+attach_word_trigger+")[a-z-]+","mi");
				if(msg.match(myTest) || subj.match(myTest)){
	 				// There's an attachment reference, so check if there's an attachment present!
	 				var fileattached=false;
					var inputs=document.getElementsByTagName('input');
					for (var i=0;i<inputs.length; i++) {
						if (inputs[i].type=="file")
							if (inputs[i].value!="")
								fileattached=true;
					}
	 				
 					var attachpos=document.getElementsByName('attach');
 					if (attachpos && !fileattached) {
	 					for (var i=0; i<attachpos.length; i++) {
		 					if (attachpos[i].checked)
		 						fileattached=true;
		 				}
	 				}
					if(!fileattached){
						// There isn't an attachment. Should we send?
						if(!confirm('It appears that you wanted to attach a file to this email.\n Send anyway?')){
							event.stopPropagation();
						    event.preventDefault();
						}
					}
 				}
			}
		}, true);
	  }
}, true);