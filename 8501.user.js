// ==UserScript==
// @name         gmacs
// @namespace    http://gomaxfire.dnsdojo.com/go
// @description  a text edtitor
// @include      *
// @version      0.1950
// ==/UserScript==

(function(){

  //----------------------------------------------------
  // utility for DOM operation
  //----------------------------------------------------
  function $(id){
    return document.getElementById(id);
  }

  function $text(text){
    return document.createTextNode(text);
  }

  function $add(parent, children){
    if(arguments.length < 2) return "";
    for(var i=1, child; child=arguments[i];i++){
      if(typeof child == "string"){
        child = $text(child);
      }
      parent.appendChild(child);
    }
    return parent;
  }

  function $event(element, type, func){
    element.addEventListener(type, func, true);
  }

  function $tag(tagName, option){
    var tag = document.createElement(tagName);
    if(option){
      for(a in option){
        if(option.hasOwnProperty(a)){
          tag[a] = option[a];
        }
      }
    }
    return tag;
  }

  var mktag = $tag;

  function $rm(element){
    element.parentNode.removeChild(element);
  }


  //----------------------------------------------------
  // utility for GM_xmlhttpRequest
  //----------------------------------------------------
  var XHR  = {
    count:0,
    mkParamData:function(params){
      var array = [];
      for(a in params){
        if(params.hasOwnProperty(a)){
          array.push([encodeURIComponent(a),
                      "=",
                      encodeURIComponent(params[a])].join(""));
        }
      }
      return array.join("&");
    },
    post:function(url, params, func, errorFunc){
      XHR.count++;
      debug("try post:"+XHR.count);
      debug("URL:" + url);
      var data = XHR.mkParamData(params);
      debug("data:" + data);
      GM_xmlhttpRequest({url:url,
            method:"POST",
            headers:{"Content-Type": "application/x-www-form-urlencoded"},
            data:data,
            onload:function(xhr){
            XHR.count--;
            debug("posted:"+XHR.count);
            typeof func == "function" ? func(xhr) : null;
          },
            onerror:function(xhr){
            debug("error:"+url);
            if(typeof errorFunc == "function" ){
              errorFunc(xhr);
            }
          }
        });
    },

    get:function(url, params, func, errorfunc){
      XHR.count++;
      debug("try get:"+XHR.count);
      var data = XHR.mkParamData(params);
      debug(data);
      GM_xmlhttpRequest({
          url:[url,data].join("?"),
            method:"GET",
            onload:function(xhr){
            XHR.count--;
            debug("got:"+XHR.count);
            typeof func == "function" ? func(xhr) : null;
          },
            onerror:function(xhr){
            debug("error:"+url);
            typeof errorFunc == "function" ? errorFunc(xhr) : null;
          }
        });
    }
  }



  Array.prototype.remove = function(index){
    if(0 <= index && index < this.length){
      var array = [];
      for(var i=this.length-1;i>index;i--){
        array.unshift(this.pop());
      }
      this.pop();
      var length = array.length;
      for(var i=0;i<length;i++){
        var item = array[i];
        this.push(item);
      }
    }
  };

  Array.prototype.insert = function(index, element){
    if(0 <= index && index < this.length){
      var array = [];
      for(var i=this.length-1;i>=index;i--){
        array.unshift(this.pop());
      }
      this.push(element);
      var length = array.length;
      for(var i=0;i<length;i++){
        var item = array[i];
        this.push(item);
      }
    }
  };

  Date.prototype.toDirString = function (){
    function f(n) {
      return n < 10 ? '0' + n : n;
    }
    return this.getFullYear() + '-' +
    f(this.getMonth() + 1) + '-' +
    f(this.getDate()) + 'T' +
    f(this.getHours()) + ':' +
    f(this.getMinutes()) + ':' +
    f(this.getSeconds());
  };

  // debug
  function debug(s){
    if(unsafeWindow.hasOwnProperty("console") && unsafeWindow.console.debug){
      console.debug(s);
    }
  }

  function debugByJSON(object){
    if(unsafeWindow.hasOwnProperty("console") && unsafeWindow.console.debug){
      console.debug(objectToJSON(object));
    }
  }


  var jsEncode =function(str){
    return str.replace(/\\/ig,"\\\\")
    .replace(/\f/ig,"\\f")
    .replace(/\n/ig,"\\n")
    .replace(/\r/ig,"\\r")
    .replace(/\t/ig,"\\t")
    .replace(/\'/ig,"\\'")
    .replace(/\"/ig,"\\\"");
  }

  var objectToJSON = function(object){
    var rtn;
    if(object==null){
      rtn = "null";
    }else{
      var callee = arguments.callee;
      switch(object.constructor){
      case Boolean:
        rtn = object ? "true" : "false";
        break;
      case Number:
        rtn = isNaN(object) || !isFinite(object)? "null" : object.toString(10);
        break;
      case String:
        rtn = ["\"", jsEncode(object), "\""].join("");
        break;
      case Array:
        var buf = [];
        for(var i=0;i<object.length;i++){
          buf.push(callee(object[i]));
        }
        rtn = ["[", buf.join(","), "]"].join("");
        break;
      case Object:
        var buf = [];
        for(var key in object){
          if(object.hasOwnProperty(key)){
            buf.push(callee(key)+":"+callee(object[key]));
          }
        }
        rtn = ["{", buf.join(","), "}"].join("");
        break;
      default:
        rtn = "null";
        break;
      }
    }
    return rtn;
  };

  var FileManager = {
    listener:{save:[], load:[]},
    init:function(){
      var rootString = GM_getValue("_root");
      if(!rootString){
        FileManager.root = FileManager.createDirectory();
      } else {
        FileManager.root = eval(decodeURIComponent(rootString));
      }
    },

    addEventListener:function(type, listener, useCapture){
      if(typeof FileManager.listener[type] != "undefined"){
        FileManager.listener[type].push(listener);
      }
    },
    removeEventListener:function(type, listener, useCapture){
      var listeners = FileManager.listener[type];
      if(typeof listeners != "undefined"){
        var length = listeners.length;
        for(var i=0;i < length; i++){
          if(listener == listeners[i]){
            FileManager.listener[type].remove(i);
            break;
          }
        }
      }
    },

    notify:function(type, event){
      var listeners = FileManager.listener[type];
      if(typeof listeners != "undefined"){
        var length = listeners.length;
        for(var i=0;i < length; i++){
          if(typeof listeners[i] == "function"){
            listeners[i](event);
          }
        }
      }

    },
    addFile:function(path, content, option){
      if(FileManager.type(path) == "directory"){
        return;
      }
      FileManager.init();
      var pathinfo = FileManager.walk(path, true);
      var parent = pathinfo.parent.children;
      var filename = pathinfo.name;
      if(parent){
        var date = new Date().toDirString();
        if(!parent[filename] || !parent[filename].type){
          parent[filename] = FileManager.createFile();
        }
        parent[filename]["updatedOn"] = date;
        parent[filename]["content"] = content ? encodeURIComponent(content) : "";
        if(typeof option == 'object'){
          for(attribute in option){
            if(option.hasOwnProperty(attribute)){
              parent[filename][attribute] = option[attribute];
            }
          }
        }
        FileManager.saveRoot();
      }
    },

    createNode:function(){
      var date = new Date().toDirString();
      return {createdOn:date, updatedOn:date};
    },

    createFile:function(){
      var node = FileManager.createNode();
      node.type = "file";
      return node;
    },
    createDirectory:function(){
      var node = FileManager.createNode();
      node.type = "directory";
      node.children = {};
      return node;
    },

    getChildren:function(node){
      var children = node;
      if(node.type && node.type == "directory"){
        children = node.children;
      } else {
        //debug("!!!!!!!");
      }
      return children;
    },

    walk:function(path, mkdir){
      if(!FileManager.validPath(path)){
        alert("invalid path:" + path);
        return;
      }

      if(path.match(/\/$/)){
        path = path.substring(0, path.length - 1);
      }
      var path_array = path.split("/");
      var parent = FileManager.getChildren(FileManager.root);
      var value = parent;
      var result = {name:path_array.pop()};
      var length = path_array.length;
      for(var i=0;i<length;i++){
        var p = path_array[i];
        value = parent[p];
        if(mkdir && !parent.hasOwnProperty(p)){
          parent[p] = FileManager.createDirectory();
          value = parent[p];
          parent = FileManager.getChildren(value);
        } else if(value == null  || typeof value != 'object' || value.type && value.type == "file"){
          if(i < length - 1){
            return null;
          } else {
            value = FileManager.getChildren(parent);
          }
        } else {
          parent = FileManager.getChildren(value);
        }
      }
      if(typeof value == "object" && value.type != "directory" ){
        value = {type:"directory", children:value};
      }
      result["parent"] = value;
      return result;
    },

    type:function(path){
      if(path == "/"){
        return "directory";
      }
      var pathValue = FileManager.walk(path);
      if(pathValue == null){
        return null;
      } else {
        var file = pathValue.parent.children[pathValue.name];
        if(typeof file == "object"){
          if(file.type != "file"){
            return "directory";
          } else {
            return "file";
          }
        } else if(file == "file"){
          return file;
        } else {
          return null;
        }
      }
    },
    info:function(path){
      if(path == "/"){
        return "";
      }
      if(path != "/" && path.match(/\/$/)){
        path = path.substring(0, path.length - 1);
      }
      var pathinfo = FileManager.walk(path);
      return pathinfo ? pathinfo.parent.children[pathinfo.name] : "";
    },
    saveRoot:function(){
      GM_setValue("_root", encodeURIComponent("(" + objectToJSON(FileManager.root) + ")"));
    },
    validPath:function(path){
      if(!path || !path.match(/^\//) || path.match(/\s/)){
        return false;
      }
      var array = path.split("/");
      var length = array.length;
      for(var i=0;i<length;i++){
        var a = array[i];
        if(a == "." || a == ".."){
          return false;
        }
      }
      return true;
    },
    save:function(path, text, option){
      if(!FileManager.validPath(path)){
        alert("invalid path:" + path);
        return;
      }
      if(FileManager.type(path) != "directory"){
        // GM_setValue(path, text ? encodeURIComponent(text) : "");
        //FileManager.addFile(path, option);
        FileManager.addFile(path, text, option);
        FileManager.notify("save", {type:"save", path:path, text:text});
      }
    },

    load:function(path){
      var text = null;
      //var encodedText = GM_getValue(path);
      var pathinfo = FileManager.walk(path, false);
      var parent = pathinfo.parent.children;
      var filename = pathinfo.name;
      if(parent && parent.hasOwnProperty(filename)){
        var encodedText = parent[filename]["content"];
        if(encodedText){
          text = decodeURIComponent(encodedText);
        }
        FileManager.notify("load", {type:"load", path:path, text:text});
      }
      return text;
    },
    mkdir:function(path){
      if(path == "/"){
        return;
      }

      FileManager.init();
      FileManager.walk(path, true);
      FileManager.saveRoot();
    },
    rm:function(path){
      if(path == "/"){
        alert("/ can't be removed.");
        return;
      }
      if(GM_getValue(path)){
        GM_setValue(path, "");
      }
      if(!FileManager.type(path)){
        return;
      }
      FileManager.init();
      var pathinfo = FileManager.walk(path);
      delete pathinfo.parent.children[pathinfo.name];
      FileManager.saveRoot();
      FileManager.init();
    },
    ls:function(path){
      var list = [];
      if(FileManager.type(path) == "directory"){
        var pathinfo = FileManager.walk(path);
        var directory = pathinfo.parent.children[pathinfo.name].children;
        if(directory){
          for(file in directory){
            if(directory.hasOwnProperty(file)){
              if(directory[file] == "file" ||
                 directory[file].type && directory[file].type == "file"){
                list.push(file);
              } else {
                list.push(file + "/");
              }
            }
          }
        }
      } else if(FileManager.type(path) == "file"){
        list.push(path.split("/").pop());
      }
      return list;
    },
    parentPath:function(path){
      if(path == "/"){
        return path;
      }
      if(path.match(/\/$/)){
        path = path.substring(0, path.length -1);
      }
      path.match(/(.*\/)[^\/]*$/);
      return RegExp.$1;
    },
    filename:function(path){
      path.match(/\/([^\/]*)$/);
      return RegExp.$1;
    }

  };

  var Editor = {
    currentMode:"",
    currentPath:"",
    dirty:false,
    firstText:"",
    syncStatus:"",
    listener:{show:[], hide:[], change:[], open:[]},

    getRow:function(){
      return 1;
    },

    getColumn:function(){
      return 1;
    },

    addEventListener:function(type, listener, useCapture){
      if(typeof Editor.listener[type] != "undefined" &&
         typeof listener == "function"){
        Editor.listener[type].push(listener);
      }
    },

    removeEventListener:function(type, listener, useCapture){
      var listeners = Editor.listener[type];
      if(typeof listeners != "undefined"){
        var length = listeners.length;
        for(var i=0;i < length; i++){
          if(listener == listeners[i]){
            //debug(listener);
            Editor.listener[type].remove(i);
            break;
          }
        }
      }
    },

    notify:function(type, event){
      var listeners = Editor.listener[type];
      if(typeof listeners != "undefined"){
        var length = listeners.length;
        for(var i=0;i < length; i++){
          //debug(listeners[i]);
          if(typeof listeners[i] == "function"){
            listeners[i](event);
          } else {
            listeners.remove(i);
            i--;
          }
        }
      }

    },

    setText:function(text){
      var textarea = $("__text__");
      if(textarea.value != text)
        textarea.value = text.replace(/\r/g, "");
      Editor.dirty = false;
      Editor.firstText = text;
      Editor.changeStatus();
    },

    addText:function(text){
      $("__text__").value = $("__text__").value + text.replace(/\r/g, "");
      Editor.dirty = true;
      Editor.changeStatus();
    },

    getText:function(){
      var textarea = $("__text__");
      //var cursor = textarea.selectionStart;
      var value = textarea.value;
      //textarea.selectionStart = cursor;
      return value;
    },

    setCommand:function(text){
      $("__mini__").innerHTML = text;
      unsafeWindow.status  = text ? "gmacs key phrase:" + text : "";
    },

    changeStatus:function(){
      var text = [];
      // dirty status
      if(Editor.dirty){
        text.push("**");
      } else {
        text.push("--");
      }

      // file name
      text.push(" ");
      var filename = "*scratch*";
      if(Editor.currentPath){
        filename = FileManager.filename(Editor.currentPath);
      }
      text.push(filename);

      // column and row
      var textarea = $("__text__");
      try{
        if("selectionStart" in textarea){
          textarea.focus();
          var value = textarea.value;
          var start = textarea.selectionStart;
          var formerText = value.substring(0, start);
          var formerLines = formerText.split("\n");
          var row = formerLines.length;
          var column = start - formerText.lastIndexOf("\n");
          text.push("(" + row + "," + column +")");
          Editor.textLines = value.split("\n");
          Editor.getRow = function(){
            return row;
          };
          Editor.getColumn = function(){
            return column;
          };
        }
      } catch(e){
        debug(e);
      }

      // sync status
      text.push(Editor.syncStatus);

      $("__status__").innerHTML = "";
      $add($("__status__"), text.join(" "));
    },

    preSelectText:"",

    selectText:function(text){
      var textarea = $("__text__");
      var value = textarea.value;
      var position = textarea.selectionEnd;
      if(position < 0) return;
      var postValue = value.substring(position, value.length);
      var index= postValue.indexOf(text);
      if(index < 0) return;
      Editor.preSelectText = text;
      textarea.selectionEnd =
      (textarea.selectionStart = position + index) + text.length;
    },

    moveCursor:function(position, noAgain){
      var textarea = $("__text__");
      textarea.focus();
      try{
        textarea.selectionStart = position;
        textarea.selectionEnd = position;
      }catch(e){
        if(!noAgain)
          setTimeout(function(){Editor.moveCursor(position, true)}, 100);
      }
    },

    moveCursorOffset:function(offset, noAgain){
      var textarea = $("__text__");
      textarea.focus();
      try{
        textarea.selectionStart += offset;
        textarea.selectionEnd = textarea.selectionStart;
      }catch(e){
        if(!noAgain)
          setTimeout(function(){Editor.moveCursor(position, true)}, 100);
      }
    },


    moveCursorRow:function(offset){
      offset = (offset > 0)? 1 : - 1;
      var row = Editor.getRow();
      var column = Editor.getColumn();
      var currentLine = Editor.textLines[row - 1];
      var nextLineIndex = row - 1 + offset;
      if(Editor.textLines.length <= nextLineIndex){
        Editor.addText("\n");
        Editor.moveCursorOffset(1);
      } else if(nextLineIndex < 0){
        // nothing to do
      } else {
        var nextLine = Editor.textLines[nextLineIndex];
        var moveSize = 0;
        if(offset > 0){
          var offsetAux = column - 1;
          if(column > nextLine.length)
            offsetAux = nextLine.length;
          moveSize = currentLine.length - (column - 1) + 1 + offsetAux;
        } else if(offset < 0){
          var offsetAux = 0;
          if(nextLine.length >= column)
            offsetAux = nextLine.length - (column - 1);
          moveSize = -(column  + offsetAux);
        }
        Editor.moveCursorOffset(moveSize);
      }
    },

    dirtyCheckAndChangeStatus:function(event){
      var func = function(){
        if(!Editor.dirty && Editor.firstText != Editor.getText()){
          Editor.dirty = true;
          Editor.notify("change", {type:"change"});
        }
        Editor.changeStatus();
      };
      setTimeout(func,1);
    },

    init:function(){
      var div = $tag("div", {id:"__shade__"});
      var textarea = $tag("textarea", {id:"__text__"});
      var status = $tag("div", {id:"__status__"});
      status.style.fontFamily="courier new";
      var mini = $tag("div", {id:"__mini__"});
      mini.style.fontFamily = "courier new";
      $add(document.body,
           $add(div, textarea, status, mini));
      $event(window, "resize", Editor.resize);
      Editor.resize();
      Editor.makeStyle();
      Editor.changeStatus();
      $event(textarea, "keypress", Editor.dirtyCheckAndChangeStatus);
      $event(textarea, "mouseup", Editor.dirtyCheckAndChangeStatus);
    },

    getBufferStatus:function(){
      var text = Editor.getText();
      return {
        path:Editor.currentPath,
        text:text,
        dirty:Editor.dirty,
        cursor:text.length
      };
    },

    setBufferStatus:function(buffer){
      Editor.currentPath = buffer.path;
      Editor.setText(buffer.text);
      Editor.dirty = buffer.dirty;
      Editor.moveCursor(buffer.cursor);
      Editor.changeStatus();
    },

    resize:function(e){
      var div = $("__shade__");
      var textarea = $("__text__");
      var status = $("__status__");
      var mini = $("__mini__");
      div.innerWidth = window.innerWidth;
      div.innerHeight = window.innerHeight;
      textarea.style.width = (window.innerWidth - 35) + "px";
      textarea.style.height = (window.innerHeight - 70) + "px";
      status.style.width = (window.innerWidth - 35) +"px";
      mini.style.width = (window.innerWidth - 35) +"px";
    },
    makeStyle:function(){
      var s= <><![CDATA[
                        #__shade__ {
                          background-color:black;
                          position:fixed;
                          top:0;
                          left:0;
                          width:100%;
                          height:100%;
                          padding:10px;
                          margin:0;
                          z-index:999998;
                          display:none;
                        }
                        #__text__ {
                          font-family:courier new;
                          font-size:10pt;
                          background-color:#FFFFEE;
                          padding:0;
                          margin:0;
                          display:block;
                        }
                        #__status__ {
                          background-color:#9999EE;
                          color:white;
                          text-align:left;
                          height:20px;
                          padding:0;
                          margin:0;
                          margin-top:2px;
                        }
                        #__mini__ {
                          background-color:#CCEECC;
                          text-align:left;
                          height:20px;
                          padding:0;
                          margin:0;
                          margin-top:2px;
                        }
                        ]]></>;
      GM_addStyle(s);
    },

    toggleView:function(){
      var div = $("__shade__");
      if(div.style.display == "block"){
        Editor.hide();
      } else {
        Editor.show();
      }
    },

    closeCB:function(e){
        Editor.hide();
    },

    showImpl:function(){
      var now = new Date().getTime();
      if(GM_getValue("gmacs status", "off")=="on" && now - Editor.startTime < 2000){
        Editor.otherTab=true
        setTimeout(Editor.showImpl, 100);
      } else {
        GM_setValue("gmacs status", "on");
        var div = $("__shade__");
        div.style.display = "block";
          $("__text__").focus();
          $event(window, "unload", Editor.closeCB);

        //if(Editor.otherTab){
        var buffer = GM_getValue("buffer");
        if(buffer)
          Editor.setBufferStatus(eval(buffer));
        Editor.otherChecker=setInterval(function(){
          var start = GM_getValue("ladt start");
          if(start > Editor.startTime){
            Editor.hide();
          }
        }, 100);
        Editor.notify("show", {type:"show"});
      }
    },

    show:function(){
      var now = new Date().getTime();
      Editor.startTime = now;
      GM_setValue("ladt start", ""+now);
      Editor.showImpl();
    },

    hide:function(){
      var div = $("__shade__");
      div.style.display = "none";
      GM_setValue("buffer", uneval(Editor.getBufferStatus()));
      if("closeCB" in Editor){
        window.removeEventListener("unload", Editor.closeCB, true);
      }
      if("otherChecker" in Editor){
        clearInterval(Editor.otherChecker);
      }
      GM_setValue("gmacs status", "off");
      Editor.notify("hide", {type:"hide"});
    },

    isShown:function(){
      return $("__shade__").style.display == "block";
    },

    // functions for Command
    saveCheck :function(){
      if(Editor.dirty){
        if(confirm("why don't you save ?")){
          Editor.filesave();
        }
      }
    },

    fileopen:function(path){
      if(!FileManager.validPath(path)){
        alert("invalid path:" + path);
        return;
      }

      var type = FileManager.type(path);
      if(type == "directory"){
        Editor.dir(path);
      } else {
        var text = FileManager.load(path);
        if(typeof text != "string"){
          text = "";
        }
        Editor.currentPath = path;
        Editor.syncStatus = "";
        Editor.setText(text);
        Editor.currentMode = "";
        Editor.notify("open", {path:path, text:text});
        Editor.moveCursor(0);
      }
    },
    filesave:function(){
      var text = Editor.getText();
      FileManager.save(Editor.currentPath, text);
      Editor.setText(text);
    },
    filesaveas: function(path){
      if(!FileManager.validPath(path)){
        alert("invalid path:" + path);
        return;
      }
      Editor.currentPath = path;
      Editor.filesave();
    },
    rm :function(path){
      if(confirm("remove " + path + " really?")){
        FileManager.rm(path);
      }
    },
    wget : function(url){
      GM_xmlhttpRequest({url:url,
                         method:"GET",
                         onload:function(xhr){
            Editor.addText(xhr.responseText);
          }
        });
    },
    execute :function(path){
      Executer.execute(path);
    },
    dir:function(path){
      Dir.setCurrentDirectory(path);
      Dir.show();
    },
    command :function(name){
      Commander.execute(name);
    }
  };

  var KeyProcessor = {
    shortCuts:{gmacs:[], web:[]},
    toggleShortCut:"",
    keyLists:{gmacs:[], web:[]},
    //keyList:[],
    //keyListWhenDisable:[],
    init:function(){
      $event(document, "keydown", KeyProcessor.process);
    },

    addShortCut:function(phrase, command, mode){
       if(typeof command == "string" && command.match(/^\//)){
         KeyProcessor.addShortCutExec(phrase, command, mode);
       } else {
         KeyProcessor.addShortCutFunc(phrase, command, mode);
       }
    },

    addShortCutExec:function(phrase, path, mode){
      KeyProcessor.addShortCutFunc(phrase, KeyProcessor.makeExecFunc(path),
                                    mode);
    },

    addShortCutFunc:function(phrase, command, mode){
      KeyProcessor.addShortCutAux(phrase, command, mode);
    },

    addShortCutAux:function(phrase, command, mode){
       if(mode == true || typeof mode == "undefined"){
         mode = "gmacs";
       } else if(!mode){
         mode = "web";
       }
      var shortCuts = KeyProcessor.shortCuts[mode];
      if(!shortCuts){
        shortCuts = (KeyProcessor.shortCuts[mode] = []);
      }
      if(typeof command == "function"){
        shortCuts.unshift({phrase:phrase, func:command});
      } else if(typeof command == "string"){
        shortCuts.unshift({phrase:phrase, func:function(){Commander.execute(command);}});
      }
    },

    addShortCutWhenEnable:function(phrase, command){
      KeyProcessor.addShortCutAux(phrase, command);
    },

    addShortCutWhenDisable:function(phrase, command){
      KeyProcessor.addShortCutAux(phrase, command, false);
    },

    addShortCutExecWhenEnable:function(phrase, path){
      KeyProcessor.addShortCutAux(phrase, KeyProcessor.makeExecFunc(path));
    },
    addShortCutExecWhenDisable:function(phrase, path){
      KeyProcessor.addShortCutAux(phrase, KeyProcessor.makeExecFunc(path), false);
    },

    makeExecFunc:function(path){
      var func = function(){Executer.execute(path);}
      if(path instanceof Array){
        func = function(){
          path.forEach(function(p){
              Executer.execute(p);
            });
        };
      }
      return func;
    },

    setToggleShortCut:function(phrase){
      KeyProcessor.addShortCut(phrase,
                               function(){
                                 Editor.toggleView();
                               }, "gmacs");
      KeyProcessor.addShortCut(phrase,
                               function(){
                                 Editor.toggleView();
                               }, "web");
    },

    process:function(event){
      if(Editor.currentMode && KeyProcessor.shortCuts[Editor.currentMode]){
        if(!KeyProcessor.keyLists[Editor.currentMode]){
          KeyProcessor.keyLists[Editor.currentMode] = [];
        }
        if(KeyProcessor.processAux(event,
                                   KeyProcessor.keyLists[Editor.currentMode],
                                   KeyProcessor.shortCuts[Editor.currentMode]))
          return;
      }
      if(Editor.isShown()){
        KeyProcessor.processAux(event,
                                KeyProcessor.keyLists.gmacs,
                                KeyProcessor.shortCuts.gmacs);
        KeyProcessor.keyLists.web = [];
      } else {
        KeyProcessor.processAux(event,
                                KeyProcessor.keyLists.web,
                                KeyProcessor.shortCuts.web);
        KeyProcessor.keyLists.gmacs = [];
      }
    },
    processAux:function(event, keyList, shortCuts, minorMode){
      var doSomething = false;
      keyList.push(KeyProcessor.code(event));
      //var mode = keyList == KeyProcessor.keyList ? "enable" : "disable";
      var phrase = keyList.join(" ");
      Editor.setCommand(phrase);
      var inStroke = false;
      var length = shortCuts.length;
      for(var i=0;i<length;i++){
        var shortCut = shortCuts[i];
        if(phrase == shortCut.phrase){
          shortCut.func();
          keyList.length = 0;
          inStroke = false;
          event.preventDefault();
          doSomething = true;
          break;
        } else if(shortCut.phrase.indexOf(phrase) == 0
                  && phrase.length < shortCut.phrase.length){
          inStroke = true;
          event.preventDefault();
        }
      }
      if(!inStroke){
        keyList.length = 0;
        if(!minorMode)
          Editor.setCommand("");
      }
      return doSomething;
    },
    code:function(event){
      var code = [];
      if(event.shiftKey){
        code.push("S");
      } else if(event.ctrlKey){
        code.push("C");
      } else if(event.altKey || event.metaKey){
        code.push("M");
      }
      code.push(KeyProcessor.kc2char(event.keyCode));
      return code.join("-");
    },
    kc2char:function(kc){
      var between = function(a,b){
        return a <= kc && kc <= b;
      };

      var _32_40 = "space pageup pagedown end home left up right down".split(" ");
      var kt = {
        8  : "back",
        9  : "tab"  ,
        13 : "enter",
        16 : "shift",
        17 : "ctrl",
        27 : "esc",
        46 : "delete",

      };
      return (
              between(65,90)  ? String.fromCharCode(kc+32) : // a-z
              between(48,57)  ? String.fromCharCode(kc) :    // 0-9
              between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
              between(32,40)  ? _32_40[kc-32] :
              kt.hasOwnProperty(kc) ? kt[kc] :
              kc
              );
    }

  };
  var Commander = {
    commands :{},

    addCommand:function(name, func, args, beforeFunc){
      Commander.commands[name] = {func:func, args:args, before:beforeFunc};
    },
    execute:function(name){
      var command = Commander.commands[name];
      if(command){
        var before = command.before;
        if(typeof before == "function"){
          before();
        }
        var func = command.func;
        var argInfos = command.args;
        var args = [];
        var cancel = false;
        if(argInfos && argInfos.length > 0){
          for(var i=0;i<argInfos.length;i++){
            var message = ["[" + name + "]"];
            var argInfo = argInfos[i];
            var length = args.length;
            for(var j=0;j<length;j++){
              message.push(argInfos[j].name + ":" + args[j]);
            }
            message.push(argInfo.name +":");
            var defaultValue = argInfo.defaultValue;
            if(typeof defaultValue == "function"){
              defaultValue = defaultValue();
            }
            var value = prompt(message.join("\n"), defaultValue);
            if(value){
              args.push(value);
            } else {
              cancel = true;
              break;
            }
          }
        }
        if(!cancel){
          func.apply(window, args);
        }
      }
    }
  };
  var Executer = {
    parseScriptInfo:function(script){
      if(typeof script != "string"){
        return null;
      }
      var scriptInfo = {script:script,
                        include:[],
                        exclude:[]
      };
      script.replace(/[\n\r]/g, "<$>").match(/==UserScript==(.*)==\/UserScript==/m);
      var infoText = RegExp.$1;
      var infos = infoText.split("<$>");
      infos.forEach(function(info){
          if(info){
            var nv = info.match(/\/\/\s*@\s*(\S*)\s*(.*)$/);
            if(nv && nv.length >= 3){
              var name = nv[1];
              var value = nv[2];
              if(name == "include" || name == "exclude"){
                scriptInfo[name].push(value);
              } else {
                scriptInfo[name] = value;
              }
            }
          }
        });
      if(scriptInfo.include.length == 0){
        scriptInfo.include.push("*");
      }
      return scriptInfo;
    },
    executable:function(option){
      var result = true;
      if(option ){
        var includes = option.include;
        var excludes = option.exclude;
        if(includes || excludes){
          if ((excludes && Executer.matchAny(excludes)) ||
              (includes && Executer.unmatchAll(includes))){
            result = false;
          }
        }
      }
      return result;
    },

    execute:function(path, option){
      if(typeof option == "object"){
        if(!Executer.executable(option)){
          return;
        }
      }
      if(typeof path == "string"){
        var type = FileManager.type(path);
        if(type == "file"){
          var script = FileManager.load(path);
          if(!script){
            return;
          }
          option = Executer.parseScriptInfo(script);
          if(!Executer.executable(option)){
            return;
          }
          var namespace = option.namespace ? option.namespace : "gmacs";
          Executer._GM_setValue = function(name, value){
            //debug("[set]" + namespace +"_" + name+"):" + value);
            GM_setValue(namespace +"_" + name, value);
          };
          Executer._GM_getValue = function(name){
            //debug("[get]" + namespace +"_" + name);
            return GM_getValue(namespace +"_" + name);
          };
          try{
            script = script
              .replace(/GM_setValue/g, "Executer._GM_setValue")
              .replace(/GM_getValue/g, "Executer._GM_getValue");
            eval(script);
          }catch(e){
            var message = [];
            message.push("exec error!");
            message.push(e);
            message.push("[stack information]");
            message.push("----------------------------------------");
            message.push(e.stack
                         .replace(/\@\:\d+/g, "\n----------------------------------------")
                         .replace(/\\n/g, "\n")
                         .replace(/\\r/g, "")
                         .replace(/\\t/g, "\t")
                         .replace(/\\\"/g, "\""));
            alert(message.join("\n"));

          }
        } else if(type == "directory"){
          if(!path.match(/\/$/)){
            path = path + "/";
          }
          var files = FileManager.ls(path);
          files.forEach(function(file){
              var filepath = path + file;
              Executer.execute(filepath);
            });
        }
      } else if(typeof path == "function"){
        path();
      }
    },

    makeRegExp : function(pattern){
      pattern = pattern.replace(/\//g, "\\/").replace(/\./g, "\\.").replace(/\*/g, ".*");
      pattern = ["^", pattern, "$"].join("");
      return new RegExp(pattern);
    },

    matchAny : function(patterns){
      var url = document.location.href;
      if(typeof patterns == "string"){
        patterns = [ patterns];
      }
      var length = patterns.length;
      for(var i=0; i<length; i++){
        var pattern = patterns[i];
        var regexp = Executer.makeRegExp(pattern);
        if(url.match(regexp)){
          return true;
        }
      }
      return false;
    },
    unmatchAll : function(patterns){
      var url = document.location.href;
      if(typeof patterns == "string"){
        patterns = [ patterns];
      }
      var length = patterns.length;
      for(var i=0; i<length; i++){
        var pattern = patterns[i];
        var regexp = Executer.makeRegExp(pattern);
        if(url.match(regexp)){
          return false;
        }
      }
      return true;
    }
  };
  var Dir = {
    currentDirectory:"/",
    init:function(){
      var div = $tag("div", {id:"__dir__"});
      div.style.display = "none";
      var path = $tag("input", {type:"text", id:"__path__"});
      var setButton = $tag("input", {type:"button",
                                     value:"set",
                                     id:"__set_button__"});
      $event(setButton, "click",
             function(event){
               Dir.setCurrentDirectory($("__path__").value);
             });
      var closeButton = $tag("input", {type:"button",
                                       value:"close",
                                       id:"__close_button__"});
      $event(closeButton, "click",
             function(event){
               Dir.hide();
             });
      var list = $tag("div", {id:"__list__"});
      $add($("__shade__"),
           $add(div, path, setButton, closeButton, list));
      Dir.makeStyle();
    },
    toggleView:function(){
      var div = $("__dir__");
      if(div.style.display == "block"){
        div.style.display = "none";
      } else {
        div.style.display = "block";
      }
    },

    isShown:function(){
      return $("__dir__").style.display == "block";
    },
    show:function(){
      $("__dir__").style.display = "block";
    },
    hide:function(){
      $("__dir__").style.display = "none";
    },

    setCurrentDirectory:function(path){
      if(FileManager.type(path) != "directory"){
        return;
      }
      if(path != "/" && !path.match(/\/$/)){
        path = path + "/";
      }
      Dir.currentDirectory = path;
      $("__path__").value = path;
      var files = FileManager.ls(path);
      if(path != "/"){
        files.unshift("..");
      }
      var table = $tag("table");
      files.forEach(function(file){
          var tr = $tag("tr");
          var nameTd = $tag("td");
          var a = $tag("a");
          a.style.fontFamily = "courier new";
          var updateTd = $tag("td");
          updateTd.style.fontFamily = "courier new";
          var urlTd = $tag("td");
          urlTd.style.fontFamily = "courier new";
          var filepath = path + file;
          if(file.match(/\/$/) || file == ".."){
            $event(a, "click",
                   function(event){
                     if(file == ".."){
                       Dir.currentDirectory.match(/(.*\/)[^\/]*\/$/);
                       Dir.currentDirectory = RegExp.$1;
                     } else if(Dir.currentDirectory.match(/\/$/)){
                       Dir.currentDirectory =
                         Dir.currentDirectory + file;
                     } else {
                       Dir.currentDirectory =
                         Dir.currentDirectory + "/" + file;
                     }
                     Dir.setCurrentDirectory(Dir.currentDirectory);
                   });
          } else {
            $event(a, "click",
                   function(event){
                     Editor.saveCheck();
                     if(Dir.currentDirectory.match(/\/$/)){
                       Editor.fileopen(Dir.currentDirectory + file);
                     } else {
                       Editor.fileopen(Dir.currentDirectory + "/" + file);
                     }
                     Dir.hide();
                   });
          }
          if(file != ".."){
            var info = FileManager.info(filepath);
            if(info){
              $add(updateTd, info.updatedOn);
              if(info.url){
                var urlA = $tag("a", {href:info.url, textContent:info.url});
                urlA.style.fontFamily = "courire new";
                $add(urlTd, urlA);
              }
            }
          }
          a.textContent = file;

          $add(table,
               $add(tr,
                    $add(nameTd, a),
                    updateTd,
                    urlTd));
        });
      $("__list__").innerHTML = "";
      $add($("__list__"), table);
    },
    makeStyle:function(){
      var s= <><![CDATA[
                        #__dir__ {
                          text-align:left;
                          background-color:black;
                          position:fixed;
                          font-size:10pt;
                          font-family:monospaced;
                          top:0;
                          left:0;
                          width:100%;
                          height:100%;
                          padding:10px;
                          margin:0;
                          opacity:0.90;
                          z-index:999999;
                          display:none;
                        }
                        #__path__ {
                        }
                        #__buttons__ {
                        }
                        #__list__ {
                          font-family:courier new;
                          background-color:white;
                          text-align:left;
                          padding:10px;
                          margin:10px;
                        }
                        #__list__ ul{
                          list-style-type:none;
                          text-align:left;
                          padding:10px;
                          margin:0;
                        }
                        #__list__ li{
                          margin-bottom:5px;
                        }
                        #__list__ a{
                          text-decoration:underline;
                          color:blue;
                        }]]></>
      GM_addStyle(s);
    },


  };

  Importer = {
    inited:false,
    makeIcon:function(){
      var icon = $tag("img", {src:"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%11IDAT8%CB%85%93%3Bk%94A%14%86%9F%99%EF%5B%BFd%E3%C6D%BC%20%DERXh%0A%BB%C4%26%85%85%85m%FE%83%B5%3F%24V%81%80)%04A%0B%C1%DE%C6%DA%C6B%10%C1%C6%88%A8H%94%95%ECf%DD%CD%EEw93%AF%C5%5E%B2j%88%07%5E%869%1C%9Ey%CF%99%19'%89%A3%C29w%058%0F%B8q%0A%18%177%81%AF%92%22%92%8E%14%B0R%96eaf%9AV%9E%E7%DA%DA%DA%DA%04%96%00%7F%1C%60%D5%CC4%18%0C%D4%EDv%D5n%B7%D5l6ef%EA%F7%FB%DA%DE%DE%DE%04%96%DC1-%AC%9A%D9k3%23%C6%88%99Q%14%05%8B%8B%8B%93%9A4Moy%FE%13I%92%E0%BD'I%12%B2%2C%A3%D3%E9%D0j%B5%0E!%1F%5E%AC%BC%9D%99_%5Evn%9A%25%9E%3D%B8%D9%1C9!I%92%B1%2B%9Cs%98%D9!%C0%C9_%BF%BC%F6%B8%E6%9C%1B%CDX%E0%1CWyyq%AA%1D%92%24%C197%D9O%00%98rb%99%15%3F%1E%12%CA%04%FC%3C%CE5%F0%C9%C2%DF3%F9%074%04T%CE%C7P%60E%0DEQ%B5%DF%D3%FF%FE%91%C6n%93%2F%3BsH%01Y%09D%7C%7D%01%14HN%9D%E6%D2%DD%A7%23%80%D3%8CBN5p%A8%3C%A0%EA%89%B3k%1B%2C%A6%17%A8%CF%9Dd%FA%96%C6'%7F~%BE%3E%ED%C0%93%CE%9Ec%E1%C6%3D%20%82%84%88%14%3B%F7%E9%A75P%F8c%B8%B3%D7%1E!%89%10B%0F%08)%95%A4%90%13%FB%EFP%E8%A0%D0E%B6Oau%AAA%8E%C7%86%60%021%06%CA%D6.%BD%BDo%CA%B2%EC6%D0L)%90%A2%11%AB%9F%C8%3AC%88%EDS%9Fu%90%B9%A1%23%19%A8B%B1%A2%DE%A81%93y%93%F4f%D8B)9%02%B2%16%B2%FD%A1B%07%E2%60%04%EB%A2%F0%0B%85%03%14sP%0E6%F9T%A4*c%DB%FA%7B%F5%AAw%A2Alx%A9%06%B1%01%3A%83B%01%94%C8%0FW%E7%03%A1%E8Ie%2C%0E%01y%B1%F1i%7B%7D%15q%07G%E3%D8w-%C0%BD*%89z2N%FD%06j%08l%B2%3F%20%EB%12%00%00%00%00IEND%AEB%60%82",
                              alt:"import"});
      return icon;
    },
    init:function(){
      if(Importer.inited){
        return;
      } else {
        Importer.inited = true;
      }
      var as = document.getElementsByTagName("a");
      var array = []
      for(var i=0;i<as.length;i++){
        array.push(as[i]);
      }
      array.forEach(function(a){
          var href = a.href;
          if(href.match(/\.js$/) ){
            var button = $tag("a",{title:"import"});
            $add(button, Importer.makeIcon());
            $event(button, "click",
                   function(e){
                     var path = prompt("import script to:",
                                       "/plugins/" +
                                       FileManager.filename(href));
                     if(path){
                       GM_xmlhttpRequest({url:href,
                             method:"GET",
                             onload:function(xhr){
                             FileManager.save(path, xhr.responseText,
                                              {url:href});
                             Editor.fileopen(path);
                             Editor.show();
                           }
                         });

                     }
                   });
            a.parentNode.insertBefore(button, a);
          }
        });
    }
  };
  function init(){
    FileManager.init();
    Editor.init();
    KeyProcessor.init();
    Dir.init();
    if(!FileManager.type("/init.js")){
      var initURL ="http://gomaxfire.dnsdojo.com/g_editor/init.js";
      GM_xmlhttpRequest({
          url:initURL,
            method:"GET",
            onload:function(xhr){
            FileManager.save("/init.js", xhr.responseText);
            alert("g_editor is initialized. Let's enjoy g_editor and push C-z.");
            Executer.execute("/init.js");
          }
        });
    }
  }
  if(parent.document == document){
    init();
    Executer.execute("/init.js");
    Executer.execute("/plugins");
  }

})();

