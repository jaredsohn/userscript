// ==UserScript==
// @name        Yahoo Auto Relist
// @namespace   http://www.trojanbear.net/
// @description It will be relist items in yahoo auction japan.
// @include     http://closeduser.auctions.yahoo.co.jp/jp/show/mystatus?select=closed&hasWinner=0
// @include     http://closeduser.auctions.yahoo.co.jp/jp/show/mystatus?select=closed&hasWinner=0&Autorelist=1
// @include     http://*.auctions.yahoo.co.jp/jp/show/resubmit*
// @include     http://*.auctions.yahoo.co.jp/jp/show/preview*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.2
// ==/UserScript==


// *** customize begin 

var TIMEBELT = 22;		// 終了時間の時間帯。 0 から 23;
var STOP_BEFORE_SUBMIT = 0;	// 0 か 1を指定。 1 を指定すると 出品を確定する直前で停止します。
var RESUBMIT_NUMBER = 0; // 出品時に指定する自動再出品の回数。 0 から 3 のいずれかを指定
var WAITTIME = 3000;	// It will wait this time on Item input page. (milliseconds)

// *** customize end


//get URL parameter 
jQuery.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

//ページ読み込み完了後の処理
jQuery(window).load(function() {
	
	var uri = String(document.location);


	
	//on hasWinner0 page
	if (  uri.match(/\.jp\/jp\/show\/mystatus\?select=closed\&hasWinner=0/) ) {

		jQuery('body').prepend($('<div><div><strong>【Yahooオークション(JP) 自動再出品】</strong><br>  <span>一覧に表示されている商品の自動再出品処理を行います。</div>  時間帯（0～23）<input type="text" id="time" value="" size="2" />  　<input type="button" id="relist" value="再出品する" /></div>'));
		jQuery('input#time').val(TIMEBELT);
		jQuery('input#relist').click(function(){
					
					var pagesSelector = 'tr.auc_del_style a[href*="resubmit"]';
				
					var pagesNumber = jQuery(pagesSelector).size();
				//	var pagesNumber = 1;
				
				
					for (var i = 0; i <= pagesNumber-1; i = i +1){
						
						// add url parameter and open
						window.open( jQuery(pagesSelector).eq(i).attr('href') + '&autorelist=1' + '&time=' + jQuery('input#time').val()  );
				
					}
			
		
			
		} );
	
	
	
	
	//on Item page
	} else if (uri.match(/auctions\.yahoo.co\.jp\/jp\/show\/resubmit/) && uri.match(/autorelist\=1/)  ){

		var time = $.urlParam('time');
	
		//click continue button
		jQuery('input#auc_insertion_ok').click();
	
	
		//wait few second and do
		setTimeout(function(){
			//select closing time
			jQuery('select#ClosingTime').val( jQuery('select#ClosingTime').children().eq(time).val() );
	
	//confirm(		jQuery('select[name="numResubmit"]').val  );
	
			//select Resubmit number
			jQuery('select[name="numResubmit"]').get(0).selectedIndex = RESUBMIT_NUMBER;
	
			
			//replace display button onclick URL
			
			var onclickText = jQuery('input#auc_submit2').attr('onclick');
			var newText = onclickText.replace(/\/jp\/show\/preview/g, '\/jp\/show\/preview\?autorelist\=1');
			
			jQuery('input#auc_submit2').unbind('click');
			
			//Google chrome can't do this line maybe. (Firefox OK)
			jQuery('input#auc_submit2').attr('onclick',newText);
	
			//click display button ok
			jQuery('input#auc_submit2').click();
	
		},WAITTIME);
	
	// on confirm window
	} else if (uri.match(/\.auctions\.yahoo\.co\.jp\/jp\/show\/preview/) && uri.match(/autorelist\=1/) ){
		
		if (STOP_BEFORE_SUBMIT != 1){
			//click submit button
			jQuery('input#auc_preview_submit').click();
		}
	
	

	
	}
	

});
