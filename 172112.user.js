// ==UserScript==
// @name           LoU Planner Switcher
// @description    LoU util to switch between multiple city layout planners
// @namespace      Zzalan
// @include        lou-fcp.co.uk/*
// @include        *.lou-fcp.co.uk/*
// @include        *city.louopt.com/*
// @include        *louopt.com/*
// @version        1.0.0
// ==/UserScript==
/*
* Changelog
*/
(function() {


		var lps_btn = document.createElement('a');
		lps_url = document.URL.split("=");
		if (lps_url[0].indexOf('louopt')==-1) {
			lps_url[0]='http://city.louopt.com/?map'
		} else {
			lps_url[0]='http://www.lou-fcp.co.uk/map.php?map'
		}
		lps_btn.href=lps_url[0]+"="+lps_url[1];
		lps_btn.innerHTML='Switch';
		lps_btn.id='lps_switch';
		lps_btn.style.position = 'absolute';
		lps_btn.style.top = 0;
		lps_btn.style.right = 0;
		lps_btn.style.border= '3px outset #cb6';
		lps_btn.style.backgroundColor = '#dc7';
		lps_btn.style.color = '#000';
		lps_btn.style.fontFamily = 'Verdana'
		lps_btn.style.fontSize = '14px'
		lps_btn.style.margin='3px';
		lps_btn.style.padding='1px';
		document.body.appendChild(lps_btn);
		
		var lps_note = document.createElement('div');
		lps_note.id='lps_note';
		lps_note.style.position = 'absolute';
		lps_note.style.top = '100px';
		lps_note.style.right = 0;
		lps_note.style.width = '150px';
		lps_note.style.height = '200px';
		lps_note.style.fontFamily = 'Verdana'
		lps_note.style.fontSize = '14px'
		lps_note.style.border= '1px solid #cb6';
		lps_note.style.margin='3px';
		lps_note.style.padding='5px';
		lps_note.style.overflow='auto';
		lps_note.style.resize='vertical';
		var lps_txt = document.createElement('textarea');
		lps_txt.style.position = 'relative';
		//lps_txt.style.margin = '5px';
		lps_txt.style.height = '95%';
		lps_txt.style.width = '90%';
		lps_txt.style.overflow='hidden';
		lps_txt.style.resize='none';
		lps_note.appendChild(lps_txt);
		document.body.appendChild(lps_note);

})();
