// ==UserScript==
// @name           Removes duplicate images.
// @include        *
var e=document.getElementsByTagName('img');
var pushed = new Array();
var pushedId = new Array();
for(i=0;i<e.length;i++){
	if(e[i].width>300 && e[i].height>200 	//min width and height needed to hide the image.
&& e[i].src.indexOf(location.hostname)!=0	//this line checks if the image is in the same domain.
){
		if(pushed.indexOf(e[i].src)==-1){
		pushed.push(e[i].src);
		if(!e[i].id)
			e[i].setAttribute('id','shuDuplicate'+i);
		pushedId.push(e[i].id);
		}else{
		alink=document.createElement('a');
		alink.setAttribute('href','#'+pushedId[pushed.indexOf(e[i].src)]);
		alink.innerHTML=e[i].src+' (duplicate)'; //link text remove the (duplicate) if u don't like it
		e[i].parentNode.replaceChild(alink,e[i]);
		}
	}
}