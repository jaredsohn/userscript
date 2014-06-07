// ==UserScript==
// @name           okcupidembedthings
// @namespace      blah
// @include        http://www.okcupid.com*/journal*
// @include	   http://www.youtube.com*okcupid=yes*
// ==/UserScript==




function init(evt) {



/****************************************************
set this to true if you want image/video to load automatically.  has the potential to slow things down, and expose you to terrible truths about the world around you.*/

var autoshow = false;

/*****************************************************/



if (!isYouTube()) {



	if (evt == 0) {
		var target = document.body;
	} else {
		target = evt.target;
	}


	if (target.innerHTML) {

	if (target.getAttribute('class') != "addedimg") {

	var imgreg = /([\>\s^\*])([http\:\/\/][^\<\s]*)(\.jpg|\.bmp|\.gif|\.jpeg)([\<\s])/ig;


	var reg = /([\>\s^\*])([http\:\/\/]*www\.youtube\.com\/watch[^\<\s]*)([\<\s])/ig;

	
	var htmlstring = target.innerHTML;

	if (imgreg.test(htmlstring)) {
		htmlstring = htmlstring.replace(imgreg,'$1<addedimg class="addedimg">$2$3</addedimg>$4');
		target.innerHTML = htmlstring;
		var addedimg = target.getElementsByTagName('addedimg')[0];
		var dest = addedimg.textContent;
		var imglabel = document.createElement('imglabel');
		imglabel.textContent = "*"+addedimg.textContent;
		addedimg.textContent = "";
		if (dest != "") {
		var button = makeImageButtonFor(dest);
		addedimg.parentNode.insertBefore(button,addedimg);
		var p = document.createElement('p');
		addedimg.parentNode.insertBefore(p,addedimg);
		addedimg.parentNode.insertBefore(imglabel,addedimg);
		if (autoshow) {
			showImageButtonContent(button)
		}
		}
		addedimg.parentNode.removeChild(addedimg);
		htmlstring = target.innerHTML;
		
	}
	target.innerHTML = htmlstring;
	if (reg.test(htmlstring)) {
		htmlstring = htmlstring.replace(reg,'$1<addedimg class="addedimg">$2</addedimg>$3');
		target.innerHTML = htmlstring;
		var addedimg = target.getElementsByTagName('addedimg')[0];
		var dest = addedimg.textContent;
		var imglabel = document.createElement('imglabel');
		imglabel.textContent = "*"+addedimg.textContent;
		addedimg.textContent = "";
		if (dest != "") {
		var button = makeButtonFor(dest+"&okcupid=yes");
		addedimg.parentNode.insertBefore(button,addedimg);
		var p = document.createElement('p');
		addedimg.parentNode.insertBefore(p,addedimg);
		addedimg.parentNode.insertBefore(imglabel,addedimg);
		if (autoshow) {
			showButtonContent(button)
		}
		}
		addedimg.parentNode.removeChild(addedimg);
		htmlstring = target.innerHTML;
	}
	target.innerHTML = htmlstring;

	
	
	}
	}

	//}
	}
}




init(0);



function getElementsByAttribute(frst,attrN,attrV,multi){
	
attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
    	var multi=typeof multi!='undefined'?
            multi:
            false,
        cIterate=frst.getElementsByTagName('*'),
        aResponse=[],
        attr,
        re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
        i=0,
        elm;
    while((elm=cIterate.item(i++))){
        attr=elm.getAttributeNode(attrN);
        if(attr &&
            attr.specified &&
            re.test(attr.value)
        )
            aResponse.push(elm);
    }
    return aResponse;
}



function showButtonContent(button) {
var obj = document.createElement('iframe');
obj.setAttribute('id',button.getAttribute('id')+'_content');
obj.setAttribute('class','addedimg');
obj.setAttribute('width','641');
obj.setAttribute('height','392');
obj.setAttribute('src',button.getAttribute('url'));
button.parentNode.insertBefore(obj,button.nextSibling);
button.setAttribute('onclick','hideButtonContent(this);');
button.innerHTML = '<a href=#blah>hide</a>';
}
function hideButtonContent(button) {
var obj = document.getElementById(button.getAttribute('id')+'_content');
obj.parentNode.removeChild(obj);
button.innerHTML = '<a href=#blah>show</a>';
button.setAttribute('onclick','showButtonContent(this);');
}
function showImageButtonContent(button) {
var obj = document.createElement('img');
obj.setAttribute('id',button.getAttribute('id')+'_content');
obj.setAttribute('class','addedimg');
obj.setAttribute('src',button.getAttribute('url'));
button.parentNode.insertBefore(obj,button.nextSibling);
button.setAttribute('onclick','hideImageButtonContent(this);');
button.innerHTML = '<a href=#blah>hide</a>';
}
function hideImageButtonContent(button) {
var obj = document.getElementById(button.getAttribute('id')+'_content');
obj.parentNode.removeChild(obj);
button.innerHTML = '<a href=#blah>show</a>';
button.setAttribute('onclick','showImageButtonContent(this);');
}


