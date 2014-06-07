// ==UserScript==
// @name          Better BuO
// @namespace     Harm_ru
// @author        Harm_ru (otvety.google.ru/otvety/user?userid=18332689416227179942)
// @description   Улучшение интерфейса сервиса Вопросы и Ответы (otvety.google.ru)
// @version       1.3.0
// @include       http://otvety.google.ru/*
// @include       http://www.otvety.google.ru/*
// ==/UserScript==

var img1 = 

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAIlJREFUKM9jYKAAM

GITPLp%2F6%2F%2BnTx4wMDAwMEjLKDBYO3ozEm3iqsVT%2F2NjY7X56P6t%2F9%2B%2Ff8Pw7esXvIZycfMwCAqKwF3CwsDAwABzIiHw7esXFAsYkZ2nqq7DwMDAwHD75hUGXOyw2Gy4HiZKQntUMz01s

8AY0jIKDLdvXoFLYGNLyygwUA0AAIMJNIk7okwYAAAAAElFTkSuQmCC';
var img2 = 

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAO1QTFRFAAAA////6u7x0%2BXw3uvzstPlttPjtdLiyN/s0%2Bbx0uXw3uz03evz1ePr6fP56fL39Pn8

8/j7TZzFTZvETpzFTpvET5zFV6LIV6HHWKLJWKLIWaLJWaLIWKHHYqfLY6fLZKfLb67PcK/Pd7LRerbVeLPSeLLRd7HQfLbVgbjUhbvXhbrWjL3Xi73WkcHbkMDalsPal8PanMfeoMfcocjcp83hp83gqM3hqM7hq83fstT

ms9TlttPivtrpwNjlyODtyN/ryeDsyt7o0%2Bbw3uzz3%2Bzz3uvy3%2Bnu6vT56fL26fP39Pn78/j68/n79Pv9tAH6WwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQ

VQY022PW1OCUBSF9/JQJkSeCE0hL0lhomV5AcqDFEkkVv//5wgzTDqj39u3H9Zei%2BgYyxc7Y3RaaNTp%2Bp8VxvzbxjJ3YQYokM1XoqQe4x/JjOj5CZyD4xI/SOEP6J7BG588yBq0%2BO69WiOLIf3efOEcClYcOt

kfwJl7MYQjZSHpNc3GgBL%2BLfC2zg7zRyoZwe6LoidE6o37W7ini7xZYjcdNwxdDk0U5RMxs/p2j00MdX/itH3VKh8u3wKnpxPZbQDaYwAAAABJRU5ErkJggg%3D%3D';
var img3 = 

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAcJQTFRFAAAA////%2Bt/H/eLK%2BuDJ%2B%2BLL%2B%2BPN/ebR/OXQ/ObS%2B%2BXR%2

B%2BbS%2B%2BbT%2B%2BfU%2B%2BfV/erZ/evb%2BtvC%2B%2BDJ%2B%2BDK%2B%2BHL/ePO%2B%2BHM%2B%2BLM/OPO/eXR%2B%2BPP/OXR/OXS%2B%2BTR/efU%2B%2BXS/ejW/OfV%2B%2B

bU%2B%2BbV%2B%2BfW/era/OnZ/evc/Orb%2B%2Bna%2BtW5%2B9m/%2Bdi%2B%2BtvD%2B9zF%2B93F%2B93G%2B%2BDL/OPP/OfX%2B%2BfX/erb/Onb/evd969/97WI%2BcSf%2Bcej%2B8mn%2B8up

%2BtCz%2BtO499rF99vH%2BNzJ99vI%2BODP/Ord73Aj8HEk8HYr8Xcs8HYs8Hcs8Hkx8IE974A98YNA8YRA8oVC8YRB8oVD8IlL9aJt9qNv9qRw9qZz8aJy96t69q%2BA8bKM8rqY89G89NXC%2Bd7N9Ozn728j7m

8j8HAk728k73Ak8Xcu8HYt7ncw8Hgx73cx8n038X048YE%2B8IA%2B8YNB8YlL8IhL8JBX8qJy8aFy8KFy8al/8bGL8rqZ8sKm7sWu8s%2B689PA89vN8%2BPa8Mq278u57L6o6r%2Bq78q48M2846uU57ik68Cu7MKx2

5qC3qSP3aOO3qWQ466a0INr1pB6yXFZzXtkuEowuEswynFa6w0QkQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVQY02NgAIH62qqq2noGGKj0TU3x9nZP

8YtJBMsWpUfYq6uaKNpFZeTVMTAkFgbrarhqmPEby8nqBWYmMsR4G6pqmpsKqCkoyUoK5pQw5IWrdHS29rl0K3c5t9VE%2BzCk2PL29LZPaJykMDGuv9oqmSHNhkcpIV65ha%2BBnYNNxCqJIT%2BMU75ravM

