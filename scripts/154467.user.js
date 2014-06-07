// ==UserScript==
// @name            PutLocker & Sockshare Downloader
// @version         1.5
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     Makes it possible to download the video stream and the original file from PutLocker and SockShare.
// @match           http://*.putlocker.com/file/*
// @match           http://*.sockshare.com/file/*
// @match           http://*.putlocker.ws/file/*
// @match           http://*.sockshare.ws/file/*
// @include         http://*.putlocker.com/file/*
// @include         http://*.sockshare.com/file/*
// @include         http://*.putlocker.ws/file/*
// @include         http://*.sockshare.ws/file/*
// ==/UserScript==
(function(){
  function requestHTTP(details) {
    if (typeof GM_xmlhttpRequest != "undefined") {
      GM_xmlhttpRequest(details);
      return true;
    } else {
      var xmlhttp;
      if (typeof XMLHttpRequest != "undefined") {
        xmlhttp = new XMLHttpRequest();
      } else if (typeof opera != "undefined" && typeof opera.XMLHttpRequest != "undefined") {
        xmlhttp = new opera.XMLHttpRequest();
      } else if (typeof uw != "undefined" && typeof uw.XMLHttpRequest != "undefined") {
        xmlhttp = new uw.XMLHttpRequest();
      } else {
        if (details["onerror"]) {
          details["onerror"]();
        }
        return false;
      }
      xmlhttp.onreadystatechange = function(){
        var responseState = {
          responseXML:(xmlhttp.readyState == 4 ? xmlhttp.responseXML : ''),
          responseText:(xmlhttp.readyState == 4 ? xmlhttp.responseText : ''),
          readyState:xmlhttp.readyState,
          responseHeaders:(xmlhttp.readyState == 4 ? xmlhttp.getAllResponseHeaders() : ''),
          status:(xmlhttp.readyState == 4 ? xmlhttp.status : 0),
          statusText:(xmlhttp.readyState == 4 ? xmlhttp.statusText : '')
        };
        if (details["onreadystatechange"]) {
          details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState == 4) {
          if (details["onload"] && xmlhttp.status >= 200 && xmlhttp.status < 300) {
            details["onload"](responseState);
          }
          if (details["onerror"] && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
            details["onerror"](responseState);
          }
        }
      };
      try {
        xmlhttp.open(details.method, details.url);
      } catch(e) {
        if(details["onerror"]) {
          details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
        }
        return false;
      }
      if (details.headers) {
        for (var prop in details.headers) {
          xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
      }
      xmlhttp.send((typeof(details.data) != 'undefined') ? details.data : null);
      return true
    }
    return false;
  }
  function checkNextPage() {
    var sb = document.getElementById("submitButton"), hashElement, hash;
    if (sb) {
      hashElement = (function(){
        var i, c = sb.parentNode.children;
        for (i = 0; i < c.length; i++) {
          if (c[i].getAttribute("name") === "hash") {
            hash = c[i].getAttribute("value");
            break;
          }
        }
      })();
      requestHTTP({
        method: "POST",
        url: uw.location.href,
        data: "hash=" + encodeURIComponent(hash) + "&confirm=" + encodeURIComponent("Continue as Free User"),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
          if (response.responseText.indexOf("/get_file.php?stream=") !== -1) {
            player.playlist = getPlaylist(response.responseText);
            makeDownloadButton();
            getStreams();
          } else if (response.responseText.indexOf("/get_file.php?id=") !== -1) {
            var file = getFile(response.responseText);
            makeDownloadButton();
            var dom = player.addFile("Direct");
            dom[1].setAttribute("href", file);
            dom[1].style.display = "";
          }
        }
      });
    }
  }
  
  function decode(text) {
    var container = document.createElement("div");
    container.innerHTML = "<input type=\"hidden\" value=\"" + text + "\" />";
    return container.children[0].value;
  }
  
  function getFilename() {
    return document.getElementsByTagName("h1")[0].firstChild.textContent;
  }
  
  function fixURL(url, customFilename) {
    var extension = getExtensionByURL(url);
    var f = getFilename();
    if (customFilename) {
      f = customFilename;
    } else {
      if (typeof extension !== "undefined") {
        var s = f.split(".");
        f = "";
        for (var i = 0; i < s.length-1; i++) {
          if (i > 0) f += ".";
          f += s[i];
        }
        f += "." + extension;
      }
    }
    
    var parser = document.createElement("a");
    parser.href = url;
    
    if (parser.search === "") {
      var pn = parser.pathname.split("/");
      pn[pn.length-1] = "/" + f;
      pn = pn.join("/");
      return parser.protocol + "//" + parser.hostname + pn;
    } else {
      var search = parser.search.substring(1).split("&");
      for (var i = 0; i < search.length; i++) {
        var a = search[i].split("=");
        if (a[0] === "f") {
          a[1] = encodeURIComponent(f);
          search[i] = a[0] + "=" + a[1];
        }
      }
      
      return parser.protocol + "//" + parser.hostname + parser.pathname + "?" + search.join("&");
    }
  }
  
  function getStream(name, url, dom) {
    requestHTTP({
      method: "GET",
      url: url,
      onload: function(response){
        if (response.responseText.indexOf("<media:content url=\"") !== -1) {
          player.streams[name] = {
            name: name,
            url: decode(response.responseText.split("<media:content url=\"")[1].split("\"")[0]),
            type: decode(response.responseText.split("<media:content ")[1].split("type=\"")[1].split("\"")[0]),
            duration: decode(parseInt(response.responseText.split("<media:content ")[1].split("duration=\"")[1].split("\"")[0])),
          };
          if (name !== "Stream") {
            var fe = getExtensionByURL(player.streams[name].url);
            if (fe === "flv") {
              return;
            }
          }
          
          player.found.push([name, dom]);
          updateDesign();
          //player.addFile(player.streams[name]);
        }
      }
    });
  }
  
  function updateDesign() {
    var step = 0;
    for (var i = 0; i < player.qualities.length; i++) {
      for (var j = 0; j < player.found.length; j++) {
        if (player.found[j][0] === player.qualities[i][0]) {
          if (step > 0) {
            player.found[j][1][0].style.display = "";
          } else {
            player.found[j][1][0].style.display = "none";
          }
          var fixedURL;
          if (player.qualities[i][2]) {
            fixedURL = fixURL(player.streams[player.found[j][0]].url, player.qualities[i][2])
          } else {
            fixedURL = fixURL(player.streams[player.found[j][0]].url);
          }
          player.found[j][1][1].setAttribute("href", fixedURL);
          player.found[j][1][1].style.display = "";
          step++;
        }
      }
    }
  }
  
  function getExtension(file) {
    var pn = file.split("/");
    pn = pn[pn.length-1];
    var fe = pn.split(".");
    return fe[fe.length-1];
  }
  
  function getExtensionByURL(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return getExtension(parser.pathname);
  }
  
  function getStreams() {
    for (var i = 0; i < player.qualities.length; i++) {
      getStream(player.qualities[i][0], player.playlist + player.qualities[i][1], player.addFile(player.qualities[i][0]));
    }
  }
  
  function getFile(txt) {
    if (txt.indexOf("/get_file.php?id=") !== -1) {
      return "/get_file.php?id=" + txt.split("/get_file.php?id=")[1].split("\"")[0];
    }
  }
  
  function getPlaylist(txt) {
    var i, c;
    if (typeof txt === "string") {
      if (txt.indexOf("/get_file.php?stream=") !== -1) {
        return "/get_file.php?stream=" + txt.split("/get_file.php?stream=")[1].split("'")[0];
      }
    } else {
      c = txt.children;
      for (i = 0; i < c.length; i++) {
        if (c[i].getAttribute("name") === "flashvars") {
          return JSON.parse(c[i].getAttribute("value").substring(7)).playlist;
          break;
        }
      }
    }
  }
  
  function getOriginalFileName() {
    var a = document.getElementsByTagName("h1")[0];
    if (a && a.firstChild) return a.firstChild.textContent;
  }
  
  function makeDownloadButton() {
    var parent,
        parent1 = document.getElementsByClassName("video_player"),
        parent2 = document.getElementsByClassName("ad_728x90_top"),
        parent3 = document.getElementsByClassName("item_confirm_page"),
        parent4 = document.getElementsByTagName("h1"),
        parent_type = -1;
    if (player.element && parent1 && parent1.length > 0) {
      parent = parent1[0];
      parent_type = 0;
    } else if (parent2 && parent2.length > 0) {
      parent = parent2[0];
      parent_type = 1;
    } else if (parent3 && parent3.length > 0) {
      parent = parent3[0];
      parent_type = 2;
    } else if (parent4 && parent4.length > 0) {
      parent = parent4[0];
      parent_type = 3;
    } else {
      throw new Error("...");
    }
    var container = document.createElement("div");
    var downloadText = document.createElement("span");
    downloadText.textContent = "Download »";
    downloadText.style.margin = "0 4px 0 0";
    
    container.style.margin = "0 auto";
    container.style.width = (parent && parent.style && parent.style.width) || "960px";
    
    container.appendChild(downloadText);
    player.addFile = function(name){
      var space = document.createElement("span");
      space.style.margin = "0 4px";
      space.textContent = "•";
      space.style.display = "none";
      
      var link = document.createElement("a");
      //link.textContent = stream.name;
      link.textContent = name;
      //link.setAttribute("href", fixURL(stream.url, stream.extension));
      link.setAttribute("target", "_blank");
      link.style.display = "none";
      
      //stream.dom = [space, link];
      
      container.appendChild(space);
      container.appendChild(link);
      
      return [space, link];
    };
    
    container.style.margin = "0 auto";
    container.style.width = parent.style.width || "960px";
    
    container.appendChild(downloadText);
    
    if (parent_type === 0 || parent_type === 1) {
      parent.parentNode.insertBefore(container, parent.nextElementSibling);
    } else if (parent_type === 2) {
      parent.parentNode.insertBefore(container, parent);
    } else if (parent_type === 3) {
      parent.parentNode.insertBefore(container, parent.nextElementSibling.nextElementSibling);
    }
    //parent.parentNode.insertBefore(container, parent.nextElementSibling);
  }
  var uw = (function(){
    var a;
    try {
      a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
      return a || (function(){
        var e = document.createElement('p');
        e.setAttribute('onclick', 'return window;');
        return e.onclick();
      }());
    }
  })(), player = {};
  player.id = "player_api";
  player.qualities = [["Original", "&original=1", getOriginalFileName()], ["Stream", ""], ["Mobile", "&mobile=1"]];
  player.found = [];
  player.element = document.getElementById(player.id);
  player.streams = {};
  player.progress = 0;
  if (player.element) { // Should be a video
    player.playlist = getPlaylist(player.element);
    makeDownloadButton();
    getStreams();
  } else {
    checkNextPage();
  }
})();