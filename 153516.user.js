// ==UserScript==
// @id             junktw
// @name           Picasa web extra for junktw
// @version        0.2
// @namespace      Picasa web extra for junktw
// @author         junktw
// @description    說明
// @website        http://userscripts.org/scripts/show/153516
// @include        *picasaweb.google.*/*
// @exclude        http://picasaweb.google.com/home
// @exclude        https://picasaweb.google.com/home
// @exclude        http://picasaweb.google.com/lh/*
// @exclude        https://picasaweb.google.com/lh/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @run-at         window-load
// @grant          none
// ==/UserScript==
//window-load document-start

$(".goog-icon-list-icon-img").ready(main());
window.addEventListener("hashchange", mHash, false);

function mHash(){
	if(location.hash==""){
		var mCheckbox_attr = {
				"type"  : "checkbox",
				"class" : "mCheckboxs"
		};
		var mCheckbox_style = {
				"position" : "absolute" ,
				"top"      : "5px",
				"left"     : "6px",
				"z-index"  : 1  ,
				"padding"  : "20px"
				
		};
		$(".goog-icon-list-icon-link").before( $("<input>",mCheckbox_attr).css(mCheckbox_style).change(select_sheckbox) );
	
	}
}

function main(){
    
    var mDiv1_attr = {
            "id"    :   "mDiv1"
    };
    var mDiv1_style = {
            "overflow"  : "scroll",
            "width"     : "100%",
            "height"    : "100px",
            "background-color" : "#FFF"
    };
    var mListTable1_attr = {
            "id" : "mListTable1"
    };
    var mListTable1_style = {
        "list-style-type"  : "none"
    };

	$("#lhid_feedview").before(
		$("<input>",{id:"mButton1",type:"button",val:"全選",click:select_all}),
		$("<input>",{id:"mButton2",type:"button",val:"清除",click:reset_all}),
		"<br />",
		$("<textarea>",{id:"mDiv12", height:"0px", width:"0px", overflow:"scroll", click:function(){$(this).select();}}),
        $("<div>", mDiv1_attr).css(mDiv1_style).html(
                    $("<ul>",mListTable1_attr ).css(mListTable1_style).click(    )
                )
	);
	var mCheckbox_attr = {
			"type"  : "checkbox",
			"class" : "mCheckboxs"
	};
	var mCheckbox_style = {
			"position" : "absolute" ,
			"top"      : "5px",
			"left"     : "6px",
			"z-index"  : 1  ,
			"padding"  : "20px"
			
	};
	$(".goog-icon-list-icon-link").before( $("<input>",mCheckbox_attr).css(mCheckbox_style).change(select_sheckbox) );

}

function select_sheckbox(){
	//往後修改為ID存取，搭配 mlist_table 使用。
	//alert($(this).attr("checked"));
    pic_list();
	if($(this).prop("checked")){
		//$("#mDiv12").append( $(this).parent().find("img").get(0).src.replace("/s128/","/s0/") , "\n<br />");
		print_list( $(this).parent().find("img").get(0));
	}
    
    var i = $(".mCheckboxs").index(this);
    
    //alert(i);
    if($(this).prop("checked")){
        mlist_table[i].show();
        //mlist.eq(i).show();
        //$("#mListTable1 li").eq(i).show();
	}else
        $("#mListTable1 li").eq(i).hide();
}

function select_all(){
	//$(".mCheckboxs").prop("checked", true);
	reset_all();
	$(".mCheckboxs").click();
	
	/**
	pic_list();
	$("img.goog-icon-list-icon-img").each(function(key, value){
		//$("#mDiv12").append(this.src.replace("/s128/","/s0/"),"<br />\n");
		print_list( this );
	});
	/**/

}

function reset_all(){
    //$("#mDiv12").text("");
	$(".mCheckboxs").prop("checked", false);
    try{
        mlist.hide();
    }catch(e){  }
	

}

var mlist = [];
var mlist_table = [];
var mlist_imgs = [];
function pic_list(){
    
	if (mlist.length<=0){
        $("img.goog-icon-list-icon-img").each(function (index, value){
            mlist_imgs[index] = {
                "src" : this.src,
                "alt" : $("div.goog-icon-list-icon-meta").eq(index).text()
            }
            //$("<img>", mlist_imgs[index]) ;
            mlist_table[index] = $("<li>").text(  $("<img>", mlist_imgs[index]).get(0).outerHTML);
            $("#mListTable1").append(mlist_table);
        })
		mlist =  $("#mListTable1 li");
        mlist.hide();
	}
    
	return mlist;
}

function print_list(img){
	//$("#mDiv12").append(img.src.replace("/s128/","/s0/"),"<br />\n");
}