U7slNoqwsFtkMFV76MpxOXI7SDkYiQtq5kQyJIUFakpJSHBIS4kI6BVlApyWGZIRai4uJCDMzeYIcBgRV%2BWnJSSlJlgYeZTDf1NfW1samBvi7lTMggdqy4tI6BgwAAPiQPDYczTEFAAAAAElFTkSuQmCC';
var img_level = [
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAeklEQVQ4y2NgGLRAOnmilFza1BkyKZN+gzA

pGsXkM6avk0uf/tWofvuPgCUv/6vmL3wPFLchygCQZrveU/+Dlr2BY5IMACr01SxZ8YFsAyCumHEF5AWQZpAXSAoDGABpAmkeNYBCA8xa9v0HYbIMAKVIIG6AYrHBm+kAUlSAHepziZEAAAAASUVORK5CYII=',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA00lEQVQ4y2NgGHRAun6imHzrjCsyDZN+g7B

s89QPQDFfUgxoMFux73/AuZdg7HPy8X/NKSs+yDVPnUGUASCFVmuP/A+6+AaOA8+/+i/XMv0r0HApggaAnO+67zqKASCs2rfwPdAAGyIMmL4OFga+p57ADQDxgQZwkhwWIM12m0/9BxlMUmyANIA0gvwPtV2MJ

ANAmkCxQFIMIMeE7qz1n40Wbv8BDI9DID5JhsBsB/nfccfF/6BoJdoAoF/jQLaDAhCGQXyQOCkxEAeKBSRMvGa6AwB+Fawj2Xi79wAAAABJRU5ErkJggg==',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4UlEQVQ4y2NgoBWQnpijDcQ2IJpkzbJTCz4o

zin7qLqw+j2IBvGBBkkRa7MNSGPQm/3/Ydjn8fb/ctMLvxJlCFBRvtH2/h/IBoCw48Vl/+VnFB8ixoA43fUdn0Gu8H2yA26A6/XVQAOKrhDrjTiQV2Qm5f6GGWB3asF/+elF64gOSLmpBTNgYQFyCdFhAItCUOgHvtoLth3k

EqI1wwDIvzBDQIFKkvOhrvAFecPqyOz/AS/3gF1BvO1A2zRXNH4AxQbIBSQbAItKUNSB4h8UmCDXkBgGxYdA4QCiQVHKMGgBAEtsrH6/Z9d1AAAAAElFTkSuQmCC',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqUlEQVQ4y2NgGLRApE2SVbRD6jcMi/fJXiHV

gHy1Tfo/7N56/wdhkCGkaOYEYhuZmUrvHT76kmYASDNIMUgzyAXkGAC3GYbNbjj+JzoMYH4HaVRepfWZZAPEe2UeW953+Q+kv8JcQrQBMOeDXAAySH6h2gfkMCBoCEgByDYYRg4HogISaMAhkCEwjO4CsW7p

GaSkBbB3tHYb/wdhklMizBAgboBiscGZ6QDhFJMRwcg3BwAAAABJRU5ErkJggg==',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVQ4y2NgGJQgZ6K0WN5k6d/IuHCqzAei

DSiZKXto61Xd/xffm8AxyBCgwZxEGVA8Xfbx4UeG/69+MkUxgGgXgBSDNNUvUngP80LxDNl1xPpfu2KO3EeYrSUzZK8UTpOZARRnJdaA/Bk71X7AnL/ntv5/EB8ULjg1KcnJK8D9D3TqunPacL+DDALh9lVKH4CG+xJ

0Aci5IC/A/A5zzYKDGv+BBjQQHQ5QmhUWoCCDQN4jygBQogEFHig6+zeqfD7zypj4dADyJ8i/oMAD4eUntGCaxYiyHRaQIBcgRSHxmukOANCCr3tkx0R/AAAAAElFTkSuQmCC',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA20lEQVQ4y2NgoCWoaxdNA+IOIA4FYkFSNU9

bs0np/+4Dav+XrFb439Yn/p9oQ4AKg6bOkf7/4ZMpHIP4QHFjYg3YfemqDlwzyCUgFxHtb5AGmObNO1VAmneDwoFYA87cvKsPN+DUOa3/INeAwoGgK0CBBAosZL8jY6ghofgMcJmzRA6u4cVr4//orgGqWUW0AVD/

w70E8gooPIj2wqHjGiANdx8+MUTmzyQpCpG9AHIdyJUEExHIFciGgDAoRZKSFoJALumdKgm2FUSDNAOxPKn5QQnkZBBNsxwLAJHq+LqT9OaOAAAAAElFTkSuQmCC',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq0lEQVQ4y2NgGHSgPVdUCYjLcWBjgpqnVkj

+3zlVBSueUyf9H68hQEmXJS1y/z8dNsWKQYaAXELQBbgMAMmB1BDyBlbNxxdqgDTPJCYQp0H9CtYEM4Cg/9EMMQbid6/3GoM1392kD9J8hpSoNAbZSHTgYTEgbVO/EmmBh2ZAx4HZamDNT3YYgjTfJTU17r66

Roe00EczAB6AIK+AvESqAa0gQ0BRCYpWmmY+ACimyepjAMRlAAAAAElFTkSuQmCC',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVQ4y2NgoBVo9xB1AeJVQLwbiDuAWIk

UzdOWxMj9P1ep9f9qnc7/A/lq/6cGSf4HircSo7l1U5rS/0+TTFHw617j/3PCpUGGBGHV2NbWpgCUFOzzFQcrRjcAhEGuAXkJlwEOIH+DnA7TcLdZ///qRAUUA4Fq/uMyQADdgJ3ZKmAbQTYTNAApDN7BbARpRPYS

KFBBMUMwEJFdAcNPOgzBhgHlHQkZUA5yOrZABBkM8iYhA+B+BgUiyFa0MCknyQUgQ0h1ATgtgAIM2flQ26cRm5QdQaENSr4gW6GBNw2I+UjNUErQTCVIs1wLAN+l+Z2jFxIwAAAAAElFTkSuQmCC',
  

'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3UlEQVQ4y2NgoBXI5eExAOKZQLwbShuQor

m1RlDw/0Ylpf8H1NTANIgPEidGc0mLsPD/a3p6/+8ZGMAxiA81xICQAXfPa2ujaIZhkEtA3sGn2RhkOzbNMFcA1bzDZ4BLt5gYXMMiWdn/pXx8/5FdBFTzH58BSiB/whRPlpAAaThzXFMTzAcZBPIioTDYDQp5mJNXysv

DDQSxgfIdhAwIAjkbZisyhsaCEjFRmQxyOnKAEowBbIlplpQUaWkASbMgyBuwxAQyiKhUiO4CkCEgbwDZ08jNUIKgxMVASwAApB6vggPVGPsAAAAASUVORK5CYII=',
];

