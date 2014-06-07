// ==UserScript==
// @name           RSDN navigation
// @namespace      Maxim.Yanchenko
// @description    RSDN navigation with Ctrl+Arrow + current msg highlighting
// @require        http://usocheckup.redirectme.net/128994.js
// @installURL     http://userscripts.org/scripts/source/128994.user.js
// @updateURL      http://userscripts.org/scripts/source/128994.meta.js
// @include        http://*.rsdn.ru/forum/*.1
// @include        http://*.rsdn.ru/forum/*.1.aspx
// @include        http://*.rsdn.ru/Forum/MsgList.aspx*
// @include        http://rsdn.ru/forum/*.1
// @include        http://rsdn.ru/forum/*.1.aspx
// @include        http://rsdn.ru/Forum/MsgList.aspx*
// ==/UserScript==

if (window.parent == window)
  return;

function $x(x, t, r) {
  if (t && t.tagName) {
    //console.log("t was provided, switching");
    var h = r, r = t, t = h;
  }
  //console.log("typeof r: ", typeof r);
  //console.log("typeof t: ", typeof t);
  //console.log("r: ", r);
  var d = r ? r.ownerDocument || r : r = document, p;
  //console.log("d: ", d.innerHTML);
  switch (t) {
  case XPathResult.NUMBER_TYPE:
    p = 'numberValue';
    break;
  case XPathResult.STRING_TYPE:
    p = 'stringValue';
    break;
  case XPathResult.BOOLEAN_TYPE:
    p = 'booleanValue';
    break;
  case XPathResult.ANY_UNORDERED_NODE_TYPE:
  case XPathResult.FIRST_ORDERED_NODE_TYPE:
    p = 'singleNodeValue';
    break;
  default:
    return d.evaluate(x, r, null, t || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  return d.evaluate(x, r, null, t, null)[p];
}

// will stop iteration after first 'true' returned from 'cb' (like Array.some)
function forEach(lst, cb)
{
  if(!lst)
    return false;

  if (lst.snapshotItem)
  {
    for (var i = 0, len = lst.snapshotLength; i < len; ++i)
    {
      if (cb(lst.snapshotItem(i), i, lst)) return true;
    }
  }
  else if (lst.iterateNext)
  {
    var item;
    while (item = lst.iterateNext())
      if (cb(item, lst)) return true;
  }
  else if (typeof lst.length != 'undefined')
  {
    for (var i = 0, len = lst.length; i < len; ++i)
      if (cb(lst[i], i, lst)) return true;
  }
  else if (typeof lst == "object")
  {
    for (var i in lst)
      if (cb(lst[i], i, lst)) return true;
  }
  return false;
}

// will run cb(frameMsg, frameMsgList) iff both frames were found
function get_frames(cb)
{
  //console.log(location.href);
  //console.log("frames0: ", window.frames.length);
  //console.log("frames1: ", window.parent.frames.length);
  //console.log("frames2: ", window.parent.parent.frames.length);
  var fff = window.parent.frames.length == 2 ? window.parent.frames : 
  window.parent.parent.frames.length == 2 ? window.parent.parent.frames : window.frames;
  //console.log("fff.length: ", fff.length);
  var frameMsgList, frameMsg;
  //console.log("fff: ", fff);
  if (fff)
  {
    for (var i = 0, len = fff.length; i < len; ++i)
    {
      //console.log("frame name: " + fff[i].name + ", loc: " + fff[i].location.href);
      if (fff[i].name == "frameMsgList")
        frameMsgList = fff[i];
      else if (fff[i].name == "frameMsg")
        frameMsg = fff[i];
      //else console.log("unknown frame: " + fff[i].name);
    }
  }
  
  if (frameMsg && frameMsgList)
    return cb( frameMsg, frameMsgList );
}

// manage highlighting of the current msg
get_frames( function(frameMsg, frameMsgList)
{
  var mysheets=document.styleSheets;
  for (j=0; j<mysheets.length; j++){
    var mysheet=mysheets[j];
    //console.log(mysheet);
    //console.log(mysheet.href);
    if (mysheet.href.match(/.*rsdn.ru\/Css\/MsgList.css$/))
{
    //console.log(typeof mysheet.cssRules);
    var myrules=mysheet.cssRules;
    for (i=0; i<myrules.length; i++){
      if(myrules[i].selectorText.toLowerCase()=="a#curlink"){
        targetrule=myrules[i];
        //console.log("rule found: " + targetrule);
        //console.log(targetrule.cssText);
        mysheet.deleteRule(i);
        break;
      }
    }
}
  }
  //var style_str = "font-size: 120%;";
  //var style_str = "background: #1F3744; font-weight: bolder;";
  var style_str = "background: rgb(208, 224, 240); color: rgb(0, 0, 128)!important; font-weight: bolder;";
  var nn = "msghilite";
  var h = frameMsg.location.href.replace(/.*?(?=\/forum\/)/, "");
  function set_style() {
    var sheet = frameMsgList.document.getElementById(nn);
    if (sheet)
    {
      sheet.innerHTML = '[href="'+h+'"] { '+style_str+' }';
      //console.log("changing CSS: " + sheet.innerHTML);
    }
    else
    {
      sheet = frameMsgList.document.createElement('style');
      sheet.innerHTML = '[href="'+h+'"] { '+style_str+' }';
      sheet.id=nn;
      frameMsgList.document.body.appendChild(sheet);
      //console.log("adding CSS: " + sheet.innerHTML);
    }
  };

  if (frameMsgList.document.body == null) {
    //console.log("wait for load!");
    frameMsgList.document.onload = function(e) {
      //console.log("doc loaded!");
      set_style();
    };
    frameMsgList.onload = function(e) {
      //console.log("wnd loaded!");
      set_style();
    };
  }
  else set_style();

  //console.log("frameMsgList: " + frameMsgList.document.body.innerHTML);

  //forEach($x('//style[contains(.,"[href=")]', frameMsgList.document.body), function(a)
  //{
  //  console.log("found style! "+a.innerHTML);
  //  frameMsgList.document.body.removeChild(a);
  //} );
  //

  //console.log("searching frameMsgList: " + h);
  //console.log("frameMsgList: " + frameMsgList.name);
  //console.log("frameMsg: " + frameMsg.name + ", " + h);
  //console.log("typeof frameMsgList: ", typeof frameMsgList);
  //console.log("typeof document: ", typeof document);
  //console.log("typeof frameMsgList.document: ", typeof frameMsgList.document);
  //console.log(frameMsgList.document.body.innerHTML);

  //forEach($x('//a[contains(@style,"'+style_str+'")]', frameMsgList.document.body), function(a)
  //{
  //  console.log("found! "+a.innerHTML);
  //  a.setAttribute('style', a.getAttribute('style').replace(RegExp(style_str),""));
  //} );
  //
  //forEach($x('//a[@href="'+h+'"]', frameMsgList.document.body), function(a)
  ////forEach($x('//a[@href="'+h+'"]/ancestor::td[1]', frameMsgList.document.body), function(a)
  //{
  //  console.log("found! "+a.innerHTML);
  //  a.setAttribute("style", style_str+a.getAttribute("style"));
  //  //a.setAttribute("style", "background: #ff0000!important;background-color: #ff0000!important;");
  //  //a.setAttribute("style", "background:#ff0000;");
  //  //console.log("1",a.style);
  //} );

} );

// install Ctrl+Arrow handling only if in msg frames
get_frames( function(frameMsg, frameMsgList)
{

  // taken from http://stackoverflow.com/questions/902713/how-do-i-automatically-click-a-link-with-javascript
  function clickLink(link) {
      var cancelled = false;

      if (document.createEvent) {
          var event = document.createEvent("MouseEvents");
          event.initMouseEvent("click", true, true, window,
              0, 0, 0, 0, 0,
              false, false, false, false,
              0, null);
          cancelled = !link.dispatchEvent(event);
      }
      else if (link.fireEvent) {
          cancelled = !link.fireEvent("onclick");
      }

      if (!cancelled) {
          window.location = link.href;
      }
  }

  function find_and_go(xpaths)
  {
    // xpaths should return an <a> tag, it's an array
    if (window.parent != window)
    {
      get_frames( function(frameMsg, frameMsgList)
      {
        // 'some' will stop iteration after the first 'true'
        xpaths.some( function(xpath) {
          return forEach($x(xpath, frameMsgList.document.body), function(a)
          {
            //console.log("found! "+a.innerHTML+": "+a.href);
            clickLink(a);
            return true;
          } );
        } );
      } );
    }
  }
  function NavigateThrough (event)
  {
     if ((event.ctrlKey || event.altKey))
     {
       var h = frameMsg.location.href.replace(/.*?(?=\/forum\/)/, "");
       //console.log("h: " + h);
       switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
       {
         case 0x25:
           //console.log("left in " + document.location.href);
           find_and_go([ '//a[@href="'+h+'"]/ancestor::table[1]/parent::div[1]/preceding-sibling::table[1]//a[1]' ]);
           break;
         case 0x26:
           //console.log("up in " + document.location.href);
           find_and_go([ '//a[@href="'+h+'"]/ancestor::table/preceding-sibling::table[1]//a[1]'
                       , '//a[@href="'+h+'"]/ancestor::table[1]/parent::div[1]/preceding-sibling::table[1]//a[1]' ]);
           break;
         case 0x27:
           //console.log("right in " + document.location.href);
           find_and_go([ '//a[@href="'+h+'"]/ancestor::table[1]/following-sibling::*[1]//a[1]'
                       , '//a[@href="'+h+'"]/ancestor::*/following-sibling::table[1]//a[1]' ]);
           break;
         case 0x28:
           //console.log("down in " + document.location.href);
           find_and_go([ '//a[@href="'+h+'"]/ancestor::*/following-sibling::table[1]//a[1]'
                       , '//a[@href="'+h+'"]/ancestor::table[1]/following-sibling::*[1]//a[1]' ]);
           break;
       }
     }
  }
  document.onkeydown = NavigateThrough;
});