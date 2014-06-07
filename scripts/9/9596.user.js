// ==UserScript==
// @name           cPanel File Manager Enhancer
// @namespace      tag:neonpaul@gmail.com,1988-06-25:cpxfmEnhance
// @description    Adds a context menu to the files in file manager for quicker access to actions.
// @include        */frontend/*/files/list.html*
// ==/UserScript==



function get(name,url){
  url=(url?url:window.location);
  var r="";
  var var_string=(url+"?").split("?")[1].split("&");
	for(var i=0;i<var_string.length;i++){
	   var pair=var_string[i].split("=");
	   	if(name==unescape(pair[0].split("+").join("%20"))){
		   var r=pair[1];
		   break;
		}
	}
   return unescape(r);
}



if(get("GM")){
GM_setValue("eventType",get("GM_eventType"));
GM_setValue("root",get("GM_root"));
GM_setValue("publicFolder",get("GM_publicFolder"));
}

var infoBox=document.createElement("div");
infoBox.id="infoBox";

var cxMenu=document.createElement("div");
cxMenu.id="contextMenu";

settings=document.createElement("div");
settings.id="settings";
settings.style.display="none";

GM_addStyle("#infoBox{"
		    +"position: absolute;"
		    +"top: 0px;"
		    +"left: 0px;"
	    +"}"


	    +"#contextMenu, #settings{"
		    +"position: absolute;"
		    +"background: #BBBBBB;"
		    +"border: #CCCCCC 2px solid;"
		    +"border-right: #AAAAAA 2px solid;"
		    +"border-bottom: #AAAAAA 2px solid;"
		    +"padding:2px;"
	    +"}"

	    +"#settings{"
		    +"top:100px;"
		    +"left: 300px;"
	    +"}"

	    +"#settings b{"
		    +"display:block;"
		    +"width:100%;"
		    +"color:white;"
		    +"background:black;"
		    +"height:15px;"
		    +"cursor:move;"
		    +"text-align:center;"
	    +"}"

	    +"#settings #buttons input{"
		    +"width:55px;"
		    +"margin-left:5px;"
		    +"margin-right:5px;"
	    +"}"

	    +"#contextMenu a{"
		    +"display:block;"
		    +"height:18px;"
		    +"vertical-align:middle;"
	    +"}"

	    +"#contextMenu a:hover{"
		    +"background:#014D5F;"
		    +"color:black;"
		    +"text-decoration:none;"
	    +"}");

settings.innerHTML="<b onmousedown=\"mde=arguments[0];document.onmousemove=eval('function(e){document.getElementById(\\'settings\\').style.top=e.pageY-'+mde.layerY+';document.getElementById(\\'settings\\').style.left=e.pageX-'+mde.layerX+';}');document.onmouseup=function(){document.onmousemove=null;};return false\">Settings</b><br>"
		  +"<form name=GM_settings><table>"
			+"<tr><td>Bring up menu on:</td><td><select name=GM_eventType>"
			     +"<option value=click>Click</option>"
			     +"<option value=contextmenu>Context menu</option>"
			     +"<option value=dblclick>Double Click</option>"
			+"</select></td></tr>"
			+"<tr><td>Website root:</td><td><input type=text size=30 name=GM_root value=\""+GM_getValue("root","http://www.yoursite.com")+"\"></td></tr>"
			+"<tr><td>Public folder:</td><td><input type=text size=30 name=GM_publicFolder value=\""+GM_getValue("publicFolder","/root/public_html")+"\"></td></tr>"
			+"</table>"
			+"<input type=hidden name=dir value=\""+get("dir")+"\">"
			+"<div align=center id=buttons><input type=submit name=GM value=Ok><input type=reset value=Cancel onclick=\"document.getElementById('settings').style.display='none'\"></div>"
		  +"</form>"

//			+"<tr><td>Open external links<br>in tabs:</td><td><input type=checkbox name=GM_newTabs value=\"1\""+(GM_getValue("newTabs","1")=="1"?" CHECKED":"")+"></td></tr>"

infoBox.innerHTML="<img src=http://img.photobucket.com/albums/v293/NeonDragon/greasemonkey.jpg float=left>cPanel Enancer is installed.<br>"+
"<a href=javascript:; onclick=\"document.getElementById('settings').style.display='block'\">Click here to adjust settings.</a>";

