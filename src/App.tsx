/**
 * App Component
 * Main application component that handles the buy-me-coffee interface.
 * Manages cup selection, form inputs, and transaction flow.
 */
import {useRef} from 'react';
import React from 'react';
import './components/output.css'
import SendButton from './components/TransactionButton.tsx';
import IsConnectDisplay from './components/connectedStatus.tsx'
import {ConnectWallet} from './hooks/ConnectWallet.ts'
import CupsButtons from './components/cupsButton.tsx';
import FormDonor from './components/FormDonor.tsx';

// Tailwind CSS classes for main layout container
const mainContainerClasses = "ml-0  h-[100vh] w-full bg-[#0F172A] )"
// Base styling for coffee cup selection cards


//defining interface for fixing type issues:
// interface defineTypes{
//   btnClicked: 0 | 1 | 2 | 3;
// }




function App() {
  // Destructure wallet connection utilities from the hook
  const {address, walletConnect, callContract, hash} = ConnectWallet();
  
  //Track the name and description set by user

  // Track which coffee cup was selected (0 = none, 1/2/3 = cup option)
  const [cupClicked, setCupClicked] = React.useState<0 | 1 | 2 | 3>(0);
  
  // Handle wallet connection trigger
  const handleConnect = () => {
    walletConnect().catch(err => console.error(err));
  }

  // To store the user Input;
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  

  return (
    <>
      <div id='main-container' className={mainContainerClasses}>
        {/* Display wallet connection status and button */}
        <IsConnectDisplay 
          isConnected={!!address} 
          handleConnect={handleConnect}
        />
        
        {/* Main content container */}
        <div id='center-container' className='bg-[#1E293B] h-[90vh] -mt-10  mx-[10%] shadow-[0_0_15px_rgba(59,130,246,0.5)]'>
          {/* Coffee cup selection cards */}
          <CupsButtons setCupClicked={setCupClicked} cupClicked={cupClicked}/>
          
          {/* Donor information form */}
          <FormDonor nameRef={nameRef} descriptionRef={descriptionRef}/>

          {/*Main button to send transaction*/}
          <SendButton isConnected={!!address}
           btnClicked ={(cupClicked)} 
            handleConnect={handleConnect}
             
              
              
                sendTransaction={callContract}
                 hash={hash}
                  nameData={nameRef}
                   descriptionData={descriptionRef}/>

        </div>
      </div>
      
    </>
  )


}

export default App