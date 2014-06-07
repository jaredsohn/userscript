// ==UserScript==
// @name           What.CD Shopping
// @namespace      http://what.cd
// @include        http://www.amazon.com*
// @include        http://www.amazon.co.uk*
// @include        http://www.amazon.de*
// @include        http://www.cdwow.com*
// @include        http://*.ebay.com/*
// ==/UserScript==

var whaturl = "https://ssl.what.cd"; // without trailing slash

shop();

function shop() {
    var loc = document.location.toString().match(/(amazon|cdwow|ebay)/)[0];
    switch(loc)
    {
        case "amazon":
          var shopping = new Amazon();
          break;
        case "cdwow":
          var shopping = new Cdwow();
          break;
        case "ebay":
          var shopping = new Ebay();
          break;
    }
};

// functions and classes

function getReqUrl(t) {
    return whaturl+"/requests.php?search="+t;
};

function makeLoginLink() {
    var reqlink = document.createElement('a');
    reqlink.href = whaturl+"/login.php";
    reqlink.textContent = "What.CD Login";
    reqlink.target = "what";
    return reqlink;
};

function makeReqlink(t,numreq) {
    var reqlink = document.createElement('a');
    reqlink.href = whaturl+"/requests.php?search="+t;
    if (numreq) reqlink.textContent = "What.CD Requests ("+numreq+")";
    else reqlink.textContent = "What.CD Requests (0)";
    reqlink.target = "what";
    return reqlink;
};

function makeArtistlink(a) {
    var artistlink = document.createElement('a');
    artistlink.href = whaturl+"/artist.php?artistname="+a;
    artistlink.textContent = "What.CD Artist";
    artistlink.target = "what";
    return artistlink;
};

function makeAlbumlink(a,l) {
    var albumlink = document.createElement('a');
    albumlink.href = whaturl+"/torrents.php?artistname="+a+"&groupname="+l;
    albumlink.textContent = "What.CD Album";
    albumlink.target = "what";
    return albumlink;
};

function parseTitles() {
    var parsereg = /[^a-z0-9\+-]+/g;
    if (title) {
        title = title.toLowerCase();
        title = title.replace(/ - /,"+");
        title = title.replace(parsereg,"+");
        title = title.replace(/^\+/,"");
        title = title.replace(/\+$/,"");
    }
    if (artist) {
        artist = artist.toLowerCase();
        title = title.replace(/ - /,"+");
        artist = artist.replace(parsereg,"+");
        artist = artist.replace(/^\+/,"");
        artist = artist.replace(/\+$/,"");
    }
    if (album) {
        album = album.toLowerCase();
        title = title.replace(/ - /,"+");
        album = album.replace(parsereg,"+");
        album = album.replace(/^\+/,"");
        album = album.replace(/\+$/,"");
    }
};

var title, artist, album;

// Amazon | Amazon.com and Amazon.co.uk
function Amazon(xhr) {
    if (document.getElementById("addToCartSpan") && document.title.toString().match(/musi[ck]/i)) {
        title = document.title;
        title = title.replace(/ Musi[ck]$/,"");
        title = title.replace(/Amazon[\w\.]+:/,"");
        title = title.replace(/:$/,"");

        artist = title;
        artist = artist.replace(/.*:/,"");
        album = title.match(/(.*):/)[1];

        parseTitles();

        this.process = function(xhr) {
            if (xhr) {
                var span = document.createElement("span");
                span.appendChild(document.createElement("br"));
                var bold = document.createElement('b');
                bold.textContent = "or";
                span.appendChild(bold);
                span.appendChild(document.createElement("br"));
                if (xhr.responseText.match(/Login :: What.CD/)) {
                    span.appendChild(makeLoginLink());
                }
                else {
                    if (xhr.responseText.match("Nothing found")) {
                        span.appendChild(makeReqlink(title,0));
                    }
                    else if (xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/)) {
                        span.appendChild(makeReqlink(title,xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/).length-1));
                    }
                    span.appendChild(document.createElement("br"));
                    span.appendChild(makeArtistlink(artist));
                    span.appendChild(document.createElement("br"));
                    span.appendChild(makeAlbumlink(artist,album));
                }

                document.getElementById("addToCartSpan").appendChild(span);
                return;
            }
            if (!xhr) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: getReqUrl(title),
                    headers:{
                        "User-Agent":navigator.userAgent,
                        "Accept":"text/xml"
                    },
                    onload: this.process
                });
            }
        };

        this.process();
    }
};

