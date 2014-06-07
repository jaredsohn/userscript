// ==UserScript==
// @name       TF2Lobby filter
// @namespace  http://github.com/dy-dx
// @version    0.1
// @description  Filters out EU/NA/6s/Highlander lobbies based on your preference
// @match      http://tf2lobby.com/
// @copyright  2012+, dy/dx
// ==/UserScript==


function lobbyFilter () {
    var filters = localStorage.getItem('tf2lobby_filters');
    if (filters) {
        console.log(filters);
        filters = JSON.parse(filters);
    } else {
        // default filter preferences
        filters = {
            EU: false
          , NA: false
          , highlander: true
          , sixes: false
        };
    }

    var lobbyList = document.querySelector('#lobbyList');

    function Checkbox(filter, className) {
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.value = className;
        this.input.id = 'filter' + filter;

        // initial checkboxes
        filters[className] && this.input.setAttribute('checked', true);

        this.label = document.createElement('label');
        this.label.htmlFor = 'filter' + filter;
        this.label.innerHTML = filter;
        
        this.input.addEventListener('click', function () {
            setHidden(this.value, this.checked);
            resetScrollBar();
            filters[this.value] = this.checked;
            localStorage.setItem('tf2lobby_filters', JSON.stringify(filters));
        });
    }
    Checkbox.prototype.isChecked = function () {
        return this.input.checked;
    };
    Checkbox.prototype.getValue = function () {
        return this.input.value;
    };



    // FIXME: REALLY REALLY INEFFICIENT AND BAD
    function setHidden (filter, checked) {
        if (filter) {
            var lobbies = lobbyList.getElementsByClassName(filter);
            for (var i=0, ilen=lobbies.length; i<ilen; ++i) {
                checked ? lobbies[i].classList.add('hide-lobby') : lobbies[i].classList.remove('hide-lobby');
            }
            if (checked) {
                // easy, we're done
                return;
            }
        }
        // otherwise we need to go through all the checked filters    
        for (var j=0, checkbox; checkbox=checkboxes[j]; ++j) {
            if (!checkbox.isChecked()) {
                continue;
            }
            var lobbies = lobbyList.getElementsByClassName(checkbox.getValue());
            for (var k=0, klen=lobbies.length; k<klen; ++k) {
                lobbies[k].classList.add('hide-lobby');
            }
        }
    }

    function setOneHidden (lobby) {
        for (var j=0, checkbox; checkbox=checkboxes[j]; ++j) {
            if (checkbox.isChecked() && lobby.classList.contains(checkbox.getValue())) {
                lobby.classList.add('hide-lobby');
                return;
            }
        }
    }

    function getLobbyType (lobby) {
        var playerCountText = lobby.getElementsByClassName('players')[0].textContent;
        var maxPlayers = parseInt(playerCountText.split('/')[1], 10);
        if (maxPlayers === 12) {
            return 'sixes';
        }
        if (maxPlayers === 18) {
            return 'highlander';
        }
    }

    function resetScrollBar () {
        document.querySelector('#lobbyListContainer').scrollUpdate();
    }

    /**** doin stuff ****/

    var filterSelection = document.createElement('div');
    filterSelection.id = 'filter-selection';
    filterSelection.innerHTML = 'Hide:';

    var checkboxes = [];
    checkboxes.push(new Checkbox('NA', 'NA'));
    checkboxes.push(new Checkbox('EU', 'EU'));
    checkboxes.push(new Checkbox('6s', 'sixes'));
    checkboxes.push(new Checkbox('Highlander', 'highlander'));

    checkboxes.forEach(function (checkbox) {
        filterSelection.appendChild(checkbox.input);
        filterSelection.appendChild(checkbox.label);
    });

    document.querySelector('#lobbyArea').appendChild(filterSelection);

    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function(mutation) {
            // exit if the mutation didn't add a node
            if (!mutation.addedNodes.length) { return false; }
            var listItem = mutation.addedNodes[0];
            // exit if the list item is not a lobby
            var region = listItem.getAttribute('region');
            
            if (!region) { return false; }
            
            // add the things
            listItem.classList.add(getLobbyType(listItem));
            listItem.classList.add(region);
            // do the stuff
            setOneHidden(listItem);
        });
    });

    // pass in the target node, as well as the observer options
    observer.observe(lobbyList, {childList: true});

    // observer.disconnect();
}

GM_addStyle('#filter-selection input { margin: 0 1px 0 8px; } .hide-lobby { display: none !important; }');

// This is the only script injection technique I've found which works on Chrome
//  I need to do this in order to call ('#lobbyListContainer').scrollUpdate()
//  which prevents the custom scrollbar from going crazy. It also gives access
//  to localStorage to preserve filter preferences.
var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + lobbyFilter + ")()"));

document.body.appendChild(inject);
