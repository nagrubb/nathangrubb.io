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

# Step 3: Add public key infrastructure for TLS
```
cp <cert> nginx/pki
cp <private-key> nginx/pki
cp <dhparams> nginx/pki
```

# Step 4: Create Container
```
docker build -t website .
```

# Step 5: Run Container
```
docker run -p 80:80 -p 443:443 -ti website
```

# Step 6: Test
```
curl <ip-address>
```
