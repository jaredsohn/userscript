// ==UserScript==
// @name           CancelBuildCheck
// @namespace      CS
// @description    Exchanges the original Cancel Build Button with a new one with a double Check popup ...
// @include        http://www.chosenspace.com/v2/*
// @exclude        http://www.chosenspace.com/v2/view/*
// ==/UserScript==
var test=location.href.search('construct\_build');
if(test != -1) {
   var CancelBuildArray=document.evaluate("//input[@value='Cancel Build']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var CancelBuild=CancelBuildArray.snapshotItem(0);
   if(CancelBuild){
      var action=CancelBuild.parentNode.getAttribute('action');
      var Replacement=document.createElement('input');
         Replacement.type='button';
         Replacement.className='forms_btn';
         Replacement.style.width='75px';
         Replacement.value='Cancel Build ²';
         Replacement.setAttribute('onclick',"var check=confirm('Are you sure you want to Cancel the Outpost Build?\\nAll ressources invested will be lost.\\nIncluding your precious time!'); if(check) { var check2=confirm('Absolutely sure?\\nExtremely sure you want to abandon all invested ressources?\\nReally, really sure about this?'); if(check2) { location.href='"+action+"'; } }");
      CancelBuild.parentNode.parentNode.appendChild(Replacement);
      CancelBuild.parentNode.parentNode.removeChild(CancelBuild.parentNode);
   }
}