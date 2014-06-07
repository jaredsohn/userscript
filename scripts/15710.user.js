// ==UserScript==
// @name           AutoPagerize SITEINFO Test
// @namespace      http://d.hatena.ne.jp/youpy/
// @description    unit test for AutoPagerize SITEINFO
// @include        *
// ==/UserScript==

var SiteInfo = function() { this.init.apply(this, arguments); };
SiteInfo.prototype = {
  init: function(str) {
    this.str = str;
    this.info = parseInfo(str);
  },
};

var AutoPagerizeTest = function() { this.init.apply(this, arguments); };
AutoPagerizeTest.prototype = {
  tests: [],
  finished: 0,
  failed: 0,
  skipped: 0,
  init: function(ui) {
    this.tests = [] // xxx
    var self = this;
    var tests = $x('//*[@class="autopagerize_data"]')
      .map(function(i) {
	return new TestCase(new SiteInfo(i.value));
      });

    tests.forEach(function(test) {
      self.add(test);
    });
      
    ui.test = this;
    this.ui = ui;
  },
  add: function(test) {
    this.tests.push(test);
  },
  start: function() {
    this.ui.start();
  },
  finish: function(result) {
    this.finished ++;
    if(result.isFailed()) {
      this.failed ++;
    } else if(result.isSkipped()) {
      this.skipped ++;
    }

    this.ui.out(result);
  },
  run: function() {
    var self = this;
    this.start();
    
    var i = 0;
    setTimeout(function forEach() {
      if(!(i < self.tests.length))
	return;
      self.tests[i++].run(function(result) { self.finish(result); });
      setTimeout(forEach);
    });
  },
  status: function() {
    return 'Test Results ('
      + this.finished + '/' + this.tests.length + ' tests, '
      + this.failed + ' failures, '
      + this.skipped + ' skips)';
  },
};

var TestCase = function() { this.init.apply(this, arguments); };
TestCase.prototype = {
  init: function(siteInfo) {
    this.siteInfo = siteInfo;
  },
  run: function(callback) {
    var info = this.siteInfo.info;
    if(!info.exampleUrl) {
      callback(new TestResult(info.url, 'skip', 'no example url'));
    } else {
      var self = this;
      getCharSet(info.exampleUrl, function(url, charSet) {
	//console.log(charSet);
	GM_xmlhttpRequest({
	  method: 'get',
          url: url,
	  overrideMimeType: "text/html; charset=" + charSet,
          onload: function(res){
	    var doc = createHTMLDocumentByString(res.responseText);
	    if($x(info.pageElement, doc).length == 0) {
	      callback(new TestResult(info.url,
				      'failure',
				      '<a href="'
				      + info.exampleUrl
				      + '">no page element found</a>: '
				      + info.pageElement));
	    } else if(info.insertBefore && $x(info.insertBefore, doc).length == 0) {
	      callback(new TestResult(info.url,
				      'failure',
				      '<a href="'
				      + info.exampleUrl
				      + '">no insertBefore element found</a>: '
				      + info.insertBefore));
	    } else if($x(info.nextLink, doc).length == 0) {
	      callback(new TestResult(info.url,
				      'failure',
				      '<a href="'
				      + info.exampleUrl
				      + '">no nextLink element found</a>: '
				      + info.nextLink));
	    } else {
	      callback(new TestResult(info.url,
				      'pass',
				      'ok'));
	    }
	  },
	});
      });
    }
  },
};

var TestResult = function() { this.init.apply(this, arguments); };
TestResult.prototype = {
  init: function(name, type, message) {
    this.name = name;
    this.type = type;
    this.message = message;
  },
  isFailed: function() {
    return this.type == 'failure';
  },
  isSkipped: function() {
    return this.type == 'skip';
  },
  toString: function() {
    return [this.name, this.type, this.message].join(': ');
  },
};

var TestUI = function() { this.init.apply(this, arguments); };
TestUI.prototype = {
  test: null,
  init: function() {
    var div;
    if(div = $x('//div[@class="auto_pagerize_test_result"]')[0]) {
      div.innerHTML = '';
    } else {
      div = document.createElement('div');
      div.className = 'auto_pagerize_test_result';
    }
    var ul = document.createElement('ul');
    div.innerHTML = '<p></p>';
    div.appendChild(ul);
    document.body.insertBefore(div, document.body.childNodes[0]);
    this.div = div;
    this.ul = ul;
  },
  start: function() {
    this.refreshProgress();
  },
  out: function(result) {
    this.refreshProgress();
    var li = document.createElement('li');
    li.innerHTML = result;
    li.className = result.type;
    this.ul.appendChild(li);
  },
  refreshProgress: function() {
    this.div.childNodes[0].innerHTML = this.test.status();
  },
}

GM_registerMenuCommand('AutoPagerize SITEINFO Test - run', function() {
  new AutoPagerizeTest(new TestUI()).run();
});

// from AutoPagerize
var parseInfo = function(str) {
  var lines = str.split(/\r\n|\r|\n/)
  var re = /(^[^:]*?):(.*)$/
  var strip = function(str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '')
  }
  var info = {}
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].match(re)) {
      info[RegExp.$1] = strip(RegExp.$2)
    }
  }
  info.remainHeight = parseInt(info.remainHeight)
  var isValid = function(info) {
    var infoProp = ['nextLink', 'insertBefore', 'pageElement', 'exampleUrl']
    for (var i = 0; i < infoProp.length; i++) {
      if (!infoProp[i]) {
        return false
      }
    }
    return true
  }

  return isValid(info) ? info : null
}

// utility functions
function createHTMLDocumentByString(str) {
  var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '');
  var htmlDoc  = document.implementation.createDocument(null, 'html', null);
  var fragment = createDocumentFragmentByString(html);
  htmlDoc.documentElement.appendChild(fragment);
  return htmlDoc;
}

function createDocumentFragmentByString(str) {
  var range = document.createRange()
  range.setStartAfter(document.body)
  return range.createContextualFragment(str)
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
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

function getCharSet(url, callback){
  GM_xmlhttpRequest({
    method: 'get',
    url: url,
    onload: function(res) {
      var doc = createHTMLDocumentByString(res.responseText);
      callback(url, getContentType(doc).match(/charset=(.*)/i) ? RegExp.$1 : 'iso-8859-1');
    }});
}

function getContentType(doc){
  for(var i=0, metas=doc.getElementsByTagName("meta") ; i<metas.length ; i++)
    if((metas[i].httpEquiv).match(/content\-type/i))
      return metas[i].content;
  
  return '';
}

GM_addStyle(<><![CDATA[
  .auto_pagerize_test_result {
    padding: 1em;
    background: #fff;
    border-bottom: 1px solid #000;
    font-family: monospace;
  }

  .auto_pagerize_test_result p {
    font-weight: bold;
  }

  .auto_pagerize_test_result .pass {
    color: green;
  }

  .auto_pagerize_test_result .failure {
    color: red;
  }

  .auto_pagerize_test_result .failure a {
    color: red;
    text-decoration: underline;
  }

  .auto_pagerize_test_result .skip {
    color: #ddd;
  }
]]></>);
