// ==UserScript==

// @name 	Travian Auto Raider T4

// @namespace	 Buyaas

// @author 	Buyaa

// @version 	2.0

// @description	Auto Raider with customizations

// @license 	GNU General Public License

// @include		http://ts*.travian.*dorf3*

// @include     http://ts*.travian.*position_details.php* 

// @include		http://ts*.travian.*statistiken.php*

// @exclude 	*.css

// @exclude 	*.js

// ==/UserScript==

cssStyle = "#content{width: auto;display: block;}";

cssStyle += "#bfarms{font-size: 11px;}";

cssStyle += "#bfarms select{font-size: 11px;height:16px;border:none;background:none;}";

cssStyle += "#bfarms input{font-size: 11px;text-align: center;height:12px;padding:0;border:none;background:none;}";

cssStyle += "#bfarms table,#side_info table {background:#bbb;border-collapse: separate;line-height: 16px; vertical-align: center; margin: 3px;}";

cssStyle += "#bfarms table tr td,#bfarms table tr th{ padding: 2px; text-align: center;}";

cssStyle += "#bfarms table thead tr td,#side_info table thead tr td {text-align: center;background-image: url(http://img.travian.com/gpack/live/travian_default_en/img/a/c2.gif); font-family: Arial, sans-serif;}";



cssStyle += "#bfarms table.wait {background: #F0E68C;}";

cssStyle += "#bfarms table.cur {background: #238E68;}";



cssStyle += "#bfarms tr.wait {color: #F0E68C;}";

cssStyle += "#bfarms tr.cur  {color: #238E68;}";

cssStyle += "div#map div#map_content div.tf1 {background-image:url( data:image/gif;base64,R0lGODlhSgBKAKUlADYJNlcaV2MjY3k2eX47foZDhodEh4hFiJlZmZ5fnqJkoqVopahsqKpuqq1zrbmEubuHu8aYxsibyMmcycugy9Ot09Sv1NWw1day1tm32du729y93N2+3eHG4eLH4uXN5ebP5ujS6OnU6eza7PLl8v///////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dg6GPw4AAImCiIwPD46PfYiNIg8impyRew4iAJOcpZyNjniInA8hrq+vk5uIc5GNsCC5urmworRvoaKTrrkfxhsTyR+8rpSpbYwiIa0gFhsfHtkdFg0IDQ8WyyDNs5Zmtq0huR3JHe4c8BkSExkWHR7irqe/Y6vC6sawveOQoSAGDAUzwHNnbFwITY34fWEEgFUxD+8mPJhwEEMDCRVCdlR4L5+mTSLMbcFESh2IDx04JMvQoEDICg8UKChgYAD+hJ8QJHBguOxhqUoqq/hDCRAmwQYHEOh0MMFBhKtXCTgYoQEeBwpD8Y0r5SwlFoqmiDnN8OBAAAJYFRBQgHWA3QEeRHCAcIGkWKMnPSVtgm7TBmkAY2bwGCBAAawEFhRIoMBuggEBRFAY8UECwqFFAR+t9AQTq1ITpL3EuBjngQMOfg4QkIACBQgJAvjUDIHBiBEVPncoaooVJbNMKKIsrtophgoQPkyA7YCAAAGRvULgwCkoBAQkHgTPcG/cBgvWTKGUWGQVKeacOjxoACE4BA0jGhgoMMC6zgXwfdQbCSPUp5BYFsiSWnERqWQafMXdVIEEGdxHAgI99UdXXPD+lCIgAyR8UF8F5C3jATIW5FUcKaQt0sh7EHKijgcYTACdBhcyIIEEFGAVlwAFcELfTyF6J8FwY8VIVoOLoBWjBxbMtKMEFnaAwAVfETDXhtcFwB2VVH7AwIgYICkafJugYk4kgRW3AQPePIDQcwzgqJAIcl03gAHWXZcAPD9xFVRwoCUJ4XGfHKEcc9JZwIGjGUzIwAWcGIAAAntiet11BNTGgQYaQNDARxhwgI8+h7aoxIPFEcMaBljCMwIJGkhgQAD0dVnABL9R4AFIN5UZ2oooPeOEe8s1Z4FQGUxApQYfkEDCBA1olIAD+Enb2XYXjGcqceplwt6xL6YFwgS+9nBwEHT3QfvBrAR+AOpPO/L12V/MIWXFg5uo9c5izwHFwMADAzXhjiSGNWybg1GxyiiIrfYvwBJW3NFBCjvEirhesCTjRQMldPFBCS2Ez8K+jLtSRZoQ85JAMXkl81DunOzQNOWUUdgrL2OTDUYYpRgQMw8507AYTvKsS0BRTuAB0UWnzMZSMsISwgdRPrBBL5OoCo0kybr5wWmiGBuHk0oiqjIwwcAY7tq1LEq22aBE03VKR+eBideQ5K1FEAA7);}";



cssStyle += "div#map div#map_content div.tf2 {background-image:url(data:image/gif;base64,R0lGODlhSgBKAKUnAGMTY4osiY8xjpc5lqtPqqtRqq9hrrBkr7FvsLR6s7WBtLaCtbqMuryOu72PvL2RvcKYwsWbxMefx8qiyc2nzM6ozdOv0ta01de31+DE3+DG4OLK4uXN5ObQ5ujS5+nX6evZ6+za7O3d7e7e7vDi8PHl8fLm8v///////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EBCGPxAAAImCiIwVFY6PfYiNJBUkmpyRexAkAJMjpaYjjY54iJwVp6+TrohzkY2mIbi5urillXChqKS7IR7FxbuUqm2Mpa66xh4hGhgY0NEhpLNotRW4GgsJC8TGGh4UD9TW1yGo2mOIvQ4ZHxkMF/cO1BEO/P0OERGqQcOVzN0XRgCaedAwT4CDCxYWWMDAj4JFCRQWKHiwYEG+Dgs5ZBhZyhIXTJNyGeOAwMLIiRg2yMTQgEEDAzapUbx3gQH+h2i9PmVhpWkELmgiQBCYkOEAgwn5NjwwwPMeAZkbKNi7d4xdMhImqSAkUeqoh2oiECwY4GDCgAEUMExYu7UnAQIGYhooYKFvBxHXRkzyFNYJt01liWVNmy/jgrsTLDZNkMBuAgdsMViQl8HBghLHNGgIwamRwSWYWnEaca1YtQ4RKMgs9vBegwtMIxpI4JCDiQ9rMyQYcAADaA0XNWiiBLYJwk2cVmMYt0FC2gizLUyoe+EAUxPzOPg2IeGDAwEWDrx1ANrb6OjQTxNhNTj6arPVSgSc/YBB3QMGEDBABiYUWCAHCkQgXDgLUOAASF2NYF9pvszHyIQTGqWYBCD+lBDVBiGYcEE4DiRwFwEHFGgeBxYUsEABPCXgwQYParBBYBLaN1iFz0GHYWIzcughNQrEZWAGFiQwQYECBhAAAfQUIABVPc24QAcYUHBMKRi2YloimADQJVkazviABx5GIMEDRn5woIEmBOgkARdkUAACbV0wgAEbXJnlljnqKIppFoZS32pGTYOBBAqAgAACMRUzgoj3mCCSCRbIiWcCGSCwz1sHHBBBCRKwBlSgXoIlnxDP2cfaAxut2WEBUYVYVQIwCbAnAU4ewIEBAYa6J0iR8oIqJasWkVp0ZWFQzgMcOspZPXUxwJYAAiAQIF5uZhDsXiBIIBAvy5VWmBL+9CGG358RSBQRqE69he2dAnQUgYom0BpCCSJEeupXyaLWiCtlzkhBBizuk4ABAkggwXBvASTxPn1OAKybi96IYyXnPoFJM7hg0K0DIHSAp7YGSGDAAAIU8ABWFLRrgAMFdLDZBx+MS0pzWsAzigb0tLWoBiV04GJH/vizjwMIdCiCw/IcA7AXKJEADQawdlgCCB5E8CgCBYQNttYioIMVgbhwHAYzgo2T5QMPgCB3CXTXXTcI/aIjkAfZdNzFYWZdBDesChQOrUU6GYMNoWkgpKFZV8cVVzpddVOhGvAI9vgzZ02HDLJ+n4ESwY+PoOg1BDMux1ivmOJBMwkJRQcaUYfqePkqraomSuh1pDaJmAHnEWbwfBCfRRAAOw==);}";



cssStyle += "div#map div#map_content div.tf3 {background-image:url(data:image/gif;base64,R0lGODlhSgBKAKUnAGMTY4osiY4wjZs9mqZIpahKpqxSq65Wra5era9frrBor7FvsLJ0srJ2srV/tLmLuL2PvL6SvsKYwsacxcymzM2nzM+rz9Sy1Na01dzA3N3B3d7C3uDE3+TM4+fR5ujS5+jU6Oza7O7g7vDi8PHj8fPn8/v3+////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGPxIAAImCiIwVFY6PfYiNIxUjmpyRexIjAJMgEQgRFiAijY54iCIiFbAiIRgbIKqTsohzkY2zIcHCw8GwlXASxpO0IRMJGBC40rjClK1tjCIYDBENGyEbAxEYHBMU5xQZGR+mG8u8aL4VIRAY9hAPDs8YEQcKExAgNEBgoGCED7RWwRvzatW8DQIaXLjgwFyBAwQKLFgAIkSpgiAfrPtgbeEXRgBoVQCB4cODCxo0kCDxYKOCAgIUPPi2wQL+AgIHEAAkB2KZCEtcME0KtmFDiQwEIGjgRuLChAcUFCyAEAGCggYOFCSAsEDBOAwUPnRUaNIKohGxmG3A8FSBAAYXBgyY+WECBoBn+R0oQACDBcIwIVAoEczaCKRUUMJlBsIpBQcODoAlcIEvian7+BEg0IACuIAxJzjIwDjEJE+QnciTRdlphgMJIkRo+tIDBwQWSAxg0EB0AwYDLnwgAeGABgfEH3xQi0uEqGOyGXECwQmWxw0iPijAHSHAAQwauPLj9xmzZgEHIHwwQUJBcvtgWRu2sEETpcdNoLTJCP3BFQwIFjx1gAMNNBDVBwyEFgEBFHxmDljKfYAACRP+EMBBcRCYU4IITYXASSePxTbEW6+dOJlHCJZAwQTNUPDABBoMN86EDew1048fXICAABB4II5uDKCF0DewuHhdW5g46aJ3CEZQwgMgTKAXAcQFKRAEQE3nQVV8mXPKBQLkFkAAmE3HpHUuvoadgANKSaUFBykQTgID8ElABwRilqEC5HRGQlYTFMAABIsyEAADbWoTgndSatIIL5gAUOmLpVj5AAYEJCAqaQec2EGOuj3DlwYP4ESAbhzc1IA5CFkw6VxObsIKUpH4xwk4tniEp4zjCSDAaBH9SMIHaZYXQJHyJVqAAhxwwMCkHYCwmD2TYsDdif99coSAI5RySir+pSiIWQPvkUCOB51dwKh5A6xJQJALAIQcAROQ+EEJ/E0KJyeUtDWudiPUcgsutvZ1wAYPhAihPRgkYOhnGK1Z2gcaTNBjbudJZ4G3Ard4TXb+eReCBQl+4AACIfyoG8V8yqfBBQoQwGZAHEMg6gBhllDipI4ZHGAjtAmbYAYKTPdBj33mtuWyBAyQ85oMLEeCBxTkxBp/a7Gl4hOYwDIPghZ4qcBlDcD3QNUDCDCjsQrkDFQHy850gX63GDX2FK+MAgJfIYb1QAjjUVA1fA7gpJEAmFGwAUAKKOeut9Yc5YVSMUv+VAZe+bOBQDt1gM455kyggGIZnCoTCSFU8jeMFtnEsnIJT00OQVgKOPDAjRMEHxDrrJXAEgTzGL25UhX0hPt06gQvPPEj4T5OUZeqgVIw/ODufQkmhG/C99bbMk8lJqzR0EOG2QKC92oZdpY7Bc9uBvOwNGUPnjObb8zJcUDJLAYIi7VQ4ijKc8NbfHUiONUPFOQiGCcACEFNTUJTCcxDpjLIBw5mIQgAOw==);}";



