import React from "react";
import Web3 from "web3";
import { useAppDispatch } from "../app/hooks";
import { setIsConnected } from "../features/auth/auth-slice";

const Login = () => {
  const dispatch = useAppDispatch();
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("No ethereum brouser detected. You should install metamsk");
    }
    return provider;
  };
  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccounts = await web3.eth.getAccounts();
        const account = userAccounts[0];
        console.log(account);
        dispatch(setIsConnected(true));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDisconnect = () => {
    dispatch(setIsConnected(false));
  };

  return (
    <div className="h-full flex justify-center items-center">
      <button
        className="py-1 px-2 bg-blue-800 text-white rounded-md"
        onClick={onConnect}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
