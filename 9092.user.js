// ==UserScript==
// @name           Site Meter Enhanced Details Page
// @namespace      http://fatknowledge.blogspot.com
// @description    Add entry, referral and location information plus total visits today to the details page
// @include        http://www.sitemeter.com/?a=s&s=*&r=8
// @include        http://www.sitemeter.com/?a=s&s=*&r=8&*
// @include        http://www.sitemeter.com/?a=stats&s=*&r=8
// @include        http://www.sitemeter.com/?a=stats&s=*&r=8&*
// ==/UserScript==

/*
v1.1 - Updated to work with new SiteMeter version released on 5/09/07
v1.2 - Updated to work with new SiteMeter version released on 7/01/07
v1.3 - Stop text wrapping in tables, add colors to referrals.  10/07/08

Possible problem:  If a new person visits your site between when you click on the details page and when the referral and location pages are loaded then those columns will be off as they will have an extra value at the top.  To fix it, you can just refresh the details page.

*/

//GM_log('Site Meter Enhanced Details Running');

//"main" table that has the elements we are changing
var main_t =document.getElementsByTagName("table")[7];

//header row with all the column names
var header_tr  = main_t.getElementsByTagName("tr")[1];

//modify existing page format and data
stretch_containerwide();
remove_right_advert();
remove_top_stuff();
modify_title_space();
change_col_headers();
remove_columns();


var sm_name = get_sm_name(window.content.location.href);
var site_name = get_site_name(document.title);
var v = get_v(window.content.location.href);


//connect to other pages to add additional columns of data and today's views
getTodaysViews('http://www.sitemeter.com/?a=stats&s='+sm_name+'&r=0');
getReferrals('http://www.sitemeter.com/?a=stats&s='+sm_name+'&r=11&v='+v);
getEntryPages('http://www.sitemeter.com/?a=stats&s='+sm_name+'&r=14&v='+v,site_name);
getLocations('http://www.sitemeter.com/?a=stats&s='+sm_name+'&r=89&v='+v);



//////////////////////
// Helper Functions
//////////////////////


//stretch the 'cotainerwide' div from 833 to 900 so the location column has a white background instead of 
//the grey background image
function stretch_containerwide(){
	addGlobalStyle('#containerwide {WIDTH: 900 ! important; }');
}

//remove the ad on the right hand side
function remove_right_advert(){
	//tought to get a handle on this object, so we just grab the td with a width of 141
	var tds = getElementsByAttribute(document.body, "td", "width", "120");
	tds[0].style.display = "none";
}

//remove top advertisement and site logo which is just taking up vertical space
function remove_top_stuff(){
	var top_t = document.getElementsByTagName("table")[0];
	var advert = top_t.getElementsByTagName("tr")[0];
	advert.style.display = "none";
	var logo = top_t.getElementsByTagName("tr")[5];
	logo.style.display = "none";
	var options_t = top_t.getElementsByTagName("tr")[9];
	options_t.style.display = "none";
	var spacer = top_t.getElementsByTagName("tr")[11];
	spacer.style.display = "none";
}

//stretch title row and remove "Recent Visitors by Visit Details"
function modify_title_space(){
	//stretch title row
	title_tr = main_t.getElementsByTagName("tr")[0];
	title_td = title_tr.getElementsByTagName("td")[0];

	title_td.setAttribute("colspan", "7");

	//remove "Recent Visitors by Visit Details" so there is more vertical space
	title_td.childNodes[2].style.display = "none";
}

//change font on column headers for more vert and horz space
function change_col_headers(){
	//col headers row
	details_td = header_tr.getElementsByTagName("td")[0];  
	details_td.innerHTML = '<font  size=\'2\' color="#FFFFFF" face="Arial"><b>Detail</b></font>';

	visit_td = header_tr.getElementsByTagName("td")[2];  
	visit_td.innerHTML = '<font  size=\'2\' color="#FFFFFF" face="Arial"><b>Visit Time</b></font>';
	//set colspan to 1 as we are removing the date column
	visit_td.setAttribute("colspan", "1");

	pages_td = header_tr.getElementsByTagName("td")[3];  
	pages_td.innerHTML = '<font  size=\'2\' color="#FFFFFF" face="Arial"><b>Pages</b></font>';

	length_td = header_tr.getElementsByTagName("td")[4];  
	length_td.innerHTML = '<font  size=\'2\' color="#FFFFFF" face="Arial"><b>Length</b></font>';
}


