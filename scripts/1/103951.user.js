// ==UserScript==
// @name           Twitter Ascii Emoticon
// @namespace      http://www.imzers.org
// @description     Quickly input ascii emoticon
// @include        http://twitter.com/*
// @include        http://twitter.com/#!/*
// @version        0.2 Beta
// ==/UserScript==


GM_addStyle((new CDATA("\n" + 
"body {\n" + 
"}\n" + 
"#tae-button{\n" + 
"    display:block;\n" + 
"    padding: 9px 10px;\n" + 
"    color:#fff;\n" + 
"    outline:none;\n" + 
"}\n" + 
"#tae-feedback{\n" + 
"    font-size:8px;\n" + 
"    position:absolute;\n" + 
"    bottom:2px;\n" + 
"    left:4px;\n" + 
"    color:#666;\n" + 
"}\n" + 
"#tae-button:hover{\n" + 
"    text-decoration:none;\n" + 
"}\n" + 
"#ebw{\n" + 
"    display:block;\n" + 
"    float:right;\n" + 
"    height: 21px;\n" + 
"}\n" + 
"#ew{\n" + 
"    position:absolute;\n" + 
"    top:32px;\n" + 
"    width:181px;\n" + 
"    height:185px;\n" + 
"    padding:3px;\n" + 
"    background-color:#fff;\n" + 
"    border-top:1px #666 solid;\n" + 
"    border-right:1px #666 solid;\n" + 
"    border-bottom:1px #666 solid;\n" + 
"    border-top:1px #666 solid;\n" + 
"    -moz-box-shadow: 1px 1px 2px #666;\n" + 
"    /*-moz-border-radius:3px;*/\n" + 
"}\n" + 
".ew-close #ew{display:none;}\n" + 
".ew-open #ew{display:block;}\n" + 
"#ebw{\n" + 
"    position:relative;\n" + 
"}\n" + 
"#eww i{\n" + 
"    display:block;\n" + 
"    float:left;\n" + 
"    text-align:center;\n" + 
"    padding:2px;\n" + 
"    width:55px;\n" + 
"    height:16px;\n" + 
"    line-height:16px;\n" + 
"    border-top: 1px solid #DFE6F6;\n" + 
"    border-left: 1px solid #DFE6F6;\n" + 
"    font-size:10px;\n" + 
"    cursor:pointer;\n" + 
"    font-style:normal;\n" + 
"}\n" + 
"#ew i:hover, #ewc:hover{\n" + 
"    background-color:#DFE6F6;\n" + 
"    color:#000;\n" + 
"    border-color:#666;\n" + 
"    text-decoration:none;\n" + 
"}\n" + 
"#ewc{\n" + 
"    position:absolute;\n" + 
"    bottom:1px;\n" + 
"    right:1px;\n" + 
"    padding:1px 2px;\n" + 
"    border:1px solid #999;\n" + 
"    font-size:8px;\n" + 
"    line-height:8px;\n" + 
"    color:#999;\n" + 
"    font-weight:bold;\n" + 
"    cursor:pointer;\n" + 
"}\n" + 
"#eww{\n" + 
"    border-right:1px solid #DFE6F6;\n" + 
"    border-bottom:1px solid #DFE6F6;\n" + 
"    overflow:hidden;\n" + 
"}\n" + 
"")));

var emojiData;

function taeInit(){
    var eBt = document.createTextNode("^o^");
    var eB = document.createElement("a");
        eB.setAttribute("id","tae-button");
        eB.setAttribute("href","#");
        eB.addEventListener("click", taeBoxInit, true);
        eB.appendChild(eBt);
        //document.body.appendChild(emojiButton);
    var eBw = document.createElement("span");
        eBw.setAttribute("id","ebw");
        eBw.setAttribute("class","");
        eBw.appendChild(eB);
    
    var tE = document.getElementsByClassName("active-links")[0];
    tE.appendChild(eBw);


//    var tweetCounter = document.evaluate("//*[@class='tweet-counter']",
//        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//    tweetCounter.parentNode.insertBefore(emojiButton, tweetCounter);
}

function taeBoxInit(){
    var ebw = document.getElementById("ebw");

    if (!document.getElementById("ew")){
        emojiInit();
        
        var ew = document.createElement("div");
            ew.setAttribute("id","ew");
            ebw.appendChild(ew);
            ew.innerHTML = emojiData;
            
            var eww = document.getElementById("eww");
            var ewi = eww.getElementsByTagName("i");
            for (var i = 0; i < ewi.length; i++ ){
                ewi[i].addEventListener("click", insertEmoji, true);
            }

            
        var ewc = document.getElementById("ewc");
            ewc.addEventListener("click", closeTaeWindow, true);
            
    }else if(ebw.getAttribute("class")=="ew-close"){
        ebw.setAttribute("class","ew-open");
        
    }else if(ebw.getAttribute("class")=="ew-open"){
        ebw.setAttribute("class","ew-close");
    }else{
        ebw.setAttribute("class","ew-close");
    }
    
}
function closeTaeWindow(){
    var ebw = document.getElementById("ebw");
    ebw.setAttribute("class","ew-close");
}
function insertEmoji(){
    var twInput = document.getElementsByClassName("twitter-anywhere-tweet-box-editor");
    for (var i=0; i< twInput.length; i++){
        var tmp = twInput[i].value;
        twInput[i].value = tmp + this.getAttribute("value");
    }
}
function emojiInit(){
    emoji = [
        "(ˇ⌣ˇ)--c<ˇ_ˇ)",
        "(˘з(˘⌣˘ )",
        "(⌒˛⌒ )",
        "(っ˘з˘(˘▽˘)/",
        "(｀□′)",
        "(~￣▽￣)~",
        "〒▽〒",
        "d(￣︶￣)b",
        "o(^-^)o",
        "(╭￣3￣)╭♡",
        "~\(≧▽≦)/~",
        "(￣ˇ￣)",
        "(*￣▽￣)y",
        "┌(｀▽′)╭",
        "m(_ _)m",
        "ヽ(^○^)ノ",
        "o(｀ω´*)o",
        "Ｏ(≧∇≦)Ｏ",
        "(⊙_⊙)",
        "（>□<）",
        "o(≥ω≤)o",
        "/≥▽≤/",
        "<(￣︶￣)>",
        "¬_¬"
        ];
    var emojiHtml="";
    for (var i=0; i<emoji.length;i++){
        emojiHtml = emojiHtml + "<i value='"+ emoji[i] + "'>" + emoji[i] + "</i>";
    }
    emojiData = "<div id='eww'>" + emojiHtml + "</div>" + "<a id='ewc' title='Close'>X</a><a id='tae-feedback' href='http://www.imzers.org' target='_blank'>TAE v1.0 beta</a>";
}
window.addEventListener("load", taeInit, true);
