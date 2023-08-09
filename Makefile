install:
	npm ci

gendiff:
	node index.js

publish:
	npm publish --dry-run

lint:
	npx eslint .