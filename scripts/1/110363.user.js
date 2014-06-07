// ==UserScript==
// @name          Color
// @description   Nouveau design pour la dial, version d4rk. V. 0.12
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php*
// @include		  http://goldensunworld.free.fr/v3/dialbox_pop_part2.php
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox=send&size=3
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox&size=3
// @include		  http://kyav.legtux.org/GSW/dialbox.html
// @include       http://goldensunworld.free.fr/v3/dialbox_pop_part2.php?*
// @author        Krabby
// @contributor   Ta mère
// ==/UserScript==

		var backgr = document.getElementsByTagName('body');
		backgr[0].style.color = '#deda68';
		backgr[0].style.backgroundColor = "#000000";
		
		var tables = document.getElementsByTagName('table');
		for (var i = 0, c=tables.length; i<c;i++) {
			tables[i].style.backgroundColor = '#000000';
			tables[i].style.color = "#deda68";
		}
		
		var traits = document.getElementsByTagName('hr');
		for (var i=0, c=traits.length; i<c; i++) {
			traits[i].style.color = '#deda68';
			traits[i].style.backgroundColor = '#deda68';
			traits[i].style.borderColor = "#deda68";
		}
		
		var textes = document.getElementsByTagName('font');
		for (var i=0, c=textes.length; i<c; i++) {
			textes[i].style.color = '#deda68';
		} 
		
		var els = document.getElementsByTagName('a')
		for (var i=0, c=els.length; i<c; i++) {
			
			if (els[i].className == "link_bleu") {
				els[i].style.color = "#FFFFFF";
				}
			else {
				els[i].style.color = "blue";
			}			
			els[i].style.textDecoration = "none";
		 }
		
		
		
		if (document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox=send&size=3" || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?size=3" || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?" ||  document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox&size=3" || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox&size=2" || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox&size=1" || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox=send&size=2"  || document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?size=2" ||  document.URL == "http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox=send&size=1" || document.URL =="http://goldensunworld.free.fr/v3/dialbox_pop.php?size=1" || document.URL == "file:///C:/Users/Lima/Desktop/Alexandre/Prog/Site/dialbox/dialbox_head.html" ) {
			var liensDial = document.getElementsByTagName('td');
				for (var i=0, c=liensDial.length; i<c;i++) {
					if (liensDial[i].getAttribute('colspan')=='3') {
						liensDial[i].innerHTML+='<font size=1> - &nbsp;<a href="http://goldensunw.free.fr/btf_project/info.php" alt="Lien bt\'f" onclick="window.open(\'http://goldensunw.free.fr\'); return false;">Accès au bt\'f</a></font>';
			
						var lesLiens = liensDial[i].getElementsByTagName('a');
						for (var i=0, c=lesLiens.length;i<c;i++) {
							lesLiens[i].style.color='#FFFFFF'
							lesLiens[i].style.textDecoration = "none";
							} 
				
					}
				}

	
	}
		
		