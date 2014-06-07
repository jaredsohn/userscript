// ==UserScript==
// @name           Rangefinderforum scale-down large images
// @namespace      http://userscripts.org/users/lorriman
// @description    Resizes large images to fit your browser
// @require         http://userscripts.org/scripts/source/95009.user.js
// @require       	http://userscripts.org/scripts/source/95007.user.js
// @include        http://www.rangefinderforum.com/forums/showthread*
// @version        .2
// ==/UserScript==


ScriptUpdater.check(103894, ".2");


Config.prefix = document.domain;
Config.footerHtml = '';
Config.reloadOnSave = true;
Config.scriptName = "Rangefinderforum auto image-resizer";
Config.settings = {
	"General":{
		fields:{
			imageClick:{
				type:'checkbox',
				label:'image click focus',
				text:'note: replaces links to external pics',
				value:false,
			},
/*	revisit0	
			insertNextLink:{
				type:'checkbox',
				label:'next link',
				text:'Inserts a \'next\' link to move to next image',
				value:false,
				visible:false,
				enabled:false
			},
			nextLinkWithSpacer:{
				type:'checkbox',
				label:'with spacer',
				text:'adds space below link to get pointer out of pic',
				value:false,
			},
*/			
			resizePercentage:{
				type:'text',
				label:'percentage resize',
				text:'some space top and bottom is recommended',
				value:'95',
			},
			scaleAll:{
				type:'checkbox',
				label:'scale all',
				text:'resizes even small images. Perhaps for presentations?',
				value:false,
			}
			}
		},
		'About':{
			html:'<a href="http://userscripts.org/scripts/show/103894">RFF image auto resizer</a>. <br><br>Written by G Lorriman 2011,<br> <a href="http://www.rangefinderforum.com/forums/private.php?do=newpm&u=24636">PM me</a> if the script breaks or for bug reports. I may otherwise not know.'
		}
}

GM_registerMenuCommand('RFF resizer options', Config.show); 

function get_viewport_height(){
	var elem = (document.compatMode === "CSS1Compat") ? 
	    document.documentElement :
	    document.body;

	var max_height = elem.clientHeight;
	var width = elem.clientWidth;
		return max_height;
}

function get_viewport_width(){
	var elem = (document.compatMode === "CSS1Compat") ? 
	    document.documentElement :
	    document.body;

	var max_height = elem.clientHeight;
	var width = elem.clientWidth;
		return width;
}

max_height=get_viewport_height();
max_width=get_viewport_width();


function processImages(elements,proc){
	
	for(i=0;i<elements.length;i++){
		element=elements[i];
		imgs=element.getElementsByTagName('img');
		for(x=0;x<imgs.length;x++){
			img=imgs[x];
			proc(img);		
		}
	}

}
posts=document.getElementsByClassName('alt1');

processImages(posts,function(img){
	img.setAttribute('oldheight',img.height);
	img.setAttribute('oldwidth',img.width);
});

function heightFunc(img, max_height){
	if(parseInt(img.getAttribute('oldheight'))>max_height){
		img.setAttribute('height',max_height);
	}
}
alertcount=0;
nextCount=0;
processImages(posts,function(img){
		oldHeight=parseInt(img.getAttribute('oldheight'));
		oldWidth=parseInt(img.getAttribute('oldwidth'));
		isQuoted=img.parentNode.parentNode.getAttribute('style')=='border: 1px inset;'
		if(oldHeight>50){	
			if(false){//revisit0 if(Config.get('insertNextLink')){
				aname=document.createElement('a');
				aname.setAttribute('name','internal_link_'+nextCount);
				//the space is so that where you click doesn't move despite quoted images
				aname.innerHTML=(isQuoted?'':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')+'<a href="#internal_link_'+(nextCount+1)+'">next</a><br/>';//+(Config.get('nextLinkWithSpacer')?'<br/>':'');
				
					
				if(img.parentNode.tagName=='A'){
					img.parentNode.parentNode.insertBefore(aname,img.parentNode);
				}else{
					img.parentNode.insertBefore(aname,img);

				}
			}

			if(Config.get('imageClick')){ //revisit0 Config.get('imageClick')!=false){
				//if(nextCount==0){ alert(img.getAttribute('src').slice(0,9));};
				
				if(img.getAttribute('src').slice(0,10)=='attachment'){ return null;};
				if(img.getAttribute('oldheight')<=160){ return null;};
					
				if(img.parentNode.tagName=='A'){
					href=img.parentNode;
					href.removeAttribute('href');
					href.removeAttribute('target');
				}else{
					href=document.createElement('a');	
				}

				//aname.setAttribute('name','internal_image_link_'+nextCount);
				
				next=0;//revisit0  =(Config.get('imageClick')=='next')?1:0;
				href.setAttribute('href','#internal_link_'+(nextCount+next));
				
				if(img.parentNode.tagName!='A'){
					
					//img.parentNode.setAttribute('debug','its me');
					img.parentNode.insertBefore(href,img);
					href.appendChild(img);
							
				}
				//if no next_link then we need to make one
				if(true){//revisit0 !Config.get('insertNextLink')){
					aname=document.createElement('a');
					aname.setAttribute('name','internal_link_'+nextCount);
					aname.innerHTML='<br>';
					img.parentNode.insertBefore(aname,img);
				}
					
			}

			if((oldHeight>(max_height*Config.get('resizePercentage')/100)) || Config.get('scaleAll')){		
				img.setAttribute('height',max_height*Config.get('resizePercentage')/100 );
					
			}
				
			nextCount++;
		}
	}	
)
/*
resizecount=0;
unsafeWindow.addEventListener ("resize", function(){ 
	if((resizecount % 100 )==0){
		alert('resize '+resizecount);
	}
	resizecount++;
	max_height=get_viewport_height; 
	processImages(posts, function(img){ heightFunc(img,max_height)  });           
}
, false);

*/
