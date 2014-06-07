// ==UserScript==
// @name        CloudBrain
// @namespace   http://mra.tzo.net
// @include     http://webbrain.com/brainpage/brain/753525E3-E419-E2C6-0496-028F1E10BC95*
// @require     http://iis.mra.tzo.net/js/jquery-1.7.1.min.js
// @require     http://iis.mra.tzo.net/js/overlay.js
// @require     http://iis.mra.tzo.net/webbrain-com/jquery-tooltip/lib/jquery.bgiframe.js
// @require     http://iis.mra.tzo.net/webbrain-com/jquery-tooltip/lib/jquery.dimensions.js
// @require     http://iis.mra.tzo.net/webbrain-com/jquery-tooltip/jquery.tooltip.js
// @version     1.100
// ==/UserScript==
//alert(1)
//alert('$'+(typeof $));
//================================================
// consts
  var Us='und'+'efined';
  var L='length';
  var This_File='CloudBrain.user.js';
  var Stuff_Root='http://iis.mra.tzo.net/webbrain-com/';
//________________________________________________e consts
// utils base log
  function url(s){
    return "url('"+s+"')";
    }
  function pad(s,n,c){
    s=''+s;
    if (typeof c==Us) {
      c='0';
    }
    while (s.length<n) {
      s=c+''+s;
    }
    return s;
    }
  function logx(t,str){
    //http://getfirebug.com/logging
    //console.debug, console.info, console.warn, and console.error.
    if (location.href.indexOf('plugins/servlet/gadgets/ifr')!=-1) {
      return;
    }
    var _t='';
    var tt={'i':'INFO','d':'DEBUG','w':'WARN','e':'ERROR'};
    if (t!='') {_t=tt[t];}
    if (_t!='') {_t=_t+':';}
    var n='';
    if (arguments.callee.caller.caller){
      n=arguments.callee.caller.caller.name;
      if (typeof arguments.callee.caller.caller!=Us&&arguments.callee.caller.caller.log==false) {
        return;
      }
    };//toString();
    var loc=location.href;
    loc=loc.substr(0,150);
    loc=loc+':';
    if (window==top) {
      loc='';
    }
    logx.ct=(typeof logx.ct==Us)?1:logx.ct+1;
    if (jQuery) {
      if (typeof logx.box==Us) {
        if (jQuery('#debuglogtext').length==0) {
          if (typeof debugbox=='function') {
            if (typeof debugbox.lines==Us){
              debugbox.lines=new Array();
            }
            debugbox.lines[debugbox.lines.length]=pad(logx.ct,4)+':'+_t+loc+n+':'+str;
          }
        }else{
          logx.box=jQuery('#debuglogtext');
        }
      }
      if (typeof logx.box!=Us) {
        //prompt('','"'+(typeof logx.box)+'"=="'+Us+'"');
        //alert(typeof logx.box);
         var str2=pad(logx.ct,4)+':'+_t+loc+n+':'+str;
         logx.box.each(function(){
           var o=jQuery(this);
           var ht=o.val();
           ht=str2+"\n"+ht;
           o.val(ht);
         });
      }
    }
    //setTimeout(function(){throw new Error("DEBUG:"+pad(log.ct,4)+':'+loc+n+":"+str)}, 1)
    if (t=='') {
      console.log(pad(logx.ct,4)+':'+loc+n+":"+str);
    }else if (t=='i'){console.info(pad(logx.ct,4)+':'+loc+n+":"+str);
    }else if (t=='w'){console.warn(pad(logx.ct,4)+':'+loc+n+":"+str);
    }else if (t=='e'){console.error(pad(logx.ct,4)+':'+loc+n+":"+str);
    }else if (t=='d'){console.debug(pad(logx.ct,4)+':'+loc+n+":"+str);
    }
    }
  function log(s){logx('',s);}
  function logi(s){logx('i',s);}
  function logw(s){logx('w',s);}
  function loge(s){logx('e',s);}
  function logd(s){logx('d',s);}
  function log_clear(){
    if (1) {
      if (jQuery) {
        if (typeof logx.box==Us) {
          logx.box=jQuery('#debuglogtext');
        }
        logx.box.each(function(){
          var o=jQuery(this);
          o.val('');
        });
      }
    }
    };window.log_clear=log_clear;
  function log_input_focus(){
    jQuery('#debugloginput').get(0).focus();
    }
  function log_input_clear(){
    if (jQuery) {
      jQuery('#debugloginput').val('');
      log_input_focus();
    }
    }
//________________________________________________e utils base log
// Utilities Functions
 window.Uf={//Utilities
   blacken:function blacken__Uf(){
     $('body').css('background-color',"#000000")
     $('html').css('background-color',"#000000")
     },
   styleId:function styleId__Uf(style){
     var a=style.split('/');
     a=a[a.length-1].split('"')[0];
     a=a.replace(/\./,'');
     a=a.replace(/-/,'');
     return a;
     },
   addStyle:function addStyle__Uf(style) {
     var head = document.getElementsByTagName("HEAD")[0];
     var ele = head.appendChild(window.document.createElement( 'style' ));
     ele.innerHTML = style;
     ele.id=Uf.styleId(style);
     return ele;
     },
   importStyle:function importStyle__Uf(i){
     Uf.addStyle('@import "'+i+'";');
     },
   addGlobalStyle:function addGlobalStyle__Uf(css) {
     var head = document.getElementsByTagName('head')[0];
     if (!head) { return; }
     var style = document.createElement('style');
     style.setAttribute("type", "text/css");
     if (navigator.userAgent.indexOf('AppleWebKit/') > -1) {
       style.innerText = css;
     } else {
       style.innerHTML = css;
     }
     head.appendChild(style);
     }
   };
   // More
    (function (w, d) {
        var a, k = 'protocol hostname host pathname port search hash href'.split(' ');
        w.Uf = w.Uf || {};
        /**
    * Parse a URI, returning an object similar to Location
    *
    * Usage: UFCOE.parseUri("hello?search#hash").search -> "?search"
    *
    * @param String url
    * @return Object
    */
        w.Uf.parseUri = function parseUri__Uf(url) {
            //log('');
            a || (a = d.createElement('a'));
            // Let browser do the work
            a.href = url;
            for (var r = {}, i = 0; i<8; i++) {
                r[k[i]] = a[k[i]];
            }
            r.toString = function() { return a.href; };
            r.requestUri = r.pathname + r.search;
            //log('99');
            return r;
        };
    })(window, document);
//________________________________________________e Utilities Functions
// Constants
 window.Con={//Constants
   Assets_Url:'http://iis.mra.tzo.net/webbrain-com/',
   Icons_Url:'http://iis.mra.tzo.net/webbrain-com/favicon/brain/'
   };
//________________________________________________e Constants
// Resources
 window.Res={//Resources
   assets:{
     Url:'http://iis.mra.tzo.net/webbrain-com/',
     menuheader_src:Con.Assets_Url+'menubar_image.png',
     menubar_bi:Con.Assets_Url+'menubar_background.png',
     divbar_bi:Con.Assets_Url+'div.png'
     }
   };
//________________________________________________e Resources
// Menubar
 window.Mb={//Menubar
   menuheader_qs:'img#menuimage',
   menubar_qs:'td.greyBar:eq(1)',
   init:function init__Mb(){
     },
   perform:function perform_Mb(){
     var me=Mb;
     me._alterMenubar();
     },
   _css:function _css__Mb(){
     var me=window.Mb;
     var s='';
     var END='}'+"\n";
     var BEG=function(s){
       return s+'{';
     };
     var AND=function(s){
       return s+',';
     };
     var id='#nav';
     var st=Mn.style;
     s+=AND(id+' li:hover');
     s+=BEG(id+' a.menuLink:hover span.menuText:hover');
     s+='background-color:'+st.item.hover.bgc+';';
     s+='color:'+st.item.hover.color+';';
     s+='background-image:none!important;';
     s+=END;
     s+=BEG(id+' li');
     s+='border-left:'+st.div.border+';';
     s+=END;
     return s;
     },
   _writeCss:function _writeCss__Mb(){
     var me=window.Mb;
     var s=me._css();
     if (typeof me._writeCss.done!=Us) {
       return;
     }
     me._writeCss.done=true;
     Uf.addGlobalStyle(s);
     },
   _alterMenubar:function _alterMenubar__Mb(){
      var me=Mb;
      me._writeCss();
      $(me.menuheader_qs).attr('src',Res.assets.menuheader_src);
      $(me.menubar_qs).css('background-image',url(Res.assets.menubar_bi));
     }
   };
//________________________________________________e Menubar
// Divider Bar
 window.Db={//Divider Bar
   bar_qs:'div.GGD0W3FBOI.GGD0W3FBEX',
   bardown_qs:'img.GGD0W3FBDX:eq(0)',
   barup_qs:'img.GGD0W3FBDX:eq(1)',
   init:function init_Db(){
     },
   perform:function perform_Db(){
     var me=Db;
     me._alterBar();
     },
   PageDown:function PageDown__Db(){
     var me=Db;
     $(me.barup_qs).get(0).click();
     $(me.barup_qs).get(0).click();
     Port.MainFocus();
     },
   PageUp:function PageUp__Db(){
     var me=Db;
     $(me.bardown_qs).get(0).click();
     },
   ShowPlex:function ShowPlex__Db(){
     var me=Db;
     $(me.bardown_qs).get(0).click();
     $(me.bardown_qs).get(0).click();
     },
   ShowDestination:function ShowDestination__Db(){
     var me=Db;
     $(me.barup_qs).get(0).click();
     $(me.barup_qs).get(0).click();
     Port.MainFocus();
     },
   ShowBoth:function ShowBoth__Db(){
     var me=Db;
     $(me.barup_qs).get(0).click();
     $(me.barup_qs).get(0).click();
     $(me.bardown_qs).get(0).click();
     Port.MainFocus();
     },
   _alterBar:function _alterBar__Db(){
     var me=Db;
     var o=$(me.bar_qs);
     if (o.length==0) {
       //log('retry');
       setTimeout(Db._alterBar,500);
       return;
     }
     $(me.bar_qs).css('background-image',url(Res.assets.divbar_bi));
     $(me.bar_qs).bind('mousedown',function(){Port.MarginMain(true);});
     $(me.bar_qs).bind('mouseup',function(){Port.MarginMain(false);});
     }
   };