GM_addStyle(cssStyle);

var LOG = "";

var Race = 1;

var Host = "http://"+window.location.hostname;

var ViewList = false;







var crtPage = window.location.href;

function RemoveFarm(farm_id){

	Farms.Remove(farm_id);

};



var Images = {

	Pause : 'data:image/gif;base64,R0lGODlhFwAXAMZQAFVXU1ZYVFdZVVdZVlhaVllbV1lbWFtdWV9gXmJlYGNlY2VmYmVmY2VnZGdpZm1va8vLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2djb1Nra2tvb29zc3N3d3dve2d7e3t7g29/h3OHh4eHj3+Lk3+Lk4OTk5OPl4OPl4eTl4uXl5eTm4uXm4uXm4+Xn4+bn4+fn5+jo6Ofp5ujp5ujq5+rq6urr6Ovs6ezs7O7u7e7u7u/w7vj5+Pn5+Pr6+fr7+vv7+/v8+/z8+/z8/Pz9/P39/P39/f3+/f7+/v///v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAH/oBQgoOEhYaHiImKi4yNUECQHhCTlB5AGpSUIIOQQBIIAKEABhBAEAOiAAkUnJATAkmDD6URBIQLFa1AFbApKkKzQBMETioqRgsWuha9vw8RQBTExkYMGLoYsCsrwBJAFsTb1Rm6GQRLNDNDDxVAF8Q0MUcMGroaBEw6OEQPFkDmTkh8SMKAgy4O+F6cKPLgApANxE6YINhBlwd8NVwYeZABSAcCT2S0UMLAgy4QBJr0yIHkgQYgF6HwwMGEwSZBQHwACVHASZAeSR5sAIISyo8eTBqE4AQDiIiesjrstDWowQhOIoCUUBCga4ADIZwW8BrAQQlOlliMEMFWxAgWKUDUtnULgxOKTnjz6uW0A1KIECX66s3byseOG4htKF5sA/GNHTodMQoEADs=',



	Resume : 'data:image/gif;base64,R0lGODlhFwAXAOeHAFlbVllbV1lcV1pcV1pcWFpdWFtdWFtdWlteW15gXV9gXmBgXmBhX2JjX2JlYWRlY2VnZGdpZWlpZ21ubG9wbnJzcXJ0cnN0cXN1cnR2cnZ2dXt8en+AfoSEg4SFhIqKiY2OjZCQjo6RjZCRj5SUk5mZmZubmpydm6SkpKurq6ysrK2trbCwr7CwsLCyrrCzsLe4t7y8vL2+u7+/v77AvsHBwcrKysvLy83Nzc7Ozs/Pz87QztDQ0NHR0dLS0tTU1NbW1tbX1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3uDg4OHh4eLi4uPj4+Pk4+Tl4+Xl5eXm4+bm5ufn5+jo6Ofp5Ofp5enp6ejq5unq5+rq6unr5+vr6+ns5+rs6Ovs6ezs7Ovt6uzt6uzt7O3t7ezu6uzu6+7u7u7v7O7w7e/w7e/w7u/x7vDx7vDx7/Hy7/Hy8PLz8vP08fP08vT08/T18/X19fX29PX29fb39ff39/f49vf49/j5+Pr6+vr7+vv8+/z8+/z8/Pz9/P39/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gDPHBpIsKDBg4fOKDwDpEeThRAjChwI8QaIFD+mSIxIsGKABBZiDNGyUWHHhTcE8HFxwIONI2Q2nlSY8tCfOCIWmMixROLMMzWxwBEUBYOEFj2gQPwZFMuWOoJ2NNAwAwiVkkAFHMKCJcuWMHv8vEDw4UYRLhtxEDgURkyZt2Xc/KEzwgEKHUok8libZg2bv2nKbFkD6EkGCjUk+ihwqIuXx1yxWKlShxANACwk/jBw6IsZNGr+qqlTyAmFCzWYSBTC982cO3n4DLITIsIKJGglElnbRg6ePoUKwVBQwsjViGAUFlmL5k0fQ0EedPChdGN1I7wDjdlQocaS5CWPQCjEfkjPCQgqklzBGpPI+AEyGJAoIgUrxJ5njEzgoOO7fYgk5WdEEgH+BxEYWlCh4BQMNjiFglRoAZ5JCFWIUEAAOw==',



	Map : 'data:image/gif;base64,R0lGODlhFwAXAOf/AM0AAGg5RjdHYjhIYzNJeqQ3PkVQZ684OZVBUVRVU1VWVFNXWlZXVXhOaVlbWHpUaH1Tbl5gXXpWb5hQWk9jhVpigKtRUU5njk9oj2VmZFlohVVpi1Nskz1yrlptkE9xl1FwnUd0q0F2sllymWlwhG9xbotodVpzmoxpdkV5tXN1cld5n6VobFl6oFp7olx6p1t8o0qAtmh7klx9pF58qXJ5jV1+pXZ7fmZ9mkyCuHp8eWt+lU+Eu1KGvX+Bfqh3d1qIuYKEgXeGmGiJsF+MvoWHhIOHloKJkW2NqH+LmG2OtmWSxIOPnKaKiWmWyXiUtqeLipCSj4yUm36Ws3uXuoqVonKZxoeWqZSWk32Zu36avX+bvnedyoCcv4GdwIadunmfzZGcqZidn5udmYmgvn2j0Yqhv4uiwJ6gnaKfo32mzYyjwZ+hno2kwo6lw6KkoZCnxbSho5mou4qr1KOoq6aopamnq4Wv1qKrs5Wty7mmqKmrqJqtxoiy2pevzZ+uwautqqiusKautqSwvqKxxZuy0K6wrZG22Ku0vLK0sZy4z5W526C31qu2xLG2uK63v6W40ba4tae607e5tqi71Ky7zqm81Z+/3LC8ypvA4rq8ua++0qy/2Li+wJ7D5bTAza3B2rHB1LnByb7BvabG47DE3cHDv7zEzLbG2cDFyKnJ5rTH4L7Gz7fH2rjI3MXHw6/L48bIxcDJ0cfJxq3N68jKx73M4MnLyMPM1MbMzsrMycHN28TN1bHR78bO1r/P4snO0MzOy7bS6cfP18rP0cTQ3svQ0rTU8c/RzsbS4MrS28jU4tDV183W3tXX1MzY5sDb88rZ7dLa4tXa3Nja1s/b6sLe9tLe7Nne4dDg9Mvj9d7g3c7i+9/h3tTj+ODi39fj8dvk7NXl+eHk4ODl6OXn5Nnp/ePo693p9+Tp7Ofp5tvr/+jq59/r+enr6Obs7t7u/+Lu/ePv/urv8u3v6+Tx//Dy7+7z9vHz8PP18vb49Pj69/r8+ff9//z/+/7//CwAAAAAFwAXAAAI/gDpCRxIsKBBgoEIKFxIYEeLhzuqEDsoMKFCCjbgtHp2bVmoNTaYUKSXcMOZas+Y8XMkjNSqX11wTDOY0AMfabtO4cIU7ZctbMaStcGhB6FCM+GU/Rsmr523Yqdk3bO3LIuJogKNEHjxrN+/TuDq1UOX7Zy+f/vIoZrBYmAFAm7u/XsUT57ddb4QVXr0Tl0zLxOwErgQKh0ib/ESxzOnNJ2sT+yYFUJgQSABDskuwbJmbl28ddX+if5HLhUeThIq0yMA4hkmVcegcfOmzdfof/kEdSrVAoBlF78IffK1qVcvWpy8iqaXS4glCL7pkcBA6Q62f/MUecq06MwXXPjG8xH74AdBdBIUyBwa3a9RnzlquMgp50yKkiwFogeqMaOVKH6iDVIGGFYsMYUztSQhCQwAHDCQETJkwQgw9NhzhRNLENEDErFM4sYTJgDww0CB2HHCGZtMEwYQPfAQQwohOPJHFg8AAABWAqVBxwhUcPJEDimI0EEIQ0DyRAM2xlEQNaPUoQENWfhxxClJ5JEFgzY24U5B7iCjyRs3GCDAAmIsMEAANqaJVTCJYBFECREwkMCc3XTzSgJp5gkFPdsEE8kedQCiySts+DDOLGxk4AMapiRShyGvOMPnLXtEoUMGDigw5yhjFDFnAgpEoAIWkegSEAA7',



	Save : 'data:image/png;base64,R0lGODlhFwAXAMZbAAAAAExCJlRUVGtXNnBbOY9ZAm1tbW5ubnR0dHV1dXd3d3l5eXt7e35+fpt+UYOEgp+BVJ+CVKCCVqKFVaKFVqOFVYiKhaSHV42OjJKSkpSUlJycnMSgAJ+fn6CgoKOjo8ifZMuhZaenp6mpqaqqqs6maKysrK2trc+qacKris2rb9Ksas+tcbGxsbKysre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMPDw8TExMXFxcnJycrKysvLy8zMzNHR0dPT09TU1PTVl9nZ2dvb29zc3N/f3+Hh4fTivO3lxOXl5e3mxebm5u7oxufn5+jo6O7qxunp6e/rx+rq6uvr6+zs7O3t7e7u7vPz8/39/f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAFwAXAAAH/oBYglgchIaFiIaDi4RbHI6Qj5KOjIMcSRxDmZuanYVYV4sYCxwMpacHHKkGHAgWBQWLFkUjMyMyHjIjOLkfNSIKBVEssYIWWVJST1RSzMrKTzQFUysSxVgWWlbb3N1WQtMrF9fYW9s/6OnoL8IoDuTl3t1BwiUR8PFW6usFTiXjFipZMCePnhMVFAp4CMho4Ll07JiEmFBAiAuGsghyq1JACQgIFYV0wDjIob4fPhIQSFGhAAwbNTaQNKbRipQCAQYUOHHCRAwNM62YRKkDQAEBDW7cANIjgwUri5aYtFKFirMmyag0IWFhSShBRqbK29jCgpEqoLAQCeiirdu3PG8tEEErCMkDC3jz6t37AAlUQVSOBOGxY0eOw4hzFOYR5AgVRlaoQJn8pLLlJ5OhUPkraIvnz6BDi/YcCAA7',



	VillageFrom : 'data:image/gif;base64,R0lGODlhFwAXAOeCAKQAAJwICIQiIdwlJdwmJt4mJuAmJuInJ3tMSlVXU+U5OTRlpIhaWGVnY+xGRpldW/FMTEp2rvBRUXJ1enV1dW52gXV2dvJVVXF4gXV4e3V4fHd4enZ5fHZ5ffNbW511c/JeXn6Ae3+BfICCfV+Gt/NjY/NkZPRmZoSFgoSGgYqIZYWHgomIcIaIg4iJfoeJhPRsbIiKhY+QjfR1daONi3eYwnmZw8CKiqqRkZeZlJiZlpmalpmal5ubmq2YmJ6enq6bm5+gnqGgnqefnaGhoaKioqKjoaOjoqOjo6SkpMShoaqqqqysrK+vr7GztrOzs7i5uMm1tbq6ubq7vLi8wbm9wb29vb+/vsS+vsLCwcLCwsbBwc3Nzc7OztLS0tzQ0NPT09TU1NbW1tfX19jX19jY2Nra2tvb29vc29zc3N3d3d7e3d7e3uLe3uDg4OLi4uPj4+Tk5OXl5ebm5ufn5+np6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/j4+Pn5+f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gD1CBxIsKBBQYIMEiQDAMAWhQgVCsQCYMYMAGQOJlRI0aJFjAUjGuyowOKBixkHiiTY0QEEkydBClw5saKECxcrGoiZkmZHDyAuImBQsQBPPSt9VDRh4uIDFD1uVCTAc2VFGCcufpABJYsUJRUHxBRJp2KJizSCXFmzRs2YKAFmDLgoUk3Fi0OOmLHDt04dOl/i0t1od4YAIUbKzKHDeE6cOHDaxAWwEggANAkyZ/67oQOFDhb+AMBBM4GeBCFEjBgxRw4HGxRqaPCT4E7pPAlS6F4R500GEhQiTOiTAM9KO8UTtGihgsUbNxgWUFhQgU8COSLvuKmd4MULFyLcawRyQmVKlSR7EoAhKyYB8hjwY7AJVASJfSRqEnghGyYBnwY56LADD38YBEgCaUTEhR1saObggw7aEZEbedQBxxldWLEEET8QQQQTTTyhRRdv3IFUQm7okUceeNhRhxyQwTHHYnTYkYdKggQEADs=',



	AttackMode : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',

	

};