function init2() {

if (!isYouTube()) {

var scriptdiv = document.createElement('script');

var scriptstring = "function showButtonContent(button) {"+
"var obj = document.createElement('iframe');"+
"obj.setAttribute('id',button.getAttribute('id')+'_content');"+
"obj.setAttribute('class','addedimg');"+
"obj.setAttribute('width','641');"+
"obj.setAttribute('height','392');"+
"obj.setAttribute('src',button.getAttribute('url'));"+
"button.parentNode.insertBefore(obj,button.nextSibling);"+
"button.setAttribute('onclick','hideButtonContent(this);');"+
"button.innerHTML = '<a href=#blah>hide</a>';"+
"}"+
"function hideButtonContent(button) {"+
"var obj = document.getElementById(button.getAttribute('id')+'_content');"+
"obj.parentNode.removeChild(obj);"+
"button.innerHTML = '<a href=#blah>show</a>';"+
"button.setAttribute('onclick','showButtonContent(this);');"+
"}"+
"function showImageButtonContent(button) {"+
"var obj = document.createElement('img');"+
"obj.setAttribute('id',button.getAttribute('id')+'_content');"+
"obj.setAttribute('class','addedimg');"+
"obj.setAttribute('src',button.getAttribute('url'));"+
"button.parentNode.insertBefore(obj,button.nextSibling);"+
"button.setAttribute('onclick','hideImageButtonContent(this);');"+
"button.innerHTML = '<a href=#blah>hide</a>';"+
"}"+
"function hideImageButtonContent(button) {"+
"var obj = document.getElementById(button.getAttribute('id')+'_content');"+
"obj.parentNode.removeChild(obj);"+
"button.innerHTML = '<a href=#blah>show</a>';"+
"button.setAttribute('onclick','showImageButtonContent(this);');"+
"}";


scriptdiv.setAttribute("type","text/javascript");
scriptdiv.innerHTML = scriptstring;
document.body.insertBefore(scriptdiv,document.body.childNodes[0]);

} else {


var sGetter = document.createElement('script');
sGetter.type = "text/javascript";
sGetter.innerHTML = "function onytplayerStateChange(){};function onYouTubePlayerReady(){"+
					"var movP = document.getElementById('movie_player');movP.playVideo();movP.pauseVideo();"+
					"movP.addEventListener('onStateChange', 'onytplayerStateChange');};";
document.body.appendChild(sGetter);

var vidID = document.location.toString().split("v=")[1].split("&")[0];
var pD = document.getElementById('watch-player-div');
var mP = document.getElementById('movie_player');
var fV = mP.getAttribute("flashvars");
if(fV.match('ad_module=http')){
	
	var toRemove = "ad_module="+fV.split('ad_module=')[1].split('.swf')[0]+".swf";
	fV=fV.replace(toRemove,'');
}

mP.setAttribute("flashvars","autoplay=0&"+fV);
mP.src+="#";
mP.style.height='25px';

var altPlayerIMG = document.createElement('img');
altPlayerIMG.setAttribute('id','myytplayerIMG');
altPlayerIMG.src='http://i2.ytimg.com/vi/'+vidID+'/default.jpg';
altPlayerIMG.setAttribute('style','width:640px;height:360px;');
pD.insertBefore( altPlayerIMG, mP );

var cI = true;

unsafeWindow.onytplayerStateChange = function(newState){

	if(newState==1 && cI){

		pD.removeChild(altPlayerIMG);
		mP.style.height='385px';
		pD.removeEventListener("mouseover", pdmousOv, false);
		pD.removeEventListener("mouseout", pdmousOu, false);
		cI=false;
	
	}

}

pD.addEventListener('mouseover', pdmousOv = function(e){

	altPlayerIMG.style.display='none';
	mP.style.height='385px';

}, false);
pD.addEventListener('mouseout', pdmousOu = function(e){

	altPlayerIMG.style.display='block';
	mP.style.height='25px';

}, false);


document.getElementById('movie_player').setAttribute("flashvars","autoplay=0&"+document.getElementById('movie_player').getAttribute("flashvars"));
document.getElementById('movie_player').setAttribute('src',document.getElementById('movie_player').getAttribute('src')+"#");

var vid = document.getElementById("watch-this-vid");
document.body.innerHTML = "";
document.body.appendChild(vid);

}

}


init2();

function makeImageButtonFor(url) {
var button = document.createElement('div');
button.setAttribute('url',url);
button.setAttribute('class','embedbutton');
button.setAttribute('id','embedbutton'+String(Math.random()*100000000));
button.setAttribute('onclick',"showImageButtonContent(this);");
button.innerHTML = '<a href=#blah>show</a>';
return button;
}


function makeButtonFor(url) {
var button = document.createElement('div');
button.setAttribute('url',url);
button.setAttribute('class','embedbutton');
button.setAttribute('id','embedbutton'+String(Math.random()*100000000));
button.setAttribute('onclick',"showButtonContent(this);");
button.innerHTML = '<a href=#blah>show</a>';
return button;
}



function isYouTube() {
	var loc = String(window.location);
	if (loc.indexOf("okcupid.com") != -1) {
		return false;
	} else {
		return true;
	}
}

document.addEventListener("DOMNodeInserted",
	function(evt) {
		init(evt);
	}, true);