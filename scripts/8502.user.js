// ==UserScript==
// @name         lingr
// @namespace    http://gomaxfire.dnsdojo.com/
// @description  a lingr client
// @include      *
// @version      0.0202
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

// Date/W3CDTF.js -- W3C Date and Time Formats
Date.W3CDTF = function ( dtf ) {
    var dd = new Date();
    dd.setW3CDTF = Date.W3CDTF.prototype.setW3CDTF;
    dd.getW3CDTF = Date.W3CDTF.prototype.getW3CDTF;
    if ( dtf ) this.setW3CDTF( dtf );
    return dd;
};

Date.W3CDTF.VERSION = "0.04";

Date.W3CDTF.prototype.setW3CDTF = function( dtf ) {
    var sp = dtf.split( /[^0-9]/ );

    // invalid format
    if ( sp.length < 6 || sp.length > 8 ) return;

    // invalid time zone
    if ( sp.length == 7 ) {
        if ( dtf.charAt( dtf.length-1 ) != "Z" ) return;
    }

    // to numeric
    for( var i=0; i<sp.length; i++ ) sp[i] = sp[i]-0;

    // invalid range
    if ( sp[0] < 1970 ||                // year
         sp[1] < 1 || sp[1] > 12 ||     // month
         sp[2] < 1 || sp[2] > 31 ||     // day
         sp[3] < 0 || sp[3] > 23 ||     // hour
         sp[4] < 0 || sp[4] > 59 ||     // min
         sp[5] < 0 || sp[5] > 60 ) {    // sec
        return;                         // invalid date 
    }

    // get UTC milli-second
    var msec = Date.UTC( sp[0], sp[1]-1, sp[2], sp[3], sp[4], sp[5] );

    // time zene offset
    if ( sp.length == 8 ) {
        if ( dtf.indexOf("+") < 0 ) sp[6] *= -1;
        if ( sp[6] < -12 || sp[6] > 13 ) return;    // time zone offset hour
        if ( sp[7] < 0 || sp[7] > 59 ) return;      // time zone offset min
        msec -= (sp[6]*60+sp[7]) * 60000;
    }

    // set by milli-second;
    return this.setTime( msec );
};

