// ==UserScript==
// @name        ME3 Challenges
// @namespace   pawelsel
// @include     http://social.bioware.com/n7hq/home/challenges/?name=*&platform=*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

var sheet = function() {
  var style = document.createElement("style");

  style.appendChild(document.createTextNode("table.chlist tr td { padding-left: 5px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.header { height: 60px; font-weight: bold; color: #7998B9; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.name { width: 400px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.count { width: 150px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.points { width: 50px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.golden { color: #FFCD00; font-weight: bold; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.silver { color: #FFFFFF; font-weight: bold; } "));
  style.appendChild(document.createTextNode("table.chlist tr td span { margin: 0 0 0 10px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.golden span { background: none repeat scroll 0 0 #FFCD00; color: #000000; border-radius: 2px; } "));
  style.appendChild(document.createTextNode("table.chlist tr td.silver span { background: none repeat scroll 0 0 #FFFFFF; color: #000000; border-radius: 2px; } "));
  document.head.appendChild(style);
};

var dochallengeinfo = function(type) {
  var s='';
  $($('#challenges').children().get()).each(function(index, elem) { 
    if ($(elem).is(type)) {
      s=$(elem).html();
    }
  });
  return s;
}

var dochallenge = function (type) {
  var g = new Array();
  var ids = '';
  var count = 0;
  $($('#'+type).children().get()).each(function(index, elem) { 
    $($(elem).children().get()).each(function(index1, elem1) {
      if ($(elem1).is("div.goldchallengeitem")) {
        ids = elem1.getAttribute('onClick');
        ids = ids.split('\'')[1];
        if ((ids!='g100')&&(ids!='g104')&&
            (ids!='g606')&&(ids!='g618')&&
            (ids!='g625')&&(ids!='g639')&&
            (ids!='g724')&&(ids!='g726')&&
            (ids!='g733')&&(ids!='g738')) { // Bez Mass Effect, Elity drużynowej i wyzwań weekendowych
          $($(elem1).children().get()).each(function(index2, elem2) {
            if ($(elem2).is("div.golditeminfo")) {
              var sv = new Array();
              var count1 = 0;
            
              $($('#'+ids).children().get()).each(function(indexs, elems) { 
                var name_s = '';
                var name_ss = '';
                var prog_s = '';
                var count_s = '';
                var point_s = '';
                $($(elems).children().get()).each(function(indexs1, elems1) {
                  if ($(elems1).is("ul")) {
                    name_s = $($($(elems1).children().get()[0]).children().get()[0]).html();
                    prog_s = $($(elems1).children().get()[1]).html();
                  }
                  if ($(elems1).is("div.silverinfo")) {
                    count_s = $($(elems1).children().get()[1]).html().split(' ');
                    point_s = $($(elems1).children().get()[2]).html().split(' ');
                    name_ss = $($(elems1).children().get()[3]).html().split(' ');
                  }
                });
                if (name_ss[name_ss.length-1]!='0') {
                  name_s +='<span>x'+name_ss[name_ss.length-1]+'</span>';
                }
                sv[count1]=[name_s,point_s[point_s.length-1],count_s[count_s.length-1],prog_s];
                count1 +=1;
              });
              var count_gt = $($($(elem2).children().get()[2]).children().get()[1]).html();
              var count_g = count_gt.split(' ');
              var points_gt = $($($(elem2).children().get()[2]).children().get()[2]).html();
              var points_g = points_gt.split(' ');
              g[count] = [$($(elem2).children().get()[0]).html(),points_g[points_g.length-1],count_g[count_g.length-1],$($(elem2).children().get()[1]).html(),sv];
              count += 1;
            }
          });
        }
      }
    });
  });

  var s =  '';
  for(var i=0;i<g.length;i++) {
    s += '<tr><td class="golden name">' + g[i][0] + '</td><td class="golden points">' + g[i][1] + '</td><td class="golden count">' + g[i][2] + '</td><td><div class="progressbar">' + g[i][3] + '</div></td></tr>';
    sv = g[i][4];
    for(var j=0;j<sv.length;j++) {
      s += '<tr><td class="silver name">' + sv[j][0] + '</td><td class="silver points">' + sv[j][1] + '</td><td class="silver count">' + sv[j][2] + '</td><td>' + sv[j][3] + '</td></tr>';
    }
  }
  return s;
}

var dotableheader = function () {
  var g_points = '';
  var g_count = '';

  $($('#cat769619').children().get()[0]).each(function(index, elem) { 
    $($(elem).children().get()).each(function(index1, elem1) {
      if ($(elem1).is("div.goldchallengeitem")) {
        $($(elem1).children().get()).each(function(index2, elem2) {
          if ($(elem2).is("div.golditeminfo")) {
            var count_gt = $($($(elem2).children().get()[2]).children().get()[1]).html();
            var count_g = count_gt.split(' ');
            g_count=count_gt.substring(0,count_gt.length-count_g[count_g.length-1].length-2);
            var points_gt = $($($(elem2).children().get()[2]).children().get()[2]).html();
            var points_g = points_gt.split(' ');
            g_points=points_gt.substring(0,points_gt.length-points_g[points_g.length-1].length-2);
          }
        });
      }
    });
  });

  return '<tr><td class="header name">'+dochallengeinfo("h2")+'</td><td class="header points">' + g_points + '</td><td class="header count" colspan="2">' + g_count + '</td></tr>';
}

$(document).ready(function () {
    sheet();
    var t='<div class="lastupdate">';
    t+=dochallengeinfo("div.lastupdate");
    t+='</div><table class="chlist">';
    t+=dotableheader();
    t+=dochallenge('cat769619');
    t+=dochallenge('cat769620');
    t+=dochallenge('cat769621');
    t+='</table><div class="challengewarning">';
    t+=dochallengeinfo("div.challengewarning");
    t+='</div><div class="clear"></div>';
    $('#challenges').html(t);
});