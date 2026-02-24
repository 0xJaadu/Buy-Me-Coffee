/**
 * ConnectWallet Hook
 * Manages MetaMask wallet connection, address retrieval, and transaction execution.
 * Handles both direct ETH transfers and smart contract interactions.
 */

import {ethers} from 'ethers';
import {useState} from 'react';


//define the interface:


export function ConnectWallet(){
    // Wallet address after successful connection
    const [address, setAddress] = useState<null | string>(null);
    // Connection status flag for UI feedback
    const [status, setStatus] = useState<boolean>(false);
    // Error messages for connection or transaction failures
    const [error, setError] = useState<null | string>(null)
    // Transaction hash for completed transactions
    const [hash, setHash] = useState<string>("")

    /**
     * Initiates MetaMask wallet connection and retrieves user address
     * Updates address state on successful connection
     */
    

    const walletConnect= async()=>{
        if (window.ethereum){
            try{
                setStatus(true);
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.send('eth_requestAccounts', []);

                const getAddress = signer[0];

                setAddress(getAddress);
                setStatus(false);

            } catch(err){
                setError('Failed Connection');
                console.error('Failed Connection with: ', err)
            }
        } else{
            setError('No Wallet Found')
            console.error('Please Install wallet')
        }
    }

    /**
     * Sends direct ETH transfer to a specific address
     * @param {string} amount - Amount of ETH to send
     * @returns {boolean} True if transaction successful, false otherwise
     */
    async function sendTx(amount: string){
        try{
            console.log('sending started! ')
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            
            const tx = {
                to: '0x924592738241c649e57827eb9ffd2004879F1adC',
                value: ethers.parseEther(amount),
            };
            console.log(tx)
            const transaction = await signer.sendTransaction(tx)    
            const receipt = await transaction.wait();
            console.log(receipt)
            if (receipt) setHash(receipt.hash);
            else if(!receipt) {throw new Error('No receipt produced!!!')}
            return true;
        } catch(err){
            console.error(err)
            setError('something went wrong while sending tx ' + err);
            return false
        }
    }

    
    const callContract= async(amount:string, message:string)=>{
        try{
            const contractAddress = '0x01aec705EE6e10F2F0576692507CE1b4492DD7c1';

            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []); //triggers the wallet pop up again if disconnected...
            const signer = await provider.getSigner();

            // Define contract ABI with receiveBalance function
            const abi =[
                `function receiveBalance(string) payable external`
            ]
            
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const transaction = await contract.receiveBalance(message, {value: ethers.parseEther(amount)})
            const receiptContract = await transaction.wait()
            setHash(receiptContract?.hash);
            console.log(receiptContract);
            return true;
        } catch(err){
            console.error(err)
            setError("something bad occured while calling contract!")
            return false;
        }
    }

    return {address, status, walletConnect, error, setStatus, sendTx, hash, callContract}
}
