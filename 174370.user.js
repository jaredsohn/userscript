// ==UserScript==   
// @name           unBitly
// @description    Tries to resolve and replace Bitly URLs privately using an escrowed webapp/webcache.
// @namespace      https://userscripts.org/users/524962
// @downloadUrl    https://gitorious.org/cguserscripts/unbitly/blobs/raw/master/unbitly.user.js
// @updateUrl      https://gitorious.org/cguserscripts/unbitly/blobs/raw/master/unbitly.user.js
// @source         https://gitorious.org/cguserscripts/unbitly/blobs/raw/master/unbitly.user.coffee
// @licence        GPLv3 (or later)
// @include        *
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @version        1.00
// ==/UserScript==
//;
/*
# You can substitute another webcache API url here if main one is down, but remember:
# a webcache escrow server is ONLY useful if more than one person shares it, otherwise
# it's just as privacy-invasive as if you resolved every link personally!
*/

var bitly_elements, cache_stub, construct_webcache_url, fix_stub, fix_twitter_links, handle_webcache_results, isBitly, isEmptyObj, main, populate_bitly_elements, target_domains, urlParse, webcache_api_url,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

webcache_api_url = "https://cathalgarvey.pythonanywhere.com/unbitly/get";

/*
# Found any bitly partners not in this list? Please let me know! @onetruecathal on Twitter!
*/


target_domains = ['bit.ly', 'ow.ly', 'kiss.ly', 'on.mash.to', 'lat.ms', 'cnet.co', 'econ.st', 'j.mp', 'is.gd', 'dthin.gs', 'twb.io', 'reut.rs', 'on.mktw.net', 'on.wsj.com', 'nyr.kr', 'bbc.in', 'tcrn.ch', 'hub.am', 'rww.to', 'aje.me', 'n.pr', 'nyti.ms', 'jrnl.to', 'edge.ie', 'on.ft.com', 'zite.to'];

bitly_elements = {};

console.log("Defining CSS styles for links.");

GM_addStyle("a[twitterclear]:before { content: '\u2192'; }\na[twitterclear] { color: orange; }");

GM_addStyle("a[bitlyclear]:before { content: '\u2192'; }\na[bitlyclear] { color: green; }");

GM_addStyle("a[bitlywarn]:before { content: '!'; }\na[bitlywarn] { color: red; }");

console.log("Defining functions.");

urlParse = function(url) {
  var host, path;

  url = url.replace(/^[^:]+:\/*/, "");
  host = url.split("/")[0];
  path = url.slice(host.length + 1);
  return [host, path];
};

isEmptyObj = function(someobj) {
  return Object.keys(someobj).length === 0;
};

isBitly = function(host) {
  if (__indexOf.call(target_domains, host) >= 0) {
    return true;
  } else {
    return false;
  }
};

cache_stub = function(stub, url) {
  console.log("Caching bit.ly/" + stub + " as link " + url);
  return GM_setValue(stub, url);
};

populate_bitly_elements = function() {
  var all_links, host, link, stub, _i, _len, _ref, _results;

  all_links = document.getElementsByTagName("a");
  _results = [];
  for (_i = 0, _len = all_links.length; _i < _len; _i++) {
    link = all_links[_i];
    _ref = urlParse(link.href), host = _ref[0], stub = _ref[1];
    if (isBitly(host)) {
      _results.push(bitly_elements[stub] = link);
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

fix_twitter_links = function() {
  var expanded, link, links, _i, _len, _results;

  links = document.getElementsByTagName("a");
  _results = [];
  for (_i = 0, _len = links.length; _i < _len; _i++) {
    link = links[_i];
    if (link != null) {
      expanded = link.getAttribute("data-expanded-url");
      if ((expanded == null) && link.getAttribute("class") === "twitter-timeline-link") {
        expanded = link.textContent;
        expanded = expanded.slice(0, 5) === "http" ? expanded : "http://" + expanded;
      }
      if (expanded != null) {
        link.href = expanded;
        _results.push(link.setAttribute("twitterclear", "true"));
      } else {
        _results.push(void 0);
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

construct_webcache_url = function(stubs_array) {
  var call_url, req_bits, stub, _i, _len;

  req_bits = ["?"];
  for (_i = 0, _len = stubs_array.length; _i < _len; _i++) {
    stub = stubs_array[_i];
    req_bits.push("urlstub=" + stub + "&");
  }
  call_url = webcache_api_url + req_bits.join("");
  console.log("Constructed URL for api request: " + call_url);
  return call_url;
};

fix_stub = function(stub, element, url) {
  console.log("Fixing stub bit.ly/" + stub + " as link " + url);
  element.href = url;
  if (element.getAttribute("twitterclear") != null) {
    element.removeAttribute("twitterclear");
  }
  return element.setAttribute("bitlyclear", "true");
};

console.log("Defining callback.");

handle_webcache_results = function(json_obj) {
  var element, key, results, stub, value, _results;

  results = JSON.parse(json_obj);
  console.log("Received " + Object.keys(results).length + " values from webcache.");
  for (key in results) {
    value = results[key];
    cache_stub(key, value);
    if (key in bitly_elements) {
      fix_stub(key, bitly_elements[key], value);
      delete bitly_elements[key];
    }
  }
  if (!isEmptyObj(bitly_elements)) {
    _results = [];
    for (stub in bitly_elements) {
      element = bitly_elements[stub];
      console.log("Failed to resolve stub: " + stub + " - Adding warning style.");
      _results.push(element.setAttribute("bitlywarn", "true"));
    }
    return _results;
  }
};

console.log("Defining main body.");

main = function() {
  var cached_url, element, stub;

  console.log("Fixing twitter t.co links first..");
  fix_twitter_links();
  console.log("Getting bitly elements..");
  populate_bitly_elements();
  console.log("Found following elements: " + JSON.stringify(bitly_elements));
  for (stub in bitly_elements) {
    element = bitly_elements[stub];
    console.log("Trying to resolve bitly stub " + stub + " from local cache.");
    cached_url = GM_getValue(stub);
    if (cached_url != null) {
      console.log("Got locally cached url for stub " + stub + ": " + cached_url);
      fix_stub(stub, element, cached_url);
      delete bitly_elements[stub];
    } else {
      console.log("No local cache found for stub " + stub);
      continue;
    }
  }
  console.log("Issuing GM_xmlhttpRequest for remaining stubs: " + JSON.stringify(bitly_elements));
  if (!isEmptyObj(bitly_elements)) {
    return GM_xmlhttpRequest({
      url: construct_webcache_url(Object.keys(bitly_elements)),
      method: "GET",
      onload: function(response) {
        console.log("Calling callback for xmlhttpRequest. Response was: " + response.responseText);
        return handle_webcache_results(response.responseText);
      }
    });
  }
};

console.log("Calling main script body.");

main();

window.addEventListener("click", main, true);

window.addEventListener("contextmenu", main, true);
