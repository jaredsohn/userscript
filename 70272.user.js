// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
// ==UserScript==
// @name         GetYupooPicURL
// @author       sfufoet
// @blog       	 http://blog.loland.net/
// @description  Easy to select used often Yupoo album
// @include      http://www.yupoo.com/photos/upload/edit/
// @namespace    http://blog.loland.net/2008/10/15/69.et
// ==/UserScript==

GetYupooPicURL();
function GetYupooPicURL(){
	var enabling = document.createElement('div');
	var dl,dll,i,outText,allText,imgWindow;
	outText='';
	allText='';

	dl=document.images;
	dll=dl.length;
	for(i=0;i<dll;++i){
		if(outText.indexOf(document.images[i].src)==-1&&(document.images[i].src.lastIndexOf('jpg')!=-1||document.images[i].src.lastIndexOf('jpeg')!=-1||document.images[i].src.lastIndexOf('jpe')!=-1||document.images[i].src.lastIndexOf('jfif')!=-1||document.images[i].src.lastIndexOf('JPG')!=-1||document.images[i].src.lastIndexOf('JPEG')!=-1||document.images[i].src.lastIndexOf('JPG')!=-1||document.images[i].src.lastIndexOf('/small')!=-1||document.images[i].src.lastIndexOf('JFIF')!=-1)){
			outText+='<tr><td class="BatchPic"><img src=\"'+document.images[i].src+'\" class="Photo"></td><td><table class="BatchForm"><tbody><tr><td class="Label">square:</td><td><input type=\"text\" class="txt" value=\'<img src=\"'+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'square')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></tr></td><tr><td class="Label">small:</td><td><input type=\"text\" class="txt" value=\'<img src=\"'+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'small')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></tr></td><tr><td class="Label">medium:</td><td><input type=\"text\" class="txt" value=\'<img src=\"'+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'medium')+'\"/>\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' onclick="this.value=this.value.replace(\'<img\',\'<img align="right"\');this.select();"/></td></tr><tr><td class="Label">square:</td><td><input type=\"text\" class="txt" value=\''+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'square')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></tr></td><tr><td class="Label">small:</td><td><input type=\"text\" class="txt" value=\''+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'small')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></tr></td><tr><td class="Label">medium:</td><td><input type=\"text\" class="txt" value=\''+document.images[i].src.replace(/photo/g,'pic').replace(/small/g,'medium')+'\' onmouseover=\'this.focus()\' onfocus=\'this.select()\' /></td></tr></tbody></table></td></tr>';
			allText+='<img src=\"'+document.images[i].src+'\"/>\n\n';
		}
	}
	allText=allText.replace(/photo/g,'pic');
	allText=allText.replace(/small/g,'medium');
	allText='<tr><td colspan="2" class="BatchPic"><textarea cols="100%" rows="6" onmouseover=\'this.focus()\' onfocus=\'this.select()\'>'+allText+'</textarea></tr></td>';
	enabling.innerHTML = '<h3>图片代码</h3><table class="BatchList" cellspacing="0">'+allText+outText+'</table>';

	document.getElementById('batch-editor').parentNode.insertBefore(enabling, document.getElementById('batch-editor'));
}
