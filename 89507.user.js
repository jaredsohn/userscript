// ==UserScript==
// @name           FlickrShowTimeTaken
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

link = document.getElementById('photo-story-story').getElementsByTagName('a')[0];
if (link.innerHTML.indexOf('ago') == -1) {
	date_taken = getJSVariable(/date_taken\"[ :]+\"([^\"]+)\"/);
	if (date_taken) {
		time = date_taken.split(' ')[1];
		comps = time.split(':');
		suffix = 'am';
		if (parseInt(comps[0]) > 12) {
			comps[0] -= 12;
			suffix = 'pm';
		}
		else if ( comps[0] == '00' ) {
			comps[0] = 12;		
		}
                else if ( comps[0] == '12' ) {
                        suffix = 'pm';
                }
		link.innerHTML += ' at '+comps[0]+':'+comps[1]+' '+suffix;
	}
}

function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use without mootools
  var retval;
  scripttags = document.getElementsByTagName('script');
  for ( i in scripttags) {
    if (retval != undefined) {
      return;
    }
    var html = scripttags[i].innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  }
  return retval;
}
