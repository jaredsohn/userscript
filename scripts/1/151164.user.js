// ==UserScript==
// @name       Custom chart navigation buttons
// @version    0.6
// @match      http://rateyourmusic.com/customchart*
// @match      http://rateyourmusic.com/films/chart*
// @match      https://rateyourmusic.com/customchart*
// @match      https://rateyourmusic.com/films/chart*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
if (window.location.toString().indexOf('year=alltime') > 0 || window.location.toString().indexOf('year=') < 0){
    textNodes = document.evaluate(
        "//text()",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    if (window.location.toString().indexOf('page=') > 0){ 
        page = window.location.toString().split('page=')[1].split('&')[0];
    }
    else{page = 1;}
    if (page < 11){pre = '';}
    else if (page > 10 & page < 21){pre = 1;}
    else if (page > 20 & page < 31){pre = 2;}
    else if (page > 30 & page < 41){pre = 3;}
    else if (page > 40){pre = 4;}
    
    for (var i=0;i<textNodes.snapshotLength;i++) {
        var node = textNodes.snapshotItem(i);
        if (page > 10){
            if (node.data.indexOf('1 - 100') == 0){
                node.data = pre+'001 - '+pre+'100';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'1);');
                if (page == pre.toString()+'1'){node.parentNode.removeAttribute('href');}
                prevThou = document.createElement('a');
                prevThou.setAttribute('href', 'javascript:goPage('+pre+'0);');
                if (page > 20){
                    prevThou.innerHTML ='<< '+ (pre-1)+'900 - '+pre+'000';
                }
                else{
                    prevThou.innerHTML ='<< 901 - 1000';
                    
                }
                node.parentNode.parentNode.insertBefore(prevThou, node.parentNode);
                seperator = document.createElement('a');
                seperator.innerHTML = ' | ';
                node.parentNode.parentNode.insertBefore(seperator, node.parentNode);
            }
            if (node.data.indexOf('101 - 200') == 0){
                node.data = pre+'101 - '+pre+'200';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'2);');
                if (page == pre.toString()+'2'){node.parentNode.removeAttribute('href');}
                
            }
            if (node.data.indexOf('201 - 300') == 0){
                node.data = pre+'201 - '+pre+'300';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'3);');
                if (page == pre.toString()+'3'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('301 - 400') == 0){
                node.data = pre+'301 - '+pre+'400';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'4);');
                if (page == pre.toString()+'4'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('401 - 500') == 0){
                node.data = pre+'401 - '+pre+'500';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'5);');
                if (page == pre.toString()+'5'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('501 - 600') == 0){
                node.data = pre+'501 - '+pre+'600';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'6);');
                if (page == pre.toString()+'6'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('601 - 700') == 0){
                node.data = pre+'601 - '+pre+'700';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'7);');
                if (page == pre.toString()+'7'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('701 - 800') == 0){
                node.data = pre+'701 - '+pre+'800';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'8);');
                if (page == pre.toString()+'8'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('801 - 900') == 0){
                node.data = pre+'801 - '+pre+'900';
                node.parentNode.setAttribute('href', 'javascript:goPage('+pre+'9);');
                if (page == pre.toString()+'9'){node.parentNode.removeAttribute('href');}
            }
            if (node.data.indexOf('901 - 1000') >= 0){
                node.data = pre+'901 - '+(pre+1)+'000';
                node.parentNode.setAttribute('href', 'javascript:goPage('+(pre+1)+'0);');
                if (page == (pre+1).toString()+'0'){node.parentNode.removeAttribute('href');}
            }
        }
        if (node.data.indexOf(pre+'901 - '+(pre+1)+'000') >= 0){
            if (page < 41){
                nextThou = document.createElement('a');
                nextThou.setAttribute('href', 'javascript:goPage('+(pre+1)+'1);');
                nextThou.innerHTML = (pre+1)+'001 - >>';
                if (page == 10){
                    node.parentNode.insertBefore(nextThou, node.nextSibling);
                    node.parentNode.insertBefore(document.createTextNode(' | '), node.nextSibling);
                }
                else{
                    node.parentNode.parentNode.insertBefore(nextThou, node.parentNode.nextSibling);
                    node.parentNode.parentNode.insertBefore(document.createTextNode(' | '), node.parentNode.nextSibling);
                }
            }
        }
    }
}

if (window.location.toString().indexOf('year=') > 0){ 
   yearBox = document.getElementsByTagName('select')[3]; 
   yearSet = window.location.toString().split('year=')[1].split('&')[0]; 
   for (z=0; z<yearBox.options.length; z++) { 
       if (yearBox.options[z].value == yearSet) { 
           yearBox.options[z].selected = true; 
           break; 
       } 
   } 
} 