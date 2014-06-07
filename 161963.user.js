// ==UserScript==
// @name       Clean Reddit + Nighttime
// @namespace  http://use.i.E.your.homepage/
// @version    0.3.1
// @description  enter something useful
// @match      http://*reddit.com/*
// @match      https://*reddit.com/*
// @copyright  2012+, You
// ==/UserScript==

// Find element by class
// Add button to side
// Add button before side
// 

var buttonShowSide;
var buttonCleanReddit;
var isCommentPage = (document.documentURI.indexOf('comments')!=-1)
var showcomments = true;

function findElementByClassPlusAttributes( elementToSearchThrough, elementType, className, attributeNames, attributeVals ){
	var e = elementToSearchThrough.getElementsByTagName(elementType);
	for(var i = 0; i < e.length; i++){
		if(e[i].className == className){
            var fail = false;			
			if(attributeNames.length>0){
				for(var j = 0; j < attributeNames.length; j++){
					if(e[i].getAttribute(attributeNames[j]) !=  attributeVals[j]){
						fail = true;
						break;
					}
				}
			}
			return e[i];
		}
	}
	
	return false;
}

function findFirstElementByClass( className ){
	var e = document.getElementsByTagName('*');
	for(var i = 0; i < e.length; i++){
		if(e[i].className == className){
			return e[i];
		}
	}
	
	return false;
}

function hideSide(){
	var side = findFirstElementByClass('side');
	side.hidden = true;
	buttonShowSide.hidden = false;
}

function showSide(){
	var side = findFirstElementByClass('side');
	side.hidden = false;
	buttonShowSide.hidden = true;
}

function toggleCommentTagline(tl, show){
	// Create tagline-clean on first run
	if(tl.previousSibling==null){
		var newtagline=document.createElement('p');
		newtagline.className = 'tagline-clean';
		newtagline.innerText=tl.children[1].innerText;
		tl.parentElement.insertBefore(newtagline,tl);
	}
	
	if(show){
		tl.style.display = 'block'
		tl.previousSibling.style.display = 'none'
	}
	else{
		tl.style.display = 'none'
		tl.previousSibling.style.display = 'block'
	}
}

function toggleClean(){
	/* 'midcol unvoted'
	* 'flat-list buttons'
	document.documentURI
	*/
	var e = document.getElementsByTagName('*');
	var runcount = true;
	showcomments =! showcomments;
	
	for(var i = 0; i < e.length; i++){
		if(e[i].className == 'rank')
           e[i].hidden = !e[i].hidden;
        else if( (e[i].className == 'tagline') ||
		         (e[i].className == 'flat-list buttons') ||
            	 (e[i].className == 'midcol unvoted') )
		{
			if((isCommentPage) && (e[i].className == 'tagline') ){
				if((e[i].children.length>0)&&(e[i].children[0].className == 'expand')){
					toggleCommentTagline(e[i],showcomments);
				}
			}
			else{
				if(e[i].style.display == 'none'){
					e[i].style.display = 'block'
					if(e[i].className == 'midcol unvoted')
						e[i].parentElement.style.borderBottom="";
				}
				else{
					e[i].style.display = 'none'
					if(e[i].className == 'midcol unvoted')
						e[i].parentElement.style.borderBottom="thin dotted #006400";
				}
			}
		}
	}
}

function changeLinkColors(){
	// Change link colors
	var contentpane = findElementByClassPlusAttributes(document,'div','content',['role'],['main'])
	if(contentpane!=false){
		var links = contentpane.getElementsByTagName('a');
		for(var i = 0; i < links.length; i++){
			links[i].style.color="#D3D3D3"
		}
	}
}

function changeBodyBackgroundColor(){
	// Change background color
    var body = document.getElementsByTagName('body');
    body=body[0];
    body.style.backgroundColor="#000000"; // Black
    body.style.color="#FFFFFF"; // Black
}

function changeBackGroundColorPromotedLink(){
	var contentpane = document.getElementById('siteTable_organic');
	if(contentpane==null)
		return
	
	contentpane=contentpane.getElementsByTagName('div');
	
	for(var i=0; i<contentpane.length;i++){
		//if((contentpane[i].className.indexOf('promoted')!=-1)||
		//   (contentpane[i].className=='sr-interest-bar')){
			contentpane[i].style.backgroundColor="#000000"; 
		//}
	}
}

function modifyTextAreas(){
	var t = document.getElementsByTagName('textarea');
	
	if(t==null)
		return;
	
	for(var i = 0; i < t.length; i++){
		t[i].style.backgroundColor="black";
		t[i].style.color="green"
	}
}

function styleHeader(){
	document.getElementById('header-bottom-left').style.background = "Indigo";
	document.getElementById('sr-header-area').style.background = "#1E0034";
	document.getElementById('header-bottom-right').style.background = "#1E0034";
	color=function(container, tagname, colors, stylesprop){
		var e = container.getElementsByTagName(tagname);
		for(var i = 0; i < e.length; i++){
			for(var j = 0; j < stylesprop.length; j++){
				e[i].style[stylesprop[j]] = colors[j];
			}
		}
	}
	
	color(document.getElementById('header-bottom-left'), 'a', ["#1E0034"], ["background-color"])
	color(document.getElementById('sr-header-area'), 'a', ["#005C00",'bold'], ["color",'font-weight'])
	color(document.getElementById('sr-header-area'), 'span', ["#005C00",'bold'], ["color",'font-weight'])
	
	if(isCommentPage){
		document.getElementById('header-bottom-left').style.background = "Indigo";
		color(document.getElementById('header-bottom-left').children[1], 'a', ["#005C00",'bold'], ["color",'font-weight'])
	}
	
	document.getElementById('header-img').style.backgroundColor = "Indigo";
}

function addButtonsToSide(){
	var buttonHideSide= document.createElement('input');
	buttonHideSide.setAttribute('type','button');
	buttonHideSide.setAttribute('name','hideSide');
	buttonHideSide.setAttribute('value','Hide Side');
	buttonHideSide.onclick=hideSide;
	
	buttonShowSide = document.createElement('input');
	buttonShowSide.setAttribute('type','button');
	buttonShowSide.setAttribute('name','showSide');
	buttonShowSide.setAttribute('value','Show Side');
	buttonShowSide.setAttribute('style','float:right');
	buttonShowSide.onclick = showSide;
	buttonShowSide.hidden = true;
    
    buttonCleanReddit = document.createElement('input');
	buttonCleanReddit.setAttribute('type','button');
	buttonCleanReddit.setAttribute('name','cleanReddit');
	buttonCleanReddit.setAttribute('value','Clean Reddit');
	buttonCleanReddit.onclick=toggleClean;
	
	var side = findFirstElementByClass('side');
	if(side !== false){
		side.insertBefore(buttonCleanReddit, side.children[0]);
		side.insertBefore(buttonHideSide, side.children[0]);
	}
	
	side.parentElement.insertBefore(buttonShowSide, side);
    side.style.backgroundColor="#000000"; 
	
    changeBodyBackgroundColor();
    changeLinkColors();
	changeBackGroundColorPromotedLink();
	styleHeader();
	modifyTextAreas();
}


addButtonsToSide();