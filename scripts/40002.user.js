// ==UserScript==
// @name           anandmaratha
// @namespace      http://userscripts.org/users/77187
// @description    Displays photos & profile on the listing page itself
// @include        http://www.anandmaratha.com/g_list.htm
// @include        http://www.anandmaratha.com/g_list1.htm
// @include        http://www.anandmaratha.com/g_list2.htm
// @include        http://www.anandmaratha.com/g_list3.htm
// @include        http://www.anandmaratha.com/g_list4.htm
// @include        http://www.anandmaratha.com/g_list5.htm
// @include        http://www.anandmaratha.com/g_list6.htm
// @include        http://www.anandmaratha.com/g_list7.htm
// @include        http://www.anandmaratha.com/g_list8.htm
// @include        http://www.anandmaratha.com/g_list9.htm
// @include        http://www.anandmaratha.com/g_list10.htm
// @include        http://www.anandmaratha.com/g_list11.htm
// @include        http://www.anandmaratha.com/g_list12.htm
// @include        http://www.anandmaratha.com/g_list13.htm
// @include        http://www.anandmaratha.com/g_list14.htm
// @include        http://www.anandmaratha.com/g_list15.htm
// @include        http://www.anandmaratha.com/g_list16.htm
// @include        http://www.anandmaratha.com/g_list17.htm
// @include        http://www.anandmaratha.com/g_list18.htm
// @include        http://www.anandmaratha.com/g_list19.htm
// @include        http://anandmaratha.com/g_list.htm
// @include        http://anandmaratha.com/g_list1.htm
// @include        http://anandmaratha.com/g_list2.htm
// @include        http://anandmaratha.com/g_list3.htm
// @include        http://anandmaratha.com/g_list4.htm
// @include        http://anandmaratha.com/g_list5.htm
// @include        http://anandmaratha.com/g_list6.htm
// @include        http://anandmaratha.com/g_list7.htm
// @include        http://anandmaratha.com/g_list8.htm
// @include        http://anandmaratha.com/g_list9.htm
// @include        http://anandmaratha.com/g_list10.htm
// @include        http://anandmaratha.com/g_list11.htm
// @include        http://anandmaratha.com/g_list12.htm
// @include        http://anandmaratha.com/g_list13.htm
// @include        http://anandmaratha.com/g_list14.htm
// @include        http://anandmaratha.com/g_list15.htm
// @include        http://anandmaratha.com/g_list16.htm
// @include        http://anandmaratha.com/g_list17.htm
// @include        http://anandmaratha.com/g_list18.htm
// @include        http://anandmaratha.com/g_list19.htm
// ==/UserScript==

var allElements, thisElement, l1Frames, l1FrmEle, profileRows, listingDocument;
var idCell      = new Array();
var j=0;

