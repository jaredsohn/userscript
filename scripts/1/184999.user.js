// ==UserScript==
// @name        Bierflesje
// @namespace   flesje
// @description Add links to bierdopje.com for dutch subtitles on Subtitleseeker
// @include     http://www.bierdopje.com/shows/*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==

var API_KEY = 'SUBTITLESEEKER-API-KEY-GOES-HERE';

var FLAG_IMG = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%0B%08%02%00%00%00%F9%80%9An%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01WIDATx%DAb%FC%CF%80%00%FFP%D9X%11%40%00%92%E4%E0%08%00%08%06%02%60%82%AEU%A0%0B5%A8%CD%2Fw9%8C%CF~%B6%BD%EC%E3%A2LO%1A%29%A4%11%0EV%A0%04%04%2A%E2%BB%D7%3C%02%08%AC%81%E1%CF%FF%27%CF%81J%19%FE%FE%FB%FF%FB%0F%C3%DF%DF%40%12%8C~%FF%FF%05%24%7F%FD%FF%05%14%F9%C5%28%2B%0D%B4%01%20%80X%18D%0D%FF%CB%C83%B0%F3%80T%FF%F9%03%B6%01%88%FE%80%11%98%01%D1%0C%94%12%17%05j%00%08%20%C6%8F%1F%3F%F2%F2%F2%82%9C%F4%FF%3F%03%18%E2%02%8C%8C%8C%0F%1E%3C%00%08%20%96%7F%FF%FEAT%8340%E0V%0E%94ed%FC%F3%E7%0F%40%00%B1%FC%83%2B%C2o%3E%D0%06%B0%89%00%01%C4%C8%A0%D8_%5Ek%FF%E8%F5%D7%DF%7F%FE%FD%F9%FB%EF%D7%9F%BF%BF%FF%FE%FB%0D%24%FF%C0%C9%7F%7F%80%E4%DF%BF%0A%E2%3C%7B%3Bg%00%04%10%0B%C3%B3O%EF%BF%FEz%FD%F1%07H%0E%A4%E1%DF%AF%DF%40u%7F%7F%815%40H%A0%86%3F%FF%FE%F1p%B220%BC%03%08%20%16%86_%20u%92%C2%9C%10%93%80%96%FC%06%23%B0%A9%40%F2%EF%9F%7F%FF%FF%FE%FD%F7%F7%DF%3F%60%F8%01%9D%04%10%40%8C%C0hc%60%F8%05F%7F%90%18%7F%90D%FE%80%A3%18B2%01%04%18%00k%CAg%80%BA%FB%15%D1%00%00%00%00IEND%AEB%60%82';
var FLAG_GREY_IMG = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%0B%08%00%00%00%00S%89R%E5%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00%09vpAg%00%00%00%10%00%00%00%0B%00%F5%F0fY%00%00%00%AAIDAT%08%D7c%F0%81%02o%2F%2FOO%0Fww%06%9F%25K%16-%9C%3Fg%D6%F4%29%13z%3B%DB%9A%DD%80%02%13%FAz%3A%DA%9A%EA%AB%CB%8A%F3%B2%EA%DD%18%E2%B6%AF%5C%BEd%D1%FC%D93%A6N%EA%EF%EE%98%E1%CA%F0%F1%DF%BF%BF%7F%FE%FC%FE%F5%F3%C7%F7o_%BF%7C%BD%CA%F0%1E%99%FF%F9%EBE%86w%C8%FCO_.2%A8%CCh%AC%AD%2A%2B%CA%CBJK%8A%8D%0A%CB%E7d%10%EE%29%CC%CDJM%88%89%08%F1%F7vwM%60g%E0%EFh%05%29%29%CE%CF%C9HMJ%88eg%E0%E3%E5%E5%E1%E1%E6%E2%E2%E4%E4%E0%60%07%02%00%93e%5E%B3%28%A9z%EC%00%00%00%25tEXtdate%3Acreate%002013-11-28T07%3A37%3A01%2B01%3A00N-Q%E8%00%00%00%25tEXtdate%3Amodify%002013-11-28T07%3A36%3A59%2B01%3A00%AB%BD%C2i%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%00IEND%AEB%60%82'

