// ==UserScript==
// @name        FastReblog
// @namespace   FastReblog
// @description dis script does barrel rolls and helps u with simple click reblog on tumblr
// @include     http://www.tumblr.com/dashboard*
// @include     http://www.tumblr.com/reblog*
// @include     http://www.tumblr.com/tagged*
// @version     1.2.1
// @grant       none
// ==/UserScript==

(function(d,w){
  FRStyle = d.createElement('style');
  FRStyle.type = 'text/css';
  FRStyle.appendChild(
    d.createTextNode('.fr_button { width: 24px; height: 46px; background: url(http://i.imgur.com/NUWCRnb.png) no-repeat center; display: inline-block; margin-left: 15px; opacity: .65; zoom: 1; position: relative;} .fr_button:hover { opacity: 1 }')
  );
  d.head.appendChild(FRStyle);
  
  w.$FR = {
    postCount: 0,
    byclass: function(name, context){
      type = typeof(context);
      if ( type == "string" )
        if (regex = context.match(/^#([^\s]*)/) ) context = d.getElementById(regex[1]);
      if ( type == "undefined" || context == null ) 
        context = d;
      return context.getElementsByClassName(name);
    },
    eventFire: function(el, type){
      e = d.createEvent("HTMLEvents");
      e.initEvent(type, true, true);
      e.eventName = type;
      el.dispatchEvent(e);
    },
    buttonAppend: function( controlBox ){
      rebutton = $FR.byclass("reblog post_control", controlBox);
      if( rebutton.length ){
         if ( !$FR.byclass("fr_button", controlBox).length ){
          rebutton = rebutton[0];
          frButton = d.createElement("a");
          with( frButton ){
            href = "javascript:;";
            className = "fr_button";
            onclick = function(){
              $FR.autoReblog = true;
              $FR.eventFire($FR.byclass("reblog",this.parentElement)[0],"click");
            };
          }
          controlBox.insertBefore(frButton, rebutton.nextSibling);
        }
      }
    },
    main: setInterval(function(){
      controls = $FR.byclass("reblog","#posts");
      rpc = controls.length; // real post count
      if( $FR.postCount != rpc){
        $FR.postCount = rpc;
        for( var i=0; i<rpc; i++ ){
          $FR.buttonAppend( controls[i].parentNode );
        }
      }
      if(w.location.href.match(/\/reblog/) && $FR.autoReblog ){
        if( typeof(jQuery) != "undefined" ) jQuery(".chrome.blue.txt").click(); // firefox
        else $FR.eventFire($FR.byclass("chrome blue txt")[0],"click"); // chrome
        $FR.autoReblog = false;
      };
    },500)
  };
})(document,window);