// ==UserScript==
// @name        gAES
// @namespace   gAES
// @include     https://mail.google.com/mail/u/0/#inbox
// @include     https://mail.google.com/mail/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require     http://www.nicolasturlais.com/projets/gAES/AES.js
// @version     1
// ==/UserScript==
jQuery(window).load(function(){
    var matcher1 = '#';
    var matcher2 = '_';
    var whiteList = [
                        {user : 'Julia Nieddu', password : 'pass'},
                        {user : 'Cisaillant Ours', password : 'pass'},
                    ];

    function getMatches(str){
        var pattern = /#([\s\S]*?)(?=_)/g;
        var result = str.match(pattern);
        r = [];
        if(result){
            for (var i = 0; i < result.length; i++) {
                if (result[i].length > 1) {
                   r.push(result[i].substring(1, result[i].length));
                }
            }
        }
        return r;
    }
    
    function findDest(el){
        return jQuery(el).parents(".nH.Hd[role='dialog']").find('.aCk .nH.aBp .cf.Ht .Hp').text();
    }
    function isWhiteListed(s){
        var r = -1;
        jQuery.each(whiteList, function(index, value){
            if(s == value.user){
                r = index;
                return false; //break the loop
            }
        });
        return r;
    }
    function updateContent(){
        jQuery(".nH.Hd[role='dialog']").each(function(){/*chaque discussion*/
            var dest = jQuery(this).find('.aCk .nH.aBp .cf.Ht .Hp').text();
            var destIndex = isWhiteListed(dest);
            if(destIndex >= 0 ){
                jQuery(this).find("[role='chatMessage'] div.kl, [role='chatMessage'] span[dir='ltr']").each(function(){ /*chaque message*/
                    var $el = jQuery(this);
                    var str = $el.text();
                    cryptedStr = getMatches(str);
                    
                    jQuery.each(cryptedStr, function(k,v){
                        $el.text(str.replace(matcher1+v+matcher2, Aes.Ctr.decrypt(v, whiteList[destIndex].password, 256)));
                    });
                });
            }
        });
    }

    jQuery(document).on('keydown', 'div.no textarea', function (e){
		if(e.keyCode == 13){
		      var dest = findDest(this);
		      var destIndex = isWhiteListed(dest);
		      if( destIndex >= 0 ){
    		      var ciphertext = Aes.Ctr.encrypt(jQuery(this).val(), whiteList[destIndex].password, 256);
                  jQuery(this).val(matcher1+ciphertext+matcher2);
                  updateContent();
              }
         }
	});
	setInterval(function(){updateContent()},500);
});