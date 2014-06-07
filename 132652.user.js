// ==UserScript==
// @name           Erepublik shout script
// @namespace      www.erepublik.com
// @description    Shout wall enhancment
// @version        0.61
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en?viewPost*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require        http://json-template.googlecode.com/files/json-template.js

// profile         http://www.erepublik.com/en/citizen/profile/4289506

// ==/UserScript==
/*------------------------------------------------------------------------------
v 0.6
- bug fixing
 -hata düzeltmeleri
v 0.4
- bug fixing
 -hata düzeltmeleri
v 0.2
-auto select friends tab if MU tab and friends tab exchanged
 - friend sekmesi ile mu sekmesi yer değiştirirse otomatik friend sekmesi seçilir.
-reshout the selected post content
 - seçilen iletinin içeriği tekrar yayınlanır
-reshout the selected post content with its owner
 - seçilen ileti sahibi ile beraber yayınlanır
-delete unwanted or spam posts.
 - istenmeyen ya da spam iletileri silme
-recover them if wanted
 - silinenleri geri getirme
------------------------------------------------------------------------------*/

var post_count =0;
var hide = 1;

function check_post_count(){   
   return $('li[id^=post_]').length;   
   }
   
   //deleted posts number
 function check_delPost_count(){
   var temp =0;
   $('li[id^=post_]').each(function(){
   
	if($(this).css('display')=='none'){   
		temp++;
	}   
   });
   return temp;
   
 }   
   
function delPost(p_id){
		
		$('li[id=post_'+p_id+']').hide();
}

function recoverPost(p_id){
		$('li[id=post_'+p_id+']').show();//.next().hide();		
}

function rePost(rePostID){
	var text = $('li[id=post_'+rePostID+'] div[class=post_content] p').text();		
	text=text.trim();	
$('textarea[id=shout]').trigger('click');	
	$('textarea[id=shout]').val(text);
	unsafeWindow.new_post(); 	
}


function rePostUser(rePostUserID){
	var rutext =  $('li[id=post_'+rePostUserID+'] div[class=post_content] p').text();
	var ruuserText = $('li[id=post_'+rePostUserID+'] div[class=post_content] h6 a').text();	
	var ruminText = $('li[id=post_'+rePostUserID+'] div[class=post_content] h6 em').text();	
	rutext=rutext.trim();
	
	//alert(ruuserText+' '+ruminText+'\n '+rutext);
	$('textarea[id=shout]').trigger('click');
	$('textarea[id=shout]').val(ruuserText+' '+ruminText+'\n '+rutext);
	unsafeWindow.new_post();

}

function recoverAll(){
   var recoverPosts = GM_listValues();
	for (var d = 0; d < recoverPosts.length; d++)
	{		
		//delPost(GM_getValue(recoverPosts[d]));
		recoverPost(recoverPosts[d]);
		GM_deleteValue(recoverPosts[d]);			
	}
}


function postRemMain(){
	$('li[id^=post_]').each(function(){
		var lip_id = $(this).attr('id').split('_')[1];		
	
		if($(this).find('#post_func').length==0){
			if($(this).find('img[class=auto_img]').length==0)
				$(this).find('.post_actions').append('<div id="post_func"><div id=delPost_'+lip_id+' trigger="ess_delPost" title="Hide shout" style ="-moz-transition:opacity 0.2s ease-in 0s; float:right; margin-right:5px;background-image: url(\'http://www.erepublik.com/images/modules/storage/delete_offer.png\');width: 19px; height: 19px;  background-position: -3px -3px;"></div><div id=rePost_'+lip_id+' trigger="ess_rePost" title="re-post shout" style ="background-position: -504px; -moz-transition:opacity 0.2s ease-in 0s; float:right; margin-right:8px;background-image: url(\'http://www.erepublik.com/images/modules/misc/editor_buttons.png\');width: 19px; height: 19px;"></div><div id=rePostUser_'+lip_id+' trigger="ess_rePostUser" title="re-post with owner" style ="float:right; background-image: url(\'http://www.erepublik.com/css/markitup/sets/images/quotes.png\');width: 16px; height: 16px;"></div></div>');
			else
			    $(this).find('.post_actions').append('<div id="post_func"><div id=delPost_'+lip_id+' trigger="ess_delPost" title="Hide shout" style ="-moz-transition:opacity 0.2s ease-in 0s; float:right; margin-right:5px;background-image: url(\'http://www.erepublik.com/images/modules/storage/delete_offer.png\');width: 19px; height: 19px;  background-position: -3px -3px;"></div></div>');
		}			
		
	});
	
    var savedPost = GM_listValues();

	for (var d = 0; d < savedPost.length; d++)
	{		     
		delPost(GM_getValue(savedPost[d]));
		//GM_deleteValue(savedPost[d]);
	}
		
	if($('div[id=rDel]').length ==0){		
		$('div[id=citizen_older_feeds]').after('<div id="rDel" style="float:right; margin-top:10px"><a class="f_light_blue_big" trigger="ess_recoverAll" title="Bring back all deleted"><span trigger="ess_recoverAll">Show all hidden</span></a></div>');
	}

}



$(document).ready(function () {

postRemMain();


$('a[trigger=get_citizen_feeds]').click(function(){
  unsafeWindow.get_citizen_feeds();

});



if($('li[id=show_friends_feed]').attr('class') != "active"){

 $('a[trigger=get_citizen_feeds]').trigger('click');

}

$(document).bind('click', function(e){
	var $clicked = $(e.target);
	var id=0;
	if($clicked.attr("id")){
		id= $clicked.attr("id").split("_")[1];
	}
	
	if ($clicked.attr('trigger') == 'ess_delPost')  {	    
	    delPost(id);
		GM_setValue(id,id);			
	}
	else if($clicked.attr('trigger') == 'ess_rePost'){	    
	    rePost(id);		
	}
	else if($clicked.attr('trigger') == 'ess_rePostUser'){	   
	   
	   rePostUser(id);
	   
	}
	else if($clicked.attr('trigger') == 'ess_recoverAll'){
	    recoverAll();		
	}
	


});

   
post_count = check_post_count();

setInterval(function(){

	var t_loaded = $('div[id^=delPost]').length;
	var deletedPostCount =check_delPost_count();
	
	 var tp_count = check_post_count();
	 
	
	 if(tp_count>post_count){
		post_count=tp_count;
    	postRemMain();				 
	 }
	 if(post_count>tp_count){
		post_count =0;
	 
	 }		 
	 
	 if(tp_count>0 && t_loaded ==0 ){
		postRemMain();		
	 }	
	 
	 if(post_count-deletedPostCount <6){
	 
		unsafeWindow.populatePreviousPosts();
	 }
	 
	 $('a[id=lessPosts]').hide();
	 
	},1000);	
	
	
});
	
	
	