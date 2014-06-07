// ==UserScript==
// @name           MarathaMarriage
// @namespace      http://sites.google.com/site/greasemonkeyscripts
// @description    Show photos on bride's listing page itself
// @include        http://www.marathamarriage.com/brides.php*
// ==/UserScript==

//alert("modifying page");

allTrs = document.getElementsByTagName('tr');

var j = 0;

for(var i = 0; i < allTrs.length; i++)
{
    if(
            (allTrs[i].childNodes[1] != null) &&
            (allTrs[i].childNodes[1].nodeName == 'TD') &&
            (allTrs[i].childNodes[1].childNodes[1] != null) &&
            (allTrs[i].childNodes[1].childNodes[1].nodeName == 'A')&&
            (allTrs[i].childNodes[1].childNodes[1].childNodes[0] != null) &&
            (allTrs[i].childNodes[1].childNodes[1].childNodes[0].nodeName == 'FONT') &&
            (allTrs[i].childNodes[1].childNodes[1].childNodes[0].childNodes[0] != null) &&
            (allTrs[i].childNodes[1].childNodes[1].childNodes[0].childNodes[0].nodeName == 'B')
      )
    {
        var profileRow = allTrs[i];
        var profileId = allTrs[i].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML;
        var profileIdCell = allTrs[i].childNodes[1];
        var brObj;

        brObj = document.createElement("br");
        profileIdCell.appendChild(brObj);

        var imageObj = document.createElement("img");
        imageObj.id = profileId + "_img";
        imageObj.src = "http://www.marathamarriage.com/uploadimage/"+profileId.toLowerCase()+".jpg";

        imageObj.style.maxHeight = 400;
        profileIdCell.appendChild(imageObj);

        brObj = document.createElement("br");
        profileIdCell.appendChild(brObj);

        var buttonObj = document.createElement("button");
        buttonObj.type = "button";
        buttonObj.innerHTML = "Show Profile";
        var btnClickCode = 'this.nextSibling.style.display = \"block\";'
            +'this.previousSibling.previousSibling.style.display = \"none\";'
            ;
        buttonObj.setAttribute('onclick', btnClickCode);
        profileIdCell.appendChild(buttonObj);

        var divObj = document.createElement("div");
        divObj.style.display = "none";
        divObj.id = profileId + "_prof_data";
        profileIdCell.appendChild(divObj);

        var profFrameObj = document.createElement("iframe");
        profFrameObj.src = "http://www.marathamarriage.com/member.php?id="+profileId;
        profFrameObj.frameBorder= 0;
        //profFrameObj.scrolling = 'no';
        profFrameObj.width = 780;
        profFrameObj.height = 630;
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
        profileIdCell.appendChild(brObj);
        brObj = document.createElement("br");
        profileIdCell.appendChild(brObj);

        //if(++j > 0)
        //{
            //break;
        //}
    }
}

//alert("done");