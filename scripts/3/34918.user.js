// ==UserScript==
// @name           galava - land
// @namespace      galava - land
// @description    galava - land
// @include        http://galava.net/provinces?id=*&page=land
// ==/UserScript==
testvar=0;
Knoten=new Array();
for(i=0;(testvar<2)&&(i<20);i++){
    try{
        TestKnoten=document.getElementsByName("LAND_DATA[land"+i+"]")[0];
        if(TestKnoten.nodeType==1){
            Knoten[testvar]=TestKnoten;
            testvar++;
        }
    }
    catch(Error){
    }
}
for(i=1;i<=10;i++){
    TestKnoten=TestKnoten.parentNode;
}
for(i=1;i<=2;i++){
    TestKnoten=TestKnoten.nextSibling;
}
test = new Array();
for(i=0;i<2;i++){
    test[i] = TestKnoten.getElementsByTagName('b')[i].firstChild.data;
    test[i]=test[i].split(",");
    test[i]=test[i][0]+test[i][1];
}
for(i=0;i<2;i++){
    Knoten[i].value=parseInt((test[1]-test[0])/2);
}
