// ==UserScript==
// @name            Googleの検索結果にCiNiiでの検索結果を表示するスクリプト
// @namespace       http://penguinlab.jp/
// @include         http://www.google.*
// ==/UserScript==

(function () {
    //検索結果の2ページ目以降なら表示しない
    if (location.href.indexOf('&start=') === -1) {
        var q, searchurl;
        
        q = location.href.replace(/^.*[\?&]q=(.*?)[&$].*/, "$1")
        searchurl = "http://ci.nii.ac.jp/opensearch/search?format=rss&q=" + q + "&appid=CiNii09-df84a62cc4643da5c855a66c4a30bda1";

        GM_xmlhttpRequest({
            method: "GET",
            url: searchurl,
            onload: function (response) {
                var resxml, items, items_num, element, innerhtml = '', i, bib;
                
                resxml = (new DOMParser()).parseFromString(response.responseText, 'application/xml');
                items = resxml.getElementsByTagName('item');
                items_num = items.length;
                items_num = (items_num > 3) ? 3 : items_num;
                
                //ヒットしなければ抜ける
                if (items_num === 0) {
                    return;
                }
                
                element = document.createElement('div');
                innerhtml += '<ol style="background-color: #F0F7F9; padding: 3px 8px;">';
                
                for (i = 0; i < items_num; i += 1) {
                    bib = {};
                    // タイトル
                    bib.title = items[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
                    bib.title = (bib.title.length > 40) ? bib.title.substring(0, 40) + "..." : bib.title;
                    
                    // リンク
                    bib.link = items[i].getElementsByTagName('link')[0].childNodes[0].nodeValue;
                    
                    // 著者
                    bib.authors = '';
                    bib.authors += (items[i].getElementsByTagName('dc:creator')[0]) ? items[i].getElementsByTagName('dc:creator')[0].childNodes[0].nodeValue : '';
                    bib.authors += (items[i].getElementsByTagName('dc:creator')[1]) ? '; ' + items[i].getElementsByTagName('dc:creator')[1].childNodes[0].nodeValue : '';
                    bib.authors += (items[i].getElementsByTagName('dc:creator')[2]) ? '; ' + items[i].getElementsByTagName('dc:creator')[2].childNodes[0].nodeValue : '';
                    bib.authors += (items[i].getElementsByTagName('dc:creator')[3]) ? ' ほか' : '';
                    bib.authors += (bib.authors !== '') ? '. ' : '';
                    
                    // 掲載誌
                    bib.publication = (items[i].getElementsByTagName('prism:publicationName')[0]) ? items[i].getElementsByTagName('prism:publicationName')[0].childNodes[0].nodeValue : '';
                    
                    // 巻号
                    bib.volume = (items[i].getElementsByTagName('prism:volume')[0]) ? items[i].getElementsByTagName('prism:volume')[0].childNodes[0].nodeValue : '0';
                    bib.number = (items[i].getElementsByTagName('prism:volume')[0]) ? items[i].getElementsByTagName('prism:volume')[0].childNodes[0].nodeValue : '0';
                    bib.volnum = (bib.volume !== '0') ? bib.volume : '';
                    bib.volnum += (bib.number !== '0') ? '(' + bib.number + ')' : '';
                    
                    bib.spage = (items[i].getElementsByTagName('prism:startingPage')[0]) ? items[i].getElementsByTagName('prism:startingPage')[0].childNodes[0].nodeValue : '';
                    bib.epage = (items[i].getElementsByTagName('prism:endingPage')[0]) ? items[i].getElementsByTagName('prism:endingPage')[0].childNodes[0].nodeValue : '';
                    
                    bib.year = (items[i].getElementsByTagName('dc:date')[0].childNodes[0]) ? items[i].getElementsByTagName('dc:date')[0].childNodes[0].nodeValue.substring(0, 4) : '';
                    
                    bib.html = '<li style="padding-bottom: 5px;"><h3 class="r" style="font-size: medium; display: block;"><a class="l" href="' + bib.link + '">' + bib.title + '</a></h3>' + '<cite class="s" style="font-size: small;">' + bib.authors  + bib.publication + '. ' + bib.year + bib.volnum + ', ' + 'p. ' + bib.spage + '-' + bib.epage + '.</cite>';
                    innerhtml += bib.html;
                }
                innerhtml += '<div style="font-size: small; text-align: right;"><em>by CiNii OpenSearch</em>&nbsp;&nbsp;<a href="http://ci.nii.ac.jp/opensearch/search?q=' + q + '">' + resxml.getElementsByTagName('opensearch:totalResults')[0].childNodes[0].nodeValue + ' 件の検索結果を表示...</a></div></ol>';
                element.innerHTML = innerhtml;
                document.getElementById('center_col').insertBefore(element, document.getElementById('res'));
            }
        });
    }
}());
