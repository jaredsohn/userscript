// ==UserScript==
// @name        eRepublik Fancy Battle
// @namespace   Zifc
// @version     0.2
// @include     http://www.erepublik.com/*/military/battlefield/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://raw.github.com/rstacruz/jquery.transit/master/jquery.transit.js
// @license     http://unlicense.org/
// ==/UserScript==


var $weapon = $('#scroller .listing');
var $enemyWeapon = $('#enemy_weapon');
var $enemyBlock = $('.player.right_side .head_tag');

var animate = function () {
  $.each([$enemyWeapon, $enemyBlock], function (index, o) {
    o
      .transition({x:100, y: -300, opacity: 0, scale: 0.7, rotate: 720}, 600)
      .transition({x:0, y: 0, opacity: 1, scale: 1, rotate: 0}, 0)
      ;
  });
};

var scaleEnemyWeapon = function() {
  var fighterSkill = $('#fighter_skill').text().replace(',', '');
  var enemySkill = $('#enemy_skill').text().replace(',', '');
  var skillDiff = enemySkill - fighterSkill;
  var scale = 1;
  if (skillDiff > 50) {
    scale = 1.2;
  } else if (skillDiff < 50) {
    scale = 0.5;
  }
  $enemyWeapon.transition({x:0, y: 0, opacity: 1, scale: scale, rotate: 0}, 500);
};
scaleEnemyWeapon();

var oldUpdateEnemy = unsafeWindow.updateEnemy;
setTimeout(function() {
  unsafeWindow.updateEnemy = function() {
    animate();
    var args = arguments;
    setTimeout(function() {
      oldUpdateEnemy.apply(this, args);
      scaleEnemyWeapon();
    }, 600);
  };
}, 2000);

$('#fight_btn').click(function() {
  $weapon
    .transition({x: -2}, 50)
    .transition({x: 2}, 50)
    .transition({x: 0}, 50)
    ;
});