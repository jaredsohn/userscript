// ==UserScript==
// @name           Hoxa HTML Edittor
// @namespace      Hoxa HTML Edittor
// @description    Hoxa HTML Edittor
// @include        http://*.hoxa.hu/*naplo*
// @include        http://hoxa.hu/*naplo*
// @include        http://*.hoxa.hu/*beallitasok*
// @include        http://hoxa.hu/*beallitasok*
// @include        http://*.hoxa.hu/*cikkeditor*
// @include        http://hoxa.hu/*cikkeditor*
// @exclude        http://*.hoxa.hu/*naplo_hozzaszolasok*
// @exclude        http://hoxa.hu/*naplo_hozzaszolasok*
// @exclude        http://*.hoxa.hu/*naploadat*
// @exclude        http://hoxa.hu/*naploadat*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
// @require        http://legyen.weboldala.net/hoxaeditor/nicEdit-latest.js

// ==/UserScript==
$(function() {
	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	function getCookie(c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for(i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if(x==c_name) { return unescape(y); }
		}
	}
	function setCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
	function LoadStyle(MyStyleFile,IsFile) {
		var MyHead = document.getElementsByTagName('head')[0];
		if(IsFile) {
			var MyStyle = document.createElement('link');
				MyStyle.rel = 'stylesheet';
				MyStyle.href = MyStyleFile;
				MyStyle.type = 'text/css';
			MyHead.appendChild(MyStyle);
		} else {
			var MyStyle = document.createElement('style');
				MyStyle.type = 'text/css';
				MyStyle.innerHTML = MyStyleFile;
			MyHead.appendChild(MyStyle);
		}
	}
	
	$('textarea').css('width',500);
	$('textarea').css('height',400);
	$("textarea").each(function() {
		var ThisId = 'textare_'+Math.floor((Math.random()*1000000)+1)
		$(this).attr('id',ThisId);
		var MyBar = {
			uploadURI:('http://legyen.weboldala.net/hoxaeditor/nicUpload.php'),
			buttonList: ['fontFormat','fontFamily','fontSize','subscript','superscript','bgcolor','forecolor','link','unlink','image','upload','hr','xhtml','removeformat','bold','italic','underline','strikethrough','left','center','right','justify','ol','ul','indent','outdent'],
			iconsPath:('data:image/gif;base64,R0lGODlh5gESAPe1AAAAABERESIiIjMzMyJ3ADNmEXdVIkRmIlV3M0RERFVVVXd3RGZ3VWZmZnd3d90iIt0zM+4zM6pEAKpVEbtVIplmIqp3M91mAO53EcxmIu4zRIhmd4h3d+5ERO5VRP9EVe5VVf9VVe5VZu5mZv9md+53d/93d0SIEUSIIlWZIlWZM2aZM3eqM2aIRHeZVXeqRHeqVXe7VXeqZruIM+6ZM8yqM+7MM4iIRKqIRIiqRJmqRIi7VbuqVZmId4i7Zoiqd4i7d8yZRMyIVd2IVcyZVe6IRN27Ve6qVd2IZt2ZZsyZd8yqZsyqd92qd5nMd93MVe7dVe7MZu7MdxEzqhFEuxFVuyJVqjNmqjNmu1V3qkRmu1V3uyJmzDN3zER3zFWIiESZmWaZmUSIu1WIu2aIu3eZu3eqqkSIzFWIzESI3VWI3VWZ3WaIzGaZzHeZzGaZ3XeZ3XeqzGaq3Xeq3USq7lW77oiIiJmZmbu7iKqqmYiqqoiqu6qqqru7qru7u+6IiO6ZiMyqiN2qiMy7iN27iN27me67iMy7qu6qqu67u5nMiKrMiLvMqrvMu8zdqu7Mqu7dqu7Mu+7uu4iZzIiZ3YiqzJmqzIiq3Zmq3Yi73Zm73aq73Yi77pm77qq77rvM3ZnM7ojM/6rM7rvM7rvd7szMzMzdzN3dzN3d3e7MzO7dzO7d3e7u3czM7szd7t3d7t3u7u7u7v/u7u7u/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALUALAAAAADmARIAAAj+AGsJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePCTfFQSOGJMmSe2IxVFVIiRJCqkDKnEmzZq1YmeZkyjnnVUZNk8ZowUK0KFEtYz7ZXCrxkyVLlaJKlWpJKVOGKgkCFWrUKFKrE51OHRsV7MQ4sNKqTftqZNaDqgQlEfSokCAhQiJd3csXIaxONkWBIkWqp8ZJrlzFWhwr7WJYrj6x2dS3ckFLsBhrZgzLUl9ZqwyuQpSKIGLFnDM3jjyZIubNmtNWsogGFuHbpETFEjWS1ZJBBR8JIRQpig0bkR4REhJor4PnDaIrSJBggAABlkF2AlwzEyidc97+XtziCs7iMY4Xv4r8SUv2haM0jYro5zmfgXYU3CdoKdZTPU4E6EQYYVTSWUaxXPJKLHPU4soclyAkCwkkhDbQKiCM8IeFtZBnXizoqRbLep+0R1ElCVZihiIsAvGFG27AMttAc9Ro4xxwvPGGGmic4UUXXQgkhm245RYLKa7sgQckMwzEUhNH0ECDDcY10URdFsREUCl2RMdHl3aIR1B0ZCpgJnXVYUSmdGeiuRAfDZjpAEJrxtlmmgXVaeZ01A1gEHd+rLlnAgbpeaefBoEiyhyk5FSYHDq+AceYgh5KkBajfBjiY4nBMcoVB8Vyhx983DEnQnakagcqDkQnESz+l1yiSUGaiDJroGWeidAdDRAUS68FoYgJgE7sYKweBR6Y0aKuKFijhCSYYMIIFmI4ggkgIJIVppqmB1l5n56Y4IqKGLuDizHOKNAcorQriifwbtdJrLFyIeSRruAmyiuwrDIIJDUsMdAjgkRCQ5RH2HCEDizk0JISBsFph0B2JACsmtL1eV0AAQDgUZx+VCbvTK94R0rJ7M6xhhyQRjgRFuWlRYaIiZW3CagGObAfH4QiVEp0d9Ryx6oSXQKLJg0SFN98EXVZ0KkECQuguTHsQKCMBsXihx1DlxIL13b4ISZBizKYdKjX/jHtKtZi28FbMMMhM82d3izuJStSvcP+i1jTKIq889KLo45zVCHkt4ndJsom/z6xRFaqCAGIB0McbGUTLOzAQhOEWBCxAhMLjedBfuzJZ3X7XcRdLZVOtxAqZirE5qHWFWrnnRxx13rPBLELiiaaFPbKG2usIenYtQzaZ+0DYZHpK9Aztl6nmuBMUOmpQ31QKWbCadGzGTk9pkFSFxvD+TGEoQcRTATxyECirlrK1neUMj/X4mkN9pxfDy121iOI1ghAkCG3icd5cIDegtRTMzhU7255Q58M+KauWsxhFqKYBaxENIo5dIoKh6tZ4khRisbhgBUDIQQhSlACD9DlEY9oAg9ywIMkEKICn+PfdLRnET5ZRwD+HEPUQThhGNoJcVcJCF1fgAeLh7wCQgIxoq828Z1NbEJWDiSeKNYwKYogcAxkIAMbxkiGMZixDQ8sCPdAV4pahEwhd6AO8gqiqlW1qleaeIMrNJKfPJEvFsMyFvpc4AJDPIIVjwjCQOpTCgdYzA6tSiIfHPDGmwwNFfcTmv3oN7ZYiOBa0iIBCN5WkC+GcYxsKOMZ00gQVLjSfvY7CIo0YQYg7ECCFCSIeUaxmEswKBZveIUnFvMGENZiSCJEUgkh8YQZZIEgSihEEzxQAuFYQAiFAIM2kVAIHBaEDwpoAK8slhDTLe+H2PkeJy6RwIlMp5IHUV51BoBOg8iTnvX+LAisHPLEWL2hIU8MnkBeAQc4FI8UmzBeQeQ5z+ukUyAILKhEJ9qGNlTCegRxJHUUAM9QUUeJCfmZOIW2qg7GYhQ+GcgoLiEKifSRIAogHywwgYkwDNIFUniEIR9BBPw4wGsJ8MP8eBaLRiqRkRVrQBujI0lKhgoEJghBCEiggbFFdKIUtShGBeLKrsZSpprYgxlkIIMYTHAFKuibQN6QwU7MgpixaAO/GtMGYyKzZqTowxKYOYNSiIEg2KzLlTxngWxqcwg3jBg5a+GAASRgjhABnLyAl4lYgY9GwWQdQxWCCupkZ59u9CE9r1OQ4SXtdmjinQVzEiFSOFANXKz+RULVUJGrYhUOFdXqIp/DWwUMoGMACC5IByLO64QMVrLaXveARbw10JYgsmpQ6c5J2oM4cqF/pKklbsDdG0hBElCQAhGI8BY4NTK11PlpA1IHyZ8x5iaxQIVSHTBcgWCIBCH4wAg6UJpSZuq2Bc3tRbNmP0z+D6xhXYCCF1AGFcQgBXsgiBowuBjztCEWaHiFKFwBCzRMIYSJKUUe8jCDGtSgD7D4awqFoARBFEI4FcBmD8DQA0EowZsEiSOwYnGdoB2EZ/NEp48J0gl3tcsT2wGeJjLxz94NJMgODYBCKsZDe6IJn1GW8kKvPNqHFsRGEUkalDe2kIS+gQMTkMD+BDaAvDEDUcsQ/QSAcZvbSVghawPhmWMR0r9a2OE6pTAa0pD42IV4Yg6UiUgcK1kfmRLSBTcIQhC+C4XwBoFDtfiZHfjwpQbQ9wctaAECfpDn+bqpFOn9WeouBIJPjuDVIIhAf5snZwDntg12DtUm52igF7xgBQtYAVpV8AJFvOAEbznDL4GJ4VicwRVe4OUrPnzM6W1iD304RR9wkAdSxAILBVEFIZRggWgWohBJGMIQmiAICxzCIDoeSAAEUF+JdIKylsVRjiK1kep09D00IcUa0sCBDNBFEAb3opxhoxk25PqbQ65FAI5IKTugGk1tvGxBYvFRkHRWAahwYwL+Qh4sWDTi5I1gAqUtrYeNizQ6QmUADBbhCB+ggNSZbsCmO83YnXepjQTBUIZAoIEIdEAEHYDArGuBhYUzfDEOv3OoDixLk5+cEStgUYuAsAICZMULl9BRG9DQIx/9CEhnoPaQ6BCHOOxhD2LIAh3m/m2EqKKwSFA3YptQ7oPcYc9CAyLJC7I8h765Yxih7sY45jGfMU8hhc8y4gnf0MUzviD8fojiD994hBAPDgYvAgYwUIQJECTylu880xdurtbvIBZRj9gA3kLviORxjwcprgD+rRFWyQnoJUc5HpgAXkujwjMMQcAiFkELH/igAAIp6ppCdsfoeC3oBBxgVWP+AYEOjPIBs266eVxvLtg/XCIGQnkjVKAIsrofCCoggEC6cAl9i53sZT9D2iH6ijpk4f//FwehEAp1UHcIgRfopkJCUAHNETF28hwWM3gA1xB3YDrvkVkBdwlpkAabIAGPwBgYIAFe5AnmoX7qB3tlIHUEwQeOtT8RYVIotXFcw1iAFhJvMCsf8RqxMHx4YASWtgrKshAHwHy0QAuLAH0GUVCxoAYthRCpQEBElxWx8ABG9wCJ0DwkGAsmiHIoqIIRoYOLkQJaBwQywHUEYAoCwQVVUAVU0IZtOAVwGIdwyH91UId2eIcGCBcVYCULmCUacQeSJ1wZ0WWctxGEyDH+jBdcBnGIl4cQwxN4nKeIBcGIk5cQG7iBakABojd6FyCCBmF5wKV6WJCF5GcssUAGKegRzfVcFXdx1AF8mBd2kIiIwaV6BJFltWgQTvEUFsAKQWABv1gJT2EWCXEAPgADtAADz5eEauAKlNAKaoAJCZEKHRAB+fMAVkgQozh+pXiKqRgWUCEVKXACJ0AAKmCGaEgRQ6JA0LMWi6FiCBEIFVBuWjKB9igTOuIyTIFwnCgBgkARWmBFT7cYZVAGW3WPtZBHODgTBmAIhmABFiCBDfEDKOADi2BzODcQlKAGrVALahAL5QFZqdBJV3gpAjmQBXmQGEEAXZeOFLEJaNBYFV0hBomGkDZ5kzIhCGk2Af9IEZPQBleABVcwlFdgBUZ5lFewBTi5FwZgAEFABJj2ED9QAAVwABlZEz8ZlERZlEdplEnpEQRwhks5lmRZlmZ5lmiZlg4REAA7')
		};
		new nicEditor(MyBar).panelInstance(ThisId);
		var oldal = getUrlVars()["p1"];
		if(oldal=='naplo') {
			setCookie("BackgroundColor",$(".forum").css("background-color"),365);
			setCookie("FontFamily",$(".forum").css("font-family"),365);
			setCookie("FontSize",$(".forum").css("font-size"),365);
			setCookie("Color",$(".forum").css("color"),365);
			$(".nicEdit-main").addClass("forum");
		} else if(oldal=='naplo_hszmodositas') {
			var MyStyle = '.xForum { background-color: '+getCookie('BackgroundColor')+'; font-family: '+getCookie('FontFamily')+'; font-size: '+getCookie('FontSize')+'; Color: '+getCookie('color')+'; }';
			LoadStyle(MyStyle,false);
			$(".nicEdit-main").addClass("xForum");
		}
	});
	
});