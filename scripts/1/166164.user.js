// ==UserScript==
// @name        Mouseclick Names
// @namespace   http://www.f-list.net/chat/*
// @include     http://www.f-list.net/chat/*
// @grant       none
// @version     1.2
// ==/UserScript==

	function setup() {
		$("#chat-login-go").click(function() {
			setTimeout(fixBinds,3000);
		});
	}
	function fixBinds() {
		$(document.body).unbind("mousedown.avatars").bind("mousedown.avatars", function(e){
			if($(e.target).hasClass("AvatarLink") || $(e.target).hasClass("InactiveAvatarLink")){
                if(e.which==3){
                    e.stopPropagation();
                    var name=$(e.target).text();
                    if($(e.target).hasClass("InactiveAvatarLink")){
                        name=$(e.target).children("a:first").text();
                    }
                    $(e.target).contextMenu({ inSpeed : 150, outSpeed: 75, menu: "CharacterMenu", beforeOpen: function(){
                        var currentUser=name;
                        $("#CharacterMenu .header").html("<h3 id='ContextMenuHeader'>" + currentUser + "</h3>");
                        $("#CharacterMenu .ministatus img").replaceWith("<img src='" + staticdomain + "images/noavatar.png'/>");
                        $("#CharacterMenu .ministatus img").attr("src", staticdomain + "images/avatar/" + currentUser.toLowerCase() + ".png");
                        var sm = FList.Chat.users.getData(currentUser).statusmsg;
                        $("#CharacterMenu .ministatus").css("display", "block");
                        //if inactive avatarlink, not in chattab, so hide op stuff
                        if(FList.Chat.isChatop() && $(e.target).hasClass("AvatarLink")){
                            $(".cm-chatop").show();
                        } else {
                            $(".cm-chatop").hide();
                        }
                        if(FList.Chat.isChanop(FList.Chat.TabBar.activeTab.id, currentUser)){
                            $(".chatopadd").hide();$(".chatopdel").show();
                        } else {
                            $(".chatopdel").hide();$(".chatopadd").show();
                        }
                        if(FList.Chat.TabBar.activeTab.type=="channel"){
                            if((FList.Chat.isChanop(FList.Chat.TabBar.activeTab.id) || FList.Chat.isChatop()) && $(e.target).hasClass("AvatarLink")){
                                $(".cm-chanop").show();
                            } else {
                                $(".cm-chanop").hide();
                            }
                            if((FList.Chat.isChanOwner() || FList.Chat.isChatop())  && $(e.target).hasClass("AvatarLink")){
                                $(".cm-chanown").show();
                            } else {
                                $(".cm-chanown").hide();
                            }
                        } else {
                            $(".cm-chanop, .cm-chanown").hide();
                        }
                        if (typeof(sm) == "string" && sm !== "") $("#CharacterMenu .ministatus span").html(FList.ChatParser.parseContent(sm));
                        else  $("#CharacterMenu .ministatus span").html("");
                        $("#CharacterMenu .ignoreadd, #CharacterMenu .ignoredel").hide();
                        if(jQuery.inArray(currentUser.toLowerCase(),FList.Chat.ignoreList)!==-1) $("#CharacterMenu .ignoredel").show();
                        else $("#CharacterMenu .ignoreadd").show();
                    },callback: function(action, el, pos) {
                    var currentUser=$(el).text();
					if($(el).hasClass("InactiveAvatarLink")){
                        currentUser=$(el).children("a:first").text();
                    }
                    switch(action){
                        case 'priv': 
                            FList.Chat.openPrivateChat(currentUser, false);
                        break;	
                        case 'flist': 
                            window.open(domain + "c/" + currentUser.toLowerCase() + "/");
                        break;	
                        case 'ignoreadd': 
                            FList.Connection.send("IGN " + JSON.stringify({ "action": "add", "character": currentUser }));
                            $(el).addClass("AvatarBlocked");
                        break;	
                        case 'ignoredel': 
                            FList.Connection.send("IGN " + JSON.stringify({ "action": "delete", "character": currentUser }));
                            $(el).removeClass("AvatarBlocked");
                        break;	                    
                        case "report":
                            FList.Chat.staffAlert.dialog();
                            $(".ui-report-user").val(currentUser);
                        break;
                        case "chanban":
                        FList.Connection.send("CBU " + JSON.stringify({ channel: FList.Chat.TabBar.activeTab.id, character: currentUser }));  
                        break;
                        case "chankick":
                        FList.Connection.send("CKU " + JSON.stringify({ channel: FList.Chat.TabBar.activeTab.id, character: currentUser }));             
                        break;
                        case "chanopadd":
                        FList.Connection.send("COA " + JSON.stringify({ channel: FList.Chat.TabBar.activeTab.id, character: currentUser }));  
                        break;
                        case "chanopdel":
                        FList.Connection.send("COR " + JSON.stringify({ channel: FList.Chat.TabBar.activeTab.id, character: currentUser }));  
                        break;
                        case "accountban":
						if(confirm("Are you sure you want to ban this user's account?")){
							FList.Connection.send("ACB " + JSON.stringify({ character: currentUser }));  
						}
                        break;
                        case "ipban":
						if(confirm("Are you sure you want to ban this user's IP address?")){
							FList.Connection.send("IPB " + JSON.stringify({ character: currentUser }));  
						}
                        break;
                        case "chatkick":
						if(confirm("Are you sure you want to kick this user from the chat?")){
							FList.Connection.send("KIK " + JSON.stringify({ character: currentUser }));  
						}
                        break;
                        case "altwatch":
                        FList.Connection.send("AWC " + JSON.stringify({ character: currentUser }));  
                        break;
                        case "timeout":
						if(confirm("Are you sure you want to time this user out for 30 minutes?")){
							FList.Connection.send("TMO " + JSON.stringify({ time: 30, character: currentUser, reason: "" }));  
						}
                        break;
                    }}});
                }
            }
		});
		$(document.body).unbind("click.avatars").bind("click.avatars", function(e){
            if($(e.target).hasClass("AvatarLink") || $(e.target).hasClass("InactiveAvatarLink")){
                if(e.which==1 && $(e.target).hasClass("AvatarLink")) {
                    if(FList.Chat.Settings.current.leftClickOpensFlist){ 
                        window.open(domain + "c/" + $(e.target).text().toLowerCase() + "/");
                    } else {
                        FList.Chat.openPrivateChat($(e.target).text(), false);
                    }
                }
			}
        });
	}
		
(function() {
	setTimeout(setup, 200);
})();