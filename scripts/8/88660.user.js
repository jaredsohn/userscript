// ==UserScript==
// @name           div
// @namespace      eva
// @include        http://*empireavenue.com/*/portfolio*
// ==/UserScript==


var URL=new Array();
var ROI=new Array();


var urlcnt=0;
var avgurlcnt=0;
var urlwrkcnt=0;

var PullAvgDiv=0;
var SortedBy=0;
var SortedAsc=0;
roistr="";


option=document.getElementById("option-panel");
//alert(option.innerHTML);
//option.innerHTML+='<embed src="success.wav" autostart="false" width="0" height="0" id="sound1" enablejavascript="true">';

option.innerHTML+=' Quick Buy/Sell Shares<input id="buynum" type"text">';
option.innerHTML+=' Quick Buy/Sell Eaves<input id="buyeaves" type"text">';

//option.innerHTML+=' Show sorted ROI<input id="showarray" type "text">';

option.innerHTML+='<input type="checkbox" id="showarray" name="option1"> Result Popup';
option.innerHTML+='<select name="drop2" id="SortBy" >  <option value="1">Last Nights ROI + %gain</option> <option value="2">7 Day ROI</option><option value="3">Weighted</option><option value="4">Shares</option><option value="5">Eaves Diff</option><option value="6">Todays % Gain</option><option value="7">Last Buy/Sell % Gain</option><option value="9">Profit/Loss</option><option value="10">Last Nights ROI</option></select><br><br>';
option.innerHTML+='<input type="checkbox" id="sortasc" name="sortasc">Sort ASC';
option.innerHTML+='<input type="checkbox" id="pullprofiles" name="pullprofiles">Pull Profiles';


option.innerHTML+='<select name="drop1" id="Select1" > <option value="Scoring">Scoring</option> <option value="2">item 2</option> <option value="0">All</option></select><br><br>';

lb=document.getElementById("Select1");

buynum=document.getElementById("buynum");
buyeaves=document.getElementById("buyeaves");
showarray=document.getElementById("showarray");
sortby=document.getElementById("SortBy");
pullprofiles=document.getElementById("pullprofiles");

//alert(buynum.value)


function AddListbox(){


lb.innerHTML='<option value="Scoring">Scoring</option>';
//lb.innerHTML='<select name="drop1" id="Select1" >';
for(kk=1; kk < URL.length ;kk++)
 if(URL[kk][0] != URL[kk-1][0])
 lb.innerHTML+='<option value="'+URL[kk][0]+'">'+URL[kk][SortedBy]+' '+URL[kk][0]+'</option>';

//lb.lb.innerHTML+= '</option></select><br><br>';
}


function SortBy(element,Asc){
if(document.getElementById("sortasc").checked)
URL.sort(function(a,b){return a[element] - b[element]});//Shares asc
else
URL.sort(function(a,b){return b[element] - a[element]});//Score

SortedBy=element;
AddListbox();
}

function ShowArray(){

roistr="#EavTip";
finalroistr="";


for(kk=1; kk < URL.length ;kk++){


 roistr+="<a href='http://EmpireAvenue.com/"+URL[kk][0]+"'> (e)"+URL[kk][0]+"</a> "+URL[kk][SortedBy];
// roistr+=" (e)"+URL[kk][0];

if(roistr.length > 400){
 finalroistr+= roistr+"\n\n#EavTip";
 roistr="";
}

}

finalroistr+= roistr;
showarray.checked=0;
alert(finalroistr);
AddListbox();
}








function openMyWindow(url){
// Open new window
MyWindow = window.open(url);
}




function fireEvent(obj,evt){

var fireOnThis = obj;
if( document.createEvent ) {
var evObj = document.createEvent('MouseEvents');
evObj.initEvent( evt, true, false );
fireOnThis.dispatchEvent(evObj);
} else if( document.createEventObject ) {
fireOnThis.fireEvent('on'+evt);
}
}












