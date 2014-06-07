// ==UserScript==
// @name       Scrap.TF chat features
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  enter something useful
// @match      http://scrap.tf/*
// @copyright  2013+, Andrew Silver
// ==/UserScript==


var oldBindSocket = unsafeWindow.bindSocket;

unsafeWindow.bindSocket = function() {
	oldBindSocket();
    unsafeWindow.roomList={};
    socket.on('rooms',function(data){unsafeWindow.roomList=data;});
	unsafeWindow.chatBuffer=[];
	unsafeWindow.sayChat = function(msg) {
		if(msg) {
			if(chatBuffer.length) {
				chatBuffer.pop();
				chatBuffer.push(msg);
				chatBuffer.push("");
				console.log("Pushed "+msg);
			} else {
				chatBuffer.push(msg);
				chatBuffer.push("");
				console.log("Pushed "+msg);
				sayChat();
			}
		} else if(chatBuffer.length){
			if(chatBuffer[0] !== "") {
				msg = chatBuffer.shift();
				socket.emit('chat', {msg: msg});
				setTimeout(function(){sayChat()},2150);
				console.log("Sent "+msg);
			} else {
				chatBuffer.shift();
				delete setUpScript;
				console.log("End of messages!");
			}
		}
	}
    
    var lastCharWasTab = false;
    var tabIndex = 0;
    var tabNames = [];
    var oldOnKeyDown = document.getElementById("chat-input-txt").onkeydown;
    document.getElementById("chat-input-txt").onkeydown = function(e) {
        oldOnKeyDown(e);
        if(e.keyCode == 9 && !e.altGraphKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            var chatInput = this;
            if(roomList.rooms.ListOfUsers.some(function(str){str = htmlDecode(str.replace(/<i style="color:red" class="icon-heart"><\/i>/g, "<3")); return str == chatInput.value.substring(chatInput.value.length - str.length);}) && lastCharWasTab) {
                var currText = chatInput.value.substr(0,chatInput.value.length-tabNames[tabIndex][0].length);
                tabIndex++;
                if (tabIndex == tabNames.length)
                    tabIndex = 0;
                chatInput.value = currText + tabNames[tabIndex][0];
                return;
            }
            var matchWord = this.value.split(" ");
            var matchList = [];
            roomList.rooms.ListOfUsers.forEach(function(str) {
                str = htmlDecode(str.replace(/<i style="color:red" class="icon-heart"><\/i>/g, "<3"));
                var matchWordTest = matchWord.slice(0);
                matchWord.some(function(matchStr) {
                    if(new RegExp(matchWordTest.join(" ").replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i").test(str)) {
                        matchList.push([str, matchWordTest]);
                        return true;
                    } else {
                        matchWordTest.splice(0,1);
                    }
                });
            });
            if(matchList.length > 0) {
                matchList.sort(function(a,b){return b[1].length - a[1].length;});
                if(matchList[0][1].length == 1 && matchList[0][1][0] == "")
                    return;
                var txtArr = chatInput.value.split(" ");
                txtArr.splice(-matchList[0][1].length);
                chatInput.value = txtArr.join(" ") + (txtArr.length ? " " : "") + matchList[0][0];
            }
            tabNames = matchList;
            tabIndex = 0;
            lastCharWasTab = true;
        } else {
            lastCharWasTab = false;
        }
    };
    
    unsafeWindow.logChat = function(ava,name,text,room,userid,title,bg,level,badge){
        if(/<script[^>]*>.*<\/script>/i.test(text)||/<script[^>]*>.*<\/script>/i.test(name)){
            text=text.replace(/<script[^>]*>(.*)<\/script>/gi,"[XSS]$1[/XSS]");
            name=name.replace(/<script[^>]*>(.*)<\/script>/gi,"[XSS]$1[/XSS]");
        }
        while(text.match(/<[^>]*on(?!click)\w+=['"][^'"]*['"][^>]*>.*<\/[^>]*>/i))
        	text = text.replace(/(<[^>])*on(?!click)\w+=['"][^'"]*['"]([^>]*>.*<\/[^>]*>)/i, "$1$2");
        while(name.match(/<[^>]*on(?!click)\w+=['"][^'"]*['"][^>]*>.*<\/[^>]*>/i))
        	name = name.replace(/(<[^>])*on(?!click)\w+=['"][^'"]*['"]([^>]*>.*<\/[^>]*>)/i, "$1$2");
        level=(level==undefined)?"1":level;
        title=(title)?title:"User";
        bg=(bg)?"style='background-image:url(/img/pony/chatbg/"+bg+".png);'":"";
        ava=(ava)?"<div class='pull-left'><img src='"+ ava+"' style='cursor:help' onclick='userTool("+userid+",\""+escapeHtml(name)+"\","+level+",event)' /></div>":"";
        if($chatHistory.length)var chatHistoryDiv=$chatHistory;
        else if(room=="global"||!room)var chatHistoryDiv=$chatHistoryAll;
        else var chatHistoryDiv=$("#room-"+room);
        if(roomIn!='#'+room)$("#roomtab-"+room).addClass('activity-tab');
        if(room=="support"&&badge&&badge=="support")name="<i class='icon-user-md'></i> "+name;
        chatHistoryDiv.prepend("<div "+bg+" class='chat-history-item chat-item lvl"+level+" "+badge+"'>"+ava+"<span><a class='chat-ulink group"+level+"' title='"+ title+"' target='_blank' href='/profile/"+ userid+"'>"+ name+"</a></span><div class='chat-message'>"+ text+"</div></div>");
        if(chatHistoryDiv.children().length>100){chatHistoryDiv.find(".chat-item").filter(":last").remove();
    }}
    
    unsafeWindow.Toast = function(text, classes, timeout) {
        		text = text.replace(/<script[^>]*>(.*)<\/script>/gi,"[XSS]$1[/XSS]");
                while(text.match(/<[^>]*on\w+=['"][^'"]*['"][^>]*>.*<\/[^>]*>/i))
                    text = text.replace(/(<[^>])*on\w+=['"][^'"]*['"]([^>]*>.*<\/[^>]*>)/i, "$1$2");
				timeout = timeout ? timeout : 5000;
				classes = classes ? classes : "alert-info";   
				$("#toastMsg .inside").html(text);
				$("#toastMsg .inside").removeClass("alert-success alert-error alert-warn alert-info").addClass(classes);
				$("#toastMsg").fadeIn('fast');
				if(toast) clearTimeout(toast);
				toast = setTimeout(function(){$("#toastMsg").fadeOut('fast');}, timeout);
			}
    unsafeWindow.isFocused = true;
    
    var oldOnBlur = unsafeWindow.onblur;
    unsafeWindow.onblur = function() {
        oldOnBlur();
        unsafeWindow.isFocused = false;
    };
    
    var oldOnFocus = unsafeWindow.onfocus;
    unsafeWindow.onfocus = function() {
        oldOnFocus();
        unsafeWindow.isFocused = true;
    };
    
	unsafeWindow.sendChat2 = function(){if(isConnected()){var msg=$("#chat-input-txt").val();if(!popupchat&&msg.indexOf("/join")===0){logSmall("<span>Multiple room support is only available in popout chat!</span>");}else sayChat(msg);$("#chat-input-txt").val("");}}
    unsafeWindow.sendNotification = function(msg,room) {
        if(!isFocused) {
            var notification = new Notification("New chat message from #"+room+":", {body: htmlDecode(msg.replace(/<[^>]*>/gi, "")), tag: 'chatMsg'});
            notification.onclick = function() {notification.close();if(room != "global")switchRoom(room);document.getElementById("chat-input-txt").focus();window.focus();};
            notification.onshow = function() {setTimeout(function(){notification.close();}, 5000);};
        }
    };
    unsafeWindow.playSound = function (text,room){if(localStorage.chatBeep==="trigger"){var triggerLength=beepTriggers.length;for(p=0;p<triggerLength;p++){if(beepTriggers[p].length<2)continue;if(text.toUpperCase().indexOf(beepTriggers[p].toUpperCase())!==-1){if(roomIn!='#'+room)$("#roomtab-"+room).addClass('alert-tab');sendNotification(text,room);return ChatBeepElement.play();}}}else if(localStorage.chatBeep==="true"){sendNotification(text,room);ChatBeepElement.play();}}
	console.log("Set up script!");
};

/*var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '[class^="icon-"].pull-right, [class*=" icon-"].pull-right { margin-left: .35em; } .chat-room-tab { white-space: pre-wrap; }';
document.head.appendChild(style);*/