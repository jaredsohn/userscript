// ==UserScript==
// @name           Calculate $ Index
// @namespace      http://twitter.com/t32k
// @description    $ Index = ( Goal Value + Product Revenue ) / Unique Pageviews;
// @include        https://www.google.com/analytics/web/*
// @version        1.0.0
// @icon           https://lh6.googleusercontent.com/-Ur_V3tyyza8/Tub_wGK6kLI/AAAAAAAAA_w/m7WW-JBIly8/s32/%2524.png
// ==/UserScript==
(function (d) {
  // ヘルパー関数
  var findClass = function (name) {
      return Array.prototype.slice.call(d.getElementsByClassName(name));
    };
  var normalize = function (single) {
      return single.textContent.replace(/(\,|\s|\$|￥)/g, '');
    };
  var toPrice = function (value) {
      var num = isNaN(Math.round(value)) ? '0' : Math.round(value) + '';
      while (num != (num = num.replace(/^(-?\d+)(\d{3})/, '$1,$2')));
      return '￥' + num;
    };
  // 立ち上がれ！
  var checkDataTable;
  var Boot = function () {
      if (findClass('C_DATATABLE')) {

        // Goal Value - 目標値
        var goalValueAllRow = findClass('ID-metric-data-0');
        var goalValueAll = goalValueAllRow.map(normalize);

        // Product Revenue - 商品の収益
        var itemRevenueRow = findClass('ID-metric-data-1');
        var itemRevenue = itemRevenueRow.map(normalize);

        // Unique Pageviews - ページ別訪問数
        var uniquePageviewsRow = findClass('ID-metric-data-2');
        var uniquePageviews = uniquePageviewsRow.map(normalize);

        // $ Index - $インデックス
        var insertIndexValue = function (e, i, a) {
            var dollarIndex = [];
            dollarIndex[i] = toPrice((goalValueAll[i] + itemRevenue[i]) / uniquePageviews[i]);
            var elm = d.createElement('td');
            elm.setAttribute('class', 'ID-metric-data-3 COLUMN-analytics');
            elm.innerHTML = dollarIndex[i];
            var nodes = d.getElementsByClassName('ID-metric-data-2');
            nodes[i].parentNode.insertBefore(elm, nodes[i].nextSibling);
          };

        var elm = d.createElement('th');
        elm.setAttribute('class', 'C_DATATABLE_METRIC_COLUMN ACTION-sort ID-metric-column-3 C_DATATABLE_LAST_COLUMN');
        elm.innerHTML = '$ インデックス';
        var node = d.getElementsByClassName('ID-metric-column-2')[0];
        node.parentNode.insertBefore(elm, node.nextSibling);
        node.style.borderRight = 0;
        findClass('C_DATATABLE_ROW_KEY').forEach(insertIndexValue);
        clearInterval(checkDataTable);
      }
    };
  checkDataTable = setInterval(Boot, 100);
  window.addEventListener('hashchange', Boot, false);
})(document);