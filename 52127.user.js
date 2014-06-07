// ==UserScript==
// @name           abc Plurk Smile T01
// @namespace      abc
// @description    Re噗 ICON
// @version        
// @license        
// @include        http://www.plurk.com/*
// ==/UserScript==


var smilies = '';
/* Smilies definition begins ====================== */



smilies += '<a title="洋蔥頭" href="http://ch5188.com/smilies/onion/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,106.gif,107.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif</a>';

smilies += '<a title="米魯蛋" href="http://itsgod.myweb.hinet.net/images/egg/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,106.gif,107.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif</a>';

smilies += '<a title="優喜猴" href="http://ch5188.com/smilies/monkey/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif,132.gif,133.gif,134.gif,135.gif,136.gif,137.gif,138.gif,139.gif,140.gif,141.gif,142.gif,143.gif,144.gif,145.gif,146.gif,147.gif,148.gif,149.gif,150.gif,151.gif,152.gif,153.gif,154.gif,155.gif,156.gif,157.gif,158.gif,159.gif,160.gif,161.gif,162.gif,163.gif,164.gif,165.gif,166.gif,167.gif,168.gif,169.gif,170.gif,171.gif,172.gif,173.gif,174.gif,175.gif,176.gif,177.gif,178.gif,179.gif,180.gif,181.gif</a>'; 

smilies += '<a title="MSN" href="http://www.addemoticons.com/emoticon/animated/">AddEmoticons0421.gif,AddEmoticons0422.gif,AddEmoticons0423.gif,AddEmoticons0424.gif,AddEmoticons0425.gif,AddEmoticons0426.gif,AddEmoticons0427.gif,AddEmoticons0428.gif,AddEmoticons0429.gif,AddEmoticons04210.gif,AddEmoticons04211.gif,AddEmoticons04212.gif,AddEmoticons04213.gif,AddEmoticons04214.gif,AddEmoticons04215.gif,AddEmoticons04216.gif,AddEmoticons04217.gif,AddEmoticons04218.gif,AddEmoticons04219.gif,AddEmoticons04220.gif,AddEmoticons04221.gif,AddEmoticons04222.gif,AddEmoticons04223.gif,AddEmoticons04224.gif,AddEmoticons04225.gif,AddEmoticons04226.gif,AddEmoticons04227.gif,AddEmoticons04228.gif,AddEmoticons04229.gif,AddEmoticons04230.gif,AddEmoticons04231.gif,AddEmoticons04232.gif,AddEmoticons04233.gif,AddEmoticons04234.gif,AddEmoticons04235.gif,AddEmoticons04236.gif,AddEmoticons04237.gif,AddEmoticons04238.gif,AddEmoticons04239.gif,AddEmoticons04240.gif,AddEmoticons04241.gif,AddEmoticons04242.gif,AddEmoticons04243.gif,AddEmoticons04244.gif,AddEmoticons04245.gif,AddEmoticons04246.gif,AddEmoticons04247.gif,AddEmoticons04248.gif,AddEmoticons04249.gif,AddEmoticons04250.gif,AddEmoticons04251.gif,AddEmoticons04252.gif,AddEmoticons04253.gif,AddEmoticons04254.gif,AddEmoticons04255.gif,AddEmoticons04256.gif,AddEmoticons04257.gif,AddEmoticons04258.gif,AddEmoticons04259.gif,AddEmoticons04260.gif,AddEmoticons04261.gif,AddEmoticons04262.gif,AddEmoticons04263.gif,AddEmoticons04264.gif,AddEmoticons04265.gif,AddEmoticons04266.gif,AddEmoticons04267.gif,AddEmoticons04268.gif,AddEmoticons04269.gif,AddEmoticons04270.gif,AddEmoticons04271.gif,AddEmoticons04272.gif,AddEmoticons04273.gif,AddEmoticons04274.gif,AddEmoticons04275.gif,AddEmoticons04276.gif,AddEmoticons04277.gif,AddEmoticons04278.gif,AddEmoticons04279.gif,AddEmoticons04280.gif,AddEmoticons04281.gif,AddEmoticons04282.gif,AddEmoticons04283.gif,AddEmoticons04284.gif,AddEmoticons04285.gif,AddEmoticons04286.gif,AddEmoticons04287.gif,</a>';

