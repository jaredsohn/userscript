// ==UserScript==
// @name           Sneak Attack
// ==/UserScript==

javascript:(function(){
	var frame=document.getElementsByName('mafiawars');
    if(frame.length>0 || (!frame)){
		if(confirm('You need to break out the mw-frame first.\nPress OK to do it now.')){
			window.location.href=document.getElementsByName('mafiawars')[0].src;
			return;
		}
	}
	else{
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		if(typeof FB!='undefined'){
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
	}
	
    var styles='<style type="text/css">'+
        '.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }'+
        '.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px}'+
    	'.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }'+
        '.sexy_input{background-color:black; color:#D0D0D0; width:83%; font-size:15px; border: 1px solid #666666; padding-left:0.2em}'+
    	'.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
        '.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
    	'.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}'+
        '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}'+
        '</style>';

    var table_html='<form id="something">'+
			'<table width="745px" style="border:1px solid #666666; background-color:black;">'+

			'<tr>'+
			'<td width="100%" style="border:1px solid #666666;">'+
            '<table style="background-color:black; height:40px">'+
            '<tr>'+
            '<th width="50%" style="font-size:20px; padding-left:15px;text-align: left">BM links have changed !</th>'+
			'<th width="48%" style="font-size:12px; text-align:right"> <a id="Website" align="right" href="http://arun.keen-computing.co.uk" target="_blank">Arun\'s Mafia Wars Helpers</a> - <a id="Donate" href="http://arun.keen-computing.co.uk/?page_id=31" target="_blank">Donate</a></th>'+
			'<th width="2%" align=center><a href="#" id="close"><img alt="Exit" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>'+
			'</tr>'+
            '</table>'+
            '</td>'+
			'</tr>'+
			
			'<tr>'+
            '<td style="color:red">Please note, due to the excessive downtime of userscripts.org and the excess load on the main server, I have changed the hosting location of my BMs. Please update your BMs from my Bookmarklets page - <br><br> <a href="http://arun.keen-computing.co.uk/?page_id=33" target="_blank">Bookmarklets</a>'+
            '</td>'+
			'</tr>'+

			'<tr>'+
            '<td style="color:red">Main server overloaded again, BM links for your reference - <br><br>'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FChuckACrapQueue.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B">Chucker</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none"  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FBrawler.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Brawler</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FWishlistChucker.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Wishlist Chucker</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FRobbit.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Robbit</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FTMPromote.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">TM Promote</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FFeedHelper.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Feed Helper</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FSuckerPunch.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Sneak Attack</a>&nbsp;&nbsp;'+
		'<a style="border-style: solid; border-width: thin; padding: 3px;text-decoration:none" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FChanceHelper.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">Chance Helper</a>&nbsp;&nbsp;'+
		'<br><br>'+
		''+
            '</td>'+
			'</tr>'+
			
			'</table>'+
			'</form>';

    try{
	   document.getElementById('popup_permanence').removeChild(document.getElementById('punch_div'));
    }
    catch(err){}

    var content=document.getElementById('popup_permanence');
    var punch_div=document.createElement("div");
    punch_div.id='punch_div';

    punch_div.innerHTML = styles+table_html;

    content.insertBefore(punch_div,content.firstChild);

    document.getElementById("close").onclick=function(){
        run=false;
        try{
            document.getElementById('popup_permanence').removeChild(document.getElementById('punch_div'));
        }
        catch(err){}
    }
	
//    punch();
})();
