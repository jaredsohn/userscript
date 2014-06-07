// ==UserScript==
// @name          Ain't It Cool News Talkback Summaries
// @namespace     http://blairmitchelmore.com/greasemonkey/aintitcool
// @description   Puts comment summaries on talkback pages
// @include       http://aintitcool.com/talkback_display/*
// @include       http://www.aintitcool.com/talkback_display/*
// @include       http://aintitcool.com/?q=talkback_display/*
// @include       http://www.aintitcool.com/?q=talkback_display/*
// @include       http://aintitcool.com/node/*
// @include       http://www.aintitcool.com/node/*
// @include       http://aintitcool.com/?q=node/*
// @include       http://www.aintitcool.com/?q=node/*
// @description   Version 1.0.3
// ==/UserScript==

var headerImg = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAgAAZABkAAD%2F7AARRHVja3kAAQAEAAAAPAAA%2F%2B4ADkFkb2JlAGTAAAAAAf%2FbAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f%2F8AAEQgAHgEsAwERAAIRAQMRAf%2FEAKAAAAEFAQEBAAAAAAAAAAAAAAACBAUGBwMBCAEAAgMBAQEAAAAAAAAAAAAAAAMBAgQFBgcQAAEDAwIEAwcCBAUFAQAAAAIBAwQRBQYAEiETFAcxIhVBUWEyQhYIIyRxgZEzobHBUrLRYnJTJRcRAAICAQIEAwYFBAMBAAAAAAABEQIDEgQhMRMFQVEiYXGBQiMU8KEyQySRsdFSweHxFf%2FaAAwDAQACEQMRAD8ArNwuEe3xDlSFVGgpXalVVVWiIiJr5%2FhxWyWVa8z0l7qqlj%2BHjfcueaBCwm6qqrRFlAENPdxWQTaJrq07JkfNpf1Mb39fIinHMnZyN3EnbG793g62yFnacbeVVdZF9CJ1sibQRbNCMt1B9q6Ldmurqs8PMlb6umYJ7KcD7lYdaG77kcSA5aCMG5JW95x12LzSQAV9HG2xUVMkGoKXHT8%2FZVWk1bkXj38uGiOsdtzTJzkJimPP3ViK4rL01XWY8dHBRFIEceIEIkQk4Jx1m2%2FaL5KqzcDcu9rVxB7d7Xl2NzokHLLR6U7PFwoLovsvtucnbzE3NEW1R3p46pvO12w11JyicG7V3Ai3QsvvVum3awY%2FIuNlt4uHIuKG2y2SNIquchHSEn1Hav8AbRePDx1fD2e9q6m4IvvqpwuIiFLZmRGpTK1aeFDBfguuXkxulnV80a62VlKFRWL5d7y1YccgFc7w6KuE0ioDTLQ0RXX3F8oBVacfFeCcaa27Lt9s%2FHlURuNysfvJDKcPzvCnIJZSxCOFcXOQxPtzrjjQP7VIWXUdBokIhFVRUSnDx1r3vaenXVVzAjBvdThog2515dtHrzdklJjnNFn1h3Y0wRG9yE5W9UJ39TguxFpx9y6V%2FwDIyKmptcpL%2Fe11RArrLw9FuM%2B32aTMtVqIguFyRW2o7ZNihmG9whQjQSTyD5l9iarh7Ve9FeUkycm8rW2mB1IkNR45yHV2tNipmvuRErrm0o7OFzNbtCli7dbM7uzLT9pw%2B6yoz4C7HkG107TjZpuAxN5QFRJFqi661Oy5HzaRie%2FqvAb3FjM7VkjGMXPG5LeQzGElwbZHdZlOOMqTgqVWCMEpyDVarq9%2ByXUQyK7%2Br8Dpktsz7FrfGu2SY8tqtMp8YrbjkmO46rhtm4icpozJPK0SrWmpv2V1rOriRXfpuIGpS76zAt11mWGXCst2cbZt9wkbGxdJ5tXW1BtV5hCQCpISJTSMvab0o7NrgMpva2slB3iFfLncZMCw2WVd3oQgU1xnY2wwjiKo8151QbCqAq%2BZfZqm17ZfLXVMItm3daOIGaXW7tWGJkk6xzYeNzlUYt2MNzSklE823iCEq0AiohfTXTcnZslVKabKV31W%2BPAnLLindDIIjc2yYm%2BUB4RcZlzHmIgG2abgMBdMTISHiiomm4%2ByWa4spbfpckRV2mXGwS5tvyS3uWy6QBbN6KpA9uF1Ktk2bakJoXwXx4ay5%2B2XpdVXGR2Pd1tVvyJKTi3dNqzzLyeIvQ7ZAYdlSn50iOwQtMArhlyiPm%2FKK%2FTrXTsdo42%2FIRbuC8ERtrlXW%2BS41sx%2B2PXW8Smke6NpRFGm1p53nDUQbHj4kqayYO2XyWa8E%2BY%2FJu61XtOmTjkuGugxmNoO1uvtk7DNtwJDT6AqIQg42pJvGqVFePFPemnZuz3q1pcyLx76rXEUcPOhudutS4nPbuV3F07bDdVpt0xY2803AIkJkB3p5nNqe7V12S%2F%2ByIe%2Fr5CYc03yeYkRnoU6KfKlwpIE2805Su0xJEXXN3O1thtFjVizK6lDrWYaGgA0AGgA0AGgA0AGgA0AGgA0AGgCOv8AbzuFpfjAaA4qIQGXFEIV3JX%2BmtG0zdPIrCs1NVWjaJHeTLi7AOZ2%2BMOFf50nprS2w2StJ%2B86aqi6bm4tjbh%2B6ns17Z5PRJwVX1QQ%2FaW4N4%2FgmS97cvc9Rvt7M0adoIGbEc0ix47SCP6avPtoPDhtQPdorb06mQ1xgS93Vu2a9hu4MvJocWJKgKUJoIiGjf64NchC5hOKrguucVRUReHBNVplV6SuRLo6uCR7O2rJYf4%2BwZFguUSy3C5y358%2B7zhQm4sVJBA68gkigZ8hgaIdB48VSldWoorwIs5fErV2ltd8u7Nrs0N9z7Px%2BM669Opy3Zbak2MhwERAUUkGLbQe4dxJ7tKbWS0eC%2FH4%2BBeHVT5lty%2FNe7FhtWRW2w9uW2sVtLRRbbP6pkRCIyBC4%2F0oEjjgqCIQCFFFPmr4ae5hi1zMTsSMQsbi0cRxlljdzfBFRE3KuvE7qb5nw4tnfxRXGvca5iVwjdp%2ByzWWPxxm5Zlrjchhk1pzXpaKcRlVFKi0xH85D79yIvFNewoq4cfkkjiWbvYie4PcWblv44Rr7emI8e7v3cIwjFQhZ5sWQZbm0cJwkqy0Vakvt0ZbK%2BP3%2FwCAotNjRbBgEK5%2Fj%2Fa8TNttX5lkBxpHERdkuQzzVcSqKo7XnvmTwrpyXp4C2%2BJnuYRrji345Y9jEtEavF%2Bki3JGnmRZDrks925K7gTbXSc1ljxN%2BCQzGne%2FvKJPiJLgvxa7UebIK%2B6qU14nFfTZW8md%2B9ZTRq%2FbHubkbXZPI7tcgiMhh0YrVaDZE%2F1XYUMEbJ3eZoSm4bacERPHXuMOXVRW9h569ItBW%2ByF3vl9zTKO5uZSxmrjdnGIjoti2LaEhSXBaEUQU5bYFX%2Fz1XBl111MnJTS4Ov5Xy7kWE4VAkJSdLMnHmeKEsgIwtrQaD4E%2BqfL%2FTVsnJT%2BORFebDvyLMO%2F4NhzC1jWC2nJUvDclBisLt9lOnP%2Buuf3a%2BnDHwNOyrN5LL%2BMNtiPY3lN1kAJjdbscQxcRFE2I7IAIqi8FRTeNKa1bCmnCl7Px%2FcVubTdmX%2FkXkWRXTJL1i0oxiWXHumas9ni%2BVp0pDQE0%2B7RE3EiHtEabQ8E41Va7jNZZK0XJ%2F8ABOPGnRs%2Bk7rAye1DjzFkkcrH7Mw4V5bbZSRKlNRWQCPFYAty1dXcqki14Urx1taaiBHM%2Baba9c%2B5XfuIV0hnBeduYuzbTIEkKNCtA7xZeRU%2BZwgRC9m4vdrGk7ZuPJL%2B%2FwD0PlKhtvdrI3Huz2fzgLbGFx%2B3RyXy1EDagvpVEGv66Oj4r%2FprW24fvEpFPxO4Re0XZGBkARm5uX5crLsZo%2FrckN744GqUPkx2PMSJ9VUqm6ulTXFSS0O9oM7yC7Zf3AzTE2MuksuC%2FcocJi3wxJuMDZugsl3aRGSuGA8VVfglE1z9vv8Ar5IS9KNOTbdOsvmfRvejIbpi2C3TJsfYjLe4wsxVnOgJmwy%2B%2BAKSJRd%2BxXEJAJdv1LWlF6uRwpRjqpcHzdCjE0jjzzzkqZJNXpkx4lN150%2BJGZLxVV14bc7i2W%2Bqx6HFiVFCHOkDA0AGgA0AGgA0AGgA0AGgA0AGgA0AMr1J6a0TH%2F8A1smv%2BGnbamrJVe0XltFWyz9x5VpZ7Q9usJgTGH7iHIm3OI06DjzJjEMj5oCSkCK9JXxT2a9dvMqribOLgo3cteNYgncv8dbFYLTcG7bc7M%2BKPCY7wGVDccEm3xHzIjguI5%2FMV1oVVkp7BcutjMO5E612TDT7e45P9ViW2Q7dctvgJtblXEkQW2G0QiHa1QdyIq8RHjVC1myZK00414jKVdps%2FAtfdaTBHHO3vb%2BFcm32bdBX7jt8Z5FTmxWY4NDKAF8VdVwtpe1K6p3HO8eGU%2BJba49V4fIhcFg5fI7k2624Xcysc2TEeG4zxYakttQWqEpGy6hAX6uwR8OJeOsXZbXasaN%2BkoL%2FAJ5llzwrFLph8vK3cyzjIBNlVNllhuBHeBQN0mmd3K8hKoiRruKlERK66%2B4z1xVbbMWLG7tJGTP2%2FkY67AZTcoRiaD4rsVP89eOrl1Zld%2F7Sdx0imleRtOVYIPdTtxhV3sN6ZtDdrjC4ROhzGAA2QafEkRR2uR1aVOK08UWnjr2d8SvSHyOFW7q%2BBjPcGbb7zEseFYk8T%2BJ46YW%2BJOLh19xnPIEiUPGijucLYvhUip5VTWXLnWuuNcxtMb0uzNXzHutEs%2FeqzpaLnEexiDbWI13Vp3mMNdRNVo0JWSURNltBOheCezjw1vLWt0p%2FVyEqjdW%2FIiu%2FmW45kmTYpDss9u4emFNfmcgtwBvabRolVP8AdXyr4LxovjrB3fIlha8%2F8mjZUnIiluGjbZuL4AKkv8krryVVLg7bcEjNvlls%2FwCLDduWax6zkU3q5EHmgsjlFP5u%2Flbt%2B3kRwRVp7de4SSx6Ueebm0mh4KzieFdlrVa8sbORIzV8Fl2pgv133LwSNtN7ENo0FGBAT4%2Bxf4aZjSrVIrZtuRh31n47kfczthaolwhzki3R566stPtucpho4zx85BJVASbZP5qeC6tZpkIad%2FZPZC5Q7vfPWGLpmyQUjWlqJNcdRogPyIgRi5aKJGRKjnvX4ark0tceJNJI20ZjbsP7O9s4g3BkblKvsOfdYbbgFK6KTIekm4bSFvQdhANVT3JoUJe4PE970xsfv3f7D4VsmsTn5b0SHf4kejhNJDl879VURQ3k0ZptXiiDxSlNRkqnZPy%2F8Jq2kaN3MynA8ayuLlF1v8yVeLdGWNa8OgSVUHX1Jzc67Hb%2BokNB3OUFEH6lomr5L1rxb5Fa1b4IpH4%2FyQOdnPd%2FKXW4izHnYzZbkQABtOpktt7uJoKC0AcarsXVcdk1qJuvAle7mSYTN%2FHmdGsr7cA762xPt1olPAk5xZlwbmOHyicccInFcJxaKvBa%2BGrWskiEm2NbpZMZ7o9rsQuDOVx8clYxGFq4E%2FyzRg%2BSDMgHQNxlQIVZ3NkvinwWqLvSmSqT5Fq2tV8DPe0hWcO88FRuSyMWsjtynQbrcCFrfFRpY7LrhOI2ied4aKqJ%2FBNZtvipXLZ1jwTG5L2dEmaZj%2Bd4tkeF91YV%2BvMaPbTu9xiw57xorPTSWUbiGztUlcXc0RggIqrwVNbZUMR5GSWCS%2FJs0N58FB4mh5glwWqJTXh91RVyWS5Segw2bqmyQ0gYGgA0AGgA0AGgA0AGgA0AGgA0AGgDjL6bpnep29PtXm7%2FAJdvtrq1NWpaeZFojjyIyx%2Fa3m9H6fd9XKpu%2FwCutW56%2FwC5q%2BInF0%2FlgaXAMVKZIVxxwH0T96kbnUUaL%2Fe5SKlKV%2BbWnbvdaPSvT8PykVlWHVx5khH%2B3%2FRT5PJ9K2LzKf29vtrrHfrdTjPUHrRp4fpE2L7b5Zejcjb9XKpX%2Bft1O560%2FUn4kYun8kHO%2BjYCejpcCIZVV6ZWuZzvjt5SKWmbN5%2BPT%2FH9Sufp%2FOLx9MeRo0tCgXFecqV5m6vHfu81f46pu%2BtP1JLYdEegltZBxVpAYapyCJw0Y3%2Fuxa53Tb6p%2Fc2Jy6%2BHjrsY3vNHBcPhJhssE8SXl%2Fb%2FAKP%2B55PpVEpX%2B3T2eGsFOr1PTOv8zTbRp4%2FpEQvtr057pOn6Hll1G2m3l0Xdv%2BFPfqcnW1rVq1Tw95FOnpcRAq0egVL0zlbvq5fzU%2BNeOo3HW%2FcknHo%2BUky27V3fLTzV8KazIaysimBKzLRtYqDtLqVDxp9Xx%2Fprp%2Fy5rOr2GT6MPkMmR7ZoySbo6p9au79%2F89ybtOs97PzFF9vHgPF%2F%2FPuhSvR9LuSnh83%2FAC0n%2BXq%2BbUX%2BjHhBKQvtvkfs%2Bm5VF%2BTZ4e346y5OtPq1SOr044QRrP2H00jk9LyaLz9vu%2Fz%2FAKa02%2B61KdU%2BApdGHyPT%2BxPSB39N6du4V%2F3%2FAPKuhfddT5tYfR0%2BGkdWL7Tqvo%2FT7%2Fby%2Fm%2Fx46VufuP3NRfF0%2FlgiEHtwkt1XCZJ9TLcjm%2FahV822qbfH3a1zvNKiY%2BAj6E%2B0f2b7H5%2F%2FwAzpefXht%2Bavw3f6aRuPuo9eqBmLoz6YPbh9j%2Bofvel62vHd81fjThqMX3Wj06tJN%2Blq4xJ3u32p%2B29T6elP2vMpSn%2FAG09ml4PuOOjV7S2Tp8NUHBUwr1Rqqxut2pyk%2BHsp9OmfydD%2FVpK%2FS1eElhSlOHhrnmk90AGgA0AGgA0AGgA0AGgA0AGgA0AGgD%2F2Q%3D%3D";