//________________________________________________e Divider Bar
// IFrame Control
 window.Fb={//IFrame
   init:function init__Fb(){
     },
   perform:function perform__Fb(){
     var me=Fb;
     }
   };
//________________________________________________e IFrame Control
// Keyboard
 window.Kb={//Keyboard
   init:function init__Kb(){
     },
   perform:function perform__Kb(){
     var me=Kb;
     me._setBody();
     },
   _bugEvent:function _bugEvent__Kb(event){
     var msg = "Handler for which:"+event.which+" keyCode"+event.keyCode+" .keypress() called.";
     log(msg);
     },
   _setBody:function _setBody__Kb(){
     $('body').keypress(function(event) {
       Kb._bugEvent(event);
       if ( event.which == 13 ) {
          //event.preventDefault();
        }
       if ( event.keyCode == 114 ) {//f3
         Pg.searchFocus();
         event.preventDefault();
         return;
       }
       if ( event.keyCode == 33 ) {//pgup
         Db.PageUp();
         event.preventDefault();
         return;
       }
       if ( event.keyCode == 34 ) {//pgdn
         Db.PageDown();
         event.preventDefault();
         return;
       }
       //114 F3
        //me.xTriggered++;
        //var msg = "Handler for which:"+event.which+" keyCode"+event.keyCode+" .keypress() called " + me.xTriggered + " time(s).";
     });
     }
   };
//________________________________________________e Keyboard
// Page
 window.Pg={//Page
   style:{
     input:{
       bgc:'#000000',
       color:'#cccccc',
       radius:'4px',
       border:'1px solid #222244',
       hover:{
         bgc:'#111122',
         color:'#eeeeee',
         border:'1px solid #444455'
       },
       active:{
         bgc:'#111122',
         color:'#eeeeee',
         border:'1px solid #444455'
       },
       focus:{
         bgc:'#111122',
         color:'#eeeeee',
         border:'1px solid #444455'
       },
     },
     a:{
       color:'#4A52C2',
       link:{
         color:'#4A52C2',
       },
       hover:{
         color:'#6167C1',
       },
       visited:{
         color:'#6167C1',
       },
     }
     },
   _css:function _css__Pg(){
     var me=window.Pg;
     var st=me.style;
     var s='';
     var END='}'+"\n";
     var BEG=function(s){
       return s+'{';
     };
     var AND=function(s){
       return s+',';
     };
     var RAD=function(r){
       var s='';
       s+="-webkit-border-radius:"+r+";";
       s+="-moz-border-radius:"+r+";";
       s+="border-radius:"+r+";";
       return s;
     };
     s+=AND("input[type='text']");
     s+=AND("input[type='submit']");
     s+=AND("input[type='button']");
     s+=BEG("button");
     s+="background-color:"+st.input.bgc+";";
     s+="color:"+st.input.color+";";
     s+="border:"+st.input.border+";";
     s+=RAD(st.input.radius);
     s+=END;
     //
     s+=AND("input[type='text']:hover");
     s+=AND("input[type='submit']:hover");
     s+=AND("input[type='button']:hover");
     s+=BEG("button");
     s+="background-color:"+st.input.hover.bgc+";";
     s+="color:"+st.input.hover.color+";";
     s+="border:"+st.input.hover.border+";";
     s+=END;
     //
     s+=AND("input[type='text']:active");
     s+=AND("input[type='submit']:active");
     s+=AND("input[type='button']:active");
     s+=BEG("button");
     s+="background-color:"+st.input.active.bgc+";";
     s+="color:"+st.input.active.color+";";
     s+="border:"+st.input.active.border+";";
     s+=END;
     //
     s+=AND("input[type='text']:focus");
     s+=AND("input[type='submit']:focus");
     s+=AND("input[type='button']:focus");
     s+=BEG("button");
     s+="background-color:"+st.input.focus.bgc+";";
     s+="color:"+st.input.focus.color+";";
     s+="border:"+st.input.focus.border+";";
     s+=END;
     s+=BEG("a");
     s+="color:#4A52C2;";
     s+=END;
     s+=BEG("a:link");
     s+="color:#4A52C2;";
     s+=END;
     s+=BEG("a:hover");
     s+="color:"+st.a.hover.color+";";
     s+=END;
     s+=BEG("a:visited");
     s+="color:"+st.a.visited.color+";";
     s+=END;
     //
     s+=AND(".clickMenu");
     s+=BEG(".stationaryClickMenu");
     s+="outline:0;";
     s+=END;
     s+=BEG("ul.clickMenu");
     s+="padding:2px;";
     //s+="background-color:#f0f0f0;";
     s+="background-color:#000000!important;";
     s+="border:"+st.input.active.border+"!important;";
     s+=RAD("5px");
     s+=END;
     s+=BEG("ul.clickMenu li");
     //s+="padding:2px 20px;";
     //s+="padding:2px 26px!important;";
     //s+="color:#000;";
     s+="color:#cccccc!important;";
     //s+="border:1px solid #f0f0f0;";
     //s+="border:"+st.input.border+"!important;";
     s+="border:1px solid #111111!important;";
     s+=RAD("3px");
     s+=END;
     s+=BEG("ul.clickMenu li:hover");
     //s+="border:1px solid #aecff7;";
     //s+="background-color:#e6edf6;";
     s+="background-color:"+st.input.active.bgc+"!important;";
     s+="border:"+st.input.active.border+"!important;";
     s+=END;
     s+=BEG("ul.clickMenu li.subMenuClickItem");
     //s+="background-image:url('data:image/gif;base64,R0lGODlhBAAHAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///ywAAAAABAAHAAAIEgBR/BuIQuC/ggIRKjxo0OC/gAA7')!important;";
     //arrow
     s+="background-image:url('data:image/gif;base64,R0lGODlhBAAHAIAAAP///9fX1yH5BAEHAAAALAAAAAAEAAcAAAIIDB4GaeyrFCgAOw==')!important;";
     //s+="background-repeat:no-repeat;";
     s+="background-position:right 3px center!important;";
     s+=END;
     s+=BEG("li.clickItemSelected");
     //s+="background-image:url('data:image/gif;base64,R0lGODlhCQALAMQAAAAAAP///ycsqgwSoRIYojQ6sEBHtERJt1BWu1NZvG1yxnd8ynh9ykFJtnJ5yJOY1K603s7S6r/F5crP6f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAJAAsAAAUpICWO1KKQYjRIKNUkrbS2BUwdjQjN1DMgFIFNZBgQeKLJcThiIEkOVAgAOw==');";
     //check
     s+="background-image:url('data:image/gif;base64,R0lGODlhCQALAMQAAFxn7V1n8lRd109YyktWvkhTvUdPukNLrkJKqzk/kDc/jDU8hiowayAnTxkgPhUbNBQYL////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABEALAAAAAAJAAsAAAUqYCSO0ZKQIhQ4aFQgrbO2AxwZhdjMERMcEYFNRAgYWaMHADAcLXgoBSoEADs=')!important;";
     s+="background-repeat:no-repeat;";
     s+="background-position:left 4px center!important;";
     s+=END;
     s+=BEG("ul.stationaryClickMenu");
     s+="margin:0;";
     s+="padding:2px;";
     //s+="background-color:#f0f0f0;";
     s+="background-color:#000000!important;";
     s+="border:"+st.input.active.border+"!important;";
     s+=RAD("5px");
     s+=END;
     s+=BEG("ul.stationaryClickMenu li");
     s+="padding:2px 20px;";
     //s+="color:#000;";
     s+="color:#cccccc!important;";
     s+="border:1px solid #111111!important;";
     s+=RAD("3px");
     s+=END;
     s+=AND("ul.stationaryClickMenu li:hover");
     s+=BEG("ul.stationaryClickMenu li.clickItemNavigated");
     s+="border:"+st.input.active.border+"!important;";
     s+="color:#eeeeee!important;";
     //s+="background-color:#e6edf6;";
     s+="background-color:"+st.input.active.bgc+"!important;";
     s+=END;
     s+=BEG("body");
     //s+="background-color:#000000!important;";
     //s+="color:#aaaaaa!important;";
     s+=END;
     return s;
     },
   _writeCss:function _writeCss__Pg(){
     var me=window.Pg;
     var s=me._css();
     if (typeof me._writeCss.done!=Us) {
       return;
     }
     me._writeCss.done=true;
     Uf.addGlobalStyle(s);
     },
   _hookAbout:function _hookAbout__Pg(){
     var o=$("a[href='../../about']");
     if (o.length!=1) {
       loge('not found');
       return;
     }
     o=o.parent();
     var s='';
     s+='<a';
     s+=' id="myabout"';
     s+=' class="menuLink"';
     s+=' wicket:id="linkid"';
     s+='>';
     s+='<span';
     s+=' class="menuText"';
     s+=' wicket:id="linktext"';
     s+='>';
     s+='About';
     s+='</span>';
     s+='</a>';
     o.html(s);
     o=$('#myabout');
     o.bind('click',window.Cb.about);
     },
   init:function init__Pg(){
     var me=window.Pg;
     me._writeCss();
     me._hookAbout();
     },
   searchFocus:function searchFocus__Pg(){
     $('search').get(0).focus();
     }
   };
