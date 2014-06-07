// ==UserScript==
// @name          googlereadersearch
// @namespace     arunr.org
// @description   reduces font size and enables inline search and highlighting in the Google Reader 'list view'.
// @include http://google.com/reader/*
// @include http://www.google.com/reader/*
// ==/UserScript==

function myFindBox()
{
       var bodyElem = document.getElementsByTagName('body')[0];

       // Create search box
       var myBox = document.createElement('div');
       myBox.id = 'myFindBox';
       myBox.style.backgroundColor = 'black';
       myBox.style.opacity = 0.6;
       myBox.style.border = '2px solid black';
       myBox.style.backgroundColor = 'black';
       myBox.style.zIndex = 10000000;
       myBox.style.top = '80px';
       myBox.style.right = '10px';
       myBox.style.padding = '1px';
       myBox.style.position = 'fixed';

       // A header for the box
       var headerBox = document.createElement('h2');
       headerBox.style.fontSize = '13px';
       headerBox.style.margin = 0;
       headerBox.style.padding = '1px';
       headerBox.innerHTML = '<font color=white>Searchify!</font>';

       // Create a 'p' element for general comments
       var myComment = document.createElement('p');
       myComment.id = 'myComment';
       myComment.style.color = 'white';
       myComment.style.margin = 0;
       myComment.style.padding = '1px';
       myComment.style.display = 'none';

       // An options element
       var myOptions = document.createElement('select');
       myOptions.id='myOptions';

       var optionsArray = new Array('unread','all');
       for(var i=0;i<optionsArray.length;i++)
       {
               var myEachOption = document.createElement('option');
               myEachOption.value = optionsArray[i];
               myEachOption.text = optionsArray[i];
               myEachOption.style.fontSize = '13px';
               myOptions.appendChild(myEachOption);
       }

       // Create form
       var myInputTag = document.createElement('input');
       myInputTag.id = 'myInputTag';
       myInputTag.type = 'text';

       var myInputButton = document.createElement('input');
       myInputButton.id = 'myInputButton';
       myInputButton.type = 'submit';
       myInputButton.value = 'Go!';

       var myClearButton = document.createElement('input');
       myClearButton.id = 'myClearButton';
       myClearButton.type = 'submit';
       myClearButton.value = 'Clear!';

       // Attach the comment box and form to the box
       myBox.appendChild(headerBox);
       myBox.appendChild(myInputTag);
       myBox.appendChild(myInputButton);
       myBox.appendChild(myClearButton);
       myBox.appendChild(myOptions);
       myBox.appendChild(myComment);

       // Attach box to the body
       bodyElem.appendChild(myBox);

       // Attach events to the box
       var myButton = document.getElementById('myInputButton');
       var myClearButton = document.getElementById('myClearButton');
       myButton.addEventListener('click',searchThis,false);
       myClearButton.addEventListener('click',clearMyStyles,false);
}

// Searches the keywords in all snippets
function searchThis(option)
{
       clearMyStyles(); // Clear styles before applying new ones
       var mySnippetCounter = 0;
       var myTitleCounter = 0;
       var myKeywords = document.getElementById('myInputTag').value;
       if(!myKeywords)
       {
               alert('Type a keyword');
               return false;
       }
       var myRegex = new RegExp(myKeywords,"gi");

       var myEntries = document.getElementById('entries');
       var myEntriesDiv = myEntries.getElementsByTagName('div');
       var myTitles = myEntries.getElementsByTagName('h2');
       var myDivsLength = myEntriesDiv.length;
       var myTitlesLength = myTitles.length;

       // Get the selected options
       var searchOpt = document.getElementById('myOptions').value;
       var searchOptions = new Array();
       if (!searchOpt || searchOpt == 'all')
       {
               searchOptions[0] = 'entry';
               searchOptions[1] = 'entry read';
       }
       else if (searchOpt == 'unread')
       {
               searchOptions[0] = 'entry';
       }


       for(var j=0;j<myDivsLength;j++)
       {
               for (var opt=0;opt<searchOptions.length;opt++)
               {
                       if(myEntriesDiv[j].getAttribute('class') == searchOptions[opt])
                       {
                               var mySpans = myEntriesDiv[j].getElementsByTagName('span'); // Search through snippets
                               var mySpansLength = mySpans.length;
                               for(var i=0;i<mySpansLength;i++)
                               {
                                       if(mySpans[i].getAttribute('class') == 'snippet')
                                       {
                                               var mySnippetText = mySpans[i].firstChild.data;
                                               //console.log('Matching '+myKeywords+' in '+mySnippetText);
                                               if(myRegex.test(mySnippetText))
                                               {
                                                       mySpans[i].style.backgroundColor = "#D3FF80";
                                                       mySnippetCounter++;
                                               }
                                       }
                               }

                               var myTitles = myEntriesDiv[j].getElementsByTagName('h2'); // Search through titles
                               var myTitlesLength = myTitles.length;
                               for (var k=0;k<myTitlesLength;k++)
                               {
                                       var thisTitle = myTitles[k].firstChild.data;
                                       if(myRegex.test(thisTitle))
                                       {
                                               myTitles[k].style.backgroundColor = "#F9CFA7";
                                               mySnippetCounter++;
                                       }
                               }
                       }
               }
       }
       toggleComment(mySnippetCounter,'show');
}

function toggleComment(count,flag)
{
       var myComment = document.getElementById('myComment');
       myComment.innerHTML = count+' items found!';
       if (flag == 'show')
       {
               myComment.style.display="block";
       }
       else
       {
               myComment.style.display="none";
       }
}

function clearMyStyles()
{
       toggleComment(0,'hide');

       // Clear styles from previously colored snippets
       var myEntries = document.getElementById('entries');
       var mySpans = myEntries.getElementsByTagName('span');
       var mySpansLength = mySpans.length;

       for(var i=0;i<mySpansLength;i++)
       {
               if(mySpans[i].getAttribute('class') == 'snippet')
               {
                       //console.warn(mySpans[i].style.backgroundColor);
                       if(mySpans[i].style.backgroundColor)
                       {
                               mySpans[i].style.backgroundColor = '';
                       }
               }
       }

       // Clear styles from previously colored titles
       var myTitles = myEntries.getElementsByTagName('h2');
       var myTitlesLength = myTitles.length;
       for (var k=0;k<myTitlesLength;k++)
       {
               if (myTitles[k].style.backgroundColor)
               {
                       myTitles[k].style.backgroundColor = '';
               }
       }
}

function generalStyle(id)
{
       var myElem = document.getElementById(id);
       myElem.style.fontSize = "11px";
       myElem.style.fontFamily = "Arial, sans-serif";
}


function styleLeftPanel()
{
 generalStyle('sub-tree-container');
}

function styleEntries()
{
 generalStyle('entries');
}

function styleTopLeftTable()
{
 generalStyle('selectors-box');
 generalStyle('add-box');
}

function styleTopRightTable()
{
 generalStyle('global-info');
}

window.addEventListener("load",styleLeftPanel,false);
window.addEventListener("load",styleEntries,false);
window.addEventListener("load",styleTopRightTable,false);
window.addEventListener("load",styleTopLeftTable,false);
window.addEventListener("load",myFindBox,false);
