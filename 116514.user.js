// ==UserScript==
// @name           dev_star_com
// @namespace      dev_star_com
// @description    keep an eye on selected comments!
// @include        http://*.deviantart.com/*
// @version        1.35
// ==/UserScript==

// if(navigator.appName=="Opera"){
	// var storage=window.opera.scriptStorage;
	// if(storage){
		// GM_setValue=function(Name, Wert) {
			// storage.setItem(Name,Wert);
			// };
		// GM_getValue=function(Name) {
			// return storage.getItem(Name);
			// }
	// }else{
		// var hint = document.createElement('div');
		// hint.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 600)/2 - 20) +"px;top:"+ ((window.innerHeight - 150)/2 - 20) +"px;width:600px;height:150px;padding:10px;border:1px double black;position:absolute;z-index:999;");
		// hint.id="devhint";
		// hint.innerHTML="If you want to use this script, you have to allow Script-Storage!<br />ScriptStorage is a way to save data within opera that is only available to the userscript that saved it<br />To enable it, please visit <a href='opera:config#PersistentStorage|UserJSStorageQuota'>here</a> and insert a bigger number than 0! (depends on how many comments you would like to save. a good value is about 5000)<br /><p style='text-align:center' ><a style='cursor:pointer;' onclick='document.body.removeChild(document.getElementById(\"devhint\"));'>Close</a></p>";
		// document.body.appendChild(hint);	
	// }	
// }

