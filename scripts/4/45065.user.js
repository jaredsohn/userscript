// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMokey/Manage User Scripts,
// select "Etsy GA Content Detail", and click Uninstall.
//
// --------------------------------------------------------------------
//
// 
//
// ==UserScript==
// @name          Etsy GA Content Detail 
// @description   Combines Etsy ref data in Google Analytics Content Detail Reports
// @include       https://www.google.com/analytics/reporting/content_title_detail*
// @include       https://www.google.com/analytics/reporting/top_content*
// @include       https://adwords.google.com/analytics/reporting/content_title_detail*
// @include       https://adwords.google.com/analytics/reporting/top_content*
// @author        Kevin Turgeon (kevin AT krtwood DOT com)
// @version       0.5
// 
// ==/UserScript==

var current_url;
var current_pgvw_elm;
var current_pgvw;
var current_str;


var direct=0, cat=0, cat1=0, cat2=0, cat3=0, search=0, vl_other=0, fp_feat=0;
var feat_seller=0, showcase=0, etsymini=0, fp_recent=0, fp_gg=0, vt_related=0;
var recently_listed_items=0, pounce=0, voter=0, api_craftcult=0, api_other=0;
var tre=0;

var user_ref_name = [];
var user_ref_pgvw = [];


// As of version 0.4 the script requests the data through the CSV export file
// rather than reading it from the table in the html so it has access to all the
// data not just however many rows are currently displaying.  

// Get info from page href to form a request for the CSV export



var export_request = 'https://www.google.com/analytics/reporting/export?fmt=2'
var page_href = window.location.href;
var page_index = page_href.indexOf('?')
var page_codes = page_href.substring(page_index+1).split('&');

for(var i=0; i<page_codes.length; i++) {
	if(page_codes[i].match('id=')) export_request += '&' + page_codes[i];
}
for(var i=0; i<page_codes.length; i++) {
	if(page_codes[i].match('pdr=')) export_request += '&' + page_codes[i];
}

export_request += '&cmp=average&limit=50000&gdfmt=nth_day';



if(page_href.match('top_content')) {
	export_request += '&rpt=content.TopContentReport';
} else {
	export_request += '&rpt=content.ContentByTitleDetailReport';
	for(var i=0; i<page_codes.length; i++) {
		if(page_codes[i].match('d1=')) export_request += '&' + page_codes[i].replace(/%20/g,'+');
	}
	export_request += '&tab=0&view=0&tchcol=0';		
}

var load=1;


// Get the CSV file

GM_xmlhttpRequest({
	method: 'GET',
	url: export_request,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},onreadystatechange: function(responseDetails) {
		if(load) {
			var divinsert = document.createElement("div");
			divinsert.innerHTML = '<br><p><font size=+2>Loading Data...</font></p><br>';
			divinsert.id = 'GAETSYLOAD';
			var elm = document.getElementById('ControlBar');
			elm.parentNode.insertBefore(divinsert, elm );
			load=0;
		}

	}, onload: function(responseDetails) {
		var loadingelm = document.getElementById('GAETSYLOAD');
		if (loadingelm) {
			loadingelm.parentNode.removeChild(loadingelm);
		}
		// The CSV data has a bunch of lines before the table we want
		var report_index = responseDetails.responseText.indexOf('# Table');
		var report_text = responseDetails.responseText.substring(report_index).split('\n');

	
		for(var i = 3; i < report_text.length-1; i++) {

			var current_line = report_text[i].split(',');
			current_url=current_line[0];
			current_pgvw=parseInt(current_line[1]);
			
			// I have seen some bad data in the CSV file that throws
			// everything out of whack, sanity check to try to prevent
			if(report_text[i].charAt(0) == '/' && current_pgvw) {
	
				
				// First look for all the known Etsy ref codes
	
				if(current_url.match('ref=cat')) {
					cat+=current_pgvw;

					// Cat1-3 are levels of sub categories
	
					if(current_url.match('ref=cat1')) {
						cat1+=current_pgvw;
					} else if(current_url.match('ref=cat2')) {
						cat2+=current_pgvw;
					} else if(current_url.match('ref=cat3')) {
						cat3+=current_pgvw;
					}
				} else if(current_url.match('ref=sr')) {
					search+=current_pgvw;

				} else if(current_url.match('ref=vl_other')) {	
					vl_other+=current_pgvw;
				} else if(current_url.match('ref=fp_feat')) {
					if(current_url.match('ref=fp_feat_13')) {
						feat_seller+=currentpgvw;
					} else {	
						fp_feat+=current_pgvw;
					}
				} else if(current_url.match('ref=sc')) {	
					showcase+=current_pgvw;
				} else if(current_url.match('ref=em')) {	
					etsymini+=current_pgvw;
				} else if(current_url.match('ref=fp_recent')) {	
					fp_recent+=current_pgvw;
				} else if(current_url.match('ref=fp_gg')) {	
					fp_gg+=current_pgvw;
				} else if(current_url.match('ref=vt_related') || current_url.match('ref=vt_other')) {	
					vt_related+=current_pgvw;
				} else if(current_url.match('ref=recently_listed_items')) {	
					recently_listed_items+=current_pgvw;
				} else if(current_url.match('ref=pounce')) {	
					pounce+=current_pgvw;
				} else if(current_url.match('ref=voter')) {	
					voter+=current_pgvw;
				} else if(current_url.match('ref=API')) {	
					if(current_url.match('ref=API_juln_CraftCult')) {
						api_craftcult+=current_pgvw;
					} else {
						api_other+=current_pgvw;
					}
				} else if(current_url.match('ref=tre')) {
					tre+=current_pgvw;		
				} else if(current_url.match('ref=')) {	
					// This is a ref code we don't know
					// First break the url after the ? into segments
					var x = current_url.indexOf('?');
					var split_url = current_url.substring(x+1).split('&');
					// Find the segment with the ref code
					for(var j=0; j<split_url.length; j++) {
						if(split_url[j].match('ref=')) {
							// This is our unknown ref code
							// Check if we have this code in our array
							var flag=0;
							for(var k=0; k<user_ref_name.length; k++) {
								if(user_ref_name[k] == split_url[j]) {
									// The ref code is in our array at position k
									user_ref_pgvw[k] += current_pgvw;
									flag=1;
								}
							}
							// if flag is still zero this is a new ref code
							if(flag==0) {
								var length = user_ref_name.length;
								user_ref_name[length] = split_url[j];
								user_ref_pgvw[length] = current_pgvw;
							}
						}
					}
				} else {
					direct+=current_pgvw;
				}
	
			}
		}

		DrawTable();

		

	}

});


