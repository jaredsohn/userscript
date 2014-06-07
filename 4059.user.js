// ==UserScript==
// @name			Status Bar Replacement v.202
// @namespace		http://www.tyworks.net
// @description		adds mouseover info panel to every link
// @include			*
// ==/UserScript==

//~~  USER CONFIGURABLE VARIABLES  ~~//
const popSBRDelay = 600;  //amount of time(in ms) after mouseover before popup (default:600)
const offSBRRight = 18;   //horizontal constant. if the popup makes horizontal scrollbars appear, increase this constant until it doesn't (default:18)
const offSBRTop = 18;     //vertical constant. if the popup makes vertical scrollbars appear, increase this constant until it doesn't (default:18)
//~~ END OF USER CONFIGURABLE VARS ~~//

//it is recommended that you do not muck about below this point



var theShowDelayerSBR; //the time delay for the popup
var globalXSBR=0; //mouse position, X direction
var globalYSBR=0; //mouse position, Y direction

unsafeWindow.setLocationSBR=setLocationSBR; //when the timer calls the function from the document, we want it to be able to access the function in here

function doPopSBR(popObject) { //called on <A> mouseover, calls other functions
	setContentSBR(popObject); //sets the popup content to the correct values
	theShowDelayerSBR = window.setTimeout("setLocationSBR();",popSBRDelay); //waits the set amount of time, then shows the popup
}

function setLocationSBR() { //sets location of the popup and shows it
	//reset this from if it was too wide last time
	document.getElementById('tipBoxBg').style.width="";
	document.getElementById('tipBox').style.width="";
	document.getElementById('tipBoxBg').style.overflow="";
	document.getElementById('tipBox').style.overflow="";
	
	var tempLeft=globalXSBR+10+window.pageXOffset;
	var tempTop=globalYSBR+15+window.pageYOffset;
	
	//make it so we can see calculated width/height
	document.getElementById('tipBoxBg').style.visibility="hidden";
	document.getElementById('tipBox').style.visibility="hidden";
	document.getElementById('tipBoxBg').style.display="block";
	document.getElementById('tipBox').style.display="block";
	
	if( (tempLeft+document.getElementById('tipBox').offsetWidth) > (window.innerWidth+window.pageXOffset-offSBRRight) ) { //if its too far right
		tempLeft-=(document.getElementById('tipBox').offsetWidth+12);
	}
	
	if( (tempTop+document.getElementById('tipBox').offsetHeight) > (window.innerHeight+window.pageYOffset-offSBRTop) ) { //if its too far down
		tempTop-=(document.getElementById('tipBox').offsetHeight+18);
	}
	
	if(tempLeft < window.pageXOffset) { //if it is too far left, i.e. it is a super-wide box
		tempLeft=window.pageXOffset+1; //set it all the way to the left
		if( (document.getElementById('tipBox').offsetWidth+2) > (document.documentElement.clientWidth-11) ){ //if it needs to be given a max width
			document.getElementById('tipBoxBg').style.width=document.documentElement.clientWidth-offSBRRight+6; //used to be -12 instead of "-offSBRRight+6"
			document.getElementById('tipBox').style.width=document.documentElement.clientWidth-offSBRRight+6;
			document.getElementById('tipBoxBg').style.overflow="hidden";
			document.getElementById('tipBox').style.overflow="hidden";
		} else {
			tempLeft=window.pageXOffset+((document.documentElement.clientWidth-document.getElementById('tipBox').offsetWidth)/2)-1; //center the box
		}
	}
	
	document.getElementById('tipBoxBg').style.left=tempLeft+2+"px";
	document.getElementById('tipBox').style.left=tempLeft+"px";
	document.getElementById('tipBoxBg').style.top=tempTop+2+"px";
	document.getElementById('tipBox').style.top=tempTop+"px";
	document.getElementById('tipBoxBg').style.visibility="visible";
	document.getElementById('tipBox').style.visibility="visible";
}

function setContentSBR(theObject) { //adds values to their respective popup fields
	var theTitle=theObject.getAttribute('title');
	if(theTitle==null) theTitle="";
	var theAlt=theObject.getAttribute('childalts');
	if(theAlt==null) theAlt="";
	var theHref=theObject.getAttribute('href');
	if(theHref==null){
		theHref="";
	} else if(theHref.charAt(theHref.length-1)=="/".charAt(0)) { //remove trailing slash from links
		theHref=theHref.substring(0,theHref.length-1);
	}
	var theClick=theObject.getAttribute('onclick');
	if(theClick==null){
		theClick="";
	} else {
		theClick=theClick.replace("<","&#60;").replace(">","&#62;"); //replaces to prevent html rendering from javascripts
	}
	document.getElementById('titleValueA').innerHTML=theTitle;
	document.getElementById('titleValueB').innerHTML=theTitle;
	document.getElementById('altValueA').innerHTML=theAlt;
	document.getElementById('altValueB').innerHTML=theAlt;
	document.getElementById('hrefValueA').innerHTML=theHref;
	document.getElementById('hrefValueB').innerHTML=theHref;
	document.getElementById('clickValueA').innerHTML=theClick;
	document.getElementById('clickValueB').innerHTML=theClick;
	if(theTitle==""){
		document.getElementById('titleSectionA').style.display="none";
		document.getElementById('titleSectionB').style.display="none";
	}
	if(theAlt==""){
		document.getElementById('altSectionA').style.display="none";
		document.getElementById('altSectionB').style.display="none";
	}
	if(theHref==""){
		document.getElementById('hrefSectionA').style.display="none";
		document.getElementById('hrefSectionB').style.display="none";
	}
	if(theClick==""){
		document.getElementById('clickSectionA').style.display="none";
		document.getElementById('clickSectionB').style.display="none";
	}
	theObject.removeAttribute('title');
}
function unPopSBR(theObject) { //hides box, resets element title
	window.clearTimeout(theShowDelayerSBR);
	document.getElementById('tipBoxBg').style.display="none";
	document.getElementById('tipBox').style.display="none";
	document.getElementById('titleSectionA').style.display="block";
	document.getElementById('altSectionA').style.display="block";
	document.getElementById('hrefSectionA').style.display="block";
	document.getElementById('clickSectionA').style.display="block";
	document.getElementById('titleSectionB').style.display="block";
	document.getElementById('altSectionB').style.display="block";
	document.getElementById('hrefSectionB').style.display="block";
	document.getElementById('clickSectionB').style.display="block";
	if(theObject) theObject.setAttribute('title',document.getElementById('titleValueA').innerHTML);
}

