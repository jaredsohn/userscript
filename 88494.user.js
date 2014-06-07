// ==UserScript==
// @name         grmjleaguesort
// @namespace    
// @description  jleague
// @include      http://www.j-league.or.jp/SS/jpn/j1total/20*0100_W0805_J.html
// @include      http://www.j-league.or.jp/SS/jpn/j2data/20*0200_W0805_J.html
// ==/UserScript==
(function(){
var F={};
F.jm = false; if (F.jm){void(0);}else{F.jm=true;}
var r1=3,r2=16;
var obj=document.evaluate('//font[@size=\'+0\']',document.body,null,7,null);
var cnt=obj.snapshotLength;

var element={};
var _btn='';
var st_jm=[false,false,false,true,false,false,true,false,false,true,true,true,true,true,true,true];

for (var i=r1,j=0;i<r2+r1;i++,j++) {
    if(!st_jm[j]){continue;}
    _btn=document.createElement('a');
    _btn.href='javascript:desc('+j+');void(0);';
    _btn.style.color='blue';
    _btn.style.cursor='pointer';
    _btn.appendChild(document.createTextNode('▼'));
    obj.snapshotItem(i).appendChild(_btn);
}

function TC(n){return obj.snapshotItem(n).textContent;};
unsafeWindow.desc = function(n){
    var s_obj={};
    var s_obj_c=[];
    var s_c=[];
    var t_c='';
    var ct_c='';
    var m_c=r1+r2;
    for (var i=r1+r2;i<cnt;i+=r2) {
        t_c=TC(i);
        if (t_c=='リーグ計') {break;}
        ct_c=TC(i+n);
        if (s_obj[ct_c]==undefined){s_c[s_c.length]=ct_c;s_obj[ct_c]=[];}
        s_obj_c=[];
        for (var j=0;j<r2;j++) {s_obj_c[j]=TC(i+j);}
        s_obj[ct_c][s_obj[ct_c].length]=s_obj_c;
    }
    s_c.sort(function(a, b){return (parseInt(a)>parseInt(b))?1:-1;});

    for (var i=s_c.length-1;i>=0;i--) {
    for (var j=0;j<s_obj[s_c[i]].length;j++) {
    for (var k=0,m=m_c;k<r2;k++,m_c++) {
        obj.snapshotItem(m_c).textContent=s_obj[s_c[i]][j][k];
    }
    }
    }
};
})();