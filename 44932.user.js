// ==UserScript==
// @name           eeeGMaps
// @namespace      UTF-8
// @description    add a link to the top of gmaps to toggle unnecessary boxes
// @include        http://maps.google.*
// ==/UserScript==


function __setValue(key, value){try{GM_setValue(key, value);}catch(e){try{PRO_setValue(key,value);}catch(e){}}}
function __getValue(key, value){try{value = GM_getValue(key, value);}catch(e){try{value = PRO_getValue(key, value);}catch(e){}}return value;}
function __log(msg){try{GM_log(msg);}catch(e){try{PRO_log(msg);}catch(e){}}}


var nobr = document.getElementById('guser').getElementsByTagName('nobr')[0];

var toggleLink = document.createElement("a");
toggleLinkText = document.createTextNode("maximize");
toggleLink.href = '#';
toggleLink.addEventListener('click',toggle,1);

toggleLink.appendChild(toggleLinkText);

seperatorText = document.createTextNode(' | ');

nobr.insertBefore(seperatorText, nobr.firstChild);
nobr.insertBefore(toggleLink, nobr.firstChild);


window.addEventListener('resize',function(){
	if(__getValue('GMaps_toggle') == 1){
		document.getElementById("lmc3d").style.top = "23px";
		document.getElementById("cbctl").style.top = "16px";
	}
	
}, true);


function toggle(changeStatus){
  if(changeStatus != false) changeStatus = true;
	
  if((__getValue('GMaps_toggle')==0 && changeStatus == true) || (changeStatus == false && __getValue('GMaps_toggle')==1))
  {
  
    // maximize
  
    document.getElementById("header").style.display = 'none';
    document.getElementById("guser").style.display = 'none';
    document.getElementById("gbar").style.display = 'none';
    if(typeof document.getElementById('mclip').getElementsByTagName("div")[0] != "undefined") document.getElementById('mclip').getElementsByTagName('div')[0].style.display = 'none';
    
    a = document.createElement("a");
    a.href = "#";
    a.addEventListener('click',toggle,1);
    span = document.createElement("span");
    span.className = 'link-text';
    span.appendChild(document.createTextNode("restore"));
    a.appendChild(span);
    li = document.createElement("li");
    li.appendChild(a);
    
	img = document.createElement("img");
	img.src = '/intl/de_ALL/mapfiles/transparent.png';
	img.className = 'bar-icon-divider bar-divider';
	liImg = document.createElement("li");
	liImg.appendChild ( document.createTextNode ( " " ) );
	liImg.appendChild ( img );
	liImg.appendChild ( document.createTextNode ( " " ) );
    
    ul_leaf_links = document.getElementById('links').getElementsByTagName("ul")[0];
    ul_leaf_links.insertBefore(liImg, ul_leaf_links.firstChild);
    ul_leaf_links.insertBefore(li, ul_leaf_links.firstChild);
    

    document.getElementById("map").style.height = (window.innerHeight) + "px";
    
    document.getElementById("links").style.opacity = 0.6;
    document.getElementById("links").style.position = "absolute";
    document.getElementById("links").style.top = "0px";
    document.getElementById("links").style.height = "24px";
    document.getElementById("links").style.width = "500px";
    document.getElementById("links").style.zIndex = 2;
    document.getElementById("map").style.zIndex = 1;
    document.getElementById("lmc3d").style.top = "23px";
    document.getElementById("cbctl").style.top = "16px";
    
    document.getElementById("links").addEventListener('mouseover', set_high_opacity, 1);
    document.getElementById("links").addEventListener('mouseout', set_low_opacity, 1);
    
	
	divs = document.getElementById("ds-h").getElementsByTagName("div");
    for(i in divs){
      divs[i].style.top = '24px';
      divs[i].style.width = '500px';
    }
    
    if(changeStatus == true) __setValue('GMaps_toggle',1);
    
    
  }
  else
  {

    // restore
   
    document.getElementById("header").style.display = '';
    document.getElementById("guser").style.display = '';
    document.getElementById("gbar").style.display = '';
    
    ul_leaf_links = document.getElementById('links').getElementsByTagName("ul")[0];
    ul_leaf_links.removeChild(ul_leaf_links.firstChild);
    ul_leaf_links.removeChild(ul_leaf_links.firstChild);

    
    var offset = 0;
    opt_top = 0;
    element = document.getElementById("map");
    for (var elem = element; elem && elem != opt_top; elem = elem.offsetParent) {
			offset += elem.offsetTop;
    }
    document.getElementById("map").style.height = (window.innerHeight - offset) + "px";
    
    document.getElementById("links").style.opacity = 1;
    document.getElementById("links").style.position = "";
    document.getElementById("links").style.top = "0px";
    document.getElementById("links").style.height = "";
    document.getElementById("links").style.width = "";
    document.getElementById("links").style.zIndex = 2;
    document.getElementById("lmc3d").style.top = "7px";
    document.getElementById("cbctl").style.top = "0px";
    for(i in document.getElementById("ds-h").getElementsByTagName("div")){
      document.getElementById("ds-h").getElementsByTagName("div")[i].style.top = '1.7em';
      document.getElementById("ds-h").getElementsByTagName("div")[i].style.width = '100%';
    }

    document.getElementById("links").removeEventListener('mouseout', set_low_opacity, 1);


    
    if(changeStatus == true) __setValue('GMaps_toggle',0);
    
    
  }
  return false;
    
}

function set_low_opacity ( )
{
	this.style.opacity = 0.6;
}
function set_high_opacity ( )
{
	this.style.opacity = 1;
}


toggle(false);