// ==UserScript==
// @name           One-click scrobbling on Hype Machine
// @description Places an icon by the player on HypeM that shows you whether scrobbling is on/off and lets you toggle it with one click.
// @namespace      http://rixth.org/
// @include        http://hypem.com/*
// @include        http://www.hypem.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// needs some caching

$(document).ready(function() {
  if (!$('#menu-item-username').size())
    return;
  
  var onIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDk2OUE5NzM5OTJBMTFERkJGODZBMDNGNEZGMzE5OTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDk2OUE5NzQ5OTJBMTFERkJGODZBMDNGNEZGMzE5OTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowOTY5QTk3MTk5MkExMURGQkY4NkEwM0Y0RkYzMTk5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOTY5QTk3Mjk5MkExMURGQkY4NkEwM0Y0RkYzMTk5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtYiyFEAAANRSURBVHjabFNbTBRXGP7OOTN7G5ZdWdAtXQUheEOMASyp1WokYEW8EOPdYGNrUo0P7ZtJWzXxoUlrH2qaWBt8UhtSYrzExERT7EO9EIMgK0ZBcY2AsAu4u8PujDM7Mz072oSq5/Gc//++//v+7xDLsjD19FeuKXKWlXzpmF9az/LzQoRRaiTkmNYfuaH1PmopvX2pc2o9mQowvP6Lr1xN9T86Soq8IARWJvO6SGCwCIURHTPly+2/qF09B8u6r2r/A2hr2PZd4/69R3WnCCuVBrLX5A3yGw7icoIwhuSla3+m/+nYzkFMIfuwd3Z5w7HvDx3VVBXGRJw3mMhOQJgwBcSClZRBRBGeZUu26MMj3fz2ByoQQprrPvtWFERoo2NgPi8cc0shFAZhKhwwIcNITnIJBGLxTCArJ63AVbnwm4Elawvpcv+M6nmhWUtT4xOQPq2BZ2kVqMcNZ9lseNfV2pOAUUgrPwYLTOONFTA0DU6PVNDBjAZhUf6MapGbRSrmgXlzMH7yDPdAtQ2Q6j6BZ0UN1PuPbGkTv58Fy/ODigKowwlLcn9E/boZ1B8OwDGzEMkr12G+THBGZrOm2m+BeTyw9AxYbg4CBz6HY04JDF6jPHmGYjVTIKR1TXn15Cnc6TSUu2FovX2cxQc4HADfhlwcgrO8DMNfH4G7phK5G+tBPC4kD/+M59pkivZpqQemi0F/NojcDau5cTIy0SgykQhoKIjJm3fA/ByQDxVvOYXRQz/BxU12f/gB7inJMBvR1JdNcxdulYZGfdL6ekirloEVBODlYP7mzVC7wnYQ/Ds3geYF4Nu+EWY0huSdTv1YX89BGte1aOvgwCmXU8D48d84e8zehjA9D8nWc8hGQe26B6UnzDdUCW3gKYyLV9Aej7Xdjse67SRSSr1/rG260FhVtUrWXsHi+rMuU64VAkfQdRjyJEzuiUQJHg6O9G9qO107pCrP7SSapilLTNh9QhRbmupqVzNfDnRKYXF6nj+QjG7LElQFtzo6w/vOt+7INr/zmXgovbsWV+9pbmzYs6CifL43EBB5oJFKJMxI3+PIuavXzv7691/HFdMYe+9v/O9QQvxzpuUvKAoGQwJjbGgsNtw78uK+bpnjb9f+K8AAqvpmI99oS9sAAAAASUVORK5CYII%3D';
  var offIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDk2OUE5NzA5OTJBMTFERkJGODZBMDNGNEZGMzE5OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDk2OUE5NkY5OTJBMTFERkJGODZBMDNGNEZGMzE5OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOTJCMDk5MDQxRUY0QTg3RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOTJCMDk5MDQxRUY0QTg3RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiVyq/wAAALISURBVHjabFNLSFtREJ28fPyGNEokViUKwdgYUEEqRjem0qIg6KalzaIgXXRbXERsIWBwU3DRLlzZZUFaxG404EYQCioUAglFqUokWjVN0JjEaH52ztBC+hmYvJv7Zs7MOTNPdXNzQ6U2PT1tqaure2Y2m+9XV1c3KmyXl5c/2D4fHx/PT01NfSmNV5UCzM3NPXc4HK9NJpNepVJRsViUe8Yg/L+4uCgGg8E3kUhk0uv1Zv8A8Hg8r9xutw+B2WyWcI8z7HeMVqsltVpNgUDgw97e3mMGKSp4MTAwMDwyMuK7vr5GFcpkMoQzHGC5XE6eyWRS3Gq1PqytrfX86k5RjY6OvtRoNJRIJKiiooKYPxkMBkkC2NXVlXTASUIH901NTS9mZmZuK62trd0tLS1OJNtsNqCTTqcTkK6uLqEBb2trI71eTxaLhfL5PAqZWNRhTXNzczfQGxoaqLy8nNbW1qRlmN1uJy5Ah4eHlE6naX19naqqqqSLsrIyaHJX4R9zNBqV9lhhaRkB8O3tbQksFApCzeVyEY9YYpDDYCYNC5XhGYtgBwcHdHJyQpWVlaI2uNbU1Eh3CwsLxFSFFij6/X46PT1NK4z0FdVisRh1dnaKYJhEPB4XIXlcAggDhaWlJaqvryej0UhHR0dBNYt35nQ6H3Fbho6ODhGLN5Bw7uvrk66wB729vQLU09MjBRg4t7y8PKlwYnRzc/Md2lpdXZWXEA6Kb2xsiBYAgWNC3DaFQiHa2dn5uL+/H5BN5CD9xMTEp/7+fhcoIAlbB1BoAREhHDTBPYN98/l8987PzyMacOOdT3LwUz7ODw0NPcA4Zc95/igAhx6Y/9bWVnB2dvYJkv/5mDhBPzg4OD42Njbe3t5+h4XS4j6VShV3d3fDKysr7xcXF9/ynsT++zWWAN3i0dnZG5mCmnl/D4fDIaYS/zv2pwADAGy/cJAY0VCcAAAAAElFTkSuQmCC';
  var scrobblingOn = null;
  var username = '';
  
  var changeTo = function() {
    $.post('/inc/user_action.php', {
        act: 'update_profile',
        form: 'lastfm',
        lf_username: username,
        lf_password: 'KioqKioqKioq',
        lf_scrobble_track: scrobblingOn ? 'true' : 'false'
      }, function(data) {
        $('#as-on-off-link img').attr('src', scrobblingOn ? onIcon : offIcon);
    });
  }

  $.get('/inc/lb_lastfm.php', function(html) {
    scrobblingOn = html.match(/id="lf_scrobble_track" checked="checked"/) ? true : false;
    username = html.match(/id="lf_username" value="(.+?)"/)[1];
    
    $('#player-links').append('<a id="as-on-off-link" style="padding:8px;"><img src="'+onIcon+'" /></a>');
    $('#as-on-off-link').hover(function() {
      $(this).css({backgroundColor:'#111'});
    })

    $('#as-on-off-link').click(function() {
      scrobblingOn = !scrobblingOn;
      changeTo(scrobblingOn, username);
    });
  });
});