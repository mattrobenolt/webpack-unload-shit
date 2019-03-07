all: clean
	node_modules/.bin/webpack

run:
	python3 -m http.server -d ./dist -b 127.0.0.1

clean:
	rm -f dist/*.js

