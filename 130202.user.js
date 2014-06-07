// ==UserScript==
//
// 	If you like this script and would like to make a donation, 
// 	please follow this link to do so on Paypal. Thank you!
// 	http://bit.ly/q1BzDO
//
// @name			Alfresco Link Tooltip
// @author			Michael J Scarchilli & Vedad Muhamedagic & Bunnies... lots and lots of bunnies!
// @namespace                   http://www.mikevision.com
// @version			1.3
// @description                 Will show the path of the file on mouse over.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js/jquery.min.js
// @include			https://cms.YOURDOMAIN.com/*
// @grant                       none
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = '(' + callback.toString() + ')();'
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {   
    // DISABLE THE $ GLOBAL ALIAS (MOOTOOLS CONFLICT) //
    jQuery.noConflict();

    // FOR JQUERY SCRIPTS //
    (function($){
   
        $(document).ready(function(){

            // ROW HOVER HIGHLIGHT //                
            function rowHover(css) {
                var head, style;
                head = document.getElementsByTagName('head')[0];
                if (!head) {
                    return;
                }
                style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                head.appendChild(style);
            }

            rowHover('.modifiedItemsList tr:hover {background-color:#dddddd;} .modifiedItemsList tr {height:22px;} .modifiedItemsList tr td:first-child  {padding-left:3px; width:50px;} .modifiedItemsList tr th:first-child  {padding-left:3px; width:50px;} .modifiedItemsList tr th:nth-child(3) {padding-left:2px;} .modifiedItemsList tr:first-child, .modifiedItemsList tr:nth-child(2) {background-color:#f5f5f5;}');

            $('.modifiedItemsList').attr('cellspacing', '0');
            $('.modifiedItemsList').attr('cellpadding', '2');

            // GET FILE LOCATION //
            $('.modifiedItemsList tbody tr a').mouseover(function(){
                var str = ($(this).attr('href'));
                var blarg = str.split(";");
                var path = "";

                for (var i = 4; i < blarg.length-1; i++){
                    path += blarg[i] + "/";
                }

                var narf = path.slice(0,path.lastIndexOf('/'));

                $(this).attr('title', narf);
            });

            // GET FOLDER LOCATION //
            function getFolderLink(hop){
                var findParent = $(hop).parents().children().find('a[id*=jump_to_modified_parent_folder]');
                var findParentAttr = findParent.attr('onclick');
                var filterStuff = findParentAttr.substring(0, findParentAttr.indexOf("';document.forms['website'].submit"));
                var filteredStuff = filterStuff.substr(filterStuff.lastIndexOf('ROOT/') + 5).replace(/\//g, '/');

                $(hop).attr('title', filteredStuff);
            }

            // FOLDER TEXT //
            $('.modifiedItemsList tbody tr td:nth-child(3)').mouseover(function(){
                var binky = $(this).closest('tr').find('img[src*=space_small]').attr('src');

                if(typeof(binky) != 'undefined'){
                    var hop = this;
                
                    $('.modifiedItemsList tbody tr td:nth-child(3)').css('cursor', 'default');

                    getFolderLink(hop);                        
                } 
            });

            // FOLDER ICON //
            $('.modifiedItemsList img[src*=space_small]').mouseover(function(){
                var folder_str = ($(this).attr('src'));

                if(folder_str.indexOf('space_small.gif') >= 0){
                    var hop = this;

                    getFolderLink(hop);
                }
            });
        
            // REVERT NAG //        
            $('img[alt*=Revert]').bind('click', function(){
                var nag = confirm('Are you sure you want to Revert?');
                if (nag){
                    return true;
                }
                else{
                    return false;
                }    
            });
        
            // VIEW WEB PROJECT OPEN IN SAME TAB //       
            $('.webProjectLink').bind('click', function(){
                $(this).attr('target', '');           
            });
        
        // END DOCUMENT READY //
        });
    })(jQuery);
}

// Load jquery and excute main function
addJQuery(main);