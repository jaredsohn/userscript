// ==UserScript==
// @name           make 012's billing site usable
// @namespace      Ethan Shalev
// @description    modifies the look and behavior of 012's web site
// @include        http*://www.012bill.net/goldline/*

// ==/UserScript==

//reenable context-menu
document.body.setAttribute("oncontextmenu","true");

// make table take up as much space as it needs
divtable = document.evaluate(
    "//div[@class='divtable']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

divtable.style.height = 'auto';
divtable.style.width = 'auto';
divtable.style.overflow = 'visible';

// get rid of strange '''' on top of page
dash = document.getElementsByTagName('q');
for (var i = 0; i < dash.length; i++) {
    q = dash[i];
    q.style.display = "none";
}


var selected;
var unselected = 'יש לבחור חשבונית';

var chkItem = document.createElement("script");
chkItem.setAttribute('type','text/javascript');
chkItem.text="";
chkItem.text+="function getSelectedItem(){";
chkItem.text+="    selected=document.evaluate(\"//input[@id='chkItem']\",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);";
chkItem.text+="    for (var i=0;i<selected.snapshotLength;i++){";
chkItem.text+="        thisChkItem=selected.snapshotItem(i);";
chkItem.text+="        if (thisChkItem.checked){";
chkItem.text+="            selected=thisChkItem.value;";
chkItem.text+="        }";
chkItem.text+="    }";
chkItem.text+="}";
document.body.appendChild(chkItem);

var isSelected = document.createElement("script");
isSelected.setAttribute('type','text/javascript');
isSelected.text="";
isSelected.text+="function isItemSelected(){";
isSelected.text+="    getSelectedItem();";
isSelected.text+="    if (selected != '[object XPathResult]')";
isSelected.text+="      return true;";
isSelected.text+="    else {";
isSelected.text+="      alert(\""+unselected+"\");";
isSelected.text+="      return false;";
isSelected.text+="    }";
isSelected.text+="}";
document.body.appendChild(isSelected);

// enable printing
var printer = document.createElement("script");

printer.setAttribute('type','text/javascript');
printer.text="";
printer.text+="function PrintDoc(sessionID){";
printer.text+="  if (isItemSelected())";
printer.text+="     window.open(\"https://www.012bill.net/GoldLine/xdoc.asp?FunctionName=PrintDoc&SessionId=\" + sessionID + \"&PrintDoc_DocId_=\" + selected + \"&XSLSuffix_=print\");";
printer.text+="}";
document.body.appendChild(printer);

// enable downloading
var download = document.createElement("script");
download.setAttribute('type','text/javascript');
download.text="";
download.text+="function DownLoadDoc(sessionID){";
download.text+="  if (isItemSelected())";
download.text+="    window.open(\"https://www.012bill.net/GoldLine/XDocDownload.asp?FunctionName=AllPages&XSL=CSVPage&NoSessionTag=1&PostXSL=csv&SessionId=\" + sessionID + \"&AllPages_DocID=\" + chkItem);";
download.text+="}";
document.body.appendChild(download);