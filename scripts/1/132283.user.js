// ==UserScript==
// @name           NiceScroll Refined
// @author         Original - InuYaksa. Refined - Davey Jacobson
// @namespace      http://about.me/daveyjacobson
// @description    InuYaksa's grease.nicescroll tweaked and refined
// @homepage       http://areaaperta.com/nicescroll
// @version        0.3.14
// @include        *
// ==/UserScript==

(function(){

    function main() {
      var win = window;
      var nice = false;
      var j = false;

      var head = document.getElementsByTagName('head')[0]||document.documentElement;

      var href = window.location.href;

      var facebook = /\.facebook\.com(\/|$)/.test(href);
      var google = /\.google\./.test(href);
      var github = /(\/|\.)github.com(\/|$)/.test(href);
      var twitter = /(\/|\.)twitter.com(\/|$)/.test(href);
      var youversion = /\.youversion\.com\/bible(\/|$)/.test(href);

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

              if (facebook) {
                j('div.fbChatSidebar').css('margin-right','10px');
                //nice = j('html').niceScroll({cursorcolor:'#555555',cursoropacitymax:0.6,cursorminheight:40}); // facebook style!
                j('body').css('overflowY','hidden');
                
                if (j('html')) {
                  var autoloadscroll = function(tm) {
                    setTimeout(function(){
                      waitFor(
                        function() {                      
                          var me = j('html');
                          return (me.length) ? me : false;                  
			            },
                        function() {
                          var nn = this.niceScroll({'cursorcolor':'#555555','cursorborderradius':'10px','cursoropacitymax':0.65,'cursorminheight':40});
                          this.mouseenter(function(){                          
                            nn.resize();
                          });
                          this.scroll(function(){
                            nn.resize().show();
                          });
                          this.mouseleave(function(){
                            nn.hide();
                          });
                        }
                      );
                    },tm||0);
                  };

                  j("html").click(function(){autoloadscroll(500);});
                  
                  attachEvent(j('html'),'mouseup','div#content',function(){autoloadscroll(1000);});

                  autoloadscroll(0);
                }

                var fbscrollable = function(tm) {
                  setTimeout(function(){
                    waitFor(
                      function() {                      
                        var me = j('div.fbNubFlyoutBody');
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
                
                var layerscroll = function(tm) {
                  setTimeout(function(){
                    waitFor(
                      function() {                      
                        var me = j('div#pagelet_page_most_recent_overlay_stream');
                        return (me.length) ? me : false;                  
		              },
                      function() {
                        var nn = this.niceScroll({'cursorborderradius':'10px','cursorcolor':'#6D84B4','cursoropacitymax':0.6});
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

                j("#pagelet_page_most_recent_overlay_stream").click(function(){layerscroll(500);});

                attachEvent(j('div#pagelet_page_most_recent_overlay_stream'),'mouseup','div.profile-pagelet-section',function(){layerscroll(1000);});
                
                layerscroll(0);

                var likescroll = function(tm) {
                  setTimeout(function(){
                    waitFor(
                      function() {                      
                        var me = j('div.fbProfileBrowserResult');
                        return (me.length) ? me : false;                  
		              },
                      function() {
                        var nn = this.niceScroll({'cursorborderradius':'10px','cursorcolor':'#6D84B4','cursoropacitymax':0.6});
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

                j(".fbProfileBrowser").mouseenter(function(){likescroll(500);});

                attachEvent(j('div.fbProfileBrowserResult'),'mouseup','li.fbProfileBrowserListItem',function(){likescroll(1000);});
                
                likescroll(0); 

              }
              else if (twitter) {                
                nice = scroll.niceScroll({cursoropacitymax:0.7,cursorcolor:'#0084B4',railoffset:{left:-2}});
                if (j('div.twttr-dialog-wrapper')) {
                  nice.hide();
                  var dmscroll = function(tm) {
                    setTimeout(function() {  
                      waitFor(
                        function() {
                          var me = j('div.js-modal-scrollable');
                          return (me.length) ? me : false;
                        },
                        function() {
                          var nn = this.niceScroll({cursoropacitymax:0.7,cursorcolor:'#0084B4'});
                          this.mouseenter(function(){
                            nn.resize();
                          });
                          this.mouseleave(function(){
                            nn.hide();
                          });
                        }
                      );
                    },tm||0);
                  }
                  j("div.twttr-dialog").click(function(){dmscroll(500);});
                  attachEvent(j('div.js-twttr-dialog-not-draggable'),'mouseup','div.dm',function(){dmscroll(1000);});
                  dmscroll(0);
                }
              }
// BEGIN GOOGLE CODE BLOCK
              else if (google) {
                nice = scroll.niceScroll({cursorborderradius:'10px',cursoropacitymax:0.65,cursorminheight:40});
                if (/\/mail\./.test(href)) {
                  waitFor(
                    function() {
                      j('#ascrail2000').css('display','none');
                    }
                  );
                  waitFor(
                    function() {
                      var me = j('div.ajl.aib.lKgBkb:hover'); // left menu
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.niceScroll({cursorcolor:'#999999',cursoropacitymax:0.65,railoffset:{left:-1}});
                    }
                  );
                  waitFor(
                    function() {
                      var me = j('div.aeJ');  // messages
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.niceScroll({cursoropacitymax:0.65,cursorcolor:'#999999',railoffset:{left:1}});
                    }
                  );
                  waitFor(
                    function() {
                      var me = j('div.akc');  // left chat
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursoropacitymax:0.65,cursorcolor:'#999999',railoffset:{left:2}});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                    }
                  );
                  waitFor(
                    function() {
                      var me = j('div.pt > div + div + div + div + div + div');  //chat labs version
                      me.css('padding-right','10px');
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursoropacitymax:0.65,cursorcolor:'#999999',railoffset:{left:6}});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                      this.scroll(function(){
                        nn.resize();
                      });
                    }
                  );
                }
                else if (/\/voice/.test(href)) {
                  nice.hide();
                  j('html').css('overflow','hidden');
                  j('body').css('overflow','hidden');
                  waitFor(
                    function() {
                      var me = j('#gc-view-main');
                      me.css('overflow','hidden');
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursorborderradius:'10px',cursoropacitymax:0.65,cursorcolor:'#999999'});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                    }
                  );
                }
                else if(/\/maps/.test(href)) {
                  nice.hide();
                  waitFor(
                    function() {
                      var me = j('#spsizer');
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursorborderradius:'10px',cursoropacitymax:0.65,cursorcolor:'#999999'});
                      this.mouseenter(function(){
                        nn.resize();
                      });
                    }
                  );
                  waitFor(
                    function() {
                      j('#ascrail2000').css('display','none');
                    }
                  );
                }
                else if (/\/docs/.test(href)) {
                  nice.hide();
                  waitFor(
                    function() {
                      j('#ascrail2000').css('display','none');
                    }
                  );
                  waitFor(
                    function() {
                      var me = j('.gview-scrollbar');
                      return (me.length) ? me : false;
                    },
                    function() {
                      var nn = this.niceScroll({cursorborderradius:'10px',cursorcolor:'#999999'});
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
                      this.niceScroll({cursorwidth:7,cursoropacitymax:0.5,cursorborderradius:'10px',cursorcolor:'#000',cursorborder:'1px solid rgba(200,200,200,0.4)'});
                    }
                  );
                  waitFor(
                    function() {
                      var me = j("#gridcontainer");
                      return (me.length) ? me : false;
                    },
                    function() {
                      this.niceScroll({cursorwidth:7,cursorborderradius:'10px',cursorcolor:'rgba(0,0,0,0.4)',cursorborder:'1px solid rgba(200,200,200,0.4)'});
                    }
                  );
                } else {
                  j('input[name="q"]').keyup(function(){
                    setTimeout(function(){nice.resize();},1000);
                  });
                }
              }
// END GOOGLE BLOCK 
              else if (youversion) {
                nice = j('html').niceScroll({cursorwidth:7,cursorborderradius:'10px',cursoropacitymax:0.5,cursorminheight:40});
                j('footer').css('display','none');
                j('.nav_items a').css('position','fixed');
                if (j('div.dynamic_menu')) {
                  var menuscroll = function(tm) {
                    setTimeout(function() {
                      waitFor(
                        function() {
                          var me = j('div.scroll');
                          return (me.length) ? me : false;
                        },
                        function() {
                          var nn = this.niceScroll({cursorwidth:7,cursorborderradius:'10px',cursorminheight:40,cursoropacitymax:0.5});
                          this.mouseenter(function(){
                            nn.resize();
                          });
                          this.mouseleave(function(){
                            nn.hide();
                          });
                        }
                      );
                    },tm||0);
                  }
                  menuscroll(0);
                }
/*
                if (j('div#version_primary')) {
                  j('.nav_items a').css('position','fixed');
                  var pagescroll = function(tm) {
                    setTimeout(function() {
                      waitFor(
                        function() {
                          var me = j('article');
                          me.css({'position':'fixed','width':'458px','top':'82px','bottom':'10px'});
                          return (me.length) ? me : false;
                        },
                        function() {
                          var nn = this.niceScroll({cursorwidth:7,cursorborderradius:'10px',cursorminheight:40,cursoropacitymax:0.5});
                          this.mouseenter(function(){
                            nn.resize();
                          });
                          this.mouseleave(function(){
                            nn.hide();
                          });
                        }
                      );
                    },tm||0);
                  }
                  pagescroll(0);
                } else {
                  nice = scroll.niceScroll({cursorwidth:7,cursorborderradius:'10px',cursoropacitymax:0.5,cursorminheight:40});
                }
*/
              }  
              else  {
                nice = scroll.niceScroll({cursorwidth:7,cursoropacitymax:0.5,cursorborderradius:'10px',cursorcolor:'#000',cursorborder:'1px solid rgba(200,200,200,0.4)'}); // Safari style
                if (j('textarea')) {
                  var textscroll = function(tm) {
                    setTimeout(function(){
                      waitFor(
                        function() {
                          var me = j('textarea');
                          me.css('resize','none');
                          return (me.length) ? me : false;
                        },
                        function() {
                          var nn = this.niceScroll({cursorborderradius:'10px',cursoropacitymax:0.65,cursorminheight:20});
                          this.mouseenter(function(){
                            nn.resize().hide();
                          });
                          this.scroll(function(){
                            nn.resize().show();
                          });
                          this.mouseleave(function(){
                            nn.hide();
                          });
                        }
                      );
                    },tm||0);
                  }
                  j("textarea").click(function(){textscroll(500);});

                  attachEvent(j('body'),'mouseup','textarea',function(){textscroll(1000);});

                  textscroll(0);
                }   
             }  
             checkPage();
            }
          );

        }
      };

      var jq = false;  
      var oldjq = false;

      if (twitter) {
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