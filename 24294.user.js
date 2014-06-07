/* CHANGELOG                                                                                                                                                   
   ---------                                                                                                                                                   
   23 March, 2008: fixed mod post status                                                                                                                       
   24 March, 2008: shrunk code size substantially                                                                                                              
                   increased speed with regexes THE PINNCALE OF OPTIMISATION                                                                                   
*/

// ==UserScript==                                                                                                                                              
// @name           kusaba (7chan's /b/) modifications                                                                                                          
// @namespace      http://img.7chan.org/b/                                                                                                                     
// @include        http://img.7chan.org/b/*                                                                                                                    
// @include        http://img.kusaba.org/simg/*                                                                                                                
// ==/UserScript==                                                                                                                                             

var allLabels,thisLabel,match,d,regex = new RegExp();
regex.compile(/[\n ]+([0-9]{2})\/([0-9]{2})\/([0-9]{2}).*?([0-9]{2})\:([0-9]{2})[\n ]*$/m);
d = new Date();
allLabels = document.getElementsByTagName('label');
for (var i = 0; i < allLabels.length; i++) {
    thisLabel = allLabels[i];
    if (match = thisLabel.innerHTML.match(regex)) {
        d.setTime(Date.UTC("20" + match[1],
                           match[2] - 1, // Months start at 0                                                                                                  
                           match[3],
                           (match[4] * 1) + 7, // 7Chan is UTC-7 (happily extends into the next day)                                                           
                           // i.e. an hour of 25 means add 1 to the day, and the hour will be 1                                                                
                           match[5]));
        thisLabel.innerHTML = thisLabel.innerHTML.slice(0, -21) + ' ' + d.toLocaleString();
    }
}