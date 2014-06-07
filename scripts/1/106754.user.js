// ==UserScript==
// @name        bing_year
// @description Bingのフィルタに「1 年以内」を追加します。
// @namespace   http://twitter.com/foldrr
// @include     http://www.bing.com/search?*
// ==/UserScript==

(function(){
    var d = document;
    
    // 既に要素が存在する場合は削除する。
    // Bingは検索期間を設定していない場合は絞り込みフィルタ自体が表示されない。
    // 処理単純化のため既存のフィルタを削除して再度作り直す。
    var dateFilter = d.getElementById("dateFilter");
    if(dateFilter){
        dateFilter.parentNode.removeChild(dateFilter);
    }
    
    // フィルタを追加する。
    var refine = d.getElementById("sw_refine");
    refine.insertBefore(createDateFilter(), null);
    
    return;
    
    /**
     * 「日付で絞り込む」要素を追加する。
     */
    function createDateFilter(){
        var dateFilter = d.createElement("div");
        dateFilter.id = "dateFilter";
        dateFilter.setAttribute("class", "sb_to sb_ts");
        
        var h2 = d.createElement("h2");
        dateFilter.insertBefore(h2, null);
        
        var a = d.createElement("a");
        a.setAttribute("onclick", "sb_t(this)");
        a.setAttribute("href", "javascript:void(0);");
        h2.insertBefore(a, null);
        
        var sb_ti = d.createElement("span");
        sb_ti.setAttribute("class", "sb_ti");
        a.insertBefore(sb_ti, null);
        a.insertBefore(d.createTextNode("日付で絞り込む"), null);
        
        var sb_te = d.createElement("ul");
        sb_te.setAttribute("class", "sb_te");
        dateFilter.insertBefore(sb_te, null);
        
        var href = location.href.toString();
        sb_te.insertBefore(createListItem("すべての検索結果", href, ""), null);    
        sb_te.insertBefore(createListItem("24 時間以内", href, "tbs=qdr:d"), null);    
        sb_te.insertBefore(createListItem("1 週間以内", href, "tbs=qdr:w"), null);    
        sb_te.insertBefore(createListItem("1 か月以内", href, "tbs=qdr:m"), null);    
        sb_te.insertBefore(createListItem("1 年以内", href, "tbs=qdr:y"), null);    
        return dateFilter;
    }
    
    /**
     * 絞り込み期間のリンクを作成する。
     */
    function createListItem(caption, url, appendix){
        var li = d.createElement("li");
        
        var a = d.createElement("a");
        a.innerHTML = caption;
        a.href = getQueryWithoutQdr(url)
        if(appendix == ""){
            if(! url.match(/tbs=qdr:./)){
                a.setAttribute("class", "sw_active");
            }
        }
        else{
            a.href += "&" + appendix;
            if(0 <= url.indexOf(appendix)){
                a.setAttribute("class", "sw_active");
            }
        }
        li.insertBefore(a, null);
        
        return li;
    }
    
    /**
     * 絞り込み期間を除いたクエリ文字列を取得する。
     */
    function getQueryWithoutQdr(url){
        return url.replace(/tbs=qdr:.&?/, "");
    }
})();
