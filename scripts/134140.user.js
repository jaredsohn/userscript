// ==UserScript==
// @name        3gokushi-season
// @namespace   3gokushi-season
// @description ブラウザ三国志の季節変更
// @include     http://*.3gokushi.jp/village.php*
// @include     http://*.3gokushi.jp/land.php*
// @include     http://*.3gokushi.jp/territory_proc.php*
// @include     http://*.3gokushi.jp/user/*
// @version     1.0.3
// ==/UserScript==



( function() {

//設定している季節を取得
function getSeason() {
  season = localStorage["favoriteSeason"];
  if ( season == null ) {
    season = "Summer";
  }
  return season;
}

//季節選択コンボを作成
function setSeasonBox() {

  var playerTag = document.getElementsByClassName( "ttl2" )[0];

  var selectTag = document.createElement('select');
  var springTag = document.createElement('option');
  springTag.value="Spring";
  springTag.text="春";

  var summerTag = document.createElement('option');
  summerTag.value="Summer";
  summerTag.text="夏";

  var autumnTag = document.createElement('option');
  autumnTag.value="Autumn";
  autumnTag.text="秋";

  var winterTag = document.createElement('option');
  winterTag.value="Winter";
  winterTag.text="冬";

  selectTag.appendChild(springTag);
  selectTag.appendChild(summerTag);
  selectTag.appendChild(autumnTag);
  selectTag.appendChild(winterTag);

  selectTag.value = getSeason();

  selectTag.onchange = function() {
    localStorage["favoriteSeason"] = this.options[this.selectedIndex].value;
  };
  playerTag.appendChild(selectTag);
}

//季節用のタグを取得
//prefixで本拠用か拠点用かを取得
function findBackgroundTag(prefix) {
  var backGround = document.getElementById( prefix + "Spring" );
  if ( backGround == null ) {
    backGround = document.getElementById( prefix + "Summer" );
    if ( backGround == null ) {
      backGround = document.getElementById( prefix + "Autumn" );
      if ( backGround == null ) {
        backGround = document.getElementById( prefix + "Winter" );
      }
    }
  }
  return backGround;
}

//マップ上のイメージを取得
function findMapImages() {
  var maps = document.getElementById( "maps" );
  return maps.children;
}

//背景とマップのイメージを指定した季節に設定
function changeSeason(season) {
  var backgroundTag = findBackgroundTag("village");
  if ( backgroundTag != null ) {
    backgroundTag.id = "village" + season;
  } else {
    backgroundTag = findBackgroundTag("map");
    if ( backgroundTag != null ) {
      backgroundTag.id = "map" + season;
    }
  }
  var lowSeason = season.toLowerCase()
  var mapImages = findMapImages();
  for ( var cnt = 0; cnt < mapImages.length; ++cnt ) {
    var img = mapImages[cnt];
    var imageUrl = img.src;
    if ( imageUrl.indexOf("spring") != -1 ) img.src = imageUrl.replace("spring",lowSeason);
    if ( imageUrl.indexOf("summer") != -1 ) img.src = imageUrl.replace("summer",lowSeason);
    if ( imageUrl.indexOf("autumn") != -1 ) img.src = imageUrl.replace("autumn",lowSeason);
    if ( imageUrl.indexOf("winter") != -1 ) img.src = imageUrl.replace("winter",lowSeason);
  }
}


//アクセスしたURLを取得
var url = window.location.pathname;
//プロフィール画面の場合
if ( url.indexOf("user/") != -1 ) {
  setSeasonBox();
} else {
  var season = getSeason();
  changeSeason(season);
}

})();