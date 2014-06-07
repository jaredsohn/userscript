// ==UserScript== 
// @name        Zagg Replacement Availability
// @author      Michael Soh 
// @namespace   zagg-98173
// @description Shows you which products you have are available for replacement
// @version     0.2
// @license     GPL 3.0 
// @include     https://www.zagg.com/support/account/orders.php*
// 
// @require     http://usocheckup.redirectme.net/98173.js
// 
// ==/UserScript== 


var debug = 0;

// remove all warranty replacements
var tables = xpath_snapshot(".//table");

for (var t = 0; t < tables.snapshotLength; t++) {
     var table_rows = xpath_snapshot(".//table[" + (t+1) + "]/.//tr[not(contains(.,'Invoice Number'))]");

     for (var i = 0; i < table_rows.snapshotLength; i++) {
          row = table_rows.snapshotItem(i);

          var r = xpath_snapshot(".//table[" + (t+1) + "]/.//tr[not(contains(.,'Invoice Number'))][" + (i+1) + "]/td");

          row_object = {
               invoice: r.snapshotItem(0),
               status:  r.snapshotItem(1),
               replace: r.snapshotItem(4)
          }

          // Don't include replacements since they are never replacable.
          var re = new RegExp("^IR\\d+");

          if ((row_object.status.textContent == "Order shipped") && (!re.test(row_object.invoice.textContent))) { 
               var a = xpath_simple("string(.//a/@href)", XPathResult.STRING_TYPE, row_object.replace);

               get_replacement_availability(a.stringValue);
          } else {
               var node = xpath_snapshot(".//a", row_object.replace);
               node.snapshotItem(0).style.display = "none";
          }
     }
}


// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

function get_replacement_availability(url) {
     var r = new XMLHttpRequest();
     r.open('GET', url);
     r.onreadystatechange = function () {
          if (r.readyState == 4) {
               if (debug >= 3) GM_log("readyState 4 received.  status = " + r.status);
               if (r.status == 200) {
                    if (debug >= 3) GM_log("Status 200 received.");
                    if (debug >= 3) GM_log('Parsing: ' + url);
                    
                    if (debug) GM_log('site returned ' + r.responseText.length + ' characters.');

                    if (r.responseText.indexOf('alt="Unavailible" title="Replacement Availability"') >= 0) {
                         change_status(url, 0);
                    } else {
                         // Get model of shield
                         var regexp = RegExp('<td width="30%">(.*)</td>');
                         var match = regexp.exec(r.responseText);
                         var model = match[1].replace(/(\r\n|\n\r|\s+$)/gm, "");
                         if(debug) GM_log("model: [" + model + "]");
                         
                         change_status(url, 1, model);
                    }
               } else if (r.response == null) {
                    GM_log("XMLHttpRequest was not successful.");
               } else {
                    GM_log("XMLHttpRequest errored out.");
               }
          } else {
               if (debug) GM_log("current readyState: " + r.readyState);
               if (debug >= 2) GM_log("responseText.length: " + r.responseText.length);
          }
     };
/*   r.responseType = "document";
     r.overrideMimeType = "text/xml"; */
     r.send(null);
     
     return 0;
}


function change_status(url, is_available, model) {
     if (debug) GM_log("url: " + url + " (available = " + is_available + ")");
     var node = xpath_snapshot(".//a[contains(.,'Replace')][@href='" + url + "']");

     var a = node.snapshotItem(0);
    
     if (is_available) {
          a.style.color = 'green';
          a.style.fontWeight = 'bold';
          a.setAttribute('title', model);
     } else {
          a.style.display = 'none';
     }
}



// =-=-=-=-=- Standard Functions -=-=-=-=-= //
// The following functions are ones that I've created and use in pretty
// much every script I write.

function xpath_simple(xpath_query, result, node) {
    if (!node) node = document;
    if (!result) return xpath_snapshot(xpath_query);

    if (debug >= 2) GM_log("xpath_simple: " + xpath_query);
    var r = document.evaluate(xpath_query, node, null, result, null);
    
    if (debug >= 2) GM_log("xpath result type: " + r.resultType);

    return r;
}

function xpath_snapshot(xpath_query, node) {
    if (!node) node = document;

    if (debug >= 2) GM_log("xpath_snapshot: " + xpath_query);
    var nodes = document.evaluate(xpath_query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (debug >= 1) GM_log('number of nodes returned: ' + nodes.snapshotLength);

    return nodes;
}

function xpath_iterate(xpath_query, node) {
    if (!node) node = document;

    if (debug >= 2) GM_log("xpath_iterate: " + xpath_query);
    var iterators = document.evaluate(xpath_query, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    return iterators;
}

function HTMLParser(aHTMLString){
  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
  html.documentElement.appendChild(body);

  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
    .parseFragment(aHTMLString, false, null, body));

  return body;
}
