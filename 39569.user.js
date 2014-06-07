// ==UserScript==
// @name           Schueler/Mein/Studie VZ Picture Unlock
// @namespace      -
// @description    Fügt Link zu allen Bildern in den VZ's hinzu
// @include        http://www.*vz.net/Photos/*
// @version        1.2b
// ==/UserScript==

function addLinkToAlbum()
{ 
  var allPageTags = document.getElementsByTagName("*");
  var text, text2;
  
   for (var i=0; i<allPageTags.length; i++)
   { 
     if (allPageTags[i].className == "photo")
     { 
       text = allPageTags[i].innerHTML;

       text2 = text.slice(text.search("http://"), text.search("\" alt=")+1);
       text2 = text2.replace("-m.jpg", ".jpg");
       text += "<div class=\"overview\" align=\"center\"><a href=\""+ text2 +"\" align=\"center\"><b>Open Picture</b></a></div>";
    
       allPageTags[i].innerHTML = text;
     } 
   }
}


function addLinkToSlider()
{
  var allPageTags = document.getElementsByTagName("*");
  var text="", link="", text2="", n=0;
  var linkArray = new Array();

  for (var i=0; i<allPageTags.length; i++)
  { 
    if (allPageTags[i].className == "slider photos")
    { 
      text = allPageTags[i].innerHTML;
      var listArray = new Array();
      listArray = text.split("<li>");
      
      
      for(var m=0; m<listArray.length; m++)
      {
        link = listArray[m].slice( listArray[m].search("http://"), listArray[m].search("\"></a></li>") );
        
        if(link != null && link != "")
        {
          linkArray[n] = link;
          n++;
          
        }
      }
      
      if(n > 0)
      {
        text2 = "<div align=\"center\">";
                
        for(var p=0; p<linkArray.length; p++)
        {
          text2 = text2 + "<a href=\""+ linkArray[p].replace("-s.jpg", ".jpg") +"\" align=\"center\"><img src=\"" + linkArray[p] + "\"</a>  ";
        }
        
        document.getElementById("Snipplet-Photos-Slider").innerHTML = text2;
      }
    } 
  }
}

function addLinkToPics()
{ 
  if(document.getElementById("Snipplet-Photos-Slider") == null)
  {
    addLinkToAlbum();
  }
  
  else
  {
    addLinkToSlider();
    
    var text = document.getElementById("Snipplet-Photos-Slider").innerHTML;
    var text2 = document.getElementById("PhotoContainer").innerHTML;
    
    text2 = text2.slice(text2.search("http://"), text2.search("\" alt="));
     
    text = "<div class=\"overview\" align=\"center\"><a href=\""+ text2 +"\" align=\"center\"><b>Open Picture</b></a></div>" + text;
    
    document.getElementById("Snipplet-Photos-Slider").innerHTML = text;
  }
}
addLinkToPics();