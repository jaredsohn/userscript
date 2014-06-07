// ==UserScript==
// @name           INAGEYA date filter
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    item filter for specified date
// @include        http://inageya.misbit.com/sale/*
// ==/UserScript==
//
// 2008-02-16 t.koyachi
//   First release.

(function(){
  var now = new Date();
  var saleStartDate, saleEndDate;
  var saleDates = {};
  var elmDuration = $x('//div[@class="sale-kikan"]')[0];
  var strSaleDates = elmDuration.innerHTML.match(/(\d+)月(\d+)日/g);
  for (var i=0,length=strSaleDates.length; i < length; i++) {
    strSaleDate = strSaleDates[i];
    if (strSaleDate.match(/(\d+)月(\d+)日/)) {
      var key = new Date(now.getYear(), RegExp.$1, RegExp.$2);
      (!saleStartDate) ? saleStartDate = key :
      (!saleEndDate) ? saleEndDate = key : 1;
    }
  }
  var day = 24 * 60 * 60 * 1000;
  var duration = (saleEndDate.getTime() - saleStartDate.getTime()) / day;
  for (var i=0,length=duration+1; i < length; i++) {
    saleDates[[saleStartDate.getMonth(),
               saleStartDate.getDate() + i].join('/')] = [];
  }
  var elmItems = $x('//table[@class="sale-w1bg"]//tr');
  elmItems.forEach(function(elmItem) {
    for (var date in saleDates) {
      date = date.replace(/\//, '\/');
      if (elmItem.childNodes[5].childNodes[0].innerHTML.match(date)) {
        for (var i=0,length=elmItem.childNodes.length;
             i < length; i++)
        {
          elmItem.childNodes[i].style.width = elmItem.childNodes[i].offsetWidth + "px";
        }
        saleDates[date].push(elmItem);
      }
    }
  });
  function onclickFilter(selectDate) {
    for (var date in saleDates) {
      if (selectDate == date) {
        saleDates[date].forEach(function(saleDate) {
          // http://www.h-fj.com/blog/archives/2007/05/06-134912.php
          saleDate.style.display = "";
        });
        var elmSelectDate = document.getElementById('filter_date_' + date);
        elmSelectDate.style.backgroundColor = 'pink';
      }
      else {
        saleDates[date].forEach(function(saleDate) {
          saleDate.style.display = "none";
        });
        var elmSelectDate = document.getElementById('filter_date_' + date);
        elmSelectDate.style.backgroundColor = '';
      }
    }
  }
  unsafeWindow.onclickFilter = onclickFilter;
  var htmlDateSelector = elmDuration.innerHTML;
  for (var date in saleDates) {
    htmlDateSelector += ['<span id="filter_date_' + date + '" style="color:red;cursor:pointer;"onclick="onclickFilter(\'' + date + '\')">',
                         date,
                         '</span>, ',
                         ].join('');
  }
  elmDuration.innerHTML = htmlDateSelector;

  function $x(exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o
               : (document.contentType == "text/html")
                 ? ""
                 : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return ret;
      }
    }
    return null;
  }
})();
