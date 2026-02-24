/**
 * Transaction/Send Button Component
 * Handles the primary call-to-action for sending coffee payments.
 * Manages button states: Connect -> Select Cup -> Process -> Complete
 */

import React from 'react'
import { cn } from '../utils/utils.ts';
import SnakeLoading from './LoadingSVG.tsx';

// Button styling for active/ready state
const btnClasses = ' min-w-50 min-h-15 w-50 -mt-4 py-4  rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-yellow-400 text-black hover:bg-yellow-500 hover:shadow-yellow-400/20 active:scale-[0.98] hover:-translate-y-1 cursor-pointer';

// Button styling for disabled/processing state
const btnTxProcessingClass = " hover:cursor-not-allowed hover:bg-slate-700 hover:shadow-slate-700 active:scale-[1] opacity-70 flex items-center justify-center gap-3 bg-slate-700 text-slate-300 ";
// Combined button states for different UI scenarios

const unresponsiveBtnState = cn(btnClasses + " " + btnTxProcessingClass + " pointer-events-none")

// Mapping of cup number to ETH amount
const cupToEth = {0:'No Value', 1: "0.001", 2: "0.003", 3: "0.005" };

/**
 * SendButton Component
 * @param {boolean} isConnected - Whether the wallet is connected
 * @param {number} btnClicked - Which cup was selected (1-3, or 0 for none)
 * @param {Function} handleConnect - Callback to initiate wallet connection
 * @param {string} status - Current wallet connection status
 * @param {string} address - Connected wallet address
 * @param {Function} setStatus - Update connection status
 * @param {Function} sendTransaction - Execute the transaction
 * @param {string} hash - Transaction hash from completed transaction
 * @param {React.RefObject} nameData - Name input by user
 * @param {React.RefObject} descriptionData - Description input by user
 */
interface SendButtonProps {
  isConnected: boolean;
  btnClicked:0 | 1 | 2 | 3; // Specific numbers are safer than 'number'
  handleConnect: () => void;
  sendTransaction: (arg1: string, arg2: string) => Promise<boolean>;
  hash: string;
  nameData: React.RefObject<HTMLInputElement | null>;
  descriptionData: React.RefObject<HTMLTextAreaElement | null>;

}

export default function SendButton({isConnected, btnClicked, handleConnect, sendTransaction, hash, nameData, descriptionData}: SendButtonProps){
  // Button state: 1 = ready, 2 = processing, 3 = completed
  const [btnState, setBtnState] = React.useState(1);
  
    //defining each prop datat type:
    

    /**
   * Determines button styling based on current state
   * Disables button during wallet connection and transaction processing
   */
  function classChanger(){
        // if (status === "connecting") return unresponsiveBtnState;
        if (!isConnected) return btnClasses;
        if (isConnected && btnClicked === 0) return unresponsiveBtnState;
        if (btnState === 2) return unresponsiveBtnState;
        return btnClasses;
    }

    /**
   * Handles the complete transaction flow:
   * 1. Connect wallet if not connected
   * 2. Process transaction if cup is selected
   * 3. Update UI states accordingly
   */

    function getMessageData(){

        if (nameData.current && descriptionData.current) {
            const message =`Name: ${nameData.current.value}, Description: ${descriptionData.current.value}`
            return message
    }else{
        const message =`No Message`
        return message
    }}
    async function handleTransactionFlow() {
        if (!isConnected) {
            handleConnect();
            return;
        }

        if (btnClicked > 0 && btnState!=3) {
            
            
            setBtnState(2);
            const success = await sendTransaction(cupToEth[btnClicked], getMessageData()) ;

            
            if (success) {
                setBtnState(3);
                setTimeout(() => setBtnState(1), 50000);
            } else {
                setBtnState(1);
            }
        }
    }

    /**
   * Determines button text/content based on current state
   * Returns different messages or loading indicator
   */
  function btnConditions() {
        if (!isConnected) return "Connect Wallet";
        if (btnClicked === 0) return "Select a Cup First";
        if (btnState === 1) return "Send Coffee";
        if (btnState === 2) return <SnakeLoading />;
        if (btnState === 3) return "Tx Completed ✅";
    }
    return(
        <div id="send-button" className="text-center flex flex-col items-center mt-4">
            <span className="italic mb-0 text-slate-400">
                (approx {btnClicked && Number(cupToEth[btnClicked])} ETH)
            </span><br/>
            <button 
                onClick={handleTransactionFlow} 
                disabled={ btnState==2} 
                className={classChanger()}
            >
                {btnConditions()}
            </button>
            {btnState === 3 && hash && (
                <div className="mt-4 animate-bounce">
                    <a 
                        target='_blank' 
                        rel="noreferrer"
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        className="text-yellow-400 hover:underline text-sm font-medium"
                    >
                        View on Etherscan ↗
                    </a>
                </div>
            )}
        </div>
    )
}