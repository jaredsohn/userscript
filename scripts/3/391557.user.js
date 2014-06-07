// ==UserScript== 
// @name        DashAdmin (Test version)
// @description Feature testing
// @namespace   com.uNme.userscripts
// @version     1.32 (200214)
// @include     *://e621.net/*
// @include     *://e926.net/*
// @include     *://twentypercentcooler.net/*
// @include     *://gallery.agn.ph/*
// @include     *://beta.ouroboros.ws/*
// @downloadURL http://userscripts.org/scripts/source/391557.user.js
// @grant       none
// ==/UserScript==

// Last change: 02/20/14  5:38Pm

(function() {
  var cookies   = parseCookies(); // GET ALL THE COOKIES!
  var loc       = window.location.pathname.split("/"); // Split the path part of the URL for easier lookup
  var defset    = {version:"160214", saveVersion:140213, fixedUserBar:false, singleline:false, allfaves:false, showdmails:false, hiliteur:true, hilitebc:true, unixLE:false, tinyPrefix:"ta_", tinyAlias:[], subscribedForums:"", uselog:false, floatinglog:true, poolPrevKey:86, poolNextKey:78}; // Default settings. Also used to check save versions.
  var settings  = (window.localStorage.settings?eval("/*eSixExtend's Settings for DashAdmin*/\n"+window.localStorage.settings):defset); // Settings
  var nao       = new Date().getTime();
  var nextcheck = window.localStorage.daNextCheck || -1;

  // Init Notification Sound
  var output = null;

  try {
    output = new Audio();
    var samples = new Float32Array(5512);
    output.mozSetup(1, 88200);

    for (var i = 0; i < samples.length ; i++) {
      samples[i] = Math.sin( i / 20 ) * (i / 11025);
    }
  } catch(ex) {
    logIt("snderr", "MozAudio not available", "");
    output = null;
  }

  var N, notif = function(t, o) {
    if(!window.Notification)
      throw "Desktop notifications are not supported";
    else
    if(Notification.permission == "granted") {
      N = new Notification(t, o);
      if(output) output.mozWriteAudio(samples);
    } else
    if(Notification.permission != "denied")
      Notification.requestPermission(function(permission) {
        if(!Notification.permission) Notification.permission = permission;
        if(permission == "granted") N = new Notification(t, o);
      });
  };

  var getTicket = function(t) {
    switch(t.type) {
      case "user":
        return ("User report"+(t.reason?":\n"+t.reason:"")+(t.reported_username?"\n"+t.reported_username:""));
        break;

      case "dmail":
        return ("DMail report"+(t.reason?":\n"+t.reason:"")+(t.reported_dmail?"\n"+t.reported_dmail:""));
        break;

      case "comment":
        return ("Comment report:\n"+t.reason+"\ncomment #"+t.reported_comment);
        break;

      case "forum":
        return ("Forum report:\n"+t.reason+"\nforum #"+t.reported_forum);
        break;

      case "blip":
        return ("Blip report:\n"+t.reason+"\nblip #"+t.reported_blip);
        break;

      case "namechange":
        return ("Username change:\n"+t.oldname+" -> "+t.desired_username);
        break;
    }

    return null;
  };

  var getTickets = function(alreadyOnTicketListing) {
    query("/ticket/index.json?type=any&status=pending", function(j, x, t) {
      var n = j.length;
      if(n != 0) {
        var t = j[Math.floor(Math.random()*j.length)];
        notif(n+" pending ticket"+(n==1?"":"s"), {body:getTicket(t), icon:"https://static1.e621.net/data/preview/c7/1a/c71a7f4ce56a99deeb78b3c8bba7527b.jpg"});
        if(N) {
          N.addEventListener("click", function() {
            if(n == 1)
              window.open("https://e621.net/ticket/show/"+t.id);
            else
            if(alreadyOnTicketListing)
              location.replace("https://e621.net/ticket?type=any&status=pending");
            else
              window.open("https://e621.net/ticket?type=any&status=pending");
          }, false);
        }
      } else
        logIt("tickets", "No pending tickets", "");
    });
  };

  if(loc[1] == "ticket") {
    var snd = document.createElement("audio");
    snd.style.display = "none";
    snd.src = "";
    document.body.appendChild(snd);

    window.setInterval(function() {
      logIt("ticsactive", "Loading more tickets", "");
      getTickets(true);
    }, 60000);
    getTickets(true);
  } else
  if(nextcheck < nao) {
    window.localStorage.daNextCheck = nao + 60000; // Next minute
    getTickets(false);
  }

  if(loc[1] == "forum" && (loc[2] == "show" || loc[2] == "edit")) {
    var box = document.getElementById("forum_post_body");
    if(box) {
      var statebtn = document.createElement("input")
      statebtn.type = "button";
      statebtn.value = "State";
      statebtn.addEventListener("click", function() {
        var fp = createFloatingPanel(this, false), item;
        var act = function() {
          var color;
          switch(this.innerHTML) {
            case "Approved": color="#3E9E49"; break
            case "Denied": color="#E45F5F"; break
            case "Pending": color="#E4E150"; break
          }
          replace(box, "[b][color="+color+"]"+this.innerHTML+"[/color][/b]");
        };

        item = document.createElement("h2");
        item.innerHTML = "Approved";
        item.className = "option";
        item.style.color = "#3E9E49";
        item.addEventListener("click", act);
        fp.appendChild(item);

        item = document.createElement("h2");
        item.innerHTML = "Denied";
        item.className = "option";
        item.style.color = "#E45F5F";
        item.addEventListener("click", act);
        fp.appendChild(item);

        item = document.createElement("h2");
        item.innerHTML = "Pending";
        item.className = "option";
        item.style.color = "#E4E150";
        item.addEventListener("click", act);
        fp.appendChild(item);
      });
      box.parentNode.insertBefore(statebtn, box);
    }
  }

  /* parseCookies()
      Parses all of the current website cookies and returns a JSON object based off of them for
      easier access to each cookie.

      Returns:
        A JSON Object with all of the cookies' names as attributes of that object. Note that
        changing the value of an attribute of this object will not change the actual cookie.
        Unfortunately. For that, [document.cookie = "{cookie name}={value}";] is still an
        option. */
  function parseCookies() {
    var q = document.cookie.split("; "); // Open cookie jar and separate cookies
    var v = "({";

    // Divide cookies
    for(var i=0; i<q.length; i++) {
      var p = q[i].split("=");
      v += '"'+p[0]+'":"'+p[1]+'",';
    }

    // Share cookies
    return eval("/*Cookie parser*/\n"+v.substr(0, v.length-1)+"})");
  }

  function replace(textarea, sel) {
    var text = textarea.value;
    var selection = getSelection(textarea);
    var scroll = textarea.scrollTop;
    var left = text.substr(0, selection[0]);
    var right = text.substr(selection[1], text.length);

    if(selection[0] == selection[1]) {
      textarea.value = left+sel+right;
      textarea.selectionStart = left.length;
      textarea.selectionEnd = textarea.selectionStart;
    } else {
      textarea.value = left+sel+right;
      textarea.selectionStart = left.length;
      textarea.selectionEnd = textarea.selectionStart+sel.length;
    }

    textarea.scrollTop = scroll;
    textarea.focus();
  }

  /* getSelection(textarea)
      Returns the selection start and end of the textarea element as an array (start, end) */
  function getSelection(textarea) {
    return [textarea.selectionStart, textarea.selectionEnd];
  }

  /* createFloaingPanel(parent, closeButton)
      Creates a new floating panel with a close button (if specified) and a DIV and returns the DIV
      to add a content.

      Parameters:
        parent       The parent object from which retrieve its position and size
        closeButton  Indicates if a close button should be used (true) instead of closing the panel
                     by clicking anywhere else (false) */
  function createFloatingPanel(parent, closeButton) {
    var rect = {"x":0, "y":0, "w":64, "h":16};

    if(parent != null) {
      var r = parent.getBoundingClientRect();
      rect = {"x":(r.left+window.pageXOffset)-6, "y":(r.top+window.pageYOffset)-6, "w":(r.right-r.left)+6, "h":(r.bottom-r.top)+6};
    }

    var floatingPanel = document.createElement("div");
    floatingPanel.className = "floatingPanel rounded";
    floatingPanel.style.left = rect.x+"px";
    floatingPanel.style.top = rect.y+"px";
    floatingPanel.style.minWidth = rect.w+"px";
    floatingPanel.style.minHeight = rect.h+"px";
    document.body.appendChild(floatingPanel);

    var floatingContent = document.createElement("div");
    floatingContent.className = "floatingContent";
    floatingPanel.appendChild(floatingContent);

    floatingContent.center = function() { // Utility function to center the panel
      var dis = this.parentNode;
      window.setTimeout(function() {
        dis.style.left = ((window.innerWidth/2)-(dis.offsetWidth/2))+"px";
        dis.style.top = ((window.innerHeight/2)-(dis.offsetHeight/2))+"px";
      }, 1);
    };

    floatingContent.addCloseButton = function(beforeClose) {
      var closeButton = document.createElement("small");
      closeButton.className = "close";
      closeButton.innerHTML = "X";
      closeButton.title = "Click to close";
      closeButton.addEventListener("click", function() {
        if(beforeClose) beforeClose();
        floatingContent.remove();
      }, true);
      this.parentNode.appendChild(closeButton);
    };

    floatingContent.remove = function() {
      floatingPanel.style.opacity = "0";
      window.setTimeout(function(){document.body.removeChild(floatingPanel)}, 100);
    }

    switch(closeButton) {
      case true: floatingContent.addCloseButton(null); break;
      case false: document.body.addEventListener("click", hidePanels, true); break;
      case null: floatingContent.center(); break;
    }

    return floatingContent;
  }

  /* hidePanels()
      Hides (removes from the document, actually) all floating panels that are in the page */
  function hidePanels() {
    var i, fps = document.querySelectorAll(".floatingPanel");

    for(i=0; i<fps.length; i++) {
      var fp = fps[i];
      if(fp && !fp.ignore) fp.remove();
    }
    document.body.removeEventListener("click", hidePanels, true);
  }

  function query(url, callback, grouptag, onError) {
    if(!url || !callback) throw "Query error: URL or Callback are missing";

    var req = new window.XMLHttpRequest();
    var gtag = grouptag || url;

    logIt(gtag, "Query: "+url, "Request initiated");
    req.onreadystatechange = function() {
      if(req.readyState == 4) {
        switch(req.status) {
          case 200: {
            logIt(gtag, "Query: "+url, "Request OK");
            var json, text = req.responseText;

            try {json = eval("/*Query: Parse to JSON Object*/\n("+text+")");}
            catch (except) {json = null;}

            try {
              callback(json, req.responseXML, text);
            } catch(except) {
              logIt(gtag, "Query: "+url, "Callback error\n"+except.name+"\n"+except.message+(except.lineNumber?"\nLine: "+except.lineNumber:""));
            }
            break;
          }

          case 403: logIt(gtag, "Query: "+url+" [Forbidden]", "Access denied"); if(onError) {onError(403)}; break;
          case 404: logIt(gtag, "Query: "+url+" [Not Found]", "Not found"); if(onError) {onError(404)}; break;
          case 420: logIt(gtag, "Query: "+url+" [Invalid Record]", "Record could not be saved"); if(onError) {onError(420)}; break;
          case 421: logIt(gtag, "Query: "+url+" [User Throttled]", "User is throttled, try again later"); if(onError) {onError(421)}; break;
          case 422: logIt(gtag, "Query: "+url+" [Locked]", "The resource is locked and cannot be modified"); if(onError) {onError(422)}; break;
          case 423: logIt(gtag, "Query: "+url+" [Already Exists]", "Resource already exists"); if(onError) {onError(423)}; break;
          case 424: logIt(gtag, "Query: "+url+" [Invalid Parameters]", "The given parameters were invalid"); if(onError) {onError(424)}; break;
          case 500: logIt(gtag, "Query: "+url+" [Internal Server Error]", "Some unknown error occurred on the server"); if(onError) {onError(500)}; break;
          case 503: logIt(gtag, "Query: "+url+" [Service Unavailable]", "Server cannot currently handle the request, try again later"); if(onError) {onError(503)}; break;
        }
      }
    };

    try {
      req.open("GET", url, true);
      req.send();
    } catch (except) {
      logIt(gtag, "Query: "+url, "Error: "+except);
    }
  }

  /* logIt(tag, title, message)
      Adds a new log to the error console with the title and the message arranged in separate lines.
      If the DevBug extension exists, it will create a new DevLog entry with the title and the
      message specified */
  function logIt(tag, title, message) {
    if(settings.uselog) {
      if(window.devbug) {
        new window.devbug("{DashAdmin} "+tag, "{DashAdmin} "+title.replace(/\n/gm, "<br/>"), message.replace(/\n/gm, "<br/>"), false);
      } else {
        console.log("{DashAdmin} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):""));

        if(settings.floatinglog) {
          var dbg = document.getElementById("dbgTextarea");
          if(!dbg) {
            dbg = document.createElement("textarea");
            dbg.id = "dbgTextarea";
            dbg.style = "display:block; position:fixed; left:1em; bottom:1em; right:auto; top:auto; width:80%; font-size:1em; line-height:1em; height:2em; z-index:10";
            dbg.value = "";
            dbg.addEventListener("focus", function() {
              this.style.height = "25%";
            }, true);
            dbg.addEventListener("blur", function() {
              this.style.height = "2em";
            }, true);
            document.body.appendChild(dbg);
          }

          var d = new Date();
          var h = d.getHours();
          var m = d.getMinutes();
          var s = d.getSeconds();
          dbg.value += (dbg.value.length>0?"\n\n":"")+"["+(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s)+"] {eSixExtend} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):"");
          dbg.scrollTop = dbg.scrollHeight;
        }
      }
    }
  }

})();
