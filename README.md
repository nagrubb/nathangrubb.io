# Personal website
This is obviously overkill for a personal website, but I've used it as an opportunity to learn more about Docker and container orchestration. Currently my budget for this is quite limited and thus limited to a cluster with a single machine so Docker Swarm or Kubernetes doesn't really make much sense.

## Step 1: Configuration
```
git clone <this-repo>
echo -n "<api_key>" > alpha_advantage_api_key.txt
echo -n "<access_token>" > strava_access_token.txt
```

## Step 2: Deploy
#### Option 1: Docker Compose
```
TAG=latest PORT=80 docker-compose up -d
```
#### Option 2: Docker Swarm
```
# Note on macOS to use Port 80, I have to run as sudo but not for other ports
sudo PORT=80 TAG=latest docker stack deploy -c docker-compose.yml nathangrubb
```

## Step 3: Test
```
curl <ip-address>
curl <ip-address>/cycle
curl <ip-address>/stock/msft
```

## Other Docker Swarm Commands

#### Removing stack
```
docker stack rm nathangrubb
```

#### Checking services in the stack
```
docker stack services nathangrubb
```

#### Viewing all tasks in the stack
```
docker stack ps nathangrubba
```
