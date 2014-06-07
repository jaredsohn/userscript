// Gmail Addons Version 5.1
// http://userscripts.org/scripts/show/19956
// Recent modifications: Bug Fixes

// ==UserScript==
// @name           Gmail Addons
// @namespace      http://gmailaddons.blogspot.com
// @description    Integrate various things into Gmail such as the Calendar, Reader, Notebook or just about anything else...
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

/////////// USER OPTIONS

const FIX_TOGGLE_BAR = true; //fixes the top bar with the toggle links
const COLLAPSE_MAIL = true; //collapse the threadlist when an addon is opened that is inside the main frame
const COLLAPSED_MAIL_HEIGHT = 300; //height of mail when some 'bottom' based addon which is inside the mail frame is opened

/////////// DO NOT CHANGE ANYTHING BEYOND THIS POINT

const DEFAULT_WIDTH = 15;
const DEFAULT_HEIGHT = 50;
const DEFAULT_POSITION = 'bottom';

window.GmailAddons = 
{
	registerAddon: function() {return 0;}
}

top.GmailAddons = 
{
	gm: undefined,
	fGmail: undefined,
	gbar: undefined,
	gbarapps: undefined,
	prefs: undefined,
	gmailSection: undefined,
	
	addonProperties: new Array(
		'enabled',
		'url',
		'position',
		'height',
		'width',
		'openOnLoad',
		'indicatorLabel',
		'insideMainFrame',
		'shortcutKey'
	),
	addonPropertiesNames: new Array(
		'Enabled',
		'URL',
		'Position',
		'Height',
		'Width',
		'Open on Load',
		'Indicator Label',
		'Display Inside the Main Frame',
		'Shortcut Key'
	),
	
	addons: 
	{
		n: 0
	},
	
	gmailViewChange: function()
	{
		this.updateInterface();
	},
	
	interfaceReady: function()
	{
		if ( true && this.gm && this.gm.getActiveViewElement && this.gm.getActiveViewElement() && ( (this.gbar && this.gmailSection) || this.gbarapps) ) return true;
		onGmailLoaded.load(function(g)
		{
			g.registerViewChangeCallback(function()
			{
				GmailAddons.gmailViewChange();
			});
			GmailAddons.gm = g;
		})
		if(!this.fGmail) this.fGmail=top.document.getElementById('canvas_frame');
		if(this.fGmail)
		{
			if (!this.gbar) this.gbar = this.fGmail.contentDocument.getElementById('gbar');
			if (!this.gbarapps) this.gbarapps = this.fGmail.contentDocument.getElementById('cornerBookmarks-websearch');
			if (!this.gbarapps) this.gbarapps = this.fGmail.contentDocument.getElementById('cornerBookmarks-more');
			if (this.gbarapps && this.gbarapps.tagName == 'A') this.gbarapps = this.gbarapps.parentNode;
			try
			{
				//if(this.gbar) //new gmail //dont need (try catch)
				this.gmailSection = this.gm.getActiveViewElement().parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				this.gmailSection.style.overflow = 'auto';	
			}
			catch(e)
			{
				log('ERROR finding gmailSection (this time)', 3);
			}
		}
		return ( true && this.gm && this.gm.getActiveViewElement && this.gm.getActiveViewElement() && ( (this.gbar && this.gmailSection) || this.gbarapps) );
	},
	
	//id, name, url, position, width/height, openOnLoad, indicatorLabel, insideMainFrame, callback
	registerAddon: function(add)
	{
		onGmailLoaded.load(function()
		{
			var a = GmailAddons.addons;
			a[a.n] = add;
			a[a.n].processed = false;
			a.n++;
			window.setTimeout(function()
			{
				GmailAddons.installAddons();
			},0);
		});
	},
	
	installAddons: function()
	{
		var doc = undefined;
		
		if (!this.interfaceReady()) 
		{
			window.setTimeout(function()
			{
				GmailAddons.installAddons();
			}, 700);
			return;
		}
		
		//general preparations to the user interface
		{
			doc = this.fGmail.contentDocument;
			
			this.fGmail.style.cssFloat = 'left';
			
			this.gm.getActiveViewElement().firstChild.style.overflow='auto';
			this.gm.getActiveViewElement().firstChild.style.marginBottom='5px';
			
			if (FIX_TOGGLE_BAR) 
			{
				if (this.gbar) //new gmail bar
				{
					this.gbar.style.position = 'fixed';
					this.gbar.style.zIndex = '999';
					if(doc.body.style.backgroundImage!='')
						this.gbar.style.backgroundImage = doc.body.style.backgroundImage; //"url(https://mail.google.com/mail/images/2/5/desk/opacity.png)";
					else
						this.gbar.style.backgroundColor = this.fGmail.contentWindow.getComputedStyle(doc.body,'').backgroundColor;
				}
			}
		}
		
		var a = this.addons;
		for (var i = 0; i < a.n; i++) 
		{
			if (!a[i].processed) 
			{
				//if its the preferences addon save it for later
				if(a[i].id=='GmailAddonsPreferences') this.prefs=a[i];
				//set defaults
				if (!(typeof a[i].id == 'undefined')) 
				{
					for(var j=0;j<this.addonProperties.length;j++)
					{
						a[i][this.addonProperties[j]] = GM_getValue(a[i].id+this.addonProperties[j],a[i][this.addonProperties[j]]);
					}
				}
				if (typeof a[i].enabled == 'undefined') a[i].enabled = true;
				if (typeof a[i].name == 'undefined') a[i].name = 'GmailAddon' + i;
				if (typeof a[i].url == 'undefined') a[i].url = 'about:blank';
				
				if (typeof a[i].position == 'undefined') a[i].position = DEFAULT_POSITION;
				if (typeof a[i].width == 'undefined') a[i].width = DEFAULT_WIDTH;
				if (typeof a[i].height == 'undefined') a[i].height = DEFAULT_HEIGHT;
				if (typeof a[i].openOnLoad == 'undefined') a[i].openOnLoad = false;
				if (typeof a[i].indicatorLabel == 'undefined' ||
				    a[i].indicatorLabel=='null' ||
					a[i].indicatorLabel=='') a[i].indicatorLabel = null;
				if (typeof a[i].insideMainFrame == 'undefined') a[i].insideMainFrame = false;
				if (typeof a[i].shortcutKey == 'undefined' || a[i].shortcutKey == '') a[i].shortcutKey = '';
				
				a[i].open = a[i].openOnLoad;
				
				// little shortcut thing
				{
					if(i==0) //do it only once
					{
						this.fGmail.contentWindow.addEventListener('keydown', function(e)
						{
							if(e.altKey || e.ctrlKey || e.metaKey) return;
							if(e.target && e.target.nodeName && (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA') ) return;
							var n = GmailAddons.shortcutKeyToNumber[String.fromCharCode(e.keyCode)];
							if(n) GmailAddons.toggleAddonOpen(n);
						}, true);
					}
					// add the shortcut key to the key value pairs
					if(a[i].shortcutKey!='')
					{
						this.shortcutKeyToNumber[a[i].shortcutKey] = i;
					}
				}
				
				//check if enabled
				if(!a[i].enabled)
				{
					a[i].processed = true;
					continue;
				}
				
				//create content area
				if(!a[i].f)
				{
					var f = ( a[i].insideMainFrame ? doc.createElement('iframe') : top.document.createElement('iframe') );
					f.id = a[i].id;
					f.src = a[i].url;
					f.setAttribute('frameborder', 0);
					if (a[i].position == 'left') 
					{
						f.style.cssFloat = 'left';
						f.style.height = '100%';
						f.style.width = '0';
						this.fGmail.parentNode.insertBefore(f, this.fGmail);
					}
					else if (a[i].position == 'right') 
					{
						f.style.cssFloat = 'right';
						f.style.height = '100%';
						f.style.width = '0';
						this.fGmail.parentNode.insertBefore(f, this.fGmail.nextSibling);
					}
					else if (a[i].position == 'bottom') 
					{
						f.style.height = '0';
						f.style.width = '100%';
						if (!a[i].insideMainFrame) 
						{
							f.style.cssFloat = 'right';
							this.fGmail.parentNode.insertBefore(f, this.fGmail.nextSibling);
						}
						else 
						{
							if(!this.gbar) //OLD gmail
							{
								//make an inline toggle line
								{
									var inlineToggle = doc.createElement('div');
									inlineToggle.addEventListener('click', new Function('GmailAddons.toggleAddonOpen(' + i + ')'), true);
									a[i].inlineToggle = inlineToggle;
									this.gm.getActiveViewElement().appendChild(inlineToggle);
								}
								this.gm.getActiveViewElement().appendChild(f);
							}
							else //NEW gmail
							{
								var section = this.gmailSection.cloneNode(true);
								a[i].section = section;
								section.style.marginTop = '9px';
								
								//hijack it =)
								{
									var frameParent = section.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[1];
									while(frameParent.childNodes.length) frameParent.removeChild(frameParent.childNodes[0]);
									frameParent.appendChild(f);
								}
								{
									var inlineToggle = doc.createElement('div');
									a[i].inlineToggle = inlineToggle;
									inlineToggle.addEventListener('click', new Function('GmailAddons.toggleAddonOpen(' + i + ')'), true);
									
									var itParent = section.childNodes[1].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
									while(itParent.childNodes.length) itParent.removeChild(itParent.childNodes[0]);
									itParent.appendChild(inlineToggle);
									itParent.style.display = '';
								}
								
								//append to DOM
								this.gmailSection.parentNode.appendChild(section);
							}
						}
					}//a[i].position
					
					a[i].f = f;
				}
				
				//Add status indicator in google bar
				a[i].statusIndicator=null;
				try//non critical, might not work if google changes something small
 				{
					if (a[i].indicatorLabel) 
					{
						if (this.gbar) //new gmail bar
						{
							var gbarNodes = this.gbar.firstChild.childNodes[0];
							var statusIndicator;
							while (gbarNodes)//if same named indicator found replace it
 							{
								if (
									gbarNodes.tagName == 'A' &&
									gbarNodes.firstChild &&
									gbarNodes.firstChild.nodeValue == a[i].indicatorLabel
									) 
								{
									statusIndicator = gbarNodes;
									break;
								}
								gbarNodes = gbarNodes.nextSibling;
							}
							if (!gbarNodes)//same name not found
							{
								statusIndicator = doc.createElement('a');
								statusIndicator.appendChild(doc.createTextNode(a[i].indicatorLabel));
								//add to DOM
								this.gbar.firstChild.insertBefore(statusIndicator, this.gbar.firstChild.childNodes[1]);
							}
							//fix it up
							{
								statusIndicator.addEventListener('click', function(e)
								{
									e.preventDefault();
								}, false);
								statusIndicator.addEventListener('click', new Function('GmailAddons.toggleAddonOpen(' + i + ')'), true);
								statusIndicator.href = '#';
								statusIndicator.setAttribute('class', 'gb1 VUNkxf');
								statusIndicator.style.fontWeight = 'bold';
							}
							a[i].statusIndicator = statusIndicator;
						}
						else if(this.gbarapps)//old gmail bar
						{
							var gbarNodes = this.gbarapps.childNodes[0];
							var statusIndicator;
							while(gbarNodes)//if same name found replace it
							{
								if(gbarNodes.tagName=='A' && gbarNodes.firstChild.nodeValue==a[i].indicatorLabel)
								{
									statusIndicator=gbarNodes;
									statusIndicator.addEventListener('click', function(e)
									{
										e.preventDefault();
									}, false);
									statusIndicator.addEventListener('click', new Function('GmailAddons.toggleAddonOpen(' + i + ')'), true);
									statusIndicator.href = '#';
									statusIndicator.style.color = '#000000';
									statusIndicator.style.fontWeight = 'bold';
									break;
								}
								gbarNodes = gbarNodes.nextSibling;
							}
							if (!gbarNodes)//same name not found
							{
								statusIndicator = doc.createElement('a');
								statusIndicator.addEventListener('click', function(e)
								{
									e.preventDefault();
								}, false);
								statusIndicator.addEventListener('click', new Function('GmailAddons.toggleAddonOpen(' + i + ')'), true);
								statusIndicator.href = '#';
								statusIndicator.style.color = '#000000';
								statusIndicator.style.fontWeight = 'bold';
								statusIndicator.appendChild(doc.createTextNode(a[i].indicatorLabel));
								//add to DOM
								this.gbarapps.insertBefore(statusIndicator, this.gbarapps.childNodes[3]);
								var space=doc.createElement('span');space.innerHTML='&nbsp;&nbsp;&nbsp';
								this.gbarapps.insertBefore(space, this.gbarapps.childNodes[3])
							}
							a[i].statusIndicator=statusIndicator;
						}
						
					}//if a[i].indicatorLabel
				}
				catch (e) 
				{
					log('ERROR in toolbar status indicator', 3);
				}
				
				//add GM_registerMenuCommand for people with Foreign Languages ??
				if (!(a[i].id == 'GmailAddonsPreferences'))
				{
					GM_registerMenuCommand('Toggle ' + a[i].name, new Function('GmailAddons.toggleAddonOpen(' + i + ')'));
				}
				
				//mark flag as processed so we dont do this addon again later
				a[i].processed = true;
				
				if(typeof a[i].callback != 'undefined')
				{
					a[i].callback(a[i]);
				}
				
			}//if(!a[i].processed)
		}//for to run through everything
		
		for (i = 0; i < a.n; i++) 
		{
			//remove all right frames and reinsert immediately after fGmail		
			//(weird float problem)
			//when some addons have their own 'bottom' frame
			if (a[i].enabled && a[i].position == 'right') 
			{
				this.fGmail.parentNode.removeChild(a[i].f);
				this.fGmail.parentNode.insertBefore(a[i].f, this.fGmail.nextSibling);
			}
		}
		
		this.updateInterface();
		
	},//installAddons
	
	updateInterface: function()
	{
		var a = this.addons;
		var h = 100; //height and width of fGmail
		var w = 100;
		var outerBottomFrame = false; //where any bottom addon (if open) uses its frame
		var innerBottomFrame = false;
		var i;
		for (i = 0; i < a.n; i++) 
		{
			if(!a[i].enabled) continue;
			if (a[i].position != 'bottom') 
			{
				if (a[i].open == true) 
				{
					a[i].f.style.width = a[i].width + '%';
					w -= a[i].width;
				}
				else 
					a[i].f.style.width = '0';
			}
		}
		for (i = 0; i < a.n; i++) 
		{
			if(!a[i].enabled) continue;
			if (a[i].position == 'bottom') 
			{
				if(!a[i].insideMainFrame) a[i].f.style.width = w + '%';
				if (a[i].open == true)
				{
					a[i].f.style.display = '';
					a[i].f.style.height = ( (a[i].height=='auto') ? 'auto' : (a[i].height + (!a[i].insideMainFrame?'%':'px')) );
					if (!a[i].insideMainFrame) 
					{
						outerBottomFrame=true;
						h -= a[i].height;
					}
					if (a[i].insideMainFrame) 
					{
						innerBottomFrame = true;
					}
				}
				else
				{
					a[i].f.style.display = 'none';
					a[i].f.style.height = 0;
				}
			}
		}
		for (i = 0; i < a.n; i++) 
		{
			if(!a[i].enabled) continue;
			if (a[i].statusIndicator) 
			{
				if (a[i].open) 
					a[i].statusIndicator.style.textDecoration = 'none';
				else 
					a[i].statusIndicator.style.textDecoration = 'underline';
			}
			if(a[i].inlineToggle)
			{
				if(!this.gbar) //OLD gmail
				{
					if(a[i].open)
					{
						a[i].inlineToggle.innerHTML=
												'<div style="background-color: #FFFFFF; height: 14px; margin: 0 -2px; margin-top: 2px;">&nbsp;</div>' +
												'<div style="height: 20px; color: #000000; cursor: pointer; font-size: 80%;">' +
												'<div style="width: 11px; height: 11px; margin-top: 4px; background-image:url(images/2/5/c/mailicons4.png); background-position: -40px -20px;"></div>' +
												'<div style="margin-top: -11px; margin-left: 15px;">'+a[i].name+'</div>' +
												'</div>';
					}
					else
					{
						a[i].inlineToggle.innerHTML=
												'<div style="background-color: #FFFFFF; height: 14px; margin: 0 -2px; margin-top: 2px;">&nbsp;</div>' +
												'<div style="height: 20px; color: #000000; cursor: pointer; font-size: 80%;">' +
												'<div style="width: 11px; height: 11px; margin-top: 4px; background-image:url(images/2/5/c/mailicons4.png); background-position: 0px -20px;"></div>' +
												'<div style="margin-top: -11px; margin-left: 15px;">'+a[i].name+'</div>' +
												'</div>';
					}
				}
				else //NEW gmail
				{
					if(a[i].open)
					{
						a[i].inlineToggle.innerHTML =
												'<div class="Jyd7m oggeve"><img src="images/cleardot.gif" class="LrIFMe"/> '+a[i].name+'</div>'
					}
					else
					{
						a[i].inlineToggle.innerHTML =
												'<div class="v2dpPe oggeve"><img src="images/cleardot.gif" class="LrIFMe"/> '+a[i].name+'</div>'
					}
				}
			}
		}
		
		this.fGmail.style.width = w + '%';
		this.fGmail.style.height = h + '%';
		if (innerBottomFrame && COLLAPSE_MAIL && this.gm.getActiveViewType()!='cv' && this.gm.getActiveViewType()!='s' && this.gm.getActiveViewType()!='co' && this.gm.getActiveViewType()!='ct') 
		{
			if(this.gbar) //new gmail
				this.gmailSection.style.height = COLLAPSED_MAIL_HEIGHT + 'px'
			else //old gmail
				this.gm.getActiveViewElement().parentNode.style.height = COLLAPSED_MAIL_HEIGHT + 'px';
		}
		else 
		{
			if(this.gbar)
				this.gmailSection.style.height = 'auto';
			else
				this.gm.getActiveViewElement().parentNode.style.height = 'auto';
		}
	},
	
	toggleAddonOpen: function(n)
	{
		var a = this.addons;
		a[n].open = !a[n].open;
		//if its a bottom addon that uses its own frame then close all other bottom addons that use their own frames
		if(a[n].open && a[n].position=='bottom' && !a[n].insideMainFrame)
			for(var i=0;i<a.n;i++)
				if(i!=n && a[i].position=='bottom' && !a[i].insideMainFrame) a[i].open=false;
		this.updateInterface();
	},
	
	initGmailAddonsPreferences: function()
	{
		var doc=GmailAddons.prefs.f.contentDocument;
		var ap=GmailAddons.addonProperties;
		var apn=GmailAddons.addonPropertiesNames;
		
		doc.getElementsByTagName('html')[0].innerHTML='<head></head><body><div id="content" style="font-size: 80%; font-family: arial, verdana; padding: 4px;"><br/><div style="font-size: 120%; font-weight: bold;">Gmail Addons Preferences</div><br/></div></body>';
		var con=doc.getElementById('content');
		
		//buttons
		{
			var save=doc.createElement('input');
			con.appendChild(save);
			save.type='button';
			save.value='Save';
			save.addEventListener('click', function()
			{
				var doc=GmailAddons.prefs.f.contentDocument;
				var inputs=doc.getElementsByTagName('input');
				
				var a=GmailAddons.addons;
				
				for(var i=0;i<inputs.length;i++)
				{
					if (inputs[i].type == 'text') 
					{
						GM_setValue(inputs[i].id, inputs[i].value);
					}
					if(inputs[i].type == 'checkbox')
					{
						GM_setValue(inputs[i].id, (inputs[i].checked?true:false));
					}
				}
				
				GmailAddons.prefs.open=false;
				GmailAddons.updateInterface();
			},false);
			
			var cancel=doc.createElement('input');
			con.appendChild(cancel);
			cancel.type='button';
			cancel.value='Cancel';
			cancel.addEventListener('click', function()
			{
				GmailAddons.prefs.open=false;
				GmailAddons.updateInterface();
			}, false);
		}//buttons
		
		var a=GmailAddons.addons;
		for(var i=0;i<a.n;i++)
		{
			var space=doc.createElement('div');
			space.innerHTML='<br/>'
			con.appendChild(space);
			if (a[i].id) 
			{
				var addonDiv = doc.createElement('div');
				addonDiv.innerHTML = '<div style="font-weight: bold;">' + a[i].name + '</div>';
				var div = doc.createElement('div');
				addonDiv.appendChild(div);
				var t = '<table>';
				for(var j=0;j<ap.length;j++)
				{
					t+='<tr><td style="font-size: 80%;">' + apn[j] + '</td><td>';
					if(GM_getValue(a[i].id+ap[j], a[i][ap[j]])===true || GM_getValue(a[i].id+ap[j], a[i][ap[j]])===false)
					{
						t+='<input type="checkbox" id="' + a[i].id + ap[j] +'"';
						t+=( (GM_getValue(a[i].id+ap[j], a[i][ap[j]])) ? (' checked="checked"') : '');
						t+='" />';
					}
					else
						t+='<input type="text" id="' + a[i].id + ap[j] + '" value="' + GM_getValue(a[i].id+ap[j], a[i][ap[j]]) + '" />';
					t+='</td></tr>';
				}
				t += '</table>';
				div.innerHTML = t;
				con.appendChild(addonDiv);
			}
		}
		
		GmailAddons.prefs.open=true;
		GmailAddons.updateInterface();
	},
	
	shortcutKeyToNumber: {} // key value pairs to speed up resolution of shortcut key to addon number
	
};

top.onGmailLoaded =
{
	initialized: false,
	f:
	{
		n: 0
	},
	init: function()
	{
		window.addEventListener('load', function()
		{
			onGmailLoaded.init2();
		}, true);
		this.init.called = true;
	},
	init2: function()
	{
		if(unsafeWindow.gmonkey && unsafeWindow.gmonkey.load)
		{
			unsafeWindow.gmonkey.load('1.0', function(g)
			{
				onGmailLoaded.gmonkey = g;
				onGmailLoaded.init3(g);
			});
		}
		else
		{
			window.setTimeout(function()
			{
				onGmailLoaded.init2();
			}, 700);
		}
	},
	init3: function(g)
	{
		try
		{
			if(unsafeWindow.gmonkey.isLoaded('1.0') &&
			   g.addNavModule &&
			   g.registerViewChangeCallback &&
			   g.getActiveViewElement() &&
			   g.getActiveViewType() &&
			   document.getElementById('canvas_frame')
			   )
			{
				this.initialized = true;
				this.process(g);
			}
			else
			{
				window.setTimeout(function()
				{
					onGmailLoaded.init3(g);
				}, 700);
			}
		}
		catch(e)
		{
			window.setTimeout(function()
			{
				onGmailLoaded.init3(g);
			}, 700);
		}
	},
	process: function(g)
	{
		var f = this.f;
		for(var i=0; i<f.n; i++)
		{
			if(f[i].processed) continue;
			f[i](g);
			f[i].processed = true;			
		}
	},
	load: function(func)
	{
		this.f[this.f.n] = func;
		this.f[this.f.n].processed = false;
		this.f.n++;
		if(!this.initialized)
		{
			if(!this.init.called) this.init();
		}
		else this.process(this.gmonkey);
	}
};
if(window.onGmailLoaded) onGmailLoaded.init();

function log(s, prio)
{
	var ENABLE = 0;
	var PRIORITY = 1;
	if( ENABLE && (!prio || prio<=PRIORITY) ) GM_log(s);
}

if(window.GmailAddons)
{
	/////////// INSTALL SPECIFIC ADDONS
	
	//GmailAddons.registerAddon(
	//{
	//	id:
	//	name:
	//	url:
	//	indicatorLabel:
	//	position:
	//	width:
	//	height:
	//	openOnLoad:
	//	insideMainFrame:
	//	callback:
	//});
	GmailAddons.registerAddon(
	{
		id: 'GmailAddonsPreferences',
		name: 'Gmail Addons Preferences',
		indicatorLabel: 'Prefs',
		position: 'bottom',
		height: 85,
		openOnLoad: false,
		callback: function()
		{
			if(GmailAddons.prefs.statusIndicator)
				GmailAddons.prefs.statusIndicator.addEventListener('click', function()
				{
					GmailAddons.initGmailAddonsPreferences();
				}, true);
			GM_registerMenuCommand('! Gmail Addons Preferences', function()
			{
				GmailAddons.initGmailAddonsPreferences();
			});
		}
	});
	GmailAddons.registerAddon(
	{
		id: 'tdGCal',
		name: 'Google Calendar',
		url: 'https://www.google.com/calendar',
		indicatorLabel: 'Calendar'
	});
	GmailAddons.registerAddon(
	{
		id: 'tdGReader',
		name: 'Google Reader',
		url: 'https://www.google.com/reader',
		indicatorLabel: 'Reader',
		position: 'bottom',
		height: 700,
		insideMainFrame: true
	});
	GmailAddons.registerAddon(
	{
		id:  'tdGNotebook',
		name: 'Google Notebook',
		url: 'http://www.google.com/notebook',
		indicatorLabel: 'Notebook',
		position: 'bottom',
		height: 700,
		insideMainFrame: true
	});
	GmailAddons.registerAddon(
	{
		id: 'tdContacts',
		name: 'Google Contacts',
		url: 'https://mail.google.com/mail/contacts/ui/ContactManager',
		indicatorLabel: 'Contacts',
		position: 'bottom',
		height: 700,
		insideMainFrame: true
	});
}
