// ==UserScript==
// @name           DisplayName gmail
// @namespace      http://nazo.yi.org/
// @description    This script replaces the display name of the sender and recipient from the sender's expression with your registered expression in your address book.
// @include        https://mail.google.com/a/*
// @include        https://mail.google.com/*
// @version        1.23
// ==/UserScript==

(function(){
  var document = unsafeWindow.document;
  if(window.chrome){
    function GM_getValue(name,defaultValue){
      var v = window.localStorage.getItem(name);
      return v===null ? defaultValue:v;
    }
    function GM_setValue(name,value){
      window.localStorage.setItem(name,value);
    }
  }
  var STYLE =GM_getValue("displayName.style",[
    "span[contact~='notincontact']{ background: rgba(0, 255, 255, 0.04); }",
    "span[contact~='incontact']{ background: rgba(255, 0, 255, 0.1); }",
    "span[contact~='ML']{ color: gray; background: inherit; border:1px solid black; font-size:80%; -moz-border-radius: 2px; }",
    "span[contact~='me']{ background: inherit; border:1px solid black; font-size:90%; -moz-border-radius: 2px; }",
    ].join("\n"));
  function run(infourl,myaddress){
    /*
    contacts={ email: [ 0:type(ct|cl), 1:name, 2:email, 3:unknown, 4:id, 5:unknown, 6:list ] }
     */
    var contacts={};
    var doc = null;
    var displayNameStyle = false;
    function loadContact(){
      var list = {};
      var ids = {};
      function accountParse(s){
        switch(s[0]){
        case 'ct': // contact
          if(s[1]!=''){
            if(ids[s[4]]){
              contacts[s[2]]=ids[s[4]];
            }else{
              ids[s[4]]=s;
              contacts[s[2]]=s;
            }
          }
          break;
        case 'cl': // contact list
          s[2].match(/\<[^<>@\s]+@[^<>@\s]+\>/g).forEach(function(a){
            a=a.substr(1,a.length-2);
            if(!list[a])list[a]=[];
            list[a].push(s[1]);
          });
        }
      }
      xhr(infourl+"&"+(new Date()).getTime(),function(r){
        try{
          eval(r.responseText.replace(/^[^\n]+/,''))[0].forEach(function(s){
            if(s[0]=='ac') s[1].forEach(accountParse);
          });
          for(var s in list){
            if(contacts[s]){
              contacts[s][6]=" "+list[s].join(" ");
            }
          }
          removeContact();
          setContact();
        }catch(e){
          console.log("displayname error can not get contact list"+e);
        }
      });
    }
    function appendStyle(){
      if(doc.getElementById("displayNameStyle"))return;
      if(!displayNameStyle){
        displayNameStyle = doc.createElement("style");
        displayNameStyle.innerHTML= STYLE;
        displayNameStyle.id = "displayNameStyle";
      }
      doc.getElementsByTagName("head")[0].appendChild(displayNameStyle);
    }
    function rewriteName(s){
      var email = s.getAttribute("email");
      if(contacts[email]){
        var me = myaddress==email;
        var cs = "incontact";
        if(contacts[email][6]) cs += contacts[email][6];
        if(me) cs +=" me";
        s.setAttribute("contact",cs);
        s.title = s.textContent + " "+cs;
        if(!me) s.textContent = contacts[email][1];
        if(s.parentNode && s.parentNode.parentNode && s.parentNode.parentNode.className=='ML'){
          var img = document.createElement('img');
          var at = /GMAIL_AT=([^;]*);\s*/.exec(document.cookie)[1];
          img.src="https://mail.google.com/mail/u/0/photos/"+escape(email)+"?1&at="+at+"&rp=1&pld=1";
          img.setAttribute('style','width:32px;height:1.1em;margin:-2px 0');
          s.appendChild(img);
        }
      }else{
        s.setAttribute("contact","notincontact");
      }
    }
    function removeContact(){
      $x("//span[@email][@contact]").forEach(function(s){
        s.removeAttribute("contact");
      })
    }
    function getCanvas(){
      doc = document;
      return doc;
    }
    function setContact(e){
      if(!getCanvas())
        return;
      appendStyle();
      $x("//span[@email][not(@contact)]").forEach(rewriteName);
    }
    //--------------------------------------------------------------------
    // library code {{{
    //--------------------------------------------------------------------
    function xhr(url,onload){
      var x=new XMLHttpRequest();
      x.open("GET",url,true);
      x.onreadystatechange=function(){
        if(x.readyState ==4) onload(x);
      }
      x.send("");
    }
    function $x(xpath){
      var res = doc.evaluate( xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
      var r=[];
      for ( var i = 0, email; email = res.snapshotItem( i ); i++ ) {
        r.push(email);
      }
      return r;
    }
    function tag(tag,attrs,elms){
      var e = document.createElement(tag);
      if( attrs instanceof Array ){
        elms = attrs;
      }else{
        setAttributes( e, attrs );
      }
      appendChild( e, elms );
      return e;
    }
    function txt(text){return document.createTextNode(text); }
    function setAttributes( e, attrs ){
      for( var a in attrs ){
        switch(a){
        case "parent": attrs[a].appendChild(e); break;
        case "insertBefore": attrs[a].parentNode.insertBefore( e, attrs[a]); break;
        case "innerHTML": e.innerHTML= attrs[a]; break;
        default:
          if( typeof(attrs[a])=='function' && a.match(/^on(.+)$/) ){
            e.addEventListener( RegExp.$1, attrs[a], false );
          }else{
            e.setAttribute( a, attrs[a]);
          }
        }
      }
    }
    function appendChild( e, c ){
      switch(typeof c){
      case 'undefined': return;
      case 'function': return appendChild( e, c(e) );
      case 'object':
        if( c == null )return;
        if( c instanceof Array ){
          for( var i=0;i<c.length;i++ ){ appendChild( e, c[i]); };
        }else{
          e.appendChild( c );
        }
        break;
      default:
        e.appendChild( txt(c) );
      }
    }
    //--------------------------------------------------------------------
    // library code }}}
    //--------------------------------------------------------------------
    function changeStyle(){
      var m = tag('textarea',{
      style:"width:100%;height:90%;display:block",
      onclick:function(e){ e.stopPropagation(); }});
      m.value=STYLE;
      var bg = window.chrome ? "-webkit-gradient(linear, left top,left bottom , from(rgba(0, 0, 0, 1)),to(rgba(0, 0, 0, 0.6)))" :
        "-moz-linear-gradient(top, rgba(0,0,0,1),rgba(0,0,0,0.6))";
      var a= tag('div',{
      onclick:function(){ a.parentNode.removeChild(a); },
      style:"position:fixed;z-index:99999;background:"+bg+";top:0;left:0;right:0;bottom:0;padding:10%;"},[
        tag('div',{ style:"color:white;padding:4px;font-size:140%" },"displayName gmail style setting"),
        m,
        tag('button',{
        onclick:function(){
          STYLE=m.value;
          GM_setValue("displayName.style",STYLE);
          var s = doc.getElementById("displayNameStyle");
          if(s){
            s.innerHTML=STYLE;
          }
        }},"ok"),
        tag('button',{},"cancel")]);
      document.body.appendChild(a);
    }
    function addMenu( menu,commandName, commandFunc ){
      menu.appendChild(tag('div',{ onclick:commandFunc,'class':'J-N J-Ks'},txt(commandName)));
    }
    function initMenus(){
      if(!getCanvas())
        return;
      var menu = $x('//div[@role="menu"][@aria-activedescendant]')[0];
      if(!menu){
        setTimeout(initMenus,3000);
      }else{
        addMenu( menu,"Gmail DisplayName reload contact", loadContact );
        addMenu( menu,"Gmail DisplayName style customize", changeStyle );
      }
    }
    loadContact();
    //document.addEventListener( "DOMSubtreeModified", setContact, false );
    setInterval(setContact,1000);
    initMenus();
  }
  if(window.chrome && window.parent==window){
    var scripts=unsafeWindow.document.getElementsByTagName('script');
    for(var i=0;i<scripts.length;i++){
      var html=scripts[i].innerHTML;
      if(/^[\n\r\s ]*var GLOBALS=\[(.*?),\[/.test(html)){
        var g=RegExp.$1;
        g="["+g.replace(/^,,/,'null,null,')+"]";
        var GLOBALS=JSON.parse(g);
        run("?ui=2&ik="+GLOBALS[9]+"&view=au&rt=j",
            GLOBALS[10] );
        break;
      }
    }
  }else if(unsafeWindow.GLOBALS && window.parent==window){ // firefox
    run("?ui=2&ik="+unsafeWindow.GLOBALS[9]+"&view=au&rt=j",
        unsafeWindow.GLOBALS[10] );
  }
})();
