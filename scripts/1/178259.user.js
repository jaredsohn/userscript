// ==UserScript==
// @name       4chan Image Browser
// @namespace  IdontKnowWhatToDoWithThis
// @description Opens current thread Images in 4chan into a popup viewer
// @match   http*://*.4chan.org/*/res/*
// @match   http*://*.4chan.org/*/thread/*
// @version 5
// @copyright  2013+, Gyst
// ==/UserScript==
/*jshint multistr:true */
/*jshint browser:true */
/*jshint smarttabs:true */
/* jshint -W099 */
/* jshint -W015 */
/*global Main:false */



//cookieInfo
var INDEX_KEY = "imageBrowserIndexCookie";
var THREAD_KEY = "imageBrowserThreadCookie";
var WIDTH_KEY = "imageBrowserWidthCookie";
var HEIGHT_KEY = "imageBrowserHeightCookie";

//IDs for important elements
var VIEW_ID = "mainView";
var IMG_ID = "mainImg";
var IMG_TABLE_ID = "imageAlignmentTable";
var TOP_LAYER_ID = "viewerTopLayer";


//for holding img srcs and a pointer for traversing
var postData = [];
var linkIndex = 0;

//set up the div and image for the popup
var mainView;
var mainImg;
var innerTD;
var topLayer;
var customStyle;
var textWrapper;

var leftArrow;
var rightArrow;


var bottomMenu;

var canPreload = false;
var shouldFitImage = false;


var mouseTimer;

var lastMousePos = {x: 0, y: 0};




//keycode object.  Better than remembering what each code does.
var keys = {38: 'up', 40: 'down', 37: 'left', 39: 'right', 27: 'esc', 86:'v'};

//styles for added elements

var STYLE_TEXT ='\
    div.reply.highlight{z-index:100 !important;position:fixed !important; top:1%;left:1%;}\
    body{overflow:hidden !important;}\
    #quote-preview{z-index:100;} \
    a.quotelink, div.viewerBacklinks a.quotelink{color:#5c5cff !important;}\
    a.quotelink:hover, div.viewerBacklinks a:hover{color:red !important;}\
    #'+IMG_ID+'{display:block !important; margin:auto;max-width:100%;height:auto;-webkit-user-select: none;cursor:pointer;}\
    #'+VIEW_ID+'{\
        background-color:rgba(0,0,0,0.9);\
        z-index:10;	\
        position:fixed;	\
        top:0;left:0;bottom:0;right:0;	\
        overflow:auto;\
        text-align:center;\
        -webkit-user-select: none;\
    }\
    #'+IMG_TABLE_ID+' {width: 100%;height:100%;padding:0;margin:0;border-collapse:collapse;}\
    #'+IMG_TABLE_ID+' td {text-align: center; vertical-align: middle; padding:0;margin:0;}\
    #'+TOP_LAYER_ID+'{position:fixed;top:0;bottom:0;left:0;right:0;z-index:20;opacity:0;visibility:hidden;transition:all .25s ease;}\
    .viewerBlockQuote{color:white;}\
    #viewerTextWrapper{max-width:60em;display:inline-block; color:gray;-webkit-user-select: all;}\
    .bottomMenuShow{visibility:visible;}\
    #viewerBottomMenu{box-shadow: -1px -1px 5px #888888;font-size:20px;padding:5px;background-color:white;position:fixed;bottom:0;right:0;z-index:200;}\
    .hideCursor{cursor:none !important;}\
    .hidden{visibility:hidden}\
    .displayNone{display:none;}\
    .pagingButtons{font-size:100px;color:white;text-shadow: 1px 1px 10px #27E3EB;z-index: 11;top: 50%;position: absolute;margin-top: -57px;width:100px;cursor:pointer;-webkit-user-select: none;}\
    .pagingButtons:hover{color:#27E3EB;text-shadow: 1px 1px 10px #000}\
    #previousImageButton{left:0;text-align:left;}\
    #nextImageButton{right:0;text-align:right;}\
    @-webkit-keyframes flashAnimation{0%{ text-shadow: none;}100%{text-shadow: 0px 0px 5px lightblue;}}\
    .flash{-webkit-animation: flashAnimation .5s alternate infinite  linear;}\
    ';

//Build the open button
var openBttn = document.createElement('button');
openBttn.style.position = 'fixed';
openBttn.style.bottom = '0';
openBttn.style.right = '0';
openBttn.innerHTML = "Open Viewer";
openBttn.addEventListener('click',buildPopup, false);
document.body.appendChild(openBttn);



