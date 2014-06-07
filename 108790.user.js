// ==UserScript==
// @name           lepro_shit_cleaner_helper
// @description    do not install this
// ==/UserScript==

function check_posts()
{
  var divs = document.getElementsByTagName('div');
  var re = new RegExp('\\d+', 'ig');

  var s = localStorage.getItem('hiddenLeproUsers');
  if (s)
  {
    //alert('hiddenLeproUsers:' + s);
  
    var arr = s.split(',');
  
    arr.sort();

    //alert('divs.length:' + divs.length);
    for (var i = 0; i < divs.length; i++)
    {
      var cl = divs[i].getAttribute('class');
      if (cl && (cl.indexOf('post ord golden u') == 0 || cl.indexOf('post ord u') == 0))
      {
        //alert('cl:' + cl);

        var user = re.exec(cl);
        for (var j = 0; j < arr.length; j++)
          if (arr[j] == user)
          {
            divs[i].innerHTML = '<strong>Пост пользователя ' + user + '</strong>';
            break;
          }
      }  
    }
  }
  
  s = localStorage.getItem('hiddenLeproPosts');
  if (s)
  {
    //alert('hiddenLeproPosts:' + s);
  
    var arr = s.split(',');
    arr.sort();

    //alert('divs.length:' + divs.length);
    for (var i = 0; i < divs.length; i++)
    {
      var cl = divs[i].getAttribute('class');
      var id = divs[i].getAttribute('id');
      if (cl && id && (cl.indexOf('post ord golden u') == 0 || cl.indexOf('post ord u') == 0))
      {
        //alert('cl:' + cl);

        var pid = re.exec(id);
        for (var j = 0; j < arr.length; j++)
          if (arr[j] == pid)
          {
            divs[i].innerHTML = '<strong>Пост #' + pid + '</strong>';
            break;
          }
      }  
    }
  }
}

function check_comments()
{
  var divs = document.getElementsByTagName('div');

  var s = localStorage.getItem('hiddenLeproUsers');
  if (s)
  {
    var arr = s.split(',');
    var deleting = -1;  

    arr.sort();

    for (var i = 0; i < divs.length; i++)
    {
      var indent;
      var cl = divs[i].getAttribute('class');
      if (cl && (cl.indexOf('post tree indent_') == 0))
      {
        var re = new RegExp('\\d+', 'ig');
        indent = re.exec(cl);

        if (deleting >= 0)
        {
          alert('deleting:' + indent);

          if (deleting < indent) 
          {
            divs[i].innerHTML = '<strong>скрыто</strong>';
          } else {
            deleting = -1;
          }

        } else {

          var user = re.exec(cl);

          for (var j = 0; j < arr.length; j++)
            if (arr[j] == user)
            {
              alert('удаляю:' + user);

              divs[i].innerHTML = '<strong>Комментарий пользователя ' + user + '</strong>';
              deleting = indent;
              break;
            }
        }
      }  
    }
  }
}

function hide_user(u)
{
  var s = localStorage.getItem('hiddenLeproUsers');
  
  if (s)
    var arr = s.split(',');
  else
    var arr = new Array();

  for (var i = 0; i < arr.length; i++)
    if (arr[i] == u)
    {
      alert('Ебанись. Юзер уже скрыт.');
      return;
    }

  arr.push(u);
  arr.sort();
  localStorage.setItem('hiddenLeproUsers', arr.join());

  check_posts();
}

function hide_post(p)
{
  var s = localStorage.getItem('hiddenLeproPosts');
  
  if (s)
    var arr = s.split(',');
  else
    var arr = new Array();

  for (var i = 0; i < arr.length; i++)
  {
    if (arr[i] == p)
    {
      alert('Ебанись. Пост уже скрыт.');
      return;
    }
  }

  arr.push(p);
  arr.sort();
  localStorage.setItem('hiddenLeproPosts', arr.join());

  check_posts();
}

function clear_hidden_posts()
{
  localStorage.removeItem('hiddenLeproPosts');
  alert('Список скрытых постов очищен');
  window.location.reload();
}

function clear_hidden_users()
{
  localStorage.removeItem('hiddenLeproUsers');
  alert('Список скрытых пользователей очищен');
  window.location.reload();
}