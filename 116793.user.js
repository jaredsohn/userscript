// ==UserScript==
// @name           EditCompendium
// @namespace      edit_compendium
// @description    Edit the D&D Compendium and format for copying
// @include        http://www.wizards.com/dndinsider/compendium/monster*
// @include        http://www.wizards.com/dndinsider/compendium/trap*
// ==/UserScript==

//document.addEventListener('click', foo, false);

// document.addEventListener('click', function(event) {
//     //if (event.target=
//  alert("i was clicked"); 
// }, true);

//just an example of how you could hide all the img elements
//var imgs = document.getElementsByTagName('img');  
// for (i=0; i<imgs.length; i++)  
// {  
//  imgs[i].style.visibility = 'hidden';
//}


//=======================================================
//this line makes the document editable from within the browser.
javascript:document.body.contentEditable='true'; document.designMode='on'; void 0


//==================================================
//replace the style sheet, change the css link to a different link
function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}
replaceStyleSheet("styles/print.css", "styles/detail.css"); //replaces the print.css with the detail.css


//var mylink = document.createElement("a");
////mylink.setAttribute('onclick',"window.open('http://www.google.com');return false");
////mylink.id="LevelUpLink";
////mylink.setAttribute('onclick',"javascript:ButtonClicked()");
////mylink.href = "http://www.yahoo.com";
//mylink.innerHTML = "Click Me";
//mylink.addEventListener('click', foo, false);
//document.body.appendChild(mylink);

function foo(e){
     //something to do with this event
     //e.currentTarget will get you what was clicked
     alert("ehekek");  //e.currentTarget
}

//--------------------------------------------
//make the styles inline on the html, instead of in the css sheets, and create html tables
PowerFlavor = document.evaluate("//p[@class='flavorIndent']", document, null, 7, null);
for (i=0; i<PowerFlavor.snapshotLength; i++) {
  //PowerFlavor.snapshotItem(i).innerHTML = "ha ha";
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: none repeat scroll 0 0 #D6D6C2;display: block;margin: 0;padding: 2px 15px 2px 15px;border:0;width:95%;"); //set the style to an inline style
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = PowerFlavor.snapshotItem(i).innerHTML;  //unescape("%A0%A0%A0%A0%A0")+
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  PowerFlavor.snapshotItem(i).parentNode.replaceChild(NewTable, PowerFlavor.snapshotItem(i)); //replace the found node with my newly created table
  //NewText = TheText.replace("damage","ffff");
  //PowerFlavor.snapshotItem(i).innerHTML = NewText;
 }
PowerAlt = document.evaluate("//p[@class='flavor alt']", document, null, 7, null);
for (i=0; i<PowerAlt.snapshotLength; i++) {
  //PowerAlt.snapshotItem(i).setAttribute("class",""); //erase the class
  //PowerAlt.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #C3C6AD;display: block;margin: 0;padding: 2px 15px 2px 15px;"); //set the style to an inline style
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: none repeat scroll 0 0 #C3C6AD;display: block;margin: 0;padding: 2px 15px 2px 15px;border:0;width:95%;"); //set the style to an inline style
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = PowerAlt.snapshotItem(i).innerHTML;  
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  PowerAlt.snapshotItem(i).parentNode.replaceChild(NewTable, PowerAlt.snapshotItem(i)); //replace the found node with my newly created table
  }
  
TrapTitle = document.evaluate("//span[@class='trapblocktitle'] | //p[@class='th2'] | //p[@class='thStat']", document, null, 7, null);
for (i=0; i<TrapTitle.snapshotLength; i++) {
  //PowerAlt.snapshotItem(i).setAttribute("class",""); //erase the class
  //PowerAlt.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #C3C6AD;display: block;margin: 0;padding: 2px 15px 2px 15px;"); //set the style to an inline style
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;width:100%;border-collapse: collapse;font:bold;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: none repeat scroll 0 0 #C3C6AD;display: block;margin: 0;padding: 2px 15px 2px 15px;border:0;width:95%;font:bold;"); //set the style to an inline style
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = TrapTitle.snapshotItem(i).innerHTML;  
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  TrapTitle.snapshotItem(i).parentNode.replaceChild(NewTable, TrapTitle.snapshotItem(i)); //replace the found node with my newly created table
  }
  
