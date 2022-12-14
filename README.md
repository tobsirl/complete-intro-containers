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

You can also version your containers

```bash
docker build -t my-node-app:1 .
docker run my-node-app:1
```

## Features in Docker

### Bind Mounts

Bind Mounts have been around since the early days of docker. Bind mounts have limited functionality compared to volumes.

When you use a bind mount, a file or directory on the host machine is mounted into a container. The file or directory is referenced by its absolute path on the host machine.

### Volumes

Bind mounts are great for when you need to share data between your host and your container as we just learned. Volumes, on the other hand, are so that your containers can maintain state between runs.

So if you have a container that runs and the next time it runs it needs the results from the previous time it ran, volumes are going to be helpful. Volumes can not only be shared by the same container-type between runs but also between different containers. Maybe if you have two containers and you want to log to consolidate your logs to one place, volumes could help with that.

## Networking with Docker

Run `docker network ls` will display the current connection

```bash
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
xxxxxxxxxxxx        bridge              bridge              local
xxxxxxxxxxxx        host                host                local
xxxxxxxxxxxx        none                null                local
```

`bridge` network exists all the time and you can attach to it if you want. However Docker recommends against it.
`host` network is the host computer.

`null` driver is one that you'd use if you wanted to use some other provider or if you wanted to do it manually yourself.

## Docker Compose

Docker Compose allows us the ability to coordinate multiple containers and do so with one YAML file.

This is great if you're developing a Node.js app and it requires a database, caching, or even if you have two+ separate apps in two+ separate containers that depend on each other or all the above! Docker Compose makes it really simple to define the relationship between these containers and get them all running with one `docker-compose up`.

### docker-compose.yml

```yml
version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/home/node/code
      - /home/node/code/node_modules
    links:
      - db
    environment:
      MONGO_CONNECTION_STRING: mongodb://db:27017
  db:
    image: mongo:3
```

`services` defines the containers we need in our app.

`web` and `db`

In `build` we determine which ports to expose in ports, which volumes to make in volumes and any `environment` variables that are required

## Kubernetes

Kubernetes is a container orchestration tool. It allows you to manage large, complicated clusters of containers to multiple different hosts.

It's a complicated tool that solves complicated problems.

- The `master` is a server that coordinates everything else. This is the brain on of your cluster. Some cloud providers actually won't charge you to run the master.
- `Nodes` are the worker servers that are actually going to be running your containers. One node can one or multiple containers.
- Technically, a Node is just a deploy target. It could itself be a VM or a container, or as we said it could be a metal-and-silicon server. It's not really important. Just think of it as a destination for containers.
- A pod is bascially an atom to a cluster: it's a thing that can't be divided and thus needs to be deployed together. Imagine if you had several types of containers that all worked together as one unit and wouldn't work without each other. 
- A service is a group of pods that make up one backend, so to speak. Think one microservice is a group of microservices. Pods are scaling up and down all the time and thus it's unreliable to rely on a single pod's IP. So if I tell the User service to rely on this specific IP for the Admin service, that IP might disappear as that pod is scaled up and down. Enter services. This is a reliable entry point so that these services can talk to each other independent of the relative scale of each other. Like you can have one-container-one-pod, you can have one-pod-one-service as well which means you can have one-container-one-pod-one-service. Services can be more than a backend, they can machine learning nodes, database, caches, etc.
- A deployment is where you describe what you want the state of your pods to be and then Kubernetes works to get your cluster into that state.
