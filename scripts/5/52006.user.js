// ==UserScript==
// @name           DropboxRefresh
// @namespace      https://www.getdropbox.com
// @description    Add a refresh button to the dropbox web interface.
// @include        https://www.getdropbox.com/home*
// ==/UserScript==

imgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOEAYAAABP2PGSAAAABGdBTUEAALGP\
C/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUw\
AADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAL\
EwAACxMBAJqcGAAAAAl2cEFnAAAADgAAAA4AsVvx9wAABUdJREFUOMt1VFlQ\
UwcA3PcIlySYAAIhymmJiHjAcCiIgg6iUAGJylCLBVqkxapFa6mdESgKVvAY\
U60VUdR64JQaQCMqKK1Qi7dIilc5wpVguBJy5+X1o1On09b92q/d2dmdJfAW\
EBK7Jy7zbHv4Q5G7UqKShWGLl8piExI9XBO4lbzFvnEQES+RQSqGNfJW5Y4u\
1n3hLyOiWvHGNo+Giuovz7OoVOVEl25M9B/df3BH+MKa/fuMkqXHApsy2Hnr\
dodUXnF38azjtQbMUdXog8xSCKhb9Co6DkAflKAA8hNiGVEIsL63/olMhnpE\
MpQ4HNyTc8K+jCr+Lmuo/97d2ovrrnfADAXNQzf5t9vkR/zmpQsCmzb17Wk9\
zG+4y8p2ucF1CCiSd6iuGc9BoPNRt2p3A65mqyJzI+C2xoai1wLUhHaRVgDI\
L42fMnwBO8KdVc/u86j8uK4gpmS4RsQrCqnMDI1jv0lIrLLLdpbb9qTFfNNd\
PdZazj077QgvOKBI/5XeyfAQiMrwzmBOAsJ7+VonBfDizEC8Kgeg9pvb6AGA\
/9JtjFUBSPb0uSrPAPXb2n94zQLU35qE8AdoH0pkspM5HW3JTVgdP3ebBS9j\
gWH91RRGoHxRVZR7dpDWVS8xPcDMJS3TI5hZgIdgSptdL7Dv6/r0zpXAE7Ys\
SNcPtLNkpKYIaKiS3BiKBQId3LPto4H38sPj3aVAY7Jk7+tTAA5aXbc+zMwd\
r9IcZSmU0xm8wtkfRjxO9Ff2aLwMayFgchl8eAORg35rnJuBvK1VSZIlgPE0\
YiyCARAmGP9qPhyXAR1TH2baBfQIFYWatYDhgOkkzQDUtroRYzVgUsFk/hQM\
7tmA9CBN0nJi/vYd7HppW+dULXcJRxvgFVLq3ci2Axa2+Yqc3gdK/a8Wv3oF\
kHkECw3/M+dBjGIUoHfSR1ADmHvoSnoUIA6hBB8ApC8pIDjA2NXxGI2DUs4Y\
75qI1FeTncwUlUHnCq9Gv7bf5BeAm6VPbeQFgDmCliEFgC3GEYu3Q4z1AJAp\
iNrs9RTQuBhCqRLg3JXmnJ4EYKRYJdSpyHzGYGaf25hll6M+wSyBiz84XFaU\
DR/Y7BDX4VcN0FtAYRJwKr/pZuccQLVFnaebDcAeU8AC6JV0Fq4B1o5WDIYX\
EMzx0TpygYN7xb3PZwJ/nBgIGCsCVDnKDVpPKYdUn+7e8fMd8c6JUbVYfw9q\
zahWaNgAJO8OSeS1AfNSPMvYLcCQaHSlOhKQBss+Ut4DpE6y+crzwFjBRIc+\
Gtg4tCJrRjmgzTauplYBl2tag7qrAHWCWq9PBFSLuqe1HxLXEYibdN1NyU5j\
2senFUsfM51yOZftZ3scFpRF5vkcA5LOh0yZyge8Kec5zO1Ay+3nyxVGwBhG\
1ZpDgfn572xw3A9oyvXDVBSQ/lQY0/wAeNbfHak4AJjVhIE8N75JNbkxZV//\
vK1vnobY7t0cvy1muW1sSGjqmhoRccdoMKTbWNnIbDiMi8CyLcGXPOuBcJVf\
oIsCYPxoISTygfuprygFBdS9vqPoOgOoVkyYdM4AfcXyiRXHHKS79fxFkzpL\
Yi58pCmPr9D/89o4RC88iWs+re/OjZtqszt0YWrm8Q7SjjppSnGV4bZp0DgD\
DDDQiGoAJEhYANDDHbMARFgkMh4D5hoG36p3fJNe+Mytkb/1mPnzh2PHCyok\
ACzN7ZhOvHV10RwHnyGXEotSv5OpUVlpDOW01ln7k1aTv1qWkpU+N2ANPpzI\
XLqC8qXKpBam6IGEZyKx2GTZ4Vo7cOQCDg4te/hZV9i/Zf8EZeJQ64saKecA\
AAAuelRYdGNyZWF0ZS1kYXRlAAB42jMyMLDUNTDTNbQMMTKwMja2MjTTNjC0\
MjAAAEIeBRNOKvB0AAAALnpUWHRtb2RpZnktZGF0ZQAAeNozMjCw1DUw0zW0\
DDEysDI2tDK01DYwtDIwAABCHwUUz8CFFgAAAABJRU5ErkJggg==";

ba = document.getElementById("browse-actions");
ba.addEventListener("DOMNodeInserted", function(){
		bar = document.getElementById("browse-actions");
		ul = bar.getElementsByTagName("ul")[0];
		// check for an existing refresh button
		old = document.getElementById("refresh");
		if(old){
			if(old.parentNode.lastChild != old){
				//move node to the end
				oldParent = old.parentNode;
				oldParent.removeChild(old);
				oldParent.appendChild(old);
			}
		}else{
			li = document.createElement("li");
			li.id = "refresh";

			a = document.createElement("a");
			a.setAttribute("onClick", "javascript:Browse.reload();");
			a.setAttribute("class", "background-icon");

			img = document.createElement("img");
			img.setAttribute("src", imgData);
			img.setAttribute("class", "icon_no_hover");

			a.appendChild(img);
			a.appendChild(document.createTextNode("Refresh"));
			li.appendChild(a);
			ul.appendChild(li);
		}
	}, true);
