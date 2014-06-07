// ==UserScript==
// @name           Porko Solver
// @namespace      kol.interface.unfinished
// @description    Helps you play Porko optimally in the Kingdom of Loathing
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://*kingdomofloathing.com/spaaace.php*
// @include        http://127.0.0.1:*/choice.php*
// @include        http://127.0.0.1:*/spaaace.php*
// @version        1.4
// ==/UserScript==

//Version 1.4
// - added a repeat game option to replay multiple times
//Version 1.3
// - changed top arrows so they point diagonally if appropriate for the first move
//Version 1.21
// - fixed weird bug in FF4/5, where apparently it counts differently
//Version 1.2
// - added a link to auto-select/play one unit (turn/3-plays)
//Version 1.1
// - added colours to show deterministic and unreachable areas

function doPage(root) {
    if (root) {
        var snap = document.evaluate( '//p[contains(.,"You hand Juliedriel your isotope.")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (!snap.singleNodeValue) {
            GM_setValue('porkorepeat',Number(GM_getValue('porkorepeat',1))-1);
        } else
            GM_setValue('porkorepeat','0');
        addDoAll3(snap.singleNodeValue,makeChoice(solveGrid(makeGrid(root)),root));
    } else {
        GM_setValue('repeatgame',0);
        GM_setValue('repeatinggame',0);
        GM_setValue('porkorepeat',0);
    }
}

var grids = [];

function addDoAll3(snap,maxahref) {
    if (snap) {
        if (GM_getValue('repeatinggame',0)>0 && maxahref) {
            GM_setValue('porkorepeat','3');
            window.location.pathname = maxahref;
        } else {
            var span = document.createElement('span');
            span.setAttribute('style','font-size:10px;');
            span.appendChild(document.createTextNode('\u00A0\u00A0'));
            var b = document.createElement('a');
            b.setAttribute('href','#');
            b.appendChild(document.createTextNode('Auto-play this game'));
            b.addEventListener('click',doAgain,false);
            if (maxahref)
                b.setAttribute('href',maxahref);
            span.appendChild(b);
            snap.appendChild(span);
        }
    } else
        repeatit();
}

function doAgain() {
    GM_setValue('porkorepeat','3');
    if (this.getAttribute('href')) {
        window.location.pathname = this.getAttribute('href');
    }
}

function makeGrid(root) {
    var grid = [];
    var cell = 0;
    var row = 0;
    var started = false;
    var ts = document.evaluate('.//div',root,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<ts.snapshotLength;i++) {
        var d = ts.snapshotItem(i);
        var dc = d.getAttribute('class');
        if ((!dc && d.firstChild && d.firstChild.tagName=='IMG') || dc=='blank') {
            d.setAttribute('coord',row+','+cell);
            if (cell==0) {
                grid[row] = [];
                grids[row] = [];
            }
            if (!dc) {
                started = true;
                var pt = d.firstChild.getAttribute('title').replace(/[^0-9]*/,'');
                grid[row][cell] = pt;
            } else {
                if (!started) continue;
                if (d.innerHTML!=' ') {
                    grid[row][cell] = d.innerHTML.replace(/[^0-9]*/,'');
                    cell++; // last row, skip the wall dividers
                } else 
                    grid[row][cell] = 0;
            }
            grids[row][cell] = d;
            cell++;
            if (cell>16) {
                cell = 0;
                row++;
            }
        }
    }
    showUnreachable(grid);
    return grid;
}

function solveGrid(grid) {
    var colors = ['LightYellow','PeachPuff','LightSalmon','Tomato'];
    var ming = [];
    var maxg = [];
    var p = 1;
    for (var j=0;j<17;j+=2) {
        grid[grid.length-2][j] = grid[grid.length-1][j];
        ming[j] = grid[grid.length-2][j];
        maxg[j] = grid[grid.length-2][j];
        if (!grids[grid.length-2][j].style.backgroundColor) {
            grids[grid.length-2][j].setAttribute('title',grid[grid.length-2][j]);
            grids[grid.length-2][j].style.backgroundColor = colors[ming[j]];
            grids[grid.length-2][j].innerHTML = '&darr;';
        }
    }
    grid[-1] = [];
    for (var i=grid.length-3;i>=-1;i--) {
        for (var j=p;j<17;j+=2) {
            var gl = Number((j>0) ? grid[i+1][j-1] : grid[i+1][j+1]);
            var gr = Number((j<16) ? grid[i+1][j+1] : grid[i+1][j-1]);
            switch(Number(grid[i+1][j])) {
            case 1:
                grid[i][j] = gr;
                ming[j] = Number((j<16) ? ming[j+1] : ming[j-1]);
                maxg[j] = Number((j<16) ? maxg[j+1] : maxg[j-1]);
                if (i>=0 && !grids[i][j].style.backgroundColor)
                    grids[i][j].innerHTML = (j<16) ? '&#8600;' : '&#8601;';
                break;
            case 2:
                grid[i][j] = gl;
                ming[j] = Number((j>0) ? ming[j-1] : ming[j+1]);
                maxg[j] = Number((j>0) ? maxg[j-1] : maxg[j+1]);
                if (i>=0 && !grids[i][j].style.backgroundColor)
                    grids[i][j].innerHTML = (j>0) ? '&#8601;' : '&#8600;';
                break;
            case 3:
                grid[i][j] = (gl + gr)/2.0;
                ming[j] = Math.min(Number((j>0) ? ming[j-1] : ming[j+1]),Number((j<16) ? ming[j+1] : ming[j-1]));
                maxg[j] = Math.max(Number((j>0) ? maxg[j-1] : maxg[j+1]),Number((j<16) ? maxg[j+1] : maxg[j-1]));
                if (i>=0 && !grids[i][j].style.backgroundColor)
                    grids[i][j].innerHTML = (j==0) ? '&#8600;' : ((j==16) ? '&#8601;' : '.');
                break;
            default:
                GM_log('error! '+grid[i][j]);
            }
            if (i>=0 && !grids[i][j].style.backgroundColor) {
                if (ming[j]==maxg[j]) {
                    grids[i][j].setAttribute('title','Payout='+grid[i][j]);
                    grids[i][j].style.backgroundColor = colors[ming[j]];
                    //grids[i][j].style.opacity = '0.8';
                } else
                    grids[i][j].setAttribute('title','E(payout)='+grid[i][j]+', min='+ming[j]+', max='+maxg[j]);
            }
        }
        p = 1-p;
    }
    
    return {e:grid,m:ming,x:maxg};
}

