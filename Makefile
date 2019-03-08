WEBPACK=node_modules/.bin/webpack

all: clean
	$(WEBPACK)

watch: clean
	$(WEBPACK) --watch

run:
	python3 -m http.server -d ./dist -b 127.0.0.1

clean:
	rm -f dist/*.js

.PHONY: all watch run clean