/* Builds the popup and adds it to the page*/
function buildPopup(){
    console.log("Building 4chan Image Viewer");

    var currentThreadId = document.getElementsByClassName('thread')[0].id;

    //check if its the last thread opened, if so, remember where the index was.
    if(getPersistentValue(THREAD_KEY) === currentThreadId){
        linkIndex = parseInt(getPersistentValue(INDEX_KEY)); 
    }else{
        linkIndex = 0;
        setPersistentValue(INDEX_KEY,0);
    }
    
   //set thread id
    setPersistentValue(THREAD_KEY,currentThreadId);
    
    //reset post array
    postData.length=0;

    
	//add keybinding listener
    window.addEventListener('keydown',arrowKeyListener,false);
    
    window.addEventListener('mousemove',menuWatcher,false);
    
    //grab postContainers
    var posts = document.getElementById('delform').getElementsByClassName('postContainer');
    
    //get image links and post messages from posts
    var plength = posts.length;
    for(var i = 0; i < plength; ++i){
        
        var file = posts[i].getElementsByClassName('file')[0];
        if(file){
            var currentLink = file.getElementsByClassName('fileThumb')[0].href;
            var type = getElementType(currentLink);
            var currentPostBlock = posts[i].getElementsByClassName('postMessage')[0];
			var currentPostBacklinks = posts[i].getElementsByClassName('backlink')[0];
            
			var blockQuote = document.createElement('blockQuote');
			var backlinks = document.createElement('div');
			
			if(currentPostBlock){
				blockQuote.className = currentPostBlock.className + ' viewerBlockQuote';
				blockQuote.innerHTML = currentPostBlock.innerHTML;
                add4chanListenersToLinks(blockQuote.getElementsByClassName('quotelink'));
			
			}
			if(currentPostBacklinks){
				backlinks.className = currentPostBacklinks.className + ' viewerBacklinks';
				backlinks.innerHTML = currentPostBacklinks.innerHTML;
				add4chanListenersToLinks(backlinks.getElementsByClassName('quotelink'));
			}
			
			postData.push({'imgSrc':currentLink,'type':type,'mBlock':blockQuote,'backlinks':backlinks});
        }
    }

        

    //build wrapper
    mainView = document.createElement('div');
    mainView.id = VIEW_ID;
    mainView.addEventListener('click',confirmExit, false);
    
    document.body.appendChild(mainView);
    //set up table for centering the content.  Seriously, the alternatives are worse.
    mainView.innerHTML = '<table id="'+IMG_TABLE_ID+'"><tr><td></td></tr></table>';
	innerTD = mainView.getElementsByTagName('td')[0];
    

    
    //build image tag
    mainImg = document.createElement(postData[linkIndex].type);
    mainImg.src= postData[linkIndex].imgSrc;
    mainImg.id = IMG_ID;
	mainImg.classList.add("hideCursor");
    mainImg.autoplay = true;
    mainImg.controls = false;
    mainImg.loop = true;
    
    innerTD.appendChild(mainImg);
    
    mainImg.addEventListener('click',clickImg,false);
	mainImg.onload = function(){
		if(shouldFitImage){ fitHeightToScreen();}
	};

   
   
    //start preloading to next image index
    canPreload = true;
    setTimeout(function(){runImagePreloading(1);},100);
   

    
    //add quote block/backlinks(first image always has second post quote)
    textWrapper = document.createElement('div');
    textWrapper.addEventListener('click',eventStopper,false);
    textWrapper.id = 'viewerTextWrapper';
    textWrapper.appendChild(postData[linkIndex].backlinks);
	textWrapper.appendChild(postData[linkIndex].mBlock);
	innerTD.appendChild(textWrapper);
    

    //build top layer
    topLayer = document.createElement('div');
    topLayer.innerHTML = "&nbsp;";
    topLayer.id=TOP_LAYER_ID;
    
    document.body.appendChild(topLayer);
    

    //build custom style tag
    customStyle = document.createElement('style');
    customStyle.innerHTML = STYLE_TEXT;
    document.body.appendChild(customStyle);
    
    //build bottom menu
    var formHtml = '<label><input id="'+WIDTH_KEY+'" type="checkbox" checked="checked" />Fit Image to Width</label>\
                    <span>|</span>\
                    <label><input id="'+HEIGHT_KEY+'" type="checkbox" />Fit Image to Height</label>\
                    ';
    bottomMenu = document.createElement('form');
    bottomMenu.id = "viewerBottomMenu";
    bottomMenu.className = 'hidden';
    bottomMenu.innerHTML = formHtml;
    document.body.appendChild(bottomMenu);
    bottomMenu.addEventListener('click',menuClickHandler,false);
    menuInit();
    
    //build arrow buttons
    leftArrow = document.createElement("div");
    leftArrow.innerHTML = '<span>&#9001;</span>';
    leftArrow.id = "previousImageButton";
    leftArrow.classList.add("pagingButtons","displayNone");
    
    rightArrow = document.createElement("div");
    rightArrow.innerHTML = '<span>&#9002;</span>';
    rightArrow.id = "nextImageButton";
    rightArrow.classList.add("pagingButtons","displayNone");
    
    leftArrow.addEventListener('click',function(event){event.stopImmediatePropagation();previousImg();},false);
    rightArrow.addEventListener('click',function(event){event.stopImmediatePropagation();nextImg();},false);
    mainView.appendChild(leftArrow);
    mainView.appendChild(rightArrow);
    
    
    //some fixes for weird behaviors
	innerTD.style.outline = '0';
	innerTD.tabIndex = 1;
    innerTD.focus();
    

}

