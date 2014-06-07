// ==UserScript==
// @name           Recipe Unroller
// @namespace      kol.interface.unfinished
// @description    Applied to your discovery pages in KOL, shows the max you can make of a recipe and the complete construction.
// @include        http://*kingdomofloathing.com/craft.php*
// @include        http://127.0.0.1:*/craft.php*
// ==/UserScript==

//Version 1.4
// - fix for new recursive vial of * potions
//Version 1.3
// - now works with miscellaneous discoveries page
//Version 1.2
// - fix infinite recursion in wads
//Version 1.1
// - fix sauceror-based sauces, which were over-estimated.
//Version 1.0
// - known limitations:
//     - recipes using the same item more than once are handled, but it does
//       not always make optimal choices if there are multiple multiples of items 
//       in the same recipe (eg box-in-a-box-in-a-box uses 2 springs and 3 boxes).
//     - counts for combinations based on alternative choices in recipes use
//       the maximum of the choice, not the optimal combination.

// main data structure recording dependencies between discoveries
var discdata;

// boolean, is a sauceror
var isS;

// fill in discdata 
function gatherData() {
    discdata = new Array();
    var count=0;
    var listing = document.getElementsByTagName('img');
    for (var i=0;i<listing.length;i++) {
        var imgnode = listing[i];
        var click;
        if (click=imgnode.getAttribute('onclick')) {
            if (click.indexOf('descitem')==0) {
                // found an entry
                var x=imgnode;
                while(x && x.tagName!='TD')
                    x = x.parentNode;
                if (!x)
                    continue;
                x = x.nextSibling;
                if (!x)
                    continue;
                if (!x.firstChild || !x.firstChild.firstChild || !x.firstChild.firstChild.data || x.childNodes.length<3 || !x.childNodes[2])
                    continue;
                var cname = x.firstChild.firstChild.data;
				//GM_log("found: "+cname);
                var c='';
                y = x.childNodes[2].childNodes;
                for (var j=0;j<y.length;j++) {
                    if (y[j].data && y[j].data.indexOf(' + ')>0) {
                        c = y[j].data;
                        break;
                    }
                }
                if (c=='') {
                    var n;
                    for (var j=0;j<y.length;j++) {
                        if (y[j].data && (n=y[j].data.match(/([0-9]+) x (.+) [(]([0-9]+)[)]/))) {
                            c = y[j].data;
                            break;
                        }
                    }
                    if (c=='')
                        continue;
                    
                    //GM_log(n[2]+', takes '+n[1]+' from '+n[3]);
                    discdata[count]={name:cname,from:n[2],num:n[3],req:n[1],desc:click};
                } else {
					//GM_log("Name: "+cname+", components: "+c);
                    var sep = c.indexOf(' + ');
                    var c1full = parseName(c.substr(0,sep));
                    var c2full = parseName(c.substr(sep+3));
                    //GM_log(name+" is made of '"+c1full.name+"' ("+c1full.num+") and '"+c2full.name+"' ("+c2full.num+")");
                    discdata[count]={name:cname,c1:{name:c1full.name,num:c1full.num},c2:{name:c2full.name,num:c2full.num},desc:click};
                    var q=discdata[count];
					//GM_log(q.name+" is made of '"+q.c1.name+"' ("+q.c1.num+") and '"+q.c2.name+"' ("+q.c2.num+")");
                }
				imgnode.setAttribute('discdata',count);
				count++;
					
            }
        }
    }
}


