// ==UserScript==
// @name        hobbyking.purchased
// @version     1.0.1
// @license     CC0 1.0 Universal; http://creativecommons.org/publicdomain/zero/1.0/
// @description Analyzes your order history on HobbyKing.com - https://github.com/tomsun/purchased.js
// @namespace   http://tomsun.ax
// @author      tomsun
// @include     http://hobbyking.com/hobbyking/store/uh_customerShowOrders*
// @include     https://hobbyking.com/hobbyking/store/uh_customerShowOrders*
// @include     http://*.hobbyking.com/hobbyking/store/uh_customerShowOrders*
// @include     https://*.hobbyking.com/hobbyking/store/uh_customerShowOrders*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.log('hobbyking.purchased.user.js initiating... https://github.com/tomsun/purchased.js');

var trs = document.getElementsByTagName('tr');
for (var i=0; i < trs.length; i++) {
  if (trs[i].innerHTML.indexOf('uh_customershoworders') > -1) {
    var eStatus= document.createElement('div')
    eStatus.innerHTML = 'Total amount: <span id="hobbyking-purchasedjs-totalamount"></span><br />'
    eStatus.innerHTML += '<div id="hobbyking-purchasedjs-fineprint" style="font-style:italic; font-size: 90%"></div>'

    // Inject status box
    trs[i].parentNode.parentNode.parentNode.insertBefore(eStatus, trs[i].parentNode.parentNode)

    // Add calculate link
    var eAmount = document.getElementById('hobbyking-purchasedjs-totalamount')
    eAmount.innerHTML = '<a>calculate</a>';
    eAmount.addEventListener("click", hobbyking_purchasedjs_calculate_sum, true)

    break
  }
}

function hobbyking_purchasedjs_calculate_sum() {
  var eAmount = document.getElementById('hobbyking-purchasedjs-totalamount')
  eAmount.removeEventListener("click", hobbyking_purchasedjs_calculate_sum, true)

  // Fetch all order pages
  hobbyking_purchasedjs_fetch_orderslist_pages(function(pages) {
    console.log(pages)
    // Parse page HTML
    var orders = {}
    var page_no = 0
    for (var i in pages) {
      page_no++
      eAmount.innerHTML = 'parsing page ' + page_no + ' of ' + pages.length
      var moreorders = hobbyking_purchasedjs_parse_orderslist_page(pages[i].responseText)
      for (var order_id in moreorders) {
        orders[order_id] = moreorders[order_id]
      }
    }

    // Calculate sum
    var order_cnt = 0
    var sum_total = 0.0
    var sum_cancelled = 0.0
    var warning_novalue = 0
    var warning_zerovalue = 0
    var warning_negativevalue = 0

    for (var order_no in orders) {
      var order = orders[order_no]
      console.log(order)
      if (typeof order.total !== undefined) {
        if (order.total == 0) warning_zerovalue++
        if (order.total < 0) warning_negativevalue++
        if (order.status == "cancelled") {
          sum_cancelled += order.total
        } else {
          sum_total += order.total
        }
      } else {
        warning_novalue++
      }
      order_cnt++
    }

    eAmount.innerHTML = 'USD $' + (Math.round(100 * sum_total) / 100)

    eFineprint = document.getElementById('hobbyking-purchasedjs-fineprint')
    eFineprint.innerHTML = pages.length + ' pages parsed (make sure this matches what you see below)<br />'
    eFineprint.innerHTML += order_cnt + ' orders found (make sure this matches what you see on the <a href="/hobbyking/store/uh_customerUtilitiesMenu.asp" target="_blank">customer page</a>)<br />'
    if (warning_novalue) {
      eFineprint.innerHTML += 'WARNING: Could not interpret cost for ' + warning_novalue + ' orders<br />'
    }
    if (warning_zerovalue) {
      eFineprint.innerHTML += 'WARNING: ' + warning_zerovalue + ' order(s) had zero cost<br />'
    }
    if (warning_negativevalue) {
      eFineprint.innerHTML += 'WARNING: ' + warning_negativevalue + ' order(s) had negative cost<br />'
    }
    eFineprint.innerHTML += 'Report generated using <a href="https://github.com/tomsun/purchased.js" target="_blank">purchased.js</a> by <a href="http://tomsun.ax" target="_blank">tomsun</a>'

  }, eAmount)
}

