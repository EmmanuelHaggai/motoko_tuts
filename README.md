# motoko_tuts

## Installation
Follow these steps to set up this tutorial repo on your local environment:

### Prerequisites

- A connection to the internet.
- A command line interface.
- [Node.js](https://nodejs.org/en) (v18 or later downloaded and installed.)
- [DFINITY IC SDK,](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```
- dfx (v14 or later installed.)
  ```bash
  DFX_VERSION=0.15.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
  
  dfx --version

  echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
  ```
   
### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/emmanuelhaggai/motoko_tuts.git
   
   cd motoko_tuts
   ```
   
2. **Install Dependencies:**

   ```bash
   npm install @dfinity/auth-client
   
   npm install
   ```
3. **Pull the interner identity canister using dfx deps:**
   ```bash
   dfx deps pull
   ```
4. **Initialize the canister:**
   ```bash
   dfx deps init internet_identity --argument '(null)'
   ```
5. **Deploy to Internet Computer:**

   ```bash
   dfx start --clean --background
   dfx deps deploy
   dfx deploy
   ```
# More information
## To create a new project
To create a new project, use dfx new <project name>
```bash
dfx new motoko_tuts
```

To download bootstrap:
- [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/download/)

## To integrate with the internet identity:
Here we will be using the pullable version of the Internet Identity canister, which uses the dfx deps workflow. 
Open the dfx.json file and add the internet identity canister and define it as a "type": "pull"

    "internet_identity" : {
      "type": "pull",
      "id": "rdmx6-jaaaa-aaaaa-aaadq-cai"
    }

Now pull thee internet identity canister using `dfx deps`

```bash
dfx deps pull
```
Initialize it. Use the '(null)' value passed to the init command to use the dafault values.
```bash
dfx deps init internet_identity --argument '(null)'
```

Install the @dfinity/auth-client package:
```bash
npm install @dfinity/auth-client
```

Deploy the project:
```bash
dfx deps deploy
dfx deploy
```