//remove details, domain name and visit date columns
//move link to details page from details column to date_time column
function remove_columns(){
	//hide details header
	details_td = header_tr.getElementsByTagName("td")[0];  
	details_td.style.display = "none";

	//hide Domain Name header
	domain_td = header_tr.getElementsByTagName("td")[1];  
	domain_td.style.display = "none";

	//loop through all of the data rows and hide appropriate columns and move details link
	var i=0;
	data_tr  = main_t.getElementsByTagName("tr")[2];

	while (data_tr.getElementsByTagName("td")[2]!=null){
		//Remove Details (actually 2 values as there is an inner table)
		data_tr.getElementsByTagName("td")[0].style.display = "none";
		//data_tr.getElementsByTagName("td")[1].style.display = "none";

		//Remove Domain 
		data_tr.getElementsByTagName("td")[2].style.display = "none";

		//Remove Visit Date
		data_tr.getElementsByTagName("td")[3].style.display = "none";  

		//add a link to the details page on the date time (well really just time)
		//this link was on the details column, but we axed it
		date_time_td = data_tr.getElementsByTagName("td")[4];
		date_time    = date_time_td.childNodes[0].childNodes[0].childNodes[0].data;
		details_url  = data_tr.getElementsByTagName("td")[1].childNodes[0];
		date_time_td.innerHTML = '<font size="2" face="Arial">&nbsp;<a href="'+details_url+'">'+date_time+'</a></font>';
		
		//go to next row
		i++;
		//there is a more or less empty row between the data rows, hence the 2*i
		data_tr  = main_t.getElementsByTagName("tr")[2*i+2];
	}
}


//tells what record to start with, needed to view the second page of results
function get_v(page_url){
	var v = 0;
	if (page_url.indexOf("&v=")!=-1){
		//this assumes the v is always at the end, could modify to check that there isn't another & after it
		v = page_url.substring(page_url.indexOf("&v=")+3);
	}
	return v;
}

//site name something like fatknowledge.blogspot.com/
//might have / on end or not, should probably standarize that
function get_site_name(page_title){
	if (page_title.indexOf('http://www.')!=-1){
		var site_start = page_title.indexOf('http://www.')+11;
	} else {
		var site_start = page_title.indexOf('http://')+7;
	}
	var site_name= page_title.substring(site_start);

	return site_name;
}

//http://www.sitemeter.com/?a=S&S=sm2fatknowledge&r=8
//the way SiteMeter refers to site. something like sm2fatknowledge
function get_sm_name(page_url){
	//GM_log(page_url);

	var site_start = page_url.indexOf('&s=');
	if (site_start==-1){
		site_start = page_url.indexOf('&S=');
	}
	var site_end = page_url.indexOf('&r',site_start);
	var site_url= page_url.substring(site_start+3,site_end);

	//GM_log(site_start +"|"+site_end +"|"+site_url);	
	return site_url;
}

function insert_col_header(text){
	var new_cell = document.createElement("td");
	new_cell.width=500;
	new_cell.setAttribute("align", "center");
	new_cell.setAttribute("bgcolor", "#316310");
	new_cell.innerHTML = '<font  size=\'2\' color="#FFFFFF" face="Arial"><b>'+text+'</b></font>';
	header_tr.appendChild(new_cell);
}

//connect to the summary of entry pages page and put data in a new column
function getEntryPages(wbUrl,site_name) {
	//GM_log('getEntryPages');

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			insert_col_header("Entry Page");
			
			//GM_log(responseDetails.responseText);	
			var entry_page = responseDetails.responseText;

			var x = 0;
			//loop through the data portion of the page
			//getting the entry page data and writing it to the data_row
			while (entry_page.indexOf('&nbsp;page&nbsp;view')!=-1){

				var row_start = entry_page.indexOf('&nbsp;page&nbsp;view');
				var unknown = entry_page.indexOf('unknown',row_start);
				var entry_start = entry_page.indexOf('<a href=\"',row_start)+9;

	//	GM_log(row_start +"|"+unknown +"|"+entry_start);	

				//entry will either be a url or "unknown"
				//if an unknown entry, then this will be false
				if (entry_start<unknown || unknown==-1){
					var entry_end = entry_page.indexOf('\"',entry_start);
					var entry_url= entry_page.substring(entry_start,entry_end);
					//trim out the part of the page we have just processed
					entry_page = entry_page.substring(entry_end);
				}else {
					var entry_url = "unknown";
					//trim out the part of the page we have just processed
					entry_page = entry_page.substring(unknown);
				}				

				//add entry page info to a new column in the table
				data_row  = main_t.getElementsByTagName("tr")[2*x+2];
				data_row.appendChild(make_entry_cell(entry_url, x, site_name));

				x++;
			}

		}
	});	
}