//________________________________________________e Page
// Menu
 window.Mn={//Menu
   div:null,
   timeout:500,
   _closeTimer:0,
   _ddMenuItem:0,
   cls:{
     menuitem:'menuitem',
     menuparent:'menuparent',
     menucontainer:'menucontainer'
     },
   style:{
     zindex:'9998',
     divider:{
       color:'#333333'
     },
     item:{
       disabled:{
         color:'#444444',
         bgc:'#111111'
       },
       hover:{
         color:' #FFFFFF',
         bgc:'#000033'
       },
       padding:' 5px 10px',
       color:'#666666',
       font:' 11px arial'
     },
     div:{
       margin:'0',
       padding:'0',
       bgc:'#000000',
       border:'1px solid #222222'
     },
     baritem:{
       margin:'0 1px 0 0',
       padding:'5px 0px 4px',
       width:'60px',
       divider:{
         width:'1px',
         color:'#222222',
         style:'solid'
       },
       color:'#666666',
       font:'12px sans-serif'
     }
     },
   _itemMouseOver:function _itemMouseOver__Mn(){
     //event handler
     var me=window.Mn;
     if(me._closeTimer){
       window.clearTimeout(me._closeTimer);
       me._closeTimer = null;
     }
     var o=$(this);//tag a
     // o=o.next();
     // log('o.length:'+o.length);
     // if (o.length==0) {
     //   if(me._ddMenuItem) me._ddMenuItem.style.visibility = 'hidden';
     //   me._ddMenuItem = 0;
     // }
     },
   _itemOpen:function _itemOpen__Mn(o){
     var me=window.Mn;
     me._itemMouseOver();
     if(me._ddMenuItem) me._ddMenuItem.style.visibility = 'hidden';
     me._ddMenuItem = o;
     me._ddMenuItem.style.visibility = 'visible';
     },
   _mouseOver:function _mouseOver__Mn(){
     //event handler
     var me=window.Mn;
     //var s=this.id.substring(1);
     var o=$(this);//tag a
     o=o.next();
     //alert(s);
     me._itemOpen(o.get(0));
     },
   _mouseOut:function _mouseOut__Mn(){
     //event handler
     var me=window.Mn;
     me._closeTimer = window.setTimeout(me._itemClose, me.timeout);
     },
   _itemClick:function _itemClick__Mn(event){
     //event handler
     var me=window.Mn;
     var it=$(this);
     var cmd=it.attr('cmd');
     if (cmd) {
       eval(cmd);
     }
     return;
     },
   _itemClose:function _itemClose__Mn(){
     var me=window.Mn;
     if(me._ddMenuItem) me._ddMenuItem.style.visibility = 'hidden';
     },
   _docClick:function _docClick__Mn(){
     var me=window.Mn;
     me._itemClose();
     },
   _bindDoc:function _bindDoc__Mn(){
     var me=window.Mn;
     if (typeof me._bindDoc.done==Us) {
       document.addEventListener('click',me._docClick);
       me._bindDoc.done=true;
     }
     },
   _bindEvents:function _bindEvents__Mn(){
      var me=window.Mn;
      me._bindDoc();
      var mis=$('a.'+me.cls.menuitem);
      mis.bind('click',me._itemClick);
      mis.bind('mouseover',me._itemMouseOver);
      mis.bind('mouseout',me._mouseOut);
      var mps=$('a.'+me.cls.menuparent);
      mps.bind('mouseover',me._mouseOver);
      mps.bind('mouseout',me._mouseOut);
      var mcs=$('a.container');
      mcs.bind('mouseover',me._itemMouseOver);//sic
      mcs.bind('mouseout',me._mouseOut);//sic
     },
   _html:function _html__Mn(o,root){
      var me=window.Mn;
      var s='';
      for (i in o) {
        var j=o[i];
        if (j.cmd) {
          if (root) {
            s+='<li>';
          }
          s+='<a';
          s+=' cmd="'+j.cmd+'"';
          if (j.cls) {
            s+=' class="'+j.cls+' '+me.cls.menuitem+'"';
          }else{
            s+=' class="'+me.cls.menuitem+'"';
          }
          s+='>';
          s+=i;
          s+='</a>';
          if (root) {
            s+='</li>';
          }
        }else{//no cmd
          if (root) {
            s+='<li>';
            s+='<a class="'+me.cls.menuparent+'">';
            s+=i;
            s+='</a>';
            s+='<div class="'+me.cls.menucontainer+'">';
            s+=me._html(j,false);
            s+='</div>';
          }else{
            s+='<a';
            if (j.cls) {
              s+=' class="'+j.cls+' '+me.cls.menuitem+'"';
            }else{
              s+=' class="'+me.cls.menuitem+'"';
            }
            s+='>';
            s+=i;
            s+='</a>';
          }
        }
      }
      return s;
     },
   _css:function _css__Mn(){
     var me=window.Mn;
     var s='';
     var END='}'+"\n";
     var BEG=function(s){
       return s+'{';
     };
     var AND=function(s){
       return s+',';
     };
     var id='#sddm';
     s+=BEG(id);
     s+='margin: 0;';
     s+='padding: 0;';
     s+='z-index:'+me.style.zindex+';';
     s+=END;
     s+=BEG(id+' li');
     s+='margin: 0;';
     s+='padding: 0;';
     s+='list-style: none;';
     s+='float: left;';
     s+='font:'+me.style.baritem.font+';';
     //s+='font-weight:normal!important;';
     s+='cursor:pointer;';
     s+=END;
     s+=BEG(id+' li:first-child a');
     s+='border-left:'+me.style.baritem.divider.width+' '+me.style.baritem.divider.style+' '+me.style.baritem.divider.color+';';
     s+=END;
     s+=BEG(id+' li a');
     s+='display: block;';
     s+='margin:'+me.style.baritem.margin+';';
     //s+='padding-top: 5px;';
     //s+='padding-bottom: 4px;';
     s+='padding:'+me.style.baritem.padding+';';
     s+='width:'+me.style.baritem.width+';';
     s+='border-right:'+me.style.baritem.divider.width+' '+me.style.baritem.divider.style+' '+me.style.baritem.divider.color+';';
     s+='color:'+me.style.baritem.color+';';
     s+='text-align: center;';
     s+='text-decoration: none;';
     //s+='font-weight:normal!important;';
     s+='font:'+me.style.baritem.font+';';
     s+='cursor:pointer;';
     s+=END;
     s+=BEG(id+' li a:hover');
     s+=END;
     s+=BEG(id+' div');
     s+='position: absolute;';
     s+='visibility: hidden;';
     s+='margin:'+me.style.div.margin+';';
     s+='padding:'+me.style.div.padding+';';
     s+='background-color:'+me.style.div.bgc+';';
     s+='border:'+me.style.div.border+';';
     s+=END;
     s+=BEG(id+' div a');
     s+='position: relative;';
     s+='display: block;';
     s+='margin: 0;';
     s+='padding:'+me.style.item.padding+';';
     s+='width: auto;';
     s+='white-space: nowrap;';
     s+='text-align: left;';
     s+='text-decoration: none;';
     s+='color:'+me.style.item.color+';';
     s+='font:'+me.style.item.font+';';
     s+=END;
     //s+='#nav li:hover,';
     //s+='#nav a.menuLink:hover span.menuText:hover,';
     s+=AND(id+' li a:hover');
     s+=BEG(id+' div a:hover');
     s+='background-color:'+me.style.item.hover.bgc+';';
     //s+='background-image:none!important;';
     s+='color:'+me.style.item.hover.color+';';
     s+=END;
     s+=BEG(id+' div a.disabled');
     s+='background-color:'+me.style.item.disabled.bgc+';';
     s+='color:'+me.style.item.disabled.color+';';
     s+='cursor:default!important;';
     s+=END;
     s+=BEG(id+' div a.divided');
     s+='border-top:1px solid '+me.style.divider.color+';';
     s+=END;
     return s;
     },
   _draw:function _draw__Mn(){
     var me=window.Mn;
     var div=me.div;
     var s='';
     var o=me.menuObj();
     s=s+'<ul id="sddm">';
     s=s+me._html(o,true);
     s=s+'</ul>';
     s=s+'<div style="clear:both"></div>';
     div.innerHTML=s;
     me._bindEvents();
     },
   _writeCss:function _writeCss__Mn(){
     var me=window.Mn;
     var s=me._css();
     if (typeof me._writeCss.done!=Us) {
       return;
     }
     me._writeCss.done=true;
     Uf.addGlobalStyle(s);
     },
   init:function init__Mn(){
     var me=window.Mn;
     if (typeof me.init.done!=Us) {
       return;
     }
     me.init.done=true;
     me._writeCss();
     },
   Redraw:function Redraw__Mn(){
     var me=window.Mn;
     me._draw();
     },
   Make:function Make__Mn(){
     var me=window.Mn;
     me.init();
     var div;
     var s='';
     s+='<div';
     s+=' id="Tools"';
     s+=' style="';
     s+=' width:500px;';
     s+=' position:absolute;';
     s+=' left:310px;';
     s+=' top:0px;';
     s+=' z-index:9998;';
     s+=' border-left:1px solid #000000;';
     s+='"';
     s+='></div>';
     $('body').append(s);
     div=$('div#Tools').get(0);
     me.div=div;
     me._draw();
     return div;
     },
   cmdHome:function cmdHome__Mn(){
     //http://webbrain.com/brainpage/brain/C8F73857-2A43-4E9E-255E-3C09E942BFF5
     //location.href=Lm._l_raw()+'#-1';
     },
   cmdViewPlex:function cmdViewPlex__Mn(){
     Db.ShowPlex();
     },
   cmdViewDest:function cmdViewDest__Mn(){
     Db.ShowDestination();
     },
   cmdViewBoth:function cmdViewBoth__Mn(){
     Db.ShowBoth();
     },
   cmdCloneTab:function cmdCloneTab__Mn(){
     //_newtab
     window['open'](location.href, "_newtab","");
     },
   cmdCloneDestTab:function cmdCloneDestTab__Mn(){
     //_newtab
     window['open'](Lw.LinkUrl(), "_newtab","");
     },
   cmdHideDest:function cmdHideDest__Mn(sh){
     Lw.HeaderShowHide(sh,true);
     Lw.DetailsShowHide(sh,true);
     },
   cmdHideDestHeader:function cmdHideDestHeader__Mn(sh){
     Lw.HeaderShowHide(sh,true);
     },
   cmdHideDestDetails:function cmdHideDestDetails__Mn(sh){
     Lw.DetailsShowHide(sh,true);
     },
   cmdCloseAllOpenTips:function cmdCloseAllOpenTips__Mn(){
      $('.slideOutTip.isOpened').trigger('slideIn');
     },
   cmdOpenAllTips:function cmdOpenAllTips__Mn(){
      $('.slideOutTip').trigger('slideOut');
     },
   cmdShowOverlay:function cmdShowOverlay__Mn(){
     window.closebox.display();
     },
   menuObj:function menuObj__Mn(){
      var o={
        'Home':{cmd:'Mn.cmdHome();'},
        'View':{
          'Plex':{cmd:'Mn.cmdViewPlex();'},
          'Destination':{cmd:'Mn.cmdViewDest();'},
          'Both':{cmd:'Mn.cmdViewBoth();'},
          'Toggle Destination':{cmd:'Mn.cmdHideDest();',cls:'divided'},
          'Toggle Destination Header':{cmd:'Mn.cmdHideDestHeader();',cls:'divided'},
          'Toggle Destination Details':{cmd:'Mn.cmdHideDestDetails();'}
         },
        'Window':{
          'Clone as Tab':{cmd:'Mn.cmdCloneTab();'},
          'Clone Destination as Tab':{cmd:'Mn.cmdCloneDestTab();'}
         },
         'Help':{cmd:'Mn.cmdShowOverlay()'},
         'Contact':{cmd:'void(0)'}
      };
      // if (ifr) {
      //   if (ifr.the_src==null) {
      //     o['Window']['Clone Destination as Tab'].cls='disabled';
      //     delete o['Window']['Clone Destination as Tab'].cmd;
      //   }
      // }
      return o;
     }
   };
