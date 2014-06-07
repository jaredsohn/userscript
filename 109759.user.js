// ==UserScript==
// @name            ExtGWT
// @version         0.3
// @copyright       2011 Nicolai Ehemann (en@enlightened.de)
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace       http://www.enlightened.de
// @description     Google Webmaster Tools Extension(s): Marks pending and successful page removals in crawl errors list, adds link to remove page to crawl errors list
// @include         https://www.google.com/webmasters/*
// ==/UserScript==
//
// Changelog
// 0.1  2011-08-10  Initial revision
// 0.2  2011-08-11  Adapting for Firefox, bugfixes, regular updating of crawl error list
// 0.3  2011-08-15  setInterval fix?
//
// ===============

(function () {

  var SID = "ExtGWT";
  var UID = "none";

  // Figure out what type of storage should be used
  var storage = 'none';
  try {
    if (typeof GM_getValue === 'function' && typeof GM_deleteValue === 'function') {
      // Make sure greasemonkey's functions work...
      GM_setValue('testkey', 'testvalue');
      if (GM_getValue('testkey', false) === 'testvalue') {
        storage = 'greasemonkey';
      }
      GM_deleteValue('testkey', '');
    }
  } catch (x) {}
  if (storage == 'none' && typeof localStorage == 'object') {
    storage = 'localstorage';
  }

  // get config value or return default

  function getValue(key, value, userid) {
    if (!userid) userid = UID;
    var key = userid + '-' + key;
    var ret = '';

    switch (storage) {
    case 'greasemonkey':
      ret = GM_getValue(key, value);
      break;

    case 'localstorage':
      var val = localStorage.getItem(SID + '-' + key);
      if (val == 'true') {
        ret = true;
      } else if (val == 'false') {
        ret = false;
      } else if (val) {
        ret = val;
      }
      break;

    default:
      ret = value;
      break;
    }

    return ret;
  }

  // save value

  function setValue(key, value, userid) {
    if (!userid) userid = UID;
    key = userid + '-' + key;

    switch (storage) {
    case 'greasemonkey':
      GM_setValue(key, value);
      break;

    case 'localstorage':
      localStorage.setItem(SID + '-' + key, value);
      break;
    }
  }

  // delete config value

  function deleteValue(key, userid) {
    if (!userid) userid = UID;
    key = userid + '-' + key;

    switch (storage) {
      case 'greasemonkey':
        GM_deleteValue(key);
        break;

      case 'localstorage':
        localStorage.removeItem(SID + '-' + key);
        break;
      }
  }

  function getFirstNode(xpath, refElement, doc) {
    if (undefined == refElement) {
      refElement = document;
    }
    if (undefined == doc) {
      doc = document;
    }
    return doc.evaluate(xpath, refElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  function reparseRemovals(time) {
    if (undefined == time) {
      time = 60 * 5;
    }
    setValue('nextParseRemoved', Math.round((new Date()).getTime()/1000 + time));
  }

  function Debug() {
    var now = new Date();

    // get calling function
    var cfunc = ('undefined' != typeof Debug.caller) ? Debug.caller.toString() : 'function <not detectable!> {              ';
    cfunc = cfunc.substring(9, cfunc.search(/\(/)) || '<empty>';

    var out = '*** Debug ***\nTime:\t' + now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + '  ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds() + '\t' + cfunc + '\n';

    if (1 == arguments.length) {
      out +=  arguments[0];
    } else {
      for (var i = 0; i < arguments.length - 1; i+=2) {
        out += arguments[i] + ':\t' + arguments[i+1] + '\n';
      }
    }

    if ("function" === typeof(GM_log)) {
      GM_log(out);
    } else if (opera && "function" === typeof(opera.postError)) {
      opera.postError(out);
    } else {
      alert(out);
    }
  }

  var XHR = function() {
    try {
      this.xmlhttp = new XMLHttpRequest();
    } catch (e) {
      try {
        this.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw new Error('Unable to create XMLHttpRequest.');
      }
    }
  }
  XHR.prototype.enableForm = function() {
    this.form = true;
  }
  XHR.prototype.exec = function(url, method, data, callback) {
    if (undefined == callback) {
      this.xmlhttp.open(method, url, false);
      if (this.form) {
        this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      }
      this.xmlhttp.send(data);
      return [('200' == this.xmlhttp.status), this.xmlhttp.responseText, this.xmlhttp.responseXML];
    } else {
      var self = this;
      this.xmlhttp.open(method, url, true);
      if (this.form) {
        this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      }
      this.xmlhttp.onreadystatechange = function() {
        if (4 == self.xmlhttp.readyState) {
          callback.call(self, ('200' == self.xmlhttp.status), self.xmlhttp.responseText, this.xmlhttp.responseXML);
        }
      }
      this.xmlhttp.send(data);
    }
  };

  function parseRemovals() {
    var i, result, item, node, page;

    //Debug("Running");
    var removedPages = {};
    result = document.evaluate("//table[@id='grid']/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = result.snapshotItem(i); i++) {
      page = {};
      node = getFirstNode("td[2]/div[@class='removal-status']", item);
      page['status'] = node.firstChild.data.match(/\S*/);;
      node = getFirstNode("td[1]/a", item);
      removedPages[node.href.replace(/\+/g, "%20")] = page;
    }
    setValue('removedPages', JSON.stringify(removedPages));
    setValue('lastParseRemoved', Math.round((new Date()).getTime()/1000));
    reparseRemovals();
  }
  
  function hrefToId(href) {
    return SID + '-' + href.replace(/[\/\+%;]/g,"_");
  }
  
  function updateGridRow(row, removedPages, update) {
    var a, node, page, newNode;

    newNode = document.createElement('td');
    //Debug("td/a | td/div/a", getFirstNode("td[1]/a | td[1]/div/a", row));
    node = getFirstNode("td[1]/a | td[1]/div/a", row);
    node.parentNode.parentNode.id = hrefToId(node.href.replace(/\+/g, "%20"));
    //Debug("Pages", JSON.stringify(removedPages));
    page = removedPages[node.href.replace(/\+/g, "%20")];
    if (page) {
      //Debug("Found", node.href);
      if ("Pending" == page.status) {
        node.parentNode.parentNode.style.color = 'red';
      } else if ("Removed" == page.status) {
        node.parentNode.parentNode.style.color = 'lightgrey';
      } else {
        node.parentNode.parentNode.style.color = null;
      }
      newNode.appendChild(document.createTextNode(page.status));
    } else {
      a = document.createElement('a');
      a.addEventListener('click', (function(href) {
          return function() {
            if (removePage(href)) {
              //Debug('Removal of :' + href, 'successful');
              var node = document.getElementById(hrefToId(href));
              //Debug("node", node, "lastChild", node.lastChild, "prev", node.lastChild.previousSibling, "prev", node.lastChild.previousSibling.previousSibling);
              node.lastChild.previousSibling.previousSibling.replaceChild(document.createTextNode("Pending"), node.lastChild.previousSibling.previousSibling.firstChild);
              node.style.color = 'red';
            } else {
              //Debug('Removal of :' + href, 'failed');
            }
          }
        })(node.href.replace(/\+/g, "%20")), false);
      a.appendChild(document.createTextNode('Request'));
      newNode.appendChild(a);
    }
    if (!update) {
      row.insertBefore(newNode, row.lastChild.previousSibling);
    } else {
      row.replaceChild(newNode, row.lastChild.previousSibling.previousSibling);
      //Debug('replaced', node.href);
    }
  }
  
  function refreshCrawlErrors() {
    if (lastUpdate <= getLastParseRemoved()) {
      var href, removedPages, node;
      
      //Debug("Running");
      lastUpdate = (new Date()).getTime()/1000;
      removedPages = getRemovedPages();
      for (href in removedPages) {
        //Debug('href', href, 'id', hrefToId(href));
        node = document.getElementById(hrefToId(href));
        if (node) {
          updateGridRow(node, removedPages, true);
        }
      }
    }
  }

  function updateCrawlErrors() {
    var i, result, item, newNode, removedPages;

    lastUpdate = (new Date()).getTime()/1000;
    removedPages = getRemovedPages();
    result = getFirstNode("//table[@id='grid']/thead/tr");
    newNode = document.createElement('th');
    newNode.appendChild(document.createTextNode("Removal"));
    newNode.className = 'header';
    result.insertBefore(newNode, result.lastChild);
    result = document.evaluate("//table[@id='grid']/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = result.snapshotItem(i); i++) {
      updateGridRow(item, removedPages);
    }
    window.setInterval(refreshCrawlErrors, 1000);
  }

  function removePage(url) {
    var form, i, element, post, div;

    var xhr = new XHR();
    post = xhr.exec("/webmasters/tools/removals-request-unverified?hl=en&urlt=" + encodeURIComponent(url), "GET", null);
    if (post[0]) {
      div = document.createElement('div');
      div.innerHTML = post[1].split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
      form = div.getElementsByTagName('form');
      for (i = 0; i < form.length; i++) {
        if ('form-blocked' == form[i].id) {
          form = form[i];
          break;
        }
      }
      post = new Array();
      form.elements['confirm-blocked'].checked = true;
      for (i = 0; i < form.elements.length; i++) {
        element = form.elements[i];
        if ('cancel' != element['name']) {
          post.push(encodeURIComponent(element['name']) + "=" + encodeURIComponent(element['value']));
        }
      }
      //Debug("URL", window.location.protocol + '/' + window.location.host + form.action, "Data", post.join('&'));
      xhr.enableForm();
      post = xhr.exec(form.action, "POST", post.join('&'));
      reparseRemovals(0);
      return post[0];
      //Debug("Result", post[0]);
    } else {
      return false;
    }
  }

  function getNextParseRemoved() {
    var nextParseRemoved = parseInt(getValue('nextParseRemoved'));
    if (isNaN(nextParseRemoved)) {
      nextParseRemoved = 0;
    }
    return nextParseRemoved;
  }

  function getLastParseRemoved() {
    var lastParseRemoved = parseInt(getValue('lastParseRemoved'));
    if (isNaN(lastParseRemoved)) {
      lastParseRemoved = 0;
    }
    return lastParseRemoved;
  }

  function getRemovedPages() {
    try {
      removedPages = JSON.parse(getValue('removedPages'));
      //Debug('Load', getValue('removedPages'));
    } catch (e) {
      removedPages = {};
    }
    return removedPages;
  }

  var lastUpdate = 0;
  //Debug("Last", getNextParseRemoved(), "Diff", (new Date()).getTime())/1000 - nextParseRemoved);
  if ((new Date()).getTime()/1000 > getNextParseRemoved() && '/webmasters/tools/removals' != window.location.pathname) {
    var iframe = document.createElement('iframe');
    iframe.width = 0;
    iframe.height = 0;
    iframe.src = 'https://www.google.com/webmasters/tools/removals?hl=en&rlf=all';
    document.body.appendChild(iframe);
  }

  // now do the real thing
  switch (window.location.pathname) {
    case '/webmasters/tools/removals':
      parseRemovals();
      break;
    case '/webmasters/tools/crawl-errors':
      updateCrawlErrors();
      break;
  }

})();