Date.W3CDTF.prototype.getW3CDTF = function() {
    var year = this.getFullYear();
    var mon  = this.getMonth()+1;
    var day  = this.getDate();
    var hour = this.getHours();
    var min  = this.getMinutes();
    var sec  = this.getSeconds();

    // time zone
    var tzos = this.getTimezoneOffset();
    var tzpm = ( tzos > 0 ) ? "-" : "+";
    if ( tzos < 0 ) tzos *= -1;
    var tzhour = tzos / 60;
    var tzmin  = tzos % 60;

    // sprintf( "%02d", ... )
    if ( mon  < 10 ) mon  = "0"+mon;
    if ( day  < 10 ) day  = "0"+day;
    if ( hour < 10 ) hour = "0"+hour;
    if ( min  < 10 ) min  = "0"+min;
    if ( sec  < 10 ) sec  = "0"+sec;
    if ( tzhour < 10 ) tzhour = "0"+tzhour;
    if ( tzmin  < 10 ) tzmin  = "0"+tzmin;
    var dtf = year+"-"+mon+"-"+day+"T"+hour+":"+min+":"+sec+tzpm+tzhour+":"+tzmin;
    return dtf;
};


  var XHR  = {
    count:0,
    post:function(url, params, func){
      XHR.count++;
      debug("try post:"+XHR.count);
      var array = [];
      for(a in params){
        if(params.hasOwnProperty(a)){
          array.push([encodeURIComponent(a),
                      "=",
                      encodeURIComponent(params[a])].join(""));
        }
      }
      var data = array.join("&");
      GM_xmlhttpRequest({url:url, 
            method:"POST",
            headers:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            data:data,
            onload:function(xhr){
            XHR.count--;
            debug("posted:"+XHR.count);
            func(xhr)},
            onerror:function(xhr){debug("error:"+url);debugByJSON(xhr);}});
    },
    //get:function(url, params, func, headers, errorfunc){
    get:function(url, params, func, errorfunc){
      XHR.count++;
      debug("try get:"+XHR.count);
      var array = [];
      for(a in params){
        if(params.hasOwnProperty(a)){
          array.push([encodeURIComponent(a),
                      "=",
                      encodeURIComponent(params[a])].join(""));
        }
      }
      var data = array.join("&");
      //if(typeof headers != "object"){
      //headers = {};
      //}
      GM_xmlhttpRequest({
          url:[url,data].join("?"), 
          method:"GET",
            //headers:headers,
          onload:function(xhr){
            XHR.count--;
            debug("got:"+XHR.count);
            typeof func == "function" ? func(xhr) : null;
          },
          onerror:function(xhr){
            debug("error:"+url);
            debugByJSON(xhr);
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

  var Lingr = function(apiKey, format){
    this.createCounter = Lingr.MAX_SESSION_TRY;
    this.baseURL = "http://www.lingr.com/api";
    this.apiKey = apiKey;
    this.format = format ? format : "";
  };
  
  Lingr.MAX_SESSION_TRY = 5;

  Lingr.prototype = {
    session_create:function(func){
      var self = this;
      var params = {"api_key":this.apiKey, 
                    "client_type":"human",
                    format:this.format};
      debug("try session_create....");
      XHR.post(this.baseURL + "/session/create",
               params,
               function(xhr){
                 debug("session_create:" + xhr.responseText);
                 var response = parseJSON(xhr.responseText);
                 if(response.status == "ok"){
                   self.session = response.session;
                   self.createCounter = Lingr.MAX_SESSION_TRY;

                   if(typeof func == "function") func(response);
                 } else if(self.createCounter > 0){
                   self.createCounter--;
                   debug(self.createCounter);
                   self.session_create(func);
                 }
               });
    },
    
    explore_getHotRooms : function(func){
      var params = {"api_key":this.apiKey, 
                    count:100,
                    format:this.format};
      debug("try explore_getHotRooms....");
      XHR.get(this.baseURL + "/explore/get_hot_rooms/",
              params,
              function(xhr){
                debug("explore_getHotRooms:" + xhr.responseText);
                 var response = parseJSON(xhr.responseText);
                 if(response.status == "ok"){
                   if(typeof func == "function") func(response);
                 }
               });
    },

    explore_getNewRooms : function(func){
      var params = {"api_key":this.apiKey, 
                    count:100,
                    format:this.format};
      debug("try explore_getNewRooms....");
      XHR.get(this.baseURL + "/explore/get_new_rooms/",
              params,
              function(xhr){
                debug("explore_getHotRooms:" + xhr.responseText);
                 var response = parseJSON(xhr.responseText);
                 if(response.status == "ok"){
                   if(typeof func == "function") func(response);
                 }
               });
    },
    
    auth_login :function(email, password, func){
      var self = this;
      if(!this.session || !email || !password)return;
      self.email = email;
      self.password = password;
      var params = {"session":this.session,
                    "email":email,
                    "password":password,
                    format:this.format};
      debug("try auth_login....");
      XHR.post(this.baseURL + "/auth/login",
               params,
               function(xhr){
                 debug("auth_login:" + xhr.responseText);
                 //var response = eval(["(", xhr.responseText, ")"].join(""));
                 var response = parseJSON(xhr.responseText);
                 if(response.status == "ok") {
                   self.login = true;
                   debug(func);
                   if(typeof func == "function") func(response);
                 } else if(response.error.code == 102){
                   
                   self.session_create(function(response){
                       self.auth_login(email, password, func);
                     });
                 }
               });
    },

    user_getInfo :function(func){
      var self = this;
      if(!this.session || !this.login)return;
      var params = {"session":this.session,
                    format:this.format};
      debug("try user_getInfo....");
      XHR.get(this.baseURL + "/user/get_info",
              params,
              function(xhr){
                debug("user_getInfo:" + xhr.responseText);
                //var response = eval(["(", xhr.responseText, ")"].join(""));
                var response = parseJSON(xhr.responseText);
                if(response.status != "ok") return;
                if(typeof func == "function") func(response);
              });
    },

    room_enter : function(roomId, nickname, func){
      //debug(this.session);
      var self = this;
      if(this.ticket){
        this.room_exit(function(){
            self.room_enter(roomId, nickname, func);
          });
        return;
      }
      if(!this.session || !roomId || !nickname)return;
      this.nickname = nickname;
      var params = {"session":this.session,
                    nickname:this.nickname, 
                    id:roomId,
                    format:this.format};
      debug("try room_enter....");
      XHR.post(this.baseURL + "/room/enter",
               params,
               function(xhr){
                 debug("room_enter:" + xhr.responseText);
                 //var response = eval(["(", xhr.responseText, ")"].join(""));
                 var response = parseJSON(xhr.responseText);
                 if(response.status == "ok") {
                   self.ticket = response.ticket;
                   self.room = response.room;
                   //               self.counter = response.room.counter;
                   self.counter = 1;
                   if(typeof func == "function") func(response);
                 } else if(response.error.code == 102) {
                   var relogin = null;
                   if(self.login){
                     relogin = function(response){
                       self.auth_login(self.email, self.password);
                     }
                   };
                   self.session_create(relogin);
                 }
               });
    },
    room_say:function(message, func){
      if(!this.session || !this.ticket)return;
      var self = this;
      var params = {session:this.session, 
                    ticket:this.ticket, 
                    message:message, 
                    format:this.format};
      debug("try room_say....");
      XHR.post(this.baseURL + "/room/say",
               params,
               function(xhr){
                 debug("room_say:" + xhr.responseText);
                 //var response = eval(["(", xhr.responseText, ")"].join(""));
                 var response = parseJSON(xhr.responseText);
                 if(typeof func == "function") func(response);
               });
    },
    room_observe:function(func, errorFunc){
      if(!this.session || !this.ticket || !this.counter)return;
      var self = this;
      var params = {session:this.session, 
                    ticket:this.ticket,
                    format:this.format,
                    counter:this.counter};
      var headers = {Connection:"close"};
      debug("try room_observe....");
      //      XHR.get(this.baseURL + "/room/observe/",
      XHR.get("http://gotin.client" + 
              new Date().getTime() +
              Math.random() + 
              ".www.lingr.com/api/room/observe/",
              params,
              function(xhr){
                debug("room_observe:" + xhr.responseText);
                var response = eval(["(", xhr.responseText, ")"].join(""));
                if(response.status == "ok"){ 
                  if(response.hasOwnProperty("counter"))
                    self.counter = response.counter;
                  if(typeof func == "function" && 
                     self.ticket && 
                     self.session) func(response);
                }else{
                  self.counter = 1;
                }
              },
              errorFunc);
    },

    room_exit:function(func){
      if(!this.session || !this.ticket) return;
      var params = {session:this.session, 
                    ticket:this.ticket,
                    format:this.format};
      debug("try room_exit....");
      var self = this;
      XHR.post(this.baseURL + "/room/exit/",
              params,
              function(xhr){
                 debug("room_exit:" + xhr.responseText);
                 self.ticket = null;
                 if(typeof func == "function") func();
              });
      //this.ticket = null;
     
    },

    session_destroy:function(func){
      if(!this.session) return;
      var params = {session:this.session, 
                    format:this.format};
      debug("try session_destroy....");
      var self = this;
      XHR.post(this.baseURL + "/session/destroy/",
               params,
               function(xhr){
                 debug(xhr.status);
                 debug("session_destroy:" + xhr.responseText);
                 self.session = null;
                 var response = parseJSON(xhr.responseText);
                 debug(response.status);
                 if(typeof func == "function") func();
               });
     
    }

  };

  var GM__getValue = function(key){
    var value = GM_getValue(key);
    return value ? value : "";
  };

  var lingr = null;
  var Editor = {
    init:function(){
      var div = mktag("div", {id:"__lingr__"});
      var body = mktag("div", {id:"__body__"});
      var messages = mktag("div", {id:"__messages__"});
      var header = mktag("div", {id:"__header__"});
      var footer = mktag("div", {id:"__footer__"});
      var form = mktag("form");
      var input = mktag("input", {id:"__input__", /* size:100 */ });
      var submit = mktag("input", {type:"submit", value:"say"});
      var occupants = mktag("div", {id:"__occupants__"});
      div.appendChild(header);
      form.appendChild(input);
      form.appendChild(submit);
      footer.appendChild(form);
      div.appendChild(footer);
      body.appendChild(occupants);
      body.appendChild(messages);
      div.appendChild(body);
      //div.appendChild(occupants);
      //div.appendChild(messages);
      

      var sidebar = mktag("div", {id:"__sidebar__"});
      var authbox = mktag("div", {id:"__authbox__"});
      var authForm = mktag("form", {id:"__authform__"});
      var emailValue = GM_getValue("email");
      if(!emailValue) emailValue = "";
      var passwordValue = GM_getValue("password");
      if(!passwordValue) passwordValue = "";
      var email = mktag("input", {id:"__email__",size:20, value:emailValue});
      var password = mktag("input", {type:"password", id:"__password__",size:20, value:passwordValue});
      var checkValue = (emailValue && passwordValue);
      var checkLabel = mktag("label", {textContent:"keep auth info"});
      var checkbox = mktag("input", {id:"__keep__", type:"checkbox", checked:checkValue});
      var authSubmit =  mktag("input", {type:"submit", value:"login"});
      div.appendChild(sidebar);
      sidebar.appendChild(authbox);
      authbox.appendChild(authForm);
      authForm.appendChild(email);
      authForm.appendChild(password);
      authForm.appendChild(authSubmit);
      checkLabel.appendChild(checkbox);
      authForm.appendChild(checkLabel);
      
      var roomListSelect = mktag("select", {id:"__room_select__"});
      var roomTypes = ["hot","new"];
      roomTypes.forEach(function(roomType){
          var option = mktag("option", {id:"__option_" + roomType + "__", 
                                        value:roomType, textContent:roomType});
          roomListSelect.appendChild(option);
        });
      
      

      var roombox = mktag("div", {id:"__roombox__"});
      var roomlist = mktag("div", {id:"__roomlist__"});
      var enterButton = mktag("input", {type:"button", id:"__enter__", value:"enter"});
      roombox.appendChild(roomListSelect);

      roombox.appendChild(roomlist);
      roombox.appendChild(enterButton);
      sidebar.appendChild(roombox);

      document.body.appendChild(div);


      window.addEventListener("resize", Editor.resize, true);
      Editor.resize();
      Editor.makeStyle();
      input.addEventListener("keydown", 
              function(event){KeyProcessor.code(event) == "esc" ? Editor.hide() : null;}, true);
      form.addEventListener("submit", Editor.say, true);
      authForm.addEventListener("submit", Editor.login, true);
      enterButton.addEventListener("click", function(event){Editor.enter();}, true);
      roomListSelect
      .addEventListener("change", 
                        function(event){
                          Editor.viewRoomList(roomListSelect.value);
                        },
                        true);
    },

    setUser:function(response){
      if(!lingr)return;
      if(response.status != "ok") return;
      if($("__keep__").checked){
        GM_setValue("email", $("__email__").value);
        GM_setValue("password", $("__password__").value);
      } else {
        GM_setValue("email", "");
        GM_setValue("password", "");
      }
      lingr.user_getInfo(function(response){
          Editor.setUserAux(response);
        });
    },
    
    setUserAux:function(response){
      Editor.userInfo = response;
      Editor.nickname = response.default_nickname;
      var authbox = $("__authbox__");
      var authform = $("__authform__");
      authform.style.display = "none";
      var userinfo = mktag("div", {id:"__userinfo__"});
      var nickname = mktag("span", {textContent:Editor.nickname});
      var img = mktag("img", {src:response.icon_url});
      userinfo.appendChild(img);
      userinfo.appendChild(nickname);
      authbox.appendChild(userinfo);
      
      var roomTypes = ["favorite", "visited", "owned"];
      var roomListSelect = $("__room_select__");
      roomTypes.forEach(function(roomType){
          Editor.setRoomList(roomType, Editor.userInfo[roomType + "_rooms"]);
          var optionId = "__option_" + roomType + "__";
          if(!$(optionId)){
            var option = mktag("option", {id:optionId, 
                                          value:roomType, textContent:roomType});
            roomListSelect.appendChild(option);
          }

        });
      roomListSelect.value = "favorite";
      Editor.viewRoomList("favorite");
    },
    
    viewRoomList:function(type){
      var roomList = $(["__", type , "_", "room_list__" ].join(""));
      if(!roomList) return;
      if(Editor.currentRoomList){
         Editor.currentRoomList.style.display = "none";
      }
      Editor.currentRoomList = roomList;
      Editor.currentRoomList.style.display = "block";
    },
    
    setRoomList:function(type, rooms){
      if(!rooms) return;
      var roomListBox = $("__roomlist__");
      var roomListId = ["__", type , "_", "room_list__" ].join("")
      var roomList = $(roomListId);
      if(!roomList){
        roomList = mktag("div", {id:roomListId});
        roomList.style.display = "none";
        roomListBox.appendChild(roomList);
          
      }
      rooms.forEach(function(room){
          var roomId = room.id;
          var roomDiv = mktag("div", {id:"__room_" + roomId + "__"});
          var anchor = mktag("a");
          var icon = mktag("img", {src:room.icon_url, width:16, height:16});
          anchor.appendChild(icon);
          anchor.appendChild(document.createTextNode(room.name));
          anchor.addEventListener("click", 
                                  function(event){
                                    Editor.enter(roomId);
                                  }, 
                                  true);
          roomDiv.appendChild(anchor);
          roomList.appendChild(roomDiv);
        });
    },
    
    login:function(event){
      if(!lingr)return;
      event.preventDefault();
      lingr.auth_login($("__email__").value, $("__password__").value, Editor.setUser);
      return false;
    },

    say:function(event){
      if(!lingr)return;
      event.preventDefault();
      lingr.room_say($("__input__").value);
      $("__input__").value = ""
      return false;
    },

    enter : function(roomId){
      var nickname = prompt("input your nickname", Editor.nickname);
      if(!nickname) return;
      lingr.room_enter(roomId, nickname, Editor.setRoom);
    },

    setRoom : function(response){
      var header = $("__header__");
      header.textContent = [lingr.nickname, 
                            " in ",
                            response.room.name].join("");
      $("__lingr__").style.display = "block";
      $("__input__").focus();
      $("__messages__").innerHTML = "";
      $("__occupants__").innerHTML = "";
      lingr.room_observe(Editor.showMessages);
    },
    
    observErrorHandler : function(){
      if(!lingr.ticket)return;
      lingr.room_observe(Editor.showMessages, Editor.observErrorHandler);
    },

    showMessages : function(response){
      lingr.room_observe(Editor.showMessages, Editor.observErrorHandler);
      if(!response || response.status != "ok")return;
      var messageDiv = $("__messages__");
      var messages = response.messages;
      if(!messages)return;
      messages.forEach(function(message){
          var id = message.id;
          var iconURL = message.icon_url;
          var nickname = message.nickname;
          var myself = (nickname == lingr.nickname);
          var date = new Date.W3CDTF();
          date.setW3CDTF(message.timestamp);
          var time = date.toLocaleString();
          var text = message.text;
          var type = message.type;
          var cls = type == "user" ? "user" : "system";
          var user_div = mktag("div", 
                               {className: cls + "Type"});
          if(iconURL){
            var img = mktag("img", {src:iconURL});
            with(img.style){
              width="32px";
              height = "32px";
            }
            user_div.appendChild(img);
          }
          if(type == "user"){
            var name_span = mktag("span", {textContent:nickname});
            user_div.appendChild(name_span);
          }
          var time_span = mktag("span", {textContent:time,className:"__timestamp__"});
          user_div.appendChild(time_span);
          if(cls == "user" && myself) cls = "myself";
          if(text.match(/(http:\/\/\S*\.(jpg|jpeg|png|gif))/)){
            text = text.replace(/(http:\/\/\S*\.(jpg|jpeg|png|gif))/, 
                                "<img src=\"" + RegExp.$1 +"\" />");
          } else if(text.match(/(http:\/\/www\.youtube\.com\/watch\?v=(\S*))/)){
            var url = RegExp.$1;
            var vid = RegExp.$2;
            text = text.replace(/(http:\/\/www\.youtube\.com\/watch\?v=(\S*))/, 
                                "<object width=\"450\" height=\"370\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + vid + "\" /><param name=\"wmode\" value=\"transparent\" /><embed width=\"450\" height=\"370\" wmode=\"transparent\" type=\"application/x-shockwave-flash\" src=\"http://www.youtube.com/v/" + vid + "\" /></object><br /><a class=\"__lingr_a__\" href=\"" + url +"\" >" + url + "</a>");
          } else if(text.match(/(http:\/\/\S*)/)){
            var url = RegExp.$1;
            text = text.replace(/(http:\/\/\S*)/, 
                                "<a class=\"__lingr_a__\" href=\"" + url +"\" >" + url + "</a>");
          } 
          
          
          var text_span = mktag("span",
                                {innerHTML:text, 
                                 className:cls + "Text"});
          messageDiv.insertBefore(text_span, messageDiv.childNodes[0]);
          messageDiv.insertBefore(user_div, text_span);
          document.title = [nickname," : ", text].join("");
        });
      var anonymous = 0;
      var occupants = response.occupants;
      if(occupants){
        var occupantDiv = $("__occupants__");
        occupantDiv.innerHTML = "";
        var exists = false;
        if(occupants && occupants instanceof Array){
          occupants.forEach(function(occupant){
              var iconUrl = occupant.icon_url;
              if(iconUrl){
                exists = true;
                var div = mktag("div");
                var name = occupant.nickname;
                var img = mktag("img",{src:iconUrl, width:16, height:16});
                div.appendChild(img);
                div.appendChild(document.createTextNode(name));
                occupantDiv.appendChild(div);
              } else {
                anonymous++;
              }
            });
        }
        if(anonymous){
          var div = mktag("div", {textContent:[exists ? "and" : "",
                                               anonymous, 
                                               "anonymous observer" +
                                               (anonymous > 1 ? "s" : "")].join(" ")});
          occupantDiv.appendChild(div);
        }
      }
    },
    
    

    
    resize:function(e){
      var div = $("__lingr__");
      var messages = $("__messages__");
      var header = $("__header__");
      var footer = $("__footer__");
      var sidebar = $("__sidebar__");
      var body = $("__body__");
      var occupants = $("__occupants__");
      var roomlist = $("__roomlist__");
      var input = $("__input__");
      div.innerWidth = window.innerWidth - 200;
      div.innerHeight = window.innerHeight;
      body.style.width = (window.innerWidth - 35 - 200) + "px";
      messages.style.width = (window.innerWidth - 35 - 200 - 200) + "px";
      messages.style.height = (window.innerHeight - 70) + "px";
      input.style.width = (window.innerWidth - 35 -50 - 200) + "px";
      occupants.style.height = (window.innerHeight - 70) + "px";
      roomlist.style.height = (window.innerHeight - 100) + "px";
      header.style.width = (window.innerWidth - 35 - 200) +"px";
      footer.style.width = (window.innerWidth - 35 - 200) +"px";
      sidebar.style.height = (window.innerHeight - 5) + "px";
      sidebar.style.left = (window.innerWidth - 20 - 200) + "px";
    },

    makeStyle:function(){
      var s= [];
      s.push("#__lingr__ {");
      s.push(" background-color:black;");
      s.push(" position:fixed;");
      s.push(" top:0;");
      s.push(" left:0;");
      s.push(" width:100%;");
      s.push(" height:100%;");
      s.push(" padding:10px;");
      s.push(" margin:0;");
      //      s.push(" opacity:0.90;");
      s.push(" z-index:999998;");
      s.push(" display:none;");
      s.push("}");
      s.push("#__header__ {");
      s.push(" background-color:gray;");
      s.push(" color:white;");
      s.push(" text-align:left;");
      s.push(" height:20px;");
      s.push(" padding:0;");
      s.push(" margin:0;");
      s.push(" margin-top:2px;");
      s.push("}");
      s.push("#__messages__ {");
      //s.push(" display:inline;");
      s.push(" background-color:white;");
      s.push(" padding:0;");
      s.push(" margin:2px;");
      s.push(" overflow:scroll;");
      s.push(" text-align:left;");
      s.push("}");
      //      s.push("#__messages__ *{");
      //      s.push(" color:black;");
      //      s.push(" text-align:left;");
      //      s.push(" font-size:medium;");
      //      s.push("}");
      s.push("#__messages__ div.userType{");
      s.push(" font-size:small;");
      s.push(" color:green;");
      s.push("}");

      //      s.push("#__messages__ div.userType *{");
      //      s.push(" font-size:small;");
      //      s.push(" color:green;");
      //      s.push("}");

      s.push("#__messages__ div.userType span.__timestamp__ {");
      s.push(" margin:5px;");
      s.push(" color:blue;");
      s.push("}");

      s.push("#__messages__ div.systemType{");
      s.push(" margin-left:100px;");
      s.push(" font-size:small;");
      s.push(" color:orange;");
      s.push("}");

      s.push("#__messages__ div.systemType span.__timestamp__ {");
      s.push(" font-size:small;");
      s.push(" margin:5px;");
      s.push(" color:blue;");
      s.push("}");

      s.push("#__messages__ span.userText{");
      s.push(" margin-left:10px;");
      s.push("}");
      s.push("#__messages__ span.myselfText{");
      s.push(" color:red;");
      s.push(" margin-left:10px;");
      s.push("}");
 
      s.push("a.__lingr_a__{");
      s.push(" text-decoration:underline;");
      s.push(" color:blue;");
      s.push("}");

      s.push("#__messages__ span.systemText{");
      s.push(" font-size:small;");
      s.push(" margin-left:120px;");
      s.push(" color:orange;");
      s.push("}");

      s.push("#__occupants__ {");
      //s.push(" display:inline;");
      s.push(" width:190px;");
      s.push(" float:right;");
      s.push(" background-color:white;");
      s.push(" padding:0;");
      s.push(" margin:2px;");
      s.push(" overflow:scroll;");
      s.push(" text-align:left;");
      s.push("}");
      
      s.push("#__footer__ {");
      s.push(" background-color:gray;");
      s.push(" color:white;");
      s.push(" text-align:left;");
      s.push(" height:20px;");
      s.push(" padding:0;");
      s.push(" margin:0;");
      s.push(" margin-top:2px;");
      s.push("}");

      s.push("#__sidebar__ {");
      //      s.push(" float: right;");
      s.push(" position:fixed;");
      s.push(" top:0;");
      s.push(" margin:10px;");
      s.push(" padding:2px;");
      s.push(" width:200px;");
      s.push(" color:black;");
      s.push(" background-color:white;");
      s.push(" text-align:left;");
      s.push("}");
      
      s.push("#__roomlist__{");
      s.push(" overflow: scroll;");
      s.push("}");
      

      s.push("#__email__, #__password__{");
      s.push(" display: block;");
      s.push("}");


      GM_addStyle(s.join("\n"));
    },

    toggleView:function(){
      var div = $("__lingr__");
      if(div.style.display == "block"){
        Editor.hide();
      } else {
        Editor.show();
      }
    },
	
    show:function(){
      if(!lingr){
        lingr = new Lingr("4eace1b549534060808f65215dd1ecfb", "json");
        lingr.explore_getHotRooms(function(response){
            Editor.setRoomList("hot", response.rooms);
            Editor.viewRoomList("hot");
          });
        lingr.explore_getNewRooms(function(response){
            Editor.setRoomList("new", response.rooms);
          });
        
        
        //lingr.session_create(roomEnter);
        lingr.session_create(function(){
            $("__lingr__").style.display = "block";
          });
        
        window.addEventListener("unload", 
                                function(event){
                                  Editor.exit();
                                }, true);
        
      } else {
        $("__lingr__").style.display = "block";
        $("__input__").focus();
      }
    },
    
    exit:function(){
      if(lingr && lingr.ticket && lingr.session){
        lingr.room_exit(function(){Editor.destroy();});
      }
    },
    
    destroy:function(){
      if(lingr && lingr.session){
        lingr.session_destroy(function(){       
            delete lingr;
            lingr = null;
          });
      }
    },

    hide:function(){
      var div = $("__lingr__").style.display = "none";
      Editor.exit();
    },

    isShown:function(){
      return $("__lingr__").style.display == "block";
    },
	
  };



  var KeyProcessor = {
    shortCutsWhenDisable:[],
    shortCuts:[],
    toggleShortCut:"",
    keyList:[],
    keyListWhenDisable:[],
    init:function(){
      document.addEventListener("keydown", KeyProcessor.process, true);
    },
	
    addShortCut:function(phrase, command, enable){
      enable = (enable != false) ? true: false;
      if(typeof command == "string" && command.match(/^\//)){
        KeyProcessor.addShortCutExec(phrase, command, enable);
      } else {
        if(enable){
          KeyProcessor.addShortCutWhenEnable(phrase, command);
        } else {
          KeyProcessor.addShortCutWhenDisable(phrase, command);
        }
      }
    },
    addShortCutWhenEnable:function(phrase, command){
      KeyProcessor.addShortCutAux(phrase, command, KeyProcessor.shortCuts);
    },
	
    addShortCutWhenDisable:function(phrase, command){
      KeyProcessor.addShortCutAux(phrase, command, KeyProcessor.shortCutsWhenDisable);
    },
    addShortCutExec:function(phrase, path, enable){
      if(enable != false){
        KeyProcessor.addShortCutExecWhenEnable(phrase, path);
      } else {
        KeyProcessor.addShortCutExecWhenDisable(phrase, path);
      }
    },
    addShortCutExecWhenEnable:function(phrase, path){
      KeyProcessor.addShortCutWhenEnable(phrase, KeyProcessor.makeExecFunc(path));
    },
    addShortCutExecWhenDisable:function(phrase, path){
      KeyProcessor.addShortCutWhenDisable(phrase, KeyProcessor.makeExecFunc(path));
    },

    addShortCutAux:function(phrase, command, shortCuts){
      if(typeof command == "function"){
        shortCuts.unshift({phrase:phrase, func:command});
      } else if(typeof command == "string"){
        shortCuts.unshift({phrase:phrase, func:function(){Commander.execute(command);}});
      }
    },
    makeExecFunc:function(path){
      var func = function(){Executer.execute(path);}
      if(path instanceof Array){
        func = function(){
          path.forEach(function(p){
              Executer.execute(p);
            });
        };
      }
      return func;
    },

    setToggleShortCut:function(phrase){
      KeyProcessor.addShortCutWhenDisable(phrase, 
                                          function(){
                                            Editor.toggleView();
                                          });
      KeyProcessor.addShortCut(phrase, 
                               function(){
                                 Editor.toggleView();
                               });
    },
	
    process:function(event){
      var tagName = event.target.tagName;
      if(tagName == "INPUT" || tagName == "TEXTAREA")return;
      if(Editor.isShown()){
        KeyProcessor.processAux(event,
                                KeyProcessor.keyList, 
                                KeyProcessor.shortCuts);
        KeyProcessor.keyListWhenDisable = [];
      } else {
        KeyProcessor.processAux(event, 
                                KeyProcessor.keyListWhenDisable, 
                                KeyProcessor.shortCutsWhenDisable);
        KeyProcessor.keyList = [];
      }
    },

    processAux:function(event, keyList, shortCuts){
      keyList.push(KeyProcessor.code(event));
      var mode = keyList == KeyProcessor.keyList ? "enable" : "disable";
      var phrase = keyList.join(" ");
      //    Editor.setCommand(phrase);
      var inStroke = false;
      var length = shortCuts.length;
      for(var i=0;i<length;i++){
        var shortCut = shortCuts[i];
        if(phrase == shortCut.phrase){
          shortCut.func();
          keyList.length = 0;
          inStroke = false;
          event.preventDefault();
          break;
        } else if(shortCut.phrase.indexOf(phrase) == 0
                  && phrase.length < shortCut.phrase.length){
          inStroke = true;
          event.preventDefault();
        }
      }
      if(!inStroke){
        keyList.length = 0;
        //      Editor.setCommand("");
      }
    },

    code:function(event){
      var code = [];
      if(event.shiftKey){
        code.push("S");
      } else if(event.ctrlKey){
        code.push("C");
      } else if(event.altKey){
        code.push("M");
      }
      code.push(KeyProcessor.kc2char(event.keyCode));
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

  var Commander = {
    commands :{},
	
    addCommand:function(name, func, args, beforeFunc){
      Commander.commands[name] = {func:func, args:args, before:beforeFunc};
    },
    execute:function(name){
      var command = Commander.commands[name];
      if(command){
        var before = command.before;
        if(typeof before == "function"){
          before();
        }
        var func = command.func;
        var argInfos = command.args;
        var args = [];
        var cancel = false;
        if(argInfos && argInfos.length > 0){
          for(var i=0;i<argInfos.length;i++){
            var message = ["[" + name + "]"];
            var argInfo = argInfos[i];
            var length = args.length;
            for(var j=0;j<length;j++){
              message.push(argInfos[j].name + ":" + args[j]);
            }
            message.push(argInfo.name +":");
            var defaultValue = argInfo.defaultValue;
            if(typeof defaultValue == "function"){
              defaultValue = defaultValue();
            }
            var value = prompt(message.join("\n"), defaultValue);
            if(value){
              args.push(value);
            } else {
              cancel = true;
              break;
            }
          }
        }
        if(!cancel){
          func.apply(window, args);
        }
      }
    },
  };


  function init(){
    Editor.init();
    KeyProcessor.init();
    KeyProcessor.setToggleShortCut("S-l");
  }

  if(parent.document == document){
    init();
  }

})();
