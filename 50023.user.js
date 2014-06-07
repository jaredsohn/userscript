// ==UserScript==
// @name           Google Labelled
//@description Add selection functionality for labelled conversation within the thread list to Google Mail
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var gmail = null;
var CONS_LBL_CLS = 'labelled';

window.addEventListener('load', function() {
    if (unsafeWindow.gmonkey) {
        unsafeWindow.gmonkey.load('1.0', init);
    }
}, true);

function init(g) {
	gmail = g;
	// Calls to the gmail API seem to fail far less often if you wait
	// for a bit to actually start using it.
    window.setTimeout(function() {
		try {
		modifyThreadList();
			gmail.registerViewChangeCallback(modifyThreadList);
		} catch (ex) {
	        // This seems like a brutal hack, however the call to getCanvasElement
	        // will sometimes fail when the page loads.  If that happens this seems
	        // to resolve it eventually.
			window.location.reload();
		}
	}, 500);
}

getElementsByClassName = function(node, cls) {
	var returnNode = [];
	var myclass = new RegExp('\\b'+cls+'\\b');
	
	var elem = node.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) returnNode.push(elem[i]);
	}
	return returnNode;
}; 

modifyThreadList = function() {
	if(gmail.getActiveViewType() == 'tl') {
		var view = gmail.getActiveViewElement();
		var selGrp = getElementsByClassName(view, 'yU');
		
		var sel;
		for(var i = 0; i<selGrp.length; i++) {
			sel = new SelectionGroup(selGrp[i]);
			if(!sel.hasLabelledLink()) {
				sel.addLabelledLink();
			}
		}
	}
}

SelectionGroup = function(selGrp) {

	this.hasLabelledLink = function() {
		var childs = selGrp.childNodes;	
		for(var i=0; i<childs.length; i++) {
			if(childs[i].className == CONS_LBL_CLS) { 
				return true;
			}
		}	
		return false;
	},
	
	this.addLabelledLink = function() {
		selGrp.appendChild(document.createTextNode(', '));
	
		var lbl = document.createElement('span');
		lbl.className = CONS_LBL_CLS;
		lbl.innerHTML = 'Labelled';
		lbl.addEventListener('click', selectLabelledConversations, true);
		selGrp.appendChild(lbl);
	}

}

selectLabelledConversations = function() {
	var view = gmail.getActiveViewElement();
	
	// maybe you are using multiple threadlists
	var convGrp = getElementsByClassName(view, 'nn');
	var rConvGrp = convGrp[0];
	if(!rConvGrp) {
		return;
	}
	
	var conv;
	var convs = rConvGrp.getElementsByTagName('tr');
	for(var i=0; i<convs.length; i++) {
		conv = new Conversation(convs[i]);
		if(conv.hasLabel()) {
			conv.select();
		}
	}
};

Conversation = function(conv) {
	this.hasLabel = function() {
		var lbls = getElementsByClassName(conv, 'av');
		return (lbls.length == 0) ? false : true;
	},

	this.select = function() {
		var selBox = conv.getElementsByTagName('input');
		selBox[0].click();
	}
};
