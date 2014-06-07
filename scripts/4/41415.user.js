// ==UserScript==
// @name          OKCupid Homepage Cleanup
// @namespace     ericzozozo:okcupid:homepage
// @description	  Removes any forum posts with "Bang or Pass" or "person above you" in the forum title
// @include       http://www.okcupid.com/home
// @include       http://www.okcupid.com/
// ==/UserScript==


var anchors = document.getElementById('activity_wrapper').getElementsByTagName('a');
var regex = /(bang or pass|person above you)/i;

for(var i=0; i<anchors.length; ++i)
{
  try {
    var anchor = anchors[i];
    
    if(!anchor.getAttribute('href') || !anchor.getAttribute('href').indexOf('/forum') == -1 || 
       !anchor.innerHTML || !anchor.innerHTML.match(regex))
      continue;
    
    var p = anchor;

    var found = false;
    do {
      var classname = p.getAttribute('class');
      
      if(classname && classname.indexOf('event_item') != -1)
      {
        found = true;
        break;
      }
      else if(!p.parentNode)
        break;
      
      p = p.parentNode;
    } while(!found)
    
    if(found)
    {
      p.parentNode.removeChild(p);
    }
  } catch(e) { }
}