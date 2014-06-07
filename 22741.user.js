// ==UserScript==
// @name          Hatena::Idea Append Form in User Page
// @namespace     http://d.hatena.ne.jp/Yuichirou/
// @description   Make a form to append an idea in your user page in Hatena::Idea
// @include       http://i.hatena.ne.jp/*/
// ==/UserScript==

// Version 1.1 (Released at 2007-02-13)

var services = [
  [12, /* General      */"\u306F\u3066\u306A\u5168\u822C"],
  [25, /* Mobile       */"\u30DD\u30B1\u30C3\u30C8\u306F\u3066\u306A"],

  [3,  /* Antenna      */"\u306F\u3066\u306A\u30A2\u30F3\u30C6\u30CA"],
  [9,  /* Bookmark     */"\u306F\u3066\u306A\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF"],
  [4,  /* Diary        */"\u306F\u3066\u306A\u30C0\u30A4\u30A2\u30EA\u30FC"],
  [8,  /* Fotolife     */"\u306F\u3066\u306A\u30D5\u30A9\u30C8\u30E9\u30A4\u30D5"],
  [6,  /* Group        */"\u306F\u3066\u306A\u30B0\u30EB\u30FC\u30D7"],
  [26, /* Haiku        */"\u306F\u3066\u306A\u30CF\u30A4\u30AF"],
  [10, /* Idea         */"\u306F\u3066\u306A\u30A2\u30A4\u30C7\u30A2"],
  [2,  /* Question     */"\u4EBA\u529B\u691C\u7D22\u306F\u3066\u306A"],
  [24, /* Message      */"\u306F\u3066\u306A\u30E1\u30C3\u30BB\u30FC\u30B8"],
  [15, /* RSS          */"\u306F\u3066\u306ARSS"],
  [23, /* Star         */"\u306F\u3066\u306A\u30B9\u30BF\u30FC"],
  [27, /* World        */"\u306F\u3066\u306A\u30EF\u30FC\u30EB\u30C9"],

  [5,  /* Counter      */"\u306F\u3066\u306A\u30AB\u30A6\u30F3\u30BF\u30FC"],
  [18, /* Graph        */"\u306F\u3066\u306A\u30B0\u30E9\u30D5"],
  [17, /* Map          */"\u306F\u3066\u306A\u30DE\u30C3\u30D7"],
  [19, /* Ring         */"\u306F\u3066\u306A\u30EA\u30F3\u30B0"],
  [7,  /* Search       */"\u306F\u3066\u306A\u691C\u7D22"],
  [21, /* Screenshot   */"\u306F\u3066\u306A\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8"],

  [20, /* Hatelabo     */"\u306F\u3066\u30E9\u30DC"],
  [14, /* New Service  */"\u65B0\u30B5\u30FC\u30D3\u30B9"],

  [11, /* Toolbar      */"\u306F\u3066\u306A\u30C4\u30FC\u30EB\u30D0\u30FC"],
  [16, /* Greasemonkey */"\u306F\u3066\u306A\u30B0\u30EA\u30FC\u30B9\u30E2\u30F3\u30AD\u30FC"],
  [13, /* Web Service  */"\u306F\u3066\u306A\u30A6\u30A7\u30D6\u30B5\u30FC\u30D3\u30B9\uFF08\u958B\u767A\u8005\uFF09"],

  [22, /* Other        */"\u306F\u3066\u306A\u4EE5\u5916"],
];

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fun) {
    for (var i = 0, len = this.length; i < len; i++) {
      fun(this[i], i, this);
    }
  };
}

var bannersub = document.getElementById("bannersub");
var username = bannersub.getElementsByTagName("a")[0].innerHTML;

