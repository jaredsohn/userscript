// ==UserScript==
// @name          POOKMARK Airlines & del.icio.us cross post
// @namespace     http://purpr.in/blog/
// @include       http://pookmark.jp/post*
// ==/UserScript==
(function () {
  var b = document.getElementById("submit_button");
  var bm = b.cloneNode(false);

  bm.value = "with post to del.icio.us";

  b.parentNode.insertBefore(bm, b.nextSibling);
  b.parentNode.insertBefore(document.createTextNode(' '), b.nextSibling);

  bm.addEventListener(
    'click', 
    function(event) {
      var account = loadDeliciousAccount();

      var query = $S({
        url: document.getElementsByName('url')[0].value,
        description: document.getElementsByName('title')[0].value,
        extended: document.getElementById('comment').value,
        tags: document.getElementById('tags').value,
        jump: "doclose",
        v: 4
      });
      
      GM_xmlhttpRequest({
          method: 'GET',
          url: createDeliciousApiUri(account, query),
          headers: {
            'User-agent': 'Greasemonkey Script',
            'Accept': 'application/xml,text/xml',
          },
          onload: function(res) {
            var result = res.responseText.match(/code=\"(.+)\"/);
            
            if (!result || result[1] != 'done') {
              deleteDeliciousAccount();
            }
          } 
      });
    },
    false
  );

  function createDeliciousApiUri(account, query) {
    return 'https://' + account.id + ':' + account.password + '@api.del.icio.us/v1/posts/add?' + query;
  }

  function loadDeliciousAccount() {
    var account = eval("(" + GM_getValue("delicious_account") + ")") || {};

    if (!account || !account.id || !account.password) {
      account = {
        id: null,
        password: null
      };

      account.id = window.prompt('del.icio.us user id :', null);
      account.password = window.prompt('del.icio.us password :', null);
      
      GM_setValue('delicious_account', account.toSource());
    }

    return account;
  }

  function deleteDeliciousAccount() {
    GM_setValue('delicious_account', {}.toSource());
  }

  function $S(params) {
    var query = [];
    for (var key in params) {
      query.push(key + "=" + encodeURIComponent(params[key]));
    }
    return query.join("&");
  }
})();
