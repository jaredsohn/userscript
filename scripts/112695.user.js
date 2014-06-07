// ==UserScript==
// @name           SecurityNL
// @namespace      scripts.seabreeze.tk
// @description    Voegt verschillende opties toe aan Security.NL, zoals het weergeven van de gebruikersiconen en een keuzemenu voor nieuwe forumtopics.
// @version        0.0.2 alpha
// @include        https://secure.security.nl/*
// @include        http://www.security.nl/*
// @include        http://security.nl/*
// @match          https://secure.security.nl/*
// @match          http://www.security.nl/*
// @match          http://security.nl/*
// ==/UserScript==

//Wrapper function
(function(){

	//Functions
	function getDoc(url, callback, c_arguments) {
	    GM_xmlhttpRequest({
	        method: 'GET',
	        url: url,
	        onload: function (responseDetails) {
	          var dt = document.implementation.createDocumentType("html", 
	              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
	            doc = document.implementation.createDocument('', '', dt),
	            html = doc.createElement('html');

	          html.innerHTML = responseDetails.responseText;
	          doc.appendChild(html);
	          callback(doc, c_arguments);
	        }
	    });
	}
	
	
	function insert(z,t){
		var j,f,x,c,i,n,d
		d=document
		c=d.createElement
		i=d.head.appendChild
		a=d.createTextNode
		if(typeof z==='function') j,f=!0;
		if((t=='js'||!t)&&!f){j=!0;f=!1}
		if(t=='css'&&!j){x=c('style');x.setAttribute('type','text/css')}
		if(j){x=c('script');x.setAttribute('text/javascript')}
		if(f) n=a('('+z+')()');else n=a(z)
		x.appendChild(n)
		
		if(x){return i(x)}else{return !1}
	}


	//Comments tweaks
	if(/^https?:\/\/(www\.|secure\.)security.nl\/artikel\//.test(window.location.href)){
		var commentsNode=document.getElementById('commentsNode');
		//if(!commentsNode) return; Disabled because it will block loading user images for threads with no replies
		insert('.last-change{bottom:0 !important}textarea.text{width:624px !important;}','css')
		
		for(var i=0;i<document.getElementsByTagName('a').length;i++){
			var node=document.getElementsByTagName('a')[i];
			if(node.parentNode.getAttribute('class')==='author'&&node.getAttribute('href')&&node.getAttribute('href').length&&node.parentNode.parentNode.parentNode.parentNode.parentNode===commentsNode&&node.parentNode.parentNode.parentNode.getAttribute('class')==='body'){
			    node.parentNode.parentNode.parentNode.style.overflow='auto';
				
				//Handle edits of own posts by moving the "Last modified" message. Currently not working.
				node.parentNode.parentNode.parentNode.parentNode.addEventListener('DOMNodeInsertedIntoDocument',function(event){
					GM_log("!!!!!!!!!!!!!!!!!!!!!!!!!")
					GM_log(event.target.innerHTML)					
				},false);
				
				getDoc(node.href,function(callback,commentKeeper){
					//alert(callback.getElementsByTagName('html').innerHTML);
					for(var y=0;y<callback.getElementsByClassName('icon').length;y++){
						if(/\/user_image\/\d+/.test(callback.getElementsByClassName('icon')[y].src)&&/article-body/.test(callback.getElementsByClassName('icon')[y].parentNode.getAttribute('class'))){
							var icon=callback.getElementsByClassName('icon')[y];
							var ico=document.createElement('div');
							ico.setAttribute('style','width:100px;background:black;height:100px;background: url('+icon.src+') no-repeat center center;float:left');
							if(!commentKeeper)return;
							commentKeeper.parentNode.insertBefore(ico,commentKeeper);
							commentKeeper.parentNode.style.borderLeft='0.67px solid #92BADE';
						}
					};
				},node.parentNode.parentNode.parentNode);
			}else if(node.parentNode.parentNode.parentNode.getAttribute('class')==='article-body'&&node.parentNode.getAttribute('class')==='author'&&node.getAttribute('href')&&node.getAttribute('href').length){
			
				getDoc(node.href,function(callback,commentKeeper){
					//alert(callback.getElementsByTagName('html').innerHTML);
					for(var y=0;y<callback.getElementsByClassName('icon').length;y++){
						if(/\/user_image\/\d+/.test(callback.getElementsByClassName('icon')[y].src)&&/article-body/.test(callback.getElementsByClassName('icon')[y].parentNode.getAttribute('class'))){
							var icon=callback.getElementsByClassName('icon')[y];
							var ico=document.createElement('div');
							ico.setAttribute('style','width:100px;background:black;height:100px;background: url('+icon.src+') no-repeat center center;position:absolute;display:none;top:0;left:0;z-index:100;margin-left:-50px;margin-top:15px;');
							if(!commentKeeper)return;
							
							var x=document.body.insertBefore(ico,document.body.firstChild);
							
						/*	GM_log('*********** '+ typeof document.body.style.width + ' ***********')
							GM_log('*********** '+ typeof document.body.style.borderRadius + ' ***********')
							GM_log('*********** '+ typeof x.style.borderRadius + ' ***********')*/
							
							//This will apply a rounded corner style to the tooltip without throwing CSS errors
							switch(true){
								//W3C standard
								case typeof x.style.borderRadius==='string':
								x.style.borderRadius='8px'
								break;
								
								//Mozilla
								case typeof x.style.MozBorderRadius==='string':
								x.style.MozBorderRadius='8px'
								break;
								
								//Webkit
								case typeof x.style.WebkitBorderRadius==='string':
								x.style.WebkitBorderRadius='8px'
								break;
								
								//KHTML
								case typeof x.style.KhtmlBorderRadius==='string':
								x.style.KhtmlBorderRadius='8px'
								break;
								
								//Microsoft
								case typeof x.style.MsBorderRadius==='string':
								x.style.MsBorderRadius='8px'
								break;
								
								//Opera
								case typeof x.style.OBorderRadius==='string':
								x.style.OBorderRadius='8px'
								break;
							}
							
							//This will give the tooltip a nice error-free shadow
							switch(true){
								//W3C standard
								case typeof x.style.boxShadow==='string':
								x.style.boxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
								
								//Mozilla
								case typeof x.style.MozBoxShadow==='string':
								x.style.MozBoxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
								
								//Webkit
								case typeof x.style.WebkitBoxShadow==='string':
								x.style.WebkitBoxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
								
								//KHTML
								case typeof x.style.KhtmlBoxShadow==='string':
								x.style.KhtmlBoxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
								
								//Microsoft
								case typeof x.style.MsBoxShadow==='string':
								x.style.MsBoxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
								
								//Opera
								case typeof x.style.OBoxShadow==='string':
								x.style.OBoxShadow='7px 12px 5px rgba(20%,20%,20%,.75)';
								break;
							}
							
							commentKeeper.addEventListener('mouseover',function(e){
								x.style.left=e.pageX+'px'
								x.style.top=e.pageY+'px'
								x.style.display='block'
							},false);
							
							commentKeeper.addEventListener('mouseout',function(e){
								x.style.display='none'
							},false);
							
							commentKeeper.addEventListener('mousemove',function(e){
								x.style.left=e.pageX+'px'
								x.style.top=e.pageY+'px'
							},false);
							//commentKeeper.parentNode.style.borderLeft='0.67px solid #92BADE';
						}
					};
				},node);
			
			}//else GM_log(node.parentNode.innerHTML+'\n'+node.parentNode.parentNode.parentNode.getAttribute('class')==='article-body'&&node.parentNode.getAttribute('class')==='author'&&node.getAttribute('href')&&node.getAttribute('href').length&&node.parentNode.parentNode.parentNode.getAttribute('class')==='body')
		}
	
		//Add video download button
		var vid=document.getElementById('flv_container');
		if(vid){//Video item, so add that button
			var vid=vid.firstChild;
			if(vid){
				var video=vid.getAttribute('flashvars');
				if(video){
					//repeat=always&controlbar=over&type=video&file=/video/c51900f7b835b431ae29e6ae46e16cca.flv
					var video=video.match(/(^|&)file=(.+?)(?=&|$)/);
					if(video[2]){
						video=video[2];//Got the video URL now.
						
						//Get the panel where we will attach the link to.
						var sidePanel=document.querySelector('.article-sidebar>.info>ul');
						if(sidePanel){
							/**
								Video download button
							*/
							//Create the list item
							var link_li=document.createElement('li');
						
							var link_img=document.createElement('img');
							link_img.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII=');//Icon by FamFamFam, available via http://www.famfamfam.com; license: https://creativecommons.org/licenses/by/3.0/
							link_img.setAttribute('alt','↓');
							link_img.setAttribute('class','icon');
							link_img.setAttribute('style','padding-left:2px;padding-right:4px;width:13px;');
							link_li.appendChild(link_img);//Add image to <li>

							//Create the link
							var link_a=document.createElement('a');
							link_a.setAttribute('href',video);//Add video url
							link_a.addEventListener('click',function(event){window.open(this.href,'vid','width=100,height=100,menubar=0,status=0,top=0,left=0');event.preventDefault();},false);//Prevent reloading the page if somebody clicks the link
							link_a.appendChild(document.createTextNode("Video opslaan"));//Add text to link
							link_a=link_li.appendChild(link_a);//Add link to <li>

							var link_li=sidePanel.appendChild(link_li);//Attach link to side panel
							
							
							/**
								Video convert button
							*/
							//Create the list item
							var link_li=document.createElement('li');
						
							var link_img=document.createElement('img');
							link_img.setAttribute('src','https://secure.zamzar.com/favicon.ico');
							link_img.setAttribute('alt','»');
							link_img.setAttribute('class','icon');
							link_img.setAttribute('style','padding-left:2px;padding-right:4px;width:13px;');
							link_li.appendChild(link_img);//Add image to <li>

							//Create the link
							var link_a=document.createElement('a');
							link_a.setAttribute('href',"http://zamzar.com/url/?u="+encodeURIComponent("https://secure.security.nl"+video));//Add video url
							link_a.setAttribute('target','_blank');
							link_a.appendChild(document.createTextNode("Video converteren"));//Add text to link
							link_a=link_li.appendChild(link_a);//Add link to <li>

							var link_li=sidePanel.appendChild(link_li);//Attach link to side panel

						}						
					}
					
				}
			}
		
		}

	}
	//commentsNode
	
	/***
		Fix "Stel zelf een vraag" knop
	*/
	var askQuestionImg = document.querySelector('img[class^="starttopic"][src^="/images/starttopic.png"][align="right"][border="0"]');//<img src="/images/starttopic.png" alt="Start je eigen forum topic" class="starttopic" align="right" border="0">
	if(askQuestionImg&&askQuestionImg.parentNode&&askQuestionImg.parentNode.nodeName.toLowerCase()==='a'){
	
		//Prefetch forum topics
		getDoc('/forum',function(doc){
			var fList=document.createElement('ol');
			fList.style.display='none';
			fList.setAttribute('id','forumList');
			
			var links=doc.querySelectorAll('div[class="newtopic"]>a[href^="/forum"]');
			var subs=doc.querySelectorAll('div[class="label"]>span[class="subtitle"]');
			
			for(var i=0;i<doc.querySelectorAll('div[class="label"]>span[class="forumtitle"]').length;i++){
				var fTopic=document.createElement('li');
					var ftContent=document.createTextNode(doc.querySelectorAll('div[class="label"]>span[class="forumtitle"]')[i].textContent);
					ftContent=fTopic.appendChild(ftContent);
				
				if(links[i]){//Because you can't post in the old forum
					fTopic.setAttribute('href',links[i].getAttribute('href'));
					fTopic.setAttribute('subtitle',subs[i].textContent);
					var fTopic=fList.appendChild(fTopic);
				}
			}
			
			fList=document.body.appendChild(fList);
		});
		
		askQuestionImg.parentNode.addEventListener('mouseover',function(){
		
			if(!document.getElementById('forumList')){this.href='/forum';return;}
		
			var image=this.querySelector('img');
			image=image.parentNode.removeChild(image);
			var t=this;
			var divContainer=document.createElement('div');
			divContainer.setAttribute('style','height:23px')
			var div=document.createElement('div');
			div.setAttribute('style','position:absolute;width:100%');
			
				var questionButton=document.createElement('div');
				questionButton.setAttribute('style','position:relative;text-align:right;padding-top:5px;padding-right:5px');
				
				questionButton.addEventListener('mouseover',function(e){
					if(document.getElementById('topicsContainer').style.display==='none'){
						document.getElementById('topicsContainer').style.display='block';
						document.head.removeAttribute('et');
					}/*else if(document.getElementById('topicsContainer').style.display!=='none'&&typeof vanishTimeout!=='undefined'){
						clearTimeout(vanishTimeout);
					}*/
					
				},false);
				questionButton.addEventListener('mouseout',function(e){
					if(e.target===document.getElementById('topicsContainer')){return;}
					if(document.getElementById('topicsContainer').style.display!=='none'){
						document.head.setAttribute('et','true');
						const vanishTimeout=setTimeout(function(){
							if(!document.head.getAttribute('et')){return;}
							document.getElementById('topicsContainer').style.display='none';
							document.head.removeAttribute('et')
						},500)
					}					
				},false);
				
				questionButton.innerHTML='<img alt="'+image.getAttribute('alt')+'" src="'+image.getAttribute('src')+'" style="cursor:pointer">';
				
				questionButton=div.appendChild(questionButton);
				
				
			
			/*	var div=document.createElement('div');
			div.setAttribute('style','position:relative;text-align:right');
			image=div.appendChild(image);
			div=t.appendChild(div);*/			
			
			var topicsContainer=document.createElement('div');
			
			topicsContainer.addEventListener('mouseout',function(e){
				if(e.target.parentNode===this){
					e.target.addEventListener('mouseout',function(e){
						if(e.target.parentNode===document.getElementById('topicsContainer')){
							e.target.addEventListener('mouseout',arguments.callee,false);
							return;
						}else{
							document.head.setAttribute('et','true');
							const vanishTimeout=setTimeout(function(){
								if(!document.head.getAttribute('et')){return;}
								document.getElementById('topicsContainer').style.display='none';
								document.head.removeAttribute('et')
							},500)
						}
					},false);
					return;
				}//Stupid mouseout event suffers event bubbling. Checking wether the target is a childNode of this should fix this.
				//alert('!');
				if(this.style.display!=='none'){
					document.head.setAttribute('et','true');
					const vanishTimeout=setTimeout(function(){
						if(!document.head.getAttribute('et')){return;}
						document.getElementById('topicsContainer').style.display='none';
						document.head.removeAttribute('et')
					},500)
					//GM_log('vanishtimeoutinstalled')
				}
					//this.style.display='none';
			},false);			
			topicsContainer.addEventListener('mouseover',function(e){
				var t=this;
				//GM_log(typeof vanishTimeout);
				if(this.style.display!=='none'&&document.head.getAttribute('et')){
					document.head.removeAttribute('et');
				}
			},false);
			
			topicsContainer.setAttribute('style','width:140px;float:right;text-align:left;margin-right:5px;margin-top:3px;');
			topicsContainer.setAttribute('id','topicsContainer');
			
			
			var forumlist=document.getElementById('forumList').childNodes;
			
			for(var i=0;i<forumlist.length;i++){
								
				var forumtopic1=document.createElement('a');
				forumtopic1.setAttribute('style','display:block;font-weight:bold;text-decoration:none;line-height:1.4em;padding-left:4px');			
				forumtopic1.style.borderLeft='1px solid rgb(170, 153, 153)';
				forumtopic1.style.borderRight='1px solid rgb(170, 153, 153)';				
				forumtopic1.setAttribute('href',forumlist[i].getAttribute('href'));
				forumtopic1.setAttribute('title',forumlist[i].getAttribute('subtitle'));
				//Set special styles
				if(i===0){
					//forumtopic1.style.borderLeftRadius='3px;';
					forumtopic1.style.borderTop='1px solid rgb(170, 153, 153)';
				}else if(i===forumlist.length-1){
					forumtopic1.style.borderBottom='1px solid rgb(170, 153, 153)';
				}
				if(i/2===Math.round(i/2)){forumtopic1.style.backgroundColor='#FEFEFE'}
				if(i/2!==Math.round(i/2)){forumtopic1.style.backgroundColor='#E1EAF1'}
				
				//forumtopic1.style.width='50%'
				//forumtopic1.style.textAlign='left'
					var ft1Content=document.createTextNode(forumlist[i].textContent);
					ft1Content=forumtopic1.appendChild(ft1Content);
				forumtopic1=topicsContainer.appendChild(forumtopic1);
			
				
			}
			
			topicsContainer=div.appendChild(topicsContainer)
			
			div=divContainer.appendChild(div);
			
			t=t.parentNode.replaceChild(divContainer,t);
						
		},false);	
	}
	
	/*** WORK IN PROGRESS
		Fix poll voor NoScript gebruikers
	*\/
	var poll = document.querySelector('.poll form');
	var pollItems=poll.querySelectorAll('li');
	if(poll&&pollItems.length){
		for(var i=0;i<pollItems.length;i++){
			pollItems[i].addEventListener('mouseup',function(){setTimeout(function(){poll.submit();},20)},false);
		}	
	}else alert(0)
*/
	
	
	/***
		Verwijder duimpjes bij eigen reacties
	*/
	if(document.querySelector('div.sidebar>div.account>form>div.actions')){//Logged in
		var thumbs_message=document.querySelectorAll('div[class="thumbs"]>div[class="rate-tooltip"]');
		for(var i=0;i<thumbs_message.length;i++){
			thumbs_message[i].parentNode.style.display='none';
			thumbs_message[i].parentNode.parentNode.style.width='65px';
			thumbs_message[i].parentNode.parentNode.style.paddingRight='15px';
			thumbs_message[i].parentNode.parentNode.style.paddingLeft='10px';
			thumbs_message[i].parentNode.removeChild(thumbs_message[i]);
		}
	}
	
})();