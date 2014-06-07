// ==UserScript==
// @name           Youtube Enhancer
// @namespace      ~dkhal~
// @include        http://*youtube.com*
// @include        http://www.videogetting.com/download-youtube.php*
// @include        http://www.videogetting.com/video.php
// @include        http://keepvid.com/?url=*
// @include        http://fbgames.web44.net/uscripts/youtube/delete.htm
// @exclude        *noytc
// @require        http://fbgames.web44.net/uscripts/youtube/languages.js
// @copyright dkhal
// ==/UserScript==

//////////////////////
// Script Variables //
//////////////////////

vis=(gmg('vis')!='undefined') ? gmg('vis') : "";
if(vis==""){
	vis="metrolyrics.com,seekalyric.com,lyricwiki.org";
}

var reg=new Array();
var alyr=new Array();

alyr[0]="metrolyrics.com";
alyr[1]="seekalyric.com";
alyr[2]="lyricwiki.org";
alyr[3]="lyrics.astraweb.com";
alyr[4]="lyricsdownload.com";

reg[0]="http://www.metrolyrics.com/search.php?category=artisttitle&search=";
reg[1]="http://www.google.com/search?num=20&q=site%3Aseekalyric.com+";
reg[2]="http://www.google.com/search?num=20&q=site%3Alyricwiki.org+";
reg[3]="http://www.google.com/search?num=20&q=site%3Alyrics.astraweb.com+";
reg[4]="http://www.google.com/search?num=20&q=site%3Alyricsdownload.com+";

if(Toar(vis,1).length>alyr.length){
	vis="metrolyrics.com,seekalyric.com,lyricwiki.org";
}

var p=m=0;

t=Toar(vis,1)[0].toLowerCase();

for(h=0; h<alyr.length; h++){
	if(t.indexOf(alyr[h])>"-1"){
	m=h;
	}
}

if(oyt()==true || oyt()==0){

	cur_version=21;

	fav=(gmg("fav")!="undefined") ? Toar(gmg("fav"),1) : "";

	sel=test_page(document.location.href.split("v=")[1]);

	cmd_video=(gmg('cmd_video')==true) ? true : false;
	cmd_form=(gmg('cmd_form')==true) ? true : false;
	hide_video_form=(gmg('video_form')==true) ? true : false;
	hide_download_form=(gmg('download_form')==true) ? true : false;
	hide_ratings=(gmg('ratings_form')==true) ? true : false;
	hide_share=(gmg('share_form')==true) ? true: false;
	hide_comments=(gmg('comments_form')==true) ? true : false;
	hide_promoted=(gmg('promoted_form')==true) ? true : false;
	hide_user=(gmg('user_form')==true) ? true : false;
	hide_search1=(gmg('search_1')==true) ? true : false;
	hide_search2=(gmg('search_2')==true) ? true : false;
	form_stat=(hide_download_form==true) ? true : false;
	hq=(gmg('hq')==true) ? true : false;
	theater=(gmg('theater')==true) ? true : false;
	lights=(gmg('lights')==true) ? true : false;
	lyrics=(gmg('lyrics')==true) ? true : false;
	video_stat=(hide_video_form==true) ? false : true;
	skin=(gmg('skin')!='undefined') ? gmg('skin') : 'blue';
	shortcut=(gmg('shortcut')!='undefined') ? gmg('shortcut') : 'catch';

	h1=check("cmd_video==true");
	h2=check("cmd_form==true");
	h3=check("hide_video_form==true");
	h4=check("hide_download_form==true");
	h5=check("hide_ratings==true");
	h6=check("hide_share==true");
	h7=check("hide_comments==true");
	h8=check("hide_promoted==true");
	h9=check("hide_user==true");
	h14=check("hq==true");
	h15=check("theater==true");
	h18=check("lights==true");
	h19=check("hide_search1==true");
	h20=check("hide_search2==true");
	h21=check("lyrics==true");
	avail=left=h10=h11=h12=h13=h16=h17="";

	switch(language){
		case 'en' : h10="selected"; break;
		case 'fr' : h11="selected"; break;
		case 'ge' : h16="selected"; break;
		default: h10="selected"; break;
	}

	switch(skin){
		case 'blue' : h12="selected"; break;
		case 'green' : h13="selected"; break;
		case 'orange' : h17="selected"; break;
		default: h12="selected"; break;
	}

	tmp=Toar(vis,1);

	for(i=0; i<tmp.length; i++){
		avail+="<option value='"+tmp[i]+"'>"+tmp[i]+"</option>";
	}
	
	for(i=0; i<alyr.length; i++){
		if(vis.indexOf(alyr[i])=="-1"){
			left+="<option value='"+alyr[i]+"'>"+alyr[i]+"</option>";
		}
	}
}



///////////////////////////
// Script Initialisation //
///////////////////////////

