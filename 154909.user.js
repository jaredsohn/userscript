// ==UserScript==
// @name         Just look at the pictures
// @description   只看图片
// @auther		s896221565
// @auther		http://896221565.qzone.qq.com
// @version	0.0.1
// @include        *
// ==/UserScript==


javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images[i].src)==-1){outText+='<tr><td><img%20src='+document.images[i].src+'%20/></td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}
