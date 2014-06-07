// ==UserScript==
// @name           AutoSpick Network
// @namespace      SpickMich.de
// @description    AutoSpick Network
// @include        *spickmich.de/home
// @include        *spickmich.de/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js 
// ==/UserScript==

var JQ=document.createElement('script');JQ.src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';JQ.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(JQ);function JQw(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(JQw,100);}else{$=unsafeWindow.jQuery;jqs();}}JQw();
//Start Working
function jqs() {
	$("body").append("<style>"+
					 ".progressborder { height:12px; width:100%; border:1px solid silver; }"+
					 ".progress { height:12px; position:relative; left:0px; background: transparent url(http://content.spickmich.de/images/s/etc/rank_bar.jpg) repeat-x scroll 0% 0%; }"+
					 "#userlist { list-style:none; }"+
					 "#userlist li { width:125px; font-weight:bold; font-size:0.7em; }"+
					 "#messagebox { position:relative; top:200px; left:125px; width:500px; border:1px solid silver; }"+
					 "#spicknetwork #settings { margin: 5px 0pt 10px; font-size: 8pt; color: rgb(238, 141, 28); }"+
					 "#messagebox .message { position:relative; overflow:auto; height:65px; padding:15px; background: transparent url(http://content.spickmich.de/images/s/header/header_blue_boxed.png) repeat scroll -200px 0pt; }"+
					 "#messagebox .message a { color:#9F1516; font-weight:bold; }"+
					 "#messagebox .message .close { position:absolute; top:0px; left:0px; font-weight:bold; color:#9F1516; padding:0px 2px; cursor:pointer; }"+
					 "#spicknetwork #usercount { color:#007870; font-weight:bold; font-size:0.7em; padding:5px 0px;}"+
					 "</style>");
	$("#nav_inner #mainmenu").after("<div id=\"spicknetwork\" class=\"box\">"+
									"<h3>AutoSpick-Netzwerk</h3>"+
									"<ul id=\"userlist\">"+
									"</ul>"+
									"<p id=\"usercount\"></p>"+
									"<a href=\"#\" id=\"settings\">&raquo; Einstellungen</a>"+
									"</div>");
	$("#spicknetwork a#settings").click(function() {
		showOptions();
		return false;
	});

	var sid = getUserId($("#p a.framed:eq(0) img").attr("src")); // SID auslesen
	var username = $("#p a.framed:eq(0)").attr("href").replace(/\/profil\//,""); // Username auslesen
	Work(sid,username);
}

function randomcount(mi,ma){return Math.round(mi + ma*(Math.random()));}

function getUserId(object) { var splits = object.split("/"); var lastindex = splits.length-1; return splits[lastindex].replace(/120_/,"").replace(/\.jpg/,"");}

function makeMessageWindow(messages) {
	if(messages != null) {
		if(!$("#outer_frame #messagebox").length > 0 && messages.length > 0) {
			$("#outer_frame").append("<div id=\"messagebox\"></div>");
		}
		messages.each(function(x) {
			//console.log(this);
			$("#outer_frame #messagebox").append("<div class=\"message\" style=\"display:none;\" id=\"message-"+x+"\"></div>");
			$("#outer_frame #messagebox #message-"+x).html($(this).text());
			$("#outer_frame #messagebox #message-"+x).append("<div class=\"close\">X</div>");
			$("#outer_frame #messagebox #message-"+x+" .close").click(function() {
				var messagebox = $(this).parent().parent();
				$(this).parent().fadeOut("fast",function(){
					$(this).remove();
					if(messagebox.children("*").length < 1) { messagebox.remove(); }
				});
			});
			$("#outer_frame #messagebox #message-"+x).fadeIn("slow")
		});
	}
}

function Work(sid,un) {
	var updateintervall = 120; //Set the Updateintervall in Seconds
	//console.log("Recive UserList from Server...");
	setTimeout(function(){
		var anonym = GM_getValue("anonym",0);
		var progress = GM_getValue("viewprogressbar",1);
		GM_xmlhttpRequest({method: 'GET', url: 'http://spimi.nysoft.de/spick_network.php?mode=getspicklist&anonym='+anonym+'&version=1&sid='+sid+'&un='+un, headers: { 'User-agent': 'Mozilla/5.0 (compatible) NySoft SpickNetwork', 'Accept': 'text/xml' }, onload: function(ans) {

			if($(ans.responseText).length > 0) {
				//console.log("Recived Servers UserList.");
				var userarr = new Array();
				//console.log(ans.responseText);
				$(ans.responseText).find("user").each(function(x) {
					var usid = $(this).text();
					if(usid != sid) {
						var username = $(this).attr("username");
						var user = $("#spicknetwork li#"+$(this).text());
						userarr.push(usid);
						if(user.length < 1) {
							$("#spicknetwork ul").append(makeUserItem(usid,username,progress));
							$("#spicknetwork ul li#"+usid).fadeIn("slow");
							var index = $("#spicknetwork ul li").index($("li#"+usid));
							setTimeout(function(){spick(usid);makeUserProgress(usid);},randomcount((10000*index),(200*index)));
						}
					}
				});
				$("#spicknetwork li.user").each(function() {
					if($.inArray($(this).attr("id"),userarr) < 0) {
						$(this).fadeOut("fast",function(){ $(this).remove(); });	
					}
				});
				makeMessageWindow($(ans.responseText).find("message"));
				//console.log("Start Intervall for next Update. Intervall: "+(updateintervall*1000)+"ms");
				setTimeout(function(){Work(sid,un);},(updateintervall*1000));
				setUserCount();
			}
		}, onerror:function(a){/*console.log(a.statusText);*/}});
	},0);
}

function makeUserItem(sid,username,prog) {
	prog = prog;
	var content = "<a href=\"http://spickmich.de/profil/"+sid+"\" target=\"_blank\">"+username+"</a>";
	if(username == "Anonym") content = username;
	if(prog) {
		return "<li style=\"display:none;\" class=\"user\" id=\""+sid+"\">"+content+"<br /><div class=\"progressborder\"><div style=\"width:0%;\" class=\"progress\"></div></div></li>";
	} else {
		return "<li style=\"display:none;\" class=\"user\" id=\""+sid+"\">"+content+"</div></li>";
	}
}

function setUserCount() {
	var count = $("#spicknetwork li").length;
	$("#spicknetwork #usercount").text("Online: "+count+" User");
}

function makeUserProgress(sid,count) {
	setTimeout(function(){
		var progress = GM_getValue("viewprogressbar",1);
		flow = 2; //Flusskontrolle. Gibt an wie fl�ssig die ProgressBar l�uft. H�her = fl�ssiger aber ben�tigt mehr Leistung des Browsers.
		count = count || 0;
		var obj = $("#spicknetwork #"+sid);
		var usercount = $("#spicknetwork li").length;
		if(obj.length > 0) {
			if(count < (100*flow)) {
				count=count+1;
				if(progress) obj.children(".progressborder").children(".progress").css({"width":(count/2)+"%"});
				setTimeout(function() {makeUserProgress(sid,count);},((400+(usercount*100))/flow));
			} else {
				//console.log("Spick SID ["+sid+"]");
				spick(sid);
				count = 0;
				if(progress) obj.children(".progressborder").children(".progress").css({"width":count+"%"});
				setTimeout(function() {makeUserProgress(sid,count);},randomcount(500,600));
				setUserCount();
			}
		}
	},0);
}

function spick(sid) { $.ajax({url:"http://www.spickmich.de/spick/"+sid, async:true, type:"GET", success:function(msg,stat) { if(msg.length > 0) { var form = $(msg).find("#mainContent #p #spickBox #spickOk");	var t = form.children("input[name=t]").val();	var th = form.children("input[name=th]").val();	$.post("http://www.spickmich.de/spick/"+sid,{hash:"",spick:"1",t: form.children("input[name=t]").val(), th: form.children("input[name=th]").val()});}}});}


/************** Make OptionsDialog *********************/
function showOptions() {
	setTimeout(function() {
		var sid = getUserId($("#p a.framed:eq(0) img").attr("src"));
		var contentoptionsform = "";
		contentoptionsform = contentoptionsform + renderHeading("Allgemein");
		contentoptionsform = contentoptionsform + renderText("Deine SID",sid);
		contentoptionsform = contentoptionsform + renderCheckbox("Anonym im Spick Netzwerk","anonym",1,0);
		contentoptionsform = contentoptionsform + renderHeading("Leistung");
		contentoptionsform = contentoptionsform + renderCheckbox("Fortschrittsbalken anzeigen","viewprogressbar",1,1); // X

		$("body").append("<div id=\"optionsbackground\" style=\"z-index:900; position:fixed; width:100%; height:100%; background-color:grey; float:left;\"></div><div id=\"cleanoptionsdialog\" style=\"z-index:901; position:fixed; margin-left:50%; left:-300px; top:100px; width:600px; max-height:600px; overflow:auto; border:1px solid silver; background:#F6F9FB; text-align:left;\">"+contentoptionsform+"<div style=\"float:left; margin-top:20px; width:580px; text-align:center;\"><button style=\"margin:0 10px; font-weight:bold;\" class=\"simpleButton\" id=\"saveandclose\">Speichern und Schlie&szlig;en</button><button style=\"margin:0 10px; font-weight:bold;\" class=\"simpleButtonDanger\" id=\"close\">Abbrechen</button></div><br style=\"clear:both;\" /></div>");
		$("#cleanoptionsdialog #saveandclose").click(function(){ var form = $(this).parent().parent(); saveOptions(form); });
		$("#cleanoptionsdialog #close").click(function() {$("#optionsbackground,#cleanoptionsdialog").fadeOut("slow",function(){$(this).remove();});});
	},0);
}

function saveOptions(object) {
	$(object).find("input").each(function() {
		if($(this).attr("type") != "button") {
			var name = $(this).attr("name");
			var value = $(this).val();
			switch($(this).attr("type")) {
				case"checkbox":
					if($(this).is(":checked")) {
						setTimeout(function(){


						GM_setValue(name,value);
						//console.log("Save: "+name+" Value: "+value+" Saved: "+GM_getValue(name,0));
						},0);
					} else {
						setTimeout(function(){
						GM_setValue(name,0);
						//console.log("Save: "+name+" Value: 0 Saved: "+GM_getValue(name,0));
						},0);
					}
				break;
				case"text":
					setTimeout(function(){
					GM_setValue(name,value);
					//console.log("Save: "+name+" Value: "+$(this).val()+" Saved: "+GM_getValue(name,0));
					},0);
				break;
				case"password":
					setTimeout(function(){
					GM_setValue(name,value);
					//console.log("Save: "+name+" Value: "+$(this).val()+" Saved: "+GM_getValue(name,0));
					},0);
				break;
				case"radio":
					if($(this).is(":checked") == "checked") {
						setTimeout(function(){
						GM_setValue(name,value);
						//console.log("Save: "+name+" Value: "+GM_getValue(name,0));
						},0);
					} else {
						setTimeout(function(){
						GM_setValue(name,0);
						//console.log("Save: "+name+" Value: "+GM_getValue(name,0));
						},0);
					}
				break;
			}
		}
	});
	$("#optionsbackground,#cleanoptionsdialog").fadeOut("slow",function(){$(this).remove();});
}

function renderHeading(text) {
	return "<div style=\"margin-left:5px; margin-top:20px; width:575px;\"><h2>"+text+"</h2></div>";
}
function renderSubHeading(text) {
	return "<div style=\"margin-left:10px; margin-top:20px; width:570px;\"><h3>"+text+"</h3></div>";
}
function renderText(text,value) {
	return "<div id=\"container-text\" style=\"margin-left:10px; width:570px; border-bottom:1px solid silver; margin-top:10px;\">"+
	"<label style=\"min-width:350px; display:inline-block;\">"+text+"</label><span>"+value+"</span>"+
	"</div>";
}
function renderCheckbox(text,name,value,def) {
	var checked = "";
	if(GM_getValue(name,def) == value) checked = "checked=\"checked\"";
	return "<div id=\"container-checkbox-"+name+"\" style=\"margin-left:10px; width:570px; border-bottom:1px solid silver; margin-top:10px;\">"+
	"<label for=\""+name+"\" style=\"min-width:350px; display:inline-block;\">"+text+"</label><input type=\"checkbox\" id=\"checkbox-"+name+"\" name=\""+name+"\" value=\""+value+"\" "+checked+" />"+
	"</div>";
}
function renderTextfield(text,name,def) {
	return "<div id=\"container-textfield-"+name+"\" style=\"margin-left:10px; width:570px; border-bottom:1px solid silver; margin-top:10px;\">"+
	"<label for=\""+name+"\" style=\"min-width:350px; display:inline-block;\">"+text+"</label><input type=\"text\" id=\"textfield-"+name+"\" name=\""+name+"\" value=\""+GM_getValue(name,def)+"\"/>"+
	"</div>";
}
function renderPasswordfield(text,name,def) {
	return "<div id=\"container-passwordfield-"+name+"\" style=\"margin-left:10px; width:570px; border-bottom:1px solid silver; margin-top:10px;\">"+
	"<label for=\""+name+"\" style=\"min-width:350px; display:inline-block;\">"+text+"</label><input type=\"password\" id=\"passwordfield-"+name+"\" name=\""+name+"\" value=\""+GM_getValue(name,def)+"\"/>"+
	"</div>";
}
function renderRadiobutton(text,name,value,def) {

	var checked = "";
	if(GM_getValue(name,def) == value) checked = "checked=\"checked\"";
	return "<div id=\"container-radio-"+name+"\" style=\"width:590px; border-bottom:1px solid silver; margin-top:10px;\">"+
	"<input type=\"radio\" id=\"radio-"+name+"\" name=\""+name+"\" value=\""+value+"\" "+checked+" /><p>"+text+"</p>"+
	"</div>";
}

// Copyright by unknown