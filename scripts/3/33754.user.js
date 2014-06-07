// ==UserScript==
// @name           nicovideo Show registrated message
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @include        http://www.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/mylist/*
// ==/UserScript==

const TIMEOUT = 10000;
const LOAD_INTERVAL = 500;

GM_addStyle(
  'option._GM_registered:before { content: "★"; color: #ff9900;}');

function levenshteinDistance(str1, str2) {
  var len1 = str1.length, len2 = str2.length;
  var d = new Array(len1);
  var i1, i2, cost;
  for(i1 = 0; i1 < len1; i1++) {
    d[i1] = new Array(len2);
    d[i1][0] = i1;
  }
  for(i2 = 0; i2 < len2; i2++)
    d[0][i2] = i2;

  var temp_min, temp_cur;
  for(i1 = 1; i1 < len1; i1++) {
    for(i2 = 1; i2 < len2; i2++){
      cost = (str1[i1] == str2[i2]) ? 0 : 1;
      temp_min = d[i1-1][i2] + 1;      // 文字挿入のコスト
      temp_cur = d[i1][i2-1] + 1;      // 文字削除のコスト
      if(temp_cur < temp_min)
        temp_min = temp_cur;
      temp_cur = d[i1-1][i2-1] + cost; // 置換のコスト
      if(temp_cur < temp_min)
        temp_min = temp_cur;
      d[i1][i2] = temp_min;
    }
  }

  return d[len1-1][len2-1];
}

var RMessage = function(form) {
  this.div = document.createElement('span');
  this.div.className = 'TXT12';
  this.div.style.margin = '4px';
  this.div.style.display = 'block';

  this.df = document.createDocumentFragment();
  this.df.appendChild(document.createTextNode(' '));
  this.link = document.createElement('a');
  this.df.appendChild(this.link);
  this.df.appendChild(document.createElement('br'));

  form.appendChild(this.div);
};
RMessage.prototype.add = function(mylist_id, mylist_name, element) {
  this.link.href = '/mylist/' + mylist_id;
  this.link.textContent = mylist_name;
  this.link.title = mylist_name;
  if(element != null)
    element.className = '_GM_registered';

  if(!this.added) {
    var strong = document.createElement('strong');
    strong.textContent = '登録済み：';
    this.div.appendChild(strong);
    this.div.appendChild(document.createElement('br'));

    this.added = true;
  }
  this.div.appendChild(this.df.cloneNode(true));
};

