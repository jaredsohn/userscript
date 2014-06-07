// ==UserScript==
// @name          GCN Coordinate Query
// @description   Insert Simbad/NED/HEASARC queries near GCN coordinate values
// @include       http://gcn.gsfc.nasa.gov/*
// @include       http://swift.gsfc.nasa.gov/*
// ==/UserScript==
//
// This Greasemonkey script searches for GCN style GRB_RA and GRB_DEC
// tags, and inserts queries to Simbad, NED, and HEASARC for the given
// position.  The search radius is 10 arcminutes.
// 
// Modification History:
//   23 Jun 2007 - update Simbad queries to version 4 style
// 


// Do not modify plain-text pages!
if (document.contentType != 'text/plain') {
  var html, ra, dec, mtch, fullmtch, good, name;
  var qprompt, query_html;

  // Search for GRB_RA: and GRB_DEC:
  html = document.body.innerHTML;
  ra = null; dec = null;
  good = 0;
  mtch = /\nGRB_RA: *([\d.]+)d[^\n]*\n/.exec(html);
  if (mtch) {
    fullmatch = mtch[0];
    ra = mtch[1];
    mtch = /\nGRB_DEC: *([-+][\d.]+)d/.exec(html);
    if (mtch) {
      dec = mtch[1];
      good = 1;
    }
    if (fullmatch.match(/Query position/)) good = 0;
  }

  // Found a good match for RA and Dec
  if (good) {

    // Make Simbad, NED and HEASARC queries
    simbad_query = '<a href="http://simbad.u-strasbg.fr/simbad/sim-coo?CooEpoch=2000&Coord='+encodeURIComponent(ra+' '+dec)+'&submit=submit%20query&Radius.unit=arcmin&CooEqui=2000&CooFrame=FK5&Radius=10">SIMBAD</a>';

    ned_query = '<a href="http://nedwww.ipac.caltech.edu/cgi-bin/nph-objsearch?in_csys=Equatorial&in_equinox=J2000.0&lon='+encodeURIComponent(ra+'d')+'&lat='+encodeURIComponent(dec+'d')+'&radius=10.0&search_type=Near+Position+Search&out_csys=Equatorial&out_equinox=J2000.0&obj_sort=Distance+to+search+center&of=pre_text&img_stamp=YES&ot_include=ANY&nmp_op=ANY">NED</a>';

    heasarc_query = '<a href="http://heasarc.gsfc.nasa.gov/cgi-bin/W3Browse/w3table.pl?Action=Start+Search&Entry='+encodeURIComponent(ra+' '+dec)+'&upfile=&Coordinates=J2000&Radius=Default&Radius_unit=arcmin&table_type=Object&table_type=Observation&table_type=Physics&displaymode=Display">HEASARC</a>';

    if (name) { qprompt = 'Query around "'+name+'"'; } 
    else { qprompt = 'Query position'; }
    query_html = '<b>'+qprompt+':</b> '+simbad_query+' | '+ned_query+' | '+heasarc_query;

    html = html.replace(/(\nGRB_RA:[^\n]*)\n/g,'$1 '+query_html+'\n');

    document.body.innerHTML = html;
  }

}


