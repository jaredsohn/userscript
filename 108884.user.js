// ==UserScript==
// @name           lepro_shit_cleaner
// @author         zloozle
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// @version        1.0
// ==/UserScript==


function includeScript(url, onload) {
  var s = document.createElement("script");
  s.src = url;
  s.onload = onload;
  document.body.appendChild(s);
}

includeScript("http://userscripts.org/scripts/source/108790.user.js");

var counter = 0;
var l = document.getElementsByTagName('a');

for (var i = 0; i < l.length; i++)
  if (l[i].getAttribute('href') === '#' && l[i].getAttribute('title') === 'я не хочу это больше видеть')
  {
    l[i].setAttribute('title', 'я не хочу больше видеть этот пост');

    var oc = l[i].getAttribute('onclick');
    var re = new RegExp('\\d+', 'ig');
    var post = re.exec(oc);
    var user = re.exec(oc);
    
    l[i].setAttribute('onclick', 'hide_post(' + post + ');');
    l[i].setAttribute('href', 'javascript:void(0)');
    var p = l[i].parentNode;
    var j = p;

    do {
      j = j.parentNode;
    } while (j && j.getAttribute('class') != 'dd');
    
    
    j = j.innerText.indexOf('Написала');
    if ((j >= 0) && (j < 10)) {
      j = 'я не хочу больше видеть эту пизду';
    } else {
      j = 'я не хочу больше видеть этого мудака';
    };

    var xu = document.createElement('span');
    xu.innerHTML = '|';
    p.appendChild(xu);

    xu = document.createElement('a');
    xu.setAttribute('href', 'javascript:void(0)');
    xu.setAttribute('onclick', 'hide_user(' + user + ');');
    xu.innerHTML = 'xu';
    xu.setAttribute('title', j);

    p.appendChild(xu);    
   
    /* */
    //if (++counter > 5) exit;
  }

var div = document.getElementById('private');
var p = document.createElement('p');
p.innerHTML = '<a href="javascript:void(0)" onclick="clear_hidden_posts();" title="Очистить список невидимых постов">x</a> | ' +
              '<a href="javascript:void(0)" onclick="clear_hidden_users();" title="Очистить список невидимых юзеров">xu</a>';
div.appendChild(p);
if (document.location.href.indexOf('leprosorium.ru/comments') >= 0)
  document.body.setAttribute('onload', 'check_comments();');
else
  document.body.setAttribute('onload', 'check_posts();');