//________________________________________________e Menu
// Lower
 window.Lw={// Lower
   lower_qs:'',
   lower_in_qs:'',
   lower_in_in_qs:'',
   title_qs:'',
   history_bu_qs:'',
   edit_bu_qs:'',
   clr1_div_qs:'',
   links_div_qs:'',
    links_div_in_qs:'',
     links_div_in_in_qs:'',
      links_div_in_in_img_qs:'',//icon
     links_div_in_in2_qs:'',
   clr2_div_qs:'',
   html_div_qs:'',
   clr3_div_qs:'',
   iframe0_qs:'',
   init:function init__Lw(){
     var me=window.Lw;
     me.lower_qs='div#contentContainer>div:eq(2)';
     me.lower_in_qs=me.lower_qs+'>div';
     me.lower_in_in_qs=me.lower_in_qs+'>div.GGD0W3FBKT';
     me.title_qs=me.lower_in_in_qs+'>div.GGD0W3FBGU';
     me.history_bu_qs=me.lower_in_in_qs+'>button.GGD0W3FBPT';
     me.edit_bu_qs=me.lower_in_in_qs+'>button.GGD0W3FBNT';
     me.clr1_div_qs=me.lower_in_in_qs+'>div:eq(1)';
     me.links_div_qs=me.lower_in_in_qs+'>div.GGD0W3FBGT';
      me.links_div_in_qs=me.links_div_qs+'>div.GGD0W3FBHM';
       me.links_div_in_in_qs=me.links_div_in_qs+'>div.GGD0W3FBEM';
        me.links_div_in_in_img_qs=me.links_div_in_qs+'>img.gwt-Image';
        ///http://webbrain.com/icon/?favicon=tzo.net-favicon.png&maxWidth=32&maxHeight=32&match=true
       me.links_div_in_in2_qs=me.links_div_in_qs+'>div:eq(1)';
        me.links_div_in_in2_pagetitle_qs=me.links_div_in_in2_qs+'>div.GGD0W3FBGM';
        me.links_div_in_in2_link_qs=me.links_div_in_in2_qs+'>div.GGD0W3FBFM';
     me.clr2_div_qs=me.lower_in_in_qs+'>div:eq(3)';
     me.html_div_qs=me.lower_in_in_qs+'>div.gwt-HTML';
     me.clr3_div_qs=me.lower_in_in_qs+'>div:eq(5)';
     me.iframe0_qs=me.lower_in_in_qs+'>iframe';
     setTimeout(function(){$(me.lower_qs).css('background-color','#000000').css('color','#aaaaaa');},3000);

     },
   _pushDisplaySlide:function _pushDisplaySlide__Lw(o,d,fn){
     // o, display val, for those not
     var c=o.css('display');
     if (c==fn) {
       return;
     }
     o.attr('PDisplay',o.css('display'));
     o.slideUp();
     //o.css('display',d);
     },
   _popDisplaySlide:function _popDisplaySlide__Lw(o,d,f){
     // o, display val, for where prev
     var p=o.attr('pdisplay');
     //log('p:'+p);
     if (typeof p==Us) {
       return;
     }
     if (typeof f!=Us) {
       if (p!=f) {
         //return;
       }else{
       //ok
       }
     }else{
       //ok
     }
     if (p!='none') {
       //o.css('display',p);
       o.slideDown(400,function(){$(this).css('display',p)});
       o.removeAttr('pdisplay');
     }else{
       o.slideUp();
       o.removeAttr('pdisplay');
     }
     },
   _pushDisplay:function _pushDisplay__Lw(o,d,fn){
     // o, display val, for those not
     var c=o.css('display');
     if (c==fn) {
       return;
     }
     o.attr('PDisplay',o.css('display'));
     o.css('display',d);
     },
   _popDisplay:function _popDisplay__Lw(o,d,f){
     // o, display val, for where prev
     var p=o.attr('pdisplay');
     //log('p:'+p);
     if (typeof p==Us) {
       return;
     }
     if (typeof f!=Us) {
       if (p!=f) {
         //return;
       }else{
       //ok
       }
     }else{
       //ok
     }
     if (typeof d==Us) {
       o.css('display',p);
       o.removeAttr('pdisplay');
     }else{
       o.css('display',d);
       o.removeAttr('pdisplay');
     }
     },
   _hdrItems:function _hdrItems__Lw(){
     var me=window.Lw;
     var a=[];
     a[a[L]]=$(me.title_qs);
     a[a[L]]=$(me.history_bu_qs);
     a[a[L]]=$(me.edit_bu_qs);
     //a[a[L]]=$(me.clr1_div_qs);
     a[a[L]]=$(me.links_div_qs);
     //a[a[L]]=$(me.clr2_div_qs);
     return a;
     },
   _headerShowing:function _headerShowing__Lw(){
     var me=window.Lw;
     return $(me.title_qs).css('display')!='none';
     },
   _detailsShowing:function _detailsShowing__Lw(){
     var me=window.Lw;
     return $(me.html_div_qs).css('display')!='none';
     },
   _checkPadding:function _checkPadding__Lw(){
     var me=window.Lw;
     if ((!me._headerShowing())&&(!me._detailsShowing())) {
       $(me.lower_in_in_qs).css('padding','0px');
       Port.MainFocus();
     }else{
       $(me.lower_in_in_qs).css('padding','5px');
     }
     },
   HeaderShowHide:function HeaderShowHide__Lw(sh,fx){
     fx=(typeof fx==Us)?false:true;
     var me=window.Lw;
     var t=$(me.title_qs);
     var disp=t.css('display')!='none'?'none':'';
     //log('disp:"'+disp+'"');
     var a=me._hdrItems();
     if (typeof sh==Us) {
     }else if (sh==true) {
       disp='';
     }else if (sh!=true) {
       disp='none';
     }
     if (disp=='none') {
       var x;
       for (x=0;x<a[L];x++) {
         if (fx) {
           me._pushDisplaySlide(a[x],disp,disp);
         }else{
           me._pushDisplay(a[x],disp,disp);
         }
       }
     }else{
       for (x=0;x<a[L];x++) {
         if (fx) {
           me._popDisplaySlide(a[x]);
         }else{
           me._popDisplay(a[x]);
         }
       }
     }
     setTimeout(me._checkPadding,500);
     },
   DetailsShowHide:function DetailsShowHide__Lw(sh,fx){
     fx=(typeof fx==Us)?false:true;
     var me=window.Lw;
     var t=$(me.html_div_qs);
     var disp=t.css('display')!='none'?'none':'';
     //log('disp:"'+disp+'"');
     var a=me._hdrItems();
     if (typeof sh==Us) {
     }else if (sh==true) {
       disp='';
     }else if (sh!=true) {
       disp='none';
     }
     if (disp=='none') {
       if (fx) {
         me._pushDisplaySlide(t,disp,disp);
       }else{
         me._pushDisplay(t,disp,disp);
       }
     }else{
       if (fx) {
         me._popDisplay(t);
       }else{
         me._popDisplaySlide(t);
       }
     }
     setTimeout(me._checkPadding,500);
     },
   LinkUrl:function LinkUrl__Lw(x){
     var me=window.Lw;
     var o=$(me.links_div_in_in2_link_qs);
     if (o.length==0) {
       return '';
     }
     return o.html();
     },
   PutSpinner:function PutSpinner__Lw(yn){
     var me=window.Lw;
        //logi('');
        if (yn==true) {
          if ($('#lowerspinner').length==0) {
            return;
          }
          $('#lowerspinner').remove();
          return;
        }
        if ($('#lowerspinner').length!=0) {
          return;
        }
        var tt=$(me.lower_qs).offset().top;
        var ll=$(me.lower_qs).width();
        ll=ll/2;
        ll=ll-16;
        var url="http://iis.mra.tzo.net/images/spinner.gif";
        var s='';
        s+='<div id="lowerspinner"';
        s+=' style="position:absolute;';
        s+='left:'+ll+'px;';
        s+='top:'+tt+'px;';
        s+='z-index:10000;';
        s+='width:32px;';
        s+='height:16px;';
        s+="background-image:url('"+url+"');";
        s+='"';
        s+="></div>";
        //prompt('',s);
        $('body').append(s);
     },
   };
