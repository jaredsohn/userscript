// ==UserScript== 
// @name kenburnscat
// @namespace none 
// @description It can hightlight your favoriate IDs on clubcat forums. It can be used on other web forums with minor modifications. 它可以加亮你关注的凯迪ID. 此脚本也可以稍加修改后用于别的论坛。  
// @include * 
// @version 1.0.0.0
// @homepage http://userscripts.org/scripts/show/28468


// Important: If you wish to modify this script, please do not forget 
// to link to my homepage. 






(function() { 
var  rawid= [], highlightedid = [];


// configuration
// hereby you can replace cat's id with some html code




function highlight(hashtable1) { 
  for(var key in hashtable1) { 

    rawid.push(new RegExp(key, "gi")); 

    highlightedid.push(hashtable1[key]); 
  } 

} 


highlight( {"loonie":"<b>loonie</b><img src='http://upfile.cat898.com/UploadFile/2008-6/20086151125340.png' border='0' />"} ); 



// replace the html code in list of posts

var title1= document.title; 
if(title1!=null) 
{
 if(title1.indexOf("帖子列表")!=-1) 
	{

	var str1= document.body.innerHTML; 

	  for (var i = 0; i < rawid.length; i++) { 
	    str1 = str1.replace(rawid[i], highlightedid[i]);
	  } 

	document.body.innerHTML= str1;  
	}
}

})();
