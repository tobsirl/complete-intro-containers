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

```bash
docker pull jturpin/hollywood
docker run -it jturpin/hollywood hollywood # notice it's already loaded and cached here; it doesn't redownload it
```

`push` allows you to push containers to whatever registry you're connected to.

### inspect

```bash
docker inspect node
```

This will dump out a lot of info about the container. Helpful when figuring out what's going on with a container

### pause / unpause

```bash
docker run -dit jturpin/hollywood hollywood
docker ps # see container running
docker pause <ID or name>
docker ps # see container paused
docker unpause <ID or name>
docker ps # see container running again
docker kill <ID or name> # see container is gone
```

### exec

This allows you to execute a command against a running container. This is different from `docker run` because `docker run` will start a new container whereas `docker exec` runs the command in an already-running container.

### import / export

Allows you to dump out your container to a tar ball. You can also import a tar ball as well.

### history

We'll get into layers in a bit but this allow you to see how this Docker image's layer composition has changed over time and how recently.

```bash
docker history node
```

### info

Dumps a bunch of info about the host system. Useful if you're on a VM somewhere and not sure what the environment is.

```bash
docker info
```
