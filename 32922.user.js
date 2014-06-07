// ==UserScript==
// @name           Deviant ART get link
// @namespace      http://script.namdx1987.org/
// @description    This script will attempt to display all deviations and make the link to the deviation visible to the download manager
// @version        2.1.2.1
// @include        http://*.deviantart.com/
// @exclude        http://www.deviant.com/*
// @exclude        http://browse.deviant.com/*
// @exclude        http://st.deviant.com/*
// ==/UserScript==


window=unsafeWindow;
document=unsafeWindow.document;
var jQuery=window.jQuery;
var htmlSpace=/&nbsp;/g;


function randomImageSource()
{
	var i=parseInt(Math.random()*1000)%38+1;
	var r=parseInt(Math.random()*1000)%256;
	var g=parseInt(Math.random()*1000)%256;
	var b=parseInt(Math.random()*1000)%256;
	
	
	var rs=r.toString(16).toUpperCase();
	var gs=g.toString(16).toUpperCase();
	var bs=b.toString(16).toUpperCase();
	
	if(r<16)
		rs="0"+rs;
		
	if(g<16)
		gs="0"+gs;
		
	if(b<16)
		bs="0"+bs;
	
	
	return "http://www.ajaxload.info/download.php?img=cache/FF/FF/FF/"+rs+"/"+gs+"/"+bs+"/"+i+"-1.gif";
}

var gimg=new Image();
gimg.src=randomImageSource();


var simg=new Image();
simg.src=randomImageSource();

function createBlock(title, iconNo)
{
	var current;
	var result;
	result=document.createElement("div");
	current=result;
	current.setAttribute("class","gr-box gr-genericbox");
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr1");
			current=current.appendChild(document.createElement("i"));
			current=current.parentNode;
		current=current.parentNode;
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr2");
			current=current.appendChild(document.createElement("i"));
			current=current.parentNode;
		current=current.parentNode;
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr3");
			current=current.appendChild(document.createElement("i"));
			current=current.parentNode;
		current=current.parentNode;
		current=current.appendChild(document.createElement("div"));
		current.setAttribute("class","gr-top");
			current=current.appendChild(document.createElement("i"));
			current.setAttribute("class","tri");
			current=current.parentNode;
			current=current.appendChild(document.createElement("div"));
			current.setAttribute("class","gr");
				current=current.appendChild(document.createElement("h2"));
					current=current.appendChild(document.createElement("i"));
					current.setAttribute("class","icon i"+iconNo);
					current=current.parentNode;
				current.appendChild(document.createTextNode(title));
				current=current.parentNode;
			current=current.parentNode;
		current=current.parentNode;
		current=current.appendChild(document.createElement("div"));
		current.setAttribute("class","gr-body");
			current=current.appendChild(document.createElement("div"));
			current.setAttribute("class","gr");
				current=current.appendChild(document.createElement("div"));
				current.setAttribute("class","stream");
				
				result.sub=current;
				result.sub.style.minHeight="50px";
				result.sub.style.padding="20px"
				
				current=current.parentNode;
			current=current.parentNode;
		current=current.parentNode;
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr3 gb");
		current=current.parentNode;
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr2 gb");
		current=current.parentNode;
		current=current.appendChild(document.createElement("i"));
		current.setAttribute("class","gr1 gb gb1");
		current=current.parentNode;
	return result;
}


function createRawBlock(id, title, url, tooltip, category, category_url, catstring, img_url, thumb_src, w, h)
{
	var current;
	var result;
	result=document.createElement("div");
	current=result;
	current.setAttribute("collect_rid","1:"+id);
	current.setAttribute("class","tt-a");
		current=current.appendChild(document.createElement("span"));
		current.setAttribute("class","tt-w");
			current=current.appendChild(document.createElement("span"));
			//current.setAttribute("style","background-image: url(http://sh.deviantart.net/shadow/x/150/150/logo3.png);");
			current.setAttribute("class","shadow");
				current=current.appendChild(document.createElement("a"));
				
				current.setAttribute("title",tooltip+catstring.replace(htmlSpace, " "));
				
				
				current.setAttribute("href",img_url);
					current=current.appendChild(document.createElement("i"));
					current=current.parentNode;
					current=current.appendChild(document.createElement("img"));
					current.setAttribute("width", w);
					current.setAttribute("height", h);
					current.setAttribute("src",thumb_src);
					current=current.parentNode;
				current=current.parentNode;
			current=current.parentNode;
			current=current.appendChild(document.createElement("a"));
			current.setAttribute("title",tooltip);
			current.setAttribute("href",url);
			current.setAttribute("class","t");
			current.appendChild(document.createTextNode(title));
			current=current.parentNode;
			current=current.appendChild(document.createElement("br"));
			current=current.parentNode;
			current=current.appendChild(document.createElement("small"));
			current.appendChild(document.createTextNode(" in "));
				current=current.appendChild(document.createElement("a"));
				current.setAttribute("href",category_url);
				current.setAttribute("title",tooltip);
				current.appendChild(document.createTextNode(category));
				current=current.parentNode;
			current=current.parentNode;
		current=current.parentNode;
	return result;
}

