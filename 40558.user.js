// ==UserScript==
// @name           Friend Stock Helper.
// @description    Enhance your experience in Friend Stock!
// @version        0.0.2
// @date           2009-01-15
// @creator        John Freeman
// @include        http://apps.facebook.com/friendstock/*
// ==/UserScript==

Utils = new Object();

/***
 * Function: Utils.getElementsByXPath(expression, node)
 *
 * Description:
 * Returns an array of elements obtained from evaluating the XPath expression on
 * the node.
 *
 * @param expression         -- the expression to evaluate.
 * @param node               -- context node, defaults to document.
 * @return array             -- an array of elements matching the expression
 */
Utils.getElementsByXPath = function(expression, node){
  if (!node) node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()){
    result.push(node);
  }

  return result;
}

var app_root  = 'http://apps.facebook.com/friendstock/i/';
var app_id    = 8837328509;

var go_home = function go_home(){
  location.href = app_root + "portfolio";
}

var get_token = function get_token(){

  var token_url = Utils.getElementsByXPath('//div/a[contains(@href, "i/bonustokens")]');
  if(token_url.length == 1){
    GM_log("getting token " + token_url[0].href);
    window.location.href = token_url[0].href;
  }

  var minutes = 15;
  var wait_time_arr = Utils.getElementsByXPath('//a[contains(@href, "i/tokens")]');
  if(wait_time_arr){
    wait_time = wait_time_arr[0].parentNode.childNodes[5].nodeValue;
    minutes = parseInt(wait_time.match(/\d+/));
    GM_log("wait " + minutes + " minutes");
  }
  setTimeout(go_home, minutes*60*1000);
}

function main(){
  get_token();
}

main();