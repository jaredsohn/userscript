// ==UserScript==
// @name           Kongregate Quick Friend Manager
// @namespace      tag://kongregate
// @description    Quickly manage following in bulk from game page
// @author         doomcat
// @version        1.0.1
// @date           02.11.2012
// @include        http://www.kongregate.com/games/*
// ==/UserScript== 



function main()
{
	
	function declareClasses_DC_Quick_Friend()
	{
		window.DC_Quick_Friend = Class.create({
			initialize: function()
			{
				var rulesText = "#QuickFriend-Menu { ";
				rulesText += "position: fixed;";
				rulesText += "top: 10%;";
				rulesText += "left: 20%;";
				rulesText += "width: 40%;";
				rulesText += "z-index: 1000009;";
				rulesText += "margin: auto;";
				rulesText += "background-color: #DDDDDD;";
				rulesText += "border: 1px solid #999999;";
				rulesText += "border-radius: 15px;";
				rulesText += "-moz-border-radius: 15px;";
				rulesText += "-webkit-border-radius: 15px;";
				rulesText += "}";
				
				rulesText += ".QuickFriend-FriendsArea { ";
				rulesText += "border: 1px solid #999999;";
				rulesText += "width: 40%;";
				rulesText += "height: 60%;";
				rulesText += "margin: auto;";
				rulesText += "overflow: auto;";
				rulesText += "}";

				rulesText += "#QuickFriend-Header { ";
				rulesText += "border-bottom: 2px solid #000000;";
				rulesText += "border-top-right-radius: 15px;";
				rulesText += "border-top-left-radius: 15px;";
				rulesText += "background-color: #BBBBBB;";
				rulesText += "padding: 5px;";
				rulesText += "}";
				
				rulesText += "#QuickFriend-Footer { ";
				rulesText += "border-top: 2px solid #000000;";
				rulesText += "}";
				
				rulesText += "#QuickFriend-Body { ";
				rulesText += "height: 300px;";
				rulesText += "overflow: auto;";
				rulesText += "padding: 5px 10px;"
				rulesText += "}";

				rulesText += "#QuickFriend-MenuClose { ";
				rulesText += "position: absolute;";
				rulesText += "top: 0px;";
				rulesText += "right: 0px;";
				rulesText += "width: 40px;";
				rulesText += "height: 40px;";
				rulesText += "height: 40px;";
				rulesText += "border-radius: 15px;";
				rulesText += "-moz-border-radius: 15px;";
				rulesText += "-webkit-border-radius: 15px;";
				rulesText += "}";

				rulesText += "#QuickFriend-PaneWrapper { ";

				rulesText += "}";

				rulesText += "#QuickFriend-LeftPane { ";
				rulesText += "float: left;";
				rulesText += "}";

				rulesText += "#QuickFriend-RightPane { ";
				rulesText += "float: right;";
				rulesText += "}";

				rulesText += "#QuickFriend-LeftPaneTitle { ";
				rulesText += "font-weight: bold;";
				rulesText += "}";

				rulesText += "#QuickFriend-RightPaneTitle { ";
				rulesText += "font-weight: bold;";
				rulesText += "}";
				
				rulesText += "#QuickFriend-SubmitButton {";
				rulesText += "width: 100%;";
				rulesText += "height: 30px;";
				rulesText += "display: block;";
				rulesText += "border-bottom-left-radius: 15px;";
				rulesText += "border-bottom-right-radius: 15px;";
				rulesText += "}";
				
				rulesText += ".quickFriendLabel { ";
				rulesText += "margin: 5px;";
				rulesText += "font-size: 15px;";
				rulesText += "display: block;";
				rulesText += "}";
				
				rulesText += ".quickFriendLabel input { ";
				rulesText += "margin-right: 5px;";
				rulesText += "}";
				
				var head = document.getElementsByTagName('head')[0],
				    style = document.createElement('style'),
				    rules = document.createTextNode(rulesText);
				
				style.type = 'text/css';
				if(style.styleSheet)
				    style.styleSheet.cssText = rules.nodeValue;
				else style.appendChild(rules);
				head.appendChild(style);
				
				try
				{
					var manageLink = document.getElementById("QuickFriend-ManageLink");
					
					if (!manageLink)
					{
						manageLink = document.createElement("a");
						manageLink.id = "QuickFriend-ManageLink";
						manageLink.update("Quick Friend Manager");
						manageLink.href = "#";
						manageLink.onclick = function(){holodeck.processChatCommand("/quickfriend"); return false;};
						
						var manageLinkWrapper = document.createElement("dd");
						manageLinkWrapper.appendChild(manageLink);
						
						$("friends-online-list").insert({after: $(manageLinkWrapper)});
					}
					
				}
				catch(ex)
				{
					console.warn("Could not create manager link, must use /quickfriend command");
					console.warn(ex);
				}
				
				
				holodeck.addChatCommand("quickfriend", function(deck, text)
				{
					try
					{
					var qfmenu = document.getElementById("QuickFriend-Menu");
					if (typeof qfmenu == "undefined" || qfmenu == null)
					{
						try {
						qfmenu = document.createElement("div");
						qfmenu.id = "QuickFriend-Menu";
						
						$(qfmenu).hide();
						
						var qfmenuHeader = document.createElement("div");
						qfmenuHeader.id = "QuickFriend-Header";
						
						
						var qfmenuTitle = document.createElement("div");
						
						var qfmenuTitleText = document.createElement("span");
						qfmenuTitleText.style.fontSize = "15pt";
						qfmenuTitleText.appendChild(document.createTextNode("Quick Friend Management"));
						qfmenuTitle.appendChild(qfmenuTitleText);
						
						qfmenuTitle.appendChild(document.createElement("br"));
						qfmenuTitle.appendChild(document.createTextNode(" by: "));
						
						var qfmenuTitleAuthor = document.createElement("a");
						qfmenuTitleAuthor.href = "http://www.kongregate.com/accounts/doomcat";
						qfmenuTitleAuthor.appendChild(document.createTextNode("doomcat"));
						
						qfmenuTitle.appendChild(qfmenuTitleAuthor);
						
						qfmenuHeader.appendChild(qfmenuTitle);
						
						var qfmenuCloser = document.createElement("img");
						qfmenuCloser.src = DC_Quick_Friend.closeImage;
						qfmenuCloser.id = "QuickFriend-MenuClose";
						
						$(qfmenuCloser).observe("click", function(event)
						{
							$("QuickFriend-Menu").toggle();	
						});
						
						qfmenuTitle.appendChild(qfmenuCloser);
						
						
						qfmenu.appendChild(qfmenuHeader);
						
						}
						catch(ex)
						{
							console.error("header error");
							console.error(ex);
						}
						var qfmenuBody = document.createElement("div");
						qfmenuBody.id = "QuickFriend-Body";
						qfmenu.appendChild(qfmenuBody);
						
						qfmenuBody.appendChild(document.createElement("br"));
						
						

						
						var instructions = document.createElement("span");
						instructions.style.fontSize = "15px";
						instructions.appendChild(document.createTextNode("Checked people are followed. Unchecked are not. Click update after making changes. "));
						
						var refreshLists = document.createElement("a");
						refreshLists.id = "QuickFriend-RefreshListsLink";
						refreshLists.update("Refresh lists?");
						refreshLists.href = "#";
						refreshLists.onclick = function(){refreshQFPanes(); return false;};
						
						instructions.appendChild(refreshLists);
						
						qfmenuBody.appendChild(instructions);
						
						qfmenuBody.appendChild(document.createElement("br"));
						qfmenuBody.appendChild(document.createElement("br"));
						
						
						this.paneWrapper = document.createElement("div");
						this.paneWrapper.id = "QuickFriend-PaneWrapper";
						this.paneWrapper.className = "clearfix";
						
						this.leftPane = document.createElement("div");
						this.leftPane.id = "QuickFriend-LeftPane";
						this.leftPane.className = "QuickFriend-FriendsArea";

						this.rightPane = document.createElement("div");
						this.rightPane.id = "QuickFriend-RightPane";
						this.rightPane.className = "QuickFriend-FriendsArea";
						
						this.paneWrapper.appendChild(this.leftPane);
						this.paneWrapper.appendChild(this.rightPane);
						qfmenuBody.appendChild(this.paneWrapper);
						
						try {
						var checkAllLeft = document.createElement("button");
						checkAllLeft.appendChild(document.createTextNode("Check All"));
						
						$(checkAllLeft).observe("click", function(event) {
							var checkboxes = this.parentNode.getElementsByTagName("input");
							for (var boxID in checkboxes)
							{
								var box = checkboxes[boxID];
								box.checked = true;
							}
						});
						
						var uncheckAllLeft = document.createElement("button");
						uncheckAllLeft.appendChild(document.createTextNode("Uncheck All"));
						
						$(uncheckAllLeft).observe("click", function(event) {
							var checkboxes = this.parentNode.getElementsByTagName("input");
							for (var boxID in checkboxes)
							{
								var box = checkboxes[boxID];
								box.checked = false;
							}
						});
						
						this.leftPaneTitle = document.createElement("span");
						this.leftPaneTitle.class = "QuickFriend-PaneTitle";
						this.leftPaneTitle.id = "QuickFriend-LeftPaneTitle";
						this.leftPane.appendChild(this.leftPaneTitle);
						
						this.leftPane.appendChild(document.createElement("br"));
						this.leftPane.appendChild(checkAllLeft);
						this.leftPane.appendChild(uncheckAllLeft);
						
						this.leftPane.appendChild(document.createElement("br"));
						this.leftPane.appendChild(document.createElement("br"));
																		
						}
						catch(ex)
						{
							console.error("left pane error");
							console.error(ex);
						}
						
						try {
						
						var checkAllRight = document.createElement("button");
						checkAllRight.appendChild(document.createTextNode("Check All"));
						
						$(checkAllRight).observe("click", function(event) {
							var checkboxes = this.parentNode.getElementsByTagName("input");
							for (var boxID in checkboxes)
							{
								var box = checkboxes[boxID];
								box.checked = true;
							}
						});
						
						var uncheckAllRight = document.createElement("button");
						uncheckAllRight.appendChild(document.createTextNode("Uncheck All"));
						
						$(uncheckAllRight).observe("click", function(event) {
							var checkboxes = this.parentNode.getElementsByTagName("input");
							for (var boxID in checkboxes)
							{
								var box = checkboxes[boxID];
								box.checked = false;
							}
						});
						
						this.rightPaneTitle = document.createElement("span");
						this.rightPaneTitle.class = "QuickFriend-PaneTitle";
						this.rightPaneTitle.id = "QuickFriend-RightPaneTitle";
						this.rightPane.appendChild(this.rightPaneTitle);

						this.rightPane.appendChild(document.createElement("br"));
						this.rightPane.appendChild(checkAllRight);
						this.rightPane.appendChild(uncheckAllRight);
						
						this.rightPane.appendChild(document.createElement("br"));
						this.rightPane.appendChild(document.createElement("br"));
						
						}
						catch (ex)
						{
							console.error("right pane error");
							console.error(ex);	
						}
												
						// Could get all people from all rooms, but ehhhhh....
//						var people = {chat: [], game: [], private: []};
//						var roomTypes = ["chat", "game", "private"];
//						if (typeof holodeck._chat_window._rooms_by_type.chat != "undefined")
//						{
//							for (var name in holodeck._chat_window._rooms_by_type.chat._users)
//							{
//								if (typeof holodeck._chat_window._rooms_by_type.chat._users[name] != "undefined")
//								{
//									people.chat.push(name);
//								}
//							}
//						}
						
						var submitButton = document.createElement("button");
						submitButton.appendChild(document.createTextNode("Update"));
						submitButton.id = "QuickFriend-SubmitButton";
						
						$(submitButton).observe("click", function(event)
						{
							var checkboxes = window._dc_quick_friend.leftPane.getElementsByTagName("input");
							for (var boxID = checkboxes.length-1; boxID >= 0; boxID--)
							{
								var box = checkboxes[boxID];
								if (box.checked === false)
								{
									if (typeof box.parentNode != "undefined" && 
										typeof box.parentNode.parentNode != "undefined")
									{
										new Ajax.Request("http://www.kongregate.com/accounts/" + holodeck._active_user._attributes._object.username + "/friends/"+ box.id.substring(8), {
									        method: 'delete',
									        onComplete: function(transport)
									        {
										        console.log("Deleted: " + transport.request.url);
        								        holodeck.removeFriend(this);
										        refreshQFPanes();
										    }.bind(box.id.substring(8))
										});

									}
								}
							}
							
							checkboxes = window._dc_quick_friend.rightPane.getElementsByTagName("input");
							for (var boxID = checkboxes.length-1; boxID >= 0; boxID--)
							{
								var box = checkboxes[boxID];
								if (box.checked === true)
								{
									if (typeof box.parentNode != "undefined" && 
										typeof box.parentNode.parentNode != "undefined")
									{
										new Ajax.Request("http://www.kongregate.com/accounts/" + holodeck._active_user._attributes._object.username + "/friends/"+ box.id.substring(8) + "?friend_from=chat", {
									        method: 'put',
									        onComplete: function(transport)
									        {
										        console.log("Added: " + transport.request.url);
										      	holodeck.addFriend(this);
										        refreshQFPanes();
										    }.bind(box.id.substring(8))
										});

									}
								}
							}
						});
						
						var qfmenuFooter = document.createElement("div");
						qfmenuFooter.id = "QuickFriend-Footer";
						
						qfmenuFooter.appendChild(submitButton);
						
						qfmenu.appendChild(qfmenuFooter);
						
						document.body.appendChild(qfmenu);
					}
					
					$(qfmenu).toggle();
											
					updateLeftPane();
					updateRightPane();
					
					
					return false;
					}
					catch (ex)
					{
						console.error("Other problem")
						console.error(ex);
					}
					return false;
				}.bind(this));
			}
		
		});
		
		function updateLeftPane()
		{
			var leftPane = document.getElementById("QuickFriend-LeftPane");
			$A(leftPane.getElementsByTagName("label")).invoke("remove");
			
			var friends = [];
			for (var name in holodeck._chat_window._friends)
			{
				if (holodeck._chat_window.isFriend(name))
				{
					friends.push(name);
				}
			}
			
			var leftPaneTitle = document.getElementById("QuickFriend-LeftPaneTitle");
			leftPaneTitle.update("Currently Following (" + friends.size() + "):");

			
			friends.sort();
			
			for(var i = 0; i < friends.length; i++)
			{
				var name = friends[i];
				var label = document.createElement("label");
				label.htmlFor = "qf_user_" + name;
				label.className = "quickFriendLabel";
				
				var box = document.createElement("input");
				box.type = "checkbox";
				box.id = "qf_user_" + name;
				
				var existingBox = document.getElementById(box.id);
				if (existingBox)
				{
					box.checked = existingBox.checked;
					existingBox.parentNode.remove();
				}
				else
				{
					box.checked = "checked";
				}
				
				label.appendChild(box);
				label.appendChild(document.createTextNode(name));
				
				leftPane.appendChild(label);
			}
	
		}
		
		function updateRightPane()
		{
			var rightPane = document.getElementById("QuickFriend-RightPane");
			
			var rightPaneTitle = document.getElementById("QuickFriend-RightPaneTitle");
			rightPaneTitle.update("People in " + holodeck._chat_window._active_room._room.name + " who you are not following:");
			
			var people = [];
			for (var name in holodeck._chat_window._active_room._users)
			{
				if (holodeck._chat_window.isFriend(name)
					|| holodeck._active_user._attributes._object.username.toLowerCase() == name.toLowerCase())
				{
					continue;
				}

				people.push(name);
			}
			
			people.sort();
			
			
			var rightPaneTitle = document.getElementById("QuickFriend-RightPaneTitle");
			rightPaneTitle.update("People in " + holodeck._chat_window._active_room._short_room_name + " who you are not following (" + people.size() + "):");

			
			for (var i = 0; i < people.size(); i++)
			{
				var name = people[i];

				var label = document.createElement("label");
				label.htmlFor = "qf_user_" + name;
				label.className = "quickFriendLabel";
				
				var box = document.createElement("input");
				box.type = "checkbox";
				box.id = "qf_user_" + name;
				
				var existingBox = document.getElementById(box.id);
				if (existingBox)
				{
					box.checked = existingBox.checked;
					existingBox.parentNode.remove();
				}
				
				label.appendChild(box);
				label.appendChild(document.createTextNode(name));
				
				rightPane.appendChild(label);
			}	
		}
		
		function refreshQFPanes()
		{
			updateLeftPane();
			updateRightPane();
		}
		
		// Lot of code, but it's really just the embedded close icon red x thing
		DC_Quick_Friend.closeImage = "data:image/png;base64,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";

	}

    function bootstrap_DC_Quick_Friend()
    {
        // Do we actually have everything we need to start?
        if (typeof holodeck == "undefined" || 
        	typeof holodeck._chat_window == "undefined" || 
        	typeof holodeck._chat_window._friends == "undefined" || 
        	typeof Class == "undefined")
        {
        	// Something is not loaded yet. Bail on this and try again later
            console.log("DC Quick Friend not ready.");
            
            setTimeout(bootstrap_DC_Quick_Friend, 1000); // 1000ms = 1 second
            return;
        }
        
        // Print that we're about to start
   		console.log("DC Quick Friend trying to start");
        
        // Declare classes
        declareClasses_DC_Quick_Friend();
        
   		// Throw a reference to this onto the window I guess in case anyone else wants to use it?
		window._dc_quick_friend = new DC_Quick_Friend();
   	
    	// Everything is done
        console.log("DC Quick Friend started");
    }
    
    // The fact that I'm doing this here most likely indicates a design flaw, doesn't it?
    bootstrap_DC_Quick_Friend();

}


// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);