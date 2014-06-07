// ==UserScript==
// @name           TravianFireworks
// @namespace      TravianFireworks
// @description    Travian Fireworks
// @include        http://*.travian.*/build.php*
// @include        http://*.travian.*/dorf1.php*
// @include        http://*.travian.*/dorf2.php*
// ==/UserScript==

/*

This travian script has zero practical use.

It'll show you fireworks when your town is having a celebration in the town hall.
Or you can set off the fireworks manually.

The only other time you'll see these fireworks is when you finish the quests.

*/


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

var remove0Re=new RegExp('^0*','g');
function parseInt2(str) {
        var str0=str;
        if(str==undefined) {
                GM_log('Problem with number: '+str);
                return str;
        }
        if(typeof(str)=='number') { return parseInt(str); }
        if(typeof(str)=='string') {
                str=str.trim();
                str=str.replace(remove0Re,'');
                if(str=="") return 0;
        }
        else GM_log('Very bad, not a string for parseint2:'+typeof(str)+','+str);
        var n=parseInt(str);
        if(isNaN(n)) GM_log('parseintfail:'+str0);
        return n;
}


function TravianFireworksClass() {
}
TravianFireworksClass.prototype={
GetPageGid:function() {
        var build=document.getElementById('build');
        if(!build) return null;
        var gidM=/^gid([0-9]+)$/.exec(build.className);
        if(!gidM || gidM.length<2) return null;
        var gid=parseInt2(gidM[1]);
        return gid;
},
StringToSecs:function(str) {
        str=str.trim();
        var strArr=str.split(':');
        return (parseInt2(strArr[0])*60*60)+(parseInt2(strArr[1])*60)+parseInt2(strArr[2]);
},

GetVillageCelebrationEnd:function() {
        var gid=this.GetPageGid();
        if(gid!=24) return undefined;
	var q=document.evaluate("//table[contains(@class,'under_progress')]//td[contains(@class,'dur')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

        var duration=q.singleNodeValue;
        if(!duration) return -1;
        var secs=this.StringToSecs(duration.textContent);
        if(secs==null || isNaN(secs)) return -1;
        return Math.floor((new Date().getTime()/1000)+secs);
},
GetVillage:function() {
	var q=document.evaluate("//td[contains(@class,'dot hl')]//ancestor::tr//a[contains(@href,'newdid')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(!q.singleNodeValue) { return ''; }
	var m=/newdid=([0-9]+)/.exec(q.singleNodeValue.href);
	if(!m) return '';
	return m[1];
},
RecordCelebration:function() {
	var village=this.GetVillage();
	var end=this.GetVillageCelebrationEnd();
	if(end!=undefined)
		GM_setValue('celebrationEnd'+location.hostname+'_'+village,end);
},
AddCelebrationGraphicsOnCelebration:function() {
	var village=this.GetVillage();
	var end=GM_getValue('celebrationEnd'+location.hostname+'_'+village,-1);
	var nowSecs=new Date().getTime()/1000;
	if(end>=nowSecs) {
		this.AddCelebrationGraphics();
	}
},
AddCelebrationGraphics:function() {
	var div=document.createElement('div');
	var map=document.getElementById('village_map');
	if(!map) return;

	div.innerHTML='<img class="rocket tur" src="img/x.gif" alt="" /><img class="rocket purp" src="img/x.gif" alt="" /><img tclass="rocket yell" src="img/x.gif" alt="" /><img class="rocket oran" src="img/x.gif" alt="" /><img class="rocket green" src="img/x.gif" alt="" /><img class="rocket red" src="img/x.gif" alt="" /></div>';
	map.appendChild(div);
},
AddCelebrationGraphicsLink:function() {
	if(location.href.indexOf('/dorf2.php')<0) { return; }
	var a=document.createElement('a');
	var t=this;
	a.addEventListener('click',function() {
		t.AddCelebrationGraphics();
	},false);
	a.innerHTML='Fireworks!!';
	a.href='javascript:;'
	document.getElementById('content').appendChild(a);
}

};
TravianFireworks=new TravianFireworksClass();


window.addEventListener('load',function() {
        TravianFireworks.RecordCelebration();
        TravianFireworks.AddCelebrationGraphicsOnCelebration();
        TravianFireworks.AddCelebrationGraphicsLink();
},false);


