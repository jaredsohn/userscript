// ==UserScript==
// @name           VDO: Ansicht der Dörfer
// @namespace      vampires-dawn
// @description    Verändert die Ansicht der eigenen Dörfer in VDO
// @include        http://vampiresdawn-online.de/planets
// @include        http://speed.vampiresdawn-online.de/planets
// ==/UserScript== 

doerfer = document.getElementsByTagName("table")[5].getElementsByTagName("tr")
da = new Object;
for (i=1;i<doerfer.length-1;i++) { 
	inp = doerfer[i].innerHTML;
	op = inp.match(/^<td><img.+?src=\"d(\d)\.gif\".+?>(.+?) \((.+?)\)( (.+?))?<\/td><td>\D*(\d+)\D*<\/td>\s*<td>\D*(\d+)\D*<\/td><td>(\d+)<\/td><td>(Abenteuer)?<\/td>.*planet\?id=(\d+)/i);
	
	if(!da[op[3]]){
		da[op[3]] = new Object;
	}
	da[op[3]][op[2]] = new Object;
	da[op[3]][op[2]].Bild = op[1];
	da[op[3]][op[2]].Else = op[5];
	da[op[3]][op[2]].Groe = op[6];
	da[op[3]][op[2]].Bevo = op[7];
	da[op[3]][op[2]].Silv = op[8];
	da[op[3]][op[2]].Ques = op[9];
	da[op[3]][op[2]].Id = op[10];
}

newplanets = "";
var ges_bevo = 0;
var ges_groe = 0;
var ges_silv = 0;
var ges_coun = 0;
for (p1 in da) {
	i = 0;
	var prov_bevo = 0;
	var prov_groe = 0;
	var prov_silv = 0;
	newplanets += "<form action=\"massbuild\" method=\"POST\">"
	newplanets += "<table style=\"margin:10px;border:1px solid #555;\" class=\"provinz\">"
	newplanets += "<tr style=\"font-size:12px;\">";
	newplanets += "<th onclick=\"cb = this.parentNode.parentNode.getElementsByTagName('input'); for(i=0;i<cb.length;i++) { cb[i].click(); }\" colspan=\"4\" style=\"padding:10px;background-color:#333;cursor:pointer;\">Provinz: "+p1+"</th>";
	newplanets += "</tr>";
	for (p2 in da[p1]) {
		newplanets += "<tr>";
		newplanets += "<td style=\"padding:3px;width:250px;text-align:left;border-top:1px solid #555;\"><img style=\"width:16px;\" src=\"http://www.vdon.net/d"+da[p1][p2].Bild+".gif\" alt=\"\" /> "+p2+" "+((da[p1][p2].Else != undefined)?"("+da[p1][p2].Else+")":"")+((da[p1][p2].Ques == "Abenteuer")?"<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3AgZCCIXnju3fwAAA3dJREFUOMtdjk9Mm2UAh3/vv36la2kpJSuuRIq1zJA0AoXCQVNtJVqWxV1kM2YxQpCNRGcyXbx6IOqFkNQM8TBYQuCw2IPJDJe5DEkTI5tkPWwIAm2zsEL2CZX+2/e9rwcXY3zuz5MHANDf3w8AaGpqIuFw2GK1Wu0AXAA8ABoBOJ1Op72zs9PS3NxMAMDn8wEAKACk02lEIhHmcrkckUikfXl5+dJBsXi/VKnsFY+O9ncLhd9SqdR4KBQKNDQ0OPx+P8vn8/9G0NHRwXp6ejypVOpd0zRVIZuVtz4aVzdjr6ib8VfVT5cvqZ31dVkoFFQymTzd3d3dGAqFGACQQCBAADgnJyffHjx16trK2AjqTAMWux2Ec1AQAApHOzuoHfci+MUEbiwunkkmk7d2d3eLzO/3a/F4PDg6OvrjLxdGlEvTiOaoB6cU8vAQpXv3UH34EFJ/AmxvQ/9jE30jo2c3NjcXqtWqTgA47mcyX9YbxoXDmW+Ixe4AVQDpjaDu9TdgKgl9Zhry+xtQjEEqifrvrqn8E31iMJH4igIQvpaWse2vJ4h2zAHOOMxaDe7TZ7D/+Wc4/PYqjn/8CbjTBU0IaFxAn5kmfn/beLlcZnRoaKjRNAxqy+fABYfgAmp1FY/fGoD993VY/S/A2NuDrfYUVi6gcQusDx6AceZqa2s7xjnnVJomOKFglMHM5SAYh1AK5msxuAcHURr+AHV1NphKwjRNSEIBADabjdD5+fl9CaB2ogUMAP7UIbiAhQtohKJ25Qps5Qqsz/YF46i1t8MwjHImk/mLAqg9yufn6j8cU6pUBpESnFJwQmCJxcA8HljFP0HBODjjEOffVzvb29NCCJOGw+Gnc3NzSeeLQXJwcKCIYQKUgFAGtXoX2u5jCCbAKANVCkcnTyqb10sWFxauh0KhGnO73XJtba3U1dW1//x75wdKd39VFl0nlFKIrS2wchlSKZhSQg8GFLn8KVm+fXt4dnY2XalUSqxQKCiPx2OsrKysv9QefNTyztCbxZc7VTmXJRZdhwGC/dZWHFy8qHgsTn6+c2d4amrqh2q1erixsSEJnhGNRnk2m7UnEom2s+fOjTx3wjdKoBgASKWquWz26uLCwvWlpaUtr9dbTKfTJv6Pz+cjfX19GgAHAPfAwIA/Go22AmhgjDl6e3u1YDBI/uv8Da3kaDKJ/aoQAAAAAElFTkSuQmCC\" alt=\"Quest\" />":"")+"</td>";
		newplanets += "<td style=\"padding:3px;width:200px;border-top:1px solid #555;\">"+da[p1][p2].Bevo+" / " +da[p1][p2].Groe+" ("+ Math.floor(100*da[p1][p2].Bevo/da[p1][p2].Groe) +"%)</td>";
		newplanets += "<td style=\"padding:3px;width:150px;border-top:1px solid #555;\">"+da[p1][p2].Silv+" Silberminen</td>";
		newplanets += "<td style=\"padding:3px;width:50px;border-top:1px solid #555;\"><a style=\"border:0px transparent;background:transparent;\" href=\"planet?id="+da[p1][p2].Id+"\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACL0lEQVQ4y52TzUvUURSGn3vu+Y2OOjoKKRIqglkYGe1caAgiWeCmwmhtizbR1l2LijZR0aZFG/+CFn0QSLgqCUoTwiA/NllqosE4ov5m5t7bIk0cB4IOvIt77+E5L4f3wn/U4vSbMzsrX2YeDnfc1eLH53fO30yV2bQpug+Ai1J09l/rzC5OXlzPzIUQ5NUhwPhX9+jtQlxy8lBvE3XvRkEsiWNdRqOIQ4ByFWorFVNkIQSD31rFUQU+kM/nULXIXsPgffq4QLM1ilXF2uiAVBWDwXmPc558LkdCdR+wvErvgxtNU5mcQ9WiKgdk1YIB5zzOewq5GNUI7b7FvSvdZ0c24iV6jvezOfSMhaddJEQAU7RIwfmA2jyV5etEkSKZDPZEi1JTPc/H5Se0Nysdw69RX4VGsi8VjIGC8zTW/eTzfBJVRSIDUrMU0g0gSdjUH3z70IQtC1jRfVkl7O4gux3R2vCLKLLYlk5SL8bWCu+nML0DNIyNtgU722skUUDEIiKICEYMjalAfaUju1XFSrachN+csN8nmV2d5mXHACc/zTDXtXju1JoxGGsxIn8lRqiv9BxJFgjBk0yWI25nQgEHuPHbjAC+53p8VX2yZJCMAef9n0M+R7IoSJndNqwqpjSCgvsDcHFMdYUeTmLCBiJJUOovqBUgUPAQcjGaTmEGBwcvG2Mu7ZnMbudiG/JSyoG1hva6mNZa01iXrug73Xb0sQEUiIqG/asSQA2w8RuvX78krM1MVwAAAABJRU5ErkJggg==\" alt\"\" /></a><input type=\"checkbox\" name=\"m"+da[p1][p2].Id+"\" style=\"width:16px;height:16px;margin-left:10px;\" /></td>"
		newplanets += "</tr>";
		i++;
		prov_bevo += parseInt(da[p1][p2].Bevo);
		prov_groe += parseInt(da[p1][p2].Groe);
		prov_silv += parseInt(da[p1][p2].Silv);
	}
	ges_bevo += prov_bevo;
	ges_groe += prov_groe;
	ges_silv += prov_silv;
	ges_coun += i;
	newplanets += "<tr>";
	newplanets += "<td style=\"padding:3px;border-top:1px solid #555;\">"+i+((i==1)?" Dorf":" D&ouml;rfer")+"</td>";
	newplanets += "<td style=\"padding:3px;border-top:1px solid #555;\">"+prov_bevo+" / "+prov_groe+" ("+ Math.floor(100*prov_bevo/prov_groe) +"%)</td>";
	newplanets += "<td style=\"padding:3px;border-top:1px solid #555;\">"+prov_silv+" Silberminen</td>";
	newplanets += "<td style=\"padding:3px;border-top:1px solid #555;\"><a style=\"border:0px transparent;background:transparent;\" href=\"search?search="+encodeURIComponent(p1)+"\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACL0lEQVQ4y52TzUvUURSGn3vu+Y2OOjoKKRIqglkYGe1caAgiWeCmwmhtizbR1l2LijZR0aZFG/+CFn0QSLgqCUoTwiA/NllqosE4ov5m5t7bIk0cB4IOvIt77+E5L4f3wn/U4vSbMzsrX2YeDnfc1eLH53fO30yV2bQpug+Ai1J09l/rzC5OXlzPzIUQ5NUhwPhX9+jtQlxy8lBvE3XvRkEsiWNdRqOIQ4ByFWorFVNkIQSD31rFUQU+kM/nULXIXsPgffq4QLM1ilXF2uiAVBWDwXmPc558LkdCdR+wvErvgxtNU5mcQ9WiKgdk1YIB5zzOewq5GNUI7b7FvSvdZ0c24iV6jvezOfSMhaddJEQAU7RIwfmA2jyV5etEkSKZDPZEi1JTPc/H5Se0Nysdw69RX4VGsi8VjIGC8zTW/eTzfBJVRSIDUrMU0g0gSdjUH3z70IQtC1jRfVkl7O4gux3R2vCLKLLYlk5SL8bWCu+nML0DNIyNtgU722skUUDEIiKICEYMjalAfaUju1XFSrachN+csN8nmV2d5mXHACc/zTDXtXju1JoxGGsxIn8lRqiv9BxJFgjBk0yWI25nQgEHuPHbjAC+53p8VX2yZJCMAef9n0M+R7IoSJndNqwqpjSCgvsDcHFMdYUeTmLCBiJJUOovqBUgUPAQcjGaTmEGBwcvG2Mu7ZnMbudiG/JSyoG1hva6mNZa01iXrug73Xb0sQEUiIqG/asSQA2w8RuvX78krM1MVwAAAABJRU5ErkJggg==\" alt\"\" /></a></td>";
	newplanets += "</tr>";
	newplanets += "</table>";
}
newplanets += "<table style=\"margin:10px;border:1px solid #555;\" class=\"provinz\">"
newplanets += "<tr style=\"font-size:12px;\">";
newplanets += "<th onclick=\"cb = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input'); for(i=0;i<cb.length;i++) { if (cb[i].type == 'checkbox') { cb[i].click(); } }\" colspan=\"4\" style=\"padding:10px;background-color:#333;cursor:pointer;\">Alle Provinzen</th>";
newplanets += "</tr>";
newplanets += "<tr>";
newplanets += "<td style=\"padding:3px;width:250px;border-top:1px solid #555;\">"+ges_coun+((ges_coun==1)?" Dorf":" D&ouml;rfer")+"</td>";
newplanets += "<td style=\"padding:3px;width:200px;border-top:1px solid #555;\">"+ges_bevo+" / "+ges_groe+" ("+ Math.floor(100*ges_bevo/ges_groe) +"%)</td>";
newplanets += "<td style=\"padding:3px;width:150px;border-top:1px solid #555;\">"+ges_silv+" Silberminen</td>";
newplanets += "<td style=\"padding:3px;width:50px;border-top:1px solid #555;\"></td>";
newplanets += "</tr>";
newplanets += "</table>";
newplanets += "<input type=\"submit\" value=\"D&ouml;rfer besuchen…\">";
newplanets += "</form>";
document.getElementsByTagName("center")[2].innerHTML = newplanets;