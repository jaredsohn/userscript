// ==UserScript==
// @name           oGame.LT Mėgiamų šnipinėjimo ataskaitų išsaugojimas
// @namespace      ogc20-modules/
// @description    Savaitę saugo mėgiamiausias šnipinėjimo ataskaitas. Dirba tik su GreaseMonkey
// @version        1.0
// @include        http://*.ogame.lt/game/index.php?page=messages&session=*
// @exclude        http://uni*.ogame.lt/*
// ==/UserScript==
var Utils = {
	setValue: function(cookieName, cookieValue) {
		GM_setValue(cookieName, cookieValue);
	},
	getValue: function(cookieName) {
		return GM_getValue(cookieName);
	},
	log: function(str) {
		GM_log(str);
	},
	mC: document.getElementById('messageContent')
};
var Favors = {
	createButtons: function(e) {
		if (unsafeWindow.$("a.aFavorButton", Utils.mC).length > 0) return false;
		var a = unsafeWindow.$('<a>').attr({
			'href': '#',
			'id': 'ogc20ShowFavor',
			'title': '|Mėgiamos',
		}).addClass('tips').addClass('aFavorButton').append('<img height="16" width="16" src="img/icons/info.gif"/>');
		a.click(function(e) {Favors.ShowSpyReports(); return false;	});
		unsafeWindow.$("tr.last td:last", Utils.mC).append(a);
		Utils.mC.removeEventListener("DOMNodeInserted", Favors.createButtons, false);
		unsafeWindow.$("a.ajax_thickbox[href*='cat=7']", Utils.mC).each(function(i) {
			var id = this.id;
			var a = unsafeWindow.$('<a>').attr({
				'href': '#',
				'id': 'save' + id,
				'rel': id,
				'title': '|Išsaugoti',
			}).addClass('tips').append('<img height="16" width="16" src="img/icons/eject.gif"/>');
			a.click(function(e) {setTimeout(function() {Favors.saveSpyReport(id);}, 0);	return false;});
			unsafeWindow.$("#" + id + 'TR > .actions', Utils.mC).append(a);
		});
		Utils.mC.addEventListener("DOMNodeInserted", Favors.createButtons, false);
	},
	saveSpyReport: function(id) {
		for (i = 0; i < Favors.Favor.l.length; i++) 
			if (Favors.Favor.l[i] == id) {
				unsafeWindow.fadeBox('Ši ataskaita jau mėgiamiausiose');
				return false;
			}
		Favors.Favor['s' + id] = {'id': id};
		var tr = document.getElementById(id + 'TR');
		var tds = tr.getElementsByTagName('td');
		Favors.Favor['s'+id].n=tds[2].textContent.replace(/^[\t\s\n\r]+/g,'').replace(/[\t\s\n\r]+$/g,'');
		Favors.Favor['s'+id].d=tds[3].textContent.replace(/^[\t\s\n\r]+/g,'').replace(/[\t\s\n\r]+$/g,'');
		Favors.Favor['s' + id].sd = new Date().getTime();
		Favors.Favor.l.push(id);
		Favors.Fsave();
		if (unsafeWindow.$('.ogc20Ftable').length > 0) {
			unsafeWindow.$('.ogc20Ftable').remove();
			Favors.ShowSpyReports();
		}
	},
	Fsave: function(obj) {
		try {
			Utils.setValue('ogc20F', Favors.FullFavor.toSource());
			unsafeWindow.fadeBox('Pokyčiai išsaugoti');
		} catch (e) {}
	},
	ShowSpyReports: function() {
		if (unsafeWindow.$('.ogc20Ftable').length > 0) {
			unsafeWindow.$('.ogc20Ftable').remove();
			return false;
		}
		if (Favors.Favor.l.length > 0) {
			var tbl = unsafeWindow.$('<table cellspacing="0" cellpadding="0" id="mailz" class="ogc20Ftable list"><tr class="first"><th class="from">От</th><th class="subject">Тема</th><th class="date">Data</th><th class="action"/></tr></table>');
			for (i = 0; i < Favors.Favor.l.length; i++) {
				var id = Favors.Favor.l[i];
				var el = Favors.Favor['s' + id];
				text = '<tr id="' + el.id + 'TRF" class="entry trigger alt"><td class="from">Laivyno valdymas</td><td class="subject">' +
				'<a href="index.php?page=showmessage&amp;session='+unsafeWindow.session+
				'&amp;ajax=1&amp;msg_id='+el.id+'&amp;cat=7&amp;height=500&amp;width=770&amp;TB_iframe=1" id="'+
				el.id +'" class="ajax_thickbox">'+el.n+'</a></td><td class="date">'+el.d+
				'</td><td id="test" class="actions">'+
				'<a title="|Išrinti iš mėgiamų" class="ogc20Fdel tips" rel="'+el.id+
				'" href="#"><img width="16" height="16" src="img/icons/trash.gif"/></a></td></tr>';
				tbl.append(text);
			}
			unsafeWindow.$(Utils.mC).append(tbl);
			unsafeWindow.$('.ogc20Fdel', tbl).click(function(e) {
				var delid = this.rel;
				setTimeout(function() {Favors.delSpyReport(delid);}, 0);
				return false;
			});
			unsafeWindow.tb_initialize();
			unsafeWindow.initCluetipEventlist();
		} else {
			unsafeWindow.fadeBox('nėra išsaugotų ataskaitų');
		}
		return false;
	},
	delSpyReport: function(delid) {
		for (i = 0; i < Favors.Favor.l.length; i++) 
			if (Favors.Favor.l[i] == delid) {
				Favors.Favor.l.splice(i, 1);
				break;
			}
		if (Favors.Favor['s' + delid]) delete Favors.Favor['s' + delid];
		Favors.Fsave();
		unsafeWindow.$('.ogc20Ftable').remove();
		Favors.ShowSpyReports();
	},
	FullFavor: {},
	Favor: {},
	cHost: document.location.host.substr(0, 1),
	nick: unsafeWindow.$('#playerName>span').text()
}
if (Utils.getValue('ogc20F')) {
	Favors.FullFavor = eval(Utils.getValue('ogc20F'));
	try {
		Favors.Favor = Favors.FullFavor[Favors.cHost][Favors.nick];
	} catch (e) {}
}
if (!Favors.Favor.l) {
	Favors.FullFavor[Favors.cHost] = {};
	Favors.FullFavor[Favors.cHost][Favors.nick] = {};
	Favors.FullFavor[Favors.cHost][Favors.nick].l = [];
	Favors.Favor = Favors.FullFavor[Favors.cHost][Favors.nick];
}
Utils.mC.addEventListener("DOMNodeInserted", Favors.createButtons, false);