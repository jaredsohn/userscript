// ==UserScript==
// @name           Gmail - auto expand Nested Labels (udated to GMail at 04.29.2011)
// @namespace      http://userscripts.org/users/20935
// @description    Auto expand Nested Labels in Gmail
// @author         Wojciech 'KosciaK' Pietrzok (corrected by Hofi)
// @version        0.1.2
// @include        https://mail.google.*/mail/*
// @include        http://mail.google.*/mail/*
// @include        https://mail.google.*/a/*
// @include        http://mail.google.*/a/*

// ==/UserScript==


(function() {

/*
 * ----------------------------------------------------------------------------
 * 
 * Edit autoExpand to set labels you want to expand
 * Surround labels with quotes, separate them using comma
 * Labels are case sensitive ('WORK' and 'work' are not the same)!
 * Parent labels will be expanded # automatically
 * 
 * Example of autoExpand list:
 * var autoExpand = ['forum/google', 'Work', 'Family/Holidays'];
 */

var autoExpand = ['Urban'];

/*
 * Do not edit below this line
 * ----------------------------------------------------------------------------
 */


var click = function(node) {
	//alert('Current node is ' + node);
    var buttons = node.firstChild.firstChild;
    var button = buttons.firstChild;
	button = buttons.nextSibling;
	//alert('Current button is ' + button.className);
    if (button.className.indexOf('TH') >= 0) {
//        var evt = document.createEvent("MouseEvents");
//        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        button.dispatchEvent(evt)
        // Doesn't work in Google Chrome, click is not performed, not sure why...
    }
//	else
//        alert('No button called TH');
}

var expandLabel = function(label) {
    if (label.indexOf('/') > 0) {
        var parent = label.substring(0, label.lastIndexOf('/'));
        expandLabel(parent);
    }
    try {
        click(labels[encodeURIComponent(label)]);
    } catch(err) {
        alert('No label called ' + label);
    }
}

var labels = []

var init = function(e) {

	if( !( e.event.target instanceof Document ) )
		return;
	e.target.removeEventListener('AfterEvent.load', arguments.callee, false);
	
	var container = 'canvas_frame';
    if (!document.getElementById(container)) {
        //alert('No canvas frame ');
        return;
    }
    //alert('Found canvas frame ');
    
    var canvas = document.getElementById(container).contentDocument;
    var result = canvas.evaluate('//div[@class="TK"]', canvas, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
    
    if (result.snapshotLength < 2) {
        setTimeout(init, 500);
        return;
    }
    var node = result.snapshotItem(1);
    
    for(i=0; i < node.childNodes.length ; i++) {
        var label = node.childNodes[i];
        var label_href = label.getElementsByTagName('a')[0].getAttribute('href');
        var label_name = label_href.substring(label_href.indexOf('#label') + 7);
		//alert('Current label is ' + label_name);
        labels[label_name] = label;
    }
    
    autoExpand.sort()
    for(i=0; i < autoExpand.length ; i++) {
        expandLabel(autoExpand[i]);
    }

}

opera.addEventListener('AfterEvent.load',init,false);

})();