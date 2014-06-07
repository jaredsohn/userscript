// ==UserScript==
// @name          Set a static page title
// @description	  Set a static page title to fool monitoring application. Tested with Gmail, Facebook, Google+.
// @include       http://*
// @include       https://*
// ==/UserScript==
var DOCTITLE = "Wikipedia, the free encyclopedia"; 	//set your desired title here 


document.title = DOCTITLE; 							//to initially set title before site scripts triggers a change in title
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
					  document.title = DOCTITLE; 	//sets title after site scripts triggered a change in title
                    }
                 };
    _this.delay=function()
                {
                  setTimeout(_this.onChange,1);
                };
    _this.target.addEventListener('DOMSubtreeModified',_this.delay,false)
  })();