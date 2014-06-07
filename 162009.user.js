// ==UserScript==
// @name			EMjack
// @version			2.5
// @description		Some crap you may find useful.
// @match			https://epicmafia.com/game/*
// @match			http://userscripts.org/scripts/source/*
// ==/UserScript==

//Welcome back
function EMjack() {

	//public
	window.ej={
		name: "EMjack",
		version: 2.5,
		meta: new Object()
		}
	ej.fname=ej.name+ej.version;

	//variables
	var	afk=false,
		meet=null,
		master=null,
		bubble=null,
		roulette=null,
		rouletteOn=null,
		kicktimer=0,
		antidc=false,
		autokick=!ranked,
		autobomb=false,
		autowill=false,
		auth=false,
		morse=false,
		users=new Object();
	window.development=false;

	//setup
	var	sock=null,
		cmds=$("#cmds").scope(),
		log=function(a,classes) {
			cmds.log(a,(classes||"")+" emjack");
			}

	//avoid collision
	if(!window.SockJS) {
		log("EMjack disabled.");
		log("Socket library changed. Again.");
		return;
		}

	//plug in
	cmds.execute_cmds=function(initial) {
		return function(pkg) {
			initJack(pkg);
			initial(pkg);
			execJack(pkg);
			};
		}(cmds.execute_cmds);
	SockJS.prototype._dispatchOpen=function(initial) {
		return function() {
			sock=this;
			initial.apply(this,arguments);
			}
		}(SockJS.prototype._dispatchOpen);
	SockJS.prototype._dispatchMessage=function(initial) {
		return function() {
			if(sock===null) {
				sock=this;
				}
			initial.apply(this,arguments);
			}
		}(SockJS.prototype._dispatchMessage);

	//sock wrapper
	var	socket=new Object();

	//sock cmd
	socket.cmd=function(cmd,data) {
		sock.send(JSON.stringify([cmd,data]));
		};

	//sock chat
	socket.chat=function(message,direct) {
		if(direct!==undefined) {
			message="@"+direct+" "+message;
			}
		socket.cmd("<",{
			meet:meet,
			msg:message
			});
		};

	//sock vote
	socket.vote=function(vote,meeting) {
		socket.cmd("point",{
			meet:meeting===undefined?meet:meeting,
			target:vote
			});
		};

	//sock dc wrapper
	socket.dcfunc=function(callback) {
		cmds.redirect_back=callback;
		socket.cmd("leave");
		};

	//the management
	function initJack(pkg) {
		for(var i=0,cmd,data;i<pkg.length;i++) {
			cmd=pkg[i][0];
			data=pkg[i][1];
			switch(cmd) {
				case "redirect":
					if(antidc) {
						pkg[i][0]=null;
						}
					break;
				}
			}
		}
	function execJack(pkg) {
		for(var i=0;i<pkg.length;i++) {
			console.log(pkg[i][0], pkg[i][1]);
			if(ej.cmd[pkg[i][0]]) {
				ej.cmd[pkg[i][0]].call(pkg[i][1],pkg[i][1]);
				}
			}
		}

	//morse code
	ej.mor=function(user) {
		if(ej.mor[user.morse.id]) {
			ej.mor[user.morse.id](user,user.morse.code);
			}
		}
	ej.mor.txt=function(id,code) {
		return "["+Array(id+1).join(".")+" "+Array(code+1).join(".")+"]";
		}
	ej.mor.log=function(user,id,message) {
		if(morse) {
			if(!message) {
				message=user.morse.code;
				}
			log("> "+user.name+" "+this.txt(user.morse.id,user.morse.code)+": "+id+": "+message);
			}
		}
	ej.mor.send=function(id,code,message) {
		socket.cmd("u");
		for(var i=0;i<id;i++) {
			socket.cmd("k");
			}
		socket.cmd("u");
		for(var i=0;i<code;i++) {
			socket.cmd("k");
			}
		socket.cmd("u");
		if(morse) {
			log("< * "+this.txt(id,code)+" "+(message||""));
			}
		}

	//morse script version
	ej.mor[2]=function(user) {
		this.log(user,"get version");
		this.send(3,ej.version*10-20,"send version");
		}
	ej.mor[3]=function(user,code) {
		this.log(user,"send version",2+code/10);
		}

	//morse roll call
	ej.mor[4]=function(user) {
		this.log(user,"roll call");
		}

	//standard cmds
	ej.cmd={
		"a": function() {
			auth=true;
			if(!options.fastgame) {
				socket.cmd("option",{
					field:"fastgame"
					});
				}
			if(!options.nospectate) {
				socket.cmd("option",{
					field:"nospectate"
					});
				}
			ej.mor.send(4,0,"roll call");
			},
		"o": function() {
			if(this.data.lastwill&&autowill) {
				cmds.lastwill=user+"/"+u(user).role;
				socket.cmd("will",{
					msg:cmds.lastwill
					});
				}
			},
		"ro": function() {
			for(var x in users) {
				users[x].voted=false;
				}
			},
		"uu": function(data) {
			for(var x in data.users) {
				new User(data.users[x]);
				}
			requestAnimationFrame(function() {
				for(x in data.users) {
					$(".user_li[data-uname="+x+"]")
						.attr("title", notes[x]||"no notes for "+x);
					}
				});
			me=u(user);
			},
		"anonymous_players": function() {
			for(var x in users) {
				delete users[x];
				}
			for(var i=0;i<this.players.length;i++) {
				new User(this.players[i]);
				}
			},
		"anonymous_reveal": function() {
			if(this.user===user) {
				me=u(this.mask);
				}
			},
		"join": function() {
			new User(this.data);
			log(this.user+" has joined");
			if(/autokick/.test(notes[this.user])) {
				socket.cmd("ban",{
					uid:this.data.id
					});
				notes[this.user]=notes[this.user]
					.replace(/autokick x (\d+)/, function(full, x) {
						if(--x<=0) {
							return "";
							}
						return "autokick x "+x;
						});
				}
			else {
				var	user=this.user;
				requestAnimationFrame(function() {
					$(".user_li.ng-scope[data-uname="+user+"]")
						.attr("title", notes[user]||"no notes for "+user);
					});
				}
			},
		"leave": function() {
			delete users[this.user];
			log(this.user+" has left");
			},
		"kick": function() {
			u(this.user).dead=true;
			},
		"kk": function() {
			u(this.target).dead=true;
			},
		"k": function() {
			u(this.user).morse.code++;
			},
		"u": function() {
			var	user=u(this.user);
			if(Date.now()-user.morse.clock>100) {
				user.morse.id=0;
				}
			if(user.morse.id) {
				ej.mor(user);
				user.morse.id=0;
				}
			else if(user.morse.code>=2) {
				user.morse.id=user.morse.code;
				}
			user.morse.code=0;
			user.morse.clock=Date.now();
			},
		"<": function() {
			if(auth) {
				if(slave&&this.directed===user) {
					bot.eval(this.msg,this);
					}
				}
			},
		"speech": function() {
			if(this.type==="contact") {
				log("The roles are... "+this.data.join(", "));
				}
			},
		"m": function() {
			if(this.say) {
				meet=this.meet;
				for(var i=0;i<this.members.length;i++) {
					u(this.members[i]).meet=this.meet;
					}
				}
			switch(this.meet) {
				case "gun":
					$("#meetbox_village").before($("#meetbox_gun"));
					break;
				case "mafia":
					if(auth&&cmds.gamestate===1&&!this.hasdisguise&&!ranked) {
						socket.chat(me.role);
						}
				case "thief":
					me.mafia=true;
					var	userlist=users.list;
					for(var i=0,name;i<userlist.length;i++) {
						name=userlist[i];
						if(!this.choosedata[name]) {
							u(name).mafia=true;
							log(name+" is your partner!");
							if(!cmds.current_users[name].revealed) {
								cmds.select_role(name, "mafia");
								}
							}
						}
					break;
				}
			if(afk) {
				socket.vote(this.basket[0],this.meet);
				}
			},
		"end_meet": function() {
			if(this.say) {
				var	meet=this.meet;
				users.find(function() {
					return this.meet===meet;
					}).forEach(function(name) {
						u(name).meet=null;
						});
				}
			},
		"point": function() {
			u(this.user).voted=!this.unpoint;
			},
		"reveal": function() {
			u(this.user).role=this.data;
			if(!u(this.user).dead) {
				if(this.user===user) {
					log("Your role is now "+this.data);
					}
				else {
					log(this.user+" is a "+this.data);
					}
				}
			},
		"countdown": function() {
			if(afk||autokick) {
				clearTimeout(kicktimer);
				kicktimer=setTimeout(function() {
					socket.cmd("kick");
					},this.totaltime);
				}
			}
		}
	
	//townie input
	var	typebox=$("#typebox");
	typebox.on("keydown",function(event) {
		if(event.which===13&&this.value.charAt(0)==="/") {
			commands.eval(this.value.substring(1));
			this.value="";
			}
		});
	$(window).on("keydown",function(event) {
		if(event.ctrlKey) {
			switch(event.which) {
				case 66:
					socket.cmd("option",{
						field:"fastgame"
						});
					socket.cmd("option",{
						field:"nospectate"
						});
					break;
				case 81:
					socket.cmd("<",{
						meet:meet,
						msg:typebox.val(),
						quote:true,
						target:user
						});
					typebox.val("");
					break;
				}
			}
		else if(event.target.value===undefined) {
			typebox.focus();
			}
		});

	//u(name);
	function u(name) {
		return users[name]||new User({
			id:null,
			name:name
			});
		}

	//userperson
	function User(data) {
		this.id=data.id;
		this.name=data.username;
		this.role=null;
		this.meet=meet;
		this.mafia=false;
		this.dead=false;
		this.voted=false;
		this.morse={
			id:0,
			code:0,
			clock:0
			}
		if(this.id!==null) {
			users[this.name]=this;
			}
		}

	//userpeople
	Object.defineProperties(users,{
		all:{
			get:function() {
				return this.find(function() {
					return true;
					},true);
				}
			},
		list:{
			get:function() {
				return this.find(function() {
					return !this.dead&&this.name!==user;
					},true);
				}
			},
		find:{
			value:function(callback,list) {
				var	output=new Array();
				for(var who in this) {
					if(callback.call(this[who])) {
						output.push(list?this[who].name:this[who]);
						}
					}
				return output;
				}
			}
		});

	//cmdlist class
	function Cmdlist(data) {
		return Object.create(data,Cmdlist.methods);
		}
	Cmdlist.methods={	
		eval:{
			value:function(input,scope) {
				var	match=null;
				if(scope===undefined) {
					scope=this;
					}
				for(var i=0;i<this.length;i++) {
					match=this[i].regex.exec(input);
					if(match!==null&&input===match[0]) {
						match.shift();
						this[i].callback.apply(scope,match);
						break;
						}
					}
				}
			}
		}

	//this is a sin
	var	bot=null,
		slave=false;
	bot=Cmdlist([
		{
			name: "Scriptcheck",
			regex: /scriptcheck/,
			callback: function() {
				socket.chat(ej.fname,this.user);
				}
			},
		{
			name: "Echo",
			regex: /(?:echo|say) (.+)/,
			callback: function(what) {
				//socket.chat(what);
				}
			},
		{
			name: "Say hi",
			regex: /hi+|hey+|hel+o+/,
			callback: function() {
				socket.chat([
					"Hi",
					"Hi...",
					"Hello"
					].random(),this.user);
				}
			},
		{
			name: "Say hi 2",
			regex: /(?:wh?at'?)s ?up+/,
			callback: function() {
				socket.chat([
					"Hi",
					"Hi...",
					"Hello",
					"Nothing",
					"Something",
					"Everything"
					].random(),this.user);
				}
			},
		{
			name: "Roulette",
			regex: /roulette/,
			callback: function() {
				if(roulette===null||rouletteOn!==null) return;
				var	user=this.user,
					message=[
						"Wet your pants",
						"Gulp",
						"Get ready",
						"Say your prayers"
						].random()
						+", "+[
						"pull it",
						"pull the trigger",
						"let it rip"
						].random();
				socket.chat(roulette+" bullets left. You put the gun to your head...",user);
				rouletteOn=setTimeout(function() {
					rouletteOn=null;
					if(Math.random()*roulette>1) {
						roulette--;
						socket.chat(message+", and nothing happens.",user);
						}
					else {
						roulette=0
						socket.chat(message+", and die instantly.",user);
						socket.vote(user,"gun");
						}
					if(roulette===0) {
						roulette=null;
						}
					},3000);
				}
			},
		{
			name: "Become bitch",
			regex: /be my bitch/,
			callback: function() {
				if(master===null) {
					master=this.user;
					socket.chat("Yes master "+master+"...");
					}
				else {
					socket.chat("I belong to "+master);
					}
				}
			},
		{
			name: "Roll over",
			regex: /roll over/,
			callback: function() {
				socket.chat(this.user!==master?
					"You're not the boss of me":
					"/me rolls over for senpai..."
					);
				}
			},
		{
			name: "Bow",
			regex: /bow ?(down)?/,
			callback: function() {
				socket.chat(this.user!==master?
					"You're not the boss of me":
					"/me bows for her master..."
					);
				}
			},
		{
			name: "Beg",
			regex: /beg(?: for (.+))?/,
			callback: function(what) {
				if(this.user!==master) return;
				var	output=[
					"gets on her knees",
					"gets on all fours"
					].random();
				output="/me "+output+" and begs";
				if(what) {
					output+=" for "+what;
					}
				socket.chat(output);
				}
			},
		{
			name: "Vote",
			regex: /vote (\w+)/,
			callback: function(who) {
				if(this.user!==master) return;
				socket.vote(who,this.meet);
				}
			},
		{
			name: "Shoot",
			regex: /shoot (\w+)/,
			callback: function(who) {
				if(this.user!==master) return;
				socket.vote(who,"gun");
				}
			}
		]);

	//get acquainted
	var	commands=null;
	commands=Cmdlist([
		{
			name: "Scriptcheck",
			regex: /scriptcheck/,
			callback: function() {
				log(ej.fname);
				}
			},
		{
			name: "About",
			regex: /info|help|about/,
			callback: function() {
				log("Running "+ej.fname,"bold");
				log("Type /cmdlist for a list of commands");
				}
			},
		{
			name: "Evaluate",
			regex: /eval (.+)/,
			callback: function(input) {
				log(JSON.stringify(eval(input)));
				}
			},
		{
			name: "Clear chat/logs",
			regex: /clear( logs)?/,
			callback: function(_logs) {
				if(_logs) {
					$("#window .emjack").remove();
					}
				else {
					$("#window").empty();
					}
				}
			},
		{
			name: "Request scriptcheck",
			regex: /botnet/,
			callback: function() {
				if(!morse) {
					setTimeout(function() {
						morse=false;
						},1000);
					}
				morse=true;
				ej.mor.send(2,0,"botnet");
				}
			},
		{
			name: "Get metadata",
			regex: /meta(?:data)?/,
			callback: function() {
				for(var param in ej.meta) {
					log("@"+param+": "+ej.meta[param]);
					}
				}
			},
		{
			name: "Get command list",
			regex: /cmdlist ?(bot)?/,
			callback: function(_bot) {
				var	data=(_bot?bot:commands);
				for(var i=0;i<data.length;i++) {
					log(data[i].name+" ~ "+data[i].regex);
					}
				}
			},
		{
			name: "Get random user/number",
			regex: /random ?(\\d+)?/,
			callback: function(digit) {
				log(digit?Math.round(Math.random()*digit):users.list.random());
				}
			},
		{
			name: "Toggle AFK",
			regex: /afk/,
			callback: function() {
				afk=!afk;
				log(afk?"Jeeves will handle your affairs...":"Jeeves has been dismissed.");
				}
			},
		{
			name: "Toggle autowill",
			regex: /agw|autowill|antiguise/,
			callback: function() {
				autowill=!autowill;
				log(autowill?"Name & role will be written in will by default.":"Disabled autowill.");
				}
			},
		{
			name: "Toggle I/O logging",
			regex: /dev/,
			callback: function() {
				development=!development;
				log(development?"Logging I/O.":"Logging disabled.");
				}
			},
		{
			name: "Toggle slavemode",
			regex: /slave/,
			callback: function() {
				slave=!slave;
				log(slave?"You're a naughty girl.":"You've found Jesus.");
				}
			},
		{
			name: "Toggle roulette",
			regex: /roulette/,
			callback: function() {
				roulette=roulette===null?6:null;
				if(roulette!==null) {
					socket.chat("Reloaded the revolver. Who's next?");
					}
				}
			},
		{
			name: "Send ping",
			regex: /ping ?(all)?/,
			callback: function(all) {
				socket.chat((
					all===undefined?
						users.find(function() {
							return !this.dead&&!this.voted&&this.meet===meet;
							},true):
						users.list
						).join(" ")
					);
				}
			},
		{
			name: "Send kick",
			regex: /kick (\w+)/,
			callback: function(name) {
				socket.cmd("ban",{
					uid:u(name).id
					});
				}
			},
		{
			name: "Send vote",
			regex: /vote ?(no one)?(\w+)?/,
			callback: function(none,name) {
				socket.vote(
					none!==undefined?
						"*":
						name!==undefined?
							name:
							users.list.random()
							);
				}
			},
		{
			name: "Send vote (gun)",
			regex: /shoot (\w+)/,
			callback: function(name) {
				socket.vote(name,"gun");
				}
			},
		{
			name: "Lobby join",
			regex: /join/,
			callback: function() {
				lobbyGames({
					status_id:0,
					target:12,
					password:false
					},function(table) {
						socket.dcfunc(function() {
							location.href="/game/"+table.id;
							});
						return true;
						}
					);
				}
			},
		{
			name: "Lobby leave",
			regex: /leave ?(\d+)?/,
			callback: function(x) {
				if(x===undefined) {
					socket.cmd("leave");
					}
				else {
					antidc=true;
					socket.cmd("k");
					for(var i=0;i<x;i++) {
						socket.cmd("leave");
						}
					}
				}
			},
		{
			name: "Lobby host",
			regex: /host ?(.+)?/,
			callback: function(title) {
				socket.dcfunc(function() {
					$.getJSON("/game/add/mafia",{
						setupid:setup_id,
						ranked:false,
						add_title:title===undefined?0:1,
						game_title:title
						},function(json) {
							location.href="/game/"+json.table
							});
					});
				}
			},
		{
			name: "Lobby games",
			regex: /games/,
			callback: function() {
				var	a,
					div,
					chat=document.getElementById("window");
				lobbyGames({
					status_id:0,
					password:false
					},function(table) {
					a=document.createElement("a");
					a.textContent="Table "+table.id;
					a.addEventListener("click",function(event) {
						socket.dcfunc(function() {
							location.href="/game/"+table.id;
							});
						});
					div=document.createElement("div");
					div.appendChild(a);
					div.appendChild(document.createTextNode(" - "+table.numplayers+" / "+table.target+" players"));
					chat.appendChild(div);
					chat.scrollTop=chat.scrollHeight;
					});
				}
			},
		{
			name: "[Debug] Send morse",
			regex: /morse (\d+) (\d+)/,
			callback: function naughty_morse(type,code) {
				morse=true;
				ej.mor.send(type,code);
				}
			}
		]);

	//miscellaneous
	function lobbyGames(criteria,callback) {
		$.ajax({url:"/game/find?page=1",method:"get"}).success(function(json) {
			var	criterion,
				openGames=[],
				games=JSON.parse(json[1]);
			games.data.forEach(function(table) {
				for(criterion in criteria) {
					if(criteria[criterion]!==table[criterion]) {
						return;
						}
					}
				openGames.push(table);
				})
			if(openGames.length===0) {
				log("No open games available!");
				}
			else {
				openGames.some(function(table) {
					return callback(table);
					});
				}
			});
		}

	//preserve notes
	var	notes=new Object();
	if(localStorage.notes) {
		notes=JSON.parse(localStorage.notes);
		}
	$(".user_note").on("click",function(event) {
		var	user=cmds.selected_user;
		console.log(user.details);
		if(user.details.notes===undefined) {
			user.details.notes=notes[user.username]||"";
			$(".notes").val(user.details.notes);
			}
		});
	$(".notes").on("keyup",function(event) {
		notes[cmds.selected_user.username]=this.value;
		});

	//load data
	if(localStorage.emjack) {
		var	data=JSON.parse(localStorage.emjack);
		slave=data.bot;
		morse=data.mor;
		autowill=data.agw;
		development=data.dev;
		delete data;
		}

	//save data
	$(window).on("beforeunload",function(event) {
		localStorage.notes=JSON.stringify(notes);
		localStorage.emjack=JSON.stringify({
			bot: Boolean(slave),
			mor: Boolean(morse),
			agw: Boolean(autowill),
			dev: Boolean(development)
			});
		});

	//important information
	var	last_error=null;
	$(window).on("error",function(event) {
		var	message=event.originalEvent.message;
		if(message!==last_error) {
			log("You've got error!","bold");
			log(message);
			last_error=message;
			}
		});

	//MiniLib
	Object.defineProperty(Array.prototype,"random",{
		value:function() {
			return this[Math.floor(Math.random()*this.length)];
			}
		});
	}

//Updates
var	request=new XMLHttpRequest();
request.onreadystatechange=function() {
	if(request.readyState===4&&request.status===200) {
		var	meta=new Object(),
			params=request.responseText.split(/\/\/ @([\w:]+)\s+(.+)/);
		for(var i=1;i<params.length;i+=3) {
			meta[params[i]]=params[i+1];
			}
		inject(String(function() {
			ej.meta=$meta;
			if(ej.version<ej.meta.version) {
				var	a=document.createElement("a");
				a.textContent="Update "+ej.name+ej.meta.version;
				a.target="_blank";
				a.href="http://userscripts.org/scripts/show/162009";
				document.getElementById("window").appendChild(a);
				delete a;
				}
			}).replace(/\$meta/,JSON.stringify(meta)));
		}
	}
request.open("GET","http://userscripts.org/scripts/source/162009.meta.js",true);
request.send();

//Syringe
function inject(fn) {
	var	script=document.createElement("script");
	script.type="text/javascript";
	script.textContent="("+String(fn)+")()";
	document.body.appendChild(script);
	}

//Jack-in
setTimeout(function() {
	inject(EMjack);
	document.body.addEventListener("contextmenu",function(event) {
		event.stopPropagation();
		},true);
	});