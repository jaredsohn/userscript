// ==UserScript==
// @name        The West - Bonus Jobs Viewer
// @author      neversleep1911 (neversleep1911@mail.ru)
// @description Helps to search bonus jobs
// @include     http://*.the-west.*/game.php*
// @version     1.2
// ==/UserScript==

(function(func) {
    var script = document.createElement("script");
    script.setAttribute("type", "application/javascript");
    script.textContent = "(" + func.toString() + ")();";
    document.body.appendChild(script);
    document.body.removeChild(script);
}(function() {
	var BonusJobs = {};

	BonusJobs.data = {
		langs: {
			ru_RU: {
				title: "Bonus Jobs Viewer",
				openJobWindow: "Открыть",
				showJobOnTheMap: "Показать на карте",
				jobFilter: "Фильтр",
				jobsFound: "Найдено %d работ",
				loadingJobs: "Загрузка...",
				findJobOnTheMinimap: "Найти выбранную работу на миникарте"
			},

			en_US: {
				title: "Bonus Jobs Viewer",
				openJobWindow: "Open",
				showJobOnTheMap: "Show on the map",
				jobFilter: "Filter",
				jobsFound: "Found %d jobs",
				loadingJobs: "Loading...",
				findJobOnTheMinimap: "Find selected job on the minimap"
			}
		},

		images: {
			button: "data:image/png;base64,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"
		},
	};

	BonusJobs.jobList = [];
	BonusJobs.lang = null;
	BonusJobs.location = null;

	BonusJobs.gui = {
		window: null,
		content: null,
		selJobFilter: {
			el: null,
			selected: function() {
				return this.el.prop("options")[this.el.prop("selectedIndex")];
			}
		}
	};

	BonusJobs.hook = {};
	BonusJobs.hook.init = function() {
		var Map_Data_importData = Map.Data.importData;
		Map.Data.importData = function(rawData) {
			Map_Data_importData(rawData);
			BonusJobs.gui.updateJobs();
		}
	}

	BonusJobs.init = function() {
		BonusJobs.lang = function() {
			for (var lang in BonusJobs.data.langs) {
				if (Game.locale.toLowerCase() == lang.toLowerCase())
					return BonusJobs.data.langs[lang];
			}
			return BonusJobs.data.langs.en_US;
		}();

		BonusJobs.location = /(http:\/\/[\w\d]+\.the\-west\.\w+\/).*/i.exec(window.location.href)[1];

		BonusJobs.gui.init();
		BonusJobs.hook.init();
	}

	BonusJobs.parseFeatured = function() {
		var result = [];
		var featured = Map.JobHandler.Featured;
		for (var pos in featured) {
			for (var jobId in featured[pos]) {
				var job = JobList.getJobById(jobId);
				job.x = featured[pos][jobId].x;
				job.y = featured[pos][jobId].y;
				job.silver = featured[pos][jobId].silver;

				result.push(function() {
					return {
						id: job.id,
						x: job.x,
						y: job.y,
						distance: Map.calcWayTime(Character.position, job),
						name: job.name,
						silver: job.silver,
						canDo: job.canDo(),
						image: BonusJobs.location + "/images/jobs/" + job.shortname + ".png"
					};
				}());
			}
		}
		result.sort(function(a, b) {
			return a.distance - b.distance;
		});
		return result;
	}

	BonusJobs.gui.init = function() {
		var button = $("<div title='" + BonusJobs.lang.title + "' class='menulink' />").css("background-image", "url(" + BonusJobs.data.images.button + ")");
		button.hover(
			function() { button.css("background-position", "-25px 0px"); },
			function() { button.css("background-position", "0px 0px"); }
		);
		button.click(BonusJobs.gui.showMainWindow);

		$("div#ui_menubar").append($("<div class='ui_menucontainer' />").append(button).append("<div class='menucontainer_bottom' />"));

		wman.registerReloadHandler(/^tw-bjv-mainwindow$/, function() {
			BonusJobs.gui.selJobFilter.el.prop("selectedIndex", 0);
			BonusJobs.gui.updateJobs();
		});
	}

	BonusJobs.gui.showMainWindow = function() {
		var maindiv = $("<div id='tw-bjv-content' style='width: 690px; margin-left: 5px;' />");
		var footer = $("<div id='tw-bjv-footer' style='width: 690px; height: 24px; line-height: 24px; vertical-align: middle; margin-left: 5px;' />");
		(new tw2gui.groupframe("tw-bjv-group", "<div id='tw-bjv-list' style='height: 321px;' />")).appendTo(maindiv);

		footer.append($("<span>" + BonusJobs.lang.jobFilter + ":</span>"
						+ "&nbsp;<select id='tw-bjv-filter' style='width: 221px; height: 21px' disabled />"
						+ "&nbsp;<span id='tw-bjv-mmap-open' style='cursor: pointer' title='" + BonusJobs.lang.findJobOnTheMinimap + "'><img src='" + BonusJobs.location + "/images/icons/compass.png" +  "' /></span>"
						+ "&nbsp;|&nbsp;<span id='tw-bjv-jobs-found'>" + BonusJobs.lang.jobsFound.replace("%d", 0) + "</span>"
		));

		BonusJobs.gui.content = new tw2gui.scrollpane();
		BonusJobs.gui.selJobFilter.el = $("select#tw-bjv-filter", footer);
		BonusJobs.gui.selJobFilter.el.append($("<option />").text(BonusJobs.lang.loadingJobs).val(0));
		BonusJobs.gui.selJobFilter.el.change(function() {
			BonusJobs.gui.updateJobs();
			BonusJobs.gui.content.scrollTo(0, 0);
		});

		$("div#tw-bjv-list", maindiv).append(BonusJobs.gui.content.getMainDiv());

		$("span#tw-bjv-mmap-open", footer).click(function() {
			var option = BonusJobs.gui.selJobFilter.selected();
			if (parseInt(option.value) != 0) {
				MinimapWindow.resetSearchContext();
				MinimapWindow.open(option.text);
			}
		});

		BonusJobs.gui.window = wman.open("tw-bjv-mainwindow").
							setTitle(BonusJobs.lang.title).
							setMiniTitle(BonusJobs.lang.title).
							appendToContentPane(maindiv).
							appendToContentPane(footer).
							addEventListener("WINDOW_DESTROY", function() {
								BonusJobs.gui.window = null;
							});

		BonusJobs.gui.loadJobs();
		BonusJobs.gui.updateJobs();
	}

	BonusJobs.gui.loadJobs = function() {
		var addOptions = function() {
			if (BonusJobs.gui.window != null) {
				BonusJobs.gui.selJobFilter.el.prop("options")[0].text = "-";
				BonusJobs.gui.selJobFilter.el.removeAttr("disabled");

				for (var i = 0; i < BonusJobs.jobList.length; i++) {
					var job = BonusJobs.jobList[i];
					BonusJobs.gui.selJobFilter.el.append($("<option />").text(job.name).val(job.id));
				}
			}
		}

		if (BonusJobs.jobList.length > 0) {
			addOptions();
			return;
		}

		Ajax.get("map", "get_minimap", {}, function(json) {
			for (var groupId in json.job_groups) {
				var jobGroup = JobList.getJobsByGroupId(groupId);
				for (var i = 0; i < jobGroup.length; i++) {
					BonusJobs.jobList.push({
						id: jobGroup[i].id,
						name: jobGroup[i].name
					});
				}
			}

			var strcmp = function(s1, s2) {
				if (s1 < s2)
					return -1;
				else if (s1 > s2)
					return 1;
				else
					return 0;
			}

			BonusJobs.jobList.sort(function(a, b) {
				return strcmp(a.name.toLowerCase(), b.name.toLowerCase());
			});

			addOptions();
		});
	}

	BonusJobs.gui.updateJobs = function() {
		if (BonusJobs.gui.window == null)
			return;

		BonusJobs.gui.content.getContentPane().empty();

		var filter = parseInt(BonusJobs.gui.selJobFilter.selected().value);
		var jobs = BonusJobs.parseFeatured();
		for (var i = 0; i < jobs.length; i++) {
			var job = jobs[i];

			if (filter != 0 && job.id != filter)
				continue;

			var item = $("<div style='height: 60px; margin: 8px;' />");
			item.append($("<div class='job' style='position: relative; left: 0; top: 4px; float: left;' title='" + BonusJobs.lang.openJobWindow + "'><div class='featured " + (job.silver ? "silver" : "gold") + "'  /><img src='" + job.image + "' class='job_icon' /></div>")
						.click(function(id, x, y) {
								return function() {
									JobWindow.open(id, x, y);
								}
						}(job.id, job.x, job.y)));

			item.append($("<a href='javascript:Map.center(" + job.x + ", " + job.y + ");' style='line-height: 60px; display: block; margin-left: 6px; float: left;' title='" +  BonusJobs.lang.showJobOnTheMap + "'>" + (job.canDo ? "<b>" : "") + job.name +  " (" +  job.distance.formatDuration() + ")" + (job.canDo ? "</b>" : "") + "</a>"));

			BonusJobs.gui.content.appendContent(item);
			BonusJobs.gui.content.appendContent($("<hr />"));
		}
		$("span#tw-bjv-jobs-found").empty().append(BonusJobs.lang.jobsFound.replace("%d", jobs.length));
	}

	$(document).ready(BonusJobs.init);
}));
