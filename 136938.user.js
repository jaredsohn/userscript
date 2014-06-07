// ==UserScript==
// @name           JVC_Nick
// @namespace      JVScript
// @include        http://www.jeuxvideo.com/forums/3-* 
// @include        http://www.jeuxvideo.com/forums/1-* 
// @include        http://www.jeuxvideo.com/forums/0-* 
// ==/UserScript==

var $ = unsafeWindow.$;
//$('head').append('<link href="http://localhost/lightness/theme/ui.all.css" rel="stylesheet" type="text/css">');

var Pseudo = function() { }

Pseudo.prototype = {
	add: function(psd, mdp) {
		this.setValue(psd, mdp);
	},
	remove: function(psd) {
		var values = this.getValues()
		var tmp = []
		for each(var value in values) {
			if(value.pseudo != psd)
				tmp.push(value);
		}
		this.clear()
		for each(var value in tmp)
			this.add(value.pseudo, value.mdp);
	},
	clear: function() {
		GM_setValue('pseudo', '');
	},
	setValue: function(psd, mdp) {
		GM_setValue('pseudo', GM_getValue('pseudo', '') + this.normalize(psd, mdp)) 
	},
	getValue: function(psd) {
		var values = this.getValues();
		for each(value in values)
			if(value.pseudo === psd)
				return value;
	},
	getValues: function() {
		var values = []
		var str = GM_getValue('pseudo', '')
		if(str) {
			var tmp = str.split(' ;')
			for(var i = 0; i < tmp.length - 1; i++) {
				var p = tmp[i].split(' : ')
				values.push(
					{
						pseudo: p[0],
						mdp: p[1]
					}
				)
			}
		}	
		return values;
	},
	normalize: function(psd, mdp) {
		return psd + ' : ' + mdp + ' ;' //pseudo : mdp ;
	}
}

var PanelOptions = function() {
	$('head').append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css">');
	this.select = document.createElement('select')
	this.disco = document.createElement('select')
	this.inputPsd = document.createElement('input')
	this.inputMdp = document.createElement('input')
	this.btAdd = document.createElement('button')
	this.btRemove = document.createElement('button')
	this.btClear = document.createElement('button')
	this.pseudo = new Pseudo();
	this.dialog = null;
	this.init();
}

PanelOptions.prototype = {
	init: function() {
		this.select.setAttribute('multiple', 'true');
		var pseudos = this.pseudo.getValues()
		var _this = this
		$(this.select).css('width', '140px')
		$(this.btAdd).text('Ajouter')
		$(this.btRemove).text('Supprimer')
		$(this.inputPsd).attr('type', 'text')
		$(this.inputMdp).attr('type', 'password')
		$(this.btClear).text('Clear')
		for each(value in pseudos)
			this.select.add(new Option(value.pseudo, value.mdp), null)
			
		this.btAdd.addEventListener('click', function() {
			if($(_this.inputPsd).val() === '' || $(_this.inputMdp).val() === '')
				alert('Valeur(s) manquante(s)!')
			else {
				_this.pseudo.add($.trim($(_this.inputPsd).val()), $.trim($(_this.inputMdp).val()))
				_this.select.add(new Option($.trim($(_this.inputPsd).val()), $.trim($(_this.inputMdp).val())), null)
				$(_this.inputPsd).val('');
				$(_this.inputMdp).val('');
			}
		},false)
		
		this.btRemove.addEventListener('click', function(){
			if(_this.select.selectedIndex != -1) 
				if(confirm("Voulez-vous vraiment supprimer ce pseudo de la liste?")) {
					GM_setValue('selected', -1)
					_this.pseudo.remove(_this.select.options[_this.select.selectedIndex].text)
					_this.select.remove(_this.select.selectedIndex)
				}
		}, false);	
		this.btClear.addEventListener('click', function() {
			if(confirm("Voulez-vous vraiment supprimer tous les pseudos?")) {
				_this.pseudo.clear();	
				GM_setValue('selected', -1)
				var i = 0;
				while(_this.select.length)
					_this.select.remove(_this.select.length - 1)
			}
		}, false);
		
		this.disco.addEventListener('change', function() {
			if(_this.disco.selectedIndex != -1) {
				GM_setValue('disco', _this.disco.options[_this.disco.selectedIndex].value)
			}
		}, false);
		var global = document.createElement('div');
		var str = '<fieldset style="border: 1px solid silver"><legend>Options</legend><table style="width: 100%; height: 100%; text-align: right;"><tr><td><table><tr><td>*Pseudo : </td><td id="inpsd"></td></tr>'
		+ '<tr><td>*Mot de passe : </td><td id="inmdp"></td></tr>'
		+ '</td></tr><tr><td>Se d&eacute;connecter apr&egrave;s : </td></td></tr>'
		+ '</table></td><td id="inlist"></td><td><span id="inadd" ></span><br /><span id="inremove"></span><br /><span id="btclear"></span></td></tr></table><fieldset>';
		$(global).html(str);
		$(global).attr('id', 'psdManage');
		$(global).css('display', 'none');
		$('body').append(global);
		$('#inpsd').append(this.inputPsd)
		$('#inmdp').append(this.inputMdp)
		$('#inadd').append(this.btAdd)
		$('#inlist').append(this.select)
		$('#inremove').append(this.btRemove)
		$('#btclear').append(this.btClear)
		$('#indisco').append(this.disco)
	},
	show: function() {
		var _this = this
		if(this.dialog)
			$('#psdManage').dialog('open')
		else
			$('#psdManage').dialog({
				width: 600,
				height: 220,
				resizable: false,
				title: 'JVPseudo',
				show : 'puff',
				hide: 'puff',
				create: function() {
					_this.dialog = true
				},
				buttons: {
					Ok: function() {
						window.location.reload();
						$(this).dialog('close');
					}
				}
			});
	}
}

