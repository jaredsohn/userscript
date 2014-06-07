// ==UserScript==
// @name           MaximumPC Benchmarks highlighting
// @namespace      V@no
// @description    Highlights the best value in benchmark tables (due to inconsistence format, some values might fail to be recognized as the best)
// @include        http://maximumpc.com/article/*
// @include        http://www.maximumpc.com/article/*
// @version        1.0
// ==/UserScript==


var highlightSize = "16px"; //text size
//var highlightColorRed = "#6c8000"; //text color for red column
//var highlightColorBlack = "green"; //text color for black column
var highlightColorRedBg = "#6c8000"; //background color for red column
var highlightColorBlackBg = "green"; //background color for black column

var highlightSize, highlightColorRed, highlightColorRedBg, highlightColorBlack, highlightColorBlackBg

function sort(array, r)
{
  var best = array;
  if (array.length)
  {
    if (r)
    {
      array.sort(function(a,b){return a.split("|")[1] - b.split("|")[1]});
    }
    else
    {
      array.sort(function(a,b){return b.split("|")[1] - a.split("|")[1]});
    }
    var best = new Array(array[0]);
    var a = array[0].split("|")[1];
    for(var i = 1; i < array.length; i++)
    {
      if (a == array[i].split("|")[1])
        best[best.length] = array[i];
      else
        break;
    }
  }
  return best;
}
var c = document.getElementsByClassName("spec-table orange");
if (c.length > 0)
{
  for(var i = 0; i < c.length; i++)
  {
    if (!c[i].parentNode.parentNode.parentNode.getElementsByTagName("span")[0].innerHTML.match(/BENCHMARKS/i))
    {
      continue;
    }
    var tr = c[i].getElementsByTagName("tr");
    if (tr.length > 0)
    {
      for(var t = 0; t < tr.length; t++)
      {
        var td = tr[t].getElementsByTagName("td");
        var d = new Array();
        var skip = false;
        var rever = false;
        if (td.length > 0)
        {
          for(var n = 0; n < td.length; n++)
          {
            if (!n && td[n].className != "item")
              break;
            if (!n)
            {
              var name = td[n].innerHTML.replace(/<\/?[^>]+>/g, "");
              rever = (td[n].innerHTML.match(/(min:sec|[^a-z0-9]sec[^a-z0-9]|\(ns\)|price|TDP)/i));
            }
            if (!skip && (td[n].className == "item-dark" || td[n].className == "item-light" || (n && td[n].className == "item")))
            {
              var s = td[n].getElementsByTagName("strong");
              var reg = (name.match(/(min:sec|[^a-z0-9]sec[^a-z0-9])/i)) ? "[^0-9]" : "[^0-9.]";
              reg = new RegExp(reg, "g");
              var data = td[n].innerHTML.replace(reg, "");
              if (data == "")
                continue;
              if (s.length && s[0].innerHTML.replace(/[^0-9.]/g, "") == data)
              {
                d = [n+"|"+data];
                skip = true;
              }
              else
              {
                var text = td[n].innerHTML.replace(/<\/?[^>]+>/g, "").replace(/[^a-z]/gi, "");
                data = data.replace(/[^0-9.]/g, "");
                if (text == "million")
                {
                  data = data * 1000000;
                }
                if (text == "billion")
                {
                  data = data * 1000000000;
                }
                if (text == "tillion")
                {
                  data = data * 1000000000000;
                }
                d[d.length] = n+"|"+data;
              }
            }
          }
        }
        var best = sort(d, rever);
        for(var a in best)
        {
          n = best[a].split("|")[0];
          if (td[n].className == "item-dark")
          {
            if (highlightColorRed)
              td[n].style.color=highlightColorRed;
            if (highlightColorRedBg)
              td[n].style.backgroundColor=highlightColorRedBg;
          }
          else
          {
            if (highlightColorBlack)
              td[n].style.color=highlightColorBlack;
            if (highlightColorBlackBg)
              td[n].style.backgroundColor=highlightColorBlackBg;
          }
          if (highlightSize);
            td[n].style.fontSize = highlightSize;
          td[n].style.fontWeight = "bold";
        }
      }
    }
  }
}