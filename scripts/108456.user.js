// ==UserScript==
// @name           daftar isi untuk blogger
// @namespace      sanz
// @description    daftar isi untuk blogger
//

// ==/UserScript==


function showrecentposts(json) {
  document.write('<ol>');

  for (var i = 0; i < numposts; i++) {
    document.write('<li>');
    var entry = json.feed.entry[i];
    var posttitle = entry.title.$t;
    var posturl;
    if (i == json.feed.entry.length) break;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        posturl = entry.link[k].href;
        break;
      }
    }
    posttitle = posttitle.link(posturl);
    var readmorelink = "(Baca)";
    readmorelink = readmorelink.link(posturl);
    var postdate = entry.published.$t;
    var cdyear = postdate.substring(0,4);
    var cdmonth = postdate.substring(5,7);
    var cdday = postdate.substring(8,10);
    var monthnames = new Array();
    monthnames[1] = "Jan";
    monthnames[2] = "Feb";
    monthnames[3] = "Mar";
    monthnames[4] = "Apr";
    monthnames[5] = "May";
    monthnames[6] = "Jun";
    monthnames[7] = "Jul";
    monthnames[8] = "Aug";
    monthnames[9] = "Sep";
    monthnames[10] = "Oct";
    monthnames[11] = "Nov";
    monthnames[12] = "Dec";
    if ("content" in entry) {
      var postcontent = entry.content.$t;}
    else
    if ("summary" in entry) {
      var postcontent = entry.summary.$t;}
    else var postcontent = "";
    var re = /<\S[^>]*>/g; 
    postcontent = postcontent.replace(re, "");
    if (!standardstyling) document.write('<div class="bbrecpost">');
    if (standardstyling) document.write(posttitle);
    if (showpostdate == true) document.write(' - ' + monthnames[parseInt(cdmonth,10)] + ' ' + cdday);
    if (!standardstyling) document.write('</div><div class="bbrecpostsum"">');
    if (showpostsummary == true) {
      if (standardstyling) document.write('<br/>');
      if (postcontent.length < numchars) {
         if (standardstyling) document.write('<i>');
         document.write(postcontent);
         if (standardstyling) document.write('</i>');}
      else {
         if (standardstyling) document.write('<i>');
         postcontent = postcontent.substring(0, numchars);
         var quoteEnd = postcontent.lastIndexOf(" ");
         postcontent = postcontent.substring(0,quoteEnd);
         document.write(postcontent + '...' + readmorelink);
         if (standardstyling) document.write('</i>');}
}
    if (!standardstyling) document.write('</div>');
    if (standardstyling) document.write('<br/>');
document.write('</li>');
}
document.write('</ol>');
if (!standardstyling) document.write('<div class="bbwidgetfooter">');
if (standardstyling) document.write('<br/>');
}