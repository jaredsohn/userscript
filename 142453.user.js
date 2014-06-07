/**
 * User: LGG
 * Date: 8/29/12
 * Time: 12:49 AM
 */
// ==UserScript==
// @name           Alliance Offline Chat Log LGG
// @description    Saves the chat log from your Lord of Ultima alliance so you and others can view what they missed
// @namespace      LOU Chat Save LGG
// @author         LGG
// @icon		   http://i1170.photobucket.com/albums/r523/lordgreggreg/Screenshots/2012-07-07_12-04-45.png
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.1
// ==/UserScript==
(function wrapper(){
    var main = function mainFunc() {

        function waitForQX() 
		{
            if (typeof qx == 'undefined') 
			{
                window.setTimeout(waitForQX, 5000);
            } else 
			{
                window.setTimeout(loadClasses, 500);
            }
        }
        window.setTimeout(waitForQX, 5000);

        function loadClasses()
        {
            window.setTimeout(checkIfLoaded, 1000);
			function lgglog(lggToLog)
			{
				if(typeof lggSaidLog != 'undefined')
				{
					if(lggSaidLog>0)
						GM_log(lggToLog);
				}					
			}
            function checkIfLoaded()
            {
                a = qx.core.Init.getApplication();
				al = webfrontend.data.Alliance.getInstance();
				if (a && a.chat && al && al.getName().toString()!="")
                {
                    lgg.chat.getInstance().start();
                } else {
                    window.setTimeout(checkIfLoaded, 1000);
                }
            }
			var Base64 = {
                // private property
                _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

                // public method for encoding
                encode : function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;

                    input = Base64._utf8_encode(input);

                    while (i < input.length) {

                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                            Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                            Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

                    }

                    return output;
                },

                // public method for decoding
                decode : function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;

                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    while (i < input.length) {

                        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                    }

                    output = Base64._utf8_decode(output);

                    return output;

                },

                // private method for UTF-8 encoding
                _utf8_encode : function (string) {
                    string = string.replace(/\r\n/g,"\n");
                    var utftext = "";

                    for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }

                    }

                    return utftext;
                },

                // private method for UTF-8 decoding
                _utf8_decode : function (utftext) {
                    var string = "";
                    var i = 0;
                    var c = c1 = c2 = 0;

                    while ( i < utftext.length ) {

                        c = utftext.charCodeAt(i);

                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        }
                        else if((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i+1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        }
                        else {
                            c2 = utftext.charCodeAt(i+1);
                            c3 = utftext.charCodeAt(i+2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }

                    }
                    return string;
                }
            }
            //------------------------------------------------------------------------------------------------------------
			//taken from http://userscripts.org/topics/41177
			// @copyright      2009, 2010 James Campos
			// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
			if (typeof GM_deleteValue == 'undefined') {
				GM_addStyle = function(css) {
					var style = document.createElement('style');
					style.textContent = css;
					document.getElementsByTagName('head')[0].appendChild(style);
				}

				GM_deleteValue = function(name) {
					localStorage.removeItem(name);
				}

				GM_getValue = function(name, defaultValue) {
					var value = localStorage.getItem(name);
					if (!value)
							return defaultValue;
					var type = value[0];
					value = value.substring(1);
					switch (type) {
						case 'b':
								return value == 'true';
						case 'n':
								return Number(value);
						default:
								return value;
					}
				}

				GM_log = function(message) {
					console.log(message);
				}

				GM_registerMenuCommand = function(name, funk) {
				//todo
				}

				GM_setValue = function(name, value) {
					value = (typeof value)[0] + value;
					localStorage.setItem(name, value);
				}
			}
			qx.Class.define("lgg.Storage", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function()
                {
                    try
                    {
                        qx.Bootstrap.setDisplayName(this, "lgg.Storage");
                        this._player = webfrontend.data.Player.getInstance().getId();
                        var data = this._loadData();
                        if (data != null) {
                            this._applyData(data);
                        }
                    } catch (e)
                    {
                        lgglog("Error loading settings: " + e + ".\nIt may mean that you browser has disabled local storage.\nTo turn local storage on - in Firefox please open page 'about:config' and make sure that in 'dom.storage.enabled' you have true value. For Firefox please make sure that you have cookies enabled");
                    }
                },
                properties: {
                    chatHistory: {
                        init: []
                    },
                    rotationKey: {
                        init: 0
                    },
                    specialKey: {
                        init: 0
                    },
                    beenWarned: {
                        init: false
                    }
                },
                members: {
                    _player: "",
                    _getValue: function(key, namespace) {
                        var result = GM_getValue(this._calculateKey(key, namespace, true));
                        if (result == null) {
                            result = GM_getValue(this._calculateKey(key, namespace, false));
                        }
                        return result;
                    },
                    _setValue: function(key, value, namespace) {
                        GM_setValue(this._calculateKey(key, namespace, true), value);
                    },
                    _calculateKey: function(key, namespace, withPlayer) {
                        if (namespace == undefined) {
                            namespace = "Storage";
                        }
                        if (withPlayer == undefined) {
                            withPlayer = true;
                        }
                        if (withPlayer) {
                            return "lgg." + this._player + "." + namespace + "." + key;
                        } else {
                            return "lgg." + namespace + "." + key;
                        }
                    },
                    _loadData: function() {
                        var json = this._getValue("data");
                        var data = null;
                        if (json != null) {
                            data = qx.lang.Json.parse(json);
                        }
                        return data;
                    },
                    saveData: function() {
                        var d = {
                            chatHistory: this.getChatHistory(),
                            rotationKey: this.getRotationKey(),
                            specialKey: this.getSpecialKey(),
                            beenWarned: this.getBeenWarned()
                        }
                        var json = qx.lang.Json.stringify(d);
                        this._setValue("data", json);
                    },
                    _applyData: function(data) {
                        this.setChatHistory(data.chatHistory);
                        this.setRotationKey(data.rotationKey);
                        this.setSpecialKey(data.specialKey);
                        this.setBeenWarned(data.beenWarned);
                        //hax!
                        if(false||false)
                        {
                            this.setSpecialKey(0);//only for people always in aliance
                            this.saveData();
                        }
                    },
                    modifyRotationKey: function(newKey)
                    {
                        this.setRotationKey(newKey);
                        this.saveData();
                    },
                    addChatHistory: function(senderData, chatData) {
                        var d = {
                            senderData: senderData,
                            chatData: chatData
                        };
                        this.getChatHistory().push(d);
                        if(this.getChatHistory().length>4)this.getChatHistory().shift();
                        this.saveData();
                        //to use lgg.Storage.getInstance().addChatHistory(senderData, chatData)
                    },
                    getChatHistoryBlob: function()
                    {
                        var len = this.getChatHistory().length;

                        var output = "";
                        for (var i = 0; i < len; i++)
                        {
                            var chatObj = this.getChatHistory()[i];
                            output+=chatObj.senderData+"|0.o|"+chatObj.chatData+"|lgg|";
                        }
                        return output.substring(0,output.length-5);
                    }
                }
            });
            qx.Class.define("lgg.chat", {
                type: "singleton",
                extend: qx.core.Object,

                members: {
                    start: function()
                    {
						var myAlliance = webfrontend.data.Alliance.getInstance().getName().toString();
						if(myAlliance=="The Silent Dynasty")
						{
							var ch = a.chat;
							var chatData = webfrontend.data.Chat.getInstance();
							chatData.addListener("newMessage", this.saveChat, ch);

							cont = new qx.ui.container.Composite(new qx.ui.layout.Flow());

							btns = [
								{lab: "H", func: function() {lgg.chat.getInstance().openChat()}}
							];
							for (i=0; i<btns.length; i++) {
								btn = new qx.ui.form.Button(btns[i].lab).set({appearance: "button-text-small", padding: [0,3,0,3]});
								btn.addListener("click", btns[i].func, this);
								cont.add(btn, {row: Math.floor(i/2), column: i%2});
							}
							ch.add(cont, {top: 17, left: 1});
                        }else
						{
                            if(!lgg.Storage.getInstance().getBeenWarned())
                            {
                                lgg.Storage.getInstance().setBeenWarned(true);
                                alert("This script is designed to work with\r\nThe Silent Dynasty\r\nAlliance Only.\r\nYou are part of "+myAlliance+"\r\n\r\nYou will need to modify the source and the urls if you want to use this for your own alliance");
                            }
                            lgglog("You alliance is wrong is |"+myAlliance+"|");
                        }
                    },
                    openChat: function()
                    {
                        var sRotKey = Base64.encode(lgg.Storage.getInstance().getRotationKey().toString());
                        var sSpeKey = 0;//Base64.encode(lgg.Storage.getInstance().getSpecialKey().toString());
                        var sHistBlob =Base64.encode(lgg.Storage.getInstance().getChatHistoryBlob().toString());
                        var sName = Base64.encode(webfrontend.data.Player.getInstance().getName().toString());
                        var scriptGetSection =
                            "?r="+sRotKey+
                                "&s="+sSpeKey+
                                "&h="+sHistBlob+
                                "&name="+sName;
                        var url= "http://sd.simplysweetcandies.com/give.php"+scriptGetSection;
                        window.open(url,'_newtab');
                    },
                    saveChat: function(e)
                    {
                        var data = e.getData();
						var allianceName = webfrontend.data.Alliance.getInstance().getName().toString();
                        lgglog("type="+data.c+"| message="+data.m+"| source="+data.s+"| alliance="+allianceName);
                        if(
							(allianceName=="The Silent Dynasty")
							&&
							(	
								(data.c=="_a")
								||
								(	data.s=="LordGregGreg"
									&& data.c=="privatein" 
									&& webfrontend.data.Player.getInstance().getName()=="LordGregGreg"
								)
                            )//alliance chat only or me whispering myself
						)
                        {
							lgglog("Saving and sending");
							lgg.Storage.getInstance().addChatHistory(data.s, data.m);
							
                            //type=_a| message=thats neat!| source=M3T4LH34D
							window.setTimeout(function(){
								lgg.chat.getInstance().sendToServer(data.s,data.m);},
								Math.floor(Math.random()*200));
							
                        }
                    },
                    sendToServer: function(sender,chat)
                    {
						lgglog("sending");                            
                        var sRotKey = Base64.encode(lgg.Storage.getInstance().getRotationKey().toString());
                        var sSpeKey = Base64.encode(lgg.Storage.getInstance().getSpecialKey().toString());
                        var sHistBlob =Base64.encode(lgg.Storage.getInstance().getChatHistoryBlob().toString());
                        var sSender = Base64.encode(sender.toString());
                        var sChat = Base64.encode(chat.toString());
                        var sName = Base64.encode(webfrontend.data.Player.getInstance().getName().toString());
                        var scriptGetSection =
                            "?r="+sRotKey+
                            "&s="+sSpeKey+
                            "&h="+sHistBlob+
                            "&send="+sSender+
                            "&chat="+sChat+
                            "&name="+sName;

                        eval("var old = document.getElementById('lgguploadScript')");
                        if (old != null)
                        {
                            old.parentNode.removeChild(old);
                            delete old;
                        }
                        var head = document.getElementsByTagName("head")[0];
                        var script = document.createElement('script');
                        script.id = 'uploadScript';
                        script.type = 'text/javascript';

                        script.src = "http://sd.simplysweetcandies.com/omnom.php"+scriptGetSection;
                        head.appendChild(script);
                        lgglog("source is "+script.src);
                        window.setTimeout(function(){lgg.chat.getInstance().waitAndGetData()}, 200);

                    },
                    waitAndGetData: function()
                    {
                        got = false;
                        try
                        {
                            if (lggGotData)
                            {
                                got=true;
                                var keyID = lggGetData();
                                lgglog("key is "+keyID);
                                lgg.Storage.getInstance().setRotationKey(keyID);

                            }
                        }catch(e)
                        {

                        }
                        if(got==false)
                        {
                            window.setTimeout(function(){lgg.chat.getInstance().waitAndGetData()}, 200);
                        }
                    },
                    appendFile: function()
                    {
                        /*window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
                         window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
                         fs.root.getFile('atest.txt.bin', {create: true}, function(fileEntry) {
                         fileEntry.createWriter(function(fileWriter) {
                         fileWriter.seek(fileWriter.length); // Start write position at EOF.

                         var artest = "testing lalalala";
                         for(i=0;i<200;i++)
                         artest+="test number "+i+"\r\n";

                         var blob = new Blob([artest]);

                         fileWriter.addEventListener("writeend", function() {
                         // navigate to file, will download
                         location.href = fileEntry.toURL();
                         }, false);

                         fileWriter.write(blob);
                         }, function() {});
                         }, function() {});
                         }, function() {});?*/
                    }
                }
            });
        }//loadClasses
    }//main

    function injectLOUScript() {
        var jqscript = document.createElement("script");
        jqscript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        document.body.appendChild(jqscript);
        var script = document.createElement("script");
        script.innerHTML = "(" + main.toString() + ")();";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    window.setTimeout(injectLOUScript, 100);
})();