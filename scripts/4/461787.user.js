// ==UserScript==
// @name       Yify sort by rating and load films from few next pages
// @namespace  http://juraj/muransky/
// @version    0.9
// @description  Adds 2 buttons to left top corner of page: sort by rating button and load films from pager (10 items by default, but can be edited in script/console)
// @include      http://www.yify-torrent.org/search/*
// @copyright  2012+, Juraj
// ==/UserScript==

//sets how many pages to load at once...
unsafeWindow.numPagesToLoad=10;



unsafeWindow.sortByRatingAction = function sortByRatingAction()
{
    var sortCallback = function(a,b)
    { 
        return $(b).find('.mdif>ul>li::nth-child(5n)').html().localeCompare($(a).find('.mdif>ul>li::nth-child(5n)').html()); 
    }
    var contentBox=$('#content>.box');
    contentBox.children('hr').remove();
    var movies = contentBox.children('.mv').sort(sortCallback);
	contentBox.append(movies);  
    movies.each(function(index){
        if(!(index%3)){
        	$(movies[index]).before('<hr class="space" />');
        }
    });
    contentBox.append(contentBox.find('.pager::eq(1)'));
    
}

unsafeWindow.loadedPages;
unsafeWindow.loadFewPages = function loadFewPages()
{
    var baseSearchURL = window.location.toString();
    if (!unsafeWindow.loadedPages) {
    	var actualPage = (/\/t-([0-9]+)\/$/.exec(baseSearchURL)|| [null,1])[1];
    	unsafeWindow.loadedPages=actualPage;
    }
    baseSearchURL = baseSearchURL.replace(/\/t-([0-9]+)\/$/,'');
    if (!baseSearchURL) {
     	alert('Neviem poucit tlacitko, som na divnej stranke');   
    }
    for (var i=unsafeWindow.loadedPages+1;i<unsafeWindow.loadedPages+numPagesToLoad+1;i++) {
        (function(i){
            var resultObject=jQuery('<div id="holder">Loading</div>');
            var secondPager=$(jQuery('#content>.box>.pager')[1]);
            secondPager.before(resultObject);
            resultObject.load(baseSearchURL+'t-'+i+'/ #content>.box',function(){
                jQuery('#content>.box>.pager>a').each(function(index,item){
                    if($(item).html()==i){
                    	 $(item).addClass('current');   
                    }
                });
                secondPager.before(resultObject.children('.box').children('.mv,hr'));
                resultObject.remove();
            });
        })(i);
    }
    unsafeWindow.loadedPages+=numPagesToLoad;
}

var item = $('<div id="sortByRating" style="position:fixed;left:10px;top:10px;z-index:1000;color:white;cursor:pointer;font-weight:bold;background:red;padding:10px;border-radius:10px">Sort by rating</div>');
var item2 = $('<div id="sortByRating" style="position:fixed;left:10px;top:50px;z-index:1000;color:white;cursor:pointer;font-weight:bold;background:blue;padding:10px;border-radius:10px">Load few pages</div>');
item.on('click',sortByRatingAction);
item2.on('click',loadFewPages);
$(document.body).prepend(item).prepend(item2);
