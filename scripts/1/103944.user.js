// ==UserScript==
// @name           GetWorkers
// @namespace      GetWorkers
// @include        http://economy.erepublik.com/en/land/overview/*
// @include        http://economy.erepublik.com/en/company/employees/*
// ==/UserScript==

(function(){
	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement, stop=0, a,
	style= (<r><![CDATA[
		.employees_ { position:relative; top:90px; }
	]]></r>).toString();
	
	GM_addStyle(style);
	
	if (d.URL.indexOf("/land/")>0) Land();
	else if (d.URL.indexOf("/employees/")>0) Employess();
	
	function Employess(){
		var btn= create("input");
		btn.id= "get_dates"; btn.style.width= "100px";
		btn.type= "button"; btn.value= "Get Dates";
		byId("employee_list").insertBefore(btn, byClass("ftabs")[0]);
		btn.addEventListener("click", function(){
			if (this.value=="Wait"){ if (confirm("Do you want to stop scanning now?")) stop=1; }
			else {
				this.value= "Wait";
				a= byClass("el_img");
				GetDates(0);
			}
		}, false);
		
		function GetDates(i){
			GM_xmlhttpRequest({
				method: "GET",
				url: a[i].href,
				onload: function(e){
					if (e.readyState==4 && e.status!=200) return;
					var t= e.responseText,
					j= t.indexOf("Day ", t.indexOf('eRepublik birthday')+18)+4;
					t= t.substring(j, t.indexOf(' ', j));
					// GM_log(t);
					// var div= create("div"); div.className= "";
					// a[i].parentNode.appendChild(div);
					a[i].nextSibling.nextSibling.innerHTML+= '<br/>DOB: '+t;
					// div.innerHTML= 'DOB: '+t;
					
					i++;
					if (stop==0 && i<a.length) GetDates(i);
					else {
						byId("get_dates").value= "Get Dates";
						stop=0;
					}
				}
			});
		}
	}
	
	function Land(){
		var btn= create("input");
		btn.id= "get_workers"; btn.style.width= "100px";
		btn.type= "button"; btn.value= "Get Workers";
		byId("content").insertBefore(btn, byClass("land_holder")[0]);
		btn.addEventListener("click", function(){
			if (this.value=="Wait"){ if (confirm("Do you want to stop scanning now?")) stop=1; }
			else {
				this.value= "Wait";
				a= byClass("plain options tipser");
				GetWorkers(0);
			}
		}, false);
		
		function GetWorkers(i){
			var id= a[i].href.split('/')[6];
			
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://economy.erepublik.com/en/company/-/"+id,
				onload: function(e){
					if (e.readyState==4 && e.status!=200) return;
					var t= e.responseText,
					j= t.indexOf('"employee"')+10;
					t= t.substring(j, t.indexOf('<s', j)).replace(/\D/g, "");
					// GM_log(t);
					var div= create("div"); div.className= "employees_";
					a[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(div);
					div.innerHTML= '<a href="http://economy.erepublik.com/en/company/employees/-/'+id+'/52">Employees</a>: '+t;
					
					i++;
					if (stop==0 && i<a.length) GetWorkers(i);
					else {
						byId("get_workers").value= "Get Workers";
						stop=0;
					}
				}
			});
		}
	}
	
})()