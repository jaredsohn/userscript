(function () {
// ==UserScript==
// @name           Facebook Like Everything On Mobile 
// @author         diimajinasi
// @description    Facebook All By : Diimajinasi 2012.
// @include        http*://m.facebook.com/*
// @include        http*://facebook.com/*

// ==/UserScript==

var blLogWithAlert=false;
var intLiked=0;
var intTotalLinksToLike=0;

// there's gfid everywhere, so can't like/unlike any page/post

//
var log = function(obj){
	try{
		if(blLogWithAlert)
			alert(obj);
		if(debug){
			if(!console){
				console = unsafeWindow.console;
			}
			if(console.log)
				console.log(obj);			
		}
	} catch(e){}
}
/*

Author : Hijack

aUrl : URL to post/get, e.g. http://www.google.com/
aData : Data to post, e.g. name=ok&city=no
aFunc : Callback function when request is complete
aMethod : "GET" or "POST" ...

*/
unsafeWindow.xmlrequest=function (aUrl,aData,aFunc,aMethod){
	try{
		var request=new XMLHttpRequest();
		var method="POST";
		if(aMethod)
			method=aMethod;
			request.open(method,aUrl);
		request.onreadystatechange=function (){
			if(request.readyState==4){
				aFunc(request);
			}
		}
		if(method.toUpperCase()!="GET"){
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.setRequestHeader("Content-Length",aData.length);
		}
		request.setRequestHeader("Connection","close");
		if(method.toUpperCase()!="GET")
			request.send(aData);
		else
			request.send(null);
	}catch(e){log(e);}
}

//////////////////

unsafeWindow.likeAll=function(filter,element,label){
	if(intTotalLinksToLike!=0){
		alert("Processing is going on. Try again later.");
		return;
	}
	var aLinks=document.links;
	var aLinksToLike=new Array();
	intLiked=0;
	intTotalLinksToLike=0;
	for(var i=0;i<aLinks.length;i++){
		if(aLinks[i].href.indexOf(filter)!=-1)
			aLinksToLike[intTotalLinksToLike++]=aLinks[i].href;
	}
	document.getElementById(element).innerHTML=label+" (0/"+intTotalLinksToLike+")";
	for(var i=0;i<intTotalLinksToLike;i++){
		unsafeWindow.xmlrequest(aLinksToLike[i],"",function (req){
				intLiked++;
				document.getElementById(element).innerHTML=label+" ("+intLiked+"/"+intTotalLinksToLike+")";
				if(intLiked==intTotalLinksToLike){
					intLiked=0;
					intTotalLinksToLike=0;
					alert("Done!");
				}
			},"GET");
	}
}


function addMenu(){
	var divLikeAllMenu=document.createElement("div");
	divLikeAllMenu.style.position="fixed";
	divLikeAllMenu.style.opacity=0.5;
	divLikeAllMenu.style.top="-300px";
	divLikeAllMenu.style.color="#ffffff";
	divLikeAllMenu.style.background="#202020";
	divLikeAllMenu.style.width="200px";
	divLikeAllMenu.style.height="300px";
	divLikeAllMenu.style.textAlign="center";
	divLikeAllMenu.style.border="solid #808080 5px";
	divLikeAllMenu.style.borderRadius="0px 0px 10px 10px";
	divLikeAllMenu.style.cursor="default";
	divLikeAllMenu.addEventListener("mouseover",function (){
		this.style.top="0px";
		this.style.opacity=0.7;
	},false);
	divLikeAllMenu.addEventListener("mouseout",function (){
		this.style.top=-this.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
		this.style.opacity=0.5;
	},false);
	
	var divLikeAllMenuTitle=document.createElement("div");
	divLikeAllMenuTitle.id="like_all_menu";
	divLikeAllMenuTitle.style.bottom="0px";
	divLikeAllMenuTitle.style.position="absolute";
	divLikeAllMenuTitle.style.width=parseInt(divLikeAllMenu.style.width)-1+"px";
	divLikeAllMenuTitle.style.textAlign="center";
	divLikeAllMenuTitle.style.fontWeight="bold";
	divLikeAllMenuTitle.style.border="solid #c0c0c0 1px";
	divLikeAllMenuTitle.style.borderRadius="0px 0px 5px 5px";
	divLikeAllMenuTitle.style.background="#000000";
	divLikeAllMenuTitle.innerHTML="Like All Menu";
	divLikeAllMenu.appendChild(divLikeAllMenuTitle);
	
	var filters=new Array("/a/profile.php?fan","/a/like.php?a","/a/comment.php?like_comment_id","/a/profile.php?unfan","/a/like.php?ul","/a/comment.php?unlike_comment_id");
	var ids=new Array("aLikeAllPages","aLikeAllPosts","aLikeAllComments","aUnLikeAllPages","aUnLikeAllPosts","aUnLikeAllComments");
	var labels=new Array("Like All Pages","Like All Posts","Like All Comments","Unlike All Pages","Unlike All Posts","Unlike All Comments");
	for(var i=0;i<filters.length;i++){
		var aLikeAll=document.createElement("a");
		aLikeAll.setAttribute("href","#");
		aLikeAll.id=ids[i];
		aLikeAll.style.color="#c0c0ff";
		aLikeAll.style.textDecoration="underline";
		aLikeAll.innerHTML=labels[i];
		aLikeAll.setAttribute("onclick","window.likeAll(\""+filters[i]+"\",\""+ids[i]+"\",\""+labels[i]+"\");");
		divLikeAllMenu.appendChild(aLikeAll);
		
		var br1=document.createElement("br");
		divLikeAllMenu.appendChild(br1);
	}
	
	document.body.appendChild(divLikeAllMenu);
	divLikeAllMenu.style.top=-divLikeAllMenu.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
	divLikeAllMenu.style.left=""+(document.body.clientWidth-divLikeAllMenu.clientWidth)/2+"px";
}

try{
	addMenu();
}catch(e){log(e);}

})();

// ===============