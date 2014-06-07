////////////////////////////////////////////////////////////////////////
//
// Copyright 2008 and beyond Ajax Gaier. All Rights Reserved.
//
//    http://ajaxgaier.blogspot.com
// 

////////////////////////////////////////////////////////////////////////
//
// PRESENT LIMITATION
//
// Right now the text is retrieved when the conversation view is displayed.
// If you browse different messages in a conversation always the last 
// message will be translated. We are working on an enhancement.
//

////////////////////////////////////////////////////////////////////////
//
// ==UserScript==
// @name           Translation for GMail content
// @namespace      http://ajaxgaier.blogspot.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @version        1.0
// ==/UserScript==
//


////////////////////////////////////////////////////////////////////////
//
// Config Variables
//

// translate to which language ?
unsafeWindow.target_language = "en";

// height of the translation window
unsafeWindow.transl_win_height = "500px";

// width of the translation window
unsafeWindow.transl_win_width = "700px";

// font size of the translation window
unsafeWindow.transl_win_font_size = "10px";

////////////////////////////////////////////////////////////////////////
//
// TODO
//
// o retrieve text on demand and not when the CV is displayed
// o config section: target lang, size, color
// o input translation window
// o HTML content is partially displayed


////////////////////////////////////////////////////////////////////////
//
// No changes below this line if you are not sure what you are doing ;-)
//

//
// Version Config
//
unsafeWindow.gm_transl_version = "1.0";


// const DEBUG = true;
const DEBUG = false;
function debug() {
  if (DEBUG && console) {
    console.log.apply(this, arguments);
  }
}

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    GM_log("Error when evaluating XPath expression '" + expression + "'" +
           ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext(); 
       xpathNode; 
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
    
  return results;
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
  var expression = 
      ".//" + tagName + 
      "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
  
  return evalXPath(expression, rootNode);
}

function getDoc() {
  // debug (unsafeWindow.s_gmail);
  // gmail = unsafeWindow.s_gmail;
  return gmail.getNavPaneElement().ownerDocument;
}

function newNode(tagName) {
  return getDoc().createElement(tagName);
}

function getNode(id) {
  return getDoc().getElementById(id);
}

function getFirstVisibleNode(nodes) {
  for (var i = 0, node; node = nodes[i]; i++) {
    debug("don vis ");
    debug(node);
    // if (node.offsetHeight) return node;
    return node;
  }
  
  return null;
}

// Shorthand
function bind(func, thisObject) {
  return function() {
    return func.apply(thisObject, arguments);
  }
}

function newText(text) {return unsafeWindow.document.createTextNode(text);}

var newNode = bind(unsafeWindow.document.createElement, unsafeWindow.document);
var getNode = bind(unsafeWindow.document.getElementById, unsafeWindow.document);

// http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API

window.addEventListener('load', function() {
    if (unsafeWindow.gmonkey) {	// for Gmail 2.0
	unsafeWindow.gmonkey.load('1.0', function(gmail) {
	    gmail.registerViewChangeCallback( viewTypeTrigger );
	    viewTypeTrigger();

	    unsafeWindow.s_gmail = gmail;

	    debug("before check ver ...");
	    unsafeWindow.gm_transl_check_version();

	    function viewTypeTrigger(){
	      
	      var view = gmail.getActiveViewType();
	      debug('view=' + view, 1 );
	      switch( view ){
	      case "cv":
		addButton();
		break;
	      default:
		break;
	      }
	    }
	    
	    function addButton () {
	      
	      debug ("aview " + gmail.getActiveViewElement());
	      
	      fr1 = gmail.getActiveViewElement();
	      unsafeWindow.r_doc = fr1.ownerDocument;
	      debug (" rdoc " );
	      debug (unsafeWindow.r_doc);
	      butt1 = fr1.firstChild.firstChild.firstChild.firstChild.firstChild;
	      debug ("butt1 ");
	      debug (butt1);

	      //
	      // get text
	      //
	      var MSG_BOX_CLASS = "ArwC7c ckChnd";
	      var msg_box = getFirstVisibleNode(getNodesByTagNameAndClass(
			  unsafeWindow.r_doc.body, "div", MSG_BOX_CLASS));

	      //
	      // add button for translation
	      //
	      if (msg_box) {
		debug(msg_box);
		debug(msg_box.innerHTML.substr(1,100));
		debug("width : " + msg_box.width);
		unsafeWindow.msg_box_content = msg_box.innerHTML;
		str=encodeURIComponent(msg_box.innerHTML.substr(1,100));

		debug("gmail.getConvRhsElement()");
		debug(gmail.getConvRhsElement());
		unsafeWindow.s_gmail = gmail;
		unsafeWindow.s_msg_box = msg_box;
		unsafeWindow.s_ConvRhsElement = gmail.getConvRhsElement();

		str="XXX";

		unsafeWindow.store_msg(msg_box.innerHTML);

		upd_str = unsafeWindow.get_update_str();
		debug("upd string: " + " " + upd_str);
		if (upd_str && upd_str != " ") {
		  upd_str=" (Update available)"; 
		} else {
		  upd_str=""; 
		}

		butt1.innerHTML += '<button id="gmtransl_butt" val="' + str + '" class="Gjckbb" act="133" onClick="javascript: window.translate(\'' + str + '\'); " >Translate' + upd_str + '</button>';


	      }
 }
	  });
    }
			}, true);


