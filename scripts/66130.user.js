// ==UserScript==
// @name           eUK Training Ground Script
// @namespace      http://www.erepublik.com/en/referrer/malta_1990
// @description     a script for a British-themed training ground in eRepublik based on an eUS script made by Publius
// @include        http://ww*.erepublik.com/en/my-places/army
// ==/UserScript==

function replace_generals()
{
    //Replace the advanced trainers with US-centric leaders
    var alexander = document.evaluate("/html/body/div[2]/div[4]/div[2]/div[2]/div[2]/div[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    alexander.snapshotItem(0).innerHTML = ' <a href="/en/my-places/train/1"> <h4>+50%</h4> <small><b>extra</b> training effect</small> <img src="http://xs.to/image-5D61_4B3B3A18.jpg" alt="Lana_2" height="96" width="106">               <strong>Sir Francis Drake</strong> <h6>0.5</h6> </a><a class="fluid_blue_dark_big" href="/en/my-places/train/1"><span>Advanced Training &amp; Strategy</span></a>';
        
    var caesar = document.evaluate("/html/body/div[2]/div[4]/div[2]/div[2]/div[2]/div[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    caesar.snapshotItem(0).innerHTML = ' <a href="/en/my-places/train/2"> <h4>+100%</h4> <small><b>extra</b> training effect</small> <img src="http://xs.to/image-02C3_4B3B3A18.jpg" alt="Lana_3" height="96" width="106">               <strong>Lord Nelson</strong> <h6>1</h6> </a><a class="fluid_blue_dark_big" href="/en/my-places/train/2"><span>Advanced Training &amp; Strategy</span></a>';

    var napoleon = document.evaluate("/html/body/div[2]/div[4]/div[2]/div[2]/div[2]/div[4]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    napoleon.snapshotItem(0).innerHTML = '<a href="/en/my-places/train/3"><h4>+200%</h4><small><b>extra</b> training effect</small><img src="http://xs.to/image-63D7_4B3B3A18.jpg" alt="Lana_5" height="96" width="106">               <strong>Duke of Wellington</strong><h6>1.8</h6></a><a class="fluid_blue_dark_big" href="/en/my-places/train/3"><span>Advanced Training &amp; Strategy</span></a>';
}

//Replace Lana
GM_addStyle('.lana_holder { background-image:url(http://img341.imageshack.us/img341/3024/newlana.gif);}');

replace_generals();
 
