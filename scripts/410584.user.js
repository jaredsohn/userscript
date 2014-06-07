// ==UserScript==
// @name        beta.realtor.ca inline highres images
// @namespace   namespace
// @include     http://beta.realtor.ca/propertyDetails.*
// @grant       none
// ==/UserScript==
function highres() {
    var header = document.querySelector('div.l_hdr');
    header.style.visibility = 'hidden';
    header.parentNode.removeChild(header);

    var footer = document.querySelector('div.l_ftr');
    footer.style.visibility = 'hidden';
    footer.parentNode.removeChild(footer);
    
    var pnlBack = document.getElementById('pnlBack');
    pnlBack.parentNode.removeChild(pnlBack);

    var helpdiv = document.getElementById('m_howrealtorshelp_short_cnt_con');
    helpdiv.parentNode.removeChild(helpdiv);

    var fbdiv = document.getElementById('ftr_feedback');
    fbdiv.parentNode.removeChild(fbdiv);
  //fbdiv.style.visibility = "hidden";
  //fbdiv.style.position = "initial";

    var imgs = document.querySelectorAll('img[src*="medres"]');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = imgs[i].src.replace('medres', 'highres');
    }
    
    var mms = document.getElementById('makeMeScrollable');
    mms.id = '';
    mms.className = '';
    mms.style.visibility = 'visible';
    mms.align = 'center';

    // dummy scrollable div so JS continues to work 
    var new_d = document.createElement('div');
    new_d.id = "makeMeScrollable";
    mms.parentNode.insertBefore(new_d, mms);
    
    var pc = document.getElementById('photoCarousel');
    pc.style.backgroundImage = 'none';
    pc.style.background = '#F2F2ED';
    pc.style.marginBottom = '25px';
    
    var map = document.getElementById('pnlPropertyMap')
    map.parentNode.insertBefore(pc, map);


    var tbltitle = document.querySelector('div.m_property_dtl_data_tbl_title');
    var dupetitle = tbltitle.cloneNode(true);
    var divspan = dupetitle.querySelector('span');
    divspan.innerHTML = "Photos";
    
    mms.parentNode.insertBefore(dupetitle, mms);

    var det = document.getElementById('pnlPropertyDescription');
    var con = det.querySelector("div.m_property_dtl_data_tbl_content");
    con.style.fontSize = "18px";
    con.style.fontFamily = "Georgia";
}
highres();
