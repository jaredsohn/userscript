// ==UserScript==
// @name           Bart Simpson 2 Fix
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Make Bart Simpson 2's topic titles not be in caps
// @include        http://www.gamefaqs.com/boards/gentopic.php?board=402*
// @include        http://www.gamefaqs.com/boards/genmessage.php?board=402*
// @version        1.3
// ==/UserScript==

var url = window.location.href;

function fixCase(string)
{
   var words = string.split(" ");
   for(var i=1; i<words.length; i++)
   {
      if(words[i].length > 0 && words[i] != "I" && words[i].substring(0,2) != "I'")
      {
         if(words[i] != words[i].toUpperCase())
            words[i] = words[i].toLowerCase();
      }
   }
   return words.join(" ");
}

function dealWithTopic(topic)
{
   for(var i in topic.title.childNodes)
      if(topic.title.childNodes[i].tagName=="A" && topic.title.childNodes[i].textContent.length>5)
      {
         topicLink = topic.title.childNodes[i];
         topicLink.textContent = fixCase(topicLink.textContent);
      }
}

function getTopics()
{
   var topics = document.evaluate('//table[@class="board topics"]//tr/td',
                document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(!topics||topics.snapshotLength==0) return null;
   var result = new Array();
   for(var i=0; i<topics.snapshotLength-4; i+=5)
   {
      result.push({title: topics.snapshotItem(i+1),
                   author: topics.snapshotItem(i+2),
                   count: topics.snapshotItem(i+3),
                   time: topics.snapshotItem(i+4)});
   }
   
   return result;
}

function isBartTC()
{
   if(/Bart Simpson/.test(url)) return true;
   
   var posts = document.evaluate('//table[@class="board message"]//tr/td',
               document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if(!posts||posts.snapshotLength==0) return false;
   
   return /Bart Simpson/.test(posts.snapshotItem(0).textContent);
}


if(/gentopic.php/.test(url))
{
   var topics = getTopics();
   for(var i=0; i<topics.length; i++)
      if(/Bart Simpson/.test(topics[i].author.textContent))
         dealWithTopic(topics[i]);
}

if(/genmessage.php/.test(url))
{
   if(isBartTC())
   {
      document.title = fixCase(document.title);
      var h2s = document.evaluate( "//h2[@class='title']//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
      for(var i = 0; i < h2s.snapshotLength; i++)
      { 
        node = h2s.snapshotItem(i); 
        node.data = fixCase(node.data); 
      }
   }
}