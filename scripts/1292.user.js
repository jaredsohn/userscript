// ==UserScript==
// @name        Perlmonks.org Chatbox converter
// @namespace   http://zeekat.nl/downloads/greasemonkey/pmchatbox
// @description Make a slicker chatbox interface
// @include     http://perlmonks.org/*
// @include     http://perlmonks.com/*
// @include     http://www.perlmonks.org/*
// @include     http://www.perlmonks.com/*
// ==/UserScript==
/*
    Copyright (c) 2005 Joost Diepenmaat, Zeekat Softwareontwikkeling, 
    all rights reserved.

    Permission is hereby granted, free of charge, to any person obtaining 
    a copy of this software and associated documentation files (the 
    "Software"), to deal in the Software without restriction, including 
    without limitation the rights to use, copy, modify, merge, publish, 
    distribute, sublicense, and/or sell copies of the Software, and to 
    permit persons to whom the Software is furnished to do so, subject to 
    the following conditions:

    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
    OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
    OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    The webpage for this code is at
    
    http://zeekat.nl/downloads/greasemonkey/pmchatbox/
*/




(function() {

var nl = nl ? nl : {};
nl.zeekat = nl.zeekat ? nl.zeekat : {};
nl.zeekat.xjs = nl.zeekat.xjs ? nl.zeekat.xjs : {};





nl.zeekat.xjs.global = this;


(function() {
    var xjs = nl.zeekat.xjs;







    xjs.namespace = function (name) {
        var identifiers = name.split(".");
        var top = xjs.global;
        for (var i =0; i < identifiers.length; i++) {
            if (! top[identifiers[i]]) {
                top[identifiers[i]] = {};
            }
            top = top[identifiers[i]];
        }
        return top;
    };
    xjs.constructor = function (opts) {
        var constructor = function () {
            if (constructor.superclass) {
                constructor.superclass.constructor.apply(this, arguments);
            }
            if (constructor.prototype.init) {
                constructor.prototype.init.apply(this,arguments);
            }
        };
        if (opts.prototype) {
            constructor.prototype = opts.prototype;
            constructor.superclass = opts.prototype.constructor.prototype;
        }
        for (var i in opts) {
            if (i != 'prototype') {
                constructor.prototype[i] = opts[i];
            }
        }
        return constructor;
    };

})();
(function() {
    var xjs = nl.zeekat.xjs;
    var chat = xjs.namespace("nl.zeekat.chat");






    chat.MessageList = xjs.constructor(
    {

        init: function (chatbox) {
            this.chatbox = chatbox;
            this.div = document.createElement("div");
            this.div.className = "messagelist";
            this.table = document.createElement("table");
            this.div.appendChild(this.table);
            this.rows = 0;
            this.cells = 0;

        },

        addMessage: function (message) {
            var tr = this.table.insertRow(this.rows++);
            this.cells = 0;
            if (message.emote) {
                tr.className = "emote";
            }
            for (var i =0; i < this.chatbox.actions.length; i++) {
                var th = tr.insertCell(this.cells++);
                th.className = this.chatbox.actions[i];
                th.appendChild(this.chatbox[this.chatbox.actions[i]](message));
            }

            var m = tr.insertCell(this.cells++);
            m.className = "message";
            var html = message.html;
            if (message.emote) {
                html = this.chatbox.htmlEscape(message.author)+" "+html;
            }
            m.innerHTML = html;

        },

        element: function () {
            return this.div;
        }
   });







    chat.MessageListSmall = xjs.constructor(
    {

        init: function (chatbox) {
            this.chatbox = chatbox;
            this.div = document.createElement("div");
            this.div.className = "messagelist";

        },

        addMessage: function (message) {
            var p = document.createElement("span");
            if (message.emote) {
                p.className = "emote";
            }
            for (var i =0; i < this.chatbox.actions.length; i++) {
                p.appendChild(this.chatbox[this.chatbox.actions[i]](message));
                p.appendChild(document.createTextNode(" "));
            }

            var m = document.createElement("span");
            m.className = "message";
            var html = message.html;
            if (message.emote) {
                html = "<i>" +this.chatbox.htmlEscape(message.author)+" "+html+"</i>";
            }
            m.innerHTML = html;
            p.appendChild(m);
            this.div.appendChild(p);
            this.div.appendChild(document.createElement("br"));
        },

        element: function () {
            return this.div;
        }
   });

    chat.ChatBase = xjs.constructor(
    {
        messageTagName: "message",

        readyStates: [
            "U","!","L","I","C"
        ],

        init: function (baseUrl, elementId, messageListConstructor) {
            if (arguments.length == 0) {
                return;
            }
            if (messageListConstructor) {
                this.messageListConstructor = messageListConstructor;
            }
            else {
                this.messageListConstructor = chat.MessageList;
            }
            this.requestNumber = 0;
            this.baseUrl = baseUrl;
            this.elementId = elementId;
            this.secondsLeft = 0;
            this.readyState = 0;
            var neededMethods = [
                "document.getElementById",
                "document.createTextNode",
                "document.getElementsByTagName",
                "document.getElementById('"+elementId+"').innerHTML",
                "document.createElement",
                ];

            for (var i =0; i < neededMethods.length; i++) {
                try {
                    eval(neededMethods[i]);
                }
                catch(e) {
                    alert("Can't find method or property '"+neededMethods[i]+"' you probably need a different browser");
                    return false;
                }
            }






            if (document.location.href.indexOf(baseUrl) != 0) {
                try {
                    if (netscape.security.PrivilegeManager.enablePrivilege) {
                        this.getPrivs = function (func) {
                            netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
                            func();
                        }
                    }
                }
                catch (e) { }
            }
            if (!this.getPrivs) {
                this.getPrivs = function (func) { func () }
            }

            this.blockElement = document.getElementById(this.elementId);
            if (!this.blockElement) {
                alert("element "+elementId+" not found!");
            }

            this.createInterface();
        },

        createInterface: function() {
            this.clearInterface();


            this.statusElement = document.createElement("div");
            this.statusElement.className = "statusbar";
            this.statusElement.appendChild(document.createTextNode("Starting interface"));
            this.blockElement.appendChild(this.statusElement);
            this.messageListElement = (new this.messageListConstructor(this)).element();
            this.blockElement.appendChild(this.messageListElement);
            this.form = document.createElement("form");
            this.form.className = "inputbar";

            this.inputBox = document.createElement("input");
            this.inputBox.type = "text";
            this.inputBox.className = "inputbox";

            var chatbox = this;
            this.form.onsubmit = function() {
                if (chatbox.inputBox.value.match(/\S/)) {
                    chatbox.send(chatbox.inputBox.value);
                }
                return false;
            }
            this.form.appendChild(this.inputBox);
            var submit = document.createElement("input");
            submit.type="submit";
            submit.value = "Send";

            this.form.appendChild(submit);

            this.blockElement.appendChild(this.form);
        },

        clearInterface: function() {

            while (this.blockElement.firstChild) {
                this.blockElement.removeChild(this.blockElement.firstChild);
            }
        },

        updateStatus: function(text) {
            if (text) {
                this.lastText = text;
            }
            else {
                text = this.lastText;
            }
            this.statusElement.replaceChild(
                document.createTextNode(
                    this.baseUrl +" [ " +
                    this.readyStates[this.readyState] + " | #" +
                    this.requestNumber + " ] " + text),
                this.statusElement.firstChild
            );
        },

        updateContent: function(dom) {
            var chatbox = this;
            this.getPrivs(
                function() {

                    var messages = dom.getElementsByTagName(chatbox.messageTagName);
                    var list = new chatbox.messageListConstructor(chatbox);
                    for (var i=0; i < messages.length; i++) {
                        list.addMessage(chatbox.parseMessage(messages.item(i)));

                        chatbox.blockElement.replaceChild(list.element(),chatbox.messageListElement);
                        chatbox.messageListElement = list.element();
                    }
                }
            );
            chatbox.updateStatus("Ok");
        },

        refresh: function() {
            this.updateStatus("Refresh...");
            var chatbox = this;
            this.getRequest(this.messagesUrl,
                function(resp) {
                    chatbox.updateContent(resp.responseXML);
                    chatbox.secondsLeft = 30;
                    chatbox.timer = setTimeout( function() { chatbox.countDown() }, 1000 );
                },
                ""
            );
        },


        countDown: function() {
            var chatbox = this;
            if (this.secondsLeft-- == 0) {
                this.refresh();
            }
            else {
                this.timer = setTimeout( function() { chatbox.countDown() }, 1000 );
            }
        },

        getRequest: function(url, callback, data) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.secondsLeft = 0;
            var req = this.request();
            var chatbox = this;
            req.onreadystatechange = function () {
                chatbox.readyState = req.readyState;
                chatbox.updateStatus();
                if (req.readyState == 4) {
                    callback(req);
                }
            }
            this.getPrivs(
                function() {
                    req.open("GET",url)
                }
            );
            req.send(data);
        },

        start: function() {
            this.refresh();
        },




        actions: [ "replyLink", "authorLink" ],

        replyLink: function(message) {
           var cb = this;
           var a = document.createElement("a");
           a.onclick= function() {
               cb.inputBox.value = "["+message.author+"]: " + cb.inputBox.value;
               cb.inputBox.focus();
               return false;
           }
           a.title = "Reply to "+message.author;
           a.appendChild(document.createTextNode("R"));
           return a;
       },

       authorLink: function(message) {
           return document.createTextNode(message.emote ? "*" : "<"+message.author+">");
       },


       htmlEscape: function(html) {
            var out = html.replace(/&/g,"&amp;");
            out.replace(/</g,"&gt;");
            out.replace(/>/g,"&lt;");
            return out;
       }

    });

    if (window.XMLHttpRequest) {
        chat.ChatBase.prototype.request = function () {
            this.requestNumber++;
            return new window.XMLHttpRequest()
        };
    }
    else if (window.ActiveXObject) {
        chat.ChatBase.prototype.request = function () {
            this.requestNumber++;
            return new ActiveXObject("Microsoft.XMLHTTP");
        };
    }
    else {
        alert("Can't use XMLHttpRequest, you probably need a different browser");
    }
})();
(function() {
    var xjs = nl.zeekat.xjs;
    var chat = xjs.namespace("nl.zeekat.chat");



    chat.PerlMonksChat = xjs.constructor(
        {
            prototype: new chat.ChatBase(),
            init: function(baseUrl, elementId,messageList) {
                if (arguments.length > 0) {
                    this.messagesUrl = baseUrl + "/index.pl?node_id=15834";
                }
            },
            parseMessage: function(node) {
                var index = 0;
                var nindex = 0;
                var html = "";
                var text = node.firstChild.data;
                var author = node.getAttribute("author");
                var emote = (text.indexOf("/me") == 0 || text.indexOf("/me") == 1);
                if (emote) {
                    text = text.substring(4,text.length);
                }
                html = html.replace(/<(\/?)c>/g,"<$1code>");
                while ((nindex = text.indexOf("<code>",index)) > -1) {
                    var eindex = text.indexOf("</code>",nindex);
                    if (eindex > -1) {
                        html += text.substring(index,nindex);
                        html += text.substring(nindex,eindex-1).replace(/&/g,"&amp;").replace(/\[/g,"&#91;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
                        index = eindex -1;
                    }
                    else {
                        index = nindex + 1;
                    }
                }
                html += text.substring(index < 0 ? 1 : index,text.length);

                html = html.replace(/<a\s+href=.(http:\/\/.*?).>(.*?)<\/a>/gi,"[$1|$2]");
                html = html.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");





                html = html.replace(/&lt;(\/?(b|code|em|i|strong|su[bp]|tt|u))&gt;/gi,"<$1>");
                html = html.replace(/&amp;/ig,"&");


                html = html.replace(/\[(http:\/\/.+?)\|(.*?)\]/g,'<a href="$1">$2</a>');
                html = html.replace(/\[(http:\/\/.+?)\]/g,'<a href="$1">$1</a>');
                html = html.replace(/\[id:\/\/(.+?)\|(.*?)\]/g,'<a href="'+this.baseUrl+'/index.pl?node_id=$1">$2</a>');
                html = html.replace(/\[id:\/\/(.+?)\]/g,'<a href="'+this.baseUrl+'/index.pl?node_id=$1">$1</a>');

                html = html.replace(/\[(.+?)\|(.*?)\]/g,'<a href="'+this.baseUrl+'/index.pl?node=$1">$2</a>');
                html = html.replace(/\[(.+?)\]/g,'<a href="'+this.baseUrl+'/index.pl?node=$1">$1</a>');
                return {
                    emote: emote,
                    html: html,
                    author: author,
                };
            },

            send: function(message) {
                var chatbox = this;
                this.inputBox.disabled="disable";
                this.getRequest(
                    this.baseUrl+"?node_id=227820;op=message;message="+escape(message),
                    function (resp) {
                        chatbox.inputBox.value="";
                        chatbox.updateStatus("Message posted");
                        chatbox.inputBox.disabled="";
                        chatbox.inputBox.focus();
                        chatbox.secondsLeft = 10;
                        chatbox.countDown();
                    },
                    null
                );
            },

            actions: [ "replyLink", "msgLink", "authorLink" ],

            msgLink: function(message) {
               var a = document.createElement("a");
               var cb = this;
               a.onclick= function() {
                   cb.inputBox.value = "/msg ["+message.author+"] " + cb.inputBox.value;
                   cb.inputBox.focus();
                   return false;
               }
               a.title = "Send private message to "+message.author;
               a.appendChild(document.createTextNode("M"));
               return a;
           },

            authorLink: function(message) {
                var a = document.createElement("a");
                a.title="Info on "+message.author;
                var messageList = this;
                if (message.emote) {
                    a.appendChild(document.createTextNode("*"));
                }
                else {
                    a.appendChild(document.createTextNode("<"+message.author+">"));
                }
                a.href= this.baseUrl+'/index.pl?node='+escape(message.author)
                a.title = message.author+"'s homenode";
                return a;
            }
        });
})();

    var global = nl.zeekat.xjs.global;

    window.addEventListener("load", function() {
        var orig = document.getElementById("nodelet_body_row_Chatterbox");
        if (orig) {
            var subs = orig.childNodes;
            for (var i = 0; i < subs.length; i++) {
                var nodebody = subs.item(i);
                if (nodebody.className == "nodebody") {
                    var removeThese = [];
                    var spans = nodebody.getElementsByTagName("span");
                    var haveMessages = false;
                    for (var j = 0; j < spans.length; j++) {
                        if (spans.item(j).className == "chat") {
                            removeThese.push(spans.item(j));
                        }
                        if (spans.item(j).className == "msg") {
                            haveMessages = true;
                        }
                    }
                    spans = nodebody.getElementsByTagName("br");
                    for (var j = 0; j < spans.length; j++) {
                        removeThese.push(spans.item(j));
                    }
                    for (var j =0; j < removeThese.length; j++) {
                        removeThese[j].parentNode.removeChild(removeThese[j]);
                    }
                    var inputs = nodebody.getElementsByTagName("input");
                    for (var j = 0; j < inputs.length; j++) {
                        if (!haveMessages) {
                            inputs[j].type="hidden";
                        }
                        else if (inputs[j].name == "message") {
                            inputs[j].value = "";
                            inputs[j].type = "hidden";
                        }
                        else if (inputs[j].type == "submit") {
                            inputs[j].value = "Delete from inbox";
                        }
                    }
                    nodebody.appendChild(document.createElement("hr"));
                    var cbelement = document.createElement("div");
                    cbelement.id = "CreateChatBoxHere";
                    nodebody.appendChild(cbelement);
                    chat = new global.nl.zeekat.chat.PerlMonksChat("","CreateChatBoxHere",global.nl.zeekat.chat.MessageListSmall);
                    chat.start();
                    break;

                }
            }
        }
    },false);


})();