TrapBody = document.evaluate("//span[@class='trapblockbody'] | //p[@class='tbod'] | //p[@class='thBody']", document, null, 7, null);
for (i=0; i<TrapBody.snapshotLength; i++) {
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","padding: 2px 15px 2px 15px;background: none repeat scroll 0 0 #D6D6C2;display: block;margin: 0;border:0;width:95%;"); //set the style to an inline style //text-indent:15px;padding: 2px 15px 2px 30px;
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = unescape("%A0%A0%A0%A0%A0")+TrapBody.snapshotItem(i).innerHTML;  
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  TrapBody.snapshotItem(i).parentNode.replaceChild(NewTable, TrapBody.snapshotItem(i)); //replace the found node with my newly created table
  }
  
Heading2 = document.evaluate("//h2", document, null, 7, null);
for (i=0; i<Heading2.snapshotLength; i++) {
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: none repeat scroll 0 0 #4E5C2E;color: #FFFFFF;font-size: 1.25em;font:bold;font-family: Arial,Helvetica;font-variant: small-caps;height: 20px;margin: 0;padding-left: 15px;padding-top: 5px;width:100%;"); //set the style to an inline style
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = Heading2.snapshotItem(i).innerHTML;  
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  Heading2.snapshotItem(i).parentNode.replaceChild(NewTable, Heading2.snapshotItem(i)); //replace the found node with my newly created table  
 }

BodyTable = document.evaluate("//table[@class='bodytable']", document, null, 7, null);
//alert(BodyTable.snapshotLength);
for (i=0; i<BodyTable.snapshotLength; i++) {
  BodyTable.snapshotItem(i).setAttribute("class","mybodytable"); //erase the class
  BodyTable.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #D6D6C2;border:0;width:100%;display: block;margin: 0;"); //set the style to an inline style   
  }
//BodyTableLeft = document.evaluate("//table[@class='mybodytable']//td[not(@class='rightalign')]", document, null, 7, null);
//BodyTableRight = document.evaluate("//table[@class='mybodytable']//td[@class='rightalign']", document, null, 7, null);
////alert(BodyTableLeft.snapshotLength);
//for (i=0; i<BodyTableRight.snapshotLength; i++) {
// BodyTableLeft.snapshotItem(i).innerHTML = BodyTableLeft.snapshotItem(i).innerHTML+unescape("%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0%A0")+BodyTableRight.snapshotItem(i).innerHTML;
// BodyTableRight.snapshotItem(i).parentNode.removeChild(BodyTableRight.snapshotItem(i)); //remove an entire node, from its parent remove its child
// BodyTableLeft.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #D6D6C2;border:0;width:100%;display: block;margin: 0;padding: 2px 15px 2px 2px;"); //set the style to an inline style   
//}
BodyTableDatas = document.evaluate("//table[@class='mybodytable']//tr//td", document, null, 7, null);
for (i=0; i<BodyTableDatas.snapshotLength; i++) {
BodyTableDatas.snapshotItem(i).setAttribute("style","margin: 0;border:0;border-collapse: collapse;padding: 2px 15px 2px 15px;"); //set the style to an inline style 
BodyTableDatas.snapshotItem(i).setAttribute("nowrap","true");
}

Flavor = document.evaluate("//p[@class='flavor']", document, null, 7, null);
//alert(Flavor.snapshotLength);
for (i=0; i<Flavor.snapshotLength; i++) {
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;padding: 2px 15px 2px 15px;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: none repeat scroll 0 0 #D6D6C2;border:0;display: block;margin: 0;"); //set the style to an inline style 
  NewData.setAttribute("colspan","2");
  NewData.innerHTML = Flavor.snapshotItem(i).innerHTML;  
  NewRow.appendChild(NewData);
  NewTable.appendChild(NewRow);
  Flavor.snapshotItem(i).parentNode.replaceChild(NewTable, Flavor.snapshotItem(i)); //replace the found node with my newly created table  
  }
  