// CD WOW! | http://www.cdwow.com
function Cdwow() {
    if (document.getElementById("prodinfo_smlbox") && document.title.toString().match(/music/i)) {
        title = document.title;
        title = title.replace(/\|.*/,"");
        title = title.replace(/\(.*/,"");
        title = title.replace(/-/,"");

        artist = document.getElementsByClassName("artist")[0].textContent;

        album = document.getElementsByTagName("h1")[0].textContent;
        album = album.replace(/\(.*/,"");

        parseTitles();

        this.process = function(xhr) {
            if (xhr) {
                var span = document.createElement('span');
                if (xhr.responseText.match(/Login :: What.CD/)) {
                    span.appendChild(makeLoginLink());
                }
                else {
                    if (xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/)) {
                        span.appendChild(makeReqlink(title,xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/).length-1));
                        span.innerHTML = span.innerHTML + " | ";
                    }
                    span.appendChild(makeArtistlink(artist));
                    span.innerHTML = span.innerHTML + " | ";
                    span.appendChild(makeAlbumlink(artist,album));
                }

                document.getElementById("prodinfo_smlbox").appendChild(span);
                return;
            }
            if (!xhr) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: getReqUrl(title),
                    headers:{
                        "User-Agent":navigator.userAgent,
                        "Accept":"text/xml"
                    },
                    onload: this.process
                });
            }
        };

        this.process();
    }
};

// Ebay | http://music.shop.ebay.com
function Ebay() {
    if (document.getElementById("FastVIPDetails") && document.getElementsByClassName("navigation")[1].textContent.match(/music/i)) {
        title = document.title;
        title = title.replace(/eBay.*/,"");
        title = title.replace(/[.*?]/,"");

        parseTitles();

        this.process = function(xhr) {
            if (xhr) {
                var tr = document.createElement('tr');

                var label = document.createElement('td');
                label.width = "25%";
                label.valign = "top";
                label.nowrap = "";
                label.align = "left";
                label.className = "titlePurchase";

                var labelspan = document.createElement('span');
                labelspan.textContent = "What.CD:"
                label.appendChild(labelspan);

                var links = document.createElement('td');
                links.colspan = "2";
                links.width = "100%";

                var span = document.createElement('span');
                if (xhr.responseText.match(/Login :: What.CD/)) {
                    span.appendChild(makeLoginLink());
                }
                else {
                    if (xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/)) {
                        span.appendChild(makeReqlink(title,xhr.responseText.match(/(class=\"rowa\"|class=\"rowb\")/).length-1));
                    }
                    else span.appendChild(makeReqlink(title,null));
                }

                links.appendChild(span);
                links.appendChild(document.createElement("br"));
                var searchString = document.createElement("span");
                searchString.innerHTML = "<b>Search String:</b><br />" + title.replace(/\+/g," ");
                links.appendChild(searchString);
                tr.appendChild(label);
                tr.appendChild(links);

                document.getElementById("FastVIPDetails").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].appendChild(tr);
                return;
            }
            if (!xhr) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: getReqUrl(title),
                    headers:{
                        "User-Agent":navigator.userAgent,
                        "Accept":"text/xml"
                    },
                    onload: this.process
                });
            }
        };

        this.process();
    }
};

document.getElementsByClassName = function(className, parentElement) {
    GM_log("using prototype");
  if (Prototype.BrowserFeatures.XPath) {
    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    return document._getElementsByXPath(q, parentElement);
  } else {
    var children = ($(parentElement) || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
      child = children[i];
      if (Element.hasClassName(child, className))
        elements.push(Element.extend(child));
    }
    return elements;
  }
};