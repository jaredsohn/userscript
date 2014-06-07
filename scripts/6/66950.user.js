// ==UserScript==
// @name           pubmedplus
// @namespace      http://www.pubmedplus.com/
// @description    more data in pubmed
// @version        1.1.0
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez*
// @include        http://www.ncbi.nlm.nih.gov/pubmed*
// @author         Harvey, Chrisyue
// @copyright      2009+, Harvey
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// ==/UserScript==

function $(id)
{
  return document.getElementById(id);
}

function c(n, p)
{
  return (p || document).getElementsByClassName(n);
}

function t(n, p)
{
  return (p || document).getElementsByTagName(n);
}

function create(e)
{
  return document.createElement(e);
}

function append(e, t)
{
  t.appendChild(e);
}

function after(e1, e2)
{
  e2.parentNode.insertBefore(e1, e2.nextSibling);
}

var pubmed = {
  getResults: function() {
    return c("rslt");
  },

  getContainer: function(rs) {
    var className = "pubmedplus-data";
    var div = c(className, rs)[0];
    if (!div) {
      div = create("div");
      div.className = className;
      div.innerHTML = "Pubmedplus: ";
      append(div, rs);
    }

    return div;
  },

  getPmId: function(rs) {
    try {
      return /\d+/.exec(c("rprtid", rs)[0].innerHTML)[0];
    } catch (e) {
      try {
        return /\d+/.exec(c("pmid", rs)[0].innerHTML)[0];
      } catch (e) {
        return null;
      }
    }
  },

  getJournal: function(rs) {
    try {
      return c("jrnl", rs)[0].innerHTML;
    } catch (e) {
      return t("a", c("citation", rs)[0])[0].innerHTML.replace(/\.$/, '');
    }
  },

  getLink: function(rs) {
    return t("a", c("title", rs)[0])[0];
  },

  getTitle: function(rs) {
    try {
      return this.getLink(rs).innerHTML;
    } catch (e) {
      return c("title")[0].innerHTML;
    }
  },

  cleanUrl: [],
  getUrl: function(rs) {
    var url = this.getLink(rs).href;

    if (!this.cleanUrl[url]) {
      this.cleanUrl[url] = true;
      url = /http:\/\/www\.ncbi\.nlm\.nih\.gov\/pubmed\/\d+/.exec(url)[0];
      this.getLink(rs).href = url;
    }

    return url;
  },

  getContent: function() {
    return c("rprt", $("maincontent"))[0];
  }
};

var disqus = {
  user_api_key: 
    "5BLEIzXnpFZgLVrhgivafXkKC5IzNAGWQI0RFXEVjek0nPM3R4pcHkrSAqk3LDP7",

  forum_id: "135473",

  forum_api_key:
    "Hx6FDjDOdUmN0TmdIn1eD3ItgDMpQi8xYyS8iRdzBoq96R0t0e0WNA5YKbBUbWrc"
};

