// ==UserScript==
// @name           Pennerprofil V2
// @namespace      11235813[Bande:Dritteliga Penner]
// @description    Zeigt Geld und Promille im Profil an, Erkennt falsche/vorgetaeuschte IDs, ist absolut taeuschungssicher, zeigt Bandeninfos
// @include        http://*pennergame.de/profil/*
// @include        http://*dossergame.co.uk/profil/*
// @include        http://*bumrise.com/profil/*
// @include        http://*menelgame.pl/profil/*
// @include		   http://*clodogame.fr/profil/*
// ==/UserScript==

script = {
	init:function() {
		this.profil_tabelle = document.getElementsByClassName('profil_tabelle')[0];
		this.name = this.get_name();
		this.profil_rows = this.profil_tabelle.getElementsByTagName('tr');
		this.prepare();
		//this.pets = init();
		url_main = document.location.hostname.replace(/(change|umts|highscore)/,'www');
		this.url_main = 'http://'+(url_main.match(/www/)?url_main:'www.'+url_main);
		url_sig = document.getElementsByClassName('avatar')[0].src;
		this.url_sig = url_sig.replace(/avatare\/.*?\.jpg/,'signaturen/');
		this.get_data();
		this.data = {};
	},
	get_name:function() {
		var headline = this.profil_tabelle.parentNode.getElementsByTagName('img')[1];
		var name = headline.src.match(/\/headline\/(.*?)\//)[1];
		return name;		
	},
	prepare:function () {
		var cells = this.get_cells(this.profil_rows[3]);
		cells[2].style.fontWeight = 'bold';
		cells[2].innerHTML = 'Geld:<br />Promille:';
		cells[3].innerHTML ='<small>Lade Infos..</small>';
		this.cash_target = cells[3];
		var cells = this.get_cells(this.profil_rows[4]);
		cells[2].style.fontWeight = 'bold';
		cells[2].innerHTML = 'Bandenpunkte:<br />Bandenplatz:<br />Mitglieder:';
		cells[3].innerHTML ='<small>Lade Infos..</small>';
		this.gang_target = cells[3];
	},
	get_cells:function(row) {
		return row.getElementsByTagName('td');
	},
	get_data:function() {
		GM_xmlhttpRequest
		({
		 	method:'get',
			url:this.url_main+'/dev/api/user.getname.xml?name='+this.name,
			onload:function (r) {
				var parser = new DOMParser();
        		var dom = parser.parseFromString(r.responseText, "application/xml");
				var cash = dom.getElementsByTagName('cash')[0];
				var cash = Boolean(cash) ? parseInt(cash.textContent,10) : false;
				var farbe = cash ? color(cash) : '#fff';
				var cash = cash ? format(cash) : '---';
				script.data.cash = cash;
				script.data.color = farbe;
				script.data.id = dom.getElementsByTagName('id')[0].textContent;
				var gang = dom.getElementsByTagName('id')[1].textContent;
				var gang = gang=='None' ? false : gang;
				script.data.gang = gang;
				if(script.data.gang) {
					GM_xmlhttpRequest
					({
		 				method:'get',
						url:script.url_main+'/dev/api/gang.'+script.data.gang+'.xml',
						onload:function (r) {
							var parser = new DOMParser();
        					var dom = parser.parseFromString(r.responseText, "application/xml");
							script.data.punkte = dom.getElementsByTagName('points')[0].textContent;
							script.data.platz = dom.getElementsByTagName('position')[0].textContent;
							script.data.member = dom.getElementsByTagName('member_count')[0].textContent;
							script.fill();
						}
					 });
				} else {
					script.fill();
				}
			}
		 });
	},
	fill:function() {
		this.cash_target.style.color = this.data.color;
		this.cash_target.style.fontWeight = 'bold';
		this.cash_target.innerHTML = this.data.cash;
		this.cash_target.innerHTML += '<br />'+this.get_sig();
		var gang_info = this.data.gang ? this.data.punkte+'<br />'+this.data.platz+'<br />'+this.data.member : '---';
		this.gang_target.innerHTML = gang_info;
		this.gang_target.style.verticalAlign = 'middle';
	},
	get_sig:function() {
	return '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="'+this.url_sig+script.data.id+'.jpg"></div>';
	}
}

//And Start. Yeha!
script.init();