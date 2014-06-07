// ==UserScript==
// @name       Gampil Blogger Emoticon Helper
// @namespace  http://neogatotkaca.blogspot.com/
// @version    Beta 1.1
// @description  enter something useful
// @include    *blogger.com/blogger.g?*
// @copyright  2011+, You
// ==/UserScript==

var timer;

onload = function() {
    document.getElementsByClassName = function(clName) {
        var nodeList = new Array();
        var clRule   = new RegExp('\\b'+clName+'\\b');
        var allElmnt = this.getElementsByTagName('*');
        for (var i = 0; i < allElmnt.length; i++) {
            var classes = allElmnt[i].className;
            if (clRule.test(classes)) nodeList.push(allElmnt[i]);
        }
        
        return nodeList;
    };    
};

hideMenu = function(elmnt) {
    var cek = elmnt.parentNode.nextSibling;
    
    if(cek.style.display == 'none'){
        cek.style.display = '';
    }else{
        cek.style.display = 'none';    
    }
};

removeImg = function(elmnt) {
    elmnt.parentNode.parentNode.removeChild(elmnt.parentNode);
};

goMove = function(stat) {
    var pos    = document.getElementById('emotPage').style.marginTop;
    var posInt = parseInt(pos.match(/[-0-9]+/gm));
    
    if(stat == "up") {
       posInt += 90;
    } else {
       posInt -= 90;
    }
    
    var posStr = posInt + "px";
    
    document.getElementById("emotPage").style.marginTop = posStr;
};

showEmot = function(index) {
    var cImg = '';
    var emotLib = [{
        'baseUrl' : 'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
        'ext'     : '.gif',
        'first'   : 1,
        'last'    : 115}];
    
    for(var i = emotLib[index].first; i <= emotLib[index].last; i++) {
        var emotSrc = emotLib[index].baseUrl + i + emotLib[index].ext;
        
       cImg += '<div class="emotBox">';
       cImg += '<img src ="' + emotSrc + '" onerror="removeEmot(this)" /></div>';        
    }
    
    return cImg;
};

removeEmot = function(elmnt) {
    elmnt.parentNode.parentNode.removeChild(elmnt.parentNode);
};

newChild = function(node, parent, content){    
    var setChild = document.createElement(node);
        setChild.innerHTML = content;
    
    parent.appendChild(setChild);
};

init = function() {
    var emotBox = document.getElementsByClassName('optionHolder');
    var text  = '<div class="GMUUXGEDAJB"><div class="GMUUXGEDPIB blogg-title"><a onclick = "hideMenu(this)"><span>Emoticon</span> </a></div>';
        text += '<div style="display : none"><center><img onclick="goMove(this.title)" title="up" style="cursor : pointer;" src="http://cdn1.iconfinder.com/data/icons/customicondesignoffice5/24/navigate-up.png"></center>';
        text += '<div class="emotContainer"><div id="emotPage" style="margin-top : 0px" >' + showEmot(0) + '</div></div>';
        text += '<center><img onclick="goMove(this.title)" title="down" style="cursor : pointer;" src="http://cdn1.iconfinder.com/data/icons/customicondesignoffice5/24/navigate-down.png"></center></div>';
        
    
    var cssBox = document.getElementsByTagName('head');
    var rule   = '.emotBox {width : 50px; height : 20px; float : left; text-align : center; margin: 5px; cursor : pointer;}';
        rule  += '.emotContainer{width : 240px; height : 185px; overflow : hidden; margin : 10px;}';
    
    if(emotBox.length > 0) {
        clearInterval(timer);
        newChild('style', cssBox[0], rule);
        newChild('div', emotBox[0], text);
    }
};

timer = setInterval('init()', 1000);