var SMessage = function(form) {
  this.form = form;
  form.style.position = 'absolute';
  this.dl = document.createElement('dl');
  this.dl.style.margin = '0';
  this.dl.fontSize = '90%';

  this.dt = document.createElement('dt');
  this.toggle_button = document.createElement('span');
  this.toggle_button.textContent = '-';
  this.toggle_button.setAttribute('style',
                                  'display: inline-block;\
                                  border: 1px solid gray;\
                                  margin-right: 3px;\
                                  padding: 1px;\
                                  line-height: 1;\
                                  font-size: 10px;\
                                  width: 8px; height: 8px;\
                                  vertical-align: middle;\
                                  text-align: center;\
                                  cursor: pointer;');
  this.mylist_link = document.createElement('a');
  this.mylist_link.style.fontWeight = 'bolder';
  this.dt.appendChild(this.toggle_button);
  this.dt.appendChild(document.createTextNode(' '));
  this.dt.appendChild(this.mylist_link);
  this.dl.appendChild(this.dt);

  this.dd = document.createElement('dd');
  this.dd.style.marginLeft = '1.5em';
  this.dd.style.display = 'list-item';
  this.movie_link = document.createElement('a');
  this.dd.appendChild(this.movie_link);

  this.messageDiv = document.createElement('div');
  this.messageDiv.className = 'TXT12';
  this.messageDiv.setAttribute('style',
                               'margin: 0;\
                               padding: 2px 4px;\
                               width: 30em;\
                               border: 1px solid gray;\
                               display: none;');
  this.messageButton = this.messageDiv.appendChild(this.toggle_button.cloneNode(true));
  this.messageButton.style.display = 'none';
  var self = this;
  this.messageButton.addEventListener(
    'click', function() {
      if(self.div.style.display == 'none') {
        self.messageButton.textContent = '-';
        self.div.style.display = 'block';
      }
      else {
        self.messageButton.textContent = '+';
        self.div.style.display = 'none';
      }
    }, false
  );
  this.message = this.messageDiv.appendChild(document.createElement('span'));
  this.form.appendChild(this.messageDiv);

  this.div = document.createElement('div');
  this.div.className = 'TXT12';
  this.div.setAttribute('style',
                        'max-height: 10em;\
                        overflow:auto;\
                        margin: 0 0 2em;\
                        padding: 4px;\
                        border: 1px solid gray;\
                        position: absolute;\
                        bottom: 0;\
                        background-color: white;\
                        width: 30em;\
                        display: none;');
  this.form.appendChild(this.div);

  this.mylistData = [];
};
SMessage.prototype.add = function(data) {
  this.mylistData.push(data);
};
SMessage.prototype.setToggleButton = function(mylist, dl) {
  var dds = dl.getElementsByTagName('dd');
  var button = dl.getElementsByTagName('span')[0];
  function updateState() {
    button.textContent = mylist.closed ? '+' : '-';
    for each(var dd in dds) {
      if(dd.style) {
        dd.style.display = mylist.closed ? 'none' : 'list-item';
      }
    }
  }
  button.addEventListener(
    'click', function() {
      mylist.closed = !mylist.closed;
      updateState();
    }, false
  );
  updateState();
};
SMessage.prototype.show = function(threshold) {
  this.div.textContent = '';
  var df = document.createDocumentFragment();
  var all_count = 0;
  var mylist;
  if(threshold == 0) {
    var n1 = Infinity, n2 = Infinity;
    threshold = Infinity;
    for each (mylist in this.mylistData) {
      for each(var movie in mylist.movies) {
        if(movie.similarity === undefined)
          movie.similarity = getSimilarity(movie.name);
        if(movie.similarity <= n1) {
          threshold = n2;
          n2 = n1;
          n1 = movie.similarity;
        } else if(movie.similarity <= n2) {
          threshold = n2;
          n2 = movie.similarity;
        } else if(movie.similarity <= threshold) {
          threshold = movie.similarity;
        }
      }
    }
  }
  for each (mylist in this.mylistData) {
    this.mylist_link.href = '/mylist/' + mylist.id;
    this.mylist_link.textContent = mylist.name;
    var dl = this.dl.cloneNode(true);
    var dt_count = 0;
    for each(var movie in mylist.movies) {
      if(movie.similarity === undefined)
        movie.similarity = getSimilarity(movie.name);
      if(movie.similarity <= threshold) {
        this.movie_link.href = '/watch/' + movie.id;
        this.movie_link.innerHTML = movie.name;
        this.dd.title = '相違度: ' + Math.floor(movie.similarity * 1000 + 0.5) / 1000;
        dl.appendChild(this.dd.cloneNode(true));
        dt_count++;
        all_count++;
      }
    }
    this.setToggleButton(mylist, dl);
    if(dt_count > 0) {
      dl.firstChild.appendChild(document.createTextNode(' (' + dt_count + ')'));
      df.appendChild(dl);
    }
  }
  if(all_count == 0) {
    this.message.textContent = '見つかりませんでした (閾値: ' + threshold + ')';
    this.div.style.display = 'none';
    this.div.style.position = 'absolute';
    this.messageButton.style.display = 'none';
  } else {
    this.message.textContent = all_count + '件 見つかりました (閾値: ' + threshold + ')';
    this.messageButton.textContent = '-';
    this.messageButton.style.display = 'inline-block';
    this.div.appendChild(df);
    this.div.style.display = 'block';
  }
  this.messageDiv.style.display = 'block';
};

var Control = function(form) {
  this.form = form;
  this.parts = document.createElement('div');
  this.parts.className = 'TXT12';
  this.parts.style.marginLeft = '4px';

  this.button = document.createElement('input');
  this.button.className = 'submit';
  this.button.value = '読み込み中';
  this.button.type = 'button';
  this.button.disabled = true;
  this.parts.appendChild(this.button);

  this.label = document.createElement('label');
  this.label.textContent = ' 閾値：';
  this.label.style.fontWeight = 'bolder';
  this.label.style.display = 'none';

  this.input = document.createElement('input');
  this.input.type = 'text';
  this.input.size = '4';
  this.input.value = '0';
  this.input.disabled = true;

  this.label.appendChild(this.input);
  this.parts.appendChild(this.label);
  this.form.appendChild(this.parts);
};
Control.prototype.setButtonText = function(done, sum) {
  this.button.value = '読み込み中 (' + done + ' / ' + sum + ')';
};
Control.prototype.enableButtons = function() {
  this.button.disabled = false;
  this.button.value = 'マイリストから似た動画を探す';
  this.input.disabled = false;
};
Control.prototype.addCommand = function(command) {
  function handler(e) {
    e.preventDefault();
    command();
  }
  this.button.addEventListener('click', handler, false);
  this.form.addEventListener('submit', handler, false);
};

