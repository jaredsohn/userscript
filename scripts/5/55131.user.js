// ==UserScript==
// @name           Github show user email addresses
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/55131.user.js
// @description    Tries showing email addresses of github users.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/md5.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://github.com/*
// @include        https://github.com/*
// @include        http://groups.google.com/group/*/manage_members
// ==/UserScript==

var me = '"Github show user email addresses" user script';
var debug = "undefined" != typeof this.gravatar;

XML.setSettings({
  ignoreProcessingInstructions: false,
  ignoreWhitespace: false, // don't collapse our carefully injected whitespace
  ignoreComments: false,
  prettyPrinting: false, prettyIndent: 2
});

switch (location.hostname) {
  case "github.com": // do things in the UI
    var identity = $X('//div[@class="identity"][h1 and img]');
    var gravatar = $X('img[starts-with(@src,"http://www.gravatar.com/avatar")]',
                      identity);
    var mailhash = gravatar && gravatar.src.match(/[0-9a-f]{32}/);
    var usernick = $X('h1', identity);
    var repoinfo = $X('//div[@class="info"][contains(../@class,"vcard")]');

    if (usernick && mailhash) {
      mailhash = mailhash[0];

      var user = mail_from_hash(mailhash, usernick.textContent);
      if (user) {
        maybe_prepend("Email", user.mail);
        if (user.name)
          maybe_prepend("Name", user.name);
      } else if (debug) {
        node({ prepend: identity, tag: <>Email MD5: { mailhash }</> });
        usernick.style.marginTop = "-18px";
      }
    }
    break;

  case "groups.google.com": // build gravatar db
    var form = $X('//form[@name="memberexport"][contains(@action,".csv")]');
    if (form) GM_xmlhttpRequest({
      method: form.method || "GET",
      url:    form.action + '?Action.Export=Export member list',
      onload: got_mail_csv
    });
    break;
}

function mail_from_hash(hash, nick) {
  var data = JSON.parse(GM_getValue(hash, "null"));
  if (data) {
    var info = { mail: data[0] };
    var name = trim(data[1]);
    if (name != trim(nick))
      info.name = name;
    return info;
  }

  var common = [
    "gmail.com",
    "google.com",
    "hotmail.com",
    "yahoo.com"
  ];
  for each (var host in common) {
    var mail = nick +"@"+ host;
    if (MD5.hex(mail) == hash)
      return { mail: mail };
  }

  return null;
}

function got_mail_csv({ responseText: csv }) {
  function maybe_store_address(line) {
    var match = /^([^,@]+@[^,@]+),\x22([^\x22]+)\x22/.exec(line);
    if (match) {
      GM_setValue(MD5.hex(match[1]), JSON.stringify(match.slice(1)));
    }
  }
  csv.split(/[\n\r]+/g).forEach(maybe_store_address);
}

function maybe_prepend(key, value) {
  var tag = key == "Email" ? <a href={ "mailto:"+ value }>{ value }</a> : value;
  var present = $X('div[@class="field"]/div[preceding-sibling::label[.="' +
                   key +':"]]', repoinfo);
  if (present && textContent(present) != value)
    node({ append: present,
           tag: <><br/><i title={"added by "+ me}>{ tag }</i></> });
  if (!present)
    node({ prepend: repoinfo, tag: <div class="field" title={"added by "+ me}
             style="font-style: italic">
             <label>{ key }:</label>
             <div>{ tag }</div>
           </div> });
}

function textContent(node) {
  if (/^script$/i.test(node.nodeName))
    return "";
  if ((node.childNodes || []).length)
    return Array.map(node.childNodes, textContent).join("");
  return trim(node.textContent);
}

function trim(s) {
  return s.replace(/^\s+|\s+$/g, "");
}