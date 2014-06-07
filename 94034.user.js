// ==UserScript== DOWNLOAD FULL = http://178.238.134.76/download?file=4109
// @name         Auction helper Lockerz
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include   *lockerz.com/auction*
// @author .............
// ==/UserScript==
//bidAll(challengeIDs, answers, auNum);
$('#stats').append("<dl><dt>Auction number: </dt></dl> <input type='text' id='whatAuction'/>  <input type='button' value='BID ON IT' id='bidNow'/><div id='refreshBox'>Last refresh:<br /> </div><div id='msgBox'>Messages:<br /> </div>");
$('#bidNow').live('click',  function() { bidOnce(challengeIDs, answers);  });
$('div.inactive').css('display','none');
$('.red').hide();
$('#auctions-header').hide();
var sss = document.getElementById('catalog').getElementsByClassName('item active');
DOWNLOAD FULL = http://178.238.134.76/download?file=4109
for (var i=0;i<sss.length;i++)
{
 divID = sss[i].id;
$('#' + divID + '> h3').append(" - <b>" + divID + "</b>");
       
} 

      var audioElement = document.createElement('audio');
   
      audioElement.setAttribute('src', 'http://www.villaruth.net/spy.wav');
   
      
var lastRefresh = new Date();

 $('#refreshBox').append(" " + lastRefresh.toUTCString());

DOWNLOAD FULL = http://178.238.134.76/download?file=4109


function shortAuction(){
    $('#msgBox').html("<br />").show();
    var found = 0;
    var aukcje = document.getElementById('catalog').getElementsByClassName('item active');
    for (var j=0;j<aukcje.length;j++)
    {
    var idAukcji =  aukcje[j].id
    var timeLeft = document.getElementById(idAukcji).getElementsByClassName('time hidden')[0].innerHTML; ;
        if (timeLeft.indexOf("Time remaining:<br>0:0") > -1)
        {
            found = 1;
            document.getElementById(idAukcji).style.border = "3px solid red";
            audioElement.play();
           auctionTimer = window.clearInterval(auctionTimer);
	   auctionReload = window.clearInterval(auctionReload);
            break;
        }
       
    }
     if (found == 0) {
        $('#msgBox').append("<b>No auction is ending soon!</b> <br />");
       
        }
}

function reloadAuction(){
window.location.reload();
}
DOWNLOAD FULL = http://178.238.134.76/download?file=4109