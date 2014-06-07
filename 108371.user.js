// ==UserScript==
// @name           ToTop
// @version        1.0
// @namespace      pxfei@vip.qq.com
// @include        *
// @author         真岚
// @date           2011/7/28
// 从anran的脚本修改而来
// ==/UserScript==
if (window != window.top)return;
//上下按钮的图标地址，可自行修改；
var src = "url\(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR6SURBVEhLnZRraJtVGMcLfhAEGbLlPee8yZsbijeY+Hn7IKIyNEnTZmmTNl3vb1rFqTC001l1bZr0fksvaXpJ06SVIlTHQKurdZus87J52cS5qXWda9xUugo6nV0en3OagfNCkgUO7xs47/M7////PE9OToa/iuGNt1ZH2U41JvfWTMr3Z/hZ5tvUcbZVjdJPvFH2hzcm78r8ywx2Voa1m6tG2cHqCFtDEKhRtqrGmZrBp+m3qKHbNpQN08nyUfZn5RiDyggDBIE3Sr9CNQ+nr5BmR8kQbSoL08vlI1h8lEEFLvE+xq6qE2wOldx1wxDPAKksGSQrpWEGZcMMSgYZYMDgO6pA3Vs6/E+v1MRoTJ02b8ga4grSbZ5+erokRGEHLg4p6mPw9IwWIheMMPitUcDKwuRXb4z6swK4uqTN7iA5VNxPASFQMoCQIQruXgrPvamD6EUTvLpqhsBHeqgYoVAVoSveuNabEcTdxjYVdtNpVzddKwpSPDUFDuIQDnjhgA4iCSPEfjLD+AUT7JnTQekQWjfBvq6dYI+khTg7pWZnl3TZ1UXB1YNFOSC13Ah88V0FASYYOY+Qn00QOmsUtpWijd44PeSdoPf8L8TRIlU7O8glZyeBwi4CqAJceGqughfnqx4BI+dNMISFR1OQzi8MvDegfJit1cTlySfG5Y3/guS1kgcdrdKio43A9nYC/4RwNcUY8kvvKRA+ZxIhh78zwhjaNX7RLG5WBV5fHCe/18bk60O3Bsi9uQFyJL+ZgKMFAddBUAUqKUDLBOCgAqFFA/SdMcIQBywbYeqSGSZ+xDze0aEKCrVx+ZfaSblG3cduEUqsPqnb6idX7QjIQwCHOFAFV1KQsqqgg4e9rmDgGwMET3OIAXq+NEDvKb14fxnh2JTgjWGnx9g575T2AQGwNEoRm08CW4AAh+QjAC1bB4g8KDhTgPp5BfpSxVuOKbDzNVn0w+NTssihCseIigBcZ9RJuk0AHmuQHrI2SrM2n+Zkrl86iZDj9hbpLIKuXMuDP3mj7ZlTxKmDeOJXDitQFGRQ2ENWPP1sHu15vWqczuLUfQPHeo0aSlkkIH7JbGnQbLX6NFvy/Jr77AGyO6+Z/JDP8+hAy/DJbxHvgy68NT2njALAewBHxkJlmN7N6zzZffvNzumcm9L2A6qw2JulRW4XD51fAAHAIDs+1wsIz2MHzidPPzlcMUwNaYv+fQPm4bIHpCVxszAPVCMab/esDto+1UPnCT3Uz+PAww73DNCF0lCWUzW3iRTa/NISL8wBaBngCIE6nEUtx/XQ/lkKgAqwEReK++U7s1LAAdYmaYkX5jZdAzy7XyuGXOsxPY4NHU5aBARvAGBpIIUWn2Yp179uDwfwq7prnxb8HyrQ/LEe81DQIsazyV6BtUFyW3zS92gT2P0kiYqS29to8pkZbbLhiJJs+kCffH5WSXoQgPMqe8CjjVKuZa/mBDbgqs1Plm0+knC008RTM3Ji7/u6RONRXaLube0yXtHf3D30gHtg0x3/lcFf09inE7LaU3YAAAAASUVORK5CYII=);";
var src2 = "url\(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASDSURBVEhLrZRrbJNlFMeX+MHExBADfd/nedu3axuNtwTjZ/hgjBoivW1dabu1u+/tphE1ITqUi9J1bXe/d127sXXdZhaTKSHRKQMBw/ACXsCIoE6GrIKaMRNFcfR4nqddULPBttDk5G16+f/O+Z9LVtYSr6drBItxj+qU2S/MmQPijNkvJm2NJPn8mJTc86EmWXNck6x+Tz3j6SZ/uNrIAVd43X1LaS36ucknuIx+4UdzQABrQExZasVUXgNJvTimTvmOyanaj7SpV8bllDtMwdlOJgu6pPtXBDD6RIfRr5q2BETICYlgDYpgbyKwbZ8aAh/LEPpUC6++L4MHAa6OVQAwY4epVphmwrl1aYCjlcBL+9UQ/EQL9Se0sPOgBgojFPJXC0B7pln2tvobgOp3NFB3UguNX2hh1yENeLoR0LmKCsxB0WkNCtO5GQADOdsIbB/XQMPnWmg+lQGECbjDZLIoQh9YUQ+sIdFoDQlTzJ68BrQJAeg1+q6Bpi+10PJVNuz+QIZCrMDdJR4tjZHsmwI2BwSD0afaaPKrNuQEVI+g59sx659yUTyvCW3CJwcc0HDxtjM6eP2oDEU9FG0ik2VR8iADPNd675320aw7/gPb7BOeMNUI42a/6rQlIJzG7E9a64TzmP21vEacnmaE4DO/k8KOCRnavs6GjnPZHJDfQcHRJs66u+ihkhh5q3yAjCtx8raSkCqVCL2Lg4w1Qj8uFKDvgOJ8anKwsUx0C4o7Wggf0YIuio2VofNsNnQioO6EDFvflKByWIJnRiRQ4hTK+ykoCR7nlGGyiQNMfqHVFBCvM/EcFLexQHEOaMHm4nhuyQCY7+HvsIIMhFXTfkbLga8dlqE4SsCLAIwL3hH1Y2lAUHzYEhSP8YnJNHXBGpY9B+CzAC3ajSKRKVaBDnp+0MHeGR2MXDHA4M962IEDgDZB1ZD0W9UwWrQvYxGDoCWP2+qFKdbMG+Lp7PEU8BHlAKwgekEP3d/rIMoASR0MXDaA/7gMpb0UKuL0z6qEFFh0omx1QoW9SbzCmurIWMPEcZH4BLHYdVCG3ot66Dmvg76LOkj8qodmnCrmf0mMzlcOScPPDkhrlxxZe7MQsrcIV53MGszaheIFmWCAnQjoT+oRkhaPIOiFMTUURdD7IXLEO0geuuk+uBroOrw5o2jNPN4Ynn1BF8GjhjCshu1BP9qS+MUAA5fQ9wkN34XKQfpt1SB9alnb7GwR1rs6xCNM2J0RL+xJA17GWxS/rIc35gz86JX2EhxNMusdUnuXJb7wI2cH2YTiZz1YeiFGUZQdNcrt6L+k401m818cFX/3JsjiTb0V0R0Wyzzd4iwTL46xk4BWoCibmOp32SUl1yoTJKGMGtbcSmvJ7z09pBaX52oJjmBZH4VSDP5+L72uDNIJZWiFV/T/JCVyz5riGBku6aN/oyiU4SmowPDGyTfeOH1y1Zn/+49lUfX68j56GIXnlQG8M3E6h5krt0V8QQSFN+KV/Ayz/subkLbdVnEmVhpbezeega14htux0Y8uF/APLkanE6FIihMAAAAASUVORK5CYII=);";

var style = 'style = "display: block; opacity: 1;background-color: rgba(0, 0, 0, 0);cursor: pointer;width: 28px;height: 44px;margin-top: -24px;position:fixed;right: 0;background-position: 50% 50%;background-repeat: no-repeat;border-bottom-left-radius: 5px;border-top-left-radius: 5px;background-image: ';
var a = '<a id="go-to-top" ' + style + src + 'top:47%;"></a>';
var a2 = '<a id="go-to-bottom" ' + style + src2 + 'top:53%;"></a>';
var div = document.createElement("div");
div.innerHTML = a + a2;
document.getElementsByTagName("body")[0].appendChild(div);
//twitter�޸�
if(/https?:\/\/twitter\.com/i.test(window.location.href)) document.getElementById("doc").style.position = "static";
document.getElementById("go-to-top").addEventListener("click",function(event){
    scroll(0, 0);
},false);
document.getElementById("go-to-bottom").addEventListener("click",function(){
    scroll(0, 111111);
},false);
