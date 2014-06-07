// ==UserScript==
// @name           Cyber Nations Quick Lynx
// @namespace      Wardog
// @description    Quick Access to your important CN related pages.
// @include        http://*cybernations.net/*
// ==/UserScript==








var alertDivPerm = document.createElement('div');
alertDivPerm.style.position='fixed';
alertDivPerm.style.right='0px';
alertDivPerm.style.fontFamily='Arial';
alertDivPerm.style.fontWeight='bold';
alertDivPerm.style.fontSize='11px';
alertDivPerm.style.top='100';
alertDivPerm.style.zIndex='500';
alertDivPerm.style.textDecoration='none';

var alertParaPerm = document.createElement('p');
alertParaPerm.style.margin = '0';
alertParaPerm.style.textAlign = 'left';
alertParaPerm.style.lineHeight = '13px';

var alertLinkPerm = document.createElement('a');
alertLinkPerm.style.color = '#0055FF';
alertLinkPerm.style.textDecoration = 'none';
alertLinkPerm.setAttribute('target', '_blank');
alertLinkPerm.style.fontSize = '11px';
alertLinkPerm.innerHTML = '<a href="http://www.cybernations.net/inbox.asp">Inbox</a>';

alertDivPerm.style.width = '100px';
alertDivPerm.style.padding = '5px 10px';
alertDivPerm.style.background = '#EEE';
alertDivPerm.style.border = '1px #0055FF solid';
alertDivPerm.style.borderRightWidth = '0';
alertDivPerm.id = 'linkPerm';


document.body.appendChild(alertDivPerm);
alertDivPerm.appendChild(alertParaPerm);
alertParaPerm.appendChild(alertLinkPerm);













var alertDivPerm2 = document.createElement('div');
alertDivPerm2.style.position='fixed';
alertDivPerm2.style.right='0px';
alertDivPerm2.style.fontFamily='Arial';
alertDivPerm2.style.fontWeight='bold';
alertDivPerm2.style.fontSize='11px';
alertDivPerm2.style.top='130';
alertDivPerm2.style.zIndex='500';
alertDivPerm2.style.textDecoration='none';

var alertParaPerm2 = document.createElement('p');
alertParaPerm2.style.margin = '0';
alertParaPerm2.style.textAlign = 'left';
alertParaPerm2.style.lineHeight = '13px';

var alertLinkPerm2 = document.createElement('a');
alertLinkPerm2.style.color = '#0055FF';
alertLinkPerm2.style.textDecoration = 'none';
alertLinkPerm2.setAttribute('target', '_blank');
alertLinkPerm2.style.fontSize = '11px';
alertLinkPerm2.innerHTML = '<a href="http://www.cybernations.net/militarybuysell.asp?Nation_ID=">(Buy) Soldiers</a>';

alertDivPerm2.style.width = '100px';
alertDivPerm2.style.padding = '5px 10px';
alertDivPerm2.style.background = '#EEE';

alertDivPerm2.style.border = '1px #0055FF solid';
alertDivPerm2.style.borderRightWidth = '0';
alertDivPerm2.id = 'linkPerm';

document.body.appendChild(alertDivPerm2);
alertDivPerm2.appendChild(alertParaPerm2);
alertParaPerm2.appendChild(alertLinkPerm2);

















var alertDivPerm3 = document.createElement('div');
alertDivPerm3.style.position='fixed';
alertDivPerm3.style.right='0px';
alertDivPerm3.style.fontFamily='Arial';
alertDivPerm3.style.fontWeight='bold';
alertDivPerm3.style.fontSize='11px';
alertDivPerm3.style.top='160';
alertDivPerm3.style.zIndex='500';
alertDivPerm3.style.textDecoration='none';

var alertParaPerm3 = document.createElement('p');
alertParaPerm3.style.margin = '0';
alertParaPerm3.style.textAlign = 'left';
alertParaPerm3.style.lineHeight = '13px';

var alertLinkPerm3 = document.createElement('a');
alertLinkPerm3.style.color = '#0055FF';
alertLinkPerm3.style.textDecoration = 'none';
alertLinkPerm3.setAttribute('target', '_blank');
alertLinkPerm3.style.fontSize = '11px';
alertLinkPerm3.innerHTML = '<a href="http://www.cybernations.net/tanksbuysell.asp?Nation_ID=">(Buy) Tanks</a>';

alertDivPerm3.style.width = '100px';
alertDivPerm3.style.padding = '5px 10px';
alertDivPerm3.style.background = '#EEE';
alertDivPerm3.style.border = '1px #0055FF solid';
alertDivPerm3.style.borderRightWidth = '0';
alertDivPerm3.id = 'linkPerm';


document.body.appendChild(alertDivPerm3);
alertDivPerm3.appendChild(alertParaPerm3);
alertParaPerm3.appendChild(alertLinkPerm3);



















