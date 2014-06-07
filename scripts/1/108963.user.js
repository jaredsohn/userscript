// ==UserScript==
// @name			Coup d'Bungie 6 for Firefox
// @namespace       http://userscripts.org/scripts/show/97979
// @description		Personlize your bungie.net experience
// @version	 		6
// @include         http*://*bungie.net/*
// @exclude         http*://*bungie.net/*createpost.aspx*
// @exclude         http*://*bungie.net/Account/Playtest/*
// @exclude         http*://*bungie.net/Account/Settings.aspx*
// @author	  		THELizzard01
// @copyright		2011, THELizzard01
// @contributor		Iggyhopper
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require			http://dohpaz.com/flydom/js/jquery.flydom-3.1.1.js
// @license 		(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==


/*
	Notes:
		- Disallow script to run on any page that has access to profile information
		- Some methods ununsed
		- Unsure if caching is fully working (it does remove pages, at least)
		- Still need to add profile modifications for other members' pages
		- Logical discrepancy between User members and User-in-JSON members
*/


//New String members
String.HTMLEncode = function(str){
	//Returns a string with HTML entities encoded
	return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;");
}
String.prototype.HTMLEncode = function(){
	return String.HTMLEncode(this);
}
String.PadLeft = function(str, length, padding){
	//Returns str with the left side padded with [padding] to [length] length
	while(str.length < length){
		str = padding + str;
	}
	return str;
}


//New Number members
Number.prototype.PadLeft = function(length, padding){
	//Convert the number to a string, then pass it to String.PadLeft
	return String.PadLeft(this.toString(), length, padding);
}
Number.prototype.HTMLEncode = function(){
	return String.HTMLEncode(this.toString());
}


//New Array members
Array.prototype.Add = function(o){
	//Adds an object to the beginning of the current array
	this.unshift(o);
}
Array.prototype.Contains = function(o){
	//Iterate over the current array, check if argument exists within it
	for(var x in this){
		if(this[x] === o){
			return true;
		}
	}
	return false;
}
Array.prototype.Delete = function(o){
	//Iterate over current array, check against argument, delete and return true if match, false if didn't delete anything
	for(var i=0; i<this.length; i++){
		if(this[i] === o){
			this.splice(i, 1);
			return true;
		}
	}
	return false;
}
Array.prototype.Clear = function(){
	//Delete all of the elements in the current array
	this.length = 0;
}
Array.prototype.Distinct = function(){
	//Return a new array with duplicate objects removed
	var hash = {};
	var result = [];
    for(var i=0; i<this.length; ++i) {
        if(!hash.hasOwnProperty(this[i])) {
            hash[this[i]] = true;
            result.push(this[i]);
        }
    }
    return result; //NOTE, update this at some point so method does not return an array, just modifies current instance
}



//Browser: Good (28th June, 2011)
var Browser = {
	
	Memory:{
		Set:function(name, value){
			console.log("Setting value (" + value + ") under name (" + name + ")");
			GM_setValue(name, value);
			console.log("Finished setting value (" + value + ") under name (" + name + ")");
		},
		Get:function(name, defaultValue){
			console.log("Getting value named (" + name + ")");
			var val = GM_getValue(name);
			if(typeof val === "undefined"){
				console.log(name + " was not found. Returning default value (" + defaultValue + ")");
				return defaultValue;
			}
			console.log("Found value named (" + name + "). Returning value (" + val + ")");
			return val;
		},
		Delete:function(name){
			console.log("Removing value named (" + name + ")");
			GM_deleteValue(name);
			console.log("Finished removing value named (" + name + ")");
		},
		Exists:function(name){
			console.log("Checking if value named (" + name + ") exists");
			if(this.Get(name, undefined) != undefined){
				console.log("Value named (" + name + ") exists");
				return true;
			}
			console.log("Value named (" + name + ") does not exist");
			return false;
		},
		DeleteAll:function(){
			console.log("Deleting all values");
			var keys = GM_listValues();
			for(var i=0; i<keys.length; i++){
				this.Delete(keys[i]);
			}
			console.log("Finished deleting all values");
		}
	},
	SupportsCoupDBungie:function(){
		console.log("Determining whether browser supports Coup d'Bungie");
		if(GM_setValue && GM_xmlhttpRequest && JSON){
			console.log("Browser supports Coup d'Bungie");
			return true;
		}
		console.log("Browser does not support Coup d'Bungie");
		return false;
	}

}


