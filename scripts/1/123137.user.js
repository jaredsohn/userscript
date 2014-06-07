// ==UserScript==
// @name          hörsport (hoersport.de) - Sync exercise explanation with player position
// @namespace     http://userscripts.org/users/nkn
// @description   This script automatically selects the exercise in the exercise list relative to the current position of the workout player. With this script, the explanatory images can be viewed more easily while performing the exercise.
// @include       http://www.hoersport.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       0.13
// @date          2012-01-17
// @author        Nicolas Knaebel (nicolas.knaebel@googlemail.com)
// @license       Public Domain
// ==/UserScript==

// --- BEGIN --- User configuration options.
var scrollToExerciseListOnPlay = true;          // Default: Scroll to list on play.
var syncPlayerAndExerciseListInterval = 500;    // Default: Sync every 500ms = 0.5s.
// --- END --- User configuration options.

// GENERAL IDEA OF THIS SCRIPT AND STEPS IT PERFORMS:
// _ Wait until exercise/time metadata is available and accordion widget has been built.
// _ Collect exercise metadata and assign click handlers to exercises in the exercise list.
// _ For position->exercise sync, start a timer which periodically calls an event handler.
// _ In the event handler, find the current/new exercise in the metadata, according to the 
//   current position of the SoundManager2 widget (i.e. the workout player).
// _ Then, change the selected exercise in the exercise list and switch the carousel item containg the explanatory images, based on the results of the metadata search.

// Interval ID of the ready timer, to stop it after SoundManager2 widget is ready.
var readyIntervalID = 0;

// Array with exercise times for comparison and easy lookahead.
var exerciseTimes = [];

// Map of time->exercise-uid
var timeToExerciseMap = null;                   // Created later by buildTimeToExerciseMap().

// Scroll behavior state; changes with play/pause state.
var shouldFocusOnTrainingPrev = true;

// Interval ID of the sync timer, to check if it has been created.
var syncTimerIntervalID = 0;

// Current exercise-uid to avoid unnecessary display changes.
var currentExerciseUID = '';

var playButtonHandler = function() {    
    if (scrollToExerciseListOnPlay) {
        focusTrainingPreview();
        
        // Change with play/pause state; don't trigger scroll when pausing.
        shouldFocusOnTrainingPrev = !shouldFocusOnTrainingPrev;        
    }
};

function expandExerciseTables() {
    // Make the accordion widget items (warmup, workout, stretch) always visible
    // by adding fake classes for configuration. Also, the size of the elements
    // is set to automatically stretch based on its contents.
    $('.yui3-accordion-item').addClass('yui3-accordion-item-alwaysvisible yui3-accordion-item-contentheight-stretch');
    
    // Adjust the height of the div which contains the accordion widget.
    var height = $('#accordionExercises').height();
    height = height * 1.4;
    $('#trainingPreview').height(height);
}

function focusTrainingPreview() {
    if (shouldFocusOnTrainingPrev) {
        // Trigger animated scroll to #trainingPreview div.
        $('html, body').animate({ scrollTop: $('#trainingPreview').offset().top }, 2000);          
    }   
}

function hookPlayButton() {
    $('.play-button').click(playButtonHandler);   
}

function buildTimeToExerciseMap() {
    if (timeToExerciseMap == null) {
        timeToExerciseMap = new Object();
        
        var i = 0;
        $('div.metadata div.timePoints ul li').each(function() {
                var exerciseUID = $(this).children('p').attr('exercise-uid');
                var timePoint = $(this).children('span').text();
                
                // Make sure to skip 'Willkommen' chapter, it has no timepoint.
                if (exerciseUID != null) {
                    // Assign click handler for exercise->position sync.
                    var exerciseTimeInMs = getMillisecondsFromTimePoint(timePoint);
                    $('tr#' + exerciseUID + ' td.exerciseName').click(function() {
                            // Set the position of the workout player to the exercise.
                            unsafeWindow.soundManager.setPosition('pagePlayerMP3Sound0', exerciseTimeInMs);
                            
                            // No sync right away necessary, because the carousel item
                            // is switched by the accordion click event handler.
                        }
                    );
                    
                    // Populate map and array for position->exercise sync.
                    var exerciseTime = createTimeFromTimePoint(timePoint);
                    timeToExerciseMap[exerciseTime] = exerciseUID;
                    exerciseTimes[i] = exerciseTime;
                    
                    i++;
                }
            }
        );
    }
}

function getMinutesFromTimePoint(timePoint) {
    return timePoint.substr(0, timePoint.indexOf(':'));
}

function getSecondsFromTimePoint(timePoint) {
    return timePoint.substr(timePoint.indexOf(':') + 1, timePoint.length);
}

