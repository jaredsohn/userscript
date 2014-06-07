// ==UserScript==
// @namespace http://www.novius-labs.com
// @name Agile my Basecamp: sum points and themes filter
// @version 1.0
// @description Based on http://www.deeson.co.uk/online/labs/agile-my-basecamp. Pattern: Points | Theme | Task name 
// @include https://*.basecamphq.com/projects/*/todo_lists
// @include https://*.basecamphq.com/projects/*/todo_lists/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var agileMyTodo = function() {
		var story_point_regex = /^([0-9]+(?:\.[0-9]*)?) \|/,
			sum_point_regex = /\| (\d)*/,
			iteration_title_regex = /^--------------------/,
			theme_regex = /\| ([\w| |\-]*) \|/;

		$('.list_wrapper').each(function(index) {
			var $listWrapper = $(this),
				points = 0,
				iteration_points = 0,
				$iteration_ref = false,
				themes = [],
				updateSumPoints = function($title, value) {
					if (sum_point_regex.exec($title.text())) {
						$title.text($title.text().replace(sum_point_regex, " | " + value));
					} else {
						$title.append(" | " + value);
					}
				};

			$listWrapper.find('.items > .item_wrapper').each(function (index) {
				var $item_wrapper = $(this),
					record = $item_wrapper.attr('record'),
					$iteration_el = $item_wrapper.find('span#item_wrap_' + record),
					task_text = $iteration_el.text();

				// Get themes
				var reg_op = theme_regex.exec(task_text);
				if (reg_op != null) {
					if ($.inArray(RegExp.$1, themes) < 0) {
						themes.push(RegExp.$1);
					}
				}

				// Sum points
				var reg_op = story_point_regex.exec(task_text);

				if (reg_op != null) {
					var point = parseFloat(reg_op[1]);
					points += point;
					if ($iteration_ref) {
						iteration_points += point;
					}
				} else {
					if (task_text.match(iteration_title_regex)) {
						if ($iteration_ref) {
							updateSumPoints($iteration_ref, iteration_points);
						}
						$iteration_ref = $iteration_el;
						iteration_points = 0;
					}
				}
			});

			if (points > 0) {
				var $title = $listWrapper.find('.list_title > h2 > span :first');
				updateSumPoints($title, points);
			}

			if ($iteration_ref && iteration_points > 0) {
				updateSumPoints($iteration_ref, iteration_points);
			}

			// Filters
			$listWrapper.find('select.themes').remove();
			if (themes.length) {
				var all = 'THEMES - All',
					select = $('<select></select> ');

				themes.sort();
				themes.unshift(all);
				$.each(themes, function(index, theme) {
					$('<option></option>').text(theme)
						.val(theme)
						.appendTo(select);
				});

				select.css({
					display : 'block',
					marginTop : '5px;'
				})
					.addClass('themes')
					.change(function(e) {
						var selected_theme = $(this).find('option:selected').val();

						$listWrapper.find('div.item_wrapper').show();
						if (selected_theme != all) {
							$listWrapper.find('div.item_wrapper:not(:contains("| ' + selected_theme + ' |"))').hide();
						}
					})
					.appendTo($listWrapper.find('p.listdesc:last'));

				$iteration_ref = false;
				iteration_points = 0;
			}
		});
	};

agileMyTodo();

$(".page_header > h1").prepend("Agile ");

$('<a href="#">Refresh agile</a>')
	.click(function(e) {
		e.preventDefault();
		$('div.items_wrapper div.item_wrapper').show(); // in case a filter with a theme selected is removed
		agileMyTodo();
	})
	.appendTo(".page_header_links");