var Troops = {

	Name: [

			[	"Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris",

				"Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"],

			[	"Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", 

				"Ram", "Catapult", "Chief", "Settler", "Hero"],

			[	"Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", 

				"Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"]

	],

	Speed : [

		[6,5,6,16,14,10,4,3,5,4,16],

		[7,7,6,9,10,9,4,3,4,5,10],

		[7,6,17,19,16,13,4,3,5,5,10]

	]

};

var Vill = {

	Race : function(){

		raceData = decodeURIComponent(GM_getValue(dataIndex+"_race",false));

		if (raceData != 'false' && raceData.length >= 1){

			Race = raceData;		

		}else {

			GM_xmlhttpRequest({

				method: 'GET',

				url: Host + "/spieler.php",

				headers: {'Accept': 'application/atom+xml,application/xml,text/xml'},

				onload: function(responseDetails) {

					response = responseDetails.responseText;

					if (response.match(/<td>Teutons</)){

						Race = 1;	

					}	

					else if (response.match(/<td>Romans</)){

						Race = 0;	

					}	

					else if (response.match(/<td>Gauls</)){

						Race = 2;	

					}

					GM_setValue(dataIndex+"_race",encodeURIComponent(Race));

				}

			});

		}

	},

	List : [],

	Init : function(){

			dorfData = decodeURIComponent(GM_getValue(dataIndex+"_dorf",false));

			if (dorfData != 'false' && dorfData.length > 1){

				ddd = dorfData.split("$$");

        for (var i = 0 ; i < ddd.length ; i++){

          dd = ddd[i].split("$");

			  	this.List[i] = [dd[0],dd[1],dd[2],dd[3]];			

        }

			}else {

				GM_setValue(dataIndex+"_dorf",'');

				vstr = "";

				GM_xmlhttpRequest({

					method: 'GET',

					url: Host + "/spieler.php",

					headers: {'Accept': 'application/atom+xml,application/xml,text/xml'},

					onload: function(responseDetails) {

            vArea = Doc.Element("villageList");

        		vArea = vArea.getElementsByClassName("list")[0];

        	  vLinks = vArea.getElementsByTagName("a");

						villaa = Doc.New("div",[['style','display:none'],]);

						villaa.innerHTML = responseDetails.responseText;

						Doc.Element("content").appendChild(villaa);

						pArea = Doc.Element("villages");

						pLinks1 = pArea.getElementsByClassName("name");

            for(var j = 1 ; j < pLinks1.length; j++){

              i = j - 1;

					  	pLinks = pLinks1[j].getElementsByTagName("a")[0];

						  vXs = Doc.id2xy(pLinks.href.split("=")[1]);

						  Vill.List[i] = [pLinks.innerHTML,vLinks[i].href.split("?")[1],vXs[0],vXs[1]]; 

              vstr += Vill.List[i][0] + "$" + Vill.List[i][1] + "$" + Vill.List[i][2] + "$" + Vill.List[i][3];

              vstr += "$$";

            }

            alert(vstr);

						GM_setValue(dataIndex+"_dorf",decodeURIComponent(vstr.substr(2)));

						window.location = Host + "/dorf3.php";

					}

				});

		}

	},

	getUserId : function(){

		navi = Doc.Element("side_info");

		navi_p = navi.getElementsByClassName("sideInfoPlayer")[0];

		profile_link = navi_p.getElementsByTagName("a")[0];

		return profile_link.href.split("=")[1];

	},

	

};





var Time = {

	Sync : function(x,y,x1,y1,last_sent,farm_id,trps,interval){

		dist = this.getDistance(x,y,x1,y1);

		slow = 20;

		for (var i = 1 ; i <= 11 ; i++ ){

			tid = "f"+farm_id+"_t"+i;

			if (parseInt(trps.split("|")[i-1]) > 0){

				if (slow > Troops.Speed[Race][i-1]){

					slow = Troops.Speed[Race][i-1];

				}

			} 

		}

		mtime = this.getTTime(dist,slow);

		lsec = this.toSec(last_sent);

		crT = this.getCurrTime();

		nsec = this.toSec(crT);

		msec = this.toSec('0000-00-00 '+mtime);

		msec = parseInt((msec * 2)/interval);

		mode = 'def1';

		dsec = nsec - lsec;

		tm = parseInt(lsec) + parseInt(msec) - parseInt(nsec);

		if ( tm < 0 ){ tm = 0; }

		if (dsec > msec) {

			dsec = msec;

		}

		return [mtime,this.toHour(tm+lsec),mode,tm,msec,dsec];

		

	}, 

	getDistance: function(sx1, sy1, sx2, sy2){

		var x1 = parseInt(sx1);

		var y1 = parseInt(sy1);

		var x2 = parseInt(sx2);

		var y2 = parseInt(sy2);

		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));

		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));

		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

		return dist;

	},

	getTTime : function(qDist,theSlow){

		var aTime = Math.round(qDist * 3600000 / theSlow);

		//aTime += 10;

		hh=Math.floor(aTime/3600000);

		if(hh<10){hh="0"+hh;}

		mm=Math.floor((aTime-hh*3600000)/60000);

		if(mm<10){mm="0"+mm;}

		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);

		if(ss<10){ss="0"+ss;}

		return hh+":"+mm+":"+ss;

	},

	toSec : function(dt){

		// 2009-10-10 12:00:00

		d = dt.split(" ");

		dds = d[1].split(":");

		hhs = d[0].split("-");

		s = parseInt(dds[2]) + parseInt((dds[1]) * 60) + parseInt((dds[0]) * 3600);

		//alert(parseInt(dds[0]) + "s = " +s);

		s1 = parseInt(hhs[2]) * 86400  + parseInt(hhs[1]) * 2592000;

		return parseInt(s) + parseInt(s1);

	},

	toHour : function(sc){

		sc = parseInt(sc);

		m = Math.floor(sc/2592000);

		sc = Math.floor(sc%2592000);

		

		d = Math.floor(sc/86400);

		sc = Math.floor(sc%86400);



		h = Math.floor(sc/3600);

		sc = Math.floor(sc%3600);



		mm = Math.floor(sc/60);

		sc = Math.floor(sc%60);



		if (m<10){m = "0"+m;}

		if (d<10){d = "0"+d;}

		if (h<10){h = "0"+h;}

		if (mm<10){mm = "0"+mm;}

		if (sc<10){sc = "0"+sc;}

		res =  "2010-"+m+"-"+d+" " +h+":"+mm+":"+sc;

		return res;

		

	},

	getCurrTime : function(){

		crTime = new Date();

		year = crTime.getFullYear();

		month = parseInt(crTime.getMonth()+1);

       	day = crTime.getDate();

		hour = (crTime.getHours() );

        minute = crTime.getMinutes();

        second = crTime.getSeconds();

		if (month < 10) {month = "0" + month;}

		if (day < 10) {day = "0" + day;} 

		if (hour < 10) {hour = "0" + hour;} 

		if (minute < 10)  {minute = "0" + minute;} 

		if (second < 10) {second = "0" + second;}



		res =  year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 

		//alert(res);

		return res;



	},

	



};