if(oyt()==true || oyt()==0){ 

/////////
// CSS //
/////////

var el = dce('link');
el.setAttribute('rel', 'stylesheet');
el.setAttribute('href', 'http://fbgames.web44.net/uscripts/youtube/ytc_'+skin+'.css');
xp("//html/head",9).appendChild(el);



//////////////////////
// Video parameters //
//////////////////////

if(oyt()==true){
	vid=xp("//*[@id='watch-player-div']",9).innerHTML;
	var swfArgs=unsafeWindow.swfArgs;
	video_id=swfArgs.video_id;
	t=swfArgs.t;
}



//////////////////////
// The download box //
//////////////////////

var b = dce('br');
var f = dce('div');
f.setAttribute('id', 'd_form');
f.setAttribute('align', 'center');
if(oyt()==true){d=xp("//*[@id='watch-player-div']",9); d.appendChild(b); d.appendChild(f); d.appendChild(b);}



////////////////////////////////
// Settings Box And Favorites //
////////////////////////////////

if(oyt()==true || oyt()==0){
	l=0;
	table='<div onmouseover=showcase(1); onmouseout=showcase(0); align="center" id="ytc_set" style="position:absolute;display:none;top:38px;right:55px;padding:10px;"><center><table class=ytc border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="239"><tr class="ytc"><td class="ytc" width="236" colspan="3" align="center"><u><b><span class=ytc>'+ytc.lang("set")+'</span></b></u></td></tr><tr><td class="ytc" width="236" colspan="3" align="center"><u><b><a id=s1 href=javascript:s_t("1")>'+ytc.lang("setup")+'</a></b></u></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("vid")+'</span></td><td class="ytc" width="15" align="center"><input class=ytccheck type="checkbox" name="ytc_video" value="1" '+h3+' onclick="V(this,1)"></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("dow")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h4+' name="ytc_download" onclick="V(this,1)" value="1"></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("rat")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h5+' onclick="V(this,1)" name="ytc_rate" value="1"></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("sha")+'</span></td><td class="ytc" width="15" align="center"><input '+h6+' onclick="V(this,1)" type="checkbox" name="ytc_share" value="1"></td></tr><tr id="set1" class="ytc" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("com")+'</span></td><td class="ytc" width="15" align="center"><input onclick="V(this,1)" '+h7+' type="checkbox" name="ytc_comments" value="1"></td></tr><tr id="set1" class="ytc" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("rel")+'</span></td><td class="ytc" width="15" align="center"><input '+h8+' onclick="V(this,1)" type="checkbox" name="ytc_promoted" value="1"></td></tr><tr id="set1" class="ytc" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("use")+'</span></td><td class="ytc" width="15" align="center"><input onclick="V(this,1)" '+h9+' type="checkbox" name="ytc_user" value="ON"></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("s1")+'</span></td><td class="ytc" width="15" align="center"><input class=ytccheck type="checkbox" name="ytc_search1" value="1" '+h19+' onclick="V(this,1)"></td></tr><tr id="set1" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("s2")+'</span></td><td class="ytc" width="15" align="center"><input class=ytccheck type="checkbox" name="ytc_search2" value="1" '+h20+' onclick="V(this,1)"></td></tr><tr class="ytc"><td class="ytc" width="236" align="center" colspan="3"><u><b><a id=s2 href=javascript:s_t("2")>'+ytc.lang("cmd")+'</a></b></u></td></tr><tr class="ytc" id="set2" style="display:none"><td class="ytc" width="236" align="center" colspan="3"><span class=ytc>'+ytc.lang("sho")+' </span><input type="text" class="ytctext" onkeyup="V(this,2)" name="ytc_shortcut" size="12" value="'+shortcut+'"></td></tr><tr class="ytc" id="set2" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("cmd_v")+'</span></td><td class="ytc" width="15" align="center"><input '+h1+' onclick="V(this,1)" type="checkbox" name="ytc_cmd_video" value="1"></td></tr><tr class="ytc" id="set2" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("cmd_f")+'</span></td><td class="ytc" width="15" align="center"><input onclick="V(this,1)" '+h2+' type="checkbox" name="ytc_cmd_download" value="1"></td></tr><tr class="ytc" style="display:none" id="lyr_sub"><td class="ytc" width="236" colspan="3" align="center"><u><b><a id=s4 href=javascript:s_t("4")>'+ytc.lang("lyr_opt")+'</a></b></u></td></tr><tr id="set4" style="display:none" class="ytc"><td class="ytc" width="221" align="center" colspan="2"><table border="0"><tr><td><a href=#>'+ytc.lang("ad1")+'</a><br><select id="lyr_avail" size=5>'+avail+'</select></td><td><input type=button value=">>" onclick="remove_opt()"><p><input type=button value="<<" onclick="add_opt()"></td><td><a href=#>'+ytc.lang("ad2")+'</a><br><select id="lyr_left" size=5>'+left+'</select></td></tr></table></td></tr><tr class="ytc"><td class="ytc" width="236" colspan="3" align="center"><u><b><a id=s3 href=javascript:s_t("3")>'+ytc.lang("other")+'</a></b></u></td></tr><tr id="set3" class="ytc" style="display:none"><td class="ytc" width="236" align="center" colspan="3"><span class=ytc>'+ytc.lang("lang")+' </span><select class="ytc" onchange="V(this,2)" name=ytc_lang id=ytc_lang><option class="ytc" value="en" '+h10+'>English</option><option class="ytc" value="fr" '+h11+'>Français</option><option class="ytc" value="ge" '+h16+'>German</option></select></td></tr><tr class="ytc" id="set3" style="display:none"><td class="ytc" width="236" align="center" colspan="3"><span class=ytc>'+ytc.lang("skin")+' </span><select class="ytc"" onchange="V(this,2)" name=ytc_skin id=ytc_skin><option value="blue" '+h10+'>'+ytc.lang("blue")+'</option><option value="green" '+h13+'>'+ytc.lang("green")+'</option><option value="orange" '+h17+'>'+ytc.lang("orange")+'</option></select></td></tr><tr class="ytc" id="set3" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("lyrics")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h21+' name="ytc_lyrics" onclick="V(this,1)" value="1"></td></tr><tr class="ytc" id="set3" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("hq")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h14+' name="ytc_hq" onclick="V(this,1)" value="1"></td></tr><tr class="ytc" id="set3" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("theater")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h15+' name="ytc_theater" onclick="V(this,1)" value="1"></td></tr><tr class="ytc" id="set3" style="display:none"><td class="ytc" width="221" align="center" colspan="2"><span class=ytc>'+ytc.lang("lights")+'</span></td><td class="ytc" width="15" align="center"><input class="ytccheck" type="checkbox" '+h18+' name="ytc_lights" onclick="V(this,1)" value="1"></td></tr><tr><td class="ytc" colspan=3 class="ytc" width="111" align="center"><u><b><a href=# id="save_opt">'+ytc.lang("save")+'</a></b></u>&nbsp;&nbsp;|&nbsp;&nbsp;<u><b><a href="javascript:hide_ytc_set();">'+ytc.lang("close")+'</a></b></u><span id=msg></span></td></tr></table></center></div>';
table2='<div onmouseover=showcase(1); onmouseout=showcase(0); align="center"id="ytc_fav" style="position:absolute;display:none;top:38px;right:55px;padding:10px;"><center><table class=ytc border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="239">';
table2+='<tr class=ytc><td class=ytc><p align="center"><b><u><a id=s10 href=javascript:s_t("10")>'+ytc.lang("fav")+'</a></u></b></td></tr>';
		if(fav!="undefined" && fav!=""){
			for(i=1; i<fav.length; i++){
				if(fav[i]!=""){
					l++;
					tmp=Toar(fav[i],2);
					table2+='<tr class=ytc id=set10 style="display:none"><td class=ytc><p align="center"><b><u><a title='+tmp[1]+' href="'+tmp[2]+'">'+tmp[0]+'</a></u></b>&nbsp;&nbsp;<a href=javascript:ytc_del_fav("'+escape(tmp[0])+'","'+escape(tmp[1])+'","'+escape(tmp[2])+'")><img title="'+ytc.lang("del")+'" src="http://sql1.000webhost.com/file-manager/img/menu_delete.gif"></a></td></tr>';
				}
			}
		}
		table2+='<tr class=ytc><td class=ytc><p align="center">';
	if(oyt()==true){
		table2+='<u><b><a href=# id="save_vid">'+ytc.lang("add")+'</a></b></u>&nbsp;&nbsp;|&nbsp;&nbsp;';
	}
	table2+='<a href="javascript:hide_ytc_fav();"><u><b>'+ytc.lang("close")+'</u></b></a><span id=msg2></span></td></tr></table></center></div>';
	xp("//*[@id='util-links']",9).innerHTML+='<span class="util-item"><a class="hLink" href=javascript:show_ytc_fav();>'+ytc.lang("m_fav")+'</a> ('+l+')</span>';
	xp("//*[@id='util-links']",9).innerHTML+='<span class="util-item"><a class="hLink" href=javascript:show_ytc_set();><abbr title="'+ytc.lang("til")+'">'+ytc.lang("m_set2")+'</abbr> '+ytc.lang("m_set1")+'</a></span>';
xp("//body",9).innerHTML+=table;
xp("//body",9).innerHTML+=table2;
}


////////////////////////////
// Greasemonkey Functions //
////////////////////////////

if(cmd_video==true){
	GM_registerMenuCommand( ytc.lang("cmd_v"), videoSwitch , "", "", "" );
}
if(cmd_form==true){
	GM_registerMenuCommand( ytc.lang("cmd_f"), formSwitch , "", "", "" );
}
}