var Main = function() {
	this.pseudo = new Pseudo()
	this.panel = new PanelOptions()
	this.disco = parseInt(GM_getValue('disco', 2000))
	this.select = document.createElement('select')
	this.init();
	if(document.getElementById('bool_log'))
		this.setPseudos()
	else
		window.setTimeout(this.ajax, this.disco)
}

Main.prototype = {
	init: function() {
		var _this = this;
		var option = document.createElement('a')
		$(option).css('cursor', 'pointer')
		$(this.select).css('margin-left', '94px')
		$(option).text('JVPseudo')
		option.addEventListener('click', function() { _this.panel.show() }, false);
		$('#login_pass').after('<div id="jvnick"><label>JVNick:               </label></div><br />')
		$('#menu_interactif ul:first').append('<li id="nickmenu"></li>');
		$('#nickmenu').append(option)
		if(document.getElementById('bool_log')) {
			$('.login_memo:first').after('<div id="jvnick"><label>JVNick:               </label></div>')
			document.getElementById('bool_log').checked = false;
		}
	},
	ajax: function() {
		var _this = this
		GM_xmlhttpRequest({
			method: 'GET',
			url: document.getElementById('connect').getElementsByTagName('a')[0].getAttribute('href'),
			onload: _this.setPseudos
		});
	
	},
	setPseudos: function() {
		if(document.getElementById('bool_log')) {
			var values = this.pseudo.getValues()
			var _this = this
			this.select.add(new Option('== Choix ==', ''), null)
			for(var i = 0; i < values.length; i++)
				if(i == parseInt(GM_getValue('selected', -1)))
					this.select.add(new Option(values[i].pseudo, values[i].mdp, true), null)
				else
					this.select.add(new Option(values[i].pseudo, values[i].mdp), null)
			this.select.addEventListener('change', function() {
				if(_this.select.selectedIndex > 0) {
					GM_setValue('selected', _this.select.selectedIndex - 1)
					$('#newnom').val(_this.select.options[_this.select.selectedIndex].text)
					$('#mdpasse').val(_this.select.options[_this.select.selectedIndex].value)
				}
			}, false);
			$('#jvnick').append(this.select)
			if(parseInt(GM_getValue('selected', -1)) > 0) {			
				$('#newnom').val(_this.select.options[_this.select.selectedIndex].text)
				$('#mdpasse').val(_this.select.options[_this.select.selectedIndex].value)
			}
		}
	}
}

var main = new Main()
GM_addStyle('#psdManage button {width: 100%}');
