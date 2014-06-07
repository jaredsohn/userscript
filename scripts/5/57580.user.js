// ==UserScript==
// @name           Wikpedia Salvation
// @namespace      http://*.wikipedia.org/wiki/*
// @description    Helps prevent hours of reading wikipedia articles by removing all links within the articles.
// ==/UserScript==

var operations = {
  "//table[@id='toc']" : 'remove',
  "//div[@id='bodyContent']/descendant::a" : 'replace',
  "//div[@id='bodyContent']/div[@class='thumb tright']" : 'remove',
  "//span[@class='editsection']" : 'remove',
  "//div[@id='bodyContent']/div[@class='rellink relarticle mainarticle']" : 'remove',
  "//div[@id='bodyContent']/table[@class='metadata plainlinks mbox-small']" : 'remove',
  "//div[@id='bodyContent']/div[@class='dablink']" : 'remove',
  "//sup[@class='reference']" : 'remove',
  "//sup[@class='noprint Template-Fact']" : 'remove',
  "//sup[@class='noprint Inline-Template']" : 'remove',
};



var myFuncs = {
  
  remove: function(item)
  {
    item.parentNode.removeChild(item);
  },
  
  replace: function(item)
  {
    //var text = document.createTextNode(item.innerHTML.replace(/<.+>/ig, ''));
    var nel = document.createElement('span');
    nel.innerHTML = item.innerHTML;
    item.parentNode.replaceChild(nel, item);
  }

};


for( var xpath in operations )
{
  var op = operations[xpath];
  
  var els = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (l = 0; item = els.snapshotItem(l); l++) 
  {
    myFuncs[op](item);
  }
}

