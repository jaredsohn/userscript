// ==UserScript==
// @name          Tf2tp Auto bumper!
// @namespace     ImNotYourBroDawg
// @include       http://tf2tp.com/myTrades*
// @require	   http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

//Settings
var BumpNumber = 0;
//END settings


function handleAjaxResponseSysnotes(data){
  var out = true;
  var sysnotes = data.sysnotes;
  if(!sysnotes)return true;
  if(sysnotes.notice){
    $.each(sysnotes.notice, function(z, item){
      alertDialog(item);
    });
  }
  if(sysnotes.error){
    $.each(sysnotes.error, function(z, item){
      alertDialog('Error: '+item);
      out = false;
    });
  }
  return out;
}

function Bot()
{
		$('.bumpAjaxLink').live('click',function(){
			
			var aEl = $(this);
			if(!(aEl.attr('href') == undefined))
			{
				var input = $.parseJSON(aEl.attr('href').slice(1));
				var postData = {
				  trade : input.tradeId
				};
				function callback(data){
				  if(!handleAjaxResponseSysnotes(data)){
					return false;
				  }
				  aEl.remove();
				  return true;
				}
				$.post('ajax/bumpTrade.php', postData, callback, 'json');
			}
			});
		var link = document.getElementsByClassName("bumpAjaxLink")[BumpNumber];
		if(link != null)
		{
			if(!(window.location.toString() == link))
			{
				window.location = link;
			}
			link.click();
			window.location.reload( true );
		}
		else if(!Math.floor(Math.random()*25))
		{
			window.location = "http://tf2tp.com/myTrades.php";
		}
}

(document.onload = function Loop() {
    var rand = Math.floor((Math.random()*3000)+ 1000); 
    setTimeout(function() {
			unsafeWindow.confirm = function() {return true;}  
			unsafeWindow.alert = null;  
            Bot();
            Loop();  
    }, rand);
}());