smilies += '<a title="小白熊" href="http://s641.photobucket.com/albums/uu133/mark5468/wb/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,124.gif,125.gif,126.gif,127.gif,128.gif,129.gif,130.gif,131.gif,132.gif,133.gif,134.gif,135.gif,136.gif,137.gif,138.gif,139.gif,140.gif,141.gif,142.gif,143.gif,144.gif,145.gif,146.gif,147.gif,148.gif,149.gif,150.gif,151.gif,152.gif,153.gif,154.gif,155.gif</a>';

smilies += '<a title="KUSO" href="http://s641.photobucket.com/albums/uu133/mark5468/kuso/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif,123.gif,125.gif</a>';


/* Smilies definition ends ====================== */


/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);



var isGreasemonkey = false;
var isLoaded = false;
var isInjected = false;
var wait = 0;
var smilies_data = [];
var target_obj = null;

function init() {
  /* Check if we are in Greasemonkey / GM Compiler (other userscript approach doesn't support GM_-series) */
  if (typeof GM_getValue == 'function') { isGreasemonkey = true; }
  
  document.addEventListener('DOMNodeInserted', watchDom, false);
  window.addEventListener('load', receiveSmilies, false);
}

function receiveSmilies() {
  /* Collect smilies data from Userscript */
  var smilies_dom = document.getElementById('smilies_holder').getElementsByTagName('a');
  for (var i = 0; i < smilies_dom.length; i++) {
    smilies_data.push({title: smilies_dom[i].title, prefix: smilies_dom[i].href, images: smilies_dom[i].textContent.split(',')});
  }
  /* XXX: getElementsByClassName support? */
  var smily_holders = document.getElementsByClassName('smily_holder');
  for (var i = 0; i < smily_holders.length; i++) {
    smily_holders[i].addEventListener('click', function(e) {
      /* Determine the right place */
      if(document.getElementById('input_permalink')) { target_obj = document.getElementById('input_permalink'); }
      else if (this.parentNode.parentNode.parentNode.parentNode.id != 'main_poster') { target_obj = document.getElementById('input_small'); }
      else if (document.getElementById('input_big')) { target_obj = document.getElementById('input_big'); }
    }, false);
  }
  isLoaded = true;

}

function watchDom(e) {
  if (e.target && e.target.id && e.target.id === 'emoticon_selecter') {
    isInjected = true;
    /* Use setTimeout to speed up a little */
    window.setTimeout(waitLoaded, 5);
    document.removeEventListener('DOMNodeInserted', watchDom, false);
  }
};

/* Avoid injectTabs before loaded */
function waitLoaded() {
  if (wait == 10) {
    return;
  }
  if (isLoaded) {
     window.setTimeout(injectTabs, 5);
     return;
  }
  wait++;
  window.setTimeout(waitLoaded, 300);
}

function injectTabs() {
  if (!isLoaded) {alert('bad!')}
  /* Set CSS */
  document.getElementById('emoticons_show').style.width = '100%';
  document.getElementById('emoticons_show').style.maxHeight = '200px';
  document.getElementById('emoticons_show').style.overflow = 'auto';
  var tabs = smilies_data.length;
  /* Avoid overflow */
  if (tabs > 6) {
    document.getElementById('emoticons_tabs').firstChild.style.height = (20 * Math.ceil(tabs / 6)).toString()+'px';
  }

  var li = document.createElement('li');
  li.className = 'emoticon_selecter';

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < smilies_data.length; i++) {
    var test = li.cloneNode(false);
    test.id = 'plurksunny-tabs-'+i;
    /* XXX: HTML entitles */
    test.innerHTML = '<a href="#">'+smilies_data[i].title+'</a>';
    test.addEventListener('click', makeTabListener(i), false);
    fragment.appendChild(test);
  }
  document.getElementById('emoticons_tabs').firstChild.appendChild(fragment);
};

