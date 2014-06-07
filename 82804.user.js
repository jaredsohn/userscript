//<script>
// ==UserScript==
// @name           anime-planet_+-
// @namespace      http://userscripts.org/users/200838
// @description    permette di aggiungere e di togliere un episodio visto alla volta su anime-planet.com
// @include        http://www.anime-planet.com/
// ==/UserScript==

function getbyid(id) { return document.getElementById(id); }
function gettagbyattr(tag,attr,val) {
    tag = (tag) ? "//"+tag : "//*";
    if(!attr && !val) {attr=val=""}else{attr = (attr) ? "[@"+attr : "[@*"; val = (val) ? "='"+val+"']" : "]";};
    return document.evaluate(tag+attr+val,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

function dopo(ins_text,didove) { if(didove && ins_text) { return didove.parentNode.insertBefore(ins_text, didove.nextSibling); }; }
function prima(ins_text,didove) { if(didove && ins_text) { return didove.parentNode.insertBefore(ins_text, didove); }; }
function remove(node){ if (node) return node.parentNode.removeChild(node); }

function canc(ob,num) {
        plus = getbyid("next"+num);
        remove(plus);
        minus = getbyid("prev"+num);
        remove(minus);        
        ob.setAttribute("onMouseOver","torniamo(this)");
}

selectepisodes = gettagbyattr('select','name','episodes');
if (selectepisodes) {
    for (var i = 0; i < selectepisodes.snapshotLength; i++) {
        thisselect = selectepisodes.snapshotItem(i);
        thisselectclass = thisselect.getAttribute("class");
        thisselectnum = thisselectclass.replace("episodes","");
        canc(thisselect,thisselectnum);
        if (!thisselect.getAttribute("disabled")) {
            più = document.createElement("a");
            più.setAttribute("title","Aggiungi un episodio visto");
            più.setAttribute("onClick","aggiungi(this)");
            più.setAttribute("id","next"+thisselectnum);
            più.setAttribute("class",thisselectnum);
            più.innerHTML = "&#43;";
            dopo(più,thisselect);
            meno = document.createElement("a");
            meno.setAttribute("title","Togli un episodio visto");
            meno.setAttribute("onClick","togli(this)");
            meno.setAttribute("id","prev"+thisselectnum);
            meno.setAttribute("class",thisselectnum);
            meno.innerHTML = "&#45;";
            prima(meno,thisselect);
            thisselect.setAttribute("onMouseOver","control(this)");
        }else{ canc(thisselect,thisselectnum) };
    };
}

function torniamo(obj) {
    objclass = obj.getAttribute("class");
    objnum = objclass.replace("episodes","");
    if (!obj.getAttribute("disabled")) { canc();
        più = document.createElement("a");
        più.setAttribute("title","Aggiungi un episodio visto");
        più.setAttribute("onClick","aggiungi(this)");
        più.setAttribute("id","next"+objnum);
        più.setAttribute("class",objnum);
        più.innerHTML = "&#43;";
        dopo(più,obj);
        meno = document.createElement("a");
        meno.setAttribute("title","Togli un episodio visto");
        meno.setAttribute("onClick","togli(this)");
        meno.setAttribute("id","prev"+objnum);
        meno.setAttribute("class",objnum);
        meno.innerHTML = "&#45;";
        prima(meno,obj);
        obj.setAttribute("onMouseOver","control(this)");
    }else{ canc(obj,objnum) };
}

function control(obj) { //non funziona ancora
    objclass = obj.getAttribute("class");
    objnum = objclass.replace("episodes","");
    if (obj.getAttribute("disabled")) { canc(obj,objnum) };
    stat = objclass.replace("episodes","stat");
    objstats = gettagbyattr("select","class",stat);
    objstat = (objstats.snapshotItem(0)) ? objstats.snapshotItem(0) : null;
    objstat.setAttribute("onChange","set_status(this); ritorna(this);");
}

function aggiungi(obj) {
    num = obj.getAttribute("class");
    selectnum = gettagbyattr("select","class","episodes"+num);
    thisselect = selectnum.snapshotItem(0);
    epselected = document.evaluate("option[@selected=\'selected\']",thisselect,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    epstot = document.evaluate("option",thisselect,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    eps = epstot.snapshotLength-1; //episodi totali
    ep = (epselected.snapshotItem(0)) ? epselected.snapshotItem(0).getAttribute("value") * 1 : 0;//episodio selezionato
    newepv = ep+1;
/**alert(newepv+" \<-newepv - eps-\>"+eps);**/
    if (eps && newepv && eps>ep) {
        newep = document.evaluate("option[@value=\'"+ newepv +"\']",thisselect,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        crew = newep.snapshotItem(0);
//        selectnum.click();
//        click.click();
        crew.setAttribute("selected","selected");
//alert(crew.innerHTML);
        if(epselected.snapshotItem(0)) {epselected.snapshotItem(0).removeAttribute("selected")};
        set_episodes(thisselect);
    }
}

function togli(obj) {
    num = obj.getAttribute("class");
    selectnum = gettagbyattr("select","class","episodes"+num);
    thisselect = selectnum.snapshotItem(0);
    epselected = document.evaluate("option[@selected=\'selected\']",thisselect,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    epstot = document.evaluate("option",thisselect,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    eps = epstot.snapshotLength-1; //episodi totali
    ep = (epselected.snapshotItem(0)) ? epselected.snapshotItem(0).getAttribute("value") * 1 : 0;//episodio selezionato
    newepv = ep-1;
/**alert(newepv+" \<-newepv - eps-\>"+eps);**/
    if (eps && newepv && ep>0) {
        newep = document.evaluate("option[@value=\'"+ newepv +"\']",thisselect,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//alert(newep.snapshotItem(0).innerHTML);
        epselected.snapshotItem(0).removeAttribute("selected");
        newep.snapshotItem(0).setAttribute("selected","selected");
        epselected.snapshotItem(0).removeAttribute("selected");
        set_episodes(thisselect);
}
}