document.body.appendChild(infoBox);
document.body.appendChild(settings);

if(et=GM_getValue("eventType")){
document.forms[0].elements[0].value=et;
}else{
settings.style.display="block";
}

function appendCXMenu(e,text,action,dir,file){

if(action=="createdir"){
	if(name=prompt("Directory name?")){
		top.frames[1].location.href="domkdir.html?dir="+dir+"&newdir="+name;
	}
}else if(action=="createfile"){
	if(name=prompt("File name?")){
		top.frames[1].location.href="domkfile.html?dir="+dir+"&newfile="+name;
	}
}else{

var img=(action=="select"?"regular":"directory");
var type=(action=="select"?"file":"folder");

cxMenu.innerHTML="<a><img src=\"images/i-"+img+".gif\">"
		+"<b><font size=\"+1\">"+file+"</font></b></a>"
		+"<a href=\"trashit.html?dir="+dir+"&file="+file+"\" onclick=\"return confirm('Are you sure you want to delete the "+type+" \\'"+file+"\\'"+(type=="folder"?" and all files under it":"")+"?')\" target=\"infofr\">Delete "+type+"</a>"
		+"<a href=\"rename.html?dir="+dir+"&file="+file+"\" onclick=\"if(name=prompt('Rename "+file+" to:','"+file+"')){top.frames[1].location.href='dorename.html?newname='+name+'&file="+file+"&dir="+dir+"';return false;}\" target=\"infofr\">Rename "+type+"</a>"
		+"<a href=\"perm.html?dir="+dir+"&file="+file+"\" target=\"infofr\">Permmissions</a>"

		+"<a href=\"fileop.html?opdir="+dir+"&opfile="+file+"&fileop=move\" onclick=\"if(p=prompt('Move "+file+" to (leave blank to browse):','"+dir+"')){top.frames[1].location='dofileop.html?dir='+p+'&opfile="+file+"&opdir="+dir+"&fileop=move'; return false;}else if(p==null){return false;}\">Move "+type+"</a>"
		+"<a href=\"fileop.html?opdir="+dir+"&opfile="+file+"&fileop=copy\" onclick=\"if(p=prompt('Copy "+file+" to (leave blank to browse):','"+dir+"')){top.frames[1].location='dofileop.html?dir='+p+'&opfile="+file+"&opdir="+dir+"&fileop=copy'; return false;}else if(p==null){return false;}\">Copy "+type+"</a>";

if(type=="file"){
cxMenu.innerHTML+="<a href=\"showfile.html?dir="+dir+"&file="+file+"\" target=\"viewer\">Show File</a>"
		 +"<a href=\"editit.html?dir="+dir+"&file="+file+"\" target=\"editor\">Edit File</a>"
		 +"<a href=\"htmledit.html?dir="+dir+"&file="+file+"\" target=_blank>Html Editor</a>";

if((root=GM_getValue("root",false))&&(dir.indexOf(GM_getValue("publicFolder"))==0)){
cxMenu.innerHTML+="<a href=\""+root+"/"+dir.replace(GM_getValue("publicFolder"),"")+"/"+file+"\" target=_blank>Open webpage</a>";
}

}
cxMenu.style.top=e.pageY;
cxMenu.style.left=e.pageX;
document.body.appendChild(cxMenu);

}
}

document.addEventListener("click", function(e){if(!(e.ctrlKey||e.shiftKey||e.altKey)){if(m=document.getElementById("contextMenu")){m.parentNode.removeChild(m)}}}, true);


var files=document.links;

for(var i=0;i<files.length;i++){
   if(files[i].target=="infofr"){
      var action=files[i].href.split("?")[0];
      action=action.substring(action.lastIndexOf("/")+1,action.length).split(".")[0];


      files[i].addEventListener(GM_getValue("eventType","click"), eval("function(e){appendCXMenu(e,'"+files[i].text+"','"+action+"','"+get("dir",files[i])+"','"+get("file",files[i])+"');e.stopPropagation();e.preventDefault();}"), true);
   }

}


document.getElementsByTagName("table")[1].rows[0].cells[1].innerHTML+=" | <a href=# onclick=\"if(l=prompt('Directory:','"+get("dir")+"')){location='?dir='+l;return false;}\">Go...</a>";
