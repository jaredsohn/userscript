// ==UserScript==
// @name       Favourite reviews from review link
// @version    0.9
// @include    http://rateyourmusic.com/review?id=*
// @include    http://rateyourmusic.com/board_message*
// @include    http://rateyourmusic.com/collection/*
// @include    http://rateyourmusic.com/release/*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
if (window.location.toString().indexOf('review?') > 0){
    unsafeWindow.token = GM_getValue('token');  
    if (unsafeWindow.token != undefined){
        script = document.createElement("script"); 
        script.type = "text/javascript"; 
        script.src = "http://c1317552.cdn.cloudfiles.rackspacecloud.com/basereq-min-b4.js";
        document.getElementsByTagName('HEAD')[0].appendChild(script); 
        
        
        review = document.getElementsByClassName('rsummaryframe');
        //review[0].setAttribute('class','reviewbox');
        reviewId = window.location.toString().split('=')[1];
        
        
        favButton = document.createElement('a');
        favButton.setAttribute('class', 'fav0');
        favButton.setAttribute('href', 'javascript:toggleFav(\''+reviewId+'\', \'q\', \'f\');');
        favButton.setAttribute('title', 'add/remove favorite');
        favButton.setAttribute('id', 'link_'+reviewId+'_q_f');
        review[0].getElementsByTagName('a')[1].insertBefore(favButton, review[0].getElementsByTagName('a')[1].nextSibling);
        
        favImage = document.createElement('img');
        favImage.setAttribute('width', 18);
        favImage.setAttribute('height', 18);
        favImage.setAttribute('src', 'http://c1317792.cdn.cloudfiles.rackspacecloud.com/images/hearte.gif');
        favImage.setAttribute('id', 'fav_'+reviewId+'_q_f');
        favButton.appendChild(favImage);
        
        
        favCount = document.createElement('a');
        favCount.setAttribute('class', 'fav1');
        favCount.setAttribute('href', '/favorited/'+reviewId+'_q_f');
        favCount.setAttribute('title', 'add/remove favorite');
        favCount.setAttribute('id', 'favtext_'+reviewId+'_q_f');
        
        
        
        favButton.parentNode.insertBefore(favCount, favButton.nextSibling);  
    }
}
else if (window.location.toString().indexOf('/collection/') > 0){
    unsafeWindow.token = GM_getValue('token');  
    if (unsafeWindow.token != undefined){
        script = document.createElement("script"); 
        script.type = "text/javascript"; 
        script.src = "http://c1317552.cdn.cloudfiles.rackspacecloud.com/basereq-min-b4.js";
        document.getElementsByTagName('HEAD')[0].appendChild(script); 
        
        // get reviews
        reviews = document.getElementsByClassName('or_q_rating_date_s');
        for (i=0, j=reviews.length; j>i; i++){
            // get review id
            elemsReview = reviews[i].getElementsByTagName('span');
            reviewId = elemsReview[0].innerHTML.split('Rating')[1].replace(']','');
            
            if (reviewId != '0'){
            favButton = document.createElement('a');
            favButton.setAttribute('class', 'fav0');
            favButton.setAttribute('href', 'javascript:toggleFav(\''+reviewId+'\', \'q\', \'f\');');
            favButton.setAttribute('title', 'add/remove favorite');
            favButton.setAttribute('id', 'link_'+reviewId+'_q_f');
            elemsReview[0].appendChild(favButton);
            
            favImage = document.createElement('img');
            favImage.setAttribute('width', 18);
            favImage.setAttribute('height', 18);
            favImage.setAttribute('src', 'http://c1317792.cdn.cloudfiles.rackspacecloud.com/images/hearte.gif');
            favImage.setAttribute('id', 'fav_'+reviewId+'_q_f');
            favButton.appendChild(favImage);
            
            favCount = document.createElement('a');
            favCount.setAttribute('class', 'fav1');
            favCount.setAttribute('href', '/favorited/'+reviewId+'_q_f');
            favCount.setAttribute('title', 'add/remove favorite');
            favCount.setAttribute('id', 'favtext_'+reviewId+'_q_f');
            favButton.parentNode.insertBefore(favCount, favButton.nextSibling);
            
            
            
            }
        }
    }
}
else if (window.location.toString().indexOf('http://rateyourmusic.com/release/') == 0){
    GM_setValue('token', unsafeWindow.token);   
}
else {
    // store token for add / remove favourite requests
    GM_setValue('token', unsafeWindow.token);   
    
    reviewIds = '';
    reviews = document.getElementsByClassName('rsummaryframe');
    for (i=0; reviews.length>i; i++){
        elemsReview = reviews[i].getElementsByTagName('a');
        
        var reviewId = undefined;
        
        if (elemsReview[1].getAttribute('href').indexOf('/collection') >= 0){
            reviewId = elemsReview[1].getAttribute('href').split('rating')[1];
            
            
            if (reviewId != undefined && reviewIds.indexOf(reviewId) < 0){
                reviewIds = reviewIds+reviewId+',';
                favButton = document.createElement('a');
                favButton.setAttribute('class', 'fav0');
                favButton.setAttribute('href', 'javascript:toggleFav(\''+reviewId+'\', \'q\', \'f\');');
                favButton.setAttribute('title', 'add/remove favorite');
                favButton.setAttribute('id', 'link_'+reviewId+'_q_f');
                elemsReview[1].parentNode.appendChild(favButton);
                
                
                favImage = document.createElement('img');
                favImage.setAttribute('width', 18);
                favImage.setAttribute('height', 18);
                favImage.setAttribute('src', 'http://c1317792.cdn.cloudfiles.rackspacecloud.com/images/hearte.gif');
                favImage.setAttribute('id', 'fav_'+reviewId+'_q_f');
                favButton.appendChild(favImage);
                
                favCount = document.createElement('a');
                favCount.setAttribute('class', 'fav1');
                favCount.setAttribute('href', '/favorited/'+reviewId+'_q_f');
                favCount.setAttribute('title', 'add/remove favorite');
                favCount.setAttribute('id', 'favtext_'+reviewId+'_q_f');
                favButton.parentNode.insertBefore(favCount, favButton.nextSibling);  
                
            }
            
        }
    }
    
}