function menuInit(){
    var menuControls = bottomMenu.getElementsByTagName('input');
    for(var i = 0; i < menuControls.length; ++i){
        var input = menuControls[i];
        var cookieValue = getPersistentValue(input.id);
        
        
        if(cookieValue === 'true'){
            input.checked = true;
        }else if(cookieValue === 'false'){
            input.checked = false;
        }
        input.parentElement.classList.toggle('flash',input.checked);
        switch(input.id){
         case WIDTH_KEY:
                setFitToScreenWidth(input.checked);
                break;
                
         case HEIGHT_KEY:  
                setFitToScreenHeight(input.checked);
                break;
        }
        

        
    }
    
}


function menuClickHandler(){
    var menuControls = bottomMenu.getElementsByTagName('input');
    
    
    for(var i = 0; i < menuControls.length; ++i){
        var input = menuControls[i];
        
        switch(input.id){
         case WIDTH_KEY:
                setFitToScreenWidth(input.checked);
                break;
                
         case HEIGHT_KEY:  
                setFitToScreenHeight(input.checked);
                break;
        }
        
        input.parentElement.classList.toggle('flash',input.checked);
        
        setPersistentValue(input.id,input.checked);
        
    }

}

function windowClick(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    nextImg();
    
}

function add4chanListenersToLinks(linkCollection){
    for(var i = 0; i < linkCollection.length; ++i){
       	//These are the functions that 4chan uses
        linkCollection[i].addEventListener("mouseover", Main.onThreadMouseOver, false); 
		linkCollection[i].addEventListener("mouseout", Main.onThreadMouseOut, false);

    }
    
}



/* Event function for determining behavior of viewer keypresses */
function arrowKeyListener(evt){

    switch(keys[evt.keyCode]){
        case 'right':	
            nextImg();
            break;
            
        case 'left':	
            previousImg();
            break;

        case 'esc':		
            clearDiv();
            break;
    }

}


/* preloads images starting with the index provided */
function runImagePreloading(index){

    if(index < postData.length){

        if(canPreload){
            var newImage = document.createElement(postData[index].type);
        	//load the next image after this one loads
            newImage.onload = function(){
                runImagePreloading(index+1);
            };
            newImage.onerror = function(){
                runImagePreloading(index+1);
            };
            
            newImage.src = postData[index].imgSrc;
        
        }
        

    }
}



/* Sets the img and message to the next one in the list*/
function nextImg(){

	if(linkIndex === postData.length - 1){
        topLayer.style.background = 'linear-gradient(to right,rgba(0,0,0,0) 90%,rgba(125,185,232,1) 100%)';
        topLayer.style.opacity = '.5';
		topLayer.style.visibility = "visible";

		setTimeout(function(){
    		topLayer.style.opacity = '0';
			setTimeout(function(){topLayer.style.visibility = "hidden";},200);
		}, 500);
		return;
	}
	else{
		changeData(1);
	}
}

/* Sets the img and message to the previous one in the list*/
function previousImg(){

	if(linkIndex === 0){
		
        topLayer.style.background = 'linear-gradient(to left,rgba(0,0,0,0) 90%,rgba(125,185,232,1) 100%)';
        topLayer.style.opacity = '.5';
		topLayer.style.visibility = "visible";

		setTimeout(function(){
    		topLayer.style.opacity = '0';
			setTimeout(function(){topLayer.style.visibility = "hidden";},200);
		}, 500);

        return;
	}
	else{
        changeData(-1);

	}
}

function changeData(delta){
    linkIndex = linkIndex + delta;

    if(postData[linkIndex].type !== mainImg.tagName){
        mainImg = replaceElement(mainImg,postData[linkIndex].type);   
    }
    
    mainImg.src = postData[linkIndex].imgSrc;

    textWrapper.replaceChild(postData[linkIndex].backlinks,postData[linkIndex - delta].backlinks);
    textWrapper.replaceChild(postData[linkIndex].mBlock,postData[linkIndex - delta].mBlock);

    mainView.scrollTop = 0;

    setPersistentValue(INDEX_KEY,linkIndex);
}

