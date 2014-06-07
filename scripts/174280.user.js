// ==UserScript==
// @name        FlyPgs Online Checkin Seat Checker
// @namespace   FlyPgsOnlineCheckinSeat
// @include     https://book.flypgs.com/Common/ICIPAXList.jsp
// @version     1
// ==/UserScript==
 
var seat = new Array();
seat[0]="A";
seat[1]="F";


var isTakeSeatWhenFound = false;
var currentSeat = $($(".tableTahminiKoltuk span")[1]).text().replace("-","").trim();
var completedMsg = "AUTO SEAT [OK]";
var noSeatMsg = "NO SEAT!";
var isOk=false;


for(var i=0;i<seat.length;i++)
{
    isOk = currentSeat.indexOf(seat[i]) >= 0;
    if(isOk)
    {
        break;
    }    
}

if(isOk)
{
    $(document).attr('title', completedMsg);
    
    if(isTakeSeatWhenFound)
    {
        $('#ICI_RULES_ACCEPTED').attr('checked',true);
        
        $('.tableCheckIn input:checkbox').attr('checked',true);
       
        $('[name="btnAutoSeat"]').click();      
    }
    else
    {
        alert(completedMsg);
    }       
}
else
{
     $(document).attr('title', noSeatMsg);
}
 