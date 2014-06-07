// ==UserScript==
// @name           LastFM AdvancedSearch
// @namespace      ads
// @description    Adds ComboBox to specify Searchresults
// @include        http://www.last.fm/*
// @include        http://www.lastfm.*/*
// ==/UserScript==

var ads = function () {


	var xpath = function (query, doc) {
	    return doc.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	var optLine = "-------";
	var searchForm = xpath("//div[contains(@id, 'headerSearchbox')]//form", document).snapshotItem(0);
	var defaultSearchTerm = xpath("//input[contains(@name, 'q')]", document).snapshotItem(0).value;

	var check = function (val) {
		if(val == "foren") {
			searchForm.action = "/forum/search";
		}else{
			searchForm.action = "/music/";
		}
			
	}

	searchForm.name = "searchForm";

	var sBox = document.createElement("select");
		with(sBox) {
			name = "m";
			id = "ads_m";
			style.foat = "left";
			style.fontSize = "12px"; 
			style.margin = "5px 0px 0px 5px"; 
			style.border = "0";
			
			options[0] = new Option('Artist','artists');
			options[1] = new Option('Album','albums');
			options[2] = new Option('Track','tracks');
			options[3] = new Option('Tag','tags');
			options[4] = new Option('Label','labels');
			options[5] = new Option(optLine);
			options[6] = new Option('Groups','groups');
			options[7] = new Option('Foren','foren');
			options[8] = new Option('User','user');
			options[9] = new Option('Events','event');			
			options[10] = new Option('FAQ','faq');
			
			addEventListener('change',function () {
			
				var frm = document.forms[0];
				var txt = document.getElementById('searchInput');
				
				switch(this.value) {
					
					case "foren":
						frm.action = "/forum/search";
						break;
						
					case "groups":
						frm.action = "/users/groups";				
						txt.name = "s_bio";
						break;
						
					case "user":
						frm.action = "/users/";
						txt.name = "lookupvalue";
						var p = document.createElement("input");
							p.name = "lookupby";
							p.value = "s_username";
							p.type = "hidden";
						frm.appendChild(p);
						break;
						
					case "event":
						frm.action = "/events/";
						txt.name = "s";
						break;
						
					case "faq":
						frm.action = "/help/faq/";
						txt.name = "faqsearch";
						break;
						
					case optLine:
						break;
						
					default:
						frm.action = "/music/";
						break;
				}
				sr = eval("/" + defaultSearchTerm + "/");
				if(!sr.test(txt.value) && this.value != optLine) {
					frm.submit(); 
				}
				
			},false)
		}
		
	searchForm.appendChild(sBox);
}();