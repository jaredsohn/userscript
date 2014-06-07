// ==UserScript==
// @name           WordPress Recent Comments Widget Finder
// @namespace      http://internetducttape.com
// @description    Displays a message if the page has a WordPress.com recent comments widget
// @include        http://*wordpress.com/*
// @exclude        http://*wordpress.com/wp-*
// @exclude        http*//m.wordpress.co*
// @exclude        http*//*wordpress.com/forum*
// @exclude        http*//*forums.wordpress.com*
// ==/UserScript==

(function() {
  var styles = "#idt-nfo { clear:both; display:block; border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px;} #idt-nfo a { display:block; font-weight: bolder;}";
  GM_addStyle(styles);

  if(document.getElementById('recentcomments') || document.getElementById('recent-comments') || (getElementsByClassName(document, "table", "recentcommentsavatar").length > 0)) {
      console.log("recent comments");
      console.log(document.getElementById('recentcomments'));
      console.log("recent-comments");
      console.log(document.getElementById('recentcomments'));
      console.log("recentcommentsavatar");
      console.log(getElementsByClassName(document, "table", "recentcommentsavatar"));
      var banner = document.createElement('div');     
      banner.innerHTML = "This blog has a recent comments widget";
      banner.id = "idt-nfo";
      document.body.insertBefore(banner, document.body.firstChild);
  }
  
  var next = document.createElement('div');
  next.id = "idt-nfo";
  next.innerHTML = '<a title="Click for next blog" href="http://wordpress.com/next/">Click for next blog</a>';
  document.body.appendChild(next);
 })();

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function getElementsByClassName(oElm, strTagName, oClassNames) {
  // from: http://www.robertnyman.com/index.php?p=256

  //To get all a elements in the document with a info-links class.
  //    getElementsByClassName(document, "a", "info-links");
  //To get all div elements within the element named container, with a col and a left class.
  //    getElementsByClassName(document.getElementById("container"), "div", ["col", "left"]);

  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  var arrRegExpClassNames = new Array();
  if(typeof oClassNames == "object"){
    for(var i=0; i<oClassNames.length; i++){
      arrRegExpClassNames.push(new RegExp("(^|\s)" + oClassNames[i].replace(/-/g, "\-") + "(\s|$)"));
    }
  }
  else{
    arrRegExpClassNames.push(new RegExp("(^|\s)" + oClassNames.replace(/-/g, "\-") + "(\s|$)"));
  }
  var oElement;
  var bMatchesAll;
  for(var j=0; j<arrElements.length; j++){
    oElement = arrElements[j];
    bMatchesAll = true;
    for(var k=0; k<arrRegExpClassNames.length; k++){
      if(!arrRegExpClassNames[k].test(oElement.className)){
	bMatchesAll = false;
	break;
      }
    }
    if(bMatchesAll){
      arrReturnElements.push(oElement);
    }
  }
  return (arrReturnElements);
}

