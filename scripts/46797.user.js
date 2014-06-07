// ==UserScript==
// @name          Canonical Url Generation and Insertion
// @namespace     http://chrisroos.co.uk/
// @description   A script that allows me to construct rules to determine the permalink of a given URL and write that permalink into the page as a link element with rel=canonical.
// @include       *
// ==/UserScript==

// **********************************************
// CanonicalUrl members

CanonicalUrl = {
  
  utilities : {
    queryString : function(location) {
      var keysAndValues = {};
      if (m = location.href.match(/\?(.*)/)) {
        var queryString = m[1];
        var keyValuePairs = queryString.split('&');
        if (keyValuePairs.length > 0) {
          for (var i = 0; i < keyValuePairs.length; i++) {
            var key = keyValuePairs[i].split('=')[0];
            var value = keyValuePairs[i].split('=')[1];
            if (key)
              keysAndValues[key] = value;
          }
        }
      }
      return keysAndValues;
    },
    insertCanonicalLink : function(href) {
      var canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', href);
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(canonicalLink);
    }
  },
  
  urlRewriters : {
    requiredKey : function(url, key) {
      if (key && url.queryString && url.queryString[key]) {
        var queryString = [key, url.queryString[key]].join('=');
        return url.protocol + '//' + url.host + url.pathname + '?' + queryString;
      } else {
        return '';
      }
    }
  },
  
  Url : function(location) {
    this.hash = location.hash;
    this.host = location.host;
    this.hostname = location.hostname;
    this.href = location.href;
    this.pathname = location.pathname;
    this.port = location.port;
    this.protocol = location.protocol;
    this.search = location.search;
    this.queryString = CanonicalUrl.utilities.queryString(location);
  },
  
  Permalink : function(location) {
    this.location = location;
  },
  
  Rule : function(urlPattern, urlRewriter) {
    this.urlPattern = urlPattern;
    this.urlRewriter = urlRewriter;
  },
  
  RuleCollection : function() {
    this.rules = [];
  },
  
  insert : function(location) {
    var permalink = new CanonicalUrl.Permalink(location);
    if (href = permalink.href())
      CanonicalUrl.utilities.insertCanonicalLink(href);
  }
  
}

// **********************************************
// CanonicalUrl member prototypes

CanonicalUrl.Permalink.prototype = {
  href : function() {
    return CanonicalUrl.Rules.apply(this.location);
  }
}

CanonicalUrl.Rule.prototype = {
  rewriteUrl : function(url) {
    if (this.urlPattern.test(url.href)) {
      if (this.urlRewriter && typeof(this.urlRewriter) == 'function')
        return this.urlRewriter(url);
    }
  }
}

CanonicalUrl.RuleCollection.prototype = {
  add : function(urlPattern, urlRewriter) {
    var rule = new CanonicalUrl.Rule(urlPattern, urlRewriter);
    this.rules.push(rule);
  },
  apply : function(location) {
    for (var i = 0; i < this.rules.length; i++) {
      var rule = this.rules[i];
      var url = new CanonicalUrl.Url(location);
      if (rewrittenUrl = rule.rewriteUrl(url))
        return rewrittenUrl;
    }
  }
}

// **********************************************
// The actual real-life rules

CanonicalUrl.Rules = new CanonicalUrl.RuleCollection();
CanonicalUrl.Rules.add(/userscript_integration_matching_rule_test\.html/, function(url) { 
  return 'userscript-permalink';
});
CanonicalUrl.Rules.add(/google\.co\.uk\/search/, function(url) { 
  return CanonicalUrl.urlRewriters.requiredKey(url, 'q');
});
CanonicalUrl.Rules.add(/theyworkforyou\.com\/wrans/, function(url) { 
  return CanonicalUrl.urlRewriters.requiredKey(url, 'id');
});
CanonicalUrl.Rules.add(/cgi\.ebay\.co\.uk/, function(url) {
  var hash = url.queryString.hash;
  if (m = hash.match(/item(\d+)/)) {
    var itemId = m[1];
    return 'http://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem&item=' + itemId;
  }
});

// **********************************************
// Do the magic
CanonicalUrl.insert(document.location);