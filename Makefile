vim : 
	vim ./src/*
push :
	cd src && scp -Br . ddsnowboard@192.168.1.36:/var/www/html/