Header = document.evaluate("//div[@id='detail']//h1", document, null, 7, null);
//alert(Header.snapshotLength);
for (i=0; i<Header.snapshotLength; i++) {
  TheText = Header.snapshotItem(i).innerHTML; //get the innerHTML if you want to do something to it later.
  //Header.snapshotItem(i).setAttribute("class",""); //erase the class
  //Header.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #4E5C2E;display: block;margin: 0;padding: 2px 15px 2px 30px;height: 38px;color: #FFFFFF;font-size: 1.09em;"); //set the style to an inline style
  }
 
//the Header h1 which stores ther name, level, and XP needs special handling
//===========================================================
DBLevelSearch = document.evaluate("//span[@class='level'] | //span[@class='thLevel']",document, null, 7, null);   //find the entire Level node
DBXPSearch = document.evaluate("//span[@class='level']//span[@class='xp'] | //span[@class='thLevel']//span[@class='thXP']",document, null, 7, null);   //find the XP node
DBXPText = DBXPSearch.snapshotItem(0).innerHTML; //get the innerHTML if you want to do something to it later.
//DBLevelSearch.snapshotItem(0).parentNode.removeChild(DBLevelSearch.snapshotItem(0)); //remove an entire node, from its parent remove its child
DBLevelSearch.snapshotItem(0).removeChild(DBXPSearch.snapshotItem(0));//remove the XP sub-node from the entire Level node
DBLevelText = DBLevelSearch.snapshotItem(0).innerHTML; //get the innerHTML if you want to do something to it later.
DBTypeSearch = document.evaluate("//div[@id='detail']//h1//span[@class='type'] | //div[@id='detail']//h1//span[@class='thSubHead']",document, null, 7, null);   //find the 'type' node
DBTypeText = DBTypeSearch.snapshotItem(0).innerHTML; //get the innerHTML if you want to do something to it later.
Header.snapshotItem(0).removeChild(DBTypeSearch.snapshotItem(0));//remove the Type sub-node from the entire Header node
Header.snapshotItem(0).removeChild(DBLevelSearch.snapshotItem(0));//remove the Level sub-node from the entire Header node
HeaderText = Header.snapshotItem(0).innerHTML;
//alert(HeaderText);

var searchRE = new RegExp('<br>','gi');  //regular expression search   'gi' means global (every instance, not just first one)
HeaderText = HeaderText.replace(searchRE,"");

//NewHeader = document.createElement('h1'); 
//NewHeader.setAttribute("class",Header.snapshotItem(0).getAttribute("class"));
//SpaceLength = 100-HeaderText.length-DBLevelText.length; 
//SpaceText = "";
//for (i=0; i<SpaceLength; i++) {
// SpaceText=SpaceText+"%A0";
// }
//MyTextNode = document.createTextNode(HeaderText+unescape(SpaceText)+DBLevelText);   //unescape("%20%20%20%A0%A0%A0%A0%A0")
//SpaceLength = 100-DBTypeText.length-DBXPText.length; 
//SpaceText = "";
//for (i=0; i<SpaceLength; i++) {
// SpaceText=SpaceText+"%A0";
// }
//MyTextNode2 = document.createTextNode(DBTypeText+unescape(SpaceText)+DBXPText);
//alert(HeaderText);

//NewHeader.appendChild(MyTextNode);
//NewHeader.appendChild(document.createElement('br')); 
//NewHeader.appendChild(MyTextNode2);
  NewTable = document.createElement('table');
  NewTable.setAttribute("style","margin: 0;border:0;border-bottom:0;width:100%;border-collapse: collapse;");
  NewRow = document.createElement('tr');
  NewData = document.createElement('td');
  NewData.setAttribute("style","background: #4E5C2E;margin: 0;border:0;padding: 2px 15px 2px 15px;height: 19px;color: #FFFFFF;font-size: 1.4em;font-weight:bold;"); //set the style to an inline style
  NewData.setAttribute("nowrap","true");
  NewData.innerHTML = HeaderText;  
  NewRow.appendChild(NewData);
  NewData1 = document.createElement('td');
  NewData1.setAttribute("style","background: #4E5C2E;margin: 0;border:0;padding: 2px 15px 2px 15px;height: 19px;color: #FFFFFF;font-size: 1.2em;font-weight:bold;;text-align:right"); //set the style to an inline style
  NewData1.setAttribute("nowrap","true");
  NewData1.innerHTML = DBLevelText;  
  NewRow.appendChild(NewData1);
  NewTable.appendChild(NewRow);
