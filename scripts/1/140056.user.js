// ==UserScript==
// @name              Show ME MY TEAM!
// @namespace	        http://www.github.com/wallace/show_me_my_team
// @description	      Adds a button to hide peeps from other teams.
// @include		http://www.roweapp.com/capacity
// @include		https://www.roweapp.com/capacity
// ==/UserScript==

(function(){
	var btn = document.createElement('a');
	btn.href = 'javascript:void($(".other_teams").toggle())';
	btn.innerHTML = 'Toggle My Team';

	var p = document.createElement('p');
	p.appendChild(btn);

	var legend = $('.legend');

	legend.append(p);

  var my_team = ['Jonathan', 'Andy', 'Charlie', 'Greggory', 'Patrick', 'Steven'];

  var rows = $('#capacity').find('tr');

  $.each(rows, function(index, value) {
    var $first = $(value).find('td.fixed-column');

    // skip to the next element
    if ($first.length === 0) {
      return true;
    }

    var name = $first.text().split(" ")[0];

    console.log('name: ' + name);
    if($.inArray(name, my_team) < 0) {
      console.log('YES name: ' + name);
      $(value).addClass('other_teams');
    }
  });
})();
