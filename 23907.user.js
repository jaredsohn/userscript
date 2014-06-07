// ==UserScript==
// @name          Google+SBM (no xpath)
// @namespace     http://wildlifesanctuary.blog38.fc2.com/
// @description   Show SBM counter in Google search result
// @include       http://*.google.*/*q=*
// ==/UserScript==

// original: http://d.hatena.ne.jp/kusigahama/20051207#p1
// ref. http://la.ma.la/blog/diary_200607281316.htm

(function() {

  var USE_AUTOPAGER = true;
  
  var sbms = [
    {
      label: "hatena",
      entry: "http://b.hatena.ne.jp/entry/",
      image: "http://b.hatena.ne.jp/entry/image/"
    },
    {
      label: "livedoor",
      entry: "http://clip.livedoor.com/page/",
      image: "http://image.clip.livedoor.com/counter/"
    }
  ];

  function setBookmarkCounter(uri) {
    var a, img;
    var uri = uri.replace(/#/, '%23');
    var span = document.createElement("span");
    span.setAttribute("class", "sbm");
    
    for (var i = 0; i < sbms.length; i++) {
      var sbm = sbms[i];
      a = document.createElement("a");
      img = document.createElement("img");

      a.setAttribute("title", sbm.label);
      a.setAttribute("href", sbm.entry + uri);
      img.setAttribute('src', sbm.image + uri);
      img.setAttribute('style', 'border:none; margin:0 0.5em; vertical-align:baseline;');

      a.appendChild(img);
      span.appendChild(a);
    }
    return span;
  }

  /*
     Written by Jonathan Snook, http://www.snook.ca/jonathan
     Add-ons by Robert Nyman, http://www.robertnyman.com
     cite: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
  */
  function getElementsByClassName(oElm, strTagName, strClassName){

    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
      oElement = arrElements[i];      
      if(oRegExp.test(oElement.className)){
        arrReturnElements.push(oElement);
      }   
    }
    return (arrReturnElements);
  }

  var load = function(context) {
    //Autopagerize
    if(!context){
      root = document;
    }else{
      root = context;
    } 
    var links = getElementsByClassName(root, "a", "l");
    
    if (!links.length) return;
    for (var i = 0; i < links.length; ++i) {
      var link = links[i];
      var uri = link.href;

      var testEle = link.parentNode.lastChild;
      if (testEle.className == "sbm") continue;

      link.parentNode.appendChild(setBookmarkCounter(uri));
    }
  }

  // for AutoPagerize
  function addFilter(filter, i) {
    i = i || 4
    if (window.AutoPagerize && window.AutoPagerize.addFilter) {
      //window.AutoPagerize.addFilter(filter);
      window.AutoPagerize.addFilter(function(elements) {
        for (var i = 0; i < elements.length; ++i)
          filter(elements[i]);
      });
    }
    else if (i > 1) {
      setTimeout(arguments.callee, 500, filter, i - 1)
    }
  }
  load();
  if (USE_AUTOPAGER) addFilter(load);
})();
