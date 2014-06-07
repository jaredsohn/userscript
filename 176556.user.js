// ==UserScript==
// @name        MobaokAutoRelist
// @namespace   http://trojanbear.net/
// @description モバオクにて出品終了商品を自動的に再出品します。
// @include     http://www.mbok.jp/_my2
// @include     http://www.mbok.jp/_ia_r?i=*autorelist=1*
// @include     http://www.mbok.jp/_ia_r&autorelist=1
// @version     1.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==



// *** customize begin 

var TIMEBELT = 23;		// 終了時間の時間帯。 0 から 23;
var STOP_BEFORE_SUBMIT = 0;	// 0 か 1を指定。 1 を指定すると 出品を確定する直前で停止します。
var RESUBMIT_NUMBER = 3; // 出品時に指定する自動再出品の回数。 0 から 3 のいずれかを指定
var WAITTIME = 100;	// wait time on Item input page. (milliseconds)

// *** customize end


//get URL parameter 
jQuery.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

// add escape string for string.match()
function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}



//ページ読み込み完了後の処理
jQuery(document).ready(function() {
	
	var uri = String(document.location);


	
	//on non-bid list page
	if (  uri.match(/\/_my2/) ) {

		jQuery('body').prepend($('<div class="relist" style="margin:2px auto;border:1px solid;width:500px;padding:2px;"><div><strong>【モバオク 自動再出品】</strong><br>  <span>一覧に表示されている商品の自動再出品処理を行います。</div>  時間帯（0～23）<input type="text" id="time" value="" size="2" />  　<input type="button" id="relist" value="再出品する" /></div>'));
		jQuery('input#time').val(TIMEBELT);
		jQuery('input#relist').click(function(){
					
					var pagesSelector = 'td a[href*="_ia_r?i="]';
				
					var pagesNumber = jQuery(pagesSelector).size();
//					var pagesNumber = 1;		//debug
				
				
					for (var i = 0; i <= pagesNumber-1; i = i +1){
						
						// add url parameter and open
						window.open( jQuery(pagesSelector).eq(i).attr('href') + '&autorelist=1' + '&time=' + jQuery('input#time').val()  );
				
					}
		} );
	
	
	
	
	// ***** on Item page
	} else if (uri.match(escapeRegExp("_ia_r?i=")) && uri.match(escapeRegExp("autorelist=1"))  ){

		var time = $.urlParam('time');
	
	
		//wait few second and do
		setTimeout(function(){
			//select closing time
			jQuery('select[name="hour"]').val( jQuery('select[name="hour"]').children().eq(time -1).val() );
	
			//select Resubmit number
			jQuery('select[name="retry_init"]').get(0).selectedIndex = RESUBMIT_NUMBER;
	
			
			//replace display button onclick URL

//<form action="_ia_r" method="post" >

			
			var onclickText = jQuery('form[method="post"]').attr('action');
			var newText = onclickText + "&autorelist=1";
			
//			jQuery('input#auc_submit2').unbind('click');
			
			jQuery('form[method="post"]').attr('action', newText);
	
			//click display button ok
			jQuery('input[value*="再出品する"]').click();
	
		},WAITTIME);
	
	// on confirm window
	} else if (uri.match(escapeRegExp("_ia_r&autorelist=1"))   ){
		
		if (STOP_BEFORE_SUBMIT != 1){
			//click submit button
			jQuery('input[value*="再出品する"]').click();
		}
	
	

	
	}
	

});