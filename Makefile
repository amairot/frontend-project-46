install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

gendiff:
	node index.js

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run