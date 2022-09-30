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

docker run --detach -it ubuntu:bionic # or, to be shorter: docker run -dit ubuntu:bionic

docker ps # view the containers

docker attach <ID or name> # e.g. `docker attach 20919c49d6e5` would attach to that container
```

This allows you to attach a shell to a running container and mess around with it. Useful if you need to inspect something or see running logs.

To kill a container

```bash
docker kill <IDs or names of containers> # e.g. `docker kill fae0f0974d3d 803e1721dad3 20919c49d6e5` would kill those three containers
```

## --name and --rm

Give your containers names

```bash
docker run -dit --name my-ubuntu ubuntu:bionic
docker kill my-ubuntu # easier than ids
```

Docker keeps the metadata around until you tell it to stop.

```bash
docker ps --all # this will display all metadata for shutdown containers

docker rm my-ubuntu # would free up the name again

docker container prune # this will free up all existing stopped containers

docker run --rm -dit --name my-ubuntu ubuntu:bionic # This will automatically clean up the containers
```

## Tags

Tags allow you to specific which version you install. For example

```bash
docker run -it node:8 bash
```

## Docker CLI

### pull / push

`pull` allows you to pre-fetch container to run.