var panels = [['Популярные темы', 'popular_questions'], ['Панель активности', 'activity_wall'], ['Рекомендованные вам', 'interesting_questions'], ['Возможно, вам понравится отвечать', 'you_like_questions'], 

['Это может быть интересно', 'maybe_interesting']];

function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else expires = "";
  document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function addStyle(s) {
  var head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  var style = document.createElement('style');
  style.type = 'text/css';
  var stylecontent = document.createTextNode(s);
  style.appendChild(stylecontent);
  head.appendChild(style);
}

function applyRatingOption() {
  var hide_rating = readSetting('Better_BuO_hide_rating');
  var rating_nodes = document.evaluate('//div[@id="wpcpiroot"]//div[contains(@class, "wpcppCSS") or contains(@class, "wpcppcCSS")]//div[@class="wrpthbCSS"]', document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var node, flag;
  var regex = /^DWRITE\('.*?',\[(.+?)\],\[(.+?)\],\[(.+?)\]/m ;
  for (var i = 0; i < rating_nodes.snapshotLength; i++) {
    if (hide_rating) rating_nodes.snapshotItem(i).style.display = 'none';
    else {
      var script_node = rating_nodes.snapshotItem(i).parentNode.parentNode.getElementsByTagName('script')[0];
      if (script_node) {
        var r = regex.exec(script_node.innerHTML);
        node = rating_nodes.snapshotItem(i).querySelector('div.wrpthbCSS>div>div');
        if (r && r.length == 4 && node) {
          flag = true;
          var marks = [[0, 0], [0, 0]];
          for (var j = 1; j < 3 && flag; j++) {
            var str_marks = r[j].split(', ');
            if (str_marks.length != 6) {
              flag = false;
              break;
            }
            for (var k = 1; k < 6 && flag; k++) {
              flag = !isNaN(str_marks[k]);
            }
            if (!flag) break;
            marks[j - 1][0] = parseInt(str_marks[1]) + parseInt(str_marks[2]);
            marks[j - 1][1] = parseInt(str_marks[4]) + parseInt(str_marks[5]);
          }
          if (!flag) continue;
          node.title = 'Оценки пользователей: \nЗарегистрированных: +' + marks[0][1] + '  -' + marks[0][0] + ' \nАнонимных: +' + marks[1][1] + '  -' + marks[1][0];
        }
      }
    }
  }
}

function isInBlacklist(blacklist, username) {
  if (!blacklist || !username) return false;
  var list = blacklist.split(',');
  return list.indexOf(username) != -1;
}

function isInGoldlist(goldlist, username) {
  if (!goldlist || !username) return false;
  var list = goldlist.split(',');
  return list.indexOf(username) != -1;
}

function addToBlacklist(username) {
  var blacklist = readCookie('Better_BuO_blacklist');
  if (!isInBlacklist(blacklist, username)) {
    if (blacklist) blacklist += ',';
    else blacklist = '';
    createCookie('Better_BuO_blacklist', blacklist + username, 90);
  } else alert('Уже в черном списке');
  applyBlacklistOption(true);
}

function addToGoldlist(username) {
  var goldlist = readCookie('Better_BuO_goldlist');
  if (!isInGoldlist(goldlist, username)) {
    if (goldlist) goldlist += ',';
    else goldlist = '';
    createCookie('Better_BuO_goldlist', goldlist + username, 90);
  } else alert('Уже в золотом списке');
  applyGoldlistOption(true);
}

function removeFromBlacklist(username) {
  var blacklist = readCookie('Better_BuO_blacklist');
  if (blacklist && username) {
    var list = blacklist.split(',');
    if (list) {
      var index = list.indexOf(username);
      if (index != -1) {
        list.splice(index, 1);
        createCookie('Better_BuO_blacklist', list.toString(), 90);
      }
    }
    applyBlacklistOption(true);
  }
}

function removeFromGoldlist(username) {
  var goldlist = readCookie('Better_BuO_goldlist');
  if (goldlist && username) {
    var list = goldlist.split(',');
    if (list) {
      var index = list.indexOf(username);
      if (index != -1) {
        list.splice(index, 1);
        createCookie('Better_BuO_goldlist', list.toString(), 90);
      }
    }
    applyGoldlistOption(true);
  }
}

function applyBlacklistOption(change) {
  var blacklist_checkbox = document.getElementById('blacklist_checkbox');
  var blacklist_show_answers_row = document.getElementById('blacklist_show_answers_row');
  var blacklist_show_answers_checkbox = document.getElementById('blacklist_show_answers_checkbox');
  var blacklist_on = readSetting('Better_BuO_blacklist_on');
  var blacklist = readCookie('Better_BuO_blacklist');
  var poll_hide = readSetting('Better_BuO_poll_hide');
  var mobile_hide = readSetting('Better_BuO_mobile_hide');
  var blacklist_show_answers = readSetting('Better_BuO_blacklist_show_answers');
  var list;
  if (blacklist) list = blacklist.split(',');
  var blacklist_combobox = document.getElementById('blacklist_combobox');
  if (blacklist_combobox) {
    blacklist_combobox.innerHTML = '';
    if (list) {
      for (var i = 0; i < list.length; i++) {
        var user = document.createElement('a');
        user.src = 'javascript:void(0)';
        user.style.cursor = 'pointer';
        user.innerHTML = list[i];
        user.addEventListener('click', function() { removeFromBlacklist(this.innerHTML); }, true);
        blacklist_combobox.appendChild(user);
        blacklist_combobox.appendChild(document.createElement('br'));
      }
    }
  }
  if (!change && blacklist_checkbox) blacklist_checkbox.checked = blacklist_on;
  if (blacklist_show_answers_row && blacklist_show_answers_checkbox) {
    blacklist_show_answers_row.style.display = blacklist_on ? '' : 'none';
    blacklist_show_answers_checkbox.checked = !blacklist_show_answers;
  }
  var rows = document.querySelectorAll('table#wpr2tr>tbody>tr');
  var name, nameblock;
  for (var i = 0; i < rows.length; i++) {
    nameblock = rows[i].querySelector('td.wpr2cpCSS>div');
    if (nameblock) {
      name = nameblock.querySelector('*.wpfiuCSS');
      if (name) {
        if (!change) {
          var icon = document.createElement('img');
          icon.title = 'В черный список';
          icon.style.display = 'inline';
          icon.style.cursor = 'pointer';
          icon.addEventListener('click', function() { addToBlacklist(this.parentNode.querySelector('*.wpfiuCSS').innerHTML); }, false);
          icon.src = img1;
          nameblock.insertBefore(icon, nameblock.firstElementChild);
        }
        poll_icon = rows[i].querySelector('.wpr2tcCSS.wpr2icoCSS>span.SPRITE_topic_poll');
        mobile_icon = rows[i].querySelector('.wpr2tcCSS.wpr2icoCSS>span.SPRITE_small_phone');
        if (blacklist_on || poll_hide || mobile_hide || change) rows[i].style.display = ((poll_hide && poll_icon) || (mobile_hide && mobile_icon) || (blacklist_on && isInBlacklist(blacklist, name.innerHTML))) ? 'none' : '';
      }
    }
  }
}

function toggleBlacklist() {
  toggleSetting('Better_BuO_blacklist_on');
  applyBlacklistOption(true);
}

function toggleBlacklistCombobox() {
  var blacklist_combobox_button = document.getElementById('blacklist_combobox_button');
  var blacklist_combobox = document.getElementById('blacklist_combobox');
  if (blacklist_combobox_button && blacklist_combobox) {
    if (blacklist_combobox_button.innerHTML == '▼') {
      blacklist_combobox.style.display = '';
      blacklist_combobox_button.innerHTML = '▲';
    } else {
      blacklist_combobox.style.display = 'none';
      blacklist_combobox_button.innerHTML = '▼';
    }
  }
}

function applyGoldlistOption(change) {
  var goldlist_checkbox = document.getElementById('goldlist_checkbox');
  var goldlist_show_answers_row = document.getElementById('goldlist_show_answers_row');
  var goldlist_show_answers_checkbox = document.getElementById('goldlist_show_answers_checkbox');
  var goldlist_on = readSetting('Better_BuO_goldlist_on');
  var goldlist = readCookie('Better_BuO_goldlist');
  var poll_hide = readSetting('Better_BuO_poll_hide');
  var mobile_hide = readSetting('Better_BuO_mobile_hide');
  var goldlist_show_answers = readSetting('Better_BuO_goldlist_show_answers');
  var list;
  if (goldlist) list = goldlist.split(',');
  var goldlist_combobox = document.getElementById('goldlist_combobox');
  if (goldlist_combobox) {
    goldlist_combobox.innerHTML = '';
    if (list) {
      for (var i = 0; i < list.length; i++) {
        var user = document.createElement('a');
        user.src = 'javascript:void(0)';
        user.style.cursor = 'pointer';
        user.innerHTML = list[i];
        user.addEventListener('click', function() { removeFromGoldlist(this.innerHTML); }, true);
        goldlist_combobox.appendChild(user);
        goldlist_combobox.appendChild(document.createElement('br'));
      }
    }
  }
  if (!change && goldlist_checkbox) goldlist_checkbox.checked = goldlist_on;
  if (goldlist_show_answers_row && goldlist_show_answers_checkbox) {
    goldlist_show_answers_row.style.display = goldlist_on ? '' : 'none';
    goldlist_show_answers_checkbox.checked = !goldlist_show_answers;
  }
  var rows = document.querySelectorAll('table#wpr2tr>tbody>tr');
  var name, nameblock;
  for (var i = 0; i < rows.length; i++) {
    nameblock = rows[i].querySelector('td.wpr2cpCSS>div');
    if (nameblock) {
      name = nameblock.querySelector('*.wpfiuCSS');
      if (name) {
        if (!change) {
          var icon2 = document.createElement('img');
          icon2.title = 'В золотой список';
          icon2.style.display = 'inline';
          icon2.style.cursor = 'pointer';
          icon2.addEventListener('click', function() { addToGoldlist(this.parentNode.querySelector('*.wpfiuCSS').innerHTML); }, false);
          icon2.src = img1;
          nameblock.insertBefore(icon2, nameblock.firstElementChild);
        }
        poll_icon = rows[i].querySelector('.wpr2tcCSS.wpr2icoCSS>span.SPRITE_topic_poll');
        mobile_icon = rows[i].querySelector('.wpr2tcCSS.wpr2icoCSS>span.SPRITE_small_phone');
        if (goldlist_on) rows[i].style.backgroundColor = ((goldlist_on && isInGoldlist(goldlist, name.innerHTML))) ? 'none' : '';
      }
    }
  }
}

function toggleGoldlist() {
  toggleSetting('Better_BuO_goldlist_on');
  applyGoldlistOption(true);
}

function toggleGoldlistCombobox() {
  var goldlist_combobox_button = document.getElementById('goldlist_combobox_button');
  var goldlist_combobox = document.getElementById('goldlist_combobox');
  if (goldlist_combobox_button && goldlist_combobox) {
    if (goldlist_combobox_button.innerHTML == '▼') {
      goldlist_combobox.style.display = '';
      goldlist_combobox_button.innerHTML = '▲';
    } else {
      goldlist_combobox.style.display = 'none';
      goldlist_combobox_button.innerHTML = '▼';
    }
  }
}

function togglePoll() {
  toggleSetting('Better_BuO_poll_hide');
  applyBlacklistOption(true);
  applyGoldlistOption(true);
}

function toggleMobile() {
  toggleSetting('Better_BuO_mobile_hide');
  applyBlacklistOption(true);
  applyGoldlistOption(true);
}

function insertAtCursor(field, str) {
  if (!field || !str) return;
  var startPos = 0;
  if (field.selectionStart || field.selectionStart == '0') {
    startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    field.value = field.value.substring(0, startPos) + str + field.value.substring(endPos, field.value.length);
  } else field.value += str;
  var newPos = startPos + str.length + 2;
  field.setSelectionRange(newPos, newPos);
  field.focus();
}

function copyText(name) {
  var answerBox = document.getElementById('wpipedi');
  if (!answerBox) answerBox = document.getElementById('wpiprdi');
  if (!answerBox) answerBox = document.getElementById('waipdi');
  if (answerBox) {
    if (!answerBox.offsetHeight) {
      var answerButton = document.evaluate('//button[contains(@class, "wpcprbCSS") and contains(text(), "Ответить")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (!answerButton) answerButton = document.evaluate('//button[@class="wbsb_CSS" and contains(text(), "Дополнить вопрос")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 

null).singleNodeValue;
      if (answerButton) answerButton.click();
    }
    insertAtCursor(answerBox, name);
  }
}

var quote_map = { '&amp;': '&', '&quot;': '"', '&lt;': '<', '&gt;': '>', '&#39;': '\'', '<br>': '\n>', '&nbsp;': ' ', '\n': '' };

function decode_quote(string) {
  return string.replace( /(&amp;|&quot;|&lt;|&gt;|&#39;|&nbsp;|\n|<br>)/g , function(str, item) { return quote_map[item]; });
}

function quote(name, text) {
  return '>' + decode_quote(name) + '\n>' + decode_quote(text) + '\n';
}

function processAnswerPage() {
  var blacklist_on = readSetting('Better_BuO_blacklist_on');
  var blacklist_show_answers = readSetting('Better_BuO_blacklist_show_answers');
  var blacklist = readCookie('Better_BuO_blacklist');
  var goldlist_on = readSetting('Better_BuO_goldlist_on');
  var goldlist_show_answers = readSetting('Better_BuO_goldlist_show_answers');
  var goldlist = readCookie('Better_BuO_goldlist');
  var editBox = document.getElementById('wpipedi');
  var answerBox = document.getElementById('wpiprdi');
  var fidRE = new RegExp('^fid_(.*)$');
  if (!answerBox) answerBox = document.getElementById('waipdi');
  var answers = document.querySelectorAll('table.wvtbCSS>tbody>tr>td.wvlpCSS div.wpcprootCSS');
  if (answerBox) {
    var icon = document.createElement('img');
    icon.title = 'Сообщить о Better BuO+ другим';
    icon.style.display = 'inline';
    icon.style.cursor = 'pointer';
    icon.src = img2;
    icon.addEventListener('click', function() { insertAtCursor(answerBox, 'Я пользуюсь Better BuO+: http://userscripts.org/scripts/show/76424\n'); }, true);
    answerBox.parentNode.appendChild(icon);
  }
  var iconName, iconQuote, spanQuote, header, nickname, answerLink, spanLink, fid;
  for (var i = 0; i < answers.length; i++) {
    header = answers[i].querySelector('div.wpcppmcCSS>div.wpcpchrCSS');
    if (!header) continue;
    nickname = header.querySelector('div.wpcppmcCSS span.wpcpaCSS>a.wpfitCSS.wpfiuCSS').title;
    if (!nickname) continue;
    if (blacklist_on && !blacklist_show_answers && isInBlacklist(blacklist, nickname)) {
      if (answers[i].style.borderTopStyle == 'none' && answers[i].nextElementSibling) answers[i].nextElementSibling.style.borderTopStyle = 'none';
      answers[i].style.display = 'none';
    } else {
     if (goldlist_on && !goldlist_show_answers && isInGoldlist(goldlist, nickname)) {
      if (answers[i].style.borderTopStyle == 'none' && answers[i].nextElementSibling) answers[i].nextElementSibling.style.borderTopStyle = 'none';
      answers[i].style.backgroundColor = 'none';
    }
      if (answerBox || editBox) {
        iconName = document.createElement('img');
        iconName.title = 'Обpатиться';
        iconName.style.display = 'inline';
        iconName.style.cursor = 'pointer';
        iconName.src = img2;
        iconQuote = document.createElement('img');
        iconQuote.title = 'Цитировать';
        iconQuote.style.display = 'inline';
        iconQuote.style.cursor = 'pointer';
        iconQuote.src = img3;
        (function(nick, hdr) {
          iconName.addEventListener('click', function() { copyText(decode_quote(nick + ', ')); }, true);
          iconQuote.addEventListener('click', function() {
            var text;
            var selection = window.getSelection();
            if (selection.anchorNode && selection.anchorNode == selection.focusNode && selection.anchorNode.parentNode && selection.anchorNode.parentNode.parentNode && 

(selection.anchorNode.parentNode.parentNode.querySelector('div.wpcpchrCSS') == hdr || (selection.anchorNode.parentNode.parentNode.parentNode && 

selection.anchorNode.parentNode.parentNode.parentNode.querySelector('div.wpcpchrCSS') == hdr))) {
              text = selection.toString();
            } else {
              text = hdr.nextElementSibling.innerHTML;
            }
            copyText(quote(nick, text));
          }, true);
        })(nickname, header);
        spanQuote = document.createElement('span');
        spanQuote.setAttribute('class', 'wpcpaCSS');
        spanQuote.appendChild(iconName);
        spanQuote.appendChild(iconQuote);
        header.appendChild(spanQuote);
      }
      fid = answers[i].getAttribute('id');
      if (!fid) continue;
      fid = fidRE.exec(fid)[1];
      if (!fid) continue;
      answerLink = document.createElement('a');
      answerLink.href = 'http://otvety.google.ru/otvety/thread?fid=' + fid;
      answerLink.title = 'Ссылка на ответ';
      answerLink.innerHTML = '#';
      spanLink = document.createElement('span');
      spanLink.setAttribute('class', 'wpcpirbCSS');
      spanLink.appendChild(answerLink);
      header.appendChild(spanLink);
    }
  }
  addStyle('a:hover .wciuasCSS { width:auto; height:auto; position:absolute; z-index:150; }');
}

function toggleSetting(name) {
  var result = readSetting(name);
  result = !result;
  createCookie(name, result ? 'true' : 'false', 90);
  return result;
}

function readSetting(name) {
  return readCookie(name) == 'true';
}

function displaySetting(option, name, defaultChecked) {
  var result = readSetting(name);
  result = (result && !defaultChecked) || (!result && defaultChecked);
  if (option) option.checked = result;
  return result;
}

function displayPanel(title, hide) {
  var panelNode = document.evaluate('//td[@id="wvlp" or @id="wvrp"]//div[@class="wmfCSS"]/div[@class="wmcCSS"]/span[text()="' + title + '"]/../..', document, null, 

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (panelNode) panelNode.style.display = hide ? 'none' : '';
}

function togglePanel(title, name) {
  displayPanel(title, toggleSetting('Better_BuO_hide_' + name));
}

function processPanels() {
  for (var i = 0; i < panels.length; i++) {
    displayPanel(panels[i][0], readSetting('Better_BuO_hide_' + panels[i][1]));
  }
}

function addCheckbox(settingsBody, text) {
  if (!settingsBody) return;
  var option = document.createElement('input');
  option.setAttribute('type', 'checkbox');
  settingsBody.appendChild(option);
  settingsBody.appendChild(document.createTextNode(text));
  settingsBody.appendChild(document.createElement('br'));
  return option;
}

function processUserPage() {
  var userNameDiv = document.querySelector('td.wuvunbCSS');
  var userInfoRow = document.querySelector('div.wdpsCSS');
  if (userInfoRow && userNameDiv) {
    var userName = userNameDiv.innerText;
    if (userName) {
      var icon = document.createElement('img');
      var icon2 = document.createElement('img');
      icon.title = 'В черный список';
      icon2.title = 'В золотой список';
      icon.style.display = 'inline';
      icon2.style.display = 'inline';
      icon.style.cursor = 'pointer';
      icon2.style.cursor = 'pointer';
      icon.addEventListener('click', function() { addToBlacklist(userName); }, false);
      icon2.addEventListener('click', function() { addToGoldlist(userName); }, false);
      icon.src = img1;
      icon2.src = img1;
      userInfoRow.appendChild(icon);
      userInfoRow.appendChild(icon2);
    }
  }
}

function processEachPage() {
  var topPanel = document.getElementById('gbe');
  if (topPanel) {
   if(topPanel.children[0].innerText != "Справка по Вопросам и ответам") {
   if(topPanel.children[0].innerText != "Оповещения") {
    topPanel.children[0].removeAttribute('class');
    topPanel.children[0].style.color="orange";
    topPanel.children[0].style.fontWeight="bold";
    topPanel.children[0].style.textDecoration="underline";
   }
   }
  }
    topPanel.children[1].innerText="Профиль";
    topPanel.children[2].innerText="?";
}

function processMainPage() {
  var rightPanel = document.getElementById('wvrp');
  if (rightPanel) {
    var settingsPanel = document.createElement('div');
    settingsPanel.setAttribute('class', 'wmfCSS');
    settingsPanel.innerHTML = '<div class="wmcCSS"><span>Настройки Better BuO+</span></div>';
    settingsPanel.style.fontSize = '10px';
    var settingsBody = document.createElement('div');
    for (var i = 0; i < panels.length; i++) {
      var option = addCheckbox(settingsBody, panels[i][0]);
      (function(o, n) { o.addEventListener('click', function() { togglePanel(panels[n][0], panels[n][1]); }, true); })(option, i);
      displayPanel(panels[i][0], !displaySetting(option, 'Better_BuO_hide_' + panels[i][1], true));
    }
    var ratingOption = addCheckbox(settingsBody, 'Показывать оценки');
    ratingOption.addEventListener('click', function() { toggleSetting('Better_BuO_hide_rating'); }, true);
    displaySetting(ratingOption, 'Better_BuO_hide_rating', true);
    var pollOption = addCheckbox(settingsBody, 'Показывать опросы');
    pollOption.addEventListener('click', togglePoll, true);
    displaySetting(pollOption, 'Better_BuO_poll_hide', true);
    var mobileOption = addCheckbox(settingsBody, 'Показывать вопросы с мобильного телефона');
    mobileOption.addEventListener('click', toggleMobile, true);
    displaySetting(mobileOption, 'Better_BuO_mobile_hide', true);
    var levelIconOption = addCheckbox(settingsBody, 'Цветные значки уровня');
    levelIconOption.addEventListener('click', function() { toggleSetting('Better_BuO_level_icon'); }, true);
    displaySetting(levelIconOption, 'Better_BuO_level_icon', true);
    var div = document.createElement('div');
    div.setAttribute('class', 'wmbCSS');
    div.appendChild(settingsBody);
    settingsPanel.appendChild(div);
    if (rightPanel.children[1]) rightPanel.insertBefore(settingsPanel, rightPanel.children[1]);
  }
  var leftPanel = document.getElementById('wparoot');
  if (leftPanel) {
    var blacklist = document.createElement('div');
    blacklist.setAttribute('class', 'wmfCSS');
    blacklist.innerHTML = '<div class="wmcCSS"><span>Чёрный список</span></div><div class="wmbCSS"><div class="wpasiCSS"><table width="100%"><tr><td>По никам</td><td align="right"><input 

type="checkbox" id="blacklist_checkbox"></td><td rowspan="2" valign="top"><span id="blacklist_combobox_button" style="cursor:pointer;">&#9660;</span></td></tr><tr 

id="blacklist_show_answers_row"><td>Скрывать ответы</td><td align="right"><input type="checkbox" id="blacklist_show_answers_checkbox"</tr></table><div id="blacklist_combobox" style="display: 

none"></div></div></div>';
    if (leftPanel.children[3]) leftPanel.insertBefore(blacklist, leftPanel.children[3]);
    document.getElementById('blacklist_combobox_button').addEventListener('click', toggleBlacklistCombobox, true);
    document.getElementById('blacklist_checkbox').addEventListener('click', toggleBlacklist, true);
    document.getElementById('blacklist_show_answers_checkbox').addEventListener('click', function() { toggleSetting('Better_BuO_blacklist_show_answers'); }, true);


    var goldlist = document.createElement('div');
    goldlist.setAttribute('class', 'wmfCSS');
    goldlist.innerHTML = '<div class="wmcCSS"><span>Золотой список</span></div><div class="wmbCSS"><div class="wpasiCSS"><table width="100%"><tr><td>По никам</td><td align="right"><input 

type="checkbox" id="goldlist_checkbox"></td><td rowspan="2" valign="top"><span id="goldlist_combobox_button" style="cursor:pointer;">&#9660;</span></td></tr><tr 

id="goldlist_show_answers_row"><td>Выделять ответы</td><td align="right"><input type="checkbox" id="goldlist_show_answers_checkbox"</tr></table><div id="goldlist_combobox" style="display: 

none"></div></div></div>';
    if (leftPanel.children[3]) leftPanel.insertBefore(goldlist, leftPanel.children[3]);
    document.getElementById('goldlist_combobox_button').addEventListener('click', toggleGoldlistCombobox, true);
    document.getElementById('goldlist_checkbox').addEventListener('click', toggleGoldlist, true);
    document.getElementById('goldlist_show_answers_checkbox').addEventListener('click', function() { toggleSetting('Better_BuO_goldlist_show_answers'); }, true);
  }
  addStyle('.wpr2cpCSS { width:11ex !important; } ');
}

function addLevelImages() {
  for (var i = 1; i < 10; i++) {
    addStyle('.SPRITE_level_' + i.toString() + ' { background: url(\'' + img_level[i - 1] + '\') no-repeat !important; }');
  }
}

function checkForServerError() {
  if (document.title == '404 Не найдено' || document.title == 'Page Not Found – Google' || document.title == 'Страница не найдена – Google') {
    document.location.reload();
  }
}

function processPage() {
  if (!readSetting('Better_BuO_level_icon')) addLevelImages();
  if ( /otvety\.google\.ru\/otvety\/thread/ .test(window.location.href)) {
    processAnswerPage();
    processPanels();
    applyRatingOption();
  } else {
    if ( /otvety\.google\.ru\/otvety\/(?:topics)?(?:\?.*)?$/ .test(window.location.href)) {
      processMainPage();
      applyBlacklistOption(false);
      applyGoldlistOption(false);
    } else {
      if ( /otvety\.google\.ru\/otvety\/user\?/ .test(window.location.href)) {
        processUserPage();
      }
    }
  }
processEachPage();
}

(function() {
  checkForServerError();
  if (document.readyState == "complete") {
    processPage();
  } else {
    window.addEventListener('load', function() { processPage(); }, true);
  }
})();