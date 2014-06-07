// ==UserScript==
// @name           YouTube Me Again! (For Rock-Banned)
// @description    I stoled it.  From hateradio.  Sorry.
// @version        1.0

// @date           30/08/2010

// @author         tgd
// @namespace      

// @include        http://*rock-banned.com/forum/showthread.php*
// ==/UserScript==

/* C S S */

var css = '/* youtube me again! */\nobject { clear: both } .ytmainit { display: block;\
 background: #333 /*cf5f4e*/; margin: 0px; color: #fff; cursor: pointer; font-size: 9px;\
 -moz-border-radius: 3px 3px 0px 0px; -webkit-border-top-left-radius: 3px; font-style: normal;\
 -webkit-border-top-right-radius: 3px; font-weight: bold; text-shadow: #333 0px 0px 2px;\
 padding: 2px 4px; opacity: .8; text-align: left; } .ytmwrap { clear: both; overflow: hidden;\
 margin: 3px 0px; font-style: normal; } .ytmsidebar { margin: 0px; padding: 0px;\
 list-style-type: none; clear: both; overflow: hidden; width: 340px; } .ytmsidebar li {\
 display: inline; cursor: pointer; float: left; background: #606060;\
 color: #fff;  margin: 3px 1px 2px 0px; padding: 1px 5px 1px; font-size: 12px; font-weight: bold;\
 font-family: Arial, Helvetica, sans-serif !important;\
 text-shadow: #333 0px 0px 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px;\
 } .ytmsidebar li:hover { background: #df3829; color: #fff !important }\
 li[id^=\"sel\"] { background: #333 !important; color: #eee !important }\
 .ylinks { display: block; width: 125px; height: 80px; text-align: center; cursor: pointer; overflow: hidden;\
 margin: 3px 0px; background-color: #333 !important; -moz-border-radius: 4px; -webkit-border-radius: 4px; }\
 .ylinks img { border: 0px; padding-top: 10px; opacity: .6 } .ylinks:hover img { opacity: .45 }\
 span[hide] {display: none}  .ypg { background: url(http://i48.tinypic.com/dr7e6g.png)\
 right 3px no-repeat; padding: 0 11px 0 0; }\n/* youtube me again! */\n';

var place = document.getElementById("content");

var heads = document.getElementsByTagName("head");
var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 

// "global" vars for size and dimmension + selections

var size = 1;
var dimm = 1;
var sel1 = 1;
var sel2 = 1;

/* C L A S S */

function ytma(){
	this.all = document.getElementsByTagName('a');	
	this.idu = false; //modified unique id given to anchor tag
	this.idr = false; //real id
	this.spn = false; //span link
	this.img = false;
	this.opn = false;
	this.wrp = document.createElement('div');
	this.ul  = document.createElement('ul');
	this.inj = document.createElement('div');
	this.obj = document.createElement('object');
	this.reg = /v=([A-Za-z0-9-_]{11})/;
	this.hrf = false;
	this.ret = /#t\=(\d*?)m?(\d*?)s/;
	this.rst = false;
	this.gif = 1;
}

ytma.prototype.li=function(txt,f,n,t){
	with(this){
		var l = document.createElement("li");
			l.appendChild(document.createTextNode(txt));
		if( f == "changesize" ){
			if (sel2 == n) l.id = "sel-"+idu;
			l.addEventListener("click", function(){ changesize(n) }, false);
			l.addEventListener("click", function(){ colors(this,0) } , false);
		} else if ( f == "changedim" ){
			if (sel1 == n) l.id = "seldim-"+idu;
			l.addEventListener("click", function(){ changedim(n) }, false);
			l.addEventListener("click", function(){ colors(this,1) } , false);
		} else {
			l.addEventListener("click", function(){ repo(n) }, false);
		}
		if (t !== undefined) l.setAttribute("title",t);
		return l;
	}
}

ytma.prototype.colors=function(x,n){

	with(this){
		if(n == true){
			if(document.getElementById('seldim-'+idu)){
				document.getElementById('seldim-'+idu).removeAttribute("id");
			}
			x.id = "seldim-"+idu;
		} else {
			if(document.getElementById('sel-'+idu)){
				document.getElementById('sel-'+idu).removeAttribute("id");
			}
			x.id = "sel-"+idu;
		}
	}
	
}

ytma.prototype.prm=function(n,v){

	var prm = document.createElement("param");
	prm.name = n;
	prm.value = v;
	return prm;
}

