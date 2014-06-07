// ==UserScript==
// @name            Monsters of Cock Forms to Links
// @namespace       http://userscripts.org/users/sirhmba/moc-form2link
// @description     convert MoC video clip play/download forms to links
// @include         http://members.monstersofcock.com/monstersofcock/clips*
// @include         http://members.monstersofcock.com/monstersofcock/streaming*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////
//                                                                  //
// This script should also work for similar Reality Kings websites, //
// but I have not tested it on any others.  Add to the include URLs //
// with the appropriate website preamble in order to test it.       //
//                                                                  //
// E.g., http://members.example.com/path/clips*                     //
//                                                                  //
//////////////////////////////////////////////////////////////////////

// The XPath expression should find all the download/play forms for 
// this page.
var snapshotResults = 
    document.evaluate('//select[@name="fname"]/..',
                      document,
                      null, 
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                      null
                     );

// Loop over all form elements on the page, converting each into one 
// or more links.
for (var i = snapshotResults.snapshotLength-1; i >= 0; i--) {
    var form = snapshotResults.snapshotItem(i);
    var url = form.action;              // base URL
    var label;                          // button label
    var param = new Array();            // target URL GET parameters
    for (var j = form.elements.length-1; j >= 0; j--) {
        var input = form.elements[j];
        if (input.type == 'hidden') {
            param.push(input.name + '=' + input.value);
        } else if (input.type == 'submit') {
            label = input.value;
        }
    }

    // Use files object as an associative array mapping select labels
    // to filenames.
    var files = new Object(); 
    var select = form.elements.namedItem('fname');
    var num_files = select.length;      // number of files for video clip
    for (var j = num_files-1; j >= 0; j--) {
        var opt = select.options[j];
        files[opt.text] = opt.value;
    }

    // Replace forms with URLs in two steps (add the links, remove the form).
    url += '?' + param.join('&');
    var link_count = 0;                 // number of links displayed
    var para = document.createElement('p');
    for (var key in files) {
        var link = document.createElement('a');
        link.setAttribute('href', url + '&fname=' + files[key]);
        link.appendChild(document.createTextNode(label + ' ' + key));
        para.appendChild(link);
        // Insert <br> to separate download links.
        if (link_count < num_files) { 
            var br = document.createElement('br');
            para.appendChild(br);
        }
        link_count++;
    }
    form.parentNode.insertBefore(para, form);
    form.parentNode.removeChild(form);
}