var EMessage = function(form) {
  this.form = form;
  this.ul = document.createElement('ul');
  this.ul.className = 'TXT12';
  this.ul.style.marginLeft = '4px';
  this.ul.style.paddingLeft = '1.5em';

  this.form.appendChild(this.ul);
  this.errors = [];
};
EMessage.prototype.add = function(messageItem) {
  this.errors.push(messageItem);
  this.ul.appendChild(messageItem.li);
};
var EMessageItem = function(mylist_id, message, command) {
  this.li = document.createElement('li');
  this.li.textContent = message + ': ';
  this.link = document.createElement('a');
  this.link.textContent = 'mylist/' + mylist_id;
  this.link.href = '/mylist/' + mylist_id;

  this.li.appendChild(this.link);
};

var check_lists = eval(GM_getValue('check_lists', '[]'));
if(new RegExp('^http://www.nicovideo.jp/mylist/(\\d+)').test(location.href)) {
  // mylist page
  var mylist_id = RegExp.$1;
  var mylist_title = document.getElementsByTagName('h1')[0].textContent;
  GM_registerMenuCommand(
    'nicovideo Show registered message - toggle setting',
    function() {
      if(check_lists.some(
           function(list) { return list.id == mylist_id; })) {
        check_lists = check_lists.filter(
          function(list) { return list.id != mylist_id; });
        alert('解除しました。');
      }
      else {
        check_lists.push({id: mylist_id, title: mylist_title});
        alert('登録しました。');
      }
      GM_setValue('check_lists', check_lists.toSource());
    });
}
else {
  // watch page
  var video_name = unsafeWindow.Video.title;
  var video_id = unsafeWindow.Video.id;

  var select = document.getElementById('mylist_add_group_id');
  var option = select.getElementsByTagName('option');

  var p1 = document.evaluate(
    'id("des_2")/table[1]/descendant::td[2]/p[descendant::img]',
    select, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var registered_message = new RMessage(p1);

  var tr = document.evaluate(
    'id("mymemory_add_form")/ancestor::tr',
    select, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var td1 = tr.appendChild(document.createElement('td'));
  var td2 = tr.appendChild(document.createElement('td'));
  var td3 = tr.appendChild(document.createElement('td'));
  var form = td1.appendChild(document.createElement('form'));
  function getSimilarity(str) {
    return levenshteinDistance(video_name, str) / video_name.length;
  }
  var control = new Control(form);
  var error_message = new EMessage(td2);
  var similar_message = new SMessage(td3);

  control.addCommand(function() {
                       var threshold = parseFloat(control.input.value);
                       similar_message.show(threshold);
                       control.label.style.display = 'inline';
                     });

  var requestCount = 0, responseCount = 0;
  function checkMylist(mylist_name, mylist_id, option) {
    if(!/^\d+$/.test(mylist_id))
      return;
    requestCount++;
    control.setButtonText(responseCount, requestCount);
    var errorMessageItem = null;
    setTimeout(
      function() {
        var completed = false;
        function completeHandler(response) {
          if(completed)
            return;
          if(response == null) {
            errorMessageItem = new EMessageItem(mylist_id, 'タイムアウトしました');
            error_message.add(errorMessageItem);
          }
          completed = true;
          responseCount++;
          control.setButtonText(responseCount, requestCount);
          if(requestCount == responseCount)
            control.enableButtons();
        }
        GM_xmlhttpRequest(
          {
            method: 'GET',
            url: 'http://www.nicovideo.jp/mylist/' + mylist_id +
              '?rss=atom&nomemo=1&nothumbnail=1&nodescription=1&noinfo=1',
            headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey; nicovideo Show Registrated Comment' },
            onload: function(response) {
              if(response.responseText.indexOf('watch/'+video_id+'"') != -1)
                registered_message.add(mylist_id, mylist_name, option);

              var movieArray = [];
              var reg = /<title>(.+?)<\/title>[^<]+<link (?:\s|.)+?\/watch\/(.+?)\"/mg;
              var result, dist;
              while((result = reg.exec(response.responseText)) != null) {
                if(video_id == result[2])
                  continue;
                movieArray.push({ id: result[2], name: result[1] });
              }
              similar_message.add(
                {id: mylist_id, name: mylist_name, movies: movieArray,
                 closed: false, element: option});
              completeHandler(response);
            },
            onerror: completeHandler
          }
        );
        setTimeout(function() { completeHandler(null); }, TIMEOUT);
      },
      requestCount * LOAD_INTERVAL
    );
  }
  Array.forEach(option, function(opt) { checkMylist(opt.textContent, opt.value, opt); });
  check_lists.forEach(function(list) { checkMylist(list.title, list.id, null); });
}
