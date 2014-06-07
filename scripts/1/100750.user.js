// Rage Face Picker for F7U12
// http://www.boiledpudding.com
// Ver 2.2
//
// Clicking the buttons is broke, they're just for reference for now,
// unfortunately. u mad??
//
// ==UserScript==
// @name           RageFacePicker
// @namespace      boiledpudding
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/comments/*
// @include 	   http://localhost/Testing/*
// ==/UserScript==

function addButtons() 
{
	var alertIt = 0;
	
	var formCounter = 0;
	
	var botArea = document.getElementsByClassName('bottom-area')[0];

	var faces = document.createElement("div");

	faces.style.height = "150px";
	faces.style.width = "100%";
	faces.setAttribute("id", "boiledpudding:faces" + formCounter.toString());
	faces.style.overflow = "scroll"; 
	faces.style.overflowX = "hidden";
	
	botArea.appendChild(faces)

	var myr = document.styleSheets[1].cssRules;
	
	var j = 0;

	var textAreas = document.getElementsByTagName('textarea');
	
	for(i=0; i < myr.length; i++) 	{
		var st = myr[i].selectorText;
		var stOrigin = myr[i].selectorText;
		var faceID = '';
		
		if(st.slice(0,2) == "a[" || st.slice(0,6) == ".faces") 		{
			
			var thesplits = st.split(',');
					
			for(var k=0; k < thesplits.length; k++)
			{	
				
				st = thesplits[k].trim();	
				st = st.slice(8, st.length);
				st = st.slice(0, st.indexOf('"'));
				
				// st is now the facename
				faceID = st + formCounter.toString();			
				if(faceID.slice(0,1) == '/') {
					faceID = faceID.slice(1, faceID.length - 1);
				}
				
				if(faceID != '1ne496 .md:afte') { // wtf? 
				
					var id = "boiledpudding:face" + faceID;
					
					var divId = "boiledpudding:div" + faceID;
					
					var existing = document.getElementById(id);
					var existDiv = document.getElementById(divId);
									
					var bgImg = myr[i].style.backgroundImage;
					
					var w = myr[i].style.width;
					var h = myr[i].style.height;
					var bgPos = myr[i].style.backgroundPosition;
					var disp = myr[i].style.display;
					var cnt = myr[i].style.content;
					
					// bgImg = bgImg.replace(/\"/g, "");
					
					var face1;
					var faceDiv;
					
					if(existing)
					{
						face1 = existing;
						faceDiv = existDiv;
					} else
					{
						faceDiv = document.createElement("div");
						faceDiv.setAttribute("id", divId);
						
						face1 = document.createElement("button");
						
						face1.setAttribute("type", "button");
						face1.setAttribute("style", "background-color: transparent");				
						face1.setAttribute("id", id);		
					}											
					
					if(bgPos) { 
						faceDiv.style.backgroundPosition = bgPos; 
					}
					
					if(bgImg) { 
						faceDiv.style.backgroundImage = bgImg; 
					}
					
					if(disp) { 
						faceDiv.style.display = disp; 
					}
					
					if(w) { 
						faceDiv.style.width = w; 
					}
						
					if(h) { 
						faceDiv.style.height = h; 
					}
					
					if(!existing)
					{
						if(cnt == "" || cnt == '""') {
							faceDiv.style.backgroundPosition = bgPos;
							faceDiv.style.display = disp;
							faceDiv.style.width = w;
							faceDiv.style.height = h;
							faceDiv.style.backgroundImage = bgImg;
						} else {
							if(cnt.slice(0, 3) == "url")			{										
								var newImg = document.createElement("img");
								cnt = cnt.slice(5, cnt.length - 5);
								cnt = cnt.slice(0, cnt.length - 3);
								newImg.src = cnt;
								faceDiv.appendChild(newImg);
							} else {								
								var spanCnt = document.createElement("span");
								spanCnt.innerHTML = ' '; //cnt;
								faceDiv.appendChild(spanCnt);								
							}
						} 		

						face1.appendChild(faceDiv);
						face1.title = st;
					}
					
					faces.appendChild(face1)
					var curId = document.getElementById(id);

					var bleh = st;

					if(!existing)
					{
						(function (faceDiv, bleh) {			
							curId.addEventListener("click", (function() { addFace(faceDiv, bleh); }), false);
						})(faceDiv, bleh);
						
						j = j + 1;
					}
				}
			}
		}
		
		
	}
	/*
	var newImg = document.createElement("img");
	newImg.src = 'http://thumbs.reddit.com/t5_2qqlo_6.png?v=j2ttryyhqaada7goh1pdlp5ngyhyr9fvfw5g';
	document.getElementsByTagName('textarea')[4].parentNode.appendChild(newImg);
	*/

	formCounter = formCounter + 1;
	return;
}

function addFace(faceDiv, faceNum)
{
	var parent = faceDiv.parentNode.parentNode.parentNode.parentNode;
	
	parent.style.border = "inset red 4px";
	
	var textAreas = parent.getElementsByTagName('textarea');
	
	if ( !textAreas[0] ) {
		return;
	}
	
	var targetTextArea = textAreas[0];
					
	var myTextArea = targetTextArea;
	
	var injection = "[](" + faceNum + ' "")';
	
	if(myTextArea)
	{
		myTextArea.value += injection;
	}	
	
	return	
}

addButtons();

