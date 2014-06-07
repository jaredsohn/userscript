// ==UserScript==
// @name           SupportTool Lotto
// @author         zd3no
// @include        https://support.innogames.de/*
// @exclude		   https://support.innogames.de/tickets/*
// @version        0.3
// ==/UserScript==

function copyToMessageBox()
{     
    //create string with entries
    var currentDate = new Date();
    //first day of weekly draw 68 starts at "2014 03 17, 00:00:00" which is Sunday to Monday midnight time
    var daysFromWeeklyDraw68 = daysBetween(new Date("2014 03 17,00:00:00"),currentDate);
    var weeklyDrawNumber = "Weekly Draw #" + Math.floor(daysFromWeeklyDraw68/7 + 68); //"Weekly Draw #68";
    var closeDate = getEventDate("Sunday"); //"Sunday 23/Mar/2014";
    var announceDate = getEventDate("Monday"); //"Monday 24/Mar/2014";
    var eliteCount = document.querySelector('.a15kCount').textContent * 1;
    var proCount = document.querySelector('.a10kCount').textContent * 1;
    var generalCount = document.querySelector('.a5kCount').textContent * 1;
    var singleCount = document.querySelector('.Single').textContent * 1;
    var amount = (15000 * eliteCount) + (10000 * proCount) + (5000 * generalCount) + (10000 * singleCount);
    var tickets = "";
    if(eliteCount >0)
    {
        tickets = eliteCount + " x Elite"+String.fromCharCode(13);
    }
    if(proCount >0)
    {
        tickets = tickets + proCount + " x Pro"+String.fromCharCode(13);
    }
    if(generalCount > 0)
    {
        tickets = tickets + generalCount + " x General"+String.fromCharCode(13);
    }
    if(singleCount > 0)
    {
        tickets = tickets + singleCount + " x Single"+String.fromCharCode(13);
    }

    var paste = "Hello,"+String.fromCharCode(13)+String.fromCharCode(13)+"You have bought the following tickets for [b]"+weeklyDrawNumber+"[/b]: "+String.fromCharCode(13)+String.fromCharCode(13)+tickets+String.fromCharCode(13)+"$"+amount+" entry fee has been deducted from your account."+String.fromCharCode(13)+String.fromCharCode(13)+"This competition closes on "+closeDate+" and the winners should be announced on "+announceDate+" in this forum thread: [url=http://forum.the-west.net/showthread.php?t=51724]The Plan[/url]."+String.fromCharCode(13)+String.fromCharCode(13)+"For more information, please see the lottery [url=http://forum.the-west.net/showthread.php?t=51723]forum discussion[/url] thread."+String.fromCharCode(13)+String.fromCharCode(13)+"Good luck!"+String.fromCharCode(13)+String.fromCharCode(13)+"Respectfully,"+String.fromCharCode(13)+"zd3no";
    document.getElementById("message").textContent=paste;

}//end function copyToMessageBox()


