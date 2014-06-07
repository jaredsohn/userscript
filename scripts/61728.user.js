// ==UserScript==
// @name           Twitter Shortcut Lite
// @namespace      http://www.paopao.name
// @description    !This version is not supposed to work with pbtweet or other similar scripts! Provide keyboard shortcut for twitter web control
// @version        0.3
// @author         paopao
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var bgColor = "#CCCCFF";
  var current_li = false;
  var inputBox = document.getElementById("status");
  var dmBox = document.getElementById("text");

  //insert CSS rules
  var cssRules = '#ts-list{position:absolute;width:300px;left:500px;top:0px;z-index:1000;background-color:white;border:7px solid white;-webkit-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);}' + '#ts-list a:link, #ts-list a:visited{display:block;}' + '#ts-list a:hover, #ts-list a:active, #ts-list a:focus{color:white;background-color:#2276BB;outline:none;}';

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
  
  //keycodes
  var keyNum = {
    "27": "esc",  //input box focus or not
    "13": "enter", //Ctrl+Enter for sending tweet
    "38": "up",
    "40": "down",
    "65": "a",  //add favorite
    "68": "d",  //delete tweet
    "70": "f",  //latest tweet on page
    "72": "h", //refresh home
    "76": "l",  //oldest tweet on page
    "77": "m",  //direct message to sb.
    "78": "n",  //next tweet (go up)
    "79": "o",  //goto the replies page
    "80": "p",  //previous tweet (go down)
    "82": "r",  //reply to sb.
    "84": "t", //retweet
    "86": "v" //open links
  };

  //listen to keydown event
  
  if(inputBox) {
    inputBox.addEventListener("keydown", inputBoxReceiver, true);
    document.addEventListener("keydown", otherReceiver, false);
  }
  if(dmBox) dmBox.addEventListener("keydown", inputBoxReceiver, true);

  //handle keyboard events for input box
  function inputBoxReceiver(e) {
    e.stopPropagation();
    var keyName = keyNum[e.keyCode];
    if(keyName == "esc"){
      e.preventDefault();
      inputBox.blur();
      if(dmBox) dmBox.blur();
      if(current_li)
        gotoTweet(current_li);
      else
        firstTweet();
      return false;
    } else if(keyName == "enter" && e.ctrlKey) {
      e.preventDefault();
      document.getElementById("update-submit").click();
      inputBox.blur();
      if(dmBox) dmBox.blur();
      if(current_li)
        gotoTweet(current_li);
      else
        firstTweet();
      return false;
    }
    return true;
  }
  
  //handle keyboard events for whole page
  function otherReceiver(e) {
    //exclude the search input box
    if (e.target.id == "sidebar_search_q") return true;
    var keyName = keyNum[e.keyCode];
    switch(keyName) {
      case "esc":
        var nowBox = inputBox;
        if(document.getElementById("status_update_box").style.display == "none") nowBox = dmBox;
        nowBox.focus();
        scrollToMiddle(nowBox);
        break;
      case "a":
        addFavorite();
        break;
      case "d":
        delTweet();
        break;
      case "f":
        firstTweet();
        break;
      case "h":
        refreshHome();
        break;
      case "l":
        lastTweet();
        break;
      case "m":
        dMessage(e);
        break;        
      case "n":
        nextTweet();
        break;
      case "o":
        replies();
        break;
      case "p":
        previousTweet();
        break;
      case "r":
        replyTo(e);
        break;
      case "t":
        retweet(e);
        break;
      case "v":
        openLinks();
        break;
      default:
        //alert(e.keyCode +" " + e.target.id);
        return true;  
    }
    return false;
  }
  
  //add favorite
  function addFavorite() {
    if(!current_li) return false;
    var favSpan = current_li.getElementsByClassName("actions");
    if(!favSpan) return false;
    var favLink = favSpan[0].getElementsByTagName("a")[0];
    fireEvent(favLink, "click");
  }
  
  //delete tweet
  function delTweet() {
    if(!current_li) return false;
    var delSpan = current_li.getElementsByClassName("del");
    if(!delSpan.length) return false;
    var delLink = delSpan[0].getElementsByTagName("a")[0];
    nextTweet();
    fireEvent(delLink, "click");
  }
  
  //refresh home
  function refreshHome() {
    current_li = false;
    if(document.getElementById("home_tab")) //at home page
      fireEvent(document.getElementById("home_tab").firstChild, "click");
    else
      window.location = document.getElementById("home_link").href;
  }
  
  //goto the replies page
  function replies() {
    current_li = false;
    if(document.getElementById("replies_tab"))
      fireEvent(document.getElementById("replies_tab").firstChild, "click");
  }
    
  //goto tweet
  function gotoTweet(ele) {
    unsetCurrentLi();
    setCurrentLi(ele);
  }
  
  //goto next tweet
  function nextTweet() {
    if(!current_li) {
      firstTweet();
      return true;
    }
    var target_li = current_li.previousSibling || current_li;
    if(hasClass(target_li, "buffered")) {
      var results_update = document.getElementById("results_update");
      if(results_update && results_update.style.display != "none") {
        fireEvent(results_update,"click");
        nextTweet();
      }
      return true;
    }
    if(!current_li.previousSibling) {
      var results_update = document.getElementById("results_update");
      if(results_update) {
        fireEvent(results_update,"click");
      }    
      return true;
    }
    //after updating a new tweet, a blank text node will appear after the new tweet
    if(target_li.tagName != "LI") {
      if(!target_li.previousSibling) {
        var results_update = document.getElementById("results_update");
        if(results_update) {
          fireEvent(results_update,"click");
        }
        return true;
      }
      unsetCurrentLi();
      current_li = target_li;
      nextTweet();
      return false;
    }
    gotoTweet(target_li);
  }

  //goto previous tweet
  function previousTweet() {
    if(!current_li) {
      firstTweet();
      return true;
    }
    var target_li = current_li.nextSibling || current_li;
    if(!current_li.nextSibling) {
      var more = document.getElementById("more");
      if(more) fireEvent(more,"click");
      return true;
    }
    if(target_li.tagName != "LI") {
      unsetCurrentLi();
      current_li = target_li;
      previousTweet();
      return false;
    }
    gotoTweet(target_li);  
  }
  
  //goto latest tweet on page
  function firstTweet() {
    var timeline = document.getElementById("timeline");
    var target_li = document.getElementById("timeline").firstChild;
    while(!target_li.style || hasClass(target_li, "buffered")) {
      target_li = target_li.nextSibling;
    }
    gotoTweet(target_li);
  }
  
  //goto oldest tweet on page
  function lastTweet() {
    var target_li = document.getElementById("timeline").lastChild;
    if(!target_li.style) target_li = target_li.previousSibling;
    gotoTweet(target_li);
  }
  
  //direct message to sb.
  function dMessage(e) {
    if(!current_li) return true;
    e.preventDefault();
    var tweetUrl = current_li.getElementsByClassName('entry-date')[0].href;
		var replyTo = tweetUrl.match(/twitter\.com\/([^\/]+)\/status/)[1];
		inputBox.value = "D " + replyTo + " ";
		
		inputBox.focus();
	  scrollToMiddle(inputBox);
	  inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
  }
  
  //reply to sb.
  function replyTo(e) {
    if(!current_li) return true;
    var replySpan = current_li.getElementsByClassName("reply");
    if(!replySpan) return true;
    var replyLink = replySpan[0].getElementsByTagName("a")[0];
    e.preventDefault();
    fireEvent(replyLink, "click");
  }
  
  //open links
  function openLinks() {
    if(!current_li) return false;
    var urls = current_li.getElementsByClassName("web");
    if(urls.length == 1) {
      window.open(urls[0].href);
      return true;
    }
    if(urls.length > 1) buildListBox(urls, "_blank");
  }

  //retweet
  function retweet(e) {
    if(!current_li) return true;
    e.preventDefault();
	  var tweetUrl = current_li.getElementsByClassName('entry-date')[0].href;
		var replyTo = tweetUrl.match(/twitter\.com\/([^\/]+)\/status/)[1];
		var tweetId = tweetUrl.match(/\/status\/([0-9]+)$/)[1];
		inputBox.value = "RT @" + replyTo + ": " + linkRemover(current_li.getElementsByClassName("entry-content")[0]);
			
		document.getElementById("in_reply_to_status_id").value = tweetId;
	  document.getElementById("in_reply_to").value = replyTo;

	  inputBox.focus();
	  scrollToMiddle(inputBox);
	  inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
  }

  //build links list box
  function buildListBox(links, target) {
    var listBox = document.getElementById('ts-list');
    if(listBox) listBox.parentNode.removeChild(listBox);
    target = target || "";
    var list = [];
    for(var i = 0; i < links.length; i++) {
      var text = links[i].title || links[i].textContent;
      list[i] = '<a href="' + links[i].href + '" target="' + target + '">' + text + '</a>';
    }
    listBox = document.createElement('div');
    listBox.id = "ts-list";
    listBox.innerHTML = list.join("");
    var listLinks = listBox.getElementsByTagName("a");
    var index = 0;
    listBox.addEventListener("keydown", function(e){
      e.stopPropagation();
      var keyName = keyNum[e.keyCode];
      switch(keyName) {
        case "esc":
          listBox.parentNode.removeChild(listBox);
          break;
        case "up":
          e.preventDefault();
          if(index){
            index--;
            listLinks[index].focus();
          }
          break;
        case "down":
          e.preventDefault();
          if(index < listLinks.length - 1 ){
            index++;
            listLinks[index].focus();
          }
          break;
      }
      return false;
    }, false);
    current_li.appendChild(listBox);
    listLinks[0].focus();
  }
  
  //bind click event listener to timeline's parent node
  var timeline = document.getElementById('timeline');
  if(timeline) {
    timeline.parentNode.addEventListener("click",function (e) {
      if(e.target.tagName == "LI" || e.target.tagName == "SPAN" || e.target.tagName == "DIV") {
        if(current_li.style) unsetCurrentLi();          
        current_li = getParentLi(e.target);
        if(current_li) setCurrentLi(current_li);
      }
      return true;
    },false);
  }
  
  //set current li's background color and event
  function setCurrentLi(ele) {
    current_li = ele;
    current_li.style.backgroundColor = bgColor;
    current_li.focus();
    //current_li.scrollIntoView();
    scrollToMiddle(current_li);
  }

  //unset current li's background color and event
  function unsetCurrentLi() {
    if(!current_li.style) return true;
    current_li.style.backgroundColor = "";
    current_li.blur();
  }
  
  //retreiving for parent li
  function getParentLi(ele) {
    if(ele.tagName == "LI")  return ele;
    while(ele.tagName != "LI") {
      ele = ele.parentNode;
      if(ele == document)  return false;
    }
    return ele;
  }
  
  //fire javascript event
  function fireEvent(ele,e) {
     if (document.createEvent) {
         // dispatch for firefox + others
         var evt = document.createEvent("HTMLEvents");
         evt.initEvent(e, true, true ); // event type,bubbling,cancelable
         //evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
         return !ele.dispatchEvent(evt);
     } else {
         // dispatch for IE
         var evt = document.createEventObject();
         return ele.fireEvent('on'+e,evt)
     }
  }
  
  //scroll element to the middle of the view
  function scrollToMiddle(ele) {
    var rect = ele.getBoundingClientRect();
    var scrollY = rect.top + window.pageYOffset - window.innerHeight/2 + ele.offsetHeight/2;
    window.scrollTo(0, scrollY);
  }
  
  //remove link in content
  function linkRemover(target)
  {
	  var tempTarget = target.cloneNode(true);
	  try
	  {  // remove strong tag
		  tempTarget.removeChild(tempTarget.getElementsByTagName('strong')[0]);
	  } catch(err){
		  //alert(err);
	  }
	  var links = tempTarget.getElementsByTagName('a');
	  //var num_pb_link = pb_link.length;
	  var removed_str = "";
	  for( var i = 0 ; i < links.length ; i++ )
	  {
		  try
		  { //possible when real-url is exist.
			  if( links[i].innerText == '@' )
			  {	// in order to remove search tab
				  var atmark_span = document.createElement('span');
				  atmark_span.innerHTML = '@' ;
				  links[i].parentNode.insertBefore( atmark_span , links[i].nextSibling );
				  links[i].parentNode.removeChild( links[i] );
			  }
			  if(!(hasClass(links[i],'hashtag') || hasClass(links[i],'sname') || links[i].target != "_blank"))
			  {
					  links[i].innerText = links[i].href;
			  }
		  } catch(err) {}
	  }
	  removed_str = tempTarget.textContent;
	  return removed_str;
  }
  
  //test for classname
  function hasClass(ele,cls)
  {
	  try{
		    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		} catch(err) {
		    return false;
	  }
  }
})();
