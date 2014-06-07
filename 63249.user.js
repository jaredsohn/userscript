// ==UserScript==
// @name        MangaCheetah
// @namespace    http://sites.google.com/site/netroscripts/mangacheetah
// @description  Read manga like a cheetah
// @version        1.1.0
// @copyright      2009, Jenseki Mora
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.5+ 
// @include    http://*onemanga.com/*
// @include    http://*mangavolume.com/*
// @exclude    http://*onemanga.com/directory/*
// @exclude    http://*onemanga.com/recent/*
// @exclude    http://forum.onemanga.com/*
// @exclude    http://*onemanga.com/chat/*
// @exclude    http://*onemanga.com/supportus/*
// @exclude    http://*onemanga.com/shop/*
// @exclude    http://*onemanga.com/contactus/*
// @exclude    http://*mangavolume.com/manga-archive/*
// @exclude    http://*mangavolume.com/Uploadsystem/*
// @exclude    http://*mangavolume.com/forums/*
// @exclude    http://*mangavolume.com/plus-member/*
// @exclude    http://*mangavolume.com/serie-archive/*
// ==/UserScript==
//___________________________________________________________________________


// ---------------------------------------------- INITIALIZATION ---------------------------------------------------------------------
var body= document.getElementsByTagName("body")[0];
var head= document.getElementsByTagName("head")[0];
var thisBuild=2;

//  ----------------------------------------------- FUNCTIONS --------------------------------------------------------------------------
function getElementsByClassName(className, tag, elm){
	var testClass= new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag= tag || "*"; var elm= elm || document;
	var elements= (tag=="*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements= []; var current; var length= elements.length;
	for(var i=0; i<length; i++){ current= elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
	}}
	return returnElements;
}
function getDirLength() {
   var myloc = document.location.href;
   var locarray = myloc.split("/");
   return locarray.length;
}
function URIget(querry){
	var bar=document.location.href;
	var out='';
	var q=bar.indexOf('\?');
	var e1=bar.indexOf('=',q+1);
	if(q>-1&&bar.substr(q+1,e1-q-1)==querry)
		out=get2(bar,e1+1);
	else if(q>-1){
		var q2=bar.indexOf('&'+querry+'=',q+1)
		if(q2>-1){
			var e2=bar.indexOf('=',q2+1);
			out=get2(bar,e2+1);
		}
	}
	return out;
}
function get2(url,start){
	var out='';
	var end=url.indexOf('&',start);
	if(end<0)
		out=url.substr(start);
	else
		out=url.substr(start,end-start);
	return out;
}
function mouseMove(event){
	ev_x=event.clientX;
	ev_y=event.clientY;
}
function releaseDrag(){
	var tb_x=ev_x-90;
	var tb_y=ev_y;
	GM_setValue('left_pos',tb_x + '');
	GM_setValue('top_pos',tb_y + '');
}
function setToBlack(){
  GM_deleteValue('bgColor');
  GM_setValue('bgColor','black');
}
function setToWhite(){
  GM_deleteValue('bgColor');
  GM_setValue('bgColor','white');
}

var proceed=0;
var chap_js_src="";
var add_js="";
var chapter_sel_id="";
var is_series=0;
var series_dir="";
var redirect="";
var ev_x;
var ev_y;

// ---------------------------------------------- GET WEBSITE ---------------------------------------------------------------------
var website="";
var pos1=document.location.href.indexOf('/',7);
var domain=document.location.href.substr(0,pos1);
if(domain.indexOf('onemanga.com')>-1) {website="Onemanga";}
else if(domain.indexOf('mangavolume.com')>-1) {website="MangaVolume";}

