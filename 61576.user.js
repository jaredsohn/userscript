// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
// ==UserScript==
// @name         GetFlickrPicURL
// @author       sfufoet
// @blog       	 http://blog.loland.net/
// @description  Easily to get pics URL after upload them to Flickr
// @include     http://www.flickr.com/photos/upload/done/
// @namespace    http://blog.loland.net/203.et
// ==/UserScript==

GetFlickrPicURL();
function GetFlickrPicURL(){
	var enabling = document.createElement('div');
	var dl,dll,i,outText,allText,imgWindow;
	outText='';
	allText='';

	dl=document.images;
	dll=dl.length;
	for(i=0;i<dll;++i){
		if(outText.indexOf(document.images[i].src)==-1&&(document.images[i].src.lastIndexOf('jpg')!=-1||document.images[i].src.lastIndexOf('jpeg')!=-1||document.images[i].src.lastIndexOf('jpe')!=-1||document.images[i].src.lastIndexOf('jfif')!=-1||document.images[i].src.lastIndexOf('JPG')!=-1||document.images[i].src.lastIndexOf('JPEG')!=-1||document.images[i].src.lastIndexOf('JPG')!=-1||document.images[i].src.lastIndexOf('/small')!=-1||document.images[i].src.lastIndexOf('JFIF')!=-1)){
			outText+='<tr><td ><img src=\"'+document.images[i].src+'\" ></td><td><table ><tbody><tr><td >square:</td><td><input size="90" type=\"text\"  value=\'<img src=\"'+document.images[i].src.replace(/_m/g,'_s')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></tr></td><tr><td >small:</td><td><input size="90" type=\"text\"  value=\'<img src=\"'+document.images[i].src.replace(/_m/g,'_m')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></tr></td><tr><td >medium:</td><td><input size="90" type=\"text\"  value=\'<img src=\"'+document.images[i].src.replace(/_m/g,'')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></td></tr><tr><td >square:</td><td><input size="90" type=\"text\"  value=\''+document.images[i].src.replace(/_m/g,'_s')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></tr></td><tr><td >small:</td><td><input size="90" type=\"text\"  value=\''+document.images[i].src.replace(/_m/g,'_m')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></tr></td><tr><td >medium:</td><td><input size="90" type=\"text\"  value=\''+document.images[i].src.replace(/_m/g,'')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></td></tr></tbody></table></td></tr>';
			allText+='<img src=\"'+document.images[i].src+'\"/>\n\n';
		}
	}

	allText=allText.replace(/_m/g,'');
	allText='<tr><td colspan="2" ><textarea cols="100%" rows="6" onmouseover=\'this.focus()\' onfocus=\'this.select()\'>'+allText+'</textarea></tr></td>';
	enabling.innerHTML = '<h3>Pics Codes</h3><table  cellspacing="0">'+allText+outText+'</table>';

	document.getElementById('organizr-form').parentNode.insertBefore(enabling, document.getElementById('organizr-form'));
}