//adds the popup box(hidden) and the events that position it and pop it up
if(document.body && document.designMode!="on"){ //so long as there is a body and the thing isn't a rich text frame
	//create the popup
	theSBRDivA=document.createElement('div');
	theSBRDivB=document.createElement('div');
	theSBRDivA.setAttribute('id','tipBoxBg');
	theSBRDivB.setAttribute('id','tipBox');
	theSBRDivB.setAttribute('onmouseover',"document.getElementById('tipBoxBg').style.display='none'; document.getElementById('tipBox').style.display='none';"); //in the offchance it gets displayed when it shouldnt
	theSBRDivA.setAttribute('style',"position:absolute !important; left:13px; top:13px; padding:3px !important; font-size:10px !important; text-align:left !important; line-height:13px !important; white-space:nowrap !important; display:none; border:1px solid black !important; font-family:Verdana,sans-serif !important; z-index:99980000 !important; background:black !important; color:black !important; opacity:.3 !important;");
	theSBRDivB.setAttribute('style',"position:absolute !important; left:10px; top:10px; padding:3px !important; font-size:10px !important; text-align:left !important; line-height:13px !important; white-space:nowrap !important; display:none; border:1px solid black !important; font-family:Verdana,sans-serif !important; z-index:99990000 !important; background:rgb(255,255,247) !important; color:black !important;");
	theSBRDivA.innerHTML=unescape("%3Cdiv%20id%3D%22titleSectionA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22titleLabelA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3ETitle%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22titleValueA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22altSectionA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22altLabelA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3EImg%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22altValueA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22hrefSectionA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22hrefLabelA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3ELink%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22hrefValueA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22clickSectionA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22clickLabelA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3EonClick%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22clickValueA%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E");
	theSBRDivB.innerHTML=unescape("%3Cdiv%20id%3D%22titleSectionB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22titleLabelB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3ETitle%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22titleValueB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22altSectionB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22altLabelB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3EImg%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22altValueB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22hrefSectionB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22hrefLabelB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3ELink%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22hrefValueB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E%0A%3Cdiv%20id%3D%22clickSectionB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3Cspan%20id%3D%22clickLabelB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3EonClick%3A%20%3C%2Fspan%3E%0A%09%3Cspan%20id%3D%22clickValueB%22%20style%3D%22color%3Ainherit%3Bfont%3Ainherit%3Bbackground%3Ainherit%3B%22%3E%3C%2Fspan%3E%3C%2Fdiv%3E");
	document.getElementsByTagName('body')[0].insertBefore(theSBRDivB,document.getElementsByTagName('body')[0].firstChild);
	document.getElementsByTagName('body')[0].insertBefore(theSBRDivA,document.getElementsByTagName('body')[0].firstChild);
	
	//add event listeners
	document.addEventListener("mousemove", function(evt){ globalXSBR=evt.clientX; globalYSBR=evt.clientY; }, false);
	var allAs = document.getElementsByTagName('a');
	for(var i=0; i<allAs.length; i++) { //add listener to every link
		document.getElementsByTagName('a')[i].addEventListener("mouseover", function(){ doPopSBR(this); }, false);
		document.getElementsByTagName('a')[i].addEventListener("mouseout", function(){ unPopSBR(this); }, false);
		document.getElementsByTagName('a')[i].addEventListener("click", function(){ unPopSBR(this); }, false);
		
		//analyze image alt text
		var theInnerImages=allAs[i].getElementsByTagName('img');
		if(theInnerImages!=null) { //there are images inside
			var allTheAlts="";
			for(var j=0; j<theInnerImages.length; j++) { //run through all of the images
				var newAlt=theInnerImages[j].getAttribute('alt');
				if(newAlt!=null){ //there is an alt
					theInnerImages[j].setAttribute('alt','');
					if(allTheAlts!="") {
						allTheAlts+="&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+newAlt;
					} else {
						allTheAlts=newAlt;
					}
				}
				theInnerImages[j].setAttribute('title','');
			}
			allAs[i].setAttribute('childalts',allTheAlts);
		}
	}
}


