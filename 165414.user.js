// ==UserScript==
// @name          Facebook HashTag Search
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description   Facebook HashTag Search
// @include       *.facebook.*

// ==/UserScript==

// Append some text to the element with id someText using the jQuery library.
//uiStreamMessage userContentWrapper
function updateHashTags(){
    $(".uiStreamMessage.userContentWrapper:not('.SEEN')").each(function() {
    var textOfPost = $(this).text();
    $(this).addClass('SEEN');
//$(this).setAttribute('class','.uiStreamMessage userContentWrapper SEEN');
    if (textOfPost.indexOf("#") >= 0){
    	var n = textOfPost.split(" ");
        for(var i = 0; i < n.length; i++){
            if (n[i].indexOf("#") >= 0){
                //if(!$('a:contains("'+ n[i]+'")')){
                	var tag = n[i];
                	
                	//console.log("Hi" +n[i]);
        			//$(this).html.replace
                	var text = $(this).html().replace(n[i], "<a href='https://www.facebook.com/search/results.php?q="+ tag.replace('#','') +"&typeaheadResults=[]&init=quick&tas=0.26642215461470187&type=eposts'>"+tag+"</a>");
        			$(this).html(text);
                //}
            }
         //https://www.facebook.com/search/results.php?q=hashtag&typeaheadResults=[]&init=quick&tas=0.26642215461470187&type=eposts   
        }
    }
});
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

// I use jQuery but anything like getElementById will work fine.
observeDOM( $('body')[0] ,function(){ 
    updateHashTags();
});