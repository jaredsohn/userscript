// ==UserScript==
// @name           Xiami Extended Menu
// @namespace      http://lkd.to/oumu
// @version        0.1
// @author         LSL (oumu)
// @homepage       http://userscripts.org/scripts/show/158256
// @description    Insert the library song, album & artist link in the main menu
// @include        http://www.xiami.com/*
// @icon           http://www.xiami.com/favicon.ico
// @downloadURL    http://userscripts.org/scripts/source/158256.user.js
// @updateURL      http://userscripts.org/scripts/source/158256.meta.js
// @date           2013-02-03
// ==/UserScript==

(function() {
    var target = document.getElementsByClassName('xUser_tabs')[0];

    var song_item = document.createElement('li');
    song_item.innerHTML = '<a class="uico_lbry" href="/space/lib-artist" title="收藏的艺人" style="padding-top: 8px;"><i style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAB4CAYAAAD7VHJWAAADJUlEQVRYw+1ZPW8cNxScIQTXh/wAQwJSy7LitIJIIn3g9HFgtfGnWicGnPosR64NJ39AMdIaSx4Md0FkWa0BQ3AbILhfwEmhXYG35t4toJSckuQbPr59xBu+JXpomuYqyXsAHICtdvgMwAzAS+fcm3w9e8ZTAPdJGgxA0gzALe/9JwAwmfFfJB/mxq0n1wD8lo3tknwfQti8IAghTEne6G02t9YeOudOSf4qKWVzE0kvAcDEGNcB3C14O+l2kbTTPxbJ7RDC92yaZkryIYZxkgWzH4+PayR3sBx94zNJM2NMJPnnmqRNkssILgxSSrMu+h3WsBrBe783NGlIvl1BcDuE8GKQQNLJCC9uN03zR4xx8hmBMeZ57xsXQfLblFLTJzHW2jOSz0Z4AZLbfRIDAM65fQBHY0kkvVggaEm+A/DTCI4Zyb3ibeyuszHmB0kewCaASZcLJD+7zhUVFRUVFYMyb0EUnOujrgbOnXOnowhCCI8A7AFY7ysVAAfOucMiQYxxIuk1gBvLXJZ0bIzx1tr5QnFNKa00zkv8QnUOITwqCM2lJCGEuxcEkm4NuPtK0quBuXsAwBjjVkrp74LAvtZFPoSwKeldQa1eNwAmBeOj/LO1enlWksPmsolkAMwL4zc7oZ0lVUkSz9nKmg8kvyzpIQBJ0m7hmGfOuQ3TBuP3AQ93AbiBF8zBQia2L5ZRuSDpxHt/fSETjTHfADgeY2yMsctk3o8k90uXieSBtfZw9HUm+UW7679D17mioqKiomJlYWnbY3k/8UTSzHv/YClBa3izUNZyrXjU9lxwmep87L3/6oIghDAFkHf05gBOJX0E8MkY865TMpJiu+apc26fMcZ1SR+Q9dWcc8XYtGr2n24tyQ2TUrqDcU05WGvnedcrpXRnsJ/YNM0OyQnJLUkbANadc7anE3eX9RNfA7giaZlT25fXiSRXKg+Sj0uBlXRsJL1ZtdBa+2SAe7bQTxxaGEL4OXsWXMmU3fN+Ij12zj1pnz2/rDjZeSL9b0LTe/+1pKcj7J91xkNC8yrJBzj/PdAp9tO2qz/t95UrKioqKipy/AdLiIc95YEG3AAAAABJRU5ErkJggg==) 0 0 no-repeat; width: 16px; height: 16px;">收藏的艺人</i></a>';
    target.insertBefore(song_item,target.firstChild);

    var album_item = document.createElement('li');
    album_item.innerHTML = '<a class="uico_lbry" href="/space/lib-album" title="收藏的专辑" style="padding-top: 8px;"><i style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAB4CAYAAAD7VHJWAAADJUlEQVRYw+1ZPW8cNxScIQTXh/wAQwJSy7LitIJIIn3g9HFgtfGnWicGnPosR64NJ39AMdIaSx4Md0FkWa0BQ3AbILhfwEmhXYG35t4toJSckuQbPr59xBu+JXpomuYqyXsAHICtdvgMwAzAS+fcm3w9e8ZTAPdJGgxA0gzALe/9JwAwmfFfJB/mxq0n1wD8lo3tknwfQti8IAghTEne6G02t9YeOudOSf4qKWVzE0kvAcDEGNcB3C14O+l2kbTTPxbJ7RDC92yaZkryIYZxkgWzH4+PayR3sBx94zNJM2NMJPnnmqRNkssILgxSSrMu+h3WsBrBe783NGlIvl1BcDuE8GKQQNLJCC9uN03zR4xx8hmBMeZ57xsXQfLblFLTJzHW2jOSz0Z4AZLbfRIDAM65fQBHY0kkvVggaEm+A/DTCI4Zyb3ibeyuszHmB0kewCaASZcLJD+7zhUVFRUVFYMyb0EUnOujrgbOnXOnowhCCI8A7AFY7ysVAAfOucMiQYxxIuk1gBvLXJZ0bIzx1tr5QnFNKa00zkv8QnUOITwqCM2lJCGEuxcEkm4NuPtK0quBuXsAwBjjVkrp74LAvtZFPoSwKeldQa1eNwAmBeOj/LO1enlWksPmsolkAMwL4zc7oZ0lVUkSz9nKmg8kvyzpIQBJ0m7hmGfOuQ3TBuP3AQ93AbiBF8zBQia2L5ZRuSDpxHt/fSETjTHfADgeY2yMsctk3o8k90uXieSBtfZw9HUm+UW7679D17mioqKiomJlYWnbY3k/8UTSzHv/YClBa3izUNZyrXjU9lxwmep87L3/6oIghDAFkHf05gBOJX0E8MkY865TMpJiu+apc26fMcZ1SR+Q9dWcc8XYtGr2n24tyQ2TUrqDcU05WGvnedcrpXRnsJ/YNM0OyQnJLUkbANadc7anE3eX9RNfA7giaZlT25fXiSRXKg+Sj0uBlXRsJL1ZtdBa+2SAe7bQTxxaGEL4OXsWXMmU3fN+Ij12zj1pnz2/rDjZeSL9b0LTe/+1pKcj7J91xkNC8yrJBzj/PdAp9tO2qz/t95UrKioqKipy/AdLiIc95YEG3AAAAABJRU5ErkJggg==) 0 -40px no-repeat; width: 16px; height: 16px;">收藏的专辑</i></a>';
    target.insertBefore(album_item,target.firstChild);

    var song_item = document.createElement('li');
    song_item.innerHTML = '<a class="uico_lbry" href="/space/lib-song" title="收藏的歌曲" style="padding-top: 8px;"><i style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAB4CAYAAAD7VHJWAAADJUlEQVRYw+1ZPW8cNxScIQTXh/wAQwJSy7LitIJIIn3g9HFgtfGnWicGnPosR64NJ39AMdIaSx4Md0FkWa0BQ3AbILhfwEmhXYG35t4toJSckuQbPr59xBu+JXpomuYqyXsAHICtdvgMwAzAS+fcm3w9e8ZTAPdJGgxA0gzALe/9JwAwmfFfJB/mxq0n1wD8lo3tknwfQti8IAghTEne6G02t9YeOudOSf4qKWVzE0kvAcDEGNcB3C14O+l2kbTTPxbJ7RDC92yaZkryIYZxkgWzH4+PayR3sBx94zNJM2NMJPnnmqRNkssILgxSSrMu+h3WsBrBe783NGlIvl1BcDuE8GKQQNLJCC9uN03zR4xx8hmBMeZ57xsXQfLblFLTJzHW2jOSz0Z4AZLbfRIDAM65fQBHY0kkvVggaEm+A/DTCI4Zyb3ibeyuszHmB0kewCaASZcLJD+7zhUVFRUVFYMyb0EUnOujrgbOnXOnowhCCI8A7AFY7ysVAAfOucMiQYxxIuk1gBvLXJZ0bIzx1tr5QnFNKa00zkv8QnUOITwqCM2lJCGEuxcEkm4NuPtK0quBuXsAwBjjVkrp74LAvtZFPoSwKeldQa1eNwAmBeOj/LO1enlWksPmsolkAMwL4zc7oZ0lVUkSz9nKmg8kvyzpIQBJ0m7hmGfOuQ3TBuP3AQ93AbiBF8zBQia2L5ZRuSDpxHt/fSETjTHfADgeY2yMsctk3o8k90uXieSBtfZw9HUm+UW7679D17mioqKiomJlYWnbY3k/8UTSzHv/YClBa3izUNZyrXjU9lxwmep87L3/6oIghDAFkHf05gBOJX0E8MkY865TMpJiu+apc26fMcZ1SR+Q9dWcc8XYtGr2n24tyQ2TUrqDcU05WGvnedcrpXRnsJ/YNM0OyQnJLUkbANadc7anE3eX9RNfA7giaZlT25fXiSRXKg+Sj0uBlXRsJL1ZtdBa+2SAe7bQTxxaGEL4OXsWXMmU3fN+Ij12zj1pnz2/rDjZeSL9b0LTe/+1pKcj7J91xkNC8yrJBzj/PdAp9tO2qz/t95UrKioqKipy/AdLiIc95YEG3AAAAABJRU5ErkJggg==) 0 -80px no-repeat; width: 16px; height: 16px;">收藏的歌曲</i></a>';
    target.insertBefore(song_item,target.firstChild);
})();