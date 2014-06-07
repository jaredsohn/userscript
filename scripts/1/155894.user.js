// ==UserScript==
// @name       Auto select default fields for TMS PE data importing
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://tms.taobao.com/tag/tagServicePara.htm*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

(function(){
    
    var formKeys      = $('#newFields').val().replace(/([^:]+)\:.+?(,|$)/gi, '$1$2').split(','),
        selections    = $('#tag-service-form select'),
        isUnselectAll = true,
        defSelectMap  = {
            "text" : "name",
            "img" : "summImageURL",
            "href" : "storeDetailURL",
            "price" : "newMinPrice",
            "unit" : "packageType",
            "isFs" : "freeShipping",
            "isSoldout" : "isSoldout",
            "hasDiscount" : "hasQuantity",
            "discount" : "discount",
            "delprice" : "oldMinPrice"
        };
    
    selections.find("option:selected").each(function(){
        
        if ( this.value != "" ) {
            isUnselectAll = false;   
            return false;
        }
    });

    if ( isUnselectAll ) {

        selections.each(function( i ){
            var tarOption = $(this).children('[value='+ defSelectMap[ formKeys[i] ] +']');
            if ( tarOption.length ) {
                this.selectedIndex = tarOption.index();
                this.value = tarOption.val();
            }
        });
        
    }
    
})();
