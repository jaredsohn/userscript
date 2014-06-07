// ==UserScript==
// @name        Command & Conquer TA Zmail RUS
// @description Small tool that allow you to copy/paste coords easily
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.3.1
// @grant none
// @author zdoom
// @updateURL http://userscripts.org/scripts/source/179876.meta.js
// @downloadURL http://userscripts.org/scripts/source/179876.user.js
// ==/UserScript==

(function(){
var injectFunction = function() 
{
    function createClass() 
    {
		qx.Class.define('zmail.data',
		{
			type: 'singleton',
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{
					if (typeof localStorage.ccta_zmail !== 'undefined')
					{
						var json = JSON.parse(localStorage.ccta_zmail);
						if (json.hasOwnProperty('archive')) this.archive = json.archive;
					}
					else
					{
						var sd = {
							'folders': {'draft': {}, 'junk': [], 'trash': [[],[]], 'documents': []}, 
							'contacts': {'blocked': [], 'friends': [], 'groups': {}}, 
							'archive': {}
						};
						localStorage['ccta_zmail'] = JSON.stringify(sd);
						console.log('zmail: starting zmail for the first time......');
						this.firstTime = true;
					}
							
					var inbox = {
						folder: null,
						count: null,
						messages: [],
						newMessages: [],
						unRead: null
					};
					
					var outbox = {
						folder: null,
						count: null,
						messages: [],
						newMessages: []
					};
					this.inbox = inbox;
					this.outbox = outbox;
					
					var data = ClientLib.Data.MainData.GetInstance();
					var mail = data.get_Mail();
					var root = this;
					var alliance = data.get_Alliance();
					var allianceExists = alliance.get_Exists();
					this.allianceExists = allianceExists;
					if (allianceExists)
					{
						var roles = alliance.get_Roles();
						var relations = alliance.get_Relationships();
						this.roles = roles;
						if (relations !== null)
						{
							var totalAllies = 0;
							for (var i = 0; i < relations.length; i++) if (relations[i].Relationship == 1) totalAllies++;
							for (var i = 0; i < relations.length; i++)
							{
								var type = relations[i].Relationship, id = relations[i].OtherAllianceId, name = relations[i].OtherAllianceName;
								if (type == 1) this.getAllianceMembers(id, name, totalAllies, true);
							}
						}
						else
						{
							this.allies = {};
							this.status.allies = true;
							console.log('zmail: allies(0).......................... ready');
							this.onReady();
						}
						this.getMembers(true);
					}
					else console.log('zmail: ' + 'No alliance detected: ' + alliance.get_Exists());
			
					var ownerName = data.get_Player().get_Name();
					var ownerId = data.get_Player().get_Id();
					this.ownerName = ownerName;
					this.ownerId = ownerId;
					
					var getPlayers = function(fi,li,ti)
					{
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetData", 
						{ 'ascending': true, 'firstIndex': fi, 'lastIndex': li, 'rankingType': 0, 'sortColumn': 2, 'view': 0 }, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							if (data !== null) this.players = this.players.concat(data.p);
							if (this.players.length == ti)
							{
								this.status.playersList = true;
								console.log('zmail: ' + 'global players list.......................... ready');
								this.onReady();
							}
						}), null);
					};
					
					var getList = function(count)
					{
						var pages = Math.ceil(count/4500);
						for (var i = 0; i < pages; i++)
						{
							var Min = i * 4500, Max = Math.min((((i + 1) * 4500) - 1), (count - 1));
							getPlayers.apply(root, [Min, Max, count]);
						}
					};
					
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("RankingGetCount", { 'rankingType': 0, 'view': 0 }, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if (data !== null) getList(data);
					}), null);
					
					var getFolder = function(type)
					{
						var gmh = mail.GetMailHeaders.toString();
						var prop = gmh.replace(/^.*?c=this\.(.*?)\.d\[a\].*?$/, '$1');
						var folder = mail[prop].d[type].i;
						return folder;
					}
					
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand ("IGMGetFolders", {}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if (data !== null)
						{
							this.inbox.folder = data[0].i;
							this.outbox.folder = data[1].i;
							console.log('zmail: ' + 'folders ids.......................... ready');
						}
						else
						{
							console.log('zmail: ' + 'Attempting folder ids fallback function');
							this.inbox.folder = getFolder(0);
							this.outbox.folder = getFolder(1);
							console.log('zmail: ' + 'folders ids.......................... ready');
						}
						
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("IGMGetMsgCount", {'folderId': this.inbox.folder}, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							console.log('zmail: inbox(' + data + ')');
							this.inbox.count = data;
							if ((data !== null) && (this.outbox.count !== null))
							{
								this.getMsgHeaders(this.inbox.folder, this.inbox.count, 0);
								this.getMsgHeaders(this.outbox.folder, this.outbox.count, 1);
							}
						}), null);
						
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("IGMGetMsgCount", {'folderId': this.outbox.folder}, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							console.log('zmail: outbox(' + data + ')');
							this.outbox.count = data;
							if ((data !== null) && (this.inbox.count !== null))
							{
								this.getMsgHeaders(this.inbox.folder, this.inbox.count, 0);
								this.getMsgHeaders(this.outbox.folder, this.outbox.count, 1);
							}
						}), null);
						
						this.status.folders = true;
						this.onReady();
					}), null);		
			
					this.timer = new qx.event.Timer(300);
					this.timer.addListener('interval', this.onMailSent, this);
				}
				catch(e)
				{
					console.log('zmail: ' + e.toString())
				}
			},
			
			destruct: function(){},
			
			members: 
			{
				inbox: null,
				outbox: null,
				update: null,
				archive: {},
				inProgress: false,
				players: [],
				allianceExists: null,
				roles: null,
				allianceMembers: null,
				allianceCommanders: null,
				allianceOfficers: null,
				allies: {},
				ownerName: null,
				ownerId: null,
				counter: 0,
				timer: null,
				isLoaded: false,
				firstTime: false,
				status: {'playersList': false, 'allianceMembers': false, 'allies': false, 'folders': false, 'messages': false},
				
				callMethod: function(fn, args)
				{
					var root = this;
					root[fn].apply(root, args);
				},
				
				update: function()
				{
					if(this.inProgress) return;
					this.inProgress = true;
					var data = ClientLib.Data.MainData.GetInstance();
					var mail = data.get_Mail();
					this.inbox.count = mail.GetMailCount(0);
					this.outbox.count = mail.GetMailCount(1);
					this.inbox.unRead = mail.GetUnreadCount();;
					this.getMsgHeaders(this.inbox.folder, this.inbox.count, 0);
					this.getMsgHeaders(this.outbox.folder, this.outbox.count, 1);
				},
				
				markRead: function(id, flag)
				{
					ClientLib.Data.MainData.GetInstance().get_Mail().SetMailRead(id, flag);
				},
				
				deleteMsgs: function(id, folder)
				{
					ClientLib.Data.MainData.GetInstance().get_Mail().DeleteMessages(id, folder);
				},
				
				sendMail: function(to, alliance, subject, message)
				{
					ClientLib.Data.MainData.GetInstance().get_Mail().SendMail(to, alliance, subject, message);
					this.counter = 0;
					this.onMailSent();
					this.timer.start();
				},
				
				onMailSent: function()
				{
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("IGMGetMsgCount", {'folderId': this.outbox.folder}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						if ((data !== null) && (data > this.outbox.count))
						{
							this.update();
							this.timer.stop();
							this.counter = 0;
						}
						else if (this.counter > 20)
						{
							alert('Error sending message');
							this.timer.stop();
						}
						else this.counter++;
					}), null);
				},
				
				createBBCode:
				{
					'coords': function(name,x,y)
					{
						return webfrontend.gui.util.BBCode.createCoordsLinkText(name,x,y).replace('#0d77bb', '#377395');
					},
					
					'player': function(name)
					{
						return webfrontend.gui.util.BBCode.createPlayerLinkText(name).replace('#0d77bb', '#377395');
					},
					
					'alliance': function(name)
					{
						return webfrontend.gui.util.BBCode.createAllianceLinkText(name).replace('#0d77bb', '#377395');
					}
				},
				
				getMembers: function(flag)
				{
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("AllianceGetMemberData", {}, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						var alliance = [], commanders = [], officers = [];
						for (var i = 0; i < data.length; i++)
						{
							var name = data[i].n, id = data[i].i, roleId = data[i].r, role = this.roles.d[roleId].Name;
							switch(role)
							{
								case 'Leader': role = 'Commander-in-Cheif'; break;
								case 'Newbie': role = 'Trial'; break;
							}
							var member = {'id': id, 'name': name, 'role': role, 'roleId': roleId};
							if (role == 'Commander-in-Cheif' || role == 'Second Commander') commanders.push(member);
							if (role == 'Officer') officers.push(member);
							alliance.push(member);
						}
						this.allianceMembers = alliance;
						this.allianceCommanders = commanders;
						this.allianceOfficers = officers;
						
						var structure = zmail.structure.getInstance();
						structure.applyMethod('updateContacts', [alliance, commanders, officers]);
						if (flag)
						{
							this.status.allianceMembers = true;
							console.log('zmail: ' + 'alliance members.......................... ready');
							this.onReady();
						}
					}), null);
				},
				
				getAllianceMembers: function(aid, name, total, flag)
				{
					ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicAllianceMemberList", {'id': aid }, 
					phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
					{
						this.allies[name] = data;
						var loaded = 0;
						for (var x in this.allies) loaded++;
						if (loaded == total)
						{
							var structure = zmail.structure.getInstance();
							structure.applyMethod('updateAllies', [this.allies]);
							if (flag)
							{
								this.status.allies = true;
								console.log('zmail: ' + 'allies (' + total + ').......................... ready');
								this.onReady();
							}
						}
					}), null);
				},
				
				_onAllianceChange: function()
				{
					var data = ClientLib.Data.MainData.GetInstance();
					var alliance = data.get_Alliance();
					var allianceExists = alliance.get_Exists();
					this.allianceExists = allianceExists;
					this.allies = {};
					if(allianceExists)
					{
						var relations = alliance.get_Relationships();
						if (relations !== null)
						{
							var totalAllies = 0;
							for (var i = 0; i < relations.length; i++) if (relations[i].Relationship == 1) totalAllies++;
							for (var i = 0; i < relations.length; i++)
							{
								var type = relations[i].Relationship, id = relations[i].OtherAllianceId, name = relations[i].OtherAllianceName;
								if (type == 1) this.getAllianceMembers(id, name, totalAllies, false);
							}
						}
						else zmail.structure.getInstance().callMethod('updateAllies', null);
						this.getMembers(false);
					}
					else
					{
						console.log('zmail: ' + 'No alliance detected: ' + alliance.get_Exists());
						var structure = zmail.structure.getInstance();
						structure.applyMethod('updateContacts', [null, null, null]);
						structure.applyMethod('updateAllies', [null]);
					}
				},
				
				getMsgHeaders: function(id, count, type)
				{
					type == 0 ? this.inbox.messages = [] : this.outbox.messages = [];
					type == 0 ? this.inbox.newMessages = [] : this.outbox.newMessages = [];
					var pages = Math.ceil(count/1000);
					for (var n = 0; n < pages; n++)
					{
						var start = n * 1000;
						var amount = (pages > 1) ? (n == pages - 1) ? (count - (n * 1000)) : 1000 : count;
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("IGMGetMsgHeader", 
						{folder: id, ascending: false, skip: start, take: amount, sortColumn: 1}, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							for (var i = 0; i < data.length; i++) this.getMsgBody(data[i], type);
						}), null);
					}
				},
				
				getMsgBody: function(msg, type)
				{
					if (this.archive.hasOwnProperty(msg.i))
					{
						if (this.archive[msg.i].r != msg.r) this.archive[msg.i].r = msg.r;
						type == 0 ? this.inbox.messages.push(this.archive[msg.i]) : this.outbox.messages.push(this.archive[msg.i]);
						this.onCompleted();
					}
					else
					{
						ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("IGMGetMsg", { mailId: msg.i }, 
						phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function(context, data)
						{
							var cm = msg;
							cm.b = data;
							type == 0 ? this.inbox.messages.push(cm) : this.outbox.messages.push(cm);
							if (type == 0)
							{
								if (this.isLoaded) this.inbox.newMessages.push(cm);
								else 
								{
									if (!cm.r) this.inbox.newMessages.push(cm);
								}
							}
							else
							{
								if (this.isLoaded) this.outbox.newMessages.push(cm);
							}
							this.archive[msg.i] = cm;
							this.onCompleted();
						}), null);
					}
				},
				
				onCompleted: function()
				{
					var ti = this.inbox.count, to = this.outbox.count, ci = this.inbox.messages.length, co = this.outbox.messages.length;
					var structure = zmail.structure.getInstance();
					if ((ti == ci) && (to == co))
					{
						var json = JSON.parse(localStorage.ccta_zmail);
						json.archive = this.archive;
						localStorage.ccta_zmail = JSON.stringify(json);
						var received = this.inbox.newMessages, sent = this.outbox.newMessages;
						if (((received.length + sent.length) > 0) || !this.isLoaded)
						{
							if (this.firstTime)
							{
								structure.applyMethod('updateDownloads', [ci + co, ti + to]);
							}
							if (this.isLoaded) structure.callUpdate(this.inbox.messages, this.outbox.messages, received, sent);
							if (!this.isLoaded)
							{
								this.isLoaded = true;
								this.status.messages = true;
								console.log('zmail: ' + 'messages.......................... ready');
								this.onReady();
							}
						}
						if (this.firstTime) this.firstTime = false;
						this.inProgress = false;
					}
					else
					{
						if (this.firstTime)
						{
							var current = ci + co, total = ti + to;
							if (!structure.downloadsCont) structure.applyMethod('showDownloads', [total]);
							structure.applyMethod('updateDownloads', [current, total]);
						}
					}
				},
				
				_onMailChange: function()
				{
					console.log('zmail: checking new messages');
					this.update();
				},
				
				attachEvent: function()
				{
					if (typeof phe.cnc.Util.attachNetEvent == 'undefined') webfrontend.gui.Util.attachNetEvent.apply(null, arguments);
					else phe.cnc.Util.attachNetEvent.apply(null, arguments);
				},
				
				onReady: function()
				{
					var status = this.status, ready = true, exists = this.allianceExists;
					if (exists == true)
					{
						for (var x in status) if (status[x] === false) ready = false;
					}
					else if (exists == false)
					{
						if (!status.playersList || !status.folders || !status.messages) ready = false;
					}
					else
					{
						ready = false;
						console.log('zmail: ' + 'alliance is null', exists);
					}
					if (ready)
					{
						var structure = zmail.structure.getInstance(), inbox = this.inbox, outbox = this.outbox;
						var data = ClientLib.Data, mainData = data.MainData.GetInstance();
						structure.callUpdate(inbox.messages, outbox.messages, inbox.newMessages, outbox.newMessages);
						zmail.main.getInstance().initScriptButton();
						this.attachEvent(mainData.get_Mail(), 'DataChange', data.MailDataChange, this, this._onMailChange);
						this.attachEvent(mainData.get_Alliance(), 'Change', data.AllianceChange, this, this._onAllianceChange);
					}
				}
			}
		});
		
		qx.Class.define('zmail.main',
		{
			type: 'singleton',
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				this.base(arguments);
				var layout = new qx.ui.layout.Canvas();
				this._setLayout(layout);
						
				var widget = new qx.ui.core.Widget();
				widget.setPadding(3);
				widget.setHeight(546);
				var div = new qx.html.Element('div', null, {'id': 'zdoom_mail_container'});
				widget.getContentElement().add(div);
				this.add(widget, {left: 0, top: 0});
				this.widget = widget;
		
				this.wdgAnchor = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl1.png").set({ width: 3, height: 32 });
				this.__imgTopRightCorner = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tr.png").set({ width: 34, height: 35 });
				this.__backgroundTop = new qx.ui.basic.Image(null);
				var cntBackgroundTop = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({ height: 132 , maxHeight: 132 });
				var cntBackgroundTopBackground = new qx.ui.container.Composite().set({ backgroundColor: "#000000" });
				cntBackgroundTop.add(cntBackgroundTopBackground, { left: 0, top: 0, right: 0, bottom: 0 });
				cntBackgroundTop.add(this.__backgroundTop, { left: 0, top: -10 });
				this.__background = new qx.ui.basic.Image(null);
				var cntBackground = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				cntBackground.add(this.__background, { left: 0, top: -10 });
				this._add(cntBackground, { left: -114, top: 132-60 });
				this._add(cntBackgroundTop, { left: -114, top: -60 });
				this._add(this.__imgTopRightCorner, { right: 0, top: 0, bottom: 28 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_r.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { right: 0, top: 35, bottom: 29 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_br.png").set({ width: 5, height: 28, allowGrowY: true, scale: true }), { right: 0, bottom: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_b.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { right: 5, bottom: 0, left: 5 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_bl.png").set({ width: 5, height: 29 }), { left: 0, bottom: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_l.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { left: 0, bottom: 29, top: 32 });
				this._add(this.wdgAnchor, { left: 0, top: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl2.png").set({ width: 25, height: 5 }), { left: 3, top: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_t.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { left: 28, right: 34, top: 0 });
				this.__btnClose = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_close_button.png").set({ appearance: "button-close", width: 23, height: 23, toolTipText: this.tr("tnf:close base view") });
				this.__btnClose.addListener("execute", this._onClose, this);
				this._add(this.__btnClose, { top: 6, right: 5 });
				
				var app = qx.core.Init.getApplication();
				app.getDesktop().addListener('resize', this._onResize, this);
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{    
				isOpen: false,
				open: function()
				{                    
					this._onResize();
					var root = this;
					var app = qx.core.Init.getApplication();
					app.getDesktop().add(this);
					
					var mail = zmail.structure.getInstance();
					var check = function()
					{
						var div = document.getElementById('zdoom_mail_container');
						if(div)
						{
							div.appendChild(mail.dom.window.main);
							root.isOpen = true;
						}
						else setTimeout(check, 1000);
					};
					check();
				},
				
				initScriptButton: function()
				{
					var init = function()
					{
						var app = qx.core.Init.getApplication();
						var scriptMenu = app.getMenuBar().getScriptsButton();
						var subMenu = new qx.ui.menu.Menu();
						var btn  = new qx.ui.menu.Button("Open Window", null, null);
						scriptMenu.getMenu().setWidth(94);
						btn.addListener("execute", this.open, this);
						subMenu.add(btn);
						scriptMenu.Add("Zmail", null, subMenu);
					}
					init.call(this);
				},
				
				_onClose: function ()
				{
					var app = qx.core.Init.getApplication();
					app.getDesktop().remove(this);
					this.isOpen = false;
				},
				
				_onResize: function()
				{
					var app = qx.core.Init.getApplication();
					var mainOverlay = app.getMainOverlay();
					var left = (app.getDesktop().getBounds().width - mainOverlay.getWidth()) / 2;
					this.setUserBounds(left, mainOverlay.getBounds().top, mainOverlay.getWidth(), 546);
					this.widget.setWidth(mainOverlay.getWidth());
				},
				
				center: function()
				{
					var parent = this.getLayoutParent();
					if (parent) var bh = parent.getBounds();
					if (bh) var bi = this.getSizeHint();
					var bg = Math.round((bh.width - bi.width) / 2);
					var top = this.getBounds().top;
					this.moveTo(bg,top);
				}
			}
		
		});
		
		
		qx.Class.define('zmail.compose',
		{
			type: 'singleton',
			extend: qx.ui.container.Composite,
			
			construct: function()
			{
				this.base(arguments);
				var layout = new qx.ui.layout.Canvas();
				this._setLayout(layout);
				
				zmail.data.getInstance();
						
				var widget = new qx.ui.core.Widget();
				widget.setPadding(3);
				widget.setHeight(546);
				var div = new qx.html.Element('div', null, {'id': 'zdoom_newMail_container'});
				widget.getContentElement().add(div);
				this.add(widget, {left: 0, top: 0});
				this.widget = widget;
		
				this.wdgAnchor = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl1.png").set({ width: 3, height: 32 });
				this.__imgTopRightCorner = new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tr.png").set({ width: 34, height: 35 });
				this.__backgroundTop = new qx.ui.basic.Image(null);
				var cntBackgroundTop = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({ height: 132 , maxHeight: 132 });
				var cntBackgroundTopBackground = new qx.ui.container.Composite().set({ backgroundColor: "#000000" });
				cntBackgroundTop.add(cntBackgroundTopBackground, { left: 0, top: 0, right: 0, bottom: 0 });
				cntBackgroundTop.add(this.__backgroundTop, { left: 0, top: -10 });
				this.__background = new qx.ui.basic.Image(null);
				var cntBackground = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				cntBackground.add(this.__background, { left: 0, top: -10 });
				this._add(cntBackground, { left: -114, top: 132-60 });
				this._add(cntBackgroundTop, { left: -114, top: -60 });
				this._add(this.__imgTopRightCorner, { right: 0, top: 0, bottom: 28 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_r.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { right: 0, top: 35, bottom: 29 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_br.png").set({ width: 5, height: 28, allowGrowY: true, scale: true }), { right: 0, bottom: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_b.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { right: 5, bottom: 0, left: 5 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_bl.png").set({ width: 5, height: 29 }), { left: 0, bottom: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_l.png").set({ width: 3, height: 1, allowGrowY: true, scale: true }), { left: 0, bottom: 29, top: 32 });
				this._add(this.wdgAnchor, { left: 0, top: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_tl2.png").set({ width: 25, height: 5 }), { left: 3, top: 0 });
				this._add(new qx.ui.basic.Image("webfrontend/ui/common/frame_basewin/frame_basewindow_t.png").set({ width: 1, height: 3, allowGrowX: true, scale: true }), { left: 28, right: 34, top: 0 });
				this.__btnClose = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_close_button.png").set({ appearance: "button-close", width: 23, height: 23, toolTipText: this.tr("tnf:close base view") });
				this.__btnClose.addListener("execute", this._onClose, this);
				this._add(this.__btnClose, { top: 6, right: 5 });
				
				var app = qx.core.Init.getApplication();
				app.getDesktop().addListener('resize', this._onResize, this);
			},
			
			destruct: function()
			{
				
			},
						
			members: 
			{  
				isOpen: false,  
				open: function()
				{                    
					this._onResize();
					var app = qx.core.Init.getApplication();
					app.getDesktop().add(this);
					this.isOpen = true;
					
					var mail = zmail.structure.getInstance();
					var check = function()
					{
						var div = document.getElementById('zdoom_newMail_container');
						if(div) div.appendChild(mail.dom.window.compose);
						else setTimeout(check, 1000);
					};
					check();
				},
				
				_onClose: function()
				{
					var app = qx.core.Init.getApplication();
					app.getDesktop().remove(this);
					this.isOpen = false;
				},
				
				_onResize: function()
				{
					var app = qx.core.Init.getApplication();
					var mainOverlay = app.getMainOverlay();
					var left = (app.getDesktop().getBounds().width - mainOverlay.getWidth()) / 2;
					this.setUserBounds(left, mainOverlay.getBounds().top, mainOverlay.getWidth(), 546);
					this.widget.setWidth(mainOverlay.getWidth());
				},
				
				center: function()
				{
					var parent = this.getLayoutParent();
					if (parent) var bh = parent.getBounds();
					if (bh) var bi = this.getSizeHint();
					var bg = Math.round((bh.width - bi.width) / 2);
					var top = this.getBounds().top;
					this.moveTo(bg,top);
				}
			}
		});
		
		qx.Class.define('zmail.structure',
		{
			type: 'singleton',
			extend: qx.core.Object,
			
			construct: function()
			{
				try
				{
					var root = this;
					var callUpdate = function()
					{
						root.update.apply(root, arguments);
					};
					this.callUpdate = callUpdate;
					
					Element.prototype.zm_append = function (arr) 
					{
						for (var i = 0; i < arr.length; i++) this.appendChild(arr[i]);
					};
					
					Element.prototype.zm_empty = function()
					{
						while(this.firstChild) this.removeChild(this.firstChild);
					};
					
					Element.prototype.zm_css = function(css)
					{
						var iterator = function(obj)
						{
							for(var x in obj) elm.style[x] = obj[x];
						};
						var elm = this;
						for (var key in css) {
							var prop = css[key];
							switch(key)
							{
								case 'over': elm.onmouseover = function(){iterator(css['over'])}; break;
								case 'out': elm.onmouseout = function(){iterator(css['out'])}; break;
								case 'focus': elm.onfocus = function(){iterator(css['focus'])}; break;
								case 'blur': elm.onblur = function(){iterator(css['blur'])}; break;
								default: elm.style[key] = css[key];
							}
						}
					};
					
					Element.prototype.zm_prop = function (obj)
					{
						for (var key in object) this[key] = obj[key];
					};
					
					this.css.topBar.cont.backgroundImage = this.gradient('#5C5E62', '#3E4042');
					this.css.searchResults.text.backgroundImage = this.gradient('#5a5a5a', '#4a4a4a');
					var blueGrd = root.gradient('#3d7fa0', '#31678a');
					
					var create = this.create, cssStyles = this.css, text = this.text;
					
					var winCont = create('div', cssStyles.window);
					var topBar = create('div', cssStyles.topBar.main);
					var topBarCont = create('div', cssStyles.topBar.cont);
					var leftBar = create('div', cssStyles.leftBar);
					var logo = create('div', cssStyles.topBar.logo);
					var tbMenu = create('div', cssStyles.topBar.menu);
					var middleBar = create('div', cssStyles.middleBar.cont);
					var rightBar = create('div', cssStyles.rightBar.main);
					var leftBarWrapper = create('div', cssStyles.tableCellWrapper);
					var rightBarWrapper = create('div', cssStyles.tableCellWrapper);
					var middleBarWrapper = create('div', cssStyles.tableCellWrapper);
					var msgMask = create('div', cssStyles.rightBar.msgMask);
					var msgCont = create('div', cssStyles.rightBar.msgCont);
					var msgSbc = create('div', cssStyles.rightBar.scrollBar.cont);
					var msgSb = create('div', cssStyles.rightBar.scrollBar.bar);
					var headersMask = create('div', cssStyles.middleBar.headers.mask);
					var headersSbc = create('div', cssStyles.middleBar.scrollBar.cont);
					var headersFooter = create('div', cssStyles.middleBar.footer.cont);
					var headersCont = create('div', cssStyles.middleBar.headers.scroll);
					var mailIcon = document.createElement('img');
					var mailText = document.createTextNode('Z'+'MA'+'IL');
					var expandCont = create('div', cssStyles.compose.rightBar.expand);
					mailIcon.style.display = 'inline-block';
					mailIcon.style.verticalAlign = 'top';
					expandCont.style.backgroundImage = 'url(' + this.res.expandDocument + ')';
					expandCont.data = {'isExpanded': false, 'isFocused': false};
					expandCont.onmouseover = function(){this.data.isFocused = true};
					expandCont.onmouseout = function(){this.data.isFocused = false; this.style.visibility = 'hidden';};
					expandCont.onclick = function()
					{
						var expanded = this.data.isExpanded;
						this.style.backgroundImage = (expanded) ? 'url('+root.res.expandDocument+')' : 'url('+root.res.contractDocument+')';
						leftBar.style.display = (expanded) ? 'table-cell' : 'none';
						middleBar.style.display = (expanded) ? 'table-cell' : 'none';
						this.data.isExpanded = !expanded;
					};
					mailIcon.src = this.res.mail;
					mailIcon.style.marginRight = '6px';
					logo.zm_append([mailIcon, mailText]);
					topBarCont.zm_append([logo, tbMenu]);
					topBar.appendChild(topBarCont);
					msgMask.appendChild(msgCont);
					msgSbc.appendChild(msgSb);
					rightBarWrapper.zm_append([msgMask, msgSbc]);
					rightBar.appendChild(rightBarWrapper);
					headersMask.appendChild(headersCont);
					middleBarWrapper.zm_append([headersMask, headersSbc, headersFooter]);
					middleBar.appendChild(middleBarWrapper);
					winCont.zm_append([topBar, leftBar, middleBar, rightBar]);
					this.enableScroll(msgSb, msgSbc, msgCont);
					
			//middleBar Footer
					var pagesBar = create('div', cssStyles.middleBar.footer.pagesBar);
					var pagesInd = create('div', cssStyles.middleBar.footer.indicator);
					var pagesControlCont = create('div', cssStyles.middleBar.footer.pagesControls.cont);
					var pagesControlLabel = create('div', cssStyles.middleBar.footer.pagesControls.label);
					var selectAllCont = create('div', cssStyles.middleBar.footer.selectAll.span);
					var selectAllCheckBox = create('div', cssStyles.middleBar.footer.selectAll.checkBox);
					
					pagesBar.appendChild(pagesInd);
					selectAllCont.appendChild(selectAllCheckBox);
					headersFooter.zm_append([pagesBar, selectAllCont, pagesControlLabel, pagesControlCont]);
					
					headersFooter.onmouseover = function(){ pagesControlLabel.style.display = 'block' };
					headersFooter.onmouseout = function(){ pagesControlLabel.style.display = 'none' };
					
					var changePage = function(mode)
					{
						var f = root.selectedFolder, l = root.folders[f].msgs.length, t = Math.ceil(l / 30) - 1, p = root.selectedPage, np;
						var populate = function(){ root.populateHeaders.apply(root, arguments) }
						
						switch(mode)
						{
							case 'next': np = (p + 1 > t) ? t : p + 1; break;
							case 'previous': np = (p - 1 < 0) ? 0 : p - 1; break;
							case 'first': np = 0; break;
							case 'last': np = t; break;
						}
						if ( p == np) return;
						root.selectedPage = np;
						populate();
					};
					
					['first', 'previous', 'next', 'last'].map(function(btn)
					{
						var controlBtn = create('div', cssStyles.middleBar.footer.pagesControls.icon);
						if (btn == 'previous') controlBtn.style.marginRight = '5px';
						controlBtn.style.backgroundImage = 'url(' + root.res.controls[btn] + ')';
						controlBtn.onclick = function(){ changePage(btn) };
						pagesControlCont.appendChild(controlBtn);
					});
					
					var selectAll = function(){ root.selectAll.apply(root, arguments) };
					var addGroup = function(){ root.addGroupToSelection.apply(root, arguments) };
					var removeGroup = function(){ root.removeGroupFromSelection.apply(root, arguments) };
					selectAllCheckBox.data = {'isChecked': false};
					selectAllCheckBox.onmousedown = function(){this.style.background = '#202020'};
					selectAllCheckBox.onmouseup = function()
					{
						var isChecked = this.data.isChecked;
						var color = isChecked ? 'transparent' : '#9f9f9f';
						this.style.background = color;
						this.data.isChecked = !isChecked;
						(root.selectedFolder) ? selectAll(!isChecked) : (isChecked) ? removeGroup() : addGroup();
					};
			///////////////////////////////////////////////////////////////////////////////////
						
			//Search Messages		
					var searchBox = create('textField', cssStyles.input.text.search);
					this.placeHolder(searchBox, 'Поиск...');
					
					var resultsCont = create('div', cssStyles.searchResults.cont);
					var resultsUl = create('ul', cssStyles.searchResults.ul);
					var bySender = create('li', cssStyles.searchResults.li.main);
					var bySubject = create('li', cssStyles.searchResults.li.main);
					var bySenderCount = create('span', cssStyles.searchResults.count);
					var bySubjectCount = create('span', cssStyles.searchResults.count);
					var bySenderUl = create('ul', cssStyles.searchResults.ul);
					var bySubjectUl = create('ul', cssStyles.searchResults.ul);
					var bySenderTxt = create('p', cssStyles.searchResults.text);
					var bySubjectTxt = create('p', cssStyles.searchResults.text);
					text(bySenderTxt, 'От: ');
					text(bySubjectTxt, 'Тема: ');
					bySenderTxt.appendChild(bySenderCount);
					bySubjectTxt.appendChild(bySubjectCount);
					bySender.zm_append([bySenderTxt, bySenderUl]);
					bySubject.zm_append([bySubjectTxt, bySubjectUl]);
					resultsUl.zm_append([bySender, bySubject]);
					resultsCont.appendChild(resultsUl);
					resultsCont.data = {'isFocused': false};
					
					var searchFolder = function(){ root.searchFolder.apply(root, arguments) };
					resultsCont.onmouseover = function(){this.data.isFocused = true};
					resultsCont.onmouseout = function(){this.data.isFocused = false};
					
					searchBox.onkeyup = function()
					{
						var str = this.value;
						searchFolder(str);
					};
					
					searchBox.onblur = function()
					{
						if (!resultsCont.data.isFocused) resultsCont.style.display = 'none';
						this.value = 'Search...';
						this.style.color = '#333333';
					};
					
			///////////////////////////////////////////////////////////////////////////////////
			
			//folders & contacts		
					var lbList = create('ul', cssStyles.ul.leftBar.main);
					var foldersLi = create('li', cssStyles.li.leftBar.main);
					var contactsLi = create('li', cssStyles.li.leftBar.main);
					var foldersUl = create('ul', cssStyles.ul.leftBar.sub);
					var contactsUl = create('ul', cssStyles.ul.leftBar.sub);
					var inboxLi = create('li', cssStyles.li.leftBar.subSelected);
					var outboxLi = create('li', cssStyles.li.leftBar.sub);
					var draftLi = create('li', cssStyles.li.leftBar.sub);
					var junkLi = create('li', cssStyles.li.leftBar.sub);
					var trashLi = create('li', cssStyles.li.leftBar.sub);
					var documentsLi = create('li', cssStyles.li.leftBar.sub);
					var friendsLi = create('li', cssStyles.li.leftBar.sub);
					var blockedLi = create('li', cssStyles.li.leftBar.sub);
					var allianceLi = create('li', cssStyles.li.leftBar.sub);
					var commandersLi = create('li', cssStyles.li.leftBar.sub);
					var officersLi = create('li', cssStyles.li.leftBar.sub);
					var alliesLi = create('li', cssStyles.li.leftBar.sub);
					var groupsLi = create('li', cssStyles.li.leftBar.sub);
					var inboxTxt = document.createTextNode('Входящие');
					var outboxTxt = document.createTextNode('Исходящие');
					var draftTxt = document.createTextNode('Черновики');
					var junkTxt = document.createTextNode('Хлам');
					var trashTxt = document.createTextNode('Корзина');
					var documentsTxt = document.createTextNode('Документы');
					var friendsTxt = document.createTextNode('Друзья');
					var blockedTxt = document.createTextNode('Заблокированые');
					var allianceTxt = document.createTextNode('Альянс');
					var commandersTxt = document.createTextNode('Командиры');
					var officersTxt = document.createTextNode('Офицеры');
					var alliesTxt = document.createTextNode('Союзники');
					var groupsTxt = document.createTextNode('Группы');
					
					inboxLi.appendChild(inboxTxt);
					outboxLi.appendChild(outboxTxt);
					draftLi.appendChild(draftTxt);
					junkLi.appendChild(junkTxt);
					trashLi.appendChild(trashTxt);
					documentsLi.appendChild(documentsTxt);
					friendsLi.appendChild(friendsTxt);
					blockedLi.appendChild(blockedTxt);
					allianceLi.appendChild(allianceTxt);
					commandersLi.appendChild(commandersTxt);
					officersLi.appendChild(officersTxt);
					alliesLi.appendChild(alliesTxt);
					groupsLi.appendChild(groupsTxt);
					
					var changeFolder = function(folder)
					{
						if (root.selectedGroup) root.dom.leftBar.items[root.selectedGroup].zm_css(cssStyles.li.leftBar.sub);
						if (root.selectedFolder) root.dom.leftBar.items[root.selectedFolder].zm_css(cssStyles.li.leftBar.sub);
						root.dom.leftBar.items[folder].zm_css(cssStyles.li.leftBar.subSelected);
						root.selectedFolder = folder;
						root.selectedGroup = false;
						root.resetMsgCont(1);
						root.selectedPage = 0;
						root.populateHeaders();
						searchBox.disabled = false;
						msgSb.data.update();
					};
					
					var changeGroup = function(group)
					{
						if (root.selectedGroup) root.dom.leftBar.items[root.selectedGroup].zm_css(cssStyles.li.leftBar.sub);
						if (root.selectedFolder) root.dom.leftBar.items[root.selectedFolder].zm_css(cssStyles.li.leftBar.sub);
						root.dom.leftBar.items[group].zm_css(cssStyles.li.leftBar.subSelected);
						root.selectedGroup = group;
						root.selectedFolder = false;
						root.populateContacts();
						searchBox.disabled = true;
						msgSb.data.update();
					};
					
					[[inboxLi,'inbox'],[outboxLi,'outbox'],[draftLi,'draft'],[junkLi,'junk'],[trashLi,'trash'],[documentsLi,'documents']].map(function(Item)
					{
						Item[0].onclick = function(){ changeFolder(Item[1]) }
					});
					
					[[friendsLi,'friends'],[blockedLi,'blocked'],[allianceLi,'alliance'],[commandersLi,'commanders'], [officersLi,'officers'], [alliesLi,'allies'], [groupsLi,'groups']].map(function(Item)
					{
						Item[0].onclick = function(){ changeGroup(Item[1]) }
					});
					
					foldersUl.zm_append([inboxLi, outboxLi, draftLi, junkLi, trashLi, documentsLi]);
					contactsUl.zm_append([allianceLi, commandersLi, officersLi, alliesLi, friendsLi, blockedLi, groupsLi]);
					foldersLi.zm_append([document.createTextNode('Папки'), foldersUl]);
					contactsLi.zm_append([document.createTextNode('Контакты'), contactsUl]);
					lbList.zm_append([foldersLi, contactsLi]);
					leftBarWrapper.zm_append([searchBox, lbList, resultsCont]);
					leftBar.appendChild(leftBarWrapper);
					
					this.dom.leftBar.folders.inbox = inboxTxt;
					this.dom.leftBar.folders.outbox = outboxTxt;
					this.dom.leftBar.folders.junk = junkTxt;
					this.dom.leftBar.folders.trash = trashTxt;
					this.dom.leftBar.folders.draft = draftTxt;
					this.dom.leftBar.folders.documents = documentsTxt;
					this.dom.leftBar.contacts.friends = friendsTxt;
					this.dom.leftBar.contacts.blocked = blockedTxt;
					this.dom.leftBar.contacts.alliance = allianceTxt;
					this.dom.leftBar.contacts.commanders = commandersTxt;
					this.dom.leftBar.contacts.officers = officersTxt;
					this.dom.leftBar.contacts.allies = alliesTxt;
					this.dom.leftBar.contacts.groups = groupsTxt;
					this.dom.leftBar.items.inbox = inboxLi;
					this.dom.leftBar.items.outbox = outboxLi;
					this.dom.leftBar.items.junk = junkLi;
					this.dom.leftBar.items.trash = trashLi;
					this.dom.leftBar.items.draft = draftLi;
					this.dom.leftBar.items.documents = documentsLi;
					this.dom.leftBar.items.friends = friendsLi;
					this.dom.leftBar.items.blocked = blockedLi;
					this.dom.leftBar.items.alliance = allianceLi;
					this.dom.leftBar.items.commanders = commandersLi;
					this.dom.leftBar.items.officers = officersLi;
					this.dom.leftBar.items.allies = alliesLi;
					this.dom.leftBar.items.groups = groupsLi;
					this.dom.leftBar.searchBox = searchBox;
			///////////////////////////////////////////////////////////////////////////////////
			
			//selected contacts container
					var sc_mainCont = document.createElement('div');
					var sc_upperCont = create('div', cssStyles.rightBar.contacts.topWrapper);
					var sc_lowerCont = create('div', cssStyles.rightBar.contacts.bottomWrapper);
					var sc_header = create('div', cssStyles.message.subject);
					var sc_contactsMain = create('div', cssStyles.rightBar.contacts.main);
					var sc_contactsMask = create('div', cssStyles.rightBar.contacts.mask);
					var sc_contactsSbc = create('div', cssStyles.rightBar.contacts.scrollbar.cont);
					var sc_contactsSb = create('div', cssStyles.rightBar.contacts.scrollbar.bar);
					var sc_contactsCont = create('div', cssStyles.rightBar.contacts.cont);
					var sc_findPlayer = create('textField', cssStyles.rightBar.contacts.search);
					var sc_removeAll = create('div', cssStyles.rightBar.contacts.button.disabled);
					var sc_message = create('div', cssStyles.rightBar.contacts.button.disabled);
					var sc_addToSelection = create('div', cssStyles.rightBar.contacts.button.active);
					var sc_addAsFriend = create('div', cssStyles.rightBar.contacts.button.active);
					var sc_block = create('div', cssStyles.rightBar.contacts.button.active);
					var sc_resultsCont = create('div', cssStyles.rightBar.contacts.results.cont);
					var sc_resultsMask = create('div', cssStyles.rightBar.contacts.results.mask);
					var sc_resultsContentCont = create('div', cssStyles.rightBar.contacts.results.contentsCont);
					var sc_resultsSbc = create('div', cssStyles.rightBar.contacts.results.scrollbar.cont);
					var sc_saveGroup = create('div', cssStyles.rightBar.contacts.saveButton.cont.disabled);
					var sc_saveGroupOptions = create('span', cssStyles.rightBar.contacts.saveButton.span);
					var sc_saveNewGroup = create('div', cssStyles.rightBar.contacts.saveButton.sub);
					var sc_saveExistedGroup = create('div', cssStyles.rightBar.contacts.saveButton.sub);
					text(sc_header, 'Контакты не выделены.');
					text(sc_removeAll, 'Удалить все');
					text(sc_message, 'Сообщение');
					text(sc_saveGroup, 'Сохр. группу');
					text(sc_saveNewGroup, 'Новая группа');
					text(sc_saveExistedGroup, 'Существующая группа');
					text(sc_addToSelection, 'Добавить в выделенное');
					text(sc_addAsFriend, 'Добавить как друга');
					text(sc_block, 'Блокировать');
					this.placeHolder(sc_findPlayer, 'Найти игрока...');
					sc_mainCont.style.overflow = 'hidden';
					sc_removeAll.zm_css({'display': 'inline-block', 'verticalAlign': 'top', 'width': '101px'});
					sc_message.zm_css({'display': 'inline-block', 'verticalAlign': 'top', 'marginLeft': '5px', 'width': '80px'});
					[sc_addToSelection, sc_addAsFriend, sc_block].map(function(x){ x.zm_css({'width': '120px', 'margin': '0 auto 5px auto'}) });
					root.enableScroll(sc_contactsSb, sc_contactsSbc, sc_contactsCont);
					sc_mainCont.style.height = '471px';
					sc_lowerCont.style.display = 'none';
					
					sc_saveGroupOptions.zm_append([sc_saveNewGroup, sc_saveExistedGroup]);
					sc_saveGroup.appendChild(sc_saveGroupOptions);
					sc_resultsMask.appendChild(sc_resultsContentCont);
					sc_resultsCont.zm_append([sc_resultsMask, sc_resultsSbc]);
					sc_contactsSbc.appendChild(sc_contactsSb);
					sc_contactsMask.appendChild(sc_contactsCont);
					sc_contactsMain.zm_append([sc_contactsMask, sc_contactsSbc]);
					sc_upperCont.zm_append([sc_contactsMain, sc_findPlayer, sc_removeAll, sc_message]);
					sc_lowerCont.zm_append([sc_addToSelection, sc_addAsFriend, sc_block]);
					sc_mainCont.zm_append([sc_header, sc_upperCont, sc_lowerCont, sc_resultsCont, sc_saveGroup]);
					
					this.dom.rightBar.contacts.main = sc_mainCont;
					this.dom.rightBar.contacts.lowerCont = sc_lowerCont;
					this.dom.rightBar.contacts.header = sc_header;
					this.dom.rightBar.contacts.cont = sc_contactsCont;
					this.dom.rightBar.contacts.bar = sc_contactsSb;
					this.dom.rightBar.contacts.search = sc_findPlayer;
					this.dom.rightBar.contacts.results = sc_resultsCont;
					this.dom.rightBar.contacts.scrollbarCont = sc_resultsSbc;
					this.dom.rightBar.contacts.contentsCont = sc_resultsContentCont;
					this.dom.rightBar.contacts.buttons.removeAll = sc_removeAll;
					this.dom.rightBar.contacts.buttons.message = sc_message;
					this.dom.rightBar.contacts.buttons.addToSelection = sc_addToSelection;
					this.dom.rightBar.contacts.buttons.addAsFriend = sc_addAsFriend;
					this.dom.rightBar.contacts.buttons.block = sc_block;
					this.dom.rightBar.contacts.buttons.saveGroup = sc_saveGroup;
					
					
					var addFriend = function(){ root.addFriend.apply(root, arguments) };
					var removeFriend = function(){ root.removeFriend.apply(root, arguments) };
					var blockContact = function(){ root.blockContact.apply(root, arguments) };
					var unblockContact = function(){ root.unblockContact.apply(root, arguments) };
					var removeAllSelectedContacts = function(){ root.removeAllSelectedContacts.apply(root, arguments) };
					var addContact = function(){ root.addToSelection.apply(root, arguments) };
					var removeContact = function(){ root.removeFromSelection.apply(root, arguments) };
					var setContactOptions = function(){ root.setContactOptions.apply(root, arguments) };
					var newMail = function(){ root.openNewMail.apply(root, arguments) };
					var saveNewGroup = function(){ root.saveNewGroup.apply(root, arguments) };
					var saveExistedGroup = function(){ root.saveExistedGroup.apply(root, arguments) };
					
					sc_addToSelection.data = {'add':addContact, 'remove':removeContact, 'id':null, 'mode':null, 'update':setContactOptions};
					sc_addAsFriend.data = {'add':addFriend, 'remove':removeFriend, 'id':null, 'mode':null, 'update':setContactOptions};
					sc_block.data = {'block':blockContact, 'unblock':unblockContact, 'id':null, 'mode':null, 'update':setContactOptions};
					sc_removeAll.data = {};
					sc_message.data = {};
					sc_saveGroup.data = {'isExpanded': false, 'isEnabled': false};
					sc_saveGroupOptions.data = {'isFocused': false};
					
					sc_addToSelection.onclick = function()
					{
						((this.data.isEnabled)&&(this.data.mode == 'add')) ? this.data.add(this.data.id) : this.data.remove(this.data.id);
						this.data.update(this.data.id);
					};
					sc_addAsFriend.onclick = function()
					{
						((this.data.isEnabled)&&(this.data.mode == 'add')) ? this.data.add(this.data.id) : this.data.remove(this.data.id);
						this.data.update(this.data.id);
					};
					sc_block.onclick = function()
					{
						((this.data.isEnabled)&&(this.data.mode == 'block')) ? this.data.block(this.data.id) : this.data.unblock(this.data.id);
						this.data.update(this.data.id);
					};
					sc_removeAll.onclick = removeAllSelectedContacts;
					sc_saveGroup.onclick = function()
					{
						var enabled = this.data.isEnabled;
						if (enabled)
						{
							var expanded = this.data.isExpanded;
							sc_saveGroupOptions.style.display = (expanded) ? 'none' : 'block';
							this.data.isExpanded = !expanded;
						}
					};
					sc_saveNewGroup.addEventListener('mouseover', function(){sc_saveGroupOptions.data.isFocused = true;}, false);
					sc_saveExistedGroup.addEventListener('mouseover', function(){sc_saveGroupOptions.data.isFocused = true;}, false);
					sc_saveGroupOptions.addEventListener('mouseout', function()
					{
						sc_saveGroupOptions.data.isFocused = false;
						setTimeout(function()
						{
							var expanded = sc_saveGroup.data.isExpanded, focused = sc_saveGroupOptions.data.isFocused;
							if (expanded && !focused)
							{
								sc_saveGroupOptions.style.display = 'none';
								sc_saveGroup.data.isExpanded = false;
							}
						}, 50);
					}, false);
					
					sc_saveNewGroup.onclick = function()
					{
						sc_saveGroupOptions.style.display = 'none';
						sc_saveGroupOptions.data.isFocused = false;
						sc_saveGroup.data.isExpanded = false;
						saveNewGroup();
					};
					
					sc_saveExistedGroup.onclick = function()
					{
						sc_saveGroupOptions.style.display = 'none';
						sc_saveGroupOptions.data.isFocused = false;
						sc_saveGroup.data.isExpanded = false;
						saveExistedGroup();
					};
					
					sc_message.onclick = function(){ if(this.data.isEnabled) newMail(1) };
					
					[sc_addToSelection, sc_addAsFriend, sc_block, sc_removeAll, sc_message, sc_saveGroup].map(function(btn)
					{
						var enable = function()
						{
							this.zm_css(cssStyles.rightBar.contacts.button.active);
							this.data.isEnabled = true;
						};
						var disable = function()
						{
							this.zm_css(cssStyles.rightBar.contacts.button.disabled);
							this.data.isEnabled = false;
						}
						btn.data.enable = function(){ enable.call(btn) };
						btn.data.disable = function(){ disable.call(btn) };
						btn.data.isEnabled = (btn == sc_saveGroup) ? false : true;
					});
					sc_resultsCont.onmouseover = function(){sc_findPlayer.data.isContFocused = true};
					sc_resultsCont.onmouseout = function(){sc_findPlayer.data.isContFocused = false};
					sc_lowerCont.onmouseover = function(){sc_findPlayer.data.isContFocused = true};
					sc_lowerCont.onmouseout = function(){sc_findPlayer.data.isContFocused = false};
					sc_findPlayer.data = {'results': [], 'selectedIndex': 0, 'selectedGroup': 'results', 'selectedButton': 0, 'isContOpen': false, 'isContFocused': false, 'buttons': [sc_addToSelection, sc_addAsFriend, sc_block]};
					sc_findPlayer.onblur = function()
					{
						if (this.data.isContOpen && !this.data.isContFocused)
						{
							this.value = 'Find player...';
							this.data.selectedGroup = 'results';
							this.data.buttons[this.data.selectedButton].zm_css({'background': '#4e4e4e', 'color': '#8b8b8b'});
							this.data.selectedButton = 0;
							this.data.selectedIndex = 0;
							sc_resultsCont.style.display = 'none';
							sc_lowerCont.style.display = 'none';
							sc_saveGroup.style.display = 'block';
						}
					};
					sc_findPlayer.onkeyup = function(event)
					{
						if(!event) event = window.event;
						root.preventDefaults(event);
						var populate = function(){ root.findContact.apply(root, arguments) };
						var changeSelection = function(){ root.changeContactSelection.apply(root, arguments) };
						var updateOptions = function(){ root.setContactOptions.apply(root, arguments) };
						var group = this.data.selectedGroup, btns = this.data.buttons;
						var i = this.data.selectedButton, l = btns.length, parent = this;
						var changeButton = function(mode)
						{
							var getIndex = function(mode, x)
							{
								return (mode) ? ((i + x) % l) : ((i - x < 0) ? l - x : i - x);
							};
							var n = (btns[getIndex(mode, 1)].data.isEnabled) ? getIndex(mode, 1) : getIndex(mode, 2);
							if(btns[i].data.isEnabled) btns[i].zm_css({'background': '#4e4e4e', 'color': '#8b8b8b'});
							if(btns[n].data.isEnabled) btns[n].zm_css({'background': '#266589', 'color': '#c2c2c2'});
							parent.data.selectedButton = n;
						}
						if([37, 38, 39, 40, 13, 9].indexOf(event.keyCode) == -1)
						{
							populate(this.value);
						}
						if(event.keyCode == 38 && this.data.isContOpen)
						{
							group == 'results' ? changeSelection(false) : changeButton(false);
						}
						if(event.keyCode == 40 && this.data.isContOpen)
						{
							group == 'results' ? changeSelection(true) : changeButton(true);
						}
						if(event.keyCode == 37 && this.data.isContOpen && group == 'buttons')
						{
							this.data.selectedGroup = 'results';
							var selectedButton = this.data.buttons[this.data.selectedButton];
							if(selectedButton.data.isEnabled) selectedButton.zm_css({'background': '#4e4e4e', 'color': '#8b8b8b'});
							this.data.selectedButton = 0;
						}
						if(event.keyCode == 39 && this.data.isContOpen && group == 'results')
						{
							this.data.selectedGroup = 'buttons';
							this.data.buttons[0].zm_css({'background': '#266589', 'color': '#c2c2c2'});
						}
						if(event.keyCode == 13 && this.data.isContOpen)
						{
							if (group == 'buttons')
							{
								this.data.buttons[this.data.selectedButton].onclick();
								updateOptions(this.data.results[this.data.selectedIndex].data.id);
								var button = this.data.buttons[this.data.selectedButton];
								if (button.data.isEnabled) button.zm_css({'background': '#266589', 'color': '#c2c2c2'});
								else
								{
									this.data.buttons[0].zm_css({'background': '#266589', 'color': '#c2c2c2'});
									this.data.selectedButton = 0;
								}
							}
						}
					};
					
			///////////////////////////////////////////////////////////////////////////////////
			
			//tools bar		
					var toolsConstructor = function()
					{
						var inboxMsg = create('ul', cssStyles.ul.toolbar.main);
						var newMsg = create('li', cssStyles.li.toolbar.withIcon);
						var reply = create('li', cssStyles.li.toolbar.withDrop);
						var mark = create('li', cssStyles.li.toolbar.withDrop);
						var trash = create('li', cssStyles.li.toolbar.textOnly);
						var restore = create('li', cssStyles.li.toolbar.textOnly);
						var empty = create('li', cssStyles.li.toolbar.textOnly);
						var del = create('li', cssStyles.li.toolbar.textOnly);
						var newMsgIcon = create('span', cssStyles.li.toolbar.newIcon);
						var junk = create('li', cssStyles.li.toolbar.textOnly);
						var notJunk = create('li', cssStyles.li.toolbar.textOnly);
						var markDrop = create('span', cssStyles.li.toolbar.drop);
						var replyDrop = create('span', cssStyles.li.toolbar.drop);
						var replyDropMenu = create('ul', cssStyles.ul.toolbar.sub);
						var markDropMenu = create('ul', cssStyles.ul.toolbar.sub);
						var replyTo = create('li', cssStyles.li.toolbar.sub);
						var replyToAll = create('li', cssStyles.li.toolbar.sub);
						var forwardTo = create('li', cssStyles.li.toolbar.sub);
						var read = create('li', cssStyles.li.toolbar.sub);
						var unread = create('li', cssStyles.li.toolbar.sub);
						var editDraft = create('li', cssStyles.li.toolbar.textOnly);
						var deleteDraft = create('li', cssStyles.li.toolbar.textOnly);
						var toDocuments = create('li', cssStyles.li.toolbar.textOnly);
						var notDocument = create('li', cssStyles.li.toolbar.textOnly);
						var fwdMsg = create('li', cssStyles.li.toolbar.textOnly);
						var tabs = [newMsg, reply, mark, del, junk, trash, notJunk, restore, empty, editDraft, deleteDraft, toDocuments, notDocument, fwdMsg];
						tabs.map(function(key)
						{
							key.addEventListener('mouseover', function(){this.style.backgroundImage = blueGrd}, false);
							key.addEventListener('mouseout', function(){this.style.backgroundImage = 'none'}, false);
							key.addEventListener('click', function(){this.style.backgroundImage = 'none'}, false);
						});
						text(newMsg, 'Новое');
						text(reply, 'Ответить');
						text(del, 'Удалить');
						text(mark, 'Пометить');
						text(junk, 'Спам');
						text(notJunk, 'Не спам');
						text(trash, 'Корзина');
						text(empty, 'Пусто');
						text(restore, 'Восстановить');
						text(replyTo, 'Ответить');
						text(replyToAll, 'Ответить всем');
						text(forwardTo, 'Переслать');
						text(read, 'Прочитанно');
						text(unread, 'Не прочитанно');
						text(editDraft, 'Редактировать');
						text(deleteDraft, 'Удалить');
						text(toDocuments, 'Документ');
						text(notDocument, 'Во входящие');
						text(fwdMsg, 'Переслать');
						markDrop.style.backgroundImage = 'url(' + root.res.drop + ')';
						replyDrop.style.backgroundImage = 'url(' + root.res.drop + ')';
						newMsgIcon.style.backgroundImage = 'url(' + root.res.compose + ')';
						forwardTo.style.borderBottom = 'none';
						unread.style.borderBottom = 'none';
						replyDropMenu.zm_append([replyTo, replyToAll, forwardTo]);
						markDropMenu.zm_append([read, unread]);
						newMsg.appendChild(newMsgIcon);
						mark.zm_append([markDrop, markDropMenu]);
						reply.zm_append([replyDrop, replyDropMenu]);
						inboxMsg.appendChild(newMsg);
						
						newMsg.onclick = root.callMethod('openNewMail');
						replyTo.onclick = root.callMethod('reply');
						replyToAll.onclick = root.callMethod('replyToAll');
						forwardTo.onclick = root.callMethod('forwardMsg');
						junk.onclick = root.callMethod('toJunk');
						notJunk.onclick = root.callMethod('notJunk');
						trash.onclick = root.callMethod('toTrash');
						restore.onclick = root.callMethod('notTrash');
						del.onclick = root.callMethod('deleteMsg');
						empty.onclick = root.callMethod('emptyFolder');
						read.onclick = root.callMethod('markRead', true);
						unread.onclick = root.callMethod('markRead', false);
						editDraft.onclick = root.callMethod('editDraft');
						deleteDraft.onclick = root.callMethod('deleteDraft');
						toDocuments.onclick = root.callMethod('toDocuments');
						notDocument.onclick = root.callMethod('notDocument');
						fwdMsg.onclick = root.callMethod('forwardMsg');
						
						var attachSub = function(btn, menu)
						{
							btn.data = {'isActive': false};
							menu.data = {'isFocused': false};
							btn.addEventListener('mouseover', function()
							{
								var isActive = this.data.isActive;
								menu.style.display = (isActive) ? 'none' : 'block';
								this.data.isActive = !isActive;
							}, false);
							btn.addEventListener('mouseout', function()
							{
								setTimeout(function(){if(!menu.data.isFocused){menu.style.display = 'none'; btn.data.isActive = false;}}, 100);
							}, false);
							menu.addEventListener('mouseover', function(){this.data.isFocused = true;}, false);
							menu.addEventListener('mouseout', function()
							{
								this.data.isFocused = false;
								setTimeout(function(){if(!menu.data.isFocused){menu.style.display = 'none'; btn.data.isActive = false;}}, 100);
							}, false);
							menu.addEventListener('click',  function()
							{
								this.data.isFocused = false;
								menu.style.display = 'none';
								btn.data.isActive = false;
							}, false);
						}
						attachSub(replyDrop, replyDropMenu);
						attachSub(markDrop, markDropMenu);
						
						root.dom.toolBar.compose = newMsg;
						root.dom.topBar.toolbar.newMsg = newMsg;
						root.dom.topBar.toolbar.reply = reply;
						root.dom.topBar.toolbar.trash = trash;
						root.dom.topBar.toolbar.delMsg = del;
						root.dom.topBar.toolbar.junk = junk;
						root.dom.topBar.toolbar.notJunk = notJunk;
						root.dom.topBar.toolbar.restore = restore;
						root.dom.topBar.toolbar.empty = empty;
						root.dom.topBar.toolbar.mark = mark;
						root.dom.topBar.toolbar.editDraft = editDraft;
						root.dom.topBar.toolbar.deleteDraft = deleteDraft;
						root.dom.topBar.toolbar.toDocuments = toDocuments;
						root.dom.topBar.toolbar.notDocument = notDocument;
						root.dom.topBar.toolbar.forwardMsg = fwdMsg;
						this.inboxMsg = inboxMsg;
					};
					
					var toolbars = new toolsConstructor();
					tbMenu.appendChild(toolbars.inboxMsg);
			///////////////////////////////////////////////////////////////////////////////////
			
			//create main dom tree		
					this.dom.window.main = winCont;
					this.dom.rightBar.cont = rightBar;
					this.dom.rightBar.msgCont = msgCont;
					this.dom.rightBar.scrollBar.cont = msgSbc;
					this.dom.rightBar.scrollBar.bar = msgSb;
					this.dom.rightBar.expandCont = expandCont;
					this.dom.searchResults.cont = resultsCont;
					this.dom.searchResults.sender.count = bySenderCount;
					this.dom.searchResults.subject.count = bySubjectCount;
					this.dom.searchResults.sender.list = bySenderUl;
					this.dom.searchResults.subject.list = bySubjectUl;
					this.dom.middleBar.headersCont = headersCont;
					this.dom.middleBar.scrollBar.cont = headersSbc;
					this.dom.middleBar.footer.selectAll = selectAllCheckBox;
					this.dom.middleBar.footer.pagesCount = pagesControlLabel;
					this.dom.middleBar.footer.indicator = pagesInd;
					this.dom.middleBar.footer.controlCont = pagesControlCont;
					this.dom.topBar.logo = logo;
					this.dom.topBar.menu = toolbars.inboxMsg;
			///////////////////////////////////////////////////////////////////////////////////
			
			//compose message container		
					var composeCont = create('div', cssStyles.compose.window);
					var c_topBar = create('div', cssStyles.topBar.main);
					var c_topBarCont = create('div', cssStyles.topBar.cont);
					var c_leftBar = create('div', cssStyles.compose.leftBar.cont);
					var c_rightBar = create('div', cssStyles.compose.rightBar.cont);
					var c_leftBarWrapper = create('div', cssStyles.tableCellWrapper);
					var c_rightBarWrapper = create('div', cssStyles.tableCellWrapper);
					var c_logo = logo.cloneNode(true);
					var c_tbMenu = create('div', cssStyles.topBar.menu);
					var c_recipients = create('div', cssStyles.compose.leftBar.recipients.main);
					var c_recipientsMask = create('div', cssStyles.compose.leftBar.recipients.mask);
					var c_recipientsCont = create('div', cssStyles.compose.leftBar.recipients.cont);
					var c_recipientsSbc = create('div', cssStyles.compose.leftBar.recipients.scrollbar.cont);
					var c_recipientsSb = create('div', cssStyles.compose.leftBar.recipients.scrollbar.bar);
					var c_searchResults = create('div', cssStyles.compose.leftBar.recipients.searchBox.cont);
					var c_contacts = create('div', cssStyles.compose.leftBar.contacts.cont);
					var c_subject = create('textField', cssStyles.compose.rightBar.textField);
					var c_msgToolbar = create('div', cssStyles.compose.rightBar.toolbar.cont);
					var c_msgBody = create('iframe', cssStyles.compose.rightBar.textArea);
					var c_expandCont = create('div', cssStyles.compose.rightBar.expand);
					
					//table options
					var c_tableOptions = create('div', cssStyles.tableCellWrapper);
					var c_rowsCont = create('div', cssStyles.compose.leftBar.tableOptions.inputCont);
					var c_rowsInput = create('textField', cssStyles.compose.leftBar.tableOptions.input);
					var c_rowsLabel = create('div', cssStyles.compose.leftBar.tableOptions.label);
					var c_colsInput = create('textField', cssStyles.compose.leftBar.tableOptions.input);
					var c_colsCont = create('div', cssStyles.compose.leftBar.tableOptions.inputCont);
					var c_colsLabel = create('div', cssStyles.compose.leftBar.tableOptions.label);
					var c_headerCheckbox = create('div', cssStyles.compose.leftBar.tableOptions.checkbox);
					var c_headerLabel = create('span', cssStyles.compose.leftBar.tableOptions.span);
					var c_expandCheckbox = create('div', cssStyles.compose.leftBar.tableOptions.checkbox);
					var c_expandLabel = create('span', cssStyles.compose.leftBar.tableOptions.span);
					var c_addTable = create('div', cssStyles.compose.leftBar.tableOptions.button);
					var c_cancelTable = create('div', cssStyles.compose.leftBar.tableOptions.button);
					text(c_rowsLabel, 'Rows');
					text(c_colsLabel, 'Columns');
					text(c_headerLabel, 'Header');
					text(c_expandLabel, 'Expand horizontally');
					text(c_addTable, 'Add table');
					text(c_cancelTable, 'Cancel');
					c_tableOptions.data = {'isOpen': false};
					c_headerCheckbox.data = {'isChecked': false};
					c_expandCheckbox.data = {'isChecked': false};
					c_tableOptions.style.paddingTop = '10px';
					[c_expandCheckbox, c_headerCheckbox].map(function(checkBox)
					{
						checkBox.onmousedown = function(){this.style.background = '#202020'};
						checkBox.onmouseup = function()
						{
							var isChecked = this.data.isChecked;
							this.style.background = (isChecked) ? 'transparent' : '#9f9f9f';
							this.data.isChecked = !isChecked;
						};
					});
					c_rowsCont.zm_append([c_rowsInput, c_rowsLabel]);
					c_colsCont.zm_append([c_colsInput, c_colsLabel]);
					c_headerCheckbox.appendChild(c_headerLabel);
					c_expandCheckbox.appendChild(c_expandLabel);
					c_tableOptions.zm_append([c_rowsCont, c_colsCont, c_headerCheckbox, c_expandCheckbox, c_addTable, c_cancelTable]);
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					
					//Compose contacts list
					var createComposeContacts = function()
					{
						try
						{
							var c_contactsCont = create('div', cssStyles.compose.leftBar.contacts.main);
							var c_mainUl = create('ul', cssStyles.compose.leftBar.contacts.ul.main);
							var c_subUl = create('ul', cssStyles.compose.leftBar.contacts.ul.sub);
							var c_contactsLi = create('li', cssStyles.compose.leftBar.contacts.li.main);
							var c_contLi = create('li', cssStyles.compose.leftBar.contacts.li.main);
							text(c_contactsLi, 'Контакты');
							var c_contactsList = ['Альянс', 'Командиры', 'Офицеры', 'Союзники', 'Друзья', 'Группы'];
							c_contactsList.map(function(name)
							{
								var data = zmail.data.getInstance();
								var li = create('li', cssStyles.compose.leftBar.contacts.li.sub);
								var div = create('div', cssStyles.compose.leftBar.contacts.select);
								var divText = document.createTextNode(name);
								var selectSpan = create('span', cssStyles.compose.leftBar.contacts.span.sub);
								var itemsCont = create('ul', cssStyles.compose.leftBar.contacts.ul.span);
								var selectSbc = create('div', cssStyles.compose.leftBar.contacts.scrollbar.cont);
								var selectSb = create('div', cssStyles.compose.leftBar.contacts.scrollbar.bar);
								var span = create('span', cssStyles.compose.leftBar.contacts.span.main);
								text(span, 'Add selected');
								div.appendChild(divText);
								div.data = {'selected': null};
								itemsCont.data = {'isFocused': false};
								div.addEventListener('mouseover', function()
								{
									if (itemsCont.children.length > 0)
									{
										divText.nodeValue = '+ ' + divText.nodeValue;
										this.style.cursor = 'pointer';
									}
									else this.style.cursor = 'default';
								}, false);
								div.addEventListener('mouseout', function(){divText.nodeValue = divText.nodeValue.replace('+ ', '')}, false);
								div.onclick = function()
								{
									if (itemsCont.children.length > 0) selectSpan.style.display = 'block';
								};
								itemsCont.addEventListener('mouseout', function()
								{ 
									setTimeout(function(){if (!itemsCont.data.isFocused) selectSpan.style.display = 'none'}, 50);
									itemsCont.data.isFocused = false;
								}, false);
								li.addEventListener('mouseover', function(){if(div.data.selected !== null) span.style.display='block'}, false);
								li.addEventListener('mouseout', function()
								{
									span.style.display = 'none';
									setTimeout(function(){if (!itemsCont.data.isFocused) selectSpan.style.display = 'none'}, 50);
								}, false);
								selectSbc.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
								selectSb.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
								
								var extractName = function(obj)
								{
									if (obj.hasOwnProperty('name')) return obj.name;
									else if(obj.hasOwnProperty('n')) return obj.n;
									else console.log('zmail: ' + 'Error: ' + obj + ' doesn\'t have property name');
								};
								var compareName = function(a,b)
								{
									return (a.toLowerCase() > b.toLowerCase()) ? 1 : (a.toLowerCase() < b.toLowerCase()) ? -1 : 0;
								};
								var contacts = ((name == 'Allies')||(name == 'Groups')) ? {} : [];
								switch(name)
								{
									case 'Friends':
										root.contacts.friends.map(function(x)
										{
											var c = root.getPlayerDataById(x);
											c.name = c.pn;
											contacts.push(c);
										});						
									break;
									case 'Allies':
										var arr = data.allies;
										if (arr) for (var x in arr) contacts[x] = arr[x].map(extractName);
									break;
									case 'Groups':
										var arr = root.contacts.groups;
										if (arr) for (var x in arr) contacts[x] = arr[x].map(extractName);
									break;
									case 'Alliance': if (data.allianceMembers) contacts = data.allianceMembers.map(extractName); break;
									case 'Commanders': if (data.allianceCommanders) contacts = data.allianceCommanders.map(extractName); break;
									case 'Officers': if (data.allianceOfficers) contacts = data.allianceOfficers.map(extractName); break;
								}
								span.onclick = function()
								{
									var con = div.data.selected;
									for (var i = 0; i < con.length; i++) root.addRecipient(con[i]);
									divText.nodeValue = name;
									div.data.selected = (name == 'Allies') ? null : contacts;
								};
									
								var selectItem = function(a,b)
								{
									var fn = function()
									{
										divText.nodeValue = a;
										div.data.selected = b;
										selectSpan.style.display = 'none';
									}
									return fn;
								};
								
								if ((name != 'Allies') && (name != 'Groups') && contacts && (contacts.length > 0))
								{
									contacts.sort(compareName);
									var All = create('li', cssStyles.compose.leftBar.contacts.li.span);
									text(All, 'All');
									itemsCont.appendChild(All);
									All.onclick = selectItem(name, contacts);
									All.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
									for(var i = 0; i < contacts.length; i++)
									{
										var Item = create('li', cssStyles.compose.leftBar.contacts.li.span);
										text(Item, contacts[i]);
										Item.onclick = selectItem(contacts[i], [contacts[i]]);
										Item.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
										itemsCont.appendChild(Item);
									}
									div.data.selected = contacts;
								}
								else if ((name == 'Allies') && contacts && (root.size(contacts) > 0))
								{
									for (var an in contacts)
									{
										var Item = create('li', cssStyles.compose.leftBar.contacts.li.span);
										text(Item, an);
										Item.onclick = selectItem(an, contacts[an].sort(compareName));
										Item.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
										itemsCont.appendChild(Item);
									}
								}
								else if ((name == 'Groups') && contacts && (root.size(contacts) > 0))
								{
									for (var gn in contacts)
									{
										var Item = create('li', cssStyles.compose.leftBar.contacts.li.span);
										text(Item, gn);
										Item.onclick = selectItem(gn, contacts[gn].sort(compareName));
										Item.addEventListener('mouseover', function(){itemsCont.data.isFocused = true}, false);
										itemsCont.appendChild(Item);
									}
								}
								else
								{
									if (contacts) console.log('zmail: ' + name + ' contacts empty');
									else console.log('zmail: ' + name + 'contacts undefined');
								}
								
								selectSbc.appendChild(selectSb);
								selectSpan.zm_append([itemsCont, selectSbc]);
								div.appendChild(selectSpan);
								li.zm_append([div, span]);
								c_subUl.appendChild(li);
								root.enableScroll(selectSb, selectSbc, itemsCont);
								var ch = itemsCont.children.length * 24, ph = Math.min(172, ch + 4);
								selectSpan.style.height = ph + 'px';
								selectSb.style.height = ph * (ph - 20) / ch + 'px';
								selectSbc.style.display = (ch < 168) ? 'none': 'block';
							});
							c_mainUl.zm_append([c_contactsLi, c_contLi]);
							c_contLi.appendChild(c_subUl);
							c_contactsCont.appendChild(c_mainUl);
							if(root.dom.compose.leftBar.contactsCont !== null) c_leftBar.removeChild(root.dom.compose.leftBar.contactsCont);
							c_leftBar.appendChild(c_contactsCont);
							root.dom.compose.leftBar.contactsCont = c_contactsCont;
						}
						catch(e)
						{
							console.log('zmail: ' + e.toString());
						}
					}
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					
					var c_search = create('textField', cssStyles.compose.leftBar.recipients.textField);
					var c_searchCont = create('p', cssStyles.compose.leftBar.recipients.textFieldCont);
					var c_toolBar =  create('ul', cssStyles.ul.toolbar.main);
					var c_sendMsg = create('li', cssStyles.li.toolbar.withIcon);
					var c_sendMsgIcon = create('span', cssStyles.li.toolbar.newIcon);
					var c_cancelMsg = create('li', cssStyles.li.toolbar.textOnly);
					var c_saveDraft = create('li', cssStyles.li.toolbar.textOnly);
					text(c_sendMsg, 'Send');
					text(c_cancelMsg, 'Cancel');
					text(c_saveDraft, 'Save draft');
					c_sendMsgIcon.style.backgroundImage = 'url(' + root.res.sendMail + ')';
					c_sendMsg.appendChild(c_sendMsgIcon);
					c_toolBar.zm_append([c_sendMsg, c_cancelMsg, c_saveDraft]);
					c_tbMenu.appendChild(c_toolBar);
					c_topBarCont.zm_append([c_logo, c_tbMenu]);
					c_topBar.appendChild(c_topBarCont);
					c_searchCont.appendChild(c_search);
					c_recipientsMask.appendChild(c_recipientsCont);
					c_recipients.zm_append([c_recipientsMask, c_recipientsSbc]);
					c_recipientsSbc.appendChild(c_recipientsSb);
					this.enableScroll(c_recipientsSb, c_recipientsSbc, c_recipientsCont);
					c_msgBody.scrolling = 'no';
					c_expandCont.style.backgroundImage = 'url(' + this.res.expandDocument + ')';
					c_expandCont.data = {'isExpanded': false, 'isFocused': false};
					c_expandCont.onmouseover = function(){this.data.isFocused = true};
					c_expandCont.onmouseout = function(){this.data.isFocused = false; this.style.visibility = 'hidden';};
					c_search.data = {'results': [], 'selectedIndex': 0, 'isContOpen': false, 'isContFocused': false};
					[c_sendMsg, c_cancelMsg, c_saveDraft].map(function(key)
					{
						key.addEventListener('mouseover', function(){this.style.backgroundImage = blueGrd}, false);
						key.addEventListener('mouseout', function(){this.style.backgroundImage = 'none'}, false);
						key.addEventListener('click', function(){this.style.backgroundImage = 'none'}, false);
					});
					var countMsgLength = function(){ root.getCharactersCount.apply(root, arguments) };
					c_sendMsg.onclick = function()
					{
						root.sendMail.call(root);
						zmail.compose.getInstance()._onClose();
					};
					c_saveDraft.onclick = function()
					{
						root.saveDraft.call(root);
						zmail.compose.getInstance()._onClose();
					};
					c_cancelMsg.onclick = function()
					{
						zmail.compose.getInstance()._onClose();
					};
					c_expandCont.onclick = function()
					{
						var expanded = this.data.isExpanded;
						this.style.backgroundImage = (expanded) ? 'url('+root.res.expandDocument+')' : 'url('+root.res.contractDocument+')';
						c_leftBar.style.display = (expanded) ? 'table-cell' : 'none';
						this.data.isExpanded = !expanded;
					};
					
					var c_searchResultsMask = create('div', cssStyles.compose.leftBar.recipients.searchBox.mask);
					var c_searchResultsSbc = create('div', cssStyles.compose.leftBar.recipients.searchBox.scrollbar.cont);
					var c_searchResultsCont = create('div', cssStyles.compose.leftBar.recipients.searchBox.itemsCont);
					var c_msgHeader = create('div', cssStyles.compose.rightBar.msgHeader);
					var c_msgMask = create('div', cssStyles.compose.rightBar.msgMask);
					var c_msgCont = create('div', cssStyles.compose.rightBar.msgCont);
					var c_msgSbc = create('div', cssStyles.compose.rightBar.scrollBar.cont);
					var c_msgSb = create('div', cssStyles.compose.rightBar.scrollBar.bar);
					var c_toText = create('div', cssStyles.compose.leftBar.recipients.toText);
					var c_charCount = create('div', cssStyles.compose.leftBar.recipients.count);
					text(c_toText, 'Кому:');
					this.placeHolder(c_subject, 'Добавить получателя:');
					c_recipientsCont.appendChild(c_searchCont);
					c_searchResultsMask.appendChild(c_searchResultsCont);
					c_searchResults.zm_append([c_searchResultsMask, c_searchResultsSbc]);
					c_leftBarWrapper.zm_append([c_toText, c_recipients, c_searchResults, c_contacts]);
					c_leftBar.appendChild(c_leftBarWrapper);
					c_msgCont.appendChild(c_msgBody);
					c_msgHeader.zm_append([c_subject, c_msgToolbar, c_expandCont]);
					c_msgMask.zm_append([c_msgCont, c_msgHeader, c_charCount]);
					c_rightBarWrapper.zm_append([c_msgMask, c_msgSbc]);
					c_rightBar.appendChild(c_rightBarWrapper);
					composeCont.zm_append([c_topBar, c_leftBar, c_rightBar]);
					c_searchResultsCont.onmouseover = function(){c_search.data.isContFocused = true};
					c_searchResultsCont.onmouseout = function(){c_search.data.isContFocused = false};
					c_msgSbc.appendChild(c_msgSb);
					root.enableScroll(c_msgSb, c_msgSbc, c_msgCont);
					c_msgSb.style.display = 'none';
					c_subject.addEventListener('mouseover', function(){c_expandCont.style.visibility = 'visible';}, false);
					c_subject.addEventListener('mouseout', function()
					{
						setTimeout(function(){if (!c_expandCont.data.isFocused) c_expandCont.style.visibility = 'hidden'}, 50);
					}, false);
					
					this.dom.compose.leftBar.results.mainCont = c_searchResults;
					this.dom.compose.leftBar.results.resultsCont = c_searchResultsCont;
					this.dom.compose.leftBar.results.scrollbarCont = c_searchResultsSbc;
					this.dom.compose.leftBar.searchBox = c_search;
					this.dom.compose.leftBar.searchBoxCont = c_searchCont;
					this.dom.compose.leftBar.recipientsMainCont = c_recipients;
					this.dom.compose.leftBar.recipientsCont = c_recipientsCont;
					this.dom.compose.leftBar.recipientsSbc = c_recipientsSbc;
					this.dom.compose.leftBar.recipientsSb = c_recipientsSb;
					this.dom.compose.rightBar.iframe = c_msgBody;
					this.dom.compose.rightBar.msgCont = c_msgCont;
					this.dom.compose.rightBar.subject = c_subject;
					this.dom.compose.rightBar.charCount = c_charCount;
					
					//find contact
					c_search.onblur = function()
					{
						if (this.data.isContOpen && !this.data.isContFocused)
						{
							var rest = function() { root.clearPlayersSearch.apply(root, arguments); };
							var add = function() { root.addRecipient.apply(root, arguments); };
							if( root.completePlayerMatch ) add(this.value);
							this.value = '';
							rest(0);
						}
					};
					c_search.onkeyup = function(event)
					{
						if(!event) event = window.event;
						event.preventDefault();
						var add = function(){ root.addRecipient.apply(root, arguments); };
						if([38, 40, 13, 9].indexOf(event.keyCode) == -1)
						{
							var populate = function(){ root.findPlayer.apply(root, arguments); };
							populate(this.value);
						}
						if(event.keyCode == 40 && this.data.isContOpen)
						{
							var next = function(){ root.changePlayerSelection.apply(root, arguments); };
							next(true);
						}
						if(event.keyCode == 38 && this.data.isContOpen)
						{
							var previous = function(){ root.changePlayerSelection.apply(root, arguments); };
							previous(false);
						}
						if(event.keyCode == 13 && this.data.isContOpen)  add(this.data.results[this.data.selectedIndex].data.name);
					};
					//////////////////////////////////////////////////////////////////////////////
					
					//IFRAME onload + compose message toolbar
					c_msgBody.onload = function()
					{
						createComposeContacts.call(root);
						c_msgToolbar.zm_empty();
						c_msgCont.style.top = 0;
						var iframe = c_msgBody.contentWindow.document;
						var ibody = iframe.body;
						var updateMessage = function(doc)
						{
							var msg = this.encodeMsg(doc);
							var count = this.getCharactersCount(msg);
							c_charCount.innerHTML = 3000 - parseInt(count, 10);
						};
						var updateScroll = function()
						{
							var h = c_msgBody.contentWindow.document.body.offsetHeight;
							var ph = c_msgMask.offsetHeight, ch = c_msgCont.offsetHeight;
							c_msgBody.style.height = Math.max(100, h + 10) + 'px';
							c_msgSb.style.display = (ch > ph) ? 'block' : 'none';
							c_msgSb.data.update();
							if ((ch > ph) && (c_msgCont.offsetTop + (ch - ph) - 50 < 0)) c_msgSb.data.scrollToEnd();
						};
						var style = iframe.createElement("style");
						var addCSSRule = function(sheet, selector, rules, index)
						{
							(sheet.insertRule) ? sheet.insertRule(selector + "{" + rules + "}", index) : sheet.addRule(selector, rules, index);
						};
						style.appendChild(iframe.createTextNode(""));
						iframe.getElementsByTagName('head')[0].appendChild(style);
						var sheet = style.sheet;
						addCSSRule(sheet, "html", "color:#999; font-family:vrinda; font-size:14px;", 0);
						addCSSRule(sheet, "body", "width:100%; margin:0; padding:0 0 10px 0; word-wrap:break-word; line-height: 18px;", 1);
						addCSSRule(sheet, "ul", "margin:0; color:#999;", 2);
						addCSSRule(sheet, "ol", "margin:0; color:#999;", 3);
						addCSSRule(sheet, "li", "font-family:vrinda; color:#999;", 4);
						addCSSRule(sheet, "a", "font-family: vrinda", 5);
						addCSSRule(sheet, "div", "font-family:vrinda; color:#999;", 6);
						addCSSRule(sheet, "blockquote", "font-family:vrinda; color:#999;", 7);
						addCSSRule(sheet, "table", "border-color: #999; color: #999; font-family: vrinda; font-size: 14px;", 8);
						addCSSRule(sheet, "th", "background-color: #999; color: #333; padding: 3px 15px; font-weight: normal; color: #292929; font-family: vrinda; font-size: 14px;", 9);
						addCSSRule(sheet, "td", "padding: 4px 15px; color: #999; font-family: vrinda; font-size: 14px; word-wrap: break-word;", 10);
						addCSSRule(sheet, ".quote", "padding:10px; border:1px solid #5a5a5a; background:#303030; box-sizing:border-box; -moz-box-sizing:border-box; word-wrap:break-word", 11);
						addCSSRule(sheet, ".quote p", "padding: 0; margin: 0;", 12);
			
						iframe.designMode = 'on';
						ibody.innerHTML = (root.iframeContent) ? root.iframeContent : 'Add Text';
						c_charCount.innerHTML = 3000 - root.getCharactersCount();
						
						c_msgBody.contentWindow.onfocus = function()
						{
							if (ibody.innerHTML == 'Add Text') ibody.innerHTML = ''
							if (c_tableOptions.data.isOpen)
							{
								c_leftBar.removeChild(c_tableOptions);
								c_leftBarWrapper.style.display = 'block';
								c_tableOptions.data.isOpen = false;
							}
						};
						c_msgBody.contentWindow.onblur = function(){if(ibody.innerHTML == '' || ibody.innerHTML == '<br>') ibody.innerHTML = 'Add Text'};
						c_msgBody.contentWindow.onkeyup = function()
						{
							var clone = this.document.body.cloneNode(true);
							root.iframeContent = this.document.body.innerHTML;
							updateMessage.call(root, clone);
							this.document.body.style.display = 'inline-block';
							updateScroll();
							this.document.body.style.display = 'block';
						};
						
						var getSelectedText = function()
						{
							var sel, range, selectedText;
							if (c_msgBody.contentWindow.getSelection)
							{
								sel = c_msgBody.contentWindow.getSelection();
								if (sel.rangeCount) selectedText = sel.getRangeAt(0).toString();
							}
							else if (iframe.selection && iframe.selection.createRange) selectedText = iframe.selection.createRange().text + "";
							return selectedText;
						};
						
						var createLink = function(type)
						{
							var generateLink = function(txt)
							{
								var data = zmail.data.getInstance(), bb = data.createBBCode, a;
								switch(type)
								{
									case 'coords': a = (txt.match(/^\d+:\d+$/)) ? bb.coords(txt, txt.split(':')[0], txt.split(':')[1]) : false; break;
									case 'player': a = bb.player(txt); break;
									case 'alliance': a = bb.alliance(txt); break;
								}
								return a;
							};
							var selectedText = getSelectedText();
							var Link = generateLink(selectedText).replace('webfrontend', 'parent.webfrontend');
							if(Link) return Link;
						};
						
						var resetTableOptions = function()
						{
							c_rowsInput.value = '';
							c_colsInput.value = '';
							c_headerCheckbox.data.isChecked = false;
							c_expandCheckbox.data.isChecked = false;
							c_headerCheckbox.style.background = 'transparent';
							c_expandCheckbox.style.background = 'transparent';
						};
						
						var addTable = function()
						{
							if (c_expandCont.data.isExpanded) c_expandCont.onclick();
							if (c_tableOptions.data.isOpen) return;
							c_leftBarWrapper.style.display = 'none';
							c_leftBar.appendChild(c_tableOptions);
							resetTableOptions();
							c_addTable.onclick = function()
							{
								var rows = c_rowsInput.value;
								var cols = c_colsInput.value;
								var header = c_headerCheckbox.data.isChecked;
								var stretch = c_expandCheckbox.data.isChecked;
								var table = document.createElement('table');
								var tbody = document.createElement('tbody');
								table.rules = 'all';
								table.border = '1';
								table.className = 'table';
								table.style.minWidth = cols * 40 + 'px';
								table.cellpadding = 0;
								table.cellspacing = 0;
								if(stretch) table.width = '100%';
								for(var r = 0; r < rows; r++)
								{
									var tr = document.createElement('tr');
									for (var c = 0; c < cols; c++)
									{
										var td = (header && r == 0) ? document.createElement('th') : document.createElement('td');
										td.innerText = '\u200B';
										tr.appendChild(td);
									}
									tbody.appendChild(tr);
								}
								table.appendChild(tbody);
								c_msgBody.contentWindow.focus();
								iframe.execCommand('insertHTML', false, table.outerHTML + '<br/>\u200B');
								updateScroll();
							};
							c_cancelTable.onclick = function()
							{
								c_leftBar.removeChild(c_tableOptions);
								c_leftBarWrapper.style.display = 'block';
								c_tableOptions.data.isOpen = false;
							};
							c_tableOptions.data.isOpen = true;
						};
						
						var insertLink = function()
						{
							var val = getSelectedText();
							if (val == '') return;
							var a = create('a', cssStyles.link._14);
							text(a, val);
							a.href = val;
							a.target = 'blank';
							iframe.execCommand('insertHTML', false, a.outerHTML + '<br/>\u200B');
						};
						
						var insertQuote = function()
						{
							var txt = getSelectedText();
							if (txt == '') txt = '\u200B';
							var html = '<div class="quote"><p>' + txt + '</p></div><br/>';
							iframe.execCommand('insertHTML', false, html);
						};
						
						for (var key in root.res.tools)
						{
							var div = create('div', cssStyles.compose.rightBar.toolbar.icon);
							div.onmousedown = function(event){ root.preventDefaults(event) };
							var callback;
							
							switch(key)
							{
								case 'coords':
									callback = function(){iframe.execCommand('insertHTML', false, createLink('coords') + '\u200B')};
								break;
								case 'player':
									callback = function(){iframe.execCommand('insertHTML', false, createLink('player') + '\u200B')};
								break;
								case 'alliance':
									callback = function(){iframe.execCommand('insertHTML', false, createLink('alliance') + '\u200B')};
								break;
								case 'table': callback = addTable; break;
								case 'link': callback = insertLink; break;
								case 'quote': callback = insertQuote; break;
								default: callback = function(){iframe.execCommand(this.data.id, false, null)};
							}
							div.data = {'id': key, 'callback': callback};
							div.onclick = function()
							{
								this.data.callback.call(this);
								if (key != 'table') c_msgBody.contentWindow.focus();
								updateMessage.call(root, ibody.cloneNode(true));
							};
							div.style.backgroundImage = root.res.tools[key];
							c_msgToolbar.appendChild(div);
						}
						
						var updateRecipientsHeight = function()
						{
							c_recipients.style.height = Math.max(28, Math.min(180, c_recipientsCont.offsetHeight)) + 'px';
							if (c_recipientsCont.offsetHeight == 0 && root.recipients.length > 0) setTimeout(updateRecipientsHeight, 100);
							else
							{
								c_recipientsSbc.style.visibility = (c_recipientsCont.offsetHeight < 180) ? 'hidden' : 'visible';
								c_recipientsSb.data.update();
								c_recipientsSb.data.scrollToEnd();
							}
						}
						c_msgBody.contentWindow.focus();
						updateRecipientsHeight();
						updateScroll();
					}
					
					this.dom.window.compose = composeCont;
					//////////////////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////////////////////////
				}
				catch(e)
				{
					console.log('zmail: ' + e.toString());
				}
			},
			
			destruct: function(){},
			
			members:
			{
				iframeContent: null,
				selectedFolder: 'inbox',
				selectedGroup: false,
				selectedMsgs: {'ids': [], 'headers': [], 'checkBoxes': []},
				selectedHeader: null,
				selectedContacts: [],
				selectedPage: 0,
				selectedDraft: null,
				callUpdate: null,
				isLoaded: false,
				generatedHeaders: {},
				generatedSections: [],
				recipients: [],
				completePlayerMatch: false,
				openNotificationsCount: 0,
				downloadsCont: null,
				folders: {
					'inbox': {'ids': [], 'msgs': []},
					'outbox': {'ids': [], 'msgs': []},
					'junk': {'ids': [], 'msgs': []},
					'trash': [{'ids': [], 'msgs': []}, {'ids': [], 'msgs': []}],
					'draft': {},
					'documents': {'ids': [], 'msgs': []}
				},
				
				contacts: {
					'friends': [],
					'blocked': [],
					'groups': {}
				},
				
				callMethod: function (fn, args)
				{
					var root = this;
					var callback = function()
					{
						root[fn].call(root, args);
					}
					return callback;
				},
				
				applyMethod: function (fn, args)
				{
					var root = this;
					root[fn].apply(root, args)
				},
				
				create: function (type, css)
				{
					var elm;
					switch(type)
					{
						case 'textField': elm = document.createElement('input'); elm.type = 'text'; break;
						case 'checkBox': elm = document.createElement('input'); elm.type = 'checkBox'; break;
						default: elm = document.createElement(type);
					}
					
					var iterator = function(obj)
					{
						for(var x in obj) elm.style[x] = obj[x];
					};
					
					var onDown = function(down, over, out)
					{
						elm.addEventListener('mousedown', function(event)
						{
							var el = event.target;
							el.onmouseout = null;
							el.onmouseover = null;
							for (var x in down) el.style[x] = down[x];
							var onUp = function()
							{
								el.onmouseout = function(){for (var x in out) el.style[x] = out[x]};
								el.onmouseover = function(){for (var x in over) el.style[x] = over[x]};
								for (var x in out) el.style[x] = out[x];
								document.removeEventListener('mouseup', onUp, false);
							};
							document.addEventListener('mouseup', onUp, false);
						}, false);
					};
					
					if (css === null) return elm;
					for (var key in css) {
						var prop = css[key];
						switch(key)
						{
							case 'over': elm.onmouseover = function(){iterator(css['over'])}; break;
							case 'out': elm.onmouseout = function(){iterator(css['out'])}; break;
							case 'focus': elm.onfocus = function(){iterator(css['focus'])}; break;
							case 'blur': elm.onblur = function(){iterator(css['blur'])}; break;
							case 'down': onDown(css['down'], css['up'], css['out']); break;
							case 'up': ; break;
							default: elm.style[key] = css[key];
						}
					}
					return elm;
				},
				
				gradient: function (stop1, stop2)
				{
					var browser = navigator.userAgent;
					if (browser.indexOf('Chrome') !== -1) browser = 'chrome';
					else if (browser.indexOf('Firefox') !== -1) browser = 'firefox';
					else browser = 'unsupported';
					var grd = '';
					switch (browser) {
						case 'chrome':
							grd = '-webkit-linear-gradient(top, ' + stop1 + ' 0%, ' + stop2 + ' 100%)';
							break;
						case 'firefox':
							grd = '-moz-linear-gradient(top, ' + stop1 + ' 0%, ' + stop2 + ' 100%)';
							break;
						default:
							alert('your Browser is not supported');
					}
					return grd;
				},
				
				text: function(elm, txt)
				{
					elm.appendChild(document.createTextNode(txt));
				},
				
				size: function(obj)
				{
					if(typeof obj !== 'object') return null;
					var s = 0;
					for (var key in obj) s++;
					return s;
				},
				
				placeHolder: function(input, val)
				{
					input.value = val;
					input.addEventListener('focus', function(){if (input.value == val) input.value = ''}, false);
					input.addEventListener('blur', function(){if (input.value == '') input.value = val}, false);
				},
				
				preventDefaults: function(e)
				{
					if (!e) e = window.event;
					e.preventDefault();
					e.stopPropagation();
				},
				
				enableScroll: function(elm, parent, cont)
				{
					var pos, ph = parent.offsetHeight, ch = cont.offsetHeight, elmY, contY;
					var scale = ch / (ph - 20);
					var bh = ph / scale;
					elm.style.height = bh + 'px';
					var update = function()
					{
						elmY = elm.offsetTop;
						contY = cont.offsetTop;
						ph = parent.offsetHeight;
						ch = cont.offsetHeight;
						scale = ch / (ph - 20);
						bh = ph / scale;
						if (ch <= ph) cont.style.top = 0;
						elm.style.height = bh + 'px';
						elm.style.top = -contY / scale + 10 + 'px';
						elm.style.display = (ch <= ph) ? 'none' : 'block';
					};
					var scrollToEnd = function()
					{
						if (ch > ph)
						{
							elm.style.top = ph - bh - 10 + 'px';
							cont.style.top = ph - ch + 'px';
						}
					};
					elm.data = {'update': update, 'scrollToEnd': scrollToEnd};
					var onMove = function(event)
					{
						var e = (event) ? event : window.event, dist = e.pageY - pos;
						if(elmY + dist < 10)
						{
							elm.style.top = '10px';
							cont.style.top = 0;
						}
						else if(elmY + dist + bh > ph - 10)
						{
							elm.style.top = ph - bh - 10 + 'px';
							cont.style.top = ph - ch + 'px';
						}
						else
						{
							elm.style.top = elmY + dist + 'px';
							cont.style.top =  contY - scale * dist + 'px';
						}
					};
					
					var onUp = function()
					{
						document.removeEventListener('mousemove', onMove, false);
						document.removeEventListener('mouseup', onUp, false);
					};
					
					elm.onmousedown = function(event)
					{
						var e = (event) ? event : window.event, y = e.pageY;
						e.preventDefault();
						pos = y;
						update();
						if (elm.offsetHeight != bh) elm.style.height = bh + 'px';
						document.addEventListener('mousemove', onMove, false);
						document.addEventListener('mouseup', onUp, false);
					};
					
					var onWheel = function(event){
						var e = (event) ? event : window.event;
						e.preventDefault();
						if (ch < ph) return;
						if (ch == 0) update();
						var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail) ));
						var ct = cont.offsetTop, et = elm.offsetTop;
						var dist = delta * -20 / scale;
						if(et + dist < 10)
						{
							elm.style.top = '10px';
							cont.style.top = 0;
						}
						else if(et + dist + bh > ph - 10)
						{
							elm.style.top = ph - bh - 10 + 'px';
							cont.style.top = ph - ch + 'px';
						}
						else 
						{
							elm.style.top = et + dist + 'px';
							cont.style.top =  ct - scale * dist + 'px';
						}
					};
					if(cont.hasOwnProperty('removeMouseWheelListener')) cont.removeMouseWheelListener();
					cont.onmousewheel = onWheel;
					cont.addEventListener('DOMMouseScroll', onWheel, false);
					cont.removeMouseWheelListener = function(){this.removeEventListener('DOMMouseScroll', onWheel, false);}
				},
				
				showDownloads: function(total)
				{
					var create = this.create, css = this.css, text = this.text, root = this;
					var mailCont = zmail.main.getInstance();
					var BBCode = zmail.data.getInstance().createBBCode;
					var cont = create('div', css.notification.cont);
					var header = create('div', css.notification.header.cont);
					var headerText = create('p', css.notification.header.text);
					var mail = create('div', css.notification.header.mail);
					var description = create('p', css.notification.from);
					var downloaded = create('p', css.notification.link);
					var count = create('span', {'position': 'absolute', 'right': 0, 'top': 0, 'height': '100%', 'lineHeight': '100%'});
					var closeCont = create('div', css.notification.remove);
					text(headerText, 'Welcome to ZMail');
					text(downloaded, 'Downloaded: ');
					text(count, '0/' + total);
					description.innerHTML = 'Downloading messages, please wait...<br/>This is one time process.'
					closeCont.innerHTML = 'X';
					var removeCont = function()
					{
						if (cont.parentElement && cont.data.isOpen)
						{
							document.body.removeChild(cont);
							cont.data.isOpen = false;
						}
					}
					closeCont.onclick = removeCont;
					mail.style.backgroundImage = 'url(' + this.res.mail + ')';
					description.style.lineHeight = '12px';
					downloaded.style.position = 'relative';
					downloaded.style.margin = '5px 0 0 0';
					downloaded.appendChild(count);
					header.zm_append([mail, headerText]);
					cont.zm_append([header, description, downloaded, closeCont]);
					cont.data = {'count': count, 'isOpen': true};
					cont.style.height = 'auto';
					document.body.appendChild(cont);
					this.downloadsCont = cont;
				},
				
				updateDownloads: function(c, t)
				{
					var cont = this.downloadsCont;
					if (cont && cont.data.isOpen)
					{
						var count = cont.data.count;
						if (c < t)
						{
							count.innerHTML = c + '/' + t;
						}
						else
						{
							document.body.removeChild(cont);
							cont.data.isOpen = false;
							this.downlodsCont = null;
						}
					}
				},
				
				notify: function(msg, type)
				{
					var create = this.create, css = this.css, text = this.text, root = this;
					var mailCont = zmail.main.getInstance();
					var BBCode = zmail.data.getInstance().createBBCode;
					var cont = create('div', css.notification.cont);
					var header = create('div', css.notification.header.cont);
					var headerTextCss = css.notification.header;
					var headerText = (type == 2) ? create('p', headerTextCss.textMultiple) : create('p', headerTextCss.text);
					var mail = create('div', css.notification.header.mail);
					var mailType = create('span', css.notification.header.type);
					var closeCont = create('div', css.notification.remove);
					var labelText = ['New mail received', 'Mail has been sent', 'You have (' + msg + ')<br/> new messages'];
					var label = labelText[type];
					(type == 2) ? headerText.innerHTML = label : text(headerText, label);
					closeCont.innerHTML = 'X';
					var removeCont = function()
					{
						if (cont.parentElement)
						{
							document.body.removeChild(cont);
							root.openNotificationsCount--;
						}
					}
					closeCont.onclick = removeCont;
					mail.style.backgroundImage = 'url(' + this.res.mail + ')';
					mailType.style.backgroundImage = (type == 1) ? 'url(' + this.res.arrowRight + ')' : 'url(' + this.res.arrowLeft + ')';
					mail.appendChild(mailType);
					header.zm_append([mail, headerText]);
					
					if (type == 2)
					{
						var openButton = create('div', css.notification.button);
						var cancelButton = create('div', css.notification.button);
						text(openButton, 'Open mail');
						text(cancelButton, 'Cancel');
						openButton.onclick = function()
						{
							if (!mailCont.isOpen) mailCont.open();
							removeCont();
						};
						cancelButton.onclick = function()
						{
							removeCont();
						};
						openButton.style.left = '10px';
						cancelButton.style.right = '10px';
						cont.zm_append([header, openButton, cancelButton, closeCont]);
					}
					else
					{
						var from = create('p', css.notification.from);
						var subject = create('p', css.notification.subject);
						if (type == 0)
						{
							var subjectLink = create('a', css.notification.link);
							subjectLink.innerHTML = msg.s;
							var openMessage = function()
							{
								var searchBox = root.dom.leftBar.searchBox;
								var msgSb = root.dom.rightBar.scrollBar.bar;
								var generatedHeaders = root.generatedHeaders;
								if (!mailCont.isOpen) mailCont.open();
								if (root.selectedGroup) root.dom.leftBar.items[root.selectedGroup].zm_css(root.css.li.leftBar.sub);
								if (root.selectedFolder) root.dom.leftBar.items[root.selectedFolder].zm_css(root.css.li.leftBar.sub);
								root.dom.leftBar.items.inbox.zm_css(root.css.li.leftBar.subSelected);
								root.selectedFolder = 'inbox';
								root.selectedGroup = false;
								root.resetMsgCont(1);
								root.selectedPage = 0;
								root.populateHeaders();
								searchBox.disabled = false;
								msgSb.data.update();
								for (var i in generatedHeaders)
								{
									var id = generatedHeaders[i].msg.i;
									if (parseInt(id, 10) == parseInt(msg.i, 10))
									{
										generatedHeaders[i].cont.onclick();
										break;
									}
								}
								removeCont();
							};
							subjectLink.onclick = function(){openMessage.call(root)};
							text(subject, 'Subject: ');
							subject.appendChild(subjectLink);
							from.innerHTML = 'From: ' + BBCode.player(msg.f);
						}
						else if(type == 1)
						{
							text(subject, 'Subject: ' + msg.s);
							if (msg.t.length == 1) from.innerHTML = 'To: ' + BBCode.player(msg.t[0]);
							else text(from, 'To: ' + msg.t.length + ' Players');
						}
						cont.zm_append([header, from, subject, closeCont]);
					}
					cont.style.bottom = (this.openNotificationsCount * 103) + 30 + 'px';
					cont.style.zIndex = 1000 - this.openNotificationsCount;
					document.body.appendChild(cont);
					root.openNotificationsCount++;
					setTimeout(removeCont, 30000);
				},
				
				findPlayer: function(txt)
				{
					this.clearPlayersSearch(0);
					var str = txt.replace(/[^a-z A-Z 0-9 \-_]/g, '').toLowerCase();
					if (str == '') return;
					var players = zmail.data.getInstance().players;
					var matches = [], completeMatch = false, count = 0;
					for(var i = 0; i < players.length; i++)
					{
						if ((players[i].pn.toLowerCase().substr(0,str.length) == str) && count < 21)
						{
							matches.push(players[i]);
							count++;
						}
						if (players[i].pn.toLowerCase() == txt.toLowerCase()) completeMatch = true;
					}
					this.completePlayerMatch = completeMatch;
					this.populatePlayersResultsCont(matches);
				},
				
				changePlayerSelection: function(mode)
				{
					var searchBox = this.dom.compose.leftBar.searchBox;
					var mainCont = this.dom.compose.leftBar.results.mainCont;
					var resultsSbc = this.dom.compose.leftBar.results.scrollbarCont;
					var resultsCont = this.dom.compose.leftBar.results.resultsCont;
					var index = searchBox.data.selectedIndex;
					var results = searchBox.data.results;
					var length = results.length;
					var newIndex = (mode) ? (index + 1) % length : (index - 1 < 0) ? length - 1 : index - 1;
					var currentItem = results[index];
					var newItem = results[newIndex];
					currentItem.style.background = 'transparent';
					currentItem.style.color = '#8e8e8e';
					newItem.style.background = '#266589';
					newItem.style.color = '#bcbcbc';
					if (newIndex > 4 && length > 5)
					{
						var ch = resultsCont.offsetHeight, ph = resultsSbc.offsetHeight;
						resultsCont.style.top = -(newIndex - 4) * 49 + 'px';
						resultsSbc.firstChild.style.top = (((ph - 20) / ch) * (newIndex - 4) * 49) + 10 +'px';
					}
					if (newIndex < 4 && length > 5)
					{
						resultsCont.style.top = 0;
						resultsSbc.firstChild.style.top = '10px';
					}
		
					searchBox.data.selectedIndex = newIndex;
				},
						
				addRecipient: function(name)
				{
					if (this.recipients.indexOf(name) == -1)
					{
						var Item = this.create('div', this.css.compose.leftBar.recipients.recipient.cont);
						var remove = this.create('div', this.css.compose.leftBar.recipients.recipient.remove);
						var mainCont = this.dom.compose.leftBar.recipientsMainCont;
						var cont = this.dom.compose.leftBar.recipientsCont;
						var scrollCont = this.dom.compose.leftBar.recipientsSbc;
						var bar = this.dom.compose.leftBar.recipientsSb;
						var updateScroll = function()
						{
							scrollCont.style.visibility = (cont.offsetHeight > 0 && cont.offsetHeight < 180) ? 'hidden' : 'visible';
							mainCont.style.height = Math.max(28, Math.min(180, cont.offsetHeight)) + 'px';
							bar.data.update();
							bar.data.scrollToEnd();
						};
						var root = this;
						this.text(Item, name);
						this.text(remove, 'X');
						remove.data = {'name': name};
						remove.onclick = function()
						{
							root.dom.compose.leftBar.recipientsCont.removeChild(Item);
							var player = this.data.name, index = root.recipients.indexOf(player);
							if(index > -1) root.recipients.splice(index, 1);
							updateScroll();
						};
						Item.appendChild(remove);
						this.dom.compose.leftBar.recipientsCont.insertBefore(Item, this.dom.compose.leftBar.searchBoxCont);
						this.clearPlayersSearch(1);
						this.recipients.push(name);
						updateScroll();
					}
				},
				
				clearPlayersSearch: function(type)
				{
					var searchBox = this.dom.compose.leftBar.searchBox;
					var mainCont = this.dom.compose.leftBar.results.mainCont;
					var resultsSbc = this.dom.compose.leftBar.results.scrollbarCont;
					var resultsCont = this.dom.compose.leftBar.results.resultsCont;
					if (type == 1)
					{
						searchBox.value = '';
						searchBox.focus();
					}
					resultsSbc.zm_empty();
					resultsCont.zm_empty();
					resultsCont.style.top = 0;
					mainCont.style.display = 'none';
					searchBox.data.results = [];
					searchBox.data.selectedIndex = 0;
					searchBox.data.isContOpen = false;
					this.completePlayerMatch = false;
				},
				
				populatePlayersResultsCont: function(arr)
				{
					var root = this;
					var resultsCont = this.dom.compose.leftBar.results.resultsCont;
					var cont = this.dom.compose.leftBar.results.mainCont;
					var recipientsCont = this.dom.compose.leftBar.recipientsMainCont;
					var scrollbarCont = this.dom.compose.leftBar.results.scrollbarCont;
					var searchBox = this.dom.compose.leftBar.searchBox;
					var add = function()
					{
						root.addRecipient.apply(root, arguments);
					};
					var items = [];
					for(var i = 0; i < arr.length; i++)
					{
						var style = (i == 0) ? 'contSelected' : 'cont';
						var Item = this.create('div', this.css.compose.leftBar.recipients.searchBox.item[style]);
						var player = this.create('p', this.css.compose.leftBar.recipients.searchBox.item.text);
						var alliance = this.create('p', this.css.compose.leftBar.recipients.searchBox.item.text);
						this.text(player, arr[i].pn);
						this.text(alliance, arr[i].an);
						Item.zm_append([player, alliance]);
						Item.data = {'name': arr[i].pn};
						Item.onclick = function()
						{
							add(this.data.name);
						};
						resultsCont.appendChild(Item);
						items.push(Item);
					}
					cont.style.display = 'block';
					cont.style.height = Math.min(244, arr.length * 49) + 'px';
					cont.style.top = recipientsCont.offsetTop + recipientsCont.offsetHeight + 3 + 'px';
					if(arr.length > 5)
					{
						var bar = this.create('div', this.css.compose.leftBar.recipients.searchBox.scrollbar.bar);
						scrollbarCont.appendChild(bar);
						this.enableScroll(bar, scrollbarCont, resultsCont);
					}
					searchBox.data.isContOpen = true;
					searchBox.data.results = items;
				},
						
				update: function(arr1, arr2, arr3, arr4)
				{
					if(!this.isLoaded)
					{
						var s = this.storage, j = s.get('junk'), t0 = s.get('trash0'), t1 = s.get('trash1'), d = s.get('draft');
						var doc = s.get('documents'), b = s.get('blocked'), f = s.get('friends'), g = s.get('groups');
						this.folders.junk.ids = j;
						this.folders.trash[0].ids = t0;
						this.folders.trash[1].ids = t1;
						this.folders.documents.ids = doc;
						this.folders.draft = d;
						this.contacts.friends = f;
						this.contacts.blocked = b;
						this.contacts.groups = g;
						this.isLoaded = true;
					}
					if(arr1 && arr2)
					{
						this.filter(arr1, 0);
						this.filter(arr2, 1);
					}
					if (arr4 && (arr4.length > 0)) this.notify(arr4[0], 1);
					if (arr3 && (arr3.length > 0))
					{
						if(arr3.length == 1) this.notify(arr3[0], 0);
						else this.notify(arr3.length, 2);
					}
					
					var f = this.folders, c = this.contacts, root = this;
					var count = function(r)
					{
						var t = f.trash, d = f.draft, g = ['blocked', 'friends', 'groups'].indexOf(r);
						var len = function(a){return (!a) ? 0 : a.length;};
						if (g == -1) length = (r == 'draft') ? root.size(d) : (r == 'trash') ? len(t[0].msgs) + len(t[1].msgs) : len(f[r].msgs);
						else length = (r == 'groups') ? root.size(c[r]) : len(c[r]);
						return (length == 0) ? '' : length;
					};
					this.dom.leftBar.folders.inbox.nodeValue = 'Входящие ' + count('inbox');
					this.dom.leftBar.folders.outbox.nodeValue = 'Исходящие ' + count('outbox');
					this.dom.leftBar.folders.draft.nodeValue = 'Черновики ' + count('draft');
					this.dom.leftBar.folders.junk.nodeValue = 'Спам ' + count('junk');
					this.dom.leftBar.folders.trash.nodeValue = 'Корзина ' + count('trash');
					this.dom.leftBar.folders.documents.nodeValue = 'Документы ' + count('documents');
					this.dom.leftBar.contacts.friends.nodeValue = 'Друзья ' + count('friends');
					this.dom.leftBar.contacts.blocked.nodeValue = 'Блокированые ' + count('blocked');
					this.dom.leftBar.contacts.groups.nodeValue = 'Группы ' + count('groups');
					if (this.selectedFolder) this.populateHeaders();
					if (this.selectedGroup) this.populateContacts();
				},
				
				resetMsgCont: function(type)
				{
					var expandCont = this.dom.rightBar.expandCont;
					var msgCont = this.dom.rightBar.msgCont;
					var selectedMsgs = this.getSelectedMsgsIds();
					if (expandCont.data.isExpanded) expandCont.onclick();
					msgCont.zm_empty();
					msgCont.style.top = 0;
					if ((type == 1) && !this.selectedGroup)
					{
						var count = (selectedMsgs == null) ? 0 : selectedMsgs.length;
						var header = this.create('p', this.css.message.subject);
						header.innerHTML = (count > 0) ? count + ' messages selected.' : 'Сообщения не выбраны.';
						msgCont.appendChild(header);
					};
				},
				
				filter: function(arr, type)
				{
					var i = {'ids': [], 'msgs': []}, t = {'ids': [], 'msgs': []}, j = {'ids': [], 'msgs': []}, d = {'ids': [], 'msgs': []};
					var trash = this.folders.trash[type].ids, junk = this.folders.junk.ids, draft = this.folders.draft;
					var documents = this.folders.documents.ids, blocked = this.contacts.blocked;
					for (var n = 0; n < arr.length; n++)
					{
						var id = arr[n].i, msg = arr[n], fid = arr[n].fi;
						if ((trash)&&(trash.indexOf(id) > -1)) { t.ids.push(id); t.msgs.push(msg); }
						else if ((type == 0)&&(junk)&&(junk.indexOf(id) > -1)) { j.ids.push(id); j.msgs.push(msg); }
						else if ((type == 0)&&(documents)&&(documents.indexOf(id) > -1)) { d.ids.push(id); d.msgs.push(msg); }
						else if ((type == 0)&&(blocked)&&(blocked.indexOf(fid) > -1)) { j.ids.push(id); j.msgs.push(msg); } 
						else { i.ids.push(id); i.msgs.push(msg); }
					}
					if (type == 0)
					{
						this.folders.inbox = i;
						this.folders.trash[0] = t;
						this.folders.junk = j;
						this.folders.documents = d;
					}
					if (type == 1)
					{
						this.folders.outbox = i;
						this.folders.trash[1] = t;
					}
				},
				
				updateContacts: function(alliance, commanders, officers)
				{
					var allianceTxt = this.dom.leftBar.contacts.alliance;
					var commandersTxt = this.dom.leftBar.contacts.commanders;
					var officersTxt = this.dom.leftBar.contacts.officers;
					var sg = this.selectedGroup;
					allianceTxt.nodeValue = (alliance && (alliance.length > 0)) ? 'Альянс ' + alliance.length : 'Альянс';
					commandersTxt.nodeValue = (commanders && (commanders.length > 0)) ? 'Командиры ' + commanders.length : 'Командиры';
					officersTxt.nodeValue = (officers && (officers.length > 0)) ? 'Офицеры ' + officers.length : 'Офицеры';
					if (sg && (['commanders', 'officers', 'alliance'].indexOf(sg) > -1)) this.populateContacts();
				},
				
				updateAllies: function(allies)
				{
					console.log(allies);
					var alliesTxt = this.dom.leftBar.contacts.allies, sg = this.selectedGroup;
					alliesTxt.nodeValue = (allies && this.size(allies) > 0) ? 'Allies ' + this.size(allies) : 'Allies';
					if (sg && sg == 'allies') this.populateContacts();
				},
				
				resetComposeContainer: function()
				{
					var recipientsCont = this.dom.compose.leftBar.recipientsCont;
					var msgCont = this.dom.compose.rightBar.msgCont;
					this.dom.compose.rightBar.subject.value = "Add Subject:";
					this.iframeContent = "";
					this.recipients = [];
					while (recipientsCont.children.length > 1) recipientsCont.removeChild(recipientsCont.firstChild);
					while (msgCont.children.length > 1) msgCont.removeChild(msgCont.lastChild);
				},
				
				addSections: function()
				{
					var iframe = this.dom.compose.rightBar.iframe;
					if(this.generatedSections != null && this.generatedSections.length > 0)
					{
						var msgCont = this.dom.compose.rightBar.msgCont;
						for (var i = 0; i < this.generatedSections.length; i++) msgCont.appendChild(this.generatedSections[i][0]);
						iframe.style.borderBottom = '2px solid #3f3e3e';
					}
					else iframe.style.borderBottom = 'none';
				},
				
				openNewMail: function(type)
				{
					this.resetComposeContainer();
					this.generatedSections = [];
					if (type == 1)
					{
						var contacts = this.selectedContacts;
						var playerSearchBox = this.dom.rightBar.contacts.search;
						for (var i = 0; i < contacts.length; i++) this.addRecipient(this.getPlayerNameById(contacts[i]));
						this.selectedContacts = [];
						this.addSelectedContacts();
						this.populateContacts();
						playerSearchBox.onblur();
					}
					zmail.compose.getInstance().open();
				},
				
				replyToAll: function()
				{
					var msgCont = this.dom.compose.rightBar.msgCont;
					var msg = this.selectedHeader.data.msg;
					this.resetComposeContainer();
					this.addSections();
					this.addRecipient(msg.f);
					for (var i = 0; i < msg.t.length; i++) this.addRecipient(msg.t[i]);
					this.dom.compose.rightBar.subject.value = 'Re: ' + msg.s;
					zmail.compose.getInstance().open();
				},
				
				reply: function()
				{
					var msgCont = this.dom.compose.rightBar.msgCont;
					var msg = this.selectedHeader.data.msg;
					this.resetComposeContainer();
					this.addSections();
					this.dom.compose.rightBar.subject.value = 'Re: ' + msg.s;
					this.addRecipient(msg.f);
					zmail.compose.getInstance().open();
				},
				
				forwardMsg: function()
				{
					var msgCont = this.dom.compose.rightBar.msgCont;
					var msg = this.selectedHeader.data.msg;
					this.resetComposeContainer();
					this.addSections();
					this.dom.compose.rightBar.subject.value = 'Fwd: ' + msg.s;
					zmail.compose.getInstance().open();
				},
				
				sendMail: function()
				{
					var to = this.recipients.join('; ');
					var subject = this.dom.compose.rightBar.subject.value;
					var date = new Date();
					var from = zmail.data.getInstance().ownerName;
					var clone = this.dom.compose.rightBar.iframe.contentWindow.document.body.cloneNode(true);
					var message = this.encodeMsg(clone);
					date = date.getTime();
					if ((subject == '') || (subject == 'Add Subject:')) subject = 'No subject';
					if (message.trim() == 'Add Text') message = '';
					message = '<cnc><cncs>' + from + '</cncs><cncd>' + date + '</cncd><cnct>' + message + '</cnct></cnc>';
					for (var i = 0; i < this.generatedSections.length; i++)
					{
						if(this.generatedSections[i][2] == 1) message += this.generatedSections[i][1];
					}
					zmail.data.getInstance().callMethod('sendMail', [to, "", subject, message]);
					if (this.selectedDraft)
					{
						var id = parseInt(this.selectedDraft, 10), header = this.selectedHeader;
						if (header.data.msg.i == id) this.deleteDraft();
						else
						{
							if (this.folders.draft.hasOwnProperty(id)) delete this.folders.draft[id];
							this.update();
							this.storage.save.call(this);
						}
					}
				},
				
				saveDraft: function()
				{
					var subject = this.dom.compose.rightBar.subject.value;
					var date = new Date();
					var from = zmail.data.getInstance().ownerName;
					var fromId = zmail.data.getInstance().ownerId;
					var clone = this.dom.compose.rightBar.iframe.contentWindow.document.body.cloneNode(true);
					var message = this.encodeMsg(clone);
					if ((subject == '') || (subject == 'Add Subject:')) subject = 'No subject';
					date = date.getTime();
					
					message = '<cnc><cncs>' + from + '</cncs><cncd>' + date + '</cncd><cnct>' + message + '</cnct></cnc>';
					for (var i = 0; i < this.generatedSections.length; i++)
					{
						if(this.generatedSections[i][2] == 1) message += this.generatedSections[i][1];
					}
					var id = (this.selectedDraft) ? parseInt(this.selectedDraft) : date;
					var msg = {'b':message,'r':true,'f':from,'fi':fromId,'t':this.recipients,'s':subject,'d':date,'i':id,'rm':clone.innerHTML};
					if (this.folders.draft == null) this.folders.draft = {};
					this.folders.draft[id] = msg;
					this.selectedDraft = null;
					this.update();
					this.storage.save.call(this);
				},
				
				editDraft: function()
				{
					if(this.selectedFolder == 'draft')
					{
						this.resetComposeContainer();
						var id = this.selectedHeader.data.msg.i;
						var draft = this.folders.draft[id];
						this.recipients = draft.t;
						this.dom.compose.rightBar.subject.value = draft.s;
						this.iframeContent = draft.rm;
						if(this.generatedSections && this.generatedSections.length > 1)
						{
							this.generatedSections.splice(0,1);
							this.addSections();
						}
						this.selectedDraft = id;
						for (var i = 0; i < draft.t.length; i++) this.addRecipient(draft.t[i]);
						zmail.compose.getInstance().open();
					}
				},
				
				deleteDraft: function()
				{
					if (this.selectedFolder == 'draft')
					{
						var ids = this.getSelectedMsgsIds();
						for (var i = 0; i < ids.length; i++)
						{
							if (this.folders.draft.hasOwnProperty(ids[i])) delete this.folders.draft[ids[i]];
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
				},
				
				encodeMsg: function(cont)
				{
					try
					{
						var getMargin = function(a)
						{
							var m = 0, elm = a;
							while (elm.parentElement)
							{
								if (elm.nodeType == 1) m += parseInt(elm.style.marginLeft) || 0;
								elm = elm.parentElement;
							}
							return m;
						};
						
						var getLinkType = function(a)
						{
							var type;
							if (a.match('webfrontend.gui.util.BBCode.openPlayerProfile')) type = 'player';
							if (a.match('webfrontend.gui.util.BBCode.openAllianceProfile')) type = 'alliance';
							if (a.match('webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow')) type = 'coords';
							return type;
						};
						
						var getAttr = function(a)
						{
							var b = '';
							switch(a.nodeName.toLowerCase())
							{
								case 'p': case 'div': 
									if (a.style.textAlign !== '') b = a.style.textAlign.charAt(0);
									else if (a.align !== '') b = a.align.charAt(0);						
								break;
								case 'a': 
									if (a.attributes.hasOwnProperty('href')) b = 'url';
									if (a['onclick']) b = getLinkType(a.onclick.toString());
								break;
								default: b = '';
							}
							return b;
						};
						
						var parseHTML = function(a)
						{
							var result = '', o = [];
							for(var i = 0; i < a.childNodes.length; i++)
							{
								var elm = a.childNodes[i], nodeName = elm.nodeName.toLowerCase(), nodeType = elm.nodeType;
								var attr = (nodeType == 1 && getAttr(elm) !== '') ?  getAttr(elm) + ']' : ']';
								var className = elm.className, nodeValue = elm.nodeValue;
								var nodeText = (elm.innerText) ? elm.innerText : elm.textContent;
								var isLineBreak = (elm.innerHTML == '<br>') ? true : false;
								if (nodeType == 1 && elm.children.length == 0)
								{
									if ((nodeName == 'div') && (attr == ']') && (className != 'quote')) result += nodeText + '\n';
									else if ((nodeName == 'div') && (attr != ']')) result += '[d' + attr + nodeText + '[/d' + attr;
									else if ((nodeName == 'div') && (className == 'quote')) result += '[quote]' + nodeTExt + '[/quote]';
									else if ((nodeName == 'p') && (attr == ']')) result += nodeText;
									else if ((nodeName == 'p') && (attr != ']')) result += '[d' + attr + nodeText + '[/d' + attr;
									else if (nodeName == 'blockquote') result += '[bq' + attr + nodeText + '[/bq' + attr;
									else if (nodeName == 'br') result += '\n';
									else if (nodeName == 'a') result += '[' + attr + nodeText + '[/' + attr;
									else if (nodeName == 'font') result += nodeText;
									else if (nodeName == 'strike') result += '[s]' + nodeText + '[/s]';
									else result += '[' + nodeName + attr + nodeText + '[/' + nodeName + ']';
								}
								else if (nodeType == 1 && elm.children.length > 0)
								{
									o.push(elm);
									
									if ((nodeName == 'div') && (attr == ']') && (className != 'quote') && !isLineBreak) result += '';
									else if ((nodeName == 'div') && (attr != ']') && !isLineBreak) result += '[d' + attr;
									else if ((nodeName == 'div') && isLineBreak) result += '';
									else if ((nodeName == 'div') && (className == 'quote')) result += '[quote]';
									else if ((nodeName == 'p') && (attr == ']')) result += '';
									else if ((nodeName == 'p') && (attr != ']')) result += '[d' + attr;
									else if (nodeName == 'blockquote') result += '[bq' + attr;
									else if (nodeName == 'a') result += '[' + attr;
									else if (nodeName == 'font') result += '';
									else if (nodeName == 'span') result += '';
									else if (nodeName == 'strike') result += '[s]';
									else result += '[' + nodeName  + ']';
									
									result += parseHTML(o[o.length - 1]);
									
									if ((nodeName == 'div') && (attr == ']') && (className != 'quote') && !isLineBreak) result += '\n';
									else if ((nodeName == 'div') && (attr != ']') && !isLineBreak) result += '[/d' + attr;
									else if ((nodeName == 'div') && isLineBreak) result += '';
									else if ((nodeName == 'div') && (className == 'quote')) result += '[/quote]';
									else if ((nodeName == 'p') && (attr == ']')) result += '';
									else if ((nodeName == 'p') && (attr != ']')) result += '[/d' + attr;
									else if (nodeName == 'blockquote') result += '[/bq' + attr;
									else if (nodeName == 'a') result += '[/' + attr;
									else if (nodeName == 'font') result += '';
									else if (nodeName == 'span') result += '';
									else if (nodeName == 'strike') result += '[/s]';
									else result += '[/' + nodeName  + ']';
								}
								else if (nodeType == 3 && nodeValue && nodeValue.trim() !== '') result += nodeValue;
							}
							result.replace('\u200B', '');
							return result;
						};
						var encoded = parseHTML(cont);
						return encoded;
					}
					catch(e)
					{
						console.log('zmail: ' + e.toString());
						return 'ERROR';
					}
				},
				
				getCharactersCount: function(msg)
				{
					var count = 0;
					if (this.generatedSections && this.generatedSections.length)
					{
						for (var i = 0; i < this.generatedSections.length; i++)
						{
							var cnct = this.generatedSections[i][1].replace(/.*?<cnct>([^<\/cnct>]*)<\/cnct>.*/, '$1');
							if (cnct && this.generatedSections[i][2] == 1) count += cnct.length;
						}
					}
					if (msg) count += msg.length;
					return count;
				},
				
				markRead: function(flag)
				{
					var ids = this.getSelectedMsgsIds(), style = (flag) ? 'cont' : 'contUnRead';
					var headers = (this.selectedMsgs.headers.length == 0) ? [this.selectedHeader] : this.selectedMsgs.headers;
					for(var i = 0; i < headers.length; i++)
					{
						var isRead = headers[i].data.isRead;
						var id = headers[i].data.msg.i;
						var index = this.getMsgIndex(id, this.folders.inbox.msgs);
						headers[i].data.isRead = flag;
						headers[i].zm_css(this.css.header[style]);
						if (index > -1) this.folders.inbox.msgs[index].r = flag;
						else console.log('zmail: ' + 'Inbox doesn\'t contain id(' + id + ')');
					}
					this.selectAll(false);
					zmail.data.getInstance().markRead(ids, flag);
				},
						
				selectAll: function(n)
				{
					var selectAllCheckBox = this.dom.middleBar.footer.selectAll;
					var ids = [], headers = [], boxes = [];
					for(var key in this.generatedHeaders)
					{
						var checkBox = this.generatedHeaders[key].checkBox;
						var header = this.generatedHeaders[key].cont;
						header.style.background = (n) ? '#363636' : (header.data.isRead) ? 'transparent' : '#292929';
						header.data.isSelected = n;
						checkBox.data.isChecked = n;
						checkBox.style.background = (n) ? '#9f9f9f' : 'transparent';
						ids.push(parseInt(key));
						headers.push(header);
						boxes.push(checkBox);
					}
					this.selectedMsgs.ids = (n) ? ids : [];
					this.selectedMsgs.headers = (n) ? headers : [];
					this.selectedMsgs.checkBoxes = (n) ? boxes : [];
					selectAllCheckBox.data.isChecked = n;
					selectAllCheckBox.style.background = (n) ? '#9f9f9f' : 'transparent';
					this.selectedHeader = null;
					this.resetMsgCont(1);
					this.setToolbar();
				},
				
				getSelectedMsgsIds: function()
				{
					var smIds = this.selectedMsgs.ids, sh = this.selectedHeader;
					var ids = (smIds != null && smIds.length > 0) ? smIds : (sh != null) ? [sh.data.msg.i] : null;
					return ids;
				},
				
				getMsgIndex: function(id, msgs)
				{
					var index = -1;
					for(var i = 0; i < msgs.length; i++)
					{
						if (msgs[i].i == id)
						{
							index = i;
							break;
						}
					}
					return index;
				},
				
				removeMsgFromFolder: function(id, folder)
				{
					var idIndex = this.folders[folder].ids.indexOf(id);
					if (idIndex > -1)
					{
						if (this.folders[folder].msgs[idIndex].i == id)
						{
							var msg = this.folders[folder].msgs[idIndex];
							this.folders[folder].ids.splice(idIndex, 1);
							this.folders[folder].msgs.splice(idIndex, 1);
							return msg;
						}
						else
						{
							var msgIndex = this.getMsgIndex(id, this.folders[folder].msgs);
							var msgId = this.folders[folder].msgs[msgIndex].i;
							if ((msgIndex > -1) && (msgId == id))
							{
								var msg = this.folders[folder].msgs[msgIndex];
								this.folders[folder].ids.splice(idIndex, 1);
								this.folders[folder].msgs.splice(msgIndex, 1);
								return msg;
							}
							else
							{
								if (msgIndex == -1) console.log('zmail: ' + 'Message with id: ' + id + ' could not be found in ' + folder + '!');
								else if (msgId !== id) console.log('zmail: ' + 'id mismatch (' + id + ' - ' + msgId + ')');
								else console.log('zmail: ' + 'something went terribly wrong');
								return false;
							}
						}
					}
					else console.log('zmail: ' + 'id: ' + id + 'does not exist in folder '  + folder);
				},
				
				
				toJunk: function()
				{
					var arr = this.getSelectedMsgsIds();
					if (arr !== null)
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i], msg = this.removeMsgFromFolder(id, 'inbox');
							if (msg && this.folders.junk.ids.indexOf(id) == -1)
							{
								this.folders.junk.ids.push(id);
								this.folders.junk.msgs.push(msg);
							}
							if (this.folders.junk.ids.indexOf(id) > -1) console.log('zmail: ' + 'Message with id: ' + id + 'already exists in Junk!');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
					else console.log('zmail: ' + 'Сообщения не выделены!');
				},
				
				toDocuments: function()
				{
					var arr = this.getSelectedMsgsIds();
					if (arr !== null)
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i], msg = this.removeMsgFromFolder(id, 'inbox'), index = this.folders.documents.ids.indexOf(id);
							if (msg && (index == -1))
							{
								this.folders.documents.ids.push(id);
								this.folders.documents.msgs.push(msg);
							}
							if (index > -1) console.log('zmail: ' + 'Message (' + id + ') already exists in Documents!');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
					else console.log('zmail: ' + 'Сообщения не выделены!');
				},
				
				toTrash: function()
				{
					var arr = this.getSelectedMsgsIds();
					var folder = this.selectedFolder;
					var type = (folder == 'outbox') ? 1 : 0;
					if (arr !== null)
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i], msg = this.removeMsgFromFolder(id, folder), index = this.folders.trash[type].ids.indexOf(id);
							if (msg && (index == -1))
							{
								this.folders.trash[type].ids.push(id);
								this.folders.trash[type].msgs.push(msg);
							}
							if (index > -1) console.log('zmail: ' + 'Message (' + id + ') already exists in trash[' + type + ']!');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
					else console.log('zmail: ' + 'No messages selected!');
				},
				
				emptyFolder: function()
				{
					var data = zmail.data.getInstance();
					if(this.selectedFolder == 'junk')
					{
						if (this.folders.junk.ids != null && this.folders.junk.ids.length > 0)
						{
							data.deleteMsgs(this.folders.junk.ids, 1);
							this.folders.junk.ids = [];
							this.folders.junk.msgs = [];
						}
					}
					if(this.selectedFolder == 'trash')
					{
						if (this.folders.trash[0].ids != null && this.folders.trash[0].ids.length > 0)
						{
							data.deleteMsgs(this.folders.trash[0].ids, 1);
							this.folders.trash[0].ids = [];
							this.folders.trash[0].msgs = [];
						}
						if (this.folders.trash[1].ids != null && this.folders.trash[1].ids.length > 0)
						{
							data.deleteMsgs(this.folders.trash[1].ids, 0);
							this.folders.trash[1].ids = [];
							this.folders.trash[1].msgs = [];
						}
					}
					this.update();
					this.storage.save.call(this);
				},
				
				notJunk: function()
				{
					var arr = this.getSelectedMsgsIds();
					if(this.selectedFolder == 'junk' && arr !== null)
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i], msg = this.removeMsgFromFolder(id, 'junk'), index = this.folders.inbox.ids.indexOf(id);
							if (msg && (index == -1))
							{
								this.folders.inbox.ids.push(id);
								this.folders.inbox.msgs.push(msg);
							}
							if (index > -1) console.log('zmail: ' + 'Message (' + id + ')already exists in inbox!');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
					else console.log('zmail: ' + 'No messages selected!');
				},
				
				notTrash: function()
				{
					var arr = this.getSelectedMsgsIds();
					if ((this.selectedFolder == 'trash') && (arr !== null))
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i];
							if (this.folders.trash[0].ids.indexOf(id) > -1)
							{
								var idIndex = this.folders.trash[0].ids.indexOf(id);
								var msgIndex = this.getMsgIndex(id, this.folders.trash[0].msgs);
								if (msgIndex > -1)
								{
									var msg = this.folders.trash[0].msgs[msgIndex];
									this.folders.trash[0].ids.splice(idIndex, 1);
									this.folders.trash[0].msgs.splice(msgIndex, 1);
									if (this.folders.inbox.ids.indexOf(id) == -1)
									{
										this.folders.inbox.ids.push(id);
										this.folders.inbox.msgs.push(msg);
									}
									else console.log('zmail: ' + 'id(' + id + ') already exists in Inbox!');
								}
								else console.log('zmail: ' + 'trash[inbox] doesn\'t contain message with id(' + id + ')');
							}
							else if (this.folders.trash[1].ids.indexOf(id) > -1)
							{
								var idIndex = this.folders.trash[1].ids.indexOf(id);
								var msgIndex = this.getMsgIndex(id, this.folders.trash[1].msgs);
								if (msgIndex > -1)
								{
									var msg = this.folders.trash[1].msgs[msgIndex];
									this.folders.trash[1].ids.splice(idIndex, 1);
									this.folders.trash[1].msgs.splice(msgIndex, 1);
									if (this.folders.outbox.ids.indexOf(id) == -1)
									{
										this.folders.outbox.ids.push(id);
										this.folders.outbox.msgs.push(msg);
									}
									else console.log('zmail: ' + 'id(' + id + ') already exists in Inbox!');
								}
								else console.log('zmail: ' + 'trash[inbox] doesn\'t contain message with id(' + id + ')');
							}
							else console.log('zmail: ' + 'trash folder doesn\'t contain id(' + id + ')');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
				},
				
				notDocument: function()
				{
					var arr = this.getSelectedMsgsIds();
					if(this.selectedFolder == 'documents' && arr !== null)
					{
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i], msg = this.removeMsgFromFolder(id, 'documents'), index = this.folders.inbox.ids.indexOf(id);
							if (msg && (index == -1))
							{
								this.folders.inbox.ids.push(id);
								this.folders.inbox.msgs.push(msg);
							}
							if (index > -1) console.log('zmail: ' + 'Message (' + id + ')already exists in inbox!');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
					}
					else console.log('zmail: ' + 'No messages selected!');
				},
				
				deleteMsg: function()
				{
					var arr = this.getSelectedMsgsIds();
					if (this.selectedFolder == 'trash' && arr !== null)
					{
						var data = zmail.data.getInstance();
						var inbox = [], outbox = [];
						for (var i = 0; i < arr.length; i++)
						{
							var id = arr[i];
							if (this.folders.trash[0].ids.indexOf(id) > -1)
							{
								var idIndex = this.folders.trash[0].ids.indexOf(id);
								var msgIndex = this.getMsgIndex(id, this.folders.trash[0].msgs);
								if(msgIndex > -1)
								{
									inbox.push(id);
									this.folders.trash[0].ids.splice(idIndex, 1);
									this.folders.trash[0].msgs.splice(msgIndex, 1);
								}
								else console.log('zmail: ' + 'trash[inbox] doesn\'t contain a message with id(' + id + ')');
							}
							else if (this.folders.trash[1].ids.indexOf(id) > -1)
							{
								var idIndex = this.folders.trash[1].ids.indexOf(id);
								var msgIndex = this.getMsgIndex(id, this.folders.trash[1].msgs);
								if(msgIndex > -1)
								{
									outbox.push(id);
									this.folders.trash[1].ids.splice(idIndex, 1);
									this.folders.trash[1].msgs.splice(msgIndex, 1);
								}
								else console.log('zmail: ' + 'trash[outbox] doesn\'t contain a message with id(' + id + ')');
							}
							else console.log('zmail: ' + 'trash folder doesn\'t contain id(' + id + ')');
						}
						this.selectAll(false);
						this.update();
						this.storage.save.call(this);
						if (inbox.length > 0) data.deleteMsgs(inbox, 1);
						if (outbox.length > 0) data.deleteMsgs(outbox, 0);
					}
				},
				
				searchFolder: function(str)
				{
					var msgs = this.folders[this.selectedFolder].msgs;
					var m1 = [], m2 = [], sd = [], sb = [], root = this;
					var cont = this.dom.searchResults.cont;
					var fromUl = this.dom.searchResults.sender.list;
					var subjectUl = this.dom.searchResults.subject.list;
					var fromCount = this.dom.searchResults.sender.count;
					var subjectCount = this.dom.searchResults.subject.count;
					fromUl.zm_empty();
					subjectUl.zm_empty();
					cont.style.display = (str == '') ? 'none' : 'block';
					for (var i = 0; i < msgs.length; i++)
					{
						var sender = msgs[i].f, subject = msgs[i].s.toLowerCase(), id = msgs[i].i, str = str.toLowerCase();
						if ((sender.toLowerCase().match(str) !== null) && (sd.indexOf(sender) == -1))
						{
							m1.push([sender, id]);
							sd.push(sender);
						}
						if ((subject.match(str) !== null) && (sb.indexOf(subject) == -1))
						{
							m2.push([subject, id]);
							sb.push(subject);
						}
					}
					(fromCount.innerText) ? fromCount.innerText =  m1.length : fromCount.textContent = m1.length;
					(subjectCount.innerText) ? subjectCount.innerText =  m2.length : subjectCount.textContent = m2.length;
					var printMsg = function()
					{
						root.printMsg.apply(root, arguments);
					};
					for (var a = 0; a < Math.min(5, m1.length); a++)
					{
						var li1 = this.create('li', this.css.searchResults.li.sub);
						var t1 = m1[a][0];
						this.text(li1, (t1.length > 15) ? t1.substr(0, 15) + '...' : t1);
						fromUl.appendChild(li1);
						li1.data = {'sender': m1[a][0], 'folder': this.selectedFolder}; 
						li1.onclick = function()
						{
							var f = this.data.folder, um = [], ui = [];
							var msgs = root.folders[f].msgs;
							if (!msgs) return;
							for (var m = 0; m < msgs.length; m++) if (msgs[m].f == this.data.sender) { um.push(msgs[m]); ui.push(msgs[m].i) };
							root.selectedFolder = 'results';
							root.folders.results = {'ids': ui, 'msgs': um};
							root.populateHeaders();
							root.selectedFolder = this.data.folder;
							cont.style.display = 'none';
						}
					}
					for (var b = 0; b < Math.min(5, m2.length); b++)
					{
						var li2 = this.create('li', this.css.searchResults.li.sub);
						var t2 = m2[b][0];
						this.text(li2, (t2.length > 15) ? t2.substr(0, 15) + '...' : t2);
						subjectUl.appendChild(li2);
						li2.data = {'id': m2[b][1], 'folder': this.selectedFolder}; 
						li2.onclick = function()
						{
							var id = this.data.id, f = this.data.folder;
							var index = root.getMsgIndex(id, root.folders[f].msgs);
							var msg = root.folders[f].msgs[index];
							root.selectedFolder = 'results';
							root.folders.results = {'ids': [id], 'msgs': [msg]};
							root.populateHeaders();
							root.selectedFolder = this.data.folder;
							for (var h in root.generatedHeaders)
							{
								root.generatedHeaders[h].cont.click();
								break;
							}
							cont.style.display = 'none';
						}
					};
				},
				
				storage: 
				{
					'save': function()
					{
						var json = JSON.parse(localStorage.ccta_zmail), folders = {}, contacts = {};
						folders.draft = this.folders.draft;
						folders.junk = this.folders.junk.ids;
						folders.trash = [this.folders.trash[0].ids, this.folders.trash[1].ids];
						folders.documents = this.folders.documents.ids;
						contacts.friends = this.contacts.friends;
						contacts.blocked = this.contacts.blocked;
						contacts.groups = this.contacts.groups;
						localStorage.ccta_zmail = JSON.stringify({'folders': folders, 'contacts': contacts, 'archive': json.archive});
					},
					
					'get': function(folder)
					{
						var json = JSON.parse(localStorage.ccta_zmail), folders = json.folders, contacts = json.contacts;
						var x = null;
						var size = function(obj)
						{
							if (typeof obj !== 'object') return null;
							var s = 0;
							for (var key in obj) s++;
							return s;
						};
						
						switch(folder)
						{
							case 'draft': if (folders.draft !== null) x = folders.draft; break;
							case 'trash0': if (folders.trash !== null) x = folders.trash[0]; break;
							case 'trash1': if (folders.trash !== null) x = folders.trash[1]; break;
							case 'junk': if (folders.junk !== null) x = folders.junk; break;
							case 'draft': if (folders.draft !== null) x = folders.draft; break;
							case 'documents': if (folders.documents !== null) x = folders.documents; break;
							case 'friends': if (contacts.friends !== null) x = contacts.friends; break;
							case 'blocked': if (contacts.blocked !== null) x = contacts.blocked; break;
							case 'groups': if (contacts.groups !== null) x = contacts.groups; break;
						}
						x = (x) ? x : ((folder == 'draft')||(folder == 'groups')) ? {} : [];
						console.log('zmail: ' + x, folder);
						return x;
					}
				},
				
				setToolbar: function()
				{
					var folder = this.selectedFolder, selection = this.selectedMsgs, header = this.selectedHeader;
					var type = (selection.ids == null || selection.ids.length == 0) ? (header == null) ? 'default' : 'single' : 'group';
					var toolbarCont = this.dom.topBar.menu;
					var newMsg = this.dom.topBar.toolbar.newMsg;
					var trash = this.dom.topBar.toolbar.trash;
					var delMsg = this.dom.topBar.toolbar.delMsg;
					var junk = this.dom.topBar.toolbar.junk;
					var notJunk = this.dom.topBar.toolbar.notJunk;
					var restore = this.dom.topBar.toolbar.restore;
					var mark = this.dom.topBar.toolbar.mark;
					var reply = this.dom.topBar.toolbar.reply;
					var empty = this.dom.topBar.toolbar.empty;
					var editDraft = this.dom.topBar.toolbar.editDraft;
					var deleteDraft = this.dom.topBar.toolbar.deleteDraft;
					var toDocuments = this.dom.topBar.toolbar.toDocuments;
					var notDocument = this.dom.topBar.toolbar.notDocument;
					var forwardMsg = this.dom.topBar.toolbar.forwardMsg;
					var bars = {
						'inbox':
						{
							'single': [reply, trash, junk, toDocuments, mark],
							'group': [trash, junk, toDocuments, mark],
							'default': []
						},
						'outbox':
						{
							'single': [trash, forwardMsg],
							'group': [trash],
							'default': []
						},
						'junk':
						{
							'single': [notJunk, trash, empty],
							'group': [notJunk, trash],
							'default': [empty]
						},
						'trash':
						{
							'single': [restore, delMsg, empty],
							'group': [restore, delMsg],
							'default': [empty]
						},
						'draft':
						{
							'single': [editDraft, deleteDraft],
							'group': [deleteDraft],
							'default': []
						},
						'documents':
						{
							'single': [notDocument, forwardMsg, trash],
							'group': [notDocument, forwardMsg, trash],
							'default': []
						}
					};
					toolbarCont.zm_empty();
					toolbarCont.appendChild(newMsg);
					if (bars.hasOwnProperty(folder)) toolbarCont.zm_append(bars[folder][type]);
				},
					
				decodeMsg: function(m)
				{
					var match, f = m, create = this.create, cssStyles = this.css, text = this.text;
					var re = /(?:\[(url|player|alliance|coords)\])((?:.(?!\1))+.)(?:\[\/\1\])/g;
					var tags = ['ul','ol','tr','td','th','table','li','dr','dc','dl','tbody','bq','span','b','i','u','s','font','quote'];
					var data = zmail.data.getInstance();
					var BBCode = data.createBBCode;
					var quoteCont = '<br/><div style="padding:10px; border:1px solid #5a5a5a; background:#303030; box-sizing:border-box; -moz-box-sizing:border-box; word-wrap:break-word;">';
					var createLink = function(val)
					{
						var a = create('a', cssStyles.link._14);
						text(a, val);
						a.href = val;
						a.target = 'blank';
						return a.outerHTML;
					};
					var convertTag = function(tag)
					{
						var openTag, closeTag, op = new RegExp('\\[' + tag + '\\]', 'g'), cp = new RegExp('\\[\\/' + tag + '\\]', 'g');
						switch(tag)
						{
							case 'dr': openTag = '<div style="text-align: right">'; closeTag = '</div>'; break;
							case 'dc': openTag = '<div style="text-align: center">'; closeTag = '</div>'; break;
							case 'dl': openTag = '<div style="text-align: left">'; closeTag = '</div>'; break;
							case 'bq': openTag = '<div style="margin-left: 40px">'; closeTag = '</div>'; break;
							case 'table': openTag = '<table rules="all" border="1" style="border-color: #999; margin: 10px 0;">'; closeTag = '</table>'; break;
							case 'td': openTag = '<td style="padding: 4px 15px">'; closeTag = '</td>'; break;
							case 'th': openTag = '<th style="background-color: #999; color: #333; padding: 3px 15px;">'; closeTag = '</th>'; break;
							case 'quote': openTag = quoteCont; closeTag = '</div>'; break;
							case 'font': openTag = ''; closeTag = ''; break;
							default: openTag = '<' + tag + '>'; closeTag = '</' + tag + '>';
						}
						if (op.test(f)) f = f.replace(op, openTag);
						if (cp.test(f)) f = f.replace(cp, closeTag);
					};
					while((match = re.exec(m)) !== null)
					{
						var code = match[1], val = match[2];
						if(code == 'coords') val = val.split(':');
						switch(code)
						{
							case 'url': f = f.replace(match[0], createLink(val)); break;
							case 'alliance': f = f.replace(match[0], BBCode.alliance(val)); break;
							case 'player': f = f.replace(match[0], BBCode.player(val)); break;
							case 'coords': f = f.replace(match[0], BBCode.coords(val.join(':'), val[0], val[1])); break;
						}
					}
					tags.map(convertTag);
					return f;
				},
				
				formatDate: function(d,t)
				{
					var date = new Date(parseInt(d));
					var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear().toString().slice(2);
					var hours = date.getHours(), minutes = date.getMinutes(), fullYear = date.getFullYear();
					var newDate = new Date(), today = newDate.getDate(), thisMonth = newDate.getMonth() + 1, thisYear = newDate.getFullYear();
					
					var conv = function(n){ return (n > 9) ? n : '0' + n};
					
					if(day == today && month == thisMonth && fullYear == thisYear && t == 'header')
					{
						return conv(hours) + ':' + conv(minutes);
					}
					else
					{
						var f = conv(day) + '/' + conv(month) + '/' + year;
						if (t == 'header') return f;
						if (t == 'msg') return (f + '  ' + conv(hours) + ':' + conv(minutes));
					}
				},
				
				printMsg: function(msg)
				{
					var b = msg.b, cssStyles = this.css, text = this.text, create = this.create, root = this;
					var msgSbc = this.dom.rightBar.scrollBar.cont, msgCont = this.dom.rightBar.msgCont;
					var sb = this.dom.rightBar.scrollBar.bar;
					var expandCont = root.dom.rightBar.expandCont;
					this.generatedSections = [];
					msgCont.zm_empty();
					var createSection = function(f,d,m,i,c)
					{
						var s_cont = create('div', cssStyles.compose.rightBar.origionalMsg.cont);
						var s_remove = create('div', cssStyles.compose.rightBar.origionalMsg.close);
						var s_from = create('p', cssStyles.compose.rightBar.origionalMsg.from);
						var s_date = create('p', cssStyles.compose.rightBar.origionalMsg.date);
						var s_message = document.createElement('div');
						var s_sender = f.cloneNode(true);
						text(s_from, 'From: ');
						text(s_date, d);
						text(s_remove, 'x');
						s_message.innerHTML = m.replace(/color: ?#377395|color: ?rgb\(55, 115, 149\)/g, 'color: #194965');
						s_remove.data = {'index': i, 'contents': c};
						s_sender.style.color = '#194965';
						s_sender.style.fontSize = '14px';
						s_from.zm_append([s_sender, s_date]);
						s_cont.zm_append([s_from, s_message, s_remove]);
						s_remove.onclick = function()
						{
							var index = this.data.index, sections = root.generatedSections;
							if(sections[index] && sections[index][2] == 1) root.generatedSections[index][2] = 0;
							this.parentNode.remove();
						};
						root.generatedSections.push([s_cont, c, 1]);
					};
					
					if(msg.fi === -1)
					{
						var subject = create('p', cssStyles.message.subject);
						var from = create('p', cssStyles.message.from);
						var to = create('p', cssStyles.message.from);
						var msgBody = create('p', cssStyles.message.body);
						var date = create('span', cssStyles.message.date);
			
						text(subject, msg.s);
						text(from, 'From: System');
						text(to, 'To: You');
						text(date, this.formatDate(msg.d, 'msg'));
						msgBody.innerHTML = this.decodeMsg(b);
						from.appendChild(date);
						msgCont.zm_append([subject, from, to, msgBody]);
					}
					
					if((msg.fi !== -1) && (/<cnc>/.test(b)))
					{
						str = b.replace(/[\t\r\n]/g, '</br>');
						var sections = [];
						var cnc = str.match(/<cnc>.*?<\/cnc>/g);
						var re  = /(?:<(cncs|cncd|cnct)>)((?:.(?!\1))+.)(?:<\/\1>)/g, match;
						
						for(var i = 0; i < cnc.length; i++)
						{
							var sd, dt, txt;
							while ((match = re.exec(cnc[i])) !== null) 
							{
								var tag = match[1], val = match[2];
								switch(tag)
								{
									case 'cncs': sd = val; break;
									case 'cncd': dt = parseInt(val); break;
									case 'cnct': txt = val; break;
								}
							};
							sections.push([sd, dt, txt]);
						}
						
						for(var n = 0; n < sections.length; n++)
						{
							var subject = create('p', cssStyles.message.subject);
							var from = create('p', cssStyles.message.from);
							var msgBody = create('p', cssStyles.message.body);
							var date = create('span', cssStyles.message.date);
							var sender = create('a', cssStyles.link._12);
							text(subject, msg.s);
							text(from, 'From: ');
							text(date, this.formatDate(sections[n][1], 'msg'));
							text(sender, sections[n][0]);
							sender.data = {'name': sections[n][0]};
							sender.onclick = function(){webfrontend.gui.util.BBCode.openPlayerProfile(this.data.name)};
							sender.style.marginRight = 0;
							from.zm_append([sender, date]);
							if (sections[n][2]) msgBody.innerHTML = this.decodeMsg(sections[n][2]);
							
							if(n == 0)
							{
								var to = create('p', cssStyles.message.from);
								var expand = create('span', cssStyles.message.expand);
								var addFriend = create('a', cssStyles.message.actionLink);
								var blockContact = create('a', cssStyles.message.actionLink);
								var add = function(){ root.addFriend.apply(root, arguments) };
								var block = function(){ root.blockContact.apply(root, arguments) };
								var isFriend = (this.contacts.friends) ? this.contacts.friends.indexOf(msg.fi) > -1 : false;
								var isBlocked = (this.contacts.blocked) ? this.contacts.blocked.indexOf(msg.fi) > -1 : false;
								text(to, 'To: ');
								text(addFriend, 'Add to contacts');
								text(blockContact, 'Block');
								addFriend.data = {'id': msg.fi};
								blockContact.data = {'id': msg.fi};
								addFriend.onclick = function(){ add(this.data.id); addFriend.remove(); blockContact.remove(); };
								blockContact.onclick = function(){ block(this.data.id); addFriend.remove(); blockContact.remove(); };
								expand.style.backgroundImage = 'url(' + root.res.expand + ')';
								expand.data = {'isCollapsed': true, 'cont': to, 'bar': null};
								expand.onclick = function()
								{
									if (this.data.isCollapsed)
									{
										this.data.cont.style.whiteSpace = 'normal';
										this.style.backgroundImage = 'url(' + root.res.collapse + ')';
									}
									else
									{
										this.data.cont.style.whiteSpace = 'nowrap';
										this.style.backgroundImage = 'url(' + root.res.expand + ')';
									}
									root.dom.rightBar.scrollBar.bar.data.update();
									this.data.isCollapsed = !this.data.isCollapsed;
								};
								if (!isFriend && !isBlocked) from.zm_append([addFriend, blockContact]);
								
								for(var a = 0; a < msg.t.length; a++)
								{
									var receiver = create('a', cssStyles.link._12);
									var s = (a == msg.t.length - 1) ? msg.t[a] : msg.t[a] + ',';
									receiver.data = {'name': msg.t[a]};
									receiver.onclick = function(){webfrontend.gui.util.BBCode.openPlayerProfile(this.data.name)};
									text(receiver, s);
									to.appendChild(receiver);
								}
								subject.addEventListener('mouseover', function(){expandCont.style.visibility = 'visible'}, false);
								subject.addEventListener('mouseout', function()
								{
									setTimeout(function(){if (!expandCont.data.isFocused) expandCont.style.visibility = 'hidden'}, 50);
								}, false);
								msgCont.zm_append([subject, from, to, msgBody]);
								if (to.scrollWidth > to.offsetWidth) to.appendChild(expand);
							}
							else msgCont.zm_append([from, msgBody]);
							createSection(sender, date.innerHTML, msgBody.innerHTML, n, cnc[n]);
						}
					}
					if (this.selectedFolder == 'inbox') msgCont.appendChild(expandCont);
					msgCont.style.top = 0;
					sb.data.update();
				},
				
				createHeader: function(msg)
				{
					var create = this.create, text = this.text, cssStyles = this.css, root = this;
					var selectAll = this.dom.middleBar.footer.selectAll;
					var headerCont = create('div', cssStyles.header.cont);
					var sender = create('a', cssStyles.header.sender);
					var date = create('span', cssStyles.header.date);
					var subject = create('p', cssStyles.header.subject);
					var checkBox = create('div', cssStyles.header.checkBox);
					var span = create('span', cssStyles.header.span);
					text(sender, msg.f);
					text(date, this.formatDate(msg.d, 'header'));
					text(subject, msg.s);
					sender.data = {'from': msg.f};
					sender.onclick = function()
					{
						root.preventDefaults(event);
						webfrontend.gui.util.BBCode.openPlayerProfile(this.data.from)
					};
					span.appendChild(checkBox);
					headerCont.zm_append([span, sender, date, subject]);
					headerCont.data = {'msg': msg, 'isSelected': false, 'isRead': msg.r};
					if(!msg.r)
					{
						headerCont.zm_css(cssStyles.header.contUnRead);
						span.style.borderBottom = cssStyles.header.contUnRead.borderBottom;
					}
					headerCont.onmouseover = function(){this.style.background = '#363636'};
					headerCont.onmouseout = function()
					{
						var isSelected = this.data.isSelected, isRead = this.data.isRead;
						var color = isSelected ? '#363636' : (isRead) ? 'transparent' : '#292929';
						this.style.background = color;
					};
					headerCont.onclick = function()
					{
						if(!this.data.isRead)
						{
							var id = this.data.msg.i;
							var index = root.getMsgIndex(id, root.folders.inbox.msgs);
							var data = zmail.data.getInstance();
							data.markRead([id], true);
							this.data.isRead = true;
							if (index > -1) root.folders.inbox.msgs[index].r = true;
						}
						if(root.selectedHeader !== null)
						{
							root.selectedHeader.style.background = (root.selectedHeader.data.isRead) ? 'transparent' : '#292929';
							root.selectedHeader.style.fontWeight = (root.selectedHeader.data.isRead) ? 'normal' : 'bold';
							root.selectedHeader.data.isSelected = false;
						}
						root.selectedHeader = this;
						this.data.isSelected = true;
						this.style.background = '#363636';
						root.printMsg(this.data.msg);
						root.setToolbar();
					};
					checkBox.data = {'id': msg.i, 'isChecked': false, 'cont': headerCont};
					checkBox.onmousedown = function(){this.style.background = '#202020'};
					checkBox.onmouseup = function()
					{
						var isChecked = this.data.isChecked, isRead = this.data.cont.data.isRead;
						var index = root.selectedMsgs.ids.indexOf(this.data.id);
						if(!isChecked)
						{
							if(index == -1)
							{
								root.selectedMsgs.ids.push(this.data.id);
								root.selectedMsgs.headers.push(this.data.cont);
								root.selectedMsgs.checkBoxes.push(this);
							}
							this.style.background = '#9f9f9f';
							this.data.cont.style.background = '#363636';
							this.data.cont.data.isSelected = true;
						}
						if(isChecked)
						{
							if(index > -1)
							{
								root.selectedMsgs.ids.splice(index, 1);
								root.selectedMsgs.headers.splice(index, 1);
								root.selectedMsgs.checkBoxes.splice(index, 1);
							}
							this.style.background = 'transparent';
							this.data.cont.style.background = isRead ? 'transparent' : '#292929';
							this.data.cont.data.isSelected = false;
						}
						this.data.isChecked = !isChecked;
						if (root.selectedMsgs.ids != null)
						{
							var th = root.size(root.generatedHeaders), sh = root.selectedMsgs.ids.length;
							selectAll.style.background = (sh < th) ? 'transparent': '#9f9f9f';
							selectAll.data.isChecked = (sh == th);
						}
						root.selectedHeader = null;
						root.resetMsgCont(1);
						root.setToolbar();
					};
					
					checkBox.onclick = function(event)
					{
						root.preventDefaults(event);
					};
					return {'cont': headerCont, 'checkBox': checkBox};
				},
					
				populateHeaders: function()
				{
					try
					{
						switch(this.selectedFolder)
						{
							case 'trash': var arr = this.folders.trash[0].msgs.concat(this.folders.trash[1].msgs); break;
							case 'draft':
								var arr = [];
								if (this.folders.draft != null || this.size(this.folders.draft) > 0)
								for (var key in this.folders.draft)
								{
									var msg = this.folders.draft[key];
									arr.push(msg);
								};
							break;
							default: var arr = this.folders[this.selectedFolder].msgs;
						}
						var compare = function(a,b)
						{
							return (a.d < b.d) ? 1 : (a.d > b.d) ? -1 : 0;
						};
						arr = arr.sort(compare);
						var create = this.create, text = this.text, cssStyles = this.css, root = this;
						var headersCont = this.dom.middleBar.headersCont;
						var headersSbc = this.dom.middleBar.scrollBar.cont;
						headersSbc.zm_empty();
						headersCont.zm_empty();
						headersCont.style.top = 0;
						this.selectedHeader = null;
						this.selectedMsgs.ids = [];
						this.selectedMsgs.headers = [];
						this.selectedMsgs.checkBoxes = [];
						this.generatedHeaders = {};
						this.resetMsgCont(1);
						this.setToolbar();
						if(arr == null) return;
						var Min = this.selectedPage * 30, Max = (this.selectedPage + 1) * 30, pages = Math.ceil(arr.length / 30);
						for(var i = Min; i < Math.min(Max, arr.length); i++)
						{
							var msg = arr[i];
							var header = this.createHeader(msg);
							headersCont.appendChild(header.cont);
							root.generatedHeaders[msg.i] = {
								'cont': header.cont,
								'checkBox': header.checkBox,
								'msg': msg
							};
						}
						
						var selectAll = this.dom.middleBar.footer.selectAll;
						var ind = this.dom.middleBar.footer.indicator;
						var controlCont = this.dom.middleBar.footer.controlCont;
						var pagesCount = this.dom.middleBar.footer.pagesCount;
						selectAll.style.background = 'transparent';
						selectAll.data.isChecked = false;
						selectAll.style.display = (arr.length > 0) ? 'block' : 'none';
						if(arr.length > 30)
						{
							var width = 197 / pages;
							controlCont.style.display = 'block';
							ind.style.display = 'block';
							ind.style.width = width + 'px';
							ind.style.marginLeft = this.selectedPage * width + 'px';
							var text = 'Page ' + (this.selectedPage + 1) + '/' + pages;
							(pagesCount.innerText) ? pagesCount.innerText = text : pagesCount.textContent = text;
						}
						if (arr.length < 30)
						{
							ind.style.display = 'none';
							controlCont.style.display = 'none';
							(pagesCount.innerText) ? pagesCount.innerText = '' : pagesCount.textContent = '';
						}
						if (arr.length * 30 > headersSbc.offsetHeight)
						{
							headersSbc.zm_empty();
							var sb = create('div', cssStyles.middleBar.scrollBar.bar);
							this.dom.middleBar.scrollBar.bar = sb;
							headersSbc.appendChild(sb);
							this.enableScroll(sb, headersSbc, headersCont);
							var div = document.getElementById('zdoom_mail_container');
							if (!div) sb.style.height = 421 * 401 / (Math.min(arr.length, 30) * 60) + 'px';
						}
					}
					catch(e)
					{
						console.log('zmail: ' + e.toString());
					}
				},
				
				findContact: function(txt)
				{
					var players = zmail.data.getInstance().players;
					var root = this;
					var resultsCont = this.dom.rightBar.contacts.contentsCont;
					var cont = this.dom.rightBar.contacts.results;
					var scrollbarCont = this.dom.rightBar.contacts.scrollbarCont;
					var searchBox = this.dom.rightBar.contacts.search;
					var lowerCont = this.dom.rightBar.contacts.lowerCont;
					var saveGroup = this.dom.rightBar.contacts.buttons.saveGroup;
					var arr = [];
					var str = txt.replace(/[^a-zA-Z0-9\-_]/g, '').toLowerCase();
					if (str == '')
					{
						cont.style.display = 'none';
						lowerCont.style.display = 'none';
						saveGroup.style.display = 'block';
						return;
					}
					for(var i = 0; i < players.length; i++)
					{
						if (players[i].pn.toLowerCase().substr(0,str.length) == str) arr.push(players[i]);
						if (arr.length >= 20) break;
					}
					var activate = function()
					{
						root.changeContactSelection.apply(root, arguments);
					};
					var items = [];
					resultsCont.zm_empty();
					scrollbarCont.zm_empty();
					searchBox.data.selectedIndex = 0;
					searchBox.data.isContOpen = true;
					searchBox.data.selectedGroup = 'results';
					for(var i = 0; i < arr.length; i++)
					{
						var style = (i == 0) ? 'contSelected' : 'cont';
						var Item = this.create('div', this.css.compose.leftBar.recipients.searchBox.item[style]);
						var player = this.create('p', this.css.compose.leftBar.recipients.searchBox.item.text);
						var alliance = this.create('p', this.css.compose.leftBar.recipients.searchBox.item.text);
						this.text(player, arr[i].pn);
						this.text(alliance, arr[i].an);
						Item.zm_append([player, alliance]);
						Item.data = {'id': arr[i].p, 'index': i};
						Item.onclick = function()
						{
							activate(this.data.index);
						};
						resultsCont.appendChild(Item);
						items.push(Item);
					}
					this.setContactOptions(arr[0].p);
					lowerCont.style.display = 'block';
					saveGroup.style.display = 'none';
					cont.style.display = 'block';
					cont.style.height = Math.min(145, arr.length * 49) + 'px';
					cont.style.top = searchBox.offsetTop + 30 + 'px';
					if(arr.length > 5)
					{
						var bar = this.create('div', this.css.rightBar.contacts.results.scrollbar.bar);
						scrollbarCont.appendChild(bar);
						this.enableScroll(bar, scrollbarCont, resultsCont);
					}
					searchBox.data.isContOpen = true;
					searchBox.data.results = items;
				},
				
				changeContactSelection: function(mode)
				{
					var searchBox = this.dom.rightBar.contacts.search;
					var mainCont = this.dom.rightBar.contacts.results;
					var resultsSbc = this.dom.rightBar.contacts.scrollbarCont;
					var resultsCont = this.dom.rightBar.contacts.contentsCont;
					var index = searchBox.data.selectedIndex;
					var results = searchBox.data.results;
					var length = results.length;
					var newIndex = (typeof mode === 'number') ? mode : (mode) ? (index + 1) % length : (index - 1 < 0) ? length - 1 : index - 1;
					var currentItem = results[index];
					var newItem = results[newIndex];
					currentItem.zm_css(this.css.compose.leftBar.recipients.searchBox.item.cont);
					newItem.zm_css(this.css.compose.leftBar.recipients.searchBox.item.contSelected);
					newItem.onmouseout = null;
					if (newIndex > 2 && length > 3)
					{
						var ch = resultsCont.offsetHeight, ph = resultsSbc.offsetHeight;
						resultsCont.style.top = -(newIndex - 2) * 49 + 'px';
						resultsSbc.firstChild.style.top = (((ph - 20) / ch) * (newIndex - 2) * 49) + 10 +'px';
					}
					if (newIndex < 3 && length > 3)
					{
						resultsCont.style.top = 0;
						resultsSbc.firstChild.style.top = '10px';
					}
					searchBox.data.selectedIndex = newIndex;
					this.setContactOptions(newItem.data.id);
				},
				
				setContactOptions: function(id)
				{
					var addToSelection = this.dom.rightBar.contacts.buttons.addToSelection;
					var addAsFriend = this.dom.rightBar.contacts.buttons.addAsFriend;
					var block = this.dom.rightBar.contacts.buttons.block;
					var isFriend = this.contacts.friends.indexOf(id) > -1;
					var isBlocked = this.contacts.blocked.indexOf(id) > -1;
					var isSelected = this.selectedContacts.indexOf(id) > -1;
					addToSelection.innerHTML = (isSelected) ? 'Remove' : 'Add to selection';
					addToSelection.data.mode = (isSelected) ? 'remove' : 'add';
					addAsFriend.innerHTML = (isFriend) ? 'Remove Friend' : 'Add Friend';
					addAsFriend.data.mode = (isFriend) ? 'remove' : 'add';
					block.innerHTML = (isBlocked) ? 'Unblock' : 'Block';
					block.data.mode = (isBlocked) ? 'unblock' : 'block';
					addAsFriend.data.id = id;
					addToSelection.data.id = id;
					block.data.id = id;
					(isBlocked) ? addAsFriend.data.disable() : addAsFriend.data.enable();
					(isFriend) ? block.data.disable() : block.data.enable();
				},
				
				addFriend: function(id)
				{
					if(this.contacts.friends.indexOf(id) == -1) this.contacts.friends.push(id);
					this.dom.leftBar.contacts.friends.nodeValue = 'Friends ' + this.contacts.friends.length;
					if(this.selectedGroup == 'friends') this.populateContacts();
					this.storage.save.call(this);
				},
				
				blockContact: function(id)
				{
					if(this.contacts.blocked.indexOf(id) == -1) this.contacts.blocked.push(id);
					this.dom.leftBar.contacts.blocked.nodeValue = 'Blocked ' + this.contacts.blocked.length;
					if(this.selectedGroup == 'blocked') this.populateContacts();
					this.storage.save.call(this);
				},
				
				removeFriend: function(id)
				{
					if(this.contacts.friends.indexOf(id) > -1) this.contacts.friends.splice(this.contacts.friends.indexOf(id), 1);
					this.dom.leftBar.contacts.friends.nodeValue = 'Friends ' + (this.contacts.friends.length || '');
					if(this.selectedGroup == 'friends') this.populateContacts();
					this.storage.save.call(this);
				},
				
				unblockContact: function(id)
				{
					if(this.contacts.blocked.indexOf(id) > -1) this.contacts.blocked.splice(this.contacts.blocked.indexOf(id), 1);
					this.dom.leftBar.contacts.blocked.nodeValue = 'Blocked ' + (this.contacts.blocked.length || '');
					if(this.selectedGroup == 'blocked') this.populateContacts();
					this.storage.save.call(this);
				},
				
				addToSelection: function(id)
				{
					if(this.selectedContacts.indexOf(id) == -1)
					{
						this.selectedContacts.push(id);
						this.addSelectedContacts();
					}
				},
				
				removeFromSelection: function(id)
				{
					if(this.selectedContacts.indexOf(id) > -1)
					{
						this.selectedContacts.splice(this.selectedContacts.indexOf(id) , 1);
						this.addSelectedContacts();
					}
				},
				
				removeAllSelectedContacts: function()
				{
					var arr = this.selectedContacts, headers = this.generatedHeaders, group = this.selectedGroup;
					var selectAll = this.dom.middleBar.footer.selectAll;
					for (var id in headers)
					{
						headers[id].checkBox.style.background = 'transparent';
						headers[id].cont.style.background = 'transparent';
						headers[id].cont.data.isSelected = false;
					};
					selectAll.style.background = 'transparent';
					selectAll.data.isChecked = false;
					this.selectedContacts = [];
					this.addSelectedContacts();
				},
				
				saveNewGroup: function()
				{
					var create = this.create, text = this.text, css = this.css.confirm, root = this;
					var rootCont = this.dom.window.main;
					var groupsTxt = this.dom.leftBar.contacts.groups;
					var contacts = this.selectedContacts.map(function(x){return {'id': x, 'name': root.getPlayerNameById(x)}});
					
					var wrapper = create('div', css.wrapper);
					var cont = create('div', css.cont);
					var title = create('p', css.subCont);
					var input = create('textField', css.input);
					var btnsCont = create('div', css.subCont);
					var saveBtn = create('div', css.button);
					var cancelBtn = create('div', css.button);
					
					text(title, 'Type the name of the new group:');
					text(saveBtn, 'Save');
					text(cancelBtn, 'Cancel');
					btnsCont.zm_append([saveBtn, cancelBtn]);
					cont.zm_append([title, input, btnsCont]);
					title.style.textAlign = 'left';
					
					var removeCont = function()
					{
						rootCont.removeChild(wrapper);
						rootCont.removeChild(cont);
					};
					
					saveBtn.onclick = function()
					{
						var name = input.value;
						root.contacts.groups[name] = contacts;
						root.storage.save.call(root);
						groupsTxt.nodeValue = 'Groups ' + (root.size(root.contacts.groups) || '');
						removeCont();
					};
					cancelBtn.onclick = removeCont;
					
					rootCont.appendChild(wrapper);
					rootCont.appendChild(cont);
				},
				
				saveExistedGroup: function()
				{
					var create = this.create, text = this.text, css = this.css.confirm, root = this;
					var rootCont = this.dom.window.main;
					var groupsTxt = this.dom.leftBar.contacts.groups;
					var contacts = this.selectedContacts.map(function(x){return {'id': x, 'name': root.getPlayerNameById(x)}});
					
					var wrapper = create('div', css.wrapper);
					var cont = create('div', css.cont);
					var subCont = create('div', css.subCont);
					var selectBox = create('div', css.select);
					var selectList = create('span', css.list.cont);
					var selectUl = create('ul', css.list.ul);
					var saveBtn = create('div', css.button);
					var cancelBtn = create('div', css.button);
					
					text(saveBtn, 'Update');
					text(cancelBtn, 'Cancel');
					selectBox.innerHTML = '+ Select a group';
					selectBox.data = {'name': null};
					selectList.data = {'isOpen': false, 'isFocused': false};
					saveBtn.style.width = '85px';
					cancelBtn.style.width = '85px';
					cancelBtn.style.margin = 0;
					
					for (var group in this.contacts.groups)
					{
						var li = create('li', css.list.li);
						li.data = {'name': group};
						text(li, group);
						li.onclick = function()
						{
							selectBox.innerHTML = '+ ' + this.data.name;
							selectBox.data.name = this.data.name;
							selectList.style.display = 'none';
							selectList.data.isOpen = false;
						};
						li.addEventListener('mouseover', function(){selectList.data.isOpen = true}, false);
						selectUl.appendChild(li);
					}
					
					selectList.appendChild(selectUl);
					selectBox.appendChild(selectList);
					subCont.zm_append([selectBox, saveBtn, cancelBtn]);
					cont.zm_append([subCont]);
					
					selectList.addEventListener('mouseout', function()
					{
						this.data.isFocused = false;
						setTimeout(function()
						{
							var isOpen = selectList.data.isOpen, isFocused = selectList.data.isFocused;
							if (isOpen && !isFocused)
							{
								selectList.style.display = 'none';
								selectList.data.isOpen = false;
							}
						});
					}, false);
					
					selectBox.onclick = function()
					{
						var isOpen = selectList.data.isOpen;
						selectList.style.display = (isOpen) ? 'none' : 'block';
					};
					
					var removeCont = function()
					{
						rootCont.removeChild(wrapper);
						rootCont.removeChild(cont);
					};
					
					saveBtn.onclick = function()
					{
						var name = selectBox.data.name;
						if (name != null)
						{
							root.contacts.groups[name] = contacts;
							root.storage.save.call(root);
							removeCont();
						}
					};
					cancelBtn.onclick = removeCont;
					
					rootCont.appendChild(wrapper);
					rootCont.appendChild(cont);
				},
				
				addGroupToSelection: function()
				{
					var arr = this.selectedContacts, headers = this.generatedHeaders;
					for (var id in headers)
					{
						if(arr.indexOf(parseInt(id, 10)) == -1) this.selectedContacts.push(parseInt(id, 10));
						headers[id].checkBox.style.background = '#9f9f9f';
						headers[id].cont.style.background = '#363636';
						headers[id].cont.data.isSelected = true;
					};
					this.addSelectedContacts();
				},
				
				removeGroupFromSelection: function()
				{
					var arr = this.selectedContacts, headers = this.generatedHeaders;
					for (var id in headers)
					{
						if(arr.indexOf(parseInt(id, 10)) > -1) this.selectedContacts.splice(this.selectedContacts.indexOf(parseInt(id, 10)), 1);
						headers[id].checkBox.style.background = 'transparent';
						headers[id].cont.style.background = 'transparent';
						headers[id].cont.data.isSelected = false;
					};
					this.addSelectedContacts();
				},
				
				getPlayerNameById: function(id)
				{
					var data = zmail.data.getInstance();
					var players = data.players;
					var name;
					for (var i = 0; i < players.length; i++) if (players[i].p == id) { name = players[i].pn; break; }
					return name;
				},
				
				getPlayerDataById: function(id)
				{
					var data = zmail.data.getInstance();
					var players = data.players;
					var playerData;
					for (var i = 0; i < players.length; i++) if (players[i].p == id) { playerData = players[i]; break; }
					return playerData;
				},
						
				addSelectedContacts: function()
				{
					var cont = this.dom.rightBar.contacts.cont;
					var header = this.dom.rightBar.contacts.header;
					var contactsSb = this.dom.rightBar.contacts.bar;
					var root = this, sc = this.selectedContacts;
					var text = sc.length == 0 ? 'Контакты не выделены.' : sc.length + ' выбрано';
					(header.innerText) ? header.innerText = text : header.textContent = text;
					cont.zm_empty();
					for(var i = 0; i < this.selectedContacts.length; i++)
					{
						var id = this.selectedContacts[i], name = this.getPlayerNameById(id);
						var Item = this.create('div', this.css.compose.leftBar.recipients.recipient.cont);
						var remove = this.create('div', this.css.compose.leftBar.recipients.recipient.remove);
						this.text(Item, name);
						this.text(remove, 'X');
						remove.data = {'id': id, 'parent': Item};
						remove.onclick = function()
						{
							cont.removeChild(this.data.parent)
							var pid = this.data.id, index = root.selectedContacts.indexOf(pid);
							if(index > -1) root.selectedContacts.splice(index, 1);
						};
						Item.appendChild(remove);
						cont.appendChild(Item)
					}
					if(this.selectedContacts.length > 0)
					{
						this.dom.rightBar.contacts.buttons.removeAll.data.enable();
						this.dom.rightBar.contacts.buttons.message.data.enable();
						this.dom.rightBar.contacts.buttons.saveGroup.data.enable();
					}
					else
					{
						this.dom.rightBar.contacts.buttons.removeAll.data.disable();
						this.dom.rightBar.contacts.buttons.message.data.disable();
						this.dom.rightBar.contacts.buttons.saveGroup.data.disable();
					}
					contactsSb.data.update();
					contactsSb.data.scrollToEnd();
				},
				
				populateContacts: function()
				{
					try
					{
						var data = zmail.data.getInstance();
						var create = this.create, text = this.text, cssStyles = this.css
						var headersCont = this.dom.middleBar.headersCont;
						var headersSbc = this.dom.middleBar.scrollBar.cont, root = this;
						var selectAll = this.dom.middleBar.footer.selectAll;
						var ind = this.dom.middleBar.footer.indicator;
						var controlCont = this.dom.middleBar.footer.controlCont;
						var pagesCount = this.dom.middleBar.footer.pagesCount;
						var contactsSb = this.dom.rightBar.contacts.bar;
						var isAllContactsSelected = true;
						var group = this.selectedGroup;
						(pagesCount.innerText) ? pagesCount.innerText = '' : pagesCount.textContent = '';
						ind.style.display = 'none';
						controlCont.style.display = 'none';
						headersSbc.zm_empty();
						headersCont.zm_empty();
						headersCont.style.top = 0;
						this.setToolbar();
						this.resetMsgCont();
						this.generatedHeaders = {};
						this.dom.rightBar.msgCont.appendChild(this.dom.rightBar.contacts.main);
						
						switch(group)
						{
							case 'friends': 
								var contacts = [];
								this.contacts.friends.map(function(x)
								{
									var c = root.getPlayerDataById(x);
									c.name = c.pn;
									contacts.push(c);
								});						
							break;
							case 'blocked': 
								var contacts = [];
								this.contacts.blocked.map(function(x)
								{
									var c = root.getPlayerDataById(x);
									c.name = c.pn;
									contacts.push(c);
								});						
							break;
							case 'alliance': var contacts = data.allianceMembers; break;
							case 'commanders': var contacts = data.allianceCommanders; break;
							case 'officers': var contacts = data.allianceOfficers; break;
							case 'groups': var contacts = root.contacts.groups; break;
							case 'allies':
								var contacts = {}, allies = data.allies;
								for (var x in allies)
								{
									contacts[x] = allies[x].map(function(a){return{'id': a.i, 'name': a.n}});
								}
							break;
							default: var contacts = false;
						}
						
						var compareRank = function(a,b)
						{
							return (a.roleId > b.roleId) ? 1 : (a.roleId < b.roleId) ? -1 : 0;
						};
						var compareName = function(a,b)
						{
							return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 0;
						};
						if ((group == 'alliance')||(group == 'commanders')) contacts.sort(compareRank);
						else if ((group == 'firends')||(group == 'blocked')) contacts.sort(compareName);
						else contacts = contacts;
						
						if ((contacts)&&(group != 'allies')&&(group != 'groups'))
						{
							for (var i = 0; i < contacts.length; i++)
							{
								var contact = contacts[i];
								var id = contact.p || contact.id;
								var playerName = contact.pn || contact.name;
								var contactCont = create('div', cssStyles.header.cont);
								var name = create('a', cssStyles.header.sender);
								var rank = create('p', cssStyles.header.subject);
								var checkBox = create('div', cssStyles.header.checkBox);
								var span = create('span', cssStyles.header.span);
								contactCont.data = {'id': id, 'name': playerName, 'isSelected': false, 'checkBox': checkBox};
								if (this.selectedContacts.indexOf(id) > -1)
								{
									checkBox.style.background = '#9f9f9f';
									contactCont.style.background = '#363636';
									contactCont.data.isSelected = true;
								}
								else isAllContactsSelected = false;
								text(name, playerName);
								text(rank, (contact.an || contact.role) || '');
								name.data = {'name': playerName};
								name.onclick = function(event)
								{
									root.preventDefaults(event);
									webfrontend.gui.util.BBCode.openPlayerProfile(this.data.name);
								};
								name.onmousedown = function(event){root.preventDefaults(event)};
								name.onmouseup = function(event){root.preventDefaults(event)};
								span.appendChild(checkBox);
								contactCont.zm_append([span, name, rank]);
								contactCont.onmouseover = function(){if (!this.data.isSelected) this.style.background = '#363636'};
								contactCont.onmouseout  = function(){if (!this.data.isSelected) this.style.background = 'transparent'};
								contactCont.onmousedown = function(){this.data.checkBox.style.background = '#202020'};
								contactCont.onclick = function()
								{
									var index = root.selectedContacts.indexOf(this.data.id);
									var isSelected = this.data.isSelected;
									if(isSelected)
									{
										this.data.checkBox.style.background = 'transparent';
										this.style.background = 'transparent';
										if (index > -1) root.selectedContacts.splice(index, 1);
									}
									else
									{
										this.data.checkBox.style.background = '#9f9f9f';
										this.style.background = '#363636';
										if (index == -1) root.selectedContacts.push(this.data.id);
									}
									this.data.isSelected = !isSelected;
									root.addSelectedContacts();
	
									var th = root.size(root.generatedHeaders), sh = root.selectedContacts.length;
									selectAll.style.background = (sh == th) ? '#9f9f9f' : 'transparent';
									selectAll.data.isChecked = (sh == th);
								};
								
								if ((group == 'friends')||(group == 'blocked'))
								{
									var remove = create('div', cssStyles.notification.remove);
									remove.innerHTML = 'X';
									remove.data = {'isFocused': false, 'cont': contactCont, 'id': id};
									remove.onmousedown = function(event){root.preventDefaults(event)};
									remove.onmouseup = function(event){root.preventDefaults(event)};
									remove.onclick = function(event)
									{
										root.preventDefaults(event);
										var cont = this.data.cont, id = this.data.id, index = root.contacts[group].indexOf(id);
										var txt = (group == 'friends') ? 'Friends ' : 'Blocked ';
										if (index > -1)
										{
											root.contacts[group].splice(index, 1);
											delete root.generatedHeaders[id];
											headersCont.removeChild(cont);
											root.dom.leftBar.contacts[group].nodeValue = txt + (root.contacts[group].length || '');
											root.storage.save.call(root);
										}
									}
									contactCont.appendChild(remove);
									contactCont.data.remove = remove;
									remove.style.display = 'none';
									contactCont.addEventListener('mouseover', function()
									{
										this.data.remove.data.isFocused = true;
										this.data.remove.style.display = 'block';
									}, false);
									contactCont.addEventListener('mouseout', function()
									{
										var remove = this.data.remove;
										remove.data.isFocused = false;
										setTimeout(function(){if (!remove.data.isFocused) remove.style.display = 'none'}, 10);
									}, false);
								}
								
								headersCont.appendChild(contactCont);
								root.generatedHeaders[id] = {'cont': contactCont, 'checkBox': checkBox, 'name': playerName};
							}
							selectAll.style.display = (contacts.length > 0) ? 'block' : 'none';
							selectAll.style.background = (isAllContactsSelected && contacts.length > 0) ? '#9f9f9f' : 'transparent';
							selectAll.data.isChecked = (isAllContactsSelected && contacts.length > 0);
							
							if(contacts.length * 30 > headersSbc.offsetHeight)
							{
								var sb = create('div', cssStyles.middleBar.scrollBar.bar);
								headersSbc.appendChild(sb);
								this.enableScroll(sb, headersSbc, headersCont);
							}
							contactsSb.data.update();
						}
						else if ((contacts)&&((group == 'allies')||(group == 'groups')))
						{
							for (var x in contacts)
							{
								var AllyName = x;
								var AllyMembers = contacts[x];
								var contactCont = create('div', cssStyles.header.cont);
								var name = create('a', cssStyles.header.sender);
								var count = create('p', cssStyles.header.subject);
								var checkBox = create('div', cssStyles.header.checkBox);
								var span = create('span', cssStyles.header.span);
								text(name, AllyName);
								text(count, AllyMembers.length + ' Members');
								contactCont.data = {'am': AllyMembers, 'an': name, 'isSelected': false, 'checkBox': checkBox};
								
								var isAllMembersSelected = true;
								for (var member in AllyMembers)
								{
									if (this.selectedContacts.indexOf(AllyMembers[member].id) == -1)
									{
										isAllMembersSelected = false;
										break;
									}
								}
								if (isAllMembersSelected)
								{
									checkBox.style.background = '#9f9f9f';
									contactCont.style.background = '#363636';
									contactCont.data.isSelected = true;
								}
								name.data = {'name': AllyName};
								name.onclick = function(event)
								{
									webfrontend.gui.util.BBCode.openAllianceProfile(this.data.name);
									root.preventDefaults(event);
								};
								name.onmousedown = function(event){root.preventDefaults(event)};
								name.onmouseup = function(event){root.preventDefaults(event)};
								span.appendChild(checkBox);
								contactCont.zm_append([span, name, count]);
								contactCont.onmouseover = function(){if (!this.data.isSelected) this.style.background = '#363636'};
								contactCont.onmouseout  = function(){if (!this.data.isSelected) this.style.background = 'transparent'};
								contactCont.onmousedown = function(){this.data.checkBox.style.background = '#202020'};
								contactCont.onclick = function()
								{
									var isSelected = this.data.isSelected;
									if(isSelected)
									{
										this.data.checkBox.style.background = 'transparent';
										this.style.background = 'transparent';
										for (var member in this.data.am)
										{
											var id = this.data.am[member].id;
											var index = root.selectedContacts.indexOf(id);
											if (index > -1) root.selectedContacts.splice(index, 1);
										}
									}
									else
									{
										this.data.checkBox.style.background = '#9f9f9f';
										this.style.background = '#363636';
										for (var member in this.data.am)
										{
											var id = this.data.am[member].id;
											var index = root.selectedContacts.indexOf(id);
											if (index == -1) root.selectedContacts.push(id);
										}
									}
									this.data.isSelected = !isSelected;
									root.addSelectedContacts();
									selectAll.style.display = 'none';
									
								};
								
								if ((group == 'groups'))
								{
									var remove = create('div', cssStyles.notification.remove);
									remove.innerHTML = 'X';
									remove.data = {'isFocused': false, 'cont': contactCont, 'name': AllyName};
									remove.onmousedown = function(event){root.preventDefaults(event)};
									remove.onmouseup = function(event){root.preventDefaults(event)};
									remove.onclick = function(event)
									{
										root.preventDefaults(event);
										var name = this.data.name, cont = this.data.cont;
										delete root.contacts.groups[name];
										delete root.generatedHeaders[name];
										headersCont.removeChild(cont);
										root.dom.leftBar.contacts.groups.nodeValue = 'Groups ' + (root.size(root.contacts.groups) || '');
										root.storage.save.call(root);
									}
									contactCont.appendChild(remove);
									remove.style.display = 'none';
									contactCont.data.remove = remove;
									contactCont.addEventListener('mouseover', function()
									{
										this.data.remove.style.display = 'block';
										this.data.remove.data.isFocused = true;
									}, false);
									contactCont.addEventListener('mouseout', function()
									{
										var remove = this.data.remove;
										remove.data.isFocused = false;
										setTimeout(function(){if (!remove.data.isFocused) remove.style.display = 'none'}, 10);
									}, false);
								}
								root.generatedHeaders[AllyName] = {'cont': contactCont, 'checkBox': checkBox, 'name': AllyName};
								headersCont.appendChild(contactCont);
							}
							
							if (root.size(contacts) * 30 > headersSbc.offsetHeight)
							{
								var sb = create('div', cssStyles.middleBar.scrollBar.bar);
								headersSbc.appendChild(sb);
								this.enableScroll(sb, headersSbc, headersCont);
							}
							contactsSb.data.update();
						}
						else console.log(contacts);
					}
					catch(e)
					{
						console.log('zmail: ' + e.toString());
					}
				},
				
				dom: {
					'window': 
					{
						'main': null,
						'compose': null
					},
					'leftBar': 
					{
						'folders': 
						{
							'inbox': null,
							'outbox': null,
							'draft': null,
							'junk': null,
							'trash': null
						},
						'items': {
							'inbox': null,
							'outbox': null,
							'draft': null,
							'junk': null,
							'trash': null,
							'documents': null,
							'alliance': null,
							'commanders': null,
							'officers': null,
							'allies': null,
							'groups': null,
							'friends': null,
							'blocked': null
						},
						'contacts': 
						{
							'alliance': null,
							'commanders': null,
							'officers': null,
							'allies': null,
							'groups': null,
							'friends': null,
							'blocked': null
						},
						'searchBox': null
					},					
					'rightBar': 
					{
						'cont': null,
						'msgCont': null,
						'expandCont': null,
						'scrollBar': 
						{
							'cont': null,
							'bar': null
						},
						'contacts':
						{
							'main': null,
							'lowerCont': null,
							'header': null,
							'cont': null,
							'bar': null,
							'search': null,
							'results': null,
							'contentsCont': null,
							'scrollbarCont': null,
							'buttons':
							{
								'removeAll': null,
								'message': null,
								'addToSelection': null,
								'addAsFriend': null,
								'block': null,
								'saveGroup': null
							}
						}
					},
					'middleBar': 
					{
						'headersCont': null,
						'scrollBar': 
						{
							'cont': null,
							'bar': null
						},
						'footer':
						{
							'selectAll': null,
							'pagesCount': null,
							'indicator': null,
							'controlCont': null
						}
					},
					'topBar': 
					{
						'logo': null,
						'menu': null,
						'toolbar':
						{
							'newMsg': null,
							'reply': null,
							'trash': null,
							'delMsg': null,
							'junk': null,
							'notJunk': null,
							'restore': null,
							'mark': null,
							'empty': null,
							'editDraft': null,
							'deleteDraft': null,
							'toDocuments': null,
							'notDocument': null,
							'forwardMsg': null
						}
					},
					'toolBar': 
					{
						'delete': null,
						'moveToTrash': null,
						'moveToJunk': null,
						'moveToInbox': null,
						'moveToOutbox': null,
						'compose': null
					},
					'searchResults':
					{
						'cont': null,
						'sender':
						{
							'count': null,
							'list': null
						},
						'subject':
						{
							'count': null,
							'list': null
						}
					},
					'compose':
					{
						'leftBar':
						{
							'recipientsMainCont': null,
							'recipientsCont': null,
							'recipientsSbc': null,
							'recipientsSb': null,
							'searchBox': null,
							'searchBoxCont': null,
							'contactsCont': null,
							'results':
							{
								'mainCont': null,
								'scrollbarCont': null,
								'resultsCont': null
							}
						},
						'rightBar':
						{
							'iframe': null,
							'subject': null,
							'msgCont': null,
							'charCount': null
						}
					}
				},
				
				css: 
				{
					'window': 
					{
						'background': '#292929',
						'width': '100%',
						'height': '471px',
						'paddingTop': '69px',
						'position': 'relative',
						'fontFamily': 'vrinda',
						'display': 'table'
					},
					'topBar': 
					{
						'main': 
						{
							'width': '100%', 
							'position': 'absolute',
							'top': 0,
							'left': 0
						},
						'cont': 
						{
							'backgroundImage': null,
							'height': '68px',
							'borderBottom': '1px solid rgba(0,0,0,0.56)',
							'width': '100%'
						},
						'logo': 
						{
							'width': '126px',
							'height': '24px',
							'display': 'inline-block',
							'verticalAlign': 'top',
							'padding': '22px 0',
							'textAlign': 'center',
							'fontSize': '18px',
							'fontWeight': 'bold',
							'color': '#cacaca'
						},
						'menu': 
						{
							'display': 'inline-block',
							'verticalAlign': 'top',
							'height': '68px'
						}
					},
					'leftBar': 
					{
						'background': '#3a3b3b',
						'minWidth': '126px',
						'height': '471px',
						'display': 'table-cell',
						'verticalAlign': 'top',
						'position': 'relative'
					},
					'rightBar': 
					{
						'main': 
						{
							'height': '471px',
							'display': 'table-cell',
							'verticalAlign': 'top',
							'width': '100%',
							'position': 'relative'
						},
						'msgMask': 
						{
							'overflow': 'hidden',
							'position': 'relative',
							'height': '471px'
						},
						'msgCont': 
						{
							'width': '394px',
							'position': 'absolute',
							'top': 0,
							'padding': '0 30px 0 20px',
							'overflow': 'hidden',
							'width': '100%',
							'boxSizing': 'border-box',
							'MozBoxSizing': 'border-box',
							'wordWrap': 'break-word',
							'lineHeight': '18px'
						},
						'scrollBar': 
						{
							'cont': 
							{
								'width': '16px',
								'position': 'absolute',
								'background': '#333333',
								'height': '471px',
								'top': 0,
								'right': 0
							},
							'bar': 
							{
								'width': '16px',
								'background': '#3b3b3b',
								'position': 'absolute',
								'top': '10px',
								'over': {'background': '#424242'},
								'out': {'background': '#3b3b3b'},
								'down': {'background': '#707070'},
								'up': {'background': '#3d3d3d'},
								'pointer': 'cursor'
							}
						},
						'contacts':
						{
							'topWrapper': 
							{
								'width': '100%',
								'paddingBottom': '5px',
								'borderBottom': '1px solid #434343'
							},
							'bottomWrapper':
							{
								'marginLeft': '200px',
								'width': 'auto',
								'paddingTop': '33px',
								'height': '125px'
							},
							'main':
							{
								'width': 'auto',
								'height': '193px',
								'border': '1px solid #1f1f1f',
								'background': '#323232',
								'position': 'relative',
								'margin': '5px 0 5px 0'
							},
							'mask':
							{
								'height': '100%',
								'position': 'relative',
								'overflow': 'hidden'
							},
							'scrollbar':
							{
								'cont':
								{
									'position': 'absolute',
									'top': 0,
									'right': 0,
									'width': '16px',
									'height': '100%',
									'overflow': 'hidden',
									'background': '#363636'
								},
								'bar':
								{
									'position': 'absolute',
									'top': '10px',
									'left': 0,
									'width': '16px',
									'background': '#3d3d3d' 
								}
							},
							'cont': 
							{
								'position': 'absolute',
								'width': '100%',
								'padding': '5px 21px 0 5px',
								'boxSizing': 'border-box',
								'MozBoxSizing': 'border-box',
								'lineHeight': '10px'
							},
							'search':
							{
								'width': '188px',
								'border': '1px solid #1f1f1f',
								'background': '#323232',
								'color': '#6c6d6d',
								'fontSize': '12px',
								'marginRight': '5px',
								'paddingLeft': '10px',
								'outline': 'none',
								'focus': {'outline': 'none'},
								'blur': {'outline': 'none'},
								'height': '25px',
								'lineHeigt': '25px',
								'display': 'inline-block',
								'verticalAlign': 'top'
							},
							'results': 
							{
								'cont':
								{
									'position': 'absolute',
									'width': '198px',
									'left': '20px',
									'border': '1px solid #1f1f1f',
									'background': '#323232',
									'display': 'none',
									'maxHeight': '145px'
								},
								'mask':
								{
									'position': 'relative',
									'top': 0,
									'left': 0,
									'width': '186px',
									'height': '100%',
									'overflow': 'hidden'
								},
								'contentsCont':
								{
									'position': 'relative',
									'width': '100%'
								},
								'scrollbar':
								{
									'cont':
									{
										'position': 'absolute',
										'top': 0,
										'right': 0,
										'width': '16px',
										'height': '100%',
										'background': '#363636'
									},
									'bar':
									{
										'position': 'absolute',
										'top': '10px',
										'background': '#3d3d3d',
										'width': '16px',
										'over': {'background': '#424242'},
										'out': {'background': '#3d3d3d'},
										'down': {'background': '#707070'},
										'up': {'background': '#3d3d3d'}
									}
								}
							},
							'button':
							{
								'active':
								{
									'height': '25px',
									'textAlign': 'center',
									'background': '#4e4e4e',
									'color': '#8b8b8b',
									'fontSize': '12px',
									'lineHeight': '25px',
									'over': {'background': '#266589', 'color': '#c2c2c2'},
									'out': {'background': '#4e4e4e', 'color': '#8b8b8b'},
									'cursor': 'pointer',
									'marginTop': '1px'
								},
								'disabled':
								{
									'height': '25px',
									'textAlign': 'center',
									'background': '#3f3f3f',
									'color': '#8b8b8b',
									'fontSize': '12px',
									'lineHeight': '25px',
									'over': {'background': '#3f3f3f', 'color': '#8b8b8b'},
									'out': {'background': '#3f3f3f', 'color': '#8b8b8b'},
									'cursor': 'default',
									'marginTop': '1px'
								}
							},
							'saveButton':
							{
								'cont':
								{
									'disabled':
									{
										'position': 'absolute',
										'bottom': '15px',
										'right': '30px',
										'height': '25px',
										'width': '100px',
										'textAlign': 'center',
										'background': '#3f3f3f',
										'color': '#8b8b8b',
										'fontSize': '12px',
										'lineHeight': '25px',
										'over': {'background': '#3f3f3f', 'color': '#8b8b8b'},
										'out': {'background': '#3f3f3f', 'color': '#8b8b8b'},
										'cursor': 'default'
									}
								},
								'span':
								{
									'position': 'absolute',
									'bottom': '25px',
									'left': 0,
									'border': '2px solid #266589',
									'border-bottom': 'none',
									'width': '100%',
									'height': '52px',
									'boxSizing': 'border-box',
									'MozBoxSizing': 'border-box',
									'display': 'none'
								},
								'sub':
								{
									'height': '25px',
									'width': '100%',
									'textAlign': 'center',
									'background': '#3f3f3f',
									'color': '#8b8b8b',
									'fontSize': '12px',
									'lineHeight': '25px',
									'over': {'background': '#4e4e4e', 'color': '#c2c2c2'},
									'out': {'background': '#3f3f3f', 'color': '#8b8b8b'},
									'cursor': 'pointer'
								}
							}
						}
					},
					'middleBar': 
					{
						'cont': 
						{
							'background': '#2e2e2e',
							'minWidth': '197px',
							'height': '471px',
							'display': 'table-cell',
							'verticalAlign': 'top',
							'position': 'relative'
						},
						'headers': 
						{
							'mask': 
							{
								'width': '180px',
								'height': '422px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'overflow': 'hidden',
								'position': 'relative'
							},
							'scroll': 
							{
								'position': 'absolute'
							}
						},
						'scrollBar': 
						{
							'cont': 
							{
								'width': '16px',
								'height': '421px',
								'top': 0,
								'right': 0,
								'background': '#333333',
								'borderRight': '1px solid rgba(0,0,0,0.2)',
								'position': 'absolute'
							},
							'bar': 
							{
								'width': '16px',
								'background': '#3b3b3b',
								'position': 'absolute',
								'top': '10px',
								'over': {'background': '#424242'},
								'out': {'background': '#3b3b3b'},
								'down': {'background': '#707070'},
								'up': {'background': '#3d3d3d'},
								'pointer': 'cursor'
							}
						},
						'footer': 
						{
							'cont':
							{
								'width': '197px',
								'background': '#424343',
								'borderRight': '1px solid rgba(0,0,0,0.3)',
								'height': '48px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'position': 'relative'
							},
							'pagesBar':
							{
								'width': '100%',
								'height': '2px',
								'background': '#377395'
							},
							'indicator':
							{
								'height': '2px',
								'background': '#898989'
							},
							'selectAll':
							{
								'checkBox': 
								{
									'border': '1px solid #5b5e5e',
									'width': '10px',
									'height': '10px',
									'margin': '10px 0 0 5px',
									'cursor': 'pointer'
								},
								'span': 
								{
									'width': '20px',
									'height': '59px',
									'position': 'absolute',
									'left': '2px',
									'top': '2px'
								}
							},
							'pagesControls':
							{
								'cont':
								{
									'width': '85px',
									'height': '20px',
									'position': 'absolute',
									'right': '11px',
									'top': '10px'
								},
								'label':
								{
									'position': 'absolute',
									'left': '30px',
									'top': '10px',
									'padding': 0,
									'height': '20px',
									'lineHeight': '20px',
									'color': '#7f7f7f',
									'display': 'none',
									'fontSize': '12px'
								},
								'icon':
								{
									'width': '20px',
									'height': '20px',
									'backgroundPosition': 'center',
									'backgroundRepeat': 'no-repeat',
									'display': 'inline-block',
									'verticalAlign': 'top',
									'margin': 0,
									'padding': 0,
									'cursor': 'pointer'
								}
							}
						}
					},
					
					'tableCellWrapper':
					{
						'position': 'relative',
						'display': 'block'
					},
					
					'ul': 
					{
						'leftBar': 
						{
							'main': 
							{
								'width': 'inherit',
								'listStyleType': 'none',
								'padding': 0,
								'margin': '10px 0 0 0'
							},
							'sub': 
							{
								'width': 'inherit',
								'listStyleType': 'none',
								'padding': 0,
								'margin': 0
							}
						},
						'toolbar': 
						{
							'main': 
							{
								'listStyleType': 'none',
								'margin': 0,
								'padding': 0,
								'height': '68px'
							},
							'sub': 
							{
								'border': '3px solid #404144',
								'display': 'none',
								'borderTop': 'none',
								'background': '#266589',
								'listStyleType': 'none',
								'width': '100%',
								'margin': 0,
								'padding': 0,
								'position': 'absolute',
								'top': '69px',
								'left': '-3px',
								'zIndex': 1000
							}
						}
					},
					'li': 
					{
						'leftBar': 
						{
							'main': 
							{
								'fontSize': '24px',
								'color': '#999999',
								'minHeight': '30px',
								'textIndent': '14px'
							},
							'sub': 
							{
								'fontSize': '12px',
								'color': '#909090',
								'background': 'transparent',
								'height': '20px',
								'lineHeight': '20px',
								'textIndent': '30px',
								'cursor': 'pointer',
								'over': 
								{
									'background': '#545555',
									'color': '#aeaeae'
								},
								'out': 
								{
									'background': 'transparent',
									'color': '#909090'
								}
							},
							'subSelected':
							{
								'fontSize': '12px',
								'color': '#aeaeae',
								'height': '20px',
								'lineHeight': '20px',
								'textIndent': '30px',
								'cursor': 'pointer',
								'background': '#545555',
								'over': 
								{
									'background': '#545555',
									'color': '#aeaeae'
								},
								'out': 
								{
									'background': '#545555',
									'color': '#aeaeae'
								}
							}
						},
						'toolbar': 
						{
							'textOnly': 
							{
								'height': '68px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'textAlign': 'left',
								'fontSize': '16px',
								'lineHeight': '68px',
								'color': '#cacaca',
								'cursor': 'pointer',
								'padding': '0 10px'
							},
							'withIcon': 
							{
								'height': '68px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'textAlign': 'left',
								'fontSize': '16px',
								'lineHeight': '68px',
								'color': '#cacaca',
								'cursor': 'pointer',
								'padding': '0 10px 0 45px',
								'position': 'relative'
							},
							'withDrop': 
							{
								'height': '68px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'textAlign': 'left',
								'fontSize': '16px',
								'lineHeight': '68px',
								'color': '#cacaca',
								'cursor': 'pointer',
								'padding': '0 30px 0 10px',
								'position': 'relative'
							},
							'icon': 
							{
								'width': '30px',
								'height': '30px',
								'position': 'absolute',
								'top': '15px',
								'left': '10px'
							},
							'drop': 
							{
								'width': '20px',
								'position': 'absolute',
								'right': 0,
								'top': 0,
								'height': '68px',
								'lineHeight': '68px',
								'fontWeight': 'bold',
								'over': {'backgroundColor': '#266589'},
								'out': {'backgroundColor': 'transparent'},
								'backgroundPosition': '0 center',
								'backgroundRepeat': 'no-repeat'
							},
							'newIcon': 
							{
								'width': '30px',
								'height': '30px',
								'position': 'absolute',
								'top': '18px',
								'left': '10px',
								'padding': 0,
								'margin': 0,
								'backgroundPosition': 'center',
								'backgroundRepeat': 'no-repeat'
							},
							'sub': 
							{
								'padding': '5px 10px',
								'over': {'background': '#377395', 'color': '#cacaca'},
								'out': {'background': 'transparent', 'color': '#aeaeae'},
								'color': '#aeaeae',
								'fontSize': '12px',
								'height': '20px',
								'lineHeight': '20px',
								'textAlign': 'center',
								'borderBottom': '1px solid #404040'
							}
						}
					},
					'input': 
					{
						'text': 
						{
							'search': 
							{
								'width': '87px',
								'border': '1px solid #1f1f1f',
								'height': '14px',
								'margin': '10px 7px 0 7px',
								'padding': '5px 15px 5px 10px',
								'color': '#333333',
								'fontSize': '12px',
								'background': '#525252',
								'focus': 
								{
									'color': '#aeaeae',
									'outline': 'none'
								},
								'blur': 
								{
									'color': '#333333'
								}
							}
						}
					},
					'header': 
					{
						'sender': 
						{
							'fontSize': '14px',
							'cursor': 'pointer',
							'color': '#377395',
							'height': '20px',
							'lineHeight': '20px',
							'margin': '2px 0 0 0',
							'display': 'block',
							'maxWidth': '96px',
							'display': 'inline-block',
							'textOverflow': 'ellipsis',
							'overflow': 'hidden',
							'whiteSpace': 'nowrap'
						},
						'date': 
						{
							'fontSize': '12px',
							'color': '#4d4d4d',
							'position': 'absolute',
							'height': '15px',
							'right': '10px',
							'top': '8px',
							'fontWeight': 'bold',
							'cursor': 'default'
						},
						'subject': 
						{
							'fontSize': '14px',
							'color': '#909090',
							'width': '100%',
							'height': '30px',
							'margin': 0,
							'padding': 0,
							'textOverflow': 'ellipsis',
							'overflow': 'hidden',
							'whiteSpace': 'nowrap'
						},
						'cont': 
						{
							'width': '150px',
							'height': '49px',
							'borderBottom': '1px solid #292929',
							'position': 'relative',
							'padding': '5px 5px 5px 25px',
							'fontWeight': 'normal',
							'lineHeight': '22px'
						},
						'contUnRead': 
						{
							'width': '150px',
							'height': '49px',
							'fontWeight': 'bold',
							'borderBottom': '1px solid #242424',
							'position': 'relative',
							'padding': '5px 5px 5px 25px',
							'background': '#292929'
						},
						'checkBox': 
						{
							'border': '1px solid #5b5e5e',
							'width': '10px',
							'height': '10px',
							'margin': '10px 0 0 5px'
						},
						'span': 
						{
							'width': '20px',
							'height': '59px',
							'position': 'absolute',
							'left': '2px',
							'top': 0,
							'borderBottom': '1px solid #292929',
							'cursor': 'pointer'
						}
					},
					'message': 
					{
						'subject': 
						{
							'color': '#6c6d6d',
							'fontSize': '18px',
							'fontWeight': 'bold',
							'padding': '13px 0 2px 0',
							'width': '100%',
							'height': '24px',
							'lineHeight': '24px',
							'borderBottom': '2px solid #3f3e3e',
							'margin': 0,
							'overflow': 'hidden',
							'textOverflow': 'ellipsis',
							'whiteSpace': 'nowrap'
						},
						'date': 
						{
							'fontSize': '12px',
							'color': '#6c6d6d',
							'position': 'absolute',
							'top': '5px',
							'right': '10px'
						},
						'from': 
						{
							'position': 'relative',
							'fontSize': '12px',
							'color': '#6c6d6d',
							'minHeight': '12px',
							'padding': '5px 5% 0 0',
							'margin': '0',
							'display': 'block',
							'whiteSpace': 'nowrap',
							'overflow': 'hidden',
							'maxWidth': '95%'
						},
						'expand':
						{
							'width': '5%',
							'height': '14px',
							'padding': 0,
							'lineHeight': '14px',
							'display': 'block',
							'position': 'absolute',
							'bottom': '2px',
							'background': '#292929',
							'right': 0,
							'cursor': 'pointer',
							'backgroundPosition': 'center',
							'backgroundRepeat': 'no-repeat',
							'opacity': 0.8,
							'over': {'opacity': 1},
							'out': {'opacity': 0.8}
						},
						
						'actionLink':
						{
							'display': 'inline-block',
							'verticalAlign': 'top',
							'color': '#b8b8b8',
							'cursor': 'pointer',
							'marginLeft': '20px',
							'opacity': 0.8,
							'over': {'opacity': 1},
							'out': {'opacity': 0.8}
						},
						
						'body': 
						{
							'fontSize': '14px',
							'color': '#848585',
							'marginTop': '30px',
							'paddingBottom': '20px',
							'borderBottom': '1px solid #3f3e3e'
						}
					},
					'link': 
					{
						'_12': 
						{
							'fontSize': '12px',
							'color': '#377395',
							'textDecoration': 'none',
							'cursor': 'pointer',
							'marginRight': '10px',
							'display': 'inline-block'
						},
						'_14': 
						{
							'fontSize': '14px',
							'color': '#377395',
							'textDecoration': 'none',
							'cursor': 'pointer'
						}
					},
					'searchResults':
					{
						'cont':
						{
							'border': '1px solid #1f1f1f',
							'background': '#266589',
							'position': 'absolute',
							'top': '37px',
							'left': '7px',
							'width': '112px',
							'display': 'none'
						},
						'li':
						{
							'main':
							{
								'margin': 0,
								'padding': 0
							},
							'sub':
							{
								'color': '#969696',
								'borderBottom': '#404040',
								'textIndent': '15px',
								'cursor': 'pointer',
								'over': {'background': '#377395', 'color': '#b4b4b4'},
								'out': {'background': 'transparent', 'color': '#969696'},
								'fontSize': '12px',
								'height': '19px',
								'lineHeight': '20px',
								'borderBottom': '1px solid #377395'
							}
						},
						'count':
						{
							'color': '#919090',
							'position': 'absolute',
							'fontSize': '12px',
							'right': '10px',
							'top': '2px'
						},
						'ul':
						{
							'listStyleType': 'none',
							'margin': 0,
							'padding': 0,
							'width': '100%'
						},
						'text':
						{
							'position': 'relative',
							'backgroundImage': '',
							'borderBottom': '1px solid rgba(0,0,0,0.30)',
							'height': '24px',
							'color': '#292929',
							'fontSize': '12px',
							'margin': 0,
							'padding': '0 5px',
							'lineHeight': '24px'
						}
					},
					'compose':
					{
						'window':
						{
							'background': '#292929',
							'width': '100%',
							'height': '471px',
							'paddingTop': '69px',
							'position': 'relative',
							'fontFamily': 'vrinda',
							'display': 'table'
						},
						'topBar':
						{
							
						},
						'leftBar':
						{
							'cont':
							{
								'minWidth': '256px',
								'position': 'relative',
								'background': '#3a3b3b',
								'height': '471px',
								'display': 'table-cell',
								'verticalAlign': 'top'
							},
							'recipients':
							{
								'toText':
								{
									'color': '#8d8c8c',
									'fontSize': '12px',
									'margin': '10px 0 5px 15px'
								},
								'main':
								{
									'position': 'relative',
									'border': '1px solid #1f1f1f',
									'background': '#323232',
									'width': '238px',
									'margin': '0 auto',
									'minHeight': '20px',
									'maxHeight': '180px'
								},
								'mask':
								{
									'position': 'relative',
									'overflow': 'hidden',
									'width': '100%',
									'height': '100%',
									'maxHeight': '180px'
								},
								'cont':
								{
									'padding': '5px 20px 0 5px',
									'position': 'absolute',
									'boxSizing': 'border-box',
									'MozBoxSizing': 'border-box',
									'width': '100%',
									'lineHeight': '10px'
								},
								'count':
								{
									'position': 'absolute',
									'bottom': 0,
									'left': 0,
									'padding': '5px 30px 5px 0',
									'color': '#999',
									'fontSize': '12px',
									'width': '100%',
									'boxSizing': 'border-box',
									'MozBoxSizing': 'border-box',
									'background': '#292929',
									'textAlign': 'right'
								},
								'scrollbar':
								{
									'cont':
									{
										'position': 'absolute',
										'top': 0,
										'right': 0,
										'width': '16px',
										'height': '100%',
										'maxHeight': '180px',
										'background': '#363636'
									},
									'bar':
									{
										'position': 'absolute',
										'top': '10px',
										'background': '#3d3d3d',
										'width': '16px',
										'over': {'background': '#424242'},
										'out': {'background': '#3d3d3d'},
										'down': {'background': '#707070'},
										'up': {'background': '#3d3d3d'}
									}
								},
								'recipient':
								{
									'cont':
									{
										'margin': '0 5px 5px 0',
										'background': '#266589',
										'color': '#bcbcbc',
										'fontSize': '12px',
										'height': '20px',
										'lineHeight': '20px',
										'padding': '0 20px 0 10px',
										'textOverflow': 'ellipsis',
										'maxWidth': '100%',
										'overflow': 'hidden',
										'display': 'inline-block',
										'position': 'relative'
									},
									'remove':
									{
										'position': 'absolute',
										'top': 0,
										'right': 0,
										'width': '15px',
										'height': '20px',
										'lineHeight': '20px',
										'color': '#bcbcbc',
										'over': {'background': '#377395'},
										'out': {'background': 'transparent'},
										'fontSize': '10px',
										'textAlign': 'center',
										'cursor': 'pointer'
									}
								},
								'textField':
								{
									'height': '15px',
									'lineHeight': '15px',
									'maxWidth': '100%',
									'minWidth': '20%',
									'width': '90%',
									'border': 'none',
									'background': 'transparent',
									'outline': 'none',
									'focus': {'outline': 'none', 'background': 'transparent'},
									'blur': {'outline': 'none', 'background': 'transparent'},
									'color': '#919191',
									'margin': 0,
									'padding': '0 5px 5px 0'
								},
								'textFieldCont':
								{
									'display': 'block',
									'margin': 0,
									'padding': 0,
									'lineHeight': '10px'
								},
								'searchBox':
								{
									'cont':
									{
										'border': '1px solid #1f1f1f',
										'background': '#323232',
										'position': 'absolute',
										'left': '7px',
										'width': '243px',
										'maxHeight': '244px',
										'display': 'none'
									},
									'mask':
									{
										'width': '227px',
										'height': '100%',
										'overflow': 'hidden',
										'position': 'relative'
									},
									'scrollbar':
									{
										'cont':
										{
											'position': 'absolute',
											'top': 0,
											'right': 0,
											'width': '16px',
											'height': '100%',
											'background': '#363636'
										},
										'bar':
										{
											'position': 'absolute',
											'top': '10px',
											'background': '#3d3d3d',
											'width': '16px',
											'over': {'background': '#424242'},
											'out': {'background': '#3d3d3d'},
											'down': {'background': '#707070'},
											'up': {'background': '#3d3d3d'}
										}
									},
									'itemsCont':
									{
										'width': '100%',
										'position': 'absolute',
										'top': 0,
										'zIndex': 12000
									},
									'item':
									{
										'cont':
										{
											'height': '48px',
											'borderBottom': '1px solid #3e3e3e',
											'color': '#8e8e8e',
											'background': 'transparent',
											'over': {'background': '#266589', 'color': '#bcbcbc'},
											'out': {'background': 'transparent', 'color': '#8e8e8e'}
										},
										'contSelected':
										{
											'height': '48px',
											'borderBottom': '1px solid #3e3e3e',
											'color': '#bcbcbc',
											'background': '#266589'
										},
										'text':
										{
											'fontSize': '14px',
											'textOverflow': 'ellipsis',
											'height': '15px',
											'lineHeight': '15px',
											'padding': '5px 10px 0 10px',
											'margin': 0
										}
									}
								}
							},
							'contacts':
							{
								'cont':
								{
									'position': 'absolute',
									'bottom': 0
								}
							},
							'tableOptions':
							{
								'button':
								{
									'height': '25px',
									'width': '40%',
									'margin': '50px 0 0 15px',
									'textAlign': 'center',
									'background': '#4e4e4e',
									'color': '#8b8b8b',
									'fontSize': '12px',
									'lineHeight': '25px',
									'over': {'background': '#266589', 'color': '#c2c2c2'},
									'out': {'background': '#4e4e4e', 'color': '#8b8b8b'},
									'cursor': 'pointer',
									'display': 'inline-block'
								},
								'inputCont':
								{
									'position': 'relative'
								},
								'input':
								{
									'width': '150px',
									'border': '1px solid #1f1f1f',
									'background': '#323232',
									'color': '#6c6d6d',
									'fontSize': '12px',
									'margin': '10px 15px 0 15px',
									'paddingLeft': '10px',
									'outline': 'none',
									'focus': {'outline': 'none'},
									'blur': {'outline': 'none'},
									'height': '23px',
									'lineHeigt': '25px'
								},
								'label':
								{
									'display': 'inline-block',
									'verticalAlign': 'top',
									'height': '25px',
									'marginTop': '10px',
									'lineHeight': '25px',
									'color': '#6c6d6d',
									'fontSize': '12px'
								},
								'span':
								{
									'position': 'absolute',
									'top': '-5px',
									'left': '25px',
									'height': '20px',
									'lineHeight': '20px',
									'color': '#6c6d6d',
									'width': '190px',
									'fontSize': '12px'
								},
								'checkbox':
								{
									'border': '1px solid #5b5e5e',
									'width': '10px',
									'height': '10px',
									'margin': '15px 0 0 15px',
									'cursor': 'pointer',
									'position': 'relative'
								}
							},
							'contacts':
							{
								'main':
								{
									'position': 'absolute',
									'bottom': '40px',
									'left': '16px',
									'color': '#999',
									'width': '230px'
								},
								'ul':
								{
									'main':
									{
										'listStyleType': 'none',
										'display': 'block',
										'margin': '0',
										'padding': '0',
										'color': '#a3a2a2'
									},
									'sub':
									{
										'listStyleType': 'none',
										'display': 'block',
										'margin': '0',
										'padding': '0',
										'color': '#808080'
									},
									'span':
									{
										'listStyleType': 'none',
										'display': 'block',
										'margin': '0',
										'padding': '0',
										'width': 'inherit',
										'color': '#808080',
										'position': 'absolute',
										'top': 0
									}
								},
								'li':
								{
									'main':
									{
										'fontSize': '24px',
										'width': '240px'
									},
									'sub':
									{
										'fontSize': '12px',
										'position': 'relative',
										'height': '20px',
										'over': {'color': '#a3a2a2'},
										'out': {'color': '#808080'}
									},
									'span':
									{
										'width': '100%',
										'paddingLeft': '10px',
										'boxSizing': 'border-box',
										'MoxBoxSizing': 'border-box',
										'borderBottom': '1px solid #464646',
										'fontSize': '12px',
										'height': '24px',
										'lineHeight': '24px',
										'over': {'background': '#434343', 'color': '#a3a2a2'},
										'out': {'background': 'transparent', 'color': '#808080'}
									}
								},
								'span':
								{
									'main':
									{
										'position': 'absolute',
										'display': 'none',
										'cursor': 'pointer',
										'right': '16px',
										'top': 0
									},
									'sub':
									{
										'position': 'absolute',
										'bottom': '20px',
										'left': '0',
										'display': 'none',
										'background': '#3a3b3b',
										'border': '2px solid #1c1c1c',
										'width': '100%',
										'boxSizing': 'border-box',
										'MoxBoxSizing': 'border-box',
										'maxHeight': '178px',
										'overflow': 'hidden'
									}
								},
								'select':
								{
									'position': 'relative',
									'height': '20px',
									'width': '120px',
									'marginLeft': '16px',
									'cursor': 'pointer'
								},
								'scrollbar':
								{
									'cont':
									{
										'position': 'absolute',
										'top': 0,
										'right': 0,
										'width': '16px',
										'height': '100%',
										'background': '#363636',
										'maxHeight': '178px',
										'opacity': 0.6
									},
									'bar':
									{
										'position': 'absolute',
										'top': '10px',
										'background': '#454545',
										'width': '16px',
										'over': {'background': '#555555'},
										'out': {'background': '#454545'},
										'down': {'background': '#707070'},
										'up': {'background': '#454545'}
									}
								}
							}
						},
						'rightBar':
						{
							'cont': 
							{
								'height': '471px',
								'display': 'table-cell',
								'verticalAlign': 'top',
								'position': 'relative',
								'width': '100%'
							},
							'msgMask': 
							{
								'overflow': 'hidden',
								'position': 'relative',
								'height': '471px',
								'width': 'inherit'					
							},
							'msgCont': 
							{
								'width': '100%',
								'position': 'absolute',
								'top': 0,
								'overflowX': 'hidden',
								'padding': '100px 30px 20px 20px',
								'boxSizing': 'border-box',
								'MozBoxSizing': 'border-box'
							},
							'msgHeader':
							{
								'position': 'absolute',
								'top': 0,
								'left': 0,
								'padding': '0 30px 0 14px',
								'boxSizing': 'border-box',
								'MozBoxSizing': 'border-box',
								'background': '#292929',
								'width': '100%'
							},
							'scrollBar': 
							{
								'cont': 
								{
									'width': '16px',
									'position': 'absolute',
									'background': '#333333',
									'height': '471px',
									'top': 0,
									'right': 0
								},
								'bar': 
								{
									'width': '16px',
									'background': '#3b3b3b',
									'position': 'absolute',
									'top': '10px',
									'over': {'background': '#424242'},
									'out': {'background': '#3b3b3b'},
									'down': {'background': '#707070'},
									'up': {'background': '#3d3d3d'},
									'pointer': 'cursor'
								}
							},
							'textField':
							{
								'color': '#6c6d6d',
								'fontSize': '17px',
								'fontWeight': 'bold',
								'width': '100%',
								'border': 'none',
								'borderBottom': '2px solid #3f3e3e',
								'margin': '0',
								'padding': '13px 0 2px 0',
								'outline': 'none',
								'background': 'transparent',
								'focus': {'outline': 'none'},
								'blur': {'outline': 'none'},
								'height': '24px',
								'lineHeigt': '24px'
							},
							'textArea':
							{
								'margin': 0,
								'padding': 0,
								'border': 'none',
								'width': '100%',
								'minHeight': '30px',
								'height': '100px',
								'cursor': 'text'
							},
							'expand':
							{
								'position': 'absolute',
								'top': '7px',
								'right': '27px',
								'backgroundPosition': 'center',
								'backgroundRepeat': 'no-repeat',
								'width': '30px',
								'height': '30px',
								'visibility': 'hidden',
								'opacity': 0.3,
								'cursor': 'pointer',
								'over': {'opacity': 0.5},
								'out': {'opacity': 0.3}
							},
							'toolbar':
							{
								'cont':
								{
									'height': '20px',
									'margin': '7px 0 10px 0'
								},
								'icon':
								{
									'display': 'inline-block',
									'verticalAlign': 'top',
									'cursor': 'pointer',
									'backgroundRepeat': 'no-repeat',
									'backgroundPosition': 'center',
									'width': '26px',
									'height': '20px',
									'opacity': 0.4,
									'over': {'opacity': 0.8},
									'out': {'opacity': 0.4}
								}
							},
							'origionalMsg':
							{
								'cont':
								{
									'width': '100%',
									'background': '#747474',
									'color': '#292929',
									'position': 'relative',
									'border': '1px solid #1d1d1d',
									'fontSize': '14px',
									'padding': '15px',
									'boxSizing': 'border-box',
									'MozBoxSizing': 'border-box',
									'margin': '10px 0',
									'userSelect': 'text',
									'MozUserSelect': 'text',
									'cursor': 'text',
									'lineHeight': '18px'
								},
								'close':
								{
									'width': '20px',
									'height': '20px',
									'position': 'absolute',
									'top': '3px',
									'right': '3px',
									'color': '#080808',
									'textAlign': 'center',
									'lineHeight': '20px',
									'fontSize': '12px',
									'fontWeight': 'bold',
									'cursor': 'pointer'
								},
								'date': 
								{
									'fontSize': '12px',
									'position': 'absolute',
									'top': '5px',
									'right': '12px',
									'margin': 0
								},
								'from': 
								{
									'position': 'relative',
									'fontSize': '14px',
									'paddingTop': '5px',
									'margin': '0 0 10px 0',
									'fontWeight': 'bold'
								}
							}
						}
					},
					'quote':
					{
						'border': '1px solid #5a5a5a',
						'background': '#303030',
						'padding': '10px',
						'box-sizing': 'border-box',
						'MozBoxSizing': 'border-box'
					},
					'notification':
					{
						'cont':
						{
							'background': '#292929',
							'width': '230px',
							'height': '73px',
							'border': '2px solid #8d8d8d',
							'position': 'absolute',
							'bottom': '30px',
							'right': '30px',
							'box-shadow': '5px 5px 25px rgba(0,0,0,0.7)',
							'padding': '10px',
							'color': '#9a9a9a',
							'fontSize': '12px',
							'fontFamily': 'vrinda',
							'zIndex': 1000				
						},
						'header':
						{
							'cont':
							{
								'marginBottom': '5px'
							},
							'mail':
							{
								'backgroundPosition': 'center left',
								'backgroundRepeat': 'no-repeat',
								'width': '40px',
								'height': '30px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'position': 'relative'
							},
							'text':
							{
								'display': 'inline-block',
								'verticalAlign': 'top',
								'textAlign': 'center',
								'margin': '0 0 0 5px',
								'width': '182px',
								'lineHeight': '30px',
								'height': '30px',
								'fontSize': '14px'
							},
							'textMultiple':
							{
								'display': 'inline-block',
								'verticalAlign': 'top',
								'textAlign': 'center',
								'margin': '0 0 0 5px',
								'width': '182px',
								'lineHeight': '15px',
								'height': '35px',
								'fontSize': '14px'
							},
							'type':
							{
								'backgroundPosition': 'center',
								'backgroundRepeat': 'no-repeat',
								'width': '12px',
								'height': '30px',
								'display': 'inline-block',
								'verticalAlign': 'top',
								'position': 'absolute',
								'top': 0,
								'left': '40px'
							}
						},
						'from':
						{
							'margin': 0,
							'padding': 0,
							'whiteSpace': 'nowrap',
							'overflow': 'hidden',
							'textOverflow': 'ellipsis'
						},
						'subject':
						{
							'margin': 0,
							'padding': 0,
							'whiteSpace': 'nowrap',
							'overflow': 'hidden',
							'textOverflow': 'ellipsis'
						},
						'remove':
						{
							'position': 'absolute',
							'top': '2px',
							'right': '2px',
							'width': '20px',
							'height': '20px',
							'lineHeight': '20px',
							'textAlign': 'center',
							'color': '#9a9a9a',
							'fontSize': '10px',
							'fontWeight': 'bold',
							'cursor': 'pointer'
						},
						'link':
						{
							'fontSize': '12px',
							'color': '#377395',
							'textDecoration': 'none',
							'cursor': 'pointer',
							'marginRight': '10px'
						},
						'button':
						{
							'position': 'absolute',
							'bottom': '10px',
							'width': '100px',
							'height': '25px',
							'textAlign': 'center',
							'background': '#4e4e4e',
							'color': '#8b8b8b',
							'fontSize': '12px',
							'lineHeight': '25px',
							'over': {'background': '#266589', 'color': '#c2c2c2'},
							'out': {'background': '#4e4e4e', 'color': '#8b8b8b'},
							'cursor': 'pointer'
						}
					},
					'confirm':
					{
						'wrapper':
						{
							'position': 'absolute',
							'top': 0,
							'left': 0,
							'width': '100%',
							'height': '100%',
							'background': '#000',
							'opacity': 0.2,
							'zIndex': 20000
						},
						'cont':
						{
							'position': 'absolute',
							'top': '80px',
							'right': '40px',
							'background': '#292929',
							'border': '2px solid #181818',
							'width': '359px',
							'padding': '20px 10px 10px 10px',
							'zIndex': 25000
						},
						'input':
						{
							'width': '100%',
							'border': '1px solid #1f1f1f',
							'background': '#323232',
							'color': '#6c6d6d',
							'fontSize': '12px',
							'padding': '2px 10px',
							'margin': '0 0 10px 0',
							'outline': 'none',
							'focus': {'outline': 'none'},
							'blur': {'outline': 'none'},
							'height': '29px',
							'lineHeigt': '29px',
							'boxSizing': 'border-box',
							'MozBoxSizing': 'border-box'
						},
						'select':
						{
							'width': '150px',
							'border': '1px solid #1f1f1f',
							'background': '#323232',
							'color': '#6c6d6d',
							'fontSize': '12px',
							'padding': '2px 10px',
							'margin': '0 0 10px 0',
							'height': '21px',
							'lineHeigt': '21px',
							'display': 'inline-block',
							'position': 'relative',
							'verticalAlign': 'top',
							'textAlign': 'left'
						},
						'button':
						{
							'height': '25px',
							'width': '100px',
							'display': 'inline-block',
							'textAlign': 'center',
							'background': '#4e4e4e',
							'color': '#8b8b8b',
							'fontSize': '12px',
							'lineHeight': '25px',
							'over': {'background': '#266589', 'color': '#c2c2c2'},
							'out': {'background': '#4e4e4e', 'color': '#8b8b8b'},
							'cursor': 'pointer',
							'margin': '0 5px'
						},
						'subCont':
						{
							'margin': '0 0 5px 0',
							'padding': 0,
							'height': '25px',
							'lineHeight': '25px',
							'font-size': '14px',
							'color': '#6f6f6f',
							'textAlign': 'center'
						},
						'list':
						{
							'cont':
							{
								'position': 'absolute',
								'top': '28px',
								'left': 0,
								'display': 'none',
								'background': '#323232',
								'border': '1px solid #1c1c1c',
								'width': '100%',
								'boxSizing': 'border-box',
								'MoxBoxSizing': 'border-box'
							},
							'ul':
							{
								'listStyleType': 'none',
								'display': 'block',
								'margin': '0',
								'padding': '0',
								'width': 'inherit',
								'color': '#808080'
							},
							'li':
							{
								'width': '100%',
								'paddingLeft': '10px',
								'boxSizing': 'border-box',
								'MoxBoxSizing': 'border-box',
								'borderBottom': '1px solid #464646',
								'fontSize': '12px',
								'height': '24px',
								'lineHeight': '24px',
								'over': {'background': '#434343', 'color': '#a3a2a2'},
								'out': {'background': 'transparent', 'color': '#808080'}
							}
						}
					}
				},
				
				res:
				{
					'controls':
					{
						'next': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAXUlEQVQYV2Oct3DhBsZ//xISExM/MOABjPMXLvzP8P//AyAGqk08gEstRCECNCTGxzdiU4yukAGoa2FSfHwCumJ0hY1AExtwmgg05SHUQ7jdSLSv8QUJshwj1RUCALdQMQvYKq1HAAAAAElFTkSuQmCC',
						'previous': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAZUlEQVQYV2NkwALmz58vwMDIOD8xISEQJs2Irg6oyAGkCIgVEuPj4fIoCucvXNgA1FgP04xV4byFCxcAdcUj20CZiTCTQG78z8QEMl0ep4lIigVAipPi4wNw+hpbcIHEMIKHYoUATvMeC0yTB00AAAAASUVORK5CYII=',
						'first': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAd0lEQVQYV2Ocv3DhfwYg+PfnD19ycvJnEHv+/PkCDIyM8xMTEgJBfBBgRFcIVOQAUgTEConx8YxYFTKxsBQDJephktgV/v+/lImRMRqmCERTaCLUMyA3/mdiWgB0nDxOE5F9DVKcFB8fAPcMspvwseHeJ6SBaIUAZidKC2YCLWUAAAAASUVORK5CYII=',
						'last': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAdElEQVQYV2Oct3DhBsZ//xISExM/MADB3LlzeZlYWD6B2Inx8YwgGgQY5y9c+J/h//8HQAxUm3gAv0KYNgaGhn9//vThNhGhkOHf//9LmRgZo7FbjVDYCDSxF6eJ/xkYHkI9hNuNRPsayXl4mfBwIqSBaIUAjElLC7H537YAAAAASUVORK5CYII='
					},
					'tools':
					{
						'bold': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAjElEQVQ4jeXSIQoCURCA4QWrYLJ6AMEqWD2DN/AYJu+xySSYBG9gtQqCYLIKewDhs0xYlo3zBPGHgceUD4ZXVX8balw6s8M0Gzrr74VJNtTEe4AlnoGti0Ct3b44hBUa3DHMhro9vv0Z5tlQ+3QjbAI7FoNiNw7oVhraBnTKhvp6Y1ESuuKAWRryU30AvDon2Jg0sc0AAAAASUVORK5CYII=)',
						'italic': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAbElEQVQ4jc3SsQmDUABFUSshrZWQDQIOIKQSskoqIasEUrmKYBVwEsEqM5w02UD+I3eB09yq+udQo0tAPdYEdMeUgJ54JKAZtwS04VwaafApivygK94JKHbcC2MCWjAkoB1taSR23AmX4tCRvtMVYAewYq2yAAAAAElFTkSuQmCC)',
						'underline': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAjElEQVQ4je3TsQkCQRBG4QNBuMgabMJW7OBSwcgChIss4DoQTO3ASDC1BlMjo4PPwAEvWRB2OQzuRcP+MI8ZZqvqn8ATbSLb+bCYRJNodFFdQvRAl8ha9NmSaHbBNZGdcS8l2sZ6DpgP3hv02JcSzXD05YZX1KehvJRwiXVMtsGqqGAU4rR/Jf8v5fIG4y4UzcoLKWQAAAAASUVORK5CYII=)',
						'strikeThrough': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAABYUlEQVQ4T72UMUtDMRRGm0UoOAlO7VIRBLcurt1EsEsF0VFQBKe6Ci6CP8BJcSgUXBwEQdxEUBycBBdFJ0EQpEPBVSjP80keaA25QUoDhwe5r995N0njCkMaLsWTZdkI723ADEzBO5xByznXS8kwRUjGCLqECpzCJ2iuARdQT5GliHYJW4Uqgerke/AB6u4G1pg/srpKESnsjrDN/jBkx5qjtjwIkZatS9hiQFRibpTa8yBE64QcwhYcEPphhYbq5tL5/djj2QRJ2nANtz/3zJIHRax9Zv0wVucD/uQmdRTYm0nm5mAHXsmtWh8WFdHYOAH6v5wQ1g0I55k7hwnqL9EuY0Uv6vDOLEH6c/4a1KeZeIAy9bd/i/xBeOKp47vQfwMg0iFZ8qLoVWTuEWE1gq78SWvxfIQi6LZYAd0Mmo8OU+S7kmwftFT50FJtI2lbEtWTRHkQ3akTyXoI7lME+Ttfa410ERQq4hEAAAAASUVORK5CYII=)',
						'quote': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAyElEQVQ4T2NkoBNgxGXP////tYByE4BYiEi3vAOqK2BkZLyGTT1Wi4CWMAMV3wZiRSItgSm7D2SoAi37i64Pl0X2QIUHSLQEptwBaNFBYi2KAipcSqZF0UCLlo1aRE7ojfCgMwOG2Ulywg2oxxyY6k4RlepAioCZdheQciXRst1AS9yILhmgFnEC6XwiSodkoJqtQHwciCcCLfpOkkXE+AToawmguu1AbIKt2EE2A2ehSqRFoKD9DrTkCCH1lFokDbTkKSFLQPIAtAVOEc/UEFUAAAAASUVORK5CYII=)',
						'player': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAoUlEQVQ4jc3PsQpBYQCG4VMmk9XkJpTJBSjX4AJMymo6ZTIppUzuQLkMk9WkTCYXoNRjIcrf4fSfv7wX8D19WfaPoYERJminQpo4e3VDPwWU+2yXAloHoFMKqBeA5pVDD2z+hhxQT4FMA4+2qFWJjAPIs2VVSAvXAggGVUCLLwgcYpEaLj9A0I2BOj8ikMdAwxLQJgaalYD2MdCqBHQs2roDRL7rpNTLvRUAAAAASUVORK5CYII=)',
						'alliance': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAABGklEQVQ4jc3U0UdDYRjH8RGxq66ivyEiRv9EtxG7jRGxq4gRIyJijIjoPxgR3XYVY3Q1RoyuInYVMcani206PXsdOxT9rs55/J7f93nf876nVPqPwhrqaKDyV5ANvPnWBLu/FVzHKXbQtKhu9BWFbOIjE9jHbQL0ilao1YqArkPzBNUEqIWnCC8CaiRCj8P0A1QSvscioDIeMs1dXCZC71DLvL9gqwhoH++z5r70QZjrCu3Z8ycusLoM5DAEHWCcA4IjjMJKV/Ig26Yffq5eZto8DXAeavU8UCeYT8KkeYo7MUI5BVkPq0k156np558DqinQXjCNTW/8surgPtRuUqCzYBqanqBl9WzxovdSoGhKNeZpaPFADOf5X3Iixhnv5aZoAAAAAElFTkSuQmCC)',
						'coords': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAA00lEQVQ4jc3SIQoCQRTG8YVNWz2AYDIJpk0eYGGryQMIgrDJKphMgskDmASrJzGZBGFBEASTICz8DY7weDiLzkzwi/Ox78fOvCj6twApsAPOvHICtkA7JDIDKj7nDgxDIIUYegFSc54BD9HlPkgCXMWwQvVL0R18oFxdk4YWqu+4QhM16Ai0TNcFbqrvu0IjywKUlnO3dwJ6loG2NF0hvQx12TshAtMPbsvYF2p88VclkHhBBhvUIBWQeSMCW1mgaTDEQDGwVsgGiINCAnwvx/yX757Sbx5xpkiHLQAAAABJRU5ErkJggg==)',
						'table': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAgUlEQVQ4je3RIQ6DQBRFUSyKBIvForqnJii2UlvFhpqQsIbaWuzBjJ0MM2JSwUuee/k3P7dpIkGLR2bb2L1oMMnP9NegEQc2fBLdwnbMBgXYju7CrsNeBKkGwoAfVrwTXcN2KAH1+GLBM9ElbPvSr25Ht6OKoNqOXpgvOJrDNuroBLUtQ3//HcJ5AAAAAElFTkSuQmCC)',
						'insertunorderedList': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAO0lEQVQ4jWNgGEjw//9/g////z/4//+/Aa0tevAfAh4giRENSLEIw0c0sWj4gdHEMJoY4GA0MYzMxAAA6QxndHKcgPEAAAAASUVORK5CYII=)',
						'insertorderedList': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAcElEQVQ4je3SMQ2AQAxG4UpBAhKQgDSkIOEkIAEJOPhYbrgQBiCUiTe2aV7b/BEnYIGz3qugP4rc4K4sX/R4ux+s9XNLtqjDgLWppYRhqFeN2SJVVC4P/UREoGD7KnUFc1NLCUOHqR3KEpWautdetwOK5H3Pn7B4CQAAAABJRU5ErkJggg==)',
						'indent': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAUUlEQVQ4jdWRwQkAIAwD3X+KbBq/UiIF20p7z2A8jGt1hYLZohJI4peIVqamC095dCGyuOjSh1sMvKRWJIQQWfxvzKUQWboI7qHxpE7WQvTKBmYgK+hcRGVIAAAAAElFTkSuQmCC)',
						'outdent': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAS0lEQVQ4jWNgGEzgPxYwtC0aVOD///8LyNFEEKBbQlZwkmIRzBKaxhuyJTRNKFSziG5BR4xFyJaRbRGJjlpAF4uoAuiSsuhqETUAAAP+K+ha7EZ4AAAAAElFTkSuQmCC)',
						'justifyleft': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAALElEQVQ4jWNgGEjwn0Iw+CwafoBuQTUaJ2QDUoOO7KCkm0XDD9AtqIZ0nAAA5z6+ULjEuxYAAAAASUVORK5CYII=)',
						'justifycenter': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAALElEQVQ4jWNgGEjwn0Iw+Cwa3oBuwTUaLyQB8hI1GcFIN4uGN6BbcA25eAEAdxKecO5FA68AAAAASUVORK5CYII=)',
						'justifyright': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAALElEQVQ4jWNgGEjwn0Iw+Cwa/oBuQTcaR0QDUoOK7KCjm0XDH9At6IZUHAEA8oq+UNVXS0cAAAAASUVORK5CYII=)',
						'link': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAiElEQVQ4je2S3Q2AIAyEHcFRGIERGIERHIERGMURGMUR3ODzwWoqIUZ8MJhwSV96lOvPDUPHbwEEIGXhFG8KfHgjAjADFvDAIjkLjMAq4SU3C/9cTD5IVd3tdQlYawrOztR0d7i8bVLos9UdU0Q59KSOPwJO+EWZIVabQYnl9jWKdwW+TqSjKWyaolPi2Vd/5AAAAABJRU5ErkJggg==)'
					},
					'mail': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAYCAYAAAEKfQTmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\/w\/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\/g88wAAKCRFRHgg\/P9eM4Ors7ONo62Dl8t6r8G\/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\/qIl7gRoXgugdfeLZrIPQLUAoOnaV\/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\/AV\/1s+X48\/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\/LcL\/\/wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\/+8\/\/UegJQCAZkmScQAAXkQkLlTKsz\/HCAAARKCBKrBBG\/TBGCzABhzBBdzBC\/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\/pH5Z\/YkGWcNMw09DpFGgsV\/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\/1U\/W36p\/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\/MN8C3yLfLT8Nvnl+F30N\/I\/9k\/3r\/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\/zYnKOZarnivN7cyzytuQN5zvn\/\/tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\/0HIw6217nU1R3SPVRSj9Yr60cOxx++\/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3\/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\/1tWeOT3dvfN6b\/fF9\/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\/cGhYPP\/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\/6i\/suuFxYvfvjV69fO0ZjRoZfyl5O\/bXyl\/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\/2j5sfVT0Kf7kxmTk\/8EA5jz\/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\/wAAgOkAAHUwAADqYAAAOpgAABdvkl\/FRgAAButJREFUeNpifPr0KYO0tHQmAxJgZGBgMDx69OhRVlZWTpggCwMDA8OpU6duS0lJ6cEEAQAAAP\/\/YmRgYEDR+v\/\/\/+ksp06dmgYT+P79+ydGRsbzLPfv34erev369XMGBgYGAAAAAP\/\/YmBgYDAMDAxsv3Hjxn9s2MnJqYGBgcGCkYGBwXDXrl3nYLpOnjy5hYODg1NfX98ZJubm5mbJzMDAIHn+\/PlnGhoajh8\/fmTg4eFR4+DgUPr48SPDx48fGbq7u1uePXt2GwAAAP\/\/dI0xCsIwAEV\/VQISyNTSpkMRuhQPIHToATxAzyHewNMIHXubLAVRawYzfQhkKXXRpeCDzxv+8CIARwA7\/OcZGWNma+2gtS6Xr3PuHsdxsSIJKWVZ1\/WJJH5rmuYshChIYt227SWEgGmaHuM43rIs2\/d9f03TdFtV1SGEgKjrutl7\/5ZSJsscyZdSKt+QBIDk6yU5SXwAAAD\/\/5xSsUqFUAA999HkUPBwfIu4C28QkeAiRE4RtDSFm9APtAvOfURORrTcFqHJC8JtuYSDo4tIaos83nCRwKYeEUHxDpzlcM4ZDocAOAJwXNf1EyFkgT1gGMY5gJwAWJdlKQGgqipRFMVrGIbXfxWkaXpnmubKtu0TALAsyyUA1pxz+dNMKT3Nsuxe07Tll6aU2vi+f8Y557\/43QUAjOO4o5Typeu6DWPseZqmZdu275TSoGmaN6XUIWOMD8OwFULw77nd65MkkfM8f+R5nnqed\/XfrYQQD47jXBBCDoIgcAmAla7rl1EU3WJPxHF80\/f94yep5A+aRhxH8ef5Kx50kkxdup2DU6losMQ\/4KJEKUW4TWg4XKQ1oi3kpHCWDieJWBJKb3FxchLCUUodNGbRrZTeIG51c+ns\/X73u9qhWKQtJbZf+CwP3uPB+3oA3AVwiP+7DySZTD6WZfleJpN59C8J4\/H4fafT2RPy+fz9cDgcz2azJ5RS7IIsyy+CwWBIUZQDwjmHz+fb6\/V6zWg0ejwcDk8JIb6\/tXBd14nFYrXJZHIBAJxzEMdxYNs2AGAwGJwbhvE2kUiEAoHA\/p9CFovFZ9M0r0aj0cXGxxiDwBiDbds\/KRQKJcaYoGlac1u3bRutVuv1crn8WiwWj7d1xhiETaNtptPpp0ql8iwej2c3WiqVeqIoytPZbPZltVp9+y3o10blcrmey+WKlFJimuY7TdNeqaqq9fv9N5RSkk6nj+r1+sttj+M48NRqtctIJPIQAFRVPdF1vXmT2avV6vN2u30GAJZlDQTOOSil6Ha7541Go3nT6XVdPzMM45RS+qNRqVS6FEVRlCTpgBBye5dn5Jyv5vP5tSAIHq\/f738gSVJIFMU7rutiF9br9S2v10ssy\/r4XYwMDAysEhIS2StWrEhUVlbWYxgg8Pjx4+txcXHz7ty5M5mZgYFBv6urK0FQUFA4JCSk+969e1cNDQ21GRkZ2Un1Lan4+\/fvXydMmDCroKBgubu7u6apqanEhg0bbrIwMDAw\/P79m0FSUlJn06ZN3X\/\/\/v29cePG1U1NTcdmzZoVCCv2qQkuXbp0JDU1dVV2drZ+ampqamZmJjsDAwPD8+fPd8JbKchFAQMDA6unp2eUp6dn1Lt3754kJSXVsrCwMDU2NqYLCgpKkeuQz58\/v25vb5\/5\/Pnzbx0dHckHDx6El0V\/\/vyBFycojvr58yeGQdzc3DL9\/f3N0FbNjrKysraysjIrT0\/PMCYmJhZCDvn\/\/\/+\/AwcObKyurp7d3t6eXldXVwWr8bHZ9\/v3bwZcIYUV6OjoOLu5uV369+8fS1dX14QLFy68bG1tTZSWltZCV\/vq1au7dXV1s5WUlATMzc3VnZycrIyNjd1+\/vyJtwmCElKw4g4XOHbs2MYzZ87czM7OLmRmZma1tbWFlejnQ0NDC52dnZXCw8OjN2\/evGb9+vVXW1tboyZMmAAv6czMzHynTJkyUUVFRdrFxSWCaEd9\/\/6dAYuPbzY0NMzq6OgoNjQ09IdpggExMTHDWbNmGf79+\/f35cuXD3h5ecX7+vqyQ9vGyEpZ4uPjiz9\/\/vw8NTW1tKqqKlFCQkILl6OYkNMUDH\/9+vV7c3Nz\/ZMnTx719\/f3srOzS+Erjv\/8+cOqpqbm+ufPH3Z86tjY2CS7u7u737x586a+vr728+fPX5DlMdMUNOEdOnRoyYsXL97m5uXVMjIysvzAkiApBbJycnaFRUU2mzZtmsXBwcHu4uqayMDAwPAL3VGPHj68NGPGjMVlZWVl5mZmor9o4Bg0wOTq6prx8+fPD7U1NWWJiYnhv6HRxzhx4kSG\/Px8GQYGBnYGBgZtBgYG6QGoZV4xMDBcZWBg+Pn\/\/\/\/7gAEAb05N4qKYeo4AAAAASUVORK5CYII=",
					'compose': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAAHeTXxYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDA5QkJFRjAyMUM4MTFFM0FFNDdDRTZFMkNGQ0U4QjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDA5QkJFRjEyMUM4MTFFM0FFNDdDRTZFMkNGQ0U4QjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMDlCQkVFRTIxQzgxMUUzQUU0N0NFNkUyQ0ZDRThCNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMDlCQkVFRjIxQzgxMUUzQUU0N0NFNkUyQ0ZDRThCNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PiCpd68AAAM7SURBVHjaYjx16hQDCJiamoJpJgYkcPr06aUgAU4ksUCQwHcgXgSUfQvUxgUQQAwgM4A47f\/\/\/3D9XRiGwTh3QARAADFC7f0AxAIw+4EGrgbSoSCVFVCJNCD+BpRIA0kA6WMwnauBOBTZ5SAAEEAwSRAwBmIDoORcEIcFKgjyyVkoBtmnC7JrO9RHcADUdRlmlBYQ2yBJzAIZ5QfEm4D4GnrQHWdAA0A7boMkXkP5\/4H4IVDQDKhLFSCAkJ0LAiuAmB+Io4H4HVQsCoiXArEwUMM7ZD+CBFPQXY4eIECbLgH5eiAnWAJxFhYNH7AYoAfU+AfkU10kT4kCsRyUzQwKYaAimIazUPHXMOeBPMqIxSYBNOeBwvYXLHoYoTYuAmJDqJgAmuJFQAOUQHyAAEIPPRhIhjrvLJKz4IAFiS0ExG+hwT0XJga0BZQePgI1R6AnXZDTZkKduQzJoHdAxZ5AOhGo+QO6pqWwhIoNADWCokMSlNNgmkCe18OidgsWjUIwTVEMxIMIUEiCAgI5+NKQ2KBIToNG7jKgTV+A+CNMkyKSQuTg\/YjE\/4UcOCzQVI1TE1qKAGWuxSA\/OSBnPQJgIyhAYH66B8RKaAp80HIlqPwQQ44nJahGrDYCNZwHUk1AW16jJyOQRjNoUvoCzeqgrLEYqNgQ2RCAAMOVYJFLrHwg9oZG7AsgfgqVkwZiCWixsBWIJ2JL3NgSOQyAyrGNUBfmAnEcPpfAYgQU51Cv8wCxP1D8Gi4fgUqHY0B8AV96x1dWoUWOARBbwcIbFkmgcH4FymlEWPIBPc9gsTwUatYrUJEMswhUSRwA4iAgPsJAJQC07AjUzANAyzhBFsVCI3k9A5UB0LL1ULNjWaCp6R0WdZlAPA2HGd7QQpwBVspDgTzQ8EdoakFmC4ESgw006ASgKY2BiDg6Asud2BIDUqLggap3YIJqWgNtBlAbgMxcA4ovWD6KgNbNoHxgha3KRQILYE0cPD7hhGaVm7BKBjnDRkArmudAvBuaUbFZWEDAAlA14grEtqDWDKEiSAhas4UA8Q6oL3ZAy2dkACrHPYA4AUqDoiAd1jIhpaxDL\/eMoZU2CPzFVXljAwBsiybgUCzWVAAAAABJRU5ErkJggg==",
					'sendMail': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAAHeTXxYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkJBMDU2QjAyMUM4MTFFMzhENTM5NzJBMTI2OEM2QjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkJBMDU2QjEyMUM4MTFFMzhENTM5NzJBMTI2OEM2QjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQkEwNTZBRTIxQzgxMUUzOEQ1Mzk3MkExMjY4QzZCNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQkEwNTZBRjIxQzgxMUUzOEQ1Mzk3MkExMjY4QzZCNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PspK+6wAAANsSURBVHjaYjx16hQDCJiamoJpJgYkcPr06aUgAU4ksUCQwHcgXgSUfQvUxgUQQAwgM4A47f\/\/\/3D9lsiGaSFzmEEEQAAxQu39AMQCMPuBBq4G0qEsQH4FTALqjv9ACUYgfQymczUQhyK7HAQAAggmCQLGQGwAlJwL4rBABUE+OQvFIGN1Qa7aDvWRGUwrUNdlkIQnlH8KOVBAEn5IfDlkieNIEo+gdtwGSbyGCv4H4odAQTOgHaoAAYTsXBBYAcT8QBwNxO+gYlFAvBSIhYEa3iH7ESSYAnU5CkAOEKBNl4B8PSZolGRh0cADchKaAXpAjX9AmnSB+CMDJvgCxOuBimLRxF\/DnAfyKCOSBMgfy7A4zwZI\/YJFDyPUxkVAbAjTgKZ4EdAAJRAfIIDQQw8GkqGJ7CxQ4Vl0SRYkthAQv4UG91yYGNAWUHr4CNQcgRyzDFCnzYQ6E9lp74CKQWklEaj5A7qmpbCEig0ANYKiQxKU02CaQJ7XQ1P3HIjZsGgUgmmKwmK4JBBvhDobGUSAQpIJPV0jAZBfvIGKKpBsAyUCG1DoKTLgBnXg8gAVvGOCpmp0IAHE54GYCy2SQZlrMUiTA8hKNE1O0JSBDjaCAoQF6qd7QKyEJLkMXTWopAFSYsjxpATVaIPNY0ANIKc2AW15jZ6MlKBFx1totgApMAZqWAxUjOJUgADDlWCRS6x8UNBDI\/YFED+FyklDAwxUBGwF4onYEje2RM6AVAZvhLowF4jj8LkElkdBCQXqdVAp4Q8Uv4bLR6JAfAyIL+BL7\/jKKrTIMQBiK1h4wyIJFM6vQDkNhyWgfA8qkkKItDwUatYrUJEMswhUSRwA4iAgPoJD719QIoUmt0tAfBIaP\/gsOwI18wDQMk4mqEtBkbyeCMc+gpYKtkDcDsSfgYZ447FsPdTsWCZoanrHQBr4BQ2aSlDCAVrWjkctyGwhFmhwtUBTyxciLOGElnc20NTFgksh0AE80ERRwAS1aA20GYAP6EIrt0XQJC+Jp9iDAZCZa0DxBXNNBLRuBuUDK2xVLhBcBmJ5YsIVFPnQrHITVskgezsC6mpQkb8b6urvpEQc1AKQj11BCQbUmiFUBAlBazZQvtkBxAugNHrVDyrHPYA4AUqDoiAd1jIhpaxDL\/eMYS1DaN46i698QwYA7ichDuh2+qMAAAAASUVORK5CYII=",
					'expand': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAAG3oLd4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENBNTNFOTYyMUM5MTFFMzgxQ0U4NURBODIyODZFQjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENBNTNFOTcyMUM5MTFFMzgxQ0U4NURBODIyODZFQjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0E1M0U5NDIxQzkxMUUzODFDRTg1REE4MjI4NkVCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0E1M0U5NTIxQzkxMUUzODFDRTg1REE4MjI4NkVCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PkXCZdMAAAB7SURBVHjaYrhy5UoUQAAxAIk6gABiBBJODAwMpQABBOIxMAFZiwACCCTEA2R8BmIrFiDxBYjFgPg1QACBZHSBjMsgdQlA\/BDEyARiNpA6LiBmAAgwkJocIN0IxBFAnAzE9iBZkJHdQCwNxBNBNEiwA4jNgHg7EG8CYmcAZrIfR0hmuRcAAAAASUVORK5CYII=",
					'collapse': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAAG3oLd4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjJFQkEwM0YyMUM5MTFFMzgwM0JDNkQ5QzlCNjQ3MUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjJFQkEwNDAyMUM5MTFFMzgwM0JDNkQ5QzlCNjQ3MUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMkVCQTAzRDIxQzkxMUUzODAzQkM2RDlDOUI2NDcxQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMkVCQTAzRTIxQzkxMUUzODAzQkM2RDlDOUI2NDcxQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/Pi65wUkAAAB0SURBVHjaYrhy5QoDQAAxgAiAAGIEEjwMDAxaAAEE4okyAVmvAAIIJOQEZKQBMT9IRAKII4D4FEAAMYK1AQELEH8D4o8g6elA\/AvEWADE8gABBlNjBsTbgXgTEKeD1FcwQEAxEN8E4sMgLV+gEk+BuAiIpQHP\/SBDZEL2QgAAAABJRU5ErkJggg==",
					'drop': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAKCAYAAAEle4U0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM5REMxOTYyMUM3MTFFM0JBODRGNUVCNzE5NTlBMUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM5REMxOTcyMUM3MTFFM0JBODRGNUVCNzE5NTlBMUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMzlEQzE5NDIxQzcxMUUzQkE4NEY1RUI3MTk1OUExRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMzlEQzE5NTIxQzcxMUUzQkE4NEY1RUI3MTk1OUExRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/Phn5Ps0AAADuSURBVHjaYjh16pTx\/\/\/\/GUCYhQEITp8+DaIYAAKIESQCAkxQUX6AAGKAqQXS3kAMotsBAgiuDAbgAkAt34DURxYkSS4QARBAjCBzTE1Nz8JEgSpVgNQdJIWWTAyYAKSgHYhB5q8D4uMAAQRywTuY67FhFnQjgFaJAqnXUC4bNmteAXEUyA1A\/JMFiwKQ2B8omxebgr8gX8I4AAEGDjZCDiWEsdmC7jFvIDUNiP2B+AKSlDQ0uPYxMRAGR4D4GhCfh4bzalAgAPETIOYE4rnEGPIRiD2hYRAKxCCXNUH5eqCIJOgdYPJA5q6BYhQAAIt8mGSW9QmrAAAAAElFTkSuQmCC",
					'expandDocument': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAAEhyb7BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkMwNUExQzUyRUU4MTFFMzg3NTJCREMxQTk3RTE1MDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkMwNUExQzYyRUU4MTFFMzg3NTJCREMxQTk3RTE1MDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQzA1QTFDMzJFRTgxMUUzODc1MkJEQzFBOTdFMTUwNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQzA1QTFDNDJFRTgxMUUzODc1MkJEQzFBOTdFMTUwNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PgfANO8AAADLSURBVHjaYvz\/\/z8DEIAJJiCeCcSMIA4jsgxAAME5TFARRiaouv8AAQSTQgZgZRgAIIBQTAQBFmRJmAP+wzgwAUZkM2Ba4GYABBC69f\/RdSA7ZzKyZfich1UBskmM6O5ABgABhM1NGAA9iD5CTUXGDEwMRACiHf4fn3tg1k3BF0awKMgF4hfEuAkGPgCxALqbiAongADDlr4YCHmEHIM+YnEidgtBBiHhCWh8YjAYwDgz\/yMA2QYhG\/KfDAMxFLdT4iKqBTbdDCIaAAAnZT5x4V7D2wAAAABJRU5ErkJggg==",
					'contractDocument': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAAEhyb7BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUNCOUQ5OUYyRUU4MTFFM0I1MkY5QTdFQTI4NzY0REMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUNCOUQ5QTAyRUU4MTFFM0I1MkY5QTdFQTI4NzY0REMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQ0I5RDk5RDJFRTgxMUUzQjUyRjlBN0VBMjg3NjREQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0I5RDk5RTJFRTgxMUUzQjUyRjlBN0VBMjg3NjREQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PgMVm38AAADUSURBVHjaYvwPBAxQwATEjFDMwALEcBmAAGKEKWOCCcAY\/wECCCbFyIAA\/2EmVSMJMgAEECOyXTArkLWBTf+PbC+GChRXgQBAAMEMNWHADc4gG4PuVhTLkcFkbIpYkExgxGUfQABheBSXSQyEHI4tcNEBPLBxOhrZOpi7OIE4BZvDGQiE03\/kcMLpLib0eCLGTVgBQIARFZjEABZi3E0A\/MfIJoTCHb9xQJ+hYRiYiUUOp3psBvwn0TAMg5Al2ol0Ddwg5HzKSEmgMzFQCbCgRyO5AABZbenazpGa4wAAAABJRU5ErkJggg==",
					'arrowLeft': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAAE8d1zJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0NDMTZCMEQyRTAxMTFFM0FCOUVDMjExNEU2NDMwOTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0NDMTZCMEUyRTAxMTFFM0FCOUVDMjExNEU2NDMwOTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQ0MxNkIwQjJFMDExMUUzQUI5RUMyMTE0RTY0MzA5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQ0MxNkIwQzJFMDExMUUzQUI5RUMyMTE0RTY0MzA5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PgV0+agAAADOSURBVHjaYlyxYgUDCDAxQAFAADGAREC8RoAAYoTK\/QcRAAEE40gA8QuQ9BMgfg6SBXFkoHoZAQIIpgwE6kCGgARBHBao4HOoGXCDYRZLQlXKQGlGgABCNgoEVID4DqpTGRj+ALE6jAOSsIGaywzEW6DsDyAJNgYsACSxD8l1PlDLBWB2\/IUK3IHpAAgwdFfBgBMQLwXiFCDeiizBgsQWhSpyRRLbgmbQR5AGXSA+g8vR2DxxGYjZoaG4jxgNMPACiJ2hnnQD4tdIoQDDAgDdNimjM3GYdAAAAABJRU5ErkJggg==",
					'arrowRight': "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAAE8d1zJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTEyMTUyQkMyRTAxMTFFMzk2OThFRTA1MDBFRkVGQkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTEyMTUyQkQyRTAxMTFFMzk2OThFRTA1MDBFRkVGQkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMTIxNTJCQTJFMDExMUUzOTY5OEVFMDUwMEVGRUZCRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMTIxNTJCQjJFMDExMUUzOTY5OEVFMDUwMEVGRUZCRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PhpmJE8AAADMSURBVHjaYlyxYgUDCDAxQAAzQAAxAEVUQDx1gABiBLI+ABn8IHGAAGKEKYQp\/g\/FNiAOI1TiCEAAISvzBuKNQMzCACXghkEBSLszSEIAKqAOxDdhsgABhGyUBBC\/QLYdBp4DcR02Z4FAIxA\/QdfBAPcoVIIRyf1NQCwJcy4MyADxUxgHIMBQwgHJo3OAOBqI96FLMkE9\/h8Jb4F6aS+UvwuIRbF5DxdwBeJXQPwTiHWJ0bAP6jF2IL7MBA1yRiTsA8SvgdgNyndGDnEARs4t\/52DDUYAAAAASUVORK5CYII="
				}
			}
		});
    }
    
    function initialize_zmail() 
    {
		console.log('zmail: ' + 'zmail retrying...');
		if (typeof qx != 'undefined' && typeof qx.core != 'undefined' && typeof qx.core.Init != 'undefined' && typeof ClientLib != 'undefined' && typeof webfrontend != 'undefined' && typeof phe != 'undefined') 
		{
			var app = qx.core.Init.getApplication();
			if (app.initDone == true) 
			{
				try
				{
					var isDefined = function(a){return (typeof a == 'undefined') ? false : true};
					var data = ClientLib.Data.MainData.GetInstance();
					var net = ClientLib.Net.CommunicationManager.GetInstance();
					if (isDefined(data) && isDefined(net))
					{
						var alliance = data.get_Alliance();
						var player = data.get_Player();
						var mail = data.get_Mail();
						if (isDefined(alliance) && isDefined(player) && isDefined(mail) && isDefined(alliance.get_Exists()) && isDefined(alliance.get_Relationships()) && isDefined(player.get_Name()) && player.get_Name() != '')
						{
							try
							{
								console.log('zmail: ' + 'initializing zmail');
								createClass();
								zmail.data.getInstance();
							}
							catch(e)
							{
								console.log('zmail: ' + "Zmail script init error:");
								console.log('zmail: ' + e.toString());
							}
						}
						else window.setTimeout(initialize_zmail, 10000);
					}
					else window.setTimeout(initialize_zmail, 10000);
				}
				catch(e)
				{
					console.log('zmail: ' + e.toString());
				}
			} 
			else window.setTimeout(initialize_zmail, 10000);
		} 
		else window.setTimeout(initialize_zmail, 10000);
    };
    window.setTimeout(initialize_zmail, 10000);    
}

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
})();

