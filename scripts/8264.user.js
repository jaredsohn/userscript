// ==UserScript==
// @name           Last.fm charts downloader
// @namespace      http://fvds.frih.net/
// @description    Download songs from Last.fm charts
// @include        http://*last.fm/music/*/+charts
// ==/UserScript==

/**************************************************************
 * Licensed as Creative Commons Attribution-ShareAlike 2.5    *
 * http://creativecommons.org/licenses/by-sa/2.5/             *
 **************************************************************/

(function(){
  // http://simonwillison.net/2006/Jan/20/escape/
  function escapeRegExp(text) {
    if (!arguments.callee.sRE) {
      var specials = [
        '.', '*', '+', '?', '|', '(',
        ')', '[', ']', '{', '}', '\\'
      ];
      arguments.callee.sRE = new RegExp(
        '(\\' + specials.join('|\\') + ')', 'g'
      );
    }
    return text.replace(arguments.callee.sRE, '\\$1');
  }
  
  /*
       Written by Jonathan Snook, http://www.snook.ca/jonathan
       Add-ons by Robert Nyman, http://www.robertnyman.com
     */

  function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/-/g, "\-");
    var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
      oElement = arrElements[i];
      if(oRegExp.test(oElement.className)){
        arrReturnElements.push(oElement);
      }
    }
    
    return (arrReturnElements);
  }
  
  var downloadImage = 'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFjSURBVDhPY1yyaPl%2FBnIBSPO%2Ff%2F%2F%2B%2F%2F37l2j848fP%2F2BLQQRII4gmFv%2F9%2FRtT8%2FOvD%2F5vvrvoPzr9HwmALcOmedv9xf%2Bbj2f8R6eJ0kyes4HO%2BPj5C8EA%2B%2Fnz5%2F8fP36gORuo%2BevXb2BBiRZbnBjmfLiffVLrwJpgmCGJ4X%2F1hcX%2FJ1xfA6Tn%2FW%2B9vOS%2Fy97K%2FyDxX79%2BgTFILUgfA4jQ8EmDY5Ciggsz%2Fpednfk%2F%2B9SE%2F577gBqXOII1I6sDawYCEIHAQEV1Z%2Bb%2Fb7y0%2BL%2FIqqD%2FDFOV%2FzNMUgJrxlCLHA0MCQz%2F0473%2F%2B%2B%2FuuZ%2F9NHW%2FwwzFP4rLNL%2Fb7FU%2FX%2Fldsn%2FDIkMyMr%2Fo%2FAYwjn%2FM8QIgg2QXeXyX2uRzv%2BkTaoQjVEs%2F0HyKJah8IAcBgug8%2FQY%2Fruvjfgfs0Xzf%2B46wf8MhkAxoDiGWgwRkAEgFxgDNcAwmo0wPZjGQWWQAwebBSAxAFluo3AnWoIFAAAAAElFTkSuQmCC';
  
  var fileName;
  var page;
  
  function addButtons(){
    var rows = getElementsByClassName(document, 'td', 'playbuttonCell');
    
    for(var i = 0; i < rows.length; i++){
      var node = document.createElement('td');
      node.addEventListener('click', clickHandler, true);
      node.style.cursor = 'pointer';
      
      var image = document.createElement('img');
      image.setAttribute('src', 'data:image/png;base64,' + downloadImage);
      
      node.appendChild(image);
      
      rows[i].parentNode.insertBefore(node, rows[i]);
    }
  }
  
  function clickHandler(e){
    var artist, title, songName;
    
    artist = /http:\/\/(?:www\.)?last\.fm\/music\/([^\/]*)\/\+charts/.exec(location.href)[1];
    
    var node = e.target;
    
    while(node.nodeName.toLowerCase() != 'tr'){
      node = node.parentNode;
    }
    
    title = getElementsByClassName(node, 'td', 'subjectCell');
    
    if(title.length != 1){
      alert('Sorry, an error has occured');
    }
    
    title = title[0].childNodes[1].childNodes[1].childNodes[0].nodeValue;
    
    title = /^\s*(.*)\s*$/.exec(title)[1];
    
    songName = artist + ' ' + title;
    songName = encodeURIComponent(songName);
    searchSeeqPod(songName);
  }
  
  function searchSeeqPod(songName){
    GM_xmlhttpRequest({
      method : "GET",
      url :    "http://www.seeqpod.com/api/seeq/search?rm=1&rp=0&rv=0&random=z81gxBxdRa&s=0&n=1&rt=0&q=" + songName,
      onload : getFirstWebsite
    });
  }
  
  function getFirstWebsite(details){
    // Get the filename
    fileName = /<location>(.*?)<\/location>/.exec(details.responseText);
    if(fileName == null){
      alert('Song not found');
      return false;
    } else {
      fileName = fileName[1];
    }
    
	GM_openInTab(fileName);
	return;
	/*
    // Remove html elements from this file name
    fileName = fileName.replace(/<(?:[^>]*|"[^"]*"|'[^']*')*>/g, '');
    
    // Get the page containing this link
    page = /<a href="(.*?)" class="mp3">/.exec(details.responseText)[1];
    
    GM_xmlhttpRequest({
      method : "GET",
      url :    page,
      onload : getLinkFromPage
    });
	*/
  }
  /*
  function getLinkFromPage(details){
    // Change any non-alphanumeric characters in the file name to .{1,3} Sites seem to randomly escape them.
    fileName = fileName.replace(/[^a-z0-9]/gi, '.{1,3}');
    var filePath = new RegExp('href\\s*=\\s*[\'"]?([^ ]*?' + fileName + '[^ ]*?)[\'"]?', 'i').exec(details.responseText);
    
    if(filePath == null){
      alert("Can't extract the song from the page. We will open the page so you can download it manually.");
      GM_openInTab(page);
      return;
    } else {
      filePath = filePath[1];
    }
    
    if(!(/^(?:ht|f)tps?:\/\//i.test(filePath))){
      var fileRel = page.split('#')[0].split('?')[0].split('/');
      fileRel.pop();
      fileRel.join('/');
      
      filePath = fileRel.filePath;
    }
    
    GM_openInTab(filePath);
  }
  */
  addButtons();
})();