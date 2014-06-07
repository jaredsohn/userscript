// ==UserScript==
// @name           bookmark_with_gears_cache
// @namespace      gomaxfire.dnsdojo.com
// @include        *
// ==/UserScript==

(function(){
  with(DEF()){
    var PANEL_ID = "____GEARS_BOOKMARK____";
    var NOTIFY_ID = "____GEARS_BOOKMARK_NOTIFIER____";
    var URL = location.href;
    var TITLE = document.title;
    var intervalId = null;
    if(!TITLE || TITLE.replace(/\s/g, "").length == 0){
      TITLE = URL;
    }

    var Bookmark = (function(){
      var panel = null;
      var container = null;
      var addRemoveButton = null;
      var bookmarks = null;
      var syncTime = null;
      loadBookmarks();

      var keybind = new Keybind().disable()
        .add("S-a", function(){add();})
        .add("S-r", function(){remove();});

      notify();

      return {toggle:toggle};

      function notify(){
        if((URL in bookmarks) && !$(NOTIFY_ID)){
            $add(document.body,
                 $add($div({id:NOTIFY_ID},
                           {
                             position:"fixed",
                             right:"0",
                             top:"0",
                             backgroundColor:"#000",
                             fontFamily : "courier new",
                             padding:"5px",
                             margin:"5px",
                             letterSpacing:"0.03em",
                             lineHeight:"1.2em",
                             color:"gold",
                             textAlign:"left",
                             zIndex:"9999999",
                             opacity:"0.90"
                           }),
                      $button("x", function(){$rm(NOTIFY_ID)},{},
                              {color:"white", backgroundColor:"red", fontWeight:"bold"}),
                      $button("free", remove, {}, {fontWeight:"bold"}),
                      "cached"));
        }
      }

      function loadBookmarks(){
        bookmarks = eval("(" + GM_getValue("bookmarks", "{}") + ")");
        syncTime = parseInt(GM_getValue("syncTime", new Date().getTime().toString()))
      }
      function saveBookmarks(){
        GM_setValue("bookmarks", uneval(bookmarks));
        GM_setValue("syncTime", new Date().getTime().toString());
      }
      function syncBookmarks(){
        var result =false;
        var newSyncTime = parseInt(GM_getValue("syncTime", new Date().getTime().toString()));
        if(syncTime < newSyncTime){
          loadBookmarks();
            (typeof func == "function") ? func():0;
          result = true;
        }
        return result;
      }

      function toggle(){
          $(PANEL_ID) ? close():open();
      }

      function makeContainer(){
        if(!container)
          return;
        container.innerHTML = "";
        for(url in bookmarks)
          append(bookmarks[url], url);

        function append(title, url){
          if(!title || title.replace(/\s/g, "").length == 0){
            title = url;
          }
          var exact = (url == URL);
          var color = exact ? "gold" :"white";
            $add(container,
                 $add($div({id:url},
                           {
                             padding:"1px",
                             margin:"1px"
                           }),
                      $a({href:url, textContent:title},
                         {
                           color:color,
                           fontFamily : "courier new",
                           fontSize: "80%",
                           letterSpacing:"0.03em",
                           lineHeight:"1.2em",
                           textDecoration:"underline"
                         })));
        }
      }

      function open(){
        if(!panel){
          keybind.enable();
          panel = $div({id:PANEL_ID},
                       {
                         position:"fixed",
                         right:"0",
                         bottom:"0",
                         backgroundColor:"#000",
                         fontFamily : "courier new",
                         padding:"5px",
                         margin:"0px",
                         letterSpacing:"0.03em",
                         lineHeight:"1.2em",
                         color:"white",
                         textAlign:"left",
                         zIndex:"9999999",
                         opacity:"0.90",
                         height:"150px",
                         overflow:"auto"
                       });
          container = $div({},
                           {
                             padding:"5px",
                             margin:"0px",
                             letterSpacing:"0.03em",
                             lineHeight:"1.2em",
                             color:"white",
                             textAlign:"left"
                           });



          var closeButton = $button("x", close, {},
                                    {color:"white", backgroundColor:"red", fontWeight:"bold"});
          var exact = URL in bookmarks;
          var text = exact ? "free" : "cache";
          var callback = function(){(URL in bookmarks)?remove():add()};
          addRemoveButton = $button( text, callback, {}, {fontWeight:"bold"});
          $add(panel, closeButton, addRemoveButton, container)
        }
        syncBookmarks();
        makeContainer();
        keybind.enable();
          $add(document.body, panel);
        intervalId = setInterval(function(){
          syncBookmarks() && makeContainer();
        },500);

      }

      function close(){
        if(container){
          keybind.disable();
          document.body.removeChild(panel);
          if(intervalId !==null){
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }

      function add(){
        var progressBar = $div({textContent:"0%"},
                               {
                                 width:"1px",
                                 height:"15px",
                                 backgroundColor:"blue",
                                 fontFamily : "courier new",
                                 fontSize: "80%",
                                 letterSpacing:"0.03em",
                                 lineHeight:"1.2em",
                                 textAlign:"left",
                                 color:"black"
                               });
        $add(container, progressBar);
        cache({
          progress:function(percentage){
            var p = percentage + "%";
            progressBar.textContent = p;
            progressBar.style.width = p;
          },
          finish:function(){
            var p = "100%";
            progressBar.textContent = p;
            progressBar.width = p;
            setTimeout(function(){
              $rm(progressBar);
              addRemoveButton.value = "free";
              syncBookmarks();
              bookmarks[URL] = TITLE;
              saveBookmarks();
              makeContainer();
              notify();
            },1000);
          }
        });
      }

      function remove(){
        if(!free())
          return;
        bookmarks = eval("(" + GM_getValue("bookmarks", "{}") + ")");
        syncBookmarks();
        delete bookmarks[URL]
        saveBookmarks();
        makeContainer();
        addRemoveButton.value = "cache";
        $rm(NOTIFY_ID);
      }
    })();

    var toggle = function(){Bookmark.toggle();};
    GM_registerMenuCommand("gears bookmarks toggle", toggle);
    var globalKeybind = new Keybind();
    globalKeybind.add("S-g", toggle);


  }

  /****************************
  * GEARS CACHE functions     *
  ****************************/
  function cache(callbacks){
    var server = localServer();
    if(!server)
      return;
    var name=storeName();
    var resourceStore = server.createStore(name);
    var targets = [location.pathname];
    var HOST = location.host;

    extract_target(document.styleSheets, "href");
    extract_target(document.getElementsByTagName("img"), "src");
    extract_target(document.getElementsByTagName("script"), "src");
    extract_target(document.getElementsByTagName("embed"), "src");

    var all = targets.length;
    var progress = 0;
    resourceStore.capture(targets,function(url, success, captureId){
      progress++;
      var percent = Math.floor(100 * progress/all);
      if(progress < all){
          ("progress" in callbacks
           && typeof callbacks.progress == "function") ? callbacks.progress(percent) : 0;
      } else if(progress == all){
        ("finish" in callbacks
         && typeof callbacks.finish == "function") ? callbacks.finish() : 0;
      }
    });

    function extract_target(listy, attr){
      each(listy)
        (function(item){
          var url = item[attr];
          if(url){
            var host = HOST;
            var path = url;
            if(url.match(/https?:\/\/([^\/]+)(\/?.*)/)){
              host = RegExp.$1;
              path = RegExp.$2;
            }
            if(HOST == host && targets.indexOf(path) < 0){
              if(path.match(/\/$/) && targets.indexOf(path.replace(/\/$/, "")) < 0 || !path.match(/\/$/) && targets.indexOf(path +"/") < 0){
                targets.push(path);
              }
            }
          }
        });
    }
  }

  function free(){
    try{
      var server = localServer();
      if(!server)
        return;
      var name=storeName();
      server.removeStore(name);
      $rm(NOTIFY_ID);
      return true;
    }catch(e){
    }
  }

  function localServer(){
    if (typeof GearsFactory == 'undefined'){
      return;
    }
    var gearsFactory = new GearsFactory();
    var localServer = gearsFactory.create("beta.localserver", "1.0");
    return localServer;
  }

  function storeName(){
    var STORE_NAME_PREFIX = "gomaxfire_dnsdojo_com_gears_cache";
    return STORE_NAME_PREFIX + location.href.replace(/\W/g, "_");
  }

  /****************************
   * UTILITY FUNCTIONS *
   ****************************/
  function each(listy){
    return function(func){
      Array.prototype.forEach.call(listy, func);
    }
  }

  function $(id){
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

  function $button(text, callback, attrs, styles){
    var at = {type:"button", value:text};
    var st = {
      margin :"2px",
      padding : "0",
      borderTop : "1px solid #EEE",
      borderLeft : "1px solid #EEE",
      borderBottom : "1px solid #333",
      borderRight : "1px solid #333",
      backgroundColor : "#CCC",
      color:"black",
      fontFamily : "courier new",
      fontSize:"80%",
      letterSpacing:"0.03em"
    };
    if(typeof attrs == "object"){
      for(a in attrs)
        at[a] = attrs[a];
    }
    if(typeof styles == "object"){
      for(a in styles)
        st[a] = styles[a];
    }
    var button = $tag("input", at, st);
    $event(button, "click", callback);
    return button;

  }

  function $text(text){
    return document.createTextNode(text);
  }

  function $rm(element){
    if(typeof element == "string")
      element = $(element);

    if(element && element.parentNode){
      element.parentNode.removeChild(element);
    }
  }

  function DEF(){
   /****************************
    * KEY BIND OBJECT          *
    ****************************/
    function Keybind (){
      this.init.apply(this, arguments);
    }

    Keybind.code = function(event){
      var code = [];
      if(event.shiftKey){
        code.push("S");
      } else if(event.ctrlKey){
        code.push("C");
      } else if(event.altKey){
        code.push("M");
      }
      code.push(kc2char(event.keyCode));
      return code.join("-");

      function kc2char(kc){
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
          46 : "delete"
        };

        return (between(65,90)  ? String.fromCharCode(kc+32) : // a-z
                between(48,57)  ? String.fromCharCode(kc) :    // 0-9
                between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
                between(32,40)  ? _32_40[kc-32] :
                kt.hasOwnProperty(kc) ? kt[kc] :
                kc);
      }
    };

    Keybind.prototype = {
      init:function(){
        this.callbacks = {};
        var self = this;
        this.listener = function(event){
          var target = event.target;
          var tagName = target.tagName;
          if(tagName == "INPUT" && target.type=="text"||    tagName == "TEXTAREA"){
            return;
          }
          var phrase = Keybind.code(event);
          var funcs = self.callbacks[phrase];
          if(!funcs)
            return;
          funcs.forEach(function(func){func();});
        };
        this.enable();
      },
      enable:function(){
        document.addEventListener("keydown",this.listener, true);
        return this;
      },
      disable:function(){
        document.removeEventListener("keydown",this.listener, true);
        return this;
      },

      add:function(phrase, func){
        var funcs = this.callbacks[phrase];
        if(!funcs){
          funcs = this.callbacks[phrase] = [];
        }
        funcs.push(func);
        return this;
      }
    };

    /********************************************
     * tag element creation function definition *
     ********************************************/
    function DEF_TAGS(){
      var funcs = {};
        "h1 h2 h3 h4 h5 h6 div p span a img table tr th td form input textarea"
        .split(" ").forEach(function(tagName){
          var func = function(attrs, styles){
            return $tag(tagName, attrs, styles);
          };
          funcs["$" + tagName] = func;
        });
      return funcs;
    }

    var funcs = DEF_TAGS();
    funcs.Keybind = Keybind;
    return funcs;
  }
})();