function lotto_setDepositAmount(type, amount) {
    // Increment counter
    var counter;
    var currentCount;
    
    if(type == 1)
    {
      		counter = document.querySelector('.a15kCount');
            currentCount=document.querySelector('.a15kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - amount;
    }
    if(type == 2)
    {
            counter = document.querySelector('.a10kCount');
            currentCount=document.querySelector('.a10kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - amount;
    }
    if(type == 3)
    {
        	counter = document.querySelector('.a5kCount');
            currentCount=document.querySelector('.a5kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - amount;
    }
    if(type == 4)
    {
            counter = document.querySelector('.Single');
            currentCount=document.querySelector('.Single').textContent * 1;
    		counter.textContent = (currentCount * 1) - amount;
    }
    
}

function getEventDate(type) {
    var eventDay;
    var x;
    var currentDate = new Date();
    var serverDay = currentDate.getDay();
    if (type == "Sunday")
    	{
            if (serverDay == 0)
                {serverDay = 7}
                x = 7 - serverDay;
                eventDay = "Sun ";
    	}else{
            if (serverDay == 0)
                {serverDay = 7}
       		    x = 8 - serverDay;
            	eventDay = "Mon ";
    	}// end if
                var eventCloseDateDate = currentDate.getDate()+x;
                var eventCloseMonth = currentDate.getMonth();
                var eventCloseYear = currentDate.getFullYear();
   				var month;
                
                switch (eventCloseMonth)
                {
                    case 0:
                        month = "Jan";
                        break;
                    case 1:
                        month = "Feb";
                        break;
                    case 2:
                        month = "Mar";
                        break;
                    case 3:
                        month = "Apr";
                        break;
                    case 4:
                        month = "May";
                        break;
                    case 5:
                        month = "Jun";
                        break;
                    case 6:
                        month = "Jul";
                        break;
                    case 7:
                        month = "Aug";
                        break;
                    case 8:
                        month = "Sep";
                        break;
                    case 9:
                        month = "Oct";
                        break;
                    case 10:
                        month = "Nov";
                        break;
                    case 11:
                        month = "Dec";
                        break;
                }// end switch
                return eventDay+eventCloseDateDate+"/"+month+"/"+eventCloseYear;
}// end 

function treatAsUTC(date) {
                var result = new Date(date);
                result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
                return result;
}

function daysBetween(startDate, endDate) {
                var millisecondsPerDay = 24 * 60 * 60 * 1000;
                return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

function lotto_initialiseUI(event) {
        var container = document.getElementById('message').parentNode;
        // Create insert element
        var quicklinks = document.createElement('div');
        quicklinks.style.display = 'block';
        quicklinks.style.marginBottom = '-0.25em';
        quicklinks.style.position = 'relative';
        quicklinks = container.appendChild(quicklinks);
        var table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.textAlign = 'center';
        table = quicklinks.appendChild(table);
        // Add insert links
        var trow = table.appendChild(document.createElement('tr'));
    trow.insertAdjacentHTML('beforeend', '<td class="sng lottoEnter"><button type="button" style="background-color:#9a5389" onclick="javascript:lotto_setDepositAmount(4, -1);copyToMessageBox();">Sng</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FFCC00" onclick="javascript:lotto_setDepositAmount(1, -1);copyToMessageBox();">Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#99FF66;" onclick="javascript:lotto_setDepositAmount(2, -1);copyToMessageBox();">Pro</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#99CCFF;" onclick="javascript:lotto_setDepositAmount(3, -1);copyToMessageBox();">Gen</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FFCC00" onclick="javascript:lotto_setDepositAmount(1, -10);copyToMessageBox();">10Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#99FF66;" onclick="javascript:lotto_setDepositAmount(2, -10);copyToMessageBox();">10Pro</button></td>');
    	trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#99CCFF;" onclick="javascript:lotto_setDepositAmount(3, -10);copyToMessageBox();">10Gen</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FF6C47" onclick="javascript:lotto_setDepositAmount(1, 1);copyToMessageBox();">-Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#FF6C47;" onclick="javascript:lotto_setDepositAmount(2, 1);copyToMessageBox();">-Pro</button></td>');
    	trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#FF6C47;" onclick="javascript:lotto_setDepositAmount(3, 1);copyToMessageBox();">-Gen</button></td>');
        trow = table.appendChild(document.createElement('tr'));
    trow.insertAdjacentHTML('beforeend', '<td class="Single">0</td>')
        trow.insertAdjacentHTML('beforeend', '<td class="a15kCount">0</td>');
        trow.insertAdjacentHTML('beforeend', '<td class="a10kCount">0</td>');
    	trow.insertAdjacentHTML('beforeend', '<td class="a5kCount">0</td>');
        //trow = table.appendChild(document.createElement('tr'));
        //trow.insertAdjacentHTML('beforeend', '<td colspan="2"><button type="button" onclick="javascript:copyToMessageBox();">Insert Text</button></td>');
        // Inject script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.appendChild(document.createTextNode(lotto_setDepositAmount));
        script.appendChild(document.createTextNode(copyToMessageBox));
    	script.appendChild(document.createTextNode(getEventDate));
    	script.appendChild(document.createTextNode(treatAsUTC));
    	script.appendChild(document.createTextNode(daysBetween));    	
        document.head.appendChild(script);
}

if (document.readyState == 'complete' || document.readyState == 'loaded' || document.readyState == 'interactive' || !document.readyState)
    lotto_initialiseUI(null);
else
    document.addEventListener('DOMContentLoaded', lotto_initialiseUI, false);