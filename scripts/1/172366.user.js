// ==UserScript==
// @name       	Ameblo Images Links
// @namespace  	www.twitter.com/imux16
// @version     1.0
// @description Quickly view and save images from Ameblo blogs.
// @match       http://ameblo.jp/*
// @copyright   2013+, imux16
// ==/UserScript==

function extractstring(string){
	  var txt=string
      var re1='.*?';	// Non-greedy match on filler
      var re2='((?:[a-z][a-z\\.\\d_]+)\\.(?:[a-z\\d]{3}))(?![\\w\\.])';	// File Name 1

      var p = new RegExp(re1+re2,["i"]);
      var m = p.exec(txt);
      if (m != null)
      {
          var file1=m[1];
          result1 = file1.replace(/</,"&lt;")
          return result1;
      }
}

function extractsecondpart(string){
	str = string.split("_");
	result2 = str[1];
	return result2;
}


function isPage(){
	var pageurl = window.location.pathname;
	if (pageurl.indexOf( 'image' ) > -1){
		return true;
	}else{
		return false;
	}

}

function isPicBlocked(string){
	if (string.indexOf( '_' ) > -1){
		alert("pic is blocked");
	}else{
		alert("pic is not blocked");
	}
}


function imageMain(){
	 $("#blogTitle").before('<a id = "blogTitle" class = "ImageUrl" href = "##"><p>Open image in new tab</p></a>');
	 $(".ImageUrl").click(function(){
	 imgurl = $("#imgItem").attr("src");
	 window.open(imgurl);
	});
}

function entryMain(){
    i = 0;
	url_a = [];
	final_url_a = [];
    num_pics = $(".detailOn").length;
    for (var i = 0; i < num_pics ; i++){
		url_a[i] = $(".detailOn").eq(i).children("img").attr("src");
        if (extractsecondpart(extractstring(url_a[i])) == undefined){
			final_url_a[i] = url_a[i];
            
		}else{
			final_url_a[i] = url_a[i].replace(result1, "o"+result2);
            
		}
		$(".detailOn").eq(i).after('<a class = "ImageUrl"  href = "##"><p index ="' + i + '">Open image in new tab</p></a>');		
		
    }
	
	$(".ImageUrl").click(function(){
        j = $(this).children("p").attr("index");
        window.open(final_url_a[j]);
    });
}
	


function main(){
if (isPage() == true){
		imageMain();
	}else{
		entryMain();
	}
}


main();