// ==UserScript==
// @name        PicsFly
// @namespace    http://sites.google.com/site/netroscripts/picsfly
// @description  View all pictures in a webpage on the fly
// @version        1.1.0
// @copyright      2009, Jenseki Mora
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.5+ 
// @include    *
// ==/UserScript==
//___________________________________________________________________________

// ---------------------------------------------- INITIALIZATION ---------------------------------------------------------------------
var body= document.getElementsByTagName("body")[0];
var head= document.getElementsByTagName("head")[0];

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
function checkdupe(url){
  var l=pics.length;
  var i;
  var res=false;
  if(l>0){
    for(i=0;i<=l;i++){
      if(pics[i]==url){
        i=l+1;
        res=true;
      }
    }
  }
  return  res;
}

// ---------------------------------------------- MAIN ---------------------------------------------------------------------
if(URIget('picsfly')=='yeah'){
  //remove styles
  try{
  	var e= document.createElement('script');
  	e.type= "text/javascript";
    var temp="\
    try{\
      for(var i=0;document.getElementsByTagName('link')[i]!=undefined;i++)\
        if(document.getElementsByTagName('link')[i].rel==\"stylesheet\")\
          document.getElementsByTagName('link')[i].href=null;\
      for(i=0;document.getElementsByTagName('style')[i]!=undefined;i++)\
        if(document.getElementsByTagName('style')[i].id!=\"mc_style\")\
          document.getElementsByTagName('style')[i].innerHTML=\"\";\
    }\
    catch(e){}\
    ";
  	e.innerHTML= temp;
  	head.appendChild(e);
  }catch(e){}

  //add script
  try{
  	var e= document.createElement('script');
  	e.type= "text/javascript";
    var temp="\
    function pf_go(){\
      var out='?&picsfly=yeah';\
      out+='&pf_n='+document.getElementById('pf-select-n').options[document.getElementById('pf-select-n').selectedIndex].value;\
      out+='&pf_show=';\
      if(document.getElementById('pf-checkbox-embedded').checked==true) out+='embedded,';\
      if(document.getElementById('pf-checkbox-linked').checked==true) out+='linked,';\
      if(document.getElementById('pf-checkbox-nodupes').checked==true) out+='nodupes,';\
      out+='&pf_p=1';\
      document.location=document.location.href.substr(0,document.location.href.indexOf('?&picsfly=yeah'))+out;\
    }\
    function pf_go_page(str){\
      var origloc=document.location.href.substr(0,document.location.href.indexOf('?&picsfly=yeah'));\
      var appendloc=document.location.href.substr(document.location.href.indexOf('?&picsfly=yeah'));\
      var p= parseInt(appendloc.substr(appendloc.indexOf('&pf_p=')+6));\
      var out= appendloc.substr(0,appendloc.indexOf('&pf_p='))+'&pf_p='+(str=='next'?p+1:p-1);\
      if(str!='back')\
        document.location=origloc+out;\
      else\
        document.location=origloc;\
    }\
    function pf_imgShrink(i){\
      var img=document.getElementById('img'+i);\
    	var a_w=img.width;\
    	var a_h=img.height;\
      if(a_w>800){\
      	var s_w=800;\
      	var s_h=parseInt((s_w/a_w)*a_h);\
      	img.style.width=s_w+'px';\
      	img.style.height=s_h+'px';\
        document.getElementById('shrinktxt'+i).style.display='block';\
      }\
    }\
  ";
  	e.innerHTML= temp;
  	head.appendChild(e);
  }catch(e){}

  var pics= Array();
  var i=0;
  var j=0;
  if(URIget('pf_show').indexOf('embedded,')>-1){
    var img;
    for(i=0;document.getElementsByTagName('img')[i]!=undefined;i++){
      img=document.getElementsByTagName('img')[i];
      if(img.class!='picsfly-img'){
        if(img.src!=undefined&&img.src!=''&&(URIget('pf_show').indexOf('nodupes,')<0||(URIget('pf_show').indexOf('nodupes,')>-1&&checkdupe(img.src)==false)))
          pics[j++]=img.src;
      }
    }
  }
  if(URIget('pf_show').indexOf('linked,')>-1){
    var obj;
    for(i=0;document.getElementsByTagName('a')[i]!=undefined;i++){
      obj=document.getElementsByTagName('a')[i];
      if(document.getElementsByTagName('a')[i].class!='picsfly-anchor'){
        if(
          (obj.href.indexOf('.jpg')>-1&&obj.href.indexOf('.jpg')+4==obj.href.length)||
          (obj.href.indexOf('.JPG')>-1&&obj.href.indexOf('.JPG')+4==obj.href.length)||
          (obj.href.indexOf('.jpeg')>-1&&obj.href.indexOf('.jpeg')+5==obj.href.length)||
          (obj.href.indexOf('.JPEG')>-1&&obj.href.indexOf('.JPEG')+5==obj.href.length)||
          (obj.href.indexOf('.png')>-1&&obj.href.indexOf('.png')+4==obj.href.length)||
          (obj.href.indexOf('.PNG')>-1&&obj.href.indexOf('.PNG')+4==obj.href.length)||
          (obj.href.indexOf('.gif')>-1&&obj.href.indexOf('.gif')+4==obj.href.length)||
          (obj.href.indexOf('.GIF')>-1&&obj.href.indexOf('.GIF')+4==obj.href.length)||
          (obj.href.indexOf('.svg')>-1&&obj.href.indexOf('.svg')+4==obj.href.length)||
          (obj.href.indexOf('.SVG')>-1&&obj.href.indexOf('.SVG')+4==obj.href.length)||
          (obj.href.indexOf('.bmp')>-1&&obj.href.indexOf('.bmp')+4==obj.href.length)||
          (obj.href.indexOf('.BMP')>-1&&obj.href.indexOf('.BMP')+4==obj.href.length)
        ){
          if(obj.href!=undefined&&obj.href!=''&&(URIget('pf_show').indexOf('nodupes,')<0||(URIget('pf_show').indexOf('nodupes,')>-1&&checkdupe(obj.href)==false)))
            pics[j++]=obj.href;
        }
      }
    }
  }
  
  //generate page
  temp='<table style="width: 100%; background-color: black; color: white; font-family: Verdana, sans-serif; font-size: 12px;"><tr><td style="text-align: left;"><input type="submit" value="Back" onclick="pf_go_page(\'back\');" /> Number of Images per page<select id="pf-select-n"><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select> <input type="checkbox" id="pf-checkbox-embedded"> Show embedded <input type="checkbox" id="pf-checkbox-linked"> Show linked <input type="checkbox" id="pf-checkbox-nodupes"> Filter duplicates <input type="submit" value="Go" onclick="pf_go();" /></td><td style="width: 200px; vertical-align: top; text-align: right;"><b><a style="color: #EF0E2C; text-decoration: none;" class="picsfly-anchor" href="http://sites.google.com/site/netroscripts/picsfly">PicsFly</a></b>   ||   <a style="color: #EF0E2C; text-decoration: none;" class="picsfly-anchor" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704">Buy me a beer</a></td></tr></table>';
  document.body.innerHTML='<div id="wrapper" style="text-align: center;"></div>';
  var p=parseInt(URIget('pf_p'));
  var n=parseInt(URIget('pf_n'));
  var o = n;
  if(pics.length<p*n)
    o=pics.length-(p-1)*n;
  temp+='<br/><b>Page '+p+' (Showing '+o+' of '+pics.length+' images.)</b><br/>';
  for(i=(p-1)*n;i<p*n&&pics[i]!=undefined&&pics[i]!='';i++){
    temp+='<br><small><a href="javascript: void 0;" onclick="document.getElementById(\'img'+i+'\').src=\''+pics[i]+'?'+Math.random()+'\'">Reload Image</a></small><br/><div id="shrinktxt'+i+'" style="display: none;"><small>This image was shrank. Click image to view full size.</small></div><br/><a class="picsfly-anchor" href="'+pics[i]+'" target="_blank"><img class="picsfly-img" id="img'+i+'" src="'+pics[i]+'" style="border: 0px;" onload="pf_imgShrink('+i+');"/></a><br/><br/>';
  }
  if(i==(p-1)*n){
    temp+='<br/>If you still see this message after few moments, then it means there\'s no image left to show. You should go back.';
  }
  else{
    temp+='<br/><br/>'+(p==1?'':'<input type="submit" value="Previous Page" onclick="pf_go_page(\'prev\');" />')+(pics.length>p*n?'<input type="submit" value="Next Page" onclick="pf_go_page(\'next\');" />':'');
  }
  document.getElementById('wrapper').innerHTML=temp;
  
  try{
  	var e= document.createElement('script');
  	e.type= "text/javascript";
    var temp="\
      document.getElementById('pf-select-n').value='"+n+"';\
      "+(URIget("pf_show").indexOf("embedded,")>-1?"document.getElementById('pf-checkbox-embedded').checked=true;":"")+"\
      "+(URIget("pf_show").indexOf("linked,")>-1?"document.getElementById('pf-checkbox-linked').checked=true;":"")+"\
      "+(URIget("pf_show").indexOf("nodupes,")>-1?"document.getElementById('pf-checkbox-nodupes').checked=true;":"")+"\
    ";
  	e.innerHTML= temp;
  	head.appendChild(e);
  }catch(e){}
}
else if(top==self&&document.location.href.indexOf('http')==0){

// ---------------------------------------------- Start of DockMonkey ---------------------------------------------------------------------
  if(document.getElementById('dockmonkey_icon')==undefined){
    var DM_name='PicsFly'; var DM_onclick='window.open(\\\''+document.location.href+'?&picsfly=yeah&pf_n=30&pf_show=embedded,linked,nodupes,&pf_p=1\\\')';
    try{ e= document.createElement('script'); e.type= "text/javascript"; e.src= 'http://bit.ly/dockmonkey-js'; document.getElementsByTagName('body')[0].appendChild(e); }catch(e){} try{ e= document.createElement('script'); e.type= "text/javascript"; e.innerHTML= "DM_option('"+DM_name+"','"+DM_onclick+"')"; document.getElementsByTagName('body')[0].appendChild(e); }catch(e){}
  }
// ---------------------------------------------- End of DockMonkey ---------------------------------------------------------------------

}