// ==UserScript==
// @name           VU AddDailyIncome
// @namespace      http://userscripts.org/users/125692
// @description    adds Sum Daily income to economy table
// @include        http://www.humugus.com/ds.php/economy.hum
// ==/UserScript==
/*var AllColImageElements = document.evaluate( 
    "//IMG[@title='colony']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null); 


if(AllColImageElements.snapshotLength==1){
    var temp =AllColImageElements.snapshotItem(0)
    temp=temp.parentNode
    temp=temp.parentNode;
    // temp=temp.parentNode;
    temp=temp.parentNode;

    var targetrow=temp.lastElementChild
    var newElement = document.createElement("tr");
    newElement=targetrow.cloneNode(true)
    targetrow.parentNode.insertBefore(newElement,targetrow.nextSibling)
    var firstchild=newElement.firstElementChild;//this is the line that says SUMS
    firstchild.innerHTML="<b>24hrs :</b>"
    var child=firstchild;
    var num=0;
    for(i=0;i<newElement.childElementCount;i++){
        if(i<8 && child.nextElementSibling){
            child=child.nextElementSibling;
            child.title=parseInt(child.title)*24 ;
            num=parseInt(child.title)    
            if (num>1000000000){
                num=Math.round((num/1000000000)*10)/10;
                child.innerHTML=num+" b!";
            }
            else if (num>1000000){
                num=Math.round((num/1000000)*10)/10;
                child.innerHTML=num+" m";
            }
            else if (num>1000){
                num=Math.round((num/1000)*10)/10;
                child.innerHTML=num+" k";
            }
        }
        if(i>=8 && child.nextElementSibling){
            child=child.nextElementSibling;
            child.title="";
            child.innerHTML=""
        }
        
    }

}

*/
var storedsum=0//the sum of the stockpiled resources
var storedsum24=0//sum of stockpile in 24 hours
//var currelems=document.getElementsByTagName('fieldset')//first in list should be top box
//var currelem=currelems[1].firstElementChild //table
//currelem=currelem.firstElementChild//table section
var currelems=document.getElementsByTagName('tfoot')//humugus doing this way now.
var currelem=currelems[0]
targetrow=currelem.lastElementChild//sums row is last row in tfoot
var newElement = document.createElement("tr");
var newElementcell = document.createElement("td");//append a cell for the totals
newElementcell.align='right';                      //alignit right like all the others are 
var targetcell=targetrow.lastElementChild;             //go to last cell so can call insert
targetcell.parentNode.insertBefore(newElementcell,targetcell.nextSibling)//append new cell after it
newElement=targetrow.cloneNode(true)
targetrow.parentNode.insertBefore(newElement,targetrow.nextSibling)
var firstchild=newElement.firstElementChild;//this is the line that says SUMS
firstchild.innerHTML="<b>24hrs :</b>"
var child=firstchild;
var num=0;
var netincome = [];//store net income

for(i=0;i<newElement.childElementCount;i++){
        if(i<4 && child.nextElementSibling){//raw income
            child=child.nextElementSibling;
            child.title=parseInt(child.title)*24 ;
            num=parseInt(child.title)    
            if (num>1000000000){
                num=Math.round((num/1000000000)*10)/10;
                child.innerHTML=num+" b!";
            }
            else if (num>1000000){
                num=Math.round((num/1000000)*10)/10;
                child.innerHTML=num+" m";
            }
            else if (num>1000){
                num=Math.round((num/1000)*10)/10;
                child.innerHTML=num+" k";
            }
        }
        else if(i<8 && child.nextElementSibling){//net income
            child=child.nextElementSibling;
            netincome[i]=parseInt(child.title)*24
            child.title=netincome[i];
            num=parseInt(child.title)    
            if (num>1000000000){
                num=Math.round((num/1000000000)*10)/10;
                child.innerHTML=num+" b!";
            }
            else if (num>1000000){
                num=Math.round((num/1000000)*10)/10;
                child.innerHTML=num+" m";
            }
            else if (num>1000){
                num=Math.round((num/1000)*10)/10;
                child.innerHTML=num+" k";
            }
        }
        else if (i<12 && child.nextElementSibling){//stored resources
            child=child.nextElementSibling;
            storedsum+=parseInt(child.title)  
            child.title=parseInt(child.title)+ netincome[i-4]
            
            num=parseInt(child.title)    
            storedsum24+=num;
            if (num>1000000000){
                num=Math.round((num/1000000000)*10)/10;
                child.innerHTML=num+" b!";
            }
            else if (num>1000000){
                num=Math.round((num/1000000)*10)/10;
                child.innerHTML=num+" m";
            }
            else if (num>1000){
                num=Math.round((num/1000)*10)/10;
                child.innerHTML=num+" k";
            }  
        }
        else if(i>=8 && child.nextElementSibling){
            child=child.nextElementSibling;
            child.title="";
            child.innerHTML=""
        }
}
//do the predicted total
num=storedsum24
//alert(storedsum)
child=child.parentNode.lastElementChild
child.title=num
 if (num>1000000000){
    num=Math.round((num/1000000000)*10)/10;
    child.innerHTML='<span class="neutral">' +num+" b!"+ '</span>';
}
else if (num>1000000){
    num=Math.round((num/1000000)*10)/10;
    child.innerHTML='<span class="neutral">'+num+" m"+ '</span>';
}
else if (num>1000){
    num=Math.round((num/1000)*10)/10;
    child.innerHTML='<span class="neutral">'+num+" k"+ '</span>';
} 
//do the current total
num=storedsum
//alert(storedsum)
child=targetrow.lastElementChild
child.title=num
 if (num>1000000000){
    num=Math.round((num/1000000000)*10)/10;
    child.innerHTML='<span class="neutral">'+num+" b!"+ '</span>';
}
else if (num>1000000){
    num=Math.round((num/1000000)*10)/10;
    child.innerHTML='<span class="neutral">'+num+" m"+ '</span>';
}
else if (num>1000){
    num=Math.round((num/1000)*10)/10;
    child.innerHTML='<span class="neutral">'+num+" k"+ '</span>';
} 
