// ==UserScript==
// @name          FireReader
// @namespace     cn.firelines
// @description   Better Reader upon Google
// @include       http://www.google.com/reader/view/*
// @include 	  https://www.google.com/reader/view/*
// Auter          Zigler Chang (fireinice@gmail.com)
// ==/UserScript==


//*********************************************************************************//

// You can custom the key binding in the Flower Brackets as the description
// **NOTICE**//
//1. just modify the character between the quotation marks
//2. the binding key distinguishes between upper and lower case

// 您可以通过下面花括弧中的部分自定义用到的快捷键，具体设置请阅读下面的说明
// **注意**//
//1. 除非您知道您在做什么，请只修改单引号中的字母，将其改为您希望使用的快捷键
//2. 快捷键区分大小写，若设为大写字母则快捷键为shift+所设定的字母

//*********************************************************************************//

var customConfig  = {

    // 下一个未读的Subscription           Next unread subscription
    Key_of_Next_Unread_Sub		:              'J',             

    // 上一个未读的Subscription           Previous unread subscription
    Key_of_Prev_Unread_Sub		:              'K',             

    // 下一个未读的Subscription           Next unread subscription
    Key_of_Next_Item  			:              'j',             
    Key_of_Next_Item_Scan  		:              'n',
    
    // 上一个未读的Subscription           Previous unread subscription
    Key_of_Prev_Item			:              'k',             
    Key_of_Prev_Item_Scan		:              'p',             
    
    // 在新窗口中打开一个条目（默认为v）      Open an Item in a new window(default is v)         
    Key_of_Visit_Item              	:              'i'
};

//*********************************************************************************//

//*****Do *NOT* Modify the Code Beneath, Otherwise YOU know what you are doing *****// 

//*********************************************************************************//




// common Tools for using later
function ShortcutKey( keyCode, func, defKey ) {
    this.keyCode = keyCode;
    this.shift = (keyCode.toUpperCase() == keyCode);
    if ( null != defKey ) {
	this.defKeyCode = defKey;
	this.defShift = (defKey.toUpperCase() == defKey);
	this.isDefault = (keyCode == defKey);
    }
    this.func = func;
}
ShortcutKey.prototype.keyCode = null;
ShortcutKey.prototype.shift = false;
ShortcutKey.prototype.func = null;
ShortcutKey.prototype.isDefault = true;
ShortcutKey.prototype.defKeyCode = null;
ShortcutKey.prototype.defShift = false;

var commTools = {};
commTools.getElementsByClassName = function( node, searchClass, tag) {
    var classElements = new Array();
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp(searchClass);
    for (i = 0, j = 0; i < elsLen; i++) {
	if ( pattern.test(els[i].className) ) {
	    classElements[j] = els[i];
	    j++;
	}
    }
    return classElements;
};
commTools.selElemsByClassName = function( nodeArr, nameFilter) {
    var classElements = new Array();
    var nodeArrLen = nodeArr.length;
    var pattern = new RegExp(nameFilter);
    for (i = 0, j = 0; i < nodeArrLen; i++) {
	if( pattern.test(nodeArr[i].className) ) {
	    classElements[j] = nodeArr[i];
	    j++;
	}
    }
    return classElements;
};


// module GoogleReader
function GoogleReader() {
}
GoogleReader.prototype.tagPanel = document.getElementById("sub-tree");
GoogleReader.prototype.itemPanel = document.getElementById("entries");

GoogleReader.prototype.isCursored = function( node ) {
    var curStyle = new RegExp("cursor$");
    return curStyle.test(node.getElementsByTagName("A")[0].className);
};
GoogleReader.prototype.isFolder = function( node ) {
    var curStyle = new RegExp("^folder");
    return curStyle.test(node.getElementsByTagName("A")[0].className);
};
GoogleReader.prototype.isFolderCollapsed = function( node ) {
    var curStyle = new RegExp("collapsed");
    return curStyle.test(node.className);
};
GoogleReader.prototype.isLastItem = function( node ) {
    if ( null == node ) {						//have not selected an item		
	return("scroll-filler" == this.itemPanel.firstChild.id);
    }
    return(node.nextSibling.id == "scroll-filler");
};
GoogleReader.prototype.isFirstItem = function( node ) {
    if ( null == node ) {                                              //have not selected an item		
	return(true);
    }
    return(node == this.itemPanel.firstChild);
};


