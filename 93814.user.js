// ==UserScript==
// @name          Chordwiki Capo-Chord Mod
// @namespace     http://chordwiki.jpn.org/
// @description   指定のカポ数で自動的コードチェンジできるプラグイン
// @include       http://chordwiki.jpn.org/wiki.cgi?c=view&t=*
// ==/UserScript==

var capo=prompt("カポ数（整数）：","-0");
if(capo==null) capo=0;
else
	capo=parseInt(capo,10);
var chordtag=document.getElementsByTagName("span");
for(var i=0;i<chordtag.length;i++)
{
	if(chordtag[i].className=="chord")
	{
		var ctemp=chordtag[i].innerHTML;
		var result="";
		var cdata=ctemp.split("/");
		for(var j=0;j<cdata.length;j++){
			var chord=cdata[j];
			var cnum=0;
			switch(chord.charAt(0).toUpperCase())
			{
				case "C":
					cnum=1;
					break;
				case "D":
					cnum=3;
					break;
				case "E":
					cnum=5;
					break;
				case "F":
					cnum=6;
					break;
				case "G":
					cnum=8;
					break;
				case "A":
					cnum=10;
					break;
				case "B":
					cnum=12;
			}
			if(cnum==0) continue;
			var tail=2;
			if(chord.charAt(1)=='#')
				cnum++;
			else if(chord.charAt(1)=='b')
				cnum--;
			else
				tail=1;
			cnum+=capo;
			while(cnum<=0)
				cnum+=12;
                        while(cnum>12)
				cnum-=12;
			var head;
			switch(cnum)
			{
				case 1:
					head="C";
					break;
				case 2:
					head="C#";
					break;
				case 3:
					head="D";
					break;
				case 4:
					head="D#";
					break;
				case 5:
					head="E";
					break;
				case 6:
					head="F";
					break;
				case 7:
					head="F#";
					break;
				case 8:
					head="G";
					break;
				case 9:
					head="G#";
					break;
				case 10:
					head="A";
					break;
				case 11:
					head="Bb";
					break;
				case 12:
					head="B";
					break;
			}
			if(result!="")
				result+="/";
			result+=head+chord.substr(tail);
		}
		chordtag[i].innerHTML=result;
	}
}