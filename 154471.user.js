// ==UserScript==
// @name		   View Youtube videos by same user
// @description	Shows videos by the same user
// @include		http://www.youtube.com/*
// @include		https://www.youtube.com/*
// @author		 ...
// @grant		  GM_addStyle
// @updateURL	  https://userscripts.org/scripts/source/154471.meta.js
// @downloadURL	https://userscripts.org/scripts/source/154471.user.js
// @version		1.4.3
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
{
	return;
}
//clean the ajax crap off
//[].forEach.call(document.querySelectorAll("a.spf-link"),function(i){i.classList.remove("spf-link");});


// temporary fix to disable SPF aka the "red bar" feature // Thanks Joe Simmons http://userscripts.org/scripts/show/49366
uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : unwrap(window);
if (uw._spf_state && uw._spf_state.config) {
	uw._spf_state.config['navigate-limit'] = 0;
	uw._spf_state.config['navigate-part-received-callback'] = function (targetUrl) {
		location.href = targetUrl;
	};
}
if(window.location.href.lastIndexOf("youtube.com/watch") === 0){//run the rest of the script only on watch page
	return;
}
//unused
function create(htmlStr) {
	var frag = document.createDocumentFragment(),
		temp = document.createElement('div');
	temp.innerHTML = htmlStr;
	while (temp.firstChild) {
		frag.appendChild(temp.firstChild);
	}
	return frag;
}

function zeroPad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}
//http://stackoverflow.com/questions/2901102/
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
GM_addStyle(".customHiddenstuff {display:none}");
GM_addStyle("#showHideButton {margin-bottom:4px;}");
GM_addStyle("#moreUserVideos .ux-thumb-wrap {float:none;}");
GM_addStyle(".yt-uix-newnimproved-slider.yt-rounded {width: 940px;}");
GM_addStyle(".yt-uix-newnimproved-slider-prev, .yt-uix-newnimproved-slider-next {height:80px;margin-top:32px}");
GM_addStyle(".yt-uix-newnimproved-slider-prev {float:left;}");
GM_addStyle(".yt-uix-newnimproved-slider-next {float:right;}");
GM_addStyle(".yt-uix-newnimproved-slider-head {text-align: right;width: 970px;}");
GM_addStyle(".yt-uix-newnimproved-slider-title {float: left;}");
GM_addStyle(".yt-uix-newnimproved-slider-body {overflow-x: hidden;width:900px;float:left;}");
GM_addStyle(".yt-uix-newnimproved-slider-slides {position: relative;transition: left 0.2s ease 0s;white-space:nowrap;}");
GM_addStyle(".yt-uix-newnimproved-slider-slide {display: inline-block;padding-left:10px;padding-right:10px;white-space: normal;}");
GM_addStyle(".yt-uix-newnimproved-slider-slide-item {display: inline-block;width:145px;vertical-align: top;overflow-x:hidden;}");
//Icons by www.picol.com  Creative Commons (Attribution-Share Alike 3.0 Unported) 
//GM_addStyle(".yt-uix-newnimproved-slider-prev {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAASUlEQVQ4jWNgoCMop0RzAwMDw39KNZNlALJmkg1A10ySAdg0E20ALs1YDWDCIsZBilNJdQXFhlDsErIAsiFkA5ghFIEOSg3ACgAYHipmwQgBfwAAAABJRU5ErkJggg==') no-repeat scroll 2px 29px transparent !important; }");
//GM_addStyle(".yt-uix-newnimproved-slider-next {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAWklEQVQ4jWNgoBEoJ1YhMw7xIwwMDIwMDAwHyHXBfyhuoNQAsg35z0ChIegGkGwINgOwGsJEoss4KHEBhu2kGECSZnQDSNaMbABZmmEGkK2ZgYGBoYMSzSQBADuLKm/G67ueAAAAAElFTkSuQmCC') no-repeat scroll 3px 29px transparent !important;}");
GM_addStyle(".yt-uix-newnimproved-slider-prev div{heigth:0;width:0;border-right:5px solid black;border-bottom:5px solid transparent;border-top:5px solid transparent;}");
GM_addStyle(".yt-uix-newnimproved-slider-next div{heigth:0;width:0;border-left:5px solid black;border-bottom:5px solid transparent;border-top:5px solid transparent;}");
GM_addStyle(".currentVid {background-color:#ddd;}");
//GM_addStyle(".watch-branded-banner #moreUserVideos {background-color: #FBFBFB;}");


