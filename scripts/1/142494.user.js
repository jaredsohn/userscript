 // ==UserScript==
 // @name  gMyClass
 // Head nessecary for upload on userscripts.org
 // useles for this script it will loaded by a @require from a other script
 // ==/UserScript==
 
 /*
  * gMyClass
  * a test class for access global vars and const from other script where this here is inclueded
  */
var gMyClass =new function(){
this.A="A";
this.B="B";
this.show=new function(){
	str="\n";// string
	str+="this.A="+this.A+" this.B="+this.B+"\n";	// local  vars
	str+="vglobal1="+vglobal1+"\n";						// global var
	str+="cglobalconst1="+cglobalconst1;				// global const
	GM_log("gMyClass.show()"+str);
	}//show()	
}//gMyClass
