// ==UserScript==
// @name           Google Plus Plus
// @namespace      http://masio.com.mx
// @include        https://plus.google.com/*
// @require        http://code.jquery.com/jquery-1.7.min.js
// ==/UserScript==


/* 
 .Gk reshare text
 .Us postContent
 .md whole post
 .Ux reshare title
 .Ve full post with comments
 */


//Constants

  
  layoutType = {
	"SIDEBAR_LEFT_LAYOUT" 		: ".c-r-Qa-V",
	"SIDEBAR_RIGHT_LAYOUT"		: ".c-i-cH-V",
	"SIDEBAR_RIGHT_CONTENT" 	: ".c-ge-bd",
	"BODY"				: ".c-C",
	"CONTENT"			: "#contentPane",
	"POST_CONTAINER" 		: ".Sq",
	"PLUSONE_CONTAINER" 		: ".Ve .Bx .dl",
	"FULL_POST"			: ".gi",
	"POST_TITLE" 			: ".Ve .jr .Ex",
	"POST_TITLE_CONTAINER"		: ".Ve .jr",
	"RESHARE_TITLE" 		: ".Ve .Bx .Ux",
	"RESHARE_CONTENT" 		: ".Ve .Bx .Tx",
	"MEDIA_CONTAINER"		: ".Jm",
	"POST_TEXT"			: ".vg"
  }

 //Function init
$(document).ready(function(){ 
  

  posts = getPosts();

  //Post Check
  for(i = 0; i < posts.length -1 ; i++ ){
    checkReshare(posts[i]);
    movePlusOne(posts[i]);
    checkNormalPost(posts[i]);
  }
  $(".reshareToggler").live("click", toggleReshare);
  $(".mediaToggler").live("click", toggleMedia);
  
  //reshare end
  
  //Full width
  
  $(layoutType.CONTENT).width(fullWidth);
  
  //less padding on posts
  
  $(layoutType.FULL_POST).css("padding", "8px 8px 8px 8px");
  //move sidebars
  //rightToLeftSidebar();
  
   //console.log($(document).find(".Sq"));
  //On new posts
  $(layoutType.POST_CONTAINER).first().bind('DOMNodeInserted', function(e) {
    if($(e.target).hasClass(layoutType.FULL_POST.replace(".",""))){
    
	checkReshare(e.target);
	movePlusOne(e.target);
      checkNormalPost(e.target);
	
    }
  });

  
}); 

function checkNormalPost(post){
  if(hasMedia(post)){
   formatNormalPost(post);
  }
}
function formatNormalPost(post){

    $(post).find(layoutType.POST_TEXT).first().append("<strong><a href='javascript:void(0)' class='mediaToggler'> [⟱] </a> </strong>");
    $(post).find(layoutType.MEDIA_CONTAINER).hide();
}

function hasMedia(post){
  if( $(post).find(layoutType.MEDIA_CONTAINER).first().children().length > 0) 
      return true;
  else 
      return false;
  
}

function toggleMedia(e){
  post = $(e.target).parents(".md");
	$(post).find(layoutType.MEDIA_CONTAINER).toggle();
}

function checkReshare(post){
  if(isReshare(post)){
    	formatReshare(post);
  }

}

function isReshare(post){

  if($(post).find(layoutType.RESHARE_TITLE).length > 0){
    return true;
  }
  else {
    return false;
  }
}

function movePlusOne(post){
  
    title = $(post).find(layoutType.POST_TITLE_CONTAINER).first();
    plusone =  $(post).find(layoutType.PLUSONE_CONTAINER).first().clone(true);
    $(title).find(".Ex").css("display", "inline");
    $(plusone).css("display", "inline").css("margin-left", "4px");
   
    $(title).append(plusone);
    $(post).find(layoutType.PLUSONE_CONTAINER).first().remove();
}

function formatReshare(post){
  	tit = $(post).find(layoutType.POST_TITLE);
	$(tit).prepend("<strong> <a href='javascript:void(0)' class='reshareToggler'> [♽] </a> </strong>");
	$(post).find(layoutType.RESHARE_TITLE).hide();
	$(post).find(layoutType.RESHARE_CONTENT).hide();	

}

function toggleReshare(e){
	
	post = $(e.target).parents(".md");
	$(post).find(layoutType.RESHARE_TITLE).toggle();
	$(post).find(layoutType.RESHARE_CONTENT).toggle();
	
}

function rightToLeftSidebar(){
	sidebar = $(layoutType.SIDEBAR_RIGHT_CONTENT).clone(true,true);
	$(layoutType.SIDEBAR_LEFT_LAYOUT).append(sidebar);
	//$(layoutType.SIDEBAR_RIGHT_CONTENT).remove();
}

function getPosts(){
  
  return $(layoutType.FULL_POST);
}

function fullWidth(e, w){
	$(layoutType.BODY).css("margin", 0);
	$(".c-r-C-V").css("width", "auto");
	$(".RK").css("width", "auto");
	$(".c-r-P-V-Le-Eb").css("width", "auto");
	
	
	docwid = $(document).width();
	
	if($(layoutType.SIDEBAR_LEFT_LAYOUT).children().length == 0) {
	finwidth = docwid;
	  
	}
	else { finwidth = docwid - 400; }

	return finwidth;

}