unsafeWindow.store_msg = function (str) {
  debug("store it");
  debug(unsafeWindow.msg_box_content.substr(1,50));
  debug(unsafeWindow.parent);
  unsafeWindow.parent.msg_box_content = str;
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 1)));
  };
}

unsafeWindow.translate = safeWrap (function (str) {

   debug ("doit ...");

   debug(str);

    if (unsafeWindow.parent.msg_box_content) {
      string_plain = encodeURIComponent(unsafeWindow.parent.msg_box_content.replace(/<.*>/g, ""));
      string_enc = encodeURIComponent(unsafeWindow.parent.msg_box_content);
    }

    // urlp = 'v=1.0&q=' + string_plain.substr(1,450);
    string = string_plain.substr(1,450);
    string = string.replace(/%20%20/g,"%20");
    string = string.replace(/%0A%0A/g,"%0A");
    string = string.substr(1,string.lastIndexOf("%")-1);
    // urlp = 'v=1.0&q=' + string  + '&hl=en&langpair=%7Cen&format=html';
    urlp = 'v=1.0&q=' + string ;
    // urls = 'http://ajax.googleapis.com/ajax/services/language/translate?' + urlp;
    urls = 'http://ajax.googleapis.com/ajax/services/language/detect?' + urlp;
    debug (urls);

   GM_xmlhttpRequest({
     method: 'GET',
	 url: urls ,
	 headers: {
	 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3 '
	   },
	 onload: function(responseDetails1) {
	 if (responseDetails1.readyState == 4) {
	   debug(responseDetails1.status);
	   if (responseDetails1.status == 200) {
	     // OK
	     debug(responseDetails1.responseText);
	     var p = eval("(" + responseDetails1.responseText + ")");
	     // debug(p);
	     debug(p.responseData.language + " " + p.responseData.isReliable + " " + p.responseData.confidence );

	     // get the tranl
	     lang = p.responseData.language;
	     reliable = p.responseData.isReliable?"reliably detected":"unreliably detected"; 
	     confi = p.responseData.confidence ;

	     // urls = 'http://translate.google.com/translate_t?langpair='+p.responseData.language+'|en';
	     urls = 'http://translate.google.com/translate_t?langpair='+lang+'%7C' + unsafeWindow.target_language;
	     debug ("url : " + urls);

	     GM_xmlhttpRequest({
	       method: "POST",
		   url: urls,
		   headers:{'Content-type':'application/x-www-form-urlencoded'},
		   data: 'hl=en&ie=UTF8&text='+ string_enc + '&langpair='+lang+'%7C' + unsafeWindow.target_language,
		   onload: function(responseDetails2) { 
		   if (responseDetails1.readyState == 4) {
		     debug("stat " + responseDetails2.status);
		     // if (responseDetails2.status == 200) {
		       // OK
		       debug("text " + responseDetails2.responseText);

		       debug(unsafeWindow.parent.s_ConvRhsElement);
		       debug(unsafeWindow.parent.s_msg_box);
		       // el = unsafeWindow.parent.s_ConvRhsElement;
		       // el.innerHTML = '<div>XXXX</div>' + el.innerHTML;
		       
		       // el = unsafeWindow.parent.s_msg_box;
		       // el.innerHTML = '<div>XXXX</div>' + el.innerHTML;

		       str = responseDetails2.responseText;
		       str = str.substr(str.indexOf('id=result_box dir=')+23);
		       str = str.substr(1,str.indexOf('</div></td></tr><tr><td id=submitcell>')-1);
		       str = str.replace(/&quot;/g,'"');
		       str = str.replace(/&amp;/g,"&");
		       str = str.replace(/&lt;/g,"<");
		       str = str.replace(/&gt;/g,">");
		       str = str.replace(/\/ /g,"/");
		       str = str.replace(/<br> <br>/g,"<br>");

		       debug("before str ...");
		       debug(unsafeWindow.parent);

		       // with confid str_close = '<center><b>[ Google Translation from '+lang+' ('+reliable+') to '+ unsafeWindow.target_language + '| Confidence = '+confi + ' | ' + unsafeWindow.parent.gm_transl_updateString + '<a style="background-color: orange;" href="javascript: window.close_transl_div();">close</a> ]</b></center>';
		       str_close = '<center><b>[ Google Translation from "'+lang+'" ('+reliable+') to "'+ unsafeWindow.target_language + '" | ' + unsafeWindow.parent.gm_transl_updateString + '<a style="background-color: orange;" href="javascript: window.close_transl_div();">close</a> ]</b></center>';
		       str= str_close + '<div style="height: 460px; overflow: auto; background-Color: #fff; border: 1px solid #999; padding: 5px;">' + str + '</div> ' + str_close;

		       debug(str);

		       debug(unsafeWindow.parent.document.body);
		       el = unsafeWindow.parent.document.createElement('div');
		       el.style.position="absolute";
		       el.style.left="180px";
		       el.style.top="160px";
		       el.style.backgroundColor="#eee;";
		       debug("wi " + unsafeWindow.transl_win_width);
		       el.style.width=unsafeWindow.transl_win_width;
		       el.style.height=unsafeWindow.transl_win_height;
		       el.style.padding="3px";
		       el.style.fontSize=unsafeWindow.transl_win_font_size;
		       el.border = "0";
		       // el.zIndex = "900";
		       // el.style.border="3px solid #aaa;";
		       el.style.border="2px solid #111";
		       // el.style.overflow="auto";
		       el.id = "transl_div";
		       // el.onmousedown="startDrag(event);";
		       el.innerHTML = str;
		       unsafeWindow.parent.document.body.appendChild(el);

		       // } else {
		       // ERROR
		       //  debug ("err " + responseDetails2.responseText);
		       //}
		   }
		 }
	       });
	   }

	 } else {
	   // ERROR
	   debug ("err " + responseDetails1.responseText);
	 }
       }
     });
				   });

