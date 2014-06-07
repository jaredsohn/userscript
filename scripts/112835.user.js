// ==UserScript== 
// @name           Auto Mute and Hide for Plurk
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*
// @exclude        http://www.plurk.com/API/*
// Author : Hiraku
// Source1 : http://userscripts.org/scripts/show/91329
// Source2 : https://chrome.google.com/webstore/detail/lnmgaimimdcehmcgnkplanipbglnngce
// 我把來源1跟2的原始碼合在一起，變成了這個script，它可以把使用者設定的關鍵字或者帳號所發的噗隱藏並且消音，
// 簡單來說其實就是Plurk-Mute-And-Hide給Firefox跟Safari的版本XD（因為Plurk-Mute-And-Hide只能在Chrome安裝）
// ==/UserScript== 

(function(){
var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
})();

//var unsafeWindow = window;

(function () { if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(arguments.callee,100); } else {

(function($){
	//Add custom keywords and user id here!
	//在下面依照格式加入你想過濾的關鍵字或者帳號
	var blockList = ['brucepush','zazard1','counterbot','repost','we_plurk','卡馬救星'], blockUrl = [];
	Array.prototype.inArray = function(needle){
		for(i=0; i<=this.length; i++){
			if(this[i] == needle){
				return true;
			}
		}
		return false;
	}
	
	function do_match(text) {
    for (k=0;k<=blockList.length;k++) {
        var keyword = blockList[ k ];
        var r = text && text.match( keyword ); // XXX: rule here.
        if( r ) {
	          // console.debug( 'match:' , r);
            return 1;
        }
    }
    return 0;
}
	
	function set_mute(pid,v) {
    $.ajax({
        type: "POST",
        url: "/TimeLine/setMutePlurk",
        data: "plurk_id=" + pid + "&value=" + v,
        success: function(msg){
            //console.debug( "set_mute:" + msg  );
        }
    });
}
	
	for(i=0;i<=blockList.length;i++){
		blockUrl.push('/'+blockList[i]);
		blockUrl.push('http://www.plurk.com/'+blockList[i]);
	}
	
	
	
	$("#form_holder .plurk a.name, #form_holder .plurk .text_holder a.ex_link").each(function(){
		if(blockUrl.inArray( $(this).attr("href") )){
			$(this).parentsUntil(".plurk").remove();
		}
	
	});
	
	$('.plurk').each(function(i,e) {
        var me = $(this);
				var plurk = me.get(0).id.match( /p(\d+)/ );
				if (plurk) {
	        var plurk_id = plurk[1];
	        var text = me.find('.text_holder').html();
	        if ( do_match( text ) ) {
	            set_mute( plurk_id , 2 );
	            me.html('Muted!!');
							me.remove();
	        }
				}
    });
	
	$('.plurk_cnt').each(function() {
        var me = $(this);
        var name = me.find('.name').html();
        var text = me.find('.text_holder').html();
        if ( do_match( name ) || do_match( text ) ) {
					$(this).parentsUntil(".plurk").remove();
					//me.remove();
				
        }
    });
	
	
	window.setTimeout(arguments.callee, 100, $);
})(unsafeWindow.jQuery.noConflict(true));

}})();