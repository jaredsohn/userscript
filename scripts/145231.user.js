// ==UserScript==
// @name           Facebook View Photo in Album
// @description    Adds a link above photos to see them in their albums, even if you're not friends with the photographer. Adds links to view all photos of a user together (regardless of who took them). Adds links to view whole galleries/albums on one page.
// @namespace      znerp
// @include        http://*.facebook.com/photo.php?*
// @include        http://*.facebook.com/photo_search.php?*
// @include        http://*.facebook.com/album.php?*
// @include        http://*.facebook.com/photos.php?subj=*
// @include        http://*.facebook.com/*
// @require        http://usocheckup.dune.net/9580.js
// ==/UserScript==

if (document.getElementById("content")) document.getElementById("content").addEventListener('DOMNodeInserted', function() { window.setTimeout(inYoFace, 5000);}, true);
window.addEventListener('load', inYoFace, true);
currentLocation = ""
inYoFace()

function inYoFace() {
  if (document.location.href != currentLocation) {
    currentLocation = document.location.href
    link = document.location.href;
    currentPage = link.slice(link.lastIndexOf("/"), link.length)

    // Looking at a photo
    if (/photo\.php\?/.test(currentPage)) {
      h4 = document.getElementById("content").getElementsByTagName("h4")[0];
      // If we're not actually in the album, add the link to it if needed
      if (currentPage.indexOf("&op=") != -1) {
        if (!/See this Photo in its Album/.test(h4.innerHTML)) {
          newThing = link.replace(/(^.*photo.php\?).*(pid=\d+).*(&id=\d+).*/, '$1$2$3')
          h4.innerHTML += '<span class="pipe">|</span><a href='+newThing+' style="cursor:pointer;">See this Photo in its Album</a>';
        }
      // In the album but cannot view the rest of it, so need to add the gallery manually.
      // I think this bit's now redundant because I can't find any albums that I can't see.
      } else if (!document.getElementById("photo_count").parentNode.innerHTML.match(/Back to Album/i)) {
        h4.innerHTML += '<span class="pipe">|</span><a style="cursor:pointer;" title="WARNING: This can have a VERY slow load time.">Back to Album</a>';
        h4.getElementsByTagName("a")[0].addEventListener('click', showGallery, true);
      } 
    // I'm really not sure what the point in this bit is.  
    } else if (/photos\.php\?/.test(currentPage)) {
      strangers = document.evaluate('//a[contains(@href, ".facebook.com/s.php?k=100000080&id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = strangers.snapshotLength - 1; i >= 0; i--) {
        albumThing = strangers.snapshotItem(i).parentNode.parentNode.parentNode;
        links = albumThing.getElementsByTagName("a");
        photo = albumThing.getElementsByTagName("img")[0].src.match(/_(\d+)_\d+\.jpg/)[1];
        for (j = links.length - 1; j >=0 ; j--) {
          if (/aid=/.test(links[j].href)) {
            links[j].href = links[j].href.replace(/album\.php\?aid=\d+/ig, "photo.php?pid=" + photo)
            if (/View Album/i.test(links[j].textContent)) links[j].textContent = "View Photo"
          }
        }
      }
    // Looking at photos of someone
    } else if (/\/profile\.php\?id=\d+&v=photos/.test(currentPage) || /\/[\w\.]+\?v=photos/.test(currentPage)) {
      navLinks = document.evaluate('//div[@id="photos_of_wrapper_pager"]/div[@class="pagerpro_container"]/ul[@class="pagerpro"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      navLinks.parentNode.style.width = "auto";
      navLinks.parentNode.parentNode.previousSibling.style.width = "auto";
      //Add 'View all Photos' link
      li = document.createElement("li");
      li.innerHTML = '<a style="cursor:pointer;">(View All Photos)</a>'
      li.addEventListener(
        "click",
        function addProfileImages() {
          GM_addStyle(".UIPhotoGrid_DefaultPadding { top: auto !important; position: relative !important; } " +
                      "#photos_of_wrapper { height: auto !important; }")
          keepGoing = true;
          navLinks = this.parentNode.parentNode;
          //personId = currentPage.match(/\/profile\.php\?id=(\d+)&v=photos/)[1]
          //personId = unsafeWindow.PROFILE_OWNER_ID
          personId = unsafeWindow.ProfileURIController._profileId
          if (/&viewas=\d+/.test(currentPage))
            userId = currentPage.match(/&viewas=(\d+)/)[1]
          else
            userId = unsafeWindow.buddyList.user
          currentNo = parseInt(document.evaluate('//div[@id="photos_of_wrapper_pager"]/div[@class="pagerpro_container"]/ul[@class="pagerpro"]/li[contains(@class,"current")]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent);
          nextNo = currentNo + 1;
          prevNo = currentNo - 1;
          prevDone = false;
          nextDone = false;
          tryAgainCount = 0
          //Get page of photos
          function getPage(link, prev) {
            GM_xmlhttpRequest({
              method: 'get',
              headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type': 'application/x-www-form-urlencoded'
              },
              url: link,
              onload: function (result) {
                res = result.responseText;
                if (res != "") {
                  tryAgainCount = 0
                  if (keepGoing) {
                    //whack the images on the page and get the next one
                    images = res.slice(res.indexOf("<div"), res.indexOf("div>") + 4).replace(/\\"/g, '"').replace(/\\\//g, "/");
                    prev ? document.getElementById("photos_of_wrapper").innerHTML = images + document.getElementById("photos_of_wrapper").innerHTML 
                         : document.getElementById("photos_of_wrapper").innerHTML += images;
                    if (!/<div/.test(res))
                      prev ? prevDone = true : nextDone = true
                    else 
                      getPage("http://www.facebook.com/ajax/photos.php?id=" + personId + "&vm=photosofmeviewer=" + userId + "&so=" + ((prev ? prevNo-- : nextNo++) * 15) + "&action=page&section=photos_of&__a=1", prev)
                    if (prevDone && nextDone)
                      navLinks.parentNode.removeChild(navLinks);
                  }
                //Try 3 times to get pages
                } else if (tryAgainCount < 3) {
                  getPage(link, prev);
                  tryAgainCount++;
                } else {
                  navLinks.parentNode.removeChild(navLinks);
                  alert("The next page cannot be loaded at this time.\n\nPlease refresh and try again.")
                }
              }
            });
          }
          //if there's a previous link, start going backwards
          if (navLinks.innerHTML.match(/prev/i))
            getPage("http://www.facebook.com/ajax/photos.php?id=" + personId + "&vm=photosofmeviewer=" + userId + "&so=" + ((prevNo-- * 15) - 15) + "&action=page&section=photos_of&__a=1", true)
          else
            prevDone = true
          //if there's a next link, start going forwards
          if (navLinks.innerHTML.match(/next/i))
            getPage("http://www.facebook.com/ajax/photos.php?id=" + personId + "&vm=photosofmeviewer=" + userId + "&so=" + ((nextNo++ * 15) - 15) + "&action=page&section=photos_of&__a=1", false)
          else
            nextDone = true
          //change the link to say 'stop loading images'
          navLinks.firstChild.innerHTML = "<a style='cursor: pointer;'>(Stop Loading Images)</a>"
          navLinks.addEventListener(
            "click", 
            function(event) {
              keepGoing = false;
              this.parentNode.removeChild(this);
            },
            true);
        }, true);
      navLinks.appendChild(li);
    }
    //I think this is for 'view all photos' when looking at an album
    navLinks = document.evaluate('//ul[@class="pagerpro"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!/&v=photos#?$/.test(document.location.href) && (/album\.php/.test(document.location.href) || /photo_search\.php/.test(document.location.href))) {
      for (i = navLinks.snapshotLength - 1; i >= 0; i--) {
        li = document.createElement("li");
        li.innerHTML = '<a style="cursor:pointer;">(View All Photos)</a>'
        li.addEventListener(
          "click",
          function addImages() {
            keepGoing = true;
            navLinks = this.parentNode;
            var pageNumber;

            function getPage(link, prev) {
              GM_xmlhttpRequest({
                method: 'get',
                headers: {
                  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                url: link,
                onload: function (result) {
                  res = result.responseText;
                  if (keepGoing) {
                    images = res.slice(res.indexOf('<div class="UIPhotoGrid_Container'),
                                       res.indexOf('</div>', res.indexOf('<div class="UIPhotoGrid_Container')));
                    if (document.getElementById("album_container"))
                      prev ? document.getElementById("album_container").innerHTML = images + document.getElementById("album_container").innerHTML 
                           : document.getElementById("album_container").innerHTML += images;
                    else
                      prev ? document.getElementById("album").firstChild.innerHTML = images + document.getElementById("album").firstChild.innerHTML 
                           : document.getElementById("album").firstChild.innerHTML += images;
                    h4 = document.getElementById("content").getElementsByTagName("h4")[0];
                    if (h4) {
                      numbers = h4.innerHTML.replace(/(\d+),(\d+)/, "$1$2").match(/Photos (\d+) - (\d+) out of (\d+)/)
                      for (i = 0; i < 3; i++) numbers[i] = parseInt(numbers[i]);
                      prev ? (numbers[1] -= 20) : (numbers[2] = Math.min(numbers[2]+20, numbers[3]));
                      newString = "Photos " + numbers[1] + " - " + numbers[2] + " out of " + commas(numbers[3]);
                      h4.innerHTML = h4.innerHTML.replace(/Photos \d+ - \d+ out of \d+(,\d+)?/, newString);
                      if ((numbers[1] == 1) && (numbers[2] == numbers[3])) {
                        navLinks.parentNode.removeChild(navLinks);
                        
                      } else if ((prev && (numbers[1] != 1)) || (!prev && (numbers[2] != numbers[3]))) {
                        pageNumber = parseInt(link.match(/&s=(\d+)/)[1]) + (prev ? -20 : 20);
                        getPage(link.replace(/&s=\d+/, "&s="+pageNumber), prev);
                      }
                    } else {
                      nextNo = parseInt(res.slice(res.lastIndexOf("/photo_search.php?page="), 
                                                  res.lastIndexOf("/photo_search.php?page=") + 25).match(/\d+/));
                      if (nextNo == pageNumber) {
                        navLinks.parentNode.removeChild(navLinks);
                      } else {
                        pageNumber = nextNo;
                        getPage(link.replace(/page=\d+/, "page="+pageNumber), prev);
                      }
                    }
                    
                  }
                }
              });
            }

            if (foo = document.evaluate('//a[contains(., "rev")]', navLinks, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
              getPage(foo.href, true)
            if (foo = document.evaluate('//a[contains(., "ext")]', navLinks, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
              getPage(foo.href, false)
            navLinks.innerHTML = "<a style='cursor: pointer;'>(Stop Loading Images)</a>"
            navLinks.addEventListener(
              "click", 
              function(event) {
                keepGoing = false;
                this.parentNode.removeChild(this);
              },
              true);
            moreLinks = document.evaluate('//ul[@class="pagerpro"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (j = moreLinks.snapshotLength - 1; j >= 0; j--) {
              if (moreLinks.snapshotItem(j) != navLinks)
                moreLinks.snapshotItem(j).removeChild(moreLinks.snapshotItem(j).lastChild);
            }
          }, true)
        navLinks.snapshotItem(i).appendChild(li);
      }
    }
  }
}

function commas(number) {
  return (number + "").replace(/(\d)(?=(\d{3})+\b)/g,'$1,')
}

//This whole function probably isn't needed anymore
function showGallery() {
  photoNumbers = document.getElementById("photo_count").textContent.split(" ");
  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "album");
  document.getElementById("photoborder").parentNode.insertBefore(newDiv, document.getElementById("photoborder"));
  document.getElementById("photoborder").style.display = "none";
  document.getElementById("photoinfo").style.display = "none";
  document.getElementById("content").getElementsByTagName("h4")[0].style.display = "none";
  document.getElementById("content").getElementsByTagName("ul")[0].style.display = "none";

  table = document.createElement("table");
  for (i = 0; i < photoNumbers[3]; i++) {
    if (i % 5 == 0)
      row = document.createElement("tr");
    cell = document.createElement("td");
    a = document.createElement("a");
    img = document.createElement("img");
    img.setAttribute("id", "znerp" + (i+1));
    img.setAttribute("style", "max-width:130px;");
    a.appendChild(img);
    cell.appendChild(a);
    row.appendChild(cell);
    if (i % 4 == 3)
      table.appendChild(row);
  }
  if (photoNumbers[3] % 4) table.appendChild(row);
  document.getElementById("album").appendChild(table);
  var count = 0;
  addNextImage(document.location.href);
  
  function addNextImage(nextLink) {
    if (count < photoNumbers[3]) {
      GM_xmlhttpRequest({
        method: 'get',
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Content-type': 'application/x-www-form-urlencoded'
        },
        url: nextLink,
        onload: function (result) {
          res = result.responseText;
          if (res.indexOf("you may not have permission to view this page") != -1) {
            document.getElementById("page_body").setAttribute("class", "pagebody error404 basic")
            document.title = "Facebook | Unable to load album"
            document.getElementById("content").innerHTML = "<h2>ERROR - The <i>Facebook View Photo in Album</i> script it unable to load this album.</h2><p>It may be temporarily unavailable, or the album owner may have set their privacy options such that it is not possible to view the rest of this album.</p><ul><li><span><a href=\"" + document.location.href + "\">Reload image</a></span></li><li><span><a href=\"http://www.facebook.com/home.php\">Return home</a></span></li></ul>"
            document.getElementById("content").setAttribute("style", "padding: 30px 80px 20px 30px")
            document.body.setAttribute("class", "error404 basic chat_body")
          } else {
            image = res.slice(res.indexOf('img src="', res.indexOf('id="myphotolink"')) + 9,
                             (res.indexOf('"', res.indexOf('img src="', res.indexOf('id="myphotolink"')) + 9))).replace(/\/n/, "/s");
            title = (res.slice(res.indexOf('<div id="photocaption">') + 23,
                              res.indexOf('</div>', res.indexOf('<div id="photocaption">')))).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#039;/g, "'");
            photoNumber = parseInt(res.slice(res.indexOf('Photo', res.indexOf('<span id="photo_count">')) + 6,
                                             res.indexOf(' of', res.indexOf('<span id="photo_count">'))));
            document.getElementById("znerp" + photoNumber).src = image;
            document.getElementById("znerp" + photoNumber).parentNode.href = nextLink;
            if (title != "") document.getElementById("znerp" + photoNumber).title = title;
            addNextImage("http://www.facebook.com/" + res.slice(res.indexOf('a href="', res.indexOf('id="photonav_prev"')) + 8,
                                                                res.indexOf('" id="photonav_next"')).replace("&amp;", "&"));
          }
        }
      });
      count++;
    }
  }
}