function getElementType(src){
    if(src.match(/\.(?:(?:webm)|(?:ogg)|(?:mp4))$/)){
        return 'VIDEO';
    }else{
        return 'IMG';
    }
}

function replaceElement(element,newType){
    var newElement = document.createElement(newType);
    
    newElement.className = element.className;
    newElement.id = element.id;
    newElement.style = element.style;
    newElement.autoplay = element.autoplay;
    newElement.controls = element.controls;
    newElement.loop = element.loop;
    
    newElement.addEventListener('click',clickImg,false);
	newElement.onload = function(){
		if(shouldFitImage){ fitHeightToScreen();}
	};
    element.parentElement.insertBefore(newElement,element);
    element.parentElement.removeChild(element);
    return newElement;
}



/* Function for handling click image events*/
function clickImg(event){
    
    event.stopPropagation();
    nextImg();

}

function eventStopper(event){
    if(event.target.nodeName !== 'A'){
        event.stopPropagation();
    }
   
}

function confirmExit(){
    if(window.confirm('Exit Viewer?')){
        clearDiv();
    }

}

/* Removes the popup and other things added by the build method*/
function clearDiv(){
    window.removeEventListener('keydown',arrowKeyListener);
    window.removeEventListener('mousemove',menuWatcher);
    document.body.removeChild(topLayer);
    document.body.removeChild(mainView);
    document.body.removeChild(customStyle);
    document.body.removeChild(bottomMenu);
    document.body.style.overflow="auto";
    canPreload = false;

}




/*Mouse-move Handler that watches for when menus should appear and mouse behavior*/
function menuWatcher(event) {  

    var height_offset = window.innerHeight - bottomMenu.offsetHeight;
    var width_offset = window.innerWidth - bottomMenu.offsetWidth;
    
    if(event.clientX >= width_offset && event.clientY >= height_offset){
    	bottomMenu.className='bottomMenuShow';   
    }else if(bottomMenu.className==='bottomMenuShow'){
    	bottomMenu.className ='hidden';
    }    
	
    if(event.clientX <= (100) || event.clientX >= (window.innerWidth-100)){
        rightArrow.classList.remove('displayNone');
        leftArrow.classList.remove('displayNone');
    }else{
        rightArrow.classList.add('displayNone');
        leftArrow.classList.add('displayNone');
    }
    
        
    
	//avoids chrome treating mouseclicks as mousemoves
    if(event.clientX !== lastMousePos.x && event.clientY !== lastMousePos.y){
    	//mouse click moves to next image when invisible
		mainImg.classList.remove('hideCursor');
        
        window.clearTimeout(mouseTimer);
        document.body.removeEventListener('click',windowClick,true);
        document.body.classList.remove('hideCursor');
        if(event.target.id === mainImg.id){
            //hide cursor if it stops, show if it moves
            mouseTimer = window.setTimeout(function(){
                        mainImg.classList.add('hideCursor');
                        document.body.classList.add('hideCursor');
                        document.body.addEventListener('click',windowClick,true);
                        
                    }, 200);
        }

        

    }

    lastMousePos.x = event.clientX;
    lastMousePos.y = event.clientY;
        
}

/*Stores a key value pair as a cookie*/
function setPersistentValue(key, value){

    document.cookie = key + '='+value;

}

/* Retrieves a cookie value via its key*/
function getPersistentValue(key){
    var cookieMatch = document.cookie.match(new RegExp(key+'\\s*=\\s*([^;]+)'));
    if(cookieMatch){
		return cookieMatch[1];
    }else{
    	return null;   
    }


}


function setFitToScreenHeight(shouldFitImage){
	if(shouldFitImage){
        fitHeightToScreen();
    }else{
        mainImg.style.maxHeight = '';
    }
}
function setFitToScreenWidth(shouldFitImage){

    mainImg.style.maxWidth = shouldFitImage ? '100%' : 'none';

}


/* Fits image to screen height*/
function fitHeightToScreen(){

    //sets the changeable properties to the image's real size
    var height = mainImg.naturalHeight;
    mainImg.style.maxHeight = height + 'px';

    //actually tests if it is too high including padding
    var heightDiff = (mainImg.clientHeight > height)?
        mainImg.clientHeight - mainView.clientHeight:
    	height -  mainView.clientHeight;

    if(heightDiff > 0){      
        mainImg.style.maxHeight = (height - heightDiff) + 'px';
    }else{
    	mainImg.style.maxHeight = height + 'px';	
    }
}