var alertDivPerm4 = document.createElement('div');
alertDivPerm4.style.position='fixed';
alertDivPerm4.style.right='0px';
alertDivPerm4.style.fontFamily='Arial';
alertDivPerm4.style.fontWeight='bold';
alertDivPerm4.style.fontSize='11px';
alertDivPerm4.style.top='190';
alertDivPerm4.style.zIndex='500';
alertDivPerm4.style.textDecoration='none';

var alertParaPerm4 = document.createElement('p');
alertParaPerm4.style.margin = '0';
alertParaPerm4.style.textAlign = 'left';
alertParaPerm4.style.lineHeight = '13px';

var alertLinkPerm4 = document.createElement('a');
alertLinkPerm4.style.color = '#0055FF';
alertLinkPerm4.style.textDecoration = 'none';
alertLinkPerm4.setAttribute('target', '_blank');
alertLinkPerm4.style.fontSize = '11px';
alertLinkPerm4.innerHTML = '<a href="http://www.cybernations.net/nation_war_information.asp?Nation_ID=">Active Wars</a>';

alertDivPerm4.style.width = '100px';
alertDivPerm4.style.padding = '5px 10px';
alertDivPerm4.style.background = '#EEE';
alertDivPerm4.style.border = '1px #0055FF solid';
alertDivPerm4.style.borderRightWidth = '0';
alertDivPerm4.id = 'linkPerm';


document.body.appendChild(alertDivPerm4);
alertDivPerm4.appendChild(alertParaPerm4);
alertParaPerm4.appendChild(alertLinkPerm4);

