// ---------------------------------------------- ONEMANGA ---------------------------------------------------------------------
if(website=="Onemanga"&&getDirLength()>6){
  proceed=1;
  chapter_sel_id="id_chapter_1";
  is_series=1;
  
  // get Series Directory
  try{
  	var pos2=document.location.href.indexOf('/',pos1+1);
    series_dir=document.location.href.substr(0,pos2)+"/";
  }catch(e){}
  
  // get Title
  try{
    var title=document.getElementsByTagName("h1")[0].innerHTML;
  }catch(e){}

  // get IMG URLs
  try{
  	var imgurl= document.getElementsByClassName("manga-page")[0].src;
  	var locarray= imgurl.split("/");
  	locarray.pop();
  	var imgdir= locarray.join("/");
  	var option= document.getElementsByClassName("page-select")[0].childNodes;
  	var imgsrc= Array();
  	for(i=0;i<option.length;i++){
  		if(option[i].value!=undefined)
  			imgsrc[i]= imgdir+"/"+option[i].value+".jpg";
  	}
    var j=0;
    var imgsrc2= Array();
    for(i=0;i<imgsrc.length;i++)
      if(imgsrc[i]!=undefined)
        imgsrc2[j++]=imgsrc[i];
  }catch(e){}
  
  // get scripts
  try{
    var pos1=document.body.innerHTML.indexOf("function do_init_chapter_list");
    var pos2=document.body.innerHTML.indexOf("}",pos1);
    add_js=document.body.innerHTML.substr(pos1,pos2-pos1+1);
    var pos2=document.body.innerHTML.indexOf("http://",pos1);
    var pos3=document.body.innerHTML.indexOf(".js",pos2);
    chap_js_src=document.body.innerHTML.substr(pos2,pos3+2-pos2+1);
  }catch(e){}
}

//Redirect quickly from chapter welcome page
if(website=="Onemanga"&&getDirLength()==6){
  if(document.getElementsByTagName('ul')[0].getElementsByTagName('a')[0].id!='id_bookmark_click'){
    proceed=1;
    redirect= document.getElementsByTagName('ul')[0].getElementsByTagName('a')[0].href;
  }
}

// ---------------------------------------------- MANGAVOLUME ---------------------------------------------------------------------
if(website=="MangaVolume"&&getDirLength()>5){  
  proceed=1;
  chapter_sel_id="chapter_select";
  is_series=1;
  
  //get Series Directory
  try{
  	var pos2=document.location.href.indexOf('/',pos1+1);
    series_dir=document.location.href.substr(0,pos2)+"/chapter-";
  }catch(e){}
  
  //get Title
  try{
    var title=document.getElementsByTagName("h1")[0].innerHTML;
  }catch(e){}
  
  //get image URLs
  try{
  	var imgurl= document.getElementById("pageimg").getElementsByTagName("img")[0].src;
  	var locarray= imgurl.split("/");
  	var filename=locarray.pop();
    var imgpre=filename.substr(0,filename.indexOf('_')+1);
    var imgindex=parseInt(filename.substr(filename.indexOf('_') + 1,filename.indexOf('.')-filename.indexOf('_')-1));
  	var imgdir= locarray.join("/");
  	var option= document.getElementById("page_select").childNodes;
  	var imgsrc= Array();
  	for(i=0;i<option.length;i++){
  		if(option[i].value!=undefined)
  			imgsrc[i]= imgdir+"/"+imgpre+(imgindex-1+parseInt(option[i].value))+".jpg";
  	}
    var j=0;
    var imgsrc2= Array();
    for(i=0;i<imgsrc.length;i++)
      if(imgsrc[i]!=undefined)
        imgsrc2[j++]=imgsrc[i];
  }catch(e){}

  //get scripts
  try{
    var pos1=document.body.innerHTML.indexOf("document.getElementById('chapter_select').value =");
    var pos2=document.body.innerHTML.indexOf(";",pos1);
    add_js=document.body.innerHTML.substr(pos1,pos2-pos1+1);
    var pos2=document.body.innerHTML.indexOf("src=\"/cauche/");
    var pos3=document.body.innerHTML.indexOf(".js",pos2);
    chap_js_src=document.body.innerHTML.substr(pos2+5,pos3+2-(pos2+5)+1);
  }catch(e){}
}
  //determine if there's need to redirect
if(document.location.href.indexOf('.com/index.php')>-1&&URIget('serie')!=''&&URIget('chapter')!=''){
    proceed=1;
    redirect=domain+'/'+URIget('serie')+'/chapter-'+URIget('chapter')+'/';
}

// ---------------------------------------------- ALL SITES ---------------------------------------------------------------------
  