function main()
{
    addGlobalStyle('.sub_view{position:absolute; z-index: 1; display:none; background-color: #F6F6F5; width: 500px; padding: 10px; margin-left: -255px; margin-top: -25px; border: 1px solid #303030}');
    var URL = window.location;
    var regexResult = URL.pathname.match(/\/shows\/(.+)\/episodes\/season\/(.+)/);
    var showName = regexResult[1];
    var season = regexResult[2];
    getIMDB(showName);
};

function getIMDB(showName)
{
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.subtitleseeker.com/search/?api_key=' + API_KEY + '&return_type=json&max_results=1&search-in=tv_titles&q=' + showName,
  
        onload: function(response) {
            var json = JSON.parse(response.responseText);
            if (json.results.returned_items == 1)
            {
                var imdb = json.results.items[0].imdb;
                getEpisodes(imdb);
            }
            
        }
    });
    
}

function getEpisodeSubs(season, episode, imdb, node, parent)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.subtitleseeker.com/get/title_subtitles/?api_key=' + API_KEY + '&return_type=json&imdb=' + imdb + '&language=Dutch&season=' + season + '&episode=' + episode,
  
        onload: function(response) {
            var json = JSON.parse(response.responseText);
            var items = json.results.total_matches;
            var newImg = document.createElement('img');
            if (items == 0)
            {
                newImg.src = FLAG_GREY_IMG;
            } else {
                newImg.src = FLAG_IMG;
                var srtList = document.createElement('div');
                
                for (var i = 0; i < items; i++) { 
                    var item = json.results.items[i];
                    srtList.innerHTML = srtList.innerHTML + "<b><a href=\"" + item.url + "\">" + item.release + "</a> - " + item.added_date + " (" + item.downloads + " downloads)<br />";
                }
                
                srtList.className = "sub_view";
                srtList.id='sub-s'+season+'e'+episode;
                
                newImg.onmouseover=function() { showElem('sub-s'+season+'e'+episode); };
//                srtList.onmouseout=function() { hideElem('sub-s'+season+'e'+episode); };
                srtList.addEventListener('mouseout',makeMouseOutFn(srtList, 'sub-s'+season+'e'+episode),true);

                node.appendChild(srtList);
            }
            node.appendChild(newImg);
            parent.appendChild(node);
        }
    });
}


function showElem(elemID)
{
    var elem = document.getElementById(elemID);
    elem.style.display = 'block';
}

function hideElem(elemID)
{
    var elem = document.getElementById(elemID);
    elem.style.display = 'none';
}

function makeMouseOutFn(elem, elemID){
    var list = traverseChildren(elem);
    return function onMouseOut(event) {
        var e = event.toElement || event.relatedTarget;
        if (!!~list.indexOf(e)) {
            return;
        }
        hideElem(elemID);
    };
}

function traverseChildren(elem){
    var children = [];
    var q = [];
    q.push(elem);
    while (q.length > 0) {
      var elem = q.pop();
      children.push(elem);
      pushAll(elem.children);
    }
    function pushAll(elemArray){
      for(var i=0; i < elemArray.length; i++) {
        q.push(elemArray[i]);
      }
    }
    return children;
}


function getEpisodes(imdb)
{
    var table = document.getElementsByTagName('table')[0];
    
    var cols = table.getElementsByTagName('col');
    var lastcol = cols[cols.length - 1]
    lastcol.style.width = "15%";

    var newElem = document.createElement('col');
    newElem.style.width = '15%';
    var colgroup = table.getElementsByTagName('colgroup')[0];
    colgroup.appendChild(newElem);
    
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) { 
        var headers = rows[i].getElementsByTagName('th');
        if (headers.length == 0)
        {
            var cells = rows[i].getElementsByTagName('td');
            var epInfo = cells[1].innerHTML;
            
            var regexResult = epInfo.match(/S(.+)E(.+)/);
            var season = parseInt(regexResult[1]);
            var episode = parseInt(regexResult[2]);
            
            var newElem = document.createElement('td');
            
            getEpisodeSubs(season, episode, imdb, newElem, rows[i]);
        }
        else
        {
            var newElem = document.createElement('th');
            newElem.innerHTML = 'Ondertiteling';
            newElem.className = 'bluerow';
            rows[i].appendChild(newElem);
        }
    }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

main();