// ==UserScript==
// @name           experimentalCosa
// @author         Tei
// @include        http://www.erepublik.com/*
// ==/UserScript==


var links = document.getElementsByTagName("a");

function html2txt(html){ 
    var salida=html;

    salida=salida.replace(/&gt;/g,   '>');
    salida=salida.replace(/&lt;/g,   '<');
    salida=salida.replace(/&#039;/g, "'");
    salida=salida.replace(/&quot;/g, '"');
    salida=salida.replace(/&amp;/g,  '&');

    return salida;
}

//http://chart.apis.google.com/chart?cht=p3&chd=t:99,1,10&chs=600x200&


for (var i=0; i < links.length; i++) {
    var item = links[i];
    var url = item.getAttribute("href") + "";

    //detect url with paramters (true url)
    var parts = url.split("?"); 
    if (parts.length>0){ url = parts[0];   }
    
    if (url == "http://chart.apis.google.com/chart"){
      var src =  html2txt(item.innerHTML);
      var img = document.createElement("img");
      img.src = src;
     
      item.innerHTML = "ERROR,url:"+src;
      item.href = src;

      var parentDiv = item.parentNode;
 
      // replace existing node itemwith the new element img
      parentDiv.replaceChild(img, item);


       
    }else     if ( url == "http://www.youtube.com/watch" ) {
      var code = links[i].innerHTML;// ="<b>aqui el video</b>";
      code = code.replace("http://www.youtube.com/watch?v=","");
      code = code.replace("http://youtube.com/watch?v=","");

      var html = code + "<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/"+code+"&hl=es&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/"+code+"&hl=es&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>";

       links[i].innerHTML = html;

    } else  if ( url == "youtube" ) {
      var code = links[i].innerHTML;// ="<b>aqui el video</b>";

      var html = "<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/"+code+"&hl=es&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/"+code+"&hl=es&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>";

       links[i].innerHTML = html;

    }  else if (url == "overstream") {
        var code = links[i].innerHTML;
         var html = "<object width='402' height='377'><param name='movie' value='http://www.overstream.net/swf/player/oplx?oid="+code+"&noplay=1'></param><param name='allowFullScreen' value='true'></param><embed src='http://www.overstream.net/swf/player/oplx?oid="+code+"&noplay=1' type='application/x-shockwave-flash' width='402' height='377' allowFullScreen='true'></embed></object>";
         links[i].innerHTML = html;
     } else {
      //links[i].innerHTML = "cosas:" + links[i].innerHTML;
    }
}