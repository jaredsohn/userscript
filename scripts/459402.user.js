// ==UserScript==
// @name        CW pocitadlo
// @namespace   https://cw.felk.cvut.cz/upload/secure
// @include     https://cw.felk.cvut.cz/upload/secure/results.phtml*
// @version     1
// @grant       none
// ==/UserScript==
h1 = document.getElementsByTagName('h1') [0];
table = document.getElementsByTagName('tbody');
rows = table[0].getElementsByTagName('tr');
passed = 0;
error = 0;
failed = 0;
for (i = 0; i < rows.length; i++) {
    cells = rows[i].getElementsByTagName('td');
    if (cells.length < 2)
    continue
    span = cells[1].getElementsByTagName('span') [0];
    if (span.innerHTML == '[ ERROR ]')
       error++;
    else if(span.innerHTML == '[ FAILED ]')
        failed++;
    else if (span.innerHTML == '[ PASSED ]')
       passed++;
      
    if (cells[2].innerHTML.indexOf('<br>') > 0){
        div = document.createElement('div')
        div.innerHTML = cells[2].innerHTML;
        div.style.height = '20px';
        div.style.overflow = 'hidden';
        div.style.display = 'inline-block';
        div.style.cursor = 'pointer';
        
        div.onclick = function () {
            if (this.style.height == 'auto') {
                this.style.height = '20px';
            } 
            else {
                this.style.height = 'auto';
            }
        };
       cells[2].innerHTML = '⏬';
       cells[2].appendChild(div);
    }
}


table = document.getElementsByTagName('table');
div = document.createElement('div');
div.innerHTML = 'Passed: ' + passed + "<br>Error: " + error + "<br>Failed: " + failed + "<br>Error + Failed: " + (error +failed) + "<br>Total: " + (error+failed+passed)+"";
div.style.fontWeight = 'bold';
div.style.paddingBottom = '30px';
document.body.insertBefore(div, table[0]);
