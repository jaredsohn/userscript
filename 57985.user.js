// ==UserScript==
// @name           Customize friends name V2 use jquery
// @author         frank38
// @version        2.1.1
// @namespace      http://www.facebook.com.tw/frank38
// @description    Customize friends name V2 use jquery
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include		   *.facebook.com/*
// ==/UserScript==

var fbID;
var checker = setInterval(function () {
	if (typeof unsafeWindow.presence !== 'undefined') {
		fbID = unsafeWindow.presence.user;
		clearInterval(checker);
		CustomizeName();
	}
}, 100);


function CustomizeName() {

	FriendList = eval(GM_getValue(fbID + "_test_list", "({})"));
	newFriendList = eval(GM_getValue(fbID + "_new_friend_list", "({})"));
	curFriendList = eval(GM_getValue(fbID + "_friend_list", "({})"));
	
	// init
	if(uneval(curFriendList).length == 4) {
		getFriendList(curFriendList, "_friend_list");
	}
	
	$("#content").live("mouseover", function () {
		if ($("#alias_name").length || !$("#profile_pic").length) return;
		
		//not my friend
		if ($("#cant_see_profile_add_friend").length || $("#profile_connect").length) return;

		if (!$("#profile_action_poke").length) return;

		//get user alt, id
		_user_alt = $("#profile_pic").attr("alt");
		_user_id = $("#profile_action_poke").attr("href").match(/(can_poke=)(\d+)/)[2];

		var aliasName = ParseJSON(curFriendList, _user_id, null, null, "r", "id");
		if(!aliasName)
			aliasName = "";
		
		htm = "<h1 id='alias_name'><label>[" + aliasName + "</label> <label>"; //visibility:hidden
		htm += "<span id='span_" + _user_id + "' style='display:none;'><input type='text' style='width:100px;' id='input_" + _user_id + "'/> ";
		htm += "<a href='javascript:' id='save_" + _user_id + "'>" + unescape("\u2713") + "</a> <a id='cancel_" + _user_id + "' href='javascript:'>" + unescape("\u2717") + "</a></span> ";
		htm += "<a id='edit_" + _user_id + "' href='javascript:'>" + unescape("\u270d") + "</a>";
		htm += "]<label></h1> ";
		
		userName = $("#profile_name").text();
		
		$("#profile_name").parent().prepend(htm);
		
		
		// edit click
		$("#edit_" + _user_id).bind("click", function() {
			$("#span_" + _user_id).fadeIn();
			$(this).fadeOut();
		});
		
		// save click
		$("#save_" + _user_id).bind("click", function() {
			$("#edit_" + _user_id).fadeIn();
			newStr = $(this).parent().find("input").val();
			ParseJSON(curFriendList, _user_id, userName, newStr, "w", null);
			$(this).parent().fadeOut();
			$(this).parent().parent().parent().find("label:first").html("[" + newStr);
		});
		
		// cancel click
		$("#cancel_" + _user_id).bind("click", function() {
			$("#edit_" + _user_id).fadeIn();
			$(this).parent().fadeOut();
		});
		
	});
	
	/************************************************************/
	//////// In friend list page
	$(".UIObjectListing.clearfix.UIObjectListing_HasRemoveControl:not(.alias_name) , .UIObjectListing.clearfix:not(.alias_name)").live("mouseover",  function () {
		//if($(this).find("#alias_name").length)
		//	return;
		$(this).addClass("alias_name");
		match_id = $(this).find("img").attr("src").match(/(q)(\d+)/);
		if(!match_id) {
			match_id = $(this).find("a:first").attr("href").match(/(id=)(\d+)/);
			if(!match_id) {
				url = $(this).find(".UIObjectListing_MetaData a:first").attr("href");
				htm = "<span id='alias_name' style='display:none'><label title='Cannot get this profile id'>[<a href='" + url + "'>Click here</a>]</label></span> ";
				$(this).find(".UIObjectListing_MetaData").prepend(htm);
				$(this).find("#alias_name").fadeIn();
				return;
			}
		}

		_friend_id = match_id[2];
		aliasName = ParseJSON(curFriendList, _friend_id, null, null, "r", "id");
		
		if(aliasName === " ") {
			htm = "<span id='alias_name' style='display:none'></span>";
			$(this).find(".UIObjectListing_MetaData").prepend(htm);
			//$(this).find("#alias_name").fadeIn();
			return;
		}
		if(!aliasName)
			aliasName = "";
		
		htm = "<span id='alias_name' style='display:none'><label title='" + _friend_id + "'>[" + aliasName + "</label> <label title='" + _friend_id + "'>"; //visibility:hidden
		htm += "<span id='span_" + _friend_id + "' style='display:none;'><input type='text' style='width:100px;' id='input_" + _friend_id + "'/> ";
		htm += "<a href='javascript:' id='save_" + _friend_id + "'>" + unescape("\u2713") + "</a> <a id='cancel_" + _friend_id + "' href='javascript:'>" + unescape("\u2717") + "</a></span> ";
		htm += "<a id='edit_" + _friend_id + "' href='javascript:'>" + unescape("\u270d") + "</a>";
		htm += "]<label></span> ";
		$(this).find(".UIObjectListing_MetaData").prepend(htm);
		$(this).find("#alias_name").fadeIn();
		
		userName = $(this).find(".UIObjectListing_MetaData > .UIObjectListing_Title").text()
		
		
		// edit click
		$("#edit_" + _friend_id).bind("click", function() {
			$(this).parent().find("span").fadeIn();
			$(this).fadeOut();
		});
		
		// save click
		$("#save_" + _friend_id).bind("click", function() {
			$(this).parent().parent().find("a:last").fadeIn();
			newStr = $(this).parent().find("input").val();
			ParseJSON(curFriendList, $(this).parent().parent().attr("title"), userName, newStr, "w", null);
			$(this).parent().fadeOut();
			
			$(this).parent().parent().parent().find("label:first").html("[" + newStr);
		});
		
		// cancel click
		$("#cancel_" + _friend_id).bind("click", function() {
			$(this).parent().parent().find("a:last").fadeIn();
			$(this).parent().fadeOut();
		});
	});

	/************************************************************/
	//////// JSON parse
	function ParseJSON(data, search, userName, val, fn, get){
		if(fn === "r") {
			if (get === "id") {
				name = null;
				$.each(data, function(i, member) {
					if (member.ID == search) {
						name = member.aliasName;
						return false;
					} else {
						name = ' '; // not found in friend list
					}
				});
				return name;
			}
		}
		
		if(fn === "w") {
			$.each(data, function(i, member) {
				if (member.ID == search) {
					member.aliasName = val;
					member.userName = userName;
					return false;
				}
			});
			
			// write GM value
			unsafeWindow.window.setTimeout(function () {
				GM_setValue(fbID + "_friend_list", uneval(curFriendList));
			}, 0);
		}
	}


	/************************************************************/
	//////// update friends list
	function updateFriendList() {
		var exFriendList = ({});
		getFriendList(newFriendList, "_new_friend_list");
		_curFriendList = uneval(curFriendList);

		var index = 0;
		
		//compare
		for (i in newFriendList) {
			if(_curFriendList.indexOf(newFriendList[i].ID.toString()) == -1) {
				exFriendList[index] = newFriendList[i]; 
				index++;
			}
		}
		
		unsafeWindow.window.setTimeout(function () {
			GM_setValue(fbID + "_ex_friend_list", uneval(exFriendList));
		}, 0);
		
		var prop;
		var propCount = 0;

		for (prop in curFriendList) {
			propCount++;
		}
		
		for (i in exFriendList) {
			curFriendList[propCount] = exFriendList[i];
			propCount++;
		}

		unsafeWindow.window.setTimeout(function () {
			GM_setValue(fbID + "_friend_list", uneval(curFriendList));
		}, 0);
	}

	/************************************************************/
	//////// get user friends list
	function getFriendList(list, valName) {
		GM_xmlhttpRequest({
			method: 'get',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
				},
			url: "http://www.facebook.com/friends/ajax/superfriends.php?filter=af&__a=1",
			onload: function(result) {
				friends = eval('(' + result.responseText.substring(9) + ')').payload.collections[0].members;
				
				for (i = 0; i < friends.length; i++) {
					list[i] = {ID:friends[i], userName:'', aliasName:'', userUrl:'', userImg:''};
				}
				GM_setValue(fbID + valName, uneval(list));
			}
		});
	}
	GM_registerMenuCommand("Update friend list", updateFriendList);
	/************************************************************/
}
