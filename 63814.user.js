// ==UserScript==
// @name           Twitter HTAC
// @namespace      http://www.paopao.name
// @description    Twitter hashtag auto complete
// @version        0.1
// @author         paopao
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var hashtags = [];  //hashtag array
  var tagsNumber = 500; //the max number of hashtags saved
  var hashString = "";  //hashtag joined string =hashtags.join("\x0f")
  var tagFreqs = {};  //hashtag frequency
  var curPattern = ""; //current pattern
  var completeFlag = 0; //auto complete processing flag
  var listIndex = -1; //suggests list index
  var suggestsNum = 10; //the max number of suggest list
  
  var inputBox = document.getElementById("status");
  var updateButton = document.getElementById("update-submit");
  var timeline = document.getElementById("timeline");
  if(!inputBox || !updateButton) return false;

  //insert CSS rules
  var cssRules = '#ac-list{position:absolute;list-style:none;cursor:default;text-align:left;text-indent:2px;font-size:110%;z-index:3000;background-color:white;border:1px solid black;-webkit-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);}' + '#ac-list li{width:100%;display:block;}' + '#ac-list li.ac-active{color:white;background-color:#2276BB;outline:none;}' + '#ac-list strong{font-size:110%;}';

  var headElement = document.getElementsByTagName("head")[0];
  var styleElements = headElement.getElementsByTagName("style");
  if(styleElements.length == 0) {
    var tempStyleElement = document.createElement('style');
    tempStyleElement.setAttribute("type", "text/css");
    headElement.appendChild(tempStyleElement);
  }
  var styleElement = styleElements[0];
  var media = styleElement.getAttribute("media");
  if(media != null && !/screen/.test(media.toLowerCase()) ){
    styleElement.setAttribute("media","screen");
  }
  styleElement.appendChild(document.createTextNode(cssRules));
  
  initAll();
  if(inputBox) {
    inputBox.addEventListener("keyup", inputBoxKeyup, true);
    inputBox.addEventListener("keydown", inputBoxKeydown, true);
  }
  if(updateButton) updateButton.addEventListener("click", updateClick, true);
  if(timeline) timeline.parentNode.addEventListener("DOMNodeInserted", timelineHashtag, true);
  
  //initiate the saved global variables
  function initAll() {
    //load global variables
    loadData();
    hashString = " " + hashtags.join(" ");
    
    //add timeline hashtags
    timelineHashtag();
  }
  
  //save data to local storage
  function saveData() {
    hashtags.sort(compare);
    if(window.localStorage.setItem) {
      window.localStorage.setItem("ac_hashtags", JSON.stringify(hashtags));
      window.localStorage.setItem("ac_tagfreqs", JSON.stringify(tagFreqs));
      return true;
    }
  }
  
  //load data from local storage
  function loadData() {
    if(window.localStorage.getItem) {
      hashtags = window.localStorage.getItem("ac_hashtags") ? JSON.parse(window.localStorage.getItem("ac_hashtags")) : hashtags;
      tagFreqs = window.localStorage.getItem("ac_tagfreqs") ? JSON.parse(window.localStorage.getItem("ac_tagfreqs")) : tagFreqs;
      return true;
    }
  }
  
  //mouseover event listener for suggest list
  function ACListMouseover(e) {
    var ele = e.target;
    if(ele.tagName == "STRONG") ele = ele.parentNode;
    if(ele.tagName != "LI") return true;
    e.stopPropagation();
    var acList = document.getElementById("ac-list");
    if(listIndex != -1) {
      acList.childNodes[listIndex].className = "";
    }
    listIndex = ele.getAttribute("rel");
    acList.childNodes[listIndex].className = "ac-active";
  }
  
  //mouse click event listener for suggest list
  function ACListClick(e) {
    var ele = e.target;
    if(ele.tagName == "STRONG") ele = ele.parentNode;
    if(ele.tagName != "LI") return true;
    e.stopPropagation();
    changeSuggest();
    curPattern = "";
    completeFlag = 0;
    closeACList();
  }
  
  //update button click event listener, add tags
  function updateClick() {
    var r = new RegExp(" #\\w+", "gm");
    var b = inputBox.value.match(r);
    if(b) {
      for(var i = 0; i < b.length; i++) {
        if(b.length > 2) addTag(b[i].substr(2), true);
      }
    }
    r = new RegExp("^#\\w+", "gm");
    b = inputBox.value.match(r);
    if(b) {
      for(var i = 0; i < b.length; i++) {
        if(b.length > 1) addTag(b[i].substr(1), true);
      }
    }
    saveData();
    return true;
  }
  
  //inputBox Keydown event listener for suggest list
  function inputBoxKeydown(e) {
    var acList = document.getElementById("ac-list");
    if(acList) {
      var acItems = acList.childNodes;
      var acItemNum = acItems.length;
      if(e.keyCode == 40) { //move down
        e.preventDefault();
        if(listIndex < acItemNum - 1) {
          if(listIndex != -1) {      
            acItems[listIndex].className = "";
          }
          listIndex++;
          acItems[listIndex].className = "ac-active";
        } else {
          acItems[listIndex].className = "";
          listIndex = -1;
        }
        changeSuggest();
        return true;
      } else if(e.keyCode == 38) { //move up
        e.preventDefault();
        if(listIndex > -1) {  
          acItems[listIndex].className = "";
          listIndex--;
          if(listIndex != -1) acItems[listIndex].className = "ac-active";
        } else {
          listIndex = acItemNum - 1;
          acItems[listIndex].className = "ac-active";
        }
        changeSuggest();
        return true;
      } else if(e.keyCode == 13) { //enter
        e.preventDefault();
        curPattern = "";
        completeFlag = 0;
        closeACList();
        return true;
      }
    }
    return true;
  }
  
  //inputBox Keyup event listener
  function inputBoxKeyup(e) {
    //inputBox Keyup event listener for suggest list
    var acList = document.getElementById("ac-list");
    if(acList) {
      if(e.keyCode == 40) { //move down
        e.preventDefault();
        return true;
      } else if(e.keyCode == 38) { //move up
        e.preventDefault();
        return true;
      } else if(e.keyCode == 13) { //enter
        e.preventDefault();
        return true;
      }
    }
    
    if(!inputBox.value.length) {
      curPattern = "";
      completeFlag = 0;
      closeACList();
      return true;
    }
    var lastChar = inputBox.value.substr(inputBox.value.length-1);
    if(lastChar == "#") { //if a new hashtag begins
      curPattern = "";
      if(inputBox.value.length == 1 || inputBox.value.substr(inputBox.value.length-2, 1) == " " || inputBox.value.substr(inputBox.value.length-2, 1) == "\n") { //a new hashtag begins
        completeFlag = 1;
        showACList();
      } else { //not a new hashtag
        completeFlag = 0;
        closeACList();
      }
      return true;
    } else if(lastChar == " " || lastChar == "\n") { //if a hashtag complete
      if(completeFlag) { //a hashtag complete
        curPattern = "";
        completeFlag = 0;
        closeACList();
        //var tag = inputBox.value.substring(inputBox.value.lastIndexOf("#") + 1, inputBox.value.length - 1);
        //addTag(tag, true);
      }
      return true;
    } else { //if hashtag pattern changes
      if(completeFlag) {
        var pattern = inputBox.value.substr(inputBox.value.lastIndexOf("#") + 1);
        curPattern = pattern;
        var suggests = regSearch(pattern);
        if(suggests)
          showACList(suggests);
        else
          closeACList();
      }
      return true;
    }
  }
  
  //show auto complete list box
  function showACList(suggests) {
    suggests = suggests || hashtags;
    if(!suggests.length) closeACList();
    var acList = document.getElementById("ac-list");
    if(!acList) { //create ac list box
      acList = document.createElement("ul");
      acList.id = "ac-list";
      acList.style.width = (inputBox.offsetWidth - 2) + "px";
      //var rect = inputBox.getBoundingClientRect();
      //acList.style.top = rect.bottom + window.pageYOffset + "px";
      //acList.style.left = rect.left + window.pageXOffset + "px";
      //var pos = findPos(inputBox);
      //acList.style.left = pos[0] + "px";
      //acList.style.top = pos[1] + inputBox.offsetHeight + "px";
      //document.body.appendChild(acList);
      inputBox.parentNode.style.position = "relative";
      inputBox.parentNode.insertBefore(acList, inputBox.nextSibling);
      acList.style.top = inputBox.offsetTop + inputBox.offsetHeight + "px";
      //bind event listener for mouse
      acList.addEventListener("mouseover", ACListMouseover, true);
      acList.addEventListener("click", ACListClick, true);
    }
    //change ac list content
    var tempTags = [];
    //tempTags[0] = '<li class="ac-active">' + suggests[0] + '</li>';
    var maxNum = suggests.length > suggestsNum ? suggestsNum : suggests.length;
    for(var i = 0; i < maxNum; i++) {
      if(suggests[i][0] == " ") suggests[i] = suggests[i].substr(1);
      var firstPart = curPattern == "" ? "" : suggests[i].substr(0, curPattern.length);
      var lastPart = curPattern == "" ? suggests[i] : suggests[i].substr(curPattern.length);
      tempTags[i] = '<li rel="' + i + '">' + firstPart + "<strong>" + lastPart + "</strong></li>";
    }
    acList.innerHTML = tempTags.join("");
    listIndex = -1;
  }
  
  //close auto complete list box
  function closeACList() {
    var acList = document.getElementById("ac-list");
    if(acList) acList.parentNode.removeChild(acList);
    listIndex = -1;
  }
  
  //change input box suggest
  function changeSuggest() {
    var suggest = "";
    if(listIndex == -1) {
      suggest = curPattern;
    } else {
      var acList = document.getElementById("ac-list");
      if(acList && acList.childNodes.length > listIndex) suggest = acList.childNodes[listIndex].textContent;
    }
    inputBox.focus();
    inputBox.value = inputBox.value.substring(0, inputBox.value.lastIndexOf("#") + 1) + suggest;
    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
  }
  
  //find position of an element from ppk
  function findPos(obj) {
	  var curleft = 0;
	  var curtop = 0;
	  if (obj.offsetParent) {
      do {
			  curleft += obj.offsetLeft;
			  curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return [curleft,curtop];
  }
  
  //add timeline hashtags
  function timelineHashtag() {
    var tagLinks = timeline.getElementsByClassName("hashtag");
    if(!tagLinks.length) return true;
    for(var i = tagLinks.length - 1; i > -1; i--) {
      var tag = tagLinks[i].textContent.substr(1);
      addTag(tag);
    }
    saveData();
  }
  
  //trim tag for regexp
  function trimTag(tag) {
    return tag;
  }
  
  //add tag to hashtags array
  function addTag(tag, owner) {
    if(hashString.indexOf(tag) == -1) {
      if(hashtags.length >= tagsNumber) hashtags.length = tagsNumber-1;
      hashtags.unshift(tag);
      tagFreqs[tag] = owner ? 1 : 0;
      hashtags.sort(compare);
      hashString = " " + hashtags.join(" ");
    } else {
      tagFreqs[tag] += 1;
      hashtags.sort(compare);
      if(!owner) {
        tagFreqs[tag] -= 1;
        hashtags.sort(compare);
      }
      hashString = " " + hashtags.join(" ");
    }
    return true;
  }
  
  //fast search use reg
  function regSearch(pattern) {
    pattern = trimTag(pattern);
    var r = new RegExp(" " + pattern + "\\w*", "ig");
    var b = hashString.match(r);
    return b;
  }
  
  //compare tag frequency
  function compare(a,b) {
    return tagFreqs[b] - tagFreqs[a];
  }
})();
