// ==UserScript==
// @name          post2sbm
// @namespace     http://gomaxfire.dnsdojo.com
// @description   bookmark opened page
// @include       *
// @version   0.2522
// ==/UserScript==

(function(){
  var WSSE_URL = "http://reader.livedoor.com/js/wsse.js";

  var $ = function(id){
    return document.getElementById(id);
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

  function $tag(tagName, attrs, styles){
    var tag = document.createElement(tagName);
    if(attrs){
      for(a in attrs){
        if(attrs.hasOwnProperty(a)){
          tag[a] = attrs[a];
        }
      }
    }
    if(styles){
      for(a in styles){
        if(styles.hasOwnProperty(a)){
          tag.style[a] = styles[a];
        }
      }
    }
    return tag;
  }

    "h1 h2 h3 h4 h5 h6 div p span a img table tr th td form input textarea".split(" ").forEach(function(tagName){
      var func = function(attrs, styles){
        return $tag(tagName, attrs, styles);
      };
      eval("$" + tagName + "= func;" );
    });


  function $text(text){
    return document.createTextNode(text);
  }

  function $rm(element){
    if(element && element.parentNode){
      element.parentNode.removeChild(element);
    }
  }

  var Progress = (function(){
    var container = null;
    var loadImg = 'data:application/octet-stream;base64,'+
      'R0lGODlhEAAQAPYAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwkJCQoKCgwMDA0NDQ4ODg8PDxQU'+
      'FB0dHSEhISMjIyQkJCgoKCkpKSsrKy0tLTAwMDIyMjQ0NDU1NTk5OTs7Ozw8PD4+PkBAQFNTU1hY'+
      'WFpaWl9fX2JiYmpqamxsbHJycoGBgZWVlZmZmZqampycnJ2dnZ6enqKioqSkpKioqKqqqqysrK+v'+
      'r7GxsbKysr29vcbGxsrKyuXl5enp6erq6v///wgICAsLCxAQEBUVFRYWFhkZGRsbGx4eHiUlJSoq'+
      'Ki8vLzExMTMzM0NDQ0lJSU9PT1FRUVdXV2BgYGFhYWRkZGVlZWdnZ2hoaHNzc3V1dXh4eHt7e3x8'+
      'fIWFhZGRkbCwsMfHx8nJydbW1tjY2NnZ2dvb293d3d/f3+Li4ubm5ujo6Ozs7BMTEycnJywsLFtb'+
      'W2lpaYODg6urq66urrS0tOvr6+3t7RgYGD8/P25ubq2trbOzs9XV1eDg4Jubm6OjowAAAAAAACH/'+
      'C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRp'+
      'bmZvLm5ldCkAIfkEAQoAAAAsAAAAABAAEAAABoxAgHDIodE4w6RwIHDgej2cQymkpFSjHZRXCQyS'+
      'gpROZ7tBbY7M5btcjWWT0+lR2GgISQxs5lEaCkMBHSUaCFQAAQkCABE1OS0Lhw8hFYyOLgySlIgd'+
      'JpWHiYtCARQXeEkKCUoSLzEXqCQiB0kQLC+VFhaJIiAGSQEQEgENKCgNAAe+hwAEHx+ny9FDQQAh'+
      '+QQBCgAAACwAAAAAEAAQAAAHnYAAgoNAIiJAg4mJAVlmZlkED0QBiT9OT0MzOjpdWmVjU4lOXjkk'+
      'U2FgXGc9PWJEg09fOVQESUgYO6xkD4MMUFVCgwVbaWhWlABBGAqKAAYWRwmUBlg2Uc2CQR9FztXX'+
      '2NrcyUoL2AABBwKJCwzNCD6KPiZX7YMITUwGiQdSJuVGRgL4YLKEQDwEABSYMMHMQAFzAARo0KAO'+
      'okVBgQAAIfkEAQoAAAAsAAAAABAAEAAAB5mAAIKDAhERAoOJih02Nh0ABAOKARASACU5OW4YLCkU'+
      'iRAsLxRHLi4aMDo6KYiCEi8xFwAMCwlwqiqSggJsFwSJHnByUGqCBA0BioJrN3M4HAAfbxbKACc9'+
      '2HHR09XX2ZANrYpFNnTPgwkKygUObA6DB20k6oMGGxm/9SBtCQAPDwAKaLigq94BAAmePOkXqdqu'+
      'ChXEOZwoKBAAIfkEAQoAAAAsAAAAABAAEAAAB5qAAIKDAAYGhIiEDlhYDomDPggASnh4GApPTgmE'+
      'B1ImCgpRUT9QOV5OhD4mVwyEVDlfT4gLrYRCVCR1AYIDC7uJBVM0WUAAGndGj0lgOmUixsiPF3rN'+
      'z72/hAVJXHnEkJKDBVtzaFoEgwZMTeAAbDs9PWQPgwRLTD4AQWpHZ/BiRNkOHbBjJ4GVPWOmPAIQ'+
      'oEiRAAMeEMG28FEgACH5BAEKAAAALAAAAAAQABAAAAaLQIBwSCwaAYTPh3AUGg6ABgrVCEggAaIB'+
      'JEoELBZA5cWCEA8ikoJ4ib0kxcSaSLhQskKBt1kxdbIVIQ9HDC45NRFigkcLLYeJenhFCBolf0MF'+
      'BkUeMzAYdBobBQ8nJxMyOjorA0MDFxkONj09NzapKQJEAwEVPLM7IyopFEcOOLM4DgKsTR00NB1G'+
      'QQAh+QQBCgAAACwAAAAAEAAQAAAHnoAAgoOEhYYAAhoaAoeCBQYACiYmCgAIPoUES0w+AUZGAAsm'+
      'UgeEBkxNCIQMVyaYhD6qhQwLhAIHAY0LSkGCRR+9h1E2WJC/wYbDxQABCUcWkIUKGMEBVmhpWwWD'+
      'QlVQDIMPZD09OxhISQRUOV9Pg0Ri5GdcYGFTJDleToRTY2VaXXTomDHkiZMfhAIQeUAgixkzWXI1'+
      'EgREhAgghgIBACH5BAEKAAAALAAAAAAQABAAAAeYgACCg4SFhgACFRUCh4IDBAAJT08JAAcGhQMX'+
      'GgUADw+RIiCYgwQZG6SCCiQiB4MObA6dhQqVghw4dDaghgINkHE9wieHFm8fAMHDxccAuHM3a4cB'+
      'v4JqI3lwHoQEF4uDAyo6OnAJCwwAFzEvEoMCKeN9Gi4uRxQvLBCEFCl8SW45cpQAIAFCgEyQOtiw'+
      '0aERIQERIjAqFAgAIfkEAQoAAAAsAAAAABAAEAAAB5qAAIKDhIWDAUQPAwFFRQGGglNjZVYJdnYH'+
      'AAYFhERiPT1nR2pBAD5MSwSDD2SgO2yDCE1MBoMEWmhzW5yxPoNAWXlcSbyEAQsDACJlOnoXkEZ3'+
      'GsrMYEnQ0gDANFPFxsiCAXUkVEKFDAuFT185VIQMVya+g05eOVA/UVEKCiZSmYMSOHmiAAMePEoA'+
      'IJgHyQEWLA4gGTJQy1AgADs=';
    var ID = "_progress_";
    function start(title){
      if(!container){
        container = $div({},
                         {
                           position:"fixed",
                           right:"0",
                           bottom:"0",
                           backgroundColor:"#000",
                           fontFamily : "courier new",
                           fontSize: "10pt",
                           padding:"5px",
                           letterSpacing:"0.03em",
                           lineHeight:"1.2em",
                           color:"white",
                           textAlign:"left",
                           zIndex:"9999999"
                         });
          $add(document.body, container);
      }
      container.style.display = "block";
        $add(container,
             $add($div({id:ID + title, textContent:title + " posting..."}),
                  $img({src:loadImg})));
    }
    function finish(title){
        $(ID + title).textContent = title + " posted.";
      setTimeout(function(){
            //$rm($(ID + title));
        Dialog.disappear($(ID + title), 120, container);
      }, 1000);
    }
    function destroy(){
        $rm(container);
      container = null;
    }
    return {start:start, finish:finish, destroy:destroy};
  })();

  var Dialog = {
    init:function(){
      var div = $div({id:"__p2s_black__"});
      var message = $div({id:"__p2s_message__"});
        $add(document.body,
             $add(div, message));
      window.addEventListener("resize", Dialog.resize, true);
      Dialog.resize();
      Dialog.makeStyle();
      Keybind.add("escape",function(){if(div.style.display == "block")Dialog.disappear(div, 120);});
      return div;
    },

    resize:function(e){
      var div = $("__p2s_black__");
      if(!div){
        div = Dialog.init();
      }
      var message = $("__p2s_message__");
      div.innerWidth = window.innerWidth;
      div.innerHeight = window.innerHeight;
      message.style.left = (window.innerWidth - message.clientWidth)/2 + "px";
      message.style.top = (window.innerHeight - message.clientHeight)/2 + "px";
    },

    makeStyle:function(){
      var s= <><![CDATA[
                        #__p2s_black__ {
                          background-color:black;
                          position:fixed;
                          color:black;
                          font-family:Verdana;
                          top:0;
                          left:0;
                          width:100%;
                          height:100%;
                          padding:10px;
                          margin:0;
                          z-index:999998;
                          display:none;
                        }
                        #__p2s_message__ {
                          font-family:courier new;
                          position:fixed;
                          background-color:lightyellow;
                          border: 5px solid yellow;
                          padding:10px;
                          margin:0;
                          display:block;
                          font-size:small;
                        }
                        #__p2s_message__ h2{
                          font-family:Verdana,
                          text-align:left;
                          font-size:large;
                          color:black;
                        }
                        #__p2s_black__ input{
                          background-color:white;
                          color:black;
                        }
                        #__p2s_black__ *{
                          margin:0;
                        }
                        ]]></>;
      GM_addStyle(s);
    },
    queue:[],

    message:function(string){
      //console.debug("message");
      Dialog.queue.push(string);
      Dialog.messageAux();
    },

    messageAux:function(){
      //console.debug("message aux");
      if(Dialog.queue.length <= 0){
        return;
      }
      var message = $("__p2s_message__");
      message.innerHTML = "";
      message.textContent = Dialog.queue[0];
      var black = $("__p2s_black__");
      if(!black){
        black = Dialog.init();
      }
      black.style.display = "block";
      Dialog.resize();
      Dialog.disappear(black, 0);
    },

    prompt:function(title, nvs, data, permanent, func){
      //console.debug("prompt");

      var black = $("__p2s_black__");
      if(!black){
        black = Dialog.init();
      }
      var message = $("__p2s_message__");
      var h2 = $h2({textContent:title});
      var table  = $table();
      for(name in nvs){
        if(nvs.hasOwnProperty(name)){
          var tr = $tr();
          var value = nvs[name];
          if(permanent){
            var tmp = decodeURIComponent(GM_getValue(name));
            if(tmp){
              if(tmp.match(/value\:(.*)/)){
                value = RegExp.$1;
              }
            }
          }
          // var input = $input({type:"text", id:"prompt:" + name, value:value});
          var input = null;
          if(typeof value == "boolean"){
            input = $input({type:"checkbox", id:"prompt:" + name, checked:value});
          } else {
            input = $input({type:"text", id:"prompt:" + name, value:value});
          }
          var th = $th({align:"right", textContent:name + ":"});
          with(th.style){
            padding = "2px";
            backgroundColor = "white";
            color = "black";
          }
          var td = $td();
          with(td.style){
            padding = "2px";
            backgroundColor = "white";
            color = "black";
          }
            $add(table,
                 $add(tr,
                      th,
                      $add(td, input)));
        }
      }

      var form = $form();
      var apply = $input({type:"submit",value:"ok"});
      var cancel = $input({type:"button",value:"cancel"});

        $event(form, "submit",
               function(event){
                 event.preventDefault();
                 var inputs = table.getElementsByTagName("input");
                 var length = inputs.length;
                 for(var i=0;i<length;i++){
                   var input = inputs[i];
                   if(input.id.match(/prompt\:(.*)/)){
                     var name = RegExp.$1;
                     var value = input.value;
                     if(input.type.match(/checkbox/i)){
                       value = input.checked;
                     }
                     data[name] = value;
                     if(permanent){
                       GM_setValue(name, encodeURIComponent("value:" + value));
                     }
                   }
                 }
                 Dialog.disappear(black, 120);
                 if(typeof func == "function"){
                   func();
                 }
                 return false;
               });
        $event(cancel, "click",
               function(event){
                 Dialog.disappear(black, 120);
               });
      message.innerHTML = "";
        $add(message, h2, $add(form,
                               table,
                               apply,
                               cancel));

      with(black.style){
        display = "block";
        opacity = "0.8";
      }
      Dialog.resize();
      setTimeout(function(){
        table.getElementsByTagName("input")[0].focus();
      },10);
    },

    disappear:function(element, degree, container){
      var radian = degree * Math.PI / 180;
      var sin = Math.floor(Math.sin(radian) * 100)/100;
      element.style.opacity = "" + sin;
      if(sin >= 0){
        setTimeout(function(){Dialog.disappear(element, degree + 20, container)}, 0);
      } else {
        element.style.display = "none";
        if(container){
            $rm(element);
          if(!container.firstChild){
            Progress.destroy();
          }
        }
        Dialog.queue.shift();
        Dialog.messageAux();
      }
    }
  };

  var Keybind = {
    add:function(phrase, func){
      document.addEventListener("keydown",
                                function(event){
                                  var target = event.target;
                                  var tagName = target.tagName;
                                  var type = target.type;
                                  if(phrase == Keybind.code(event) &&
                                     (phrase == "escape" ||
                                      !(tagName == "INPUT" &&
                                        (!type.type || type=="text")) &&
                                      tagName != "TEXTAREA")){
                                        func();
                                      }
                                },
                                true);
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
        27 : "escape",
        46 : "delete",

      };

      return (
              between(65,90)  ? String.fromCharCode(kc+32) : // a-z
              between(48,57)  ? String.fromCharCode(kc) :    // 0-9
              between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
              between(32,40)  ? _32_40[kc-32] :
              kt.hasOwnProperty(kc) ? kt[kc] :
              kc
              );
    }
  };


  var Loader = {
    scripts:[],
    load:function(scriptUrls, func){
      Loader.scriptCount = scriptUrls.length;
      Loader.func = func;
      scriptUrls.forEach(function(scriptUrl){
        Loader.loadAux(scriptUrl);
      });
    },
    loadAux:function(scriptUrl){
      var name = encodeURIComponent(scriptUrl);
      var encodedScript = GM_getValue(name);
      if(encodedScript){
        var decodedScript = decodeURIComponent(encodedScript);
        Loader.addScript(decodedScript);
      } else {
        GM_xmlhttpRequest({
          url:scriptUrl,
          method:"GET",
          onload:function(xhr){
            var script = xhr.responseText;
            GM_setValue(name, encodeURIComponent(script));
            Loader.addScript(script);
          }
        });
      }
    },
    addScript:function(script){
      Loader.scripts.push(script);
      if(Loader.scriptCount <= Loader.scripts.length && typeof Loader.func == "function"){
        Loader.func();
      }
    }
  };


  var Configurator = function(){
    this.initialize.apply(this, arguments);
  };

  Configurator.prototype = {
    data:{},
    initialize:function(title, nvs){
      this.data = {};
      var self = this;
      this.title = title;
      for(name in nvs){
        if(nvs.hasOwnProperty(name)){
          var enc_value = GM_getValue(name);
          if(enc_value){
            decodeURIComponent(enc_value).match(/value:(.*)/);
            self.data[name] = RegExp.$1;
          } else {
            Dialog.prompt(title + " config:", nvs, self.data, true);
            break;
          }
        }
      }
      GM_registerMenuCommand("set " + title + " config", self.mkset(nvs));
    },
    mkset:function(nvs){
      var self = this;
      var func = function(){
        Dialog.prompt(self.title + " config:", nvs, self.data, true);
      };
      return func;
    }
  };





  var complementDate = function(s){
    return (s < 10) ? '0' + s : s;
  };

  Date.prototype.getW3CDTF = function(){
    var Y = this.getFullYear();
    var m = complementDate(this.getUTCMonth() + 1);
    var d = complementDate(this.getUTCDate());
    var H = complementDate(this.getUTCHours());
    var i = complementDate(this.getUTCMinutes());
    var s = complementDate(this.getUTCSeconds());

    return Y + "-" + m + "-" + d + "T" + H + ":" + i + ":" + s + "Z";
  };

  function init(){
    eval(Loader.scripts.join("\n"));

    var config = new Configurator("post2sbm",
                                  {shortcutKey:"S-b",
                                      "hatena username":"hatenauser",
                                      "hatena password":"hatenapassword",
                                      "twitter username":"twitteruser",
                                      "twitter password":"twitterpassword",
                                      "delicious username":"delicioususer",
                                      "delicious password":"delicioupassword"});

    var Twitter = function(username, password){
      var base = ["http://", username, ":", password, "@",
                  "twitter.com"].join("");
      this.updateURL = [base, "/statuses/update.json"].join("");

    };
    Twitter.prototype = {
      post : function(message){
        GM_xmlhttpRequest({
          url:this.updateURL,
          method:"POST",
          headers:{"Content-Type": "application/x-www-form-urlencoded"},
          data:["status",encodeURIComponent(message)].join("="),
          onload:function(response){
            var status = ["twitter: ",
                          response.status,
                          " - ",
                          response.statusText].join("");
            Progress.finish("twitter");

          }
        });
      }
    };

    var ATOM = function(username, password) {
      this.username = username;
      this.password = password;
    };
    ATOM.prototype = {
      post : function(postURI, permalink, comment) {
        permalink = permalink.replace(/#/, '%23');
        var requestBody =
          <entry xmlns="http://purl.org/atom/ns#">
          <title>dummy</title>
          <link rel="related" type="text/html" href={permalink} />
          <summary type="text/plain">{comment}</summary>
          </entry>;

        var args = {
          method:"POST",
          url:postURI,
          headers : {
              "Content-Type": "application/atom+xml; charset=UTF-8",
              'Accept':'application/x.atom+xml, application/xml, text/xml, */*',
              'X-WSSE' : wsseHeader(this.username, this.password)
          },
          data:requestBody.toString(),
          onload  : function(response) {
            var status = "hatena: " + [response.status, response.statusText].join(' - ');
            // Dialog.message(status);
            Progress.finish("hatena");
          }
        };
        GM_xmlhttpRequest(args);
      }
    };


    var REST = function() {};
    REST.prototype = {
      makeURI : function(baseURI, queries) {
        var query = [];
        for(q in queries){
          if(queries.hasOwnProperty(q)){
            query.push(q + "=" + encodeURIComponent(queries[q]));
          }
        }
        var uri = baseURI + "?" + query.join("&");
        return uri;
      },


      post : function(method, baseURI, queries) {
        GM_xmlhttpRequest({
          method : method,
          url    : this.makeURI(baseURI, queries),
          onload : function(response) {
            var status = "del.icio.us: " +
              [response.status, response.statusText].join(' - ');
            Progress.finish("del.icio.us");
          }
        });
      }

    };

    var atom = new ATOM(config.data["hatena username"],
                        config.data["hatena password"]);
    var rest = new REST();

    var twitter = new Twitter(config.data["twitter username"],
                              config.data["twitter password"]);

    Keybind.add(config.data.shortcutKey, function() {
      var url = document.location.href;
      var title = document.title;
      if(!title){
        title = url;
      }
      var data = {};
      var func = function(){
        var tags = data.tags;
        var comment = data.comment;
        var share = data.share ? "yes" : "no";
          // hatena::bookmark
        if (config.data["hatena username"]){
          var hatena_tags = tags ? "[" + tags.split(" ").join("][") + "]" : "";
          var hatena_comment = hatena_tags + comment;
          atom.post("http://b.hatena.ne.jp/atom/post", url,
                    hatena_comment);
          Progress.start("hatena");

        }

          // del.icio.us
        if (config.data["delicious username"]) {
          var queries = {
            url         : url,
            description : title,
            tags        : tags,
            extended    : comment.replace(/^\s+|\s+$/, ""),
            shared      : share,
            dt          : (function() {
              var date = new Date();
              return date.getW3CDTF();
            })()
          };
          rest.post("get",
                    ["https://",
                     config.data["delicious username"],
                     ":",
                     config.data["delicious password"],
                     "@api.del.icio.us/v1/posts/add"].join(""),
                    queries);
          Progress.start("del.icio.us");
        }
          // twitter
        if (config.data["twitter username"]) {
          var message = ["bookmarked:", title, url,
                         "tag:", tags, comment].join("\n");
          twitter.post(message);
          Progress.start("twitter");
        }
      };
      // TODO:add share checkbox(for del.icio.us)
      Dialog.prompt("Add Bookmark:",
                    {tags:"", comment:"", share:true},
                    data, false, func);

    });
  }

  if(parent.document == document){
    //Dialog.init();
    Loader.load([WSSE_URL], function(){init();});

  }
})();