var videoId;// = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
var isHttps;// = window.location.href.split(':')[0] == "https";
var userId = "";
var vidPos=-1;
var uploaded = "";

var iframe=document.createElement('div');
iframe.id = "moreUserVideos"
iframe.className="customHiddenstuff clearfix";
iframe.style.width="970px";

var slidesContainer=document.createElement('div');
slidesContainer.className="yt-uix-newnimproved-slider-slides";

var slider=document.createElement('div');
slider.className="yt-uix-newnimproved-slider";
slider.setAttribute("data-slider-current","0");

var sliderBody=document.createElement('div');
sliderBody.className="yt-uix-newnimproved-slider-body";
sliderBody.appendChild(slidesContainer);

var sliderPrev=document.createElement('button');
sliderPrev.className="yt-uix-newnimproved-slider-prev yt-uix-button yt-uix-button-default";
var prevButtonArrow = document.createElement('div');
prevButtonArrow.className="yt-uix-button-content";
sliderPrev.appendChild(prevButtonArrow);
sliderPrev.onclick=prev;

var sliderNext=document.createElement('button');
sliderNext.className="yt-uix-newnimproved-slider-next yt-uix-button yt-uix-button-default";
var nextButtonArrow = document.createElement('div');
nextButtonArrow.className="yt-uix-button-content";
sliderNext.appendChild(nextButtonArrow);
sliderNext.onclick=next;

slider.appendChild(sliderPrev);
slider.appendChild(sliderBody)
slider.appendChild(sliderNext);

var docfrag = document.createDocumentFragment();
docfrag.appendChild(slider);
iframe.appendChild(docfrag);

var videoContainer;
if(document.getElementById("watch7-playlist-data")==null && document.getElementById('ud')==null){
	videoContainer = document.getElementById('player-mole-container'/*'player'/*-legacy'*/);
	videoContainer.insertBefore(iframe,document.getElementById('player-api'/*-legacy'*/));
}else if(document.getElementById('ud')==null){
	videoContainer = document.getElementById('watch7-playlist-data');
	videoContainer.insertBefore(iframe,videoContainer.getElementsByClassName('watch7-playlist-bar')[0]);
}else{
	//feather
	//console.log("Feather!");
	videoContainer = document.getElementById('ud');
	//console.log(videoContainer);
	videoContainer.appendChild(iframe);
}
videoContainer.style.textAlign="left";

var showHideButton = document.createElement('button');
showHideButton.className="yt-uix-button   yt-uix-button-default b";//"yt-uix-button yt-uix-tooltip yt-uix-button-"/*hh-*/+"text yt-uix-tooltip-reverse";//yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-tooltip-reverse
showHideButton.id="showHideButton";
var buttonText = document.createElement('span');
buttonText.className="yt-uix-button-content";
buttonText.appendChild(document.createTextNode("Show/Hide user videos"));
showHideButton.appendChild(buttonText);
showHideButton.onclick=function(){
	var uservids = document.getElementById('moreUserVideos');
	if( uservids.className.split(' ').indexOf('customHiddenstuff') == -1 ) {
		uservids.className = (uservids.className + ' customHiddenstuff').trim();
	} else {
		uservids.className = uservids.className.replace( new RegExp( '(\\s|^)' + 'customHiddenstuff' + '(\\s|$)' ), ' ' ).trim();
	}

};

var showHideButtonContainer = document.createElement('div');
showHideButtonContainer.style.textAlign="left";
showHideButtonContainer.style.marginTop="5px";
showHideButtonContainer.appendChild(showHideButton);
videoContainer.insertBefore(showHideButtonContainer,iframe);

