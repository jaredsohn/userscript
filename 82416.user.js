// ==UserScript==
// @name           FFimageHide
// @namespace      FFimageHide
// @include        http://friendfeed.com/*
// @description    Hides unwanted images in the feeds.
// ==/UserScript==

var icount = 0;

function tumunuGizle()
{
  var images = document.getElementsByClassName("images");
  for (var i = 0; i <= images.length - 1; i++)
    resimGizle(images[i]);
}

function resimGizle(image)
{
  if( image.id == "" )
  {
    ++window.icount;
    image.id = "hiddenImage" + window.icount;
    image.style.visibility = "hidden";
    image.style.display    = "none";
    var link = document.createElement("a");
    link.setAttribute("id", "link" + window.icount);
    link.setAttribute("onclick", 'var i = document.getElementById("hiddenImage'+window.icount+'");i.style.visibility = "visible";i.style.display = "block";this.style.display = "none";this.style.visibility = "hidden;";');
    link.innerHTML = "Show Images";
    image.parentNode.appendChild(link);
  }
}

// yeni resimli feed eklendiğinde gizle.
function yeniEklemedeGizle()
{
  document.addEventListener('DOMNodeInserted', function (event) {
     var eventTarget = event.target;
     if ((eventTarget.toString().search("Div")) && (eventTarget.nodeType != 3)) {
        var targetClass = eventTarget.getAttribute("class");
        if (("l_entry entry" == targetClass) || ("l_entry entry private" == targetClass)) {
            var images = document.getElementsByClassName("images");
            for (var i = 0; i <= images.length - 1; i++)
              resimGizle(images[i]);
        }
     }
  }, false);
}

// fonksiyonlari sayfaya ekler.
function embedInDOM(s) {
   var scpt = document.createElement('script');
   scpt.setAttribute("type","text/javascript");
   scpt.innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
   document.body.appendChild(scpt);
}

embedInDOM(resimGizle);
embedInDOM(tumunuGizle);
embedInDOM(yeniEklemedeGizle);

// basla.
var run = document.createElement('script');
run.setAttribute("type","text/javascript");
run.innerHTML = "window.icount = 0; yeniEklemedeGizle(); tumunuGizle();";
document.body.appendChild(run);
