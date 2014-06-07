// ==UserScript==
// @name           Stalkeador Intenso
// @namespace      openminded
// @description    Check blogs without leaving the Dashboard and also show enhanced pictures of Tumblr users
// @include        http*://www.tumblr.com/*
// @author         Adrian Sanchez openmindeo.tumblr.com
// @version        2.0.3
// ==/UserScript==

//***********************************************************************************
//      This program is free software: you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation, either version 3 of the License, or
//      (at your option) any later version.
//
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//
//      You should have received a copy of the GNU General Public License
//      along with this program.  If not, see http://www.gnu.org/licenses/gpl-3.0.html
//***********************************************************************************
function getElementsByClass(clase, elemento){
	var elementos = new Array();
	var a=0;
	var htmlTags = new Array();
	var htmlTags= elemento.getElementsByTagName('*');
	for(var i=0; i<htmlTags.length; i++){
		if(htmlTags[i].className == clase){
			elementos[a] = htmlTags[i];
			a++;
		}
	}
	return elementos;
}

function beautify(urlBlog){
	if(urlBlog.charAt(urlBlog.length-1)==="/")
		return urlBlog+ "api/read";
	else return urlBlog + "/api/read";
}

function loadInfo(url, page) {
	console.log(url);
	document.getElementById("si_loadingGif").style.display="block";
	var postNum =  parseInt(localStorage["_stalkeadorIntenso_postPerPage"]);
	var start = page*postNum;
	var params = "start="+start+"&num="+postNum;
	document.getElementById("blog_holder").scrollTop=0;
	pageController(document.getElementById("blog_holder"), url, page);
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url+"?"+params,
	  onload: function(response) {
		document.getElementById("si_loadingGif").style.display="none";
		if (!response.responseXML) {
		  var blogInfo = document.createElement("div");
		  blogInfo.id = "blog_info";
		  blogInfo.setAttribute("style","text-align:center; background-color:#2C4762; opacity:0.95; z-index:99;");

		  var xmlDoc = new DOMParser().parseFromString(response.responseText, "application/xml");
		  var tumblelog = xmlDoc.getElementsByTagName("tumblelog")[0];
		  var cantPosts = xmlDoc.getElementsByTagName("posts")[0];
		  var cantPostsDiv = document.createElement("div");
		  cantPostsDiv.innerHTML = "<b>PAGE: </b>"+(page+1);
		  cantPostsDiv.innerHTML += "<br/><b>POSTS: </b>"+cantPosts.getAttribute("total");
		  cantPostsDiv.innerHTML += "&nbsp;&nbsp;<b>NAME:</b> "+tumblelog.getAttribute("name")+"&nbsp;&nbsp;<br/><b>TIMEZONE:</b> "+tumblelog.getAttribute("timezone")+"<br/> <b>BLOG TITLE:</b> "+tumblelog.getAttribute("title");
		  cantPostsDiv.setAttribute("style","width:80%; padding:20px; font-size:12px; text-align:justify; -moz-border-radius:8px; -webkit-border-radius:8px; background-color:#fff; margin:0px 25px 25px;");
		  var tumblelogInfo = document.createElement("div");
		  tumblelogInfo.innerHTML += tumblelog.textContent;
		  tumblelogInfo.setAttribute("style","width:80%; padding:20px; font-size:10px; text-align:justify; background-color:#fff; -moz-border-radius:8px; -webkit-border-radius:8px; margin:30px 25px;");
		  var scriptsInside = tumblelogInfo.getElementsByTagName("script");   
		   for(var i=0;i<scriptsInside.length;i++){
			   try{eval(scriptsInside[i].text); }catch(err){}
		   }
		  blogInfo.appendChild(cantPostsDiv);
		  blogInfo.appendChild(tumblelogInfo);
		  var posts = xmlDoc.getElementsByTagName("post");
		  for(var i=0; i<posts.length; i++){
				var bottom = (i==(posts.length-1))?"margin-bottom: 0px":"margin-bottom: 25px";
				 
				var postDiv = document.createElement("div");
				postDiv.setAttribute("style","overflow: hidden; width:80%; outline:10px; padding:20px; font-size:10px; text-align:right; -moz-border-radius:8px; -webkit-border-radius:8px; background-color:#fff; margin-top:25px; margin-left:25px; margin-right:30px; "+bottom+";");
				var postElem = posts[i];
				postDiv.innerHTML += "<a href=\""+postElem.getAttribute("url")+"\" target=\"_blank\">"+postElem.getAttribute("date")+"</a>";
				postDiv.innerHTML += "<br/><span style=\"font-size:12px;font-weight:bold;margin-left:-200px;\">POST TYPE: "+postElem.getAttribute("type")+"</span>";
				
				var postElems = postElem.getElementsByTagName("*");
				for(var j=0; j<postElems.length; j++){
					var childElem = postElems[j];
					var tagName = childElem.tagName;

					var childDiv = document.createElement("div");
					var tC = childElem.textContent;
					
					if(childElem.tagName.toLowerCase() === "photo-url" && childElem.getAttribute("max-width") === "1280"){
						if(childElem.parentNode.getAttribute("offset")!=="o1"){
							childDiv.setAttribute("style","text-align:center;");
							childDiv.innerHTML = "<br/><a target=\"_blank\" href=\""+tC+"\"><img src=\""+tC+"\" width=\"300px\"/></a>";
						}
					}else if(childElem.tagName.toLowerCase() === "photo-caption"){
						childDiv.setAttribute("style","margin-left:10px; text-align:justify; font-weight:normal; font-size:12px;");
						childDiv.innerHTML = tC;
					}else if((childElem.tagName.toLowerCase() === "audio-caption")||(childElem.tagName.toLowerCase() === "video-caption")||(childElem.tagName.toLowerCase() === "regular-body")){
						childDiv.innerHTML = tC.replace(/\r\n\r\n/g, '');
						childDiv.setAttribute("style","margin-left:20px; text-align:justify; font-weight:normal; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "quote-text"){
						childDiv.innerHTML = tC;
						childDiv.setAttribute("style","margin-left:10px; font-style:italic; text-align:justify; font-weight:normal; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "quote-source"){
						childDiv.innerHTML = "-"+tC;
						childDiv.setAttribute("style","font-style:italic; text-align:justify; margin-left:10px; font-weight:bold; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "link-url"){
						childDiv.innerHTML = "<a target=\"_blank\" href=\""+tC+"\">"+tC+"</a>";
						childDiv.setAttribute("style","font-style:italic; text-align:justify; margin-left:10px; font-weight:bold; font-size:12px;");
					}else if((childElem.tagName.toLowerCase() === "audio-player")||(childElem.tagName.toLowerCase() === "video-player" && !childElem.getAttribute("max-width"))){
						childDiv.innerHTML = tC;
						childDiv.setAttribute("style","text-align:center; background-color:#000;");
					}else if((childElem.tagName.toLowerCase() === "regular-title")||(childElem.tagName.toLowerCase() === "link-text")){
						childDiv.innerHTML = tC;
						childDiv.setAttribute("style","text-align:left; font-weight:bold; font-size:14px; text-decoration:underline;");
					}else if(childElem.tagName.toLowerCase() === "question"){
						childDiv.innerHTML = "<span style=\"margin-left:-10px; font-size:14px;font-weight:bold;\">QUESTION: </span><br/>"+tC;
						childDiv.setAttribute("style","margin-left:10px; text-align:justify; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "answer"){
						childDiv.innerHTML = "<br/><span style=\"margin-left:-10px; font-size:14px;font-weight:bold;\">ANSWER: </span>"+tC;
						childDiv.setAttribute("style","margin-left:10px; text-align:justify; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "conversation"){
						var line = childElem.getElementsByTagName("line");
						for(var k=0; k<line.length; k++){
							var lineText = line[k].textContent;
							var label = line[k].getAttribute("label");
							label=label?label:"";
							childDiv.setAttribute("style","text-align:left;");
							childDiv.innerHTML += "<span style=\"font-size:12px;font-weight:bold;\">"+label+"</span>"+lineText+"<br/>";
						}
						childDiv.setAttribute("style","margin-left:10px; text-align:justify; font-size:12px;");
					}else if(childElem.tagName.toLowerCase() === "tag"){
						childDiv.innerHTML = "<a target=\"_blank\" href=\"http://"+tumblelog.getAttribute("name")+".tumblr.com/tagged/"+tC+"\">#"+tC+"</a>&nbsp;&nbsp;";
						childDiv.setAttribute("style","display: inline-block; text-align:left; font-weight:normal; font-size:10px; color:#aaa;");
					}

					postDiv.appendChild(childDiv);
				}
				blogInfo.appendChild(postDiv);
		  }
		  var blogHolder = document.getElementById("blog_holder");
	      blogHolder.appendChild(blogInfo);
		}
	  }
	});

}

function pageController(blogInfo, url, page){
	destroyElement("botonera");
	destroyElement("blog_info");
	var style = "display:inline-block; font-size:12px; padding:3px; text-align:left; background-color:#DAEBF2; cursor:pointer; border-style:solid; border-width:2px; border-color:#1A5870; -moz-border-radius:8px; -webkit-border-radius:8px;";
	var buttons = document.createElement("div");
	buttons.id="botonera";
	if(blogInfo.id==="result_avatar"){
		buttons.setAttribute("style","text-align:right; opacity:0.8; position:relative; top:0px; left:0px; z-index:100; width:530px;");
	}else{
		buttons.setAttribute("style","text-align:right; opacity:0.8; position:relative; top:0px; left:0px; z-index:100; width:530px;");
	}
	if(url){
		  if(page>0){
			  var prevPage = document.createElement("div");
			  prevPage.innerHTML = "<< PREV PAGE";
			  prevPage.setAttribute("style",style);
			  prevPage.setAttribute("class","generic");
			  prevPage.addEventListener("click", function(){
					loadInfo(url,page-1);
			  }, false);
			  buttons.appendChild(prevPage);
			  buttons.style.left="0px";
		  }
			  
		  var nextPage = document.createElement("div");
		  nextPage.innerHTML = "NEXT PAGE >>";
		  nextPage.setAttribute("style",style);
		  nextPage.addEventListener("click", function(){
			  loadInfo(url,page+1);
		  }, false);
		  buttons.appendChild(nextPage);
		}
		 
		  var close = document.createElement("div");
		  close.innerHTML = "CLOSE";
		  close.setAttribute("style",style);
		  close.addEventListener("click", function(){
				document.getElementById("blog_holder").style.display="none";
				document.getElementById("result_avatar").style.display="none";
		  }, false);
		  buttons.appendChild(close);
	  blogInfo.appendChild(buttons);
}

function loadImage(url) {
	destroyElement("avatarS");
	var imageSrc = document.createElement("img");
	imageSrc.setAttribute("src",url);
	imageSrc.setAttribute("style","width:100%;");
	imageSrc.id = "avatarS";
	var imageBox = document.getElementById("result_avatar");
	imageBox.appendChild(imageSrc);
	imageBox.style.display="block";
}

function loadTodo(urlPic, urlBlog){
	document.getElementById("blog_holder").style.display="block";
	if(localStorage["_stalkeadorIntenso_checkPhoto"]=="true"){
		document.getElementById("result_avatar").style.width="128px";
		loadImage(urlPic);
	}	
	if(localStorage["_stalkeadorIntenso_checkInfo"]=="true"){
		loadInfo(urlBlog,0);
	}else{
		document.getElementById("si_loadingGif").style.display="none";
		pageController(document.getElementById("result_avatar"), null, null);
	}
}

function createImgBox(){
	var avatarDiv = document.createElement("div");
	avatarDiv.setAttribute("style","display:none; position:absolute; float:right; border-style:solid; border-width:5px; border-color:#21364A; left:165px; top:125px; z-index:99;-moz-border-radius:7px; -webkit-border-radius:7px; width:128px; background-color:#ddd; text-align:justify; z-index:100;");
	avatarDiv.id = "result_avatar";
	avatarDiv.addEventListener("click", function(){
		if(document.getElementById("result_avatar").style.width=="512px"){
			document.getElementById("result_avatar").style.width="128px";
		}else{
			document.getElementById("result_avatar").style.width="512px";
		}
	}, false);
	var clickmsg = document.createElement("span");
	clickmsg.innerHTML = "Click picture to enlarge";
	clickmsg.setAttribute("style","opacity:0.7; font-weight:normal; font-size:9px;");
	avatarDiv.appendChild(clickmsg);
	document.getElementById("blog_holder").parentNode.insertBefore(avatarDiv,document.getElementById("blog_holder"));
}

function createBlogBox(){
	var blogDiv = document.createElement("div");
	blogDiv.setAttribute("style","background-color:#2C4762; display:none; position:absolute; float:right; border-style:solid; border-width:5px; border-color:#21364A; left:275px; top:125px; z-index:99;-moz-border-radius:7px; -webkit-border-radius:7px; width:550px; height: 550px; overflow:scroll; z-index:98;");
	blogDiv.id = "blog_holder";
	var loadingGif = document.createElement("img");
	loadingGif.setAttribute("src","http://media.tumblr.com/tumblr_ltol2rpeAN1qzkqhi.gif");
	loadingGif.setAttribute("style","width:150px; margin-left:185px; margin-top:150px;");
	loadingGif.id="si_loadingGif";
	blogDiv.appendChild(loadingGif);
	var header = document.getElementById("container");
	header.appendChild(blogDiv);
}

function createSearchBox(){

	var rightColumn = document.getElementById("right_column");
	
	var newUl = document.createElement("ul");
	newUl.innerHTML="<span style='font-family:Arial, Helvetica, sans-serif;font-weight:bold;font-size:12px;'>&nbsp;&nbsp;Stalk Tumblelog:</span>";
	newUl.setAttribute("class","controls_section");
	newUl.setAttribute("style","height:50px;padding:15px;");
	var newLi = document.createElement("li");
	var newDiv = document.createElement("div");

	var newInput = document.createElement("input");
	newInput.setAttribute("type","text");
	newInput.setAttribute("value","");
	newInput.setAttribute("style","margin-left:5px;");
	newInput.id = "search_avatar";
	newInput.addEventListener("keydown", searchAvatar, false);
	
	newUl.appendChild(newLi);
	newDiv.appendChild(newInput);
	newUl.appendChild(newDiv);

	rightColumn.appendChild(newUl);
}

function searchAvatar(e) {
  var keyCode = e.keyCode;
  if(keyCode==13) {
	var input = document.getElementById("search_avatar");
	var blog = input.value;
	var urlPic="http://api.tumblr.com/v2/blog/"+blog+".tumblr.com/avatar/512";
	var urlBlog ="http://"+blog+".tumblr.com/api/read";
	loadTodo(urlPic, urlBlog);
  }
}

function destroyElement(chao){
	var  element = document.getElementById(chao);
	if(element!=null)
		element.parentNode.removeChild(element);
}


function publishBigPhoto(image, blog, x, y, type){
	var size = "_512.png";
	if(image.substring(50,53)=="gif")
		size = "_128.gif";
	image = image.substring(0,(logPag?74:46))+size;

	var newLink = document.createElement("img");
	newLink.setAttribute("class","lensIcon"+type);
	newLink.name=image;
	var style = "float:left; margin-top:"+y+"px; margin-left:"+x+"px; z-index:100; opacity:0.8; background-color:#fff; border-width:2px; border-style:solid; border-color:#fff; -moz-border-radius:3px; -webkit-border-radius:3px; ";
	if(type=='Crushes')
		style = "position:absolute; margin-top:"+y+"px; margin-left:"+x+"px; z-index:100; opacity:0.8; background-color:#fff; border-width:2px; border-style:solid; border-color:#fff; -moz-border-radius:3px; -webkit-border-radius:3px; ";
	newLink.setAttribute("style",style);
	newLink.setAttribute("src","http://i.imgur.com/zgsi8.png");

	newLink.addEventListener("click", function(event){
		loadTodo(event.target.getAttribute('name'), blog);
	}, false);
	return newLink;
}

function reDo(){
	var htmlTags = new Array();
	var htmlTags=document.getElementsByTagName('*');
	for (var i=0; i<htmlTags.length; i++) {
		if(htmlTags[i].className=="lensIconPosts"){
			htmlTags[i].parentNode.removeChild(htmlTags[i]);
		}
	}
}

function putInRadar(){
	var radar = document.getElementById('radar_attribution');
	if(radar != null){
		var blog = getElementsByClass("username",radar)[0].innerHTML;
		var avatarImg = radar.getElementsByTagName('img')[0];
		var urlBlog = "http://"+blog+".tumblr.com/api/read";
		var newLink = publishBigPhoto(avatarImg.src, urlBlog, -60, 0, 'Radar');
		avatarImg.parentNode.parentNode.insertBefore(newLink,avatarImg.parentNode.nextSibling);
	}

}
function putInCrushes(){
	var crushesList = document.getElementById('crushes');
	if(crushesList != null){
		var crushItems = crushesList.getElementsByTagName('a');
		for(var i=0; i<crushItems.length; i++){
			if(crushItems[i].id.indexOf('crush')!=-1){
				var x = 0;
				var y = 0;
				var j=i+1;
				if(j%3==0){
					x=-15;
				}else if(j%3==1){
					x=-160;
				}else if(j%3==2){
					x=-90;
				}

				if((i>=0) && i<3)
					y=50;
				if((i>=3) && i<6)
					y=120;
				if((i>=6) && i<9)
					y=190;

				var blog = crushItems[i].getAttribute("href")+"api/read";
				var avatarImg = crushItems[i].style.backgroundImage.substring(crushItems[i].style.backgroundImage.indexOf("http:"),59);
				var newLink = publishBigPhoto(avatarImg, blog, x, y, 'Crushes');
				crushItems[i].parentNode.insertBefore(newLink,crushItems[i].nextSibling);
			}
		}
	}
}

function putInRecommended(){
	var recommendedList = document.getElementById(logPag?'tag_editors':'recommended_tumblelogs');
	if(recommendedList){
		var recommendedItems = recommendedList.getElementsByTagName('li');
		
		for(var i=0; i<recommendedItems.length; i++){
			var blog = "";
			console.log(recommendedItems.length);
			if(recommendedItems[i].className!="recessed"){
				var avatarImg = recommendedItems[i].style.backgroundImage.substring(recommendedItems[i].style.backgroundImage.indexOf(logPag?"https:":"http:"),(logPag?79:59))
				blog = getElementsByClass("blog",recommendedItems[i])[0].getAttribute("href");
				var urlBlog = blog+"api/read";
				var newLink = publishBigPhoto(avatarImg, urlBlog, 0, -15, 'Recommended');
				recommendedItems[i].parentNode.insertBefore(newLink,recommendedItems[i].nextSibling);
			}
		}
	}
}

function putInPosts() {
	reDo();
	var htmlTags = new Array();
	var htmlTags=document.getElementsByTagName('*');
	var createdAvatars = new Array();
	for (var i=0; i<htmlTags.length; i++) {
		var notif = (htmlTags[i].className=="avatar");
		var post = (htmlTags[i].className=="post_avatar");
		var subavatar = (htmlTags[i].className=="sub_avatar");
		if (post||subavatar||notif) {
			var bckStl = "";
			var x = y = 0;
			var blog = "";
			var urlBlog = "";
			var following = (document.URL.indexOf("following")!=-1);
			if(notif){
				if(following){
					
					urlBlog=htmlTags[i].getAttribute("href");
					console.log(htmlTags[i].getAttribute("href"));
					urlBlog=beautify(urlBlog);
					bckStl= htmlTags[i].style.backgroundImage.substring(htmlTags[i].style.backgroundImage.indexOf(logPag?"https:":"http:"),(logPag?79:59));
					x = 0;
					y = -15;
				}else{
					bckStl= htmlTags[i].src.substring(htmlTags[i].src.indexOf("http:"),59);
					var classNotes = (htmlTags[i].parentNode.parentNode.className.indexOf("note")!=-1);
					x = (classNotes)?-37:((document.URL.indexOf("followers")!=-1))?0:-80;
					urlBlog = beautify(htmlTags[i].parentNode.getAttribute("href"));
					y = 0;
				}
				
			}else{
				urlBlog=htmlTags[i].getAttribute("href");
				urlBlog=beautify(urlBlog);
				bckStl= htmlTags[i].style.backgroundImage.substring(htmlTags[i].style.backgroundImage.indexOf(logPag?"https:":"http:"),(logPag?79:59));
				x = (subavatar)?25:-10
				y = (subavatar)?0:-10;
			}
			
			var newLink = publishBigPhoto(bckStl, urlBlog, x, y, 'Posts');
			if(notif){
				htmlTags[i].parentNode.parentNode.insertBefore(newLink,htmlTags[i].parentNode.nextSibling);
			}else if(post||subavatar){
				htmlTags[i].parentNode.insertBefore(newLink,htmlTags[i].nextSibling);
			}

		}
	}
}

//FORM PARA CAMBIAR ALGUNOS PARAMETROS DEL SCRIPT
function agregarEstilo(){
	//AGREGAR ESTILO
	var header = document.getElementsByTagName("head")[0];
	if (!header) { setTimeout(crearBoton,100); }
	var newCss = document.createElement("style");
	newCss.setAttribute("type","text/css");
	var innHTML = "#header #stalker_button img {opacity: 0.5; width:24px; margin-top:8px;}";
	innHTML += "\n#header #stalker_button img:hover {opacity: 1;cursor:pointer;}";
	innHTML += "\n#blog_info p {margin:0;}";
	newCss.innerHTML = innHTML;
	header.appendChild(newCss);
}

function crearBoton(){
	//BOTON
	var newDiv = document.createElement("div");
	newDiv.id="stalker_button";
	newDiv.setAttribute("class","tab iconic");
	var settingsButton = document.createElement("img");
	settingsButton.setAttribute("src","http://i.imgur.com/w2mZC.png");
	settingsButton.addEventListener("click", abrirOpciones, false);
	newDiv.appendChild(settingsButton);
	var userTools = document.getElementById("user_tools");
	if(userTools){
		userTools.appendChild(newDiv);
		userTools.style.width=(parseInt(userTools.offsetWidth)+32)+"px";
	}
}

function abrirOpciones(){
	destroyElement("stalkeadorSettings");
	var newDiv = document.createElement("div");
	newDiv.id="stalkeadorSettings";
	newDiv.setAttribute("style","float:right;border-style:solid; background-color:#F0F8FF; opacity:0.9; border-width:5px; border-color:#21364A; margin-left:300px; margin-top:200px; padding:20px; position:fixed; z-index:99;-moz-border-radius:7px; -webkit-border-radius:7px;");
	var tab = document.createElement('table');
	var tbo = document.createElement('tbody');
	tbo.innerHTML = "<tr><td colspan=\"2\" style=\"font-size:16px; font-weight:bold;\"><a target=\"_blank\" href=\"http://openmindeo.tumblr.com\">STALKEADOR INTENSO - SETTINGS</a></td></tr>";
	

	var trA = document.createElement('tr');
	var fieldNameA = document.createElement('td');
	fieldNameA.innerHTML = "Post per page: ";
	var fieldInputA = document.createElement('td');
	var inputPosts = document.createElement("input");
	inputPosts.setAttribute("type","text");
	inputPosts.setAttribute("value",localStorage["_stalkeadorIntenso_postPerPage"]);
	inputPosts.setAttribute("style","margin-left:5px;");
	inputPosts.id = "postsPerPage";
	fieldInputA.appendChild(inputPosts);
	trA.appendChild(fieldNameA);
	trA.appendChild(fieldInputA);

	var trB = document.createElement('tr');
	var fieldNameB = document.createElement('td');
	fieldNameB.innerHTML = "Show Avatar";
	var fieldInputB = document.createElement('td');
	var checkPhoto = document.createElement("input");
	checkPhoto.setAttribute("type","checkbox");
	checkPhoto.setAttribute("value","checkPhoto");
	if(localStorage["_stalkeadorIntenso_checkPhoto"]==="true"){
		checkPhoto.setAttribute("checked","checked");
	}
	checkPhoto.setAttribute("style","margin-left:5px;");
	checkPhoto.id = "checkPhoto";
	fieldInputB.appendChild(checkPhoto);
	trB.appendChild(fieldInputB);
	trB.appendChild(fieldNameB);

	var trC = document.createElement('tr');
	var fieldNameC = document.createElement('td');
	fieldNameC.innerHTML = "Show Blog";
	var fieldInputC = document.createElement('td');
	var checkInfo = document.createElement("input");
	checkInfo.setAttribute("type","checkbox");
	checkInfo.setAttribute("value","checkInfo");
	checkInfo.setAttribute("style","margin-left:5px;");
	if(localStorage["_stalkeadorIntenso_checkInfo"]==="true"){
		checkInfo.setAttribute("checked","checked");
	}
	checkInfo.id = "checkInfo";
	fieldInputC.appendChild(checkInfo);
	trC.appendChild(fieldInputC);
	trC.appendChild(fieldNameC);

	var trD = document.createElement('tr');
	var tdButtonA = document.createElement('td');
	tdButtonA.setAttribute("align","center");
	var accept = document.createElement("button");
	accept.setAttribute("type","button");
	accept.addEventListener("click", function(event){
		var posts = parseInt(document.getElementById("postsPerPage").value);
		if(!isNaN(posts)){
			if(posts>50){
				alert("Posts can't exceed 50 per page.");
				return;
			}
		}else{
			alert("Insert only numeric values.");
			return;
		}
		localStorage.setItem("_stalkeadorIntenso_postPerPage",posts);
		var checkPh = document.getElementById("checkPhoto").checked;
		localStorage.setItem("_stalkeadorIntenso_checkPhoto",checkPh);
		var checkIn = document.getElementById("checkInfo").checked;
		localStorage.setItem("_stalkeadorIntenso_checkInfo",checkIn);
		alert("Saved.");
		destroyElement("stalkeadorSettings");
	}, false);
	accept.setAttribute("style","margin-left:5px;");
	accept.innerHTML="Accept";
	accept.id = "accept";
	tdButtonA.appendChild(accept);

	var tdButtonB = document.createElement('td');
	tdButtonB.setAttribute("align","center");
	var cancel = document.createElement("button");
	cancel.setAttribute("type","button");
	cancel.addEventListener("click", function(event){
		destroyElement("stalkeadorSettings");
	}, false);
	cancel.setAttribute("style","margin-left:5px;");
	cancel.innerHTML = "Cancel";
	cancel.id = "cancel";
	tdButtonB.appendChild(cancel);
	
	trD.appendChild(tdButtonA);
	trD.appendChild(tdButtonB);

	tbo.appendChild(trA);
	tbo.appendChild(trB);
	tbo.appendChild(trC);
	tbo.appendChild(trD);
	tab.appendChild(tbo);
	newDiv.appendChild(tab);

	document.getElementById("header").appendChild(newDiv);

}

//SETEA LAS OPCIONES SI ES PRIMERA VEZ QUE SE USA ESTA VERSIÓN DEL SCRIPT
function adjustDefault(){
	if(localStorage["_stalkeadorIntenso_postPerPage"]==null)
		localStorage.setItem("_stalkeadorIntenso_postPerPage",10);
	if(localStorage["_stalkeadorIntenso_checkPhoto"]==null)
		localStorage.setItem("_stalkeadorIntenso_checkPhoto","true");
	if(localStorage["_stalkeadorIntenso_checkInfo"]==null)
		localStorage.setItem("_stalkeadorIntenso_checkInfo","true");
}
function goGo(){
	agregarEstilo();
	adjustDefault();
	createBlogBox();
	createImgBox();
	createSearchBox();
	crearBoton();
	putInCrushes();
	putInRecommended();
	putInRadar();
	setInterval(putInPosts,1000);
}
var logPag = document.URL.toLowerCase().indexOf("https://www.tumblr.com")!=-1;
window.onload = goGo;

//localStorage.removeItem("_stalkeadorIntenso_validDate");
//localStorage.removeItem("_stalkeadorIntenso_postPerPage");
//localStorage.removeItem("_stalkeadorIntenso_checkPhoto");
//localStorage.removeItem("_stalkeadorIntenso_checkInfo");