var Farms = {

	New : function(datas){

		strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

		aFarm = '';



		for (var j = 0 ; j < datas.length ; j++){

			aFarm += ('$'+datas[j]);

		}

		if (strFarms != 'false' && strFarms.length > 1){

			strFarms += ("$$"+ aFarm.substr(1));

		}else{

			strFarms = aFarm.substr(1);

		}

		GM_setValue(dataIndex,encodeURIComponent(strFarms));

	},

	Delete : function(){

		GM_setValue(dataIndex,'');

	},

	Save : function(){

		if (crtPage.match(/karte.php/)){

			alert("Sorry! You cannot edit this page");

		}else {

			farm_id = Doc.Element('save_id').value;

			farm_name = Doc.Element('fn_'+farm_id).value;

			if (farm_name == 'undefined' || farm_name.length < 0 ){

			  farm_name = 'unnamed';

			}

			farm_x = Doc.Element('fx_'+farm_id).value;

			farm_x = parseInt(farm_x);

			if (farm_x > 800 || farm_x < -800){

				farm_x = 800;

			}

			farm_y = Doc.Element('fy_'+farm_id).value;

			farm_y = parseInt(farm_y);

			if (farm_y > 800 || farm_y < -800){

				farm_y = 800;

			}

			farm_v = Doc.Element('fv_'+farm_id).value;

			farm_am = Doc.Element('fam_'+farm_id).value;



			troops = '';

			for (var j = 1 ; j <= 11 ; j++){

				tr = Doc.Element('f'+farm_id+'_t'+j).value;

				if(tr.length < 0){

					tr = 0;

				}

				troops += "|"+tr;

			}

			last_time = Doc.Element("last_"+farm_id).value;

			interval = Doc.Element("interval_"+farm_id).value;

			Farms.Edit(farm_id,[[0,farm_name],[1,farm_x],[2,farm_y],[3,farm_am],[4,farm_v],[5,troops.substr(1)],[6,last_time],[7,interval]]);

		}	

	},

	Edit : function(farm_id,datas){

		if (crtPage.match(/karte.php/)){

			alert("Sorry! You cannot edit at this page");

		}else {

			var strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

			sFarms = strFarms.split("$$");

			aFarm = sFarms[farm_id].split("$");

			for (var j = 0 ; j < datas.length ; j++){

				aFarm[datas[j][0]] = datas[j][1];

			}

			aFarm_s = '';

			for (var j = 0 ; j < aFarm.length ; j++){

				aFarm_s += ('$'+aFarm[j]);

			}

			sFarms[farm_id] = aFarm_s.substr(1);

			newdata = "";

			for (var j = 0 ; j < sFarms.length ; j++){

				newdata += "$$" + sFarms[j];

			}

			GM_setValue(dataIndex,encodeURIComponent(newdata.substr(2)));

			window.location = Host + "/dorf3.php";

		}

	},

	Remove: function(farm_id){

		if (crtPage.match(/karte.php/)){

			alert("Sorry! You cannot delete at this page");

		}else {

			if (!farm_id) farm_id = Doc.Element("del_id").value;

			var strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

			sFarms = strFarms.split("$$");

			newdata = "";

			for (var j = 0 ; j < sFarms.length ; j++){

				if (j != farm_id){

					newdata += "$$" + sFarms[j] ;

				}

			}

			if (sFarms.length == 1) {

				GM_setValue(dataIndex,'');

			}else{

				GM_setValue(dataIndex,encodeURIComponent(newdata.substr(2)));

			}

			window.location = Host + "/dorf3.php";

		}

	},

	ListSmall : function(){

		Thread.Stop();

		Thread.List = [];

		rmLinks = [];

		tmpF = Doc.Element('bfarms');

		if (tmpF){

			Doc.Element('content').removeChild(tmpF);

		}

		FarmDiv = Doc.New("DIV",[['id','bfarms']]);



		var strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

		if (strFarms != 'false' && strFarms.length > 1) {

			aFarms = new Array();

			sFarms = strFarms.split("$$");

			Total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

			TotalIndex = 1;

			TotalIndexT = 1;



			fT = Doc.New("table",[['id','fTable'],['class','troop_details'],['cellspacing',1],['cellpadding',1]]);

			

			fTH = Doc.New('thead');

			fTHTR = Doc.New('tr');



			td = Doc.New('td'); td.innerHTML = ' Name '; fTHTR.appendChild(td);

			td = Doc.New('td'); td.innerHTML = ' X '; fTHTR.appendChild(td);

			td = Doc.New('td'); td.innerHTML = ' Y '; fTHTR.appendChild(td);

			td = Doc.New('td',[['colspan',5]]); td.appendChild(Doc.New("IMG",[['title','Village From'],['src',Images.VillageFrom]])); fTHTR.appendChild(td);



			td = Doc.New('td',[['colspan',3]]); td.appendChild(Doc.New("IMG",[['title','Attack Mode'],['src',Images.AttackMode]])); fTHTR.appendChild(td);





			// Customize troops icon

			for (var j = 1 ; j <= 11 ; j++){

				jj = (Race * 10) + j;

				TTitle = Troops.Name[Race][j-1];

				if (j == 11){

					jj = 'hero';

				}

				trImg = Doc.New("IMG",[['class','unit u'+jj],['title',TTitle],['alt',TTitle],['src','img/x.gif']]);

				td = Doc.New('td'); td.appendChild(trImg); 

				fTHTR.appendChild(td);

			}



			td = Doc.New('td'); td.appendChild(Doc.New('IMG',[['class','clock'],['title','Interval'],['src','img/x.gif']])); fTHTR.appendChild(td);

			td = Doc.New('td',[['colspan',3]]); td.appendChild(Doc.New("IMG",[['class','clock'],['title','Process Time'],['src','img/x.gif']])); fTHTR.appendChild(td);

			td = Doc.New('td',[['colspan',3]]); td.appendChild(Doc.New("IMG",[['class','clock'],['title','Travel Time'],['src','img/x.gif']])); fTHTR.appendChild(td);

			td = Doc.New('td',[['colspan',8]]); td.appendChild(Doc.New("IMG",[['class','clock'],['title','Last Sent'],['src','img/x.gif']]));fTHTR.appendChild(td);

			td = Doc.New('td',[['colspan',5]]); td.innerHTML = ' Actions '; fTHTR.appendChild(td);

			

			

			fTH.appendChild(fTHTR);

			fT.appendChild(fTH);

			

			fTB = Doc.New('tbody');

			for (var i = 0 ; i < sFarms.length ; i++){

				aFarms = sFarms[i].split("$");



				fTR = Doc.New('tr',[['id','fTR_'+i]]);



				// Name and cords

				fIn = Doc.New('input',[['id','fn_'+i],['type','text'],['size',12],['value',aFarms[0]] ]);

				fX = Doc.New('input',[['id','fx_'+i],['type','text'],['size',2],['value',aFarms[1]]]);

				fY = Doc.New('input',[['id','fy_'+i],['type','text'],['size',2],['value',aFarms[2]]]);

				td = Doc.New('td'); td.appendChild(fIn); fTR.appendChild(td);

				td = Doc.New('td'); td.appendChild(fX); fTR.appendChild(td);

				td = Doc.New('td'); td.appendChild(fY); fTR.appendChild(td);

					

				// From village

				fTRTD = Doc.New('td',[['colspan','5']]);

				fSEL = Doc.New('select',[['id','fv_'+i]]);

				for (var j = 0 ; j < Vill.List.length ; j++){

					fOP = Doc.New("option",[['value',j]]);

					fOP.innerHTML = Vill.List[j][0];

					if (j == parseInt(aFarms[4])){

						fOP.setAttribute("selected",1);

					}

					fSEL.appendChild(fOP);

				}

				fTRTD.appendChild(fSEL);

				fTR.appendChild(fTRTD);

				

				// Attack mode

				fTRTD = Doc.New('td',[['colspan',3]]);

				fSEL = Doc.New('select',[['id','fam_'+i]]);

				fOP = Doc.New("option",[['value','4']]);

				fOP.innerHTML = "Raid";

				if (aFarms[3] == "4"){

					fOP.setAttribute("selected",1);

				}

				fSEL.appendChild(fOP);

				fOP = Doc.New("option",[['value','3'],['select']]);

				fOP.innerHTML = "Normal";

				if (aFarms[3] == "3"){

					fOP.setAttribute("selected",1);

				}

				fSEL.appendChild(fOP);

				fTRTD.appendChild(fSEL);

				fTR.appendChild(fTRTD);

				



				// Troop counts				

				for( var j = 1 ; j <= 11 ; j++){

					trNum = Doc.New("input",[['size','2'],['id','f'+i+'_t'+j],['value',aFarms[5].split("|")[j-1]]]);

					Total[j] +=  parseInt(aFarms[5].split("|")[j-1]) * parseInt(aFarms[7]);

					td = Doc.New('td'); td.appendChild(trNum); fTR.appendChild(td);

				}

				TotalIndex ++;

 				TotalIndexT += parseInt(aFarms[7]);

					

				res = Time.Sync(aFarms[1],aFarms[2],Vill.List[aFarms[4]][2],Vill.List[aFarms[4]][3],aFarms[6],i,aFarms[5],aFarms[7]);

				

			

				// Interval

				int_sel = Doc.New('select',[['id','interval_'+i],['title','Interval Number']]);

				for (j = 1; j <= 30 ; j++){

					op = Doc.New('option',[['value',j]]);

					op.innerHTML = j;

					if (j == aFarms[7]){

						op.setAttribute('selected',1);

					}

					int_sel.appendChild(op);

				}

				td = Doc.New('td'); td.appendChild(int_sel);fTR.appendChild(td);

				



				// Times

				td = Doc.New('td',[['id','ft_'+i], ['colspan',3]]); td.innerHTML = res[0]; fTR.appendChild(td);

				td = Doc.New('td',[['id','ft2_'+i], ['colspan',3]]); td.innerHTML = res[0]; fTR.appendChild(td);

				

				// Last Sent

				last_inp = Doc.New('input',[['type','text'],['id','last_'+i],['value',aFarms[6]]]);

				td = Doc.New('td',[['colspan',8]]); td.appendChild(last_inp); fTR.appendChild(td);



				// Map Link

				fTRTD = Doc.New('td');

				mapURL = Host + "/karte.php?z="+Doc.xy2id(aFarms[1],aFarms[2]);

				mapLink = Doc.New("a",[['href',mapURL],['target','_blank']]);

				mapImg = Doc.New("img",[['alt','Show on Map'],['title','Show on Map'],['src',Images.Map]]);

				mapLink.appendChild(mapImg);

				fTRTD.appendChild(mapLink);

				fTR.appendChild(fTRTD);

			



				// Pause & Resume

				

				isactive = false;

				if (aFarms[8] && parseInt(aFarms[8]) == 1){

					isactive = true;

				}

				pauseLink = Doc.New('a',[['href','javascript:void(0);'],['id','fstatep_'+i]]);

				pauseLink.appendChild(Doc.New('IMG',[['title','Pause'],['src',Images.Pause]])); 

				playLink = Doc.New('a',[['href','javascript:void(0);'],['id','fstater_'+i]]);

				playLink.appendChild(Doc.New('IMG',[['title','Resume'],['src',Images.Resume]]));

				if (isactive == true){

					playLink.style.display = 'none';

				}else {

					pauseLink.style.display = 'none';

				}

				pauseLink.addEventListener('click',function(){Farms.Pause(this.id)},false);

				playLink.addEventListener('click',function(){Farms.Resume(this.id)},false); 

				td = Doc.New('td'); td.appendChild(pauseLink); td.appendChild(playLink); fTR.appendChild(td);



					

				// Save Link

				saveLink = Doc.New("a",[['id','fsave_'+i],['href','javascript:void(0);'],['onmouseover',"document.getElementById('save_id').value="+i] ]);

				saveLink.addEventListener('click',function(){Farms.Save()},false);

				saveImg = Doc.New("img",[['title','Save'],['alt','Save'],['src',Images.Save]]);



				saveLink.appendChild(saveImg);

				td = Doc.New('td'); td.appendChild(saveLink);fTR.appendChild(td);



				// Remove Link

				rmLinks[i] = Doc.New('a',[['href',"#"],['onmouseover',"document.getElementById('del_id').value="+i]]);

				rmLinks[i].addEventListener('click',function(){Farms.Remove()},false);

				rmImg = Doc.New('img',[['alt','Delete'],['title','Delete'],['class','del'],['src','img/x.gif']]);

				rmLinks[i].appendChild(rmImg);

				td = Doc.New('td',[['id','frem_'+i],['colspan',2]]);td.appendChild(rmLinks[i]);fTR.appendChild(td);



				fTB.appendChild(fTR);



				

				// Calculate totals

			

				Thread.List[i] = [isactive,res[4],res[4]-res[5],res[2]];

			}

			TTR = Doc.New("tr");

			TTD = Doc.New("td",[['colspan',8]]);

			TTD.innerHTML = " <i><u><b>Total:</b></u></i> ";

			TTR.appendChild(TTD);

			TTD = Doc.New("td",[['colspan',3]]);

			TTD.innerHTML = "<b>" + (TotalIndex-1) + " / " + (TotalIndexT - 1) + "</b>";

			TTR.appendChild(TTD);

			for( var j = 1 ; j <= 11 ; j++){

				trTD = Doc.New('td');

				trTD.innerHTML = "<b>" + Total[j] + "</b>";

				TTR.appendChild(trTD);

			}

			// Skin Change

			trTD = Doc.New('td',[['colspan',10]]);

			skinSelecter = Doc.New('select');

			skinOption1 = Doc.New('option',[['value','box']]);

			skinOption1.innerHTML = "Skin Box";

			skinOption2 = Doc.New('option',[['value','list'],['selected',true]]);

			skinOption2.innerHTML = "Skin List";



			skinSelecter.appendChild(skinOption1);

			skinSelecter.appendChild(skinOption2);



			skinSelecter.addEventListener('change',function(){

					GM_setValue(dataIndex+"_vt",'box');

					window.location.href = Host + "/dorf3.php";

			},false);

			trTD.appendChild(skinSelecter);

			TTR.appendChild(trTD);





			fTB.appendChild(TTR);

			fT.appendChild(fTB);

			FarmDiv.appendChild(fT);



			// Pause All

			trTD = Doc.New('td',[['colspan',10]]);

			pLink = Doc.New('a',[['href','javascript:void']]);	

			if (GM_getValue(dataIndex+'_pauseall',false) == '1'){

				pLink.appendChild(Doc.New('IMG',[['title','Farm all farms'],['src',Images.Resume]]));

				pLink.addEventListener('click',function(){

					GM_setValue(dataIndex+'_pauseall','0');

					window.location.href = Host + "/dorf3.php";

				},false);

			}else {

				pLink.appendChild(Doc.New('IMG',[['title','Pause all farms'],['src',Images.Pause]]));

				pLink.addEventListener('click',function(){

					GM_setValue(dataIndex+'_pauseall','1');

					window.location.href = Host + "/dorf3.php";

				},false);

				Thread.Init();

			}

			trTD.appendChild(pLink);

			TTR.appendChild(trTD);

			

		}

		newLink = Doc.New('a',[['id','new_link'],['href','javascript:void(0);']]);

		newLink.addEventListener('click',Action.New,false);

		newLink.innerHTML = "New Farm";

		BackupLink = Doc.New('a',[['id','backup_link'],['href','javascript:void(0);']]);

		BackupLink.addEventListener('click',Action.Backup,false);

		BackupLink.innerHTML = " Backup";

		RestoreLink = Doc.New('a',[['id','restore_link'],['href','javascript:void(0);']]);

		RestoreLink.addEventListener('click',Action.Restore,false);

		RestoreLink.innerHTML = " Restore";

		FarmDiv.appendChild(newLink);

		FarmDiv.appendChild(BackupLink);

		FarmDiv.appendChild(RestoreLink);

		Doc.Element("content").appendChild(FarmDiv);



		FarmDiv.appendChild(Doc.New("input",[['type','hidden'],['id','del_id']]));

		FarmDiv.appendChild(Doc.New("input",[['type','hidden'],['id','save_id']]));

		FarmDiv.appendChild(Doc.New("DIV",[['id','resp'],['style','display: none;']]));

	},

	List : function(){

		Thread.Stop();

		Thread.List = [];

		rmLinks = [];

		tmpF = Doc.Element('bfarms');

		if (tmpF){

			Doc.Element('content').removeChild(tmpF);

		}

		FarmDiv = Doc.New("DIV",[['id','bfarms'],['style','margin-top: 20px;']]);

		var strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

		if (strFarms != 'false' && strFarms.length > 1) {

			aFarms = new Array();

			sFarms = strFarms.split("$$");

			Total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

			TotalIndex = 1;

			TotalIndexT = 1;

			if (crtPage.match(/position_details.php/)){

        sXY = []; 

				sXY[0] = crtPage.split('&')[0].split('=')[1];

				sXY[1] = crtPage.split('&')[1].split('=')[1];

				tmpFarms = [];

				tmpFarmsIndex = 0;

				for (var i = 0 ; i < sFarms.length ; i++){

					if (sFarms[i].split("$")[1] == sXY[0] && sFarms[i].split("$")[2] == sXY[1]){

						tmpFarms[tmpFarmsIndex] = sFarms[i];

						tmpFarmsIndex += 1;

					}									

				}

				sFarms = tmpFarms;

			}

			for (var i = 0 ; i < sFarms.length ; i++){

				aFarms = sFarms[i].split("$");

				fT = Doc.New("table",[['id','fTable_'+i],['class','troop_details'],['cellspacing',1],['cellpadding',1]]);

				fTH = Doc.New('thead');

				fTHTR = Doc.New('tr');



				fTHTRTD = Doc.New('td');

				fIn = Doc.New('input',[['id','fn_'+i],['type','text'],['size',12],['value',aFarms[0]] ]);

				fTHTRTD1 = Doc.New('td');

				fX = Doc.New('input',[['id','fx_'+i],['type','text'],['size',2],['value',aFarms[1]]]);

				fTHTRTD1.appendChild(fX);

				fTHTRTD2 = Doc.New('td');

				fY = Doc.New('input',[['id','fy_'+i],['type','text'],['size',2],['value',aFarms[2]]]);

				fTHTRTD2.appendChild(fY);

				fTHTRTD.appendChild(fIn);

				fTHTR.appendChild(fTHTRTD);

				fTHTR.appendChild(fTHTRTD1);

				fTHTR.appendChild(fTHTRTD2);



				

				fTHTRTD = Doc.New('td',[['colspan','5']]);

				fSEL = Doc.New('select',[['id','fv_'+i]]);

				for (var j = 0 ; j < Vill.List.length ; j++){

					fOP = Doc.New("option",[['value',j]]);

					fOP.innerHTML = Vill.List[j][0];

					if (j == parseInt(aFarms[4])){

						fOP.setAttribute("selected",1);

					}

					fSEL.appendChild(fOP);

				}

				fTHTRTD.appendChild(fSEL);

				fTHTR.appendChild(fTHTRTD);

				

				fTHTRTD = Doc.New('td',[['colspan',3]]);

				fSEL = Doc.New('select',[['id','fam_'+i]]);

				fOP = Doc.New("option",[['value','4']]);

				fOP.innerHTML = "Raid";

				if (aFarms[3] == "4"){

					fOP.setAttribute("selected",1);

				}

				fSEL.appendChild(fOP);

				fOP = Doc.New("option",[['value','3'],['select']]);

				fOP.innerHTML = "Normal";

				if (aFarms[3] == "3"){

					fOP.setAttribute("selected",1);

				}

				fSEL.appendChild(fOP);

				fTHTRTD.appendChild(fSEL);

				fTHTRTD4 = Doc.New('td');

				mapURL = Host + "/karte.php?z="+Doc.xy2id(aFarms[1],aFarms[2]);

				mapLink = Doc.New("a",[['href',mapURL],['target','_blank']]);

				mapImg = Doc.New("img",[['alt','Show on Map'],['title','Show on Map'],['src',Images.Map]]);

				mapLink.appendChild(mapImg);

				fTHTRTD4.appendChild(mapLink);

				fTHTR.appendChild(fTHTRTD);

				fTHTR.appendChild(fTHTRTD4);





				fTH.appendChild(fTHTR);



				fTB = Doc.New('tbody',[['class','units']]);

				fTBTR = Doc.New('tr');

				fTBTRTH = Doc.New('th');

				fTBTR.appendChild(fTBTRTH);

				

				fTBTR1 = Doc.New('tr');

				fTBTR1TH = Doc.New('th');

				fTBTR1TH.innerHTML = 'Troops';

				fTBTR1.appendChild(fTBTR1TH);

				for( var j = 1 ; j <= 11 ; j++){

					jj = (Race * 10) + j;

					trTD = Doc.New("td");

					TTitle = Troops.Name[Race][j-1];

					if (j == 11){

						jj = 'hero';

					}

					trImg = Doc.New("IMG",[['class','unit u'+jj],['title',TTitle],['alt',TTitle],['src','img/x.gif']]);

					trTD.appendChild(trImg);

					fTBTR.appendChild(trTD);

					Total

					trTD1 = Doc.New("td");

					trNum = Doc.New("input",[['size','2'],['id','f'+i+'_t'+j],['value',aFarms[5].split("|")[j-1]]]);

					trTD1.appendChild(trNum);

					fTBTR1.appendChild(trTD1);

					Total[j] +=  parseInt(aFarms[5].split("|")[j-1]) * parseInt(aFarms[7]);

				}

				TotalIndex ++;

 				TotalIndexT += parseInt(aFarms[7]);

				fTB.appendChild(fTBTR);

				fTB.appendChild(fTBTR1);

					

				res = Time.Sync(aFarms[1],aFarms[2],Vill.List[aFarms[4]][2],Vill.List[aFarms[4]][3],aFarms[6],i,aFarms[5],aFarms[7]);

				fTB1 = Doc.New('tbody',[['class','infos']]);

				fTB1TR = Doc.New('tr');

				fTB1TRTH = Doc.New('th');

				int_sel = Doc.New('select',[['id','interval_'+i],['title','Interval Number']]);



				for (j = 1; j <= 30 ; j++){

					op = Doc.New('option',[['value',j]]);

					op.innerHTML = j;

					if (j == aFarms[7]){

						op.setAttribute('selected',1);

					}

					int_sel.appendChild(op);

				}

				fTB1TRTH.appendChild(int_sel);

				fTB1TR.appendChild(fTB1TRTH);

				fTB1TRTD = Doc.New('td',[['id','ft_'+i],['colspan',3]]);

				fTB1TRTD.innerHTML = res[0];

				fTB1TR.appendChild(fTB1TRTD);

				fTB1TRTD = Doc.New('td',[['id','ft2_'+i],['colspan',3]]);

				fTB1TRTD.innerHTML = res[0];

				fTB1TR.appendChild(fTB1TRTD);



				fTB1TRTD1 = Doc.New('td',[['id','ft1_'+i],['colspan',6]]);

				fTB1TRTD1.innerHTML = res[1];

				fTB1TR.appendChild(fTB1TRTD1);

				fTB1.appendChild(fTB1TR);

				

				fTB2 = Doc.New('tbody',[['class','infos']]);

				fTB2TR = Doc.New('tr');

				fTB2TRTH = Doc.New('th');

				fTB2TRTH.innerHTML = "Actions";

				fTB2TR.appendChild(fTB2TRTH);

				

				fTB2TRTD0 = Doc.New('td',[['colspan',8]]);

				last_inp = Doc.New('input',[['type','text'],['id','last_'+i],['value',aFarms[6]]]);

				last_label = Doc.New('label',[['id','last_label'+i]]);

				last_label.innerHTML = ' <i>Last Sent:</i> ';

				fTB2TRTD0.appendChild(last_label);

				fTB2TRTD0.appendChild(last_inp);

				fTB2TR.appendChild(fTB2TRTD0);



				

				// Pause & Resume

				

				isactive = false;

				if (aFarms[8] && parseInt(aFarms[8]) == 1){

					isactive = true;

				}

				pauseLink = Doc.New('a',[['href','javascript:void(0);'],['id','fstatep_'+i]]);

				pauseLink.appendChild(Doc.New('IMG',[['title','Pause'],['src',Images.Pause]])); 

				playLink = Doc.New('a',[['href','javascript:void(0);'],['id','fstater_'+i]]);

				playLink.appendChild(Doc.New('IMG',[['title','Resume'],['src',Images.Resume]]));

				if (isactive == true){

					playLink.style.display = 'none';

				}else {

					pauseLink.style.display = 'none';

				}

				pauseLink.addEventListener('click',function(){Farms.Pause(this.id)},false);

				playLink.addEventListener('click',function(){Farms.Resume(this.id)},false); 

				td = Doc.New('td'); td.appendChild(pauseLink); td.appendChild(playLink); fTB2TR.appendChild(td);





				

				fTB2TRTD = Doc.New('td');



				saveLink = Doc.New("a",[['id','fsave_'+i],['href','javascript:void(0);'],['onmouseover',"document.getElementById('save_id').value="+i] ]);

				

				saveLink.addEventListener('click',function(){Farms.Save()},false);

				saveImg = Doc.New("img",[['title','Save'],['alt','Save'],['src',Images.Save]]);



				saveLink.appendChild(saveImg);

				fTB2TRTD.appendChild(saveLink);

				fTB2TR.appendChild(fTB2TRTD);

				fTB2TRTD1 = Doc.New('td',[['id','frem_'+i],['colspan',2]]);

				rmLinks[i] = Doc.New('a',[['href',"#"],['onmouseover',"document.getElementById('del_id').value="+i]]);

				rmLinks[i].addEventListener('click',function(){Farms.Remove()},false);

				rmImg = Doc.New('img',[['alt','Delete'],['title','Delete'],['class','del'],['src','img/x.gif']]);

				rmLinks[i].appendChild(rmImg);



				fTB2TRTD1.appendChild(rmLinks[i]);

				fTB2TR.appendChild(fTB2TRTD1);

				fTB2.appendChild(fTB2TR);



				fT.appendChild(fTH);

				fT.appendChild(fTB);

				fT.appendChild(fTB1);

				fT.appendChild(fTB2);

				FarmDiv.appendChild(fT);

				Thread.List[i] = [isactive,res[4],res[4]-res[5],res[2]];

		

			}

			Doc.New('a',[['href','javascript:void(0);'],['onClick','Action.New']]);

			

			TT = Doc.New('table',[['id','TotalTable'],['class','troop_details'],['cellspacing',1],['cellpadding',1] ]);

			TTTHEAD = Doc.New("thead");

			TTTHEADTR = Doc.New("tr");

			TTTHEADTRTD = Doc.New("td",[['style','width:100px;']]);

			TTTHEADTRTD.innerHTML = " <i><u>Total:</u></i> ";

			TTTHEADTR.appendChild(TTTHEADTRTD);

			

			TBODY = Doc.New('tbody',[['class','infos']]);

			TBODYTR = Doc.New("TR");

			TBODYTRTH = Doc.New("th");

			TBODYTRTH.innerHTML = (TotalIndex-1) + " / " + (TotalIndexT - 1);

			TBODYTR.appendChild(TBODYTRTH);

			for( var j = 1 ; j <= 11 ; j++){

				jj = (Race * 10) + j;

				trTD = Doc.New("td");

				TTitle = Troops.Name[Race][j-1];

				if(j == 11){

					jj = 'hero';

				}

				trImg = Doc.New("IMG",[['class','unit u'+jj],['title',TTitle],['alt',TTitle],['src','img/x.gif']]);

				trTD.appendChild(trImg);

				TTTHEADTR.appendChild(trTD);

	

				trTD1 = Doc.New("td");

				trTD1.innerHTML = Total[j];

				TBODYTR.appendChild(trTD1);

			}

			TTTHEAD.appendChild(TTTHEADTR);

			TBODY.appendChild(TBODYTR);



			bTR = Doc.New('tr');

			trTD = Doc.New('td',[['colspan',6]]);

			skinSelecter = Doc.New('select');

			skinOption1 = Doc.New('option',[['value','box'],['selected',true]]);

			skinOption1.innerHTML = "Skin Box";

			skinOption2 = Doc.New('option',[['value','list']]);

			skinOption2.innerHTML = "Skin List";



			skinSelecter.appendChild(skinOption1);

			skinSelecter.appendChild(skinOption2);



			skinSelecter.addEventListener('change',function(){

					GM_setValue(dataIndex+"_vt",'list');

					window.location.href = Host + "/dorf3.php";

			},false);

			trTD.appendChild(skinSelecter);

			bTR.appendChild(trTD);

			TBODY.appendChild(bTR);



			// Pause All



			TT.appendChild(TTTHEAD);

			TT.appendChild(TBODY);

			FarmDiv.appendChild(TT);



			FarmDiv.appendChild(Doc.New("input",[['type','hidden'],['id','del_id']]));

			FarmDiv.appendChild(Doc.New("input",[['type','hidden'],['id','save_id']]));

			FarmDiv.appendChild(Doc.New("DIV",[['id','resp'],['style','display: none;']]));



			trTD = Doc.New('td',[['colspan',6]]);

			pLink = Doc.New('a',[['href','javascript:void']]);	

			if (GM_getValue(dataIndex+'_pauseall',false) == '1'){

				pLink.appendChild(Doc.New('IMG',[['title','Farm all farms'],['src',Images.Resume]]));

				pLink.addEventListener('click',function(){

					GM_setValue(dataIndex+'_pauseall','0');

					window.location.href = Host + "/dorf3.php";

				},false);

			}else {

				pLink.appendChild(Doc.New('IMG',[['title','Pause all farms'],['src',Images.Pause]]));

				pLink.addEventListener('click',function(){

					GM_setValue(dataIndex+'_pauseall','1');

					window.location.href = Host + "/dorf3.php";

				},false);

				Thread.Init();

			}

			trTD.appendChild(pLink);

			bTR.appendChild(trTD);



		}

		newLink = Doc.New('a',[['id','new_link'],['href','javascript:void(0);']]);

		newLink.addEventListener('click',Action.New,false);

		newLink.innerHTML = "New Farm";

		BackupLink = Doc.New('a',[['id','backup_link'],['href','javascript:void(0);']]);

		BackupLink.addEventListener('click',Action.Backup,false);

		BackupLink.innerHTML = " Backup";

		RestoreLink = Doc.New('a',[['id','restore_link'],['href','javascript:void(0);']]);

		RestoreLink.addEventListener('click',Action.Restore,false);

		RestoreLink.innerHTML = " Restore";

		FarmDiv.appendChild(newLink);

		FarmDiv.appendChild(BackupLink);

		FarmDiv.appendChild(RestoreLink);

		Doc.Element("content").appendChild(FarmDiv);

	},

	Pause : function(farm_id){

		Doc.Element(farm_id).style.display = 'none';

		Doc.Element(farm_id.replace('p','r')).style.display = '';

		Farms.Edit(farm_id.split('_')[1],[[8,0]]);

		

	},

	Resume : function(farm_id){

		Doc.Element(farm_id).style.display = 'none';

		Doc.Element(farm_id.replace('r','p')).style.display = '';

		Farms.Edit(farm_id.split('_')[1],[[8,1]]);

	},

};

