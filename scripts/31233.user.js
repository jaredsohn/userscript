// ==UserScript==



// @name           KOLcustomInventory



// @namespace      kolcusto



// @include        http://*.kingdomofloathing.com/inventory.php*



// @include        http://127.0.0.1*/inventory.php*



// ==/UserScript==







//sections["MyItems"]= 524288;







//switch on which in the URL







//XPATH for the top text /html/body/center/table/tbody/tr/td/center/table/tbody/tr/td/center







//XPATH for label of first table //html/body/center/table[2]/tbody/tr[1] I need to stick stuff before this







/* First Page



sections["Food and Drink"] = 1;



sections["Booze"] = 2;



sections["Miscellaneous"] = 4; */







/*Second Page







sections["Hats"] = 8;



sections["Containers"] = 16;



sections["Shirts"] = 32;



sections["Melee Weapons"] = 64;



sections["Off-Hand Items"] = 128;



sections["Accessories"] = 256;



sections["Familiar Equipment"] = 512;



sections["Ranged Weapons"] = 65536;



sections["Mysticality Weapons"] = 262144;



 */







/*Third page



sections["Gift Packages"] = 1024;



sections["Miscellaneous Items"] = 2048;



sections["(Mostly) Combat Items"] = 4096;



sections["Quest Items"] = 8192;



sections["Pants"] = 16384;



sections["(Mostly) Potions"] = 32768;



sections["Bag Of Animal Bones"] = 131072;



 */







//XPATH for label of equipment link	//div[@id='section2048']/table/tbody/tr/td  Generate each section, snarf the text








//GM_setValue("itemFind", "");

var showLinks = GM_getValue("showLinks","");

var listname = GM_getValue("currentInventoryName","");



if (listname == "")
{
  listname = "default";
  GM_setValue("currentInventoryName", listname);
}

var invList  = GM_getValue("invList","");
if (invList == "")
{
  GM_setValue("invList",",default");
}



var items =  GM_getValue("itemFind"+listname,""); 
//alert("itemFind"+listname);

var hasImages = false;







//alert(itemxpathresult.snapshotLength);







function removeCI()



{



  var thisNode = this.parentNode.parentNode.getElementsByTagName("b")[0];  



  var hasImages = GM_getValue("hasimages");



  var itemFind = GM_getValue("itemFind"+GM_getValue("currentInventoryName"),"");


  if (itemFind != "")
  {

    if (thisNode.firstChild)

    {



      thisNode = thisNode.firstChild;



    } 



  



    itemFind = itemFind.replace("|"+thisNode.textContent, "");

    itemFind = itemFind.replace(thisNode.textContent, "");



  //need to figure out if something is the first thing to be added - count |



    GM_setValue("itemFind"+GM_getValue("currentInventoryName"), itemFind);

  }

  if (hasImages)

  {



   this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.previousSibling);



  }   



  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
   



}







function addItemToCI(CI,item, itemText)



{



  var hasImages = GM_getValue("hasimages");



  var cols = GM_getValue("CI_oddCols");



  var innertables = CI.getElementsByTagName("tr")



  currentRow = innertables[innertables.length-1];



  if (cols == 1)



  {



     var tr =  document.createElement('tr'); 



     currentRow.parentNode.appendChild(tr);



     currentRow = innertables[innertables.length-1]; 



     GM_setValue("CI_oddCols", 0);



  }



  else 



  {



     GM_setValue("CI_oddCols", 1);



  }



  if (hasImages=="true")



  {



       var tdImage =  document.createElement('td');



       tdImage.innerHTML = item.previousSibling.innerHTML;



       currentRow.appendChild(tdImage);



       tdImage.vAlign = "center";



  }







  var tabd =  document.createElement('td');



  tabd.vAlign = "top";



  tabd.innerHTML = item.innerHTML;



 //alert(itemText);











  currentRow.appendChild(tabd);

  if(GM_getValue("showLinks","") != "")
  {

    var ciLink = document.getElementById("CILink"+itemText);



    ciLink.textContent = "[CIRem]";



    ciLink.addEventListener('click',  removeCI , true);

  }

}



function funShowLinks()
{
   if (this.checked)
   { 
     GM_setValue("showLinks","true");
   }
   else
   {
     GM_setValue("showLinks","");
   }


}











function addCI()



