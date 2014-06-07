// ==UserScript==
// @name           	GLB Addict Radio
// @namespace      GLB
// @version		1.0.0
// @description   	Adds links in the addicts forum to the chat
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6030
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6030&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6031
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6031&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6696
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6696&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6697
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6697&team_id=0
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6698
// @include        	http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6698&team_id=0
// ==/UserScript==

// adjust this to modify how long the cache should last for
var CACHE_HRS = 0.5;

var xmlDoc;
var shows = [];
var LIVE_SHOW = false;

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function show(node){
	this.node = node;
	this.loadBasicInfo();
	this.figureIfLive();
};
show.prototype = {};

show.prototype.figureIfLive = function(){
	var lenSplit = this.duration.split(':');
	var startDate = new Date(this.date);
	var endDate = new Date(this.date);
	endDate.setHours(startDate.getHours() + parseInt(lenSplit[0]), startDate.getMinutes() + parseInt(lenSplit[1]));
	var nowDate = new Date();
	
	if((startDate.getTime() < nowDate.getTime()) && (endDate.getTime() > nowDate.getTime())){
		this.isLive = true;
		LIVE_SHOW = true;
	}
};

show.prototype.loadBasicInfo = function(){
	this.title = this.node.getElementsByTagName('itunes:summary')[0].textContent;
	this.subTitle = this.node.getElementsByTagName('itunes:subtitle')[0].textContent;
	this.date = this.node.getElementsByTagName('pubDate')[0].textContent;
	this.duration = this.node.getElementsByTagName('itunes:duration')[0].textContent;
	this.link = this.node.getElementsByTagName('guid')[0].textContent;
};

function postShows(){
	var list = xmlDoc.getElementsByTagName('item');
	
	// get the shows info
	for(var i=0;i<list.length;i++){
		shows.push(new show(list[i]));
	}
	
	var bar = getElementsByClassName('subhead_link_bar',document)[0];
	var holder = document.createElement('DIV');
	holder.setAttribute('class','tab_off');
	var link = document.createElement('A');
	link.href = 'javascript:void(0);';
	link.innerHTML = 'Addicts Radio';

	if(LIVE_SHOW){
		link.innerHTML += ' LIVE!';
		link.style.backgroundColor = 'red';
	}
	link.addEventListener('click',function() { showModalBox.apply(link); },false);
	holder.appendChild(link);
	bar.appendChild(holder);
};

function showModalBox(){
	var holder = document.createElement('DIV');
	var parent = document.getElementById('contexMenuContainer');
	
	holder.style.position = 'absolute';
	holder.style.left = '25%';
	holder.style.top = '25%';
	holder.style.width = '50%';
	holder.style.zIndex = '501';
	holder.style.padding = '10px';
	holder.style.backgroundColor = '#EEEEEE';
	holder.style.border = '1px solid black';
	parent.appendChild(holder);
	
	var shimmy = document.createElement('DIV');
	shimmy.style.position = 'absolute';
	shimmy.style.left = '0px';
	shimmy.style.top = '0px';
	shimmy.style.width = '100%';
	shimmy.style.height = '100%';
	shimmy.style.zIndex = '500';
	shimmy.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
	parent.appendChild(shimmy);
	
	// attempt to get the local timezone time difference
	var tempDate = new Date();
	var hourDiff = -tempDate.getTimezoneOffset()/60;
	
	var tbl = document.createElement('TABLE');
	var tr = document.createElement('TR');
	tr.className = 'nonalternating_color forum_head';
	tbl.appendChild(tr);
	var td = document.createElement('TD');
	td.innerHTML = 'Live?';
	tr.appendChild(td);
	var td = document.createElement('TD');
	td.innerHTML = 'Show Name';
	tr.appendChild(td);
	var td = document.createElement('TD');
	td.innerHTML = 'Air Date';
	tr.appendChild(td);
	var td = document.createElement('TD');
	td.innerHTML = 'Air Time';
	tr.appendChild(td);
	var td = document.createElement('TD');
	td.innerHTML = 'Duration';
	tr.appendChild(td);
	
	for(var i=0;i<shows.length;i++){
		var row = document.createElement('TR');
		tbl.appendChild(row);
		if(i % 2 == 0){
			row.className = 'alternating_color2';
		}else{
			row.className = 'alternating_color1';
		}
		
		var td = document.createElement('TD');
		if(shows[i].isLive){
			td.innerHTML = '<span style="font-weight:bold;color:red;">YES!</span>';
		}else{
			td.innerHTML = 'No';
		}
		row.appendChild(td);
		
		var td = document.createElement('TD');
		var link = document.createElement('A');
		link.href = shows[i].link;
		link.setAttribute('target','_blank');
		link.innerHTML = shows[i].subTitle;
		link.setAttribute('title',shows[i].title);
		td.appendChild(link);
		row.appendChild(td);
		
		var td = document.createElement('TD');
		var showDate = new Date(shows[i].date);
		td.innerHTML = showDate.toLocaleDateString();
		row.appendChild(td);
		
		var td = document.createElement('TD');
		td.innerHTML = showDate.toLocaleTimeString();
		row.appendChild(td);
		
		var td = document.createElement('TD');
		td.innerHTML = shows[i].duration;
		row.appendChild(td);
	}
	
	holder.appendChild(tbl);
	
	var closeBtn = document.createElement('INPUT');
	closeBtn.setAttribute('type','button');
	closeBtn.style.cursor = 'pointer';
	closeBtn.value = 'Close';
	closeBtn.addEventListener('click',function() { closeModalBox.apply(holder,[shimmy]); },false);
	holder.appendChild(closeBtn);
};

closeModalBox = function(shimmy){
	this.parentNode.removeChild(shimmy);
	this.parentNode.removeChild(this);
};

function getXml(){
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://www.blogtalkradio.com/glb%20addicts/upcoming/feed.rss',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(xmlhttp){
			postQuery(xmlhttp.responseText);
		}
	})
};

function postQuery(response){
	GM_setValue('radio_vals',response);
	var tempDate = new Date();
	GM_setValue('radio_date',tempDate.toLocaleString());
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(response,"text/xml");
	postShows();
};

function AddAddictsRadio(){
	var needsRefresh = false;
	if(!(GM_getValue('radio_date',false))){
		needsRefresh = true;
	}else{
		var tempDate = new Date();
		var curTime = tempDate.getTime();
		
		var saveDate = new Date(GM_getValue('radio_date'));
		var saveTime = saveDate.getTime();
		
		var difAllowed = CACHE_HRS * 60 * 60 * 1000;
		
		if((curTime - saveTime) > difAllowed){
			needsRefresh = true;
		}
	}
	
	if(needsRefresh){
		getXml();
	}else{
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(GM_getValue('radio_vals'),"text/xml");
		postShows();
	}
};

AddAddictsRadio();