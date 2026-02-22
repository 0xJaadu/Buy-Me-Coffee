function App() {
  // 1. Destructure 'address' and 'isConnecting' (or status) from your hook
  const {status, address, walletConnect, error} = ConnectWallet();
  
  // 2. Remove the [isConnected, setIsConnected] state entirely!
  const [cupClicked, setCupClicked] = React.useState(0);

  // 3. Simplify handleConnect - it just calls the hook
  const handleConnect = () => {
    walletConnect().catch(err => console.error(err));
  }

  return (
    <>
      <div id='main-container' className={mainContainerClasses}>
        {/* 4. Use !!address to turn the string into a true/false boolean */}
        <IsConnectDisplay 
          isConnected={!!address} 
          handleConnect={handleConnect}
        />
        
        <div id='center-container' className='...'>
          
          {/* 5. AUTOMATIC UPDATE: If address exists, show the form instantly */}
          {!address ? (
            <div className='flex flex-col items-center justify-center h-full gap-4'>
               <h2 className='text-white text-xl'>Please connect your wallet</h2>
               <button onClick={handleConnect} className='...'>
                 {status === "connecting" ? "Check MetaMask..." : "Connect"}
               </button>
            </div>
          ) : (
            <>
              {/* Your Coffee Selection & Form Logic */}
            </>
          )}

          {/* 6. Pass address directly to the button */}
          <SendButton 
            isConnected={!!address} 
            btnClicked={cupClicked} 
            handleConnect={handleConnect} 
            status={status} 
            address={address}
          />
        </div>
      </div>
    </>
  )
}