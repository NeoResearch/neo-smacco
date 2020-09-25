all:

.PHONY: docs

docs:
	cd docs && make clean && make html
