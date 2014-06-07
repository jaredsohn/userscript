// ==UserScript==
// @name        HTML.it - BuddyChrist
// @include     http://forum.html.it/forum/*
// @version     1.1
// @Grant       none
// ==/UserScript==

// Chiedo venia a chi sa davvero JavaScript, purtroppo sono inabile al JS :(

var buddyChristURL="http://img255.imageshack.us/img255/1624/buddychrist11.jpg";
var hahaURL="http://img3.imageshack.us/img3/8622/hahabg.png";

function buddyze()
{
    var buddyPage=false;
    var metas = document.getElementsByTagName('meta');
    for(i=0; i<metas.length; i++)
    { 
        if(metas[i].getAttribute("http-equiv").toLowerCase() == "refresh")
            buddyPage=true;
    }
    if(!buddyPage)
        return false;
    var spans = document.getElementsByTagName('span');
    for(i=0; i<spans.length; i++)
    {
        if(spans[i].getAttribute("class").toLowerCase()=="norm")
        {
            spans[i].innerHTML=spans[i].innerHTML.replace(/\./,". <br /><br /><img src=\""+buddyChristURL+"\" /><br /><br />");
            break;
        }
    }
    return true;
}

function hahaize()
{
    var bs = document.getElementsByTagName('b');
    for(i=0; i<bs.length; i++)
    {
        if(bs[i].innerHTML=="Messaggio dal forum")
        {
            tbody=bs[i].parentNode.parentNode.parentNode.parentNode;
            if(tbody.nodeName.toLowerCase()!="tbody")
                return false;
            var tr=document.createElement("tr");
            tr.width="100%";
            var td=document.createElement("td");
            td.style.textAlign="center";
            var img=document.createElement("img");
            img.src=hahaURL;
            td.appendChild(img);
            tr.appendChild(td);
            tbody.appendChild(tr);
            return true;
        }
    }
    return false;
}


function main()
{
    if (document.title!="HTML.it forum | HTML.it forum")
        return;
    return buddyze() || hahaize();
}

main();