var showCount = parseInt(GM_getValue('showCount')) || 15;
var synonyms = eval("(" + GM_getValue('synonyms') + ")") || {};

var posts = [], postsIndex = [], regex = />by\s((?:.|\n)+?)<\//, result = document.evaluate("//tr[td[@class='talkback' or @class='talkback_aicn']]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var labelPosts = function(start, end) {
  var len = 100;
  
  if (!start && !end)
    start = 0, end = start + len;
  else if (!start)
    start = 0;
  else if (!end)
    end = start + len;
  
  if (end > result.snapshotLength)
    end = result.snapshotLength;
  
  for (var i = start; i < end; ++i) {
    var element = result.snapshotItem(i);
    var inner = element.innerHTML;
    var matches = regex.exec(inner);
    var name = synonyms[matches[1]] || matches[1];
    var index = postsIndex.indexOf(name);
    if (index == -1) {
      postsIndex.push(name);
      posts.push({name: name, count: 1});
    } else posts[index].count++;
  }
  
  if (end >= result.snapshotLength)
    drawStats();
  else
    window.setTimeout(function() {
      labelPosts(end);
    }, 50);
};

var addGlobalStyle = function(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
};

var text = function() {
  return document.createTextNode(Array.prototype.join.call(arguments, " "));
};

