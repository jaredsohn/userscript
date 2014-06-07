// ==UserScript==
// @name        Memrise - courses in category water list
// @description Append all courses which are intended for watering and have more then 5 items to water into category on home screen
// @match       http://www.memrise.com/home/
// @version     0.1
// @updateURL   https://userscripts.org/scripts/source/287574.meta.js
// @downloadURL https://userscripts.org/scripts/source/287574.user.js
// ==/UserScript==

var onLoad = function($) {
    $.fn.extend({
        cbcss: function( name, value ) {
            return $(this).css(name, value).css('-webkit-' + name, value);
        }
    });
    
	var categories = [];
    
    function Category(id, name) {
        this.id = id;
        this.name = name;
        this.courses = [];
    }

    function Course(id, name, wateringCount, wateringUrl) {
        this.id = id;
        this.name = name;
        this.wateringCount = wateringCount;
        this.wateringUrl = wateringUrl;
    }
    
    $.get("http://www.memrise.com/home/courses/", function(data) {
    	$.get("http://www.memrise.com/api/course/learning/?with_progress=true", function(apiData) {
            $(data).find('.category-courses-list').each(function(categoryIdx, categoryElement) {
                var category = new Category($(categoryElement).children('h2').children('img').attr('src'), $(categoryElement).children('h2').text().trim());
                $(categoryElement).children('.course-progress-box-container').children('.row-fluid').children('.course-progress-box').each(function(courseIdx, courseElement) {
                    var courseId = $(courseElement).attr("data-course-id");
                    var apiCourse = $.grep(apiData.courses, function(apiCourse) {
                        return apiCourse.id == courseId;
                    })[0];
                    var course = new Course(courseId, apiCourse.name, apiCourse.num_ready_to_water, apiCourse.url + "garden/water/")
                    category.courses.push(course);
                });
                categories.push(category);
            });
            function addCourseTo(categoryElement) {
                var categoryId = $(categoryElement).children('h3').children('img').attr('src');
                var category = $.grep(categories, function(category) {
                    return category.id == categoryId;
                })[0];
                $(categoryElement).append($('<div style="clear:both;">'));
                var div = $('<div>').css('margin', "5px 70px 5px 20px").cbcss('column-count', "3");
                $.each($.grep(category.courses, function(course) {
                    return course.wateringCount >= 5;
                }), function(courseIdx, course) {
                    $(div).append($('<div>').css('border-style', "solid").css('border-width', "1px").css('border-color', "#C6C6C6").css('border-radius', "5px")
                    .css('padding', "3px").css('margin-bottom', "3px").css('text-align', "center").css('background-color', "#E2E2E2").cbcss('column-break-inside', "avoid").append(
                        $('<a>').attr('href', course.wateringUrl).html(course.name + " (" + course.wateringCount + ")")).append($('<br />')
                    ));
                });
                if ($(div).children("div").length > 0)
                	$(categoryElement).append(div);
                else
                	$(categoryElement).hide();
            }
            $('.water-categories-wrap').on("DOMNodeInserted", function(ev) {
                if (ev.srcElement instanceof HTMLLIElement) {
                    addCourseTo(ev.srcElement);
                }
            });
            $('.water-categories-wrap > ul.water-categories > li').each(function(categoryIdx, categoryElement) {
                addCourseTo(categoryElement);
            });
        });
    }, "html");
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};

injectWithJQ(onLoad);