// ==UserScript==
// @name           ddGalleries
// @namespace      //
// @include        http://today.deviantart.com/dds/
// ==/UserScript==

function getGalls()
{
var allDD = document.getElementsByTagName("td");
  for(var i = 0; i < (allDD.length); i++)
  {
    if(allDD[i].className == "f")
    {
      var soloDD = allDD[i];
        if(!!soloDD.childNodes[0].getAttribute("category"))
        {
        var gallery = soloDD.childNodes[0].getAttribute("category");
        }
        else
        {
          var gallery = soloDD.childNodes[0].childNodes[0].getAttribute("category");
        }
        var galSpan = document.createElement("span");
        galSpan.innerHTML = " <br/><br/><span><em>"+gallery+"</em></span>";
        
        
        
        
        var feet = soloDD.getElementsByTagName("div");
        for(var f = 0; f < feet.length; f++)
        {
          if(feet[f].className == "foot")
          {
            var foot = feet[f]
            foot.appendChild(galSpan);
            f = feet.length;
          }
        
        }
        
       } 
        
      
}
}

getGalls();