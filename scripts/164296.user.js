// ==UserScript==
// @name        Office Outlook Web Access for mobile
// @namespace   Kodono
// @description Permits to have a web interface for OWA
// @include     https://*/OWA/*
// @include     https://*/CookieAuth.dll*
// @version     2013040502
// @grant       none
// ==/UserScript==

if (document.getElementById('logonForm')) {
    var login=document.querySelectorAll('#tblMid tr table')[5];
    var table=document.getElementById('tblMain');
    var html=login.outerHTML;
    login.parentNode.removeChild(login);
    table.insertAdjacentHTML('beforebegin',html+'<br><a href="OWA/" style="color:blue;text-decoration:undeline">If you have already entered your credentials, then click here</a> (sometimes the redirection doesn\'t work)');
    table.style.display='none';
    var label=document.querySelectorAll('label');
    for (var i=0; i<label.length; i++) label[i].style.color="#000";
} else {
    var i,img,tr,td,head;
    // hide the left nav bar
    document.querySelector('.nvtp').style.display='none';
    // top nav bar
    img=document.querySelectorAll('.tbhd a img');
    for (i=img.length; i--;) {
      // change the image size
      img[i].style.width="24px";
      img[i].style.height="24px";
      // remove the label
      var n=img[i].nextSibling;
      if (n) img[i].parentNode.removeChild(n)
    }
    document.querySelector('.nvtp').style.display='none';
    // create bigger labels for the left bar
    var a=document.querySelectorAll('a[name="lnkFldr"]');
    for (i=a.length; i--;) {
      a[i].style.fontSize="14pt";
      a[i].style.padding="5px 1px";
      a[i].style.display="inline-block";
    }
    // add a button to toggle the left nav bar
    document.getElementById('frm').insertAdjacentHTML('afterbegin','<input type="button" onclick="var e=document.querySelector(\'.nvtp\');e.style.display=(e.style.display==\'none\'?\'\':\'none\');return false" value="Toggle the left bar"><br>');
    // change the header
    var head=document.querySelector('.mnTbl tr');
    td=head.querySelectorAll('td');
    td[13].parentNode.removeChild(td[13]); // remove the things we don't need anymore
    td[12].parentNode.removeChild(td[12]);
    td[6].setAttribute("colspan",3); // the address book / options / logout are moved a line under
    var html=td[6].outerHTML;
    head.insertAdjacentHTML('afterend','<tr>'+html+'</tr>');
    td[6].parentNode.removeChild(td[6]); // remove the things we don't need anymore
    td[1].setAttribute("colspan",3);
    td[0].parentNode.removeChild(td[0]);
    // remove the padding
    td=document.querySelectorAll('table.ob div.sch');
    for (i=td.length; i--;) td[i].style.padding=0;
    // play with the mail list
    tr=document.querySelectorAll('.lvw > tbody > tr');
    for (i=tr.length; i--;) {
      td=tr[i].querySelectorAll('td,th');
      if (td.length>=3) {
        // merge the FROM and the SUBJECT column
        if (i>0) td[5].insertAdjacentHTML('afterbegin','<span class="from">'+td[4].innerHTML+'</span><br>')
        tr[i].removeChild(td[7]); // remove the SIZE column
        tr[i].removeChild(td[4]); // remove the FROM column
        tr[i].removeChild(td[2]); // remove the ATTACHMENT column
        tr[i].removeChild(td[0]); // remove the URGENT column
      }
    }
    // footer
    document.querySelector('.nvft').style.display='none';
}