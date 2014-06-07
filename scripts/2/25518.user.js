// ==UserScript==
// @name		Gmail Hebrew Date
// @namespace     none
// @description   Gmail Hebrew Date
// @include	http://mail.google.com/mail/*
// @include	https://mail.google.com/mail/*
// @include	http://mail.gmail.com/mail/*
// @include	https://mail.gmail.com/mail/*
// @include	http://mail.gmail.com/*
// @include	https://mail.gmail.com/*
// @include	https://mail.gmail.com/mail/*/*/*
// @include	https://mail.gmail.com/mail/*/*/*/*
// @include	https://mail.gmail.com/mail/*/*/*/*/*
// ==/UserScript==

// עודכן בליל ט"ז בתשרי ה'תשע"ג

isHebrew=document.getElementsByTagName('html')[0].dir=="rtl";

	function makeArray() 
	{
		this[0] = makeArray.arguments.length;
		for (i = 0; i < makeArray.arguments.length; i = i + 1)
			this[i+1] = makeArray.arguments[i];
	}

	var hebMonth = new makeArray(
		'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
		'תשרי', 'מרחשון', 'כסלו', 'טבת', 'שבט',
		'אדר', 'אדר א\'', 'אדר ב\'');
	var gim = new makeArray(
//                    ' ',
		'א\'','ב\'','ג\'','ד\'','ה\'','ו\'','ז\'','ח\'','ט\'','י\'',
		'י"א','י"ב','י"ג','י"ד','ט"ו','ט"ז','י"ז','י"ח','י"ט','כ\'',
		'כ"א','כ"ב','כ"ג','כ"ד','כ"ה','כ"ו','כ"ז','כ"ח','כ"ט','ל\''
	);
	gim[65]='ס"ה';
	gim[66]='ס"ו';
	gim[67]='ס"ז';
	gim[68]='ס"ח';
	gim[69]='ס"ט';
	gim[70]='ע\'';
	gim[71]='ע"א';
	gim[72]='ע"ב';
	gim[73]='ע"ג';
	gim[74]='ע"ד';

	gim[5765]='תשס"ה';
	gim[5766]='תשס"ו';
	gim[5767]='תשס"ז';
	gim[5768]='תשס"ח';
	gim[5769]='תשס"ט';
	gim[5770]='תש"ע';
	gim[5771]='תשע"א';
	gim[5772]='תשע"ב';
	gim[5773]='תשע"ג';
	gim[5774]='תשע"ד';
	
	var weekDay = new makeArray('Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Shabbat');

	function Gauss(year) 
	{
		var a,b,c;
		var m;
		var	Mar;	// "day in March" on which Pesach falls (return value)

		a = Math.floor((12 * year + 17) % 19);
		b = Math.floor(year % 4);
		m = 32.044093161144 + 1.5542417966212 * a +  b / 4.0 - 0.0031777940220923 * year;
		if (m < 0)
			m -= 1;
		Mar = Math.floor(m);
		if (m < 0)
			m++;
		m -= Mar;

		c = Math.floor((Mar + 3 * year + 5 * b + 5) % 7);
		if(c == 0 && a > 11 && m >= 0.89772376543210 )
			Mar++;
		else if(c == 1 && a > 6 && m >= 0.63287037037037)
			Mar += 2;
		else if(c == 2 || c == 4 || c == 6)
			Mar++;

		Mar += Math.floor((year - 3760) / 100) - Math.floor((year - 3760) / 400) - 2;
		return Mar;
	}

	function leap(y) {
		return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
	}

	function civMonthLength(month, year) 
	{
		if(month == 2)
			return 28 + leap(year);
		else if(month == 4 || month == 6 || month == 9 || month == 11)
		   return 30;
		else
			return 31;
	}
	function civ2heb(day, month, year) 
	{
		var d = day;
		var    m = month;
		var y = year;
		var hy;
		var pesach;
		var anchor;
		var adarType;

		m -= 2;
		if (m <= 0) { // Jan or Feb
			m += 12;
			y -= 1;
		}

		d += Math.floor(7 * m / 12 + 30 * (m - 1)); // day in March
		hy = y + 3760;    // get Hebrew year
		pesach = Gauss(hy);
		if (d <= pesach - 15) { // before 1 Nisan
			anchor = pesach;
			d += 365;
			if(leap(y))
				d++;
			y -= 1;
			hy -= 1;
			pesach = Gauss(hy);
		}
		else
			anchor = Gauss(hy + 1);

		d -= pesach - 15;
		anchor -= pesach - 12;
		y++;
		if(leap(y))
			anchor++;

		for(m = 0; m < 11; m++) {
			var days;
			if(m == 7 && anchor % 30 == 2)
				days = 30; // Cheshvan
			else if(m == 8 && anchor % 30 == 0)
				days = 29; // Kislev
			else
				days = 30 - m % 2;
			if(d <= days)
				break;
			d -= days;
		}

		adarType = 0;            // plain old Adar
		if (m == 11 && anchor >= 30) {
			if (d > 30) {
				adarType = 2;    // Adar 2
				d -= 30;
			}
			else
				adarType = 1;    // Adar 1
		}

		if(m >= 6)        // Tishrei or after?
			hy++;        // then bump up year

		if(m == 11)            // Adar?
			m += adarType;    // adjust for Adars
		
		return new Array(d,m,hy);
	}
	function Easter(Y) {
		// based on the algorithm of Oudin
		var C = Math.floor(Y / 100);
		var N = Y - 19 * Math.floor(Y / 19);
		var K = Math.floor((C - 17) / 25);
		var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
		I = I - 30*Math.floor((I / 30));
		I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
		var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
		J = J - 7 * Math.floor(J / 7);
		var L = I - J;
		var M = 3 + Math.floor((L + 40) / 44);
		var D = L + 28 - 31 * Math.floor(M / 4);

		var ret = new Object();
		ret[1] = M;
		ret[2] = D;
		return ret;
	}

	function DOW(day,month,year) {
		var a = Math.floor((14 - month)/12);
		var y = year - a;
		var m = month + 12*a - 2;
		var d = (day + y + Math.floor(y/4) - Math.floor(y/100) +
				Math.floor(y/400) + Math.floor((31*m)/12)) % 7;
		return d + 1;
	}

	function NthDOW(nth,weekday,month,year) {
		if (nth > 0)
			return (nth - 1) * 7 + 1 + (7 + weekday - DOW((nth - 1) * 7 + 1, month, year)) % 7;
		var days = civMonthLength(month, year);
		return days - (DOW(days, month, year) - weekday + 7) % 7;
	}

	var googMonth = new makeArray('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	var hebGoogMonth = new makeArray('ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני','יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר');
	var hebGoogMonth2 = new makeArray('בינו', 'בפבר', 'במרץ', 'באפר', 'במאי', 'ביונ','ביול', 'באוג', 'בספט', 'באוק', 'בנוב', 'בדצמ');
		
	function substr(s,s2)
	{
		var j=0;
		var i=0;
		for (i=0;i<s.length;i++) {
			for (j=0;j<s2.length&&(j+i)<s.length;j++)
			{
				if (s2.charAt(j)!=s.charAt(i+j))
					break;
			}
			if (s2.charAt(j-1)==s.charAt(i+j-1)&&j==s2.length) 
				return i;
		}
		return -1;
	}

	function fsubstr(s,s2)
	{
		var j=0;
		var i=0;
		for (i=0;i<s2.length;i++) {
			if (s2.charAt(i)!=s.charAt(i))
				return -1;
		}
		return 0;
	}
	

	var now=new Date;
	var ny=now.getYear();
	if(ny<1000)// in firefox
		ny=1900+ny;

	todayHD=civ2heb(now.getDate(),now.getMonth(),ny);
	function civ2hebText(day, month, year,showyear) 
	{
		res=civ2heb(day, month, year);
	}

	function setHebrewDate(e,hd)
	{
		d=hd[0];
		m=hd[1];
		hy=hd[2];
		
		e.innerHTML=gim[d] + ' ב' + hebMonth[m+1]+ (hy<todayHD[2]?(' '+gim[hy%100]):"") ;
		e.title=gim[d] + ' ב' + hebMonth[m+1] + ' ' + gim[hy];
		e.parentNode.style.direction="rtl";
		e.parentNode.style.textAlign="right";
	}
	
	function checkall(a) 
	{
		var now = new Date;
		var tyear = now.getYear()+1900;
		var es=a.getElementsByTagName('span');
		var j,y,a;
		
		var c1=0;
		for (var i=0;i<es.length;i++) 
		{                        
			var e = es[i];
			var text=e.innerHTML;
			var iii=fsubstr(text,'<b>');
			if (iii==0)
				text=text.substr(3,text.length-7);
			var a=text.split('/');
			if (a.length==3&&text.length<=8)
			{
				y=eval(a[2]);
				y=(y<20)?2000+y:1900+y;
				var d;
				if (isHebrew)
					d=civ2heb(eval(a[0]), eval(a[1]), y,false);
				else
					d=civ2heb(eval(a[1]), eval(a[0]), y,false);
				setHebrewDate(e,d);
			}
			else if (text.length<11/*7*/)
			{
				arr=text.split(' ');
				nd=0;nm=0;
				if (arr.length!=2)
					continue;
					
				if (!isNaN(arr[0])) // if arr[0] is int
				{
					nd=arr[0];
					nm=arr[1];
					he=1;
				}
				else if (!isNaN(arr[1]))
				{
					nd=arr[1];
					nm=arr[0];
					he=0;
				}
				else
					continue;
				for (j=1;j<=12;j++)
				{
					if (he==1)
					{
						k=fsubstr(nm,hebGoogMonth[j]);
//					alert('h'+nm+' k='+k);
						if (k==-1)
							k=fsubstr(nm,hebGoogMonth2[j]);
					}
					else
						k=fsubstr(nm,googMonth[j]);

					
					if (k==0)
					{
						tday=eval(nd);
						var d=civ2heb(tday, j, tyear,false);
						setHebrewDate(e,d);
						break;
					}
				}
			}
			if (iii==0)
				e.innerHTML='<b>'+e.innerHTML+'</b>';
			
		}
	}
				
	function myfunc()
	{
		//document.getElementById("canvas_frame").contentWindow.addEventListener('load',func(){alert(1234);},false);
//		checkall(document.getElementById("canvas_frame").contentWindow.document.documentElement);
		//a=document.getElementById("canvas_frame").contentDocument.getElementsByClassName("xX"); //הגדלת רוחב העמודה 
		//checkall(document.getElementById("canvas_frame").contentDocument.lastChild);
		checkall(document);
		a=document.getElementsByClassName("xX"); //הגדלת רוחב העמודה 
		for (i=0;i<a.length;i++)
			a[i].style.width="108px";
	}

	function replyForwardChecker()
	{
		iframes=theIframe.contentWindow.document.getElementsByTagName('iframe');
		if (iframes.length>0)
		{
			gq=iframes[0].contentWindow.document.getElementsByClassName('gmail_quote');
			// reply
			l=gq[0].innerHTML.indexOf(' ')
			s=gq[0].innerHTML.substr(0,l);
			var a=s.split('/');
			if (a.length==3)
			{
				y=eval(a[0]);
				if (y<1000)
					y=(y<10)?2000+y:1900+y;
				var d=civ2hebText(eval(a[2]), eval(a[1]), y,true);
				gq[0].innerHTML=d+gq[0].innerHTML.substr(l);
			}
			//forward
			if (gq[0].innerHTML[0]=='-')
			{
				b=gq[0].innerHTML.indexOf('Date: ')+5;
				s=gq[0].innerHTML.substr(b);
				s=s.substr(0,s.indexOf("<br>"));
				l=s.length;

				var a=s.split('/');
				if (a.length==3)
				{
					y=eval(a[0]);
					if (y<1000)
						y=(y<20)?2000+y:1900+y;
					var d=civ2heb(eval(a[2]), eval(a[1]), y,true);
					gq[0].innerHTML=gq[0].innerHTML.substr(0,b+1)+d+gq[0].innerHTML.substr(b+l);
				}
			}
		}
	}

	function waitForFrame()
	{
		if (document.getElementById("canvas_frame").contentDocument)
		{
			myfunc();
			document.documentElement.removeEventListener('DOMNodeInserted',waitForFrame,false);
			document.body.onhashchange=myfunc;
			//theIframe=document.getElementById("canvas_frame");
			//theIframe.contentWindow.document.documentElement.addEventListener('DOMNodeInserted',replyForwardChecker,true);
		}
	}
	document.documentElement.addEventListener('DOMNodeInserted',waitForFrame,false);
	
	
	document.addEventListener('load', function() {
			b=document.getElementsByTagName('iframe');
			if (document.getElementById("canvas_frame"))
			{
				myfunc();
			}
	}, true);