// ==UserScript==
// @name        Toggl - Time Overlap Pack
// @namespace   TimeOverlapPack
// @include     https://www.toggl.com/tasks
// @version     1.0
// ==/UserScript==


var inProgress = false;

function detectOverlappingTimeEntries() {

    if ($('span.start-stop-container.clickable.opens-time-entry').length == 0) {
        setTimeout(detectOverlappingTimeEntries, 1000);
    }
    else {
        var arrayOfTimeEntries = [];

        $('.dateheader').each(function () {
            var nodesLength = this.children.length;

            for (var i = 0; i < nodesLength; i++) {

                var timeFromTo = { wholeTime: $(this.children[i]).children('.right').children('.start-stop-container').html() }

                if (timeFromTo.wholeTime != null) {
                    var obj = {
                        id: $(this.children[i]).attr('id'),
                        title: $(this.children[i].children[1].children[0].children[1]).attr('title'),
                        date: getDate($(this).attr('id')),
                        starttime: getStartTime(timeFromTo.wholeTime),
                        endtime: getEndTime(timeFromTo.wholeTime)
                    }

                    arrayOfTimeEntries.push(obj);
                }
            }


            // comparison logic
            for (var i = arrayOfTimeEntries.length - 1; i > 0; i--) {
                var obj = arrayOfTimeEntries[i];

                var nextobj = arrayOfTimeEntries[i - 1];

                var activeObject = $(".clearer.task.hidden");

                var activeStartTime = $($(".task-time-start")[2]).val();
                var activeEndTime = $($(".task-time-stop")[2]).val();
                var activeDate = $($(".task-date-start")[2]).val();
                var active

                if (nextobj != null && obj != null) {
                    if (obj.endtime > nextobj.starttime || activeStartTime != "" && activeStartTime < obj.endtime && activeDate == obj.date) {
                        // before $('#' + obj.id).prepend('<div style=" ...
                        $('.tasktimer-subtitle').prepend('<div style="color: red; font-weight: bold; margin-bottom: 30px; padding-top: 10px" id="overlapEntry' + obj.id + '"><div class="left"></div><div>## Überlappende Zeiteinträge ## </br>' + 'Eintrag: ' + obj.title + '</br>' + 'Datum: ' + obj.date + '</br>' + 'Zeit: ' + obj.starttime + ' – ' + obj.endtime + '</div><div class="right"></div></div>');
                        $('input.left').css('margin-bottom', '6px');
                        inProgress = true;
                    }
                    else {
                        if (inProgress == true) {
                            $('#overlapEntry' + nextobj.id).remove();

                            if (activeObject[0] != null) {
                                activeObject[0].children[2].children[2].innerHTML = activeStartTime + '–' + activeEndTime;
                                for (var i = 0; i < arrayOfTimeEntries.length; i++) {
                                    if (arrayOfTimeEntries[i].id == activeObject[0].id) {
                                        arrayOfTimeEntries[i].starttime = activeStartTime;
                                        arrayOfTimeEntries[i].endtime = activeEndTime;
                                    }
                                }
                            }

                            inProgress = false;
                        }
                    }
                }
            }

            arrayOfTimeEntries = [];
        });
    }
}

function getStartTime(time) {
    var timeArray = time.split("–");
    var starttime = timeArray[0];
    return starttime;
}

function getEndTime(time) {
    var timeArray = time.split("–");
    var endtime = timeArray[1];
    return endtime;
}

function getDate(date) {
    var dateArray = date.split("_");
    var newdate = dateArray[1];
    var yearSplit = newdate.split("");
    var year = yearSplit[0] + yearSplit[1] + yearSplit[2] + yearSplit[3];
    var month = yearSplit[4] + yearSplit[5];
    var day = yearSplit[6] + yearSplit[7];
    var newDateFormated = day + '.' + month + '.' + year;
    return newDateFormated;
}


$(document).ready(function () {
    detectOverlappingTimeEntries();

    $(document).on('change', function () {
        inProgress = true;
        detectOverlappingTimeEntries();
    });

    $('.delete-old-task').on("click", function () {
        var form = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

        for (var i = 0; i < form.children.length; i++) {
            var activeObject = $(".clearer.task.hidden");
            var activeStartTime = $($(".task-time-start")[2]).val();
            var activeEndTime = $($(".task-time-stop")[2]).val();
            var activeDate = $($(".task-date-start")[2]).val();

            var timeFromTo = { wholeTime: $(form.children[i]).children('.right').children('.start-stop-container').html() }
            var obj = {
                id: form.children[i].id,
                starttime: getStartTime(timeFromTo.wholeTime),
                endtime: getEndTime(timeFromTo.wholeTime)
            }

            $('[id*=overlapEntry]').each(function () {
                var timeArray = this.children[1].childNodes[6].wholeText.split(" ");
                if (activeStartTime < timeArray[3]) {
                    $(this).remove();
                }
            });
        }
    });
});
    
