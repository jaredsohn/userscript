// --------------------------------------------------------
// ==UserScript==
// @name loveplanet.ru gallery viewer
// @namespace b
// @version 2.101
// @source
// @description  Просмотр loveplanet.ru (включая интим) без регистрации и других заморочек - просто нажми на фото. Не работает если в галерее нет ни одной не интим фотографии.
// @include http://loveplanet.ru/a-search/*
// @include http://loveplanet.ru/a-folders/*
// @include http://loveplanet.ru/a-look/*
// @include http://loveplanet.ru/a-showalbum/*
// @include http://loveplanet.ru/a-photo/*
// @include http://loveplanet.ru/a-albest/*
// @include http://loveplanet.ru/a-altype/*
// ==/UserScript==

var reg_m=/m_img/;
var reg_s=/s_img/;
var reg_t=/t_img/;
var reg_g1=/a-authorize\/login-/;
var reg_g2=/a-alin\/login-/;
var small = "s_img";
var medium = "m_img";
var thumb = "t_img";
var full = "b_img";
var defimg = "default_i_";
var defalb = "default_al_";
var gallery1 = "a-authorize/login-";
var gallery2 = "a-alin/login-";
var linktemplate;
var img = document.getElementsByTagName('img');
var links = document.getElementsByTagName('a');
var skipped = new  Array();
var counter = 0;
for(var i=0;i<img.length;i++) 
{
	var imgsource = img[i].src;
	if ((imgsource.indexOf(defalb) != -1) || (imgsource.indexOf(defimg) != -1) || (imgsource.indexOf('foto') != -1  && ((imgsource.indexOf(small) != -1 || imgsource.indexOf(medium) != -1)  || imgsource.indexOf(thumb) != -1))) 
	{	
		if(img[i].parentNode!=null && img[i].parentNode.parentNode!=null && img[i].parentNode.parentNode.children.length == 1 )
			img[i].parentNode.href = replacement(img[i]);				
	}

}
for(var j = 0; j<skipped.length && linktemplate!=null; j++)
{
		var url = skipped[j].src;	
		url = url.substring(url.lastIndexOf("/")+1);
		if(url =="")
			url = "1";
		skipped[j].src = linktemplate + medium + url+".jpg";
		skipped[j].parentNode.href = 	linktemplate + full + url+".jpg";
		
}
for(var i=0;i<links.length;i++) 
{
	if(links[i].href.indexOf(gallery1)!=-1)
		links[i].href=links[i].href.replace(reg_g1,"a-photo/login-");
	if(links[i].href.indexOf(gallery2)!=-1)
	{		
		links[i].href=links[i].href.replace(reg_g2,"a-photo/login-");
	}
}

function replacement(node)
{
	var linkurl;
	var result = node.src;
	if(node.parentNode.href!=null)
		 linkurl = node.parentNode.href;
	
	if(result.indexOf(defimg)!=-1)
	{
		if(linktemplate!=null)
		{
			node.src =  linktemplate + medium + linkurl.substring(linkurl.lastIndexOf("#")+1)+".jpg";
			return  linktemplate + full + linkurl.substring(linkurl.lastIndexOf("#")+1)+".jpg";
		}
		else
		{
			node.src = "/"+ linkurl.substring(linkurl.lastIndexOf("#")+1);
			skipped[counter++] = node;
			return result;
		}
	}	
	
	if(result.indexOf(defalb)!=-1 && linktemplate!=null)
	{
			for(var i=2; i<20; i++)
			{
					var inlink = document.createElement('a');
					var insight = document.createElement('img');
					insight.src = linktemplate +"a"+ linkurl.substring(linkurl.lastIndexOf("-")+1)+ medium + i +".jpg";
					inlink.href =  linktemplate +"a"+ linkurl.substring(linkurl.lastIndexOf("-")+1)+ full + i +".jpg";	
					inlink.appendChild(insight);
					node.parentNode.parentNode.appendChild(inlink);			
			}
			node.src =  linktemplate +"a"+ linkurl.substring(linkurl.lastIndexOf("-")+1)+ medium + 1 +".jpg";
			return  linktemplate +"a"+ linkurl.substring(linkurl.lastIndexOf("-")+1)+ full + 1 +".jpg"
	}	

	if(result.indexOf(thumb) != -1)
		return  result.replace(reg_t, full);
		
	if(result.indexOf(small) != -1)
		result = result.replace(reg_s, full);
		
	if(result.indexOf(medium) != -1)
		result = result.replace(reg_m, full);			
		
	if(linkurl!=null && linkurl.indexOf("/foto-")!=-1 && result.indexOf(defimg)==-1)
		linktemplate = result.substring(0,result.lastIndexOf("/")+1);	
	
	return result;
};

