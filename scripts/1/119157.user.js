// ==UserScript==
// @name           	COD Elite+ 
// @namespace      	COD Elite+
// @author          http://www.facebook.com/mike.didomizio
// @description    	Minor improvements and more stats for Call of Duty Elite
// @version			0.2
// @include        	https://elite.callofduty.com/career#/playercardmw3
// @include        	https://elite.callofduty.com/career#/playercardmw3/*
// @include			https://elite.callofduty.com/career/*/*/playercardmw3
// @include			https://elite.callofduty.com/career/*/*/playercardmw3/*
// ==/UserScript==

//VERSION 0.1
//	- ABLE TO SEE K/D, WIN PERCENTAGE TREND

//VERSION 0.1a
//	- ABLE TO SEE OTHER PEOPLE'S K/D, WIN PERCENTAGE TREND

//VERSION 0.2
//	- ABLE TO SEE HOW MANY HOURS PLAYED SINCE RELEASE DATE (NOV 8,2011)
//	- ABLE TO COMPARE WEAPONS AND EQUIPMENT STATS WITH OTHERS
//	- IF K/D RATIO IS GOING DOWN, SHOWS WHAT RECENT K/D RATIO IS

var _0x517d=["\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74","\x73\x65\x63\x5F\x63\x61\x72\x65\x65\x72\x2D\x73\x75\x6D\x6D\x61\x72\x79\x6D\x77\x33","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x68\x33","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x6E\x65\x78\x74\x53\x69\x62\x6C\x69\x6E\x67","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","","\x6D\x77\x33\x5F\x6D\x61\x74\x63\x68\x5F\x64\x65\x74\x61\x69\x6C\x73","\x6B\x69\x6C\x6C\x73","\x64\x65\x61\x74\x68\x73","\x6B\x64\x72\x61\x74\x69\x6F","\x72\x61\x74\x69\x6F","\x6B\x64\x69\x6E\x74\x65\x72\x76\x61\x6C\x73","\x69\x6E\x74\x65\x72\x76\x61\x6C\x73","\x77\x69\x6E","\x6C\x6F\x73\x65","\x77\x6C\x70\x65\x72\x63\x65\x6E\x74\x61\x67\x65","\x77\x6C\x72\x61\x74\x69\x6F","\x68\x6F\x75\x72\x73\x50\x6C\x61\x79\x65\x64","\x64\x61\x79\x73\x53\x69\x6E\x63\x65\x52\x65\x6C\x65\x61\x73\x65","\x68\x6F\x75\x72\x73\x50\x65\x72\x44\x61\x79\x50\x6C\x61\x79\x65\x64","\x72\x65\x63\x65\x6E\x74\x4D\x61\x74\x63\x68\x65\x73","\x61\x76\x61\x74\x61\x72","\x70\x65\x72\x66\x6F\x72\x6D\x61\x6E\x63\x65","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x70\x61\x72\x73\x65","\x28","\x29","\x74\x61\x62\x6C\x65","\x73\x65\x63\x5F\x77\x65\x61\x70\x6F\x6E\x2D\x70\x65\x72\x66\x6F\x72\x6D\x61\x6E\x63\x65\x6D\x77\x33","\x6C\x65\x6E\x67\x74\x68","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65","\x63\x6C\x6F\x6E\x65\x64","\x74\x72","\x74\x64","\x73\x70\x61\x6E","\x64\x69\x76","\x63\x68\x61\x72\x41\x74","\x6C\x6F\x67","\x25","\x73\x6C\x69\x63\x65","\x77\x69\x64\x74\x68","\x73\x74\x79\x6C\x65","\x77\x68\x69\x74\x65\x53\x70\x61\x63\x65","\x6E\x6F\x77\x72\x61\x70","\x20\x28","\x68\x65\x69\x67\x68\x74","\x35\x30\x25","\x7A\x49\x6E\x64\x65\x78","\x31\x30","\x3C\x64\x69\x76\x20\x73\x74\x79\x6C\x65\x3D\x22\x77\x69\x64\x74\x68\x3A","\x25\x3B\x20\x68\x65\x69\x67\x68\x74\x3A\x35\x30\x25\x3B\x20\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x35\x3B\x20\x74\x6F\x70\x3A\x35\x30\x25\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72\x3A\x23\x31\x31\x33\x36\x33\x30\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x25\x3B\x20\x68\x65\x69\x67\x68\x74\x3A\x35\x30\x25\x3B\x20\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x35\x3B\x20\x74\x6F\x70\x3A\x35\x30\x25\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72\x3A\x23\x41\x31\x33\x31\x33\x31\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x67\x65\x74\x54\x69\x6D\x65","\x72\x6F\x75\x6E\x64","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x6D\x61\x74\x63\x68","\x6E\x75\x6C\x6C","\x74\x69\x6D\x65","\x70\x75\x73\x68","\x77\x65\x61\x70\x6F\x6E","\x65\x71\x75\x69\x70\x6D\x65\x6E\x74","\x61\x74\x74\x61\x63\x68\x6D\x65\x6E\x74","\x75\x6E\x6B\x6E\x6F\x77\x6E","\x64\x6F\x6E\x75\x74\x5F\x74\x6F\x74\x61\x6C\x5F\x68\x6F\x75\x72\x73","\x3C\x62\x72\x2F\x3E\x3C\x73\x70\x61\x6E\x20\x73\x74\x79\x6C\x65\x3D\x27\x63\x6F\x6C\x6F\x72\x3A\x23\x46\x46\x46\x27\x3E\x28","\x20\x48\x52\x53\x2F\x44\x41\x59\x29\x3C\x2F\x73\x70\x61\x6E\x3E","\x61\x72\x74\x5F\x70\x6C\x61\x79\x65\x72\x63\x61\x72\x64\x6D\x77\x33","\x73\x72\x63","\x69\x6D\x67","\x68\x34","\x74\x6F\x46\x69\x78\x65\x64","\x3C\x68\x72\x2F\x3E\x3C\x68\x36\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x65\x66\x74\x22\x3E\x4B\x2F\x44\x20\x52\x61\x74\x69\x6F\x20\x3A\x20","\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x69\x67\x68\x74\x22\x3E","\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x68\x36\x3E","\x3C\x68\x72\x2F\x3E\x59\x6F\x75\x72\x20\x72\x61\x74\x69\x6F\x20\x69\x6E\x20\x72\x65\x63\x65\x6E\x74\x20\x67\x61\x6D\x65\x73\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20","\x3C\x68\x72\x2F\x3E\x57\x69\x6E\x2F\x4C\x6F\x73\x65\x20\x72\x61\x74\x69\x6F\x20","\x3C\x68\x72\x2F\x3E\x3C\x68\x36\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x65\x66\x74\x22\x3E\x59\x6F\x75\x20\x68\x61\x76\x65\x20\x77\x6F\x6E\x20\x74\x68\x65\x20\x6C\x61\x73\x74\x20","\x20\x6F\x75\x74\x20\x6F\x66\x20","\x20\x67\x61\x6D\x65\x73\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x68\x36\x3E","\x3C\x68\x72\x2F\x3E\x3C\x68\x36\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x65\x66\x74\x22\x3E","\x25\x20\x2D\x20\x49\x74\x20\x77\x69\x6C\x6C\x20\x74\x61\x6B\x65\x20","\x20\x67\x61\x6D\x65\x73\x20\x74\x6F\x20\x67\x65\x74\x20\x68\x65\x72\x65\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x68\x36\x3E","\x57\x69\x6E\x2F\x4C\x6F\x73\x65\x20\x72\x61\x74\x69\x6F\x20","\x3C\x68\x72\x2F\x3E\x3C\x68\x36\x3E\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x65\x66\x74\x22\x3E\x59\x6F\x75\x72\x20\x77\x69\x6E\x20\x70\x65\x72\x63\x65\x6E\x74\x61\x67\x65\x20\x69\x6E\x20\x74\x68\x65\x20\x6C\x61\x73\x74\x20","\x20\x67\x61\x6D\x65\x73\x20\x69\x73\x20\x6C\x6F\x77\x65\x72\x20\x74\x68\x61\x6E\x20\x77\x68\x61\x74\x20\x69\x74\x20\x69\x73\x20\x6E\x6F\x77\x20\x3A\x20","\x25\x3C\x2F\x73\x70\x61\x6E\x3E\x3C\x2F\x68\x36\x3E","\x68\x36","\x72\x65\x70\x6C\x61\x63\x65","\x63\x68\x69\x6C\x64\x4E\x6F\x64\x65\x73","\x6D\x61\x74\x63\x68\x2D\x69\x74\x65\x6D","\x72\x6D\x5F\x6F\x74\x68\x65\x72\x5F\x73\x74\x61\x74\x73","\x20\x3C\x65\x6D\x3E\x2F\x3C\x2F\x65\x6D\x3E\x20","\x73\x70\x6C\x69\x74","\x6C\x65\x66\x74\x20\x72\x6D\x5F\x6F\x75\x74\x63\x6F\x6D\x65","\x68\x35","\x56\x49\x43\x54\x4F\x52\x59","\x44\x45\x46\x45\x41\x54"]
window[_0x517d[0]](checkIfLoaded,5000);
function checkIfLoaded()
{
	if(document[_0x517d[2]](_0x517d[1]))
	{
		if(!document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[2]||!document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[2][_0x517d[5]]||document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[2][_0x517d[5]][_0x517d[6]]==_0x517d[7]||!document[_0x517d[2]](_0x517d[8]))
		{
			window[_0x517d[0]](main,2000);
			return false;
		}
		else 
		{
			main();
		}
	}
	else 
	{
		window[_0x517d[0]](checkIfLoaded,2000);
	}
}
;
function main()
{
	var _0xdaefx3= new Object();
	if(!_0xdaefx2b())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		var _0xdaefx4=_0xdaefx2b();
		_0xdaefx3[_0x517d[9]]=_0xdaefx4[_0x517d[9]];
		_0xdaefx3[_0x517d[10]]=_0xdaefx4[_0x517d[10]];
		_0xdaefx3[_0x517d[11]]=_0xdaefx4[_0x517d[12]];
		_0xdaefx3[_0x517d[13]]=_0xdaefx4[_0x517d[14]];
		delete _0xdaefx4;
	}
	if(!_0xdaefx2f())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		var _0xdaefx5=_0xdaefx2f();
		_0xdaefx3[_0x517d[15]]=_0xdaefx5[_0x517d[15]];
		_0xdaefx3[_0x517d[16]]=_0xdaefx5[_0x517d[16]];
		_0xdaefx3[_0x517d[17]]=_0xdaefx5[_0x517d[18]];
		delete _0xdaefx5;
	}
	if(!_0xdaefx1d())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		var _0xdaefx6=_0xdaefx1d();
		_0xdaefx3[_0x517d[19]]=_0xdaefx6[0];
		_0xdaefx3[_0x517d[20]]=_0xdaefx6[1];
		_0xdaefx3[_0x517d[21]]=_0xdaefx6[2];
		delete _0xdaefx6;
	}
	if(!_0xdaefx30())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		_0xdaefx3[_0x517d[22]]=_0xdaefx30();
	}
	if(!_0xdaefx1b())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		_0xdaefx3[_0x517d[23]]=_0xdaefx1b();
	}
	if(!_0xdaefx14())
	{
		_0xdaefx19();
		return false;
	}
	else 
	{
		var _0xdaefx7=_0xdaefx14();
		if(_0xdaefx7==true)
		{
			if(localStorage[_0x517d[24]])
			{
				var _0xdaefx7=localStorage[_0x517d[24]];
				_0xdaefx8(_0xdaefx7);
			}
		}
		else 
		{
			localStorage[_0x517d[24]]=JSON[_0x517d[25]](_0xdaefx7);
		}
	}
	function _0xdaefx8(_0xdaefx9)
	{
		var _0xdaefx9=JSON[_0x517d[26]](_0xdaefx9);
		_0xdaefx9=eval(_0x517d[27]+_0xdaefx9+_0x517d[28]);
		var _0xdaefxa=document[_0x517d[2]](_0x517d[30])[_0x517d[4]](_0x517d[29]);
		for(var _0xdaefxb=0;_0xdaefxb<_0xdaefxa[_0x517d[31]];_0xdaefxb++)
		{
			if(_0xdaefxa[_0xdaefxb][_0x517d[33]][_0x517d[32]]!=_0x517d[34])
			{
				var _0xdaefxc=_0xdaefxa[_0xdaefxb][_0x517d[4]](_0x517d[35]);
				if(!_0xdaefxc[0][_0x517d[4]](_0x517d[36]))
				{
					return false;
				}
				for(var _0xdaefxd=0;_0xdaefxd<_0xdaefxc[_0x517d[31]];_0xdaefxd++)
				{
					if(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0x517d[31]]>0)
					{
						var _0xdaefxe=_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[0][_0x517d[4]](_0x517d[37])[0][_0x517d[6]];
						for(var _0xdaefxf=0;_0xdaefxf<_0xdaefx9[_0x517d[24]][_0x517d[31]];_0xdaefxf++)
						{
							if(_0xdaefxe==_0xdaefx9[_0x517d[24]][_0xdaefxf][0])
							{
								for(var _0xdaefx10=1;_0xdaefx10<_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0x517d[31]];_0xdaefx10++)
								{
									var _0xdaefx11=parseFloat(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]);
									if(_0xdaefx11[_0x517d[31]]>1)
									{
										console[_0x517d[40]](_0xdaefx11[_0x517d[39]](_0xdaefx11[_0x517d[31]]-1));
										if(_0xdaefx11[_0x517d[39]](_0xdaefx11[_0x517d[31]]-1)==_0x517d[41])
										{
											_0xdaefx11[_0x517d[42]](0,_0xdaefx11[_0x517d[31]]-1);
										}
									}
									var _0xdaefx12=parseInt(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[44]][_0x517d[43]]);
									if(_0xdaefx11!=0)
									{
										var _0xdaefx12=(_0xdaefx9[_0x517d[24]][_0xdaefxf][_0xdaefx10]/_0xdaefx11)*_0xdaefx12;
										if(_0xdaefx12>100)
										{
											_0xdaefx12=100;
										}
										else 
										{
											if(_0xdaefx12<0)
											{
												_0xdaefx12=0;
											}
										}
									}
									else 
									{
										var _0xdaefx12=0;
									}
									_0xdaefx12=parseInt(_0xdaefx12);
									_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[44]][_0x517d[45]]=_0x517d[46];
									_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0x517d[47]+_0xdaefx9[_0x517d[24]][_0xdaefxf][_0xdaefx10]+_0x517d[28];
									_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[44]][_0x517d[48]]=_0x517d[49];
									_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[44]][_0x517d[50]]=_0x517d[51];
									if(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10+1])
									{
										_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0x517d[52]+_0xdaefx12+_0x517d[53];
									}
									else 
									{
										_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefx10][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0x517d[52]+_0xdaefx12+_0x517d[54];
									}
								}
							}
						}
					}
				}
			}
		}
	}
	;
	function _0xdaefx13()
	{
		return Math[_0x517d[56]](( new Date())[_0x517d[55]]()/1000);
	}
	;
	function _0xdaefx14()
	{
		if(!document[_0x517d[2]](_0x517d[30]))
		{
			return false;
		}
		if(!document[_0x517d[2]](_0x517d[30])[_0x517d[4]](_0x517d[29]))
		{
			return false;
		}
		var _0xdaefx15=document[_0x517d[58]][_0x517d[57]];
		var _0xdaefx16=_0xdaefx15[_0x517d[59]](/^https\:\/\/elite\.callofduty\.com\/career\#\/playercardmw3(\/(career\-summary|recent\-matches|custom\-classes|challenges|vault|leaderboard\-tracker|weapon\-performance|))?/);
		console.log(_0xdaefx16);
		if(_0xdaefx16&&_0xdaefx16!=_0x517d[60])
		{
			var _0xdaefx17= new Object();
			_0xdaefx17[_0x517d[61]]=_0xdaefx13();
			_0xdaefx17[_0x517d[24]]= new Array();
			var _0xdaefxa=document[_0x517d[2]](_0x517d[30])[_0x517d[4]](_0x517d[29]);
			for(var _0xdaefxb=0;_0xdaefxb<_0xdaefxa[_0x517d[31]];_0xdaefxb++)
			{
				if(_0xdaefxa[_0xdaefxb][_0x517d[33]][_0x517d[32]]!=_0x517d[34])
				{
					var _0xdaefxc=_0xdaefxa[_0xdaefxb][_0x517d[4]](_0x517d[35]);
					if(!_0xdaefxc[0][_0x517d[4]](_0x517d[36]))
					{
						return false;
					}
					for(var _0xdaefxd=0;_0xdaefxd<_0xdaefxc[_0x517d[31]];_0xdaefxd++)
					{
						if(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0x517d[31]]>0)
						{
							var _0xdaefx18= new Array();
							for(var _0xdaefxf=0;_0xdaefxf<_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0x517d[31]];_0xdaefxf++)
							{
								if(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefxf][_0x517d[4]](_0x517d[38])[_0x517d[31]]>0)
								{
									_0xdaefx18[_0x517d[62]](_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefxf][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]);
								}
								else 
								{
									_0xdaefx18[_0x517d[62]](_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0xdaefxf][_0x517d[4]](_0x517d[37])[0][_0x517d[6]]);
								}
							}
							switch(_0xdaefxc[_0xdaefxd][_0x517d[4]](_0x517d[36])[_0x517d[31]])
							{
								case 6:_0xdaefx18[_0x517d[62]](_0x517d[63]);
								break ;
								case 4:_0xdaefx18[_0x517d[62]](_0x517d[64]);
								break ;
								case 3:_0xdaefx18[_0x517d[62]](_0x517d[65]);
								break ;
								default:_0xdaefx18[_0x517d[62]](_0x517d[66]);
							}
							_0xdaefx17[_0x517d[24]][_0x517d[62]](_0xdaefx18);
						}
					}
				}
			}
			_0xdaefx17=JSON[_0x517d[25]](_0xdaefx17);
			return _0xdaefx17;
		}
		else 
		{
			return true;
		}
	}
	;
	function _0xdaefx19()
	{
		window[_0x517d[0]](main,2000);
	}
	;
	document[_0x517d[2]](_0x517d[67])[_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0x517d[68]+_0xdaefx3[_0x517d[21]]+_0x517d[69];
	var _0xdaefx1a=_0xdaefx21(_0xdaefx3);
	document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[2][_0x517d[33]][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0xdaefx1a;
	delete _0xdaefx1a;
	var _0xdaefx1a=_0xdaefx25(_0xdaefx3);
	document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[3][_0x517d[33]][_0x517d[4]](_0x517d[38])[0][_0x517d[6]]+=_0xdaefx1a;
	delete _0xdaefx1a;
	function _0xdaefx1b()
	{
		if(!document[_0x517d[2]](_0x517d[70]))
		{
			return false;
		}
		var _0xdaefx1c=document[_0x517d[2]](_0x517d[70])[_0x517d[4]](_0x517d[72])[0][_0x517d[71]];
		return _0xdaefx1c;
	}
	;
	function _0xdaefx1d()
	{
		if(!document[_0x517d[2]](_0x517d[67])||!document[_0x517d[2]](_0x517d[67])[_0x517d[4]](_0x517d[73]))
		{
			return false;
		}
		var _0xdaefx6= new Array();
		_0xdaefx6[0]=document[_0x517d[2]](_0x517d[67])[_0x517d[4]](_0x517d[73])[0][_0x517d[6]];
		if(!_0xdaefx6[0]||_0xdaefx6[0]==_0x517d[7])
		{
			_0xdaefx6[0]=0;
		}
		var _0xdaefx1e= new Date();
		var _0xdaefx1f= new Date(2011,10,8);
		var _0xdaefx20=24*60*60*1000;
		_0xdaefx6[1]=(_0xdaefx1e[_0x517d[55]]()-_0xdaefx1f[_0x517d[55]]())/_0xdaefx20;
		_0xdaefx6[2]=_0xdaefx6[0]/_0xdaefx6[1];
		_0xdaefx6[2]=_0xdaefx6[2][_0x517d[74]](2);
		return _0xdaefx6;
	}
	;
	function _0xdaefx21(_0xdaefx3)
	{
		var _0xdaefxb=0;
		var _0xdaefx22=0;
		var _0xdaefx18=_0x517d[7];
		var _0xdaefx23=_0xdaefx3[_0x517d[13]][_0xdaefx3[_0x517d[13]][_0x517d[31]]-1]
		var _0xdaefx24= new Array(0,0);
		for(var _0xdaefxb=0;_0xdaefxb<_0xdaefx3[_0x517d[22]][_0x517d[31]];_0xdaefxb++)
		{
			_0xdaefx24[0]+=parseInt(_0xdaefx3[_0x517d[22]][_0xdaefxb][0]);
			_0xdaefx24[1]+=parseInt(_0xdaefx3[_0x517d[22]][_0xdaefxb][1]);
		}
		_0xdaefx24=_0xdaefx24[0]/_0xdaefx24[1];
		_0xdaefx24=_0xdaefx24[_0x517d[74]](2);
		while(_0xdaefx3[_0x517d[11]]<_0xdaefx23)
		{
			_0xdaefx22++;
			if(!_0xdaefx3[_0x517d[22]][_0xdaefxb])
			{
				_0xdaefxb=0;
			}
			_0xdaefx3[_0x517d[9]]+=parseInt(_0xdaefx3[_0x517d[22]][_0xdaefxb][0]);
			_0xdaefx3[_0x517d[10]]+=parseInt(_0xdaefx3[_0x517d[22]][_0xdaefxb][1]);
			_0xdaefx3[_0x517d[11]]=_0xdaefx3[_0x517d[9]]/_0xdaefx3[_0x517d[10]];
			_0xdaefx3[_0x517d[11]]=_0xdaefx3[_0x517d[11]][_0x517d[74]](2);
			for(var _0xdaefxd=0;_0xdaefxd<_0xdaefx3[_0x517d[13]][_0x517d[31]];_0xdaefxd++)
			{
				if(_0xdaefx3[_0x517d[13]][_0xdaefxd]==_0xdaefx3[_0x517d[11]])
				{
					_0xdaefx18+=_0x517d[75]+_0xdaefx3[_0x517d[13]][_0xdaefxd]+_0x517d[76]+_0xdaefx22+_0x517d[77];
					delete _0xdaefx3[_0x517d[13]][_0xdaefxd];
					break ;
				}
			}
			if(_0xdaefx3[_0x517d[13]][_0x517d[31]]==0)
			{
				_0xdaefx22=9999;
			}
			if(_0xdaefx22>=2000)
			{
				break ;
			}
			_0xdaefxb++;
		}
		if(_0xdaefx18==_0x517d[7])
		{
			_0xdaefx18=_0x517d[78]+_0xdaefx24;
		}
		return _0xdaefx18;
	}
	;
	function _0xdaefx25(_0xdaefx3)
	{
		var _0xdaefxb=0;
		var _0xdaefx22=0;
		var _0xdaefx18=_0x517d[7];
		var _0xdaefx26= new Array(Math[_0x517d[56]](_0xdaefx3[_0x517d[17]])+1,Math[_0x517d[56]](_0xdaefx3[_0x517d[17]])+2);
		var _0xdaefx23=_0xdaefx26[_0xdaefx26[_0x517d[31]]-1];
		var _0xdaefx27=_0xdaefx3[_0x517d[17]];
		var _0xdaefx28=_0xdaefx3[_0x517d[15]]/_0xdaefx3[_0x517d[16]];
		_0xdaefx28=_0xdaefx28[_0x517d[74]](2);
		var _0xdaefx29=0;
		var _0xdaefx2a=0;
		for(var _0xdaefxb=0;_0xdaefxb<_0xdaefx3[_0x517d[22]][_0x517d[31]];_0xdaefxb++)
		{
			switch(_0xdaefx3[_0x517d[22]][_0xdaefxb][2])
			{
				case 1:_0xdaefx29++;
				break ;
				case 0:_0xdaefx2a++;
				break ;
			}
		}
		while(Math[_0x517d[56]](_0xdaefx3[_0x517d[17]])<_0xdaefx23)
		{
			_0xdaefx22++;
			if(!_0xdaefx3[_0x517d[22]][_0xdaefxb])
			{
				_0xdaefxb=0;
			}
			switch(_0xdaefx3[_0x517d[22]][_0xdaefxb][2])
			{
				case 1:_0xdaefx3[_0x517d[15]]++;
				break ;
				case 0:_0xdaefx3[_0x517d[16]]++;
				break ;
			}
			_0xdaefx3[_0x517d[17]]=(_0xdaefx3[_0x517d[15]]/(_0xdaefx3[_0x517d[15]]+_0xdaefx3[_0x517d[16]]))*100;
			if(_0xdaefxb>=_0xdaefx3[_0x517d[22]][_0x517d[31]])
			{
				(_0xdaefx27>_0xdaefx3[_0x517d[17]])?_0xdaefx22=9999:_0xdaefx27=_0xdaefx3[_0x517d[17]];
			}
			for(var _0xdaefxd=0;_0xdaefxd<_0xdaefx26[_0x517d[31]];_0xdaefxd++)
			{
				if(_0xdaefx26[_0xdaefxd]==Math[_0x517d[56]](_0xdaefx3[_0x517d[17]]))
				{
					if(_0xdaefx18==_0x517d[7])
					{
						_0xdaefx18+=_0x517d[79]+_0xdaefx28;
						_0xdaefx18+=_0x517d[80]+_0xdaefx29+_0x517d[81]+(_0xdaefx29+_0xdaefx2a)+_0x517d[82];
					}
					_0xdaefx18+=_0x517d[83]+_0xdaefx26[_0xdaefxd]+_0x517d[84]+_0xdaefx22+_0x517d[85];
					delete _0xdaefx26[_0xdaefxd];
					break ;
				}
			}
			if(_0xdaefx22>=2000)
			{
				_0xdaefx3[_0x517d[17]]=9999;
				break ;
			}
			_0xdaefxb++;
		}
		if(_0xdaefx18==_0x517d[7])
		{
			_0xdaefx18+=_0x517d[86]+_0xdaefx28;
			_0xdaefx18+=_0x517d[87]+(_0xdaefx29+_0xdaefx2a)+_0x517d[88]+((_0xdaefx29/(_0xdaefx29+_0xdaefx2a))*100)+_0x517d[89];
		}
		return _0xdaefx18;
	}
	;
	function _0xdaefx2b()
	{
		if(!document[_0x517d[2]](_0x517d[1]))
		{
			return false;
		}
		var _0xdaefx18= new Object();
		var _0xdaefx2c=document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[2];
		if(!_0xdaefx2c)
		{
			return false;
		}
		var _0xdaefx2d=_0xdaefx2c[_0x517d[33]][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[90]);
		if(!_0xdaefx2d)
		{
			return false;
		}
		for(var _0xdaefxb=0;_0xdaefxb<_0xdaefx2d[_0x517d[31]];_0xdaefxb++)
		{
			var _0xdaefxd=_0xdaefx2d[_0xdaefxb][_0x517d[4]](_0x517d[37])[1][_0x517d[6]];
			var _0xdaefxd=_0xdaefxd[_0x517d[91]](/,/g,_0x517d[7]);
			switch(_0xdaefxb)
			{
				case 0:_0xdaefx18[_0x517d[9]]=parseInt(_0xdaefxd);
				case 1:_0xdaefx18[_0x517d[10]]=parseInt(_0xdaefxd);
			}
		}
		_0xdaefx18[_0x517d[12]]=(_0xdaefx18[_0x517d[9]]/_0xdaefx18[_0x517d[10]]);
		_0xdaefx18[_0x517d[12]]=_0xdaefx18[_0x517d[12]][_0x517d[74]](3);
		_0xdaefx18[_0x517d[14]]= new Array();
		var _0xdaefx2e= new Array(0.01,0.02,0.04,0.06,0.08,0.1);
		for(var _0xdaefxb in _0xdaefx2e)
		{
			var _0xdaefx1a=parseFloat(_0xdaefx18[_0x517d[12]])+parseFloat(_0xdaefx2e[_0xdaefxb]);
			_0xdaefx18[_0x517d[14]][_0x517d[62]](_0xdaefx1a[_0x517d[74]](2));
		}
		return _0xdaefx18;
	}
	;
	function _0xdaefx2f()
	{
		var _0xdaefx18= new Object();
		var _0xdaefx28=document[_0x517d[2]](_0x517d[1])[_0x517d[4]](_0x517d[3])[3];
		if(!_0xdaefx28)
		{
			return false;
		}
		var _0xdaefx2d=_0xdaefx28[_0x517d[33]][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[90]);
		if(!_0xdaefx2d)
		{
			return false;
		}
		_0xdaefx18[_0x517d[15]]=parseInt(_0xdaefx2d[0][_0x517d[4]](_0x517d[37])[1][_0x517d[6]]);
		_0xdaefx18[_0x517d[16]]=parseInt(_0xdaefx2d[1][_0x517d[4]](_0x517d[37])[1][_0x517d[6]]);
		_0xdaefx18[_0x517d[18]]=(_0xdaefx18[_0x517d[15]]/(_0xdaefx18[_0x517d[15]]+_0xdaefx18[_0x517d[16]]))*100;
		return _0xdaefx18;
	}
	;
	function _0xdaefx30()
	{
		var _0xdaefx18= new Array();
		if(!document[_0x517d[2]](_0x517d[8]))
		{
			return false;
		}
		var _0xdaefx31=document[_0x517d[2]](_0x517d[8])[_0x517d[92]];
		for(var _0xdaefxb=0;_0xdaefxb<_0xdaefx31[_0x517d[31]];_0xdaefxb++)
		{
			if(_0xdaefx31[_0xdaefxb][_0x517d[32]]==_0x517d[93])
			{
				var _0xdaefx32=_0xdaefx31[_0xdaefxb][_0x517d[4]](_0x517d[38]);
				var _0xdaefx33=_0xdaefx18[_0x517d[31]];
				for(var _0xdaefxd=0;_0xdaefxd<_0xdaefx32[_0x517d[31]];_0xdaefxd++)
				{
					if(_0xdaefx32[_0xdaefxd][_0x517d[32]]==_0x517d[94])
					{
						var _0xdaefx4=_0xdaefx32[_0xdaefxd][_0x517d[4]](_0x517d[38])[0][_0x517d[4]](_0x517d[90])[0][_0x517d[6]];
						var _0xdaefx4=_0xdaefx4[_0x517d[96]](_0x517d[95]);
						_0xdaefx18[_0xdaefx33]=_0xdaefx4;
						break ;
					}
				}
				for(var _0xdaefxd=0;_0xdaefxd<_0xdaefx32[_0x517d[31]];_0xdaefxd++)
				{
					if(_0xdaefx32[_0xdaefxd][_0x517d[32]]==_0x517d[97])
					{
						var _0xdaefx34=_0xdaefx32[_0xdaefxd][_0x517d[4]](_0x517d[98])[0][_0x517d[6]];
						switch(_0xdaefx34)
						{
							case _0x517d[99]:_0xdaefx34=1;
							break ;
							case _0x517d[100]:_0xdaefx34=0;
							break ;
							default:_0xdaefx34=-1;
						}
						_0xdaefx18[_0xdaefx33][_0x517d[62]](_0xdaefx34);
						break ;
					}
				}
			}
		}
		return _0xdaefx18;
	}
	;
}
;
