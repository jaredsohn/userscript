// ==UserScript==
// @name        Ubuntu-it Unity Integration
// @description Ubuntu-it Unity Integration
// @include     http://forum.ubuntu-it.org/*
// @grant       none
// ==/UserScript==

if( (typeof unsafeWindow) != 'undefined' ){
    var $ = unsafeWindow.jQuery;
    var console = unsafeWindow.console || {log:function(){}};
}

window.Unity = external.getUnityObject(1.0);

var all = { 
	17: 'Novità e aggiornamenti',
	42: 'Prime informazioni sul mondo Ubuntu',
	43: 'Dilemmi del Principiante',
	30: 'Installazione e aggiornamento del sistema operativo',
	08: 'Applicazioni',
	73: 'Multimediale',
	54: 'Software educazionale',
	88: 'Tecnologie assistive',
	09: 'Driver e periferiche',
	37: 'PowerPC e ARM',
	49: 'Connessione e configurazione delle reti',
	28: 'Ubuntu su server',
	10: 'Gnome',
	35: 'KDE',
	95: 'LXDE',
	53: 'XFCE',
	58: 'Altri ambienti desktop e window manager',
	15: 'Personalizzazione dell\'ambiente desktop',
	70: 'Progetti della Comunità',
	33: 'Programmazione',
	34: 'Sicurezza',
	16: 'Ubuntu in Sviluppo (Saucy Salamander 13.10)',
	40: 'Community Council',
	46: 'Gruppo Documentazione',
	32: 'Gruppo Forum',
	85: 'Gruppo Promozione',
	76: 'Gruppo Sviluppo',
	45: 'Gruppo Web',
	55: 'Bacheca eventi',
	13: 'Bar Sport',
	67: 'Bar Ubuntu',
};
	
function redirectToSection( n ){
	var url = 'http://forum.ubuntu-it.org/viewforum.php?f='+n;
    return redirect(url);
}

function redirect(url){
	return function(){ window.location.href = url; }
}

function buildCheck(id, label){
	var check = $('<p style="display: inline-block; width: 150px;"><input id="set'+id+'" value="'+id+'" type="checkbox"><label for="set'+id+'">'+label+'</label></p>');
	check.hover( 
		function() {
			$(this).css('font-weight','bold');
		},
		function() {
			$(this).css('font-weight','normal');
		}
	);
	check.click(function(){
		var cb = $('input',this);
		cb.prop("checked", !cb.prop("checked"));
	});
	return check;
}

function settings(){
	
	var p = 20;
	var t = 20;
	var l = 20;
	var w = $(window).width() - 2*l - 2*p;
	var h = $(window).height() - 2*t - 2*p;
	var div = $('<div style="position: fixed; box-shadow: 2px 2px 2px #333333; border: solid thin #333333; border-radius: 10px; top: '+t+'px; left: '+l+'px; width: 90%; max-width: '+w+'px; max-height: '+h+'px; overflow: auto; background-color: lightgrey; padding: '+p+'px;"></div>');
	div.append('<h2 style="text-shadow: 1px 1px white;">Seleziona le sezioni che vuoi visualizzare nella quicklist:</h2>');
	var div2 = $('<div style="overflow: auto;"></div>');
	div.append(div2);
	for( var id in all ){
		var check = buildCheck(id, all[id]);
		div.append(check);
	}
	
	var selected = getSelectedSections();
	$('#set'+selected.join(', #set'),div).prop('checked',true);

	var buttons = $('<p></p>');
	var btnSave = $('<button>Salva</button>').click(function(){
		var selected = [];
		$.each($('input',div),function(i,e){
			if( $(e).is(':checked') ){
				selected.push( parseInt( $(e).val() ) );
			}
		});
		setSelectedSections(selected);
		div.remove();
	});
	var btnCancel = $('<button>Annulla</button>').click(function(){
		div.remove();
	});
	buttons.append(btnSave).append(btnCancel);
	div.append(buttons);
	if( div.height() > $(window).height() ){
		div.css('overflow','auto');
		div.height( $(window).height() - 30 );
	}
	$(document.body).append(div);
}

function getSelectedSections(){
	var defaultActions = [43,30,8,9,49,33,22];
	try{
		var ls = localStorage.getItem('selectedSections');
		if( JSON.parse(ls) ){
			return JSON.parse(ls);
		}
	}
	catch(e){
		console.log(e);
		return defaultActions;
	}
	return defaultActions;
}

function setSelectedSections(selected){
	var ls = JSON.stringify(selected);
	localStorage.setItem('selectedSections', ls);
}

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function setupForumUbuntuIt(){
	Unity.Launcher.addAction('Messaggi privati', redirect('http://forum.ubuntu-it.org/ucp.php?i=pm&folder=inbox'));
	
	var selected = getSelectedSections();
		console.log(selected);
	for( var id in selected ){
		if( all[selected[id]] ){
			Unity.Launcher.addAction(all[selected[id]], redirectToSection(selected[id]));
		}
	}
	
	if( supports_html5_storage() ){
		Unity.Launcher.addAction('Impostazioni', settings);
	}
	
	var pms = parseInt($('a[href="./ucp.php?i=pm&folder=inbox"] strong').text());
	if( pms>0 ){
		Unity.MessagingIndicator.showIndicator(
			"Messaggi privati", 
			{
				count:  pms, 
				callback: redirect('http://forum.ubuntu-it.org/ucp.php?i=pm&folder=inbox')
			}
		);
	}
}

if( Unity ){
    Unity.init({ name: "Forum Ubuntu-it ",
            iconUrl: "http://design.ubuntu.com/wp-content/uploads/ubuntu-logo32.png",
            onInit: setupForumUbuntuIt });
}
