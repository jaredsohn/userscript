// ==UserScript==
// @name           Amazon_hatebu_checker
// @namespace      http://d.hatena.ne.jp/Koonies/
// @description    Amazonで「はてなブックマーク」の新着エントリーをチェック
// @include        http://www.amazon.co.jp/*
// @version        1.0
// ==/UserScript==

(function() {
    var ITEM_NUM = 7;               //  新着リストに表示するアイテム個数
    var TWEETS_DISPLAY = 1;         //  Tweet数表示　0:Off / 1:On
    var LOAD_INTERVAL_MIN = 30;     //  キャッシュの更新タイミング ［分］
    
    var LOAD_INTERVAL_MSEC = LOAD_INTERVAL_MIN　*　60　*　1000;
    
    function $x(exp) {return document.evaluate(exp,document,null,7,null);}
    function $xi(exp,index) {return $x(exp).snapshotItem(index);}
    
    if (location.href.search(/[^0-9A-Z]([B0-9][0-9A-Z]{9})([^0-9A-Z]|$)/) != -1)
    {
        var amazon_tag = "amazon_hatebu_checker";
        var isbn = RegExp.$1;
        var box = $xi('id("handleBuy")/table[@class="buyingDetailsGrid"]');
        var tr = document.createElement('tr');
        var div;
        var filter_num = GM_getValue("filter_num") || "3";
        
        tr.innerHTML = 　'<td valign="top" width="100%">'
                      +　'<hr size="1" noshade="noshade" class="EBBdivider" style="margin-top: 7px;">'
                      +　'<div class="buying" style="margin-top: 7px;">'
                      +　'<table border="0" cellspacing="0" cellpadding="0" class="moreBuyingChoices" width="215"><tbody><tr><td width="190" class="topLeft">'
                      +　'<table cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td>'
                      +　'<div style="text-align: center; font-weight: bold; padding-bottom:10px;">はてなブックマークの新着エントリー</div>'
                      +　'<div>'
                      +　'<div align="center" id="quantityDropdownFilter" style="margin-bottom: 5px;"><label for="quantity">フィルタ:</label>&nbsp;<select id="quantityFilter" name="quantity"><option selected="" value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option></select>&nbsp;<label for="quantity">users</label></div>'
                      +　'<hr size="1" noshade="noshade" class="EBBdivider">'
                      +　'<div id="amazon_hatebu_checker" style="margin-top: 5px;">'
                      +　'読み込み中...'
                      +　'</div>'
                      +　'</div>'
                      +　'</td></tr></tbody></table>'
                      +　'</td>'
                      +　'<td width="13" class="topRight">&nbsp;</td></tr>'
                      +　'<tr> <td class="bottomLeft">&nbsp;</td> <td class="bottomRight" height="12">&nbsp;</td> </tr>'
                      +　'</tbody></table></div></td>';
        
        box.appendChild(tr);
        
        function getRssData() {
            var rss_url = 　"http://b.hatena.ne.jp/entrylist?sort=hot&threshold="
                        　+　filter_num 
                        　+　"&url=http%3A%2F%2Fwww.amazon.co.jp%2Fgp%2F&mode=rss";
            
            div.innerHTML = 　'<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJ'
                           +　'KysrL6%2BvhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2F'
                           +　'C05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFdyA'
                           +　'gAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDB'
                           +　'gFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACA'
                           +　'mlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx%2BlwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6%2F'
                           +　'3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh%2BQQJCgAAACwAAAAAEAAQAAAFeCAgA'
                           +　'gLZDGU5jgRECEUiCI%2ByioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO'
                           +　'7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l%2FAg1AXySJgn5LcoE3QXI3IQAh%2BQQJCgAAACwAAAAAEAAQAAAFd'
                           +　'iAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK%2Fe8LRIHn%2Bi1cK0IyKdg0VAoljYI'
                           +　'g%2BGgnRrwVS%2F8IAkICyosBIQpBAMoKy9dImxPhS%2BGKkFrkX%2BTigtLlIyKXUF%2BNjagNiEAIfkECQoAAAAsAAAAA'
                           +　'BAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFl'
                           +　'ngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSx'
                           +　'lOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQu'
                           +　'K%2BVgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXk'
                           +　'gIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY'
                           +　'4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3I'
                           +　'CACAkkQZTmOAiosiyAoxCq%2BKPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhS'
                           +　'UkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgI'
                           +　'AICKZzkqJ4nQZxLqZKv4NqNLKK2%2FQ4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJ'
                           +　'QEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5I'
                           +　'CACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm%2BkaCxyxa%2BzRPk'
                           +　'0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh%2BQQJCgAAACwAAAAAEAAQA'
                           +　'AAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb%2BA41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb'
                           +　'7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh%2BQQJCgAAACwAAAAAEAAQAAA'
                           +　'FeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ%2FDkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyR'
                           +　'YNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D"　'
                           +　'alt="now loading" align="top">&nbsp;<b class="small">読み込み中…</b>';
            
            GM_xmlhttpRequest({
                method:"GET", 
                url:rss_url,
                onload:function(x){
                    var item = x.responseText.match(/<item rdf:about=.+\n.+title>/g);
                    var url, title;
                    var html = "";
                    var max = ITEM_NUM;
                    if (max > item.length) { max = item.length; }
                    for (var i=0; i<max; i++) { //for (var i=0; i<item.length; i++)
                        item[i].match(/"(http:.+)".*\n.+<title>Amazon.co.jp： *(.+)<\/title>/);
                        url = RegExp.$1;
                        title = RegExp.$2;
                        if (title.length==0) { continue; }
                        html += '<div style="padding-bottom:7px;">'
                              + '★ <a href="http://www.amazon.co.jp/' + title.replace(/([^:]+)[:]*.*/, "$1").replace(/[\/\[\]\?#]/g, " ")
                              + '/dp/' + url.replace(/^.+[^0-9A-Z]([B0-9][0-9A-Z]{9}).*$/, "$1") + '/ref=nosim?tag=' + amazon_tag + '-22">'
                              + title
                              + '</a>&nbsp;';
                        //  はてブエントリー数
                        html += '<a href="http://b.hatena.ne.jp/entry/' + url + '" target="_blank">'
                              + '<img src="http://b.hatena.ne.jp/entry/image/' + url + '" border="0" vspace="0" align="absbottom" width="44" height="13"/>'
                              + '</a>&nbsp;';
                        //  Tweet数
                        if (TWEETS_DISPLAY != 0) {
                            html += '<a href="http://tweetbuzz.jp/redirect?url=' + url + '" target="_blank">'
                                  + '<img src="http://tools.tweetbuzz.jp/imgcount?url=' + url + '" border="0" vspace="0" align="absbottom" width="44" height="13"/>'
                                  + '</a>';
                        }
                        html += '</div>';
                    }
                    div.innerHTML = html;
                    GM_setValue("data_cache", html);

                    var now = new Date().getTime();
                    GM_setValue("getdata_time", now.toString());
                },
                onerror:function(x){div.innerHTML = "error! (" + x.responseText + ")";}
            });
        }
        
        var select = $xi('id("quantityFilter")');
        
        select.value = filter_num;
        select.addEventListener('change', function() {
            filter_num = select.value;
            GM_setValue("filter_num", filter_num);
            getRssData();
        }, true);

        var now = new Date().getTime();
        div = $xi('id("amazon_hatebu_checker")');
        //  更新タイミングチェック
        if (  ((GM_getValue("data_cache") || 0) == 0)
           || ((now - GM_getValue("getdata_time")) >= LOAD_INTERVAL_MSEC)) {
　           getRssData();
        } else {
            div.innerHTML = GM_getValue("data_cache");
        }
    }
})();