////////////////////////
// Videgetting script //
////////////////////////

if(document.location.href.indexOf("http://www.videogetting.com/download-youtube.php")>"-1"){
	xp("/html/body/div/div[2]/div/dl/dd/div/form/input",9).value=self.name;
	window.addEventListener("load", assgn, false);
}

if(document.location.href.indexOf("videogetting.com/video.php")>"-1"){
	window.addEventListener("load", linkup, false);
}

function assgn(){
	fmt=document.location.href.substr(document.location.href.indexOf("frm=")+4,4);
	frmt=xp("//input[@type='radio']",6);
	for(i=0; i<frmt.length; i++){
		if(frmt[i].value==fmt){
			frmt[i].checked=true;
		}
	}
	xp("/html/body/div/div[2]/div/dl/dd/div/form",9).submit();
	}

function linkup(){
	check=0;
	links=xp("//a",6);
	for(i=0; i<links.length; i++){
		if(links[i].href.indexOf("http://www.videogetting.com/download.php")>"-1"){
			self.location=links[i].href;
			check=1;
		}
	}
	if(check==0){
		window.setTimeout("linkup()",2000);
	}
}



////////////////////
// Keepvid Script //
////////////////////

if(document.location.href.indexOf("keepvid.com/?url=")>"-1"){
	t=self.name;
	if(t=="flv_" && xp('/html/body/div/div[4]/div/div/a[2]',9)){if(xp('/html/body/div/div[4]/div/div/a[2]',9).href.indexOf("flv")){self.location=xp('/html/body/div/div[4]/div/div/a[2]',9).href;}}
	if(t=="mp4_" && xp('/html/body/div/div[4]/div/div/a[3]',9)){if(xp('/html/body/div/div[4]/div/div/a[2]',9).href.indexOf("mp4")){self.location=xp('/html/body/div/div[4]/div/div/a[3]',9).href;}}
	if((!xp('/html/body/div/div[4]/div/div/a[2]',9) && t=="flv_") || (!xp('/html/body/div/div[4]/div/div/a[3]',9) && t=="mp4_")){alert(ytc.lang("und"));}
}



