// ==UserScript==
// @name           google extra with dict.cn
// @description    Displays results for google image search, video search, wikipedia search dictionary.com search and dict.cn search alongside normal google searches. You can turn off certain search by changing the 'true' value to 'false' in first five lines of the script.
// @namespace      znerp
// @include        http://www.google.*/search?*q=*
// ==/UserScript==

// Change the values below to false if you don't want these results to show.
var showImageResults = true;
var showVideoResults = true;
var showWikipediaResults = true;
var showDictionaryResults = false;
var showDictionCNResults = true;

popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "imagePopup");
popupDiv.setAttribute("style", "display:none; z-index:99;position:absolute;");
document.body.appendChild(popupDiv);
GM_addStyle('table[align="right"] {display: none ! important;}');
href = document.location.href;
results = document.getElementById("res");
newDiv = document.createElement("div")
newDiv.setAttribute("style", "float: left; max-width:"+(window.innerWidth - 385)+"px;");
while (results.firstChild.nextSibling != document.getElementById("navbar")) {
  stuff = results.firstChild;
  stuff.parentNode.removeChild(stuff);
  newDiv.appendChild(stuff);
}
results.insertBefore(newDiv, results.firstChild);
rightDiv = document.createElement("div");
rightDiv.setAttribute("style", "max-width: 350px; float: right;");

function addImages() {
  imageurl = href.replace('search', 'images');
  imageDiv = document.createElement("div");
  imageDiv.setAttribute("class", "image");
  rightDiv.appendChild(imageDiv);
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: imageurl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf("Suggestions:") == -1) {
          imageDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><span id="sd"> Images (<a href="'+imageurl+'">goto</a>) </span></table>'
          whatever = res.indexOf('<table align=center border=0')
          for (i = 0; i < 6; i++) {
            image = res.slice(res.indexOf('<a href', whatever),
                             (whatever = res.indexOf('</a>',res.indexOf('<a href', whatever))+4));
            image = image.replace(/width=\d+ height=\d+/, "width=50"); 
            //alert(image);
            imageDiv.innerHTML += image + "&nbsp;";
          }
          imageImages = imageDiv.getElementsByTagName("img");
          for (i = 0; i < 6; i++) {
            thisImage = imageImages[i];
            thisImage.addEventListener(
              'mousemove',
              function(event) {
                var x = event.pageX;
                var y = event.pageY;
                source = this.src;
                globalTimer = window.setTimeout(
                  function() { popUp(x,y,source);},
                  10);},
              true);
            thisImage.addEventListener(
              'mouseout',
              function(event) {
                window.clearTimeout(globalTimer);
                document.getElementById('imagePopup').style.display = "none";},
              true);
          }
        }
      }
    });
}

function popUp(x,y,source) {
  obj = document.getElementById('imagePopup');
  obj.innerHTML = "<img src='" + source + "'>"
  obj.style.left = (x - 150) + 'px';
  obj.style.top = (y + 10) +'px';
  obj.style.display = "inline";
}

function addVideos() {
  videourl = href.replace('search', 'videosearch').replace('www', 'video');
  videoDiv = document.createElement("div");
  videoDiv.setAttribute("class", "video");
  GM_addStyle('.video a {font-size:0.9em;}');
  rightDiv.appendChild(videoDiv);
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: videourl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf("Suggestions:") == -1) {
          videoDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><span id="sd"> Videos (<a href="'+videourl+'">goto</a>) </span></table>'
          videoString = "<table><tbody><tr>"
          whatever = 0;
          for (i = 0; i < 4; i++) {
            whatever = res.indexOf('<div class="SearchResultItem">', whatever + 30);
            video = "<a href=\"znerp\">" +
                    res.slice(res.indexOf('<img', whatever),
                              res.indexOf('<script', res.indexOf('<img', whatever)));
            video += "<br>" + res.slice(res.indexOf('<div class="Title">', whatever)+19,
                                        res.indexOf('</div>', res.indexOf('<div class="Title">', whatever))) + "<br>";
            videoLocation = res.slice(res.indexOf('<div class="Url">', whatever)+18, 
                                      res.indexOf('</div>', res.indexOf('<div class="Url">', whatever)));
            video = video.replace(/href="(znerp|\/url\?docid=.*)"/g, "href=\"" + videoLocation + "\"");
            videoString += "<td>" + video + "</td>";
            if (i == 1) videoString += "</tr><tr>";
          }
          videoDiv.innerHTML += videoString + "</tr></tbody></table>";
        }
      }
    });
}

