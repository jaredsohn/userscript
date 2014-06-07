// ==UserScript==
// @name       Priority Site Search
// @namespace  https://carefusion.atlasrss.com/alarms
// @version    147
// @include https://carefusion.atlasrss.com*
// @exclude https://carefusion.atlasrss.com/serialnumbers
// @description  enter something useful
// @match      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


$(document).ready(setTimeout(function() 
{
    var LookFor = new Array();
   LookFor[0]=10040785
LookFor[1]=10046822
LookFor[2]=10047040
LookFor[3]=1114100
LookFor[4]=1209190
LookFor[5]=1212800
LookFor[6]=1301480
LookFor[7]=1379900
LookFor[8]=1410300
LookFor[9]=6374500
LookFor[10]=19996422
LookFor[11]=10046823
LookFor[12]=10045527
LookFor[13]=1657100
LookFor[14]=19995281
LookFor[15]=1748900
LookFor[16]=19995260
LookFor[17]=19995258
LookFor[18]=19995273
LookFor[19]=1720100
LookFor[20]=1772400
LookFor[21]=1228200
LookFor[22]=19996537
LookFor[23]= 10004479
LookFor[24]=10156361
LookFor[25]=10041300
LookFor[26]=10009579
LookFor[27]=1003728
LookFor[28]=10040390
LookFor[29]=1618800
LookFor[30]=1619100
LookFor[31]=1781800
LookFor[32]=19995519
LookFor[33]=6556500
LookFor[34]=1727900
LookFor[35]=1733400
LookFor[36]=1761100
LookFor[37]=1780700
LookFor[38]=10045370
LookFor[39]=10036548
LookFor[40]=10011547
LookFor[41]=10010283
LookFor[42]=10035297
LookFor[43]=10010813
LookFor[44]=1339805
LookFor[45]=10033543
LookFor[46]=1259450
LookFor[47]=10036571
LookFor[48]=10045349
LookFor[49]=10045194
LookFor[50]=6209500
LookFor[51]=1335700
LookFor[52]=6625300
LookFor[53]=1227200
LookFor[54]=1266501
LookFor[55]=1694700
LookFor[56]=1814800
LookFor[57]=3894755
LookFor[58]=1516200
LookFor[59]=1511400
LookFor[60]=1574500
LookFor[61]=19995175
LookFor[62]=10046664
LookFor[63]=1225100
LookFor[64]=10005780
LookFor[65]=10005781
LookFor[66]=1328860
LookFor[67]=19995636
LookFor[68]=10046271
LookFor[69]=4752502
LookFor[70]=10032222



for (i=0;i<LookFor.length;i++)
{
    if($('body:contains("' + LookFor[i] + '")').length > 0) 
    {
        //alert("New Alarm for Priority site: " + LookFor[i]);
        prompt("New Alarm for Priority Site:",LookFor[i]);
    }
   
    }
    setTimeout(function(){location.reload();},600000);
},13000));