//////////////////////////
// Script Manipulations //
//////////////////////////

function formSwitch(){
	if(form_stat==true){
		form_stat=false;
		show_f();
	}
	else{
		form_stat=true;
		hide_f();
	}
}

function videoSwitch(){
	if(video_stat==true){
		video_stat=false;
		form_stat=true;
		hide_v();
	}
	else{
		video_stat=true;
		form_stat=true;
		show_v();
	}
}

setFunc('remove_opt', function(){
	v=gei("lyr_avail").value;
	if(v!=""){
		o=xp("//option[@value='"+v+"']",9);
		gei("lyr_avail").removeChild(o);
		n=dce("option");
		n.value=v;
		n.innerHTML=v;
		gei("lyr_left").appendChild(n);
		opts['vis']=unsafeWindow.V('',3);
	}
});

setFunc('add_opt', function(){
	v=gei("lyr_left").value;
	if(v!=""){
		o=xp("//option[@value='"+v+"']",9);
		gei("lyr_left").removeChild(o);
		n=dce("option");
		n.value=v;
		n.innerHTML=v;
		gei("lyr_avail").appendChild(n);
		opts['vis']=unsafeWindow.V('',3);
	}
});



////////////////////////
// Auto update script //
////////////////////////

if(oyt()==true){
today=new Date;
day=today.getDate();
month=today.getMonth();
year=today.getFullYear();
hour=today.getHours();
min=today.getMinutes();
sec=today.getSeconds();
cur_unix=unix(day,month,year,hour,min,sec);
lastupdate=gmg("lastupdate");
if(lastupdate=="undefined" || (lastupdate+700000<cur_unix)){
	update("scr");
	gms("lastupdate", cur_unix);
}
}



//////////////////////
// Script Functions //
//////////////////////

function setFunc(func, new_func) {
	unsafeWindow[func] = new_func;
}

function gei(id){
	return document.getElementById(id);
}

function gmg(variable){
	return GM_getValue("ytc_"+variable, "undefined");
}

function gms(variable,to){
	return GM_setValue("ytc_"+variable, to);
}

function rmp(v,m){
	return (typeof opts[v]!="undefined") ? opts[v] : m;
}

function dce(e){
	return document.createElement(e);
}

function Toar(ar,t){
	if(typeof ar!="undefined" && ar!="undefined"){
		if(t==1){ x=","; }
		if(t==2){ x=";"; }
		ar=ar.split(x);
		return ar;
	}
}

function Tostr(ar){
	if(typeof ar!="undefined" && ar!="undefined"){
		str="";
		for(i=0; i<ar.length; i++){
			if(i<ar.length-1){
				str+=ar[i]+",";
			}
			else{
			str+=ar[i];
			}
		}
		return str;
	}
}

