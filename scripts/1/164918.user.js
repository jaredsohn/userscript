// ==UserScript==
// @name        clubs.dir.bg user filter
// @namespace   clubs.dir.bg
// @description User filter for clubs.dir.bg
// @include     http://clubs.dir.bg/*
// @grant all
// @version     1
// ==/UserScript==
  var blockIds = JSON.parse(getCookie("blokids")),
      i, j;
  var settsDiv = document.createElement("DIV");
  settsDiv.id = "divSettings";
  settsDiv.style.position = "fixed";
  settsDiv.style.padding = "10px";
  settsDiv.style.top = "20px";
  settsDiv.style.width = "260px";
  settsDiv.style.fontFamily = "Sans";
  settsDiv.style.backgroundColor = "#6f6";
  settsDiv.style.borderStyle = "solid";
  settsDiv.style.borderWidth = "1px";
  settsDiv.style.borderRadius = "15px";
  settsDiv.style.borderColor = "#3c3";
  settsDiv.style.left = (document.body.clientWidth - 300) + "px";
  var divSrc = "<div id=\"divInner\"><b>List of ignored IDs</b>";
  divSrc += getList();
  divSrc += "<a href=\"#\" id=\"hrefAddUser\">Add</a>";
  divSrc += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" id=\"hrefSave\">Save</a>";
  divSrc += "</div>";
  divSrc += "<a href=\"#\" id=\"hrefHideBar\" style=\"position:absolute;top:10px;left:250px;display:none;\">—</a>";
  divSrc += "<a href=\"#\" id=\"hrefShowBar\">+</a>";
  settsDiv.innerHTML = divSrc;
  document.body.appendChild(settsDiv);

  try
  {
    var links = document.querySelectorAll ("a[href^='http://clubs.dir.bg/postlist.php?Board=programers'], font");
    for (i = 0;i < links.length;i++)
    {
      if (links[i].textContent == "Програмисти")
      {
        links[i].innerHTML = "Манекени и Мелеонери";
        document.title = document.title.replace ("Програмисти", "Манекени и Мелеонери");
      }
    }
  }
  catch (e) {};

  if (blockIds) {
      if (document.location.toString().indexOf("postlist.php") != -1 || document.location.toString().indexOf("showthreaded.php") != -1) {
          var links = document.getElementsByTagName("a");
          for (i = 0; i < links.length; i++) {
              for (j = 0; j < blockIds.length; j++) {
                  if (links[i].hasAttribute("href")) {
                      if (links[i].getAttribute("href").indexOf("usid=" + blockIds[j].usid) != -1) {
                          links[i].parentNode.parentNode.style.display = "none"
                      }
                  }
              }
          }
      }
      if (document.location.toString().indexOf("showflat.php") != -1) {
          var links = document.getElementsByTagName("a");
          for (i = 0; i < links.length; i++) {
              for (j = 0; j < blockIds.length; j++) {
                  if (links[i].hasAttribute("href")) {
                      if (links[i].getAttribute("href").indexOf("usid=" + blockIds[j].usid) != -1) {
                          var parentTbl = links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                          var rowNdx = links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
                          try {
                              parentTbl.rows[rowNdx - 1].style.display = "none"
                          } catch (e) {};
                          parentTbl.rows[rowNdx].style.display = "none";
                          parentTbl.rows[rowNdx + 1].style.display = "none"
                      }
                  }
              }
          }
      }
  }
  document.getElementById("hrefHideBar").addEventListener("click", hideBar, false);
  document.getElementById("hrefShowBar").addEventListener("click", showBar, false);
  document.getElementById("hrefAddUser").addEventListener("click", function () {
      var a = prompt("User ID");
      var b = prompt("User name");
      var c = document.createElement("LI");
      c.id = "li_" + a;
      c.setAttribute("rel", b);
      c.innerHTML = "<b style=\"color:#349B9A;\">" + (b == "" ? "<i>name-not-set</i>" : b) + "</b>&nbsp(ID " + a + ")&nbsp;&nbsp;<a href=\"#\" class=\"delete\" id=\"" + a + "\">X</a>";
      document.getElementById("ulIds").appendChild(c);
      listenDeletes()
  }, false);
  document.getElementById("hrefSave").addEventListener("click", function () {
      setList();
      alert("Saved!");
      document.location.href = document.location.href
  }, false);
  if (getCookie("barvisible") == 1) {
      showBar()
  } else {
      hideBar()
  }
  function hideBar() {
      document.getElementById("divInner").style.display = "none";
      document.getElementById("divSettings").style.width = "10px";
      document.getElementById("divSettings").style.left = (document.body.clientWidth - 50) + "px";
      document.getElementById("hrefHideBar").style.display = "none";
      document.getElementById("hrefShowBar").style.display = "inline";
      settsDiv.style.paddingTop = "8px";
      settsDiv.style.paddingBottom = "8px";
      setCookie("barvisible", 0, 90)
  }
  function showBar() {
      document.getElementById("divInner").style.display = "block";
      document.getElementById("divSettings").style.width = "260px";
      document.getElementById("divSettings").style.left = (document.body.clientWidth - 300) + "px";
      document.getElementById("hrefHideBar").style.display = "inline";
      document.getElementById("hrefShowBar").style.display = "none";
      settsDiv.style.padding = "10px";
      setCookie("barvisible", 1, 90)
  }
  listenDeletes();

  function listenDeletes() {
      var b = document.querySelectorAll(".delete");
      for (var i = 0; i < b.length; i++) {
          b[i].addEventListener("click", function (a) {
              document.querySelector("#ulIds").removeChild(document.querySelector("#li_" + a.target.id))
          }, false)
      }
  }
  function getList() {
      var i;
      var a = "<ul id=\"ulIds\" style=\"margin:10px 0;padding:0;border:0;list-style:none;\">";
      if (blockIds) {
          for (i = 0; i < blockIds.length; i++) {
              a += "<li id=\"li_" + blockIds[i].usid + "\" rel=\"" + blockIds[i].usname + "\">";
              a += "<b style=\"color:#349B9A;\">" + (blockIds[i].usname == "" ? "<i>name-not-set</i>" : blockIds[i].usname) + "</b>&nbsp;(ID " + blockIds[i].usid + ")";
              a += "&nbsp;&nbsp;<a href=\"#\" class=\"delete\" id=\"" + blockIds[i].usid + "\">X</a>";
              a += "</li>"
          }
      }
      a += "</ul>";
      return a
  }
  function setList() {
      var i;
      blockIds = [];
      var a = document.querySelectorAll("#ulIds > li");
      for (i = 0; i < a.length; i++) {
          blockIds.push({
              usid: a[i].id.substring(3, 12),
              usname: a[i].getAttribute("rel")
          })
      }
      setCookie("blokids", JSON.stringify(blockIds), 90);
      return true
  }
  function setCookie(a, b, c) {
      if (c) {
          var d = new Date();
          d.setTime(d.getTime() + (c * 24 * 60 * 60 * 1000));
          var e = "; expires=" + d.toGMTString()
      } else {
          var e = ""
      }
      document.cookie = a + "=" + b + e + "; path=/"
  }
  function getCookie(a) {
      var b = a + "=";
      var d = document.cookie.split(";");
      for (var i = 0; i < d.length; i++) {
          var c = d[i];
          while (c.charAt(0) == " ") {
              c = c.substring(1, c.length)
          }
          if (c.indexOf(b) == 0) {
              return c.substring(b.length, c.length)
          }
      }
      return null
  }