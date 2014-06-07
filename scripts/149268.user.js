//
// ==UserScript==
// @name          HWM_Tavern_Rate_Restriction
// @description   HWM Tavern Rate Restriction
// @namespace      HWM
// @version		0.2
// @match      http://*.heroeswm.*/tavern.php?form=1
// @include    http://*.heroeswm.*/tavern.php?form=1
// @copyright  HAPblB
// ==/UserScript==


var version = '0.2';

var script_num = 149268
var script_name = 'HWM_Tavern_Rate_Restriction';
var string_upd = /149268=(\d+\.\d+\.\d+)/;




var rate=5;
/*
0 == 0 
1 == 40 
2 == 200 
3 == 400 
4 == 600 
5 == 1000 
6 == 2000 
7 == 3000 
8 == 4000 
9 == 5000 
10 == 6000 
11 == 7000 
12 == 10000 
13 == 11000 
14 == 12000 
15 == 20000 
*/

var all_select = document.getElementsByTagName('select');

for (var i=0;i<all_select.length;i++)
{
    if(all_select[i].name=='gold'){
        var options=all_select[i].childNodes;
       
    for(var j=options.length-1;j>rate;j--){

            
            options[j].parentNode.removeChild(options[j]);
            }
                
        }
}