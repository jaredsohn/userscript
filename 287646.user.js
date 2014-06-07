// ==UserScript==
// @name        Censor
// @namespace   censor
// @description Don't see what you don't want to see
// @include     http://index.hu/*
// @include     http://velvet.hu/*
// @include     http://divany.hu/*
// @version     1
// @grant       none
// ==/UserScript==

//Simple hiding fun
var hideDiv = function (id)
{
    var dDiv = document.getElementById(id);
    
    if(dDiv)
    {
        dDiv.parentNode.removeChild(dDiv);
    }
    else
    {
        dDiv=document.getElementsByClassName(id);
        if(dDiv)
        {
        
            while(0<dDiv.length)
            {
                dDiv[0].parentNode.removeChild(dDiv[0]);

            }
        }
    }
}

//Search & Destroy
var sd = function (className, contentWord)
{
    var t = document.getElementsByClassName(className);
    if(!t){return;}
    for(var i=0; i<t.length; i++)
    {
        if(t[i].innerHTML.search(contentWord)!=-1)
        {
            t[i].parentNode.removeChild(t[i]);
            i--;
            //t[i].style.color="red";
        }
    }
}

var divsToHide=["velvet_container",'divany_container','tc_container','portfolio_container',
'medialepedo',"shopline-footer","tulelokeszlet_szeles","also_bannerek","rotate_ongo_ctravel_travelo",
"napig_cimlap_box","inforadio_cimlap_bottom","expresszbox","goAdverticum",
"ajanlo_accordion"];

for(var i=0; i<divsToHide.length; i++)
{
    hideDiv(divsToHide[i]);
}

sd("anyag","gyilkos");
sd("anyag","kínozta");
sd("anyag","VV");
sd("anyag","erőszakoltak");
sd("anyag","Megölt");

sd("indicator","gyilkos");
sd("indicator","kínozta");
sd("indicator","VV");
sd("indicator","erőszakoltak");
sd("indicator","Megölt");