{

  var currentList = GM_getValue("currentInventoryName");

  var thisNode = this.parentNode.parentNode.getElementsByTagName("b")[0];

  //alert("itemFind"+currentList);

  var itemFind = GM_getValue("itemFind"+GM_getValue("currentInventoryName"),"");

   

  if (thisNode.firstChild)



  {



    thisNode = thisNode.firstChild;



  }



  //alert(thisNode.textContent);



  if(!itemFind.match(thisNode.textContent))



  {



    //need to figure out if something is the first thing to be added - count |



    if(itemFind == "")

    {

      GM_setValue("itemFind"+currentList, thisNode.textContent );

    } 

    else

    {

      GM_setValue("itemFind"+currentList, itemFind + "|" + thisNode.textContent );

    }



    var xpathResult = document.evaluate(



      '//html/body/center/table[2]', 



      document, 



      null, 



      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,



      null



   );



   addItemToCI(xpathResult.snapshotItem(0), this.parentNode.parentNode, thisNode.textContent);



  }



  



  



}







function addLink(fonttag, item)



{



   var a = document.createElement('span');



   a.textContent = "[addCI]";



   a.style.cursor = "pointer";



   a.id = "CILink"+item;



   a.addEventListener('click',  addCI , true);



   fonttag.appendChild(a);







}



