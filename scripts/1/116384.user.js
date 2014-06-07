// ==UserScript==
// @name			Facebook HD Video Downloader
// @description		Adds a download link for Facebook videos. Works for HD videos as of October 2011.
// @author			styfle
// @include     http://facebook.com/photo.php*
// @include     http://*.facebook.com/photo.php*
// @include     https://facebook.com/photo.php*
// @include     https://*.facebook.com/photo.php*
// @include     http://facebook.com/video/*
// @include     http://*.facebook.com/video/*
// @include     https://facebook.com/video/*
// @include     https://*.facebook.com/video/*
// ==/UserScript==

setTimeout(function () {
    // Get the side bar so we can append to it later
    var sidebar = document.getElementById('fbPhotoPageActions');

    // Get all the <embed> elements
    var embedElements = document.querySelectorAll('embed[flashvars]');

    // Flag if we found the video url or not
    var found = false;

    for (var i = 0; i < embedElements.length; i++) {
        // Get the flashvars attribute and decode it
        var flashvars = decodeURIComponent(embedElements[i].getAttribute('flashvars'));

        // Check if this string contains the code we're looking for
        var hd_src_index = flashvars.indexOf('hd_src');
        var p_width_index = flashvars.indexOf('&width=');
        if (hd_src_index > -1 && p_width_index > -1) {
            // This string contains the payload we are looking for so parse it
            var obj = JSON.parse(flashvars.slice(7, p_width_index));
            var video_data = obj.video_data[0];

            // High Def
            var hd_link = document.createElement('a');
            hd_link.href = video_data.hd_src;
            hd_link.innerHTML = 'Download HD Video';
            hd_link.className = 'fbPhotosPhotoActionsItem';
            hd_link.download = video_data.video_id + '_hd.mp4';

            // Low Def
            var sd_link = document.createElement('a');
            sd_link.href = video_data.sd_src;
            sd_link.innerHTML = 'Download SD Video';
            sd_link.className = 'fbPhotosPhotoActionsItem';
            sd_link.download = video_data.video_id + '_sd.mp4';

            // Append both links
            sidebar.appendChild(hd_link);
            sidebar.appendChild(sd_link);

            found = true;
        } // end if

    } // end loop

    if (!found) {
        var not_found = document.createElement('span');
        not_found.innerHTML = 'No download link :(';
        sidebar.appendChild(not_found);
    }

}, 2000);