export function make(): string {
  const s = `
  build:
\trm -rf sshDocker
\tnpm run all

clone:
\tgit clone https://github.com/mchirico/sshDocker.git


runDocker:
\tcd sshDocker && \\
\tdocker build --no-cache -t gcr.io/pigdevonlyx/docker-action:test -f Dockerfile . && \\
\techo "ENV... \${milliseconds}" && \\
\tdocker run -d -p 3000:3000 -p 8080:8080 -p 6379:6379 --rm -it --name docker-action gcr.io/pigdevonlyx/docker-action:test

runDockerND:
\tcd sshDocker && \\
\tdocker build --no-cache -t gcr.io/pigdevonlyx/docker-action:test -f Dockerfile . && \\
\techo "ENV... \${milliseconds}" && \\
\tdocker run  -p 3000:3000 -p 8080:8080 -p 6379:6379 --rm -it --name docker-action gcr.io/pigdevonlyx/docker-action:test

push:
\tdocker push gcr.io/pigdevonlyx/docker-action:test

stop:
\tdocker stop docker-action


  `
  return s
}
