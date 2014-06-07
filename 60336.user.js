// ==UserScript==
// @name           Yet Another jaro
// @version        0.1
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @license        MIT license (http://www.opensource.org/licenses/mit-license.php)
// @description    Google検索結果のクリップ系サイトをクリックしても、直接おおもとの記事ページにジャンプしようとするスクリプトです。
// ==/UserScript==
//参考
//http://d.hatena.ne.jp/snaka72/20090718/1247905438
//http://d.hatena.ne.jp/edvakf/20090723/1248365807

(function() {
  /* 
     クリップ系サイトのページへのリンク画像（クリップの画像）をどこにつけるか。タイトルの後ろにつける場合はtrueに、前につける場合はfalseに。
     faviconizeを使っている場合はtrueが見やすいと思います。
  */
  var after = false;
  /* 半透明化させるかどうか。0ならしない。1,2,3は半透明にする範囲が異なります。 */
  var opacity = 1;
  /* SITEINFO。追加できます。 */
  var localSetting = [
      {
        name : 'はてなブックマーク',
        url : '^http:\/\/b\.hatena\.ne\.jp\/entry',
        removeText : '^はてなブックマーク - ',
      }
      ,{
        name : 'buzzurl.jp',
        url:'^http:\/\/buzzurl\.jp\/entry',
        removeText:'- Buzzurl.*$',
      }
      ,{
        name : 'ライブドアクリップ',
        url:'^http:\/\/clip\.livedoor\.com\/page\/',
        removeText: ['^ページ詳細 - ', ' - livedoor.*$'],
      } 
      ,{
        name : 'ニフティクリップ',
        url:'^http:\/\/clip\.nifty\.com\/entry',
        removeText: ' | @nifty.*$',
      }
      ,{
        name : 'FriendFeed',
        url:'^http:\/\/friendfeed\.com\/',
        removeText:'',
      }
      ,{
        name : 'faves',
        url:'^http:\/\/faves\.com\/users',
        removeText:'Faves: ',
      }
      ,{
        name : 'SWiK',
        url:'^http:\/\/swik\.net\/',
        removeText:'- SWiK$',
      }      
      ,{
        name : 'Choix',
        url:'^http:\/\/www\.choix\.jp\/getpost\/',
        removeText:'【Choix】$',
      }
      ,{
        name : 'POOKMARK',
        url:'^http:\/\/pookmark\.jp\/url\/',
        removeText:'^POOKMARK Airlines - ',
      }      
      ,{
        name : 'Inezha',
        url:'^http:\/\/inezha\.com\/',
        removeText:'',
      }       
      ,{
        name : 'Katoo',
        url : '^http:\/\/seo\.kndb\.jp\/bookmark\/',
        removeText : '-katoo-$',
      }
      ,{
        name : 'okyuu',
        url : '^http:\/\/okyuu\.com\/ja\/tips\/[0-9]+',
        removeText : 'ノウハウ.*$',
      }
      ,{
        name : 'wadaino.jp',
        url : '^http:\/\/wadaino\.jp\/detail\/',
        removeText : '',
      }      
      ,{
        name : 'clipp.in',
        url : '^http:\/\/(?:[^.]*\.)?clipp\.in\/entry\/',
        removeText : '.*?clipp: ',
      }
      ,{
        name : 'lifespacetime.com',
        url : '^http:\/\/[^.]*\.lifespacetime\.com',
        removeText : ' #.*$',
      }
      ,{
        name : 'timelog.jp',
        url : '^http:\/\/timelog\.jp',
        removeText : 'Comments.*',
      }
      ,{
        name : 'feed.designlinkdatabase.net',
      	url : '^http:\/\/feed\.designlinkdatabase\.net',
      	removeText:'^Webデザイン フィード詳細 - ',
      }
      ,{
        name : 'firefox.rightclicksright.net',
      	url : '^http:\/\/firefox\.rightclicksright\.net',
      	removeText:'',
      }
      ,{
        name : 'tools.rightclicksright.net',
      	url : '^http:\/\/tools\.rightclicksright\.org\/looklike\/',
      	removeText:'の関連情報 - .*$',
      }
      ,{
        name : 'firefox.pg-feed.com',
      	url : '^http:\/\/firefox\.pg-feed\.com\/',
      	removeText:'',
      }
      ,{
        name : 'js.designlinkdatabase.net',
      	url : '^http:\/\/js\.designlinkdatabase\.net',
      	removeText:'',
      }
      ,{
        name : 'pg.thumbnailcloud.net',
      	url : '^http:\/\/pg\.thumbnailcloud\.net',
      	removeText:' - PHP \/?.*',
      }
      ,{
        name : 'js2.rightclicksright.biz',
      	url : '^http:\/\/js2\.rightclicksright\.biz',
      	removeText:'',
      }
      ,{
        name : 'api.designiddatabase.net',
      	url : '^http:\/\/api\.designiddatabase\.net',
      	removeText:' - AP?I?.*',
      }            
      ,{
        name : 'google.designiddatabase.net',
      	url : '^http:\/\/google\.designiddatabase\.net',
      	removeText:'Adw?.*$',
      }            
      ,{
        name : 'css.thumbnailcloud.net',
      	url : '^http:\/\/css\.thumbnailcloud\.net',
      	removeText:'CSS\(.*$',
      }
  ];
  // If you want to negate the filter, set the pattern of the site names here.
  var antiFilter = [
    /* (example)
      /^http:\/\/\w+\.designlinkdatabase\.net/ */
  ];
  var sites = [];
  
  
  //
  // main logic
  //

  setOpacity(sites,document);


  function setOpacity(sites, doc) {
    mergedSites = sites.concat(localSetting);
    var eles = document.evaluate('.//a[@class="l"]',doc,null,7,null);
    for (var i = 0; i < eles.snapshotLength; i++)
    {
      ele = eles.snapshotItem(i);
      var originalUrl = ele.href;
      var originalTitle = ele.innerHTML;

      if (isExcepts(originalUrl)) {
        return;
      }
      
      var removeText = isTarget(originalUrl, mergedSites);
      
      if (removeText != null) {
        //タイトルから不要な部分を取り除く
        var title = originalTitle.replace(/<\/?[^>]+>/gi, "");
        title = title.replace(/\.\.\.$/,"");
        
        var removeTextArray = [];
        if(removeText instanceof Array){
          removeTextArray = removeText;
        }else{
          removeTextArray[0] = removeText;
        }
        
        var newTitle = originalTitle;
        for(var j = 0; j < removeTextArray.length; j++){
          //url作成に必要
          var reg = new RegExp(removeTextArray[j]);
          title = title.replace(reg,"");
          //titleも書き換え
          var reg = new RegExp('('+removeTextArray[j]+')');
          newTitle = newTitle.replace(reg,'<span style="font-size:65%;">$1</span>');
        }
        ele.innerHTML=newTitle;
        
        //urlを書き換え
        var newUrl = 'http://www.google.com/search?hl=ja&btnI=I%27m+Feeling+Lucky&q=intitle:'
        //	 + '"' + encodeURIComponent(title) + '"';
        	 + encodeURIComponent(title);
        ele.href = newUrl;

        //faviconize用
        var a = document.createElement('a');
        a.href=originalUrl;
        a.setAttribute('class','l');
        ele.parentNode.insertBefore(a,ele);
        ele.removeAttribute('class');
        
        
        //クリップ系サイトのページそのものへのリンクもつける
        var jumpImg = document.createElement('img');
        jumpImg.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB70lEQVQ4jWNgoAdYuHCh9KxZs15OmjTpVEdHh01tba0h0Zpnz56tOHPmzJcTJ0683tnZ+ai+vn5rb2/v/+zs7DqibJ4+ffr9/v7+jW1tbRdramqCGBgYGDIzMy0SExO/4dU8c+ZMkWnTpt3r7e3d3NzcvL66utofJhcfH68dFhb2HJ+zxadMmfKhu7t7S1NT0/zKysqg2NhY7vT09IOxsbEtoaGhW728vLAbMGXKFPlJkya97erq2tDQ0DCrvLw8NTk5WSg1NfVoTExMR2Bg4BRPT8+btra2ohiaZ8yYoTphwoQnHR0d8+vr66eXlpbGhYaGciYlJd2Kjo7uCgwMXOju7v7I1tZWEkPz5MmTFfv7+x+0tbXNqK2t7S4pKfGGar4ZFhZW7+/vv8jd3f2Vk5OTPIbmadOmqff19b1vbm5ezsDAwFhYWLgmIyPjelxc3LOwsLAGX1/fBW5ubm/Mzc35sPq7o6PDvbm5+VFpaakETCw2NrYzODg4xtvbe6abm9ttS0tLIZyh3tDQoFdWVvYyNzcXHjA+Pj6qXl5ei11cXG5aWVmJ4dTMwMDAUFJSwp2Tk7M1KSlpS1RUlKqfn5+1u7v7ZRcXl3sODg4yeDXDgJ+fH29YWJiXv7//eTc3t6fOzs55Dg4OAkRpHlAAAIC6wPx6RnEsAAAAAElFTkSuQmCC';
        jumpImg.style.border='none';
        var a = document.createElement('a');
        a.appendChild(jumpImg);
        a.href=originalUrl;
        var originalLink = document.createElement('span');
        originalLink.appendChild(a);
        if(after == true)
          ele.parentNode.appendChild(originalLink);
        else
          ele.parentNode.insertBefore(originalLink,ele);
        
        //透過
        if(opacity == 3)
          ele.parentNode.parentNode.style.opacity = '0.5';
        else if(opacity == 2)
          ele.parentNode.style.opacity = '0.5';
        else if(opacity == 1)
          ele.style.opacity = '0.5';
      }
    }
  }
  
  function isExcepts(url) {
    return antiFilter.some(function(i) { return url.match(i) });
  }

  function isTarget(url, sites) {
     var removeText=null;
     sites.some(function(i) {
     if(url.match(i.url)) removeText= i.removeText;
    });
    return removeText;
  }

  //
  // Register page handler
  //
  if (window.AutoPagerize) {
    registerPageHandler();
  } else {
    window.addEventListener('GM_AutoPagerizeLoaded', registerPageHandler, false);
  }

  function registerPageHandler() {
    window.AutoPagerize.addFilter(function(pages) {
      pages.forEach(function(page) {
        setOpacity(sites, page);
      });
    });
  }

})();
