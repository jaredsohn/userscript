// ==UserScript==
// @name           whirlpool short url linker 
// @namespace      beh
// @description    show the final destination link when you hover over the anchor
// @include        http://forums.whirlpool.net.au/*
// @version        0.1
// ==/UserScript==



if(document.URL.indexOf('http://forums.whirlpool.net.au/forum-replies.cfm?t=')>-1){

	var tPrev={
		mousePos:{
			y:0,
			x:0
		},
		sTo:null
	};

	var modDiv=document.createElement('div');
	modDiv.setAttribute('id','modDiv');
	modDiv.setAttribute('style','position:absolute;z-index:50;display:none;width:200px;height:70px;background-color:white;border:2px solid grey;');
	
	var modDivA=document.createElement('a');
	modDivA.setAttribute('href','#');
	modDivA.setAttribute('style','float:right;padding:2px 5px;color:grey;font-weight:bold;text-decoration:none;');
	modDivA.innerHTML='X';

	modDiv.appendChild(modDivA);
	
	modDivA.addEventListener('click',function(e){	
		e.preventDefault();
		modDiv.style.display='none';
		this.blur();
		return false;
	}, false);	
	
	var modDivTex=document.createElement('input');
	modDivTex.setAttribute('id','modDivTex');
	modDivTex.setAttribute('style','margin:8px 10px;width:175px;');
	modDivTex.setAttribute('readonly','true');	
	modDivTex.setAttribute('type','text');	
	modDivTex.setAttribute('size','75');	
	
	modDiv.appendChild(modDivTex);

	document.body.appendChild(modDiv);

	[].forEach.call(document.querySelectorAll('a.greylink[title="a link to this specific post"]'), function (item) {
		item.addEventListener('mouseover',function(e){
			tPrev.mousePos.x = (e.clientX+window.pageXOffset)-185;
			tPrev.mousePos.y=(e.clientY+window.pageYOffset)-90;
			tPrev.sTo=setTimeout(function(){
				modDiv.style.display='block';
				modDiv.style.left=tPrev.mousePos.x+'px';
				modDiv.style.top=tPrev.mousePos.y+'px';	
				var pageU=document.querySelector('#top_pagination .current a');
				if(!pageU){
					pageU=document.URL;
				}
				else{
					pageU=pageU.href;
				}
				if(pageU.indexOf('#')>-1){
					pageU=pageU.split('#')[0];
				}
				modDivTex.value=pageU+'#'+e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.querySelector('a[name^="r"]:nth-child(1)').name.split('r')[1];				

			},2000);
		}, false);
		item.addEventListener('mouseup',function(e){	//not sure why click doesn't work
			clearTimeout(tPrev.sTo);
		}, false);		
		item.addEventListener('mouseout',function(e){
			clearTimeout(tPrev.sTo);
		}, false);	
	});
	
}