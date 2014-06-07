// ==UserScript==
// @name           draugiem.lv image save by FileBag.org
// @namespace      http://draugiem.lv
// @description    draugu bildes
// @include        *
// ==/UserScript==
function TrimUsingRecursion(str) {
  if(str.charAt(0) == "(")
  {  str = TrimUsingRecursion(str.substring(1));
  }
  if (str.charAt(str.length-1) == "(")
  {  str = TrimUsingRecursion(str.substring(0,str.length-1));
  }
  return str;
}
function TrimUsingRecursions(str) {
  if(str.charAt(0) == ")")
  {  str = TrimUsingRecursion(str.substring(1));
  }
  if (str.charAt(str.length-1) == ")")
  {  str = TrimUsingRecursion(str.substring(0,str.length-1));
  }
  return str;
}

function getElementsByIds(class_name)
      {
        var all_obj,ret_obj=new Array(),j=0,teststr;

        if(document.all)all_obj=document.all;
        else if(document.getElementsByTagName && !document.all)
          all_obj=document.getElementsByTagName("*");

        for(i=0;i<all_obj.length;i++)
        {
          if(all_obj[i].id.indexOf(class_name)!=-1)
          {
            teststr=","+all_obj[i].id.split(" ").join(",")+",";
            if(teststr.indexOf(","+class_name+",")!=-1)
            {
              ret_obj[j]=all_obj[i];
              j++;
            }
          }
        }
        return ret_obj;
     }
	 
function getElementsByClassName(class_name)
      {
        var all_obj,ret_obj=new Array(),j=0,teststr;

        if(document.all)all_obj=document.all;
        else if(document.getElementsByTagName && !document.all)
          all_obj=document.getElementsByTagName("*");

        for(i=0;i<all_obj.length;i++)
        {
          if(all_obj[i].className.indexOf(class_name)!=-1)
          {
            teststr=","+all_obj[i].className.split(" ").join(",")+",";
            if(teststr.indexOf(","+class_name+",")!=-1)
            {
              ret_obj[j]=all_obj[i];
              j++;
            }
          }
        }
        return ret_obj;
     }
	 
function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function container(){
	try{
	var linki = '<p id="bildes_linki"></p>';
	var el = getElementsByClassName("navigation");
	if(el.length >0){
	var ex = el[0];
	ex.innerHTML+=linki;
	}else{
	var kkas = getElementsByClassName("gpicn");
	var ex = kkas[kkas.length-1];
	var kk = document.createElement("p");
	kk.id="bildes_linki";
	insertAfter(ex,kk);
	}
	}catch(e){
	}
}
//eventu apstraaade
function AttachEvent(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
	else{
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){ MyFireEvent(obj,evt) };
	}
} 
function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
}
//evenu apstraades

function check(){
	var bigs = document.getElementById('bottPicLeft');
	if(bigs){
	window.setTimeout(bigpic,2000);
	}else{
	container();
	window.setTimeout(rep,2000);
	}
}

function deload(){
	clearTimeout();
	window.setTimeout(bigpic,2000);
}

window.bigpic = function(){
	var big_pic = document.getElementById('imgArea');
	var url = big_pic.style.backgroundImage;
	var str = url.replace(/(url)/i,"");
	str = TrimUsingRecursion(str);
	str = TrimUsingRecursions(str);
	var small = str.replace(/(large_)/i,"small_");
	var cont = document.getElementById('bottPicLeft');
	var bull = document.getElementById('download');
	if(bull==null){
	var str_links="<div id='download'><fieldset id='bull'><legend>Bildes lejupielādei</legend><p class='textlinks'>";
	str_links += "<div style='float:left;width:100px;height:60px;overflow:hidden;background-image:url("+small+");margin:5px;cursor:pointer;' onClick='window.open(\""+str+"\",\""+str+"\",\"status = 1, height = 480, width = 600, resizable = 0\")'></div>";
	str_links+="</p></fieldset></div>";
	cont.innerHTML+=str_links;
	}else{
	var str_links="<fieldset id='bull'><legend>Bildes lejupielādei</legend><p class='textlinks'>";
	str_links += "<div style='float:left;width:100px;height:60px;overflow:hidden;background-image:url("+small+");margin:5px;cursor:pointer;' onClick='window.open(\""+str+"\",\""+str+"\",\"status = 1, height = 480, width = 600, resizable = 0\")'></div>";
	str_links+="</p></fieldset>";
	bull.innerHTML=str_links;
	}
	setTimeout(bigpic,2000);
}
	 
window.rep = function(){
var divi = getElementsByIds("th");
var cont = getElementsByClassName("albThBlock");
var bildes = new Array();
var bildes_s = new Array();
var small = "";
var str_links="<br style='clear:both;'/><fieldset><legend>Bildes lejupielādei</legend><p class='textlinks'>";
for(var i=0;i<divi.length;i++){
	var elem = divi[i];
	AttachEvent(elem.parentNode,'click',deload,false);
	var url = elem.style.backgroundImage;
	var str = url.replace(/(url)/i,"");
	str = TrimUsingRecursion(str);
	str = TrimUsingRecursions(str);
	small = str;
	str = str.replace(/(small_)/i,"large_");
	bildes[i]=str;
	str_links += "<div style='float:left;width:100px;height:60px;overflow:hidden;background-image:url("+small+");margin:5px;cursor:pointer;' onClick='window.open(\""+str+"\",\""+str+"\",\"status = 1, height = 480, width = 600, resizable = 0\")'></div>";
}
str_links+="</p></fieldset>";
if(typeof document.getElementById("bildes_linki") == 'undefined' || document.getElementById("bildes_linki") == null){
container();
var el = document.getElementById("bildes_linki");
}else{
var el = document.getElementById("bildes_linki");
}
el.innerHTML=str_links;
window.setTimeout(rep,2000);
}
check();