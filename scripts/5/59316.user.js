// ==UserScript==
// @name           FreeGifter
// @namespace      IWINs
// @description    ItGiftsEmAll
// @include        http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=interstitial*


var GiftPageCount=0;

//This is the ID of the Inside Tips graphic
var thirdPage = document.getElementById('app10979261223_i_g_0_21');

//Need to make sure we are on ANY gift page. This stops the script from refreshing the home page.
var firstPage = document.getElementById('app10979261223_i_g_3_41');
var secondPage = document.getElementById('app10979261223_i_g_4_1');


if (firstPage || secondPage || thirdPage){

//Moved this up here, Since it's called right away, define it before it's called
//Scrotal moved this. I never got this to work quite right, and now neither the
//GiftSendCountKey or the GiftPageCountKey clear at the end. So I clear them
//manually before invoking the script. Maybe this needs a monkeyface selection
//to fire the whole process off.


//The GiftSendKey counts the number of final gift send windows that are up
//That way, each instance on the script knows when to click the final button


//The GiftPageCountKey is the counter for the number of tabs open with the
//correct gift graphic on it. Set for Inside Tips, and 5 tabs.

GiftPageCount = GM_getValue('GiftPageCountKey', 0);

if (thirdPage)
{
    GiftPageCount = GM_getValue('GiftPageCountKey', 0);
    GiftPageCount++;
    GM_setValue('GiftPageCountKey', GiftPageCount);

    if (GiftPageCount < 30)
    {
        GM_openInTab("http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=interstitial&xw_action=view")
    }
} 
else
{
    document.location.reload();
}


//After the correct gift graphic is found, we click all the buttons to get to
//the final send button, and waits. I tried to make all the click functions the
//same or at least similar, but, one method didn't work in all cases, and I
//don't know why. Well, I understand the array methods.

if (thirdPage)
{
    setTimeout(clickGift, 2000);
    setTimeout(clickProceed, 3000);
    setTimeout(select5, 8000);
    setTimeout(clickSend, 10000);
    setTimeout(gohere, 13000);
}

}


//This is the wait function. It toggles between gohere() & gothere() and keeps
//checking for the 5 send pages to be up and ready.... then calls the function
//to click 

function gohere()
{
    GiftSendCount = GM_getValue('GiftSendCountKey', 0);
    if (GiftSendCount < 30)
    {
        setTimeout(gothere, 1000);
    }

    if (GiftSendCount >= 30)
    {
        setTimeout(clickSendIt, 15000);
    }
}

function gothere()
{
    GiftSendCount = GM_getValue('GiftSendCountKey', 0);
    setTimeout(gohere, 1000);
}


//This clicks the gift graphic
//Killed the IE nonsense

function clickGift()
{
    var target=document.getElementById("app10979261223_i_g_0_21");

    if (target)
    {
        if(document.dispatchEvent) 
        {
            var oEvent = document.createEvent( "MouseEvents" );
            oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
            target.dispatchEvent( oEvent );
        }
    }
}


//Clicks the Proceed to Send button. There's 2 of them, which is why I needed an array

function clickProceed()
{
    var inputs = document.getElementsByName('do');
    inputs[0].click();
}


//Clicks the top 5 friends in the list. The loop was a great addition Scrotal, but
//on one of my drones, I have a non-drone friend in spot 4 that I wanted to skip, so
//I had to go back to the other version of this function, which I'll put here later
//in comments. Making a special version for him seems stupid, but that's all I
//got at the moment. I think it just said inputs[0].click();inputs[1].click();, etc.

function select5()
{
    var inputs = document.getElementsByName('ids[]');
    inputs[6].click();
    //for( var i = 0; i < 6; i++ )
    //{
    //inputs[i].click();
    //}
}


//This clicks the last send button, which pops up the final send window.

function clickSend()
{
    var inputs = document.getElementById('send');
    inputs.click();
    GiftSendCount = GM_getValue('GiftSendCountKey', 0);
    GiftSendCount++;
    GM_setValue('GiftSendCountKey', GiftSendCount);
}


//Clicks the final send button

function clickSendIt()
{
    var inputs = document.getElementsByName('sendit');
    inputs[0].click();
    GiftPageCount = 0;
    GM_setValue('GiftPageCountKey', GiftPageCount);
    GiftSendCount = 0;
    GM_setValue('GiftSendCountKey', GiftSendCount);
}


// ==/UserScript==

 