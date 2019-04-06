# Containerized Website

# Step 1: Clone
```
git clone <this-repo>
```

# Step 2: Configure
```
cp stock/stock.toml.default stock/stock.toml
vi stock.toml #configure as needed
cp cycle/cycle.toml.default cycle/cycle.toml
vi cycle.toml #configure as needed
```

# Step 3: Create Container
```
docker build -t website .
```

# Step 4: Run Container
```
docker run -p <host_port>:80 -t website
```

# Step 5: Test
```
curl <ip-address>
```