function makeTabListener(id)
{
  return function(e) { switchTab(id); e.preventDefault();};
}

function switchTab(id) {
  /* Unset old, set new */
  var tabs = document.getElementById('emoticons_tabs').getElementsByTagName('li');
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].className.indexOf('current') != 1) {
      tabs[i].className = 'emoticon_selecter';
    }
    if (tabs[i].id == 'plurksunny-tabs-'+id) {
      tabs[i].className = 'emoticon_selector current';
    }
  }
  var div = document.createElement('div');
  var html = '<table><tbody>'+"\n"+'<tr>';
  for (var i = 0; i < smilies_data[id].images.length; i++ ) {
    html += '<td><a href="#"><img width="35" src="'+smilies_data[id].prefix+smilies_data[id].images[i]+'"></a></td>';
    if (i % 8 == 7 && i < smilies_data[id].images.length - 1) { html += '</tr>'+"\n"+'<tr>'; }
  }
  html += '</tr></tbody></table>';
  div.innerHTML = html;
  document.getElementById('emoticons_show').removeChild(document.getElementById('emoticons_show').firstChild);
  document.getElementById('emoticons_show').appendChild(div);
  
  /* Handle the emoticons insertion */
  var images = document.getElementById('emoticons_show').getElementsByTagName('img');
  for (var i = 0; i < images.length; i++ ) {
    images[i].addEventListener('click', function() {
      /* Set the selection */
      if (typeof target_obj.selectionStart != 'undefined') {
        var start = target_obj.selectionStart;
        var end = target_obj.selectionEnd;
        target_obj.value = target_obj.value.substring(0, start) + this.src + ' ' + target_obj.value.substring(end);
        var p = end + this.src.length + 1;
        target_obj.setSelectionRange(p, p);
      }
    }, false);
  }
}

/* Go ahead */
init();









//== RE ==//
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
	}
}

GM_wait();

var uw = unsafeWindow;
var p = uw.Plurks;
var o_expand;

