// ==UserScript==
// @name      Youtube Percentage
// @namespace  
// @version    0.2.1
// @description   See how many percent liked and disliked the video and how many percent have seen the video of the subscribers if the subscribers are the spectators
// @match      http://*/*
// @copyright  2013+, Magnus
// ==/UserScript==


a = 1;

if (a == 1 ){
    
    likes = document.getElementsByClassName('likes-count')[0].innerHTML;
    dislikes = document.getElementsByClassName('dislikes-count')[0].innerHTML;
    likest = document.getElementsByClassName('likes-count')[0].innerHTML;
    dislikest = document.getElementsByClassName('dislikes-count')[0].innerHTML;
    
    
    likes = likes.replace('.',''); 
    dislikes = dislikes.replace('.',''); 
    
    likes = parseInt(likes);
    dislikes = parseInt(dislikes);
    
    likeper = likes*100/(likes+dislikes); 
    dislikeper = dislikes*100/(likes+dislikes);
    
    likeper = likeper.toFixed(1)
    dislikeper = dislikeper.toFixed(1)
    
    views = document.getElementsByClassName('watch-view-count ')[0].innerHTML;
    abbos = document.getElementsByClassName('yt-subscription-button-subscriber-count-branded-horizontal')[0].innerHTML;
    viewst = views;
    abbost = abbos;
    
    
    views = views.replace(/\./g,''); 
    abbos = abbos.replace(/\./g,''); 
    
    views = parseInt(views);
    abbos = parseInt(abbos);
    
    viewsper = views*100/abbos; 
    
    viewsper = viewsper.toFixed(1)


	perdiv = document.createElement("div");
    perdiv.style.backgroundColor = "rgba(199,35,26,0.5)";
    perdiv.style.width = "170px";
    perdiv.style.height = "80px";
    perdiv.style.top = "65px";
    perdiv.style.right = "0";
    perdiv.style.zIndex = "100";
    perdiv.style.position = "fixed";
    perdiv.style.paddingTop = "20px";
    perdiv.style.paddingLeft = "10px";
    perdiv.style.borderTopLeftRadius = "10px";
    perdiv.style.borderBottomLeftRadius = "10px";
    
    document.body.appendChild(perdiv);
    
    likeel = document.createElement("p");
    dislikeel = document.createElement("p");
    abbosel = document.createElement("p");
    
    likeel.style.fontSize = "17px";
    likeel.style.color = "#fefefe";
    likeel.style.lineHeight = "20px";
    
    dislikeel.style.fontSize = "17px";
    dislikeel.style.color = "#fefefe";
    dislikeel.style.lineHeight = "20px";
    
    abbosel.style.fontSize = "17px";
    abbosel.style.color = "#fefefe";
    abbosel.style.lineHeight = "20px";
    
    likeelt = document.createTextNode("Likes: " + likeper + "%");
    dislikeelt = document.createTextNode("Dislikes: " + dislikeper + "%");
    abboselt = document.createTextNode("Subscribers: " + viewsper + "%");
    
    likeel.appendChild(likeelt);
    dislikeel.appendChild(dislikeelt);
    abbosel.appendChild(abboselt);
    
    perdiv.appendChild(likeel);
    perdiv.appendChild(dislikeel);
    perdiv.appendChild(abbosel);
	    
}
else {

} 