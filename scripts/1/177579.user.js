// ==UserScript==
// @name           Wallbase Image Preview
// @description    Click on the magnifying glass to view real image instead of thumb
// @include http://wallbase.cc/search*
// @include http://wallbase.cc/toplist*
// @include http://wallbase.cc/random*
// @include http://wallbase.cc/collection*
// @include http://wallbase.cc/user/*uploads
// @include http://wallbase.cc/my_uploads
// ==/UserScript==


var fixlink=function fixLink(link){
    var arr=link.split("//");
    var location = arr[2].split("/")[0];
    var num=link.split("thumb-")[1].split(".")[0];
    
    return ["http://wallpapers.wallbase.cc/"+location+"/wallpaper-"+num+".jpg", "http://wallpapers.wallbase.cc/"+location+"/wallpaper-"+num+".png",num]; 
}

var prev=function Preview(){

    var hei=$(".thumbnail").css("height");
    var wid=$(".thumbnail").css("width");
    var last_selected;
    

function hidePage(img){

    var index=img.index(".thumbnail");
    var num= (parseInt(index/opt.thpp))*opt.thpp;
    var thumbs=$(".thumbnail");
    thumbs.show();
    if(thumbs.length>=num+opt.thpp){
        thumbs=thumbs.slice(num, num+opt.thpp);
    }else{
        thumbs=thumbs.slice(num,thumbs.length);
    }
    thumbs.hide();

}


    $("#wrap").on('click', '.preview',function(event) {
        event.preventDefault();
        
        if($(".previewing").length>0 ){
            var thumb=$(".previewing");            
            var img=thumb.find(".file");
            img.attr("src", img.attr("data-original"));
            img.removeAttr("onError");
            thumb.css({height: hei, width: wid });
            thumb.removeClass("previewing");
            $(".thumbnail").show();
        }
        
        if($(this).parents(".thumbnail").attr("id")!=last_selected){ 
        
    
            last_selected=$(this).parents(".thumbnail").attr("id");
            
            var img=$(this).parents(".wrapper").find(".file");
            $(this).parents(".thumbnail").addClass("previewing");
            
            var url=fixLink($(this).parents(".wrapper").find(".file").attr("src"));
            
            img.css({height: "auto", width: "auto", "max-width" : $(window).width()-50+"px", "max-height" : $(window).height()-50+"px"});
            img.attr("onError","this.remove()");
        
            
            var img2=img.clone();         
            img.after(img2);
            img.remove();
            var img3=img2.clone();
            img2.attr("src",url[1]);
            img3.attr("src",url[0]);
            img2.after(img3);
            
            
            hidePage($(this).parents(".thumbnail"));
            
            $(this).parents(".thumbnail").css({height: "auto", width: "auto"}).show();
        	
		
		var scrollTo=$(this).parents(".thumbnail");            
        
		 $('html, body').animate({
    			scrollTop: scrollTo.offset().top 
		  }, 0);
			
		 

        }else{last_selected="";}
    
    })



};








$('.previewScript').remove();
$("body").append('<div style="display:none" class="previewScript"><script type="text/javascript">'+prev+fixlink+'Preview();</script></div>')



$(".preview").remove();
//$(".preview2").remove();

$( document ).ajaxComplete(function() {
	Check();

});

Check();


function Check(){
    $('.closeX').each(function() {
        if(!$(this).hasClass("edited")){
            $(this).addClass("edited");
                $(this).after("<a class='preview closeX' href='' ><div style='background-position:-102px -72px;left:0;top:20px;position:absolute' class='spr gui ico-search-active'></div></a>");
                
               // $(this).after("<a class='preview2 closeX' href='' ><div style='background-position:-25px -72px;left:0;top:45px;position:absolute' class='spr gui ico-search-active'></div></a>");
        }
    });
}



