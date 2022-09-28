# complete-intro-containers

## Docker run

```bash
docker run --interactive --tty alpine:3.10 # or, to be shorter: docker run -it alpine:3.10
```

The `run` part of the command is telling Docker you're going to be executing a container (as opposed to building it.)

The `-it` part says you want to be dropped into the container interactively so you can run commands and inspect the container.

If you don't specify what the container is supposed to do it will close immediately.

```bash
docker run alpine:3.10

docker run alpine:3.10 ls # run alpine with the ls command

docker run alpine:3.10 ls -al # command at the end is passed into the container
```