GoogleReader.prototype.visitItem = function(   ) {
    this.dispatch('v');
};
GoogleReader.prototype.nextItem = function(   ) {
    this.dispatch('j');
};
GoogleReader.prototype.prevItem = function(   ) {
    this.dispatch('k');
};

GoogleReader.prototype.getUnreadSubs = function(){
    return commTools.getElementsByClassName(document.getElementById("sub-tree"), "unread$", "LI");
};
GoogleReader.prototype.getSelectedSub = function(){
    return commTools.getElementsByClassName(document.getElementById("sub-tree"), "tree-selected( unread)?$", "LI")[0];
};
GoogleReader.prototype.getCursorSub = function() {
    return commTools.getElementsByClassName(document.getElementById("sub-tree"), "cursor$", "A")[0];
};
GoogleReader.prototype.getUnreadSubs = function(){
    var uis = commTools.getElementsByClassName(document.getElementById("sub-tree"), "unread$", "LI");
    return commTools.selElemsByClassName(uis, "^sub");
};
GoogleReader.prototype.getFolderofSub = function( subNode ) {
    if ( this.isCursored( subNode ) ) {
	return subNode;
    }
    return subNode.parentNode.parentNode;
};
GoogleReader.prototype.getUnreadFolders = function(){
    var uis = commTools.getElementsByClassName(document.getElementById("sub-tree"), "unread$", "LI");
    return commTools.selElemsByClassName(uis, "^folder");
};
GoogleReader.prototype.getUnreadOrCurSel = function(){
    var uocs = commTools.getElementsByClassName(document.getElementById("sub-tree"), "unread$|tree-selected$", "LI");
    var si = this.getSelectedSub();
    var fos = "sub|tree-selected$";
//     if ( null != si ) {
// 	fos = si.className.split(" ")[0];
//     }
    return commTools.selElemsByClassName(uocs, fos);
};
GoogleReader.prototype.getAllFolderAndSub = function(){
    return document.getElementById("sub-tree").getElementsByTagName("LI");
};
GoogleReader.prototype.getLastSub = function(){
    var allSubs = document.getElementById("sub-tree").getElementsByTagName("LI");
    return allSubs[allSubs.length-1];
};
GoogleReader.prototype.getFirstSub = function(){
    var allSubs = document.getElementById("sub-tree").getElementsByTagName("LI");
    return allSubs[0];
};
GoogleReader.prototype.getCurrentItem = function() {
    return(document.getElementById("current-entry"));
};


GoogleReader.prototype.dispatch = function(character, shift) {
  var key = character.toUpperCase();
  var event = document.createEvent('KeyboardEvent'); 
  event.initKeyEvent('keypress', true, true, null, false, false, shift, false, key.charCodeAt(0), character.charCodeAt(0)); 
  document.body.dispatchEvent(event);
};


//module FireReader
function FireReader() {
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Next_Item, this.nextItem, "j"));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Prev_Item, this.prevItem, "k"));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Next_Item_Scan, this.nextItem, "n"));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Prev_Item_Scan, this.prevItem, "p"));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Next_Unread_Sub, this.nextUnreadSub, null));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Prev_Unread_Sub, this.prevUnreadSub, null));
    this.keySet.push(new ShortcutKey(customConfig.Key_of_Visit_Item, this.visitItem, "v"));
}
FireReader.prototype.keySet = new Array();
FireReader.prototype.googleReader = new GoogleReader();
FireReader.prototype.run = function() {
    document.addEventListener( 'keydown', this.keyHandler, false); 
};
FireReader.prototype.keyHandler = function(event) {
    if (event.target.tagName == 'INPUT') {
	//ignore it       
    }else{
	var ks = fireReader.keySet;
	for ( var cnt in ks ){
	    if ( ks[cnt].keyCode.toUpperCase().charCodeAt(0) == event.keyCode
		 && ks[cnt].shift == event.shiftKey){
		ks[cnt].func.call(fireReader);
		if(!ks[cnt].isDefault) {
		    fireReader.googleReader.dispatch(ks[cnt].defKeyCode, ks[cnt].defShift);
		}
		break;
	    }
	}
    }
};