unsafeWindow.close_transl_div = safeWrap (function (str) {

   debug ("close ...");

   debug (unsafeWindow.parent.document);
   debug (unsafeWindow.parent.document.getElementById);
   el = unsafeWindow.parent.document.getElementById("transl_div");
   if (el) 
     el.style.display="none";

					  });


/////////////////////////////////////////////////////////////////////////////
// Versioning
/////////////////////////////////////////////////////////////////////////////

// unsafeWindow.gm_transl_updateString = null;

unsafeWindow.gm_transl_check_version = safeWrap (function (str) {

  debug ("getvers ...");

//   if (unsafeWindow.canvas_doc && unsafeWindow.canvas_doc.getElementById("link_firebug_hide")) {
//     p1 = unsafeWindow.canvas_doc.getElementById("link_firebug_hide").parentNode;
//     alert(p1);
//     debug(p1);
//   }

  if (unsafeWindow.parent.gm_transl_updateString) {
    // alert(unsafeWindow.gmgads_updateString);
    //    ('gm_gad1_conf_menu').innerHTML=unsafeWindow.gm_transl_updateString + getNode('gm_gad1_conf_menu').innerHTML;
    return;
  }

  debug(unsafeWindow.parent);
  unsafeWindow.parent.gm_transl_updateString = " ";

  GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.ajaxgaier.com/Greasemonkey/GMailTranslate/version.txt?_'+(new Date()).getTime(),
    headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3 GMTransl/'+ unsafeWindow.gm_transl_version
	  },
    onload: function(responseDetails) {
	debug ("vers " + responseDetails);
	v = responseDetails.responseText;
	v_arr = v.split("_");
	debug(unsafeWindow.gm_transl_version + " " + v_arr[1] + " " + v);
	if (v_arr[1] > unsafeWindow.gm_transl_version) {
	  // insert notice in e.g. config section
	  // if (!unsafeWindow.parent.gm_transl_updateString) {
	    debug("upd .. " + v_arr[2] + " " + v_arr[1]);
	    debug(unsafeWindow.parent);
	    unsafeWindow.parent.gm_transl_updateString = '<a style="" target="_blank" title="' + v_arr[2] + '" href="http://www.ajaxgaier.com/Greasemonkey/GMailTranslate/GMailTranslate.user.js">Update</a> | ';
	    // }
	  // } else {
	  // alert("up to date ..." + " X" + unsafeWindow.gmgads_version + "X X" +v+ "X ");
	    return 1;
	}
    }
    });
} );

unsafeWindow.get_update_str = function () {
  debug(unsafeWindow);
  return unsafeWindow.parent.gm_transl_updateString;
}
