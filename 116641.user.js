// ==UserScript==
// @name            eRepublik Media Mogul Projects
// @version         0.0001
// @match           http://www.erepublik.com/en/newspaper/*
// @match           http://www.erepublik.com/en/citizen/profile/*
// @include         http://www.erepublik.com/en/newspaper/*
// @include         http://www.erepublik.com/en/citizen/profile/*
// ==/UserScript==
var MMHelperInsert = function(b, g) {
  function j() {
    if(e) {
      return false
    }else {
      e = true
    }
    if(d > c) {
      if(confirm("Do you want to start Media Mogul Projects?")) {
        var b = Math.round((d - c) / 2);
        alert("start Media Mogul Projects\nplease be patient, it will take about " + b + " sec.");
        jQuery.each(k, function(b, e) {
          a >= c && a < d ? (setTimeout(function() {
            l("subscribe", e)
          }, f), f += 500) : a < d && a++
        })
      }else {
        e = false, alert("you pause the Media Mogul Projects.")
      }
    }else {
      return e = false, alert("already completed.\nthis is the last-one patch, check something on script homeage."), g.open("http://userscripts.org/scripts/show/116641", "_blank"), false
    }
  }
  function l(c, f, g) {
    jQuery.post("/subscribe", {_token:m, type:c, n:f}, function() {
      a++;
      localStorage.setItem(h, a);
      b("p#ProgressLabel")[0].textContent = "v." + i + ", list:" + a + " / " + d;
      a == d && (e = false, alert(a + " subscribe finished.\nthanks for your help for this Media Mogul Projects."));
      g()
    }, "json");
    return false
  }
  var i = "0.1028", d = 2, k = {1:111111, 2:222222}, a = 0, f = 500, e = false, m = flc.getVariable("token"), h = "LastSubNum" + flc.getVariable("citizen_id"), c = localStorage.getItem(h);
  c == null && (c = 0);
  b(document).ready(function() {
    var a = b("a#financier").attr("href").split("/")[4];
    parent.document.location.toString().indexOf("/citizen/profile/" + a) == -1 === false && (b("div.place:last").after('<div class="place"><h3><img src="http://i.imm.io/aU6w.png" alt=""> MM Projects</h3><div class="one_newspaper"><a href="javascript:void(0)" title="Media Mogul Projects" id="MMProjects"><img src="http://i.imm.io/aU59.png" title="Media Mogul Projects" width="30" height="30"><span>Run Script</span></a><p align="center" id="ProgressLabel">v.' +
    i + ', list:<font id="log">' + c + "</font> / " + d + "</p></div></div>"), b("#MMProjects").bind("click", function() {
      j()
    }), d > c && b("font#log").css("color", "red"));
    parent.document.location.toString().indexOf("/newspaper/") !== -1 && (a = b("input#newspaper_id").val(), b("#profileholder > h1:first").after('<p align="right"> this newspaper id: <strong style="font-size: 140%;">' + a + '</strong></p><hr size="0" style="border:none;">'))
  })
}, script = document.createElement("script");
script.textContent = "(" + MMHelperInsert + ")(jQuery, window);";
document.body.appendChild(script);