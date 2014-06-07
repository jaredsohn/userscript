// ==UserScript==
// @name           twitter profile popup
// @namespace      http://a-h.parfe.jp/einfach/
// @description    popup twitter profile
// @include        http://twitter.com/*
// ==/UserScript==

(function () {

	if (self.location.href!=top.location.href || !$('friends')) return;


/* from http://lowreal.net/logs/2006/03/16/1 */

$X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}

	var w = unsafeWindow;
	
// loading Indicator

	var data = 'data:image/gif;base64,'+
    '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'+
    'YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';

    var loading = document.createElement('img');
    loading.src = data;

	var friends = $X(".//div[@id='friends']", document)[0];
	var friend = friends.getElementsByTagName('img')

	var view = document.createElement('div')
	with(view.style){
		width = "150px";
		backgroundColor = "#fff";
		color = "#000";
		padding = "7px";
		position = "fixed";
		border = "1px solid #666";
	}

	for(var i=0,l=friend.length; i<l; i++){
		w.Event.observe(friend[i], 'mouseover', function(){
			//this.width = 50;
			//this.height = 50;
			this.parentNode.parentNode.insertBefore(view, this.parentNode.nextSibling);
			//log(this.parentNode.nextSibling.nextSibling)
			view.style.display = "block";
			viewProfile(this.parentNode.href)
		}, false)
		/*
		w.Event.observe(friend[i], 'mouseout', function(){
			this.width = 24;
			this.height = 24;
			this.parentNode.removeChild(view);
		}, false)
		*/
		w.Event.observe(w.document.body, 'click', function(){
			view.style.display = "none";
		}, false)
	}

	function viewProfile(url){
		view.innerHTML = '';
		view.appendChild(loading);
		new w.Ajax.Request(url, {
			method: "get",
			onSuccess:function(httpObj){
				var d = document.createElement('div');
				d.innerHTML = httpObj.responseText;
				//var profile = $X(".//div[@id='side']", d)[0];
				//view.innerHTML = profile.innerHTML;
				view.innerHTML = '';
				addProfile(".//div[@class='msg']",d);
				addProfile(".//ul[@class='about']",d);
				addProfile(".//ul[@class='actions']",d);
				//log(profile.innerHTML);
			},
			onFailure:function(httpObj){
				log('error');
			}
		});
	}

	function addProfile(path, d){
		view.appendChild($X(path, d)[0])
	}

	function $(id){
		return document.getElementById(id);
	}

	function log(){
		if(!w.console) return;
		var c = w.console;
		if(c)	c.log.apply(c, arguments);
	}
})();