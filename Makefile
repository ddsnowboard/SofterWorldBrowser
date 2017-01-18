vim : 
	vim ./src/*.html ./src/*.php ./src/*.js ./src/*.py ./src/*.css
push :
	cd src && scp -Br . ddsnowboard@192.168.1.36:/var/www/html/