function showUnreachable(grid) {
    var p = 0;
    var reach = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    for (var i=-1;i<grid.length-2;i++) {
        var reach2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (var j=p;j<17;j+=2) {
            if (reach[j]) {
                switch(Number(grid[i+1][j])) {
                case 1:
                    if (j<16)
                        reach2[j+1] = 1;
                    else
                        reach2[j-1] = 1;
                    break;
                case 2:
                    if (j>0)
                        reach2[j-1] = 1;
                    else
                        reach2[j+1] = 1;
                    break;
                case 3:
                    if (j>0)
                        reach2[j-1] = 1;
                    if (j<16)
                        reach2[j+1] = 1;
                    break;
                default:
                    GM_log('error! '+grid[i][j]);
                }
            }
        }
        p = 1-p;
        reach = reach2;
        for (var j=p;j<17;j+=2) {
            if (reach[j]==0) {
                grids[i+1][j].style.backgroundColor = '#EEEEEE';
                grids[i+1][j].setAttribute('title','Unreachable');
            }
        }
    }
}

function makeChoice(grid,root) {
    var max = 0.0;
    var maxa;
    for (var i=0;i<17;i+=2) {
        if (grid.e[-1][i]>max)
            max = grid.e[-1][i];
    }
    var ts = document.evaluate('.//div[@class="start"]',root,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<ts.snapshotLength;i++) {
        if (grid.e[-1][2*i]==max) {
            maxa = ts.snapshotItem(i).firstChild;
            var pt = grids[0][2*i].firstChild.getAttribute('title').replace(/[^0-9]*/,'');
            if ((Number(pt)==1 && i!=ts.snapshotLength-1) || i==0) {
                // right
                maxa.firstChild.setAttribute('src',"data:image/gif,GIF89a%1E%00%1E%00%84%10%00%13%87%00%1A%8A%08!%8E%10%2C%94%1CC%9F4k%B4%60%8C%C4%83%AA%D4%A4%C1%DF%BD%CA%E4%C6%D1%E7%CE%DC%ED%DA%E8%F3%E7%F0%F7%EF%F7%FB%F7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%10%00%2C%00%00%00%00%1E%00%1E%00%00%05%91%E0%23%8Edi%9Eh%AA%AEl%7B%1E%82%DB%12%80%008rZ%00%3C%9F%E4%26C%AF%170%94%12%88%16b%D8%1B%0C%0A%23%86%40%80c%09%7B6%00%E1%F9%B8%1A%1A%AEk%608%00%94y%05%B0%EB%C0l%F3%80Kw3%99%8B%BB%03%03%23%90!%E7%E9%814r%07%40%5D%7DZU2Ym%02%01%04%0B94cm%8D%039%06%81%00%01%92%3C%92P2%05N%A1%03%02N%04%A6%839%0A%8F%0FH%0E%AA%0F%0C%0C%84%26%88%B3%B6%B7%B8%B9%BA%BB%BC%BD%BE2!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BE%E9!%C0%2B%01%08%80C%9F%05%E0%FB%89%1D%C9%F0%FB%05%0C%A5%04%A2%85(%FE%06%83%C2%88!%10%E8X%C4%1F%0E%40%88%3E%B2%86%86%2B%1B(%0E%00g_A%EC%3A8%DF%3EZ%13%FE%5C%C2%E6%F0%C0%00Ic%D0%7D%7C46t%07%3BYt%04W%2F%5Bo%02%01%04%0B06eo%8F%030%06%83%00%01%94%3E%94R%2F%05P%A3%03%02P%04%A8%850%0A%91%0FJ%0E%AC%0F%0C%0CB%25%8A%B5%B8%B9%BA%BB%BC%BD%BE%BF%23!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF%CF!%D0'%01%08%80%83%8F%05%80P%98%F8%19%86%C3%80%A1%94%40%B4%10%C8%E1%60P%181%04%02%1F%EB8%E4%01%08%D4%07%D7%D0pq%03%C8%01%40-%2C%94%5D%87%A8%5C%18%83%CE%A5N%98%7D%1E%18%2Cc%0CwB%7F1%3Aw%072%5Cw%04Z%2F%5Er%02%01%04%0B0%3Ahr%92%030%06%86%00%01%97B%97U%2F%05S%A6%03%02S%04%AB%880%0A%94%0FM%0E%AF%0F%0C%0C%3F%22%8D%B8%BB%BC%BD%BE%BF%24!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%90%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%1F%82%5D%12%80%008%BAG%01%40%24%26l%86b1%60(%25%10-%84%B28%18%14F%0C%81%00%C8J%16%7D%00%82%F5%E154%5C%DE%80r%00%60%13%0Bg%D7aJ'%C6%A4u*%14%86%AF%07%06M1%0CyD%811%3Cy%072%5Ey%04%5C%2F%60t%02%01%04%0B0%3Cjt%94%030%06%88%00%01%99D%99W%2F%05U%A8%03%02U%04%AD%8A0%0A%96%0FO%0E%B1%0F%0C%0CA%8FA%BC%BD4!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%90%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DF%E8!%E0%23%01%08%00%07%AE%00(%16%136%83%D1%180%94%12%88%16bi%1C%0C%0A%23%86%40%20d)%8D%40%00%E1%FA%F8%1A%1A%AEo%609%00%B4%8B%05%B4%EB%40%AD%17cS%7B5%0A%CB%DB%03%03N1%0CzE%821%3Ez%072_z%04%5D%2Fau%02%01%04%0B0%3Eku%95%030%06%89%00%01%9AE%9AX%2F%05V%A9%03%02V%04%AE%8B0%0A%97%0FP%0E%B2%0F%0C%0C8%90%3C%BD-!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%91%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF4%7B%08%B5I%00%02%E0%E4%A2%02%608L%E4%0CDb%C0PJ%20Z%88%24q0(%8C%18%02%C1%8F%85%24%F6%00%84%EA%A3kh%B8%BA%81%E4%00%B0%1E%16%CC%AE%83t%3E%8CE%E9%D3'%ECN%0F%0C%981%0CxC%801%3Bx%072%5Dx%04%5B%2F_s%02%01%04%0B0%3Bis%93%030%06%87%00%01%98C%98V%2F%05T%A7%03%02T%04%AC%890%0A%95%0FN%0E%B0%0F%0C%0C%40%0F%8E%B9%BC%BD%BE%B9!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%7C%1E%82%9C%12%80%008vY%00%40%60%A2'2%04%83%01C)%81h!%8E%C1%C1%A00b%08%04%3C%961%A8%03%10%A6%8F%AD%A1%E1%DA%06%8E%03%40%1AX%20%BB%0E%D080%F6%94G%9B%B0%BA%3C0P%C6%18v%40~18v%072%5Bv%04Y%2F%5Dq%02%01%04%0B08gq%91%030%06%85%00%01%96%40%96T%2F%05R%A5%03%02R%04%AA%870%0A%93%0FL%0E%AE%0F%0C%0CD%23%8C%B7%BA%BB%BC%BD%BE%BF-!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BE%E9!%C0%2B%01%08%80C%9F%05%E0%FB%89%1D%C9%F0%FB%05%0C%A5%04%A2%85(%FE%06%83%C2%88!%10%E8X%C4%1F%0E%40%88%3E%B2%86%86%2B%1B(%0E%00g_A%EC%3A8%DF%3EZ%13%FE%5C%C2%E6%F0%C0%00Ic%D0%7D%7C46t%07%3BYt%04W%2F%5Bo%02%01%04%0B06eo%8F%030%06%83%00%01%94%3E%94R%2F%05P%A3%03%02P%04%A8%850%0A%91%0FJ%0E%AC%0F%0C%0CB%25%8A%B5%B8%B9%BA%BB%BC%BD%BE%BF%23!%00%3B");
            } else if (Number(pt)==2 || i==ts.snapshotLength-1) {
                maxa.firstChild.setAttribute('src',"data:image/gif,GIF89a%1E%00%1E%00%84%10%00%13%87%00%1A%8A%08!%8E%10%2C%94%1CC%9F4k%B4%60%8C%C4%83%AA%D4%A4%C1%DF%BD%CA%E4%C6%D1%E7%CE%DC%ED%DA%E8%F3%E7%F0%F7%EF%F7%FB%F7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%10%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%96%C2%F1%AE%0E%20%00%C4%8C%26%40%DF%17%2FD%A2d%08%F8%7C%86%96C%20%60%8C%0A%83%C1%D1%87%605%0C%BD%24%94%D0%BB!%5B%8D%82O*%F5%19%01I%D7t%DD%93%B9%10ev%AF%FA2%0C%CElz%5D%DEs%EA%0E%7C9%3A%0E%5C%7Ci%2F%0B%04%01%5Ek%02%3A%0F%03%8AlF%82.b%00x%98x%04%87%2C%07%04%A0Q%02Q%A4%03%403%0CN%0B%0A%0EB%22%AB%8F%25%0E%B1%B4%B5%B6%B7%B8%B9%BA%BB%BC%B5!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BE%F0(%1Cq%EA%00%02%40%D4f%02%FC%BF%C2%0B%91(%19%02%40%A0%A1%E5%10%08%18%A3%C2%60%90%04%22X%0D%C3o)%25%FCr%CAV%A3%00%A4R%81H%C0%D2Um%FFh.%C4%D9%FD%BB%BE%0C%83%B4%DB~%A7%FF%A01%07~%3B1%0E%5E~k%2F%0B%04%01%60m%025%03%8CnH%84.d%00z%99z%04%89%2C%07%04%A1S%02S%A5%03B0%0CP%0B%0A%0ED%22%AC%3C%24%0E%B2%B5%B6%B7%B8%B9%BA%BB%BC%2B!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF%A7p%D0%A6%03%08%00%81%8F%09%80PXx!%12%25C%6084%B4%1C%02%01cT%18%0C%98C%04%ABa%10%3A%AB%04!%AF%D9j%14%86%D7%EBp%09p%BA%B0p%E1%CD%85P%C7%85%DA%97a%C0%8E%E7%F5wBS1%07%81%3E1%0Ea%81n%2F%0B%04%01cp%022%03%8FqK%87.g%00%7D%9C%7D%04%8C%2C%07%04%A4V%02V%A8%03E0%0CS%0B%0A%0EG%22%AF%3F%0F%0E%B5%B8%B9%BA%BB%BC0!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%8B%C2q%8F%0E%20%00%84%5D%02%40%24%16%5E%88D%C9%10(%16%0D-%87%40%C0%18%15%06%03g%11%C1j%18%88%D0%2B%81%F8%7B%B6%1A%85b6%5Bl%02%A0.%AD%9C%A8s!%D8s%22%F7e%18%B8%E7%7B%7CyDU1%07%83A1%0Ec%83p%2F%0B%04%01er%022%03%91sM%89.i%00%7F%9E%7F%04%8E%2C%07%04%A6X%02X%AA%03G0%0CU%0B%0A%0EI%22%B17%0E%3B%B9%BA%BB)!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DF%A8p%E0%A2%03%08%00%02.%01(%16%0B%2FD%A2d%08%18%8D%86%96C%20%60%8C%0A%83%C1%D3%88%605%0C%C5(%96P%04B%5B%8D%82Q%AB5%3A%01Q%D7v%5E%DC%B9%10mz%B1%FB2%0C%DEt%7C%7DzEV1%07%84B1%0Ed%84q%2F%0B%04%01fs%022%03%92tN%8A.j%00%80%9F%80%04%8F%2C%07%04%A7Y%02Y%AB%03H0%0CV%0B%0A%0EJ%22%B27%0E%3C%BA%BB%24!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF4%2C%1Cu%E9%00%02%40%E4%A2%04%608%2C%BC%10%89%92!%40%24%1AZ%0E%81%801*%0C%06M%22%82%D50%0C%9FV%C2%B0%E7l5%0AD%2C%96%C8%04%3C%5D%D9%F8%10%E7B%AC%E5%C3%ED%CB0h%CB%F5%7BxCT1%07%82%3F1%0Eb%82o%2F%0B%04%01dq%022%03%90rL%88.h%00~%9D~%04%8D%2C%07%04%A5W%02W%A9%03F0%0CT%0B%0A%0EH%22%B0%40%0E%40%B8%B9%BA%BB%2F!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%FC%0A%87%8C%3A%80%00%10v%99%00%40%60%E1%85H%94%0C%81%60%D0%D0r%08%04%8CQa0P%06%11%AC%86%01%C8%9C%12%80%BAe%ABQ%08V%AB%C1%24%80%E9%B2%BA%815%17%02%FD%06b_%86%81%FA%7D%C7%D7%81Q1%07%7F%3C1%0E_%7Fl%2F%0B%04%01an%022%03%8DoI%85.e%00%7B%9A%7B%04%8A%2C%07%04%A2T%02T%A6%03C0%0CQ%0B%0A%0EE%22%AD%3D%23%0E%B3%B6%B7%B8%B9%BA%BB%BC%22!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BE%F0(%1Cq%EA%00%02%40%D4f%02%FC%BF%C2%0B%91(%19%02%40%A0%A1%E5%10%08%18%A3%C2%60%90%04%22X%0D%C3o)%25%FCr%CAV%A3%00%A4R%81H%C0%D2Um%FFh.%C4%D9%FD%BB%BE%0C%83%B4%DB~%A7%FF%A01%07~%3B1%0E%5E~k%2F%0B%04%01%60m%025%03%8CnH%84.d%00z%99z%04%89%2C%07%04%A1S%02S%A5%03B0%0CP%0B%0A%0ED%22%AC%3C%24%0E%B2%B5%B6%B7%B8%B9%BA%BB%BC%2B!%00%3B");
            } else {
                maxa.firstChild.setAttribute('src',"data:image/gif,GIF89a%1E%00%1E%00%84%0F%00%13%87%00%1A%8A%08!%8E%10%2C%94%1CC%9F4k%B4%60%8C%C4%83%AA%D4%A4%C1%DF%BD%CA%E4%C6%D1%E7%CE%DC%ED%DA%E8%F3%E7%F0%F7%EF%F7%FB%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%11Created%20with%20GIMP%00!%F9%04%05%0A%00%10%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AE%E6A%10Ea%20%EC*%008n%D4j%9E%EF%BC%93%C3%A7%0B%9E%12D%C0%C1%D8%0A%E0%04N%1A%93d%18%10%A5SQ%81p%CD%8E%0AV%1F%C3%ABM%26%98%8D%04cQM%12%0Cc%1E%E2%96%24%DE%DE%2C%87%C1Y%CF%F1%0B5%0D%05%7DD%03%0AA%04%03%7CDN%03%0BF%08%03a%8C%86S%06%7D%03gY%07%00%01t%00%02XS%0E%04%01%A5%00%86%0Ed%0F%0Ba%04%8F%ABe%04q%B1%0F%0C%07%B4%B5%BA%BB%BC%BD%BE%BF%22!%00!%F9%04%05%0A%00%1F%00%2C%06%00%02%00%12%00%17%00%00%05%81%E0%23%8Ed9~hz%10DQ%18H*%CB%C2l%9Bv.%3B%B6%A1%A3%09%80px%F8%7D%0E%01%94%20i%FC%18%06M%1Ba%163Be%8CY%A9%60K%94%1A%09%C6%E2)50F%08%C1p%CD%AE%11%0C%0E%03%F3%17%10r%1B%05%B6%5E8P%A4%A6s3%00%03%0B2%08%03W3%01%7D%3D%7B%83%09%3A%07%00%1FjB%02U9%0E%04%01%9B%83%0A%3C%3F%0B%03B%04%85Qy%04YQ%1F%0C%07%AA6!%00!%F9%04%05%0A%00%1F%00%2C%06%00%03%00%12%00%18%00%00%05%8A%E0%23%8Edi%9E%E8%A7%AE%07A%14%85%81%AC%AA)%D0x%5D%E6FN%3B%80%A0%B0%E7S%25%84%C2CQu%08%A8%04%CE%A5%8AH%9BI%098%EB%AAT%18%E0%18(Q!%97(5%12%8C%85%C1%8B%23%18%C0%22%84%00I%17%DE%DC%0EC%A0N%DF%03%C6%0D%05%7Cu%03%0A%2B%04%03Q8%7B%03%0BU%03%03%7C%01%85%3C%83%03%09E%07%00%01sA%02Z9%0E%04%01%A3%00%85%0ER%0B%91%00%04%8ER*%82%04%0C%AF%2B%0C%07%B3%3E!%00!%F9%04%05%0A%00%1F%00%2C%06%00%05%00%12%00%19%00%00%05%90%E0%23%8Edi%9Eh%AA%96%07A%14%85%81%7C4m%0A5m%E4%9F%09%FC%C0%1D%2F%E7%00%06%87%B9%84%F1w%40%D6%0E%01%9A%20%3As~%0C%03%5E%B5V*%10%B4%AAB6%C7%08%0F%13%A5F%82%B1%C0%0E%09%86%B2%08!X%DA%01u%B8%C3%10%B8%1B%FB%00%05%1F%0D%05~K%03%0A5%04%03%80K%7D%03%0B9%08%03%03w%01%88C%06~%03%09N%07%00%01u%3F%02%5BC%0E%04%01%A8%00%88%0EV%1F%0B%95%00%04%91%AE4%85%04%0C%B55%0C%07%B9H!%00!%F9%04%05%0A%00%1F%00%2C%06%00%07%00%12%00%17%00%00%05%87%E0'%8E%07A%14%85%81%8C%2C%2B%000l%B4t%1C%D3%AD%83%EFbB%1F%BC%CF!%20%12%10W%3C%C3%C0%06%08~%0A%04'm%D0b8%99%00%1F%AB%91%60%2C%944%82%C1*B%BC%B0%CC%97%D8a%20%06%03%B0%C2%A3Q%40c%07%8A%87%9E0p%B7%88%03%0B%0F%23%08%03T8xz%8A%0F%06v%03%09%8B%8B%40%01%02%23%02%08%8B9Q%04%80%0A%3A%23%91%0F%0BK%00%04%82%A1%A1%05%1F%04%0C%A88%0C%07%AD%A8%B3%B4%0F!%00!%F9%04%05%0A%00%1F%00%2C%06%00%04%00%12%00%19%00%00%05%8C%E0'%8E%07A%14%85%81%8C%2C%2B%000l%B4t%1C%CF%F4%E8%D8r%3E%26%3C%C0%C1'%3A%04D%82%E3%8Ah%18%B4%96%BE%02%E1I%FC%14%06%3CF%B5%10L%B4%1A%09%C6%A2%19%24%18%B4%22%C4%2B%C8%7B%99%1D%86%00%DB%26%07%14%1E%0D%EE%DC6P%3C%FE%04%03G4r%03%0B%7F%7F%08%03N%84%7D%88%8884%03%09%8F%8FC%01%02%23%02%08%95%8F%0E%04%01%A0%1F%7D%0E%9D%8F%0B%8C%04%87%A6%95%5C%04%0C%AC%9D%0C%07%B0%B1%B6%B7%B8%B9%9D!%00!%F9%04%05%0A%00%1F%00%2C%06%00%02%00%12%00%18%00%00%05%8B%E0'%8E%07A%14%85%81%8C%2C%2B%000l%B4t%1C%CF%F4%E8%D8p%CE%26%B4%83Ot%08%88%04%C6%D5%D00h)%7D%05%02o(*%D0%18%D4%0F%0F%00d5%12%8C%05sK0%60E%88%D7%96%F7*%3B%0C%81%B5-%0E(%3C%1A%059o%A0x%F8%09%03F4q%03%0B~~%08%03M%83%7C%87%87%06r%03%09%8E%8EB%01%02%23%02%08%94%8E%0E%04%01%9F%1F%7C%0E%9C%8E%0B%030%04%86%A5%94y%04%0C%AC%9C%0C%07%B0%B1%B6%B7%B8%0F!%00!%F9%04%01%0A%00%1F%00%2C%06%00%01%00%12%00%17%00%00%05%87%E0'%8E%07A%14%85%81%8C%2C%2B%000l%B4t%1C%D3%AD%83%EFbB%1F%BC%CF!%20%12%10W%3C%C3%C0%06%08~%0A%04'm%D0b8%99%00%1F%AB%91%60%2C%944%82%C1*B%BC%B0%CC%97%D8a%20%06%03%B0%C2%A3Q%40c%07%8A%87%9E0p%B7%88%03%0B%0F%23%08%03T8xz%8A%0F%06v%03%09%8B%8B%40%01%02%23%02%08%8B9Q%04%80%0A%3A%23%91%0F%0BK%00%04%82%A1%A1%05%1F%04%0C%A88%0C%07%AD%A8%B3%B4%0F!%00%3B");
            }
        } else {
            var pt = grids[0][2*i].firstChild.getAttribute('title').replace(/[^0-9]*/,'');
            if ((Number(pt)==1 && i!=ts.snapshotLength-1) || i==0) {
                // right
                ts.snapshotItem(i).firstChild.firstChild.setAttribute('src',"data:image/gif,GIF89a%1E%00%1E%00%84%00%00%00%00%00%08%08%08%10%10%10%1C%1C%1C444%60%60%60%83%83%83%A4%A4%A4%BD%BD%BD%C6%C6%C6%CE%CE%CE%DA%DA%DA%E7%E7%E7%EF%EF%EF%F7%F7%F7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%10%00%2C%00%00%00%00%1E%00%1E%00%00%05%91%E0%23%8Edi%9Eh%AA%AEl%7B%1E%82%DB%12%80%008rZ%00%3C%9F%E4%26C%AF%170%94%12%88%16b%D8%1B%0C%0A%23%86%40%80c%09%7B6%00%E1%F9%B8%1A%1A%AEk%608%00%94y%05%B0%EB%C0l%F3%80Kw3%99%8B%BB%03%03%23%90!%E7%E9%814r%07%40%5D%7DZU2Ym%02%01%04%0B94cm%8D%039%06%81%00%01%92%3C%92P2%05N%A1%03%02N%04%A6%839%0A%8F%0FH%0E%AA%0F%0C%0C%84%26%88%B3%B6%B7%B8%B9%BA%BB%BC%BD%BE2!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BE%E9!%C0%2B%01%08%80C%9F%05%E0%FB%89%1D%C9%F0%FB%05%0C%A5%04%A2%85(%FE%06%83%C2%88!%10%E8X%C4%1F%0E%40%88%3E%B2%86%86%2B%1B(%0E%00g_A%EC%3A8%DF%3EZ%13%FE%5C%C2%E6%F0%C0%00Ic%D0%7D%7C46t%07%3BYt%04W%2F%5Bo%02%01%04%0B06eo%8F%030%06%83%00%01%94%3E%94R%2F%05P%A3%03%02P%04%A8%850%0A%91%0FJ%0E%AC%0F%0C%0CB%25%8A%B5%B8%B9%BA%BB%BC%BD%BE%BF%23!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF%CF!%D0'%01%08%80%83%8F%05%80P%98%F8%19%86%C3%80%A1%94%40%B4%10%C8%E1%60P%181%04%02%1F%EB8%E4%01%08%D4%07%D7%D0pq%03%C8%01%40-%2C%94%5D%87%A8%5C%18%83%CE%A5N%98%7D%1E%18%2Cc%0CwB%7F1%3Aw%072%5Cw%04Z%2F%5Er%02%01%04%0B0%3Ahr%92%030%06%86%00%01%97B%97U%2F%05S%A6%03%02S%04%AB%880%0A%94%0FM%0E%AF%0F%0C%0C%3F%22%8D%B8%BB%BC%BD%BE%BF%24!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%90%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%1F%82%5D%12%80%008%BAG%01%40%24%26l%86b1%60(%25%10-%84%B28%18%14F%0C%81%00%C8J%16%7D%00%82%F5%E154%5C%DE%80r%00%60%13%0Bg%D7aJ'%C6%A4u*%14%86%AF%07%06M1%0CyD%811%3Cy%072%5Ey%04%5C%2F%60t%02%01%04%0B0%3Cjt%94%030%06%88%00%01%99D%99W%2F%05U%A8%03%02U%04%AD%8A0%0A%96%0FO%0E%B1%0F%0C%0CA%8FA%BC%BD4!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%90%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DF%E8!%E0%23%01%08%00%07%AE%00(%16%136%83%D1%180%94%12%88%16bi%1C%0C%0A%23%86%40%20d)%8D%40%00%E1%FA%F8%1A%1A%AEo%609%00%B4%8B%05%B4%EB%40%AD%17cS%7B5%0A%CB%DB%03%03N1%0CzE%821%3Ez%072_z%04%5D%2Fau%02%01%04%0B0%3Eku%95%030%06%89%00%01%9AE%9AX%2F%05V%A9%03%02V%04%AE%8B0%0A%97%0FP%0E%B2%0F%0C%0C8%90%3C%BD-!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%91%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF4%7B%08%B5I%00%02%E0%E4%A2%02%608L%E4%0CDb%C0PJ%20Z%88%24q0(%8C%18%02%C1%8F%85%24%F6%00%84%EA%A3kh%B8%BA%81%E4%00%B0%1E%16%CC%AE%83t%3E%8CE%E9%D3'%ECN%0F%0C%981%0CxC%801%3Bx%072%5Dx%04%5B%2F_s%02%01%04%0B0%3Bis%93%030%06%87%00%01%98C%98V%2F%05T%A7%03%02T%04%AC%890%0A%95%0FN%0E%B0%0F%0C%0C%40%0F%8E%B9%BC%BD%BE%B9!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%7C%1E%82%9C%12%80%008vY%00%40%60%A2'2%04%83%01C)%81h!%8E%C1%C1%A00b%08%04%3C%961%A8%03%10%A6%8F%AD%A1%E1%DA%06%8E%03%40%1AX%20%BB%0E%D080%F6%94G%9B%B0%BA%3C0P%C6%18v%40~18v%072%5Bv%04Y%2F%5Dq%02%01%04%0B08gq%91%030%06%85%00%01%96%40%96T%2F%05R%A5%03%02R%04%AA%870%0A%93%0FL%0E%AE%0F%0C%0CD%23%8C%B7%BA%BB%BC%BD%BE%BF-!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%92%E0%23%8Edi%9Eh%AA%AEl%EB%BE%E9!%C0%2B%01%08%80C%9F%05%E0%FB%89%1D%C9%F0%FB%05%0C%A5%04%A2%85(%FE%06%83%C2%88!%10%E8X%C4%1F%0E%40%88%3E%B2%86%86%2B%1B(%0E%00g_A%EC%3A8%DF%3EZ%13%FE%5C%C2%E6%F0%C0%00Ic%D0%7D%7C46t%07%3BYt%04W%2F%5Bo%02%01%04%0B06eo%8F%030%06%83%00%01%94%3E%94R%2F%05P%A3%03%02P%04%A8%850%0A%91%0FJ%0E%AC%0F%0C%0CB%25%8A%B5%B8%B9%BA%BB%BC%BD%BE%BF%23!%00%3B");
            } else if (Number(pt)==2 || i==ts.snapshotLength-1) {
                // left
                ts.snapshotItem(i).firstChild.firstChild.setAttribute('src',"data:image/gif,GIF89a%1E%00%1E%00%84%00%00%00%00%00%08%08%08%10%10%10%1C%1C%1C444%60%60%60%83%83%83%A4%A4%A4%BD%BD%BD%C6%C6%C6%CE%CE%CE%DA%DA%DA%E7%E7%E7%EF%EF%EF%F7%F7%F7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%11Created%20with%20GIMP%00!%F9%04%01%0A%00%10%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%96%C2%F1%AE%0E%20%00%C4%8C%26%40%DF%17%2FD%A2d%08%F8%7C%86%96C%20%60%8C%0A%83%C1%D1%87%605%0C%BD%24%94%D0%BB!%5B%8D%82O*%F5%19%01I%D7t%DD%93%B9%10ev%AF%FA2%0C%CElz%5D%DEs%EA%0E%7C9%3A%0E%5C%7Ci%2F%0B%04%01%5Ek%02%3A%0F%03%8AlF%82.b%00x%98x%04%87%2C%07%04%A0Q%02Q%A4%03%403%0CN%0B%0A%0EB%22%AB%8F%25%0E%B1%B4%B5%B6%B7%B8%B9%BA%BB%BC%B5!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BE%F0(%1Cq%EA%00%02%40%D4f%02%FC%BF%C2%0B%91(%19%02%40%A0%A1%E5%10%08%18%A3%C2%60%90%04%22X%0D%C3o)%25%FCr%CAV%A3%00%A4R%81H%C0%D2Um%FFh.%C4%D9%FD%BB%BE%0C%83%B4%DB~%A7%FF%A01%07~%3B1%0E%5E~k%2F%0B%04%01%60m%025%03%8CnH%84.d%00z%99z%04%89%2C%07%04%A1S%02S%A5%03B0%0CP%0B%0A%0ED%22%AC%3C%24%0E%B2%B5%B6%B7%B8%B9%BA%BB%BC%2B!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF%A7p%D0%A6%03%08%00%81%8F%09%80PXx!%12%25C%6084%B4%1C%02%01cT%18%0C%98C%04%ABa%10%3A%AB%04!%AF%D9j%14%86%D7%EBp%09p%BA%B0p%E1%CD%85P%C7%85%DA%97a%C0%8E%E7%F5wBS1%07%81%3E1%0Ea%81n%2F%0B%04%01cp%022%03%8FqK%87.g%00%7D%9C%7D%04%8C%2C%07%04%A4V%02V%A8%03E0%0CS%0B%0A%0EG%22%AF%3F%0F%0E%B5%B8%B9%BA%BB%BC0!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%8B%C2q%8F%0E%20%00%84%5D%02%40%24%16%5E%88D%C9%10(%16%0D-%87%40%C0%18%15%06%03g%11%C1j%18%88%D0%2B%81%F8%7B%B6%1A%85b6%5Bl%02%A0.%AD%9C%A8s!%D8s%22%F7e%18%B8%E7%7B%7CyDU1%07%83A1%0Ec%83p%2F%0B%04%01er%022%03%91sM%89.i%00%7F%9E%7F%04%8E%2C%07%04%A6X%02X%AA%03G0%0CU%0B%0A%0EI%22%B17%0E%3B%B9%BA%BB)!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DF%A8p%E0%A2%03%08%00%02.%01(%16%0B%2FD%A2d%08%18%8D%86%96C%20%60%8C%0A%83%C1%D3%88%605%0C%C5(%96P%04B%5B%8D%82Q%AB5%3A%01Q%D7v%5E%DC%B9%10mz%B1%FB2%0C%DEt%7C%7DzEV1%07%84B1%0Ed%84q%2F%0B%04%01fs%022%03%92tN%8A.j%00%80%9F%80%04%8F%2C%07%04%A7Y%02Y%AB%03H0%0CV%0B%0A%0EJ%22%B27%0E%3C%BA%BB%24!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8E%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%2C%CF4%2C%1Cu%E9%00%02%40%E4%A2%04%608%2C%BC%10%89%92!%40%24%1AZ%0E%81%801*%0C%06M%22%82%D50%0C%9FV%C2%B0%E7l5%0AD%2C%96%C8%04%3C%5D%D9%F8%10%E7B%AC%E5%C3%ED%CB0h%CB%F5%7BxCT1%07%82%3F1%0Eb%82o%2F%0B%04%01dq%022%03%90rL%88.h%00~%9D~%04%8D%2C%07%04%A5W%02W%A9%03F0%0CT%0B%0A%0EH%22%B0%40%0E%40%B8%B9%BA%BB%2F!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BEp%FC%0A%87%8C%3A%80%00%10v%99%00%40%60%E1%85H%94%0C%81%60%D0%D0r%08%04%8CQa0P%06%11%AC%86%01%C8%9C%12%80%BAe%ABQ%08V%AB%C1%24%80%E9%B2%BA%815%17%02%FD%06b_%86%81%FA%7D%C7%D7%81Q1%07%7F%3C1%0E_%7Fl%2F%0B%04%01an%022%03%8DoI%85.e%00%7B%9A%7B%04%8A%2C%07%04%A2T%02T%A6%03C0%0CQ%0B%0A%0EE%22%AD%3D%23%0E%B3%B6%B7%B8%B9%BA%BB%BC%22!%00!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%1E%00%1E%00%00%05%8F%E0%23%8Edi%9Eh%AA%AEl%EB%BE%F0(%1Cq%EA%00%02%40%D4f%02%FC%BF%C2%0B%91(%19%02%40%A0%A1%E5%10%08%18%A3%C2%60%90%04%22X%0D%C3o)%25%FCr%CAV%A3%00%A4R%81H%C0%D2Um%FFh.%C4%D9%FD%BB%BE%0C%83%B4%DB~%A7%FF%A01%07~%3B1%0E%5E~k%2F%0B%04%01%60m%025%03%8CnH%84.d%00z%99z%04%89%2C%07%04%A1S%02S%A5%03B0%0CP%0B%0A%0ED%22%AC%3C%24%0E%B2%B5%B6%B7%B8%B9%BA%BB%BC%2B!%00%3B");
            }
        }
        if (grid.m[2*i]==grid.x[2*i])
            ts.snapshotItem(i).firstChild.firstChild.setAttribute('title','Payout = '+grid.e[-1][2*i]);
        else
            ts.snapshotItem(i).firstChild.firstChild.setAttribute('title','E(payout) = '+grid.e[-1][2*i]+', min = '+grid.m[2*i]+', max = '+grid.x[2*i]);
    }
    if (maxa) {
        if (GM_getValue('porkorepeat','0')>0) 
            window.location.pathname = maxa.getAttribute('href');
        return maxa.getAttribute('href');
    }
}

