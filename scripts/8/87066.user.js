// ==UserScript==
// @name           Habrahabr.ru comments helper
// @namespace      http://tbms.ru/habr/comments/
// @description    Improves commenting experience
// @author         Nick Mitin
// @include        http://*habrahabr.ru/blogs*
// ==/UserScript==
/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/

// if the browser doesn't support the GM functions


if(typeof(GM_getValue) == 'undefined') var GM_getValue = function(){return false;};
if(typeof(GM_setValue) == 'undefined') var GM_setValue = function(){};
if(typeof(GM_registerMenuCommand) == 'undefined') var GM_registerMenuCommand = function(){};



var HHHelper = {
  cache : {},
  comments : null,
  container : null,
  popup : null,
  popupLink : null,
  popupText : null,
  timeout : null,
  initialize : function() {
  
    this.comments =  document.getElementById('comments');
    if (this.comments) {
      this.container = document.createElement('div');
      this.container.style.display = 'none';
      //this.container.innerHTML = '<div id="HHH_commentPopup" style="border: solid 1px black; position: absolute; width: 500px;"><div style="background-color: #F0F0E7; clear: both; height: 22px;"><div style="padding: 3px; background-color: #F0F0E7; float: left;"><a id="HHH_commentPopupLink" href="#">Перейти к комментарию</a></div><div style="float: right; padding: 3px;"><a id="popupClose" href="#">X</a></div></div><div style="clear: both;"></div><div id="HHH_commentPopupText" class="entry-content comment-preview" style="padding: 3px; background-color: #ffffff"></div></div>';
      this.container.innerHTML = '<div id="HHH_commentPopup" style="border: solid 1px black; position: absolute; width: 500px;"><div id="popupDummy"></div><div id="HHH_commentPopupText" class="entry-content comment-preview" style="padding: 3px; background-color: #ffffff"></div><div style="background-color: #F0F0E7; clear: both; height: 22px;"><div style="padding: 3px; background-color: #F0F0E7; float: left;"><a id="HHH_commentPopupLink" href="#">Перейти к комментарию</a></div><div style="float: left; padding: 3px;"><a id="popupClose" href="#">Закрыть</a></div></div><div style="clear: both;"></div></div>';
      document.body.appendChild(this.container);
      this.popup = document.getElementById('HHH_commentPopup');
      this.popupLink = document.getElementById('HHH_commentPopupLink');
      this.popupText = document.getElementById('HHH_commentPopupText');
      
      window.addEventListener('DOMMouseScroll', function(event) {
      
        if (HHHelper.timeout) {
          clearTimeout(HHHelper.timeout);
          HHHelper.timeout = null;
        }
        
        HHHelper.hideComment();
      
      }, false); 
      
      window.addEventListener('mousewheel', function(event) {
      
        if (HHHelper.timeout) {
          clearTimeout(HHHelper.timeout);
          HHHelper.timeout = null;
        }
        
        HHHelper.hideComment();
      
      }, false); 
      
      document.getElementById('popupClose').addEventListener('click', function(event) {
        if (HHHelper.timeout) {
          clearTimeout(HHHelper.timeout);
          HHHelper.timeout = null;
        }
        
        HHHelper.hideComment();
        event.stopPropagation();
        event.preventDefault();
        
        return false;
      
      }, false);
      
      var buffer = document.evaluate("//ul[@class='hentry']/li/div[@class='entry-content'][1]", this.comments, null, XPathResult.ANY_TYPE, null);
      
      var comment;
      while (comment = buffer.iterateNext()) {
        this.cache[comment.parentNode.id] = comment;
      }
    }
  },
  
  getElementTop : function(element) {
    var top = element.offsetTop;
    while (element = element.offsetParent) {
      top += element.offsetTop;
    }
    return top;
  },

  getElementLeft : function(element) {
    var left = element.offsetLeft;
    
    while (element = element.offsetParent) {
      left += element.offsetLeft;
    }
    return left;

  },
  
  hideComment : function() {
    HHHelper.container.style.display = 'none';
  },
  
  showComment : function(event) {
    var element = event.target.parentNode.parentNode.parentNode.parentNode;
    
    //Begin messy shit
    var header = element.parentNode.parentNode.childNodes[1].cloneNode(true);
    if (header.style.backgroundColor == '') {
      header.style.backgroundColor = '#ffffff';
    }
    header.childNodes[1].className = header.childNodes[1] + ' hentry';
    header.childNodes[3].style.display = 'none';
    HHHelper.popup.removeChild(HHHelper.popup.firstChild);
    HHHelper.popup.insertBefore(header, HHHelper.popup.firstChild);
    //End messy shit
    var commentId = element.parentNode.parentNode.id;
    HHHelper.popup.style.width = (element.offsetWidth + 20) + 'px';
    HHHelper.popupText.innerHTML = HHHelper.cache[commentId].innerHTML;
    HHHelper.popup.style.left = (HHHelper.getElementLeft(element) - 20) + 'px';
    HHHelper.popupLink.href = '#' + commentId;
    event.stopPropagation();
    event.preventDefault();
    HHHelper.container.style.visibility = 'hidden';
    HHHelper.container.style.display = 'block'; 
    HHHelper.popup.style.top = (HHHelper.getElementTop(element) - HHHelper.popup.offsetHeight) + 'px';
    HHHelper.container.style.visibility = '';
    if (HHHelper.timeout) {
      clearTimeout(HHHelper.timeout);
      HHHelper.timeout = null;
    }
    HHHelper.timeout = setTimeout(HHHelper.hideComment, 15000);
    return false;
  } 
}; 

window.addEventListener('load', function(event) { 

  HHHelper.initialize();

  if (HHHelper.comments != 'undefined') {
    var buffer = document.evaluate("//ul[@class='hentry']/li/div[1]/ul[1]", HHHelper.comments, null, XPathResult.ANY_TYPE, null);
    var metas = new Array();
    while (meta = buffer.iterateNext()) {
      metas.push(meta);
    }
    var meta;
    while (meta = metas.pop()) {
    
      var parentComment = meta.parentNode.parentNode.parentNode.parentNode;
      
      if (parentComment.nodeName == 'LI') {
        var locator = document.createElement('li');
        locator.className = 'bookmark';
        
        var locatorLink = document.createElement('a');
        locatorLink.href = '#';
        locatorLink.addEventListener('click', HHHelper.showComment, false);
        
        var locatorText = document.createTextNode('Re:');
      
        locatorLink.appendChild(locatorText);
        locator.appendChild(locatorLink);
        meta.appendChild(locator);
      }
      
    }

  }
}, false);