function DrawTable() {

	var total= direct+cat+search+vl_other+fp_feat+showcase+feat_seller+fp_recent+etsymini+fp_gg+vt_related+recently_listed_items+pounce+voter+api_craftcult+api_other+tre;

	for(var i=0; i<user_ref_pgvw.length; i++) {
		total += user_ref_pgvw[i];
	}
	var percent;


	if(direct<total) {  //If all links are direct the table is not needed

		var insert = '<table width=700 border=0 cellpadding=10 cellspacing=0><tr><td> <table border=1 cellpadding=5 cellspacing=0><tr><th>Source</th><th>Pageviews</th><th>Percent</th></tr>';

		percent = direct/total*100;
		insert += '<tr><td width=200>Direct</td><td align=right>'+direct+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		if(cat) {
			percent = cat/total*100;
			insert += '<tr><td>Categories</td><td align=right>'+cat+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';
			insert += '<tr><td align=right>Main Cat</td><td align=right>'+cat1+'</td></tr>';
			insert += '<tr><td align=right>Sub-Cat</td><td align=right>'+cat2+'</td></tr>';
			insert += '<tr><td align=right>Sub-Sub-Cat</td><td align=right>'+cat3+'</td></tr>';
		}
		percent = search/total*100;
		if(search) insert += '<tr><td>Search</td><td align=right>'+search+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = vl_other/total*100;
		if(vl_other) insert += '<tr><td>Previous-Next Items</td><td align=right>'+vl_other+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = fp_feat/total*100;
		if(fp_feat) insert += '<tr><td>FP Treasury</td><td align=right>'+fp_feat+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = showcase/total*100;
		if(showcase) insert += '<tr><td>Showcase</td><td align=right>'+showcase+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = feat_seller/total*100;
		if(feat_seller) insert += '<tr><td>Featured Seller</td><td align=right>'+feat_seller+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = fp_recent/total*100;
		if(fp_recent) insert += '<tr><td>FP Recently Listed</td><td align=right>'+fp_recent+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = etsymini/total*100;
		if(etsymini) insert += '<tr><td>Etsy Mini or Storque</td><td align=right>'+etsymini+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = fp_gg/total*100;
		if(fp_gg) insert += '<tr><td>FP Gift Guide</td><td align=right>'+fp_gg+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = vt_related/total*100;
		if(vt_related) insert += '<tr><td>Sold Item Related</td><td align=right>'+vt_related+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = recently_listed_items/total*100;
		if(recently_listed_items) insert += '<tr><td>Recently Listed Items</td><td align=right>'+recently_listed_items+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = pounce/total*100;
		if(pounce) insert += '<tr><td>Pounce</td><td align=right>'+pounce+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = voter/total*100;
		if(voter) insert += '<tr><td>Storque Voter</td><td align=right>'+voter+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = tre/total*100;
		if(tre) insert += '<tr><td>Treasury East</td><td align=right>'+tre+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';


		percent = api_craftcult/total*100;
		if(api_craftcult) insert += '<tr><td>API CraftCult</td><td align=right>'+api_craftcult+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		percent = api_other/total*100;
		if(api_other) insert += '<tr><td>API Other</td><td align=right>'+api_other+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';

		for(var i=0; i<user_ref_pgvw.length; i++) {
			percent = user_ref_pgvw[i] / total*100;
			insert += '<tr><td>'+user_ref_name[i].substring(4) +'</td><td align=right>'+user_ref_pgvw[i]+'</td><td align=right>'+percent.toFixed(1)+'%</td></tr>';
		}
	
		insert += '<tr><td>Total</td><td align=right>'+total+'</td></tr>';
		insert += '';

		insert += '</table></td><td><p>This script will not update with changes to the date range.  You must have the date range set on the previous page.  The total should match the total pageviews but there are sometimes a few bad lines in the export data that are rejected.</p><br><p>Links without any ref codes are considered direct.  Not all areas of the site have ref codes.  From March 12-18, 2009 Category codes were mistakenly replaced with Showcase codes.  You can add your own ref codes to links you create by appending &ref=yourcodehere to the end of the url.</p></td></tr></table>'
	
		var divinsert = document.createElement("div");
		divinsert.innerHTML = insert;
		var elm = document.getElementById('ControlBar');
		elm.parentNode.insertBefore(divinsert, elm );
	}

}