function playAgain() {
    var s = document.getElementById('playporkoagain');
    if (s) {
        var times = s.options[s.options.selectedIndex].value;
        if (times=='Forever') {
            times = 99999999; // not quite forever, but close enough
        }
        GM_setValue('repeatgame',(times-1));
        var x = document.getElementById('playporkolink');
        if (x) {
            window.location.pathname = x.getAttribute('href');
            GM_setValue('repeatinggame',1);
        } else {
            GM_setValue('repeatgame',0);
            GM_setValue('repeatinggame',0);
            GM_log('lost sync, giving up');
        }
    }
}



function repeatit() {
    var doit = document.evaluate( '//a[contains(.,"Care to play again?")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (doit.singleNodeValue) {
        var r = GM_getValue('repeatgame',0);
        //GM_log('repeatgame: '+r);
        if (r==0) {
            GM_setValue('repeatinggame',0);
            var b = document.createElement('input');
            b.setAttribute('type','button');
            b.setAttribute('value','Auto-Repeat Play');
            var s = document.createElement('select');
            s.setAttribute('id','playporkoagain');
            b.addEventListener('click',playAgain,false);
            for (var i=0;i<30;i++) {
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(String(i+1)));
                option.setAttribute('value',i+1);
                s.appendChild(option);
            }
            var option = document.createElement('option');
            option.appendChild(document.createTextNode('Forever'));
            option.setAttribute('value','Forever');
            option.setAttribute('title','Repeat until you run out of turns or the Transpondent effect.');
            s.appendChild(option);

            var p = doit.singleNodeValue.parentNode;
            doit.singleNodeValue.setAttribute('id','playporkolink');
            var c = document.createElement('p');
            c.appendChild(b);
            c.appendChild(document.createTextNode('\u00A0\u00A0'));
            c.appendChild(s);
            p.appendChild(c);
        } else {
            GM_setValue('repeatgame',(r-1));
            GM_setValue('repeatinggame',1);
            window.location.pathname = doit.singleNodeValue.getAttribute('href');
        }
    }
}

doPage(document.getElementById('porko'));
