// ==UserScript==
// @name           iWeb Textify
// @namespace      http://xurble.org/userscripts
// @description    Turn nasty iWeb image posts into text for copy and paste and the like.
// @include        *
// ==/UserScript==


if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(prefix) {
//    return (this.substr(0, prefix.length) == prefix);
    return (this.indexOf(prefix) === 0);
  };
}

unsafeWindow.textify = function()
{
   var imgList = document.getElementsByTagName('img');
   for(var j=0; j < imgList.length;j++)
   {
      var theImg = imgList[j];
      if(theImg.getAttribute("longdesc")  != null)
      {
         newdiv = document.createElement('div');
         newdiv.innerHTML = theImg.getAttribute("longdesc");
         while(newdiv.innerHTML.indexOf("\n") > 0)
         {
            newdiv.innerHTML = newdiv.innerHTML.replace("\n","<br>");
         }
         //alert(newdiv.innerHTML);
         var theStyle = theImg.getAttribute("style");
         theStyle += "width:auto;z-index:999;font-size:9pt;height:auto;text-align:left;padding:8px;background-color:#aaa;color:white;font-family:Helvetica,Verdana,sans-serif;font-weight:bold;-moz-border-radius:10px;opacity:.8";
         newdiv.setAttribute("style",theStyle);
         theImg.parentNode.insertBefore(newdiv, theImg.nextSibling);
         theImg.setAttribute("style", "display:none;");

      }
   }

}

	
var metaTags = document.getElementsByName('Generator');
for (var i = 0; i < metaTags.length; i++) 
{
   if(metaTags[i].content.startsWith("iWeb"))
   {

      var canTextify = false;
      var imgList = document.getElementsByTagName('img');
      for(var j=0; j < imgList.length;j++)
      {
         var theImg = imgList[j];
         if(theImg.getAttribute("longdesc")  != null)
         {
            canTextify = true;
         }
      }

      if(canTextify)
      {
         var linkDiv = document.createElement('div');
         linkDiv.setAttribute("style","position:absolute;top:5;left:5;width:auto;z-index:999;font-size:8pt;height:auto;text-align:left;padding:4px;background-color:#aaa;color:white;font-family:Helvetica,Verdana,sans-serif;-moz-border-radius:5px;opacity:.8;");
         linkDiv.innerHTML='[<a style="color:#FFF;hover:#F00" href="javascript:textify()">Textify</a>]';
   
         var bodyNodes = document.getElementsByTagName('div');
         if (bodyNodes && bodyNodes.length > 0) 
         {
            
            var n = bodyNodes[0];
            n.parentNode.insertBefore(linkDiv, n);
         }
      }
   }
}


