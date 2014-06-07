// ==UserScript==
// @name           Facebook Social Plus Cleaner
// @namespace      nosocialplusframp
// @description    remove [Social +]
// @include        http://*.facebook.com/*
// ==/UserScript==

document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentChanged(event) {
  
textNodes = document.evaluate("//span[@id='profile_status']//text() | //div/h6[@class='uiStreamMessage']//text() | //span[@class='UIStory_Message']//text() | //div[@class='comment_actual_text']//text() | //div[@class='info_section']//text() | //h3[@class='GenericStory_Message']//text() | //div[@class='walltext']//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        
var start = null;
var end = null;
for (var i = 0; i < textNodes.snapshotLength; i++) 
{
    node = textNodes.snapshotItem(i);
    if(!(node.data.match(/^\s*$/))) 
    {
      nodeData = node.data;
      regex = /\[Social\+\](.*)\[\/\]/gi.exec(nodeData);
      if (regex instanceof Array)
      {
        nodeData = " " + regex[1].replace(/\[.*?\]/g, "");
      }
      else
      {
	if (!start)
	  start = /\[Social\+\]/gi.exec(nodeData);
	
	if (!end)
	  end = /\[\/\]/gi.exec(nodeData);
	else 
	  start = null;
      }
      if (start)
	nodeData = nodeData.replace(/\[.*?\]/g, "");
      node.data = nodeData;
    }
}

}