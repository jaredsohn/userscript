// ==UserScript==

// @name           Better Outlook Web Access (OWA)

// @namespace      com.connorgarvey.bowa

// @description    Improves the OWA interface

// @include        */owa/*

// ==/UserScript==



GM_log("Starting Better OWA");



var body = document.getElementsByTagName("body")[0];



function getElementsByClassName(classname, node) {

  if (!node) {

    node = body;

  }

  var a = [];

  var re = new RegExp('\\b' + classname + '\\b');

  var els = node.getElementsByTagName("*");

  for (var i = 0,j = els.length; i < j; ++i) {

    if (re.test(els[i].className)) {

      a.push(els[i]);

    }

  }

  return a;

}



function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue) {

  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);

  var arrReturnElements = new Array();

  var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;

  var oCurrent;

  var oAttribute;

  for(var i=0; i<arrElements.length; i++){

    oCurrent = arrElements[i];

    oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);

    if(typeof oAttribute == "string" && oAttribute.length > 0){

      if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){

        arrReturnElements.push(oCurrent);

      }

    }

  }

  return arrReturnElements;

}



function findCaptionTable(className, captionText) {

  var tables = body.getElementsByTagName("table");

  for (var i = 0; i < tables.length; ++i) {

    var table = tables[i];

    if (table.className == className) {

      var caption = table.getElementsByTagName("caption")[0];

      if ((caption != null) && new RegExp("^\\s*" + captionText + "\\s*$").test(caption.textContent)) {

        return table;

      }

    }

  }

}



function findCaptionTableIn(className, captionText, element) {

  var tables = element.getElementsByTagName("table");

  for (var i = 0; i < tables.length; ++i) {

    var table = tables[i];

    if (table.className == className) {

      var caption = table.getElementsByTagName("caption")[0];

      if ((caption != null) && new RegExp("^\\s*" + captionText + "\\s*$").test(caption.textContent)) {

        return table;

      }

    }

  }

}



function findCheckboxesIn(topElement) {

  return getElementsByAttribute(topElement, "input", "type", "checkbox");

}



function findFirstChild(topElement, count) {

  var element = topElement;

  for (var i = 0; (i < count) && (element != null); ++i) {

    var anElement = element.firstChild;

    if (anElement.tagName == "CAPTION") {

      anElement = element.childNodes[1];

    }

    element = anElement;

  }

  return element;

}



function findLoginForm() {

  var forms = body.getElementsByTagName("form");

  for (var i = 0; i < forms.length; ++i) {

    var form = forms[i];

    if (form.getAttribute("action") == "owaauth.dll") {

      return form;

    }

  }

}



function setFontSizeById(elementId, size) {

  var element = document.getElementById(elementId);

  element.style.fontSize = size;

}



function setFontSizeByName(elementName, size) {

  var elements = document.getElementsByName(elementName);

  for (var i = 0; i < elements.length; ++i) {

    elements[i].style.fontSize = size;

  }

}



function setDefaultFontSizeById(elementId) {

  setFontSizeById(elementId, "medium");

}



function setDefaultFontSizeByName(elementName) {

  setFontSizeByName(elementName, "medium");

}



//*******

// Login

//*******

var loginForm = findLoginForm();

if (loginForm != null) {

  loginForm.removeAttribute("autocomplete");

  GM_log("Allowed autocomplete for login");

}



//******

// List

//******



var list_inboxBox = null;

var list_previewMessageInterval = null;

var list_previewBox = null;



function previewMessage(messageLink, oldURL) {

  if (oldURL == messageLink.href) {

    return false;

  }

  clearInterval(list_previewMessageInterval);

  GM_xmlhttpRequest({

    method: 'GET',

    url: messageLink.href,

    onload: function(responseDetails) {

      var text = responseDetails.responseText;

      var tempBox = document.createElement("div");

      tempBox.innerHTML = text;

      var content = findCaptionTableIn("w100", "Content Area", tempBox);

      while (list_previewBox.childNodes.length >= 1 ) {

        list_previewBox.removeChild(list_previewBox.firstChild);

      }

      list_previewBox.appendChild(content);

      messageLink.href = oldURL;

    }

  });

}