var Action = {

	New : function(){

		Doc.Element("new_link").style.display = "none";

		NT = Doc.New('table',[['id','NewFarmTable'],['class','troop_details'],['cellspacing',1],['cellpadding',1] ]);

		THEAD = Doc.New('thead');

		THEADTR = Doc.New('tr');

		THEADTRTD = Doc.New('td');

		name_inp = Doc.New('input',[['size','12'],['id','NewFarmName'],['type','text'],['value','Name']]);

		THEADTRTD.appendChild(name_inp);

		THEADTR.appendChild(THEADTRTD);

		THEADTRTD1 = Doc.New('td');

		x_inp = Doc.New('input',[['size','2'],['id','NewFarmX'],['type','text'],['value','X']]);

		THEADTRTD1.appendChild(x_inp);

		THEADTR.appendChild(THEADTRTD1);

		

		THEADTRTD2 = Doc.New('td');

		y_inp = Doc.New('input',[['size','2'],['id','NewFarmY'],['type','text'],['value','Y']]);

		THEADTRTD2.appendChild(y_inp);

		THEADTR.appendChild(THEADTRTD2);

	

		THEADTRTD3 = Doc.New('td',[['colspan',5]]);

		v_sel = Doc.New('select',[['id','NewFarmVillage']]);

		for (var j = 0 ; j < Vill.List.length ; j++){

			op = Doc.New('option',[['value',j]]);

			op.innerHTML = Vill.List[j][0];

			v_sel.appendChild(op);

		}

		THEADTRTD3.appendChild(v_sel);

		THEADTR.appendChild(THEADTRTD3);



		THEADTRTD4 = Doc.New('td',[['colspan',3]]);

		am_sel = Doc.New('select',[['id','NewFarmMode']]);

		op = Doc.New('option',[['value',3]]);

		op.innerHTML = 'Normal';

		am_sel.appendChild(op);

		op = Doc.New('option',[['value',4]]);

		op.innerHTML = 'Raid';

		am_sel.appendChild(op);





		THEADTRTD4.appendChild(am_sel);

		THEADTR.appendChild(THEADTRTD4);

	

		THEADTRTD5 = Doc.New('td');

		int_sel = Doc.New('select',[['id','NewFarmInterval']]);

		for(j = 1 ; j <= 30 ; j++){

			op = Doc.New('option',[['value',j]]);

			op.innerHTML = j;

			int_sel.appendChild(op);	

		}

		THEADTRTD5.appendChild(int_sel);

		THEADTR.appendChild(THEADTRTD5);

		THEAD.appendChild(THEADTR);

		NT.appendChild(THEAD);

		

		TBODY = Doc.New('tbody',[['class','infos']]);

		TBTR = Doc.New('tr');

		TBTR1 = Doc.New('tr');

		TBTR1TH = Doc.New('th');

		TBTR1TH.innerHTML = "Troops";

		TBTRTH = Doc.New('th');

		TBTR.appendChild(TBTRTH);

		TBTR1.appendChild(TBTR1TH);

		for( var j = 1 ; j <= 11 ; j++){

			jj = (Race * 10) + j;

			trTD = Doc.New("td");

			TTitle = Troops.Name[Race][j-1];

			if(j == 11){

				jj = 'hero';

			}

			trImg = Doc.New("IMG",[['class','unit u'+jj],['title',TTitle],['alt',TTitle],['src','img/x.gif']]);

			trTD.appendChild(trImg);

			TBTR.appendChild(trTD);

	

			trTD1 = Doc.New("td");

			trNum = Doc.New("input",[['size','2'],['id','NewFarmTroops_t'+j],['value',0]]);

			trTD1.appendChild(trNum);

			TBTR1.appendChild(trTD1);

		}

		TBODY.appendChild(TBTR);

		TBODY.appendChild(TBTR1);



		TBODY1 = Doc.New("tbody",[['class','infos']]);

		TBD1TR = Doc.New("tr");

		TBD1TRTH = Doc.New("th");

		TBD1TRTH.innerHTML = "Actions";

		TBD1TR.appendChild(TBD1TRTH);

		TBD1TRTD = Doc.New("td",[['colspan',8]])

		TD1LAST = Doc.New("input",[['id','NewFarmLast'],['type','text'],['value','00-00-00 00:00:00']]);

		TD1LABEL = Doc.New("label");

		TD1LABEL.innerHTML = " <i>Last Sent: </i> ";

		TBD1TRTD.appendChild(TD1LABEL);

		TBD1TRTD.appendChild(TD1LAST);

		TBD1TR.appendChild(TBD1TRTD);



		TBD1TRTD1 = Doc.New("td",[['colspan',2]]);

		newSaveLink = Doc.New("a",[['href','javascript:void(0);']]);

		newSaveLink.addEventListener("click",Action.Save,false);

		newSaveImg = Doc.New("img",[['title','Save'],['alt','Save'],['src',Images.Save]]);

		newSaveLink.appendChild(newSaveImg);

		TBD1TRTD1.appendChild(newSaveLink);

		TBD1TR.appendChild(TBD1TRTD1);

		

		TBD1TRTD2 = Doc.New("td",[['colspan',2]]);

		delLink = Doc.New("a",[['href','javascript:void(0);']]);

		delLink.addEventListener("click",Action.Cancel,false);

		delImg = Doc.New("img",[['class','del'],['title','Cancel'],['alt','Cancel'],['src','img/x.gif']]);

		delLink.appendChild(delImg);

		TBD1TRTD2.appendChild(delLink);

		TBD1TR.appendChild(TBD1TRTD2);



		TBODY1.appendChild(TBD1TR);

		NT.appendChild(TBODY);

		NT.appendChild(TBODY1);



		Doc.Element('bfarms').appendChild(NT);



		if (crtPage.match(/position_details.php/)){

			nfX = crtPage.split('&')[0].split('=')[1];

			nfY = crtPage.split('&')[1].split('=')[1];

			Doc.Element("NewFarmX").value = nfX;

			Doc.Element("NewFarmY").value = nfY;

			h1 = document.getElementsByTagName("h1")[0];

			vName = h1.getElementsByClassName("coordText")[0].innerHTML;

			Doc.Element("NewFarmName").value = vName;

		}

	},

	Save : function(){

		FName = Doc.Element("NewFarmName").value;

		FX = Doc.Element("NewFarmX").value;

		FY = Doc.Element("NewFarmY").value;

		FMODE = Doc.Element("NewFarmMode").value;

		FVill = Doc.Element("NewFarmVillage").value;

		FInterval = Doc.Element("NewFarmInterval").value;

		FTroops = "";

		for (var j = 1 ; j < 12 ; j++){

			FTroops += ("|" + Doc.Element("NewFarmTroops_t"+j).value);

		}

		FLAST = Doc.Element("NewFarmLast").value;

		Farms.New([FName,FX,FY,FMODE,FVill,FTroops.substr(1),FLAST,FInterval,1]);

		GM_setValue(dataIndex+"_isNew",'added');



		window.location = crtPage;

	

	},

	Cancel : function(){

		NT = Doc.Element("NewFarmTable");

		Doc.Element("bfarms").removeChild(NT);

	},

	Backup : function(){

		Doc.Element("backup_link").style.display='none';

		Doc.Element("restore_link").style.display='none';

		myData = GM_getValue(dataIndex,false);

		textArea = Doc.New("textarea",[['id','backup'],['style','width: 470px;height: 100px']]);

		textArea.innerHTML = myData;

		Doc.Element("content").appendChild(textArea);

	},

	Restore : function(){

		Doc.Element("backup_link").style.display='none';

		Doc.Element("restore_link").style.display='none';

		textArea = Doc.New("textarea",[['id','restore'],['style','width: 470px;height: 100px'],]);

		Doc.Element("content").appendChild(textArea);

		acceptBtn = Doc.New("input",[['id','restoreA'],['type','button'],['value','Restore']]);

		acceptBtn.addEventListener('click',Action.Import,false);

		Doc.Element("content").appendChild(acceptBtn);

	},

	Import : function(){

		importData = Doc.Element("restore").value;

		GM_setValue(dataIndex,importData);

		window.location = Host+"/dorf3.php";

	}

	

};



