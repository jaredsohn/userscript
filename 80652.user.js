// ==UserScript==
// @name           Animal Augury on Mixi
// @namespace      http://www.unfindable.net/
// @description    Mixiで動物占い 
// @include        http://mixi.jp/show*
// @include        http://mixi.jp/show_friend.pl?id=*
// @version        1.03
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

var profile = document.getElementById('profile');

function getBirthday() {
  var now = new Date();
  var age = 0, month = 0, date = 0;
  var data = profile.getElementsByTagName('td');
  for (var i = 0; i < data.length; ++i) {
    var oj = data[i].firstChild;
    if (oj) {
      var v = oj.nodeValue;
      if (v && v.match(/([0-9]{1,3})歳/)) {
        age = RegExp.$1;
      }
      else if (v && v.match(/([0-9]{2})月([0-9]{2})日/)) {
        month = RegExp.$1;
        date = RegExp.$2;
      }
    }
  }
  age = age - 0;
  month = month - 0;
  date = date - 0;
  if (age == 0 || month == 0 || date == 0) return null;
  
  var year = 1900;
  if (month < now.getMonth()) year += now.getYear() - age;
  else if (month > now.getMonth()) year += now.getYear() - age - 1;
  else if (date <= now.getDate()) year += now.getYear() - age;
  else year += now.getYear() - age - 1;
  
  var birthday = new Object();
  birthday.year = year;
  birthday.month = month;
  birthday.date = date;
  return birthday;
}

function augury(birthday) {
  var animal = new Object();
  var year = birthday.year - 1900;
  var month = birthday.month;
  var date = birthday.date;
  var c, c1 = 0;
  
  if (month == 1) {
    c = 10;
    c1 = 1;
  }
  else if (month == 2) {
    c = 41;
    c1 = 1;
  }
  else if (month == 3) c = 9;
  else if (month == 4) c = 40;
  else if (month == 5) c = 10;
  else if (month == 6) c = 41;
  else if (month == 7) c = 11;
  else if (month == 8) c = 42;
  else if (month == 9) c = 13;
  else if (month == 10) c = 43;
  else if (month == 11) c = 14;
  else if (month == 12) c = 44;
  
  f = (c + 5 * year + date + (year - c1 - (year - c1) % 4) / 4) % 60;
  
  if (f == 0 || f == 6 || f == 43 || f == 49 || f == 54 || f == 55) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/tora.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/tiger.gif';
    animal.name = 'tiger';
  }
  else if (f == 1 || f == 7 || f == 42 || f == 48) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/cheetah.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/cheetah.gif';
    animal.name = 'cheetah';
  }
  else if (f == 2 || f == 8 || f == 41 || f == 47) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/tanuki.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/tanuki.gif';
    animal.name = 'raccoon';
  }
  else if (f == 3 || f == 9 || f == 15 || f == 34 || f == 40 || f == 46) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/saru.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/saru.gif';
    animal.name = 'monkey';
  }
  else if (f == 4 || f == 10 || f == 16 || f == 33 || f == 39 || f == 45) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/koala.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/koala.gif';
    animal.name = 'koala';
  }
  else if (f == 5 || f == 44 || f == 50 || f == 53 || f == 56 || f == 59) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/kurohyou.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/kurohyou.gif';
    animal.name = 'black panther';
  }
  else if (f == 11 || f == 17 || f == 32 || f == 38) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/kojika.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/kojika.gif';
    animal.name = 'fawn';
  }
  else if (f == 12 || f == 18 || f == 31 || f == 37) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/zou.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/zou.gif';
    animal.name = 'elephant';
  }
  else if (f == 13 || f == 19 || f == 24 || f == 25 || f == 30 || f == 36) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/ohkami.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/ohkami.gif';
    animal.name = 'wolf';
  }
  else if (f == 14 || f == 20 || f == 23 || f == 26 || f == 29 || f == 35) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/hitsuji.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/hitsuji.gif';
    animal.name = 'sheep';
  }
  else if (f == 21 || f == 22 || f == 27 || f == 28) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/pegasus.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/pegasus.gif';
    animal.name = 'pegasus';
  }
  else if (f == 51 || f == 52 || f == 57 || f == 58) {
    animal.uri = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/lion.html';
    animal.img = 'http://www.gamecity.ne.jp/joy_p/uranai/what/12animals/img/lion.gif';
    animal.name = 'lion';
  }
  
  return animal;
}

function display(animal) {
  var a = document.createElement('a');
  a.setAttribute('href',animal.uri);
  var img = document.createElement('img');
  img.setAttribute('src',animal.img);
  img.setAttribute('alt',animal.name);
  a.appendChild(img);

  profile.insertBefore(a, null);
}

var birthday = getBirthday();
if (birthday) {
  //console.log(birthday.year+"/"+birthday.month+"/"+birthday.date);
  var animal = augury(birthday);
  display(animal);
}