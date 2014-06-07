// ==UserScript==
// @name           Mizuho Auto Pass
// @description    みずほ銀行の第2暗証番号をブラウザに保存し自動補完します。
// @namespace      http://d.hatena.ne.jp/bannyan/
// @include        https://web*.ib.mizuhobank.co.jp/servlet/mib*

// ==/UserScript==

var getPasscodeOrder = function() {
  var getNumber = function(string) {
    return string.match(/^(\d)番目$/);
  }
  var order = [];
  $x(".//font[@color='#F00000']", document, true).forEach(function(element) {
    var matched;
    if (matched = getNumber(element.textContent)) {
      order.push(matched[1]);
    }
  })
  return (order.length === 4) ? order : [];
}

function setPassword(order) {
  if (!order.length) return;

  var password;
  var key = "jEF&%C0XMM*ZwQzHTvt17zvKLfcB!kKD";
  var cryptedPassword = GM_getValue('password');
  if (cryptedPassword) {
    password = decryptPassword(cryptedPassword, key);
  } else {
    var message = [
      'UserScript - Mizuho Auto Pass',
      '',
      '第2暗証番号を入力してください。',
      '',
      '入力した第2暗証番号はごく簡単な暗号化がなされ prefs.js に保存されます。',
      'よって prefs.js を入手し、この UserScript を読むことができれば第2暗証番号を知ることが可能です。',
      'ご利用には十分ご注意ください。',
      'なお保存された第2暗証番号の削除は about:config から行ってください。',
    ].join('\n');
    if (!(password = prompt(message))) return;
    GM_setValue('password', cryptPassword(password, key));
  }
  var targetInputNames = ['Anshu2', 'Anshu2_2', 'Anshu2_3', 'Anshu2_4'];
  targetInputNames.map(function(input) {
    return document.getElementsByName(input)[0];
  }).forEach(function(input, i) {
    update(input, {
      'value': password.charAt(order[i] - 1)
    });
  });
  function cryptPassword(password, key) {
    return uneval(password.split('').map(function(c, i)
      c.charCodeAt(0) ^ key.charCodeAt(i % key.length)));
  }

  function decryptPassword(cryptedPassword, key) {
    return String.fromCharCode.apply(null, eval(cryptedPassword)
      .map(function(c, i) c ^ key.charCodeAt(i % key.length)));
  }
}

var order = getPasscodeOrder();
setPassword(order);

// ----[Utility]-----------------------------------------------------------------------------
// update, $x copied from id: brasil http://userscripts.org/users/brasil

function update(obj, params) {
  if(obj.setAttribute){
    for(var key in params)
      obj.setAttribute(key, params[key]);
  } else {
    for(var key in params)
      obj[key] = params[key];
  }
  return obj;
}

function $x(exp, ctx, multi) {
  ctx = ctx || document;
  var res = (ctx.ownerDocument || ctx).evaluate(exp, ctx, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i.nodeType==1? i : i.textContent));
  return multi? nodes : nodes[0];
}