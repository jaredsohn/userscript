// ==UserScript==
// @name          Click visible button using shortkeys
// @namespace http://userscripts.org/users/524433
// @description Click visible inputs that are defined as button and has value "VP" using ctrl+shift+z or "Hide" using ctrl+shift+x
// @include http://www.tangthuvien.com/* 
// @include http://www.tangthuvien.vn/*
// @version     1.7
// @grant none
// @require http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==


(function(d){d.fn.visible=function(e,i){var a=d(this).eq(0),f=a.get(0),c=d(window),g=c.scrollTop();c=g+c.height();var b=a.offset().top,h=b+a.height();a=e===true?h:b;b=e===true?b:h;return!!(i===true?f.offsetWidth*f.offsetHeight:true)&&b<=c&&a>=g}})(jQuery);

(function(){

//posts = jQuery('input[type=button][value~=VP]');
posts = jQuery('input[type=button]').filter(function(index) {
    text = this.value.toLowerCase();
    
    if (text.indexOf('hán việt') >= 0 || text.indexOf('hán') >= 0) {
        return false;
    }
    
    if (isNumber(text))
        return true;
    
    return text.indexOf('vietphrase') != -1 || 
           text.indexOf('vp') != -1 || 
           text.indexOf('việt') != -1 ||
           text.indexOf('chương') != -1 ||
           text.indexOf('hiện ra') != -1 ||
           text.indexOf('chap') != -1
});


JKscroll = {index: -1, newIndex: -1, scrollSpeed: 150, debug: false, offset: 180}; // you can modify scrollSpeed as you wish
document.addEventListener('keydown', function(e) {

    // pressed ctrl+shift+z  
	if (e.keyCode == 90 && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {   
		ShowVisiblePosts();
		e.preventDefault();
	}

	//pressed ctrl+shift+x
	if (e.keyCode == 88 && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
		HideAllPosts();  
		e.preventDefault();
	}

	//J
	if(e.keyCode == 74 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {	
		MoveDown();
		e.preventDefault();
	}

	//K
	if(e.keyCode == 75 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey){
		MoveUp();
		e.preventDefault();
	}

	// shift + z:  hide post + move down + open visible
	if (e.keyCode == 90 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {		
		HideAllPosts();	
		if (MoveDown()) {
			setTimeout(function(){ShowCurrentPost()},500)
		}
		e.preventDefault();	
	}
	
	//shift + A
	if (e.keyCode == 65 && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
	   if (window.location.href.indexOf('&page=') != -1 ) {
	       var nextPage =  parseInt(getParameterByName('page')) +1;
	       nextPage = isNaN(nextPage) ? 2 : nextPage;
	       var url = updateURLParameter(window.location.href, 'page', nextPage);
	       window.open(url);
	       /*
	       if (!$('#goToNextPage').length)
    	       $('body').append('<a id="goToNextPage" href="' + url + '" target="_blank">x </a>');
    	       
    	   $('#goToNextPage').get(0).click();*/
	   }
	}
  
}, false);

    function ShowCurrentPost() {
        if (jQuery(posts[JKscroll.index]).visible())
			posts[JKscroll.index].click();
    }
	
	function ShowVisiblePosts() {
		for (var i =0; i < posts.length; i++) {
			if (jQuery(posts[i]).visible())
					posts[i].click();			
		}
	}
	
	function HideAllPosts() {
        hidePosts = jQuery('input[type=button]').filter(function(index) {
            text = this.value.toLowerCase();
            
            if (isNumber(text))
                return true;
            
            return text.indexOf('hide') != -1 || 
                   text.indexOf('ẩn đi') != -1 
        });
	   hidePosts.each(function(index) {
	       this.click();
	   });
		/*for (var i =0; i < posts.length; i++) {
			if (posts[i].value.indexOf('Hide') !==-1) {		
				posts[i].click();
			}
		}  */
	}  
  
	function Scroll() {
		$('html, body').animate({
				scrollTop: jQuery(posts[JKscroll.newIndex]).offset().top - JKscroll.offset
			}, JKscroll.scrollSpeed);		
	}
	
	function MoveDown() {
		if (JKscroll.index < posts.length -1) {
			JKscroll.index++;
			JKscroll.newIndex = JKscroll.index;
			Scroll();	
			return true;
		}
		
		return false;
	}
	
	function MoveUp() {
		if (JKscroll.index > 0) {
			JKscroll.index--;
			JKscroll.newIndex = JKscroll.index;
			Scroll();	
		}
	}
	
	function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    
    function updateURLParameter(url, param, paramVal) {
        var TheAnchor = null;
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";
    
        if (additionalURL) 
        {
            var tmpAnchor = additionalURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor = tmpAnchor[1];
            if(TheAnchor)
                additionalURL = TheParams;
    
            tempArray = additionalURL.split("&");
    
            for (i=0; i<tempArray.length; i++)
            {
                if(tempArray[i].split('=')[0] != param)
                {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }        
        }
        else
        {
            var tmpAnchor = baseURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor  = tmpAnchor[1];
    
            if(TheParams)
                baseURL = TheParams;
        }
    
        if(TheAnchor)
            paramVal += "#" + TheAnchor;
    
        var rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
    }
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
  

})();