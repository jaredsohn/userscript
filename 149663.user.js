// ==UserScript==
// @name           Adams Better Workflowy
// @description    removes all that is unnecessary  
// @include        https://workflowy.*
// @run-at        document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

addGlobalStyle('body{background-color:#Fff;/* Cream Dust from Subtle Patterns*/background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAD1BMVEX5+fn6+vr7+/v8/Pz9/f3FowgvAAADDElEQVR42r2Zy24kIAwEFyb//827yPKWWw2anLoPyfByZYwxRvlTWmvvz3/tvVb1rsWn/U/1+8hnnr61yhazT28GUoZYfIZqaiPAMdKYnlE9hWQ0DeFrT3k/kFKNztZcWyp0BrK3IcxB2lb30prIAjQmBQGBSUdWYM7trO0lXMto99OTgugxe4exOgV9d2MS8jHtTWCC+S2kVqEMZG8g1cXmgrsZ0LBWB7E6CDmi4wohFNxh7/40hE6/uHCCbuYr7Wg6xWoWQhfXj8AN0oGC5BDHIa8kT2uWDHtj2o8s239WgM1A7uGooQhGQ50QQKwh7WYgGqZ2sKSYAwcEt3qopCGyZWyuOK4hWoBidhr3KyEDKXmqnokCyOuCBdEQjKcgGnj+5RWCOb0YNLmjPMTTOSK1KITQZj1wXJ2E+JFj29pZPz/TnBalcz3pHlwWUtMJTtQYfa7dZ8825UgGMr8uTvLNcyQuwbGeII+jsxDXROkcICVFuDIQf0azjADuWTNUMe4I+nKQSoJIgV7yeAmriYYxAj8PQUA8sSvEC6du8SelICyhHPIEyeLGejFLEtXyKQNZvxTbTosgBoKD+2cKgvwJoMeQ8dOmTAVfPagBCQgNIIil9FgQyOx7ysxC1B3dSxg6lhEvHRSegvDFeTK8rypmuzw1JSGaLCYCUw5xU65GpCDnxytMv+teoPfvspyCdHnKcLdpvczOwvBWhOQh9w1kYvfQ8nTaPazkj8pA9Osrxi9kd1eHScuLqhRE/4FkLTms/qT4iAgZLXPzEAxxoNQxHtRt3gsNQiUPYbto+/WKIQzzzJuBXbNzEDU6A5Pj5+UFziMoaDErD5kpkWB0CDPuVxTwVgrijwPf2DahYx766kCUhcxD9yo+x+WG7J/nJKE8pD6A4CFBKOrFivO0iGphMQdZJtvwwgkCg+9nNnYyEO3UL06iUYg+oXuc3poNOA1pM2CYruNlWEFe4hJKGcg8fo1QCL16JK2AsOPcwAzkfoWCcPjEKUavXxJMEnIEBH179rjZo3mFxSB/AWoUNYXbugv2AAAAAElFTkSuQmCC);background-size:50px 50px;color:#000}#visible{border:none;background-color:#fff;min-height:500px;margin-bottom:50px;margin-top:0;padding-bottom:0;padding-top:0;width:800px}#workflowy{min-height:500px}.corner,.edge,#share_buttons,#bottomLinks,#siteSlogan,#buttonBar,#saveButton.button.saved,#saveButton_saveNow,#saveButton_saving,#saveButton_saved,.proPitch,.getMoreSpaceButton,.showCompletedButton,.progressBarContainer,.siteSlogan{display:none!important}.selected{border:none}.selected > .name,.selectedEditor > textarea{font-weight:700}.parent > .name > .content,.parent > .name{font-size:12px;color:#000;opacity:.8}#site_message{top:10px}.contentTag{color:#3CB5B5!important;background-color:#fff}.contentTagText{text-decoration:none!important}.contentTagClickable{background-color:#004A78!important}.content.editing .contentTag{color:transparent!important}#controls #move{opacity:.6}.content .contentLink,.nameAnimated .contentLink{text-decoration:none!important;color:#028500;background-color:#F8FFF8}.parentArrow:before{content:">";font-size:10px}#header{background:#fff;border-bottom:0 solid #fff}.moving > .highlight,.highlighted > .highlight{background:#F0F4F8}.selected{border:none}.footer{border:none}#logo,.undo-button,.redo-button{display:none}#pageContainer{margin-top:-20px}.page{background:transparent;padding-top:0}#header{background:transparent;border-bottom:none;z-index:-2}#searchPrompt,#searchBox{margin:10px 0 0 20px;border:none;color:#333}#searchBox:focus{border:1px solid #666;margin:10px}#searchPrompt{opacity:.2}.saveButton{background:#eee;border:none}#dropdownMessages{display:none!important}#searchCancel{top:8px;right:6px}');

$('body').live('keydown', function(event) {
    // Ctrl-F/Command-F = search
    if (event.keyCode == 70 && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        event.stopPropagation();
        $('#searchBox').focus();
        return false;
    // Command-Up = home
    } else if (event.keyCode == 38 && event.metaKey) {
        $('div.mainTreeRoot .name:first .content').trigger('click');
        event.preventDefault();
        event.stopPropagation();
        return false;
    } else {
        return true;
    }
});