var modules = {
  citedByAndPdf: {
    inList   : true,
    inContent: true,

    handle: function(rs) {
      var url = 'http://scholar.google.com/scholar?as_q=&as_epq='
              + encodeURIComponent('"' + pubmed.getTitle(rs) + '"')
              + '&as_occt=title&as_allsubj=all';
      GM_xmlhttpRequest({
        method: "GET",
        url   : url,
        onload: function(response) {
          var container = pubmed.getContainer(rs);
          var reg = /<a[^<]+>Cited by \d+<\/a>/;
          var html = reg.exec(response.responseText);
          if (html && html.length) {
            container.innerHTML += html[0].replace(
              /\bby (\d+)/, "by ($1)") + " ";
            // get <a />
            var a = t("a", container)[0];
            if (/^\//.test(a.getAttribute("href"))) {
              a.href = "http://scholar.google.com"
                     + a.getAttribute("href");
            }
          } else {
            container.innerHTML += "Cited by (0)";
          }

          reg = /<a href="([^<]+)" class=yC1>[^<]+<\/a> <font size=-2 class=f>\[PDF\]<\/font>/;
          html = reg.exec(response.responseText);
          if (html && html.length) {
            container.innerHTML += '<a class="pubmedplus-green" href="' 
              + html[1] + '">Free PDF</a> ';
          }
        }
      });
    }
  },

  f1000bio: {
    inList   : true,
    inContent: true,

    handle: function(rs) {
      var url = 'http://f1000biology.com/search/results.asp?txtSearch1=' 
              + pubmed.getPmId(rs) 
              + '&drpField1=&drpPhrase1=and&drpField2=[TI]' 
              + '&txtSearch2=&drpPhrase2=and&drpField3=[USR]'
              + '&txtSearch3=&drpPhrase3=and&drpField4=[TA]'
              + '&txtSearch4=&drpPhrase4=exact&drpFromDate='
              + '&drpToDate=&drpArticleType=&drpF1000Rated=1'
              + '&drpAddedInLast=&drpClassification=&drpPicked=1'
              + '&drpListBy=newest&drpPerPage=20&strTempString='
              + '&strSearchBoxType=f1000_advanced_results&Search.x=10';
      GM_xmlhttpRequest({
        method: "GET",
        url   : url,
        onload: function(response) {
          var reg = /<b>\d\.\d<\/b>/;
          var html = reg.exec(response.responseText);
          if (html && html.length) {
            pubmed.getContainer(rs).innerHTML += '<a href="' 
              + url + '">F1000bio=' + html[0] + "</a> ";  
          }
        }
      });
    }
  },

  f1000med: {
    inList   : true,
    inContent: true,

    handle: function(rs) {
      var url = 'http://f1000medicine.com/search/results.asp?txtSearch1=' 
              + pubmed.getPmId(rs) 
              + '&drpField1=&drpPhrase1=and&drpField2=[TI]' 
              + '&txtSearch2=&drpPhrase2=and&drpField3=[USR]'
              + '&txtSearch3=&drpPhrase3=and&drpField4=[TA]'
              + '&txtSearch4=&drpPhrase4=exact&drpFromDate='
              + '&drpToDate=&drpArticleType=&drpF1000Rated=1'
              + '&drpAddedInLast=&drpClassification=&drpPicked=1'
              + '&drpListBy=newest&drpPerPage=20&strTempString='
              + '&strSearchBoxType=f1000_advanced_results&Search.x=10';
      GM_xmlhttpRequest({
        method: "GET",
        url   : url,
        onload: function(response) {
          var reg = /<b>\d\.\d<\/b>/;
          var html = reg.exec(response.responseText);
          if (html && html.length) {
            pubmed.getContainer(rs).innerHTML += '<a href="' 
              + url + '">F1000med=' + html[0] + "</a> ";  
          }
        }
      });
    }
  },

  impactFactor: {
    inList   : true,
    inContent: true,

    handle: function(rs) {
      var v = app.ifData[pubmed.getJournal(rs).toUpperCase()];
      v = v || 0;
      if (v) {
        pubmed.getContainer(rs).innerHTML += '<a href="http://www.pubmedplus.com/' 
          + pubmed.getJournal(rs).replace(/[^0-9a-zA-Z]/g, '-') 
          + '.html" target="_blank"><span>IF=<b>'
          + v + "</b></span></a>";
      } else {
        pubmed.getContainer(rs).innerHTML += '<span>IF=<b>' + v + '</b></span></a>';
      }
    }
  },

  comments: {
    inList: true,

    handle: function(rs) {
      var url = 'http://disqus.com/api/get_thread_by_url?url='
        + encodeURIComponent(
          "http://www.pubmedplus.com/disqus.php?pmid=" 
            + pubmed.getPmId(rs)
            + "&title="
            + pubmed.getTitle(rs)
              .replace(/^\W+|\W+$/, '')
              .replace(/\W+/g, '-'))
        + '&forum_api_key=' + disqus.forum_api_key
        + '&api_version=1.1';

      GM_xmlhttpRequest({
        method: "GET",
        url   : url,
        onload: function(response) {
          data = eval("(" + response.responseText + ")");
          var numComments = 0;
          data.message && (numComments = data.message.num_comments);
          pubmed.getContainer(rs).innerHTML += '<a href="' 
            + pubmed.getUrl(rs) + '">Comments (<b>'
            + numComments + '</b>)</a> ';
        }
      });
    }
  },

  disqus: {
    inContent: true,

    handle: function(content) {
      var iframe = create("iframe");
      iframe.width  = "100%";
      iframe.height = "500";
      iframe.src = "http://www.pubmedplus.com/disqus.php?pmid=" 
        + pubmed.getPmId(content)
        + "&title="
        + pubmed.getTitle(content)
          .replace(/^\W+|\W+$/, '')
          .replace(/\W+/g, '-');

      iframe.style.border = "1px solid #ABF";
      after(iframe, content);
      //var div = create("div");
      //div.id = "disqus_thread";
      //append(div, content);
      //var script = create("script");
      //script.src = "http://disqus.com/forums/pubmedplus/embed.js";
      //append(script, document.body);
      //GM_xmlhttpRequest({
      //  method: "GET",
      //  url   : "http://disqus.com/forums/pubmedplus/embed.js",
      //  onload: function(response) {
      //    var script = create("script");
      //    script.type = "text/javascript";
      //    script.innerHTML = response.responseText;
      //    append(script, document.body);
      //  }
      //});
    }
  },

  pdfInDxy: {
    inList: true,
    inContent: true,

    handle: function(rs) {
      var url = 'http://paper.pubmed.cn/wx.php?ac=appeal&pmid='
              + pubmed.getPmId(rs);
      pubmed.getContainer(rs).innerHTML += '<a href="' 
        + url + '" target="_blank">PDF in dxy</a> ';  
    }
  }
};

var app = {
  ifData: null,

  run: function() {
    var style = ".pubmedplus-data {"
              + "  background: #ccf;"
              + "  border: 1px solid #aad;"
              + "  padding: 2px 6px;"
              + "  -moz-border-radius: 4px;"
              + "  -webkit-border-radius: 4px;"
              + "  display: block;"
              + "}"
              + ".pubmedplus-data > a ,"
              + ".pubmedplus-data > span {"
              + "  margin: 0 3px"
              + "}"
              + "a.pubmedplus-green {"
              + "  color: green;"
              + "}";
    GM_addStyle(style);
    if (pubmed.getResults().length > 0) {
      this.runInList()
    } else if (pubmed.getPmId()) {
      this.runInContent();
    }
  },

  runInList: function() {
    var rs = pubmed.getResults();
    for (var i = 0; i < rs.length; i++) {
      for (j in modules) {
        modules[j].inList && modules[j].handle && modules[j].handle(rs[i]);
      }
    }
  },

  runInContent: function() {
    for (i in modules) {
      modules[i].inContent && modules[i].handle && modules[i].handle(pubmed.getContent());
    }
  }
};

// load Journalif.json && run app
GM_xmlhttpRequest({
  method: "GET",
  url   : "http://www.pubmedplus.com/Journalif.json",
  onload: function(response) {
    app.ifData = eval("(" + response.responseText + ")");
    app.run();
  }
});

