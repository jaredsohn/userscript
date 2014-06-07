// ==UserScript==
// @name       Mush Helper User Script
// @version    0.121
// @description Add some small features for Mush
// @grant      none
// @match      http://mush.vg/
// @match      http://mush.vg/#
// @copyright  2012+, Skildor
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js
// @require http://code.jquery.com/ui/1.10.0/jquery-ui.js
// @require http://data.twinoid.com/js/167/boot.js
var $ = unsafeWindow.jQuery;
var now;
var smileysCode = 
{
	"Mush" :
	{
		"logo" : "http://mush.twinoid.com/favicon.ico",
		"smileys" : 
		{
			":pa_pm:" : "http://mush.vg/img/icons/ui/pslots.png",
			":pa:" : "http://mush.vg/img/icons/ui/pa_slot1.png",
			":pm:" : "http://mush.vg/img/icons/ui/pa_slot2.png",
			":pa_comp:" : "http://mush.vg/img/icons/ui/pa_comp.png",
			":pa_cook:" : "http://mush.vg/img/icons/ui/pa_cook.png",
			":pa_core:" : "http://mush.vg/img/icons/ui/pa_core.png",
			":pa_eng:" : "http://mush.vg/img/icons/ui/pa_eng.png",
			":pa_heal:" : "http://mush.vg/img/icons/ui/pa_heal.png",
			":pa_pilgred:" : "http://mush.vg/img/icons/ui/pa_pilgred.png",
			":pa_shoot:" : "http://mush.vg/img/icons/ui/pa_shoot.png",
			
			":pv:" : "http://mush.vg/img/icons/ui/lp.png",
			":moral:" : "http://mush.vg/img/icons/ui/moral.png",
			
			":triumph:" : "http://mush.vg/img/icons/ui/triumph.png",
			":ship_triumph:" : "http://mush.vg/img/icons/ui/daedalus_triumph.png",
			":xp:" : "http://mush.vg/img/icons/ui/xp.png",
			
			":admin_neron:" : "http://mush.vg/img/icons/ui/title_02.png",
			":commander:" : "http://mush.vg/img/icons/ui/title_01.png",
			":resp_comm:" : "http://mush.vg/img/icons/ui/title_03.png",

			":asocial:" : "http://mush.vg/img/icons/ui/status/unsociable.png",
			":disabled:" : "http://mush.vg/img/icons/ui/status/disabled.png",
			
			":mush:" : "http://mush.vg/img/icons/ui/mush.png",
			":hungry:" : "http://mush.vg/img/icons/ui/status/hungry.png",
			":psy_disease:" : "http://mush.vg/img/icons/ui/status/psy_disease.png",
			":laid:" : "http://mush.vg/img/icons/ui/laid.png",
			":stink:" : "http://mush.vg/img/icons/ui/status/stinky.png",
			":mastered:" : "http://mush.vg/img/icons/ui/guardian.png",
			":hurt:" : "http://mush.vg/img/icons/ui/status/hurt.png",
			
			":alert:" : "http://mush.vg/img/icons/ui/alert.png",
			":door:" : "http://mush.vg/img/icons/ui/door.png",
			":com:" : "http://mush.vg/img/icons/ui/comm.png",
			":fire:" : "http://mush.vg/img/icons/ui/fire.png",
			":hunter:" : "http://mush.vg/img/icons/ui/hunter.png",

			":fuel:" : "http://mush.vg/img/icons/ui/fuel.png",
			":o2:" : "http://mush.vg/img/icons/ui/o2.png",

			":plant_diseased:" : "http://mush.vg/img/icons/ui/plant_diseased.png",
			":plant_dry:" : "http://mush.vg/img/icons/ui/plant_dry.png",
			":plant_thirsty:" : "http://mush.vg/img/icons/ui/plant_thirsty.png",
			":plant_youngling:" : "http://mush.vg/img/icons/ui/plant_youngling.png",

			":chut:" : "http://mush.vg/img/icons/ui/discrete.png",
			":talk:" : "http://mush.vg/img/icons/ui/talk.gif",
			":talky:" : "http://mush.vg/img/icons/ui/talkie.png",
			":time:" : "http://mush.vg/img/icons/ui/casio.png",
			":tip:" : "http://mush.vg/img/icons/ui/tip.png",
			":less:" : "http://mush.vg/img/icons/ui/less.png",
			":more:" : "http://mush.vg/img/icons/ui/more.png",

			":bin:" : "http://mush.vg/img/icons/ui/bin.png",
			":cat:" : "http://mush.vg/img/icons/ui/cat.png",
			":dead:" : "http://mush.vg/img/icons/ui/dead.png",
			":pills:" : "http://mush.vg/img/icons/ui/demoralized2.png",
		},
	},
	"Twinoid v2" :
	{
		"logo" : "http://data.twinoid.com/img/smile/square/smile.png",
		"smileys" : 
		{
			":)" : "http://data.twinoid.com/img/smile/square/smile.png",
			";)" : "http://data.twinoid.com/img/smile/square/wink.png",
			":lol:" : "http://data.twinoid.com/img/smile/square/lol.png",
			":D" : "http://data.twinoid.com/img/smile/square/happy.png",
			"^_^" : "http://data.twinoid.com/img/smile/square/happy2.png",
			":(" : "http://data.twinoid.com/img/smile/square/sad.png",
			"X[" : "http://data.twinoid.com/img/smile/square/mad.png",
			"8D" : "http://data.twinoid.com/img/smile/square/surprised.png",
			":P" : "http://data.twinoid.com/img/smile/square/razz.png",
			"8)" : "http://data.twinoid.com/img/smile/square/cool.png",
			"8O" : "http://data.twinoid.com/img/smile/square/eek.png",
			":{" : "http://data.twinoid.com/img/smile/square/confused.png",
			":K" : "http://data.twinoid.com/img/smile/square/keepcool.png",
			":'(" : "http://data.twinoid.com/img/smile/square/cry.png",
			":}" : "http://data.twinoid.com/img/smile/square/redface.png",
			":wink:" : "http://data.twinoid.com/img/smile/square/wink2.png",
			":fp:" : "http://data.twinoid.com/img/smile/square/facepalm.png",
			":psycho:" : "http://data.twinoid.com/img/smile/square/psycho.png",
			":twinoid:" : "http://data.twinoid.com/img/smile/square/twinoid.png",
			":innocent:" : "http://data.twinoid.com/img/smile/square/lookup.png",
			":youpi:" : "http://data.twinoid.com/img/smile/square/yeah.png",
			"O_o" : "http://data.twinoid.com/img/smile/square/huh.png",
			":-/" : "http://data.twinoid.com/img/smile/square/hmm.png",
			"-_-" : "http://data.twinoid.com/img/smile/square/dontcare.png",
			":nooo:" : "http://data.twinoid.com/img/smile/square/nooo.png",
			":bad:" : "http://data.twinoid.com/img/smile/square/evil.png",
			":sadist:" : "http://data.twinoid.com/img/smile/square/twisted.png",
			":chart:" : "http://data.twinoid.com/img/smile/square/chart.png",
			":!:" : "http://data.twinoid.com/img/smile/square/exclaim.png",
			":?:" : "http://data.twinoid.com/img/smile/square/question.png",
			":arrow:" : "http://data.twinoid.com/img/smile/square/arrow.png",
			":X:" : "http://data.twinoid.com/img/smile/square/cross.png",
			":idea:" : "http://data.twinoid.com/img/smile/square/idea.png",
			":out:" : "http://data.twinoid.com/img/smile/square/getout.png",
			":fear:" : "http://data.twinoid.com/img/smile/square/fear.png",
			":cute:" : "http://data.twinoid.com/img/smile/square/cute.png",
			":omg:" : "http://data.twinoid.com/img/smile/square/omg.png",
			":stop:" : "http://data.twinoid.com/img/smile/square/stop.png",
			":drowl:" : "http://data.twinoid.com/img/smile/square/drowl.png",
			":zombie:" : "http://data.twinoid.com/img/smile/square/zombie.png",
			"T_T" : "http://data.twinoid.com/img/smile/square/crylot.png",
			"°x°" : "http://data.twinoid.com/img/smile/square/puke.png",
			":calim:" : "http://data.twinoid.com/img/smile/square/calim.png"
		},
	},
};

