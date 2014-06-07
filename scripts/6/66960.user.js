// ==UserScript==
// @name		Anti-anarchy mod
// @include		http://leprosorium.ru/
// @include		http://leprosorium.ru/pages/*
// @include		http://leprosorium.ru/my/*
// @include		http://*.leprosorium.ru/
// @include		http://*.leprosorium.ru/pages/*
// @include		http://*.leprosorium.ru/my/*
// @include		http://www.*.leprosorium.ru/
// @include		http://www.*.leprosorium.ru/pages/*
// @include		http://leprosorium.ru/users/*/posts/
// @include		http://www.leprosorium.ru/users/*/posts/
// @exclude		http://leprosorium.ru/users/*/comments/
// @exclude		http://www.leprosorium.ru/users/*/comments/
// ==/UserScript==
var maxPostHeight = 400; //Максимальная высота поста в пикселях
var noImageDuplicates = false; //Убирать ли из постов повторяющиеся картинки
var noWideImages = false; //Ограничивать ли максимальную ширину картинки
var maxImageWidth = 800; //Максимальная ширина картинки в пикселях
var addScroll = false; //Добавлять ли скролл. Если нет, то превышающий высоту кусок поста будет просто невидим
var hoverTimeout = 1000; //Cекунду держим мышь на мистере Фредриксене и он сам догадывается развернуть пост

var hoverId = "";
var hoverElement = null;
var hoverTimer = null;

function hoverOn(id, element) {
  hoverId=id;
  hoverElement=element;
  hoverTimer = setTimeout("document.getElementById(\""+hoverId+"\").childNodes[1].style.maxHeight=\"none\"; hoverElement.parentNode.style.display=\"none\";hoverOff()",hoverTimeout);
}

function hoverOff() {
  clearTimeout(hoverTimer);
}
 
function getInnerDiv(element) {
	var idivs = element.getElementsByTagName("div");
	return element.childNodes[1];
	
}
var divs = document.getElementsByTagName("div");

var divslen = divs.length;



for(var i = 0; i < divslen; i++) {
	comment = divs[i];
	if(comment.className.indexOf("post") != -1) {
		var innerDiv = getInnerDiv(comment);
		if(innerDiv!=null) {
			if (noImageDuplicates) {
				var imageHrefs = new Array();
				var images = innerDiv.getElementsByTagName("img");
				for(var j=0; j<images.length;j++) {					
					if (imageHrefs[images[j].src]!='undefined') {
						imageHrefs[images[j].src]='ok';
					} else {
						
						images[j].style.display='none';
					}
				}
			}
			if (noWideImages) {				
				var images = innerDiv.getElementsByTagName("img");
				for(var j=0; j<images.length;j++) {					
					images[j].style.maxWidth=maxImageWidth+"px";
					images[j].addEventListener ("mouseover",function() {this.style.maxWidth='none'},false);
					images[j].addEventListener ("mouseout",function() {this.style.maxWidth=maxImageWidth+"px"},false);
				}
			}
			if (innerDiv.offsetHeight>maxPostHeight) {
				innerDiv.style.maxHeight=(maxPostHeight-80)+"px";
                                if(addScroll) {
				   innerDiv.style.overflow='auto';
                                } else 
                                { 
                                   innerDiv.style.overflow='hidden';
                                }
				comment.childNodes[3].innerHTML="<div style='display:block; position:relative; z-index:20;'><a style='display:block; width:500px; height:75px; margin:5px 0 0 -85px; padding-left:84px; background:url(http://pit.dirty.ru/lepro/553/2010/02/19/5275-181454-88651cebe35b2a678fedee9ba36bc158.png) no-repeat top left; text-decoration:none !important;' href=# onMouseOut='hoverOff();' onMouseOver='hoverOn(\""+comment.id+"\", this);' onClick='document.getElementById(\""+comment.id+"\").childNodes[1].style.maxHeight=\"none\"; this.parentNode.style.display=\"none\"; return false;'><span style='display:block; padding-top:25px;'>Мистер Фредриксен какбы намекает, что этот пост <br/>не поместился в отведенные для него "+maxPostHeight+" пикселей.</span></a></div>"+comment.childNodes[3].innerHTML;
				
			} else {
				innerDiv.style.maxHeight="none";				
			}
		}
		
	}
}