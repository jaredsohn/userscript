// ==UserScript==
// @name           komentarze
// @namespace      asdf
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==


unsafeWindow.uc_comments_limit = 100; // ile nowych komentów pokazać?
unsafeWindow.uc_current_page = 1;
unsafeWindow.ajax_users_comments_get = pokazDuuuzo;

function pokazDuuuzo(user_id){	
    if (unsafeWindow.uc_current_page>unsafeWindow.uc_max_page) {
        alert("unsafeWindow.uc_current_page>unsafeWindow.uc_max_page");
        return;
    }
	        
    if (unsafeWindow.uc_current_page < 2) {            
        var box = document.getElementById('comments');	                               		
        var ilosc = box.childNodes.length;                                
        var i=ilosc-1;                
                
        //usuwamy komenty od ostatniego w górę        
        while(i>=0) {
            var staryEl = box.childNodes.item(i);
            box.removeChild(staryEl);
            ilosc = box.childNodes.length;                    
            i--;           
        }               
}
        
    unsafeWindow.$('#more_comments').show();
    var params = new Object();
    params.user_id = user_id;
    params.page = ++unsafeWindow.uc_current_page-1;
    params.limit = unsafeWindow.uc_comments_limit;
    unsafeWindow.$('#more_comments').hide();
    unsafeWindow.$('#comments_ajax_gif').show();
    unsafeWindow.action('users_comments_get', params);	
}