function test_page(v){
	ex=gmg("exc");
	if(ex=="undefined"){
		update("exc");
	}
	bol=true;
	if(ex!="undefined"){
		ex=Toar(ex,1);
		for(i=0; i<ex.length; i++){
			if(ex[i]==v){
				bol=false;
			}
		}
		if(bol==true){
			return '<optgroup label="'+ytc.lang("win")+'"><option value="avi">Avi</option><option value="flv">FLV</option><option value="mp3">Mp3</option><option value="mp4">Mp4</option><option value="mpg">Mpg</option><option value="mpeg">Mpeg</option><option value="wmv">Wmv</option></optgroup><optgroup label="'+ytc.lang("mac")+'"><option value="mov">Mov</option></optgroup><optgroup label="'+ytc.lang("mob")+'"><option value="3gp">3GP</option></optgroup>';
		}
		else{
			return '<optgroup label="'+ytc.lang("win")+'"><option value="flv_" title="'+ytc.lang("flv")+'">Flv</option><option value="mp4_" title="'+ytc.lang("mp4")+'">Mp4</option></optgroup>';
		}
	}
}

function check(exp){
	if(eval(exp)==true){
		return "checked";
	}
	else{
		return "";
	}
}

function update(e){
	if(e=="exc"){
		GM_xmlhttpRequest({
		   	method:"GET",
			url:"http://fbgames.web44.net/uscripts/youtube/except.htm",
		        onload:function(response){
				if(response.readyState == 4){  
					tmp=response.responseText;
					eval(tmp.substr(tmp.indexOf("YTC-")+4,tmp.indexOf("-YTC")-tmp.indexOf("YTC-")-4));
					gms("exc",Tostr(ex));
				}
			}
		});
	}
	if(e=="scr"){
		GM_xmlhttpRequest({
		   	method:"GET",
			url:"http://fbgames.web44.net/uscripts/youtube/update.htm",
		        onload:function(response){
				if(response.readyState == 4){  
					data=response.responseText;
					version=data.substr(data.indexOf("version=")+8,data.indexOf(";")-data.indexOf("version=")-8);
					data=data.replace("version="+version+";","");
					url=data.substr(data.indexOf("url=")+4,data.indexOf(";")-data.indexOf("url=")-4);
					data=data.replace("url="+url+";","");
					update=data.substr(data.indexOf("update=")+7,data.indexOf(";")-data.indexOf("update=")-7);
					if(cur_version<version){
						if(confirm(ytc.lang("up1")+version+ytc.lang("up2")+update)){
							self.location=url;
						}
					}
				}
			}
		});
	}
}

