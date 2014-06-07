// ==UserScript==
// @id             www.youtube.com-0c37852c-600a-4bfc-8cf0-292186884b8d@CRX
// @name           Manual Video Resizer for youtube
// @version        1.0
// @updateURL		http://userscripts.org/scripts/source/133549.user.js
// @namespace      yt
// @author         Yansky
// @description    Allows you to resize the video with a slider
// @include        http://*.youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @run-at         document-end
// ==/UserScript==


var vidResizer={
		db:document.body,
		wv:document.getElementById("watch-video"),
		wp:document.getElementById("watch-player"),
		page:document.getElementById("page"),
		userInfo:document.getElementById('watch-headline-user-info'),
		outerDiv:null,
		sliderButton:null,
		sliderEnabled:false,
		buttonPosPer:false,
		offLeft:0,
		butRelPos:0,
		initVideoPer:0,
		addStyle:function(){
			
			//var newS=document.createElement('style');
			//newS.textContent=		
			GM_addStyle(
				"#watch-video-container {"+
				"	background-color: #444444 !important;"+
				"	background-image: -moz-linear-gradient(center top , #555555, #333333) !important;"+
				"}"+
				"#outerResizerDiv {"+
				"	float: right;"+
				"	cursor: pointer;"+
				"	display: inline-block;"+
				"	height: 2.9em;"+
				"	vertical-align: middle;"+
				"	padding: 0 0.25em;"+
				"	margin:0 65px 0.1em 0;"+
				"	width: 350px;"+
				"	border-color: #DDDDDD;"+
				"	box-shadow: 0 1px 0 #FFFFFF;	"+
				"	border-radius: 2px 2px 2px 2px;"+
				"	font-size: 11px;				"+
				"}"+
				"#resizerButton {"+
				"	position: relative;"+
				"	cursor: pointer;"+				
				"}"+					
				"#outerResizerDiv:hover, #resizerButton:hover {"+				
				"	border-color:#aaa #aaa #999;"+
				"	-moz-box-shadow:0 1px 2px rgba(0,0,0,0.25),inset 0 0 3px #fff;"+
				"	background-image:-moz-linear-gradient(top,#f0f0f0 0,#e6e6e6 100%);"+
				"	background-image:linear-gradient(to bottom,#f0f0f0 0,#e6e6e6 100%);			"+		
				"}"+
				"#watch-video {"+
				"	width: 100% !important;"+
				"}"+				
				"#alerts, #content, #promos, #footer, #copyright {"+
				"	width: auto !important;"+
				"}"				
			//document.querySelector('head').appendChild(newS);
			);		
			
		},
		resize:function(e){
			
			if(vidResizer.sliderEnabled){
				vidResizer.wp.style.width=(window.innerWidth*vidResizer.buttonPosPer)+'px';
				//approx aspect ratio seems to be 16:9
				vidResizer.wp.style.height=Math.round((window.innerWidth*vidResizer.buttonPosPer)/(16/9))+'px';
				
			}	
		
		},
		getOffsetLeft:function(obj){
			//http://www.quirksmode.org/js/findpos.html
			if (obj.offsetParent) {
				do {
						vidResizer.offLeft += obj.offsetLeft;
					} while (obj = obj.offsetParent);
			}
		},
		moveButton:function(e,ft){

			if(ft){
				vidResizer.initVideoPer=Number(window.getComputedStyle(vidResizer.wp,null).getPropertyValue("width").split('px')[0])/window.innerWidth;
				vidResizer.moveButton({
					'pageX':Number(vidResizer.offLeft+Math.round(346*vidResizer.initVideoPer))
				},false);	
			}
			else{
				vidResizer.butRelPos=(e.pageX-vidResizer.offLeft)-15; //-15 so button is in middle of cursor
				
				if(vidResizer.butRelPos>-1 && vidResizer.butRelPos<325){
					vidResizer.buttonPosPer=(vidResizer.butRelPos/346);
					vidResizer.sliderButton.style.left=vidResizer.butRelPos+'px';
				}
			}
		
		},
		init:function(){

		
			vidResizer.addStyle();		
		
			vidResizer.page.setAttribute('class','watch-wide');
			vidResizer.wv.setAttribute('class','medium');	
			
			vidResizer.outerDiv=document.createElement('div');
			vidResizer.outerDiv.setAttribute('id','outerResizerDiv');
			vidResizer.outerDiv.setAttribute('class','yt-uix-button yt-uix-button-text');
			vidResizer.userInfo.appendChild(vidResizer.outerDiv);		

			vidResizer.getOffsetLeft(vidResizer.outerDiv);
			
			vidResizer.sliderButton=document.createElement('button');
			vidResizer.sliderButton.setAttribute('id','resizerButton');
			vidResizer.sliderButton.setAttribute('class','yt-uix-button yt-uix-button-default');
			vidResizer.outerDiv.appendChild(vidResizer.sliderButton);
			
			vidResizer.moveButton(null,true);
			
			vidResizer.outerDiv.addEventListener('mousedown',function(e){
				vidResizer.db.style.MozUserSelect = "none";
				vidResizer.sliderEnabled=true;
				vidResizer.moveButton(e,false);		
				vidResizer.resize(e);
			},false);
			
			
			vidResizer.outerDiv.addEventListener('mousemove',function(e){
				if(vidResizer.sliderEnabled){
					vidResizer.moveButton(e,false);
					vidResizer.resize(e);
				}
			},false);			
			
			
			vidResizer.db.addEventListener('mouseup',function(e){
				if(vidResizer.sliderEnabled){
					vidResizer.sliderEnabled=false;
					vidResizer.db.style.MozUserSelect = "auto";
				}
				if(e.shiftKey){
					vidResizer.wp.style.width='854px';
					vidResizer.wp.style.height='510px';
					vidResizer.moveButton(null,true);
				}
			},false);			
			
			
		
		}		
		

};
vidResizer.init();








