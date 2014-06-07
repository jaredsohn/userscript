// ==UserScript==
// @name           Digg to FoxieWire
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://www.digg.com/*
// @include        http://digg.com/*
// @description    Add Submit to FoxieWire buttons on Digg stories
// ==/UserScript==

// Last updated: 2008-01-29

({
  get pref() {
    return GM_getValue("showAlert", true);
  },

  get foxieAlert() {
    return document.getElementById("foxie-alert");
  },

  get foxieCheckbox() {
    return document.getElementById("foxie-pref");
  },

  btnOK: function(aEvent) {
    var pref = this.foxieCheckbox.checked;
    GM_setValue("showAlert", !pref);
    GM_openInTab(aEvent.target.getAttribute("url"));
    /*window.open(aEvent.target.getAttribute("url"), "",
                "resizable, location, menubar, toolbar, " +
                "scrollbars, status");*/
    this.foxieAlert.style.display = "none";
  },

  btnCancel: function() {
    this.foxieCheckbox.checked = !this.pref;
    this.foxieAlert.style.display = "none";
  },

  showAlert: function(aURL) {
    this.foxieAlert.style.display = "block";
    this.foxieCheckbox.checked = !this.pref;
    document.getElementById("foxie-submit")
            .setAttribute("url", aURL);
  },

  submitToFW: function(aNode, aEvent) {
    aEvent.preventDefault();
    if (this.pref) {
      this.showAlert(aNode.href);
    } else {
      GM_openInTab(aNode.href);
      /*window.open(aNode.href, "",
                  "resizable, location, menubar, toolbar, " +
                  "scrollbars, status");*/
    }
  },

  addLink: function(aNode, aStory) {
    var fw = "http://www.foxiewire.com/submit.php?url=";
    var url = aStory.getElementsByTagName("a")[0].href;
    var img = document.createElement("img");
    img.src = "data:image/png;base64,\
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";
    img.alt = "Submit to FoxieWire";
    var FoxieWire = this;
    var link = aNode.parentNode
                    .insertBefore(document.createElement("a"),
                                  aNode.nextSibling);
    link.title = "Submit to FoxieWire";
    link.href = fw + encodeURIComponent(url);
    link.appendChild(img);
    link.addEventListener("click", function(e) {
      FoxieWire.submitToFW(this, e);
    }, false);
  },

  makeDiv: function() {
    var div0 = document.body.appendChild(document.createElement("div"));
    div0.id = "foxie-alert";
    div0.setAttribute("style", "display: none; position: fixed; \
top: 0; left: 0; right: 0; bottom: 0; z-index: 1600001; \
background-image: url(http://digg.com/img/lightbox-overlay.png);");

    var div1 = div0.appendChild(document.createElement("div"));
    div1.setAttribute("style", "border: 3px groove -moz-dialog; \
margin: 150px auto; padding: 0.5em 1em; text-align: left; \
background-color: -moz-dialog ; width: 400px;");

    var p1 = div1.appendChild(document.createElement("p"));
    p1.innerHTML = "Please note that your post must be related to \
Mozilla Properties News, Stories, Links, Banner Ads. See <a href=\
\"http://www.foxiewire.com/faq-en.php\" target=\"_blank\">Facts & \
Questions</a> for more details.";

    var p2 = div1.appendChild(document.createElement("p"));
    p2.innerHTML = "<label for=\"foxie-pref\">I know what I'm doing \
and don't show this alert again.</label>";
    var checkbox = p2.insertBefore(document.createElement("input"),
                                   p2.firstChild);
    checkbox.id = "foxie-pref";
    checkbox.type = "checkbox";
    checkbox.style.marginRight = "3px";
    checkbox.checked = !this.pref;

    var p3 = div1.appendChild(document.createElement("p"));
    p3.style.textAlign = "right";

    var FoxieWire = this;

    var btnOK = p3.appendChild(document.createElement("button"));
    btnOK.id = "foxie-submit";
    btnOK.textContent = "OK";
    btnOK.addEventListener("click", function(e) {
      FoxieWire.btnOK(e);
    }, false);

    var btnCancel = p3.appendChild(document.createElement("button"));
    btnCancel.textContent = "Cancel";
    btnCancel.addEventListener("click", function(e) {
      FoxieWire.btnCancel()
    }, false);
  },

  init: function() {
    var story = document.getElementById("title");
    if (story) {
      this.addLink(document.getElementById("share1"), story);
    } else {
      var stories = document.evaluate("//h3[starts-with(@id, 'title')]",
                                      document, null, 6, null);
      var shares = document.evaluate("//div[@class='news-details']" +
                                     "/a[starts-with(@class, 'tool share')]",
                                     document, null, 6, null);
      if (!stories.snapshotLength ||
          !shares.snapshotLength ||
          stories.snapshotLength != shares.snapshotLength) return;
      for (var i = 0; i < shares.snapshotLength; i++) {
        this.addLink(stories.snapshotItem(i), stories.snapshotItem(i));
      }
    }
    this.makeDiv();
  }

}).init()