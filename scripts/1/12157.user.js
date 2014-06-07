// ==UserScript==
// @name		deviantART Quick Notes
// @namespace	http://solitude12.deviantart.com/
// @description	Creates a popup box, when clicked on "Send A Note" on any userpage, that allows you to send a note! It's quick, easy, and efficient!
// @include	http://*.deviantart.com/
// @include	http://*.deviantart.com/?*
// ==/UserScript==

/*
Script (c) Solitude12 - <http://solitude12.deviantart.com>

PLEASE dont COPY :|
*/

/* Throbber Icon...from someone >.> *doesnt know D:* */
var THROBBER_SRC = "data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq+vrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf///wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh+QQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd/AnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh+QQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2/AeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD+BCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY+gbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi/Zyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE/gEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH+IGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa+AepgPNB8qaJGg6RQpB4P1GV+IWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs=";

/* Following Icons (c) Famfamfam <http://www.famfamfam.com/lab/icons/silk/> under Creative Commons Licence <http://creativecommons.org/licenses/by/3.0/> */
var FRIENDSLIST_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIbSURBVDjLjVPPaxNREJ79Qena1EO6u/GQ9CiFouCp5FQQET0KQvBQbA/tqf+BCEXoyauCl7KFHkoOvYimUpToRTyISVtsliImpCwkLUGqxvzY3bfOvO2+bOgljx32vdn5Zr4336wUBAGUy+V7f96/3PVaDnjNKty17DkYbZ1KpVLppu/7n5nbnVDAh7NXK3Bn4/tIaFVV59R8Pm9ns9nV8aOClZhCbwDguu5QIGMMiGn8rGlamCSXy80ggxfMXAAFPPj9qXipkizLHBQtSZJEQsFg7KBgTZroZGEArWc7TSAchXIA4w+sPdQH1xAMDGQgeXD+4aNIQODZjHaRILT9Wpt/Q8wwA3X/rXVVD3glkQD3h7V/vGrA8Bvz0Rf2AK/F7zRQoY8qIAPn+TLczx/xRPF709nzPOFHayeTyfkBg29vrEkj5BkFPdlu4NtHugH4wYUSqNBaziQGE5hXifXgMVfh115RdHr90TUOIkPNBZtutwvVahUURZFlYuA4zmqzsAl/v24BFhQSRXJFDYvAlUoFUqkU+VmMwSLIyKC1W4ypwISRr9PpgG3bkMlkQNf1YRXkL6+thIlN8y9PIDGgygROp9NgGMZgqOIqEIPa0yV4sPeDgwlIne/1etBoNHhV0zTjExn+Cxh041bl3c8rSY0PCzWIgGQRCxpnSlKv1/m+3++HSaKGLV2fmp9OjN122u7JxnHrYNTf+T+76nzVPsi2lQAAAABJRU5ErkJggg%3D%3D";
var BOLD_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg%3D%3D";
var UNDERLINE_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY/jPgB8yEKmgPKH8ffn/0n4IL3F99P+QAjQTyveX/IexIwWCz2NYUbw/7z/CYK/9GApy92cgKXDEVJC+PxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9/7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL+fI39ivul+0UMSA/q/wza/1X+y/0X/y/0n+c/+3/m/6SbgAsCAM8i/W7eee6fAAAAAElFTkSuQmCC";
var ITALIC_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg%3D%3D";
var STRIKETHROUGH_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII%3D";
var SUB_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE4SURBVDjLY/j//z8DJZhh8BhQXl5+oLi4+EBubu6BtLS0A/Hx8Qrh4eEH/Pz8Dri6uh4gaABQcwBQ84eUlJT/QM0TQGJAzQ1AzQtsbGwUiPIC0GYHoOb/kZGR/4GaC/DZjDMMgM6eEBgY+N/Nze0/0GYBkg0A2iwA0uzi4vLfyMhoAskGgJwNtLnA2tr6v4GBwX8FBQUHkHjIlAcKpaueX2jZ/PKDb9fdBgwDQDZDA6wAxNfU1JwAdMF/CQmJD4KCggbJ8x5vAGpU8Gq71dCw/vl/DAOgNh8AORuo2QBo8wGg5gNAzQe4uLgOsLCwGIDUJc56eCFl3qMHZCUk+4prDWGT7l0wz7lkQLIB1kVXApyqry0wybggYJh8wUEv/qwCSQZ4t948kD734f/kWQ/+h028+2HwZCYAjxChYziQ1VwAAAAASUVORK5CYII%3D";
var SUP_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVDjLY/j//z8DJZhh6BgQMuWBQumq5xdaNr/84Nt1t4FkA5LnPd4A1Kjg1XaroWH98/9keyFx1sMLKfMePcAwoLy8/EBxcfGB3NzcA2lpaQfi4+MVwsPDD/j5+R1wdXU9AFJjX3GtIWzSvQvmOZcMMAwAag4Aav6QkpLyH6h5AkgMqLkBqHmBjY2NgnXRlQCn6msLTDIuCBgmX3DQiz+rgOEFoM0OQM3/IyMj/wM1F8BsBmHv1psH0uc+/J8868H/sIl3P+AMA6CzJwQGBv53c3P7D7RZgORoBNosANLs4uLy38jIaALJBoCcDbS5wNra+r+BgcF/BQUFB6IMANkMDbACEF9TU3MC0AX/JSQkPggKChoQNABq8wGQs4GaDYA2HwBqPgDUfICLi+sACwuLweDMTAA2jKFj5WHetwAAAABJRU5ErkJggg%3D%3D";
var CODE_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALtSURBVBgZTcFLaFxVAIDh/5577jwzj0wSUmqMtKIiBltbbJ1FUCxVoQu3FrHGVRU3BVcKrkTcKOhCUOtOAyJ23WIQtFawpoooZWKJpnbsNJN5PzP3PO5xArPo93nOOfasXCgfAz48mE8UhzpiqCN0FLFrog7QA+qABVpAA/gC+FYyERlz/NC+qeIbT85xt4GKckMV5Voju6A09ELLzXqfi38PTgLnJBORMfPZmMeectsSeB7SA19CPBAsxgW+EAQ+PLaQZH8uXTj/S+UDwYTVOitxmAh6yqOjoR1CZwSdETR2Yadv2fPm6i2KB9IszQZzkgkVmvnLZcuP21VeO1rgs+tdAu1YOZxlKiHw8fA9iADPdvn5nxa/3epUBGOH39sqjETu2UJG4oUwDB2RcmRSHuevdtjpWgZhxEBH4KDaDflobbNrlVoRh97demHpgfTth+5J5ZpNw5kjWQxw6mCa7aYlk4bPr7X54XqfkfGIHNjAYpQ6cOH1x9fEw/cnP13M+Ik7bc3ZYxniMR9PQCElObmYptox7E97XK0MscbhHJgwxKrQMiZ+v9Y9u3knHBUCn08ut6m2DQJHe6C5WOqQl4KbVcXR2QSxwENbS38wNEapLmNi4/0Hv/r3zxvHN0p1YnGP1e/r4ODr9TbZlKBTU7xSnKG4lCUZQKMfYkJVvfT2c44xyVjKr6lpEUI3g3UOPIE1lu6O5aUTcyRjPjhISUGttYtVYYUJuXxudRZ4p/jIvZx+eoHvSopmz/Ly8jyJwBFIkD7EfMimYLM8xChVZUJapU4Ap34tbdHalfRDh7aOUHsoE2FsROQchVyOV5/Zx3ZjiFWqxoS0Wh95/qlHk2+9+AR3sw60dSgDOPj4UoVUAL3+EKt1gwlptd7arnf4cq1EfipJPpsgn46TS8fJpGLEY4K4FJxenicuodbsYbX+jwkZGfPNlfWNhSvrG/cBM8AMMA1MA7lELAgSiYBsOkk+m+KPv8o3gJ+Y+B9yFXCQeyJWrQAAAABJRU5ErkJggg%3D%3D";
var THUMB_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJVSURBVDjLpZNLSJRhFIafGf/QTJ008zKKIWTgQkdByMxW5SJQgmjVToKCcNNlIQTRosCNu3IhgbsWCSG6ELwUlJi1KS3FCymUDCWh43VG5zvntPgnaxMIfXA23+J9H973nICZ8T/PG3l0+p8KqoaqIWo4UUQUJ4pzihP/zwMoqalERcAMMwMLYoAJmBmmijpFRVA1UDCCTL6f9AVUHLHlH8TXNg7knB3KoTBc9IfAxIivbTB84R1m+O721wD3w7fIOlwGKD0PujleUICIEgTQVAqjO12M7jxhNzCHKLjUJAXerkbQ+BSmezhRLJVB0Gf2sWuPLrEb6OXl9g2SGsMJJB04B1O7TQyunGFj6wsiiiqIWoogJeDEUZcdQUR4nbhEknlfRGBuq4S+2HVuLz7dJ1A1PFVDnfiBaZLpjSmaS/KJbifYTmtmdbOGXL3Ct5WzbCWKUJdGtZrfyt8CTpRI/k+qjhUTzjhJdUhRq+Zr9jzKM8p2n5OIecR3Enw8dYJEfB0P8EQNdYaIUphejpribA81xVCKM8qIzqyTuRXkXGMdpXkVvJruY+LzG7xMxXOiqBgZR7JIdA5g4ov5nfs7sFhRzuWWFiQoRIqbGJnppb6qgd6FfjwRBQsQys0nJycPVb/Syqt32V4eBJShF8McCmRxsfIaAHfOdzPwqQsJ9PsEi7Oz+7v923myvdUnUCMWckxHx5mMjtHe1EPHUCsZaemkGQQOco31beGHpeWhew3VjVQU1bLw/QPjU2MsL613Bg56zvVt4Q7gJpANbAJdE4+j7b8A7WGuGfrlZ+8AAAAASUVORK5CYII%3D";
var LINK_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHMSURBVDjL3VK9S0JxFBWChvoHinap4UG6RIsihYMfiTboUFGhPVIbxAJFG5TEKM1U1CWENjEUigiyHBRnicrCwaIlXPqggldRnd6VkNqMti4cfvede875Xd57AgCCv0DwjwIkEkmn2Wxe8Pl8t8lkEm63+8pqtQ7w6OL7GnE0Iw1pfwSIxeJ2lUq1Eg6HUa/XUavVUCgU4PF4LlwuV7FarT4TVyqVQBrSkqcZIBKJRux2+32lUrk1GAx7SqXyzWQyIRKJwOl0gnriaJZKpa5IS57vG6x4vV4uGo2yGo2mQyqVPubzeZTLZRSLRWQyGRBHM9KQljzNAIZhZlmWvYvH4/M6nW5fJpO9yuVyaLXaBqgnjmakIS15mgF9fKnV6vNgMHiXTqdvstksEokEbDYbHA5How9t+mCLjX3MrGlg8Mreh+eYcDNAKBS28Sv2KxSKS6PR+GSxWDgeL3q9foLH0OzixItnawq7pzEcXecQOjBDH2IwYOkOtPStx/3D3PbJOrbPIqAKHJoQOmQpgGspQOUSYe90A99r5zhGAa39bYPWHm41Nw1/brJh9u9P/m4DXrg0GuhFMGds3EwnPbf8Dr5Clnk80Npf5zLxn1E7ljyteCJyAAAAAElFTkSuQmCC";
var CAKE_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI2SURBVDjLhVPfa1JRHPepnnrrT/Al6KG/YG9RD0EPFXsJCkaMHjMKIamVNQhqQW3LFqtZq9Yg1KXVcBhdZ9ZDgyblT9y8Z1fdvXo3Ua9D1E/ne6c3bUIHPtxzPr++5164JgCmDsJ+0/FI2BTu5v6n9xgSEZNWLh0BN9r6FfTTewyx1f3QqsOIre5r9ZvY0aM/d/U9Be+WHiO4PIg5n70mCEIizgM0MRQ4W+Bn93PPOJY+n8H4G6vUU8BFM8fYtL8I17ctTH7IQ9M0GBP5s1AowP5WguOjjIsTSYUyRsFXweNkjOHJooL5oIoJrwJazve7E2c8o/r52ksJDxc2YZlKgzJGQVAINPjC6y8qN8jwr5T0wJ35LByfZNx4JelnhyuPq9MMroCMZWFxxygICb5WvV7Hv+v6rIRH3k1YXzCDazabkGUZye+2hlHAVizNRDwKeo3Oohs53DlYnzEsCEWdU1UV8dhv5NM+KOFDfwu2QgcatcxtpJJR/WPlcjkwcQ0bG0wHFSuKgvW1FEqZpyAvZYyC7MjhVmFmGJXUXShMQEmcRU0cNaCJ97HN5lAV70FL2UFeyhgFRe/BhvzgHCTLKSiTQ9j2XkLlh003E2hPHGnkIS9lul9hp5a5hVLgCpSpC8jaBiEOncD66aM6aE8caeQhL2W6C5zlXye5cLPn6n3BPeSlTHeBmWOMo1aOHEMlfh5a+jI3j+igPXGkkaftNe/5Fzg5wGHjcHMkOKptJNocaQPdmT/bXw90YXDpsgAAAABJRU5ErkJggg%3D%3D";