//CoupDBungie: Good (28th June, 2011)
var CoupDBungie = {

	Version:"6.0.9",
	Platform:"Firefox",
	Author:"THELizzard01",
	AuthorMemberID:2758679,
	
	Server:{
		
		Host:"http://coup-srv-01.comeze.com/",
		Path:"api/",
		Method:"GET",
		
		CreateDefaultXHR:function(path){
			console.log("Creating default XHR object");
			return{
				url:this.Host + this.Path + ((path != null) ? path : ""),
				method:this.Method
			}
		},
		Register:function(username, memberID, onload, onerror, onreadystatechange){
			var xhr = this.CreateDefaultXHR("Register?");
			if(username != null){
				xhr.url += "username=" + User.EncodeUsername(username);
			}
			else if(memberID != null){
				xhr.url += "memberID=" + memberID;
			}
			xhr.onload = onload;
			xhr.onerror = onerror;
			xhr.onreadystatechange = onreadystatechange;
			console.log("Making a Register request to (" + xhr.url + ")");
			GM_xmlhttpRequest(xhr);
		},
		Report:function(username, key, subject, reason, onload, onerror, onreadystatechange){
			var xhr = this.CreateDefaultXHR("Report?");
			xhr.url += "username=" + User.EncodeUsername(username) + "&key=" + key + "&subject=" + User.EncodeUsername(subject) + "&reason=" + encodeURIComponent(reason);
			xhr.onload = onload;
			xhr.onerror = onerror;
			xhr.onreadystatechange = onreadystatechange;
			console.log("Making a Report request to (" + xhr.url + ")");
			GM_xmlhttpRequest(xhr);
		},	
		GetStyles:function(username, key, usernames, onload, onerror, onreadystatechange){
			var xhr = this.CreateDefaultXHR("GetStyles?");
			xhr.url += "username=" + User.EncodeUsername(username) + "&key=" + key + "&users=" + User.EncodeUsernameArray(usernames).join(",");
			xhr.onload = onload;
			xhr.onerror = onerror;
			xhr.onreadystatechange = onreadystatechange;
			console.log("Making a GetStyles request to (" + xhr.url + ")");
			GM_xmlhttpRequest(xhr);
		},	
		PublishStyles:function(username, key, styles, onload, onerror, onreadystatechange){
			var xhr = this.CreateDefaultXHR("PublishStyles?");
			xhr.url += "username=" + User.EncodeUsername(username) + "&key=" + key + styles.ToPublishString();
			xhr.onload = onload;
			xhr.onerror = onerror;
			xhr.onreadystatechange = onreadystatechange;
			console.log("Making a PublishStyles request to (" + xhr.url + ")");
			GM_xmlhttpRequest(xhr);
		
		}
		
	},
	
	Initialise:function(){
		if(Browser.SupportsCoupDBungie()){
			Cache.Initialise();
			//Other components (if they exist) should be initialised here as well
			return true;
		}
		else{
			throw new this.CoupDBungie5Exception("Browser cannot support this script");
		}
	},
	
	CoupDBungie5Exception:function(message){
		throw new Error(message ? message : "", "CoupDBungie5Exception");
	}

}


//Cache: Good, but unsure if caching functions actually work (28th June, 2011)
var Cache = {

	CACHE_NAME:"Coup5Cache",
	MAX_PAGES:200,
	BUFFER:30, //Should be non-negative
	PAGE_EXPIRATION_THRESHOLD:1440, //Measured in minutes (1440 is one day - each page cached for a day)
	WorkingSet:[],
	
	Initialise:function(){
		console.log("Initialising cache");
		this.Load();
		console.log("Finished initialising cache");
	},
	
	Load:function(){
		try{
			this.WorkingSet = JSON.parse(Browser.Memory.Get(this.CACHE_NAME, undefined));
			console.log("Cache loaded successfully");
		}
		catch(e){
			console.log("An error occurred while loading the cache (" + e + "). Cache will now be deleted");
			Browser.Memory.Delete(this.CACHE_NAME); //Assume the cache variable is corrupt, so delete it
			this.WorkingSet = []; //... and set the local copy to an empty array (hard restart)
		}
	},
	Save:function(){
		console.log("Saving cache");
		try{
			Browser.Memory.Set(this.CACHE_NAME, JSON.stringify(this.WorkingSet));
			console.log("Cache saved successfully");
		}
		catch(e){
			console.log("Cache failed to save - reason: (" + e + ")");
		}
	},
	
	Management:function(){
	
		function _Primary_Management(){
			var now = new Date();
			//Immediately remove any pages which have a cache date older than the threshold
			for(var i=Cache.WorkingSet.length-1; i>=0; i--){ //Go backwards to be sure to iterate over everything
				if((((now - new Date(Cache.WorkingSet[i].Date))/1000)/60) > Cache.PAGE_EXPIRATION_THRESHOLD){
					console.log("Deleting page via Primary Cache Management");
					Cache.WorkingSet.Delete(Cache.WorkingSet[i]);
				}
			}
			
			
		}	
		function _Secondary_Management(){
			//Sort into asc order so that the we're deleting pages which were last hit a while ago (ie. not the recent ones)
			Cache.WorkingSet.sort(function(page1, page2){
				return new Date(page1.LastHit) >= new Date(page2.LastHit) ? 1 : -1; //>= is OK
			});
			//Then remove until under buffer zone
			while(Cache.WorkingSet.length >= (Cache.MAX_PAGES - Cache.BUFFER)){
				console.log("Removing page via Secondary Cache Management");
				Cache.WorkingSet.Delete(Cache.WorkingSet[0]); //Cut the top off
			}
		}
		
		_Primary_Management(); //Always do this
		if(this.WorkingSet.length >= (this.MAX_PAGES - this.BUFFER)){
			_Secondary_Management(); //Only do this when there's not a whole lot of room left
		}
		
	},
	
	Add:function(page){
		console.log("Adding page to working set");
		this.Management();
		var existingPage = this.Get(page.Data.Username);
		if(existingPage != null){
			console.log("Found an existing page");
			existingPage = page;
			console.log("Page replaced");
		}
		else{
			this.WorkingSet.Add(page);
			console.log("Page added");
		}
	},
	Exists:function(username){
		console.log("Checking is page exists for (" + username + ")");
		if(this.Get(username) != null){
			console.log("Page exists for (" + username + ")");
			return true;
		}
		console.log("Page doesn't exist for (" + username + ")");
		return false;
	},
	Get:function(username){
		console.log("Getting page for (" + username + ")");
		for(var i=0; i<this.WorkingSet.length; i++){
			if(this.WorkingSet[i].Data.Username == username){
				this.WorkingSet[i].LastHit = new Date();
				return this.WorkingSet[i];
			}
		}
		console.log("Couldn't find a page for (" + username + ")");
		return null;
	},
	Delete:function(page){
		console.log("Removing page");
		this.WorkingSet.Delete(page);
	},
	DeleteAll:function(){
		this.WorkingSet.Clear();
	},
	
	Page:function(user){
		console.log("Creating a new cache page");
		this.Data = user;
		this.Date = new Date();
		this.LastHit = null;
		console.log("Finished creating a new cache page");
	}
	
}