//________________________________________________e Lower
// Location Monitor
 window.Lm={//Location Monitor
   curl:null,
   purl:null,
   doit_i:null,
   curl_chk_i:null,
   doit_to:1500,
   _l_trim:function _l_trim__Lm(l){
     var me=window.Lm;
     if (typeof l==Us) {
       l=location.href;
     }
     var s=l;
     s=s.split('?')[0];
     return s;
     },
   _l_raw:function _l_raw__Lm(s){
     var me=window.Lm;
     if (typeof s==Us) {
       s=location.href;
     }
     s=me._l_trim(s);
     if (s.indexOf('#')==-1) {
       return s;
     }
     return s.split('#')[0];
     },
   _l_brain:function _l_brain__Lm(s){
     var me=window.Lm;
      s=me._l_raw(s);
      var a=s.split('/');
      var n=a[a[L]-1];
      return n;
     },
   _l_pageno:function _l_pageno__Lm(s){
     var me=window.Lm;
     if (typeof s==Us) {
       s=location.href;
     }
     s=me._l_trim(s);
     if (s.indexOf('#')==-1) {
       return '1';
     }
     var a=s.split('#');
     var b=a[1];
     var c=b.substr(1);
     return c;
     },
   _curl_chk:function _curl_chk__Lm(){
     var me=window.Lm;
     var chg=false;
     var l=me._l_trim();
     if (me.curl!=l) {
       chg=true;
       me.purl=me.curl;
       me.curl=l;
     }
     if (chg) {
       me._call_doit();
     }
     },
   _call_doit:function _call_doit__Lm(){
     var me=window.Lm;
     if (me.doit_i!=null) {
       clearTimeout(me.doit_i);
       me.doit_i=null;
     }
     me.doit_i=setTimeout(me._doit,me.doit_to);
     },
   _doit:function _doit__Lm(){
     var me=window.Lm;
     //alert()
     Port.MainKill();
     Port.MakeMain();
     },
   init:function init__Lm(){
     var me=window.Lm;
     me.curl_chk_i=setInterval(me._curl_chk,500);
     }
   };
//________________________________________________e Lower
// Port
 function Port(url){
   this.the_div=null;//qo
   this.the_frame=null;//el
   this.id=Port.pfx+Port.ct;
   this.url=url;
   this._running=false;
   this._adj_interval=0;
   Port.ct++;
   //Port.Ports[Port.Ports[L]]=this;
   Port.Ports[this.id]=this;
  }
  //Static
   Port.ct=0;
   Port.Main=null;//First
   Port.Ports={};
   Port._baseurl=null;
   Port.IFRAME_SCROLL_H=500;
   Port.pfx='Port';
  //Methods
   Port.prototype._div_html=function _div_html__Port(){
     var s='<div id='+this.id+' style="width:100%;height:'+Port.IFRAME_SCROLL_H+"px"+';background-color:#FFFFFF;color:#555555;"></div>';
     return s;
     }
   Port.prototype._div_make=function _div_make__Port(){
     var s=this._div_html();
     var d=$(Lw.lower_qs);
     d.append(s);
     this.the_div=$('#'+this.id);
     return this.the_div;
     }
   Port.prototype._div_get=function _div_get__Port(){
     if (!this.the_div) {
       this._div_make();
     }
     return this.the_div;
     }
   Port.prototype._div_remove=function _div_remove__Port(){
     if (this.the_div==null) {
       return;
     }
     this.the_div.remove();
     this.the_div=null;
     }
   Port.prototype._fheight=function _fheight__Port(){
     var s=location.href;
     //#-nn?eee=hh
     if (s.indexOf('?')==-1) {
       return null;
     }
     s=s.split('?')[1];
     if (s.substr(0,this.id.length+1)==this.id+'=') {
       s=s.replace(this.id+'=','');
       return parseInt(s);
     }
     return null;
     }
   Port.prototype.Make=function Make__Port(){
     var div=this._div_get();
     div=div.get(0);
     if (div==null) {
       log('ifr.make_main:@null div');
     }
     //log('ifr.make_main:p_list(div):'+p_list(div));
     //log('ifr.make_main:@1');
     var el=document.createElement('iframe');
     el.src=this.url;
     //el.id='yas';
     //Lm._l_brain();
     var nn='webbrain'+Lm._l_brain()+'-'+Lm._l_pageno()+'-'+this.id;
     //alert(nn);
     //el.name="mainframe"+Lm._l_pageno();
     el.name=nn;
     el.style.width="100%";
     el.style.height="2000px";
     el.border="0px";
     el.scrolling="no";
     div.appendChild(el);
     //window['Div'+IFRAME_DIV_NAME]=el;
     this.the_frame=el;
     var oo=$(el);
     var that=this;
     oo.bind('load',function(){Lw.PutSpinner(true);Mn.cmdHideDest(false);Port.MainFocus();window.Fi.Check(that.url)});
     this._run();
     }
   Port.prototype._stop=function _stop__Port(){
     if (!this._running) {
       return;
     }
     this._running=false;
     if (this._adj_interval!=0) {
       clearTimeout(this._adj_interval);
       this._adj_interval=0;
     }
     }
   Port.prototype._run=function _run__Port(){
     if (this._running) {
       return;
     }
     this._running=true;
     if (this._adj_interval==0) {
       var that=this;
       this._adj_interval=setInterval(function (){
         if (!that._running) {
           return;
         }
         var h=that._fheight();
         if (h==null) {
           return;
         }
         log('h:'+h);
         var el=that.the_frame;//window['Div'+IFRAME_DIV_NAME];
         if (el==null) {
           return;
         }
         el.style.height=h+'px';
         location.href=Port._baseurl;
       },100);
     }
     }
   Port.prototype.Remove=function Remove__Port(){
     this._stop();
     this._div_remove();
     }
   Port.prototype.MarginTop=function MarginTop__Port(ny){
     if (this.the_div==null) {
       return;
     }
     if (ny) {
       this.the_div.css('margin-top','5000px');
     }else{
       this.the_div.css('margin-top','');
     }
     }
  //Static Methods
   Port._baseurl_set=function _baseurl_set__Port(){
     Port._baseurl=Lm._l_trim();//location.href;
     }
   Port.Remove=function Remove__Port(port){
     var p;
     if (typeof port=='string') {
       p=Port.Ports[port];
     }else if (typeof port=='object') {
       p=port;
     }
     if (typeof p==Us) {
       loge('p==Us');
       return;
     }
     p.Remove();
     }
   Port.RemoveAll=function RemoveAll__Port(){
     var i;
     for (i in Port.Ports) {
       var p=Port.Ports[i];
       Port.Remove(p)
     }
     }
   Port.Make=function Make__Port(l){
     var p=new Port(l);
     return p;
     }
   Port.MakeTab=function MakeTab__Port(){
     var url=Lw.LinkUrl(0);
     if (url=='') {
       return;
     }
     window['open'](url, "_newtab","");
     //http://jira.mra.tzo.net/secure/ManageRapidViews.jspa##
     }
   Port.MakeMain=function MakeMain__Port(){
     //logi('00000');
     var url=Lw.LinkUrl(0);
     //logi('url:'+url);
     if (url=='') {
       if (typeof Port.MakeMain.tryct==Us) {
         Port.MakeMain.tryct=4;
       }else{
         Port.MakeMain.tryct--;
         if (Port.MakeMain.tryct<0) {
           return;
         }
       }
       setTimeout(Port.MakeMain,1000);
       return;
     }
     delete Port.MakeMain.tryct;
     if (url.indexOf("##")!=-1) {
       // var ans=confirm('This Page needs to be opened in a new tab to function, do so?');
       // if (ans) {
       //   window['open'](url, "_newtab","");
       // }
     }else{
       Port.MakePort();
     }
     //http://jira.mra.tzo.net/secure/ManageRapidViews.jspa##
     }
   Port.MainKill=function MainKill__Port(){
     Port.RemoveAll();
     Port.Main=null;
     }
   Port.MakePort=function MakePort__Port(){
     try{
       Port.MainKill();
       var url=Lw.LinkUrl(0);
       Port._baseurl_set();
       if (url=='') {
         Lw.HeaderShowHide(false);
         //Port._baseurl_set();
         return;
       }
       var p=Port.Make(url);
       //Mn.cmdHideDest(false);
       p.Make();
       Port.Main=p;
       Lw.PutSpinner();
     }catch (e){
       log('exception:'+e.description);
     }
     }
  Port.MarginMain=function MarginMain__Port(ny){
    if (Port.Main==null) {
      return;
    }
    Port.Main.MarginTop(ny);
    }
  Port.MainFocus=function MainFocus__Port(ny){
    if (Port.Main==null) {
      return;
    }
    if (Port.Main.the_frame==null) {
      return;
    }
    Port.Main.the_frame.focus();
  }
