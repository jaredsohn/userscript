// ==UserScript==
// @name           Embarcadero Highlighter
// @description    Highlight recent updates on registered users page with different colors according to how many days since it was published.
// @namespace      http://userscripts.org/
// @author         telja
// @include        http://cc.embarcadero.com/myreg*
// ==/UserScript==

(function() {
  var dayColors=new Array(
  {days: 7,color:"#ffc0cb"},
  {days: 31,color:"#98fb98"},
  {days: 62,color:"#fff5ee"}
  );
  
  
  function dayDiff(fromdate, todate)
  {
    var diff = todate - fromdate;
    if (diff!=0)
      return Math.floor(diff/86400000)
    else
      return 0;
  }
  
  function setTDBackground(aNode,tag,color){
    var children;
    var i,cnt,curNode;
    tag=tag.toUpperCase();
    if ((aNode)&&(aNode.hasChildNodes())){
      children=aNode.childNodes;
      cnt=children.length;
      for (i=0;i<cnt;i++){
        curNode=children.item(i);
        if (curNode){
          if (curNode.nodeName.toUpperCase()==tag){
            curNode.style.backgroundColor=color;
          }
        }
      }
    }
  }

  var nodes = document.evaluate('//table[@class="dltable"]/tbody/tr/td/span', document,
 null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var re;
  var dateStr,dateobj;
  var currentDate=new Date();
  var dayDifference;
  re=/[^\d]*(\d+)\s+(\w+)\s+(\d+)\s+([0-9:]+)(\s*\w+)?/i;
  for( var i = 0, node; node = nodes.snapshotItem(i); i++ ) {
    dateStr=node.getAttribute('title');
    if (dateStr){
      dateStr=dateStr.replace(re,'$1 $2 $3 $4 $5');
      dateobj=new Date(dateStr);
      dayDifference=dayDiff(dateobj,currentDate);
      
      for(var x=0;x<dayColors.length;x++){
        if (dayDifference<=dayColors[x].days){
          node.parentNode.parentNode.style.backgroundColor=dayColors[x].color;
          setTDBackground(node.parentNode.parentNode,'TD',dayColors[x].color);      
          break;
        }
      }    
    }
  }
})();