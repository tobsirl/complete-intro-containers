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

### top

Allows you to see processes running on a container

```bash
docker run mongo
docker top <ID outputted by previous command> # you should see MongoDB running
```

### rm / rmi

If you run `docker ps --all` it'll show all containers you've stopped running in addition to the runs you're running. If you want to remove something from this list, you can do `docker rm <id or name>`.

If you want to remove an image from your computer (to save space or whatever) you can run `docker rmi mongo` and it'll delete the image from your computer. This isn't a big deal since you can always reload it again

### logs

Very useful to see the output of one of your running containers.

```bash
docker run -d mongo
docker logs <id from previous command> # see all the logs
```

### restart

Pretty self explanatory. Will restart a running container

### search

If you want to see if a container exists on Docker Hub (or whatever registry you're connected to), this will allow you to take a look.

```bash
docker search python # see all the various flavors of Python containers you can run
docker search node # see all the various flavors of Node.js containers you can run
```

## Docker files

Building your own containers.  Docker has a special file called a `Dockerfile` which allows you to outline how a container will be built. Each line in a Docker file is a new a directive of how to change your Docker container.

A big key with Docker container is that they're supposed to be disposable. You should be able to create them and throw them away as many times as necessary.

### basic dockerfile

```bash
FROM node:12-stretch

CMD ["node", "-e", "console.log(\"hi lol\")"]
```

`FROM` and `CMD` are called _instructions

```bash
docker build . # this will build your container
```

`FROM` pulls in the image.
`CMD` This is what you want Docker to do when someone runs the container. Only one `CMD` in a dockerfile.

```bash
docker run <ID> # ID = hash of the container

# It's a lot easier if you give your container a name
docker build . --tag my-node-app ## or -t instead of --tag
docker run my-node-app
```