function refreshInbox() {

  clearInterval(list_previewMessageInterval);

  GM_xmlhttpRequest({

    method: 'GET',

    url: window.location.href,

    onload: function(responseDetails) {

      var text = responseDetails.responseText;

      var tempBox = document.createElement("div");

      tempBox.innerHTML = text;

      var list = findInbox(tempBox);

      formatInbox(list);

      var checkboxes = null;

      while (list_inboxBox.childNodes.length >= 1 ) {

        var child = list_inboxBox.firstChild;

        if ((checkboxes == null) || (checkboxes.length == 0)) {
          checkboxes = findCheckboxesIn(child);

        }
        list_inboxBox.removeChild(child);

      }
      if (checkboxes != null) {

      var newCheckboxes = findCheckboxesIn(list);
      for (var i = 0; i < newCheckboxes.length; ++i) {
        var newCheckbox = newCheckboxes[i];

        var oldCheckbox = null;
        for (var j = 0; i < checkboxes.length; ++i) {
          var checkbox = checkboxes[i];
          if (newCheckbox.getAttribute("value") == checkbox.getAttribute("value")) {

            oldCheckbox = checkbox;

          }

          break;

        }

        if (oldCheckbox != null) {

          newCheckbox.checked = oldCheckbox.checked;

        }

      }
      }

      list_inboxBox.appendChild(list);

    }

  });

}



function findInbox(root) {

  var toolbar = findCaptionTableIn("tbhd", "Toolbar", root);

  if (toolbar != null) {

    var href = findFirstChild(toolbar, 4);

    if ((href != null) && (href.getAttribute("title") == "New Message")) {

      var result = findCaptionTableIn("lvw", "Content Area", root);

      return result;

    }

  }

}



function formatInbox(list) {

  list.style.width = 0;

  var links = list.getElementsByTagName("a");

  var linksLength = links.length;

  var messages = new Array();

  var previews = new Array();

  var messageNumber = 0;

  for (var i = 0; i < linksLength; ++i) {

    // Skip header stuff

    if (i >= 7) {

      var link = links[i];

      var text = link.innerHTML;

      if (text) {

        link.id = "outlookMessageLink" + messageNumber;

        var newLink = document.createElement("a");

        messages.push(link);

        previews.push(newLink);

        newLink.id = "previewLink" + messageNumber;

        newLink.innerHTML = "Preview&nbsp;&nbsp;&nbsp;";

        newLink.href = "#";

        newLink.addEventListener("click", function(){

          var previewMessageNumber = this.id.substring(11);

          var messageLink = document.getElementById("outlookMessageLink" + previewMessageNumber);

          var oldURL = messageLink.href;

          location.assign("javascript:onClkRdMsg(document.getElementById('outlookMessageLink" +

              previewMessageNumber + "'), 'IPM.Note', " + previewMessageNumber + ", 0);void(0)");

          list_previewMessageInterval = setInterval(function() {previewMessage(messageLink, oldURL)}, 20);

        }, false);

        ++messageNumber;

      }

    }

  }

  for (var i = 0; i < messages.length; ++i) {

    messages[i].parentNode.insertBefore(previews[i], messages[i]);

  }

  GM_log("Formatted inbox");

}



function makeInbox(root) {

  var list = findInbox(root);

  if (list != null) {

    formatInbox(list);

    var main = document.createElement("div");

    list.parentNode.replaceChild(main, list);

    var mainHeight = main.parentNode.clientHeight;

    main.style.overflow = "hidden";

    main.style.widthPercent = 100;

    main.style.height = 0;

    main.style.height = main.parentNode.clientHeight;

    list_inboxBox = document.createElement("div");

    main.appendChild(list_inboxBox);

    list_inboxBox.style.borderBottom="2px solid gray";

    list_inboxBox.style.overflow = "auto";

    list_inboxBox.style.widthPercent = 100;

    list_inboxBox.style.height = (mainHeight / 2);

    list_inboxBox.appendChild(list);

    list_previewBox = document.createElement("div");

    list_previewBox.style.height = (mainHeight / 2);

    list_previewBox.style.overflow = "auto";

    main.appendChild(list_previewBox);

    setInterval(function(){refreshInbox()}, 60000)

    GM_log("Added preview pane");

    controlBox = findCaptionTable("wh100", "Content Area Control");

    inboxLink = getElementsByAttribute(controlBox, "a", "title", "Inbox");

    inboxText = inboxLink.innerHTML;

    GM_log(inboxLink + ":" + inboxLink.innerHTML);

  }

}



makeInbox(document.body);



//******

// Read

//******

var table = findCaptionTable("w100", "Content Area");

if (table != null) {

  table.style.width = 700;

  GM_log("Resized content area");

}



//******

// Edit

//******

var table = findCaptionTable("wh100", "Content Area");

if (table != null) {

  GM_log("Resizing edit fields");

  setDefaultFontSizeById("txtsbj");

  setDefaultFontSizeById("txtbcc");

  setDefaultFontSizeById("txtcc");

  setDefaultFontSizeById("txtto");

  setDefaultFontSizeByName("txtbdy");

}