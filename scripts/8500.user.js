// ==UserScript==
// @name         twitter
// @namespace    http://gomaxfire.dnsdojo.com/
// @description  a twitter client
// @include      *
// @version      0.0214
// ==/UserScript==

(function(){

  function $(id){
    return document.getElementById(id);
  }

  function mktag(tagName, option){
    var tag = document.createElement(tagName);
    if(option){
      for(a in option){
        if(option.hasOwnProperty(a)){
          tag[a] = option[a];
        }
      }
    }
    return tag;
  }


  // debug
  function debug(s){
    if(unsafeWindow.hasOwnProperty("console") && unsafeWindow.console.debug){
      unsafeWindow.console.debug(s);
    }
  }

  function debugByJSON(object){
    if(unsafeWindow.hasOwnProperty("console") && unsafeWindow.console.debug){
      unsafeWindow.console.debug(objectToJSON(object));
    }
  }


  var jsEncode =function(str){
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
        rtn = ["\"", jsEncode(object), "\""].join("");
        break;
      case Array:
        var buf = [];
        for(var i=0;i<object.length;i++){
          buf.push(callee(object[i]));
        }
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

  var XHR  = {
    count:0,
    mkParamData:function(params){
      var array = [];
      for(a in params){
        if(params.hasOwnProperty(a)){
          array.push([encodeURIComponent(a),
                      "=",
                      encodeURIComponent(params[a])].join(""));
          //array.push([a,"=",params[a]].join(""));
        }
      }
      return array.join("&");
    },
    post:function(url, params, func){
      XHR.count++;
      debug("try post:"+XHR.count);
      debug("URL:" + url);
      var data = XHR.mkParamData(params);
      debug("data:" + data);
      GM_xmlhttpRequest({url:url, 
            method:"POST",
            headers:{
            "Content-Type": "application/x-www-form-urlencoded",
              "X-Twitter-Client":"twitter.user.js",
              "X-Twitter-Client-Version":"0.0212",
              "X-Twitter-Client-URL":"http://d.hatena.ne.jp/gotin/20070413/1176397931"},
            data:data,
            onload:function(xhr){
            XHR.count--;
            debug("posted:"+XHR.count);
            func(xhr)},
            onerror:function(xhr){
            debug("error:"+url);
            typeof errorFunc == "function" ? errorFunc(xhr) : null;
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

  function parseJSON(json){
    var obj = {};
    if(json){
      obj = eval(["(", json, ")"].join(""));
    }
    return obj;
  }


  var Dialog = {
    init:function(){
      var div = mktag("div", {id:"__tw_black__"});
      var message = mktag("div", {id:"__tw_message__"});
      div.appendChild(message);
      document.body.appendChild(div);
      window.addEventListener("resize", Dialog.resize, true);
      Dialog.resize();
      Dialog.makeStyle();
    },
    
    resize:function(e){
      var div = $("__tw_black__");
      var message = $("__tw_message__");
      div.innerWidth = window.innerWidth;
      div.innerHeight = window.innerHeight;
      with(message.style){
        left = (window.innerWidth - message.clientWidth)/2 + "px";
        top = (window.innerHeight - message.clientHeight)/2 + "px";
      }

    },
    
    makeStyle:function(){
      var s= [];
      s.push("#__tw_black__ {");
      s.push(" background-color:black;");
      s.push(" position:fixed;");
      s.push(" top:0;");
      s.push(" left:0;");
      s.push(" width:100%;");
      s.push(" height:100%;");
      s.push(" padding:10px;");
      s.push(" margin:0;");
      s.push(" z-index:999998;");
      s.push(" display:none;");
      s.push("}");
      s.push("#__tw_message__ {");
      s.push(" font-family:courier new;");
      s.push(" position:fixed;");
      s.push(" background-color:lightyellow;");
      s.push(" border: 5px solid yellow;");
      s.push(" padding:10px;");
      s.push(" margin:0;");
      s.push(" display:block;");
      s.push(" font-size:small;");
      s.push(" vertical-align:middle;");
      s.push("}");
      s.push("#__tw_message__ h2 {");
      s.push(" text-align:left;");
      s.push(" font-size:large;");
      s.push("}");
      s.push("#__tw_message_table__ {");
      s.push(" margin:0;");
      s.push(" padding:0;");
      s.push("}");

      GM_addStyle(s.join("\n"));
    },
    queue:[],
    
    message:function(string, wait){
	  wait = wait ? wait : 0;
	  Dialog.queue.push(string);
	  Dialog.messageAux(wait);
    },
    
    confirm:function(string, title){
      var message = $("__tw_message__");
      message.innerHTML = "";
      if(typeof title == "string"){
        message.appendChild(mktag("h2", {textContent:title}));
      }
      var div = mktag("div");
      div.innerHTML = string;
      with(div.style){
        height = "300px";
        overflow = "scroll";
        //verticalAlign = "middle";
      }
      message.appendChild(div);
      var black = $("__tw_black__");
      black.style.display = "block";
      okButton = mktag("input", {type:"button", value:"ok"});
      okButton.style.display = "block";
      okButton.addEventListener("click",
                                function(event){
                                  Dialog.disapper(black, 90);
                                },
                                true);
      message.appendChild(okButton);
      okButton.focus();
      setTimeout(function(){Dialog.resize(null);},1);
      setTimeout(function(){Dialog.resize(null);},1000);
    },
    
	
    messageAux:function(wait){
	  if(Dialog.queue.length <= 0){
        return;
	  }
	  var message = $("__tw_message__");
	  //message.innerHTML = "";
      message.innerHTML = Dialog.queue[0];
	  var black = $("__tw_black__");
	  black.style.display = "block";
      Dialog.resize();
      setTimeout(function(){Dialog.disapper(black, 90)}, wait);
    },
    
    prompt:function(title, nvs, data, permanent, func){
	  var black = $("__tw_black__");
      var message = $("__tw_message__");
      var h2 = mktag("h2", {textContent:title});
      var table  = mktag("table");;
      for(name in nvs){
        if(nvs.hasOwnProperty(name)){
          var tr = mktag("tr");
          var value = nvs[name];
          if(permanent){
            var tmp = decodeURIComponent(GM_getValue(name));
            if(tmp){
              if(tmp.match(/value\:(.*)/)){
                value = RegExp.$1;
              }
            }
          }
          var input = null;
          if(value.indexOf("\n") >= 0){
            input = mktag("textarea", 
                          {id:"prompt:" + name, 
                           value:value,
                           cols:50,
                           rows:4
                          });
          } else {
            input = mktag("input", {type:"text", id:"prompt:" + name, value:value});
          }
          var th = mktag("th", {align:"right", textContent:name + ":"});
          var td = mktag("td");
          td.appendChild(input);
          tr.appendChild(th);
          tr.appendChild(td);
          table.appendChild(tr);
        }
      }
      
      var apply = mktag("input",{type:"button",value:"ok"});
      var cancel = mktag("input",{type:"button",value:"cancel"});
      
      apply.addEventListener("click",
                             function(event){
                               var ins = [];
                               var inputs = table.getElementsByTagName("input");
                               var inputs_length = inputs.length;
                               for(var i=0;i<inputs_length;i++){
                                 ins.push(inputs[i]);
                               }
                               var tas = table.getElementsByTagName("textarea");
                               var tas_length = tas.length;
                               for(var i=0;i<tas_length;i++){
                                 ins.push(tas[i]);
                               }
                               ins.forEach(function(input){
                                   if(input.id.match(/prompt\:(.*)/)){
                                     var name = RegExp.$1;
                                     var value = input.value;
                                     data[name] = value;
                                     if(permanent){
                                       GM_setValue(name, encodeURIComponent("value:" + value));
                                     }
                                   }
                                 });
                               Dialog.disapper(black, 90);
                               if(typeof func == "function"){
                                 func();
                               }
                             },
                             true);
      cancel.addEventListener("click",
                              function(event){
                                Dialog.disapper(black, 90);
                              },
                              true);
      message.innerHTML = "";
      message.appendChild(h2);
      message.appendChild(table);
      message.appendChild(apply);
      message.appendChild(cancel);
      black.style.display = "block";
      black.style.opacity = "1.0";
      Dialog.resize();
      setTimeout(function(){
          var first = table.getElementsByTagName("input")[0];
          if(!first)first = table.getElementsByTagName("textarea")[0];
          if(first)first.focus();
        },1);
    },
    
    disapper:function(element, degree){
	  //if(element.style.display != "block")element.style.display = "block";
      var radian = degree * Math.PI / 180;
      var sin = Math.floor(Math.sin(radian) * 100)/100;
      element.style.opacity = "" + sin;
      if(sin >= 0){
        setTimeout(function(){Dialog.disapper(element, degree + 5)}, 1);
      } else {
        element.style.opacity = "1.0";
        element.style.display = "none";
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
                                     !(tagName == "INPUT" &&
                                       (!type.type || type=="text")) &&
                                     tagName != "TEXTAREA"){
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
        27 : "esc",
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

  var Twitter = {
    init:function(auth, format){
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
    },
    
    update:function(doing, func){
      XHR.post(Twitter.updateURL, {"status":doing}, 
               function(xhr){debug(xhr.responseText); func(xhr);},
               function(xhr){debug(xhr.statusText);});
    },
    
    friends:function(func){
      XHR.post(Twitter.friendsURL, {}, 
               function(xhr){debug(xhr.responseText);func(xhr);},
               function(xhr){debug(xhr.statusText);});
    },
    
    timeline:function(func){
      XHR.post(Twitter.timelineURL, {}, 
               function(xhr){debug(xhr.responseText);func(xhr);},
               function(xhr){debug(xhr.statusText);});
    }


  };
  
  function twit(){
    var data = {};
    Dialog.prompt("what are you doing?", 
                  {"doing":["reading" ,
                            document.title,
                            document.location.href].join(" \n")}, 
                  data, 
                  false, 
                  function(){
                    Twitter.update(data.doing, 
                                   function(xhr){Dialog.message("twittered!");});
                  });
  }



  function viewTimeline(xhr){
    var info = parseJSON(xhr.responseText);
    buffer = ["<table id=\"__tw_message_table__\">"];
    info.forEach(function(line){
	    buffer.push("<tr>");
	    var imgTag = ["<img src=\"",
                      line.user.profile_image_url,
                      "\" width=\"24\" height=\"24\"/>"].join("");
	    buffer.push(mkTdString([imgTag, 
                                "<br />", 
                                line.user.screen_name].join("")));
        var date = new Date(line.created_at);
        buffer.push(mkTdString([date.getMonth(), 
                                "/",
                                date.getDate(),
                                " ",
                                date.getHours(), 
                                ":", 
                                date.getMinutes()].join("")));
        var text = line.text
          .replace(/\&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/\s?(https?:\/\/\S+)/g,"<a href=\"$1\">$1</a>")
          .replace(/\n/g,"<br />\n");
        buffer.push(mkTdString(text,  "align=\"left\""));
	    buffer.push("</tr>");
      });
    buffer.push("</table>");
    Dialog.confirm(buffer.join(""), "friends timeline");
  }

  function viewFriends(xhr){
    var info = parseJSON(xhr.responseText);
    buffer = ["<table id=\"__tw_message_table__\">"];
    info.sort(function(left, right){
        var leftTime = 0;
        var righTime = 0;
        if(typeof left.status == "object" && left.status.created_at){
          leftTime = new Date(left.status.created_at).getTime();
        }
        if(typeof right.status == "object" && right.status.created_at){
          rightTime = new Date(right.status.created_at).getTime();
        }
        return rightTime - leftTime;
      });
    info.forEach(function(friend){
	    buffer.push("<tr>");
	    var imgTag = ["<img src=\"",
                      friend.profile_image_url,
                      "\" width=\"24\" height=\"24\"/>"].join("");
	    buffer.push(mkTdString([imgTag, 
                                "<br />", 
                                friend.screen_name].join("")));
	    if(typeof friend.status == "object"){
          var date = new Date(friend.status.created_at);
          buffer.push(mkTdString([date.getMonth(), "/",date.getDate()," ",
                                  date.getHours(), ":", date.getMinutes()].join("")));
          var text = friend.status.text;
          text = text.replace(/\n/g, "<br />\n");
          text = text.replace(/(https?:\/\/\S+)/g, "<a href=\"$1\">$1</a>");
          buffer.push(mkTdString(text,  "align=\"left\""));
        } else {
          buffer.push(mkTdString(""));
          buffer.push(mkTdString(""));
        }
	    buffer.push("</tr>");
      });
    buffer.push("</table>");
    Dialog.confirm(buffer.join(""), "friends status");
  }
  
  function mkTdString(content, option){
    var buffer = ["<td"];
    if(option){
	  buffer.push(" ");
	  buffer.push(option);
    }
    buffer.push(">");
    buffer.push(content);
    buffer.push("</td>");
    return buffer.join("");
  }

  function friends(){
    Dialog.confirm("<table height=\"100%\"><tr><td height=\"100%\" align=\"center\" valign=\"middle\">accessing friends statuses...</td></tr></table>");
    Twitter.friends(viewFriends);
  }

  function timeline(){
    Dialog.confirm("<table height=\"100%\"><tr><td height=\"100%\" align=\"center\" valign=\"middle\">accessing timeline...</td></tr></table>");
    Twitter.timeline(viewTimeline);
  }
  

  
  var config = null;
      
  function init(){
    Dialog.init();
    config = new Configurator("twitter",
                              {"update shortcut":"S-t",
                               "friends shortcut":"S-f",
                               "timeline shortcut":"S-l",
                               "username":"user",
                               "password":"pass"});
    Twitter.init(config.data, "json");
    Keybind.add(config.data["update shortcut"], twit);
    Keybind.add(config.data["friends shortcut"], friends);
    Keybind.add(config.data["timeline shortcut"], timeline);
  }

  if(parent.document == document){
    init();
  }

})();
