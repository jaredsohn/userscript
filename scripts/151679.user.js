// ==UserScript==
// @name        IHenkIt
// @namespace   Tweakers
// @description IHenkIt button on http://tweakers.net
// @include     http://tweakers.net/*
// @include     https://tweakers.net/*
// @include     http://www.tweakers.net/*
// @include     https://www.tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @include     https://gathering.tweakers.net/*
// @version     1.4
// ==/UserScript==

(function() {
  var Henk, henk, serverUrl;

  Henk = (function() {
    var afterHenkImage, css, henkImage;

    css = "  #ihenkit {    margin-bottom: 10px;  }  h1 > #ihenkit {    display: inline-block;    margin-left: 10px;    margin-bottom: 0;  }  #ihenkit #numberOfHenks {    position: relative;    float: left;    height: 23px;    width: 35px;    margin-left: 4px;    padding-top: 10px;    text-align: center;    color: #666666;    font-size: 11px;    border: 1px solid #CCCCCC;    border-radius: 3px;    line-height: 14px;    background-color: #fff;  }  #ihenkit img {    cursor: pointer;    float: left;  }  #ihenkit img.after {    cursor: auto;  }";

    henkImage = 'R0lGODlhegAjANUAALmyg2xMD4hlBoGes/GyAYWFhrq7u//VBMXFxZmYmOTl5nBsa/zJA6enqI2CT9LT1P/sLlJOQuzw88aWAVh9m9mnAaaFCf7aEXWQpqymgkY6FiwrJ4l8O52gp3dsRxAEBf/jHHt8fjkjAJ6enpq025yWjujq7bSbKV5cW9jDK5CRkjMRAf3dIkJba8TR29jg5zlWbBkrOEZpgi5AT67BzrqnIMC8q4qKi5KCfO3CArCxsfP09Pj5+d3e3vX29vT19SH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NTNFQkYzMjFGNDkxMUUyQTNEM0Q4NjEzRTM5MUIzMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NTNFQkYzMzFGNDkxMUUyQTNEM0Q4NjEzRTM5MUIzMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1M0VCRjMwMUY0OTExRTJBM0QzRDg2MTNFMzkxQjMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1M0VCRjMxMUY0OTExRTJBM0QzRDg2MTNFMzkxQjMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAHoAIwBABv9ARW9ILBqPyKRyyWw6n1Ahz0etWqsGQ2iT+Nw+qs9oUzAgrui0es1uu99r3nCaHt1GhszloCENKBYVFBgkGzkMBDYNDQtnbS4wLxIULhQDVpAvVZk+lj5/Pi4zlzQyEpOVl1cSMhShM66ZLzAub3I9PD+6u7wIKjojIwUBAgIBx8URKiOLNwq80NHS09TV1tfYure52d3e3+Dh4Ntw5ebn6Onp5G07KCcQICAX9PUXIAIoEur8/f5V26RJEKZDB4oJByYImFChYYUJFgJYYCAgBIIEZa5lQoVqVyaPkX5Y+lFKwseNlDry6thxlgtvAashCJHAhLUeBUL0EMezp0//bXP+CR1K1By7cg8QKChgAkGPolCjpjmq5sGGBjM2cEgBoSsEFjU8bIgw5qnUs/+oVk0BwgKZCIcChJgh4ACDE/vKoax1hRMVv25QoRmgao0ovm1iQmtg4MGNBhzsHshR4YDlAwRy2EXkoUGCBzo0RmJFgYIEXh91yYIRo/UMFydHtzIdjSWlHy4nvcCmuJoCCwRWfNiAYwGKDx8EEOCw46fz5916T5OgIoSB0zhRhP6h4MZj6ODDR5Muvrx5cbegqF/Pvr37KLh4yJ9Pv779+/jz69/Pv79//0GhJeCA5ahF4IEIUmHgGozdMIMOHxiwAR4GJGihLQGusYMCYYzw/0EEGjggAAcaRCDGhM9cqOIVC1ohwQIfLFBDPCzUWKM8+cSY14ortngFAPE8lMMeDFiAkF02nLMXGoAB1oZgVxD2yGsY4lJVYz5kwMIFGiTVgZEdGGDCBgQwUMFTCBiggBt7sWLKX5FsEucsMcRZiQyt0eADRzK8+QkNk2DQ2gA0DOqDS1VyI40BKtzAwR4VbNBCAJoJ0MIGFthFgAcd3LCTaJJQMAo0orRmaiQu4RZJbKGOWtttLdEyy27XkPeDCgXkWoAHDPR6GQETMGAZQwxMgIKuIYCKCmGohaQaqs4+u9tezEJj20u5UUCrNbZCs4MDRSKnQQnFIbcCARWU8HrNXj+kllq7IdH5GrzTjnbbuz9cqyps89Y6hzUPNKbDQiIgZ3AAFQSAQJo2necwev9Sk4AKDTxWwAIdoCDCxiXcsADFyxSAwMMkwxQxNQjcUJ1vC9jxTMkw+4tLzDTH3G3NOEN3yw489+zzz0AHLfTQRBdt9NFIJ91DEAA7';

    afterHenkImage = 'R0lGODlhLAAjANUAALmyg2xMD4hlBoGes/GyAYWFhrq7u//VBMXFxZmYmOTl5nBsa/zJA6enqI2C\
  T9LT1P/sLlJOQuzw88aWAVh9m9mnAaaFCf7aEXWQpqymgkY6FiwrJ4l8O52gp3dsRxAEBf/jHHt8\
  fjkjAJ6enpq025yWjujq7bSbKV5cW9jDK5CRkjMRAf3dIkJba8TR29jg5zlWbBkrOEZpgi5AT67B\
  zrqnIMC8q4qKi5KCfO3CArCxsfP09Pj5+d3e3vX29vT19SwAAAAALAAjAAAG/0BFb0gsGo/I5FHI\
  azqf0Kh0Gh3yfNisdsvterU863dMHod717J6fU6v39823PdAKAomRA8uXzcMNzM6HwYbIwYGbGJl\
  iCEbCR83HyofIxsFBghlfV87CpQjHxEaDgIcGhGVhgo/ZotfDxsNMxscKRC4ECw1HhsRlntxr14S\
  Cx8LNRAgLMzMICACKMcSrmhlOygnyiAX3d4X0CjU1W5jAMoVEzkXBwwWEwftNpvDXg8pIBaXETkM\
  ASEzBLQ7MU6YtS4PDDzwkYHFBQ11OrzrYMDEBgIMKuxBYEBBF05bRtw4lIGdBhIDKFioQAEDiQ39\
  CNho0GCBJi5tfujcudOAiv8bHNhV2NAiQI4DAlpssNCOgIcON3rw5Jlz6o8/D2404NDuQI4K8eIR\
  OMqAgdMGCR7osPqj6lQVBeIW8FCWQVgCE+wemFCBwQQUckOwdctTwogCOnSggDdBAN8KkCdYCGCB\
  gYAQCBJgGmyF7dQdDtx9+KChBA5jH1YQqFDCM9XOrncqsEBgxYcNp6V9EECAw47YOgmzTajWsYjR\
  yANUCICAo4nYwqciUKFjxOEAAgQE2J49gooRNG+w8hydZwIVDbQWWNABhYj3JW4sQP+9AALX5adK\
  UBHCgIQfPRSAwlo/KHCDVsC1BZtrCNzAX2wKLCDSeOQt6BkCISTwXGwBhiApFX4WJigicPmNaOJO\
  JZ5oYooqinjGDjDGKOOMNNZoI41K5KjjjkMoEAQAOw==';

    function Henk(serverUrl) {
      this.serverUrl = serverUrl;
    }

    Henk.prototype.init = function() {
      var galleryUrl, isLoggedIn, parsedPath, userBar, userId,
        _this = this;
      if (typeof UserID !== 'undefined') {
        userId = UserID;
      }
      if (!userId) {
        userBar = document.getElementById('userbar');
        isLoggedIn = (userBar != null ? userBar.className : void 0) === 'loggedin';
        if (isLoggedIn) {
          galleryUrl = userBar.children[0].children[1].children[0].children[0].children[0].attributes[0].value;
          userId = galleryUrl.substring(galleryUrl.lastIndexOf('/') + 1);
        }
      }
      if (typeof userId !== 'undefined') {
        parsedPath = this.parseUrlPath(window.location.href, location.pathname);
        if (parsedPath !== false) {
          return this.doXmlHttpRequest({
            method: "GET",
            url: serverUrl + "/list?userId=" + userId + "&url=" + parsedPath.url,
            onload: function(response) {
              var button, buttonClickFunction, data, hasHenked, head, nrOfHenks, style;
              if (response.status !== 200) {
                console.log(response);
                data = eval("(" + response.responseText + ")");
                if (data.error.code !== 600) {
                  alert('Er is iets mis gegaan tijdens het Henken: error code ' + data.error.code);
                }
                return;
              }
              data = eval("(" + response.responseText + ")");
              nrOfHenks = data.henks;
              hasHenked = data.hasHenked;
              head = document.getElementsByTagName('head')[0];
              style = document.createElement('style');
              style.type = 'text/css';
              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
              head.appendChild(style);
              button = _this.insertHenkButtonOnPage(nrOfHenks);
              if (hasHenked === false) {
                buttonClickFunction = function() {
                  return _this.doXmlHttpRequest({
                    method: "POST",
                    url: serverUrl + "/henk",
                    data: "userId=" + userId + "&url=" + location.href,
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onload: function(response) {
                      var henksBlock;
                      if (response.status !== 200) {
                        console.log(response);
                        data = eval("(" + response.responseText + ")");
                        if (data.error.code === 600) {
                          alert('Deze kun je (nog) niet Henken, helaas.');
                        } else if (data.error.code === 5) {
                          button.src = 'data:image/gif;base64,' + afterHenkImage;
                          button.className = 'after';
                          button.removeEventListener('click', buttonClickFunction);
                          alert('Je hebt deze al geHenkt!');
                        } else {
                          alert('Er is iets mis gegaan tijdens het Henken: error code ' + data.error.code);
                        }
                        return;
                      }
                      data = eval("(" + response.responseText + ")");
                      nrOfHenks = data.henks;
                      henksBlock = document.getElementById('numberOfHenks');
                      henksBlock.innerHTML = nrOfHenks;
                      button.src = 'data:image/gif;base64,' + afterHenkImage;
                      button.className = 'after';
                      return button.removeEventListener('click', buttonClickFunction);
                    }
                  });
                };
                return button.addEventListener('click', buttonClickFunction);
              } else {
                button.src = 'data:image/gif;base64,' + afterHenkImage;
                return button.className = 'after';
              }
            }
          });
        }
      } else {
        return console.log('logged in: ' + isLoggedIn);
      }
    };

    Henk.prototype.insertHenkButtonOnPage = function(nrOfHenks) {
      var actionList, button, buttonWrapper, clearBreak, galleryHeading, henksBlock, listItem, pathname, relevancyColumn, sidebar;
      buttonWrapper = document.createElement('div');
      buttonWrapper.id = 'ihenkit';
      button = document.createElement('img');
      button.src = 'data:image/gif;base64,' + henkImage;
      buttonWrapper.appendChild(button);
      henksBlock = document.createElement('div');
      henksBlock.id = 'numberOfHenks';
      henksBlock.innerHTML = nrOfHenks;
      buttonWrapper.appendChild(henksBlock);
      pathname = window.location.pathname;
      if (pathname.indexOf('list_messages') > 0 || pathname.indexOf('list_message') > 0) {
        listItem = document.createElement('li');
        listItem.appendChild(buttonWrapper);
        actionList = document.getElementsByClassName('action_list')[0];
        actionList.appendChild(listItem);
      } else if (pathname.indexOf('meuktracker') > 0 || pathname.indexOf('blog') > 0) {
        clearBreak = document.createElement('br');
        clearBreak.className = 'clear';
        buttonWrapper.appendChild(clearBreak);
        sidebar = document.getElementsByClassName('sidebar')[0];
        sidebar.insertBefore(buttonWrapper, sidebar.childNodes[0]);
      } else if (pathname.indexOf('gallery') > 0) {
        clearBreak = document.createElement('br');
        clearBreak.className = 'clear';
        buttonWrapper.appendChild(clearBreak);
        galleryHeading = document.getElementsByClassName('galleryHeading')[0].children[1].children[0];
        galleryHeading.appendChild(buttonWrapper);
      } else {
        clearBreak = document.createElement('br');
        clearBreak.className = 'clear';
        buttonWrapper.appendChild(clearBreak);
        relevancyColumn = document.getElementsByClassName('relevancyColumn')[0];
        relevancyColumn.insertBefore(buttonWrapper, relevancyColumn.childNodes[0]);
      }
      return button;
    };

    Henk.prototype.parseUrlPath = function(url, path) {
      var contentId, contentType, head, link, parsedPath, paths, regexp, tempParsed, _i, _len, _ref;
      paths = path.split('/');
      switch (paths[1]) {
        case 'forum':
          switch (paths[2]) {
            case 'list_messages':
              contentType = 'ForumTopic';
              contentId = paths[3];
              break;
            case 'list_message':
              head = document.getElementsByTagName('head')[0];
              _ref = head.getElementsByTagName('link');
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                link = _ref[_i];
                if (link.getAttribute('rel') === 'canonical') {
                  url = link.getAttribute('href');
                  regexp = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
                  path = regexp.exec(url);
                  tempParsed = this.parseUrlPath(url, path[1]);
                  contentType = tempParsed.contentType;
                  contentId = tempParsed.contentId;
                }
              }
              break;
            default:
              return false;
          }
          break;
        case 'nieuws':
          contentType = 'News';
          contentId = paths[2];
          break;
        case 'reviews':
          contentType = 'Review';
          contentId = paths[2];
          break;
        case 'video':
          contentType = 'Video';
          contentId = paths[2];
          break;
        case 'meuktracker':
          contentType = 'Download';
          contentId = paths[2];
          break;
        case 'gallery':
          contentType = 'Userprofile';
          contentId = paths[2];
          break;
        case 'aanbod':
          contentType = 'Advertisement';
          contentId = paths[2];
          break;
        case 'productreview':
          contentType = 'Productreview';
          contentId = paths[2];
          break;
        default:
          return false;
      }
      if (!contentType || !contentId) {
        return false;
      }
      parsedPath = {
        'contentType': contentType,
        'contentId': contentId,
        'url': url
      };
      return parsedPath;
    };

    Henk.prototype.doXmlHttpRequest = function(details) {
      if (typeof GM_xmlhttpRequest === 'function') {
        return GM_xmlhttpRequest(details);
      } else {
        console.log("nope, failed");
        return false;
      }
    };

    return Henk;

  })();

  serverUrl = 'http://ihenk.it';

  henk = new Henk(serverUrl);

  henk.init();

}).call(this);