function toUpCase() {
  return arguments[0].toUpperCase();
}

function addWiki() {
  wikiurl = "http://en.wikipedia.org/wiki/" + href.substring(href.indexOf("q=") + 2, ((href.indexOf("q=") < href.lastIndexOf("&")) ? href.indexOf("&", href.indexOf("q=")) : href.length)).replace(/%20|\+/g, "_").replace(/%22/g, "").replace(/_[a-z]/g, toUpCase);
  wikiDiv = document.createElement("div");
  wikiDiv.setAttribute("class", "wiki");
  GM_addStyle('.wiki {font-size:0.75em;color:#333333;font-family:"Lucida Sans Unicode","Arial Unicode MS","Lucida Sans","Lucida Grande",Verdana,Helvetica,Arial,sans-serif;}');
  rightDiv.appendChild(wikiDiv);
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: wikiurl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf('<p>', res.indexOf('<div id="contentSub">')) != -1) {
          wikiDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px;font-family:arial,sans-serif;" style="margin: 3px;"><span id="sd"> Wikipedia (<a href="'+wikiurl+'">goto</a>) </span></table>'
          if (res.indexOf('</b> may refer to:</p>') != -1) {
            endSearch = res.indexOf('<!-- end content -->');
            oldFoo = 0;
            foo = 0;
            while (foo < endSearch) {
              oldFoo = foo;
              foo = res.indexOf('</ul>', foo) + 4;
            }
            wiki = res.slice(res.indexOf('<p><b>'), oldFoo);
          } else if (res.indexOf('<p>A <b>') != -1) {
            wiki = res.slice(res.indexOf('<p>A <b>'),
                             res.indexOf('</p>', res.indexOf('<p>A <b>'))+4);
          } else if (res.indexOf('<p>An <b>') != -1) {
            wiki = res.slice(res.indexOf('<p>An <b>'),
                             res.indexOf('</p>', res.indexOf('<p>An <b>'))+4);
          } else if (res.indexOf('<p>The <b>') != -1) {
            wiki = res.slice(res.indexOf('<p>The <b>'),
                             res.indexOf('</p>', res.indexOf('<p>The <b>'))+4);
          } else if (res.indexOf('<p><b>') != -1) {
            wiki = res.slice(res.indexOf('<p><b>'),
                             res.indexOf('</p>', res.indexOf('<p><b>'))+4);
          }
          if (res.indexOf('class="image"') != -1) {
            wikiImage = '<img ' + 
                        res.slice(res.indexOf('src=', res.indexOf('class="image"')),
                                  res.indexOf('"', res.indexOf('src=', res.indexOf('class="image"'))+5)+1) +
                        '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
            wikiDiv.innerHTML += wikiImage;
          } else if (res.indexOf('class="thumbimage"') != -1) {
            wikiImage = '<img ' + 
                        res.slice(res.indexOf('src=', res.indexOf('class="thumbimage"')),
                                  res.indexOf('"', res.indexOf('src=', res.indexOf('class="thumbimage"'))+5)+1) +
                        '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
            wikiDiv.innerHTML += wikiImage;
          }
         wikiDiv.innerHTML += wiki.replace(/href=\"\//g, "href=\"http://en.wikipedia.org/");
        }
      }
    });
}
function addDictCN() {
 dictcnurl = "http://dict.cn/search/?q=" + href.substring(href.indexOf("q=") + 2, ((href.indexOf("q=") < href.lastIndexOf("&")) ? href.indexOf("&", href.indexOf("q=")) : href.length));
if(dictcnurl.indexOf('%') == -1)
{
 dictcnDiv = document.createElement("div");
 rightDiv.appendChild(dictcnDiv);
 GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url:decodeURI(dictcnurl),
      overrideMimeType: 'text/html; charset=gb2312',
      onload: function(result) {
        res = result.responseText;
	if (res.indexOf('No similar') == -1 ){
	if (res.indexOf('<td height="320" width="566">') != -1) {
	startindex =res.indexOf('<tr', res.indexOf('<td height="320" width="566">'));
	endindex = res.indexOf('</table>',startindex);
	startindex =res.indexOf('<tr',startindex+100);	
	dictcn = res.substring(startindex,endindex);
	dictcnDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><span id="sd"> Dict.cn (<a href="'+dictcnurl+'">goto</a>) </span></table>' 
	
	dictcn = dictcn.replace(/<a href='javascript:dictAdd.*<\/a>/g,'');
	dictcn = dictcn.replace(/<a href=./g,'<a href=http://dict.cn/search');
	dictcn = dictcn.replace(/\/img/g,'http://dict.cn/img');
	dictcnDiv.innerHTML += '<table>'+ dictcn + '</table>';
	}
      }
}
});

}
}
function addDict() {
  dicturl = "http://dictionary.reference.com/search?q=" + href.substring(href.indexOf("q=") + 2, ((href.indexOf("q=") < href.lastIndexOf("&")) ? href.indexOf("&", href.indexOf("q=")) : href.length));
  dictDiv = document.createElement("div");
  dictDiv.setAttribute("class", "dict");
  GM_addStyle('.dict .me {display:inline;font-weight:bold;}'+
              '.dict .pg {color:#558811;display:inline;font-style:italic;}'+
              '.dict .prondelim {color:#880000;font-family:"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;}'+
              '.dict .show_spellpr .pron {color:#880000;display:inline;font-family:Verdana,"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;font-size:0.9em;}'+
              '.dict .prongoto {color:#116699;cursor:pointer;font-size:0.9em;text-decoration:underline;}'+
              '.dict table.luna-Ent {background-color:#FFFFFF;color:#333333;display:block;padding-bottom:0pt;width:100%;}'+
              '.dict .ital-inline {display:inline;font-style:italic;}'+
              '.dict * {font-size:95%;line-height:1.25em;margin:0pt;}'+
              '.dict .sectionLabel {color:#558811;display:inline;font-style:italic;}'+
              '.dict .secondary-bf {display:inline;font-weight:bold;}'+
              '.dict .homno {display:inline;font-size:0.7em;vertical-align:top;}');
  rightDiv.appendChild(dictDiv);
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: dicturl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf('<div class="luna-Ent">') != -1) {
          dictDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><span id="sd"> Dictionary.com (<a href="'+dicturl+'">goto</a>) </span></table>'
          dict = res.slice(res.indexOf('<div class="luna-Ent">')+22,
                           res.indexOf('</div>', res.indexOf('<div class="luna-Ent">')));
          dictDiv.innerHTML += dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/");
        } else if (res.indexOf('<table>') != -1) {
          dictDiv.innerHTML += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="t bt" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><span id="sd"> Dictionary.com (<a href="'+dicturl+'">goto</a>) </span></table>'  
          dict = res.slice(res.indexOf('<td>')+4,
                           res.indexOf('</td>'));
          dictDiv.innerHTML += dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/");
        }
      }
    });
}

if (showDictionCNResults) addDictCN();
if (showImageResults) addImages();
if (showVideoResults) addVideos();
if (showWikipediaResults) addWiki();
if (showDictionaryResults) addDict();
results.insertBefore(rightDiv, results.firstChild);
