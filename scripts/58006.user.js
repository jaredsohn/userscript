// ==UserScript==
// @name           GLB Friend Sort
// @namespace      GLB
// @description    GLB Friend Sort
// @include        http://goallineblitz.com/game/home.pl
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==
// 

$(document).ready( function() {

    function saveitems(){
        var cookstring = '';

        $('input[type=checkbox]','#friends').each(function(i){
            //alert(i+ ':' + $(this).attr('id') + ' ' + $(this).attr('checked'));
            if ($(this).attr('checked') == true) {
                cookstring += $(this).attr('id') + ',';
            }
        });
        if (cookstring.length>0) {
            cookstring = cookstring.substring(0,cookstring.length-1);
            document.cookie="rectar=" + cookstring + "; expires=15/02/2012 00:00:00;";
        }else{
            document.cookie='rectar=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
        alert('Settings Saved');
    }

    function sortKey(k, num){
	
        var x, y
        // The Bubble Sort method.
        var holder = new Array;
        for(x = 0; x < friendssort.length; x++) {
            for(y = 0; y < (friendssort.length-1); y++) {
                if (k==2) {
                    if(friendssort[y][k] < friendssort[y+1][k]) {
                        holder = friendssort[y+1];
                        friendssort[y+1] = friendssort[y];
                        friendssort[y] = holder;
                    }
                }else{
                    
                    if(friendssort[y][k] > friendssort[y+1][k]) {
                        holder = friendssort[y+1];
                        friendssort[y+1] = friendssort[y];
                        friendssort[y] = holder;
                    }
                }
            }
        }
        $('.friend').each(function(i){
            $(this).html(friendssort[i][3]);
            
        });
        
        fillcheckboxes();

    }
    
    function sortList(){
        checkchange();
        var oSelect = $("#friendsort").attr('value');
        switch (oSelect){
            case 'name':
                sortKey(1, 0);
                break;
            case 'target':
                sortKey(2, 0);
                break;
            default:
                sortKey(0, 0);
                break;
        }
    }


    function checkchange(){
        $('input[type=checkbox]','#friends').each(function(thenum){

            
            if ($(this).attr('checked') == true) {
                friendssort[thenum][2] = 1;
            }else{
                friendssort[thenum][2] = 0;
            }
            //alert(friendssort[thenum][2]);
        });
    }

    function fillcheckboxes(){
        $('input[type=checkbox]','#friends').each(function(i){
            //alert(friendssort[i][2]);
            if (friendssort[i][2] == 1) {
                $(this).attr('checked',true);
            }
        });
    }



    //build sort array
    var friendssort = new Array;


    // read cookie
    var javcookie = '';
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf("rectar=");
        var c_name='rectar';
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1; 
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            javcookie = document.cookie.substring(c_start,c_end);
            //delete cookie
            //document.cookie='rectar=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
    };
    if(javcookie.length > 0) {
        var rectaragents = javcookie.split(',');
    }
    $('.friend').each(function(i){
        // get user_id
        var userid = $(this).html();
        userid = userid.substring(userid.indexOf('home.pl?user_id=')+16,userid.indexOf('">',userid.indexOf('home.pl?user_id=')+16));
        friendssort[i] = new Array;
        friendssort[i][0] = userid;
        // create checkbox
        var usechkbox = document.createElement('input');
        usechkbox.setAttribute('type','checkbox');
        usechkbox.setAttribute('id',userid);
        usechkbox.addEventListener('change',checkchange,false);
        var docheck =0;
        // if in javcookie array then check the box
        if(javcookie.length > 0) {
            for (var q=0;q<rectaragents.length;q++) {
                if (rectaragents[q]==userid) {
                    usechkbox.checked = true;
                    friendssort[i][2] = 1;
                }else{
                    friendssort[i][2] = 0;
                }
            }
        }
        // append to element
        var fullhtml = $(this).html();
        $(this).html(fullhtml + '<br>Recruiting Target:') ;
        $(this).append(usechkbox);
        friendssort[i][3] = $(this).html();
        //alert(friendssort[i][3]);
    })


    $('.friend_name').each(function(i){
        var namehtml = $(this).html();
        namehtml = namehtml.substring(namehtml.indexOf('">'), namehtml.indexOf('</a>'));
        friendssort[i][1] = namehtml.toUpperCase();
    });

    

    // build sort box and Save Button
    var sortlist = document.createElement('select');
    sortlist.setAttribute('id', 'friendsort');
    sortlist.options[0] = new Option('Select Sort Option', '', true, true);
    sortlist.options[1] = new Option('Player Name', 'name', false, false);
    sortlist.options[2] = new Option('Recruiting Target', 'target', false, false);
    sortlist.addEventListener('change',sortList,false);

    var savebutton = document.createElement('input');
    savebutton.setAttribute('type', 'button');
    savebutton.setAttribute('id','ddcsave');
    savebutton.setAttribute('value', 'Save Targets');
    savebutton.addEventListener('click',saveitems,false);

    

    $('#friends').prepend(savebutton);
    $('#friends').prepend(sortlist);
    

    // do sort










})

