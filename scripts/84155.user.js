// ==UserScript==

// @name           Friendface

// @namespace      http://www.somethingafal.com/

// @description    Changes Facebook to Friendface

// @include        http://*.facebook.com/*

// @include        http://facebook.com/*

// @matches        http://*.facebook.com/*

// @matches        http://facebook.com/*

// ==/UserScript==



document.getElementById("blueBar").style.background = "#015001";

document.getElementById("headNav").style.background = "#017F00";

document.getElementById("headNav").style.border = "#001F00";

document.getElementById("navSearch").children[1].style.borderColor = "#001F00";

//document.getElementById("navSearch").children[1].children[0].style.borderColor = "#001F00";



//document.getElementById("fbRequestsJewel").style.border = "#001F00";

//document.getElementById("fbMailJewel").style.border = "#001F00";

//document.getElementById("fbNotificationsJewel").style.border = "#001F00";



document.getElementById("pageLogo").children[0].style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAIAAAB1UkQCAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIERE7FesvLEYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC90lEQVRo3u1aMXbiMBDF+7gCtHIf38GCE7BV0tkpKNkLQJ7hhQvAVtlGpkpS7QlA4gxAbbkEDuEtJjvRk8HIDma30DwVRpZHf77/jCZ+cZye07BW0r5ZCipYM2tklgWrNcuaZc2yZlm7kmW/MxhswGrCygYMd8FJ0iJswJKXBOaDTnCLM/Rk/OdWO9//r+aOtIiYCrft4ox6fVPWqtn4bQwX8iBvxlrYDZEmsRUw/jFr8iDjVWzoaPI+ub3WVGV1njo33Lmnj+yvsSUrvusPfb7hWZYFs+DkU7Ag2SdZliX7hC0Z6ZO8n2AWwJr8pmzJ4BZbMtgLTPWgGukTbSXf8Og10qLwhz56TvYJ3/BgFlzE/Dkqs4ZxnmMteo3yUSX7pMAPmD/0YY0avGbnWPOH/sl5vuEYgopW81mMGUdRhlKPRvcR/hRbsd6tDeuuf+ePHz4qHaR52A3hqeg+UtM574d6dL1b+3c+9ahaK9QqBpVUnVELq9gKKK+4gHo06AQLviAtEv/4LDuAjXrUbbvmmIu0phnoXH17qnQ1rbEl014yCgdm1DdJ+kTViOYB8k6bwfzVZrRB+qTALYqa9Anf8IuYjbRWbPIg02NaoFO80FoZvIUSTo9p3hUugwWl2pGwG4J8TgoZ8WPqpMe089RJXhJDzEWsxav48efj10+3L3oo1crkO7hzbvM9ijnmZt1HdKn25Qpt48MYg49XcbyKxVRcHXOzPrIAvTzIaq0ceiglWzWvTyYKutWSrhTmuv56R/1Tj5IWUc9WLB8XWauQ7BfzGoHBoYnz/JmbY65La9AofACdCmgFqEfzb7iAd1jstl3+zOVBokMThULkecY1YGrnQUfUEHNdrK1363AeQmfktl2TgE+Gdy6bCp6Cnsttu/KXLAaGHVlZzDV+X1vwBR3ReBVjskCVpSMjCtJjGs5DyBp5kOO3scmpMnmfqO1uOA9NgImtgJWGmJ1Gz35ktN9yLWuWNcuaZc1SUMGaTsP+d4zV2k3sD4qss7mCsY/cAAAAAElFTkSuQmCC)";



document.getElementById("blueBar").innerHTML += '<style>.fbJewel:hover, #jewelContainer a:hover{background-color:#017F00}#fbRequestsJewel{background-position: -26px -63px;}#fbMailJewel{background-position:-74px -95px}#fbNotificationsJewel {background-position:-1px -95px;}</style>';

//