if (document.getElementById("exitlinker")){
	/*
	Friends List, and Text Formatting Icons (c) Famfamfam <http://www.famfamfam.com/lab/icons/silk/> under Creative Commons Licence <http://creativecommons.org/licenses/by/3.0/>

	Script (c) Solitude12 - <http://solitude12.deviantart.com>

	PLEASE dont COPY :|
	*/
	const deviantNAME = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();
	document.getElementById('deviant-commands').innerHTML = document.getElementById('deviant-commands').innerHTML.replace(/<a href=\"http:\/\/my.deviantart.com\/notes\/(.*)\">Send a note<\/a>/, '<a style="cursor:pointer;" id="notesbuttontoclickplz">Send a note</a>');
	var iscreated=false;
	function removeME(id){
		document.getElementsByTagName('body')[0].removeChild(document.getElementById(id));iscreated=false;
	}
	
	function autochange(){
		var stringy = document.getElementById('notesmessage').value;
		var signa = document.getElementById('notessignature').value;
		stringy=stringy.replace(/\n/g, '<br/>');
		if (signa) signa='<br />--<br /><sup>'+signa+'</sup>'; else signa='';
		document.getElementById('daquicknotesboxpreview').innerHTML = '<strong>Preview:</strong><br/>'+stringy+signa;
	}
	function createbox(){
		iscreated=true;
		var box = document.createElement('div');
		box.setAttribute("id","daquicknotesbox");
		box.setAttribute("style", "background-color: #FFFFFF; opacity: 0.95; border:1px solid #374341; position: absolute; z-index:100; left:auto;  width: 350px; padding: 20px; solid; font-size: 12px; color: #333333;");
		box.style.top = (window.innerHeight/2) - (458/2) + "px";
		box.style.left = (window.innerWidth/2) - (392/2) + "px";
		document.getElementsByTagName('body')[0].appendChild(box);

		box.innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.1</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><table style="width:100%;"><tr><td style="width:10%;">To:</td><td><input type="text" id="notesto" value="'+deviantNAME+'" style="padding:2px;width:90%;font-family:Verdana; border:1px solid #7F9DB9;"/> <a style="cursor:pointer;" floater="friends" style="vertical-align: middle;" id="notesfriends" onfloaterselection="document.getElementById(\'notesto\').value += \', \'+this.getAttribute(\'floaterresult\'); document.getElementById(\'notesto\').focus();"><img title="Add people from your friends list..." src="'+FRIENDSLIST_SRC+'" style="cursor:pointer; margin-bottom:-3px !important;" /></a></td></tr><tr><td style="width:10%;">Subject:</td><td><input type="text" id="notessubject" style="padding:2px;width:100%; font-family:Verdana; border:1px solid #7F9DB9;"/></td></tr><tr><td></td><td><img src="'+BOLD_SRC+'" id="textbold" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Bold"/> <img src="'+ITALIC_SRC+'" id="textitalics" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Italics"/> <img src="'+UNDERLINE_SRC+'" id="textunderline" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Underline"/> <img src="'+STRIKETHROUGH_SRC+'" id="textstrikethrough" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Strikethrough"/> <img src="'+SUP_SRC+'" id="textsuperscript" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Superscript"/> <img src="'+SUB_SRC+'" id="textsubscript" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Subscript"/> <img src="'+CODE_SRC+'" id="textcode" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="Code"/> <img src="'+LINK_SRC+'" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" id="linkadder" title="Link"/> <img src="'+THUMB_SRC+'" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" id="thumbbutton" title="Thumb"/> <img src="http://download.botdom.com/oyk5m/cake.png" id="caketext" style="padding:2px; border:1px solid #7F9DB7; margin-top:1px; margin-right:1px; cursor:pointer;" oncontextmenu="return false;" title="'+GM_getValue('QuickNotesCake', 'Happy Birthday!')+'"/></td></tr><tr><td style="width:10%;">Message:</td><td><div style="display: none; padding:2px; overflow:auto; height:200px; width:100%; border:1px #628CAE solid; font-family:Verdana;font-family:Verdana;" id="daquicknotesboxpreview"></div><textarea id="notesmessage" style="padding:2px; margin-top:0px; display:block; font-family:Verdana; font-size:12px; border:1px solid #7F9DB9; width:100%; height:200px;"></textarea></td></tr><tr><td style="width:10%;">Signature:</td><td><input type="text" id="notessignature" value="'+GM_getValue('quicknotessignature', '')+'" style="padding:2px;width:100%; font-family:Verdana; border:1px solid #7F9DB9;"/></td></tr><tr><td></td><td align=right><sup><a href="http://comments.deviantart.com/emoticons" onclick="return popup(\'http://comments.deviantart.com/emoticons\', \'emoticons\', 620, 600);">Emoticons</a></sup></td></tr></table><div align="center"><input type="hidden" id="editnote" value="Edit"/><input type="submit" id="previewnote" value="Preview"/> <input type="submit" id="sendnote" value="Send!"/></div><br/><br/>';
		
		document.getElementById('notessubject').focus();

		function addTag(tag){
		sstart = document.getElementById('notesmessage').selectionStart;
		ssend = document.getElementById('notesmessage').selectionEnd;
		selection = document.getElementById('notesmessage').value.substring(sstart, ssend);
		selectionnew = "<"+tag+">"+selection+"</"+tag+">";
		document.getElementById('notesmessage').value=document.getElementById('notesmessage').value.substring(0, sstart)+selectionnew+document.getElementById('notesmessage').value.substring(ssend);
		document.getElementById('notesmessage').setSelectionRange(sstart+tag.length+2, ssend+tag.length+2);
		document.getElementById('notesmessage').focus();
		}

		function addTextTagTypeThing(tag){
		sstart = document.getElementById('notesmessage').selectionStart;
		ssend = document.getElementById('notesmessage').selectionEnd;
		selection = document.getElementById('notesmessage').value.substring(sstart, ssend);
		selectionnew = tag;
		document.getElementById('notesmessage').value=document.getElementById('notesmessage').value.substring(0, sstart)+selectionnew+document.getElementById('notesmessage').value.substring(ssend);
		document.getElementById('notesmessage').setSelectionRange(sstart+selectionnew.length, sstart+selectionnew.length);
		document.getElementById('notesmessage').focus();
		}

		function addThumb(){
		var prompter = prompt("Please enter the deviation ID, or link:");
		if (!prompter) return;
		if (prompter.match(/http:\/\/(.*).deviantart.com\/art\/(.*)/)){
			prompter = prompter.match(/http:\/\/(.*).deviantart.com\/art\/(.*)/)[0];
			prompter = prompter.split("-");
			prompter=prompter[prompter.length-1];
			prompter=":thumb"+prompter+":";			
		} else {
			if (prompter.match(/http:\/\/(.*).deviantart.com\/deviation\/(.*)/)){
				prompter=prompter.match(/http:\/\/deviantart.com\/deviation\/(.*)/)[2];
				prompter=":thumb"+prompter+":";		
			} else {
				if (prompter==parseInt(prompter) && prompter.length<=8){
					prompter=":thumb"+prompter+":";
				} else {
					alert('Invalid Link/ID!');
					return;
				}
			}
		}
		sstart = document.getElementById('notesmessage').selectionStart;
		ssend = document.getElementById('notesmessage').selectionEnd;
		selection = document.getElementById('notesmessage').value.substring(sstart, ssend);
		selectionnew = prompter;
		document.getElementById('notesmessage').value=document.getElementById('notesmessage').value.substring(0, sstart)+selectionnew+document.getElementById('notesmessage').value.substring(ssend);
				document.getElementById('notesmessage').setSelectionRange(sstart+selectionnew.length, sstart+selectionnew.length);
		document.getElementById('notesmessage').focus();
		}

		function addLink(){
			sstart = document.getElementById('notesmessage').selectionStart;
			ssend = document.getElementById('notesmessage').selectionEnd;
			selection = document.getElementById('notesmessage').value.substring(sstart, ssend);
			
		var link = prompt('Please enter the link:');
			if (!link) return;
			if (!selection || selection==''){
				var title = prompt('Please enter the link\'s name:');
			}
			if (!title) var title=selection;
			selectionnew = '<a href="'+link+'">'+title+'</a>';
			document.getElementById('notesmessage').value=document.getElementById('notesmessage').value.substring(0, sstart)+selectionnew+document.getElementById('notesmessage').value.substring(ssend);
					document.getElementById('notesmessage').setSelectionRange(sstart+selectionnew.length, sstart+selectionnew.length);
			document.getElementById('notesmessage').focus();
	
		}

		document.getElementById('textbold').addEventListener('click', function(e){
			addTag("b");
		}, false);

		document.getElementById('textunderline').addEventListener('click', function(e){
			addTag("u");
		}, false);

		document.getElementById('textitalics').addEventListener('click', function(e){
			addTag("i");
		}, false);

		document.getElementById('textstrikethrough').addEventListener('click', function(e){
			addTag("s");
		}, false);

		document.getElementById('textsuperscript').addEventListener('click', function(e){
			addTag("sup");
		}, false);

		document.getElementById('textsubscript').addEventListener('click', function(e){
			addTag("sub");
		}, false);

		document.getElementById('textcode').addEventListener('click', function(e){
			addTag("code");
		}, false);

		document.getElementById('thumbbutton').addEventListener('click', function(e){
			addThumb();
		}, false);

		document.getElementById('linkadder').addEventListener('click', function(e){
			addLink();
		}, false);

		document.getElementById('caketext').addEventListener('mousedown', function(e){
			if (e.which==2||e.which==3){
			var newcake = prompt('What do you want the special cake to paste?');
			if (!newcake) return; else {
				GM_setValue('QuickNotesCake', newcake);
				addTextTagTypeThing(GM_getValue('QuickNotesCake', 'Happy Birthday!'));
				document.getElementById('notesmessage').focus();
			}
			}else{
			addTextTagTypeThing(GM_getValue('QuickNotesCake', 'Happy Birthday!'));
			document.getElementById('notesmessage').focus();
			}			
		}, false);


		document.getElementById('daquicknotesboxclose').addEventListener('click', function(e){
			removeME('daquicknotesbox');
			iscreated=false;
		}, false);

		document.getElementById('notessignature').addEventListener('change', function(e){
			autochange();
		}, false);

		document.getElementById('notessignature').addEventListener('change', function(e){
			GM_setValue('quicknotessignature', document.getElementById('notessignature').value);
		}, false);

		document.getElementById('previewnote').addEventListener('click', function(e){
			if (document.getElementById('notesmessage').value!=''){
			autochange();
			document.getElementById('notesmessage').style.display="none";
			document.getElementById('daquicknotesboxpreview').style.display="block";
			document.getElementById('previewnote').setAttribute('type', 'hidden');
			document.getElementById('editnote').setAttribute('type', 'submit');
			}
		}, false);

		document.getElementById('editnote').addEventListener('click', function(e){
			document.getElementById('notesmessage').style.display="block";
			document.getElementById('daquicknotesboxpreview').style.display="none";
			document.getElementById('previewnote').setAttribute('type', 'submit');
			document.getElementById('editnote').setAttribute('type', 'hidden');
		}, false);

		document.getElementById('sendnote').addEventListener('click', function(e){
			var subject = document.getElementById('notessubject').value;
			var message = document.getElementById('notesmessage').value;
			var sendto = document.getElementById('notesto').value;
			var signa = document.getElementById('notessignature').value;
			if (signa) signa='<br />--<br /><sup>'+signa+'</sup>'; else signa='';
			if (!subject || !message || !sendto) {alert('You forgot something!'); return;}
			document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.1</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><img src="'+THROBBER_SRC+'"/><br/><br/><b>Sending Note...</b><br/><br/><br/><br/><br/></div>';
			message += signa+"<br />----<br /><sup>Sent using <b><a href=\"http://www.deviantart.com/deviation/63032228/\">deviantART Quick Notes</b></a> v2.1 by :devSolitude12:</sup>";
			var daDATA = encodeURI('ref=' + window.location.href + '&recipients=' + sendto + '&subject=' + subject + '&body=' + message);
			GM_xmlhttpRequest({
				method:"POST",
				url:"http://my.deviantart.com/notes/send",
				headers:{"Content-type":"application/x-www-form-urlencoded"},
				data: daDATA, 
				onload: function (responseDetails) { 
					if (responseDetails.statusText == 'OK'){
						document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.1</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Message Sent!</b><br/><br/><br><br></div>';
						setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);
					} else {
						document.getElementById('daquicknotesbox').innerHTML = '<img id="daquicknotesboxclose" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.1</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Oops! There was an error!</b><br><br></div>';
						setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);	
					} 
				},
				onerror: function(responseDetails){			
					document.getElementById('daquicknotesbox').innerHTML = '<img id="close" src="http://s.deviantart.com/styles/minimal/minish/close-dev.gif" title="Close" style="position: absolute; right: 10px; top: 10px; cursor: pointer;"/><span style="position: absolute; left: 10px; bottom: 10px; cursor: pointer; font-size:10px; font-weight:bold;"><a target="_blank" style="outline:none;" href="http://www.deviantart.com/deviation/63032228/">deviantART Quick Notes</a> v2.1</span><div align="center" style="color:#333333;font-family:Trebuchet MS; font-size:22px;margin-bottom:10px; font-weight:bold; text-align:center;">Quick Note</div><div align="center"><br><br><b>Oops! There was an error!</b><br><br></div>';
					setTimeout("document.getElementsByTagName('body')[0].removeChild(document.getElementById('daquicknotesbox'))", 1000);
				}   
			});
			iscreated=false;
		}, false);

	}
	document.getElementById('notesbuttontoclickplz').addEventListener('click', function(e){
		if (!iscreated)
		createbox();
	}, false);
}