if(p) {
	o_expand = p.expand;
	p.expand = function(div) {
		o_expand(div);

		var ib = $('#input_big').get(0);

		if(ib) {

			var plurk = uw.getPD(div).obj;
			var link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
			var raw = plurk.content_raw;
			var owner_id = plurk.owner_id;

			var info_box = $(uw.$dp.info_box);
			var pp = info_box.children(".perma_link");

			if(info_box.children("#RePlurk").length == 0) {
				var rp = $('<a href="#" id="RePlurk">轉貼此噗</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(owner_id,raw,link);
				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([Re此噗]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}





//== 日曆 ==//
(function (window) {
_time="23:59:59"
function buildCal(m, y, cM, cH, cDW, cD, brdr){
var mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
var dim=[31,0,31,30,31,30,31,31,30,31,30,31];
var oD = new Date(y, m-1, 1); //DD replaced line to fix date bug when current day is 31st
oD.od=oD.getDay()+1; //DD replaced line to fix date bug when current day is 31st

var todaydate=new Date() //DD added
var tday=new Date(todaydate.getFullYear(),todaydate.getMonth(),todaydate.getDate());
todaytime=tday.getTime()/1000;

var scanfortoday=(y==todaydate.getFullYear() && m==todaydate.getMonth()+1)? todaydate.getDate() : 0 //DD added

dim[1]=(((oD.getFullYear()%100!=0)&&(oD.getFullYear()%4==0))||(oD.getFullYear()%400==0))?29:28;
var t='<div ><table class="'+cM+'" cols="7" cellpadding="0" border="'+brdr+'" cellspacing="0"><tr align="center">';
t+='<td colspan="7" align="center" class="'+cH+'">'+'<a class="prev" href="javascript:updateCalendar('+(m-1)+','+y+')">&nbsp;&nbsp;</a>'+mn[m-1]+' - '+y+'<a class="next" href="javascript:updateCalendar('+(m+1)+','+y+')">&nbsp;&nbsp;</a>'+'</td></tr><tr align="center">';
for(s=0;s<7;s++)t+='<td class="'+cDW+'">'+"SMTWTFS".substr(s,1)+'</td>';
t+='</tr><tr align="center">';
for(i=1;i<=42;i++){
var x=((i-oD.od>=0)&&(i-oD.od<dim[m-1]))? i-oD.od+1 : '&nbsp;';
ddd=x;

var beforetoday=new Date(y,m-1,ddd)
beforetime=beforetoday.getTime()/1000;

if(beforetime){
	//alert(ddd+":"+todaytime+"-"+beforetime);
	//alert(beforetoday.getTime());
	if(beforetime>todaytime){
	beforecheck=true;
	}else{
	beforecheck=false;
	}
}
if (x==scanfortoday) //DD added
x='<span id="today">'+x+'</span>' //DD added
if(ddd== '&nbsp;'||beforecheck){
t+='<td class="'+cD+'"><span id="future">'+x+'</span></td>';
}else{
//+','+m+','+ddd
t+='<td class="'+cD+'">'+'<a href="javascript:godate('+y+','+m+','+ddd+')" target="_top">'+x+'</a>'+'</td>';
}

if(((i)%7==0)&&(i<36))t+='</tr><tr align="center">';
}
return t+='</tr></table></div><div class="apmdiv"><a href="javascript:changeApm()" id="apm">PM</a></div>';
}


function showCalendar(gomonth)
	{
	
	//
	var showdate = document.createElement('script');
	showdate.setAttribute('language','JavaScript');
    showdate.setAttribute('src','http://rein.murmur.in/plurk/showcal_v2.js');  
	document.getElementsByTagName('head')[0].appendChild(showdate);    
	var style = document.createElement('link');
    style.setAttribute('href','http://rein.murmur.in/plurk/dark.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);

	var calbox = document.getElementById('dash-additional-info')
	var todaydate=new Date()
	var curmonth=todaydate.getMonth()+1+gomonth //get current month (1-12)
	var curyear=todaydate.getFullYear() //get current year
	var content=buildCal(curmonth ,curyear, "main", "month", "daysofweek", "days", 0);
	var element = document.createElement('div');
	element.setAttribute('id','calendar');
	element.setAttribute('class','night');
	element.innerHTML=content;
	//element.innerHTML+="<a href='javascript:updateCalendar("+(curmonth+1)+","+curyear+")'>next</a> /<a href='javascript:updateCalendar("+(curmonth-1)+","+curyear+")'>next</a> ";
	calbox.appendChild(element);	
	}

window.addEventListener("load", function(){
	setTimeout(function(){
	if(document.getElementById('plurk_form').style.display=='none'){}else{showCalendar(0);}
	},2000);

}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);




//== Rich Edit ==//
var GM_JQ = document.createElement('script');
GM_JQ.src = '';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
	}
}

GM_wait();

// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINK: 4,
	FLICKR: 5,
}

// == LIFECYCLE == //

var o_Plurks_editPlurk;
var o_Plurks__cancelOnClick;
var o_Plurks__saveOnClick;
var o_Plurks_removeExpand;

var o_Plurks_editPlurk_cb;

doRTE = function(){
	var taids = ["input_big", "input_permalink"];

	for(i=0;i<taids.length;i++) {
		var t = $("#" + taids[i])[0];
		if(t) {
			new ControlBar( true, true, true, true, true ).inject(t);
		}
	}

	var p = unsafeWindow.Plurks;

	if(p) {
		o_Plurks_editPlurk = p._editPlurk;
		o_Plurks__cancelOnClick = p.__cancelOnClick;
		p.__cancelOnClick = function() {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks__cancelOnClick();
		};
		o_Plurks_removeExpand = p._removeExpand;

		p._removeExpand = function(D) {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks_removeExpand(D);
		};

		$dp = unsafeWindow.$dp;

		$($dp.man).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true ).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true ).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLink, showFlickr)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showFlickr = showFlickr;

	this.inject = function( targetTextArea )
	{
		var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-size','11px').css('background','#000').css('opacity','0.75').css('-moz-border-radius','4px').css('display','table');

		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>斜體</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<b>粗體</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<u>底線</u>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showLink )
		{
			var item = new ControlBarItem( "連結", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showFlickr )
		{
			var item = new ControlBarItem( "Flickr", CONTROL_BAR_ITEM_COMMAND.FLICKR, targetTextArea );

			controlBar.append( item.create() );
		}

		$(targetTextArea).before( controlBar);

		return controlBar;
	};
}

function ControlBarItem( label, editCommand, targetTextArea )
{
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;

	this.create = function()
	{
		var link = $('<a href="javascript:;">' + label + '</a>').css('color','#fff').css('padding','4px').css('text-decoration','none');

		var le = link.get(0);
		le.editCommand = this.editCommand;
		le.targetTextArea = this.targetTextArea;
		le.execute = this.execute;
		le.linkSelection = this.linkSelection;
		le.tagSelection = this.tagSelection;
		le.flickrSearch = this.flickrSearch;

		link.click(this.execute);

		return link;
	}

	this.execute = function()
	{
		switch( this.editCommand )
		{
			case CONTROL_BAR_ITEM_COMMAND.ITALICIZE:
				this.tagSelection( "*", "*" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.EMBOLDEN:
				this.tagSelection( "**", "**" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.UNDERLINE:
				this.tagSelection( "__", "__" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.LINK:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.FLICKR:
				this.flickrSearch();
				break;
			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "請輸入連結網址:", "" );

		if (url && url != '' )
		{

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "輸入想顯示的文字:", "" );
			}

			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}

	this.flickrSearch = function()
	{
		showFlickrBox(targetTextArea);
	}

	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			this.targetTextArea.value =
				this.targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen +
				this.targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose +
				this.targetTextArea.value.substring( selectionEnd ); //text after the selection end

			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;

			this.targetTextArea.scrollTop = scrollTop;

			this.targetTextArea.focus();
		}
	}
}

// == Flickr Serach == //

var frAPIKey = '17f5005ce502a30e727c558a87cb8470';

var frVarWidth = 150;
var frKeyNSID = 'fr_key_nsid';
var frKeyRememberMe = 'fr_key_member_me';

var frBox;
var frResult;
var frCellNum;
var frRowNum;

var frOptUsername;
var frOptKeyword;
var frOptSort;
var frOptRememberMe;

var frSearchURL;

function showFlickrBox(targetTextArea) {

	unsafeWindow.frTargetTA = targetTextArea;

	if(!frBox) {

		frCellNum = parseInt((window.innerWidth - 150) / frVarWidth);
		frRowNum = parseInt((window.innerHeight - 200) / frVarWidth);
		var frBoxWidth = (frCellNum * frVarWidth);

		frBox = $('<div></div>').attr('id','frBox').css('position','absolute').css('overflow','visible').css('width',frBoxWidth + 'px').css('top','20px').css('padding','0px').css('margin','15px').css('left',(1*document.body.clientWidth-frBoxWidth)/2 + 'px').css('display','none').css('border','3px solid #F7861B').css('background','#ffffff').css('zIndex','999999999').css('font-family','Arial,Helvetica,sans-serif').css('-moz-border-radius','8px').css('color','#000');
		$('body').append(frBox);

		// title
		var titlebar = $('<div><span style="color:#0063DC">Flick</span><span style="color:#FF0084">r</span> Search</div>').css('text-align','center').css('font-size','14px').css('font-weight','bold').css('letter-spacing','2px').css('padding','5px');
		frBox.append(titlebar);

		// option
		var optionbar = $('<div></div>').css('padding','5px').css('background','#fefefe').css('border-top','1px dashed #000');
		frBox.append(optionbar);

		// Flickr Username or Email
		var op1 = $('<span>NSID/Username/Email : </span>').css('padding','5px');
		op1.append(frOptUsername = $('<input type="text" size="20"/>'));
		optionbar.append(op1);

		// retrieves
		setTimeout(function(){
			var nsid = GM_getValue(frKeyNSID);
			if(nsid) {
				frOptUsername.attr('value',nsid);
			}
		},0);

		// remember me
		var op4 = $('<span>Remember Account </span>').css('padding','5px');
		op4.append(frOptRememberMe = $('<input type="checkbox"/>'));
		optionbar.append(op4);

		// retrieves
		setTimeout(function(){
			var rememberMe = GM_getValue(frKeyRememberMe);
			if(rememberMe) {
				frOptRememberMe.attr('checked',rememberMe);
			}
		},0);

		optionbar.append('<br>');

		// keyword
		var op2 = $('<span>Keyword : </span>').css('padding','5px');
		op2.append(frOptKeyword = $('<input type="text" size="20"/>'));
		optionbar.append(op2);

		// sort
		var op3 = $('<span>Sort : </span>').css('padding','5px');
		op3.append(frOptSort = $('<select id="frOptSort"></select>').html(
		'<option value="interestingness-desc">Interestingness Desc</option>' +
		'<option value="interestingness-asc">Interestingness Asc</option>' +
		'<option value="date-posted-asc">Date Posted Asc</option>' +
		'<option value="date-posted-desc">Date Posted Desc</option>' +
		'<option value="date-taken-asc">Date Taken Asc</option>' +
		'<option value="date-taken-desc">Date Taken Desc</option>' +
		'<option value="relevance">relevance</option>'
		));
		optionbar.append(op3);

		var searchbtn;
		optionbar.append(searchbtn = $('<input type="button"/>').attr('value','Go'));
		searchbtn.click(function() {
			doFlickrURLAndSearch();
		});

		// result
		frResult = $('<div></div>').css('padding','5px').css('border-top','1px dashed #000').css('text-align','center');
		frBox.append(frResult);

		// close
		var closebar = $('<div></div>').css('text-align','right').css('background','#F7861B');
		var close = $('<span>Close</span>').css('cursor','point').css('color','#fff').css('background','#F7861B').css('padding','2px').css('font-weight','bold');
		close.click(function() {
			frBox.fadeOut();
		});
		closebar.append(close);
		frBox.append(closebar);

	}

	frBox.fadeIn();

}

function getFlickrURI(method, param) {
	return 'http://api.flickr.com/services/rest/?method=' + method + '&format=json&jsoncallback=?&api_key=' + frAPIKey + '&' + param;
}

function doFlickrURLAndSearch() {

	if(frOptUsername.val() == '') {
		_doFlickrURLAndSearch('');
	}else {
		// by name
		$.getJSON(getFlickrURI('flickr.people.findByUsername','username=' + frOptUsername.val()), function(rsp){
			if(rsp.stat == 'ok') {
				_doFlickrURLAndSearch(rsp.user.nsid);
			}else {
				// by email
				$.getJSON(getFlickrURI('flickr.people.findByEmail','find_email=' + frOptUsername.val()), function(rsp) {
					if(rsp.stat == 'ok') {
						_doFlickrURLAndSearch(rsp.user.nsid);
					}else {
						_doFlickrURLAndSearch(frOptUsername.val());
					}
				});
			}
		});
	}

	// store
	setTimeout(function() {
		var frOptRememberMeisCheck = eval(frOptRememberMe.attr('checked'));
		if(frOptRememberMeisCheck) {
			GM_setValue(frKeyNSID, frOptUsername.attr('value'));
			GM_setValue(frKeyRememberMe, frOptRememberMeisCheck);
		}else {
			GM_setValue(frKeyNSID, '');
			GM_setValue(frKeyRememberMe, false);
		}
	},0);

}

function _doFlickrURLAndSearch(nsid) {

	frSearchURL = getFlickrURI(
		'flickr.photos.search',
		'privacy_filter=1' +
		'&per_page=' + (frCellNum * frRowNum) +
		'&sort=' + $('#frOptSort option:selected')[0].value +
		'&text=' + frOptKeyword.val() +
		((nsid == '') ? '' : ('&user_id=' + nsid))
		);

	doFlickrSearch();
}

function doFlickrSearch(page) {

	frResult.html('<img src="data:image/gif;base64,R0lGODlhKwALAPEAAP////eGG/rDj/eGGyH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAAKAAEALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQACgACACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkEAAoAAwAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA%3D">');

	setTimeout(function(){
		$.getJSON(frSearchURL + ((page) ? "&page=" + page : ""),function(rsp) {
			generateFlickrResult(rsp);
		});
	}, 500);

}

function generateFlickrResult(rsp) {

	frResult.html('');

	if (rsp.stat != "ok"){
		frResult.html('<b>' + rsp.message + '</b>');
		return;
	}

	if(rsp.photos.total == 0) {
		frResult.html('<b>No Match !</b>');
		return;
	}

	var photo = rsp.photos.photo;

	var table = $('<table></table>').css('width','100%');
	frResult.append(table);

	var tr;

	for(i in photo) {

		if(i % frCellNum == 0) {
			tr = $('<tr></tr>');
			table.append(tr);
		}

		var td = $('<td></td>').css('text-align','center').css('vertical-align','top').css('width',frVarWidth + 'px');
		tr.append(td);

		var p = photo[i];
		var imgUrl = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_t.jpg';

		var img = $('<img/>').attr('src',imgUrl).css('padding','5px');
		td.append(img);

		var title = $('<div>' + ((p.title.length > 30) ? (p.title.substr(0,30) + '...') : p.title) + '</div>');
		td.append(title);

		var imgLink = 'http://www.flickr.com/photos/' + p.owner + '/' + p.id + '/';
		var append = $('<span><a href="#" style="color:#fff;font-weight:bold;text-decoration:none;" onclick="javascript:frTargetTA.value += \'' + imgLink + ' \';return false;">+</a></span>').css('background','red').css('-moz-border-radius','2px').css('margin-right','5px').css('padding','0px 2px').css('cursor','pointer');
		title.prepend(append);

	}

	var pagebar = $('<div></div>').css('text-align','center').css('padding','5px').css('border-top','1px dashed #000');
	frResult.append(pagebar);

	var prev;
	if(rsp.photos.page > 1) {
		prev = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		prev.click(function(e) {
			doFlickrSearch(rsp.photos.page-1);
		});
	}else {
		prev = $('<span></span>');
	}
	prev.html('&#9668; Prev');
	pagebar.append(prev);

	var pages = $('<span>&nbsp;&nbsp;&nbsp;<span style="color:#FF0084">' + rsp.photos.page + '</span> / ' + rsp.photos.pages + '&nbsp;&nbsp;&nbsp;</span>').css('color','#0063DC');
	pagebar.append(pages);

	var next;
	if(rsp.photos.page < rsp.photos.pages) {
		next = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		next.click(function(e) {
			doFlickrSearch(rsp.photos.page+1);
		});
	}else {
		next = $('<span></span>');
	}
	next.html('Next &#9658;');
	pagebar.append(next);
}

