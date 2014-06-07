// ==UserScript==
// @id             Referrals Earnings
// @name           ReffEarnings
// @version        1.0
// @namespace      
// @author         hafiz222
// @description    
// @include        http://www.probux.com/rented.php*
// @run-at         document-end
// ==/UserScript==
var page;
page = location.href;
if(page == "http://www.probux.com/rented.php" || page.search("http://www.probux.com/rented.php?") != -1)
{
 var elements;
 var text;
 var num;
 var target;
 var td = document.createElement("td");
 var tr = document.createElement("tr");
 var ul = document.createElement("ul");
 var find;
 var avg;
 var total_earnings = 0;
 var art = 0;
 var ary = 0;
 var expiring = 20;
 
 // Finding the active referrals today
 elements = document.getElementsByTagName("td");
 for(var i=0; i < elements.length; i++)
    {
     if(elements[i].innerHTML == "Today")
       {
        art = art + 1;        
       }
     else
       if(elements[i].innerHTML == "Yesterday")
        {
         ary = ary + 1;        
        }       
    }
 
 
 // Finding the number of rented referrals
 elements = document.getElementsByTagName("div");
 for(var i=0; i < elements.length; i++)
    {
     if(elements[i].getAttribute("style") == "float:right;")
       {
        text = elements[i].innerHTML;
        i = elements.length + 1;
       }
    }
 text = text.split(':');
 num = Number(text[1]); 
 // Done finding the number of rented referrals
 
 // Addding new "header" <<Earnings>> to the table
 elements = document.getElementsByTagName("table");
 
 for(var i=0; i < elements.length; i++)
    {
     if(elements[i].getAttribute("style") == "border:1px solid #bbb;background:#fff;color:#666;border-radius:3px;margin:8px 0;")
       {
        if(elements[i].rows[0].cells[1].innerHTML == "<a>Referral</a>")
          {           
           target = elements[i];
           i = elements.length + 1;  
          }        
       } 
    }
 td.id = "Earned";
 td.innerHTML = "<a> Earned </a>";
 td.setAttribute("class", "optlinks");
 td.setAttribute("width", "60");
 td.setAttribute("align","center");
 target.rows[0].appendChild(td);
 
 // Done adding the new "header"
 var s_index = document.getElementById("select_text").selectedIndex;
 var s_text = document.getElementById("select_text").options;
 var rpp = s_text[s_index].text;
 var lim = 0;
 rpp = rpp.split("Referrals per page");
 rpp = rpp[0];
 if(rpp < num)
    lim = rpp; 
 else
    lim = num;
  
 // Adding the earnings per referral
 for(var i=0; i < lim; ++i)
    {
     elements = document.getElementById('tr'+i); 
     td = elements.insertCell(-1);     
     td.id = "e" + i;
     td.setAttribute("align","center");
     td.innerHTML = elements.cells[5].innerHTML * 0.005;
     avg = (Math.round(td.innerHTML * 1000) / 1000);
     avg = avg.toFixed(3);
     total_earnings = Number(total_earnings) + Number(avg);
     td.innerHTML = "$" + avg;
     td.setAttribute("style", "font-weight:bold;color:#0A375C;");     
     find = elements.cells[3].innerHTML; 
     find = find.split("days");
     
     if(Number(elements.cells[6].innerHTML) > 1.33)
       {
        elements.setAttribute("style","background-color: rgb(102,255,102);");
        elements.setAttribute("onmouseover","this.style.backgroundColor='#ffecc0'");
        elements.setAttribute("onmouseout","this.style.backgroundColor='#6F6'");        
       }
     else
       {
        elements.setAttribute("style","background-color: rgb(255, 221, 0);");
        elements.setAttribute("onmouseover","this.style.backgroundColor='#ffecc0'");
        elements.setAttribute("onmouseout","this.style.backgroundColor='#FD0'");        
       }
       
     if(Number(find[0]) < expiring) // Compare if the referral is going to expire according to "expiring" var
       {        
        elements.setAttribute("style","background-color: rgb(255, 136, 136);");
        elements.setAttribute("onmouseover","this.style.backgroundColor='#ffecc0'");
        elements.setAttribute("onmouseout","this.style.backgroundColor='#F88'");
       } 
     find = elements.cells[2].innerHTML;
     find = find.split("at");
     date1 = find[0];
     hour1 = find[1];
     var date1, date2, sys_date, str_date, hour1, hour2, hour3, str_hour;
     
     sys_date = new Date();
     str_date = sys_date.getFullYear() + "/" + (sys_date.getMonth()+1) + "/" + sys_date.getDate();
     date2 = str_date;
     
     str_hour = sys_date.getHours() + ":" + sys_date.getMinutes();
     hour2 = str_hour;
     
     //
     // Here are the two dates to compare
     // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
     date1 = date1.split('/');
     date2 = date2.split('/');
     
     hour1 = hour1.split(':');
     hour2 = hour2.split(':');
     
     //hour3 = hour
     
     //if(i==0)
     //  {
     //   alert(date1);
     //   alert(hour1);
     //   alert(date2);
     //   alert(hour2);
     //  } 

     // Now we convert the array to a Date object, which has several helpful methods
     date1 = new Date(date1[0], date1[1], date1[2]);
     date2 = new Date(date2[0], date2[1], date2[2]);

     // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
     date1_unixtime = parseInt(date1.getTime() / 1000);
     date2_unixtime = parseInt(date2.getTime() / 1000);

     // This is the calculated difference in seconds
     var timeDifference = date2_unixtime - date1_unixtime;

     // in Hours
     var timeDifferenceInHours = timeDifference / 60 / 60;

     // and finaly, in days :)
     var timeDifferenceInDays = timeDifferenceInHours  / 24;

     //if(i==0)
       //alert(timeDifferenceInDays);
     //
     
    }
 
 // Finding the table to modify the left column
 elements = document.getElementsByTagName("table"); 
 text = "";
 for(var i=0; i < elements.length; i++)
    {
     if(elements[i].getAttribute("style") == "float:left;")
       {
        elements[i].setAttribute("id","tablerefs");
        text = elements[i];
        i = elements.length + 1;
       }
    }
 
 tr = document.createElement("tr");
 td = document.createElement("td");
 td.setAttribute("class","menuleft-box-title");
 td.setAttribute("align","left");
 td.innerHTML = "Details";
 tr.appendChild(td); 
 text.appendChild(tr); 
 
 var liart = document.createElement("li"); //Active Reffs Today
 var liary = document.createElement("li"); //Active Reffs Yesterday
 var liear = document.createElement("li"); //Earnings
 var ahart = document.createElement("a"); //Active Reffs Today
 var ahary = document.createElement("a"); //Active Reffs Yesterday
 var ahear = document.createElement("a"); //Earnings
 
 tr = document.createElement("tr");
 td = document.createElement("td");
 td.setAttribute("class","menuleft-box-content");
 td.setAttribute("align","left");
 ul.setAttribute("class","ul-bt-acc");
 
 ahart.innerHTML = "Active RRs Today: " + art;
 ahary.innerHTML = "Active RRs Yesterday: " + ary;
 ahear.innerHTML = "Earnings: $" + total_earnings.toFixed(3);
 liart.appendChild(ahart);
 liary.appendChild(ahary);
 liear.appendChild(ahear);
 
 ul.appendChild(liart); 
 ul.appendChild(liary); 
 ul.appendChild(liear); 
 
 td.appendChild(ul);
 tr.appendChild(td);
 
 text.appendChild(tr); 
}
