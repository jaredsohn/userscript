// ==UserScript==
// @name           Abs Diet Exercise Images
// @namespace      absdiet
// @description    Adds images for each exercise
// @include        http://www.absdietonlineprogram.com/www/exercise/workout/Print.aspx*
// ==/UserScript==

(function() {
    var addImages = function() {
        var allRows, thisRow, cell, img, exerciseName, i;

        // If there are already some exercise images then don't add any more. This short-circuits this function each time
        // it runs if the images are already present. The function needs to run frequently in order to handle all cases
        // of Ajax replacement of the page content.
        if (document.getElementById('exerciseImage0')) {
            return;
        }

        allRows = document.evaluate(
            "//tr[@class='PrintMainMajor']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


        for (i = 0; i < allRows.snapshotLength; i++) {
            thisRow = allRows.snapshotItem(i);
            cell = thisRow.cells[1];
            exerciseName = cell.textContent;

            // Add an image for this exercise. To make the file name, lowercase the exercise name and 
            // remove all non-alphanumeric characters.
            img = document.createElement('img');
            img.src = 'http://www.jeanneyan.com/absdiet/' + exerciseName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.jpg';
            img.id = 'exerciseImage' + i;

            // Add a break tag after the exercise name
            cell.appendChild(document.createElement('br'));
            cell.appendChild(img);
        }
    };

    // Run once on page load
    addImages();

    // The function needs to run frequently in order to handle all cases of Ajax replacement of the page content.
    setInterval(addImages, 1000);
})();