var favimg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjFBQjg0MUQwQUQzMTFFMDlGNEJBQTYxODAyODQ0Q0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjFBQjg0MUUwQUQzMTFFMDlGNEJBQTYxODAyODQ0Q0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MUFCODQxQjBBRDMxMUUwOUY0QkFBNjE4MDI4NDRDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MUFCODQxQzBBRDMxMUUwOUY0QkFBNjE4MDI4NDRDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsMpo20AAARhSURBVHjapFVbTxtHFD4zu%2Btdr23WNhhjG2QMIdTQUolIuajqA2qrJFKlKFJaNVUfKvUhvyB9qPLYp%2F6HPkSqqqip1ItUKRFPSIFWpEASCKSUSx0qIOAbNl6vd3dmOmNvm5JWgJSRj3Z9Lt85882cs3Lv6VHo2H4GR62edPsn2Wz8xtLSs883coUvj%2FLPd8UBwzGWEWuLBwLy1XRqLy2eRiwUP04cPkYFyAj6PuxN%2BzMfXGasN61nxH%2Bhf2nwyG6%2BIxiQL118S82EAhRdfFvJBAPKJaF%2FafBYxH8llVASo9kCACEwOlSEVFJJtoe1K0fFyocZz715Ypi57rXzY2pKlU0ACqAqAOfHtGR1v%2BMahfjE9NTa4lHgUS4DGKP2SFQ%2FaRj%2BXstykoi4g5lud%2FDMsOUDyriLEApnR%2Fb02Qe%2BV9Y30NfJlLEcDKprhUJtu1Q0lyllfIvwO5ci4lcRX%2BjW7qiq1JlORx3Or6875dcMQ4ZktNzTZeQ0VbG9Gjg4YoD4UVqOD21X0vXNQmSjXLbhz03L2q%2B5du6PktJouDt3N%2BwLonJFxvVgts%2Bf%2Bfh9FlIViwEtAGMMAS1xMwd2vdPhwEA5NxxdlWqQjq76e2LhkwwjrtJ4Qhlu3rIri781OIeSIsDR7IZ9vVqtfOEj26evvqtIqs8rVGLeCy9V0IIEMAaGCc8hbHVgDhfMoO5QuPU9dX%2F5VV5YKfk%2F5cFICqcSrApyuVKDJ2bZHtqvkK5sL8Yypq0qqWBDVEyafDMOyhht7YyrGWFg2Rz4B%2BZO3MczC3n9Rh5pD7mz1QTnL66F5ULVREtm2RkqFEl4ZAD5moWzJkIzUTMHbWYToEjsxnIJ3PwW9icf4IePC4HPypI2wx32uRABLmYLM4NBhyfI75bYAqmzQdtyIiP9TG3SwUS1rEkN8xJxJRL623egOjWvTE9vBq7XfNojAczxKMd73kRCIQx1XZ99tE5%2FatgqA9KiRVAhGojwpyiYcFpcToeQuqOSuWV2t6Gpi38DH7jnYoJ5SxjMuKFGTySZRjk4ETdE%2FLB4tDinghZMmgGpGPJHdMXYA6iJ%2BH9h%2FbdDz2ZjyF5pjLQpFSBOq3H%2BaR%2BJAsWt%2B97cDV9hv8UCWmj4WO1fXdmKGz4IhHRen6CF38KnuwBTC4jOr8ulV%2FtI5MxrFCc6WrtvC1EucmTYcroeO8rmoeCY0b6QjsOpCEXlKoV785I1Pidt7VSl1TrSZla3rVOTC27%2F2KiTeGOE%2BBMRigN%2BCFct1s%2FDDwVHioQGOg2I%2FvgzakzMK1tFU17bsvTbOdDHub0BEFTTJfOdvUnzvYk5t%2B%2Fc6yTaEUbt%2BT0Y4PZ7HoP%2FD44kVDZrJpt6Iq%2FvkuBX9y3tO64Xc0AcmDhFKcf0b3J1ffyUz7o8vVj9SJJqEZCC5VYrPwcXg%2BsAOJcQl04B4oFWWgMG6AvfATEk2sT3xEu6I47ssMpbAwNgy3u3vUD2gh9tUQRFrxuR53vA7y8BBgAmTyJY%2F3idRQAAAABJRU5ErkJggg%3D%3D";
var notfavimg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOASURBVEhLpZVJSJtBFMeT2NLS0gqFttD2ZIOixQ3FqDWuuFVxibig4pIiNiJSMQH14K5xN64Igoh46qE99SIKuSiCh8ajhSBpjz3YVDEW9Zv%2B%2Fx%2BJBNuagMKfycz33m%2FevHnzDFD4%2BZecnPw2NTX1Y2Bg4LHD4fjip5tvM41G8zQ7O3ujsbFR4si5by%2F%2FLJSIuLWystI%2BMzNzUVVVZU9JSWmFq9I%2F92us1Gr145ycHGt%2Ff7%2B0uLgo9fX1SZxz%2FcbwuLg4Q0VFxT6ilhYWFiSOmH%2BNjY013AheWlr6SqfT2Xp6eo7n5%2BdlONXd3X3M9eLi4jCfG4SFhT0KDg7WhIaGvkGk79PT0y1JSUkfSkpK9urr60%2Fn5uYkwin%2BpriO7zbaZWZmDtOP%2FuSQ59lUVVRUtF5WVmZraWnZNZlMe8PDw0zDPqI8mZ2dvQTyt5cENjuh3dDQ0L7RaNxrbm7exWlthYWF64CrFLiYOwUFBdsGg8G5uroqra2tXSwvL1NypMyxt6anp%2BU5RoETiKWlJVkrKysCPqKhocGZn5%2B%2FTa4iMjLybnR09GuU21Ztbe3Z5OTkJYwgL5hksVjkOcepqSlBwV5MTEwInFagTM%2Fw2LbII1eB%2FARAgREREen4sFNTU3MGYxngLYAIlMXvBF4FI%2F875JBHrpz3qxsggqPx8fFLGE%2FjEdfdEhiF2WwW5eXlR%2F8Ee5WSKjw8%2FCE2wgNMsSJFPz1ARuqBjo6OSm4JjAIn%2FYWUbqBSNPSXL%2FI%2Ff6qoqKgHISEhprq6ukNCuQHBY2NjMnRkZERCtBJzTFVXVx%2FSnn7XgS9ThJo1t7W1uTxADxQwGTw4OEgJqqmp6RQXOOATTDpScgsX%2Bxn17mKUFKEU6lkGDwwMUILC23DFx8d%2F8guu1Wqf44VaOzs7XYySam9vl3D8c7TbH7jsc2ws9fb2CgqPx5WWlmZFUM98tgLcujY3N9cG6GlXV5ek1%2BtPcGF2RLeOPm6G1gGyY7OTjo4OgT7zG12SbUDrC66Eox5P%2BBt6hxMnOEhMTNyMiYl5h0t7iWp4wZHzhISETWx6gJM40cS%2BI5V6Xz1eBQddXl6eIysry4aNjISxEfE58z44cs51AI0ZGRk22DrwTecr70rWKqQGIATjE%2FkZ%2F127Kq7zu9tO7a7x6%2F874ci3g4KC7qN13mOk1xyVKbxFO9rT72rO%2FwAJ2DoMsxrvMwAAAABJRU5ErkJggg%3D%3D";

