// ==UserScript==
// @name			Coup d'Bungie 5 for Firefox
// @namespace		https://github.com/Shou-/Coup-5
// @description		Personlize your bungie.net experience
// @version	 		5.4.3
// @include			http*://*bungie.net/*
// @exclude			http*://*bungie.net/*createpost.aspx*
// @exclude			http*://*bungie.net/Account/Playtest/*
// @exclude			http*://*bungie.net/Account/Settings.aspx*
// @author			dazarobbo
// @copyright		2011, dazarobbo
// @contributor		Iggyhopper
// @contributor		Tidus Zero
// @contributor		DavidJCobb
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require			http://dohpaz.com/flydom/js/jquery.flydom-3.1.1.js
// @require			https://raw.github.com/Shou-/Coup-5/master/jquery.wheelcolorpicker.min.js
// @license			(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

//New Console
var Console = {
	Log:function(a){
		if(CoupDBungie.Debug){
			try{
				GM_log(a);
			} catch(e) {
				console.log(a);
			}
		}
	}
}

//New String members
String.HTMLEncode = function(a){
	return a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;");
}
String.prototype.HTMLEncode = function(){
	return String.HTMLEncode(this);
}

String.ToHex = function(s){
	s=s.toString().toLowerCase().replace(/[^a-f0-9]/g,"");
	if(s.length==3){
		s=s[0].concat(s[0],s[1],s[1],s[2],s[2]);
	}
	return parseInt(s,16);
}
String.prototype.ToHex = function(){
	return String.ToHex(this);
}


//New Number members
Number.prototype.HTMLEncode = function(){
	return String.HTMLEncode(this.toString());
}

Number.ToRGB = function(n){
	var r=(n&0xff0000)>>16;
	var g=(n&0x00ff00)>>8;
	var b=(n&0x0000ff);
	return {R:r,G:g,B:b}
}
Number.prototype.ToRGB = function(){
	return Number.ToRGB(this);
}


//New Array members
Array.Add = function(a, o){
	a.push(o);
}
Array.prototype.Add = function(o){
	Array.Add(this,o);
}

Array.Contains = function(a, o){
	var l=a.length;
	for(var i=0;i<l;i++){
		if(a[i]===o){
			return true;
		}
	}
	return false;
}
Array.prototype.Contains = function(o){
	return Array.Contains(this,o);
}

Array.DeleteAll = function(a, o){
	var r=false;
	for(var i=a.length-1;i>=0;i--){
		if(a[i]===o){
			a.splice(i,1);
			r=true;
		}
	}
	return r;
}
Array.prototype.DeleteAll = function(o){
	return Array.DeleteAll(this,o);
}

Array.Delete = function(a, o){
	var l=a.length;
	for(var i=0;i<l;i++){
		a.splice(i,1);
		return true;
	}
	return false;
}
Array.prototype.Delete = function(o){
	return Array.Delete(this,o);
}

Array.PickRandom = function(a){
	return a[Math.floor(Math.random()*a.length)];
}
Array.prototype.PickRandom = function(){
	return Array.PickRandom(this);
}

Array.Clear = function(a){
	a.length=0;
}
Array.prototype.Clear = function(){
	Array.Clear(this);
}

Array.Distinct = function(a){
	var h={};
	var r=[];
	var l=a.length;
	for(var i=0;i<l;++i){
		if(!h.hasOwnProperty(a[i])) {
			h[a[i]]=true;
			r.push(a[i]);
		}
	}
	return r;
}
Array.prototype.Distinct = function(){
	var r=Array.Distinct(this);
	var l=r.length;
	this.Clear();
	for(var i=l-1;i>=0;i--){
		this.Add(r[i]);
	}
}

Array.Filter = function(a, b){
	var l=b.length;
	for(var i=0;i<l;i++){
		a.DeleteAll(a[i]);
	}
}
Array.prototype.Filter = function(arr){
	Array.Filter(this,arr)
}

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};


//Browser: Revised 21st August, 2011
var Browser = {
	
	Memory:{
		Type:localStorage['coup5storagetype'],
		
		Set:function(name, value){
			Console.Log("Setting value (" + value + ") under name (" + name + ")");
			if(this.Type){
				try {
					GM_setValue(name, value);
				} catch(e) {
					alert('GreaseMonkey storage not supported by your userscript engine.');
				}
			} else {
				localStorage.setItem(name, value);
			}
			Console.Log("Finished setting value (" + value + ") under name (" + name + ")");
		},
		
		Get:function(name, defaultValue){
			Console.Log("Getting value named (" + name + ")");
			if(!this.Exists(name)){
				Console.Log(name + " was not found. Returning default value (" + defaultValue + ")");
				return defaultValue;
			}
			if(this.Type){
				try {
					var val = GM_getValue(name);
				} catch(e) {
					alert('GreaseMonkey storage not supported by your userscript engine.');
				}
			} else {
				var val = localStorage.getItem(name);
			}
			Console.Log("Found value named (" + name + "). Returning value (" + val + ")");
			return val;
		},
		
		Delete:function(name){
			Console.Log("Removing value named (" + name + ")");
			if(this.Type){
				try {
					GM_deleteValue(name);
				} catch(e) {
					alert('GreaseMonkey storage not supported by your userscript engine.');
				}
			} else {
				localStorage.removeItem(name);
			}
			Console.Log("Finished removing value named (" + name + ")");
		},
		
		Exists:function(name){
			Console.Log("Checking if value named (" + name + ") exists");
			if(this.Type){
				try {
					var temp = GM_listValues();
					var list = new Array();
				
					for(i = 0; i < temp.length; i++) {
						list[temp[i]] = true;
					}
					delete temp;
				} catch(e) {
					alert('GreaseMonkey storage not supported by your userscript engine.');
				}
			} else {
				var list = localStorage;
			}
			if(list[name]){
				Console.Log("Value named (" + name + ") exists");
				return true;
			}
			Console.Log("Value named (" + name + ") does not exist");
			return false;
		},
		
		DeleteAll:function(){
			Console.Log("Deleting all values");
			if(this.Type){
				try {
					var temp = GM_listValues();
				
					for(i = 0; i < temp.length; i++) {
						GM_deleteValue(temp[i]);
					}
				} catch(e) {
					alert('GreaseMonkey storage not supported by your userscript engine.');
				}
			} else {
				localStorage.clear();
			}
			Console.Log("Finished deleting all values");
		}
	},
	SupportsCoupDBungie:function(){
		Console.Log("Determining whether browser supports Coup d'Bungie");
		if(localStorage && XMLHttpRequest && JSON){
			Console.Log("Browser supports Coup d'Bungie 5");
			return true;
		}
		Console.Log("Browser does not support Coup d'Bungie 5");
		return false;
	},
	XHR:function(method, url, async, headers, onload, onerror, onreadystatechange){
		this._Init(method, url, async, headers, onload, onerror, onreadystatechange);
	},
	Type:{
		Type:function(){
			for(key in $.browser) return key;
		},
		ScriptUrl:function(){
			var browser = Browser.Type.Type();

			if(browser === "webkit") return "https://github.com/downloads/Shou-/Coup-5/Coup-5-Chrome.crx";
			else if(browser === "mozilla") return "https://github.com/Shou-/Coup-5/raw/master/coup-5.user.js";
			else if(browser === "opera") return "https://github.com/downloads/Shou-/Coup-5/Coup-5-Opera.zip";
		},
		Platform:function(){
			var browser = Browser.Type.Type();

			if(browser === "webkit") return "Google Chrome";
			else if(browser === "mozilla") return "Firefox";
			else if(browser === "opera") return "Opera";
		}
	}
}

Browser.XHR.prototype = {
	_Method:null,
	_Url:null,
	_Async:null,
	_DataType:null,
	_RequestHeaders:null,
	_OnLoad:null,
	_OnError:null,
	_OnReadyStateChange:null,
	_ReadyState:null,
	_Status:null,
	_ResponseHeaders:null,
	_ResponseText:null,

	_Init:function(method, url, async, datatype, headers, onload, onerror, onreadystatechange){
		_Method = method;
		_Url = url;
		_Async = async;
		_DataType = datatype;
		_RequestHeaders = headers;
		_OnLoad = onload ? onload : function(){};
		_OnError = onerror ? onerror : function(){};
		_OnReadyStateChange = onreadystatechange ? onreadystatechange : function(){};
	},

	Go:function(){

		var self = this;
		self.__OnLoad = _OnLoad;
		self.__OnError = _OnError;
		self.__OnReadyStateChange = _OnReadyStateChange;
		self.__Update = function(readyState, status, responseText){
		
			_ReadyState = readyState;
			_Status = status;
			_ResponseText = responseText;
		
			self.__OnReadyStateChange();
		
			if(_ReadyState == 4){
				if(_Status == 200){
					self.__OnLoad();
				}
				else{
					self.__OnError();
				}
			}
		
		}
		
		if(typeof GM_xmlhttpRequest == "function"){
		
			GM_xmlhttpRequest({
				method:_Method,
				url:_Url,
				synchronos:!_Async,
				header:_RequestHeaders,
				onload:function(response){
					//May need to add self.__Update here
				},
				onerror:function(response){
					//May need to add self.__Update here
				},
				onreadystatechange:function(response){
					self.__Update(response.readyState, response.status, response.responseText);
				}
			});
			
		}
		else if(typeof XMLHttpRequest == "function"){
		
			$.ajax({
				url: _Url,
				type: _Method,
				async: _Async,
				dataType: _DataType,
				success: function(data, textStatus, jqXHR){
					var response;

					if(jqXHR != undefined) response = jqXHR;
					else response = {
							readyState: 4,
							responseText: data,
							status: 200,
							responseXML: null
						};
					self.__Update(response.readyState, response.status, data);
				}
			});
		
		}
		else{
			throw new Error("XHR not available");
		}
	
	},
	GetResponseText:function(){
		return _ResponseText;
	},
	GetStatus:function(){
		return _Status;
	},
	GetReadyState:function(){
		return _ReadyState;
	},
	GetResponseHeaders:function(){
		return _ResponseHeaders;
	},
	GetResponseJSON:function(){
		if(typeof JSON != "undefined"){
			var obj = null;
			try{
				obj = JSON.parse(_ResponseText);
			}
			catch(e){
				if(typeof _ResponseText == "object"){
					obj = _ResponseText;
				}
			}
			return obj;
		}
		else{
			throw new Error("JSON not available");
		}
	},
	GetResponseXML:function(){
		return (new DOMParser()).parseFromString(_ResponseText, "text/xml");
	},
	GetMethod:function(){
		return _Method;
	},
	GetURL:function(){
		return _Url;
	},
	IsAsync:function(){
		return _Async;
	},
	WasAsync:function(){
		return IsAsync();
	},
	GetRequestHeaders:function(){
		return _RequestHeaders;
	}
}


//Options: Created 30th August, 2011
var Options = {
	Add:function(e, g, o, v){
		options = JSON.parse(Browser.Memory.Get(e, "{}"));
		options[g] = options[g] ? options[g] : {};
		options[g][o] = v;
		Browser.Memory.Set(e, JSON.stringify(options));
	},
	Get:function(e, g, o, f){
		options = JSON.parse(Browser.Memory.Get(e, "{}"));
		options[g] = options[g] != undefined ? options[g] : {};
		return options[g][o] != undefined ? options[g][o] : f;
	},
	Del:function(e, g, o){
		if(o) {
			options = JSON.parse(Browser.Memory.Get(e, "{}"));
			options[g] = options[g] ? options[g] : {};
			delete options[g][o];
			Console.Log('Deleting option: ' + o);
		} else {
			options = JSON.parse(Browser.Memory.Get(e, "{}"));
			delete options[g];
			Console.Log('Deleting group: ' + g);
		}
		Browser.Memory.Set(e, JSON.stringify(options));
	},
	Empty:function(e){
		Browser.Memory.Delete(e);
	}
}

