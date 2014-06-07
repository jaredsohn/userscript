/*
// ==UserScript==
// @name           Slate Shack by fuell
// @description    Chatty customization - http://chattypics.com/files/slateshack_ohsq1n1w1l.png
// ==/UserScript==
*/

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("www.shacknews.com") {

div.commentstools {
    margin: 0 10px 0 10px !important;
}

div.commentsblock {
    padding: 0px !important;
    margin: 0 auto !important;
    line-height: 100% !important;
}
div.threads {
    margin: 0 10px 0 10px !important;
}
div.root {
    margin: 0 auto !important;
    padding-top: 30px !important;
    width: 100% !important;
}
div.fullpost {
    position: relative !important;
    background-color: #25272a !important;
    border: 0px !important;
    border-top: 3px solid #333 !important;
    padding: 0px !important;
    width: 100% !important;
    min-width: 850px !important;
}
ul li ul li div.fullpost {
    min-width: 300px !important;
}
div.postnumber {
    float: none !important;
    position: absolute !important;
    top: 0px !important;
    left: 4px !important;
    width: 24px !important;
    height: 24px !important;
    z-index: 10 !important;
    background-color: inherit !important;
}
div.postnumber a {
    background-color: #ccc !important;
    background-image: url(data:image/png;base64,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) !important;
    background-repeat: no-repeat !important;
}
div.postnumber a:hover {
    background-position: inherit !important;
}
div.refresh {
    float: none !important;
    position: absolute !important;
    top: 0px !important;
    margin: 0px !important;
    left: 32px !important;
    width: 24px !important;
    height: 24px !important;
    background-color: inherit !important;
}
div.refresh a {
    background-color: #ccc !important;
    width: 24px !important;
    height: 24px !important;
    background-position: -2px 1px;
    background-image: url(data:image/png;base64,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) !important;
}
div.refresh a:hover {
    background-position: inherit !important;
}
div.postmeta {
    position: relative !important;
    width: 80% !important;
    top: 2px !important;
    left: 62px !important;
    height: 25px !important;
    overflow: hidden !important;
    margin-left: 0px !important;
}
span.author {
    position: relative !important;
    left: 19px !important;
    top: 1px !important;
    color: #25272a !important;
    text-indent: -200px !important;
}
span.author span.user {
    position: relative !important;
    text-shadow: none !important;
    top: 4px !important;
    left: 9px !important;
}
span.author span.user a {
    position: relative !important;
    left: 12px !important;
    top: -1px !important;
    color: #fff !important;
    border-left: 1px solid #414449 !important;
}
span.author span.this-user {
    position: relative !important;
    left: -26px !important;
    border: 0px !important;
}
span.author span.this-user a {
    padding-left: 11px !important;
}
span.author a.shackmsg {
    position: absolute !important;
    left: 8px !important;
    top: -3px !important;
    width: 14px !important;
    height: 24px !important;
    background-color: #ccc !important;
    background-image: url(data:image/png;base64,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) !important;
    background-position: 0px -1px !important;
}
span.author a.shackmsg img {
    visibility: hidden !important;
    width: 24px !important;
}
span.author a.lightningbolt {
    position: relative !important;
    top: 3px !important;
    left: 18px !important;
    background-image: url(data:image/png;base64,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);
    background-repeat: no-repeat;
}
span.author a.lightningbolt img {
    position: relative !important;
    visibility: hidden !important;
    width: 20px !important;
}
div.postmeta a.closepost {
    position: absolute !important;
    left: -3px !important;
    bottom: 5px !important;
    color: #fff !important;
    width: 24px !important;
    height: 24px !important;
    background-color: #ccc !important;
    background-image: url(data:image/png;base64,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) !important;
    background-position: 1px 2px;
    text-indent: -100px;
}
div.reply {
    position: absolute !important;
    right: -1px !important;
    top: 3px !important;
    height: 19px !important;
    border-left: 1px solid #414449 !important;
    width: 60px !important;
    margin: 0px !important;
}
div.reply a {
/*    color: #fd36b3 !important; */
    color: #fff !important;
    border: 0px !important;
    background: inherit !important;
    text-shadow: 1px 1px 5px #000 !important;
}
div.reply a:hover {
    color: #2e82ea !important;
}
div.postbody {
    position: relative !important;
    top: 0px !important;
    margin: 0px !important;
    padding: 5px 0px 5px 11px !important;
    left: 0px !important;
    height: 1% !important;
    color: #a8a9ad !important;
    background-color: #25272a !important;
    font-family: Calibri !important;
    font-size: 14px !important;
    border-top: 1px solid #414449 !important;
    overflow: hidden !important;
    line-height: 16px !important;
}
div.postdate {
    position: absolute !important;
    top: 4px !important;
    right: 65px !important;
    bottom: 0px !important;
    height: 15px !important;
    line-height: 15px !important;
    font-family: Calibri !important;
    font-size: 10px !important;
    background-color: inherit !important;
}
div.capcontainer {
    position: relative !important;
    top: 0px !important;
    left: 0px !important;
    min-width: 850px !important;
}

p.capnote a {
    color: #d3d7da !important;
    background-color: #44474c !important;
    font-family: Calibri !important;
    font-size: 12px !important;
    text-indent: 10px;
}
p.capnote a:hover {
    background-color: #666 !important;
}

div.oneline {
    font-family: Calibri !important;
    font-size: 14px !important;
    height: 20px !important;
    line-height: 14px !important;
    background-color: #151515 !important;
    padding: 5px 0px 0px 3px !important;
    margin-bottom: 1px !important;
    white-space: nowrap !important;
}
div.oneline:hover {
    background-color: #333 !important;
}
div.oneline a:hover {
    background-color: inherit !important;
}
div.oneline a.lightningbolt {
    position: relative !important;
    top: 0px !important;
    left: 4px !important;
    background-image: url(data:image/png;base64,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) !important;
    background-position: 1px 1px;
    background-repeat: no-repeat;
    background-color: inherit !important;
}
div.oneline a.lightningbolt img {
    position: relative !important;
    visibility: hidden !important;
    width: 20px !important;
}
div.capcontainer {
    background-color: #151515 !important;
}
div.threads ul ul {
    background-image: url(data:image/gif;base64,R0lGODlhAQACAIAAAHh4eAAAACwAAAAAAQACAAACAgQKADs=) !important;
}
div.threads ul ul li {
    background-image: url(data:image/gif;base64,R0lGODlhDAAyAJEAAHh4eBUVFQAAAAAAACwAAAAADAAyAAACN0SOGabKjR5cM9YjYW7bXXoB4kiOX5egVni27FupmBvTkwzW8G1rPffz7HxDYFGoS/KOqWDzUgAAOw==) !important;
}
div.threads ul ul li.last {
    background-color: #151515 !important;
    background-image: url(data:image/gif;base64,R0lGODlhDAAcAJEAAHh4eBUVFQAAAAAAACwAAAAADAAcAAACHkSOGabKjR5cM9YjYW7bXXoB4kiK34mm6sq27guvBQA7) !important;
    border-bottom: 1px solid #151515 !important;
}
span.oneline_user {
    color: #257bbe !important;
}
div.oneline span.this_user {
    color: #67ff38 !important;
}
li div.olmod_informative {
    border: 1px solid #71d3ec !important;
    background-color: #000 !important;
}
li div.olmod_informative a {
    background-color: inherit !important;
}

div.fullpost div.postnumber a:hover, div.fullpost div.postmeta a.closepost:hover, div.fullpost div.refresh a:hover, div.fullpost span.author a.shackmsg:hover {
    background-color: #fff !important;
}
div.fullpost.fpmod_informative {
    background: #25272a !important;
    border-top: 6px solid #71d3ec !important;
}
div.fullpost.fpmod_informative div.reply a {
    color: #71d3ec !important;
}
div.fullpost.fpmod_informative div.reply a:hover {
    color: #c2e5ee !important;
}
div.fullpost.fpmod_informative div.postnumber a, div.fullpost.fpmod_informative div.postmeta a.closepost, div.fullpost.fpmod_informative div.refresh a, div.fullpost.fpmod_informative span.author a.shackmsg {
    background-color: #71d3ec !important;
}
div.fullpost.fpmod_informative div.postnumber a:hover, div.fullpost.fpmod_informative div.postmeta a.closepost:hover, div.fullpost.fpmod_informative div.refresh a:hover, div.fullpost.fpmod_informative span.author a.shackmsg:hover {
    background-color: #c2e5ee !important;
}
li div.olmod_nws {
    border: 1px solid #a61414 !important;
    background-color: #000 !important;
}
div.fullpost.fpmod_nws {
    background: #25272a !important;
    border-top: 6px solid #a61414 !important;
}
div.fullpost.fpmod_nws div.reply a {
    color: #a61414 !important;
}
div.fullpost.fpmod_nws div.reply a:hover {
    color: #c28989 !important;
}
div.fullpost.fpmod_nws div.postnumber a, div.fullpost.fpmod_nws div.postmeta a.closepost, div.fullpost.fpmod_nws div.refresh a, div.fullpost.fpmod_nws span.author a.shackmsg {
    background-color: #a61414 !important;
}
div.fullpost.fpmod_nws div.postnumber a:hover, div.fullpost.fpmod_nws div.postmeta a.closepost:hover, div.fullpost.fpmod_nws div.refresh a:hover, div.fullpost.fpmod_nws span.author a.shackmsg:hover {
    background-color: #c28989 !important;
}
div.fullpost.fpmod_political {
    background: #25272a !important;
    border-top: 6px solid #d8ac36 !important;
}
div.fullpost.fpmod_political div.reply a {
    color: #d8ac36 !important;
}
div.fullpost.fpmod_political div.reply a:hover {
    color: #e7d6a9 !important;
}
div.fullpost.fpmod_political div.postnumber a, div.fullpost.fpmod_political div.postmeta a.closepost, div.fullpost.fpmod_political div.refresh a, div.fullpost.fpmod_political span.author a.shackmsg {
    background-color: #d8ac36 !important;
}
div.fullpost.fpmod_political div.postnumber a:hover, div.fullpost.fpmod_political div.postmeta a.closepost:hover, div.fullpost.fpmod_political div.refresh a:hover, div.fullpost.fpmod_political span.author a.shackmsg:hover {
    background-color: #e7d6a9 !important;
}
div.fullpost.fpmod_stupid {
    background: #25272a !important;
    border-top: 6px solid #36d83a !important;
}
div.fullpost.fpmod_stupid div.reply a {
    color: #36d83a !important;
}
div.fullpost.fpmod_stupid div.reply a:hover {
    color: #c5ffc6 !important;
}
div.fullpost.fpmod_stupid div.postnumber a, div.fullpost.fpmod_stupid div.postmeta a.closepost, div.fullpost.fpmod_stupid div.refresh a, div.fullpost.fpmod_stupid span.author a.shackmsg {
    background-color: #36d83a !important;
}
div.fullpost.fpmod_stupid div.postnumber a:hover, div.fullpost.fpmod_stupid div.postmeta a.closepost:hover, div.fullpost.fpmod_stupid div.refresh a:hover, div.fullpost.fpmod_stupid span.author a.shackmsg:hover {
    background-color: #c5ffc6 !important;
}

ul li li div.fullpost {
    border-bottom: 5px solid #25272a !important;
    border-bottom-left-radius: 6px;
}

div.postmeta a.showpost {
    position: absolute !important;
    top: -2px !important;
    left: -3px !important;
    bottom: 5px !important;
    color: #fff !important;
    width: 14px !important;
    height: 24px !important;
    background-color: #ff0 !important;
    background-image: url(data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAstJREFUeNpiVFXXZqAGYGKgEoAb9B+XChYWZhYWZpia/7hUEnARMzNzSnJSSlISMzMzfpUs+KUDA/zSUlOYmZnevnu3es1amHP+MzAwolspLCIGY6PIMTIy+vv51tZU8fBws7Kympmavn375tat2////8dUjM9rCvLyRkaGf//+gXD//furpaWpoKCAaQQBgx49fnT06LGvX79BuJ8+fT5y5Njdu/eQnIMS8ExY/aWqqhIRFvr3z8979+5CRB48uM/I8LeqstzGxho1lv9jD2whIaHwsJD37950dLT9+PHD19cXIv7ly5eZM2fu3LkzMTFJJT52w8bNHz68xx5rjIyM3t6eSooKixctPHXqFESQk5MTLsvAwPDgwYP6+jonJ6e6msrde/bv2LkDFvZIYQRJMq9evrh27Rpc8OzZs8g2QRgnTpy4evVKcnICExMz9sD++fNHU1PTnj17goOD2dnZGRgY2trauru7379/z87O/v//f2Zm5tDQ0OPHj5eXl//9+xduNAMDA4OqujYEaWrrnz9/4f/////////169fy5ctNTEyYmZlZWFhkZGRERUVdXV1v3Ljx798/iJpz5y9oauurqmtBtGOPflZW1oiIiO3bt7e1tYmJiX3+/DkrK2v58uXq6uoorkCKbpTA5uDgQFYiIiJSVlbm6urKxsamrY1e2rCxsWGPtX///p45e05DQx1Ng6GhIaaTP33+fOHChf///2HJa////z985OjLV6/k5eSEhATx5OQDBw719k1YsnT5378IgxgxS0geHp6KshI3Nxd+fn60ELl7996KVavXrl3/5csXNF1wg/4j5SAGBgZGBQX5+NiYiIgwSEn0/cePjRs3z503/+HDR1idiWwQJAoQpQQTE5ORkWF6Wsrfv38XLlp8/PhJPP5lxFb4o5RbbGxs//79+/PnDxklJEq4/Pr1i661CGAAxVMWu+k8vr0AAAAASUVORK5CYII=) !important;
    text-indent: -100px;
    z-index: 999 !important;
}
div.root.collapsed {
    height: 33px !important;
}


}