var inventoryIcon = 
{
	"diseased" : ":plant_diseased:",
	"dry" : ":plant_dry:",
	"thirsty" : ":plant_thirsty:",
	"youngling" : ":plant_youngling:",
}
/********************************************* MushUserScript *********************************************/
function MushUserScript() 
{
	this.mainDivMUS = null;
	this.content = null;
	this.icons = null;
	this.rightBar = null;
	this.editor = null;
	this.menu = null;
	this.buttons = null;
	this.reducer = null;
	this.isReducing = null;
	this.currentTextArea = null;
	this.actionButtons = [];

	this.copyBindedTextEvent = null;
	this.leaveBindedTextAreaEvent = null;
	this.doubleClickBindingEvent = null;
	this.animateEvent = null;
	
	this.__init();
	
};	
MushUserScript.prototype =
{
	__init : function()
	{
		window.onunload = this.save.bind(this);
	
		this.mainDivMUS = $('<div/>').appendTo('body');
		this.mainDivMUS.css('position','fixed');
		this.mainDivMUS.css('top','25px');
		this.mainDivMUS.css('min-width','150px');
		this.mainDivMUS.css('width', '150px');
		this.mainDivMUS.css('display','table');
		this.mainDivMUS.css('borderTopRightRadius','10px');
		this.mainDivMUS.css('borderBottomRightRadius','10px');
		this.mainDivMUS.css('backgroundColor','#040416');
		this.mainDivMUS.css('z-index',5);
		
		this.content = $('<div/>').appendTo(this.mainDivMUS);
		this.content.css('display','table-cell');
		this.content.css('min-width','150px');
		this.content.css('padding','5px');
		
		this.menu = $('<div/>').appendTo(this.content);	

		this.rightBar = $('<div/>').appendTo(this.mainDivMUS);
		this.rightBar.css('display','table-cell');
		this.rightBar.css('min-width','15px');

		this.icons = $('<div/>').appendTo(this.menu);
		this.icons.css('padding','1px');
				
		this.buttons = $('<ul/>').appendTo(this.menu);
		this.buttons.css('width','150px');
		
		for(var initFunction in this)
		{
			if(initFunction.indexOf("init") == 0 && typeof(this[initFunction]) == "function")
			{
				this[initFunction]();
			}
		}
		this.mainDivMUS.tooltip();
	},	
	
	initPin : function()
	{
		var pinButton = $('<img/>',{src: 'http://img11.hostingpics.net/pics/304920iconWPPinwhite.png', title: 'Epingler le script'}).appendTo(this.icons);
		pinButton.click(this.pin.bind(this));
		if(localStorage['MUS_IsPinned'] == 'true')
		{
			pinButton.css('opacity','0.5');
		}
	},
	
	initTextAreaBinding : function()
	{
		var dblClickBinding = $('<img/>',{src: 'http://img15.hostingpics.net/pics/863160mouse.png', title: 'Activer/Desactiver la fonction double clique sur les zones de texte du jeu'}).appendTo(this.icons);
		this.doubleClickBindingEvent = this.doubleClickBinding.bind(this);
		dblClickBinding.click(this.activeBinding.bind(this));
		if(localStorage['MUS_DblClickBinding'] == 'true')
		{
			dblClickBinding.css('opacity','0.5');
			$('#content').find('textArea').dblclick(this.doubleClickBindingEvent);
		}
	},
	
	initResizer : function()
	{
		var resetSize = $('<img/>',{src: 'http://img15.hostingpics.net/pics/454420reset.png', title: 'Réinitialiser les dimensions du script'}).appendTo(this.icons);
		resetSize.click(function()
		{
			this.editor.textArea.width(""); 
			if(localStorage['MUS_display'] == 'horizontal')
			{
				this.editor.textArea.height(111); 
			}
			else
			{
				this.editor.textArea.height(""); 
			}
				
		}.bind(this));
	},
	
	initDisplayChanger : function()
	{
		var displayChanger = $('<img/>',{src: 'http://img15.hostingpics.net/pics/151121list.png', title: 'Affichage Horizontal/Vertical'}).appendTo(this.icons);
		displayChanger.click(this.changeDisplay.bind(this));		
	},
		
	initTextArea : function()
	{
		this.editor = new SimpleTextAreaEditor({rows: 5});
		this.editor.css('min-width','150px');
		this.editor.css('vertical-align','top');
		if(localStorage['MUS_text'])
			this.showText(localStorage['MUS_text']);
		this.editor.content.appendTo(this.content);
	
		var boldButton = createMushStyleButton('<strong>G</strong>',function(){ this.editor.addToSelection("**","**");}.bind(this));
		boldButton.css('width','45px');
		this.editor.addEditorButton(boldButton);
		
		var italicButton = createMushStyleButton("<em style='font-style: italic;'>I</em>",function(){ this.editor.addToSelection("//","//");}.bind(this));
		italicButton.css('width','45px');
		this.editor.addEditorButton(italicButton);
		
		var selectButton = createMushStyleButton('Selectionner',function(){ this.editor.select();}.bind(this));
		selectButton.css('width','95px');
		this.editor.addEditorButton(selectButton);
		
		var clearButton = createMushStyleButton('Vider',function(){ this.showText('');}.bind(this));
		clearButton.css('width','95px');
		this.editor.addEditorButton(clearButton);
	},
	
	initDisplay : function()
	{
		if (localStorage['MUS_display'] == 'horizontal')
		{
			this.mainDivMUS.width('');
			this.mainDivMUS.css('max-height','125px');
			this.menu.css('float','left'); 	
			this.editor.content.css('display','table');
			this.editor.smileysPanel.css('padding-left','5px');
			this.editor.smileysPanel.find('.tid_smileyPopUp').each(function()
			{
				var panel = $(this);
				var nbSmileys = panel.children().size();
				panel.css('max-height','80px');
				panel.css('max-width',nbSmileys/2*30+'px');
			});
			this.editor.textArea.height(111);
			this.editor.textArea.css('resize','horizontal');
			this.editor.buttons.width(110);
			this.editor.content.css('margin-left','155px'); 
			this.editor.content.children().css('display','table-cell').css('vertical-align','top');
		}
		else
		{
			this.mainDivMUS.css('width', '150px');
			this.mainDivMUS.css('max-height','');
			this.editor.content.css('display','');
			this.menu.css('float',''); 	
			this.editor.smileysPanel.css('padding-left','5px');
			this.editor.smileysPanel.find('.tid_smileyPopUp').css('max-height','').css('max-width','');
			
			//this.editor.textArea.height(111);
			this.editor.textArea.css('resize','both');
			this.editor.buttons.width('');
			this.editor.content.css('margin-left',''); 
			this.editor.content.children().css('display','').css('vertical-align','');	
		}
	},
	
	initReducer : function()
	{
		this.animateEvent = this.animate.bind(this);
		this.reducer = $('<div/>').appendTo(this.rightBar);
		this.reducer.css('min-width','15px');
		this.reducer.css('position','absolute');
		this.reducer.css('top','0');
		this.reducer.css('height','100%');
		this.reducer.click(this.animateEvent);
		
		if(localStorage['MUS_IsReduced']!= 'false')
		{
			this.mainDivMUS.css('left','-'+(this.mainDivMUS.width()-15)+'px');
			this.reducer.attr('class','arrowright');
		}
		else
		{	
			if(localStorage['MUS_IsPinned'] != 'true')
			{
				$('#content').bind('click',this.animateEvent);
			}
			this.mainDivMUS.css('left','0px');
			this.reducer.attr('class','arrowleft');
		}
	},
	
	//#endregion Init

	//#region Event
	activeBinding : function(event)
	{
		var element = $(event.currentTarget);
		if(localStorage['MUS_DblClickBinding'] == 'true')
		{
			localStorage['MUS_DblClickBinding'] = 'false';
			$('#content').find('textArea').unbind('dblclick',this.doubleClickBindingEvent);
			element.css('opacity','1');
			
			this.editor.textArea[0].oninput = null;
			this.editor.textArea.unbind('keydown',this.leaveBindedTextAreaEvent);

		}
		else
		{
			localStorage['MUS_DblClickBinding'] = 'true';
			$('#content').find('textArea').bind('dblclick',this.doubleClickBindingEvent);
			element.css('opacity','0.5');
		}
	},
	
	doubleClickBinding : function(event)
	{
		this.copyBindedTextEvent = this.copyBindedText.bind(this);
		this.leaveBindedTextAreaEvent = this.leaveBindedTextArea.bind(this);
		this.currentTextArea = event.currentTarget;
		this.editor.textArea.focus();
		this.editor.text(this.currentTextArea.value);
		this.editor.textArea[0].oninput =this.copyBindedTextEvent;
		this.editor.textArea.keydown(this.leaveBindedTextAreaEvent);
		
	},
	
	copyBindedText : function(event)
	{
		this.currentTextArea.value = this.editor.textArea[0].value;
	},
	
	leaveBindedTextArea : function(event)
	{
		//Tabulation
		if( event.keyCode == 9)
		{
			this.currentTextArea.focus();
			this.currentTextArea.value = this.editor.textArea[0].value;
			this.editor.textArea[0].removeEventListener('input', this.copyBindedTextEvent);
			this.editor.textArea.unbind('keydown',this.leaveBindedTextAreaEvent);
			return false;
		}
	},
	
	save : function()
	{
		localStorage['MUS_width'] = this.editor.textArea.width();
		localStorage['MUS_height'] = this.editor.textArea.height();
		localStorage['MUS_text'] = this.editor.textArea[0].value;
	},
	
	changeDisplay : function()
	{
		localStorage['MUS_display'] = (localStorage['MUS_display'] == 'horizontal')? 'vertical' : 'horizontal';
		this.initDisplay();
	},
		
	animate : function()
	{
		var isPinned = localStorage['MUS_IsPinned'];
		if(this.mainDivMUS.css("left") == "0px")
		{
			var left = this.mainDivMUS.width()-this.reducer.width();
			this.mainDivMUS.animate({"left": '-'+left+'px'}, "slow");
			if(isPinned != 'true')
			{
				$('#content').unbind('click',this.animateEvent);
			}
			localStorage['MUS_IsReduced'] = true;
			this.reducer.attr('class','arrowright');
		}
		else
		{
			this.mainDivMUS.animate({"left": "0px"}, "slow");
			if(isPinned != 'true')
			{
				$('#content').bind('click',this.animateEvent);
			}
			localStorage['MUS_IsReduced'] = false;
			this.reducer.attr('class','arrowleft');
		}
	},
	
	pin : function(e)
	{
		var element = $(e.currentTarget);	
		if(localStorage['MUS_IsPinned'] == 'true')
		{
			localStorage['MUS_IsPinned'] = false;
			element.css('opacity','1');
			
			if(localStorage['MUS_IsReduced'] == 'false')
			{
				$('#content').bind('click',this.animateEvent);
			}
		}
		else
		{
			localStorage['MUS_IsPinned'] = true;
			element.css('opacity','0.5');
			if(localStorage['MUS_IsReduced'] != 'true')
			{
				$('#content').unbind('click',this.animateEvent);
			}
		}
	},
	//#endregion Event
	
	addToMenu :function(mushUserScriptAction)
	{
		this.actionButtons.push(mushUserScriptAction);
		this.buttons.append(mushUserScriptAction.html('<li/>'));
	},
	
	showText : function(text)
	{
		this.editor.text(text);
	},
	
	refresh : function()
	{
		for (var key in this.actionButtons)
		{
			this.actionButtons[key].checkVisible();
		}
	},
	
}

