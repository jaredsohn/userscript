// ==UserScript==
// @name           Gmail Attachment Information
// @namespace      http://simasima.org/
// @include        http*://mail.google.com/*
// @version        1.3
// @description    inserts the information of attached files when you click the paper clip icon after the filenames turn to be blue.
// ==/UserScript==


window.addEventListener('load', function() {
    
    if (unsafeWindow.gmonkey) {	// for Gmail 2.0

	unsafeWindow.gmonkey.load('1.0', function(gmail) {

	    //--------------------------------------------------
	    // change here to the words in the right of paper clip shaped icon.
	    var trigWord = "Attach a file";
	    //---------------------------------------------------
	    var GM_AI_DEBUGLEVEL = 0; // 0: no debugging messages  <--> 255: all debugging messages

	    gmail.registerViewChangeCallback( viewTypeTrigger );
	    viewTypeTrigger();
	    
	    //----------------------------------------------------
	    //  composes the message about attached file from fileInfo[[], []]
	    // and inserts it into the message body.
	    //----------------------------------------------------
	    function insertFileInfo(){

		var fileInfo = [[], []];
		fileInfo = getFileInfo();
		
		if( fileInfo['number'] > 0 ){
		    
		    // 
		    //  please edit here to change the message about the attached file.
		    //
		    var msg = "";
		    msg  += "<<< " + fileInfo['number']  + " file(s) attached >>>\n";
		    for(var i=0; i<fileInfo['number']; i++){
			msg += "   " + fileInfo[i]['name'] + " (" + fileInfo[i]['size'] + ")\n";
		    }
		    msg += "\n"
		    //

		    var msgBox = new Array();
		    msgBox = getMessageBox();
		    
		    switch( msgBox['type'] ){
		    case 'text':
			msgBox['node'].value += msg;
			break;
			
		    case 'HTML':
			//var ele = document.createElement("div");
			//var info = document.createTextNode( msg.replace(/\n/g, '<br/>') );
			//ele.appendChild( info );
			msgBox['node'].contentDocument.body.innerHTML += '<div id="attachinfo">';
			msgBox['node'].contentDocument.body.innerHTML += msg.replace(/\n/g, '<br />');
			msgBox['node'].contentDocument.body.innerHTML += '</div>';
			
			break;
			
		    case 'null':
		    default:
			break;
		    }
		}
	    }

	    
	    //-----------------------------------------------------------------------
	    //  gets the file information according to the below line of the subject,
	    // and stores them into fileInfo[[], []]
	    //-----------------------------------------------------------------------
	    function getFileInfo(){

		var activeView;
		var nodeCheckBox;
		var mailBody;

		var fileInfo = new Array();
		
		// aquires the list of attached files by searching checkboxes
		var query = '//input[@type="checkbox" and @name="attach"]/../a';
		activeView = gmail.getActiveViewElement();
		nodeCheckBox = xpath( query, activeView );

		// splits into filename, mimetype, filesize
		// and stores them into fileInfo[fileNo.][] array.
		var fileNum = nodeCheckBox.length;
		dbgMsg(fileNum + ' file(s) found.\n');
		for( var i=0; i<fileNum; i++ ){
		    fileInfo[i] = new Array();
		    
		    dbgMsg('file[' + i + '].innerHTML=>' + nodeCheckBox[i].contentText );

		    fileInfo[i]['mime'] = xpath('//i', nodeCheckBox[i] )[i].innerHTML;
		    var nodeMime = xpath('//i', nodeCheckBox[i].firstChild );
		    if( nodeMime.length > 0 ){
			//
			// why isn't this  "nodeMime[0].innerHTML" ?
			fileInfo[i]['mime'] = nodeMime[i].innerHTML;
			fileInfo[i]['name'] = nodeCheckBox[i].innerHTML.split('(<i>' + fileInfo[i]['mime'] + '</i>)')[0];
			fileInfo[i]['size'] = nodeCheckBox[i].innerHTML.split('(<i>' + fileInfo[i]['mime'] + '</i>)')[1];
			fileInfo[i]['size'] = fileInfo[i]['size'].replace(/\s/g, '');
		    }
		    else{
			fileInfo[i]['mime'] = '(mime-error)';
			fileInfo[i]['name'] = '(name-error)';
			fileInfo[i]['size'] = '(size-error)';
		    }
		    dbgMsg( '  mime=' + fileInfo[i]['mime'], 2 );
		    dbgMsg( '  name=' + fileInfo[i]['name'], 2 );
		    dbgMsg( '  size=' + fileInfo[i]['size'], 2 );
		}
		fileInfo['number'] = nodeCheckBox.length;
		
		return fileInfo;
	    }


	    //---------------------------------------------------
	    // returns the node of the message body box if it exists.
	    //----------------------------------------------------
	    function getMessageBox(){
		
		var activeView = gmail.getActiveViewElement();
		var elems;
		var msgBox = new Array();
		
		elems = xpath('//iframe', activeView);
		if( elems.length > 0 ){
		    msgBox['type'] = 'HTML';
		    msgBox['node'] = elems[0];

		    dbgMsg('msgBox (HTML) found.', 1);
		    dbgMsg('  class=' + msgBox.className, 2 );
		}
		else{

		    elems = xpath('//textarea[@name="body"]', activeView);
		    if( elems.length > 0 ){
			msgBox['type'] = 'text';
			msgBox['node'] = elems[0];

			dbgMsg('msgBox (text) found.', 1);
			dbgMsg('  class=' + msgBox.className, 2 );
			
		    }

		    else{
		    
			msgBox['type'] = 'null';
			msgBox['node'] = null;

			dbgMsg('msgbox not found.', 255);
		    }
		}

		return msgBox;
	    }
	    




	    
	    //---------------------------------------------------------
	    // assigns 'insertFileInfo()' to the gem clip icon.
	    //---------------------------------------------------------
	    //
	    //  As the icon is redrawn by the 'Attach a file' link, so 'addButton()'
	    // observes the link and calls 'addEvent2clipIcon()' when the link pressed.
	    function addButton(){

		var msgBox = new Array();

		msgBox = getMessageBox();
		switch( msgBox['type'] ){
		case 'text':
		case 'HTML':
		    var activeView = gmail.getActiveViewElement();
		    var query = '//span[contains(concat(" ",normalize-space(text())," "), " ' + trigWord + ' ")]';
		    var nodeKeyWord = xpath( query, activeView );

		    if( nodeKeyWord.length > 0 ){
			nodeKeyWord[0].addEventListener('click', addEvent2clipIcon, false);

			dbgMsg('trigWord(' + trigWord + ') found.', 1 );
			dbgMsg('  class=' + nodeKeyWord[0].className, 2 );
		    }
		    break;


		case 'null':
		default:
		    
		    // retries after 500msec until there appears the message body box.
		    //    (in conversation mode, there is no message box until you
		    //     press 'reply' link or 'forward' link.)
		    setTimeout( addButton, 500 );
		    break;
		}
	    }

	    //--------------------------------------------------------
	    // assigns 'insertFileInfo()' to the gem clip icon.
	    //--------------------------------------------------------
	    function addEvent2clipIcon(){
		
		var activeView = gmail.getActiveViewElement();
		var query = '//input[@type="file"]/../../../..';
		var nodeKeyWord = xpath( query, activeView );
		if( nodeKeyWord.length > 0 ){
		    
		    var nodeClipIcon = xpath( 'img', nodeKeyWord[0].previousSibling );
		    if( nodeClipIcon.length > 0 ){
			
			nodeClipIcon[0].removeEventListener('click', insertFileInfo, true);
			nodeClipIcon[0].addEventListener('click', insertFileInfo, true);
			nodeClipIcon[0].addEventListener('mouseover',
							 function(){ nodeClipIcon[0].style.cursor = 'pointer'; }
							 , false );
			nodeClipIcon[0].addEventListener('mouseout',
							 function(){ nodeClipIcon[0].style.cursor = 'default'; }
							 , false );
			

			dbgMsg('clip icon found.', 1);
			dbgMsg('  class=' + nodeClipIcon[0].className, 2 );
		    }
		}
		else{
		    setTimeout( addEvent2clipIcon, 500 );
		}
		
	    }

	    
	    //----------------------------------------------------
	    // xpath function  http://yamanoue.sakura.ne.jp/blog/coding/68
	    //----------------------------------------------------
	    function xpath(query, src) {
		var results = document.evaluate(query, src, null,
		    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++){
		    nodes.push(results.snapshotItem(i));
		}
		return nodes;
	    }

	    //-------------------------------------------------------
	    // 
	    //-------------------------------------------------------
	    function showAlert(){
		alert('alert!!');
	    }


	    //-------------------------------------------------------
	    // debugging message
	    //-------------------------------------------------------
	    function dbgMsg( str, level ){
		// default arguments
		switch( arguments.length ){
		case 0:
		    str = "";
		case 1:
		    level = 1;
		}
		    
		if( GM_AI_DEBUGLEVEL >= level ){
		    GM_log(str);
		}
	    }



	    //---------------------------------
	    // main routine
	    //---------------------------------
	    function viewTypeTrigger(){

		var view = gmail.getActiveViewType();
		dbgMsg('view=' + view, 1 );
		switch( view ){
		case "co":
		case "cv":
		    addButton();
		    break;
		default:
		    break;
		}
	    }


	}); 			// unsafeWindow.gmonkey.load('1.0', function(gmail) {
    }
    else{
	//for Gmail 1.0?

	
    }
    
}, true);