function getVideoList()
{
	//crudely remove old stuff
	document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0].innerHTML = "";
	//hide list
	document.getElementById('moreUserVideos').classList.add('customHiddenstuff');

	videoId = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
	//console.log(videoId);
	isHttps = window.location.href.split(':')[0] == "https";
	var url="http"+ ((isHttps)?"s":"") +"://gdata.youtube.com/feeds/api/videos/"+videoId+"?v=2&alt=json"+"&random="+Math.floor(Math.random()*10000);
	xhttp=new XMLHttpRequest();
	xhttp.onload=userIdRequestSuccess;
	xhttp.open("GET",url,true);
	xhttp.send();
}

getVideoList();


function userIdRequestSuccess(){
	var vidInfoData=JSON.parse(this.responseText);
	userId = vidInfoData.entry.media$group.yt$uploaderId.$t;
	userId= ( userId.substr(0,2)=='UC' )? userId.substr(2) : userId ;
	uploaded = new Date(vidInfoData.entry.published.$t);
	interpol();
}

function vidListRequestSuccess(){
	var data=JSON.parse(this.responseText);
	var slidesContainer=document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0];
	var ulSliderSlide;
	for(i=0 ; i<data.data.items.length ; i++){
		if(i%6==0){
			//console.log("Treating item:"+i);
			ulSliderSlide=document.createElement('ul');
			ulSliderSlide.className="yt-uix-newnimproved-slider-slide video-list";
			var slideNo=Math.floor((data.data.startIndex+i)/6);
			//console.log("Creating new slide with slideNo: "+slideNo+" (Start-index: "+data.data.startIndex+")");
			ulSliderSlide.setAttribute('data-slide-no', slideNo);
			
			var slides=document.getElementsByClassName("yt-uix-newnimproved-slider-slide");
			
			if((slides.length == 0) || slideNo > parseInt(slides[(slides.length-1)].getAttribute('data-slide-no')) ){
				//console.log("Appending slide: "+slideNo+" at end of slideContainer");
				slidesContainer.appendChild(ulSliderSlide);
			}else{
				for(j=0;j<slides.length;j++){
					if( slideNo < parseInt(slides[j].getAttribute('data-slide-no')) ){
						//console.log("Inserting slide: "+slideNo+" before slide "+slides[j].getAttribute('data-slide-no'));
						slidesContainer.insertBefore( ulSliderSlide, slides[j]);
						break;
					}
				}
			}
		}
		
		item=data.data.items[i];
		liSlideItem=document.createElement('li');
		liSlideItem.className="yt-uix-newnimproved-slider-slide-item video-list-item";
		
		aSlideItem=document.createElement('a');
		aSlideItem.className='related-video';
		aSlideItem.setAttribute('href', item.player.default);
		if(item.id==videoId){
			aSlideItem.className = (aSlideItem.className + ' currentVid').trim();
		}
		aSlideItem.innerHTML=
			'<span class="ux-thumb-wrap">'+
			'	<span class="video-thumb  yt-thumb yt-thumb-120">'+
		  	'		<span class="yt-thumb-default">'+
			'			<span class="yt-thumb-clip">'+
			'  				<span class="yt-thumb-clip-inner">'+
			'					<img data-thumb="'+item.thumbnail.sqDefault+'" alt="" src="'+item.thumbnail.sqDefault+'">'+
			'					<span class="vertical-align"></span>'+
			'  				</span>'+
			'			</span>'+
		  	'		</span>'+
			'	</span>'+
			'	<span class="video-time">'+Math.floor(item.duration/60)+':'+zeroPad(item.duration%60, 2)+'</span>'+
			'</span>'+
			'<span title="'+item.title+'" class="title" dir="ltr">'+item.title+'</span>'+
			'<span class="stat attribution">by <span dir="ltr" class="yt-user-name ">'+item.uploader+'</span></span>'+
			'<span class="stat view-count">'+numberWithCommas(item.viewCount)+' views</span>'
		;
		
		liSlideItem.appendChild(aSlideItem);
		ulSliderSlide.appendChild(liSlideItem);
	}
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	slider.setAttribute("data-slider-max", Math.ceil(data.data.totalItems/6));
	
	/*/ Remove '*' between the '//' at beginning of this line to make links be to videos in a playlist/autoplay
	var links = document.getElementById('moreUserVideos').getElementsByTagName('a');
	for(var i=0 ; i<links.length ; i++){
		links[i].setAttribute('href', links[i].getAttribute('href') + '&list=UL' );
	}
	//*/

}