function createDeviationBlock(deviationInfo)
{	
	return createRawBlock(deviationInfo.id, deviationInfo.title, deviationInfo.url, deviationInfo.tooltip, deviationInfo.category, deviationInfo.category_url, deviationInfo.catstring, deviationInfo.image.url, deviationInfo.thumb150.src, deviationInfo.thumb150.width, deviationInfo.thumb150.height);
}
var deviant={
	name: null,
	numberOfDeviations: null,
	numberOfScraps: null,
	numberOfFavourites: null,
	galleryZone: null,
	scrapsZone: null
}

deviant.getInfo=function()
{
	deviant.name=window.location.href.match(/\/\/([-\w]+)\.deviantart/)[1];
	var infoDiv=document.getElementById("super-secret-stats");
	
	deviant.numberOfDeviations=parseInt(infoDiv.textContent.match(/\s*(\d+)\s*deviations?/i)[1]);
	deviant.numberOfScraps=parseInt(infoDiv.textContent.match(/\s*(\d+)\s*scraps?/i)[1]);
	deviant.numberOfFavourites=parseInt(infoDiv.textContent.match(/\s*(\d+)\s*favourites?/i)[1]);
}

deviant.prepareGallery=function()
{
	var insertPlace=jQuery(".mods-hh")[0];
	var wrapDiv=document.createElement('div');
	wrapDiv.style.paddingLeft='16px';
	wrapDiv.style.paddingRight='16px';
	
	insertPlace.insertBefore(wrapDiv, insertPlace.firstChild)
	var galleryBlock=createBlock("Gallery", 22);
	var scrapsBlock=createBlock("Scraps", 2);
	
	deviant.galleryZone=galleryBlock.sub;
	deviant.scrapsZone=scrapsBlock.sub;
	
	
	var img;
	if (deviant.numberOfDeviations > 0) {
		wrapDiv.appendChild(galleryBlock);
		deviant.galleryZone.appendChild(gimg);
	}	
	if (deviant.numberOfScraps > 0) {
		wrapDiv.appendChild(scrapsBlock);
		deviant.scrapsZone.appendChild(simg);
	}
}

deviant.request=function()
{
	var i;
	var loop;
	var head="global/difi.php?";
	var pieces;
	var link;
	if(deviant.numberOfDeviations>0)
	{
		pieces=[];
		loop=Math.ceil(deviant.numberOfDeviations/24);
		for(i=0;i<loop;i++)
		{
			pieces.push("c[]=Stream;thumbs;gallery:"+deviant.name+","+i*24+",24");
		}
		
		pieces.push("t=json");
		
		link=head+pieces.join("&");
		jQuery.getJSON(link, function(data){

				deviant.galleryZone.textContent = "";
				if (data) {
					var calls = data.DiFi.response.calls;
					for (var i = 0; i < calls.length; i++) {
						var deviations = calls[i].response.content.deviations;
						for (var j = 0; j < deviations.length; j++) {
							try {
								deviant.galleryZone.appendChild(createDeviationBlock(deviations[j]));
							}
							catch(exc)
							{
								
							}
						}
					}
				}
					
		});
	}
	if(deviant.numberOfScraps>0)
	{
		pieces=[];
		loop=Math.ceil(deviant.numberOfScraps/24);
		for(i=0;i<loop;i++)
		{
			pieces.push("c[]=Stream;thumbs;gallery:"+deviant.name+" sort:time in:scraps,"+i*24+",24");
		}
		
		pieces.push("t=json");
		
		link=head+pieces.join("&");
		jQuery.getJSON(link, function(data){
			deviant.scrapsZone.textContent="";
			if(data)
			{
				var calls=data.DiFi.response.calls;
				for(var i=0;i<calls.length;i++)
				{
					var deviations=calls[i].response.content.deviations;
					for(var j=0;j<deviations.length;j++)
					{
						try {
							deviant.scrapsZone.appendChild(createDeviationBlock(deviations[j]));
						}
						catch(exc)
						{
							
						}
					}
				}	
			}
		});
	}
}


deviant.getInfo();
deviant.prepareGallery();
deviant.request();