var favmessid=new Array();
var favmessparam=new Array();
var topclick=false;
var onc=0;

init();
function resets(){
	if(GM_getValue("dev_star_com_username_starid")){
		favmessid=GM_getValue("dev_star_com_username_starid").split(String.fromCharCode(13));
		for(var i in favmessid){
			GM_deleteValue("star_"+favmessid[i]);
		}
		GM_deleteValue("dev_star_com_username_starid");
		GM_deleteValue("dev_star_com_username_starpar");
		favmessid="";
		init();
	}
}
function init(){
	GM_registerMenuCommand("reset dev_star_com", resets,"r");
	favbutinsert();
	if(document.getElementsByClassName("page2")[0]){//Message-Center-Pages
		var cont = document.getElementsByClassName("page2")[0];
		var clickbut=document.createElement("a");
		clickbut.className="f";
		clickbut.id="def_star_com_menu";
		clickbut.setAttribute("style","cursor: pointer;");
		clickbut.innerHTML="<i class='icon i19'></i><span class='ttext'>Starred Comments</span>";
		
		var notelink=document.getElementsByClassName("page2")[0].getElementsByClassName("f");
		for(var lin in notelink){
			if(notelink[lin].getAttribute("mcuid")=="notes"){notelink=notelink[lin];break;}
		}		
		cont.insertBefore(clickbut,notelink.nextSibling);

		clickbut.addEventListener('click',anzeige,false);
		cont.addEventListener('click',raumer,false);
		// var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
		// $("#overhead .oh-l").click(raumer);
		document.getElementById("overhead").addEventListener('click',function(){topclick=true;raumer();},false);
		
	}
	if(location.href.match(/.*#view=starrCom.*/)){anzeige();}
}

function favbutinsert(){	
	if(!(location.href.match(/.*?\.deviantart\.com(\/#\/.*)?/)||location.href.match(/.*?\.deviantart\.com\/art\/.*/)||location.href.match(/.*?\.deviantart\.com\/gallery\/.*/))){return;}
	
	var arr=document.getElementsByClassName('cc-meta');
	if(location.href.match(/.*?\.deviantart\.com(\/#\/.*)?/)&&onc==0){onc=1;setTimeout(favbutinsert,2000);return;}
	if(arr[0]){ //page contains comments
		if(GM_getValue("dev_star_com_username_starid")){favmessid=GM_getValue("dev_star_com_username_starid").split(String.fromCharCode(13));}
		for(var i in arr){
			if(arr[i].tagName=="DIV"){
				var favbut = document.createElement("img");
				favbut.className="dev_favbut";
				var gmid=arr[i].parentNode.parentNode.parentNode.parentNode.getAttribute("gmi-commentid")
				if(favmessid.indexOf(gmid)==-1){
					favbut.src=notfavimg;
					favbut.setAttribute("akt","1");
				}else{
					favbut.src=favimg;
					favbut.setAttribute("akt","0");
				}
				
				favbut.setAttribute("style","position: absolute;right: 70px;");
				arr[i].appendChild(favbut);
				favbut.addEventListener('click',umschalt,false);
			}
		}
	}else{
		if(onc<10){
			onc++;
			setTimeout(favbutinsert,2000);
		}	
	}
}


function raumer(){
		var aktiv=document.getElementsByClassName("f selected");
		if(typeof aktiv[0] == "undefined" || aktiv[0].id!="def_star_com_menu" || topclick){
			topclick=false;
			var inh=document.getElementsByClassName("mczone dev_star_com");
			if(inh.length==0){return;}
			inh[0].parentNode.removeChild(inh[0]);
		}
		
}

function parget(obj){
	var ausgabe=new Array();
	var parname=new Array("gmi-splitid","gmi-private","gmi-typeid","gmi-itemid");
	for(var i in parname){
		ausgabe.push(obj.getAttribute(parname[i]));
	}
	return ausgabe.join(String.fromCharCode(12));
}
function parpush(obj,idd){
	var parname=new Array("gmi-splitid","gmi-private","gmi-typeid","gmi-itemid");
	for(var i in parname){
		obj.setAttribute(parname[i],favmessparam[idd].split(String.fromCharCode(12))[i]);
	}
}

function umschalt(){
	if(this.getAttribute("akt")=="1"){
		this.setAttribute("akt","0");
		this.src=favimg;
		if(GM_getValue("dev_star_com_username_starid")){favmessid=GM_getValue("dev_star_com_username_starid").split(String.fromCharCode(13));}
		if(GM_getValue("dev_star_com_username_starpar")){favmessparam=GM_getValue("dev_star_com_username_starpar").split(String.fromCharCode(13));}
		var gmi_id=this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("gmi-commentid");
		favmessid.push(gmi_id);	
		favmessparam.push(parget(this.parentNode.parentNode.parentNode.parentNode.parentNode));
		GM_setValue("star_"+gmi_id,this.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML);
		GM_setValue("dev_star_com_username_starid",favmessid.join(String.fromCharCode(13)))
		GM_setValue("dev_star_com_username_starpar",favmessparam.join(String.fromCharCode(13)))
	}else{
		this.setAttribute("akt","1");this.src=notfavimg;
		var gmi_id=this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("gmi-commentid")
		if(GM_getValue("dev_star_com_username_starid")){favmessid=GM_getValue("dev_star_com_username_starid").split(String.fromCharCode(13));}
		if(GM_getValue("dev_star_com_username_starpar")){favmessparam=GM_getValue("dev_star_com_username_starpar").split(String.fromCharCode(13));}
		favmessparam.splice(favmessid.indexOf(gmi_id),1);
		favmessid.splice(favmessid.indexOf(gmi_id),1);		
		GM_setValue("star_"+gmi_id,"");
		GM_setValue("dev_star_com_username_starid",favmessid.join(String.fromCharCode(13)))
		GM_setValue("dev_star_com_username_starpar",favmessparam.join(String.fromCharCode(13)))
	}
}
function anzeige(){
	var offset=0;
	var patt=/.*deviantart\.com\/messages\/.*#view=starrCom.*-0*(\d+).*/;
	if(location.href.match(patt)){offset=parseInt(location.href.match(patt)[1]);}
	if(GM_getValue("dev_star_com_username_starid")){favmessid=GM_getValue("dev_star_com_username_starid").split(String.fromCharCode(13));}
	if(GM_getValue("dev_star_com_username_starpar")){favmessparam=GM_getValue("dev_star_com_username_starpar").split(String.fromCharCode(13));}
	var aktiv=document.getElementsByClassName("f selected");
	if(aktiv[0]){aktiv[0].className="f";}
	document.getElementById("def_star_com_menu").className="f selected";
	var inh=document.getElementsByClassName("messages-right")[0];
	inh.innerHTML="";
	var divcont=document.createElement("div");
	divcont.className="mczone dev_star_com";
	divcont.innerHTML="<h2 class='mczone-title'>"+ favmessid.length + " starred Comments</h2>";
	inh.appendChild(divcont);		
	
	for(var i=offset;i<favmessid.length&&i<(10+offset);i++){
		var favbut = document.createElement("div");
		favbut.className="ccomment ch";		
		favbut.setAttribute("gmi-commentid",favmessid[i]);
		favbut.setAttribute("name","gmi-CComment");
		favbut.setAttribute("data-gmiclass","CComment");
		parpush(favbut,i);
		favbut.innerHTML=GM_getValue("star_"+favmessid[i]);
		divcont.appendChild(favbut);
		var interfavimg=document.getElementsByClassName("dev_favbut");
		interfavimg[interfavimg.length-1].addEventListener('click',umschalt,false);
	}
	
	var bbtext="<div class='pagination'><ul class='pages'><li class='prev'><a class='";
	if(offset==0){bbtext+='disabled';}else{bbtext+='away';}
	bbtext+="' id='dev_star_com_prev'>Previous</a></li><li class='next'><a class='";
	if(offset+10>=favmessid.length){bbtext+='disabled';}else{bbtext+='away';}
	bbtext+="' id='dev_star_com_next'>Next</a></li></ul></div>";
		
	var navi=document.createElement("div");
	navi.innerHTML=bbtext;
	navi.className="pagination-wrapper";
	divcont.appendChild(navi);
	
	if(!location.href.match(/#view=starrCom/)){location.href=location.href.replace(/#.*/,"")+"#view=starrCom-0";}
	
	if(offset!=0){
		document.getElementById("dev_star_com_prev").addEventListener('click', function(){
			location.href=location.href.replace(/#.*/,"")+"#view=starrCom-"+(offset-10);	
			anzeige();
		});
	}
	if(offset+10<favmessid.length){	
		document.getElementById("dev_star_com_next").addEventListener('click', function(){
			location.href=location.href.replace(/#.*/,"")+"#view=starrCom-"+(offset+10);		
			anzeige();
		});	
	}
	
}
