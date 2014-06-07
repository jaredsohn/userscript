// ==UserScript==
// @name           FurAffinity PM Box
// @namespace      furid
// @description    Shows a Popup Box for PM Messages
// @include        http://www.furaffinity.net/*
// @exclude        http://www.furaffinity.net/msg/*
// ==/UserScript==


var elems = getElementsByAttribute(document.body, "A", "title", "Notes");
if(elems[0].innerHTML.indexOf("N") != -1) { check(); }

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
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

function nodeGetElementById(node, id) {
	for(var i=0;i<node.childNodes.length;) {
		var child= node.childNodes[i++];
		if (child.nodeType!==1) continue;
		if (child.href===id) return child;
		child = nodeGetElementById(child, id);
		if (child!==null) return child;
	}
	return null;
}

function check() {
  try{
    GM_xmlhttpRequest({
  		method: "GET",
  		overrideMimeType: "text/html",
  		url: 'http://www.furaffinity.net/msg/pms/',
  		onload: function(page) {
        var pageContainer = document.createElement("div");
      	pageContainer.innerHTML = page.responseText;
      	document.getElementsByTagName("body")[0].appendChild(pageContainer);

      	pageContainer.style.display = 'none';

      	var cont = document.getElementById('pms-form').childNodes[5].childNodes[1];
      	var blah = '';
      	var list = [];
      	var ct = 0;

      	for(var i=0;i<cont.childNodes.length;i++) {
          var tempEl = cont.childNodes[i];
          if(tempEl.tagName == 'TR') {
            var tempEl2 = tempEl.childNodes;

            var viewmessage = '';
            var classes = '';
            var subject = '';
            var nickname = '';
            var nicknamelink = '';
            var timestamp = '';
            var unread = false;

            for(var j=0;j<tempEl2.length;j++) {

              if(tempEl.childNodes[j].tagName == 'TD') {
                if(tempEl.childNodes[j].className.indexOf("subject") != -1) {
                  for(var k=0;k<tempEl.childNodes[j].childNodes.length;k++) {
                    if(tempEl.childNodes[j].childNodes[k].tagName == 'A') {
                      if(tempEl.childNodes[j].childNodes[k].href.length>0 && tempEl.childNodes[j].childNodes[k].innerHTML.length>0) {
                        viewmessage = tempEl.childNodes[j].childNodes[k].href;
                        subject = tempEl.childNodes[j].childNodes[k].innerHTML;

                        if(tempEl.childNodes[j].childNodes[k].className.indexOf("prio") != -1) {
                          if(tempEl.childNodes[j].childNodes[k].className.indexOf("high") != -1) {
                            classes = 'high';
                          }
                          if(tempEl.childNodes[j].childNodes[k].className.indexOf("medium") != -1) {
                            classes = 'medium';
                          }
                          if(tempEl.childNodes[j].childNodes[k].className.indexOf("low") != -1) {
                            classes = 'low';
                          }
                        } else {
                          classes = 'normal';
                        }

                        if(tempEl.childNodes[j].childNodes[k].className.indexOf("unread") != -1) {
                          unread = true;
                        } else {
                          unread = false;
                          break;
                        }
                      }
                    }
                  }
                }

                if(tempEl.childNodes[j].className.indexOf("alt1") != -1 && tempEl.childNodes[j].className.indexOf("subject") == -1) {
                  for(var k=0;k<tempEl.childNodes[j].childNodes.length;k++) {
                    if(tempEl.childNodes[j].childNodes[k].tagName == 'A') {
                      if(tempEl.childNodes[j].childNodes[k].href.length>0 && tempEl.childNodes[j].childNodes[k].innerHTML.length>0) {
                        nicknamelink = tempEl.childNodes[j].childNodes[k].href;
                        nickname = tempEl.childNodes[j].childNodes[k].innerHTML;
                      }
                    }

                    if(tempEl.childNodes[j].childNodes[k].tagName == 'SPAN') {
                      if(tempEl.childNodes[j].childNodes[k].title.length>0) {
                        timestamp = tempEl.childNodes[j].childNodes[k].title;
                      }
                    }
                  }
                }
              }

              if(subject != '' && viewmessage != '' && nickname != '' && nicknamelink != '' && timestamp != '' && unread==true) {
                list[ct] = {viewmessage: viewmessage, classes: classes, subject: subject, nickname: nickname, nicknamelink: nicknamelink, timestamp: timestamp};
                ct++;
              }
            }
          }
      	}

      	if(list.length>0) {
          var popupContainer = document.createElement("div");
      	  var content = '<table width="99%" cellspacing="1" cellpadding="3" border="0" class="maintable" style="margin-left: -150px; width: 300px;"><tbody><tr><td align="left" class="cat"><div class="no_overflow" style="float: left;"><font size="2"><b>New private message(s)</b></font></div><a href="#" onClick="document.getElementById(\'popupbox\').style.display=(\'none\'); document.getElementById(\'backCont\').style.display=(\'none\');" style="float: right;">X</a></td></tr><tr><td class="alt1">';
      	  popupContainer.style.position = 'absolute';
      	  popupContainer.style.display = 'block';
      	  popupContainer.id = 'popupbox';
      	  popupContainer.style.left = '50%';
      	  popupContainer.style.top = '50%';

          for(var t=0;t<list.length-1;t++) {
            content = content + '<b><a href="' + list[t].nicknamelink + '">' + list[t].nickname + '</a></b>: <a href="' + list[t].viewmessage + '">' + list[t].subject + '</a><br />';
          }

      	  popupContainer.innerHTML = content + '</td></tr></tbody></table>';

          var backContainer = document.createElement("div");
          backContainer.style.position = 'fixed';
          backContainer.style.padding = '0';
          backContainer.style.margin = '0';
          backContainer.style.height = '100%';
          backContainer.id = 'backCont';
          backContainer.style.width = '100%';
          backContainer.style.backgroundColor = 'black';
          backContainer.style.left = '0';
          backContainer.style.top = '0';
          backContainer.style.opacity = '0.75';

          document.getElementsByTagName("body")[0].appendChild(backContainer);

          document.getElementsByTagName("body")[0].appendChild(popupContainer);
      	}
  	  }
    });
  } catch(e) {
    alert("Err");
  }
}