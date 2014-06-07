// ==UserScript==
// @name         Better Lilac
// @description  添加更多Lilac功能
// @version      0.2
// @date         2008-08-08
// @include      http://*lilacbbs.com/mainpage.html
// @include      http://*lilacbbs.com/bbsleft.php
// @namespace    http://rbgo.cn
// ==/UserScript==
//version for auto update
var ffrb_version = "0.2";
//helper method to auto update
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    //var ONE_WEEK = 7 * ONE_DAY;
    //var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return;

    GM_xmlhttpRequest({
      method: 'GET',
  	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
  	  onload: function(result) {
    	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
    
    	  var theOtherVersion = parseFloat(RegExp.$1);
    	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site
    
        //find the name of the script
        result.responseText.match(/@name\s+(.+)/);
        var scriptName = RegExp.$1;
    
    	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + scriptName + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
    	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
    	  }
  	 }
    });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

//针对导读页=================
if(location.href.indexOf('mainpage.html')>0){
  //去掉图片和br因为他们宽度太宽
  var pics = document.evaluate("/html/body/div/div[2]/center",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  var brs = document.evaluate("/html/body/div/div[2]/br",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for(var i=0;i<pics.snapshotLength;i++){
    var pic = pics.snapshotItem(i);
    var br = brs.snapshotItem(i);
    (pic.parentNode).removeChild(pic);
    (br.parentNode).removeChild(br);
  }
  
  //将广告换成google 的iframe
  var ifr_dev = document.evaluate("/html/body/div/div/div[2]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  ifr_dev.innerHTML = '<iframe scrolling="no" frameborder="0" style="border: 0pt none ; margin: 0pt; padding: 0pt; overflow: hidden; width: 100%; height: 288px;" src="http://www.gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/olympics_synd.xml&hl=zh-CN&nocache=0&up_selectedTab=0"/>';
  ifr_dev.parentNode.insertBefore(ifr_dev,ifr_dev.parentNode.firstChild);
  
  //加大边栏宽度
   GM_addStyle(<><![CDATA[
    
    div#menu {
      width:320px !important;
    }
  	
  	div#main {
      margin-right:320px !important;
  	}
    ]]></>);
    
    autoUpdateFromUserscriptsDotOrg({
      url: 'http://userscripts.org/scripts/source/31765.user.js',
      version: ffrb_version,
    });
}

//simple bind function from prototype.js
 Function.prototype.bind = function(obj) {
  var method = this,
   temp = function() {
    return method.apply(obj, arguments);
   };
  return temp;
 }


//针对左边页=================

	
	options = {};

	// Set default values for required options
	options.inputClass = "ac_input";
	options.resultsClass = options.resultsClass || "ac_results";
	options.lineSeparator = "\n";
	options.cellSeparator = "|";
	options.minChars = 2;
	options.delay = 400;
	options.matchCase =  0;
	options.matchSubset =  0;
	options.matchContains =  0;
	options.cacheLength =  10;
	options.mustMatch =  0;
	options.extraParams =  {};
	options.loadingClass =  "ac_loading";
	options.selectFirst =  false;
	options.selectOnly =  false;
	options.maxItemsToShow =  -1;
	options.autoFill =  false;
	options.width = 140;
	options.left=10;
	options.resultListLength = 10;
	
	options.formatItem = function(row){return row.displayName +"<br><span>" + row.name + "</span>";}
  options.onItemSelect = function(li){
    if(top&&li.getAttribute("selectValue"))top.document.getElementsByName('f3')[0].src = 'http://www.lilacbbs.com/bbsdoc.php?board=' + li.getAttribute("selectValue");
  }	


autoComplete = function(input,options){
  //copy from http://files.cnblogs.com/huacn/jquery.autocomplete.1.1.2.js
  //create result div
  this.input = input;
  this.options = options;
  
  this.timeout = null;
	this.prev = "";
	this.active = -1;
	this.cache = {};
	this.boardList = [];
	this.keyb = false;
	this.hasFocus = false;
	this.lastKeyPressCode = null;
  
  this.results = document.createElement("div");
  this.results.style.display = "none";
  this.results.style.position = "absolute";
  this.results.className = "ac_results";
  document.body.appendChild(this.results);
  
  
  this.hideResultsNow();

}
autoComplete.prototype.loadBoardList = function(){
//load board list - http://lish.appspot.com/api/board/all
  try{
				GM_xmlhttpRequest
				({
		            method:'GET',
		            url: 'http://lish.appspot.com/api/board/all',
		            onload:(function(httpObj){
		          GM_log("load board list from lish");
						  this.boardList = eval('(' + httpObj.responseText + ')');
					}).bind(this)
				});
			}catch(ex){}
}

autoComplete.prototype.onChange = function (){
  	// ignore if the following keys are pressed: [del] [shift] [capslock]
		if( this.lastKeyPressCode == 46 || (this.lastKeyPressCode > 8 && this.lastKeyPressCode < 32) ) 
    {
      this.results.style.display = "none";
    }
		var v = input.value;
		if (v == this.prev) return;
		this.prev = v;
		if (v.length >= this.options.minChars) {
			this.requestData(v);
		} else {
			this.results.style.display = "none";
		}
  }
  
autoComplete.prototype.moveSelect = function (step) {
		var lis = document.getElementsByTagName("li", this.results);
		if (!lis) return;

    

		this.active += step;

		if (this.active < 0) {
			this.active = 0;
		} else if (this.active >= lis.length) {
			this.active = lis.length - 1;
		}
		//lis.removeClass("ac_over");
		for(i=0;i<lis.length;i++)
		{
      lis[i].className="";
    }

		lis[this.active].className="ac_over";

		// Weird behaviour in IE
		// if (lis[active] && lis[active].scrollIntoView) {
		// 	lis[active].scrollIntoView(false);
		// }

	}

  
autoComplete.prototype.requestData =  function (q) {
		if (!this.options.matchCase) q = q.toLowerCase();
		var data = this.options.cacheLength ? this.loadFromCache(q) : null;
		// recieve the cached data
		if (data) {
			this.receiveData(q, data);
		// if an AJAX url has been supplied, try loading the data now
		} else{
		    data = this.searchBoard(q)
		    
				this.addToCache(q, data);
				
				this.receiveData(q, data);
		// if there's been no data found, remove the loading class
		}
	}
	
autoComplete.prototype.addToCache=	function (q, data) {
		if (!data || !q || !this.options.cacheLength) return;
		if (!this.cache.length || this.cache.length > this.options.cacheLength) {
			this.flushCache();
			this.cache.length++;
		} else if (!this.cache[q]) {
			this.cache.length++;
		}
		this.cache.data[q] = data;
	}
	
autoComplete.prototype.searchBoard=	function (q)
	{
    var searchResult = []
    for(i=0;i<this.boardList.length;i++)
    {
      board = this.boardList[i];
      if(board.name.toLowerCase().indexOf(q)>-1 || board.displayName.toLowerCase().indexOf(q) >-1 )
      {
        searchResult.push(board);
        //GM_log('board ['+board.name+'] is selected' );
        if(searchResult.length>this.options.resultListLength)break;
      }
    }
    return searchResult;
  }
	
autoComplete.prototype.loadFromCache=function (q) {
	   //GM_log('enter loadFromCache');
		if (!q ) return null;
		if (this.cache.data[q]) return this.cache.data[q];
		return null;
	}
	
autoComplete.prototype.receiveData=	function (q, data) {
		if (data) {
			//input.removeClass(options.loadingClass);
			this.results.innerHTML = "";

			// if the field no longer has focus or if there are no matches, do not display the drop down
			if( !this.hasFocus || data.length == 0 ) return this.hideResultsNow();
      var ul = this.dataToDom(data);
      this.results.appendChild(ul);
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
			if( this.options.autoFill && (this.input.value.toLowerCase() == q.toLowerCase()) ) this.autoFill(data[0][0]);
			this.showResults();
		} else {
			this.hideResultsNow();
		}
	}
	
autoComplete.prototype.dataToDom = function (data) {
		var ul = document.createElement("ul");
		var num = data.length;

		// limited results to a max number
		if( (this.options.maxItemsToShow > 0) && (this.options.maxItemsToShow < num) ) num = this.options.maxItemsToShow;

		for (var i=0; i < num; i++) {
			var row = data[i];
			if (!row) continue;
			var li = document.createElement("li");
			if (this.options.formatItem) {
				li.innerHTML = this.options.formatItem(row, i, num);
				
				li.setAttribute("selectValue",row["name"]);
			} else {
				li.innerHTML = row[0];
				li.setAttribute("selectValue",row[0]);
			}
			
			li.setAttribute("i",i);
			
			li.addEventListener("mouseover",(function(event) {
				var lis = document.getElementsByTagName("li", this.results);
      	for(ii=0;ii<lis.length;ii++)
		    {
          lis[ii].className="";
        }
          
		      event.target.className = "ac_over";
		      this.active = parseInt(event.target.getAttribute("i"),10);

	       }).bind(this),true);
	       
	    li.addEventListener("mouseout",function(event) {
		      event.target.className = "";
	       },true);
	       
			li.addEventListener("click",(function(event) {
              event.preventDefault(); event.stopPropagation(); 
              this.selectItem(event.target);
	       }).bind(this),true);

			ul.appendChild(li);

		}
		return ul;
	}
	
autoComplete.prototype.showResults=	function () {
		// get the position of the input field right now (in case the DOM is shifted)
		//var pos = this.findPos(this.input);
		// either use the specified width, or autocalculate based on form element
		//var iWidth = (this.options.width > 0) ? this.options.width : this.input.clientWidth();
		// reposition
		this.results.style.width = parseInt(this.options.width) + "px";
		this.results.style.top = parseInt(this.input.offsetTop + this.input.offsetHeight) + "px";
	  this.results.style.left = parseInt(this.options.left) + "px";
		this.results.style.display = "";
	};
	
/*autoComplete.prototype.findPos=	function (obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent && obj.style.position!='relative') {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
		return {x:curleft,y:curtop};
	}
*/

autoComplete.prototype.hideResultsNow=	function () {
		if (this.timeout) clearTimeout(this.timeout);
		//$input.removeClass(options.loadingClass);
		this.results.style.display = "none";
	}

	// flush cache
autoComplete.prototype.flushCache=	function (){
		this.cache = {};
		this.cache.data = {};
		this.cache.length = 0;
	}

autoComplete.prototype.selectItem =	function (li) {
		if (!li) {
			li = document.createElement("li");
			li.extra = [];
			li.setAttribute("selectValue","");
		}
		var v = li.getAttribute("selectValue");
		this.input.lastSelected = v;
		this.prev = v;
		this.results.innerHTM="";
		this.input.value = v;
		this.hideResultsNow();
		if (this.options.onItemSelect) setTimeout((function() { this.options.onItemSelect(li) }).bind(this), 1);
	}
	
autoComplete.prototype.selectCurrent = function () {
    var li;
		var lis = document.getElementsByTagName("LI",this.results);
		for(i=0;i<lis.length;i++)
		{
      if(lis[i].className=="ac_over"){
          li = lis[i];
          break;
        }
    }
    //var li = $("li.ac_over", this.results)[0];
		/*if (!li) {
			var $li = $("li", results);
			if (options.selectOnly) {
				if ($li.length == 1) li = $li[0];
			} else if (options.selectFirst) {
				li = $li[0];
			}
		}*/
		if (li) {
			this.selectItem(li);
			return true;
		} else {
			return false;
		}
	}
	


	
autoComplete.prototype.registerEvent = function(){
		// flush cache
	this.flushCache();
	
  //stop the brower's autocomplete
  if(document.forms[1])
      document.forms[1].setAttribute("autocomplete","off");
  else
      document.forms[0].setAttribute("autocomplete","off");
	
  this.input.addEventListener("keyup",(function(e){
    this.lastKeyPressCode = e.keyCode;
    switch(e.keyCode) {
			case 38: // up
				e.preventDefault();
				this.moveSelect(-1);
				break;
			case 40: // down
				e.preventDefault();
				this.moveSelect(1);
				break;
			case 9:  // tab
			case 13: // return
				if( this.selectCurrent() ){
					// make sure to blur off the current field
					this.input.blur();
					e.preventDefault(); 
          e.stopPropagation(); 
				}
				break;
			default:
				this.active = -1;
				if (this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout((function(){this.onChange();}).bind(this), this.options.delay);
				break;
		}

  }).bind(this),true);
  
this.input.addEventListener("focus",(function(e){
		// track whether the field has focus, we shouldn't process any results if the field no longer has focus
		this.hasFocus = true;
	}).bind(this),true);
	
this.input.addEventListener("blue",(function() {
		// track whether the field has focus
		this.hasFocus = false;
		this.hideResults();
	}).bind(this),true);

}

if(location.href.indexOf('bbsleft.php')>0){
    GM_addStyle(<><![CDATA[
    
    .ac_results {
      background-color:white;
      border:1px solid #333;
      overflow:hidden;
      padding:0px;
    }
    
    .ac_results ul {
      list-style-image:none;
      list-style-position:outside;
      list-style-type:none;
      margin:0pt;
      padding:0pt;
      width:100%;
      }
      
      .ac_results li {
        border-bottom:1px solid #666;
        color:black;
        padding-left:5px;
        cursor:pointer;
      }
      
      .ac_results li  span {
        font-size:small;
        color:#000099;
        padding-left:10px;
      }
      
      .ac_results li.ac_over {
        background-color: #7650AA;
        color: white;
      }
      
      .ac_results li.ac_over  span {
        color:white;
      }
    ]]></>);

  var input = document.evaluate("/html/body/div[2]/div[2]/form/nobr/input",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  var a = new autoComplete(input,options);
  a.loadBoardList();
  a.registerEvent();

}	

