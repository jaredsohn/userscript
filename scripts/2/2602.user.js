// ==UserScript==
// @name           Delicious tag suggest
// @namespace      http://myjavaserver.com/~ksenji
// @description    Delicious tag suggest while searching one's own bookmarks. This script suggests the tags on keypress similar to google suggest
// @include        http://del.icio.us/*
// ==/UserScript==


function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/** function to add global styles from http://diveintogreasemonkey.org/ */
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function trim(str) {
  return str.replace(/^\s*|\s*$/g, "");
}

function Tag(tagName, url, freq) {
  this.tagName = tagName;
  this.url = url;
  this.freq = freq;
}
 
function getMatchedTags(tags, input, ignoreCase) {
  var matchedTags = [];
  var regexp = new RegExp("^" + (ignoreCase ? input.toLowerCase() : input));
  for(var i=0; i<tags.length; i++) {
    var tag = ignoreCase ? (tags[i].tagName).toLowerCase() : (tags[i].tagName);
    if(tag.match(regexp)) {
      matchedTags.push(tags[i]);
    }
  }
  return matchedTags;
}

function substrNotBetween(str, a, b) {
  var max = str.length;
  if((a>=0 && b>=0) && (a<=max && b<=max)) {
    return str.substring(0, a) + str.substring(b, max);
  }
  return str;
}

function setClassNameForTagDiv(div, index, className) {
  var childNodes = div.childNodes;
  for(var i=0; i<childNodes.length; i++) {
    childNodes[i].className = 'delicious_search_tag_suggestion_onmouseout';
  }
  if(index < childNodes.length) {
    childNodes[index].className = className;
  }
}


function suggest(event, input, inputSelected, div, tags) {
  var keyCode = event.which;
  var inputValue = input.value;
  if(keyCode && keyCode != 13) {
    var key = String.fromCharCode(keyCode);
    inputValue = trim((keyCode != 8) ? (inputValue + key) : (inputSelected ? (substrNotBetween(inputValue, input.selectionStart, input.selectionEnd)) : inputValue.substring(0, inputValue.length-1)));
  }
  div.innerHTML = '';
  var hasSuggestedTags = false;
  if(inputValue != '') {
    var matchedTags = getMatchedTags(tags, inputValue, true);
    hasSuggestedTags = (matchedTags.length > 0);
    for(var i=0; i<matchedTags.length; i++) {
      var tagDiv = document.createElement("div");
      tagDiv.innerHTML = matchedTags[i].tagName;
      tagDiv.className = 'delicious_search_tag_suggestion_onmouseout';
      tagDiv.setAttribute("onmouseover", "this.className='delicious_search_tag_suggestion_onmouseover';");
      tagDiv.setAttribute("onmouseout", "this.className='delicious_search_tag_suggestion_onmouseout';");
      tagDiv.setAttribute("onmousedown", "window.document.location.href='"+matchedTags[i].url+"';");
      
      var freqDiv = document.createElement("div");
      freqDiv.setAttribute("style", "position:absolute;display:inline;right:0px");
      freqDiv.innerHTML = matchedTags[i].freq;
      tagDiv.appendChild(freqDiv);
      
      div.appendChild(tagDiv);
    }
  }
  setClassNameForTagDiv(div, 0, 'delicious_search_tag_suggestion_onmouseover');
  div.style.display = hasSuggestedTags ? '' : 'none';
}

(function() {
  var result = xpath("//div[@id='sidebar']//li[@class='bundle fold']//a");
  var tags = (function() {
    var tags = [];
    for(var i=0; i<result.snapshotLength; i++) {
      var item = result.snapshotItem(i);
      tags.push(new Tag(item.firstChild.nodeValue, item.href, trim(item.previousSibling.firstChild.nodeValue)));
    }
    return tags.sort(function(aTag, bTag){
      return (aTag.tagName>bTag.tagName) ? 1 : (aTag.tagName<bTag.tagName) ? -1 : (function(){return bTag.freq-aTag.freq;})(); 
    });
  })();
  
  /** Get the top level input element and suggest tags when the user types in something in to it */
  var crumb = document.getElementById("crumb");
  var input = crumb.firstChild;
  var inputSelected = false;
  var index = 0;
  
  // suggestion div
  var div = document.createElement("div");
  div.id = "delicious_search_tag_suggestion";
  div.style.display = "none";
  document.body.appendChild(div);
  addGlobalStyle("#delicious_search_tag_suggestion{background:#fff;width:200px;border:1px solid;position:absolute;top:"+(crumb.offsetTop+crumb.offsetHeight)+"px;left:"+crumb.offsetLeft+"px;overflow:hidden}");
  addGlobalStyle(".delicious_search_tag_suggestion_onmouseover{font-size:70%;padding-top:2px;padding-bottom:2px;padding-right:2px;padding-left:2px;width:100%;color:#fff;background:#00f;}");
  addGlobalStyle(".delicious_search_tag_suggestion_onmouseout{font-size:70%;padding-top:2px;padding-bottom:2px;padding-right:2px;padding-left:2px;width:100%;color:#000;background:#fff;}");
  
  input.addEventListener("keypress", 
    function(event) {
      suggest(event, input, inputSelected, div, tags);
      inputSelected = false;
      var keyCode = event.keyCode;
      if(keyCode == 38) {
        if(index > 0) {
          index --; 
        }
        setClassNameForTagDiv(div, index, 'delicious_search_tag_suggestion_onmouseover');
      } else if(keyCode == 40) {
        if(index < div.childNodes.length-1) {
          index ++;
        }
        setClassNameForTagDiv(div, index, 'delicious_search_tag_suggestion_onmouseover');
      } else if(keyCode == 13) {
         eval(div.childNodes[index].getAttribute("onmousedown"));
      }
    }
  ,false);
  
  input.addEventListener("blur", 
    function(event) {
      div.style.display = 'none';
      inputSelected = false;
    }
  ,false);
  
  input.addEventListener("focus", 
    function(event) {
      suggest(event, input, inputSelected, div, tags);
      inputSelected = false;
    }
  ,false);  
  
  input.addEventListener("select", 
    function(event) {
      inputSelected = true;
    }
  ,false);      
})();