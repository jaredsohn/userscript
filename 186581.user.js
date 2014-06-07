// ==UserScript==
// @name       Bitbucket RTL
// @namespace  http://behnam.info/
// @version    0.25
// @description  RTL RTL RTL
// @match      https://bitbucket.org/*
// @copyright  2013+, Behnam Yousefi
// ==/UserScript==
function checklang(elm,fname,fsize,changedir) {
    //alert("استارت چک");
    var fa = "ضصثقفغعهخحجچپگکمنتالبیسشظطزرذدئويآءأإؤژة";
		for (var j = 0;j < elm.length;j++){
			var txt = $(elm[j]).html();
			console.log(txt);
			if (txt!=null){
			 for (var i = 0; i < txt.length; i++) {
				var c = txt.charAt(i);
				if (fa.indexOf(c) > -1) {
					//alert("ok");
					//setdir($(elm[j]),"rtl");
                    if(changedir){
						$(elm).css("direction", "rtl");
                    }
					$(elm).css("font-family", fname);
					if(fsize>0){
                        console.log(fsize);
						$(elm).css("font-size", fsize + "px");
					}
					return;
				}

			 }
			$(elm).css("direction", "ltr");
			}
		
		}
    return false;
}

function checkInputLang(elm) {
    //alert("استارت چک");
    var fa = "ضصثقفغعهخحجچپگکمنتالبیسشظطزرذدئويآءأإؤژة";
		var txt=$(elm).val();
		if (txt!=null){
		 for (var i = 0; i < txt.length; i++) {
			var c = txt.charAt(i);
			if (fa.indexOf(c) > -1) {
				//alert("ok");
				$(elm).css("direction", "rtl");
				$(elm).css("font-family", "Tahoma");
				$(elm).css("font-size", "12px");
				return true;
			}

		 }
		 $(elm).css("direction", "ltr");
		}
    return false;
}

$(document).ready(function () {
	$("textarea").bind('keyup', function () {
		console.log("keyup");
		checkInputLang($(this));
	})
	$("input[type='text']").bind('keyup', function () {
		checkInputLang($(this));
	})

	checklang($(".execute"),"Tahoma",12,true);
	checklang($("#issue-title"),"Arial",28,true);
	checklang($(".issue-description"),"Tahoma",12,true);
    checklang($(".issue-attr dd"),"Tahoma",12,false);
    checklang($(".changes li a"),"Tahoma",12,false);
    checklang($("td.milestone a"),"Tahoma",12,true);
    checklang($(".issues-list td.text a.component"),"Tahoma",8,true);
    
    $("textarea").trigger('keyup');
    $("input[type='text']").trigger('keyup')
    
    setTimeout(function(){
        $(".chzn-drop").css("font-family","Tahoma");
        $(".chzn-container").css("font-family","Tahoma");
    },1000);
    
    // feed
    checklang($(".newsfeed .news-item p.additional-info"),"Tahoma",12,true);
    $(".newsfeed .news-item p.additional-info").css("text-align","left");
    

})
