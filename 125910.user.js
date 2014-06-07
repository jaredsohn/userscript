// ==UserScript==
// @name           Nexus Clash Character List Sort
// @namespace      http://userscripts.org/users/435889
// @description    Sorts the list of people by allegiance, then by hp, more severely wounded first. 
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// ==/UserScript==


(function() {
    var match = /There (is|are) ([0-9]{1,3}) other (person|people) here, ([\s\S]*?>)\./.exec(document.documentElement.innerHTML); // gets the whole list of people
    if (match[2] == 0) {
        //there are no present, so exit
        console.log('nobody here, exiting');
        return;
    };
    
    var ppl = match[4].substring(1, match[4].length - 1).split('>, <');
    if (ppl.length != parseInt(match[2])) {
        return;
    };
    var people = [[],[]];
    var i = 0;
    for (i = 0; i < ppl.length; i++) {
        var p = /a class="(faction|ally|friendly|neutral|enemy|hostile|friendly)" href="javascript:SelectItem\('target_id','([0-9]+)'\)">([\s\S]+?) <\/a> \(<a href="modules.php\?name=Game&amp;op=character&amp;id=[0-9]+">([0-9]*)<\/a>\)(<img width="12" height="12" src="images\/g\/status\/Hiding.png" title="Hidden">)?<img( title="([0-9]{1,3})\/([0-9]{1,3}) hit points")?[\s\S]+?src="images\/g\/HealthBar_([1-4]).gif"/.exec(ppl[i]);
        var type;
        if (p[1] == 'enemy' || p[1] == 'hostile' || p[1] == 'neutral') {
            p_type = 0;
        } else {
            p_type = 1
        };
        var person = {};
        person['html'] = ppl[i]
        person['id'] = p[2]
        if (p[6]) {
            person['sort_hp'] = (parseInt(p[7])/parseInt(p[8])) * 100;
        } else {
            person['sort_hp'] = 4 - parseInt(p[9]); // makes less hp mean lower value.
        };
        if (!people.hasOwnProperty(p_type)) { // if there is not already an entry for this alignment
            people[p_type] = []; // create an empty array for the key.
            people[p_type].push(person);
        } else {
            var added = false;
            for (x in people[p_type]) { // sort through the current list of people with that allegiance
                if (people[p_type][x]['sort_hp'] > person['sort_hp']) { // until it finds a person with more or equal hp
                    people[p_type].splice(x, 0, person)// then insert the new person before the current one.
                    added = true; // record that the person has been added
                    break; // and finish the for loop since we have added the person.
                };
            };
            if (!added) { // if the loop completed without adding the person
                people[p_type].push(person); // add them to the end of the list.
            };
        };
    };
    var h;
    var count = (people[0].length + people[1].length);
    if (count != parseInt(match[2])) {
        return;
    };
    if (count == 1) {
        h = '<p id="chars_desc">There is 1 other person here.</p>\n';
    } else {
        h = '<p id="chars_desc">There are ' + count + ' other people here.</p>\n';
    };
    if (people[0].length >= 1) {
        h += '<p id="victims">';
        for (index in people[0]) {
            h += '<span class="char" id="char_' + people[0][index]['id'] + '"><' + people[0][index]['html'] +'></span>, ';
        };
        h = h.substring(0, h.length - 2) + '.</p>';
    };
    if (people[1].length >= 1) {
        h += '<p id="friends">'
        for (index in people[1]) {
            h += '<span class="char" id="char_' + people[1][index]['id'] + '"><' + people[1][index]['html'] +'></span>, ';
        };
        h = h.substring(0, h.length - 2) + '.</p>';
    };
    h = '<div id="other_chars">' + h + '</div>';
    document.documentElement.innerHTML = document.documentElement.innerHTML.replace(match[0], h);
})();