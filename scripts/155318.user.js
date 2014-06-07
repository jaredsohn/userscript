// ==UserScript==
// @name          Set randome page title
// @description	  Set randome page title to fool monitoring application. Tested with Gmail, Facebook, Google+.
// @include       http://*
// @include       https://*
// @exclude       http://*wikipedia.org
// ==/UserScript==

var TITLELIST = [
					"Site1 - Microsoft Internet Explorer",
					"Site2 - Microsoft Internet Explorer",
					"Site3 - Microsoft Internet Explorer",
					"Site4- Microsoft Internet Explorer",
					""
				];

document.title = TITLELIST[Math.floor((Math.random() * TITLELIST.length-1)+1)];	//to initially set title before site scripts triggers a change in title
(function()
  {
    var _this={
                target:document.getElementsByTagName('TITLE')[0],
                oldValue:document.title
              };
    _this.onChange=function()
                  {
                    if(_this.oldValue!==document.title)
                    {
                      _this.oldValue=document.title;
					  document.title = TITLELIST[Math.floor((Math.random() * TITLELIST.length-1)+1)];//DOCTITLE; 	//sets title after site scripts triggered a change in title
                    }
                 };
    _this.delay=function()
                {
                  setTimeout(_this.onChange,1);
                };
    _this.target.addEventListener('DOMSubtreeModified',_this.delay,false)
  })();