
build:
	npm run all

runDocker:
	cd sshDocker && \
	docker build --no-cache -t gcr.io/pigdevonlyx/docker-action:test -f Dockerfile . && \
	echo "ENV... ${milliseconds}" && \
	docker run -d -p 3000:3000 --rm -it --name docker-action gcr.io/pigdevonlyx/docker-action:test 

runDockerND:
	cd sshDocker && \
	docker build --no-cache -t gcr.io/pigdevonlyx/docker-action:test -f Dockerfile . && \
	echo "ENV... ${milliseconds}" && \
	docker run  -p 3000:3000 --rm -it --name docker-action gcr.io/pigdevonlyx/docker-action:test 

push:
	docker push gcr.io/pigdevonlyx/docker-action:test

stop:
	docker stop docker-action




