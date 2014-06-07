// ==UserScript==
// @name        AutoPoke
// @namespace   http://trgwii.net/
// @description Pokes people on Facebook
// @include     http://facebook.com/pokes*
// @include     http://*.facebook.com/pokes*
// @include     https://facebook.com/pokes*
// @include     https://*.facebook.com/pokes*
// @include     /^https?://(www\.)?facebook.com/pokes.*$/
// @version     1
// @grant       none
// ==/UserScript==

var AutoPoker = {
  user : "",
  keycode : 172,
  interval : {
    id : 0,
    delay : 5000,
    run : function(){
      AutoPoker.interval.id = setInterval(function(){
        buttons = AutoPoker.button.find();
        for(i = 0; i < buttons.length; i++){
          buttons[i].click();
          buttons[i].setAttribute(AutoPoker.button.attr.name, AutoPoker.button.attr.value);
        }
      }, AutoPoker.interval.delay);
    }
  },
  countdown : {
    id : 0,
    delay : 180000
  },
  button : {
    text : "Poke Back",
    attr : {
      name : "clicked",
      value : "clicked"
    },
    find : function(){
      a = document.getElementsByTagName("a");
      out = [];
      if(AutoPoker.user !== "")
        for(i = 0; i < a.length; i++)
          if(a[i].textContent.contains(AutoPoker.user)){
            a = a[i].parentElement.parentElement.getElementsByTagName("a");
            break;
          }
      for(i = 0; i < a.length; i++){
        if(a[i].textContent.contains(AutoPoker.button.text)){
          if(a[i].getAttribute(AutoPoker.button.attr.name) !== AutoPoker.button.attr.value)
            out.push(a[i]);
          else{
            clearInterval(AutoPoker.interval.id);
            AutoPoker.countdown.id = setTimeout(function(){ location.reload(); }, AutoPoker.countdown.delay);
          }
        }
      }
      return out;
    }
  }
};

String.prototype.contains = function(needle){
  if(this.indexOf(needle) !== -1) return true;
  else return false;
}

var showSettings = function(){
  var createTextInput = function(win, value){
    out = win.document.createElement("input");
    out.setAttribute("type", "text");
    out.value = value || "";
    return out;
  }
  var createSpan = function(win, text){
    out = win.document.createElement("span");
    out.innerHTML = text;
    return out;
  }

  var sWin = open("", "_blank", "channelmode=no, directories=no, fullscreen=no, height=600, width=800, top=0, left=0, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no", false);

  var elem = {
    inDelay : createTextInput(sWin, AutoPoker.interval.delay),
    p1 : createSpan(sWin, "The interval between clicking the Poke Back buttons."),
    br1 : sWin.document.createElement("br"),
    cdDelay : createTextInput(sWin, AutoPoker.countdown.delay),
    p2 : createSpan(sWin, "The delay before refreshing if a button is glitched."),
    br2 : sWin.document.createElement("br"),
    buttonText : createTextInput(sWin, AutoPoker.button.text),
    p3 : createSpan(sWin, "The text to search for when looking for the Poke Back button."),
    br3 : sWin.document.createElement("br"),
    userText : createTextInput(sWin, AutoPoker.user),
    p4 : createSpan(sWin, "Target a specific user by putting his name here."),
    br4 : sWin.document.createElement("br"),
    keyText : createTextInput(sWin, AutoPoker.keycode),
    p5 : createSpan(sWin, "The keycode used for bringing up this window."),
    br5 : sWin.document.createElement("br"),
    saveButton : sWin.document.createElement("button")
  }
  elem.keyText.onkeydown = function(e){
    this.value = e.keyCode;
    return false;
  }
  elem.saveButton.textContent = "Save settings";
  elem.saveButton.onclick = function(){
    AutoPoker.interval.delay = Number(elem.inDelay.value);
    AutoPoker.countdown.delay = Number(elem.cdDelay.value);
    AutoPoker.button.text = elem.buttonText.value;
    AutoPoker.user = elem.userText.value;
    AutoPoker.keycode = Number(elem.keyText.value);
    clearInterval(AutoPoker.interval.id);
    clearTimeout(AutoPoker.countdown.id);
    AutoPoker.interval.run();
    sWin.alert("Saved.");
    sWin.close();
  }

  for(k in elem) sWin.document.body.appendChild(elem[k]);
}

document.addEventListener("DOMContentLoaded", function(){
  AutoPoker.interval.run();
  onkeydown = function(e){
    console.log(e.keyCode);
    if(e.keyCode === AutoPoker.keycode){
      showSettings();
      return false;
    }
  }
});