function xp(xpath, n) {
	if(n==9){
		return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	if(n==6){
		var i, arr = [], xpr = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}
}

function oyt(){
	if(document.location.href.indexOf("keepvid")>"-1" || document.location.href.indexOf("delete.htm")>"-1"){
		return false;
	}
	else{
		if(document.location.href.indexOf("watch?v=")>"-1"){
			return true;
		}
		else{
			return 0;
		}
	}
}

function unix(day,month,year,hour,min,sec) {
	var humDate = new Date(Date.UTC(year,nozeros(month)-1,nozeros(day),nozeros(hour),nozeros(min),nozeros(sec)));
	return humDate.getTime()/1000.0;
}

function nozeros(input) {
	if((input.length > 1) && (input.substr(0,1) == "0")) {
		return input.substr(1);
	} 
	else {
		return input;
	}
}

var show_f=function(){
	i='<div id=f><p align=center><b><u><font color=black size=4>'+ytc.lang("til")+'</font></b></u></p><div align="center"><center><table border="3" cellpadding="0" cellspacing="0" class="ytc"><tr></tr><tr><td class="ytc" width="45" align="center" height="19"><u><b><span class=ytc>'+ytc.lang("fmt")+'</span></b></u></td><td class="ytc" width="355" align="center" height="19"><b><u><span class=ytc>'+ytc.lang("down")+'</span></u></b></td></tr><tr><td class="ytc" width="45" align="center" height="19"><select class="ytc" size="1" id="d_t">'+sel+'</select></td><td class="ytc" width="355" align="center" height="19"><b><u><a href=javascript:download_v(document.getElementById("d_t").value)>'+ytc.lang("down")+'</a></u></b></td></tr><tr><td align=center class=ytc colspan=2><div id=report><a href=javascript:report()>'+ytc.lang("rep")+'</a></div></td></tr></table></center></div><form id="ytc1" action="http://youtube.com/get_video" method="get"><input type="hidden" name="video_id" value="'+video_id+'"><input type="hidden" name="t" value="'+t+'"><input type="hidden" id="fmt" name="fmt" value=""></form><form id="ytc2" action="http://www.youtubecatcher.com/videotomp3/index.php" method="post"><input type="hidden" name="URL" value="'+self.location.href+'" id="url"></form><iframe style="display:none" id=reportfrm src="" width=0 height=0></iframe></div>';
	xp("//div[@id='d_form']",9).innerHTML=i;
}

var hide_f=function(){
	xp("//div[@id='d_form']",9).innerHTML="";
}

var hide_v=function(){
	form="<br><div id=d_form></div><br>";
	xp("//*[@id='watch-player-div']",9).innerHTML=form;
}

var show_v=function(){
	xp("//*[@id='watch-player-div']",9).innerHTML=vid+form;
}

function set_frm(t,n){
	if(n==1){
		xp("//a[@name='pageBottom']",9).innerHTML='<iframe name="'+document.location.href+'" src="http://www.videogetting.com/download-youtube.php?frm='+t+'" height="0" width="0"></iframe>';
	}
	if(n==2){
		xp("//a[@name='pageBottom']",9).innerHTML='<iframe name="'+t+'" src="http://keepvid.com/?url='+document.location.href+'" height="0" width="0"></iframe>';
	}
}

setFunc('showcase', function(n){
	if(!hide_video_form && theater){
		if(n==1){
			gei("movie_player").style.visibility="hidden";
		}
		if(n==0){
			gei("movie_player").style.visibility="visible";
		}
	}
});

setFunc('download_v', function(type){
	if(type=="flv"){
		gei('fmt').value=5;
		gei('ytc1').submit();
	}
	if(type=="3gp"){
		gei('fmt').value=17;
		gei('ytc1').submit();
	}
	if(type=="mp4"){
		gei('fmt').value=18;
		gei('ytc1').submit();
	}
	if(type=="mp3"){
		gei('ytc2').submit();
	}
	if(type=="mov"){
		set_frm(type,1);
	}
	if(type=="avi"){
		set_frm(type,1);
	}
	if(type=="mpg"){
		set_frm(type,1);
	}
	if(type=="mpeg"){
		set_frm(type,1);
	}
	if(type=="wmv"){
		set_frm(type,1);
	}
	if(type=="flv_"){
		set_frm(type,2);
	}
	if(type=="mp4_"){
		set_frm(type,2);
	}
});

setFunc('report', function(){
	xp("//*[@id='reportfrm']",9).src="http://fbgames.web44.net/uscripts/youtube/report.php?url="+document.location.href;
	xp("//*[@id='report']",9).innerHTML="<a href=#>"+ytc.lang('rep_')+"</a>";
});

setFunc('s_t', function(i){
	tr=xp("//*[@id='set"+i+"']",6);
	if(tr.length>0){
		for(j=0; j<tr.length; j++){
			tr[j].style.display="";
		}
		xp("//*[@id='s"+i+"']",9).href="javascript:h_t('"+i+"')";
	}
});

setFunc('h_t', function(i){
	tr=xp("//*[@id='set"+i+"']",6);
	for(j=0; j<tr.length; j++){
		tr[j].style.display="none";
	}
	xp("//*[@id='s"+i+"']",9).href="javascript:s_t('"+i+"')";
});

setFunc('show_ytc_set', function(){
	gei("ytc_set").style.display="";
});

setFunc('hide_ytc_set', function(){
	gei("ytc_set").style.display="none";
});

setFunc('show_ytc_fav', function(){
	gei("ytc_fav").style.display="";
});

setFunc('hide_ytc_fav', function(){
	gei("ytc_fav").style.display="none";
})

setFunc('ytc_del_fav', function(name,title,src){
	tmp=Tostr(fav);
	tmp=tmp.replace("undefined,","");
	tmp=tmp.replace(",undefined","");
	tmp=tmp.replace(",,","");
	tmp=tmp.replace(name+";"+title+";"+src+",","");
	tmp=tmp.replace(name+";"+title+";"+src,"");
	tmp=tmp.replace(","+name+";"+title+";"+src,"");
	xp("//a[@name='pageBottom']",9).innerHTML='<iframe name="'+tmp+'" src="http://fbgames.web44.net/uscripts/youtube/delete.htm" height="0" width="0"></iframe>';
});

opts=new Array();
setFunc('V', function(v,t){
	if(t=="1"){
		val=(v.checked==true) ? true : false;
		opts[v.name]=val;
	}
	if(t=="2"){
		val=v.value;
		opts[v.name]=val;
	}
	if(t==3){
		var vir=new Array;
		all=xp("//*[@id='lyr_avail']/option",6);
		for(i=0; i<all.length; i++){
			vir[i]=all[i].value;
		}
		return vir;
	}
});

function del(el){
	if(el){
		el.parentNode.removeChild(el);
	}
}

function hide_r(){
	el=xp("//*[@id='watch-ratings-views']",9);
	del(el);
}

function hide_s(){
	el=xp("//*[@id='watch-actions-area']",9);
	del(el);
}

function hide_c(){
	el=xp("//*[@id='watch-comments-stats']",9);
	del(el);
}

function hide_p(){
	el=xp("/html/body/div/div[5]/div[5]",9);
	del(el);
	el=xp("//*[@id='watch-related-videos-panel']",9);
	del(el);
	el=xp("//*[@id='watch-other-vids']",9);
	del(el);
}

function hide_u(){
	el=xp("//*[@id='watch-channel-vids-div']",9);
	del(el);
	el=xp("//*[@id='more-from-panel']",9);
	del(el);
}

function hide_se1(){
	el=xp("//form[@name='searchForm']",9);
	del(el);
}

function hide_se2(){
	el=xp("//*[@id='footer']",9);
	del(el);
}

function hq_mode(f,o){
	var mp = gei('movie_player');
	var wpd = gei('watch-player-div');
	var p = dce('embed');
	p.src = mp.src;
	var fv = mp.getAttribute("flashvars");
	if(!(/fmt=18/.test(document.URL))){
		fv=fv.replace(fmt_map, '18/512000/9/0/115').replace(vq, '2');
	}
	p.setAttribute('id', 'movie_player');
	p.setAttribute('name', 'movie_player');
	p.style.bgcolor = mp.style.bgcolor;
	p.quality = mp.quality;
	p.allowfullscreen = mp.allowfullscreen;
	p.allowscriptaccess = mp.allowscriptaccess;

	if(f==0){
		obj=wpd;
		var fmt_map = fv.split("&fmt_map=")[1].split("&")[0];
		var vq = fv.split("&vq=")[0].split("&")[0];
		p.setAttribute('flashvars', fv);
		p.width = mp.width;
		p.height = mp.height;
	}
	else{
		obj=o;
		p.setAttribute('flashvars', fv);
		p.width = "600";
		p.height = "475";
	}

	wpd.removeChild(mp);
	obj.appendChild(p);
}

function theater_mode(){
	var title = xp("//*[@id='watch-vid-title']/h1",9);
	var oldp = xp("//*[@id='watch-main-area']",9);

	var d = dce('div');
	d.setAttribute('id', 'theater');
	d.align="center";

	var b = dce('br');
	var t = dce('h1');
	t.setAttribute('id', 'title');
	t.innerHTML=title.innerHTML;

	gei('masthead').appendChild(d);
	xp("//*[@id='theater']",9).appendChild(b);
	xp("//*[@id='theater']",9).appendChild(t);
	title.parentNode.removeChild(title);
	xp("//*[@id='watch-main-area']",9).parentNode.removeChild(oldp);
	obj=xp("//*[@id='theater']",9);
	hq_mode(1,obj);
	if(lights){
		xp("//*[@id='theater']",9).setAttribute('style', 'background-color:black');
		xp("//*[@id='title']",9).setAttribute('style', 'color:'+skin);
	}
	}

function ytc_save(){
	gms("download_form",rmp("ytc_download",hide_download_form));
	gms("ratings_form",rmp("ytc_rate",hide_ratings));
	gms("share_form",rmp("ytc_share",hide_share));
	gms("comments_form",rmp("ytc_comments",hide_comments));
	gms("promoted_form",rmp("ytc_promoted",hide_promoted));
	gms("user_form",rmp("ytc_user",hide_user));
	gms("shortcut",rmp("ytc_shortcut",shortcut));
	gms("cmd_video",rmp("ytc_cmd_video",cmd_video));
	gms("cmd_form",rmp("ytc_cmd_download",cmd_form));
	gms("video_form",rmp("ytc_video",hide_video_form));
	gms("search_1",rmp("ytc_search1",hide_search1));
	gms("search_2",rmp("ytc_search2",hide_search2));
	gms("language",rmp("ytc_lang",language));
	gms("skin",rmp("ytc_skin",skin));
	gms("hq",rmp("ytc_hq",hq));
	gms("theater",rmp("ytc_theater",theater));
	gms("lights",rmp("ytc_lights",lights));
	gms("lyrics",rmp("ytc_lyrics",lyrics));
	gms("vis",Tostr(rmp("vis",vis)));

	gei("msg").innerHTML="<br><span id=ytcs>"+ytc.lang("saved1")+"</span>";
	if(confirm(ytc.lang("apply2"))){
		self.location.reload();
	}
}

function ytc_save_fav(){
	name=prompt(ytc.lang("alias"),"");
	title=document.title.replace("YouTube - ","");
	src=document.location.href;
	if(name!=null && name!=""){
		addFav(name,title,src);
	}
	else{
		alert(ytc.lang("invalid"));
	}
}

function ytc_ini_fav(){
	gms("fav",self.name);
	alert(ytc.lang("deleted"));
	alert(ytc.lang("reload"));
}

function addFav(name,title,src){
	fav=Tostr(fav);
	if(typeof fav!="undefined"){
		fav+=",";
	}
	else{
		fav="";
	}
	fav+=name+";"+title+";"+src.replace("#","");
	gms("fav",fav);
	gei("msg2").innerHTML="<br><span id=ytcs>"+ytc.lang("saved2")+"</span>";
	if(confirm(ytc.lang("apply1"))){
		self.location.reload();
	}
}

function g_lyr(url){
	GM_xmlhttpRequest({
	  	method:"GET",
		url:url,
	        onload:function(response){
			if(response.readyState == 4){
				tmp=response.responseText;
				if(url.indexOf("metrolyrics")>"-1"){
					cut=tmp.substr(tmp.indexOf('data="')+6);
					cut=cut.substr(0,cut.indexOf('">'));
					cut="<embed src="+cut+"></embed>";
				}
				if(url.indexOf("seekalyric")>"-1"){
					cut=tmp.substr(tmp.indexOf('<div id="contentt" style="FONT-SIZE: 13px;">')+44);
					cut=cut.substr(0,cut.indexOf('</div>'));
				}
				if(url.indexOf("lyricwiki")>"-1"){
					cut=tmp.substr(tmp.indexOf("<div class='lyricbox' >")+23);
					cut=cut.substr(0,cut.indexOf('</div>'));
				}
				if(url.indexOf("lyrics.astraweb.com")>"-1"){
					cut=tmp.substr(tmp.indexOf("<font face=arial size=2>")+24);
					cut=cut.substr(0,cut.indexOf('<br></font>'));
				}
				if(url.indexOf("lyricsdownload.com")>"-1"){
					cut=tmp.substr(tmp.indexOf('<div id="div_customCSS">')+24);
					cut=cut.substr(0,cut.indexOf('</div>'));
				}

				cut="<p align=center><b><u>Lyrics:</b></u></p>"+cut;
				xp("//*[@id='lyrbox']",9).innerHTML=cut;
			}
		}
	});
}

function nextl(title){
	if(m<reg.length){
		GM_xmlhttpRequest({
		   	method:"GET",
			url:reg[m]+title,
			onload:function(response){
				if(response.readyState == 4){  
					tmp=response.responseText;
					if(tmp.indexOf("did not match any documents")=="-1"){
						if(reg[m].indexOf("metrolyrics")>"-1"){
							if(tmp.indexOf('<td class="First"><a href="')>"-1"){
								cut=tmp.substr(tmp.indexOf('<td class="First"><a href="')+27);
								url=cut.substr(0,cut.indexOf('">'));
								g_lyr(url);
							}
							else{
								alert(ytc.lang("nf"));
								m++;
								nextl(title);
							}
						}
						if(reg[m].indexOf("seekalyric")>"-1"){
							cut=tmp.substr(tmp.indexOf('<!--m--><li class=g><h3 class=r><a href="')+41);
							url=cut.substr(0,cut.indexOf('" class'));
							g_lyr(url);
						}
						if(reg[m].indexOf("lyricwiki")>"-1"){
							cut=tmp.substr(tmp.indexOf('<!--m--><li class=g><h3 class=r><a href="')+41);
							url=cut.substr(0,cut.indexOf('" class'));
							g_lyr(url);
						}
						if(reg[m].indexOf("lyrics.astraweb.com")>"-1"){
							cut=tmp.substr(tmp.indexOf('<!--m--><li class=g><h3 class=r><a href="')+41);
							url=cut.substr(0,cut.indexOf('" class'));
							g_lyr(url);
						}
						if(reg[m].indexOf("lyricsdownload.com")>"-1"){
							cut=tmp.substr(tmp.indexOf('<!--m--><li class=g><h3 class=r><a href="')+41);
							url=cut.substr(0,cut.indexOf('" class'));
							g_lyr(url);
						}
					}
					else{
						alert(ytc.lang("nf"));
						m++;
						nextl(title);
					}
				}
			}
		});
	}
}

if(oyt()==true){
	nb = 0;
	window.addEventListener("keypress", follow, false);
	gei("save_vid").addEventListener("click", ytc_save_fav, false);
}
if(oyt()==true || oyt()==0){
	gei("save_opt").addEventListener("click", ytc_save, false);
}

if(document.location.href.indexOf("delete.htm")>"-1"){
	ytc_ini_fav();
}

function follow(key){
	e = (!document.all) ? key.which : event.keyCode;
	w = String.fromCharCode(e).toLowerCase();
	if(shortcut.charAt(nb) == w){
		nb++;
	}
	else{
		nb=0;
	}
	if(nb == shortcut.length){
		formSwitch();
		nb = 0;
	}
}



////////////
// Kicker //
////////////

if(oyt()==true){
	if(hide_video_form){
		hide_v();
	}
	if(hide_download_form==false){
		show_f();
	}
	if(hide_ratings){
		hide_r();
	}
	if(hide_share){
		hide_s();
	}
	if(hide_comments){
		hide_c();
	}
	if(hide_promoted){
		hide_p();
	}
	if(hide_user){
		hide_u();
	}
	if(hide_search1){
		hide_se1();
	}
	if(hide_search2){
		hide_se2();
	}
	if(!hide_video_form && hq){
		hq_mode(0);
	}
	if(!hide_video_form && hide_ratings && hide_share && hide_comments && hide_promoted && hide_user && theater){
		theater_mode();
	}
	if(lyrics && !hide_video_form){
		xp("//*[@id='lyr_sub']",9).style.display="";
		obj="watch-player-div";
		obj=(theater) ? "theater" : obj;
		title=document.title.replace("YouTube - ","").replace("-"," - ").replace("  "," ");
		xp("//*[@id='"+obj+"']",9).innerHTML+="<div align=center id=lyrbox></div>";
		nextl(title);		
	}
}