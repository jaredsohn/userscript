// ==UserScript==
// @name           MISaustralia text selector
// @version				 1.1
// @namespace      com.misaustralia.textselector
// @description    Removes the "drm" on MISaustralia so text can be selected and read back by a screenreader. Also changes the font from monospace to a more readable font.
// @include        http://www.misaustralia.com/viewer.aspx*
// @include        http://misaustralia.com/viewer.aspx*
// ==/UserScript==

// Version history:
// 1.1
// Changed replacement character from _ to ∞ since _ is used in links.
// 1.0
// Initial version

var removeDRM = function ()
{
  try
  {
    var drmText = [], 
    sidepanel,
    text,
    i = 0,
    j = 0,
    k = 0,
    currentLetter,
    currentPos = 0,
    length,
    viewer,
    div = [],
    p = [],
    clearText;
    
    // Copy the heading and pictures into the placeholder Viewer1_Script0, then hide it.
    // Since visibility = hidden hides the element and does not collapse it, it will 
    // force the text to float around the images like if the text was written there in the first place.
    sidepanel = document.getElementById("sidepanel");
    viewer = document.getElementById("viewer");
    viewer.style.fontFamily = "Verdana,Arial,Helvetica,sans-serif";
    viewer.style.fontSize = "1.1em";
    viewer.style.color = "inherit";
    if(sidepanel)
    {
      div = viewer.getElementsByTagName("div");
      for(i = 0; i < div.length; i += 1)
      {
        if(div[i].getAttribute("class") === "pusher" || div[i].getAttribute("class") === "float")
        {
          if(div[i].getAttribute("class") === "pusher")
          {
            div[i].removeAttribute("class");
            div[i].style.visibility = "visible";
            if(document.getElementById("Viewer1_Script0"))
            {
            	document.getElementById("Viewer1_Script0").style.visibility = "visible";
            }
          }
          if(div[i].getAttribute("class") === "float")
          {
            div[i].style.display = "none";
          }
          p[p.length] = div[i].getElementsByTagName("p");
          for(j = 0; j < p[p.length-1].length; j += 1)
          {
            if(p[p.length-1][j].firstChild)
            {
            	p[p.length-1][j].innerHTML = p[p.length-1][j].innerHTML.replace(/&nbsp;/g, "∞").replace(/hidden/, "visible");
            	
            }
          }
        }
      }
      
      if(p.length)
      {
        p.pop();
      }
      
      for(i = 0; i < p.length; i += 2)
      {
        if(!p[i+1])
        {
          if(clearText)
          {
            p[i].innerHTML = clearText;
          }
          
          break;
        }
        
        for(j = 0; j < p[i].length; j += 1)
        {
          if(p[i][j].firstChild)
          {
            clearText = p[i][j].innerHTML;
            if(clearText)
            {
							k = clearText.indexOf("∞");
							while(k != -1)
							{
							  if(p[(i + 1)][j].innerHTML[k] === "∞")
							  {
							    clearText = clearText.substring(0, k) + " " +  clearText.substring(k + 2);
							  }
							  else
							  {
									clearText = clearText.substring(0, k) + "" +  p[(i + 1)][j].innerHTML[k] + "" +  clearText.substring(k + 1);
								}
								
								k = clearText.indexOf("∞", k + 1);
							} 
							p[i][j].innerHTML = clearText;
						}
        	}
        }
      }
    }
  }
  catch (error)
  {
    if(typeof(console) === "object" && console.error)
    {
    	console.error("Error in misaustralia.user.js version 1.0:\n" + error + " i = " + i + ", j = " + j + "\nPlease go to www.userscripts.org and look for an updated version of the script.");
    }
  }
};
removeDRM();