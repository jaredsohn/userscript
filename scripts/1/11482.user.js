// ==UserScript==
// @name           Orkut Message(s) auto-selecter and Delete button
// @namespace      http://erahul.ag.googlepages.com/
// @description    Cleans All Messages too on clicking delete
// @include        http://www.orkut.com/Messages.aspx*
// ==/UserScript==

window.addEventListener(
     'load',
     function() {
	var lastUrl=window.location.href;
	var testmsg = document.evaluate('/html/body/form[2]/table/tbody/tr[2]/td/table[2]/tbody/tr/td[1]/input', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        	
	if( testmsg.snapshotLength ){
	
		window.location.href = "javascript: document.getElementById('statusMsg').style.display = 'none'; _checkAll(document.MessageForm, 'msgKeys', true);";
	 	//var confirm_delete= confirm("Do you really want to delete this page??");
 	        //if( confirm_delete ){  		    		
		//	window.location.href = "javascript:  document.MessageForm.a.value = 'msgsDelete'; document.MessageForm.submit(); document.getElementById('statusMsg').style.display = 'none'; ";
            	//}		
	}
	else
		return;
        
	var theActionDropDown = document.getElementsByTagName('select')[0];	
 	if(theActionDropDown ){		
	    var button = document.createElement('a');
	    button.title = "Orkut message delete script...";
	    button.href = "javascript: document.MessageForm.a.value = 'msgsDelete'; document.MessageForm.submit(); document.getElementById('statusMsg').style.display = 'none'; ";
	    button.innerHTML="<b>delete</b>";
	    theActionDropDown.parentNode.insertBefore(button, theActionDropDown.nextSibling);

	    var space1 = document.createElement('b');
	    space1.innerHTML=" &nbsp;&nbsp; ";                    
	    theActionDropDown.parentNode.insertBefore(space1, theActionDropDown.nextSibling);
	}
	
	
     },
     true);
