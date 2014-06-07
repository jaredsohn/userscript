// ==UserScript==
// @name           OnlyFresh
// @namespace      http://voltlick.com/stuff/su/onlyfresh/
// @description    Hides pictures you've already seen so you only see new content.
// @include        http://*.stumbleupon.com/*
// @exclude        http://*stumbleupon.com/about/*
// ==/UserScript==

//credit to hxseven's button adding code: http://userscripts.org/scripts/show/3445

var allimages, thisimage;
allimages = document.getElementsByTagName('img');
var thisimageurl = "";
var islocal; var ischrome;

var x;
var imagelist = new Array();
imagelist[0] = "http://somedomain.com/someimage.imageextension";

function addurl(theterm){
if(imagelist.indexOf(theterm)==-1){imagelist.push(theterm)}; 
}
main();
function main(){
for (var i = 0; i < allimages.length; i++) {
	thisimage = allimages[i];
	thisimageurl = thisimage.src; thisimageurl = thisimageurl.toLowerCase();
	// do something with thisimage
		
		islocal=thisimageurl.indexOf("stumbleupon.com");
		ischrome=thisimageurl.indexOf("chrome://");
		
		if(islocal==-1 && ischrome ==-1)
		{
			//imagelist = imagelist + "\r\n" + thisimageurl;
			addurl(thisimageurl);
			
		}
	
	
		if(islocal==-1 && ischrome ==-1)
		{
			if (GM_getValue("enabled")=="false"){
			somenothing="";
			} else {
				if (GM_getValue(thisimageurl)=="found" && !(thisimage.alt=="restored image")){
					thisimage.src="";


				
				thisimage.setAttribute( "name","img"+i );
				thisimage.setAttribute( "id","img"+i );
				thisimage.setAttribute("onmouseover", "img"+i +".src='" + thisimageurl  + "';" + "img"+i+".width="+thisimage.width + ";img"+i+".height="+thisimage.height + ";img"+ i + ".alt='restored image';");

					thisimage.width=40;
					thisimage.height=3;
					//thisimage.parentNode.removeChild(thisimage	);
				thisimage.parentNode.removeAttribute("href");

	//newLink.setAttribute( "onmouseout", imageName +".src='" + originalImage.src  + "';" );

				//altText = document.createTextNode("lolly");
   				//thisimage.parentNode.parentNode.replaceChild(altText, thisimage);
				//thisimage.parentNode.childNodes[0].innerHTML="<p>lollyyyyy<\p>";
							
				}
			}
		}
	
	
	}
}

setInterval( function(){
	main();
}, 1000 );

function unloaded()
{
	for (x in imagelist)
	{
	GM_setValue(imagelist[x], "found");
	}
}

window.addEventListener('unload', unloaded, false);
//GM_setValue("enabled", "true");

// get the parent element of the button element
    var button = document.getElementsByTagName('button')[0]; 
    var before_button = 1;
    if (button.innerHTML == "Ignore Me") { before_button = 0; }
    var button_area = document.getElementsByTagName('button')[0].parentNode;

    // build the button:
    var get_url_btn  = '<button id="get_url_btn" ';
    get_url_btn += (before_button == 0) ? 'class=mini ' : '';

if (!(GM_getValue("enabled")=="false")){//if enabled
    get_url_btn += '>Show images seen already</button>';
 
    // append the button to the button area
    button_area.innerHTML = (before_button == 1) ? get_url_btn + button_area.innerHTML : button_area.innerHTML + get_url_btn;

 // add the function to the button:
    document.getElementById('get_url_btn').addEventListener('click',function () {
GM_setValue("enabled", "false");scroll(0,0); window.location.reload();
 },false);
} else{
    get_url_btn += '>Hide images seen already</button>';
 
    // append the button to the button area
    button_area.innerHTML = (before_button == 1) ? get_url_btn + button_area.innerHTML : button_area.innerHTML + get_url_btn;

 // add the function to the button:
    document.getElementById('get_url_btn').addEventListener('click',function () {
GM_setValue("enabled", "true");scroll(0,0);
 },false);
}
