// ==UserScript==
// @name           ponYoutube
// @author         Tei
// @include        http://www.erepublik.com/*
// ==/UserScript==


function html2txt(html){ 
    var salida=html;
    salida=salida.replace(/&gt;/g,   '>');
    salida=salida.replace(/&lt;/g,   '<');
    salida=salida.replace(/&#039;/g, "'");
    salida=salida.replace(/&quot;/g, '"');
    salida=salida.replace(/&amp;/g,  '&');
    return salida;
}


var links = document.getElementsByTagName("a");

for (var i=0; i < links.length; i++) {
    var item = links[i];
    var url = item.getAttribute("href") + "";

    GM_log("("+i+"):"+url);
    
    var parts = url.split("?"); 
    if (parts.length>0){ url = parts[0];   }    

  if (url == "http://docs.google.com/present/embed"){
       GM_log("isGoogleDoc:"+url);
      var src =  html2txt(item.innerHTML);
      var iframe= document.createElement("iframe");

      iframe.width = "410";
      iframe.height= "342";
      iframe.src = src;     
      item.href = src;

       var span = document.createElement("div");
       span.appendChild( iframe );
       item.innerHTML = span.innerHTML;
       
      //item.parentNode.replaceChild(iframe, item);  

   }else    if (url == "http://chart.apis.google.com/chart"){
       GM_log("isGoogleChart:"+url);
      var src =  html2txt(item.innerHTML);
      var img = document.createElement("img");
      img.src = src;     
      item.href = src;
      
      var span = document.createElement("span"); 
      span.appendChild( img );

      item.innerHTML = span.innerHTML;
  //      var parentDiv = item.parentNode;
  //    parentDiv.replaceChild(img, item);       

    }else if ( url == "http://www.youtube.com/watch" ) {
       GM_log("isYoutube:"+url + ", scanning part:" + parts[1]);
      var code =  parts[1];// item.innerHTML; <-- used to be this. why?  no idea, but I don't smell good... 
	    //ref="http://www.youtube.com/watch?v=svC_yqKPKds&amp;feature=related" <--- trouble url !! grrr....
      code = code.replace("http://www.youtube.com/watch?v=","");//no needed anymore
      code = code.replace("http://youtube.com/watch?v=","");//no needed anymore
      code = code.replace("&feature=related","");
      code = code.replace("&amp;feature=related","");
      code = code.replace("v=","");
      code = code.replace("?v=","");
      code = code.replace("\"","");
      code = code.replace("'","");
      code = code.replace("(","");
      code = code.replace("]","");

      var html = "<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/"+code+"&hl=es&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/"+code+"&hl=es&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>";

       item.innerHTML = html;

    } else  if ( url == "youtube" ) {
       GM_log("isYoutubeQuick:"+url);
      var code = links[i].innerHTML;// ="<b>aqui el video</b>";
      code = code.replace("&feature=related","");
      code = code.replace("\"","");
      code = code.replace("'","");
      code = code.replace("(","");
      code = code.replace("]","");

      var html = "<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/"+code+"&hl=es&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/"+code+"&hl=es&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>";

       item.innerHTML = html;

    }  else if (url == "overstream") {
       GM_log("isOverstream:"+url);
        var code = links[i].innerHTML;
      code = code.replace("\"","");
      code = code.replace("'","");
      code = code.replace("(","");
      code = code.replace("]","");

         var html = "<object width='402' height='377'><param name='movie' value='http://www.overstream.net/swf/player/oplx?oid="+code+"&noplay=1'></param><param name='allowFullScreen' value='true'></param><embed src='http://www.overstream.net/swf/player/oplx?oid="+code+"&noplay=1' type='application/x-shockwave-flash' width='402' height='377' allowFullScreen='true'></embed></object>";
         item.innerHTML = html;
     } else {
 //     item.innerHTML = "no:" + links[i].innerHTML;  
    }
}