var Doc = {

	New : function(tt,attrs){

		newElement = document.createElement(tt);

			if (attrs !== undefined) {

		for(var xi = 0; xi < attrs.length; xi++) {

			newElement.setAttribute(attrs[xi][0], attrs[xi][1]);

		};

	};

	return newElement;

	}, 

	Element : function(eid){

		return document.getElementById(eid);	

	},



	xy2id : function (x, y) {

		 return (((400-parseInt(y))*801)+(parseInt(x)+401));

	},	

	id2xy : function(vid) {

    arrXY = [];

	  var x = (vid % 801) - 401;

    var y = 400 - (vid - 401 - x) / 801;

	  arrXY[0] = x;

	  arrXY[1] = y;

	  return arrXY;

	},



	Tab : function(url){

		form = this.New('form',[['action',Host+'/'+url],['target','_blank'],['method','get']]);

		form.appendChild(this.New('input',[['type','submit'],['value','Dorf3']]));

		document.body.appendChild(form);

		form.submit();

	}

};

var Log = {

	Info : function(msg){

		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));

		if (strLog != 'false' && strLog.length > 1 && strLog.length < 20000 ) {

			strLog += ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");		

		}else{

		    strLog = ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");	

		}

		GM_setValue(dataIndex+"_log",encodeURIComponent(strLog));

	},

	Show : function(){

		logTable = Doc.New('table',[['cellspacing',1],['cellpadding',1],['style','background: #c0c0c0'] ]);

		THEAD = Doc.New('thead');

		THEADTR = Doc.New('tr');

		THEADTRTD = Doc.New('td');

		THEADTRTD.innerHTML = "<b style='color:#00BC00; '>Raiding LOG </b> ";

		THEADTR.appendChild(THEADTRTD);

		THEAD.appendChild(THEADTR);

		logTable.appendChild(THEAD);

		TBODY = Doc.New('tbody');



		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));

		aLogs = strLog.split("\n");

		for (var j = 0 ; j < aLogs.length ; j++){

			tr = Doc.New("tr");

			td = Doc.New("td");

			td.innerHTML = "<p style='text-align: left; margin: 0; padding: 0 5px;'> "+aLogs[j] + " </p>";

			tr.appendChild(td);

			TBODY.appendChild(tr);

		}

		

		// Insert Clear Button

		tr = Doc.New("tr");

		td = Doc.New("td");

		clearButton = Doc.New("button");

		clearButton.addEventListener('click',function(){Log.Clear()},false);

		clearButton.innerHTML = "Clear Log"

		td.appendChild(clearButton);

		tr.appendChild(td);

		TBODY.appendChild(tr);





		logTable.appendChild(TBODY);

		side_info = Doc.Element("side_info");

		side_info.setAttribute('style',"position: absolute; top: 97px; left: 682px; width: 680px;");

		side_info.appendChild(logTable);

	},

	Clear : function(){

		GM_setValue(dataIndex+"_log",'');

		window.location = Host + "/dorf3.php";

	}



};



