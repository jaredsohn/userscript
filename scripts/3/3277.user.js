
// ==UserScript==
// @name	baiduMp3ShowDownloadUrl
// @namespace	http://qxo.blogspot.com
// @description	show baidu mp3 download url,so you download it directly:-)
// @include	http://mp3.baidu.com/m?*
// ==/UserScript==

/*
function findSourceUri(title){//find source url
	if(!title){
		return null;
	}
	var re = new RegExp("请点击左键！来源网址：  (.*) 请参照百度权利声明使用");
  var arr = re.exec(title);
	return arr ? RegExp.$1 : null;
};
*/
//从文本中获取第一个url,不存在则返回空
function getSelectionLink(str){
		if(!str){
			return null;
		}
    const selection=str;     
    var  links = new Array();         
    const httpFixer=/^h.{2}p/i;
    const noprotFixer=/^([a-z]+[a-z\d]+\.[a-z\d\.]+\/)/i;   
    const m=selection.toString().match(
/\b(h.{2}p:\/\/|ftp:\/\/|mms:\/\/|rtsp:\/\/|[a-z]+[a-z\d]+\.[a-z\d\-\.]+\/)[^\s]*/gi);
    if(m) {
      for(var j=0, len=m.length; j<len; j++) {
        var href=m[j].replace(httpFixer,"http").replace(noprotFixer,"http://$1");
        if(href) {
          //links[links.length]=({href: href, description: m[j]});
          return href;
        }
      }
    }
    return null;
  }
  

//获取符合条件的记录对应的A元素对象集
var vd= document.evaluate("//html/body/div[1]/table[@class='list']/tbody/tr[*]/td[2]/a[1]", document, null, XPathResult.ANY_TYPE,null); 

//把集合vd对应的元素加入到数组arr,后面要在页面中动态加入A元素，所以经过此转换可以行！
var arr = new Array();
var iter =vd.iterateNext();
if(iter){
	arr.push(iter);
}
while(iter){	
  iter =vd.iterateNext();
  arr.push(iter);
}

for(var i=0 ; i < arr.length;i++){ //在每一记录块中加一直接下载A
	iter= arr[i];	
	if( !iter ){
		continue;
	}
	var tUrl = getSelectionLink(iter.title);
	if(tUrl){
		var aParent = iter.parentNode;
		if(aParent){
		var dObj = document.createElement("A");
		dObj.href=tUrl;	 
		dObj.innerHTML="D";
		dObj.title="Direct Download";
		aParent.appendChild(dObj);			
		//aParent.insertBefore(dObj,iter.nextSibling.nextSibling);
		}
	}
}