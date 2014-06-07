// ==UserScript==
// @name       Translate Trollian
// @version    0.7
// @description  Translate troll quirks
// @match      http://www.mspaintadventures.com/*
// ==/UserScript==
function starts(a,b)
{
    return(a.indexOf(b)==0||a.indexOf(b)==1);
}
function starts(a,b,c)
{
    return(a.indexOf(b)==0||a.indexOf(b)==1||a.indexOf(c)==0||a.indexOf(c)==1);
}

textNodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<textNodes.snapshotLength;i++) {
    var node = textNodes.snapshotItem(i);
    node.data = node.data.replace('Vriska', "Bitch");
    node.data = node.data.replace('VRISKA', "BITCH");
    node.data = node.data.replace('vriska', "bitch");
    node.data = node.data.replace('arachnidsGrip', "arachnaBitch:");
    if (starts(node.data,"AA:","ARADIA:"))
    {
        node.data = node.data.replace(/0/gi,"o");
    }
    else if (starts(node.data,"AC:","NEPETA:"))
    {
        node.data =node.data.substring(0,10) + node.data.substring(10).replace(/33/gi,"ee");
    }
    else if (starts(node.data,"AG:"))
    {
        node.data =node.data.replace("AG:","AB:");
    }
    else if (starts(node.data,"CT:","EQUIUS:"))
    {
        node.data = node.data.replace(/%/gi,"x");
        node.data = node.data.replace(/100/g,"loo");
    }
    else if (starts(node.data,"CC:","FEFERI:"))
    {
        node.data = node.data.replace(/\)\(/gi,"h");
        node.data = node.data.replace(/-+e/g,"e");
        node.data = node.data.replace(/-+E/g,"E");
    }
    else if (starts(node.data,"GC:"))
    {
        node.data = node.data.replace(/4/g,"a");
        node.data = node.data.replace(/1/g,"i");
        node.data = node.data.replace(/3/g,"e");
        node.data = node.data.substring(0,4)+node.data.substring(4).toLowerCase();
    }
    else if (starts(node.data,"TEREZI:"))
    {
        node.data = node.data.replace(/4/g,"a");
        node.data = node.data.replace(/1/g,"i");
        node.data = node.data.replace(/3/g,"e");
        node.data = node.data.substring(0,7)+node.data.substring(7).toLowerCase();
    }
    else if (starts(node.data,"TA:","SOLLUX:"))
    {
        node.data = node.data.replace(/ii/g,"i");
        node.data = node.data.replace(/2/g,"s");
    }
    else if (starts(node.data,"TC:"))
    {
        node.data = node.data.substring(0,4)+node.data.substring(4).toLowerCase();
    }
    else if (starts(node.data,"GAMZEE"))
    {
        node.data = node.data.substring(0,7)+node.data.substring(7).toLowerCase();
    }
    
}