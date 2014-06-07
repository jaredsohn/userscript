// ==UserScript==
// @name           Better YouTube
// @namespace      http://example.org
// @description    Dim page, disable comments, hide sidebar, download videos
// @include        http://*.youtube.com/watch?*
// @author         Ionut Alex Chitu, Anmar Mansur, Brenton Cleeland, Nicholas Francisco, Richard Marquez
// ==/UserScript==

function addLightsButton()
{
  if (location.href.match(/youtube\.com\/user\//i)) {
    var divNavBar = document.evaluate("//div[@id='playnav-navbar']//tr", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var tdLights = divNavBar.insertBefore(document.createElement('td'), divNavBar.firstChild);
    var buttonLights = tdLights.insertBefore(document.createElement('a'), tdLights.firstChild);
    buttonLights.setAttribute('class', 'navbar-tab inner-box-link-color');
    buttonLights.href='javascript:;'
    buttonLights.appendChild(document.createTextNode("Lights out"));
    var divUPN = document.evaluate("//div[@id='user_playlist_navigator']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    divUPN.style.overflow = "visible";
    var divPlayer = document.evaluate("//div[@id='playnav-player']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  } else {
    var offButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNpkU02rcVEUXuc4vkOGRAwpZSgxUZShuQm/4vYO3pzzdsd+jCjyF5QiKQMkmSDymc/97meVm3vvqtXe7bOetZ71rHUUIQS9bLPZVNbrtb7f7wl+Pp/p8XiQ2WymYDCoRyIR4xWrvIDj8VhcLhdyOp1ks9nIYrGQoiiEN5mM+v0+x+Xzed3tdhsMHAwGwuFwkNfrpefzSff7nR3V8B2JkLDT6dBwOKRSqaQrk8lEgFIgEKDr9cqVQA0nDBW32y17OBymWq1GHo+H1NlsxheAQE3TNK4CABwM7HY7mUwmGo1GlEwmmba22+2YyvF4JFVVv1HECSCSrlYr7jUUCrFoGqocDgeyWq3U7Xb5BFUkARhBOJfLJbeDQmClgTcopFIpDsAH0Hr1h17lmPgei8Wo3W6THAup0WhUx6NUlhKJxBfodruxwwDOZrM0nU45LpfLVTRJyUin09RoNHQEoVdIz3Skw7AMi8WCWq0Wj8Llcv37WgBsTbPZ1CEAgOgR4qDnXq9HcuhULpd1v99vfNsc2Hw+r9TrdR10oSKqn04nrlatVv9K0OcrVqU3k6oZUBjjgYJyP0kG8xzfQTCNfhhWz+fzUTweJywHhi17ol8Gqu8uaf0pFotCKicymYwoFApC/gAfP+P+CzAAmPhAEzyJ4TsAAAAASUVORK5CYII=";
    var overButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC";
    var divWatchHeadline = document.evaluate("//div[@id='watch-headline-user-info']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    var buttonLights = divWatchHeadline.appendChild(document.createElement('button'));
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    buttonLights.title = 'Lights out';
    buttonLights.setAttribute('class', 'yt-uix-button yt-uix-tooltip');
    buttonLights.setAttribute('data-tooltip-title', 'Lights out');
    var imgLights = buttonLights.appendChild(document.createElement('img'));
    imgLights.alt = '';
    imgLights.src = offButton;
    buttonLights.addEventListener('mouseover', function() { imgLights.src = overButton; }, false);
    buttonLights.addEventListener('mouseout', function() { imgLights.src = offButton; }, false);
    var divPlayer = document.evaluate("//div[@id='watch-player']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  }
  buttonLights.setAttribute('onclick', '; return false;');
  buttonLights.addEventListener('click', function() { lightsOut(); }, false);
  divPlayer.style.zIndex = "200";
}

function lightsOut()
{
  var lightImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlOzEo46UAAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
  var mediumImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPNpTNmawAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
  var darkImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAAAXRSTlPnfoivvQAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
  var outImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAADklEQVQYlWNgGAWDCQAAAZAAAdjzlT8AAAAASUVORK5CYII=";
  
  if(!document.getElementById('lightsOut')) {
    var imgLightsOut = document.createElement('img');
    if (youtubeLightsOutSequence == "immediate_off") {
      imgLightsOut.src = outImg;
    } else {
      imgLightsOut.src = mediumImg;
    }
    imgLightsOut.setAttribute('id', 'lightsOut');
    imgLightsOut.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:' + document.documentElement.scrollHeight + 'px;z-index:199;');
    imgLightsOut.addEventListener('click', function () {
        if ((youtubeLightsOutSequence == "dim_only") || (document.getElementById('lightsOut').src == outImg)) {
          if (location.href.match(/youtube\.com\/user\//i)) {
            document.evaluate("//div[@id='playnav-body']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.removeChild(document.getElementById('lightsOut'));
          } else {
            document.body.removeChild(document.getElementById('lightsOut'));
          }
        } else {
          lightsOut();
        }
      }, false);
    if (location.href.match(/youtube\.com\/user\//i)) {
      document.evaluate("//div[@id='playnav-body']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.appendChild(imgLightsOut);
    } else {
      document.body.appendChild(imgLightsOut);
    }
  } else {
    document.getElementById('lightsOut').src = outImg;
  }
}

function addMenuCommands()
{
  GM_registerMenuCommand("Set Lights Dim then Off", function () {
    youtubeLightsOutSequence = "dim_then_off";
    GM_setValue("youtube_lights_out_sequence", youtubeLightsOutSequence);
  });
  GM_registerMenuCommand("Set Lights Dim Only", function () {
    youtubeLightsOutSequence = "dim_only";
    GM_setValue("youtube_lights_out_sequence", youtubeLightsOutSequence);
  });
  GM_registerMenuCommand("Set Lights Immediately Off", function () {
    youtubeLightsOutSequence = "immediate_off";
    GM_setValue("youtube_lights_out_sequence", youtubeLightsOutSequence);
  });
}

var youtubeLightsOutSequence = GM_getValue("youtube_lights_out_sequence", "dim_then_off");

function removeComments()
{
    var comments = document.getElementById('watch-discussion');
    if (comments) {
        comments.parentNode.removeChild(comments);
    }
}

function removeSidebar()
{
    var sidebar = document.getElementById('watch-sidebar');
    if (sidebar) {
        sidebar.parentNode.removeChild(sidebar);
    }
}

function addDownloadButton()
{
  var FORMAT_LABELS={'5':'FLV 240p','18':'MP4 360p','22':'MP4 720p (HD)','34':'FLV 360p','35':'FLV 480p','37':'MP4 1080p (HD)'};
  var FORMAT_LIST=['5','18','34','35','22','37'];
  var DOWNLOAD_LINK_MESSAGE='Download';
  var DOWNLOAD_TOOLTIP_MESSAGE='Download this video';
  var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
  var DOWNLOAD_YOUTUBE_FMT18_ID='download-youtube-video-fmt18';
  var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';
  
  // download-youtube-video is a container for the download message
  if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;
  var videoPlayer=document.getElementById('watch-player');
  if (videoPlayer==null) return;  
  var flashValues=videoPlayer.innerHTML;
  
  // obtain video ID, temporary ticket, formats map and title
  var videoIdMatches=flashValues.match(/\&video_id=([^(\&|$)]*)/);
  var videoId=(videoIdMatches!=null)?videoIdMatches[1]:null;
  if (videoId==null) return;    
  var videoTicketMatches=flashValues.match(/\&t=([^(\&|$)]*)/);
  var videoTicket=(videoTicketMatches!=null)?videoTicketMatches[1]:null;
  if (videoTicket==null) return;  
  var videoFormatsMatches=flashValues.match(/\&fmt_url_map=([^(\&|$)]*)/);
  var videoFormats=(videoFormatsMatches!=null)?videoFormatsMatches[1]:null; 
  var videoTitle=document.title.replace(/^YouTube \- /i,'').replace(/["\?:\*]/g,'').replace(/[&\|\\\/]/g,'_').replace(/#/g,'%23').replace(/'/g,'%27'); 
             
  // parse fmt_url_map
  var videoURL=new Array();
  var isFinalURL=new Array();
  var videoFormatsGroup=videoFormats.split('%2C');
  for (var i=0;i<videoFormatsGroup.length;i++){
    var videoFormatsElem=videoFormatsGroup[i].split('%7C');
    videoURL[videoFormatsElem[0]]=unescape(videoFormatsElem[1]);
    isFinalURL[videoFormatsElem[0]]=true;
  }
  if (videoURL['18']==undefined){
    // add standard MP4 format (fmt18), even if it's not included
    videoURL['18']='http://www.youtube.com/get_video?fmt=18&video_id='+videoId+'&t='+videoTicket;
    isFinalURL[videoFormatsElem[0]]=false;
  }
  var downloadCodeList=[];
  for (var i=0;i<FORMAT_LIST.length;i++){
    var format=FORMAT_LIST[i];
    if (format=='5' && (videoURL['34']!=undefined||videoURL['35']!=undefined)) continue;
    if (format=='34' && videoURL['35']!=undefined) continue;   
    if (videoURL[format]!=undefined && FORMAT_LABELS[format]!=undefined){         
      downloadCodeList.push({url:videoURL[format]+'&title='+videoTitle,isFinalURL:isFinalURL[format],format:format,label:FORMAT_LABELS[format]});
    }
  }  
 
  // generate download code
  var downloadCode='<span class="yt-uix-button-content">'+DOWNLOAD_LINK_MESSAGE+'</span>';                 
  if (downloadCodeList.length>1) {
    downloadCode+='&nbsp; <img class="yt-uix-button-arrow" src="" alt="" /> <ul style="display:none;" class="yt-uix-button-menu">';
    for (var i=0;i<downloadCodeList.length;i++) { 
      if (downloadCodeList[i].format=='18' && !downloadCodeList[i].isFinalURL) {
        downloadCode+='<li><span id="'+DOWNLOAD_YOUTUBE_FMT18_ID+'" url="'+downloadCodeList[i].url+'" onclick="location.href=document.getElementById(\''+DOWNLOAD_YOUTUBE_FMT18_ID+'\').getAttribute(\'url\');" class="yt-uix-button-menu-item">'+downloadCodeList[i].label+'</span></li>';
      } else {
        downloadCode+="<li><span onclick='location.href=\""+downloadCodeList[i].url+"\";' class='yt-uix-button-menu-item'>"+downloadCodeList[i].label+"</span></li>";
      }
    }
    downloadCode+='</ul>';
  }    
  downloadCode='<button id="'+DOWNLOAD_YOUTUBE_BUTTON_ID+'" data-button-listener="" data-tooltip-timer="271" class="yt-uix-button yt-uix-tooltip" data-tooltip="'+DOWNLOAD_TOOLTIP_MESSAGE+'" onclick="return false;" type="button">'+downloadCode+'</button>';
  if (downloadCodeList.length==1) {
      if (downloadCodeList[0].format=='18' && !downloadCodeList[0].isFinalURL) {
        downloadCode='<span id="'+DOWNLOAD_YOUTUBE_FMT18_ID+'" url="'+downloadCodeList[0].url+'" onclick="location.href=document.getElementById(\''+DOWNLOAD_YOUTUBE_FMT18_ID+'\').getAttribute(\'url\');">'+downloadCode+'</span>';
      } else {
        downloadCode="<span onclick='location.href=\""+downloadCodeList[0].url+"\";'>"+downloadCode+"</span>";
      }  
  }
                                           
    var containerSpan=document.createElement('span');
    containerSpan.id=DOWNLOAD_YOUTUBE_SPAN_ID;
    var flagButton=document.getElementById('watch-flag');
    if (flagButton && flagButton.parentNode && flagButton.parentNode.parentNode) {
        containerSpan.innerHTML='&nbsp; '+downloadCode;
        flagButton.parentNode.parentNode.insertBefore(containerSpan,flagButton.parentNode);
    } else if (flagButton && flagButton.parentNode) {
        containerSpan.innerHTML=downloadCode+'&nbsp;&nbsp; ';
        flagButton.parentNode.insertBefore(containerSpan,flagButton);
    } else {
        var actionsDiv=document.getElementById('watch-actions-right');
        if (actionsDiv==null) return;
        containerSpan.innerHTML='&nbsp;&nbsp;'+downloadCode;
        actionsDiv.appendChild(containerSpan);
    }
  
  // get final redirect URL for fmt18 videos (only works in Greasemonkey)
  var downloadFMT18=document.getElementById(DOWNLOAD_YOUTUBE_FMT18_ID);
  if (downloadFMT18 && typeof GM_xmlhttpRequest!='undefined') {  
    var url=downloadFMT18.getAttribute('url');
    try { var xhr=GM_xmlhttpRequest({
      method: 'HEAD',
      url: url,
      onreadystatechange: function(response) {
        if (response.readyState == 2 || response.readyState == 3) {
          xhr.abort();
        } else if (response.readyState == 4) {
          if (response.status=='404') {
            downloadFMT18.setAttribute('url', 'javascript:void(0)');
          } else if (response.finalUrl!=url) { 
            downloadFMT18.setAttribute('url', response.finalUrl+'&title='+videoTitle);
          }
        }
      }
    }) 
    }
    catch(e) {}
  }
 
}

removeComments();
removeSidebar();
addMenuCommands();
addLightsButton();
addDownloadButton();

