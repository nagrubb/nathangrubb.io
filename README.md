# Containerized Website

# Step 1: Clone
```
git clone <this-repo>
```

# Step 2: Configure
```
echo -n "<api_key>" > alpha_advantage_api_key.txt
echo -n "<access_token>" > strava_access_token.txt
```

# Step 3: Create Containers
```
TAG=staging PORT=80 docker-compose up -d
```

# Step 4: Test
```
curl <ip-address>
```
