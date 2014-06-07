// ==UserScript==
// @name           GGRD util for starred item
// @namespace      http://cocoromi.s57.xrea.com/
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
// @include        http://reader.google.com/*
// @include        http://google.com/reader*
// add shortcut key in Google Reader
//   'z' : mark as read except starred item in loaded entries
//   'x' : mark stared and toggle reading state (maybe unread)
//   'c' : mark stared, toggle reading state (maybe unread) and open next entry
//   'w' : toggle display starred entry
// ==/UserScript==


var StarredItemHider = {
  isStarVisible : true
  ,toggle : function (){
    if(document.location.href.indexOf("starred") >= 0){return;}
    
    StarredItemHider.isStarVisible = !(StarredItemHider.isStarVisible);
    var display = StarredItemHider.isStarVisible ? "block" : "none";
    console.log(StarredItemHider.isStarVisible);
    
    StarredItemHider.setAllVisible(display);
  }
  ,hide : function (){
    if(document.location.href.indexOf("starred") >= 0){return;}
    StarredItemHider.setAllVisible("none");
  }
  ,setAllVisible : function(state){
    if(document.location.href.indexOf("starred") >= 0){return;}

    var elem = document.getElementById("entries");
    for(var n = elem.firstChild ; n != undefined ; n = n.nextSibling){
      StarredItemHider.setVisible(n , state);
    }
  }
  ,setVisible : function(elem , state){
    if(!StarredItemHider.isStarred(elem))return;
    elem.style.display = state;
  }
  
  ,hideEntry : function(elem){
    StarredItemHider.setVisible(elem , "none");
  }
  ,isStarred : function (elem){
    return !(elem.className == undefined || elem.className.indexOf("entry")  < 0 || elem.innerHTML.indexOf("item-star-active") < 0);
  }
}

function decorate_new_elements(e) {
  if(document.location.href.indexOf("starred") >= 0){return;}
  if(StarredItemHider.isStarVisible){return;}
  
  StarredItemHider.hideEntry(e.target);
}


var EventUtil = {
  simulateClick : function ( node ){
    //http://userscripts.org/scripts/show/2113
    var event = node.ownerDocument.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click',
  			true, // can bubble
  			true, // cancellable
  			node.ownerDocument.defaultView,
  			1, // clicks
  			50, 50, // screen coordinates
  			50, 50, // client coordinates
  			false, false, false, false, // control/alt/shift/meta
  			0, // button
  			node );
    node.dispatchEvent( event );
  },
  simulateKeyPress : function ( node , keyChar){
    //http://www.ac.cyberhome.ne.jp/~mattn/cgi-bin/blosxom.cgi/software/firefox/greasemonkey/20071123012638.htm
    var event = node.ownerDocument.createEvent( 'KeyboardEvent' );
    event.initKeyEvent('keypress', true, true, window, false, false, false, false, 0,keyChar.charCodeAt(0));
    node.dispatchEvent( event );
  }
}

function keypress( event ){
  //http://userscripts.org/scripts/show/2113
  event = event || window.event;
  element = event.target;
  
  var elementName = element.nodeName.toLowerCase(), typing;
  if( elementName == 'input' ){
    typing = element.type == 'text' || element.type == 'password';
  } else {
    typing = elementName == 'textarea';
  }
  if( typing ) return true;
  
  var key = String.fromCharCode( event.which || event.keyCode );
  switch(key){
    case 'X' : // mark stared, toggle reading state
      var div = document.getElementById("current-entry");
      if(div != undefined){
        EventUtil.simulateKeyPress(div , 's');
        EventUtil.simulateKeyPress(div , 'm');
      }
    break;

    case 'C': // mark stared, toggle reading state (maybe unread) and open next entry
      var div = document.getElementById("current-entry");
      if(div != undefined){
        EventUtil.simulateKeyPress(div , 'm');
        EventUtil.simulateKeyPress(div , 's');
        EventUtil.simulateKeyPress(div , 'j');
      }
    break;

    case 'Z': // mark as read except starred item in loaded entries
      if(document.location.href.indexOf("starred") >= 0){break;}
      var elem = document.getElementById("entries");
      var list = new Array();
      for(var n = elem.firstChild ; n != undefined ; n = n.nextSibling){
        if(n.className.indexOf("entry") < 0){continue;}
        list.push(n);
      }
      
      EventUtil.simulateClick(list[0].childNodes[0]);
      for(var i = 0 ; i < list.length ; i++){
        var e = list[i];
        if(e.className.indexOf("read") < 0 && !StarredItemHider.isStarred(e)){
          EventUtil.simulateKeyPress(e.childNodes[0] , 'm');
        }
        EventUtil.simulateKeyPress(e.childNodes[0] , 'n');
      }
      EventUtil.simulateKeyPress(e.childNodes[0] , 'o');
      EventUtil.simulateKeyPress(e.childNodes[0] , 'o');
      EventUtil.simulateKeyPress(e.childNodes[0] , 'm');
    break;
    
    case 'W': //toggle display starred entry
     StarredItemHider.toggle();
    break;
  }
  
  event.preventDefault && event.preventDefault();
  event.cancelBubble && event.cancelBubble();
}

document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);
document.addEventListener( 'keydown', keypress, false );

//setInterval(StarredItemHider.hide , 1000);
