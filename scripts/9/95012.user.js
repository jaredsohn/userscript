// ==UserScript==
// @name          IRCCloudUpdate
// @description	  Minor changes to IRCCloud's UI 
// @author        Dale Harvey
// @include			  http://irccloud.com/*
// @include			  https://irccloud.com/*
// ==/UserScript==

(function() {

    var padlock =
        "R0lGODlhCgAOANUAACgoKMDAwEBAQIWFhScnJ4CAgFdXVzExMV9fX11dXZiYmCkp"+
        "KVtbW5eXlxUVFe3t7TU1NSwsLL29vWBgYE9PT1JSUqioqPn5+dDQ0J+fn/Hx8RER"+
        "ESQkJFZWVh4eHvDw8FhYWKysrLCwsNXV1cPDw/39/To6Ouvr6/T09H9/f0NDQyUl"+
        "Ja+vr9vb23Z2dsHBwUFBQSsrK////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAKAA4AAAZQQJnsYklUGg+h7ATydBgL"+
        "FUaYIryELYihhDJllLIQYPSJiMCBlURzYKEBJIXDMCgUBoiNSzDr+/sxMH9/gYN+"+
        "hYYziIYxfIkxExwxk5QEFEEAOw==";

    var hammer =
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2Fy"+
        "ZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfRJREFUeNpi/P//PwMlgOXNh9cYgqaG"+
        "Zh7MzMxRjEyMWv///T/19+/flafPnzqIzQDG1+9foQhYmFq2cHJyVnOwczAwMTMx"+
        "ADUz/Pjxg+HH9x9ZJ84cn47hAjTNjby8vNXc3NwMrKysDM4uTgyh4aEMwsLCDA8f"+
        "POTG5gImGMPc2KIOqLEOptnAwIBB30B/A1CzDMil8gry83B6wdjAxEBWTnbX399/"+
        "RVnZWBmMjI0Yzp87/+f9+/c/Pn365Hzm/OlTuAKRyVjfpBHo5/NAP4qC/BwGdDIH"+
        "B8e9nz9/sgBdwgOU22uoZ2SGMxbKKstUFsxbwMDIyMiwau1KBnZ29nqgOD8bG2vR"+
        "rp27QYbx/Pv3b6+BrqHzhcvnMVzCEh4RtlhBQSHs7t27LEDNXECx7yCJvII8nj9/"+
        "/qbt2rkLZCjYED1tfedLVy+ewhaNHkBsAMQdaBbM6enuTd65fSfDr1+/QNH55dvX"+
        "b86Xr186hTMdYAFzujt7knds38Hw+/dvUHr48u3bN+crNy6fQolGPCCltLxkrpu7"+
        "GwMTExMDMJZ4gOGyV0td24xYF8Bd0tbSBnTJTrBLgLH05fv3785MJOSblKqaqgXu"+
        "Hm4MzCzMDMAUyx0ZHalPigtgYH5/74QEJ2fH78CU6kaOASAwAYhXAvFxgAADAOr5"+
        "x6FOD/ubAAAAAElFTkSuQmCC";

    var logout =
        "R0lGODlhEAAQANU9AKqqqvb29snJydTU1Pn5+fHx8Zubm3x8fJ+fn+3t7aioqOfn"+
        "5+zs7N7e3oaGhrm5uf39/cbGxoyMjJOTk46OjoKCgnl5eb+/v39/f66urpWVlZyc"+
        "nNra2s/Pz7a2try8vM7OzvLy8sDAwJKSktXV1fj4+MTExMXFxb29vbCwsJGRkdLS"+
        "0qWlpa2trbW1tY2NjcvLy52dndHR0bq6ure3t6KioqCgoOPj4+jo6OXl5Xd3d8zM"+
        "zP///////wAAAAAAACH5BAEAAD0ALAAAAAAQABAAAAaOwJ5wKLwAjheisqcY8J4D"+
        "xVL4kfEgMx1kwZrWeASCpCchgB5LBC8QQAgRgdjSwCsUIgZDpKBZtngJCQFPAQkv"+
        "QgITPRM8OI6POB4bQhQ8lTcAN5qaKQdDNgINDTo7Jio6qCNEDjwcpCcOLlMVPCSk"+
        "IhVTPRg8K6QoGLo9BwukD57CFgA7NBbCQhmoOs9CQQA7";

    var css = ""
        + "#statusBar { position:absolute; right:0px; left:auto; top:0px;"
          + "width:190px; min-width:190px; height:105px; "
          + "border-left:1px solid #999; padding:5px; }"
        + "#sidebar { top:115px; bottom:0px; height:auto; "
          + "border-left:1px solid #999; }"
        + "#statusMessage { font-size:80%; line-height:16px; height:16px;"                + "position:relative; top:-10px; margin-left:0px; }"
        + "#bufferViewContainer { top:0px; bottom:0px;}"
        + "#bufferView { border:0px; height:100%; }"
        + "#statusHead { margin-left: 0px; position:absolute; top:3px; }"
        + "#statusActions { float:none; position:absolute; bottom:10px;"
          + "background:#FFF; left:0px; -webkit-box-shadow: 1px 1px 3px #333;"
          + "height:25px; width: 60px; }"
        + "#statusActions strong { font-weight:normal; }"
        + "#statusActions a { display:block; width:16px; line-height:16px; "
          + "height:16px; overflow:hidden; }"
        + "#statusActions form a { position:absolute; left:35px; "
          + "background-image:url(data:image/png;base64," + logout + ");}"
        + "#statusActions a { position:absolute; left:10px; top:4px;"
          + "text-indent:-999px; "
          + "background-image:url(data:image/png;base64," + hammer + "); }"
        + "#limits { display:none !important; }"
        + "#buffers { margin:0px 15px 0px 0px; }"
        + "#settings { font-size:80%; color:transparent; }"
        + "h2.buffer a.join { background:none !important; "
           + "border:0px !important;"
           + "text-decoration:none; font-weight:bold; color:#EEE !important;"
           + "position:relative;top:2px;text-align:center; }"
        + "h2.buffer a.join:before { content:'+'; }"
        + "#buffers li.server .unread a.buffer, #buffers li.server "
           + ".selected a.buffer { margin-left:0px; }"
        + "#buffers .buffer a { border-bottom:1px solid #DDD; !important; "
           + "color:#CCC; font-size:90%; padding: 4px 5px !important;}"
        + "#buffers p.hidden a { padding: 6px 10px !important; "
           + "text-align:right; font-size:80%; font-weight:bold; }"
        + "#buffers p.hidden a:before { content:'+ '; } "
        + "#buffers ul.conversations { margin-top:0px; }"
        + "#buffers li.server a.buffer { margin-right:0px; "
           + "border-left:0px solid transparent !important; }"
        + "#buffers li.server .active a { color:#888; }"
        + "#buffers li.unread.active a { color:#333; }"

        + "#buffers li.server h2 a.buffer { background:none; font-weight:bold;}"
        + "#buffers li.password a, #buffers li.conversation a, "
        + "#buffers li.selected.password a, #buffers li.selected.conversation "
        + "a { background-position-x: 165px; background-position-y: 5px; }"
        + "#buffers li.server h2:first-child a.buffer { "
        + "color:#FFF !important; background:#444 !important; }"
        + "#buffers li.password a { "
        + "background-image:url(data:image/png;base64," + padlock + "); }"
        + "#buffers li.server .active.selected a.buffer, #buffers li.server "
          + ".active.selected a.buffer:hover { margin-left: -5px;"
          + "background:#DDD; border-color:#DDD; color: #333; }"
        + "#buffers li.server { -webkit-box-shadow: 1px 1px 3px #333; }"
        + "#buffers li.server h2 a.buffer { border-bottom:0px; }"
        + "#joinServer { text-align:center; }"
        + "#joinServer a { -webkit-border-radius:5px; background:#666 "
        + "!important; margin-right:10px; color:#FFF !important; "
        + "padding:5px !important; font-weight:bold;  }"
        + "#users a { color:#999; }"
        + "h2 .topic { display:none; position:absolute; background:white; "
        + "padding:10px; z-index:999; border:1px solid #666; width:300px; }"
        + ".bufferHeading:hover .topic { display:block; }"
        + "#buffers li.server .selected a.buffer { font-weight:normal; }"
    ;

    var interval;
    
    function mainViewExists() {
        if (typeof MainView.prototype.sizeChat === "function") {
            patchMainView();
            clearTimeout(interval);
            interval = null;
        }
    };

    function patchMainView() { 

        MainView.prototype.sizeChat = function() {

            // Bit ugly, monky patch the resize function
            var offset = 0; //115;
            
            var memberListHeight = this.chatBufferView.getFrameHeight() -
                this.getChromeHeight();
            var bufferHeight = memberListHeight
                - this.chatBoxView.getContainerHeight()
                - this.chatBufferView.getAboveExtrasHeight()
                - this.chatBufferView.getBelowExtrasHeight();
            this.chatBufferView.setBufferHeight(bufferHeight + offset);
            this.overlaysView.position(
                this.getChromeHeight() +
                    this.chatBufferView.getContainerOffset(),
                bufferHeight, this.chatBufferView.getWidth());
            this.memberListView.setHeight(memberListHeight + offset);
        };
    };

    interval = setInterval(mainViewExists, 500);

    // Fixed up Coloured names script from Lukas Lalinsky
    function hash(s) {   
		    for (var h = 0, i = 0; i < s.length; i++) {
			      h = h * 33 + s.charCodeAt(i);
		    }
		    return h;
	  }
    
	  var colorCache = [];
    
	  function nickColor(nick) {
		    if (colorCache[nick]) {
			      return colorCache[nick];
        }
		    var h = hash(nick);
		    var mod = 200;
		    var r = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		    var g = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		    var b = 0 + 150 * (1.0 * (h % mod) / mod); h = Math.floor(h/mod);
		    var col = "rgb("+Math.floor(r)+","+Math.floor(g)+","+Math.floor(b)+")";
		    return colorCache[nick] = col;
	  }

	  function newMessageAdded(event) {
		    var row = event.target;
		    if (row.tagName != 'TR' || !row.className.match(/\bchat\b/))
			      return;
		    for (var i = 0; i < row.childNodes.length; i++) {
			      if (row.childNodes[i].className == 'author') {
				        var links = row.childNodes[i].getElementsByTagName('a');
				        if (links.length > 0) {
					          links[0].style.color = nickColor(links[0].textContent);
				        }
				        return;
			      }
		    }
	  }
    
	  document.getElementById('buffer')
        .addEventListener('DOMNodeInserted', newMessageAdded, false);

    //
    if (typeof GM_addStyle != "undefined") {
	      GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
	      PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
	      addStyle(css);
    } else {
	      var heads = document.getElementsByTagName("head");
	      if (heads.length > 0) {
		        var node = document.createElement("style");
		        node.type = "text/css";
		        node.appendChild(document.createTextNode(css));
		        heads[0].appendChild(node); 
	      }
    }
    
})();