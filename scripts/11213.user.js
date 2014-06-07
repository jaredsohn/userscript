// ==UserScript==
// @name           Google Result Numbers
// @description    Adds a number in turn to web search results of Google.
// @version        2.1.1
// @author         Shinya.K <shinya.kawano.404@gmail.com>
// @contributor    
// @namespace      http://code404.org/
// @homepage       http://userscripts.org/scripts/show/11213
// @id             Google-Result-Numbers@code404.org
// @run-at         document-end
// @license        
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// ==/UserScript==

(function(){
	function ResultNumber(){
		this.PATH = "h3.r > a";
		
		var start = document.location.href.match(/start=(\d+)/);
		this._number = start ? ++start[1] : 1;
	}
	
	ResultNumber.prototype.add = function(doc){
		var node = doc || document;
		var results = node.querySelectorAll(this.PATH);
		for(var i = 0, l = results.length; i < l; i++, this._number++){
			var suffix = document.createTextNode(this._number + ". ");
			results[i].parentNode.insertBefore(suffix, results[i].parentNode.firstChild);
		}
	};
	
	var number = new ResultNumber();
	number.add();
	
	// Autopagerize and more
	var boot = function(aEvent){
		number.add(aEvent.target);
	};
	window.addEventListener("AutoPatchWork.DOMNodeInserted", boot, false);
	window.addEventListener("AutoPagerize_DOMNodeInserted", boot, false);
	window.addEventListener("AutoPagerAfterInsert", boot, false);
})();