//User: Good, User.ToEncodedUsernameArray is unused (28th June, 2011)
function User(username, id, styles, isCoupUser){
	this.Username = username;
	this.Id = id;
	this.Styles = styles;
	this.CoupUser = isCoupUser;
}
User.EncodeUsername = function(username){
	return escape(username);
}
User.ToEncodedUsernameArray = function(users){
	//users is an array of user objects
	usernames = [];
	for(var i=0; i<users.length; i++){
		usernames.Add(this.EncodeUsername(users[i].Username));
	}
	return usernames;
}
User.EncodeUsernameArray = function(usernameArr){
	var arr = [];
	for(var i=0; i<usernameArr.length; i++){
		arr.Add(User.EncodeUsername(usernameArr[i]));
	}
	return arr;
}


//Styles: Good, Styles.Sanitise is unused (28th June, 2011)
function Styles(){
	
	this.Sanitise = function(){
		for(var s in this){
			if(this.hasOwnProperty(s) && typeof this[s] === "string"){
				this[s] = this[s].HTMLEncode();
			}
		}
	}
	this.ToPublishString = function(){
		var str = "";
		for(var s in this){
			if(typeof this[s] !== "function"){
				str += "&" + s + "=" + encodeURIComponent(this[s] != undefined ? this[s] : Styles.DEFAULT_STYLE);
			}
		}
		return str;
	}
	
	this.TitlebarUsernameText = undefined;
	this.TitlebarUsernameTextColor = undefined;
	this.TitlebarTitleText = undefined;
	this.TitlebarTitleTextColor = undefined;
	this.TitlebarMessageText = undefined;
	this.TitlebarMessageTextColor = undefined;
	this.TitlebarGroupText = undefined;
	this.TitlebarGroupTextColor = undefined;
	this.TitlebarBackgroundImage = undefined;
	this.TitlebarBackgroundColor = undefined;
	this.TitlebarBackgroundGradientLeft = undefined;
	this.TitlebarBackgroundGradientRight = undefined;
	this.TitlebarBorderStyle = undefined;
	this.TitlebarBorderColor = undefined;

	this.AvatarImage = undefined;
	this.AvatarBorderStyle = undefined;
	this.AvatarBorderColor = undefined;

	this.PostBackgroundImage = undefined;
	this.PostBackgroundColor = undefined;
	this.PostBackgroundGradientLeft = undefined;
	this.PostBackgroundGradientRight = undefined;
	this.PostFont = undefined;
	this.PostFontColor = undefined;
	this.PostLinkColor = undefined;
	
}
Styles.DEFAULT_STYLE = "*";


//Client: Good (28th June, 2011)
var Client = {

	KEY_NAME:"coup5key",

	GetUsername:function(defaultVal){
		var match = /BungieDisplayName=(.*?)(?:;|$)/i.exec(document.cookie);
		return match != null && match[1] != undefined ? unescape(match[1]).replace(/&nbsp;/gi, " ") : defaultVal;
	},
	IsSignedIn:function(){
		if(document.getElementById("ctl00_dashboardNav_passportSignOutLink")){
			return true;
		}
		return false;
	},
	GetKey:function(defaultVal){
		return Browser.Memory.Get(this.KEY_NAME, defaultVal);
	},
	SetKey:function(keyValue){
		Browser.Memory.Set(this.KEY_NAME, keyValue);
	}

}


