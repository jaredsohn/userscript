// ==UserScript==
// @name           	antinokyrent 2.1
// @namespace      
// @description  ghfhgjfghf  	
// @version			2.1
// ==/UserScript==




import java.util.*;
public class Run {
 
 
 
 
 
    public static void main(String[] args) {
        System.out.print("a ");
        Scanner s = new Scanner(System.in);
        String str = s.nextLine();
 
        int k=s.nextInt();
        String temp;
        String []words=str.split("[\\s\\.\\!\\,]");
        for(int l=0;l<words.length;l++){
            System.out.print("");
 
            if(k<words[l].length()){
                temp="";
                temp+=words[l].substring(0, k-1);
                temp+='a';
                temp+=words[l].substring(k,words[l].length());
 
                words[l]=temp;
            }
            System.out.print(" "+words[l]);
 
        }
 