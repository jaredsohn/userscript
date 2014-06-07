// ==UserScript==
// @name           Draft Board Enhancer		
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        7.28.13
// @include        http://*pigskinempire.com/draftboard.aspx
// @description    Adds skills/attribute popup for players on draft board
// @require		   //ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){
     var atts_div = document.createElement('div');
    $('li[itemid]').mouseover(function(e){
    	var id = $(this).attr("itemid");
       

        atts_div.style.display = "none";
        atts_div.setAttribute('id','draft_board_attributes');
        var x = e.pageX - 200;
        var y = e.pageY - 240;
       	
	//Styles
        atts_div.style.position = "absolute";
        atts_div.style.left = x + "px";
        atts_div.style.top = y + "px";
        atts_div.style.width = "200px";
        atts_div.style.height = "200px";
        atts_div.style.zIndex = "100";
		
        //Add and Display it 
        $('#draftlist').append(atts_div);
        $('#draft_board_attributes').load('evalplayer.aspx?id='+ id +'&level=College .gridTbl');
        atts_div.style.display = "inline-block";
        
    }).mouseleave(function(e){
    	atts_div.style.display = "none";
    });
});
