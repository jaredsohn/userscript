// ==UserScript==
// @name                Nico Nico Douga Video Downloader
// @namespace           Kapow
// @description         Adds download button to nicovideo page
// @include             http://www.nicovideo.jp/watch/*
// @exclude             http://*http://
// ==/UserScript==

// thanks to nicopon for the original "smile downloader" script!

(function() {

// replace Heading element to selectable text (with form)
function elementSelectable(_elem) {
  var tn = false;
  for (var i=0; i<_elem.childNodes.length; i++) {
    if (_elem.childNodes[i].nodeType == 3) {
      tn = _elem.childNodes[i];
    }
  }
  var ct = tn.nodeValue
  var ft = document.createElement('input');
    ft.type="text";
    ft.name="m_title";
    ft.value=ct;
    ft.readonly="true";
    ft.title=ct;
    ft.style.font="large bold";
    ft.style.border="solid 1px #666";
    ft.style.width="22em";
    ft.style.height="1em";
    if (inUA('Opera')!=-1) {
      ft.onclick="this.focus();this.select();";
    } else if (inUA('MSIE')!=-1) {
      ft.onclick=function(){this.focus();this.select();};
    } else if (inUA('Gecko')!=1 || inUA('AppleWebKit')!=-1) {
      ft.addEventListener('click',function(){this.focus();this.select();}, true);
    }
  _elem.replaceChild (ft, tn);
}

// create image link
function createImgElement(_src, _alt, _href) {
  if (_href) {
    var ca = document.createElement('a');
      ca.href = _href;
  }
  var im = document.createElement('img');
    im.alt = _alt;
    im.src = _src;
    im.style.border = "none";
  if (ca) {
    ca.appendChild(im);
    return ca;
  } else {
    return im;
  }
}

// detect user agent
function inUA(_val) {
  return navigator.userAgent.indexOf(_val);
}

// create XMLHttpRequest object
function createXMLHttpRequest() {
  var r = false;
  try {
    r = new ActiveXObject("Msxml2.XMLHTTP");
  } catch(e) {
    try {
      r = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(f) {
      r = false;
    }
  } if (!r && typeof XMLHttpRequest !="undefined") {
    r = new XMLHttpRequest();
  }
  return r;
}

var nicoponFn = function() {
  if (location.href.indexOf("http://www.nicovideo.jp/watch/")!=-1) {
    //　find "watch/smXXX" style URI
    var links=document.getElementsByTagName('link');
    var origURI="";
    for (var i=0; i<links.length; i++) {
      if (links[i].rel=="canonical") {
        origURI=links[i].href;
      }
    }

    // find title P tag
    var titles = document.getElementsByClassName("videoHeaderTitle"); // GINZA
    if (titles.length > 0) {
      var title = titles[0];
    } else {
      var title = document.getElementById("video_title"); // old layout
    }

    // replace title
    elementSelectable(title);

    // collect file information
    var videoIdentifier = location.href.replace(/http.*?watch\/([^?]*)(\?.*)?$/g,"$1");

    GM_xmlhttpRequest( {
      method: "GET",
      url: "http://flapi.nicovideo.jp/api/getflv?v="+videoIdentifier,
      onload: function(responseDetails) {
        var tid=unescape(/thread_id\=(.*?)\&l/.exec(responseDetails.responseText)[1]);
        var flvURL=unescape(/url\=(.*?)\&link/.exec(responseDetails.responseText)[1]);
        if (/nm/.exec(videoIdentifier)) {
          flvURL += "as3";
        }
//        var imgSrc="http://nicopon.jp/images/flv_dl.png"; //TODO: get new image, nicopon is gone
//        var imgAlt="[DL]";
//        title.appendChild(createImgElement(imgSrc, imgAlt, flvURL));
        var dl=document.createElement('a');
        dl.appendChild(document.createTextNode("[DL]"));
        dl.setAttribute("style","font-size:12px;");
        dl.setAttribute("href",flvURL);
        title.appendChild(dl);
        
        if (tid != "") {
          // make links for "bgm" (custom banner above video)
          GM_xmlhttpRequest( {
            method: "GET",
            url: "http://flapi.nicovideo.jp/api/getbgm?v="+videoIdentifier,
            onload: function(responseDetails) {
              if (responseDetails.responseText.indexOf("<url>") >= 0) {
                var bgmURL=/<url>(.*?)<\/url>/.exec(responseDetails.responseText)[1];
                var bgmIdentifier=/s=(.*?)\./.exec(bgmURL)[1];
                var bgmPage=document.createElement('a');
                bgmPage.appendChild(document.createTextNode("[BGM]"));
                bgmPage.setAttribute("style","font-size:12px;");
                bgmPage.setAttribute("href","http://www.nicovideo.jp/watch/nm"+bgmIdentifier);
                title.appendChild(bgmPage);
                var bgmDL=document.createElement('a');
                bgmDL.appendChild(document.createTextNode("[BGM DL]"));
                bgmDL.setAttribute("style","font-size:12px;");
                bgmDL.setAttribute("href",bgmURL);
                title.appendChild(bgmDL);
              }
            }
          });
        }
      }
    });
  }
};

// execute method
if (inUA('Opera')!=-1 || inUA('MSIE')!=-1 || inUA('AppleWebKit')!=-1) {
  nicoponFn.apply();
} else {
  window.addEventListener('load', nicoponFn, true);
}
})();
