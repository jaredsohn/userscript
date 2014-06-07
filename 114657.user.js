// ==UserScript==
// @name          	navigate on torrus graphs
// @namespace	none
// @description    	adds some functionality to torrus graphs
// ==/UserScript==

window.addEventListener("load", my_function, false); 

function my_function(){ 
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://joergbehrendt.com/css/navigate.css';
    link.media = 'all';
    head.appendChild(link);
    init();
}

var lastshort = "short";
var lastday = "last24h";
var lastweek = "lastweek";
var lastmonth = "lastmonth";
var lastyear = "lastyear";
var now;
var currentTime;

var all_images = new Array();
var all_images_times = new Array();
var all_images_lasts = new Array();
var all_images_titles = new Array();

function time_to_url_sufix(date){
	var month = date.getMonth() + 1;
	
	var day = date.getDate();
	var year = date.getFullYear();
	
	var hours = date.getHours()
	var minutes = date.getMinutes()
	
	if (minutes < 10){
	minutes = "0" + minutes;
	}
	if (month < 10){
	month = "0" + month;
	}
	if (day < 10){
	day = "0" + day;
	}
	return hours+":"+minutes+"_"+year+ "" + month + "" + day;	
}

function scroll_left_image(id){
	var l = all_images_lasts[id];
	var mult = 15;
	if(l == lastshort) mult = 15;
	if(l == lastday) mult = 60;
	if(l == lastweek) mult = 60*24;
	if(l == lastmonth) mult = 60*24*7;
	if(l == lastyear) mult = 60*24*30;
	var ms = all_images_times[id].getTime();
	ms -= 60000 * mult; //1min * scale
	all_images_times[id] = new Date(ms);
	var baseUrl = all_images[id].src.split("&NOW")[0];
	all_images[id].src = baseUrl + "&NOW="+time_to_url_sufix(all_images_times[id]);
	setTitle(id);
}

function scroll_right_image(id){
 	var l = all_images_lasts[id];
	var mult = 15;
	if(l == lastshort) mult = 15;
	if(l == lastday) mult = 60;
	if(l == lastweek) mult = 60*24;
	if(l == lastmonth) mult = 60*24*7;
	if(l == lastyear) mult = 60*24*30;
	var ms = all_images_times[id].getTime();
	ms += 60000 * mult; //1min * scale
	var cur = new Date().getTime();
	if(ms > cur) ms = cur;
	all_images_times[id] = new Date(ms);
	var baseUrl = all_images[id].src.split("&NOW")[0];
	all_images[id].src = baseUrl + "&NOW="+time_to_url_sufix(all_images_times[id]);
	setTitle(id);
}

function scroll_reset(id){
	
	all_images_times[id] = new Date();
	var baseUrl = all_images[id].src.split("&NOW")[0];
	all_images[id].src = baseUrl + "&NOW="+time_to_url_sufix(all_images_times[id]);
	setTitle(id);

}

function changeURL(id, last, to){
	
	var baseUrl = all_images[id].src.split("&")[0];
	var view = "";	
	if(last == null){
		view = "&view="+lastday;	
	}else{
		if(last == "S"){ all_images_lasts[id] = lastshort; view = "&view="+lastshort; }
		if(last == "D"){ all_images_lasts[id] = lastday; view = "&view="+lastday; }
		if(last == "W"){ all_images_lasts[id] = lastweek; view = "&view="+lastweek; }
		if(last == "M"){ all_images_lasts[id] = lastmonth; view = "&view="+lastmonth; }
		if(last == "Y"){ all_images_lasts[id] = lastyear; view = "&view="+lastyear; }
	}
	
	all_images[id].src = baseUrl + view + "&NOW="+time_to_url_sufix(all_images_times[id]);
	setTitle(id);
}

function getTitle(id){
	var last = "";
	var time = "";
	
	var d = all_images_times[id];
	var l = all_images_lasts[id];
	if(l == lastshort) last = "Last 6 hours";
	if(l == lastday) last = "Last day";
	if(l == lastweek) last = "Last week";
	if(l == lastmonth)  last = "Last month";
	if(l == lastyear)  last = "Last year";
	
	time = d.toLocaleDateString()+" - "+d.toLocaleTimeString();
	
	return last+"     before "+time+"";	
}

function setTitle(id){
	var t = getTitle(id);	
	document.getElementById("mytitle_"+id+"").innerHTML = ""+t;
}

function appendConfigToAll(id){
	var time = all_images_times[id];
	var last = all_images_lasts[id];
	var url_suffix = "&view="+last+"&NOW="+time_to_url_sufix(time);
	
	
	for (i = 0; i < all_images.length; i++) {
			all_images_times[i] = time;
			all_images_lasts[i] = last;
			all_images[i].src = all_images[id].src.split("&")[0]+url_suffix;
			setTitle(i);
	}	
}

function init(){
	var imgs = document.getElementsByTagName ("img");
	
	var default_begin_date = new Date();		
	var appendVdefault = "&view="+lastweek;
	var appendNdefault = "&NOW="+time_to_url_sufix(default_begin_date);
	
	for (i = 0; i < imgs.length; i++)
	{
		if (imgs[i].parentNode.className != "GraphImage"){
			alert(imgs[i].parentNode.className)
			continue;
		}else{				
				var id = all_images.length;	
				imgs[i].src = imgs[i].src.split("&")[0]+appendVdefault+appendNdefault;
								
				imgs[i].parentNode.innerHTML =  imgs[i].parentNode.innerHTML + "<div class=\"controls title\"><div id='mytitle_"+id+"'></div></div><div class=\"controls zoom\"><div title=\"Earlier\" onclick=\"scroll_left_image ('"+id+"');\">&#x2190;</div><div title=\"Later\"                  onclick=\"scroll_right_image ('"+id+"');\">&#x2192;</div>  <div title=\"Now\" onclick=\"scroll_reset ('"+id+"');\">!</div>            </div>              <div class=\"controls preset\">           <div title=\"Show current six hours\"                  onclick=\"changeURL ('"+id+"', 'S');\">S</div>      <div title=\"Show current day\"                  onclick=\"changeURL ('"+id+"', 'D');\">D</div>                <div title=\"Show current week\"                  onclick=\"changeURL ('"+id+"', 'W');\">W</div>                <div title=\"Show current month\"                  onclick=\"changeURL ('"+id+"', 'M');\">M</div>                <div title=\"Show current year\"                  onclick=\"changeURL ('"+id+"', 'Y');\">Y</div>  <div title=\"Set view to all\"                  onclick=\"appendConfigToAll ('"+id+"');\">^</div>                       </div>";
											
				all_images.push(imgs[i]);
				all_images_times.push(default_begin_date);
				all_images_lasts.push(lastweek);
				setTitle(id);
		}
	}
}