/********************************************* MushUserScriptAction *********************************************/
function MushUserScriptAction(name, action, conditions)
{
	this.action = action;
	this.name = name;
	this.conditions = conditions;
};
MushUserScriptAction.prototype  = 
{
	button : null,
	conditions : null,
	
	checkVisible : function()
	{
		if(this.check())
		{
			this.button.css('display','block');
		}
		else
		{
			this.button.css('display','none');
		}
	},
	
	html : function(type)
	{
		this.button = $(type);
		this.button.append(createMushStyleButton(this.name,this.action));
		return this.button;
	},
	
	css : function(name,value)
	{
		this.button.css(name,value);
	},
	
	check : function()
	{
		var isOk = true;
		for(var key in this.conditions)
		{
			switch(key)
			{
				case 'room':
					isOk = isOk && this.checkRoom(this.conditions[key]);
					break;
				case 'ismodule':
					isOk = isOk && this.checkIsModule(this.conditions[key]);
					break;
				case 'moduleid':
					isOk = isOk && this.checkModuleId(this.conditions[key]);
					break;
				case 'moduletitle':
					isOk = isOk && this.checkModuleTitle(this.conditions[key]);
					break;
				default : 
					isOk = isOk && this.conditions[key]();
			}
		}
		return isOk;
	},
	
	checkRoom : function(roomName)
	{
		return $("#input").attr('d_name') == roomName;
	},
	
	checkIsModule : function(isModule)
	{
		return $("#input").attr('ismodule') == isModule;
	},
	
	checkModuleId : function(moduleId)
	{
		var l = $("#cdModuleContent").children().first();
		return l.attr('id') == moduleId;
	},
	
	checkModuleTitle : function(moduleTitle)
	{
		var l = $("#cdModuleContent").find('h2:first:contains("'+moduleTitle+'")').length;
		return l != 0;
	},
}
/********************************************* SimpleTextAreaEditor *********************************************/
function SimpleTextAreaEditor(params)
{
	this.content = $('<div/>');
	this.content.css('margin-top','5px');
	this.buttons = $('<div/>').appendTo(this.content);
	this.textAreaDiv = $('<div/>').appendTo(this.content);
	this.textArea = $('<textarea/>', params).appendTo(this.textAreaDiv);
	this.textArea.css('color','black');
	this.textArea.width(localStorage['MUS_width']);
	this.textArea.height(localStorage['MUS_height']);
	this.textArea.css('min-width','150px');
	this.textArea.css('min-height','50px');
	this.textArea.css('resize','both');
	this.smileysPanel = $('<div/>',{ class  : "tid_smileyPanel"}).appendTo(this.content);
	this.loadSmileys();
};
SimpleTextAreaEditor.prototype = 
{
	css : function(name, value)
	{
		return this.content.css(name,value);
	},
		
	select : function()
	{
		this.textArea.select();
	},
	
	addToSelection : function(startTag,endTag)
	{
		textarea = this.textArea[0];
		var start=textarea.selectionStart;
		var end = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, start ) + 
			startTag + textarea.value.substring(start, end) + endTag +
			textarea.value.substring(end);
		textarea.setSelectionRange(start+startTag.length, end+startTag.length);
		this.textArea.focus();
		this.textArea.trigger('oninput');
		
	},
	
	text : function(text)
	{
		this.textArea[0].value = text;
		this.textArea.trigger('oninput');
	},
		
	loadSmileys : function()
	{
		var currentSmiley = localStorage['MUS_smileys'];
		for(var catName in smileysCode)
		{
			var a = $('<a/>', { class : 'tid_smcat', 'name' : catName})
				.append($('<span/>', {class : 'tid_drop'}))
				.append($('<img/>',{ src : smileysCode[catName]['logo'] }))
				.prependTo(this.smileysPanel);
			a.attr('tid_cat',catName);
			var smileys = $('<div/>',{ class: 'tid_smileyPopUp'}).appendTo(this.smileysPanel);
			smileys.css('overflow-y','auto');
			smileys.css('display','none');
			smileys.attr('tid_cat',catName);
			$('<div/>', { class : 'tid_title'}).text(catName).appendTo(smileys);
			for(var code in smileysCode[catName]['smileys'])
			{
				smileys.append(this.getNewSmiley(code,smileysCode[catName]['smileys'][code]));
			}
			if (currentSmiley == catName)
			{
				a.addClass('tid_active');
				smileys.css('display','block');
			}
			a.click(function()
			{
				var link = $(this);
				link.siblings('.tid_smileyPopUp').css('display','none');
				if(link.hasClass('tid_active'))
				{
					localStorage['MUS_smileys'] = '';
					link.removeClass('tid_active');
				}
				else
				{
					localStorage['MUS_smileys'] = link.attr('name');
					link.siblings('.tid_smcat.tid_active').removeClass('tid_active');
					link.siblings('.tid_smileyPopUp[tid_cat="'+link.attr('tid_cat')+'"]').css('display','block');
					link.addClass('tid_active');
				}
			});
			
		}
	},
	
	addEditorButton : function(button)
	{
		button.css('display','inline-block');	
		this.buttons.append(button);
	},
	
	getNewSmiley : function(code, url)
	{
		var link = $('<a/>', { class : 'tid_smiley' });
		var smileyButton = $('<img/>',{src: url, class : 'tid_smiley'}).appendTo(link);
		smileyButton.click(function(){this.addToSelection(code,"");}.bind(this));
		return link
	},
}