//format the entry page url, removing the site name, trimming to 25 spaces
function make_entry_cell(url, x, site_name){
	data_cell = document.createElement("td");
	data_cell.setAttribute("style", "white-space: nowrap");
	data_cell.setAttribute("align", "left");
    if (x % 2 == 0){
		data_cell.setAttribute("bgcolor", "#F5F5E2");
	}

	if (url=="unknown"){
		data_cell.innerHTML = '<font  size=\'2\' face="Arial">unknown</font>';
	} else {
		//remove the site_name from the text and limit the text to 25 chars
		var title = "http://"+site_name;
		var www_title = "http://www."+site_name;
		if (url.indexOf(title)!=-1){
			var text = url.substr(title.length,25);
		}else if (url.indexOf(www_title)!=-1){
			var text = url.substr(www_title.length,25);
		}else {
			var text = url.substring(0,25);
		}

		//remove any spaces
		text = text.replace(/\s+/g, '');
		if (text=='') text = "/";

		data_cell.innerHTML = '<font  size=\'2\' face="Arial"><a href="'+url+'">'+text+'</a></font>';
	}
	return data_cell;
}



function getReferrals(wbUrl) {
	//GM_log('getReferrals');

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			insert_col_header("Referral");
			
			//GM_log(responseDetails.responseText);	
			var ref_page = responseDetails.responseText;

			var x = 0;
			//loop through the data portion of the page
			//getting the referral page data and writing it to the data_row
			while (ref_page.indexOf('&nbsp;page&nbsp;view')!=-1){

				var row_start = ref_page.indexOf('&nbsp;page&nbsp;view');
				var unknown = ref_page.indexOf('unknown',row_start);
				var ref_start = ref_page.indexOf('<a href=\"',row_start)+9;
				
				//referral will either be a url or "unknown"
				//if an unknown referral, then this will be false
				if (ref_start<unknown || unknown==-1){
					var ref_end = ref_page.indexOf('\"',ref_start);
					var ref_url = ref_page.substring(ref_start,ref_end);
					//trim out the part of the page we have just processed
					ref_page = ref_page.substring(ref_end);
				}else {
					var ref_url = "unknown";
					//trim out the part of the page we have just processed
					ref_page = ref_page.substring(unknown);
				}
								
				//add entry page info to a new column in the table
				data_row  = main_t.getElementsByTagName("tr")[2*x+2];
				data_row.appendChild(make_ref_cell(ref_url, x));

				x++;
			}
		

		}
	});	
}

//format referral url 
//if from common search engine, reformat and display querty
function make_ref_cell(url, x){
	data_cell = document.createElement("td");
	data_cell.setAttribute("style", "white-space: nowrap");
	data_cell.setAttribute("align", "left");
    if (x % 2 == 0){
		data_cell.setAttribute("bgcolor", "#F5F5E2");
    }	

	if (url=="unknown"){
		data_cell.innerHTML = '<font  size=\'2\' color="brown" face="Arial">unknown</font>';
	}else {
		//take of http:// at beginnning
		text = url.substring(7);
		text = unescape(text);
		pretext ="";

		//http://images.google.com/imgres?hl=en&q=naked%20cycle%20chick&ie=UTF-8&oe=UTF-8&um=1&sa=N&tab=wi
       	if (text.search(/google.*\/imgres\?/)!=-1){
			//last 15 chars of imgurl, which is typically the name of the image like tiger.jpg
			result	= text.match(/imgurl=(.*)(.{15})&imgrefurl/);
			if (result!=null){
				imgurl = result[2];
			} else {
				q = text.match(/[&?]q=(.*)/)[1];
				if (q.indexOf("&")!=-1){
					q = q.substring(0,q.indexOf("&"));
				}
				imgurl = q;
			}
			pretext = "<font color='green'>Goog Img:</font> ";
			//take first 21 chars
			text = imgurl.substr(0,21);				
		}
		//if a google search (but not a www.google.com/ig/ page, which really should be called my.google.com)
		else if (text.search(/www.google/)!=-1 && text.search(/www.google.co.*\/ig/)==-1){
			//q is the query text
			t_match = text.match(/[&\?](as_)?q=(.*)/);
			if (t_match!=null){
				q = t_match[2];
				if (q.indexOf("&")!=-1){
					q = q.substring(0,q.indexOf("&"));
				}
				pretext = "<font color='orange'>Goog:</font> ";
				//take first 24 chars
				text = q.substr(0,24);				
			//if for some reason on query text
			} else {
				text = text.substr(0,30);				
			}
		} else {
			//take first 30 chars
			text = text.substr(0,30);
		}

		data_cell.innerHTML = '<font  size=\'2\' face="Arial">'+pretext+'<a href="'+url+'" title="'+url+'">'+text+'</a></font>';
	}
	
	return data_cell;
}

