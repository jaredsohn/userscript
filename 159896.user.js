// ==UserScript==
// @name          Alert embedder
// @version       10
// @author        Charlie Hayes
// @description   Embed alerts into the page so they aren't modal
// @grant         unsafeWindow
// @include       *
// @exclude       http*://mail.google.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

function addCss(cssString) { 
    var h = document.getElementsByTagName('head')[0]; 
    if (!h)
        return;
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    h.appendChild(newCss); 
} 
addCss( '#alertsBoxXYZ {position:fixed; max-height:100%; top:0; bottom:0; right:0; width:200px; margin:4px; pointer-events:none;z-index:2147483647;}');
addCss( '#alertsBoxXYZ #title {overflow:auto; position:absolute; top:0; background-color:maroon; box-sizing:border-box; width:100%; padding:1px 0 0 2px; border:1px solid maroon; border-bottom:none; pointer-events:auto;}');
addCss( '#alertsBoxXYZ ul#list li .count { background-color:maroon; color:white;}' );
addCss( '#alertsBoxXYZ ul#list { opacity: .1; margin:0; padding:3px 1px 1px 1px; background-color:lightpink; border:1px solid maroon; border-top:none; pointer-events:auto; }' );
addCss( '#alertsBoxXYZ ul#list:hover, #alertsBoxXYZ #title:hover + div ul#list { opacity: 1; }' );
addCss( '#alertsBoxXYZ ul#list li:hover { background-color:maroon; color:white; cursor:pointer;}' );
addCss( '#alertsBoxXYZ ul#list li:hover .count { background-color:white; color:black;}' );



var wrapper = $(document.createElement('div'));
wrapper.attr('id', 'alertsBoxXYZ');
wrapper.css('display', 'none'); // Chrome PDF viewer doesn't allow CSS to be injected so this hides the alert

var e = $(document.createElement('div'));
e.css('padding-top','1.9em');
e.css('position', 'absolute');
e.css('width', '100%');
e.css('top', '0');
e.css('z-index', '100000');
e.css('font-size', 'x-small');
e.css('font-family', 'sans-serif');
e.css('box-sizing','border-box');
e.css('height', '100%');

var title = $(document.createElement('div'));
title.attr('id','title');
title.html('<span style="font-size:small; color:white; font-weight:bold;">Alerts:</span><button style="float:right; font-size:x-small;" onclick="hideAlerts();">Hide</button>');


var listWrapper = $(document.createElement('div'));
listWrapper.css('overflow','auto');
listWrapper.css('height','100%');
listWrapper.css('box-sizing','border-box');

var list = $(document.createElement('ul'));
list.attr('id','list');

$('body').append(wrapper);
wrapper.append(e);
e.append(title);
e.append(listWrapper);
listWrapper.append(list);

unsafeWindow.oldAlert=unsafeWindow.alert;
unsafeWindow.alert = function(m) {
    var currentItem = $('#alertsBoxXYZ li:first-child');
    

    if (currentItem.children('#text').html() == m){
        var count = currentItem.children('.count');
        if (count.length > 0){
        	var currentCount = parseInt(count.html());
            count.html(currentCount + 1);
        }else{
			count = $(document.createElement('span'));
            count.addClass('count');
            count.html('2');
            count.css('margin','0 2px 0 0');
            count.css('padding','1px 3px 1px 2px');
            count.css('display', 'inline-block');
            count.css('line-height', '.9');
        	currentItem.prepend(count);
        }
    }else{
        
        var item = $(document.createElement('li'));
        var itemText = $(document.createElement('span'));
        itemText.attr('id','text');
        itemText.html(m);
        item.append(itemText);
        item.css('listStyle', 'none');
        item.css('padding', '1px 2px');
        item.click(function(e,a){
           unsafeWindow.oldAlert(m); 
        });
        $(list).prepend(item);
    }
    wrapper.css('display', 'block');
        
};

unsafeWindow.hideAlerts =  function() {
    $('#alertsBoxXYZ li').remove();
    wrapper.css('display', 'none');
};
