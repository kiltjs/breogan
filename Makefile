
lint:
	$(shell npm bin)/eslint src
	$(shell npm bin)/eslint tests

test:
	$(shell npm bin)/mocha --require @babel/register tests/*-tests.js