//IgnoreSpawn: Created 14th October, 2011 (temporary placement)
function IgnoreSpawn(username){
	$("#coup5ignorespawn").remove();
	var elem = $("<div></div>");
	
	elem.attr({'id':'coup5ignorespawn', style:"height:0px; width:700px; margin:auto;"});
	elem.createAppend(
		"div", {style:{marginTop:"10%", position:"fixed", zIndex:9001}}, [
			"fieldset", {style:{backgroundColor:"rgba(0, 0, 0, 0.9)", border:"1px solid", padding:"5px"}}, [
				"legend", {style:{marginLeft:"5px", borderTop:"1px solid", borderLeft:"1px solid", borderRight:"1px solid", backgroundColor:"rgba(0, 0, 0, 0.9)"}}, [
					"b", null, "Ignore user: ",
					"span", {id:'coup5ignorespawnusername'}, username
				],
				"div", {style:{maxHeight:"450px", width:"700px", overflow:"auto"}, value:username}, [
					"div", {style:{display:"table-cell", width:"360px", padding:"5px", maxWidth:"50%"}}, [
						"table", null, [
							"tbody", null, [
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarUsernameText"}
									],
									"td", null, "Titlebar username text"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarUsernameTextColor"}
									],
									"td", null, "Titlebar username text color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarTitleText"}
									],
									"td", null, "Titlebar title text"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarTitleTextColor"}
									],
									"td", null, "Titlebar title text color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarMessageText"}
									],
									"td", null, "Titlebar message text"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarMessageTextColor"}
									],
									"td", null, "Titlebar message text color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarGroupText"}
									],
									"td", null, "Titlebar group text"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarGroupTextColor"}
									],
									"td", null, "Titlebar group text color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarBackgroundImage"}
									],
									"td", null, "Titlebar background image"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarBackgroundColor"}
									],
									"td", null, "Titlebar background color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarBackgroundGradient"}
									],
									"td", null, "Titlebar background gradient"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"TitlebarBorder"}
									],
									"td", null, "Titlebar border"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"AvatarImage"}
									],
									"td", null, "Avatar image"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"AvatarBorder"}
									],
									"td", null, "Avatar border"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostBackground1Image"}
									],
									"td", null, "Post background 1 image"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostBackground2Image"}
									],
									"td", null, "Post background 2 image"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostBackground3Image"}
									],
									"td", null, "Post background 3 image"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostBackgroundColor"}
									],
									"td", null, "Post background color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostBackgroundGradient"}
									],
									"td", null, "Post background gradient"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostFont"}
									],
									"td", null, "Post font"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostFontColor"}
									],
									"td", null, "Post font color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"PostLinkColor"}
									],
									"td", null, "Post link color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"QuoteBackgroundColor"}
									],
									"td", null, "Quote background color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"QuoteBorderColor"}
									],
									"td", null, "Quote border color"
								],
								"tr", null, [
									"td", null, [
										"input", {type:"checkbox", name:"QuoteFontColor"}
									],
									"td", null, "Quote font color"
								],
							]
						]
					],
					"div", {style:{display:"table-cell", width:"360px", padding:"5px", maxWidth:"50%"}}, [
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar background opacity:",
							"input", {type:"text", value:1, name:"TitlebarBackgroundOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar group text opacity",
							"input", {type:"text", value:1, name:"TitlebarGroupTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar message text opacity",
							"input", {type:"text", value:1, name:"TitlebarMessageTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar more text opacity",
							"input", {type:"text", value:1, name:"TitlebarMoreOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar title text opacity",
							"input", {type:"text", value:1, name:"TitlebarTitleTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Titlebar username text opacity",
							"input", {type:"text", value:1, name:"TitlebarUsernameTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Avatar opacity:",
							"input", {type:"text", value:1, name:"AvatarOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Post background 1 opacity:",
							"input", {type:"text", value:1, name:"PostBackground1ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Post background 2 opacity",
							"input", {type:"text", value:1, name:"PostBackground2ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Post background 3 opacity",
							"input", {type:"text", value:1, name:"PostBackground3ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Post text opacity",
							"input", {type:"text", value:1, name:"PostFontOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						],
						"div", {style:{height:"27px"}}, [
							"span", null, "Post link opacity",
							"input", {type:"text", value:1, name:"PostLinkOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
						]
					]
				],
				"div", null, [
					"input", {type:"button", value:"OK", onclick:function(){
						$("#coup5ignorespawn").remove();
					}}, null,
					"input", {type:"button", value:"All", onclick:function(){
						var ignoreList = Client.GetIgnoreList();
						$("#coup5ignorespawn input[type='checkbox']").each(function(){
							Options.Add('coup5ignorelist', username, $(this).attr('name'), false);
							$(this).attr('checked', false);
						});
						if(!ignoreList.Contains(username)) {
							ignoreList.push(username);
							Client.SetIgnoreList(ignoreList);
						}
					}}, null,
					"input", {type:"button", value:"Reset options", onclick:function(){
						var ignoreList = Client.GetIgnoreList();
						$("#coup5ignorespawn input[type='checkbox']").each(function(){
							$(this).attr('checked', true);
						});
						$("#coup5ignorespawn input[type='text']").each(function(){
							$(this).val(1);
						});
						Options.Del('coup5ignorelist', username);
						if(ignoreList.Contains(username)) {
							ignoreList.splice(ignoreList.indexOf(username), 1);
							Client.SetIgnoreList(ignoreList);
						}
					}}
				]
			]
		]
	);
	$("body").prepend(elem);
	$("#coup5ignorespawn input[type='checkbox']").each(function(){
		var name = $(this).attr('name');
		var jsonObj = JSON.parse(Options.Get('coup5ignorelist', username, name, true));
		$(this).attr('checked', jsonObj);
	});
	$("#coup5ignorespawn input[type='text']").each(function(){
		var name = $(this).attr('name');
		var jsonObj = JSON.parse(Options.Get('coup5ignorelist', username, name, 1.0));
		$(this).attr('value', jsonObj);
	});
}

//ReportSpawn: Created January 13, 2012
function ReportSpawn(username){
	$("#coup5reportspawn").remove();

	var elem = $("<div></div>");

	elem.attr({id:"coup5reportspawn", style:"height: 0px; width: 700px; margin: auto;"});
	elem.createAppend(
		"div", {style:{marginTop:"10%", position:"fixed", zIndex:9001}}, [
			"fieldset", {style:{backgroundColor:"rgba(0, 0, 0, 0.9)", border:"1px solid", padding:"5px", width:"700px", maxHeight:"450px"}}, [
				"legend", {style:{marginLeft:"5px", borderTop:"1px solid", borderLeft:"1px solid", borderRight:"1px solid", backgroundColor:"rgba(0, 0, 0, 0.9)"}}, [
					"b", null, "Report user: ",
					"span", {id:'coup5reportspawnusername'}, username
				],
				"a", {href:"javascript:;", style:{color:"red", cssFloat:"right"}, onclick:function(){ $(this).parent().parent().remove() }}, "X",
				"input", {placeholder:"Username", id:"coup5reportusernameinput", style:{display:"block"}}, null,
				"textarea", {placeholder:"Reason", id:"coup5reportreasoninput", style:{display:"block"}}, null,
				"input", {value:"Submit", type:"submit", style:{display:"block"}, onclick:function(){
						var subject = $("#coup5reportusernameinput").val();
						var reason = $("#coup5reportreasoninput").val();

						if(subject != "" && reason != ""){
							CoupDBungie.Server.Report(Client.GetUsername(""), Client.GetKey(""), subject, reason,
								function(){
									var obj = this.GetResponseJSON();
									if(obj != null){
										if(obj.Status === CoupDBungie.Server.Responses.OK){
											alert("Report was successful");
										}
										else{
											alert("The server said: " + obj.Reason);
										}
									}
									else{
										alert("JSON parsing failed.\n\nHTTP Status: " + this.GetStatus() + "\n\nBody: " + this.GetResponseText());
									}
								},
								function(){
									alert("HTTP Error.\n\nHTTP Status: " + this.GetStatus());
								},
								null
							);
						}
					}
				}, null
			]
		]
	);
	$("body").prepend(elem);
}

//SignatureLive: Modified January 13, 2012
function SignatureLive(){
	//IgnoreSpawn links click event
	$(".coup5ignorespawn").live('click', function(){
		var name = $(this).attr('name');
		
		IgnoreSpawn(name);
	});
	//End of IgnoreSpawn links click event

	//ReportSpawn links click event
	$(".coup5reportspawn").live('click', function(){
		var name = $(this).attr('name');

		ReportSpawn(name);
	});
	//End of ReportSpawn links click event
	
	//IgnoreList checkbox event
	$("#coup5ignorespawn input[type='checkbox']").live('click', function(){
		var username = $("#coup5ignorespawnusername").text();
		var ignoreList = Client.GetIgnoreList();
		if($(this).is(':checked')){
			Options.Add('coup5ignorelist', username, $(this).attr('name'), true);
		}
		else{
			Options.Add('coup5ignorelist', username, $(this).attr('name'), false);
		}
		if($("#coup5ignorespawn input[type='checkbox']:not(:checked)").length == $("#coup5ignorespawn input[type='checkbox']").length){
			ignoreList.push(username);
			Client.SetIgnoreList(ignoreList);
		}
		else{
			if(ignoreList.Contains(username)) {
				ignoreList.splice(ignoreList.indexOf(username), 1);
				Client.SetIgnoreList(ignoreList);
			}
		}
	});
	//End IgnoreList checkbox event
	
	//IgnoreList text input event
	$("#coup5ignorespawn input[type='text']").live('blur', function(){
		var username = $("#coup5ignorespawnusername").text();
		Options.Add('coup5ignorelist', username, $(this).attr('name'), parseFloat($(this).val()));
	});
	//End IgnoreList text input event
}

//CoupDBungie: Revised 21st August, 2011
var CoupDBungie = {
	
	Debug:false,
	
	Version:"5.4.3",
	Platform:Browser.Type.Platform(),
	Author:"dazarobbo",
	AuthorMemberID:2758679,
	
	Server:{
		
		Hosts:[
			"http://coup-srv-01.heliohost.org/",
		],
		Path:"API/",
		Method:"GET",
		Responses:{
			OK:1,
			Error:2
		},
		
		CreateDefaultXHR:function(path, onload, onerror, onreadystatechange){
			Console.Log("Creating default XHR object");
            // The "json" string needs to be replaced with "jsonp" for XHR to work in Opera.
			return new Browser.XHR(this.Method, this.Hosts[0] + this.Path + ((path) ? path : ""), true, "json", null, onload, onerror, onreadystatechange);
		},
		Register:function(username, memberID, type, onload, onerror, onreadystatechange){
			if(!type) var path = "Services/Users/Register?";
			else var path = "Services/Users/FetchKey?";
			if(username != null){
				path += "username=" + User.EncodeUsername(username);
			}
			else if(memberID != null){
				path += "memberID=" + memberID;
			}
			var xhr = this.CreateDefaultXHR(path, onload, onerror, onreadystatechange);
			Console.Log("Making a Register request to (" + xhr.GetURL() + ")");
			xhr.Go();
		},
		Report:function(username, key, subject, reason, onload, onerror, onreadystatechange){
			var path = "Services/Users/Report?username=" + User.EncodeUsername(username) + "&key=" + key + "&subject=" + User.EncodeUsername(subject) + "&reason=" + encodeURIComponent(reason);
			var xhr = this.CreateDefaultXHR(path, onload, onerror, onreadystatechange);
			Console.Log("Making a Report request to (" + xhr.GetURL() + ")");
			xhr.Go();
		},
		GetStyles:function(usernames, onload, onerror, onreadystatechange){
			var path = "Services/Styles/GetStyles?users=" + User.EncodeUsernameArray(usernames).join(",");
			var xhr = this.CreateDefaultXHR(path, onload, onerror, onreadystatechange);
			Console.Log("Making a GetStyles request to (" + xhr.GetURL() + ")");
			xhr.Go();
		},
		PublishStyles:function(username, key, styles, onload, onerror, onreadystatechange){
			var path = "Services/Styles/PublishStyles?username=" + User.EncodeUsername(username) + "&key=" + key + styles.ToPublishString();
			var xhr = this.CreateDefaultXHR(path, onload, onerror, onreadystatechange);
			Console.Log("Making a PublishStyles request to (" + xhr.url + ")");
			xhr.Go();
		},
		GetFeaturedStyles:function(onload, onerror, onreadystatechange){
			//To add
		},
		GetStyleHistory:function(username, key, onload, onerror, onreadystatechange){
			//To add
		}
	},
	CheckForUpdate:function(){
		var lastCheck = Browser.Memory.Get("Coup5UpdateCheck", 0.0);
		var currentTime = (new Date()).getTime();
		var CurrentVersion = CoupDBungie.Version;
		var LatestVersion;

		if(currentTime > lastCheck + (3600 * 24)){
			var xhr = new Browser.XHR(
				"GET",
				"http://shou.dyndns-server.com/hak_the_planet/version.json",
				true,
				"json",
				null,
				function(){
					var obj = this.GetResponseJSON();
					if(obj != null){
						LatestVersion = obj.Version;
						Reason = obj.Reason;
						if(LatestVersion > CurrentVersion){
							var userConfirm = confirm("You are using Coup-5 version " + CurrentVersion + ", and an update to version " + LatestVersion + " is available.\nReason: " + Reason + "\n\nWould you like to update?");

							if(userConfirm){
								window.open(Browser.Type.ScriptUrl(), "_blank");
							}
						}
					}
				},
				function(){
					Console.Log("Error loading LatestVersion document.");
				},
				null
			);
			xhr.Go();

			Browser.Memory.Set("Coup5UpdateCheck", currentTime);
		}
	},
	
	Initialise:function(){
		if(Browser.SupportsCoupDBungie()){
			Cache.Initialise();
			//Other components (if they exist) should be initialised here as well
			return true;
		}
		else{
			throw new this.CoupDBungie5Exception("Browser cannot support this version of Coup d'Bungie 5");
		}
	},
	
	CoupDBungie5Exception:function(message){
		throw new Error(message ? message : "", "CoupDBungie5Exception");
	}

}


//Cache: Revised 22nd August, 2011
var Cache = {

	CACHE_NAME:"Coup5Cache",
	LAST_CACHE_DUMP_NAME:"Coup5Cache_LastDump",
	LAST_CACHE_DUMP:null,
	CACHE_INTERVAL_RATE:5, //Measured in minutes per hour (so for 20 mins, three cache dumps per hour)
	MAX_PAGES:200,
	WorkingSet:[],
	
	Initialise:function(){
		Console.Log("Initialising cache");
		this.Load();
		this.Management();
		Console.Log("Finished initialising cache");
	},
	
	Load:function(){
		try{
			this.WorkingSet = JSON.parse(Browser.Memory.Get(this.CACHE_NAME, undefined));
			Console.Log("Cache loaded successfully");
		}
		catch(e){
			Console.Log("An error occurred while loading the cache (" + e + "). Cache will now be deleted");
			Browser.Memory.Delete(this.CACHE_NAME); //Assume the cache variable is corrupt, so delete it
			this.WorkingSet = []; //... and set the local copy to an empty array (hard restart)
		}
		try{
			this.LAST_CACHE_DUMP = new Date(JSON.parse(Browser.Memory.Get(this.LAST_CACHE_DUMP_NAME, undefined)));
			Console.Log("Last cache dump time loaded");
		}
		catch(e){
			Browser.Memory.Delete(this.LAST_CACHE_DUMP_NAME);
			this.LAST_CACHE_DUMP = new Date();
			this.LAST_CACHE_DUMP.setTime(0);
		}
	},
	Save:function(){
		Console.Log("Saving cache");
		try{
			Browser.Memory.Set(this.CACHE_NAME, JSON.stringify(this.WorkingSet));
			Browser.Memory.Set(this.LAST_CACHE_DUMP_NAME, JSON.stringify(this.LAST_CACHE_DUMP));
			Console.Log("Cache saved successfully");
		}
		catch(e){
			Console.Log("Cache failed to save - reason: (" + e + ")");
		}
	},
	
	Management:function(){
	
		Console.Log("Performing cache management");
	
		function _DetermineInterval(date, rate){
			return Math.floor(date.getMinutes() / rate);
		}
	
		var now = new Date();
		if(	now.getFullYear() == this.LAST_CACHE_DUMP.getFullYear() &&
			now.getMonth() == this.LAST_CACHE_DUMP.getMonth() &&
			now.getDate() == this.LAST_CACHE_DUMP.getDate() &&
			now.getHours() == this.LAST_CACHE_DUMP.getHours() ){

			if(_DetermineInterval(now, this.CACHE_INTERVAL_RATE) > _DetermineInterval(this.LAST_CACHE_DUMP, this.CACHE_INTERVAL_RATE)){
				this.DeleteAll();
				Console.Log("Dumping cache");
				this.LAST_CACHE_DUMP = new Date();
			}
		}
		else if(now > this.LAST_CACHE_DUMP){
			this.LAST_CACHE_DUMP = new Date();
		}
		
		while(this.WorkingSet && this.WorkingSet.length > this.MAX_PAGES){
			this.WorkingSet.Delete(this.WorkingSet.PickRandom());
		}
		
		this.Save();
		
		Console.Log("Finished cache management");
		
	},
	
	Add:function(page){
		Console.Log("Adding page to working set");
		var existingPage = this.Get(page.Data.Username);
		if(existingPage != null){
			Console.Log("Found an existing page");
			existingPage = page;
			Console.Log("Page replaced");
		}
		else{
			this.WorkingSet.Add(page);
			Console.Log("Page added");
		}
	},
	Exists:function(username){
		Console.Log("Checking is page exists for (" + username + ")");
		if(this.Get(username) != null){
			Console.Log("Page exists for (" + username + ")");
			return true;
		}
		Console.Log("Page doesn't exist for (" + username + ")");
		return false;
	},
	Get:function(username){
		Console.Log("Getting page for (" + username + ")");
		for(var i=0; i<this.WorkingSet.length; i++){
			if(this.WorkingSet[i].Data.Username == username){
				this.WorkingSet[i].LastHit = new Date();
				return this.WorkingSet[i];
			}
		}
		Console.Log("Couldn't find a page for (" + username + ")");
		return null;
	},
	Delete:function(page){
		Console.Log("Removing page");
		this.WorkingSet.Delete(page);
	},
	DeleteAll:function(){
		this.WorkingSet.Clear();
	},
	
	Page:function(user){
		Console.Log("Creating a new cache page");
		this.Data = user;
		this.Date = new Date();
		this.LastHit = null;
		Console.Log("Finished creating a new cache page");
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
		var to_send = "";
		var this_default = Styles.DEFAULT_STYLE;
		for(var s in this){
			if(typeof this[s] !== "function"){
				this_default = (s in Styles.SPECIAL_DEFAULTS) ? Styles.SPECIAL_DEFAULTS[s] : Styles.DEFAULT_STYLE ;
				to_send = this[s] != undefined ? this[s] : this_default;
				//if (to_send == "" && !(s in Styles.ALLOW_BLANK))
				//	to_send = this_default;
				if (to_send == "")
					to_send = this_default;
				str += "&" + s + "=" + encodeURIComponent(to_send);
			}
		}
		return str;
	}
	this.MapOldToNew = function(prop, val){ // added by DavidJCobb but IIRC I never used it
		for(var i in Styles.MAPPINGS){
			if(Styles.MAPPINGS[i][0].match(prop)){
				var new_prop = prop.replace(Styles.MAPPINGS[i][0], Styles.MAPPINGS[i][1]);
				this[new_prop] = val;
				return true
			}
		}
		return false
	}
        this.SetStyleValue = function(prop, val){ // added by DavidJCobb but IIRC I never used it
		if (!this.MapOldToNew(prop, val))
			this[prop] = val
	}
	
	this.TitlebarUsernameText = undefined;
	this.TitlebarUsernameTextColor = undefined;
	this.TitlebarUsernameTextOpacity = undefined;

	this.TitlebarTitleText = undefined;
	this.TitlebarTitleTextColor = undefined;
	this.TitlebarTitleTextOpacity = undefined;

	this.TitlebarMessageText = undefined;
	this.TitlebarMessageTextColor = undefined;
	this.TitlebarMessageTextOpacity = undefined;

	this.TitlebarGroupText = undefined;
	this.TitlebarGroupTextColor = undefined;
	this.TitlebarGroupTextOpacity = undefined;

	this.TitlebarBackgroundImage = undefined;
	this.TitlebarBackgroundOpacity = undefined;
	this.TitlebarBackgroundColor = undefined;
	this.TitlebarBackgroundGradientLeft = undefined;
	this.TitlebarBackgroundGradientRight = undefined;

	this.TitlebarBorderStyle = undefined;
	this.TitlebarBorderColor = undefined;

	this.TitlebarMoreOpacity = undefined;

	this.AvatarImage = undefined;
	this.AvatarOpacity = undefined;
	this.AvatarBorderStyle = undefined;
	this.AvatarBorderColor = undefined;

	this.PostBackgroundColor = undefined;
	this.PostBackgroundGradientLeft = undefined;
	this.PostBackgroundGradientRight = undefined;

	this.PostBackground1Image = undefined;
	this.PostBacground1ImageOpacity = undefined;	// to account for a server-side typo
	this.PostBackground1ImageOpacity = undefined;
	this.PostBackground1ImageRepeat = undefined;
	this.PostBackground1ImageAttachment = undefined;
	this.PostBackground1ImagePosition = undefined;

	this.PostBackground2Image = undefined;
	this.PostBackground2ImageOpacity = undefined;
	this.PostBackground2ImageRepeat = undefined;
	this.PostBackground2ImageAttachment = undefined;
	this.PostBackground2ImagePosition = undefined;

	this.PostBackground3Image = undefined;
	this.PostBackground3ImageOpacity = undefined;
	this.PostBackground3ImageRepeat = undefined;
	this.PostBackground3ImageAttachment = undefined;
	this.PostBackground3ImagePosition = undefined;

	this.PostFont = undefined;
	this.PostFontColor = undefined;
	this.PostFontOpacity = undefined;

	this.PostLinkColor = undefined;
	this.PostLinkOpacity = undefined;

	this.QuoteBorderColor = undefined;
	this.QuoteFontColor = undefined;
	this.QuoteBackgroundColor = undefined;
	
}
Styles.DEFAULT_STYLE = "*";
Styles.MAPPINGS =
   {
      "single background to multi background": [ /^PostBackground([a-zA-Z]*)$/ , "PostBackground1$1" ],
      "background opacity to background-image opacity": [ /^PostBackground(\d+)Opacity$/ , "PostBackground$1ImageOpacity" ]
   };
Styles.ALLOW_BLANK =
	{
		"TitlebarUsernameText": 1,
		"TitlebarTitleText": 1,
		"TitlebarMessageText": 1,
		"TitlebarGroupText": 1
	};
Styles.SPECIAL_DEFAULTS =
	{
		"TitlebarUsernameTextOpacity": 1,
		"TitlebarTitleTextOpacity": 1,
		"TitlebarMessageTextOpacity": 1,
		"TitlebarGroupTextOpacity": 1,
		"TitlebarBackgroundOpacity": 1,
		"TitlebarMoreOpacity": 1,
		"PostBackground1ImageOpacity": 1,
		"PostBackground2ImageOpacity": 1,
		"PostBackground3ImageOpacity": 1,
		"PostFontOpacity": 1,
		"PostLinkOpacity": 1
	};

//Client: Good (28th June, 2011)
var Client = {

	KEY_NAME:"coup5key",
	IGNORE_LIST_NAME:"coup5ignore",

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
		var obj, key;
		var str = Browser.Memory.Get(this.KEY_NAME, defaultVal);

		try{
			obj = JSON.parse(str);
			key = obj[this.GetUsername("")]
			if(key == undefined) key = defaultVal;
		}
		catch(e){
			var temp = str;
			key = str;
			this.SetKey(key);
		}

		return key;
	},
	SetKey:function(keyValue){
		var obj, sobj;
		var str = Browser.Memory.Get(this.KEY_NAME, "");

		try{
			obj = JSON.parse(str);
		}
		catch(e){
			obj = {}
		}

		obj[this.GetUsername("")] = keyValue;
		sobj = JSON.stringify(obj);

		Browser.Memory.Set(this.KEY_NAME, sobj);
	},
	GetIgnoreList:function(defaultVal){
		var jsonStr = Browser.Memory.Get(this.IGNORE_LIST_NAME, null);
		var jsonObj = [];
		if(jsonStr != null){
			try{
				jsonObj = JSON.parse(jsonStr);
			}
			catch(e){}
		}
		return jsonObj;
	},
	SetIgnoreList:function(list){
		Browser.Memory.Set(this.IGNORE_LIST_NAME, JSON.stringify(Array.Distinct(list)));
	}

}


//MainFunctions: Good, could use a tidyup/optimising though (28th June, 2011)
var MainFunctions = {
	
	ApplyStylesToElement:function(styles, element){
	
		//element should be a div.forum_item, but will probably work with div.forum_alt_item as well
		
		var rgb;
		var rgb2;
		var usernameElem = $(element).find("ul.author_header_block li.login > a");
		temp = JSON.parse(Browser.Memory.Get('coup5options', "{}"));
		var ocheckbox = temp['checkbox'] != undefined ? temp['checkbox'] : {};
		temp = JSON.parse(Browser.Memory.Get('coup5options', "{}"));
		var otext = temp['text'] != undefined ? temp['text'] : {};
		temp = JSON.parse(Browser.Memory.Get('coup5ignorelist', "{}"));
		var icheckbox = temp[usernameElem.text()] != undefined ? temp[usernameElem.text()] : {};
		delete(temp);
		var checked = 'checked="checked"';

		var NotDefault = function(a) { return a && a != Styles.DEFAULT_STYLE };
		var ShouldDo = function(a) { return NotDefault(styles[a]) && ocheckbox[a] != checked && ignoreValueExists(a) };

		var NormalizeOpacity =
			function(prop, multi_prop) {
				if(Options.Get('coup5ignorelist', usernameElem.text(), (multi_prop || prop), undefined) != undefined) {
					styles[prop] = Options.Get('coup5ignorelist', usernameElem.text(), (multi_prop || prop), 1.0);
				}
				styles[prop] = Math.min( parseFloat(styles[prop]), Options.Get('coup5options', 'text', (multi_prop || prop), 1.0) );
			};

		//Apply gradient for Chrome, Firefox and Opera
		var ApplyGradient =
			function(elem, rgb, rgb2, a){
				elem.css("background-image", "-moz-linear-gradient(left, rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + a + "), rgba(" + rgb2.R + "," + rgb2.G + "," + rgb2.B + "," + a + "))");
				elem.css("background-image", "-webkit-linear-gradient(left, rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + a + "), rgba(" + rgb2.R + "," + rgb2.G + "," + rgb2.B + "," + a + "))");
				elem.css("background-image", "-o-linear-gradient(left, rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + a + "), rgba(" + rgb2.R + "," + rgb2.G + "," + rgb2.B + "," + a + "))");
			};

		NormalizeOpacity("TitlebarUsernameTextOpacity");
		NormalizeOpacity("TitlebarTitleTextOpacity");
		NormalizeOpacity("TitlebarMessageTextOpacity");
		NormalizeOpacity("TitlebarGroupTextOpacity");
		NormalizeOpacity("TitlebarBackgroundOpacity");
		NormalizeOpacity("TitlebarMoreOpacity");
		NormalizeOpacity("AvatarOpacity");
		NormalizeOpacity("PostBackground1ImageOpacity");
		NormalizeOpacity("PostBackground2ImageOpacity");
		NormalizeOpacity("PostBackground3ImageOpacity");
		NormalizeOpacity("PostFontOpacity");
		NormalizeOpacity("PostLinkOpacity");

		function ignoreValueExists(o){
			if(icheckbox[o] != undefined){
				return icheckbox[o];
			} else {
				return true;
			}
		}

		try {
			defaultTitlebarColor = /background-color\:\s*((\S|\s)*?)\;/i.exec($(element).find("ul.author_header_block").attr('style'))[1];
		} catch(e) {
			defaultTitlebarColor = '#27282C';
		}
		//Set titlebar
		var titlebar = $(element).find("ul.author_header_block");
		if (ShouldDo("TitlebarBackgroundColor")) {
			rgb = styles.TitlebarBackgroundColor.ToHex().ToRGB();
			$(titlebar).css("background-color", "rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + styles.TitlebarBackgroundOpacity + ")");
		} else {
			$(titlebar).css('background-color', defaultTitlebarColor);
		}
		if(ShouldDo("TitlebarBackgroundGradientLeft") && ShouldDo("TitlebarBackgroundGradientRight")){
			rgb = styles.TitlebarBackgroundGradientLeft.ToHex().ToRGB();
			rgb2 = styles.TitlebarBackgroundGradientRight.ToHex().ToRGB();
			alpha = styles.TitlebarBackgroundOpacity;
			ApplyGradient($(titlebar), rgb, rgb2, alpha);
		}
		if(ShouldDo("TitlebarBackgroundImage")){
			$(titlebar).css("background-image", "url(\"" + styles.TitlebarBackgroundImage.HTMLEncode() + "\")");
		}
		if(ShouldDo("TitlebarBorderColor") && ShouldDo("TitlebarBorderStyle") && ocheckbox['TitlebarBorder'] != checked && ignoreValueExists('TitlebarBorder')){
			$(titlebar).css("border-color", "#" + styles.TitlebarBorderColor.HTMLEncode());
			$(titlebar).css("border-style", styles.TitlebarBorderStyle.HTMLEncode());
			$(titlebar).css("border-width", "1px");
		}

		//Set more text
		var moreElem = $(element).find("ul.author_header_block li.author_header_links:contains('more')");
		moreElem.css("opacity", styles.TitlebarMoreOpacity);

		//Set group text
		var groupElem = $(element).find("ul.author_header_block li.author_header_links > a:contains('groups')");
		groupElem.css("opacity", styles.TitlebarGroupTextOpacity);
		if(ShouldDo("TitlebarGroupText")){
			groupElem.text(styles.TitlebarGroupText);
		}
		if(ShouldDo("TitlebarGroupTextColor")){
			groupElem.css("color", "#" + styles.TitlebarGroupTextColor.HTMLEncode());
		}

		//Set message text
		var msgElem = $(element).find("ul.author_header_block li.author_header_links > a:contains('message user')");
		msgElem.css("opacity", styles.TitlebarMessageTextOpacity);
		if(ShouldDo("TitlebarMessageText")){
			msgElem.text(styles.TitlebarMessageText);
		}
		if(ShouldDo("TitlebarMessageTextColor")){
			msgElem.css("color", "#" + styles.TitlebarMessageTextColor.HTMLEncode());
		}

		//Set title text
		var titleElem = $(element).find("ul.author_header_block li.title");
		titleElem.css("opacity", styles.TitlebarTitleTextOpacity);
		if(ShouldDo("TitlebarTitleText")){
			titleElem.text(styles.TitlebarTitleText);
		}
		if(ShouldDo("TitlebarTitleTextColor")){
			titleElem.css("color", "#" + styles.TitlebarTitleTextColor.HTMLEncode());
		}
		$(element).find("div.forumavatar img, ul.author_header_block li.login > a").attr('title', usernameElem.text());
		usernameElem.css("opacity", styles.TitlebarUsernameTextOpacity);
		if(ShouldDo("TitlebarUsernameText")){
			usernameElem.text(styles.TitlebarUsernameText);
		}
		if(ShouldDo("TitlebarUsernameTextColor")){
			usernameElem.css("color", "#" + styles.TitlebarUsernameTextColor.HTMLEncode());
		}

		//Set avatar
		$(element).find("div.forumavatar img").css("opacity", styles.AvatarOpacity);
		if(ShouldDo("AvatarImage")){
			$(element).find("div.forumavatar img").attr("src", styles.AvatarImage.HTMLEncode());
		}
		if(ShouldDo("AvatarBorderStyle") && ShouldDo("AvatarBorderColor") && ocheckbox['AvatarBorder'] != checked && ignoreValueExists('AvatarBorder')){
			$(element).find("div.forumavatar img").css({width:"88px", height:"88px"}); //MUST be set if border style is set (screws up layout if not)
			$(element).find("div.forumavatar img").css("border", "1px " + styles.AvatarBorderStyle.HTMLEncode() + " #" + styles.AvatarBorderColor.HTMLEncode()); 
		}

		//Set post
		$(element).css({backgroundColor:"transparent", position:"relative"});
		var bg_div_options = {style:{opacity:"", position:"absolute", top:0, left:0, width:"670px", height:"100%"}};
		$(element).parent().createPrepend("div", $.extend({class:"coup-5-background-1"},bg_div_options));
		$(element).parent().createPrepend("div", $.extend(bg_div_options, {class:"coup-5-background-2", opacity:styles.PostBackground2ImageOpacity}));
		$(element).parent().createPrepend("div", $.extend(bg_div_options, {class:"coup-5-background-3", opacity:styles.PostBackground1ImageOpacity}));
		var postBg = $(element).parent().find("div.coup-5-background-1");
		var postBg2 = $(element).parent().find("div.coup-5-background-2");
		var postBg3 = $(element).parent().find("div.coup-5-background-3");
		try {
			if(preview_) {
				temp = $("<span></span>");
				postBg = temp.createPrepend("div", $.extend(bg_div_options, {class:"coup-5-background-1", opacity:styles.PostBackground1ImageOpacity}));
				postBg2 = temp.createPrepend("div", $.extend(bg_div_options, {class:"coup-5-background-2", opacity:styles.PostBackground2ImageOpacity}));
				postBg3 = temp.createPrepend("div", $.extend(bg_div_options, {class:"coup-5-background-3", opacity:styles.PostBackground3ImageOpacity}));
			}
		} catch(e) {}
		
		if(ShouldDo("PostBackgroundColor")){
			rgb = styles.PostBackgroundColor.ToHex().ToRGB();
			$(postBg3).css("background-color", "rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + styles.PostBackground3ImageOpacity + ")");
		}
		
		if(ShouldDo("PostBackgroundGradientLeft") && ShouldDo("PostBackgroundGradientRight")){
			rgb = styles.PostBackgroundGradientLeft.ToHex().ToRGB();
			rgb2 = styles.PostBackgroundGradientRight.ToHex().ToRGB();
			alpha = styles.PostBackground3ImageOpacity
			ApplyGradient($(postBg3), rgb, rgb2, alpha);
			$(postBg3).css("opacity", styles.PostBackground3ImageOpacity);
		}
		if(ShouldDo("PostBackground1Image")){
			$(postBg).css("opacity", styles.PostBackground1ImageOpacity);
			$(postBg).css("background-repeat", styles.PostBackground1ImageRepeat != Styles.DEFAULT_STYLE ? styles.PostBackground1ImageRepeat : "repeat");
			$(postBg).css("background-position", styles.PostBackground1ImagePosition != Styles.DEFAULT_STYLE ? styles.PostBackground1ImagePosition : "0% 0%");
			$(postBg).css("background-attachment", styles.PostBackground1ImageAttachment != Styles.DEFAULT_STYLE ? styles.PostBackground1ImageAttachment : "scroll");
			$(postBg).css("background-image", "url(\"" + styles.PostBackground1Image.HTMLEncode() + "\")");
		}
		if(ShouldDo("PostBackground2Image")){
			$(postBg2).css("opacity", styles.PostBackground2ImageOpacity);
			$(postBg2).css("background-repeat", styles.PostBackground2ImageRepeat != Styles.DEFAULT_STYLE ? styles.PostBackground2ImageRepeat : "repeat");
			$(postBg2).css("background-position", styles.PostBackground2ImagePosition != Styles.DEFAULT_STYLE ? styles.PostBackground2ImagePosition : "0% 0%");
			$(postBg2).css("background-attachment", styles.PostBackground2ImageAttachment != Styles.DEFAULT_STYLE ? styles.PostBackground2ImageAttachment : "scroll");
			$(postBg2).css("background-image", "url(\"" + styles.PostBackground2Image.HTMLEncode() + "\")");
		}
		if(ShouldDo("PostBackground3Image")){
			$(postBg3).css("opacity", styles.PostBackground3ImageOpacity);
			$(postBg3).css("background-repeat", styles.PostBackground3ImageRepeat != Styles.DEFAULT_STYLE ? styles.PostBackground3ImageRepeat : "repeat");
			$(postBg3).css("background-position", styles.PostBackground3ImagePosition != Styles.DEFAULT_STYLE ? styles.PostBackground3ImagePosition : "0% 0%");
			$(postBg3).css("background-attachment", styles.PostBackground3ImageAttachment != Styles.DEFAULT_STYLE ? styles.PostBackground3ImageAttachment : "scroll");
			$(postBg3).css("background-image", "url(\"" + styles.PostBackground3Image.HTMLEncode() + "\")");
		}

		//Set quote blocks
		var quoteElem = $(element).find("span.IBBquotedtable");
		if(ShouldDo("QuoteBackgroundColor")){
			quoteElem.css("background-color", '#' + styles.QuoteBackgroundColor);
		}
		if(ShouldDo("QuoteBorderColor")){
			quoteElem.css("border-color", '#' + styles.QuoteBorderColor);
		}
		if(ShouldDo("QuoteFontColor")){
			quoteElem.css("color", '#' + styles.QuoteFontColor);
		}

		//Set post text
		if(ShouldDo("PostFont")){
			$(element).find("div.postbody > p").css("font-family", styles.PostFont.HTMLEncode());
		}
		if(ShouldDo("PostFontColor")){
			$(element).find("div.postbody > p").css("color", "#" + styles.PostFontColor.HTMLEncode());
		}
		if(ShouldDo("PostFontOpacity")){
			$(element).find("div.postbody > p").css("opacity", styles.PostFontOpacity);
		}
		if(ShouldDo("PostLinkColor")){
			rgb = styles.PostLinkColor.ToHex().ToRGB();
			$(element).find("div.postbody > p a").css("color", "rgba(" + rgb.R + "," + rgb.G + "," + rgb.B + "," + styles.PostLinkOpacity + ")");
		}

		try {
			if(preview_) {
				temp.append(element);
				return temp;
			}
		} catch(e) {
			return element;
		}
		
	},
	
	GenerateStylePreview:function(styles){
	
		var preview = "#PublishSettingsPreviewBox"
		$(preview).createAppend(
			"div", {className:"forum_item"}, [
				"div", {className:"forum_item_outer_shell"}, [
					"div", null, [
						"span", null, [
							"a", null, null,
							"div", {className:"forumpost"}, [
								"div", {className:"clear"}, null,
								"div", {className:"forumavatar"}, [
									"a", null, [
										"img", {style:{height:"90px", width:"90px", borderWidth:"0px"}, src:"/Forums/skins/default/avatars/default_avatar.gif"}, null
									]
								],
								"div", {className:"postbody"}, [
									"ul", {style:{backgroundColor:"#4C4C4C"}, className:"author_header_block"}, [
										"li", {className:"login"}, [
											"a", {href:"/Account/Profile.aspx"}, styles.TitlebarUsernameText != Styles.DEFAULT_STYLE ? styles.TitlebarUsernameText : "Username",
										],
										"li", null, "&nbsp;|&nbsp;",
										"li", {className:"title"}, "Member",
										"li", {className:"author_header_links"}, [
											"a", {className:"expanded_arrows_collapsed"}, [
												"img", {style:{width:"21px", height:"20px"}, src:"/images/spacer.gif"}
											]
										],
										"li", {className:"author_header_links"}, "&nbsp;|&nbsp;more&nbsp;",
										"li", {className:"author_header_links"}, [
											"a", {href:"/account/profile.aspx?page=Chapters"}, "groups"
										],
										"li", {className:"author_header_links"}, "&nbsp;|&nbsp;",
										"li", {className:"author_header_links"}, [
											"a", {href:"/account/profile.aspx?page=Messages"}, "message user"
										]
									],
									"div", {className:"floatingprofile"}, [
										"ul", {className:"leftside"}, [
											"li", null, [
												"span", null, "gamertag:",
												"a", {href:"http://xbox.com/"}, "Xbox LIVE"
											],
											"li", null, [
												"span", null, "user homepage:",
												"a", {target:"_blank", href:"/", title:"/"}, [
													"img", {width:"11px", height:"13px", alt:"external", className:"external_link_arrow", src:"/images/spacer.gif"}
												]
											]
										],
										"ul", {className:"rightside"}, [
											"li", null, [
												"a", {href:"/"}, "more posts by this user"
											],
											"li", null, "last post: 77.77.7777 7:77 PM PDT"
										],
										"div", {className:"signature"}, [
											"p", null, [
												"span", null, "Signature content"
											]
										]
									],
									"p", {style:'margin:0px 0px 1em;'}, "<span class=\"IBBquotedtable\">Lorem ipsum dolor sit amet, <a href=\"javascript:;\">consectetur</a> adipiscing <b>elit</b>.</span>Curabitur condimentum, est et <i>aliquet</i> adipiscing, sem felis fermentum turpis, sed <u>tincidunt</u> erat nulla vel nisl. <a href=\"javascript:;\">Aliquam</a> tristique interdum tempor. Sed commodo ipsum a odio laoreet eleifend eleifend nisl auctor. Donec molestie scelerisque orci suscipit volutpat."
								],
								"div", {className:"post-actions"}, [
									"ul", null, [
										"li", {className:"date"}, "07.07.7777 7:07 PM PDT",
										"li", {style:{cssFloat:"right"}}, [
											"a", {href:"javascript:;", className:"forum_post_reply_button"}, [
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
		);
		
		return MainFunctions.ApplyStylesToElement(styles, $(preview).find(".forumpost:first"), preview_=true);
	},
	
	ClientProfilePage:function(){
		
		$("#ctl00_mainContent_profilePanel").createAppend(
			"div", {className:"boxD_outer", id:"CoupDBungie5", style:{width:"100%", marginTop:"-10px", marginBottom:"37px"}}, [
				"div", {className:"boxD_inner"}, [
					"div", {className:"boxD", style:{width:"100%"}}, [
						
						"h3", null, [
							"span", null, "Coup d&#39;Bungie " + CoupDBungie.Version + " for " + CoupDBungie.Platform + " (by ",
							"a", {href:"?memberID=" + CoupDBungie.AuthorMemberID}, CoupDBungie.Author.HTMLEncode(),
							"span", null, ")"
						],

						"div", {class:"RadTabStrip RadTabStrip_Default"}, [
							"div", {class:"rtsLevel rtsLevel2", style:{cssFloat:"none", width:"inherit"}}, [
								"ul", {class:"rtsUL"}, [
									"li", {class:"rtsLI"}, [
										"a", {href:"javascript:;", class:"coup5settingslink rtsLink rtsSelected", onclick:function(){
												$(".coup5s").hide();
												$("#coup5spublish").show();
												$(".coup5settingslink").removeClass("rtsSelected");
												$(this).addClass("rtsSelected");
												location.href = "#CoupDBungie5";
											}
										}, [
											"span", {class:"rtsOut"}, [
												"span", {class:"rtsIn"}, [
													"span", {class:"rtsTxt"}, "Publish Styles"
												]
											]
										]
									],

									"li", {class:"rtsLI"}, [
										"a", {href:"javascript:;", class:"coup5settingslink rtsLink", onclick:function(){
												$(".coup5s").hide();
												$("#coup5soptions").show();
												$(".coup5settingslink").removeClass("rtsSelected");
												$(this).addClass("rtsSelected");
												location.href = "#CoupDBungie5";
											}
										}, [
											"span", {class:"rtsOut"}, [
												"span", {class:"rtsIn"}, [
													"span", {class:"rtsTxt"}, "Options"
												]
											]
										]
									],

									"li", {class:"rtsLI"}, [
										"a", {href:"javascript:;", class:"coup5settingslink rtsLink", onclick:function(){
												$(".coup5s").hide();
												$("#coup5scache").show();
												$(".coup5settingslink").removeClass("rtsSelected");
												$(this).addClass("rtsSelected");
												location.href = "#CoupDBungie5";
											}
										}, [
											"span", {class:"rtsOut"}, [
												"span", {class:"rtsIn"}, [
													"span", {class:"rtsTxt"}, "Cache"
												]
											]
										]
									],

									"li", {class:"rtsLI"}, [
										"a", {href:"javascript:;", class:"coup5settingslink rtsLink", onclick:function(){
												$(".coup5s").hide();
												$("#coup5sreport").show();
												$(".coup5settingslink").removeClass("rtsSelected");
												$(this).addClass("rtsSelected");
												location.href = "#CoupDBungie5";
											}
										}, [
											"span", {class:"rtsOut"}, [
												"span", {class:"rtsIn"}, [
													"span", {class:"rtsTxt"}, "Report user"
												]
											]
										]
									]
								]
							]
						],

						//Profile section
						"div", {style:{margin:"5px"}, id:"coup5sprofile"}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Profile",
								"table", {style:{width:"100%"}}, [
								
									"tr", null, [
										"td", {colspan:"2"}, [
											"p", {style:{margin:"10px"}}, [
												"span", null, "Welcome to Coup d&#39;Bungie 5.",
												"br", null, null,
												"br", null, null,
												"span", null, "To use Coup d&#39;Bungie 5, you must first register. You only need to do this once and once only. There is more information about the registeration process in the FAQ on Registeration link below. Please note: ",
												"b", {style:{textDecoration:"underline"}}, "You will not be able to use many of the features of Coup d&#39;Bungie 5 if you have not registered",
												"br", null, null,
												"br", null, null,
												"div", null, [
													"span", null, "Having issues? ",
													"a", {href:"http://www.bungie.net/fanclub/308401/Forums/posts.aspx?postID=68482978"}, "Read this thread.",
													"span", null, " Still having issues? Post your issue in the Coup group, with error messages if any."
												]
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
														var newkey = prompt("This option is for manually entering and saving a key. Do not put your Validation String in here.");
														if(newkey != null){
															if(/^[0-9a-f]{64}$/.test(newkey)){
																Client.SetKey(newkey);
																$(this).siblings("input").val(newkey);
																alert("Key saved successfully");
															}
															else{
																alert("Key is not valid. It should only contain numbers and letters, and be 64 characters long.");
															}
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
													var registrationType = 0; //Regular registration, not FetchKey.
													if(Client.GetKey(null) != null){
														if(!confirm("It appears you already have a key stored. Do you want to begin the registration process anyway?")){
															return;
														}
													}
													
													alert(
														"Please note:\n\n" +
														"- Make sure you've read the article \"FAQ on Registration\" if you're not sure about anything\n" +
														"- There are a few questions along the way\n" +
														"- You'll only ever have to do this process once\n" +
														"- It will take a few minutes at the most to complete\n" +
														"- Do not start a new browsing session during the process\n" +
														"- If you have any problems, don't hesitate to ask!"
													);
													
													if(!confirm("Your username is " + Client.GetUsername("") + ".\n" +
																"If you have lost your key press cancel, otherwise press OK.")){
														registrationType = 1; //FetchKey registration
													}
													
													if(confirm("Click OK if you have already received a Validation String from this process, otherwise click cancel (you should probably click cancel if you haven't done this before)")){
														
														var memberID;
														do{
															memberID = prompt("Enter your memberID (not your userID)")
														}
														while(!/^[0-9]+$/g.test(memberID));
														
														CoupDBungie.Server.Register(null, memberID, registrationType,
															function(){
																var obj = this.GetResponseJSON();
																if(obj != null){
																	if(obj.Status === CoupDBungie.Server.Responses.OK){
																		prompt("Success!\n\nYour key is displayed below. It will be saved in your browser automatically", obj.Key);
																		Client.SetKey(obj.Key);
																	}
																	else{
																		alert("The server said: " + obj.Reason);
																	}
																}
																else{
																	alert("JSON parsing failed.\n\nHTTP Status: " + this.GetStatus() + "\n\nBody: " + this.GetResponseText());
																}
															},
															function(){
																alert("HTTP Error.\n\nHTTP Status: " + this.GetStatus());
															},
															null
														);
														
													}
													else{
											
														CoupDBungie.Server.Register(Client.GetUsername(""), null, registrationType,
															function(){
																var obj = this.GetResponseJSON();
																if(obj != null){
																	if(obj.Status === CoupDBungie.Server.Responses.OK){
																		prompt("Success!\n\nHere is your Validation String", obj.ValidationString);
																	}
																	else{
																		alert("The server said: " + obj.Reason);
																	}
																}
																else{
																	alert("HTTP Error.\n\nHTTP Status: " + this.GetStatus());
																}
															},
															function(){
															
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
						"div", {style:{margin:"5px"}, id:"coup5spublish", class:"coup5s"}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Publish Styles",
								"table", {id:"PublishSettingsTable", style:{width:"100%"}}, [
								
									"tr", null, [
										"td", {colspan:"3"}, [
											"p", {style:{margin:"10px"}}, [
												"span", null, "Here is where you can publish a new set of styles. If you haven't already, you should read up on ",
												"a", {href:"/fanclub/404459/Forums/posts.aspx?postID=60124459", target:"_blank"}, "what is and what is not permitted",
												"span", null, " to be published, as well as the restrictions. If you feel that they are too restrictive, or just want to suggest an idea or feature, please make a topic about it in the ",
												"a", {href:"/fanclub/coup5/Group/GroupHome.aspx", target:"_blank"}, "Coup d'Bungie 5 forum",
											]
										]
									],
								
									"tr", {style:{fontWeight:"bold", fontStyle:"italic", textDecoration:"underline"}}, [
										"td", {style:{width:"220px"}}, "Style Name",
										"td", null, "Style Value",
										"td", null, "Style Notes"
									],
								
									"tr", null, [
										"td", null, "TitlebarUsernameText: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarUsernameText"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarUsernameTextColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarUsernameTextColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarUsernameTextOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarUsernameTextOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "TitlebarTitleText: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarTitleText"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarTitleTextColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarTitleTextColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarTitleTextOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarTitleTextOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "TitlebarMessageText: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarMessageText"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarMessageTextColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarMessageTextColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarMessageTextOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarMessageTextOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "TitlebarGroupText: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarGroupText"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarGroupTextColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarGroupTextColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarGroupTextOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarGroupTextOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundImage: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBackgroundImage"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBackgroundOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBackgroundColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundGradientLeft: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBackgroundGradientLeft", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarBackgroundGradientRight: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBackgroundGradientRight", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarBorderStyle: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBorderStyle"}, null
										],
										"td", null, "Dotted, dashed, solid, double, groove, ridge, inset, outset"
									],
									
									"tr", null, [
										"td", null, "TitlebarBorderColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarBorderColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "TitlebarMoreOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"TitlebarMoreOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", {colspan:"3"}, [
											"hr", null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "AvatarImage: ",
										"td", null, [
											"input", {placeholder:"*", id:"AvatarImage"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "AvatarOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"AvatarOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "AvatarBorderStyle: ",
										"td", null, [
											"input", {placeholder:"*", id:"AvatarBorderStyle"}, null
										],
										"td", null, "Dotted, dashed, solid, double, groove, ridge, inset, outset"
									],
									
									"tr", null, [
										"td", null, "AvatarBorderColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"AvatarBorderColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", {colspan:"3"}, [
											"hr", null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackgroundColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackgroundColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackgroundGradientLeft: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackgroundGradientLeft", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackgroundGradientRight: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackgroundGradientRight", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackground1Image: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground1Image"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackground1ImageOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground1ImageOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "PostBackground1ImagePosition: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground1ImagePosition"}, null
										],
										"td", null, "Left, right, or center followed by a space, followed by top, center, or bottom. Ex: \"center top\"."
									],
									
									"tr", null, [
										"td", null, "PostBackground1ImageAttachment: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground1ImageAttachment"}, null
										],
										"td", null, "Scroll, fixed"
									],
									
									"tr", null, [
										"td", null, "PostBackground1ImageRepeat: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground1ImageRepeat"}, null
										],
										"td", null, "No-repeat, repeat, repeat-y, repeat-x"
									],
									
									"tr", null, [
										"td", null, "PostBackground2Image: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground2Image"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackground2ImageOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground2ImageOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "PostBackground2ImagePosition: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground2ImagePosition"}, null
										],
										"td", null, "Left, right, or center followed by a space, followed by top, center, or bottom. Ex: \"center top\"."
									],
									
									"tr", null, [
										"td", null, "PostBackground2ImageAttachment: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground2ImageAttachment"}, null
										],
										"td", null, "Scroll, fixed"
									],
									
									"tr", null, [
										"td", null, "PostBackground2ImageRepeat: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground2ImageRepeat"}, null
										],
										"td", null, "No-repeat, repeat, repeat-y, repeat-x"
									],
									
									"tr", null, [
										"td", null, "PostBackground3Image: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground3Image"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostBackground3ImageOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground3ImageOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "PostBackground3ImagePosition: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground3ImagePosition"}, null
										],
										"td", null, "Left, right, or center followed by a space, followed by top, center, or bottom. Ex: \"center top\"."
									],
									
									"tr", null, [
										"td", null, "PostBackground3ImageAttachment: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground3ImageAttachment"}, null
										],
										"td", null, "Scroll, fixed"
									],
									
									"tr", null, [
										"td", null, "PostBackground3ImageRepeat: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostBackground3ImageRepeat"}, null
										],
										"td", null, "No-repeat, repeat, repeat-y, repeat-x"
									],
									
									"tr", null, [
										"td", null, "PostFont: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostFont"}, null
										],
										"td", null, "Arial, helvetica, times new roman, courier, verdana, tahoma, comic sans ms, impact, georgia, palatino"
									],
									
									"tr", null, [
										"td", null, "PostFontColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostFontColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostFontOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostFontOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", null, "PostLinkColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostLinkColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "PostLinkOpacity: ",
										"td", null, [
											"input", {placeholder:"*", id:"PostLinkOpacity"}, null
										],
										"td", null, "Number between 0.0 - 1.0. Ex: 0.5"
									],
									
									"tr", null, [
										"td", {colspan:"3"}, [
											"hr", null
										]
									],
									
									"tr", null, [
										"td", null, "QuoteBorderColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"QuoteBorderColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "QuoteFontColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"QuoteFontColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", null, "QuoteBackgroundColor: ",
										"td", null, [
											"input", {placeholder:"*", id:"QuoteBackgroundColor", className:"Coup5ColorWheel"}, null
										],
										"td", null, null
									],
									
									"tr", null, [
										"td", {colspan:"3"}, [
											
											"input", {type:"button", style:{margin:"8px", marginLeft:"0px"}, value:"Publish Styles",
												onclick:function(){
											
													if(Client.GetKey(null) == null){
														alert("You will need to register and have a key saved before you can publish any styles.");
														return;
													}
													if(!confirm("Are you sure you want to publish these styles?")){
														return;
													}
													
													var strFloat = function(s){ return parseFloat(s).toString(); }
													var s = new Styles();
													
													s.TitlebarUsernameText = $("#TitlebarUsernameText").val();
													s.TitlebarUsernameTextColor = $("#TitlebarUsernameTextColor").val().toLowerCase();
													s.TitlebarUsernameTextOpacity = strFloat($("#TitlebarUsernameTextOpacity").val());
													s.TitlebarTitleText = $("#TitlebarTitleText").val();
													s.TitlebarTitleTextColor = $("#TitlebarTitleTextColor").val().toLowerCase();
													s.TitlebarTitleTextOpacity = strFloat($("#TitlebarTitleTextOpacity").val());
													s.TitlebarMessageText = $("#TitlebarMessageText").val();
													s.TitlebarMessageTextColor = $("#TitlebarMessageTextColor").val().toLowerCase();
													s.TitlebarMessageTextOpacity = strFloat($("#TitlebarMessageTextOpacity").val());
													s.TitlebarGroupText = $("#TitlebarGroupText").val();
													s.TitlebarGroupTextColor = $("#TitlebarGroupTextColor").val().toLowerCase();
													s.TitlebarGroupTextOpacity = strFloat($("#TitlebarGroupTextOpacity").val());
													s.TitlebarBackgroundImage = $("#TitlebarBackgroundImage").val();
													s.TitlebarBackgroundOpacity = strFloat($("#TitlebarBackgroundOpacity").val());
													s.TitlebarBackgroundColor = $("#TitlebarBackgroundColor").val().toLowerCase();
													s.TitlebarBackgroundGradientLeft = $("#TitlebarBackgroundGradientLeft").val();
													s.TitlebarBackgroundGradientRight = $("#TitlebarBackgroundGradientRight").val();
													s.TitlebarBorderStyle = $("#TitlebarBorderStyle").val().toLowerCase();
													s.TitlebarBorderColor = $("#TitlebarBorderColor").val().toLowerCase();
													s.TitlebarMoreOpacity = strFloat($("#TitlebarMoreOpacity").val());
													
													s.AvatarImage = $("#AvatarImage").val();
													s.AvatarOpacity = strFloat($("#AvatarOpacity").val());
													s.AvatarBorderStyle = $("#AvatarBorderStyle").val().toLowerCase();
													s.AvatarBorderColor = $("#AvatarBorderColor").val().toLowerCase();
													
													s.PostBackground1Image = $("#PostBackground1Image").val();
													s.PostBackground1ImageOpacity = strFloat($("#PostBackground1ImageOpacity").val());
													s.PostBackground1ImagePosition = $("#PostBackground1ImagePosition").val().toLowerCase();
													s.PostBackground1ImageAttachment = $("#PostBackground1ImageAttachment").val().toLowerCase();
													s.PostBackground1ImageRepeat = $("#PostBackground1ImageRepeat").val().toLowerCase();
													s.PostBackground2Image = $("#PostBackground2Image").val();
													s.PostBackground2ImageOpacity = strFloat($("#PostBackground2ImageOpacity").val());
													s.PostBackground2ImagePosition = $("#PostBackground2ImagePosition").val().toLowerCase();
													s.PostBackground2ImageAttachment = $("#PostBackground2ImageAttachment").val().toLowerCase();
													s.PostBackground2ImageRepeat = $("#PostBackground2ImageRepeat").val().toLowerCase();
													s.PostBackground3Image = $("#PostBackground3Image").val();
													s.PostBackground3ImageOpacity = strFloat($("#PostBackground3ImageOpacity").val());
													s.PostBackground3ImagePosition = $("#PostBackground3ImagePosition").val().toLowerCase();
													s.PostBackground3ImageAttachment = $("#PostBackground3ImageAttachment").val().toLowerCase();
													s.PostBackground3ImageRepeat = $("#PostBackground3ImageRepeat").val().toLowerCase();
													s.PostBackgroundColor = $("#PostBackgroundColor").val().toLowerCase();
													s.PostBackgroundGradientLeft = $("#PostBackgroundGradientLeft").val();
													s.PostBackgroundGradientRight = $("#PostBackgroundGradientRight").val();
													s.PostFont = $("#PostFont").val().toLowerCase();
													s.PostFontColor = $("#PostFontColor").val().toLowerCase();
													s.PostFontOpacity = strFloat($("#PostFontOpacity").val());
													s.PostLinkColor = $("#PostLinkColor").val().toLowerCase();
													s.PostLinkOpacity = strFloat($("#PostLinkOpacity").val());

													s.QuoteBorderColor = $("#QuoteBorderColor").val().toLowerCase();
													s.QuoteFontColor = $("#QuoteFontColor").val().toLowerCase();
													s.QuoteBackgroundColor = $("#QuoteBackgroundColor").val().toLowerCase();
													
													CoupDBungie.Server.PublishStyles(Client.GetUsername(""), Client.GetKey(""), s,
														function(){
															var obj = this.GetResponseJSON();
															if(obj != null){
																if(obj.Status === CoupDBungie.Server.Responses.OK){
																	alert("Your styles were published successfully.");
																	var page = Cache.Get(Client.GetUsername(""));

																	if(page != null){
																		Cache.Delete(page);
																		Cache.Save();
																	}
																}
																else{
																	alert("The server said: " + obj.Reason);
																}
															}
															else{
																alert("JSON parsing failed.\n\nHTTP Status: " + this.GetStatus() + "\n\nBody: " + this.GetResponseText());
															}
														},
														function(){
															alert("HTTP Error.\n\nHTTP Status: " + this.GetStatus());
														},
														null
													);
											
												}
											}, null
											
										]
									]
									
								]
							]
						],
						//End Publish Styles section
						
						//Options and ignore list section
						"div", {style:{margin:"5px", display:"none"}, id:"coup5soptions", class:"coup5s"}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Options",
								"div", {style:{margin:"10px"}}, [
									"div", {style:{display:"table-cell", maxWidth:"50%", width:"414px"}}, [
										"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
											"legend", {style:{margin:"10px"}}, "User ignore",
											"p", {style:{marginBottom:"10px"}}, "Gray names only have certain parts ignored, while black ones are fully ignored.",
											"div", {style:{margin:"10px"}}, [
												"select", {id:"IgnoreList", style:{width:"200px"}, size:5}, null
											],
											"div", {style:{margin:"10px"}}, [
												"input", {type:"button", value:"Remove All", onclick:function(){
													if(confirm("Are you sure you want to remove everyone from your ignore list?")){
														$("#IgnoreList").empty();
														Client.SetIgnoreList([]);
														Browser.Memory.Delete('coup5ignorelist');
													}
												}}, null,
												"input", {type:"button", value:"Remove", onclick:function(){
													var username = $("#IgnoreList option:selected").val();
													var usernames = [];

													Options.Del('coup5ignorelist', username);

													$("#IgnoreList option:selected").remove();
													$("#IgnoreList option").each(function(){
														usernames.Add($(this).val());
													});

													Client.SetIgnoreList(usernames);
												}}, null,
												"input", {type:"button", value:"Edit", onclick:function(){
													var username = $("#IgnoreList option:selected").val();
													IgnoreSpawn(username);
												}}, null,
												"input", {type:"button", value:"Add", onclick:function(){
													var username = prompt("Enter the username of the user you want to ignore", "");
													if(username){
														$("#IgnoreList").append(new Option(username.HTMLEncode(), username.HTMLEncode()));
														var usernames = [];
														$("#IgnoreList option").each(function(){
															usernames.Add($(this).val());
														});
														Client.SetIgnoreList(usernames);
													}
												}}, null
											]
										],
										"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
											"legend", {style:{margin:"10px"}}, "Global maximum opacity",
											"div", null, [
												"table", {style:{width:"100%"}}, [
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar background opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarBackgroundOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar group text opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarGroupTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar message text opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarMessageTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar more opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarMoreOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar title text opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarTitleTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Titlebar username text opacity:",
														"td", null, [
															"input", {type:"text", name:"TitlebarUsernameTextOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Avatar opacity:",
														"td", null, [
															"input", {type:"text", name:"AvatarOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Post background 1 opacity:",
														"td", null, [
															"input", {type:"text", name:"PostBackground1ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Post background 2 opacity:",
														"td", null, [
															"input", {type:"text", name:"PostBackground2ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Post background 3 opacity:",
														"td", null, [
															"input", {type:"text", name:"PostBackground3ImageOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Post text opacity:",
														"td", null, [
															"input", {type:"text", name:"PostFontOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													],
													"tr", {style:{height:"27px"}}, [
														"td", null, "Post link opacity:",
														"td", null, [
															"input", {type:"text", name:"PostLinkOpacity", placeholder:"0.0 - 1.0", style:{cssFloat:"right", borderStyle:"solid", borderRadius:"2px 2px", width:"150px"}}, null
														]
													]
												],
											]
										]
									],
									"div", {style:{display:"table-cell", maxWidth:"50%", width:"414px"}}, [
										"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
											"legend", {style:{margin:"10px"}, className:'coup5optionsglobdec'}, "Globally disabled declarations",
											"table", null, [
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarUsernameText"}
													],
													"td", null, "Titlebar username text"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarUsernameTextColor"}
													],
													"td", null, "Titlebar username text color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarTitleText"}
													],
													"td", null, "Titlebar title text"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarTitleTextColor"}
													],
													"td", null, "Titlebar title text color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarMessageText"}
													],
													"td", null, "Titlebar message text"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarMessageTextColor"}
													],
													"td", null, "Titlebar message text color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarGroupText"}
													],
													"td", null, "Titlebar group text"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarGroupTextColor"}
													],
													"td", null, "Titlebar group text color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarBackgroundImage"}
													],
													"td", null, "Titlebar background image"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarBackgroundColor"}
													],
													"td", null, "Titlebar background color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarBackgroundGradient"}
													],
													"td", null, "Titlebar background gradient"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"TitlebarBorder"}
													],
													"td", null, "Titlebar border"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"AvatarImage"}
													],
													"td", null, "Avatar image"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"AvatarBorder"}
													],
													"td", null, "Avatar border"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostBackground1Image"}
													],
													"td", null, "Post background 1 image"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostBackground2Image"}
													],
													"td", null, "Post background 2 image"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostBackground3Image"}
													],
													"td", null, "Post background 3 image"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostBackgroundColor"}
													],
													"td", null, "Post background color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostBackgroundGradient"}
													],
													"td", null, "Post background gradient"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostFont"}
													],
													"td", null, "Post font"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostFontColor"}
													],
													"td", null, "Post font color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"PostLinkColor"}
													],
													"td", null, "Post link color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"QuoteBackgroundColor"}
													],
													"td", null, "Quote background color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"QuoteBorderColor"}
													],
													"td", null, "Quote border color"
												],
												"tr", null, [
													"td", null, [
														"input", {type:"checkbox", name:"QuoteFontColor"}
													],
													"td", null, "Quote font color"
												],
											]
										]
									],
									"div", {style:{marginTop:"10px"}}, [
									"input", {type:"button", value:"Saved automatically", disabled:"disabled"}, null,
									"input", {type:"button", value:"Reset options", onclick:function(){
										if(confirm("Are you sure you want to reset all options?")){
											Options.Empty('coup5options');
										}
									}}
									]
								]
							]
						],
						//End Ignore list section
						
						//Cache
						"div", {style:{margin:"5px", display:"none"}, id:"coup5scache", class:"coup5s"}, [
							"fieldset", {style:{border:"1px solid", padding:"5px"}}, [
								"legend", {style:{marginLeft:"5px"}}, "Cache",
								"div", {style:{height:"700px", overflow:"auto"}}, [
									"table", {id:"CoupCacheTable", style:{width:"100%"}}, [
										
										"tr", null, [
											"td", {colspan:"5"}, [
												"p", {style:{margin:"10px"}}, "This is the Coup d'Bungie 5 cache. Its contents are here to keep performance at a high standard - meaning, it makes things go faster, like red painted cars. It holds a series of User objects, each of which contain data about Bungie.net users and their associated Coup d'Bungie styles so you don't need to continually fetch them from the server. This script which generates the cache also has automatic cache management functionality built-in, so items will automatically be deleted when they need to be. However, you can also delete items yourself just by clicking the 'Delete' button beside each username. You can also view a user&#39;s cached styles by clicking their username. Note that the Coup d&#39;Bungie cache (the data that is listed below) is NOT the same as your browser&#39;s cache. Do not clear your browser&#39;s cache or your cookies to try to get the script to work."
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
							]
						],
						//End Cache section
						
						//Start report section
						"div", {style:{margin:"5px", display:"none"}, id:"coup5sreport", class:"coup5s"}, [
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
														function(){
															var obj = this.GetResponseJSON();
															if(obj != null){
																if(obj.Status === CoupDBungie.Server.Responses.OK){
																	alert("Report was successful");
																}
																else{
																	alert("The server said: " + obj.Reason);
																}
															}
															else{
																alert("JSON parsing failed.\n\nHTTP Status: " + this.GetStatus() + "\n\nBody: " + this.GetResponseText());
															}
														},
														function(){
															alert("HTTP Error.\n\nHTTP Status: " + this.GetStatus());
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
		
		var box = document.createElement("div");
		$(box).createAppend("div", {id:"PublishSettingsPreviewBox", className:"PreviewBox", style:{width:"670px", cssFloat:"left", display:"none", position:"fixed", backgroundColor:"#1B1D1F", "z-index":"11", bottom:"0px"}}, null);
		$(box).css({
			"width":"902px",
			"max-width":"902px",
			"margin":"auto"
		});
		$("body").append(box);
		
		$("#PublishSettingsTable input:text").bind("focus", function(){
	
			$("#PublishSettingsPreviewBox > :not(.hideBtnBox)").remove();
			
			var s = new Styles();

			s.AvatarBorderColor = $("#AvatarBorderColor").val();
			s.AvatarBorderStyle = $("#AvatarBorderStyle").val();

			s.AvatarImage = $("#AvatarImage").val();
			s.AvatarOpacity = $("#AvatarOpacity").val();

			s.PostBackground1Image = $("#PostBackground1Image").val();
			s.PostBackground1ImageAttachment = $("#PostBackground1ImageAttachment").val();
			s.PostBackground1ImageOpacity = $("#PostBackground1ImageOpacity").val();
			s.PostBackground1ImagePosition = $("#PostBackground1ImagePosition").val();
			s.PostBackground1ImageRepeat = $("#PostBackground1ImageRepeat").val();
			
			s.PostBackground2Image = $("#PostBackground2Image").val();
			s.PostBackground2ImageAttachment = $("#PostBackground2ImageAttachment").val();
			s.PostBackground2ImageOpacity = $("#PostBackground2ImageOpacity").val();
			s.PostBackground2ImagePosition = $("#PostBackground2ImagePosition").val();
			s.PostBackground2ImageRepeat = $("#PostBackground2ImageRepeat").val();
			
			s.PostBackground3Image = $("#PostBackground3Image").val();
			s.PostBackground3ImageAttachment = $("#PostBackground3ImageAttachment").val();
			s.PostBackground3ImageOpacity = $("#PostBackground3ImageOpacity").val();
			s.PostBackground3ImagePosition = $("#PostBackground3ImagePosition").val();
			s.PostBackground3ImageRepeat = $("#PostBackground3ImageRepeat").val();
			
			s.PostBackgroundColor = $("#PostBackgroundColor").val();
			s.PostBackgroundGradientLeft = $("#PostBackgroundGradientLeft").val();
			s.PostBackgroundGradientRight = $("#PostBackgroundGradientRight").val();

			s.PostFont = $("#PostFont").val();
			s.PostFontColor = $("#PostFontColor").val();
			s.PostFontOpacity = $("#PostFontOpacity").val();

			s.PostLinkColor = $("#PostLinkColor").val();
			s.PostLinkOpacity = $("#PostLinkOpacity").val();

			s.QuoteBackgroundColor = $("#QuoteBackgroundColor").val();

			s.QuoteBorderColor = $("#QuoteBorderColor").val();

			s.QuoteFontColor = $("#QuoteFontColor").val();

			s.TitlebarBackgroundColor = $("#TitlebarBackgroundColor").val();
			s.TitlebarBackgroundGradientLeft = $("#TitlebarBackgroundGradientLeft").val();
			s.TitlebarBackgroundGradientRight = $("#TitlebarBackgroundGradientRight").val();
			s.TitlebarBackgroundImage = $("#TitlebarBackgroundImage").val();
			s.TitlebarBackgroundOpacity = $("#TitlebarBackgroundOpacity").val();

			s.TitlebarBorderColor = $("#TitlebarBorderColor").val();
			s.TitlebarBorderStyle = $("#TitlebarBorderStyle").val();

			s.TitlebarGroupText = $("#TitlebarGroupText").val();
			s.TitlebarGroupTextColor = $("#TitlebarGroupTextColor").val();
			s.TitlebarGroupTextOpacity = $("#TitlebarGroupTextOpacity").val();

			s.TitlebarMessageText = $("#TitlebarMessageText").val();
			s.TitlebarMessageTextColor = $("#TitlebarMessageTextColor").val();
			s.TitlebarMessageTextOpacity = $("#TitlebarMessageTextOpacity").val();

			s.TitlebarMoreOpacity = $("#TitlebarMoreOpacity").val();

			s.TitlebarTitleText = $("#TitlebarTitleText").val();
			s.TitlebarTitleTextColor = $("#TitlebarTitleTextColor").val();
			s.TitlebarTitleTextOpacity = $("#TitlebarTitleTextOpacity").val();

			s.TitlebarUsernameText = $("#TitlebarUsernameText").val();
			s.TitlebarUsernameTextColor = $("#TitlebarUsernameTextColor").val();
			s.TitlebarUsernameTextOpacity = $("#TitlebarUsernameTextOpacity").val()
			
			$("#PublishSettingsPreviewBox").prepend(MainFunctions.GenerateStylePreview(s));
			$(".PreviewBox").show();
		});
		$("#PublishSettingsTable input:text").bind("blur", function(){
			$(".PreviewBox").hide();
		});

		//Add color wheel
		$(".Coup5ColorWheel").wheelColorPicker();
		$("#PublishSettingsTable input:text").css({"border-style":"solid", "border-radius":"2px", "width":"150px"});
		$("#PublishSettingsTable input:text").val("");
		
		//Add ignored users
		$.each(Array.Distinct(Client.GetIgnoreList([])), function(){
			$("#IgnoreList").append(new Option(this, this));
		});
		var IgnoreList = JSON.parse(Browser.Memory.Get('coup5ignorelist', "{}"));
		for(key in IgnoreList) {
			if($("#IgnoreList option[value='" + key + "']").length < 1){
				$("#IgnoreList").append("<option style='color:gray;' value='" + key + "'>" + key + "</option>");
			} else {
				$("#IgnoreList option[value='" + key + "']").attr('style', 'color:black;');
			}
		}
		
		//Add cached items to table
		for(var i=0; i<Cache.WorkingSet.length; i++){
			$("#CoupCacheTable").createAppend(
				"tr", null, [
				
					"td", null, [
						"a", {href:"javascript:;", onclick:function(){
							var page = Cache.Get(this.innerHTML);
							if(page == null || !page.Data.CoupUser){
								alert("Styles unavailable for this user.");
								return;
							}
							var pre = MainFunctions.GenerateStylePreview(page.Data.Styles);
							var clearableBox = $("<div/>");
							$(clearableBox).css({position:"fixed", top:"10px", right:"10px", padding:"10px", backgroundColor:"#1B1D1F", zIndex:9000});
							$(pre).appendTo(clearableBox);
							clearableBox.createAppend(
								"input", {type:"button", value:"Close", onclick:function(){
									$(this).parent().remove();
								}}
							);
							$(clearableBox).appendTo("body");
						}}, Cache.WorkingSet[i].Data.Username
					],
					
					"td", null, new Date(Cache.WorkingSet[i].Date).toUTCString(),
					"td", null, Cache.WorkingSet[i].LastHit != null ? new Date(Cache.WorkingSet[i].LastHit).toUTCString() : "not hit",
					"td", null, Cache.WorkingSet[i].Data.CoupUser ? "<span style='color:DarkGreen;'>Yes</span>" : "<span style='color:DarkRed;'>No</span>",
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
			$(this).html($(this).html().replace(/.+(?= \[(\d+)\])/, "<a href=\"?uid=$1\">$&</a>"));
		});
		//End Ban history parsing
		
		//Options global declarations checkbox event
		$(".coup5optionsglobdec + table input[type='checkbox']").live('click', function(){
			if($(this).is(':checked')){
				Options.Add('coup5options', 'checkbox', $(this).attr('name'), 'checked="checked"');
			}
			else{
				Options.Del('coup5options', 'checkbox', $(this).attr('name'));
			}
		});
		//End options checkbox event
		
		//
		$(".coup5miscoptions input[name='coup5storagetype']").live('click', function(){
			if($(this).is(':checked')){
				localStorage['coup5storagetype'] = 'true';
			} else {
				delete localStorage['coup5storagetype'];
			}
		});
		
		if(localStorage['coup5storagetype']){
			$(".coup5miscoptions input[name='coup5storagetype']").attr('checked', true);
		}
		//
		
		//IgnoreSpawn bindings
		SignatureLive();
		
		//Options text input event
		$("#coup5options input[type='text']").live('blur', function(){
			var type = $(this).attr('type');
			var name = $(this).attr('name');
			Options.Add('coup5options', type, name, parseFloat($(this).val()));
		});
		//End options text input event
		
		var options = JSON.parse(Browser.Memory.Get('coup5options', "{}"));
		for ( group in options ) {
			if ( group == 'text' ) {
				if ( options.hasOwnProperty(group) ) {
					for ( key in options[group] ) {
						if ( options[group].hasOwnProperty(key) ) {
							$('#coup5options input[type="' + group + '"][name="' + key + '"]').val(options[group][key]);
						}
					}
				}
			}
			else if ( group == 'checkbox' ) {
				if ( options.hasOwnProperty(group) ) {
					for ( key in options[group] ) {
						if ( options[group].hasOwnProperty(key) ) {
							$('#coup5options input[type="' + group + '"][name="' + key + '"]').attr('checked', 'checked');
						}
					}
				}
			}
		}
		
		//Fetch live styles from server for client
		CoupDBungie.Server.GetStyles([Client.GetUsername("")],
			function(){
				var obj = this.GetResponseJSON();
				if(obj != null && obj.Status === CoupDBungie.Server.Responses.OK && obj.Users[0]){
					var s = obj.Users[0].Styles;

					$("#AvatarBorderColor").val(s.AvatarBorderColor);
					$("#AvatarBorderStyle").val(s.AvatarBorderStyle);

					$("#AvatarImage").val(s.AvatarImage);
					$("#AvatarOpacity").val(s.AvatarOpacity);

					$("#PostBackground1Image").val(s.PostBackground1Image);
					$("#PostBackground1ImageOpacity").val(s.PostBackground1ImageOpacity);
					$("#PostBackground1ImageRepeat").val(s.PostBackground1ImageRepeat);
					$("#PostBackground1ImageAttachment").val(s.PostBackground1ImageAttachment);
					$("#PostBackground1ImagePosition").val(s.PostBackground1ImagePosition);

					$("#PostBackground2Image").val(s.PostBackground2Image);
					$("#PostBackground2ImageOpacity").val(s.PostBackground2ImageOpacity);
					$("#PostBackground2ImageRepeat").val(s.PostBackground2ImageRepeat);
					$("#PostBackground2ImageAttachment").val(s.PostBackground2ImageAttachment);
					$("#PostBackground2ImagePosition").val(s.PostBackground2ImagePosition);

					$("#PostBackground3Image").val(s.PostBackground3Image);
					$("#PostBackground3ImageOpacity").val(s.PostBackground3ImageOpacity);
					$("#PostBackground3ImageRepeat").val(s.PostBackground3ImageRepeat);
					$("#PostBackground3ImageAttachment").val(s.PostBackground3ImageAttachment);
					$("#PostBackground3ImagePosition").val(s.PostBackground3ImagePosition);

					$("#PostBackgroundColor").val(s.PostBackgroundColor);
					$("#PostBackgroundGradientLeft").val(s.PostBackgroundGradientLeft);
					$("#PostBackgroundGradientRight").val(s.PostBackgroundGradientRight);

					$("#PostFont").val(s.PostFont);
					$("#PostFontColor").val(s.PostFontColor);
					$("#PostFontOpacity").val(s.PostFontOpacity);

					$("#PostLinkColor").val(s.PostLinkColor);
					$("#PostLinkOpacity").val(s.PostLinkOpacity);

					$("#QuoteBackgroundColor").val(s.QuoteBackgroundColor);

					$("#QuoteBorderColor").val(s.QuoteBorderColor);

					$("#QuoteFontColor").val(s.QuoteFontColor);

					$("#TitlebarBackgroundColor").val(s.TitlebarBackgroundColor);
					$("#TitlebarBackgroundGradientLeft").val(s.TitlebarBackgroundGradientLeft);
					$("#TitlebarBackgroundGradientRight").val(s.TitlebarBackgroundGradientRight);
					$("#TitlebarBackgroundImage").val(s.TitlebarBackgroundImage);
					$("#TitlebarBackgroundOpacity").val(s.TitlebarBackgroundOpacity);

					$("#TitlebarBorderStyle").val(s.TitlebarBorderStyle);
					$("#TitlebarBorderColor").val(s.TitlebarBorderColor);

					$("#TitlebarGroupText").val(s.TitlebarGroupText);
					$("#TitlebarGroupTextColor").val(s.TitlebarGroupTextColor);
					$("#TitlebarGroupTextOpacity").val(s.TitlebarGroupTextOpacity);

					$("#TitlebarMessageText").val(s.TitlebarMessageText);
					$("#TitlebarMessageTextColor").val(s.TitlebarMessageTextColor);
					$("#TitlebarMessageTextOpacity").val(s.TitlebarMessageTextOpacity);

					$("#TitlebarMoreOpacity").val(s.TitlebarMoreOpacity);

					$("#TitlebarTitleText").val(s.TitlebarTitleText);
					$("#TitlebarTitleTextColor").val(s.TitlebarTitleTextColor);
					$("#TitlebarTitleTextOpacity").val(s.TitlebarTitleTextOpacity);

					$("#TitlebarUsernameText").val(s.TitlebarUsernameText);
					$("#TitlebarUsernameTextColor").val(s.TitlebarUsernameTextColor);
					$("#TitlebarUsernameTextOpacity").val(s.TitlebarUsernameTextOpacity);
				}
			},
			null,
			null
		);
		
	},
	
	PostsPage:function(){
		
		var ignoreList = Client.GetIgnoreList();
		var forumItems = $("#ctl00_mainColPanel div.forum_item, div.forum_alt_item");
		var usernames = [];
		var users = [];
		
		//IgnoreSpawn and ReportSpawn bindings
		SignatureLive();
		
		function ApplyStyles(){
			forumItems.find("div.forumpost:has(li.login > a)").each(function(){
				//Permalinks
				$(this).find("ul.rightside").createAppend(
					"li", null, [
						"a", {target:"_blank", href:"?postID=" + $(this).parent().find('a[id][name][href!=""]:first').attr("name")}, "permalink to this post"
					]
				);
				//End Permalinks
				//Ignore link
				var username = $(this).find("li.login > a").text();

				$(this).find("ul.leftside").createAppend(
					"li", null, [
						"span", null, "coup 5:&nbsp;",
						"a", {href:"javascript:;", class:"coup5ignorespawn", name:username}, "Ignore " + username,
						"span", null, "&nbsp;|&nbsp;",
						"a", {href:"javascript:;", class:"coup5reportspawn", name:username}, "Report " + username
					]
				);
				//End ignore link
				var ___user = $(this).find( "li.login a" ).text(); if ( Array.Contains( Client.GetIgnoreList() , ___user ) ) return true;
				var page = Cache.Get($(this).find("li.login a").text());
				if(page != null && page.Data.Styles != null){
					$(this).css("width", "670px"); //Fix background being off (may need to add this to function below)
					MainFunctions.ApplyStylesToElement(page.Data.Styles, this);
				}
			});
		}
		
		Console.Log("Getting forumItems");
		
		//Filter for cached items, removing those which are cached
		forumItems.find("div.forumpost li.login > a").each(function(){
			var username = $(this).text();
			if(!Cache.Exists(username)){
				usernames.Add(username);
			}
		});
		
		usernames.Distinct(); //Eliminate duplicates
		usernames.Filter(ignoreList); //Filter by ignore list
		
		//Get the rest from the server
		if(usernames.length >= 1){
			CoupDBungie.Server.GetStyles(usernames,
				function(){
					var obj = this.GetResponseJSON();
					if(obj != null && obj.Status === CoupDBungie.Server.Responses.OK){
						
						//Add Coup5 users
						$.each(obj.Users, function(){
							users.Add(new User(this.Username, this.Id, this.Styles, true)); //Add to users array
							usernames.DeleteAll(this.Username); //Remove the user from the usernames array
						});
						
						//Add non Coup5 users
						$.each(usernames, function(){
							users.Add(new User(this, 0, null, false));
						});
						
						//Add everyone to cache
						$.each(users, function(){
							Cache.Add(new Cache.Page(this));
						});
						
						ApplyStyles();
						Cache.Save();
						
					}
					else{
						Console.Log("JSON parsing failed for GetStyles request");
					}
				},
				null,
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
		if(/\/account\/profile\.aspx(\#\S*)?$/i.test(url)){
			MainFunctions.ClientProfilePage();
		}
		//else if(/account\/profile\.aspx?(memberID|userID)=\d+(#CoupDBungie5)?$/i.test(url)){
		//	MainFunctions.OtherUserProfilePage();
		//}
		else if(/\/(fanclub\/.+?\/)?forums\/posts\.aspx\?postID=\d+.*$/i.test(url)){
			MainFunctions.PostsPage();
		}
	}
	var stylesheet = "<style type=\"text/css\">\
		#CoupDBungie5 tr:nth-child(odd) {background-color:rgba(255,255,255,0.07);}\
		</style>"
	$("body").append(stylesheet);
	CoupDBungie.CheckForUpdate();
}

Main();