var Check = {

	Count : 0,

	isRedirect : false,

	DeletedOrBanned : function(farm_id){

		ErrorMsg = document.getElementsByClassName("error");

		if (ErrorMsg && ErrorMsg.length > 0){

			fIn = Doc.Element("fn_"+farm_id).value;

			fX = Doc.Element("fx_"+farm_id).value;

			fY = Doc.Element("fy_"+farm_id).value;

			if (ErrorMsg[0].innerHTML.match(/slots are used/) || ErrorMsg[0].innerHTML.match(/No troops/) ){

				crT = Time.getCurrTime();

				Log.Info("DELAYED Name:"+fIn+" , x = "+fX+" , y = "+fY + " R = "+ErrorMsg[0].innerHTML );

				Farms.Edit(farm_id,[[6,crT]]);		

			}else {

				Log.Info("DELETED Name:"+fIn+" , x = "+fX+" , y = "+fY + " R = "+ErrorMsg[0].innerHTML );

				Farms.Remove(farm_id);

			}

		}

	},

	Login : function(farm_id){

		LoginReq = Doc.Element("login_form");

		if (LoginReq && LoginReq.innerHTML.length > 0){

			LoginForm = document.getElementsByName("snd")[0];

			LoginData = "";

			LoginForm.setAttribute('target', '_blank');

			LoginForm.submit();

			isRedirect = false;

			setInterval(function(){

				if (Check.isRedirect){

					Log.Info("Logged IN");

					window.location = Host + "/dorf3.php";

				}

				Check.isRedirect = true;		

			},4000);

			

		}else{

			Attack.Fill(farm_id);

		}

	},

	Refresh : function(){

		hasNew = GM_getValue(dataIndex+"_isNew",false);

		if (hasNew == 'added') {

			window.location = Host + "/dorf3.php";

		}else {

			if (Check.Count > 300){

				Check.Count = 0;

				GM_xmlhttpRequest({

					method: 'GET',

					url: Host + "/dorf3.php",

					headers: {'Accept': 'application/atom+xml,application/xml,text/xml'},

					onload: function(responseDetails) {

						window.location = Host + "/dorf3.php";

					}

				});

			}

			else{

				Check.Count += 1;

			}

		}

		

	},

	Safety : function(){

		LastWorked = GM_getValue(dataIndex+"_last",false);

		currTime = Time.getCurrTime();

		if ((Time.toSec(currTime) - Time.toSec(LastWorked)) > 1200 ){

			Doc.Tab('dorf3.php');

		}

	},

};

