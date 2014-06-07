// ==UserScript==
// @name       Average Daily Usage for wispmon.com Usage Report
// @namespace  http://clinton.kopotic.com/
// @version    0.2
// @description  Adds an average daily usage calculation to a wispmon.com Usage Report
// @match      http://www.wispmon.com/usage/*
// @match      http://wispmon.com/usage/*
// @require    http://code.jquery.com/jquery-latest.js
// @copyright  2014, Clinton Kopotic
// ==/UserScript==

var $total_month_usage = $("strong:contains('Total Usage This Month:')");
var $total_month_usage_html = $total_month_usage.html();
var number_of_days = $("strong:contains('Current Month')").nextAll("br").length - 3;
var total_month_usage = parseFloat($total_month_usage_html.substring($total_month_usage_html.indexOf(":") + 1,$total_month_usage_html.indexOf("(")).trim());
console.log(total_month_usage / number_of_days);
var average_usage = total_month_usage / number_of_days;
var average_usage_html = "<strong>Average Daily Usage: " + average_usage.toFixed(4) + "</strong><br>";
$total_month_usage.next().after(average_usage_html);