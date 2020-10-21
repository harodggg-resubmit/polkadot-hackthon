git clone --branch helloworld https://github.com/Phala-Network/phala-blockchain.git
# Clone the Web UI repo
git clone --branch helloworld https://github.com/Phala-Network/apps-ng.git

# Run the init script to update rust toolchain and git submodule
cd phala-blockchain/
git submodule update --init
./scripts/init.sh
cd ..

# Update the git submodule
cd apps-ng/
git submodule update --init
