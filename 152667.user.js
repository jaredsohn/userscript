// ==UserScript==
// @name       RYM: Sort tags by most used
// @version    0.2
// @include    http://rateyourmusic.com/~*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
tagSection = document.getElementById('musictag');
if (tagSection != undefined){
    tagCounts = tagSection.getElementsByClassName('tagcount');
    tagNames = tagSection.getElementsByTagName('a');
    var tags = [];
    var unsorted = [];
    for (n=tagCounts.length-1; n>-1; n--){
        x = document.createElement('span');
        x.value = tagCounts[n].innerHTML.split('(')[1].split(')')[0];
        x.appendChild(tagNames[n]);
        x.appendChild(document.createTextNode(' '));
        x.appendChild(tagCounts[n]);
        unsorted.push(x);
    }
    for (d=0; d<unsorted.length; d++) {
        if (tags.length == 0) {tags.push(unsorted[d])}
        else { 
            t=0;
            while ((tags.indexOf(unsorted[d]) < 0) && (t < tags.length)) {
                if (tags.length == 1) {
                    if (parseInt(tags[0].value) <= parseInt(unsorted[d].value)){tags.push(unsorted[d])}
                    else {tags.splice(0, 0, unsorted[d])}
                } else if (parseInt(unsorted[d].value) == 1){
                    tags.splice(0, 0, unsorted[d]);
                    t++;
                } else {
                    if (t == 0 && parseInt(tags[t].value >= parseInt(unsorted[d].value))){tags.splice(0, 0, unsorted[d])}
                    else if ((parseInt(unsorted[d].value) >= parseInt(tags[t].value)) && (tags[t+1] == undefined)) { tags.splice(t+1, 0, unsorted[d]) }
                    else if ((parseInt(unsorted[d].value) >= parseInt(tags[t].value)) && (parseInt(unsorted[d].value) <= parseInt(tags[t+1].value))) { tags.splice(t+1, 0, unsorted[d]) }
                    t++;
                }
            }
        }
    }
    tagSection.innerHTML = '';
    tags.reverse();
    for (t=0; t<tags.length; t++){
        tagSection.appendChild(tags[t]);
        tagSection.appendChild(document.createTextNode('   '));
        
    }
}
tagSection = document.getElementById('filmtag');
if (tagSection != undefined){
    tagCounts = tagSection.getElementsByClassName('tagcount');
    tagNames = tagSection.getElementsByTagName('a');
    var tags = [];
    var unsorted = [];
    for (n=tagCounts.length-1; n>-1; n--){
        x = document.createElement('span');
        x.value = tagCounts[n].innerHTML.split('(')[1].split(')')[0];
        x.appendChild(tagNames[n]);
        x.appendChild(document.createTextNode(' '));
        x.appendChild(tagCounts[n]);
        unsorted.push(x);
    }
    for (d=0; d<unsorted.length; d++) {
        if (tags.length == 0) {tags.push(unsorted[d])}
        else { 
            t=0;
            while ((tags.indexOf(unsorted[d]) < 0) && (t < tags.length)) {
                if (tags.length == 1) {
                    if (parseInt(tags[0].value) <= parseInt(unsorted[d].value)){tags.push(unsorted[d])}
                    else {tags.splice(0, 0, unsorted[d])}
                } else if (parseInt(unsorted[d].value) == 1){
                    tags.splice(0, 0, unsorted[d]);
                    t++;
                } else {
                    if (t == 0 && parseInt(tags[t].value >= parseInt(unsorted[d].value))){tags.splice(0, 0, unsorted[d])}
                    else if ((parseInt(unsorted[d].value) >= parseInt(tags[t].value)) && (tags[t+1] == undefined)) { tags.splice(t+1, 0, unsorted[d]) }
                    else if ((parseInt(unsorted[d].value) >= parseInt(tags[t].value)) && (parseInt(unsorted[d].value) <= parseInt(tags[t+1].value))) { tags.splice(t+1, 0, unsorted[d]) }
                    t++;
                }
            }
        }
    }
    tagSection.innerHTML = '';
    tags.reverse();
    for (t=0; t<tags.length; t++){
        tagSection.appendChild(tags[t]);
        tagSection.appendChild(document.createTextNode('   '));
        
    }
}