function createMushStyleButton(name, action)
{
	var divActionBut = $('<div/>',{ class : 'action but' });
	var divButright = $('<div/>',{ class : 'butright' }).appendTo(divActionBut);
	var divButbg = $('<div/>', { class : 'butbg'}).appendTo(divButright);
	var button = $('<a/>').appendTo(divButbg);
	button.html(name);
	button.click(action);
	return divActionBut;
}
function unserialize(buffer,valueName)
{
	
	var data = unsafeWindow.haxe.Unserializer.run(buffer);
	return data[valueName];
}

function startScript()
{
	// Not in game?
	if($("#input").length == 0)
	{
		return;
	}
	console.log('Start MushUserScript');
	mus = new MushUserScript();
	mus.addToMenu(new MushUserScriptAction('Médicaments', function()
		{
			var text = '//**Médicaments**// :\n';
			$("#room").children(':not(.cdEmptySlot)').each(function()
			   {
				   var li = $(this);
				   var name = li.attr("data-name");
				   name = name.substring(0,1).toUpperCase() + name.substring(1,name.length).toLowerCase(); 
				   var desc = li.attr("data-desc");
				   if(desc.indexOf("Effets") != -1)
				   {
					   text +="**"+name+"** : ";
					   desc = desc.substring(desc.indexOf("</em>")+5,desc.length);
					   text += desc+"\n";
				   }
			   });
			text = text.replace(/\t/g,'');
			text = text.replace(/\\r\\n/g,'');
			text = text.replace(/\\/g,'');
			text = text.replace(/<p>/g,'');
			text = text.replace(/<\/p>/g,", ");
			text = text.replace(/<div>/g,"");
			text = text.replace(/<\/div>/g,"");
			text = text.replace(/, <br\/>/g,'\n');
			text = text.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot1.png' alt='pa' \/>/g,":pa:");
			text = text.replace(/<img src='\/img\/icons\/ui\/moral.png' alt='moral' \/>/g,":moral:");
			text = text.replace(/<img class='paslot' src='\/img\/icons\/ui\/pa_slot2.png' alt='pm'\/>/g,":pm:");
			mus.showText(text);
		},{'room' : 'Infirmerie'}));
	mus.addToMenu(new MushUserScriptAction('Inventaire',function()
		{
			var infos = $("#input");
			var text = '**'+infos.attr('d_name')+'** : ';
			var childs = $("#room").children(':not(.cdEmptySlot)');
			if (childs.size() > 0)
			{
				childs.each(function()
				   {
						var li = $(this);
						var datatip = li.attr('data-tip');
						var dataName = li.attr('data-name');
						if(dataName.indexOf('namey10:Cach%C3%A9g') ==-1)
						{
							var qte = li.children('.qty:first');
							if(qte.text() != null)
								text += qte.text().trim() + ' ';
						   text += unserialize(datatip,'name');
						   for(var name in inventoryIcon)
						   {
								if (dataName.indexOf(name) != -1)
								{
									text += ' '+inventoryIcon[name];
								}
						   }
						   text +=', '
						}
				   });
				text = text.substring(0,text.length-2);
			}
			else
				text += 'vide';
			
			mus.showText(text);
		}));
	mus.addToMenu(new MushUserScriptAction('Trouver non lu', function(e)
		{	
			if( $('#cdStdWall').css('display') == 'none')
			{
				$('#walltab').click();
			}
			var scroll = $('#chatBlock');
			var mess = $(":first #cdStdWall .not_read");
			
			if(mess.css('display')=='none')
			{
				var table = mess.closest("table");
				table.find('.cdClps').slideDown().queue( function(e){table.siblings(":first a .showallreplies").slideUp(); return e();});			
			}
			scroll.animate({scrollTop: scroll.scrollTop() + mess.offset().top-scroll.offset().top-10 }, 1000);
		},[ function(){ return $(":first #cdStdWall .not_read").length != 0;}]));
		
	mus.addToMenu(new MushUserScriptAction('Projets',function()
		{
			var text = '//**Projets**// : \n';
			$(".cdProjCard").each(function()
				{
					var project = $(this).children();
					text += "**"+project.eq(0).text().trim()+"** : ";          
					text += project.eq(3).text().trim()+"\n";
			   });
			mus.showText(text);
		},{'ismodule' : 'true', 'moduletitle' : 'Coeur de NERON'}));  
	mus.addToMenu(new MushUserScriptAction('Recherches',function()
		{
			var text = '//**Recherches**// : \n';
			$(".cdLabTech").each(function()
				{
					var project = $(this).children();
					text += "**"+project.eq(0).text().trim()+"**";          
					text += " ("+project.eq(2).text().trim()+") : ";
					text += project.eq(3).text().trim()+"\n";
			   });
			mus.showText(text);
		},{'moduleid' : 'research_module'}));
		
	mus.addToMenu(new MushUserScriptAction('Plan&egrave;te(s)',function()
		{
			var text = '//**Planètes**// :';
			$("#navModule").children(':not(.planetoff).planet').each(function()
				{
					var planet = $(this);
					text += '\n**'+planet.children('h3:first').html()+'** : ';
					var infos = planet.find('.pllist:first').html();
					text += infos.match(/<span>Direction<\/span>(.*)<\/li>/)[1];
					text += " - " + infos.match(/<span>Fuel nécessaire<\/span>(.*)<\/li>/)[1]+ " Fuel \n";
					var nbCases = planet.find('img.explTag').size();
					var exploredCases = planet.find('img.explTag:not(.off)');
					text += exploredCases.size() + "/"+nbCases+" : "
					planet.find('img.explTag:not(.off)').each(function()
						{
							text += $(this).attr('onmouseover').match(/<h1>(.*)<\/h1>/)[1]+", ";
						});
					text = text.substring(0,text.length-2);						
				});
			mus.showText(text);
		},{'ismodule' : 'true', 'moduletitle': 'Terminal Astro'}));
	mus.addToMenu(new MushUserScriptAction('Terminal Bios',function()
		{
			var text = '//**Terminal BIOS**// : ';
			$('#biosModule ul.dev li').each(function()
			{
				var biosParam = $(this);
				text += '\n**'+biosParam.children('h3:first').text().trim()+'** : ';
				text += biosParam.find("input[checked='checked']").siblings('label').text();
			});
			
			mus.showText(text);
		},{'ismodule' : 'true', 'moduleid' : 'biosModule'}));
	mus.refresh();
	now = $("#input").attr('now');
	setInterval(function() 
		{
			var gameNow = $("#input").attr('now');
			if(gameNow != now)
			{
				now = gameNow;
				mus.refresh();
			}
		}, 1000);

}

window.addEventListener('load', startScript, false);

