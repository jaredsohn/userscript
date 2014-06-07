// ==UserScript==
// @name           Flickr Import GTK Bug
// @namespace      http://blog.geekshadow.com
// @description    Workaround for bug https://bugzilla.gnome.org/show_bug.cgi?id=574450
// @include        http://www.flickr.com/photos/upload/*
// ==/UserScript==

function includeJavascript(src) {
    if (document.createElement && document.getElementsByTagName) {
        var head_tag = document.getElementsByTagName('head')[0];
        var script_tag = document.createElement('script');
        script_tag.setAttribute('type', 'text/javascript');
        script_tag.setAttribute('src', src);
        head_tag.appendChild(script_tag);
    }
}
// Include javascript src file
includeJavascript("http://dl.dropbox.com/u/364419/web/scripts/upload_web.js.v96877.17");
