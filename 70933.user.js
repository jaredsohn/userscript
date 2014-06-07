// ==UserScript==
// @name          RaiMediasetVideo0.5
// @namespace     raimediasetvideo0.5
// @description   Greasemonkey script per www.rai.tv, www.video.mediaset.it e www.la7.tv
// @version 	    0.5
// @include       http://www.video.mediaset.it/video/*
// @include       http://video.mediaset.it/video/*
// @include       http://www.rai.tv/dl/RaiTV/programmi/media/*
// @include       http://rai.tv/dl/RaiTV/programmi/media/*
// @include       http://www.la7.tv/*
// @include       http://la7.tv/*
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

if(window.location.host=="www.video.mediaset.it" || window.location.host=="video.mediaset.it"){

  var my_div = document.createElement("div");
  my_div.innerHTML = '| ';
  
  unsafeWindow.addEventListener(
    'load', 
    function(){
      var parser = new DOMParser();
      var dom = "";
      if (unsafeWindow.xmlVideoMetadata!=null){
        dom = parser.parseFromString(unsafeWindow.xmlVideoMetadata, "application/xml");
      }else alert("E' necessario fare il reload della pagina");
      var essences = dom.getElementsByTagName('essences')[0].getElementsByTagName('essence');
      for (var i = 0; i < essences.length; i++) {
        var essence = essences[i].getAttribute("type");
        if(essence=="video-flv" || essence=="video-f4v" || essence=="video-wmv"){
          GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://cdnselector.xuniplay.fdnames.com/GetCDN.aspx?streamid='+unsafeWindow.jsonVideoMetadata.id+'&type='+essence,
            onload: function(responseDetails) {
              var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
              var video = dom.getElementsByTagName('video');       
              if(video.length>0){        
                src = video[0].getAttribute("src");
                my_div.innerHTML += '<a href="'+src+'">Link</a> | ';             
              }
            }
          });
        }
      }
      document.body.insertBefore(my_div, document.body.firstChild);      
    },
    true
  );  
}
else if(window.location.host=="www.rai.tv" || window.location.host=="rai.tv"){
  var my_div = document.createElement("div");
  my_div.innerHTML = '<div style="text-align:center;color:#FFFFFF;font-size:14px;"><a style="color:#FFFFFF;" href="'+unsafeWindow.videoURL+'">Link Video</a></div>';
  document.body.insertBefore(my_div, document.body.firstChild);
}
else if(window.location.host=="www.la7.tv" || window.location.host=="la7.tv"){
  var my_div = document.createElement("div");
  my_div.innerHTML = '| ';
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.la7.tv/repliche/content/index.php?contentId='+gup("assetid")+'&rnd=712',
    onload: function(responseDetails) {      
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
    var video = dom.getElementsByTagName('result')[0].getElementsByTagName('videos')[0].getElementsByTagName('video');
    for (var i = 0; i < video.length; i++) {
      my_div.innerHTML += '<a href="'+"rtmp://yalpvod.alice.cdn.interbusiness.it:1935/vod/"+video[i].textContent.split("mp4:/")[1].split("?")[0]+'">Link</a> | ';
    }
    document.body.insertBefore(my_div, document.body.firstChild); 
  }
});  
}