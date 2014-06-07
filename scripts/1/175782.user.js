/*

Following code belongs to Readibility Enhancer for Google+.
Copyright (C) 2013 Jackson Tan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @name       AutoRefreshG+OperaVer
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @author     KAMyAw
// @helper     Jackson Tan
// @description  Auto Refresh G+ for Opera 17
// @include      https://plus.google.com/*
// @copyright  2013, KAMyAw
// ==/UserScript==

var autoRefreshTrigger = setInterval(autoRefresh, 2000);
function autoRefresh() {
    if (document.getElementById("gbwc").style.length == 0){
        if (document.getElementsByClassName("Dd Ofc ULec3c NRa gb_gbsf I3ynT")[0].style.top == "0px"){
            document.getElementsByClassName("a-f-e c-b c-b-M f8ocqf Ri07Rc")[0].click();
        }
    } else{
        if (document.getElementsByClassName("Dd Ofc ULec3c NRa gb_gbsf I3ynT")[0].style.top == "0px" &&  document.getElementById("gbwc").style.display == "none"){
            document.getElementsByClassName("a-f-e c-b c-b-M f8ocqf Ri07Rc")[0].click();
        }
    }
}