function markTable(tableID)
{

  var itemxpathheader =  "//div[@id='section";



  var itemxpathfooter =  "']/table/tbody/tr/td";











  var itemxpathresult = document.evaluate(



    itemxpathheader+tableID+itemxpathfooter, 



    document, 



    null, 



    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,



    null



  );
  if(GM_getValue("showLinks","") != "")
  {
    for (var y =0; y<itemxpathresult.snapshotLength; y++)



    {



     var itemText =  itemxpathresult.snapshotItem(y).innerHTML;



   //alert(itemxpathresult.snapshotItem(y).innerHTML);



     var itemMatch = itemText.match(/>([\w '&;"-]+)<\/a>/)



     if(itemMatch && !hasImages)



     {



       //alert(itemMatch[1]);



       var fonttag = itemxpathresult.snapshotItem(y).getElementsByTagName("font")



       addLink(fonttag[0], itemMatch[1]);    



     }



     else 



     {



       itemMatch = itemText.match(/>([\w '&;"-]+)<\/b>/);



       if(itemMatch)



       {



       //alert(itemMatch[1]);



         hasImages = true;



         GM_setValue("hasimages", "true");



         var fonttag =  itemxpathresult.snapshotItem(y).getElementsByTagName("font")



         addLink(fonttag[0],  itemMatch[1]);



         if(hasImages)



         {

 

         //alert(itemMatch[0]);



         }



       }



    



     



     }

   }

 }


  
 if(items)

 {



 for (var y =0; y<itemxpathresult.snapshotLength; y++)



 {



   var itemText =  itemxpathresult.snapshotItem(y).innerHTML;



   //alert(itemxpathresult.snapshotItem(y).innerHTML);



   var itemMatch = itemText.match(items);



   var currentRow;







   if(itemMatch&&itemxpathresult.snapshotItem(y).vAlign=="top")



   {



     var innertables = tab.getElementsByTagName("tr")



     currentRow = innertables[currenttablerow];



     if(hasImages)



     {



       var tdImage =  document.createElement('td');



       tdImage.innerHTML = itemxpathresult.snapshotItem(y).previousSibling.innerHTML;



       currentRow.appendChild(tdImage);



       tdImage.vAlign = "center";



     }



     var tabd =  document.createElement('td');



     tabd.vAlign = "top";



     tabd.innerHTML = itemText;



     currentRow.appendChild(tabd);



     //alert(itemMatch[0]);



     var ciLink = document.getElementById("CILink"+itemMatch[0]);



     if(ciLink)

     {



       ciLink.textContent = "[CIRem]";

       ciLink.addEventListener('click',  removeCI , true);

     }



     numMatches++;



     //alert(numMatches);



     



     if (numMatches==2)



     {



 	var tr =  document.createElement('tr');



	currentRow.parentNode.appendChild(tr);



        currenttablerow++;



        //alert("AddedRow");



	numMatches = 0;



         



     }



   }



 }

 }

 return hasImages;

}


function addInvToList(invName)
{
   var invList = GM_getValue("invList","");
   if(!(invList.match(","+invName)) || invList =="")
   {
      invList = invList + "," +invName;
     // alert("Should Be adding");
   }
  GM_setValue("invList",invList);
  //alert("Set invList to " + invList + ": InvName = "+ invName);
}


function saveInventory()
{
  var oldInvName = GM_getValue("currentInventoryName","");
  //alert(oldInvName);
 
  var invName = document.getElementById("inventoryName").value; 
  //alert(invName);
  addInvToList(invName);
  GM_setValue("itemFind"+ invName, GM_getValue("itemFind"+oldInvName) );
  GM_setValue("currentInventoryName", invName);
}

function loadInventory()
{
  var invName = this.options[this.selectedIndex].text;
  //alert(invName);
  GM_setValue("currentInventoryName", invName);
  GM_setValue("itemFind"+ invName , GM_getValue("itemFind"+invName, "") );

}











//alert(window.location);







var xpathResult = document.evaluate(



    '//html/body/center/table[2]', 



    document, 



    null, 



    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,



    null



);



var x = xpathResult.snapshotItem(0);











var tab = document.createElement('table');



tab.innerHTML = "<table width=95% cellspacing=0 cellpadding=0><tr><td bgcolor=blue width=50>&nbsp;</td><td style='color: white;' align=center bgcolor=blue><b><a class=nounder href='javascript:toggle('''MyItems''');'><font color=white>MyItems:</font></a></b></td><td bgcolor=blue align=right width=50><font size=+1><b><a href='#top' style='color: white'>&uarr;</a></b></font> &nbsp;</tr><tr><td colspan=3 style='padding: 5px; border: 1px solid blue;'><center><table><tr><td><div id='section666' style='display: inline;'><Table width=100%><tr></tr></table>"



tab.width = "95%";



tab.cellSpacing = "0";



tab.cellPadding = "0";



x.parentNode.insertBefore(tab,x);



var numMatches = 0;



var currenttablerow = 3;


hasImages = markTable("2048");
//alert("Hi");
markTable("4096");
markTable("8192");
markTable("32768");

var input = document.createElement('input');
input.type = "checkBox";
input.addEventListener('click', funShowLinks, false);
if(GM_getValue("showLinks","")!="")
{
  input.checked = true;
}
var span = document.createElement('span');
span.innerHTML ="<span>Show Custom Inventory tags? (needs a reload) <span>";

var paragraph = document.createElement('p');
paragraph.innerHTML = "<p><span>Current inventory: " + listname+ " Save custom inventory as<span></p>"
var iNameInput = document.createElement('input');
iNameInput.type = "text";
iNameInput.id = "inventoryName";
iNameInput.value = listname;
paragraph.appendChild(iNameInput);
var iSaveInput = document.createElement('input');
iSaveInput.addEventListener('click', saveInventory , false);
iSaveInput.type = "button";
iSaveInput.value = "Save";
paragraph.appendChild(iSaveInput);
var span2 = document.createElement('span');
span2.innerHTML = "<span>Load custom inventory</span>"
var select = document.createElement('select');
var option;
select.addEventListener("change", loadInventory, false);
var invList = GM_getValue("invList","");

var reg = /,([\w ]+)/g;
var matches  = invList.match(reg);
var match;
if (matches)
{
  //alert(invList + ", " + matches);
  for each (match in matches)
  {
    option = document.createElement('option');
    option.text = match.substring(1,match.length);
    if(match.substring(1,match.length) == listname)
    { 
      option.defaultSelected = true;
    }
    select.add(option,null);
    
  }

}

//load custom inventory [dropdown list] 
paragraph.appendChild(span2);
paragraph.appendChild(select);
x.parentNode.appendChild(paragraph)
x.parentNode.appendChild(span);
x.parentNode.appendChild(input);



GM_setValue("CI_oddCols", numMatches);

















//<a name=MyItems><table width=95% cellspacing=0 cellpadding=0><tr><td bgcolor=blue width=50>&nbsp;</td><td style="color: white;" align=center bgcolor=blue><b><a class=nounder href="javascript:toggle('MyItems');"><font color=white>Miscellaneous Items:</font></a></b></td><td bgcolor=blue align=right width=50><font size=+1><b><a href='#top' style='color: white'>&uarr;</a></b></font> &nbsp;</tr><tr><td colspan=3 style="padding: 5px; border: 1px solid blue;"><center><table><tr><td><div id="section2048" style='display: inline;'><Table width=100%><tr><td valign=top><b><a onClick='javascript:descitem(757174348);'>bar skin</a></b> (2)<font size=1><br></font></td><td valign=top><b><a onClick='javascript:descitem(125853708);'>delicious shimmering moth</a></b><font size=1><br>
