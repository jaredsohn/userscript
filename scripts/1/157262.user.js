// ==UserScript==
// @name            YouTube Proxfree
// @version         2.0.2
// @author          ThePoivron
// @description     Bouton pour charger la vidéo YouTube sur proxfree.com
// @icon            http://s3.amazonaws.com/uso_ss/icon/157262/large.png
// @match           http://*.youtube.com/watch?*
// @match           https://*.youtube.com/watch?*
// @match           http://*.proxfree.com/*
// @include         http://*.youtube.com/watch?*
// @include         https://*.youtube.com/watch?*
// @include         http://*.proxfree.com/*
// ==/UserScript==
(function(){
  function ajax(details) {
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
  function proxfreePlayer(vid, callback) {
    var __q = [
      {qualityId: 1, quality: "small"},
      {qualityId: 2, quality: "medium"},
      {qualityId: 3, quality: "large"},
      {qualityId: 4, quality: "hd720"},
      {qualityId: 5, quality: "hd1080"}
    ];
    var qualities = [];
    var proxURL;
    
    ajax({
      url: "http://uk.proxfree.com/request.php?do=go&bit=1",
      method: "POST",
      synchronous: true,
      data: "pfipDropdown=default&get=" + escape("http://www.youtube.com/watch?v=" + escape(vid)),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(response){
        proxURL = response.finalUrl;
        
        callback({
          getAvailableQualities: function(){
            var __a = [];
            
            var stream = uw.ytplayer.config.args.url_encoded_fmt_stream_map.split(",");
            for (var i = 0; i < stream.length; i++) {
              var __b = stream[i].split("&");
              for (var j = 0; j < __b.length; j++) {
                if (__b[j].split("=")[0] === "quality") {
                  var __already = false;
                  for (var k = 0; k < __a.length; k++) {
                    if (__a[k] === unescape(__b[j].split("=")[1])) __already = true;
                  }
                  if (__already) continue;
                  __a.push(unescape(__b[j].split("=")[1]));
                }
              }
            }
            
            return __a;
          },
          getQualityId: function(q){
            for (var i = 0; i < __q.length; i++) {
              if (__q[i].quality === q) return __q[i].qualityId;
            }
          },
          getQualityURL: function(id){
            return proxURL + "&quality=" + id;
          },
          getVideoURL: function(url, callback){
            ajax({
              url: url,
              method: "GET",
              synchronous: true,
              onload: function(response){
                callback(unescape(response.responseText.split("'url':'")[1].split("'")[0]));
              }
            });
          }
        });
      }
    });
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
  })();

  // After that you declare the variables.
  var button, content; // Declaring the variables in this scope
  button = document.createElement("button"); // Creating the button
  button.setAttribute("type", "button"); // Setting the attribute type to button
  button.className = "yt-subscription-button hover-enabled yt-uix-button yt-uix-button-subscribed-branded"; // Adding classes to the element
  button.setAttribute("style", "margin-left: 10px;"); // Setting the style of the element
  button.addEventListener('click', function(){
    var vid;
    var __a = location.search.substring(1).split("&");
    for (var i = 0; i < __a.length; i++) {
      if (__a[i].indexOf("v=") === 0) {
        vid = __a[i].split("=")[1];
        break;
      }
    }
    
    proxfreePlayer(vid, function(p){
      console.log(p.getAvailableQualities());
      p.getVideoURL(p.getQualityURL(p.getQualityId("medium")), function(__url){
        document.getElementById("player-api").innerHTML = "<embed src=\"http://uk.proxfree.com/plugins/flowplayer-3.2.12.swf\" width=\"640\" height=\"360\" allowscriptaccess=\"always\" allowfullscreen=\"true\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" flashvars=\"config={'canvas':{'backgroundColor':'#000000','backgroundGradient':'none'},'clip':{'autoPlay':true,'autoBuffering':true,'url':'" + escape(__url) + "','scaling':'fit'}}\">";
        console.log(__url);
      });
    });
  }, false); // Adding an event listener to the button
  content = document.createElement("span"); // Creating the content of the button (creating a span element).
  content.className = "yt-uix-button-content"; // Adding a class to the content element.
  content.textContent = "Proxfree"; // Setting the text of the content element.
  button.appendChild(content); // Appending the content element to the button element
  heading = document.getElementsByClassName("yt-uix-button-subscription-container")[0]; // Finding the same span element that the subscription button is in.
  heading.appendChild(button); // Appending the button to the element to make it accessible from the dom.
})();
