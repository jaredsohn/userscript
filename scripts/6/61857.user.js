// ==UserScript==
// @name           Twitter Shortcut
// @namespace      http://www.paopao.name
// @description    Provide keyboard shortcut for twitter web control
// @version        0.4
// @author         paopao
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var bgColor = "#CCCCFF";
  var current_li = false, liListener;
  var inputBox = document.getElementById("status");
  var dmBox = document.getElementById("dm_update_box");
  var searchBox = document.getElementById("sidebar_search_q");
  var current_ids = {};
  var pbplus = false;

  //insert CSS rules
  var cssRules = '#ts-list{position:absolute;width:300px;left:520px;top:0px;z-index:1000;background-color:white;border:7px solid white;-webkit-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);}' + '#ts-list a:link, #ts-list a:visited{display:block;}' + '#ts-list a:hover, #ts-list a:active, #ts-list a:focus{color:white;background-color:#2276BB;outline:none;}' + '#menu-list{position:fixed;top:30px;right:50px;width:300px;z-index:2000;background-color:white;border:7px solid white;-webkit-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);}' + '#menu-list a:link, #menu-list a:visited{display:block;text-align:left;}' + '#menu-list a:hover, #menu-list a:active, #menu-list a:focus{color:white;background-color:#2276BB;outline:none;}' + '#help-list{position:fixed;top:5px;left:5px;width:500px;z-index:3000;background-color:white;border:7px solid white;-webkit-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);}' + '#help-list p{text-align:left;}' + '#help-list em{color:#0000FF;}';

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
    "67": "c",  //cancel for official retweet confirm dialog
    "68": "d",  //delete tweet
    "69": "e",  //official retweet
    "70": "f",  //latest tweet on page
    "71": "g",  //translate tweet
    "72": "h",  //refresh home
    "73": "i",  //show Lists menu
    "76": "l",  //oldest tweet on page
    "77": "m",  //direct message to sb.
    "78": "n",  //next tweet (go up)
    "79": "o",  //show Trending Topics
    "80": "p",  //previous tweet (go down)
    "82": "r",  //reply to sb. or Shift+r to all
    "83": "s",  //show Saved Searches
    "84": "t",  //retweet
    "85": "u",  //show navigation menu
    "86": "v",  //open links
    "89":"y"  //"yes" for official retweet confirm dialog
  };

  //listen to keydown event  
  if(inputBox) {
    document.addEventListener("keydown", otherReceiver, false);
    inputBox.addEventListener("keydown", inputBoxReceiver, true);
  }
  if(dmBox) dmBox.addEventListener("keydown", inputBoxReceiver, true);
  if(searchBox) searchBox.addEventListener("keydown", inputBoxReceiver, true);
  
  //handle keyboard events for input box
  function inputBoxReceiver(e) {
    e.stopPropagation();
    var keyName = keyNum[e.keyCode];
    if(keyName == "esc"){
      e.preventDefault();
      e.target.blur();
      loadCurrentLi();
      /*
      if(current_li)
        gotoTweet(current_li);
      else
        firstTweet();
      */
      return false;
    } else if(keyName == "enter" && e.ctrlKey) {
      e.preventDefault();
      if(e.target.id == "status")
        document.getElementById("update-submit").click();
      else if(e.target.id == "text")
        document.getElementById("dm-submit").click();
      /* don't jump to current li because the input box will get focus after updating
      inputBox.blur();
      if(dmBox) dmBox.blur();
      if(current_li)
        gotoTweet(current_li);
      else
        firstTweet();
      */
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
        if(isPbplus()) {
          fireEvent(pbplus, "click");
          return true;
        }
        var nowBox = inputBox;
        if(window.location.hash == "#inbox" || window.location.hash == "#sent")
          nowBox = document.getElementById("direct_message_user_id");
        nowBox.focus();
        scrollToMiddle(nowBox);
        break;
      case "a":
        if(e.shiftKey)
          addSearch(); //save or remove search result at search page
        else
          addFavorite();
        break;
      case "c":
        cancelButton();
        break;
      case "d":
        delTweet();
        break;
      case "e":
        officialRetweet();
        break;
      case "f":
        firstTweet();
        break;
      case "g":
        if(e.shiftKey)
          gotoMark(); //go to pbtweet+ read mark
        else
          transTo();
        break;
      case "h":
        if(e.shiftKey)
          help(); //show help box
        else
          refreshHome();
        break;
      case "i":
        showMenu("Lists");
        break;
      case "l":
        lastTweet();
        break;
      case "m":
        if(e.shiftKey)
          markTweet();  //mark or unmark pbtweet+ read mark
        else {
          e.preventDefault();
          dMessage(e);
        }
        break;
      case "n":
        nextTweet();
        break;
      case "o":
        showMenu("Trending Topics");
        break;
      case "p":
        if(e.shiftKey)
          pinMark(); //pin the pbtweet+ read mark
        else 
          previousTweet();
        break;
      case "r":
        e.preventDefault();
        if(e.shiftKey)
          replyAll();
        else
          replyTo();
        break;
      case "s":
        if(e.shiftKey) {
          if(searchBox) { //goto search box
            e.preventDefault();
            searchBox.focus();
            scrollToMiddle(searchBox);
          }
        } else {
          showMenu("Saved Searches");
        }
        break;
      case "t":
        if(e.shiftKey)
          changeTab(); //change tabs at direct message or retweet page
        else {
          e.preventDefault();
          retweet(e);
        }
        break;
      case "u":
        showMenu("Navigation");
        break;
      case "v":
        openLinks();
        break;
      case "y":
        yesButton();
        break;
      default:
        //alert(e.keyCode +" " + e.target.id);
        return true;  
    }
    return false;
  }

  //add Search
  function addSearch() {
    var link = document.getElementById("heading").getElementsByTagName("a");
    if(!link.length) return false;
    fireEvent(link[0], "click");
  }

  //add favorite
  function addFavorite() {
    if(!current_li) return true;
    var favLink = current_li.getElementsByClassName("fav-action");
    if(!favLink) return true;
    //fireEvent(favLink[0], "click");
    // more than one favorite
    var pbfavLinks = current_li.getElementsByClassName("pb-fav-action");
    if(!pbfavLinks.length) {
      fireEvent(favLink[0], "click");
      return true;
    }
    var links = [];
    links.push(favLink[0]);
    for(var i = 0; i < pbfavLinks.length; i++) links.push(pbfavLinks[i]);
    buildListBox(links, "_blank");
  }
    
  //delete tweet
  function delTweet() {
    if(!current_li) return true;
    var delSpan = current_li.getElementsByClassName("del");
    if(!delSpan.length) return true;
    var delLink = delSpan[0].getElementsByTagName("a")[0];
    nextTweet();
    fireEvent(delLink, "click");
    return true; 
  }

  //official retweet
  function officialRetweet() {
    if(!current_li) return false;
    var rtSpan = current_li.getElementsByClassName("retweet-link");
    var undoLink = current_li.getElementsByClassName("undo");
    if(undoLink.length) {
      fireEvent(undoLink[0], "click");
      return true;
    }
    if(!rtSpan.length) return false;
    var rtLink = rtSpan[0].getElementsByTagName("a")[0];
    fireEvent(rtLink, "click");
  }
  
  //"yes" to official retweet inline form controll
  function yesButton() {
    var buttonDiv = document.getElementsByClassName("inline-form-buttons");
    if(!buttonDiv.length) return false;
    fireEvent(buttonDiv[0].getElementsByTagName("button")[0], "click");
  }
  
  //cancel official retweet inline form controll
  function cancelButton() {
    var buttonDiv = document.getElementsByClassName("inline-form-buttons");
    if(!buttonDiv.length) return false;
    fireEvent(buttonDiv[0].getElementsByTagName("span")[0], "click");
  }

  //show help box
  function help() {
    var helpBox = document.getElementById('help-list');
    if(helpBox) {
      helpBox.parentNode.removeChild(helpBox);
      return true;
    }
    
    helpBox = document.createElement('div');
    helpBox.id = "help-list";
    helpBox.innerHTML = "<h3>Shortcut Help</h3><p><em>esc</em> - input or search box focus or not, hide menu box or other list<br /><em>Ctrl+Enter</em> - send tweet<br /><strong>shortcuts below only work when input box or search box lose focus</strong><br /><em>a</em> - add favorite<br /><em>Shift+a</em> - save or remove search result at search page<br /><em>c</em> - cancel for official retweet confirm dialog<br /><em>d</em> - delete tweet<br /><em>e</em> - official retweet<br /><em>f</em> - latest tweet on page<br /><em>g</em> - translate tweet (pbtweet/pbtweet+)<br /><em>Shift+g</em> - go to my read mark (pbtweet+)<br /><em>h</em> - refresh home page's timeline, not the whole page<br /><em>Shift+h</em> - show or hide help box<br /><em>i</em> - show Lists menu<br /><em>l</em> - oldest tweet on page<br /><em>m</em> - direct message to sb.<br /><em>Shift+m</em> - add or remove my read mark (pbtweet+)<br /><em>n</em> - next tweet (go up), when you reach the top of the timeline, use this shortcut to show official new tweets<br /><em>o</em> - show Trending Topics<br /><em>p</em> - previous tweet (go down), when you reach the bottom of the timeline, use this shortcut to get more tweets<br /><em>Shift+p</em> - move pin to my read mark (pbtweet+)<br /><em>r</em> - reply to sb.<br /><em>Shift+r</em> - reply to all<br /><em>s</em> - show Saved Searches<br /><em>Shift+s</em> - goto search box<br /><em>t</em> - retweet<br /><em>Shift+t</em> - change tabs at direct message or retweet page<br /><em>u</em> - show navigation menu<br /><em>v</em> - open links<br /><em>y</em> - yes for official retweet confirm dialog<br /></p>";
    
    /*
    helpBox.addEventListener("keydown", function(e){
      e.stopPropagation();
      var keyName = keyNum[e.keyCode];
      if(keyName == "esc") {
        helpBox.parentNode.removeChild(helpBox);
      }
      return false;
    }, false);
    */
    
    document.body.appendChild(helpBox);
    //helpBox.focus();
  }
  
  //refresh home
  function refreshHome() {
    current_li = false;
    if(document.getElementById("home_tab")) //at home page
      fireEvent(document.getElementById("home_tab").firstChild, "click");
    else
      window.location = document.getElementById("home_link").href;
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
    if(!current_li.previousSibling) {
      var results_update = document.getElementById("results_update");
      if(results_update) {
        fireEvent(results_update,"click");
      }
      return true;
    }    
    if(hasClass(target_li, "buffered")) {
      var results_update = document.getElementById("results_update");
      if(results_update && results_update.style.display != "none") {
        fireEvent(results_update,"click");
        nextTweet();
      }
      return true;
    }
    //after updating a new tweet, a blank text node will appear after the new tweet
    if(target_li.tagName != "LI") {
      if(!target_li.previousSibling) {
        var results_update = document.getElementById("results_update");
        if(results_update && results_update.style.display != "none") {
          fireEvent(results_update,"click");
        }
        return true;
      }    
      unsetCurrentLi();
      current_li = target_li;
      nextTweet();
      return false;
    }    
    if(target_li.style.display == "none") {
      unsetCurrentLi();
      current_li = target_li;
      nextTweet();
      return true;
    }
    gotoTweet(target_li);
  }

  //pin the pbtweet+ read mark
  function pinMark() {
    var markLi = timeline.getElementsByClassName("read-mark");
    if(!markLi.length) return true;
    var target_li = markLi[0].previousSibling;
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
      if(!target_li.nextSibling) {
        var more = document.getElementById("more");
        if(more) fireEvent(more,"click");
        return true;
      }     
      unsetCurrentLi();
      current_li = target_li;
      previousTweet();
      return false;
    }
    if(target_li.style.display == "none") {
      unsetCurrentLi();
      current_li = target_li;
      previousTweet();
      return true;
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
    while(!target_li.style) {
      target_li = target_li.previousSibling;
    }
    gotoTweet(target_li);
  }

  //reply to all
  function replyAll() {
    if(!current_li) return false;
    if(isPbplus()) {
     var raSpans = current_li.getElementsByClassName("pb-all");
     if(!raSpans.length) return true;
     if(raSpans.length == 1){
       fireEvent(raSpans[0].firstChild, "click");
       return true;
     } else {
       var raLinks = [];
       for(var i = 0; i < raSpans.length; i++) raLinks.push(raSpans[i].firstChild);
       buildListBox(raLinks, "_blank");
       return true;
     }
    }
    var tweetUrl = current_li.getElementsByClassName('entry-date');
    if(tweetUrl.length == 1) {
      var replySpan = current_li.getElementsByClassName("reply");
      if(!replySpan.length) return false;
      var replyLink = replySpan[0].getElementsByTagName("a")[0];
      fireEvent(replyLink, "click");
      return true;
    
		  var replyTo = tweetUrl[0].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  inputBox.value = "D " + replyTo + " ";
		
		  inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  } else if(tweetUrl.length > 1) {
	    var replyIds = "";
	    for(var i = 0; i < tweetUrl.length; i++) {
	      var replyTo = tweetUrl[i].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
	      if(replyIds.indexOf(replyTo) == -1)
  	      replyIds += "@" + replyTo + " ";
	    }
	    var replyTo = tweetUrl[0].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  var tweetId = tweetUrl[0].href.match(/\/status\/([0-9]+)$/)[1];
			
		  document.getElementById("in_reply_to_status_id").value = tweetId;
	    document.getElementById("in_reply_to").value = replyTo;    
	    inputBox.value = replyIds;
		
		  inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  }
  }
  
  //reply to sb.
  function replyTo() {
    if(!current_li) return false;
    if(isPbplus()) {
      var reSpans = current_li.getElementsByClassName("pb-re");
      if(!reSpans.length) return true;
      if(reSpans.length == 1) {
        fireEvent(reSpans[0].firstChild, "click");
      } else {
        var reLinks = [];
        for(var i = 0; i < reSpans.length; i++) reLinks.push(reSpans[i].firstChild);
        buildListBox(reLinks, "_blank");
      }
      return true;
    }
    var replySpan = current_li.getElementsByClassName("reply");
    if(!replySpan.length) return false;
    var replyLink = '';
    if (replySpan[0].tagName == "A") { //search result page
      replyLink = replySpan[0];
    } else {
      replyLink = replySpan[0].getElementsByTagName("a")[0];
    }
    var pbreplySpans = current_li.getElementsByClassName("pb-reply");
    if(!pbreplySpans.length) {
      fireEvent(replyLink, "click");
      return true;
    }
    var links = [];
    links.push(replyLink);
    for(var i = 0; i < pbreplySpans.length; i++) {
      try {
        links.push(pbreplySpans[i].getElementsByTagName("a")[0]);
      } catch(err) {}
    }
    buildListBox(links);
  }

  //go to pbtweet+ read mark
  function gotoMark() {
    if(!isPbplus()) return true;
    var markBox = document.getElementById("read-mark-box");
    if(!markBox) return true;
    fireEvent(markBox, "click");
  }

  //translate tweet
  function transTo() {
    if(!current_li) return false;
    var transSpan = current_li.getElementsByClassName("pb-trans");
    if(!transSpan.length) return false;
    if(isPbplus()) {
     if(transSpan.length == 1) {
       fireEvent(transSpan[0].firstChild, "click");
       return true;
     } else if(transSpan.length > 1) {
       var transLinks = [];
       for(var i = 0; i < transSpan.length; i++) transLinks.push(transSpan[i].firstChild);
       buildListBox(transLinks, "_blank", transToAction);
       return true;
     }
    }
    if(transSpan.length == 1) {
      fireEvent(transSpan[0], "click");
      return true;
    } else if(transSpan.length > 1) {
      for(var i = 0; i < transSpan.length; i++) {
        transSpan[i].title = "translate tweet " + transSpan[i].textContent;
      }
      buildListBox(transSpan,"_blank",transToAction);
    }
  }

  //do the action for translate tweet
  function transToAction(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.tagName != "A") return false;
    var index = e.target.rel;
    var spans = e.target.parentNode.parentNode.getElementsByClassName("pb-trans");
    if(spans.length > index) {
          if(isPbplus()) fireEvent(spans[index].firstChild, "click");
		  else fireEvent(spans[index], "click");
	  }
  }  
  
  //mark or unmark pbtweet+ read mark
  function markTweet() {
    if(!current_li) return true;
    if(!isPbplus()) return true;
    var tmp_li = current_li;
    if(hasClass(current_li, "read-mark")) nextTweet();
    fireEvent(tmp_li, "dblclick");
  }

  //direct message to sb.
  function dMessage(e) {
    if(!current_li) return true;
    if(isPbplus()) {
      var dmSpans = current_li.getElementsByClassName("pb-dm");
      if(!dmSpans.length) return true;
      if(dmSpans.length == 1) {
        fireEvent(dmSpans[0].firstChild, "click");
      } else {
        var dmLinks = [];
        for(var i = 0; i < dmSpans.length; i++) dmLinks.push(dmSpans[i].firstChild);
        buildListBox(dmLinks, "_blank");
      }
      return true;
    }
    var tweetUrl = current_li.getElementsByClassName('entry-date');
    if(tweetUrl.length == 1) {
      e.preventDefault();
		  var replyTo = tweetUrl[0].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  inputBox.value = "D " + replyTo + " ";
		
		  inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  } else if(tweetUrl.length > 1) {
	    e.preventDefault();
	    for(var i = 0; i < tweetUrl.length; i++) {
	      var replyTo = tweetUrl[i].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
	      tweetUrl[i].title = "direct message to " + replyTo;
	    }
	    buildListBox(tweetUrl, "", dMessageAction);
	  }
  }

  //do the action for direct message to sb.
  function dMessageAction(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.tagName != "A") return false;
    var tweetUrl = e.target.href;
    if(tweetUrl) {
		  var replyTo = tweetUrl.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  inputBox.value = "D " + replyTo + " ";
		
		  inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  }
  }  
    
  //open links
  function openLinks() {
    if(!current_li) return true;
    var urls = current_li.getElementsByClassName("web");
    if(urls.length == 1) {
      window.open(urls[0]);
      return true;
    }
    if(urls.length > 1) {
      buildListBox(urls, "_blank", openLinksAction);
    }
  }

  //do the action for open links
  function openLinksAction(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.tagName != "A") return false;
    window.open(e.target);
  }
  
  //retweet
  function retweet(e) {
    if(!current_li) return false;
    if(isPbplus()) {
      var rtSpans = current_li.getElementsByClassName("pb-rtweet");
      if(!rtSpans.length) return true;
      if(rtSpans.length == 1) {
        fireEvent(rtSpans[0].firstChild, "click");
      } else {
        var rtLinks = [];
        for(var i = 0; i < rtSpans.length; i++) rtLinks.push(rtSpans[i].firstChild);
        buildListBox(rtLinks, "_blank");
      }
      return true;
    }
    var tweetUrl = current_li.getElementsByClassName('entry-date');
	  if(tweetUrl.length == 1) {
	    e.preventDefault();
		  var replyTo = tweetUrl[0].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  var tweetId = tweetUrl[0].href.match(/\/status\/([0-9]+)$/)[1];
		  inputBox.value = "RT @" + replyTo + ": " + linkRemover(current_li.getElementsByClassName("entry-content")[0]);
			
		  document.getElementById("in_reply_to_status_id").value = tweetId;
	    document.getElementById("in_reply_to").value = replyTo;

	    inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  } else if(tweetUrl.length > 1) {
	    e.preventDefault();
	    for(var i = 0; i < tweetUrl.length; i++) {
	      var replyTo = tweetUrl[i].href.match(/twitter\.com\/([^\/]+)\/status/)[1];
	      var tweetId = tweetUrl[i].href.match(/\/status\/([0-9]+)$/)[1];
	      tweetUrl[i].title = "RT @" + replyTo + ":";
	    }
	    buildListBox(tweetUrl, "", retweetAction);
	  }
  }
  
  //do the action for retweet
  function retweetAction(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.target.tagName != "A") return false;
    var tweetUrl = e.target.href;
    if(tweetUrl) {
		  var replyTo = tweetUrl.match(/twitter\.com\/([^\/]+)\/status/)[1];
		  var tweetId = tweetUrl.match(/\/status\/([0-9]+)$/)[1];
		  inputBox.value = "RT @" + replyTo + ": " + linkRemover(current_li.getElementsByClassName("entry-content")[0]);
			
		  document.getElementById("in_reply_to_status_id").value = tweetId;
	    document.getElementById("in_reply_to").value = replyTo;

	    inputBox.focus();
	    scrollToMiddle(inputBox);
	    inputBox.setSelectionRange(inputBox.value.length, inputBox.value.length);
	  }
  }
  
  //change tabs at inbox or retweet page
  function changeTab() {
    var title = "";
    switch(window.location.hash) {
      case "#inbox": ;
      case "#sent":
        title = "DM Tabs";
        break;
      case "#retweets_by_others": ;
      case "#retweets": ;
      case "#retweeted_of_mine":
        title = "Retweets Tabs";
        break;
      default:
        return false;
    }
    showMenu(title);
  }
  
  //build links list box
  function buildListBox(links, target, callback) {
    var listBox = document.getElementById('ts-list');
    if(listBox) listBox.parentNode.removeChild(listBox);
    target = target || "";
    var list = [];
    for(var i = 0; i < links.length; i++) {
      var text = links[i].title || links[i].textContent;
      var href = links[i].href || text;
      list[i] = '<a href="' + href + '" target="' + target + '" rel="' + i + '">' + (i+1) + ' - ' + text + '</a>';
    }
    listBox = document.createElement('div');
    listBox.id = "ts-list";
    listBox.innerHTML = list.join("");
    var listLinks = listBox.getElementsByTagName("a");
    var index = 0;
    if(callback) {
      listBox.addEventListener("click", function(e){
        callback(e);
        listBox.parentNode.removeChild(listBox);
      }, false);
    }
    listBox.addEventListener("keydown", function(e){
      e.stopPropagation();
      var keyName = keyNum[e.keyCode];
      switch(keyName) {
        case "esc":
          listBox.parentNode.removeChild(listBox);
          break;
        case "enter":
          e.preventDefault();
          if(callback){
            callback.call(links[index], e);
          } else {
            fireEvent(links[index], "click");
          }
          listBox.parentNode.removeChild(listBox);
          break;  
        case "up":
          e.preventDefault();
          if(index){
            index--;
          } else {
            index = listLinks.length - 1;
          }
          listLinks[index].focus();
          break;
        case "down":
          e.preventDefault();
          if(index < listLinks.length - 1 ){
            index++;
          } else {
            index = 0;
          }
          listLinks[index].focus();
          break;
      }
      return false;
    }, false);
    current_li.appendChild(listBox);
    listLinks[0].focus();
  }

  //show menu list
  function showMenu(title) {
    var menuList = [];
    switch(title) {
      case "Navigation":
        menuList = document.getElementById('primary_nav').getElementsByTagName('a');
        break;
      case "Saved Searches":
        menuList = document.getElementById('saved_searches').getElementsByTagName('a');
        break;
      case "Lists":
        menuList = document.getElementById('side_lists').getElementsByClassName('in-page-list-link');
        break;
      case "Trending Topics":
        menuList = document.getElementById('trends').getElementsByClassName('search_link');
        break;
      case "Retweets Tabs":
        menuList = document.getElementById("retweet_tabs").getElementsByTagName("a");
        break;
      case "DM Tabs":
        menuList = document.getElementById("dm_tabs").getElementsByTagName("a");
        break;
      default:
        return false;
    }
    if(!menuList.length) return false;
    var links = [];
    for(var i = 0; i < menuList.length; i++) {
      if(menuList[i].textContent != "")
        links.push(menuList[i]);
    }
    if(!links.length) return false;
    buildMenuBox(links, title);
  }

  //build menu list box
  function buildMenuBox(links, title, target) {
    var menuBox = document.getElementById('menu-list');
    if(menuBox) menuBox.parentNode.removeChild(menuBox);
    target = target || "_blank";
    var list = [];
    for(var i = 0; i < links.length; i++) {
      var text = links[i].textContent;
      var href = links[i].href || text;
      list[i] = '<a href="' + href + '" target="' + target + '" rel="' + i + '"> >> ' + text + '</a>';
    }
    menuBox = document.createElement('div');
    menuBox.id = "menu-list";
    menuBox.innerHTML = "<h3>" + title + "</h3>" + list.join("");
    var menuLinks = menuBox.getElementsByTagName("a");
    var index = 0;
    menuBox.addEventListener("click", function(e){
      e.preventDefault();
      if(e.target.tagName != "A") return false;
      fireEvent(links[e.target.rel], "click");
      menuBox.parentNode.removeChild(menuBox);
    }, false);
    menuBox.addEventListener("keydown", function(e){
      e.stopPropagation();
      var keyName = keyNum[e.keyCode];
      switch(keyName) {
        case "esc":
          menuBox.parentNode.removeChild(menuBox);
          break;
        case "enter":
          e.preventDefault();
          fireEvent(links[index], "click");
          menuBox.parentNode.removeChild(menuBox);
          break;
        case "up":
          e.preventDefault();
          if(index){
            index--;
          } else {
            index = menuLinks.length - 1;
          }
          menuLinks[index].focus();
          break;
        case "down":
          e.preventDefault();
          if(index < menuLinks.length - 1 ){
            index++;
          } else {
            index = 0;
          }
          menuLinks[index].focus();
          break;
      }
      return false;
    }, false);
    document.body.appendChild(menuBox);
    menuLinks[0].focus();
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
    //save current id
    var key = window.location.hash || "#home";
    current_ids[key] = current_li.id;
    
    var tsPins = timeline.getElementsByClassName("ts-pin");
    if(tsPins.length) {
      for(var i = 0; i < tsPins.length; i++) {
        tsPins[i].backgroundColor = "";
        removeClass(tsPins[i], "ts-pin");
        tsPins[i].removeEventListener("DOMNodeRemoved", liListener, true);
      }
    }
    var next_li = current_li.nextSibling || current_li.previousSibling;
    addClass(current_li, "ts-pin");
    current_li.style.backgroundColor = bgColor + " !important";
    current_li.focus();
    scrollToMiddle(current_li);
    current_li.addEventListener("DOMNodeRemoved",liListener = function(e) {
      if(e.target.tagName != "LI") return false;
      e.target.style.backgroundColor = "";
      removeClass(e.target, "ts-pin");
      if(next_li) setCurrentLi(next_li);
    },true);
  }

  //load current li
  function loadCurrentLi() {
    var key = window.location.hash || "#home";
    var currentId = current_ids[key];
    if(!currentId) {
      firstTweet();
      return false;
    }
    var tmpLi = document.getElementById(currentId);
    if(!tmpLi)
      lastTweet();
    else
      gotoTweet(tmpLi);
  }

  //unset current li's background color and event
  function unsetCurrentLi() {
    if(!current_li.style) return true;
    current_li.style.backgroundColor = "";
    removeClass(current_li, "ts-pin");
    current_li.removeEventListener("DOMNodeRemoved", liListener, true);
    current_li.blur();
    var tsPins = timeline.getElementsByClassName("ts-pin");
    if(tsPins.length) {
      for(var i = 0; i < tsPins.length; i++) {
        tsPins[i].backgroundColor = "";
        removeClass(tsPins[i], "ts-pin");
        tsPins[i].removeEventListener("DOMNodeRemoved", liListener, true);
      }
    }
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
  
  //check if pbtweet+ is on
  function isPbplus() {
    if(pbplus) return true;
    try{
      pbplus = document.getElementById("primary_nav").lastChild.childNodes[0];
    } catch(err) {
      pbplus = false;
      return pbplus;
    }
    if(pbplus.textContent == "New Tweet") return true;
    else pbplus = false;
    return pbplus;
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

  function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
  }

  function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,'');
    }
  }
})();