//second row
  NewRow2 = document.createElement('tr');
  NewData2 = document.createElement('td');
  NewData2.setAttribute("style","background: #4E5C2E;margin: 0;border:0;padding: 2px 15px 2px 15px;height: 19px;color: #FFFFFF;font-size: 0.917em"); //set the style to an inline style
  NewData2.setAttribute("nowrap","true");
  NewData2.innerHTML = DBTypeText;  
  NewRow2.appendChild(NewData2);
  NewData3 = document.createElement('td');
  NewData3.setAttribute("style","background: #4E5C2E;margin: 0;border:0;padding: 2px 15px 2px 15px;height: 19px;color: #FFFFFF;font-size: 0.917em;text-align:right"); //set the style to an inline style
  NewData3.setAttribute("nowrap","true");
  NewData3.innerHTML = DBXPText;  
  NewRow2.appendChild(NewData3);
  NewTable.appendChild(NewRow2);
  //Header.snapshotItem(0).innerHTML = NewTable.innerHTML;
  Header.snapshotItem(0).parentNode.replaceChild(NewTable, Header.snapshotItem(0)); //replace the found node with my newly created table  
//alert(DBLevelText);
 
Header = document.evaluate("//div[@id='detail']//h1[monster]", document, null, 7, null);
for (i=0; i<Header.snapshotLength; i++) {
  TheText = Header.snapshotItem(i).innerHTML; //get the innerHTML if you want to do something to it later.
  Header.snapshotItem(i).setAttribute("class",""); //erase the class
  Header.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #4E5C2E;display: block;margin: 0;padding: 2px 15px 2px 15px;height: 38px;color: #FFFFFF;font-size: 1.09em;line-height: 2;width:100%;"); //set the style to an inline style
  }
  
Header = document.evaluate("//div[@id='detail']//h1[trap] | //h2[@class='thHead'] | //h1[@class='thHead']", document, null, 7, null);
for (i=0; i<Header.snapshotLength; i++) {
  TheText = Header.snapshotItem(i).innerHTML; //get the innerHTML if you want to do something to it later.
  Header.snapshotItem(i).setAttribute("class",""); //erase the class
  Header.snapshotItem(i).setAttribute("style","background: none repeat scroll 0 0 #45133C;display: block;margin: 0;padding: 2px 15px 2px 15px;height: 38px;color: #FFFFFF;font-size: 1.09em;line-height: 2;width:100%;"); //set the style to an inline style
  }

var url = window.location.toString();
//alert(url);
//if(document.getElementsByTagName('body')[0].innerHTML.match(/trap/i)) {
if (url.match(/trap/i)) {
	//after editing - text replacements
	var searchRE = new RegExp('#4E5C2E','gi');  //regular expression search   'gi' means global (every instance, not just first one)
	document.body.innerHTML= document.body.innerHTML.replace(searchRE,"#45133C"); //change the green monster color to the purple trap color
}


//after editing type text replacements
//var searchRE = new RegExp('damage','gi');  //regular expression search   'gi' means global (every instance, not just first one)
//document.body.innerHTML= document.body.innerHTML.replace(searchRE,"gggg");

//var searchRE2 = new RegExp("\\+\\s?[0-9]",'gi');  //regular expression search   'gi' means global (every instance, not just first one)
//var regexresults = document.body.innerHTML.match(searchRE2);
//for (i=0; i<regexresults.length; i++) {    
 //alert(regexresults[i]);  //popup a message for every instance found.
//}

//document.body.innerHTML= document.body.innerHTML.replace(searchRE2,"PLUS");
//document.body.innerHTML= document.body.innerHTML.replace("damage","gggg");
//document.body.innerHTML= document.body.innerHTML.replace(/<td>10<span class=\"grey\">.<\/span>019<\/td>/g,"<td>done.<\/td>");