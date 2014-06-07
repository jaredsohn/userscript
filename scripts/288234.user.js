// ==UserScript==
// @name           Trello Team Planning
// @namespace      trello
// @description    Shows a weekly team commitment report in sidebar 
// @include        https://trello.com/b/*
// ==/UserScript==
var refresh;

Date.prototype.getWeek = function() {
  var dayNr, firstThursday, target;
  target = new Date(this.valueOf());
  dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

refresh = function() {
  var boardId, key, reportUrl, token, weekNumber;
  key = "XXX";
  token = "YYY";
  weekNumber = new Date().getWeek();
  boardId = document.location.href.match(/\/b\/([^\/]+)/)[1];
  reportUrl = "https://trello-team-planning.herokuapp.com/commitment_report.json?key=" + key + "&token=" + token + "&board_id=" + boardId + "&week=" + weekNumber + "&callback=?";
  return $.getJSON(reportUrl).done(function(result) {
    var $content, $widget, avatar_url, hours, member, name, project, projects, totalHours, user, _ref;
    $widget = $("<div>\n  <hr/>\n  <div class=\"board-widget clearfix\">\n    <div class=\"board-widget-title\"><h3>\n      Commitments Week " + weekNumber + "\n      <a href=\"#\" role=\"refresh\"><span class=\"icon-sm icon-reopen\"></span></a>\n    </h3></div>\n    <div class=\"board-widget-content board-actions-list fancy-scrollbar\" style=\"max-height: 400px\">\n      <div role=\"commitments\"></div>\n    </div>\n  </div>\n</div>").insertAfter(".board-widget.board-widget-members");
    $content = $widget.find(".board-widget-content [role=commitments]");
    $widget.find("[role=refresh]").click(function() {
      $widget.remove();
      return refresh();
    });
    _ref = result['total'];
    for (user in _ref) {
      totalHours = _ref[user];
      member = result['members'][user];
      avatar_url = member ? member['small_avatar_url'] : null;
      name = member['full_name'];
      projects = (function() {
        var _ref1, _results;
        _ref1 = result['per_member'][user];
        _results = [];
        for (project in _ref1) {
          hours = _ref1[project];
          _results.push("<li><strong>" + project + "</strong>: " + hours + "h</li>");
        }
        return _results;
      })();
      $content.append("<div class=\"phenom clearfix\">\n  <div class=\"creator member\">\n    <img class=\"member-avatar\" height=\"30\" width=\"30\" src=\"" + avatar_url + "\"/>\n  </div>\n  <div class=\"phenom-desc\">\n    <strong>" + name + "</strong>: " + totalHours + "h\n    <ul>" + (projects.join("")) + "</ul>\n  </div>\n</div>");
    }
    $(unsafeWindow).resize();
  });
};

refresh();