// actually alter the page
function showData() {
    var listing = document.getElementsByTagName('img');
    for (var i=0;i<listing.length;i++) {
        var imgnode = listing[i];
        if (click=imgnode.getAttribute('onclick')) {
            if (click.indexOf('descitem')==0) {
                // found an entry
                // see if the descitem can be found
				var j = Number(imgnode.getAttribute('discdata'));
				var dd = discdata[j];
				if (dd && dd.desc==click) {
					var ddname = dd.name;
					var trace = new Object(); trace[ddname] = true;
					var m = findMaxS(dd.name,null,trace);
					var sl = makeScalelist(m,new Array());
					if (sl["morethanone"]) {
						trace = new Object(); trace[ddname] = true;
						m = findMaxS(dd.name,sl,trace);
					}
					var ts;
					if (m.num==0)
						ts="You can't make any more right now.";
					else {
						if (sl["saucerorpotion"]) 
							ts='As a sauceror you can make a maximum of '+m.num+'.';
						else
							ts='You can make a maximum of '+m.num+'.';
					}
					//GM_log("Max can make of "+dd.name+": "+m);
					
					// attach title to the text nearby and build causality
					var x=imgnode;
					while(x && x.tagName!='TD')
						x = x.parentNode;
					if (!x)
						continue;
					x = x.nextSibling;
					if (!x)
						continue;
					if (!x.firstChild || !x.firstChild.firstChild || !x.firstChild.firstChild.data)
						continue;
					var bold = x.firstChild;
					var boldc = bold.firstChild;
					var link = document.createElement('a');
					link.setAttribute('causality',makeTip(m,m.num,''));
					link.addEventListener("click", showTree, true);
					link.setAttribute('title',ts);
					bold.removeChild(boldc);
					link.appendChild(boldc);
					bold.appendChild(link);
				}
            }
        }
    }
}

// event handler to display causality tree
function showTree() {
    var causality=this.getAttribute('causality');
    alert(causality);
}

// construct the causality tree in readable text form
function makeTip(m,n,pref) {
    if (!m.c1) {
        if (m.singlecause) {
            return n+" "+m.name+"\n "+m.singlecause;
        }
        return n+" "+m.name;
    } 
    var s1 = makeTip(m.c1.from,m.c1.num,pref+'  ');
    var s2 = makeTip(m.c2.from,m.c2.num,pref+'  ');

    var maken = (m.num==n)? String(n) : String(n-m.num)+'+'+String(m.num);

    var s = maken + " " + m.name+"\n"+pref+"  "+s1+"\n"+pref+"  "+s2;
    while (m.orcause) {
        s1 = makeTip(m.orcause.c1.from,m.orcause.c1.num,pref+'  ');
        s2 = makeTip(m.orcause.c2.from,m.orcause.c2.num,pref+'  ');

        s = s + "\n"+pref+"  or\n"+pref+"  "+s1+"\n"+pref+"  "+s2;
		m = m.orcause;
    }
    return s;
}

// construct the scalelist
function makeScalelist(m,scalelist) {
    if (!m.c1) {
        if (scalelist[m.name]) {
            scalelist[m.name]=scalelist[m.name]+1;
            scalelist["morethanone"]=1;
        } else
            scalelist[m.name]=1;
    } else {
        scalelist=makeScalelist(m.c1.from,scalelist);
        scalelist=makeScalelist(m.c2.from,scalelist);
        if (isS && (isSaucepotion(m.c1.from.name,m.c2.from.name) ||
                    isSaucepotion(m.c2.from.name,m.c1.from.name))) {
            scalelist["saucerorpotion"]=1;
        }
    }
    return scalelist;
}

