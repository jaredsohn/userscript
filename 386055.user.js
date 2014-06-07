// ==UserScript==
// @name       Highlight
// @namespace  http://www.edhuang.com/househunting
// @version    0.1
// @description  enter something useful
// @match      http://api.cde.ca.gov/Acnt2013/2013GrowthSch.aspx?allcds=*
// @copyright  2012+, You
// ==/UserScript==

function highlight() {
    var trs = (document.querySelector('#Form1 table')).querySelectorAll('tr');
    var count = 0;
    for( var i = 0 ; i < trs.length ; i++) {
        var tr = trs[i];
        
        if(tr.children[0].className == 'medium_left') {
            var text = tr.children[0].innerText.trim();
            if(text == 'Asian') {
                tr.style.background = 'yellow';
            }else if(text == 'White') {
                tr.style.background = 'yellow';
            }else if(text == 'Schoolwide') {
                tr.style.background = 'yellow';
                count = parseInt(tr.children[1].innerText.trim());
            }
                
                if(text != 'Schoolwide') {
                    var num = parseInt(tr.children[1].innerText.trim());
                     tr.children[1].innerText = tr.children[1].innerText + " ("+Math.round(num/count*100)+"%)";
                }
        }
    }    
    
    window.scrollBy(0,500); 
}

highlight() ;