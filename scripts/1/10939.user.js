// ==UserScript==
// @name           nowa_command_line
// @namespace      perlnamehoge@gmail.com
// @discription    send message from command line form.
// @include        http://*
// ==/UserScript==

new function () {
    var target_host = "my.nowa.jp";
    var CommandLine = (function () {
        String.prototype.toJSON = function () {
            var json = {};
            eval("json = " + this);
            return json;
        }
        String.prototype.strip = function () {
            return this.replace(/^\s+|\s+$/, '');
        }
        var each = function (obj, iter) {
            for ( var i in obj ) iter.call(null, obj[i], i, obj);
        }
        var $ = function (id) {
            if ( !this.cache ) this.cache = {};
            return this.cache[id] ? this.cache[id] :
                                  ( this.cache[id] = document.getElementById(id) );
        }
        var $N = function (name,attr) {
            var elem = document.createElement(name);
            each(attr, function (v,k) {
                       ( k == 'class' ) ? elem.className = v :
                       ( k == 'style' ) ? elem.style.cssText = v :
                       elem.setAttribute(k,v);
            });
            return elem;
        }
        var $CSS =  function (styles) {
            var res = [];
            each(styles, function (v,k) {
                         res.push( k + ":" + v );
            });
            return res.join(';') + ';';
        }
        var getSize = function () {
            return {
                 width  :  window.innerWidth
                        || document.documentElement.clientWidth
                        || document.body.clientWidth
                        || 0,
                 height :  window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight
                        || 0,
                 scroll :  document.documentElement.scrollTop
                        || document.body.scrollTop
                        || 0
             }
        }
        var addEventListener = function (obj, name, observer, useCapture) {
            obj.attachEvent ? obj.attachEvent("on" + name, observer)
                            : obj.addEventListener(name, observer, useCapture);
        }
        var queryString = function (query) {
            var result  = [];
            each(query, function (val, key) {
                        result.push([
                                encodeURIComponent(key),
                                "=",
                                encodeURIComponent(val)
                        ].join(""));
            });
            return result.join("&");
        }
        var getRandom = function () {
            return Math.random().toString().slice(2).split("").map(function (val) {
                return String.fromCharCode( +val + 97 );
            }).join("");
        }
        var keys = function (obj) {
            var res = [];
            each(obj, function (val, key) {
                res.push(key);
            });
            return res;
        }
        var Commands = {
            clip : function () {
                   location.href = 'http://clip.livedoor.com/clip/add?'+ queryString({
                                 link  : location.href,
                                 title : document.title
                   });
            },
            reader : function () {
                   location.href = 'http://reader.livedoor.com/subscribe/'+location.href;
            },
            nowa : function () {
                   location.href = "javascript:(function(){d='my.nowa.jp';s=document.createElement('script');s.src='http://'+d+'/js/blog_post.js?uniqid='.concat(new Date);document.body.appendChild(s);})();";
            },
            bloglines : function () {
                   location.href = "javascript:location.href='http://www.bloglines.com/sub/'+location.href";
            },
            hateb : function () {
                   location.href = "http://b.hatena.ne.jp/entry/" + location.href;
            },
            gmail : function () {
                   location.href = "http://mail.google.com/mail/?hl=ja";
            },
            google : function (k) {
                   location.href = "http://www.google.co.jp/search?hl=ja&q=" + encodeURIComponent( k || "" );
            }
        }
        return {
               rkey  : "",
               ircs  : [],
               symbol_map : {
                        '#' : function () {
                            return Array.apply(null, CommandLine.ircs);
                        },
                        '@' : function () {
                            return keys( Commands );
                        }
               },
               location : {
                    send : "http://" + target_host + "/internal_api/status_message/?",
                    home : "http://" + target_host + "/home/",
                    ch   : "http://" + target_host.split(".").slice(1).join(".") + "/ch/"
               },
               init : function () {
                    this.setUserValue();
                    this.attachComponent();
                    this.setIntervalAction();
                    this.attachToggleAction();
                    // this.initializeFinish();
               },
               initializeFinish : function () {
                    setTimeout(function () {
                        try {
                            $("hitokoto_send_form").focus();
                            $("hitokoto_send_form").setSelectionRange(0,0);
                        } catch (e) {}
                    }, 10);
               },
               setUserValue : function () {
                     GM_xmlhttpRequest({
                          method : "get",
                          url    : this.location["home"],
                          onload : function (xmlhttp) {
                                   var body = xmlhttp.responseText.toString();
                                   /*
                                           get user-rkey.
                                   */ 
                                   CommandLine.rkey = ( body.match(/(?:"|')([a-z0-9]{16})(?:"|')/) || ["", false] )[1];
                                   /*
                                           get IRC-Channel-List.
                                   */
                                   var reg  = /\/ch\/([a-z0-9]+)\/" class="blue-cms"/g;
                                   while ( this.m = reg.exec(body) ) {
                                         CommandLine.ircs.push( this.m[1] );
                                   }
                          }
                     });
               },
               attachComponent : function () {
                    var div = $N('div', {
                        'style' : $CSS({
                                'width'        : '100%',
                                'position'     : 'absolute',
                                '-moz-opacity' : '0.8',
                                'background'   : 'white',
                                'height'       : '65px',
                                'top'          : '0px',
                                'padding'      : '10px',
                                'border-top'   : '2px solid #c0d7e9',
                                'left'         : '0px',
                                'display'      : 'none'
                        }),
                        'id'    : "hitokoto_window"
                    });
                    var input = $N('input', {
                        'name'  : 'message',
                        'type'  : 'text',
                        'id'    : 'hitokoto_send_form',
                        'style' : $CSS({
                                'width'     : '90%',
                                'border'    : '0px solid #000000',
                                'font-size' : '24px'
                        })
                    });
                    div.appendChild(input);
                    document.body.appendChild(div);
               },
               removeComponent : function () {
                    var elem = $("hitokoto_window");
                    elem.parentNode.removeChild(elem);
               },
               setIntervalAction : function () {
                    var target = $("hitokoto_window");
                    this.tid = setInterval(function () {
                             var wsize = getSize();
                             var tsize = +target.style.height.slice(0, -2);
                             target.style.top = wsize.height + wsize.scroll - tsize + "px";
                    }, 10);
               },
               attachToggleAction : function () {
                    addEventListener(window, 'keydown', function (e) {
                                     if ( e.shiftKey && e.which == 40 ) {
                                          var o = $("hitokoto_window").style;
                                          o.display = o.display == "" ? "none" : "";
                                          // GM_setValue("window_display", o.display);
                                          $("hitokoto_send_form").focus();
                                     }
                    }, false);
                    addEventListener($("hitokoto_send_form"), "keydown", function (e) {
                                     switch ( e.which ) {
                                            case 9 :
                                                 var start_pos   = this.selectionStart;
                                                 var forwardText = this.value.substr( 0, start_pos );
                                                 if ( forwardText.match(/((^\W)(?:\w+))/) && !forwardText.match(/\s/) && typeof CommandLine.symbol_map[ RegExp.$2 ] == 'function' ) {
                                                      var code_bit = RegExp.$1, symbol = RegExp.$2;
                                                      if ( !this.stock ) this.stock = {};
                                                      if ( !this.stock[code_bit] ) this.stock[code_bit] = [];
                                                      if ( !this.stock[code_bit].length )
                                                           this.stock[code_bit] = CommandLine.symbol_map[ symbol ]().filter(function (val) {
                                                                                return (new RegExp('^'+code_bit.slice(1))).test(val);
                                                           });
                                                      if ( this.stock[code_bit].length ) {
                                                           var name = this.stock[code_bit].shift();
                                                           this.value = this.value.replace(/(^\W)\w+/, '$1' + name);
                                                           this.setSelectionRange( start_pos, name.length + 1 );
                                                      }
                                                 } else if ( typeof CommandLine.symbol_map[ forwardText ] == 'function' ) {
                                                      if ( !this.all ) this.all = {};
                                                      if ( !this.all[ forwardText ] ) this.all[ forwardText ] = [];
                                                      if ( !this.all[ forwardText ].length ) this.all[ forwardText ] = CommandLine.symbol_map[ forwardText ]();
                                                      if ( this.all[ forwardText ].length ) {
                                                           var name = this.all[ forwardText ].shift();
                                                           this.value = this.value.replace(/(^\W)\w*/, '$1' + name);
                                                           this.setSelectionRange( 1, name.length + 1 );
                                                      }
                                                 }
                                                 setTimeout(function () {
                                                            $("hitokoto_send_form").focus();
                                                 }, 1);
                                            break;
                                     }
                    }, false);
                    addEventListener($("hitokoto_send_form"), "keypress", function (e) {
                                     switch ( e.which ) {
                                            case 13 :
                                                 CommandLine._send(this.value);
                                            break;
                                     }
                    }, false);
               },
               _send : function (body) {
                     switch ( body.charAt(0) ) {
                            case '@' :
                                    if ( body.slice(1).match(/(\w+\s*)/) ) {
                                         var cmd = RegExp.$1.strip(), args = body.slice( RegExp.$1.length + 1 );
                                         if ( Commands[ cmd ] ) {
                                              Commands[ cmd ].apply(this, ( args.split(/\s+/) || [] ).slice(1));
                                         } else {
                                              window.status = cmd + ": command not found...";
                                         }
                                    }
                                    return;
                            break;
                            case '#' :
                                    if ( !body.strip().match(/\s/) )
                                         return location.href = this.location["ch"] + body.strip().slice(1) + "/";
                            break;
                     }
                     this.sendMessage(body);
               },
               sendMessage : function ( body ) {
                           GM_xmlhttpRequest({
                                method : "GET",
                                url    : this.location["send"] + queryString({
                                                                        body   : body,
                                                                        uniqid : getRandom(),
                                                                        rkey   : this.rkey
                                                                 }),
                                onload : function (xmlhttp) {
                                         var json = xmlhttp.responseText.toJSON();
                                         if ( json.status == "success" ) {
                                              if ( $("hitokoto_send_form").value.match(/(^\W\w+\s)/) ) {
                                                   $("hitokoto_send_form").value = RegExp.$1;
                                              } else {
                                                   $("hitokoto_send_form").value = "";
                                              }
                                              window.status = "メッセージを送信しました";
                                         } else {
                                              window.status = "メッセージの送信に失敗しました";
                                         }
                                         setTimeout(function () {
                                              window.status = "";
                                         }, 1000);
                                }
                           });
               }
        }
    })();
    if ( document && document.body )
       CommandLine.init();
}