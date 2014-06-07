// ==UserScript==
// @name            Bad Player Replacer
// @version         1.2
// @author          Jeppe Rune Mortensen (YePpHa)
// @description     Replaces the players which have problems with fullscreen with the JW Player.
// @match           http://*/*
// @match           https://*/*
// @include         http://*/*
// @include         https://*/*
// @run-at          document-start
// ==/UserScript==
(function(){
  function getFlashvars(object) {
    var params = object.children;
    var flashvars = {};
    for (var i = 0; i < params.length; i++) {
      if (params[i].tagName !== "PARAM") continue;
      if (params[i].name === "flashvars") {
        var val = params[i].value.split("&");
        for (var j = 0; j < val.length; j++) {
          var k = val[j].split("=");
          flashvars[k[0]] = unescape(k[1]);
        }
      }
    }
    return flashvars;
  }

  function getAPI(flashvars, callback) {
    requestHTTP({
      method: "GET",
      url: flashvars.domain + "/api/player.api.php?key=" + escape(flashvars.filekey) + "&file=" + escape(flashvars.file) + "&pass=undefined&codes=" + escape(flashvars.cid) + "&user=undefined",
      onload: function(response){
        if (response.responseText.indexOf("url=") !== -1) {
          var api = {};
          var val = response.responseText.split("&");
          for (var j = 0; j < val.length; j++) {
            var k = val[j].split("=");
            api[k[0]] = unescape(k[1]);
          }
          callback(api);
        }
      }
    });
  }

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
  function embed(elm, src, width, height, flashvars) {
    var obj = document.createElement("object");
    obj.setAttribute("type", "application/x-shockwave-flash");
    obj.setAttribute("data", src);
    obj.setAttribute("width", width)
    obj.setAttribute("height", height);
    obj.setAttribute("bgcolor", "#000000");
    obj.setAttribute("tabindex", "0");
    
    var af = document.createElement("param");
    af.name = "allowfullscreen";
    af.value = "true";
    
    var as = document.createElement("param");
    as.name = "allowscriptaccess";
    as.value = "always";
    
    var q = document.createElement("param");
    q.name = "quality";
    q.value = "high";
    
    var st = document.createElement("param");
    st.name = "seamlesstabbing";
    st.value = "true";
    
    var wm = document.createElement("param");
    wm.name = "wmode";
    wm.value = "opaque";
    
    var fv = document.createElement("param");
    fv.name = "flashvars";
    fv.value = flashvars;
    
    obj.appendChild(af);
    obj.appendChild(as);
    obj.appendChild(q);
    obj.appendChild(st);
    obj.appendChild(wm);
    obj.appendChild(fv);
    
    elm.innerHTML = "";
    elm.appendChild(obj);
  }
  function embedJWPlayer(elm, setup) {
    embed(elm, "http://player.longtailvideo.com/player.swf", setup.width, setup.height, "file=" + escape(setup.file) + "&provider=http&http.startparam=start");
  }
  function embedFlowPlayer(elm, setup) {
    embed(elm, "http://releases.flowplayer.org/swf/flowplayer-3.2.15.swf", setup.width, setup.height, "config=" + JSON.stringify({
      "plugins": {
        "controls": {
          "url": "http://releases.flowplayer.org/swf/flowplayer.controls-3.2.14.swf",
          "backgroundColor": "transparent",
          "backgroundGradient": "none",
          "sliderColor": "#FFFFFF",
          "sliderBorder": "1.5px solid rgba(160,160,160,0.7)",
          "volumeSliderColor": "#FFFFFF",
          "volumeBorder": "1.5px solid rgba(160,160,160,0.7)",
          "timeColor": "#ffffff",
          "durationColor": "#535353",
          "tooltipColor": "rgba(255, 255, 255, 0.7)",
          "tooltipTextColor":"#000000"
        },
        "pseudo": {
          "url": "http://releases.flowplayer.org/swf/flowplayer.pseudostreaming-3.2.11.swf"
        }
      },
      "canvas": {
        "backgroundColor": "#000000",
        "backgroundGradient": "none"
      },
      "clip": {
        "autoPlay": false,
        "url": setup.file,
        "scaling": "fit",
        "provider": "pseudo"
      }
    }));
  }
  function editSWFObjectEmbed() {
    var swfobjectembed = uw.swfobject.embedSWF;
    uw.swfobject.embedSWF = function(flashplayer, id, width, height, swfVersion, xiSwfUrl, fv, params, attributes){
      if (fv.domain && fv.file && fv.filekey) {
        getAPI(fv, function(api){
          embedJWPlayer(document.getElementById(id), {
            flashplayer: assets.flash,
            file: api.url,
            width: width,
            height: height
          });
        });
      } else {
        swfobjectembed.apply(uw, arguments);
      }
    };
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
  var assets = {
    flash: 'http://player.longtailvideo.com/player.swf'
  };

  window.addEventListener("DOMContentLoaded", function(){
    if (uw.swfobject && uw.swfobject.embedSWF) {
      editSWFObjectEmbed();
    }
  }, false);
  window.addEventListener("load", function(){
    var objects = document.getElementsByTagName("object");
    var flashvars, object;
    
    for (var i = 0; i < objects.length; i++) {
      var fv = getFlashvars(objects[i]);
      if (fv.domain && fv.file && fv.filekey) {
        flashvars = fv;
        object = objects[i];
        break;
      }
    }
    if (typeof object !== "undefined") {
      getAPI(flashvars, function(api){
        var div = document.createElement("div");
        div.id = object.id;
        var width = object.width;
        var height = object.height;
        object.parentNode.replaceChild(div, object);
        
        embedJWPlayer(div, {
          flashplayer: assets.flash,
          file: api.url,
          width: width,
          height: height
        });
      });
    }
  }, false);
})();