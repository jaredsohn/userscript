// ==UserScript==
// @name           MyPersonalSpin :: Away
// @namespace      http://spin.jpr0g.info/
// @description    Erweitert den Abwesenheitsmodus von SPiN um nützliche Funktionen
// @include        http://*.spin.de/login/chatinfo*
// @include		   http://*.spin.de/*
// ==/UserScript==

//By C.Bachmann
//Vers. 0.301
//Last-Update: 2010-08-07

function MPS_LIBARY() {
		
	this.SCRIPT = "Away";
	this.VERSION = "0.301";	
	
	this.init = function() {		
		this.URL = window.location.pathname;
		var pattern = /[\?|&]{1}([a-z0-9]+)=?([^=&?]*)/gi;
		this.URL_PARAMETER = new Array();
		var tmp;
		while(tmp = pattern.exec(window.location.search)) {
			this.URL_PARAMETER[tmp[1]] = tmp[2];
		}
		this.checkUpdate();
	}
	
	this.isParameter = function(param) {
		if(!this.URL_PARAMETER)
			return false;
		for(var name in this.URL_PARAMETER) {
			if(name == param)
				return true;
		}
		return false;
	}
	
	this.getParameter = function(name) {
		return this.URL_PARAMETER[name];
	}

	this.isPage = function(page) {
		return this.URL.substr(0,page.length) == page;
	}
	
	this.getUserInfo = function(name,f) {
		unsafeWindow.top.$.get("/api/userinfo",{hexlogin:name.hexencode(),'utf8':1},function(json){f(json);},"json");
	}
	
	this.checkUpdate = function() {
		if(unsafeWindow.top.Spin && !unsafeWindow.top['MPS_UPDATE_'+this.SCRIPT]) {
			unsafeWindow.top['MPS_UPDATE_'+this.SCRIPT] = true;
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://spin.jpr0g.info/server/check_update.php",
				data: "s="+this.SCRIPT+"&v="+this.VERSION,
				headers: {
					"User-Agent": "MyPersonalSPiN",
					"Accept": "text/plain",
					"Connection": "close",
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(response) {
					if(response.responseText == "1") {
						var wrapper = document.createElement("div");
						wrapper.setAttribute("style","font-size: 10px; position: absolute; top: 0; border-bottom: 1px solid #000; left: 0; width: 100%; background: #ffffe1; z-index: 100; padding: 5px;");
						wrapper.setAttribute("id","mps_update_"+MPS.SCRIPT);
						var text = document.createElement("div");
						text.setAttribute("style","width: 70%; float: left; padding: 2px;");
						text.innerHTML = "Es ist ein Update für MyPersonalSpin :: "+MPS.SCRIPT+" verfügbar!"
						wrapper.appendChild(text);
						var buttons = document.createElement("div");
						buttons.setAttribute("style","width: 25%; float: left; text-align: right;");
						var update = document.createElement("button");
						update.innerHTML = "Update installieren";
						update.addEventListener("click",function() {GM_openInTab('http://spin.jpr0g.info/userscripts/'+MPS.SCRIPT+'/mypersonalspin__'+MPS.SCRIPT.toLowerCase()+'.user.js');this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						var website = document.createElement("button");
						website.innerHTML = "zur Website";
						website.addEventListener("click",function() {GM_openInTab('http://spin.jpr0g.info/mps_'+MPS.SCRIPT.toLowerCase()+'.php');this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						var close = document.createElement("button");
						close.innerHTML = "ausblenden";
						close.addEventListener("click",function() {this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);},true);
						buttons.appendChild(update);
						buttons.appendChild(website);
						buttons.appendChild(close);
						wrapper.appendChild(buttons);
						var body = unsafeWindow.top.document.getElementsByTagName("body")[0];
						body.appendChild(wrapper);
					}
				} 
			});
		}
	}
	
	this.safeWrap = function(f) {
		return function() {
			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
		};
	}
}
var MPS = new MPS_LIBARY();
MPS.init();

var url = window.location.pathname;
config = new Config();
var config_form;

function Config() {
	
	this.default = function () {
		this.timeout_check = true;
		this.timeout_time = 15 * 60000;
		this.timeout_msg = "Bin gerade nicht da";	
		this.savedmsgs = new Array;
		this.show_loggedin = true;
	}
	
	this.load = function() {
		//Convert messages from old format
		if(GM_getValue("msgs") != null) {
			this.savedmsgs = new Array;
			var json = GM_getValue("msgs");	
			var msgs = eval('('+json+')');
			var i = 0;
			while(msgs[i] != null) {
				this.savedmsgs.push(msgs[i]);
				i++;	
			}
			GM_setValue("messages",JSON.stringify(this.savedmsgs));
			GM_deleteValue("msgs");
		}
		
		if(GM_getValue("show_loggedin") == null) {
			this.default();
		} else {
			if(GM_getValue("messages") == null)
				this.savedmsgs = new Array;
			else
				this.savedmsgs = JSON.parse(GM_getValue("messages"));
			this.show_loggedin = GM_getValue("show_loggedin");
			this.timeout_check = GM_getValue("timeout_check");
			this.timeout_time = GM_getValue("timeout_time");
			this.timeout_msg = GM_getValue("timeout_msg");
		}
	}
	
	this.addMsg = function (msg) {
		config.savedmsgs.push(msg);
		messagebox.addMsg(msg);
		config.saveMsgs();
	}
	
	this.isMsg = function(msg) {
		for(i=0;i<config.savedmsgs.length;i++)
			if(msg == config.savedmsgs[i])
				return true;
		return false;
	}
	
	this.delMsg = function(msg) {
		for(i=0;i<config.savedmsgs.length;i++) {
			if(msg == config.savedmsgs[i]) {
				config.savedmsgs.splice(i,1);
			}
		}
		config.saveMsgs();
		messagebox.reload();
	}
	
	this.saveMsgs = function() {
		GM_setValue("messages",JSON.stringify(this.savedmsgs));
	}
	
	this.save = function() {
		
		config.show_loggedin = (document.getElementById("mps_config_show_loggedin").getAttribute("value") == "1")?true:false;
		GM_setValue("show_loggedin",config.show_loggedin);
		
		if(config.show_loggedin)
			unsafeWindow.top.document.getElementById("mps_away_form").style.display = "inline";
		else
			unsafeWindow.top.document.getElementById("mps_away_form").style.display = "none";
			
		config.timeout_check = (document.getElementById("mps_config_timeout_check").getAttribute("value") == "1")?true:false;
		config.timeout_msg = document.getElementById("mps_config_timeout_msg").value;
		config.timeout_time = document.getElementById("mps_config_timeout_time").value * 60000;
				
		GM_setValue("timeout_check",config.timeout_check);
		GM_setValue("timeout_msg",config.timeout_msg);
		GM_setValue("timeout_time",config.timeout_time);
				
		config_form.showSaved();
		
	}
}

if(url.substr(0,6) == "/prefs") {
	
	function embeddedForm(title,desc) {
		
		this.title = (!title)?config.name:title;
		this.desc = (!desc)?'':desc;
		this.nav_link = null;
		this.box = null;
		this.fieldset = null;
		this.button_div = null;
		this.saved = false;
		
		this.init = function() {

			var allDivs = document.evaluate("//ul[@class='navlist']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var navdiv = allDivs.snapshotItem(0);
			var li = document.createElement("li");
			this.nav_link = document.createElement("a");
			this.nav_link.setAttribute("href","../prefs/?away");
			this.nav_link.appendChild(document.createTextNode(this.title));
			li.appendChild(this.nav_link);
			navdiv.appendChild(li);
			
			this.box = document.createElement("div");
			this.box.setAttribute("class","mbox");
			
			var form = document.createElement("form");
			form.setAttribute("class","autolayout checkunsaved");
			this.nav_link.addEventListener("submit",function(evt) {if (evt.preventDefault) {evt.preventDefault();}},true);
			
			this.fieldset = document.createElement("fieldset");
			
			var legend = document.createElement("legend");
			legend.appendChild(document.createTextNode(this.title));
			this.fieldset.appendChild(legend);
			
			var expl = document.createElement("div");
			expl.setAttribute("class","expl bottomm");
			expl.appendChild(document.createTextNode(this.desc));
			this.fieldset.appendChild(expl);
				
			this.button_div = document.createElement("div");
			this.button_div.setAttribute("class","expl");
			
			var button = document.createElement("button");
			button.appendChild(document.createTextNode("Einstellungen speichern"));
			button.addEventListener("click",function(evt) {if (evt.preventDefault) {evt.preventDefault();config.save();}},true);
			this.button_div.appendChild(button);
			
			this.fieldset.appendChild(this.button_div);
			form.appendChild(this.fieldset);
			this.box.appendChild(form);
			
		}
	
		this.createCheckbox = function(name,text,val) {
			var label = document.createElement("label");
			label.appendChild(document.createTextNode(text));
			
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type","checkbox");
			checkbox.setAttribute("value",(val)?"1":"0");
			checkbox.setAttribute("name","mps_config_"+name);
			checkbox.setAttribute("id","mps_config_"+name);
			
			if(val)
				checkbox.setAttribute("checked","checked");
				
			checkbox.addEventListener("click",function() {checkbox.setAttribute("value",(checkbox.getAttribute("value") == "1")?"0":"1");},true);
			
			label.appendChild(checkbox);
			
			
			return label;
		}
	
		this.createDescription = function(text) {
			var div = document.createElement("div");
			div.setAttribute("class","expl kl bottomm");
			div.appendChild(document.createTextNode(text));
			return div;
		}
		
		this.createLabel = function(text,name) {
			var label = document.createElement("label");
			label.appendChild(document.createTextNode(text));
			label.setAttribute("for","mps_config_"+name);
			return label;
		}
		
		this.createStepper = function(name,val,label,text) {
			var div = document.createElement("div");
			div.setAttribute("class","topm mask");
			
			var input = document.createElement("input");
			input.setAttribute("type","text");
			input.setAttribute("size","2");
			input.setAttribute("name","mps_config_"+name);
			input.setAttribute("id","mps_config_"+name);
			input.setAttribute("value",val);
					
			var stepper = document.createElement("div");
			stepper.setAttribute("style","display: inline;");

			var step_up = document.createElement("a");
			step_up.setAttribute("class","button");
			step_up.appendChild(document.createTextNode("+"));
			step_up.setAttribute("style","height: 16px; margin: 0; margin-bottom: 3px; margin-right: 2px; width: 8px;");
			step_up.addEventListener("click",function() {var sval = parseInt(document.getElementById("mps_config_"+name).getAttribute("value")); sval = (isNaN(sval))?0:sval+1; document.getElementById("mps_config_"+name).setAttribute("value",sval)},true);
			stepper.appendChild(step_up);
			
			var step_down = document.createElement("a");
			step_down.setAttribute("class","button");
			step_down.appendChild(document.createTextNode("-"));
			step_down.setAttribute("style","height: 16px; margin: 0; margin-bottom: 3px;  width: 8px; text-align: center;");
			step_down.addEventListener("click",function() {var sval = parseInt(document.getElementById("mps_config_"+name).getAttribute("value")); sval = (isNaN(sval))?0:sval-1; document.getElementById("mps_config_"+name).setAttribute("value",sval)},true);
			stepper.appendChild(step_down);
			
			div.appendChild(this.createLabel(label,name));
			div.appendChild(input);
			div.appendChild(stepper);
			div.appendChild(this.createDescription(text));
						
			return div;
		}
		
		this.createTextfield = function(name,val,size,label,text) {
			var div = document.createElement("div");
			div.setAttribute("class","topm mask");
			
			var input = document.createElement("input");
			input.setAttribute("type","text");
			input.setAttribute("size",size);
			input.setAttribute("name","mps_config_"+name);
			input.setAttribute("id","mps_config_"+name);
			input.setAttribute("value",val);
			
			div.appendChild(this.createLabel(label,name));
			div.appendChild(input);
			div.appendChild(this.createDescription(text));
			
			return div;
		}
		
		this.appendElements = function(elem1,elem2) {
			var div = document.createElement("div");
			div.setAttribute("class","reversed");
			
			var spacediv = document.createElement("div");
			spacediv.setAttribute("style","margin-top:1.8em");
			
			for (var i=0; i<this.appendElements.arguments.length; i++) {
				div.appendChild(this.appendElements.arguments[i]);
				this.fieldset.insertBefore(div,this.button_div);
			}
		}
		
		this.appendElement = function(elem) {
			this.fieldset.insertBefore(elem,this.button_div);
		}

		this.show = function(e) {
		
			var allDivs = document.evaluate("//ul[@class='navlist']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var navdiv = allDivs.snapshotItem(0);
			
			for(var i=0; i < navdiv.childNodes.length; i++) {
				if(navdiv.childNodes[i].nodeName == "LI") {
					if(navdiv.childNodes[i].childNodes[0].nodeName == "B") {
						var text = navdiv.childNodes[i].childNodes[0].innerHTML;
						var a = document.createElement("a");
						a.appendChild(document.createTextNode(text));
						var href = "#";
						if(text.substr(0,6) == "Privat") {
							href = "index";
						} 						
						a.setAttribute("href",href);
						navdiv.childNodes[i].replaceChild(a,navdiv.childNodes[i].childNodes[0]);;
					}
				}
			}
					
			config_form.nav_link.style.fontWeight = 'bold';
			config_form.nav_link.style.color = '#000000';
			var content = document.getElementById("content");
			content.innerHTML = "";
			
			content.appendChild(config_form.box);
			
		}
		
		this.showSaved = function() {
			if(!config_form.saved) {
				var div = document.createElement("div");
				div.setAttribute("class","status expl");
				div.setAttribute("style","margin-top: 1.8em;");
				div.appendChild(document.createTextNode("Einstellungen wurden gespeichert."));
				config_form.appendElement(div);
				config_form.saved = true;
			}
			unsafeWindow.FormSupport.changed = false;
		}
	}
	
	config_form = new embeddedForm("Abwesenheitsmodus","");
	config_form.init();
	
	config.load();

	config_form.appendElements(config_form.createCheckbox("show_loggedin","zusätzliche Abwesenheits-Eingabe anzeigen",config.show_loggedin),config_form.createDescription("Zeigt ein weiteres Eingabefeld für den Abwesenheitsmodus direkt neben dem Suchfeld an."),config_form.createCheckbox("timeout_check","automatischen Abwesenheitsmodus akivieren",config.timeout_check),config_form.createDescription("Mit dieser Option wechselst du bei Inaktivität nach einer festgelegten Zeit in den Abwesenheitsmodus."));
	
	config_form.appendElement(config_form.createStepper("timeout_time",config.timeout_time/60000,"Inaktivitätszeit","Nach dieser Zeit in Minuten wechselst du in den Abwesenheitsmodus, wenn die entsprechende Option aktiviert ist."));
	
	config_form.appendElement(config_form.createTextfield("timeout_msg",config.timeout_msg,30,"autom. Nachricht","Hier legst du die Nachricht fest, die bei Inaktvität automatisch eingestellt wird."));

	var page = window.location.search;
	if(page == "?away")
		config_form.show();

}

if(url == "/login/chatinfo") {

	var messagebox;
	var onmsgs = false;
	var win = null;
	var time_intvalID = -1;
	var action_intvalID = -1;
	var away_time = 0;
	var awaymanager = null;

	function MessageBox() {
		
		this.div = document.createElement("div");	
		this.div.setAttribute("id","awaymsgbox");
		this.div.setAttribute("style","display: none; position: relative; top: 25px; left: 0px; background-color: #ffffff; border: 1px solid #000000; z-index: 100; padding: 5px; padding-right: 20px; max-height: 250px; overflow: auto;");
	
		this.div_copy = document.createElement("div");	
		this.div_copy.setAttribute("id","awaymsgbox_copy");
		this.div_copy.setAttribute("style","display: none; position: relative; top: 25px; left: 0px; background-color: #ffffff; border: 1px solid #000000; z-index: 100; padding: 5px; padding-right: 20px; max-height: 250px; overflow: auto;");
		
		this.reload = function() {
			messagebox.div.innerHTML = "";
			messagebox.div_copy.innerHTML = "";
			for(var i = 0; i < config.savedmsgs.length; i++) {
				messagebox.addMsg(config.savedmsgs[i]);
			}
		}
		
		this.addMsg = function(msg) {
			var div = document.createElement("div");
			div.setAttribute("style","cursor: pointer;");
			div.addEventListener("mousemove",function() {onmsgs = true;},true);
			div.addEventListener("mouseout",function() {onmsgs = false;},true);
			div.addEventListener("mouseup",function() {onmsgs = false; messagebox.hide();},true);
			var del = document.createElement("span");
			del.addEventListener("click",function() {config.delMsg(msg);},true);
			del.appendChild(document.createTextNode("X"));
			del.setAttribute("style","color: #ff0000;");
			div.appendChild(del);
			var set = document.createElement("span");
			set.appendChild(document.createTextNode(" "+msg));
			set.addEventListener("mousedown",function (){onmsgs = false; messagebox.hide(); win.input.value = msg; awaymanager.setAway();},true);
			div.appendChild(set);
			messagebox.div.appendChild(div);
			
			div = document.createElement("div");
			div.setAttribute("style","cursor: pointer;");
			div.addEventListener("mousemove",function() {onmsgs = true;},true);
			div.addEventListener("mouseout",function() {onmsgs = false;},true);
			div.addEventListener("mouseup",function() {onmsgs = false; messagebox.hide();},true);
			var del = document.createElement("span");
			del.addEventListener("click",function() {config.delMsg(msg);},true);
			del.appendChild(document.createTextNode("X"));
			del.setAttribute("style","color: #ff0000;");
			div.appendChild(del);
			var set = document.createElement("span");
			set.setAttribute("style","color: #000000;");
			set.appendChild(document.createTextNode(" "+msg));
			set.addEventListener("mousedown",function (){onmsgs = false; messagebox.hide(); win.input.value = msg; awaymanager.setAway();},true);
			div.appendChild(set);
			messagebox.div_copy.appendChild(div);
		}
		
		this.show = function() {
			if(config.savedmsgs.length != 0) {
				messagebox.div.style.display = "block";
				messagebox.div.style.top = "0px";
				messagebox.div.style.left = "0px";
				win.input.style.color = "#000000";
				win.input.value = "";
			}
		}
		
		this.show_copy = function() {
			if(config.savedmsgs.length != 0) {
				messagebox.div_copy.style.display = "block";
				win.input_copy.style.color = "#000000";
				win.input_copy.value = "";
			}
		}
	
		this.hide = function() {
			if(!onmsgs) {
				messagebox.div.style.display = "none";
				messagebox.div_copy.style.display = "none";
				win.input.style.color = "#888888";
				win.input_copy.style.color = "#888888";
			}
		}
	}

	function AwayManager() {
		
		this.toggleaway = function() {
			messagebox.hide();
			if(win.Chat.connectionState==1){
				awaymanager.delAway();
			} else {
				awaymanager.setAway();
			}
		}
		
		this.delAway = function() {
			if(win.Chat.connectionState==1){
				if(win.Chat.delAway())
					win.button.innerHTML = 'Aktivieren';
					win.button_copy.innerHTML = 'Aktivieren';
					if(time_intvalID != -1) {
					   clearInterval(time_intvalID);
					   time_intvalID = -1;
					}
			} 
		}
		
		this.setAway = function() {
	
			var msg = win.input.value;
			win.input_copy.value = win.input.value;
			win.button.innerHTML = "Deaktivieren"
			win.button_copy.innerHTML = "Deaktivieren";
			var time = msg.search(/.*\[TIME\].*/i);
			var save_msg = msg;
			var intvalID = 0;
			if (time != -1) {
				msg = msg.replace(/\[TIME\]/i,"00:00");
				win.input.value = msg;
				var now = new Date();
				away_time = now.getTime();
				intvalID = setInterval(reload_time,15000);
			}
			
			win.Chat.setAway(win.Spin.registered?msg:'Bin gerade nicht da');
				
			if(!config.isMsg(save_msg) && time_intvalID == -1) {
				config.addMsg(save_msg);
			}
			if(time != -1)
				time_intvalID = intvalID;
		}
		
	}
	
	function Chatinfo() {
					
		this.Chat = unsafeWindow.top.Chat;
		this.Spin = unsafeWindow.top.Spin;
		
		this.input = unsafeWindow.document.getElementById("awaymsg");
		
		this.button_copy = unsafeWindow.top.document.getElementById("awaybut");
		this.button = unsafeWindow.document.getElementById("awaybut");
		
		this.loggedin_form = document.createElement("td");
		
		this.init = function() {
			messagebox.div.style.left = "-10px";
			messagebox.div.style.top = "-10px";
				
			this.input.parentNode.appendChild(messagebox.div);	
			this.input.addEventListener('click',messagebox.show,true);
			this.input.setAttribute("autocomplete","off");
			this.button.onclick = null;
			this.button.addEventListener('click',awaymanager.toggleaway,true);
			
			var config_button = document.createElement("button");
			config_button.setAttribute("style","border: 0; background: none;");
			var config_img = document.createElement("img");
			config_img.setAttribute("src","http://im.spin.de/static/image/icon/customize.png");
			config_button.appendChild(config_img);
			config_button.addEventListener("click",function() {unsafeWindow.top.TabManager.showInMain('/prefs/?away')},true);
			document.getElementById("upper2").childNodes[1].appendChild(config_button);
			
			messagebox.div_copy.style.top = "25px";
			messagebox.div_copy.style.left = "15px";
			
			var searchfield = unsafeWindow.top.document.getElementById("srchfld");
			this.loggedin_form.setAttribute("style","display: none;");
			
			if(config.show_loggedin)
				this.loggedin_form.style.display = "inline";
			
			this.input_copy = document.createElement("input");
			this.input_copy.setAttribute("id","awaymsg");
			this.input_copy.setAttribute("name","awaymsg");
			this.input_copy.setAttribute("class","autoselect");
			this.input_copy.setAttribute("value","Bin gerade nicht da");
			this.input_copy.setAttribute("maxlength","200");
			this.input_copy.setAttribute("autocomplete","off");
			this.input_copy.setAttribute("style","color: #888888; position: absolute; left: 190px; top: 0px; width: 130px;");
			this.input_copy.setAttribute("type","text");
			this.input_copy.addEventListener('click',messagebox.show_copy,true);
			this.input_copy.addEventListener('blur',messagebox.hide,true);
			this.loggedin_form.appendChild(this.input_copy);
			this.button_copy = document.createElement("button");
			this.button_copy.setAttribute("id","awaybut");
			this.button_copy.setAttribute("type","button");
			this.button_copy.setAttribute("style"," position: absolute; left: 330px; top: -2px; height: 20px; ");
			this.button_copy.appendChild(document.createTextNode("Aktivieren"));
			this.button_copy.addEventListener('click',function() { win.input.value = win.input_copy.value; awaymanager.toggleaway();},true);
			this.loggedin_form.appendChild(document.createTextNode(" "));
			this.loggedin_form.appendChild(this.button_copy);
			this.loggedin_form.appendChild(messagebox.div_copy);
			this.loggedin_form.setAttribute("id","mps_away_form");
			searchfield.parentNode.parentNode.parentNode.appendChild(this.loggedin_form);	
		}	
	}

	function reload_time() {
		var msg = win.input.value	
		var result = msg.match(/[0-9]{1}[0-9]{1}:[0-9]{1}[0-9]{1}/);
		
		if(result) {
			var now = new Date();
			var diff = (now.getTime() - away_time) / 1000;
			if(diff >= 60) {
				diff = Math.round(diff / 60)
				var m = diff % 60;
				var h = (diff - m) / 60;
				
				var time = ((h < 10)?"0":"")+h+":"+((m < 10)?"0":"")+m;
				msg = msg.replace(result[0],time);
				win.input.value = msg;
				awaymanager.setAway();
			}
		}
	}


	function checkAction() {
		var now = new Date();
		var last_action = GM_getValue("last_action",0);
		if((now.getTime() - last_action) >= config.timeout_time) {
			if(win.Chat.connectionState == 2) {
					GM_setValue("saved_away_msg",win.input.value);
					win.input.value = config.timeout_msg;
					win.input_copy.value = config.timeout_msg;
					awaymanager.toggleaway();
					GM_setValue("inactiv",true);
			}
		}
	}

	messagebox = new MessageBox();
	awaymanager = new AwayManager();

	config.load();
	messagebox.reload();

	win = new Chatinfo();
	win.init();
	
	if(config.timeout_check)
		action_intvalID = setInterval(checkAction,30000);
}

	
var semaphore = 0;
	
function actionPerformed(e) {
	if(semaphore == 0) {
		semaphore = 1;
		var now = new Date();
		GM_setValue("last_action",String(now.getTime()));
		var inactiv = GM_getValue("inactiv",false);
		if(inactiv) {			
			var win = null;
			
			if(unsafeWindow.Chat != null) {
				win = unsafeWindow;
			} else if(unsafeWindow.top.Chat != null) {
				win = unsafeWindow.top;
			}
			if(win.Chat != null) {	
				if(win.Chat.connectionState == 1) {
					win.Chat.delAway();
					win.document.getElementById("chatinfofrm").contentDocument.getElementById("awaybut").innerHTML = "Aktivieren";
					win.document.getElementById("awaybut").innerHTML = "Aktivieren";
					win.document.getElementById("awaymsg").value = GM_getValue("saved_away_msg","Bin gerade nicht da");
					win.document.getElementById("chatinfofrm").contentDocument.getElementById("awaymsg").value = GM_getValue("saved_away_msg","Bin gerade nicht da");
				}
			}
			
			GM_setValue("inactiv",false);
		}
		semaphore = 0;
	}
}
	
	
unsafeWindow.addEventListener("mousemove",actionPerformed,true);
unsafeWindow.addEventListener("keydown",actionPerformed,true);	

if(unsafeWindow.handleCommand) {
	var prototype = unsafeWindow.handleCommand;
	unsafeWindow.handleCommand = function(c,a,w) {
		var i = c.indexOf(' ');
		if(i > 2)
			var cmd = c.substr(1,i-1); 
		else
			var cmd = c.substr(1,c.length);
		var tmp = c.substr(i+1,c.length);
		var win = unsafeWindow.top;

		if(i < 2 && (cmd == "away" || cmd == "back")) {
			win.document.getElementById("chatinfofrm").contentDocument.getElementById("awaybut").innerHTML = "Aktivieren";
			win.document.getElementById("awaybut").innerHTML = "Aktivieren";
		} else if(cmd == "away") {			
			win.document.getElementById("chatinfofrm").contentDocument.getElementById("awaybut").innerHTML = "Deaktivieren";
			win.document.getElementById("awaybut").innerHTML = "Deaktivieren";
			win.document.getElementById("awaymsg").value = tmp;
			win.document.getElementById("chatinfofrm").contentDocument.getElementById("awaymsg").value = tmp;
		}
		return prototype(c,a,w);
	};
}