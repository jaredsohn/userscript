// ==UserScript==
// @name           Pardus Building Index Filter
// @namespace      pardus.at
// @description    Allows building index to be filtered by commodity
// @include        http://*.pardus.at/index_buildings.php*
// @version        0.9
// @author         Rhindon
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////



// ////////////////////////////////////////////////////////////////////////
// Beginning of Code:
// ////////////////////////////////////////////////////////////////////////

function showIndexFilter() {
	
	div = document.getElementsByTagName("div")[0];
	
	html = div.innerHTML;
	
	html += "Filter: <select id=\"filter\"><option value=\"\">Remove filter</option>";
	
	html += getFilterOptions();
	
	html += "</select><br>&nbsp;";
	
	div.innerHTML = html;
	
	document.getElementById("filter").addEventListener('change', filterIndex, true);
	
}

function getFilterOptions() {

	opt = "";

	imgs = document.getElementsByTagName("img");
	
	for(var i = 0; i < imgs.length; i++) {
	
		if(imgs[i].src.indexOf("/images/res/") > 0) {

			value=imgs[i].src;
			
			comName = imgs[i].src.substr(imgs[i].src.lastIndexOf('/') + 1);
			comName = comName.replace(/\.png/g, "").replace(/_/g, " ").replace(/-/g, " ");;
			
			newOpt = "<option value=\"" + value + "\">" + comName + "</option>";
			
			if(opt.indexOf(newOpt) < 0) opt += newOpt;
			
		}
	
	}

	return opt;
}

function filterIndex() {
	
	val = document.getElementById("filter").value;
	
	trs = document.getElementsByTagName("table")[4].getElementsByTagName("tr");
	
	for(var i = 1; i < trs.length; i++) {
		
		html = trs[i].innerHTML;
		
		trs[i].style.display="";

		if(html.indexOf(val) < 0 && html.indexOf("no automatic info") < 0) {		
			trs[i].style.display="none";
		}
	}
	
	
}

showIndexFilter();