// ==UserScript==
// @name          Tf2r raffle bot
// @namespace     ComeAtMeBro.com
// @include       http://tf2r.com/k*
// @include       http://tf2r.com/raffles.html
// @include       http://tf2r.com/notifications.html
// @include       http://tf2r.com/error.html
// @include               http://steamcommunity.com/id*
// @include               http://steamcommunity.com/profiles/*
// ==/UserScript==
     
    //Settings
     
    var AvoidCrates = 1; // 0 = accept all raffles / 1= avoid raffles with just worthless crates.
     
    var AddRaffleOwners = 0; // 0 = don't add owners of raffles you've won / 1 = do add owners of raffles you've won
    var CheckIfWon = 20; //Number of mins it waits before it checks to see if you won and raffles and adds raffle owners
    var SteamVsCommunity = 0; // 0 = add using the http://steamcommunity.com  log in info, 1 = use steam log in info.
    //AddRaffleOwnersCONT You must be logged into http://steamcommunity.com for the add friend function to work if SteamVsCommunity = 0 else you need to be logged into steam!
     
     
    var JoinRaffleOnlyIf = 0; // 0 = join all raffles / 1 = join raffles only if it has an item in the MyItem array. This will override AvoidCrates.
    var MyItems = new Array(""); //list of items you want. The bot will skip all raffles unless it has this item! This works by searching the name of the items on tf2r for matchs to any word in MyItems.
    //MyItems array CONT.  This means if you have "equalizer" in the list it will inclue any item with equalizer in its name inclueing things like "vintage the equalizer".
    //MyItems array CONT2. Another example is adding the word strange will accept any strange items! capitalization does not mater.
    //MyItems array CONT3. The array should look like... new Array("Name Of Item 1", "name of items 2", "name of item 3", "name of item 4", "ect");
     
    //END settings
    function JoinOnlyIf()
    {
            var flag = 0;
            for(var i = 0; i < 20; i++)
            {
                    var item = document.getElementsByClassName("item q" + i);
                    for(var x = 0; x < item.length; x++)
                    {
                            for(var k = 0; k < MyItems.length; k++)
                            {
                                    if(item[x].getAttribute('iname').toLowerCase().indexOf(MyItems[k].toLowerCase()) != -1)
                                    {
                                               flag = 1;
                                    }
                            }
                    }
            }
        return flag;
    }
    function HasAllCrates()
    {
            var flag = 1;
            for(var i = 0; i < 20; i++)
            {
                    var item = document.getElementsByClassName("item q" + i);
                    for(var x = 0; x < item.length; x++)
                    {
                            if(item[x].getAttribute('iname') != "Mann Co. Supply crate" || item[x].getAttribute('iu1') == 40 || item[x].getAttribute('iu1') == 30 || item[x].getAttribute('iu1') == 20 || item[x].getAttribute('iu1') == 19 || item [x].getAttribute('iu1') == 1 || item[x].getAttribute('iu1') == 2 || item[x].getAttribute('iu1') == 3 || item[x].getAttribute('iu1') == 4 || item[x].getAttribute('iu1') == 5 || item[x].getAttribute('iu1') == 6 || item[x].getAttribute('iu1') == 7 || item[x].getAttribute('iu1') == 8 || item[x].getAttribute('iu1') == 9)
                            {
                                       flag = 0;
                            }
                    }
            }
        return flag;
    }
    function ClearRafflesWon()
    {
            if(GM_getValue("RafflesWon", "undef") != "undef")
            {
                    for(var i = 0; i < GM_getValue("RafflesWon"); i++)
                    {
                            GM_deleteValue(i);
                    }
                    GM_deleteValue("RafflesWon");
            }
    }
     
    function Bot()
    {
            if(AddRaffleOwners != 0)//Set Check If Won timer
            {
                    if(GM_getValue("Timer" ,"undef") == "undef")
                    {
                            var date = new Date();
                            GM_setValue("Timer", Math.floor((date.getTime()/ 1000)/60));
                    }
                    else
                    {
                            var date = new Date();
                            if(GM_getValue("Timer") + CheckIfWon <= Math.floor((date.getTime() / 1000)/60))
                            {
                                    GM_deleteValue("Timer");
                                    window.location = "http://tf2r.com/notifications.html";
                            }
                    }
            }//End Check If Won  timer
			var PostNum = 0;
            var link = document.getElementsByClassName("pubrhead-text-right")[PostNum];
			while(!IsVisible(link))
			{
				PostNum++;
			}
            if(link != null)//If one raffle.html
            {
                    ClearRafflesWon();
                    if(GM_getValue("lastlink" ,"undef") != link.childNodes[0])
                    {
                            GM_deleteValue("lastlink");
                            GM_setValue("lastlink", link.childNodes[0].toString());
                var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            link.childNodes[0].dispatchEvent(evt);
                    }
                    else if(!Math.floor(Math.random()*25))
                    {
                            window.location = "http://tf2r.com/raffles.html";
                    }
            }//End if on raffle.html
            else if(document.getElementById('enbut') != null && document.getElementsByClassName("welcome_font")[4].childNodes[0].textContent != "Winner(s):")
            {
                    if(document.getElementById('enbut').value.toLowerCase() != "leave raffle" && AvoidCrates == 1 && HasAllCrates() == 0 && JoinRaffleOnlyIf == 0)
                    {
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            document.getElementById('enbut').dispatchEvent(evt);
                    }
                    else if(document.getElementById('enbut').value.toLowerCase() != "leave raffle" && AvoidCrates == 0 && JoinRaffleOnlyIf == 0)
                    {
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            document.getElementById('enbut').dispatchEvent(evt);
                    }
                    else if(document.getElementById('enbut').value.toLowerCase() != "leave raffle" && JoinRaffleOnlyIf == 1 && JoinOnlyIf() == 1)
                    {
                            var evt = document.createEvent("MouseEvents");
                            evt.initEvent("click", true, true);
                            document.getElementById('enbut').dispatchEvent(evt);   
                    }
                    else
                    {
                            window.location = "http://tf2r.com/raffles.html";
                    }
            }
            else if(window.location == "http://tf2r.com/notifications.html" && AddRaffleOwners == 1)//Add Raffle owners
            {
                    var rafflelink;
                    if(GM_getValue("RafflesWon", "undef") == "undef")
                    {
                            GM_setValue("RafflesWon", document.getElementsByClassName("notif lev5 ntifnew").length);
                            for(var i = 0; i < GM_getValue("RafflesWon"); i++)
                            {
                                    GM_setValue(i , document.getElementsByClassName("notif lev5 ntifnew")[i].childNodes[1].toString());
                            }
                    }
                    var l = 0;
                    for(l; l < GM_getValue("RafflesWon"); l++)
                    {
                            if(GM_getValue(l ,"undef") != "undef")
                            {
                                    rafflelink = GM_getValue(l);
                                    GM_deleteValue(l);
                                    window.location = rafflelink;
                                    break;
                            }
                    }
                    if(GM_getValue("RafflesWon") <= l)
                    {
                            GM_deleteValue("RafflesWon");
                            window.location = "http://tf2r.com/raffles.html";
                    }
            }
            else if(document.getElementsByClassName("welcome_font")[4] != undefined)
            {
                    if(document.getElementsByClassName("welcome_font")[4].childNodes[0].textContent == "Winner(s):" && AddRaffleOwners == 1)//Add to friends list code
                    {
                            for(var w = 5; w < 1000; w++)
                            {
                                    if(document.getElementsByClassName("welcome_font")[w] == undefined || document.getElementsByClassName("welcome_font")[w].childNodes[0].textContent == "Participants:")
                                    {
                                            break;
                                    }
                                    else if(document.getElementsByClassName("welcome_font")[5].childNodes[0].textContent.substring(0,12).toLowerCase() == document.getElementById('nameho').childNodes[0].textContent.substring(0,12).toLowerCase())
                                    {
                                            if(SteamVsCommunity == 0)
                                            {
											
													var evt = document.createEvent("MouseEvents");
													evt.initEvent("click", true, true);
													document.getElementsByClassName("profile_info")[0].childNodes[1].dispatchEvent(evt);
                                            }
                                            else
                                            {
                                                    window.location = "steam://friends/add/" + document.getElementsByClassName("profile_info")[0].childNodes[1].toString().split("/")[5];
                                            }
                                            window.location = "http://tf2r.com/notifications.html";
                                    }
                            }
                    }
            }
            else if(location.host == "steamcommunity.com" && AddRaffleOwners == 1)
            {
                    window.location = "http://tf2r.com/notifications.html";
            }
            else if(window.location == "http://tf2r.com/error.html")
            {
                    window.location = "http://tf2r.com/raffles.html";
            }
    }
function IsVisible(elem)
 {
	var ele = window.getComputedStyle(elem,null);
	if (parseFloat(ele.opacity) > 0 && ele.visibility != 'hidden' && ele.display != 'none')
	{
		return true;
	}
	return false;
}
    (document.onload = function Loop() {
        var rand = Math.floor((Math.random()*11000)+ 3000);
        setTimeout(function() {
                            unsafeWindow.alert = null;  
                Bot();
                Loop();  
        }, rand);
    }());