function hobbyking_purchasedjs_fetch_orderslist_pages(callback, eStatus) {
  eStatus.innerHTML = 'fetching page 1'
  hobbyking_purchasedjs_fetch_orderslist_page(1, function(response) {
    // Deal with first page
    var pages = []
    pages.push(response)
    var pagecount = hobbyking_purchasedjs_parse_orderslist_pagecount(response.responseText)
    if (pagecount <= 1) {
      // Return first page only
      callback(pages)
      return
    }
    // Fetch consecutive pages
    var page_no = 2
    var on_orderslist_page_response = function(response) {
      pages.push(response)
      if (page_no < pagecount) {
        page_no++
        eStatus.innerHTML = 'fetching page ' + page_no + ' of ' + pagecount
        hobbyking_purchasedjs_fetch_orderslist_page(page_no, on_orderslist_page_response)
      } else {
        // Return all pages
        console.log("page_no: " + page_no)
        console.log("page_cnt: " + pages.length)
        callback(pages)
      }
    }
    eStatus.innerHTML = 'fetching page 2 of ' + pagecount
    hobbyking_purchasedjs_fetch_orderslist_page(page_no, on_orderslist_page_response)
  })
}

function hobbyking_purchasedjs_fetch_orderslist_page(page_no, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "  http://hobbyking.com/hobbyking/store/uh_customerShowOrders.asp?page=" + parseInt(page_no),
    onload: callback
  });
}

function hobbyking_purchasedjs_parse_orderslist_page(html) {
  var doc = document.implementation.createHTMLDocument("")
  doc.documentElement.innerHTML = html
  var orders = {}
  var trs = doc.getElementsByTagName('tr')
  for (var i=0; i < trs.length; i++) {
    if (trs[i].innerHTML.indexOf('uh_customerShowOrderDetails') > -1) {
      var tds = trs[i].getElementsByTagName('td')
      if (tds.length > 4) {
        var order_no = tds[2].getElementsByTagName('span')[0].innerHTML
        var total_lbl = tds[3].innerHTML
        var total = undefined;
        if (total_lbl[0] == "$") {
          // Remove dollar sign and convert to int
          total = parseFloat(total_lbl.substr(1))
        }
        orders[order_no] = {
          'order_no': order_no,
          'total_lbl': total_lbl,
          'total': total,
          'status': tds[4].innerHTML.toLowerCase().replace(/^\s+|\s+$/g, "")
        }
      }
    }
  }
  return orders
}

function hobbyking_purchasedjs_parse_orderslist_pagecount(html) {
  var doc = document.implementation.createHTMLDocument("")
  doc.documentElement.innerHTML = html
  var tds = doc.getElementsByTagName('tr')
  for (var i=0; i < tds.length; i++) {
    if (tds[i].innerHTML.indexOf('Page:') > -1) {
      var result = tds[i].innerHTML.match(/Page: ([0-9]+) of ([0-9]+)/)
      var pagecount = 1;
      if (!result || result.length < 3 || result[2] < 1) {
        pagecount = undefined
      } else {
        pagecount = result[2]
      }
      break
    }
  }

  if (typeof pagecount === undefined) {
    pagecount = parseInt(prompt('Could not detect the number of pages! Please specify the number of pages'))
    if (pagecount == NaN) {
      alert('Could not interpret your input. Assuming only one page')
      pagecount = 1
    }
  }
  if (pagecount > 10 && !confirm("Detected " + pagecount + " pages - are you sure you want to parse all of them?")) {
    pagecount = 1
  }
  if (pagecount > 30) {
    alert('Nope, not doing more than 30, sorry')
    pagecount = 1
  }

  return pagecount
}
