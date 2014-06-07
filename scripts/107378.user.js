// ==UserScript==
// @name           Woot Deals Tweaks
// @namespace      http://knightknetwork.com
// @description    Deals.Woot Tweaks
// @include        http://deals.woot.com/*
// ==/UserScript==

//PM Envelope
document.getElementById('nav_faq').innerHTML = "<a href='http://www.woot.com/forums/User/PrivateMessages/' title='Private Messages'><img src='http://www.woot.com/Images/Icons/24x24/mail.png' alt='Private Messages' />";;

//Vote Counts
document.getElementById('loggedIn').innerHTML = "<h4>Welcome <a href='http://members.woot.com/'><span class='username'></span></a><span class='qone'></span><span class='qube' url='http://woot.com'></span></h4> <p><a href='/account?returnurl=/'>My account</a> |<a href='/account/logout?returnurl=/'> Log out</a> | "+ unsafeWindow.User.voteForCount +"+ | "+unsafeWindow.User.voteAgainstCount+"- </p>";;
