// ==UserScript==
// @name        表符統計
// @namespace   http://mmis1000.byethost31.com/
// @include     http://guild.gamer.com.tw/guild.php?sn=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     0.1.2
// @grant       GM_registerMenuCommand
// ==/UserScript==

this.$ = this.jQuery = $.noConflict();

GM_registerMenuCommand( '統計!!', main);

function main() {
    var i;
    var guildId = (/sn=(\d+)/g).exec(location.search)[1]; ;
    var images, imageTypes = [], imageCounts = {};
    images = $('#MSG-box2 img');
    
    images.each(function(){
        var src = this.src;
        var fileName = src.split('/')[ src.split('/').length - 1 ];
        var imageId;
        //alert(search);
        //alert(fileName + ' ' + guildId + ' ' + fileName.indexOf(guildId));
        if (!((/\d+_\w+\.\w+/g).test(fileName))){return;}
        if (!(fileName.indexOf(guildId) >= 0)){return;}
        
        
        imageId = (/\d+_(\w+)\.\w+/g).exec(fileName)[1];
        if (!(imageTypes.indexOf(imageId) >= 0)) {
            imageTypes.push(imageId);
        }
        imageCounts[imageId] = imageCounts[imageId] ? imageCounts[imageId] + 1 : 1;
    });
    
    var resultArray = [];
    
    for (i = 0; i < imageTypes.length; i++) {
        resultArray[i] = [imageTypes[i], imageCounts[imageTypes[i]]]
    }
    
    resultArray.sort(function(a, b){
        return b[1] - a[1];
    });
    
    var result = '目前版面上表符統計：\n';
    for (i = 0; i < resultArray.length; i++) {
        result += '[G' + resultArray[i][0] + ']' + (resultArray[i][1]) + '個';
        result += ((i + 1) % 4 ? '' : '\n' )
    }
    //alert(result);
    $('#msgtalk').text(result).val(result);
    //alert(result);
}