// find the maximum that can be made of the target.
// returns a structure recording the history too.
// the scaling factor is for tracking multiple use of the
// same item at different levels (eg box-in-a-box).
// for each item in the flattened ingredients list it associates
// the number of recipes requiring that ingredient.
function findMaxS(target,scalelist,trace) {
    var cause=null;
    for (var i=0;i<discdata.length;i++) {
        var dd = discdata[i];
        if (dd.name==target) {
            // max is the number we have from the components listed
            // + the number of subcomponents we can make
            if (dd.req) {
                var n = Math.floor(dd.num/dd.req);
                return {name:target,num:n,singlecause:"("+dd.num+"/"+dd.req+") "+dd.from}; 
            }
            if (trace[dd.c1.name]==true || trace[dd.c2.name]==true) {
				// on recursion give up and look for another recipe
                continue;
            }
            trace[dd.c1.name] = true;
            var c1r = findMaxS(dd.c1.name,scalelist,trace);
            trace[dd.c1.name] = false;
            trace[dd.c2.name] = true;
            var c2r = findMaxS(dd.c2.name,scalelist,trace);
            trace[dd.c2.name] = false;
            
            var cc1 = c1r.num+dd.c1.num;
            var cc2 = c2r.num+dd.c2.num;

            var makelater = (cc1>cc2) ? cc2 : cc1;

//          if (dd.c1.name==dd.c2.name) {
//              makelater = Math.floor(makelater/2);
//          } else 
            if (scalelist) {
                if (scalelist[c1r.name]>1) {
                    cc1 = Math.floor(cc1/(scalelist[c1r.name]));
                }
                if (scalelist[c2r.name]>1) {
                    cc2 = Math.floor(cc2/(scalelist[c2r.name]));
                }
                makelater = (cc1>cc2) ? cc2 : cc1;
            }


            // account for making 3 bottles of basic alchohol from fermenting powder
            if ((target.indexOf("bottle of")==0 || target.indexOf("boxed wine")==0) &&
                (dd.c1.name=='fermenting powder' || dd.c2.name=='fermenting powder')) {
                makelater = makelater*3;
            } else if (isS && (isSaucepotion(dd.c1.name,dd.c2.name) ||
                               isSaucepotion(dd.c2.name,dd.c1.name))) {
                makelater = makelater*3;
            }

            if (cause) {
                // another entry; accumulate
                var newcause;
                if (makelater>cause.num) {
                    newcause = {name:target,num:makelater,c1:{from:c1r,num:cc1},c2:{from:c2r,num:cc2},orcause:cause};
                } else {
                    newcause = {name:cause.name,num:cause.num,c1:cause.c1,c2:cause.c2,orcause:{name:target,num:makelater,c1:{from:c1r,num:cc1},c2:{from:c2r,num:cc2},orcause:cause.orcause}};
                }
                cause=newcause;
            } else {
                cause = {name:target,num:makelater,c1:{from:c1r,num:cc1},c2:{from:c2r,num:cc2}};
            }
        }
    }
    if (cause)
        return cause;
    return {name:target,num:0}; //,c1:{name:'',num:0},c2:{name:'',num:0}};
}

// parse a name and count in the discovery list
function parseName(c) {
    var count=0;
    var s='';
    var i = c.lastIndexOf(' (');
    if (i>=0) {
        var cs = c.substr(i+2);
        var j = cs.indexOf(')');
        if (j>0) {
            count = parseInt(cs.substr(0,j));
        }
        s = c.substr(0,i);
    }
    return {name:s,num:count}
}

function isSauceror() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var listing = goo.document.getElementsByTagName("img");
            //GM_log("found "+listing.length+" images...");
            for (var i=0;i<listing.length;i++) {
                var n = listing[i];
                var s = n.getAttribute('src');
                if (s && s.indexOf("http://images.kingdomofloathing.com/otherimages/sauceror")==0) {
                    //GM_log("is a sauceror");
                    return true;
                } 
            }
            break;
        }
    }
    //GM_log("is NOT a sauceror");
    return false;
}

function isSaucepotion(i1,i2) {
    var ings=["lemon","squashed frog","orange","lime","grapefruit","salamander spleen","soda water",
              "cherry","olive","eye of newt","strawberry","jumbo olive","tomato","banana","jabañero pepper",
              "grapes","glass of goat's milk","decaying goldfish liver","cranberries","papaya",
              "hot powder","cold powder","stench powder","spooky powder","sleaze powder"];
    var sings=["kiwi","kumquat","plum","tangerine","tonic water","pear","cocktail onion","raspberry",
               "peach","dill","gr8ps","blackberry" ];
    if (i1=='scrumptious reagent' || i1=='scrumdiddlyumptious solution') {
        for (var i=0;i<ings.length;i++)
            if (ings[i]==i2)
                return true;
        for (var i=0;i<sings.length;i++)
            if (sings[i]==i2)
                return true;
    }
    return false;
}

if (window.location.href.indexOf('mode=discoveries')>=0 || window.location.href.indexOf('mode=')<0 || window.location.href.indexOf('stay=1')>=0) {
    isS=isSauceror();
    gatherData();
    showData();
}
