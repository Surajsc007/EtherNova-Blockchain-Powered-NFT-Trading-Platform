// import Web3 from "web3";
// import store from "../app/redux/ReduxStore";
// import { setEthAccount } from "../app/redux/ReduxSlices";
// import { getUserNamePicByEthAddress } from "../apis/profile.apis";

// export const WalletInstance = window.ethereum || "";

// export const Connect = async () => {
//   if (WalletInstance) {
//     try {
//       const web3 = new Web3(window.ethereum);

//       await window.ethereum.enable();

//       const EthAccounts = await web3.eth.getAccounts();

//       if (EthAccounts.length > 0) {
//         const EthAccountBalanceInWei = await web3.eth.getBalance(
//           EthAccounts[0]
//         );

//         const Balance = web3.utils.fromWei(EthAccountBalanceInWei, "ether");

//         const userProfile = await getUserNamePicByEthAddress(EthAccounts[0]);

//         store.dispatch(
//           setEthAccount({
//             isConnect: true,
//             account: EthAccounts[0],
//             balance: Balance,
//             userName: userProfile.userName ?? "",
//             userAvatar: userProfile.userProfile ?? "",
//           })
//         );

//         // nullish coalescing operator { ?? } provide default values when the properties are null or undefined

//         localStorage.setItem("IsMetamaskConnect", "true");
//       } else {
//         console.log("No account available ");
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     return false;
//   }
// };


import Web3 from "web3";
import store from "../app/redux/ReduxStore";
import { setEthAccount } from "../app/redux/ReduxSlices";
import { getUserNamePicByEthAddress } from "../apis/profile.apis";

// Assuming Coinbase wallet instance is available globally
export const CoinbaseInstance = window.coinbase || "";
export const WalletInstance = window.ethereum || "";

export const Connect = async (walletType) => {
  let walletInstance;

  if (walletType === 'MetaMask') {
    walletInstance = window.ethereum;
  } else if (walletType === 'Coinbase') {
    walletInstance = window.coinbase;
  } else {
    console.error('Unsupported wallet type');
    return false;
  }

  if (walletInstance) {
    try {
      const web3 = new Web3(walletInstance);

      // Enable the wallet
      await walletInstance.enable();

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        const account = accounts[0];

        // Fetch balance
        const balanceInWei = await web3.eth.getBalance(account);
        const balance = web3.utils.fromWei(balanceInWei, "ether");

        // Fetch user profile
        const userProfile = await getUserNamePicByEthAddress(account);

        // Dispatch Redux action to set account details
        store.dispatch(
          setEthAccount({
            isConnect: true,
            account: account,
            balance: balance,
            userName: userProfile.userName ?? "",
            userAvatar: userProfile.userProfile ?? "",
          })
        );

        // Store connection status in local storage
        localStorage.setItem("IsMetamaskConnect", "true");
      } else {
        console.log("No account available ");
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    console.error('Wallet instance not found');
    return false;
  }
};
