// ==UserScript==
// @name            Flickr Quick Comment
// @description     Adds a select box with pre written comments. Derived from Steeev Group Promotion Tool
// @author          Pierre Andrews. (code base Steeev http://steeev.f2o.org/, pt translation by Perla* <http://www.flickr.com/photos/bobnperla/>)
// @namespace       http://6v8.gamboni.org/
// @include         http://*flickr.com/photos/*
// @include         http://*flickr.com/groups/*/discuss*
// @include         http://*flickr.com/groups*
// @include         http://*flickr.com/photos/*/editcomment*
// @exclude         http://*flickr.com/groups/*/pool*
// @exclude         http://*flickr.com/groups/*/admin*
// @exclude         http://*flickr.com/groups/*/map*
// @exclude         http://*flickr.com/groups_members*
// @exclude         http://*flickr.com/groups_invite*
// @version         0.9
// ==/UserScript==

// ======================================================================
// To add a new quickcomment, go in the menu tools->User Scripts commands->Add new quick comment and fill the fields.
// The name is what will apear in the select box.
// The comment is what will be added at the cursor position of the current comment field. This field will autofill with what you have selected on the page.
// ======================================================================

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Group Promotion Tool", and click Uninstall.
//
// --------------------------------------------------------------------

(function() {

	var quicktags = new Array();

		/***********************************************************************
	 * Flickr Localisation
	 **********************************************************************/

	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}

	var FlickrLocaliser = function(locals) {
		this.init(locals);
	}
	FlickrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var langA = $x1("//p[@class='LanguageSelector']//a[contains(@class,'selected')]");
				if(langA) {
					var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
					if(matches && matches[1]) {
						this.selectedLang = matches[1];
						return this.selectedLang;
					}
				}
				return false;
			} else return this.selectedLang;
		},

		init: function(locals) {
			this.localisations = locals;
		},

		localise: function(string, params) {
			if(this.localisations && this.getLanguage()) {
				var currentLang = this.localisations[this.selectedLang];
				if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
				var local = currentLang[string];
				if(!local) {
					local = this.localisations[this.localisations.defaultLang][string];
				} 
				if(!local) return string;
				for(arg in params) {
					var rep = new RegExp('@'+arg+'@','g');
					local = local.replace(rep,params[arg]);
				}
				local =local.replace(/@[^@]+@/g,'');
				return local;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/


	var localiser = new FlickrLocaliser({
			'en-us' :{
				'Name':'Name',
				'choose_name': 'Choose a name',
				'Comment': 'Comment',
				'Add':'Add',
				'Cancel':'Cancel',
				'prompt_comment': "Add a new quick comment",
				'Save':'Save',
				'edit_comments': "Edit quick comments",
				'quick_comments' : 'Quick Comment',
				'add_title' : 'Add A New Quick Comment',
				'edit_title' : 'Edit saved quick comments (uncheck to remove)'
			},
			'fr-fr': {
				// A
				'Add' : 'Ajouter',
				// C
				'Cancel' : 'Annuler',
				'Comment' : 'Commentaire',
				// N
				'Name' : 'Nom',
				// S
				'Save' : 'Sauver',
				// C
				'choose_name' : 'Choisir un nom',
				// E
				'edit_comments' : 'Editer la liste de commentaires',
				// P
				'prompt_comment' : 'Ajouter un nouveau commentaire',
				'quick_comments' : 'Commentaires Faciles',
				'add_title' : 'Ajouter Un Nouveau Commentaire Facile',
				'edit_title' : 'Editer les commentaires faciles existants (d&eacute;cocher pour enlever)'
			},
			'pt-br': {
				// A
				'Add' : 'Adicionar',
				// C
				'Cancel' : 'Cancelar',
				'Comment' : 'Coment&aacute;rio',
				// N
				'Name' : 'Nome',
				// S
				'Save' : 'Salvar',
				// A
				'add_title' : 'Adicionar coment&aacute;rio r&aacute;pido',
				// C
				'choose_name' : 'Escolher um nome',
				// E
				'edit_comments' : 'Editar coment&aacute;rio r&aacute;pido',
				'edit_title' : 'Editar coment&aacute;rio r&aacute;pido salvo (desmarcar para remover)',
				// P
				'prompt_comment' : 'Adicionar um novo coment&aacute;rio r&aacute;pido',
				// Q
				'quick_comments' : 'Coment&aacute;rio r&aacute;pido'
			},
			defaultLang:'en-us'
		});

	//from http://www.nabble.com/-greasemonkey-users--GM_setValue-loses-unicode-characters-t2840046.html#a7943662
	function encode_utf8( s )
		{
			return unescape( encodeURIComponent( s ) );
		}
	
	function decode_utf8( s )
		{
			return decodeURIComponent( escape( s ) );
		} 

	function save() {
		var value = '';
		for each(q in quicktags) {
			value += '@#@'+q[0]+'{#}'+q[1];
		}
		value = value.substr(3);
		GM_setValue('quicktag',encode_utf8(value));
	}
	
	function load() {
		var value = decode_utf8(GM_getValue('quicktag'));
		if(value) {
			var split = value.split('@#@');
			for each(q in split) {
				var s = q.split('{#}');
				quicktags.push(new Array(s[0],s[1]));
			}
			quicktags.sort();
		}
	}

	function createAutoCommenter() {
		
		var autocommenter="&nbsp;<form name='sfcommentform'>";

		if(quicktags.length >0) {
			autocommenter+="<select name='sfquicktag' onchange='sf_gpt_addcomment(document.forms.sfcommentform);'><option value='0'>-- "+localiser.localise('quick_comments')+" --</option>";
			for (i=0;i<quicktags.length;i++) {
				var label = quicktags[i][0];
				var value = quicktags[i][1];
				autocommenter += '<option value="'+i+'">' +label +'</option>';
			}
			autocommenter += "</select>";
		}
		
		autocommenter += "</form>";
		return autocommenter;
	}

	load();
	arse=document.createElement('span');

	var prompt_autocomment = function() {
		var select = unsafeWindow.getSelection();

		var back = document.body.appendChild(document.createElement('div'));
		back.id="poolCleaningBack";
		back.setAttribute('style',"position:absolute;background-color: black;opacity: 0.35; display: block; left: 0pt;");
		back.style.width = document.body.clientWidth+'px';
		back.style.height = document.body.clientHeight+'px';
		back.style.top = document.body.scrollTop+'px';
		var modal = document.body.appendChild(document.createElement('div'));
		modal.id="poolCleaning";
		modal.setAttribute('style',"position:absolute;background:white;border: 3px solid black;display: block;");
		modal.style.width = (document.body.clientWidth*2/3) +'px';
		modal.style.left = (document.body.clientWidth*1/6) +'px';
		modal.innerHTML = '<div style="padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;">'+localiser.localise('add_title')+'</div>';
		modal.style.top = document.body.scrollTop+(document.body.clientHeight/2)+'px';
		
		var dialog = modal.appendChild(document.createElement('div'));
		dialog.setAttribute('style',"padding: 18px 16px;clear:both; width:100%;");
		var content = dialog.appendChild(document.createElement('div'));
		var l1 = content.appendChild(document.createElement('label'))
		l1.innerHTML = localiser.localise('Name')+':';
		l1.style.clear="both";
		var vname = content.appendChild(document.createElement('input'));
		vname.type="text";
		vname.value = localiser.localise("choose_name");
		
		content.appendChild(document.createElement('br'));
		var l2 = content.appendChild(document.createElement('label'));
		l2.innerHTML = localiser.localise('Comment')+':';
		content.appendChild(document.createElement('br'));
		var text = content.appendChild(document.createElement('textarea'));
		text.rows= 10;
		text.innerHTML = select;
		text.setAttribute('style','width: 90%');
		
		var buttons = dialog.appendChild(document.createElement('div'));
		var ok = buttons.appendChild(document.createElement('button'));
		ok.type ='button';
		ok.className='Butt';
		ok.innerHTML = localiser.localise('Add');
		var cancel = buttons.appendChild(document.createElement('button'));
		cancel.type ='button';
		cancel.className = 'Butt';
		cancel.innerHTML = localiser.localise('Cancel');
		
		cancel.addEventListener('click',function() {
									document.body.removeChild(back);
									document.body.removeChild(modal);
								},true);
		
		
		ok.addEventListener('click',function() {
								quicktags.push(new Array(vname.value,text.value));
								save();
								arse.innerHTML = createAutoCommenter();
								document.body.removeChild(back);
								document.body.removeChild(modal);
							},true);
		
		modal.style.top = document.body.scrollTop+((document.body.clientHeight-modal.scrollHeight)/2)+'px';
	};
	GM_registerMenuCommand(localiser.localise("prompt_comment"), prompt_autocomment);

	
	var prompt_editautocomment = function() {
		var select = unsafeWindow.getSelection();

		var back = document.body.appendChild(document.createElement('div'));
		back.id="poolCleaningBack";
		back.setAttribute('style',"position:absolute;background-color: black;opacity: 0.35; display: block; left: 0pt;");
		back.style.width = document.body.clientWidth+'px';
		back.style.height = document.body.clientHeight+'px';
		back.style.top = document.body.scrollTop+'px';
		var modal = document.body.appendChild(document.createElement('div'));
		modal.id="poolCleaning";
		modal.setAttribute('style',"position:absolute;background:white;border: 3px solid black;display: block;");
		modal.style.width = (document.body.clientWidth*2/3) +'px';
		modal.style.left = (document.body.clientWidth*1/6) +'px';
		modal.innerHTML = '<div style="padding:12px;background-color: #EEEEEE;clear:both;font-size: 14px;">'+localiser.localise('edit_title')+'.</div>';
		modal.style.top = document.body.scrollTop+(document.body.clientHeight/2)+'px';
		
		var dialog = modal.appendChild(document.createElement('div'));
		dialog.setAttribute('style',"padding: 18px 16px;clear:both; width:100%;overflow:auto;");
		var content = dialog.appendChild(document.createElement('div'));
		var ul = document.createElement('ul');
		var inputs = new Array();
		for (i=0;i<quicktags.length;i++) {
			var label = quicktags[i][0];
			var value = quicktags[i][1];
			var li = document.createElement('li');
			var l1 = li.appendChild(document.createElement('label'));
			l1.innerHTML = label;
			var vname = document.createElement('input');
			vname.type="checkbox";
			vname.value = i;
			vname.checked = true;
			li.appendChild(vname);
			ul.appendChild(li);
			inputs.push(vname);
		}
		content.appendChild(ul);
		
		var buttons = dialog.appendChild(document.createElement('div'));
		var ok = buttons.appendChild(document.createElement('button'));
		ok.type ='button';
		ok.className='Butt';
		ok.innerHTML = localiser.localise('Save');
		var cancel = buttons.appendChild(document.createElement('button'));
		cancel.type ='button';
		cancel.className = 'Butt';
		cancel.innerHTML = localiser.localise('Cancel');
		
		cancel.addEventListener('click',function() {
									document.body.removeChild(back);
									document.body.removeChild(modal);
								},true);
		
		
		ok.addEventListener('click',function() {
				new_q = new Array();
				for each(inp in inputs) {
						if(inp.checked)
							new_q.push(quicktags[inp.value]);
					}
				quicktags = new_q;
				save();
				arse.innerHTML = createAutoCommenter();
				document.body.removeChild(back);
				document.body.removeChild(modal);
			},true);
		
		modal.style.top = document.body.scrollTop+((document.body.clientHeight-modal.scrollHeight)/2)+'px';
	};
	GM_registerMenuCommand(localiser.localise('edit_comments'), prompt_editautocomment);
	
	var w;
	if (unsafeWindow) 
		w=unsafeWindow;
	else
		w=window;
	
	w.sf_gpt_addcomment=function(theform) {
		
		thisTextArea = document.evaluate(
										 "//textarea[@name='message']",
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE, null
										 ).singleNodeValue;
		
		if(thisTextArea) {
			mesg = '';
			if(theform.sfquicktag.selectedIndex != 0)
				mesg += quicktags[theform.sfquicktag.options[theform.sfquicktag.selectedIndex].value][1];
			
			try {
				thisTextArea.value = thisTextArea.value.substr(0,thisTextArea.selectionStart) 
					+ mesg
					+ thisTextArea.value.substr(thisTextArea.selectionStart);
			} catch(e) {
				thisTextArea.value += mesg;
			}
		}
	}
	
	arse.innerHTML= createAutoCommenter();
	var thisLink;
	if(document.location.pathname.indexOf('photos/') >= 0) {		
		if(document.location.pathname.indexOf('editcomment') >= 0) {
			thisLink = document.evaluate('//td[@id=\'GoodStuff\']/h3',
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE,
										 null
										 ).singleNodeValue;	

			if(thisLink)
				thisLink.parentNode.insertBefore(arse, thisLink.nextSibling);			
		} else {
			var allLinks, thisLink;
			allLinks = document.evaluate('//div[@id="DiscussPhoto"]/h3',
										 document,
										 null,
										 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										 null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				thisLink = allLinks.snapshotItem(i);
				thisLink.parentNode.insertBefore(arse, thisLink.nextSibling);
			}
		}
	} else if(document.location.pathname.indexOf('discuss/') >= 0) {		
		if(document.location.pathname.indexOf('edit') >= 0) {
			thisLink = document.evaluate('//td[@id=\'GoodStuff\']/form/p[1]/textarea',
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE,
										 null
										 ).singleNodeValue;	
			if(thisLink)
				thisLink.parentNode.insertBefore(arse, thisLink);
		} else {
			thisLink = document.evaluate(
										 '//div[@id=\'DiscussTopic\']//td/h3',
										 document,
										 null,
										 XPathResult.FIRST_ORDERED_NODE_TYPE,
										 null
										 ).singleNodeValue;	
			if(thisLink)
				thisLink.parentNode.insertBefore(arse, thisLink.nextSibling);
		} 
	} else if(document.location.pathname == "/groups_newtopic.gne") {
		thisLink = document.evaluate('//td[@id=\'GoodStuff\']/form/table/tbody/tr[2]/td[2]/textarea',
									 document,
									 null,
									 XPathResult.FIRST_ORDERED_NODE_TYPE,
									 null
									 ).singleNodeValue;	
		if(thisLink)
			thisLink.parentNode.insertBefore(arse, thisLink);

	}
})();
