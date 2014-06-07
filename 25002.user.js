// ==UserScript==
// @name           YourFileHostDownloader
// @namespace      http://polog.org/
// @description    Add download link for YourFileHost.com
// @include        http://www.yourfilehost.com/media.php*
// ==/UserScript==
// based on Hatena Anonymous Diary http://anond.hatelabo.jp/20080409165023
// thx masuda

$ = document.getElementById;
var movie = '';
params = $('objectPlayer').childNodes;
for(var i = 0 ; i < params.length; i++){
    if(params[i].name == 'movie'){
	movie = params[i].value;
    }
}
if(movie && movie.match(/%26cid%3D(..)(.*?)%26.*?%26cdnkey%3D(.*?)%26/)){
    var link = 'http://cdn.yourfilehost.com/unit1/flash8/' + RegExp.$1 + '/' + RegExp.$1 + RegExp.$2 + '.flv?key=' + decodeURIComponent(RegExp.$3);
    var anchor = document.createElement('a');
    anchor.href = link;
    anchor.innerHTML = '[download]';
    $('fsDiv').style.marginBottom = '30px';
    $('fsDiv').appendChild(anchor);
}

