// ==UserScript==
// @name           pixiv original image
// @namespace      pixiv
// @namespace      http://pickup2pixiv.blog130.fc2.com/
// @include        http://www.pixiv.net/member_illust.php*
// ==/UserScript==

var title = document.evaluate('//div[@class="works_data"]/h3', document, null, 9, null).singleNodeValue.textContent;
var image = document.evaluate('//img[@alt="' + title + '"]', document, null, 9, null).singleNodeValue;
if (!image.parentNode.href.match('mode=manga')) {
    image.src = image.src.replace(/_m\.(gif|jpg|png)$/, '.$1')
      image.parentNode.parentNode.appendChild(image);
  }
