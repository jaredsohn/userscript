// ==UserScript==
// @name          YouTube unlisted uploader
// @namespace     http://www.youtube.com/
// @description   Automatically selects 'Unlisted (anyone with the link can view)' as default privacy option while uploading videos to YouTube
// @include       http://upload.youtube.com/my_videos_upload*
// ==/UserScript==


function check_unlisted() {
    document.getElementById('video-settings-privacy-unlisted').checked = true;
    setTimeout(check_unlisted, 2000);
}
check_unlisted();