function getMillisecondsFromTimePoint(timePoint) {
    var minutesInMs = getMinutesFromTimePoint(timePoint) * 60 * 1000;
    var secondsInMs = getSecondsFromTimePoint(timePoint) * 1000;
    
    return (minutesInMs + secondsInMs);
}

function createTimeFromTimePoint(timePoint) {
    // Get Date instance with current date and time.
    var date = new Date();
    
    // Clear time attributes.
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    
    // Use fixed date of 1970-01-01, because getTime() also depends on a date.
    date.setDate(1);
    date.setMonth(0);
    date.setYear(1970);
    
    // Determine minutes + seconds and set them.
    var minutes = getMinutesFromTimePoint(timePoint);
    var seconds = getSecondsFromTimePoint(timePoint);
    date.setSeconds(seconds);
    date.setMinutes(minutes);
    
    // Return time for easy comparison.
    return date.getTime();
}

function getWorkoutTime() {
    var workoutTime = $('#sm2_timing span.sm2_position').text().substr(3);
    
    // If player hasn't updated its time yet, return 0:00.
    if (workoutTime == '-:--') {
        workoutTime = '0:00';    
    }
    
    return workoutTime;
}

function setupPlayerExerciseSyncTimer() {
    // Setup and start only once.
    if (syncTimerIntervalID == 0) {
        syncTimerIntervalID = window.setInterval(handlePlayerExerciseSync, syncPlayerAndExerciseListInterval);
        
        // Sync once right away.
        handlePlayerExerciseSync();
    }
}

function getExerciseUIDbyTime(time) {
    var exerciseUID = '';
    var exerciseTimePoint = null;
    var nextExerciseTimePoint = null;

    var i = 0;
    for (i = 0; i < exerciseTimes.length; i++) {
        exerciseTimePoint = exerciseTimes[i];
        nextExerciseTimePoint = exerciseTimes[i + 1];
        
        if (nextExerciseTimePoint != null) {
            if (time < nextExerciseTimePoint) {
                // Found the current exercise, return it.
                exerciseUID = timeToExerciseMap[exerciseTimePoint];
                break;
            } else {
                // Look further, advance to next loop.
            }
        } else {
            // If we looked this far ahead, we're at the end of the workout,
            // so return the last found exercise UID.
            exerciseUID = timeToExerciseMap[exerciseTimePoint];
        }
    }

    return exerciseUID;
}

function handlePlayerExerciseSync() {
    var time = createTimeFromTimePoint(getWorkoutTime());
    var newExerciseUID = getExerciseUIDbyTime(time);
    
    // Has the exercise changed? If yes, change the selection + image container display.
    if (newExerciseUID != currentExerciseUID) {
        // Select the current exercise in the list
        $('#trainingPreview tr.selected').removeClass('selected');
        $('#' + newExerciseUID).addClass('selected');
                
        // Select the appropriate carousel item with the explanatory images animation.
        // Modified from the hörsport-provided displayCarouselContentByUniqueName()
        // function, because the function changes the expansion state of the list.
        // 
        // [Use 'unsafeWindow' to access the original page's JS environment from GM.]
        unsafeWindow.currentSelectedRow = unsafeWindow.auiA.one('tr#' + newExerciseUID);
        unsafeWindow.selectExerciseFromAccordionRow(unsafeWindow.currentSelectedRow, unsafeWindow.auiA);
        
        currentExerciseUID = newExerciseUID;
    }
}

function isWorkoutPage() {
    // Check for timing element of workout player.
    return $('#sm2_timing span.sm2_position').length;
}

function isFeedbackPage() {
    // Check for 'Feedback abschicken' button.
    return $('input#buttonNextPage[value="Feedback abschicken"]').length;
}

function isMetadataAvailable() {
    // Check if metadata div contains any list elements.
    return $('div.metadata div.timePoints ul li').length;
}

function hasAccordionSelectedDefaultExercise() {
    // Check if exercise list has any selected exercise.
    return $('#trainingPreview tr.selected').length;
}

if (isWorkoutPage() && !isFeedbackPage()) { 
    // No need to wait until the DOM is ready, because we need to modify the
    // attributes of the accordion widget's HTML elements to resize it.
    expandExerciseTables();    
    
    // Then, wait for the DOM to be ready before starting the sync.
    $(document).ready(function() {  
        // Wait until exercise/time metadata is available, and accordion widget 
        // has been completely built and it has selected its default exercise.
        // [Re-check state every 100ms with a timer.]
        readyIntervalID = setInterval(function() {
            if (isMetadataAvailable() && hasAccordionSelectedDefaultExercise()) {
                clearInterval(readyIntervalID);
                
                // Initialize and start the sync.
                hookPlayButton();
                buildTimeToExerciseMap();            
                setupPlayerExerciseSyncTimer();               
            }
        }, 100);
    });
}
