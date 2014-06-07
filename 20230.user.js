// JScript File
//
// ==UserScript==
// @name          Gmail Color Unread Labels
// @description   Enhances gmail labels, adds color and/or font blink to selected unread labels etc.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @version 1.1
//
// This greasemonkey script filters out the unread labels that you choose are important 
// to check immediately as they arrive. It highlights selected (see configuration) unread
// labels (e.g. from your wife!) and/or lets the label blink to get your attention.
// In order for this script to be useful for you (i.e. by default all unread labels are
// highlighted), you need to configure the source file to fit you needs!
//
// Copyright 2008, Solveig Kjartansdottir.
// All rights reserved.
//
// Version history:
// version 1.0 - original version
// version 1.1 - fixed a bug removing background color and/or label blink when all emails 
//               within a label was read.


window.addEventListener('load', function() {
    if (unsafeWindow.gmonkey) {
      unsafeWindow.gmonkey.load('1.0', function(gmail) {


        // **************CONFIGURATION****************************************
	// Type in the labels you wish to highlight (or have blink) when they 
	// include unread mail (i.e. replace the ones in the example below!).
	// Use the array 'highlighLabels' to enter the comma seperated strings
        // for background color only, else use 'blinkLabels' if you wish them
        // to blink.
	// By default all unread labels are highlighted. To make it configureable
	// it is important you set the variable 'defaultConfig' to false.
	var defaultConfig = true;
	var highlightLabels = ["SWE","Personal"];
	var blinkLabels = ["Home"];
        // *******************************************************************


	function XPathSearch( xpathExpression, contextNode ) {
	  return document.evaluate(xpathExpression, contextNode, null, 
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function colorLabel() {
	  // Find the DOM location of the unread and read labels using xpath.
	  var navPaneElem = gmail.getNavPaneElement();
	  var getLabelTable = XPathSearch(".//table", navPaneElem).snapshotItem(0);
	  var unreadLabels = XPathSearch(".//div[@class='yyT6sf PQmvpb']", getLabelTable);
	  var readLabels = XPathSearch(".//div[@class='yyT6sf']", getLabelTable);

	  // Color (and/or blink) the desired labels when they have unread mail.
	  for (var i = 0; i < unreadLabels.snapshotLength; i++) {
	    if(defaultConfig) {
	        unreadLabels.snapshotItem(i).style.backgroundColor = "#FF0000";
	    }
	    else {
	      for (var j = 0; j < highlightLabels.length; j++) {
		if (unreadLabels.snapshotItem(i).textContent.indexOf(highlightLabels[j]) != -1) {
		  unreadLabels.snapshotItem(i).style.backgroundColor = "#FF0000";
		}
	      }
	      for (var k = 0; k < blinkLabels.length; k++) {
		if (unreadLabels.snapshotItem(i).textContent.indexOf(blinkLabels[k]) != -1) {
		  unreadLabels.snapshotItem(i).style.textDecoration = "blink";
		}      
	      }		
	    }    
	  }

	  // Reset background to white with no blinking for read labels.
	  for (var i = 0; i < readLabels.snapshotLength; i++) {
	    readLabels.snapshotItem(i).style.backgroundColor = "#FFFFFF";
	    readLabels.snapshotItem(i).style.textDecoration = "";
	  }
	}
	gmail.registerViewChangeCallback(colorLabel);
	colorLabel();
      });
    }
  }, true);


