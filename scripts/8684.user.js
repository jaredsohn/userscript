// ==UserScript==
// @name         twitter_lite
// @namespace    http://gomaxfire.dnsdojo.com/
// @description  a twitter client
// @include      *
// @version      0.2999931
// ==/UserScript==
(function(){
  //----------------------------------------------------
  // utility for debug using Firebug
  //----------------------------------------------------
   var debugMode = false;
  var debug = (function(){
      if(debugMode &&
         unsafeWindow.hasOwnProperty("console") &&
         unsafeWindow.console.debug){
        return function(s){
          unsafeWindow.console.debug(s);
        };
      } else {
        return function(s){};
      }
    })();
  var debugByJSON = (function(){
      if(debugMode &&
         unsafeWindow.hasOwnProperty("console") &&
         unsafeWindow.console.debug){
        return function(object){
          unsafeWindow.console.debug(objectToJSON(object));
        };
      } else {
        return function(object){};
      }
    })();
   debug("test");
  //----------------------------------------------------
  // utility for DOM operation
  //----------------------------------------------------

  function $(id){
    return document.getElementById(id);
  }

  function $child(parent, name){
    var child = null;
    var children = $children(parent, name);
    if(children && children.length > 0){
      child = children[0];
    }
    return child;
  }

  function $children(parent, name){
    var result = [];
    var childNodes = parent.childNodes;
    for(var i=0,child;child=childNodes[i];i++){
      if(child.tagName && child.tagName.match(new RegExp(name, "i"))){
        result.push(child);
      }
    }
    return result;
  }

  function $add(parent, children){
    if(arguments.length < 2) return "";
    for(var i=1, child; child=arguments[i];i++){
      if(typeof child == "string"){
        child = document.createTextNode(child);
      }
      parent.appendChild(child);
    }
    return parent;
  }


  function $event(element, type, func){
    element.addEventListener(type, func, true);
  }

  function $tag(tagName, option){
    var tag = document.createElement(tagName);
    if(option){
      for(a in option){
        if(option.hasOwnProperty(a)){
          tag[a] = option[a];
        }
      }
    }
    with(tag.style){
      margin = "0";
      padding = "0";
    }
    return tag;
  }

  function $text(text){
    return document.createTextNode(text);
  }

  function $rm(element){
    element.parentNode.removeChild(element);
  }

  //----------------------------------------------------
  // utility for JSON
  //----------------------------------------------------
  function parseJSON(json){
    var obj = {};
    json = json.replace(/^(\s*)(\S)*(\s*)$/, "$2");
    if(!json.match(/^[\"\{\[]/))return obj;
    if(json){
      obj = eval(["(", json, ")"].join(""));
    }
    return obj;
  }

  var jsEscape =function(str){
    return str.replace(/\\/ig,"\\\\")
    .replace(/\f/ig,"\\f")
    .replace(/\n/ig,"\\n")
    .replace(/\r/ig,"\\r")
    .replace(/\t/ig,"\\t")
    .replace(/\'/ig,"\\'")
    .replace(/\"/ig,"\\\"");
  }

  var objectToJSON = function(object){
    var rtn;
    if(object==null){
      rtn = "null";
    }else{
      var callee = arguments.callee;
      switch(object.constructor){
      case Boolean:
        rtn = object ? "true" : "false";
        break;
      case Number:
        rtn = isNaN(object) || !isFinite(object)? "null" : object.toString(10);
        break;
      case String:
        rtn = ["\"", jsEscape(object), "\""].join("");
        break;
      case Array:
        var buf = [];
        object.forEach(function(item){
            //for(var i=0;i<object.length;i++){
            buf.push(callee(item));
          });
        rtn = ["[", buf.join(","), "]"].join("");
        break;
      case Object:
        var buf = [];
        for(var key in object){
          if(object.hasOwnProperty(key)){
            buf.push(callee(key)+":"+callee(object[key]));
          }
        }
        rtn = ["{", buf.join(","), "}"].join("");
        break;
      default:
        rtn = "null";
        break;
      }
    }
    return rtn;
  };

  function escapeHTML(text){
    return text
      .replace(/\&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\s?(https?:\/\/\S+)/g,"<a href=\"$1\">$1</a>")
      .replace(/\n/g,"<br />\n");
  }

  function escapeHTML(text){
    return text
      .replace(/\&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/\s?(https?:\/\/\S+)/g,"<a style=\"background-color:blue;border 1px dotted #333333;color:white\" href=\"$1\" title=\"$1\">LINK</a>")
      .replace(/\n/g,"<br />\n");
  }


  function convertAnchor(text){
    return text
      .replace(/\s?(https?:\/\/\S+)/g,"<a style=\"background-color:blue;border 1px dotted #333333;color:white\" href=\"$1\" title=\"$1\">LINK</a>")
      .replace(/\n/g,"<br />\n");
  }

  function futaketa(n){
    if(n < 10){
      n = "0" + n;
    }
    return n;
  }
  Date.prototype.gotinFormat = function(){
    return (futaketa(this.getMonth()+1))
    + "/"
    + futaketa(this.getDate())
    + " "
    + futaketa(this.getHours())
    + ":"
    + futaketa(this.getMinutes())
    + ":"
    + futaketa(this.getSeconds());
  }
  //----------------------------------------------------
  // utility for GM_xmlhttpRequest
  //----------------------------------------------------
  var XHR  = {
    count:0,
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
    post:function(url, params, func, errorFunc){
      XHR.count++;
      debug("try post:"+XHR.count);
      debug("URL:" + url);
      var data = XHR.mkParamData(params);
      debug("data:" + data);
      GM_xmlhttpRequest({url:url,
            method:"POST",
            headers:{
            "Content-Type": "application/x-www-form-urlencoded",
              "X-Twitter-Client":"twitter_lite.user.js",
              "X-Twitter-Client-Version":"0.02931",
              "X-Twitter-Client-URL":"http://d.hatena.ne.jp/gotin/20070413/1176397931"},
            data:data,
            onload:function(xhr){
            XHR.count--;
            debug("posted:"+XHR.count);
            func(xhr);
          },
            onerror:function(xhr){
            debug("error:"+url);
            if(typeof errorFunc == "function" ){
              errorFunc(xhr);
            }
          }
        });
    },

    get:function(url, params, func, errorfunc){
      XHR.count++;
      debug("try get:"+XHR.count);
      var data = XHR.mkParamData(params);
      GM_xmlhttpRequest({
          url:[url,data].join("?"),
            method:"GET",
            onload:function(xhr){
            XHR.count--;
            debug("got:"+XHR.count);
            typeof func == "function" ? func(xhr) : null;
          },
            onerror:function(xhr){
            debug("error:"+url);
            typeof errorFunc == "function" ? errorFunc(xhr) : null;
          }
        });
    }
  }


  //----------------------------------------------------
  // Keybind object
  //----------------------------------------------------
  var Keybind = {
    phrases:{},
    add:function(phrase, func){
      if(this.phrases.hasOwnProperty(phrase)) return;
      this.phrases[phrase] = true;
      $event(document, "keydown",
             function(event){
               var target = event.target;
               var tagName = target.tagName;
               var type = target.type;
               if(phrase == Keybind.code(event) &&
                  !(tagName == "INPUT" &&
                    (!type.type || type=="text")) &&
                  tagName != "TEXTAREA"){

                 func();
               }});
    },
    code: function(event){
      var code = [];
      if(event.shiftKey){
        code.push("S");
      } else if(event.ctrlKey){
        code.push("C");
      } else if(event.altKey){
        code.push("M");
      }
      code.push(Keybind.kc2char(event.keyCode));
      return code.join("-");
    },

    kc2char:function(kc){
      var between = function(a,b){
        return a <= kc && kc <= b;
      };

      var _32_40 = "space pageup pagedown end home left up right down".split(" ");
      var kt = {
        8  : "back",
        9  : "tab"  ,
        13 : "enter",
        16 : "shift",
        17 : "ctrl",
        27 : "esc",
        46 : "delete",
      };

      return (between(65,90)  ? String.fromCharCode(kc+32) : // a-z
              between(48,57)  ? String.fromCharCode(kc) :    // 0-9
              between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
              between(32,40)  ? _32_40[kc-32] :
              kt.hasOwnProperty(kc) ? kt[kc] :
              kc);
    }
  };

  //----------------------------------------------------
  // sound utility
  //----------------------------------------------------

  var sound_pi = "data:audio/x-wav,RIFF%22%19%00%00WAVEfmt%20%10%00%00%00%01%00%01%00%22V%00%00D%AC%00%00%02%00%10%00data%FE%18%00%00%FF%FF%01%00%FF%FF%01%00%FF%FF%01%00%FF%FF%01%00%FF%FF%01%00%FF%FF%01%00%FF%FF%01%00%FE%FF%01%00%FC%FF%04%00%FB%FF%04%00%FB%FF%05%00%FA%FF%06%00%F7%FF%09%00%F5%FF%0D%00%EF%FF%16%00%E0%FF9%00%ED%F9%84%F8s%F8%F5%F7%DD%F7%9B%F7%CB%F7%0D%F8%89%F8%AE%F8%C3%F8%AE%F8%7D%F8.%F8%FC%F7%C5%F7%BF%F7%E1%F7Q%F8%90%F8%97%F8r%F8U%F8%0B%F8%D2%F7%C9%F7%08%F8%23%F89%F8%40%F8*%F8%E8%F7%B6%F7%AE%F7%D3%F7%02%F8%25%F8%0B%F8%E1%F7%CE%F7%A5%F7c%F7a%F7%BB%F7%1A%F85%F8J%F8O%F8%0B%F8%93%F7%3A%F7.%F7g%F7%BD%F7%03%F8F%F8a%F8.%F8%AF%F7%3A%F7%1B%F7)%F7N%F7f%F7%A8%F7%D8%F7%CA%F7%AE%F7%B9%F7%AE%F7%88%F7T%F7%20%F7%E8%F6%D3%F6%09%F7%5B%F7%8D%F7%AE%F7%B7%F7%8A%F7A%F7%0C%F7%DF%F6%E4%F6%2C%F7%95%F7%C7%F7%E6%F7%C9%F7%5C%F7%DC%F6l%F6%3E%F6*%F6y%F6%FD%F6%5E%F7%93%F7%CB%F7%DE%F7%A0%F7A%F7%F2%F6%A5%F6Y%F6*%F62%F6x%F6%FE%F6u%F7%BD%F7%C7%F7y%F7%F4%F6O%F6%F9%F5%DE%F5%24%F6%A7%F6%1E%F7d%F7%85%F7%80%F7'%F7%60%F7%11%F9%02%FB)%F97%F21%EA%11%E6~%E8%D5%F1%AF%00c%0F%D2%15g%0FH%FEX%E9%85%D8i%D1F%D6_%E5'%FA%A4%0E8%1C%60%1E%E4%13%D0%FF%03%E8%DB%D3%DB%C9%04%CEj%DFF%F8%CF%10(!%FE%23%D3%17%AB%00%FF%E5%D5%CF%7C%C5%98%CA%A5%DD%A0%F8F%13b%25%0C)%BB%1C%1E%04%00%E7p%CE%FB%C1%A3%C5%85%D8%B7%F4J%11%D4%25%BE%2B%D6%20%9C%08%7C%EA%BB%CF%9B%C0s%C2%9F%D4%26%F1%2B%0FE%25%8F%2C%9A%22%EE%0A%CC%ECz%D1%5B%C1%CA%C1%9D%D2a%EE%BA%0C%93%241.%E0%25s%0E%5C%EF%2C%D2%DE%BF%A2%BE%10%CF%D1%EB%DD%0B%97%25%A70%1A)%A6%11C%F1%EF%D1T%BD%C9%BA%17%CB%FE%E8i%0B%8F'g4%FB%2C%F2%13x%F1)%D0y%BA%BA%B7%F2%C8Z%E8%0C%0C%15)%C15L.J%15%85%F2%AA%D0k%BA%25%B7%B4%C7%A7%E6%60%0A%E3'%9E5%F2.%0B%164%F3(%D1U%BA%8C%B6%F7%C6Y%E6%3F%0A%EC'%945%5D.%1D%15%D1%F1%7C%CF%13%B9%7D%B6%24%C8%06%E8%25%0CO)%A05%E1%2C%1F%12%5C%EE%E3%CC%13%B8%00%B7%0E%CA%F4%EA%91%0E%08*%BD4%18%2B%19%10%A4%EC%FA%CB%24%B8%D6%B7%FC%CAx%EB%C5%0E%EC)Q4d*k%0F6%EC%DB%CBe%B8%13%B8%22%CB%1B%EB%DA%0D%AA(%163%B9)%9F%0Fe%EDk%CD%AE%B9%8B%B8y%CA%A8%E9P%0C%E5'q3%ED*%F6%10%3D%EE%95%CD%22%B9%A4%B7%19%CA%04%EA%BE%0C%DE'%BA2%98)%5E%0F%09%ED%3A%CD%BE%B9%F8%B8%2F%CB8%EA%06%0CE%26%B00%ED'%CA%0E%DC%ED%EB%CE%AB%BBK%BA%99%CB%AA%E9%BD%0A%0C%25%D2%2F%95'%F6%0E%1F%EEO%CF%17%BC%C1%BA%A5%CBg%E95%0A%13%24%B6.%85%26%0F%0Em%ED)%CFW%BCU%BBu%CC%F6%E9L%0Ac%23%C6-%7C%25Q%0DG%EDj%CF%D3%BC%7C%BBU%CC%8A%E9%D7%09X%23%FA-%EE%25%AA%0Dj%ED%D8%CE%88%BB%DD%B9%D2%CA%B4%E8%E3%098%247%2F%14'j%0EO%ED%20%CE%8A%BA%BA%B8j%C9M%E7%DD%08%D2%23%93%2F%2B(%0E%10%F8%EE%0B%CF%25%BA0%B7n%C7G%E5%5C%07%3E%2390%E9)%F5%11k%F0%98%CF%C5%B9%E1%B5%99%C5%A3%E3%18%06%B1%22E0m*%8D%12%14%F1%3B%D0%F1%B9%9E%B5%EF%C4%F3%E2%89%05C%22%3B0%A5*%18%13q%F1%87%D0Z%BA%DE%B5%E8%C4r%E2%16%05%0C%22o0%08%2B%E1%13b%F2%1E%D1%5D%BA%3F%B5%D7%C3%40%E17%04~!O0%A1%2B%B9%142%F3%B9%D1%BB%BAM%B5%CF%C3K%E19%04%BC!%B60%04%2C%FA%14f%F3%E6%D1%A0%BA2%B5%B8%C3f%E1%A6%04_%22%7D1%89%2CC%15%3D%F3%03%D1%7B%B96%B4E%C3l%E1X%05%7F%23%822)-%87%15%1C%F3%D9%D0s%B9%92%B4%06%C4e%E2%FF%05%DA%23%9C2%3A-%5D%15%EE%F2%F5%D0%CD%B9%DC%B4%03%C4%97%E2%3F%06%D3%23T2%F2%2C%0F%15%AA%F2%CB%D0%C5%B9%0F%B5%2F%C4%7C%E2%E1%05%A5%2372%11-%81%15Q%F3W%D1%E9%B9%B4%B4%5C%C3%80%E1%0B%05%3C%23%C02%1F.%DF%16G%F4%C3%D1q%B9a%B3%D1%C1%04%E0P%04%3E%23t38%2F%13%180%F5%EE%D1C%B9%D0%B2%11%C1H%DF%C3%03%F7%22-3Y%2F%2C%18%B4%F5Z%D2%A6%B9%FF%B2%C0%C0%8F%DE%B1%02%04%22%862%3B%2F%82%183%F6%FD%D2%CC%B9j%B2%BD%BFb%DD%AD%01h!%AA2%98%2FW%19%13%F7%9A%D3%F7%B9%23%B2%F5%BE(%DC%7F%00%5D%20%112%EA%2F%84%1Am%F8%DA%D4%B1%BA%23%B2J%BE.%DBZ%FF%60%1F%981%EA%2F%BB%1A%1E%F9%B6%D5%3E%BB%3D%B2%CC%BD!%DA%01%FEb%1E%3F1%8B0%12%1C%8E%FA%A2%D6%90%BB%B7%B1P%BC%40%D8%A3%FC%D5%1D%B71%951t%1D%B0%FB%3F%D7%40%BB%AF%B0%04%BB%0D%D7%C9%FBu%1D%C11%F91%0E%1E%40%FC%8C%D7%16%BB%F3%AF%FC%B9%1A%D6%E1%FA%FD%1C%E01%C32%EC%1E%F9%FC%03%D8K%BB%D7%AFx%B9%81%D5b%FA%9C%1CM1L2%A1%1E%1D%FDX%D8%E2%BB%8B%B0D%BA%BF%D5%FB%F9%89%1B%5C0%871_%1EI%FD%E0%D8p%BC%8E%B0%AE%B9%C9%D4%F8%F8%DB%1A%0C0%B91%BB%1E%B5%FD%24%D9Z%BC%2F%B0%EB%B85%D4%81%F8y%1A%F9%2F%1E2%89%1FS%FE%AF%D9%9F%BC.%B0%94%B8X%D3%A0%F7%F8%19%D8%2F%122%BB%1F%EC%FE%15%DA%CF%BC%EB%AF7%B8%C9%D2!%F7%85%19u%2F%D51%9C%1F%13%FF4%DA%DF%BC%F3%AF%20%B8%C4%D2%0E%F7%A7%19%C7%2FI2%04%20%0D%FF%0B%DAM%BCh%AF%C5%B7h%D2%F2%F6%A9%19%020~20%20%23%FF%F1%D96%BC4%AFl%B7M%D2%AE%F6d%19%98%2F~2b%20%8C%FF%AA%DA%1E%BD%00%B0%AF%B7%3A%D2U%F6%CC%18%D5.%B712%20%EA%FFf%DB%E9%BD%CF%B0%16%B8%DC%D1%A9%F5%1B%18%89.%AD1r%20%82%00)%DC%8E%BE%EB%B0%1E%B8%A9%D1%FA%F4S%17%FC-%EF1%1C!~%01%10%DDG%BFL%B1%BD%B7%EA%D0%87%F4%F3%16%BA-%A61%20!~%01%22%DDq%BF%40%B1%C3%B7%A3%D0%10%F4%99%16%C2-%1E2%06%22%B6%02%01%DE%A4%BF%E8%B0%CF%B6%60%CF%DD%F2%F4%15%C6-%D02%2B%23%B5%03%E8%DE%0F%C0%B4%B0%FC%B5%92%CEX%F2%94%15%A9-%E221%23%CB%03%C5%DE%22%C0%C8%B04%B6%9E%CE%5B%F2b%15%1B-%2B2%DB%22%A7%03%09%DF%91%C0%96%B1%BC%B6%C8%CE%A4%F1N%14%17%2Cg1K%22%AA%03%AF%DF%60%C1R%B2%22%B7%D1%CE%11%F1P%13%BF*m0%06%22M%04%E2%E0%D6%C2C%B3-%B7%C2%CDr%EF%B9%11%A7)U0%B4%22%C1%05M%E2%D4%C3m%B3%C4%B6%C0%CC%16%EEQ%10%11)R0~%23%B3%06%A7%E3%EE%C4%2F%B4%A6%B6%E7%CB%04%ED%26%0F%CC'%5C%2Fo%23n%07%A9%E4%05%C6%0A%B5%F0%B6%A4%CB%0E%EC%1C%0E%0A'%3C%2Fv%23%D0%07c%E5%AF%C6X%B5%C7%B6%14%CB%0A%EB%FC%0C%26%26%EC.%2C%24%2F%09%F1%E6%E1%C7%E1%B5%B5%B6%18%CA%D5%E9%A6%0B9%25%88.H%24%E3%09%E5%E7%11%C9%90%B6q%B6K%C9%BC%E8%EF%0A%FA%24'%2F%5D%25%1B%0B%93%E8%BC%C8%99%B5%25%B5%EF%C7%A6%E7Z%0A(%25%BF%2F%5E%26%10%0C-%E9%D6%C8%CC%B4%DF%B3%92%C6%C2%E6%12%0At%25j09'%7D%0C%00%E9%24%C8%0C%B4(%B3%F0%C5%99%E6L%0A%EA%25%FE0U'%60%0C%89%E8%97%C7%11%B35%B2%23%C5%ED%E5%E9%09%01%26j1%1D(G%0Dj%E9%E7%C7-%B3%C6%B1V%C4%C9%E4%BE%08%04%25%BF0c(V%0E%18%EB%DA%C9%A4%B4%5E%B2%81%C3%FA%E2K%06%D3%22%C5%2F%A5(%8F%0F%CD%EC)%CBT%B5%CF%B1%85%C2%A2%E1%5E%05%5C%22%BC%2F%1C)_%10%8E%ED%D8%CB%99%B5%A9%B1%A9%C1%99%E0M%04%C9!%D9%2F%DC)j%11%C9%EE%8C%CCk%B5%CF%B0%87%C0A%DFI%03c!70%A0*%83%12%A2%EF%1A%CD%93%B5%9F%B0%07%C0%B0%DE%A0%02%AE%20%AC%2F%C6*6%13%E8%F0%A9%CE5%B7b%B1%EE%BF%DB%DDs%01%A3%1FF%2F%11%2B%17%147%F2%F9%CF%F8%B7%88%B1%96%BF%F6%DC%92%00%26%1FS%2F%B5%2B%3E%15%86%F3%F2%D0M%B8q%B1%C3%BE%FF%DB%B4%FF%CA%1E%BB%2F%E5%2C%DA%16%CF%F4%D8%D1o%B8%DB%B0%A4%BD%F8%DA%07%FF%94%1E%CE%2F5-%5D%17c%F5%3B%D2%A3%B8%F6%B0k%BD%8A%DA%96%FEW%1E%0C0%D6-4%18I%F6%DF%D2!%B9%B8%B0%EF%BC%E3%D9%F0%FD%E8%1D%B3%2F%FC-%EB%18H%F7%F8%D3%CC%B9A%B1%9B%BC%B8%D8Q%FCz%1C%EF.%E6-%A6%19%96%F8P%D5%DF%BAe%B19%BC%D7%D7%82%FB%BA%1B%B8.%5E.t%1A%84%F9%11%D6%1B%BB%D6%B0%20%BB%A5%D6%85%FA%40%1B%F8.P%2F%C3%1B%AC%FA%85%D6%D4%BA%2C%B0%10%BA%B8%D5%D2%F9%1D%1B1%2F%E5%2F6%1C%E6%FA%CB%D62%BBX%B0%10%BAr%D5X%F9%9E%1A%B8.%AA%2FM%1C%9D%FB%88%D7%AE%BBc%B0%DB%B9%0E%D5%DD%F8%17%1A%5D.t%2F%91%1C%DF%FB%04%D8%0E%BC%A5%B0%99%B9b%D4%12%F8%2B%19%D0-.%2F%C5%1CT%FC%AF%D8%A2%BC-%B1%CD%B9%07%D4)%F7%3E%18%DD%2C%D1.%BB%1C%FF%FC%88%D9%B3%BD%9F%B1%B7%B9%7F%D3L%F63%17%E3%2B1.%DF%1C%B6%FD%96%DA%8C%BE%5B%B2%B1%B9%A7%D2%CC%F4%9A%15%DD*%E2-f%1D%CD%FE%B1%DBe%BFN%B2%16%B9k%D1%8A%F3%B7%14%7C*%3F.%24%1E%EA%FF%1F%DD%5D%C0t%B2)%B8%DD%CF%AA%F1%09%13%C7)%87.%89%1F%A1%01x%DE%F4%C0!%B28%B7%7B%CE%97%F0*%12r)%BD.J%20m%02%17%DF%5E%C1'%B2%AC%B6%A4%CD%94%EF%94%11H)S%2F.!%90%03%15%E0%E0%C1%1E%B2%11%B6%B4%CC%C8%EE1%11B)%9A%2F%B7!4%04e%E0%E7%C1%F9%B1%C8%B5R%CC%0C%EEz%10%ED(%AC%2F)%22%E7%04Y%E1V%C2%86%B1%B7%B4%F9%CA%04%ED%D7%0F!)%5C0I%23%CA%05%04%E2%8B%C2%60%B15%B4%2F%CA8%ECi%0F%F3(%A40%1E%24%1C%07%FC%E2%E5%C28%B1G%B3%ED%C8%E7%EA%C5%0E%E8(H1%EA%24%B1%07Q%E3%E9%C2%D3%B0%C5%B2Z%C8%83%EAU%0E%11)%B41%AF%25%99%08U%E4%9F%C3%15%B1%82%B2%D4%C7%FB%E9%F2%0D%B9(%F91Y%26%96%09%FD%E46%C42%B12%B2D%C7%25%E9%0A%0D%08(%BB1r%26%F7%09%AF%E5%FC%C4%AB%B1P%B2%D5%C6%A1%E8%96%0C%DF'%C71%0E'%CC%0A%92%E6%85%C5%C0%B1%DA%B1%11%C6%D2%E7%ED%0B%C3'g2%16(%0A%0C%8F%E7%1E%C6%07%B2%8D%B1J%C5%A2%E6%3D%0B*'L2%A8(i%0D%18%E9%5B%C7z%B2R%B1%91%C4%B6%E5%1E%0A%B0%26V2%1F)%B8%0D%A4%E9%C6%C7%F0%B2F%B1%0A%C4%F3%E4x%09%16%26%3B2%86)%B2%0Em%EA%B0%C8W%B3g%B1%9C%C3c%E4%C0%08%B1%25%022%AB))%0F%15%EB%11%C9e%B3%25%B1C%C3%F4%E3%5B%08%16%25%981%88)%3D%0FO%EBq%C9%D3%B3J%B1%10%C3t%E3%B4%07%B6%24o1%CE)%B6%0FH%ECf%CA%E6%B4%06%B2%3A%C3%D0%E2y%06P%23O0Q))%10b%ED%BA%CB%8E%B5%1C%B2%A7%C2%CA%E1E%050%22%9A%2F%E3(%7F%10%01%EE%A0%CC%26%B6%0D%B2%CE%C1%86%E0%04%04f!%A1%2F%F4)%C3%11%06%EF%F4%CC%FC%B5J%B1%A3%C0E%DFB%03F!%0F0%B8*%F3%12%08%F0%9F%CD%D9%B5%A9%B0%9A%BFO%DEt%02%E2%20f0%81%2B%AD%13%B9%F0%E5%CD%B6%B5%FE%AF%C8%BE%96%DD%E4%01%A1%20%250%9B%2B%EC%13%EA%F0%04%CE%F8%B5%24%B0%9C%BE%FD%DC.%01%F9%1F%D5%2F%92%2B%40%14%86%F1%87%CE%F8%B5%BC%AF%24%BEN%DC%8F%00%60%1F%98%2F%91%2Bc%14%D0%F1%0E%CF%85%B6%BB%AFT%BD%23%DB0%FF%0D%1E%A2.%81%2BO%155%F3Z%D0F%B7%F9%AF%D5%BC%08%DA%09%FE%82%1D%8C.%EC%2B!%163%F4%E6%D0z%B7%B9%AFp%BCz%D9_%FD%D4%1Cu.%10%2CY%16%94%F4%BA%D1%05%B8%9C%AF%CD%BB%97%D8j%FC%1B%1CB.%89%2CT%17%90%F5N%D2%22%B88%AF%DC%BAn%D7R%FB%7C%1B%E9-%E5%2C%11%18%AF%F6%16%D3%8B%B8%02%AF!%BA%18%D6%07%FAL%1A%97-%3D-%22%19%B6%F7%11%D4%E4%B8%DE%AEj%B9m%D5U%F9%0D%1A%7D-%5D-z%19e%F8%D3%D4%96%B94%AF%2B%B9%AA%D4m%F8l%19A-%C6-%5B%1A%AD%F9%F6%D5P%BA%60%AF%E7%B8%CD%D3t%F7%85%18%1C-J.%C5%1B%23%FB_%D7%16%BBW%AF%EC%B7%AA%D2%8C%F6!%18%7D-%82%2FP%1Dn%FC%FA%D7J%BB%ED%AE~%B7%12%D2p%F6c%18%04.50%05%1EQ%FD%BF%D8%AE%BB%EB%AE%ED%B6a%D1d%F5%D7%17%E7-%D30%07%1F%BA%FE%FB%D9%3B%BC%02%AF%A5%B6%E9%D0%CF%F4%85%17%0A.!1%8D%1F%3D%FF%CD%DA%3A%BD%D7%AF%02%B7%D9%D0%7C%F4%E2%16X-%1F1Z%20l%00%B7%DB%D7%BD%EB%AF%A8%B6%18%D0%CD%F3s%16Y-%3D1%82%20%00%01%8D%DC%A7%BEV%B0%CC%B6%B4%CFB%F3%9E%15%B4%2C%FE0%FC%20%A9%01R%DD%95%BF%02%B1%DC%B66%CFU%F2%BE%14)%2C%0E1%82!%C1%02%AB%DEx%C0J%B1%5D%B6%1A%CE%DA%F0%5D%13d%2BH1%CD%22Y%04M%E0%82%C1%9D%B1%A1%B5%DF%CCZ%EFO%12%03%2B%9E1%B5%23%B8%05o%E1D%C2%CE%B1b%B5%18%CC%86%EE%A6%11%AB*%B91Q%24%AB%06%81%E2%EC%C2%E7%B1%F9%B4Q%CB%A5%ED3%11%98*%F61%EC%24o%07%14%E3%3C%C3%11%B2%C9%B4%C4%CA%EA%ECG%10%14*%F01_%251%08%1C%E45%C4k%B2%9D%B41%CA%15%ECs%0F%8B)%F41%E1%250%09%1C%E5%EE%C4%8B%B2%15%B4G%C9.%EB%FC%0E%5E)k2%96%26%06%0A%C6%E5v%C5%BD%B2%D1%B3v%C8%FF%E9%9E%0DZ(%1A23'%3D%0BU%E7%BC%C6_%B3k%B3r%C7v%E8%22%0C%83'824(%DA%0C%04%E9%0E%C8%ED%B30%B30%C6%0D%E7%D4%0A%B0%26%D21%BC(%08%0E%96%EAR%C9%98%B4%2B%B3%C2%C5P%E6%12%0A2%26%D51%0A)%85%0E%0F%EB%FA%C9F%B5%AA%B3%CD%C5%DA%E5U%09%90%25%901u)v%0Fj%EC%40%CB)%B6%DF%B3n%C5%0B%E5%89%08%BC%24%3C1%9F)4%101%ED%FA%CB%C7%B6%EA%B3%0F%C5d%E4%0D%08%B7%24%BE1_*%1B%11S%EE%C9%CC%F0%B6%CF%B3%B4%C4%FB%E3w%07R%24%871%DA*%24%12y%EF)%CE%E3%B7%F2%B3%E5%C3%E4%E2%8F%06%DD%23%DF1%B0%2B%3E%13%84%F0%AA%CE%0E%B8%DB%B3%9A%C3p%E2%1A%06%A7%23%D81J%2CI%14%EF%F1%C5%CF%BB%B8%FD%B3D%C3%A4%E1K%051%23%FB1%D4%2C%2C%15%BB%F2%91%D0%1F%B9%F5%B3%EC%C2%1D%E1%07%05%14%23%202--%BF%15c%F3%00%D1%A9%B94%B4%14%C3%40%E1%FE%04%EF%22%FE1E-%08%16%FB%F3%0E%D2%8C%BA%07%B5%22%C3%E2%E0S%04r%22%D01%82-%D1%16%F5%F4%F8%D2%5B%BB%8B%B5p%C3%84%E0%82%03%60!%081%5C-%98%17%AD%F6%00%D5%D5%BC%13%B6%10%C3%9D%DFH%02Y%20%890%95-)%18E%F7%CB%D5%DA%BD%F4%B6p%C3o%DF%F6%01%F9%1F%600%9E-%B9%18%16%F8%81%D68%BE%F3%B6%1A%C3%03%DFq%01%BC%1FL0%1F.%3B%19%D7%F8%FA%D6U%BE%97%B6~%C2~%DE%0A%01%B8%1F%C40%DF.%05%1AP%F93%D7J%BE%3A%B6%F6%C1%B2%DD%A0%00%9C%1F(1%7F%2F%17%1B%96%FA%0E%D8q%BE%B5%B5%02%C1%B1%DC%FC%FFz%1F%A61j00%1C4%FBH%D8%1A%BE%F1%B4%D7%BF%83%DB%25%FFR%1F52%881%87%1D0%FC%84%D8w%BD%AE%B3o%BEv%DA%82%FEl%1F%D72%CB2%99%1E1%FD%1F%D9%BF%BDm%B3%C5%BD%A4%D9%BF%FD%F2%1E%C62%0C3%1C%1F%AD%FD%94%D9%FC%BDo%B3%89%BD%5E%D9o%FDD%1E%E6182%D6%1E5%FE%BF%DAb%BFk%B4%CF%BD%88%D8%06%FC%E5%1Cl1%B32%15%20~%FF%DB%DB%FE%BF%96%B4.%BD%9F%D7%E1%FA%E6%1B%B20%A12%D6%20%00%01j%DD%19%C1%8D%B4%9D%BC%7C%D6%BB%F9%1B%1B%8F0)3%A8!%DA%014%DE%99%C1%10%B5%C7%BCF%D6i%F9%DC%1Af0%133%AB!%0D%02z%DE%02%C2T%B5%D8%BCK%D6%2F%F9T%1A%CA%2F%B32%08%22%C4%02%94%DF%1A%C36%B6%D3%BC%7B%D5%F4%F7*%19%FA.%C52%D2%22%3F%04%10%E1%3A%C4%90%B6~%BC%83%D4%91%F6%EE%17b.%E62%9F%23%93%05%84%E2k%C5%C9%B6%03%BC%82%D3d%F5%F0%16%FE-q3%C0%24%14%07%F4%E3%3A%C6%17%B7%B7%BB%DC%D2%C7%F4~%16%20.%F63%B3%25%E3%07%9B%E4%A0%C6%06%B7'%BB%0F%D2(%F4y%16%86.%9F4%B6%26%E7%08%14%E5S%C6v%B6Y%BA%5C%D1%CD%F3%D8%16n%2F%F85%00(%D1%09%8A%E5x%C6%F2%B5%AF%B9%8F%D00%F31%16j%2F%9665)%9E%0Bb%E7%C3%C7%81%B6C%B9%7F%CF%0E%F2%C8%15%8E%2F%7C7%82*%BF%0C0%E8f%C8%D8%B6j%B9%93%CF%FA%F1r%15%5C%2F%977!%2B%CB%0D%3C%E9%06%C9!%B7K%B9X%CF%E6%F1%C5%15%A0%2F%D97E%2BC%0E%E7%E9!%CA%81%B8%D6%BA9%D0%05%F2Q%15%FA.%137%09%2B%9C%0E%0D%EB%83%CB%F4%B9%B9%BB%9A%D0%C5%F1%8C%14-.%A16%26%2BH%0F%02%EC%8C%CC%8C%BA%BA%BB%2B%D01%F1J%14x.%9F7z%2CT%10%DB%EC%C4%CCh%BAr%BB%02%D0(%F1X%14%99.%DF7%EB%2C%20%11%80%ED%5C%CDr%BA%FA%BA%07%CFV%F0%C1%13p.%168%8D-%DE%119%EE%0F%CE%F5%BA%FC%BAs%CE3%EF_%12%80-%138%97.%95%13L%F0%AD%CF%C2%BB%D1%BAt%CD%C3%ED%15%11%81%2C%D47%20%2F-%15%0F%F2%3B%D1%86%BC%8C%BA-%CC%A2%EB3%0F%7F%2B%EA760%D5%16r%F3%10%D0%C7%B8%A7%B9v%D3G%F8!%18%AA*%EF%2BL%1A%EF%FD%AF%E4%C7%D7%13%D7%AE%DE%0D%EB%04%FAM%08P%12%00%14x%0C%86%FE%7B%EF%B9%E3%0E%DF%1D%E3%DD%EE%1E%FD%23%09D%0F%08%0E%E7%05%C7%F9%CC%EDf%E5X%E3b%E8%C1%F2%BE%FE%3C%08v%0C%10%0A%F2%01%C3%F66%EC%E3%E5%3D%E6)%ED%C0%F7%8D%02%60%0A%A4%0C9%08h%FEw%F2%8D%E8%00%E42%E6%C9%EE%E2%FA%8F%06%AF%0D%7F%0E%1B%08%BB%FC%1C%F0Z%E63%E2%FD%E4t%EE%DC%FBv%083%10%8E%10f%09%BB%FC%94%EE%C8%E3%FD%DF%7C%E4%FC%EF%7D%FES%0BO%12%81%11%ED%08%EF%FAw%EC%15%E2%40%DF%C9%E4K%F1%98%00%9E%0D%0C%14%8F%11%16%07%03%F8%B5%E9%7B%E0%86%DF%D9%E6)%F4%03%03%96%0E%82%13%E3%0F%11%05W%F6%A1%E80%E0%AF%DFc%E7%DF%F4%CF%03%89%0FY%14%AA%10N%05%1B%F6%BB%E7%FE%DE%92%DE%DE%E6!%F5%D3%04%93%10%D4%14%13%10(%04%D5%F4i%E7%15%E0%B6%E0)%E9%86%F6w%04%81%0E%AA%119%0D%DF%02%CD%F5%5D%EA%F4%E3i%E4h%EB%A2%F6Q%02%DE%0A%05%0E%01%0B%7B%02%85%F7k%EDS%E7%0E%E7%B0%ECB%F6%9E%00%9C%08%C5%0B8%09%97%01%CF%F7%B5%EEO%E9%C8%E8%AA%EDI%F6%F7%FFr%07%94%0A%9A%08%13%02%BC%F8%FF%EF%3D%EA%60%E9%93%ED%DA%F5d%FF%15%07%BB%0A%F5%08h%021%F9%40%F0%99%EA%E5%E9%93%EE%BA%F6%B9%FF%C4%06%90%09p%07%1F%01%16%F9g%F1%CD%EC7%EC%E7%EF%A8%F6%8E%FE%F0%04%1A%08p%07%C7%02o%FB%B8%F3%E2%ED%CB%EB)%EEn%F4%A4%FC%91%04H%09%23%09I%04%8A%FC%0A%F4%8C%EDG%EB%C4%ED%1E%F4W%FC%03%04%94%08%C9%08z%04%06%FD%9D%F4N%EE%14%EC%5C%EE%2F%F4%D7%FB%F3%025%07u%07%EC%03%C9%FD%9B%F6y%F0%83%EDz%EE%2F%F3%DA%F9%EB%00%EC%05S%07%9D%04%B2%FEz%F7%F8%F0%B1%ED7%EE%C7%F2%E3%F9%3F%01A%06%5D%077%04%EA%FD%9A%F6%9C%F0%D6%ED%22%EF%E0%F3%8E%FA%F1%00l%05P%06%93%03%AC%FD%BE%F6%DD%F0%E5%ED%BB%EEN%F3a%FAI%01%D2%05%89%06U%03%1E%FD%CF%F5%C8%EFH%ED%F8%EEs%F4%82%FB%17%02%F7%05%F4%05%1C%02%9E%FB%DE%F4%15%F0h%EEn%F0%80%F5%24%FC%BA%01%0D%05%AA%04%E2%00%F3%FA%CE%F4H%F0%C8%EE%F0%F0%F3%F5N%FC%FD%01(%05%E7%04F%01.%FB%B8%F4%FA%EFw%EE%A0%F0%CD%F5%3A%FC%03%02%2F%05%CC%04%F3%00.%FB%19%F5%AC%F0%3A%EFH%F1%02%F6%EB%FB%22%01*%04%02%04%89%00%0B%FBN%F5%0A%F1%BF%EF%DC%F1%81%F6M%FC6%01%BB%03%FB%02T%FF%11%FA%CE%F4%8F%F1%04%F1G%F3%95%F7x%FC%93%00f%02%8F%01g%FE%F4%F9%7F%F5v%F2%0E%F2%20%F4%22%F8%8F%FC%2C%00j%01U%00E%FDe%F9%D3%F5%AC%F3%9B%F3%84%F5%D1%F8z%FCH%FFn%00%98%FF%05%FD(%F9%A1%F5%8B%F3%BD%F3%C2%F5B%F9%02%FD%D0%FFY%00%E1%FE%F3%FB%8B%F8U%F5%D0%F3n%F4%A2%F6%E3%F94%FD%AD%FF%F1%FFa%FEU%FB%F9%F7%12%F5%D3%F3%98%F4D%F7%7B%FAt%FDM%FFd%FF%B5%FD%E2%FA%D2%F7V%F5%1E%F4%AB%F4%C1%F6%E6%F9%0B%FD%19%FF%CB%FFi%FE%A6%FB%0B%F8%17%F5%B9%F3s%F4%DD%F6%24%FAO%FD%84%FF%F6%FF%90%FE%CD%FB%89%F8%CD%F5_%F4%C5%F4%BB%F6%DA%F9d%FD%AB%FFS%00%CA%FEB%FC%CB%F8%1D%F6%93%F4%EA%F4%02%F7%1A%FAO%FD~%FF%5C%00K%FF%C7%FC%3C%F9~%F6%CE%F4%13%F5%F2%F6%1F%FA~%FD%D5%FF%A1%00%87%FF%D3%FC%B1%F9%B3%F6%3E%F5%2C%F5A%F7%3C%FA%99%FD%F5%FF%F1%00%F8%FF%A3%FDW%FAH%F7Y%F5V%F5%25%F71%FAi%FD%11%00%2F%01%5B%00%D4%FD%87%FAg%F7%84%F5w%F5q%F7%90%FA%1F%FE%AB%00%9D%01o%00%95%FD%14%FA%0D%F7_%F5%83%F5%B7%F7%EC%FAt%FE%F1%00%E1%01%BF%00%F2%FD%7D%FAH%F7%96%F5%A3%F5%98%F7%BD%FA%16%FE%AA%00A%01K%00%B3%FD%A2%FA%A6%F7%0A%F6A%F6%EA%F7%F1%FA%AA%FD%EA%FFw%00%C6%FF%3F%FDV%FA%CA%F7h%F6%AD%F6v%F8a%FB%E8%FD%F6%FF9%00%2B%FF%B1%FC%E2%F9%AB%F7%92%F6%2C%F7%11%F9%E5%FB%9C%FE)%00%0E%00%85%FE%F7%FB%5D%F9%8D%F7%2F%F7%F3%F7%C4%F9%EF%FB%D9%FD%12%FF%0D%FF%D4%FD%F9%FB'%FA%7B%F8%C9%F7%3E%F8%C7%F9%A0%FBR%FDB%FES%FE%80%FD%1A%FC%82%FA%2C%F9m%F8%94%F8%87%F9%19%FB%A2%FC%C8%FD%5B%FE%EE%FD%A9%FC%C5%FAJ%F9N%F8Q%F8.%F9%D6%FA%9D%FC%DF%FDH%FE%8E%FDL%FC%B2%FAW%F9%A8%F8%26%F9k%FA%D6%FB%20%FD%C3%FD%8A%FDt%FC%FF%FA%BE%F9%EB%F8%0C%F9%E8%F9f%FBe%FC%3F%FD%60%FD%E3%FC%A8%FB%96%FA%C7%F9%7F%F9%BC%F9r%FAS%FBF%FC%A9%FC%B7%FC%22%FC%90%FB%BD%FA_%FA%22%FA%5B%FA%C8%FAy%FB%F8%FBe%FCl%FC%3E%FC%8B%FB%DE%FAH%FA%EB%F9%FC%F9%96%FA%8C%FB%80%FC%07%FD%01%FDg%FCM%FB8%FA%2C%F9'%F9%96%F9%D1%FA%EE%FB%04%FDI%FD%05%FD%24%FC%0F%FB%C9%F9%0A%F9%2C%F9%C1%F9%C6%FA%E0%FB%FD%FCJ%FD%04%FD1%FC%03%FB%FB%F9g%F9c%F9%E5%F9%C8%FA%E0%FB%A4%FC%D7%FC%7D%FC%A7%FB%8E%FA%8C%F97%F9O%F9%09%FA%11%FB%09%FCr%FCe%FC%11%FCM%FB~%FA%C9%F9%AD%F9%CC%F9%8E%FA%16%FB%FB%FBH%FCu%FC%0C%FCe%FB%A7%FA%EF%F9%B9%F9%DA%F9%7B%FA4%FB%F7%FB%3D%FC%11%FC%82%FB%F7%FAI%FA%04%FA%FB%F9k%FA%AF%FA%2C%FB%7F%FB%E5%FB%E2%FB%84%FB%FF%FA%9A%FA%5D%FAQ%FA%86%FA%FF%FAX%FB%BA%FB%BA%FB%B6%FBt%FB6%FB%B6%FA%86%FA%83%FA%99%FA%DE%FA%5B%FB%C4%FB%DD%FB%F9%FB%E5%FB%60%FB%E5%FAt%FA_%FAk%FA%13%FB%BE%FB%7D%FC%A1%FCl%FC%C4%FBG%FB%C4%FA%8C%FA%A4%FA%E7%FA%2C%FB%99%FB%17%FCY%FCi%FCg%FC%F8%FB4%FB_%FA%01%FA%25%FA%C9%FA%9B%FBi%FC%FC%FC%F7%FCa%FC%B0%FB%05%FB%87%FAT%FA%85%FA%01%FB%92%FBH%FC%9F%FC%DA%FC%8C%FC%15%FCS%FB%B2%FAW%FAN%FA%94%FA4%FB%EF%FB%8E%FC%A9%FC%96%FC%17%FC%60%FB%99%FA%3B%FA8%FA%88%FA9%FB%17%FC%B7%FC%C5%FC%5C%FC%CD%FBD%FBz%FA*%FAe%FA%FA%FA%82%FB%1E%FC%8E%FC%A7%FCF%FC%92%FB%A8%FA%01%FA%BC%F9%E8%F9%C6%FA%BE%FB%BA%FC%08%FD%DC%FC%EE%FB%BF%FA%94%F9%E0%F8(%F9";

  function playSound(sound_data){
    var sound = <OBJECT ID="sound1"
      CLASSID="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95"
      HEIGHT="0" WIDTH="0">
      <param name="autostart" value="true" />
      <param name="src" value={sound_data} />
      <embed src={sound_data}
      type="audio/wav"
      console="sound1"
      controls="All"
      height="0"
      width="0"
      autostart="true"
      name="sound1" />
      </OBJECT>;
    var div = $tag("div",{innerHTML:sound.toString()});
    $add(document.body, div);
    setTimeout(function(){$rm(div);}, 3000);

  }

  //----------------------------------------------------
  // window-like element object
  //----------------------------------------------------

  var MiniWindow = function(title, app){
    this.title = title;
    this.app = app;
    this.config = new Configuration(title, app, this);
    //this.config.load();
    this.app.window = this;
    this.root = null;
    this.makeDOM();
    //this.config.load();
  };
  MiniWindow.prototype = {
    makeDOM:function(){
      this.close = false;
      body = $tag("div", {id:this.title + "_body"});
      this.appDOM = this.app.root;
      this.configDOM = this.config.root;
      $add(body, this.appDOM, this.configDOM);


      this.root = $tag("div");
      var closeButton = $tag("input", {type:"button",
                                       value:"x"});
      var self = this;
      $event(closeButton, "click",
             function(event){
               self.hide();
               self.app.stop();
             });
      var title = $tag("h2", {id:"__title__" ,textContent:this.title});
      var configA = $tag("a", {textContent:"config"});
      with(configA.style){
        fontSize = "small";
        textDecoration = "underline";
        color = "blue";
      }
      this.statusBar = $tag("div");
      with(this.statusBar.style){
        background = "transparent";
        color = "black";
        fontFamily = "courier new";
        fontSize = "x-small";
        width = "100%";
        height = "20px";
      }
      $add(this.root, closeButton, title, configA, body, this.statusBar);
      with(this.root.style){
        position = "fixed";
        bottom = "0px";
        right = "2px";
        padding = "2px";
        backgroundColor = "#CCCCFF";
        borderTop = "1px solid white";
        borderLeft = "1px solid white";
        borderRight = "1px solid #333333";
        borderBottom = "1px solid #333333";
        width = "250px";
        height = "400px";
        zIndex = "999999";
        textAlign = "left";
        display = "none";
      }
      with(closeButton.style){
        padding = "1px";
        margin = "1px";
      }
      with(body.style){
        backgroundColor = "white";
        width = "100%";
        height = "370px";
        borderBottom = "1px solid white";
        borderRight = "1px solid white";
        borderLeft = "1px solid #333333";
        borderTop = "1px solid #333333";
        fontSize = "small";
        fontFamily = "courier new";
      }
      with(title.style){
        color = "black";
        padding = "2px";
        fontSize = "small";
        display = "inline";
        textAlign = "left";
      }
      $event(this.root, "click",
             function(event){
               if(event.target == configA){
                 self.showConfig();
               }
               if(event.target != this.root &&
                  event.target != title)return;
               event.preventDefault();
               if(self.close){
                 self.show();
               } else {
                 self.showOnlyTitle();
               }
               self.close = !self.close;
             });
      $event(window, "resize",
             function(event){self.resize();});

    },

    inWindow:function(target){
      for(var t = target;
          t && t.tagName != "BODY"
            && t.tagName != "INPUT"
            && t.tagName != "TEXTAREA"
            ;t = t.parentNode){
        if(t == this.root) return true;
      }
      return false;
    },

    show:function(option){
      if($("__orig__")) return;
      var orig = $tag("div", {id:"__orig__"});
      with(orig.style){
        marginRight = "255px";
        float = "right";
      }
      var body = document.body;
      with(body.style){
        padding = "0";
        margin = "0";
      }
      while(body.lastChild){
        orig.insertBefore(body.lastChild, orig.firstChild);
      }
      $add(document.body, orig, this.root);
      this.resize();
      var self = this;
      with(this.root.style){
        display = "block";
        bottom = "0px";
        right = "0";
      }
      this.app.setStatusBar();
    },

    resize:function(){
      if(!$("__orig__")) return;
      if(this.root.style.right == "-160px"){
        this.root.bottom = (20 - window.innerHeight) + "px";
      } else {
        this.root.style.height = (window.innerHeight - 4) + "px"
        $(this.title + "_body").style.height = (window.innerHeight - 52) + "px"
        $("__command_content__").style.height = (window.innerHeight - 82) + "px"
        //$("__command_content__").style.height = "100%";
        var orig =$("__orig__");
        var origHeight =window.innerHeight;
        var origWidth = document.body.clientWidth - 255;
        orig.style.height = origHeight + "px"
        orig.style.width = origWidth + "px"
        orig.style.overflow = "scroll";

        // if(orig.scrollWidth > origWidth
//            && orig.clientHeight > origHeight){
//           orig.style.overflow = "scroll";
//         } else if(orig.clientWidth > origWidth){
//           orig.style.overflow = "scrollX";
//         } else if(orig.clientHeight > origHeight){
//           orig.style.overflow = "scrollY";
//         } else {
//           orig.style.overflow = "none";
//         }
      }
    },

    hide:function(){
      $rm(this.root);
      var orig = $("__orig__");
      var body = document.body;
      while(orig.lastChild){
        body.insertBefore(orig.lastChild, body.firstChild);
      }
      $rm(orig);
    },

    showOnlyTitle:function(){
      var orig = $("__orig__");
      var body = document.body;
      while(orig.lastChild){
        body.insertBefore(orig.lastChild, body.firstChild);
      }
      $rm(orig);
      with(this.root.style){
        display = "block";
        bottom = (20 - window.innerHeight) + "px";
        right = "-160px";
      }
    },

    showConfig:function(){
      this.app.stop();
      this.show();
      this.configDOM.style.display = "block";
      this.appDOM.style.display = "none";
    },

    notifyConfig:function(){
      this.app.setConfig(this.config.config);
    },

    showApplication:function(){


      this.show();
      this.configDOM.style.display = "none";
      this.appDOM.style.display = "block";
      this.app.start();
    }
  };

  var Application = function(){
    this.config = {};
  };
  Application.prototype = {
    setConfig:function(config){

      for(name in config){
        this.config[name] = config[name];
      }
      if("setConfigAux" in this
         && typeof this.setConfigAux == "function"){
        this.setConfigAux();
      }
    },
    requestConfig:function(){
      if(this.hasOwnProperty("window")){
        this.window.showConfig();
      }
    }
  };

  var Configuration = function(name, app, window){
     this.name = name;
     this.window = window;
     this.app = app;
     this.configTemplate = app.configTemplate;
     this.config = {};
     this.root = null;
     this.load();
     this.makeDOM();
  };

  Configuration.prototype = {
    save:function(configData){
      for(name in configData){
        GM_setValue(this.name + "_" + name,
                    "value:" + escape(configData[name]));
        this.config[name] = configData[name];
      }
      this.app.setConfig(this.config);

    },

    load:function(){
      for(name in this.configTemplate){
        var escapedValue = GM_getValue(this.name + "_" + name);
        if(escapedValue){
          var unescapedValue = unescape(escapedValue);
          unescapedValue.match(/value:(.*)/);
          this.config[name] = RegExp.$1;
        }
      }
      this.app.setConfig(this.config);
    },

    makeDOM:function(){
      this.root = $tag("form", {id:"___configuration___"});
      var h2 = $tag("h2", {textContent:this.name});
      var table  = $tag("table", {id:"__config_table__"});;
      table.style.width = "100%";
      var tbody = $tag("tbody");
      $add(table, tbody);
      var inputs = [];
      for(name in this.configTemplate){
        if(this.configTemplate.hasOwnProperty(name)){
          var tr = $tag("tr");
          var value = this.config[name];
          if(!value){
            value = this.configTemplate[name];
          }
          var input = null;
          var options ={id:"prompt:" + name,
                        value:value};
          if(value.indexOf("\n") >= 0){
            options.cols = 50;
            options.rows = 4;
            input = $tag("textarea", otpions);
          } else {
            input = $tag("input", options);
          }
          inputs.push(input);
          var th = $tag("th", {align:"right", textContent:name + ":"});
          with(th.style){
            backgroundColor = "#EEEEEE";
            fontSize = "small";
            color = "black";
            fontFamily = "courier new";
            textAlign="right";
          }
          var td = $tag("td");
          with(td.style){
            fontSize = "small";
            color = "black";
            fontFamily = "courier new";
            textAlign="left";
          }
          $add(td, input);
          $add(tr, th, td);
          $add(tbody, tr);
        }
      }
      var apply = $tag("input",{type:"submit",value:"ok"});
      var cancel = $tag("input",{type:"button",value:"cancel"});
      var self = this;
      var window = this.window;
      $event(this.root,"submit",
             function(event){
               event.preventDefault();
               var data = {};
               inputs.forEach(function(input){
                   input.id.match(/prompt\:(.*)/);
                   var name = RegExp.$1;
                   var value = input.value;
                   data[name] = value;
                 });
               self.save(data);
               self.window.showApplication();
               return false;
             });
      $event(cancel, "click",
             function(event){
               self.window.showApplication();
             });
      $add(this.root, h2, table, apply, cancel);
      with(this.root.style){
        display = "none";
        opacity = "1.0";
      }
    }
  };

  //----------------------------------------------------
  // CUI application
  //----------------------------------------------------
  var CUI = function(){
    this.init.apply(this, arguments);
  };
  CUI.prototype = {
    init:function(action, max, dblClickListener){
      this.max = max ? max : 20;
      this.dblClickListener = dblClickListener;
      this.root = null;
      this.content = null;
      this.input = null;
      this.action = action;
      this.makeDOM();
    },

    outputHTML:function(content){
      var line = $tag("div", {innerHTML:escapeHTML(content)});
      with(line.style){
        background = "transparent";
        width = "100%";
        padding = "2px";
        borderBottom = "1px dotted #333333";
      }
      this.output(line);
    },

    outputLine:function(content){
      var line = $tag("div");
      with(line.style){
        background = "transparent";
        width = "100%";
        padding = "2px";
        borderBottom = "1px dotted #333333";
      }
      this.output($add(line, content));
    },

    output:function(content){
      var newLine = $tag("div", {className:"__command_line__"});
      $add(newLine, content);
      var lines = this.content.childNodes;
      if(!lines || lines.length <= 0){
        $add(this.content, newLine);
      } else {
        this.content.insertBefore(newLine, lines[0]);
        lines = this.content.childNodes;
        if(lines.length >= this.max){
          this.content.removeChild(lines[lines.length - 1]);
        }
      }
      var blue = 0;
      var id = setInterval(function(){
          newLine.style.backgroundColor = "rgb(255,255," + blue + ")";
          blue++;
          if(blue > 255){
            clearInterval(id);
          }
        }, 1);
    },

    commandAction:function(input){
      if(typeof this.action == "function"){
        try{
          this.action(input);
        }catch(e){
          var errorMessage = $tag("div", {textContent:e.message});
          with(errorMessage.style){
            color = "red";
            border = "1px solid red";
            padding = "2px";
            backgroundColor = "lightyellow";
          }
          this.output(errorMessage);
        }
      }
    },

    changeToInput:function(textarea){
      var input = $tag("input");
      with(input.style){
        width = "100%";
        padding = "2px";
      }
      this.root.insertBefore(input, textarea);
      this.root.removeChild(textarea);
      this.input = input;
      var self = this;
      $event(this.input, "keydown",
             function(event){
               if(Keybind.code(event) == "S-enter" &&
                  self.input.tagName == "INPUT"){
                 self.changeToTextarea(input);
                 event.preventDefault();
               }
             });
      this.addDblClickListener();
      this.input.focus();
    },

    addDblClickListener:function(){
      if(!this.dblClickListener || typeof this.dblClickListener != "function") return;
      var self = this;
      $event(this.input, "dblclick",
             function(event){self.dblClickListener();});
    },

    changeToTextarea:function(input){
      var textarea = $tag("textarea",{rows:4, value:input.value + "\n"});
      with(textarea.style){
        width = "100%";
        fontSize = "small";
        color = "black";
        padding = "2px";
      }
      input.parentNode.insertBefore(textarea, input);
      input.parentNode.removeChild(input);
      this.input = textarea;
      var self = this;
      $event(textarea, "keydown",
             function(event){
               var phrase = Keybind.code(event);
               if(phrase == "C-m" || phrase == "C-enter"|| phrase == "S-enter"){
                 self.commandAction(textarea.value);
                 textarea.value = "";
                 self.changeToInput(textarea);
                 event.preventDefault();
               }
             });
      this.addDblClickListener();
      this.input.focus();
    },

    makeDOM:function(){
      this.root = $tag("form", {action:""});
      this.root.style.height = "100%";
      with(this.root.style){
        textAlign = "left";
      }
      this.input = $tag("input");
      with(this.input.style){
        width = "100%";
        padding = "2px";
      }
      var submit = $tag("input", {type:"submit", value:"do"});
      submit.style.display = "none";
      with(submit.style){
        padding = "1px";
        fontSize = "small";
        fontFamily = "courier new";
      }
      var content = $tag("div",{id:"__command_content__"});
      with(content.style){
        overflow = "scroll";
        width = "100%";
      }
      this.content = content;
      $add(this.root, this.input, submit, content);
      var self = this;
      $event(this.root, "submit",
             function(event){
               event.preventDefault();
               if(self.input.value.replace(/\s/g,"").length <= 0)
                 return;
               self.commandAction(self.input.value);
               self.input.value = "";
               return false;
             });
      $event(this.input, "keydown",
             function(event){
               if(Keybind.code(event) == "S-enter" &&
                  self.input.tagName == "INPUT"){
                 self.changeToTextarea(self.input);
                 event.preventDefault();
               }
             });
      this.addDblClickListener();
      var style =
      ["#__command_content__ {",
       " font-family:courier new;",
       " background-color:white;",
       " border: 1px solid #333333;",
       " padding:2px;",
       " font-size:small;",
       "}",
       ".__command_line__  {",
       " width:100%",
       " text-align:left;",
       " font-size:small;",
       " color:black;",
       "}"
       ].join("\n");
      GM_addStyle(style);
    }
  };


  //----------------------------------------------------
  // command manager
  //----------------------------------------------------
   var CommandManager = {
     defaultCommand:"twit",
     comlets : {},
     add : function(comlet, commands){
       if(arguments.length < 2) return;
       for(var i=1,command;command = arguments[i];i++){
         this.comlets[command] = comlet;
       }
     },
     dispatch : function(message){
       var command = null;
       if(!message.match(/^\s*\:(\S+)/)){
         if(this.defaultCommand){
           command = this.defaultCommand;
           message = ":" + command + " " + message;
         } else {
           return false;
         }
       } else {
         command = RegExp.$1;
       }
       if(!this.comlets.hasOwnProperty(command)) return false;
       this.comlets[command].execute(message);
       return true;
     }
   };



  //----------------------------------------------------
  // twitter client
  //----------------------------------------------------

  var Twitter = {
    config:function(auth, format){
      var user = auth.username;
      var pass = auth.password;
      Twitter.baseURL = ["http://", user, ":", pass, "@",
                         "twitter.com"].join("");
      var mkURL = function(path){
        return [Twitter.baseURL,
                path,
                ".",
                format].join("");
      };
      Twitter.updateURL = mkURL("/statuses/update");
      Twitter.friendsURL = mkURL("/statuses/friends");
      Twitter.timelineURL = mkURL("/statuses/friends_timeline");
      Twitter.publiclineURL = mkURL("/statuses/public_timeline");
    },

    update:function(doing, func, errorFunc){
      try{
        XHR.post(Twitter.updateURL, {"status":doing},
                 function(xhr){
                   debug(xhr.responseText);
                   func(xhr);
                 },
                 function(xhr){
                   errorFunc();
                 });
      }catch(e){
        errorFunc();
      }
    },

    friends:function(func, errorFunc){
      try{
        XHR.get(Twitter.friendsURL, {},
                function(xhr){
                  debug(xhr.responseText);
                  func(xhr);
                },
                function(xhr){
                  errorFunc();
                });
      }catch(e){
        errorFunc();
      }
    },

    timeline:function(mode, since, func, errorFunc){
      var params = {};
      if(since){
        params.since = since;
        // params.since_id = since;
      }
      try{
        var returned = false;
        var count = 0;
        var url = (mode == "friend") ? Twitter.timelineURL : Twitter.publiclineURL;
        var post = function(){
          XHR.get(url, params,
                  function(xhr){
                    returned = true;
                    debug(xhr.responseText);
                    func(xhr);
                  },
                  function(xhr){
                    returned = true;
                    errorFunc();
                  });
          setTimeout(function(){
                       if(!returned){
                         count++;
                         debug("retry:" + count);
                         post();
                       }
                     }, 1000*60);
        };
        post();
      }catch(e){
        errorFunc();
      }
    }
  };

  //----------------------------------------------------
  // application
  //----------------------------------------------------
  function run(){

    //----------------------------------------------------
    // twitter client application
    //----------------------------------------------------


    var twitterApp = new Application();
    twitterApp.mode = "friend";
    twitterApp.lastTime = null;
    twitterApp.lastId = null;
    twitterApp.configTemplate = {
      username:"username",
      password:"password",
      shortcut:"S-t",
      interval:"30",
      sound:"false"
    };

    var inputListener = function(input){
      if(!CommandManager.dispatch(input)){
        if(input.match(/^\s*:(\S*)/)){
          ph("\"" + RegExp.$1 + "\" was unknown command.");
        }
      }
    };


    var dblClickListener = function(){
      if(this.input.tagName == "INPUT"){
        this.changeToTextarea(cui.input);
      }
      this.input.value = ["reading" ,
                          document.title,
                          document.location.href].join("\n");
    };

    var cui = new CUI(inputListener, 100, dblClickListener);
    twitterApp.root = cui.root;
    twitterApp.start = function(){
      if(this.autoReload){
        return;
      }
      if(!this.checkConfig()){
        return;
      }
      this.autoReload = true;
      this.timeline();

    };

    twitterApp.makeRecordDOM = function(line){
      var recordId = "__twitter_line__" + line.id;
      if($(recordId)){
        debug("existed record");
        return null;
      }
      var record = $tag("div");
      record.style.width = "100%";
      var table = $tag("table", {id:recordId, className:"__twitter_record__"});
      with(table.style){
        background = "transparent";
        width = "100%";
        padding = "2px";
        borderBottom = "1px dotted #333333";
      }
      var tr = $tag("tr");
      var imgTd = $tag("td",{valign:"top"});
      with(imgTd.style){
        verticalAlign = "top";
        width = "24px";
      }
      var imgA = $tag("a", {href:"http://twitter.com/" + line.user.name});
      var img = $tag("img", {src:line.user.profile_image_url,
                             width:"24", height:"24"});
      img.style["float"] = "left";
      img.setAttribute("style","float:left;");
      with(img.style){
        display = "block";
      }
      var dataTd = $tag("td");
      with(dataTd.style){
        textAlign = "left";
        fontSize = "small";
      }
      var nameA = $tag("a", {href:"http://twitter.com/" + line.user.screen_name});
      with(nameA.style){
        color = "blue";
      }
      var nameAndDate = $tag("div");
      with(nameAndDate.style){
        fontSize = "x-small";
        textAlign = "left";
        color = "#333399";
      }
      var name = $tag("span", {textContent:line.user.screen_name});
      var date = $tag("span", {textContent:" [" +new Date(line.created_at).gotinFormat() + "]"});
      var doing = $tag("div", {innerHTML:convertAnchor(line.text)});
      with(doing.style){
        lineHeight = "120%";
        margin = "2px";
        padding = "2px";
        textAlign = "left";
      }
      $add(record,
           $add(table,
                $add(tr,
                     $add(imgTd, $add(imgA, img)),
                     $add(dataTd,
                          $add(nameAndDate,
                               $add(nameA, name),
                               date),
                          doing))));
      return record;
    };
    twitterApp.timelineMode = "friend";
    twitterApp.command = "twit";
    twitterApp.status = "";
    twitterApp.setTimelineMode = function(text){
      this.timelineMode = text;
      this.setStatusBar();
    };
    twitterApp.setCommand = function(text){
      this.command = text;
      this.setStatusBar();
    };
    twitterApp.setStatus = function(text){
      this.status = text;
      this.setStatusBar();
    };
    twitterApp.setStatusBar = function(){
      if(!this.window.statusBar) return;
      this.window.statusBar.innerHTML =
      "["
      + this.command
      + "]"
      + this.timelineMode
      + " <span style='color:red'>"
      + this.status
      + "</span>";
    };
    twitterApp.timeline = function(){
      var self = this;
      var last = self.lastTime;
      if(this.mode == "public"){
        last = self.lastId;
      }
      Twitter.timeline(this.mode, last, function(xhr){
          debug("response status:" +xhr.status);
          var info = parseJSON(xhr.responseText);
          if(!(info instanceof Array)){
            if(xhr.responseText.match(/html/i) || (xhr.status != 304 && xhr.status != 200)){
              self.setStatus("twitter server error");
            }
            self.reload();
            return;
          }
          self.setStatus("");
          var added = false;
          for(var i=info.length-1;i>=0;i--){
            var line = info[i];
            var record = self.makeRecordDOM(line);
            if(!record)continue;
            cui.output(record);
            added = true;
            var time = line.created_at;
            if(time)self.lastTime = time;
            var id = line.id;
            if(id)self.lastId = id;
          }
          if(added && twitterApp.config.sound.match(/true/i)){
            playSound(sound_pi);
          }
          self.reload();
        },
        function(){
          self.reload();
        });
    };
    twitterApp.reload = function(){
      var interval =parseInt(this.config.interval);
      if(!interval || interval < 5){
        interval = 5;
      }
      if(this.autoReload){
        var self = this;
        this.timeoutId = setTimeout(function(){
            if(self.autoReload)self.timeline();
          }, interval * 1000);
      }
    };

    twitterApp.stop = function(){
      debug("stop:");
      if("timeoutId" in this && this.autoReload){
        clearTimeout(this.timeoutId);
        this.autoReload = false;
      }
    };
    twitterApp.setConfigAux = function(){
      Twitter.config(this.config, "json");
      var self = this;
      var shortcut = this.config.shortcut;
      if(!shortcut){
        this.requestConfig();
      } else {
        Keybind.add(shortcut,
                    function(){
                      if(self.window.root.parentNode &&
                         self.window.root.style.display == "block"){
                        self.window.hide();
                      } else {
                        self.window.show();
                        self.start();
                        setTimeout(function(){cui.input.focus()}, 500);
                      }
                    });
      }
    };
    twitterApp.checkConfig = function(){
      if(!this.config.username || !this.config.password
         || !this.config.interval || !this.config.shortcut
         || !this.config.sound){
        this.stop();
        this.requestConfig();
        return false;
      } else {
        return true;
      }
    };
    var twitterWin = new MiniWindow("twitter lite", twitterApp);




    //----------------------------------------------------
    // comlet
    //----------------------------------------------------
    var Comlet = function(command){
      if(!(command instanceof Array)){
        command = [command];

      }
      command.unshift(this);
      CommandManager.add.apply(CommandManager, command);
    };

    Comlet.prototype = {
      echo:true,
      execute:function(message){
        var command = "";
        var inputValue = "";
        if(message.replace(/\r/g,"").replace(/\n/g,"\t").match(/^\s*\:(\S+)\s+(.*)$/)){
          command = RegExp.$1;
          inputValue = RegExp.$2.replace(/\t/g, "\n");
        }
        if(this.echo){
          cui.outputHTML(message);
        }
        try{
          this.executeAux(command, inputValue);
        }catch(e){
          debug(e);
        }
      }
    };
    //----------------------------------------------------
    // twitter comlet(defulat command)
    //----------------------------------------------------
    var twitterComlet = new Comlet("twit");
    twitterComlet.echo = false;
    twitterComlet.executeAux = function(command, input){
      twitterApp.stop();
      Twitter.update(input, function(xhr){
          twitterApp.start();
        });
    };

    //----------------------------------------------------
    // keep omlet
    //----------------------------------------------------
    var keepComlet = new Comlet("keep");
    keepComlet.executeAux = function(command, keep){
      CommandManager.defaultCommand = keep;
      ph("set default command : \"" + keep + "\".");
      twitterApp.setCommand(keep);
    };



    //----------------------------------------------------
    // amazon search comlet
    //----------------------------------------------------

    var amazonComlet = new Comlet("amazon");
    amazonComlet.parse = function(keyword, xml){
      var parser = new DOMParser();
      var doc = parser.parseFromString(xml, "text/xml");
      var items = doc.getElementsByTagName("Item");
      var length = items.length;
      if (!length) {
        ph("not found \"" + keyword + "\" by amazon. ");
        return;
      }

      ph("amazon search result:\"" + keyword + "\":(" + length +  ") ");
      for(var i=0,item;item = items[i];i++){
        var link = item.getElementsByTagName("DetailPageURL")[0].textContent;
        var attrs = item.getElementsByTagName("ItemAttributes")[0];
        var title = attrs.getElementsByTagName("Title")[0].textContent;
        var M_IMG = item.getElementsByTagName("MediumImage")[0];

        var line = $tag("div");
        with(line.style){
          background = "transparent";
          width = "100%";
          padding = "2px";
          borderBottom = "1px dotted #333333";
        }
        if(M_IMG){
          var img_url =
            M_IMG.getElementsByTagName("URL")[0].textContent;
          var img =$tag("img",{src:img_url});
          img.style.display = "block";
          $add(line, img);
        }
        cui.output($add(line,
                        $tag("a",
                             {href:link,
                                 textContent:"\"" + title +  "\" "})));
      }
    };

    amazonComlet.executeAux = function(command, keyword){
      var url = "http://webservices.amazon.co.jp/onca/xml";
      var params = {
        Service:"AWSECommerceService",
        SubscriptionId:"0JWRDGQGA4HQ9MGH63G2",
        AssociateTag:"gonikki-22",
        Operation:"ItemSearch",
        SearchIndex:"Books",
        ResponseGroup:"Medium",
        Keywords:keyword
      };
      var self = this;
      var func = function(xhr){
        var xml = xhr.responseText;
        self.parse(keyword, xml);
      };
      XHR.get(url, params, func);
      ph("I'll search \"" + keyword + "\" by amazon... ");
    };

    function through(data){
      return data;
    }

    var flickrComlet = new Comlet("flickr");
    flickrComlet.executeAux = function (command, keyword) {
      var params = {api_key: "68cc97afffd6cb18f2396305bef9cc17",
                    method:"flickr.photos.search",
                    per_page:"10",
                    sort:"date-posted-desc",
                    format:"json",
                    jsoncallback : 'through',
                    text:keyword
      };
      var url = 'http://www.flickr.com/services/rest/';

      var self = this;
      var func = function(xhr){
        var json = eval(xhr.responseText);
        self.parse(keyword, json);
      };
      XHR.get(url, params, func);
      ph("I'll search \"" + keyword + "\" by flickr... ");
    };

    flickrComlet.parse = function (keyword, data){
      if (!data.photos ) return;
      var list = data.photos.photo;
      if (!list) return;
      var length = list.length;
      if (!length) {
        ph("not found \"" + keyword + "\".");
        return;
      }

      cui.output("flickr search result:\"" + keyword + "\":(" + length +  ") ");
      list.forEach(function(photo){
          var a = $tag("a", {href:'http://www.flickr.com/photos/'+
                             photo.owner+'/'+photo.id+'/'});
          var img = $tag("img", {src:'http://static.flickr.com/'+photo.server+
                                 '/'+photo.id+'_'+photo.secret+'_s.jpg'});
          p($add(a, img, photo.title));
        });
    };


    var twitterSearchComlet = new Comlet("search");
    twitterSearchComlet.executeAux = function(command, keyword){
      var params = {keyword: keyword};
      var url = 'http://twitter.1x1.jp/rss/search/';
      var self = this;
      var func = function(xhr){
        self.parse(keyword, xhr.responseText);
      };
      XHR.get(url, params, func);
      ph("I'll search \"" + keyword + "\" by twitter search... ");
    };

    twitterSearchComlet.parse = function (keyword, xml){
      // Can't parse responseText as xml. I don't know why...
      // Instead of using xml parser, I use innerHTML technique.
      // But,  "link" tag was maintained as no-content tag by that technique.
      // So, I get text-content of "link" tag from "link"-tag's next sibling.
      // What darty code! :-(
      var doc = $tag("div", {innerHTML:xml});
      var items = doc.getElementsByTagName("item");
      var length = items.length;
      if (!length) {
        ph("not found \"" + keyword + "\" by twitter search. ");
        return;
      }
      cui.output("twitter search result:\"" + keyword + "\":(" + length +  ") ");
      for(var i=length-1;i>=0;i--){
        var item = items[i];
        var link = $child(item, "link");
        var a = $tag("a", {href:link.nextSibling.textContent});
        var user = $tag("span", {textContent:$child(item, "title").textContent});
        var desc = $tag("div", {textContent:$child(item, "description").textContent});
        var pubDate = $child(item, "pubdate");
        var time = $tag("span", {textContent:new Date(pubDate.textContent).gotinFormat()});
        p($add($tag("div"),
               $add($tag("div"),
                    user,
                    $add(a, time)),
               desc));
      }
    };


    var closeComlet = new Comlet("close");
    closeComlet.executeAux = function(command, args){
      twitterWin.hide();
    };
    var minComlet = new Comlet("min");
    minComlet.executeAux = function(command, args){
      twitterWin.showOnlyTitle();
    };

    var jsComlet = new Comlet("js");

    function p(s){
      cui.outputLine(s);
    }

    function ph(s){
      cui.outputHTML(s + "");
    }

    var print = ph;


    function timer(t){
      setTimeout(function(){
          ph(t + "seconds!");
        }, t * 1000);
      return "timer start:" + t + "seconds";
    }

    jsComlet.executeAux = function(command, script){
      if(!script){
        ph("js command usage: js [javascript]");
        return;
      }
      try{
        var result = eval(script);
        if(result != 0 && result != "" && !result){
          return;
        }
        ph(result);
      }catch(e){
        ph(e);;
      }
    };

    var modeComlet = new Comlet("mode");
    modeComlet.executeAux = function(command, arg){
      if(arg == "friend" || arg == "public"){
        twitterApp.mode = arg;
        ph("set timeline mode :" + arg);
        twitterApp.setTimelineMode(arg);
      } else if(arg == "auto"){
        if(!twitterApp.autoReload){
          twitterApp.autoReload = true;
          twitterApp.reload();
        }
        ph("set auto-reload mode");
      } else if(arg == "stop"){
        twitterApp.autoReload = false;
        ph("stop auto-reload mode");
      } else {
        ph("mode command usage: mode [friend|public]");
      }
    };

    GM_registerMenuCommand("show twitter-lite",
                           function(){
                             twitterWin.show();
                             twitterApp.start();
                           });

    var helpComlet = new Comlet("help");
    helpComlet.executeAux = function(arg){

    };
  }
  if(unsafeWindow.parent==unsafeWindow){
    run();
    var style = <><![CDATA[
        .__twitter_record__ {
          color:black;
          font-weight:normal;
          font-style:normal;
          font-family:courier new;
          text-decoration:normal;
        }
        .__twitter_record__ a {
          color:blue;
          text-decoration:underline;
          font-weight:normal;
          font-style:normal;
          font-family:courier new;
        }
      ]]>
      </>;
    GM_addStyle(style);
  }

})();