//________________________________________________e Port
// FavIcon
 window.Fi={//FavIcon
   map:{
     'bam.mra.tzo.net':Con.Icons_Url+'bamboo32.png',
     'jira.mra.tzo.net':Con.Icons_Url+'jira32.png',
     },
   _baseIcon:function _baseIcon__Fi(url,ext){
     ext=(typeof ext==Us)?'ico':ext;
     var a=url.split('/');
     var s='';
     for (x=0;x<3;x++) {
       s=s+a[x]+'/';
     }
     return s+'favicon.'+ext;
     },
   _deleteLink:function _deleteLink__Fi(){
     var head=document.getElementsByTagName("head")[0];
     var links = head.getElementsByTagName("link");
     for (var i=0; i<links.length; i++) {
       var link = links[i];
       if (link.type=="image/x-icon" && link.rel=="shortcut icon") {
         head.removeChild(link);
         return; // Assuming only one match at most.
       }
     }
     },
   _addLink:function _addLink__Fi(url){
     var me=window.Fi;
     var link = document.createElement("link");
     link.type = "image/x-icon";
     link.rel = "shortcut icon";
     link.href = url;
     me._deleteLink();
     var head=document.getElementsByTagName("head")[0];
     head.appendChild(link);
     },
   set:function set__Fi(url,title){
     var me=window.Fi;
     log('url:'+url);
     if (title) {
       document.title = title;
     }
     me._addLink(url);
     },
   Check:function Check__Fi(url){
     //log(url);
     var uri=Uf.parseUri(url);
     //log('uri.host:'+uri.host);
     var me=window.Fi;
     if (typeof me.map[uri.host]!=Us) {
       me.set(me.map[uri.host]);
     }else{
       me.set(me._baseIcon(url));
     }
     }
   };