//MainFunctions: Good, could use a tidyup/optimising though (28th June, 2011)
var MainFunctions = {

	ClientProfilePage:function(){
	
		var s = null;
		var page = Cache.Get(Client.GetUsername(null));
		if(page != null && page.Data.Styles != null){
			s = page.Data.Styles;
		}
	
		$("#ctl00_mainContent_profilePanel").createAppend(
			"div", {className:"boxD_outer", id:"CoupDBungie5", style:{width:"100%", marginTop:"-10px"}}, [
				"div", {className:"boxD_inner"}, [
					"div", {className:"boxD", style:{width:"100%"}}, [
						
						"h3", null, [
							"span", null, "Coup d&#39;Bungie " + CoupDBungie.Version + " for " + CoupDBungie.Platform + " (by ",
							"a", {href:"?memberID=" + CoupDBungie.AuthorMemberID}, CoupDBungie.Author.HTMLEncode(),
							"span", null, ")"
						],
						
						//Profile section
						"div", {style:{margin:"5px"}}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Profile",
								"table", {style:{width:"100%"}}, [
								
									"tr", null, [
										"td", {colspan:"2"}, [
											"p", {style:{margin:"10px"}}, [
												"span", null, "Welcome to Coup d&#39;Bungie 6.",
												"br", null, null,
												"br", null, null,
												"span", null, "To use Coup d&#39;Bungie 6, you must first register. You only need to do this once and once only. There is more information about the registeration process in the FAQ on Registeration link below. Please note: ",
												"b", {style:{textDecoration:"underline"}}, "You cannot use any part of Coup 6 (including publishing styles, seeing others&#39; styles, reporting, etc...) until you have registered!"
											]
										]
									],
								
									//Key row
									"tr", null, [
										"td", null, "Key: ",
										"td", null, [
											"input", {type:"password", readOnly:"readonly", size:64, value:Client.GetKey("")}, null,
											"a", 
												{
													style:{marginLeft:"8px", cursor:"pointer", MozUserSelect:"none"},
													onclick:function(){
														var type = $(this).siblings("input").get(0).type;
														$(this).prev("input").get(0).type = type == "password" ? "input" : "password";
													}
												},
											"Show/Toggle",
											"a",
												{
													style:{marginLeft:"8px", cursor:"pointer", MozUserSelect:"none"},
													onclick:function(){
														var newkey = prompt("This option is for manually entering and saving a key.");
														if(newkey != null){
															Client.SetKey(newkey);
															$(this).siblings("input").val(newkey);
															alert("Key saved successfully");
														}
													}
												},
											"Manual Override"
										]
									],
									//End Key row
									
									//Register row
									"tr", null, [
										"td", null, "",
										"td", null, [
											"input", {type:"button", value:"Register",
												onclick:function(){
												
													if(Client.GetKey(null) != null){
														if(!confirm("It appears you already have a key stored. Do you want to begin the registration process anyway?")){
															return;
														}
													}
													
													alert("The Coup d'Bungie 5 registration process will now begin.");
													alert(
														"Please note:\n\n" +
														"- Make sure you've read the article \"FAQ on Registration\" if you're not sure about anything\n" +
														"- There are a few questions along the way\n" +
														"- You'll only ever have to do this process once\n" +
														"- It will take a few minutes at the most to complete\n" +
														"- Do not start a new browsing session during the process\n" +
														"- If you have any problems, don't hesitate to ask!"
													);
													
													if(!confirm("If your username is " + Client.GetUsername("") + ", click OK to continue")){
														return;
													}
													
													if(confirm("Click OK if you have already received a Validation String from this process, otherwise click cancel (you should probably click cancel if you haven't done this before)")){
														
														var memberID;
														do{
															memberID = prompt("Enter your memberID (not your userID)")
														}
														while(!/^[0-9]+$/g.test(memberID));
														
														CoupDBungie.Server.Register(null, memberID,
															function(r){
																try{
																	var obj = JSON.parse(r.responseText);
																	if(obj.Status === 1){
																		alert("Success!\n\nYour key is: " + obj.Key + "\n\nThis will also now be stored in your browser");
																		Client.SetKey(obj.Key);
																	}
																	else{
																		alert("The server said: " + obj.Reason);
																	}
																}
																catch(e){
																	alert("It looks like you got a response from the server, just not a valid one. You can try again, but the server might be screwy.");
																}
															},
															function(r){
																alert("It seems something has gone wrong. Whatever you were doing, try it again. If it still doesn't work, make a ragepost in the forum about it.");
															}, null
														);
														
													}
													else{
													
														CoupDBungie.Server.Register(Client.GetUsername(""), null,
															function(r){
																try{
																	var obj = JSON.parse(r.responseText);
																	if(obj.Status === 1){
																		alert("Success!\n\nHere is your Validation String: " + obj.ValidationString);
																	}
																	else{
																		alert("The server said: " + obj.Reason);
																	}
																}
																catch(e){
																	alert("It looks like you got a response from the server, just not a valid one. You can try again, but the server might be screwy.");
																}
															},
															function(r){
																alert("It seems something has gone wrong. Whatever you were doing, try it again. If it still doesn't work, make a ragepost in the forum about it.");
															},
															null
														);
														
													}
												}
											},
											null,
											"a", {href:"/fanclub/coup5/Group/Resources/FAQ.aspx?cid=578645", target:"_blank", style:{marginLeft:"8px"}}, "FAQ on Registration"
										]
									]
									//End Register row
									
								]
							]
						],
						//End Profile section
						
						//Start Publish Styles section
						"div", {style:{margin:"5px"}}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Publish Styles",
								"table", {style:{width:"100%"}}, [
								
									"tr", null, [
										"td", {colspan:"2"}, [
											"p", {style:{margin:"10px"}}, [
												"span", null, "Here is where you can publish a new set of styles. If you haven't already, you should read up on ",
												"a", {href:"/fanclub/404459/Forums/posts.aspx?postID=60124459", target:"_blank"}, "what is and what is not permitted",
												"span", null, " to be published, as well as the restrictions. If you feel that they are too restrictive, or just want to suggest an idea or feature, please make a topic about it in the ",
												"a", {href:"/fanclub/coup6/Group/GroupHome.aspx", target:"_blank"}, "Coup d'Bungie 6 forum"
											]
										]
									],
								
									"tr", {style:{fontWeight:"bold", fontStyle:"italic", textDecoration:"underline"}}, [
										"td", {style:{width:"180px"}}, "Style Name",
										"td", null, "Style Value"
									],
								
									"tr", null, [
										"td", null, "TitlebarUsernameText: ",
										"td", null, [
											"input", {id:"TitlebarUsernameText", maxLength:16, value:s != null ? s.Titlebar.UsernameText : Styles.DEFAULT_STYLE}, null,
											"span", null, " 1-16 characters, from 0x20-0xFF (see ",
											"a", {href:"http://www.theasciicode.com.ar/the_ascii_code/theASCIIcode.gif", target:"_blank"}, "here",
											"span", null, "), cannot begin with a space"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarUsernameTextColor: ",
										"td", null, [
											"input", {id:"TitlebarUsernameTextColor", maxLength:6, value:s != null ? s.Titlebar.UsernameTextColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarTitleText: ",
										"td", null, [
											"input", {id:"TitlebarTitleText", maxLength:24, value:s != null ? s.Titlebar.TitleText : Styles.DEFAULT_STYLE}, null,
											"span", null, " 0-24 characters, alphanumeric (and space) only"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarTitleTextColor: ",
										"td", null, [
											"input", {id:"TitlebarTitleTextColor", maxLength:6, value:s != null ? s.Titlebar.TitleTextColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarMessageText: ",
										"td", null, [
											"input", {id:"TitlebarMessageText", maxLength:12, value:s != null ? s.Titlebar.MessageText : Styles.DEFAULT_STYLE}, null,
											"span", null, " 0-12 characters, alphanumeric (and space) only"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarMessageTextColor: ",
										"td", null, [
											"input", {id:"TitlebarMessageTextColor", maxLength:6, value:s != null ? s.Titlebar.MessageTextColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarGroupText: ",
										"td", null, [
											"input", {id:"TitlebarGroupText", maxLength:6, value:s != null ? s.Titlebar.GroupText : Styles.DEFAULT_STYLE}, null,
											"span", null, " 0-6 characters, alphanumeric (and space) only"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarGroupTextColor: ",
										"td", null, [
											"input", {id:"TitlebarGroupTextColor", maxLength:6, value:s != null ? s.Titlebar.GroupTextColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundImage: ",
										"td", null, [
											"input", {id:"TitlebarBackgroundImage", maxLength:255, value:s != null ? s.Titlebar.BackgroundImage : Styles.DEFAULT_STYLE}, null,
											"a", {href:"/fanclub/coup5/Group/Resources/FAQ.aspx?cid=578756", target:"_blank"}, " FAQ on Images"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundColor: ",
										"td", null, [
											"input", {id:"TitlebarBackgroundColor", maxLength:6, value:s != null ? s.Titlebar.BackgroundColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundGradientLeft: ",
										"td", null, [
											"input", {id:"TitlebarBackgroundGradientLeft", maxLength:6, value:s != null ? s.Titlebar.BackgroundGradientLeft : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundGradientRight: ",
										"td", null, [
											"input", {id:"TitlebarBackgroundGradientRight", maxLength:6, value:s != null ? s.Titlebar.BackgroundGradientRight : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBorderStyle: ",
										"td", null, [
											"input", {id:"TitlebarBorderStyle", value:s != null ? s.Titlebar.BorderStyle : Styles.DEFAULT_STYLE}, null,
											"span", null, " dotted, dashed, solid, double, groove, ridge, inset, or outset"
										]
									],
									
									"tr", null, [
										"td", null, "TitlebarBorderColor: ",
										"td", null, [
											"input", {id:"TitlebarBorderColor", maxLength:6, value:s != null ? s.Titlebar.BorderColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"hr", null
										]
									],
									
									"tr", null, [
										"td", null, "AvatarImage: ",
										"td", null, [
											"input", {id:"AvatarImage", maxLength:255, value:s != null ? s.Avatar.Image : Styles.DEFAULT_STYLE}, null,
											"a", {href:"/fanclub/coup5/Group/Resources/FAQ.aspx?cid=578756", target:"_blank"}, " FAQ on Images"
										]
									],
									
									"tr", null, [
										"td", null, "AvatarBorderStyle: ",
										"td", null, [
											"input", {id:"AvatarBorderStyle", value:s != null ? s.Avatar.BorderStyle : Styles.DEFAULT_STYLE}, null,
											"span", null, " dotted, dashed, solid, double, groove, ridge, inset, or outset"
										]
									],
									
									"tr", null, [
										"td", null, "AvatarBorderColor: ",
										"td", null, [
											"input", {id:"AvatarBorderColor", maxLength:6, value:s != null ? s.Avatar.BorderColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"hr", null
										]
									],
									
									"tr", null, [
										"td", null, "PostBackgroundImage: ",
										"td", null, [
											"input", {id:"PostBackgroundImage", maxLength:255, value:s != null ? s.Post.BackgroundImage : Styles.DEFAULT_STYLE}, null,
											"a", {href:"/fanclub/coup5/Group/Resources/FAQ.aspx?cid=578756", target:"_blank"}, " FAQ on Images"
										]
									],
									
									"tr", null, [
										"td", null, "PostBackgroundColor: ",
										"td", null, [
											"input", {id:"PostBackgroundColor", maxLength:6, value:s != null ? s.Post.BackgroundColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "PostBackgroundGradientLeft: ",
										"td", null, [
											"input", {id:"PostBackgroundGradientLeft", maxLength:6, value:s != null ? s.Post.BackgroundGradientLeft : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "PostBackgroundGradientRight: ",
										"td", null, [
											"input", {id:"PostBackgroundGradientRight", maxLength:6, value:s != null ? s.Post.BackgroundGradientRight : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "PostFont: ",
										"td", null, [
											"input", {id:"PostFont", value:s != null ? s.Post.Font : Styles.DEFAULT_STYLE}, null,
											"span", {style:{fontSize:"95%"}}, " arial, helvetica, times new roman, courier, verdana, tahoma, comic sans ms, impact, georgia, palatino"
										]
									],
									
									"tr", null, [
										"td", null, "PostFontColor: ",
										"td", null, [
											"input", {id:"PostFontColor", value:s != null ? s.Post.FontColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", null, "PostLinkColor: ",
										"td", null, [
											"input", {id:"PostLinkColor", maxLength:6, value:s != null ? s.Post.LinkColor : Styles.DEFAULT_STYLE}, null,
											"span", null, " 3-6 hexadecimal characters (0-9, a-f)"
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"div", {className:"forum_item"}, [
												"div", {className:"forum_item_outer_shell"}, [
													"span", null, [
														"a", null, null,
														"div", {className:"forumpost"}, [
															"div", {className:"clear"}, null,
															"div", {className:"forumavatar"}, [
																"a", {style:{cursor:"pointer"}}, [
																	"img", {style:{height:"90px", width:"90px", borderWidth:"0px"}, src:"/Forums/skins/default/avatars/default_avatar.gif"}, null
																]
															],
															"div", {className:"postbody"}, [
																"ul", {style:{backgroundColor:"#4c4c4c"}, className:"author_header_block"}, [
																	"li", {className:"login"}, [
																		"a", {href:"/"}, Client.GetUsername("Username"),
																	],
																	"li", null, " | ",
																	"li", {className:"title"}, "Legendary Member",
																	"li", {className:"author_header_links"}, [
																		"a", {className:"expanded_arrows_collapsed"}, [
																			"img", {style:{width:"21px", height:"20px"}, src:"/images/spacer.gif"}
																		]
																	],
																	"li", {className:"author_header_links"}, " | more ",
																	"li", {className:"author_header_links"}, [
																		"a", {href:"/account/profile.aspx?page=Chapters"}, "groups"
																	],
																	"li", {className:"author_header_links"}, " | ",
																	"li", {className:"author_header_links"}, [
																		"a", {href:"/account/profile.aspx?page=Messages"}, "message user"
																	]
																],
																"p", null, "The preview feature does not work... yet"
															],
															"div", {className:"post-actions"}, [
																"ul", null, [
																	"li", {className:"date"}, "07.07.7777 7:07 PM PDT",
																	"li", null, [
																		"a", {href:"/", className:"forum_post_reply_button"}, [
																			"img", {style:{height:"17px", width:"52px"}, src:"/images/spacer.gif", alt:"reply"}
																		]
																	]
																]
															]
														]
													]
												]
											]
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"input", {type:"button", style:{margin:"8px", marginLeft:"0px"}, value:"Publish Styles",
												onclick:function(){
											
													if(Client.GetKey(null) == null){
														alert("You will need to register and have a key saved before you can publish any styles.");
														return;
													}
											
													if(!confirm("Are you sure you want to publish these styles?")){
														return;
													}
													
													var s = new Styles();
													
													s.TitlebarUsernameText = $("#TitlebarUsernameText").val();
													s.TitlebarUsernameTextColor = $("#TitlebarUsernameTextColor").val();
													s.TitlebarTitleText = $("#TitlebarTitleText").val();
													s.TitlebarTitleTextColor = $("#TitlebarTitleTextColor").val();
													s.TitlebarMessageText = $("#TitlebarMessageText").val();
													s.TitlebarMessageTextColor = $("#TitlebarMessageTextColor").val();
													s.TitlebarGroupText = $("#TitlebarGroupText").val();
													s.TitlebarGroupTextColor = $("#TitlebarGroupTextColor").val();
													s.TitlebarBackgroundImage = $("#TitlebarBackgroundImage").val();
													s.TitlebarBackgroundColor = $("#TitlebarBackgroundColor").val();
													s.TitlebarBackgroundGradientLeft = $("#TitlebarBackgroundGradientLeft").val();
													s.TitlebarBackgroundGradientRight = $("#TitlebarBackgroundGradientRight").val();
													s.TitlebarBorderStyle = $("#TitlebarBorderStyle").val();
													s.TitlebarBorderColor = $("#TitlebarBorderColor").val();
													
													s.AvatarImage = $("#AvatarImage").val();
													s.AvatarBorderStyle = $("#AvatarBorderStyle").val();
													s.AvatarBorderColor = $("#AvatarBorderColor").val();
													
													s.PostBackgroundImage = $("#PostBackgroundImage").val();
													s.PostBackgroundColor = $("#PostBackgroundColor").val();
													s.PostBackgroundGradientLeft = $("#PostBackgroundGradientLeft").val();
													s.PostBackgroundGradientRight = $("#PostBackgroundGradientRight").val();
													s.PostFont = $("#PostFont").val();
													s.PostFontColor = $("#PostFontColor").val();
													s.PostLinkColor = $("#PostLinkColor").val();
											
													CoupDBungie.Server.PublishStyles(Client.GetUsername(""), Client.GetKey(""), s,
														function(r){
															try{
																var obj = JSON.parse(r.responseText);
																if(obj.Status === 1){
																	Cache.Delete(Cache.Get(Client.GetUsername(null)));
																	Cache.Save();
																	alert("Your styles were published successfully.");
																}
																else{
																	alert("The server said: " + obj.Reason);
																}
															}
															catch(e){
																alert("It looks like you got a response from the server, just not a valid one, so it's unlikely that your styles were published. You can try again, but the server might be screwy.");
															}
														},
														function(r){
															alert("Something odd happened. It's unlikely that your styles were published. Maybe give it another try?");
														},
														null
													);
											
												}
											}
										]
									]
									
								]
							]
						],
						//End Publish Styles section
						
						//Cache
						"div", {style:{margin:"5px"}}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Cache",
								"table", {id:"CoupCacheTable", style:{width:"100%"}}, [
									
									"tr", null, [
										"td", {colspan:"5"}, [
											"p", {style:{margin:"10px"}}, "This is the Coup d'Bungie 5 cache. Its contents are here to keep performance at a high standard - meaning, it makes things go faster, like red painted cars. It holds a series of User objects, each of which contain data about Bungie.net users and their associated Coup d'Bungie styles so you don't need to continually fetch them from the server. This script which generates the cache also has automatic cache management functionality built-in, so items will automatically be deleted when they need to be. However, you can also delete items yourself just by clicking the 'Delete' button beside each username. Note that the Coup d&#39;Bungie cache (the data that is listed below) is NOT the same as your browser&#39;s cache. Do not clear your browser&#39;s cache or your cookies to try to get the script to work."
										]
									],
									
									"tr", {style:{fontWeight:"bold", textDecoration:"underline", fontStyle:"italic"}}, [
										"td", {style:{width:"150px"}}, "Username",
										"td", {style:{width:"200px"}}, "Cache Date",
										"td", {style:{width:"200px"}}, "Last Hit",
										"td", {style:{width:"100px"}}, "Coup5 User",
										"td", null, ""
									]
									
								],
								"div", {style:{margin:"8px", marginLeft:"0px"}}, [
									"input", {value:"Delete All", type:"button",
										onclick:function(){
											if(!confirm("Are you sure you want to delete all items in the cache?")){
												return;
											}
											Cache.DeleteAll();
											Cache.Save();
											$("#CoupCacheTable").find("tr:gt(1)").remove();
										}
									}
								]
							]
						],
						//End Cache section
						
						//Start report section
						"div", {style:{margin:"5px"}}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Report",
								"table", {style:{width:"100%"}}, [
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"p", {style:{margin:"10px"}}, "You can use the form below to submit a report about another user's Coup d'Bungie 5 styles. Type in the username of a user you believe has posted inappropriate content, and optionally provide a reason for the report."
										]
									],
									
									"tr", null, [
										"td", null, [
											"span", null, "Username: ",
											"input", {type:"text", id:"CoupReportSubject", maxLength:16}
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"textarea", {rows:"6", cols:"40", id:"CoupReportReason", maxLength:255}
										]
									],
									
									"tr", null, [
										"td", {colspan:"2"}, [
											"input", {type:"button", style:{margin:"8px", marginLeft:"0px"}, value: "Submit Report",
												onclick:function(){
													if(!confirm("Are you sure you want to report this user?")){
														return;
													}
													var reason = $("#CoupReportReason").val();
													var subject = $("#CoupReportSubject").val();

													CoupDBungie.Server.Report(Client.GetUsername(""), Client.GetKey(""), subject, reason,
														function(r){
															try{
																var obj = JSON.parse(r.responseText);
																if(obj.Status === 1){
																	alert("Report was successful");
																}
																else{
																	alert("The server said: " + obj.Reason);
																}
															}
															catch(e){
																alert("It looks like you got a response from the server, just not a valid one, so it's unlikely that your report was submitted. You can try again, but the server might be screwy.");
															}
														},
														function(r){
															alert("Weird... that wasn't supposed to happen. The server might be down. Give it another try.");
														},
														null
													);
												}
											}
										]
									]
									
								]
							]
						]
						//End report section
						
					]
				]
			]
		);
		
		//Add cached items to table
		for(var i=0; i<Cache.WorkingSet.length; i++){
			$("#CoupCacheTable").createAppend(
				"tr", null, [
					"td", null, (i + 1) + ". " + Cache.WorkingSet[i].Data.Username.HTMLEncode(),
					"td", null, new Date(Cache.WorkingSet[i].Date).toUTCString(),
					"td", null, Cache.WorkingSet[i].LastHit != null ? new Date(Cache.WorkingSet[i].LastHit).toUTCString() : "not hit",
					"td", null, Cache.WorkingSet[i].Data.CoupUser ? "Yes" : "No",
					"td", null, [
						"input", {type:"hidden", value:Cache.WorkingSet[i].Data.Username}, null, 
						"input", {type:"button", value:"Delete",
							onclick:function(){
								var page = Cache.Get($(this).prev("input:hidden").val());
								if(page != null){
									Cache.Delete(page);
									Cache.Save();
								}
								$(this).closest("tr").remove();
							}
						}
					]
				]
			);
		}
		
		//Ban history parsing
		$("#ctl00_mainContent_BanHistoryPanel p").each(function(){
			$(this).html($(this).html().replace(/^(\s*?\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} (?:AM|PM):\s*?)(.+?) \[(\d+)\]/, "$1<a href=\"/Account/Profile.aspx?uid=$3\">$2</a> [$3]"));
		});
		//End Ban history parsing
		
	},
	
	PostsPage:function(){
		
		function ApplyStyles(){
			
			var items = $("#ctl00_mainColPanel div.forum_item, div.forum_alt_item").find("div.forumpost:has(li.login > a)");
			items.each(function(){
				
				//Permalinks
				$(this).find("ul.rightside").createAppend(
					"li", null, [
						"a", {target:"_blank", href:"?postID=" + $(this).parent().find('a[id][name][href!=""]:first').attr("name")}, "permalink to this post"
					]
				);
				//End Permalinks
				
				var page = Cache.Get($(this).find("li.login a").text());
				if(page == null || page.Data.Styles == null){
					return;
				}
				var s = page.Data.Styles;
				
				//jQuery's .text method automatically converts HTML, so don't need to call String.HTMLEncode where applicable				
				
				//Set titlebar
				if(s.Titlebar.BackgroundColor != Styles.DEFAULT_STYLE){
					$(this).find("ul.author_header_block").css("background-color", "#" + s.Titlebar.BackgroundColor.HTMLEncode());
				}
				if(s.Titlebar.BackgroundGradientLeft != Styles.DEFAULT_STYLE && s.Titlebar.BackgroundGradientRight != Styles.DEFAULT_STYLE){
					$(this).find("ul.author_header_block").css("background-image", "-moz-linear-gradient(left, #" + s.Titlebar.BackgroundGradientLeft.HTMLEncode() + ", #" + s.Titlebar.BackgroundGradientRight.HTMLEncode() + ")");
				}
				if(s.Titlebar.BackgroundImage != Styles.DEFAULT_STYLE){
					$(this).find("ul.author_header_block").css("background-image", "url(\"" + s.Titlebar.BackgroundImage.HTMLEncode() + "\")");
				}
				if(s.Titlebar.BorderColor != Styles.DEFAULT_STYLE && s.Titlebar.BorderStyle != Styles.DEFAULT_STYLE){
					$(this).find("ul.author_header_block").css("border", "1px solid #" + s.Titlebar.BorderColor.HTMLEncode());
					$(this).find("ul.author_header_block").css("border-style", s.Titlebar.BorderStyle.HTMLEncode());
				}
				var groupElem = $(this).find("ul.author_header_block li.author_header_links > a:contains('groups')");
				if(s.Titlebar.GroupText != Styles.DEFAULT_STYLE){
					groupElem.text(s.Titlebar.GroupText);
				}
				if(s.Titlebar.GroupTextColor != Styles.DEFAULT_STYLE){
					groupElem.css("color", "#" + s.Titlebar.GroupTextColor.HTMLEncode());
				}			
				var msgElem = $(this).find("ul.author_header_block li.author_header_links > a:contains('message user')");
				if(s.Titlebar.MessageText != Styles.DEFAULT_STYLE){
					msgElem.text(s.Titlebar.MessageText);
				}
				if(s.Titlebar.MessageTextColor != Styles.DEFAULT_STYLE){
					msgElem.css("color", "#" + s.Titlebar.MessageTextColor.HTMLEncode());
				}
				var titleElem = $(this).find("ul.author_header_block li.title");
				if(s.Titlebar.TitleText != Styles.DEFAULT_STYLE){
					titleElem.text(s.Titlebar.TitleText);
				}
				if(s.Titlebar.TitleTextColor != Styles.DEFAULT_STYLE){
					titleElem.css("color", "#" + s.Titlebar.TitleTextColor.HTMLEncode());
				}
				var usernameElem = $(this).find("ul.author_header_block li.login > a");
				if(s.Titlebar.UsernameText != Styles.DEFAULT_STYLE){
					usernameElem.text(s.Titlebar.UsernameText);
				}
				if(s.Titlebar.UsernameTextColor != Styles.DEFAULT_STYLE){
					usernameElem.css("color", "#" + s.Titlebar.UsernameTextColor.HTMLEncode());
				}
				
				//Set avatar
				if(s.Avatar.Image != Styles.DEFAULT_STYLE){
					$(this).find("div.forumavatar img").attr("src", s.Avatar.Image.HTMLEncode());
				}
				if(s.Avatar.BorderStyle != Styles.DEFAULT_STYLE && s.Avatar.BorderColor != Styles.DEFAULT_STYLE){
					$(this).find("div.forumavatar img").css({width:"88px", height:"88px"}); //MUST be set if border style is set (screws up layout if not)
					$(this).find("div.forumavatar img").css("border", "1px " + s.Avatar.BorderStyle.HTMLEncode() + " #" + s.Avatar.BorderColor.HTMLEncode());
				}
				
				//Set post
				if(s.Post.BackgroundColor != Styles.DEFAULT_STYLE){
					$(this).css("background-color", "#" + s.Post.BackgroundColor.HTMLEncode());
				}
				if(s.Post.BackgroundGradientLeft != Styles.DEFAULT_STYLE && s.Post.BackgroundGradientRight != Styles.DEFAULT_STYLE){
					$(this).css("background-image", "-moz-linear-gradient(left, #" + s.Post.BackgroundGradientLeft.HTMLEncode() + ", #" + s.Post.BackgroundGradientRight.HTMLEncode());
				}
				if(s.Post.BackgroundImage != Styles.DEFAULT_STYLE){
					$(this).css("background-repeat", "repeat-y");
					$(this).css("background-size", "100% auto");
					$(this).css("background-image", "url(\"" + s.Post.BackgroundImage.HTMLEncode() + "\")");
				}
				if(s.Post.Font != Styles.DEFAULT_STYLE){
					$(this).find("div.postbody > p").css("font-family", s.Post.Font.HTMLEncode());
				}
				if(s.Post.FontColor != Styles.DEFAULT_STYLE){
					$(this).find("div.postbody > p").css("color", "#" + s.Post.FontColor.HTMLEncode());
				}
				if(s.Post.LinkColor != Styles.DEFAULT_STYLE){
					$(this).find("div.postbody > p a").css("color", "#" + s.Post.LinkColor.HTMLEncode());
				}
			
			});

			Cache.Save(); //Update LastHit
			
		}
		
		if(Client.GetKey(null) == null || Client.GetUsername(null) == null){
			return;
		}
		
		console.log("Getting forumItems");
		
		var forumItems = $("#ctl00_mainColPanel div.forum_item, div.forum_alt_item").find("div.forumpost li.login > a"); //This is good, also avoids deleted users!
		
		//Filter for cached items, removing those which are cached
		forumItems = forumItems.filter(function(){
			if(Cache.Exists($(this).text())){
				return false;
			}
			return true;
		});
		
		console.log("Finished filtering forum items");
		
		//Get the rest from the server
		if(forumItems.length >= 1){
		
			var usernames = []; //Array of string
			forumItems.each(function(){
				usernames.Add($(this).text()); //Add all of the usernames to the array
			});
			usernames = usernames.Distinct(); //Eliminate duplicates
		
			CoupDBungie.Server.GetStyles(Client.GetUsername(""), Client.GetKey(""), usernames,
				function(r){
					try{
						var obj = JSON.parse(r.responseText);
						if(obj.Status === 1){
							console.log("Request was successful");
							
							var users = []; //Array of user objects that will be added to the cache
							
							//Add users from server to the user array
							for(var i=0; i<obj.Users.length; i++){
								users.Add(new User(obj.Users[i].Username, obj.Users[i].Id, obj.Users[i].Styles, true));
							}
							
							//Check list of returned users against initial request list
							//Delete the ones that were returned, leaving the users who AREN'T coup users
							for(var i=0; i<users.length; i++){
								if(usernames.Contains(users[i].Username)){
									usernames.Delete(users[i].Username);
									continue;
								}
							}
							
							//Create user objects for users who AREN'T coup users and add them to the user array
							for(var i=0; i<usernames.length; i++){
								users.Add(new User(usernames[i], 0, null, false));
							}
							
							//Add all users to the cache
							for(var i=0; i<users.length; i++){
								Cache.Add(new Cache.Page(users[i]));
							}
							
							ApplyStyles();
							
						}
						else{
							console.log("GetStyles request completed, but... " + obj.Reason);
						}
					}
					catch(e){
						console.log("Error parsing response from GetStyles request" + e);
					}
				},
				function(r){
					console.log("Invalid GetStyles Request from server");
				},
				null
			);
			
		}
		else{
			ApplyStyles(); //This MUST be within the else block. DON'T put it under the if block
		}
		
	}

}


function Main(args){
	if(Client.IsSignedIn() && CoupDBungie.Initialise()){
		var url = location.href;
		if(/\/account\/profile\.aspx(#CoupDBungie5)?$/i.test(url)){
			MainFunctions.ClientProfilePage();
		}
		//else if(/account\/profile\.aspx?(memberID|userID)=\d+(#CoupDBungie5)?$/i.test(url)){
		//	MainFunctions.OtherUserProfilePage();
		//}
		else if(/\/(fanclub\/.+?\/)?forums\/posts\.aspx\?postID=\d+.*$/i.test(url)){
			MainFunctions.PostsPage();
		}
	}
}

Main();