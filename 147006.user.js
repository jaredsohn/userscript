// ==UserScript==
// @name       Blackwood and Bell
// @namespace  playdom
// @version    9.18.2012 5:40
// @description  enter something useful
// @include      http://*.playdom.com/games/bb/*
// @copyright  2012+, You
// @run-at     document-end

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==




$(document).ready(function() {
    
    console.log('script.start');
    //  $('a.message-user-link').each().css('border', '1px solid red');
    //  $('a.header-name').each().css('border', '1px solid green');
    
    /* This will remove the paywall ad and modal mask from showing up */
    function removeEach(ar){
        for(var i=0; i<ar.length;i++)
            ar[i].parentNode.removeChild(ar[i]);
    }
    removeEach(document.querySelectorAll("#modalMask, #pay_wall_popup_wrapper"));
    
    
    $('div.bb div.threads').prepend('<h2>Welcome</h2>');
    
    var date = new Date();
    var now = date.getTime();
    var start_hour = Math.floor(now/3600000);
    
    var saved = localStorage.getItem('summedActivity' + start_hour);
    var userarray = JSON.parse(saved);
    console.log('retrievedObject: ', userarray);
    
    
    
    
    console.log(start_hour);
    
    function sumActivity (userarray) {
        
        var userarray = {};
        
        //Header Names are used when an item is collapsed.
        //        $('a.header-name').each(function (index, value) { 
        //            var link = $(value);
        //            var name = link.text();
        //           
        //            if (isNaN(userarray[name])) { 
        //                userarray[name] = 1;
        //           }
        //          else {
        //             userarray[name]++;
        //        }
        //   });
        //Message links are used when an item is still clickable.
        $('a.message-user-link').each(function (index, value) { 
            var link = $(value);
            
            var name = link.text();
            
            if( actionlink = $(this).parentsUntil('div.play_feed_item').find('a.action-link') ) {
                
                if (actionlink.text() == 'Purchase Help!'){ 
                    actionlink.css('border-bottom', '1px solid orange');
                    return;
                }
                $(this).css('border-bottom', '2px solid green');
                if (isNaN(userarray[name])) { 
                    userarray[name] = 1;
                }
                else {
                    userarray[name]++;
                }
                
                //if parent contains MVP then we shoudl record it. 
                //<div class="play_feed_item_text"> str search
                
                
            }
            
            
        });
        
        localStorage.setItem('summedActivity' + start_hour, JSON.stringify(userarray));
        updateMVPCount(userarray);
        console.log(Object.keys(userarray).length);
        console.log(userarray);
    } 
    
    function updateMVPCount(userarray) {
        $('a.message-user-link').each(function (index, value) { 
            var user_link = $(value);
            var user_name = user_link.text();
            counter =  $(this).next('b');
            $(this).siblings('b').remove();
            $(this).after('<b>(' + userarray[user_name] + ')</b>' );
            /*            if ( counter !== [] ) {
counter.text( '(' + userarray[user_name] + ')' );
}
else {
$(this).after('<b>( ' + userarray[user_name] + ')</b>' );
}*/
        });
        
    }
    
    
    function placeTable(userarray) {
        var sortable = [];
        for (var name in userarray) 
            sortable.push([name, userarray[name]]);
        
        sortable.sort(function(a, b) {return b[1] - a[1]});
        
        
        /* Note that the whole content variable is just a string */
        var content = "<h2>Aspyr: " + userarray['aspyr'] + "</h2>";
        content += "<div style='width:600px; height:300px; background:#FFF; border: 1px solid #CCC; padding:10px; overflow-x: auto;'><table id='sortabletable' class='sortable'>";
        content += "<tr><td>Name</td><td>Count</td></tr>";
        for (var i = 0; i < sortable.length; i++)
            content += '<tr><td>' + sortable[i][0] + '</td>'+'<td>' + sortable[i][1] + '</td></tr>';
        content += "</table></div>";
        $('div.bb div.threads').children().remove();
        $('div.bb div.threads').append(content);   
        console.log('Paint');
        
    }
    
    
    
    
    var refresh = setInterval(function () {sumActivity(userarray);}, 7500);
    
    var refresh = setInterval(function () {placeTable(userarray);}, 20000);
    
    sumActivity(userarray);
    placeTable(userarray);
    
});

