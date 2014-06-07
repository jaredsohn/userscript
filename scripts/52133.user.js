// ==UserScript==
// @name           shuushuucompaq
// @namespace      ftf.at.ua
// @include        http://*.e-shuushuu.net/*
// @include        http://e-shuushuu.net/*
// ==/UserScript==
function $(id){return document.getElementById(id);}
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
	}else if(i=="#text"){
		node.appendChild(document.createTextNode(params[i]));
	}else{
		node.setAttribute(i,params[i]);
	}
	return node;
}
function delnode(obj){
	if(!typeof(obj)=="object")return;
	while(obj.childNodes.length)
		delnode(obj.childNodes[0]);
	obj.parentNode.removeChild(obj);
}
/*------------*/
var cssadd='.post_block{display:none;}#donations,#links,#banner,#sidebar{displ'
+'ay:none;}#content{float:left!important;width:982px!important;}.post .title{w'
+'idth:850px!important}.image_thread,.title{width:970px!important;max-width:in'
+'herit!important;}#sidebar{left:200px}.image_block{width:702px!important;}.me'
+'ta,.shreps{width:500px!important;float:right}';

//Looks REALLY ugly, I know...
var searchform='<form class="norm" id="search_form" method="post" action="/sea'
+'rch/process/"><h2>Image Description</h2><ul><div><li><label for="tags">Tags:'
+'</label><input type="text" class="text" size="30" id="tags" name="tags" auto'
+'complete="off"/><div class="tooltip">Input image theme tags here enclosed in'
+' double quotes and separated by spaces.<br/>Example: "dress" "ribbon"</div><'
+'div class="search_suggest_div"/></li></div><div><li class="odd"><label for="'
+'source">Source:</label><input type="text" class="text" size="30" id="source"'
+' name="source" autocomplete="off"/><div class="tooltip">Input source tags he'
+'re enclosed in double quotes and separated by spaces.<br/>Example: "Cardcapt'
+'or Sakura"</div><div class="search_suggest_div"/></li></div><li><label for="'
+'char">Characters:</label><input type="text" class="text" size="30" id="char"'
+' name="char"/><div class="tooltip">Find images with specific characters.  Yo'
+'u can use * as a wildcard.<br/>Example: *asuka*</div></li><div><li class="od'
+'d"><label for="artist">Artist:</label><input type="text" class="text" size="'
+'30" id="artist" name="artist" autocomplete="off"/><div class="tooltip">Input'
+' artist tags here enclosed in double quotes and separated by spaces.<br/>Exa'
+'mple: "Tony Taka"</div><div class="search_suggest_div"/></li></div></ul><h3>'
+'Comment Properties</h3><ul><li><label for="postcontent">Comment Content:</la'
+'bel><input type="text" class="text" size="30" id="postcontent" name="postcon'
+'tent"/><div class="tooltip">Search for comments that include specific text. '
+' You can use * as a wildcard.<br/>Example: *kawaii*</div></li><li class="odd'
+'"><label for="txtposter">Comment Author:</label><input type="text" class="te'
+'xt" size="30" id="txtposter" name="txtposter"/><div class="tooltip">Find ima'
+'ges that include comments by a specific user.<br/>Example: kagemaru</div></l'
+'i></ul><h3>Search Options</h3><ul><li><label for="thumbs">Thumbnail Layout:<'
+'/label><input type="checkbox" class="checkbox" value="1" id="thumbs" name="t'
+'humbs"/></li><li class="odd"><label for="hide_disabled">Hide Disabled:</labe'
+'l><input type="checkbox" class="checkbox" value="1" id="hide_disabled" name='
+'"hide_disabled"/></li></ul><p class="submit"><input type="submit" class="but'
+'ton" value="Submit"/></p></form>';
var head=document.getElementsByTagName("head")[0];
var divoff=142;
function showhideSB(ev){
	var sidebar=$('sidebar');
	sidebar.style.display=sidebar.style.display=='none'?'block':'none';
	ev.preventDefault();
}
function showhidesearch(ev){
	var searchdiv=$('search_div');
	searchdiv.style.display=searchdiv.style.display=='none'?'block':'none';
	ev.preventDefault();
}
function closesearch(ev){
	if(ev.target.tagName.match(/input/i))return;
	var searchdiv=$('search_div');
	searchdiv.style.display=searchdiv.style.display=='none'?'block':'none';
	ev.preventDefault();
}
function zoomimg(ev){
	var maxx=document.body.clientWidth-2;
	var img=ev.target;
	if(img.tagName.toLowerCase()!='img')
		img=img.getElementsByTagName('img')[0];
	if(!img)return;
	var a=img.parentNode;
	var src=a.href;
	var thumb=src.replace(/\/images\/([\d-]+)\.\w+/i,'/images/thumbs/$1.jpeg');
	var xy=getsize(a);
	//xy=['',''];
	var resized;
	if(xy[0]>maxx-142-4)
		resized=1;
	if(xy[0]>maxx){
	 xy[1]=xy[1]*maxx/xy[0];
	 xy[0]=maxx;
	 resized=1;
	}
	var back=create('img',{'src':thumb,'style':
	 'height: '+xy[1]+'px;width:'+xy[0]+'px;'
	 +'position:absolute;left:0px;'});
	var full=create('img',{'src':src,'style':'position:absolute;left:0px;'+
	     'height: '+xy[1]+'px;width:'+xy[0]+'px;'
	});
	var div=create('div',{'kids':[back,full],'style':	'height: '+xy[1]+'px;width:'
	 +xy[0]+'px;background:#F5FAFF;position:absolute;left:'+(resized?'-142':'4')
	 +'px;top:29px;z-index:998;border:1px solid #B3D9FF;'});
	div.addEventListener('click',kill,false);
	full.addEventListener('load',function(ev){
		delnode(ev.target.previousSibling);
	},false);
	var out=a.parentNode;
	out.insertBefore(div,a);
	out.style.cssText='height: '+xy[1]+'px;width:'+(resized?900:xy[0])+'px;';
	ev.preventDefault();
}
function getsize(a){
 var tmp=a.parentNode.parentNode.getElementsByTagName('dt');
 for(var i=0;i<tmp.length;i++)if(tmp[i].innerHTML=='Dimensions:'){
  dt=tmp[i];
 }
// var dt=select(a.parentNode.parentNode,'dt',{'innerHTML':'Dimensions:'})[0];
 var dd=dt.nextSibling.nextSibling;
 var sz=/(\d+)x(\d+)/.exec(dd.innerHTML);
 return sz.slice(1);
}
function kill(ev){
	var target=ev.target;
	if(target.tagName.toLowerCase()!='div')
		target=target.parentNode;
	target.parentNode.style.cssText='';
	delnode(target);
	ev.preventDefault();
}
function select(root,tagname,params){
	var sel=[];
	var c=0;
	if(typeof(params)=="function"){
		var tmp=root.getElementsByTagName(tagname);
		var i;
		for(i in tmp)
			if(params(tmp[i]))
				sel[c++]=tmp[i];
	}else if(typeof(params)=="object"){
		var tmp=root.getElementsByTagName(tagname);
		var i,j,f;
		for(i in tmp){
			f=true;
			for(j in params)
				if(params[j]!=tmp[i][j])
					f=false;
			if(f)sel[c++]=tmp[i];
		}
	}else{
		sel=root.getElementsByTagName(tagname);
	}
	return sel;
}
function addshowhidereps(div){
	if(div.lastChild.className=='shreps')return;
	if(typeof(div)!='object')return;
	var blockid=div.id.replace(/i(\d+)/i,'post_block_$1');
	var post_block=document.getElementById(blockid);
	if(!post_block||post_block.childNodes.length<=1)return;
	post_block.style.display="none";
	var a=create('a',{'href':'#','#text':'[Show/hide replies]'});
	var adiv=create('div',{'class':'shreps','kids':[a]});
	a.addEventListener('click',function(ev){
		post_block.style.display=(post_block.style.display=="none")?'block':'none';
		ev.preventDefault();
	},false);
	var to=div.getElementsByClassName('image_block')[0];
	var reply=div.getElementsByClassName('post_foot')[0];
	if(reply){
	post_block.appendChild(reply);
	}
	to.appendChild(create('br'));
	to.appendChild(adiv);
}
function initsearch(){
	var top_nav=document.getElementById('top_nav');
	var search_a=top_nav.childNodes[4].firstChild;
	var content= $('content');
	var searchdiv=create('div',{'id':'search_div'});
	searchdiv.style.cssText="position:absolute;display:none;z-index:999;"
	    +"background:#F5FAFF none;border:1px solid #B3D9FF;padding:12px "
	    +"3px 3px 3px;left:261px";
	searchdiv.innerHTML=searchform;
	content.insertBefore(searchdiv,content.firstChild);
	search_a.addEventListener('click',showhidesearch,false);
	searchdiv.addEventListener('click',closesearch,false);
}
function init(){
	var i;
	var css=create('style',{'type':'text/css','#text':cssadd});
	head.appendChild(css);
	var sidebar=$('sidebar');
	var content=$('content');
	var top_nav=$('top_nav');
	content.insertBefore(sidebar,content.firstChild);
	sidebar.style.cssText="position:absolute;display:none;z-index:999;"
	    +"background:#F5FAFF none;border:1px solid #B3D9FF;padding:3px";
	var link=create("a",{'#text':'Sidebar','href':'#'});
	top_nav.insertBefore(create('li',{'kids':[link]}),top_nav.firstChild);
//	content.insertBefore(create('br'),content.childNodes[1]);
	link.addEventListener('click',showhideSB,false);
	sidebar.addEventListener('blur',showhideSB,false);
	var imgs=select($('content'),'a',{'className':'thumb_image'});
	for(i=0;i<imgs.length;i++)
		imgs[i].addEventListener('click',zoomimg,false);
	imgs=null;
	var posts=document.getElementsByClassName('image_thread');
	for(i=0;i<posts.length;i++){
		addshowhidereps(posts[i]);
	}
	posts=null;
	initsearch();
}
init();
