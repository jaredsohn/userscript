// ==UserScript==
// @name           Nico play length coloring
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/search/*
// @include        http://www.nicovideo.jp/tag/*
// ==/UserScript==

(function(){

	function init(doc){
		var movies = XPath.all(doc, '//div[@class="content_672"]//p[@class="vinfo_length"]/span');
		var v,playLength,i=0,iz=movies.length;
		for(i;i<iz;i++){
			v = movies[i];
			playLength = +v.textContent.split(":")[0];
			if(playLength == 0){
				v.setAttribute("class" , "vinfo_length_0");
			}else if(playLength < 5){
				v.setAttribute("class" , "vinfo_length_1-5");
			}else if(10 <= playLength &&  playLength < 15){
				v.setAttribute("class" , "vinfo_length_10-15");
			}else if(15 <= playLength){
				v.setAttribute("class" , "vinfo_length_15-");
			}
		}
	}
	GM_addStyle(<><![CDATA[
		.vinfo_length_0{
			color:#8500EB!important;
			font-size:11px!important;
		}
		.vinfo_length_1-5{
			color:#1000EB!important;
		}
		.vinfo_length_10-15{
			color:#C90700!important;
		}
		.vinfo_length_15-{
			color:#EB1000!important;
			text-decoration:underline;
			font-size:11px!important;
		}
	]]></>);

var XPath = {
  cache: null,
  reset: function () {
    this.cache = {__proto__: null};
  },
  get: function (context, expr, type) {
    var x = new XPathEvaluator();
    var cache = this.cache, evaluator;
    if (expr in cache) {
      evaluator = cache[expr];
    } else {
      evaluator = cache[expr] = x.createExpression(expr, null);
    }
    return evaluator.evaluate(context, type, null);
  },
  has: function (context, expr) {
    return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
  },
  first: function (context, expr) {
    return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  },
  last: function (context, expr) {
    var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    return all.snapshotItem(all.snapshotLength - 1) || null;
  },
  all: function (context, expr) {
    var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
    var ret = [];
    for (var i; (i = all.iterateNext()) !== null;) {
      ret.push(i);
    }
    return ret;
  }
};
XPath.reset();

	init(document);
	if (window.AutoPagerize) {
		window.AutoPagerize.addDocumentFilter(function(doc) {
			init(doc);
		});
	}
})();
