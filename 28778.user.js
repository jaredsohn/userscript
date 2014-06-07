// ==UserScript==
// @name           LJ Random Icon
// @namespace      http://userscripts.org/users/56492
// @description    Adds an option to choose a random userpic to the userpic selection when posting.
// @include        http://www.livejournal.com/update.bml
// ==/UserScript==

//First, add the random option
var iconSelect = document.getElementById('prop_picture_keyword');
var randomOption = document.createElement('option');
randomOption.text='Random';
randomOption.value='random';
iconSelect.add(randomOption, null);

function newsubmit(event) {
    var target = event ? event.target : this;
    var iconSelect = document.getElementById('prop_picture_keyword');
    var randomIndex = Math.floor(Math.random()*(iconSelect.options.length-2)+1);
    if(iconSelect.options[iconSelect.options.length-1].selected == true){
        iconSelect.options[randomIndex].selected = true;
    }

    // call real submit function
    this._submit();
}

// capture the onsubmit event on all forms
window.addEventListener('submit', newsubmit, true);

// If a script calls someForm.submit(), the onsubmit event does not fire,
// so we need to redefine the submit method of the HTMLFormElement class.
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = newsubmit;