function get24Vids(startIndex,callback){
	//console.log("Getting 24 vids, startIndex: "+startIndex);
	url="http"+ ((isHttps)?"s":"") +"://gdata.youtube.com/feeds/api/users/"+userId+"/uploads?v=2&alt=jsonc&max-results=24&start-index="+(startIndex);
	xhttp=new XMLHttpRequest();
	if(typeof(callback)=="function"){
		xhttp.onload=function(){
			vidListRequestSuccess.call(this);
			callback();
		}
	}else{
		xhttp.onload=vidListRequestSuccess;
	}
	
	xhttp.open("GET",url,true);
	xhttp.send();
	
}

function focusSlide(slideToFocus){
	//console.log("slideToFocus: "+slideToFocus);
	var w=parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('margin-left'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('padding-left'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('width'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('margin-right'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('padding-right'));
	if(isNaN(w)){
		//for focusing slide when yt-uix-newnimproved-slider-slide is hidden.
		w=890;
	}
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	var maxSlides=parseInt(slider.getAttribute("data-slider-max"));
	sliderNext.removeAttribute("disabled");
	sliderPrev.removeAttribute("disabled");
	if(slideToFocus+1>=maxSlides){
		sliderNext.setAttribute("disabled","disabled");
	}
	if(slideToFocus-1<0){
		sliderPrev.setAttribute("disabled","disabled");
	}
	//if(slideToFocus+1>=maxSlides || slideToFocus-1<0){
	//	sliderToDisable=(slideToFocus+1>=maxSlides)?sliderNext:sliderPrev;
	//	sliderToDisable.setAttribute("disabled","disabled");
		//alert("That's it. There is nothing more.");
		//return;
	//}//else{
		//sliderNext.removeAttribute("disabled");
		//sliderPrev.removeAttribute("disabled");
		var slides=document.getElementsByClassName("yt-uix-newnimproved-slider-slide");
		for(i=0;i<slides.length;i++){
			if( parseInt(slides[i].getAttribute('data-slide-no')) == slideToFocus){
				slider.setAttribute("data-slider-current", slideToFocus);
				document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0].style.left=(-i*w).toString()+"px";
				return;
			}
		}
		get24Vids( Math.floor(slideToFocus*6/24)*24+1, function(){focusSlide(slideToFocus);});
	//}
}

function next(){
	focusSlide( parseInt(slider.getAttribute("data-slider-current"))+1 );
}

function prev(){
	focusSlide( parseInt(slider.getAttribute("data-slider-current"))-1 );
}

function interpol(){
	var now=Date.now();
	//console.log("Looking for: '"+videoId+"' uploaded on "+ uploaded+"\nIt is now: "+now);
	
	var url="http"+ ((isHttps)?"s":"") +"://gdata.youtube.com/feeds/api/users/"+userId+"/uploads?v=2&alt=jsonc&max-results=24&start-index=1";
	xhttp=new XMLHttpRequest();
	xhttp.open("GET",url,false);
	xhttp.send();
	var data=JSON.parse(xhttp.responseText);
	//console.log("Received first 24 vids. "+(Date.now()-now)+" ms elapsed");
	var lastUploaded=0;
	var firstUploaded=0;
	
	var totalItems=parseInt(data.data.totalItems);
	var highBoundary=0;
	var lowBoundary=totalItems;
	
	for(i=0 ; i<data.data.items.length ; i++){
		item=data.data.items[i];
		lastUploaded=Date.parse(item.uploaded);
		if(item.id==videoId){
			//console.log("Found it in the First 24. Done. "+(Date.now()-now)+" ms elapsed");
			vidPos=i;
			highBoundary=lowBoundary;
			break;
		}
		highBoundary++;
	}
	//console.log("highBoundary set to: "+highBoundary);
	var abandonAfter=15;
	var tries=abandonAfter;
	
	while(highBoundary+1 < lowBoundary){
		if(0==abandonAfter--){
			//console.log("Too many tries: "+tries);
			break;
		}
		var checkVidAt=0;
		
		if(firstUploaded==0){
			checkVidAt=(totalItems%24==0)? totalItems-1 : totalItems;
		}else{
			checkVidAt=Math.floor( highBoundary +( (Date.parse(uploaded)-lastUploaded) * (lowBoundary-highBoundary) ) / (firstUploaded-lastUploaded));
			if(checkVidAt<highBoundary){
				checkVidAt=highBoundary;
			}else if(checkVidAt>lowBoundary){
				checkVidAt=lowBoundary;
			}
		}
		//console.log((tries-abandonAfter)+ " requests. Checking vid at position: "+checkVidAt);
		
		url="http"+ ((isHttps)?"s":"") +"://gdata.youtube.com/feeds/api/users/"+userId+"/uploads?v=2&alt=jsonc&max-results=24&start-index="+(Math.floor(checkVidAt/24)*24+1)+"&random="+Math.floor(Math.random()*10000);
		xhttp=new XMLHttpRequest();
		xhttp.open("GET",url,false);
		xhttp.send();
		data=JSON.parse(xhttp.responseText);
		for(i=0 ; i<data.data.items.length ; i++){
			item=data.data.items[i];
			if(item.id==videoId){
				vidPos=(Math.floor(checkVidAt/24)*24)+i;
				break;
			}
		}
		//console.log("looking at: "+Date.parse(data.data.items[0].uploaded)+ "Looking for: "+Date.parse(uploaded));
		if(vidPos!=-1){
			break;
		}
		if(Date.parse(data.data.items[0].uploaded) < Date.parse(uploaded)){
			lowBoundary=(Math.floor(checkVidAt/24)*24)-1;
			firstUploaded=Date.parse(data.data.items[0].uploaded);
			//console.log("lowBoundary set to: "+lowBoundary);
		}else if(Date.parse(data.data.items[0].uploaded) > Date.parse(uploaded)){
			highBoundary=((Math.floor(checkVidAt/24)+1)*24);
			lastUploaded=Date.parse(data.data.items[data.data.items.length-1].uploaded);
			//console.log("highBoundary set to: "+highBoundary);
		}
	}
	if(vidPos==-1){
		//console.log("Can't find it. "+(Date.now()-now)+" ms elapsed"+(tries-abandonAfter)+ " requests.");
		get24Vids(1);
		return;
	}else{
		//console.log("Found it in position: "+vidPos+". Done. "+(Date.now()-now)+" ms elapsed, "+(tries-abandonAfter)+ " requests.");
		slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
		slider.setAttribute("data-slider-current",Math.floor((vidPos-1)/6));
		vidListRequestSuccess.call(xhttp);
		//console.log("focusSlide("+Math.floor((vidPos)/6)+")");
		focusSlide(Math.floor((vidPos)/6));
		return;
	}
	
}
/*
console.log("\n\n**********************************\nSUBSCRIBING TO NAVIGATE AND STUFF");
//console.log(window.yt.pubsub.instance_);
//http://userscripts.org/scripts/show/120564
unsafeWindow.yt.pubsub.instance_.subscribe('navigate', function() {
	console.log("Navigate");
	//getVideoList();
	return true;
});

unsafeWindow.yt.pubsub.instance_.subscribe('player-added', function() {
	console.log("player-added");
	//getVideoList();
	return true;
});

unsafeWindow.yt.pubsub.instance_.subscribe('init-watch', function() {
	console.log("init-watch, getVideoList");
	//re-clean ajax stuff if coming from another (search? user? not watch) page
	[].forEach.call(document.querySelectorAll("a.spf-link"),function(i){i.classList.remove("spf-link");});
	getVideoList();
	return true;
});
/*document.addEventListener('animationstart', function(event){
	//DT, DD
	if (event.animationName == 'pulse' && event.target.tagName == "DD"){
		console.log("pulse DD");
		getVideoList();
	}
}, true);
*/