// ==UserScript==
// @name           danbooru ajax
// @namespace      ftf.at.ua
// @include			http://danbooru.donmai.us/post*
// @include			http://safebooru.donmai.us/post*
// @include			http://danbooru.izhnet.org/post*
// @include			http://chan.sankakucomplex.com/*
// ==/UserScript==
(function(){
var stylesh=".note-box{position:absolute;border:1px solid black;width:150px;he"+
	"ight:150px;cursor:move;background:#FFE;}.note-box>div.note-corner{backgro"+
	"und:black;width:7px;height:7px;position:absolute;bottom:0;right:0;cursor:"+
	"se-resize;}.note-body{background:#FFE;border:1px solid black;display:none;"+
	"max-width:300px;min-width:140px;min-height:10px;position:absolute;padding"+
	":5px;cursor:pointer;overflow:auto;}"+
	".note-link{overflow:show;position:absolute;margin-top:-18px;height:16px;b"+
	"order:3px solid black;border-bottom:0px none;top:0px;background:none #fff}";
 var query={"busy":false,"call":function(){var query=this;var req;cb=function(req1){if(req1)req=req1;if(req.readyState==4){if(req.status==200)if(query.call2){query.call2(req.responseText)}query.call()}};if(this.q.length>0){next=this.q.shift();if(typeof(GM_xmlhttpRequest)!='undefined'){GM_xmlhttpRequest({"url":next[0],"method":next[2]?"POST":"GET","data":next[2]?next[2]:null,"headers":next[2]?{'Content-type':'application/x-www-form-urlencoded'}:{},"onreadystatechange":cb});}else{req=typeof(XMLHttpRequest)!='undefined'?new XMLHttpRequest():typeof(ActiveXObject)!='undefined'?new ActiveXObject("MSXML2.XMLHTTP"):(alert('u\'r browser don\'t support XMLHTTP'));req.onreadystatechange=cb;req.open(next[2]?"POST":"GET",next[0],true);req.send(next[2]?next[2]:null);}this.call2=next[1];this.busy=true}else{this.busy=false};cb=null},'q':[],'add':function(uri,call,ispost,post){this.q.push([uri,call,typeof(ispost)!=undefined?ispost:0,typeof(post)!=undefined?post:null]);if(!this.busy)this.call()}};
 var cached_posts={};
 //query.add(uri,callback,postdata)
 function $(id){return document.getElementById(id);}
 function $x(xpath,root){
	root=root?root:document;
	var a=document.evaluate(xpath,root,null,7,null);
	var b=[];
	for(var i = 0; i < a.snapshotLength; i++) {
		b[i] = a.snapshotItem(i);
	}
	return b;
 }
 
 function create(type,params){
	if(type=="#text"){
		return document.createTextNode(params);
	}else{
		var node=document.createElement(type);
	}
	for(var i in params)if(i=="kids"){
	    for(var j in params[i]){
	        if(typeof(params[i][j])=='object'){
				node.appendChild(params[i][j]);
	        }
	    }
	}else if(i=="style"){
		if(typeof(params[i])=='string'){
			node.style.cssText=params[i];
		}else{
			for(var j in params[i])
				node.style[j]=params[i][j];
		}
	}else if(i=="class"){
		node.className=params[i];
	}else if(i=="#text"){
		node.appendChild(document.createTextNode(params[i]));
	}else{
		node.setAttribute(i,params[i]);
	}
	return node;
 }
 function kill(obj){
 	var i;
	if(typeof(obj)!='object'||!obj.childNodes)return;
	while(obj.childNodes.length){
		kill(obj.childNodes[0]);
	}
	obj.parentNode.removeChild(obj);
 }
 body=document.body;
 var left=180;
 function zoom(txt){
 	var url=txt.match(/<a href="(http:\/\/[^"]*?\/data\/([a-z0-9\/]*)[^"]*)".*?onclick="Post.highres/i);
	if(!url)
	 	var url=txt.match(/<a.*?onclick="Post.highres[^>]*?href="(http:\/\/[^"]*?\/data\/([0-9a-f]{32})[^"]*)"/i);
	if(!url)return;
	var md5=url[2];
	url=url[1];
	var pre='http://'+document.domain+'/data/preview/'+md5+'.jpg';
	var xy=txt.match(/<li>Size: (?:<[^>]*>)?(\d+)x(\d+)/i);
	var id=txt.match(/Note.post_id = (\d+)/i);
	id=id?id[1]:'';
	zoom_img(url,pre,xy,md5,id);
 }
 function zoom_img(url,pre,xy,md5,id){
	var div=$(id+'d');
	var yo=window.pageYOffset;
	yo=yo<89?89:yo;
	if(div){
		div.style.top=yo;
	}else{
		var img=create('img',{'src':url,'id':id+'i','style':'position:absolute;'
			+'width:'+xy[1]+'px;height:'+xy[2]+'px'});
		var pre=create('img',{'src':pre,'id':id+'p','style':'position:absolute;'
			+'width:'+xy[1]+'px;height:'+xy[2]+'px'});
		img.addEventListener('load',function(){kill(pre)},false);
		div=create('div',{'id':id+'d','style':'width:'+xy[1]+'px;height:'
			+xy[2]+'px;position:absolute;border:3px solid black;'
			+'left:'+left+'px;top:'+(yo+20)+'px;','kids':[pre,img]});
		if(dp)div.style.zIndex=++dp.maxz;
		div.addEventListener('click',function(e){
						if(dp&&dp.dragged)return;
						var o=e.target;
						if(o.tagName!='DIV')
							o=o.parentNode;
			if(!o.id.match(/^[0-9]+d$/))return;
						kill(o);
						e.preventDefault();
					},false);
		query.add("http://"+document.domain+"/note/index.json?post_id="+id,append_trans);
		body.appendChild(div);
 	}
	
 }
 function append_trans(e){
	var d=eval("("+e+")");
	if(!d.length)return;
	var id=d[0].post_id;
	var cont1=$(id+"d");
	var cont=create("div",{"id":"notes-"+id,style:"display:block"});

	cont1.appendChild(cont);
	var c=d.length;
	var tls=false;
	var nbox,nbody;
	for(var i=0;i<c;i++){
		if(d[i].is_active){
			tls=1;
			nbox=create("div",{id:"note-box-"+d[i].id,
				style:"width:"+d[i].width+"px;height:"+d[i].height+"px;"+
					"top:"+d[i].y+"px;left:"+d[i].x+"px;"+
					"opacity:0.5;z-index:0;position:absolute;",
				class:"note-box"});
			nbody=create("div",{id:"note-body-"+d[i].id,
				class:"note-body",
				style:"z-index:10;top:"+(d[i].height+d[i].y+5)+"px;left:"+d[i].x+
					"px;display:none;height:auto;min-width:22px;position:absolute",
			});
			notes_events(nbox);
			nbody.innerHTML=d[i].body.replace("\n","<br>\n");
			cont.appendChild(nbox);
			cont.appendChild(nbody);
		}
	}
	if(tls){
		var tll=create("a",{href:"#",id:"notel-"+id,kids:[create("#text","Show/hide notes")]});
		tll.addEventListener("click",switchnotes,0);
		var tld=create("div",{class:"note-link"});
		tld.appendChild(tll);
		cont1.insertBefore(tld,cont1.lastChild);
	}
 }
 function switchnotes(e){
	var id=e.target.id.substr(6);
	var d=$("notes-"+id);
	d.style.display=(d.style.display=="none")?"block":"none";
 }
 var note_timers={};
 function note_hover(e){
	var id=e.target.id.substr(9);
	$("note-body-"+id).style.display="block";
	if(note_timers[id]){
		clearTimeout(note_timers[id]);
		delete note_timers[id];
	}
 }
 function note_out(e){
	var id=e.target.id.substr(9);
	note_timers[id]=window.setTimeout('$("note-body-"+'+id+').style.display="none"',500);
 }
 function notes_events(obj){
	obj.addEventListener("mousemove",note_hover,0);
	obj.addEventListener("mouseout",note_out,0)
 }
 function imgclick(e){
	obj=e.target;
	var id=obj.parentNode.parentNode.id.substr(1);
	var _=cached_posts[id];
	if(_){
		zoom_img(_.file_url,_.preview_url,[0,_.width,_.height],_.md5,id);
	}else{
	 	query.add(obj.parentNode.href,zoom);
	}
	e.preventDefault();	
 }
 /* DRAG! */
 function gp(x){s='';for(i in x)s+=i+',';return s}
 var dp={'on':0,'obj':null,'point':[0,0],'dragged':0,'maxz':100};
 function drag_click(ev){
 	var t=ev.target;
 	if(t.tagName=="IMG")t=t.parentNode;
 	if(!t.id.match(/^[0-9]*d$/))return;
 	dp.on=1;
 	dp.obj=t;
	apply_drag(t);
 	dp.dragged=0;
 	with(dp.obj)
		dp.point=[offsetLeft-ev.clientX,
			offsetTop-ev.clientY];
	dp.obj.style.zIndex=++dp.maxz;
 	ev.preventDefault();
 }
 function drag_move(o){
 	if(!dp.on)return;
 	with(dp.obj.style){
 		left=(dp.point[0]+o.clientX>0)?(dp.point[0]+o.clientX+'px'):'0px';
 		top=(dp.point[1]+o.clientY>0)?(dp.point[1]+o.clientY+'px'):'0px';
 	}
 	dp.dragged=1;
 }
 function drag_off(){
 	document.removeEventListener('mouseup',drag_off,0);
 	document.removeEventListener('mousemove',drag_move,0);
 	dp.on=0;
 	dp.obj=null;
 }
 function apply_drag(obj){
 	document.addEventListener('mouseup',drag_off,0);
 	document.addEventListener('mousemove',drag_move,0);
 }
 document.addEventListener('mousedown',drag_click,false);

 /* /DRAG */
 function cache_posts(t){
	var data=eval("("+t+")");
	var c=data.length;
	var d=$x("//div[@class='content']/div[3]")[0];
	var img,span;
	for(var i=0;i<c;i++){
 		cached_posts[data[i].id]=data[i];
		//showing teh magick!
		if(!$("p"+data[i]["id"])){
			img=create("img",{
				class:"preview "+(data[i].parent_id?"has-parent ":"")+
					(data[i].has_children=="true"?"has-children ":"")+
					(data[i].status=="pending"?"pending ":""),
				width:data[i].preview_width,
				height:data[i].preview_height,
				alt:data[i].tags,
				src:data[i].preview_url
			});
			img.addEventListener("click",imgclick,0);
			span=create("span",{class:"thumb",id:"p"+data[i]["id"],kids:[
					create("a",{href:"/post/show/"+data[i]["id"],kids:[img]})
				]});
			d.appendChild(span);
		}
	}
 }
 function DO(){
	var st=create("style");
	st.innerHTML=stylesh;
	var head=$x("//head")[0];
	head.appendChild(st);
 	var imgs=document.getElementsByTagName('img'); 
	if(document.location.href.match(/\/post\/?|complex\.com\/$/)){
		query.add(a=document.location.href.replace(/complex.com\/$|\/post\/?(index(\.php)?)?/,"$2/post/index.json"),cache_posts);
	}
 	var i;
	kill($('upgrade-account')||undefined);
 	for(i=0;i<imgs.length;i++){
 		if(imgs[i].className.match(/\bpreview\b/i)){
			imgs[i].addEventListener('click',imgclick,false);
		}
 	}
 }
 DO();
 //window.addEventListener('load',DO,false);
})();