var id = function() {
  return Array.prototype.map.call(arguments, function(arg) {
    return document.getElementById(arg);
  }).filter(function(arg) { return arg != null })[0] || null;
};

var el = function(tagName, attributes, content) {
  var el = document.createElement(tagName);
  for (var attribute in attributes || {}) {
    el.setAttribute(attribute, attributes[attribute]);
  }
  if (content) {
    if (typeof content == 'string') {
      el.appendChild(text(content));
    } else {
      try {
        el.appendChild(content);
      } catch (e) {}
    }
  }
  return el;
};

var drawStats = function() {
  posts = posts.sort(function(a,b) {
    return b.count - a.count;
  });
  var postCount = result.snapshotLength;

  addGlobalStyle("#Summaries h2 {\
    background-color:#666699;\
    background-image:url(" + headerImg + ");\
    background-repeat:no-repeat;\
    border-bottom:1px solid #000000;\
    border-top:2px solid #000000;\
    height:30px;\
    margin:0px;\
    padding:0px;\
    text-indent:-9999px;\
  }\
  \
  \#Summaries {\
    background-color:#FFFFFF;\
    background-image:url(http://www.aintitcool.com/secretimages/coolcon_background.jpg);\
    background-position:center bottom;\
    background-repeat:repeat-x;\
    border-bottom:2px solid #000000;\
    border-left:2px solid #000000;\
    border-right:2px solid #000000;\
    margin:20px 0pt;\
    padding:0px;\
    width:300px;\
    color:black;\
    font-family:Verdana,Arial;\
    font-size:12px;\
    font-weight:normal;\
    letter-spacing:0.02em;\
    line-height:18px;\
  }\
  \
  #Summaries table {\
    width: 300px;\
  }\
  \
  #Summaries table tr {\
    height: 1em;\
    max-height: 1em;\
    position:relative;\
  }\
  \
  #Summaries table td {\
    display:block;\
    white-space: nowrap;\
  }\
  \
  #Summaries table td:first-child {\
    width: 210px;\
    float:left;\
    overflow-x:hidden;\
    margin-right:5px;\
  }\
  \
  #Summaries table td[colspan] {\
    width: auto;\
    float:none;\
    margin-right:0;\
  }");

  var talkbacks = id("Talkbacks");
  var summary = el("div", {id: "Summaries"});
  talkbacks.parentNode.insertBefore(summary, talkbacks.nextSibling);

  // Add the header
  var headerDiv = el("div", {"class": "title"}, el("h2", null, "Current Talkback Stats"));
  summary.appendChild(headerDiv);

  // Add the content
  var content = el("div", {"class": "content"});
  summary.appendChild(content);

  var tbody = el("tbody");
  var table = el("table", null, tbody);
  table.appendChild(tbody);

  tbody.appendChild(el("tr", null, el("td", {"colspan": 2, "class": "divider"}, el("strong", null, postCount + " Total Posts"))));

  posts.slice(0,showCount).forEach(function(o) {
    var tr = el("tr");
    tr.appendChild(el("td", {"class": "divider"}, o.name));
    tr.appendChild(el("td", {"class": "divider"}, o.count + " Posts"));
    tbody.appendChild(tr);
  });

  content.appendChild(table);
};

labelPosts();