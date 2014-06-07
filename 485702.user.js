// ==UserScript==
// @name       Tabelog Review Killer
// @namespace  http://userscripts.org/scripts/show/485702
// @version    0.2.1
// @description  fuck tabelog review
// @include    /^http:\/\/tabelog.com\/.+\/A\d+\/A\d+\/\d+\/.+(?:\/\d+)?/
// @copyright  2014+, Code Ass
// ==/UserScript==

(function() {
    createImage = function(width, height, url) {
        var body = document.getElementsByTagName('body')[0];
        var i = document.createElement('img');
        i.setAttribute('src', url);
        i.style.backgroundColor = 'transparent';
        i.style.position = 'absolute';
        i.style.zIndex = 100000000 + Math.floor(Math.random() * 10);
        var x = Math.floor(Math.random()*(body.clientWidth-body.clientLeft-width)+body.clientLeft+width)-width;
		var y = Math.floor(Math.random()*(body.clientHeight-body.clientTop-height)+body.clientTop+height)-height;
        i.style.left = x+'px';
        i.style.top = y+'px';
        return i;
    }
    
    var style = document.createElement('style');
    style.setAttribute('id', 'killer');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    var sheet = style.sheet;
    
    var itta = document.getElementsByClassName('bookmark-favorite')[0];
    itta.removeChild(itta.children[0]);
    var kuso = document.createElement('a');
    kuso.setAttribute('id', 'kuso');
    kuso.textContent = "hi";
    itta.appendChild(kuso);
    kuso.style.zIndex = '9000000000';
    var css = '';
    css = css + 'background-image: url("http://i.gyazo.com/209ac3b5b49c50efb15dcb1c06b7683b.png") !important;';
    css = css + 'background-position: 0px 0px !important;';
    sheet.insertRule('a#kuso { ' + css + ' }', sheet.cssRules.length);
    var killButton = function() {
        var audio = document.createElement('audio');
        audio.setAttribute('id', 'gyaaa');
        audio.setAttribute('src', 'http://negineesan.com/etc/aaagh.wav');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(audio);
        audio.play();
        
        sheet.insertRule('* { background-color: #CC0000; }', sheet.cssRules.length);
        
        var count = document.getElementsByClassName('reviewer-data')[0].getElementsByClassName('count')[0];
        var countString = count.textContent.slice(1, -1);
        var countGoal = '';
        var tagetDigit = countString.length + 10000;
        while (countGoal.length < tagetDigit) {
            countGoal = countGoal + countString;
        }
        var countOfCount = 0;
        var timesMax = 40;
        var counting = setInterval(function() {
            var span = countGoal.length - countString.length;
            var nowLength = countString.length + Math.floor((countOfCount / timesMax) * span);
            var result = '';
            for (var i = 0; i < nowLength; i++) {
                result = result + String(Math.floor(Math.random() * 10));
            }
            count.textContent = '（' + result + '）';
            countOfCount++;
            if (countOfCount >= timesMax) {
                clearInterval(counting);
            }
        }, 50);
        setInterval(function() {
            var img;
            img = createImage(599, 337, 'http://i.gyazo.com/17d614fc51a64efe08f675ce63ae761e.png');
            img.onclick = killButton;
            body.appendChild(img);
        }, 1500);
        setInterval(function() {
            var img;
            img = createImage(337, 337, 'http://negineesan.com/kukki/zaa_deca.gif');
            img.onclick = killButton;
            body.appendChild(img);
            img = createImage(32, 32, 'http://negineesan.com/kukki/zaa_mini.gif');
            img.onclick = killButton;
            body.appendChild(img);
        }, 200);
    };
    kuso.onclick = killButton;
})();