if (document.location.pathname=="/nation_drill_display.asp"){


var alertDiv0 = document.createElement('div');
alertDiv0.style.position='fixed';
alertDiv0.style.right='0px';
alertDiv0.style.fontFamily='Arial';
alertDiv0.style.fontWeight='bold';
alertDiv0.style.fontSize='11px';
alertDiv0.style.top='280';
alertDiv0.style.zIndex='500';
alertDiv0.style.textDecoration='none';

var alertPara0 = document.createElement('p');
alertPara0.style.margin = '0';
alertPara0.style.textAlign = 'left';
alertPara0.style.lineHeight = '13px';

var alertLink0 = document.createElement('a');
alertLink0.style.color = '#0055FF';
alertLink0.style.textDecoration = 'none';
alertLink0.setAttribute('target', '_blank');
alertLink0.style.fontSize = '11px';
alertLink0.innerHTML = '<a href="#messages">Messages</a>';

alertDiv0.style.width = '100px';
alertDiv0.style.padding = '5px 10px';
alertDiv0.style.background = '#EEE';
alertDiv0.style.border = '1px #0055FF solid';
alertDiv0.style.borderRightWidth = '0';
alertDiv0.id = 'link1';


document.body.appendChild(alertDiv0);
alertDiv0.appendChild(alertPara0);
alertPara0.appendChild(alertLink0);






























var alertDiv = document.createElement('div');
alertDiv.style.position='fixed';
alertDiv.style.right='0px';
alertDiv.style.fontFamily='Arial';
alertDiv.style.fontWeight='bold';
alertDiv.style.fontSize='11px';
alertDiv.style.top='310';
alertDiv.style.zIndex='500';
alertDiv.style.textDecoration='none';

var alertPara = document.createElement('p');
alertPara.style.margin = '0';
alertPara.style.textAlign = 'left';
alertPara.style.lineHeight = '13px';

var alertLink = document.createElement('a');
alertLink.style.color = '#0055FF';
alertLink.style.textDecoration = 'none';
alertLink.setAttribute('target', '_blank');
alertLink.style.fontSize = '11px';
alertLink.innerHTML = '<a href="#gov">Government Info</a>';

alertDiv.style.width = '100px';
alertDiv.style.padding = '5px 10px';
alertDiv.style.background = '#EEE';
alertDiv.style.border = '1px #0055FF solid';
alertDiv.style.borderRightWidth = '0';
alertDiv.id = 'link1';


document.body.appendChild(alertDiv);


alertDiv.appendChild(alertPara);
alertPara.appendChild(alertLink);


















var alertDiv2 = document.createElement('div');
alertDiv2.style.position='fixed';
alertDiv2.style.right='0px';
alertDiv2.style.fontFamily='Arial';
alertDiv2.style.fontWeight='bold';
alertDiv2.style.fontSize='11px';
alertDiv2.style.top='340';
alertDiv2.style.zIndex='500';
alertDiv2.style.textDecoration='none';

var alertPara2 = document.createElement('p');
alertPara2.style.margin = '0';
alertPara2.style.textAlign = 'left';
alertPara2.style.lineHeight = '13px';

var alertLink2 = document.createElement('a');
alertLink2.style.color = '#0055FF';
alertLink2.style.textDecoration = 'none';
alertLink2.setAttribute('target', '_blank');
alertLink2.style.fontSize = '11px';
alertLink2.innerHTML = '<a href="#mil">Military Info</a>';

alertDiv2.style.width = '100px';
alertDiv2.style.padding = '5px 10px';
alertDiv2.style.background = '#EEE';
alertDiv2.style.border = '1px #0055FF solid';
alertDiv2.style.borderRightWidth = '0';
alertDiv2.id = 'link2';






document.body.appendChild(alertDiv2);
alertDiv2.appendChild(alertPara2);
alertPara2.appendChild(alertLink2);

































var alertDiv3 = document.createElement('div');
alertDiv3.style.position='fixed';
alertDiv3.style.right='0px';
alertDiv3.style.fontFamily='Arial';
alertDiv3.style.fontWeight='bold';
alertDiv3.style.fontSize='11px';
alertDiv3.style.top='370';
alertDiv3.style.zIndex='500';
alertDiv3.style.textDecoration='none';

var alertPara3 = document.createElement('p');
alertPara3.style.margin = '0';
alertPara3.style.textAlign = 'left';
alertPara3.style.lineHeight = '13px';

var alertLink3 = document.createElement('a');
alertLink3.style.color = '#0055FF';
alertLink3.style.textDecoration = 'none';
alertLink3.setAttribute('target', '_blank');
alertLink3.style.fontSize = '11px';
alertLink3.innerHTML = '<a href="#pop">Population Info</a>';

alertDiv3.style.width = '100px';
alertDiv3.style.padding = '5px 10px';
alertDiv3.style.background = '#EEE';
alertDiv3.style.border = '1px #0055FF solid';
alertDiv3.style.borderRightWidth = '0';
alertDiv3.id = 'link3';






document.body.appendChild(alertDiv3);
alertDiv3.appendChild(alertPara3);
alertPara3.appendChild(alertLink3);






























var alertDiv4 = document.createElement('div');
alertDiv4.style.position='fixed';
alertDiv4.style.right='0px';
alertDiv4.style.fontFamily='Arial';
alertDiv4.style.fontWeight='bold';
alertDiv4.style.fontSize='11px';
alertDiv4.style.top='400';
alertDiv4.style.zIndex='500';
alertDiv4.style.textDecoration='none';

var alertPara4 = document.createElement('p');
alertPara4.style.margin = '0';
alertPara4.style.textAlign = 'left';
alertPara4.style.lineHeight = '13px';

var alertLink4 = document.createElement('a');
alertLink4.style.color = '#0055FF';
alertLink4.style.textDecoration = 'none';
alertLink4.setAttribute('target', '_blank');
alertLink4.style.fontSize = '11px';
alertLink4.innerHTML = '<a href="#fin">Financial Info</a>';

alertDiv4.style.width = '100px';
alertDiv4.style.padding = '5px 10px';
alertDiv4.style.background = '#EEE';
alertDiv4.style.border = '1px #0055FF solid';
alertDiv4.style.borderRightWidth = '0';
alertDiv4.id = 'link4';






document.body.appendChild(alertDiv4);
alertDiv4.appendChild(alertPara4);
alertPara4.appendChild(alertLink4);








}




if (document.location.pathname=="/infrastructurebuysell.asp"){


function modifyText(){
document.getElementsByName("purchase_land")[0].value="10";
}





var alertDivGone = document.createElement('div');
alertDivGone.style.position='fixed';
alertDivGone.style.right='0px';
alertDivGone.style.fontFamily='Arial';
alertDivGone.style.fontWeight='bold';
alertDivGone.style.fontSize='11px';
alertDivGone.style.top='430';
alertDivGone.style.zIndex='500';
alertDivGone.style.textDecoration='none';

var alertParaGone = document.createElement('p');
alertParaGone.style.margin = '0';
alertParaGone.style.textAlign = 'left';
alertParaGone.style.lineHeight = '13px';

var alertLinkGone = document.createElement('a');
alertLinkGone.style.color = '#0055FF';
alertLinkGone.style.textDecoration = 'none';
alertLinkGone.setAttribute('target', '_blank');
alertLinkGone.style.fontSize = '11px';
alertLinkGone.innerHTML = '<a>Make Bank</a>';



alertDivGone.style.width = '100px';
alertDivGone.style.padding = '5px 10px';
alertDivGone.style.background = '#EEE';
alertDivGone.style.border = '1px #0055FF solid';
alertDivGone.style.borderRightWidth = '0';
alertDivGone.id = 'link5';

alertLinkGone.addEventListener("click", modifyText, false);

document.body.appendChild(alertDivGone);
alertDivGone.appendChild(alertParaGone);
alertParaGone.appendChild(alertLinkGone);


}