function getLocations(wbUrl) {
	//GM_log('getLocations');

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			//GM_log(responseDetails.responseText);	

			insert_col_header("Location");

			var loc_page = responseDetails.responseText;

			var x = 0;
			//loop through data section of page
			while (loc_page.indexOf('&nbsp;page&nbsp;view')!=-1){

				var row_start = loc_page.indexOf('&nbsp;page&nbsp;view');
				var img_start = loc_page.indexOf('images/flags/',row_start)+13;
				var img_end = loc_page.indexOf('.gif',img_start);
				var img = loc_page.substring(img_start,img_end);

				var font_text = "<font face=\'Arial\' size=\'2\'>";
				var country_start = loc_page.indexOf(font_text,img_end)+font_text.length;
				var country_end = loc_page.indexOf("</font>",country_start);
				var country = loc_page.substring(country_start, country_end);

				var city_start= loc_page.indexOf(font_text, country_end)+font_text.length;
				var city_end = loc_page.indexOf("</font>", city_start);
				var city = loc_page.substring(city_start, city_end);

				//insert country flag, city name and country info into cell
				data_row  = main_t.getElementsByTagName("tr")[2*x+2];
				data_row.appendChild(make_loc_cell(img, country, city, x));

				//trim out the part of the page we have just processed
				loc_page = loc_page.substring(city_end);
				x++;
			}
		

		}
	});	
}

//make cell with country flag, 20 chars of city name and country name as mouseover of flag
function make_loc_cell(img, country, city, x){
	data_cell = document.createElement("td");
	data_cell.setAttribute("style", "white-space: nowrap");
	data_cell.setAttribute("align", "left");
    if (x % 2 == 0){
		data_cell.setAttribute("bgcolor", "#F5F5E2");
    } else {
		data_cell.setAttribute("bgcolor", "#FFFFFF");
    }	

	//change non-breaking spaces to regular spaces so substring line works below (otherwise these spaces count as 5)
	//this is ok because the title sets the width of the column
	city = city.replace(/&nbsp;/g," ");

	city = city.substring(0,20);

	data_cell.innerHTML = "<img border='0' width='18' height='12' src='./images/flags/"+img+".gif' title='"+country+"'><font size='2' face='Arial'>&nbsp;"+city+"</font>";
	
	return data_cell;
}

//get number of views today and add it next to title
function getTodaysViews(wbUrl) {
	//GM_log('getTodaysViews');

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			//GM_log(responseDetails.responseText);	
			var today_page = responseDetails.responseText;

			//Today</font></TD><TD align="right" width=85><font face="Arial">152</font>

			var today_beg = today_page.indexOf('Today');
			var font_text = '<font face="Arial">';
			var today_start = today_page.indexOf(font_text,today_beg)+font_text.length;
			var today_end = today_page.indexOf("</font>",today_start);
			var today_num = today_page.substring(today_start, today_end);
			
			//take number of views today and insert it before the br_node that comes after the title
			br_node = title_td.childNodes[1];

			today_text = document.createElement("font");
			today_text.innerHTML = ' <font  size=\'2\' color="#FFFFFF" face="Arial"><b>'+today_num+' visits today</b></font>';

			br_node.parentNode.insertBefore(today_text, br_node);
		}
	});	
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\s)" + strAttributeValue + "(\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}