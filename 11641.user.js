// ==UserScript==
// @name          DesiringGodArticleLink    
// @description	  Adds a link to the menu at the top of the page which opens the main article as a separate page (easier to read). The link is entitled 'article page' and will show only when there is a main article displayed.
// @include       http://www.desiringgod.org/*
// @author        richardtrimble@hotmail.com
// ==/UserScript==


//alert('test the page to see if there is a main article');
var test = false; 
var testcontent=document.getElementsByTagName('div'); 
for (var i=0;  i<testcontent.length; i++) { 
if(testcontent[i].className=='EntryColLeft'){ 
test = true;  
} 
}

if(!test) {
//alert('no article found so stop running');
return;
}


//alert('now find the utility bar');
var results =
   document.evaluate("//div[@class='UtilityBar']",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
var divnode = results.singleNodeValue;
var utilitybarcode = divnode.innerHTML;

//alert(utilitybarcode);

//alert('create a new link');
var articlepagelink = document.createElement("a");

//alert('put an inline image inside the link');
articlepagelink.innerHTML = '<IMG SRC="data:image/gif;base64,R0lGODlhRgAVAKEAAICAgP///4CAgICAgCH5BAEKAAIALAAAAABGABUAAAJijI+py+0Po5y02ouz3gjwD4biSGJeiU7AubJr4Hqn0c7wS8/tjas0/AMCbcQFSyjrPGyd3S6YPBB7uVjy9aQcj0hh8KuU/ramMRSKdWa9XR6PKU7J5/R6Cm7P6/f8vv//UAAAOw==">';

//alert('insert the image at the end of the utility bar');
divnode.insertBefore(articlepagelink, divnode.lastChild.nextSibling);

//alert('set the link to some code to extract the article');
articlepagelink.href = "javascript:var text; var content=document.getElementsByTagName('div'); for (var i=0;  i<content.length; i++) { if(content[i].className=='EntryColLeft'){ text = content[i].innerHTML;  } } var head=document.getElementsByTagName('head');headtext = head[0].innerHTML;imgWindow=window.open('','imgWin');imgWindow.document.write('<HTML><HEAD>'+headtext+'<STYLE type=\"text/css\">h1, h2, h3, h4, h5 {font-weight: bold;}</STYLE></HEAD><BODY style=\"font-size:90%;line-height:120%;\"><DIV id=\"EntryColLeft\">'+text+'</DIV></BODY></HTML>');imgWindow.document.close()";








