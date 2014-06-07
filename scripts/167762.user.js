// ==UserScript==
// @name        Hide badges I've already attained
// @description Adds a checkbox to the Badges page to optionally hide badges you've already attained, from the list
// @namespace   http://stackoverflow.com/users/1563422/danny-beckett
// @version     1.0
// @grant
// @include     http://*.stackexchange.com/badges*
// @include     http://answers.onstartups.com/badges*
// @include     http://askubuntu.com/badges*
// @include     http://meta.askubuntu.com/badges*
// @include     http://meta.serverfault.com/badges*
// @include     http://meta.stackoverflow.com/badges*
// @include     http://serverfault.com/badges*
// @include     http://stackapps.com/badges*
// @include     http://stackoverflow.com/badges*
// @include     http://superuser.com/badges*
// ==/UserScript==

// Vars
var attained = document.getElementsByClassName('badge-earned-check');

// Checks whether a toggle state is saved
function exists()
{
    return document.cookie.indexOf('badgehider_' + location.host + '=') >= 0;
}

// Gets the toggle state
function get()
{
    for(var i = 0; pair = document.cookie.split('; ')[i].split('='); i++)
        if(pair[0] == 'badgehider_' + location.host)
            return unescape(pair[1]) === '1';
    
    return false;
}

// Sets the toggle state
function set(shown)
{
    document.cookie = 'badgehider_' + location.host + '=' + (shown ? '1' : '0');
}

// Toggles the toggle state & hides/shows rows
function toggle()
{
    var state = get();
    
    for(var i = 0; i < attained.length; i++)
        attained[i].parentNode.parentNode.style.display = state ? 'table-row' : 'none';
    
    set(!state);
}

// Set the default toggle state
if(!exists())
    set(false);

// Setup the container
var span = document.createElement('span');
span.style.float = 'left';

// Setup the toggle box
var box = document.createElement('input');
box.onclick = function(){ toggle(); };
box.checked = get() ? 'checked' : null;
box.id = 'badgehider';
box.type = 'checkbox';
box.style.cursor = 'pointer';

// Setup the label
var label = document.createElement('label');
label.innerHTML = " Hide badges I've already attained";
label.setAttribute('for', 'badgehider');
label.style.cursor = 'pointer';

// Write out
span.appendChild(box);
span.appendChild(label);
document.getElementsByClassName('subtabs')[0].appendChild(span);

// Box already checked from before
if(get())
    for(var i = 0; i < attained.length; i++)
        attained[i].parentNode.parentNode.style.display = 'none';