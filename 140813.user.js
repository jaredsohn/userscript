
 // ==UserScript==
-// @name Soha 
-// @description	Soha
+// @name Soha Login
+// @description Let you login Soha Film without register
 // @include		*://*.phim.soha.vn
 // @include		*://*.phim.soha.vn/*
 // @include		*://phim.soha.vn
 // @include		*://phim.soha.vn/*
-// @version	1
+// @icon      http://phim.soha.vn/images/logo.ico
 // @author	Truong
+// @version	1.01
 // ==/UserScript==
-document.cookie = 'u_f_sohaphim=SHP_DontdisplayInfoTB=SHP_DontdisplayInfoTB2=SHP_DontdisplayInfoTB3,WD%2b5pJm%2bIkVl2R1CW9tN%2b1h5RjbqoxLDkGMhIrfEcc511JyoPP%2fr%2f4E%2foGRB%2fygEwdOBxToJEP5HjslyMWW691a0GaJDVD%2fh4miO3biThYU%3d,tristanvan1989@yahoo.com; path=/';
\ No newline at end of file
+function createCookie(name,value,days) {
+	if (days) {
+		var date = new Date();
+		date.setTime(date.getTime()+(days*24*60*60*1000));
+		var expires = "; expires="+date.toGMTString();
+	}
+	else var expires = "";
+	document.cookie = name+"="+value+expires+"; path=/";
+}
+function readCookie(name) {
+	var nameEQ = name + "=";
+	var ca = document.cookie.split(';');
+	for(var i=0;i < ca.length;i++) {
+		var c = ca[i];
+		while (c.charAt(0)==' ') c = c.substring(1,c.length);
+		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
+	}
+	return null;
+}
+var nCookie = 'u_f_sohaphim';
+var vCookie = 'WD%2b5pJm%2bIkVl2R1CW9tN%2b1h5RjbqoxLDkGMhIrfEcc511JyoPP%2fr%2f4E%2foGRB%2fygEwdOBxToJEP5HjslyMWW691a0GaJDVD%2fh4miO3biThYU%3d,tristanvan1989@yahoo.com';
+if (readCookie(nCookie) == null){
+ history.go(0)
+}