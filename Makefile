.PHONY:  deploy
IMAGE_NAME := test-crypto

docker-build-test:
	docker build -f ./test.Dockerfile -t $(IMAGE_NAME) .

test: docker-build-test
	docker run $(IMAGE_NAME) sh -c '\
		committed_hash="$$(shasum distribution/index.js)";\
		npm test; npm run build;\
		if [ "$$committed_hash" != "$$(shasum distribution/index.js)" ];\
		then echo "Build check failed. Please commit after running npm run build.";return 1;\
		fi \
	'

docker-build:
	@echo "skipping"

twistlock-scan:
	@echo "skipping"

docker-push:
	@echo "skipping"

deploy:
	@echo "skipping"

clean:
	@echo "skipping"





