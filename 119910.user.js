// ==UserScript==
// @name           grease.nicescroll
// @namespace      nicescroll
// @description    Nicescroll for GreaseMonkey or Chrome Extension
// @version        1.95
// @include        *
// ==/UserScript==

(function(){

    function main() {
      var win = window;
      var nice = false;
      var j = false;

      var head = document.getElementsByTagName('head')[0]||document.documentElement;

      var href = window.location.href;
      
      var isfacebook = /\.facebook\.com(\/|$)/.test(href);
      var isgoogle = /\.google\./.test(href);
      var isgithub = /(\/|\.)github.com(\/|$)/.test(href);
      var istwitter = /(\/|\.)twitter.com(\/|$)/.test(href);
      
      var lastcheck = false;
      
      function checkPage() {
        if(!nice) return true;
        var pg = nice.getContentSize();
        if (lastcheck) {
          if ((lastcheck.h!=pg.h)||(lastcheck.w!=pg.w)) nice.resize();
        }
        lastcheck = pg;
        setTimeout(checkPage,2000);
      };
      
      function loadScript(src,fn) {
        var sc = document.createElement('script');
        sc.src = src;
        sc.type = 'text/javascript';
        if (fn) sc.addEventListener("load",fn,true);
        head.appendChild(sc);        
      };      
      
      function waitFor(chk,fn,delay) {
        var ret = chk();
        delay = delay||false;
        if (!delay&&ret) {
          fn.call(ret);
        } else {
          setTimeout(function(){waitFor(chk,fn)},delay||50);
        }
      };
      
      function getScrollable() {
        var hasbody = j('body').css('overflow-y')||j('body').css('overflow')||false;
        return j((hasbody&&/scroll|auto/i.test(hasbody)) ? 'body' : 'html');
      };
      
      function allScrollables() {
        var lst = [];
        j('div').each(function(){
          var a = j(this);
          if (/scroll|auto/.test(a.css('overflowY'))) lst.push(a);
        });
        return lst;
      };
      
      function attachEvent(el,ev,targ,fn) {
        if (el.on) {  // 1.7+
          el.on(ev,targ,fn);
        }
        else if (el.delegate) {  // pre 1.7
          el.delegate(targ,ev,fn);
        }
        else {
          console.info('no event support');
        }
      };
      
      function loadNS() {    
        j = win.jQuery;    
        if (typeof j.fn.niceScroll == "undefined") {
        
          loadScript(
            'http://areaaperta.com/nicescroll/gm/greasemonkey.nicescroll.js',
            function() {
              var scroll = getScrollable();
            
              if (isfacebook) {
                j('div.fbChatSidebar').css('margin-right','10px');
                nice = j('html').niceScroll({'cursorcolor':'#555555','cursoropacitymax':0.6,'cursorminheight':40}); // facebook style!
                j('body').css('overflowY','hidden');

                var fbscrollable = function(tm) {
                  setTimeout(function(){
                    waitFor(
                      function() {                      
                        var me = j('div.scrollable');
                        return (me.length) ? me : false;
                      },
                      function() {
                          var nn = this.niceScroll({cursorcolor:'#6D84B4'});
                          this.mouseenter(function(){                          
                            nn.resize().show();
                          });
                          this.mouseleave(function(){                          
                            nn.hide();
                          });
                      }
                    );
                  },tm||0);
                };
                
                j("#fbDockChat").click(function(){fbscrollable(500);});
                
                attachEvent(j('div.fbNubFlyoutBodyContent'),'mouseup','li.item',function(){fbscrollable(1000);});
                
                fbscrollable(0);
                
              } 
              else if (istwitter) {                
                j(window).ready(function(){
                  nice = j('body').niceScroll();
                });               
                attachEvent(j("body"),"mouseup","div.js-actionable-tweet",function(){
                  waitFor(
                    function() {                      
                      var me = j('div.pane-components');
                      return (me.length) ? me : false;
                    },
                    function() {
                        var nn = this.niceScroll({cursorcolor:'#0084B4',railoffset:{left:-2}});
                        this.mouseenter(function(){                          
                          nn.resize().show();
                        });
                        this.mouseleave(function(){                          
                          nn.hide();
                        });
                    },
                    2000
                  );
                });
              } 
              else if (isgoogle) {
                nice = scroll.niceScroll();
                if (/\/plus\./.test(href)) {
/*                
                  setTimeout(function(){
                    allScrollables().map(function(d){
                      var c = d.children();
                      j('iframe#js').contents().find('body').css('margin-right','8px');
                      d.niceScroll(c,{hwacceleration:false});
                    });                  
                  },600);
*/                  
                } else if (/\/mail\./.test(href)) {
                  nice.hide();
                  waitFor(
                    function() {
                      var me = j("#canvas_frame").contents().find('div.aeJ');  //messages
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.css('margin-right','14px');
                      this.niceScroll({cursorcolor:'#999999'});
                    }
                  );
                  waitFor(
                    function() {
                      var me = j("#canvas_frame").contents().find('div.akc');  // left chat
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursorcolor:'#999999'});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                    }
                  );
                  waitFor(
                    function() {
                      var me = j("#canvas_frame").contents().find('div.akj');  //chat labs version
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursorcolor:'#999999',railoffset:{left:-10}});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                    }
                  );
                }
                else if (/\/calendar\//.test(href)) {
                  waitFor(
                    function() {
                      var me = j("#scrolltimedeventswk");
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.niceScroll();
                    }
                  );
                  waitFor(
                    function() {
                      var me = j("#gridcontainer");
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.niceScroll();
                    }
                  );
                  
                } else {
                  j('input[name="q"]').keyup(function(){
                    setTimeout(function(){nice.resize();},1000);
                  });
                }
              }
              else  {
                var top = scroll.scrollTop();
                nice = scroll.niceScroll();
                scroll.scrollTop(top);
              }
              checkPage();
            }
          );
          
        }
      };
      
      var jq = false;  
      var oldjq = false;
      
      if (istwitter) {
        waitFor(
          function() {
            return (typeof win.jQuery!="undefined");
          },
          function() {
            checkLib();
          }
        );
      } else {
        checkLib();
      }
   
      function checkLib() {

        jq = (typeof win.jQuery == 'undefined') ? false : win.jQuery;  
        oldjq = win.$||false;
      
        if (!jq||!jq.cssHooks) {
          loadScript(
            'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
            function() {
              win.jQuery.noConflict();
              if (oldjq) win.$ = oldjq;
              loadNS();
            }
          );          
        } else {
          loadNS();
        };
        
      }
      
    };

    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
  
})();