//________________________________________________e FavIcon
// Closebox
window.Cb={
  id:'Closebox',
  classname:'CloseboxClass',
  def:{
    width:700
  },
  _the_obj:null,
  _the_obj_inner:null,
  _the_overlay_obj:null,
  _created:false,
  _css:function _css__Cb(){
     var me=window.Cb;
     var s='';
     var END='}'+"\n";
     var BEG=function(s){
       return s+'{';
     };
     var AND=function(s){
       return s+',';
     };
    s+=BEG("."+me.classname);
    s+="display:none;";
    s+="z-index:10000;";
    s+="background-color:#000;";
    s+="opacity:0.8;";
    s+="min-height:200px;";
    s+="border:2px solid #009;";
    s+="border-radius:8px;";
    s+="-moz-box-shadow:0 0 90px 5px #007;";
    s+="-webkit-box-shadow: 0 0 90px #007;";
    s+=END;
    s+=BEG("."+me.classname+" .close");
    s+="background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAQMSURBVFiF7Zi/jttGEIc/kivljgJiILk4QXyGDaQ0rk3hN3Dr3tA9QR4gTfICrlKkteAmRfIIaVOlTJMEhmHHPhuwDMe+iKTI2ZkU3L2jdJR0Jxd24QEG/L/8djSc+a0SM+N9svRdAyzbB6BN9gFok7lVFw4PDxeOJ5NJAvQ5ne2yWWe74OPxeOHzvnfv3nqgHpCMNqKus58ugfUBGaDBPSCATiYT3we2FijApEB28+Dgu6Zp7njvr6oqqKKqK59VVcwMMzsS1Z//evbsLlAHnwMN4CeTiXahNkUoAbKvb9z4XUQOvPeICGZGhFplAQYz+xLVb77a27v1YDq9DcyClwEsRrF94apKnSRJAribBwffi8i3VVUxn8/RAHQe696nqpRNc//58fEPwCvgTQCrAbFw86YIpU3T3BER6qqins/PBbIKbOjcLeCncDrmk3TvXQeUApmIXPXe471fGPyipu2Ae8CntFEpg1fhXX4TUAI4M4OQoNE+ahpyEQrnKNzZIXKRk+vzwWABCvgY+A94DQwDQx3vWVcYEyA17/FLUclFuFxVXCkKdkNORd8V4UpRcLmqGMnprxGvAyNgN8AMOC0dG4EA0hihrhXO0aQpQ1WuzWbsiODN2BHh2mzGUJUmTZn1RC9EJEYm1rLTF66BWVnwCud4kuf4JCEzY78s+aSu2S9LMjN8kvAkz3t/zg5Eb2HdupcVWcbDPKdKU3ZUuVpV7KhSpSkP85wiyzZNtHeyW0Uo2izLmA6HC+deDIfMVsMsj3sG7q26/ch7Pg+1Kab9F/M5o1AitrGtgXLvuV4UDMxokoSnOzs0ScLAjOtFQb4l1EagvkK46z37RYEzQ5KER3nOy+GQR3mOJAnOjP2iYHcLqHVA1vLYGSinykCVOk15PBpROUeWJFTO8Xg0ok5TBqq4/ubbbaa2dLxZD3WLXrQyy/hnNELSlDLLFjK/dI4noxFOlbKT3J3nz0AsTHYdS/CnZnZl4UKWnXzWfd9T7dxJL7AkOQHyZm84FWvRF+A25ZCK6i9xdts21ia0n7Jp/qDt7nXYRqgT25RD+ufR0V0R+TuqwxMt2s54pYsqokotgrb709dV9Sun4qymVY0xSucCEqB+MJ3erkTuK0wvWidU9bio69+ms9mPwL+0wuy4AyVcQDEOabvzJVot8xmtnrkE5PR0655JKW0kClrJ8RJ4AUzD8Qyoz6sYlVb3zjjN35pWz0QJsWrl0V1xREF2HCBehTHnLOXQSqDxeGxhqdKEwaBVdSWL4uo8EYqJXLIo8hvAX2TVYQEizkTCQFFcZaxeLNrSGA09yyCW6tFaoBClbq2QMNhbLxQjzIUWihEKsMlkYuHFwlnZ8NZL6Wgrv7J3Ze/dvx//A8fuj0EWiRDmAAAAAElFTkSuQmCC');";
    s+="position:absolute;";
    s+="right:-15px;";
    s+="top:-15px;";
    s+="cursor:pointer;";
    s+="height:35px;";
    s+="width:35px;";
    s+=END;
    s+=BEG("."+me.classname+" .close:hover");
    s+="background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAATMSURBVFiF7Zi9jxNHFMB/s16b24U7Du5D4j44RREFBU1Em1Q0SBFI1MdfECVKRctfkAopKfIPpAhSmiQKOoqkTgV0adDJvjPkwDZr79q7M29S7KxvbezbowkUjDTa2dn5+M2b9+a9WWWt5UNK3vsGmE4fgarSR6Cq5J+2oVJKAbMyped0sqXnRLZzzFtVmX0JpEYuUb9U9qbAZgFZQFw2gC6V3wI7EcjBeEDt0e7uff3ixV0TRduSZZjRCMkymNHfiiBaI1lGKnLQUernbw8OvgNSl0dA5qCkDFUF5AH+49u3/1bGXEs7HbIoQrIMSVNE67lA1his1hhjSLWmn6b/fDUc3gEGLicOTFtrpeg7V4ecdGqPdnfvq273Wnp4yKDVQvp9EAFrsSLzuuffraUQ8RmRK1/DvQfwgHzLId86q5Qab12VUnu63b5r4pi42URevkRZO1aMac2GSc0tm3AMbMBN4CdXVeiTLk94EpAH1HQUbaskQQYDlLV45EqgXYOGG8Rzy81cFldfd21NXl4FVtwQictD190Uk85LCvAlTZE0BRGsG2kxDPl0dZUgDInd5AVQDCy470thSMaxmZl83CVgEQhK6xkLuQrIkzTNrckBaeBiGHJ9bY3PNzdphCF9B9IHGmHIF5ubXF9b42IYoh1QsT/A2RJMneOjoxIIwBOtc4spKWg7julpzUqjwZc7O0gQcAgQhtze2WGl0aCnNYdxPJ5AGJ+SPpM7PcFQJSFVWEtR0QCiOGav1WIgggGurq8TLi9zY2ODBc9jKMJeq0UUxzRcv0LRSxAzD9ZTu44CyCdXgH4c8/D5c66ur+P5Pnc3NmgoRXs0Yu/gAOKYRTdjNmuhc073agnN6NAAFoBekvCs1+NKvU5DKVJr+f3oiE4cs+DazZhg2gdOzPPO3r4w7SGwEobcWV/nXK1GzxiejEZ8duECy0HAkGPzf5dUCWStHbuHwsoioBEE3Nre5ny9TpRl/NJuUxfhk4UFbl2+TCMIiFz7d4naq4FEchfhoDLgXBBwY2uL0Pfpa82vzSZvul2etNtYERZ9nxtbW5wLggn9OQ3YSUB53GIM1pjjCiDwfZZ8n26a8tv+PhLHXAJUkvDH/j7dNGXJ9wl8fyL2ECaGKZfHrJVWZkvnUBEMDZKEx80msdakScIi+QlXB6Ik4c9mk9D3GSQJPmA8DxGZBpopsJOALGC1tS1fZLOo8AGtNZ0oQpEfucqtvnhPk4SRa+vXakRKMRShC2+mBFacl2O4Kh2S10o91MaglcKQW1c55BuRBzeRe444dqYjz+O1UrwSoQ88hWfuc1oaZsIQ5wZoSikfCIHl78Nw70yaXtFaY9xkZnqkKdEWwLEDfQNHP8IPwAvgAGi6cheIrbW6CqgGnCH3zqvfeN69SyI3fVgtA83qXQBpoAPRM3j6Fzx2k/8LHAJt4ChnZWStNVVAhes6C5wnj2XWyOOZ8056b3nrOWyZE1YPeOWgjtz7AEhPGzEKx2pShJ0peaRRhBDzbh7lG0cRkEUOosOxyk3s/Fwga61VShm3usRVG1fuMRlCVEmoUOSEySA/A0z51lEloSK2Klai3UBFcFVj0lFO9y2PkTH7GnT6exl8YBfFOWDv9yr9f6cP7u/HfyYpslZOP+VIAAAAAElFTkSuQmCC');";
    s+="position:absolute;";
    s+="right:-15px;";
    s+="top:-15px;";
    s+="cursor:pointer;";
    s+="height:35px;";
    s+="width:35px;";
    s+=END;
    s+=BEG("#"+me.id+"Inner");
    s+="padding:10px;";
    s+=END;
    return s;
  },
   _writeCss:function _writeCss__Cb(){
     var me=window.Cb;
     var s=me._css();
     if (typeof me._writeCss.done!=Us) {
       return;
     }
     me._writeCss.done=true;
     Uf.addGlobalStyle(s);
     },
  _left:function _left__Cb(w){
    var bod=$('body');
    var r=((bod[0].offsetWidth/2)-(w/2));
    return r;
  },
  _create:function _create__Cb(){
    var me=window.Cb;
    if (me._created) {return;}
    me._writeCss();
    me._created=true;
    var bod=$('body');
    var s='';
    s+='<div';
    s+=' id="'+me.id+'"';
    s+=' class="'+me.classname+'"';
    s+=' style="';
    s+=' width:'+me.def.width+'px;';
    s+=' left:'+me._left(me.def.width)+'px;';
    s+=' position:absolute;';
    s+=' background:'+'-moz-linear-gradient(center top , #000000, #000044) repeat scroll 0 0 transparent;';
    s+='">';
    s+='<div id="'+me.id+'Inner"/>';
    s+='</div>';
    bod.append(s);
    me._the_obj=$('#'+me.id);
    me._the_obj_inner=$('#'+me.id+'Inner');
    me._the_overlay_obj=me._the_obj.overlay({
                  expose: {
                      color: '#999',
                      loadSpeed: 600,
                      opacity: 0.8
                  },
                  api: true
              });
  },
  display:function display__Cb(s,w){
    var me=window.Cb;
    if (!me._created) {me._create();}
    var bod=$('body');
    var o=me._the_obj_inner;
    var cb=me._the_obj;
    if (typeof w!=Us) {cb.css('width',w+'px');}
    var cbw=parseInt(cb.css('width').replace('px',''));
    cb.css('left',me._left(cbw));
    if (typeof s!=Us) {
      o.html(s);
    }
    me._the_overlay_obj.load();
  },
  about:function about__Cb(){
    var me=window.Cb;
    //return;
    var s='';
    s+='<div style="width:150px;height:150px;position:absolute;left:-75px;top:-65px;background:url(http://iis.mra.tzo.net/webbrain-com/closebox-about-logo.png);">';
    s+='</div>'
    s+='<h1 style="opacity:1;padding-left:50px;margin-top:-30px;color:#ffffff;text-shadow:4px 4px 4px #0000ff;">Mark Robbins and Associates</h1>';
    s+='<div style="clear:both;"/>';
    s+='<center>';
    s+='<h2>WebBrain MetaPortal</h2>';
    s+='<h3>Extended for Firefox with GreaseMonkey</h3>';
    s+='<p>"Greasing up the <a style="color:#5555aa" href="http://en.wikipedia.org/wiki/Series_of_tubes" target="_newtab">series of tubes!</a>"</p>';
    s+='<img style="" src="http://iis.mra.tzo.net/webbrain-com/closebox-about-greasemonkey-firefox-icon.png">';
    s+='<p><i>Please support open standards</i></p>';
    s+='</center>';
    s+='<p align="right"><small>More about <a style="color:#5555aa" href="http://webbrain.com/about" target="_newtab">WebBrain</a></small></p>';
    me.display(s,500);
  }
}
//________________________________________________e Closebox
// Slideouts
window.Sod={
  '0':{
    t:'What\'s This?',
    h:'<p>These are auto tips -- currently in beta</p>'
  },
  '1':{
    t:'What Else?',
    h:''
    +'<h2>About Tips</h2>'
    +'<h3>Operations - currently available</h3>'
    +'<ul>'
    +'<li>You can open many tips at once</li>'
    +'<li>You can <a class="tiplink" cmd="window.mnu.cmdCloseAllOpenTips();">close all open tips</a></li>'
    +'<li>You can <a class="tiplink" cmd="window.mnu.cmdOpenAllTips();">open all tips</a></li>'
    +'</ul>'
    +'<h3>Operations - not implemented</h3>'
    +'<ul>'
    +'  <li>Hide/Show All Tips</li>'
    +'  <li>Get Tips from Brain Node Data</li>'
    +'  <li>Get Tips specific to Plex Node</li>'
    +'  <li>Get Tips specific to Destination</li>'
    +'  <li>Create New Tips for User and store as cookie</li>'
    +'  <li>Put Tips in an autoscroller</li>'
    +'  <li>Let Tips have icons</li>'
    +'  <li>Let User dispose of or supress Tips</li>'
    +'</ul>'
  },
  '2':{
    t:'How it all Works',
    h:''
    +'<div style="width:300px"></div>'
    +'<h3>Elements</h3>'
    +'<ul>'
    +'<li><a class="tiplink" cmdover="indicate(\'plex\')" cmdout="indicate(\'plex\',true)" title="Plex is indicated">Plex</a> <i>The Brains of &quot;The Brain&quot;</i>'
    +'<br>&nbsp;A Brain contains many interconnected nodes, the node in the center indicates where you are.'
    +'<br>&nbsp;Navigating to a new node will put content in the <a class="tiplink" cmdover="indicate(\'lower\')" cmdout="indicate(\'lower\',true)" title="Destination Frame is indicated">Destination Frame</a>.'
    +'<br>&nbsp;Along the Bottom of the Plex is a list of nodes you have visited.'
    +'</li>'
    +'<li><a class="tiplink" cmdover="indicate(\'lower\')" cmdout="indicate(\'lower\',true)" title="Destination Frame is indicated">Destination Frame</a> <i>Where we are going</i>'
    +'<br>&nbsp;Contains either an <a class="tiplink" title="An Embedded Webpage">IFRAME</a> of the destination or other information about the Plex node you have selected.'
    +'<br>&nbsp;Sometimes the information will be very scant if you are on a node that is a just stepping stone to other nodes.'
    +'</li>'
    +'<li><a class="tiplink" cmdover="indicate(\'bar\')" cmdout="indicate(\'bar\',true)" title="Divider Bar is indicated">Divider Bar</a> <i>Control</i>'
    +'<br>&nbsp;The Divider Bar can be adjusted as you like, use the arrows to move the bar completely up or down,'
    +'<br>&nbsp;or use hotkeys page up and page down.'
    +'</li>'
    +'<li><a class="tiplink" cmdover="indicate(\'search\')" cmdout="indicate(\'search\',true)" title="Search Box is indicated">Search Box</a> <i>Look for Nodes</i>'
    +'<br>&nbsp;Lets you find a particular node in the Brain, type 2 characters for a list of nodes that contain your text.'
    +'</li>'
    +'<li><a class="tiplink" cmdover="indicatebg(\'menubg\')" cmdout="indicatebg(\'menubg\',true)" title="Menu is indicated">Menu</a> <i>Main Commands</i>'
    +'<br><ul>'
    +'<li><b>Home</b> - will bring you to the home node of the Plex</li>'
    +'<li><b>View, Plex</b> - moves divider to show all of the Plex</li>'
    +'<li><b>View, Destination</b> - moves divider to show all of the Destination</li>'
    +'<li><b>View, Both</b> - moves divider to show both</li>'
    +'<li><b>View, Hide/Show Destination Header</b> - toggles visibility of the <a class="tiplink" cmdover="indicate(\'desthead\')" cmdout="indicate(\'desthead\',true)" title="Destination Header is indicated">Destination Header</a></li>'
    +'<li><b>Window, Clone as Tab</b> - takes the whole browser window, Brain and all and clones it to a new browser tab</li>'
    +'<li><b>Window, Clone Destination as Tab</b> - if you are on a node that contains an <a class="tiplink" title="An Embedded Webpage">IFRAME</a> in the Destination Frame, '
    +'<br>the contents of the IFRAME will be cloned to a new browser tab</li>'
    +'</ul>'
  },
};
window.So={
  _css:function _css__So(){
    var me=window.So;
    var s='';
    var END='}'+"\n";
    var BEG=function(s){
      return s+'{';
    };
    var AND=function(s){
      return s+',';
    };
    s+=BEG(".tipmain");
    s+="z-index:9999;";
    s+="height:10px;";
    s+="left:620px;";
    s+="top:0px;";
    s+="position:absolute;";
    s+=END;
    s+=BEG(".slideOutTip");
    s+="float:left;";
    s+="margin-left:3px;";
    s+="display:inline;";
    s+="padding:3px;";
    s+="padding-bottom:5px;";
    s+="top:0;";
    s+="background:-moz-linear-gradient(center top, #3E3E3E, #111) repeat scroll 0 0  transparent;";
    s+="font-size:13px;";
    s+="color:#666;";
    s+="text-shadow:1px 1px 1px #000;";
    s+="overflow:hidden;";
    s+="height:14px;";
    s+="border-bottom-left-radius:3px;";
    s+="border-bottom-right-radius:3px;";
    s+="border:1px solid #333;";
    s+="border-top:none;";
    s+=END;
    s+=BEG(".slideOutTip:hover");
    s+="border:1px solid #444;";
    s+="border-top:none;";
    s+="color:#aaa;";
    s+="border-color:#444;";
    s+="text-shadow:1px 1px 1px #000;";
    s+=END;
    s+=BEG(".slideOutTip.isOpened");
    s+="background:-moz-linear-gradient(center top, #3E3E3E, #22222) repeat scroll 0 0  transparent;";
    s+="box-shadow:2px 2px 2px 2px #335;";
    s+="color:#ccc;";
    s+="text-shadow:1px 1px 1px #000;";
    s+="opacity:0.85;";
    s+=END;
    s+=BEG(".slideOutTip.isOpened:hover");
    s+="background:-moz-linear-gradient(center top, #3E3E3E, #22222) repeat scroll 0 0  transparent;";
    s+="box-shadow:2px 2px 2px 2px #335;";
    s+=END;
    s+=BEG(".tipVisible");
    s+="cursor:pointer;";
    s+="height:16px;";
    s+=END;
    s+=BEG(".tipTitle");
    s+="float:left;";
    s+="font-size:10px;";
    s+="white-space:nowrap;";
    s+="margin-top:0px;";
    s+="padding-right:5px;";
    s+=END;
    s+=BEG(".tipIcon");
    s+="width:11px;";
    s+="height:11px;";
    s+="float:left;";
    s+="background-color:#1C7AD1;";
    s+="border:1px solid #659AFC;";
    s+="margin-right:8px;";
    s+="-moz-border-radius:1px;";
    s+="-webkit-border-radius:1px;";
    s+="border-radius:1px;";
    s+=END;
    s+=".green .tipIcon{ ";
    s+="background-color:#61b035; ";
    s+="border:1px solid #70c244; ";
    s+=END;
    s+=BEG(".blue .tipIcon");
    s+="background-color:#1078C7!important; ";
    s+="border:1px solid #1e82cd;";
    s+=END;
    s+=BEG(".red .tipIcon");
    s+="background-color:#CD3A12; ";
    s+="border:1px solid #da421a;";
    s+=END;
    s+=BEG(".plusIcon");
    s+="width:9px;";
    s+="height:9px;";
    s+="background:url('img/plus.gif') no-repeat center center;";
    s+="margin:1px;";
    s+="-webkit-transition: -webkit-transform 0.2s linear;";
    s+="-moz-transition: -moz-transform 0.2s linear;";
    s+="transition: transform 0.2s linear;";
    s+=END;
    s+=BEG(".slideOutTip.isOpened");
    s+="z-index:10000; ";
    s+=END;
    s+=BEG(".slideOutTip.isOpened .plusIcon");
    s+="-moz-transform:rotate(45deg);";
    s+="-webkit-transform:rotate(45deg);";
    s+="transform:rotate(45deg);";
    s+=END;
    s+=BEG(".openLeft .tipIcon");
    s+="margin:0 0 0 8px;";
    s+="float:right;";
    s+=END;
    s+=".openLeft .tipTitle{ ";
    s+="float:right; ";
    s+="padding:0 0 0 5px;";
    s+=END;
    s+=BEG(".openLeft .slideOutContent");
    s+="margin-top:22px;";
    s+=END;
    s+=BEG(".openLeft.openTop .slideOutContent");
    s+="margin-top:0;";
    s+=END;
    s+=BEG(".slideOutContent");
    s+="display:none;";
    s+="padding:5px;";
    s+="background-color:#000;";
    s+="font-size:11px;";
    s+="border:1px solid #444;";
    s+="border-top:1px solid #666;";
    s+="border-left:1px solid #666;";
    s+="border-radius:3px;";
    s+=END;
    s+=BEG(".main > p");
    s+="display:none;";
    s+=END;
    s+=".slideOutContent UL,";
    s+=BEG(".slideOutContent P");
    s+="margin-top:0px;";
    s+="padding-top:1px;";
    s+=END;
    s+=BEG(".slideOutContent H1~P");
    s+="padding-left:4px;";
    s+=END;
    s+=BEG(".slideOutContent H2~P");
    s+="padding-left:6px;";
    s+=END;
    s+=BEG(".slideOutContent H3~P");
    s+="padding-left:8px;";
    s+=END;
    s+=BEG(".slideOutContent H4~P");
    s+="padding-left:10px;";
    s+=END;
    s+=BEG(".slideOutContent H2");
    s+="padding-left:2px;";
    s+=END;
    s+=BEG(".slideOutContent H3");
    s+="padding-left:4px;";
    s+=END;
    s+=BEG(".slideOutContent H4");
    s+="padding-left:6px;";
    s+=END;
    s+=BEG(".slideOutContent H5");
    s+="padding-left:8px;";
    s+=END;
    s+=BEG(".slideOutContent H6");
    s+="padding-left:8px;";
    s+=END;
    s+=".slideOutContent H1,";
    s+=".slideOutContent H2,";
    s+=".slideOutContent H3,";
    s+=".slideOutContent H4,";
    s+=".slideOutContent H5,";
    s+=BEG(".slideOutContent H6");
    s+="margin-top:0px;";
    s+="margin-bottom:0px;";
    s+="padding-top:2px;";
    s+="padding-bottom:2px;";
    s+=END;
    s+=BEG(".spaceBottom");
    s+="margin:0 0 10px;";
    s+=END;
    s+=BEG(".spaceTop");
    s+="margin:10px 0 0;";
    s+=END;
    return s;
    },
  _writeCss:function _writeCss__So(){
    var me=window.So;
    var s=me._css();
    if (typeof me._writeCss.done!=Us) {
      return;
    }
    me._writeCss.done=true;
    Uf.addGlobalStyle(s);
    },
  _so_html_item:function _so_html_item__So(title,html){
    var me=window.So;
    var s='';
    s+='<div title="'+title+'">';
    s+=html;
    s+='</div>';
    return s;
    },
  _so_html_n:function _so_html_n__So(n){
    var me=window.So;
    var i=window.Sod;
    n=''+n;
    if (typeof i[n]==Us) {
      return '';
    }
    return me._so_html_item(i[n].t,i[n].h);
    },
  _so_html_inner:function _so_html_inner__So(n){
    var me=window.So;
    var s='';
    for (var x=0;x<3;x++) {
      s+=me._so_html_n(x);
    }
    return s;
    },
  _so_html:function _so_html__So(n){
    var me=window.So;
    var s=me._so_html_inner();
    return '<div id="SoDiv" class="tipmain">'+s+'</div>';
    },
  _alter:function _alter__So(){
    var me=window.So;
    $('.tipmain div').replaceWith(function(){
      var o=$(this);
      var sd='span';
      sd='div';
      var cls=o.attr('class');
      if (typeof cls==Us) {
        cls='';
      }else{
        cls=' '+cls;
      }
      var s='<'+sd+' class="slideOutTip '+cls+'" style="'+o.attr('style')+'">';
      s+='<div class="tipVisible">';
      s+='<div class="tipIcon blue"><div class="plusIcon"></div></div>';
      s+='<p class="tipTitle">'+o.attr('title')+'</p>';
      s+='</div>';
      s+='<div class="slideOutContent">';
      s+='<div>'+o.html()+'</div>';
      s+='</div>';
      s+='</'+sd+'>';
      return s;
    });
    $('.slideOutTip').each(function(){
      /*
        Implicitly defining the width of the slideouts according to the
        width of its title, because IE fails to calculate it on its own.
      */
      $(this).width(40+$(this).find('.tipTitle').width());
    });
    /* Listening for the click event: */
    $('.tipVisible').bind('click',function(){
      var tip = $(this).parent();
      /* If a open/close animation is in progress, exit the function */
      if(tip.is(':animated'))
        return false;
      if(tip.find('.slideOutContent').css('display') == 'none'){
        tip.trigger('slideOut');
      }
      else tip.trigger('slideIn');
    });
    $('.slideOutTip').bind('slideOut',function(){
      var tip = $(this);
      var slideOut = tip.find('.slideOutContent');
      /* Closing all currently open slideouts: */
      //$('.slideOutTip.isOpened').trigger('slideIn');
      /* Executed only the first time the slideout is clicked: */
      if(!tip.data('dataIsSet')){
        tip.data('origWidth',tip.width())
          .data('origHeight',tip.height())
          .data('dataIsSet',true);
        if(tip.hasClass('openTop')){
          /*
            If this slideout opens to the top, instead of the bottom,
            calculate the distance to the bottom and fix the slideout to it.
          */
          tip.css({
            bottom  : tip.parent().height()-(tip.position().top+tip.outerHeight()),
            top    : 'auto'
          });
          /* Fixing the title to the bottom of the slideout, so it is not slid to the top on open: */
          tip.find('.tipVisible').css({position:'absolute',bottom:3});
          /* Moving the content above the title, so it can slide open to the top: */
          tip.find('.slideOutContent').remove().prependTo(tip);
        }
        if(tip.hasClass('openLeft')){
          /*
            If this slideout opens to the left, instead of right, fix it to the
            right so the left edge can expand without moving the entire div:
          */
          tip.css({
            right  : Math.abs(tip.parent().outerWidth()-(tip.position().left+tip.outerWidth())),
            left  : 'auto'
          });
          tip.find('.tipVisible').css({position:'absolute',right:3});
        }
      }
      /* Resize the slideout to fit the content, which is then faded into view: */
      tip.addClass('isOpened').animate({
        width  : Math.max(slideOut.outerWidth(),tip.data('origWidth')),
        height  : slideOut.outerHeight()+tip.data('origHeight')
      },function(){
        slideOut.fadeIn();
      });
    }).bind('slideIn',function(){
      var tip = $(this);
      /* Hide the content and restore the original size of the slideout: */
      tip.find('.slideOutContent').fadeOut('fast',function(){
        tip.animate({
          width  : tip.data('origWidth'),
          height  : tip.data('origHeight')
        },function(){
          tip.removeClass('isOpened');
        });
      });
    });
    $('.tiplink').bind('click',cmdeval);
    $('.tiplink').bind('mouseover',cmdovereval);
    $('.tiplink').bind('mouseout',cmdouteval);
    $('.tiplink').tooltip();
    },
  init:function init__So(){
    var me=window.So;
    if (typeof me.init.done!=Us) {
      return;
    }
    me.init.done=true;
    me._writeCss();
    },
  perform:function perform__So(){
     var me=window.So;
     me.init();
     if ($('#contentContainer').length==0) {
       setTimeout(me.perform,500);
       log('retry');
       return;
     }
     $('body').append(me._so_html());
     me._alter();
    }
  };

window.In={//Indicator

}


// Startup
 $(function(){//Startup
   //Uf.addStyle('@import "http://iis.mra.tzo.net/webbrain-com/webbrain-sddm.css";');
   Pg.init();
   Mb.init();
   Db.init();
   Kb.init();
   Mn.init();
   Lw.init();
   Mb.perform();
   Db.perform();
   Mn.Make();
   Kb.perform();
   Lm.init();
   So.perform();
   //setTimeout(So.perform,4000);
   setTimeout(Port.MakeMain,4000);
   });
 logi('Res.assets.menuheader_src:'+Res.assets.menuheader_src);
//________________________________________________e Startup




