// ==UserScript==
// @name         Google Chrome RSS Icon
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.2 - Based on Jasper's Google Reader subscribe - Another Google Reader subscriber. This one was designed to use as little screen size as possible. It only adds a feed icon in the top right corner. On mouse over the subscribe links are shown.
// ==/UserScript==

var result = document.evaluate('//link[@rel="alternate"][contains(@type, "rss") or contains(@type, "atom") or contains(@type, "rdf")]', document, null, 0, null);
const logoRssOrange = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJnSURBVDiNpdNPSNNhHMfxj66SLFcOMis6dAoPXYooPIUdgqCi0Z8RK2gsDEcpVmSkJUZoGWJQEUURpNEfSjxElygiorLSLmW2X/ZbOjeVqTndouXeHbbGj6AI+sKH57k8r8/l+wjQ/0TD15Y6Bk7O7TYrs/CXCX+ZMP6QQGUWwZNzetqPLC6UZAOkgbq87pHG2YTbNhF80sDQs1NMvqxh4t5KErcWkryzCCwZbZyNeTzvk6QFkmwyfWLqegH+Vhe/T7zvKeN31zDVMh9aU0m2FGD6hKQiSTNkeEXyioPwucV0NK3l+ZkSOlsqiJhdGShyfy/fL+XDVQdcdWB4haRlKcAjuGgncd7OQH0uofpZxM7mEW7IJdBWSTw6CkD/HS9TF+xw0Y7hsQK7BM25hGpzMo2xYBdfb29l8vRMehqXEx8fAWDs8kqSzbkYu6yAW3A6h+EaGyPvHxH++CYDDT+oJVo3jcDN8hRsPCbRMB3DbQV2CE5kk6zLJnYsi0CFeFRVTCzdOnRlE+GDImKk4LFTSzB2WAGXSFaLeJUIl4vEURE/LF5UrwYgar5h4pAItvoA+HpvH4bLCmwT0Qrx7Uuq4Ud/J4mDIlgqBj+8BqBvjxg8UwxA6O5R/NuswBZh7J+HdQa9IlYmIm8fAvDKKSabVgEQvFmF32kBTKcIucW4/xUA33pfE/OKH6Wiz5fPQO0Kxj1i7ICDdzfqCZ510msFgi71jLjEkEt0rBNRt0h6BJ7U+es+tVvEdorh7cLYokAGaF+vws9O9ZobhbHh7zE3CmOzAmsWqCSzypJs6Y9RlFb/JUXpN7afIVhSDdLWIM4AAAAASUVORK5CYII=';

var item;
var feeds = [];
while (item = result.iterateNext()) feeds.push(item);
if (feeds.length > 0) {

    var JGRSmain = document.createElement('div');
    JGRSmain.setAttribute('id', 'JGRSmain');
    document.body.appendChild(JGRSmain);
    JGRSmain.setAttribute( 'style', 'position: fixed; ' +
        'z-index: 32767; ' +
        'top: 0; ' +
        'right: 0; ' +
        'margin: 3px; ' +
        'height: 20px; ' +
        'width: 20px; ' +
        'background:url('+logoRssOrange+') no-repeat;' );
         
    var JGRSfeeds = document.createElement('div');
    JGRSmain.appendChild(JGRSfeeds);

    for (var i = 0, feed; feed = feeds[i]; i++) {
        JGRSfeeds.innerHTML += '<a style=\"display: block; text-decoration: none;\" href=http://www.google.com/reader/view/feed/'+ encodeURIComponent(feed.href) +' title=\"'+ feed.title +'\">&nbsp;</a>';
    }
}