if(proceed==1){
  //If redirect
  if(redirect!=""){
    try{
    	var e= document.createElement('script');
    	e.type= "text/javascript";
    	var temp= "document.location= '"+redirect+"'";
    	e.innerHTML= temp;
    	head.appendChild(e);
    }catch(e){}
  }

  //Disable keyboard shortcuts
  try{
  	var e= document.createElement('script');
  	e.type= "text/javascript";
  	var temp= "document.onkeydown= new function(e){return false;} init=null;";
  	e.innerHTML= temp;
  	head.appendChild(e);
  }catch(e){}
  
  //Load MangaCheetah JS
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.src= "http://bit.ly/mangacheetah-1-1-0-js";
  	head.appendChild(e);
  }catch(e){}

  //addt'l script
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
    temp="\
    try{\
      for(var i=0;document.getElementsByTagName('link')[i]!=undefined;i++)\
        if(document.getElementsByTagName('link')[i].rel==\"stylesheet\")\
          document.getElementsByTagName('link')[i].href=null;\
      for(i=0;document.getElementsByTagName('style')[i]!=undefined;i++)\
        if(document.getElementsByTagName('style')[i].id!=\"mc_style\")\
          document.getElementsByTagName('style')[i].innerHTML=\"\";\
    }\
    catch(e){}\
    document.onmousemove = MCf_mouseMove;\
    ";
  	e.innerHTML= temp
  	head.appendChild(e);
  }catch(e){}

  document.body.innerHTML="<div id=\"wrapper\" style=\"text-align: center;\"></div>";
  try{
  	var s= document.createElement('style'); s.id= "mc_style"; s.type= "text/css"; s.innerHTML= "\
    body { background-image:none; cursor:default; font-size:16px; font-family:Arial; }";
  	
  	window.changeStyle= function(){
  		s.innerHTML+="body { background-color:"+(GM_getValue('bgColor', 'black')=='white'?'white':'black')+"; }\
    body {margin: 0;}\
    body, table, p, div, span {font-size: 14px; font-family: Verdana, sans-serif; padding: 0px;}\
    h1 {font-size: 18px;}\
    body, p, font, div, span, h1,h2,h3, #page-content { color: "+(GM_getValue('bgColor', 'black')=='white'?'black':'white')+"; }\
    .mainimg {border: solid 2px black;}\
    #footer img {border: 0px;}\
    a, a:active, a:visited {color: "+(GM_getValue('bgColor', 'black')=='white'?'blue':'#EF0E2C')+"; text-decoration: none; }\
    a:hover {color: "+(GM_getValue('bgColor', 'black')=='white'?'purple':'orange')+"; text-decoration: none; }"
  	}
    changeStyle();
  	head.appendChild(s);
  }catch(e){}
          
  var toolbox_html='<div id="toolbox" style="background-color: #ffffe5; border-style: solid; border-width: 1px; border-color: #FFFF00; display: block; width: 150px; position: fixed; left: '+(GM_getValue('left_pos')?GM_getValue('left_pos'):'20px')+'px; top: '+(GM_getValue('top_pos')?GM_getValue('top_pos'):'50px')+'px; z-index: 2; -moz-border-radius: 5px; -webkit-border-radius: 5px; text-align: left;">'+
        '<div style="display: block; background-color: yellow;">'+
        '<div style="display: block; float: left;">'+
        '<span>&nbsp;<a href="javascript: void(0);" onclick="window.scrollTo(0,0); MCf_pauseButton(3);">▲</a> <a href="javascript: void(0);" onclick="window.scrollTo(0,document.body.scrollHeight); NS_pauseButton(3);">▼</a>'+
        '</div>'+
        '<div id="drag_block" onMouseDown="MCf_dragBlock(\'toolbox\');" onMouseUp="MCf_releaseDrag();" style="display: block; cursor: move;">'+
        '&nbsp;'+
        '</div>'+
        '</div>'+
        '<input type="button" value="-" onclick="MCf_pauseButton(2); MCv_speedScroll = MCv_speedScroll - 1; if(MCv_speedScroll < 0) MCv_speedScroll = 0; MCf_speedText();" style="width: 30px;" />'+
        '<input id="centerbutton" type="button" value="■" onclick="MCf_pauseButton(1);" style="width: 30px;" />'+
        '<input type="button" value="+" onclick="MCf_pauseButton(2); MCv_speedScroll = MCv_speedScroll + 1; if(MCv_speedScroll > 10) MCv_speedScroll = 10; MCf_speedText();" style="width: 30px;"  />'+
        '<span id="scrollspeed" style="color: black;">0</span>'+
        '<input type="button" id="zoomtoggle" value="Magnifier" onclick="MCf_zoomSwitch();" />'+
        '<span id="zoomamount" style="color: black;">0</span>'+
        '</div>';
  var nav_html="";
  var nav_html2="";
  if(is_series){
    nav_html="<div><select style=\"width: 400px;\" id=\""+chapter_sel_id+"\" onchange=\"document.location='"+series_dir+"'+this.options[this.options.selectedIndex].value+'/';\"></select>&nbsp;<input type=\"submit\" value=\"Previous Chapter\" onclick=\"try{window.location=\'"+series_dir+"\'+document.getElementById('"+chapter_sel_id+"').options[document.getElementById('"+chapter_sel_id+"').options.selectedIndex+1].value+'/';;}catch(e){this.disabled=true;this.blur();this.value='First Chapter!';}\">&nbsp;<input type=\"submit\" value=\"Next Chapter\" onclick=\"try{window.focus();window.location=\'"+series_dir+"\'+document.getElementById('"+chapter_sel_id+"').options[document.getElementById('"+chapter_sel_id+"').options.selectedIndex-1].value+'/';}catch(e){this.disabled=true;this.blur();this.value='Last Chapter!';}\"></div>";
  }
  var body_html="<div style=\"text-align: left;\"><b><a href=\""+domain+"\">"+website+"</a></b> (<small>amplified by <b><a href=\"http://sites.google.com/site/netroscripts/mangacheetah\">MangaCheetah</a></b></small>)</div>"+toolbox_html+"<p/>"+nav_html+"<p><h1>"+title+"</h1>";
  for(i=0;i<imgsrc2.length;i++)
    body_html+="<p><small><a href=\"javascript: void 0;\" onclick=\"document.getElementById('img"+i+"').src='"+imgsrc2[i]+"?"+Math.random()+"';\">Reload Image</a></small><br/><table cellspacing=0 style=\"margin: 0 auto; width: 500px; text-align: left;\"><tr><td><img id=\"img"+i+"\" class=\"mainimg\" src=\""+(i==0?imgsrc2[0]:'')+"\" alt=\"Loading... Click on Reload image link above if this image won't load.\" onmouseover=\"if(TJPzoomamount != 1) TJPzoom(this);\" onload=\""+((i==(imgsrc2.length-1))?'':"document.getElementById('img"+(i+1)+"').src='"+imgsrc2[i+1]+"';")+"\" /></td></tr></table><br/><br/><hr/>";
  if(is_series){
    nav_html2="<input type=\"submit\" value=\"Previous Chapter\" onclick=\"try{window.location=\'"+series_dir+"\'+document.getElementById('"+chapter_sel_id+"').options[document.getElementById('"+chapter_sel_id+"').options.selectedIndex+1].value+'/';}catch(e){this.disabled=true;this.blur();this.value='First Chapter!';}\">&nbsp;<input type=\"submit\" value=\"Back to Top\" onclick=\"scrollTo(0,0);\">&nbsp;<input type=\"submit\" value=\"Next Chapter\" onclick=\"try{window.focus();window.location=\'"+series_dir+"\'+document.getElementById('"+chapter_sel_id+"').options[document.getElementById('"+chapter_sel_id+"').options.selectedIndex-1].value+'/';}catch(e){this.disabled=true;this.blur();this.value='Last Chapter!';}\"></div>";
  }
  body_html+=nav_html2;
  body_html+="<br/><div id=\"newversion\" style=\"display: none;\"><br/>You are using an older version of MangaCheetah. Click <a href=\"http://sites.google.com/site/netroscripts/mangacheetah\">here</a> to install the latest version</div><br/><table id=\"footer\" cellspacing=0 style=\"background-color: black; width: 100%; padding-left: 2px;\"><tr><td style=\"width: 188px;\"><a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704\"><img src=\"http://lh6.ggpht.com/_spF6wIYMOPQ/SyCaua0wnmI/AAAAAAAAAVo/h2riAEg4rmE/beer_donate.png\"></a></td><td style=\"vertical-align: center;\"><i>Read manga like a cheetah<br/>bit.ly/netroscripts</i></td><td style=\"width:188px; text-align: right;\"><a href=\"http://sites.google.com/site/netroscripts/mangacheetah\"><img src=\"http://lh5.ggpht.com/_spF6wIYMOPQ/SyCauUVbRoI/AAAAAAAAAVs/W7IZkgRPeCA/cheetah_eye.png\"></a></td></tr></table>"
  document.getElementById("wrapper").innerHTML=body_html;

  document.addEventListener('mousemove',mouseMove,false);
  document.getElementById('drag_block').addEventListener('mouseout',releaseDrag,false);
  
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.innerHTML='if(MCv_currentBuild>'+thisBuild+') document.getElementById(\'newversion\').style.display=\'block\';';
  	body.appendChild(e);
  }catch(e){}
}