//document.addEventListener('click', function(event) {
//window.setTimeout(
window.setInterval(

function (){
var a=document.getElementsByTagName('a');



//for(i=0;i < a.length;i++)
//a[i].href=a[i].href.replace('psearch', 'unsafeWindow.psearchNew');

var i30 = document.getElementById("influencer-30day");
var s=document.getElementsByTagName('div');
var numEarnings=0;
var totalEarnings=0;
var OutstandingFlag=0;
var ticker='';

if(s){
//urlcnt=0;
//urlwrkcnt=0;

     for(i=0;i < s.length ;i++){




   if(s[i].className=='influencer-title' && s[saveI].innerHTML.indexOf('mywindow')==-1){
       str=s[i].innerHTML.substring(s[i].innerHTML.indexOf('quickview')+11);
       ticker=str.substring(0,str.indexOf("')"));
       URL[urlcnt]=new Array(11); 
       URL[urlcnt][0]=ticker;
       URL[urlcnt][10]=roi;
       URL[urlcnt][4]=shares;
       URL[urlcnt][6]=Math.round((updwn/price)*10000)/100;
       URL[urlcnt][1]=Math.round(((URL[urlcnt][6]+(roi*4))/5)*1000)/1000;
       URL[urlcnt][9]=GainLoss;
//  pms_get( 'POST', 'http://stats.spymasterzombie.com/?q=node/1&ver=1.08&attackerID='+attackerID+'&chance='+chance+'&money='+money+'&clan='+ClanMember+'&victim='+name+'&attacker='+attacker+'&result='+result+'&spies='+spies+'&spymasters='+spymasters+'&attack='+attack+'&defense='+defense+'&Aspies='+Aspies+'&Aspymasters='+Aspymasters+'&Aattack='+Aattack+'&Adefense='+Adefense+'&health='+health+'&energy='+energy , testreturn);
       
       urlcnt++;
       s[saveI].innerHTML+=' <a href="javascript:void(0)" onclick="window.open('+"'/"+ticker+"','mywindow'); return false;"+'">'+ticker+'</a> '+shares;
      }

      if(s[i].className=='influencer-list' && s[i].innerHTML.indexOf('ROI')==-1){

       str=s[i].innerHTML;
        str=str.substring(str.indexOf('Share Price'));
        updwnoffset=str.indexOf('(');
        price=str.substring(12,updwnoffset);
        updwn=str.substring(updwnoffset+1,str.indexOf(')'));

        str=s[i].innerHTML;
        str=str.substring(str.indexOf('Shares Owned'));
        shares=str.substring(13,str.indexOf('('));

        str=s[i].innerHTML;
        str=str.substring(str.indexOf('Portfolio Value:'));
        str=str.substring(str.indexOf('('));
        GainLoss=str.substring(1,str.indexOf(')')).replace(',','')*1;
        
        

        str=str.substring(str.indexOf('Last Dividend:'));
        div=str.substring(15,20);
        DailyDiv=Math.round((div/shares)*100)/100;
        roi=Math.round((DailyDiv/price)*10000)/100;

        s[i].innerHTML=updwn+'<b>Daily dividend '+DailyDiv+' ROI '+roi+' '+s[i].innerHTML+'%</b>';
        saveI=i;
      }




//if(s[i].className=='pf-info-title')
//alert(s[i].innerHTML);


      


//influencer-stats

     if(i30 && s[i].className=='influencer-stats' && i30.innerHTML.indexOf('ROI')==-1){
 
     

     str=s[i].innerHTML.substring(s[i].innerHTML.indexOf('float-right')+13);
     price=str.substring(0,str.indexOf('</span>')).replace(',','');
     price=price.substring(0,price.indexOf(')'));
     TodaysGainLoss=price.substring(price.indexOf('(')+1);
     price=price.substring(0,price.indexOf(' ('))*1;

//        alert(TodaysGainLoss);

     str=str.substring(str.indexOf('float-right')+13);
     shares=str.substring(0,str.indexOf('</span>'));
     shares=shares.substring(shares.indexOf('>')+1);

     str=str.substring(str.indexOf('float-right')+13);
     Myshares=str.substring(0,str.indexOf('</span>'));
     Myshares=Myshares.substring(Myshares.indexOf('>')+1);



     ownership=str.substring(shares.indexOf(' (')+2);
     ownership=ownership.substring(0,ownership.indexOf('%'));
     ownership=ownership.substring(ownership.indexOf('</span>')+9);

     avgdiv=str.substring(str.indexOf('Average Daily Dividend/Share:'));
     avgdiv=avgdiv.substring(avgdiv.indexOf('float-right')+13);
     avgdiv=avgdiv.substring(0,avgdiv.indexOf('</span>'));
     
     
     LastPrice=str.substring(str.indexOf('shares at')+10);
     LastPrice=LastPrice.substring(0,LastPrice.indexOf('each')-2);
//alert(LastPrice);

     days=str.substring(str.indexOf('about')+6);
     days=days.substring(0,days.indexOf('ago'));

     if(days.indexOf('day')>-1)
       days=days.substring(0,days.indexOf('day')-1);
     else
     if(days.indexOf('hour')>-1){
       days=days.substring(0,days.indexOf('hour')-1);
       days=(days/24);
       days=Math.round(days*1000)/1000;
     }
     else
     if(days.indexOf('month')>-1)
       days=days.substring(0,days.indexOf('month')-1);
       
//alert(days);



     if(price > LastPrice)
       gain=((price/LastPrice)-1) / days;
     else
       gain=0-((1-(price/LastPrice)) / days);
     gain=Math.round(gain*100000)/1000;


     YesterdayPrice=(TodaysGainLoss*-1)+price; 
     if(price > YesterdayPrice)
       Yesterdaygain=((price/YesterdayPrice)-1);
     else
       Yesterdaygain=0-((1-(price/YesterdayPrice)));
     Yesterdaygain=Math.round(Yesterdaygain*100000)/1000;
     
      

//     alert(avgdiv);
     avgroi=(avgdiv/price);
     avgroi=Math.round(avgroi*100000)/1000;
    
      myprice=83;//*******************************************************************fix this

     if(PullAvgDiv && avgurlcnt < URL.length){
       score=(((avgroi*4) + URL[avgurlcnt][1])+((Yesterdaygain+gain)/2))/6;
       score=Math.round(score*1000)/1000;

       URL[avgurlcnt][3]=score;
     }
     else
       score=((avgroi*4)+((Yesterdaygain+gain)/2))/5;

     score=Math.round(score*1000)/1000;

     MoneyDiff=(price*shares)-(myprice*Myshares);
     MoneyDiff=Math.round(MoneyDiff*1000)/1000;

if(avgurlcnt < URL.length){
  URL[avgurlcnt][4]=shares;
  URL[avgurlcnt][5]=MoneyDiff;
  URL[avgurlcnt][6]=Yesterdaygain;
  URL[avgurlcnt][7]=gain;
  URL[avgurlcnt][8]=price;
}
     
     i30.innerHTML+=gain+'% for '+days+" Days<br>"+Yesterdaygain+"%Today<br> Eaves Diff "+MoneyDiff+"<br>10 day "+(avgroi*price*10)+"<br>ROI "+avgroi+"<br><BR>(e)pod101 Score"+score;
    
  if(avgurlcnt < URL.length)
     URL[avgurlcnt++][2]=avgroi;

     //1000 outstanding own 250 =.25 so 1/.25=4 and 4*250=1000 
     outstanding=((1/(ownership/100))*shares);

     //     alert(shares+' own'+ownership+' '+outstanding );

     }


     if(s[i].className=='pf_history_line'){
       Earnings=s[i].innerHTML.substring(s[i].innerHTML.indexOf('<b>')+3,s[i].innerHTML.indexOf('</b>')).replace(',','');
       numEarnings++;
       totalEarnings+=Earnings/1;
     

     }


     if(s[i].className=='fb-influencer-price empire-blue xlarge'){
       BuySellPrice=s[i].innerHTML.substring(s[i].innerHTML.indexOf(':')+1);
//alert(BuySellPrice);
}     

    


     if(s[i].className=='fb-influencer-item float-left' && (s[i].innerHTML.indexOf('Shares You Own:')> -1 || s[i].innerHTML.indexOf('Shares You Hold:')> -1)){
       shares=s[i].innerHTML.substring(s[i].innerHTML.indexOf('Shares You Hold: ')+17);
//alert(shares);
  
//  roi=((totalEarnings/numEarnings)/outstanding)/price;
//  roi=Math.round(roi*100000)/1000;

  avgROIstr="<br><a href='http://www.empireavenue.com/pod101'"+"><u>(e)POD101</u></a>'s Avg ROI script<br><br>"+numEarnings+" Day Total "+Math.round(totalEarnings)+"<br>Avg Earnings "+Math.round(totalEarnings/numEarnings)+'<br>Outstanding '+Math.round(outstanding)+'<br><br><b>AVG Daily ROI '+roi+'%</b>';

//**************************************************** turned off the output on buy pop up ****************************************  
//  s[i].innerHTML+=avgROIstr;

   buybutton=document.getElementById("fb-button");

if(buybutton){
   shareswanted=document.getElementById("shareswanted");
   
  if(buyeaves.value.indexOf('%')>0){
//   alert(buyeaves.value.substring(0,buyeaves.value.indexOf('%')));
//**********************************************************************BAD shares needs to pull from by screen
   eavesnum=Math.round(shares*(buyeaves.value.substring(0,buyeaves.value.indexOf('%'))/100));   
   if(eavesnum < 1 && eavesnum > -1)
     eavesnum=1; 
// ALERT(EAVESNUM);
 }
  else
   eavesnum=Math.round(buyeaves.value/BuySellPrice);


   if(buynum.value){
     if(buynum.value <0)
       shareswanted.value=buynum.value*-1;
     else
       shareswanted.value=buynum.value;
     fireEvent(document.getElementById("fb-button"),'click');
   }
else
   if(eavesnum){
     if(eavesnum <0)
       shareswanted.value=eavesnum*-1;
     else
       shareswanted.value=eavesnum;

       fireEvent(document.getElementById("fb-button"),'click');
   }

}




     }




}


    
 if(i30 && numEarnings && i30.innerHTML.indexOf('ROI')==-1 ){
 
  roi=((totalEarnings/numEarnings)/outstanding)/price;
  roi=Math.round(roi*100000)/1000;

  avgROIstr="<a href='http://www.empireavenue.com/pod101'"+"><u>(e)POD101</u></a>'s Avg ROI script<br><br>"+numEarnings+" Day Total "+Math.round(totalEarnings)+"<br>Avg Earnings "+Math.round(totalEarnings/numEarnings)+'<br>Outstanding '+Math.round(outstanding)+'<br><br><b>AVG Daily ROI '+roi+'%</b>';

  
  i30.innerHTML+=avgROIstr;
  }



  }




if(lb.value!='Scoring')
 unsafeWindow.show_quickview(lb.value);

if(showarray.checked)
 ShowArray();


if(PullAvgDiv && i30 && i30.innerHTML.indexOf('ROI')>-1 && avgurlcnt< URL.length)
        unsafeWindow.show_quickview(URL[avgurlcnt][0]);

if(PullAvgDiv != pullprofiles.checked && pullprofiles.checked){
  PullAvgDiv=pullprofiles.checked;
  unsafeWindow.show_quickview(URL[avgurlcnt][0]);  
}

if(PullAvgDiv != pullprofiles.checked && avgurlcnt==URL.length )
  PullAvgDiv=pullprofiles.checked;




if(SortedBy != sortby.value) //***************************************************fix 
SortBy(sortby.value,0);

if(SortedAsc != document.getElementById("sortasc").checked){
SortedAsc=document.getElementById("sortasc").checked;
SortBy(sortby.value,0);
}



Next=0;
for(i=0;i < a.length;i++){
if(a[i].innerHTML.indexOf('Next')>-1)
{
//alert(a[i].innerHTML);
//fireEvent(a[i],'click');
Next=1;
}


if(a[i].innerHTML.indexOf('close')>-1 && (buynum.value || buyeaves.value))
{
//alert(a[i].innerHTML);
fireEvent(a[i],'click');
}

}



//if(Next && urlcnt==URL.length)
//unsafeWindow.psearch_cursor(URL.length+50,'normal');

if(Next && PullAvgDiv && avgurlcnt== URL.length){
unsafeWindow.psearch_cursor(URL.length+50,'normal');
}


//joined Empire Avenue

if(document.getElementById("headline-ticker").innerHTML.indexOf('joined Empire Avenue')>-1){
str=document.getElementById("headline-ticker").innerHTML;
ticker=str.substring(str.indexOf('?u=')+3);
ticker=ticker.substring(0,ticker.indexOf('"'));
//alert(ticker+' just joined Eav');

}






},3000);

//}, true); //click listen


function value(a,b) {
a = a[1]+a[0];
b = b[1]+b[0];
return a == b ? 0 : (a < b ? -1 : 1)
}