var Thread = {

	Sending : false,

	Interval : false,

	Curr : -1,

	List : [],

	Wait : [],

	Init : function(){

		this.Stop();

		this.Interval = setInterval(Thread.Process,1000);

	},

	Process : function(){

		for (var i = 0 ; i < Thread.List.length ; i++){

			if (Thread.List[i][0] == true){

				Thread.List[i][2] --;

				if(Thread.List[i][2] < 0 || Thread.List[i][2] >= Thread.List[i][1]){

					if (Thread.List[i][3] == 'def1'){

						Thread.List[i][3] = 'clock';

						if (Thread.Curr < 0){

							Thread.Wait[i] = Math.ceil(Math.random() * 10);

							if (crtPage.match(/karte.php/)){

								Thread.Wait[i] += 10;

							}

							Thread.Curr = i;

							if (ListView == false){

								Doc.Element('fTable_'+i).setAttribute('class','cur');

							}else {

								Doc.Element('fTR_'+i).setAttribute('class','hl');

							}

						}

					}else if(Thread.List[i][3] == 'clock'){

						if (Thread.Curr == i){

							Thread.Wait[i]--;

							Doc.Element('ft_'+i).innerHTML = Time.toHour(Thread.Wait[i]).split(' ')[1];

							if (Thread.Wait[i] <= 0){

								Thread.List[i][0] = false;

								Thread.Curr = -1;

								Thread.Stop();

								Thread.Send(i);

							}

						}else{

							Doc.Element('ft_'+i).innerHTML = "Waiting...";

							if (ListView == false){

								Doc.Element('fTable_'+i).setAttribute('class','wait');

							}else {

								Doc.Element('fTR_'+i).setAttribute('class','wait');

							}

						}

					}else{

						Thread.Reinf(i);

					}

				}else{

					Doc.Element('ft_'+i).innerHTML = Time.toHour(Thread.List[i][2]).split(' ')[1]; 

				}



			

			}

		}

	},

	

	Stop : function(){

		clearInterval(this.Interval);

	},

	Send : function(farm_id){

		if (crtPage.match(/karte.php/)){

			window.location = crtPage;

		}else {

			Attack.Pre(farm_id);

		}

	},

	Reinf : function(farm_id){

		Thread.List[farm_id][4] = 'def1';

		Thread.List[farm_id][2] = Thread.List[farm_id][1];

		Thread.List[farm_id][0] = true;

	}



};







var Attack = {

	Pre : function(farm_id){

		tX = Doc.Element("fx_"+farm_id).value;

		tY = Doc.Element("fy_"+farm_id).value;

		z = "z=" + Doc.xy2id(tX,tY);



		url = Host+"/build.php?id=39&tt=2&"+z;

		GM_xmlhttpRequest({

			method: 'GET',

			url: url,

			headers: {'Accept': 'application/atom+xml,application/xml,text/xml'},

			onload: function(responseDetails) {

				resp = Doc.Element("resp");

				resp.innerHTML = responseDetails.responseText;

				FormTag = resp.getElementsByTagName('form')[0];

				resp.appendChild(FormTag);

				Doc.Element('content').appendChild(resp);

				Check.Login(farm_id);

			}

		});

	},

	Fill : function(farm_id){

		timestamp = document.getElementsByName("timestamp")[0].value;

		timestamp_sum = document.getElementsByName("timestamp_checksum")[0].value;

		b = document.getElementsByName("b")[0].value;

		c = Doc.Element("fam_"+farm_id).value;

		troo=[];

		for (var j = 0; j < 11 ; j++){

			jj = j+1;

			troo[j] = Doc.Element("f"+farm_id+"_t"+jj).value;

		}

		tX = Doc.Element("fx_"+farm_id).value;

		tY = Doc.Element("fy_"+farm_id).value;

		z = "z=" + Doc.xy2id(tX,tY);

		reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_sum + "&b=" + b + "&c=" + c

			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]

			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]

			 + "&dname=&x=" + tX + "&y=" + tY + "&s1=ok&attacks=&cords=";

		url = Host+"/build.php?id=39&tt=2";

		url += ("&" + z + "&" +Vill.List[Doc.Element("fv_"+farm_id).value][1]);

		GM_xmlhttpRequest({

			method: 'POST',

			url: url,

			headers:{'Content-type':'application/x-www-form-urlencoded'},

			data: encodeURI(reqData),

			onload: function(responseDetails) {

				Attack.Accept(responseDetails.responseText,farm_id);

			}

		});

	},

	Accept : function(a2b_doc,farm_id){

		url = Host+"/build.php?id=39&tt=2";

		url += ("&" + Vill.List[Doc.Element("fv_"+farm_id).value][1]);

		resp = Doc.Element("resp");

		resp.innerHTML = a2b_doc;

		Check.DeletedOrBanned(farm_id);

		FormTag = resp.getElementsByTagName('form')[0].innerHTML;

		resp.innerHTML = FormTag;

		Doc.Element('content').appendChild(resp);

		form_datas = ['timestamp','timestamp_checksum','id','a','c','kid','s1',

									't1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11'];

		reqData = '';

		val = '';

		isOne = 0;

		for (var j = 0 ; j < form_datas.length ; j++){

			val = document.getElementsByName(form_datas[j])[0].value;

			if (isOne == 0 && j > 6  && j < 17 && parseInt(val) > 1){

				isOne = 1;

			}

			reqData += ("&"+form_datas[j] + "=" + val); 

		}

		if (isOne == 0 && parseInt(val) < 1 ){

				fIn = Doc.Element("fn_"+farm_id).value;

				fX = Doc.Element("fx_"+farm_id).value;

				fY = Doc.Element("fy_"+farm_id).value;

				crT = Time.getCurrTime();

				Log.Info("DELAYED Name:"+fIn+" , x = "+fX+" , y = "+fY + " R = "+ "Be Carefull! Only 1 troop will not go." );

				Farms.Edit(farm_id,[[6,crT]]);		

		}else {

			reqData = reqData.substr(1);

	

			GM_xmlhttpRequest({

				method: 'POST',

				url: url,

				headers:{'Content-type':'application/x-www-form-urlencoded'},

				data: encodeURI(reqData),

				onload: function(responseDetails) {

					crT = Time.getCurrTime();

					Farms.Edit(farm_id,[[6,crT]]);

				}

			});

		}

	}

};



var Map = {

	X : 800,

	Y : 800,

	Thread : function(){

		newx = parseInt(Doc.Element("mcx").value);

		newy = parseInt(Doc.Element("mcy").value);

		if ( newx != Map.X || newy != Map.Y ){

			Map.X = newx;

			Map.Y = newy;

			Map.Draw();

		}

	},

	Init : function(){

		setInterval(Map.Draw,2000);

	},

	Draw : function(){

		/*newCenter = "d="+Doc.xy2id(Map.X,Map.Y);

		currCenter = Doc.Element('a_3_3').href.split('?')[1].split('&')[0];

		if( currCenter == newCenter){*/

			var strFarms = decodeURIComponent(GM_getValue(dataIndex,false));

			if (strFarms != 'false' && strFarms.length > 1) {

				baseStr = '';

				aFarms = strFarms.split('$$');

				sFs = [];

				for(var i = 0 ; i < aFarms.length ; i++){

					aFarm = aFarms[i].split('$');

					fX = aFarm[1];

					fY = aFarm[2];

					sFs[i] = 'd=' + Doc.xy2id(fX,fY);

				}

				var maxCount = 7;

				if (Doc.Element('a_8_8')){

					maxCount = 13;

				}



				for(var i = 0 ; i < maxCount ; i++){

					for(var j = 0 ; j < maxCount ; j++){

						aM = Doc.Element('a_'+i+'_'+j);

						cStr = aM.href.split('?')[1].split('&')[0];

						for(var t = 0 ; t < sFs.length ; t++){

							if (cStr  == sFs[t]){

								iM = Doc.Element('i_'+i+'_'+j);

								cM = iM.getAttribute('class');

								nCt = parseInt(cM.split('')[1]);

								if (nCt == 0) nCt ++;

								nC = "tf"+nCt;

								if (cM.split('')[0] == 'b')	iM.setAttribute('class',nC);

								

							}

						}

					}

				}

			}

		/*}else {

			//alert(currCenter + "--" + newCenter);

			Map.X = 800;

		}*/

	},

};







var user_id = Vill.getUserId();

var dataIndex = window.location.hostname.split(".")[0]+"_"+user_id+"_farms";

if (crtPage.match(/dorf3.php/)){

//	Log.Show();

	setInterval(function(){Check.Refresh();},1000);

	GM_setValue(dataIndex+"_last",Time.getCurrTime());

	Vill.Race();

	Vill.Init();

	var view_type = GM_getValue(dataIndex+"_vt",false);

	if ( view_type == false || view_type == 'false'){

		GM_setValue(dataIndex+"_vt",'box');

		ListView = false;

		Farms.List();

	}

	else if (view_type == 'list'){

		Farms.ListSmall();

		ListView = true;

	}else {

		ListView = false;

		Farms.List();

	}

	GM_setValue(dataIndex+"_isNew",'');

}else if (crtPage.match(/position_details.php/)){

	dataURL = crtPage.split("?")[1];

  Vill.Race();

	Vill.Init();

	Farms.List();

	

}else if (crtPage.match(/statistiken.php/)){

	setInterval(function(){Check.Safety()}, 300000);

}