ytma.prototype.output=function(){

	with(this){
		
		if(!opn){		
			stime();
		
			/* O B J E C T  T A G */		
			obj.id     = "o"+idu;
			obj.data   = 'http://www.youtube-nocookie.com/v/'+idr+'?hl=en_US&fs=1&hd=1'+rst;
			changesize(size);
			obj.appendChild(prm("movie",obj.data));
			obj.appendChild(prm("allowFullScreen","true"));
			obj.appendChild(prm("allowscriptaccess","always"));
			obj.appendChild(prm("fs","1"));
			
			/* O P T I O N S */
			ul.id      = "u"+idu;
			ul.setAttribute("class","ytmsidebar");
			ul.appendChild(li("Hide","changesize",3,"To Show Video, Click on Small/Medium/Large"));
			ul.appendChild(li("Small","changesize",0,"Smaller Size"));
			ul.appendChild(li("Medium","changesize",1,"Medium Size"));
			ul.appendChild(li("Large","changesize",2,"Large Size"));
			ul.appendChild(li("16:9","changedim",0,"Change Aspect Ratio"));
			ul.appendChild(li("4:3","changedim",1,"Change Aspect Ratio"));
			ul.appendChild(li("Close \327","repo"));		
			
			
			/* D I V I S I O N S */
			wrp.id     = "w"+idu;
			wrp.setAttribute("class","ytmwrap");
			
			inj.id     = "i"+idu;
			
			/* M A G I C */

			wrp.appendChild(ul);
			inj.appendChild(obj);
			wrp.appendChild(inj);
		}		
		spn.parentNode.insertBefore(wrp,spn.nextSibling);
		if(size == 3) {	changesize(1); }
		opn = true;	
	}
}

ytma.prototype.changedim=function(n){

	sel1 = n;
	
	with(this){
		if(n == 0){
			obj.height = Math.round((obj.getAttribute("width")*9)/16)+25; // +25 pixels for the youtube bar
			dimm = 0;
		} else {
			obj.height = Math.round((obj.getAttribute("width")*3)/4)+25;
			dimm = 1;
		}
	}
}

ytma.prototype.changesize=function(n){

	sel2 = n;
	
	with(this){
		if(n == 0){
			obj.width = 320;
			obj.height = 265;
			size = 0;
		} else if (n == 1){
			obj.width = 425;
			obj.height = 344;
			size = 1;
		} else if (n == 2){
			obj.width = 800;
			obj.height = 625;
			size = 2;
		} else if (n == 3){
			obj.width = 0;
			obj.height = 0;
			size = 3;
		}		
		changedim(dimm);
	}
}

ytma.prototype.repo=function(){
	with(this){
		showhide(1);
		var del = document.getElementById("w"+idu);
		del.parentNode.removeChild(del);
	}
}

ytma.prototype.showhide=function(n){
	with(this){ n ? spn.removeAttribute("hide") : spn.setAttribute("hide","true"); }
}

ytma.prototype.init=function(){
	with(this){
		output();
		showhide();
	}
}

ytma.prototype.pseudogif=function(){

	with(this){
		gif = gif < 3 ? gif+1 : 1;
		spn.style.backgroundImage='url(http://img.youtube.com/vi/'+idr+'/'+gif+'.jpg';
		time = setTimeout(function(){ pseudogif() },1000);
	}
	
}

ytma.prototype.stop=function(){
	
	with(this) clearTimeout(time);
}

ytma.prototype.stime=function(){

	with(this) {
		if(rst = hrf.match(ret)) {
			if(rst[1]) rst[1] = parseInt(rst[1])*60;
			if(rst[2]) { rst = rst[1] + parseInt(rst[2]); rst = '&start='+rst; }
		}
	}
}

ytma.prototype.sea=function(){
	
	with(this){
	
		for(i in all){
		
			href = all[i].href;
			
			if(all[i].parentNode.getAttribute('class') != 'smallfont' && reg.test(href)){
			
				var id = RegExp.lastParen;
				
				all[i].setAttribute('id',id+i);
				
				var x = new ytma();
			
				with(x){
				
					idu = id+i;
					idr = id; //real id
					hrf = href;
					
					// img
					
					img = document.createElement('img');
					img.src = 'http://www.gstatic.com/apps/gadgets/youtube/play.png';
					img.heigh = 41;
					img.width = 58;
					
					// a
					
					spn = document.createElement('span');
					spn2 = document.createElement('span');
					spn2.appendChild(document.createTextNode("YouTube Me!"));
					spn2.setAttribute("class","ytmainit");
					spn.id = "s"+idu;
					spn.addEventListener('click', function(){ init(); }, false);
					spn.addEventListener('mouseover',function(){ pseudogif(); },false);
					spn.addEventListener('mouseout',function(){ stop(); },false);
					spn.setAttribute('class','ylinks');
					spn.setAttribute('style','background: url(http://img.youtube.com/vi/'+id+'/1.jpg)');
					spn.title = 'YouTube Me! Play Video Here';
					spn.appendChild(spn2);
					spn.appendChild(img);
					
					// thumbs
					
					i1 = document.createElement('img');
					i1.src = 'http://img.youtube.com/vi/'+idr+'/1.jpg';
					i2 = document.createElement('img');
					i2.src = 'http://img.youtube.com/vi/'+idr+'/2.jpg';
					i3 = document.createElement('img');
					i3.src = 'http://img.youtube.com/vi/'+idr+'/3.jpg';
					
					// ins
					
					all[i].parentNode.insertBefore(spn, all[i]);
					all[i].title = 'Go To The Video\'s YouTube Page';
					all[i].setAttribute('class','ypg');
					
					
				}
			}
		}
	}
}

var start = new ytma();
start.sea();