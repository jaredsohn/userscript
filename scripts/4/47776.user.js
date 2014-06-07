// ==UserScript==
// @name            qq news accessibility layout
// @version         0.1
// @namespace       http://uestc.edu.cn/
// @author          eric lee
// @description     First version for news.qq.com
// @include         http://news.qq.com/a*
// ==/UserScript==
function getContentNodes()
{
    var contentNodes = new Array();
    var divNodes = document.getElementsByTagName("div");
    var divNode = null;
    var len = divNodes.length;
    
    for (var i = 0; i < len; i++)
    {
        divNode = divNodes[i];
            
        if (divNode.id == "nowpsn" ||
            divNode.id == "cntL" ||
            divNode.id == "cntR")
        {              
            contentNodes.push(divNode);
        }
    }
    
    return contentNodes;
}

function disableUselessContent()
{
   var disabledDivIds = "ArtInfo,AdZoneLa,AdZoneLb,AdZoneLc,AdZoneLd, AdZoneLe,AdZoneLf,AdZoneRa,AdRoneRb,Adflashyk,AdZoneRd, AdZoneRf, AdZoneRe";
   var disabled_div_ids_array = disabledDivIds.split(",");
   var disabledCount = disabled_div_ids_array.length;
   alert(disabled_div_ids_array.toString());
   if (true)
   {
      var bodyNode = document.getElementsByTagName("body").item(0);
      var divNodes = bodyNode.getElementsByTagName("div");
      var divCounts = divNodes.length;
      alert("divNodes.length = " + divNodes.length);

      var k = 0;
      alert("divNodes[0] = " + divNodes[k].id);
      alert("divNodes.item(0) = " + divNodes.item(k).id);

      var i = 0;
      var j = 0;
      for (i = 0; i < divCounts; i++)
      {
          for (j = 0; j < disabledCount; j++)
          {
              //alert("divNodes.item(i) = " + divNodes.item(i).id);
              if (divNodes.item(i).id == disabled_div_ids_array[j])
              {
                  divNodes.item(i).innerHTML = "";
                  break;
              }
          }
      }
   }
   
}

function extractContent()
{  
    var bodyNode = document.getElementsByTagName("body").item(0);
    contentNodes = getContentNodes();
    
    bodyNode.style.display = "block";

    if (contentNodes.length == 0) return;
        
    while(bodyNode.firstChild)
    {
        bodyNode.removeChild(bodyNode.firstChild);
    }
    
    for (var i = 0; i < contentNodes.length; i++)
    {
        bodyNode.appendChild(contentNodes[i]);
    }

    disableUselessContent();           
}

extractContent();