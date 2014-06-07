// ==UserScript==
// @name           Add Bcomment Icon in Hotentry
// @version        0.1
// @description    add hatena-bcomment-view-icon
// @include        http://b.hatena.ne.jp/hotentry*
// @namespace      http://d.hatena.ne.jp/favril/
// @author         favril
// ==/UserScript==

(function(){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('src', 'http://b.hatena.ne.jp/js/BookmarkCommentViewerAllInOne.1.2.js');
    document.getElementsByTagName('head')[0].appendChild(script);

    GM_addStyle(<><![CDATA[
        .hatena-bcomment-view {
            background-color: #FFF;
            border-top:       1px solid #CCC;
            border-left:      1px solid #CCC;
            border-right:     solid 1px #999;
            border-bottom:    solid 1px #999;
            position:         absolute !important;
            display:          none;
            word-break:       break-all;
            word-wrap:        break-word;
            width:            600px;
            text-align:       left;
            margin:           0 !important;
            padding:          0 !important;
            font-weight:      normal !important;
            font-size:        90%;
            z-index:          100;
            color:            #000 !important;
        }
        .hatena-bcomment-title {
            margin:      0 !important;
            padding:     3px 5px  !important;
            text-indent: 0 !important;
        }
        .hatena-bcomment-title img {
            vertical-align: middle !important;
            margin:         2px 2px 2px 4px !important;
        }
        .hatena-bcomment-view ul {
            width:            auto;
            overflow:         auto;
            overflow-y:       auto;
            border-top:       1px solid #5279E7;
            background-color: #edf1fd;
            list-style-type:  none;
            padding:          5px 8px !important;
            margin:           0px !important;
            line-height:      150%;
        }
        .hatena-bcomment-view ul li{
            text-indent: 0 !important;
            margin:      0 !important;
            padding:     0 0 2px 0 !important;
            font-size:   90%;
            background:  trasparent !important;
        }
        .hatena-bcomment-view ul li span.hatena-bcomment-tag a{
            color:       #6365CE;
            font-family: 'Arial',sans-serif;
            margin:      0 3px;
        }
        .hatena-bcomment-view ul li img{
            vertical-align: middle !important;
            margin:         0 2px !important;
        }
        .hatena-bcomment-view ul li span.hatena-bcomment-date {
        }
        .hatena-bcomment-view-icon {
            cursor: pointer;
        }
    ]]></>);


    var infos = document.evaluate('//ul[@class="entry-info"]', document, null, 7, null);
    var links = document.evaluate('//div[@class="entry-body"]/h3/a', document, null, 7, null);
    for(var i=0,len=infos.snapshotLength; i<len; i++) {
        var li = document.createElement('li');
        var html = '<img class="hatena-bcomment-view-icon" '
                 + 'height="13" width="13" src="http://r.hatena.ne.jp/images/popup.gif" '
                 + 'onclick="javascript:BookmarkCommentViewer.options.blankCommentHide=true;BookmarkCommentViewer.options.commentWidth=600;'
                 + 'BookmarkCommentViewer.iconImageClickHandler(this, \'' + links.snapshotItem(i).href + '\', event);" '
                 + 'title="このエントリーのブックマークコメント" alt="このエントリーのブックマークコメント" />';
        li.innerHTML = html;
        infos.snapshotItem(i).appendChild(li);
    }
})();
