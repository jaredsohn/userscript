#!/bin/bash

#// ==UserScript==
#// @author        Matthew Mitchell
#// @contact       @mrmitche_
#// @name          Build Dependencies List
#// @description   Lists the dependencies of all packages in apt on linux.
#// ==/UserScript==

packages=$(apt-cache pkgnames)
declare -a array=($packages)

for pkg in ${array[@]}
do
	apt-cache depends $pkg >>dependencies.txt
	printf "\n" >>dependencies.txt
done