// ---------------------------------------------- ONEMANGA ---------------------------------------------------------------------
if(website=="Onemanga"&&proceed==1){
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.innerHTML= add_js+';pageScroll();';
  	body.appendChild(e);
  }catch(e){}
  
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.src= chap_js_src;
  	body.appendChild(e);
  }catch(e){}
}

// ---------------------------------------------- MANGAVOLUME ---------------------------------------------------------------------
if(website=="MangaVolume"&&proceed==1){
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.src= domain+chap_js_src;
  	body.appendChild(e);
  }catch(e){}
  
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.innerHTML= add_js+';pageScroll();';
  	body.appendChild(e);
  }catch(e){}
}

if(proceed==1){

// ---------------------------------------------- Start of DockMonkey ---------------------------------------------------------------------
  if(document.getElementById('dockmonkey_icon')==undefined){
    var DM_name='MangaCheetah'; var DM_onclick='MCf_menu()';
    try{ e= document.createElement('script'); e.type= "text/javascript"; e.src= 'http://bit.ly/dockmonkey-js'; document.getElementsByTagName('body')[0].appendChild(e); }catch(e){} try{ e= document.createElement('script'); e.type= "text/javascript"; e.innerHTML= "DM_option('"+DM_name+"','"+DM_onclick+"')"; document.getElementsByTagName('body')[0].appendChild(e); }catch(e){}
  }
// ---------------------------------------------- End of DockMonkey ---------------------------------------------------------------------
  
// ---------------------------------------------- Options ---------------------------------------------------------------------
  try{
  	e= document.createElement('div');
    e.id= 'mc_menu';
  	e.style.position= 'fixed';
    e.style.top= '-2000px';
    e.style.left= '-2000px';
    e.style.zIndex= '1001';
    e.innerHTML='\
      <div style="width: 300px; -moz-border-radius: 5px; -webkit-border-radius: 5px; background-color: yellow; font-family: Verdana, sans-serif; font-size: 12px; padding: 10px; color: black;">\
        Click on the background color you want:\
        <div id="bg_black" onmouseover="this.style.backgroundColor= \'orange\';" onmouseout="this.style.backgroundColor= \'\';" onclick="document.location=document.location.href;" style="display: block; font-family: Verdana, sans-serif; font-size: 10px; color: black;">Black</div>\
        <div id="bg_white" onmouseover="this.style.backgroundColor= \'orange\';" onmouseout="this.style.backgroundColor= \'\';" onclick="document.location=document.location.href;" style="display: block; font-family: Verdana, sans-serif; font-size: 10px; color: black;">White</div>\
        <div onmouseover="this.style.backgroundColor= \'orange\';" onmouseout="this.style.backgroundColor= \'\';" onclick="MCf_menu();" style="display: block; font-family: Verdana, sans-serif; font-size: 10px; color: black;">Close</a>\
      </div>\
    ';
  	body.appendChild(e);
  }catch(e){}
  document.getElementById('bg_black').addEventListener('click',setToBlack,false);
  document.getElementById('bg_white').addEventListener('click',setToWhite,false);
  try{
  	e= document.createElement('script');
  	e.type= "text/javascript";
  	e.innerHTML= "\
      function MCf_menu(){\
        if(document.getElementById('mc_menu').style.top=='-2000px'){\
          document.getElementById('mc_menu').style.top='100px';\
          document.getElementById('mc_menu').style.left='200px';\
        }\
        else{\
          document.getElementById('mc_menu').style.top='-2000px';\
          document.getElementById('mc_menu').style.left='-2000px';\
        }\
      }\
    ";
  	body.appendChild(e);
  }catch(e){}
  
}