// ==UserScript==
// @name           Tracker Chat
// @namespace      http://peeja.com/
// @include        http://www.pivotaltracker.com/projects/*
// @include        http://drop.io/*
// ==/UserScript==


var trackerCode = function() {
  function onAppLoad() {
    Panel.CHAT = "chat";
    Panel.UNCLONEABLE_PANELS += [Panel.CHAT];
    
    app.layout.registerPanel(Panel.CHAT, function() {
      var dropName = window.prompt("What drop would you like to chat in?", readCookie("chatDropName") || "");
      
      if (dropName == null) return null
      
      createCookie("chatDropName", dropName, 365);
      return new ChatWidget(dropName);
    },{
      startSortNumber: 10000
    });

    ChatWidget = Class.create(Widget, {
      initialize: function(dropName) {
        this.dropName = dropName;
      },
      getTitle: function() {
        return "Chat"
      },
      fillInWidgets: function() {},
      render: function() {
        this.contents = Element.create("iframe", {id: "chat_frame"});
        this.contents.style.width = "100%";
        this.contents.style.border = "none";
        this.contents.src = "http://drop.io/"+this.dropName+"/chat";
        
        this.dd = new YAHOO.util.DDTarget(this.contents, "dataGroup");
        this.dd.addToGroup("activeGroup");
        
        return this.contents;
      },
      needsRenderDelay: function() {
        false;
      },
      open: function() {},
      onResize: function(widthPercent, heightPixels) {
        this.contents.style.height = heightPixels + "px";
      }
    });
    
    function insertStoryUrlInChat(storyId) {
      var url = document.location.protocol + '//' + document.location.host + '/story/show/' + storyId;
      $("chat_frame").contentWindow.postMessage("InsertText:"+url, "http://drop.io");
    }
    
    var originalOnDragOver = DraggableItem.prototype.onDragOver;
    DraggableItem.prototype.onDragOver = function(event, targetHtmlId) {
      if (targetHtmlId != "chat_frame")
        return originalOnDragOver.bind(this)(event, targetHtmlId);
    };
    
    var originalOnDragOut = DraggableItem.prototype.onDragOut;
    DraggableItem.prototype.onDragOut = function(event, targetHtmlId) {
      if (targetHtmlId != "chat_frame")
        return originalOnDragOut.bind(this)(event, targetHtmlId);
    };
    
    var originalOnDragDrop = DraggableItem.prototype.onDragDrop;
    DraggableItem.prototype.onDragDrop = function(event, targetHtmlId) {
      if (targetHtmlId == "chat_frame")
        insertStoryUrlInChat(this.widgetId);
      else
        return originalOnDragDrop.bind(this)(event, targetHtmlId);
    };
    
    view_menu.insertItem({text: "Chat...", onclick: {fn: function() {app.layout.togglePanel(Panel.CHAT);}}}, 5);
  }
  
  (function() {
    if (typeof App != "undefined" && App.isLoaded())
      onAppLoad();
    else {
      setTimeout(arguments.callee, 10);
    }
  })();
  
  
  // Receive ShowStory messages.
  Event.observe(window, "message", function(e) {
    if (e.origin != "http://drop.io") return;
    
    if (args = /ShowStory:(\d+)/.exec(e.data))
      app.showStoryById(args[1]);
  });
  
  
  // Cookies - from http://www.quirksmode.org/js/cookies.html
  
  function createCookie(name,value,days) {
  	if (days) {
  		var date = new Date();
  		date.setTime(date.getTime()+(days*24*60*60*1000));
  		var expires = "; expires="+date.toGMTString();
  	}
  	else var expires = "";
  	document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
  	var nameEQ = name + "=";
  	var ca = document.cookie.split(';');
  	for(var i=0;i < ca.length;i++) {
  		var c = ca[i];
  		while (c.charAt(0)==' ') c = c.substring(1,c.length);
  		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  	}
  	return null;
  }

  function eraseCookie(name) {
  	createCookie(name,"",-1);
  }
};

var dropioCode = function() {
  // Runs whenever we're embedded in another document, which is
  // probably only when we're embedded in Tracker.  Since we're
  // not allowed to see the parent's properties (such as its
  // location), that's probably the best we can do.
  if (window.parent != window) {
    $('globalHeaderContainer').hide();
    $('dropInfo').hide();
    if ($('toggleNavigation')) $('toggleNavigation').hide();
    $('chatContent').style.marginTop = 0;
    $('nickList').style.marginTop = 0;
    $('collapseContainer').style.marginTop = 0;
    $('nickList').style.minHeight = "100%";
    $('chatInputContainer').style.bottom = 0;
    $('chatInputContainer').style.left = 0;
    $('chatInputContainer').style.right = 0;
    $('chatInputContainer').style.width = "auto";
    $('chatInputContainer').style.paddingRight = 0;
    $("chatButtons").hide()
    $("chatInputWrapper").style.paddingLeft = 0;
    $("chatInputWrapper").style.marginRight = 0;
    $("chatInputWrapper").style.position = "absolute";
    $("chatInputWrapper").style.width = "auto";
    $("chatInputWrapper").style.left = "10px";
    $("chatInputWrapper").style.right = "16px";
    $("chatInput").style.marginLeft = 0;
    $("chatInput").style.marginRight = 0;
    $$(".chatButtonSmall").each(function(button) { button.hide(); });
    
    (function() {
      if (typeof theChatLayer != "undefined")
        theChatLayer.toggleNickList();
      else {
        setTimeout(arguments.callee, 10);
      }
    })();
    
    document.observe("click", function(e) {
      var storyRegExp = new RegExp("^http://www.pivotaltracker.com/story/show/(\\d+)$");
      if (e.target.tagName == "A" && storyRegExp.match(e.target.readAttribute("href"))) {
        e.stop();
        
        var id = storyRegExp.exec(e.target.readAttribute("href"))[1];
        
        window.parent.postMessage("ShowStory:"+id, "http://www.pivotaltracker.com/");
      };
    });
    
    insertText = function(text) {
      if(theChatLayer.chatInputHasDefaultMessage())
        theChatLayer.chatInput.removeClassName('hint').value = "";
      
      var start = theChatLayer.chatInput.selectionStart;
      var end   = theChatLayer.chatInput.selectionEnd;
      var oldText  = theChatLayer.chatInput.value;
      var preText  = oldText.substring(0, start);
      var postText = oldText.substring(end, oldText.length);
      
      theChatLayer.chatInput.value = preText + text + postText;
      
      theChatLayer.chatInput.selectionStart = start;
      theChatLayer.chatInput.selectionEnd = start + text.length;
      theChatLayer.chatInput.focus();
    };
    
    // Receive InsertText messages.
    Event.observe(window, "message", function(e) {
      if (e.origin != "http://www.pivotaltracker.com") return;

      if (args = /InsertText:(.+)/.exec(e.data))
        insertText(args[1]);
    });
  }
};

// Run code in page context (not priveliged GM context).
var script = document.createElement("script");
script.type = "application/javascript";

if (/^https?:\/\/(www\.)?pivotaltracker\.com/.test(window.location.href))
  script.innerHTML = "(" + trackerCode + ")();";
else if (/^https?:\/\/(www\.)?drop\.io/.test(window.location.href))
  script.innerHTML = "(" + dropioCode + ")();";

document.body.appendChild(script);