FireReader.prototype.nextUnreadSub = function() {
    var uss = this.googleReader.getUnreadOrCurSel();
    if ( 0 == uss.length ) {                         // There seems to be no more sub for reading
	return 0;
    }
    var si = this.googleReader.getSelectedSub();
    // GM_log(si.id);
    var cnt = 0;
    if ( null != si ) {                          
	for ( ; cnt < uss.length; ++cnt ) {
	    if ( uss[cnt].id == si.id ) {
		++cnt;                                // set cnt point to the next unread sub
		break;
	    }
	}
    }                                                 // else not in view mode, likely in HOME Page
    // GM_log(cnt);
    
    var norp = 'n';
    if ( cnt >= uss.length ) {                       // the tree-selected one is the last unread sub
	cnt = 0;
	norp = 'p';
    }
    var nUrSub = uss[cnt];
    var nUrSubParFolder = nUrSub.parentNode.parentNode;
    var allSubs = this.googleReader.getAllFolderAndSub();
    for( var loopCnt = 0, lSub = this.googleReader.getLastSub();
	 // nUrSub is the next unread sub or the first one
	 loopCnt < allSubs.length*2; ++loopCnt) {
	if ( this.googleReader.isCursored(nUrSubParFolder) &&
	     this.googleReader.isFolderCollapsed(nUrSubParFolder) ) {
	    norp = 'n';
	    this.googleReader.dispatch('x', true);
	}
	this.googleReader.dispatch( norp, true);
	if ( this.googleReader.isCursored(nUrSub) ) {
	    break;
	}
	if ( this.googleReader.isCursored(lSub) ) {
	    norp = 'p';
	}
    }
    this.googleReader.dispatch('o', true);
};

FireReader.prototype.prevUnreadSub = function() {
    var uss = this.googleReader.getUnreadOrCurSel();
    if ( 0 == uss.length ) {                         // There seems to be no more sub for reading
	return 0;
    }

    var si = this.googleReader.getSelectedSub();
    var cnt = 0;
    if ( null != si ) {                          
	for ( ; cnt < uss.length; ++cnt ) {
	    if ( uss[cnt].id == si.id ) {
		--cnt;                                // set cnt point to the next unread sub
		break;
	    }
	}
    }                                                 // else not in view mode, likely in HOME Page

    var norp = 'p';
    if ( cnt >= uss.length-1 || cnt < 0 ) {               // not in view mode, likely in HOME Page
	cnt = uss.length-1;
	norp = 'n';
    }
    var pUrSub = uss[cnt];
    var pUrSubParFolder = pUrSub.parentNode.parentNode;
    var allSubs = this.googleReader.getAllFolderAndSub();
    for( var loopCnt = 0, fSub = this.googleReader.getFirstSub();
	                                              // pUrSub is the next unread sub or the first one
	 loopCnt < allSubs.length*2; ++loopCnt) {
	if ( this.googleReader.isCursored(pUrSubParFolder) &&
	     this.googleReader.isFolderCollapsed(pUrSubParFolder) ) {
	    norp = 'n';
	    this.googleReader.dispatch('x', true);
	}
	this.googleReader.dispatch( norp, true);
	if ( this.googleReader.isCursored(pUrSub) ) {
	    break;
	}
	if ( this.googleReader.isCursored(fSub) ) {
	    norp = 'p';
	}
    }
    this.googleReader.dispatch('o', true);
};

FireReader.prototype.visitItem = function(   ) {
    //ignore it;
    //     this.googleReader.visitItem();
};
FireReader.prototype.nextItem = function(   ) {
    var curItem = this.googleReader.getCurrentItem();
    if ( this.googleReader.isLastItem(curItem)) {
	this.nextUnreadSub();
    }
};
FireReader.prototype.prevItem = function(   ) {
    var curItem = this.googleReader.getCurrentItem();
    if ( this.googleReader.isFirstItem(curItem)) {
	this.prevUnreadSub();
    }
};

//Script start from here
var fireReader = new FireReader();
fireReader.run();

