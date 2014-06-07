// ==UserScript==
// @name       Danbooru Tags
// @namespace  http://www.reddit.com/user/ImANewRedditor
// @version    0.2
// @description  Tag aggregator.
// @match      http://danbooru.donmai.us/*
// @copyright  2012+, You
// ==/UserScript==

var buttonLocation = document.getElementsByTagName("h1")[0], tagButton = document.createElement("BUTTON"), tagText = document.createTextNode("Get Tags");

function makeWindow(tags, count)
{
    var k = 0, windowSpecs = '', display = "", myWindow = "", z = 0, tempArray = [], average = 0;
    
    windowSpecs += 'height=' + screen.availHeight + ',width=' + screen.availWidth;
    
    myWindow = window.open('','',windowSpecs);
    
    
    for (k=0;k < count.length;k++)
    {
        average += count[k];
    }
    
    average /= count.length;
    // Determine how much above average a tag should be to display it.
    average *= 2;
    average = Math.ceil(average);
    
    for (k=0;k < tags.length;k++)
    {
        if (count[k] >= average)
        {
            tempArray.push("<p>" + tags[k] + ": " + count[k] + "</p>");
        }
    }
    
    display = "<p>" + tempArray.length + " tags out of " + tags.length + " above " + average + ":</p>";
    myWindow.document.write(display);
    
    if (tempArray.length > 0)
    {
        for (k=0;k < tempArray.length; k++)
        {
            myWindow.document.write(tempArray[k]);
        }
    }
    else
    {
        myWindow.document.write("<p>No tags.</p>");
    }
    
    myWindow.focus();
}

function tagging()
{
    var imageCont = document.getElementsByTagName("article"), x, c, tagArray = [], tempArray = [], countArray = [], holder, output = "";
    for (x=0; x < imageCont.length;x++)
    {
        tempArray = imageCont[x].dataset.tags.split(" ");
        for (c = 0; c < tempArray.length; c++)
        {
            holder = tagArray.indexOf(tempArray[c]);
            if (holder == -1)
            {
                tagArray.push(tempArray[c]);
                countArray.push(1);
            }
            else
            {
                countArray[holder] += 1;
            }
        }
    }
    if (tagArray.length > 0)
    {
        makeWindow(tagArray, countArray);
    }
    else
    {
        alert("No tags.");
        tagButton.disabled = true;
    }
}

// Only add Get Tags button on search page.
if (document.URL.match("posts/") == null || document.URL == "http://danbooru.donmai.us/")
{
    // Add text to button, add click event, and append button to header
    tagButton.appendChild(tagText);
    tagButton.onclick = tagging;
    buttonLocation.appendChild(tagButton);
}