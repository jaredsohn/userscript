// ==UserScript==
// @name          WikiStat
// @author        Nathan Adams
// @description	  Adds edit history graphs to Wikipedia articles
// @include       http://*.wikipedia.org/*
// ==/UserScript==

var addStatGraph = function(e) {
	//Work out the page slug
  var edits_to_get = 250;
  var urlregexp = /^http:\/\/en\.wikipedia\.org\/wiki\/(.+)$/;
  var matches = urlregexp.exec(window.location);
  if(!matches) return;
  var title_slug = matches[1];
  var process_error = function(xml_details){
	  alert(xml_details.statusText);
  };
  var min = function(a,b){if(a<b) return a; return b;}
  var max = function(a,b){if(a>b) return a; return b;}
  var draw_chart = function(prelim_data)
  {
	  
	  var data = []; var labels = []; var colours = []; var total = 0;
	  for(var i = 0; i < prelim_data.length; i++) {
		  data.push(prelim_data[i][1]);
		  labels.push(prelim_data[i][0] + "(" + prelim_data[i][1] + ")");
		  colours.push(prelim_data[i][2]);
		  total += prelim_data[i][1];
	  }
	  for(var i = 0; i < data.length; i++) {
		  if(data[i] == 0) continue;
		  data[i] = min(max(1,data[i] * (100 / total)),100);
	  }
	  var img = document.createElement("img");
	  var colours_url = colours.join(",");
	  var data_url = data.join("|");
	  var labels_url = labels.join("|");
	  var title = "Age distribution of ";
	  if(total < edits_to_get) title += "all ";
	  else title += "last ";
	  title += total + " edits";
	  var google_url = "http://chart.apis.google.com/chart?chbh=22,8&cht=bvg&chs=350x180&chtt=" + title + "&chdl=" + labels_url + "&chco=" + colours_url + "&chd=t:" + data_url;
	  img.setAttribute("src",google_url);
	  return img;
  }
  
  var draw_pie = function(data)
  {
	  var data_url = data.join(",");
	  var labels_url = "Reverts (" + data[0] + ")%7COther (" + data[1] + ")";
	  var google_url = "http://chart.apis.google.com/chart?cht=p3&chs=315x140&chtt=&chl=" + labels_url + "&chco=ffcc00,ff9900&chd=t:" + data_url;
	  var img = document.createElement("img");
	  img.setAttribute("src",google_url);
	  return img;
  }
  
  var process_history = function(xml_details) {
	  var page = xml_details.responseText;
	  var history_body = document.createElement("iframe");
	  history_body.innerHTML = xml_details.responseText;
	  
	  var dates = []
	  var dateregexp = /([0-9]{2}):([0-9]{2}), ([0-9]{1,2}) ([a-z]+) ([0-9]{4})<\/a>/gi;
	  var regmatch = dateregexp.exec(page);
	  if(!regmatch) return;
	  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	  while(1) {
		  var m = 1;
		  for(var i=0; i<12;i++)
		  {
			  if(months[i] == regmatch[4])
			  {
				  m=i;
				  break;
			  }
		  }
		  var d = new Date(parseInt(regmatch[5],10),m,parseInt(regmatch[3],10),parseInt(regmatch[1],10),parseInt(regmatch[2],10));
		  dates.push(d);
		  regmatch = dateregexp.exec(page);
		  if(!regmatch) break;
	  };
	  var revertregexp = /revert|undid/gi;
	  total_reverts = 0;
	  while(1){
		  regmatch = revertregexp.exec(page);
		  if(!regmatch) break;
		  total_reverts++;
	  }
	  var current = new Date();
	  var total_last_six_hours = 0;	var six_hours_ago = new Date(); six_hours_ago.setUTCHours(six_hours_ago.getUTCHours() - 6);
	  var total_last_day = 0; var one_day_ago = new Date(); one_day_ago.setUTCDate(one_day_ago.getUTCDate() - 1);
	  var total_last_week = 0; var last_week = new Date(); last_week.setUTCDate(last_week.getUTCDate() - 7);
	  var total_last_month = 0; var last_month = new Date(); last_month.setUTCMonth(last_month.getUTCMonth() - 1);
	  var total_last_six_months = 0; var six_months_ago = new Date(); six_months_ago.setUTCMonth(six_months_ago.getUTCMonth() - 6);
	  var total_last_year = 0; var last_year = new Date(); last_year.setUTCFullYear(last_year.getUTCFullYear() - 1);
	  var total_older = 0;
	  for(var i = 0; i < dates.length; i++)
	  {
		  var d = dates[i];
		  if(d > six_hours_ago){ total_last_six_hours ++; continue;}
		  if(d > one_day_ago){ total_last_day ++; continue;}
		  if(d > last_week){total_last_week ++; continue;}
		  if(d > last_month){total_last_month ++; continue;}
		  if(d > six_months_ago){total_last_six_months ++; continue;}
		  if(d > last_year){total_last_year ++; continue;}
		  total_older ++;
	  }

	  var data = [["< 6 hours",total_last_six_hours,"ffff00"],
				   ["< 24 hours",total_last_day,"ffcc00"],
				   ["< 7 days",total_last_week,"ff9900"],
				   ["< 1 month",total_last_month,"ff6600"],
				   ["< 6 months",total_last_six_months,"ff3300"],
				   ["< 1 year",total_last_year,"ff0000"],
				   ["Older",total_older,"990000"]];

	 
	  var graph = draw_chart(data);
	  var pie = draw_pie([total_reverts,dates.length - total_reverts]);
	  var container = document.createElement("div");
	  container.appendChild(graph);
	  container.appendChild(pie);
	  document.getElementById("siteSub").appendChild(container);
  };
  var history_url = document.getElementById("ca-history").firstChild.getAttribute("href");
  GM_xmlhttpRequest({method:"GET",url: "http://en.wikipedia.org" + history_url + "&limit=" + edits_to_get,onload: process_history,onerror: process_error});
};

window.addEventListener("load", addStatGraph, false);
