// ==UserScript==
// @name           Blank Slate
// @namespace      realillusions
// @description    Just a field for writing things
// @include        http://www.digital-inflection.com/visigoth/blankSlate.html
// ==/UserScript==

function $(find){
if(document.getElementsByTagName(find)[0]){
	return document.getElementsByTagName(find);
	}

else{return document.getElementById(find)}
}

function changeColor(lol){
newcolor=$('chooser').value;
if(lol.keyCode==13){
	if(newcolor.length==3){newcolor=newcolor.charAt(0)+newcolor.charAt(0)+newcolor.charAt(1)+newcolor.charAt(1)+newcolor.charAt(2)+newcolor.charAt(2);}
$('typing').style.color=newcolor;
$('chooser').value=""
}
}

function fadeText(direc){
	if(direc=="down"){
		for(var x=1;x>.19;x=x-.01){
		setTimeout("document.getElementById('menu').style.opacity="+x,200/x);
		}
	}
	if(direc=="up"){
		for(var x=.21;x<1.01;x=x+.01){	
		setTimeout("document.getElementById('menu').style.opacity="+x,500*x);
		}
	}
}

function fileBox(switcher){
if($('savebox')){$('savebox').parentNode.removeChild($('savebox'));}
//Creates Save Box popup
var savebox = document.createElement('div');
savebox.id="savebox"
var closebox = document.createElement('div');
closebox.innerHTML="X";
closebox.id="closebox";
closebox.setAttribute('style','position:absolute;right:10px;top:10px;border:1px solid #aaa;padding:3px;font-size:15px;cursor:pointer;color:#aaa');
closebox.addEventListener('click',function(){$('savebox').parentNode.removeChild($('savebox'));},true);
if(switcher=="1"){
savebox.innerHTML="Which slot would you like to save in?"
for(var x=1;x<6;x++){
eval('var saveslot'+x+' = document.createElement("div");\
	 	saveslot'+x+'.id="slot"+'+x+';\
	 	saveslot'+x+'.addEventListener("click",function(e){saveFiles(e)},true);\
	 	saveslot'+x+'.innerHTML=GM_getValue("slot'+x+'"," ")+"<br/><i>\' "+GM_getValue(GM_getValue("slot'+x+'",-1),"Slot #'+x+'")+" \'</i>";\
	 	savebox.appendChild(saveslot'+x+');')
}
}
else if(switcher=="2"){
savebox.innerHTML="Load which file?"
for(var x=1;x<6;x++){
eval('var saveslot'+x+' = document.createElement("div");\
	 	saveslot'+x+'.id="slot"+'+x+';\
	 	saveslot'+x+'.addEventListener("click",function(e){loadFiles(e)},true);\
	 	saveslot'+x+'.innerHTML=GM_getValue("slot'+x+'"," ")+"<br/><i>\' "+GM_getValue(GM_getValue("slot'+x+'",-1),"Slot #'+x+'")+" \'</i>";\
	 	savebox.appendChild(saveslot'+x+');')
}
}
savebox.appendChild(closebox);
$('body')[0].appendChild(savebox);
}

function saveFiles(clicked){
var filename = prompt("File Name?","");
	//Must enter a file name
	if(filename!=null){
			//...and it has to actually be something
			if(filename==""){alert("Please enter a file name");var filename = prompt("File Name?","");}
		
		//prevent OHSHIT I LOST IT!
		if(GM_getValue(GM_getValue(clicked.target.id,0),-1)!=-1 && confirm("File exists in slot, overwrite?")==1){
			GM_setValue(clicked.target.id,filename);
			GM_setValue(filename,$('typing').value);
			}
		else{GM_setValue(clicked.target.id,filename);GM_setValue(filename,$('typing').value);}
		clicked.target.innerHTML=filename+"<br/><i>' "+$('typing').value+" '</i>";	
	}
}


function loadFiles(clicked){
$('typing').value = GM_getValue(GM_getValue(clicked.target.id,-1),"File doesn't exist");
document.title="Blank Slate: "+GM_getValue(clicked.target.id,"Error")
}

function getReady(){
	$('i')[0].addEventListener("click", function(){$('chooser').style.display=="block" ? $('chooser').style.display="none" : $('chooser').style.display="block"}, true);
	$('i')[1].addEventListener('click', function(){fileBox("1")},true);
	$('i')[2].addEventListener('click', function(){fileBox("2")},true);
	$('chooser').addEventListener("keypress",function(e){changeColor(e)},true);
	$('typing').addEventListener('focus',function(){fadeText("down");$('chooser').style.display="none";},true);
	$('typing').addEventListener('blur',function(){fadeText("up")},true);
	if(GM_getValue("slot5",-1)==-1){
		//No save slots, oh noes!
		for(var x=1;x<6;x++){GM_setValue("slot"+x,"")}
		}
}

function setStyle(){
var int = document.createElement('style');
int.innerHTML="body{background:black;text-align:center;}\
					#typing{background:black;border:1px solid #222;color:#5f5;font-family:monospace;font-size:10px;width:75%;height:80%}\
					div#menu,#menu i{font-style:normal!important;color:#5f5;font-size:10px;}\
					#menu i:hover{cursor:pointer;text-decoration:underline;}\
					#chooser{display:none;width:200px;height:1.5em;border:1px solid #555;background:black;color:#5f5;font-size:10px;margin:0px auto;}\
					#savebox {position:absolute;left:300;top:32px;height:424px;width:685px;background-color:#222;color:#aaa;border:1px solid #777;text-align:center;padding:15px;font-family:arial;}\
					#savebox i{font-size:11px;}\
					#slot1,#slot2,#slot3,#slot4,#slot5{width:450px;height:45px;padding:3px 0px;color:#aaa;margin:5px auto 16px;background-color:#444;cursor:pointer;overflow:hidden;font-size:18px;border:1px solid #444;}\
					#slot1:hover,#slot2:hover,#slot3:hover,#slot4:hover,#slot5:hover{border-color:#777}\
					#about{position:absolute;bottom:3px;left:3px;font-size:10px;color:#222;font-family:verdana;}\
					#about a{color:#222;}\
					#about:hover,#about:hover a{color:#5f5}"
$('head')[0].appendChild(int);
}

setStyle();
getReady();