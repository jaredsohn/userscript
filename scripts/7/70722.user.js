// ==UserScript==
// @name           Colourful Chan Quotelinks
// @namespace      http://userscripts.org/users/136441
// @description    Colourizes 4chan etc's post numbers to make them more memorable.
// @include        *chan.net/*
// @include        *chan.org/*
// @include        *lulz.net/*
// @include        *britfa.gs/*
// ==/UserScript==

var numLinks, thisLink;
numLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < numLinks.snapshotLength; i++) {
    thisLink = numLinks.snapshotItem(i);
    var newStr = "";
    var oldStr = thisLink.innerHTML;
    changes = 0;
    nonNum=false;
    for (var j=0;j<oldStr.length;j++){
        switch (oldStr.charAt(j)){
                case '0':changes++;newStr=newStr+'<span style="background-color: #cccccc; color:#111111">0</span>';break;//white
                case '1':changes++;newStr=newStr+'<span style="background-color: #00801a; color:#DDDDFF">1</span>';break;//green
                case '2':changes++;newStr=newStr+'<span style="background-color: #3344aa; color:#DDDDFF">2</span>';break;//blue
                case '3':changes++;newStr=newStr+'<span style="background-color: #8811bb; color:#DDDDFF">3</span>';break;//purple
                case '4':changes++;newStr=newStr+'<span style="background-color: #c266a7; color:#DDDDFF">4</span>';break;//pink
                case '5':changes++;newStr=newStr+'<span style="background-color: #aa2a08; color:#FFDDDD">5</span>';break;//brown
                case '6':changes++;newStr=newStr+'<span style="background-color: #ee3911; color:#FFDDDD">6</span>';break;//red
                case '7':changes++;newStr=newStr+'<span style="background-color: #f1830d; color:#FFDDDD">7</span>';break;//orange
                case '8':changes++;newStr=newStr+'<span style="background-color: #ddc013; color:#FFFFFF">8</span>';break;//yellow
                case '9':changes++;newStr=newStr+'<span style="background-color: #666666; color:#EEEEEE">9</span>';break;//grey
                case '&':case 'g':case 't':case ';':case ' ':case 'N':case 'o':case 'r':case '\n':case '.':newStr=newStr+oldStr.charAt(j);break;
                default:nonNum=true;break;
        }
        if (nonNum==true) {
        //    GM_log('non number: '+oldStr);
            break;
            }
    }
    if (changes!=0&&nonNum==false){
    //    GM_log('SUCCESS: '+newStr);
        thisLink.innerHTML=newStr;
        }
    }