if (location.href == "http://i.hatena.ne.jp/" + username + "/") {
  var edithead = document.createElement("h2");
  edithead.className = "clear h-plain-bl";
  edithead.appendChild(document.createTextNode("\u30A2\u30A4\u30C7\u30A2\u306E\u8FFD\u52A0"));

  var editbody = document.createElement("div");
  editbody.className = "box-curve-line";
  {
    var curveTop = editbody.appendChild(document.createElement("span"));
    curveTop.className = "curve-top";
    curveTop.appendChild(document.createElement("span"));

    var form = editbody.appendChild(document.createElement("form"));
    form.action = "/idealist#edit"; form.method = "POST";
    {
      var mode = form.appendChild(document.createElement("input"));
      mode.type = "hidden"; mode.name = "mode"; mode.value = "confirm";

      var rkm = form.appendChild(document.createElement("input"));
      rkm.type = "hidden"; rkm.name = "rkm";
      rkm.value = document.getElementsByName("rkm")[0].value;

      var thisbet = form.appendChild(document.createElement("span"));
      thisbet.className = "thisbet";
      {
        var select = thisbet.appendChild(document.createElement("select"));
        select.name = "did";
        {
          services.forEach(function (service) {
            var option = select.appendChild(document.createElement("option"));
            option.value = service[0];
            option.appendChild(document.createTextNode(service[1]));
          })
        }

        var strong = thisbet.appendChild(document.createElement("strong"));
        strong.appendChild(document.createTextNode("\u306B\u30A2\u30A4\u30C7\u30A2\u3092\u8FFD\u52A0\u3059\u308B"));
      }

      form.appendChild(document.createElement("br"));

      var label1 = form.appendChild(document.createElement("span"));
      label1.class = "label";
      label1.appendChild(document.createTextNode("\u30A2\u30A4\u30C7\u30A2\uFF08\u203B\u5168\u89D285\u6587\u5B57\u307E\u3067\uFF09:"));

      var content = form.appendChild(document.createElement("textarea"));
      content.name = "content"; content.rows = "2"; content.cols = "60";
      content.id = "comment"; content.onKeyUp = "countBytes()";

      var commentCount = form.appendChild(document.createElement("div"));
      commentCount.id = "comment_count";

      var quantity = form.appendChild(document.createElement("input"));
      quantity.type = "text"; quantity.name = "quantity";
      quantity.size = "8"; quantity.value = "10";

      form.appendChild(document.createTextNode(" "));

      var label2 = form.appendChild(document.createElement("span"));
      label2.class = "label";
      label2.appendChild(document.createTextNode("\u682A\u3092\u30011\u682A\u3042\u305F\u308A\u4FA1\u683C"));

      form.appendChild(document.createTextNode(" "));

      var price = form.appendChild(document.createElement("input"));
      price.type = "text"; price.size = "5"; price.value = "1.00";
      price.disabled = "disabled";

      form.appendChild(document.createTextNode(" "));

      var label3 = form.appendChild(document.createElement("span"));
      label3.class = "label";
      label3.appendChild(document.createTextNode("\u30A2\u30A4\u30C7\u30A2\u30DD\u30A4\u30F3\u30C8\u3067\u8CFC\u5165\u3059\u308B"));

      form.appendChild(document.createTextNode(" "));

      var submit = form.appendChild(document.createElement("input"));
      submit.type = "submit"; submit.value = "\u9001\u4FE1";

      form.appendChild(document.createElement("br"));

      var note = form.appendChild(document.createElement("span"));
      note.class = "note";
      {
        var link = note.appendChild(document.createElement("a"));
        link.href = "/help#beta";
        link.appendChild(document.createTextNode("\u203B\u30A2\u30A4\u30C7\u30A2\u30DD\u30A4\u30F3\u30C8\u306B\u3064\u3044\u3066"));
      }
    }

    var curveBottom = editbody.appendChild(document.createElement("span"));
    curveBottom.className = "curve-bottom";
    curveBottom.appendChild(document.createElement("span"));
  }

  var headings = document.getElementsByTagName("h2");
  var lastHeadings = headings[headings.length - 1];
  lastHeadings.parentNode.insertBefore(edithead, lastHeadings);
  lastHeadings.parentNode.insertBefore(editbody, lastHeadings);

  var head = document.getElementsByTagName("head")[0];
  var script = head.appendChild(document.createElement("script"));
  script.type = "text/javascript"; script.src = "/js/comment_counter.js";

  (unsafeWindow || window).maxCommentLength = 85;
}