function processProfileRows()
{
    profileRows = listingDocument.getElementsByTagName('td');

    for (var l = 0; l < profileRows.length; l++)
    {
        if((profileRows[l].width = 147) && (profileRows[l].height = 26))
        {
            if( (profileRows[l].childNodes[0] != null) &&
                (profileRows[l].childNodes[0].childNodes[0] != null) &&
                (profileRows[l].childNodes[0].childNodes[0].nodeName == 'A'))
            {
                profileId = profileRows[l].childNodes[0].childNodes[0].innerHTML;

                var idPat = /^MG/;
                if(idPat.test(profileId))
                {
                    var brObj;

                    profileId = profileId.replace(/^MG/, "mg");
                    profileId = profileId.replace(/[ \t\n\r]*$/g, "");
                    profileId = profileId.replace(/^[ \t\n\r]*/g, "");
                    idCell[profileId] = profileRows[l];

                    brObj = document.createElement("br");
                    idCell[profileId].appendChild(brObj);

                    var imageObj = document.createElement("img");
                    imageObj.id = profileId + "_img";
                    imageObj.src = "http://www.anandmaratha.com/"+profileId+".jpg";
                    imageObj.style.maxHeight = 400;
                    idCell[profileId].appendChild(imageObj);

                    brObj = document.createElement("br");
                    idCell[profileId].appendChild(brObj);

                    var buttonObj = document.createElement("button");
                    buttonObj.type = "button";
                    buttonObj.innerHTML = "Show Profile";
                    var btnClickCode = 'this.nextSibling.style.display = \"block\";'
                        +'this.previousSibling.previousSibling.style.display = \"none\";'
                        ;
                    buttonObj.setAttribute('onclick', btnClickCode);
                    idCell[profileId].appendChild(buttonObj);

                    var divObj = document.createElement("div");
                    divObj.style.display = "none";
                    divObj.id = profileId + "_prof_data";
                    idCell[profileId].appendChild(divObj);

                    var profFrameObj = document.createElement("iframe");
                    profFrameObj.src = "http://www.anandmaratha.com/bio-data/"+profileId+".htm";
                    profFrameObj.frameBorder= 0;
                    profFrameObj.scrolling = 'no';
                    profFrameObj.width = 810;
                    profFrameObj.height = 430;
                    divObj.appendChild(profFrameObj);

                    var buttonObj = document.createElement("button");
                    buttonObj.type = "button";
                    buttonObj.innerHTML = "Hide Profile";
                    var btnClickCode = ''
                        +'this.parentNode.style.display = \"none\";'
                        +'this.parentNode.previousSibling.previousSibling.previousSibling.style.display = \"block\";'
                        ;
                    buttonObj.setAttribute('onclick', btnClickCode);
                    divObj.appendChild(buttonObj);

                    brObj = document.createElement("br");
                    idCell[profileId].appendChild(brObj);
                    brObj = document.createElement("br");
                    idCell[profileId].appendChild(brObj);

                    //if(++j > 5)
                    //{
                    //    break;
                    //}
                }
            }
        }
    }
}

function checkAllRowsLoaded()
{
    var profileTrs = l1FrmEle.contentDocument.getElementsByTagName('tr');

    if( (profileTrs != null) &&
        (profileTrs.length != null) &&
        (profileTrs.length >= 50))
    {
        listingDocument = l1FrmEle.contentDocument;
        processProfileRows();
        return;
    }
    else
    {
        setTimeout(checkAllRowsLoaded, 1000);
    }
}

function processL1Frame()
{
    for (var k = 0; k < l1Frames.length; k++)
    {
        l1FrmEle = l1Frames[k];

        if(l1FrmEle.src == 'http://www.anandmaratha.com/g_list0.htm')
        {
            setTimeout(checkAllRowsLoaded, 2000);
            return;
        }
    }
}

function checkL1FramesLoaded()
{
    l1Frames = thisElement.contentDocument.getElementsByTagName('frame');

    if( (l1Frames != null) &&
        (l1Frames.length != null) &&
        (l1Frames.length >= 2))
    {
        processL1Frame();
        return;
    }
    else
    {
        setTimeout(checkL1FramesLoaded, 100);
    }
}

function processHighestLevelFrame()
{
    for (var i = 0; i < allElements.length; i++)
    {
        thisElement = allElements[i];

        if(thisElement.src == 'http://www.anandmaratha.com/g_listx.htm')
        {
            checkL1FramesLoaded();
            return;
        }
    }

}

function checkAllFramesLoaded()
{
    allElements = document.getElementsByTagName('frame');
    var allTds = document.getElementsByTagName('tr');

    if( (allElements != null) &&
        (allElements.length != null) &&
        (allElements.length >= 2))
    {
        processHighestLevelFrame();
        return;
    }
    else if( (allTds != null) &&
        (allTds.length != null) &&
        (allTds.length >= 50))
    {
        listingDocument = document;
        processProfileRows();
        return;
    }
    else
    {
        setTimeout(checkAllFramesLoaded, 100);
        return;
    }
}

//main()
//wait until page loads
setTimeout(checkAllFramesLoaded, 100);




