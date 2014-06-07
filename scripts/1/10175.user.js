// ==UserScript==
// @name         hateda_preview
// @namespace    http://gomaxfire.dnsdojo.com/go
// @description  hatena diary preview
// @include      http://d.hatena.ne.jp/*/edit
// @include      http://d.hatena.ne.jp/*/edit?*
// @version      0.01401
// ==/UserScript==

(function(){
  var XHR  = {
    mkParamData:function(params){
      var array = [];
      for(a in params){
        if(params.hasOwnProperty(a)){
          array.push([encodeURIComponent(a),
                      "=",
                      encodeURIComponent(params[a])].join(""));
        }
      }
      return array.join("&");
    },
    get:function(url, params, func, errorFunc){
      var data = XHR.mkParamData(params);
      GM_xmlhttpRequest({url:url + "?" + data,
        method:"GET",
        onload:function(xhr){
          func(xhr);
        },
        onerror:function(xhr){
          if(typeof errorFunc == "function" ){
            errorFunc(xhr);
          }
        }
      });
    },
    post:function(url, params, func, errorFunc){
      var data = XHR.mkParamData(params);
      GM_xmlhttpRequest({url:url,
        method:"POST",
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        data:data,
        onload:function(xhr){
          func(xhr);
        },
        onerror:function(xhr){
          if(typeof errorFunc == "function" ){
            errorFunc(xhr);
          }
        }
      });
    }
  }

  var label = document.createElement("label");
  var toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = false;
  label.appendChild(toggle);
  label.appendChild(document.createTextNode("live preview"));
  var iframe = document.createElement("iframe");
  iframe.name = "livepreview";
  iframe.id = "livepreview";
  with(iframe.style){
    width = "100%";
    height = "300px";
    display = "none";
  }

  var ta = document.getElementsByTagName("textarea")[0];
  ta.parentNode.insertBefore(label, ta);
  ta.parentNode.insertBefore(iframe, ta);
  var preValue = "";
  var editor = document.getElementById("textarea-edit");
  var preScrollTop = 0;
  var head = null;
  var preview = function(){
    preScrollTop = iframe.contentDocument.body.scrollTop;
    if(!toggle.checked)return;
    if(preValue == editor.value)return;
    preValue = editor.value;
    var form = unsafeWindow.document.forms[0];
    var elements = form.elements;
    var params = {};
    for(var i=0,element;element=elements[i];i++){
      var name = element.name;
      var type = element.type;
      if(type == "submit" && name!="preview" ||
         type == "checkbox"){
        // nothing to do here.
      } else {
        params[name] = element.value;
      }
    }
    XHR.post(document.location.href,
             params,
             function(xhr){
               var html = xhr.responseText;
               var headS = html.indexOf("<head>");
               var headE = html.indexOf("</head>");
               var bodyS = html.indexOf("<body>");
               var bodyE = html.indexOf("</body>");
               var headHTML = html.substring(headS + 6, headE);
               var bodyHTML = html.substring(bodyS + 6, bodyE);
               iframe.contentDocument.body.innerHTML = bodyHTML;
               var func = function(child){
                 if(child.tagName.match(/script/i)){
                   //console.log(child.innerHTML);
                   if(child.src){
                     var url = child.src;
                     if(child.src.match(/^\//)){
                       url= "http://d.hatena.ne.jp" + child.src;
                     }
                     var callback = (function(child){
                       return function(xhr){
                         var src = replace(xhr.responseText);
                         //console.log(src);
                         child.textContent = src;
                         console.log(child.textContent);
                       };
                     })(child);
                     XHR.get(url, "", callback);
                   } else {
                     child.textContent = replace(child.textContent);
                   }
                   function replace(src){
                     return  src.replace(/\"\//g, "\"http://d.hatena.ne.jp/").replace(/\'\//g, "\'http://d.hatena.ne.jp/");
                   }


                 } else {
                   if(child.src && child.src.match(/^\//)){
                     child.src = "http://d.hatena.ne.jp" + child.src;
                   }
                   if(child.href && child.href.match(/^\//)){
                     child.href = "http://d.hatena.ne.jp" + child.href;
                   }

                 }
               };
               if(!head){
                 head = iframe.contentDocument.documentElement.getElementsByTagName("head")[0];
                 head.innerHTML = headHTML;
                 Array.prototype.forEach.call(head.getElementsByTagName("*"), func);
               }
               Array.prototype.forEach.call(iframe.contentDocument.body.getElementsByTagName("*"), func);
               iframe.contentDocument.body.scrollTop = preScrollTop;
             });
  }
  var id = null;

  toggle.addEventListener("change", function(e){
    if(toggle.checked){
      document.getElementById("livepreview").style.display = "block";
      id = setInterval(preview, 1000);
    } else {
      document.getElementById("livepreview").style.display = "none";
      if(id){
        clearInterval(id);
      }
    }
  }, true);
})();